import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { W as createAstro, _ as renderTemplate, c as renderComponent, k as maybeRenderHead } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import { b as renderScript, g as dynamicConfig, t as $$Layout } from "./Layout_Dho96Xl1.mjs";
import "./compiler_DNPYZl4E.mjs";
import { l as siteConfig } from "./url-utils_DChKFQtU.mjs";
import { t as commentConfig } from "./commentConfig_mK4i1UxJ.mjs";
import { t as $$Index } from "./comment_CQ0MKAEQ.mjs";
//#region src/pages/dynamic/comments.astro
var comments_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Comments,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Comments = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Comments;
	if (!siteConfig.pages.dynamic || dynamicConfig.showComment === false || !commentConfig.type || commentConfig.type === "none") return Astro.redirect("/404/");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="dynamic-comment-embed">${renderComponent($$result, "Comment", $$Index, { "customPath": "/dynamic/" })}</main>` })}${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro";
var $$url = "/dynamic/comments/";
//#endregion
//#region \0virtual:astro:page:src/pages/dynamic/comments@_@astro
var page = () => comments_exports;
//#endregion
export { page };
