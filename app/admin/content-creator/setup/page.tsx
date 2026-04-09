'use client';

import { useEffect, useState } from 'react';

export default function ContentCreatorSetup() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const [videos, setVideos] = useState<any[]>([]);

  // 🔥 FETCH DATA
  const fetchVideos = async () => {
    const res = await fetch('/api/admin/projects/video');
    const data = await res.json();
    if (res.ok) setVideos(data.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();

      if (res.ok) {
        setCategories(data.data);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!title || !videoUrl || !categoryId) {
      alert('Isi yang wajib dulu, jangan males');
      return;
    }

    const res = await fetch('/api/admin/projects/video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        videoUrl,
        thumbnail,
        categoryId: Number(categoryId),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Project video ditambah');

      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnail('');
      setCategoryId('');

      fetchVideos(); // 🔥 refresh list
    } else {
      alert(data.error || 'Gagal nambah project');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tambah Project Video</h1>

      {/* FORM */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 400,
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded-md"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Pilih Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* 🔥 KATALOG */}
      <h2 style={{ marginTop: 40 }}>List Video</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 20,
          marginTop: 20,
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 10,
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            {video.thumbnail && (
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: '100%', height: 150, objectFit: 'cover' }}
              />
            )}

            <div style={{ padding: 10 }}>
              <h3 style={{ fontSize: 16 }}>{video.title}</h3>
              <p style={{ fontSize: 12, color: '#666' }}>{video.description}</p>

              <a
                href={video.videoUrl}
                target="_blank"
                style={{ fontSize: 12, color: 'blue' }}
              >
                Lihat Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
