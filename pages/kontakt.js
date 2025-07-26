
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Kontakt() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      navn: e.target.navn.value,
      telefon: e.target.telefon.value,
      email: e.target.email.value,
      adresse: e.target.adresse.value,
      postadresse: e.target.postadresse.value
    };

    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Kontakt oss</h1>
        <p className="mb-4 text-center">
          Fyll ut skjemaet under, og vi vil kontakte deg i løpet av 48 timer.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="navn" type="text" className="w-full border p-2 rounded" placeholder="Navn" required />
            <input name="telefon" type="text" className="w-full border p-2 rounded" placeholder="Telefonnummer" required />
            <input name="email" type="email" className="w-full border p-2 rounded" placeholder="E-post" required />
            <input name="adresse" type="text" className="w-full border p-2 rounded" placeholder="Adresse" required />
            <input name="postadresse" type="text" className="w-full border p-2 rounded" placeholder="Postadresse" required />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-3 rounded-lg">
              {loading ? 'Sender...' : 'SEND INN'}
            </button>
          </form>
        ) : (
          <p className="text-center font-semibold text-lg">Takk! Vi tar kontakt innen 48 timer.</p>
        )}
      </div>
    </Layout>
  );
}
