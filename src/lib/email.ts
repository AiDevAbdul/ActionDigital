import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Action Digital" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: 'Reset your admin password',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1e293b; margin-bottom: 16px;">Reset your admin password</h2>
        <p style="color: #475569; margin-bottom: 24px;">
          Click the button below to reset your password. This link expires in <strong>1 hour</strong>.
        </p>
        <a href="${resetUrl}"
          style="display: inline-block; padding: 12px 28px; background: #2563eb; color: #fff;
                 text-decoration: none; border-radius: 8px; font-weight: 600;">
          Reset Password
        </a>
        <p style="margin-top: 24px; color: #94a3b8; font-size: 13px;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
        <hr style="margin-top: 32px; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="color: #cbd5e1; font-size: 12px; margin-top: 16px;">Action Digital Admin</p>
      </div>
    `,
    text: `Reset your admin password by visiting:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`,
  });
}
