import '@astrojs/internal-helpers/path';
import { c as createComponent, s as spreadAttributes, r as renderSlotToString, d as renderAllHeadContent, u as unescapeHTML, A as AstroError, e as ExpectedImageOptions, E as ExpectedImage, f as InvalidImageService, g as createAstro, h as ImageMissingAlt, i as renderTemplate, m as maybeRenderHead, j as addAttribute, k as renderSlot, l as renderComponent, F as Fragment, n as mergeSlots } from './astro-054J9gT-.js';
import 'kleur/colors';
import 'clsx';
import 'cssesc';
/* empty css                       */
/* empty css                        */
/* empty css                        */
/* empty css                          */
/* empty css                        */
/* empty css                             */
/* empty css                             */
/* empty css                        */
import { renderSync, parse, walkSync, ELEMENT_NODE } from 'ultrahtml';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from './astro/assets-service-QVnZzelx.js';
/* empty css                        */
import { getIconData, iconToSVG } from '@iconify/utils';
/* empty css                        */
/* empty css                        */

function has(value) {
  return typeof value === "string";
}
function is(a, b) {
  return a === b;
}
function any(a, b) {
  return has(a) && b.includes(a.toLowerCase());
}
const ElementWeights = {
  META: 10,
  TITLE: 9,
  PRECONNECT: 8,
  ASYNC_SCRIPT: 7,
  IMPORT_STYLES: 6,
  SYNC_SCRIPT: 5,
  SYNC_STYLES: 4,
  PRELOAD: 3,
  DEFER_SCRIPT: 2,
  PREFETCH_PRERENDER: 1,
  OTHER: 0
};
const ElementDetectors = {
  META: isMeta,
  TITLE: isTitle,
  PRECONNECT: isPreconnect,
  DEFER_SCRIPT: isDeferScript,
  ASYNC_SCRIPT: isAsyncScript,
  IMPORT_STYLES: isImportStyles,
  SYNC_SCRIPT: isSyncScript,
  SYNC_STYLES: isSyncStyles,
  PRELOAD: isPreload,
  PREFETCH_PRERENDER: isPrefetchPrerender
};
const META_HTTP_EQUIV_KEYWORDS = [
  "accept-ch",
  "content-security-policy",
  "content-type",
  "default-style",
  "delegate-ch",
  "origin-trial",
  "x-dns-prefetch-control"
];
function isMeta(name, a) {
  if (name === "base")
    return true;
  if (name !== "meta")
    return false;
  return has(a.charset) || is(a.name, "viewport") || any(a["http-equiv"], META_HTTP_EQUIV_KEYWORDS);
}
function isTitle(name) {
  return name === "title";
}
function isPreconnect(name, { rel }) {
  return name === "link" && is(rel, "preconnect");
}
function isAsyncScript(name, { src, async }) {
  return name === "script" && has(src) && has(async);
}
function isImportStyles(name, a, children) {
  const importRe = /@import/;
  if (name === "style") {
    return importRe.test(children);
  }
  return false;
}
function isSyncScript(name, { src, defer, async, type = "" }) {
  if (name !== "script")
    return false;
  return !(has(src) && (has(defer) || has(async) || is(type, "module")) || type.includes("json"));
}
function isSyncStyles(name, { rel }) {
  if (name === "style")
    return true;
  return name === "link" && is(rel, "stylesheet");
}
function isPreload(name, { rel }) {
  return name === "link" && any(rel, ["preload", "modulepreload"]);
}
function isDeferScript(name, { src, defer, async, type }) {
  if (name !== "script")
    return false;
  return has(src) && has(defer) || has(src) && is(type, "module") && !has(async);
}
function isPrefetchPrerender(name, { rel }) {
  return name === "link" && any(rel, ["prefetch", "dns-prefetch", "prerender"]);
}
function getWeight(element) {
  for (const [id, detector] of Object.entries(ElementDetectors)) {
    const children = element.name === "style" && element.children.length > 0 ? renderSync(element) : "";
    if (detector(element.name, element.attributes, children)) {
      return ElementWeights[id];
    }
  }
  return ElementWeights.OTHER;
}

function capo(html) {
  const ast = parse(html);
  try {
    walkSync(ast, (node, parent, index) => {
      if (node.type === ELEMENT_NODE && node.name === "head") {
        if (parent) {
          parent.children.splice(index, 1, getSortedHead(node));
          throw "done";
        }
      }
    });
  } catch (e) {
    if (e !== "done")
      throw e;
  }
  return renderSync(ast);
}
function getSortedHead(head) {
  const weightedChildren = head.children.map((node) => {
    if (node.type === ELEMENT_NODE) {
      const weight = getWeight(node);
      return [weight, node];
    }
  }).filter(Boolean);
  const children = weightedChildren.sort((a, b) => b[0] - a[0]).map(([_, element]) => element);
  return { ...head, children };
}

const Head = createComponent({
  factory: async (result, props, slots) => {
    let head = "";
    head += `<head${spreadAttributes(props)} data-capo>`;
    head += await renderSlotToString(result, slots.default);
    head += renderAllHeadContent(result);
    head += "</head>";
    return unescapeHTML(capo(head));
  }
});

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service-QVnZzelx.js'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$B = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$B, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "D:/project/version/2/Astro/AtheleteZone/node_modules/astro/components/Image.astro", void 0);

