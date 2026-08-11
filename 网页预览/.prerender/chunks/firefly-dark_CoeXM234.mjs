//#region src/assets/images/logo/firefly-dark.png
var firefly_dark_default = new Proxy({
	"src": "/_astro/firefly-dark.b7MsfgPt.png",
	"width": 192,
	"height": 192,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-dark.png";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-dark.png");
	return target[name];
} });
//#endregion
export { firefly_dark_default as default };
