'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function PushNotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      // Register service worker
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          setRegistration(reg);
          return reg.pushManager.getSubscription();
        })
        .then((sub) => {
          setIsSubscribed(!(sub === null));
          setSubscription(sub);
        });
    }
  }, []);

  async function subscribeUser() {
    try {
      const applicationServerKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!applicationServerKey) {
        throw new Error('VAPID public key is not set');
      }

      const sub = await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
      setSubscription(sub);
      setIsSubscribed(true);

      // Send subscription to server
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(sub),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Subscription successful');
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
    }
  }

  async function unsubscribeUser() {
    try {
      await subscription?.unsubscribe();
      setIsSubscribed(false);
      setSubscription(null);
      console.log('User is unsubscribed');
    } catch (error) {
      console.error('Error unsubscribing', error);
    }
  }

  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return <p>Push notifications are not supported in this browser</p>;
  }

  return (
    <Button onClick={isSubscribed ? unsubscribeUser : subscribeUser}>
      {isSubscribed ? 'Unsubscribe from' : 'Subscribe to'} Notifications
    </Button>
  );
}