const $$Astro$A = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$A, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "D:/project/version/2/Astro/AtheleteZone/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":["astro.build"],"remotePatterns":[]};
					new URL("file:///D:/project/version/2/Astro/AtheleteZone/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const Logo = new Proxy({"src":"./assets/images/logo-nMkJhfTW.png","width":705,"height":227,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/project/version/2/Astro/AtheleteZone/src/assets/logo.png";
							}
							globalThis.astroAsset.referencedImages.add("D:/project/version/2/Astro/AtheleteZone/src/assets/logo.png");
							return target[name];
						}
					});

const img1 = new Proxy({"src":"./assets/images/cooking-3KatrEbQ.jpg","width":1500,"height":1000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/project/version/2/Astro/AtheleteZone/src/assets/cooking.jpg";
							}
							globalThis.astroAsset.referencedImages.add("D:/project/version/2/Astro/AtheleteZone/src/assets/cooking.jpg");
							return target[name];
						}
					});

const food$1 = new Proxy({"src":"./assets/images/food-etog6TdL.jpg","width":1368,"height":912,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/project/version/2/Astro/AtheleteZone/src/assets/food.jpg";
							}
							globalThis.astroAsset.referencedImages.add("D:/project/version/2/Astro/AtheleteZone/src/assets/food.jpg");
							return target[name];
						}
					});

const fitness = new Proxy({"src":"./assets/images/fitness-YpVpIXYt.jpg","width":1500,"height":1000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/project/version/2/Astro/AtheleteZone/src/assets/fitness.jpg";
							}
							globalThis.astroAsset.referencedImages.add("D:/project/version/2/Astro/AtheleteZone/src/assets/fitness.jpg");
							return target[name];
						}
					});

const BeforeLogin = [
  {
    title: "AtheleteZone",
    path: "/"
  },
  {
    title: "About us",
    path: "/About.html"
  },
  {
    title: "blog",
    path: "/blog.html"
  },
  {
    title: "workout",
    path: "/workout.html"
  },
  {
    title: "contact us",
    path: "/contact.html"
  }
];
const AfterLogin = [
  {
    title: "home",
    path: "/home.html"
  },
  {
    title: "add food",
    path: "/food.html"
  },
  {
    title: "add workout",
    path: "/addWorkout.html"
  },
  {
    title: "setting",
    path: "/setting.html"
  },
  {
    title: "blog",
    path: "/blog.html"
  },
  {
    title: "contact us",
    path: "/contact.html"
  }
];
const CardData = [
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "Nutrient",
    body: "Nutrient recommendation for healthy life style",
    href: "/",
    src: img1,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 300,
    duration: 550
  },
  {
    title: "Food plan",
    body: "add your daily food",
    href: "/",
    src: food$1,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 400,
    duration: 600
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 500,
    duration: 650
  },
  {
    title: "Nutrient",
    body: "Nutrient recommendation for healthy life style",
    href: "/",
    src: img1,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 600,
    duration: 700
  },
  {
    title: "Food plan",
    body: "add your daily food",
    href: "/",
    src: food$1,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 700,
    duration: 700
  }
];
const workoutData = [
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  },
  {
    title: "workouts",
    body: "workouts recommendation for healthy life style",
    href: "/",
    src: fitness,
    alt: " Nutrient",
    aria: "how calc the Nutrient food",
    q: 50,
    delay: 200,
    duration: 500
  }
];

const $$Astro$z = createAstro();
const $$Responsive = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$z, $$props, $$slots);
  Astro2.self = $$Responsive;
  const { data, isLogin } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="mobileMenu absolute  left-0 " id="mobileResponsive"> <ul class="NavMobile beforeLogin d-flex  "> ${isLogin && data.map((link) => renderTemplate`<li class="nav-link  py-6 pl-10"> <a${addAttribute(link.path, "href")} class="fs-18 capitalize fw-600 relative "> ${" "} ${link.title}${" "} </a> </li>`)} </ul> </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/header/responsive.astro", void 0);

const $$Astro$y = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$Button;
  const { type, airaLabel, airaExpanded, airaControls, ClassName, clicked } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(type, "type")}${addAttribute(airaLabel, "aria-label")}${addAttribute(airaExpanded, "aria-expanded")}${addAttribute(airaControls, "aria-controls")}${addAttribute(ClassName, "class")}${addAttribute(clicked, "onclick")} data-astro-cid-6ygtcg62> ${renderSlot($$result, $$slots["default"])} </button> `;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/Button.astro", void 0);

const $$Astro$x = createAstro();
const $$UlLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$UlLink;
  const { data, isLogin } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul class="navMenu beforeLogin d-flex align-items-center lg-max-d-none"> ${isLogin && data.map((link) => renderTemplate`<li class="nav-link pl-10 "> <a${addAttribute(link.path, "href")} class="fs-16 capitalize fw-600 relative"> ${" "} ${link.title}${" "} </a> </li>`)} </ul>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/header/UlLink.astro", void 0);

const $$Astro$w = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header> <div class="container"> <nav class="d-flex align-items-center py-6 justify-space-between"> <a href="/" class="logo"> ${renderComponent($$result, "Image", $$Image, { "src": Logo, "alt": `logo for AtheleteZone`, "format": "webp", "quality": 70, "class": `img-cover` })} </a> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "menu", "airaExpanded": "false", "airaControls": "mobileResponsive", "ClassName": "btn icon-nav-base" }, { "default": ($$result2) => renderTemplate` <span></span><span></span><span></span> ` })} ${renderComponent($$result, "UlLink", $$UlLink, { "data": BeforeLogin, "isLogin": true })} ${renderComponent($$result, "Responsive", $$Responsive, { "data": BeforeLogin, "isLogin": true })} </nav> </div> </header> `;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/header.astro", void 0);

