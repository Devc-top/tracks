import { sendLocationEmail } from '../utils/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required');
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).send('Email credentials not set');
  }

  try {
    await sendLocationEmail(latitude, longitude);
    res.status(200).send('Location sent!');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('Error sending email');
  }
}
