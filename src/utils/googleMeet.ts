import { google } from 'googleapis';

interface MeetingParams {
  summary: string;
  description: string;
  startTime: Date;
  attendees: string[];
}

export async function generateMeetLink(params: MeetingParams): Promise<string> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const endTime = new Date(params.startTime);
    endTime.setHours(endTime.getHours() + 1); // Default duration: 1 hour

    const event = {
      summary: params.summary,
      description: params.description,
      start: {
        dateTime: params.startTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: params.attendees.map(email => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    return response.data.hangoutLink || '';
  } catch (error) {
    console.error('Error generating Meet link:', error);
    throw new Error('Failed to generate meeting link');
  }
}