import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());

    const sendToZapier = async (data) => {
      try {
        await fetch('https://hooks.zapier.com/hooks/catch/23816799/uuwupe8/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error('Feil ved sending til Zapier:', error);
      }
    };

    const file = formData.get('bilde');
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        plainFormData.bilde = reader.result;
        sendToZapier(plainFormData);
      };
      reader.readAsDataURL(file);
    } else {
      sendToZapier(plainFormData);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-white shadow p-4 rounded-xl max-w-md w-full">
        {!submitted ? (
          <>
            <h1 className="text-xl font-bold mb-2 text-center">
              Hvordan kan vi hjelpe deg med ditt elektriske anlegg?
            </h1>
            <p className="mb-3 text-center text-gray-700 text-sm">
              Fyll ut skjemaet nedenfor og gi oss så mye informasjon som mulig.<br />
              Beskriv problemet, oppgi type boenhet og årstall for anlegget.<br />
              Last gjerne opp et bilde hvis mulig.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
              <textarea
                name="problem"
                className="w-full border p-2 rounded text-sm"
                placeholder="Beskriv problemet..."
                required
                rows="3"
              />
              <input
                name="boenhet"
                type="text"
                className="w-full border p-2 rounded text-sm"
                placeholder="Type boenhet"
                required
              />
              <input
                name="aarstall"
                type="text"
                className="w-full border p-2 rounded text-sm"
                placeholder="Årstall for anlegget"
                required
              />
              <input
                name="bilde"
                type="file"
                className="w-full border p-2 rounded text-sm"
              />
              <input
                name="email"
                type="email"
                className="w-full border p-2 rounded text-sm"
                placeholder="E-postadresse"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-2 rounded-lg text-sm"
              >
                {loading ? 'Sender...' : 'SEND INN'}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center font-semibold text-lg">
            Takk! Vi har mottatt din henvendelse, du vil snart få svar av vår Elråd-AI.
          </p>
        )}
      </div>
    </Layout>
  );
}
