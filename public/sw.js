const CACHE_VERSION = 1.03;

const CURRENT_CACHE =  {
  static:"staticVersion-" + CACHE_VERSION,
  dynamic:"dynamicVersion-" + CACHE_VERSION,

}

self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open(CURRENT_CACHE.static).then((cache) => {
      return cache.addAll(['/', '/assets/css/style.css', '/assets/js/app.js'])
    })
  )
})

self.addEventListener('activate', (event) => {
  const expectetCacheName = Object.values(CURRENT_CACHE)
  event.waitUntil(
    caches.keys().then(cacheKeys => {
      return Promise.all(
        cacheKeys.forEach(cacheKey => {
          if(!expectetCacheName.includes(cacheKey)){
              return caches.delete(cacheKey)
          }
        })
      )
    })
  )
  
})

self.addEventListener('fetch', (event) => {

    caches.open(CURRENT_CACHE.static).then((cache) => {
        return cache.match(event.request)
        .then(res =>{
            // return res || fetch(event.request)
            if(res){
              console.log(res);
              return res
            }
            return fetch(event.request).then(netRes =>{
              cache.put(event.request, netRes.clone())

              return netRes
            })
            .catch(err => {throw err})
        })
         
      })
})

// self.addEventListener('fetch', (event) => {
// event.respondWith(
//   caches.match(event.request).then(res =>{
//     if(res) return res

//     return fetch(event.request).then(netRes =>{
//       chaches.open(CURRENT_CACHE.dynamic).then(cache =>{
//         cache.put(event.request, netRes.clone())
//         return netRes
//       })
//     })
//   })
// )
  
// })

