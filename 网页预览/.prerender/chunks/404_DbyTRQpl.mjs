import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { _ as renderTemplate, c as renderComponent, j as addAttribute, k as maybeRenderHead } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { c as i18n, f as I18nKey, s as url } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {
		"title": i18n(I18nKey.notFound),
		"description": i18n(I18nKey.notFoundDescription),
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex w-full rounded-(--radius-large) overflow-hidden relative min-h-96" data-astro-cid-ibpinaeu><div class="card-base z-10 px-9 py-12 relative w-full flex flex-col items-center justify-center text-center" data-astro-cid-ibpinaeu><!-- 404 大号数字 --><div class="text-8xl md:text-9xl font-bold text-(--primary) opacity-20 mb-4" data-astro-cid-ibpinaeu>${i18n(I18nKey.notFound)}</div><!-- 404 图标 --><div class="mb-6" data-astro-cid-ibpinaeu>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:error-outline",
		"class": "text-6xl text-(--primary)",
		"data-astro-cid-ibpinaeu": true
	})}</div><!-- 标题 --><div class="text-3xl md:text-4xl font-bold mb-4 text-90" data-astro-cid-ibpinaeu>${i18n(I18nKey.notFoundTitle)}</div><!-- 描述 --><p class="text-lg text-75 mb-8 max-w-md" data-astro-cid-ibpinaeu>${i18n(I18nKey.notFoundDescription)}</p><!-- 返回首页按钮 --><a${addAttribute(url("/"), "href")} class="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) text-white rounded-(--radius-large) hover:bg-(--btn-content) transition-colors duration-200 font-medium" data-astro-cid-ibpinaeu>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:home",
		"class": "text-xl",
		"data-astro-cid-ibpinaeu": true
	})}${i18n(I18nKey.backToHome)}</a><!-- 装饰性元素 --><div class="absolute top-4 left-4 opacity-10" data-astro-cid-ibpinaeu>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:sentiment-sad",
		"class": "text-4xl text-(--primary)",
		"data-astro-cid-ibpinaeu": true
	})}</div><div class="absolute bottom-4 right-4 opacity-10" data-astro-cid-ibpinaeu>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:search-off",
		"class": "text-4xl text-(--primary)",
		"data-astro-cid-ibpinaeu": true
	})}</div></div></div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/404.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/404.astro";
var $$url = "/404/";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
