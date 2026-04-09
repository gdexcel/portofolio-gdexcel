'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SetupPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // admin check
  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch('/api/admin/me');

      if (res.ok) {
        // kalau admin udah ada → tendang
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  const handleSubmit = async () => {
    if (!username || !password) {
      alert('Isi dulu woi');
      return;
    }

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Admin created');
      router.push('/admin/login');
    } else {
      alert(data.error || 'Gagal bikin admin');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Setup Admin</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
