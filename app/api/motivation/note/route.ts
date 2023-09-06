import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const POST = async (req: NextRequest) => {
  const { note } = await req.json();

  return NextResponse.json({ data: note }, { status: 200 });
};
