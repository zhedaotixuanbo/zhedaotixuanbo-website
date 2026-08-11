import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { W as createAstro, _ as renderTemplate, c as renderComponent, j as addAttribute, k as maybeRenderHead } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import { b as renderScript } from "./Layout_Dho96Xl1.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { c as i18n, f as I18nKey } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
import { r as getSortedPosts } from "./content-utils_58mqkDzV.mjs";
import { n as formatDateToYYYYMMDD } from "./date-utils_BBaum0Sr.mjs";
//#region src/pages/rss.astro
var rss_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Rss,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Rss = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Rss;
	const recentPosts = (await getSortedPosts()).slice(0, 6);
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {
		"title": i18n(I18nKey.rss),
		"description": i18n(I18nKey.rssDescription)
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="onload-animation"><!-- RSS 标题和介绍 --><div class="card-base rounded-(--radius-large) p-8 mb-6"><div class="text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--primary) rounded-2xl mb-4">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:rss-feed",
		"class": "text-white text-3xl"
	})}</div><div class="text-3xl font-bold text-(--primary) mb-3">${i18n(I18nKey.rss)}</div><p class="text-75 max-w-2xl mx-auto">${i18n(I18nKey.rssSubtitle)}</p></div></div><!-- RSS 链接复制区域 --><div class="card-base rounded-(--radius-large) p-6 mb-6"><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div class="flex items-center"><div class="w-12 h-12 bg-(--primary) rounded-xl flex items-center justify-center mr-4">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:link",
		"class": "text-white text-xl"
	})}</div><div><h3 class="font-semibold text-90 mb-1">${i18n(I18nKey.rssLink)}</h3><p class="text-sm text-75">${i18n(I18nKey.rssCopyToReader)}</p></div></div><div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"><code class="bg-(--card-bg) px-3 py-2 rounded-lg text-sm font-mono text-75 border border-(--line-divider) break-all">${Astro.site}rss.xml</code><button id="copy-rss-btn" class="px-4 py-2 bg-(--primary) text-white rounded-lg hover:opacity-80 transition-all duration-200 font-medium text-sm whitespace-nowrap"${addAttribute(`${Astro.site}rss.xml`, "data-url")}${addAttribute(i18n(I18nKey.rssCopied), "data-copied-text")}${addAttribute(i18n(I18nKey.rssCopyFailed), "data-failed-text")}>${i18n(I18nKey.rssCopyLink)}</button></div></div></div><!-- 最新文章预览 --><div class="card-base rounded-(--radius-large) p-6 mb-6"><h2 class="text-xl font-bold text-90 mb-4 flex items-center">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:article",
		"class": "mr-2 text-(--primary)"
	})}${i18n(I18nKey.rssLatestPosts)}</h2><div class="space-y-4">${recentPosts.map((post) => renderTemplate`<article class="bg-(--card-bg) rounded-xl p-4 border border-(--line-divider) hover:border-(--primary) transition-all duration-300"><h3 class="text-lg font-semibold text-90 mb-2 hover:text-(--primary) transition-colors"><a${addAttribute(`/posts/${post.id}/`, "href")} class="hover:underline">${post.data.title}</a></h3>${post.data.description && renderTemplate`<p class="text-75 mb-3 line-clamp-2">${post.data.description}</p>`}<div class="flex items-center gap-4 text-sm text-60"><time${addAttribute(post.data.published.toISOString(), "datetime")} class="text-75">${formatDateToYYYYMMDD(post.data.published)}</time></div></article>`)}</div></div><!-- RSS 说明 --><div class="card-base rounded-(--radius-large) p-6"><h2 class="text-xl font-bold text-90 mb-4 flex items-center">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:help-outline",
		"class": "mr-2 text-(--primary)"
	})}${i18n(I18nKey.rssWhatIsRSS)}</h2><div class="text-75 space-y-3"><p>${i18n(I18nKey.rssWhatIsRSSDescription)}</p><ul class="list-disc list-inside space-y-1 ml-4"><li>${i18n(I18nKey.rssBenefit1)}</li><li>${i18n(I18nKey.rssBenefit2)}</li><li>${i18n(I18nKey.rssBenefit3)}</li><li>${i18n(I18nKey.rssBenefit4)}</li></ul><p class="text-sm">${i18n(I18nKey.rssHowToUse)}</p></div></div></div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro";
var $$url = "/rss/";
//#endregion
//#region \0virtual:astro:page:src/pages/rss@_@astro
var page = () => rss_exports;
//#endregion
export { page };
