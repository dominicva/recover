import { type NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user';
import { prisma } from '@/lib/db';

export const POST = async (req: NextRequest) => {
  const [{ note }, session] = await Promise.all([req.json(), getUserSession()]);

  try {
    const newMotivationNote = await prisma.motivationNote.create({
      data: {
        content: note,
        userId: session?.userId,
      },
    });

    return NextResponse.json({ data: newMotivationNote }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
