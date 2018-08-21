/* eslint-disable no-restricted-globals */
/* global workbox, self */

workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerNavigationRoute('/')

workbox.precaching.precacheAndRoute(self.__precacheManifest);
