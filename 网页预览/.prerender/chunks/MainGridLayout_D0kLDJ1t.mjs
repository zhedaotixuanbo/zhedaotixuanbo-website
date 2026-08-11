import { M as defineScriptVars, V as unescapeHTML, W as createAstro, _ as renderTemplate, c as renderComponent, j as addAttribute, k as maybeRenderHead, m as renderSlot, n as defineStyleVars, u as Fragment } from "./server_DCu-nPcH.mjs";
import { t as createComponent } from "./astro-component_DoD1nhag.mjs";
import { _ as backgroundWallpaper, b as renderScript, c as SYSTEM_MODE, f as $$Picture, g as dynamicConfig, h as expressiveCodeConfig, i as DARK_MODE, m as musicPlayerConfig, n as getBackgroundImages, o as LIGHT_MODE, p as $$Image, r as isHomePage, s as MAIN_PANEL_OVERLAPS_BANNER_HEIGHT, t as $$Layout, v as templateEnter, y as templateExit } from "./Layout_Dho96Xl1.mjs";
import "./compiler_DNPYZl4E.mjs";
import { t as $$Icon } from "./components_BoxsvzZO.mjs";
import { a as getTagUrl, c as i18n, d as displaySettingsConfig, f as I18nKey, i as getSearchUrl, l as siteConfig, s as url, u as navBarConfig } from "./url-utils_DChKFQtU.mjs";
import { t as profileConfig } from "./profileConfig_ODElNiOz.mjs";
import { a as getTagList, i as getSortedPostsList, r as getSortedPosts, t as getCategoryList } from "./content-utils_58mqkDzV.mjs";
import { n as formatDateToYYYYMMDD, r as formatDynamicDate, t as formatDateI18nWithTime } from "./date-utils_BBaum0Sr.mjs";
import { createRequire } from "node:module";
import { onMount } from "svelte";
import fs, { readFileSync } from "node:fs";
import * as path$1 from "node:path";
import path from "node:path";
import * as $ from "svelte/internal/server";
import ci from "ci-info";
//#region src/config/announcementConfig.ts
var announcementConfig = {
	title: "公告",
	content: "欢迎来到我的博客！这是一则示例公告。",
	closable: true,
	link: {
		enable: true,
		text: "了解更多",
		url: "/about/",
		external: false
	}
};
//#endregion
//#region src/config/coverImageConfig.ts
/**
* 文章封面图配置
*
* enableInPost - 是否在文章详情页显示封面图
* enableInPostOverlay - 是否使用标题和元数据叠加在封面上的布局
* showLoading - 是否显示封面图加载动画
*
* 随机封面图使用说明：
* 1. 在文章的 Frontmatter 中添加 image: "api" 即可使用随机图功能
* 2. 系统会依次尝试所有配置的 API，全部失败后保留 LQIP 并显示错误提示
*
* // 文章 Frontmatter 示例：
* ---
* title: 文章标题
* image: "api"
* ---
*/
var coverImageConfig = {
	enableInPost: true,
	enableInPostOverlay: false,
	showLoading: false,
	randomCoverImage: {
		enable: false,
		apis: [
			"https://t.alcy.cc/pc",
			"https://www.dmoe.cc/random.php",
			"https://uapis.cn/api/v1/random/image?category=acg&type=pc"
		]
	}
};
//#endregion
//#region src/config/effectsConfig.ts
var sakuraConfig = {
	enable: false,
	sakuraNum: 21,
	limitTimes: -1,
	size: {
		min: .5,
		max: 1.1
	},
	opacity: {
		min: .3,
		max: .9
	},
	speed: {
		horizontal: {
			min: -1.7,
			max: -1.2
		},
		vertical: {
			min: 1.5,
			max: 2.2
		},
		rotation: .03,
		fadeSpeed: .03
	},
	zIndex: 100
};
//#endregion
//#region src/config/footerConfig.ts
var footerConfig = { enable: false };
//#endregion
//#region src/config/licenseConfig.ts
var licenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
	icon: ""
};
//#endregion
//#region src/config/pioConfig.ts
var spineModelConfig = {
	enable: false,
	model: {
		path: "/pio/models/spine/firefly/1310.json",
		scale: 1,
		x: 0,
		y: 0
	},
	position: {
		corner: "bottom-left",
		offsetX: 0,
		offsetY: 0
	},
	size: {
		width: 135,
		height: 165
	},
	interactive: {
		enabled: true,
		clickAnimations: [
			"emoji_0",
			"emoji_1",
			"emoji_2",
			"emoji_3",
			"emoji_4",
			"emoji_5"
		],
		clickMessages: [
			"你好呀！我是流萤~",
			"今天也要加油哦！✨",
			"想要一起去看星空吗？🌟",
			"记得要好好休息呢~",
			"有什么想对我说的吗？💫",
			"让我们一起探索未知的世界吧！🚀",
			"每一颗星星都有自己的故事~⭐",
			"希望能带给你温暖和快乐！💖"
		],
		messageDisplayTime: 3e3,
		idleAnimations: [
			"idle",
			"emoji_0",
			"emoji_1",
			"emoji_3",
			"emoji_4"
		],
		idleInterval: 8e3
	},
	responsive: {
		hideOnMobile: true,
		mobileBreakpoint: 768
	},
	zIndex: 1e3,
	opacity: 1
};
var live2dWidgetConfig = {
	enable: false,
	model: [{
		path: "/pio/models/live2d/snow_miku/model.json",
		volume: 0,
		scale: 1,
		x: 0,
		y: 0
	}, {
		path: "https://model.hacxy.cn/cat-black/model.json",
		volume: 0,
		scale: 1,
		x: 0,
		y: 0
	}],
	position: "bottom-left",
	size: {
		width: 200,
		height: 200
	},
	primaryColor: "var(--l2d-msg-bg)",
	transitionDuration: 1500,
	transitionType: "slide",
	menus: {
		items: [
			{
				icon: "mdi:home",
				label: "返回主页",
				action: "home"
			},
			{
				icon: "mdi:arrow-up",
				label: "返回顶部",
				action: "scrollToTop"
			},
			{
				icon: "mdi:bed",
				label: "休眠",
				action: "sleep"
			},
			{
				icon: "mdi:swap-horizontal",
				label: "切换模型",
				action: "switchModel"
			},
			{
				icon: "mdi:github",
				label: "GitHub",
				action: "github"
			}
		],
		align: "right"
	},
	tips: {
		enable: true,
		welcomeMessage: ["你好呀！", "欢迎来到我的世界！"],
		messages: [
			"有什么需要帮助的吗？",
			"今天天气真不错呢！",
			"要不要一起玩游戏？",
			"记得按时休息哦！"
		],
		duration: 3e3,
		interval: 6e3,
		offset: {
			x: 0,
			y: 0
		}
	},
	responsive: {
		hideOnMobile: true,
		mobileBreakpoint: 768
	}
};
//#endregion
//#region src/config/sidebarConfig.ts
/**
* 侧边栏布局配置
*/
var sidebarLayoutConfig = {
	enable: true,
	position: "both",
	tabletSidebar: "left",
	hideSidebarOnPostPage: false,
	showBothSidebarsOnPostPage: true,
	leftComponents: [
		{
			type: "profile",
			enable: true,
			position: "top",
			showOnPostPage: true
		},
		{
			type: "announcement",
			enable: true,
			position: "top",
			showOnPostPage: true
		},
		{
			type: "music",
			enable: true,
			position: "sticky",
			showOnPostPage: true
		},
		{
			type: "categories",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 5 }
		},
		{
			type: "tags",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 10 }
		}
	],
	rightComponents: [
		{
			type: "dynamic",
			enable: true,
			position: "top",
			showOnPostPage: true,
			specificConfig: { dynamic: { limit: 2 } }
		},
		{
			type: "stats",
			enable: true,
			position: "top",
			showOnPostPage: false
		},
		{
			type: "siteInfo",
			enable: true,
			position: "top",
			showOnPostPage: true,
			specificConfig: { siteInfo: { unknownBuildPlatform: "Unknown CI" } }
		},
		{
			type: "calendar",
			enable: true,
			showTitle: false,
			position: "sticky",
			showOnPostPage: false,
			specificConfig: { calendar: { showHeatmap: true } }
		},
		{
			type: "sidebarToc",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			hideOnNonPostPage: true
		},
		{
			type: "advertisement",
			enable: false,
			showTitle: false,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { ad: {
				image: {
					src: "/assets/images/ad/ad1.webp",
					alt: "广告横幅",
					link: "https://haoka.lot-ml.com/plugreg.html?agentid=1423316",
					external: true
				},
				closable: false,
				displayCount: -1,
				padding: { all: "1rem" }
			} }
		},
		{
			type: "advertisement",
			enable: false,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { ad: {
				title: "支持博主",
				content: "如果您觉得本站内容对您有帮助，欢迎支持我们的创作！您的支持是我们持续更新的动力。",
				link: {
					text: "支持一下",
					url: "about/",
					external: false
				},
				closable: false,
				displayCount: -1
			} }
		}
	],
	mobileBottomComponents: [
		{
			type: "profile",
			enable: true,
			showOnPostPage: true
		},
		{
			type: "announcement",
			enable: true,
			showOnPostPage: true
		},
		{
			type: "categories",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 5 }
		},
		{
			type: "tags",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 10 }
		},
		{
			type: "dynamic",
			enable: true,
			showOnPostPage: true,
			specificConfig: { dynamic: { limit: 2 } }
		},
		{
			type: "stats",
			enable: true,
			showOnPostPage: true
		},
		{
			type: "siteInfo",
			enable: true,
			showOnPostPage: true,
			specificConfig: { siteInfo: { unknownBuildPlatform: "Unknown CI" } }
		}
	]
};
//#endregion
//#region src/components/features/Live2DWidget.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Live2DWidget = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Live2DWidget;
	const { config } = Astro.props;
	const models = Array.isArray(config.model) ? config.model : [config.model];
	const resolvePath = (p) => /^https?:\/\//.test(p) ? p : url(p);
	const modelConfigs = models.map((m) => ({
		path: resolvePath(m.path),
		...m.volume !== void 0 && { volume: m.volume },
		...m.scale !== void 0 && { scale: m.scale },
		...(m.x !== void 0 || m.y !== void 0) && { offset: [m.x ?? 0, m.y ?? 0] }
	}));
	function serializeMenus(menus) {
		if (!menus) return {};
		const serialize = (items) => items.map(({ icon, label, action }) => ({
			icon,
			label,
			action
		}));
		const result = {};
		if (menus.items) result.items = serialize(menus.items);
		if (menus.extraItems) result.extraItems = serialize(menus.extraItems);
		if (menus.align) result.align = menus.align;
		return result;
	}
	return renderTemplate`${maybeRenderHead($$result)}<div id="l2d-widget-container" style="position: fixed; z-index: 999;"${addAttribute(JSON.stringify(modelConfigs), "data-models")}${addAttribute(config.position || "bottom-left", "data-position")}${addAttribute(JSON.stringify(config.size || 300), "data-size")}${addAttribute(config.primaryColor || "", "data-primary-color")}${addAttribute(config.transitionDuration?.toString() || "", "data-transition-duration")}${addAttribute(config.transitionType || "", "data-transition-type")}${addAttribute(JSON.stringify(serializeMenus(config.menus)), "data-menus")}${addAttribute(JSON.stringify(config.tips || {}), "data-tips")}${addAttribute(JSON.stringify(config.responsive || {}), "data-responsive")}></div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/Live2DWidget.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/Live2DWidget.astro", void 0);
//#endregion
//#region src/components/common/PioMessageBox.astro
var $$PioMessageBox = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/PioMessageBox.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/PioMessageBox.astro", void 0);
//#endregion
//#region src/components/features/SpineModel.astro
var $$SpineModel = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<!-- Spine Web Player CSS 将在 script 中动态加载 -->${spineModelConfig.enable && renderTemplate`${maybeRenderHead($$result)}<div id="spine-model-container"${addAttribute(`
      position: fixed;
      ${spineModelConfig.position.corner.includes("right") ? "right" : "left"}: ${spineModelConfig.position.offsetX}px;
      ${spineModelConfig.position.corner.includes("top") ? "top" : "bottom"}: ${spineModelConfig.position.offsetY}px;
      width: ${spineModelConfig.size.width}px;
      height: ${spineModelConfig.size.height}px;
      pointer-events: auto;
      z-index: 1000;
    `, "style")}><div id="spine-player-container" style="width: 100%; height: 100%;"></div><div id="spine-error" style="display: none;"></div></div>`}<!-- 引入消息框组件 -->${spineModelConfig.enable && renderTemplate`${renderComponent($$result, "MessageBox", $$PioMessageBox, {})}`}${spineModelConfig.enable && renderTemplate`<script>(function(){${defineScriptVars({
		spineModelConfig,
		modelPath: url(spineModelConfig.model.path),
		atlasPath: url(spineModelConfig.model.path.replace(".json", ".atlas")),
		cssPath: url("/pio/static/spine-player.min.css"),
		jsPath: url("/pio/static/spine-player.min.js")
	})}
  // 动态加载 Spine CSS（带本地备用）
  function loadSpineCSS() {
    if (!spineModelConfig.enable) return;

    // 检查是否已经加载
    const existingLink = document.querySelector('link[href*="spine-player"]');
    if (existingLink) return;

    // 首先尝试加载 CDN CSS
    const cdnLink = document.createElement("link");
    cdnLink.rel = "stylesheet";
    cdnLink.href =
      "https://unpkg.com/@esotericsoftware/spine-player@4.2.*/dist/spine-player.min.css";

    // 监听加载失败事件，自动回退到本地文件
    cdnLink.onerror = function () {
      console.warn("⚠️ Spine CSS CDN failed, trying local fallback...");

      // 移除失败的 CDN link
      if (cdnLink.parentNode) {
        cdnLink.parentNode.removeChild(cdnLink);
      }

      // 创建本地备用 CSS link
      const localLink = document.createElement("link");
      localLink.rel = "stylesheet";
      localLink.href = cssPath;
      localLink.onerror = function () {
        console.error("❌ Failed to load Spine CSS");
      };

      document.head.appendChild(localLink);
    };

    document.head.appendChild(cdnLink);
  }

  // 消息框功能已移至公共组件 MessageBox.astro
  let isClickProcessing = false; // 防止重复点击的标志
  let lastClickTime = 0; // 记录最后一次点击时间

  // 全局变量，防止重复初始化
  window.spineModelInitialized = window.spineModelInitialized || false;
  window.spinePlayerInstance = window.spinePlayerInstance || null;

  // 消息显示函数 - 使用公共消息框组件
  function showMessage(message) {
    // 使用公共消息框组件
    if (window.showModelMessage) {
      window.showModelMessage(message, {
        containerId: "spine-model-container",
        displayTime: spineModelConfig.interactive.messageDisplayTime || 3000
      });
    }
  }

  // 更新响应式显示
  function updateResponsiveDisplay() {
    if (!spineModelConfig.enable) return;

    const container = document.getElementById("spine-model-container");
    if (!container) return;

    // 检查移动端显示设置
    if (
      spineModelConfig.responsive.hideOnMobile &&
      window.innerWidth <= spineModelConfig.responsive.mobileBreakpoint
    ) {
      container.style.display = "none";
    } else {
      container.style.display = "block";
    }
  }

  // 清理函数
  function cleanupSpineModel() {
    console.log("🧹 Cleaning up existing Spine model...");

    // 清理消息显示（使用公共组件）
    if (window.clearModelMessage) {
      window.clearModelMessage();
    }

    // 清理现有的播放器实例
    if (window.spinePlayerInstance) {
      try {
        if (window.spinePlayerInstance.dispose) {
          window.spinePlayerInstance.dispose();
        }
      } catch (e) {
        console.warn("Error disposing spine player:", e);
      }
      window.spinePlayerInstance = null;
    }

    // 清理容器内容
    const playerContainer = document.getElementById("spine-player-container");
    if (playerContainer) {
      playerContainer.innerHTML = "";
    }

    // 重置初始化标志
    window.spineModelInitialized = false;
  }

  async function initSpineModel() {
    if (!spineModelConfig.enable) return;

    // 检查移动端显示设置，如果隐藏则不加载运行时
    if (
      spineModelConfig.responsive.hideOnMobile &&
      window.innerWidth <= spineModelConfig.responsive.mobileBreakpoint
    ) {
      console.log("📱 Mobile device detected, skipping Spine model initialization");
      const container = document.getElementById("spine-model-container");
      if (container) container.style.display = "none";
      return;
    }

    // 检查是否已经初始化
    if (window.spineModelInitialized) {
      console.log("⏭️ Spine model already initialized, skipping...");
      return;
    }

    console.log("🎯 Initializing Spine Model...");

    // 先清理可能存在的旧实例
    cleanupSpineModel();

    // 首先加载 CSS
    loadSpineCSS();

    // 加载 Spine Web Player 运行时
    const loadSpineRuntime = () => {
      return new Promise((resolve, reject) => {
        if (typeof window.spine !== "undefined") {
          console.log("✅ Spine runtime already loaded");
          resolve();
          return;
        }

        console.log("📦 Loading Spine runtime...");
        const script = document.createElement("script");
        script.src =
          "https://unpkg.com/@esotericsoftware/spine-player@4.2.*/dist/iife/spine-player.min.js";
        script.onload = () => {
          console.log("✅ Spine runtime loaded from CDN");
          resolve();
        };
        script.onerror = (_error) => {
          console.warn("⚠️ CDN failed, trying local fallback...");

          // 尝试本地回退
          const fallbackScript = document.createElement("script");
          fallbackScript.src = jsPath;
          fallbackScript.onload = () => {
            console.log("✅ Spine runtime loaded from local fallback");
            resolve();
          };
          fallbackScript.onerror = () => {
            reject(new Error("Failed to load Spine runtime"));
          };
          document.head.appendChild(fallbackScript);
        };
        document.head.appendChild(script);
      });
    };

    // 等待 Spine 库加载
    const waitForSpine = () => {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;

        const check = () => {
          attempts++;
          if (typeof window.spine !== "undefined" && window.spine.SpinePlayer) {
            console.log("✅ Spine runtime loaded");
            resolve();
          } else if (attempts >= maxAttempts) {
            reject(new Error("Spine runtime loading timeout"));
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    };

    try {
      // 首先加载 Spine 运行时
      await loadSpineRuntime();

      // 然后等待 Spine 对象可用
      await waitForSpine();

      // 标记为已初始化
      window.spineModelInitialized = true;

      // 创建 SpinePlayer
      new window.spine.SpinePlayer("spine-player-container", {
        skeleton: modelPath,
        atlas: atlasPath,
        animation: "idle",
        backgroundColor: "#00000000", // 透明背景
        showControls: false, // 隐藏控件
        alpha: true,
        premultipliedAlpha: false,
        success: (player) => {
          console.log("🎉 Spine model loaded successfully!");

          // 保存播放器实例引用
          window.spinePlayerInstance = player;

          // 构建可用动画索引，避免播放不存在的动画导致报错
          const availableAnimations = new Set(
            (player.skeleton?.data?.animations || [])
              .map((anim) => anim?.name)
              .filter(Boolean)
          );

          const pickRandom = (list) =>
            list[Math.floor(Math.random() * list.length)];

          const configuredClickAnims =
            spineModelConfig.interactive.clickAnimations ||
            (spineModelConfig.interactive.clickAnimation
              ? [spineModelConfig.interactive.clickAnimation]
              : []);

          const configuredIdleAnims =
            spineModelConfig.interactive.idleAnimations || ["idle"];

          const validClickAnims = configuredClickAnims.filter((name) =>
            availableAnimations.has(name)
          );
          const validIdleAnims = configuredIdleAnims.filter((name) =>
            availableAnimations.has(name)
          );

          const fallbackIdleAnim =
            (availableAnimations.has("idle") && "idle") ||
            validIdleAnims[0] ||
            configuredIdleAnims[0] ||
            configuredClickAnims[0] ||
            Array.from(availableAnimations)[0];

          const safeSetAnimation = (name, loop) => {
            if (!name || !availableAnimations.has(name)) {
              return false;
            }
            try {
              player.setAnimation(name, loop);
              return true;
            } catch (e) {
              console.warn(\`Failed to play animation: \${name}\`, e);
              return false;
            }
          };

          // 初始动画兜底，防止默认 idle 不存在
          if (!safeSetAnimation("idle", true) && fallbackIdleAnim) {
            safeSetAnimation(fallbackIdleAnim, true);
          }

          // 输出一次配置校验信息，便于排查模型与配置不一致
          const missingClickAnims = configuredClickAnims.filter(
            (name) => !availableAnimations.has(name)
          );
          if (missingClickAnims.length > 0) {
            console.warn(
              "Spine click animations not found in model:",
              missingClickAnims
            );
          }

          // 初始化完成后设置默认姿态
          setTimeout(() => {
            if (player.skeleton) {
              try {
                player.skeleton.setToSetupPose();
                const physicsMode =
                  window.spine?.Physics?.update ??
                  window.spine?.Physics?.pose ??
                  window.spine?.Physics?.none ??
                  0;
                player.skeleton.updateWorldTransform(physicsMode);
              } catch (e) {
                console.warn("Error positioning skeleton:", e);
              }
            }
          }, 500);

          // 设置交互功能
          if (spineModelConfig.interactive.enabled) {
            const canvas = document.querySelector(
              "#spine-player-container canvas"
            );
            if (canvas) {
              canvas.addEventListener("click", () => {
                // 防抖处理：防止重复点击
                const currentTime = Date.now();
                if (isClickProcessing || currentTime - lastClickTime < 500) {
                  return; // 500ms 内重复点击忽略
                }

                isClickProcessing = true;
                lastClickTime = currentTime;

                // 随机播放点击动画（仅在动画存在时）
                if (validClickAnims.length > 0) {
                  const randomClickAnim = pickRandom(validClickAnims);
                  safeSetAnimation(randomClickAnim, false);

                  // 动画播放完成后回到待机状态
                  setTimeout(() => {
                    const randomIdle =
                      validIdleAnims.length > 0
                        ? pickRandom(validIdleAnims)
                        : fallbackIdleAnim;
                    safeSetAnimation(randomIdle, true);
                  }, 2000);
                } else if (fallbackIdleAnim) {
                  safeSetAnimation(fallbackIdleAnim, true);
                }

                // 显示随机消息
                const messages = spineModelConfig.interactive.clickMessages;
                if (messages && messages.length > 0) {
                  const randomMessage =
                    messages[Math.floor(Math.random() * messages.length)];
                  showMessage(randomMessage);
                }

                // 500ms 后重置防抖标志
                setTimeout(() => {
                  isClickProcessing = false;
                }, 500);
              });

              // 设置待机动画循环（仅在至少两个有效待机动画时启用）
              if (validIdleAnims.length > 1) {
                setInterval(() => {
                  const randomIdle = pickRandom(validIdleAnims);
                  safeSetAnimation(randomIdle, true);
                }, spineModelConfig.interactive.idleInterval);
              }
            }
          }

          console.log("✅ Spine model setup complete!");
        },
        error: (_player, reason) => {
          console.error("❌ Spine model loading error:", reason);

          const errorDiv = document.getElementById("spine-error");
          if (errorDiv) {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = \`
              <div style="color: #ff4444; padding: 20px; text-align: center; font-size: 14px;">
                <div>⚠️ Spine 模型加载失败</div>
                <div style="font-size: 12px; margin-top: 8px; color: #888;">\${reason}</div>
              </div>
            \`;
          }

          const canvas = document.getElementById("spine-canvas");
          if (canvas) canvas.style.display = "none";
        },
      });
    } catch (error) {
      console.error("Spine model initialization error:", error);

      // 重置初始化标志，允许重试
      window.spineModelInitialized = false;

      const errorDiv = document.getElementById("spine-error");
      if (errorDiv) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = \`
          <div style="color: #ff4444; padding: 20px; text-align: center; font-size: 14px;">
            <div>⚠️ Spine 运行时加载失败</div>
            <div style="font-size: 12px; margin-top: 8px; color: #888;">\${error instanceof Error ? error.message : "未知错误"}</div>
          </div>
        \`;
      }
    }
  }

  // 监听页面卸载事件，清理资源
  window.addEventListener("beforeunload", cleanupSpineModel);

  // 监听 Swup 页面切换事件（如果使用了 Swup）
  if (typeof window.swup !== "undefined" && window.swup.hooks) {
    window.swup.hooks.on("content:replace", () => {
      // 只更新响应式显示，不重新创建模型
      setTimeout(() => {
        updateResponsiveDisplay();
      }, 100);
    });
  }

  // 监听 popstate 事件（浏览器前进后退）
  window.addEventListener("popstate", () => {
    setTimeout(() => {
      updateResponsiveDisplay();
    }, 100);
  });

  // 监听窗口大小变化
  window.addEventListener("resize", updateResponsiveDisplay);

  // 页面加载完成后初始化（只初始化一次）
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSpineModel);
  } else {
    initSpineModel();
  }
})();<\/script>`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/SpineModel.astro", void 0);
//#endregion
//#region src/components/layout/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	let customFooterHtml = "";
	if (footerConfig.enable) try {
		const footerConfigPath = path.join(process.cwd(), "src", "config", "FooterConfig.html");
		customFooterHtml = fs.readFileSync(footerConfigPath, "utf-8");
		customFooterHtml = customFooterHtml.replace(/<!--[\s\S]*?-->/g, "").trim();
	} catch (error) {
		console.warn("FooterConfig.html文件读取失败:", error instanceof Error ? error.message : String(error));
	}
	return renderTemplate`${maybeRenderHead($$result)}<div class="transition border-t border-black/10 dark:border-white/15 my-10 border-dashed mx-32"></div><div class="transition border-dashed border-[oklch(85%_0.01_var(--hue))] dark:border-white/15 rounded-2xl mb-12 flex flex-col items-center justify-center px-6"><div class="transition text-50 text-sm text-center wrap"><div class="mb-2">${customFooterHtml && renderTemplate`<div>${unescapeHTML(customFooterHtml)}</div>`}</div><div class="mx-0.5 my-2.5 flex gap-x-2 gap-y-2.5 justify-center flex-wrap">&copy; <span id="copyright-year">${currentYear}</span>${profileConfig.name}. All Rights Reserved.<span aria-hidden="true">/</span><a class="transition link text-(--primary) font-medium" target="_blank"${addAttribute(url("rss.xml"), "href")}>RSS</a><span aria-hidden="true">/</span><a class="transition link text-(--primary) font-medium" target="_blank"${addAttribute(url("sitemap-index.xml"), "href")}>Sitemap</a></div><div class="mx-0.5 my-2.5 flex gap-x-2 gap-y-2.5 justify-center flex-wrap"><span>Powered by</span><a class="transition link text-(--primary) font-medium" target="_blank" href="https://astro.build">Astro</a><span aria-hidden="true">&</span><a class="transition link text-(--primary) font-medium" target="_blank" href="https://github.com/CuteLeaf/Firefly">Firefly</a></div><!-- 
      注意：请勿随意修改或删除 "Powered by Astro & Firefly" 部分，这是对开源项目的尊重和支持。
      如果您需要在底部增加内容，请在src/config/footerConfig.ts中修改enable属性为true，然后编辑src/config/FooterConfig.html文件。
      您可以随意在src/config/FooterConfig.html中随意添加自定义内容，不需要修改Footer.astro文件。
    --></div></div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/Footer.astro", void 0);
//#endregion
//#region src/utils/setting-utils.ts
function getDefaultHue() {
	const fallback = "250";
	if (typeof document === "undefined") return Number.parseInt(fallback, 10);
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}
function getDefaultTheme() {
	return siteConfig.themeColor.defaultMode ?? "light";
}
function getSystemTheme() {
	if (typeof window === "undefined") return LIGHT_MODE;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_MODE : LIGHT_MODE;
}
function resolveTheme(theme) {
	if (theme === "system") return getSystemTheme();
	return theme;
}
function getHue() {
	if (typeof window === "undefined" || !window.localStorage) return getDefaultHue();
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}
function applyThemeToDocument(theme) {
	if (typeof document === "undefined") return;
	const resolvedTheme = resolveTheme(theme);
	const currentIsDark = document.documentElement.classList.contains("dark");
	const currentTheme = document.documentElement.getAttribute("data-theme");
	let targetIsDark = false;
	switch (resolvedTheme) {
		case LIGHT_MODE:
			targetIsDark = false;
			break;
		case DARK_MODE:
			targetIsDark = true;
			break;
		default:
			targetIsDark = currentIsDark;
			break;
	}
	const needsThemeChange = currentIsDark !== targetIsDark;
	const expectedTheme = targetIsDark ? expressiveCodeConfig.darkTheme : expressiveCodeConfig.lightTheme;
	const needsCodeThemeUpdate = currentTheme !== expectedTheme;
	if (!needsThemeChange && !needsCodeThemeUpdate) return;
	if (needsThemeChange) if (targetIsDark) document.documentElement.classList.add("dark");
	else document.documentElement.classList.remove("dark");
	if (needsCodeThemeUpdate) document.documentElement.setAttribute("data-theme", expectedTheme);
}
var systemThemeListener = null;
function setTheme(theme) {
	if (typeof localStorage === "undefined" || typeof localStorage.setItem !== "function") return;
	applyThemeToDocument(theme);
	localStorage.setItem("theme", theme);
	if (theme === "system") setupSystemThemeListener();
	else cleanupSystemThemeListener();
}
function setupSystemThemeListener() {
	cleanupSystemThemeListener();
	if (typeof window === "undefined") return;
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleSystemThemeChange = (e) => {
		const isDark = e.matches;
		if (document.documentElement.classList.contains("dark") === isDark) return;
		if (isDark) document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
		const expressiveTheme = isDark ? expressiveCodeConfig.darkTheme : expressiveCodeConfig.lightTheme;
		document.documentElement.setAttribute("data-theme", expressiveTheme);
		window.dispatchEvent(new CustomEvent("theme-change"));
	};
	handleSystemThemeChange(mediaQuery);
	if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", handleSystemThemeChange);
	else mediaQuery.addListener(handleSystemThemeChange);
	systemThemeListener = handleSystemThemeChange;
}
function cleanupSystemThemeListener() {
	if (typeof window === "undefined" || !systemThemeListener) return;
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", systemThemeListener);
	else mediaQuery.removeListener(systemThemeListener);
	systemThemeListener = null;
}
function getStoredTheme() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultTheme();
	return localStorage.getItem("theme") || getDefaultTheme();
}
function getStoredWallpaperMode() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return backgroundWallpaper.mode;
	if (!displaySettingsConfig.wallpaperModeSwitchable) {
		localStorage.removeItem("wallpaperMode");
		return backgroundWallpaper.mode;
	}
	return localStorage.getItem("wallpaperMode") || backgroundWallpaper.mode;
}
function clampNumber(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function getDefaultOverlayOpacity() {
	return backgroundWallpaper.overlay?.opacity ?? .8;
}
function getDefaultOverlayBlur() {
	return backgroundWallpaper.overlay?.blur ?? 0;
}
function getDefaultOverlayCardOpacity() {
	return backgroundWallpaper.overlay?.cardOpacity ?? .6;
}
function getStoredOverlayOpacity() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultOverlayOpacity();
	const stored = localStorage.getItem("overlayOpacity");
	if (stored === null) return getDefaultOverlayOpacity();
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) return getDefaultOverlayOpacity();
	return clampNumber(parsed, 0, 1);
}
function getStoredOverlayBlur() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultOverlayBlur();
	const stored = localStorage.getItem("overlayBlur");
	if (stored === null) return getDefaultOverlayBlur();
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) return getDefaultOverlayBlur();
	return clampNumber(parsed, 0, 20);
}
function getStoredOverlayCardOpacity() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultOverlayCardOpacity();
	const stored = localStorage.getItem("overlayCardOpacity");
	if (stored === null) return getDefaultOverlayCardOpacity();
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) return getDefaultOverlayCardOpacity();
	return clampNumber(parsed, 0, 1);
}
function getDefaultWavesEnabled() {
	const wavesConfig = backgroundWallpaper.common?.waves?.enable;
	if (typeof wavesConfig === "object") return (typeof window !== "undefined" ? window.innerWidth < 768 : false) ? wavesConfig.mobile ?? false : wavesConfig.desktop ?? false;
	return wavesConfig ?? false;
}
function getStoredWavesEnabled() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultWavesEnabled();
	const stored = localStorage.getItem("wavesEnabled");
	if (stored === null) return getDefaultWavesEnabled();
	return stored === "true";
}
function getDefaultGradientEnabled() {
	const gradientConfig = backgroundWallpaper.common?.gradient?.enable;
	if (typeof gradientConfig === "object") return (typeof window !== "undefined" ? window.innerWidth < 768 : false) ? gradientConfig.mobile ?? true : gradientConfig.desktop ?? true;
	return gradientConfig ?? true;
}
function getStoredGradientEnabled() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultGradientEnabled();
	const stored = localStorage.getItem("gradientEnabled");
	if (stored === null) return getDefaultGradientEnabled();
	return stored === "true";
}
function getDefaultSakuraEnabled() {
	return sakuraConfig?.enable ?? false;
}
function getStoredSakuraEnabled() {
	if (typeof localStorage === "undefined") return getDefaultSakuraEnabled();
	const stored = localStorage.getItem("sakuraEnabled");
	if (stored === null) return getDefaultSakuraEnabled();
	return stored === "true";
}
function getDefaultBannerTitleEnabled() {
	return backgroundWallpaper.common?.homeText?.enable ?? true;
}
function getDefaultBannerCarouselEnabled() {
	return backgroundWallpaper.common?.carousel?.enable ?? false;
}
function getStoredBannerTitleEnabled() {
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultBannerTitleEnabled();
	const stored = localStorage.getItem("bannerTitleEnabled");
	if (stored === null) return getDefaultBannerTitleEnabled();
	return stored === "true";
}
function getStoredBannerCarouselEnabled() {
	if (!displaySettingsConfig.bannerCarouselSwitchable) return getDefaultBannerCarouselEnabled();
	if (typeof localStorage === "undefined" || typeof localStorage.getItem !== "function") return getDefaultBannerCarouselEnabled();
	const stored = localStorage.getItem("bannerCarouselEnabled");
	if (stored === null) return getDefaultBannerCarouselEnabled();
	return stored === "true";
}
function getDefaultCardBorderEnabled() {
	return siteConfig.card?.border ?? false;
}
function getStoredCardBorderEnabled() {
	if (typeof localStorage === "undefined") return getDefaultCardBorderEnabled();
	const stored = localStorage.getItem("cardBorderEnabled");
	if (stored === null) return getDefaultCardBorderEnabled();
	return stored === "true";
}
function getDefaultCardFollowThemeEnabled() {
	return siteConfig.card?.followTheme ?? false;
}
function getStoredCardFollowThemeEnabled() {
	if (typeof localStorage === "undefined") return getDefaultCardFollowThemeEnabled();
	const stored = localStorage.getItem("cardFollowThemeEnabled");
	if (stored === null) return getDefaultCardFollowThemeEnabled();
	return stored === "true";
}
//#endregion
//#region node_modules/.pnpm/@iconify+svelte@5.2.2_svelte@5.56.8/node_modules/@iconify/svelte/dist/offline-functions.js
/** Default values for dimensions */
var defaultIconDimensions = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
/** Default values for transformations */
var defaultIconTransformations = Object.freeze({
	rotate: 0,
	vFlip: false,
	hFlip: false
});
/** Default values for all optional IconifyIcon properties */
var defaultIconProps = Object.freeze({
	...defaultIconDimensions,
	...defaultIconTransformations
});
/** Default values for all properties used in ExtendedIconifyIcon */
var defaultExtendedIconProps = Object.freeze({
	...defaultIconProps,
	body: "",
	hidden: false
});
/**
* Resolve icon set icons
*
* Returns parent icon for each icon
*/
function getIconsTree(data, names) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	const resolved = Object.create(null);
	function resolve(name) {
		if (icons[name]) return resolved[name] = [];
		if (!(name in resolved)) {
			resolved[name] = null;
			const parent = aliases[name] && aliases[name].parent;
			const value = parent && resolve(parent);
			if (value) resolved[name] = [parent].concat(value);
		}
		return resolved[name];
	}
	Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
	return resolved;
}
/**
* Merge transformations
*/
function mergeIconTransformations(obj1, obj2) {
	const result = {};
	if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
	if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
	const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
	if (rotate) result.rotate = rotate;
	return result;
}
/**
* Merge icon and alias
*
* Can also be used to merge default values and icon
*/
function mergeIconData(parent, child) {
	const result = mergeIconTransformations(parent, child);
	for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations) {
		if (key in parent && !(key in result)) result[key] = defaultIconTransformations[key];
	} else if (key in child) result[key] = child[key];
	else if (key in parent) result[key] = parent[key];
	return result;
}
/**
* Get icon data, using prepared aliases tree
*/
function internalGetIconData(data, name, tree) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	let currentProps = {};
	function parse(name) {
		currentProps = mergeIconData(icons[name] || aliases[name], currentProps);
	}
	parse(name);
	tree.forEach(parse);
	return mergeIconData(data, currentProps);
}
/**
* Extract icons from an icon set
*
* Returns list of icons that were found in icon set
*/
function parseIconSet(data, callback) {
	const names = [];
	if (typeof data !== "object" || typeof data.icons !== "object") return names;
	if (data.not_found instanceof Array) data.not_found.forEach((name) => {
		callback(name, null);
		names.push(name);
	});
	const tree = getIconsTree(data);
	for (const name in tree) {
		const item = tree[name];
		if (item) {
			callback(name, internalGetIconData(data, name, item));
			names.push(name);
		}
	}
	return names;
}
/**
* Optional properties
*/
var optionalPropertyDefaults = {
	provider: "",
	aliases: {},
	not_found: {},
	...defaultIconDimensions
};
/**
* Check props
*/
function checkOptionalProps(item, defaults) {
	for (const prop in defaults) if (prop in item && typeof item[prop] !== typeof defaults[prop]) return false;
	return true;
}
/**
* Validate icon set, return it as IconifyJSON on success, null on failure
*
* Unlike validateIconSet(), this function is very basic.
* It does not throw exceptions, it does not check metadata, it does not fix stuff.
*/
function quicklyValidateIconSet(obj) {
	if (typeof obj !== "object" || obj === null) return null;
	const data = obj;
	if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") return null;
	if (!checkOptionalProps(obj, optionalPropertyDefaults)) return null;
	const icons = data.icons;
	for (const name in icons) {
		const icon = icons[name];
		if (!name || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
	}
	const aliases = data.aliases || Object.create(null);
	for (const name in aliases) {
		const icon = aliases[name];
		const parent = icon.parent;
		if (!name || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
	}
	return data;
}
/**
* Default icon customisations values
*/
var defaultIconSizeCustomisations = Object.freeze({
	width: null,
	height: null
});
var defaultIconCustomisations = Object.freeze({
	...defaultIconSizeCustomisations,
	...defaultIconTransformations
});
/**
* Convert IconifyIconCustomisations to FullIconCustomisations, checking value types
*/
function mergeCustomisations(defaults, item) {
	const result = { ...defaults };
	for (const key in item) {
		const value = item[key];
		const valueType = typeof value;
		if (key in defaultIconSizeCustomisations) {
			if (value === null || value && (valueType === "string" || valueType === "number")) result[key] = value;
		} else if (valueType === typeof result[key]) result[key] = key === "rotate" ? value % 4 : value;
	}
	return result;
}
var separator = /[\s,]+/;
/**
* Apply "flip" string to icon customisations
*/
function flipFromString(custom, flip) {
	flip.split(separator).forEach((str) => {
		switch (str.trim()) {
			case "horizontal":
				custom.hFlip = true;
				break;
			case "vertical":
				custom.vFlip = true;
				break;
		}
	});
}
/**
* Get rotation value
*/
function rotateFromString(value, defaultValue = 0) {
	const units = value.replace(/^-?[0-9.]*/, "");
	function cleanup(value) {
		while (value < 0) value += 4;
		return value % 4;
	}
	if (units === "") {
		const num = parseInt(value);
		return isNaN(num) ? 0 : cleanup(num);
	} else if (units !== value) {
		let split = 0;
		switch (units) {
			case "%":
				split = 25;
				break;
			case "deg": split = 90;
		}
		if (split) {
			let num = parseFloat(value.slice(0, value.length - units.length));
			if (isNaN(num)) return 0;
			num = num / split;
			return num % 1 === 0 ? cleanup(num) : 0;
		}
	}
	return defaultValue;
}
/**
* Regular expressions for calculating dimensions
*/
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
	if (ratio === 1) return size;
	precision = precision || 100;
	if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
	if (typeof size !== "string") return size;
	const oldParts = size.split(unitsSplit);
	if (oldParts === null || !oldParts.length) return size;
	const newParts = [];
	let code = oldParts.shift();
	let isNumber = unitsTest.test(code);
	while (true) {
		if (isNumber) {
			const num = parseFloat(code);
			if (isNaN(num)) newParts.push(code);
			else newParts.push(Math.ceil(num * ratio * precision) / precision);
		} else newParts.push(code);
		code = oldParts.shift();
		if (code === void 0) return newParts.join("");
		isNumber = !isNumber;
	}
}
function splitSVGDefs(content, tag = "defs") {
	let defs = "";
	const index = content.indexOf("<" + tag);
	while (index >= 0) {
		const start = content.indexOf(">", index);
		const end = content.indexOf("</" + tag);
		if (start === -1 || end === -1) break;
		const endEnd = content.indexOf(">", end);
		if (endEnd === -1) break;
		defs += content.slice(start + 1, end).trim();
		content = content.slice(0, index).trim() + content.slice(endEnd + 1);
	}
	return {
		defs,
		content
	};
}
/**
* Merge defs and content
*/
function mergeDefsAndContent(defs, content) {
	return defs ? "<defs>" + defs + "</defs>" + content : content;
}
/**
* Wrap SVG content, without wrapping definitions
*/
function wrapSVGContent(body, start, end) {
	const split = splitSVGDefs(body);
	return mergeDefsAndContent(split.defs, start + split.content + end);
}
/**
* Check if value should be unset. Allows multiple keywords
*/
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
/**
* Get SVG attributes and content from icon + customisations
*
* Does not generate style to make it compatible with frameworks that use objects for style, such as React.
* Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
*
* Customisations should be normalised by platform specific parser.
* Result should be converted to <svg> by platform specific parser.
* Use replaceIDs to generate unique IDs for body.
*/
function iconToSVG(icon, customisations) {
	const fullIcon = {
		...defaultIconProps,
		...icon
	};
	const fullCustomisations = {
		...defaultIconCustomisations,
		...customisations
	};
	const box = {
		left: fullIcon.left,
		top: fullIcon.top,
		width: fullIcon.width,
		height: fullIcon.height
	};
	let body = fullIcon.body;
	[fullIcon, fullCustomisations].forEach((props) => {
		const transformations = [];
		const hFlip = props.hFlip;
		const vFlip = props.vFlip;
		let rotation = props.rotate;
		if (hFlip) if (vFlip) rotation += 2;
		else {
			transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
			transformations.push("scale(-1 1)");
			box.top = box.left = 0;
		}
		else if (vFlip) {
			transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
			transformations.push("scale(1 -1)");
			box.top = box.left = 0;
		}
		let tempValue;
		if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
		rotation = rotation % 4;
		switch (rotation) {
			case 1:
				tempValue = box.height / 2 + box.top;
				transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
			case 2:
				transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
				break;
			case 3:
				tempValue = box.width / 2 + box.left;
				transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
		}
		if (rotation % 2 === 1) {
			if (box.left !== box.top) {
				tempValue = box.left;
				box.left = box.top;
				box.top = tempValue;
			}
			if (box.width !== box.height) {
				tempValue = box.width;
				box.width = box.height;
				box.height = tempValue;
			}
		}
		if (transformations.length) body = wrapSVGContent(body, "<g transform=\"" + transformations.join(" ") + "\">", "</g>");
	});
	const customisationsWidth = fullCustomisations.width;
	const customisationsHeight = fullCustomisations.height;
	const boxWidth = box.width;
	const boxHeight = box.height;
	let width;
	let height;
	if (customisationsWidth === null) {
		height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
		width = calculateSize(height, boxWidth / boxHeight);
	} else {
		width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
		height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
	}
	const attributes = {};
	const setAttr = (prop, value) => {
		if (!isUnsetKeyword(value)) attributes[prop] = value.toString();
	};
	setAttr("width", width);
	setAttr("height", height);
	const viewBox = [
		box.left,
		box.top,
		boxWidth,
		boxHeight
	];
	attributes.viewBox = viewBox.join(" ");
	return {
		attributes,
		viewBox,
		body
	};
}
/**
* Regular expression for finding ids
*/
var regex = /\sid="(\S+)"/g;
/**
* Counters
*/
var counters = /* @__PURE__ */ new Map();
/**
* Get unique new ID
*/
function nextID(id) {
	id = id.replace(/[0-9]+$/, "") || "a";
	const count = counters.get(id) || 0;
	counters.set(id, count + 1);
	return count ? `${id}${count}` : id;
}
/**
* Replace IDs in SVG output with unique IDs
*/
function replaceIDs(body) {
	const ids = [];
	let match;
	while (match = regex.exec(body)) ids.push(match[1]);
	if (!ids.length) return body;
	const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
	ids.forEach((id) => {
		const newID = nextID(id);
		const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		body = body.replace(new RegExp("([#;\"])(" + escapedID + ")([\")]|\\.[a-z])", "g"), "$1" + newID + suffix + "$3");
	});
	body = body.replace(new RegExp(suffix, "g"), "");
	return body;
}
/**
* Generate <svg>
*/
function iconToHTML(body, attributes) {
	let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : " xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	for (const attr in attributes) renderAttribsHTML += " " + attr + "=\"" + attributes[attr] + "\"";
	return "<svg xmlns=\"http://www.w3.org/2000/svg\"" + renderAttribsHTML + ">" + body + "</svg>";
}
/**
* Encode SVG for use in url()
*
* Short alternative to encodeURIComponent() that encodes only stuff used in SVG, generating
* smaller code.
*/
function encodeSVGforURL(svg) {
	return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
/**
* Generate data: URL from SVG
*/
function svgToData(svg) {
	return "data:image/svg+xml," + encodeSVGforURL(svg);
}
/**
* Generate url() from SVG
*/
function svgToURL(svg) {
	return "url(\"" + svgToData(svg) + "\")";
}
var defaultExtendedIconCustomisations = {
	...defaultIconCustomisations,
	inline: false
};
/**
* Default SVG attributes
*/
var svgDefaults = {
	"xmlns": "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	"aria-hidden": true,
	"role": "img"
};
/**
* Style modes
*/
var commonProps = { display: "inline-block" };
var monotoneProps = { "background-color": "currentColor" };
var coloredProps = { "background-color": "transparent" };
var propsToAdd = {
	image: "var(--svg)",
	repeat: "no-repeat",
	size: "100% 100%"
};
var propsToAddTo = {
	"-webkit-mask": monotoneProps,
	"mask": monotoneProps,
	"background": coloredProps
};
for (const prefix in propsToAddTo) {
	const list = propsToAddTo[prefix];
	for (const prop in propsToAdd) list[prefix + "-" + prop] = propsToAdd[prop];
}
/**
* Fix size: add 'px' to numbers
*/
function fixSize(value) {
	return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
/**
* Generate icon from properties
*/
function render(icon, props) {
	const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
	const mode = props.mode || "svg";
	const componentProps = mode === "svg" ? { ...svgDefaults } : {};
	if (icon.body.indexOf("xlink:") === -1) delete componentProps["xmlns:xlink"];
	let style = typeof props.style === "string" ? props.style : "";
	for (let key in props) {
		const value = props[key];
		if (value === void 0) continue;
		switch (key) {
			case "icon":
			case "style":
			case "onLoad":
			case "mode":
			case "ssr": break;
			case "inline":
			case "hFlip":
			case "vFlip":
				customisations[key] = value === true || value === "true" || value === 1;
				break;
			case "flip":
				if (typeof value === "string") flipFromString(customisations, value);
				break;
			case "color":
				style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
				break;
			case "rotate":
				if (typeof value === "string") customisations[key] = rotateFromString(value);
				else if (typeof value === "number") customisations[key] = value;
				break;
			case "ariaHidden":
			case "aria-hidden":
				if (value !== true && value !== "true") delete componentProps["aria-hidden"];
				break;
			default:
				if (key.slice(0, 3) === "on:") break;
				if (defaultExtendedIconCustomisations[key] === void 0) componentProps[key] = value;
		}
	}
	const item = iconToSVG(icon, customisations);
	const renderAttribs = item.attributes;
	if (customisations.inline) style = "vertical-align: -0.125em; " + style;
	if (mode === "svg") {
		Object.assign(componentProps, renderAttribs);
		if (style !== "") componentProps.style = style;
		return {
			svg: true,
			attributes: componentProps,
			body: replaceIDs(item.body)
		};
	}
	const { body, width, height } = icon;
	const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
	const styles = { "--svg": svgToURL(iconToHTML(body, {
		...renderAttribs,
		width: width + "",
		height: height + ""
	})) };
	const size = (prop) => {
		const value = renderAttribs[prop];
		if (value) styles[prop] = fixSize(value);
	};
	size("width");
	size("height");
	Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
	let customStyle = "";
	for (const key in styles) customStyle += key + ": " + styles[key] + ";";
	componentProps.style = customStyle + style;
	return {
		svg: false,
		attributes: componentProps
	};
}
/**
* Storage for icons referred by name
*/
var storage = Object.create(null);
/**
* Generate icon
*/
function generateIcon(props) {
	const icon = typeof props.icon === "string" ? storage[props.icon] : typeof props.icon === "object" ? {
		...defaultIconProps,
		...props.icon
	} : null;
	if (icon === null || typeof icon !== "object" || typeof icon.body !== "string") return null;
	return render({
		...defaultIconProps,
		...icon
	}, props);
}
/**
* Add collection to storage, allowing to call icons by name
*
* @param data Icon set
* @param prefix Optional prefix to add to icon names, true (default) if prefix from icon set should be used.
*/
function addCollection(data, prefix) {
	const iconPrefix = typeof prefix === "string" ? prefix : prefix !== false && typeof data.prefix === "string" ? data.prefix + ":" : "";
	quicklyValidateIconSet(data) && parseIconSet(data, (name, icon) => {
		if (icon) storage[iconPrefix + name] = icon;
	});
}
//#endregion
//#region node_modules/.pnpm/@iconify+svelte@5.2.2_svelte@5.56.8/node_modules/@iconify/svelte/dist/OfflineIcon.svelte
function OfflineIcon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...props } = $$props;
		const data = $.derived(() => generateIcon(props));
		if (data()) {
			$$renderer.push("<!--[0-->");
			if (data().svg) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg${$.attributes({ ...data().attributes }, void 0, void 0, void 0, 3)}>${$.html(data().body)}</svg>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span${$.attributes({ ...data().attributes })}></span>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
var icons_data_default = {
	"material-symbols": {
		"prefix": "material-symbols",
		"icons": {
			"share": { "body": "<path fill=\"currentColor\" d=\"M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22\"/>" },
			"check": { "body": "<path fill=\"currentColor\" d=\"m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z\"/>" },
			"link": { "body": "<path fill=\"currentColor\" d=\"M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z\"/>" },
			"download": { "body": "<path fill=\"currentColor\" d=\"m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z\"/>" },
			"border-outer-rounded": { "body": "<path fill=\"currentColor\" d=\"M11.288 8.713Q11 8.425 11 8t.288-.712T12 7t.713.288T13 8t-.288.713T12 9t-.712-.288m-4 4Q7 12.426 7 12t.288-.712T8 11t.713.288T9 12t-.288.713T8 13t-.712-.288m4 0Q11 12.426 11 12t.288-.712T12 11t.713.288T13 12t-.288.713T12 13t-.712-.288m4 0Q15 12.426 15 12t.288-.712T16 11t.713.288T17 12t-.288.713T16 13t-.712-.288m-4 4Q11 16.426 11 16t.288-.712T12 15t.713.288T13 16t-.288.713T12 17t-.712-.288M5 19h14V5H5zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z\"/>" },
			"palette": { "body": "<path fill=\"currentColor\" d=\"M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9t2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.312.125t-.088.275q0 .3.375.863t.375 1.287q0 1.25-.687 1.85T12 22m-4.425-9.425Q8 12.15 8 11.5t-.425-1.075T6.5 10t-1.075.425T5 11.5t.425 1.075T6.5 13t1.075-.425m3-4Q11 8.15 11 7.5t-.425-1.075T9.5 6t-1.075.425T8 7.5t.425 1.075T9.5 9t1.075-.425m5 0Q16 8.15 16 7.5t-.425-1.075T14.5 6t-1.075.425T13 7.5t.425 1.075T14.5 9t1.075-.425m3 4Q19 12.15 19 11.5t-.425-1.075T17.5 10t-1.075.425T16 11.5t.425 1.075T17.5 13t1.075-.425\"/>" },
			"palette-outline": { "body": "<path fill=\"currentColor\" d=\"M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9t2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.312.125t-.088.275q0 .3.375.863t.375 1.287q0 1.25-.687 1.85T12 22m-4.425-9.425Q8 12.15 8 11.5t-.425-1.075T6.5 10t-1.075.425T5 11.5t.425 1.075T6.5 13t1.075-.425m3-4Q11 8.15 11 7.5t-.425-1.075T9.5 6t-1.075.425T8 7.5t.425 1.075T9.5 9t1.075-.425m5 0Q16 8.15 16 7.5t-.425-1.075T14.5 6t-1.075.425T13 7.5t.425 1.075T14.5 9t1.075-.425m3 4Q19 12.15 19 11.5t-.425-1.075T17.5 10t-1.075.425T16 11.5t.425 1.075T17.5 13t1.075-.425M12 20q.225 0 .363-.125t.137-.325q0-.35-.375-.825T11.75 17.3q0-1.05.725-1.675T14.25 15H16q1.65 0 2.825-.962T20 11.05q0-3.025-2.312-5.038T12.2 4Q8.8 4 6.4 6.325T4 12q0 3.325 2.338 5.663T12 20\"/>" },
			"image-outline": { "body": "<path fill=\"currentColor\" d=\"M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm1-2h12l-3.75-5l-3 4L9 13zm-1 2V5z\"/>" },
			"wallpaper": { "body": "<path fill=\"currentColor\" d=\"M5 21q-.825 0-1.412-.587T3 19v-6h2v6h6v2zm8 0v-2h6v-6h2v6q0 .825-.587 1.413T19 21zm-7-4l3-4l2.25 3l3-4L18 17zm-3-6V5q0-.825.588-1.412T5 3h6v2H5v6zm16 0V5h-6V3h6q.825 0 1.413.588T21 5v6zm-4.575-1.425Q14 9.15 14 8.5t.425-1.075T15.5 7t1.075.425T17 8.5t-.425 1.075T15.5 10t-1.075-.425\"/>" },
			"full-coverage-outline-rounded": { "body": "<path fill=\"currentColor\" d=\"M4 21q-.825 0-1.412-.587T2 19V8q0-.425.288-.712T3 7t.713.288T4 8v11h14q.425 0 .713.288T19 20t-.288.713T18 21zm4-4q-.825 0-1.412-.587T6 15V4q0-.425.288-.712T7 3h15q.425 0 .713.288T23 4v11q0 .825-.587 1.413T21 17zm0-2h13V5H8zm3-3h2q.425 0 .713-.288T14 11V8q0-.425-.288-.712T13 7h-2q-.425 0-.712.288T10 8v3q0 .425.288.713T11 12m5 0h2q.425 0 .713-.288T19 11t-.288-.712T18 10h-2q-.425 0-.712.288T15 11t.288.713T16 12m0-3h2q.425 0 .713-.288T19 8t-.288-.712T18 7h-2q-.425 0-.712.288T15 8t.288.713T16 9m-8 6V5z\"/>" },
			"hide-image-outline": { "body": "<path fill=\"currentColor\" d=\"m21 18.15l-2-2V5H7.85l-2-2H19q.825 0 1.413.588T21 5zm-1.2 4.45L18.2 21H5q-.825 0-1.412-.587T3 19V5.8L1.4 4.2l1.4-1.4l18.4 18.4zM6 17l3-4l2.25 3l.825-1.1L5 7.825V19h11.175l-2-2zm4.6-3.6\"/>" },
			"titlecase-rounded": { "body": "<path fill=\"currentColor\" d=\"M8.6 16.925V8.6H6.425q-.35 0-.588-.225T5.6 7.8t.237-.575T6.425 7H12.5q.35 0 .575.225t.225.575t-.225.575t-.575.225h-2.2v8.325q0 .35-.25.588t-.6.237t-.6-.238t-.25-.587m6.25-5.375h-.625q-.3 0-.512-.213t-.213-.512t.213-.512t.512-.213h.625V8.75q0-.35.238-.587t.587-.238t.588.238t.237.587v1.35h1.125q.3 0 .513.213t.212.512t-.213.513t-.512.212H16.5v3.7q0 .575.263.9t.712.325h.225q.275-.025.488.187t.212.513q0 .35-.187.55t-.513.25q-.125.025-.25.025h-.25q-1.1 0-1.725-.638T14.85 15.6z\"/>" },
			"view-carousel-outline": { "body": "<path fill=\"currentColor\" d=\"M2 15V9q0-.825.588-1.412T4 7t1.413.588T6 9v6q0 .825-.587 1.413T4 17t-1.412-.587T2 15m7 4q-.825 0-1.412-.587T7 17V7q0-.825.588-1.412T9 5h6q.825 0 1.413.588T17 7v10q0 .825-.587 1.413T15 19zm9-4V9q0-.825.588-1.412T20 7t1.413.588T22 9v6q0 .825-.587 1.413T20 17t-1.412-.587T18 15m-9 2h6V7H9zm3-5\"/>" },
			"airwave-rounded": { "body": "<path fill=\"currentColor\" d=\"M18.75 8.65q-.675.675-1.55 1.025t-1.75.35t-1.725-.337T12.2 8.65l-1.875-1.875q-.375-.375-.85-.562T8.5 6.025t-.975.188t-.85.562L5.5 7.95q-.3.3-.7.288t-.7-.313t-.3-.712t.3-.713l1.15-1.15q.675-.675 1.525-1.012T8.5 4t1.713.337t1.512 1.013L13.6 7.225q.4.4.875.588T15.45 8t.988-.187t.887-.588L18.5 6.05q.3-.3.713-.3t.712.3t.3.713t-.3.712zm0 5q-.675.675-1.537 1.013T15.474 15t-1.737-.337T12.2 13.65l-1.875-1.875q-.375-.375-.85-.562t-.975-.188t-.975.188t-.85.562L5.5 12.95q-.275.275-.687.288T4.1 12.95q-.3-.275-.312-.7t.287-.725L5.25 10.35q.675-.675 1.525-1.012T8.5 9t1.713.338t1.512 1.012l1.875 1.875q.4.4.875.588t.975.187t.988-.187t.887-.588L18.5 11.05q.3-.3.713-.3t.712.3t.3.713t-.3.712zm-.025 5q-.675.675-1.525 1.013T15.475 20t-1.737-.337T12.2 18.65l-1.9-1.875q-.375-.375-.85-.562t-.975-.188t-.975.188t-.85.562L5.475 17.95q-.275.275-.687.288t-.713-.288q-.275-.275-.275-.7t.275-.7l1.175-1.2q.675-.675 1.525-1.012T8.5 14t1.713.338t1.512 1.012l1.875 1.875q.4.4.888.588t.987.187t.975-.187t.875-.588L18.5 16.05q.3-.3.7-.288t.7.313q.275.3.288.7t-.288.7z\"/>" },
			"gradient": { "body": "<path fill=\"currentColor\" d=\"M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm6-10v2h2v-2zm-4 0v2h2v-2zm2 2v2h2v-2zm4 0v2h2v-2zm-8 0v2h2v-2zm10-2v2h2v2h2v-2h-2v-2zm-8 4v2H5v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h-2v-2h-2v2h-2v-2h-2v2H9v-2zm12-4v2zm0 4v2z\"/>" },
			"wb-sunny-outline-rounded": { "body": "<path fill=\"currentColor\" d=\"M11 3V2q0-.425.288-.712T12 1t.713.288T13 2v1q0 .425-.288.713T12 4t-.712-.288T11 3m0 19v-1q0-.425.288-.712T12 20t.713.288T13 21v1q0 .425-.288.713T12 23t-.712-.288T11 22m11-9h-1q-.425 0-.712-.288T20 12t.288-.712T21 11h1q.425 0 .713.288T23 12t-.288.713T22 13M3 13H2q-.425 0-.712-.288T1 12t.288-.712T2 11h1q.425 0 .713.288T4 12t-.288.713T3 13m16.75-7.325l-.35.35q-.275.275-.687.275T18 6q-.275-.275-.288-.687t.263-.713l.375-.375q.275-.3.7-.3t.725.3t.288.725t-.313.725M6.025 19.4l-.375.375q-.275.3-.7.3t-.725-.3t-.288-.725t.313-.725l.35-.35q.275-.275.688-.275T6 18q.275.275.288.688t-.263.712m12.3.35l-.35-.35q-.275-.275-.275-.687T18 18q.275-.275.688-.287t.712.262l.375.375q.3.275.3.7t-.3.725t-.725.288t-.725-.313M4.6 6.025l-.375-.375q-.3-.275-.3-.7t.3-.725t.725-.288t.725.313l.35.35q.275.275.275.688T6 6q-.275.275-.687.288T4.6 6.025M7.75 16.25Q6 14.5 6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18t-4.25-1.75m7.088-1.412Q16 13.675 16 12t-1.162-2.838T12 8T9.162 9.163T8 12t1.163 2.838T12 16t2.838-1.162M12 12\"/>" },
			"dark-mode-outline-rounded": { "body": "<path fill=\"currentColor\" d=\"M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75\"/>" },
			"brightness-auto-outline-rounded": { "body": "<path fill=\"currentColor\" d=\"M10.2 13.7h3.65l.625 1.825q.075.2.263.338t.412.137q.375 0 .588-.312t.087-.663l-2.85-7.55q-.075-.225-.275-.35T12.275 7h-.55q-.225 0-.425.125t-.275.35L8.175 15q-.125.35.088.675t.612.325q.25 0 .438-.137t.262-.363zm.45-1.3l1.3-3.75h.1l1.3 3.75zm-2 7.6H6q-.825 0-1.412-.587T4 18v-2.65L2.075 13.4q-.275-.3-.425-.662T1.5 12t.15-.737t.425-.663L4 8.65V6q0-.825.588-1.412T6 4h2.65l1.95-1.925q.3-.275.663-.425T12 1.5t.738.15t.662.425L15.35 4H18q.825 0 1.413.588T20 6v2.65l1.925 1.95q.275.3.425.663t.15.737t-.15.738t-.425.662L20 15.35V18q0 .825-.587 1.413T18 20h-2.65l-1.95 1.925q-.3.275-.662.425T12 22.5t-.737-.15t-.663-.425zm.85-2l2.5 2.5l2.5-2.5H18v-3.5l2.5-2.5L18 9.5V6h-3.5L12 3.5L9.5 6H6v3.5L3.5 12L6 14.5V18zm2.5-6\"/>" },
			"search": { "body": "<path fill=\"currentColor\" d=\"m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14\"/>" }
		},
		"width": 24,
		"height": 24
	},
	"fa7-solid": {
		"prefix": "fa7-solid",
		"icons": {
			"arrow-rotate-left": { "body": "<path fill=\"currentColor\" d=\"M320 128c-56.8 0-107.9 24.7-143.1 64H224c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32v54.7C174.9 97.6 243.5 64 320 64c141.4 0 256 114.6 256 256S461.4 576 320 576c-87 0-163.9-43.4-210.1-109.7c-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3c106 0 192-86 192-192S426 128 320 128\"/>" },
			"chevron-right": { "body": "<path fill=\"currentColor\" d=\"M471.1 297.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L403.2 320L233.9 150.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/>" },
			"arrow-right": { "body": "<path fill=\"currentColor\" d=\"M566.6 342.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 288H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h370.7L361.3 457.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z\"/>" }
		},
		"width": 640,
		"height": 640
	},
	mdi: {
		"prefix": "mdi",
		"icons": { "flower-poppy": { "body": "<path fill=\"currentColor\" d=\"M18.5 12A3.5 3.5 0 0 0 22 8.5A6.5 6.5 0 0 0 15.5 2A3.5 3.5 0 0 0 12 5.5A3.5 3.5 0 0 0 8.5 2A6.5 6.5 0 0 0 2 8.5A3.5 3.5 0 0 0 5.5 12A3.5 3.5 0 0 0 2 15.5A6.5 6.5 0 0 0 8.5 22a3.5 3.5 0 0 0 3.5-3.5a3.5 3.5 0 0 0 3.5 3.5a6.5 6.5 0 0 0 6.5-6.5a3.5 3.5 0 0 0-3.5-3.5M12 16a4 4 0 0 1-4-4a4 4 0 0 1 4-4a4 4 0 0 1 4 4a4 4 0 0 1-4 4m2.5-4a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 12A2.5 2.5 0 0 1 12 9.5a2.5 2.5 0 0 1 2.5 2.5\"/>" } },
		"width": 24,
		"height": 24
	},
	"svg-spinners": {
		"prefix": "svg-spinners",
		"icons": { "ring-resize": { "body": "<g stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-width=\"3\"><animate attributeName=\"stroke-dasharray\" calcMode=\"spline\" dur=\"1.5s\" keySplines=\"0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1\" keyTimes=\"0;0.475;0.95;1\" repeatCount=\"indefinite\" values=\"0 150;42 150;42 150;42 150\"/><animate attributeName=\"stroke-dashoffset\" calcMode=\"spline\" dur=\"1.5s\" keySplines=\"0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1\" keyTimes=\"0;0.475;0.95;1\" repeatCount=\"indefinite\" values=\"0;-16;-59;-59\"/></circle><animateTransform attributeName=\"transform\" dur=\"2s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 12 12;360 12 12\"/></g>" } },
		"width": 24,
		"height": 24
	}
};
//#endregion
//#region src/components/common/Icon.svelte
function Icon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* 统一的图标组件 - 使用 @iconify/svelte 离线模式
		* 用于 Svelte 组件
		*
		* 从本地精简图标数据加载，仅包含项目实际使用的图标
		* 无需网络请求，无闪烁，体积小
		*/
		let collectionsAdded = false;
		if (!collectionsAdded) {
			for (const [, data] of Object.entries(icons_data_default)) addCollection(data);
			collectionsAdded = true;
		}
		let { icon, class: className = "", style = "" } = $$props;
		if ($.derived(() => () => {
			const [prefix, name] = icon.split(":");
			if (!prefix || !name) return false;
			return icons_data_default[prefix]?.icons?.[name] !== void 0;
		})()()) {
			$$renderer.push("<!--[0-->");
			OfflineIcon($$renderer, {
				icon,
				class: `inline-icon inline-flex items-center justify-center ${$.stringify(className)}`,
				style
			});
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span${$.attr_class(`inline-icon inline-flex items-center justify-center ${$.stringify(className)}`)}${$.attr_style(style)} aria-hidden="true"${$.attr("title", `Icon not found: ${$.stringify(icon)}`)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"></circle></svg></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/components/controls/DisplaySettingsIntegrated.svelte
function DisplaySettingsIntegrated($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let hue = getHue();
		const defaultHue = getDefaultHue();
		let wallpaperMode = backgroundWallpaper.mode;
		backgroundWallpaper.mode;
		let currentLayout = "list";
		const defaultLayout = siteConfig.postListLayout.defaultMode;
		const mobileDefaultLayout = siteConfig.postListLayout.mobileDefaultMode || defaultLayout;
		typeof window !== "undefined" && window.innerWidth;
		let isMobileWidth = typeof window !== "undefined" ? window.innerWidth < 780 : false;
		let isSwitching = false;
		let wavesEnabled = true;
		const defaultWavesEnabled = getDefaultWavesEnabled();
		let gradientEnabled = true;
		const defaultGradientEnabled = getDefaultGradientEnabled();
		let bannerTitleEnabled = true;
		const defaultBannerTitleEnabled = getDefaultBannerTitleEnabled();
		let bannerCarouselEnabled = true;
		const defaultBannerCarouselEnabled = getDefaultBannerCarouselEnabled();
		getDefaultSakuraEnabled();
		let overlayOpacity = getDefaultOverlayOpacity();
		const defaultOverlayOpacity = getDefaultOverlayOpacity();
		let overlayBlur = getDefaultOverlayBlur();
		const defaultOverlayBlur = getDefaultOverlayBlur();
		let overlayCardOpacity = getDefaultOverlayCardOpacity();
		const defaultOverlayCardOpacity = getDefaultOverlayCardOpacity();
		let cardBorderEnabled = false;
		const defaultCardBorderEnabled = getDefaultCardBorderEnabled();
		let cardFollowThemeEnabled = false;
		const defaultCardFollowThemeEnabled = getDefaultCardFollowThemeEnabled();
		const isWallpaperSwitchable = displaySettingsConfig.wallpaperModeSwitchable;
		const allowLayoutSwitch = displaySettingsConfig.layoutSwitchable;
		let effectiveDefaultLayout = $.derived(() => isMobileWidth ? mobileDefaultLayout : defaultLayout);
		const showThemeColor = displaySettingsConfig.themeColorSwitchable;
		const isWavesSwitchable = displaySettingsConfig.wavesSwitchable;
		const isGradientSwitchable = displaySettingsConfig.gradientSwitchable;
		const isBannerTitleSwitchable = (backgroundWallpaper.common?.homeText?.enable ?? false) && displaySettingsConfig.bannerTitleSwitchable;
		const isBannerCarouselSwitchable = displaySettingsConfig.bannerCarouselSwitchable;
		const isSakuraSwitchable = displaySettingsConfig.sakuraSwitchable;
		const isCardBorderSwitchable = displaySettingsConfig.cardBorderSwitchable;
		const isCardFollowThemeSwitchable = displaySettingsConfig.cardFollowThemeSwitchable;
		const hasBannerSettings = isWavesSwitchable || isGradientSwitchable || isBannerTitleSwitchable || isBannerCarouselSwitchable;
		const overlaySwitchableConfig = displaySettingsConfig.overlaySwitchable;
		const isOverlaySettingsSwitchable = typeof overlaySwitchableConfig === "boolean" ? overlaySwitchableConfig : true;
		const isOverlayOpacitySwitchable = typeof overlaySwitchableConfig === "boolean" ? overlaySwitchableConfig : overlaySwitchableConfig.opacity ?? false;
		const isOverlayBlurSwitchable = typeof overlaySwitchableConfig === "boolean" ? overlaySwitchableConfig : overlaySwitchableConfig.blur ?? false;
		const isOverlayCardOpacitySwitchable = typeof overlaySwitchableConfig === "boolean" ? overlaySwitchableConfig : overlaySwitchableConfig.cardOpacity ?? false;
		const hasOverlaySettings = isOverlaySettingsSwitchable && (isOverlayOpacitySwitchable || isOverlayBlurSwitchable || isOverlayCardOpacitySwitchable);
		$.derived(() => (!isOverlayOpacitySwitchable || overlayOpacity === defaultOverlayOpacity) && (!isOverlayBlurSwitchable || overlayBlur === defaultOverlayBlur) && (!isOverlayCardOpacitySwitchable || overlayCardOpacity === defaultOverlayCardOpacity));
		$.derived(() => (!isBannerTitleSwitchable || bannerTitleEnabled === defaultBannerTitleEnabled) && (!isWavesSwitchable || wavesEnabled === defaultWavesEnabled) && (!isGradientSwitchable || gradientEnabled === defaultGradientEnabled) && (!isBannerCarouselSwitchable || bannerCarouselEnabled === defaultBannerCarouselEnabled));
		let cardSettingsIsDefault = $.derived(() => (!isCardBorderSwitchable || cardBorderEnabled === defaultCardBorderEnabled) && (!isCardFollowThemeSwitchable || cardFollowThemeEnabled === defaultCardFollowThemeEnabled));
		const hasAnyContent = showThemeColor || isWallpaperSwitchable || allowLayoutSwitch || hasBannerSettings || hasOverlaySettings || isSakuraSwitchable;
		const hasAppearanceTab = $.derived(() => showThemeColor || allowLayoutSwitch || isCardBorderSwitchable || isCardFollowThemeSwitchable);
		const hasWallpaperTab = $.derived(() => isWallpaperSwitchable || wallpaperMode === "overlay" && hasOverlaySettings || (wallpaperMode === "banner" || wallpaperMode === "fullscreen") && hasBannerSettings);
		const hasEffectsTab = $.derived(() => isSakuraSwitchable);
		let visibleTabs = $.derived(() => {
			const tabs = [];
			if (hasAppearanceTab()) tabs.push({
				key: "appearance",
				icon: "material-symbols:palette",
				label: i18n(I18nKey.settingsTabAppearance)
			});
			if (hasWallpaperTab()) tabs.push({
				key: "wallpaper",
				icon: "material-symbols:wallpaper",
				label: i18n(I18nKey.settingsTabWallpaper)
			});
			if (hasEffectsTab()) tabs.push({
				key: "effects",
				icon: "mdi:flower-poppy",
				label: i18n(I18nKey.settingsTabEffects)
			});
			return tabs;
		});
		let showTabBar = $.derived(() => visibleTabs().length > 1);
		let activeTab = "appearance";
		$.derived(() => [
			{
				key: "opacity",
				enabled: isOverlayOpacitySwitchable,
				label: i18n(I18nKey.overlayOpacity),
				displayValue: `${Math.round(overlayOpacity * 100)}%`,
				ariaLabel: i18n(I18nKey.overlayOpacity),
				min: 20,
				max: 100,
				step: 1,
				value: Math.round(overlayOpacity * 100),
				onValueChange: (value) => {
					overlayOpacity = value / 100;
				}
			},
			{
				key: "blur",
				enabled: isOverlayBlurSwitchable,
				label: i18n(I18nKey.overlayBlur),
				displayValue: `${overlayBlur.toFixed(1)}px`,
				ariaLabel: i18n(I18nKey.overlayBlur),
				min: 0,
				max: 20,
				step: .5,
				value: overlayBlur,
				onValueChange: (value) => {
					overlayBlur = value;
				}
			},
			{
				key: "cardOpacity",
				enabled: isOverlayCardOpacitySwitchable,
				label: i18n(I18nKey.overlayCardOpacity),
				displayValue: `${Math.round(overlayCardOpacity * 100)}%`,
				ariaLabel: i18n(I18nKey.overlayCardOpacity),
				min: 20,
				max: 100,
				step: 1,
				value: Math.round(overlayCardOpacity * 100),
				onValueChange: (value) => {
					overlayCardOpacity = value / 100;
				}
			}
		]);
		function checkScreenSize() {
			window.innerWidth;
			isMobileWidth = window.innerWidth < 780;
			if (window.innerWidth < 380 && currentLayout === "list") {
				currentLayout = "grid";
				const event = new CustomEvent("layoutChange", { detail: { layout: "grid" } });
				window.dispatchEvent(event);
			}
		}
		function updateRangeProgress(input) {
			const min = Number(input.min || 0);
			const max = Number(input.max || 100);
			const progress = (Number(input.value || 0) - min) * 100 / (max - min || 1);
			input.style.setProperty("--range-progress", `${Math.min(100, Math.max(0, progress))}%`);
		}
		function refreshAllRangeProgress() {
			const panel = document.getElementById("display-setting");
			if (!panel) return;
			Array.from(panel.querySelectorAll("input[type=\"range\"]")).forEach((input) => {
				updateRangeProgress(input);
			});
		}
		onMount(() => {
			checkScreenSize();
			wallpaperMode = getStoredWallpaperMode();
			wavesEnabled = getStoredWavesEnabled();
			gradientEnabled = getStoredGradientEnabled();
			bannerTitleEnabled = getStoredBannerTitleEnabled();
			bannerCarouselEnabled = getStoredBannerCarouselEnabled();
			getStoredSakuraEnabled();
			cardBorderEnabled = getStoredCardBorderEnabled();
			cardFollowThemeEnabled = getStoredCardFollowThemeEnabled();
			overlayOpacity = getStoredOverlayOpacity();
			overlayBlur = getStoredOverlayBlur();
			overlayCardOpacity = getStoredOverlayCardOpacity();
			const savedLayout = localStorage.getItem("postListLayout");
			if (savedLayout && (savedLayout === "list" || savedLayout === "grid")) currentLayout = savedLayout;
			else currentLayout = window.innerWidth < 780 ? mobileDefaultLayout : defaultLayout;
			window.addEventListener("resize", checkScreenSize);
			return () => {
				window.removeEventListener("resize", checkScreenSize);
			};
		});
		onMount(() => {
			const handleCustomEvent = (event) => {
				currentLayout = event.detail.layout;
			};
			window.addEventListener("layoutChange", handleCustomEvent);
			return () => {
				window.removeEventListener("layoutChange", handleCustomEvent);
			};
		});
		onMount(() => {
			const panel = document.getElementById("display-setting");
			if (!panel) return;
			const handleRangeInput = (event) => {
				const target = event.target;
				if (target instanceof HTMLInputElement && target.type === "range") updateRangeProgress(target);
			};
			refreshAllRangeProgress();
			panel.addEventListener("input", handleRangeInput);
			return () => {
				panel.removeEventListener("input", handleRangeInput);
			};
		});
		onMount(() => {
			const handleWallpaperModeChange = (event) => {
				wallpaperMode = event.detail.mode;
			};
			window.addEventListener("wallpaperModeChange", handleWallpaperModeChange);
			return () => {
				window.removeEventListener("wallpaperModeChange", handleWallpaperModeChange);
			};
		});
		if (hasAnyContent) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-3 pt-0 pb-3 max-h-[80vh] overflow-y-auto" data-floating-panel="" data-floating-panel-trigger="display-settings-switch" inert="" aria-hidden="true">`);
			if (showTabBar()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex border-b border-black/5 dark:border-white/10 -mx-1 mb-2"><!--[-->`);
				const each_array = $.ensure_array_like(visibleTabs());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let tab = each_array[$$index];
					$$renderer.push(`<button${$.attr_class(`focus-ring-inset flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors relative min-w-0 rounded-md ${activeTab === tab.key ? "text-(--primary)" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`)}>`);
					Icon($$renderer, {
						icon: tab.icon,
						class: "text-[0.875rem] shrink-0"
					});
					$$renderer.push(`<!----> <span class="truncate">${$.escape(tab.label)}</span> `);
					if (activeTab === tab.key) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-(--primary)"></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></button>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[0-->");
			if (showThemeColor) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div><div class="section-title">${$.escape(i18n(I18nKey.themeColor))} <button aria-label="Reset to Default"${$.attr_class("btn-regular rounded-md active:scale-90", void 0, {
					"opacity-0": hue === defaultHue,
					"pointer-events-none": hue === defaultHue
				})}${$.attr("disabled", hue === defaultHue, true)}${$.attr("aria-hidden", hue === defaultHue ? "true" : void 0)}><div class="text-(--btn-content)">`);
				Icon($$renderer, {
					icon: "fa7-solid:arrow-rotate-left",
					class: "text-[0.75rem]"
				});
				$$renderer.push(`<!----></div></button> <div id="hueValue" class="transition bg-(--btn-regular-bg) rounded-md flex justify-center font-bold items-center text-(--btn-content)">${$.escape(hue)}</div></div> <div class="hue-slider-shell w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded-md select-none"><input${$.attr("aria-label", i18n(I18nKey.themeColor))} type="range" min="0" max="360"${$.attr("value", hue)} class="slider" id="colorSlider" step="5" style="width: 100%"/></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (allowLayoutSwitch) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div><div class="section-title">${$.escape(i18n(I18nKey.postListLayout))} <button aria-label="Reset to Default"${$.attr_class("btn-regular rounded-md active:scale-90", void 0, {
					"opacity-0": currentLayout === effectiveDefaultLayout(),
					"pointer-events-none": currentLayout === effectiveDefaultLayout()
				})}${$.attr("disabled", currentLayout === effectiveDefaultLayout(), true)}${$.attr("aria-hidden", currentLayout === effectiveDefaultLayout() ? "true" : void 0)}><div class="text-(--btn-content)">`);
				Icon($$renderer, {
					icon: "fa7-solid:arrow-rotate-left",
					class: "text-[0.75rem]"
				});
				$$renderer.push(`<!----></div></button></div> <div class="flex gap-2"><button${$.attr("aria-label", i18n(I18nKey.postListLayoutList))}${$.attr_class("flex-1 btn-regular rounded-md py-2 px-3 flex items-center justify-center gap-2 active:scale-95 transition-all relative overflow-hidden", void 0, {
					"opacity-60": currentLayout !== "list",
					"bg-(--btn-regular-bg-hover)": currentLayout === "list"
				})}${$.attr("disabled", isSwitching, true)}${$.attr("title", i18n(I18nKey.postListLayoutList))}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg> <span class="text-xs font-medium">${$.escape(i18n(I18nKey.postListLayoutList))}</span></button> <button${$.attr("aria-label", i18n(I18nKey.postListLayoutGrid))}${$.attr_class("flex-1 btn-regular rounded-md py-2 px-3 flex items-center justify-center gap-2 active:scale-95 transition-all relative overflow-hidden", void 0, {
					"opacity-60": currentLayout !== "grid",
					"bg-(--btn-regular-bg-hover)": currentLayout === "grid"
				})}${$.attr("disabled", isSwitching, true)}${$.attr("title", i18n(I18nKey.postListLayoutGrid))}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"></path></svg> <span class="text-xs font-medium">${$.escape(i18n(I18nKey.postListLayoutGrid))}</span></button></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (isCardBorderSwitchable || isCardFollowThemeSwitchable) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div><div class="section-title">${$.escape(i18n(I18nKey.cardSettings))} <button aria-label="Reset to Default"${$.attr_class("btn-regular rounded-md active:scale-90", void 0, {
					"opacity-0": cardSettingsIsDefault(),
					"pointer-events-none": cardSettingsIsDefault()
				})}${$.attr("disabled", cardSettingsIsDefault(), true)}${$.attr("aria-hidden", cardSettingsIsDefault() ? "true" : void 0)}><div class="text-(--btn-content)">`);
				Icon($$renderer, {
					icon: "fa7-solid:arrow-rotate-left",
					class: "text-[0.75rem]"
				});
				$$renderer.push(`<!----></div></button></div> <div class="space-y-1">`);
				if (isCardBorderSwitchable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button${$.attr_class("w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden", void 0, { "bg-(--btn-regular-bg-hover)": cardBorderEnabled })}>`);
					Icon($$renderer, {
						icon: "material-symbols:border-outer-rounded",
						class: "text-[1.25rem] shrink-0"
					});
					$$renderer.push(`<!----> <span class="text-sm flex-1">${$.escape(i18n(I18nKey.cardBorder))}</span> <div${$.attr_class("w-10 h-5 rounded-full transition-all duration-200 relative", void 0, {
						"bg-(--primary)": cardBorderEnabled,
						"bg-(--btn-regular-bg-active)": !cardBorderEnabled
					})}><div${$.attr_class("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200", void 0, {
						"left-0.5": !cardBorderEnabled,
						"left-5": cardBorderEnabled
					})}></div></div></button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (isCardFollowThemeSwitchable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button${$.attr_class("w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden", void 0, { "bg-(--btn-regular-bg-hover)": cardFollowThemeEnabled })}>`);
					Icon($$renderer, {
						icon: "material-symbols:palette",
						class: "text-[1.25rem] shrink-0"
					});
					$$renderer.push(`<!----> <span class="text-sm flex-1">${$.escape(i18n(I18nKey.cardFollowTheme))}</span> <div${$.attr_class("w-10 h-5 rounded-full transition-all duration-200 relative", void 0, {
						"bg-(--primary)": cardFollowThemeEnabled,
						"bg-(--btn-regular-bg-active)": !cardFollowThemeEnabled
					})}><div${$.attr_class("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200", void 0, {
						"left-0.5": !cardFollowThemeEnabled,
						"left-5": cardFollowThemeEnabled
					})}></div></div></button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/components/common/DropdownItem.svelte
function DropdownItem($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { isActive = false, isLast = false, class: className = "", onclick, role, children, $$slots, $$events, ...restProps } = $$props;
		const baseClasses = "flex transition whitespace-nowrap items-center justify-start! w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95";
		const allClasses = $.derived(() => {
			return `${baseClasses} ${isLast ? "" : "mb-0.5"} ${isActive ? "current-theme-btn" : ""} ${className}`.trim();
		});
		$$renderer.push(`<button${$.attributes({
			class: $.clsx(allClasses()),
			role,
			...restProps
		})}>`);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></button>`);
	});
}
//#endregion
//#region src/components/common/DropdownPanel.svelte
function DropdownPanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { class: className = "", children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${$.attributes({
			class: $.clsx(`float-panel p-2 ${className}`.trim()),
			role: "none",
			...restProps
		})}>`);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/components/controls/LightDarkSwitch.svelte
function LightDarkSwitch($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let mode = LIGHT_MODE;
		let displayedMode = LIGHT_MODE;
		function switchScheme(newMode) {
			mode = newMode;
			setTheme(newMode);
			updateDisplayedMode();
		}
		function updateDisplayedMode() {
			if (mode === "system") displayedMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_MODE : LIGHT_MODE;
			else displayedMode = mode;
		}
		onMount(() => {
			const storedTheme = getStoredTheme();
			mode = storedTheme;
			updateDisplayedMode();
			if (storedTheme !== "system") {
				if (storedTheme !== (document.documentElement.classList.contains("dark") ? "dark" : "light")) applyThemeToDocument(storedTheme);
			}
			if (storedTheme === "system") {
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				const handleSystemChange = () => {
					updateDisplayedMode();
				};
				mediaQuery.addEventListener("change", handleSystemChange);
			}
			const handleContentReplace = () => {
				mode = getStoredTheme();
				updateDisplayedMode();
			};
			const win = window;
			if (win.swup?.hooks) win.swup.hooks.on("content:replace", handleContentReplace);
			else document.addEventListener("swup:enable", () => {
				const w = window;
				if (w.swup?.hooks) w.swup.hooks.on("content:replace", handleContentReplace);
			});
			const handleThemeChange = () => {
				if (mode !== "system") {
					mode = getStoredTheme();
					updateDisplayedMode();
				} else updateDisplayedMode();
			};
			window.addEventListener("theme-change", handleThemeChange);
			return () => {
				window.removeEventListener("theme-change", handleThemeChange);
			};
		});
		$$renderer.push(`<div class="relative z-50"><button aria-label="Light/Dark Mode" aria-haspopup="menu" aria-controls="theme-mode-panel" aria-expanded="false" class="relative btn-plain scale-animation rounded-lg h-9 w-9 md:h-11 md:w-11 active:scale-90" id="scheme-switch"><div${$.attr_class("absolute inset-0 flex items-center justify-center", void 0, { "opacity-0": displayedMode !== LIGHT_MODE })}>`);
		Icon($$renderer, {
			icon: "material-symbols:wb-sunny-outline-rounded",
			class: "text-[1.25rem]"
		});
		$$renderer.push(`<!----></div> <div${$.attr_class("absolute inset-0 flex items-center justify-center", void 0, { "opacity-0": displayedMode !== DARK_MODE })}>`);
		Icon($$renderer, {
			icon: "material-symbols:dark-mode-outline-rounded",
			class: "text-[1.25rem]"
		});
		$$renderer.push(`<!----></div></button> <div id="theme-mode-panel" class="absolute transition float-panel-closed top-11 -right-2 pt-5 z-50" role="menu" aria-labelledby="scheme-switch" data-floating-panel="" data-floating-panel-trigger="scheme-switch" inert="" aria-hidden="true">`);
		DropdownPanel($$renderer, {
			children: ($$renderer) => {
				DropdownItem($$renderer, {
					role: "menuitem",
					isActive: mode === LIGHT_MODE,
					isLast: false,
					onclick: () => switchScheme(LIGHT_MODE),
					children: ($$renderer) => {
						Icon($$renderer, {
							icon: "material-symbols:wb-sunny-outline-rounded",
							class: "text-[1.25rem] mr-3"
						});
						$$renderer.push(`<!----> ${$.escape(i18n(I18nKey.lightMode))}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				DropdownItem($$renderer, {
					role: "menuitem",
					isActive: mode === DARK_MODE,
					isLast: false,
					onclick: () => switchScheme(DARK_MODE),
					children: ($$renderer) => {
						Icon($$renderer, {
							icon: "material-symbols:dark-mode-outline-rounded",
							class: "text-[1.25rem] mr-3"
						});
						$$renderer.push(`<!----> ${$.escape(i18n(I18nKey.darkMode))}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				DropdownItem($$renderer, {
					role: "menuitem",
					isActive: mode === SYSTEM_MODE,
					isLast: true,
					onclick: () => switchScheme(SYSTEM_MODE),
					children: ($$renderer) => {
						Icon($$renderer, {
							icon: "material-symbols:brightness-auto-outline-rounded",
							class: "text-[1.25rem] mr-3"
						});
						$$renderer.push(`<!----> ${$.escape(i18n(I18nKey.systemMode))}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
//#region src/utils/floating-panel-utils.ts
var FLOATING_PANEL_CLOSE_EVENT = "floating-panel:close";
//#endregion
//#region src/components/controls/Search.svelte
function Search($$renderer, $$props) {
	$$renderer.component(($$renderer2) => {
		let keywordDesktop = "";
		let keywordMobile = "";
		let result = [];
		let isSearching = false;
		let initialized = false;
		let debounceTimer;
		let searchRequestId = 0;
		url("/"), url("/");
		const setPanelVisibility = (show, isDesktop) => {
			const panel = document.getElementById("search-panel");
			if (!panel || isDesktop && true || !isDesktop && true) return;
			show ? panel.classList.remove("float-panel-closed") : panel.classList.add("float-panel-closed");
		};
		const cancelPendingSearch = () => {
			clearTimeout(debounceTimer);
			searchRequestId += 1;
			isSearching = false;
		};
		const search = async (keyword, isDesktop) => {
			if (!keyword) {
				cancelPendingSearch();
				setPanelVisibility(false, isDesktop);
				result = [];
				return;
			}
			if (!initialized) return;
			clearTimeout(debounceTimer);
			const requestId = ++searchRequestId;
			isSearching = true;
			debounceTimer = setTimeout(async () => {
				try {
					let searchResults = [];
					if (window.pagefind) {
						const response = await window.pagefind.search(keyword);
						searchResults = await Promise.all(response.results.map((item) => item.data()));
					}
					if (requestId !== searchRequestId) return;
					result = searchResults;
					setPanelVisibility(true, isDesktop);
				} catch (error) {
					if (requestId !== searchRequestId) return;
					console.error("Search error:", error);
					result = [];
					setPanelVisibility(false, isDesktop);
				} finally {
					if (requestId === searchRequestId) isSearching = false;
				}
			}, 300);
		};
		onMount(() => {
			const initializePagefind = () => {
				initialized = true;
			};
			if (window.pagefind) initializePagefind();
			else {
				document.addEventListener("pagefindready", initializePagefind, { once: true });
				document.addEventListener("pagefindloaderror", initializePagefind, { once: true });
			}
			const panel = document.getElementById("search-panel");
			panel?.addEventListener(FLOATING_PANEL_CLOSE_EVENT, cancelPendingSearch);
			return () => {
				panel?.removeEventListener(FLOATING_PANEL_CLOSE_EVENT, cancelPendingSearch);
				document.removeEventListener("pagefindready", initializePagefind);
				document.removeEventListener("pagefindloaderror", initializePagefind);
				cancelPendingSearch();
			};
		});
		$: if (initialized && true) search(keywordDesktop, true);
		$: if (initialized && true) search(keywordMobile, false);
		$$renderer2.push(`<div id="search-bar" class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/4 hover:bg-black/6 focus-within:bg-black/6 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">`);
		Icon($$renderer2, {
			icon: "material-symbols:search",
			class: "absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
		});
		$$renderer2.push(`<!----> <input id="search-input-desktop"${$.attr("placeholder", i18n(I18nKey.search))}${$.attr("value", keywordDesktop)} aria-controls="search-panel" data-floating-panel-no-expanded="" class="transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50 svelte-1n2o1uz"/></div> <button aria-label="Search Panel" aria-controls="search-panel" aria-expanded="false" id="search-switch" class="btn-plain scale-animation lg:hidden! rounded-lg w-9 h-9 md:w-11 md:h-11 active:scale-90">`);
		Icon($$renderer2, {
			icon: "material-symbols:search",
			class: "text-[1.25rem]"
		});
		$$renderer2.push(`<!----></button> <div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-120 top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2 svelte-1n2o1uz" data-floating-panel="" data-floating-panel-trigger="search-switch search-input-desktop" inert="" aria-hidden="true"><div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/4 hover:bg-black/6 focus-within:bg-black/6 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">`);
		Icon($$renderer2, {
			icon: "material-symbols:search",
			class: "absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
		});
		$$renderer2.push(`<!----> <input${$.attr("placeholder", i18n(I18nKey.search))}${$.attr("value", keywordMobile)} class="pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50 svelte-1n2o1uz"/></div> `);
		if (isSearching) {
			$$renderer2.push("<!--[0-->");
			$$renderer2.push(`<div class="transition first-of-type:mt-2 lg:first-of-type:mt-0 block rounded-xl text-lg px-3 py-2 text-50">${$.escape(i18n(I18nKey.searchLoading))}</div>`);
		} else if (result.length > 0) {
			$$renderer2.push("<!--[1-->");
			$$renderer2.push(`<!--[-->`);
			const each_array = $.ensure_array_like(result.slice(0, 5));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer2.push(`<a${$.attr("href", item.url)} class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active)"><div class="transition text-90 inline-flex font-bold group-hover:text-(--primary)">${$.html(item.meta.title)} `);
				Icon($$renderer2, {
					icon: "fa7-solid:chevron-right",
					class: "transition text-[0.75rem] translate-x-1 my-auto text-(--primary)"
				});
				$$renderer2.push(`<!----></div> `);
				if (item.excerpt.includes("<mark>")) {
					$$renderer2.push("<!--[0-->");
					$$renderer2.push(`<div class="transition text-sm text-50" style="display: flex; align-items: flex-start; margin-top: 0.1rem"><div>${$.html(item.excerpt)}</div></div>`);
				} else $$renderer2.push("<!--[-1-->");
				$$renderer2.push(`<!--]--> `);
				if (item.content && item.content.includes("<mark>")) {
					$$renderer2.push("<!--[0-->");
					$$renderer2.push(`<div class="transition text-sm text-30" style="display: flex; align-items: flex-start; margin-top: 0.1rem"><span style="display: inline-block; background-color: var(--btn-plain-bg-active); color: var(--primary); padding: 0.1em 0.4em; border-radius: 5px; font-size: 0.75em; font-weight: 600; margin-right: 0.5em; shrink: 0;">${$.escape(i18n(I18nKey.searchContent))}</span> <div>${$.html(item.content)}</div></div>`);
				} else $$renderer2.push("<!--[-1-->");
				$$renderer2.push(`<!--]--></a>`);
			}
			$$renderer2.push(`<!--]--> `);
			if (result.length > 5) {
				$$renderer2.push("<!--[0-->");
				$$renderer2.push(`<a${$.attr("href", getSearchUrl(keywordMobile))} class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) text-(--primary) font-bold text-center"><span class="inline-flex items-center">${$.escape(i18n(I18nKey.searchViewMore).replace("{count}", (result.length - 5).toString()))} `);
				Icon($$renderer2, {
					icon: "fa7-solid:arrow-right",
					class: "transition text-[0.75rem] ml-1"
				});
				$$renderer2.push(`<!----></span></a>`);
			} else $$renderer2.push("<!--[-1-->");
			$$renderer2.push(`<!--]-->`);
		} else if (result.length === 0) {
			$$renderer2.push("<!--[2-->");
			$$renderer2.push(`<div class="transition first-of-type:mt-2 lg:first-of-type:mt-0 block rounded-xl text-lg px-3 py-2 text-50">${$.escape(i18n(I18nKey.searchNoResults))}</div>`);
		} else $$renderer2.push("<!--[-1-->");
		$$renderer2.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/components/features/MusicPlayer.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$MusicPlayer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MusicPlayer;
	const { class: className, style, id } = Astro.props;
	const config = musicPlayerConfig;
	const widgetId = id || `music-widget-${Math.random().toString(36).substring(2, 9)}`;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(widgetId, "id")}${addAttribute(["music-player-widget w-full relative transition-all duration-300", className], "class:list")}${addAttribute(style, "style")} role="region"${addAttribute(i18n(I18nKey.music), "aria-label")} data-astro-cid-h2szdtt3><!-- Top Row: Cover & Info --><div class="flex items-center gap-2 mb-2 px-1" data-astro-cid-h2szdtt3><!-- Circular Cover --><div class="relative shrink-0 w-14 h-14 group" data-astro-cid-h2szdtt3><div class="w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white dark:border-neutral-700 relative z-10 bg-(--primary)/10 flex items-center justify-center" data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:music-note-rounded",
		"class": "text-2xl text-(--primary) opacity-40 absolute",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}<img class="music-cover w-full h-full object-cover animate-spin-slow relative z-10 opacity-0 transition-opacity duration-300" src=""${addAttribute(i18n(I18nKey.musicCover), "alt")} style="animation-play-state: paused;" data-astro-cid-h2szdtt3></div></div><!-- Info Section --><div class="flex-1 min-w-0 flex flex-col overflow-hidden" data-astro-cid-h2szdtt3><div class="flex items-center justify-between overflow-hidden gap-2" data-astro-cid-h2szdtt3><div class="flex-1 min-w-0 overflow-hidden relative" data-astro-cid-h2szdtt3><h3 class="music-title font-bold text-base text-neutral-800 dark:text-neutral-100 leading-tight truncate" data-astro-cid-h2szdtt3>${i18n(I18nKey.music)}</h3></div><!-- Top Right: Lyric Toggle --><button${addAttribute(`btn-lrc-toggle hover:text-(--primary) transition-all duration-300 p-0.5 pr-2 transform active:scale-95 text-neutral-400 shrink-0 ${!config.showLyrics ? "hidden" : ""}`, "class")}${addAttribute(i18n(I18nKey.musicLyrics), "title")}${addAttribute(i18n(I18nKey.musicLyrics), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:subtitles-off-outline-rounded",
		"class": "icon-lrc-off text-xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:subtitles-outline-rounded",
		"class": "icon-lrc-on text-xl hidden",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button></div><div class="min-w-0 overflow-hidden" data-astro-cid-h2szdtt3><p class="music-artist text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate" data-astro-cid-h2szdtt3>${i18n(I18nKey.musicNoPlaying)}</p></div><!-- Time Display & Volume --><div class="flex items-center gap-3 text-neutral-400 h-5" data-astro-cid-h2szdtt3><div class="text-[10px] font-mono flex items-center gap-1 shrink-0 h-full" aria-live="polite" data-astro-cid-h2szdtt3><span class="current-time" data-astro-cid-h2szdtt3>0:00</span><span class="opacity-50" aria-hidden="true" data-astro-cid-h2szdtt3>/</span><span class="total-time" data-astro-cid-h2szdtt3>0:00</span></div><!-- Volume (Always visible) --><div class="flex items-center gap-1 bg-transparent h-full ml-auto" data-astro-cid-h2szdtt3><button class="btn-mute hover:text-(--primary) transition-colors p-0.5 rounded-md flex items-center"${addAttribute(i18n(I18nKey.musicVolume), "title")}${addAttribute(i18n(I18nKey.musicVolume), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:volume-up-rounded",
		"class": " icon-vol-high text-lg",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:volume-off-rounded",
		"class": "icon-vol-mute text-lg hidden",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button><div class="w-16 transition-all duration-300 ease-out flex items-center" data-astro-cid-h2szdtt3><div class="vol-container h-1 w-16 bg-neutral-300/50 dark:bg-neutral-500/40 rounded-full cursor-pointer relative ml-1" role="slider"${addAttribute(i18n(I18nKey.musicVolume), "aria-label")} aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" data-astro-cid-h2szdtt3><div class="vol-bar absolute left-0 top-0 h-full bg-(--primary) rounded-full w-[70%]" data-astro-cid-h2szdtt3></div></div></div></div></div></div></div><!-- Progress Bar (Slim) --><div class="px-1" data-astro-cid-h2szdtt3><div class="progress-container relative w-full h-1 bg-neutral-300/60 dark:bg-neutral-500/40 rounded-full cursor-pointer touch-none mb-2 group mt-2" role="slider"${addAttribute(i18n(I18nKey.musicProgress), "aria-label")} aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-astro-cid-h2szdtt3><div class="progress-bar absolute left-0 top-0 h-full bg-(--primary) rounded-full w-0 transition-[width] duration-100" data-astro-cid-h2szdtt3></div><!-- Hover Thumb --><div class="progress-thumb absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 bg-(--primary) ring-2 ring-white dark:ring-neutral-800 rounded-full shadow-sm scale-0 group-hover:scale-100 transition-transform duration-200" data-astro-cid-h2szdtt3></div></div></div><!-- Controls Row --><div class="flex items-center justify-between px-1 select-none" data-astro-cid-h2szdtt3><!-- Repeat Mode --><button class="btn-repeat text-neutral-300 dark:text-neutral-600 hover:text-(--primary) transition-colors p-2 active:scale-95"${addAttribute(i18n(I18nKey.musicPlayMode), "title")}${addAttribute(i18n(I18nKey.musicPlayMode), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:repeat-rounded",
		"class": "icon-repeat text-xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:repeat-one-rounded",
		"class": "icon-repeat-one text-xl hidden",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:shuffle-rounded",
		"class": "icon-shuffle text-xl hidden",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button><!-- Prev --><button class="btn-prev text-neutral-600 dark:text-neutral-300 hover:text-(--primary) transition-colors p-2 active:scale-95"${addAttribute(i18n(I18nKey.musicPrev), "title")}${addAttribute(i18n(I18nKey.musicPrev), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:skip-previous-rounded",
		"class": "text-3xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button><!-- Play/Pause (Feature) --><button class="btn-play w-12 h-12 bg-(--btn-regular-bg) hover:bg-(--btn-regular-bg-hover) active:bg-(--btn-regular-bg-active) text-(--primary) rounded-full flex items-center justify-center transition-all duration-300"${addAttribute(i18n(I18nKey.musicPlay), "title")}${addAttribute(i18n(I18nKey.musicPlay), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:play-arrow-rounded",
		"class": "icon-play text-3xl ml-0.5",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:pause-rounded",
		"class": "icon-pause text-3xl hidden",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button><!-- Next --><button class="btn-next text-neutral-600 dark:text-neutral-300 hover:text-(--primary) transition-colors p-2 active:scale-95"${addAttribute(i18n(I18nKey.musicNext), "title")}${addAttribute(i18n(I18nKey.musicNext), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:skip-next-rounded",
		"class": "text-3xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button><!-- Playlist Toggle Arrow --><button class="btn-drawer-toggle text-neutral-400 hover:text-(--primary) transition-all duration-300 p-2 transform active:scale-95"${addAttribute(i18n(I18nKey.musicPlaylist), "title")}${addAttribute(i18n(I18nKey.musicPlaylist), "aria-label")} data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "mdi:playlist-music",
		"class": "text-xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</button></div><!-- Lyrics Drawer --><div class="lrc-drawer grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] grid-rows-[0fr] opacity-0" data-astro-cid-h2szdtt3><div class="overflow-hidden min-h-0" data-astro-cid-h2szdtt3><div class="mt-2 pt-2 border-t border-neutral-100 dark:border-white/5 mx-1" data-astro-cid-h2szdtt3><div class="lrc-container h-48 overflow-y-auto custom-scrollbar flex flex-col items-center gap-2 p-4 py-24 text-center relative scroll-smooth" role="listbox"${addAttribute(i18n(I18nKey.musicLyrics), "aria-label")} data-astro-cid-h2szdtt3><div class="text-neutral-400 text-sm py-10" role="option" data-astro-cid-h2szdtt3>${i18n(I18nKey.musicNoLyrics)}</div></div></div></div></div><!-- Playlist Drawer (Accordion) --><div class="playlist-drawer grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] grid-rows-[0fr] opacity-0" data-astro-cid-h2szdtt3><div class="overflow-hidden min-h-0" data-astro-cid-h2szdtt3><div class="mt-2 pt-2 border-t border-neutral-100 dark:border-white/5 mx-1" data-astro-cid-h2szdtt3><div class="playlist-container max-h-48 overflow-y-auto custom-scrollbar pr-1 pb-1 relative" role="listbox"${addAttribute(i18n(I18nKey.musicPlaylist), "aria-label")} data-astro-cid-h2szdtt3><!-- Items --></div></div></div></div><!-- Loading Overlay --><div class="music-loading absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 dark:bg-[#1e1e1e]/60 backdrop-blur-[2px] transition-opacity duration-300 opacity-0 pointer-events-none rounded-xl" aria-busy="true" aria-hidden="true" data-astro-cid-h2szdtt3><div class="w-8 h-8 text-(--primary) animate-spin" data-astro-cid-h2szdtt3>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:sync-rounded",
		"class": "text-3xl",
		"aria-hidden": "true",
		"data-astro-cid-h2szdtt3": true
	})}</div></div></div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/MusicPlayer.astro", void 0);
//#endregion
//#region src/utils/image-utils.ts
var { randomCoverImage } = coverImageConfig;
/**
* 根据seed生成确定性hash值
*/
function getSeedHash(seed) {
	return seed ? Math.abs(seed.split("").reduce((acc, char) => {
		return (acc << 5) - acc + char.charCodeAt(0) | 0;
	}, 0)) : 0;
}
/**
* 为API URL添加seed参数，确保每篇文章获取不同图片
*/
function appendSeedParam(apiUrl, hash) {
	if (hash === 0) return apiUrl;
	return `${apiUrl}${apiUrl.includes("?") ? "&" : "?"}v=${hash}`;
}
/**
* 处理文章封面图
* 当image字段为"api"时，返回第一个API的URL（客户端会按顺序尝试所有API）
* @param image - 文章frontmatter中的image字段值
* @param seed - 用于生成唯一URL的种子（文章id或slug）
*/
function processCoverImageSync(image, seed) {
	if (!image || image === "") return "";
	if (image !== "api") return image;
	if (!randomCoverImage.enable || !randomCoverImage.apis || randomCoverImage.apis.length === 0) return "";
	const hash = getSeedHash(seed);
	return appendSeedParam(randomCoverImage.apis[0], hash);
}
/**
* 获取所有随机封面图API URL列表（带seed参数）
* 用于客户端按顺序尝试，第一个成功即使用，全部失败则显示回退图片
* @param image - 文章frontmatter中的image字段值
* @param seed - 用于生成唯一URL的种子（文章id或slug）
*/
function getApiUrlList(image, seed) {
	if (image !== "api" || !randomCoverImage.enable || !randomCoverImage.apis) return [];
	const hash = getSeedHash(seed);
	return randomCoverImage.apis.map((api) => appendSeedParam(api, hash));
}
/**
* 获取图片优化格式配置
*/
function getImageFormats() {
	switch (siteConfig.imageOptimization?.formats ?? "both") {
		case "avif": return ["avif"];
		case "webp": return ["webp"];
		default: return ["avif", "webp"];
	}
}
/**
* 获取图片优化质量配置
*/
function getImageQuality() {
	return siteConfig.imageOptimization?.quality ?? 80;
}
/**
* 获取图片回退格式
*/
function getFallbackFormat() {
	return (siteConfig.imageOptimization?.formats ?? "both") === "avif" ? "avif" : "webp";
}
/**
* 检查是否需要为图片添加 referrerpolicy="no-referrer" 以解决防盗链 403 问题
*/
function shouldAddNoReferrer(urlStr) {
	if (!urlStr.startsWith("http")) return false;
	const domains = siteConfig.imageOptimization?.noReferrerDomains || [];
	if (domains.length === 0) return false;
	try {
		const hostname = new URL(urlStr).hostname;
		return domains.some((pattern) => {
			const regexPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*");
			return new RegExp(`^${regexPattern}$`).test(hostname);
		});
	} catch {
		return false;
	}
}
//#endregion
//#region src/components/common/DropdownItem.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$DropdownItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DropdownItem;
	const { href, target, isActive = false, isLast = false, class: className, onclick } = Astro.props;
	const allClasses = `flex transition whitespace-nowrap items-center justify-start! w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 ${isLast ? "" : "mb-0.5"} ${isActive ? "current-theme-btn" : ""} ${className || ""}`.trim();
	return renderTemplate`${renderComponent($$result, "Tag", href ? "a" : "button", {
		"href": href,
		"target": target,
		"class": allClasses,
		"onclick": onclick
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/DropdownItem.astro", void 0);
//#endregion
//#region src/components/common/DropdownPanel.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$DropdownPanel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DropdownPanel;
	const { class: className } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["float-panel p-2", className], "class:list")} role="none">${renderSlot($$result, $$slots["default"])}</div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/DropdownPanel.astro", void 0);
//#endregion
//#region src/components/layout/DropdownMenu.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$DropdownMenu = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DropdownMenu;
	const { link, class: className } = Astro.props;
	if (!link) return null;
	const processedLink = link;
	const hasChildren = processedLink.children && processedLink.children.length > 0;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["dropdown-container", className], "class:list")} data-dropdown data-astro-cid-aitcplad>${hasChildren ? renderTemplate`<button class="btn-plain scale-animation rounded-lg h-10 font-bold px-4 pr-8 active:scale-95 dropdown-trigger relative" aria-expanded="false" aria-haspopup="true" data-dropdown-trigger data-astro-cid-aitcplad><div class="flex items-center gap-1.5" data-astro-cid-aitcplad>${processedLink.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": processedLink.icon,
		"class": "text-[1.1rem] mr-1.5 navbar-icon",
		"data-astro-cid-aitcplad": true
	})}`}${processedLink.name}</div>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:keyboard-arrow-down-rounded",
		"class": "text-[1.2rem] transition-transform duration-200 dropdown-arrow absolute right-2.5 top-1/2 -translate-y-1/2",
		"data-astro-cid-aitcplad": true
	})}</button><div class="dropdown-menu" data-dropdown-menu data-astro-cid-aitcplad>${renderComponent($$result, "DropdownPanel", $$DropdownPanel, {
		"class": "dropdown-content",
		"data-astro-cid-aitcplad": true
	}, { "default": ($$result) => renderTemplate`${processedLink.children?.map((child, index) => renderTemplate`${renderComponent($$result, "DropdownItem", $$DropdownItem, {
		"href": child.external ? child.url : url(child.url),
		"target": child.external ? "_blank" : void 0,
		"isLast": index === (processedLink.children?.length || 0) - 1,
		"class": "dropdown-item focus-ring-inset h-10",
		"data-astro-cid-aitcplad": true
	}, { "default": ($$result) => renderTemplate`${child.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": child.icon,
		"class": "text-[1.25rem] mr-3 navbar-icon",
		"data-astro-cid-aitcplad": true
	})}`}<span data-astro-cid-aitcplad>${child.name}</span>${child.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-up-right-from-square",
		"class": "text-[0.75rem] text-black/25 dark:text-white/25 ml-auto",
		"data-astro-cid-aitcplad": true
	})}`}` })}`)}` })}</div>` : renderTemplate`<a${addAttribute(processedLink.name, "aria-label")}${addAttribute(processedLink.external ? processedLink.url : url(processedLink.url), "href")}${addAttribute(processedLink.external ? "_blank" : null, "target")} class="btn-plain scale-animation rounded-lg h-10 font-bold px-4 active:scale-95" data-astro-cid-aitcplad><div class="flex items-center gap-1.5" data-astro-cid-aitcplad>${processedLink.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": processedLink.icon,
		"class": "text-[1.1rem] mr-1.5 navbar-icon",
		"data-astro-cid-aitcplad": true
	})}`}${processedLink.name}${processedLink.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-up-right-from-square",
		"class": "text-[0.875rem] transition -translate-y-px ml-1 text-black/20 dark:text-white/20",
		"data-astro-cid-aitcplad": true
	})}`}</div></a>`}</div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/DropdownMenu.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/DropdownMenu.astro", void 0);
//#endregion
//#region src/components/layout/NavMenuPanel.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$NavMenuPanel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NavMenuPanel;
	const processedLinks = Astro.props.links;
	return renderTemplate`${maybeRenderHead($$result)}<div id="nav-menu-panel"${addAttribute(["float-panel float-panel-closed transition-all fixed right-4 px-2 py-2 max-h-[80vh] overflow-y-auto"], "class:list")} data-floating-panel data-floating-panel-trigger="nav-menu-switch" inert aria-hidden="true" data-astro-cid-aq3gu47h>${processedLinks.map((link, index) => renderTemplate`<div class="mobile-menu-item" data-astro-cid-aq3gu47h>${link.children && link.children.length > 0 ? renderTemplate`<div class="mobile-dropdown" data-mobile-dropdown data-astro-cid-aq3gu47h><button class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 w-full text-left
                            hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) transition" data-mobile-dropdown-trigger aria-expanded="false"${addAttribute(`mobile-submenu-${index}`, "aria-controls")} data-astro-cid-aq3gu47h><div class="flex items-center transition text-black/75 dark:text-white/75 font-bold group-hover:text-(--primary) group-active:text-(--primary)" data-astro-cid-aq3gu47h>${link.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": link.icon,
		"class": "text-[1.1rem] mr-2",
		"data-astro-cid-aq3gu47h": true
	})}`}${link.name}</div>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:keyboard-arrow-down-rounded",
		"class": "transition text-[1.25rem] text-(--primary) mobile-dropdown-arrow duration-200",
		"data-astro-cid-aq3gu47h": true
	})}</button><div${addAttribute(`mobile-submenu-${index}`, "id")} class="mobile-submenu" data-mobile-submenu inert aria-hidden="true" data-astro-cid-aq3gu47h>${link.children.map((child) => renderTemplate`<a${addAttribute(child.external ? child.url : url(child.url), "href")} class="group flex justify-between items-center py-2 pl-6 pr-1 rounded-lg gap-8
                                   hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) transition"${addAttribute(child.external ? "_blank" : null, "target")} data-astro-cid-aq3gu47h><div class="flex items-center transition text-black/60 dark:text-white/60 font-medium group-hover:text-(--primary) group-active:text-(--primary)" data-astro-cid-aq3gu47h>${child.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": child.icon,
		"class": "text-[1.1rem] mr-2",
		"data-astro-cid-aq3gu47h": true
	})}`}${child.name}</div>${child.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-up-right-from-square",
		"class": "transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1",
		"data-astro-cid-aq3gu47h": true
	})}`}</a>`)}</div></div>` : renderTemplate`<a${addAttribute(link.external ? link.url : url(link.url), "href")} class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8
                    hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) transition
                "${addAttribute(link.external ? "_blank" : null, "target")} data-astro-cid-aq3gu47h><div class="flex items-center transition text-black/75 dark:text-white/75 font-bold group-hover:text-(--primary) group-active:text-(--primary)" data-astro-cid-aq3gu47h>${link.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": link.icon,
		"class": "text-[1.1rem] mr-2",
		"data-astro-cid-aq3gu47h": true
	})}`}${link.name}</div>${!link.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:chevron-right-rounded",
		"class": "transition text-[1.25rem] text-(--primary)",
		"data-astro-cid-aq3gu47h": true
	})}`}${link.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-up-right-from-square",
		"class": "transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1",
		"data-astro-cid-aq3gu47h": true
	})}`}</a>`}</div>`)}</div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/NavMenuPanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/NavMenuPanel.astro", void 0);
//#endregion
//#region src/components/layout/Navbar.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Navbar;
	const className = Astro2.props.class;
	const navbarTransparentMode = backgroundWallpaper.mode === "banner" ? backgroundWallpaper.common?.navbar?.transparentMode || "semi" : "semi";
	const navbarBlur = backgroundWallpaper.mode === "banner" ? backgroundWallpaper.common?.navbar?.blur ?? 20 : 0;
	const navbarTitle = siteConfig.navbar.title || siteConfig.title;
	const navbarWidthFull = siteConfig.navbar.widthFull ?? false;
	const isNavbarMenuCentered = (siteConfig.navbar.menuAlign ?? "center") === "center";
	const isHomePageCheck = isHomePage(Astro2.url.pathname);
	const isDisplaySettingsEnabled = displaySettingsConfig.enable;
	const showThemeColor = displaySettingsConfig.themeColorSwitchable;
	const isWallpaperSwitchable = displaySettingsConfig.wallpaperModeSwitchable;
	const allowLayoutSwitch = displaySettingsConfig.layoutSwitchable;
	const hasDisplaySettings = showThemeColor || isWallpaperSwitchable || allowLayoutSwitch;
	const pages = siteConfig.pages;
	function isPageEnabled(link) {
		if (!link.pageKey) return true;
		return pages[link.pageKey] !== false;
	}
	function filterLinks(link) {
		if (!link.children) return isPageEnabled(link) ? link : null;
		const filteredChildren = link.children.filter(isPageEnabled);
		if (filteredChildren.length === 0) return null;
		if (filteredChildren.length === 1) return filteredChildren[0];
		return {
			...link,
			children: filteredChildren
		};
	}
	let links = navBarConfig.links.map(filterLinks).filter((link) => link !== null);
	const logoConfig = siteConfig.navbar.logo;
	const logoAlt = logoConfig?.alt || siteConfig.title;
	const logoIsImage = logoConfig?.type === "image" || logoConfig?.type === "url";
	const logoBaseClass = "navbar-logo h-7 w-7 mb-1 mr-2 object-contain";
	const logoFiles = /* #__PURE__ */ Object.assign({
		"../../assets/images/DesktopWallpaper/d1.avif": () => import("./d1_CLrVb1tC.mjs").then((m) => m["default"]),
		"../../assets/images/DesktopWallpaper/d2.avif": () => import("./d2_B9O6jQgx.mjs").then((m) => m["default"]),
		"../../assets/images/DesktopWallpaper/d3.avif": () => import("./d3_BWz8qNsx.mjs").then((m) => m["default"]),
		"../../assets/images/DesktopWallpaper/d4.avif": () => import("./d4_BZ8ZHCPh.mjs").then((m) => m["default"]),
		"../../assets/images/DesktopWallpaper/d5.avif": () => import("./d5_CCvSr59G.mjs").then((m) => m["default"]),
		"../../assets/images/DesktopWallpaper/d6.avif": () => import("./d6_2ohiVsAo.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m1.avif": () => import("./m1_BVpiuvq_.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m2.avif": () => import("./m2_DdxKJoKH.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m3.avif": () => import("./m3_DrOKzErV.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m4.avif": () => import("./m4_CLru-71Z.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m5.avif": () => import("./m5_q9NuhM0w.mjs").then((m) => m["default"]),
		"../../assets/images/MobileWallpaper/m6.avif": () => import("./m6_B3cmxAlq.mjs").then((m) => m["default"]),
		"../../assets/images/avatar.avif": () => import("./avatar_z67Z7owS.mjs").then((m) => m["default"]),
		"../../assets/images/logo/firefly-dark.png": () => import("./firefly-dark_CoeXM234.mjs").then((m) => m["default"]),
		"../../assets/images/logo/firefly-light.png": () => import("./firefly-light_BDHt0oJz.mjs").then((m) => m["default"]),
		"../../content/posts/guide/cover.avif": () => import("./cover_CYG2AtbN.mjs").then((m) => m["default"]),
		"../../content/posts/images/1.avif": () => import("./1_DKFGmNk8.mjs").then((m) => m["default"]),
		"../../content/posts/images/both-grid.avif": () => import("./both-grid_VUka10Zu.mjs").then((m) => m["default"]),
		"../../content/posts/images/both-list.avif": () => import("./both-list_DHgooVXJ.mjs").then((m) => m["default"]),
		"../../content/posts/images/docusaurus.avif": () => import("./docusaurus_oEWzCLy_.mjs").then((m) => m["default"]),
		"../../content/posts/images/firefly1.avif": () => import("./firefly1_P6xkLtPy.mjs").then((m) => m["default"]),
		"../../content/posts/images/firefly2.avif": () => import("./firefly2_xVqc9d_e.mjs").then((m) => m["default"]),
		"../../content/posts/images/firefly3.avif": () => import("./firefly3_BhkxXiwl.mjs").then((m) => m["default"]),
		"../../content/posts/images/github.avif": () => import("./github_D4Pszqb3.mjs").then((m) => m["default"]),
		"../../content/posts/images/left-grid3.avif": () => import("./left-grid3_DWMiuAXz.mjs").then((m) => m["default"]),
		"../../content/posts/images/left-list.avif": () => import("./left-list_CKiHI2Mx.mjs").then((m) => m["default"]),
		"../../content/posts/images/masonry.avif": () => import("./masonry_BkJ480Ih.mjs").then((m) => m["default"]),
		"../../content/posts/images/obsidian.avif": () => import("./obsidian_8BBZhG03.mjs").then((m) => m["default"]),
		"../../content/posts/images/right-grid2.avif": () => import("./right-grid2_XluaCAWo.mjs").then((m) => m["default"]),
		"../../content/posts/images/vitepress.avif": () => import("./vitepress_Bk5HFlG6.mjs").then((m) => m["default"])
	});
	async function resolveLocalLogo(value) {
		if (logoConfig?.type !== "image" || !value || value.startsWith("/") || value.startsWith("http")) return null;
		const normalizedPath = path$1.normalize(path$1.join("../../", value)).replace(/\\/g, "/");
		const file = logoFiles[normalizedPath];
		return file ? await file() : null;
	}
	const logoLightValue = logoConfig?.value || "";
	const logoDarkValue = logoConfig?.valueDark || "";
	const hasDarkLogo = !!logoDarkValue && logoDarkValue !== logoLightValue;
	const logoVariants = await Promise.all((hasDarkLogo ? [{
		value: logoLightValue,
		theme: "light",
		themeClass: "dark:hidden"
	}, {
		value: logoDarkValue,
		theme: "dark",
		themeClass: "hidden dark:block"
	}] : [{
		value: logoLightValue,
		theme: "light",
		themeClass: ""
	}]).filter((variant) => !!variant.value).map(async (variant) => ({
		theme: variant.theme,
		class: variant.themeClass ? `${logoBaseClass} ${variant.themeClass}` : logoBaseClass,
		image: await resolveLocalLogo(variant.value),
		src: logoConfig?.type === "url" ? variant.value : url(variant.value)
	})));
	return renderTemplate`${maybeRenderHead($$result)}<div id="navbar" class="z-50"${addAttribute(`--navbar-glass-blur: ${navbarBlur}px;`, "style")}${addAttribute(navbarTransparentMode, "data-transparent-mode")}${addAttribute(isHomePageCheck, "data-is-home")}${addAttribute(navbarWidthFull, "data-full-width")}><div${addAttribute([className, "overflow-visible! h-18 px-4"], "class:list")}><div class="mx-auto h-full w-full max-w-(--page-width) grid grid-cols-[auto_minmax(0,1fr)_auto] items-center"><a${addAttribute(url("/"), "href")} class="btn-plain scale-animation rounded-lg h-13 px-3 md:px-5 font-bold active:scale-95"><div${addAttribute(["flex flex-row items-center text-md", siteConfig.navbar.followTheme ? "text-(--primary)" : "dark:text-white text-black"], "class:list")} style="font-family: var(--font-navbar-title, inherit)">${logoConfig?.type === "icon" ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": logoConfig.value || "material-symbols:home-pin-outline",
		"class": "navbar-logo text-[1.75rem] mb-1 mr-2"
	})}` : logoIsImage && logoVariants.length > 0 ? logoVariants.map((variant) => variant.image ? renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": variant.image,
		"alt": logoAlt,
		"class": variant.class,
		"data-logo-theme": variant.theme,
		"formats": getImageFormats(),
		"fallbackFormat": getFallbackFormat(),
		"widths": [28, 56],
		"loading": "eager",
		"fetchpriority": "high"
	})}` : renderTemplate`<img${addAttribute(variant.src, "src")}${addAttribute(logoAlt, "alt")}${addAttribute(variant.class, "class")}${addAttribute(variant.theme, "data-logo-theme")} fetchpriority="high">`) : renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:home-pin-outline",
		"class": "navbar-logo text-[1.75rem] mb-1 mr-2"
	})}`}${navbarTitle}</div></a><div${addAttribute(["hidden lg:flex items-center space-x-1 col-start-2", isNavbarMenuCentered ? "justify-center" : "justify-start pl-2"], "class:list")}>${links.map((l) => {
		return renderTemplate`${renderComponent($$result, "DropdownMenu", $$DropdownMenu, { "link": l })}`;
	})}</div><div class="flex col-start-3 justify-self-end"><!--<SearchPanel client:load>-->${renderComponent($$result, "Search", Search, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/controls/Search.svelte",
		"client:component-export": "default"
	})}${musicPlayerConfig.showInNavbar && renderTemplate`<button${addAttribute(i18n(I18nKey.music), "aria-label")} aria-controls="music-nav-panel" aria-expanded="false" class="btn-plain scale-animation rounded-lg h-9 w-9 md:h-11 md:w-11 active:scale-90" id="music-player-switch">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:music-note-rounded",
		"class": "text-[1.25rem]"
	})}</button>`}${backgroundWallpaper.playerEnable && backgroundWallpaper.mode !== "none" && renderTemplate`<button${addAttribute(i18n(I18nKey.videoPlay), "aria-label")} class="btn-plain scale-animation rounded-lg h-9 w-9 md:h-11 md:w-11 active:scale-90" id="bg-player-toggle"${addAttribute(i18n(I18nKey.videoPlay), "data-i18n-play")}${addAttribute(i18n(I18nKey.videoPause), "data-i18n-pause")}><span class="bg-player-icon-play">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:play-arrow-rounded",
		"class": "text-[1.5rem]"
	})}</span><span class="bg-player-icon-pause hidden">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:pause-rounded",
		"class": "text-[1.5rem]"
	})}</span></button>`}${hasDisplaySettings && renderTemplate`<button aria-label="Display Settings" aria-controls="display-setting" aria-expanded="false" class="btn-plain scale-animation rounded-lg h-9 w-9 md:h-11 md:w-11 active:scale-90" id="display-settings-switch">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:palette-outline",
		"class": "text-[1.25rem]"
	})}</button>`}${renderComponent($$result, "LightDarkSwitch", LightDarkSwitch, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/controls/LightDarkSwitch.svelte",
		"client:component-export": "default"
	})}<button aria-label="Menu" aria-controls="nav-menu-panel" aria-expanded="false" name="Nav Menu" class="btn-plain scale-animation rounded-lg w-9 h-9 md:w-11 md:h-11 active:scale-90 lg:hidden!" id="nav-menu-switch">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:menu-rounded",
		"class": "text-[1.25rem]"
	})}</button></div></div>${musicPlayerConfig.showInNavbar && renderTemplate`<div id="music-nav-panel" class="float-panel float-panel-closed absolute transition-all right-16 p-2 pt-4.5 w-80 z-50" data-floating-panel data-floating-panel-trigger="music-player-switch" inert aria-hidden="true">${renderComponent($$result, "MusicPlayer", $$MusicPlayer, {})}</div>`}${renderComponent($$result, "NavMenuPanel", $$NavMenuPanel, { "links": links })}${isDisplaySettingsEnabled && renderTemplate`${renderComponent($$result, "DisplaySettings", DisplaySettingsIntegrated, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/controls/DisplaySettingsIntegrated.svelte",
		"client:component-export": "default"
	})}`}</div></div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")}${renderTemplate`<script>(function(){${defineScriptVars({ scriptUrl: url("/pagefind/pagefind.js") })}
            {/* 你的 loadPagefind 函数的完整内容放在这里 */}
            async function loadPagefind() {
                try {
                    const response = await fetch(scriptUrl, { method: 'HEAD' });
                    if (!response.ok) {
                        throw new Error(\`Pagefind script not found: \${response.status}\`);
                    }
                    const pagefind = await import(scriptUrl);
                    await pagefind.options({
                        excerptLength: 20
                    });
                    window.pagefind = pagefind;
                    document.dispatchEvent(new CustomEvent('pagefindready'));
                    console.log('Pagefind loaded and initialized successfully, event dispatched.');
                } catch (error) {
                    console.error('Failed to load Pagefind:', error);
                    window.pagefind = {
                        search: () => Promise.resolve({ results: [] }),
                        options: () => Promise.resolve(),
                    };
                    document.dispatchEvent(new CustomEvent('pagefindloaderror'));
                    console.log('Pagefind load error, event dispatched.');
                }
            }

            window.__loadPagefind = function () {
                if (!window.__pagefindLoading) window.__pagefindLoading = loadPagefind();
                return window.__pagefindLoading;
            };
        })();<\/script>`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/Navbar.astro", void 0);
//#endregion
//#region src/components/common/WidgetLayout.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$WidgetLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WidgetLayout;
	const { id, name, showTitle = true, isCollapsed, collapsedHeight, useExpandedButtonSpacing = false, contentPadding = true, moreUrl, style } = Astro.props;
	const className = Astro.props.class;
	const $$definedVars = defineStyleVars([{ collapsedHeight }]);
	return renderTemplate`${renderComponent($$result, "widget-layout", "widget-layout", {
		"data-id": id,
		"data-is-collapsed": String(isCollapsed),
		"data-use-expanded-button-spacing": String(useExpandedButtonSpacing),
		"class:list": [
			"card-base",
			{ "pb-4": contentPadding },
			className
		],
		"style": `${style}; ${$$definedVars}`,
		"data-astro-cid-feazkes2": true
	}, { "default": ($$result) => renderTemplate`${name && showTitle && renderTemplate`${maybeRenderHead($$result)}<div class="widget-title font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2
            before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
            before:absolute before:left-[-16px] before:top-[5.5px] flex items-center justify-between"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2><span class="widget-name"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${name}</span>${renderSlot($$result, $$slots["title-icon"])}</div>`}<div${addAttribute(id, "id")}${addAttribute(["collapse-wrapper overflow-hidden", {
		"px-4": contentPadding,
		"collapsed": isCollapsed,
		"pt-4": contentPadding && (!name || !showTitle)
	}], "class:list")}${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${renderSlot($$result, $$slots["default"])}</div>${isCollapsed && renderTemplate`<div class="expand-btn px-4 -mb-2"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${moreUrl ? renderTemplate`<a${addAttribute(moreUrl, "href")} class="btn-plain rounded-lg w-full h-9 flex items-center justify-center"${addAttribute(i18n(I18nKey.more), "title")}${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2><div class="text-(--primary) flex items-center justify-center gap-2 -translate-x-2"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:more-horiz",
		"class": "text-[1.75rem]",
		"aria-hidden": "true",
		"data-astro-cid-feazkes2": true
	})}<span${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${i18n(I18nKey.more)}</span></div></a>` : renderTemplate`<button class="btn-plain rounded-lg w-full h-9"${addAttribute(i18n(I18nKey.more), "title")}${addAttribute(i18n(I18nKey.more), "aria-label")}${addAttribute(i18n(I18nKey.more), "data-show-more")}${addAttribute(i18n(I18nKey.collapse), "data-show-less")} data-expanded="false"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2><div class="text-(--primary) flex items-center justify-center gap-2 -translate-x-2"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:more-horiz",
		"class": "toggle-icon-more text-[1.75rem]",
		"aria-hidden": "true",
		"data-astro-cid-feazkes2": true
	})}${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:keyboard-arrow-up-rounded",
		"class": "toggle-icon-less hidden text-[1.75rem]",
		"aria-hidden": "true",
		"data-astro-cid-feazkes2": true
	})}<span class="toggle-text"${addAttribute($$definedVars, "style")} data-astro-cid-feazkes2>${i18n(I18nKey.more)}</span></div></button>`}</div>`}` })}${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/WidgetLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/WidgetLayout.astro", void 0);
//#endregion
//#region src/components/widget/Advertisement.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Advertisement = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Advertisement;
	const { class: className = "", style, widgetConfig } = Astro.props;
	const showTitle = widgetConfig?.showTitle !== false;
	const adConfig = widgetConfig?.specificConfig?.ad;
	if (!adConfig) return null;
	if (adConfig.expireDate ? /* @__PURE__ */ new Date() > new Date(adConfig.expireDate) : false) return null;
	const getPaddingStyle = () => {
		if (!adConfig.padding) return "padding: 1rem";
		const { all, top, right, bottom, left } = adConfig.padding;
		if (all !== void 0) return `padding: ${all === "0" ? "0" : all}`;
		const parts = [];
		if (top !== void 0) parts.push(`padding-top: ${top}`);
		if (right !== void 0) parts.push(`padding-right: ${right}`);
		if (bottom !== void 0) parts.push(`padding-bottom: ${bottom}`);
		if (left !== void 0) parts.push(`padding-left: ${left}`);
		return parts.length > 0 ? parts.join("; ") : "padding: 1rem";
	};
	const paddingStyle = getPaddingStyle();
	const widgetId = `advertisement-${Math.random().toString(36).slice(2, 8)}`;
	const useContentPadding = !adConfig.padding;
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": adConfig.title || i18n(I18nKey.advertisement),
		"showTitle": showTitle,
		"id": widgetId,
		"contentPadding": useContentPadding,
		"class:list": ["advertisement-widget group", className],
		"style": style,
		"data-astro-cid-vw5l5woe": true
	}, { "default": ($$result) => renderTemplate`${adConfig.closable && renderTemplate`${maybeRenderHead($$result)}<button class="close-ad-btn absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full
        bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600
        text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200
        transition-all duration-200 z-10 opacity-0 group-hover:opacity-100" title="Close" aria-label="Close"${addAttribute(widgetId, "data-ad-id")} data-astro-cid-vw5l5woe>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:xmark",
		"class": "w-3.5 h-3.5",
		"aria-hidden": "true",
		"data-astro-cid-vw5l5woe": true
	})}</button>`}<div${addAttribute(paddingStyle, "style")} data-astro-cid-vw5l5woe><!-- 图片 -->${adConfig.image && renderTemplate`<div${addAttribute([{ "mb-3": adConfig.content || adConfig.link }], "class:list")} data-astro-cid-vw5l5woe>${adConfig.image.link ? renderTemplate`<a${addAttribute(adConfig.image.link, "href")}${addAttribute(adConfig.image.external ? "_blank" : "_self", "target")}${addAttribute(adConfig.image.external ? "noopener noreferrer" : "", "rel")} class="block overflow-hidden rounded-lg" data-astro-cid-vw5l5woe><img${addAttribute(adConfig.image.src.startsWith("/") ? url(adConfig.image.src) : adConfig.image.src, "src")}${addAttribute(adConfig.image.alt || "Advertisement", "alt")} class="w-full h-auto" loading="lazy" data-astro-cid-vw5l5woe></a>` : renderTemplate`<img${addAttribute(adConfig.image.src.startsWith("/") ? url(adConfig.image.src) : adConfig.image.src, "src")}${addAttribute(adConfig.image.alt || "Advertisement", "alt")} class="w-full h-auto rounded-lg" loading="lazy" data-astro-cid-vw5l5woe>`}</div>`}<!-- 文本内容 -->${adConfig.content && renderTemplate`<p class="text-sm text-center mb-3 leading-relaxed text-neutral-600 dark:text-neutral-300 transition" data-astro-cid-vw5l5woe>${adConfig.content}</p>`}<!-- 链接按钮 -->${adConfig.link && renderTemplate`<div class="text-center" data-astro-cid-vw5l5woe><a${addAttribute(adConfig.link.url, "href")}${addAttribute(adConfig.link.external ? "_blank" : "_self", "target")}${addAttribute(adConfig.link.external ? "noopener noreferrer" : "", "rel")} class="btn-regular inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105" data-astro-cid-vw5l5woe><span data-astro-cid-vw5l5woe>${adConfig.link.text}</span>${adConfig.link.external && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-up-right-from-square",
		"class": "w-3.5 h-3.5",
		"aria-hidden": "true",
		"data-astro-cid-vw5l5woe": true
	})}`}</a></div>`}</div>` })}<script>(function(){${defineScriptVars({
		widgetId,
		displayCount: adConfig.displayCount ?? -1,
		isClosable: !!adConfig.closable
	})}
  function initAd() {
    var widget = document.getElementById(widgetId);
    if (!widget) return;

    var wrapper = widget.closest(".advertisement-widget");
    if (!wrapper) return;

    // 检查显示次数限制（每个广告独立计数）
    if (displayCount > 0) {
      var storageKey = "ad-display-" + widgetId;
      var currentCount = parseInt(localStorage.getItem(storageKey) || "0", 10);

      if (currentCount >= displayCount) {
        wrapper.style.display = "none";
        return;
      }

      localStorage.setItem(storageKey, (currentCount + 1).toString());
    }

    // 绑定关闭按钮事件
    if (isClosable) {
      var closeBtn = wrapper.querySelector(".close-ad-btn");
      if (closeBtn && !closeBtn.dataset.bound) {
        closeBtn.dataset.bound = "true";
        closeBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          wrapper.style.transition = "all 0.3s ease-out";
          wrapper.style.transform = "translateX(100%)";
          wrapper.style.opacity = "0";

          setTimeout(function () {
            wrapper.style.display = "none";
          }, 300);
        });
      }
    }
  }

  initAd();
  document.addEventListener("swup:contentReplaced", function () {
    setTimeout(initAd, 100);
  });
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Advertisement.astro", void 0);
//#endregion
//#region src/components/widget/Announcement.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Announcement = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Announcement;
	const config = announcementConfig;
	const { class: className, style, widgetConfig } = Astro.props;
	const showTitle = widgetConfig?.showTitle !== false;
	return renderTemplate`<!-- 组件显示现在由sidebarLayoutConfig统一控制，无需检查config.enable -->${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": config.title || i18n(I18nKey.announcement),
		"showTitle": showTitle,
		"id": "announcement",
		"class": className,
		"style": style
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div><!-- 公告栏内容 --><div class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">${config.content}</div><!-- 可选链接和关闭按钮 --><div class="flex items-center justify-between gap-3"><div>${config.link && config.link.enable !== false && renderTemplate`<a${addAttribute(config.link.url, "href")}${addAttribute(config.link.external ? "_blank" : "_self", "target")}${addAttribute(config.link.external ? "noopener noreferrer" : void 0, "rel")} class="btn-regular rounded-lg px-3 py-1.5 text-sm font-medium active:scale-95 transition-transform">${config.link.text}</a>`}</div>${config.closable && renderTemplate`<button class="btn-regular rounded-lg h-8 w-8 text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" onclick="this.closest('widget-layout').style.display='none'"${addAttribute(i18n(I18nKey.announcementClose), "aria-label")}>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:xmark",
		"class": "text-sm"
	})}</button>`}</div></div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Announcement.astro", void 0);
//#endregion
//#region src/components/widget/Calendar.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Calendar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Calendar;
	const { class: className, style, widgetConfig } = Astro.props;
	const showHeatmap = widgetConfig?.specificConfig?.calendar?.showHeatmap ?? true;
	const showTitle = widgetConfig?.showTitle !== false;
	const monthNames = [
		i18n(I18nKey.calendarJanuary),
		i18n(I18nKey.calendarFebruary),
		i18n(I18nKey.calendarMarch),
		i18n(I18nKey.calendarApril),
		i18n(I18nKey.calendarMay),
		i18n(I18nKey.calendarJune),
		i18n(I18nKey.calendarJuly),
		i18n(I18nKey.calendarAugust),
		i18n(I18nKey.calendarSeptember),
		i18n(I18nKey.calendarOctober),
		i18n(I18nKey.calendarNovember),
		i18n(I18nKey.calendarDecember)
	];
	const weekDays = [
		i18n(I18nKey.calendarSunday),
		i18n(I18nKey.calendarMonday),
		i18n(I18nKey.calendarTuesday),
		i18n(I18nKey.calendarWednesday),
		i18n(I18nKey.calendarThursday),
		i18n(I18nKey.calendarFriday),
		i18n(I18nKey.calendarSaturday)
	];
	const yearText = i18n(I18nKey.year);
	const heatmapWeekTemplate = i18n(I18nKey.calendarHeatmapWeek);
	const currentLang = siteConfig.lang || "en";
	const calendarDataUrl = url("/api/allPostMeta.json");
	const postUrlPrefix = url("/posts/");
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.calendar),
		"showTitle": showTitle,
		"id": "calendar-widget",
		"class": className,
		"style": style,
		"data-astro-cid-zpq4ngnj": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="calendar-container" data-astro-cid-zpq4ngnj><div class="flex justify-between items-center mb-2" data-astro-cid-zpq4ngnj><button id="prev-month-btn" class="btn-plain rounded-lg w-8 h-8 flex items-center justify-center hover:bg-(--btn-plain-bg-hover) transition-colors" aria-label="Previous Month" data-astro-cid-zpq4ngnj>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:chevron-left",
		"class": "text-sm",
		"data-astro-cid-zpq4ngnj": true
	})}</button><div id="current-month-display" class="text-lg font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer hover:text-(--primary) transition-colors select-none" data-astro-cid-zpq4ngnj></div><div class="flex gap-2" data-astro-cid-zpq4ngnj><button id="reset-month-btn" class="btn-plain rounded-lg w-8 h-8 flex items-center justify-center hover:bg-(--btn-plain-bg-hover) transition-colors" aria-label="Back to Today" data-astro-cid-zpq4ngnj>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:arrow-rotate-left",
		"class": "text-sm",
		"data-astro-cid-zpq4ngnj": true
	})}</button><button id="next-month-btn" class="btn-plain rounded-lg w-8 h-8 flex items-center justify-center hover:bg-(--btn-plain-bg-hover) transition-colors" aria-label="Next Month" data-astro-cid-zpq4ngnj>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:chevron-right",
		"class": "text-sm",
		"data-astro-cid-zpq4ngnj": true
	})}</button></div></div><!-- 日历视图容器 --><div id="calendar-view-container" data-astro-cid-zpq4ngnj><!-- 星期标题 --><div class="weekdays grid grid-cols-7 gap-1 mb-2" data-astro-cid-zpq4ngnj>${weekDays.map((day) => renderTemplate`<div class="text-center text-xs text-neutral-500 dark:text-neutral-400 font-medium" data-astro-cid-zpq4ngnj>${day}</div>`)}</div><!-- 日历格子（由客户端动态生成） --><div class="calendar-grid grid grid-cols-7 gap-1 pb-1" id="calendar-grid" data-astro-cid-zpq4ngnj><!-- 将由 JavaScript 填充 --></div></div><!-- 年度文章热力图 -->${showHeatmap && renderTemplate`<div id="heatmap-container" class="mb-2" style="display: none;" data-astro-cid-zpq4ngnj><div class="heatmap-months grid gap-0.5 mb-1" id="heatmap-months" style="grid-template-columns: repeat(12, 1fr);" data-astro-cid-zpq4ngnj></div><div class="heatmap-grid grid" id="heatmap-grid" style="grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(4, 1fr); row-gap: 0.125rem;" data-astro-cid-zpq4ngnj></div></div>`}<!-- 月份选择视图 --><div id="month-view-container" class="grid grid-cols-3 gap-2" style="display: none;" data-astro-cid-zpq4ngnj><!-- 将由 JavaScript 填充 --></div><!-- 年份选择视图 --><div id="year-view-container" class="grid grid-cols-3 gap-2" style="display: none;" data-astro-cid-zpq4ngnj><!-- 将由 JavaScript 填充 --></div><!-- 文章列表 --><div id="calendar-posts" class="mt-3" data-astro-cid-zpq4ngnj><div class="border-t border-neutral-200 dark:border-neutral-700 mb-2" id="calendar-posts-divider" style="display: none;" data-astro-cid-zpq4ngnj></div><div class="flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar" id="calendar-posts-list" data-astro-cid-zpq4ngnj><!-- 将由 JavaScript 填充 --></div></div></div>` })}<script>(function(){${defineScriptVars({
		monthNames,
		weekDays,
		yearText,
		currentLang,
		calendarDataUrl,
		postUrlPrefix,
		heatmapWeekTemplate
	})}
  // State variables
  let displayYear = new Date().getFullYear();
  let displayMonth = new Date().getMonth();
  let currentView = 'day'; // 'day' | 'month' | 'year'
  let postDateMap = {};
  let allPostsData = [];
  let availableYears = [];

  async function fetchData() {
    try {
      // 使用缓存避免 swup 导航时重复请求
      if (window.__allPostMetaCache) {
        allPostsData = window.__allPostMetaCache;
      } else {
        const response = await fetch(calendarDataUrl);
        allPostsData = await response.json();
        window.__allPostMetaCache = allPostsData;
      }
      
      // Reconstruct postDateMap and availableYears
      postDateMap = {};
      const yearsSet = new Set();
      allPostsData.forEach(post => {
        const date = new Date(post.published);
        const dateKey = \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, "0")}-\${String(date.getDate()).padStart(2, "0")}\`;
        if (!postDateMap[dateKey]) {
          postDateMap[dateKey] = [];
        }
        postDateMap[dateKey].push({ id: post.id, title: post.title, published: post.published });
        yearsSet.add(date.getFullYear());
      });
      
      availableYears = Array.from(yearsSet).sort((a, b) => b - a);
      
      renderCalendar();
    } catch (error) {
      console.error("Failed to fetch calendar data", error);
    }
  }

  function renderHeatmap() {
    const container = document.getElementById('heatmap-container');
    const monthsEl = document.getElementById('heatmap-months');
    const gridEl = document.getElementById('heatmap-grid');
    if (!container || !monthsEl || !gridEl) return;

    // Show heatmap only in day view
    container.style.display = currentView === 'day' ? 'block' : 'none';
    if (currentView !== 'day') return;

    // Render month labels (numbers 1-12)
    monthsEl.innerHTML = Array.from({length: 12}, (_, i) =>
      \`<span class="text-[10px] text-neutral-400 dark:text-neutral-500 text-center">\${i + 1}</span>\`
    ).join('');

    // Build weekly post counts: heatmapData[month][week] = count
    const heatmapData = Array.from({ length: 12 }, () => [0, 0, 0, 0]);
    allPostsData.forEach(post => {
      const date = new Date(post.published);
      if (date.getFullYear() !== displayYear) return;
      const month = date.getMonth();
      const day = date.getDate();
      const week = Math.min(Math.floor((day - 1) / 7), 3); // 0-3
      heatmapData[month][week]++;
    });

    // Find max for scaling
    // Render grid cells: 12 columns × 4 rows, row-major order
    // Use discrete opacity levels so low counts are still clearly visible
    const opacityLevels = [0, 0.45, 0.65, 0.85, 1];
    let cellsHtml = '';
    for (let week = 0; week < 4; week++) {
      for (let month = 0; month < 12; month++) {
        const count = heatmapData[month][week];
        const level = Math.min(count, 4);
        const bgStyle = count === 0
          ? 'background-color: var(--btn-plain-bg-hover)'
          : \`background-color: var(--primary); opacity: \${opacityLevels[level]}\`;
        // Generate tooltip text using i18n template
        const tooltip = heatmapWeekTemplate
          .replace('{month}', month + 1)
          .replace('{week}', week + 1)
          .replace('{count}', count);
        cellsHtml += \`<div class="heatmap-cell rounded-sm" style="\${bgStyle}" data-tooltip="\${tooltip}" data-month="\${month}"></div>\`;
      }
    }
    gridEl.innerHTML = cellsHtml;

    // Click on cell to navigate to that month
    gridEl.querySelectorAll('.heatmap-cell[data-month]').forEach(cell => {
      cell.addEventListener('click', () => {
        const m = parseInt(cell.getAttribute('data-month'));
        displayMonth = m;
        currentView = 'day';
        renderCalendar();
      });
    });

    // 热力图提示框 (fixed 定位，不被父容器裁剪)
    let tooltipEl = document.getElementById('heatmap-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'heatmap-tooltip';
      Object.assign(tooltipEl.style, {
        position: 'fixed',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        lineHeight: '1.2',
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.15s ease',
        zIndex: '9999',
        whiteSpace: 'nowrap',
      });
      document.body.appendChild(tooltipEl);
    }
    gridEl.querySelectorAll('.heatmap-cell[data-tooltip]').forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        tooltipEl.textContent = cell.getAttribute('data-tooltip');
        tooltipEl.style.opacity = '1';
        const rect = cell.getBoundingClientRect();
        tooltipEl.style.left = rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2 + 'px';
        tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 6 + 'px';
      });
      cell.addEventListener('mouseleave', () => {
        tooltipEl.style.opacity = '0';
      });
    });
  }

  // 客户端动态渲染日历
  function renderCalendar() {
    const container = document.getElementById('calendar-view-container');
    const monthContainer = document.getElementById('month-view-container');
    const yearContainer = document.getElementById('year-view-container');
    const postsContainer = document.getElementById('calendar-posts');
    
    // Update visibility
    if (container) container.style.display = currentView === 'day' ? 'block' : 'none';
    if (monthContainer) monthContainer.style.display = currentView === 'month' ? 'grid' : 'none';
    if (yearContainer) yearContainer.style.display = currentView === 'year' ? 'grid' : 'none';
    if (postsContainer) postsContainer.style.display = currentView === 'day' ? 'block' : 'none';

    updateHeader();

    if (currentView === 'day') {
      renderDayView();
    } else if (currentView === 'month') {
      renderMonthView();
    } else if (currentView === 'year') {
      renderYearView();
    }

    renderHeatmap();
  }

  function updateHeader() {
    const navDisplay = document.getElementById('current-month-display');
    const resetBtn = document.getElementById('reset-month-btn');
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    
    if (navDisplay) {
      if (currentView === 'day') {
        if (currentLang.startsWith('zh') || currentLang.startsWith('ja')) {
            navDisplay.textContent = \`\${displayYear}\${yearText}\${monthNames[displayMonth]}\`;
        } else {
            navDisplay.textContent = \`\${monthNames[displayMonth]} \${displayYear}\`;
        }
      } else if (currentView === 'month') {
        navDisplay.textContent = \`\${displayYear}\${yearText}\`;
      } else if (currentView === 'year') {
        navDisplay.textContent = yearText;
      }
    }

    if (resetBtn) {
      const now = new Date();
      const isCurrent = displayYear === now.getFullYear() && displayMonth === now.getMonth();
      resetBtn.style.display = (currentView === 'day' && isCurrent) ? 'none' : 'flex';
    }
    
    // Hide prev/next buttons in year view as we show all years
    if (prevBtn) prevBtn.style.visibility = currentView === 'year' ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = currentView === 'year' ? 'hidden' : 'visible';
  }

  function renderDayView() {
    const now = new Date();
    const currentYear = displayYear;
    const currentMonth = displayMonth;
    const currentDate = now.getDate();
    const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === now.getMonth();
    
    // 获取月份的第一天是星期几
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // 获取当月天数
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // 生成日历格子
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const calendarDays = [];
    
    // 添加空白格子（月初空白）
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: null, hasPost: false, count: 0, dateKey: "" });
    }
    
    // 添加每一天
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = \`\${currentYear}-\${String(currentMonth + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
      const posts = postDateMap[dateKey] || [];
      const count = posts.length;
      calendarDays.push({
        day,
        hasPost: count > 0,
        count,
        dateKey
      });
    }
    
    // 渲染日历格子
    calendarGrid.innerHTML = calendarDays.map(({day, hasPost, count, dateKey}) => {
      const isToday = day === currentDate && isCurrentMonth;
      const classes = [
        "calendar-day aspect-square flex items-center justify-center rounded-sm text-sm relative cursor-pointer"
      ];
      
      if (!day) {
        classes.push("text-neutral-400 dark:text-neutral-600");
      } else if (!hasPost) {
        classes.push("text-neutral-700 dark:text-neutral-300");
      } else {
        classes.push("text-neutral-900 dark:text-neutral-100 font-bold");
      }
      
      if (isToday) {
        classes.push("ring-2 ring-(--primary)");
      }
      
      return \`
        <div
          class="\${classes.join(' ')}"
          data-date="\${dateKey}"
          data-has-post="\${hasPost}"
        >
          \${day || ''}
          \${hasPost ? '<span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--primary)"></span>' : ''}
          \${hasPost && count > 1 ? \`<span class="absolute top-0 right-0 text-[10px] text-(--primary) font-bold">\${count}</span>\` : ''}
        </div>
      \`;
    }).join('');
    
    // 获取当月所有文章
    const currentMonthPosts = allPostsData.filter(post => {
      const date = new Date(post.published);
      return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    });
    
    // 显示当月文章列表
    showMonthlyPosts(currentMonthPosts);
    
    // 添加点击事件监听
    setupClickHandlers(currentMonthPosts);
  }

  function renderMonthView() {
    const container = document.getElementById('month-view-container');
    if (!container) return;

    // Calculate which months have posts for the currently displayed year
    const monthsWithPosts = new Set();
    allPostsData.forEach(post => {
        const date = new Date(post.published);
        if (date.getFullYear() === displayYear) {
            monthsWithPosts.add(date.getMonth());
        }
    });

    container.innerHTML = monthNames.map((name, index) => {
      const isCurrent = index === displayMonth;
      const hasPost = monthsWithPosts.has(index);
      const classes = [
        "p-2 text-center text-sm rounded-sm cursor-pointer hover:bg-(--btn-plain-bg-hover) transition-colors relative"
      ];
      if (isCurrent) {
        classes.push("text-(--primary) font-bold bg-(--btn-plain-bg-hover)");
      } else {
        classes.push("text-neutral-700 dark:text-neutral-300");
      }
      
      const dotHtml = hasPost ? '<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--primary)"></span>' : '';
      
      return \`<div class="\${classes.join(' ')}" data-month="\${index}">\${name}\${dotHtml}</div>\`;
    }).join('');

    container.querySelectorAll('[data-month]').forEach(el => {
      el.addEventListener('click', () => {
        displayMonth = parseInt(el.getAttribute('data-month'));
        currentView = 'day';
        renderCalendar();
      });
    });
  }

  function renderYearView() {
    const container = document.getElementById('year-view-container');
    if (!container) return;

    container.innerHTML = availableYears.map(year => {
      const isCurrent = year === displayYear;
      const classes = [
        "p-2 text-center text-sm rounded-sm cursor-pointer hover:bg-(--btn-plain-bg-hover) transition-colors relative"
      ];
      if (isCurrent) {
        classes.push("text-(--primary) font-bold bg-(--btn-plain-bg-hover)");
      } else {
        classes.push("text-neutral-700 dark:text-neutral-300");
      }
      return \`<div class="\${classes.join(' ')}" data-year="\${year}">\${year}<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--primary)"></span></div>\`;
    }).join('');

    container.querySelectorAll('[data-year]').forEach(el => {
      el.addEventListener('click', () => {
        displayYear = parseInt(el.getAttribute('data-year'));
        currentView = 'month';
        renderCalendar();
      });
    });
  }
  
  // 显示当月所有文章
  function showMonthlyPosts(currentMonthPosts) {
    const postsWrapper = document.getElementById('calendar-posts');
    const postsList = document.getElementById('calendar-posts-list');
    const divider = document.getElementById('calendar-posts-divider');

    if (postsWrapper) {
      postsWrapper.style.display = currentMonthPosts.length > 0 ? 'block' : 'none';
    }
    
    if (postsList) {
      postsList.innerHTML = currentMonthPosts.map(post => {
        const date = new Date(post.published);
        const dateStr = \`\${date.getMonth() + 1}-\${date.getDate()}\`;
        return \`
        <a href="\${postUrlPrefix}\${post.id}/" class="flex justify-between items-center text-sm text-neutral-700 dark:text-neutral-300 hover:text-(--primary) dark:hover:text-(--primary) transition-colors px-2 py-1 rounded-sm hover:bg-(--btn-plain-bg-hover)">
          <span class="truncate">\${post.title}</span>
          <span class="text-xs text-neutral-500 dark:text-neutral-400 ml-2 whitespace-nowrap">\${dateStr}</span>
        </a>
      \`}).join('');
      
      // 显示/隐藏分割线
      if (divider) {
        divider.style.display = currentMonthPosts.length > 0 ? 'block' : 'none';
      }
    }
  }
  
  // 设置日历格子点击事件
  function setupClickHandlers(currentMonthPosts) {
    const postsWrapper = document.getElementById('calendar-posts');
    const calendarDays = document.querySelectorAll('.calendar-day[data-date]');
    const postsList = document.getElementById('calendar-posts-list');
    const divider = document.getElementById('calendar-posts-divider');
    
    let currentSelectedDay = null;
    
    calendarDays.forEach(dayElement => {
      dayElement.addEventListener('click', () => {
        const dateKey = dayElement.getAttribute('data-date');
        const hasPost = dayElement.getAttribute('data-has-post') === 'true';
        
        if (!hasPost || !dateKey) return;
        
        // 切换选中状态
        if (currentSelectedDay === dayElement) {
          // 取消选中，恢复显示当月所有文章
          dayElement.classList.remove('calendar-day-selected');
          currentSelectedDay = null;
          showMonthlyPosts(currentMonthPosts);
          return;
        }
        
        // 移除之前选中的样式
        if (currentSelectedDay) {
          currentSelectedDay.classList.remove('calendar-day-selected');
        }
        
        // 添加选中样式
        dayElement.classList.add('calendar-day-selected');
        currentSelectedDay = dayElement;
        
        // 获取该日期的文章
        const posts = postDateMap[dateKey] || [];
        
        if (posts.length > 0 && postsList) {
          if (postsWrapper) {
            postsWrapper.style.display = 'block';
          }

          // 渲染文章列表
          postsList.innerHTML = posts.map(post => {
            const date = new Date(post.published);
            const dateStr = \`\${date.getMonth() + 1}-\${date.getDate()}\`;
            return \`
            <a href="\${postUrlPrefix}\${post.id}/" class="flex justify-between items-center text-sm text-neutral-700 dark:text-neutral-300 hover:text-(--primary) dark:hover:text-(--primary) transition-colors px-2 py-1 rounded-sm hover:bg-(--btn-plain-bg-hover)">
              <span class="truncate">\${post.title}</span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400 ml-2 whitespace-nowrap">\${dateStr}</span>
            </a>
          \`}).join('');
          
          // 显示分割线
          if (divider) {
            divider.style.display = 'block';
          }
        }
      });
    });
  }

  function changeMonth(delta) {
    if (currentView === 'day') {
      displayMonth += delta;
      if (displayMonth > 11) {
          displayMonth = 0;
          displayYear++;
      } else if (displayMonth < 0) {
          displayMonth = 11;
          displayYear--;
      }
    } else if (currentView === 'month') {
      displayYear += delta;
    }
    renderCalendar();
  }

  function resetToToday() {
      const now = new Date();
      displayYear = now.getFullYear();
      displayMonth = now.getMonth();
      currentView = 'day';
      renderCalendar();
  }

  function initCalendar() {
      // Reset to current date on init
      const now = new Date();
      displayYear = now.getFullYear();
      displayMonth = now.getMonth();
      
      fetchData();
      
      // Bind events
      const prevBtn = document.getElementById('prev-month-btn');
      const nextBtn = document.getElementById('next-month-btn');
      const resetBtn = document.getElementById('reset-month-btn');
      const navDisplay = document.getElementById('current-month-display');
      
      if (prevBtn) prevBtn.onclick = () => changeMonth(-1);
      if (nextBtn) nextBtn.onclick = () => changeMonth(1);
      if (resetBtn) resetBtn.onclick = () => resetToToday();
      
      if (navDisplay) {
        navDisplay.onclick = () => {
          if (currentView === 'day') {
            currentView = 'month';
          } else if (currentView === 'month') {
            currentView = 'year';
          }
          renderCalendar();
        };
      }
  }
  
  // 页面加载时渲染日历
  initCalendar();

  // 页面切换时重新渲染
  document.addEventListener("swup:contentReplaced", () => {
    setTimeout(initCalendar, 100);
  });
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Calendar.astro", void 0);
//#endregion
//#region src/components/common/ButtonLink.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$ButtonLink = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ButtonLink;
	const { badge, url, label } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")}${addAttribute(label, "aria-label")}${addAttribute(`
            flex
            items-center
            focus-ring-inset
            w-full
            h-10
            rounded-lg
            bg-none
            hover:bg-(--btn-plain-bg-hover)
            active:bg-(--btn-plain-bg-active)
            transition-all
            pl-2
            hover:pl-3
            
            text-neutral-700
            hover:text-(--primary)
            dark:text-neutral-300
            dark:hover:text-(--primary)
        `, "class:list")}><div class="flex w-full min-w-0 items-center justify-between relative mr-2"><div class="overflow-hidden text-left whitespace-nowrap text-ellipsis">${renderSlot($$result, $$slots["default"])}</div>${badge !== void 0 && badge !== null && badge !== "" && renderTemplate`<div class="transition px-2 h-7 ml-4 min-w-8 rounded-lg text-sm font-bold
                text-(--btn-content) dark:text-(--deep-text)
                bg-[oklch(0.95_0.025_var(--hue))] dark:bg-(--primary)
                flex items-center justify-center">${badge}</div>`}</div></a>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/ButtonLink.astro", void 0);
//#endregion
//#region src/components/widget/Categories.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Categories = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Categories;
	const categories = await getCategoryList();
	const COLLAPSED_HEIGHT = "7.5rem";
	const { class: className, style, widgetConfig } = Astro.props;
	const collapseThreshold = widgetConfig?.specificConfig?.collapseThreshold;
	const showTitle = widgetConfig?.showTitle !== false;
	const isCollapsed = collapseThreshold ? categories.length > collapseThreshold : false;
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.categories),
		"showTitle": showTitle,
		"id": "categories",
		"isCollapsed": isCollapsed,
		"collapsedHeight": COLLAPSED_HEIGHT,
		"class": className,
		"style": style
	}, { "default": ($$result) => renderTemplate`${categories.map((c) => renderTemplate`${renderComponent($$result, "ButtonLink", $$ButtonLink, {
		"url": c.url,
		"badge": String(c.count),
		"label": `View all posts in the ${c.name.trim()} category`
	}, { "default": ($$result) => renderTemplate`${c.name.trim()}` })}`)}` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Categories.astro", void 0);
//#endregion
//#region src/utils/fetch-dedup.ts
/**
* 请求去重工具
* 避免同页面多个组件重复请求同一接口
*/
var pendingFetches = /* @__PURE__ */ new Map();
function fetchWithDedup(url) {
	const pending = pendingFetches.get(url);
	if (pending) return pending;
	const promise = fetch(url).then((r) => {
		if (!r.ok) throw new Error("Failed to fetch");
		return r.json();
	});
	pendingFetches.set(url, promise);
	promise.finally(() => pendingFetches.delete(url));
	return promise;
}
//#endregion
//#region src/utils/memos-adapter.ts
/**
* 将 Markdown 内容转换为简单的 HTML
*/
function markdownToHtml(markdown) {
	let html = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>").replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>").replace(/^---$/gm, "<hr>").replace(/^- \[x\] (.+)$/gm, "<li><input type=\"checkbox\" checked disabled> $1</li>").replace(/^- \[ \] (.+)$/gm, "<li><input type=\"checkbox\" disabled> $1</li>");
	html = html.split(/\n\n+/).map((p) => {
		const trimmed = p.trim();
		if (!trimmed) return "";
		if (/^<[a-z]/.test(trimmed)) return trimmed;
		return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
	}).filter(Boolean).join("\n");
	return html;
}
/**
* 从内容中提取纯文本用于搜索
*/
function extractPlainText(content) {
	return content.replace(/!\[[^\]]*\]\([^)]+\)/g, " ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/<[^>]+>/g, " ").replace(/[#>*_`~[\]()-]/g, " ").replace(/\s+/g, " ").trim();
}
/**
* 从 Memos 内容中提取图片
*/
function extractImages(memo, memosApiUrl) {
	const images = [];
	const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
	let match;
	match = imagePattern.exec(memo.content);
	while (match !== null) {
		let src = match[2];
		if (!src.startsWith("http") && !src.startsWith("//")) src = `${memosApiUrl}${src.startsWith("/") ? "" : "/"}${src}`;
		images.push({
			alt: match[1] || "",
			src
		});
		match = imagePattern.exec(memo.content);
	}
	if (memo.attachments) {
		for (const attachment of memo.attachments) if (attachment.type.startsWith("image/")) {
			const attachmentId = attachment.name.split("/").pop() || "";
			const src = attachment.externalLink || `${memosApiUrl}/file/attachments/${attachmentId}/${attachment.filename}`;
			images.push({
				alt: attachment.filename,
				src,
				title: attachment.filename
			});
		}
	}
	return images;
}
var pendingRequests = /* @__PURE__ */ new Map();
/**
* 从 Memos API 获取数据并转换为动态格式
*/
async function fetchMemos(memosApiUrl, options) {
	const cacheKey = `${memosApiUrl}:${options?.parent || ""}`;
	const pending = pendingRequests.get(cacheKey);
	if (pending) return pending;
	const promise = fetchMemosInternal(memosApiUrl, options);
	pendingRequests.set(cacheKey, promise);
	promise.finally(() => pendingRequests.delete(cacheKey));
	return promise;
}
async function fetchMemosInternal(memosApiUrl, options) {
	const pageSize = options?.pageSize || 1e4;
	const maxPages = options?.maxPages || 10;
	const parent = options?.parent || "";
	const allMemos = [];
	let pageToken = "";
	for (let page = 0; page < maxPages; page++) {
		const url = new URL(`${memosApiUrl}/api/v1/memos`);
		url.searchParams.set("pageSize", String(pageSize));
		if (parent) url.searchParams.set("parent", parent);
		if (pageToken) url.searchParams.set("pageToken", pageToken);
		const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });
		if (!response.ok) {
			const errorText = await response.text().catch(() => "");
			console.error(`[Memos API] ${response.status}: ${errorText}`);
			throw new Error(`Memos API error: ${response.status}`);
		}
		const data = await response.json();
		allMemos.push(...data.memos || []);
		if (!data.nextPageToken) break;
		pageToken = data.nextPageToken;
	}
	return allMemos.filter((memo) => memo.state === "NORMAL").map((memo) => {
		const id = memo.name.split("/").pop() || "";
		const published = new Date(memo.createTime).getTime();
		const html = markdownToHtml(memo.content);
		const images = extractImages(memo, memosApiUrl);
		const location = memo.location?.placeholder?.trim() || "";
		return {
			id,
			published,
			html,
			images,
			searchText: [extractPlainText(memo.content), location].filter(Boolean).join(" ").toLocaleLowerCase(),
			pinned: memo.pinned || false,
			location
		};
	}).sort((a, b) => {
		if (a.pinned && !b.pinned) return -1;
		if (!a.pinned && b.pinned) return 1;
		return b.published - a.published;
	});
}
//#endregion
//#region src/components/widget/DynamicSidebar.svelte
function DynamicSidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* 侧边栏动态组件 - 从 API 获取数据
		* 支持自定义 API 地址，方便接入第三方后端
		*/
		let { apiUrl, limit, memos } = $$props;
		let entries = [];
		let totalCount = 0;
		let loading = true;
		let error = false;
		onMount(async () => {
			try {
				let data;
				if (memos?.enable) data = await fetchMemos(memos.apiUrl, { parent: memos.parent });
				else data = await fetchWithDedup(apiUrl);
				totalCount = data.length;
				entries = data.slice(0, limit);
				updateCountBadge();
			} catch {
				error = true;
			} finally {
				loading = false;
			}
		});
		function updateCountBadge() {
			const badge = document.querySelector("[data-dynamic-count]");
			if (badge && totalCount > 0) badge.textContent = `(${totalCount})`;
		}
		function getPlainText(html) {
			const div = document.createElement("div");
			div.innerHTML = html;
			return div.textContent?.trim() || "";
		}
		function formatDate(timestamp) {
			if (apiUrl.startsWith("http") || memos?.enable) return new Date(timestamp).toLocaleDateString("zh-CN", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			});
			return formatDynamicDate(new Date(timestamp));
		}
		$$renderer.push(`<div class="flex flex-col gap-1.5">`);
		if (loading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex justify-center p-3"><svg class="size-5 animate-spin text-(--primary)" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg></div>`);
		} else if (error || entries.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<p class="m-0 p-3 text-center text-sm text-neutral-500">${$.escape(i18n(I18nKey.dynamicEmpty))}</p>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--[-->`);
			const each_array = $.ensure_array_like(entries);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let entry = each_array[$$index];
				const text = getPlainText(entry.html);
				const image = entry.images?.[0];
				$$renderer.push(`<a${$.attr("href", url(`/dynamic/#dynamic-${entry.id}`))} class="group flex min-w-0 min-h-16 items-center gap-3 rounded-lg p-2 text-neutral-700/75 dark:text-neutral-300/75 hover:bg-(--btn-plain-bg-hover) hover:text-(--primary) active:bg-(--btn-plain-bg-active) transition-colors duration-150"${$.attr("aria-label", `${i18n(I18nKey.dynamic)}: ${text}`)}><div class="min-w-0 flex-1"><div class="mb-1 flex items-center gap-1 text-xs leading-4 text-(--primary)"><svg class="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg> <time${$.attr("datetime", new Date(entry.published).toISOString())}>${$.escape(formatDate(entry.published))}</time> `);
				if (entry.pinned) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="ml-auto inline-flex items-center gap-0.5 text-[10px] px-1 py-0.5 rounded bg-(--primary)/10 text-(--primary) font-medium"><svg class="size-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z"></path></svg> ${$.escape(i18n(I18nKey.pinned))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <p class="m-0 line-clamp-3 text-sm leading-[1.35rem]">${$.escape(text)}</p></div> `);
				if (image) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${$.attr("src", image.src)}${$.attr("alt", image.alt)} class="size-14 shrink-0 rounded-lg bg-(--btn-plain-bg-hover) object-cover" loading="lazy" decoding="async"/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></a>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/components/widget/Dynamic.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Dynamic = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dynamic;
	const { class: className, style, widgetConfig } = Astro.props;
	const showTitle = widgetConfig?.showTitle !== false;
	const configuredLimit = widgetConfig?.specificConfig?.dynamic?.limit ?? 3;
	const limit = Math.max(1, Math.floor(configuredLimit));
	const apiUrl = dynamicConfig.apiUrl?.startsWith("http") ? dynamicConfig.apiUrl : url(dynamicConfig.apiUrl || "/api/dynamic.json");
	const memos = dynamicConfig.memos;
	return renderTemplate`${siteConfig.pages.dynamic && renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.latestDynamics),
		"showTitle": showTitle,
		"id": "latest-dynamics",
		"class": className,
		"style": style
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "DynamicSidebar", DynamicSidebar, {
		"client:load": true,
		"apiUrl": apiUrl,
		"limit": limit,
		"memos": memos,
		"client:component-hydration": "load",
		"client:component-path": "@/components/widget/DynamicSidebar.svelte",
		"client:component-export": "default"
	})}${maybeRenderHead($$result)}<a class="btn-plain mt-2 flex items-center justify-center gap-1 rounded-lg p-1.5
					text-sm text-(--primary)"${addAttribute(url("/dynamic/"), "href")}>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:dynamic-feed-rounded",
		"class": "size-4.5",
		"aria-hidden": "true"
	})}<span>${i18n(I18nKey.moreDynamics)}</span><span data-dynamic-count class="opacity-60"></span></a>` })}`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Dynamic.astro", void 0);
