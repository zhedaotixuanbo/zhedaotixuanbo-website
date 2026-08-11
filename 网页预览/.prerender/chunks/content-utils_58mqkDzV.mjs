import { t as getCollection } from "./_astro_content_BPkp6r8i.mjs";
import { c as i18n, f as I18nKey, t as getCategoryUrl } from "./url-utils_DChKFQtU.mjs";
//#region src/utils/content-utils.ts
async function getRawSortedPosts() {
	return (await getCollection("posts", ({ data }) => {
		return data.draft !== true;
	})).sort((a, b) => {
		if (a.data.pinned && !b.data.pinned) return -1;
		if (!a.data.pinned && b.data.pinned) return 1;
		return new Date(a.data.published) > new Date(b.data.published) ? -1 : 1;
	});
}
async function getSortedPosts() {
	const sorted = await getRawSortedPosts();
	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].id;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].id;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}
	return sorted;
}
async function getSortedPostsList() {
	return (await getRawSortedPosts()).map((post) => ({
		id: post.id,
		data: post.data
	}));
}
async function getTagList() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return data.draft !== true;
	});
	const countMap = {};
	allBlogPosts.forEach((post) => {
		post.data.tags.forEach((tag) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});
	return Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	}).map((key) => ({
		name: key,
		count: countMap[key]
	}));
}
async function getCategoryList() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return data.draft !== true;
	});
	const count = {};
	allBlogPosts.forEach((post) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}
		const categoryName = typeof post.data.category === "string" ? post.data.category.trim() : String(post.data.category).trim();
		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});
	const lst = Object.keys(count).sort((a, b) => {
		return count[b] - count[a] || a.toLowerCase().localeCompare(b.toLowerCase());
	});
	const ret = [];
	for (const c of lst) ret.push({
		name: c,
		count: count[c],
		url: getCategoryUrl(c)
	});
	return ret;
}
function tokenizeTitle(title) {
	const tokens = /* @__PURE__ */ new Set();
	const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
	for (const { segment, isWordLike } of segmenter.segment(title)) {
		if (!isWordLike) continue;
		tokens.add(segment.toLowerCase());
	}
	return tokens;
}
function jaccardSimilarity(a, b) {
	if (a.size === 0 && b.size === 0) return 0;
	let intersection = 0;
	for (const item of a) if (b.has(item)) intersection++;
	const union = a.size + b.size - intersection;
	return union === 0 ? 0 : intersection / union;
}
async function getRelatedPosts(currentPost, maxCount = 5) {
	const candidates = (await getCollection("posts", ({ data }) => {
		return data.draft !== true;
	})).filter((p) => p.id !== currentPost.id && !p.data.password);
	const currentTags = new Set(currentPost.data.tags || []);
	const currentTokens = tokenizeTitle(currentPost.data.title);
	const currentCategory = currentPost.data.category || "";
	const now = Date.now();
	const scored = candidates.map((post) => {
		const postTags = new Set(post.data.tags || []);
		const tagMatchScore = jaccardSimilarity(currentTags, postTags) * 100;
		const postTokens = tokenizeTitle(post.data.title);
		const titleSimilarityScore = jaccardSimilarity(currentTokens, postTokens) * 100;
		const daysSincePublished = (now - new Date(post.data.published).getTime()) / (1e3 * 60 * 60 * 24);
		const timeFreshnessScore = 30 * Math.exp(-Math.LN2 * daysSincePublished / 180);
		const postCategory = post.data.category || "";
		const categoryBonus = currentCategory && postCategory && currentCategory === postCategory ? 10 : 0;
		return {
			post,
			totalScore: tagMatchScore + titleSimilarityScore + timeFreshnessScore + categoryBonus,
			tagMatchScore,
			timeFreshnessScore,
			categoryBonus
		};
	});
	scored.sort((a, b) => b.totalScore - a.totalScore);
	const withTagMatch = scored.filter((s) => s.tagMatchScore > 0);
	const withoutTagMatch = scored.filter((s) => s.tagMatchScore === 0);
	const result = [];
	for (const s of withTagMatch) {
		if (result.length >= maxCount) break;
		result.push({
			id: s.post.id,
			data: s.post.data
		});
	}
	if (result.length < maxCount) {
		withoutTagMatch.sort((a, b) => b.timeFreshnessScore + b.categoryBonus - (a.timeFreshnessScore + a.categoryBonus));
		for (const s of withoutTagMatch) {
			if (result.length >= maxCount) break;
			result.push({
				id: s.post.id,
				data: s.post.data
			});
		}
	}
	return result;
}
//#endregion
export { getTagList as a, getSortedPostsList as i, getRelatedPosts as n, getSortedPosts as r, getCategoryList as t };
