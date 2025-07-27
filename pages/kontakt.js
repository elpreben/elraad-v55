import { useState } from 'react';
import Layout from '../components/Layout';

export default function Kontakt() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plainFormData)
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Feil ved innsending:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white shadow p-4 rounded-xl max-w-md w-full mt-4">
        {!submitted ? (
          <>
            <h1 className="text-lg font-bold mb-2 text-center">Kontakt oss</h1>
            <p className="mb-3 text-center text-gray-700 text-xs">
              Fyll ut skjema, og vi vil kontakte deg innen 48 timer for råd og veiledning samtale.
              <br />
              <span className="font-semibold">(Estimert tid: 10–15 min per samtale, Kr 50,- inkl. MVA)</span>
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                name="navn"
                type="text"
                className="w-full border p-2 rounded text-sm"
                placeholder="Fullt navn"