//#endregion
//#region src/components/widget/Music.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Music = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Music;
	const { class: className, style, widgetConfig } = Astro.props;
	const widgetId = `music-widget-${Math.random().toString(36).substring(2, 9)}`;
	const showTitle = widgetConfig?.showTitle !== false;
	return renderTemplate`${musicPlayerConfig.showInSidebar !== false && renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"id": `${widgetId}-layout`,
		"class": className,
		"style": style,
		"name": i18n(I18nKey.music),
		"showTitle": showTitle
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "MusicPlayer", $$MusicPlayer, { "id": widgetId })}` })}`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Music.astro", void 0);
//#endregion
//#region src/utils/lqip-utils.ts
var lqips = {
	"src:assets/images/avatar.avif": "dcd8d5d1cecabea9a9",
	"public:gallery/firefly-2026/cover.avif": "7588a28a8f989e8d88",
	"public:gallery/firefly-2026/1.avif": "c8bca9dde6d2babfb5",
	"src:assets/images/DesktopWallpaper/d6.avif": "d9e5ec9ca7aebda9b0",
	"src:assets/images/DesktopWallpaper/d5.avif": "e2dbe0e1dae1d9c9cd",
	"src:assets/images/DesktopWallpaper/d4.avif": "727991b7a7bbe2b8c2",
	"src:assets/images/DesktopWallpaper/d3.avif": "4268936f829e99adc7",
	"src:assets/images/DesktopWallpaper/d2.avif": "b49db67a7e91d0aabc",
	"src:assets/images/DesktopWallpaper/d1.avif": "8b9bb59ba6bae7d7dd",
	"src:assets/images/MobileWallpaper/m6.avif": "a08eaac3abbfc7bdc8",
	"src:assets/images/MobileWallpaper/m5.avif": "af99aecab1c1d2c2cb",
	"src:assets/images/MobileWallpaper/m4.avif": "f0e1e2d4bfc7c2abc1",
	"src:assets/images/MobileWallpaper/m3.avif": "c3a6b4dac2cad2c0c9",
	"src:assets/images/MobileWallpaper/m2.avif": "f1e0ded8c2c6bbb0bc",
	"src:assets/images/MobileWallpaper/m1.avif": "cccce0cbc0d59294c0",
	"public:assets/images/sponsor/wechat.png": "d5d5d5dad9d7dbd8cf",
	"public:assets/images/sponsor/alipay.png": "8ebbde91bedf93c0e0",
	"public:assets/images/ad/ad1.webp": "a1b8b68a8e918c8f93",
	"src:content/posts/images/vitepress.avif": "3d3d43e1e1e7ebe0da",
	"src:content/posts/images/right-grid2.avif": "cbcdcddddcd9d8d7db",
	"src:content/posts/images/obsidian.avif": "3a4145dce3e6e8ded8",
	"src:content/posts/images/masonry.avif": "e4e6e4ecefebd3d1d2",
	"src:content/posts/images/left-list.avif": "e9edeae3e6e3dddde1",
	"src:content/posts/images/left-grid3.avif": "d7d9d9d6daddd8e1e3",
	"src:content/posts/images/github.avif": "3a3a3be6e7e7eae9e9",
	"src:content/posts/images/firefly3.avif": "7c6f966a628a816e81",
	"src:content/posts/images/firefly2.avif": "7588a28a8f989e8d88",
	"src:content/posts/images/firefly1.avif": "d4d7e5cdc4d7baaec9",
	"src:content/posts/images/docusaurus.avif": "445347e2e8e3e8e4dc",
	"src:content/posts/images/both-list.avif": "e5e7e4e6e8e7e3e3e5",
	"src:content/posts/images/both-grid.avif": "d5d6d3e6e7e3d8d9e3",
	"src:content/posts/images/1.avif": "b5b0b3bcb6bbe0e0df",
	"src:content/posts/guide/cover.avif": "c8bca9dde6d2babfb5",
	"src:assets/images/logo/firefly-light.png": "000000000000000000",
	"src:assets/images/logo/firefly-dark.png": "ffffffffffffffffff"
};
var DEFAULT_GRADIENT = "linear-gradient(135deg, #d6d3d1 0%, #a8a29e 50%, #d6d3d1 100%)";
function normalizePath(p) {
	return p.replace(/\/\.\//g, "/").replace(/\/+/g, "/");
}
/**
* 将 LQIP 紧凑格式（18 字符 hex）解码为 CSS 线性渐变
* 格式：6e3b38ae7472af7574 → linear-gradient(135deg, #6e3b38 0%, #ae7472 50%, #af7574 100%)
*/
function getLqipGradient(src, basePath, isPublic) {
	if (isPublic) {
		const relativePath = src.replace(/^\//, "");
		const compact = lqips[`public:${relativePath}`] || lqips[relativePath];
		if (compact?.length !== 18) return void 0;
		return `linear-gradient(135deg, ${`#${compact.slice(0, 6)}`} 0%, ${`#${compact.slice(6, 12)}`} 50%, ${`#${compact.slice(12, 18)}`} 100%)`;
	}
	const fullPath = basePath ? normalizePath(`${basePath}/${src}`) : src;
	const compact = lqips[`src:${fullPath}`] || lqips[`src:${src}`] || lqips[fullPath] || lqips[src];
	if (compact?.length !== 18) return void 0;
	return `linear-gradient(135deg, ${`#${compact.slice(0, 6)}`} 0%, ${`#${compact.slice(6, 12)}`} 50%, ${`#${compact.slice(12, 18)}`} 100%)`;
}
/** 判断是否为外部图片 */
function isExternalImage(src) {
	return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:");
}
/** 获取 LQIP 内联样式 */
function getLqipStyle(src, basePath, isPublic) {
	if (isExternalImage(src)) return void 0;
	const gradient = getLqipGradient(src, basePath, isPublic);
	return gradient ? `background: ${gradient}` : void 0;
}
/** 获取 LQIP props（用于 Astro 组件），外部图片自动降级 */
function getLqipProps(src, basePath, isPublic) {
	if (isExternalImage(src)) return { style: "background: var(--muted)" };
	return { style: getLqipStyle(src, basePath, isPublic) || `background: ${DEFAULT_GRADIENT}` };
}
//#endregion
//#region src/components/common/ImageWrapper.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$ImageWrapper = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageWrapper;
	const { id, src, alt, position = "center", basePath = "/", loading = "lazy", fetchpriority = "auto", layout = "constrained", usePicture = true, formats = getImageFormats(), width, height, widths, sizes, quality = getImageQuality(), fadeIn = true, dataCoverImg = false, showLqip = true, showOverlay = true } = Astro.props;
	const fallbackFormat = getFallbackFormat();
	const className = Astro.props.class;
	const isLocal = !(src.startsWith("/") || src.startsWith("http") || src.startsWith("https") || src.startsWith("data:"));
	const isPublic = src.startsWith("/");
	let img = null;
	if (isLocal) {
		const files = /* #__PURE__ */ Object.assign({
			"../../assets/images/DesktopWallpaper/d1.avif": () => import("./d1_CLrVb1tC.mjs").then((m) => m["default"]),
			"../../assets/images/DesktopWallpaper/d2.avif": () => import("./d2_B9O6jQgx.mjs").then((m) => m["default"]),
			"../../assets/images/DesktopWallpaper/d3.avif": () => import("./d3_BWz8qNsx.mjs").then((m) => m["default"]),
			"../../assets/images/DesktopWallpaper/d4.avif": () => import("./d4_BZ8ZHCPh.mjs").then((m) => m["default"]),
			"../../assets/images/DesktopWallpaper/d5.avif": () => import("./d5_CCvSr59G.mjs").then((m) => m["default"]),
			"../../assets/images/DesktopWallpaper/d6.avif": () => import("./d6_2ohiVsAo.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m1.avif": () => import("./m1_BVpiuvq_.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m2.avif": () => import("./m2_DdxKJoKH.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m3.avif": () => import("./m3_DrOKzErV.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m4.avif": () => import("./m4_CLru-71Z.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m5.avif": () => import("./m5_q9NuhM0w.mjs").then((m) => m["default"]),
			"../../assets/images/MobileWallpaper/m6.avif": () => import("./m6_B3cmxAlq.mjs").then((m) => m["default"]),
			"../../assets/images/avatar.avif": () => import("./avatar_z67Z7owS.mjs").then((m) => m["default"]),
			"../../assets/images/logo/firefly-dark.png": () => import("./firefly-dark_CoeXM234.mjs").then((m) => m["default"]),
			"../../assets/images/logo/firefly-light.png": () => import("./firefly-light_BDHt0oJz.mjs").then((m) => m["default"]),
			"../../content/posts/guide/cover.avif": () => import("./cover_CYG2AtbN.mjs").then((m) => m["default"]),
			"../../content/posts/images/1.avif": () => import("./1_DKFGmNk8.mjs").then((m) => m["default"]),
			"../../content/posts/images/both-grid.avif": () => import("./both-grid_VUka10Zu.mjs").then((m) => m["default"]),
			"../../content/posts/images/both-list.avif": () => import("./both-list_DHgooVXJ.mjs").then((m) => m["default"]),
			"../../content/posts/images/docusaurus.avif": () => import("./docusaurus_oEWzCLy_.mjs").then((m) => m["default"]),
			"../../content/posts/images/firefly1.avif": () => import("./firefly1_P6xkLtPy.mjs").then((m) => m["default"]),
			"../../content/posts/images/firefly2.avif": () => import("./firefly2_xVqc9d_e.mjs").then((m) => m["default"]),
			"../../content/posts/images/firefly3.avif": () => import("./firefly3_BhkxXiwl.mjs").then((m) => m["default"]),
			"../../content/posts/images/github.avif": () => import("./github_D4Pszqb3.mjs").then((m) => m["default"]),
			"../../content/posts/images/left-grid3.avif": () => import("./left-grid3_DWMiuAXz.mjs").then((m) => m["default"]),
			"../../content/posts/images/left-list.avif": () => import("./left-list_CKiHI2Mx.mjs").then((m) => m["default"]),
			"../../content/posts/images/masonry.avif": () => import("./masonry_BkJ480Ih.mjs").then((m) => m["default"]),
			"../../content/posts/images/obsidian.avif": () => import("./obsidian_8BBZhG03.mjs").then((m) => m["default"]),
			"../../content/posts/images/right-grid2.avif": () => import("./right-grid2_XluaCAWo.mjs").then((m) => m["default"]),
			"../../content/posts/images/vitepress.avif": () => import("./vitepress_Bk5HFlG6.mjs").then((m) => m["default"])
		});
		let normalizedPath = path$1.normalize(path$1.join("../../", basePath, src)).replace(/\\/g, "/");
		const file = files[normalizedPath];
		if (!file) console.error(`\n[ERROR] Image file not found: ${normalizedPath.replace("../../", "src/")}`);
		else img = await file();
	}
	const imageClass = fadeIn ? "w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out" : "w-full h-full object-cover";
	const imageStyle = `object-position: ${position}`;
	const fullSrc = isPublic ? url(src) : src;
	const referrerPolicy = !isLocal && shouldAddNoReferrer(fullSrc) ? "no-referrer" : void 0;
	const responsiveProps = {
		...layout && { layout },
		...width && { width },
		...height && { height },
		...widths && { widths },
		...sizes && { sizes },
		...quality && { quality }
	};
	const lqipProps = isLocal ? getLqipProps(src, basePath) : isPublic ? getLqipProps(src, basePath, true) : getLqipProps(src);
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(id, "id")}${addAttribute([className, "overflow-hidden relative"], "class:list")}>${fadeIn && showLqip && renderTemplate`<div class="lqip-placeholder absolute inset-0 pointer-events-none"${addAttribute(lqipProps.style, "style")} aria-hidden="true"></div>`}${showOverlay && renderTemplate`<div class="transition absolute inset-0 dark:bg-black/10 pointer-events-none"></div>`}${isLocal && img && usePicture && renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": img,
		"alt": alt || "",
		"class": imageClass,
		"style": imageStyle,
		"loading": loading,
		"fetchpriority": fetchpriority,
		"data-cover-img": dataCoverImg ? true : void 0,
		"formats": formats,
		"fallbackFormat": fallbackFormat,
		...responsiveProps
	})}`}${isLocal && img && !usePicture && renderTemplate`${renderComponent($$result, "Image", $$Image, {
		"src": img,
		"alt": alt || "",
		"class": imageClass,
		"style": imageStyle,
		"loading": loading,
		"fetchpriority": fetchpriority,
		"data-cover-img": dataCoverImg ? true : void 0,
		...responsiveProps
	})}`}${!isLocal && renderTemplate`<img${addAttribute(isPublic ? url(src) : src, "src")}${addAttribute(alt || "", "alt")}${addAttribute(imageClass, "class")}${addAttribute(imageStyle, "style")}${addAttribute(loading, "loading")}${addAttribute(fetchpriority, "fetchpriority")}${addAttribute(dataCoverImg ? true : void 0, "data-cover-img")}${addAttribute(referrerPolicy, "referrerpolicy")}>`}</div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/ImageWrapper.astro", void 0);
