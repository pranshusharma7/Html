import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const data = db.get();
    return NextResponse.json({
      success: true,
      students: data.students,
      staff: data.staff,
      fees: data.fees,
      exams: data.exams,
      notices: data.notices,
      auditLogs: data.auditLogs,
      lastUpdated: data.lastUpdated,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve database records.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === 'addStudent') {
      const created = db.addStudent(payload);
      return NextResponse.json({ success: true, student: created });
    }

    if (action === 'payFee') {
      const { invoiceId, amount, method } = payload;
      const updated = db.payFee(invoiceId, amount, method);
      return NextResponse.json({ success: true, invoice: updated });
    }

    if (action === 'addNotice') {
      const notice = db.addNotice(payload);
      return NextResponse.json({ success: true, notice });
    }

    return NextResponse.json({ success: false, message: 'Unknown database action.' }, { status: 400 });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Database transaction error.' },
      { status: 500 }
    );
  }
}
