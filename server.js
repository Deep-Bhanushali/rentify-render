const express = require('express');
const emailService = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.post('/api/email/new-rental-request', async (req, res) => {
  try {
    const { recipientName, customerName, productTitle, startDate, endDate, productId, rentalRequestId, email } = req.body;

    if (!recipientName || !customerName || !productTitle || !startDate || !endDate || !productId || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateNewRentalRequestEmail({
      recipientName,
      customerName,
      productTitle,
      startDate,
      endDate,
      productId,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'New rental request email sent successfully' });
  } catch (error) {
    console.error('Error sending new rental request email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/request-approved', async (req, res) => {
  try {
    const { recipientName, productTitle, startDate, endDate, rentalRequestId, email } = req.body;

    if (!recipientName || !productTitle || !startDate || !endDate || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateRequestApprovedEmail({
      recipientName,
      productTitle,
      startDate,
      endDate,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Request approved email sent successfully' });
  } catch (error) {
    console.error('Error sending request approved email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/request-rejected', async (req, res) => {
  try {
    const { recipientName, productTitle, rentalRequestId, email } = req.body;

    if (!recipientName || !productTitle || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateRequestRejectedEmail({
      recipientName,
      productTitle,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Request rejected email sent successfully' });
  } catch (error) {
    console.error('Error sending request rejected email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/payment-completed', async (req, res) => {
  try {
    const { recipientName, customerName, productTitle, amount, rentalRequestId, email } = req.body;

    if (!recipientName || !customerName || !productTitle || !amount || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generatePaymentCompletedEmail({
      recipientName,
      customerName,
      productTitle,
      amount: parseFloat(amount),
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Payment completed email sent successfully' });
  } catch (error) {
    console.error('Error sending payment completed email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/payment-confirmed', async (req, res) => {
  try {
    const { recipientName, productTitle, amount, startDate, endDate, rentalRequestId, email } = req.body;

    if (!recipientName || !productTitle || !amount || !startDate || !endDate || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generatePaymentConfirmedEmail({
      recipientName,
      productTitle,
      amount: parseFloat(amount),
      startDate,
      endDate,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Payment confirmed email sent successfully' });
  } catch (error) {
    console.error('Error sending payment confirmed email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/return-initiated', async (req, res) => {
  try {
    const { recipientName, customerName, productTitle, rentalRequestId, email } = req.body;

    if (!recipientName || !customerName || !productTitle || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateReturnInitiatedEmail({
      recipientName,
      customerName,
      productTitle,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Return initiated email sent successfully' });
  } catch (error) {
    console.error('Error sending return initiated email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/return-confirmed', async (req, res) => {
  try {
    const { recipientName, productTitle, returnDate, rentalRequestId, email } = req.body;

    if (!recipientName || !productTitle || !returnDate || !rentalRequestId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateReturnConfirmedEmail({
      recipientName,
      productTitle,
      returnDate,
      rentalRequestId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Return confirmed email sent successfully' });
  } catch (error) {
    console.error('Error sending return confirmed email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/email/invoice', async (req, res) => {
  try {
    const { recipientName, invoiceNumber, amount, dueDate, productTitle, rentalPeriod, invoiceId, email } = req.body;

    if (!recipientName || !invoiceNumber || !amount || !dueDate || !productTitle || !rentalPeriod || !invoiceId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = emailService.generateInvoiceEmail({
      recipientName,
      invoiceNumber,
      amount: parseFloat(amount),
      dueDate,
      productTitle,
      rentalPeriod,
      invoiceId,
    });

    await emailService.sendEmail({
      to: email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    res.json({ success: true, message: 'Invoice email sent successfully' });
  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});

module.exports = app;
