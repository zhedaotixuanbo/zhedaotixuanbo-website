import { W as createAstro, _ as renderTemplate, j as addAttribute, k as maybeRenderHead, m as renderSlot } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import "./compiler_DNPYZl4E.mjs";
//#region src/components/common/Markdown.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Markdown = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Markdown;
	const className = Astro.props.class;
	return renderTemplate`${maybeRenderHead($$result)}<div data-pagefind-body${addAttribute(`prose dark:prose-invert prose-base max-w-none! custom-md ${className}`, "class")}>${renderSlot($$result, $$slots["default"])}</div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/Markdown.astro", void 0);
//#endregion
export { $$Markdown as t };
