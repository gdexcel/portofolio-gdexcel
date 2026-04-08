'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Project', path: '/projects' },
  { name: 'About Me', path: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = document.cookie.includes('admin=true');
    setIsAdmin(check);
  }, []);

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push('/admin/admin-panel');
    } else {
      router.push('/admin/login');
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b">
      <h1 className="font-bold text-lg">Gdexcel</h1>

      <ul className="flex gap-6 items-center">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`hover:text-blue-500 ${
                pathname === item.path ? 'font-bold text-blue-600' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* 🔥 Admin Button */}
        <li>
          <button
            onClick={handleAdminClick}
            className="px-3 py-1 border rounded hover:bg-black hover:text-white transition"
          >
            {isAdmin ? 'Dashboard' : 'Admin'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
