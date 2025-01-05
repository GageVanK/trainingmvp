import { NextResponse } from 'next/server';
import webpush from 'web-push';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (!publicVapidKey || !privateVapidKey) {
  console.error('VAPID keys are not set in environment variables');
  throw new Error('VAPID keys are not set');
}

webpush.setVapidDetails(
  'mailto:your-application-server@example.com',
  publicVapidKey,
  privateVapidKey
);

export async function POST(req: Request) {
  try {
    // In a real application, you would fetch subscriptions from your database
    const subscriptions = [
      // Example subscription object
      {
        endpoint: 'https://fcm.googleapis.com/fcm/send/...',
        keys: {
          p256dh: '...',
          auth: '...'
        }
      }
    ];

    const { title, body } = await req.json();
    const payload = JSON.stringify({ title, body });

    const notifications = subscriptions.map(subscription => 
      webpush.sendNotification(subscription, payload)
    );

    await Promise.all(notifications);

    return NextResponse.json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}

