import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { W as createAstro, _ as renderTemplate, c as renderComponent, k as maybeRenderHead, u as Fragment } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { c as i18n, f as I18nKey, l as siteConfig } from "./url-utils_DChKFQtU.mjs";
import { t as $$MainGridLayout } from "./MainGridLayout_D0kLDJ1t.mjs";
import { t as formatDateI18nWithTime } from "./date-utils_BBaum0Sr.mjs";
import { t as ClientPagination } from "./ClientPagination_G-kC5pYU.mjs";
import { onMount } from "svelte";
import { existsSync } from "node:fs";
import path from "node:path";
import * as $ from "svelte/internal/server";
//#region src/utils/vndb-utils.ts
var VNDB_ULIST_FIELDS = [
	"id",
	"vote",
	"notes",
	"started",
	"finished",
	"labels{label}",
	"vn{id,title,alttitle,released,languages,platforms,image{url,thumbnail,sexual,violence},rating,votecount,length,length_minutes,developers{name},tags{name}}"
].join(",");
var VNDB_TAGS_TO_KEEP = 3;
async function fetchVndbUlist(options) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	if (options.apiToken) headers.Authorization = `Token ${options.apiToken}`;
	const response = await fetch(`${options.apiUrl}/ulist`, {
		method: "POST",
		headers,
		body: JSON.stringify({
			user: options.userId,
			fields: VNDB_ULIST_FIELDS,
			results: options.results,
			page: options.page
		})
	});
	if (!response.ok) throw new Error(`[VNDB] 无法获取数据 (状态码: ${response.status})`);
	const data = await response.json();
	return {
		...data,
		results: data.results.map((item) => {
			const tagNames = (item.vn?.tags || []).map((tag) => tag.name).filter(Boolean);
			return {
				...item,
				labels: (item.labels || []).map(({ label }) => ({ label })),
				vn: {
					...item.vn,
					developers: (item.vn?.developers || []).map(({ name }) => ({ name })),
					tags: tagNames.slice(0, VNDB_TAGS_TO_KEEP).map((name) => ({ name })),
					tagCount: tagNames.length
				}
			};
		})
	};
}
var VNDB_LABEL_ORDER = [
	"wishlist",
	"playing",
	"finished",
	"stalled",
	"dropped"
];
function normalizeVndbLabel(label) {
	const lower = label.trim().toLowerCase();
	if (/wish|want/.test(lower)) return "wishlist";
	if (/play/.test(lower)) return "playing";
	if (/finish|complete|clear|done/.test(lower)) return "finished";
	if (/stall|hold|pause/.test(lower)) return "stalled";
	if (/drop|abandon/.test(lower)) return "dropped";
	return lower.replace(/\s+/g, "-") || "unknown";
}
function getVndbStatusText(key, fallback = "") {
	switch (key) {
		case "wishlist": return i18n(I18nKey.vndbStatusWishlist);
		case "playing": return i18n(I18nKey.vndbStatusPlaying);
		case "finished": return i18n(I18nKey.vndbStatusFinished);
		case "stalled": return i18n(I18nKey.vndbStatusStalled);
		case "dropped": return i18n(I18nKey.vndbStatusDropped);
		case "unknown": return i18n(I18nKey.vndbStatusUnknown);
		default: return fallback || key;
	}
}
function buildVndbTabs(items) {
	const labelMap = /* @__PURE__ */ new Map();
	for (const item of items) for (const label of item.labels || []) {
		const key = normalizeVndbLabel(label.label);
		if (!labelMap.has(key)) labelMap.set(key, label.label);
	}
	const tabs = [{
		id: "all",
		name: i18n(I18nKey.all),
		count: items.length
	}];
	for (const key of VNDB_LABEL_ORDER) if (labelMap.has(key)) tabs.push({
		id: key,
		name: getVndbStatusText(key, labelMap.get(key) || key),
		count: getVndbItemsForTab(items, key).length
	});
	for (const [key, label] of labelMap) if (!VNDB_LABEL_ORDER.includes(key)) tabs.push({
		id: key,
		name: label,
		count: getVndbItemsForTab(items, key).length
	});
	return tabs;
}
function getVndbItemsForTab(items, tabId) {
	if (tabId === "all") return items;
	return items.filter((item) => (item.labels || []).some((label) => normalizeVndbLabel(label.label) === tabId));
}
function getVndbLengthText(length) {
	switch (length) {
		case 1: return i18n(I18nKey.vndbLengthVeryShort);
		case 2: return i18n(I18nKey.vndbLengthShort);
		case 3: return i18n(I18nKey.vndbLengthMedium);
		case 4: return i18n(I18nKey.vndbLengthLong);
		case 5: return i18n(I18nKey.vndbLengthVeryLong);
		default: return "";
	}
}
function formatPlaytime(minutes) {
	if (!minutes || minutes <= 0) return "";
	if (minutes < 60) return `~${minutes}m`;
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;
	return rest > 0 ? `~${hours}h ${rest}m` : `~${hours}h`;
}
function formatVndbLength(length, minutes) {
	const label = getVndbLengthText(length);
	const playtime = formatPlaytime(minutes);
	if (label && playtime) return `${label} · ${playtime}`;
	return label || playtime;
}
//#endregion
//#region src/components/pages/vndb/TabNav.svelte
function TabNav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { tabs, activeTab, onTabChange } = $$props;
		function handleHashChange() {
			const hash = window.location.hash.replace(/^#/, "");
			if (hash) try {
				const decoded = decodeURIComponent(hash);
				if (tabs.some((t) => t.id === decoded)) onTabChange(decoded);
			} catch {}
		}
		onMount(() => {
			window.addEventListener("hashchange", handleHashChange);
			return () => window.removeEventListener("hashchange", handleHashChange);
		});
		$$renderer.push(`<div class="border-b border-(--line-divider) mb-3"><div class="overflow-x-auto" data-tab-scroll-container=""><nav class="flex min-w-max space-x-8" aria-label="Tabs"><!--[-->`);
		const each_array = $.ensure_array_like(tabs);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let tab = each_array[$$index];
			$$renderer.push(`<button${$.attr_class(`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${tab.id === activeTab ? "border-(--primary) text-(--primary)" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"}`)} type="button">${$.escape(tab.name)} `);
			if (tab.count !== void 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="ml-2 bg-(--btn-regular-bg) text-(--btn-content) py-0.5 px-2 rounded-full text-xs">${$.escape(tab.count)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button>`);
		}
		$$renderer.push(`<!--]--></nav></div></div>`);
	});
}
//#endregion
//#region src/components/pages/vndb/Card.svelte
function Card($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { item, loadImage = false, vnBaseUrl = "https://vndb.org/", blurNsfw } = $$props;
		const STATUS_COLORS = {
			wishlist: "bg-blue-500",
			playing: "bg-yellow-500",
			finished: "bg-green-500",
			stalled: "bg-orange-500",
			dropped: "bg-red-500",
			unknown: "bg-gray-500"
		};
		const firstLabel = $.derived(() => (item.labels || []).find((label) => [
			"wishlist",
			"playing",
			"finished",
			"stalled",
			"dropped"
		].includes(normalizeVndbLabel(label.label)))?.label || item.labels?.[0]?.label || "");
		const labelKey = $.derived(() => normalizeVndbLabel(firstLabel()));
		const statusText = $.derived(() => firstLabel() ? getVndbStatusText(labelKey(), firstLabel()) : i18n(I18nKey.vndbStatusUnknown));
		const statusColor = $.derived(() => STATUS_COLORS[labelKey()] || "bg-gray-500");
		const title = $.derived(() => item.vn?.alttitle || item.vn?.title || "VNDB");
		const altTitle = $.derived(() => item.vn?.title && item.vn.title !== title() ? item.vn.title : "");
		const year = $.derived(() => item.vn?.released ? item.vn.released.substring(0, 4) : "");
		const imageUrl = $.derived(() => item.vn?.image?.url || item.vn?.image?.thumbnail || "");
		$.derived(() => ((item.vn?.image?.sexual ?? 0) > 1 || (item.vn?.image?.violence ?? 0) > 1) && blurNsfw);
		const userVote = $.derived(() => item.vote);
		const rating = $.derived(() => item.vn?.rating);
		const voteCount = $.derived(() => item.vn?.votecount);
		const lengthText = $.derived(() => formatVndbLength(item.vn?.length, item.vn?.length_minutes));
		const developerText = $.derived(() => (item.vn?.developers || []).slice(0, 2).map((producer) => producer.name).join(" / "));
		const languageText = $.derived(() => (item.vn?.languages || []).slice(0, 4).map((lang) => lang.toUpperCase()).join(" / "));
		const platformText = $.derived(() => (item.vn?.platforms || []).slice(0, 4).map((platform) => platform.toUpperCase()).join(" / "));
		const metaText = $.derived(() => [
			developerText(),
			languageText(),
			platformText()
		].filter(Boolean).join(" · "));
		const notes = $.derived(() => item.notes || "");
		const playRange = $.derived(() => [item.started, item.finished].filter(Boolean).join(" ~ "));
		const tags = $.derived(() => (item.vn?.tags || []).map((tag) => tag.name));
		const visibleTags = $.derived(() => tags().slice(0, 3));
		const hiddenTagCount = $.derived(() => Math.max((item.vn?.tagCount ?? tags().length) - visibleTags().length, 0));
		const link = $.derived(() => `${vnBaseUrl}${item.vn?.id || item.id}`);
		$.derived(() => imageUrl() ? [imageUrl()] : []);
		$$renderer.push(`<a${$.attr("href", link())} target="_blank" rel="noopener noreferrer nofollow" class="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] block"><div class="aspect-2/3 relative overflow-hidden">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><div class="text-gray-400 dark:text-gray-500 text-4xl font-bold">VN</div></div>`);
		$$renderer.push(`<!--]--> <div${$.attr_class(`absolute top-2 left-2 px-2 py-1 rounded-full text-xs text-white font-medium ${$.stringify(statusColor())}`)}>${$.escape(statusText())}</div> `);
		if (userVote()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white font-medium bg-black/50 backdrop-blur-sm flex items-center gap-1"><span class="text-yellow-400">⭐</span> ${$.escape(userVote())}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-3"><h3 class="font-bold text-sm text-white line-clamp-2 drop-shadow-lg">${$.escape(title())}</h3> `);
		if (altTitle()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/60 mt-0.5 line-clamp-1">${$.escape(altTitle())}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (year() || lengthText()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/70 mt-1">`);
			if (year()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${$.escape(year())}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (year() && lengthText()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`·`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (lengthText()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${$.escape(lengthText())}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (playRange()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/70 mt-1">${$.escape(playRange())}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (rating()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/70 mt-0.5"><span class="text-yellow-300 font-medium">VNDB</span> ${$.escape(rating())} `);
			if (voteCount()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-white/50">· ${$.escape(voteCount())} ${$.escape(i18n(I18nKey.vndbVotes))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (metaText()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/65 mt-0.5 line-clamp-1"${$.attr("title", metaText())}>${$.escape(metaText())}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (notes()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-xs text-white/75 line-clamp-1 mt-1 leading-relaxed"${$.attr("title", notes())}>${$.escape(notes())}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (visibleTags().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-wrap gap-1 mt-1.5"><!--[-->`);
			const each_array = $.ensure_array_like(visibleTags());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tag = each_array[$$index];
				$$renderer.push(`<span class="text-[0.6rem] px-1.5 py-0.5 rounded bg-white/20 text-white/90 backdrop-blur-sm">${$.escape(tag)}</span>`);
			}
			$$renderer.push(`<!--]--> `);
			if (hiddenTagCount() > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-[0.6rem] px-1.5 py-0.5 rounded bg-white/20 text-white/60 backdrop-blur-sm">+${$.escape(hiddenTagCount())}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></a>`);
	});
}
//#endregion
//#region src/components/pages/vndb/FilterControls.svelte
function FilterControls($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { filters, activeFilter, onFilterChange } = $$props;
		$$renderer.push(`<div class="flex flex-wrap gap-1.5 mb-4"><!--[-->`);
		const each_array = $.ensure_array_like(filters);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let filter = each_array[$$index];
			$$renderer.push(`<button${$.attr_class(`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${filter.value === activeFilter ? "bg-(--primary) text-white shadow-md" : "bg-(--btn-regular-bg) text-(--btn-content) hover:bg-(--btn-regular-bg-hover)"}`)} type="button">${$.escape(filter.label)} `);
			if (filter.count !== void 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="ml-1">(${$.escape(filter.count)})</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/components/pages/vndb/VndbSection.svelte
function VndbSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { sectionId, items, isActive, itemsPerPage = 24, vnBaseUrl, blurNsfw } = $$props;
		const filterCounts = $.derived(() => {
			let voted = 0;
			let unvoted = 0;
			let notes = 0;
			for (const item of items) {
				if (item.vote != null) voted += 1;
				else unvoted += 1;
				if (item.notes) notes += 1;
			}
			return {
				voted,
				unvoted,
				notes
			};
		});
		const filters = $.derived(() => {
			const counts = filterCounts();
			return [
				{
					value: "all",
					label: i18n(I18nKey.vndbFilterAll),
					count: items.length
				},
				{
					value: "voted",
					label: i18n(I18nKey.vndbFilterVoted),
					count: counts.voted
				},
				{
					value: "unvoted",
					label: i18n(I18nKey.vndbFilterUnvoted),
					count: counts.unvoted
				},
				{
					value: "notes",
					label: i18n(I18nKey.vndbFilterNotes),
					count: counts.notes
				}
			].filter((filter) => filter.value === "all" || filter.count > 0);
		});
		let activeFilter = "all";
		let currentPage = 1;
		const filteredItems = $.derived(() => {
			if (activeFilter === "all") return items;
			if (activeFilter === "voted") return items.filter((item) => item.vote != null);
			if (activeFilter === "unvoted") return items.filter((item) => item.vote == null);
			if (activeFilter === "notes") return items.filter((item) => item.notes);
			return items;
		});
		const totalPages = $.derived(() => Math.max(1, Math.ceil(filteredItems().length / itemsPerPage)));
		const pagedItems = $.derived(() => filteredItems().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
		function handleFilterChange(filter) {
			activeFilter = filter;
			currentPage = 1;
		}
		function goToPage(page) {
			if (page >= 1 && page <= totalPages()) currentPage = page;
		}
		$$renderer.push(`<div${$.attr_class("vndb-section", void 0, { "hidden": !isActive })}${$.attr("data-section", sectionId)}>`);
		if (items.length > 0) {
			$$renderer.push("<!--[0-->");
			FilterControls($$renderer, {
				filters: filters(),
				activeFilter,
				onFilterChange: handleFilterChange
			});
			$$renderer.push(`<!----> <div class="bangumi-masonry grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"><!--[-->`);
			const each_array = $.ensure_array_like(pagedItems());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<div class="vndb-item"${$.attr("data-item-section", sectionId)}${$.attr("data-item-id", item.id)}>`);
				Card($$renderer, {
					item,
					loadImage: isActive,
					vnBaseUrl,
					blurNsfw
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div> `);
			ClientPagination($$renderer, {
				totalItems: filteredItems().length,
				itemsPerPage,
				currentPage,
				onPageChange: goToPage
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="text-center py-12"><h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">${$.escape(i18n(I18nKey.vndbNoData))}</h3> <p class="text-gray-500 dark:text-gray-500">${$.escape(i18n(I18nKey.vndbNoDataDescription))}</p></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/components/pages/vndb/VndbGrid.svelte
function VndbGrid($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { tabs: staticTabs, initialActiveTab, vndbData: staticData, vnBaseUrl, fetchConfig, blurNsfw } = $$props;
		const isDynamic = $.derived(() => !!fetchConfig);
		let activeTab = "";
		let fetchLoading = false;
		let error = false;
		let errorTitle = "";
		let errorDesc = "";
		let dynamicTabs = [];
		let dynamicData = {};
		const tabs = $.derived(() => staticTabs || dynamicTabs);
		const vndbData = $.derived(() => staticData || dynamicData);
		function handleTabChange(tabId) {
			activeTab = tabId;
		}
		async function loadDynamicData() {
			if (!fetchConfig) return;
			const { userId, apiUrl, apiToken, pagination } = fetchConfig;
			const { limit, delay, maxTotal } = pagination;
			const allItems = [];
			let page = 1;
			try {
				while (true) {
					if (maxTotal > 0 && allItems.length >= maxTotal) break;
					const data = await fetchVndbUlist({
						apiUrl,
						userId,
						apiToken,
						results: limit,
						page
					});
					const batch = data.results || [];
					allItems.push(...batch);
					if (!data.more || batch.length === 0) break;
					page += 1;
					await new Promise((resolve) => setTimeout(resolve, delay));
				}
				if (allItems.length === 0) {
					fetchLoading = false;
					error = true;
					errorTitle = i18n(I18nKey.vndbNoData);
					errorDesc = i18n(I18nKey.vndbNoDataDescription);
					return;
				}
				const newTabs = buildVndbTabs(allItems);
				const newData = { all: allItems };
				dynamicTabs = newTabs;
				dynamicData = newData;
				activeTab = newTabs[0]?.id || "all";
				fetchLoading = false;
			} catch (e) {
				console.error("[VNDB] 获取数据失败:", e);
				fetchLoading = false;
				error = true;
				errorTitle = i18n(I18nKey.vndbFetchError);
				errorDesc = i18n(I18nKey.vndbFetchErrorDesc);
			}
		}
		onMount(async () => {
			if (isDynamic()) await loadDynamicData();
		});
		if (isDynamic() && fetchLoading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="border-b border-(--line-divider) mb-3"><div class="flex min-w-max space-x-8"><!--[-->`);
			const each_array = $.ensure_array_like([
				1,
				2,
				3,
				4
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				each_array[$$index];
				$$renderer.push(`<div class="h-10 w-20 bg-(--btn-regular-bg) rounded animate-pulse"></div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="flex flex-wrap gap-1.5 mb-4"><!--[-->`);
			const each_array_1 = $.ensure_array_like([
				1,
				2,
				3,
				4
			]);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				each_array_1[$$index_1];
				$$renderer.push(`<div class="h-7 w-16 bg-(--btn-regular-bg) rounded-full animate-pulse"></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="bangumi-masonry grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"><!--[-->`);
			const each_array_2 = $.ensure_array_like([
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			]);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				each_array_2[$$index_2];
				$$renderer.push(`<div class="rounded-xl overflow-hidden"><div class="aspect-2/3 bg-(--btn-regular-bg) animate-pulse"></div></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="mt-6 flex items-center justify-center gap-3"><div class="w-11 h-11 bg-(--btn-regular-bg) rounded-lg animate-pulse"></div> <div class="w-16 h-8 bg-(--btn-regular-bg) rounded animate-pulse"></div> <div class="w-11 h-11 bg-(--btn-regular-bg) rounded-lg animate-pulse"></div></div>`);
		} else if (isDynamic() && error) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)"><span class="text-[2rem] text-red-500">⚠</span></div> <h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">${$.escape(errorTitle)}</h2> <p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">${$.escape(errorDesc)}</p></div>`);
		} else if (tabs().length > 0) {
			$$renderer.push("<!--[2-->");
			TabNav($$renderer, {
				tabs: tabs(),
				activeTab,
				onTabChange: handleTabChange
			});
			$$renderer.push(`<!----> <!--[-->`);
			const each_array_3 = $.ensure_array_like(tabs());
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let tab = each_array_3[$$index_3];
				VndbSection($$renderer, {
					sectionId: tab.id,
					items: getVndbItemsForTab(vndbData().all || [], tab.id),
					isActive: tab.id === activeTab,
					itemsPerPage: 24,
					vnBaseUrl,
					blurNsfw: blurNsfw ?? fetchConfig?.blurNsfw ?? true
				});
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/pages/vndb.astro
var vndb_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Vndb,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Vndb = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Vndb;
	if (!siteConfig.pages.vndb) return Astro2.redirect("/404/");
	const buildTime = formatDateI18nWithTime(/* @__PURE__ */ new Date());
	const vndbConfig = {
		userId: siteConfig.vndb?.userId || "",
		mode: siteConfig.vndb?.mode || "static",
		downloadCovers: siteConfig.vndb?.downloadCovers ?? false,
		apiUrl: siteConfig.vndb?.apiUrl || "https://api.vndb.org/kana",
		vnBaseUrl: siteConfig.vndb?.vnBaseUrl || "https://vndb.org/",
		apiToken: siteConfig.vndb?.apiToken || "",
		pagination: {
			limit: 100,
			delay: 100,
			maxTotal: 1e3
		},
		blurNsfw: siteConfig.vndb?.blurNsfw ?? true
	};
	const isDynamic = vndbConfig.mode === "dynamic";
	const isUserIdConfigured = vndbConfig.userId.trim() !== "" && vndbConfig.userId !== "you-user-id";
	const vndbData = {};
	const tabs = [];
	let fetchFailed = false;
	if (!isDynamic && isUserIdConfigured) {
		const { limit, delay, maxTotal } = vndbConfig.pagination;
		const allItems = [];
		let page = 1;
		try {
			while (true) {
				if (maxTotal > 0 && allItems.length >= maxTotal) break;
				const data = await fetchVndbUlist({
					apiUrl: vndbConfig.apiUrl,
					userId: vndbConfig.userId,
					apiToken: vndbConfig.apiToken,
					results: limit,
					page
				});
				const batch = data.results || [];
				allItems.push(...batch);
				if (!data.more || batch.length < limit) break;
				page += 1;
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
			if (vndbConfig.downloadCovers) {
				for (const item of allItems) if (existsSync(path.join(process.cwd(), "public", "vndb-covers", `${item.id}.webp`)) && item.vn?.image) item.vn.image.url = `/vndb-covers/${item.id}.webp`;
			}
			vndbData.all = allItems;
			tabs.push(...buildVndbTabs(allItems));
		} catch (error) {
			console.error("[VNDB] 获取数据失败:", error);
			fetchFailed = true;
		}
	}
	const activeTab = tabs[0]?.id || "all";
	return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {
		"title": i18n(I18nKey.vndb),
		"description": i18n(I18nKey.vndbSubtitle)
	}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="flex w-full rounded-(--radius-large) overflow-hidden relative min-h-32"><div class="card-base z-10 px-9 py-6 relative w-full"><div class="relative w-full mb-8"><div class="mb-6"><div class="flex items-center gap-3 mb-3"><div class="h-8 w-8 rounded-lg bg-(--primary) flex items-center justify-center text-white dark:text-black/70">${renderComponent($$result2, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:movie",
		"class": "text-[1.5rem]"
	})}</div><div class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">${i18n(I18nKey.vndb)}</div></div><p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">${i18n(I18nKey.vndbSubtitle)}</p>${!isDynamic && renderTemplate`<p class="text-xs text-neutral-500 dark:text-neutral-500 mt-2">${i18n(I18nKey.vndbLastUpdated)} ${buildTime}</p>`}</div>${isDynamic ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${!isUserIdConfigured ? renderTemplate`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)">${renderComponent($$result3, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:settings",
		"class": "text-[2rem] text-(--btn-content)"
	})}</div><h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">${i18n(I18nKey.vndbNotConfigured)}</h2><p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">${i18n(I18nKey.vndbNotConfiguredDesc)}</p></div>` : renderTemplate`${renderComponent($$result3, "VndbGrid", VndbGrid, {
		"client:load": true,
		"fetchConfig": {
			userId: vndbConfig.userId,
			apiUrl: vndbConfig.apiUrl,
			vnBaseUrl: vndbConfig.vnBaseUrl,
			pagination: vndbConfig.pagination,
			blurNsfw: vndbConfig.blurNsfw
		},
		"client:component-hydration": "load",
		"client:component-path": "@/components/pages/vndb/VndbGrid.svelte",
		"client:component-export": "default"
	})}`}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${fetchFailed ? renderTemplate`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)">${renderComponent($$result3, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:error-outline",
		"class": "text-[2rem] text-red-500"
	})}</div><h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">${i18n(I18nKey.vndbFetchError)}</h2><p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">${i18n(I18nKey.vndbFetchErrorDesc)}</p></div>` : tabs.length > 0 ? renderTemplate`${renderComponent($$result3, "VndbGrid", VndbGrid, {
		"client:load": true,
		"tabs": tabs,
		"initialActiveTab": activeTab,
		"vndbData": vndbData,
		"vnBaseUrl": vndbConfig.vnBaseUrl,
		"blurNsfw": vndbConfig.blurNsfw,
		"client:component-hydration": "load",
		"client:component-path": "@/components/pages/vndb/VndbGrid.svelte",
		"client:component-export": "default"
	})}` : renderTemplate`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)">${renderComponent($$result3, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:settings",
		"class": "text-[2rem] text-(--btn-content)"
	})}</div><h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">${isUserIdConfigured ? i18n(I18nKey.vndbEmpty) : i18n(I18nKey.vndbNotConfigured)}</h2><p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">${isUserIdConfigured ? i18n(I18nKey.vndbEmptyReason) : i18n(I18nKey.vndbNotConfiguredDesc)}</p></div>`}` })}`}</div></div></div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/vndb.astro", void 0);
var $$file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/vndb.astro";
var $$url = "/vndb/";
//#endregion
//#region \0virtual:astro:page:src/pages/vndb@_@astro
var page = () => vndb_exports;
//#endregion
export { page };
