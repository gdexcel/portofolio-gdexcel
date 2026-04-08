import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPanel() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return <h1>Welcome Admin 😎</h1>;
}
