import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, currentPassword, newPassword } = body;

    if (!identifier || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Missing required password change fields.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 4 characters long.' },
        { status: 400 }
      );
    }

    const cleanId = String(identifier).trim().toLowerCase();
    const user = db.findUserByIdentifier(cleanId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User record not found in database.' },
        { status: 404 }
      );
    }

    // Verify current password if provided
    if (currentPassword) {
      const cleanCurrent = String(currentPassword).trim();
      const matchesCurrent = cleanCurrent === user.password || cleanCurrent === user.identifier;
      if (!matchesCurrent) {
        return NextResponse.json(
          { success: false, message: 'Current password verification failed.' },
          { status: 401 }
        );
      }
    }

    // Prevent re-using the ID as the new password
    if (newPassword.trim().toLowerCase() === user.identifier.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'New password cannot be identical to your User ID.' },
        { status: 400 }
      );
    }

    // Persist new password into the database on disk
    const updatedUser = db.updatePassword(user.identifier, newPassword.trim());

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'Failed to update password in database.' },
        { status: 500 }
      );
    }

    const safeUser = { ...updatedUser };
    delete (safeUser as { password?: string }).password;

    return NextResponse.json({
      success: true,
      message: 'Password successfully updated in database! First-time onboarding complete.',
      user: safeUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error while saving password.' },
      { status: 500 }
    );
  }
}
