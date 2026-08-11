import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { W as createAstro, _ as renderTemplate, c as renderComponent, k as maybeRenderHead, u as Fragment } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { c as i18n, f as I18nKey, l as siteConfig } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
import { t as formatDateI18nWithTime } from "./date-utils_BBaum0Sr.mjs";
import { t as ClientPagination } from "./ClientPagination_G-kC5pYU.mjs";
import { t as TabNav } from "./TabNav_CXQ5N7bS.mjs";
import { untrack } from "svelte";
import * as fs$1 from "node:fs";
import * as path$1 from "node:path";
import * as $ from "svelte/internal/server";
//#region src/components/pages/anime/AnimeCard.svelte
function AnimeCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { anime, onclick } = $$props;
		const SEASON_TYPE_I18N = {
			1: I18nKey.animeTypeAnime,
			2: I18nKey.animeTypeMovie,
			3: I18nKey.animeTypeDocumentary,
			4: I18nKey.animeTypeChinese,
			5: I18nKey.animeTypeDrama,
			7: I18nKey.animeTypeConcert
		};
		const SEASON_TYPE_COLORS = {
			1: "bg-blue-500",
			2: "bg-purple-500",
			3: "bg-emerald-500",
			4: "bg-orange-500",
			5: "bg-pink-500",
			7: "bg-yellow-500"
		};
		function getTypeLabel(seasonType) {
			return i18n(SEASON_TYPE_I18N[seasonType] || I18nKey.animeTypeAnime);
		}
		function getTypeColor(seasonType) {
			return SEASON_TYPE_COLORS[seasonType] || "bg-gray-500";
		}
		$$renderer.push(`<div class="anime-card group relative overflow-hidden rounded-xl border border-(--line-divider) bg-(--card-bg) cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-(--primary)/30 hover:-translate-y-1" role="button" tabindex="0"><div class="relative aspect-2/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800">`);
		if (anime.poster) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="lqip-placeholder absolute inset-0 pointer-events-none" style="background: var(--muted)" aria-hidden="true"></div> <img${$.attr("src", anime.poster)}${$.attr("alt", anime.title)} class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 opacity-0" loading="eager" decoding="async" referrerpolicy="no-referrer" crossorigin="anonymous" onload="this.__e=event"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="flex h-full w-full items-center justify-center"><svg class="h-12 w-12 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"></path></svg></div>`);
		}
		$$renderer.push(`<!--]--> `);
		if (anime.rating > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 backdrop-blur-sm px-2 py-1 text-xs font-bold text-white"><svg class="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> ${$.escape(anime.rating.toFixed(1))}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${$.attr_class(`absolute top-2 left-2 rounded-lg ${$.stringify(getTypeColor(anime.season_type))} px-2 py-1 text-xs font-bold text-white backdrop-blur-sm`, "svelte-16rsyhy")}>${$.escape(getTypeLabel(anime.season_type))}</div> <div${$.attr_class(`absolute bottom-2 left-2 rounded-md ${anime.source === "bilibili" ? "bg-pink-500/80" : "bg-emerald-500/80"} px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm`)}>${$.escape(anime.source === "bilibili" ? "Bilibili" : "TMDB")}</div> <div class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"><div class="p-3"><p class="mb-2 line-clamp-3 text-xs text-white/90 leading-relaxed svelte-16rsyhy">${$.escape(anime.overview || i18n(I18nKey.animeNoOverview))}</p> <button class="w-full rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-(--primary)/80">${$.escape(i18n(I18nKey.animeViewDetails))}</button></div></div></div> <div class="p-3"><h3 class="mb-1 line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100 svelte-16rsyhy"${$.attr("title", anime.title)}>${$.escape(anime.title)}</h3> `);
		if (anime.originalTitle && anime.originalTitle !== anime.title) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="mb-2 line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400 svelte-16rsyhy"${$.attr("title", anime.originalTitle)}>${$.escape(anime.originalTitle)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400"><span>${$.escape(anime.epStatus || anime.date?.slice(0, 4) || "")}</span></div></div></div>`);
	});
}
//#endregion
//#region src/components/pages/anime/AnimeDetailModal.svelte
function AnimeDetailModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { anime, onclose } = $$props;
		const SEASON_TYPE_I18N = {
			1: I18nKey.animeTypeAnime,
			2: I18nKey.animeTypeMovie,
			3: I18nKey.animeTypeDocumentary,
			4: I18nKey.animeTypeChinese,
			5: I18nKey.animeTypeDrama,
			7: I18nKey.animeTypeConcert
		};
		const SEASON_TYPE_COLORS = {
			1: "bg-blue-500",
			2: "bg-purple-500",
			3: "bg-emerald-500",
			4: "bg-orange-500",
			5: "bg-pink-500",
			7: "bg-yellow-500"
		};
		function getTypeLabel(seasonType) {
			return i18n(SEASON_TYPE_I18N[seasonType] || I18nKey.animeTypeAnime);
		}
		function getTypeColor(seasonType) {
			return SEASON_TYPE_COLORS[seasonType] || "bg-gray-500";
		}
		if (anime) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" tabindex="-1"><div class="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl bg-(--card-bg) border border-(--line-divider) shadow-2xl animate-in scale-90 sm:scale-100 svelte-1thnd9y"><button class="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"${$.attr("aria-label", i18n(I18nKey.animeClose))}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <div class="flex flex-col md:flex-row"><div class="relative w-full md:w-64 lg:w-72 shrink-0 h-48 sm:h-64 md:aspect-auto md:h-auto bg-neutral-100 dark:bg-neutral-800 overflow-hidden">`);
			if (anime.poster) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="lqip-placeholder absolute inset-0 pointer-events-none" style="background: var(--muted)" aria-hidden="true"></div> <img${$.attr("src", anime.poster)}${$.attr("alt", anime.title)} class="h-full w-full object-cover opacity-0 transition-opacity duration-500" referrerpolicy="no-referrer" crossorigin="anonymous" onload="this.__e=event"/>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="flex h-full min-h-[300px] items-center justify-center"><svg class="h-16 w-16 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"></path></svg></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[60vh] md:max-h-none"><h2 class="mb-1 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">${$.escape(anime.title)}</h2> `);
			if (anime.originalTitle && anime.originalTitle !== anime.title) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="mb-4 text-sm text-neutral-500 dark:text-neutral-400">${$.escape(anime.originalTitle)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="mb-4 flex flex-wrap gap-2"><span${$.attr_class(`inline-flex items-center gap-1 rounded-lg ${$.stringify(getTypeColor(anime.season_type))} px-3 py-1 text-xs font-bold text-white`, "svelte-1thnd9y")}>${$.escape(getTypeLabel(anime.season_type))}</span> `);
			if (anime.rating > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="inline-flex items-center gap-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-600 dark:text-yellow-400"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> ${$.escape(anime.rating.toFixed(1))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (anime.epStatus) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="inline-flex items-center rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">${$.escape(anime.epStatus)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span${$.attr_class(`inline-flex items-center rounded-lg ${anime.source === "bilibili" ? "bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"} border px-3 py-1 text-xs font-bold`)}>${$.escape(anime.source === "bilibili" ? "Bilibili" : "TMDB")}</span></div> `);
			if (anime.overview) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mb-6"><h3 class="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">${$.escape(i18n(I18nKey.animeSynopsis))}</h3> <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-h-40 overflow-y-auto">${$.escape(anime.overview)}</p></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <a${$.attr("href", anime.link)} target="_blank" rel="noopener noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-(--primary)/90 hover:shadow-lg">`);
			if (anime.source === "bilibili") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${$.escape(i18n(I18nKey.animeWatchNow))}`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>${$.escape(i18n(I18nKey.animeViewTmdb))}`);
			}
			$$renderer.push(`<!--]--></a></div></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/components/pages/anime/AnimeGrid.svelte
