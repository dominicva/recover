import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user';
import { prisma } from '@/lib/db';

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const [user, body] = await Promise.all([getUserSession(), req.json()]);

  const { userId } = user;

  const questionnaireData = Object.entries(body).reduce((acc, curr) => {
    const [key, value] = curr;
    return {
      ...acc,
      [key]: Number(value),
    };
  }, {});

  const questionnaire = await prisma.questionnaire.create({
    data: {
      ...questionnaireData,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return NextResponse.json({ data: questionnaire }, { status: 200 });
};
