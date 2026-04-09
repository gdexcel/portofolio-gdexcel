import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminPanel() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <div className="flex gap-5 mt-5">
        <Link href="/admin/content-creator/setup">
          <button className="px-5 py-3 rounded-lg border border-gray-300 font-medium transition hover:bg-black hover:text-white">
            Content Creator
          </button>
        </Link>

        <Link href="/admin/web-developer/setup">
          <button className="px-5 py-3 rounded-lg border border-gray-300 font-medium transition hover:bg-black hover:text-white">
            Web Developer
          </button>
        </Link>
      </div>
    </div>
  );
}