const icons = {"local":{"prefix":"local","lastModified":1707458088,"icons":{"arrow-right":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke-dasharray=\"20\" stroke-dashoffset=\"20\" d=\"M3 12h17.5\"><animate fill=\"freeze\" attributeName=\"stroke-dashoffset\" dur=\"0.3s\" values=\"20;0\"/></path><path stroke-dasharray=\"12\" stroke-dashoffset=\"12\" d=\"m21 12-7 7m7-7-7-7\"><animate fill=\"freeze\" attributeName=\"stroke-dashoffset\" begin=\"0.3s\" dur=\"0.2s\" values=\"12;0\"/></path></g>"},"close":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-dasharray=\"16\" stroke-dashoffset=\"16\" stroke-linecap=\"round\" stroke-width=\"2\"><path d=\"m7 7 10 10\"><animate fill=\"freeze\" attributeName=\"stroke-dashoffset\" dur=\"0.4s\" values=\"16;0\"/></path><path d=\"M17 7 7 17\"><animate fill=\"freeze\" attributeName=\"stroke-dashoffset\" begin=\"0.4s\" dur=\"0.4s\" values=\"16;0\"/></path></g>"}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$v = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "D:/project/version/2/Astro/AtheleteZone/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$u = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer> <div class="container d-flex align-items-start justify-space-between"> <div class="footer-ul about-us"> <p class="title fs-24 fw-700 capitalize">about us</p> <p class="dec line-relaxed">
People who track food achieve more than
                 double the average weight loss and 
                 members lose weight 3x faster when 
                 doing it with friends. AtheleteZone combines these to create 
                the most powerful solution for healthy, sustainable weight loss
</p> </div> <!--  --> <div class="footer-ul contact-us "> <p class="title fs-24 fw-700 capitalize">contact us</p> <p class="dec line-relaxed">
The perfect web application for keeping track of your food,
                exercise and weight while on-the-go
</p> </div> <!--  --> <div class="footer-ul news"> <p class="title fs-24 fw-700 capitalize">
newsletter
</p> <p class="dec line-relaxed">
you can trust us we only send offers , not a single spam
</p> <form action="/"> <div class="from-group relative"> <input type="email" placeholder="Email address" class="round-12"> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "airaLabel": "send email", "ClassName": "btn btn-skew sendEmails round-12 px-9  top-0 right--2" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "arrow-right" })} ` })} </div> </form> </div> </div> </footer>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/footer.astro", void 0);

const $$Astro$t = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> ${renderComponent($$result, "Head", Head, {}, { "default": ($$result2) => renderTemplate`<meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>` })}${maybeRenderHead()}<body> <main> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </main> </body></html>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/layouts/Layout.astro", void 0);

const HeroImg = new Proxy({"src":"./assets/images/banner-3-xQWA-WrI.jpg","width":1500,"height":844,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/project/version/2/Astro/AtheleteZone/src/assets/banner-3.jpg";
							}
							globalThis.astroAsset.referencedImages.add("D:/project/version/2/Astro/AtheleteZone/src/assets/banner-3.jpg");
							return target[name];
						}
					});

const $$Astro$s = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead()}<section class="hero relative" ara-label="hero section"> <!-- backdrop img --> <div class="backdrop img absolute top-0 left-0"> ${renderComponent($$result, "Image", $$Image, { "src": HeroImg, "alt": `banner img`, "format": "webp", "quality": 50, "class": `img-cover `, "decoding": "async", "loading": "eager" })} </div> <div class="container"> <div class="detailsHero relative AE_Scrolling fade-in " data-Scrolling-duration="500" data-Scrolling-delay="200"> <h1 class="fs-r-96 fw-600 pb-7">
Reach your goals
<br> <small class="fw-400 capitalize fs-r-48 ">with</small> <span class="fw-700 "> AtheleteZone</span> </h1> <p class="fs-20 line-normal pb-7">
Start setting your goal in a healthy way with our easy-to-use apps, tools, and online support.
</p> <div class="buttonLogin pt-7"> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "go to sign up page", "ClassName": "btn btn-skew round-6 mb-5" }, { "default": ($$result2) => renderTemplate` <a href="/signUp" class="px-9 py-7 fs-18 capitalize">
Get Started
</a> ` })} <small class="d-block">Already a member ?
<a href="/signIn" class="pl-1 fw-600">Sign in</a> </small> </div> </div> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/hero.astro", void 0);

const $$Astro$r = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Card;
  const { href, title, body, src, alt, q, aria, delay } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card round-8 AE_Scrolling  fade-in " data-Scrolling-duration="500"${addAttribute(delay, "data-Scrolling-delay")}> <div class="imgCard round-8 mb-5 relative"> ${renderComponent($$result, "Image", $$Image, { "src": src, "alt": alt, "format": "webp", "quality": q, "class": "round-8", "width": 400, "height": 267 })} </div> <h3 class="fs-24 fw-700 line-normal capitalize pl-6"> ${title} </h3> <p class="fs-16 pl-6 pb-5 line-normal"> ${body} </p> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "read more", "ClassName": "btn btn-skew ml-6 mb-5 round-6" }, { "default": ($$result2) => renderTemplate` <a${addAttribute(href, "href")}${addAttribute(aria, "aria-label")} class="fs-16 fw-400 capitalize px-5 py-4">
