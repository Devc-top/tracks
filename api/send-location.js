import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) return res.status(400).send('Latitude and longitude required');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    return res.status(500).send('Email credentials not set');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Location Tracker" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: 'New Location Tracked',
    text: `Latitude: ${latitude}, Longitude: ${longitude}`,
    html: `<b>Latitude:</b> ${latitude}<br><b>Longitude:</b> ${longitude}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Location sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
}
