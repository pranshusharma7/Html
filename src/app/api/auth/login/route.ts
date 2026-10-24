import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both your ID and Password.' },
        { status: 400 }
      );
    }

    const cleanId = String(identifier).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const user = db.findUserByIdentifier(cleanId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account not found. Please verify your User ID / Roll Number.',
        },
        { status: 404 }
      );
    }

    // Check password: either matches user.password OR matches identifier if it's first-time login
    const isFirstTimePassword = cleanPass === user.identifier || cleanPass === user.id;
    const isPasswordValid = cleanPass === user.password || isFirstTimePassword;

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: user.isFirstLogin
            ? 'Invalid password. Note: For first-time login, your temporary password is the same as your ID.'
            : 'Incorrect password. Please enter your updated password.',
        },
        { status: 401 }
      );
    }

    // Determine if password change is mandatory:
    // Required if user.isFirstLogin is true OR the current password is still identical to their user identifier
    const requirePasswordChange = user.isFirstLogin || user.password === user.identifier;

    const safeUser = { ...user };
    delete (safeUser as { password?: string }).password;

    return NextResponse.json({
      success: true,
      requirePasswordChange,
      user: safeUser,
      message: requirePasswordChange
        ? 'First-time login detected. Please create a new personal password.'
        : `Welcome back, ${user.name}!`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
