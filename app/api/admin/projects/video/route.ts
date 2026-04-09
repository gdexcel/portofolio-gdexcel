import { db } from '@/config/db';
import { projectsVideo, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, videoUrl, thumbnail, categoryId } = body;

    if (!title || !videoUrl || !categoryId) {
      return Response.json({ error: 'Field wajib kosong' }, { status: 400 });
    }

    await db.insert(projectsVideo).values({
      title,
      description,
      videoUrl,
      thumbnail,
      categoryId,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const data = await db
    .select({
      id: projectsVideo.id,
      title: projectsVideo.title,
      description: projectsVideo.description,
      videoUrl: projectsVideo.videoUrl,
      thumbnail: projectsVideo.thumbnail,
      categoryId: projectsVideo.categoryId,
      categoryName: categories.name, // 🔥 ini yang lo butuh
      createdAt: projectsVideo.createdAt,
    })
    .from(projectsVideo)
    .leftJoin(categories, eq(projectsVideo.categoryId, categories.id));

  return Response.json({ data });
}