//#endregion
//#region src/components/widget/Profile.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Profile = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Profile;
	const { style } = Astro.props;
	const className = Astro.props.class;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"card-base",
		"p-3",
		className
	], "class:list")}${addAttribute(style, "style")}><a aria-label="Go to About Page"${addAttribute(url("/about/"), "href")} class="group block relative mx-auto mt-1 lg:mx-0 lg:mt-0 mb-3
       max-w-48 lg:max-w-none overflow-hidden rounded-xl active:scale-95"><div class="absolute transition pointer-events-none group-hover:bg-black/30 group-active:bg-black/50
        w-full h-full z-50 flex items-center justify-center">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-regular:address-card",
		"class": "transition opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 text-white text-5xl"
	})}</div>${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
		"src": profileConfig.avatar || "",
		"alt": "Profile Image of the Author",
		"class": "profile-avatar-image mx-auto lg:w-full h-full lg:mt-0",
		"loading": "eager",
		"fetchpriority": "high",
		"widths": [350],
		"sizes": "350px"
	})}</a><div class="px-2"><div class="font-bold text-xl text-center mb-1 dark:text-neutral-50 transition">${profileConfig.name}</div><div class="h-1 w-5 bg-(--primary) mx-auto rounded-full mb-2 transition"></div><div class="text-center text-neutral-400 mb-2.5 transition">${profileConfig.bio}</div><div class="flex flex-wrap gap-2 justify-center mb-1">${profileConfig.links.length > 1 && profileConfig.links.map((item) => {
		const showName = item.showName;
		const className = showName ? "btn-regular rounded-lg h-10 gap-2 px-3 font-bold active:scale-95" : "btn-regular rounded-lg h-10 w-10 active:scale-90";
		if (item.url.startsWith("mailto:")) {
			const encodedEmail = Buffer.from(item.url.replace("mailto:", "")).toString("base64");
			return renderTemplate`<a rel="me"${addAttribute(item.name, "aria-label")} href="#"${addAttribute(encodedEmail, "data-encoded-email")}${addAttribute(`
                                            (function() {
                                                const encodedEmail = this.getAttribute('data-encoded-email');
                                                const decodedEmail = atob(encodedEmail);
                                                this.href = 'mailto:' + decodedEmail;
                                                this.removeAttribute('data-encoded-email');
                                                this.removeAttribute('onclick');
                                                this.click();
                                                return false;
                                            }).call(this);
                                        `.replace(/\s+/g, " ").trim(), "onclick")} ,${addAttribute(className, "class")}>${renderComponent($$result, "Icon", $$Icon, {
				"is:inline": true,
				"name": item.icon,
				"class": "text-[1.5rem]"
			})}${showName && item.name}</a>`;
		} else return renderTemplate`<a rel="me"${addAttribute(item.name, "aria-label")}${addAttribute(item.url, "href")} target="_blank"${addAttribute(className, "class")}>${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": item.icon,
			"class": "text-[1.5rem]"
		})}${showName && item.name}</a>`;
	})}${profileConfig.links.length == 1 && (function(item) {
		if (item.url.startsWith("mailto:")) {
			const encodedEmail = Buffer.from(item.url.replace("mailto:", "")).toString("base64");
			return renderTemplate`<a rel="me"${addAttribute(item.name, "aria-label")} href="#"${addAttribute(encodedEmail, "data-encoded-email")}${addAttribute(`
                                            (function() {
                                                const encodedEmail = this.getAttribute('data-encoded-email');
                                                const decodedEmail = atob(encodedEmail);
                                                this.href = 'mailto:' + decodedEmail;
                                                this.removeAttribute('data-encoded-email');
                                                this.removeAttribute('onclick');
                                                this.click();
                                                return false;
                                            }).call(this);
                                        `.replace(/\s+/g, " ").trim(), "onclick")} , class="btn-regular rounded-lg h-10 gap-2 px-3 font-bold active:scale-95">${renderComponent($$result, "Icon", $$Icon, {
				"is:inline": true,
				"name": item.icon,
				"class": "text-[1.5rem]"
			})}${item.name}</a>`;
		} else return renderTemplate`<a rel="me"${addAttribute(item.name, "aria-label")}${addAttribute(item.url, "href")} target="_blank" class="btn-regular rounded-lg h-10 gap-2 px-3 font-bold active:scale-95">${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": item.icon,
			"class": "text-[1.5rem]"
		})}${item.name}</a>`;
	})(profileConfig.links[0])}</div></div></div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Profile.astro", void 0);
