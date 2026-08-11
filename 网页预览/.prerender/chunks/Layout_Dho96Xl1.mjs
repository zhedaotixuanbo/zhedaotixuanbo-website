import { b as ImageMissingAlt, p as FontFamilyNotFound, t as AstroError } from "./errors_C0BPOsBs.mjs";
import { A as renderHead, M as defineScriptVars, N as createRenderInstruction, V as unescapeHTML, W as createAstro, _ as renderTemplate, c as renderComponent, j as addAttribute, k as maybeRenderHead, m as renderSlot, n as defineStyleVars, r as spreadAttributes } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import { n as getImage$1, t as getConfiguredImageService } from "./assets_CscX_Mdt.mjs";
import { c as isRemoteImage, i as inferRemoteSize$1, l as resolveSrc, s as isESMImportedImage } from "./service_fbU_kRXO.mjs";
import "./compiler_DNPYZl4E.mjs";
import { c as i18n, d as displaySettingsConfig, f as I18nKey, l as siteConfig, s as url } from "./url-utils_DChKFQtU.mjs";
import { t as profileConfig } from "./profileConfig_ODElNiOz.mjs";
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/runtime/server/render/template-depth.js
function templateEnter(_result) {
	return createRenderInstruction({ type: "template-enter" });
}
function templateExit(_result) {
	return createRenderInstruction({ type: "template-exit" });
}
//#endregion
//#region src/config/analyticsConfig.ts
var analyticsConfig = {
	googleAnalyticsId: "",
	microsoftClarityId: "",
	umamiAnalytics: {
		websiteId: "",
		scriptUrl: "https://cloud.umami.is/script.js",
		replaysScriptUrl: "https://cloud.umami.is/recorder.js",
		trackOutboundLinks: true,
		collectWebVitals: false,
		replays: {
			enabled: false,
			sampleRate: .15,
			maskLevel: "moderate",
			maxDuration: 3e5,
			blockSelector: ""
		}
	},
	la51Analytics: {
		Id: "",
		sdkUrl: "",
		ck: "",
		autoTrack: false,
		hashMode: false,
		screenRecord: true
	}
};
//#endregion
//#region src/config/backgroundWallpaper.ts
var backgroundWallpaper = {
	mode: "banner",
	playerEnable: true,
	/**
	* 背景图片配置
	* 图片路径支持三种格式：
	* 1. public 目录（以 "/" 开头，不优化）："/assets/images/banner.avif"
	* 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/banner.avif"
	* 3. 远程 URL："https://example.com/banner.jpg"
	* 注意：远程URL和public目录的图片不会被优化，请确保图片体积足够小以免影响加载速度
	*
	* 建议不要替换d1-d6，m1-m6这些默认示例图片，但你可以删除掉节省空间
	* 因为以后可能会更换示例图片，导致你自定义的图片被覆盖
	* 所以建议使用自己的图片的时候命名为其他名称，不要使用d1-d6，m1-m6这些名称
	*
	* 如果只使用一张图片或者使用随机图API，推荐直接使用字符串格式：
	* desktop: "https://t.alcy.cc/pc",   // 随机图API
	* desktop: "assets/images/DesktopWallpaper/d1.avif", // 单张图片
	*
	* mobile: "https://t.alcy.cc/mp", // 随机图API
	* mobile: "assets/images/MobileWallpaper/m1.avif", // 单张图片
	*
	* 支持配置多张图片（数组），每次刷新页面随机显示一张：
	* desktop: [
	* "assets/images/DesktopWallpaper/d1.avif",
	* "assets/images/DesktopWallpaper/d2.avif",
	* ],
	*
	* mobile:[
	*   "assets/images/MobileWallpaper/m1.avif",
	*   "assets/images/MobileWallpaper/m2.avif",
	* ],
	*/
	src: {
		desktop: [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
			"assets/images/DesktopWallpaper/d5.avif",
			"assets/images/DesktopWallpaper/d6.avif"
		],
		mobile: [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
			"assets/images/MobileWallpaper/m5.avif",
			"assets/images/MobileWallpaper/m6.avif"
		],
		playerUrl: "https://bed.twoleaf.cn/file/1785658612716_firefly.mp4"
	},
	common: {
		dimOpacity: .2,
		playerMode: "random",
		homeText: {
			enable: true,
			title: "Lovely firefly!",
			titleSize: "4.5rem",
			subtitle: [
				"In Reddened Chrysalis, I Once Rest",
				"From Shattered Sky, I Free Fall",
				"Amidst Silenced Stars, I Deep Sleep",
				"Upon Lighted Fyrefly, I Soon Gaze",
				"From Undreamt Night, I Thence Shine",
				"In Finalized Morrow, I Full Bloom"
			],
			subtitleSize: "1.5rem",
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2e3
			}
		},
		postInfo: { mode: "description" },
		navbar: {
			transparentMode: "semi",
			blur: 5
		},
		waves: { enable: {
			desktop: true,
			mobile: true
		} },
		gradient: {
			enable: {
				desktop: true,
				mobile: true
			},
			height: "10%"
		},
		carousel: {
			enable: false,
			interval: 5e3,
			transitionEffect: "zoom"
		}
	},
	banner: { position: "0% 20%" },
	overlay: {
		zIndex: -1,
		opacity: .8,
		blur: 10,
		cardOpacity: .5
	},
	fullscreen: { position: "center" }
};
//#endregion
//#region src/config/dynamicConfig.ts
var dynamicConfig = {
	title: "",
	description: "",
	profileUrl: "/about/",
	showComment: true,
	itemsPerPage: 20,
	apiUrl: "/api/dynamic.json",
	memos: {
		enable: false,
		apiUrl: "https://memos.example.com",
		parent: "users/xiaye"
	}
};
//#endregion
//#region src/config/expressiveCodeConfig.ts
/**
* expressive-code配置
* @see https://expressive-code.com/
* 修改本配置后需要重启Astro开发服务器才能生效
*/
var expressiveCodeConfig = {
	darkTheme: "one-dark-pro",
	lightTheme: "one-light",
	pluginCollapsible: {
		enable: true,
		lineThreshold: 15,
		previewLines: 8,
		defaultCollapsed: true
	},
	pluginLanguageBadge: { enable: true },
	pluginLanguageLogo: {
		enable: false,
		color: "mono",
		excludedLangs: []
	}
};
//#endregion
//#region src/config/fontConfig.ts
var fontConfig = {
	enable: true,
	selected: ["system"],
	bannerTitleFont: "--font-zen-maru-gothic",
	bannerSubtitleFont: "--font-inter",
	navbarTitleFont: "",
	codeFont: "--font-jetbrains-mono",
	subsetFonts: { "--font-greatvibes": { extraChars: "" } }
};
//#endregion
//#region src/config/musicConfig.ts
var musicPlayerConfig = {
	showInNavbar: true,
	showInSidebar: true,
	mode: "local",
	volume: .7,
	playMode: "list",
	showLyrics: false,
	meting: {
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		server: "netease",
		type: "playlist",
		id: "10046455237",
		auth: "",
		fallbackApis: ["https://api.injahow.cn/meting/?server=:server&type=:type&id=:id", "https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id"]
	},
	local: { playlist: [{
		name: "使一颗心免于哀伤",
		artist: "知更鸟 / HOYO-MiX / Chevy",
		url: "/assets/music/使一颗心免于哀伤-哼唱.mp3",
		cover: "/assets/music/cover/109951169585655912.webp",
		lrc: ""
	}] }
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Image.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Image = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Image;
	const props = Astro2.props;
	if (props.alt === void 0 || props.alt === null) throw new AstroError(ImageMissingAlt);
	if (typeof props.width === "string") props.width = Number.parseInt(props.width);
	if (typeof props.height === "string") props.height = Number.parseInt(props.height);
	if ((props.layout ?? imageConfig.layout ?? "none") !== "none") {
		props.layout ??= imageConfig.layout;
		props.fit ??= imageConfig.objectFit ?? "cover";
		props.position ??= imageConfig.objectPosition ?? "center";
	} else if (imageConfig.objectFit || imageConfig.objectPosition) {
		props.fit ??= imageConfig.objectFit;
		props.position ??= imageConfig.objectPosition;
	}
	const image = await getImage(props);
	const additionalAttributes = {};
	if (image.srcSet.values.length > 0) additionalAttributes.srcset = image.srcSet.attribute;
	const { class: className, ...attributes } = {
		...additionalAttributes,
		...image.attributes
	};
	return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Image.astro", void 0);
//#endregion
//#region node_modules/.pnpm/mrmime@2.0.1/node_modules/mrmime/index.mjs
var mimes = {
	"3g2": "video/3gpp2",
	"3gp": "video/3gpp",
	"3gpp": "video/3gpp",
	"3mf": "model/3mf",
	"aac": "audio/aac",
	"ac": "application/pkix-attr-cert",
	"adp": "audio/adpcm",
	"adts": "audio/aac",
	"ai": "application/postscript",
	"aml": "application/automationml-aml+xml",
	"amlx": "application/automationml-amlx+zip",
	"amr": "audio/amr",
	"apng": "image/apng",
	"appcache": "text/cache-manifest",
	"appinstaller": "application/appinstaller",
	"appx": "application/appx",
	"appxbundle": "application/appxbundle",
	"asc": "application/pgp-keys",
	"atom": "application/atom+xml",
	"atomcat": "application/atomcat+xml",
	"atomdeleted": "application/atomdeleted+xml",
	"atomsvc": "application/atomsvc+xml",
	"au": "audio/basic",
	"avci": "image/avci",
	"avcs": "image/avcs",
	"avif": "image/avif",
	"aw": "application/applixware",
	"bdoc": "application/bdoc",
	"bin": "application/octet-stream",
	"bmp": "image/bmp",
	"bpk": "application/octet-stream",
	"btf": "image/prs.btif",
	"btif": "image/prs.btif",
	"buffer": "application/octet-stream",
	"ccxml": "application/ccxml+xml",
	"cdfx": "application/cdfx+xml",
	"cdmia": "application/cdmi-capability",
	"cdmic": "application/cdmi-container",
	"cdmid": "application/cdmi-domain",
	"cdmio": "application/cdmi-object",
	"cdmiq": "application/cdmi-queue",
	"cer": "application/pkix-cert",
	"cgm": "image/cgm",
	"cjs": "application/node",
	"class": "application/java-vm",
	"coffee": "text/coffeescript",
	"conf": "text/plain",
	"cpl": "application/cpl+xml",
	"cpt": "application/mac-compactpro",
	"crl": "application/pkix-crl",
	"css": "text/css",
	"csv": "text/csv",
	"cu": "application/cu-seeme",
	"cwl": "application/cwl",
	"cww": "application/prs.cww",
	"davmount": "application/davmount+xml",
	"dbk": "application/docbook+xml",
	"deb": "application/octet-stream",
	"def": "text/plain",
	"deploy": "application/octet-stream",
	"dib": "image/bmp",
	"disposition-notification": "message/disposition-notification",
	"dist": "application/octet-stream",
	"distz": "application/octet-stream",
	"dll": "application/octet-stream",
	"dmg": "application/octet-stream",
	"dms": "application/octet-stream",
	"doc": "application/msword",
	"dot": "application/msword",
	"dpx": "image/dpx",
	"drle": "image/dicom-rle",
	"dsc": "text/prs.lines.tag",
	"dssc": "application/dssc+der",
	"dtd": "application/xml-dtd",
	"dump": "application/octet-stream",
	"dwd": "application/atsc-dwd+xml",
	"ear": "application/java-archive",
	"ecma": "application/ecmascript",
	"elc": "application/octet-stream",
	"emf": "image/emf",
	"eml": "message/rfc822",
	"emma": "application/emma+xml",
	"emotionml": "application/emotionml+xml",
	"eps": "application/postscript",
	"epub": "application/epub+zip",
	"exe": "application/octet-stream",
	"exi": "application/exi",
	"exp": "application/express",
	"exr": "image/aces",
	"ez": "application/andrew-inset",
	"fdf": "application/fdf",
	"fdt": "application/fdt+xml",
	"fits": "image/fits",
	"g3": "image/g3fax",
	"gbr": "application/rpki-ghostbusters",
	"geojson": "application/geo+json",
	"gif": "image/gif",
	"glb": "model/gltf-binary",
	"gltf": "model/gltf+json",
	"gml": "application/gml+xml",
	"gpx": "application/gpx+xml",
	"gram": "application/srgs",
	"grxml": "application/srgs+xml",
	"gxf": "application/gxf",
	"gz": "application/gzip",
	"h261": "video/h261",
	"h263": "video/h263",
	"h264": "video/h264",
	"heic": "image/heic",
	"heics": "image/heic-sequence",
	"heif": "image/heif",
	"heifs": "image/heif-sequence",
	"hej2": "image/hej2k",
	"held": "application/atsc-held+xml",
	"hjson": "application/hjson",
	"hlp": "application/winhlp",
	"hqx": "application/mac-binhex40",
	"hsj2": "image/hsj2",
	"htm": "text/html",
	"html": "text/html",
	"ics": "text/calendar",
	"ief": "image/ief",
	"ifb": "text/calendar",
	"iges": "model/iges",
	"igs": "model/iges",
	"img": "application/octet-stream",
	"in": "text/plain",
	"ini": "text/plain",
	"ink": "application/inkml+xml",
	"inkml": "application/inkml+xml",
	"ipfix": "application/ipfix",
	"iso": "application/octet-stream",
	"its": "application/its+xml",
	"jade": "text/jade",
	"jar": "application/java-archive",
	"jhc": "image/jphc",
	"jls": "image/jls",
	"jp2": "image/jp2",
	"jpe": "image/jpeg",
	"jpeg": "image/jpeg",
	"jpf": "image/jpx",
	"jpg": "image/jpeg",
	"jpg2": "image/jp2",
	"jpgm": "image/jpm",
	"jpgv": "video/jpeg",
	"jph": "image/jph",
	"jpm": "image/jpm",
	"jpx": "image/jpx",
	"js": "text/javascript",
	"json": "application/json",
	"json5": "application/json5",
	"jsonld": "application/ld+json",
	"jsonml": "application/jsonml+json",
	"jsx": "text/jsx",
	"jt": "model/jt",
	"jxl": "image/jxl",
	"jxr": "image/jxr",
	"jxra": "image/jxra",
	"jxrs": "image/jxrs",
	"jxs": "image/jxs",
	"jxsc": "image/jxsc",
	"jxsi": "image/jxsi",
	"jxss": "image/jxss",
	"kar": "audio/midi",
	"ktx": "image/ktx",
	"ktx2": "image/ktx2",
	"less": "text/less",
	"lgr": "application/lgr+xml",
	"list": "text/plain",
	"litcoffee": "text/coffeescript",
	"log": "text/plain",
	"lostxml": "application/lost+xml",
	"lrf": "application/octet-stream",
	"m1v": "video/mpeg",
	"m21": "application/mp21",
	"m2a": "audio/mpeg",
	"m2t": "video/mp2t",
	"m2ts": "video/mp2t",
	"m2v": "video/mpeg",
	"m3a": "audio/mpeg",
	"m4a": "audio/mp4",
	"m4p": "application/mp4",
	"m4s": "video/iso.segment",
	"ma": "application/mathematica",
	"mads": "application/mads+xml",
	"maei": "application/mmt-aei+xml",
	"man": "text/troff",
	"manifest": "text/cache-manifest",
	"map": "application/json",
	"mar": "application/octet-stream",
	"markdown": "text/markdown",
	"mathml": "application/mathml+xml",
	"mb": "application/mathematica",
	"mbox": "application/mbox",
	"md": "text/markdown",
	"mdx": "text/mdx",
	"me": "text/troff",
	"mesh": "model/mesh",
	"meta4": "application/metalink4+xml",
	"metalink": "application/metalink+xml",
	"mets": "application/mets+xml",
	"mft": "application/rpki-manifest",
	"mid": "audio/midi",
	"midi": "audio/midi",
	"mime": "message/rfc822",
	"mj2": "video/mj2",
	"mjp2": "video/mj2",
	"mjs": "text/javascript",
	"mml": "text/mathml",
	"mods": "application/mods+xml",
	"mov": "video/quicktime",
	"mp2": "audio/mpeg",
	"mp21": "application/mp21",
	"mp2a": "audio/mpeg",
	"mp3": "audio/mpeg",
	"mp4": "video/mp4",
	"mp4a": "audio/mp4",
	"mp4s": "application/mp4",
	"mp4v": "video/mp4",
	"mpd": "application/dash+xml",
	"mpe": "video/mpeg",
	"mpeg": "video/mpeg",
	"mpf": "application/media-policy-dataset+xml",
	"mpg": "video/mpeg",
	"mpg4": "video/mp4",
	"mpga": "audio/mpeg",
	"mpp": "application/dash-patch+xml",
	"mrc": "application/marc",
	"mrcx": "application/marcxml+xml",
	"ms": "text/troff",
	"mscml": "application/mediaservercontrol+xml",
	"msh": "model/mesh",
	"msi": "application/octet-stream",
	"msix": "application/msix",
	"msixbundle": "application/msixbundle",
	"msm": "application/octet-stream",
	"msp": "application/octet-stream",
	"mtl": "model/mtl",
	"mts": "video/mp2t",
	"musd": "application/mmt-usd+xml",
	"mxf": "application/mxf",
	"mxmf": "audio/mobile-xmf",
	"mxml": "application/xv+xml",
	"n3": "text/n3",
	"nb": "application/mathematica",
	"nq": "application/n-quads",
	"nt": "application/n-triples",
	"obj": "model/obj",
	"oda": "application/oda",
	"oga": "audio/ogg",
	"ogg": "audio/ogg",
	"ogv": "video/ogg",
	"ogx": "application/ogg",
	"omdoc": "application/omdoc+xml",
	"onepkg": "application/onenote",
	"onetmp": "application/onenote",
	"onetoc": "application/onenote",
	"onetoc2": "application/onenote",
	"opf": "application/oebps-package+xml",
	"opus": "audio/ogg",
	"otf": "font/otf",
	"owl": "application/rdf+xml",
	"oxps": "application/oxps",
	"p10": "application/pkcs10",
	"p7c": "application/pkcs7-mime",
	"p7m": "application/pkcs7-mime",
	"p7s": "application/pkcs7-signature",
	"p8": "application/pkcs8",
	"pdf": "application/pdf",
	"pfr": "application/font-tdpfr",
	"pgp": "application/pgp-encrypted",
	"pkg": "application/octet-stream",
	"pki": "application/pkixcmp",
	"pkipath": "application/pkix-pkipath",
	"pls": "application/pls+xml",
	"png": "image/png",
	"prc": "model/prc",
	"prf": "application/pics-rules",
	"provx": "application/provenance+xml",
	"ps": "application/postscript",
	"pskcxml": "application/pskc+xml",
	"pti": "image/prs.pti",
	"qt": "video/quicktime",
	"raml": "application/raml+yaml",
	"rapd": "application/route-apd+xml",
	"rdf": "application/rdf+xml",
	"relo": "application/p2p-overlay+xml",
	"rif": "application/reginfo+xml",
	"rl": "application/resource-lists+xml",
	"rld": "application/resource-lists-diff+xml",
	"rmi": "audio/midi",
	"rnc": "application/relax-ng-compact-syntax",
	"rng": "application/xml",
	"roa": "application/rpki-roa",
	"roff": "text/troff",
	"rq": "application/sparql-query",
	"rs": "application/rls-services+xml",
	"rsat": "application/atsc-rsat+xml",
	"rsd": "application/rsd+xml",
	"rsheet": "application/urc-ressheet+xml",
	"rss": "application/rss+xml",
	"rtf": "text/rtf",
	"rtx": "text/richtext",
	"rusd": "application/route-usd+xml",
	"s3m": "audio/s3m",
	"sbml": "application/sbml+xml",
	"scq": "application/scvp-cv-request",
	"scs": "application/scvp-cv-response",
	"sdp": "application/sdp",
	"senmlx": "application/senml+xml",
	"sensmlx": "application/sensml+xml",
	"ser": "application/java-serialized-object",
	"setpay": "application/set-payment-initiation",
	"setreg": "application/set-registration-initiation",
	"sgi": "image/sgi",
	"sgm": "text/sgml",
	"sgml": "text/sgml",
	"shex": "text/shex",
	"shf": "application/shf+xml",
	"shtml": "text/html",
	"sieve": "application/sieve",
	"sig": "application/pgp-signature",
	"sil": "audio/silk",
	"silo": "model/mesh",
	"siv": "application/sieve",
	"slim": "text/slim",
	"slm": "text/slim",
	"sls": "application/route-s-tsid+xml",
	"smi": "application/smil+xml",
	"smil": "application/smil+xml",
	"snd": "audio/basic",
	"so": "application/octet-stream",
	"spdx": "text/spdx",
	"spp": "application/scvp-vp-response",
	"spq": "application/scvp-vp-request",
	"spx": "audio/ogg",
	"sql": "application/sql",
	"sru": "application/sru+xml",
	"srx": "application/sparql-results+xml",
	"ssdl": "application/ssdl+xml",
	"ssml": "application/ssml+xml",
	"stk": "application/hyperstudio",
	"stl": "model/stl",
	"stpx": "model/step+xml",
	"stpxz": "model/step-xml+zip",
	"stpz": "model/step+zip",
	"styl": "text/stylus",
	"stylus": "text/stylus",
	"svg": "image/svg+xml",
	"svgz": "image/svg+xml",
	"swidtag": "application/swid+xml",
	"t": "text/troff",
	"t38": "image/t38",
	"td": "application/urc-targetdesc+xml",
	"tei": "application/tei+xml",
	"teicorpus": "application/tei+xml",
	"text": "text/plain",
	"tfi": "application/thraud+xml",
	"tfx": "image/tiff-fx",
	"tif": "image/tiff",
	"tiff": "image/tiff",
	"toml": "application/toml",
	"tr": "text/troff",
	"trig": "application/trig",
	"ts": "video/mp2t",
	"tsd": "application/timestamped-data",
	"tsv": "text/tab-separated-values",
	"ttc": "font/collection",
	"ttf": "font/ttf",
	"ttl": "text/turtle",
	"ttml": "application/ttml+xml",
	"txt": "text/plain",
	"u3d": "model/u3d",
	"u8dsn": "message/global-delivery-status",
	"u8hdr": "message/global-headers",
	"u8mdn": "message/global-disposition-notification",
	"u8msg": "message/global",
	"ubj": "application/ubjson",
	"uri": "text/uri-list",
	"uris": "text/uri-list",
	"urls": "text/uri-list",
	"vcard": "text/vcard",
	"vrml": "model/vrml",
	"vtt": "text/vtt",
	"vxml": "application/voicexml+xml",
	"war": "application/java-archive",
	"wasm": "application/wasm",
	"wav": "audio/wav",
	"weba": "audio/webm",
	"webm": "video/webm",
	"webmanifest": "application/manifest+json",
	"webp": "image/webp",
	"wgsl": "text/wgsl",
	"wgt": "application/widget",
	"wif": "application/watcherinfo+xml",
	"wmf": "image/wmf",
	"woff": "font/woff",
	"woff2": "font/woff2",
	"wrl": "model/vrml",
	"wsdl": "application/wsdl+xml",
	"wspolicy": "application/wspolicy+xml",
	"x3d": "model/x3d+xml",
	"x3db": "model/x3d+fastinfoset",
	"x3dbz": "model/x3d+binary",
	"x3dv": "model/x3d-vrml",
	"x3dvz": "model/x3d+vrml",
	"x3dz": "model/x3d+xml",
	"xaml": "application/xaml+xml",
	"xav": "application/xcap-att+xml",
	"xca": "application/xcap-caps+xml",
	"xcs": "application/calendar+xml",
	"xdf": "application/xcap-diff+xml",
	"xdssc": "application/dssc+xml",
	"xel": "application/xcap-el+xml",
	"xenc": "application/xenc+xml",
	"xer": "application/patch-ops-error+xml",
	"xfdf": "application/xfdf",
	"xht": "application/xhtml+xml",
	"xhtml": "application/xhtml+xml",
	"xhvml": "application/xv+xml",
	"xlf": "application/xliff+xml",
	"xm": "audio/xm",
	"xml": "text/xml",
	"xns": "application/xcap-ns+xml",
	"xop": "application/xop+xml",
	"xpl": "application/xproc+xml",
	"xsd": "application/xml",
	"xsf": "application/prs.xsf+xml",
	"xsl": "application/xml",
	"xslt": "application/xml",
	"xspf": "application/xspf+xml",
	"xvm": "application/xv+xml",
	"xvml": "application/xv+xml",
	"yaml": "text/yaml",
	"yang": "application/yang",
	"yin": "application/yin+xml",
	"yml": "text/yaml",
	"zip": "application/zip"
};
function lookup(extn) {
	let tmp = ("" + extn).trim().toLowerCase();
	let idx = tmp.lastIndexOf(".");
	return mimes[!~idx ? tmp : tmp.substring(++idx)];
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Picture.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Picture = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Picture;
	const defaultFormats = ["webp"];
	const defaultFallbackFormat = "png";
	const specialFormatsFallback = [
		"gif",
		"svg",
		"jpg",
		"jpeg"
	];
	const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
	if (props.alt === void 0 || props.alt === null) throw new AstroError(ImageMissingAlt);
	const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
	if (scopedStyleClass) if (pictureAttributes.class) pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
	else pictureAttributes.class = scopedStyleClass;
	const useResponsive = (props.layout ?? imageConfig.layout ?? "none") !== "none";
	if (useResponsive) {
		props.layout ??= imageConfig.layout;
		props.fit ??= imageConfig.objectFit ?? "cover";
		props.position ??= imageConfig.objectPosition ?? "center";
	} else if (imageConfig.objectFit || imageConfig.objectPosition) {
		props.fit ??= imageConfig.objectFit;
		props.position ??= imageConfig.objectPosition;
	}
	for (const key in props) if (key.startsWith("data-astro-cid")) pictureAttributes[key] = props[key];
	const originalSrc = await resolveSrc(props.src);
	if (props.inferSize && isRemoteImage(originalSrc)) {
		const remoteSize = await inferRemoteSize(originalSrc);
		delete props.inferSize;
		props.width ??= remoteSize.width;
		props.height ??= remoteSize.height;
	}
	const optimizedImages = await Promise.all(formats.map(async (format) => await getImage({
		...props,
		src: originalSrc,
		format,
		widths: props.widths,
		densities: props.densities
	})));
	const clonedSrc = isESMImportedImage(originalSrc) ? originalSrc.clone ?? originalSrc : originalSrc;
	let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
	if (!fallbackFormat && isESMImportedImage(clonedSrc) && specialFormatsFallback.includes(clonedSrc.format)) resultFallbackFormat = clonedSrc.format;
	const fallbackImage = await getImage({
		...props,
		format: resultFallbackFormat,
		widths: props.widths,
		densities: props.densities
	});
	const imgAdditionalAttributes = {};
	const sourceAdditionalAttributes = {};
	if (props.sizes) sourceAdditionalAttributes.sizes = props.sizes;
	if (fallbackImage.srcSet.values.length > 0) imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
	const { class: className, ...attributes } = {
		...imgAdditionalAttributes,
		...fallbackImage.attributes
	};
	return renderTemplate`${maybeRenderHead($$result)}<picture${spreadAttributes(pictureAttributes)}>${Object.entries(optimizedImages).map(([_, image]) => {
		return renderTemplate`<source${addAttribute(props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute, "srcset")}${addAttribute(lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
	})}<img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}></picture>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Picture.astro", void 0);
