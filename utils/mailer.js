import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendLocationEmail(latitude, longitude) {
  const mailOptions = {
    from: `"Location Tracker" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: 'New Location Tracked',
    text: `Latitude: ${latitude}, Longitude: ${longitude}`,
    html: `<b>Latitude:</b> ${latitude}<br><b>Longitude:</b> ${longitude}`,
  };

  return transporter.sendMail(mailOptions);
}
