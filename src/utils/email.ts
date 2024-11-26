interface EmailParams {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export async function sendEmailNotification(params: EmailParams): Promise<void> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}