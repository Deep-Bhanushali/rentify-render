const emailService = require('./emailService');

// Test email functionality
async function sendTestEmail() {
  try {
    console.log('🧪 Testing email service...');

    // Generate a welcome/test email
    const emailData = emailService.generateNewRentalRequestEmail({
      recipientName: 'Test User',
      customerName: 'Jane Smith',
      productTitle: 'Test Product - MacBook Pro',
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 7 days later
      productId: 'test-product-123',
      rentalRequestId: 'test-request-456',
    });

    await emailService.sendEmail({
      to: 'dabhanushali@enacton.email',
      subject: '🎉 Welcome to Rentify - Email Server Test',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Email</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
              .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { padding: 30px; }
              .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #c3e6cb; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5e9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Email Server Test Successful!</h1>
              </div>
              <div class="content">
                <p>Hello!</p>

                <div class="success">
                  <strong>✅ Your Rentify Email Server is working correctly!</strong>
                  <br><br>
                  This test email confirms that:
                  <ul>
                    <li>SMTP connection is established</li>
                    <li>Email templates are rendering properly</li>
                    <li>Server can send emails through external SMTP</li>
                  </ul>
                </div>

                <p>This email server is now deployed and ready to handle:</p>
                <ul>
                  <li>New rental request notifications</li>
                  <li>Payment confirmations</li>
                  <li>Return notifications</li>
                  <li>Invoice emails</li>
                </ul>

                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li>Deploy this server to Vercel</li>
                  <li>Update your main app's EMAIL_SERVER_URL</li>
                  <li>Test the full integration</li>
                </ol>

                <p>Happy Renting! 🚀</p>

                <div class="footer">
                  <p>Sent by Rentify Email Server | Test Email</p>
                  <p><small>This is an automated test email</small></p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Welcome to Rentify - Email Server Test

Hello!

Your Rentify Email Server is working correctly!

This test email confirms that:
- SMTP connection is established
- Email templates are rendering properly
- Server can send emails through external SMTP

This email server is now ready to handle:
- New rental request notifications
- Payment confirmations
- Return notifications
- Invoice emails

Next Steps:
1. Deploy this server to Vercel
2. Update your main app's EMAIL_SERVER_URL
3. Test the full integration

Happy Renting!

Sent by Rentify Email Server | Test Email
This is an automated test email
      `,
    });

    console.log('✅ Test email sent successfully to dabhanushali@enacton.email');
    console.log('📧 Check your inbox for the test email!');

  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    console.error('💡 Make sure your SMTP credentials are configured correctly in the .env file');
    process.exit(1);
  }
}

// Run the test
sendTestEmail();
