// Email API client for communicating with the email server

const EMAIL_SERVER_URL = process.env.EMAIL_SERVER_URL ;

interface EmailApiOptions {
  endpoint: string;
  data: Record<string, any>;
}

class EmailApiClient {
  private async makeRequest(options: EmailApiOptions) {
    try {
      const response = await fetch(`${EMAIL_SERVER_URL}${options.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`Email API request failed: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Email API request error:', error);
      throw error;
    }
  }

  async sendNewRentalRequestEmail(data: {
    recipientName: string;
    customerName: string;
    productTitle: string;
    startDate: string;
    endDate: string;
    productId: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/new-rental-request',
        data,
      });
      console.log('✅ New rental request email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending new rental request email:', error);
      throw error;
    }
  }

  async sendRequestApprovedEmail(data: {
    recipientName: string;
    productTitle: string;
    startDate: string;
    endDate: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/request-approved',
        data,
      });
      console.log('✅ Request approved email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending request approved email:', error);
      throw error;
    }
  }

  async sendRequestRejectedEmail(data: {
    recipientName: string;
    productTitle: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/request-rejected',
        data,
      });
      console.log('✅ Request rejected email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending request rejected email:', error);
      throw error;
    }
  }

  async sendPaymentCompletedEmail(data: {
    recipientName: string;
    customerName: string;
    productTitle: string;
    amount: number;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/payment-completed',
        data,
      });
      console.log('✅ Payment completed email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending payment completed email:', error);
      throw error;
    }
  }

  async sendPaymentConfirmedEmail(data: {
    recipientName: string;
    productTitle: string;
    amount: number;
    startDate: string;
    endDate: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/payment-confirmed',
        data,
      });
      console.log('✅ Payment confirmed email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending payment confirmed email:', error);
      throw error;
    }
  }

  async sendReturnInitiatedEmail(data: {
    recipientName: string;
    customerName: string;
    productTitle: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/return-initiated',
        data,
      });
      console.log('✅ Return initiated email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending return initiated email:', error);
      throw error;
    }
  }

  async sendReturnConfirmedEmail(data: {
    recipientName: string;
    productTitle: string;
    returnDate: string;
    rentalRequestId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/return-confirmed',
        data,
      });
      console.log('✅ Return confirmed email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending return confirmed email:', error);
      throw error;
    }
  }

  async sendInvoiceEmail(data: {
    recipientName: string;
    invoiceNumber: string;
    amount: number;
    dueDate: string;
    productTitle: string;
    rentalPeriod: string;
    invoiceId: string;
    email: string;
  }) {
    try {
      const result = await this.makeRequest({
        endpoint: '/api/email/invoice',
        data,
      });
      console.log('✅ Invoice email sent via API');
      return result;
    } catch (error) {
      console.error('❌ Error sending invoice email:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const emailApiClient = new EmailApiClient();
