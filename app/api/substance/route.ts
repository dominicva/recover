import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const GET = async () => {
  const substances = await prisma.substance.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  if (!substances) {
    return NextResponse.json({ error: 'No substances found' }, { status: 404 });
  }

  return NextResponse.json({ data: substances }, { status: 200 });
};
