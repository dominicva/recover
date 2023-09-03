import { NextResponse, NextRequest } from 'next/server';
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

export const DELETE = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('userId');
  console.log('userId', userId);

  if (!userId)
    return NextResponse.json({ error: 'No userId provided' }, { status: 400 });

  try {
    const deletedJournalEntries = await prisma.journalEntry.deleteMany({
      where: {
        userId,
      },
    });

    const deletedQuestionnaires = await prisma.questionnaire.deleteMany({
      where: {
        userId,
      },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      { data: { deletedUser, deletedJournalEntries, deletedQuestionnaires } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
