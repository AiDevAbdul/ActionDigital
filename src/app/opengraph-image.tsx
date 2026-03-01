import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #0b3b5b 50%, #0ea5e9 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 24, maxWidth: 900, lineHeight: 1.4 }}>
          AI, Web/App Development, and Digital Marketing training with industry-ready curriculum.
        </div>
        <div style={{ fontSize: 22, marginTop: 36, opacity: 0.85 }}>
          actiondigital.pk
        </div>
      </div>
    ),
    size
  );
}
