// src/lib/auth.ts
const encoder = new TextEncoder();

type AdminTokenPayload = {
  sub: string;
  exp: number;
};

const COOKIE_NAME = 'adi_admin';

const base64UrlEncode = (bytes: Uint8Array) => {
  let base64 = '';
  if (typeof Buffer !== 'undefined') {
    base64 = Buffer.from(bytes).toString('base64');
  } else {
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    base64 = btoa(binary);
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const base64UrlDecodeToBytes = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '==='.slice((normalized.length + 3) % 4);
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(padded, 'base64'));
  }
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const base64UrlDecodeToString = (value: string) => {
  const bytes = base64UrlDecodeToBytes(value);
  return new TextDecoder().decode(bytes);
};

const getWebCrypto = () => {
  if (!globalThis.crypto?.subtle) {
    throw new Error('WebCrypto is not available in this runtime.');
  }
  return globalThis.crypto;
};

const signHmac = async (data: string, secret: string) => {
  const crypto = getWebCrypto();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncode(new Uint8Array(signature));
};

const verifyHmac = async (data: string, signature: string, secret: string) => {
  const expected = await signHmac(data, secret);
  return expected === signature;
};

export const createAdminToken = async (email: string, secret: string, expiresInSeconds: number) => {
  const header = base64UrlEncode(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const payload: AdminTokenPayload = {
    sub: email,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const data = `${header}.${body}`;
  const signature = await signHmac(data, secret);
  return `${data}.${signature}`;
};

export const verifyAdminToken = async (token: string, secret: string) => {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;

  const isValid = await verifyHmac(`${header}.${body}`, signature, secret);
  if (!isValid) return null;

  const payload = JSON.parse(base64UrlDecodeToString(body)) as AdminTokenPayload;
  if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
};

export const getAdminCookieName = () => COOKIE_NAME;