//#endregion
//#region src/utils/toc-shared.ts
/**
* 根据标题列表计算目录项。
* 复刻 TOCManager 里的 calculateMinDepth + filterHeadings + 深度/徽章逻辑。
*/
function computeTocItems(headings, opts) {
	if (!headings || headings.length === 0) return [];
	let minDepth = 10;
	for (const h of headings) minDepth = Math.min(minDepth, h.depth);
	const filtered = headings.filter((h) => h.depth < minDepth + opts.maxLevel);
	const items = [];
	let indexCount = 1;
	for (const h of filtered) {
		if (!h.slug) continue;
		const depth = h.depth;
		const depthLevel = depth === minDepth ? 0 : depth === minDepth + 1 ? 1 : 2;
		let badgeKind;
		let badgeIndex;
		if (depth === minDepth) {
			badgeKind = "index";
			badgeIndex = indexCount;
			indexCount++;
		} else if (depth === minDepth + 1) badgeKind = "dot";
		else badgeKind = "dot-sm";
		const text = (h.text || "").replace(/#+\s*$/, "").trim() || h.slug;
		items.push({
			headingId: h.slug,
			href: `#${h.slug}`,
			depthLevel,
			badgeKind,
			badgeIndex,
			text,
			labelPrimary: depth <= minDepth + 1
		});
	}
	return items;
}
//#endregion
//#region src/components/widget/SidebarTOC.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$SidebarTOC = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SidebarTOC;
	const { headings = [], encrypted = false, class: className, style, widgetConfig } = Astro.props;
	const showTitle = widgetConfig?.showTitle !== false;
	const items = encrypted ? [] : computeTocItems(headings, { maxLevel: 3 });
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.tableOfContents),
		"showTitle": showTitle,
		"id": "sidebar-toc",
		"class": className,
		"style": style,
		"data-astro-cid-sse56vea": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="toc-scroll-container custom-scrollbar" data-astro-cid-sse56vea><div class="toc-content" id="sidebar-toc-content" data-astro-cid-sse56vea>${!encrypted && items.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`toc-item toc-level-${item.depthLevel}`, "class")}${addAttribute(item.headingId, "data-heading-id")}${addAttribute(item.text, "aria-label")}${addAttribute(item.text, "title")} data-astro-cid-sse56vea><div${addAttribute(`toc-badge ${item.badgeKind === "index" ? "toc-badge-index" : ""}`, "class")} data-astro-cid-sse56vea>${item.badgeKind === "index" ? item.badgeIndex : item.badgeKind === "dot" ? renderTemplate`<span class="toc-badge-dot" data-astro-cid-sse56vea></span>` : renderTemplate`<span class="toc-badge-dot toc-badge-dot-sm" data-astro-cid-sse56vea></span>`}</div><div${addAttribute(`toc-label ${item.labelPrimary ? "toc-label-primary" : "toc-label-secondary"}`, "class")} data-astro-cid-sse56vea>${item.text}</div></a>`)}<div id="sidebar-active-indicator" class="toc-active-indicator" style="opacity: 0;" data-astro-cid-sse56vea></div>` })}`}${!encrypted && items.length === 0 && renderTemplate`<div class="text-center py-8 text-gray-500 dark:text-gray-400" data-astro-cid-sse56vea><p data-astro-cid-sse56vea>${i18n(I18nKey.tocEmpty)}</p></div>`}</div></div>` })}${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SidebarTOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SidebarTOC.astro", void 0);
//#endregion
//#region src/utils/build-platform.ts
var BUILD_PLATFORM_OVERRIDE_KEY = "FIREFLY_BUILD_PLATFORM";
function hasNonEmptyEnv(env, key) {
	const value = env[key];
	return typeof value === "string" && value.trim() !== "";
}
function envUrlHostEquals(env, key, expectedHost) {
	const value = env[key];
	if (typeof value !== "string" || value.trim() === "") return false;
	try {
		return new URL(value).host.toLowerCase() === expectedHost.toLowerCase();
	} catch {
		return false;
	}
}
function detectBuildPlatform({ env, isCI, ciName, isDev = false, unknownBuildPlatform = "Unknown CI" }) {
	const overrideValue = env[BUILD_PLATFORM_OVERRIDE_KEY];
	if (typeof overrideValue === "string" && overrideValue.trim() !== "") return overrideValue.trim();
	if (ciName?.trim()) return ciName.trim();
	if (hasNonEmptyEnv(env, "EDGEONE_PROJECT_ID")) return "EdgeOne Pages";
	if (envUrlHostEquals(env, "er_address", "build-script.esa.ialicdn.com")) return "ESA Pages";
	if (isCI) return unknownBuildPlatform;
	return isDev ? "Local Dev" : "Local";
}
//#endregion
//#region src/components/widget/SiteInfo.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$SiteInfo = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$SiteInfo;
	const { class: className, style, widgetConfig } = Astro2.props;
	const showTitle = widgetConfig?.showTitle !== false;
	let blogVersion = "unknown";
	try {
		blogVersion = JSON.parse(readFileSync(new URL("../../../package.json", import.meta.url), "utf-8")).version || "Firefly unknown";
	} catch {}
	let astroVersion = "unknown";
	try {
		astroVersion = createRequire(import.meta.url)("astro/package.json").version || "unknown";
	} catch {}
	const nodeVersion = process.version;
	let pnpmVersion = "unknown";
	const pnpmMatch = (process.env.npm_config_user_agent || "").match(/pnpm\/([\d.]+)/);
	if (pnpmMatch) pnpmVersion = `v${pnpmMatch[1]}`;
	const buildTime = formatDateI18nWithTime(/* @__PURE__ */ new Date());
	const unknownBuildPlatform = widgetConfig?.specificConfig?.siteInfo?.unknownBuildPlatform || "Unknown CI";
	const buildPlatform = detectBuildPlatform({
		env: process.env,
		isCI: ci.isCI,
		ciName: ci.name,
		isDev: false,
		unknownBuildPlatform
	});
	const systemInfo = `${{
		win32: "Windows",
		darwin: "macOS",
		linux: "Linux",
		freebsd: "FreeBSD"
	}[process.platform] || process.platform} / ${{
		x64: "x86_64",
		arm64: "ARM64",
		arm: "ARM",
		ia32: "x86"
	}[process.arch] || process.arch}`;
	const siteDomain = siteConfig.site_url ? siteConfig.site_url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "unknown";
	const licenseName = licenseConfig.enable ? licenseConfig.name : "None";
	const mainItems = [
		{
			icon: "material-symbols:cloud-outline",
			label: i18n(I18nKey.siteInfoBuildPlatform),
			value: buildPlatform
		},
		{
			icon: "mdi:clover",
			label: i18n(I18nKey.siteInfoBlogVersion),
			value: `Firefly v${blogVersion}`,
			href: "https://github.com/CuteLeaf/Firefly"
		},
		{
			icon: "material-symbols:copyright-outline",
			label: i18n(I18nKey.siteInfoLicense),
			value: licenseName
		}
	];
	const detailItems = [
		{
			icon: "material-symbols:language",
			label: i18n(I18nKey.siteInfoDomain),
			value: siteDomain,
			fullWidth: true
		},
		{
			icon: "mdi:clover",
			label: "Firefly",
			value: `v${blogVersion}`
		},
		{
			icon: "material-symbols:rocket-launch-outline",
			label: i18n(I18nKey.siteInfoAstroVersion),
			value: `v${astroVersion}`
		},
		{
			icon: "fa7-brands:node-js",
			label: i18n(I18nKey.siteInfoNodeVersion),
			value: nodeVersion
		},
		{
			icon: "simple-icons:pnpm",
			label: i18n(I18nKey.siteInfoPnpmVersion),
			value: pnpmVersion
		},
		{
			icon: "material-symbols:build-outline",
			label: i18n(I18nKey.siteInfoBuildTime),
			value: buildTime,
			fullWidth: true
		},
		{
			icon: "material-symbols:computer-outline",
			label: i18n(I18nKey.siteInfoSystem),
			value: systemInfo,
			fullWidth: true
		}
	];
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.siteInfo),
		"showTitle": showTitle,
		"id": "site-info",
		"class": className,
		"style": style,
		"data-astro-cid-226yebg4": true
	}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="flex flex-col gap-2" data-astro-cid-226yebg4><div class="flex flex-col gap-2" data-astro-cid-226yebg4>${mainItems.map((item) => renderTemplate`<div class="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/50" data-astro-cid-226yebg4><div class="flex items-center gap-2.5" data-astro-cid-226yebg4><div class="text-(--primary) text-lg" data-astro-cid-226yebg4>${renderComponent($$result2, "Icon", $$Icon, {
		"is:inline": true,
		"name": item.icon,
		"data-astro-cid-226yebg4": true
	})}</div><span class="text-neutral-700 dark:text-neutral-300 font-medium text-sm" data-astro-cid-226yebg4>${item.label}</span></div>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-neutral-900 dark:text-neutral-100 text-right max-w-[55%] truncate hover:text-(--primary) transition-colors"${addAttribute(item.value, "title")} data-astro-cid-226yebg4>${item.value}</a>` : renderTemplate`<span class="text-xs font-bold text-neutral-900 dark:text-neutral-100 text-right max-w-[55%] truncate"${addAttribute(item.value, "title")} data-astro-cid-226yebg4>${item.value}</span>`}</div>`)}</div>${renderComponent($$result2, "site-info-collapse", "site-info-collapse", {
		"data-expand-text": i18n(I18nKey.siteInfoExpand),
		"data-collapse-text": i18n(I18nKey.siteInfoCollapse),
		"data-astro-cid-226yebg4": true
	}, { "default": ($$result3) => renderTemplate`<div class="site-info-detail overflow-hidden collapsed" data-astro-cid-226yebg4><div class="grid grid-cols-2 gap-2" data-astro-cid-226yebg4>${detailItems.map((item) => renderTemplate`<div${addAttribute(["flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/50", { "col-span-2": item.fullWidth }], "class:list")} data-astro-cid-226yebg4><div class="text-(--primary) text-lg" data-astro-cid-226yebg4>${renderComponent($$result3, "Icon", $$Icon, {
		"is:inline": true,
		"name": item.icon,
		"data-astro-cid-226yebg4": true
	})}</div><span class="text-xs text-neutral-500 dark:text-neutral-400" data-astro-cid-226yebg4>${item.label}</span><span${addAttribute(["text-sm font-bold text-neutral-900 dark:text-neutral-100 text-center truncate w-full", { "text-xs": item.fullWidth }], "class:list")}${addAttribute(item.value, "title")} data-astro-cid-226yebg4>${item.value}</span></div>`)}</div></div><button class="site-info-toggle-btn btn-plain rounded-lg w-full h-8 flex items-center justify-center gap-1.5 mt-1 text-(--primary) text-sm cursor-pointer" data-astro-cid-226yebg4>${renderComponent($$result3, "Icon", $$Icon, {
		"name": "material-symbols:keyboard-arrow-down-rounded",
		"is:inline": true,
		"class": "site-info-toggle-icon w-6 h-6 transition-transform duration-200",
		"data-astro-cid-226yebg4": true
	})}<span class="site-info-toggle-text" data-astro-cid-226yebg4></span></button>` })}</div>` })}${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteInfo.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteInfo.astro", void 0);
//#endregion
//#region src/components/widget/SiteStats.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$SiteStats = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteStats;
	const { class: className, style, widgetConfig } = Astro.props;
	const showTitle = widgetConfig?.showTitle !== false;
	const siteStartDate = siteConfig.siteStartDate || "2025-01-01";
	const posts = await getSortedPosts();
	const categories = await getCategoryList();
	const tags = await getTagList();
	let totalWords = 0;
	for (const post of posts) if (post.body) {
		let text = post.body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "").replace(/\s+/g, " ").trim();
		const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
		const englishChars = text.match(/[a-zA-Z]/g) || [];
		totalWords += chineseChars.length + englishChars.length;
	}
	function formatNumber(num) {
		return num.toLocaleString();
	}
	const getActivityDate = (post) => {
		const { published, updated } = post.data;
		if (updated && updated > published) return updated;
		return published;
	};
	const lastActivityDate = posts.reduce((latest, post) => {
		const current = getActivityDate(post);
		if (!latest || current > latest) return current;
		return latest;
	}, null);
	const lastPostDate = lastActivityDate ? lastActivityDate.toISOString() : null;
	const todayText = i18n(I18nKey.today);
	const stats = [
		{
			icon: "material-symbols:article-outline",
			label: i18n(I18nKey.siteStatsPostCount),
			value: posts.length
		},
		{
			icon: "material-symbols:folder-outline",
			label: i18n(I18nKey.siteStatsCategoryCount),
			value: categories.length
		},
		{
			icon: "material-symbols:label-outline",
			label: i18n(I18nKey.siteStatsTagCount),
			value: tags.length
		},
		{
			icon: "material-symbols:text-ad-outline-rounded",
			label: i18n(I18nKey.siteStatsTotalWords),
			value: totalWords,
			formatted: true
		},
		{
			icon: "material-symbols:calendar-clock-outline",
			label: i18n(I18nKey.siteStatsRunningDays),
			value: 0,
			suffix: i18n(I18nKey.siteStatsDays).replace("{days}", ""),
			dynamic: true,
			id: "running-days"
		},
		{
			icon: "mingcute:heartbeat-line",
			label: i18n(I18nKey.siteStatsLastUpdate),
			value: 0,
			suffix: i18n(I18nKey.siteStatsDaysAgo).replace("{days}", ""),
			dynamic: true,
			id: "last-update"
		}
	];
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.siteStats),
		"showTitle": showTitle,
		"id": "site-stats",
		"class": className,
		"style": style
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col gap-2">${stats.map((stat) => renderTemplate`<div class="flex items-center justify-between px-3 py-1.5"><div class="flex items-center gap-2.5"><div class="text-(--primary) text-xl">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": stat.icon
	})}</div><span class="text-neutral-700 dark:text-neutral-300 font-medium text-sm">${stat.label}</span></div><div class="flex items-center"><span class="text-base font-bold text-neutral-900 dark:text-neutral-100"${addAttribute(stat.id, "data-stat-id")}>${stat.formatted ? formatNumber(stat.value) : stat.value}</span>${stat.suffix && renderTemplate`<span class="ml-1 text-sm text-neutral-500 dark:text-neutral-400">${stat.suffix}</span>`}</div></div>`)}</div>` })}<script>(function(){${defineScriptVars({
		siteStartDate,
		lastPostDate,
		todayText
	})}
  function updateDynamicStats() {
    const today = new Date();

    // 更新运行天数
    const startDate = new Date(siteStartDate);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const runningDaysElements = document.querySelectorAll('[data-stat-id="running-days"]');
    runningDaysElements.forEach((element) => {
      element.textContent = diffDays.toString();
    });

    // 更新最后活动时间
    if (lastPostDate) {
      const lastPost = new Date(lastPostDate);
      const timeSinceLastPost = Math.abs(today.getTime() - lastPost.getTime());
      const daysSinceLastUpdate = Math.floor(timeSinceLastPost / (1000 * 60 * 60 * 24));

      const lastUpdateElements = document.querySelectorAll('[data-stat-id="last-update"]');
      lastUpdateElements.forEach((element) => {
        if (daysSinceLastUpdate === 0) {
          element.textContent = todayText;
          if (element.nextElementSibling) {
            element.nextElementSibling.style.display = 'none';
          }
        } else {
          element.textContent = daysSinceLastUpdate.toString();
          if (element.nextElementSibling) {
            element.nextElementSibling.style.display = '';
          }
        }
      });
    }
  }

  // 页面加载时更新
  updateDynamicStats();

  // 页面切换时重新更新
  document.addEventListener("swup:contentReplaced", () => {
    setTimeout(updateDynamicStats, 100);
  });
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/SiteStats.astro", void 0);
//#endregion
//#region src/components/common/ButtonTag.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$ButtonTag = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ButtonTag;
	const { dot, href, label } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(label, "aria-label")} class="tag-item transition text-sm font-medium px-3 py-1.5">${dot && renderTemplate`<div class="h-1 w-1 bg-(--btn-content) dark:bg-(--card-bg) transition rounded-md mr-2"></div>`}${renderSlot($$result, $$slots["default"])}</a>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/ButtonTag.astro", void 0);
//#endregion
//#region src/components/widget/Tags.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$Tags = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tags;
	const tags = await getTagList();
	const COLLAPSED_HEIGHT = "7.5rem";
	const { class: className, style, widgetConfig } = Astro.props;
	const collapseThreshold = widgetConfig?.specificConfig?.collapseThreshold;
	const showTitle = widgetConfig?.showTitle !== false;
	const isCollapsed = collapseThreshold ? tags.length > collapseThreshold : false;
	return renderTemplate`${renderComponent($$result, "WidgetLayout", $$WidgetLayout, {
		"name": i18n(I18nKey.tags),
		"showTitle": showTitle,
		"id": "tags",
		"isCollapsed": isCollapsed,
		"collapsedHeight": COLLAPSED_HEIGHT,
		"useExpandedButtonSpacing": true,
		"moreUrl": url("/tags/"),
		"class": className,
		"style": style,
		"data-astro-cid-iahrlnn4": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="tags-container" data-astro-cid-iahrlnn4>${tags.map((t) => renderTemplate`${renderComponent($$result, "ButtonTag", $$ButtonTag, {
		"href": getTagUrl(t.name),
		"label": `View all posts with the ${t.name.trim()} tag`,
		"data-astro-cid-iahrlnn4": true
	}, { "default": ($$result) => renderTemplate`${t.name.trim()}` })}`)}</div>` })}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/widget/Tags.astro", void 0);
