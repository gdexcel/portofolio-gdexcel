import 'dotenv/config';
import { db } from '@/config/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // cari user
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const user = result[0];

  if (!user) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  // cek password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  // set cookie
  const res = NextResponse.json({ success: true });

  res.cookies.set('admin', 'true', {
    httpOnly: true,
    path: '/',
  });

  return res;
}
