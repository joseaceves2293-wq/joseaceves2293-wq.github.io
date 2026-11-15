// Retired: removes the old Pocket test worker so it can't interfere with apps under this site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith('stinger')).map(k => caches.delete(k)));
    await self.registration.unregister();
  })());
});
