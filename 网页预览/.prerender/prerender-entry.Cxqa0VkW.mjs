import { a as fileExtension, f as removeLeadingForwardSlash, i as collapseDuplicateTrailingSlashes, m as removeTrailingForwardSlash, n as collapseDuplicateLeadingSlashes, o as hasFileExtension, s as isInternalPath, t as appendForwardSlash, u as prependForwardSlash } from "./chunks/path_CsjwVQRw.mjs";
import { n as matchPattern } from "./chunks/remote_Df8tYpvm.mjs";
import { A as routeIsFallback, C as routeComparator, D as findRouteToRewrite, E as RedirectSinglePageBuiltModule, F as isForbiddenCrossOriginRequest, I as computePathnameFromDomain, L as pathHasLocale, M as NOOP_MIDDLEWARE_FN, N as AstroIntegrationLogger, O as getRouteGenerator, P as createCrossOriginForbiddenResponse, S as PipelineFeatures, T as getPattern, _ as attachCookiesToResponse, a as getParts, b as ALL_PIPELINE_FEATURES, c as setRenderOptions, d as AstroMiddleware, f as DisabledAstroCache, g as serializeActionResult, h as getActionContext, i as createStylesheetElementSet, j as routeIsRedirect, k as getFallbackRoute, l as matchRoute, m as I18n, n as createAssetLink, o as FetchState, p as NoopAstroCache, s as validateHost, t as createConsoleLogger, u as PagesHandler, v as getCookiesFromResponse, w as createDefaultRoutes, x as Pipeline, y as getSetCookiesFromResponse } from "./chunks/console_CpdLBzyh.mjs";
import { D as LocalsNotAnObject, n as AstroUserError, o as CacheNotEnabled, t as AstroError } from "./chunks/errors_C0BPOsBs.mjs";
import { $ as clientAddressSymbol, B as createVNode, G as isRoute404, H as escape, K as isRoute500, Q as appSymbol, Z as REROUTABLE_STATUS_CODES, d as chunkToString, l as renderStreaming, q as ASTRO_ERROR_HEADER, rt as responseSentSymbol, y as decodeKey, z as AstroJSX } from "./chunks/server_DCu-nPcH.mjs";
import { createRawSnippet } from "svelte";
import { render } from "svelte/server";
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/i18n/error-routes.js
function isLocalizedErrorRoute(route, status, locales) {
	if (!locales) return false;
	const suffix = `/${status}`;
	if (!route.endsWith(suffix)) return false;
	const localeSegment = route.slice(0, -suffix.length);
	if (!localeSegment || localeSegment.includes("/", 1)) return false;
	return pathHasLocale(localeSegment, locales);
}
function getErrorRoutePath(pathname, status, routes, locales, appendTrailingSlash = false) {
	const suffix = appendTrailingSlash ? "/" : "";
	if (locales) {
		const firstSegment = pathname.split("/").find(Boolean);
		if (firstSegment && pathHasLocale(`/${firstSegment}`, locales)) {
			const localized = `/${firstSegment}/${status}`;
			if (routes.some((route) => route.route === localized)) return `${localized}${suffix}`;
		}
	}
	return `/${status}${suffix}`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/actions/handler.js
var ActionHandler = class {
	/**
	* Run action handling for the current request. Expects the APIContext
	* that is already being used by the render pipeline.
	*
	* Returns a `Response` when the action fully handles the request (RPC),
	* or `undefined` when the caller should continue processing the
	* request (form actions or non-action requests).
	*/
	handle(apiContext, state) {
		state.pipeline.usedFeatures |= PipelineFeatures.actions;
		if (apiContext.isPrerendered) return;
		const { action, setActionResult } = getActionContext(apiContext);
		if (!action) return;
		if (state.pipeline.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
		return this.#executeAction(action, setActionResult);
	}
	async #executeAction(action, setActionResult) {
		const serialized = serializeActionResult(await action.handler());
		if (action.calledFrom === "rpc") {
			if (serialized.type === "empty") return new Response(null, { status: serialized.status });
			return new Response(serialized.body, {
				status: serialized.status,
				headers: { "Content-Type": serialized.contentType }
			});
		}
		setActionResult(action.name, serialized);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol, true);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/routing/trailing-slash-handler.js
var TrailingSlashHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	/**
	* Returns a redirect `Response` if the request pathname needs
	* normalization, or `undefined` if no redirect is required.
	*/
	handle(state) {
		const url = new URL(state.request.url);
		const redirect = this.#redirectTrailingSlash(url.pathname);
		if (redirect === url.pathname) return;
		const addCookieHeader = state.renderOptions.addCookieHeader;
		const status = state.request.method === "GET" ? 301 : 308;
		const response = new Response(redirectTemplate({
			status,
			relativeLocation: url.pathname,
			absoluteLocation: redirect,
			from: state.request.url
		}), {
			status,
			headers: { location: redirect + url.search }
		});
		prepareResponse(response, { addCookieHeader });
		return response;
	}
	#redirectTrailingSlash(pathname) {
		const { trailingSlash } = this.#app.manifest;
		if (pathname === "/" || isInternalPath(pathname)) return pathname;
		const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
		if (path !== pathname) return path;
		if (trailingSlash === "ignore") return pathname;
		if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
		if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
		return pathname;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const pipeline = state.pipeline;
	if (!pipeline.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(pipeline.logger) });
		return;
	}
	if (pipeline.runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, pipeline);
}
async function provideCacheAsync(state, pipeline) {
	const cacheProvider = await pipeline.getCacheProvider();
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (pipeline.cacheConfig?.routes) {
			if (!pipeline.compiledCacheRoutes) pipeline.compiledCacheRoutes = compileCacheRoutes(pipeline.cacheConfig.routes, pipeline.manifest.base, pipeline.manifest.trailingSlash);
			const matched = matchCacheRoute(state.pathname, pipeline.compiledCacheRoutes);
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
var CacheHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	async handle(state, next) {
		this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
		if (!this.#app.pipeline.cacheProvider) return next();
		const cache = state.resolve(CACHE_KEY);
		const cacheProvider = await this.#app.pipeline.getCacheProvider();
		if (cacheProvider?.onRequest) {
			const response2 = await cacheProvider.onRequest({
				request: state.request,
				url: new URL(state.request.url),
				waitUntil: state.renderOptions.waitUntil
			}, async () => {
				const res = await next();
				applyCacheHeaders(cache, res, state.request);
				return res;
			});
			response2.headers.delete("CDN-Cache-Control");
			response2.headers.delete("Cache-Tag");
			return response2;
		}
		const response = await next();
		applyCacheHeaders(cache, response, state.request);
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") if (redirectIsExternal(redirect)) return redirect;
	else {
		let target = redirect;
		for (const param of Object.keys(params)) {
			const paramValue = params[param];
			target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
		}
		return target;
	}
	else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.redirects;
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.pipeline.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) if (typeof redirect === "string") return Response.redirect(redirect, status);
	else return Response.redirect(redirect.destination, status);
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/session/provider-disabled.js
function provideSession(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.sessions;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/routing/handler.js
var AstroHandler = class {
	#app;
	#trailingSlashHandler;
	#actionHandler;
	#astroMiddleware;
	#pagesHandler;
	#cacheHandler;
	/** Bound callback for the middleware chain — created once, reused per request. */
	#renderRouteCallback;
	/**
	* i18n post-processor. Only set when the app has i18n configured and
	* the strategy is not `manual` — for the manual strategy users wire
	* `astro:i18n.middleware(...)` into their own `onRequest`.
	*/
	#i18n;
	/** Whether sessions are configured on the manifest. */
	#hasSession;
	constructor(app) {
		this.#app = app;
		this.#trailingSlashHandler = new TrailingSlashHandler(app);
		this.#actionHandler = new ActionHandler();
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
		this.#cacheHandler = new CacheHandler(app);
		this.#renderRouteCallback = this.#actionsAndPages.bind(this);
		this.#hasSession = !!app.manifest.sessionConfig;
		const i18n = app.manifest.i18n;
		if (i18n && i18n.strategy !== "manual") this.#i18n = new I18n(i18n, app.manifest.base, app.manifest.trailingSlash, app.manifest.buildFormat);
	}
	/**
	* Runs actions then pages — the callback at the bottom of the
	* middleware chain. Bound once in the constructor to avoid
	* per-request closure allocation.
	*/
	#actionsAndPages(state, ctx) {
		if (!state.skipMiddleware) {
			const actionResult = this.#actionHandler.handle(ctx, state);
			if (actionResult) return actionResult.then((response) => response ?? this.#pagesHandler.handle(state, ctx));
		}
		return this.#pagesHandler.handle(state, ctx);
	}
	async handle(state) {
		state.pipeline.usedFeatures |= ALL_PIPELINE_FEATURES;
		if (state.invalidEncoding) return new Response(null, {
			status: 400,
			statusText: "Bad Request"
		});
		const trailingSlashRedirect = this.#trailingSlashHandler.handle(state);
		if (trailingSlashRedirect) return trailingSlashRedirect;
		if (!state.routeData) return this.#app.renderError(state.request, {
			...state.renderOptions,
			status: 404,
			pathname: state.pathname
		});
		return this.render(state);
	}
	/**
	* Renders a response for the given `FetchState`. Assumes
	* trailing-slash redirects and routeData resolution have already run.
	*
	* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
	* `Rewrites.execute` on the current `FetchState` — they mutate the
	* existing state in place and re-run middleware + page dispatch.
	*/
	async render(state) {
		const routeData = state.routeData;
		const pathname = state.pathname;
		const request = state.request;
		const { addCookieHeader } = state.renderOptions;
		state.status = this.#app.getDefaultStatusCode(routeData, pathname);
		let response;
		let finalizeError;
		try {
			const sessionP = this.#hasSession ? provideSession(state) : void 0;
			const cacheP = provideCache(state);
			if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
			state.pipeline.usedFeatures |= PipelineFeatures.sessions;
			if (routeData.type === "redirect") {
				const redirectResponse = await renderRedirect(state);
				this.#app.logThisRequest({
					pathname,
					method: request.method,
					statusCode: redirectResponse.status,
					isRewrite: false,
					timeStart: state.timeStart
				});
				prepareResponse(redirectResponse, { addCookieHeader });
				this.#app.pipeline.logger.flush();
				return redirectResponse;
			}
			if (!this.#app.pipeline.cacheProvider) {
				this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
				response = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
				if (this.#i18n) response = await this.#i18n.finalize(state, response);
			} else {
				const runPipeline = async () => {
					let res = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
					if (this.#i18n) res = await this.#i18n.finalize(state, res);
					return res;
				};
				response = await this.#cacheHandler.handle(state, runPipeline);
			}
			this.#app.logThisRequest({
				pathname,
				method: request.method,
				statusCode: response.status,
				isRewrite: state.isRewriting,
				timeStart: state.timeStart
			});
		} catch (err) {
			this.#app.logger.error(null, err.stack || err.message || String(err));
			return this.#app.renderError(request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		} finally {
			try {
				const finalize = state.finalizeAll();
				if (finalize) await finalize;
			} catch (err) {
				finalizeError = err;
				this.#app.logger.error(null, err.stack || err.message || String(err));
			}
		}
		if (finalizeError) return this.#app.renderError(request, {
			...state.renderOptions,
			status: 500,
			error: finalizeError,
			pathname: state.pathname
		});
		if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return this.#app.renderError(request, {
			...state.renderOptions,
			response,
			status: response.status,
			error: response.status === 500 ? null : void 0,
			pathname: state.pathname
		});
		prepareResponse(response, { addCookieHeader });
		this.#app.pipeline.logger.flush();
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#app;
	#handler;
	constructor(app) {
		this.#app = app ?? null;
		this.#handler = app ? new AstroHandler(app) : null;
	}
	/**
	* Fast path: called directly by `BaseApp.render()` with pre-resolved
	* options, avoiding the `Reflect.set/get` round-trip through the request.
	*/
	renderWithOptions(request, options) {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request, options);
		return this.#handler.handle(state);
	}
	fetch = (request) => {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request);
		if (!this.#handler) throw new Error("No fetch handler provided.");
		return this.#handler.handle(state);
	};
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/errors/handler.js
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/errors/default-handler.js
var DefaultErrorHandler = class {
	#app;
	#astroMiddleware;
	#pagesHandler;
	constructor(app) {
		this.#app = app;
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
	}
	async renderError(request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
		const app = this.#app;
		const resolvedPathname = pathname ?? new FetchState(app.pipeline, request).pathname;
		const errorRouteData = matchRoute(getErrorRoutePath(resolvedPathname, status, app.manifestData.routes, app.manifest.i18n?.locales, app.manifest.trailingSlash === "always"), app.manifestData);
		const url = new URL(request.url);
		if (errorRouteData) {
			if (errorRouteData.prerender) {
				const allowedDomains = app.manifest.allowedDomains;
				const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
				const statusURL = new URL(`${app.baseWithoutTrailingSlash}${getOutputFilename(app.manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
				if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
					const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
						status,
						removeContentEncodingHeaders: true
					});
					prepareResponse(newResponse, resolvedRenderOptions);
					return newResponse;
				} catch {
					const response2 = mergeResponses(new Response(null, { status }), originalResponse);
					prepareResponse(response2, resolvedRenderOptions);
					return response2;
				}
			}
			const mod = await app.pipeline.getComponentByRoute(errorRouteData);
			const errorState = new FetchState(app.pipeline, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.routeData = errorRouteData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = mod;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			try {
				await provideSession(errorState);
				const response2 = await this.#astroMiddleware.handle(errorState, this.#pagesHandler.handle.bind(this.#pagesHandler));
				if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response2)) return this.renderError(request, {
					...resolvedRenderOptions,
					status,
					error,
					response: originalResponse,
					skipMiddleware: true,
					pathname: resolvedPathname
				});
				const newResponse = mergeResponses(response2, originalResponse);
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				if (skipMiddleware === false) return this.renderError(request, {
					...resolvedRenderOptions,
					status,
					error,
					response: originalResponse,
					skipMiddleware: true,
					pathname: resolvedPathname
				});
			} finally {
				await errorState.finalizeAll();
			}
		}
		const response = mergeResponses(new Response(null, { status }), originalResponse);
		prepareResponse(response, resolvedRenderOptions);
		return response;
	}
};
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	manifestData;
	pipeline;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return this.pipeline.logger;
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true, ...args) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.pipeline = this.createPipeline(streaming, manifest, ...args);
		this.manifestData = this.pipeline.manifestData;
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler strategy used by this app. Override to
	* provide environment-specific behavior (dev overlay, build-time throws, etc.).
	*/
	createErrorHandler() {
		return new DefaultErrorHandler(this);
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		this.manifestData = newManifestData;
		this.pipeline.manifestData = newManifestData;
		this.pipeline.rebuildRouter();
	}
	removeBase(pathname) {
		pathname = collapseDuplicateLeadingSlashes(pathname);
		if (pathname.startsWith(this.manifest.base)) return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
		return pathname;
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		const url = new URL(request.url);
		if (this.manifest.assets.has(url.pathname)) return void 0;
		let pathname = this.computePathnameFromDomain(request);
		if (!pathname) pathname = prependForwardSlash(this.removeBase(url.pathname));
		const routeData = this.pipeline.matchRoute(this.safeDecodeURI(pathname));
		if (!routeData) return void 0;
		if (allowPrerenderedRoutes) return routeData;
		if (routeData.prerender) {
			if (routeData.params.length > 0) return this.pipeline.matchAllRoutes(this.safeDecodeURI(pathname)).find((r) => !r.prerender);
			return;
		}
		return routeData;
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await this.pipeline.getLogger();
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = this.pipeline.matchRoute(this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) {
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.renderWithOptions(request, resolvedOptions);
		} else {
			setRenderOptions(request, resolvedOptions);
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = this.pipeline.usedFeatures;
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & PipelineFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & PipelineFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & PipelineFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & PipelineFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & PipelineFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & PipelineFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless you add it to your fetch.ts pipeline.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		if (!routeData.pattern.test(pathname)) {
			for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(pathname)) return 302;
		}
		const route = removeTrailingForwardSlash(routeData.route);
		const locales = this.manifest.i18n?.locales;
		if (isRoute404(route) || isLocalizedErrorRoute(route, 404, locales)) return 404;
		if (isRoute500(route) || isLocalizedErrorRoute(route, 500, locales)) return 500;
		return 200;
	}
	getManifest() {
		return this.pipeline.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region node_modules/.pnpm/@astrojs+svelte@9.0.1_@types+node@25.9.1_astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+c_hpucdy4julww4j4odcz3l4iwwe/node_modules/@astrojs/svelte/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "s";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
//#endregion
//#region node_modules/.pnpm/@astrojs+svelte@9.0.1_@types+node@25.9.1_astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+c_hpucdy4julww4j4odcz3l4iwwe/node_modules/@astrojs/svelte/dist/server.js
function check$1(Component) {
	if (typeof Component !== "function") return false;
	const componentString = Component.toString();
	return componentString.includes("$$payload") || componentString.includes("$$renderer");
}
function needsHydration(metadata) {
	return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup$1(Component, props, slotted, metadata) {
	const tagName = needsHydration(metadata) ? "astro-slot" : "astro-static-slot";
	let children = void 0;
	let $$slots = void 0;
	let idPrefix;
	if (this && this.result) idPrefix = incrementId(this.result);
	const renderProps = {};
	for (const [key, value] of Object.entries(slotted)) {
		$$slots ??= {};
		if (key === "default") {
			$$slots.default = true;
			children = createRawSnippet(() => ({ render: () => `<${tagName}>${value}</${tagName}>` }));
		} else $$slots[key] = createRawSnippet(() => ({ render: () => `<${tagName} name="${key}">${value}</${tagName}>` }));
		const slotName = key === "default" ? "children" : key;
		renderProps[slotName] = createRawSnippet(() => ({ render: () => `<${tagName}${key !== "default" ? ` name="${key}"` : ""}>${value}</${tagName}>` }));
	}
	let html = (await render(Component, {
		props: {
			...props,
			children,
			$$slots,
			...renderProps
		},
		idPrefix
	})).body;
	html = html.replace(/\s+class=""/g, "");
	return { html };
}
var server_default$1 = {
	name: "@astrojs/svelte",
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
	supportsAstroStaticSlot: true
};
//#endregion
//#region node_modules/.pnpm/@astrojs+mdx@7.0.5_@astrojs+markdown-satteri@0.3.5_astro@7.2.0_@astrojs+markdown-remark@7.2.2_mumvnqymebehgpf5ewtrm7mxvq/node_modules/@astrojs/mdx/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
	if (typeof Component !== "function") return false;
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	try {
		return (await Component({
			...props,
			...slots,
			children
		}))[AstroJSX];
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
	}
	return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	const { result } = this;
	try {
		let html = "";
		const destination = { write(chunk) {
			if (chunk instanceof Response) return;
			html += chunkToString(result, chunk);
		} };
		await renderStreaming(createVNode(Component, {
			...props,
			...slots,
			children
		}), result, destination);
		return { html };
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
		throw e;
	}
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
	if (Component[/* @__PURE__ */ Symbol.for("mdx-component")]) {
		if (AstroUserError.is(error)) return;
		error.title = error.name;
		error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
		throw error;
	}
}
var server_default = {
	name: "astro:jsx",
	check,
	renderToStaticMarkup
};
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/svelte",
	"clientEntrypoint": "@astrojs/svelte/client.js",
	"serverEntrypoint": "@astrojs/svelte/server.js"
}, { ssr: server_default$1 }), Object.assign({
	"name": "astro:jsx",
	"serverEntrypoint": "file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@astrojs+mdx@7.0.5_@astrojs+markdown-satteri@0.3.5_astro@7.2.0_@astrojs+markdown-remark@7.2.2_mumvnqymebehgpf5ewtrm7mxvq/node_modules/@astrojs/mdx/dist/server.js"
}, { ssr: server_default })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404\\/$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about\\/$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about.astro",
			"pathname": "/about",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/anime",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/anime\\/$",
			"segments": [[{
				"content": "anime",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/anime.astro",
			"pathname": "/anime",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/allPostMeta.json",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/allPostMeta\\.json$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "allPostMeta.json",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/allPostMeta.json.ts",
			"pathname": "/api/allPostMeta.json",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/dynamic.json",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/dynamic\\.json$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "dynamic.json",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/dynamic.json.ts",
			"pathname": "/api/dynamic.json",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/archive",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/archive\\/$",
			"segments": [[{
				"content": "archive",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/archive.astro",
			"pathname": "/archive",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/bangumi",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/bangumi\\/$",
			"segments": [[{
				"content": "bangumi",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/bangumi.astro",
			"pathname": "/bangumi",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/booknav",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/booknav\\/$",
			"segments": [[{
				"content": "booknav",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/booknav.astro",
			"pathname": "/booknav",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/categories",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/categories\\/$",
			"segments": [[{
				"content": "categories",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/categories/index.astro",
			"pathname": "/categories",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/dynamic/comments",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/dynamic\\/comments\\/$",
			"segments": [[{
				"content": "dynamic",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "comments",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/dynamic/comments.astro",
			"pathname": "/dynamic/comments",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/dynamic",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/dynamic\\/$",
			"segments": [[{
				"content": "dynamic",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/dynamic/index.astro",
			"pathname": "/dynamic",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/friends",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/friends\\/$",
			"segments": [[{
				"content": "friends",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/friends.astro",
			"pathname": "/friends",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/gallery/[album]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/gallery\\/([^/]+?)\\/$",
			"segments": [[{
				"content": "gallery",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "album",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["album"],
			"component": "src/pages/gallery/[album].astro",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/gallery",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/gallery\\/$",
			"segments": [[{
				"content": "gallery",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/gallery/index.astro",
			"pathname": "/gallery",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/guestbook",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/guestbook\\/$",
			"segments": [[{
				"content": "guestbook",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/guestbook.astro",
			"pathname": "/guestbook",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/og/[...slug]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/og(?:\\/(.*?))?\\/$",
			"segments": [[{
				"content": "og",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...slug",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...slug"],
			"component": "src/pages/og/[...slug].ts",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/posts/[...slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/posts(?:\\/(.*?))?\\/$",
			"segments": [[{
				"content": "posts",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...slug",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...slug"],
			"component": "src/pages/posts/[...slug].astro",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/robots.txt",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/robots.txt.ts",
			"pathname": "/robots.txt",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/rss",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/rss\\/$",
			"segments": [[{
				"content": "rss",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/rss.astro",
			"pathname": "/rss",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/rss.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/rss\\.xml$",
			"segments": [[{
				"content": "rss.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/rss.xml.ts",
			"pathname": "/rss.xml",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/search",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/search\\/$",
			"segments": [[{
				"content": "search",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/search.astro",
			"pathname": "/search",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/sponsor",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/sponsor\\/$",
			"segments": [[{
				"content": "sponsor",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/sponsor.astro",
			"pathname": "/sponsor",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/tags",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/tags\\/$",
			"segments": [[{
				"content": "tags",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/tags/index.astro",
			"pathname": "/tags",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/vndb",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/vndb\\/$",
			"segments": [[{
				"content": "vndb",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/vndb.astro",
			"pathname": "/vndb",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/[...page]",
			"isIndex": false,
			"type": "page",
			"pattern": "^(?:\\/(.*?))?\\/$",
			"segments": [[{
				"content": "...page",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...page"],
			"component": "src/pages/[...page].astro",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "always" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/404_DbyTRQpl.mjs");
var _page1 = () => import("./chunks/about_B6yliAea.mjs");
var _page2 = () => import("./chunks/anime_DD10fZJG.mjs");
var _page3 = () => import("./chunks/allPostMeta_xeIqNPwO.mjs");
var _page4 = () => import("./chunks/dynamic_DFeaOYJq.mjs");
var _page5 = () => import("./chunks/archive_6J9UVhVs.mjs");
var _page6 = () => import("./chunks/bangumi_BPxGh5Ow.mjs");
var _page7 = () => import("./chunks/booknav_j2AOAypD.mjs");
var _page8 = () => import("./chunks/index_7w3PQqtY.mjs");
var _page9 = () => import("./chunks/comments_Cpyi7EvK.mjs");
var _page10 = () => import("./chunks/index_OXUJnou1.mjs");
var _page11 = () => import("./chunks/friends_V7YYwfIf.mjs");
var _page12 = () => import("./chunks/_album__CXTel4bg.mjs");
var _page13 = () => import("./chunks/index_CF30dHGe.mjs");
var _page14 = () => import("./chunks/guestbook_BP92MX6T.mjs");
var _page15 = () => import("./chunks/_.._DGrXqlZO.mjs");
var _page16 = () => import("./chunks/_.._gO3-iHyS.mjs");
var _page17 = () => import("./chunks/robots_BYqiauoi.mjs");
var _page18 = () => import("./chunks/rss_Dz2fdiij.mjs");
var _page19 = () => import("./chunks/rss_DvaO3MAL.mjs");
var _page20 = () => import("./chunks/search_DuSzB-CN.mjs");
var _page21 = () => import("./chunks/sponsor_CylPQ5Jp.mjs");
var _page22 = () => import("./chunks/index_DLyvTXYQ.mjs");
var _page23 = () => import("./chunks/vndb_DlndwhR_.mjs");
var _page24 = () => import("./chunks/_.._BH7JSfmt.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["src/pages/404.astro", _page0],
	["src/pages/about.astro", _page1],
	["src/pages/anime.astro", _page2],
	["src/pages/api/allPostMeta.json.ts", _page3],
	["src/pages/api/dynamic.json.ts", _page4],
	["src/pages/archive.astro", _page5],
	["src/pages/bangumi.astro", _page6],
	["src/pages/booknav.astro", _page7],
	["src/pages/categories/index.astro", _page8],
	["src/pages/dynamic/comments.astro", _page9],
	["src/pages/dynamic/index.astro", _page10],
	["src/pages/friends.astro", _page11],
	["src/pages/gallery/[album].astro", _page12],
	["src/pages/gallery/index.astro", _page13],
	["src/pages/guestbook.astro", _page14],
	["src/pages/og/[...slug].ts", _page15],
	["src/pages/posts/[...slug].astro", _page16],
	["src/pages/robots.txt.ts", _page17],
	["src/pages/rss.astro", _page18],
	["src/pages/rss.xml.ts", _page19],
	["src/pages/search.astro", _page20],
	["src/pages/sponsor.astro", _page21],
	["src/pages/tags/index.astro", _page22],
	["src/pages/vndb.astro", _page23],
	["src/pages/[...page].astro", _page24]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/","cacheDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.astro/","outDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/","srcDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/","publicDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/public/","buildClientDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/client/","buildServerDir":"file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/server/","adapterName":"","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".card-base[data-astro-cid-ibpinaeu]{animation:.6s ease-out fadeInUp}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}a[data-astro-cid-ibpinaeu]:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(var(--primary-rgb),.3)}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".responsive-pagination.svelte-ewpvbp{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.mobile-pagination.svelte-ewpvbp{display:flex;padding:0 1rem}.desktop-pagination.svelte-ewpvbp{display:none}@media(min-width:1024px){.mobile-pagination.svelte-ewpvbp{display:none}.desktop-pagination.svelte-ewpvbp{display:flex}}@media(max-width:640px){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}@media(max-width:480px){.mobile-pagination.svelte-ewpvbp{padding:0 .25rem}}.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:all .2s ease-in-out}@media(prefers-contrast:high){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){border:1px solid currentColor}}@media(prefers-reduced-motion:reduce){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:none}}@media(hover:none)and (pointer:coarse){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:44px;min-width:44px}.mobile-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:40px;min-width:40px}}@media(max-width:1024px)and (orientation:landscape){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}\n.line-clamp-1.svelte-16rsyhy{display:-webkit-box;line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}.line-clamp-3.svelte-16rsyhy{display:-webkit-box;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}@keyframes svelte-1thnd9y-animate-in{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.animate-in.svelte-1thnd9y{animation:svelte-1thnd9y-animate-in .2s ease-out}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/anime","isIndex":false,"type":"page","pattern":"^\\/anime\\/$","segments":[[{"content":"anime","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/anime.astro","pathname":"/anime","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[],"routeData":{"route":"/api/allPostMeta.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/allPostMeta\\.json$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"allPostMeta.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/allPostMeta.json.ts","pathname":"/api/allPostMeta.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[],"routeData":{"route":"/api/dynamic.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/dynamic\\.json$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"dynamic.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/dynamic.json.ts","pathname":"/api/dynamic.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":"archive-panel[data-astro-cid-soajkds3]{display:block}.archive-arrow[data-astro-cid-soajkds3]{display:inline-flex}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/archive","isIndex":false,"type":"page","pattern":"^\\/archive\\/$","segments":[[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archive.astro","pathname":"/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".line-clamp-2.svelte-tojcup{display:-webkit-box;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.line-clamp-1.svelte-tojcup{display:-webkit-box;line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}.line-clamp-2[data-astro-cid-avaugctc]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.responsive-pagination.svelte-ewpvbp{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.mobile-pagination.svelte-ewpvbp{display:flex;padding:0 1rem}.desktop-pagination.svelte-ewpvbp{display:none}@media(min-width:1024px){.mobile-pagination.svelte-ewpvbp{display:none}.desktop-pagination.svelte-ewpvbp{display:flex}}@media(max-width:640px){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}@media(max-width:480px){.mobile-pagination.svelte-ewpvbp{padding:0 .25rem}}.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:all .2s ease-in-out}@media(prefers-contrast:high){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){border:1px solid currentColor}}@media(prefers-reduced-motion:reduce){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:none}}@media(hover:none)and (pointer:coarse){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:44px;min-width:44px}.mobile-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:40px;min-width:40px}}@media(max-width:1024px)and (orientation:landscape){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/bangumi","isIndex":false,"type":"page","pattern":"^\\/bangumi\\/$","segments":[[{"content":"bangumi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bangumi.astro","pathname":"/bangumi","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":"booknav-list{display:block}.booknav-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:.75rem}.booknav-group{scroll-margin-top:5.5rem}.booknav-letter{font-size:1rem;font-weight:700;line-height:1;color:var(--primary);background:color-mix(in srgb,var(--primary) 12%,transparent);width:100%;height:100%;display:flex;align-items:center;justify-content:center}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/booknav","isIndex":false,"type":"page","pattern":"^\\/booknav\\/$","segments":[[{"content":"booknav","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/booknav.astro","pathname":"/booknav","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/categories","isIndex":true,"type":"page","pattern":"^\\/categories\\/$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories/index.astro","pathname":"/categories","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":"html:has(.dynamic-comment-embed),body:has(.dynamic-comment-embed){overflow:hidden;background:transparent!important}.dynamic-comment-embed #post-comments{margin:0;border:0;box-shadow:none}\n"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/dynamic/comments","isIndex":false,"type":"page","pattern":"^\\/dynamic\\/comments\\/$","segments":[[{"content":"dynamic","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dynamic/comments.astro","pathname":"/dynamic/comments","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".responsive-pagination.svelte-ewpvbp{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.mobile-pagination.svelte-ewpvbp{display:flex;padding:0 1rem}.desktop-pagination.svelte-ewpvbp{display:none}@media(min-width:1024px){.mobile-pagination.svelte-ewpvbp{display:none}.desktop-pagination.svelte-ewpvbp{display:flex}}@media(max-width:640px){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}@media(max-width:480px){.mobile-pagination.svelte-ewpvbp{padding:0 .25rem}}.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:all .2s ease-in-out}@media(prefers-contrast:high){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){border:1px solid currentColor}}@media(prefers-reduced-motion:reduce){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:none}}@media(hover:none)and (pointer:coarse){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:44px;min-width:44px}.mobile-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:40px;min-width:40px}}@media(max-width:1024px)and (orientation:landscape){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}\n"},{"type":"external","src":"_astro/index.DB7o9y_O.css"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/dynamic","isIndex":true,"type":"page","pattern":"^\\/dynamic\\/$","segments":[[{"content":"dynamic","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dynamic/index.astro","pathname":"/dynamic","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".friends-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.75rem}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/friends","isIndex":false,"type":"page","pattern":"^\\/friends\\/$","segments":[[{"content":"friends","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/friends.astro","pathname":"/friends","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/gallery/[album]","isIndex":false,"type":"page","pattern":"^\\/gallery\\/([^/]+?)\\/$","segments":[[{"content":"gallery","dynamic":false,"spread":false}],[{"content":"album","dynamic":true,"spread":false}]],"params":["album"],"component":"src/pages/gallery/[album].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/gallery","isIndex":true,"type":"page","pattern":"^\\/gallery\\/$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery/index.astro","pathname":"/gallery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/guestbook","isIndex":false,"type":"page","pattern":"^\\/guestbook\\/$","segments":[[{"content":"guestbook","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guestbook.astro","pathname":"/guestbook","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[],"routeData":{"route":"/og/[...slug]","isIndex":false,"type":"endpoint","pattern":"^\\/og(?:\\/(.*?))?\\/$","segments":[[{"content":"og","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/og/[...slug].ts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/_..By8RXJSL.css"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"inline","content":".cover-image-container[data-astro-cid-q3lybnyu]{min-height:150px}@media(width>=768px){.cover-image-container[data-astro-cid-q3lybnyu]{min-height:0}}.loading-spinner[data-astro-cid-q3lybnyu]{transition:opacity .3s ease-out}.cover-image-container[data-astro-cid-q3lybnyu][data-loading=false] .loading-spinner[data-astro-cid-q3lybnyu]{opacity:0;pointer-events:none}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] .loading-spinner[data-astro-cid-q3lybnyu]{display:none}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] .error-message[data-astro-cid-q3lybnyu]{display:flex}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] img[data-astro-cid-q3lybnyu][data-remote=true]{display:none}.spinner[data-astro-cid-q3lybnyu]{width:40px;height:40px;border:3px solid oklch(.9 .05 var(--hue));border-top-color:oklch(.6 .15 var(--hue));border-radius:50%;animation:.8s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.cover-image-container[data-astro-cid-q3lybnyu] img[data-astro-cid-q3lybnyu]{width:100%;height:100%;object-fit:cover}.post-meta-cover[data-astro-cid-g5no53fi] .text-50[data-astro-cid-g5no53fi],.post-meta-cover[data-astro-cid-g5no53fi] .meta-divider[data-astro-cid-g5no53fi]{color:#ffffffe6!important}.post-meta-cover[data-astro-cid-g5no53fi] .meta-icon[data-astro-cid-g5no53fi]{width:1.125rem;height:1.125rem;margin-right:.375rem;background:none;color:#ffffffe6}.post-meta-cover[data-astro-cid-g5no53fi] .text-sm[data-astro-cid-g5no53fi]{font-size:.75rem;line-height:1rem}.post-meta-cover[data-astro-cid-g5no53fi] .text-xl[data-astro-cid-g5no53fi]{font-size:1rem}.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi]{min-width:0}.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi] .flex-nowrap[data-astro-cid-g5no53fi]{flex-wrap:wrap!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:hover{color:#fff!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:hover:before{background-color:#ffffff2e!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:active:before{background-color:#ffffff42!important}@media(width<=767px){.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi]{width:100%}}\n"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/posts/[...slug]","isIndex":false,"type":"page","pattern":"^\\/posts(?:\\/(.*?))?\\/$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/posts/[...slug].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/rss","isIndex":false,"type":"page","pattern":"^\\/rss\\/$","segments":[[{"content":"rss","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.astro","pathname":"/rss","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":"mark{background:transparent;color:var(--primary);font-weight:600;padding:0 .1em}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":"body.wallpaper-transparent .usage-info-box{background-color:rgba(var(--primary-rgb, 70, 130, 180),.15)!important}:root.dark body.wallpaper-transparent .usage-info-box{background-color:oklch(from var(--primary) l c h / .15)!important}.sponsor-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/sponsor","isIndex":false,"type":"page","pattern":"^\\/sponsor\\/$","segments":[[{"content":"sponsor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sponsor.astro","pathname":"/sponsor","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"inline","content":".responsive-pagination.svelte-ewpvbp{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.mobile-pagination.svelte-ewpvbp{display:flex;padding:0 1rem}.desktop-pagination.svelte-ewpvbp{display:none}@media(min-width:1024px){.mobile-pagination.svelte-ewpvbp{display:none}.desktop-pagination.svelte-ewpvbp{display:flex}}@media(max-width:640px){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}@media(max-width:480px){.mobile-pagination.svelte-ewpvbp{padding:0 .25rem}}.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:all .2s ease-in-out}@media(prefers-contrast:high){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){border:1px solid currentColor}}@media(prefers-reduced-motion:reduce){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){transition:none}}@media(hover:none)and (pointer:coarse){.responsive-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:44px;min-width:44px}.mobile-pagination.svelte-ewpvbp button:where(.svelte-ewpvbp){min-height:40px;min-width:40px}}@media(max-width:1024px)and (orientation:landscape){.mobile-pagination.svelte-ewpvbp{padding:0 .5rem}}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/vndb","isIndex":false,"type":"page","pattern":"^\\/vndb\\/$","segments":[[{"content":"vndb","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vndb.astro","pathname":"/vndb","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0U7MNaK.js"}],"styles":[{"type":"external","src":"_astro/_..BulBwWNp.css"},{"type":"inline","content":".cover-image-container[data-astro-cid-q3lybnyu]{min-height:150px}@media(width>=768px){.cover-image-container[data-astro-cid-q3lybnyu]{min-height:0}}.loading-spinner[data-astro-cid-q3lybnyu]{transition:opacity .3s ease-out}.cover-image-container[data-astro-cid-q3lybnyu][data-loading=false] .loading-spinner[data-astro-cid-q3lybnyu]{opacity:0;pointer-events:none}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] .loading-spinner[data-astro-cid-q3lybnyu]{display:none}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] .error-message[data-astro-cid-q3lybnyu]{display:flex}.cover-image-container[data-astro-cid-q3lybnyu][data-error=true] img[data-astro-cid-q3lybnyu][data-remote=true]{display:none}.spinner[data-astro-cid-q3lybnyu]{width:40px;height:40px;border:3px solid oklch(.9 .05 var(--hue));border-top-color:oklch(.6 .15 var(--hue));border-radius:50%;animation:.8s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.cover-image-container[data-astro-cid-q3lybnyu] img[data-astro-cid-q3lybnyu]{width:100%;height:100%;object-fit:cover}.post-meta-cover[data-astro-cid-g5no53fi] .text-50[data-astro-cid-g5no53fi],.post-meta-cover[data-astro-cid-g5no53fi] .meta-divider[data-astro-cid-g5no53fi]{color:#ffffffe6!important}.post-meta-cover[data-astro-cid-g5no53fi] .meta-icon[data-astro-cid-g5no53fi]{width:1.125rem;height:1.125rem;margin-right:.375rem;background:none;color:#ffffffe6}.post-meta-cover[data-astro-cid-g5no53fi] .text-sm[data-astro-cid-g5no53fi]{font-size:.75rem;line-height:1rem}.post-meta-cover[data-astro-cid-g5no53fi] .text-xl[data-astro-cid-g5no53fi]{font-size:1rem}.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi]{min-width:0}.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi] .flex-nowrap[data-astro-cid-g5no53fi]{flex-wrap:wrap!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:hover{color:#fff!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:hover:before{background-color:#ffffff2e!important}.post-meta-cover[data-astro-cid-g5no53fi] a[data-astro-cid-g5no53fi]:active:before{background-color:#ffffff42!important}@media(width<=767px){.post-meta-cover[data-astro-cid-g5no53fi] .post-meta-tags[data-astro-cid-g5no53fi]{width:100%}}\n"},{"type":"external","src":"_astro/MainGridLayout.Cu8tSN4M.css"},{"type":"external","src":"_astro/Layout.B0-3IVbW.css"}],"routeData":{"route":"/[...page]","isIndex":false,"type":"page","pattern":"^(?:\\/(.*?))?\\/$","segments":[[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}}],"serverLike":false,"middlewareMode":"classic","site":"https://zhedaotixuanbo.pages.dev","base":"/","trailingSlash":"always","compressHTML":"jsx","componentMetadata":[["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/[...page].astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/anime.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/archive.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/bangumi.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/booknav.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/categories/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/friends.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/gallery/[album].astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/gallery/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/guestbook.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/search.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/sponsor.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/vndb.astro",{"propagation":"in-tree","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro",{"propagation":"none","containsHead":true}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/spec/friends.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:\\zhedaotixuanbowebsite\\zhedaotixuanbo-website\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/PostCard.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/PostPage.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:pages",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:manifest",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/entrypoints/prerender.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/api/dynamic.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/api/dynamic.json@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/friends@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/guestbook@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/og/[...slug].ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/og/[...slug]@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/utils/content-utils.ts",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/ArchivePanel.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/CategoryBar.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/MainGridLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/anime@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/bangumi@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/booknav@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/categories/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/dynamic/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/gallery/[album]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/gallery/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/rss@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/search@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/sponsor@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/vndb@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Categories.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/SideBar.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteStats.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Tags.astro",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/api/allPostMeta.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/api/allPostMeta.json@_@ts",{"propagation":"in-tree","containsHead":false}],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/mdx-example.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.Cxqa0VkW.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/1.avif":"chunks/1_DKFGmNk8.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_DbyTRQpl.mjs","\u0000virtual:astro:page:src/pages/[...page]@_@astro":"chunks/_.._BH7JSfmt.mjs","\u0000virtual:astro:page:src/pages/og/[...slug]@_@ts":"chunks/_.._DGrXqlZO.mjs","\u0000virtual:astro:page:src/pages/posts/[...slug]@_@astro":"chunks/_.._gO3-iHyS.mjs","\u0000virtual:astro:page:src/pages/gallery/[album]@_@astro":"chunks/_album__CXTel4bg.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CnIwnSh7.mjs","\u0000noop-middleware":"chunks/_noop-middleware_CQ50ikAJ.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_BqPXHDmV.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C-PI1Pas.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_B6yliAea.mjs","\u0000virtual:astro:page:src/pages/api/allPostMeta.json@_@ts":"chunks/allPostMeta_xeIqNPwO.mjs","\u0000virtual:astro:page:src/pages/anime@_@astro":"chunks/anime_DD10fZJG.mjs","\u0000virtual:astro:page:src/pages/archive@_@astro":"chunks/archive_6J9UVhVs.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/avatar.avif":"chunks/avatar_z67Z7owS.mjs","\u0000virtual:astro:page:src/pages/bangumi@_@astro":"chunks/bangumi_BPxGh5Ow.mjs","\u0000virtual:astro:page:src/pages/booknav@_@astro":"chunks/booknav_j2AOAypD.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/both-grid.avif":"chunks/both-grid_VUka10Zu.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/both-list.avif":"chunks/both-list_DHgooVXJ.mjs","\u0000virtual:astro:page:src/pages/dynamic/comments@_@astro":"chunks/comments_Cpyi7EvK.mjs","D:\\zhedaotixuanbowebsite\\zhedaotixuanbo-website\\.astro\\content-assets.mjs":"chunks/content-assets_qVZcBlcR.mjs","D:\\zhedaotixuanbowebsite\\zhedaotixuanbo-website\\.astro\\content-modules.mjs":"chunks/content-modules_CGJJDAcc.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/guide/cover.avif":"chunks/cover_CYG2AtbN.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d1.avif":"chunks/d1_CLrVb1tC.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d2.avif":"chunks/d2_B9O6jQgx.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d3.avif":"chunks/d3_BWz8qNsx.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d4.avif":"chunks/d4_BZ8ZHCPh.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d5.avif":"chunks/d5_CCvSr59G.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/DesktopWallpaper/d6.avif":"chunks/d6_2ohiVsAo.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/docusaurus.avif":"chunks/docusaurus_oEWzCLy_.mjs","\u0000virtual:astro:page:src/pages/api/dynamic.json@_@ts":"chunks/dynamic_DFeaOYJq.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-dark.png":"chunks/firefly-dark_CoeXM234.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/logo/firefly-light.png":"chunks/firefly-light_BDHt0oJz.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/firefly1.avif":"chunks/firefly1_P6xkLtPy.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/firefly2.avif":"chunks/firefly2_xVqc9d_e.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/firefly3.avif":"chunks/firefly3_BhkxXiwl.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/spec/friends.mdx":"chunks/friends_Bm58ciTH.mjs","\u0000virtual:astro:page:src/pages/friends@_@astro":"chunks/friends_V7YYwfIf.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/spec/friends.mdx?astroPropagatedAssets":"chunks/friends_axAVotgC.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/github.avif":"chunks/github_D4Pszqb3.mjs","\u0000virtual:astro:page:src/pages/guestbook@_@astro":"chunks/guestbook_BP92MX6T.mjs","\u0000virtual:astro:page:src/pages/categories/index@_@astro":"chunks/index_7w3PQqtY.mjs","\u0000virtual:astro:page:src/pages/gallery/index@_@astro":"chunks/index_CF30dHGe.mjs","\u0000virtual:astro:page:src/pages/tags/index@_@astro":"chunks/index_DLyvTXYQ.mjs","\u0000virtual:astro:page:src/pages/dynamic/index@_@astro":"chunks/index_OXUJnou1.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/left-grid3.avif":"chunks/left-grid3_DWMiuAXz.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/left-list.avif":"chunks/left-list_CKiHI2Mx.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m1.avif":"chunks/m1_BVpiuvq_.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m2.avif":"chunks/m2_DdxKJoKH.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m3.avif":"chunks/m3_DrOKzErV.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m4.avif":"chunks/m4_CLru-71Z.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m5.avif":"chunks/m5_q9NuhM0w.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/assets/images/MobileWallpaper/m6.avif":"chunks/m6_B3cmxAlq.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/masonry.avif":"chunks/masonry_BkJ480Ih.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/mdx-example.mdx?astroPropagatedAssets":"chunks/mdx-example_BksKf_OJ.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/mdx-example.mdx":"chunks/mdx-example_IEt74v-6.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/obsidian.avif":"chunks/obsidian_8BBZhG03.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/right-grid2.avif":"chunks/right-grid2_XluaCAWo.mjs","\u0000virtual:astro:page:src/pages/robots.txt@_@ts":"chunks/robots_BYqiauoi.mjs","\u0000virtual:astro:page:src/pages/rss.xml@_@ts":"chunks/rss_DvaO3MAL.mjs","\u0000virtual:astro:page:src/pages/rss@_@astro":"chunks/rss_Dz2fdiij.mjs","\u0000virtual:astro:page:src/pages/search@_@astro":"chunks/search_DuSzB-CN.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B6_E1_22.mjs","\u0000virtual:astro:page:src/pages/sponsor@_@astro":"chunks/sponsor_CylPQ5Jp.mjs","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/images/vitepress.avif":"chunks/vitepress_Bk5HFlG6.mjs","\u0000virtual:astro:page:src/pages/vndb@_@astro":"chunks/vndb_DlndwhR_.mjs","@components/pages/AdvancedSearch.svelte":"_astro/AdvancedSearch.DmIZcB-A.js","@/components/pages/anime/AnimeGrid.svelte":"_astro/AnimeGrid.x4vLM7bY.js","@/components/pages/bangumi/BangumiGrid.svelte":"_astro/BangumiGrid.wZz-n7ew.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/CategoryBar.astro?astro&type=script&index=0&lang.ts":"_astro/CategoryBar.astro_astro_type_script_index_0_lang.Cgrq2sv1.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/CodeGroupManager.astro?astro&type=script&index=0&lang.ts":"_astro/CodeGroupManager.astro_astro_type_script_index_0_lang.hvy0GRuC.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/CoverImage.astro?astro&type=script&index=0&lang.ts":"_astro/CoverImage.astro_astro_type_script_index_0_lang.PyzdwjG4.js","@/components/controls/DisplaySettingsIntegrated.svelte":"_astro/DisplaySettingsIntegrated.E-sPw0z7.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/DropdownMenu.astro?astro&type=script&index=0&lang.ts":"_astro/DropdownMenu.astro_astro_type_script_index_0_lang.BmHLbx10.js","@/components/pages/dynamic/DynamicFeed.svelte":"_astro/DynamicFeed.BybMp33-.js","@/components/widget/DynamicSidebar.svelte":"_astro/DynamicSidebar.CIQN1n62.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FancyboxManager.astro?astro&type=script&index=0&lang.ts":"_astro/FancyboxManager.astro_astro_type_script_index_0_lang.CNTJf_X7.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/FloatingTOC.astro?astro&type=script&index=0&lang.ts":"_astro/FloatingTOC.astro_astro_type_script_index_0_lang.BLkSGKiJ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FontSetup.astro?astro&type=script&index=0&lang.ts":"_astro/FontSetup.astro_astro_type_script_index_0_lang.C0z3U8_z.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DevaWj5g.js","@/components/controls/LightDarkSwitch.svelte":"_astro/LightDarkSwitch.SKnTbMIk.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/Live2DWidget.astro?astro&type=script&index=0&lang.ts":"_astro/Live2DWidget.astro_astro_type_script_index_0_lang.DSiTJi8J.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/MainGridLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainGridLayout.astro_astro_type_script_index_0_lang.ETSm5nhQ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/NavMenuPanel.astro?astro&type=script&index=0&lang.ts":"_astro/NavMenuPanel.astro_astro_type_script_index_0_lang.wFDUe1vJ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.B3eCNSkc.js","@/components/common/PageJump.svelte":"_astro/PageJump.Bu2Z4FKJ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/PioMessageBox.astro?astro&type=script&index=0&lang.ts":"_astro/PioMessageBox.astro_astro_type_script_index_0_lang.TQmmDYg5.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/PostPage.astro?astro&type=script&index=0&lang.ts":"_astro/PostPage.astro_astro_type_script_index_0_lang.Gz3v0YXF.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/SakuraEffect.astro?astro&type=script&index=0&lang.ts":"_astro/SakuraEffect.astro_astro_type_script_index_0_lang.BH4TNzk4.js","@/components/controls/Search.svelte":"_astro/Search.BEY9qRSl.js","@/components/misc/SharePoster.svelte":"_astro/SharePoster.KJPM-ilQ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SidebarTOC.astro?astro&type=script&index=0&lang.ts":"_astro/SidebarTOC.astro_astro_type_script_index_0_lang.TFhi89Vu.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteInfo.astro?astro&type=script&index=0&lang.ts":"_astro/SiteInfo.astro_astro_type_script_index_0_lang.DE0tp96T.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/TypewriterText.astro?astro&type=script&index=0&lang.ts":"_astro/TypewriterText.astro_astro_type_script_index_0_lang.CcX4FVOp.js","@/components/pages/vndb/VndbGrid.svelte":"_astro/VndbGrid.DEhpWQDf.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/WidgetLayout.astro?astro&type=script&index=0&lang.ts":"_astro/WidgetLayout.astro_astro_type_script_index_0_lang._RcciAKu.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/[...page].astro?astro&type=script&index=0&lang.ts":"_astro/_...page_.astro_astro_type_script_index_0_lang.DMKzQkFo.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/posts/[...slug].astro?astro&type=script&index=0&lang.ts":"_astro/_...slug_.astro_astro_type_script_index_0_lang.BvR6r-On.js","@astrojs/svelte/client.js":"_astro/client.svelte.DkqHLhIJ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro?astro&type=script&index=0&lang.ts":"_astro/comments.astro_astro_type_script_index_0_lang.CffrSACG.js","astro:scripts/page.js":"_astro/page.L0U7MNaK.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro?astro&type=script&index=0&lang.ts":"_astro/rss.astro_astro_type_script_index_0_lang.DDXBKBcn.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.5/node_modules/@swup/astro/dist/client/Swup.js":"_astro/Swup.BBP3hhZS.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.5/node_modules/@swup/astro/dist/client/SwupA11yPlugin.js":"_astro/SwupA11yPlugin.DZ-DW61z.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.5/node_modules/@swup/astro/dist/client/SwupHeadPlugin.js":"_astro/SwupHeadPlugin.CJV9x5S0.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.5/node_modules/@swup/astro/dist/client/SwupPreloadPlugin.js":"_astro/SwupPreloadPlugin.BszAQ7NZ.js","D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.5/node_modules/@swup/astro/dist/client/SwupScriptsPlugin.js":"_astro/SwupScriptsPlugin.KOkp8JHL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/CategoryBar.astro?astro&type=script&index=0&lang.ts","var d;function v(e,t){const r=t.pathname.replace(/\\/$/,\"\"),a=(e.getAttribute(\"data-home-path\")||\"/\").replace(/\\/$/,\"\"),o=(e.getAttribute(\"data-archive-path\")||\"/archive\").replace(/\\/$/,\"\");return{isHome:r===a||r===\"\"||r===\"/\",isArchive:r===o,isCategories:r===\"/categories\",activeCategory:t.searchParams.get(\"category\")||\"\",hasTag:t.searchParams.has(\"tag\"),hasUncategorized:t.searchParams.has(\"uncategorized\")}}function y(e,t){const{isHome:r,isArchive:a,isCategories:o,activeCategory:c,hasTag:s,hasUncategorized:l}=v(e,t),h=(e.getAttribute(\"data-current-post-category\")||\"\").trim(),f=e.querySelectorAll(\".category-pill\");if(f.forEach(i=>{i.removeAttribute(\"data-active\"),i.removeAttribute(\"data-soft-active\")}),r){e.querySelector('.category-pill[data-category-name=\"\"]')?.setAttribute(\"data-active\",\"\");return}if(o){e.querySelector('.category-pill[data-category-name=\"__categories__\"]')?.setAttribute(\"data-active\",\"\");return}if(c){f.forEach(i=>{i.getAttribute(\"data-category-name\")===c&&i.setAttribute(\"data-active\",\"\")});return}if(a&&!s&&!l){e.querySelector('.category-pill[data-category-name=\"__archive__\"]')?.setAttribute(\"data-active\",\"\");return}h&&f.forEach(i=>{i.getAttribute(\"data-category-name\")===h&&i.setAttribute(\"data-soft-active\",\"\")})}function g(e,t=\"smooth\"){const r=e.querySelector(\".category-pill[data-active]\")||e.querySelector(\".category-pill[data-soft-active]\"),a=e.querySelector(\".category-scroll\");if(!r||!a)return;const o=r.offsetLeft-a.offsetLeft-(a.clientWidth-r.offsetWidth)/2;a.scrollTo({left:Math.max(0,o),behavior:t})}function b(e,t){const{isHome:r}=v(e,t),a=window.innerWidth<1024,o=document.body.classList.contains(\"enable-banner\");return a&&o&&!r}function u(e=new URL(window.location.href),t={}){const r=document.getElementById(\"category-bar\");if(!r)return;const a=document.getElementById(\"swup-container\");if(a){const s=a.getAttribute(\"data-current-post-category\")||\"\";r.setAttribute(\"data-current-post-category\",s)}y(r,e);const o=t.deferScroll??b(r,e),c=t.scrollBehavior??(o?\"auto\":\"smooth\");if(d&&(window.clearTimeout(d),d=void 0),o){d=window.setTimeout(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{g(r,c),n()})})},220);return}g(r,c),n()}function p(){const e=document.getElementById(\"category-bar\");!e||e.dataset.clickBound===\"true\"||(e.dataset.clickBound=\"true\",e.addEventListener(\"click\",t=>{if(!(t.target instanceof Element))return;const r=t.target.closest(\".category-pill\");if(!r||t.defaultPrevented||t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||r.target&&r.target!==\"_self\")return;const a=new URL(r.href,window.location.href);a.origin===window.location.origin&&(y(e,a),g(e,\"auto\"))}))}function w(){const e=document.getElementById(\"category-bar\");if(!e)return;const t=e.querySelector(\".category-scroll\");if(t){if(t.dataset.featuresBound===\"true\"){n();return}t.dataset.featuresBound=\"true\",t.addEventListener(\"wheel\",r=>{t.scrollWidth<=t.clientWidth||(r.preventDefault(),t.scrollLeft+=r.deltaY)},{passive:!1}),t.addEventListener(\"scroll\",n),window.addEventListener(\"resize\",n),n()}}function n(){const e=document.getElementById(\"category-bar\");if(!e)return;const t=e.querySelector(\".category-scroll\"),r=e.querySelector(\".scroll-fade-left\"),a=e.querySelector(\".scroll-fade-right\");if(!t||!r||!a)return;const o=t.scrollWidth>t.clientWidth+1,c=t.scrollLeft<=1,s=t.scrollLeft+t.clientWidth>=t.scrollWidth-1;o&&!c?r.setAttribute(\"data-visible\",\"\"):r.removeAttribute(\"data-visible\"),o&&!s?a.setAttribute(\"data-visible\",\"\"):a.removeAttribute(\"data-visible\");const l=e.querySelector(\".more-divider\");l&&(o?l.setAttribute(\"data-visible\",\"\"):l.removeAttribute(\"data-visible\"))}u();p();w();document.addEventListener(\"astro:page-load\",()=>{u(),w()});document.addEventListener(\"swup:contentReplaced\",()=>{u(),requestAnimationFrame(()=>{u()})});function m(){window.swup?.hooks&&window.swup.hooks.on(\"visit:start\",e=>{const t=document.getElementById(\"category-bar\");t&&y(t,new URL(e.to.url,window.location.href))})}window.swup?.hooks?m():document.addEventListener(\"swup:enable\",m);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/CodeGroupManager.astro?astro&type=script&index=0&lang.ts","var g=\".rehype-code-group\",i=\".rcg-tab\",b=\".rcg-block\",l=e=>Array.from(e.querySelectorAll(`:scope > .rcg-tab-container > ${i}`)),h=e=>Array.from(e.querySelectorAll(`:scope > ${b}`));function u(e,t,n=!1){const r=l(e),d=h(e);if(r.length===0)return;const a=Math.max(0,Math.min(t,r.length-1));r.forEach((c,s)=>{const o=s===a;c.classList.toggle(\"active\",o),c.setAttribute(\"aria-selected\",o?\"true\":\"false\")}),d.forEach((c,s)=>{const o=s===a;c.classList.toggle(\"active\",o),o?c.removeAttribute(\"hidden\"):c.setAttribute(\"hidden\",\"true\")}),n&&r[a].focus({preventScroll:!0})}function f(e){if(!(e instanceof Element))return null;const t=e.closest(i),n=t?.closest(g);if(!t||!n)return null;const r=l(n).indexOf(t);return r===-1?null:{group:n,index:r}}document.addEventListener(\"click\",e=>{const t=f(e.target);t&&u(t.group,t.index)});document.addEventListener(\"keydown\",e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;const t=f(e.target);if(!t)return;const n=l(t.group).length;let r;switch(e.key){case\"ArrowRight\":r=(t.index+1)%n;break;case\"ArrowLeft\":r=(t.index-1+n)%n;break;case\"Home\":r=0;break;case\"End\":r=n-1;break;default:return}e.preventDefault(),u(t.group,r,!0)});"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/CoverImage.astro?astro&type=script&index=0&lang.ts","function l(){document.querySelectorAll(\".cover-image-container\").forEach(t=>{if(t.hasAttribute(\"data-initialized\"))return;t.setAttribute(\"data-initialized\",\"true\");const e=t.querySelector(\"img[data-cover-img]\");if(!e)return;let r=[],a=1;const s=t.getAttribute(\"data-api-urls\");if(s)try{r=JSON.parse(s)}catch{}const i=()=>{t.setAttribute(\"data-loading\",\"false\"),e.style.opacity=\"1\";const o=t.querySelector(\".lqip-placeholder\");o&&o.classList.add(\"loaded\")},n=()=>{t.setAttribute(\"data-loading\",\"false\"),t.setAttribute(\"data-error\",\"true\")},d=()=>{e.dataset.remote===\"true\"&&(a<r.length?(e.addEventListener(\"load\",i,{once:!0}),e.addEventListener(\"error\",d,{once:!0}),e.src=r[a],a++):n())};e.complete?e.naturalWidth>0?i():d():(e.addEventListener(\"load\",i,{once:!0}),e.addEventListener(\"error\",d,{once:!0}))})}l();document.addEventListener(\"astro:page-load\",l);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/DropdownMenu.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const c=document.querySelectorAll(\"[data-dropdown]\");c.forEach(e=>{const t=e.querySelector(\"[data-dropdown-trigger]\"),o=e.querySelector(\"[data-dropdown-menu]\"),n=e.querySelectorAll(\".dropdown-item\");!t||!o||(t.addEventListener(\"keydown\",function(r){r.key===\"Enter\"||r.key===\" \"?(r.preventDefault(),d(e,t,o)):r.key===\"ArrowDown\"?(r.preventDefault(),s(e,t,o),n.length>0&&n[0].focus()):r.key===\"Escape\"&&u(e,t,o)}),n.forEach((r,f)=>{r.addEventListener(\"keydown\",function(a){if(a.key===\"ArrowDown\"){a.preventDefault();const i=(f+1)%n.length;n[i].focus()}else if(a.key===\"ArrowUp\"){a.preventDefault();const i=(f-1+n.length)%n.length;n[i].focus()}else a.key===\"Escape\"&&(u(e,t,o),t.focus())})}))}),document.addEventListener(\"click\",function(e){c.forEach(t=>{if(!t.contains(e.target)){const o=t.querySelector(\"[data-dropdown-trigger]\"),n=t.querySelector(\"[data-dropdown-menu]\");o&&n&&u(t,o,n)}})})});function d(c,e,t){e.getAttribute(\"aria-expanded\")===\"true\"?u(c,e,t):s(c,e,t)}function s(c,e,t){e.setAttribute(\"aria-expanded\",\"true\")}function u(c,e,t){e.setAttribute(\"aria-expanded\",\"false\")}"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/FontSetup.astro?astro&type=script&index=0&lang.ts","document.fonts&&typeof document.fonts.ready<\"u\"&&document.fonts.ready.then(()=>{document.dispatchEvent(new CustomEvent(\"fontsLoaded\"))}).catch(n=>{console.warn(\"Font loading failed:\",n)});"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/MainGridLayout.astro?astro&type=script&index=0&lang.ts","document.body.classList.add(\"wallpaper-transparent\");"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/NavMenuPanel.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelectorAll(\"[data-mobile-dropdown]\");t.forEach(e=>{const n=e.querySelector(\"[data-mobile-dropdown-trigger]\"),i=e.querySelector(\"[data-mobile-submenu]\");!n||!i||n.addEventListener(\"click\",function(u){u.preventDefault();const o=e.getAttribute(\"data-expanded\")===\"true\";t.forEach(r=>{r!==e&&a(r,!1)}),a(e,!o)})})});function a(t,e){t.setAttribute(\"data-expanded\",e.toString()),t.querySelector(\"[data-mobile-dropdown-trigger]\")?.setAttribute(\"aria-expanded\",e.toString());const n=t.querySelector(\"[data-mobile-submenu]\");n instanceof HTMLElement&&(n.inert=!e,n.setAttribute(\"aria-hidden\",(!e).toString()))}"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts","function g(){let l=document.getElementById(\"display-settings-switch\");l&&(l.onclick=function(){let e=document.getElementById(\"display-setting\");e&&e.classList.toggle(\"float-panel-closed\")});let o=document.getElementById(\"nav-menu-switch\");o&&(o.onclick=function(){let e=document.getElementById(\"nav-menu-panel\");e&&e.classList.toggle(\"float-panel-closed\")});let c=document.getElementById(\"music-player-switch\");c&&(c.onclick=function(){let e=document.getElementById(\"music-nav-panel\");e&&e.classList.toggle(\"float-panel-closed\")});let t=document.getElementById(\"bg-player-toggle\");if(t){let e=function(i){var n=t.querySelector(\".bg-player-icon-play\"),a=t.querySelector(\".bg-player-icon-pause\");n&&a&&(n.classList.toggle(\"hidden\",i),a.classList.toggle(\"hidden\",!i));var s=t.getAttribute(\"data-i18n-play\")??\"\",r=t.getAttribute(\"data-i18n-pause\")??\"\",f=i?r:s;t.setAttribute(\"title\",f),t.setAttribute(\"aria-label\",f)},d=function(){e(document.documentElement.hasAttribute(\"data-bg-video-playing\"))};var w=e,p=d;t.onclick=function(){window.dispatchEvent(new CustomEvent(\"bg-player-toggle\"))},window.addEventListener(\"bg-player-state-change\",function(i){var n=i;e(n.detail&&n.detail.playing)}),window.addEventListener(\"wallpaperModeChange\",function(i){var n=i,a=n.detail&&n.detail.mode;t.style.display=a===\"none\"?\"none\":\"\"}),window.swup&&window.swup.hooks?window.swup.hooks.on(\"content:replace\",d):document.addEventListener(\"swup:enable\",function(){window.swup.hooks.on(\"content:replace\",d)})}let m=document.getElementById(\"scheme-switch\");m&&(m.onclick=function(){let e=document.getElementById(\"theme-mode-panel\");e&&e.classList.toggle(\"float-panel-closed\")}),document.addEventListener(\"click\",function(e){const d=[\"display-setting\",\"nav-menu-panel\",\"music-nav-panel\",\"theme-mode-panel\"],i=[\"display-settings-switch\",\"nav-menu-switch\",\"music-player-switch\",\"scheme-switch\"];d.forEach((n,a)=>{const s=document.getElementById(n),r=document.getElementById(i[a]);s&&r&&!s.classList.contains(\"float-panel-closed\")&&e.target instanceof Node&&!s.contains(e.target)&&!r.contains(e.target)&&s.classList.add(\"float-panel-closed\")})})}g();function u(){const l=document.getElementById(\"navbar\");if(!l||l.getAttribute(\"data-transparent-mode\")!==\"semifull\")return;window.semifullScrollHandler&&(window.removeEventListener(\"scroll\",window.semifullScrollHandler),window.semifullScrollHandler=void 0),l.classList.remove(\"scrolled\");let o=!1;function c(){if(document.documentElement.classList.contains(\"is-page-transitioning\")){l.classList.remove(\"scrolled\"),o=!1;return}(window.pageYOffset||document.documentElement.scrollTop)>50?l.classList.add(\"scrolled\"):l.classList.remove(\"scrolled\"),o=!1}function t(){o||(requestAnimationFrame(c),o=!0)}window.semifullScrollHandler&&window.removeEventListener(\"scroll\",window.semifullScrollHandler),window.semifullScrollHandler=t,window.addEventListener(\"scroll\",t,{passive:!0}),c()}window.initSemifullScrollDetection=u;document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",u):u();"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/PostPage.astro?astro&type=script&index=0&lang.ts","function a(){const t=document.getElementById(\"post-list-container\");if(!t)return;const e=localStorage.getItem(\"postListLayout\"),o=t.getAttribute(\"data-default-layout\")||\"list\",r=t.getAttribute(\"data-mobile-default-layout\")||o,s=window.innerWidth<780?r:o;let n=e||s;window.innerWidth<380&&(n=\"grid\"),y(n)}function y(t){const e=document.getElementById(\"post-list-container\");if(!e)return;const o=e.classList.contains(\"grid-mode\"),r=e.classList.contains(\"list-mode\"),s=o?\"grid\":r?\"list\":null,n=e.getAttribute(\"data-masonry-enabled\")===\"true\",l=()=>{e.classList.remove(\"list-mode\",\"grid-mode\",\"post-grid-auto\"),t===\"grid\"?(e.classList.add(\"grid-mode\"),e.classList.remove(\"flex\",\"flex-col\"),n?(e.classList.remove(\"post-grid-auto\"),c()):(e.classList.add(\"post-grid-auto\"),f())):(e.classList.add(\"list-mode\"),e.classList.add(\"flex\",\"flex-col\",\"gap-4\",\"md:gap-4\"),e.classList.remove(\"post-grid-auto\"),f())};if(!s){l();return}if(s===t){t===\"grid\"&&n&&c();return}e.classList.add(\"layout-switching\"),setTimeout(()=>{l(),requestAnimationFrame(()=>{e.classList.remove(\"layout-switching\")})},200)}function f(){const t=document.getElementById(\"post-list-container\");t&&(t.style.height=\"\",t.style.position=\"\",t.style.display=\"\",t.querySelectorAll(\".post-card-item\").forEach(e=>{e.style.position=\"\",e.style.top=\"\",e.style.left=\"\",e.style.width=\"\"}))}function c(){const t=document.getElementById(\"post-list-container\");if(!t||t.getAttribute(\"data-masonry-enabled\")!==\"true\"||!t.classList.contains(\"grid-mode\"))return;const e=Array.from(t.querySelectorAll(\".post-card-item\"));if(e.length===0)return;const o=16,r=parseInt(t.getAttribute(\"data-column-width\")||\"280\");t.style.position=\"relative\",t.style.display=\"block\";const s=t.offsetWidth,n=Math.max(1,Math.floor((s+o)/(r+o))),l=(s-(n-1)*o)/n,d=new Array(n).fill(0);e.forEach(i=>{const u=d.indexOf(Math.min(...d));i.style.position=\"absolute\",i.style.width=`${l}px`,i.style.setProperty(\"height\",\"auto\",\"important\");const p=i.offsetHeight,g=d[u],L=u*(l+o);i.style.top=`${g}px`,i.style.left=`${L}px`,d[u]+=p+o}),t.style.height=`${Math.max(...d)}px`}document.addEventListener(\"DOMContentLoaded\",function(){setTimeout(a,50),document.querySelectorAll(\"#post-list-container img\").forEach(t=>{t.complete||t.addEventListener(\"load\",()=>{c()})})});document.addEventListener(\"visibilitychange\",function(){document.hidden||setTimeout(a,100)});window.addEventListener(\"layoutChange\",function(t){const e=t.detail.layout;document.getElementById(\"post-list-container\")&&y(e)});var m;window.addEventListener(\"resize\",function(){clearTimeout(m),m=setTimeout(function(){a()},250)});document.addEventListener(\"astro:page-load\",function(){setTimeout(a,50),document.querySelectorAll(\"#post-list-container img\").forEach(t=>{t.complete||t.addEventListener(\"load\",()=>{c()})})});document.addEventListener(\"astro:after-swap\",function(){setTimeout(a,50)});setTimeout(a,0);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteInfo.astro?astro&type=script&index=0&lang.ts","var c=class extends HTMLElement{constructor(){super();const s=this.querySelector(\".site-info-toggle-btn\"),o=this.querySelector(\".site-info-detail\"),e=this.querySelector(\".site-info-toggle-text\"),n=this.querySelector(\".site-info-toggle-icon\");if(!s||!o||!e)return;const l=this.dataset.expandText||\"展开构建信息\",i=this.dataset.collapseText||\"收起构建信息\";let t=!1;e.textContent=l,s.addEventListener(\"click\",()=>{t=!t,o.classList.toggle(\"collapsed\",!t),e.textContent=t?i:l,n?.classList.toggle(\"rotate-180\",t)})}};customElements.get(\"site-info-collapse\")||customElements.define(\"site-info-collapse\",c);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/TypewriterText.astro?astro&type=script&index=0&lang.ts","var r=class{element;texts;currentTextIndex=0;speed;deleteSpeed;pauseTime;currentIndex=0;isDeleting=!1;timeoutId=null;constructor(t){this.element=t;const e=t.dataset.text||\"\";try{const n=JSON.parse(e);this.texts=Array.isArray(n)?n:[e]}catch{this.texts=[e]}this.speed=parseInt(t.dataset.speed||\"100\"),this.deleteSpeed=parseInt(t.dataset.deleteSpeed||\"50\"),this.pauseTime=parseInt(t.dataset.pauseTime||\"2000\"),this.texts.length>1&&!this.isTypewriterEnabled()?this.showRandomText():this.start()}isTypewriterEnabled(){return this.element.dataset.speed!==void 0||this.element.dataset.deleteSpeed!==void 0||this.element.dataset.pauseTime!==void 0}showRandomText(){const t=Math.floor(Math.random()*this.texts.length);this.element.textContent=this.texts[t]}start(){this.texts.length!==0&&this.type()}getCurrentText(){return this.texts[this.currentTextIndex]||\"\"}type(){const t=this.getCurrentText(),e=this.segmentText(t);this.isDeleting?this.currentIndex>0?(this.currentIndex--,this.element.textContent=e.slice(0,this.currentIndex).join(\"\"),this.timeoutId=window.setTimeout(()=>this.type(),this.deleteSpeed)):(this.isDeleting=!1,this.currentTextIndex=(this.currentTextIndex+1)%this.texts.length,this.timeoutId=window.setTimeout(()=>this.type(),this.speed)):this.currentIndex<e.length?(this.currentIndex++,this.element.textContent=e.slice(0,this.currentIndex).join(\"\"),this.timeoutId=window.setTimeout(()=>this.type(),this.speed)):this.texts.length>1&&(this.isDeleting=!0,this.timeoutId=window.setTimeout(()=>this.type(),this.pauseTime))}destroy(){this.timeoutId&&clearTimeout(this.timeoutId)}segmentText(t){const e=new Intl.Segmenter(void 0,{granularity:\"grapheme\"});return Array.from(e.segment(t),n=>n.segment)}};function i(){document.querySelectorAll(\".typewriter\").forEach(t=>{const e=t;e.__typewriterInstance&&e.__typewriterInstance.destroy(),e.textContent=\"\",e.__typewriterInstance=new r(e)})}function s(){i(),setTimeout(i,220)}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",s):s();document.addEventListener(\"swup:contentReplaced\",s);document.addEventListener(\"swup:content:replace\",s);document.addEventListener(\"swup:page:view\",s);typeof window<\"u\"&&window.swup?.hooks&&(window.swup.hooks.on(\"content:replace\",s),window.swup.hooks.on(\"page:view\",s));"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/WidgetLayout.astro?astro&type=script&index=0&lang.ts","var c=class extends HTMLElement{constructor(){if(super(),this.dataset.isCollapsed!==\"true\")return;this.dataset.expanded=\"false\";const n=this.dataset.id,t=this.querySelector(\".expand-btn button\"),o=this.querySelector(`#${n}`);if(!t||!o)return;const a=t.querySelector(\".toggle-text\"),l=t.querySelector(\".toggle-icon-more\"),i=t.querySelector(\".toggle-icon-less\"),r=e=>{const s=e?t.dataset.showLess||\"\":t.dataset.showMore||\"\";t.dataset.expanded=String(e),this.dataset.expanded=String(e),t.title=s,t.setAttribute(\"aria-label\",s),a&&(a.textContent=s),l?.classList.toggle(\"hidden\",e),i?.classList.toggle(\"hidden\",!e)};t.addEventListener(\"click\",()=>{const e=t.dataset.expanded===\"true\";o.classList.toggle(\"collapsed\",e),r(!e)})}};customElements.get(\"widget-layout\")||customElements.define(\"widget-layout\",c);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/[...page].astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){{const e=d();document.body.classList.add(`device-${e}`);let t;window.addEventListener(\"resize\",function(){clearTimeout(t),t=setTimeout(function(){const n=d(),i=document.body.className.match(/device-(mobile|tablet|desktop)/)?.[1];i!==n&&(document.body.classList.remove(`device-${i}`),document.body.classList.add(`device-${n}`))},250)})}});function d(){if(typeof window>\"u\")return\"desktop\";const e=window.innerWidth;return e<768?\"mobile\":e<1024?\"tablet\":\"desktop\"}"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/posts/[...slug].astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(\"outdated-card\"),n=e?.dataset.date;if(e&&n){const o=new Date(n),a=Math.floor((Date.now()-o.getTime())/864e5);if(a>=Number(e.dataset.threshold)&&(e.classList.remove(\"hidden\"),a>=1)){const t=document.getElementById(\"days-ago-text\");t&&t.dataset.template&&(t.textContent=`，${t.dataset.template.replace(\"{days}\",a.toString())}`);const d=document.getElementById(\"outdated-warning\");d&&d.classList.remove(\"hidden\")}}"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/dynamic/comments.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"message\",e=>{e.origin!==window.location.origin||e.data?.type!==\"dynamic-comment-theme\"||(document.documentElement.classList.toggle(\"dark\",!!e.data.dark),document.documentElement.dataset.theme=e.data.dark?\"dark\":\"light\")});var t=()=>{window.parent.postMessage({type:\"dynamic-comment-height\",height:document.documentElement.scrollHeight},window.location.origin)};new ResizeObserver(t).observe(document.body);window.addEventListener(\"load\",t);"],["D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/pages/rss.astro?astro&type=script&index=0&lang.ts","function o(){const e=document.getElementById(\"copy-rss-btn\");if(!e)return;const r=e.cloneNode(!0);e.parentNode?.replaceChild(r,e),r.addEventListener(\"click\",async function(c){const t=c.currentTarget,i=t.getAttribute(\"data-url\");if(i)try{await navigator.clipboard.writeText(i);const n=t.textContent;t.textContent=t.getAttribute(\"data-copied-text\")||\"\",t.style.backgroundColor=\"var(--success-color, #10b981)\",setTimeout(()=>{t.textContent=n,t.style.backgroundColor=\"\"},2e3)}catch(n){console.error(\"复制失败:\",n);const a=t.textContent;t.textContent=t.getAttribute(\"data-failed-text\")||\"\",setTimeout(()=>{t.textContent=a},2e3)}})}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",o):setTimeout(o,0);typeof window<\"u\"&&window.swup&&window.swup.hooks.on(\"content:replace\",()=>{setTimeout(o,100)});"]],"assets":["/_astro/firefly2.dxmXG905.avif","/_astro/firefly1.CZCuCN4V.avif","/_astro/left-list.CdJfuugk.avif","/_astro/both-list.CybtDZTU.avif","/_astro/left-grid3.DCIbm9j3.avif","/_astro/masonry.BgzRsBcp.avif","/_astro/right-grid2.BDLeNFG9.avif","/_astro/docusaurus.Cu-On_k2.avif","/_astro/both-grid.B-BFe9Al.avif","/_astro/firefly3.CGzFXcxi.avif","/_astro/cover.bDPQizdp.avif","/_astro/vitepress.D2YnjBWE.avif","/_astro/github.urcbElKG.avif","/_astro/1.BQ4-k1kz.avif","/_astro/obsidian.Cwb2iYzd.avif","/_astro/d1.v_J1gD3P.avif","/_astro/d3.CGCRs0-H.avif","/_astro/m1.DqqgjsGn.avif","/_astro/d4.Brgr35k-.avif","/_astro/d2.B57ICuoV.avif","/_astro/m6.BY42_Be2.avif","/_astro/d5.z7QGp_dj.avif","/_astro/m3.DGa_nZZV.avif","/_astro/m5.D_Epxsab.avif","/_astro/avatar.BcAu2wMi.avif","/_astro/m4.BH-lD-3t.avif","/_astro/d6.DetxM4Sl.avif","/_astro/firefly-dark.b7MsfgPt.png","/_astro/m2.B5kTqdCO.avif","/_astro/firefly-light.DZ-mS7Sc.png","/_astro/Layout.B0-3IVbW.css","/_astro/MainGridLayout.Cu8tSN4M.css","/_astro/_..BulBwWNp.css","/_astro/index.DB7o9y_O.css","/_astro/_..By8RXJSL.css","/_astro/KaTeX_AMS-Regular.BQhdFMY1.woff2","/_astro/KaTeX_AMS-Regular.DMm9YOAa.woff","/_astro/KaTeX_AMS-Regular.DRggAlZN.ttf","/_astro/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2","/_astro/KaTeX_Caligraphic-Bold.BEiXGLvX.woff","/_astro/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf","/_astro/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2","/_astro/KaTeX_Caligraphic-Regular.CTRA-rTL.woff","/_astro/KaTeX_Caligraphic-Regular.wX97UBjC.ttf","/_astro/KaTeX_Fraktur-Bold.CL6g_b3V.woff2","/_astro/KaTeX_Fraktur-Bold.BsDP51OF.woff","/_astro/KaTeX_Fraktur-Bold.BdnERNNW.ttf","/_astro/KaTeX_Fraktur-Regular.CTYiF6lA.woff2","/_astro/KaTeX_Fraktur-Regular.Dxdc4cR9.woff","/_astro/KaTeX_Fraktur-Regular.CB_wures.ttf","/_astro/KaTeX_Main-Bold.Cx986IdX.woff2","/_astro/KaTeX_Main-Bold.Jm3AIy58.woff","/_astro/KaTeX_Main-Bold.waoOVXN0.ttf","/_astro/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2","/_astro/KaTeX_Main-BoldItalic.SpSLRI95.woff","/_astro/KaTeX_Main-BoldItalic.DzxPMmG6.ttf","/_astro/KaTeX_Main-Italic.NWA7e6Wa.woff2","/_astro/KaTeX_Main-Italic.BMLOBm91.woff","/_astro/KaTeX_Main-Italic.3WenGoN9.ttf","/_astro/KaTeX_Main-Regular.B22Nviop.woff2","/_astro/KaTeX_Main-Regular.Dr94JaBh.woff","/_astro/KaTeX_Main-Regular.ypZvNtVU.ttf","/_astro/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2","/_astro/KaTeX_Math-BoldItalic.iY-2wyZ7.woff","/_astro/KaTeX_Math-BoldItalic.B3XSjfu4.ttf","/_astro/KaTeX_Math-Italic.t53AETM-.woff2","/_astro/KaTeX_Math-Italic.DA0__PXp.woff","/_astro/KaTeX_Math-Italic.flOr_0UB.ttf","/_astro/KaTeX_SansSerif-Bold.D1sUS0GD.woff2","/_astro/KaTeX_SansSerif-Bold.DbIhKOiC.woff","/_astro/KaTeX_SansSerif-Bold.CFMepnvq.ttf","/_astro/KaTeX_SansSerif-Italic.C3H0VqGB.woff2","/_astro/KaTeX_SansSerif-Italic.DN2j7dab.woff","/_astro/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf","/_astro/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2","/_astro/KaTeX_SansSerif-Regular.CS6fqUqJ.woff","/_astro/KaTeX_SansSerif-Regular.BNo7hRIc.ttf","/_astro/KaTeX_Script-Regular.D3wIWfF6.woff2","/_astro/KaTeX_Script-Regular.D5yQViql.woff","/_astro/KaTeX_Script-Regular.C5JkGWo-.ttf","/_astro/KaTeX_Size1-Regular.mCD8mA8B.woff2","/_astro/KaTeX_Size1-Regular.C195tn64.woff","/_astro/KaTeX_Size1-Regular.Dbsnue_I.ttf","/_astro/KaTeX_Size2-Regular.Dy4dx90m.woff2","/_astro/KaTeX_Size2-Regular.oD1tc_U0.woff","/_astro/KaTeX_Size2-Regular.B7gKUWhC.ttf","/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff","/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf","/_astro/KaTeX_Size4-Regular.Dl5lxZxV.woff2","/_astro/KaTeX_Size4-Regular.BF-4gkZK.woff","/_astro/KaTeX_Size4-Regular.DWFBv043.ttf","/_astro/KaTeX_Typewriter-Regular.CO6r4hn1.woff2","/_astro/KaTeX_Typewriter-Regular.C0xS9mPB.woff","/_astro/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf","/_astro/page.L0U7MNaK.js","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/404.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/about/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/anime/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/api/allPostMeta.json","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/api/dynamic.json","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/archive/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/bangumi/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/booknav/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/categories/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/dynamic/comments/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/dynamic/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/friends/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/gallery/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/guestbook/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/robots.txt","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/rss/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/rss.xml","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/search/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/sponsor/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/tags/index.html","/file:///D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/dist/vndb/index.html"],"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"HC+TcQrE9nY4dJxWjfR0I120uAeXH2KmmPUNlw+LTMo=","image":{"layout":"none"},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./chunks/_noop-middleware_CQ50ikAJ.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_C-PI1Pas.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/vite-plugin-pages/const.js
var VIRTUAL_PAGE_RESOLVED_MODULE_ID = "\0virtual:astro:page:";
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/vite-plugin-pages/util.js
var ASTRO_PAGE_EXTENSION_POST_PATTERN = "@_@";
function getVirtualModulePageName(virtualModulePrefix, path) {
	const extension = fileExtension(path);
	return virtualModulePrefix + (extension.startsWith(".") ? path.slice(0, -extension.length) + extension.replace(".", ASTRO_PAGE_EXTENSION_POST_PATTERN) : path);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/vite-plugin-scripts/index.js
var SCRIPT_ID_PREFIX = `astro:scripts/`;
var BEFORE_HYDRATION_SCRIPT_ID = `${SCRIPT_ID_PREFIX}before-hydration.js`;
var PAGE_SCRIPT_ID = `${SCRIPT_ID_PREFIX}page.js`;
`${SCRIPT_ID_PREFIX}`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/build/plugins/util.js
var ASTRO_PAGE_KEY_SEPARATOR = "&";
function makePageDataKey(route, componentPath) {
	return route + ASTRO_PAGE_KEY_SEPARATOR + componentPath;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/build/runtime.js
function getPageData(internals, route, component) {
	let pageData = internals.pagesByKeys.get(makePageDataKey(route, component));
	if (pageData) return pageData;
}
function cssOrder(a, b) {
	let depthA = a.depth, depthB = b.depth, orderA = a.order, orderB = b.order;
	if (orderA === -1 && orderB >= 0) return 1;
	else if (orderB === -1 && orderA >= 0) return -1;
	else if (orderA > orderB) return 1;
	else if (orderA < orderB) return -1;
	else if (depthA === -1) return -1;
	else if (depthB === -1) return 1;
	else return depthA > depthB ? -1 : 1;
}
function mergeInlineCss(acc, current) {
	const lastAdded = acc.at(acc.length - 1);
	const lastWasInline = lastAdded?.type === "inline";
	const currentIsInline = current?.type === "inline";
	if (lastWasInline && currentIsInline) {
		const currentHasImport = current.content.includes("@import");
		const lastHasImport = lastAdded.content.includes("@import");
		if (!currentHasImport && !lastHasImport) {
			const merged = {
				type: "inline",
				content: lastAdded.content + current.content
			};
			acc[acc.length - 1] = merged;
			return acc;
		}
	}
	acc.push(current);
	return acc;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/build/pipeline.js
var BuildPipeline = class BuildPipeline extends Pipeline {
	internals;
	options;
	manifest;
	defaultRoutes;
	getName() {
		return "BuildPipeline";
	}
	/**
	* This cache is needed to map a single `RouteData` to its file path.
	* @private
	*/
	#routesByFilePath = /* @__PURE__ */ new WeakMap();
	getSettings() {
		if (!this.options) throw new Error("No options defined");
		return this.options.settings;
	}
	getOptions() {
		if (!this.options) throw new Error("No options defined");
		return this.options;
	}
	getInternals() {
		if (!this.internals) throw new Error("No internals defined");
		return this.internals;
	}
	constructor(manifest, defaultRoutes = createDefaultRoutes(manifest)) {
		const resolveCache = /* @__PURE__ */ new Map();
		async function resolve(specifier) {
			if (resolveCache.has(specifier)) return resolveCache.get(specifier);
			const hashedFilePath = manifest.entryModules[specifier];
			if (typeof hashedFilePath !== "string" || hashedFilePath === "") {
				if (specifier === BEFORE_HYDRATION_SCRIPT_ID) {
					resolveCache.set(specifier, "");
					return "";
				}
				throw new Error(`Cannot find the built path for ${specifier}`);
			}
			const assetLink = createAssetLink(hashedFilePath, manifest.base, manifest.assetsPrefix);
			resolveCache.set(specifier, assetLink);
			return assetLink;
		}
		const logger = createConsoleLogger({ level: manifest.logLevel });
		super(logger, manifest, "production", manifest.renderers, resolve, manifest.serverLike);
		this.manifest = manifest;
		this.defaultRoutes = defaultRoutes;
	}
	getRoutes() {
		return this.getOptions().routesList.routes;
	}
	static create({ manifest }) {
		return new BuildPipeline(manifest);
	}
	setInternals(internals) {
		this.internals = internals;
	}
	setOptions(options) {
		this.options = options;
	}
	headElements(routeData) {
		const { manifest: { assetsPrefix, base } } = this;
		const settings = this.getSettings();
		const internals = this.getInternals();
		const links = /* @__PURE__ */ new Set();
		const pageBuildData = getPageData(internals, routeData.route, routeData.component);
		const scripts = /* @__PURE__ */ new Set();
		const sortedCssAssets = pageBuildData?.styles.sort(cssOrder).map(({ sheet }) => sheet).reduce(mergeInlineCss, []);
		const styles = createStylesheetElementSet(sortedCssAssets ?? [], base, assetsPrefix);
		if (settings.scripts.some((script) => script.stage === "page")) {
			const hashedFilePath = internals.entrySpecifierToBundleMap.get(PAGE_SCRIPT_ID);
			if (typeof hashedFilePath !== "string") throw new Error(`Cannot find the built path for ${PAGE_SCRIPT_ID}`);
			const src = createAssetLink(hashedFilePath, base, assetsPrefix);
			scripts.add({
				props: {
					type: "module",
					src
				},
				children: ""
			});
		}
		for (const script of settings.scripts) if (script.stage === "head-inline") scripts.add({
			props: {},
			children: script.content
		});
		return {
			scripts,
			styles,
			links
		};
	}
	componentMetadata() {}
	/**
	* It collects the routes to generate during the build.
	* It returns a map of page information and their relative entry point as a string.
	*/
	retrieveRoutesToGenerate() {
		const pages = /* @__PURE__ */ new Set();
		const defaultRouteComponents = new Set(this.defaultRoutes.map((route) => route.component));
		for (const { routeData } of this.manifest.routes) {
			if (routeIsRedirect(routeData)) {
				pages.add(routeData);
				continue;
			}
			if (routeIsFallback(routeData) && i18nHasFallback(this.manifest)) {
				pages.add(routeData);
				continue;
			}
			if (defaultRouteComponents.has(routeData.component)) continue;
			pages.add(routeData);
			const moduleSpecifier = getVirtualModulePageName(VIRTUAL_PAGE_RESOLVED_MODULE_ID, routeData.component);
			const filePath = this.internals?.entrySpecifierToBundleMap.get(moduleSpecifier);
			if (filePath) this.#routesByFilePath.set(routeData, filePath);
		}
		return pages;
	}
	async getComponentByRoute(routeData) {
		return (await this.getModuleForRoute(routeData)).page();
	}
	async getModuleForRoute(route) {
		for (const defaultRoute of this.defaultRoutes) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
		let routeToProcess = route;
		if (routeIsRedirect(route)) if (route.redirectRoute) routeToProcess = route.redirectRoute;
		else return RedirectSinglePageBuiltModule;
		else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, this.manifest.routes);
		if (this.manifest.pageMap) {
			const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
			if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
			return await importComponentInstance();
		} else if (this.manifest.pageModule) return this.manifest.pageModule;
		throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
	}
	async tryRewrite(payload, request) {
		const { routeData, pathname, newUrl } = findRouteToRewrite({
			payload,
			request,
			routes: this.manifest.routes.map((routeInfo) => routeInfo.routeData),
			trailingSlash: this.manifest.trailingSlash,
			buildFormat: this.manifest.buildFormat,
			base: this.manifest.base,
			outDir: this.manifest.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
		});
		return {
			routeData,
			componentInstance: await this.getComponentByRoute(routeData),
			newUrl,
			pathname
		};
	}
};
function i18nHasFallback(manifest) {
	if (manifest.i18n && manifest.i18n.fallback) return Object.keys(manifest.i18n.fallback).length > 0;
	return false;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/errors/build-handler.js
var BuildErrorHandler = class {
	#default;
	constructor(app) {
		this.#default = new DefaultErrorHandler(app);
	}
	async renderError(request, options) {
		if (options.status === 500) {
			if (options.response) return options.response;
			throw options.error;
		}
		return this.#default.renderError(request, {
			...options,
			prerenderedErrorPageFetch: void 0
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/core/build/app.js
var BuildApp = class extends BaseApp {
	createPipeline(_streaming, manifest, ..._args) {
		return BuildPipeline.create({ manifest });
	}
	isDev() {
		return true;
	}
	setInternals(internals) {
		this.pipeline.setInternals(internals);
	}
	setOptions(options) {
		this.pipeline.setOptions(options);
		this.logger.setDestination(options.logger.options.destination);
		this.resetAdapterLogger();
	}
	getOptions() {
		return this.pipeline.getOptions();
	}
	getSettings() {
		return this.pipeline.getSettings();
	}
	createErrorHandler() {
		return new BuildErrorHandler(this);
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdown-remark@7.2.2_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_e3x7pfwl2b35xzv74g66mbe2ca/node_modules/astro/dist/entrypoints/prerender.js
var app = new BuildApp(manifest);
//#endregion
export { app, manifest };