function AnimeGrid($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, bilibiliAverageRating, itemsPerPage = 24 } = $$props;
		let searchQuery = "";
		let activeFilter = untrack(() => String([...new Set(items.map((i) => i.season_type || 1))].sort((a, b) => a - b)[0] || ""));
		let sortBy = "rating-desc";
		let currentPage = 1;
		let selectedAnime = null;
		const SEASON_TYPE_I18N = {
			1: I18nKey.animeTypeAnime,
			2: I18nKey.animeTypeMovie,
			3: I18nKey.animeTypeDocumentary,
			4: I18nKey.animeTypeChinese,
			5: I18nKey.animeTypeDrama,
			7: I18nKey.animeTypeConcert
		};
		let filterOptions = $.derived(() => () => {
			const typeMap = /* @__PURE__ */ new Map();
			for (const item of items) {
				const st = item.season_type || 1;
				typeMap.set(st, (typeMap.get(st) || 0) + 1);
			}
			return Array.from(typeMap.entries()).sort(([a], [b]) => a - b).map(([type, count]) => ({
				value: String(type),
				label: i18n(SEASON_TYPE_I18N[type] || I18nKey.animeTypeAnime),
				count
			}));
		});
		let filteredItems = $.derived(() => () => {
			let result = [...items];
			if (searchQuery.trim());
			if (activeFilter) {
				const filterType = Number(activeFilter);
				result = result.filter((item) => (item.season_type || 1) === filterType);
			}
			switch (sortBy) {
				case "rating-desc":
					result.sort((a, b) => b.rating - a.rating);
					break;
				case "rating-asc":
					result.sort((a, b) => a.rating - b.rating);
					break;
				case "date-desc":
					result.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
					break;
				case "date-asc":
					result.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
					break;
			}
			return result;
		});
		let pagedItems = $.derived(() => () => {
			const start = (currentPage - 1) * itemsPerPage;
			return filteredItems()().slice(start, start + itemsPerPage);
		});
		function resetPage() {
			currentPage = 1;
		}
		function setFilter(filter) {
			activeFilter = activeFilter === filter ? "" : filter;
			resetPage();
		}
		function setSort(sort) {
			sortBy = sort;
			resetPage();
		}
		function goToPage(page) {
			currentPage = page;
		}
		function openDetail(anime) {
			selectedAnime = anime;
		}
		function closeDetail() {
			selectedAnime = null;
		}
		$$renderer.push(`<div class="anime-grid"><div class="mb-6 flex flex-col gap-3"><div class="flex gap-2"><div class="relative flex-1"><svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text"${$.attr("placeholder", i18n(I18nKey.animeSearch))}${$.attr("value", searchQuery)} class="w-full rounded-xl border border-(--line-divider) bg-(--card-bg) py-2.5 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 outline-none transition-colors focus:border-(--primary)"/></div> `);
		$$renderer.select({
			value: sortBy,
			onchange: (e) => setSort(e.target.value),
			class: "rounded-xl border border-(--line-divider) bg-(--card-bg) px-3 text-sm text-neutral-600 dark:text-neutral-400 outline-none cursor-pointer shrink-0"
		}, ($$renderer) => {
			$$renderer.option({ value: "rating-desc" }, ($$renderer) => {
				$$renderer.push(`${$.escape(i18n(I18nKey.animeRatingDesc))}`);
			});
			$$renderer.option({ value: "rating-asc" }, ($$renderer) => {
				$$renderer.push(`${$.escape(i18n(I18nKey.animeRatingAsc))}`);
			});
			$$renderer.option({ value: "date-desc" }, ($$renderer) => {
				$$renderer.push(`${$.escape(i18n(I18nKey.animeDateDesc))}`);
			});
			$$renderer.option({ value: "date-asc" }, ($$renderer) => {
				$$renderer.push(`${$.escape(i18n(I18nKey.animeDateAsc))}`);
			});
		});
		$$renderer.push(`</div> `);
		TabNav($$renderer, {
			tabs: filterOptions()().map((opt) => ({
				id: opt.value,
				name: opt.label,
				count: opt.count
			})),
			activeTab: activeFilter,
			onTabChange: setFilter
		});
		$$renderer.push(`<!----></div> `);
		if (pagedItems()().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="anime-card-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"><!--[-->`);
			const each_array = $.ensure_array_like(pagedItems()());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let anime = each_array[$$index];
				AnimeCard($$renderer, {
					anime,
					onclick: openDetail
				});
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="py-16 text-center"><svg class="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <p class="text-neutral-500 dark:text-neutral-400">${$.escape(i18n(I18nKey.animeNoResults))}</p></div>`);
		}
		$$renderer.push(`<!--]--> `);
		ClientPagination($$renderer, {
			totalItems: filteredItems()().length,
			itemsPerPage,
			currentPage,
			onPageChange: goToPage
		});
		$$renderer.push(`<!----></div> `);
		AnimeDetailModal($$renderer, {
			anime: selectedAnime,
			onclose: closeDetail
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region src/pages/anime.astro
var anime_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Anime,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Anime = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Anime;
	if (!siteConfig.pages.anime) return Astro.redirect("/404/");
	const buildTime = formatDateI18nWithTime(/* @__PURE__ */ new Date());
	const animeConfig = siteConfig.anime;
	const TMDB_API_KEY = animeConfig?.tmdb?.apiKey;
	const TMDB_LIST_ID = animeConfig?.tmdb?.listId;
	const BILIBILI_UID = animeConfig?.bilibili?.uid;
	const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
	function readTmdbLocalCache() {
		try {
			const localPath = path$1.resolve("public/anime-list.json");
			if (fs$1.existsSync(localPath)) {
				const localData = JSON.parse(fs$1.readFileSync(localPath, "utf-8"));
				const items = localData.items || localData[0]?.items || [];
				console.log(`[Anime] Using local cache: ${items.length} items.`);
				return items;
			}
		} catch {}
		return [];
	}
	let tmdbItems = [];
	if (TMDB_API_KEY && TMDB_LIST_ID) try {
		console.log(`[Anime] Fetching TMDB list: ${TMDB_LIST_ID}...`);
		const firstResponse = await fetch(`https://api.themoviedb.org/3/list/${TMDB_LIST_ID}?api_key=${TMDB_API_KEY}&language=zh-CN&page=1`);
		if (firstResponse.ok) {
			const firstData = await firstResponse.json();
			const totalPages = firstData.total_pages || 1;
			let allItems = [...firstData.items || []];
			if (totalPages > 1) {
				const promises = [];
				for (let page = 2; page <= totalPages; page++) promises.push(fetch(`https://api.themoviedb.org/3/list/${TMDB_LIST_ID}?api_key=${TMDB_API_KEY}&language=zh-CN&page=${page}`).then((res) => res.json()).then((data) => data.items || []));
				const remainingItems = await Promise.all(promises);
				for (const items of remainingItems) allItems.push(...items);
			}
			tmdbItems = allItems;
			console.log(`[Anime] Fetched ${tmdbItems.length} items from TMDB.`);
		} else {
			console.error(`[Anime] TMDB fetch failed: ${firstResponse.status}`);
			tmdbItems = readTmdbLocalCache();
		}
	} catch (error) {
		console.error("[Anime] TMDB fetch error:", error instanceof Error ? error.message : error);
		tmdbItems = readTmdbLocalCache();
	}
	let bilibiliItems = [];
	if (BILIBILI_UID) try {
		console.log(`[Anime] Fetching Bilibili list for UID: ${BILIBILI_UID}...`);
		const ps = 30;
		/** 获取指定类型的全部追番数据 */
		async function fetchBilibiliByType(type) {
			const items = [];
			const firstJson = await (await fetch(`https://api.bilibili.com/x/space/bangumi/follow/list?type=${type}&vmid=${BILIBILI_UID}&pn=1&ps=${ps}`)).json();
			if (firstJson.code !== 0 || !firstJson.data?.list?.length) return items;
			items.push(...firstJson.data.list);
			const total = firstJson.data.total || items.length;
			const totalPages = Math.ceil(total / ps);
			if (totalPages > 1) {
				const promises = [];
				for (let pn = 2; pn <= totalPages; pn++) promises.push(fetch(`https://api.bilibili.com/x/space/bangumi/follow/list?type=${type}&vmid=${BILIBILI_UID}&pn=${pn}&ps=${ps}`).then((r) => r.json()).then((j) => j.data?.list || []));
				const remaining = await Promise.all(promises);
				for (const batch of remaining) items.push(...batch);
			}
			return items;
		}
		const [animeItems, dramaItems] = await Promise.all([fetchBilibiliByType(1), fetchBilibiliByType(2)]);
		bilibiliItems = [...animeItems, ...dramaItems];
		console.log(`[Anime] Fetched ${bilibiliItems.length} items from Bilibili (anime: ${animeItems.length}, drama: ${dramaItems.length}).`);
	} catch (e) {
		console.error("[Anime] Bilibili fetch error:", e);
	}
	let animeList = tmdbItems.map((anime) => {
		const title = anime.title || anime.name || "";
		const originalTitle = anime.original_title || anime.original_name || "";
		const date = anime.release_date || anime.first_air_date || "";
		const type = anime.media_type || "tv";
		return {
			id: anime.id,
			title,
			originalTitle,
			poster: anime.poster_path ? TMDB_IMG + anime.poster_path : null,
			type,
			season_type: type === "movie" ? 2 : 1,
			source: "tmdb",
			rating: anime.vote_average || 0,
			date,
			overview: anime.overview || "",
			link: `https://www.themoviedb.org/${type}/${anime.id}`,
			epStatus: void 0
		};
	});
	if (bilibiliItems.length > 0) {
		const bilibiliMapped = bilibiliItems.map((item) => ({
			id: item.media_id,
			title: item.title,
			originalTitle: item.title,
			poster: item.cover ? item.cover.replace("http://", "https://") : null,
			type: item.season_type === 2 ? "movie" : "tv",
			season_type: item.season_type || 1,
			source: "bilibili",
			rating: item.rating?.score || 0,
			date: "",
			overview: item.evaluate || item.brief || "",
			link: `https://www.bilibili.com/bangumi/play/ss${item.season_id}`,
			epStatus: item.new_ep?.index_show || ""
		}));
		const bilibiliTitles = new Set(bilibiliMapped.map((item) => item.title));
		animeList = animeList.filter((item) => !bilibiliTitles.has(item.title));
		animeList = [...animeList, ...bilibiliMapped];
	}
	const totalCount = animeList.length;
	const tmdbAverageRating = tmdbItems.length > 0 ? (tmdbItems.reduce((sum, item) => sum + (Number(item.vote_average) || 0), 0) / tmdbItems.length).toFixed(1) : "0.0";
	const bilibiliAverageRating = bilibiliItems.length > 0 ? (bilibiliItems.reduce((sum, item) => sum + (Number(item.rating?.score) || 0), 0) / bilibiliItems.length).toFixed(1) : "0.0";
	const isConfigured = !!(BILIBILI_UID || TMDB_API_KEY && TMDB_LIST_ID);
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {
		"title": i18n(I18nKey.anime),
		"description": i18n(I18nKey.animeSubtitle)
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex w-full rounded-(--radius-large) overflow-hidden relative min-h-32"><div class="card-base z-10 px-4 sm:px-6 md:px-9 py-4 sm:py-6 relative w-full"><!-- 页面标题 --><div class="relative w-full mb-8"><div class="mb-6"><div class="flex items-center gap-3 mb-3"><div class="h-8 w-8 rounded-lg bg-(--primary) flex items-center justify-center text-white dark:text-black/70">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:live-tv",
		"class": "text-[1.5rem]"
	})}</div><div class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">${i18n(I18nKey.anime)}</div></div><p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">${i18n(I18nKey.animeSubtitle)}</p><p class="text-xs text-neutral-500 dark:text-neutral-500 mt-2">${i18n(I18nKey.animeLastUpdated)} ${buildTime}</p></div>${!isConfigured ? renderTemplate`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:settings",
		"class": "text-[2rem] text-(--btn-content)"
	})}</div><h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">${i18n(I18nKey.animeNotConfigured)}</h2><p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">${i18n(I18nKey.animeNotConfiguredDesc)}</p></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<!-- 统计卡片 --><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"><div class="bg-(--card-bg) rounded-xl p-3 sm:p-4 border border-(--line-divider)"><div class="flex items-center gap-2 sm:gap-3"><div class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-(--primary)/10 flex items-center justify-center shrink-0">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:movie-filter",
		"class": "text-[1rem] sm:text-[1.25rem] text-(--primary)"
	})}</div><div class="min-w-0"><div class="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">${i18n(I18nKey.animeTotal)}</div><div class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">${totalCount}</div></div></div></div><div class="bg-(--card-bg) rounded-xl p-3 sm:p-4 border border-(--line-divider)"><div class="flex items-center gap-2 sm:gap-3"><div class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:favorite",
		"class": "text-[1rem] sm:text-[1.25rem] text-pink-500"
	})}</div><div class="min-w-0"><div class="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">${i18n(I18nKey.animeBilibiliAvg)}</div><div class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">${bilibiliAverageRating}</div></div></div></div><div class="bg-(--card-bg) rounded-xl p-3 sm:p-4 border border-(--line-divider)"><div class="flex items-center gap-2 sm:gap-3"><div class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:star",
		"class": "text-[1rem] sm:text-[1.25rem] text-yellow-500"
	})}</div><div class="min-w-0"><div class="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">${i18n(I18nKey.animeTmdbAvg)}</div><div class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">${tmdbAverageRating}</div></div></div></div><div class="bg-(--card-bg) rounded-xl p-3 sm:p-4 border border-(--line-divider)"><div class="flex items-center gap-2 sm:gap-3"><div class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:database",
		"class": "text-[1rem] sm:text-[1.25rem] text-emerald-500"
	})}</div><div class="min-w-0"><div class="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">${i18n(I18nKey.animeSource)}</div><div class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 truncate">${BILIBILI_UID && TMDB_API_KEY && TMDB_LIST_ID ? i18n(I18nKey.animeDualSynced) : BILIBILI_UID ? "Bilibili" : "TMDB"}</div></div></div></div></div>${renderComponent($$result, "AnimeGrid", AnimeGrid, {
		"client:load": true,
		"items": animeList,
		"bilibiliAverageRating": bilibiliAverageRating,
		"client:component-hydration": "load",
		"client:component-path": "@/components/pages/anime/AnimeGrid.svelte",
		"client:component-export": "default"
	})}` })}`}</div></div></div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/anime.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/anime.astro";
var $$url = "/anime/";
//#endregion
//#region \0virtual:astro:page:src/pages/anime@_@astro
var page = () => anime_exports;
//#endregion
export { page };
