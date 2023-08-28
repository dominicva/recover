import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export const PATCH = async (req: NextRequest) => {
  const { userId, name, substanceOfAbuse, dateOfSobriety } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        substanceOfAbuse,
        dateOfSobriety: new Date(dateOfSobriety),
      },
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
