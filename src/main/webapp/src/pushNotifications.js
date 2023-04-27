import Push from 'push.js';

export const requestNotificationPermission = async () => {
  const permission = await Push.Permission.request();
  return permission;
};

export const sendNotification = (title, options) => {
  if (Push.Permission.has()) {
    Push.create(title, options);
  }
};

const timeUntilNextHour = (hour) => {
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0);
  
    if (now.getHours() >= hour) {
      nextHour.setDate(nextHour.getDate() + 1);
    }
  
    return nextHour.getTime() - now.getTime();
  };
  

  export const scheduleDailyNotification = (title, options, hour) => {
    const sendAtHour = async () => {
      if (Push.Permission.has()) {
        Push.create(title, options);
      }
  
      setTimeout(sendAtHour, 24 * 60 * 60 * 1000); // Ponovite slanje notifikacija svakih 24 sata
    };
  
    setTimeout(sendAtHour, timeUntilNextHour(hour));
  };
  
