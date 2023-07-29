import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();

  const { userId, name, substanceOfAbuse, dateOfSobriety } = body;

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

    return new NextResponse(JSON.stringify(updatedUser), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