//#endregion
//#region src/components/layout/SideBar.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$SideBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SideBar;
	const SIDEBAR_SIDE = {
		LEFT: "left",
		RIGHT: "right",
		BOTTOM: "bottom"
	};
	const COMPONENT_POSITION = {
		TOP: "top",
		STICKY: "sticky"
	};
	const ANIMATION_DELAY_UNIT = 50;
	const componentMap = {
		profile: $$Profile,
		announcement: $$Announcement,
		categories: $$Categories,
		tags: $$Tags,
		sidebarToc: $$SidebarTOC,
		advertisement: $$Advertisement,
		stats: $$SiteStats,
		calendar: $$Calendar,
		music: $$Music,
		siteInfo: $$SiteInfo,
		dynamic: $$Dynamic
	};
	const side = Astro.props.side || SIDEBAR_SIDE.LEFT;
	const className = Astro.props.class;
	const getComponents = () => {
		if (side === SIDEBAR_SIDE.LEFT) return sidebarLayoutConfig.leftComponents;
		if (side === SIDEBAR_SIDE.RIGHT) return sidebarLayoutConfig.rightComponents;
		if (side === SIDEBAR_SIDE.BOTTOM) return sidebarLayoutConfig.mobileBottomComponents;
		return [];
	};
	const filterAndSortComponents = (components) => {
		return components.filter((comp) => comp.enable);
	};
	const getComponentsByPosition = (components) => {
		return {
			topComponents: components.filter((c) => "position" in c && c.position === COMPONENT_POSITION.TOP),
			stickyComponents: components.filter((c) => "position" in c && c.position === COMPONENT_POSITION.STICKY)
		};
	};
	const getAnimationDelay = (index) => {
		return `${index * ANIMATION_DELAY_UNIT}ms`;
	};
	const isPostPage = Astro.url.pathname.includes("/posts/");
	const isComponentInitiallyVisible = (config) => {
		if ("showOnPostPage" in config && config.showOnPostPage === false && isPostPage) return false;
		if ("hideOnNonPostPage" in config && config.hideOnNonPostPage === true && !isPostPage) return false;
		return true;
	};
	const getComponentProps = (config, index) => {
		const baseProps = {
			class: "onload-animation",
			style: `animation-delay: ${getAnimationDelay(index)}`,
			widgetConfig: config
		};
		if ("showOnPostPage" in config && config.showOnPostPage === false) {
			baseProps.class = `${baseProps.class} widget-hide-on-post`;
			if (isPostPage) baseProps.class = `${baseProps.class} hidden`;
		}
		if ("hideOnNonPostPage" in config && config.hideOnNonPostPage === true) {
			baseProps.class = `${baseProps.class} widget-hide-on-non-post`;
			if (!isPostPage) baseProps.class = `${baseProps.class} hidden`;
		}
		if (config.type === "sidebarToc") return {
			...baseProps,
			headings: Astro.props.headings || [],
			encrypted: Astro.props.encrypted || false
		};
		return baseProps;
	};
	const filteredComponents = filterAndSortComponents(getComponents());
	const isMobileBottom = side === SIDEBAR_SIDE.BOTTOM;
	const { topComponents, stickyComponents } = !isMobileBottom ? getComponentsByPosition(filteredComponents) : {
		topComponents: [],
		stickyComponents: []
	};
	const bottomComponents = isMobileBottom ? filteredComponents : [];
	const hasInitiallyVisibleTopComponents = topComponents.some(isComponentInitiallyVisible);
	return renderTemplate`${(topComponents.length > 0 || stickyComponents.length > 0 || bottomComponents.length > 0) && renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`${side}-sidebar`, "id")}${addAttribute([className, "flex flex-col w-full pt-0"], "class:list")}>${isMobileBottom ? renderTemplate`<div class="flex flex-col w-full gap-4">${bottomComponents.map((comp, index) => {
		const Component = componentMap[comp.type];
		if (!Component) return null;
		return renderTemplate`${renderComponent($$result, "Component", Component, { ...getComponentProps(comp, index) })}`;
	})}</div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${topComponents.length > 0 && renderTemplate`<div${addAttribute(["flex flex-col w-full gap-4", hasInitiallyVisibleTopComponents && "mb-4"], "class:list")}>${topComponents.map((comp, index) => {
		const Component = componentMap[comp.type];
		if (!Component) return null;
		return renderTemplate`${renderComponent($$result, "Component", Component, { ...getComponentProps(comp, index) })}`;
	})}</div>`}${stickyComponents.length > 0 && renderTemplate`<div${addAttribute(`${side}-sidebar-sticky`, "id")}${addAttribute([
		"flex flex-col w-full mt-0 gap-4",
		"sticky",
		hasInitiallyVisibleTopComponents ? "top-4" : "top-0"
	], "class:list")}>${stickyComponents.map((comp, index) => {
		const Component = componentMap[comp.type];
		if (!Component) return null;
		return renderTemplate`${renderComponent($$result, "Component", Component, { ...getComponentProps(comp, topComponents.length + index) })}`;
	})}</div>`}` })}`}</div>`}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/SideBar.astro", void 0);
//#endregion
//#region src/components/common/FloatingButton.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$FloatingButton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FloatingButton;
	const { id, icon, toggleIcon, ariaLabel, onclick, class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(id, "id")}${addAttribute([
		"floating-btn",
		className,
		"card-base flex items-center rounded-2xl overflow-hidden transition"
	], "class:list")}${addAttribute(onclick, "onclick")} data-astro-cid-gpfyuzy5><button${addAttribute(ariaLabel, "aria-label")}${addAttribute(["h-full w-full rounded-2xl", toggleIcon && "has-toggle-icon"], "class:list")} data-astro-cid-gpfyuzy5>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": icon,
		"class:list": ["mx-auto", toggleIcon && "icon-default"],
		"data-astro-cid-gpfyuzy5": true
	})}${toggleIcon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": toggleIcon,
		"class": "icon-toggled",
		"data-astro-cid-gpfyuzy5": true
	})}`}</button></div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/common/FloatingButton.astro", void 0);
