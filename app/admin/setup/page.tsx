'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert('Admin created');
      router.push('/admin/login');
    }
  };

  return (
    <div>
      <h1>Setup Admin</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