read more
</a> ` })} </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/Card.astro", void 0);

const $$Astro$q = createAstro();
const $$MainHeading = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$MainHeading;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="mainHeading text-center"> <h2 class="fs-r-48 capitalize"> ${title} </h2> </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/MainHeading.astro", void 0);

const $$Astro$p = createAstro();
const $$BlogSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$BlogSection;
  const { title, data } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="recommend overflow-hidden "> ${renderComponent($$result, "MainHeading", $$MainHeading, { "title": title })} <div class="container"> <div class="d-grid grid-system"> ${data.map((item) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "href": item.href, "title": item.title, "body": item.body, "src": item.src, "alt": item.alt, "aria": item.aria, "q": item.q, "delay": item.delay })}`)} </div> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/blogSection.astro", void 0);

const $$Astro$o = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "BlogSection", $$BlogSection, { "data": CardData, "title": "Recommend" })}  ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/index.astro", void 0);

const $$file$9 = "D:/project/version/2/Astro/AtheleteZone/src/pages/index.astro";
const $$url$9 = "";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$n = createAstro();
const $$Breadcrumb = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { linkPage, defPage, path, isCrumb } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="breadcrumb d-flex align-items-center justify-center"> <div class="container"> <h1 class="title capitalize pb-5 text-center fs-r-36 fw-700 line-normal"> ${linkPage} ${isCrumb ? null : renderTemplate`<span id="userName"></span>`} </h1> ${isCrumb && renderTemplate`<ul class="d-flex align-items-center justify-center"> <li class="linkPage">${linkPage}</li> <li class="separator"></li> <li class="defPage capitalize"> <a${addAttribute(path, "href")} class=""> ${defPage} </a> </li> </ul>`} </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/breadcrumb.astro", void 0);

const $$Astro$m = createAstro();
const $$AboutSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$AboutSection;
  return renderTemplate`${maybeRenderHead()}<section class="aboutSection"> <div class="container"> ${renderComponent($$result, "MainHeading", $$MainHeading, { "title": "about us" })} <div class="row gap-1"> <div class="col-6-lg col-12-md col-12-sm"> <div class="detailes AE_Scrolling fade-in-up" data-Scrolling-duration="800"${addAttribute(200, "data-Scrolling-delay")}> <small class="fs-20 fw-600">Our Philosophy</small> <h3 class="title fs-r-48 fw-700 capitalize line-normal pb-6">
Knowledge is power
</h3> <p class="line-relaxed fs-18 mb-5">
“Studies show people who keep a food diary are more likely to hit
            their goals. MyFitnessPal simplifies nutrition and calorie tracking,
            provides the data you want, and helps you make sense of it all.
</p> <p class="line-relaxed fs-18">
Healthy eating is a continuous journey of self-discovery. And the
            more you track, the more empowered you’ll become to make healthy
            choices that support your goals.”
</p> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "join me", "ClassName": "btn btn-skew mt-13 round-6" }, { "default": ($$result2) => renderTemplate` <a href="/signUp" class="p-8">Join us now</a> ` })} </div> </div> <!--  --> <div class="col-6-lg col-12-md col-12-sm"> <div class="imgContainer round-6 relative"> ${renderComponent($$result, "Image", $$Image, { "src": img1, "alt": `s`, "quality": 50, "format": "webp", "class": `img-cover round-6 ` })} </div> </div> </div> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/aboutSection.astro", void 0);

const $$Astro$l = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | about us" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "defPage": "home", "linkPage": "About us", "path": "/", "isCrumb": true })} ${renderComponent($$result2, "AboutSection", $$AboutSection, {})}  ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/About.astro", void 0);

const $$file$8 = "D:/project/version/2/Astro/AtheleteZone/src/pages/About.astro";
const $$url$8 = "/About.html";

const About = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$k = createAstro();
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Blog;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | Blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "defPage": "home", "linkPage": "Blog", "path": "/", "isCrumb": true })} ${renderComponent($$result2, "BlogSection", $$BlogSection, { "data": CardData, "title": "blog" })}  ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/blog.astro", void 0);

const $$file$7 = "D:/project/version/2/Astro/AtheleteZone/src/pages/blog.astro";
const $$url$7 = "/blog.html";

const blog = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$j = createAstro();
const $$FormGroup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$FormGroup;
  const { id, place, type, title, MassageClass, parentClass } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`form-group relative ${parentClass ? parentClass : ""}`, "class:list")}> ${renderSlot($$result, $$slots["default"])} ${id && renderTemplate`<div class="relative"> <input class="px-5 round-6"${addAttribute(type, "type")}${addAttribute(id, "id")}${addAttribute(place, "placeholder")}${addAttribute(id, "name")} required> ${title && renderTemplate`<label${addAttribute(id, "for")} class="top-50 left-5"> ${title} </label>`} </div>`} ${id && renderTemplate`<p${addAttribute(`errorMessage pl-2 pt-4 fs-14 ${MassageClass} `, "class")}></p>`} </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/FormGroup.astro", void 0);

const $$Astro$i = createAstro();
const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$ContactForm;
  return renderTemplate`${maybeRenderHead()}<section style="margin-top: 0;"> <div class="container"> <form class="mx-auto round-12 p-12" style="width: 600px;"> <h2 class="text-center fw-700 fs-28 pb-12 line-normal">Stay in touch</h2> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "name", "place": "full name", "title": "full name" })} ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "email", "id": "email", "place": "email address", "title": "email address" })} ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "phone", "place": "enter phone number", "title": "phone number" })} ${renderComponent($$result, "FormGroup", $$FormGroup, {}, { "default": ($$result2) => renderTemplate` <textarea class="px-5 round-6" style="height: 150px;"></textarea> <label class="left-5 top-12"> Enter your message</label> ` })} ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "send", "ClassName": "formLoginId btn btn-skew py-8 round-6 mx-auto d-flex align-items-center justify-center" }, { "default": ($$result2) => renderTemplate`
Send
` })} </form> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/auth/ContactForm.astro", void 0);