//#endregion
//#region src/components/controls/BackToComment.astro
var $$BackToComment = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "FloatingButton", $$FloatingButton, {
		"id": "back-to-comment-btn",
		"icon": "mingcute:comment-line",
		"ariaLabel": "Scroll to comments",
		"onclick": "scrollToCommentSection()",
		"class": "hide"
	})}<script>
  window.scrollToCommentSection = function () {
    const commentSection = document.getElementById("post-comments");
    if (!commentSection) return;

    commentSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  function updateCommentButtonVisibility() {
    const btn = document.getElementById("back-to-comment-btn");
    const commentSection = document.getElementById("post-comments");
    if (!btn) return;

    // No comment section on current page: keep hidden.
    if (!commentSection) {
      btn.style.display = "none";
      btn.classList.add("hide");
      return;
    }

    btn.style.display = "";
    btn.classList.remove("hide");
  }

  updateCommentButtonVisibility();
  setTimeout(updateCommentButtonVisibility, 0);
  requestAnimationFrame(updateCommentButtonVisibility);

  document.addEventListener("astro:page-load", updateCommentButtonVisibility);
  document.addEventListener("swup:contentReplaced", updateCommentButtonVisibility);
  document.addEventListener("swup:enable", updateCommentButtonVisibility);
<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/BackToComment.astro", void 0);
//#endregion
//#region src/components/controls/BackToHome.astro
var $$BackToHome = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "FloatingButton", $$FloatingButton, {
		"id": "back-to-home-btn",
		"icon": "material-symbols:home-outline-rounded",
		"ariaLabel": i18n(I18nKey.home),
		"onclick": "backToHome()",
		"class": "hide"
	})}<script>(function(){${defineScriptVars({ homeUrl: url("/") })}
  window.backToHome = function() {
    const url = homeUrl;
    if (window.swup) {
      window.swup.navigate(url);
    } else {
      window.location.href = url;
    }
  };
})();<\/script><script>(function(){${defineScriptVars({ homeUrl: url("/") })}
  function updateBackToHomeVisibility() {
    const btn = document.getElementById("back-to-home-btn");
    if (!btn) return;

    const path = window.location.pathname.replace(/\\/$/, "") || "/";
    const homePath = homeUrl.replace(/\\/$/, "") || "/";
    if (path === homePath) {
      btn.classList.add("hide");
    } else {
      btn.classList.remove("hide");
    }
  }

  // Initial check
  updateBackToHomeVisibility();
  
  // Re-check on view transitions or swup navigation
  document.addEventListener("astro:page-load", updateBackToHomeVisibility);
  document.addEventListener("swup:contentReplaced", updateBackToHomeVisibility);
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/BackToHome.astro", void 0);
//#endregion
//#region src/components/controls/BackToTop.astro
var $$BackToTop = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<!-- There can't be a filter on parent element, or it will break \`fixed\` -->${renderComponent($$result, "FloatingButton", $$FloatingButton, {
		"id": "back-to-top-btn",
		"icon": "material-symbols:keyboard-arrow-up-rounded",
		"ariaLabel": "Back to Top",
		"onclick": "backToTop()",
		"class": "hide"
	})}<script>
  function backToTop() {
    // 直接使用原生滚动，避免OverlayScrollbars冲突
    window.scroll({ top: 0, behavior: "smooth" });
  }

  // 响应式返回顶部按钮管理器
  if (typeof window.BackToTopManager === "undefined") {
    window.BackToTopManager = class BackToTopManager {
      constructor() {
        this.button = document.getElementById("back-to-top-btn");
        this.init();
      }

      init() {
        if (!this.button) return; // wrapper checks removed as it is now flexible

        this.setupScrollListener();
      }

      setupScrollListener() {
        const updateVisibility = () => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // 当滚动超过200px时显示按钮
          if (scrollTop > 200) {
            this.button.classList.remove("hide");
          } else {
            this.button.classList.add("hide");
          }
        };

        window.addEventListener("scroll", updateVisibility, { passive: true });
      }
    };
  }
  // ... existing initialization logic ...
  // 页面加载完成后初始化
  document.addEventListener("DOMContentLoaded", () => {
    new BackToTopManager();
  });

  // 如果页面已经加载完成，立即初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new BackToTopManager();
    });
  } else {
    new BackToTopManager();
  }
