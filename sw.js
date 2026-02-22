const CACHE_NAME = 'zhencang-v1';
const urlsToCache = [
  '/zhencang/',
  '/zhencang/index.html',
  '/zhencang/manifest.json',
  '/zhencang/https://i.postimg.cc/9FxpcN7g/wu-biao-ti85-20260222152719.png',
  '/zhencang/https://i.postimg.cc/9QrB0tPB/wu-biao-ti86-20260222152751.png'
];

// 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并从缓存中响应
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在缓存中找到，返回缓存内容
        if (response) {
          return response;
        }
        // 否则从网络获取
        return fetch(event.request);
      })
  );
});

// 激活Service Worker，清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});