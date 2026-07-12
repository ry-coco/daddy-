/* daddy的家 — service worker (offline shell). No backend: pure front-end PWA.
   Derived from Tidal Echo (MIT). IMPORTANT: bump CACHE on every front-end change,
   or installed clients keep the old shell (the precached index.html won't refresh
   until the SW reinstalls). */
const AI_NAME = "daddy";
const CACHE = "daddy-home-v4-openrouter";
const PRECACHE = [
  "./index.html",
  "./manifest.webmanifest",
  "./chat-light.webp", "./chat-harbor.webp",
  "./menu-light.webp", "./menu-harbor.webp",
  "./avatar-sea.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Never cache cross-origin API calls (OpenRouter / ElevenLabs / fonts CDN) — let them hit the network.
  if (url.origin !== location.origin) return;
  if (e.request.mode === "navigate") {
    // network-first for the page → an online reload always gets the latest index.html
    e.respondWith(fetch(e.request, { cache: "reload" }).catch(() => caches.match("./index.html")));
    return;
  }
  if (e.request.method === "GET") {
    e.respondWith(
      caches.match(e.request).then((r) => {
        if (r) return r;
        return fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        });
      })
    );
  }
});
