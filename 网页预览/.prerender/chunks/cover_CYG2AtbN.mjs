//#region src/content/posts/guide/cover.avif
var cover_default = new Proxy({
	"src": "/_astro/cover.bDPQizdp.avif",
	"width": 1631,
	"height": 917,
	"format": "avif"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/guide/cover.avif";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/guide/cover.avif");
	return target[name];
} });
//#endregion
export { cover_default as default };
