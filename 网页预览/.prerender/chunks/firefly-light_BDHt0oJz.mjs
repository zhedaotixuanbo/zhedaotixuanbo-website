//#region src/assets/images/logo/firefly-light.png
var firefly_light_default = new Proxy({
	"src": "/_astro/firefly-light.DZ-mS7Sc.png",
	"width": 192,
	"height": 192,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-light.png";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-light.png");
	return target[name];
} });
//#endregion
export { firefly_light_default as default };
