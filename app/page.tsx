import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto flex flex-col justify-center min-h-[80vh]">
      {/* HERO */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Halo, Saya Gdexcel 👋
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl">
          Content Creator dan Web Developer
        </p>
      </div>

      {/* CTA BUTTON */}
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-80 transition"
        >
          Lihat Project
        </Link>

        <Link
          href="/about"
          className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
        >
          Tentang Saya
        </Link>
      </div>
    </section>
  );
}
