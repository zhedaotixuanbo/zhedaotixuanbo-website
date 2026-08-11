import { B as createVNode, t as __astro_tag_component__, u as Fragment } from "./server_DCu-nPcH.mjs";
//#region src/content/spec/friends.mdx
var frontmatter = {
	"title": "友情链接",
	"description": "与优秀的朋友们一起成长",
	"minutes": 3,
	"words": 561,
	"excerpt": ""
};
function getHeadings() {
	return [];
}
var site = {
	name: "夏夜流萤",
	desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
	url: "https://blog.cuteleaf.cn",
	avatar: "https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
	email: "xiaye@msn.com"
};
var notes = [
	{
		title: "互换原则",
		content: "请先将本站添加到您的友链页面，确认后会添加您的友链"
	},
	{
		title: "链接维护",
		content: "友链网站长期无法访问或内容违规，将会被移除"
	},
	{
		title: "内容要求",
		content: "内容积极向上，不含有任何含色情/反动/暴力等违法违规内容"
	},
	{
		title: "站点要求",
		content: "支持 HTTPS，以原创内容为主，能够正常访问且有持续更新"
	}
];
function _createMdxContent(props) {
	const _components = {
		p: "p",
		script: "script",
		...props.components
	};
	return createVNode(Fragment, { children: [
		"\n",
		"\n",
		"\n",
		"\n",
		"\n",
		"\n",
		createVNode("div", {
			class: "not-prose my-4",
			children: [createVNode("div", {
				class: "grid grid-cols-1 lg:grid-cols-2 gap-4",
				children: [createVNode("div", {
					class: "rounded-2xl border border-(--line-divider) overflow-hidden flex flex-col",
					children: createVNode("div", {
						class: "p-5 sm:p-6 flex flex-col flex-1",
						children: [createVNode("div", {
							class: "flex items-center gap-4 mb-5",
							children: [createVNode("div", {
								class: "relative shrink-0",
								children: [createVNode("div", {
									class: "w-16 h-16 rounded-xl overflow-hidden ring-2 ring-(--primary)/20",
									children: createVNode("img", {
										src: site.avatar,
										alt: site.name,
										class: "w-full h-full object-cover"
									})
								}), createVNode("div", {
									class: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-(--primary) flex items-center justify-center shadow",
									children: createVNode("svg", {
										class: "w-3 h-3 text-white",
										fill: "currentColor",
										viewBox: "0 0 20 20",
										children: createVNode("path", {
											"fill-rule": "evenodd",
											d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
											"clip-rule": "evenodd"
										})
									})
								})]
							}), createVNode("div", { children: [createVNode("h3", {
								class: "text-lg font-bold",
								children: site.name
							}), createVNode("p", {
								class: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5",
								children: site.desc
							})] })]
						}), createVNode("div", {
							class: "space-y-2.5 flex-1",
							children: [
								{
									label: "站点名称",
									value: site.name
								},
								{
									label: "站点描述",
									value: site.desc
								},
								{
									label: "站点链接",
									value: site.url
								},
								{
									label: "头像链接",
									value: site.avatar
								}
							].map((item) => createVNode("div", {
								class: "flex items-center justify-between gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2",
								children: [createVNode("div", {
									class: "min-w-0",
									children: [createVNode("p", {
										class: "text-[0.65rem] text-neutral-400 dark:text-neutral-500 mb-0.5",
										children: item.label
									}), createVNode("p", {
										class: "text-xs font-medium truncate",
										children: item.value
									})]
								}), createVNode("button", {
									onclick: `navigator.clipboard.writeText('${item.value.replace(/'/g, "\\'")}');this.querySelectorAll('svg')[0].classList.add('hidden');this.querySelectorAll('svg')[1].classList.remove('hidden');setTimeout(()=>{this.querySelectorAll('svg')[0].classList.remove('hidden');this.querySelectorAll('svg')[1].classList.add('hidden')},1500)`,
									class: "shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-black/10 dark:bg-white/10 text-(--btn-content) hover:opacity-80 transition-opacity cursor-pointer",
									children: [createVNode("svg", {
										class: "w-3.5 h-3.5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "2",
											d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										})
									}), createVNode("svg", {
										class: "w-3.5 h-3.5 hidden text-green-500",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "2",
											d: "M5 13l4 4L19 7"
										})
									})]
								})]
							}))
						})]
					})
				}), createVNode("div", {
					class: "rounded-2xl border border-(--line-divider) overflow-hidden flex flex-col",
					children: createVNode("div", {
						class: "p-5 sm:p-6 flex flex-col flex-1",
						children: [createVNode("h3", {
							class: "text-lg font-bold mb-5 flex items-center gap-2",
							children: [createVNode("span", {
								class: "w-7 h-7 rounded-lg bg-(--primary)/10 flex items-center justify-center text-(--primary) text-sm",
								children: createVNode("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
									})
								})
							}), createVNode(_components.p, { children: "申请友链" })]
						}), createVNode("div", {
							class: "space-y-0 flex-1",
							children: [
								createVNode("div", {
									class: "flex gap-3.5",
									children: [createVNode("div", {
										class: "flex flex-col items-center",
										children: [createVNode("div", {
											class: "w-7 h-7 rounded-full bg-(--primary) text-white text-xs font-bold flex items-center justify-center shrink-0",
											children: "1"
										}), createVNode("div", { class: "w-0.5 flex-1 bg-(--line-divider) my-1.5" })]
									}), createVNode("div", {
										class: "pb-4",
										children: [createVNode("p", {
											class: "font-semibold text-sm mb-1",
											children: "添加本站友链"
										}), createVNode("p", {
											class: "text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed",
											children: "请先在您的网站友链页面添加本站信息，可直接复制左侧各字段"
										})]
									})]
								}),
								createVNode("div", {
									class: "flex gap-3.5",
									children: [createVNode("div", {
										class: "flex flex-col items-center",
										children: [createVNode("div", {
											class: "w-7 h-7 rounded-full bg-(--primary) text-white text-xs font-bold flex items-center justify-center shrink-0",
											children: "2"
										}), createVNode("div", { class: "w-0.5 flex-1 bg-(--line-divider) my-1.5" })]
									}), createVNode("div", {
										class: "pb-4",
										children: [
											createVNode("p", {
												class: "font-semibold text-sm mb-1",
												children: ["评论区留言/发送申请邮件至：", createVNode("code", {
													class: "px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[0.7rem]",
													children: site.email
												})]
											}),
											createVNode("p", {
												class: "text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed",
												children: "申请模板，把内容复制修改后到评论区或邮件中发送"
											}),
											createVNode("div", {
												class: "relative rounded-lg bg-black/5 dark:bg-white/5 p-4 pr-10 text-[0.7rem] leading-relaxed overflow-x-auto whitespace-pre",
												children: [createVNode("button", {
													onclick: "navigator.clipboard.writeText('站点名称：您的站点名称\\n站点描述：您的站点描述\\n站点链接：您的站点链接\\n头像链接：您的站点头像');this.querySelectorAll('svg')[0].classList.add('hidden');this.querySelectorAll('svg')[1].classList.remove('hidden');setTimeout(()=>{this.querySelectorAll('svg')[0].classList.remove('hidden');this.querySelectorAll('svg')[1].classList.add('hidden')},1500)",
													class: "absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-md bg-black/10 dark:bg-white/10 text-(--btn-content) hover:opacity-80 transition-opacity cursor-pointer",
													children: [createVNode("svg", {
														class: "w-3.5 h-3.5",
														fill: "none",
														stroke: "currentColor",
														viewBox: "0 0 24 24",
														children: createVNode("path", {
															"stroke-linecap": "round",
															"stroke-linejoin": "round",
															"stroke-width": "2",
															d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
														})
													}), createVNode("svg", {
														class: "w-3.5 h-3.5 hidden text-green-500",
														fill: "none",
														stroke: "currentColor",
														viewBox: "0 0 24 24",
														children: createVNode("path", {
															"stroke-linecap": "round",
															"stroke-linejoin": "round",
															"stroke-width": "2",
															d: "M5 13l4 4L19 7"
														})
													})]
												}), `站点名称：您的站点名称\n站点描述：您的站点描述\n站点链接：您的站点链接\n头像链接：您的站点头像`]
											})
										]
									})]
								}),
								createVNode("div", {
									class: "flex gap-3.5",
									children: [createVNode("div", {
										class: "flex flex-col items-center",
										children: createVNode("div", {
											class: "w-7 h-7 rounded-full bg-(--primary) text-white text-xs font-bold flex items-center justify-center shrink-0",
											children: "3"
										})
									}), createVNode("div", { children: [createVNode("p", {
										class: "font-semibold text-sm mb-1",
										children: "等待审核"
									}), createVNode("p", {
										class: "text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed",
										children: "确认信息无误后会尽快添加您的友链"
									})] })]
								})
							]
						})]
					})
				})]
			}), createVNode("div", {
				class: "mt-4 rounded-2xl border border-(--line-divider) overflow-hidden",
				children: createVNode("div", {
					class: "p-5 sm:p-6",
					children: [createVNode("h3", {
						class: "text-base font-bold mb-4 flex items-center gap-2",
						children: [createVNode("svg", {
							class: "w-4.5 h-4.5 text-(--primary)",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})
						}), createVNode(_components.p, { children: "注意事项" })]
					}), createVNode("div", {
						class: "space-y-3 text-sm text-neutral-600 dark:text-neutral-400",
						children: notes.map((item) => createVNode("div", {
							class: "flex items-baseline gap-2.5",
							children: [createVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-(--primary) shrink-0 translate-y-[-2px]" }), createVNode("p", { children: [
								createVNode("strong", {
									class: "text-neutral-800 dark:text-neutral-200",
									children: item.title
								}),
								"：",
								item.content
							] })]
						}))
					})]
				})
			})]
		}),
		createVNode(_components.script, {
			type: "text/javascript",
			children: "/*\n * 图表 pan-zoom / 全屏交互脚本（共享）\n *\n * 为 .diagram-container 提供：\n *   - 拖拽平移（鼠标，触摸设备禁用拖拽避免干扰滚动）\n *   - 缩放控制栏（+、−、重置、全屏）\n *   - 双击放大/重置\n *   - 全屏 overlay（带独立缩放、Escape 关闭、自适应暗色背景）\n *   - 响应 astro:page-load（Swup）页面切换\n */\n(() => {\n	if (window._diagramPanZoomInit) return;\n	window._diagramPanZoomInit = true;\n\n	const MIN_SCALE = 0.5;\n	const MAX_SCALE = 5;\n	const SCALE_STEP = 1.2;\n	const overlays = new Set();\n\n	/** 根据当前主题选择可见的 SVG/img 目标 */\n	function selectTarget(container) {\n		var isDark = document.documentElement.classList.contains(\"dark\");\n		var lightEl = container.querySelector(\".mermaid-svg-light svg\");\n		var darkEl = container.querySelector(\".mermaid-svg-dark svg\");\n		if (lightEl && darkEl) return isDark ? darkEl : lightEl;\n		return container.querySelector(\"svg, img, .diagram-panzoom-target\");\n	}\n\n	function initInteraction(container) {\n		if (container.dataset.pzInit === \"true\") return;\n		container.dataset.pzInit = \"true\";\n\n		// 收集所有可操作的目标元素（Mermaid 有 light+dark 两个 SVG）\n		var targets = Array.from(\n			container.querySelectorAll(\n				\".mermaid-svg-light svg, .mermaid-svg-dark svg\",\n			),\n		);\n		if (targets.length === 0) {\n			const single = container.querySelector(\n				\"svg, img, .diagram-panzoom-target\",\n			);\n			if (single) targets = [single];\n		}\n		if (targets.length === 0) return;\n\n		// 动态获取当前可见目标（主题切换后自动跟随）\n		const getActiveTarget = () => selectTarget(container) || targets[0];\n\n		const state = { scale: 1, tx: 0, ty: 0 };\n		const apply = () => {\n			targets.forEach((t) => {\n				t.style.transformOrigin = \"center center\";\n				t.style.transform = `translate(${state.tx}px,${state.ty}px) scale(${state.scale})`;\n			});\n		};\n		const clamp = (s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));\n		const reset = () => {\n			state.scale = 1;\n			state.tx = 0;\n			state.ty = 0;\n			apply();\n		};\n		const zoomBy = (f, ox, oy) => {\n			const prev = state.scale;\n			const next = clamp(prev * f);\n			if (next === prev) return;\n			if (typeof ox === \"number\" && typeof oy === \"number\") {\n				const r = getActiveTarget().getBoundingClientRect();\n				const dx = ox - (r.left + r.width / 2);\n				const dy = oy - (r.top + r.height / 2);\n				const ratio = next / prev;\n				state.tx -= dx * (ratio - 1);\n				state.ty -= dy * (ratio - 1);\n			}\n			state.scale = next;\n			apply();\n		};\n\n		// 控制栏\n		const controls = document.createElement(\"div\");\n		controls.className = \"diagram-controls\";\n		[\n			[\"+\", \"放大\", () => zoomBy(SCALE_STEP)],\n			[\"−\", \"缩小\", () => zoomBy(1 / SCALE_STEP)],\n			[\"↺\", \"重置\", reset],\n			[\"⛶\", \"全屏\", () => openFullscreen(container)],\n		].forEach((b) => {\n			const el = document.createElement(\"button\");\n			el.type = \"button\";\n			el.className = \"diagram-ctrl-btn\";\n			el.textContent = b[0];\n			el.title = b[1];\n			el.addEventListener(\"click\", (e) => {\n				e.preventDefault();\n				e.stopPropagation();\n				b[2]();\n			});\n			controls.appendChild(el);\n		});\n		container.appendChild(controls);\n\n		// 拖拽平移\n		let dragging = false;\n		let sx = 0;\n		let sy = 0;\n		let stx = 0;\n		let sty = 0;\n		container.addEventListener(\"pointerdown\", (e) => {\n			if (e.pointerType === \"touch\") return;\n			if (e.button !== 0) return;\n			if (e.target.closest(\".diagram-controls\")) return;\n			dragging = true;\n			sx = e.clientX;\n			sy = e.clientY;\n			stx = state.tx;\n			sty = state.ty;\n			container.setPointerCapture?.(e.pointerId);\n			container.style.cursor = \"grabbing\";\n		});\n		container.addEventListener(\"pointermove\", (e) => {\n			if (!dragging) return;\n			state.tx = stx + (e.clientX - sx);\n			state.ty = sty + (e.clientY - sy);\n			apply();\n		});\n		const endDrag = (e) => {\n			if (!dragging) return;\n			dragging = false;\n			container.releasePointerCapture?.(e.pointerId);\n			container.style.cursor = \"\";\n		};\n		container.addEventListener(\"pointerup\", endDrag);\n		container.addEventListener(\"pointercancel\", endDrag);\n\n		// 双击\n		container.addEventListener(\"dblclick\", (e) => {\n			if (e.target.closest(\".diagram-controls\")) return;\n			if (state.scale !== 1) reset();\n			else zoomBy(SCALE_STEP * SCALE_STEP, e.clientX, e.clientY);\n		});\n\n		apply();\n	}\n\n	function openFullscreen(container) {\n		// 重新选择当前主题对应的目标元素\n		var currentTarget = selectTarget(container);\n		if (!currentTarget) return;\n\n		const overlay = document.createElement(\"div\");\n		overlay.className = \"diagram-fullscreen-overlay\";\n\n		const content = document.createElement(\"div\");\n		content.className = \"diagram-fs-content\";\n\n		const clone = currentTarget.cloneNode(true);\n		clone.style.transform = \"\";\n		content.appendChild(clone);\n\n		const fsControls = document.createElement(\"div\");\n		fsControls.className = \"diagram-fs-controls\";\n\n		const st = { scale: 1, tx: 0, ty: 0 };\n		const apply = () => {\n			clone.style.transformOrigin = \"center center\";\n			clone.style.transform = `translate(${st.tx}px,${st.ty}px) scale(${st.scale})`;\n		};\n		const zoom = (f, ox, oy) => {\n			const prev = st.scale;\n			const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * f));\n			if (next === prev) return;\n			if (typeof ox === \"number\" && typeof oy === \"number\") {\n				const r = clone.getBoundingClientRect();\n				const dx = ox - (r.left + r.width / 2);\n				const dy = oy - (r.top + r.height / 2);\n				const ratio = next / prev;\n				st.tx -= dx * (ratio - 1);\n				st.ty -= dy * (ratio - 1);\n			}\n			st.scale = next;\n			apply();\n		};\n		const rst = () => {\n			st.scale = 1;\n			st.tx = 0;\n			st.ty = 0;\n			apply();\n		};\n		const close = () => {\n			document.removeEventListener(\"keydown\", onKey);\n			overlay.remove();\n			overlays.delete(overlay);\n		};\n		const onKey = (e) => {\n			if (e.key === \"Escape\") close();\n		};\n\n		[\n			[\"+\", \"放大\", () => zoom(SCALE_STEP)],\n			[\"−\", \"缩小\", () => zoom(1 / SCALE_STEP)],\n			[\"↺\", \"重置\", rst],\n			[\"✕\", \"关闭\", close],\n		].forEach((b) => {\n			const el = document.createElement(\"button\");\n			el.type = \"button\";\n			el.className = \"diagram-ctrl-btn\";\n			el.textContent = b[0];\n			el.title = b[1];\n			el.addEventListener(\"click\", (e) => {\n				e.preventDefault();\n				e.stopPropagation();\n				b[2]();\n			});\n			fsControls.appendChild(el);\n		});\n\n		// 全屏滚轮缩放\n		content.addEventListener(\n			\"wheel\",\n			(e) => {\n				e.preventDefault();\n				zoom(e.deltaY < 0 ? SCALE_STEP : 1 / SCALE_STEP, e.clientX, e.clientY);\n			},\n			{ passive: false },\n		);\n\n		// 全屏拖拽平移（支持鼠标和触摸）\n		let fdrag = false;\n		let fsx = 0;\n		let fsy = 0;\n		let fstx = 0;\n		let fsty = 0;\n		content.addEventListener(\"pointerdown\", (e) => {\n			if (e.target.closest(\".diagram-fs-controls\")) return;\n			// 多指触摸时由 pinch 处理，跳过单指拖拽\n			if (e.pointerType === \"touch\" && e.isPrimary === false) return;\n			fdrag = true;\n			fsx = e.clientX;\n			fsy = e.clientY;\n			fstx = st.tx;\n			fsty = st.ty;\n			content.setPointerCapture?.(e.pointerId);\n		});\n		content.addEventListener(\"pointermove\", (e) => {\n			if (!fdrag) return;\n			st.tx = fstx + (e.clientX - fsx);\n			st.ty = fsty + (e.clientY - fsy);\n			apply();\n		});\n		const fEnd = (e) => {\n			if (!fdrag) return;\n			fdrag = false;\n			content.releasePointerCapture?.(e.pointerId);\n		};\n		content.addEventListener(\"pointerup\", fEnd);\n		content.addEventListener(\"pointercancel\", fEnd);\n\n		// 双指缩放（pinch-to-zoom），基于手势初始状态计算避免闪烁\n		let pinchDist = 0;\n		let pinchScale = 1;\n		let pinchTx = 0;\n		let pinchTy = 0;\n		let pinchCx = 0;\n		let pinchCy = 0;\n		content.addEventListener(\n			\"touchstart\",\n			(e) => {\n				if (e.touches.length === 2) {\n					e.preventDefault();\n					const t0 = e.touches[0];\n					const t1 = e.touches[1];\n					pinchDist = Math.hypot(\n						t1.clientX - t0.clientX,\n						t1.clientY - t0.clientY,\n					);\n					pinchScale = st.scale;\n					pinchTx = st.tx;\n					pinchTy = st.ty;\n					pinchCx = (t0.clientX + t1.clientX) / 2;\n					pinchCy = (t0.clientY + t1.clientY) / 2;\n				}\n			},\n			{ passive: false },\n		);\n		content.addEventListener(\n			\"touchmove\",\n			(e) => {\n				if (e.touches.length === 2) {\n					e.preventDefault();\n					const t0 = e.touches[0];\n					const t1 = e.touches[1];\n					const newDist = Math.hypot(\n						t1.clientX - t0.clientX,\n						t1.clientY - t0.clientY,\n					);\n					const newScale = Math.min(\n						MAX_SCALE,\n						Math.max(MIN_SCALE, pinchScale * (newDist / pinchDist)),\n					);\n					const ratio = newScale / pinchScale;\n					st.scale = newScale;\n					st.tx = pinchCx - ratio * (pinchCx - pinchTx);\n					st.ty = pinchCy - ratio * (pinchCy - pinchTy);\n					apply();\n				}\n			},\n			{ passive: false },\n		);\n\n		// 背景点击关闭\n		overlay.addEventListener(\"click\", (e) => {\n			if (e.target === overlay) close();\n		});\n\n		overlay.appendChild(content);\n		overlay.appendChild(fsControls);\n		document.body.appendChild(overlay);\n		overlays.add(overlay);\n		document.addEventListener(\"keydown\", onKey);\n	}\n\n	function closeAll() {\n		overlays.forEach((o) => {\n			o.remove();\n		});\n		overlays.clear();\n	}\n\n	function initAll() {\n		document.querySelectorAll(\".diagram-container\").forEach((c) => {\n			initInteraction(c);\n		});\n	}\n\n	// 暴露 re-init 入口，供 PlantUML 重试等场景调用\n	window._diagramPanZoomReinit = (container) => {\n		// 清理旧的控制栏，避免重复（类名与 utils/diagramConstants.js 保持同步）\n		const oldControls = container.querySelector(\".diagram-controls\");\n		if (oldControls) oldControls.remove();\n		container.dataset.pzInit = \"false\";\n		initInteraction(container);\n	};\n\n	document.addEventListener(\"astro:before-preparation\", closeAll);\n	document.addEventListener(\"astro:page-load\", () => {\n		closeAll();\n		initAll();\n	});\n	// 加密文章解密后，内容注入 DOM，需要重新初始化 pan-zoom\n	document.addEventListener(\"password:decrypted\", () => {\n		setTimeout(initAll, 100);\n	});\n	if (document.readyState === \"loading\") {\n		document.addEventListener(\"DOMContentLoaded\", initAll, { once: true });\n	} else {\n		initAll();\n	}\n})();\n"
		})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, {
		...props,
		children: createVNode(_createMdxContent, { ...props })
	}) : _createMdxContent(props);
}
var url = "src/content/spec/friends.mdx/";
var file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/spec/friends.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/spec/friends.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, notes, site, url };
