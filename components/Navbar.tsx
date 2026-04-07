'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Project', path: '/projects' },
  { name: 'About Me', path: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b">
      <h1 className="font-bold text-lg">Gdexcel</h1>

      <ul className="flex gap-6">
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
      </ul>
    </nav>
  );
}
