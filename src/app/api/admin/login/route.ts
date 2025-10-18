// src/app/api/admin/login/route.ts
import { NextRequest } from 'next/server';
import { compare } from 'bcryptjs';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Find user by email
    const user = await db.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Compare password (assuming passwords are stored as hashed)
    // Note: In a real app, you'd want to hash the password before storing
    const isValid = await compare(password, user.password);
    
    if (!isValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // In a real implementation, you would generate a JWT token here
    // For demo purposes, we'll return a simple token
    // But since we're using a simple API key-based approach, we'll return success
    return Response.json({ 
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error during login:', error);
    return Response.json({ error: 'Failed to login' }, { status: 500 });
  }
}