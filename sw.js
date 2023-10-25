self.addEventListener("install", e => {
   e.waitUntil(
      caches.open('static').then(cache => {
        return cache.addAll(["./","./main.css","./main.js","./sample.jpg"]);
      })
    );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
//  console.log(`intercepting fetch request for: ${e.request.url}`);
});

/*
const staticAssets = [
  './',
  './main.css',
  './main.js'
];

self.addEventListener("install", async event => {
  const cache = await caches.open('Weather-static');
  cache.addAll(staticAssets);
});
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if(url.origin = location.origin){
  }else {

  event.respondWith(cacheFirst(req));


}
});

async function cacheFirst(req){
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req){
  const cache = await caches.open('Weather-dynamic');
  try{
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  }catch(error){
    return await cache.match(req);

  }
}
*/
