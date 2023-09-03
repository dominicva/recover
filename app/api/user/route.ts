import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export const PATCH = async (req: NextRequest) => {
  const { userId, name, substanceOfAbuse, dateOfSobriety, email } =
    await req.json();

  try {
    const updateData = {
      ...(name && { name }),
      ...(substanceOfAbuse && { substanceOfAbuse }),
      ...(dateOfSobriety && { dateOfSobriety: new Date(dateOfSobriety) }),
      ...(email && { email }),
    };

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        email,
      },
      data: updateData,
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
