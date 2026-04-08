import { db } from '@/config/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // cek udah ada user belum
  const existing = await db.select().from(users);

  if (existing.length > 0) {
    return Response.json({ error: 'Admin already exists' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    password: hashed,
  });

  return Response.json({ success: true });
}
