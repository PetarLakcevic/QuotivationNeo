import * as PusherPushNotifications from '@pusher/push-notifications-web';

const beamsClient = new PusherPushNotifications.Client({
    instanceId: '99cb5cc1-5bc5-418c-a5b6-54fccaed6182',
  });
  
  beamsClient.start().then(() => {
    // Build something beatiful 🌈
    console.log('beamsClient.start() is called');
  }).catch(e => {
    console.error(e);
  });
  console.log('beamsClient.start() is called');