const $$Astro$h = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | Contact us" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "defPage": "home", "linkPage": "Contact us", "path": "/", "isCrumb": true })} ${renderComponent($$result2, "ContactForm", $$ContactForm, {})} ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/contact.astro", void 0);

const $$file$6 = "D:/project/version/2/Astro/AtheleteZone/src/pages/contact.astro";
const $$url$6 = "/contact.html";

const contact = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$g = createAstro();
const $$HeaderAfterLogin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$HeaderAfterLogin;
  return renderTemplate`${maybeRenderHead()}<header> <div class="container"> <nav class="d-flex align-items-center py-6 justify-space-between"> <a href="/" class="logo"> ${renderComponent($$result, "Image", $$Image, { "src": Logo, "alt": `logo for AtheleteZone`, "format": "webp", "quality": 70, "class": `img-cover` })} </a> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "menu", "airaExpanded": "false", "airaControls": "mobileResponsive", "ClassName": "btn icon-nav-base" }, { "default": ($$result2) => renderTemplate` <span></span><span></span><span></span> ` })} ${renderComponent($$result, "UlLink", $$UlLink, { "data": AfterLogin, "isLogin": true })} ${renderComponent($$result, "Responsive", $$Responsive, { "data": AfterLogin, "isLogin": true })} </nav> </div> </header> `;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/headerAfterLogin.astro", void 0);

const $$Astro$f = createAstro();
const $$AfterLoginLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$AfterLoginLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> ${renderComponent($$result, "Head", Head, {}, { "default": ($$result2) => renderTemplate`<meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>` })}${maybeRenderHead()}<body> <main> ${renderComponent($$result, "Header", $$HeaderAfterLogin, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </main> </body></html>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/layouts/AfterLoginLayout.astro", void 0);

const $$Astro$e = createAstro();
const $$TextShapes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TextShapes;
  const { dir, htmlType, mainText, subText, className, id, subClass } = Astro2.props;
  return renderTemplate`${htmlType == "div" ? renderTemplate`${maybeRenderHead()}<div${addAttribute(`d-flex ${className ? className : ""}`, "class")}>${dir == "up" ? renderTemplate`<small${addAttribute(subClass ? subClass : "", "class:list")}>${subText}</small>
            <p${addAttribute(id, "id")}>${mainText}</p>` : renderTemplate`<p${addAttribute(id, "id")}>${mainText}</p>
            <small${addAttribute(subClass ? subClass : "", "class:list")}>${subText}</small>`}</div>` : renderTemplate`<li${addAttribute(`d-flex ${className ? className : ""}`, "class")}${addAttribute(id, "id")}>${dir == "up" ? renderTemplate`<small${addAttribute(subClass ? subClass : "", "class:list")}>${subText}</small>
            ${renderComponent($$result, "Fragment", Fragment, {}, mergeSlots({}, id ? { "default": () => renderTemplate`<span>${mainText}</span>` } : { "default": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${mainText}` })}` }))}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, mergeSlots({}, id ? { "default": () => renderTemplate`<span>${mainText}</span>` } : { "default": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${mainText}` })}` }))}
            <small${addAttribute(subClass ? subClass : "", "class:list")}>${subText}</small>`}</li>`}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/textShapes.astro", void 0);

const $$Astro$d = createAstro();
const $$CaloriesCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$CaloriesCard;
  return renderTemplate`${maybeRenderHead()}<div class="card mx-auto round-12"> <h2 class="title fs-18 fw-500 px-7 py-9 round-t-8">Your Daily Summary</h2> <!--  --> <div class="cardDetails py-10 px-14"> <ul class="goal d-flex align-items-center mb-10"> ${renderComponent($$result, "TextShapes", $$TextShapes, { "dir": "up", "htmlType": "li", "mainText": "", "subText": "Calories Remaining", "className": "top fs-48 fw-700", "id": "bmr", "subClass": "fs-12 fw-400" })} <li class="button pt-3"> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "add food", "ClassName": "btn btn-skew round-6" }, { "default": ($$result2) => renderTemplate` <a href="/home/food.html" class="px-12 py-6 fs-14"> add food</a> ` })} ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "add food", "ClassName": "btn btn-skew round-6 ml-5" }, { "default": ($$result2) => renderTemplate` <a href="/home/addWorkout.html" class="px-12 py-6 fs-14"> add workout</a> ` })} </li> </ul> <!--  --> <hr> <ul class="d-flex align-items-center mt-10"> ${renderComponent($$result, "TextShapes", $$TextShapes, { "dir": "down", "htmlType": "li", "mainText": "2025", "subText": "goal", "className": "bottom fs-36 fw-600 mr-10  test", "subClass": "fs-14 fw-500", "id": "bmrUpdate" })} <li class="mr-10 fs-24 mb-8 fw-400 line">|</li> ${renderComponent($$result, "TextShapes", $$TextShapes, { "dir": "down", "htmlType": "li", "mainText": "121", "subText": "food", "className": "bottom fs-36 fw-600 mr-10", "subClass": "fs-14 fw-500" })} <li class="separator mr-10 fs-24 mb-8 fw-700 round-4">-</li> ${renderComponent($$result, "TextShapes", $$TextShapes, { "dir": "down", "htmlType": "li", "mainText": "0", "subText": "EXERCISE", "className": "bottom fs-36 fw-600 mr-10", "subClass": "fs-14 fw-500" })} <li class="separator mr-10 fs-24 mb-8">=</li> ${renderComponent($$result, "TextShapes", $$TextShapes, { "dir": "down", "htmlType": "li", "mainText": "0", "subText": "net", "className": "bottom fs-36 fw-600 mr-10", "subClass": "fs-14 fw-500" })} </ul> <!--  --> </div> </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/CaloriesCard.astro", void 0);

