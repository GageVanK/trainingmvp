import { NextResponse } from 'next/server';
import webpush from 'web-push';

// You should set these environment variables in your Vercel project settings
const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  publicVapidKey,
  privateVapidKey
);

export async function POST(req: Request) {
  try {
    const subscription = await req.json();
    
    // Store the subscription in your database here
    // For this example, we'll just log it
    console.log('New subscription:', subscription);

    // Send a test notification
    const payload = JSON.stringify({
      title: 'Subscription Successful',
      body: 'You will now receive booking notifications!'
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ message: 'Subscription added successfully' });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}