<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/BackToTop.astro", void 0);
//#endregion
//#region src/components/controls/FloatingTOC.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$FloatingTOC = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FloatingTOC;
	const { headings = [], encrypted = false } = Astro.props;
	const items = encrypted ? [] : computeTocItems(headings, { maxLevel: 3 });
	const isSidebarTocEnabled = (sidebarLayoutConfig.rightComponents?.find((c) => c.type === "sidebarToc"))?.enable ?? false;
	const sidebarPosition = sidebarLayoutConfig.position;
	const hideSidebarOnPostPage = sidebarLayoutConfig.hideSidebarOnPostPage === true;
	return renderTemplate`${maybeRenderHead($$result)}<!-- 悬浮TOC按钮 --><div id="floating-toc-wrapper" class="floating-toc-wrapper"${addAttribute(String(isSidebarTocEnabled), "data-is-sidebar-toc-enabled")}${addAttribute(sidebarPosition, "data-sidebar-position")}${addAttribute(String(sidebarLayoutConfig.showBothSidebarsOnPostPage ?? false), "data-show-both-sidebars-on-post")}${addAttribute(String(hideSidebarOnPostPage), "data-hide-sidebar-on-post")} data-astro-cid-hsvuoosw>${renderComponent($$result, "FloatingButton", $$FloatingButton, {
		"id": "floating-toc-btn",
		"icon": "material-symbols:format-list-bulleted",
		"toggleIcon": "material-symbols:close",
		"ariaLabel": "Table of Contents",
		"onclick": "window.toggleFloatingTOC()",
		"class": "hide",
		"data-astro-cid-hsvuoosw": true
	})}<!-- 悬浮TOC面板 - 移到 Wrapper 内部以便相对定位 --><div id="floating-toc-panel" class="floating-toc-panel hide overflow-hidden rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 dark:border-white/10 md:w-80 w-[calc(100vw-2rem)] md:max-h-96 max-h-[calc(100vh-8rem)] py-3" style="background-color: var(--card-bg-transparent);" data-astro-cid-hsvuoosw><div class="toc-scroll-container px-3" data-astro-cid-hsvuoosw><div class="toc-content" id="floating-toc-content" style="width: 100%; max-width: 100%;" data-astro-cid-hsvuoosw>${!encrypted && items.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`toc-item toc-level-${item.depthLevel}`, "class")}${addAttribute(item.headingId, "data-heading-id")}${addAttribute(item.text, "aria-label")}${addAttribute(item.text, "title")} data-astro-cid-hsvuoosw><div${addAttribute(`toc-badge ${item.badgeKind === "index" ? "toc-badge-index" : ""}`, "class")} data-astro-cid-hsvuoosw>${item.badgeKind === "index" ? item.badgeIndex : item.badgeKind === "dot" ? renderTemplate`<span class="toc-badge-dot" data-astro-cid-hsvuoosw></span>` : renderTemplate`<span class="toc-badge-dot toc-badge-dot-sm" data-astro-cid-hsvuoosw></span>`}</div><div${addAttribute(`toc-label ${item.labelPrimary ? "toc-label-primary" : "toc-label-secondary"}`, "class")} data-astro-cid-hsvuoosw>${item.text}</div></a>`)}<div id="floating-active-indicator" class="toc-active-indicator" style="opacity: 0;" data-astro-cid-hsvuoosw></div>` })}`}${!encrypted && items.length === 0 && renderTemplate`<div class="text-center py-8 text-gray-500 dark:text-gray-400" data-astro-cid-hsvuoosw><p data-astro-cid-hsvuoosw>${i18n(I18nKey.tocEmpty)}</p></div>`}</div></div></div></div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/FloatingTOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/FloatingTOC.astro", void 0);
//#endregion
//#region src/components/controls/FloatingControls.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$FloatingControls = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FloatingControls;
	const { headings, encrypted } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="floating-controls-container" data-astro-cid-7d2q6clk>${renderComponent($$result, "FloatingTOC", $$FloatingTOC, {
		"headings": headings ?? [],
		"encrypted": encrypted,
		"data-astro-cid-7d2q6clk": true
	})}${renderComponent($$result, "BackToComment", $$BackToComment, { "data-astro-cid-7d2q6clk": true })}${renderComponent($$result, "BackToHome", $$BackToHome, { "data-astro-cid-7d2q6clk": true })}${renderComponent($$result, "BackToTop", $$BackToTop, { "data-astro-cid-7d2q6clk": true })}</div>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/FloatingControls.astro", void 0);
//#endregion
//#region src/components/controls/ScrollDownIndicator.astro
var $$ScrollDownIndicator = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="scroll-down-indicator" class="scroll-down-indicator" onclick="document.getElementById('main-grid')?.scrollIntoView({ behavior: 'smooth' })">${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:keyboard-arrow-down-rounded",
		"class": "scroll-down-icon"
	})}</div><script>
  (function () {
    // 防止重复初始化（Swup 页面切换时可能重复执行）
    if (window.__scrollDownIndicatorInit) return;
    window.__scrollDownIndicatorInit = true;

    function updateVisibility() {
      var indicator = document.getElementById("scroll-down-indicator");
      if (!indicator) return;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        indicator.classList.add("hide");
      } else {
        indicator.classList.remove("hide");
      }
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
  })();
