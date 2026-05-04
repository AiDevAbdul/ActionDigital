import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import nodemailer from 'nodemailer';

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user, pass },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const record = await prisma.contactMessage.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), subject: subject.trim(), message: message.trim() },
    });

    const transporter = createTransporter();
    if (transporter) {
      const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER!;
      await transporter.sendMail({
        from: `"Action Digital Contact" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email.trim(),
        subject: `[Contact] ${subject.trim()}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Subject:</strong> ${subject}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
      });
    }

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
