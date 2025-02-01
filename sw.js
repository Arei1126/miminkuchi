const VERSION = "0";
const CACHE_NAME = `miminkuchi-${VERSION}`;

const APP_STATIC_RESOURCES = [
	"./manifest.json",
	"./index.html",
	"./resources/css/css.css",
	"./resources/scripts/script.js",
	"./resources/icons/icon.png",
	"./resources/icons/screen.jpg",
	"./resources/scripts/kuromoji.js",
	"./resources/scripts/module/csv.js",
	"./resources/scripts/module/idb.js",
	"./resources/scripts/dict/base.dat.gz",
	"./resources/scripts/dict/cc.dat.gz",
	"./resources/scripts/dict/check.dat.gz",
	"./resources/scripts/dict/tid.dat.gz",
	"./resources/scripts/dict/tid_map.dat.gz",
	"./resources/scripts/dict/tid_pos.dat.gz",
	"./resources/scripts/dict/unk.dat.gz",
	"./resources/scripts/dict/unk_char.dat.gz",
	"./resources/scripts/dict/unk_compat.dat.gz",
	"./resources/scripts/dict/unk_invoke.dat.gz",
	"./resources/scripts/dict/unk_map.dat.gz",
];

self.addEventListener("install", (e) => {  // chashの更新はここで。cache_nameが変わるとここのが読み込まれる
	self.skipWaiting(); //  次のページロードを待たずに更新
	console.log("installを検出");
	e.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		console.dir(cache);
	  for (resource of APP_STATIC_RESOURCES){
		  console.log(resource+ ' を追加しようとします');
		  try{
			  await cache.add(resource);
		  }catch(err){
			  console.warn(resource+" を追加できませんでした");
		  }
	  }
  })()
  );
});


self.addEventListener("activate", (event) => {  // これで古いキャッシュが消去される
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
		  console.log("キャッシュ名 "+name+" を消去します");
            return caches.delete(name);
          }
        }),
      );
      await clients.claim();
    })(),
  );
});


self.addEventListener("fetch", (event) => {  // 通信をここでごにょごにょする

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) {
				// Return the cached response if it's available.
				console.log(event.request.url + "はキャシュにあった　");
				return cachedResponse;
			}
			// Respond with a HTTP 404 response status.
			console.warn(event.request.url + "はキャシュにはなかった　");
			//return new Response(null, { status: 404 });  // だからといって諦めるのはないだろ
			return fetch(event.request);  // ネットからダウンロード
		})(),
	);
});
