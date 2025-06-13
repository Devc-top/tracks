import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { latitude, longitude } = req.body;

  // Use environment variables for security
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const to = process.env.EMAIL_TO || user;

  if (!user || !pass) {
    return res.status(500).send('Email credentials not set');
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  let mailOptions = {
    from: `"Location Tracker" <${user}>`,
    to,
    subject: 'New Location Tracked',
    text: `Latitude: ${latitude}, Longitude: ${longitude}`,
    html: `<b>Latitude:</b> ${latitude}<br><b>Longitude:</b> ${longitude}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Location sent!');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('Error sending email');
  }
}
