# Rentify Email Server

A separate email service server for Rentify application, deployed on Vercel to send emails from serverless functions.

## Purpose

The main Rentify application is deployed on Render.com, which doesn't allow sending emails directly from the server. This separate email server handles all email sending via HTTP API calls from the main application.

## Features

- ✅ Send rental request notifications
- ✅ Send approval/rejection notifications
- ✅ Send payment confirmations
- ✅ Send return notifications
- ✅ Send invoice emails
- HTML and plain text email templates
- SMTP transport with retry logic
- CORS support
- Error handling and logging

## API Endpoints

### POST /api/email/new-rental-request
Sends a new rental request notification to product owner.

### POST /api/email/request-approved
Sends approval notification to customer.

### POST /api/email/request-rejected
Sends rejection notification to customer.

### POST /api/email/payment-completed
Sends payment received notification to product owner.

### POST /api/email/payment-confirmed
Sends payment confirmation to customer.

### POST /api/email/return-initiated
Sends return initiated notification to product owner.

### POST /api/email/return-confirmed
Sends return confirmed notification to customer.

### POST /api/email/invoice
Sends invoice via email.

### GET /health
Health check endpoint.

## Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
APP_URL=https://your-rentify-app.com
PORT=3001
```

## Deployment

### Local Development

```bash
npm install
npm run dev
```

### Testing Email Functionality

1. Copy `.env.example` to `.env` and fill in your SMTP credentials
2. Run the email test:

```bash
npm run test
```

This will send a test email to dabhanushali@enacton.email to verify your SMTP setup.

### Vercel Deployment

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set environment variables in Vercel dashboard
4. Deploy

## Usage

The main Rentify application calls this email server via `emailApiClient`. For example:

```typescript
await emailApiClient.sendNewRentalRequestEmail({
  recipientName: "John Doe",
  customerName: "Jane Smith",
  productTitle: "MacBook Pro",
  // ... other data
  email: "john@example.com"
});
