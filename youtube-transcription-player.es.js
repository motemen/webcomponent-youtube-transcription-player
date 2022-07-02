const p$1 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$1();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$4 = /* @__PURE__ */ new WeakMap();
class s$3 {
  constructor(t2, n2, s2) {
    if (this._$cssResult$ = true, s2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = n2;
  }
  get styleSheet() {
    let e2 = this.o;
    const s2 = this.t;
    if (t$2 && e2 === void 0) {
      const t2 = s2 !== void 0 && s2.length === 1;
      t2 && (e2 = n$4.get(s2)), e2 === void 0 && ((this.o = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && n$4.set(s2, e2));
    }
    return e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$3 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", void 0, e$3), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, t2, e$3);
}, i$2 = (e2, n2) => {
  t$2 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$3 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$3 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.h) !== null && i2 !== void 0 || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      e2 !== void 0 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t2 = this.constructor.h) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$ES) !== null && i2 !== void 0 ? i2 : this._$ES = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$2(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Ep(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$2.toAttribute)(i2, s2.type);
      this._$El = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2;
    const r2 = this.constructor, h2 = r2._$Ev.get(t2);
    if (h2 !== void 0 && this._$El !== h2) {
      const t3 = r2.getPropertyOptions(h2), n2 = t3.converter, l2 = (e2 = (s2 = n2 == null ? void 0 : n2.fromAttribute) !== null && s2 !== void 0 ? s2 : typeof n2 == "function" ? n2 : null) !== null && e2 !== void 0 ? e2 : o$2.fromAttribute;
      this._$El = h2, this[h2] = l2(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$3)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$El !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = globalThis.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e$1, n$2 = `<${o$1}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$2 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.M(h()), this.M(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$1 ? i$1.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.2.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$1 = globalThis.litElementPolyfillSupport;
n$1 == null || n$1({ LitElement: s });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.1");
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i2);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t2) {
  return e({ ...t2, state: true });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
function formatTime(t2) {
  const div = (x2, y) => [Math.floor(x2 / y), x2 % y];
  const pad = (x2) => (x2 < 10 ? "0" : "") + x2;
  const [_secs, subsecs] = div(t2, 1);
  const [_mins, secs] = div(_secs, 60);
  const [hours, mins] = div(_mins, 60);
  return `${hours}:${pad(mins)}:${pad(secs)}.${String(subsecs).substring(2, 4).padEnd(2, "0")}`;
}
function decodeTime(s2) {
  const [hours, mins, secs] = s2.split(":").map((x2) => parseFloat(x2));
  return hours * 60 * 60 + mins * 60 + secs;
}
var parser = {};
(function(exports) {
  (function() {
    var defaultCueSettings = {
      direction: "horizontal",
      snapToLines: true,
      linePosition: "auto",
      lineAlign: "start",
      textPosition: "auto",
      positionAlign: "auto",
      size: 100,
      alignment: "center"
    };
    var WebVTTParser2 = function(entities) {
      if (!entities) {
        entities = {
          "&amp": "&",
          "&lt": "<",
          "&gt": ">",
          "&lrm": "\u200E",
          "&rlm": "\u200F",
          "&nbsp": "\xA0"
        };
      }
      this.entities = entities;
      this.parse = function(input, mode) {
        input = input.replace(/\0/g, "\uFFFD");
        var NEWLINE = /\r\n|\r|\n/, startTime = Date.now(), linePos = 0, lines = input.split(NEWLINE), alreadyCollected = false, cues = [], errors = [];
        function err(message, col) {
          errors.push({ message, line: linePos + 1, col });
        }
        var line = lines[linePos], lineLength = line.length, signature = "WEBVTT", bom = 0, signature_length = signature.length;
        if (line[0] === "\uFEFF") {
          bom = 1;
          signature_length += 1;
        }
        if (lineLength < signature_length || line.indexOf(signature) !== 0 + bom || lineLength > signature_length && line[signature_length] !== " " && line[signature_length] !== "	") {
          err('No valid signature. (File needs to start with "WEBVTT".)');
        }
        linePos++;
        while (lines[linePos] != "" && lines[linePos] != void 0) {
          err("No blank line after the signature.");
          if (lines[linePos].indexOf("-->") != -1) {
            alreadyCollected = true;
            break;
          }
          linePos++;
        }
        while (lines[linePos] != void 0) {
          var cue;
          while (!alreadyCollected && lines[linePos] == "") {
            linePos++;
          }
          if (!alreadyCollected && lines[linePos] == void 0)
            break;
          cue = Object.assign({}, defaultCueSettings, {
            id: "",
            startTime: 0,
            endTime: 0,
            pauseOnExit: false,
            direction: "horizontal",
            snapToLines: true,
            linePosition: "auto",
            lineAlign: "start",
            textPosition: "auto",
            positionAlign: "auto",
            size: 100,
            alignment: "center",
            text: "",
            tree: null
          });
          var parseTimings = true;
          if (lines[linePos].indexOf("-->") == -1) {
            cue.id = lines[linePos];
            if (/^NOTE($|[ \t])/.test(cue.id)) {
              linePos++;
              while (lines[linePos] != "" && lines[linePos] != void 0) {
                if (lines[linePos].indexOf("-->") != -1)
                  err("Cannot have timestamp in a comment.");
                linePos++;
              }
              continue;
            }
            linePos++;
            if (lines[linePos] == "" || lines[linePos] == void 0) {
              err("Cue identifier cannot be standalone.");
              continue;
            }
            if (lines[linePos].indexOf("-->") == -1) {
              parseTimings = false;
              err("Cue identifier needs to be followed by timestamp.");
              continue;
            }
          }
          alreadyCollected = false;
          var timings = new WebVTTCueTimingsAndSettingsParser(lines[linePos], err);
          var previousCueStart = 0;
          if (cues.length > 0) {
            previousCueStart = cues[cues.length - 1].startTime;
          }
          if (parseTimings && !timings.parse(cue, previousCueStart)) {
            cue = null;
            linePos++;
            while (lines[linePos] != "" && lines[linePos] != void 0) {
              if (lines[linePos].indexOf("-->") != -1) {
                alreadyCollected = true;
                break;
              }
              linePos++;
            }
            continue;
          }
          linePos++;
          while (lines[linePos] != "" && lines[linePos] != void 0) {
            if (lines[linePos].indexOf("-->") != -1) {
              err("Blank line missing before cue.");
              alreadyCollected = true;
              break;
            }
            if (cue.text != "")
              cue.text += "\n";
            cue.text += lines[linePos];
            linePos++;
          }
          var cuetextparser = new WebVTTCueTextParser(cue.text, err, mode, this.entities);
          cue.tree = cuetextparser.parse(cue.startTime, cue.endTime);
          cues.push(cue);
        }
        cues.sort(function(a2, b2) {
          if (a2.startTime < b2.startTime)
            return -1;
          if (a2.startTime > b2.startTime)
            return 1;
          if (a2.endTime > b2.endTime)
            return -1;
          if (a2.endTime < b2.endTime)
            return 1;
          return 0;
        });
        return { cues, errors, time: Date.now() - startTime };
      };
    };
    var WebVTTCueTimingsAndSettingsParser = function(line, errorHandler) {
      var SPACE = /[\u0020\t\f]/, NOSPACE = /[^\u0020\t\f]/, line = line, pos = 0, err = function(message) {
        errorHandler(message, pos + 1);
      };
      function skip(pattern) {
        while (line[pos] != void 0 && pattern.test(line[pos])) {
          pos++;
        }
      }
      function collect(pattern) {
        var str = "";
        while (line[pos] != void 0 && pattern.test(line[pos])) {
          str += line[pos];
          pos++;
        }
        return str;
      }
      function timestamp() {
        var units = "minutes", val1, val2, val3, val4;
        if (line[pos] == void 0) {
          err("No timestamp found.");
          return;
        }
        if (!/\d/.test(line[pos])) {
          err("Timestamp must start with a character in the range 0-9.");
          return;
        }
        val1 = collect(/\d/);
        if (val1.length > 2 || parseInt(val1, 10) > 59) {
          units = "hours";
        }
        if (line[pos] != ":") {
          err("No time unit separator found.");
          return;
        }
        pos++;
        val2 = collect(/\d/);
        if (val2.length != 2) {
          err("Must be exactly two digits.");
          return;
        }
        if (units == "hours" || line[pos] == ":") {
          if (line[pos] != ":") {
            err("No seconds found or minutes is greater than 59.");
            return;
          }
          pos++;
          val3 = collect(/\d/);
          if (val3.length != 2) {
            err("Must be exactly two digits.");
            return;
          }
        } else {
          if (val1.length != 2) {
            err("Must be exactly two digits.");
            return;
          }
          val3 = val2;
          val2 = val1;
          val1 = "0";
        }
        if (line[pos] != ".") {
          err('No decimal separator (".") found.');
          return;
        }
        pos++;
        val4 = collect(/\d/);
        if (val4.length != 3) {
          err("Milliseconds must be given in three digits.");
          return;
        }
        if (parseInt(val2, 10) > 59) {
          err("You cannot have more than 59 minutes.");
          return;
        }
        if (parseInt(val3, 10) > 59) {
          err("You cannot have more than 59 seconds.");
          return;
        }
        return parseInt(val1, 10) * 60 * 60 + parseInt(val2, 10) * 60 + parseInt(val3, 10) + parseInt(val4, 10) / 1e3;
      }
      function parseSettings(input, cue) {
        var settings = input.split(SPACE), seen = [];
        for (var i2 = 0; i2 < settings.length; i2++) {
          if (settings[i2] == "")
            continue;
          var index = settings[i2].indexOf(":"), setting = settings[i2].slice(0, index), value = settings[i2].slice(index + 1);
          if (seen.indexOf(setting) != -1) {
            err("Duplicate setting.");
          }
          seen.push(setting);
          if (value == "") {
            err("No value for setting defined.");
            return;
          }
          if (setting == "vertical") {
            if (value != "rl" && value != "lr") {
              err("Writing direction can only be set to 'rl' or 'rl'.");
              continue;
            }
            cue.direction = value;
          } else if (setting == "line") {
            if (/,/.test(value)) {
              var comp = value.split(",");
              value = comp[0];
              var lineAlign = comp[1];
            }
            if (!/^[-\d](\d*)(\.\d+)?%?$/.test(value)) {
              err("Line position takes a number or percentage.");
              continue;
            }
            if (value.indexOf("-", 1) != -1) {
              err("Line position can only have '-' at the start.");
              continue;
            }
            if (value.indexOf("%") != -1 && value.indexOf("%") != value.length - 1) {
              err("Line position can only have '%' at the end.");
              continue;
            }
            if (value[0] == "-" && value[value.length - 1] == "%") {
              err("Line position cannot be a negative percentage.");
              continue;
            }
            var numVal = value;
            var isPercent = false;
            if (value[value.length - 1] == "%") {
              isPercent = true;
              numVal = value.slice(0, value.length - 1);
              if (parseInt(value, 10) > 100) {
                err("Line position cannot be >100%.");
                continue;
              }
            }
            if (numVal === "" || isNaN(numVal) || !isFinite(numVal)) {
              err("Line position needs to be a number");
              continue;
            }
            if (lineAlign !== void 0) {
              if (!["start", "center", "end"].includes(lineAlign)) {
                err("Line alignment needs to be one of start, center or end");
                continue;
              }
              cue.lineAlign = lineAlign;
            }
            cue.snapToLines = !isPercent;
            cue.linePosition = parseFloat(numVal);
            if (parseFloat(numVal).toString() !== numVal) {
              cue.nonSerializable = true;
            }
          } else if (setting == "position") {
            if (/,/.test(value)) {
              var comp = value.split(",");
              value = comp[0];
              var positionAlign = comp[1];
            }
            if (value[value.length - 1] != "%") {
              err("Text position must be a percentage.");
              continue;
            }
            if (parseInt(value, 10) > 100 || parseInt(value, 10) < 0) {
              err("Text position needs to be between 0 and 100%.");
              continue;
            }
            numVal = value.slice(0, value.length - 1);
            if (numVal === "" || isNaN(numVal) || !isFinite(numVal)) {
              err("Line position needs to be a number");
              continue;
            }
            if (positionAlign !== void 0) {
              if (!["line-left", "center", "line-right"].includes(positionAlign)) {
                err("Position alignment needs to be one of line-left, center or line-right");
                continue;
              }
              cue.positionAlign = positionAlign;
            }
            cue.textPosition = parseFloat(numVal);
          } else if (setting == "size") {
            if (value[value.length - 1] != "%") {
              err("Size must be a percentage.");
              continue;
            }
            if (parseInt(value, 10) > 100) {
              err("Size cannot be >100%.");
              continue;
            }
            var size = value.slice(0, value.length - 1);
            if (size === void 0 || size === "" || isNaN(size)) {
              err("Size needs to be a number");
              size = 100;
              continue;
            } else {
              size = parseFloat(size);
              if (size < 0 || size > 100) {
                err("Size needs to be between 0 and 100%.");
                continue;
              }
            }
            cue.size = size;
          } else if (setting == "align") {
            var alignValues = ["start", "center", "end", "left", "right"];
            if (alignValues.indexOf(value) == -1) {
              err("Alignment can only be set to one of " + alignValues.join(", ") + ".");
              continue;
            }
            cue.alignment = value;
          } else {
            err("Invalid setting.");
          }
        }
      }
      this.parse = function(cue, previousCueStart) {
        skip(SPACE);
        cue.startTime = timestamp();
        if (cue.startTime == void 0) {
          return;
        }
        if (cue.startTime < previousCueStart) {
          err("Start timestamp is not greater than or equal to start timestamp of previous cue.");
        }
        if (NOSPACE.test(line[pos])) {
          err("Timestamp not separated from '-->' by whitespace.");
        }
        skip(SPACE);
        if (line[pos] != "-") {
          err("No valid timestamp separator found.");
          return;
        }
        pos++;
        if (line[pos] != "-") {
          err("No valid timestamp separator found.");
          return;
        }
        pos++;
        if (line[pos] != ">") {
          err("No valid timestamp separator found.");
          return;
        }
        pos++;
        if (NOSPACE.test(line[pos])) {
          err("'-->' not separated from timestamp by whitespace.");
        }
        skip(SPACE);
        cue.endTime = timestamp();
        if (cue.endTime == void 0) {
          return;
        }
        if (cue.endTime <= cue.startTime) {
          err("End timestamp is not greater than start timestamp.");
        }
        if (NOSPACE.test(line[pos]))
          ;
        skip(SPACE);
        parseSettings(line.substring(pos), cue);
        return true;
      };
      this.parseTimestamp = function() {
        var ts = timestamp();
        if (line[pos] != void 0) {
          err("Timestamp must not have trailing characters.");
          return;
        }
        return ts;
      };
    };
    var WebVTTCueTextParser = function(line, errorHandler, mode, entities) {
      this.entities = entities;
      var self = this;
      var line = line, pos = 0, err = function(message) {
        if (mode == "metadata")
          return;
        errorHandler(message, pos + 1);
      };
      this.parse = function(cueStart, cueEnd) {
        function removeCycles(tree) {
          const cyclelessTree = { ...tree };
          if (tree.children) {
            cyclelessTree.children = tree.children.map(removeCycles);
          }
          if (cyclelessTree.parent) {
            delete cyclelessTree.parent;
          }
          return cyclelessTree;
        }
        var result = { children: [] }, current = result, timestamps = [];
        function attach(token2) {
          current.children.push({ type: "object", name: token2[1], classes: token2[2], children: [], parent: current });
          current = current.children[current.children.length - 1];
        }
        function inScope(name2) {
          var node = current;
          while (node) {
            if (node.name == name2)
              return true;
            node = node.parent;
          }
          return;
        }
        while (line[pos] != void 0) {
          var token = nextToken();
          if (token[0] == "text") {
            current.children.push({ type: "text", value: token[1], parent: current });
          } else if (token[0] == "start tag") {
            if (mode == "chapters")
              err("Start tags not allowed in chapter title text.");
            var name = token[1];
            if (name != "v" && name != "lang" && token[3] != "") {
              err("Only <v> and <lang> can have an annotation.");
            }
            if (name == "c" || name == "i" || name == "b" || name == "u" || name == "ruby") {
              attach(token);
            } else if (name == "rt" && current.name == "ruby") {
              attach(token);
            } else if (name == "v") {
              if (inScope("v")) {
                err("<v> cannot be nested inside itself.");
              }
              attach(token);
              current.value = token[3];
              if (!token[3]) {
                err("<v> requires an annotation.");
              }
            } else if (name == "lang") {
              attach(token);
              current.value = token[3];
            } else {
              err("Incorrect start tag.");
            }
          } else if (token[0] == "end tag") {
            if (mode == "chapters")
              err("End tags not allowed in chapter title text.");
            if (token[1] == current.name) {
              current = current.parent;
            } else if (token[1] == "ruby" && current.name == "rt") {
              current = current.parent.parent;
            } else {
              err("Incorrect end tag.");
            }
          } else if (token[0] == "timestamp") {
            if (mode == "chapters")
              err("Timestamp not allowed in chapter title text.");
            var timings = new WebVTTCueTimingsAndSettingsParser(token[1], err), timestamp = timings.parseTimestamp();
            if (timestamp != void 0) {
              if (timestamp <= cueStart || timestamp >= cueEnd) {
                err("Timestamp must be between start timestamp and end timestamp.");
              }
              if (timestamps.length > 0 && timestamps[timestamps.length - 1] >= timestamp) {
                err("Timestamp must be greater than any previous timestamp.");
              }
              current.children.push({ type: "timestamp", value: timestamp, parent: current });
              timestamps.push(timestamp);
            }
          }
        }
        while (current.parent) {
          if (current.name != "v") {
            err("Required end tag missing.");
          }
          current = current.parent;
        }
        return removeCycles(result);
      };
      function nextToken() {
        var state = "data", result = "", buffer = "", classes = [];
        while (line[pos - 1] != void 0 || pos == 0) {
          var c2 = line[pos];
          if (state == "data") {
            if (c2 == "&") {
              buffer = c2;
              state = "escape";
            } else if (c2 == "<" && result == "") {
              state = "tag";
            } else if (c2 == "<" || c2 == void 0) {
              return ["text", result];
            } else {
              result += c2;
            }
          } else if (state == "escape") {
            if (c2 == "<" || c2 == void 0) {
              err("Incorrect escape.");
              let m2;
              if (m2 = buffer.match(/^&#([0-9]+)$/)) {
                result += String.fromCharCode(m2[1]);
              } else {
                if (self.entities[buffer]) {
                  result += self.entities[buffer];
                } else {
                  result += buffer;
                }
              }
              return ["text", result];
            } else if (c2 == "&") {
              err("Incorrect escape.");
              result += buffer;
              buffer = c2;
            } else if (/[a-z#0-9]/i.test(c2)) {
              buffer += c2;
            } else if (c2 == ";") {
              let m2;
              if (m2 = buffer.match(/^&#(x?[0-9]+)$/)) {
                result += String.fromCharCode("0" + m2[1]);
              } else if (self.entities[buffer + c2]) {
                result += self.entities[buffer + c2];
              } else if (m2 = Object.keys(entities).find((n2) => buffer.startsWith(n2))) {
                result += self.entities[m2] + buffer.slice(m2.length) + c2;
              } else {
                err("Incorrect escape.");
                result += buffer + ";";
              }
              state = "data";
            } else {
              err("Incorrect escape.");
              result += buffer + c2;
              state = "data";
            }
          } else if (state == "tag") {
            if (c2 == "	" || c2 == "\n" || c2 == "\f" || c2 == " ") {
              state = "start tag annotation";
            } else if (c2 == ".") {
              state = "start tag class";
            } else if (c2 == "/") {
              state = "end tag";
            } else if (/\d/.test(c2)) {
              result = c2;
              state = "timestamp tag";
            } else if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              return ["start tag", "", [], ""];
            } else {
              result = c2;
              state = "start tag";
            }
          } else if (state == "start tag") {
            if (c2 == "	" || c2 == "\f" || c2 == " ") {
              state = "start tag annotation";
            } else if (c2 == "\n") {
              buffer = c2;
              state = "start tag annotation";
            } else if (c2 == ".") {
              state = "start tag class";
            } else if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              return ["start tag", result, [], ""];
            } else {
              result += c2;
            }
          } else if (state == "start tag class") {
            if (c2 == "	" || c2 == "\f" || c2 == " ") {
              if (buffer) {
                classes.push(buffer);
              }
              buffer = "";
              state = "start tag annotation";
            } else if (c2 == "\n") {
              if (buffer) {
                classes.push(buffer);
              }
              buffer = c2;
              state = "start tag annotation";
            } else if (c2 == ".") {
              if (buffer) {
                classes.push(buffer);
              }
              buffer = "";
            } else if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              if (buffer) {
                classes.push(buffer);
              }
              return ["start tag", result, classes, ""];
            } else {
              buffer += c2;
            }
          } else if (state == "start tag annotation") {
            if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              buffer = buffer.split(/[\u0020\t\f\r\n]+/).filter(function(item) {
                if (item)
                  return true;
              }).join(" ");
              return ["start tag", result, classes, buffer];
            } else {
              buffer += c2;
            }
          } else if (state == "end tag") {
            if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              return ["end tag", result];
            } else {
              result += c2;
            }
          } else if (state == "timestamp tag") {
            if (c2 == ">" || c2 == void 0) {
              if (c2 == ">") {
                pos++;
              }
              return ["timestamp", result];
            } else {
              result += c2;
            }
          } else {
            err("Never happens.");
          }
          pos++;
        }
      }
    };
    var WebVTTSerializer = function() {
      function serializeTimestamp(seconds) {
        const ms = ("" + (seconds - Math.floor(seconds)).toFixed(3) * 1e3).padEnd(3, "0");
        let h2 = 0, m2 = 0, s2 = 0;
        if (seconds >= 3600) {
          h2 = Math.floor(seconds / 3600);
        }
        m2 = Math.floor((seconds - 3600 * h2) / 60);
        s2 = Math.floor(seconds - 3600 * h2 - 60 * m2);
        return (h2 ? h2 + ":" : "") + ("" + m2).padStart(2, "0") + ":" + ("" + s2).padStart(2, "0") + "." + ms;
      }
      function serializeCueSettings(cue) {
        var result = "";
        const nonDefaultSettings = Object.keys(defaultCueSettings).filter((s2) => cue[s2] !== defaultCueSettings[s2]);
        if (nonDefaultSettings.includes("direction")) {
          result += " vertical:" + cue.direction;
        }
        if (nonDefaultSettings.includes("alignment")) {
          result += " align:" + cue.alignment;
        }
        if (nonDefaultSettings.includes("size")) {
          result += " size:" + cue.size + "%";
        }
        if (nonDefaultSettings.includes("lineAlign") || nonDefaultSettings.includes("linePosition")) {
          result += " line:" + cue.linePosition + (cue.snapToLines ? "" : "%") + (cue.lineAlign && cue.lineAlign != defaultCueSettings.lineAlign ? "," + cue.lineAlign : "");
        }
        if (nonDefaultSettings.includes("textPosition") || nonDefaultSettings.includes("positionAlign")) {
          result += " position:" + cue.textPosition + "%" + (cue.positionAlign && cue.positionAlign !== defaultCueSettings.positionAlign ? "," + cue.positionAlign : "");
        }
        return result;
      }
      function serializeTree(tree) {
        var result = "";
        for (var i2 = 0; i2 < tree.length; i2++) {
          var node = tree[i2];
          if (node.type == "text") {
            result += node.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          } else if (node.type == "object") {
            result += "<" + node.name;
            if (node.classes) {
              for (var y = 0; y < node.classes.length; y++) {
                result += "." + node.classes[y];
              }
            }
            if (node.value) {
              result += " " + node.value;
            }
            result += ">";
            if (node.children)
              result += serializeTree(node.children);
            result += "</" + node.name + ">";
          } else if (node.type == "timestamp") {
            result += "<" + serializeTimestamp(node.value) + ">";
          } else {
            result += "<" + node.value + ">";
          }
        }
        return result;
      }
      function serializeCue(cue) {
        return (cue.id ? cue.id + "\n" : "") + serializeTimestamp(cue.startTime) + " --> " + serializeTimestamp(cue.endTime) + serializeCueSettings(cue) + "\n" + serializeTree(cue.tree.children) + "\n\n";
      }
      this.serialize = function(cues) {
        var result = "WEBVTT\n\n";
        for (var i2 = 0; i2 < cues.length; i2++) {
          result += serializeCue(cues[i2]);
        }
        return result;
      };
    };
    function exportify(object) {
      object.WebVTTParser = WebVTTParser2;
      object.WebVTTCueTimingsAndSettingsParser = WebVTTCueTimingsAndSettingsParser;
      object.WebVTTCueTextParser = WebVTTCueTextParser;
      object.WebVTTSerializer = WebVTTSerializer;
    }
    if (typeof window !== "undefined")
      exportify(window);
    exportify(exports);
  })();
})(parser);
const { WebVTTParser } = window;
class YoutubeTranscriptionPlayer extends s {
  constructor() {
    super(...arguments);
    this.videoId = null;
    this.vttSource = null;
    this.vttCues = null;
  }
  _setupPlayer() {
    this.player = new YT.Player(this.shadowRoot.querySelector("iframe"), {});
  }
  async _fetchVTT() {
    if (!this.vttSource) {
      return Promise.reject(new Error("vttSource attribute required"));
    }
    if (this.vttSource.startsWith("#")) {
      const el = document.querySelector(this.vttSource);
      if (el) {
        return Promise.resolve(el.textContent);
      }
      return Promise.reject(new Error(`Could not find element ${this.vttSource}`));
    }
    const response = await fetch(this.vttSource);
    return response.text();
  }
  _consumeVTT(vtt) {
    const parser2 = new WebVTTParser();
    const tree = parser2.parse(vtt);
    const cues = tree.cues.flatMap((cue) => {
      const recurse = (nodes, cb) => {
        nodes.forEach((node) => {
          if (node.type === "text") {
            cb(node.value);
          } else if (node.type === "object") {
            recurse(node.children, cb);
          }
        });
      };
      let text = "";
      recurse(cue.tree.children, (t2) => {
        text += t2;
      });
      const lines = text.split(/\n/).map((line) => line.trim()).filter((line) => line.length > 0);
      return lines.map((line) => ({
        time: cue.startTime,
        text: line
      }));
    });
    const { cues: dedupedCues } = cues.reduce((acc, cue) => {
      if (cue.text === acc.curr) {
        return acc;
      }
      return {
        curr: cue.text,
        cues: [...acc.cues, cue]
      };
    }, {
      curr: "",
      cues: []
    });
    this.vttCues = dedupedCues;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.videoId) {
      console.error("videoId attribute required", this);
    }
    if (!this.vttSource) {
      console.error("vttSource attribute required", this);
    }
    if (typeof YT !== "undefined") {
      YT.ready(() => {
        this._setupPlayer();
      });
    } else {
      const existingReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        existingReady === null || existingReady === void 0 ? void 0 : existingReady();
        this._setupPlayer();
      };
    }
    this._fetchVTT().then((vtt) => {
      this._consumeVTT(vtt);
    });
  }
  _onClick(ev) {
    var _a, _b, _c;
    const cueTime = (_b = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.cueTime;
    if (cueTime) {
      const t2 = decodeTime(cueTime);
      if (t2) {
        (_c = this.player) === null || _c === void 0 ? void 0 : _c.seekTo(t2);
      }
    }
  }
  render() {
    var _a;
    const youtubeIframeScript = document.createElement("script");
    youtubeIframeScript.setAttribute("src", "https://www.youtube.com/iframe_api");
    return $`
      <iframe
        class="player"
        width="560"
        height="315"
        src="${`https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="transcript">
        ${(_a = this.vttCues) === null || _a === void 0 ? void 0 : _a.map((cue) => $`<button
              data-cue-time="${formatTime(cue.time)}"
              part="cue"
              @click=${this._onClick}
            >
              ${cue.text}
            </button>`)}
      </div>
      ${youtubeIframeScript}
    `;
  }
}
YoutubeTranscriptionPlayer.styles = [
  r$2`
      :host {
        display: block;
      }
      [data-cue-time] {
        cursor: pointer;
        background-color: inherit;
        font: inherit;
        border: none;
      }
    `
];
YoutubeTranscriptionPlayer.globalIndex = 0;
__decorate([
  e()
], YoutubeTranscriptionPlayer.prototype, "videoId", void 0);
__decorate([
  e()
], YoutubeTranscriptionPlayer.prototype, "vttSource", void 0);
__decorate([
  t()
], YoutubeTranscriptionPlayer.prototype, "vttCues", void 0);
window.customElements.define("youtube-transcription-player", YoutubeTranscriptionPlayer);
x($`
      <youtube-transcription-player
        id="el1"
        videoId="kwnLtaVqDi4"
        vttSource="https://gist.githubusercontent.com/motemen/5240bb435d3bbc21379aa3de42ddd987/raw/a55d3bdcde104e85e7da4b0e492f4f08cd140c42/kwnLtaVqDi4.vtt">
      </youtube-transcription-player>
      <youtube-transcription-player
        id="el2"
        videoId="kwnLtaVqDi4"
        vttSource="#vtt">
      </youtube-transcription-player>
      `, document.querySelector("#demo"));
