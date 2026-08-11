import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { _ as renderTemplate, c as renderComponent, j as addAttribute, k as maybeRenderHead } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { c as i18n, f as I18nKey } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
import { t as getCategoryList } from "./content-utils_58mqkDzV.mjs";
//#region src/pages/categories/index.astro
var categories_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const categories = await getCategoryList();
	const totalPosts = categories.reduce((sum, cat) => sum + cat.count, 0);
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.categories) }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="card-base px-8 py-6 mb-4"><div class="text-2xl font-bold text-(--primary) mb-2">${i18n(I18nKey.categories)}</div><p class="text-30 text-sm">${i18n(I18nKey.allCategories)} · ${totalPosts} ${i18n(I18nKey.postsCount)}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">${categories.map((category, index) => renderTemplate`<a${addAttribute(category.url, "href")} class="card-base p-6 flex items-center gap-4 group onload-animation"${addAttribute(`animation-delay: calc(var(--content-delay) + ${index * 50}ms);`, "style")}><div class="shrink-0 w-14 h-14 rounded-full bg-(--primary)/10 group-hover:bg-(--primary)/20 flex items-center justify-center transition-colors">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:folder-open",
		"class": "text-3xl text-(--primary)"
	})}</div><div class="flex-1 min-w-0"><h2 class="text-lg font-bold text-90 truncate group-hover:text-(--primary) transition-colors"${addAttribute(category.name, "title")}>${category.name}</h2><p class="text-sm text-30 mt-1 group-hover:text-(--primary)/60 transition-colors">${category.count} ${i18n(I18nKey.postsCount)}</p></div><div class="shrink-0">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:chevron-right-rounded",
		"class": "text-2xl text-30 group-hover:text-(--primary) transition-colors "
	})}</div></a>`)}</div>${categories.length === 0 && renderTemplate`<div class="card-base px-8 py-12 text-center">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:folder-off",
		"class": "text-5xl text-30 mx-auto mb-4"
	})}<p class="text-30">${i18n(I18nKey.noData)}</p></div>`}` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/categories/index.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/categories/index.astro";
var $$url = "/categories/";
//#endregion
//#region \0virtual:astro:page:src/pages/categories/index@_@astro
var page = () => categories_exports;
//#endregion
export { page };
