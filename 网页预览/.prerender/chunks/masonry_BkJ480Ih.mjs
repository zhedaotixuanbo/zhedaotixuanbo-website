//#region src/content/posts/images/masonry.avif
var masonry_default = new Proxy({
	"src": "/_astro/masonry.BgzRsBcp.avif",
	"width": 2192,
	"height": 1233,
	"format": "avif"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/masonry.avif";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/masonry.avif");
	return target[name];
} });
//#endregion
export { masonry_default as default };
