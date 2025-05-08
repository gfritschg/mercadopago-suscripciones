'use client'
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    setLoading(true);
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email,
        back_url: 'http://localhost:3000/success'
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    window.location.href = data.init_point; // redirige automáticamente
  };

  return (
    <main className="p-10">
      <h1 className="text-xl font-bold">Suscribirse a Bin CleanToon</h1>
      <input
        className="border p-2 m-2"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Correo electrónico"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={subscribe}
        disabled={loading}
      >
        {loading ? 'Redirigiendo...' : 'Suscribirse'}
      </button>
    </main>
  );
}