//#endregion
//#region \0virtual:astro:assets/fonts/internal
var componentDataByCssVariable = /* @__PURE__ */ new Map([
	["--font-zen-maru-gothic", {
		"preloads": [
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/0777cbdcf1983e64.woff2",
				"weight": "300"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/bd11f27b8dbac1a1.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/55e2e1306166cc66.woff2",
				"weight": "500"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/0f7c5e2ce7cab7eb.woff2",
				"weight": "700"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/ad6bc6999df197d3.woff2",
				"weight": "300"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/eecbb020c15d3d07.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/179376c88e792cbb.woff2",
				"weight": "500"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/5e5f2ba54502ad0c.woff2",
				"weight": "700"
			}
		],
		"css": "@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/0777cbdcf1983e64.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:300;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/bd11f27b8dbac1a1.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/55e2e1306166cc66.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/0f7c5e2ce7cab7eb.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:700;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/ad6bc6999df197d3.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:300;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/eecbb020c15d3d07.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:400;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/179376c88e792cbb.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:500;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0\";src:url(\"/_astro/fonts/5e5f2ba54502ad0c.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:700;font-style:normal;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:300;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:400;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:500;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial Bold\";src:local(\"Arial Bold\");font-display:swap;font-weight:700;font-style:normal;size-adjust:91.6704%;ascent-override:126.5403%;descent-override:31.4169%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:300;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:400;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:500;font-style:normal;size-adjust:98.6988%;ascent-override:117.5293%;descent-override:29.1797%;line-gap-override:0%;}@font-face{font-family:\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial Bold\";src:local(\"Arial Bold\");font-display:swap;font-weight:700;font-style:normal;size-adjust:91.6704%;ascent-override:126.5403%;descent-override:31.4169%;line-gap-override:0%;}:root{--font-zen-maru-gothic:\"Zen Maru Gothic-20da1854feb236c0\",\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial\",\"Zen Maru Gothic-20da1854feb236c0 fallback: Arial Bold\",sans-serif;}"
	}],
	["--font-inter", {
		"preloads": [
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/b92787725bce141b.woff2",
				"weight": "300"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/07431a16dd76433e.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/fe8426e418b1784b.woff2",
				"weight": "500"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/c5c4490645b295f5.woff2",
				"weight": "600"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/ffa1f1149b7accfe.woff2",
				"weight": "700"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/508014400d20fe8c.woff2",
				"weight": "300"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/bc273a2ecdfd6228.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/2e91b11b3637a475.woff2",
				"weight": "500"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/d66ba9aabc6d3ddb.woff2",
				"weight": "600"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/8675f4cad3dc992b.woff2",
				"weight": "700"
			}
		],
		"css": "@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/b92787725bce141b.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:300;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/07431a16dd76433e.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/fe8426e418b1784b.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/c5c4490645b295f5.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/ffa1f1149b7accfe.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:700;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/508014400d20fe8c.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:300;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/bc273a2ecdfd6228.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:400;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/2e91b11b3637a475.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:500;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/d66ba9aabc6d3ddb.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:600;font-style:normal;}@font-face{font-family:Inter-bab5275136dc0807;src:url(\"/_astro/fonts/8675f4cad3dc992b.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:700;font-style:normal;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:300;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:400;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:500;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:600;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial Bold\";src:local(\"Arial Bold\");font-display:swap;font-weight:700;font-style:normal;size-adjust:97.6602%;ascent-override:99.196%;descent-override:24.699%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:300;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:400;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:500;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:600;font-style:normal;size-adjust:105.1479%;ascent-override:92.1322%;descent-override:22.9402%;line-gap-override:0%;}@font-face{font-family:\"Inter-bab5275136dc0807 fallback: Arial Bold\";src:local(\"Arial Bold\");font-display:swap;font-weight:700;font-style:normal;size-adjust:97.6602%;ascent-override:99.196%;descent-override:24.699%;line-gap-override:0%;}:root{--font-inter:Inter-bab5275136dc0807,\"Inter-bab5275136dc0807 fallback: Arial\",\"Inter-bab5275136dc0807 fallback: Arial Bold\",sans-serif;}"
	}],
	["--font-jetbrains-mono", {
		"preloads": [
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/cc5f60fd46e42cc9.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "latin",
				"type": "woff2",
				"url": "/_astro/fonts/4e13c01b98043a1e.woff2",
				"weight": "700"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/4a498dfb2bdc397b.woff2",
				"weight": "400"
			},
			{
				"style": "normal",
				"subset": "cyrillic",
				"type": "woff2",
				"url": "/_astro/fonts/1eeba51e3ef72549.woff2",
				"weight": "700"
			}
		],
		"css": "@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd\";src:url(\"/_astro/fonts/cc5f60fd46e42cc9.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd\";src:url(\"/_astro/fonts/4e13c01b98043a1e.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:700;font-style:normal;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd\";src:url(\"/_astro/fonts/4a498dfb2bdc397b.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:400;font-style:normal;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd\";src:url(\"/_astro/fonts/1eeba51e3ef72549.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:700;font-style:normal;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd fallback: Courier New\";src:local(\"Courier New\");font-display:swap;font-weight:400;font-style:normal;size-adjust:99.9837%;ascent-override:102.0166%;descent-override:30.0049%;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd fallback: Courier New\";src:local(\"Courier New\");font-display:swap;font-weight:700;font-style:normal;size-adjust:99.9837%;ascent-override:102.0166%;descent-override:30.0049%;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd fallback: Courier New\";src:local(\"Courier New\");font-display:swap;font-weight:400;font-style:normal;size-adjust:99.9837%;ascent-override:102.0166%;descent-override:30.0049%;}@font-face{font-family:\"JetBrains Mono-17dcdfba148ee2dd fallback: Courier New\";src:local(\"Courier New\");font-display:swap;font-weight:700;font-style:normal;size-adjust:99.9837%;ascent-override:102.0166%;descent-override:30.0049%;}:root{--font-jetbrains-mono:\"JetBrains Mono-17dcdfba148ee2dd\",\"JetBrains Mono-17dcdfba148ee2dd fallback: Courier New\",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;}"
	}]
]);
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/assets/fonts/core/filter-preloads.js
function filterPreloads(data, preload) {
	if (!preload) return null;
	if (preload === true) return data;
	return data.filter(({ weight, style, subset }) => preload.some((p) => {
		if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) return false;
		if (p.style !== void 0 && p.style !== style) return false;
		if (p.subset !== void 0 && p.subset !== subset) return false;
		return true;
	}));
}
function checkWeight(input, target) {
	const trimmedInput = input.trim();
	if (trimmedInput.includes(" ")) return trimmedInput === target;
	if (target.includes(" ")) {
		const [a, b] = target.split(" ");
		const parsedInput = Number.parseInt(input);
		return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
	}
	return input === target;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Font.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Font = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Font;
	const { cssVariable, preload = false } = Astro.props;
	const data = componentDataByCssVariable.get(cssVariable);
	if (!data) throw new AstroError({
		...FontFamilyNotFound,
		message: FontFamilyNotFound.message(cssVariable)
	});
	const filteredPreloadData = filterPreloads(data.preloads, preload);
	return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/components/Font.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/assets/fonts/infra/remote-runtime-font-file-url-resolver.js
var RemoteRuntimeFontFileUrlResolver = class {
	#urls;
	#address;
	constructor({ urls, address }) {
		this.#urls = urls;
		this.#address = address;
	}
	resolve(url) {
		if (!this.#urls.has(url)) return null;
		if (!this.#address) throw new Error("Server address unavailable, this should not happen. Open an issue.");
		if (!url.startsWith("/")) url = new URL(url).pathname;
		return `http://${this.#address.family === "IPv6" ? `[${this.#address.address}]` : this.#address.address}:${this.#address.port}${url}`;
	}
};
new RemoteRuntimeFontFileUrlResolver({
	urls: /* @__PURE__ */ new Set([
		"/_astro/fonts/0777cbdcf1983e64.woff2",
		"/_astro/fonts/bd11f27b8dbac1a1.woff2",
		"/_astro/fonts/55e2e1306166cc66.woff2",
		"/_astro/fonts/0f7c5e2ce7cab7eb.woff2",
		"/_astro/fonts/ad6bc6999df197d3.woff2",
		"/_astro/fonts/eecbb020c15d3d07.woff2",
		"/_astro/fonts/179376c88e792cbb.woff2",
		"/_astro/fonts/5e5f2ba54502ad0c.woff2",
		"/_astro/fonts/b92787725bce141b.woff2",
		"/_astro/fonts/07431a16dd76433e.woff2",
		"/_astro/fonts/fe8426e418b1784b.woff2",
		"/_astro/fonts/c5c4490645b295f5.woff2",
		"/_astro/fonts/ffa1f1149b7accfe.woff2",
		"/_astro/fonts/508014400d20fe8c.woff2",
		"/_astro/fonts/bc273a2ecdfd6228.woff2",
		"/_astro/fonts/2e91b11b3637a475.woff2",
		"/_astro/fonts/d66ba9aabc6d3ddb.woff2",
		"/_astro/fonts/8675f4cad3dc992b.woff2",
		"/_astro/fonts/cc5f60fd46e42cc9.woff2",
		"/_astro/fonts/4e13c01b98043a1e.woff2",
		"/_astro/fonts/4a498dfb2bdc397b.woff2",
		"/_astro/fonts/1eeba51e3ef72549.woff2"
	]),
	address: {
		"address": "::",
		"family": "IPv6",
		"port": 1350
	}
});
//#endregion
//#region \0astro:assets
var assetQueryParams = void 0;
var imageConfig = {
	"endpoint": { "route": "/_image/" },
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": [],
	"remotePatterns": [],
	"layout": "none",
	"responsiveStyles": false
};
Object.defineProperty(imageConfig, "assetQueryParams", {
	value: assetQueryParams,
	enumerable: false,
	configurable: true
});
var inferRemoteSize = async (url) => {
	return (await getConfiguredImageService()).getRemoteSize?.(url, imageConfig) ?? inferRemoteSize$1(url, imageConfig);
};
var getImage = async (options) => await getImage$1(options, imageConfig);
//#endregion
//#region src/constants/constants.ts
var LIGHT_MODE = "light";
var DARK_MODE = "dark";
var SYSTEM_MODE = "system";
var DEFAULT_THEME = LIGHT_MODE;
var WALLPAPER_BANNER = "banner";
var WALLPAPER_FULLSCREEN = "fullscreen";
var WALLPAPER_OVERLAY = "overlay";
var MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5;
//#endregion
//#region src/utils/layout-utils.ts
var toArray = (src) => {
	if (!src) return [];
	if (Array.isArray(src)) return src;
	return [src];
};
var getBackgroundImages = () => {
	const bgSrc = backgroundWallpaper.src;
	if (typeof bgSrc === "object" && bgSrc !== null && !Array.isArray(bgSrc) && ("desktop" in bgSrc || "mobile" in bgSrc)) {
		const srcObj = bgSrc;
		const desktopImages = toArray(srcObj.desktop);
		const mobileImages = toArray(srcObj.mobile);
		return {
			desktop: desktopImages.length > 0 ? desktopImages : mobileImages,
			mobile: mobileImages.length > 0 ? mobileImages : desktopImages,
			isMultiple: desktopImages.length > 1 || mobileImages.length > 1
		};
	}
	const images = toArray(bgSrc);
	return {
		desktop: images,
		mobile: images,
		isMultiple: images.length > 1
	};
};
var isHomePage = (pathname) => {
	const baseUrl = "/";
	const baseUrlNoSlash = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
	if (pathname === baseUrl) return true;
	if (pathname === baseUrlNoSlash) return true;
	if (pathname === "/") return true;
	return false;
};
//#endregion
//#region src/components/analytics/GoogleAnalytics.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$GoogleAnalytics = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GoogleAnalytics;
	const { analyticsId } = Astro.props;
	return renderTemplate`<!-- Google tag (gtag.js) --><script data-swup-ignore-script async${addAttribute(`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`, "src")}><\/script><script>(function(){${defineScriptVars({ analyticsId })}window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', analyticsId);
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/analytics/GoogleAnalytics.astro", void 0);
//#endregion
//#region src/components/analytics/La51Analytics.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$La51Analytics = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$La51Analytics;
	const { analyticsId, sdkUrl, ck, autoTrack = true, hashMode = false, screenRecord = true } = Astro.props;
	return renderTemplate`<script>(function(){${defineScriptVars({
		analyticsId,
		sdkUrl,
		ck,
		autoTrack,
		hashMode,
		screenRecord
	})}
	!(function (p) {
		"use strict";
		!(function () {
			var s = window,
				e = document,
				i = p,
				c = sdkUrl || "".concat(
					"https:" === e.location.protocol ? "https://" : "http://",
					"sdk.51.la/js-sdk-pro.min.js"
				),
				n = e.createElement("script"),
				r = e.getElementsByTagName("script")[0];
			(n.type = "text/javascript"),
				n.setAttribute("charset", "UTF-8"),
				(n.async = !0),
				(n.src = c),
				(n.id = "LA_COLLECT"),
				(i.d = n);
			var o = function () {
				s.LA.ids.push(i);
			};
			s.LA
				? s.LA.ids && o()
				: ((s.LA = p), (s.LA.ids = []), o()),
				r.parentNode.insertBefore(n, r);
		})();
	})({ id: analyticsId, ck: ck || analyticsId, autoTrack: autoTrack, hashMode: hashMode, screenRecord: screenRecord });
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/analytics/La51Analytics.astro", void 0);
//#endregion
//#region src/components/analytics/MicrosoftClarity.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$MicrosoftClarity = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MicrosoftClarity;
	const { clarityId } = Astro.props;
	return renderTemplate`<script>(function(){${defineScriptVars({ clarityId })}
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityId);
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/analytics/MicrosoftClarity.astro", void 0);
//#endregion
//#region src/components/analytics/UmamiAnalytics.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$UmamiAnalytics = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UmamiAnalytics;
	const { websiteId, scriptUrl, replaysScriptUrl, trackOutboundLinks = true, collectWebVitals = false, replays } = Astro.props;
	const replaysEnabled = replays?.enabled ?? false;
	const replaysSampleRate = replays?.sampleRate ?? .15;
	const replaysMaskLevel = replays?.maskLevel ?? "moderate";
	const replaysMaxDuration = replays?.maxDuration ?? 3e5;
	const replaysBlockSelector = replays?.blockSelector?.trim();
	return renderTemplate`<script data-swup-ignore-script defer${addAttribute(scriptUrl, "src")}${addAttribute(websiteId, "data-website-id")}${addAttribute(collectWebVitals ? "true" : void 0, "data-performance")}><\/script>${replaysEnabled && renderTemplate`<script data-swup-ignore-script defer${addAttribute(replaysScriptUrl, "src")}${addAttribute(websiteId, "data-website-id")}${addAttribute(String(replaysSampleRate), "data-sample-rate")}${addAttribute(replaysMaskLevel, "data-mask-level")}${addAttribute(String(replaysMaxDuration), "data-max-duration")}${addAttribute(replaysBlockSelector || void 0, "data-block-selector")}><\/script>`}${trackOutboundLinks && renderTemplate`<script data-swup-ignore-script>
			;(() => {
				const name = 'outbound-link-click'

				const applyOutboundTracking = () => {
					document.querySelectorAll('a').forEach((a) => {
						if (
							a.host !== window.location.host &&
							!a.getAttribute('data-umami-event')
						) {
							a.setAttribute('data-umami-event', name)
							a.setAttribute('data-umami-event-url', a.href)
						}
					})
				}

				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', applyOutboundTracking, {
						once: true,
					})
				} else {
					applyOutboundTracking()
				}

				document.addEventListener('astro:page-load', applyOutboundTracking)
			})()
		<\/script>`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/analytics/UmamiAnalytics.astro", void 0);
//#endregion
//#region src/components/features/CodeGroupManager.astro
var $$CodeGroupManager = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/CodeGroupManager.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/CodeGroupManager.astro", void 0);
//#endregion
//#region src/components/features/FancyboxManager.astro
var $$FancyboxManager = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FancyboxManager.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FancyboxManager.astro", void 0);
//#endregion
//#region src/utils/fontHelper.ts
/**
* 从 fontConfig 中收集所有实际使用的字体 CSS 变量名。
*
* 包括：
* - selected 中的非 "system" 值
* - bannerTitleFont / bannerSubtitleFont / navbarTitleFont 区域覆盖
* - codeFont 代码块字体
*
* @returns 去重后的 CSS 变量名集合（如 "--font-inter"）
*/
function collectUsedFontCssVars(config) {
	const used = /* @__PURE__ */ new Set();
	const sel = config.selected;
	if (Array.isArray(sel)) {
		for (const v of sel) if (v !== "system") used.add(v);
	} else if (sel !== "system") used.add(sel);
	if (config.bannerTitleFont) used.add(config.bannerTitleFont);
	if (config.bannerSubtitleFont) used.add(config.bannerSubtitleFont);
	if (config.navbarTitleFont) used.add(config.navbarTitleFont);
	if (config.codeFont) used.add(config.codeFont);
	return used;
}
//#endregion
//#region src/components/features/FontSetup.astro
var $$FontSetup = createComponent(($$result, $$props, $$slots) => {
	const allCssVars = fontConfig.enable ? collectUsedFontCssVars(fontConfig) : /* @__PURE__ */ new Set();
	const selectedIds = fontConfig.enable && fontConfig.selected ? Array.isArray(fontConfig.selected) ? fontConfig.selected : [fontConfig.selected] : [];
	const SYSTEM_FONT_STACK = "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif";
	const MONO_FONT_STACK = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";
	const selectedFontVars = selectedIds.filter((v) => v !== "system");
	const bodyFontFamily = selectedFontVars.length > 0 ? [...selectedFontVars.map((v) => `var(${v})`), SYSTEM_FONT_STACK].join(", ") : SYSTEM_FONT_STACK;
	const bannerTitleFontVar = fontConfig.enable ? fontConfig.bannerTitleFont || "" : "";
	const bannerSubtitleFontVar = fontConfig.enable ? fontConfig.bannerSubtitleFont || "" : "";
	const navbarTitleFontVar = fontConfig.enable ? fontConfig.navbarTitleFont || "" : "";
	const codeFontVar = fontConfig.enable ? fontConfig.codeFont || "" : "";
	const codeFontFamily = codeFontVar ? `var(${codeFontVar}, ${MONO_FONT_STACK})` : MONO_FONT_STACK;
	return renderTemplate`<!-- Astro Font API: 自动下载、缓存并生成优化的 @font-face -->${Array.from(allCssVars).map((cssVar) => renderTemplate`${renderComponent($$result, "Font", $$Font, {
		"cssVariable": cssVar,
		"preload": selectedFontVars.includes(cssVar)
	})}`)}<!-- 区域字体 CSS 变量 + body 字体 --><!-- --font-code 无条件输出，即使关闭自定义字体，行内代码和代码块也要保持等宽字体 --><style>${unescapeHTML(`
  :root {
    --font-code: ${codeFontFamily};
    ${bannerTitleFontVar ? `--font-banner-title: var(${bannerTitleFontVar}, inherit);` : ""}
    ${bannerSubtitleFontVar ? `--font-banner-subtitle: var(${bannerSubtitleFontVar}, inherit);` : ""}
    ${navbarTitleFontVar ? `--font-navbar-title: var(${navbarTitleFontVar}, inherit);` : ""}
  }

  ${fontConfig.enable && (bannerTitleFontVar || bannerSubtitleFontVar || navbarTitleFontVar || selectedFontVars.length > 0) ? `body {
      font-family: ${bodyFontFamily};
    }` : ""}
`)}</style>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FontSetup.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FontSetup.astro", void 0);
//#endregion
//#region src/components/features/MusicManager.astro
var $$MusicManager = createComponent(($$result, $$props, $$slots) => {
	const config = musicPlayerConfig;
	const localPlaylist = config.mode === "local" && config.local?.playlist ? config.local.playlist.map((song) => {
		const isFullUrl = (path) => /^https?:\/\//.test(path);
		return {
			name: song.name,
			artist: song.artist,
			url: isFullUrl(song.url) ? song.url : url(song.url),
			pic: song.cover ? isFullUrl(song.cover) ? song.cover : url(song.cover) : void 0,
			lrc: song.lrc ? isFullUrl(song.lrc) ? song.lrc : url(song.lrc) : void 0
		};
	}) : [];
	return renderTemplate`<script>(function(){${defineScriptVars({ managerConfigStr: JSON.stringify({
		mode: config.mode,
		meting: config.meting,
		localPlaylist,
		volume: config.volume ?? .7,
		playMode: config.playMode ?? "list",
		showLyrics: config.showLyrics ?? true,
		i18n: {
			noPlaying: i18n(I18nKey.musicNoPlaying),
			lyrics: i18n(I18nKey.musicLyrics),
			volume: i18n(I18nKey.musicVolume),
			playMode: i18n(I18nKey.musicPlayMode),
			prev: i18n(I18nKey.musicPrev),
			next: i18n(I18nKey.musicNext),
			playlist: i18n(I18nKey.musicPlaylist),
			noLyrics: i18n(I18nKey.musicNoLyrics),
			loadingLyrics: i18n(I18nKey.musicLoadingLyrics),
			failedLyrics: i18n(I18nKey.musicFailedLyrics),
			noSongs: i18n(I18nKey.musicNoSongs),
			error: i18n(I18nKey.musicError),
			play: i18n(I18nKey.musicPlay),
			pause: i18n(I18nKey.musicPause),
			progress: i18n(I18nKey.musicProgress),
			noCover: i18n(I18nKey.musicNoCover)
		}
	}) })}
(function () {
    // Singleton guard – only create once
    if (window.__fireflyMusic) return;

    var config = JSON.parse(managerConfigStr);

    // ── Helpers ──────────────────────────────────────────────
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        var min = Math.floor(seconds / 60);
        var sec = Math.floor(seconds % 60);
        return min + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function parseLRC(lrc) {
        if (!lrc) return [];
        var lines = lrc.split('\\n');
        var result = [];
        var timeReg = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;
        lines.forEach(function (line) {
            var matches = Array.from(line.matchAll(timeReg));
            if (matches.length > 0) {
                var text = line.replace(timeReg, '').trim();
                if (text) {
                    matches.forEach(function (match) {
                        var m = parseInt(match[1]);
                        var s = parseInt(match[2]);
                        var ms = parseInt(match[3]);
                        var time = m * 60 + s + ms / (match[3].length === 3 ? 1000 : 100);
                        result.push({ time: time, text: text });
                    });
                }
            }
        });
        return result.sort(function (a, b) { return a.time - b.time; });
    }

    // ── Audio element (persistent, attached to body) ────────
    var audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    audio.style.display = 'none';
    audio.preload = 'none'; // 阻止浏览器预加载和自动恢复播放
    document.body.appendChild(audio);
    audio.pause(); // 确保不自动播放

    // ── State ────────────────────────────────────────────────
    var loadVersion = 0; // incremented on each loadTrack to discard stale play() results
    var state = {
        playlist: [],
        currentIndex: 0,
        isPlaying: false,
        playMode: 0, // 0: list, 1: one, 2: random
        volume: localStorage.getItem('music-player-volume') !== null
            ? parseFloat(localStorage.getItem('music-player-volume'))
            : (config.volume || 0.7),
        isMuted: false,
        lyrics: [],
        currentLrcIndex: -1,
        initialized: false,
        initializing: false,
        error: null
    };

    // Map config playMode string to number
    if (config.playMode === 'random') state.playMode = 2;
    else if (config.playMode === 'one') state.playMode = 1;
    else state.playMode = 0;

    // ── Event helpers ────────────────────────────────────────
    function emit(name, detail) {
        window.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
    }

    // ── Meting fetch ─────────────────────────────────────────
    async function fetchMetingData() {
        if (!config.meting) return;
        var m = config.meting;
        var apis = [m.api].concat(m.fallbackApis || []);

        for (var i = 0; i < apis.length; i++) {
            var baseApi = apis[i];
            if (!baseApi) continue;
            try {
                var fetchUrl = baseApi
                    .replace(':server', m.server)
                    .replace(':type', m.type)
                    .replace(':id', m.id)
                    .replace(':r', Math.random());
                if (m.auth) fetchUrl += '&auth=' + m.auth;

                var res = await fetch(fetchUrl);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                var data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    state.playlist = data.map(function (item) {
                        return {
                            name: item.title || item.name || 'Unknown',
                            artist: item.author || item.artist || 'Unknown',
                            url: item.url,
                            pic: item.pic || item.cover || '',
                            lrc: item.lrc
                        };
                    });
                    return;
                }
            } catch (e) {
                console.warn('Meting API failed for ' + baseApi, e);
            }
        }
        throw new Error('All Meting APIs failed');
    }

    // ── Lyrics ───────────────────────────────────────────────
    function loadLyrics(track) {
        state.lyrics = [];
        state.currentLrcIndex = -1;

        if (!track.lrc) {
            emit('fm:lyrics', { lyrics: [], status: 'none' });
            return;
        }

        var isLrcUrl = /^(https?:)?\\/\\//.test(track.lrc)
            || track.lrc.startsWith('/')
            || /\\.(lrc|txt)(\\?|#|$)/i.test(track.lrc);

        if (isLrcUrl) {
            emit('fm:lyrics', { lyrics: [], status: 'loading' });
            fetch(track.lrc)
                .then(function (r) { return r.text(); })
                .then(function (text) {
                    state.lyrics = parseLRC(text);
                    emit('fm:lyrics', { lyrics: state.lyrics, status: 'loaded' });
                })
                .catch(function () {
                    state.lyrics = [];
                    emit('fm:lyrics', { lyrics: [], status: 'failed' });
                });
        } else {
            state.lyrics = parseLRC(track.lrc);
            emit('fm:lyrics', { lyrics: state.lyrics, status: state.lyrics.length > 0 ? 'loaded' : 'none' });
        }
    }

    var currentTrackUrls = [];
    var currentTrackUrlIndex = 0;
    var errorSkipTimeout = null;

    function tryPlayCurrentTrackUrl(autoPlay, ver) {
        if (ver !== loadVersion) return;
        var playUrl = currentTrackUrls[currentTrackUrlIndex];
        audio.src = playUrl;

        if (autoPlay) {
            audio.play().then(function () {
                if (ver !== loadVersion) return; // stale, discard
                state.isPlaying = true;
                state.error = null;
                emit('fm:play-state', { isPlaying: true });
            }).catch(function (e) {
                if (ver !== loadVersion) return; // stale, discard
                if (e.name === 'AbortError') return; // interrupted by new load
                console.warn('Autoplay blocked:', e);
            });
        } else {
            state.isPlaying = false;
            emit('fm:play-state', { isPlaying: false });
        }
    }

    // ── Track loading ────────────────────────────────────────
    function loadTrack(index, autoPlay) {
        if (index < 0 || index >= state.playlist.length) return;
        state.currentIndex = index;
        var track = state.playlist[index];
        var ver = ++loadVersion;

        if (errorSkipTimeout) {
            clearTimeout(errorSkipTimeout);
            errorSkipTimeout = null;
        }

        currentTrackUrls = [track.url];
        currentTrackUrlIndex = 0;

        var matchId = track.url.match(/[?&]id=([^&]+)/);
        var matchServer = track.url.match(/[?&]server=([^&]+)/);
        if (matchId && matchServer && config.meting && config.meting.fallbackApis) {
            config.meting.fallbackApis.forEach(function (fallback) {
                var fallbackUrl = fallback
                    .replace(':server', matchServer[1])
                    .replace(':type', 'url')
                    .replace(':id', matchId[1]);
                if (currentTrackUrls.indexOf(fallbackUrl) === -1) {
                    currentTrackUrls.push(fallbackUrl);
                }
            });
        }

        loadLyrics(track);

        emit('fm:track', { index: index, track: track, autoPlay: !!autoPlay });

        tryPlayCurrentTrackUrl(autoPlay, ver);
    }

    // ── Playback controls ────────────────────────────────────
    function togglePlay() {
        if (audio.paused) {
            audio.play().then(function () {
                state.isPlaying = true;
                emit('fm:play-state', { isPlaying: true });
            }).catch(function (e) {
                if (e.name === 'AbortError') return;
                console.warn('Playback failed:', e);
            });
        } else {
            audio.pause();
            state.isPlaying = false;
            emit('fm:play-state', { isPlaying: false });
        }
    }

    function playNext(auto) {
        if (state.playMode === 1 && auto) {
            audio.currentTime = 0;
            audio.play();
            return;
        }
        var nextIndex;
        if (state.playMode === 2) {
            nextIndex = Math.floor(Math.random() * state.playlist.length);
        } else {
            nextIndex = (state.currentIndex + 1) % state.playlist.length;
        }
        loadTrack(nextIndex, true);
    }

    function playPrev() {
        var prevIndex;
        if (state.playMode === 2) {
            prevIndex = Math.floor(Math.random() * state.playlist.length);
        } else {
            prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
        }
        loadTrack(prevIndex, true);
    }

    function setPlayMode(mode) {
        state.playMode = mode;
        emit('fm:mode', { playMode: mode });
    }

    function cyclePlayMode() {
        setPlayMode((state.playMode + 1) % 3);
    }

    function setVolume(val) {
        val = Math.max(0, Math.min(1, val));
        state.volume = val;
        state.isMuted = false;
        audio.volume = val;
        audio.muted = false;
        localStorage.setItem('music-player-volume', val.toString());
        emit('fm:volume', { volume: val, isMuted: false });
    }

    function toggleMute() {
        state.isMuted = !state.isMuted;
        audio.muted = state.isMuted;
        emit('fm:volume', { volume: state.volume, isMuted: state.isMuted });
    }

    function seek(percent) {
        if (!audio.duration) return;
        audio.currentTime = Math.max(0, Math.min(1, percent)) * audio.duration;
    }

    function seekToTime(time) {
        if (!audio.duration) return;
        audio.currentTime = Math.max(0, Math.min(time, audio.duration));
    }

    function playTrackByIndex(index) {
        if (index === state.currentIndex && !audio.paused) {
            togglePlay();
        } else {
            loadTrack(index, true);
        }
    }

    // ── Audio events → broadcast ─────────────────────────────
    audio.addEventListener('timeupdate', function () {
        if (isNaN(audio.duration)) return;
        var ct = audio.currentTime;
        var dur = audio.duration;
        var pct = (ct / dur) * 100;

        emit('fm:time', {
            currentTime: ct,
            duration: dur,
            progress: pct,
            currentTimeStr: formatTime(ct),
            durationStr: formatTime(dur)
        });

        // Lyrics sync
        if (state.lyrics.length > 0) {
            var idx = -1;
            for (var i = 0; i < state.lyrics.length; i++) {
                if (ct >= state.lyrics[i].time) idx = i;
                else break;
            }
            if (idx !== state.currentLrcIndex) {
                state.currentLrcIndex = idx;
                emit('fm:lrc-index', { index: idx });
            }
        }
    });

    audio.addEventListener('ended', function () {
        playNext(true);
    });

    audio.addEventListener('error', function () {
        var ver = loadVersion;
        if (currentTrackUrlIndex < currentTrackUrls.length - 1) {
            currentTrackUrlIndex++;
            console.warn('Playback failed, trying fallback URL: ' + currentTrackUrls[currentTrackUrlIndex]);
            tryPlayCurrentTrackUrl(true, ver);
        } else {
            state.error = 'Audio playback error';
            emit('fm:error', { message: '播放失败，即将自动跳过...' });

            if (errorSkipTimeout) clearTimeout(errorSkipTimeout);
            errorSkipTimeout = setTimeout(function () {
                if (ver === loadVersion) {
                    playNext(true);
                }
            }, 2000);
        }
    });

    // ── Init (idempotent) ────────────────────────────────────
    async function init() {
        if (state.initialized || state.initializing) return;
        state.initializing = true;

        try {
            if (config.mode === 'meting' && config.meting) {
                await fetchMetingData();
            } else if (config.mode === 'local') {
                state.playlist = config.localPlaylist || [];
            }

            if (state.playlist.length > 0) {
                // Apply volume
                audio.volume = state.volume;

                var startIndex = 0;
                if (state.playMode === 2) {
                    startIndex = Math.floor(Math.random() * state.playlist.length);
                }

                state.initialized = true;

                emit('fm:init', {
                    playlist: state.playlist,
                    playMode: state.playMode,
                    volume: state.volume,
                    isMuted: state.isMuted
                });

                loadTrack(startIndex, false);
            } else {
                state.initialized = true;
                emit('fm:init', {
                    playlist: [],
                    playMode: state.playMode,
                    volume: state.volume,
                    isMuted: state.isMuted
                });
                emit('fm:error', { message: config.i18n.noSongs });
            }
        } catch (e) {
            console.error('Music Manager init error:', e);
            state.initialized = true;
            emit('fm:init', {
                playlist: [],
                playMode: state.playMode,
                volume: state.volume,
                isMuted: state.isMuted
            });
            emit('fm:error', { message: config.i18n.error });
        } finally {
            state.initializing = false;
        }
    }

    // ── Public API ───────────────────────────────────────────
    window.__fireflyMusic = {
        init: init,
        getState: function () {
            var track = state.playlist[state.currentIndex] || null;
            return {
                playlist: state.playlist,
                currentIndex: state.currentIndex,
                track: track,
                isPlaying: state.isPlaying,
                playMode: state.playMode,
                volume: state.volume,
                isMuted: state.isMuted,
                currentTime: audio.currentTime,
                duration: audio.duration || 0,
                progress: audio.duration ? (audio.currentTime / audio.duration) * 100 : 0,
                currentTimeStr: formatTime(audio.currentTime),
                durationStr: formatTime(audio.duration),
                lyrics: state.lyrics,
                currentLrcIndex: state.currentLrcIndex,
                initialized: state.initialized,
                error: state.error,
                config: config
            };
        },
        togglePlay: togglePlay,
        playNext: function () { playNext(false); },
        playPrev: playPrev,
        cyclePlayMode: cyclePlayMode,
        setVolume: setVolume,
        toggleMute: toggleMute,
        seek: seek,
        seekToTime: seekToTime,
        playTrackByIndex: playTrackByIndex,
        loadTrack: loadTrack
    };
})();
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/MusicManager.astro", void 0);
//#endregion
//#region src/components/features/MusicPlayerView.astro
var $$MusicPlayerView = createComponent(($$result, $$props, $$slots) => {
	const viewConfigStr = JSON.stringify({
		showLyrics: musicPlayerConfig.showLyrics ?? true,
		i18n: {
			noPlaying: i18n(I18nKey.musicNoPlaying),
			lyrics: i18n(I18nKey.musicLyrics),
			noLyrics: i18n(I18nKey.musicNoLyrics),
			loadingLyrics: i18n(I18nKey.musicLoadingLyrics),
			failedLyrics: i18n(I18nKey.musicFailedLyrics),
			noSongs: i18n(I18nKey.musicNoSongs),
			error: i18n(I18nKey.musicError),
			play: i18n(I18nKey.musicPlay),
			pause: i18n(I18nKey.musicPause),
			noCover: i18n(I18nKey.musicNoCover),
			music: i18n(I18nKey.music)
		}
	});
	return renderTemplate`<!-- 播放列表条目模板：所有 widget 共用一份 --><template id="playlist-item-template" data-astro-cid-xfxzjgof>${templateEnter($$result)}${maybeRenderHead($$result)}<div class="playlist-item flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group" data-astro-cid-xfxzjgof><div class="w-8 h-8 rounded-md overflow-hidden shrink-0 relative bg-neutral-200 dark:bg-neutral-700" data-astro-cid-xfxzjgof><img src="" class="item-cover w-full h-full object-cover" loading="lazy" alt="" data-astro-cid-xfxzjgof><!-- Active Indicator overlay with animated equalizer / play icon --><div class="item-active-overlay absolute inset-0 bg-(--primary)/20 hidden items-center justify-center" data-astro-cid-xfxzjgof><div class="eq-bars flex items-end gap-[2px] h-3.5" data-astro-cid-xfxzjgof><span class="eq-bar w-[3px] bg-(--primary) rounded-sm" data-astro-cid-xfxzjgof></span><span class="eq-bar w-[3px] bg-(--primary) rounded-sm" data-astro-cid-xfxzjgof></span><span class="eq-bar w-[3px] bg-(--primary) rounded-sm" data-astro-cid-xfxzjgof></span></div><svg class="eq-play-icon text-(--primary) hidden" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-xfxzjgof><path d="M8 5v14l11-7z" data-astro-cid-xfxzjgof></path></svg></div></div><div class="flex-1 min-w-0" data-astro-cid-xfxzjgof><div class="item-title text-xs font-bold text-neutral-700 dark:text-neutral-200 truncate group-hover:text-(--primary) transition-colors" data-astro-cid-xfxzjgof></div><div class="item-artist text-[10px] text-neutral-400 truncate" data-astro-cid-xfxzjgof></div></div></div>${templateExit($$result)}</template><script>(function(){${defineScriptVars({ viewConfigStr })}
(function () {
    var cfg = JSON.parse(viewConfigStr);

    var mgr = window.__fireflyMusic;
    if (!mgr) return;

    var initScheduled = false;
    function scheduleInit() {
        if (initScheduled) return;
        initScheduled = true;

        var fired = false;
        function go() {
            if (fired) return;
            fired = true;
            document.removeEventListener('pointerdown', go, true);
            document.removeEventListener('keydown', go, true);
            mgr.init();
        }
        document.addEventListener('pointerdown', go, true);
        document.addEventListener('keydown', go, true);

        function afterLoad() {
            if (window.requestIdleCallback) window.requestIdleCallback(go, { timeout: 2000 });
            else setTimeout(go, 800);
        }
        if (document.readyState === 'complete') afterLoad();
        else window.addEventListener('load', afterLoad, { once: true });
    }

    function initWidget(widget) {
        // ── UI element refs ──────────────────────────────────────
        var ui = {
            widget: widget,
            loading: widget.querySelector('.music-loading'),
            cover: widget.querySelector('.music-cover'),
            title: widget.querySelector('.music-title'),
            artist: widget.querySelector('.music-artist'),
            progressBar: widget.querySelector('.progress-bar'),
            progressThumb: widget.querySelector('.progress-thumb'),
            progressContainer: widget.querySelector('.progress-container'),
            currentTime: widget.querySelector('.current-time'),
            totalTime: widget.querySelector('.total-time'),
            btnPlay: widget.querySelector('.btn-play'),
            iconPlay: widget.querySelector('.icon-play'),
            iconPause: widget.querySelector('.icon-pause'),
            btnPrev: widget.querySelector('.btn-prev'),
            btnNext: widget.querySelector('.btn-next'),
            btnRepeat: widget.querySelector('.btn-repeat'),
            iconRepeat: widget.querySelector('.icon-repeat'),
            iconRepeatOne: widget.querySelector('.icon-repeat-one'),
            iconShuffle: widget.querySelector('.icon-shuffle'),
            btnMute: widget.querySelector('.btn-mute'),
            iconVolHigh: widget.querySelector('.icon-vol-high'),
            iconVolMute: widget.querySelector('.icon-vol-mute'),
            volContainer: widget.querySelector('.vol-container'),
            volBar: widget.querySelector('.vol-bar'),
            btnLrc: widget.querySelector('.btn-lrc-toggle'),
            iconLrcOn: widget.querySelector('.icon-lrc-on'),
            iconLrcOff: widget.querySelector('.icon-lrc-off'),
            lrcDrawer: widget.querySelector('.lrc-drawer'),
            lrcContainer: widget.querySelector('.lrc-container'),
            btnDrawer: widget.querySelector('.btn-drawer-toggle'),
            playlistDrawer: widget.querySelector('.playlist-drawer'),
            playlistContainer: widget.querySelector('.playlist-container'),
            itemTemplate: document.getElementById('playlist-item-template')
        };

        // Verify critical elements
        var _critical = [ui.btnPlay, ui.btnRepeat, ui.btnMute, ui.volContainer,
            ui.btnDrawer, ui.btnLrc, ui.lrcDrawer, ui.lrcContainer,
            ui.progressContainer, ui.btnNext, ui.btnPrev, ui.loading,
            ui.cover, ui.title, ui.artist, ui.playlistContainer, ui.itemTemplate];
        if (_critical.some(function(el) { return !el; })) return;

        // ── Local state (drawers, user scrolling, virtual scroll) ──
        var ITEM_H = 42;
        var OVERSCAN = 8;
        var local = {
            isUserScrolling: false,
            scrollTimeout: null,
            currentLrcIndex: -1,
            vs: {
                playlist: [],
                currentIndex: -1,
                renderedStart: -1,
                renderedEnd: -1,
                renderedEls: {},
                scrollRaf: 0,
                drawerOpen: false
            }
        };

        // ── UI update functions ──────────────────────────────────
        function setLoading(bool) {
            if (bool) {
                ui.loading.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                ui.loading.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        function updatePlayStateUI(isPlaying) {
            if (isPlaying) {
                ui.btnPlay.classList.add('bg-(--primary)', 'text-white', 'hover:brightness-110');
                ui.btnPlay.classList.remove('bg-(--btn-regular-bg)', 'hover:bg-(--btn-regular-bg-hover)', 'active:bg-(--btn-regular-bg-active)', 'text-(--primary)');
                ui.iconPlay.classList.add('hidden');
                ui.iconPause.classList.remove('hidden');
                ui.cover.style.animationPlayState = 'running';
                ui.btnPlay.setAttribute('aria-label', cfg.i18n.pause);
                ui.btnPlay.title = cfg.i18n.pause;
            } else {
                ui.btnPlay.classList.remove('bg-(--primary)', 'text-white', 'hover:brightness-110');
                ui.btnPlay.classList.add('bg-(--btn-regular-bg)', 'hover:bg-(--btn-regular-bg-hover)', 'active:bg-(--btn-regular-bg-active)', 'text-(--primary)');
                ui.iconPlay.classList.remove('hidden');
                ui.iconPause.classList.add('hidden');
                ui.cover.style.animationPlayState = 'paused';
                ui.btnPlay.setAttribute('aria-label', cfg.i18n.play);
                ui.btnPlay.title = cfg.i18n.play;
            }
            // Toggle eq-bars / play icon in playlist
            var activeItems = ui.playlistContainer.querySelectorAll('.playlist-item[aria-current="true"]');
            activeItems.forEach(function (item) {
                var eqBars = item.querySelector('.eq-bars');
                var playIcon = item.querySelector('.eq-play-icon');
                if (isPlaying) {
                    eqBars.classList.remove('hidden');
                    eqBars.classList.add('flex');
                    playIcon.classList.add('hidden');
                } else {
                    eqBars.classList.add('hidden');
                    eqBars.classList.remove('flex');
                    playIcon.classList.remove('hidden');
                }
            });
        }

        function updateModeUI(playMode) {
            var primaryColor = 'text-(--primary)';
            if (playMode === 0) {
                ui.btnRepeat.className = 'p-2 active:scale-95 transition-colors text-neutral-300 dark:text-neutral-600 hover:text-(--primary)';
                ui.iconRepeat.classList.remove('hidden');
                ui.iconRepeatOne.classList.add('hidden');
                ui.iconShuffle.classList.add('hidden');
            } else if (playMode === 1) {
                ui.btnRepeat.className = 'p-2 active:scale-95 transition-colors ' + primaryColor;
                ui.iconRepeat.classList.add('hidden');
                ui.iconRepeatOne.classList.remove('hidden');
                ui.iconShuffle.classList.add('hidden');
            } else {
                ui.btnRepeat.className = 'p-2 active:scale-95 transition-colors ' + primaryColor;
                ui.iconRepeat.classList.add('hidden');
                ui.iconRepeatOne.classList.add('hidden');
                ui.iconShuffle.classList.remove('hidden');
            }
        }

        function updateVolumeUI(volume, isMuted) {
            var pct = isMuted ? 0 : volume * 100;
            ui.volBar.style.width = pct + '%';
            ui.volContainer.setAttribute('aria-valuenow', Math.round(pct).toString());
            if (isMuted || volume === 0) {
                ui.iconVolHigh.classList.add('hidden');
                ui.iconVolMute.classList.remove('hidden');
            } else {
                ui.iconVolHigh.classList.remove('hidden');
                ui.iconVolMute.classList.add('hidden');
            }
        }

        function updateTrackUI(track) {
            if (!track) return;
            ui.title.innerText = track.name;
            ui.title.title = track.name;
            ui.artist.innerText = track.artist;
            ui.artist.title = track.artist;

            if (track.pic) {
                ui.cover.classList.add('opacity-0');
                ui.cover.src = track.pic;
                ui.cover.alt = track.name + ' - ' + track.artist;
            } else {
                ui.cover.src = '';
                ui.cover.classList.add('opacity-0');
                ui.cover.alt = cfg.i18n.noCover;
            }

            // Reset cover rotation
            ui.cover.classList.remove('animate-spin-slow');
            void ui.cover.offsetWidth;
            ui.cover.classList.add('animate-spin-slow');
            ui.cover.style.animationPlayState = 'paused';

            // Reset progress
            ui.progressBar.style.width = '0%';
            ui.progressThumb.style.left = '0%';
            ui.progressContainer.setAttribute('aria-valuenow', '0');
            ui.currentTime.innerText = '0:00';
            ui.totalTime.innerText = '0:00';
        }

        // ── Virtual scroll helpers (absolute-position based) ──────
        var PRIMARY_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1';

        function vsApplyActiveStyle(el, isActive) {
            var overlay = el.querySelector('.item-active-overlay');
            var title = el.querySelector('.item-title');
            var eqBars = el.querySelector('.eq-bars');
            var playIcon = el.querySelector('.eq-play-icon');
            var isPlaying = mgr.getState().isPlaying;
            if (isActive) {
                el.classList.add('bg-neutral-100', 'dark:bg-white/10');
                el.setAttribute('aria-current', 'true');
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
                title.style.color = PRIMARY_COLOR;
                if (isPlaying) {
                    eqBars.classList.remove('hidden');
                    eqBars.classList.add('flex');
                    playIcon.classList.add('hidden');
                } else {
                    eqBars.classList.add('hidden');
                    eqBars.classList.remove('flex');
                    playIcon.classList.remove('hidden');
                }
            } else {
                el.classList.remove('bg-neutral-100', 'dark:bg-white/10');
                el.removeAttribute('aria-current');
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                title.style.color = '';
            }
        }

        function vsCreateItemEl(idx) {
            var vs = local.vs;
            var track = vs.playlist[idx];
            var clone = ui.itemTemplate.content.cloneNode(true);
            var itemEl = clone.querySelector('.playlist-item');
            var img = clone.querySelector('.item-cover');
            var title = clone.querySelector('.item-title');
            var artist = clone.querySelector('.item-artist');

            img.src = track.pic || '';
            img.alt = track.name + ' - ' + track.artist;
            title.innerText = track.name;
            artist.innerText = track.artist;

            itemEl.dataset.index = idx;
            itemEl.setAttribute('role', 'option');
            itemEl.setAttribute('aria-label', track.name + ' - ' + track.artist);
            itemEl.onclick = function () { mgr.playTrackByIndex(idx); };

            // Absolute positioning for virtual scroll
            itemEl.style.position = 'absolute';
            itemEl.style.left = '0';
            itemEl.style.right = '0';
            itemEl.style.top = (idx * ITEM_H) + 'px';
            itemEl.style.height = ITEM_H + 'px';

            if (idx === vs.currentIndex) {
                vsApplyActiveStyle(itemEl, true);
            }
            return clone;
        }

        function vsCommitRange() {
            var vs = local.vs;
            if (vs.playlist.length === 0 || !vs.drawerOpen) return;

            var container = ui.playlistContainer;
            var scrollTop = container.scrollTop;
            var viewHeight = container.clientHeight;
            var start = Math.max(0, Math.floor(scrollTop / ITEM_H) - OVERSCAN);
            var end = Math.min(vs.playlist.length, Math.ceil((scrollTop + viewHeight) / ITEM_H) + OVERSCAN);

            if (start === vs.renderedStart && end === vs.renderedEnd) return;

            if (vs.renderedStart === -1) {
                // First render: batch via fragment
                var frag = document.createDocumentFragment();
                for (var i = start; i < end; i++) {
                    frag.appendChild(vsCreateItemEl(i));
                }
                container.appendChild(frag);
            } else {
                // Incremental: remove out-of-range, add new items
                var oldEls = vs.renderedEls;
                for (var ri = vs.renderedStart; ri < vs.renderedEnd; ri++) {
                    if (ri < start || ri >= end) {
                        if (oldEls[ri]) { oldEls[ri].remove(); delete oldEls[ri]; }
                    }
                }
                for (var ai = start; ai < end; ai++) {
                    if (!oldEls[ai]) {
                        var newEl = vsCreateItemEl(ai);
                        var inserted = false;
                        for (var ni = ai + 1; ni < end; ni++) {
                            if (oldEls[ni]) {
                                container.insertBefore(newEl, oldEls[ni]);
                                inserted = true;
                                break;
                            }
                        }
                        if (!inserted) container.appendChild(newEl);
                        oldEls[ai] = newEl;
                    }
                }
            }

            // Rebuild reference map
            vs.renderedEls = {};
            var children = container.children;
            for (var ci = 0; ci < children.length; ci++) {
                var idx = parseInt(children[ci].dataset.index);
                if (!isNaN(idx)) vs.renderedEls[idx] = children[ci];
            }

            vs.renderedStart = start;
            vs.renderedEnd = end;
        }

        function vsRequestUpdate() {
            var vs = local.vs;
            if (vs.scrollRaf) return;
            vs.scrollRaf = requestAnimationFrame(function () {
                vs.scrollRaf = 0;
                vsCommitRange();
            });
        }

        function vsSetContainerHeight() {
            ui.playlistContainer.style.height = (local.vs.playlist.length * ITEM_H) + 'px';
        }

        function renderPlaylist(playlist, currentIndex) {
            var vs = local.vs;
            vs.playlist = playlist;
            vs.currentIndex = currentIndex;
            vs.renderedStart = -1;
            vs.renderedEnd = -1;
            vs.renderedEls = {};
            vs.drawerOpen = ui.playlistDrawer.style.gridTemplateRows === '1fr';
            ui.playlistContainer.innerHTML = '';
            if (vs.drawerOpen) {
                vsSetContainerHeight();
                vsCommitRange();
            }
        }

        function updatePlaylistActiveUI(currentIndex) {
            var vs = local.vs;
            var oldIndex = vs.currentIndex;
            vs.currentIndex = currentIndex;

            if (vs.renderedEls[oldIndex]) {
                vsApplyActiveStyle(vs.renderedEls[oldIndex], false);
            }

            if (currentIndex >= 0 && currentIndex < vs.playlist.length) {
                if (currentIndex < vs.renderedStart || currentIndex >= vs.renderedEnd) {
                    ui.playlistContainer.scrollTop = currentIndex * ITEM_H;
                    vsCommitRange();
                }
                if (vs.renderedEls[currentIndex]) {
                    vsApplyActiveStyle(vs.renderedEls[currentIndex], true);
                }
            }
        }

        function renderLyricsUI(lyrics, status) {
            local.currentLrcIndex = -1;
            ui.lrcContainer.innerHTML = '';
            if (status === 'loading') {
                ui.lrcContainer.innerHTML = '<div class="text-neutral-400 text-sm py-10">' + cfg.i18n.loadingLyrics + '</div>';
                return;
            }
            if (status === 'failed') {
                ui.lrcContainer.innerHTML = '<div class="text-neutral-400 text-sm py-10">' + cfg.i18n.failedLyrics + '</div>';
                return;
            }
            if (!lyrics || lyrics.length === 0) {
                ui.lrcContainer.innerHTML = '<div class="text-neutral-400 text-sm py-10" role="option">' + cfg.i18n.noLyrics + '</div>';
                return;
            }
            lyrics.forEach(function (line, index) {
                var lineEl = document.createElement('div');
                lineEl.className = 'lrc-line transition-all duration-300 text-sm text-neutral-400 py-1 cursor-pointer hover:text-(--primary)';
                lineEl.innerText = line.text;
                lineEl.dataset.index = index;
                lineEl.setAttribute('role', 'option');
                lineEl.setAttribute('aria-label', line.text);
                lineEl.onclick = function () {
                    mgr.seekToTime(line.time);
                };
                ui.lrcContainer.appendChild(lineEl);
            });
        }

        function updateLrcHighlight(index) {
            if (index === local.currentLrcIndex) return;
            local.currentLrcIndex = index;

            var lines = ui.lrcContainer.querySelectorAll('.lrc-line');
            lines.forEach(function (line, i) {
                if (i === index) {
                    line.classList.add('text-(--primary)', 'font-bold', 'text-base');
                    line.classList.remove('text-neutral-400', 'text-sm');
                } else {
                    line.classList.remove('text-(--primary)', 'font-bold', 'text-base');
                    line.classList.add('text-neutral-400', 'text-sm');
                }
            });

            // Auto-scroll unless user is scrolling
            if (index !== -1 && !local.isUserScrolling) {
                var line = ui.lrcContainer.querySelector('.lrc-line[data-index="' + index + '"]');
                if (line) {
                    var containerHeight = ui.lrcContainer.clientHeight;
                    var lineOffset = line.offsetTop;
                    var lineHeight = line.offsetHeight;
                    var targetScroll = lineOffset - (containerHeight / 2) + (lineHeight / 2);
                    ui.lrcContainer.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
            }
        }

        // ── Full sync from manager state (for late-mount) ────────
        function syncAll() {
            var s = mgr.getState();
            if (!s.initialized) return;

            // Loading off
            setLoading(false);

            if (s.playlist.length === 0) {
                ui.title.innerText = s.error || cfg.i18n.noSongs;
                return;
            }

            renderPlaylist(s.playlist, s.currentIndex);
            if (s.track) updateTrackUI(s.track);
            updatePlayStateUI(s.isPlaying);
            updateModeUI(s.playMode);
            updateVolumeUI(s.volume, s.isMuted);

            // Progress
            if (s.duration > 0) {
                ui.progressBar.style.width = s.progress + '%';
                ui.progressThumb.style.left = s.progress + '%';
                ui.progressContainer.setAttribute('aria-valuenow', Math.round(s.progress).toString());
                ui.currentTime.innerText = s.currentTimeStr;
                ui.totalTime.innerText = s.durationStr;
            }

            // Lyrics
            renderLyricsUI(s.lyrics, s.lyrics.length > 0 ? 'loaded' : 'none');
            if (s.currentLrcIndex >= 0) updateLrcHighlight(s.currentLrcIndex);

            // Cover image: if already set, show it
            if (s.track && s.track.pic && ui.cover.src && ui.cover.complete && ui.cover.naturalWidth > 0) {
                ui.cover.classList.remove('opacity-0');
            }
            // Update cover animation state to match play state
            ui.cover.style.animationPlayState = s.isPlaying ? 'running' : 'paused';
        }

        // ── Event listeners (fm:* from manager) ──────────────────
        var handlers = {};

        function on(name, fn) {
            handlers[name] = fn;
            window.addEventListener(name, fn);
        }

        on('fm:init', function (e) {
            var d = e.detail;
            setLoading(false);
            if (d.playlist.length > 0) {
                renderPlaylist(d.playlist, 0);
                updateModeUI(d.playMode);
                updateVolumeUI(d.volume, d.isMuted);
            } else {
                ui.title.innerText = cfg.i18n.noSongs;
            }
        });

        on('fm:track', function (e) {
            var d = e.detail;
            updateTrackUI(d.track);
            updatePlaylistActiveUI(d.index);
        });

        on('fm:play-state', function (e) {
            updatePlayStateUI(e.detail.isPlaying);
        });

        on('fm:time', function (e) {
            var d = e.detail;
            ui.progressBar.style.width = d.progress + '%';
            ui.progressThumb.style.left = d.progress + '%';
            ui.progressContainer.setAttribute('aria-valuenow', Math.round(d.progress).toString());
            ui.currentTime.innerText = d.currentTimeStr;
            ui.totalTime.innerText = d.durationStr;
        });

        on('fm:volume', function (e) {
            updateVolumeUI(e.detail.volume, e.detail.isMuted);
        });

        on('fm:mode', function (e) {
            updateModeUI(e.detail.playMode);
        });

        on('fm:lyrics', function (e) {
            renderLyricsUI(e.detail.lyrics, e.detail.status);
        });

        on('fm:lrc-index', function (e) {
            updateLrcHighlight(e.detail.index);
        });

        on('fm:error', function (e) {
            ui.title.innerText = e.detail.message || cfg.i18n.error;
        });

        // ── Button click delegates ───────────────────────────────
        ui.btnPlay.addEventListener('click', function () { mgr.togglePlay(); });
        ui.btnNext.addEventListener('click', function () { mgr.playNext(); });
        ui.btnPrev.addEventListener('click', function () { mgr.playPrev(); });
        ui.btnRepeat.addEventListener('click', function () { mgr.cyclePlayMode(); });
        ui.btnMute.addEventListener('click', function () { mgr.toggleMute(); });

        ui.volContainer.addEventListener('click', function (e) {
            var rect = ui.volContainer.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var val = Math.max(0, Math.min(1, x / rect.width));
            mgr.setVolume(val);
        });

        ui.progressContainer.addEventListener('click', function (e) {
            var rect = ui.progressContainer.getBoundingClientRect();
            var clickX = e.clientX - rect.left;
            var percent = Math.min(Math.max(clickX / rect.width, 0), 1);
            mgr.seek(percent);
        });

        // ── Drawer logic (local state) ───────────────────────────
        ui.btnLrc.addEventListener('click', function () {
            var isOpen = ui.lrcDrawer.style.gridTemplateRows === '1fr';
            if (isOpen) {
                ui.lrcDrawer.style.gridTemplateRows = '0fr';
                ui.lrcDrawer.classList.remove('opacity-100');
                ui.lrcDrawer.classList.add('opacity-0');
                ui.btnLrc.classList.remove('text-(--primary)');
                ui.btnLrc.classList.add('text-neutral-400');
                ui.iconLrcOn.classList.add('hidden');
                ui.iconLrcOff.classList.remove('hidden');
            } else {
                // Close playlist if open
                ui.playlistDrawer.style.gridTemplateRows = '0fr';
                ui.playlistDrawer.classList.remove('opacity-100');
                ui.playlistDrawer.classList.add('opacity-0');
                ui.btnDrawer.classList.remove('text-(--primary)');
                ui.btnDrawer.classList.add('text-neutral-400');

                ui.lrcDrawer.style.gridTemplateRows = '1fr';
                ui.lrcDrawer.classList.add('opacity-100');
                ui.lrcDrawer.classList.remove('opacity-0');
                ui.btnLrc.classList.add('text-(--primary)');
                ui.btnLrc.classList.remove('text-neutral-400');
                ui.iconLrcOn.classList.remove('hidden');
                ui.iconLrcOff.classList.add('hidden');
            }
        });

        ui.btnDrawer.addEventListener('click', function () {
            var isOpen = ui.playlistDrawer.style.gridTemplateRows === '1fr';
            if (isOpen) {
                ui.playlistDrawer.style.gridTemplateRows = '0fr';
                ui.playlistDrawer.classList.remove('opacity-100');
                ui.playlistDrawer.classList.add('opacity-0');
                ui.btnDrawer.classList.add('text-neutral-400');
                ui.btnDrawer.classList.remove('text-(--primary)');
                local.vs.drawerOpen = false;
            } else {
                // Close lyrics if open
                ui.lrcDrawer.style.gridTemplateRows = '0fr';
                ui.lrcDrawer.classList.remove('opacity-100');
                ui.lrcDrawer.classList.add('opacity-0');
                ui.btnLrc.classList.remove('text-(--primary)');
                ui.btnLrc.classList.add('text-neutral-400');
                ui.iconLrcOn.classList.add('hidden');
                ui.iconLrcOff.classList.remove('hidden');

                ui.playlistDrawer.style.gridTemplateRows = '1fr';
                ui.playlistDrawer.classList.add('opacity-100');
                ui.playlistDrawer.classList.remove('opacity-0');
                ui.btnDrawer.classList.remove('text-neutral-400');
                ui.btnDrawer.classList.add('text-(--primary)');
                local.vs.drawerOpen = true;

                // Render playlist after drawer transition settles
                if (local.vs.playlist.length > 0) {
                    requestAnimationFrame(function () {
                        vsSetContainerHeight();
                        vsCommitRange();
                    });
                }
            }
        });

        // ── Playlist virtual scroll listener ──────────────────────
        ui.playlistContainer.addEventListener('scroll', function () {
            vsRequestUpdate();
        });

        // ── Lyrics user scroll detection ─────────────────────────
        function resetScrollTimeout() {
            clearTimeout(local.scrollTimeout);
            local.scrollTimeout = setTimeout(function () {
                local.isUserScrolling = false;
                // Snap back to current lyric
                var s = mgr.getState();
                if (s.currentLrcIndex >= 0) {
                    var line = ui.lrcContainer.querySelector('.lrc-line[data-index="' + s.currentLrcIndex + '"]');
                    if (line) {
                        var containerHeight = ui.lrcContainer.clientHeight;
                        var lineOffset = line.offsetTop;
                        var lineHeight = line.offsetHeight;
                        var targetScroll = lineOffset - (containerHeight / 2) + (lineHeight / 2);
                        ui.lrcContainer.scrollTo({ top: targetScroll, behavior: 'auto' });
                    }
                }
            }, 3000);
        }

        ui.lrcContainer.addEventListener('wheel', function () {
            local.isUserScrolling = true;
            resetScrollTimeout();
        });
        ui.lrcContainer.addEventListener('touchstart', function () {
            local.isUserScrolling = true;
            resetScrollTimeout();
        });

        // ── Cover image events ───────────────────────────────────
        ui.cover.addEventListener('load', function () {
            ui.cover.classList.remove('opacity-0');
        });
        ui.cover.addEventListener('error', function () {
            ui.cover.classList.add('opacity-0');
        });

        // ── Cleanup on DOM removal ───────────────────────────────
        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var removed = mutations[i].removedNodes;
                for (var j = 0; j < removed.length; j++) {
                    if (removed[j] === widget || (removed[j].contains && removed[j].contains(widget))) {
                        // Widget removed from DOM – clean up event listeners
                        Object.keys(handlers).forEach(function (name) {
                            window.removeEventListener(name, handlers[name]);
                        });
                        observer.disconnect();
                        clearTimeout(local.scrollTimeout);
                        return;
                    }
                }
            }
        });
        if (widget.parentNode) {
            observer.observe(widget.parentNode, { childList: true });
        }

        // ── Init: either sync existing state or trigger init ─────
        var currentState = mgr.getState();
        if (currentState.initialized) {
            // Manager already initialized (late mount) – sync all UI
            syncAll();
        } else {
            // First widget to mount – show loading and trigger init
            setLoading(true);
            scheduleInit();
        }
    }

    // 每个 widget 只初始化一次。导航栏那份 widget 在 swup 容器之外、DOM 不会被
    // 替换，而本脚本每次导航都会被重跑；侧栏 widget 会被整体替换，新 DOM 上没有
    // 这个标记，因此仍会正常重新初始化（旧实例由内部的 MutationObserver 清理）。
    function initAll() {
        var widgets = document.querySelectorAll('.music-player-widget');
        for (var i = 0; i < widgets.length; i++) {
            var w = widgets[i];
            if (w.dataset.musicInit === '1') continue;
            w.dataset.musicInit = '1';
            initWidget(w);
        }
    }

    initAll();
})();
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/MusicPlayerView.astro", void 0);
//#endregion
//#region src/components/features/SakuraEffect.astro
var $$SakuraEffect = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/SakuraEffect.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/SakuraEffect.astro", void 0);
//#endregion
//#region src/components/layout/ConfigCarrier.astro
var $$ConfigCarrier = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<!-- 全局配置载体 --><div id="config-carrier"${addAttribute(siteConfig.themeColor.hue, "data-hue")}${addAttribute(backgroundWallpaper.mode, "data-wallpaper-mode")}></div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/ConfigCarrier.astro", void 0);
//#endregion
//#region src/constants/icon.ts
var defaultFavicons = [
	{
		src: "/favicon/favicon-light-32.png",
		theme: "light",
		sizes: "32x32"
	},
	{
		src: "/favicon/favicon-light-128.png",
		theme: "light",
		sizes: "128x128"
	},
	{
		src: "/favicon/favicon-light-180.png",
		theme: "light",
		sizes: "180x180"
	},
	{
		src: "/favicon/favicon-light-192.png",
		theme: "light",
		sizes: "192x192"
	},
	{
		src: "/favicon/favicon-dark-32.png",
		theme: "dark",
		sizes: "32x32"
	},
	{
		src: "/favicon/favicon-dark-128.png",
		theme: "dark",
		sizes: "128x128"
	},
	{
		src: "/favicon/favicon-dark-180.png",
		theme: "dark",
		sizes: "180x180"
	},
	{
		src: "/favicon/favicon-dark-192.png",
		theme: "dark",
		sizes: "192x192"
	}
];
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Layout;
	let { title, description, lang, setOGTypeArticle, postSlug, hasWallpaper = false } = Astro2.props;
	const isHomePageCheck = isHomePage(Astro2.url.pathname);
	const configHue = siteConfig.themeColor.hue;
	const navbarTransparentMode = backgroundWallpaper.common?.navbar?.transparentMode || "semi";
	const shouldShowTopHighlight = navbarTransparentMode === "full" || navbarTransparentMode === "semifull";
	const enableBanner = backgroundWallpaper.mode === "banner";
	const navbarPanelBlur = Math.max(backgroundWallpaper.common?.navbar?.blur ?? 20, 2);
	let pageTitle;
	if (title) pageTitle = `${title} - ${siteConfig.title}`;
	else pageTitle = siteConfig.subtitle ? `${siteConfig.title} - ${siteConfig.subtitle}` : siteConfig.title;
	let ogImageUrl;
	if (siteConfig.post.generateOgImages && postSlug) ogImageUrl = new URL(`/og/${postSlug}.png`, Astro2.site).toString();
	const favicons = siteConfig.favicon.length > 0 ? siteConfig.favicon : defaultFavicons;
	if (!lang) lang = `${siteConfig.lang}`;
	const siteLang = lang.replace("_", "-");
	const $$definedVars = defineStyleVars([{
		configHue,
		"page-width": `${siteConfig.pageWidth ?? 100}rem`,
		"navbar-panel-blur": `${navbarPanelBlur}px`
	}, {
		"banner-height-home": `65vh`,
		"banner-height": `35vh`
	}]);
	return renderTemplate`<html${addAttribute(siteLang, "lang")} class="bg-(--page-bg) text-[14px] md:text-[16px]"${addAttribute(backgroundWallpaper.mode, "data-wallpaper-mode")}${addAttribute(hasWallpaper ? "" : void 0, "data-has-wallpaper")}${addAttribute(siteConfig.tagStyle ?? "rectangle", "data-tag-style")}${addAttribute(siteConfig.categoryStyle ?? "rectangle", "data-category-style")}${addAttribute($$definedVars, "style")} data-astro-cid-ju4pidww><head><meta charset="UTF-8"><style>
			@layer properties, theme, base, components, utilities;
		</style>${analyticsConfig?.googleAnalyticsId && renderTemplate`${renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, {
		"analyticsId": analyticsConfig.googleAnalyticsId,
		"data-astro-cid-ju4pidww": true
	})}`}${analyticsConfig?.microsoftClarityId && renderTemplate`${renderComponent($$result, "MicrosoftClarity", $$MicrosoftClarity, {
		"clarityId": analyticsConfig.microsoftClarityId,
		"data-astro-cid-ju4pidww": true
	})}`}${analyticsConfig?.umamiAnalytics?.websiteId && renderTemplate`${renderComponent($$result, "UmamiAnalytics", $$UmamiAnalytics, {
		"websiteId": analyticsConfig.umamiAnalytics.websiteId,
		"scriptUrl": analyticsConfig.umamiAnalytics.scriptUrl,
		"replaysScriptUrl": analyticsConfig.umamiAnalytics.replaysScriptUrl,
		"trackOutboundLinks": analyticsConfig.umamiAnalytics.trackOutboundLinks,
		"collectWebVitals": analyticsConfig.umamiAnalytics.collectWebVitals,
		"replays": analyticsConfig.umamiAnalytics.replays,
		"data-astro-cid-ju4pidww": true
	})}`}${analyticsConfig?.la51Analytics?.Id && renderTemplate`${renderComponent($$result, "La51Analytics", $$La51Analytics, {
		"analyticsId": analyticsConfig.la51Analytics.Id,
		"sdkUrl": analyticsConfig.la51Analytics?.sdkUrl,
		"ck": analyticsConfig.la51Analytics?.ck,
		"autoTrack": analyticsConfig.la51Analytics?.autoTrack,
		"hashMode": analyticsConfig.la51Analytics?.hashMode,
		"screenRecord": analyticsConfig.la51Analytics?.screenRecord,
		"data-astro-cid-ju4pidww": true
	})}`}<title>${pageTitle}</title><meta name="description"${addAttribute(description || siteConfig.description || pageTitle, "content")}>${siteConfig.keywords && siteConfig.keywords.length > 0 && renderTemplate`<meta name="keywords"${addAttribute(siteConfig.keywords.join(", "), "content")}>`}<meta name="author"${addAttribute(profileConfig.name, "content")}><meta property="og:site_name"${addAttribute(siteConfig.title, "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description || siteConfig.description || pageTitle, "content")}>${ogImageUrl && renderTemplate`<meta property="og:image"${addAttribute(ogImageUrl, "content")}>`}${setOGTypeArticle ? renderTemplate`<meta property="og:type" content="article">` : renderTemplate`<meta property="og:type" content="website">`}<meta name="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description || siteConfig.description || pageTitle, "content")}><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${favicons.map((favicon) => renderTemplate`<link rel="icon"${addAttribute(favicon.src.startsWith("/") ? url(favicon.src) : favicon.src, "href")}${addAttribute(favicon.sizes, "sizes")}${addAttribute(favicon.theme && `(prefers-color-scheme: ${favicon.theme})`, "media")}>`)}<!-- 为特定域名的图片添加 referrerpolicy 以解决 403 问题 --><!-- 注：静态图片（ImageWrapper 组件、Markdown 正文图）已在构建期加好 referrerpolicy；
         此脚本仅作为运行时兜底，处理动态注入的图片（解密内容、第三方评论/统计部件等）。 -->${siteConfig.imageOptimization?.noReferrerDomains && siteConfig.imageOptimization.noReferrerDomains.length > 0 && renderTemplate`<script>(function(){${defineScriptVars({ noReferrerDomains: JSON.stringify(siteConfig.imageOptimization.noReferrerDomains) })}
        (function() {
          const domains = JSON.parse(noReferrerDomains);

          // 域名匹配函数，支持通配符
          function matchesDomain(urlStr, patterns) {
            try {
              const urlObj = new URL(urlStr);
              const hostname = urlObj.hostname;

              return patterns.some(function(pattern) {
                const regexPattern = pattern.replace(/\\./g, '\\\\.').replace(/\\*/g, '.*');
                const regex = new RegExp('^' + regexPattern + '$');
                return regex.test(hostname);
              });
            } catch (e) {
              return false;
            }
          }

          // 处理单个图片元素
          function processImage(img) {
            if (!img.src || img.hasAttribute('referrerpolicy')) return;

            if (matchesDomain(img.src, domains)) {
              img.setAttribute('referrerpolicy', 'no-referrer');
            }
          }

          // 兜底扫描一次当前页面（构建期已处理的图片会因已有属性而快速跳过）
          document.querySelectorAll('img').forEach(processImage);

          // 使用 MutationObserver 监听动态加载/注入的图片
          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeName === 'IMG') {
                  processImage(node);
                }
                if (node.querySelectorAll) {
                  node.querySelectorAll('img').forEach(processImage);
                }
              });
            });
          });

          observer.observe(document.documentElement, {
            childList: true,
            subtree: true
          });
        })();
      })();<\/script>`}<!-- Set the theme before the page is rendered to avoid a flash --><script>(function(){${defineScriptVars({
		BANNER_HEIGHT_EXTEND: 30,
		PAGE_WIDTH: 100,
		configHue,
		defaultMode: siteConfig.themeColor.defaultMode ?? "light",
		defaultWallpaperMode: backgroundWallpaper.mode,
		isWallpaperSwitchable: displaySettingsConfig.wallpaperModeSwitchable,
		darkTheme: expressiveCodeConfig.darkTheme,
		lightTheme: expressiveCodeConfig.lightTheme,
		baseUrl: "/",
		cardTransparentOpacity: backgroundWallpaper.overlay?.cardOpacity ?? .6
	})}
      // 主题初始化 - 与setting-utils.ts保持一致
      const LIGHT_MODE = "light";
      const DARK_MODE = "dark";
      const SYSTEM_MODE = "system";

      // 获取存储的主题，如果没有则使用默认值
      const theme = localStorage.getItem("theme") || defaultMode;

      // 获取系统主题
      function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? DARK_MODE
          : LIGHT_MODE;
      }

      // 解析主题（如果是system模式，则获取系统主题）
      function resolveTheme(themeValue) {
        if (themeValue === SYSTEM_MODE) {
          return getSystemTheme();
        }
        return themeValue;
      }

      const resolvedTheme = resolveTheme(theme);
      const isDark = resolvedTheme === DARK_MODE;

      // 应用主题
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Set the theme for Expressive Code
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? darkTheme : lightTheme
      );

      // Load the hue from local storage
      const hue = localStorage.getItem("hue") || configHue;
      document.documentElement.style.setProperty("--hue", hue);

      // 设置卡片透明度（全屏透明模式下使用），优先使用用户自定义值
      const storedCardOpacity = localStorage.getItem("overlayCardOpacity");
      const parsedCardOpacity = storedCardOpacity === null ? NaN : Number.parseFloat(storedCardOpacity);
      const resolvedCardOpacity = Number.isFinite(parsedCardOpacity)
        ? Math.min(1, Math.max(0, parsedCardOpacity))
        : cardTransparentOpacity;
      document.documentElement.style.setProperty("--card-transparent-opacity", String(resolvedCardOpacity));

      // calculate the --banner-height-extend, which needs to be a multiple of 4 to avoid blurry text
      // 使用更准确的窗口高度计算
      function calculateBannerHeightExtend() {
        let offset = Math.floor(
          window.innerHeight * (BANNER_HEIGHT_EXTEND / 100)
        );
        offset = offset - (offset % 4);
        document.documentElement.style.setProperty(
          "--banner-height-extend",
          \`\${offset}px\`
        );
      }

      // 立即设置初始值
      calculateBannerHeightExtend();

      // 在下一帧重新计算精确值（仅在值变化时更新，避免闪烁）
      requestAnimationFrame(() => {
        const oldValue = parseInt(
          document.documentElement.style.getPropertyValue(
            "--banner-height-extend"
          )
        );
        calculateBannerHeightExtend();
        const newValue = parseInt(
          document.documentElement.style.getPropertyValue(
            "--banner-height-extend"
          )
        );
        // 如果值变化了，再更新一次确保准确
        if (Math.abs(oldValue - newValue) > 4) {
          // 如果有明显变化，延迟一帧再更新，避免闪烁
          requestAnimationFrame(calculateBannerHeightExtend);
        }
      });

      // 初始化壁纸模式 - 在页面渲染前应用
      const WALLPAPER_BANNER = "banner";
      const WALLPAPER_FULLSCREEN = "fullscreen";
      const WALLPAPER_OVERLAY = "overlay";
      const WALLPAPER_NONE = "none";
      const wallpaperMode = isWallpaperSwitchable
        ? localStorage.getItem("wallpaperMode") || defaultWallpaperMode
        : defaultWallpaperMode;

      // 设置data-wallpaper-mode属性
      document.documentElement.setAttribute(
        "data-wallpaper-mode",
        wallpaperMode
      );

      // 立即执行函数来处理DOM
      (function applyWallpaperMode() {
        // 使用 requestAnimationFrame 确保在下一帧之前执行
        requestAnimationFrame(function () {
          // 根据模式隐藏显示对应元素
          if (
            wallpaperMode === WALLPAPER_NONE ||
            wallpaperMode === WALLPAPER_OVERLAY ||
            wallpaperMode === WALLPAPER_FULLSCREEN
          ) {
            // 隐藏横幅
            if (document.body) {
              document.body.classList.remove("enable-banner");
              document.body.classList.add("no-banner-layout");
            }
          } else {
            if (document.body) {
              document.body.classList.add("enable-banner");
              document.body.classList.remove("no-banner-layout");
            }
          }

          // 全屏透明模式
          if (wallpaperMode === WALLPAPER_OVERLAY) {
            if (document.body) {
              document.body.classList.add("wallpaper-transparent");
            }
          } else {
            if (document.body) {
              document.body.classList.remove("wallpaper-transparent");
            }
          }

          // 处理wallpaper-wrapper的显示
          const wallpaperWrapper = document.getElementById("wallpaper-wrapper");

          // 检查当前是否为首页
          const isHomePage =
            window.location.pathname === baseUrl ||
            (baseUrl !== '/' && window.location.pathname === baseUrl.replace(/\\/$/, '')) ||
            window.location.pathname === "/";

          if (wallpaperMode === WALLPAPER_OVERLAY) {
            // 全屏壁纸透明模式：切换为 overlay 显示
            if (wallpaperWrapper) {
              wallpaperWrapper.classList.add("wallpaper-overlay");
              wallpaperWrapper.style.display = "block";
              wallpaperWrapper.classList.remove("hidden", "opacity-0", "mobile-hide-banner");
              wallpaperWrapper.classList.add("opacity-100");
              wallpaperWrapper.style.top = "";
            }
          } else if (wallpaperMode === WALLPAPER_FULLSCREEN) {
            // 全屏壁纸模式：切换为全屏壁纸显示
            if (wallpaperWrapper) {
              wallpaperWrapper.classList.remove("wallpaper-overlay");
              wallpaperWrapper.classList.add("wallpaper-fullscreen");
              const isMobile = window.innerWidth < 1024;
              // 移动端非首页时隐藏壁纸（与横幅模式一致）
              if (isMobile && !isHomePage) {
                wallpaperWrapper.style.display = "none";
                wallpaperWrapper.classList.add("mobile-hide-banner");
              } else {
                wallpaperWrapper.style.display = "block";
                wallpaperWrapper.classList.remove("hidden", "opacity-0", "mobile-hide-banner");
                wallpaperWrapper.classList.add("opacity-100");
              }
              wallpaperWrapper.style.top = "";
            }
          } else if (wallpaperMode === WALLPAPER_NONE) {
            // 纯色背景：隐藏壁纸
            if (wallpaperWrapper) {
              wallpaperWrapper.style.display = "none";
              wallpaperWrapper.classList.add("hidden", "opacity-0");
            }
          } else {
            // banner模式：以 banner 方式显示
            if (wallpaperWrapper) {
              wallpaperWrapper.classList.remove("wallpaper-overlay");
              wallpaperWrapper.classList.remove("wallpaper-fullscreen");
              const isMobile = window.innerWidth < 1024;
              // 移动端非首页时隐藏banner（初始状态直接隐藏，不需要动画）
              // 桌面端始终显示banner
              if (isMobile && !isHomePage) {
                wallpaperWrapper.style.display = "none";
                wallpaperWrapper.classList.add("mobile-hide-banner");
              } else {
                wallpaperWrapper.style.display = "block";
                wallpaperWrapper.classList.remove("mobile-hide-banner");
              }
            }
          }

          // 处理主内容区域位置
          const mainContentWrapper = document.querySelector(
            ".w-full.z-30.pointer-events-none"
          );
          if (mainContentWrapper) {
            // 初始化期间禁用过渡动画，防止内容位置跳动
            mainContentWrapper.style.setProperty("transition", "none", "important");
            const isMobile = window.innerWidth < 1024;
            // 只在移动端非首页时调整主内容位置
            if (isMobile && !isHomePage) {
              mainContentWrapper.classList.add("mobile-main-no-banner");
            } else {
              mainContentWrapper.classList.remove("mobile-main-no-banner");
            }
            // 全屏壁纸模式：用 relative 定位让内容紧跟壁纸（移动端非首页除外，壁纸已隐藏）
            const isMobileNonHome = window.innerWidth < 1024 && !isHomePage;
            if (wallpaperMode === WALLPAPER_FULLSCREEN && !isMobileNonHome) {
              mainContentWrapper.style.position = "relative";
              mainContentWrapper.style.top = "0";
              mainContentWrapper.style.zIndex = "30";
              mainContentWrapper.style.setProperty("margin-top", "1rem", "important");
            } else if (isMobile && isHomePage && (wallpaperMode === WALLPAPER_BANNER || wallpaperMode === undefined)) {
              // 移动端横幅模式首页：清除 inline top，让 CSS 响应式规则生效
              mainContentWrapper.style.removeProperty("top");
              mainContentWrapper.style.position = "";
              mainContentWrapper.style.zIndex = "";
              mainContentWrapper.style.setProperty("margin-top", "0", "important");
            } else if (isMobileNonHome) {
              mainContentWrapper.style.setProperty("top", "5.5rem", "important");
              mainContentWrapper.style.position = "";
              mainContentWrapper.style.zIndex = "";
              mainContentWrapper.style.setProperty("margin-top", "0", "important");
            } else if (wallpaperMode === WALLPAPER_BANNER && !isHomePage) {
              // 桌面端横幅模式非首页：与首页相同定位（保留grid transform）
              mainContentWrapper.style.setProperty("top", "calc(var(--banner-height) - 3.5rem)", "important");
              mainContentWrapper.style.position = "";
              mainContentWrapper.style.zIndex = "";
              mainContentWrapper.style.setProperty("margin-top", "0", "important");
            }
            // 定位完成后显示主内容（初始CSS规则会隐藏，防止壁纸初始化前闪烁）
            mainContentWrapper.style.visibility = "visible";
            // 延迟恢复过渡动画，确保位置已生效
            requestAnimationFrame(() => {
              mainContentWrapper.style.removeProperty("transition");
            });
          }

          // 处理banner homeText元素
          const bannerTextOverlay = document.querySelector(
            ".banner-home-text-overlay"
          );
          if (bannerTextOverlay) {
            const isHomePage =
              window.location.pathname === baseUrl || 
              (baseUrl !== '/' && window.location.pathname === baseUrl.replace(/\\/$/, '')) ||
              window.location.pathname === "/";
            if ((wallpaperMode === WALLPAPER_BANNER || wallpaperMode === WALLPAPER_FULLSCREEN) && isHomePage) {
              bannerTextOverlay.classList.remove("hidden");
            } else {
              bannerTextOverlay.classList.add("hidden");
            }
          }
        });
      })();

      // 初始化水波纹动画状态 - 在 html 元素上设置属性，CSS 会立即生效
      (function applyWavesEnabled() {
        const wavesEnabled = localStorage.getItem("wavesEnabled");
        if (wavesEnabled !== null) {
          document.documentElement.setAttribute("data-waves-enabled", wavesEnabled);
        }
      })();

      // 初始化渐变过渡状态 - 在 html 元素上设置属性，CSS 会立即生效
      (function applyGradientEnabled() {
        const gradientEnabled = localStorage.getItem("gradientEnabled");
        if (gradientEnabled !== null) {
          document.documentElement.setAttribute("data-gradient-enabled", gradientEnabled);
        }
      })();

      // 初始化横幅标题显示状态 - 在 html 元素上设置属性，CSS 会立即生效
      (function applyBannerTitleEnabled() {
        const bannerTitleEnabled = localStorage.getItem("bannerTitleEnabled");
        if (bannerTitleEnabled !== null) {
          document.documentElement.setAttribute("data-banner-title-enabled", bannerTitleEnabled);
        }
      })();
    })();<\/script><!-- defines global css variables. This will be applied to <html> <body> and some other elements idk why -->${renderSlot($$result, $$slots["head"])}<link rel="alternate" type="application/rss+xml"${addAttribute(profileConfig.name, "title")}${addAttribute(`${Astro2.site}rss.xml`, "href")}><!-- Font Setup (Astro Font API) -->${renderComponent($$result, "FontSetup", $$FontSetup, { "data-astro-cid-ju4pidww": true })}${renderHead($$result)}</head><body${addAttribute(["min-h-screen", [{
		"is-home": isHomePageCheck,
		"lg:is-home": isHomePageCheck,
		"enable-banner": enableBanner,
		"sticky-navbar": siteConfig.navbar.stickyNavbar ?? false
	}]], "class:list")}${addAttribute($$definedVars, "style")} data-astro-cid-ju4pidww><div id="progress-bar"${addAttribute($$definedVars, "style")} data-astro-cid-ju4pidww></div><script>(function(){${defineScriptVars({
		defaultBorder: siteConfig.card?.border ?? false,
		defaultFollowTheme: siteConfig.card?.followTheme ?? false
	})}
      (function() {
        var stored = localStorage.getItem("cardBorderEnabled");
        var border = stored !== null ? stored === "true" : defaultBorder;
        if (border) document.documentElement.classList.add("enable-card-border");
        else document.documentElement.classList.remove("enable-card-border");

        stored = localStorage.getItem("cardFollowThemeEnabled");
        var follow = stored !== null ? stored === "true" : defaultFollowTheme;
        if (follow) document.body.classList.add("card-follow-theme-hue");
        else document.body.classList.remove("card-follow-theme-hue");
      })();
    })();<\/script><!-- 页面顶部渐变高光效果 - 只在full和semifull模式下显示 -->${shouldShowTopHighlight && renderTemplate`<div class="top-gradient-highlight"${addAttribute($$definedVars, "style")} data-astro-cid-ju4pidww></div>`}${renderComponent($$result, "ConfigCarrier", $$ConfigCarrier, { "data-astro-cid-ju4pidww": true })}${renderComponent($$result, "MusicManager", $$MusicManager, { "data-astro-cid-ju4pidww": true })}${renderSlot($$result, $$slots["default"])}<!-- 播放器视图脚本：必须在 <slot /> 之后（解析到它时所有 widget 的 DOM 要已存在），
         且在 MusicManager 之后（swup 重跑按文档顺序，window.__fireflyMusic 得先就位） -->${(musicPlayerConfig.showInNavbar || musicPlayerConfig.showInSidebar !== false) && renderTemplate`${renderComponent($$result, "MusicPlayerView", $$MusicPlayerView, { "data-astro-cid-ju4pidww": true })}`}<!-- Sakura Effect -->${renderComponent($$result, "SakuraEffect", $$SakuraEffect, { "data-astro-cid-ju4pidww": true })}<!-- Fancybox Manager -->${renderComponent($$result, "FancyboxManager", $$FancyboxManager, { "data-astro-cid-ju4pidww": true })}<!-- Tab 代码块交互 -->${renderComponent($$result, "CodeGroupManager", $$CodeGroupManager, { "data-astro-cid-ju4pidww": true })}</body></html>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/Layout.astro", void 0);
//#endregion
export { backgroundWallpaper as _, DEFAULT_THEME as a, renderScript as b, SYSTEM_MODE as c, WALLPAPER_OVERLAY as d, $$Picture as f, dynamicConfig as g, expressiveCodeConfig as h, DARK_MODE as i, WALLPAPER_BANNER as l, musicPlayerConfig as m, getBackgroundImages as n, LIGHT_MODE as o, $$Image as p, isHomePage as r, MAIN_PANEL_OVERLAPS_BANNER_HEIGHT as s, $$Layout as t, WALLPAPER_FULLSCREEN as u, templateEnter as v, templateExit as y };