<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/controls/ScrollDownIndicator.astro", void 0);
//#endregion
//#region src/components/features/BackgroundPlayer.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$BackgroundPlayer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BackgroundPlayer;
	const { playerUrl, playerMode = "order" } = Astro.props;
	const urls = Array.isArray(playerUrl) ? playerUrl : [playerUrl];
	const hasMultiple = urls.length > 1;
	const urlsJson = JSON.stringify(urls);
	const tPrev = i18n(I18nKey.videoPrev);
	const tNext = i18n(I18nKey.videoNext);
	const tLoadError = i18n(I18nKey.videoLoadError);
	return renderTemplate`${urls.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div id="bg-player" data-astro-cid-kbzqli3q><div id="bg-player-overlay" class="absolute inset-0 z-15 overflow-hidden pointer-events-none transition-opacity duration-500 ease-in-out opacity-0" data-astro-cid-kbzqli3q><video id="bg-player-video" preload="auto" playsinline class="size-full object-cover" data-astro-cid-kbzqli3q></video></div><div id="bg-player-controls" class="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 group" data-astro-cid-kbzqli3q>${hasMultiple && renderTemplate`<button id="bg-prev-btn" class="w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/35 text-white/50 backdrop-blur-sm cursor-pointer transition-all duration-200 opacity-0 scale-90 group-hover:opacity-50 group-hover:scale-100 hover:opacity-80! hover:scale-100!"${addAttribute(tPrev, "title")}${addAttribute(tPrev, "aria-label")} data-astro-cid-kbzqli3q>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:skip-previous-rounded",
		"class": "text-[1rem]",
		"data-astro-cid-kbzqli3q": true
	})}</button>`}${hasMultiple && renderTemplate`<button id="bg-next-btn" class="w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/35 text-white/50 backdrop-blur-sm cursor-pointer transition-all duration-200 opacity-0 scale-90 group-hover:opacity-50 group-hover:scale-100 hover:opacity-80! hover:scale-100!"${addAttribute(tNext, "title")}${addAttribute(tNext, "aria-label")} data-astro-cid-kbzqli3q>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:skip-next-rounded",
		"class": "text-[1rem]",
		"data-astro-cid-kbzqli3q": true
	})}</button>`}</div><div id="bg-player-toast" class="fixed bottom-20 left-1/2 -translate-x-1/2 z-100 px-4 py-2 rounded-lg bg-black/70 text-white text-sm backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none" data-astro-cid-kbzqli3q>${tLoadError}</div></div>`}<script>(function(){${defineScriptVars({
		urls: urlsJson,
		playerMode,
		hasMultiple
	})}
	(() => {
		var urlList = JSON.parse(urls);
		if (!urlList.length) return;
		var isMultiple = urlList.length > 1;

		var overlay = document.getElementById("bg-player-overlay");
		var video = document.getElementById("bg-player-video");
		var prevBtn = document.getElementById("bg-prev-btn");
		var nextBtn = document.getElementById("bg-next-btn");
		var toast = document.getElementById("bg-player-toast");

		if (!video) return;

		// 防止 is:inline 脚本重复注册监听器（Swup 导航会重新执行脚本）
		if (video.getAttribute("data-player-init")) return;
		video.setAttribute("data-player-init", "true");

		var isPlaying = false;
		var currentIndex = 0;
		var errorCount = 0;
		var toastTimer = null;

		function showToast() {
			if (!toast) return;
			toast.classList.remove("opacity-0");
			toast.classList.add("opacity-100");
			if (toastTimer) clearTimeout(toastTimer);
			toastTimer = setTimeout(function () {
				toast.classList.remove("opacity-100");
				toast.classList.add("opacity-0");
			}, 3000);
		}

		function pickIndex(except) {
			if (urlList.length <= 1) return 0;
			if (playerMode === "random") {
				var n;
				do { n = Math.floor(Math.random() * urlList.length); } while (n === except);
				return n;
			}
			return (except + 1) % urlList.length;
		}

		function prevIndex() {
			if (urlList.length <= 1) return 0;
			if (playerMode === "random") return pickIndex(currentIndex);
			return (currentIndex - 1 + urlList.length) % urlList.length;
		}

		function syncAttr() {
			document.body.toggleAttribute("data-bg-video-playing", isPlaying);
			document.documentElement.toggleAttribute("data-bg-video-playing", isPlaying);
			window.dispatchEvent(new CustomEvent("bg-player-state-change", { detail: { playing: isPlaying } }));
		}

		function doPlay() {
			video.src = urlList[currentIndex];
			video.muted = true;
			video.play()
				.then(function () { setTimeout(function () { if (video) video.muted = false; }, 100); })
				.catch(function () { isPlaying = false; syncAttr(); });
		}

		function switchTrack(index) {
			if (index < 0 || index >= urlList.length) return;
			currentIndex = index;
			if (isPlaying) {
				doPlay();
			} else {
				video.src = urlList[currentIndex];
				video.load();
			}
		}

		function toggle() {
			isPlaying = !isPlaying;
			if (isPlaying) {
				if (currentIndex >= urlList.length) currentIndex = 0;
				syncAttr();
				if (overlay) { overlay.classList.remove("opacity-0"); overlay.classList.add("opacity-100"); }
				requestAnimationFrame(function () { doPlay(); });
			} else {
				video.pause();
				if (overlay) { overlay.classList.remove("opacity-100"); overlay.classList.add("opacity-0"); }
				syncAttr();
			}
		}

		function onEnded() {
			if (isMultiple) {
				currentIndex = pickIndex(currentIndex);
				doPlay();
			} else {
				isPlaying = false;
				if (overlay) { overlay.classList.remove("opacity-100"); overlay.classList.add("opacity-0"); }
				syncAttr();
			}
		}

		function onError() {
			errorCount++;
			if (isMultiple && errorCount < urlList.length) {
				// 多视频模式下自动尝试下一个
				currentIndex = pickIndex(currentIndex);
				video.src = urlList[currentIndex];
				video.load();
			} else {
				// 所有视频都失败或只有单个视频
				isPlaying = false;
				if (overlay) { overlay.classList.remove("opacity-100"); overlay.classList.add("opacity-0"); }
				syncAttr();
				showToast();
			}
		}

		// 监听导航栏播放按钮事件
		window.addEventListener("bg-player-toggle", toggle);
		video.addEventListener("ended", onEnded);
		video.addEventListener("error", onError);
		// 播放成功时重置错误计数
		video.addEventListener("playing", function () { errorCount = 0; });
		if (prevBtn) prevBtn.addEventListener("click", function () { switchTrack(prevIndex()); });
		if (nextBtn) nextBtn.addEventListener("click", function () { switchTrack(pickIndex(currentIndex)); });

		// 切换壁纸模式时停止播放
		window.addEventListener("wallpaperModeChange", function (e) {
			if (e.detail && e.detail.mode === "none" && isPlaying) {
				isPlaying = false;
				video.pause();
				if (overlay) { overlay.classList.remove("opacity-100"); overlay.classList.add("opacity-0"); }
				syncAttr();
			}
		});

		// 动态控制 prev/next 按钮显示
		if (!isMultiple) {
			if (prevBtn) prevBtn.style.display = "none";
			if (nextBtn) nextBtn.style.display = "none";
		}

		function cleanup() {
			// 视频仍在播放时保留属性，供 Navbar 同步按钮状态
			if (!isPlaying) {
				document.body.removeAttribute("data-bg-video-playing");
				document.documentElement.removeAttribute("data-bg-video-playing");
			}
		}
		document.addEventListener("astro:before-swap", cleanup);
	})();
})();<\/script>`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/BackgroundPlayer.astro", void 0);
//#endregion
//#region src/components/features/TypewriterText.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$TypewriterText = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TypewriterText;
	const { text, speed = 100, deleteSpeed = 50, pauseTime = 2e3, class: className = "" } = Astro.props;
	const textData = Array.isArray(text) ? JSON.stringify(text) : text;
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(`typewriter ${className}`, "class")}${addAttribute(textData, "data-text")}${addAttribute(speed, "data-speed")}${addAttribute(deleteSpeed, "data-delete-speed")}${addAttribute(pauseTime, "data-pause-time")} data-astro-cid-ez47j3df></span>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/TypewriterText.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/features/TypewriterText.astro", void 0);
//#endregion
//#region src/components/layout/CategoryBar.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$CategoryBar = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CategoryBar;
	const { currentPostCategory } = Astro.props;
	const categories = await getCategoryList();
	const totalPosts = (await getSortedPostsList()).length;
	const homeUrl = url("/");
	const archiveUrl = url("/archive/");
	const pathname = Astro.url.pathname.replace(/\/$/, "");
	const homePath = homeUrl.replace(/\/$/, "");
	const archivePath = archiveUrl.replace(/\/$/, "");
	const isHome = pathname === homePath || pathname === "" || pathname === "/";
	const isCategories = pathname === "/categories";
	const isArchive = pathname === archivePath;
	const postCategory = (currentPostCategory || "").trim();
	function initialActive(categoryName) {
		if (isHome) return categoryName === "" ? { active: true } : {};
		if (isCategories) return categoryName === "__categories__" ? { active: true } : {};
		if (isArchive) return categoryName === "__archive__" ? { active: true } : {};
		if (postCategory && categoryName === postCategory) return { soft: true };
		return {};
	}
	return renderTemplate`${maybeRenderHead($$result)}<div class="card-base category-bar p-3 onload-animation" id="category-bar"${addAttribute(homeUrl, "data-home-path")}${addAttribute(archiveUrl, "data-archive-path")}${addAttribute(currentPostCategory || "", "data-current-post-category")} data-astro-cid-cco35jjw><div class="category-bar-inner flex gap-2" data-astro-cid-cco35jjw><a${addAttribute(homeUrl, "href")} class="category-pill focus-ring-inset text-sm px-3 py-1.5 shrink-0
             transition-colors duration-150 ease-out flex items-center justify-center" data-category-name=""${addAttribute(initialActive("").active ? "" : void 0, "data-active")}${addAttribute(i18n(I18nKey.home), "aria-label")} data-astro-cid-cco35jjw>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "material-symbols:home",
		"class": "text-lg",
		"data-astro-cid-cco35jjw": true
	})}</a><a${addAttribute(archiveUrl, "href")} class="category-pill focus-ring-inset text-sm px-4 py-1.5 whitespace-nowrap shrink-0
             transition-colors duration-150 ease-out flex items-center justify-center" data-category-name="__archive__"${addAttribute(initialActive("__archive__").active ? "" : void 0, "data-active")} data-astro-cid-cco35jjw>${i18n(I18nKey.archive)}<span class="pill-count" data-astro-cid-cco35jjw>${totalPosts}</span></a><div class="category-divider shrink-0" data-astro-cid-cco35jjw></div><div class="scroll-area relative" data-astro-cid-cco35jjw><div class="scroll-fade scroll-fade-left" aria-hidden="true" data-astro-cid-cco35jjw></div><div class="category-scroll flex gap-2 overflow-x-auto" data-astro-cid-cco35jjw>${categories.map((cat) => {
		const active = initialActive(cat.name);
		return renderTemplate`<a${addAttribute(cat.url, "href")} class="category-pill focus-ring-inset text-sm px-4 py-1.5 whitespace-nowrap
                     transition-colors duration-150 ease-out flex items-center justify-center"${addAttribute(cat.name, "data-category-name")}${addAttribute(active.active ? "" : void 0, "data-active")}${addAttribute(active.soft ? "" : void 0, "data-soft-active")} data-astro-cid-cco35jjw>${cat.name}<span class="pill-count" data-astro-cid-cco35jjw>${cat.count}</span></a>`;
	})}</div><div class="scroll-fade scroll-fade-right" aria-hidden="true" data-astro-cid-cco35jjw></div></div><div class="category-divider shrink-0 more-divider" aria-hidden="true" data-astro-cid-cco35jjw></div><a${addAttribute(url("/categories/"), "href")} class="category-pill focus-ring-inset text-sm px-3 py-1.5 shrink-0
             transition-colors duration-150 ease-out flex items-center justify-center gap-1" data-category-name="__categories__"${addAttribute(initialActive("__categories__").active ? "" : void 0, "data-active")}${addAttribute(i18n(I18nKey.more), "aria-label")} data-astro-cid-cco35jjw><span data-astro-cid-cco35jjw>${i18n(I18nKey.more)}</span>${renderComponent($$result, "Icon", $$Icon, {
		"is:inline": true,
		"name": "fa7-solid:chevron-right",
		"class": "text-sm",
		"data-astro-cid-cco35jjw": true
	})}</a></div></div>${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/CategoryBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/components/layout/CategoryBar.astro", void 0);
//#endregion
//#region src/utils/responsive-utils.ts
/**
* 获取响应式侧边栏配置
*
* 响应式布局（硬编码）：
* - 768px及以下: 隐藏侧栏，显示底部mobileBottomComponents
* - 769px-1279px: 根据position和tabletSidebar配置显示侧栏
* - 1280px及以上: 根据position配置显示侧栏
*/
function getResponsiveSidebarConfig() {
	const position = sidebarLayoutConfig.position;
	const tabletSidebar = sidebarLayoutConfig.tabletSidebar ?? "left";
	return {
		isBothSidebars: sidebarLayoutConfig.enable && position === "both",
		hasLeftComponents: sidebarLayoutConfig.enable && position !== "right" && sidebarLayoutConfig.leftComponents.some((comp) => comp.enable),
		hasRightComponents: sidebarLayoutConfig.enable && position !== "left" && sidebarLayoutConfig.rightComponents.some((comp) => comp.enable),
		mobileShowSidebar: false,
		tabletShowSidebar: sidebarLayoutConfig.enable,
		desktopShowSidebar: sidebarLayoutConfig.enable,
		position,
		tabletSidebar
	};
}
/**
* 生成网格列数CSS类
*
* 响应式设计：
* - 768px及以下: 单列布局（grid-cols-1），隐藏侧栏，显示底部组件
* - 769px-1279px: 根据position和tabletSidebar配置决定2列布局方向
* - 1280px及以上: 根据position配置决定2列或3列布局
*/
function generateGridClasses(config) {
	let gridCols = "grid-cols-1";
	if (config.isBothSidebars && config.hasLeftComponents && config.hasRightComponents) if (config.tabletSidebar === "right") gridCols = "grid-cols-1 md:grid-cols-[1fr_17.5rem] xl:grid-cols-[17.5rem_1fr_17.5rem]";
	else gridCols = "grid-cols-1 md:grid-cols-[17.5rem_1fr] xl:grid-cols-[17.5rem_1fr_17.5rem]";
	else if (config.hasLeftComponents && !config.hasRightComponents) gridCols = "grid-cols-1 md:grid-cols-[17.5rem_1fr]";
	else if (!config.hasLeftComponents && config.hasRightComponents) gridCols = "grid-cols-1 md:grid-cols-[1fr_17.5rem]";
	return { gridCols };
}
/**
* 生成左侧边栏容器CSS类
*/
function generateSidebarClasses(config) {
	const classes = [
		"mb-4",
		"hidden",
		"md:col-span-1",
		"md:max-w-70",
		"md:row-start-1",
		"md:row-end-3",
		"md:col-start-1",
		"onload-animation"
	];
	if (config.isBothSidebars && config.tabletSidebar === "right") classes.push("xl:block");
	else classes.push("md:block");
	return classes.join(" ");
}
/**
* 生成右侧边栏CSS类
*/
function generateRightSidebarClasses(config) {
	const classes = [
		"mb-4",
		"hidden",
		"onload-animation"
	];
	if (config.isBothSidebars && config.tabletSidebar === "right") classes.push("md:block", "md:row-start-1", "md:row-end-3", "md:col-span-1", "md:max-w-70", "md:col-start-2", "xl:col-start-3");
	else if (config.isBothSidebars) classes.push("xl:block", "xl:row-start-1", "xl:row-end-3", "xl:col-span-1", "xl:max-w-70", "xl:col-start-3");
	else if (config.position === "right") classes.push("md:block", "md:row-start-1", "md:row-end-3", "md:col-span-1", "md:max-w-70", "md:col-start-2");
	else classes.push("xl:block", "xl:row-start-1", "xl:row-end-3", "xl:col-span-1", "xl:max-w-70", "xl:col-start-3");
	return classes.join(" ");
}
/**
* 生成主内容区CSS类
*/
function generateMainContentClasses(config) {
	const classes = ["transition-main", "col-span-1"];
	if (config.isBothSidebars && config.hasLeftComponents && config.hasRightComponents) if (config.tabletSidebar === "right") {
		classes.push("md:col-span-1");
		classes.push("md:col-start-1");
		classes.push("xl:col-span-1");
		classes.push("xl:col-start-2");
		classes.push("xl:col-end-3");
	} else {
		classes.push("md:col-span-1");
		classes.push("md:col-start-2");
		classes.push("xl:col-span-1");
		classes.push("xl:col-start-2");
		classes.push("xl:col-end-3");
	}
	else if (config.hasLeftComponents && !config.hasRightComponents) {
		classes.push("md:col-span-1");
		classes.push("md:col-start-2");
	} else if (!config.hasLeftComponents && config.hasRightComponents) {
		classes.push("md:col-span-1");
		classes.push("md:col-start-1");
	} else classes.push("col-span-1");
	classes.push("min-w-0");
	classes.push("overflow-hidden");
	return classes.join(" ");
}
//#endregion
//#region src/layouts/MainGridLayout.astro
createAstro("https://zhedaotixuanbo.pages.dev");
var $$MainGridLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MainGridLayout;
	const backgroundImages = getBackgroundImages();
	const { title, banner, description, lang, setOGTypeArticle, postSlug, postCategory, headings = [], encrypted = false, bannerPostMeta } = Astro.props;
	const isBannerMode = backgroundWallpaper.mode === "banner";
	const isFullscreenMode = backgroundWallpaper.mode === "fullscreen";
	const isOverlayMode = backgroundWallpaper.mode === "overlay";
	const isBackgroundEnabled = backgroundWallpaper.mode !== "none";
	const isWallpaperSwitchable = displaySettingsConfig.wallpaperModeSwitchable;
	const wavesConfig = backgroundWallpaper.common?.waves?.enable;
	const wavesSwitchable = displaySettingsConfig.wavesSwitchable;
	const wavesEnabledOnDesktop = typeof wavesConfig === "object" ? wavesConfig.desktop : wavesConfig;
	const wavesEnabledOnMobile = typeof wavesConfig === "object" ? wavesConfig.mobile : wavesConfig;
	const shouldRenderWaves = wavesEnabledOnDesktop || wavesEnabledOnMobile || wavesSwitchable;
	const gradientConfig = backgroundWallpaper.common?.gradient?.enable;
	const gradientSwitchable = displaySettingsConfig.gradientSwitchable;
	const gradientEnabledOnDesktop = typeof gradientConfig === "object" ? gradientConfig.desktop : gradientConfig ?? true;
	const gradientEnabledOnMobile = typeof gradientConfig === "object" ? gradientConfig.mobile : gradientConfig ?? true;
	const gradientHeight = backgroundWallpaper.common?.gradient?.height ?? "30vh";
	const shouldRenderGradient = gradientEnabledOnDesktop || gradientEnabledOnMobile || gradientSwitchable;
	const isHomePageCheck = isHomePage(Astro.url.pathname);
	const shouldRenderCategoryBar = !!siteConfig.categoryBar;
	const isPostPage = !!postSlug;
	const getRandomSubtitle = () => {
		const subtitle = backgroundWallpaper.common?.homeText?.subtitle;
		if (Array.isArray(subtitle)) return subtitle[Math.floor(Math.random() * subtitle.length)];
		return subtitle;
	};
	const randomSubtitle = getRandomSubtitle();
	const homeTextEnable = backgroundWallpaper.common?.homeText?.enable;
	const showHomeText = (isBannerMode || isFullscreenMode) && !!homeTextEnable && isHomePageCheck;
	const showBannerPostMeta = (isBannerMode || isFullscreenMode) && isBackgroundEnabled && !isHomePageCheck && isPostPage && !!bannerPostMeta;
	const bannerPostInfoMode = backgroundWallpaper.common?.postInfo?.mode ?? "description";
	const getBannerDescriptionWidth = (description) => {
		if (!description) return void 0;
		const textUnits = Array.from(description).reduce((total, character) => {
			if (/\s/u.test(character)) return total + .35;
			return total + ((character.codePointAt(0) ?? 0) <= 255 ? .55 : 1);
		}, 0);
		const maxLineUnits = 52;
		const lineCount = Math.max(1, Math.ceil(textUnits / maxLineUnits));
		if (lineCount === 1) return void 0;
		const targetLineUnits = Math.min(maxLineUnits, textUnits / (lineCount - .5));
		return `${Math.max(28, targetLineUnits).toFixed(1)}em`;
	};
	const bannerDescriptionWidth = getBannerDescriptionWidth(bannerPostMeta?.description);
	const showBannerDim = (isBannerMode || isFullscreenMode) && isBackgroundEnabled;
	const dimOpacity = backgroundWallpaper.common?.dimOpacity ?? .15;
	const showBannerPageTitle = (isBannerMode || isFullscreenMode) && isBackgroundEnabled && !isHomePageCheck && !isPostPage && !!title;
	const mobileNonHomeBannerClass = !isHomePageCheck ? "mobile-hide-banner" : "";
	const mainPanelTop = isBannerMode && isBackgroundEnabled ? `calc(35vh - ${MAIN_PANEL_OVERLAPS_BANNER_HEIGHT}rem)` : "5.5rem";
	const finalMainPanelTop = isBannerMode && isBackgroundEnabled ? mainPanelTop : "5.5rem";
	const sidebarConfig = getResponsiveSidebarConfig();
	const hideSidebarOnPostPage = sidebarLayoutConfig.hideSidebarOnPostPage === true;
	const shouldShowBothSidebarsOnPostPage = sidebarLayoutConfig.enable && !hideSidebarOnPostPage && isPostPage && sidebarLayoutConfig.position !== "both" && !!sidebarLayoutConfig.showBothSidebarsOnPostPage;
	const shouldAddRightSidebar = shouldShowBothSidebarsOnPostPage && sidebarLayoutConfig.position === "left";
	const shouldAddLeftSidebar = shouldShowBothSidebarsOnPostPage && sidebarLayoutConfig.position === "right";
	const effectiveIsBothSidebars = sidebarConfig.isBothSidebars || shouldShowBothSidebarsOnPostPage;
	const effectiveHasRightComponents = sidebarConfig.hasRightComponents || shouldAddRightSidebar && sidebarLayoutConfig.rightComponents.some((comp) => comp.enable);
	const effectiveHasLeftComponents = sidebarConfig.hasLeftComponents || shouldAddLeftSidebar && sidebarLayoutConfig.leftComponents.some((comp) => comp.enable);
	const effectiveTabletSidebar = shouldAddLeftSidebar ? "right" : sidebarConfig.tabletSidebar;
	const updatedGridConfig = {
		...sidebarConfig,
		isBothSidebars: effectiveIsBothSidebars,
		hasLeftComponents: effectiveHasLeftComponents,
		hasRightComponents: effectiveHasRightComponents,
		tabletSidebar: effectiveTabletSidebar
	};
	const { gridCols } = generateGridClasses(updatedGridConfig);
	const sidebarClass = generateSidebarClasses(updatedGridConfig);
	const rightSidebarClass = effectiveIsBothSidebars || sidebarLayoutConfig.position === "right" ? generateRightSidebarClasses(updatedGridConfig) : "";
	const staticBarClass = generateMainContentClasses(updatedGridConfig).replace("transition-main", "").trim();
	const footerClass = [
		"footer",
		"col-span-1",
		"onload-animation"
	];
	if (updatedGridConfig.isBothSidebars && updatedGridConfig.hasLeftComponents && updatedGridConfig.hasRightComponents) if (updatedGridConfig.tabletSidebar === "right") footerClass.push("md:col-start-1 md:col-span-1 xl:col-start-2 xl:col-span-1");
	else footerClass.push("md:col-start-2 md:col-span-1 xl:col-start-2 xl:col-span-1");
	else if (updatedGridConfig.hasLeftComponents && !updatedGridConfig.hasRightComponents) footerClass.push("md:col-start-2 md:col-span-1 xl:col-start-2 xl:col-span-1");
	else if (!updatedGridConfig.hasLeftComponents && updatedGridConfig.hasRightComponents) footerClass.push("md:col-start-1 md:col-span-1 xl:col-start-1 xl:col-span-1");
	else footerClass.push("md:col-start-1 md:col-span-1 xl:col-start-1 xl:col-span-1");
	const footerClassName = footerClass.join(" ");
	const shouldEnableTransparency = isOverlayMode && isBackgroundEnabled;
	const navbarWidthFull = siteConfig.navbar.widthFull ?? false;
	const stickyNavbar = siteConfig.navbar.stickyNavbar ?? false;
	const configQuality = getImageQuality();
	const mobileQuality = Math.round(configQuality * .9);
	const bannerCarouselEnabledDefault = backgroundWallpaper.common?.carousel?.enable ?? false;
	const bannerCarouselSwitchable = displaySettingsConfig.bannerCarouselSwitchable;
	const bannerCarouselInterval = Math.max(backgroundWallpaper.common?.carousel?.interval ?? 5e3, 3e3);
	const bannerCarouselEffect = backgroundWallpaper.common?.carousel?.transitionEffect ?? "fade";
	const hasMultipleImages = backgroundImages.desktop.length > 1 || backgroundImages.mobile.length > 1;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": title,
		"banner": banner,
		"description": description,
		"lang": lang,
		"setOGTypeArticle": setOGTypeArticle,
		"postSlug": postSlug,
		"hasWallpaper": isWallpaperSwitchable || isBannerMode || isFullscreenMode || isOverlayMode
	}, {
		"default": ($$result) => renderTemplate`${shouldEnableTransparency && renderTemplate`${renderScript($$result, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/MainGridLayout.astro?astro&type=script&index=0&lang.ts")}`}${maybeRenderHead($$result)}<div id="top-row"${addAttribute(["z-50 pointer-events-none relative transition-all duration-700 mx-auto", [stickyNavbar ? "h-18 fixed top-0 left-0 right-0 z-80" : "", navbarWidthFull ? "" : "w-full xl:w-[92vw] max-w-(--page-width) px-0 md:px-4"]], "class:list")}><div id="navbar-wrapper"${addAttribute(["pointer-events-auto transition-all", stickyNavbar ? "" : "sticky top-0"], "class:list")}>${renderComponent($$result, "Navbar", $$Navbar, {})}</div></div>${(isWallpaperSwitchable || isBannerMode || isFullscreenMode || isOverlayMode) && renderTemplate`<div id="wallpaper-wrapper"${addAttribute([
			`absolute z-10 w-full transition duration-700 overflow-hidden ${mobileNonHomeBannerClass}`,
			isOverlayMode && !isWallpaperSwitchable ? "wallpaper-overlay" : "",
			isFullscreenMode && !isWallpaperSwitchable ? "wallpaper-fullscreen" : ""
		], "class:list")}${addAttribute(isWallpaperSwitchable ? `top: -30vh; display: none; --overlay-opacity: ${backgroundWallpaper.overlay?.opacity ?? .8}; --overlay-z-index: ${backgroundWallpaper.overlay?.zIndex ?? -1}; --overlay-blur: ${backgroundWallpaper.overlay?.blur ?? 0}px;` : isOverlayMode ? `--overlay-opacity: ${backgroundWallpaper.overlay?.opacity ?? .8}; --overlay-z-index: ${backgroundWallpaper.overlay?.zIndex ?? -1}; --overlay-blur: ${backgroundWallpaper.overlay?.blur ?? 0}px;` : isFullscreenMode ? `` : `top: -30vh`, "style")}><!-- 背景图片显示 -->${hasMultipleImages ? renderTemplate`<div${addAttribute(["relative h-full w-full bg-black", `effect-${bannerCarouselEffect}`], "class:list")} id="banner-images-container"${addAttribute(`z-index: 5; --carousel-interval: ${bannerCarouselInterval}ms`, "style")}${addAttribute(bannerCarouselEnabledDefault, "data-carousel-enabled")}${addAttribute(bannerCarouselSwitchable, "data-carousel-switchable")}${addAttribute(bannerCarouselInterval, "data-carousel-interval")}${addAttribute(bannerCarouselEffect, "data-carousel-effect")}>${backgroundImages.mobile.map((src, index) => renderTemplate`<div${addAttribute(["slide-item block lg:hidden", index === 0 && "active"], "class:list")}${addAttribute(index, "data-index")}><template>${templateEnter($$result)}${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Mobile background image of the blog",
			"class": "object-cover h-full w-full",
			"src": src,
			"position": backgroundWallpaper.banner?.position,
			"width": 828,
			"widths": [640, 828],
			"sizes": "100vw",
			"loading": "eager",
			"quality": mobileQuality
		})}${templateExit($$result)}</template></div>`)}${backgroundImages.desktop.map((src, index) => renderTemplate`<div${addAttribute(["slide-item hidden lg:block", index === 0 && "active"], "class:list")}${addAttribute(index, "data-index")}><template>${templateEnter($$result)}${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"id": "banner",
			"alt": "Desktop background image of the blog",
			"class": "object-cover h-full",
			"src": src,
			"position": backgroundWallpaper.banner?.position,
			"width": 1920,
			"widths": [1280, 1920],
			"sizes": "100vw",
			"loading": "eager",
			"quality": configQuality
		})}${templateExit($$result)}</template></div>`)}<noscript>${backgroundImages.mobile.length > 0 && renderTemplate`<div class="slide-item active block lg:hidden">${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Mobile background image of the blog",
			"class": "object-cover h-full w-full",
			"src": backgroundImages.mobile[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 828,
			"widths": [640, 828],
			"sizes": "100vw",
			"loading": "eager",
			"fetchpriority": "high",
			"fadeIn": false,
			"quality": mobileQuality
		})}</div>`}${backgroundImages.desktop.length > 0 && renderTemplate`<div class="slide-item active hidden lg:block">${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Desktop background image of the blog",
			"class": "object-cover h-full",
			"src": backgroundImages.desktop[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 1920,
			"widths": [1280, 1920],
			"sizes": "100vw",
			"loading": "eager",
			"fetchpriority": "high",
			"fadeIn": false,
			"quality": configQuality
		})}</div>`}</noscript></div>` : renderTemplate`<div class="relative h-full w-full" id="banner-images-container">${backgroundImages.mobile.length > 0 && renderTemplate`<div class="banner-image-slot absolute inset-0 block lg:hidden"><template>${templateEnter($$result)}${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Mobile background image of the blog",
			"class": "object-cover h-full w-full",
			"src": backgroundImages.mobile[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 828,
			"widths": [640, 828],
			"sizes": "100vw",
			"loading": "eager",
			"quality": mobileQuality
		})}${templateExit($$result)}</template></div>`}${backgroundImages.desktop.length > 0 && renderTemplate`<div class="banner-image-slot absolute inset-0 hidden lg:block"><template>${templateEnter($$result)}${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"id": "banner",
			"alt": "Desktop background image of the blog",
			"class": "object-cover h-full",
			"src": backgroundImages.desktop[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 1920,
			"widths": [1280, 1920],
			"sizes": "100vw",
			"loading": "eager",
			"quality": configQuality
		})}${templateExit($$result)}</template></div>`}<noscript>${backgroundImages.mobile.length > 0 && renderTemplate`<div class="absolute inset-0 block lg:hidden">${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Mobile background image of the blog",
			"class": "object-cover h-full w-full",
			"src": backgroundImages.mobile[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 828,
			"widths": [640, 828],
			"sizes": "100vw",
			"loading": "eager",
			"fetchpriority": "high",
			"fadeIn": false,
			"quality": mobileQuality
		})}</div>`}${backgroundImages.desktop.length > 0 && renderTemplate`<div class="absolute inset-0 hidden lg:block">${renderComponent($$result, "ImageWrapper", $$ImageWrapper, {
			"alt": "Desktop background image of the blog",
			"class": "object-cover h-full",
			"src": backgroundImages.desktop[0],
			"position": backgroundWallpaper.banner?.position,
			"width": 1920,
			"widths": [1280, 1920],
			"sizes": "100vw",
			"loading": "eager",
			"fetchpriority": "high",
			"fadeIn": false,
			"quality": configQuality
		})}</div>`}</noscript></div>`}<!-- 壁纸轮播脚本（基于 CSS transition） -->${hasMultipleImages && renderTemplate`<script data-swup-ignore-script>
        (function initBannerCarousel() {
            var container = document.getElementById('banner-images-container');
            if (!container) return;

            var WALLPAPER_BANNER = 'banner';
            var interval = parseInt(container.dataset.carouselInterval || '5000', 10);
            var switchable = container.dataset.carouselSwitchable === 'true';
            var defaultEnabled = container.dataset.carouselEnabled === 'true';
            var effect = container.dataset.carouselEffect || 'fade';
            var transitioning = false;

            function isCarouselEnabled() {
                if (!switchable) return defaultEnabled;
                var stored = localStorage.getItem('bannerCarouselEnabled');
                if (stored === null) return defaultEnabled;
                return stored === 'true';
            }

            function isBannerWallpaperMode() {
                var mode = document.documentElement.getAttribute('data-wallpaper-mode');
                return mode === WALLPAPER_BANNER || mode === 'fullscreen';
            }

            // 图片淡入：Layout 里的全局 initImageLoadFadeIn 只在解析期扫一次，
            // 之后克隆进来的图片得自己接管，否则会一直停在 opacity-0
            function fadeInWhenLoaded(root) {
                var ph = root.querySelector('.lqip-placeholder');
                var img = root.querySelector('img');
                if (!img) return;
                function done() {
                    img.style.opacity = '1';
                    if (ph) ph.classList.add('loaded');
                }
                if (img.complete && img.naturalWidth > 0) {
                    done();
                } else {
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', function () {
                        if (ph) ph.classList.add('loaded');
                    }, { once: true });
                }
            }

            // 把 <template> 里的图片实例化进 DOM —— 插入的那一刻才开始下载
            function materialize(slideEl, high) {
                if (!slideEl) return false;
                var tpl = slideEl.querySelector('template');
                if (!tpl) return false;
                var frag = tpl.content.cloneNode(true);
                if (high) {
                    var img = frag.querySelector('img');
                    // 必须在插入前写，插入即发起请求
                    if (img) {
                        img.setAttribute('fetchpriority', 'high');
                        // 这张是 LCP 元素，不做淡入：图片没下完时 <img> 本来就不画东西，
                        // 那 500ms 过渡只是把已经能看的画面又藏半秒，Chrome 会把 LCP 往后记。
                        img.classList.remove('opacity-0', 'transition-opacity', 'duration-500', 'ease-out');
                        img.style.opacity = '1';
                    }
                    // LQIP 占位层是 absolute + z-index:0，盖在 img 上面，
                    // 它那 0.5s 淡出同样会挡住 LCP
                    var ph = frag.querySelector('.lqip-placeholder');
                    if (ph) ph.style.transition = 'none';
                }
                slideEl.appendChild(frag);
                tpl.remove();
                fadeInWhenLoaded(slideEl);
                return true;
            }

            // 预取下一张，避免切换时闪一帧黑
            function materializeAhead(slides, index) {
                if (slides.length < 2) return;
                materialize(slides[(index + 1) % slides.length], false);
            }

            // 获取当前设备可见的 slide-item
            function getVisibleSlides() {
                var all = container.querySelectorAll('.slide-item');
                var isLg = window.innerWidth >= 1024;
                var visible = [];
                for (var i = 0; i < all.length; i++) {
                    var el = all[i];
                    if (isLg && el.classList.contains('lg:hidden')) continue;
                    if (!isLg && el.classList.contains('hidden') && !el.classList.contains('lg:hidden')) continue;
                    visible.push(el);
                }
                if (visible.length === 0) {
                    for (var j = 0; j < all.length; j++) visible.push(all[j]);
                }
                return visible;
            }

            function getCurrentIndex(slides) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i].classList.contains('active')) return i;
                }
                return 0;
            }

            function applySlideChange(slides, nextIndex) {
                // Slide 效果需要 prev-waiting 辅助类
                if (effect === 'slide') {
                    for (var i = 0; i < slides.length; i++) {
                        slides[i].classList.remove('prev-waiting');
                        if (i < nextIndex) slides[i].classList.add('prev-waiting');
                    }
                }
                if (effect === 'kenburns') {
                    // Ken Burns: 交叉淡入淡出，先激活新图再隐藏旧图
                    slides[nextIndex].classList.add('active');
                    requestAnimationFrame(function() {
                        for (var j = 0; j < slides.length; j++) {
                            if (j !== nextIndex) slides[j].classList.remove('active');
                        }
                    });
                } else {
                    for (var j = 0; j < slides.length; j++) {
                        if (j === nextIndex) slides[j].classList.add('active');
                        else slides[j].classList.remove('active');
                    }
                }
            }

            function changeToSlide(targetIndex, resetProgress) {
                var slides = getVisibleSlides();
                if (slides.length <= 1) return;
                if (transitioning) return;

                var nextIndex = targetIndex;
                if (nextIndex >= slides.length) nextIndex = 0;
                else if (nextIndex < 0) nextIndex = slides.length - 1;

                var currentIndex = getCurrentIndex(slides);
                if (nextIndex === currentIndex) return;

                // 目标图可能还躺在 <template> 里，先实例化再切
                materialize(slides[nextIndex], false);
                materializeAhead(slides, nextIndex);

                // 直接切换（CSS 处理过渡动画）
                applySlideChange(slides, nextIndex);

                if (resetProgress !== false && appState.isPlaying) {
                    startAutoPlay();
                }
            }

            var appState = {
                isPlaying: false,
                autoPlayTimer: null,
                touchStartX: 0,
                touchEndX: 0
            };

            function startAutoPlay() {
                stopAutoPlay();
                if (!isCarouselEnabled()) return;
                if (!isBannerWallpaperMode()) return;

                appState.isPlaying = true;
                appState.autoPlayTimer = setTimeout(function advance() {
                    if (!appState.isPlaying) return;
                    var slides = getVisibleSlides();
                    var currentIdx = getCurrentIndex(slides);
                    changeToSlide(currentIdx + 1, false);
                    appState.autoPlayTimer = setTimeout(advance, interval);
                }, interval);
            }

            function stopAutoPlay() {
                appState.isPlaying = false;
                if (appState.autoPlayTimer) {
                    clearTimeout(appState.autoPlayTimer);
                    appState.autoPlayTimer = null;
                }
            }

            // 键盘控制
            document.addEventListener('keydown', function(e) {
                if (!isBannerWallpaperMode() || !isCarouselEnabled()) return;
                if (e.key === 'ArrowRight') {
                    var slides = getVisibleSlides();
                    changeToSlide(getCurrentIndex(slides) + 1);
                } else if (e.key === 'ArrowLeft') {
                    var slides2 = getVisibleSlides();
                    changeToSlide(getCurrentIndex(slides2) - 1);
                } else if (e.key === ' ') {
                    e.preventDefault();
                    appState.isPlaying ? stopAutoPlay() : startAutoPlay();
                }
            });

            // 触屏滑动
            document.addEventListener('touchstart', function(e) {
                appState.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            document.addEventListener('touchend', function(e) {
                appState.touchEndX = e.changedTouches[0].screenX;
                var diff = appState.touchEndX - appState.touchStartX;
                if (Math.abs(diff) > 50) {
                    var slides = getVisibleSlides();
                    if (diff > 0) changeToSlide(getCurrentIndex(slides) - 1);
                    else changeToSlide(getCurrentIndex(slides) + 1);
                }
            }, { passive: true });

            // 事件监听
            window.addEventListener('bannerCarouselChange', function(e) {
                e.detail && e.detail.enabled ? startAutoPlay() : stopAutoPlay();
            });
            window.addEventListener('wallpaperModeChange', function(e) {
                if (e.detail && (e.detail.mode === 'banner' || e.detail.mode === 'fullscreen')) {
                    if (isCarouselEnabled()) startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });

            // 随机首张：只有被抽中的这一张会真的下载，其余仍留在 <template> 里
            var slides = getVisibleSlides();
            var startIdx = slides.length > 1 ? Math.floor(Math.random() * slides.length) : 0;
            var firstSlide = slides[startIdx];
            // .slide-item 自带 1000ms 的 opacity 过渡，首张不该吃它（它是 LCP 元素）。
            // 必须在下面加 active 之前就关掉，否则过渡已经启动了。
            if (firstSlide) firstSlide.style.transition = 'none';
            for (var k = 0; k < slides.length; k++) {
                if (k === startIdx) slides[k].classList.add('active');
                else slides[k].classList.remove('active');
            }
            materialize(firstSlide, true);
            if (firstSlide) {
                // 下一帧再放开，后续轮播切换的交叉淡入照旧。双 rAF 是为了确保
                // opacity:1 已经 flush 成新的 before-change style，恢复时不会倒着跑一遍
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () { firstSlide.style.transition = ''; });
                });
            }

            // 断点跨过 1024px 时，另一侧那组还没有实例化过的 active，需要补上
            if (window.matchMedia) {
                var lgQuery = window.matchMedia('(min-width: 1024px)');
                var onBreakpointChange = function () {
                    var s = getVisibleSlides();
                    if (!s.length) return;
                    var hasActive = false;
                    for (var i = 0; i < s.length; i++) {
                        if (s[i].classList.contains('active')) { hasActive = true; break; }
                    }
                    if (!hasActive) s[0].classList.add('active');
                    var idx = getCurrentIndex(s);
                    materialize(s[idx], false);
                    if (isCarouselEnabled()) materializeAhead(s, idx);
                };
                if (lgQuery.addEventListener) lgQuery.addEventListener('change', onBreakpointChange);
                else if (lgQuery.addListener) lgQuery.addListener(onBreakpointChange);
            }

            // 空闲时预取下一张（轮播关掉时其余图片永远不会显示，一张都不下）
            if (isCarouselEnabled()) {
                var schedulePrefetch = function () {
                    var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 1500); };
                    idle(function () { materializeAhead(getVisibleSlides(), startIdx); });
                };
                if (document.readyState === 'complete') schedulePrefetch();
                else window.addEventListener('load', schedulePrefetch, { once: true });
            }

            // 启动
            if (isCarouselEnabled() && isBannerWallpaperMode()) {
                startAutoPlay();
            }
        })();
    <\/script>`}<!-- 单图模式：只实例化当前断点匹配的那一侧 -->${!hasMultipleImages && renderTemplate`<script data-swup-ignore-script>
        (function initBannerSingle() {
            var container = document.getElementById('banner-images-container');
            if (!container) return;

            function materialize(slot, high) {
                var tpl = slot.querySelector('template');
                if (!tpl) return;
                var frag = tpl.content.cloneNode(true);
                var img = frag.querySelector('img');
                var phFrag = frag.querySelector('.lqip-placeholder');
                if (img && high) {
                    img.setAttribute('fetchpriority', 'high');
                    // 这张是 LCP 元素，不做淡入：图片没下完时 <img> 本来就不画东西，
                    // 那 500ms 过渡只是把已经能看的画面又藏半秒，Chrome 会把 LCP 往后记。
                    img.classList.remove('opacity-0', 'transition-opacity', 'duration-500', 'ease-out');
                    img.style.opacity = '1';
                    // LQIP 占位层盖在 img 上面（z-index:0），它那 0.5s 淡出同样会挡住 LCP
                    if (phFrag) phFrag.style.transition = 'none';
                }
                slot.appendChild(frag);
                tpl.remove();
                // Layout 的全局淡入只扫解析期的图片，克隆进来的要自己接管
                var ph = slot.querySelector('.lqip-placeholder');
                if (!img) return;
                function done() {
                    img.style.opacity = '1';
                    if (ph) ph.classList.add('loaded');
                }
                if (img.complete && img.naturalWidth > 0) done();
                else {
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', function () {
                        if (ph) ph.classList.add('loaded');
                    }, { once: true });
                }
            }

            function sync() {
                var all = container.querySelectorAll('.banner-image-slot');
                var isLg = window.innerWidth >= 1024;
                for (var i = 0; i < all.length; i++) {
                    var el = all[i];
                    if (isLg && el.classList.contains('lg:hidden')) continue;
                    if (!isLg && el.classList.contains('hidden') && !el.classList.contains('lg:hidden')) continue;
                    materialize(el, true);
                }
            }

            sync();

            if (window.matchMedia) {
                var lgQuery = window.matchMedia('(min-width: 1024px)');
                if (lgQuery.addEventListener) lgQuery.addEventListener('change', sync);
                else if (lgQuery.addListener) lgQuery.addListener(sync);
            }
        })();
    <\/script>`}${backgroundWallpaper.playerEnable && typeof backgroundWallpaper.src === "object" && !Array.isArray(backgroundWallpaper.src) && backgroundWallpaper.src.playerUrl && renderTemplate`${renderComponent($$result, "BackgroundPlayer", $$BackgroundPlayer, {
			"playerUrl": backgroundWallpaper.src.playerUrl,
			"playerMode": backgroundWallpaper.common?.playerMode ?? "order"
		})}`}<div id="banner-dim-container" class="absolute inset-0 z-10 pointer-events-none">${showBannerDim && renderTemplate`<div class="banner-dim-overlay absolute inset-0"${addAttribute(`background: rgba(0, 0, 0, ${dimOpacity})`, "style")}></div>`}</div><div id="banner-overlay-container" class="absolute inset-0 z-20 pointer-events-none transition-swup-fade">    <!-- Home page text overlay - 始终渲染以便切换模式时控制显示 -->${homeTextEnable && renderTemplate`<div${addAttribute(`banner-home-text-overlay absolute inset-0 z-20 flex items-center justify-center ${!showHomeText ? "hidden" : ""}`, "class")}><div class="w-4/5 lg:w-3/4 text-center mb-0"><div class="flex flex-col">${backgroundWallpaper.common?.homeText?.title && renderTemplate`<div class="banner-title font-bold text-white mb-2 lg:mb-4 leading-tight"${addAttribute({ "--banner-title-size": backgroundWallpaper.common.homeText.titleSize || "3rem" }, "style")}>${backgroundWallpaper.common.homeText.title}</div>`}${backgroundWallpaper.common?.homeText?.subtitle && renderTemplate`<div id="banner-subtitle" class="banner-subtitle text-white/90 leading-snug"${addAttribute({ fontSize: backgroundWallpaper.common.homeText.subtitleSize || "1.5rem" }, "style")}${addAttribute(JSON.stringify(backgroundWallpaper.common.homeText.subtitle), "data-subtitles")}>${backgroundWallpaper.common.homeText.typewriter?.enable ? renderTemplate`${renderComponent($$result, "TypewriterText", $$TypewriterText, {
			"text": backgroundWallpaper.common.homeText.subtitle,
			"speed": backgroundWallpaper.common.homeText.typewriter.speed,
			"deleteSpeed": backgroundWallpaper.common.homeText.typewriter.deleteSpeed,
			"pauseTime": backgroundWallpaper.common.homeText.typewriter.pauseTime
		})}` : randomSubtitle}</div>`}</div></div></div>`}<script>
        function setRandomSubtitle() {
            const subtitleElement = document.getElementById('banner-subtitle');
            if (!subtitleElement) return;

            const subtitlesData = subtitleElement.dataset.subtitles;
            if (!subtitlesData) return;

            try {
                const subtitles = JSON.parse(subtitlesData);
                // Only randomize if it's an array and typewriter is NOT enabled (check for typewriter class)
                if (Array.isArray(subtitles) && subtitles.length > 0 && !subtitleElement.querySelector('.typewriter')) {
                    // Use a global variable to persist the subtitle across Swup navigations
                    // This variable will be reset on full page reload (F5), meeting the requirement
                    if (!window.fireflyCachedSubtitle) {
                        const randomIndex = Math.floor(Math.random() * subtitles.length);
                        window.fireflyCachedSubtitle = subtitles[randomIndex];
                    }
                    subtitleElement.textContent = window.fireflyCachedSubtitle;
                }
            } catch (e) {
                console.error("Failed to parse subtitles", e);
            }
        }

        // Run on initial load
        setRandomSubtitle();
    <\/script><!-- Non-home non-post page title overlay (desktop only) -->${showBannerPageTitle && renderTemplate`<div class="banner-page-title-overlay absolute inset-0 z-20 hidden lg:flex items-center justify-center pointer-events-none"><div class="w-4/5 lg:w-3/4 text-center mb-0"><div class="banner-page-title font-bold text-white leading-tight inline-flex items-center justify-center gap-3"><span class="banner-page-title-text">${title}</span></div></div></div>`}<!-- Non-home post banner meta overlay (desktop only) -->${showBannerPostMeta && bannerPostMeta && renderTemplate`<div class="banner-post-meta-overlay absolute inset-0 z-20 hidden lg:flex items-center justify-center pointer-events-none"><div class="w-4/5 lg:w-3/4 text-center mb-0"><div class="flex flex-col items-center gap-3"><div class="banner-post-title font-bold text-white leading-tight">${bannerPostMeta.title}</div>${bannerPostInfoMode === "description" && bannerPostMeta.description && renderTemplate`<div class="flex flex-col items-center gap-3"><div class="banner-post-description-divider h-px w-12 bg-white/60"></div><div class="banner-post-description text-left text-white/85"${addAttribute(bannerDescriptionWidth ? `--banner-post-description-width: ${bannerDescriptionWidth}` : void 0, "style")}>${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:format-quote-rounded",
			"class": "banner-post-description-quote banner-post-description-quote-start",
			"aria-hidden": "true"
		})}${bannerPostMeta.description}${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:format-quote-rounded",
			"class": "banner-post-description-quote banner-post-description-quote-end",
			"aria-hidden": "true"
		})}</div></div>`}${bannerPostInfoMode === "meta" && renderTemplate`<div class="banner-post-meta-list flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/90 text-sm md:text-base"><span class="inline-flex items-center gap-1.5">${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:calendar-month-outline-rounded",
			"class": "text-[1.05em]"
		})}<span>${i18n(I18nKey.publishedAt)} ${formatDateToYYYYMMDD(bannerPostMeta.published)}</span></span>${bannerPostMeta.updated && bannerPostMeta.updated.getTime() !== bannerPostMeta.published.getTime() && renderTemplate`<span class="inline-flex items-center gap-1.5">${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:update-rounded",
			"class": "text-[1.05em]"
		})}<span>${i18n(I18nKey.updatedAt)} ${formatDateToYYYYMMDD(bannerPostMeta.updated)}</span></span>`}${typeof bannerPostMeta.words === "number" && renderTemplate`<span class="inline-flex items-center gap-1.5">${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:ink-pen-outline-rounded",
			"class": "text-[1.05em]"
		})}<span>${bannerPostMeta.words} ${i18n(bannerPostMeta.words === 1 ? I18nKey.wordCount : I18nKey.wordsCount)}</span></span>`}${typeof bannerPostMeta.minutes === "number" && renderTemplate`<span class="inline-flex items-center gap-1.5">${renderComponent($$result, "Icon", $$Icon, {
			"is:inline": true,
			"name": "material-symbols:schedule-outline-rounded",
			"class": "text-[1.05em]"
		})}<span>${bannerPostMeta.minutes} ${i18n(bannerPostMeta.minutes === 1 ? I18nKey.minuteCount : I18nKey.minutesCount)} · ${i18n(I18nKey.readTime)}</span></span>`}</div>`}</div></div></div>`}<!-- Fullscreen 模式下显示向下滚动指示器 -->${(isFullscreenMode || isWallpaperSwitchable) && renderTemplate`${renderComponent($$result, "ScrollDownIndicator", $$ScrollDownIndicator, {})}`}</div><!-- Water waves effect - 如果允许切换或任一设备启用则渲染 -->${shouldRenderWaves ? renderTemplate`<div${addAttribute(`waves absolute -bottom-px h-[10vh] max-h-37.5 min-h-12.5 w-full md:h-[15vh]
        ${!wavesEnabledOnMobile ? "hidden" : ""} ${!wavesEnabledOnDesktop ? "md:hidden" : ""} ${wavesEnabledOnDesktop ? "md:block" : ""}`, "class")} id="header-waves" style="transform: translateZ(0);"><svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="geometricPrecision"><defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v48h-352z"></path></defs><g class="parallax"><use xlink:href="#gentle-wave" x="48" y="0" class="opacity-25 fill-(--page-bg)"></use><use xlink:href="#gentle-wave" x="48" y="3" class="opacity-50 fill-(--page-bg)"></use><use xlink:href="#gentle-wave" x="48" y="5" class="opacity-65 fill-(--page-bg)"></use><use xlink:href="#gentle-wave" x="48" y="7" class=" opacity-75 fill-(--page-bg)"></use></g></svg></div>` : null}<!-- Gradient transition - 当水波纹关闭时显示，提供壁纸底部到背景色的平滑过渡 -->${shouldRenderGradient ? renderTemplate`<div${addAttribute(`wallpaper-gradient absolute bottom-0 left-0 w-full pointer-events-none
        ${!gradientEnabledOnMobile ? "hidden" : ""} ${!gradientEnabledOnDesktop ? "md:hidden" : ""} ${gradientEnabledOnDesktop ? "md:block" : ""}`, "class")} id="wallpaper-gradient"${addAttribute(`height: ${gradientHeight}; background: linear-gradient(to bottom, transparent, var(--page-bg));`, "style")}></div>` : null}</div>`}${!(isWallpaperSwitchable || isBannerMode || isFullscreenMode || isOverlayMode) && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div id="banner-overlay-container" class="hidden"></div><div id="banner-dim-container" class="hidden"></div>` })}`}<div${addAttribute(`absolute w-full z-30 pointer-events-none ${mobileNonHomeBannerClass ? "mobile-main-no-banner" : ""} ${!(isBannerMode && isBackgroundEnabled) ? "no-banner-layout" : ""}`, "class")}${addAttribute(isFullscreenMode ? "top: 0;" : `top: ${finalMainPanelTop}`, "style")}><!-- The pointer-events-none here prevent blocking the click event of the TOC --><div class="relative w-full xl:w-[92vw] max-w-(--page-width) mx-auto pointer-events-auto"><div id="main-grid"${addAttribute(`transition duration-700 w-full left-0 right-0 grid ${gridCols} grid-rows-[auto_1fr_auto] lg:grid-rows-[auto] mx-auto gap-4 px-2 md:px-4 ${!sidebarConfig.mobileShowSidebar ? "mobile-no-sidebar" : ""}`, "class")}${addAttribute(sidebarLayoutConfig.enable ? "true" : "false", "data-sidebar-enable")}${addAttribute(hideSidebarOnPostPage ? "true" : "false", "data-grid-hide-sidebar-on-post")}${addAttribute(sidebarLayoutConfig.position, "data-sidebar-position")}${addAttribute(sidebarLayoutConfig.tabletSidebar ?? "left", "data-tablet-sidebar")}${addAttribute(sidebarLayoutConfig.showBothSidebarsOnPostPage ? "true" : "false", "data-show-both-sidebars-on-post")}>${sidebarLayoutConfig.position !== "right" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${sidebarLayoutConfig.enable ? renderTemplate`<div id="left-sidebar-wrapper" class="contents"${addAttribute(hideSidebarOnPostPage ? "true" : "false", "data-hide-sidebar-on-post")} style="contain: layout style paint;">${effectiveHasLeftComponents && renderTemplate`${renderComponent($$result, "SideBar", $$SideBar, {
			"side": effectiveIsBothSidebars ? "left" : void 0,
			"class": sidebarClass,
			"headings": headings,
			"encrypted": encrypted
		})}`}</div>` : renderTemplate`<div id="left-sidebar-wrapper" class="hidden"></div>`}<div id="left-sidebar-dynamic" class="hidden transition-swup-fade"></div>` })}` : renderTemplate`<div id="left-sidebar-dynamic" class="contents transition-swup-fade">${effectiveIsBothSidebars && effectiveHasLeftComponents && renderTemplate`${renderComponent($$result, "SideBar", $$SideBar, {
			"side": "left",
			"class": sidebarClass,
			"headings": headings,
			"encrypted": encrypted
		})}`}</div>`}<div${addAttribute(staticBarClass, "class")}>${shouldRenderCategoryBar && renderTemplate`<div id="category-bar-wrapper">${renderComponent($$result, "CategoryBar", $$CategoryBar, { "currentPostCategory": postCategory })}</div>`}<main id="swup-container" class="transition-main"${addAttribute(postCategory || "", "data-current-post-category")}><div id="grid-class-carrier"${addAttribute(gridCols, "data-grid-class")} class="hidden"></div><h1 class="sr-only">${title}</h1><div id="content-wrapper" class="onload-animation transition-leaving">${renderSlot($$result, $$slots["default"])}</div></main></div>${sidebarLayoutConfig.position === "both" || sidebarLayoutConfig.position === "right" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${sidebarLayoutConfig.enable ? renderTemplate`<div id="right-sidebar-static" class="contents"${addAttribute(hideSidebarOnPostPage ? "true" : "false", "data-hide-sidebar-on-post")}>${(effectiveIsBothSidebars || sidebarLayoutConfig.position === "right") && effectiveHasRightComponents && renderTemplate`${renderComponent($$result, "SideBar", $$SideBar, {
			"side": "right",
			"class": rightSidebarClass,
			"headings": headings,
			"encrypted": encrypted
		})}`}</div>` : renderTemplate`<div id="right-sidebar-static" class="hidden"></div>`}<div id="right-sidebar-dynamic" class="hidden transition-swup-fade"></div>` })}` : renderTemplate`<div id="right-sidebar-dynamic" class="contents transition-swup-fade">${effectiveIsBothSidebars && effectiveHasRightComponents && renderTemplate`${renderComponent($$result, "SideBar", $$SideBar, {
			"side": "right",
			"class": rightSidebarClass,
			"headings": headings,
			"encrypted": encrypted
		})}`}</div>`}${sidebarLayoutConfig.mobileBottomComponents && sidebarLayoutConfig.mobileBottomComponents.length > 0 && renderTemplate`<div id="mobile-bottom-sidebar" class="col-span-1 block md:hidden mt-4">${renderComponent($$result, "SideBar", $$SideBar, {
			"side": "bottom",
			"headings": headings,
			"encrypted": encrypted
		})}</div>`}<div${addAttribute(footerClassName, "class")}>${renderComponent($$result, "Footer", $$Footer, {})}</div></div>${renderComponent($$result, "SpineModel", $$SpineModel, {})}${live2dWidgetConfig.enable && renderTemplate`${renderComponent($$result, "Live2DWidget", $$Live2DWidget, { "config": live2dWidgetConfig })}`}</div></div>${renderComponent($$result, "FloatingControls", $$FloatingControls, {
			"headings": headings,
			"encrypted": encrypted
		})}<script data-swup-ignore-script>
    (function initTouchCodeCopyReveal() {
        var CLASS = 'ff-copy-revealed';

        // 委托到 document，swup 换页后无需重新绑定
        document.addEventListener('click', function (event) {
            // 有 hover 能力的设备走 CSS 的悬停显形逻辑，不需要打标记。
            // 放在处理函数里判断，混合输入设备切换输入方式后也能跟上
            if (window.matchMedia('(hover: hover)').matches) return;

            var target = event.target;
            if (!target || !target.closest) return;

            var frame = target.closest('.expressive-code .frame');

            // 点到别处就收起之前展开的按钮
            document.querySelectorAll('.' + CLASS).forEach(function (revealed) {
                if (revealed !== frame) revealed.classList.remove(CLASS);
            });

            // 点在复制按钮上时说明它已经显形，交给原生逻辑处理即可
            if (frame && !target.closest('.copy')) frame.classList.add(CLASS);
        });
    })();
<\/script>`,
		"head": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"])}`
	})}`;
}, "D:/zhedaotixuanbowebsite/zhedaotixuanbo-website/src/layouts/MainGridLayout.astro", void 0);
//#endregion
export { getApiUrlList as a, processCoverImageSync as c, licenseConfig as d, coverImageConfig as f, fetchMemos as i, shouldAddNoReferrer as l, $$ImageWrapper as n, getImageFormats as o, getLqipProps as r, getImageQuality as s, $$MainGridLayout as t, Icon as u };