const $$Astro$c = createAstro();
const $$HomeSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$HomeSection;
  return renderTemplate`${maybeRenderHead()}<section class="home relative"> <div class="container"> <div class="details"> ${renderComponent($$result, "CaloriesCard", $$CaloriesCard, {})} </div> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/homeSection.astro", void 0);

const $$Astro$b = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$AfterLoginLayout, { "title": "AtheleteZone | Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "linkPage": "hi,", "isCrumb": false })} ${renderComponent($$result2, "HomeSection", $$HomeSection, {})}   ` })} `;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/home/index.astro", void 0);

const $$file$5 = "D:/project/version/2/Astro/AtheleteZone/src/pages/home/index.astro";
const $$url$5 = "/home.html";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro();
const $$WorkOutSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$WorkOutSection;
  return renderTemplate`${maybeRenderHead()}<section class="workOut"> <div class="contaienr"> <div class="box box py-9 px-10 round-12"> <p class="title text-center fs-24 fw-700 pb-10 capitalize title text-center fs-24 fw-700 pb-10 capitalize">
add workout
</p> <div class="form-group d-flex align-items-center pb-10"> <label for="SearchWorkout" class="fw-600 fs-18 pr-8">Search Workout</label> <input type="text" class="pl-5 round-6" name="SearchWorkout" id="SearchWorkout"> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "work out", "ClassName": "btn btn-skew ml-8 px-9  fs-14 py-3 round-6 " }, { "default": ($$result2) => renderTemplate`
search
` })} </div> <div class="form-group d-flex align-items-center pb-10"> <label for="Period" class="fw-600 fs-18 pr-12">Period</label> <input type="text" class="pl-5 round-6" id="Period" name="Period"> </div> <div class="form-group d-flex align-items-center pb-10"> <label for="" class="fw-600 fs-18 pr-8">Burned Calotise</label> <input type="text" class="pl-5 round-6"> </div> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "work out", "ClassName": "btn btn-skew px-9  fs-14 py-3 round-6 d-flex align-items-center justify-center mx-auto skew-border" }, { "default": ($$result2) => renderTemplate`
add workout
` })} </div> </div> </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/workOutSection.astro", void 0);

const $$Astro$9 = createAstro();
const $$AddWorkout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$AddWorkout;
  return renderTemplate`${renderComponent($$result, "Layout", $$AfterLoginLayout, { "title": "AtheleteZone | Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "linkPage": "addworkout", "defPage": "home", "isCrumb": true, "path": "/home.html" })} ${renderComponent($$result2, "FoodSection", $$WorkOutSection, {})} ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/home/addWorkout.astro", void 0);

const $$file$4 = "D:/project/version/2/Astro/AtheleteZone/src/pages/home/addWorkout.astro";
const $$url$4 = "/home/addWorkout.html";

const addWorkout = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AddWorkout,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro();
const $$AutoList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$AutoList;
  return renderTemplate`${maybeRenderHead()}<ul class="list"></ul>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/autoList.astro", void 0);

const $$Astro$7 = createAstro();
const $$Model = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Model;
  return renderTemplate`${maybeRenderHead()}<div class="model fixed" id="AddFoodModel"> <div class="box py-9 px-10 round-12"> <p class="title text-center fs-24 fw-700 pb-10 capitalize showTitle"></p> <form class="search"> <div class="form-group d-flex align-items-center pb-10"> <label class="fw-600 fs-18 pr-8" for="inputSearch">search food</label> <div class="relative search-box"> <input type="text" placeholder="search food" name="inputSearch" id="inputSearch" class="pl-5 round-6"> ${renderComponent($$result, "AutoList", $$AutoList, {})} </div> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "search food", "ClassName": "btn btn-skew ml-8 px-9  fs-14 py-3 round-6 searching" }, { "default": ($$result2) => renderTemplate`
