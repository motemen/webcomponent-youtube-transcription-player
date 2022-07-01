function t(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=n.get(this.cssText);return e&&void 0===t&&(n.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var o;const l=window.trustedTypes,a=l?l.emptyScript:"",c=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Eh(i,e);void 0!==n&&(this._$Eu.set(n,i),t.push(n))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),n=window.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=d){var n,s;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const o=(null!==(s=null===(n=i.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==s?s:h.toAttribute)(e,i.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,e){var i,n,s;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),l=t.converter,a=null!==(s=null!==(n=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==n?n:"function"==typeof l?l:null)&&void 0!==s?s:h.fromAttribute;this._$Ei=o,this[o]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:p}),(null!==(o=globalThis.reactiveElementVersions)&&void 0!==o?o:globalThis.reactiveElementVersions=[]).push("1.3.2");const m=globalThis.trustedTypes,v=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,$="?"+g,y=`<${$}>`,_=document,b=(t="")=>_.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,E=/>/g,S=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,C=/'/g,P=/"/g,O=/^(?:script|style|textarea|title)$/i,N=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),k=new WeakMap,M=_.createTreeWalker(_,129,null,!1),H=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":"",o=w;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,a=o.exec(i),null!==a);)h=o.lastIndex,o===w?"!--"===a[1]?o=x:void 0!==a[1]?o=E:void 0!==a[2]?(O.test(a[2])&&(s=RegExp("</"+a[2],"g")),o=S):void 0!==a[3]&&(o=S):o===S?">"===a[0]?(o=null!=s?s:w,c=-1):void 0===a[1]?c=-2:(c=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?S:'"'===a[3]?P:C):o===P||o===C?o=S:o===x||o===E?o=w:(o=S,s=void 0);const u=o===S&&t[e+1].startsWith("/>")?" ":"";r+=o===w?i+y:c>=0?(n.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+g+u):i+g+(-2===c?(n.push(void 0),e):u)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==v?v.createHTML(l):l,n]};class R{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const o=t.length-1,l=this.parts,[a,c]=H(t,e);if(this.el=R.createElement(a,i),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=M.nextNode())&&l.length<o;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const i=c[r++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?W:"@"===e[1]?q:V})}else l.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(O.test(n.tagName)){const t=n.textContent.split(g),e=t.length-1;if(e>0){n.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],b()),M.nextNode(),l.push({type:2,index:++s});n.append(t[e],b())}}}else if(8===n.nodeType)if(n.data===$)l.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(g,t+1));)l.push({type:7,index:s}),t+=g.length-1}s++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function z(t,e,i=t,n){var s,r,o,l;if(e===I)return e;let a=void 0!==n?null===(s=i._$Cl)||void 0===s?void 0:s[n]:i._$Cu;const c=A(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,n)),void 0!==n?(null!==(o=(l=i)._$Cl)&&void 0!==o?o:l._$Cl=[])[n]=a:i._$Cu=a),void 0!==a&&(e=z(t,a._$AS(t,e.values),a,n)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:_).importNode(i,!0);M.currentNode=s;let r=M.nextNode(),o=0,l=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new j(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new F(r,this,t)),this.v.push(e),a=n[++l]}o!==(null==a?void 0:a.index)&&(r=M.nextNode(),o++)}return s}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{constructor(t,e,i,n){var s;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cg=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),A(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==I&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return T(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==U&&A(this._$AH)?this._$AA.nextSibling.data=t:this.k(_.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=R.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(i);else{const t=new L(s,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=k.get(t.strings);return void 0===e&&k.set(t.strings,e=new R(t)),e}S(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new j(this.M(b()),this.M(b()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,i,n,s){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=z(this,t,e,0),r=!A(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const n=t;let o,l;for(t=s[0],o=0;o<s.length-1;o++)l=z(this,n[i+o],e,o),l===I&&(l=this._$AH[o]),r||(r=!A(l)||l!==this._$AH[o]),l===U?t=U:t!==U&&(t+=(null!=l?l:"")+s[o+1]),this._$AH[o]=l}r&&!n&&this.C(t)}C(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends V{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===U?void 0:t}}const D=m?m.emptyScript:"";class W extends V{constructor(){super(...arguments),this.type=4}C(t){t&&t!==U?this.element.setAttribute(this.name,D):this.element.removeAttribute(this.name)}}class q extends V{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=z(this,t,e,0))&&void 0!==i?i:U)===I)return;const n=this._$AH,s=t===U&&n!==U||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==U&&(n===U||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const Y=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,J;null==Y||Y(R,j),(null!==(f=globalThis.litHtmlVersions)&&void 0!==f?f:globalThis.litHtmlVersions=[]).push("2.2.6");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var n,s;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let o=r._$litPart$;if(void 0===o){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=o=new j(e.insertBefore(b(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return I}}Z.finalized=!0,Z._$litElement$=!0,null===(K=globalThis.litElementHydrateSupport)||void 0===K||K.call(globalThis,{LitElement:Z});const G=globalThis.litElementPolyfillSupport;null==G||G({LitElement:Z}),(null!==(J=globalThis.litElementVersions)&&void 0!==J?J:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Q(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt;null===(tt=window.HTMLSlotElement)||void 0===tt||tt.prototype.assignedElements;var et,it,nt={};et=nt,function(){var t={direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center"},e=function(e){e||(e={"&amp":"&","&lt":"<","&gt":">","&lrm":"‎","&rlm":"‏","&nbsp":" "}),this.entities=e,this.parse=function(e,s){e=e.replace(/\0/g,"�");var r=Date.now(),o=0,l=e.split(/\r\n|\r|\n/),a=!1,c=[],h=[];function u(t,e){h.push({message:t,line:o+1,col:e})}var d=l[o],p=d.length,f="WEBVTT",m=0,v=f.length;for("\ufeff"===d[0]&&(m=1,v+=1),(p<v||d.indexOf(f)!==0+m||p>v&&" "!==d[v]&&"\t"!==d[v])&&u('No valid signature. (File needs to start with "WEBVTT".)'),o++;""!=l[o]&&null!=l[o];){if(u("No blank line after the signature."),-1!=l[o].indexOf("--\x3e")){a=!0;break}o++}for(;null!=l[o];){for(var g;!a&&""==l[o];)o++;if(!a&&null==l[o])break;g=Object.assign({},t,{id:"",startTime:0,endTime:0,pauseOnExit:!1,direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center",text:"",tree:null});var $=!0;if(-1==l[o].indexOf("--\x3e")){if(g.id=l[o],/^NOTE($|[ \t])/.test(g.id)){for(o++;""!=l[o]&&null!=l[o];)-1!=l[o].indexOf("--\x3e")&&u("Cannot have timestamp in a comment."),o++;continue}if(""==l[++o]||null==l[o]){u("Cue identifier cannot be standalone.");continue}if(-1==l[o].indexOf("--\x3e")){$=!1,u("Cue identifier needs to be followed by timestamp.");continue}}a=!1;var y=new i(l[o],u),_=0;if(c.length>0&&(_=c[c.length-1].startTime),!$||y.parse(g,_)){for(o++;""!=l[o]&&null!=l[o];){if(-1!=l[o].indexOf("--\x3e")){u("Blank line missing before cue."),a=!0;break}""!=g.text&&(g.text+="\n"),g.text+=l[o],o++}var b=new n(g.text,u,s,this.entities);g.tree=b.parse(g.startTime,g.endTime),c.push(g)}else for(g=null,o++;""!=l[o]&&null!=l[o];){if(-1!=l[o].indexOf("--\x3e")){a=!0;break}o++}}return c.sort((function(t,e){return t.startTime<e.startTime?-1:t.startTime>e.startTime?1:t.endTime>e.endTime?-1:t.endTime<e.endTime?1:0})),{cues:c,errors:h,time:Date.now()-r}}},i=function(t,e){var i=/[\u0020\t\f]/,n=/[^\u0020\t\f]/,s=0,r=function(t){e(t,s+1)};function o(e){for(;null!=t[s]&&e.test(t[s]);)s++}function l(e){for(var i="";null!=t[s]&&e.test(t[s]);)i+=t[s],s++;return i}function a(){var e,i,n,o,a="minutes";if(null!=t[s])if(/\d/.test(t[s]))if(((e=l(/\d/)).length>2||parseInt(e,10)>59)&&(a="hours"),":"==t[s])if(s++,2==(i=l(/\d/)).length){if("hours"==a||":"==t[s]){if(":"!=t[s])return void r("No seconds found or minutes is greater than 59.");if(s++,2!=(n=l(/\d/)).length)return void r("Must be exactly two digits.")}else{if(2!=e.length)return void r("Must be exactly two digits.");n=i,i=e,e="0"}if("."==t[s])if(s++,3==(o=l(/\d/)).length)if(parseInt(i,10)>59)r("You cannot have more than 59 minutes.");else{if(!(parseInt(n,10)>59))return 60*parseInt(e,10)*60+60*parseInt(i,10)+parseInt(n,10)+parseInt(o,10)/1e3;r("You cannot have more than 59 seconds.")}else r("Milliseconds must be given in three digits.");else r('No decimal separator (".") found.')}else r("Must be exactly two digits.");else r("No time unit separator found.");else r("Timestamp must start with a character in the range 0-9.");else r("No timestamp found.")}this.parse=function(e,l){if(o(i),e.startTime=a(),null!=e.startTime)if(e.startTime<l&&r("Start timestamp is not greater than or equal to start timestamp of previous cue."),n.test(t[s])&&r("Timestamp not separated from '--\x3e' by whitespace."),o(i),"-"==t[s])if(s++,"-"==t[s])if(s++,">"==t[s]){if(s++,n.test(t[s])&&r("'--\x3e' not separated from timestamp by whitespace."),o(i),e.endTime=a(),null!=e.endTime)return e.endTime<=e.startTime&&r("End timestamp is not greater than start timestamp."),n.test(t[s]),o(i),function(t,e){for(var n=t.split(i),s=[],o=0;o<n.length;o++)if(""!=n[o]){var l=n[o].indexOf(":"),a=n[o].slice(0,l),c=n[o].slice(l+1);if(-1!=s.indexOf(a)&&r("Duplicate setting."),s.push(a),""==c)return void r("No value for setting defined.");if("vertical"==a){if("rl"!=c&&"lr"!=c){r("Writing direction can only be set to 'rl' or 'rl'.");continue}e.direction=c}else if("line"==a){if(/,/.test(c)){var h=c.split(",");c=h[0];var u=h[1]}if(!/^[-\d](\d*)(\.\d+)?%?$/.test(c)){r("Line position takes a number or percentage.");continue}if(-1!=c.indexOf("-",1)){r("Line position can only have '-' at the start.");continue}if(-1!=c.indexOf("%")&&c.indexOf("%")!=c.length-1){r("Line position can only have '%' at the end.");continue}if("-"==c[0]&&"%"==c[c.length-1]){r("Line position cannot be a negative percentage.");continue}var d=c,p=!1;if("%"==c[c.length-1]&&(p=!0,d=c.slice(0,c.length-1),parseInt(c,10)>100)){r("Line position cannot be >100%.");continue}if(""===d||isNaN(d)||!isFinite(d)){r("Line position needs to be a number");continue}if(void 0!==u){if(!["start","center","end"].includes(u)){r("Line alignment needs to be one of start, center or end");continue}e.lineAlign=u}e.snapToLines=!p,e.linePosition=parseFloat(d),parseFloat(d).toString()!==d&&(e.nonSerializable=!0)}else if("position"==a){if(/,/.test(c)){h=c.split(","),c=h[0];var f=h[1]}if("%"!=c[c.length-1]){r("Text position must be a percentage.");continue}if(parseInt(c,10)>100||parseInt(c,10)<0){r("Text position needs to be between 0 and 100%.");continue}if(""===(d=c.slice(0,c.length-1))||isNaN(d)||!isFinite(d)){r("Line position needs to be a number");continue}if(void 0!==f){if(!["line-left","center","line-right"].includes(f)){r("Position alignment needs to be one of line-left, center or line-right");continue}e.positionAlign=f}e.textPosition=parseFloat(d)}else if("size"==a){if("%"!=c[c.length-1]){r("Size must be a percentage.");continue}if(parseInt(c,10)>100){r("Size cannot be >100%.");continue}var m=c.slice(0,c.length-1);if(void 0===m||""===m||isNaN(m)){r("Size needs to be a number"),m=100;continue}if((m=parseFloat(m))<0||m>100){r("Size needs to be between 0 and 100%.");continue}e.size=m}else if("align"==a){var v=["start","center","end","left","right"];if(-1==v.indexOf(c)){r("Alignment can only be set to one of "+v.join(", ")+".");continue}e.alignment=c}else r("Invalid setting.")}}(t.substring(s),e),!0}else r("No valid timestamp separator found.");else r("No valid timestamp separator found.");else r("No valid timestamp separator found.")},this.parseTimestamp=function(){var e=a();if(null==t[s])return e;r("Timestamp must not have trailing characters.")}},n=function(t,e,n,s){this.entities=s;var r=this,o=0,l=function(t){"metadata"!=n&&e(t,o+1)};function a(){for(var e="data",i="",n="",a=[];null!=t[o-1]||0==o;){var c=t[o];if("data"==e)if("&"==c)n=c,e="escape";else if("<"==c&&""==i)e="tag";else{if("<"==c||null==c)return["text",i];i+=c}else if("escape"==e){if("<"==c||null==c){let t;return l("Incorrect escape."),(t=n.match(/^&#([0-9]+)$/))?i+=String.fromCharCode(t[1]):r.entities[n]?i+=r.entities[n]:i+=n,["text",i]}if("&"==c)l("Incorrect escape."),i+=n,n=c;else if(/[a-z#0-9]/i.test(c))n+=c;else if(";"==c){let t;(t=n.match(/^&#(x?[0-9]+)$/))?i+=String.fromCharCode("0"+t[1]):r.entities[n+c]?i+=r.entities[n+c]:(t=Object.keys(s).find((t=>n.startsWith(t))))?i+=r.entities[t]+n.slice(t.length)+c:(l("Incorrect escape."),i+=n+";"),e="data"}else l("Incorrect escape."),i+=n+c,e="data"}else if("tag"==e)if("\t"==c||"\n"==c||"\f"==c||" "==c)e="start tag annotation";else if("."==c)e="start tag class";else if("/"==c)e="end tag";else if(/\d/.test(c))i=c,e="timestamp tag";else{if(">"==c||null==c)return">"==c&&o++,["start tag","",[],""];i=c,e="start tag"}else if("start tag"==e)if("\t"==c||"\f"==c||" "==c)e="start tag annotation";else if("\n"==c)n=c,e="start tag annotation";else if("."==c)e="start tag class";else{if(">"==c||null==c)return">"==c&&o++,["start tag",i,[],""];i+=c}else if("start tag class"==e)if("\t"==c||"\f"==c||" "==c)n&&a.push(n),n="",e="start tag annotation";else if("\n"==c)n&&a.push(n),n=c,e="start tag annotation";else if("."==c)n&&a.push(n),n="";else{if(">"==c||null==c)return">"==c&&o++,n&&a.push(n),["start tag",i,a,""];n+=c}else if("start tag annotation"==e){if(">"==c||null==c)return">"==c&&o++,["start tag",i,a,n=n.split(/[\u0020\t\f\r\n]+/).filter((function(t){if(t)return!0})).join(" ")];n+=c}else if("end tag"==e){if(">"==c||null==c)return">"==c&&o++,["end tag",i];i+=c}else if("timestamp tag"==e){if(">"==c||null==c)return">"==c&&o++,["timestamp",i];i+=c}else l("Never happens.");o++}}this.parse=function(e,s){var r={children:[]},c=r,h=[];function u(t){c.children.push({type:"object",name:t[1],classes:t[2],children:[],parent:c}),c=c.children[c.children.length-1]}function d(t){for(var e=c;e;){if(e.name==t)return!0;e=e.parent}}for(;null!=t[o];){var p=a();if("text"==p[0])c.children.push({type:"text",value:p[1],parent:c});else if("start tag"==p[0]){"chapters"==n&&l("Start tags not allowed in chapter title text.");var f=p[1];"v"!=f&&"lang"!=f&&""!=p[3]&&l("Only <v> and <lang> can have an annotation."),"c"==f||"i"==f||"b"==f||"u"==f||"ruby"==f||"rt"==f&&"ruby"==c.name?u(p):"v"==f?(d("v")&&l("<v> cannot be nested inside itself."),u(p),c.value=p[3],p[3]||l("<v> requires an annotation.")):"lang"==f?(u(p),c.value=p[3]):l("Incorrect start tag.")}else if("end tag"==p[0])"chapters"==n&&l("End tags not allowed in chapter title text."),p[1]==c.name?c=c.parent:"ruby"==p[1]&&"rt"==c.name?c=c.parent.parent:l("Incorrect end tag.");else if("timestamp"==p[0]){"chapters"==n&&l("Timestamp not allowed in chapter title text.");var m=new i(p[1],l).parseTimestamp();null!=m&&((m<=e||m>=s)&&l("Timestamp must be between start timestamp and end timestamp."),h.length>0&&h[h.length-1]>=m&&l("Timestamp must be greater than any previous timestamp."),c.children.push({type:"timestamp",value:m,parent:c}),h.push(m))}}for(;c.parent;)"v"!=c.name&&l("Required end tag missing."),c=c.parent;return function t(e){const i={...e};return e.children&&(i.children=e.children.map(t)),i.parent&&delete i.parent,i}(r)}},s=function(){function e(t){const e=(""+1e3*(t-Math.floor(t)).toFixed(3)).padEnd(3,"0");let i=0,n=0,s=0;return t>=3600&&(i=Math.floor(t/3600)),n=Math.floor((t-3600*i)/60),s=Math.floor(t-3600*i-60*n),(i?i+":":"")+(""+n).padStart(2,"0")+":"+(""+s).padStart(2,"0")+"."+e}function i(t){for(var n="",s=0;s<t.length;s++){var r=t[s];if("text"==r.type)n+=r.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");else if("object"==r.type){if(n+="<"+r.name,r.classes)for(var o=0;o<r.classes.length;o++)n+="."+r.classes[o];r.value&&(n+=" "+r.value),n+=">",r.children&&(n+=i(r.children)),n+="</"+r.name+">"}else"timestamp"==r.type?n+="<"+e(r.value)+">":n+="<"+r.value+">"}return n}function n(n){return(n.id?n.id+"\n":"")+e(n.startTime)+" --\x3e "+e(n.endTime)+function(e){var i="";const n=Object.keys(t).filter((i=>e[i]!==t[i]));return n.includes("direction")&&(i+=" vertical:"+e.direction),n.includes("alignment")&&(i+=" align:"+e.alignment),n.includes("size")&&(i+=" size:"+e.size+"%"),(n.includes("lineAlign")||n.includes("linePosition"))&&(i+=" line:"+e.linePosition+(e.snapToLines?"":"%")+(e.lineAlign&&e.lineAlign!=t.lineAlign?","+e.lineAlign:"")),(n.includes("textPosition")||n.includes("positionAlign"))&&(i+=" position:"+e.textPosition+"%"+(e.positionAlign&&e.positionAlign!==t.positionAlign?","+e.positionAlign:"")),i}(n)+"\n"+i(n.tree.children)+"\n\n"}this.serialize=function(t){for(var e="WEBVTT\n\n",i=0;i<t.length;i++)e+=n(t[i]);return e}};function r(t){t.WebVTTParser=e,t.WebVTTCueTimingsAndSettingsParser=i,t.WebVTTCueTextParser=n,t.WebVTTSerializer=s}"undefined"!=typeof window&&r(window),r(et)}();let st=it=class extends Z{constructor(){super(),this.videoId=null,this.vttSource=null,this.vttCues=null,this.index=it.globalIndex++}_setupPlayer(){this.player=new YT.Player(this.shadowRoot.getElementById(this.playerElementId),{}),console.debug("_setupPlayer",this.player)}_formatTime(t){const e=(t,e)=>[Math.floor(t/e),t%e],i=t=>(t<10?"0":"")+t,[n,s]=e(t,1),[r,o]=e(n,60),[l,a]=e(r,60);return`${l}:${i(a)}:${i(o)}.${String(s).substring(2,4).padEnd(2,"0")}`}_decodeTime(t){const[e,i,n]=t.split(":").map((t=>parseFloat(t)));return 60*e*60+60*i+n}async _fetchVTT(){if(!this.vttSource)return Promise.reject("vttSource attribute required");if(this.vttSource.startsWith("#")){const t=document.querySelector(this.vttSource);return t?Promise.resolve(t.textContent):Promise.reject(`Could not find element ${this.vttSource}`)}const t=await fetch(this.vttSource);return await t.text()}_consumeVTT(t){const e=(new nt.WebVTTParser).parse(t).cues.flatMap((t=>{const e=(t,i)=>{t.forEach((t=>{"text"===t.type?i(t.value):"object"===t.type&&e(t.children,i)}))};let i="";e(t.tree.children,(t=>{i+=t}));return i.split(/\n/).map((t=>t.trim())).filter((t=>t.length>0)).map((e=>({time:t.startTime,text:e})))})),{cues:i}=e.reduce(((t,e)=>e.text===t.curr?t:{curr:e.text,cues:[...t.cues,e]}),{curr:"",cues:[]});this.vttCues=i}get playerElementId(){return`yt-transcription-player${this.index}`}connectedCallback(){if(super.connectedCallback(),this.videoId||console.error("videoId attribute required",this),this.vttSource||console.error("vttSource attribute required",this),"undefined"!=typeof YT)YT.ready((()=>{this._setupPlayer()}));else{const t=globalThis.onYouTubeIframeAPIReady;globalThis.onYouTubeIframeAPIReady=()=>{t?.(),this._setupPlayer()}}this._fetchVTT().then((t=>{this._consumeVTT(t)}))}_onClick(t){const e=t.target?.dataset?.cueTime;if(e){const t=this._decodeTime(e);t&&this.player?.seekTo(t)}}render(){const t=document.createElement("script");return t.setAttribute("src","https://www.youtube.com/iframe_api"),N`<iframe id="${this.playerElementId}" class="player" width="560" height="315" src="${`https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div class="transcript" @click="${this._onClick}">${this.vttCues?.map((t=>N`<button data-cue-time="${this._formatTime(t.time)}" part="cue" tabindex="0">${t.text}</button>`))}</div>${t}`}};st.styles=[((t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new s(n,i)})`:host{display:block}[data-cue-time]{cursor:pointer;background-color:inherit;font:inherit;border:none}`],st.globalIndex=0,t([X()],st.prototype,"videoId",void 0),t([X()],st.prototype,"vttSource",void 0),t([function(t){return X({...t,state:!0})}()],st.prototype,"vttCues",void 0),st=it=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e))("youtube-transcription-player")],st);export{st as YouTubeTranscriptionPlayer};