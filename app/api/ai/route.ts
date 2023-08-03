import { openAI } from '@/lib/openAI';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { userContent } = await request.json();
  const response = await openAI(userContent);
  return NextResponse.json({ data: response.data.choices[0].message?.content });
};