search
` })} </div> </form> <div class="form-group d-flex align-items-center pb-10"> <label for="quantity" class="fw-600 fs-18 pr-8">quantity</label> <input type="text" placeholder="quantity" id="quantity" name="quantity" class="pl-5 round-6"> </div> <div class="form-group d-flex align-items-center pb-10"> <label class="fw-600 fs-18 pr-8" for="calories">calories</label> <input type="text" placeholder="calories" id="calories" name="calories" class="pl-5 round-6" disabled> </div> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "search food", "ClassName": "add btn btn-skew px-9  fs-14 py-3 round-6 d-flex align-items-center justify-center mx-auto skew-border" }, { "default": ($$result2) => renderTemplate`
add food
` })} ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "close menu", "airaExpanded": true, "airaControls": "AddFoodModel", "ClassName": " btn icon-close" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "close" })} ` })} </div> </div>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/ui/Model.astro", void 0);

const $$Astro$6 = createAstro();
const $$FoodSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$FoodSection;
  return renderTemplate`${maybeRenderHead()}<section class="food relative"> <div class="container"> <table> <thead> <tr> <td class="food-title">Breakfast</td> <td>Calories <br> <span>kcal</span></td> <td>Carbs <br> <span>g</span></td> <td>Fat <br> <span>g</span></td> <td>Protein <br> <span>g</span></td> <td class="delete"></td> </tr> </thead> <tbody class="BreakfastBody"></tbody> <tfoot> <tr> <td class="food-type"> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "add food", "ClassName": "btn btn-skew round-6 addFood skew-border clicked", "airaExpanded": false, "airaControls": "AddFoodModel" }, { "default": ($$result2) => renderTemplate`
add food
` })} </td> <td></td> <td></td> <td></td> <td></td> </tr> </tfoot> </table> <hr> <!--  --> <table> <thead> <tr> <td class="food-title">Lunch</td> <td style="visibility: hidden;">Calories <br> <span>kcal</span></td> <td style="visibility: hidden;">Carbs <br> <span>g</span></td> <td style="visibility: hidden;">Fat <br> <span>g</span></td> <td style="visibility: hidden;">Protein <br> <span>g</span></td> <!-- <td class="delete"></td> --> </tr> </thead> <tbody class="BreakfastBody"></tbody> <tfoot> <tr> <td class="food-type"> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "add food", "ClassName": "btn btn-skew round-6 addFood skew-border clicked", "airaExpanded": false, "airaControls": "AddFoodModel" }, { "default": ($$result2) => renderTemplate`
add food
` })} </td> <td></td> <td></td> <td></td> <td></td> </tr> </tfoot> </table> <!--  --> <hr> <!--  --> <table> <thead> <tr> <td class="food-title">Dinner</td> <td style="visibility: hidden;">Calories <br> <span>kcal</span></td> <td style="visibility: hidden;">Carbs <br> <span>g</span></td> <td style="visibility: hidden;">Fat <br> <span>g</span></td> <td style="visibility: hidden;">Protein <br> <span>g</span></td> <!-- <td class="delete"></td> --> </tr> </thead> <tbody class="BreakfastBody"></tbody> <tfoot> <tr> <td class="food-type"> ${renderComponent($$result, "Button", $$Button, { "type": `button`, "airaLabel": "add food", "ClassName": "btn btn-skew round-6 addFood skew-border clicked", "airaExpanded": false, "airaControls": "AddFoodModel" }, { "default": ($$result2) => renderTemplate`
add food
` })} </td> <td></td> <td></td> <td></td> <td></td> </tr> </tfoot> </table> <!--  --> </div> ${renderComponent($$result, "Model", $$Model, {})} </section>`;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/foodSection.astro", void 0);

