import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache runtime assets
registerRoute(
  /\.(?:js|css|html)$/,
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);
