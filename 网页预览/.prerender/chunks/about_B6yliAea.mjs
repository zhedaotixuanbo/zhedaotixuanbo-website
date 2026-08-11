import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { _ as renderTemplate, c as renderComponent, k as maybeRenderHead } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import { n as getEntry, r as renderEntry } from "./_astro_content_BPkp6r8i.mjs";
import "./compiler_DNPYZl4E.mjs";
import { c as i18n, f as I18nKey } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
import { t as $$Markdown } from "./Markdown_DpaWAiWV.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(async ($$result, $$props, $$slots) => {
	const aboutPost = await getEntry("spec", "about");
	if (!aboutPost) throw new Error("About page content not found");
	const { Content } = await renderEntry(aboutPost);
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {
		"title": i18n(I18nKey.about),
		"description": i18n(I18nKey.about)
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex w-full rounded-(--radius-large) overflow-hidden relative min-h-32"><div class="card-base z-10 px-9 py-6 relative w-full ">${renderComponent($$result, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, {})}` })}</div></div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/about.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/about.astro";
var $$url = "/about/";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
