
export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const zapierWebhook = "https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/";
    await fetch(zapierWebhook, { method: 'POST', body: req });
    res.status(200).json({ message: 'Data sendt' });
  } else {
    res.status(405).json({ message: 'Kun POST støttes' });
  }
}