const $$Astro$5 = createAstro();
const $$Food = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Food;
  return renderTemplate`${renderComponent($$result, "Layout", $$AfterLoginLayout, { "title": "AtheleteZone | Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "linkPage": "food", "defPage": "home", "isCrumb": true, "path": "/homehtml" })} ${renderComponent($$result2, "FoodSection", $$FoodSection, {})}  ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/home/food.astro", void 0);

const $$file$3 = "D:/project/version/2/Astro/AtheleteZone/src/pages/home/food.astro";
const $$url$3 = "/home/food.html";

const food = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Food,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$SignInFrom = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SignInFrom;
  return renderTemplate`${maybeRenderHead()}<section class="sign-in"> <div class="container"> <form class="mx-auto round-12 p-12" id="loginForm" action="post"> <h1 class="text-center pb-12 fs-r-30">Member Login</h1> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "email", "id": "EmailAddressLogin", "place": "Email Address", "title": "Email Address" })} <!--  --> <!--  --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "password", "id": "passwordLogin", "place": "password", "title": "password" })} <!--  --> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "airaLabel": "sign in", "ClassName": "btn btn-skew formLoginId round-6 d-flex align-items-center justify-center p-8 mx-auto" }, { "default": ($$result2) => renderTemplate`
Log in
` })} </form> <p class="d-flex align-items-center justify-center pt-10 notMember">
Not a member yet?
<a href="signUp" class="pl-2"> Sign up now!</a> </p> </div> </section> `;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/auth/signInFrom.astro", void 0);

const $$Astro$3 = createAstro();
const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SignIn;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | Sign In" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignInForm", $$SignInFrom, {})} ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/signIn.astro", void 0);

const $$file$2 = "D:/project/version/2/Astro/AtheleteZone/src/pages/signIn.astro";
const $$url$2 = "/signIn.html";

const signIn = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SignIn,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$SignUpForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SignUpForm;
  return renderTemplate`${maybeRenderHead()}<section class="sign-in"> <div class="container"> <form class="mx-auto round-12 p-12" id="signUpForm" action="post"> <h1 class="text-center fw-700 fs-20 pb-12 line-normal taps-h1"></h1> <div class="taps"> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "name", "place": "first name", "title": "first name" })} </div> <!--select --> <div class="taps form-group "> <select id="chooseGoalSelect" class="form-select pl-5 round-6"> <option value="loseWeight">Lose weight</option> <option value="maintainWeight">Maintain weight</option> <option value="gainWeight">Gain weight</option> </select> <p class="errorMessage btnMessage pl-2 pt-4 fs-14"></p> </div> <!--  --> <!--  select 2 active--> <div class="taps form-group"> <select id="activeLevel" class="form-select pl-5 round-6"> <option value="NotVeryActive 1.2">Not Very Active</option> <option value="LightlyActive 1.375">Lightly Active</option> <option value="Active 1.55">Active</option> <option value="VeryActive 1.725">Very Active</option> </select> <p class="errorMessage btnMessage pl-2 pt-4 fs-14"></p> </div> <!--  select + input--> <div class="taps form-group"> <select id="selectSex" class="form-select pl-5 round-6"> <option value="Male">Male</option> <option value="Female">Female</option> </select> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "date", "id": "date", "parentClass": "mt-10", "MassageClass": "btnMessage" }, { "default": ($$result2) => renderTemplate` <p class="pb-5 fw-700 fs-20 line-normal born">When were you born?</p> ` })} <!--  --> </div> <!--  --> <!-- info height weight goal --> <div class="taps"> <!-- Height --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "Height", "place": "entery height use cm", "title": "Height" }, { "default": ($$result2) => renderTemplate` <p class="pb-5 fw-700 fs-20 line-normal born">How tall are you?</p> ` })} <!-- weight --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "weigh", "place": "entery weigh use kg", "title": "weigh" }, { "default": ($$result2) => renderTemplate` <p class="pb-5 fw-700 fs-20 line-normal born">How much do you weigh?</p> ` })} <!--goal  weight --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "text", "id": "GoalsWeight", "place": "entery goal weigh use kg", "title": "goal weigh" }, { "default": ($$result2) => renderTemplate` <p class="pb-5 fw-700 fs-20 line-normal born">What's your goal weight?</p> ` })} <!--  --> </div> <!--  --> <!-- weekly goal --> <div class="taps form-group weeklyGoal"> <select id="weeklyGoal" class="form-select pl-5 round-6"></select> </div> <!--  --> <div class="taps"> <!--  --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "Email", "id": "signUpEmail", "place": "Email address", "title": "Email address" })} <!--  --> <!--  --> ${renderComponent($$result, "FormGroup", $$FormGroup, { "type": "password", "id": "signUpPassword", "place": "Create a password", "title": "Create a password" })} <!--  --> </div> <!--  --> <div class="buttonForm d-flex align-items-center"> ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "sign up", "ClassName": "prevBtn btn btn-skew  p-8 round-6 d-flex align-items-center justify-center  mx-auto" }, { "default": ($$result2) => renderTemplate`
Prev
` })} ${renderComponent($$result, "Button", $$Button, { "type": "button", "airaLabel": "sign up", "ClassName": "nextBtn btn btn-skew  p-8 round-6 d-flex align-items-center justify-center  mx-auto " }, { "default": ($$result2) => renderTemplate`
Next
` })} </div> </form> <p class="d-flex align-items-center justify-center pt-10 notMember">
Got an account?
<a href="signIn" class="pl-2"> Sign In</a> </p> </div> </section> `;
}, "D:/project/version/2/Astro/AtheleteZone/src/components/auth/signUpForm.astro", void 0);

const $$Astro$1 = createAstro();
const $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SignUp;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | Sign Up" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignInForm", $$SignUpForm, {})} ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/signUp.astro", void 0);

const $$file$1 = "D:/project/version/2/Astro/AtheleteZone/src/pages/signUp.astro";
const $$url$1 = "/signUp.html";

const signUp = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SignUp,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Workout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Workout;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AtheleteZone | workout" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "defPage": "home", "linkPage": "Workout", "path": "/", "isCrumb": true })} ${renderComponent($$result2, "BlogSection", $$BlogSection, { "data": workoutData, "title": "Workout" })}  ` })}`;
}, "D:/project/version/2/Astro/AtheleteZone/src/pages/workout.astro", void 0);

const $$file = "D:/project/version/2/Astro/AtheleteZone/src/pages/workout.astro";
const $$url = "/workout.html";

const workout = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Workout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { About as A, index as a, blog as b, contact as c, addWorkout as d, signUp as e, food as f, index$1 as i, signIn as s, workout as w };
