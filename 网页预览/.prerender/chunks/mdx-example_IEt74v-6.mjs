import { B as createVNode, t as __astro_tag_component__, u as Fragment } from "./server_DCu-nPcH.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
//#region src/content/posts/mdx-example.mdx
var frontmatter = {
	"title": "MDX 格式文章示例",
	"published": "1970-01-02T00:00:00.000Z",
	"description": "这是一个 MDX 格式的示例文章，展示了如何在 Markdown 中使用 JSX。",
	"tags": [
		"MDX",
		"Markdown",
		"文章示例"
	],
	"category": "文章示例",
	"image": "api",
	"slug": "mdx-example",
	"minutes": 2,
	"words": 374,
	"excerpt": "这是一个图标组件："
};
function getHeadings() {
	return [
		{
			"depth": 2,
			"slug": "markdown-和-mdx-的区别",
			"text": "Markdown 和 MDX 的区别#"
		},
		{
			"depth": 2,
			"slug": "使用组件",
			"text": "使用组件#"
		},
		{
			"depth": 2,
			"slug": "使用-jsx",
			"text": "使用 JSX#"
		},
		{
			"depth": 2,
			"slug": "简单的变量导出",
			"text": "简单的变量导出#"
		}
	];
}
var year = (/* @__PURE__ */ new Date()).getFullYear();
function _createMdxContent(props) {
	const _components = {
		a: "a",
		button: "button",
		code: "code",
		div: "div",
		figcaption: "figcaption",
		figure: "figure",
		h2: "h2",
		li: "li",
		link: "link",
		p: "p",
		path: "path",
		pre: "pre",
		script: "script",
		section: "section",
		span: "span",
		svg: "svg",
		table: "table",
		tbody: "tbody",
		td: "td",
		th: "th",
		thead: "thead",
		tr: "tr",
		ul: "ul",
		...props.components
	};
	return createVNode(Fragment, { children: [
		createVNode(_components.div, {
			class: "callout",
			"data-callout": "tip",
			"data-collapsible": "false",
			children: [createVNode(_components.div, {
				class: "callout-title",
				children: [createVNode(_components.div, {
					class: "callout-title-icon",
					"aria-hidden": "true",
					children: createVNode(_components.svg, {
						xmlns: "http://www.w3.org/2000/svg",
						width: "1em",
						height: "1em",
						viewBox: "0 0 16 16",
						fill: "currentColor",
						children: createVNode(_components.path, { d: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" })
					})
				}), createVNode(_components.div, {
					class: "callout-title-text",
					children: "Tip"
				})]
			}), createVNode(_components.div, {
				class: "callout-content",
				children: createVNode(_components.p, { children: [
					createVNode(_components.a, {
						href: "https://github.com/CuteLeaf/Firefly",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Firefly"
					}),
					" 支持 ",
					createVNode(_components.code, { children: "MDX" }),
					" 和 ",
					createVNode(_components.code, { children: "Markdown" }),
					" 两种类型的文章，你可以在文章中混合使用两种格式，如果没有特别复杂内容和需求，推荐使用 Markdown 格式就够了。"
				] })
			})]
		}),
		"\n",
		createVNode(_components.section, { children: [
			createVNode(_components.h2, {
				id: "markdown-和-mdx-的区别",
				children: ["Markdown 和 MDX 的区别", createVNode(_components.a, {
					class: "anchor",
					href: "#markdown-和-mdx-的区别",
					children: createVNode(_components.span, {
						class: "anchor-icon",
						"data-pagefind-ignore": true,
						children: "#"
					})
				})]
			}),
			createVNode(_components.ul, { children: [
				"\n",
				createVNode(_components.li, { children: "Markdown (MD) 是一种轻量级标记语言，允许用户使用纯文本格式编写文档，然后将其转换为格式化的HTML。它因其简洁易用的语法而广受欢迎，特别适合编写文档和博客文章。" }),
				"\n",
				createVNode(_components.li, { children: "MDX 是一种扩展了 Markdown 语法的格式，允许在 Markdown 文档中无缝地插入 JSX 代码。通过 MDX，用户可以在文档中嵌入 React 组件，从而实现更丰富的交互性和动态性。" }),
				"\n"
			] }),
			"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
			createVNode(_components.table, { children: [createVNode(_components.thead, { children: createVNode(_components.tr, { children: [
				createVNode(_components.th, {
					style: { textAlign: "left" },
					children: "特性"
				}),
				createVNode(_components.th, {
					style: { textAlign: "left" },
					children: "Markdown"
				}),
				createVNode(_components.th, {
					style: { textAlign: "left" },
					children: "MDX"
				})
			] }) }), createVNode(_components.tbody, { children: [
				createVNode(_components.tr, { children: [
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "基础语法"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持 (CommonMark)"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持 (CommonMark)"
					})
				] }),
				createVNode(_components.tr, { children: [
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "HTML 标签"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持 (作为 JSX)"
					})
				] }),
				createVNode(_components.tr, { children: [
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "组件导入"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "不支持"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持 (import)"
					})
				] }),
				createVNode(_components.tr, { children: [
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "动态数据"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "不支持"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "支持 (JS 表达式)"
					})
				] }),
				createVNode(_components.tr, { children: [
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "样式定制"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "有限 (class/style)"
					}),
					createVNode(_components.td, {
						style: { textAlign: "left" },
						children: "灵活 (className/CSS-in-JS)"
					})
				] })
			] })] })
		] }),
		"\n",
		createVNode(_components.section, { children: [
			createVNode(_components.h2, {
				id: "使用组件",
				children: ["使用组件", createVNode(_components.a, {
					class: "anchor",
					href: "#使用组件",
					children: createVNode(_components.span, {
						class: "anchor-icon",
						"data-pagefind-ignore": true,
						children: "#"
					})
				})]
			}),
			createVNode(_components.p, { children: "这是一个图标组件：" }),
			createVNode(_components.div, {
				class: "expressive-code",
				children: [
					createVNode(_components.link, {
						rel: "stylesheet",
						href: "/_astro/ec.gtzw0.css"
					}),
					createVNode(_components.script, {
						type: "module",
						src: "/_astro/ec.xb3ii.js"
					}),
					createVNode(_components.figure, {
						class: "frame",
						children: [
							createVNode(_components.figcaption, { class: "header" }),
							createVNode(_components.pre, {
								"data-language": "plaintext",
								children: createVNode(_components.code, { children: [
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "1"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "import { Icon } from 'astro-icon/components'"
											})
										})]
									}),
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "2"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: "\n"
										})]
									}),
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "3"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "<div class=\"flex items-center gap-2 my-4\">"
											})
										})]
									}),
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "4"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: [createVNode(_components.span, {
												class: "indent",
												children: createVNode(_components.span, {
													style: {
														"--0": "#abb2bf",
														"--1": "#383a42"
													},
													children: "  "
												})
											}), createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "<Icon name=\"fa7-solid:rocket\" class=\"text-4xl text-red-500\" />"
											})]
										})]
									}),
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "5"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: [createVNode(_components.span, {
												class: "indent",
												children: createVNode(_components.span, {
													style: {
														"--0": "#abb2bf",
														"--1": "#383a42"
													},
													children: "  "
												})
											}), createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "<span>火箭发射！</span>"
											})]
										})]
									}),
									createVNode(_components.div, {
										class: "ec-line",
										children: [createVNode(_components.div, {
											class: "gutter",
											children: createVNode(_components.div, {
												class: "ln",
												"aria-hidden": "true",
												children: "6"
											})
										}), createVNode(_components.div, {
											class: "code",
											children: createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "</div>"
											})
										})]
									})
								] })
							}),
							createVNode(_components.div, {
								class: "copy",
								children: [createVNode(_components.div, { "aria-live": "polite" }), createVNode(_components.button, {
									title: "Copy to clipboard",
									"data-copied": "Copied!",
									"data-code": "import { Icon } from 'astro-icon/components'<div class=\"flex items-center gap-2 my-4\">  <Icon name=\"fa7-solid:rocket\" class=\"text-4xl text-red-500\" />  <span>火箭发射！</span></div>",
									children: createVNode(_components.div, {})
								})]
							})
						]
					})
				]
			}),
			createVNode("div", {
				class: "flex items-center gap-2 my-4",
				children: [createVNode($$Icon, {
					name: "fa7-solid:rocket",
					class: "text-4xl text-red-500"
				}), createVNode("span", { children: "火箭发射！" })]
			})
		] }),
		"\n",
		createVNode(_components.section, { children: [
			createVNode(_components.h2, {
				id: "使用-jsx",
				children: ["使用 JSX", createVNode(_components.a, {
					class: "anchor",
					href: "#使用-jsx",
					children: createVNode(_components.span, {
						class: "anchor-icon",
						"data-pagefind-ignore": true,
						children: "#"
					})
				})]
			}),
			createVNode(_components.p, { children: "你也可以直接写 HTML/JSX：" }),
			createVNode(_components.div, {
				class: "expressive-code",
				children: createVNode(_components.figure, {
					class: "frame",
					children: [
						createVNode(_components.figcaption, { class: "header" }),
						createVNode(_components.pre, {
							"data-language": "plaintext",
							children: createVNode(_components.code, { children: [
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "1"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: createVNode(_components.span, {
											style: {
												"--0": "#abb2bf",
												"--1": "#383a42"
											},
											children: "<div className=\"p-4 bg-blue-100 dark:bg-blue-900 rounded-lg my-4\">"
										})
									})]
								}),
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "2"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: [createVNode(_components.span, {
											class: "indent",
											children: createVNode(_components.span, {
												style: {
													"--0": "#abb2bf",
													"--1": "#383a42"
												},
												children: "  "
											})
										}), createVNode(_components.span, {
											style: {
												"--0": "#abb2bf",
												"--1": "#383a42"
											},
											children: "这是一个自定义样式的 div 块，使用了 Tailwind CSS 类。"
										})]
									})]
								}),
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "3"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: createVNode(_components.span, {
											style: {
												"--0": "#abb2bf",
												"--1": "#383a42"
											},
											children: "</div>"
										})
									})]
								})
							] })
						}),
						createVNode(_components.div, {
							class: "copy",
							children: [createVNode(_components.div, { "aria-live": "polite" }), createVNode(_components.button, {
								title: "Copy to clipboard",
								"data-copied": "Copied!",
								"data-code": "<div className=\"p-4 bg-blue-100 dark:bg-blue-900 rounded-lg my-4\">  这是一个自定义样式的 div 块，使用了 Tailwind CSS 类。</div>",
								children: createVNode(_components.div, {})
							})]
						})
					]
				})
			}),
			createVNode("div", {
				className: "p-4 bg-blue-100 dark:bg-blue-900 rounded-lg my-4",
				children: createVNode(_components.p, { children: "这是一个自定义样式的 div 块，使用了 Tailwind CSS 类。" })
			})
		] }),
		"\n",
		createVNode(_components.section, { children: [
			createVNode(_components.h2, {
				id: "简单的变量导出",
				children: ["简单的变量导出", createVNode(_components.a, {
					class: "anchor",
					href: "#简单的变量导出",
					children: createVNode(_components.span, {
						class: "anchor-icon",
						"data-pagefind-ignore": true,
						children: "#"
					})
				})]
			}),
			createVNode(_components.div, {
				class: "expressive-code",
				children: createVNode(_components.figure, {
					class: "frame",
					children: [
						createVNode(_components.figcaption, { class: "header" }),
						createVNode(_components.pre, {
							"data-language": "plaintext",
							children: createVNode(_components.code, { children: [
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "1"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: createVNode(_components.span, {
											style: {
												"--0": "#abb2bf",
												"--1": "#383a42"
											},
											children: "export const year = new Date().getFullYear()"
										})
									})]
								}),
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "2"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: "\n"
									})]
								}),
								createVNode(_components.div, {
									class: "ec-line",
									children: [createVNode(_components.div, {
										class: "gutter",
										children: createVNode(_components.div, {
											class: "ln",
											"aria-hidden": "true",
											children: "3"
										})
									}), createVNode(_components.div, {
										class: "code",
										children: createVNode(_components.span, {
											style: {
												"--0": "#abb2bf",
												"--1": "#383a42"
											},
											children: "今年是 {year} 年。"
										})
									})]
								})
							] })
						}),
						createVNode(_components.div, {
							class: "copy",
							children: [createVNode(_components.div, { "aria-live": "polite" }), createVNode(_components.button, {
								title: "Copy to clipboard",
								"data-copied": "Copied!",
								"data-code": "export const year = new Date().getFullYear()今年是 {year} 年。",
								children: createVNode(_components.div, {})
							})]
						})
					]
				})
			}),
			createVNode(_components.p, { children: [
				"今年是 ",
				year,
				" 年。"
			] }),
			createVNode(_components.p, { children: ["更多信息，请查看 ", createVNode(_components.a, {
				href: "https://mdxjs.com/",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "MDX 文档"
			})] })
		] }),
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
var url = "src/content/posts/mdx-example.mdx/";
var file = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/mdx-example.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/content/posts/mdx-example.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url, year };
