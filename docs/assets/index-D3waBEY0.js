(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={transition:{remove(e,t){e.removeChild(t)},sync(){},primeIntros(){},flipCapture(){return null},flipPlay(){}},mkStaging(e){let t=document.createElement(e.tagName),n=e.getAttribute(`data-olum`);return n&&t.setAttribute(`data-olum`,n),t.__olumStagedFor=e,t},moveNode(e,t,n){if(e.moveBefore)try{e.moveBefore(t,n);return}catch{}e.insertBefore(t,n)},materialize(e){let t=e.__olumStagedFor;return t?(this.patchNode(t,e),t):e},nodeKey(e){if(e.nodeType!==1)return null;if(e.__olumKey)return`c:`+e.__olumKey;let t=e.getAttribute(`key`);return t?`k:`+t:null},compatible(e,t){return e.nodeType===t.nodeType&&(e.nodeType!==1||e.tagName===t.tagName&&this.nodeKey(e)===this.nodeKey(t))},syncEvents(e,t){let n=e.__olumEvt||[],r=t.__olumEvt||[];if(!n.length&&!r.length)return;let i=new Set,a=[];for(let t of n){let n=r.findIndex((e,n)=>!i.has(n)&&e.sig===t.sig);n===-1?e.removeEventListener(t.name,t.handler,t.opts):(i.add(n),a.push(t))}r.forEach((t,n)=>{i.has(n)||(e.addEventListener(t.name,t.handler,t.opts),a.push({sig:t.sig,name:t.name,handler:t.handler,opts:t.opts}))}),e.__olumEvt=a.length?a:null},syncAttrs(e,t){let n=e.attributes.length;for(;n--;){let r=e.attributes[n].name;t.hasAttribute(r)||e.removeAttribute(r)}for(n=0;n<t.attributes.length;n++){let r=t.attributes[n];e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value)}},setLiveValue(e,t){if(e.value!==t){if(document.activeElement===e&&e.setSelectionRange){let n=e.selectionStart,r=e.selectionEnd;e.value=t;try{n!==null&&e.setSelectionRange(Math.min(n,t.length),Math.min(r,t.length))}catch{}}else e.value=t}},patchNode(e,t){if(e===t)return;let n=e.nodeType;if(n===3||n===8){e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);return}if(n!==1)return;t.__olumKey&&(e.__olumKey=t.__olumKey);let r=e.tagName,i=r===`INPUT`&&e.getAttribute(`value`)!==t.getAttribute(`value`),a=r===`INPUT`&&e.hasAttribute(`checked`)!==t.hasAttribute(`checked`);if(this.syncAttrs(e,t),this.syncEvents(e,t),this.transition.sync(e,t),r===`INPUT`){i&&this.setLiveValue(e,t.getAttribute(`value`)===null?``:t.getAttribute(`value`)),a&&(e.checked=t.hasAttribute(`checked`));return}if(r===`TEXTAREA`){e.textContent!==t.textContent&&(e.textContent=t.textContent,this.setLiveValue(e,t.textContent));return}if(r===`SELECT`){let n=e=>{let t=e.querySelectorAll(`option[selected]`),n=``;for(let e=0;e<t.length;e++)n+=t[e].value+``;return n},r=e.value,i=n(e);this.patchChildren(e,t);let a=n(t);if(a&&a!==i){let t=e.options.length;for(;t--;)e.options[t].selected=e.options[t].hasAttribute(`selected`)}else if(e.value!==r){let t=e.options.length;for(;t--;)if(e.options[t].value===r){e.value=r;break}}return}this.patchChildren(e,t)},patchChildren(e,t){let n=Array.prototype.slice.call(t.childNodes),r=null;for(let t=e.firstChild;t;t=t.nextSibling){let e=this.nodeKey(t);e&&((r||={})[e]=t)}let i=null;if(r){i={};for(let e=0;e<n.length;e++){let t=this.nodeKey(n[e]);t&&(i[t]=!0)}}let a=e.firstChild;for(let t=0;t<n.length;t++){let o=n[t],s=this.nodeKey(o);if(s&&r&&r[s]){let t=r[s];delete r[s],t===a?a=a.nextSibling:this.moveNode(e,t,a),this.compatible(t,o)?this.patchNode(t,o):e.replaceChild(this.materialize(o),t);continue}if(!a){e.appendChild(this.materialize(o));continue}let c=this.nodeKey(a);if(c&&i&&i[c]&&r&&r[c]){e.insertBefore(this.materialize(o),a);continue}if(this.compatible(a,o)){let e=a;a=a.nextSibling,this.patchNode(e,o);continue}let l=-1;for(let e=t+1;e<n.length&&e<=t+10&&!this.nodeKey(n[e]);e++)if(this.compatible(a,n[e])){l=e;break}if(l!==-1){for(;t<l;)e.insertBefore(this.materialize(n[t]),a),t++;this.patchNode(a,n[t]),a=a.nextSibling;continue}let u=null,d=0;for(let e=a.nextSibling;e&&d<10&&!this.nodeKey(e);e=e.nextSibling,d++)if(this.compatible(e,o)){u=e;break}if(u){for(;a!==u;){let t=a.nextSibling;this.transition.remove(e,a),a=t}this.patchNode(a,o),a=a.nextSibling;continue}let f=this.materialize(o),p=a.nextSibling;e.replaceChild(f,a),a=p}for(;a;){let t=a.nextSibling;this.transition.remove(e,a),a=t}},patch(e,t){try{let n=this.transition.flipCapture(e);return this.patchNode(e,t),this.transition.primeIntros(e),n&&this.transition.flipPlay(n),!0}catch(n){for(console.warn(`olum: patch failed — falling back to full re-render`,n),e.innerHTML=``;t.firstChild;){let n=t.firstChild;t.removeChild(n);try{e.appendChild(this.materialize(n))}catch{e.appendChild(n)}}return!1}}},t=`modulepreload`,n=function(e){return`/`+e},r={},i=function(e,i,a){let o=Promise.resolve();if(i&&i.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function u(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}o=l(i.map(i=>{if(i=n(i,a),i=u(i),i in r)return;r[i]=!0;let o=i.endsWith(`.css`);for(let t=e.length-1;t>=0;t--){let n=e[t];if(n.href===i&&(!o||n.rel===`stylesheet`))return}let s=document.createElement(`link`);if(s.rel=o?`stylesheet`:t,o||(s.as=`script`),s.crossOrigin=``,s.href=i,c&&s.setAttribute(`nonce`,c),document.head.appendChild(s),o)return new Promise((e,t)=>{s.addEventListener(`load`,e),s.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})},a=(function(){var t={version:`0.8.0`,framework:`OlumJS`,app:{},flushUpdates(){},$emit(e,t){this.dispatchEvent(e,t)},dispatchEvent(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))},mkHash(e){var t=0,n,r;if(e.length===0)return t;for(n=0;n<e.length;n++)r=e.charCodeAt(n),t=(t<<5)-t+r,t|=0;return t},mkElm(e,t,n){let r=document.createElement(e);return t&&n&&r.setAttribute(`data-olum`,JSON.stringify({compName:t,compId:n})),r},injectStyle(e,t){if(!t||!t.trim())return;let n=`olum-style-`+e;if(document.getElementById(n))return;let r=document.createElement(`style`);r.id=n,r.textContent=t,document.head.appendChild(r)},proxyHandler(e,n,r){let i=t.mkHash,a=new WeakMap,o=new WeakMap;function s(t){let n={compName:e.__olum__.compName,compId:e.__olum__.compId};n.hash=i(n.compName+n.compId),typeof t==`string`&&(n.key=t),window.olum.$emit(`updateOlumComp`,n)}function c(e){return{get:function(t,n){return d(t[n],e)},set:function(t,n,r){return r=o.get(r)||r,t[n]===r||(t[n]=r,s(e),!0)},deleteProperty:function(t,n){return n in t?(delete t[n],s(e),!0):!0}}}let l=[`set`,`add`,`delete`,`clear`];function u(e){return{get:function(t,n){let r=t[n];return typeof r==`function`?function(...i){let a=r.apply(t,i.map(e=>o.get(e)||e));return l.includes(n)&&s(e),n===`get`?d(a,e):a}:r}}}function d(e,t){if(typeof e!=`object`||!e)return e;let n=e instanceof Map||e instanceof Set;if(!n&&!Array.isArray(e)){let t=Object.getPrototypeOf(e);if(t!==Object.prototype&&t!==null)return e}let r=a.get(e);return r||(r=new Proxy(e,n?u(t):c(t)),a.set(e,r),o.set(r,e)),r}return new Proxy(e,{get:function(e,t){return t===`__olum__`?e[t]:d(e[t],typeof t==`string`?t:void 0)},set:function(e,t,r){if(t===`__olum__`)return!1;r=o.get(r)||r;let i=e[t];return i===r||(e[t]=r,n&&n[t]&&typeof n[t]==`function`&&n[t](i,r),s(typeof t==`string`?t:void 0),!0)},deleteProperty:function(e,t){return t!==`__olum__`&&(delete e[t],s(typeof t==`string`?t:void 0),!0)}})},proxyHandlerForScope(e,t){return new Proxy(e,{get:function(e,n){return t[n]},set:function(e,n,r){return e[n]=r,t[n]=r,!0},deleteProperty:function(e,n){return delete e[n],delete t[n],!0}})},clean(e){let t=String(e).trim();return t===`null`?null:t},esc(e){return e==null?``:e&&e.__olumHtml===!0?e.html:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)},html(e){return{__olumHtml:!0,html:e==null?``:String(e)}},eventsHandler(e,n,r,i){function a(e,t,n){let r=t+``+(n&&n.length?n.join(`.`):``),a=t.split(`|`)[0];t=t.split(`|`).slice(1).join();let o=t.split(`&`).map(e=>{let t=e.split(`=`),n=t[0];return{args:JSON.parse(t.slice(1).join(``)),methodName:n}}),s={once:!1,passive:!1,capture:!1};n&&n.length&&(n.includes(`once`)&&(s.once=!0),n.includes(`passive`)&&(s.passive=!0),n.includes(`capture`)&&(s.capture=!0));let c=e=>{if(s.once&&Array.isArray(e.currentTarget.__olumEvt)){let t=e.currentTarget.__olumEvt.filter(e=>e.handler!==c);e.currentTarget.__olumEvt=t.length?t:null}n&&n.length&&(n.includes(`prevent`)&&e.preventDefault(),n.includes(`stop`)&&e.stopPropagation());function t(){o.forEach(t=>{if(i[t.methodName]){if(t.args.length){let n=t.args.map(t=>t===`$event`?e:t);i[t.methodName](...n)}else i[t.methodName](e)}else console.warn(`olum: can't access the method`)})}if(n&&n.length&&n.includes(`self`)){e.target===e.currentTarget&&t();return}t()};e.addEventListener(a.slice(2),c,s),(e.__olumEvt||=[]).push({sig:r,name:a.slice(2),handler:c,opts:s}),e.removeAttribute(`data-o-event`),e.removeAttribute(`data-o-event-mode`)}n.forEach(e=>{let n=t.clean(e.getAttribute(`data-o-event`)),r=t.clean(e.getAttribute(`data-o-event-mode`)),i=r&&r.trim()!==``?r.split(`.`):[];n&&n.split(`OLUM_EVT_SEP`).forEach(t=>a(e,t,i))})},stylesHandler(e,n,r){function i(e,t,n){let r=``;n.forEach(e=>{let n=t[e];n&&(r+=e+`: `+n+`; `)}),r=r.trim(),r!==``&&e.setAttribute(`style`,r),e.removeAttribute(`data-o-style`)}function a(e,t){let n=JSON.parse(t),r=Object.keys(n);r.length&&i(e,n,r)}n.forEach(e=>{let n=t.clean(e.getAttribute(`data-o-style`));n&&a(e,n)})},handleMarkup(e,t,n,r){n.setAttribute(`data-child-of`,e),n.setAttribute(`data-o-`+t,``);var i=n.querySelectorAll(`*`);return i.forEach(n=>{n.setAttribute(`data-child-of`,e),n.setAttribute(`data-o-`+t,``)}),this.eventsHandler(n,i,e,r),this.stylesHandler(n,i,e),this.transitionHandler(i,r),n},transitionHandler(e,n){let r=e=>e.split(`&`).reduce((e,r)=>{let i=r.indexOf(`=`),a=r.slice(0,i),o=r.slice(i+1);if(a.charAt(0)===`@`){let t=n&&n[o];return t&&((e.events||={})[a.slice(1)]=t),e}if(a===`flip`){let t;try{t=JSON.parse(o)[0]}catch{t=void 0}return e.flip=t||{},e}let s=a.indexOf(`:`),c=a.slice(0,s),l=a.slice(s+1),u=n&&n[l]||t.transitions&&t.transitions[l];if(!u)return console.warn(`olum: unknown transition '`+l+`'`),e;let d;try{d=JSON.parse(o)[0]}catch{d=void 0}return e[c]={fn:u,params:d},e},{});e.forEach(e=>{let n=t.clean(e.getAttribute(`data-o-trans`));if(n){if(e.removeAttribute(`data-o-trans`),!t.transition){t._transWarned||(t._transWarned=!0,console.warn(`olum: <transition> used but the transition module (./transition.js / olum-transition package) is not installed — animations are disabled. npm i olum-transition`));return}e.__olumTrans=r(n),e.__olumTrans.flip!==void 0&&(e.__olumFlip=e.__olumTrans.flip,e.setAttribute(`data-o-flip`,``)),e.__olumBaseStyle??=e.style.cssText,e.__olumTrans.in&&e.setAttribute(`data-o-intro`,``),(typeof requestAnimationFrame==`function`?requestAnimationFrame:e=>setTimeout(e,16))(()=>t.transition.playIntro(e))}})},isObj(e){return typeof e==`object`&&!!e},isFullArr(e){return!!(this.isObj(e)&&Array.isArray(e)&&e.length)},isFullObj(e){return!!(this.isObj(e)&&Array.isArray(Object.keys(e))&&Object.keys(e).length)},props(e){return new Proxy({},{get(t,n){let r=window.olum.app.store[e];if(r)return n===`children`?r.children||``:r.incomingProps?r.incomingProps[n]:void 0},set(e,t){return console.warn(`olum: props are read-only — "`+String(t)+`" was not written. Pass a callback prop to update the parent, or share the value via the global store.`),!0}})},vdom:e,transitions:{},easings:{},transition:null,useTransition(e){this.transition=e,this.vdom.transition=e,Object.assign(this.transitions,e.transitions),Object.assign(this.easings,e.easings)},crossfade(e){if(!this.transition)throw Error(`olum: crossfade is unavailable — the transition module (./transition.js / olum-transition package) is not installed`);return this.transition.crossfade(e)},directOlums(e){return Array.prototype.slice.call(e.querySelectorAll(`olum`)).filter(t=>{let n=t.parentElement&&t.parentElement.closest&&t.parentElement.closest(`olum`);return!n||!e.contains(n)})},buildTree(e,t,n){this.__renderingKey=n;let r=e.__OLUM__.getElm;if(this.__renderingKey=null,!r)return null;r.__olumKey=n;let i=this,a=window.olum.app.registry||(window.olum.app.registry={});function o(e,n,r){e.__OLUM__.components&&Object.assign(a,e.__OLUM__.components);let s=i.directOlums(r),c={};s.forEach(r=>{let s=r.getAttribute(`name`),l=a[s]||e.__OLUM__.components&&e.__OLUM__.components[s];if(!l){console.warn(`olum: couldn't find `+s+` Component while building the tree!`);return}let u=r.getAttribute(`data-o-key`),d;u!==null&&u!==``?d=n+`>`+s+`@`+u:(c[s]=c[s]===void 0?0:c[s]+1,d=n+`>`+s+`#`+c[s]);let f=r.getAttribute(`data-o-props`),p=f?JSON.parse(decodeURIComponent(f)):{},m={},h=r.getAttribute(`data-o-props-src`)||``;h&&h.split(`|`).forEach(e=>{let t=e.split(`:`),n=t[0],r=t[1],i=t[2];n&&r&&i&&(m[n]={kind:r,key:i})});let g=r.getAttribute(`data-o-props-owner`),_=g&&t[g]||e;Object.keys(m).forEach(e=>{let t=m[e];if(t.kind===`method`){let n=_.methodsRef&&_.methodsRef[t.key];typeof n==`function`&&(p[e]=n)}else if(t.kind===`props`&&p[e]===void 0){let n=_.incomingProps&&_.incomingProps[t.key];typeof n==`function`&&(p[e]=n)}});let v=r.innerHTML.trim(),y=t[d];if(y)y.parentCompName=n,y.incomingProps=p,y.incomingPropSources=m,y.children=v;else{t[d]={parentCompName:n,incomingProps:p,incomingPropSources:m,children:v};let e=l(d);Object.assign(t[d],e),y=t[d]}i.__renderingKey=d;let b=y.__OLUM__.getElm;i.__renderingKey=null,b&&(b.__olumKey=d,b.setAttribute(`data-o-if`,r.getAttribute(`if`)?r.getAttribute(`if`):`olum-no-condition`),r.replaceWith(b),o(y,d,b))})}return o(e,n,r),r},getInnerNames(e){let t=[],n=window.olum.app.map;n&&n.find(n=>{n.name==e&&n.children.forEach(e=>t.push(e))});function r(e){let i=t[e];n.forEach(e=>{e.name==i&&e.children.forEach(e=>t.push(e))}),e+1<=t.length&&r(e+1)}return t.length&&r(0),t}};typeof window<`u`&&(window.olum=t);class n{root=null;$(e){return this.root=document.querySelector(e),this}use(e){if(e){let t=typeof e?.name==`function`&&e.name()===`Router`,n=typeof e?.name==`string`&&e.name==="default";if(t)this.useRouter(e);else if(n)this.useComponent(e);else throw Error(`Can't mount, Missing component or router @use()`)}}useRouter(e){window.olum.router={pathname:e.pathname,push:e.push,replace:e.replace,back:e.back,forward:e.forward,go:e.go,extractParams:e.extractParams},e.__proto__.rootElm=this.root,e.render=e=>this.useComponent(e),e.isReady&&e.listen()}useComponent(e){let t=e(),{store:n,rootKey:r}=this.share(t),i=window.olum.buildTree(t,n,r);if(!i)return console.warn(`olum: couldn't build tree!`);if(this.setupListeners(n),this.root.innerHTML=``,this.root.append(i),t.hooks.mounted){let e=t.hooks.mounted,n=e();t.hooks.unMounted=n}t.hooks.isMounted=!0,Object.keys(n).forEach(e=>{if(e===r)return;let t=n[e];if(!t||!t.el)return;let i=t.el.getAttribute(`data-o-if`);if(i&&[`olum-no-condition`,`true`].includes(i)){if(t.hooks.mounted){let e=t.hooks.mounted,n=e();t.hooks.unMounted=n}t.hooks.isMounted=!0}})}setupListeners(e){let t=window.olum.mkHash,n=new Map,r=!1,i=t=>{let n=e[t];if(!n||!n.el||!document.body.contains(n.el))return;let r=Object.keys(e).filter(e=>e!==t),i={};r.forEach(t=>{let n=e[t];n&&(i[t]=n.hooks.isMounted)});let a=window.olum.buildTree(n,e,t);if(!a)return console.warn(`olum: couldn't build tree!`);a!==n.el&&window.olum.vdom.patch(n.el,a),Object.keys(e).filter(e=>e!==t).forEach(t=>{let n=e[t];if(!n)return;let r=document.body.contains(n.el);if(i[t]&&!r){if(n.hooks.unMounted&&!n.hooks.isUnMounted){let e=n.hooks.unMounted;n.hooks.isUnMounted=!0,n.hooks.isMounted=!1,e&&typeof e==`function`&&e()}}else if(!i[t]&&r&&n.hooks.mounted&&!n.hooks.isMounted){let e=n.hooks.mounted;n.hooks.isMounted=!0,n.hooks.isUnMounted=!1;let t=e();n.hooks.unMounted=t}})},a=()=>{if(r=!1,!n.size)return;let e=Array.from(n.keys());n.clear(),e.forEach(t=>{e.some(e=>e!==t&&t.indexOf(e+`>`)===0)||i(t)})};window.olum.flushUpdates=a,window.addEventListener(`updateOlumComp`,i=>{if(i&&i.detail&&i.detail.compName&&i.detail.compId&&i.detail.hash){if(i.detail.hash!==t(i.detail.compName+i.detail.compId))return;let o=e[i.detail.compName];if(!o||!o.el||!document.body.contains(o.el))return;let s=o.__OLUM__&&o.__OLUM__.deps;if(s&&typeof i.detail.key==`string`&&s.indexOf(i.detail.key)===-1)return;n.set(i.detail.compName,!0),r||(r=!0,Promise.resolve().then(a))}})}share(e){let t={},n=e.__OLUM__.compName;return t[n]=e,Object.assign(window.olum.app,{store:t,registry:{}}),{store:t,rootKey:n}}}return n})(),o=e=>e,s=e=>window.olum.crossfade(e);typeof window<`u`&&window.olum&&window.olum.easings,typeof window<`u`&&window.olum&&window.olum.transitions;var c=(e,t)=>window.olum.router.extractParams(e,t),l=e=>window.olum.props(e),u=e=>{if(!window.olum.store)throw Error(`olum: store is unavailable — the store module (./store.js / olum-store package) is not installed`);return window.olum.store(e)};typeof window<`u`&&await i(()=>import(`./store-z-MXxGmh.js`).then(e=>window.olum.store=e.default(window.olum)),[]).catch(()=>{}),typeof window<`u`&&await i(()=>import(`./transition-CAFINo1z.js`).then(e=>window.olum.useTransition(e.default)),[]).catch(()=>{});var d=(e,t=0)=>{let n=window.olum.app&&window.olum.app.store||{},r=Object.keys(n).filter(t=>{let n=t.split(`>`).pop();return n===e||n.split(/[#@]/)[0]===e})[t];if(!r)return console.warn(`olum: scope("`+e+`") — no mounted component matches that name`),null;let i=n[r];return{key:r,el:i.el||null,state:i.stateProps||null,props:i.props||null,methods:i.methods||null}},f=(function(){var e=window,t=`Router [warn]:`;function n(e){return e!=null}function r(e){return typeof e==`object`&&!!e}function i(e){return!!(r(e)&&Array.isArray(e)&&e.length)}String.prototype.cap=function(){return this.toLowerCase().split(` `).map(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}).join(` `)};function a(e,t){n(t)||(t=`log`),t=t==`err`?`error`:t}function o(r){if(!(this instanceof o))throw Error(`can't invoke 'Router' without 'new' keyword`);if(!r)throw Error(t+` Missing config object @Router`);var s=this,c=e.history.pushState,l=[],u=`/`,d=`hash`,f=null,p=!1,m=null,h=null;d=r&&r.mode===`history`&&c?`history`:`hash`,u=r&&r.root?r.root:`/`,f=r&&r.err?v(r.err):null,this.isReady=!1,this.params={},this.name=function(){return`Router`},this.freeze=function(){p=!0},this.unfreeze=function(){p=!1},this.pathname=function(){var e=``;return d===`history`?e=g(decodeURIComponent(location.pathname)):d===`hash`&&(e=g(decodeURIComponent(location.hash))),`/`+e},this.navigate=function(t){s.unfreeze(),t=v(t),d===`history`?(e.history.pushState({},``,t),a(`Pushed to history`),dispatchEvent(m)):d===`hash`&&(location.href=y(t))},this.push=function(e){s.navigate(e)},this.replace=function(t){s.unfreeze(),t=v(t),d===`history`?(e.history.replaceState({},``,t),a(`Replaced history entry`),dispatchEvent(m)):d===`hash`&&location.replace(y(t))},this.back=function(){e.history.back()},this.forward=function(){e.history.forward()},this.go=function(t){e.history.go(t)},this.listen=function(){a(s.__proto__),e.addEventListener(`popstate`,function(){a([`Dispatched Popstate`,l]);var e=s.pathname(),r=`/`+g(u);e=d===`hash`&&u!==`/`?(e=r+e).replace(/\/$/,``):e;var i;s.params={};for(var o=0;o<l.length;o++){var c=l[o];if(e===c.path){i=c;break}if((e===``||e===`/`||e.indexOf(`index.html`)!==-1)&&c.path===r){i=c;break}}if(!n(i)){for(var m=0;m<l.length;m++)if(l[m].path.indexOf(`:`)!==-1){var h=_(l[m].path,e);if(n(h)){s.params=h,i=l[m];break}}}if(a([`$this.params -> `,s.params]),n(i))p||i.cb();else if(n(f)){for(var v,y=0;y<l.length;y++)if(l[y].path===f){v=l[y];break}n(v)?v.cb():console.error(t+` Unmached path @Router`)}else s.rootElm.innerHTML=`Page Not Found!`;a({current:e,route:i})}),dispatchEvent(m)};function g(e){var t=RegExp(`^[#/]{1,}|/$`,`g`);return e=String(e).toLowerCase().trim().replace(t,``),e}function _(e,t){var n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;for(var i={},a=0;a<n.length;a++)if(n[a].charAt(0)===`:`)i[n[a].slice(1)]=r[a];else if(n[a]!==r[a])return null;return i}function v(e){var t=g(u);return e=g(e),e=u===`/`?`/`+e:`/`+t+`/`+e,e===`/`?e:e.replace(/\/$/g,``)}function y(e){var t=location.href.replace(/\#.*/g,``);if(u===`/`)return t+`#`+e;var n=g(u);n=n.replace(/\//g,`\\/`);var r=RegExp(`\\/`+n,`g`),i=e.replace(r,``);return i=`/`+i.replace(/^\//g,``),t+`#`+i}function b(){var e=[].slice.call(document.querySelectorAll(`[to]`));if(i(e))for(var t=0;t<e.length;t++)e[t].nodeName===`A`&&e[t].setAttribute(`href`,`javascript:void(0)`),e[t].addEventListener(`click`,function(e){var t=e.target.getAttribute(`to`);v(t)!==s.pathname()&&s.navigate(t)})}function x(e){var t=[].slice.call(document.querySelectorAll(`[to]`));if(i(t))for(var n=0;n<t.length;n++)v(t[n].getAttribute(`to`))===e?t[n].className+=` active`:t[n].className=t[n].className.replace(/active/g,``)}function S(e){if(!e||typeof e!=`function`)throw Error(t+` Missing View argument @Router`);s.render(e),setTimeout(()=>{x(s.pathname()),b(),n(h)&&(dispatchEvent(h),a(`viewLoaded`))},0)}function C(e,t){l.push({path:v(e),cb:function(){S(t)}})}function w(){if(r&&r.routes&&i(r.routes)){for(let e=0;e<r.routes.length;e++)C(r.routes[e].path,r.routes[e].comp);return!0}return!1}if(w())m=new PopStateEvent(`popstate`),h=new CustomEvent(`viewLoaded`,{detail:{},bubbles:!0,cancelable:!0,composed:!1}),this.isReady=!0;else throw Error(t+` No routes found!`);this.extractParams=function(e,t){let n=e.replace(/\/page\.[^/]+$/,``).split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean),i={},a=n.length-1,o=r.length-1;for(;a>=0&&o>=0;){let e=n[a];if(e.startsWith(`[...`)&&e.endsWith(`]`)){i[e.slice(4,-1)]=r.slice(0,o+1);break}e.startsWith(`[`)&&e.endsWith(`]`)&&(i[e.slice(1,-1)]=decodeURIComponent(r[o])),a--,o--}return i}}return o})(),p=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},m=(e,t)=>({classGroupId:e,validator:t}),h=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),g=`-`,_=[],v=`arbitrary..`,y=e=>{let t=S(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return x(e);let n=e.split(g);return b(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?p(i,t):t:i||_}return n[e]||_}}},b=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=b(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(g):e.slice(t).join(g),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},x=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?v+r:void 0})(),S=e=>{let{theme:t,classGroups:n}=e;return C(n,t)},C=(e,t)=>{let n=h();for(let r in e){let i=e[r];w(i,n,r,t)}return n},w=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];T(i,t,n,r)}},T=(e,t,n,r)=>{if(typeof e==`string`){E(e,t,n);return}if(typeof e==`function`){D(e,t,n,r);return}O(e,t,n,r)},E=(e,t,n)=>{let r=e===``?t:k(t,e);r.classGroupId=n},D=(e,t,n,r)=>{if(A(e)){w(e(r),t,n,r);return}t.validators===null&&(t.validators=[]),t.validators.push(m(n,e))},O=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];w(o,k(t,a),n,r)}},k=(e,t)=>{let n=e,r=t.split(g),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=h(),n.nextPart.set(t,i)),n=i}return n},A=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,j=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},M=`!`,N=`:`,P=[],ee=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),F=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===N){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(M)?(c=s.slice(0,-1),l=!0):s.startsWith(M)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return ee(t,l,c,u)};if(t){let e=t+N,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):ee(P,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},te=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},ne=e=>({cache:j(e.cacheSize),parseClassName:F(e),sortModifiers:te(e),postfixLookupClassGroupIds:I(e),...y(e)}),I=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},L=/\s+/,R=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(L),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h){l=t+(l.length>0?` `+l:l);continue}if(g=r(p),!g){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+M:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},z=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=re(n))&&(i&&(i+=` `),i+=r);return i},re=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=re(e[r]))&&(n&&(n+=` `),n+=t);return n},ie=(e,...t)=>{let n,r,i,a,o=o=>(n=ne(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=R(e,n);return i(e,a),a};return a=o,(...e)=>a(z(...e))},B=[],V=e=>{let t=t=>t[e]||B;return t.isThemeGetter=!0,t},ae=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,oe=/^\((?:(\w[\w-]*):)?(.+)\)$/i,se=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,H=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,ce=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,le=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,ue=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,de=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,fe=e=>se.test(e),U=e=>!!e&&!Number.isNaN(Number(e)),W=e=>!!e&&Number.isInteger(Number(e)),pe=e=>e.endsWith(`%`)&&U(e.slice(0,-1)),me=e=>H.test(e),he=()=>!0,ge=e=>ce.test(e)&&!le.test(e),_e=()=>!1,ve=e=>ue.test(e),ye=e=>de.test(e),be=e=>!G(e)&&!K(e),xe=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),Se=e=>Le(e,Ve,_e),G=e=>ae.test(e),Ce=e=>Le(e,He,ge),we=e=>Le(e,Ue,U),Te=e=>Le(e,Ge,he),Ee=e=>Le(e,We,_e),De=e=>Le(e,ze,_e),Oe=e=>Le(e,Be,ye),ke=e=>Le(e,Ke,ve),K=e=>oe.test(e),Ae=e=>Re(e,He),je=e=>Re(e,We),Me=e=>Re(e,ze),Ne=e=>Re(e,Ve),Pe=e=>Re(e,Be),Fe=e=>Re(e,Ke,!0),Ie=e=>Re(e,Ge,!0),Le=(e,t,n)=>{let r=ae.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},Re=(e,t,n=!1)=>{let r=oe.exec(e);return r?r[1]?t(r[1]):n:!1},ze=e=>e===`position`||e===`percentage`,Be=e=>e===`image`||e===`url`,Ve=e=>e===`length`||e===`size`||e===`bg-size`,He=e=>e===`length`,Ue=e=>e===`number`,We=e=>e===`family-name`,Ge=e=>e===`number`||e===`weight`,Ke=e=>e===`shadow`,q=ie(()=>{let e=V(`color`),t=V(`font`),n=V(`text`),r=V(`font-weight`),i=V(`tracking`),a=V(`leading`),o=V(`breakpoint`),s=V(`container`),c=V(`spacing`),l=V(`radius`),u=V(`shadow`),d=V(`inset-shadow`),f=V(`text-shadow`),p=V(`drop-shadow`),m=V(`blur`),h=V(`perspective`),g=V(`aspect`),_=V(`ease`),v=V(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),K,G],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],C=()=>[`auto`,`contain`,`none`],w=()=>[K,G,c],T=()=>[fe,`full`,`auto`,...w()],E=()=>[W,`none`,`subgrid`,K,G],D=()=>[`auto`,{span:[`full`,W,K,G]},W,K,G],O=()=>[W,`auto`,K,G],k=()=>[`auto`,`min`,`max`,`fr`,K,G],A=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],j=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],M=()=>[`auto`,...w()],N=()=>[fe,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...w()],P=()=>[fe,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...w()],ee=()=>[fe,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...w()],F=()=>[e,K,G],te=()=>[...b(),Me,De,{position:[K,G]}],ne=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],I=()=>[`auto`,`cover`,`contain`,Ne,Se,{size:[K,G]}],L=()=>[pe,Ae,Ce],R=()=>[``,`none`,`full`,l,K,G],z=()=>[``,U,Ae,Ce],re=()=>[`solid`,`dashed`,`dotted`,`double`],ie=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],B=()=>[U,pe,Me,De],ae=()=>[``,`none`,m,K,G],oe=()=>[`none`,U,K,G],se=()=>[`none`,U,K,G],H=()=>[U,K,G],ce=()=>[fe,`full`,...w()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[me],breakpoint:[me],color:[he],container:[me],"drop-shadow":[me],ease:[`in`,`out`,`in-out`],font:[be],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[me],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[me],shadow:[me],spacing:[`px`,U],text:[me],"text-shadow":[me],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,fe,G,K,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,K,G]}],"container-named":[xe],columns:[{columns:[U,G,K,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:T()}],"inset-x":[{"inset-x":T()}],"inset-y":[{"inset-y":T()}],start:[{"inset-s":T(),start:T()}],end:[{"inset-e":T(),end:T()}],"inset-bs":[{"inset-bs":T()}],"inset-be":[{"inset-be":T()}],top:[{top:T()}],right:[{right:T()}],bottom:[{bottom:T()}],left:[{left:T()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[W,`auto`,K,G]}],basis:[{basis:[fe,`full`,`auto`,s,...w()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[U,fe,`auto`,`initial`,`none`,G]}],grow:[{grow:[``,U,K,G]}],shrink:[{shrink:[``,U,K,G]}],order:[{order:[W,`first`,`last`,`none`,K,G]}],"grid-cols":[{"grid-cols":E()}],"col-start-end":[{col:D()}],"col-start":[{"col-start":O()}],"col-end":[{"col-end":O()}],"grid-rows":[{"grid-rows":E()}],"row-start-end":[{row:D()}],"row-start":[{"row-start":O()}],"row-end":[{"row-end":O()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":k()}],"auto-rows":[{"auto-rows":k()}],gap:[{gap:w()}],"gap-x":[{"gap-x":w()}],"gap-y":[{"gap-y":w()}],"justify-content":[{justify:[...A(),`normal`]}],"justify-items":[{"justify-items":[...j(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...j()]}],"align-content":[{content:[`normal`,...A()]}],"align-items":[{items:[...j(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...j(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":A()}],"place-items":[{"place-items":[...j(),`baseline`]}],"place-self":[{"place-self":[`auto`,...j()]}],p:[{p:w()}],px:[{px:w()}],py:[{py:w()}],ps:[{ps:w()}],pe:[{pe:w()}],pbs:[{pbs:w()}],pbe:[{pbe:w()}],pt:[{pt:w()}],pr:[{pr:w()}],pb:[{pb:w()}],pl:[{pl:w()}],m:[{m:M()}],mx:[{mx:M()}],my:[{my:M()}],ms:[{ms:M()}],me:[{me:M()}],mbs:[{mbs:M()}],mbe:[{mbe:M()}],mt:[{mt:M()}],mr:[{mr:M()}],mb:[{mb:M()}],ml:[{ml:M()}],"space-x":[{"space-x":w()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":w()}],"space-y-reverse":[`space-y-reverse`],size:[{size:N()}],"inline-size":[{inline:[`auto`,...P()]}],"min-inline-size":[{"min-inline":[`auto`,...P()]}],"max-inline-size":[{"max-inline":[`none`,...P()]}],"block-size":[{block:[`auto`,...ee()]}],"min-block-size":[{"min-block":[`auto`,...ee()]}],"max-block-size":[{"max-block":[`none`,...ee()]}],w:[{w:[s,`screen`,...N()]}],"min-w":[{"min-w":[s,`screen`,`none`,...N()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...N()]}],h:[{h:[`screen`,`lh`,...N()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...N()]}],"max-h":[{"max-h":[`screen`,`lh`,...N()]}],"font-size":[{text:[`base`,n,Ae,Ce]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,Ie,Te]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,pe,G]}],"font-family":[{font:[je,Ee,t]}],"font-features":[{"font-features":[G]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,K,G]}],"line-clamp":[{"line-clamp":[U,`none`,K,we]}],leading:[{leading:[a,...w()]}],"list-image":[{"list-image":[`none`,K,G]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,K,G]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:F()}],"text-color":[{text:F()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...re(),`wavy`]}],"text-decoration-thickness":[{decoration:[U,`from-font`,`auto`,K,Ce]}],"text-decoration-color":[{decoration:F()}],"underline-offset":[{"underline-offset":[U,`auto`,K,G]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:w()}],"tab-size":[{tab:[W,K,G]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,K,G]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,K,G]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:te()}],"bg-repeat":[{bg:ne()}],"bg-size":[{bg:I()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},W,K,G],radial:[``,K,G],conic:[W,K,G]},Pe,Oe]}],"bg-color":[{bg:F()}],"gradient-from-pos":[{from:L()}],"gradient-via-pos":[{via:L()}],"gradient-to-pos":[{to:L()}],"gradient-from":[{from:F()}],"gradient-via":[{via:F()}],"gradient-to":[{to:F()}],rounded:[{rounded:R()}],"rounded-s":[{"rounded-s":R()}],"rounded-e":[{"rounded-e":R()}],"rounded-t":[{"rounded-t":R()}],"rounded-r":[{"rounded-r":R()}],"rounded-b":[{"rounded-b":R()}],"rounded-l":[{"rounded-l":R()}],"rounded-ss":[{"rounded-ss":R()}],"rounded-se":[{"rounded-se":R()}],"rounded-ee":[{"rounded-ee":R()}],"rounded-es":[{"rounded-es":R()}],"rounded-tl":[{"rounded-tl":R()}],"rounded-tr":[{"rounded-tr":R()}],"rounded-br":[{"rounded-br":R()}],"rounded-bl":[{"rounded-bl":R()}],"border-w":[{border:z()}],"border-w-x":[{"border-x":z()}],"border-w-y":[{"border-y":z()}],"border-w-s":[{"border-s":z()}],"border-w-e":[{"border-e":z()}],"border-w-bs":[{"border-bs":z()}],"border-w-be":[{"border-be":z()}],"border-w-t":[{"border-t":z()}],"border-w-r":[{"border-r":z()}],"border-w-b":[{"border-b":z()}],"border-w-l":[{"border-l":z()}],"divide-x":[{"divide-x":z()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":z()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...re(),`hidden`,`none`]}],"divide-style":[{divide:[...re(),`hidden`,`none`]}],"border-color":[{border:F()}],"border-color-x":[{"border-x":F()}],"border-color-y":[{"border-y":F()}],"border-color-s":[{"border-s":F()}],"border-color-e":[{"border-e":F()}],"border-color-bs":[{"border-bs":F()}],"border-color-be":[{"border-be":F()}],"border-color-t":[{"border-t":F()}],"border-color-r":[{"border-r":F()}],"border-color-b":[{"border-b":F()}],"border-color-l":[{"border-l":F()}],"divide-color":[{divide:F()}],"outline-style":[{outline:[...re(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[U,K,G]}],"outline-w":[{outline:[``,U,Ae,Ce]}],"outline-color":[{outline:F()}],shadow:[{shadow:[``,`none`,u,Fe,ke]}],"shadow-color":[{shadow:F()}],"inset-shadow":[{"inset-shadow":[`none`,d,Fe,ke]}],"inset-shadow-color":[{"inset-shadow":F()}],"ring-w":[{ring:z()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:F()}],"ring-offset-w":[{"ring-offset":[U,Ce]}],"ring-offset-color":[{"ring-offset":F()}],"inset-ring-w":[{"inset-ring":z()}],"inset-ring-color":[{"inset-ring":F()}],"text-shadow":[{"text-shadow":[`none`,f,Fe,ke]}],"text-shadow-color":[{"text-shadow":F()}],opacity:[{opacity:[U,K,G]}],"mix-blend":[{"mix-blend":[...ie(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":ie()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[U]}],"mask-image-linear-from-pos":[{"mask-linear-from":B()}],"mask-image-linear-to-pos":[{"mask-linear-to":B()}],"mask-image-linear-from-color":[{"mask-linear-from":F()}],"mask-image-linear-to-color":[{"mask-linear-to":F()}],"mask-image-t-from-pos":[{"mask-t-from":B()}],"mask-image-t-to-pos":[{"mask-t-to":B()}],"mask-image-t-from-color":[{"mask-t-from":F()}],"mask-image-t-to-color":[{"mask-t-to":F()}],"mask-image-r-from-pos":[{"mask-r-from":B()}],"mask-image-r-to-pos":[{"mask-r-to":B()}],"mask-image-r-from-color":[{"mask-r-from":F()}],"mask-image-r-to-color":[{"mask-r-to":F()}],"mask-image-b-from-pos":[{"mask-b-from":B()}],"mask-image-b-to-pos":[{"mask-b-to":B()}],"mask-image-b-from-color":[{"mask-b-from":F()}],"mask-image-b-to-color":[{"mask-b-to":F()}],"mask-image-l-from-pos":[{"mask-l-from":B()}],"mask-image-l-to-pos":[{"mask-l-to":B()}],"mask-image-l-from-color":[{"mask-l-from":F()}],"mask-image-l-to-color":[{"mask-l-to":F()}],"mask-image-x-from-pos":[{"mask-x-from":B()}],"mask-image-x-to-pos":[{"mask-x-to":B()}],"mask-image-x-from-color":[{"mask-x-from":F()}],"mask-image-x-to-color":[{"mask-x-to":F()}],"mask-image-y-from-pos":[{"mask-y-from":B()}],"mask-image-y-to-pos":[{"mask-y-to":B()}],"mask-image-y-from-color":[{"mask-y-from":F()}],"mask-image-y-to-color":[{"mask-y-to":F()}],"mask-image-radial":[{"mask-radial":[K,G]}],"mask-image-radial-from-pos":[{"mask-radial-from":B()}],"mask-image-radial-to-pos":[{"mask-radial-to":B()}],"mask-image-radial-from-color":[{"mask-radial-from":F()}],"mask-image-radial-to-color":[{"mask-radial-to":F()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[U]}],"mask-image-conic-from-pos":[{"mask-conic-from":B()}],"mask-image-conic-to-pos":[{"mask-conic-to":B()}],"mask-image-conic-from-color":[{"mask-conic-from":F()}],"mask-image-conic-to-color":[{"mask-conic-to":F()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:te()}],"mask-repeat":[{mask:ne()}],"mask-size":[{mask:I()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,K,G]}],filter:[{filter:[``,`none`,K,G]}],blur:[{blur:ae()}],brightness:[{brightness:[U,K,G]}],contrast:[{contrast:[U,K,G]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,Fe,ke]}],"drop-shadow-color":[{"drop-shadow":F()}],grayscale:[{grayscale:[``,U,K,G]}],"hue-rotate":[{"hue-rotate":[U,K,G]}],invert:[{invert:[``,U,K,G]}],saturate:[{saturate:[U,K,G]}],sepia:[{sepia:[``,U,K,G]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,K,G]}],"backdrop-blur":[{"backdrop-blur":ae()}],"backdrop-brightness":[{"backdrop-brightness":[U,K,G]}],"backdrop-contrast":[{"backdrop-contrast":[U,K,G]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,U,K,G]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[U,K,G]}],"backdrop-invert":[{"backdrop-invert":[``,U,K,G]}],"backdrop-opacity":[{"backdrop-opacity":[U,K,G]}],"backdrop-saturate":[{"backdrop-saturate":[U,K,G]}],"backdrop-sepia":[{"backdrop-sepia":[``,U,K,G]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":w()}],"border-spacing-x":[{"border-spacing-x":w()}],"border-spacing-y":[{"border-spacing-y":w()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,K,G]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[U,`initial`,K,G]}],ease:[{ease:[`linear`,`initial`,_,K,G]}],delay:[{delay:[U,K,G]}],animate:[{animate:[`none`,v,K,G]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,K,G]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:oe()}],"rotate-x":[{"rotate-x":oe()}],"rotate-y":[{"rotate-y":oe()}],"rotate-z":[{"rotate-z":oe()}],scale:[{scale:se()}],"scale-x":[{"scale-x":se()}],"scale-y":[{"scale-y":se()}],"scale-z":[{"scale-z":se()}],"scale-3d":[`scale-3d`],skew:[{skew:H()}],"skew-x":[{"skew-x":H()}],"skew-y":[{"skew-y":H()}],transform:[{transform:[K,G,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:ce()}],"translate-x":[{"translate-x":ce()}],"translate-y":[{"translate-y":ce()}],"translate-z":[{"translate-z":ce()}],"translate-none":[`translate-none`],zoom:[{zoom:[W,K,G]}],accent:[{accent:F()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:F()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,K,G]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":F()}],"scrollbar-track-color":[{"scrollbar-track":F()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":w()}],"scroll-mx":[{"scroll-mx":w()}],"scroll-my":[{"scroll-my":w()}],"scroll-ms":[{"scroll-ms":w()}],"scroll-me":[{"scroll-me":w()}],"scroll-mbs":[{"scroll-mbs":w()}],"scroll-mbe":[{"scroll-mbe":w()}],"scroll-mt":[{"scroll-mt":w()}],"scroll-mr":[{"scroll-mr":w()}],"scroll-mb":[{"scroll-mb":w()}],"scroll-ml":[{"scroll-ml":w()}],"scroll-p":[{"scroll-p":w()}],"scroll-px":[{"scroll-px":w()}],"scroll-py":[{"scroll-py":w()}],"scroll-ps":[{"scroll-ps":w()}],"scroll-pe":[{"scroll-pe":w()}],"scroll-pbs":[{"scroll-pbs":w()}],"scroll-pbe":[{"scroll-pbe":w()}],"scroll-pt":[{"scroll-pt":w()}],"scroll-pr":[{"scroll-pr":w()}],"scroll-pb":[{"scroll-pb":w()}],"scroll-pl":[{"scroll-pl":w()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,K,G]}],fill:[{fill:[`none`,...F()]}],"stroke-w":[{stroke:[U,Ae,Ce,we]}],stroke:[{stroke:[`none`,...F()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`right`,`left`],"inset-y":[`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`pr`,`pl`],py:[`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`mr`,`ml`],my:[`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-r`,`border-w-l`],"border-w-y":[`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-r`,`border-color-l`],"border-color-y":[`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}}),J=e=>{let t=e||`Button`,n=l(t),{variant:r=`default`,size:i=`default`,type:a=`button`,class:o=``,disabled:s=!1,value:c,role:u,ariaLabel:d,onclick:f,children:p}=l(t),m=`group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,h={default:`border-transparent bg-primary text-primary-foreground hover:bg-primary/80`,destructive:`border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20`,outline:`border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground`,secondary:`border-transparent bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--olum-secondary),var(--olum-foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground`,ghost:`border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground`,link:`border-transparent text-primary underline-offset-4 hover:underline`},g={default:`h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,xs:`h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3`,sm:`h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5`,lg:`h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,icon:`size-8`,"icon-xs":`size-6 rounded-[min(var(--radius-md),10px)]`,"icon-sm":`size-7 rounded-[min(var(--radius-md),12px)]`,"icon-lg":`size-9`},_=()=>q(m,h[n.variant===void 0?`default`:n.variant]||h.default,g[n.size===void 0?`default`:n.size]||g.default,n.class===void 0?``:n.class),v=e=>n.onclick&&n.onclick(e);var y=olum.mkElm(`div`,`Button`,`bkeujdrxn8v`),b={variant:n.variant===void 0?`default`:n.variant,size:n.size===void 0?`default`:n.size,type:n.type===void 0?`button`:n.type,className:n.class===void 0?``:n.class,disabled:n.disabled!==void 0&&n.disabled,value:n.value,role:n.role,ariaLabel:n.ariaLabel,onclick:n.onclick,children:n.children,classes:_,handleClick:v},x={__style__(){return``},methods:{},props:{},compName:`Button`,deps:null,components:{},get getElm(){var e=y.isConnected?olum.vdom.mkStaging(y):y;return e.innerHTML=`
      <button data-slot="button" type="${olum.esc(n.type===void 0?`button`:n.type)}" class="${olum.esc(_())}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} aria-label="${olum.esc(n.ariaLabel)}" data-value="${olum.esc(n.value)}" data-role="${olum.esc(n.role)}" data-o-event='onclick|handleClick=${JSON.stringify([])}'>${n.children}</button>`,olum.injectStyle(`Button`,x.__style__()),olum.handleMarkup(`Button`,`bkeujdrxn8v`,e,b)}};return{methods:x.methods,props:x.props,__OLUM__:x,el:y,methodsRef:b,stateProps:null,localsRef:{get base(){return m},get variants(){return h},get sizes(){return g}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qe=e=>{let t=e||`Anchor`,n=l(t),{variant:r=`default`,size:i=`default`,href:a=`#`,to:o,target:s,rel:c,ariaLabel:u,class:d=``,disabled:f=!1,children:p}=l(t),m=`group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,h={default:`border-transparent bg-primary text-primary-foreground hover:bg-primary/80`,destructive:`border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20`,outline:`border-border bg-background hover:bg-muted hover:text-foreground`,secondary:`border-transparent bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--olum-secondary),var(--olum-foreground)_5%)]`,ghost:`border-transparent hover:bg-muted hover:text-foreground`,link:`border-transparent text-primary underline-offset-4 hover:underline`},g={default:`h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,xs:`h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3`,sm:`h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5`,lg:`h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,icon:`size-8`,"icon-xs":`size-6 rounded-[min(var(--radius-md),10px)]`,"icon-sm":`size-7 rounded-[min(var(--radius-md),12px)]`,"icon-lg":`size-9`},_=()=>q(m,h[n.variant===void 0?`default`:n.variant]||h.default,g[n.size===void 0?`default`:n.size]||g.default,n.to?`[&>*]:pointer-events-none`:``,n.class===void 0?``:n.class),v=()=>n.rel||(n.target===`_blank`?`noreferrer`:null);var y=olum.mkElm(`div`,`Anchor`,`uqxa4sy97l`),b={variant:n.variant===void 0?`default`:n.variant,size:n.size===void 0?`default`:n.size,href:n.href===void 0?`#`:n.href,to:n.to,target:n.target,rel:n.rel,ariaLabel:n.ariaLabel,className:n.class===void 0?``:n.class,disabled:n.disabled!==void 0&&n.disabled,children:n.children,classes:_,relValue:v},x={__style__(){return``},methods:{},props:{},compName:`Anchor`,deps:null,components:{},get getElm(){var e=y.isConnected?olum.vdom.mkStaging(y):y;return e.innerHTML=`
      ${n.to?`
  <a data-slot="anchor" to="${olum.esc(n.to)}" aria-label="${olum.esc(n.ariaLabel)}" class="${olum.esc(_())}" aria-disabled="${olum.esc(n.disabled!==void 0&&n.disabled)}">${n.children}</a>
`:`
  <a data-slot="anchor" href="${olum.esc(n.href===void 0?`#`:n.href)}" aria-label="${olum.esc(n.ariaLabel)}" target="${olum.esc(n.target)}" rel="${olum.esc(v())}" class="${olum.esc(_())}" aria-disabled="${olum.esc(n.disabled!==void 0&&n.disabled)}">${n.children}</a>
`}`,olum.injectStyle(`Anchor`,x.__style__()),olum.handleMarkup(`Anchor`,`uqxa4sy97l`,e,b)}};return{methods:x.methods,props:x.props,__OLUM__:x,el:y,methodsRef:b,stateProps:null,localsRef:{get base(){return m},get variants(){return h},get sizes(){return g}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Y=e=>{let t=e||`Icon`,n=l(t),{icon:r,class:i=``}=l(t),a=()=>q(`inline-flex items-center justify-center`,`[&_svg]:w-full [&_svg]:h-full [&_svg]:text-current [&_svg]:stroke-current`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Icon`,`5egcg8y772a`),s={icon:n.icon,className:n.class===void 0?``:n.class,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Icon`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span class="${olum.esc(a())}">${n.icon}</span>`,olum.injectStyle(`Icon`,c.__style__()),olum.handleMarkup(`Icon`,`5egcg8y772a`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Je=300,Ye=u({items:[],add({title:e,description:t,type:n=`default`,duration:r=4e3,autoClose:i=!0}={}){let a=Date.now()+Math.random();return this.items=[...this.items,{id:a,title:e,description:t,type:n,entering:!0,leaving:!1}],setTimeout(()=>{this.items=this.items.map(e=>e.id===a?{...e,entering:!1}:e)},20),i&&setTimeout(()=>this.requestDismiss(a),r),a},requestDismiss(e){this.items=this.items.map(t=>t.id===e?{...t,leaving:!0}:t),setTimeout(()=>this.dismiss(e),Je)},dismiss(e){this.items=this.items.filter(t=>t.id!==e)}}),Xe=e=>{let t=e||`Toaster`,n=l(t),{position:r=`bottom-right`,class:i=``}=l(t),a=()=>(n.position===void 0?`bottom-right`:n.position).indexOf(`top`)===0,s=()=>(n.position===void 0?`bottom-right`:n.position).indexOf(`left`)!==-1,c=()=>a()?1:-1;var u={hovering:!1},d=o(()=>{let e=()=>u.hovering=!0,t=()=>u.hovering=!1;return C.addEventListener(`mouseenter`,e),C.addEventListener(`mouseleave`,t),()=>{C.removeEventListener(`mouseenter`,e),C.removeEventListener(`mouseleave`,t)}});let f={success:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>`,info:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>`,warning:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>`,error:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16h.01" /><path d="M12 8v4" /><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" /></svg>`},p=e=>f[e]||``,m=()=>Ye.items.slice(-3),h=e=>{let t=m(),n=t.findIndex(t=>t.id===e);return t.length-1-n},g=e=>{let t=c();if(e.entering||e.leaving)return`opacity:0; transform: translateY(${-t*16}px) scale(0.95);`;let n=h(e.id);return u.hovering?`opacity:1; transform: translateY(${t*n*88}px) scale(1); z-index: ${100-n};`:`opacity:1; transform: translateY(${t*n*10}px) scale(${1-n*.05}); z-index: ${100-n};`},_=()=>u.hovering?Math.max(0,m().length-1)*88:0,v=()=>`${a()?`padding-bottom`:`padding-top`}: ${_()}px;`,y=()=>[a()?`top-4`:`bottom-4`,s()?`sm:left-4 sm:right-auto`:`sm:right-4 sm:left-auto`,`transition-[padding-top,padding-bottom]`].join(` `),b=()=>q(m().length?`pointer-events-auto`:`pointer-events-none`,`fixed inset-x-4 z-50 mx-auto grid w-auto max-w-sm duration-300 ease-out sm:mx-0 sm:w-full`,y(),n.class===void 0?``:n.class),x=(e,t)=>{Ye.requestDismiss(t.id)};var S=olum.mkElm(`div`,`Toaster`,`gggwuy3n976`),C=S,w={position:n.position===void 0?`bottom-right`:n.position,className:n.class===void 0?``:n.class,isTop:a,isLeft:s,growDir:c,iconFor:p,visibleItems:m,distanceFor:h,styleFor:g,expandPadding:_,paddingStyle:v,anchorClasses:y,classes:b,__olumAnon_m39gi0r:x},T={__style__(){return``},methods:{},props:{},compName:`Toaster`,deps:null,components:{},get getElm(){var e=S.isConnected?olum.vdom.mkStaging(S):S;return e.innerHTML=`
      <div data-slot="toast-viewport" data-position="${olum.esc(n.position===void 0?`bottom-right`:n.position)}" class="${olum.esc(b())}" style="${olum.esc(v())}">
  ${m().map(function(e){return`
    <div data-slot="toast" class="pointer-events-auto col-start-1 row-start-1 flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-sm text-foreground shadow-lg transition-all duration-300 ease-out" style="${olum.esc(g(e))}" key="${olum.esc(e.id)}">
      ${p(e.type)?`
        <span class="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4">${p(e.type)}</span>
      `:``}
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <div class="text-sm font-medium">${olum.esc(e.title)}</div>
        ${e.description?`
          <div class="text-sm text-muted-foreground">${olum.esc(e.description)}</div>
        `:``}
      </div>
      <button type="button" aria-label="Close toast" class="relative flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" data-o-event='onclick|__olumAnon_m39gi0r=${JSON.stringify([`$event`,e])}'>
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    </div>
  `}).join(``)}
</div>`,olum.injectStyle(`Toaster`,T.__style__()),olum.handleMarkup(`Toaster`,`gggwuy3n976`,e,w)}};return u.__olum__={compName:t,compId:`gggwuy3n976`},u=olum.proxyHandler(u,null,S),{methods:T.methods,props:T.props,__OLUM__:T,el:S,methodsRef:w,stateProps:u,localsRef:{get icons(){return f},get MAX_VISIBLE(){return 3},get EXPANDED_GAP(){return 88}},hooks:{mounted:d===void 0?null:d,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ze=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,Qe=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`,$e=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M7 7h10v10M7 17 17 7"/></svg>`,et=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" viewBox="0 0 500 500"><path d="M250 465.217 0 30.435h500z"/></svg>`,tt=window.matchMedia(`(prefers-color-scheme: dark)`).matches,nt=u({dark:tt,toggle(){this.dark=!this.dark,document.documentElement.classList.toggle(`dark`,this.dark)}});document.documentElement.classList.toggle(`dark`,nt.dark);var X=e=>{let t=e||`Nav`,n=()=>nt.toggle();var r=olum.mkElm(`div`,`Nav`,`v0egstdo98k`),i={toggleTheme:n},a={__style__(){return``},methods:{},props:{},compName:`Nav`,deps:null,components:{Button:J,Anchor:qe,Icon:Y,Toaster:Xe},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
  <div class="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-6">
    
    <div class="group relative flex shrink-0 items-center gap-2.5">
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:et,class:`w-4 relative top-0.5 text-[#25C97E]`})).replace(/'/g,`%27`)}'></olum>
      <span class="font-heading text-[15px] font-semibold tracking-tight text-foreground">
        Olum <span class="font-normal text-muted-foreground">Playground</span>
      </span>
      <a to="/" class="absolute inset-0" aria-label="Olum Playground — home"></a>
    </div>

    <nav class="hidden items-center gap-6 md:flex">
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({href:`https://olumjs.top/docs`,target:`_blank`,variant:`link`,class:`h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}'>Docs</olum>
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`link`,class:`h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}'>Playground</olum>
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/ui`,variant:`link`,class:`h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}'>UI Kit</olum>
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({href:`https://github.com/olumjs`,target:`_blank`,variant:`link`,class:`h-auto gap-1 p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}'>
        GitHub
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$e,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum>
      </olum>
    </nav>

    <div class="flex items-center gap-2">
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`icon`,ariaLabel:`Toggle theme`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toggleTheme" data-o-props-owner='${t}'>
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:nt.dark?Ze:Qe,class:`size-4`})).replace(/'/g,`%27`)}'></olum>
      </olum>
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/reactivity`,class:`border-transparent bg-brand text-brand-ink hover:bg-brand hover:brightness-110`})).replace(/'/g,`%27`)}'>Get Started</olum>
    </div>
  </div>
</header>

<olum name="Toaster" data-o-props='${encodeURIComponent(JSON.stringify({position:`bottom-right`})).replace(/'/g,`%27`)}'></olum>`,olum.injectStyle(`Nav`,a.__style__()),olum.handleMarkup(`Nav`,`v0egstdo98k`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},rt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4m8.5-12-5 16"/></svg>`,it=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>`,at=[{slug:`reactivity`,to:`/reactivity`,title:`Reactivity`},{slug:`control-flow`,to:`/control-flow`,title:`Control Flow`},{slug:`composition`,to:`/composition`,title:`Composition`},{slug:`lifecycle`,to:`/lifecycle`,title:`Lifecycle`},{slug:`binding`,to:`/binding`,title:`Binding`},{slug:`transitions`,to:`/transitions`,title:`Transitions`},{slug:`store`,to:`/store`,title:`Store`},{slug:`router`,to:`/blog`,title:`Router`},{slug:`ui-kit`,to:`/ui`,title:`UI Kit`}],Z=e=>{let t=e||`FeatureSidebar`,n=l(t),{active:r}=l(t),i=()=>at.findIndex(e=>e.slug===n.active),a=e=>String(e).padStart(2,`0`);var o=olum.mkElm(`div`,`FeatureSidebar`,`damjecczwh`),s={active:n.active,activeIndex:i,pad:a},c={__style__(){return``},methods:{},props:{},compName:`FeatureSidebar`,deps:null,components:{Anchor:qe,Icon:Y},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <aside class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border px-4 py-8 lg:flex">
  <div>
    <div class="mb-3 flex items-center gap-1.5 px-2.5 text-xs font-medium text-muted-foreground">
      <span>Features</span>
      ${i()>=0?`
        <span class="text-border">/</span>
        <span class="font-mono text-foreground">${olum.esc(a(i()+1))}</span>
      `:``}
    </div>
    <nav class="flex flex-col gap-0.5">
      ${at.map(function(e,t){return`
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:e.to,variant:`ghost`,class:`h-9 w-full justify-start gap-2.5 rounded-lg px-2.5 font-normal ${e.slug===n.active?`bg-brand/10 text-foreground hover:bg-brand/10`:`text-muted-foreground`}`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.slug)}">
          <span class="flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold ${olum.esc(e.slug===n.active?`bg-brand text-brand-ink`:`bg-muted text-muted-foreground`)}">
            ${olum.esc(a(t+1))}
          </span>
          ${olum.esc(e.title)}
        </olum>
      `}).join(``)}
    </nav>
  </div>

  <div class="rounded-xl border border-border p-5 text-center">
    <div class="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:rt,class:`size-4.5`})).replace(/'/g,`%27`)}'></olum>
    </div>
    <p class="mb-4 text-sm text-muted-foreground">Everything you need to build fast, interactive, and delightful web apps.</p>
    <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/reactivity`,class:`w-full justify-center gap-1.5 border-transparent bg-brand text-brand-ink hover:bg-brand hover:brightness-110`})).replace(/'/g,`%27`)}'>
      Get Started
      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:it,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum>
    </olum>
  </div>
</aside>`,olum.injectStyle(`FeatureSidebar`,c.__style__()),olum.handleMarkup(`FeatureSidebar`,`damjecczwh`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ot=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>`,Q=e=>{let t=[{title:`Resources`,links:[{label:`Docs`,href:`https://olumjs.top/docs`,external:!0},{label:`Icons`,href:`https://icons.olumjs.top`,external:!0},{label:`UI Kit`,href:`https://ui.olumjs.top`,external:!0}]},{title:`Ecosystem`,links:[{label:`Router`,href:`https://www.olumjs.top/docs/router`,external:!0},{label:`Store`,href:`https://www.olumjs.top/docs/global-store`,external:!0},{label:`Transition`,href:`https://www.olumjs.top/docs/transitions`,external:!0}]},{title:`More`,links:[{label:`Contribute`,href:`https://github.com/olumjs`,external:!0},{label:`Discord`,href:`https://discord.gg/2zK7tb2Cg9`,external:!0},{label:`Bluesky`,href:`https://bsky.app/profile/olumjs.bsky.social`,external:!0}]}];var n=olum.mkElm(`div`,`SiteFooter`,`fqehgnb4ufp`),r={},i={__style__(){return``},methods:{},props:{},compName:`SiteFooter`,deps:null,components:{Icon:Y,Anchor:qe},get getElm(){var e=n.isConnected?olum.vdom.mkStaging(n):n;return e.innerHTML=`
      <footer class="border-t border-border">
  <div class="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] lg:gap-6">
    <div class="col-span-2 sm:col-span-3 lg:col-span-1">
      <div class="flex items-center gap-2">
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:et,class:`w-4 text-[#25C97E]`})).replace(/'/g,`%27`)}'></olum>
        <span class="font-heading text-[15px] font-semibold tracking-tight text-foreground">olum</span>
      </div>
      <p class="mt-3 max-w-40 text-sm text-muted-foreground">Simple to learn. Fun to build. Ready for anything.</p>
    </div>

    ${t.map(function(e){return`
      <div key="${olum.esc(e.title)}">
        <div class="mb-3 text-sm font-medium text-foreground">${olum.esc(e.title)}</div>
        <ul class="flex flex-col gap-2.5">
          ${e.links.map(function(e){return`
            <li key="${olum.esc(e.label)}">
              ${e.external?`
                <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({href:e.href,target:`_blank`,variant:`link`,class:`h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!e.external)}' data-o-key="${olum.esc(e.label)}">
                  ${olum.esc(e.label)}
                </olum>
              `:`
                <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:e.to,variant:`link`,class:`h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.label)}">${olum.esc(e.label)}</olum>
              `}
              
            </li>
          `}).join(``)}
        </ul>
      </div>
    `}).join(``)}

    <div class="col-span-2 flex items-center rounded-xl border border-border p-5 sm:col-span-3 lg:col-span-1">
      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ot,class:`size-4 shrink-0 text-brand`})).replace(/'/g,`%27`)}'></olum>
      <p class="ml-3 text-sm text-muted-foreground">Made with love for developers who ship.</p>
    </div>
  </div>
</footer>`,olum.injectStyle(`SiteFooter`,i.__style__()),olum.handleMarkup(`SiteFooter`,`fqehgnb4ufp`,e,r)}};return{methods:i.methods,props:i.props,__OLUM__:i,el:n,methodsRef:r,stateProps:null,localsRef:{get columns(){return t}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},st=e=>{let t=e||`PageHero`,n=l(t),{index:r,icon:i,title:a,children:o}=l(t),s=e=>String(e).padStart(2,`0`);var c=olum.mkElm(`div`,`PageHero`,`uh3gajur1me`),u={index:n.index,iconSvg:n.icon,title:n.title,children:n.children,pad:s},d={__style__(){return``},methods:{},props:{},compName:`PageHero`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div class="relative flex items-start justify-between gap-8">
  <div class="max-w-2xl">
    <span class="mb-4 flex size-8 items-center justify-center rounded-lg bg-brand/10 font-mono text-xs font-semibold text-brand">${olum.esc(s(n.index))}</span>
    <h1 class="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">${olum.esc(n.title)}</h1>
    <div class="mt-3 max-w-xl text-muted-foreground">${n.children}</div>
  </div>

  <div class="relative hidden shrink-0 size-28 items-center justify-center sm:flex">
    <span class="absolute inset-0 rounded-full border border-dashed border-brand/25"></span>
    <span class="absolute inset-3 rounded-full border border-dashed border-brand/20"></span>
    <span class="absolute top-1 right-3 size-1.5 rounded-sm bg-brand/30"></span>
    <span class="absolute bottom-2 left-0 size-1 rounded-sm bg-brand/30"></span>
    <span class="flex size-14 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20 [&_svg]:size-6 [&_svg]:text-brand">${n.icon}</span>
  </div>
</div>`,olum.injectStyle(`PageHero`,d.__style__()),olum.handleMarkup(`PageHero`,`uh3gajur1me`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ct=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,lt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`,ut=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,dt=e=>{let t=e||`DemoPanel`,n=l(t),{filename:r,code:i,consoleLines:a=[],children:o}=l(t);var s={tab:`preview`,copied:!1};let c=e=>s.tab=e,u=e=>e.replace(/<[^>]*>/g,``).replace(/&lt;/g,`<`).replace(/&gt;/g,`>`).replace(/&amp;/g,`&`).replace(/&quot;/g,`"`).replace(/&#39;/g,`'`),d=async()=>{await navigator.clipboard.writeText(u(n.code)),s.copied=!0,setTimeout(()=>s.copied=!1,1500)};var f=olum.mkElm(`div`,`DemoPanel`,`o6hhs4vdetl`),p={filename:n.filename,code:n.code,consoleLines:n.consoleLines===void 0?[]:n.consoleLines,children:n.children,setTab:c,stripHtml:u,copyCode:d},m={__style__(){return``},methods:{},props:{},compName:`DemoPanel`,deps:[`copied`,`tab`],components:{Icon:Y},get getElm(){var e=f.isConnected?olum.vdom.mkStaging(f):f;return e.innerHTML=`
      <div class="grid grid-cols-1 overflow-hidden rounded-xl border border-border lg:grid-cols-2 lg:divide-x lg:divide-border">
  <div class="flex flex-col">
    <div class="flex h-10 shrink-0 items-center justify-between border-b border-border px-4">
      <span class="font-mono text-xs text-muted-foreground">${olum.esc(n.filename)}</span>
      <button type="button" class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground" data-o-event='onclick|copyCode=${JSON.stringify([])}'>
        ${s.copied?`
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:lt,class:`size-3.5 text-brand`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!s.copied)}'></olum>
          Copied
        `:`
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ct,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum>
          Copy
        `}
        
      </button>
    </div>
    <pre class="flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground"><code>${n.code}</code></pre>
  </div>

  <div class="flex flex-col bg-muted/30">
    <div class="flex h-10 shrink-0 items-center justify-between border-b border-border px-4">
      <div class="flex h-full items-center gap-4">
        <button type="button" class="h-full border-b-2 text-sm ${olum.esc(s.tab===`preview`?`border-brand font-medium text-foreground`:`border-transparent text-muted-foreground`)}" data-o-event='onclick|setTab=${JSON.stringify([`preview`])}'>Preview</button>
        <button type="button" class="h-full border-b-2 text-sm ${olum.esc(s.tab===`console`?`border-brand font-medium text-foreground`:`border-transparent text-muted-foreground`)}" data-o-event='onclick|setTab=${JSON.stringify([`console`])}'>Console</button>
      </div>
      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ut,class:`size-3.5 text-muted-foreground`})).replace(/'/g,`%27`)}'></olum>
    </div>
    <div class="flex-1 p-4">
      <div data-o-show="" style="display:${s.tab===`preview`?`contents`:`none`};">
        <div>${n.children}</div>
      </div>
      <div data-o-show="" style="display:${s.tab===`console`?`contents`:`none`};">
        <div>
          ${(n.consoleLines===void 0?[]:n.consoleLines).length===0?`
            <p class="font-mono text-xs text-muted-foreground">// no output yet</p>
          `:``}
          <ul class="flex flex-col gap-1.5">
            ${(n.consoleLines===void 0?[]:n.consoleLines).map(function(e){return`
              <li class="font-mono text-xs text-muted-foreground" key="${olum.esc(e)}">${olum.esc(e)}</li>
            `}).join(``)}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`,olum.injectStyle(`DemoPanel`,m.__style__()),olum.handleMarkup(`DemoPanel`,`o6hhs4vdetl`,e,p)}};return s.__olum__={compName:t,compId:`o6hhs4vdetl`},s=olum.proxyHandler(s,null,f),{methods:m.methods,props:m.props,__OLUM__:m,el:f,methodsRef:p,stateProps:s,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ft=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,pt=e=>{let t=e||`WhatsHappening`,n=l(t),{items:r}=l(t);var i=olum.mkElm(`div`,`WhatsHappening`,`6mt4ywrvv23`),a={items:n.items},o={__style__(){return``},methods:{},props:{},compName:`WhatsHappening`,deps:null,components:{Icon:Y},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div class="mt-3 rounded-xl border border-border bg-muted/30 p-4">
  <div class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">What's happening?</div>
  <ul class="flex flex-col gap-1.5 text-sm text-foreground">
    ${n.items.map(function(e){return`
      <li class="flex items-start gap-2" key="${olum.esc(e)}">
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ft,class:`mt-0.5 size-4 shrink-0 text-brand`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e)}"></olum>
        ${olum.esc(e)}
      </li>
    `}).join(``)}
  </ul>
</div>`,olum.injectStyle(`WhatsHappening`,o.__style__()),olum.handleMarkup(`WhatsHappening`,`6mt4ywrvv23`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},mt=e=>{let t=e||`WhyYoullLoveIt`,n=l(t),{items:r,heading:i}=l(t),a=n.heading||`Why you'll love it`;var o=olum.mkElm(`div`,`WhyYoullLoveIt`,`brk9l6nqvjl`),s={items:n.items,heading:n.heading},c={__style__(){return``},methods:{},props:{},compName:`WhyYoullLoveIt`,deps:null,components:{Icon:Y},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <section class="mt-12">
  <h2 class="mb-4 text-lg font-semibold text-foreground">${olum.esc(a)}</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    ${n.items.map(function(e){return`
      <div class="rounded-xl border border-border p-5" key="${olum.esc(e.title)}">
        <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:e.icon,class:`mb-3 size-5 text-brand`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.title)}"></olum>
        <div class="mb-1 text-sm font-medium text-foreground">${olum.esc(e.title)}</div>
        <p class="text-sm text-muted-foreground">${olum.esc(e.desc)}</p>
      </div>
    `}).join(``)}
  </div>
</section>`,olum.injectStyle(`WhyYoullLoveIt`,c.__style__()),olum.handleMarkup(`WhyYoullLoveIt`,`brk9l6nqvjl`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ht=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7m7 7H5"/></svg>`,gt=e=>{let t=e||`FeaturePager`,n=l(t),{active:r}=l(t),i=()=>at.findIndex(e=>e.slug===n.active),a=()=>at[i()-1],o=()=>at[i()+1];var s=olum.mkElm(`div`,`FeaturePager`,`6c8sg6p90bd`),c={active:n.active,index:i,prev:a,next:o},u={__style__(){return``},methods:{},props:{},compName:`FeaturePager`,deps:null,components:{Anchor:qe,Icon:Y},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div class="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
  <div class="min-w-0 flex-1">
    ${a()?`
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:a().to,variant:`outline`,class:`h-auto flex-col items-start gap-0.5 px-4 py-2.5`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!a())}'>
        <span class="flex items-center gap-1.5 text-xs text-muted-foreground">
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ht,class:`size-3`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!a())}'></olum>
          Previous
        </span>
        <span class="font-medium text-foreground">${olum.esc(a()?a().title:``)}</span>
      </olum>
    `:``}
  </div>

  <div class="hidden items-center gap-1.5 sm:flex">
    ${at.map(function(e){return`
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:e.to,ariaLabel:e.title,class:`h-auto w-auto border-transparent bg-transparent p-1 hover:bg-transparent`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.slug)}">
        <span class="block rounded-full transition-all ${olum.esc(e.slug===n.active?`size-2 bg-brand`:`size-1.5 bg-muted-foreground/30`)}"></span>
      </olum>
    `}).join(``)}
  </div>

  <div class="min-w-0 flex-1 text-right">
    ${o()?`
      <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:o().to,variant:`outline`,class:`h-auto flex-col items-end gap-0.5 px-4 py-2.5`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!o())}'>
        <span class="flex items-center gap-1.5 text-xs text-muted-foreground">
          Next
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:it,class:`size-3`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!o())}'></olum>
        </span>
        <span class="font-medium text-foreground">${olum.esc(o()?o().title:``)}</span>
      </olum>
    `:``}
  </div>
</div>`,olum.injectStyle(`FeaturePager`,u.__style__()),olum.handleMarkup(`FeaturePager`,`6c8sg6p90bd`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},_t=e=>{let t=e||`Input`,n=l(t),{type:r=`text`,class:i=``,disabled:a=!1,required:o=!1,readonly:s=!1,autofocus:c=!1,invalid:u=!1,placeholder:d,value:f,name:p,id:m,oninput:h,onchange:g,onfocus:_,onblur:v,slot:y=`input`}=l(t),b=`flex h-8 w-full min-w-0 rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`,x=()=>q(b,n.class===void 0?``:n.class),S=e=>n.oninput&&n.oninput(e),C=e=>n.onchange&&n.onchange(e),w=e=>n.onfocus&&n.onfocus(e),T=e=>n.onblur&&n.onblur(e);var E=olum.mkElm(`div`,`Input`,`iw45jdz6xk`),D={type:n.type===void 0?`text`:n.type,className:n.class===void 0?``:n.class,disabled:n.disabled!==void 0&&n.disabled,required:n.required!==void 0&&n.required,readonly:n.readonly!==void 0&&n.readonly,autofocus:n.autofocus!==void 0&&n.autofocus,invalid:n.invalid!==void 0&&n.invalid,placeholder:n.placeholder,value:n.value,name:n.name,id:n.id,oninput:n.oninput,onchange:n.onchange,onfocus:n.onfocus,onblur:n.onblur,slot:n.slot===void 0?`input`:n.slot,classes:x,handleInput:S,handleChange:C,handleFocus:w,handleBlur:T},O={__style__(){return``},methods:{},props:{},compName:`Input`,deps:null,components:{},get getElm(){var e=E.isConnected?olum.vdom.mkStaging(E):E;return e.innerHTML=`
      <input data-slot="${olum.esc(n.slot===void 0?`input`:n.slot)}" type="${olum.esc(n.type===void 0?`text`:n.type)}" class="${olum.esc(x())}" placeholder="${olum.esc(n.placeholder)}" value="${olum.esc(n.value)}" name="${olum.esc(n.name)}" id="${olum.esc(n.id)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} ${n.required!==void 0&&n.required?`required`:``} ${n.readonly!==void 0&&n.readonly?`readonly`:``} ${n.autofocus!==void 0&&n.autofocus?`autofocus`:``} aria-invalid="${olum.esc(n.invalid!==void 0&&n.invalid)}" data-o-event='onblur|handleBlur=${JSON.stringify([])}OLUM_EVT_SEPonchange|handleChange=${JSON.stringify([])}OLUM_EVT_SEPonfocus|handleFocus=${JSON.stringify([])}OLUM_EVT_SEPoninput|handleInput=${JSON.stringify([])}'>`,olum.injectStyle(`Input`,O.__style__()),olum.handleMarkup(`Input`,`iw45jdz6xk`,e,D)}};return{methods:O.methods,props:O.props,__OLUM__:O,el:E,methodsRef:D,stateProps:null,localsRef:{get base(){return b}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},vt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,yt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/></svg>`,bt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>`,xt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m16 3 4 4-4 4m4-4H4m4 14-4-4 4-4m-4 4h16"/></svg>`,St=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>`,Ct=e=>{let t=e||`page`;var n={text:``,bio:``,n:0,agree:!1,size:2,color:`red`,fruits:[],fileNames:[],log:[]};let r=e=>n.log=[e,...n.log].slice(0,6),i=e=>{n.text=e.target.value,r(`text → "${n.text}"`)},a=e=>n.size=e,o=e=>{n.fruits=Array.from(e.target.options).filter(e=>e.selected).map(e=>e.value)},s=e=>{n.fileNames=Array.from(e.target.files).map(e=>e.name)},c=()=>JSON.stringify({text:n.text,bio:n.bio,n:n.n,agree:n.agree,size:n.size,color:n.color,fruits:n.fruits,fileNames:n.fileNames},null,2),l=[`value reads from state.text; oninput writes it back — that's the whole binding.`,`No compiler magic: it's a real DOM value attribute and a real event listener.`,`The same pattern casts numbers with +, reads checked, or reads selected options.`,`Every keystroke here is logged below — see the Console tab.`],u=[{icon:yt,title:`No Directive Magic`,desc:`No v-model or ng-model — just an attribute plus a handler.`},{icon:bt,title:`Read The Platform`,desc:`Native DOM events power every binding, nothing proprietary.`},{icon:xt,title:`Cast What You Need`,desc:`+e.target.value, e.target.checked — plain JavaScript.`},{icon:St,title:`Works Everywhere`,desc:`Text, checkbox, radio, select, multi-select, file — one pattern.`}],d=e=>e.preventDefault(),f=e=>n.bio=e.target.value,p=e=>n.n=+e.target.value,m=e=>n.agree=e.target.checked,h=e=>n.color=e.target.value;var g=olum.mkElm(`div`,`page`,`18bcgd0tv1o`),_={logEvent:r,setText:i,setSize:a,setFruits:o,setFiles:s,preview:c,__olumAnon_nwzrfpw:d,__olumAnon_o835lb3:f,__olumAnon_9aq2xgt:p,__olumAnon_rp53dsu:m,__olumAnon_o7qg2m9:h},v={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,Input:_t},get getElm(){var e=g.isConnected?olum.vdom.mkStaging(g):g;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`binding`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:5,icon:vt,title:`Binding`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">Two-way binding, without a model directive</p>
    <p class="mt-2">Olum has no <code class="rounded bg-muted px-1 py-0.5 text-sm">model</code> directive — every binding is a value-ish attribute reading state plus an event handler writing it back.</p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`Binding.ulum`,code:`<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">input</span>
  <span class="text-sky-600 dark:text-sky-400">value</span>=<span class="text-amber-600 dark:text-amber-400">{state.text}</span>
  <span class="text-sky-600 dark:text-sky-400">oninput</span>=<span class="text-amber-600 dark:text-amber-400">"(e) =&gt; state.text = e.target.value"</span>
<span class="text-muted-foreground">/&gt;</span>

<span class="text-muted-foreground">// no v-model / ng-model — a value-ish attribute reading</span>
<span class="text-muted-foreground">// state, plus an event handler writing it back.</span>
<span class="text-muted-foreground">// checkboxes read e.target.checked, numbers cast with +,</span>
<span class="text-muted-foreground">// selects flip an "selected" attribute per &lt;option&gt;.</span>`,consoleLines:n.log})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:log" data-o-props-owner='${t}'>
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">Text input</span>
        <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({type:`text`,value:n.text,placeholder:`type something`,class:`h-9`})).replace(/'/g,`%27`)}' data-o-props-src="value:state:text|oninput:method:setText" data-o-props-owner='${t}'></olum>
      </label>
      <p class="mt-3 text-sm text-muted-foreground">state.text is now <strong class="text-foreground">"${olum.esc(n.text)}"</strong></p>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:l})).replace(/'/g,`%27`)}'></olum>
  </div>

  <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
    <form class="flex flex-col gap-5 rounded-xl border border-border p-6" data-o-event='onsubmit|__olumAnon_nwzrfpw=${JSON.stringify([`$event`])}'>
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">Textarea</span>
        <textarea rows="3" placeholder="a longer answer" class="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_o835lb3=${JSON.stringify([`$event`])}'>${olum.esc(n.bio)}</textarea>
      </label>

      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">Number (cast with +)</span>
        <input type="number" value="${olum.esc(n.n)}" class="h-9 w-32 rounded-lg border border-border bg-background px-3 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_9aq2xgt=${JSON.stringify([`$event`])}'>
      </label>

      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" ${n.agree?`checked`:``} class="size-4 rounded border-border" data-o-event='onchange|__olumAnon_rp53dsu=${JSON.stringify([`$event`])}'>
        <span class="font-medium text-foreground">Checkbox — I agree</span>
      </label>

      <fieldset class="flex flex-col gap-1.5 text-sm">
        <legend class="mb-1 font-medium text-foreground">Radio group — scoops</legend>
        ${[,,,].fill().map(function(e,t){return e=t+1,`
          <label class="flex items-center gap-2">
            <input type="radio" name="scoops" ${n.size===e?`checked`:``} class="size-4" data-o-event='onchange|setSize=${JSON.stringify([e])}'>
            <span>${olum.esc(e)} scoop${olum.esc(e>1?`s`:``)}</span>
          </label>
        `}).join(``)}
      </fieldset>

      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">Select — selected on &lt;option&gt;</span>
        <select class="h-9 rounded-lg border border-border bg-background px-3" data-o-event='onchange|__olumAnon_o7qg2m9=${JSON.stringify([`$event`])}'>
          <option value="red" ${n.color===`red`?`selected`:``}>red</option>
          <option value="green" ${n.color===`green`?`selected`:``}>green</option>
          <option value="blue" ${n.color===`blue`?`selected`:``}>blue</option>
        </select>
      </label>

      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">Select multiple</span>
        <select multiple="" class="h-24 rounded-lg border border-border bg-background px-3 py-1" data-o-event='onchange|setFruits=${JSON.stringify([`$event`])}'>
          <option value="apple">apple</option>
          <option value="banana">banana</option>
          <option value="cherry">cherry</option>
          <option value="date">date</option>
        </select>
      </label>

      <label class="flex flex-col gap-1.5 text-sm">
        <span class="font-medium text-foreground">File input</span>
        <input type="file" multiple="" class="text-sm" data-o-event='onchange|setFiles=${JSON.stringify([`$event`])}'>
      </label>
    </form>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-3 text-sm font-medium text-foreground">Live state</h2>
      <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs">${olum.esc(c())}</pre>
    </div>
  </div>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:u})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`binding`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,v.__style__()),olum.handleMarkup(`page`,`18bcgd0tv1o`,e,_)}};return n.__olum__={compName:t,compId:`18bcgd0tv1o`},n=olum.proxyHandler(n,null,g),{methods:v.methods,props:v.props,__OLUM__:v,el:g,methodsRef:_,stateProps:n,localsRef:{get happening(){return l},get loveItems(){return u}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},wt=e=>{let t=e||`Badge`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:size-3!`,s={default:`bg-primary text-primary-foreground [a]:hover:bg-primary/80`,secondary:`bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80`,destructive:`bg-destructive/10 text-destructive focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20`,outline:`border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground`,ghost:`hover:bg-muted hover:text-muted-foreground`,link:`text-primary underline-offset-4 hover:underline`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`Badge`,`risjxdns7z`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`Badge`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <span class="${olum.esc(c())}">${n.children}</span>`,olum.injectStyle(`Badge`,f.__style__()),olum.handleMarkup(`Badge`,`risjxdns7z`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Tt=[{slug:`hello-olum`,title:`Hello, Olum`,date:`2026-01-12`,excerpt:`Why components are just .html files, and what that buys you.`,body:`Olum compiles a single .html file — script, scoped style, template — into a small JS module. No JSX, no virtual DOM sync to reason about beyond diff-patching, no build-your-own-router. The file tree *is* the route table.`},{slug:`reactivity-model`,title:`The reactivity model, in one paragraph`,date:`2026-02-03`,excerpt:"Only `state` is tracked. Mutate it, deeply, and the DOM patches itself.",body:"Declare `const state = { ... }` as a literal object and every read inside the template subscribes to it. Deep mutations — nested objects, arrays, Map, Set — all trigger a microtask-batched re-render that diff-patches the DOM in place, so focus, scroll position, and playing media survive."},{slug:`state-props-store`,title:`Choosing between state, props, and the store`,date:`2026-03-18`,excerpt:`Local first, one level down is props, shared or long-lived is the store.`,body:`state dies with the component. props flow one level down and re-render with the parent. The store is zustand-style shared state that survives route changes — components subscribe just by reading it. Prop-drilling through a component that doesn't use the prop is the signal to move it to a store.`},{slug:`compiler-internals`,title:`What the compiler actually does`,date:`2026-04-22`,excerpt:`A real HTML AST, a real JS AST, and a browser runtime that diff-patches.`,body:`Templates parse through parse5, component JS through acorn — interpolation and codegen still involve regex passes over serialized markup, so it's robust for common cases and fragile at some edges. The output is a plain JS module per component; the runtime builds and diff-patches the DOM from it.`}],Et=e=>Tt.find(t=>t.slug===e),Dt=e=>{let{slug:t}=c(`/home/eissapk/olum/playground/node_modules/olum-compiler/src/blog/[slug]/page.html`,location.pathname),n=Et(t);var r=olum.mkElm(`div`,`page`,`odir6a8g4dp`),i={slug:t},a={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Anchor:qe,Badge:wt},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`router`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 max-w-3xl flex-1 px-6 py-12 lg:px-10">
  
  <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/blog`,variant:`ghost`,size:`sm`,class:`mb-6`})).replace(/'/g,`%27`)}'>← Back to blog</olum>

  ${n?`
    <article>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,class:`mb-3`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!n)}'>${olum.esc(n.date)}</olum>
      <h1 class="mb-4 font-heading text-3xl font-semibold text-foreground">${olum.esc(n.title)}</h1>
      <p class="text-lg leading-relaxed text-muted-foreground">${olum.esc(n.body)}</p>
    </article>
  `:`
    <div class="rounded-xl border border-dashed border-border p-10 text-center">
      <p class="font-medium text-foreground">No post at "${olum.esc(t)}"</p>
      <p class="mt-1 text-sm text-muted-foreground">It might have been renamed or never existed.</p>
    </div>
  `}
  
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,a.__style__()),olum.handleMarkup(`page`,`odir6a8g4dp`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ot=e=>{let t=e||`Card`,n=l(t),{size:r=`default`,class:i=``,children:a}=l(t),o=`group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-background py-(--card-spacing) text-sm text-foreground ring-1 ring-border [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 [&>img:first-child]:rounded-t-xl [&>img:last-child]:rounded-b-xl`,s=()=>q(o,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Card`,`tsiotmod0ks`),u={size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Card`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="card" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`Card`,d.__style__()),olum.handleMarkup(`Card`,`tsiotmod0ks`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{get base(){return o}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},kt=e=>{let t=e||`CardHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) [&>*:has([data-slot=card-action])]:col-start-2 [&>*:has([data-slot=card-action])]:row-span-2 [&>*:has([data-slot=card-action])]:row-start-1 [&>*:has([data-slot=card-action])]:self-start [&>*:has([data-slot=card-action])]:justify-self-end`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardHeader`,`b2wsaloie0u`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardHeader`,c.__style__()),olum.handleMarkup(`CardHeader`,`b2wsaloie0u`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},At=e=>{let t=e||`CardTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardTitle`,`0co494l4mwyb`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardTitle`,c.__style__()),olum.handleMarkup(`CardTitle`,`0co494l4mwyb`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},jt=e=>{let t=e||`CardDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardDescription`,`blelecv1qn`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardDescription`,c.__style__()),olum.handleMarkup(`CardDescription`,`blelecv1qn`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Mt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,Nt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Zm0 11a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1ZM3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/></svg>`,Pt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 1 1 0 10h-2m-7-5h8"/></svg>`,Ft=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m10.586 5.414-5.172 5.172m13.172 2.828-5.172 5.172M6 12h12"/><circle cx="12" cy="20" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="12" r="2"/></svg>`,It=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 15 6-6"/></svg>`,Lt=e=>{let t=[`Every src/**/page.html becomes a route at the matching URL, no config.`,`A [slug] folder segment becomes a dynamic route param.`,`Multiple dynamic segments can chain in one path, like /match/[slug]/[id].`,`Click a post below to navigate to its dynamic detail route.`],n=[{icon:Nt,title:`File-Based Routes`,desc:`The folder structure under src/ is the route tree.`},{icon:Pt,title:`Dynamic Segments`,desc:`[slug] folders become route params, extracted automatically.`},{icon:Ft,title:`Multi-Segment Routes`,desc:`Chain several dynamic parts, like /match/[slug]/[id].`},{icon:It,title:`No Config`,desc:`No route table to write or keep in sync by hand.`}];var r=olum.mkElm(`div`,`page`,`o5hnyxqefa8`),i={},a={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,Card:Ot,CardHeader:kt,CardTitle:At,CardDescription:jt,Badge:wt},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`router`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:8,icon:Mt,title:`Router`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">File-based routing, dynamic [slug] params</p>
    <p class="mt-2">This list lives at <code class="rounded bg-muted px-1.5 py-0.5 text-sm">src/blog/page.html</code>, each post at the dynamic route <code class="rounded bg-muted px-1.5 py-0.5 text-sm">src/blog/[slug]/page.html</code>.</p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`routes`,code:`<span class="text-muted-foreground">src/</span>
  blog/
    <span class="text-rose-600 dark:text-rose-400">page.html</span>          <span class="text-muted-foreground">// /blog</span>
    <span class="text-sky-600 dark:text-sky-400">[slug]</span>/
      <span class="text-rose-600 dark:text-rose-400">page.html</span>        <span class="text-muted-foreground">// /blog/:slug</span>
  match/
    <span class="text-sky-600 dark:text-sky-400">[slug]</span>/<span class="text-sky-600 dark:text-sky-400">[id]</span>/
      <span class="text-rose-600 dark:text-rose-400">page.html</span>        <span class="text-muted-foreground">// /match/:slug/:id</span>

<span class="text-muted-foreground">// the folder structure IS the route tree</span>`})).replace(/'/g,`%27`)}'>
      <div class="flex flex-col gap-3">
        ${Tt.map(function(e){return`
          
          <olum name="Card" data-o-props='${encodeURIComponent(JSON.stringify({class:`relative transition-colors hover:ring-brand/40`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.slug)}">
            <olum name="CardHeader" data-o-key="${olum.esc(e.slug)}">
              <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,class:`mb-1 w-fit`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.slug)}">${olum.esc(e.date)}</olum>
              <olum name="CardTitle" data-o-key="${olum.esc(e.slug)}">${olum.esc(e.title)}</olum>
              <olum name="CardDescription" data-o-key="${olum.esc(e.slug)}">${olum.esc(e.excerpt)}</olum>
            </olum>
            <a to="/blog/${olum.esc(e.slug)}" class="absolute inset-0" aria-label="${olum.esc(e.title)}"></a>
          </olum>
        `}).join(``)}
      </div>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:t})).replace(/'/g,`%27`)}'></olum>
  </div>

  <p class="mt-6 text-sm text-muted-foreground">One dynamic segment isn't the whole story — <a to="/match/premier-league/1042" class="text-brand underline underline-offset-2">/match/[slug]/[id]</a> shows two segments in the same route.</p>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:n})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`router`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,a.__style__()),olum.handleMarkup(`page`,`o5hnyxqefa8`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{get happening(){return t},get loveItems(){return n}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Rt=e=>{let t=e||`StatusBadge`,n=l(t),{label:r,color:i=`#16a34a`}=l(t);var a=olum.mkElm(`div`,`StatusBadge`,`81ro83z3kcd`),o={label:n.label,color:n.color===void 0?`#16a34a`:n.color},s={__style__(){return``},methods:{},props:{},compName:`StatusBadge`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <span class="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground">
  <span class="size-1.5 rounded-full" style="background:${olum.esc(n.color===void 0?`#16a34a`:n.color)}"></span>
  ${olum.esc(n.label)}
</span>`,olum.injectStyle(`StatusBadge`,s.__style__()),olum.handleMarkup(`StatusBadge`,`81ro83z3kcd`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},zt=e=>{let t=e||`CounterCard`,n=l(t),{value:r,onChange:i}=l(t),a=()=>n.onChange(n.value+1);var o=olum.mkElm(`div`,`CounterCard`,`0prtlu1gc0tn`),s={value:n.value,onChange:n.onChange,bump:a},c={__style__(){return``},methods:{value:n.value,onChange:n.onChange,bump:a},props:{},compName:`CounterCard`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div class="flex items-center gap-3 rounded-lg border border-border p-3">
  <span class="text-2xl font-semibold tabular-nums text-foreground">${olum.esc(n.value)}</span>
  <button type="button" class="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/80" data-o-event='onclick|bump=${JSON.stringify([])}'>
    +1
  </button>
</div>`,olum.injectStyle(`CounterCard`,c.__style__()),olum.handleMarkup(`CounterCard`,`0prtlu1gc0tn`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Bt=e=>{let t=e||`Box`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`Box`,`u6j5dkpx42s`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`Box`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div class="rounded-lg border border-dashed border-border p-4 text-sm">
  ${n.children?`${n.children}`:`<em class="text-muted-foreground">no content</em>`}
  
</div>`,olum.injectStyle(`Box`,o.__style__()),olum.handleMarkup(`Box`,`u6j5dkpx42s`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>`,Ht=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17V3m-6 8 6 6 6-6m1 10H5"/></svg>`,Ut=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m18 9-6-6-6 6m6-6v14m-7 4h14"/></svg>`,Wt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>`,Gt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44m-2.875 6.493 4.332-.924M16 21l-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455zM6.158 8.633l1.114 4.456M8 21l3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg>`,Kt=e=>{let t=e||`page`;var n={score:0,log:[],inspection:null};let r=e=>n.log=[e,...n.log].slice(0,6),i=e=>{n.score=e,r(`onChange fired → score is now ${e}`)},a=()=>{let e=d(`CounterCard`);n.inspection=e?{props:e.props,methods:Object.keys(e.methods||{})}:null},o=()=>{let e=d(`CounterCard`);e&&e.methods.bump&&e.methods.bump()},s=[`CounterCard receives value as a read-only prop.`,`Its +1 button calls the onChange callback instead of mutating value.`,`The parent's setScore updates state.score, which flows back down.`,`Every callback firing is logged below — see the Console tab.`],c=[{icon:Ht,title:`One-Way Props`,desc:`Data flows down, read-only, so state stays predictable.`},{icon:Ut,title:`Callback Props`,desc:`Changes flow back up by calling a function the parent owns.`},{icon:Wt,title:`Real Slots`,desc:`Nested markup arrives as children, no special syntax.`},{icon:Gt,title:`scope() Escape Hatch`,desc:`Read a mounted component's public props and methods when you need to.`}];var l=olum.mkElm(`div`,`page`,`1yqh9n0o5s1j`),u={logEvent:r,setScore:i,inspect:a,bumpViaScope:o},f={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,StatusBadge:Rt,CounterCard:zt,Box:Bt},get getElm(){var e=l.isConnected?olum.vdom.mkStaging(l):l;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`composition`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:3,icon:Vt,title:`Composition`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">Props, callback props, slots & scope()</p>
    <p class="mt-2">
      Props (one-way, read-only), callback props for changes flowing back up, slots via <code class="rounded bg-muted px-1 py-0.5 text-sm">children</code>,
      and reading a mounted component's public surface with <code class="rounded bg-muted px-1 py-0.5 text-sm">scope()</code>.
    </p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`Composition.ulum`,code:`<span class="text-muted-foreground">// parent owns the state</span>
<span class="text-brand">const</span> state = { score: <span class="text-amber-600 dark:text-amber-400">0</span> };
<span class="text-brand">const</span> setScore = (v) =&gt; state.score = v;

<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">CounterCard</span>
  <span class="text-sky-600 dark:text-sky-400">value</span>=<span class="text-amber-600 dark:text-amber-400">{state.score}</span>
  <span class="text-sky-600 dark:text-sky-400">onChange</span>=<span class="text-amber-600 dark:text-amber-400">{setScore}</span>
<span class="text-muted-foreground">/&gt;</span>

<span class="text-muted-foreground">// CounterCard never mutates value itself —</span>
<span class="text-muted-foreground">// it calls onChange(value + 1) and asks the parent to.</span>`,consoleLines:n.log})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:log" data-o-props-owner='${t}'>
      <div class="flex flex-col items-start gap-3">
        <olum name="CounterCard" data-o-props='${encodeURIComponent(JSON.stringify({value:n.score})).replace(/'/g,`%27`)}' data-o-props-src="value:state:score|onChange:method:setScore" data-o-props-owner='${t}'></olum>
        <p class="text-sm text-muted-foreground">Parent's state.score is now <strong class="text-foreground">${olum.esc(n.score)}</strong>.</p>
      </div>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:s})).replace(/'/g,`%27`)}'></olum>
  </div>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Props</h2>
    <p class="mb-4 text-sm text-muted-foreground">StatusBadge takes plain <code class="rounded bg-muted px-1 py-0.5 text-sm">label</code> / <code class="rounded bg-muted px-1 py-0.5 text-sm">color</code> props — a literal string vs. an interpolated value passed straight through.</p>
    <div class="flex flex-wrap gap-3 rounded-xl border border-border p-6">
      <olum name="StatusBadge" data-o-props='${encodeURIComponent(JSON.stringify({label:`Online`,color:`#16a34a`})).replace(/'/g,`%27`)}'></olum>
      <olum name="StatusBadge" data-o-props='${encodeURIComponent(JSON.stringify({label:`Building`,color:`#ca8a04`})).replace(/'/g,`%27`)}'></olum>
      <olum name="StatusBadge" data-o-props='${encodeURIComponent(JSON.stringify({label:`Offline`,color:`#dc2626`})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Slots — children</h2>
    <p class="mb-4 text-sm text-muted-foreground">Content between a component's tags arrives as <code class="rounded bg-muted px-1 py-0.5 text-sm">children</code>; <code class="rounded bg-muted px-1 py-0.5 text-sm">Box</code> falls back to placeholder text when the parent passes nothing.</p>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <olum name="Box">
        <p class="text-foreground">Hello from the parent's markup — this is raw <code>children</code>.</p>
      </olum>
      <olum name="Box"></olum>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">scope() — reading a mounted component's public surface</h2>
    <p class="mb-4 text-sm text-muted-foreground">
      CounterCard's script is tagged <code class="rounded bg-muted px-1 py-0.5 text-sm">public-props public-methods</code>. <code class="rounded bg-muted px-1 py-0.5 text-sm">scope("CounterCard")</code> reads its live props and lets us call its
      exposed <code class="rounded bg-muted px-1 py-0.5 text-sm">bump</code> method directly, as an escape hatch (the store is the preferred way to share state).
    </p>
    <div class="flex flex-col gap-3 rounded-xl border border-border p-6">
      <div class="flex flex-wrap gap-2">
        <button type="button" class="h-8 rounded-lg border border-border px-3 text-sm hover:bg-muted" data-o-event='onclick|inspect=${JSON.stringify([])}'>Inspect via scope()</button>
        <button type="button" class="h-8 rounded-lg border border-border px-3 text-sm hover:bg-muted" data-o-event='onclick|bumpViaScope=${JSON.stringify([])}'>Call bump() via scope()</button>
      </div>
      ${n.inspection?`
        <pre class="overflow-x-auto rounded-lg bg-muted p-3 text-xs">${olum.esc(JSON.stringify(n.inspection,null,2))}</pre>
      `:``}
    </div>
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:c})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`composition`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,f.__style__()),olum.handleMarkup(`page`,`1yqh9n0o5s1j`,e,u)}};return n.__olum__={compName:t,compId:`1yqh9n0o5s1j`},n=olum.proxyHandler(n,null,l),{methods:f.methods,props:f.props,__OLUM__:f,el:l,methodsRef:u,stateProps:n,localsRef:{get happening(){return s},get loveItems(){return c}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M16 3h5v5M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3m12 6 6-6"/></svg>`,Jt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m-5 4a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/><circle cx="12" cy="12" r="1"/></svg>`,Yt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5h10m-10 7h10m-10 7h10M4 4h1v5M4 9h2m.5 11H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"/></svg>`,Xt=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1m8 0h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,Zt=e=>{let t=e||`page`;var n={tab:`a`,log:[],showText:``,ifText:``,showOpen:!0,ifOpen:!0,todos:[{id:1,text:`Ship the router demo`,done:!1},{id:2,text:`Ship the store demo`,done:!0}],nextId:3,newTodo:``,settings:{theme:`dark`,locale:`en-US`,notifications:!0}};let r=e=>n.log=[e,...n.log].slice(0,6),i=e=>{n.tab=e,r(`switched to tab "${e}"`)},a=()=>i(`a`),o=()=>i(`b`),s=()=>i(`c`),c=()=>n.showOpen=!n.showOpen,l=()=>n.ifOpen=!n.ifOpen,u=()=>{n.newTodo.trim()&&(n.todos.push({id:n.nextId++,text:n.newTodo.trim(),done:!1}),n.newTodo=``)},d=e=>{let t=n.todos.findIndex(t=>t.id===e);t!==-1&&n.todos.splice(t,1)},f=e=>{let t=n.todos.find(t=>t.id===e);t&&(t.done=!t.done)},p=`h-8 rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted`,m=`h-8 rounded-md border border-transparent bg-primary px-3 text-sm text-primary-foreground`,h=[`The active branch mounts fresh; the others are removed from the DOM entirely.`,`Switching branches re-runs the matched block from scratch.`,`Only one of if / else-if / else is ever in the DOM at a time.`,`Every tab switch is logged below — see the Console tab.`],g=[{icon:yt,title:`Zero Boilerplate`,desc:`if / else-if / else read like plain conditionals.`},{icon:Jt,title:`State-Aware`,desc:`<show> preserves state; <if> resets it on remount.`},{icon:Yt,title:`Keyed Loops`,desc:`Reorders and removals match by identity, not position.`},{icon:Xt,title:`Flexible Iteration`,desc:`Loop over arrays, numeric ranges, or object keys.`}],_=e=>n.showText=e.target.value,v=e=>n.ifText=e.target.value,y=e=>n.newTodo=e.target.value,b=e=>e.key===`Enter`&&u();var x=olum.mkElm(`div`,`page`,`dsdsc8nhs7h`),S={logEvent:r,setTab:i,selectTabA:a,selectTabB:o,selectTabC:s,toggleShow:c,toggleIf:l,addTodo:u,removeTodo:d,toggleTodo:f,__olumAnon_wq4ry9x:_,__olumAnon_a9cxmzq:v,__olumAnon_drqnl7k:y,__olumAnon_ic235qo:b},C={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,Button:J},get getElm(){var e=x.isConnected?olum.vdom.mkStaging(x):x;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`control-flow`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:2,icon:qt,title:`Control Flow`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">if / else-if / else, show, and keyed for loops</p>
    <p class="mt-2">The template primitives that add, remove, hide, and repeat DOM nodes: <code class="rounded bg-muted px-1 py-0.5 text-sm">&lt;if&gt;</code>, <code class="rounded bg-muted px-1 py-0.5 text-sm">&lt;show&gt;</code>, and <code class="rounded bg-muted px-1 py-0.5 text-sm">&lt;for&gt;</code>.</p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`ControlFlow.ulum`,code:`<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">if</span> <span class="text-sky-600 dark:text-sky-400">when</span>=<span class="text-amber-600 dark:text-amber-400">"state.tab === 'a'"</span><span class="text-muted-foreground">&gt;</span>
  Tab A's content
<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">if</span><span class="text-muted-foreground">&gt;</span>

<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">else-if</span> <span class="text-sky-600 dark:text-sky-400">when</span>=<span class="text-amber-600 dark:text-amber-400">"state.tab === 'b'"</span><span class="text-muted-foreground">&gt;</span>
  Tab B, matched by else-if
<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">else-if</span><span class="text-muted-foreground">&gt;</span>

<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">else</span><span class="text-muted-foreground">&gt;</span>Tab C fallback<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">else</span><span class="text-muted-foreground">&gt;</span>

<span class="text-muted-foreground">// non-matching branches are removed from the DOM,</span>
<span class="text-muted-foreground">// not just hidden</span>`,consoleLines:n.log})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:log" data-o-props-owner='${t}'>
      <div class="flex gap-2">
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:n.tab===`a`?m:p})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:selectTabA" data-o-props-owner='${t}'>Tab A</olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:n.tab===`b`?m:p})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:selectTabB" data-o-props-owner='${t}'>Tab B</olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:n.tab===`c`?m:p})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:selectTabC" data-o-props-owner='${t}'>Tab C</olum>
      </div>
      <div class="mt-4 rounded-lg bg-muted p-4 text-sm text-foreground">
        ${n.tab===`a`?`This is Tab A's content — a plain &lt;if&gt;.`:n.tab===`b`?`Tab B — matched by &lt;else-if&gt;.`:`Tab C, the &lt;else&gt; fallback.`}
        
        
      </div>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:h})).replace(/'/g,`%27`)}'></olum>
  </div>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">show vs if</h2>
    <p class="mb-4 text-sm text-muted-foreground">Type into both inputs, then toggle each panel closed and open again — <code class="rounded bg-muted px-1 py-0.5 text-sm">&lt;show&gt;</code> only flips visibility so your text survives; <code class="rounded bg-muted px-1 py-0.5 text-sm">&lt;if&gt;</code> removes and remounts the node, so it resets.</p>
    <div class="grid grid-cols-1 gap-6 rounded-xl border border-border p-6 md:grid-cols-2">
      <div>
        <div class="mb-2 flex items-center justify-between">
          <span class="text-sm font-medium text-foreground">&lt;show&gt; — preserves state</span>
          <button class="${olum.esc(p)}" data-o-event='onclick|toggleShow=${JSON.stringify([])}'>${olum.esc(n.showOpen?`Hide`:`Show`)}</button>
        </div>
        <div data-o-show="" style="display:${n.showOpen?`contents`:`none`};">
          <input value="${olum.esc(n.showText)}" placeholder="Type, then hide/show…" class="h-8 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_wq4ry9x=${JSON.stringify([`$event`])}'>
        </div>
      </div>
      <div>
        <div class="mb-2 flex items-center justify-between">
          <span class="text-sm font-medium text-foreground">&lt;if&gt; — resets state</span>
          <button class="${olum.esc(p)}" data-o-event='onclick|toggleIf=${JSON.stringify([])}'>${olum.esc(n.ifOpen?`Remove`:`Add`)}</button>
        </div>
        ${n.ifOpen?`
          <input value="${olum.esc(n.ifText)}" placeholder="Type, then remove/add…" class="h-8 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_a9cxmzq=${JSON.stringify([`$event`])}'>
        `:``}
      </div>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Keyed for-loop</h2>
    <p class="mb-4 text-sm text-muted-foreground"><code class="rounded bg-muted px-1 py-0.5 text-sm">key="todo.id"</code> matches items by identity across reorders/removals, not by position.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="flex gap-2">
        <input value="${olum.esc(n.newTodo)}" placeholder="New todo…" class="h-8 flex-1 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_drqnl7k=${JSON.stringify([`$event`])}OLUM_EVT_SEPonkeydown|__olumAnon_ic235qo=${JSON.stringify([`$event`])}'>
        <button class="${olum.esc(m)}" data-o-event='onclick|addTodo=${JSON.stringify([])}'>Add</button>
      </div>
      <ul class="mt-4 space-y-2">
        ${n.todos.map(function(e){return`
          <li class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-sm" key="${olum.esc(e.id)}">
            <input type="checkbox" ${e.done?`checked`:``} class="size-4 accent-primary" data-o-event='onchange|toggleTodo=${JSON.stringify([e.id])}'>
            <span class="flex-1 ${olum.esc(e.done?`text-muted-foreground line-through`:`text-foreground`)}">${olum.esc(e.text)}</span>
            <button class="text-muted-foreground hover:text-destructive" aria-label="Remove" data-o-event='onclick|removeTodo=${JSON.stringify([e.id])}'>✕</button>
          </li>
        `}).join(``)}
      </ul>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Numeric range & object-key loops</h2>
    <p class="mb-4 text-sm text-muted-foreground"><code class="rounded bg-muted px-1 py-0.5 text-sm">each="i of 6"</code> counts 1→6; <code class="rounded bg-muted px-1 py-0.5 text-sm">each="key in obj"</code> walks an object's keys.</p>
    <div class="grid grid-cols-1 gap-6 rounded-xl border border-border p-6 md:grid-cols-2">
      <div>
        <div class="mb-2 text-sm font-medium text-foreground">for i of 6</div>
        <div class="flex flex-wrap gap-2">
          ${[,,,,,,].fill().map(function(e,t){return e=t+1,`
            <span class="flex size-8 items-center justify-center rounded-md bg-muted text-sm font-medium text-foreground">${olum.esc(e)}</span>
          `}).join(``)}
        </div>
      </div>
      <div>
        <div class="mb-2 text-sm font-medium text-foreground">for (key, index, value) in settings</div>
        <ul class="space-y-1 text-sm text-muted-foreground">
          ${Object.keys(n.settings).map(function(e,t,r){return r=n.settings[e],`
            <li><span class="font-mono text-xs text-foreground">${olum.esc(t)}. ${olum.esc(e)}</span> = ${olum.esc(String(r))}</li>
          `}).join(``)}
        </ul>
      </div>
    </div>
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:g})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`control-flow`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,C.__style__()),olum.handleMarkup(`page`,`dsdsc8nhs7h`,e,S)}};return n.__olum__={compName:t,compId:`dsdsc8nhs7h`},n=olum.proxyHandler(n,null,x),{methods:C.methods,props:C.props,__OLUM__:C,el:x,methodsRef:S,stateProps:n,localsRef:{get btn(){return p},get btnActive(){return m},get happening(){return h},get loveItems(){return g}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qt=e=>{let t=e||`LifecycleLogger`,n=l(t),{onLog:r}=l(t);var i=o(()=>(n.onLog(`mounted`),()=>n.onLog(`unmounted`))),a=olum.mkElm(`div`,`LifecycleLogger`,`629jo0e1dcq`),s={onLog:n.onLog},c={__style__(){return``},methods:{},props:{},compName:`LifecycleLogger`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div class="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
  I'm alive — toggle the switch above to mount/unmount me and watch the log.
</div>`,olum.injectStyle(`LifecycleLogger`,c.__style__()),olum.handleMarkup(`LifecycleLogger`,`629jo0e1dcq`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:a,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:i===void 0?null:i,unMounted:null,isMounted:!1,isUnMounted:!1}}},$t=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,en=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21m-7.752-9.91 8.828 8.828"/></svg>`,tn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M14 4.1 12 6M5.1 8l-2.9-.8M6 12l-1.9 2M7.2 2.2 8 5.1m1.037 4.59a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>`,nn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 13v8l-4-4m4 4 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/></svg>`,rn=e=>{let t=e||`page`;var n={photos:[],seconds:0,lastKey:`—`,showLogger:!0,log:[]};let r=e=>n.log=[`${new Date().toLocaleTimeString()} — ${e}`,...n.log].slice(0,6),i=()=>n.showLogger=!n.showLogger;var a=o(async()=>{let e=await fetch(`/photos.json`);n.photos=await e.json();let t=setInterval(()=>n.seconds++,1e3),r=e=>n.lastKey=e.key;window.addEventListener(`keydown`,r);let i=u.querySelector(`[data-ref="highlight-target"]`);return i&&i.focus(),()=>{clearInterval(t),window.removeEventListener(`keydown`,r)}});let s=[`onMount runs once, right after LifecycleLogger is added to the DOM.`,`Its returned function is the cleanup — it runs right before unmount.`,`Toggling below adds/removes the whole component, firing both edges.`,`Every mount and unmount is logged — see the Console tab.`],c=[{icon:$t,title:`Single Hook`,desc:`onMount is the one lifecycle primitive you need.`},{icon:en,title:`Cleanup Built In`,desc:`Return a function from onMount and it runs automatically on unmount.`},{icon:tn,title:`host as Ref`,desc:`No bind:this — host.querySelector reaches your own root.`},{icon:nn,title:`Async-Friendly`,desc:`onMount callbacks can be async; awaited fetches just work.`}];var l=olum.mkElm(`div`,`page`,`fe84dkjq2wd`),u=l,d={appendLog:r,toggleLogger:i},f={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,LifecycleLogger:Qt,Button:J},get getElm(){var e=l.isConnected?olum.vdom.mkStaging(l):l;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`lifecycle`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:4,icon:$t,title:`Lifecycle`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">onMount, cleanup & the host ref</p>
    <p class="mt-2">
      <code class="rounded bg-muted px-1 py-0.5 text-sm">onMount</code> — async fetch, timers, global listeners, and <code class="rounded bg-muted px-1 py-0.5 text-sm">host</code> as
      the ref mechanism, each cleaned up in the returned function.
    </p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`Lifecycle.ulum`,code:`<span class="text-brand">im</span><span class="text-brand">port</span> { onMount } <span class="text-brand">from</span> <span class="text-amber-600 dark:text-amber-400">"olum"</span>;

onMount(() =&gt; {
  <span class="text-muted-foreground">// runs once, right after this mounts</span>
  onLog(<span class="text-amber-600 dark:text-amber-400">"mounted"</span>);

  <span class="text-muted-foreground">// the returned function is the cleanup</span>
  <span class="text-brand">return</span> () =&gt; onLog(<span class="text-amber-600 dark:text-amber-400">"unmounted"</span>);
});`,consoleLines:n.log})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:log" data-o-props-owner='${t}'>
      <div>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`,class:`mb-3`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toggleLogger" data-o-props-owner='${t}'>
          ${olum.esc(n.showLogger?`Unmount`:`Mount`)} LifecycleLogger
        </olum>
        ${n.showLogger?`
          <olum name="LifecycleLogger" data-o-props-src="onLog:method:appendLog" data-o-props-owner='${t}' if='${JSON.stringify(!!n.showLogger)}'></olum>
        `:``}
      </div>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:s})).replace(/'/g,`%27`)}'></olum>
  </div>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Async fetch in onMount</h2>
    <p class="mb-4 text-sm text-muted-foreground">Fetches <code class="rounded bg-muted px-1 py-0.5 text-sm">/photos.json</code> from <code class="rounded bg-muted px-1 py-0.5 text-sm">public/</code> once, on mount.</p>
    <div class="rounded-xl border border-border p-6">
      ${n.photos.length===0?`
        <p class="text-sm text-muted-foreground">Loading…</p>
      `:`
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          ${n.photos.map(function(e){return`
            <figure class="flex flex-col items-center gap-1.5" key="${olum.esc(e.id)}">
              <img src="${olum.esc(e.url)}" alt="${olum.esc(e.title)}" class="size-16 rounded-lg object-cover ring-1 ring-border">
              <figcaption class="text-center text-xs text-muted-foreground">${olum.esc(e.title)}</figcaption>
            </figure>
          `}).join(``)}
        </div>
      `}
      
    </div>
  </section>

  <section class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-xl font-semibold text-foreground">Timer</h2>
      <p class="mb-4 text-sm text-muted-foreground"><code class="rounded bg-muted px-1 py-0.5 text-sm">setInterval</code>, cleared on unmount.</p>
      <p class="text-3xl font-semibold tabular-nums text-foreground">${olum.esc(n.seconds)}s</p>
    </div>
    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-xl font-semibold text-foreground">Global listener</h2>
      <p class="mb-4 text-sm text-muted-foreground"><code class="rounded bg-muted px-1 py-0.5 text-sm">window.addEventListener("keydown", …)</code>, removed on unmount.</p>
      <p class="text-3xl font-semibold text-foreground">Last key: <span class="text-brand">${olum.esc(n.lastKey)}</span></p>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">host — the ref mechanism</h2>
    <p class="mb-4 text-sm text-muted-foreground">No <code class="rounded bg-muted px-1 py-0.5 text-sm">bind:this</code> in Olum — <code class="rounded bg-muted px-1 py-0.5 text-sm">host.querySelector(...)</code> inside <code class="rounded bg-muted px-1 py-0.5 text-sm">onMount</code> reaches into this component's own root. This input was focused imperatively on mount.</p>
    <div class="rounded-xl border border-border p-6">
      <input data-ref="highlight-target" type="text" placeholder="focused via host.querySelector on mount" class="h-9 w-full max-w-sm rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
    </div>
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:c})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`lifecycle`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,f.__style__()),olum.handleMarkup(`page`,`fe84dkjq2wd`,e,d)}};return n.__olum__={compName:t,compId:`fe84dkjq2wd`},n=olum.proxyHandler(n,null,l),{methods:f.methods,props:f.props,__OLUM__:f,el:l,methodsRef:d,stateProps:n,localsRef:{get happening(){return s},get loveItems(){return c}},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},an=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`,on=e=>{var t=olum.mkElm(`div`,`not-found`,`28pr6n0v97x`),n={},r={__style__(){return``},methods:{},props:{},compName:`not-found`,deps:null,components:{Nav:X,SiteFooter:Q,Anchor:qe,Icon:Y},get getElm(){var e=t.isConnected?olum.vdom.mkStaging(t):t;return e.innerHTML=`
      <olum name="Nav"></olum>

<main class="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
  <div class="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
    <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:an,class:`size-6`})).replace(/'/g,`%27`)}'></olum>
  </div>
  <h1 class="font-heading text-2xl font-semibold text-foreground">404 — page not found</h1>
  <p class="text-muted-foreground">There's no route for this URL. It's served by <code class="rounded bg-muted px-1.5 py-0.5 text-sm">src/not-found.html</code>.</p>
  <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`})).replace(/'/g,`%27`)}'>Back home</olum>
</main>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`not-found`,r.__style__()),olum.handleMarkup(`not-found`,`28pr6n0v97x`,e,n)}};return{methods:r.methods,props:r.props,__OLUM__:r,el:t,methodsRef:n,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},sn=e=>{let t=e||`CardFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardFooter`,`wfr06m8nivj`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardFooter`,c.__style__()),olum.handleMarkup(`CardFooter`,`wfr06m8nivj`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},cn=e=>{let t=e||`HeroCounter`;var n={count:0};let r=()=>n.count++;var i=olum.mkElm(`div`,`HeroCounter`,`etxfa245pc`),a={inc:r},o={__style__(){return``},methods:{},props:{},compName:`HeroCounter`,deps:[`count`],components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div class="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
  <span class="font-mono text-xs text-white/40">Count:</span>
  <span class="font-mono text-lg font-semibold tabular-nums text-white">${olum.esc(n.count)}</span>
  <button class="ml-auto inline-flex h-8 items-center justify-center rounded-md bg-brand px-3 text-sm font-medium text-brand-ink transition-transform active:scale-95 hover:brightness-110" data-o-event='onclick|inc=${JSON.stringify([])}'>+1</button>
</div>`,olum.injectStyle(`HeroCounter`,o.__style__()),olum.handleMarkup(`HeroCounter`,`etxfa245pc`,e,a)}};return n.__olum__={compName:t,compId:`etxfa245pc`},n=olum.proxyHandler(n,null,i),{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:n,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ln=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/></svg>`,un=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M15 4V2m0 14v-2M8 9h2m10 0h2m-4.2 2.8L19 13m-4-4h.01m2.79-2.8L19 5M3 21l9-9m.2-5.8L11 5"/></svg>`,dn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>`,fn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18h-5m8-4h-8m-6 8h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/></svg>`,pn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect width="8" height="8" x="14" y="2" rx="1"/></svg>`,mn=`0.9.2`,hn=`1.9.2`,gn=e=>{let t=[{to:`/reactivity`,icon:ln,title:`Reactivity`,desc:`state, derived values, watchers, deep mutation.`},{to:`/control-flow`,icon:qt,title:`Control Flow`,desc:`if / else-if / else, show, and keyed for loops.`},{to:`/composition`,icon:Vt,title:`Composition`,desc:`props, callback props, slots, and scope().`},{to:`/lifecycle`,icon:$t,title:`Lifecycle`,desc:`onMount, async fetch, timers, and host refs.`},{to:`/binding`,icon:vt,title:`Binding`,desc:`manual two-way binding across every input type.`},{to:`/transitions`,icon:un,title:`Transitions`,desc:`olum-transition: fade, fly, scale, flip, crossfade.`},{to:`/store`,icon:dn,title:`Store`,desc:`olum-store: shared state, zero prop-drilling.`},{to:`/blog`,icon:fn,title:`Router`,desc:`file-based routing, dynamic [slug] params.`},{to:`/ui`,icon:pn,title:`UI Kit`,desc:`58 olum-ui components across 6 categories.`}];var n=olum.mkElm(`div`,`page`,`jl0bwxbpna`),r={},i={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Badge:wt,Icon:Y,Anchor:qe,Card:Ot,CardHeader:kt,CardTitle:At,CardDescription:jt,CardFooter:sn,HeroCounter:cn},get getElm(){var e=n.isConnected?olum.vdom.mkStaging(n):n;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar"></olum>
<main class="min-w-0 flex-1 px-6 py-16 lg:px-10">
  <section class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
    <div class="flex flex-col items-start gap-5">
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,class:`gap-1.5`})).replace(/'/g,`%27`)}'>
        <span class="size-1.5 rounded-full bg-brand"></span>
        olum ^${olum.esc(mn)} · olum-compiler ^${olum.esc(hn)}
      </olum>
      <h1 class="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Components are just <span class="text-brand">.html</span> files.</h1>
      <p class="max-w-lg text-lg text-muted-foreground">
        This app is a stress test of the whole ecosystem — core reactivity, the compiler, the router, the store, transitions, icons, and the full olum-ui
        kit — wired up as a real, working app rather than isolated snippets.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/reactivity`,size:`lg`,class:`bg-brand text-brand-ink border-transparent hover:brightness-110 hover:bg-brand`})).replace(/'/g,`%27`)}'>Start exploring →</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/ui`,variant:`outline`,size:`lg`})).replace(/'/g,`%27`)}'>Browse the UI kit</olum>
      </div>
    </div>

    <div class="relative -rotate-1 transition-transform duration-300 hover:rotate-0">
      <div class="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-xl bg-brand/15 blur-2xl"></div>
      <div class="overflow-hidden rounded-xl bg-[#14171a] shadow-2xl ring-1 ring-white/10">
        <div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span class="size-2.5 rounded-full bg-white/15"></span>
          <span class="size-2.5 rounded-full bg-white/15"></span>
          <span class="size-2.5 rounded-full bg-white/15"></span>
          <span class="ml-2 font-mono text-xs text-white/40">Counter.html</span>
        </div>
        <pre class="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-white/80"><code><span class="text-white/35">&lt;</span><span class="text-rose-300">script</span><span class="text-white/35">&gt;</span>
  <span class="text-brand">const</span> state = { count: <span class="text-amber-300">0</span> };
  <span class="text-brand">const</span> inc = () =&gt; state.count++;
<span class="text-white/35">&lt;/</span><span class="text-rose-300">script</span><span class="text-white/35">&gt;</span>

<span class="text-white/35">&lt;</span><span class="text-rose-300">button</span> <span class="text-sky-300">onclick</span>=<span class="text-brand">"inc()"</span><span class="text-white/35">&gt;</span>
  Count: {state.count}
<span class="text-white/35">&lt;/</span><span class="text-rose-300">button</span><span class="text-white/35">&gt;</span></code></pre>
        <div class="border-t border-white/10 px-4 py-2 font-mono text-[11px] tracking-wider text-white/30 uppercase">renders to ↓</div>
        <div class="p-4">
          <olum name="HeroCounter"></olum>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    ${t.map(function(e){return`
      
      <olum name="Card" data-o-props='${encodeURIComponent(JSON.stringify({class:`group relative h-full transition-colors hover:ring-brand/40`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}">
        <olum name="CardHeader" data-o-key="${olum.esc(e.to)}">
          <div class="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:e.icon,class:`size-4.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}"></olum>
          </div>
          <olum name="CardTitle" data-o-key="${olum.esc(e.to)}">${olum.esc(e.title)}</olum>
          <olum name="CardDescription" data-o-key="${olum.esc(e.to)}">${olum.esc(e.desc)}</olum>
        </olum>
        <olum name="CardFooter" data-o-props='${encodeURIComponent(JSON.stringify({class:`border-t-0 bg-transparent pt-0`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}">
          <span class="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
            Open <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:it,class:`size-3.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}"></olum>
          </span>
        </olum>
        <a to="${olum.esc(e.to)}" class="absolute inset-0" aria-label="${olum.esc(e.title)}"></a>
      </olum>
    `}).join(``)}
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,i.__style__()),olum.handleMarkup(`page`,`jl0bwxbpna`,e,r)}};return{methods:i.methods,props:i.props,__OLUM__:i,el:n,methodsRef:r,stateProps:null,localsRef:{get sections(){return t}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},_n=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"/></svg>`,vn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M14.086 18.412A2 2 0 0 1 12.67 19H5v-7.672a2 2 0 0 1 .586-1.414L11.75 3.75a6 6 0 1 1 8.49 8.49zM16 8 2 22m15.488-7H9"/></svg>`,yn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3zM7 16.5l-4.74-2.85M7 16.5l5-3m-5 3v5.17m5-8.17V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5zm5 3-5-3m5 3 4.74-2.85M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0zM12 8 7.26 5.15M12 8l4.74-2.85M12 13.5V8"/></svg>`,bn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M15 6a9 9 0 0 0-9 9V3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/></svg>`,xn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,Sn=e=>{let t=e||`page`;var n={count:0,user:{name:`Ann`},items:[{id:1,text:`Read the llms.txt`},{id:2,text:`Add every olum-ui component`},{id:3,text:`Ship the demo app`}],nextId:4,newItem:``,tags:new Set([`core`,`router`]),newTag:``,watcherLog:[]};let r=()=>n.count++,i=()=>n.count--,a=()=>n.count=0,o=()=>n.count*2,s=()=>o()*2,c={count(e,t){n.watcherLog=[`${e} → ${t}`,...n.watcherLog].slice(0,6)}},l=()=>n.user.name=n.user.name===`Ann`?`Bo`:`Ann`,u=()=>{n.newItem.trim()&&(n.items.push({id:n.nextId++,text:n.newItem.trim()}),n.newItem=``)},d=e=>{let t=n.items.findIndex(t=>t.id===e);t!==-1&&n.items.splice(t,1)},f=()=>{let e=n.newTag.trim().toLowerCase();e&&(n.tags.add(e),n.newTag=``)},p=e=>n.tags.delete(e),m=[`State updates automatically update the UI.`,`Derived values recalculate when dependencies change.`,`Watchers run whenever the watched value changes — see the Console tab.`,`Deep mutations (arrays/objects/Sets) are tracked.`],h=[{icon:vn,title:`Minimal API`,desc:`No boilerplate, just plain JavaScript.`},{icon:yn,title:`Deeply Reactive`,desc:`Objects, arrays, and nested values are all tracked.`},{icon:bn,title:`Predictable`,desc:`Changes flow one way: state → UI.`},{icon:xn,title:`Performant`,desc:`Fine-grained updates for buttery smooth apps.`}],g=e=>n.newItem=e.target.value,_=e=>e.key===`Enter`&&u(),v=e=>n.newTag=e.target.value,y=e=>e.key===`Enter`&&f();var b=olum.mkElm(`div`,`page`,`zai22q3hbek`),x={inc:r,dec:i,reset:a,doubled:o,quadrupled:s,rename:l,addItem:u,removeItem:d,addTag:f,removeTag:p,__olumAnon_xaxwya8:g,__olumAnon_skjeypf:_,__olumAnon_ij5lj0t:v,__olumAnon_rs1mpds:y},S={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,Button:J,Badge:wt},get getElm(){var e=b.isConnected?olum.vdom.mkStaging(b):b;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`reactivity`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:1,icon:_n,title:`Reactivity`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">State, derived values, watchers & deep mutation</p>
    <p class="mt-2">
      Only <code class="rounded bg-muted px-1 py-0.5 text-sm">state</code> is tracked. Every mutation below — top-level, nested, array, watcher, Set —
      re-renders via a microtask-batched diff-patch.
    </p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`Reactivity.ulum`,code:`<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">script</span><span class="text-muted-foreground">&gt;</span>
  <span class="text-brand">const</span> state = { count: <span class="text-amber-600 dark:text-amber-400">0</span> };

  <span class="text-muted-foreground">// derived values — plain functions</span>
  <span class="text-brand">const</span> doubled = () =&gt; state.count * <span class="text-amber-600 dark:text-amber-400">2</span>;
  <span class="text-brand">const</span> quadrupled = () =&gt; doubled() * <span class="text-amber-600 dark:text-amber-400">2</span>;

  <span class="text-muted-foreground">// fires on every state.count assignment</span>
  <span class="text-brand">const</span> watcher = { count(old, next) { log(\`\${old} → \${next}\`) } };
<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">script</span><span class="text-muted-foreground">&gt;</span>

<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">button</span> <span class="text-sky-600 dark:text-sky-400">onclick</span>=<span class="text-amber-600 dark:text-amber-400">"state.count++"</span><span class="text-muted-foreground">&gt;</span>+<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">button</span><span class="text-muted-foreground">&gt;</span>
<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">span</span><span class="text-muted-foreground">&gt;</span>{state.count} · doubled = {doubled()}<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">span</span><span class="text-muted-foreground">&gt;</span>`,consoleLines:n.watcherLog})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:watcherLog" data-o-props-owner='${t}'>
      <div class="flex items-center gap-3">
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon`,ariaLabel:`Decrement`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:dec" data-o-props-owner='${t}'>−</olum>
        <span class="w-10 text-center font-heading text-2xl tabular-nums text-foreground">${olum.esc(n.count)}</span>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon`,ariaLabel:`Increment`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:inc" data-o-props-owner='${t}'>+</olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:reset" data-o-props-owner='${t}'>Reset</olum>
      </div>
      <div class="mt-4 flex flex-col gap-1 text-sm text-muted-foreground">
        <span>doubled() = <strong class="text-foreground">${olum.esc(o())}</strong></span>
        <span>quadrupled() = <strong class="text-foreground">${olum.esc(s())}</strong></span>
      </div>
    </olum>

    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:m})).replace(/'/g,`%27`)}'></olum>
  </div>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Nested mutation</h2>
    <p class="mb-4 text-sm text-muted-foreground"><code class="rounded bg-muted px-1 py-0.5 text-sm">state.user.name = "Bo"</code> — a deep write, no reassignment of <code class="rounded bg-muted px-1 py-0.5 text-sm">state.user</code> itself.</p>
    <div class="flex items-center gap-4 rounded-xl border border-border p-6">
      <span class="text-foreground">Hello, <strong>${olum.esc(n.user.name)}</strong></span>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:rename" data-o-props-owner='${t}'>Rename</olum>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Array mutation (push / splice)</h2>
    <p class="mb-4 text-sm text-muted-foreground">Both <code class="rounded bg-muted px-1 py-0.5 text-sm">push</code> and <code class="rounded bg-muted px-1 py-0.5 text-sm">splice</code> re-render in place — no need to reassign <code class="rounded bg-muted px-1 py-0.5 text-sm">state.items</code>.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="flex gap-2">
        <input value="${olum.esc(n.newItem)}" placeholder="Add a task…" class="h-8 flex-1 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_xaxwya8=${JSON.stringify([`$event`])}OLUM_EVT_SEPonkeydown|__olumAnon_skjeypf=${JSON.stringify([`$event`])}'>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:addItem" data-o-props-owner='${t}'>Add</olum>
      </div>
      <ul class="mt-4 space-y-2">
        ${n.items.map(function(e){return`
          <li class="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm text-foreground" key="${olum.esc(e.id)}">
            ${olum.esc(e.text)}
            <button class="text-muted-foreground hover:text-destructive" aria-label="Remove" data-o-event='onclick|removeItem=${JSON.stringify([e.id])}'>✕</button>
          </li>
        `}).join(``)}
      </ul>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Set reactivity</h2>
    <p class="mb-4 text-sm text-muted-foreground">A <code class="rounded bg-muted px-1 py-0.5 text-sm">Set</code> in state — <code class="rounded bg-muted px-1 py-0.5 text-sm">.add()</code> / <code class="rounded bg-muted px-1 py-0.5 text-sm">.delete()</code> are tracked deeply, same as objects and arrays.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="flex gap-2">
        <input value="${olum.esc(n.newTag)}" placeholder="New tag…" class="h-8 flex-1 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" data-o-event='oninput|__olumAnon_ij5lj0t=${JSON.stringify([`$event`])}OLUM_EVT_SEPonkeydown|__olumAnon_rs1mpds=${JSON.stringify([`$event`])}'>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:addTag" data-o-props-owner='${t}'>Add tag</olum>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        ${Array.from(n.tags).map(function(e){return`
          <button class="cursor-pointer" data-o-event='onclick|removeTag=${JSON.stringify([e])}' key="${olum.esc(e)}">
            <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`secondary`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e)}">${olum.esc(e)} ✕</olum>
          </button>
        `}).join(``)}
      </div>
    </div>
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:h})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`reactivity`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,S.__style__()),olum.handleMarkup(`page`,`zai22q3hbek`,e,x)}};return n.__olum__={compName:t,compId:`zai22q3hbek`},n=olum.proxyHandler(n,c,b),{methods:S.methods,props:S.props,__OLUM__:S,el:b,methodsRef:x,stateProps:n,localsRef:{get happening(){return m},get loveItems(){return h}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Cn=e=>{let t=e||`CardContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`px-(--card-spacing)`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardContent`,`ydv7sfsdq1i`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardContent`,c.__style__()),olum.handleMarkup(`CardContent`,`ydv7sfsdq1i`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$=u({items:[],add(e){let t=this.items.find(t=>t.id===e.id);t?t.qty++:this.items=[...this.items,{...e,qty:1}]},inc(e){let t=this.items.find(t=>t.id===e);t&&t.qty++},dec(e){let t=this.items.find(t=>t.id===e);t&&(t.qty<=1?this.remove(e):t.qty--)},remove(e){this.items=this.items.filter(t=>t.id!==e)},clear(){this.items=[]}}),wn=()=>$.items.reduce((e,t)=>e+t.qty,0),Tn=()=>$.items.reduce((e,t)=>e+t.qty*t.price,0),En=e=>{let t=e||`ProductList`,n=[{id:`p1`,name:`Fade Cushion`,price:24},{id:`p2`,name:`Fly Lamp`,price:58},{id:`p3`,name:`Slide Rug`,price:132},{id:`p4`,name:`Crossfade Mug`,price:14},{id:`p5`,name:`Flip Frame`,price:39},{id:`p6`,name:`Draw Notebook`,price:9}],r=e=>{let t=e.currentTarget.dataset.value,r=n.find(e=>e.id===t);r&&($.add(r),Ye.add({title:`Added to cart`,description:r.name,type:`success`}))};var i=olum.mkElm(`div`,`ProductList`,`3k2x8qwgaxn`),a={addToCart:r},o={__style__(){return``},methods:{},props:{},compName:`ProductList`,deps:null,components:{Button:J,Card:Ot,CardContent:Cn,Badge:wt},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div>
  <h2 class="mb-1 text-xl font-semibold text-foreground">Products</h2>
  <p class="mb-4 text-sm text-muted-foreground">Imports the same <code class="rounded bg-muted px-1 py-0.5 text-xs">cart</code> store as CartSummary — no props passed between them.</p>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
    ${n.map(function(e){return`
      <olum name="Card" data-o-key="${olum.esc(e.id)}">
        <olum name="CardContent" data-o-props='${encodeURIComponent(JSON.stringify({class:`flex items-center justify-between gap-3`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">
          <div>
            <p class="text-sm font-medium text-foreground">${olum.esc(e.name)}</p>
            <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`secondary`,class:`mt-1`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">$${olum.esc(e.price)}</olum>
          </div>
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,value:e.id})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:addToCart" data-o-props-owner='${t}' data-o-key="${olum.esc(e.id)}">Add</olum>
        </olum>
      </olum>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`ProductList`,o.__style__()),olum.handleMarkup(`ProductList`,`3k2x8qwgaxn`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{get products(){return n}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Dn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`,On=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7v14"/></svg>`,kn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,An=e=>{let t=e||`CartSummary`,n=e=>$.dec(e.currentTarget.dataset.value),r=e=>$.inc(e.currentTarget.dataset.value),i=e=>$.remove(e.currentTarget.dataset.value),a=()=>$.clear();var o=olum.mkElm(`div`,`CartSummary`,`gyb7ppm2mqr`),s={decItem:n,incItem:r,removeItem:i,clearCart:a},c={__style__(){return``},methods:{},props:{},compName:`CartSummary`,deps:null,components:{Button:J,Card:Ot,CardContent:Cn,Icon:Y},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <h2 class="text-xl font-semibold text-foreground">Cart</h2>
      <p class="text-sm text-muted-foreground">${olum.esc(wn())} item${olum.esc(wn()===1?``:`s`)} · $${olum.esc(Tn())}</p>
    </div>
    ${$.items.length?`
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:clearCart" data-o-props-owner='${t}' if='${JSON.stringify(!!$.items.length)}'>Clear</olum>
    `:``}
  </div>

  ${$.items.length?`
    <div class="space-y-2">
      ${$.items.map(function(e){return`
        <olum name="Card" data-o-key="${olum.esc(e.id)}">
          <olum name="CardContent" data-o-props='${encodeURIComponent(JSON.stringify({class:`flex items-center justify-between gap-3`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">
            <div>
              <p class="text-sm font-medium text-foreground">${olum.esc(e.name)}</p>
              <p class="text-xs text-muted-foreground">$${olum.esc(e.price)} × ${olum.esc(e.qty)}</p>
            </div>
            <div class="flex items-center gap-1">
              <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon-sm`,ariaLabel:`Decrease`,value:e.id})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:decItem" data-o-props-owner='${t}' data-o-key="${olum.esc(e.id)}">
                <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Dn,class:`size-3.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}"></olum>
              </olum>
              <span class="w-6 text-center text-sm">${olum.esc(e.qty)}</span>
              <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon-sm`,ariaLabel:`Increase`,value:e.id})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:incItem" data-o-props-owner='${t}' data-o-key="${olum.esc(e.id)}">
                <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:On,class:`size-3.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}"></olum>
              </olum>
              <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`icon-sm`,ariaLabel:`Remove`,value:e.id})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:removeItem" data-o-props-owner='${t}' data-o-key="${olum.esc(e.id)}">
                <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:kn,class:`size-3.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}"></olum>
              </olum>
            </div>
          </olum>
        </olum>
      `}).join(``)}
    </div>
  `:`
    <olum name="Card" if='${JSON.stringify(!$.items.length)}'>
      <olum name="CardContent" data-o-props='${encodeURIComponent(JSON.stringify({class:`py-10 text-center text-sm text-muted-foreground`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!$.items.length)}'>Nothing in the cart yet — add a product.</olum>
    </olum>
  `}
  
</div>`,olum.injectStyle(`CartSummary`,c.__style__()),olum.handleMarkup(`CartSummary`,`gyb7ppm2mqr`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},jn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71m-6.58 6.57-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71M8 2v3M2 8h3m11 11v3m3-6h3"/></svg>`,Mn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zm1 .27V12"/><path d="M3.29 7 12 12l8.71-5M7.5 4.27l9 5.15"/></svg>`,Nn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3m-6 4.2h5.7"/></svg>`,Pn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22V12m4 5 2 2 4-4"/><path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"/><path d="M3.29 7 12 12l8.71-5M7.5 4.27l8.997 5.148"/></svg>`,Fn=e=>{let t=[`ProductList and CartSummary are siblings — neither passes props to the other.`,`Both use the same store module and read/write cart.items directly.`,`Add a product on the left; the right side updates instantly.`,`Any other component that pulls in cart.js joins the same live state.`],n=[{icon:jn,title:`Zero Prop-Drilling`,desc:`Sibling components read and write the same store directly.`},{icon:Mn,title:`Plain Objects`,desc:`store() wraps a plain object with methods — no extra API to learn.`},{icon:Nn,title:`Computed Selectors`,desc:`cartCount() and cartTotal() are just functions over store state.`},{icon:Pn,title:`One Line Away`,desc:`Any component that pulls in the store is instantly in sync.`}];var r=olum.mkElm(`div`,`page`,`ppvbvmea90c`),i={},a={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,ProductList:En,CartSummary:An},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`store`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:7,icon:dn,title:`Store`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">Shared state, zero prop-drilling</p>
    <p class="mt-2">
      <code class="rounded bg-muted px-1 py-0.5 text-sm">olum-store</code> — a zustand-style shared store. <code class="rounded bg-muted px-1 py-0.5 text-sm">ProductList</code> and
      <code class="rounded bg-muted px-1 py-0.5 text-sm">CartSummary</code> below are siblings on this page; neither is passed a prop from the other.
    </p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`cart.js`,code:`<span class="text-muted-foreground">// utils/cart.js</span>
<span class="text-brand">im</span><span class="text-brand">port</span> { store } <span class="text-brand">from</span> <span class="text-amber-600 dark:text-amber-400">"olum"</span>;

<span class="text-brand">export const</span> cart = store({
  items: [],
  add(product) { <span class="text-muted-foreground">/* ... */</span> },
});

<span class="text-muted-foreground">// ProductList.html and CartSummary.html both just:</span>
<span class="text-brand">im</span><span class="text-brand">port</span> { cart } <span class="text-brand">from</span> <span class="text-amber-600 dark:text-amber-400">"../utils/cart"</span>;
<span class="text-muted-foreground">// ...and read/write it directly. No props passed between them.</span>`})).replace(/'/g,`%27`)}'>
      <div class="flex flex-col gap-6">
        <olum name="ProductList"></olum>
        <olum name="CartSummary"></olum>
      </div>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:t})).replace(/'/g,`%27`)}'></olum>
  </div>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:n})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`store`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,a.__style__()),olum.handleMarkup(`page`,`ppvbvmea90c`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{get happening(){return t},get loveItems(){return n}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},In=e=>{let t=e||`FadeDemo`,n=l(t),{onEvent:r}=l(t);var i={on:!0};let a=()=>i.on=!i.on,o=()=>n.onEvent(`fade: intro start`),s=()=>n.onEvent(`fade: intro end`),c=()=>n.onEvent(`fade: outro start`),u=()=>n.onEvent(`fade: outro end`);var d=olum.mkElm(`div`,`FadeDemo`,`kf0pg5tz44o`),f={onEvent:n.onEvent,toggle:a,onFadeIntroStart:o,onFadeIntroEnd:s,onFadeOutroStart:c,onFadeOutroEnd:u},p={__style__(){return``},methods:{},props:{},compName:`FadeDemo`,deps:[`on`],components:{Button:J},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <olum name="Button" data-o-props-src="onclick:method:toggle" data-o-props-owner='${t}'>Toggle</olum>
<div class="mt-4 flex h-16 items-center">
  ${i.on?`
    
      <div class="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand" data-o-trans='in:fade=${JSON.stringify([])}&out:fade=${JSON.stringify([])}&@introstart=onFadeIntroStart&@introend=onFadeIntroEnd&@outrostart=onFadeOutroStart&@outroend=onFadeOutroEnd'>Fades in and out</div>
    
  `:``}
</div>`,olum.injectStyle(`FadeDemo`,p.__style__()),olum.handleMarkup(`FadeDemo`,`kf0pg5tz44o`,e,f)}};return i.__olum__={compName:t,compId:`kf0pg5tz44o`},i=olum.proxyHandler(i,null,d),{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:i,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ln=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m18 14 4 4-4 4m0-20 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/></svg>`,Rn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3 4 7l4 4M4 7h16m-4 14 4-4-4-4m4 4H4"/></svg>`,zn=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10.268 21a2 2 0 0 0 3.464 0M22 8c0-2.3-.8-4.3-2-6M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326M4 2C2.8 3.7 2 5.7 2 8"/></svg>`,Bn=e=>{let t=e||`page`;var n={flyOn:!0,scaleOn:!0,slideOpen:!1,drawOn:!0,inA:!0,cards:[{id:1,label:`Alpha`},{id:2,label:`Bravo`},{id:3,label:`Charlie`},{id:4,label:`Delta`},{id:5,label:`Echo`}],log:[]};let r=()=>{n.cards=[...n.cards].sort(()=>Math.random()-.5)},i=()=>n.flyOn=!n.flyOn,a=()=>n.scaleOn=!n.scaleOn,o=()=>n.slideOpen=!n.slideOpen,c=()=>n.drawOn=!n.drawOn,l=()=>n.inA=!n.inA,u=e=>{n.log=[`${new Date().toLocaleTimeString()} — ${e}`,...n.log].slice(0,6)},[d,f]=s(),p=[`Toggling swaps the element in/out; <transition> animates both directions.`,`The same transition can drive intro and outro, or two different ones.`,`onintrostart / onintroend / onoutrostart / onoutroend fire on every phase.`,`Every phase is logged below — see the Console tab.`],m=[{icon:ln,title:`Built-in Effects`,desc:`Fade, fly, scale, slide, and draw ship with the package.`},{icon:Ln,title:`Flip on Reorder`,desc:`Keyed list items animate to their new position automatically.`},{icon:Rn,title:`Crossfade`,desc:`Fly the same element between two spots, keyed by a primitive id.`},{icon:zn,title:`Lifecycle Events`,desc:`Hook into intro/outro start and end on any transition.`}];var h=olum.mkElm(`div`,`page`,`qmu4jps8dgq`),g={shuffle:r,toggleFly:i,toggleScale:a,toggleSlide:o,toggleDraw:c,toggleCrossfade:l,logEvent:u,send:d,receive:f},_={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,DemoPanel:dt,WhatsHappening:pt,WhyYoullLoveIt:mt,FeaturePager:gt,Button:J,FadeDemo:In},get getElm(){var e=h.isConnected?olum.vdom.mkStaging(h):h;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`transitions`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:6,icon:un,title:`Transitions`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">Fade, fly, scale, flip & crossfade</p>
    <p class="mt-2">
      The <code class="rounded bg-muted px-1.5 py-0.5 text-sm">olum-transition</code> package: built-in fade/fly/scale/slide/draw, flip on reorder,
      crossfade between two spots, and transition lifecycle events.
    </p>
  </olum>

  <div class="mt-8">
    <olum name="DemoPanel" data-o-props='${encodeURIComponent(JSON.stringify({filename:`Transitions.ulum`,code:`<span class="text-muted-foreground">&lt;</span><span class="text-rose-600 dark:text-rose-400">transition</span>
  <span class="text-sky-600 dark:text-sky-400">transition</span>=<span class="text-amber-600 dark:text-amber-400">"fade"</span>
  <span class="text-sky-600 dark:text-sky-400">onintrostart</span>=<span class="text-amber-600 dark:text-amber-400">onIntroStart</span>
  <span class="text-sky-600 dark:text-sky-400">onintroend</span>=<span class="text-amber-600 dark:text-amber-400">onIntroEnd</span>
  <span class="text-sky-600 dark:text-sky-400">onoutrostart</span>=<span class="text-amber-600 dark:text-amber-400">onOutroStart</span>
  <span class="text-sky-600 dark:text-sky-400">onoutroend</span>=<span class="text-amber-600 dark:text-amber-400">onOutroEnd</span>
<span class="text-muted-foreground">&gt;</span>
  Fades in and out
<span class="text-muted-foreground">&lt;/</span><span class="text-rose-600 dark:text-rose-400">transition</span><span class="text-muted-foreground">&gt;</span>`,consoleLines:n.log})).replace(/'/g,`%27`)}' data-o-props-src="consoleLines:state:log" data-o-props-owner='${t}'>
      <olum name="FadeDemo" data-o-props-src="onEvent:method:logEvent" data-o-props-owner='${t}'></olum>
    </olum>
    <olum name="WhatsHappening" data-o-props='${encodeURIComponent(JSON.stringify({items:p})).replace(/'/g,`%27`)}'></olum>
  </div>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Fly</h2>
    <p class="mb-4 text-sm text-muted-foreground">Separate <code class="rounded bg-muted px-1 py-0.5 text-xs">in</code>/<code class="rounded bg-muted px-1 py-0.5 text-xs">out</code>, each with its own params.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props-src="onclick:method:toggleFly" data-o-props-owner='${t}'>Toggle</olum>
      <div class="mt-4 flex h-16 items-center">
        ${n.flyOn?`
          
            <div class="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand" data-o-trans='in:fly=${JSON.stringify([{y:24,duration:400}])}&out:fade=${JSON.stringify([])}'>Flies in, fades out</div>
          
        `:``}
      </div>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Scale</h2>
    <p class="mb-4 text-sm text-muted-foreground">Grows in from a point, shrinks back out.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props-src="onclick:method:toggleScale" data-o-props-owner='${t}'>Toggle</olum>
      <div class="mt-4 flex h-16 items-center">
        ${n.scaleOn?`
          
            <div class="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand" data-o-trans='in:scale=${JSON.stringify([{start:.6,duration:350}])}&out:scale=${JSON.stringify([{start:.6,duration:350}])}'>Scales in and out</div>
          
        `:``}
      </div>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Slide</h2>
    <p class="mb-4 text-sm text-muted-foreground">Animates height — an accordion-style reveal.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props-src="onclick:method:toggleSlide" data-o-props-owner='${t}'>${olum.esc(n.slideOpen?`Collapse`:`Expand`)}</olum>
      ${n.slideOpen?`
        
          <div class="mt-3 rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground" data-o-trans='in:slide=${JSON.stringify([])}&out:slide=${JSON.stringify([])}'>
            This panel's height animates open and closed instead of just popping in and out of the DOM.
          </div>
        
      `:``}
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Draw</h2>
    <p class="mb-4 text-sm text-muted-foreground">Traces an SVG path's stroke.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props-src="onclick:method:toggleDraw" data-o-props-owner='${t}'>Toggle</olum>
      <div class="mt-4 flex h-28 items-center">
        ${n.drawOn?`
          <svg viewBox="0 0 100 100" class="size-24 text-brand">
            
              <path d="M10 80 L50 12 L90 80 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" data-o-trans='in:draw=${JSON.stringify([{duration:900}])}&out:draw=${JSON.stringify([{duration:900}])}'></path>
            
          </svg>
        `:``}
      </div>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Flip on reorder</h2>
    <p class="mb-4 text-sm text-muted-foreground">Each card in this keyed <code class="rounded bg-muted px-1 py-0.5 text-xs">&lt;for&gt;</code> animates to its new position when the list is shuffled.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props-src="onclick:method:shuffle" data-o-props-owner='${t}'>Shuffle</olum>
      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        ${n.cards.map(function(e){return`
          
            <div class="rounded-lg border border-border bg-muted/50 p-4 text-center text-sm font-medium text-foreground" data-o-trans='flip=${JSON.stringify([{duration:400}])}' key="${olum.esc(e.id)}">${olum.esc(e.label)}</div>
          
        `}).join(``)}
      </div>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Crossfade</h2>
    <p class="mb-4 text-sm text-muted-foreground">
      <code class="rounded bg-muted px-1 py-0.5 text-xs">crossfade()</code> flies the same element between two spots, keyed off a primitive id.
    </p>
    <div class="rounded-xl border border-border p-6">
      <div class="grid grid-cols-2 gap-6">
        <div class="flex h-28 items-center justify-center rounded-lg border border-dashed border-border">
          ${n.inA?`
            
              <div class="size-14 rounded-lg bg-brand" data-o-trans='in:receive=${JSON.stringify([{key:1}])}&out:send=${JSON.stringify([{key:1}])}'></div>
            
          `:``}
        </div>
        <div class="flex h-28 items-center justify-center rounded-lg border border-dashed border-border">
          ${n.inA?``:`
            
              <div class="size-14 rounded-lg bg-brand" data-o-trans='in:receive=${JSON.stringify([{key:1}])}&out:send=${JSON.stringify([{key:1}])}'></div>
            
          `}
        </div>
      </div>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:`mt-4`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toggleCrossfade" data-o-props-owner='${t}'>Move it across</olum>
    </div>
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:m})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`transitions`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,_.__style__()),olum.handleMarkup(`page`,`qmu4jps8dgq`,e,g)}};return n.__olum__={compName:t,compId:`qmu4jps8dgq`},n=olum.proxyHandler(n,null,h),{methods:_.methods,props:_.props,__OLUM__:_,el:h,methodsRef:g,stateProps:n,localsRef:{get happening(){return p},get loveItems(){return m}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vn=e=>{let t=e||`Accordion`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex w-full flex-col [&>*:not(:last-child)>[data-slot=accordion-item]]:border-b`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Accordion`,`dgkm52ua47s`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Accordion`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="accordion" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`Accordion`,c.__style__()),olum.handleMarkup(`Accordion`,`dgkm52ua47s`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Hn=e=>{let t=e||`AccordionItem`,n=l(t),{name:r=`accordion`,type:i=`checkbox`,defaultOpen:a=!1,disabled:o=!1,class:s=``,children:c}=l(t),u=()=>q(`group/accordion-item [&>*:has([data-slot=accordion-content])]:grid [&>*:has([data-slot=accordion-content])]:grid-rows-[0fr] [&>*:has([data-slot=accordion-content])]:transition-[grid-template-rows] has-[>input:checked]:[&>*:has([data-slot=accordion-content])]:grid-rows-[1fr] has-[>input:checked]:[&_[data-slot=accordion-trigger-icon-down]]:hidden has-[>input:checked]:[&_[data-slot=accordion-trigger-icon-up]]:inline`,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`AccordionItem`,`g1ceqvhxf4`),f={name:n.name===void 0?`accordion`:n.name,type:n.type===void 0?`checkbox`:n.type,defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:u},p={__style__(){return``},methods:{},props:{},compName:`AccordionItem`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <div data-slot="accordion-item" class="${olum.esc(u())}">
  <input type="${olum.esc(n.type===void 0?`checkbox`:n.type)}" name="${olum.esc(n.name===void 0?`accordion`:n.name)}" class="peer sr-only" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``}>
  ${n.children}
</div>`,olum.injectStyle(`AccordionItem`,p.__style__()),olum.handleMarkup(`AccordionItem`,`g1ceqvhxf4`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Un=e=>{let t=e||`AccordionTrigger`,n=l(t),{disabled:r=!1,class:i=``,children:a}=l(t);var s=o(()=>{let e=f.closest(`[data-slot="accordion-item"]`),t=e&&e.querySelector(`:scope > input`),n=f.querySelector(`button`),r=()=>{!t||t.disabled||(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let c=`group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 w-full [&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:ml-auto`,u=()=>q(c,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`AccordionTrigger`,`knkevmca58`),f=d,p={disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:u},m={__style__(){return``},methods:{},props:{},compName:`AccordionTrigger`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <div class="flex">
  <button type="button" data-slot="accordion-trigger" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(u())}">
    ${n.children}
    <svg data-slot="accordion-trigger-icon-down" class="pointer-events-none shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
    <svg data-slot="accordion-trigger-icon-up" class="pointer-events-none hidden shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
  </button>
</div>`,olum.injectStyle(`AccordionTrigger`,m.__style__()),olum.handleMarkup(`AccordionTrigger`,`knkevmca58`,e,p)}};return{methods:m.methods,props:m.props,__OLUM__:m,el:d,methodsRef:p,stateProps:null,localsRef:{get base(){return c}},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},Wn=e=>{let t=e||`AccordionContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AccordionContent`,`1xpa34z2qex`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AccordionContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="accordion-content" class="overflow-hidden text-sm min-h-0"><div class="${olum.esc(a())}">${n.children}</div></div>`,olum.injectStyle(`AccordionContent`,c.__style__()),olum.handleMarkup(`AccordionContent`,`1xpa34z2qex`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Gn=e=>{let t=e||`Attachment`,n=l(t),{state:r=`done`,size:i=`default`,orientation:a=`horizontal`,class:o=``,children:s}=l(t),c=`group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border border-border bg-background text-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed [&>[data-olum]]:contents`,u={default:`gap-2 text-sm has-[[data-slot=attachment-content]]:px-2.5 has-[[data-slot=attachment-content]]:py-2 has-[[data-slot=attachment-media]]:p-2`,sm:`gap-2.5 text-xs has-[[data-slot=attachment-content]]:px-2 has-[[data-slot=attachment-content]]:py-1.5 has-[[data-slot=attachment-media]]:p-1.5`,xs:`gap-1.5 rounded-lg text-xs has-[[data-slot=attachment-content]]:px-1.5 has-[[data-slot=attachment-content]]:py-1 has-[[data-slot=attachment-media]]:p-1`},d={horizontal:`min-w-40 items-center`,vertical:`w-24 flex-col has-[[data-slot=attachment-content]]:w-30`},f=()=>q(c,u[n.size===void 0?`default`:n.size]||u.default,d[n.orientation===void 0?`horizontal`:n.orientation]||d.horizontal,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`Attachment`,`bereh66c5xq`),m={dataState:n.state===void 0?`done`:n.state,size:n.size===void 0?`default`:n.size,orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:f},h={__style__(){return``},methods:{},props:{},compName:`Attachment`,deps:null,components:{},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <div data-slot="attachment" data-state="${olum.esc(n.state===void 0?`done`:n.state)}" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(f())}">${n.children}</div>`,olum.injectStyle(`Attachment`,h.__style__()),olum.handleMarkup(`Attachment`,`bereh66c5xq`,e,m)}};return{methods:h.methods,props:h.props,__OLUM__:h,el:p,methodsRef:m,stateProps:null,localsRef:{get base(){return c},get sizes(){return u},get orientations(){return d}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Kn=e=>{let t=e||`AttachmentMedia`,n=l(t),{variant:r=`icon`,class:i=``,children:a}=l(t),o=`relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5`,s={icon:``,image:`opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 [&_img]:aspect-square [&_img]:w-full [&_img]:object-cover`},c=()=>q(o,s[n.variant===void 0?`icon`:n.variant]||s.icon,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`AttachmentMedia`,`vzq37f8pqeb`),d={variant:n.variant===void 0?`icon`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`AttachmentMedia`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="attachment-media" data-variant="${olum.esc(n.variant===void 0?`icon`:n.variant)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`AttachmentMedia`,f.__style__()),olum.handleMarkup(`AttachmentMedia`,`vzq37f8pqeb`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qn=e=>{let t=e||`AttachmentContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AttachmentContent`,`9sjq4g3c656`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AttachmentContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="attachment-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AttachmentContent`,c.__style__()),olum.handleMarkup(`AttachmentContent`,`9sjq4g3c656`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Jn=e=>{let t=e||`AttachmentTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:animate-pulse`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AttachmentTitle`,`ubroxq60zas`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AttachmentTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="attachment-title" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`AttachmentTitle`,c.__style__()),olum.handleMarkup(`AttachmentTitle`,`ubroxq60zas`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Yn=e=>{let t=e||`AttachmentDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`mt-0.5 block max-w-full min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AttachmentDescription`,`zq40syh39xf`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AttachmentDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="attachment-description" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`AttachmentDescription`,c.__style__()),olum.handleMarkup(`AttachmentDescription`,`zq40syh39xf`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xn=e=>{let t=e||`AttachmentActions`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AttachmentActions`,`xw5uqb23aw`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AttachmentActions`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="attachment-actions" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AttachmentActions`,c.__style__()),olum.handleMarkup(`AttachmentActions`,`xw5uqb23aw`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Zn=e=>{let t=e||`AttachmentAction`,n=l(t),{variant:r=`ghost`,size:i=`icon-xs`,onclick:a,value:o,ariaLabel:s,class:c=``,children:u}=l(t);var d=olum.mkElm(`div`,`AttachmentAction`,`apstweaxoj`),f={variant:n.variant===void 0?`ghost`:n.variant,size:n.size===void 0?`icon-xs`:n.size,onclick:n.onclick,value:n.value,ariaLabel:n.ariaLabel,className:n.class===void 0?``:n.class,children:n.children},p={__style__(){return``},methods:{},props:{},compName:`AttachmentAction`,deps:null,components:{Button:J},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <olum name="Button" data-o-props-src="variant:method:variant|size:method:size|onclick:method:onclick|value:method:value|ariaLabel:method:ariaLabel|class:method:className" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`AttachmentAction`,p.__style__()),olum.handleMarkup(`AttachmentAction`,`apstweaxoj`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qn=e=>{let t=e||`AttachmentGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&>[data-olum]]:contents [&_[data-slot=attachment]]:flex-none [&_[data-slot=attachment]]:snap-start`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AttachmentGroup`,`douuldvct46`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AttachmentGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="attachment-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AttachmentGroup`,c.__style__()),olum.handleMarkup(`AttachmentGroup`,`douuldvct46`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$n=e=>{let t=e||`Avatar`,n=l(t),{size:r=`default`,class:i=``,children:a}=l(t),o=`group/avatar relative flex size-8 shrink-0 rounded-full select-none [&>[data-olum]]:contents after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken`,s={default:``,sm:`size-6`,lg:`size-10`},c=()=>q(o,s[n.size===void 0?`default`:n.size]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`Avatar`,`m71qq304xuh`),d={size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`Avatar`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="avatar" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`Avatar`,f.__style__()),olum.handleMarkup(`Avatar`,`m71qq304xuh`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get sizes(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},er=e=>{let t=e||`AvatarFallback`,n=l(t),{class:r=``,children:i}=l(t),a=`flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`AvatarFallback`,`9u8m1kbqif5`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`AvatarFallback`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <span data-slot="avatar-fallback" class="${olum.esc(o())}">${n.children}</span>`,olum.injectStyle(`AvatarFallback`,u.__style__()),olum.handleMarkup(`AvatarFallback`,`9u8m1kbqif5`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},tr=e=>{let t=e||`AvatarBadge`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AvatarBadge`,`xeimhgj2x3s`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AvatarBadge`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="avatar-badge" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`AvatarBadge`,c.__style__()),olum.handleMarkup(`AvatarBadge`,`xeimhgj2x3s`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},nr=e=>{let t=e||`AvatarGroup`,n=l(t),{class:r=``,children:i}=l(t),a=`group/avatar-group flex -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`AvatarGroup`,`b004tvf738n`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`AvatarGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="avatar-group" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`AvatarGroup`,u.__style__()),olum.handleMarkup(`AvatarGroup`,`b004tvf738n`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},rr=e=>{let t=e||`AvatarGroupCount`,n=l(t),{class:r=``,children:i}=l(t),a=`relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`AvatarGroupCount`,`rpqf6e6kqfn`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`AvatarGroupCount`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="avatar-group-count" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`AvatarGroupCount`,u.__style__()),olum.handleMarkup(`AvatarGroupCount`,`rpqf6e6kqfn`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ir=e=>{let t=e||`Bubble`,n=l(t),{variant:r=`default`,align:i=`start`,class:a=``,children:o}=l(t),s=`group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full`,c={default:`[&_[data-slot=bubble-content]]:bg-primary [&_[data-slot=bubble-content]]:text-primary-foreground [&_[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80`,secondary:`[&_[data-slot=bubble-content]]:bg-secondary [&_[data-slot=bubble-content]]:text-secondary-foreground [&_[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--olum-secondary),var(--olum-foreground)_5%)]`,muted:`[&_[data-slot=bubble-content]]:bg-muted [&_[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--olum-muted),var(--olum-foreground)_5%)]`,tinted:`[&_[data-slot=bubble-content]]:bg-[oklch(from_var(--olum-primary)_0.93_calc(c*0.4)_h)] [&_[data-slot=bubble-content]]:text-foreground [&_[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--olum-primary)_0.88_calc(c*0.5)_h)] dark:[&_[data-slot=bubble-content]]:bg-[oklch(from_var(--olum-primary)_0.3_calc(c*0.6)_h)] dark:[&_[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--olum-primary)_0.36_calc(c*0.7)_h)]`,outline:`[&_[data-slot=bubble-content]]:border-border [&_[data-slot=bubble-content]]:bg-background [&_[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&_[data-slot=bubble-content]:is(button,a):hover]:text-foreground`,ghost:`border-none [&_[data-slot=bubble-content]]:rounded-none [&_[data-slot=bubble-content]]:bg-transparent [&_[data-slot=bubble-content]]:p-0 [&_[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&_[data-slot=bubble-content]:is(button,a):hover]:text-foreground`,destructive:`[&_[data-slot=bubble-content]]:bg-destructive/10 [&_[data-slot=bubble-content]]:text-destructive [&_[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20`},u=()=>q(s,c[n.variant===void 0?`default`:n.variant]||c.default,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`Bubble`,`h1car1my3n4`),f={variant:n.variant===void 0?`default`:n.variant,align:n.align===void 0?`start`:n.align,className:n.class===void 0?``:n.class,children:n.children,classes:u},p={__style__(){return``},methods:{},props:{},compName:`Bubble`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <div data-slot="bubble" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" data-align="${olum.esc(n.align===void 0?`start`:n.align)}" class="${olum.esc(u())}">${n.children}</div>`,olum.injectStyle(`Bubble`,p.__style__()),olum.handleMarkup(`Bubble`,`h1car1my3n4`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{get base(){return s},get variants(){return c}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ar=e=>{let t=e||`BubbleContent`,n=l(t),{class:r=``,children:i}=l(t),a=`w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`BubbleContent`,`zeormx40f9`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`BubbleContent`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="bubble-content" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`BubbleContent`,u.__style__()),olum.handleMarkup(`BubbleContent`,`zeormx40f9`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},or=e=>{let t=e||`BubbleGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex min-w-0 flex-col gap-2 [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`BubbleGroup`,`vrcvcsy0d8f`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`BubbleGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="bubble-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`BubbleGroup`,c.__style__()),olum.handleMarkup(`BubbleGroup`,`vrcvcsy0d8f`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},sr=0;function cr(){return`carousel-${sr++}`}var lr=u({offsets:{},setOffset(e,t){this.offsets[e]=t},getOffset(e){return this.offsets[e]||0}}),ur=null,dr={};function fr(e,t){if(lr.setOffset(e,t),!ur){let e=document.createElement(`style`);e.setAttribute(`data-olum-carousel`,``),document.head.appendChild(e),ur=e.sheet}if(!dr[e]){let t=ur.insertRule(`[data-carousel-id="${e}"] [data-slot="carousel-track"]{transform:translateX(0px)}`,ur.cssRules.length);dr[e]=ur.cssRules[t]}dr[e].style.transform=`translateX(-${t}px)`}var pr=e=>{let t=e||`Carousel`,n=l(t),{class:r=``,children:i}=l(t),a=cr(),o=()=>q(`relative`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`Carousel`,`84n5uunhk2`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`Carousel`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="carousel" data-carousel-id="${olum.esc(a)}" role="region" aria-roledescription="carousel" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`Carousel`,u.__style__()),olum.handleMarkup(`Carousel`,`84n5uunhk2`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}};function mr(e,t,n,r){let i=(e,t)=>1-3*t+3*e,a=(e,t)=>3*t-6*e,o=e=>3*e,s=(e,t,n)=>((i(t,n)*e+a(t,n))*e+o(t))*e,c=(e,t,n)=>3*i(t,n)*e*e+2*a(t,n)*e+o(t),l=t=>{let r=t;for(let i=0;i<8;i++){let i=c(r,e,n);if(i===0)return r;r-=(s(r,e,n)-t)/i}return r};return e=>s(l(e),t,r)}var hr=mr(.4,0,.2,1);function gr(e,t,n,r){if(e===t)return;let i=performance.now(),a=o=>{let s=Math.min((o-i)/n,1);r(e+(t-e)*hr(s)),s<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}var _r=e=>{let t=e||`CarouselContent`,n=l(t),{class:r=``,children:i}=l(t);var a={id:null},s=o(()=>{let e=d.closest(`[data-slot="carousel"]`),t=d.querySelector(`[data-slot="carousel-content"]`),n=d.querySelector(`[data-slot="carousel-track"]`);if(!e||!t||!n)return;a.id=e.dataset.carouselId;let r=!1,i=0,o=0,s=()=>Math.max(0,n.scrollWidth-t.clientWidth),c=e=>fr(a.id,e),l=e=>{let n=s(),r=t.clientWidth*.4;return e<0?0:e>n?n+Math.min((e-n)*.6,r):e},u=e=>c(l(e)),f=e=>{r=!0,i=e.clientX,o=lr.getOffset(a.id),t.classList.remove(`cursor-grab`),t.classList.add(`cursor-grabbing`),t.setPointerCapture(e.pointerId),e.preventDefault()},p=e=>{r&&u(o-(e.clientX-i))},m=()=>{if(!r)return;r=!1,t.classList.remove(`cursor-grabbing`),t.classList.add(`cursor-grab`);let e=t.clientWidth+16,n=lr.getOffset(a.id);gr(n,Math.min(s(),Math.max(0,Math.round(n/e)*e)),400,c)};return t.addEventListener(`pointerdown`,f),t.addEventListener(`pointermove`,p),t.addEventListener(`pointerup`,m),t.addEventListener(`pointercancel`,m),()=>{t.removeEventListener(`pointerdown`,f),t.removeEventListener(`pointermove`,p),t.removeEventListener(`pointerup`,m),t.removeEventListener(`pointercancel`,m)}});let c=()=>q(`cursor-grab touch-pan-y overscroll-x-contain overflow-hidden select-none`,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`CarouselContent`,`6tkcyjcezob`),d=u,f={className:n.class===void 0?``:n.class,children:n.children,classes:c},p={__style__(){return``},methods:{},props:{},compName:`CarouselContent`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="carousel-content" class="${olum.esc(c())}">
  <div data-slot="carousel-track" class="flex gap-4 [&>[data-olum]]:contents">${n.children}</div>
</div>`,olum.injectStyle(`CarouselContent`,p.__style__()),olum.handleMarkup(`CarouselContent`,`6tkcyjcezob`,e,f)}};return a.__olum__={compName:t,compId:`6tkcyjcezob`},a=olum.proxyHandler(a,null,u),{methods:p.methods,props:p.props,__OLUM__:p,el:u,methodsRef:f,stateProps:a,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},vr=e=>{let t=e||`CarouselItem`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`min-w-0 shrink-0 grow-0 basis-full`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CarouselItem`,`8ima1a3oucm`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CarouselItem`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="carousel-item" role="group" aria-roledescription="slide" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CarouselItem`,c.__style__()),olum.handleMarkup(`CarouselItem`,`8ima1a3oucm`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},yr=e=>{let t=e||`CarouselNext`,n=l(t),{class:r=``}=l(t);var i={id:null};let a=()=>{let e=p.closest(`[data-slot="carousel"]`);return{viewport:e&&e.querySelector(`[data-slot="carousel-content"]`),track:e&&e.querySelector(`[data-slot="carousel-track"]`)}};var s=o(()=>{let e=p.closest(`[data-slot="carousel"]`);e&&(i.id=e.dataset.carouselId)});let c=()=>{if(i.id==null)return!1;let{track:e,viewport:t}=a();if(!e||!t)return!1;let n=Math.max(0,e.scrollWidth-t.clientWidth);return lr.getOffset(i.id)>=n-1},u=()=>{let{track:e,viewport:t}=a();if(!e||!t||i.id==null)return;let n=Math.max(0,e.scrollWidth-t.clientWidth),r=lr.getOffset(i.id);gr(r,Math.min(n,r+t.clientWidth+16),600,e=>{fr(i.id,e)})},d=()=>q(`absolute inset-y-0 -right-12 z-10 my-auto inline-flex size-7 touch-manipulation items-center justify-center rounded-full border border-border bg-background transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5`,n.class===void 0?``:n.class);var f=olum.mkElm(`div`,`CarouselNext`,`dya1a5fu6b4`),p=f,m={className:n.class===void 0?``:n.class,parts:a,isDisabled:c,go:u,classes:d},h={__style__(){return``},methods:{},props:{},compName:`CarouselNext`,deps:null,components:{},get getElm(){var e=f.isConnected?olum.vdom.mkStaging(f):f;return e.innerHTML=`
      <button type="button" data-slot="carousel-next" class="${olum.esc(d())}" ${c()?`disabled`:``} data-o-event='onclick|go=${JSON.stringify([])}'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
  <span class="sr-only">Next slide</span>
</button>`,olum.injectStyle(`CarouselNext`,h.__style__()),olum.handleMarkup(`CarouselNext`,`dya1a5fu6b4`,e,m)}};return i.__olum__={compName:t,compId:`dya1a5fu6b4`},i=olum.proxyHandler(i,null,f),{methods:h.methods,props:h.props,__OLUM__:h,el:f,methodsRef:m,stateProps:i,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},br=e=>{let t=e||`CarouselPrevious`,n=l(t),{class:r=``}=l(t);var i={id:null};let a=()=>{let e=p.closest(`[data-slot="carousel"]`);return{viewport:e&&e.querySelector(`[data-slot="carousel-content"]`),track:e&&e.querySelector(`[data-slot="carousel-track"]`)}};var s=o(()=>{let e=p.closest(`[data-slot="carousel"]`);e&&(i.id=e.dataset.carouselId)});let c=()=>i.id==null||lr.getOffset(i.id)<=0,u=()=>{let{track:e,viewport:t}=a();if(!e||!t||i.id==null)return;let n=lr.getOffset(i.id);gr(n,Math.max(0,n-(t.clientWidth+16)),600,e=>{fr(i.id,e)})},d=()=>q(`absolute inset-y-0 -left-12 z-10 my-auto inline-flex size-7 touch-manipulation items-center justify-center rounded-full border border-border bg-background transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5`,n.class===void 0?``:n.class);var f=olum.mkElm(`div`,`CarouselPrevious`,`j1yeumf7mu`),p=f,m={className:n.class===void 0?``:n.class,parts:a,isDisabled:c,go:u,classes:d},h={__style__(){return``},methods:{},props:{},compName:`CarouselPrevious`,deps:null,components:{},get getElm(){var e=f.isConnected?olum.vdom.mkStaging(f):f;return e.innerHTML=`
      <button type="button" data-slot="carousel-previous" class="${olum.esc(d())}" ${c()?`disabled`:``} data-o-event='onclick|go=${JSON.stringify([])}'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
  <span class="sr-only">Previous slide</span>
</button>`,olum.injectStyle(`CarouselPrevious`,h.__style__()),olum.handleMarkup(`CarouselPrevious`,`j1yeumf7mu`,e,m)}};return i.__olum__={compName:t,compId:`j1yeumf7mu`},i=olum.proxyHandler(i,null,f),{methods:h.methods,props:h.props,__OLUM__:h,el:f,methodsRef:m,stateProps:i,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},xr=e=>{let t=e||`BarChart`,n=l(t),{data:r=[],config:i={},xKey:a=`month`,class:s=``}=l(t);var c={hover:-1,x:0,y:0};let u=()=>Object.keys(n.config===void 0?{}:n.config),d=()=>{let e=Math.max(1,...(n.data===void 0?[]:n.data).flatMap(e=>u().map(t=>+e[t]||0))),t=10**Math.floor(Math.log10(e)),r=e/t;return(r<=1?1:r<=2?2:r<=4?4:r<=5?5:r<=8?8:10)*t},f=()=>460/Math.max(1,(n.data===void 0?[]:n.data).length),p=()=>Math.min(24,(f()-16)/Math.max(1,u().length)),m=(e,t)=>10+e*f()+f()/2-(u().length*p()+(u().length-1)*4)/2+t*(p()+4),h=(e,t)=>(+e[t]||0)/d()*214,g=(e,t)=>224-h(e,t),_=e=>10+214*(e-1)/4,v=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].color||`var(--color-chart-1)`,y=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].label||e,b=()=>Math.max(0,c.hover),x=()=>(n.data===void 0?[]:n.data)[b()]||{};var S=o(()=>{let e=D.querySelector(`[data-slot="bar-chart"]`),t=D.querySelector(`svg`);if(!e||!t)return;let n=t=>{let n=e.getBoundingClientRect();c.x=Math.min(Math.max(t.clientX-n.left,64),Math.max(64,n.width-64)),c.y=t.clientY-n.top};return t.addEventListener(`mousemove`,n),()=>t.removeEventListener(`mousemove`,n)});let C=()=>q(`relative flex w-full flex-col justify-center text-xs`,n.class===void 0?``:n.class),w=(e,t)=>(()=>c.hover=t)(e),T=()=>c.hover=-1;var E=olum.mkElm(`div`,`BarChart`,`43gnbxhctqn`),D=E,O={data:n.data===void 0?[]:n.data,config:n.config===void 0?{}:n.config,xKey:n.xKey===void 0?`month`:n.xKey,className:n.class===void 0?``:n.class,keys:u,top:d,groupW:f,barW:p,barX:m,barH:h,barY:g,gridY:_,color:v,labelFor:y,hoverIndex:b,hoverData:x,classes:C,__olumAnon_d012x1o:w,__olumAnon_5137f0u:T},k={__style__(){return``},methods:{},props:{},compName:`BarChart`,deps:null,components:{},get getElm(){var e=E.isConnected?olum.vdom.mkStaging(E):E;return e.innerHTML=`
      <div data-slot="bar-chart" class="${olum.esc(C())}">
  <svg class="min-h-0 w-full flex-1" viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet">
    ${[,,,,,].fill().map(function(e,t){return e=t+1,`
      <line x1="${olum.esc(10)}" x2="${olum.esc(470)}" y1="${olum.esc(_(e))}" y2="${olum.esc(_(e))}" stroke="var(--olum-border)" stroke-opacity="0.5"></line>
    `}).join(``)}
    ${(n.data===void 0?[]:n.data).map(function(e,t){return`
      
      <rect x="${olum.esc(10+t*f())}" y="${olum.esc(10)}" width="${olum.esc(f())}" height="${olum.esc(214)}" rx="4" fill="${olum.esc(c.hover===t?`var(--olum-muted)`:`transparent`)}" data-o-event='onmouseenter|__olumAnon_d012x1o=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_5137f0u=${JSON.stringify([`$event`])}' key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}"></rect>
      ${u().map(function(n,r){return`
        <rect x="${olum.esc(m(t,r))}" y="${olum.esc(g(e,n))}" width="${olum.esc(p())}" height="${olum.esc(h(e,n))}" rx="4" fill="${olum.esc(v(n))}" pointer-events="none" key="${olum.esc(n)}"></rect>
      `}).join(``)}
      <text x="${olum.esc(10+t*f()+f()/2)}" y="${olum.esc(242)}" text-anchor="middle" class="fill-muted-foreground" font-size="12" key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}">${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}</text>
    `}).join(``)}
  </svg>
  <div class="flex items-center justify-center gap-4 pt-3">
    ${u().map(function(e){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(v(e))}"></div>
        <span>${olum.esc(y(e))}</span>
      </div>
    `}).join(``)}
  </div>
  
  <div class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs shadow-xl ring-1 ring-border transition-opacity duration-150" style="left:${olum.esc(c.x)}px; top:${olum.esc(c.y)}px; transform: translate(-50%, calc(-100% - 12px)); opacity:${olum.esc(+(c.hover>-1))};">
    <div class="font-medium">${olum.esc(x()[n.xKey===void 0?`month`:n.xKey])}</div>
    ${u().map(function(e){return`
      <div class="flex w-full items-center gap-2" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(v(e))}"></div>
        <span class="text-muted-foreground">${olum.esc(y(e))}</span>
        <span class="ml-auto font-medium tabular-nums">${olum.esc(x()[e])}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`BarChart`,k.__style__()),olum.handleMarkup(`BarChart`,`43gnbxhctqn`,e,O)}};return c.__olum__={compName:t,compId:`43gnbxhctqn`},c=olum.proxyHandler(c,null,E),{methods:k.methods,props:k.props,__OLUM__:k,el:E,methodsRef:O,stateProps:c,localsRef:{get W(){return 480},get H(){return 250},get PT(){return 10},get PB(){return 26},get PL(){return 10},get PR(){return 10}},hooks:{mounted:S===void 0?null:S,unMounted:null,isMounted:!1,isUnMounted:!1}}},Sr=e=>{let t=e||`LineChart`,n=l(t),{data:r=[],config:i={},xKey:a=`month`,class:s=``}=l(t);var c={hover:-1,x:0,y:0};let u=()=>Object.keys(n.config===void 0?{}:n.config),d=()=>{let e=Math.max(1,...(n.data===void 0?[]:n.data).flatMap(e=>u().map(t=>+e[t]||0))),t=10**Math.floor(Math.log10(e)),r=e/t;return(r<=1?1:r<=2?2:r<=4?4:r<=5?5:r<=8?8:10)*t},f=()=>460/Math.max(1,(n.data===void 0?[]:n.data).length),p=e=>10+e*f()+f()/2,m=(e,t)=>224-(+e[t]||0)/d()*214,h=e=>10+214*(e-1)/4,g=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].color||`var(--color-chart-1)`,_=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].label||e,v=e=>(n.data===void 0?[]:n.data).map((t,n)=>`${p(n)},${m(t,e)}`).join(` `),y=()=>Math.max(0,c.hover),b=()=>(n.data===void 0?[]:n.data)[y()]||{};var x=o(()=>{let e=E.querySelector(`[data-slot="line-chart"]`),t=E.querySelector(`svg`);if(!e||!t)return;let n=t=>{let n=e.getBoundingClientRect();c.x=Math.min(Math.max(t.clientX-n.left,64),Math.max(64,n.width-64)),c.y=t.clientY-n.top};return t.addEventListener(`mousemove`,n),()=>t.removeEventListener(`mousemove`,n)});let S=()=>q(`relative flex w-full flex-col justify-center text-xs`,n.class===void 0?``:n.class),C=(e,t)=>(()=>c.hover=t)(e),w=()=>c.hover=-1;var T=olum.mkElm(`div`,`LineChart`,`zqmqeu53j1`),E=T,D={data:n.data===void 0?[]:n.data,config:n.config===void 0?{}:n.config,xKey:n.xKey===void 0?`month`:n.xKey,className:n.class===void 0?``:n.class,keys:u,top:d,groupW:f,pointX:p,pointY:m,gridY:h,color:g,labelFor:_,linePoints:v,hoverIndex:y,hoverData:b,classes:S,__olumAnon_heysj6i:C,__olumAnon_sk3hqn8:w},O={__style__(){return``},methods:{},props:{},compName:`LineChart`,deps:null,components:{},get getElm(){var e=T.isConnected?olum.vdom.mkStaging(T):T;return e.innerHTML=`
      <div data-slot="line-chart" class="${olum.esc(S())}">
  <svg class="min-h-0 w-full flex-1" viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet">
    ${[,,,,,].fill().map(function(e,t){return e=t+1,`
      <line x1="${olum.esc(10)}" x2="${olum.esc(470)}" y1="${olum.esc(h(e))}" y2="${olum.esc(h(e))}" stroke="var(--olum-border)" stroke-opacity="0.5"></line>
    `}).join(``)}
    ${(n.data===void 0?[]:n.data).map(function(e,t){return`
      
      <rect x="${olum.esc(10+t*f())}" y="${olum.esc(10)}" width="${olum.esc(f())}" height="${olum.esc(214)}" fill="${olum.esc(c.hover===t?`var(--olum-muted)`:`transparent`)}" data-o-event='onmouseenter|__olumAnon_heysj6i=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_sk3hqn8=${JSON.stringify([`$event`])}' key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}"></rect>
      <text x="${olum.esc(p(t))}" y="${olum.esc(242)}" text-anchor="middle" class="fill-muted-foreground" font-size="12" pointer-events="none" key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}">${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}</text>
    `}).join(``)}
    ${c.hover>-1?`
      <line x1="${olum.esc(p(y()))}" x2="${olum.esc(p(y()))}" y1="${olum.esc(10)}" y2="${olum.esc(224)}" stroke="var(--olum-border)" stroke-dasharray="3 3" pointer-events="none"></line>
    `:``}
    ${u().map(function(e){return`
      <polyline points="${olum.esc(v(e))}" fill="none" stroke="${olum.esc(g(e))}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none" key="${olum.esc(e)}"></polyline>
      ${(n.data===void 0?[]:n.data).map(function(t,r){return`
        <circle cx="${olum.esc(p(r))}" cy="${olum.esc(m(t,e))}" r="${olum.esc(c.hover===r?4:3)}" fill="${olum.esc(g(e))}" stroke="var(--olum-background)" stroke-width="1.5" pointer-events="none" key="${olum.esc(t[n.xKey===void 0?`month`:n.xKey])}"></circle>
      `}).join(``)}
    `}).join(``)}
  </svg>
  <div class="flex items-center justify-center gap-4 pt-3">
    ${u().map(function(e){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(g(e))}"></div>
        <span>${olum.esc(_(e))}</span>
      </div>
    `}).join(``)}
  </div>
  <div class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs shadow-xl ring-1 ring-border transition-opacity duration-150" style="left:${olum.esc(c.x)}px; top:${olum.esc(c.y)}px; transform: translate(-50%, calc(-100% - 12px)); opacity:${olum.esc(+(c.hover>-1))};">
    <div class="font-medium">${olum.esc(b()[n.xKey===void 0?`month`:n.xKey])}</div>
    ${u().map(function(e){return`
      <div class="flex w-full items-center gap-2" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(g(e))}"></div>
        <span class="text-muted-foreground">${olum.esc(_(e))}</span>
        <span class="ml-auto font-medium tabular-nums">${olum.esc(b()[e])}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`LineChart`,O.__style__()),olum.handleMarkup(`LineChart`,`zqmqeu53j1`,e,D)}};return c.__olum__={compName:t,compId:`zqmqeu53j1`},c=olum.proxyHandler(c,null,T),{methods:O.methods,props:O.props,__OLUM__:O,el:T,methodsRef:D,stateProps:c,localsRef:{get W(){return 480},get H(){return 250},get PT(){return 10},get PB(){return 26},get PL(){return 10},get PR(){return 10}},hooks:{mounted:x===void 0?null:x,unMounted:null,isMounted:!1,isUnMounted:!1}}},Cr=e=>{let t=e||`DonutChart`,n=l(t),{data:r=[],label:i=`Total`,class:a=``}=l(t);var o={hover:-1};let s=.025,c=()=>(n.data===void 0?[]:n.data).reduce((e,t)=>e+(+t.value||0),0),u=()=>{let e=Math.max(1,c()),t=-Math.PI/2;return(n.data===void 0?[]:n.data).map(n=>{let r=(+n.value||0)/e*Math.PI*2,i=t,a=t+r;return t=a,{start:i+s/2,end:Math.max(i+s/2,a-s/2)}})},d=(e,t)=>[125+e*Math.cos(t),125+e*Math.sin(t)],f=(e,t)=>{let n=+(t-e>Math.PI),[r,i]=d(100,e),[a,o]=d(100,t),[s,c]=d(62,t),[l,u]=d(62,e);return`M ${r} ${i} A 100 100 0 ${n} 1 ${a} ${o} L ${s} ${c} A 62 62 0 ${n} 0 ${l} ${u} Z`},p=(e,t)=>e.color||`var(--color-chart-${t%5+1})`,m=e=>o.hover===-1||o.hover===e?1:.35,h=()=>o.hover>-1?(n.data===void 0?[]:n.data)[o.hover].name:n.label===void 0?`Total`:n.label,g=()=>o.hover>-1?(n.data===void 0?[]:n.data)[o.hover].value:c(),_=()=>q(`relative flex w-full flex-col items-center justify-center text-xs`,n.class===void 0?``:n.class),v=(e,t)=>(()=>o.hover=t)(e),y=()=>o.hover=-1;var b=olum.mkElm(`div`,`DonutChart`,`0ttizg1qp3u9`),x={data:n.data===void 0?[]:n.data,label:n.label===void 0?`Total`:n.label,className:n.class===void 0?``:n.class,total:c,angles:u,point:d,slicePath:f,color:p,opacityFor:m,centerName:h,centerValue:g,classes:_,__olumAnon_wa2893k:v,__olumAnon_3oswv7w:y},S={__style__(){return``},methods:{},props:{},compName:`DonutChart`,deps:null,components:{},get getElm(){var e=b.isConnected?olum.vdom.mkStaging(b):b;return e.innerHTML=`
      <div data-slot="donut-chart" class="${olum.esc(_())}">
  <div class="relative w-full max-w-56">
    <svg class="w-full" viewBox="0 0 250 250">
      ${(n.data===void 0?[]:n.data).map(function(e,t){return`
        <path d="${olum.esc(f(u()[t].start,u()[t].end))}" fill="${olum.esc(p(e,t))}" opacity="${olum.esc(m(t))}" class="transition-opacity duration-150" data-o-event='onmouseenter|__olumAnon_wa2893k=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_3oswv7w=${JSON.stringify([`$event`])}' key="${olum.esc(e.name)}"></path>
      `}).join(``)}
    </svg>
    <div class="pointer-events-none absolute inset-0 grid place-items-center">
      <div class="flex flex-col items-center">
        <span class="text-2xl font-semibold tabular-nums">${olum.esc(g())}</span>
        <span class="text-muted-foreground capitalize">${olum.esc(h())}</span>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap items-center justify-center gap-4 pt-3">
    ${(n.data===void 0?[]:n.data).map(function(e,t){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e.name)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(p(e,t))}"></div>
        <span>${olum.esc(e.name)}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`DonutChart`,S.__style__()),olum.handleMarkup(`DonutChart`,`0ttizg1qp3u9`,e,x)}};return o.__olum__={compName:t,compId:`0ttizg1qp3u9`},o=olum.proxyHandler(o,null,b),{methods:S.methods,props:S.props,__OLUM__:S,el:b,methodsRef:x,stateProps:o,localsRef:{get W(){return 250},get H(){return 250},get OUTER_R(){return 100},get INNER_R(){return 62},get PAD_ANGLE(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},wr=0;function Tr(){return`chart-${wr++}`}var Er=e=>{let t=e||`AreaChart`,n=l(t),{data:r=[],config:i={},xKey:a=`month`,class:s=``}=l(t),c=Tr();var u={hover:-1,x:0,y:0};let d=()=>Object.keys(n.config===void 0?{}:n.config),f=()=>{let e=Math.max(1,...(n.data===void 0?[]:n.data).flatMap(e=>d().map(t=>+e[t]||0))),t=10**Math.floor(Math.log10(e)),r=e/t;return(r<=1?1:r<=2?2:r<=4?4:r<=5?5:r<=8?8:10)*t},p=()=>460/Math.max(1,(n.data===void 0?[]:n.data).length),m=e=>10+e*p()+p()/2,h=(e,t)=>224-(+e[t]||0)/f()*214,g=e=>10+214*(e-1)/4,_=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].color||`var(--color-chart-1)`,v=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].label||e,y=e=>(n.data===void 0?[]:n.data).map((t,n)=>`${m(n)},${h(t,e)}`).join(` `),b=e=>{if(!(n.data===void 0?[]:n.data).length)return``;let t=m(0),r=m((n.data===void 0?[]:n.data).length-1);return`M ${t} 224 L ${y(e).split(` `).join(` L `)} L ${r} 224 Z`},x=()=>Math.max(0,u.hover),S=()=>(n.data===void 0?[]:n.data)[x()]||{};var C=o(()=>{let e=O.querySelector(`[data-slot="area-chart"]`),t=O.querySelector(`svg`);if(!e||!t)return;let n=t=>{let n=e.getBoundingClientRect();u.x=Math.min(Math.max(t.clientX-n.left,64),Math.max(64,n.width-64)),u.y=t.clientY-n.top};return t.addEventListener(`mousemove`,n),()=>t.removeEventListener(`mousemove`,n)});let w=()=>q(`relative flex w-full flex-col justify-center text-xs`,n.class===void 0?``:n.class),T=(e,t)=>(()=>u.hover=t)(e),E=()=>u.hover=-1;var D=olum.mkElm(`div`,`AreaChart`,`xgdm1aaevp`),O=D,k={data:n.data===void 0?[]:n.data,config:n.config===void 0?{}:n.config,xKey:n.xKey===void 0?`month`:n.xKey,className:n.class===void 0?``:n.class,keys:d,top:f,groupW:p,pointX:m,pointY:h,gridY:g,color:_,labelFor:v,linePoints:y,areaPath:b,hoverIndex:x,hoverData:S,classes:w,__olumAnon_qb0aqrf:T,__olumAnon_hqi4rr1:E},A={__style__(){return``},methods:{},props:{},compName:`AreaChart`,deps:null,components:{},get getElm(){var e=D.isConnected?olum.vdom.mkStaging(D):D;return e.innerHTML=`
      <div data-slot="area-chart" class="${olum.esc(w())}">
  <svg class="min-h-0 w-full flex-1" viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet">
    <defs>
      ${d().map(function(e){return`
        <linearGradient id="${olum.esc(c)}-${olum.esc(e)}" x1="0" y1="0" x2="0" y2="1" key="${olum.esc(e)}">
          <stop offset="5%" stop-color="${olum.esc(_(e))}" stop-opacity="0.7"></stop>
          <stop offset="95%" stop-color="${olum.esc(_(e))}" stop-opacity="0.05"></stop>
        </linearGradient>
      `}).join(``)}
    </defs>
    ${[,,,,,].fill().map(function(e,t){return e=t+1,`
      <line x1="${olum.esc(10)}" x2="${olum.esc(470)}" y1="${olum.esc(g(e))}" y2="${olum.esc(g(e))}" stroke="var(--olum-border)" stroke-opacity="0.5"></line>
    `}).join(``)}
    ${d().map(function(e){return`
      <path d="${olum.esc(b(e))}" fill="url(#${olum.esc(c)}-${olum.esc(e)})" stroke="none" pointer-events="none" key="${olum.esc(e)}"></path>
      <polyline points="${olum.esc(y(e))}" fill="none" stroke="${olum.esc(_(e))}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none" key="${olum.esc(e)}"></polyline>
    `}).join(``)}
    ${(n.data===void 0?[]:n.data).map(function(e,t){return`
      
      <rect x="${olum.esc(10+t*p())}" y="${olum.esc(10)}" width="${olum.esc(p())}" height="${olum.esc(214)}" fill="transparent" data-o-event='onmouseenter|__olumAnon_qb0aqrf=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_hqi4rr1=${JSON.stringify([`$event`])}' key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}"></rect>
      <text x="${olum.esc(m(t))}" y="${olum.esc(242)}" text-anchor="middle" class="fill-muted-foreground" font-size="12" pointer-events="none" key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}">${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}</text>
    `}).join(``)}
    ${u.hover>-1?`
      <line x1="${olum.esc(m(x()))}" x2="${olum.esc(m(x()))}" y1="${olum.esc(10)}" y2="${olum.esc(224)}" stroke="var(--olum-border)" stroke-dasharray="3 3" pointer-events="none"></line>
    `:``}
  </svg>
  <div class="flex items-center justify-center gap-4 pt-3">
    ${d().map(function(e){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(_(e))}"></div>
        <span>${olum.esc(v(e))}</span>
      </div>
    `}).join(``)}
  </div>
  <div class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs shadow-xl ring-1 ring-border transition-opacity duration-150" style="left:${olum.esc(u.x)}px; top:${olum.esc(u.y)}px; transform: translate(-50%, calc(-100% - 12px)); opacity:${olum.esc(+(u.hover>-1))};">
    <div class="font-medium">${olum.esc(S()[n.xKey===void 0?`month`:n.xKey])}</div>
    ${d().map(function(e){return`
      <div class="flex w-full items-center gap-2" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(_(e))}"></div>
        <span class="text-muted-foreground">${olum.esc(v(e))}</span>
        <span class="ml-auto font-medium tabular-nums">${olum.esc(S()[e])}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`AreaChart`,A.__style__()),olum.handleMarkup(`AreaChart`,`xgdm1aaevp`,e,k)}};return u.__olum__={compName:t,compId:`xgdm1aaevp`},u=olum.proxyHandler(u,null,D),{methods:A.methods,props:A.props,__OLUM__:A,el:D,methodsRef:k,stateProps:u,localsRef:{get W(){return 480},get H(){return 250},get PT(){return 10},get PB(){return 26},get PL(){return 10},get PR(){return 10}},hooks:{mounted:C===void 0?null:C,unMounted:null,isMounted:!1,isUnMounted:!1}}},Dr=e=>{let t=e||`ComposedChart`,n=l(t),{data:r=[],config:i={},xKey:a=`month`,class:s=``}=l(t);var c={hover:-1,x:0,y:0};let u=()=>Object.keys(n.config===void 0?{}:n.config),d=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].type||`bar`,f=()=>u().filter(e=>d(e)===`bar`),p=()=>u().filter(e=>d(e)===`line`),m=()=>{let e=Math.max(1,...(n.data===void 0?[]:n.data).flatMap(e=>u().map(t=>+e[t]||0))),t=10**Math.floor(Math.log10(e)),r=e/t;return(r<=1?1:r<=2?2:r<=4?4:r<=5?5:r<=8?8:10)*t},h=()=>460/Math.max(1,(n.data===void 0?[]:n.data).length),g=e=>10+e*h()+h()/2,_=(e,t)=>224-(+e[t]||0)/m()*214,v=e=>10+214*(e-1)/4,y=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].color||`var(--color-chart-1)`,b=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].label||e,x=()=>Math.min(24,(h()-16)/Math.max(1,f().length)),S=(e,t)=>g(e)-(f().length*x()+(f().length-1)*4)/2+t*(x()+4),C=(e,t)=>214-(_(e,t)-10),w=e=>(n.data===void 0?[]:n.data).map((t,n)=>`${g(n)},${_(t,e)}`).join(` `),T=()=>Math.max(0,c.hover),E=()=>(n.data===void 0?[]:n.data)[T()]||{};var D=o(()=>{let e=M.querySelector(`[data-slot="composed-chart"]`),t=M.querySelector(`svg`);if(!e||!t)return;let n=t=>{let n=e.getBoundingClientRect();c.x=Math.min(Math.max(t.clientX-n.left,64),Math.max(64,n.width-64)),c.y=t.clientY-n.top};return t.addEventListener(`mousemove`,n),()=>t.removeEventListener(`mousemove`,n)});let O=()=>q(`relative flex w-full flex-col justify-center text-xs`,n.class===void 0?``:n.class),k=(e,t)=>(()=>c.hover=t)(e),A=()=>c.hover=-1;var j=olum.mkElm(`div`,`ComposedChart`,`9uighq1uim6`),M=j,N={data:n.data===void 0?[]:n.data,config:n.config===void 0?{}:n.config,xKey:n.xKey===void 0?`month`:n.xKey,className:n.class===void 0?``:n.class,keys:u,typeOf:d,barKeys:f,lineKeys:p,top:m,groupW:h,groupCenter:g,valueY:_,gridY:v,color:y,labelFor:b,barW:x,barX:S,barH:C,linePoints:w,hoverIndex:T,hoverData:E,classes:O,__olumAnon_42mmwdt:k,__olumAnon_q8vrwp2:A},P={__style__(){return``},methods:{},props:{},compName:`ComposedChart`,deps:null,components:{},get getElm(){var e=j.isConnected?olum.vdom.mkStaging(j):j;return e.innerHTML=`
      <div data-slot="composed-chart" class="${olum.esc(O())}">
  <svg class="min-h-0 w-full flex-1" viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet">
    ${[,,,,,].fill().map(function(e,t){return e=t+1,`
      <line x1="${olum.esc(10)}" x2="${olum.esc(470)}" y1="${olum.esc(v(e))}" y2="${olum.esc(v(e))}" stroke="var(--olum-border)" stroke-opacity="0.5"></line>
    `}).join(``)}
    ${(n.data===void 0?[]:n.data).map(function(e,t){return`
      
      <rect x="${olum.esc(10+t*h())}" y="${olum.esc(10)}" width="${olum.esc(h())}" height="${olum.esc(214)}" rx="4" fill="${olum.esc(c.hover===t?`var(--olum-muted)`:`transparent`)}" data-o-event='onmouseenter|__olumAnon_42mmwdt=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_q8vrwp2=${JSON.stringify([`$event`])}' key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}"></rect>
      ${f().map(function(n,r){return`
        <rect x="${olum.esc(S(t,r))}" y="${olum.esc(_(e,n))}" width="${olum.esc(x())}" height="${olum.esc(C(e,n))}" rx="4" fill="${olum.esc(y(n))}" pointer-events="none" key="${olum.esc(n)}"></rect>
      `}).join(``)}
      <text x="${olum.esc(g(t))}" y="${olum.esc(242)}" text-anchor="middle" class="fill-muted-foreground" font-size="12" pointer-events="none" key="${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}">${olum.esc(e[n.xKey===void 0?`month`:n.xKey])}</text>
    `}).join(``)}
    ${p().map(function(e){return`
      <polyline points="${olum.esc(w(e))}" fill="none" stroke="${olum.esc(y(e))}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none" key="${olum.esc(e)}"></polyline>
      ${(n.data===void 0?[]:n.data).map(function(t,r){return`
        <circle cx="${olum.esc(g(r))}" cy="${olum.esc(_(t,e))}" r="${olum.esc(c.hover===r?4:3)}" fill="${olum.esc(y(e))}" stroke="var(--olum-background)" stroke-width="1.5" pointer-events="none" key="${olum.esc(t[n.xKey===void 0?`month`:n.xKey])}"></circle>
      `}).join(``)}
    `}).join(``)}
  </svg>
  <div class="flex items-center justify-center gap-4 pt-3">
    ${u().map(function(e){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(y(e))}"></div>
        <span>${olum.esc(b(e))}</span>
      </div>
    `}).join(``)}
  </div>
  <div class="pointer-events-none absolute z-10 grid min-w-32 gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs shadow-xl ring-1 ring-border transition-opacity duration-150" style="left:${olum.esc(c.x)}px; top:${olum.esc(c.y)}px; transform: translate(-50%, calc(-100% - 12px)); opacity:${olum.esc(+(c.hover>-1))};">
    <div class="font-medium">${olum.esc(E()[n.xKey===void 0?`month`:n.xKey])}</div>
    ${u().map(function(e){return`
      <div class="flex w-full items-center gap-2" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(y(e))}"></div>
        <span class="text-muted-foreground">${olum.esc(b(e))}</span>
        <span class="ml-auto font-medium tabular-nums">${olum.esc(E()[e])}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`ComposedChart`,P.__style__()),olum.handleMarkup(`ComposedChart`,`9uighq1uim6`,e,N)}};return c.__olum__={compName:t,compId:`9uighq1uim6`},c=olum.proxyHandler(c,null,j),{methods:P.methods,props:P.props,__OLUM__:P,el:j,methodsRef:N,stateProps:c,localsRef:{get W(){return 480},get H(){return 250},get PT(){return 10},get PB(){return 26},get PL(){return 10},get PR(){return 10}},hooks:{mounted:D===void 0?null:D,unMounted:null,isMounted:!1,isUnMounted:!1}}},Or=e=>{let t=e||`RadialBarChart`,n=l(t),{data:r=[],config:i={},max:a,centerLabel:o=`Total`,class:s=``}=l(t);var c={hover:-1};let u=-Math.PI/2,d=()=>(n.data===void 0?[]:n.data)[0]||{},f=()=>Object.keys(n.config===void 0?{}:n.config),p=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].color||`var(--color-chart-1)`,m=e=>(n.config===void 0?{}:n.config)[e]&&(n.config===void 0?{}:n.config)[e].label||e,h=e=>+d()[e]||0,g=()=>n.max||Math.max(1,...f().map(e=>h(e))),_=e=>Math.min(.999,h(e)/g()),v=e=>96-e*18,y=(e,t)=>[125+e*Math.cos(t),125+e*Math.sin(t)],b=(e,t)=>{let n=u+t*Math.PI*2,[r,i]=y(e,u),[a,o]=y(e,n);return`M ${r} ${i} A ${e} ${e} 0 ${+(t>.5)} 1 ${a} ${o}`},x=()=>f().reduce((e,t)=>e+h(t),0),S=()=>c.hover>-1?m(f()[c.hover]):n.centerLabel===void 0?`Total`:n.centerLabel,C=()=>c.hover>-1?h(f()[c.hover]):x(),w=e=>c.hover===-1||c.hover===e?1:.35,T=()=>q(`relative flex w-full flex-col items-center justify-center text-xs`,n.class===void 0?``:n.class),E=(e,t)=>(()=>c.hover=t)(e),D=()=>c.hover=-1;var O=olum.mkElm(`div`,`RadialBarChart`,`er8uvxbgj26`),k={data:n.data===void 0?[]:n.data,config:n.config===void 0?{}:n.config,maxProp:n.max,centerLabel:n.centerLabel===void 0?`Total`:n.centerLabel,className:n.class===void 0?``:n.class,row:d,keys:f,color:p,labelFor:m,readValue:h,domainMax:g,fraction:_,ringRadius:v,point:y,arcPath:b,total:x,centerName:S,centerValue:C,opacityFor:w,classes:T,__olumAnon_ury0fn8:E,__olumAnon_1txmt6s:D},A={__style__(){return``},methods:{},props:{},compName:`RadialBarChart`,deps:null,components:{},get getElm(){var e=O.isConnected?olum.vdom.mkStaging(O):O;return e.innerHTML=`
      <div data-slot="radial-bar-chart" class="${olum.esc(T())}">
  <div class="relative w-full max-w-56">
    <svg class="w-full" viewBox="0 0 250 250">
      ${f().map(function(e,t){return`
        <circle cx="${olum.esc(125)}" cy="${olum.esc(125)}" r="${olum.esc(v(t))}" fill="none" stroke="var(--olum-muted)" stroke-width="${olum.esc(14)}" key="${olum.esc(e)}"></circle>
        <path d="${olum.esc(b(v(t),_(e)))}" fill="none" stroke="${olum.esc(p(e))}" stroke-width="${olum.esc(14)}" stroke-linecap="round" opacity="${olum.esc(w(t))}" class="transition-opacity duration-150" pointer-events="none" key="${olum.esc(e)}"></path>
        <circle cx="${olum.esc(125)}" cy="${olum.esc(125)}" r="${olum.esc(v(t))}" fill="none" stroke="transparent" stroke-width="${olum.esc(22)}" data-o-event='onmouseenter|__olumAnon_ury0fn8=${JSON.stringify([`$event`,t])}OLUM_EVT_SEPonmouseleave|__olumAnon_1txmt6s=${JSON.stringify([`$event`])}' key="${olum.esc(e)}"></circle>
      `}).join(``)}
    </svg>
    <div class="pointer-events-none absolute inset-0 grid place-items-center">
      <div class="flex flex-col items-center">
        <span class="text-2xl font-semibold tabular-nums">${olum.esc(C())}</span>
        <span class="text-muted-foreground capitalize">${olum.esc(S())}</span>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap items-center justify-center gap-4 pt-3">
    ${f().map(function(e){return`
      <div class="flex items-center gap-1.5" key="${olum.esc(e)}">
        <div class="size-2 shrink-0 rounded-[2px]" style="background:${olum.esc(p(e))}"></div>
        <span>${olum.esc(m(e))}</span>
      </div>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`RadialBarChart`,A.__style__()),olum.handleMarkup(`RadialBarChart`,`er8uvxbgj26`,e,k)}};return c.__olum__={compName:t,compId:`er8uvxbgj26`},c=olum.proxyHandler(c,null,O),{methods:A.methods,props:A.props,__OLUM__:A,el:O,methodsRef:k,stateProps:c,localsRef:{get W(){return 250},get H(){return 250},get OUTER_R(){return 96},get RING_WIDTH(){return 14}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},kr=e=>{let t=e||`Collapsible`,n=l(t),{defaultOpen:r=!1,disabled:i=!1,class:a=``,children:o}=l(t),s=()=>q(`group/collapsible [&>*:has([data-slot=collapsible-content])]:grid [&>*:has([data-slot=collapsible-content])]:grid-rows-[0fr] [&>*:has([data-slot=collapsible-content])]:transition-[grid-template-rows] has-[>input:checked]:[&>*:has([data-slot=collapsible-content])]:grid-rows-[1fr]`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Collapsible`,`vug4w0i9qjp`),u={defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Collapsible`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="collapsible" class="${olum.esc(s())}">
  <input type="checkbox" class="peer sr-only" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``}>
  ${n.children}
</div>`,olum.injectStyle(`Collapsible`,d.__style__()),olum.handleMarkup(`Collapsible`,`vug4w0i9qjp`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ar=e=>{let t=e||`CollapsibleTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="collapsible"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{!t||t.disabled||(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`CollapsibleTrigger`,`t2cz2my67ie`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`CollapsibleTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="collapsible-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`CollapsibleTrigger`,f.__style__()),olum.handleMarkup(`CollapsibleTrigger`,`t2cz2my67ie`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},jr=e=>{let t=e||`CollapsibleContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CollapsibleContent`,`s5zry99yas`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CollapsibleContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="collapsible-content" class="overflow-hidden min-h-0"><div class="${olum.esc(a())}">${n.children}</div></div>`,olum.injectStyle(`CollapsibleContent`,c.__style__()),olum.handleMarkup(`CollapsibleContent`,`s5zry99yas`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Mr=e=>{let t=e||`DropdownMenu`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`DropdownMenu`,`3i212aldo2y`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`DropdownMenu`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="dropdown-menu" class="relative inline-block [&_[data-slot=dropdown-menu-content]]:hidden has-[>input:checked]:[&_[data-slot=dropdown-menu-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`DropdownMenu`,o.__style__()),olum.handleMarkup(`DropdownMenu`,`3i212aldo2y`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Nr=e=>{let t=e||`DropdownMenuTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="dropdown-menu"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DropdownMenuTrigger`,`jjicm3oud4l`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DropdownMenuTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="dropdown-menu-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`DropdownMenuTrigger`,f.__style__()),olum.handleMarkup(`DropdownMenuTrigger`,`jjicm3oud4l`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Pr=e=>{let t=e||`DropdownMenuContent`,n=l(t),{align:r=`start`,class:i=``,children:a}=l(t);var s=o(()=>{let e=f.closest(`[data-slot="dropdown-menu"]`),t=e&&e.querySelector(`:scope > input`),n=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},r=t=>{e&&!e.contains(t.target)&&n()},i=e=>{e.key===`Escape`&&t&&t.checked&&n()},a=e=>{let t=e.target.closest(`[data-slot=dropdown-menu-item]`);t&&!t.hasAttribute(`data-sub-trigger`)&&n()};return document.addEventListener(`click`,r),document.addEventListener(`keydown`,i),f.addEventListener(`click`,a),()=>{document.removeEventListener(`click`,r),document.removeEventListener(`keydown`,i),f.removeEventListener(`click`,a)}});let c={start:`left-0`,center:`left-1/2 -translate-x-1/2`,end:`right-0`},u=()=>q(`absolute top-full z-50 mt-1 min-w-32 rounded-lg bg-background p-1 text-foreground shadow-md ring-1 ring-border outline-none`,c[n.align===void 0?`start`:n.align]||c.start,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`DropdownMenuContent`,`gumv7i4cab`),f=d,p={align:n.align===void 0?`start`:n.align,className:n.class===void 0?``:n.class,children:n.children,classes:u},m={__style__(){return``},methods:{},props:{},compName:`DropdownMenuContent`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <div data-slot="dropdown-menu-content" class="${olum.esc(u())}">${n.children}</div>`,olum.injectStyle(`DropdownMenuContent`,m.__style__()),olum.handleMarkup(`DropdownMenuContent`,`gumv7i4cab`,e,p)}};return{methods:m.methods,props:m.props,__OLUM__:m,el:d,methodsRef:p,stateProps:null,localsRef:{get aligns(){return c}},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},Fr=e=>{let t=e||`DropdownMenuCheckboxItem`,n=l(t),{value:r,defaultChecked:i=!1,inset:a=!1,disabled:o=!1,onCheckedChange:s,class:c=``,children:u}=l(t);var d={checked:n.defaultChecked!==void 0&&n.defaultChecked};let f=()=>{d.checked=!d.checked,n.onCheckedChange&&n.onCheckedChange(d.checked)},p=`relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none hover:bg-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,m=()=>q(p,n.inset!==void 0&&n.inset?`pl-7`:``,n.class===void 0?``:n.class);var h=olum.mkElm(`div`,`DropdownMenuCheckboxItem`,`7as7c1la4hg`),g={value:n.value,defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,inset:n.inset!==void 0&&n.inset,disabled:n.disabled!==void 0&&n.disabled,onCheckedChange:n.onCheckedChange,className:n.class===void 0?``:n.class,children:n.children,toggle:f,classes:m},_={__style__(){return``},methods:{},props:{},compName:`DropdownMenuCheckboxItem`,deps:null,components:{},get getElm(){var e=h.isConnected?olum.vdom.mkStaging(h):h;return e.innerHTML=`
      <button type="button" data-slot="dropdown-menu-checkbox-item" data-inset="${olum.esc(n.inset!==void 0&&n.inset)}" data-value="${olum.esc(n.value)}" role="menuitemcheckbox" aria-checked="${olum.esc(d.checked)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(m())}" data-o-event='onclick|toggle=${JSON.stringify([])}'>
  <div data-o-show="" style="display:${d.checked?`contents`:`none`};">
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
    </span>
  </div>
  ${n.children}
</button>`,olum.injectStyle(`DropdownMenuCheckboxItem`,_.__style__()),olum.handleMarkup(`DropdownMenuCheckboxItem`,`7as7c1la4hg`,e,g)}};return d.__olum__={compName:t,compId:`7as7c1la4hg`},d=olum.proxyHandler(d,null,h),{methods:_.methods,props:_.props,__OLUM__:_,el:h,methodsRef:g,stateProps:d,localsRef:{get base(){return p}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ir=e=>{let t=e||`Table`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`table w-full caption-bottom border-collapse text-sm [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Table`,`cxz4wb6dnsf`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Table`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="table-container" class="relative w-full overflow-x-auto">
  <div data-slot="table" role="table" class="${olum.esc(a())}">${n.children}</div>
</div>`,olum.injectStyle(`Table`,c.__style__()),olum.handleMarkup(`Table`,`cxz4wb6dnsf`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Lr=e=>{let t=e||`TableHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`table-header-group [&_[data-slot=table-row]]:border-b [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`TableHeader`,`z0c7o8eclnk`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`TableHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="table-header" role="rowgroup" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`TableHeader`,c.__style__()),olum.handleMarkup(`TableHeader`,`z0c7o8eclnk`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Rr=e=>{let t=e||`TableBody`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`table-row-group [&>*:last-child>[data-slot=table-row]]:border-0 [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`TableBody`,`7qkiqo13hvt`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`TableBody`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="table-body" role="rowgroup" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`TableBody`,c.__style__()),olum.handleMarkup(`TableBody`,`7qkiqo13hvt`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},zr=e=>{let t=e||`TableRow`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`table-row border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`TableRow`,`gg0jdugdfzs`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`TableRow`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="table-row" role="row" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`TableRow`,c.__style__()),olum.handleMarkup(`TableRow`,`gg0jdugdfzs`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Br=e=>{let t=e||`TableHead`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`table-cell h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`TableHead`,`kyf9780q4t9`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`TableHead`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="table-head" role="columnheader" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`TableHead`,c.__style__()),olum.handleMarkup(`TableHead`,`kyf9780q4t9`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vr=e=>{let t=e||`TableCell`,n=l(t),{colspan:r,class:i=``,children:a}=l(t),o=()=>q(`table-cell p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`TableCell`,`kmbvoh5ruih`),c={colspan:n.colspan,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`TableCell`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="table-cell" role="cell" colspan="${olum.esc(n.colspan)}" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`TableCell`,u.__style__()),olum.handleMarkup(`TableCell`,`kmbvoh5ruih`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Hr=e=>{let t=e||`DataTable`,n=l(t),{data:r=[],columns:i=[],search:a=!1,searchPlaceholder:s=`Filter...`,pageSize:c=10,selectable:u=!1,showPagination:d=!0,showPrevNext:f=!1,showExport:p=!1,rowLink:m,class:h=``}=l(t);var g={q:``,sortKey:null,sortDir:`asc`,hidden:{},page:0,selected:{}};let _=e=>{g.q=e.target.value,g.page=0},v=e=>{let t=e==null?``:String(e);return/[",\n]/.test(t)?`"`+t.replace(/"/g,`""`)+`"`:t},y=()=>{let e=x().filter(e=>g.selected[e.id]);return e.length?e:x()},b=()=>{let e=C(),t=[e.map(e=>v(e.label)).join(`,`),...y().map(t=>e.map(e=>v(E(t,e))).join(`,`))],n=new Blob([t.join(`
`)],{type:`text/csv;charset=utf-8;`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`export.csv`,i.click(),URL.revokeObjectURL(r)},x=()=>{let e=g.q.trim().toLowerCase();return e?(n.data===void 0?[]:n.data).filter(t=>Object.values(t).some(t=>String(t).toLowerCase().includes(e))):n.data===void 0?[]:n.data},S=()=>{let e=x().slice();g.sortKey&&e.sort((e,t)=>{let n=e[g.sortKey],r=t[g.sortKey],i=n>r?1:n<r?-1:0;return g.sortDir===`desc`?-i:i});let t=D()*(n.pageSize===void 0?10:n.pageSize);return e.slice(t,t+(n.pageSize===void 0?10:n.pageSize))},C=()=>(n.columns===void 0?[]:n.columns).filter(e=>!g.hidden[e.key]),w=e=>{g.sortKey===e?g.sortDir=g.sortDir===`asc`?`desc`:`asc`:(g.sortKey=e,g.sortDir=`asc`)},T=(e,t)=>{g.hidden={...g.hidden,[e]:!t}},E=(e,t)=>t.format===`currency`?new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`}).format(+e[t.key]):e[t.key],D=()=>Math.min(Math.max(0,g.page),N()-1),O=()=>D()>0,k=()=>(D()+1)*(n.pageSize===void 0?10:n.pageSize)<x().length,A=()=>O()&&(g.page=D()-1),j=()=>k()&&(g.page=D()+1),M=()=>Math.min((D()+1)*(n.pageSize===void 0?10:n.pageSize),x().length),N=()=>Math.max(1,Math.ceil(x().length/(n.pageSize===void 0?10:n.pageSize))),P=()=>D()+1,ee=e=>g.page=Math.min(Math.max(0,e-1),N()-1),F=()=>g.page=0,te=()=>g.page=N()-1,ne=()=>{let e=N(),t=P(),n=new Set([1,e]);for(let r=t-1;r<=t+1;r++)r>=1&&r<=e&&n.add(r);let r=Array.from(n).sort((e,t)=>e-t),i=[];return r.forEach((e,t)=>{t>0&&e-r[t-1]>1&&i.push(`...`+r[t-1]),i.push(e)}),i},I=()=>typeof n.rowLink==`function`,L=e=>I()&&n.rowLink(e)||{},R=e=>!!g.selected[e],z=()=>x().filter(e=>g.selected[e.id]).length,re=()=>S().length>0&&S().every(e=>g.selected[e.id]),ie=(e,t)=>{let n={...g.selected};t?n[e]=!0:delete n[e],g.selected=n},B=e=>{let t={...g.selected};S().forEach(n=>{e?t[n.id]=!0:delete t[n.id]}),g.selected=t};var V=o(()=>{let e=e=>{let t=e.target.closest(`[data-slot="button"][data-role="sort"]`);if(t&&t.dataset.value){w(t.dataset.value);return}let n=e.target.closest(`[data-slot="button"][data-role="page"]`);if(n){let e=n.dataset.value;e===`first`?F():e===`last`?te():ee(+e);return}let r=e.target.closest(`[data-slot="dropdown-menu-checkbox-item"]`);if(r&&r.dataset.value){T(r.dataset.value,r.getAttribute(`aria-checked`)===`true`);return}let i=e.target.closest(`input[data-role="select-all"]`);if(i){B(i.checked);return}let a=e.target.closest(`input[data-row-id]`);a&&ie(a.dataset.rowId,a.checked)};return ce.addEventListener(`click`,e),()=>ce.removeEventListener(`click`,e)});let ae=()=>q(`flex w-full flex-col gap-3`,n.class===void 0?``:n.class),oe=`peer relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-[4px] border border-border bg-background transition-colors outline-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 checked:border-primary checked:bg-primary checked:text-primary-foreground`,se=`pointer-events-none absolute inset-0 m-auto size-3.5 text-primary-foreground`;var H=olum.mkElm(`div`,`DataTable`,`wiudo7eaj6c`),ce=H,le={data:n.data===void 0?[]:n.data,columns:n.columns===void 0?[]:n.columns,search:n.search!==void 0&&n.search,searchPlaceholder:n.searchPlaceholder===void 0?`Filter...`:n.searchPlaceholder,pageSize:n.pageSize===void 0?10:n.pageSize,selectable:n.selectable!==void 0&&n.selectable,showPagination:n.showPagination===void 0||n.showPagination,showPrevNext:n.showPrevNext!==void 0&&n.showPrevNext,showExport:n.showExport!==void 0&&n.showExport,rowLink:n.rowLink,className:n.class===void 0?``:n.class,onSearchInput:_,csvEscape:v,exportRows:y,exportCsv:b,filtered:x,rows:S,shown:C,sortBy:w,toggleCol:T,fmt:E,safePage:D,canPrev:O,canNext:k,prevPage:A,nextPage:j,shownCount:M,totalPages:N,currentPage:P,goToPage:ee,goFirst:F,goLast:te,pageNumbers:ne,hasRowLink:I,linkFor:L,isRowSelected:R,selectedCount:z,isPageAllSelected:re,toggleRow:ie,toggleAllRows:B,classes:ae},ue={__style__(){return``},methods:{},props:{},compName:`DataTable`,deps:null,components:{Input:_t,Button:J,DropdownMenu:Mr,DropdownMenuTrigger:Nr,DropdownMenuContent:Pr,DropdownMenuCheckboxItem:Fr,Table:Ir,TableHeader:Lr,TableBody:Rr,TableRow:zr,TableHead:Br,TableCell:Vr},get getElm(){var e=H.isConnected?olum.vdom.mkStaging(H):H;return e.innerHTML=`
      <div data-slot="data-table" class="${olum.esc(ae())}">
  <div class="flex items-center gap-2">
    ${n.search!==void 0&&n.search?`
      <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({value:g.q,class:`max-w-sm`})).replace(/'/g,`%27`)}' data-o-props-src="placeholder:method:searchPlaceholder|value:state:q|oninput:method:onSearchInput" data-o-props-owner='${t}' if='${JSON.stringify(!!(n.search!==void 0&&n.search))}'></olum>
    `:``}
    <div class="ml-auto flex items-center gap-2">
      ${n.showExport!==void 0&&n.showExport?`
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:exportCsv" data-o-props-owner='${t}' if='${JSON.stringify(!!(n.showExport!==void 0&&n.showExport))}'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export CSV
        </olum>
      `:``}
      <olum name="DropdownMenu">
        <olum name="DropdownMenuTrigger" data-o-props='${encodeURIComponent(JSON.stringify({class:`inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted [&_svg]:size-4 [&_svg]:shrink-0`})).replace(/'/g,`%27`)}'>
          Columns
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
        </olum>
        <olum name="DropdownMenuContent" data-o-props='${encodeURIComponent(JSON.stringify({align:`end`})).replace(/'/g,`%27`)}'>
          ${(n.columns===void 0?[]:n.columns).map(function(e){return`
            <olum name="DropdownMenuCheckboxItem" data-o-props='${encodeURIComponent(JSON.stringify({value:e.key,defaultChecked:!0,class:`capitalize`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.key)}">${olum.esc(e.key)}</olum>
          `}).join(``)}
        </olum>
      </olum>
    </div>
  </div>
  <div class="rounded-lg border border-border">
    <olum name="Table">
      <olum name="TableHeader">
        <olum name="TableRow">
          ${I()?`
            <olum name="TableHead" data-o-props='${encodeURIComponent(JSON.stringify({class:`w-10`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!I())}'></olum>
          `:``}
          ${!I()&&n.selectable!==void 0&&n.selectable?`
            <olum name="TableHead" data-o-props='${encodeURIComponent(JSON.stringify({class:`w-10`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!I()&&n.selectable!==void 0&&n.selectable)}'>
              <span class="relative inline-flex size-4 shrink-0 top-0.75">
                <input type="checkbox" data-role="select-all" ${re()?`checked`:``} aria-label="Select all" class="${olum.esc(oe)}">
                <div data-o-show="" style="display:${re()?`contents`:`none`};">
                  <svg class="${olum.esc(se)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
              </span>
            </olum>
          `:``}
          ${C().map(function(e){return`
            <olum name="TableHead" data-o-props='${encodeURIComponent(JSON.stringify({class:e.headClass||``})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.key)}">
              ${e.sortable?`
                <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`sm`,value:e.key,role:`sort`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!e.sortable)}' data-o-key="${olum.esc(e.key)}">
                  ${olum.esc(e.label)}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"></path><path d="M17 20V4"></path><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path></svg>
                </olum>
              `:`${olum.esc(e.label)}`}
              
            </olum>
          `}).join(``)}
        </olum>
      </olum>
      <olum name="TableBody" data-o-props='${encodeURIComponent(JSON.stringify({class:`[&>*:last-child>[data-slot=table-row]]:border-b`})).replace(/'/g,`%27`)}'>
        ${S().map(function(e){return`
          <olum name="TableRow" data-o-props='${encodeURIComponent(JSON.stringify({state:R(e.id)?`selected`:``})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">
            ${I()?`
              <olum name="TableCell" if='${JSON.stringify(!!I())}' data-o-key="${olum.esc(e.id)}">
                <a href="${olum.esc(L(e).href)}" class="inline-flex items-center gap-1.5 text-sm text-foreground hover:underline [&_svg]:size-4 [&_svg]:shrink-0">
                  ${L(e).icon?`
                    <span>${L(e).icon}</span>
                  `:``}
                  ${L(e).text?`${olum.esc(L(e).text)}`:``}
                </a>
              </olum>
            `:``}
            ${!I()&&n.selectable!==void 0&&n.selectable?`
              <olum name="TableCell" if='${JSON.stringify(!I()&&n.selectable!==void 0&&n.selectable)}' data-o-key="${olum.esc(e.id)}">
                <span class="relative inline-flex size-4 shrink-0 top-0.75">
                  <input type="checkbox" data-row-id="${olum.esc(e.id)}" ${R(e.id)?`checked`:``} aria-label="Select row" class="${olum.esc(oe)}">
                  <div data-o-show="" style="display:${R(e.id)?`contents`:`none`};">
                    <svg class="${olum.esc(se)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                  </div>
                </span>
              </olum>
            `:``}
            ${C().map(function(t){return`
              <olum name="TableCell" data-o-props='${encodeURIComponent(JSON.stringify({class:t.cellClass||``})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(t.key)}">${olum.esc(E(e,t))}</olum>
            `}).join(``)}
          </olum>
        `}).join(``)}
        ${S().length===0?`
          <olum name="TableRow" if='${JSON.stringify(!!S().length===0)}'>
            <olum name="TableCell" data-o-props='${encodeURIComponent(JSON.stringify({colspan:C().length+(I()||n.selectable!==void 0&&n.selectable?1:0),class:`h-24 text-center`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!S().length===0)}'>No results.</olum>
          </olum>
        `:``}
      </olum>
    </olum>
  </div>
  <div class="grid grid-cols-3 items-center gap-2">
    ${!I()&&n.selectable!==void 0&&n.selectable?`
      <div class="col-start-1 text-sm text-muted-foreground">${olum.esc(z())} of ${olum.esc(x().length)} row(s) selected.</div>
    `:``}
    <div class="col-start-2 text-center text-sm text-muted-foreground">${olum.esc(M())} of ${olum.esc(x().length)} entries</div>
    ${n.showPagination===void 0||n.showPagination?`
      <div class="col-start-3 flex items-center justify-end gap-1">
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`,role:`page`,value:`first`,disabled:!O()})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!(n.showPagination===void 0||n.showPagination))}'>First</olum>
        ${n.showPrevNext!==void 0&&n.showPrevNext?`
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`,disabled:!O()})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:prevPage" data-o-props-owner='${t}' if='${JSON.stringify(!!(n.showPagination===void 0||n.showPagination))}'>Previous</olum>
        `:``}
        ${ne().map(function(e){return`
          ${typeof e==`string`?`
            <span class="flex size-7 items-center justify-center text-sm text-muted-foreground" key="${olum.esc(e)}">…</span>
          `:`
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`sm`,role:`page`,value:e,class:e===P()?`size-7 p-0 bg-black text-white hover:bg-black hover:text-white`:`size-7 p-0`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!(n.showPagination===void 0||n.showPagination))}' data-o-key="${olum.esc(e)}">${olum.esc(e)}</olum>
          `}
          
        `}).join(``)}
        ${n.showPrevNext!==void 0&&n.showPrevNext?`
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`,disabled:!k()})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:nextPage" data-o-props-owner='${t}' if='${JSON.stringify(!!(n.showPagination===void 0||n.showPagination))}'>Next</olum>
        `:``}
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`,role:`page`,value:`last`,disabled:!k()})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!(n.showPagination===void 0||n.showPagination))}'>Last</olum>
      </div>
    `:``}
  </div>
</div>`,olum.injectStyle(`DataTable`,ue.__style__()),olum.handleMarkup(`DataTable`,`wiudo7eaj6c`,e,le)}};return g.__olum__={compName:t,compId:`wiudo7eaj6c`},g=olum.proxyHandler(g,null,H),{methods:ue.methods,props:ue.props,__OLUM__:ue,el:H,methodsRef:le,stateProps:g,localsRef:{get checkboxClasses(){return oe},get checkIconClasses(){return se}},hooks:{mounted:V===void 0?null:V,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ur=e=>{let t=e||`Item`,n=l(t),{variant:r=`default`,size:i=`default`,class:a=``,children:o}=l(t),s=`group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted [&>[data-olum]]:contents`,c={default:`border-transparent`,outline:`border-border`,muted:`border-transparent bg-muted/50`},u={default:`gap-2.5 px-3 py-2.5`,sm:`gap-2.5 px-3 py-2.5`,xs:`gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0`},d=()=>q(s,c[n.variant===void 0?`default`:n.variant]||c.default,u[n.size===void 0?`default`:n.size]||u.default,n.class===void 0?``:n.class);var f=olum.mkElm(`div`,`Item`,`s8fee0nlwad`),p={variant:n.variant===void 0?`default`:n.variant,size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:d},m={__style__(){return``},methods:{},props:{},compName:`Item`,deps:null,components:{},get getElm(){var e=f.isConnected?olum.vdom.mkStaging(f):f;return e.innerHTML=`
      <div data-slot="item" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" class="${olum.esc(d())}">${n.children}</div>`,olum.injectStyle(`Item`,m.__style__()),olum.handleMarkup(`Item`,`s8fee0nlwad`,e,p)}};return{methods:m.methods,props:m.props,__OLUM__:m,el:f,methodsRef:p,stateProps:null,localsRef:{get base(){return s},get variants(){return c},get sizes(){return u}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Wr=e=>{let t=e||`ItemMedia`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none`,s={default:`bg-transparent`,icon:`[&_svg:not([class*='size-'])]:size-4`,image:`size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`ItemMedia`,`etn0s8gco6p`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`ItemMedia`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="item-media" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`ItemMedia`,f.__style__()),olum.handleMarkup(`ItemMedia`,`etn0s8gco6p`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Gr=e=>{let t=e||`ItemContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`ItemContent`,`2znnf8i3vp2`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`ItemContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="item-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`ItemContent`,c.__style__()),olum.handleMarkup(`ItemContent`,`2znnf8i3vp2`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Kr=e=>{let t=e||`ItemTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`ItemTitle`,`flab0ovqlkg`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`ItemTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="item-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`ItemTitle`,c.__style__()),olum.handleMarkup(`ItemTitle`,`flab0ovqlkg`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qr=e=>{let t=e||`ItemDescription`,n=l(t),{class:r=``,children:i}=l(t),a=`line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ItemDescription`,`r1yn4bzrjmt`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ItemDescription`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <p data-slot="item-description" class="${olum.esc(o())}">${n.children}</p>`,olum.injectStyle(`ItemDescription`,u.__style__()),olum.handleMarkup(`ItemDescription`,`r1yn4bzrjmt`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Jr=e=>{let t=e||`ItemActions`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex items-center gap-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`ItemActions`,`lc5yvj6v3t8`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`ItemActions`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="item-actions" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`ItemActions`,c.__style__()),olum.handleMarkup(`ItemActions`,`lc5yvj6v3t8`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Yr=e=>{let t=e||`ItemGroup`,n=l(t),{class:r=``,children:i}=l(t),a=`group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ItemGroup`,`9qma7ygv93e`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ItemGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div role="list" data-slot="item-group" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`ItemGroup`,u.__style__()),olum.handleMarkup(`ItemGroup`,`9qma7ygv93e`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xr=e=>{let t=e||`Separator`,n=l(t),{orientation:r=`horizontal`,class:i=``}=l(t),a=`shrink-0 bg-border`,o={horizontal:`h-px w-full`,vertical:`w-px self-stretch`},s=()=>q(a,o[n.orientation===void 0?`horizontal`:n.orientation]||o.horizontal,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Separator`,`njf2pajmal`),u={orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Separator`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div role="separator" aria-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(s())}"></div>`,olum.injectStyle(`Separator`,d.__style__()),olum.handleMarkup(`Separator`,`njf2pajmal`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{get base(){return a},get orientations(){return o}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Zr=e=>{let t=e||`ItemSeparator`,n=l(t),{class:r=``}=l(t),i=()=>q(`my-2`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`ItemSeparator`,`v1c8vjfsxq`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`ItemSeparator`,deps:null,components:{Separator:Xr},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <olum name="Separator" data-o-props='${encodeURIComponent(JSON.stringify({orientation:`horizontal`,class:i()})).replace(/'/g,`%27`)}'></olum>`,olum.injectStyle(`ItemSeparator`,s.__style__()),olum.handleMarkup(`ItemSeparator`,`v1c8vjfsxq`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qr=e=>{let t=e||`Kbd`,n=l(t),{class:r=``,children:i}=l(t),a=`pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background [&_svg:not([class*='size-'])]:size-3`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`Kbd`,`ko9jxu6bau`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`Kbd`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <kbd data-slot="kbd" class="${olum.esc(o())}">${n.children}</kbd>`,olum.injectStyle(`Kbd`,u.__style__()),olum.handleMarkup(`Kbd`,`ko9jxu6bau`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$r=e=>{let t=e||`KbdGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`inline-flex items-center gap-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`KbdGroup`,`sjnksmxlrsb`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`KbdGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <kbd data-slot="kbd-group" class="${olum.esc(a())}">${n.children}</kbd>`,olum.injectStyle(`KbdGroup`,c.__style__()),olum.handleMarkup(`KbdGroup`,`sjnksmxlrsb`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ei=e=>{let t=e||`Marker`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground`,s={default:``,separator:`before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border`,border:`border-b border-border pb-2`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`Marker`,`1tjsk2lhrd`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`Marker`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="marker" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`Marker`,f.__style__()),olum.handleMarkup(`Marker`,`1tjsk2lhrd`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ti=e=>{let t=e||`MarkerContent`,n=l(t),{class:r=``,children:i}=l(t),a=`min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`MarkerContent`,`8bnp9tt7jtm`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`MarkerContent`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <span data-slot="marker-content" class="${olum.esc(o())}">${n.children}</span>`,olum.injectStyle(`MarkerContent`,u.__style__()),olum.handleMarkup(`MarkerContent`,`8bnp9tt7jtm`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ni=e=>{let t=e||`MarkerIcon`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MarkerIcon`,`u8jgixypjsl`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MarkerIcon`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="marker-icon" aria-hidden="true" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`MarkerIcon`,c.__style__()),olum.handleMarkup(`MarkerIcon`,`u8jgixypjsl`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ri=e=>{let t=e||`Message`,n=l(t),{align:r=`start`,class:i=``,children:a}=l(t),o=`group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse [&>*:has([data-slot=message-avatar])]:self-end`,s=()=>q(o,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Message`,`c6f06vlbqta`),u={align:n.align===void 0?`start`:n.align,className:n.class===void 0?``:n.class,children:n.children,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Message`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="message" data-align="${olum.esc(n.align===void 0?`start`:n.align)}" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`Message`,d.__style__()),olum.handleMarkup(`Message`,`c6f06vlbqta`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{get base(){return o}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ii=e=>{let t=e||`MessageAvatar`,n=l(t),{class:r=``,children:i}=l(t),a=`flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted has-data-[slot=avatar]:bg-transparent group-has-data-[slot=message-footer]/message:-translate-y-8`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`MessageAvatar`,`897w9xahbmt`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`MessageAvatar`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="message-avatar" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`MessageAvatar`,u.__style__()),olum.handleMarkup(`MessageAvatar`,`897w9xahbmt`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ai=e=>{let t=e||`MessageContent`,n=l(t),{class:r=``,children:i}=l(t),a=`flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:[&>*]:flex group-data-[align=end]/message:[&>*]:justify-end`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`MessageContent`,`tonqfszdeo`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`MessageContent`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="message-content" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`MessageContent`,u.__style__()),olum.handleMarkup(`MessageContent`,`tonqfszdeo`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},oi=e=>{let t=e||`MessageGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex min-w-0 flex-col gap-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MessageGroup`,`r46kf29kyae`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MessageGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="message-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`MessageGroup`,c.__style__()),olum.handleMarkup(`MessageGroup`,`r46kf29kyae`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},si=e=>{let t=e||`MessageScroller`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MessageScroller`,`2pzz2ps3f0s`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MessageScroller`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="message-scroller" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`MessageScroller`,c.__style__()),olum.handleMarkup(`MessageScroller`,`2pzz2ps3f0s`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ci=e=>{let t=e||`MessageScrollerViewport`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.querySelector(`[data-slot="message-scroller-viewport"]`),t=u.closest(`[data-slot="message-scroller"]`);if(!e)return;let n=()=>{let n=t&&t.querySelector(`[data-slot="message-scroller-button"]`);if(!n)return;let r=e.scrollTop+e.clientHeight>=e.scrollHeight-8;n.setAttribute(`data-active`,r?`false`:`true`)};e.addEventListener(`scroll`,n,{passive:!0});let r=setTimeout(()=>{e.scrollTop=e.scrollHeight,n()});return()=>{clearTimeout(r),e.removeEventListener(`scroll`,n)}});let s=()=>q(`size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:var(--olum-border)_transparent]`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`MessageScrollerViewport`,`mookbywcc2q`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`MessageScrollerViewport`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="message-scroller-viewport" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`MessageScrollerViewport`,f.__style__()),olum.handleMarkup(`MessageScrollerViewport`,`mookbywcc2q`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},li=e=>{let t=e||`MessageScrollerContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex h-max min-h-full flex-col gap-6 [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MessageScrollerContent`,`q3bcetnalbh`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MessageScrollerContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="message-scroller-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`MessageScrollerContent`,c.__style__()),olum.handleMarkup(`MessageScrollerContent`,`q3bcetnalbh`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ui=e=>{let t=e||`MessageScrollerItem`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`min-w-0 shrink-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MessageScrollerItem`,`3din80ljgfv`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MessageScrollerItem`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="message-scroller-item" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`MessageScrollerItem`,c.__style__()),olum.handleMarkup(`MessageScrollerItem`,`3din80ljgfv`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},di=e=>{let t=e||`MessageScrollerButton`,n=l(t),{class:r=``}=l(t),i=()=>{let e=s.closest(`[data-slot="message-scroller"]`),t=e&&e.querySelector(`[data-slot="message-scroller-viewport"]`);t&&t.scrollTo({top:t.scrollHeight,behavior:`smooth`})},a=()=>q(`absolute bottom-4 left-1/2 z-10 inline-flex size-7 -translate-x-1/2 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-[translate,scale,opacity] duration-200 hover:bg-muted data-[active=false]:pointer-events-none data-[active=false]:translate-y-full data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 [&_svg]:size-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MessageScrollerButton`,`cntltz2jaog`),s=o,c={className:n.class===void 0?``:n.class,go:i,classes:a},u={__style__(){return``},methods:{},props:{},compName:`MessageScrollerButton`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <button type="button" data-slot="message-scroller-button" data-active="false" class="${olum.esc(a())}" data-o-event='onclick|go=${JSON.stringify([])}'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
  <span class="sr-only">Scroll to end</span>
</button>`,olum.injectStyle(`MessageScrollerButton`,u.__style__()),olum.handleMarkup(`MessageScrollerButton`,`cntltz2jaog`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:o,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},fi=e=>{let t=e||`MessageScrollerProvider`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`MessageScrollerProvider`,`f4t8q47in0m`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`MessageScrollerProvider`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="message-scroller-provider" class="contents">${n.children}</div>`,olum.injectStyle(`MessageScrollerProvider`,o.__style__()),olum.handleMarkup(`MessageScrollerProvider`,`f4t8q47in0m`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},pi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8"/></svg>`,mi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,hi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>`,gi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`,_i=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539-10.94 10.939"/></svg>`,vi=e=>{let t=e||`page`,n=()=>console.log(`remove attachment`),r=[{month:`Jan`,visits:186,signups:80},{month:`Feb`,visits:305,signups:200},{month:`Mar`,visits:237,signups:120},{month:`Apr`,visits:273,signups:190},{month:`May`,visits:209,signups:130}],i={visits:{label:`Visits`,color:`var(--color-chart-1)`},signups:{label:`Signups`,color:`var(--color-chart-2)`}},a=[{name:`Chrome`,value:62,color:`var(--color-chart-1)`},{name:`Safari`,value:21,color:`var(--color-chart-2)`},{name:`Firefox`,value:11,color:`var(--color-chart-3)`},{name:`Other`,value:6,color:`var(--color-chart-4)`}],o={visits:{label:`Visits`,color:`var(--color-chart-1)`,type:`bar`},signups:{label:`Signups`,color:`var(--color-chart-2)`,type:`line`}},s=[{month:`May`,desktop:186,mobile:120}],c={desktop:{label:`Desktop`,color:`var(--color-chart-1)`},mobile:{label:`Mobile`,color:`var(--color-chart-2)`}},l=[{id:`1`,name:`Ada Lovelace`,role:`Engineer`,status:`Active`,amount:1200},{id:`2`,name:`Grace Hopper`,role:`Admiral`,status:`Active`,amount:2400},{id:`3`,name:`Alan Turing`,role:`Researcher`,status:`Invited`,amount:800},{id:`4`,name:`Margaret Hamilton`,role:`Director`,status:`Active`,amount:3100},{id:`5`,name:`Katherine Johnson`,role:`Analyst`,status:`Suspended`,amount:950},{id:`6`,name:`Radia Perlman`,role:`Engineer`,status:`Active`,amount:1750},{id:`7`,name:`Hedy Lamarr`,role:`Inventor`,status:`Invited`,amount:640},{id:`8`,name:`Barbara Liskov`,role:`Researcher`,status:`Active`,amount:2050}],u=[{key:`name`,label:`Name`,sortable:!0},{key:`role`,label:`Role`,sortable:!0},{key:`status`,label:`Status`},{key:`amount`,label:`Amount`,format:`currency`,sortable:!0,cellClass:`text-right`,headClass:`text-right`}];var d={messages:[{id:1,from:`them`,text:`Hey, is the Chart component all inline SVG?`},{id:2,from:`me`,text:`Yep — no charting library, just plain SVG + a data/config shape.`}]};let f=()=>{d.messages.push({id:Date.now(),from:`me`,text:`New message #`+d.messages.length})};var p=olum.mkElm(`div`,`page`,`gfdu552i7e`),m={removeAttachment:n,sendMessage:f},h={__style__(){return``},methods:{},props:{},compName:`page`,deps:[`messages`],components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Icon:Y,Button:J,Badge:wt,Accordion:Vn,AccordionItem:Hn,AccordionTrigger:Un,AccordionContent:Wn,Attachment:Gn,AttachmentMedia:Kn,AttachmentContent:qn,AttachmentTitle:Jn,AttachmentDescription:Yn,AttachmentActions:Xn,AttachmentAction:Zn,AttachmentGroup:Qn,Avatar:$n,AvatarFallback:er,AvatarBadge:tr,AvatarGroup:nr,AvatarGroupCount:rr,Bubble:ir,BubbleContent:ar,BubbleGroup:or,Carousel:pr,CarouselContent:_r,CarouselItem:vr,CarouselNext:yr,CarouselPrevious:br,BarChart:xr,LineChart:Sr,DonutChart:Cr,AreaChart:Er,ComposedChart:Dr,RadialBarChart:Or,Collapsible:kr,CollapsibleTrigger:Ar,CollapsibleContent:jr,DataTable:Hr,Item:Ur,ItemMedia:Wr,ItemContent:Gr,ItemTitle:Kr,ItemDescription:qr,ItemActions:Jr,ItemGroup:Yr,ItemSeparator:Zr,Kbd:Qr,KbdGroup:$r,Marker:ei,MarkerContent:ti,MarkerIcon:ni,Message:ri,MessageAvatar:ii,MessageContent:ai,MessageGroup:oi,MessageScroller:si,MessageScrollerViewport:ci,MessageScrollerContent:li,MessageScrollerItem:ui,MessageScrollerButton:di,MessageScrollerProvider:fi,Table:Ir,TableHeader:Lr,TableBody:Rr,TableRow:zr,TableHead:Br,TableCell:Vr},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <h1 class="mb-8 font-heading text-2xl font-semibold text-foreground">UI Kit — Data Display</h1>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Accordion</h2>
    <p class="mb-4 text-sm text-muted-foreground">Stacked headings that expand to reveal a section — single-open via a shared radio name.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Accordion">
        <olum name="AccordionItem" data-o-props='${encodeURIComponent(JSON.stringify({name:`dd-accordion`,type:`radio`,defaultOpen:!0})).replace(/'/g,`%27`)}'>
          <olum name="AccordionTrigger">Is it accessible?</olum>
          <olum name="AccordionContent">Yes. It adheres to the WAI-ARIA design pattern via native radio/checkbox inputs.</olum>
        </olum>
        <olum name="AccordionItem" data-o-props='${encodeURIComponent(JSON.stringify({name:`dd-accordion`,type:`radio`})).replace(/'/g,`%27`)}'>
          <olum name="AccordionTrigger">Is it styled?</olum>
          <olum name="AccordionContent">Yes, it comes with default styles that match the rest of the kit.</olum>
        </olum>
        <olum name="AccordionItem" data-o-props='${encodeURIComponent(JSON.stringify({name:`dd-accordion`,type:`radio`})).replace(/'/g,`%27`)}'>
          <olum name="AccordionTrigger">Is it animated?</olum>
          <olum name="AccordionContent">Yes, a CSS grid-rows trick animates the height without JS.</olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Attachment</h2>
    <p class="mb-4 text-sm text-muted-foreground">File attachments with a thumbnail/type icon and a remove action.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="AttachmentGroup">
        <olum name="Attachment">
          <olum name="AttachmentMedia"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:pi,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
          <olum name="AttachmentContent">
            <olum name="AttachmentTitle">proposal.pdf</olum>
            <olum name="AttachmentDescription">248 KB</olum>
          </olum>
          <olum name="AttachmentActions">
            <olum name="AttachmentAction" data-o-props='${encodeURIComponent(JSON.stringify({ariaLabel:`Remove`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:removeAttachment" data-o-props-owner='${t}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:gi,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum></olum>
          </olum>
        </olum>
        <olum name="Attachment">
          <olum name="AttachmentMedia" data-o-props='${encodeURIComponent(JSON.stringify({variant:`image`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:mi,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
          <olum name="AttachmentContent">
            <olum name="AttachmentTitle">cover.png</olum>
            <olum name="AttachmentDescription">1.1 MB</olum>
          </olum>
          <olum name="AttachmentActions">
            <olum name="AttachmentAction" data-o-props='${encodeURIComponent(JSON.stringify({ariaLabel:`Download`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:hi,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum></olum>
          </olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Avatar</h2>
    <p class="mb-4 text-sm text-muted-foreground">Image with initials fallback, a presence badge, and a grouped stack with overflow.</p>
    <div class="flex flex-wrap items-center gap-8 rounded-xl border border-border p-6">
      <olum name="Avatar"><olum name="AvatarFallback">AL</olum></olum>
      <div class="relative">
        <olum name="Avatar" data-o-props='${encodeURIComponent(JSON.stringify({size:`lg`})).replace(/'/g,`%27`)}'><olum name="AvatarFallback">GH</olum></olum>
        <olum name="AvatarBadge" data-o-props='${encodeURIComponent(JSON.stringify({class:`bg-emerald-500`})).replace(/'/g,`%27`)}'></olum>
      </div>
      <olum name="AvatarGroup">
        <olum name="Avatar"><olum name="AvatarFallback">AT</olum></olum>
        <olum name="Avatar"><olum name="AvatarFallback">MH</olum></olum>
        <olum name="Avatar"><olum name="AvatarFallback">KJ</olum></olum>
        <olum name="AvatarGroupCount">+5</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Badge</h2>
    <p class="mb-4 text-sm text-muted-foreground">Six variants, with an optional leading icon.</p>
    <div class="flex flex-wrap items-center gap-2 rounded-xl border border-border p-6">
      <olum name="Badge">Default</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`secondary`})).replace(/'/g,`%27`)}'>Secondary</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`destructive`})).replace(/'/g,`%27`)}'>Destructive</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`})).replace(/'/g,`%27`)}'>Outline</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`})).replace(/'/g,`%27`)}'>Ghost</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`link`})).replace(/'/g,`%27`)}'>Link</olum>
      <olum name="Badge" data-o-props='${encodeURIComponent(JSON.stringify({variant:`secondary`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ln,class:`size-3`})).replace(/'/g,`%27`)}'></olum>New</olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Bubble</h2>
    <p class="mb-4 text-sm text-muted-foreground">Chat bubbles, grouped and aligned by sender.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="BubbleGroup">
        <olum name="Bubble" data-o-props='${encodeURIComponent(JSON.stringify({align:`start`})).replace(/'/g,`%27`)}'><olum name="BubbleContent">Hey! Are you free to review the PR?</olum></olum>
        <olum name="Bubble" data-o-props='${encodeURIComponent(JSON.stringify({align:`end`,variant:`secondary`})).replace(/'/g,`%27`)}'><olum name="BubbleContent">Sure, give me 5 minutes.</olum></olum>
        <olum name="Bubble" data-o-props='${encodeURIComponent(JSON.stringify({align:`start`,variant:`outline`})).replace(/'/g,`%27`)}'><olum name="BubbleContent">No rush, thanks!</olum></olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Carousel</h2>
    <p class="mb-4 text-sm text-muted-foreground">Drag or use the arrows.</p>
    <div class="rounded-xl border border-border p-10">
      <div class="mx-auto max-w-xs">
        <olum name="Carousel">
          <olum name="CarouselContent">
            ${[1,2,3,4,5].map(function(e){return`
              <olum name="CarouselItem" data-o-key="${olum.esc(e)}">
                <div class="flex h-40 items-center justify-center rounded-xl bg-muted text-3xl font-semibold text-muted-foreground">${olum.esc(e)}</div>
              </olum>
            `}).join(``)}
          </olum>
          <olum name="CarouselPrevious"></olum>
          <olum name="CarouselNext"></olum>
        </olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Chart</h2>
    <p class="mb-4 text-sm text-muted-foreground">Plain inline SVG — no charting library. All six variants the family ships.</p>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="rounded-xl border border-border p-4">
        <olum name="BarChart" data-o-props='${encodeURIComponent(JSON.stringify({data:r,config:i})).replace(/'/g,`%27`)}'></olum>
      </div>
      <div class="rounded-xl border border-border p-4">
        <olum name="LineChart" data-o-props='${encodeURIComponent(JSON.stringify({data:r,config:i})).replace(/'/g,`%27`)}'></olum>
      </div>
      <div class="rounded-xl border border-border p-4">
        <olum name="DonutChart" data-o-props='${encodeURIComponent(JSON.stringify({data:a,label:`Browsers`})).replace(/'/g,`%27`)}'></olum>
      </div>
      <div class="rounded-xl border border-border p-4">
        <olum name="AreaChart" data-o-props='${encodeURIComponent(JSON.stringify({data:r,config:i})).replace(/'/g,`%27`)}'></olum>
      </div>
      <div class="rounded-xl border border-border p-4">
        <olum name="ComposedChart" data-o-props='${encodeURIComponent(JSON.stringify({data:r,config:o})).replace(/'/g,`%27`)}'></olum>
      </div>
      <div class="rounded-xl border border-border p-4">
        <olum name="RadialBarChart" data-o-props='${encodeURIComponent(JSON.stringify({data:s,config:c,max:300,centerLabel:`Traffic`})).replace(/'/g,`%27`)}'></olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Collapsible</h2>
    <p class="mb-4 text-sm text-muted-foreground">A single expand/collapse section — the simpler counterpart to Accordion.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Collapsible">
        <olum name="CollapsibleTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Toggle details</olum>
        </olum>
        <olum name="CollapsibleContent">
          <p class="pt-3 text-sm text-muted-foreground">Hidden details revealed on toggle, animated via a CSS grid-rows trick.</p>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Data Table</h2>
    <p class="mb-4 text-sm text-muted-foreground">Sorting, text filter, row selection, column visibility, and CSV export over a small fake dataset.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="DataTable" data-o-props='${encodeURIComponent(JSON.stringify({data:l,columns:u,search:!0,searchPlaceholder:`Filter people...`,pageSize:5,selectable:!0,showExport:!0})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Item</h2>
    <p class="mb-4 text-sm text-muted-foreground">Media + title + description + trailing actions, repeated in a group.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="ItemGroup">
        <olum name="Item" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`})).replace(/'/g,`%27`)}'>
          <olum name="ItemMedia" data-o-props='${encodeURIComponent(JSON.stringify({variant:`icon`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:pi,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
          <olum name="ItemContent">
            <olum name="ItemTitle">Q3 report.pdf</olum>
            <olum name="ItemDescription">Updated 2 days ago</olum>
          </olum>
          <olum name="ItemActions"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`icon-sm`,ariaLabel:`Delete`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:kn,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum></olum></olum>
        </olum>
        <olum name="ItemSeparator"></olum>
        <olum name="Item" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`})).replace(/'/g,`%27`)}'>
          <olum name="ItemMedia" data-o-props='${encodeURIComponent(JSON.stringify({variant:`icon`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:mi,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
          <olum name="ItemContent">
            <olum name="ItemTitle">hero-banner.png</olum>
            <olum name="ItemDescription">Updated 5 days ago</olum>
          </olum>
          <olum name="ItemActions"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`icon-sm`,ariaLabel:`Delete`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:kn,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum></olum></olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Kbd</h2>
    <p class="mb-4 text-sm text-muted-foreground">Renders keyboard keys the way a manual would.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="KbdGroup">
        <olum name="Kbd">Ctrl</olum>
        <olum name="Kbd">Alt</olum>
        <olum name="Kbd">Del</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Marker</h2>
    <p class="mb-4 text-sm text-muted-foreground">Highlights or annotates a span of content.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Marker">
        <olum name="MarkerIcon"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ln,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
        <olum name="MarkerContent">New in this release — see the changelog for details.</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Message</h2>
    <p class="mb-4 text-sm text-muted-foreground">A chat message with avatar, grouped by sender.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="MessageGroup">
        <olum name="Message" data-o-props='${encodeURIComponent(JSON.stringify({align:`start`})).replace(/'/g,`%27`)}'>
          <olum name="MessageAvatar"><olum name="Avatar" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}'><olum name="AvatarFallback">OL</olum></olum></olum>
          <olum name="MessageContent"><olum name="Bubble" data-o-props='${encodeURIComponent(JSON.stringify({align:`start`})).replace(/'/g,`%27`)}'><olum name="BubbleContent">Welcome to the playground!</olum></olum></olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Message Scroller</h2>
    <p class="mb-4 text-sm text-muted-foreground">Stays pinned to the latest message; scroll up and a jump-to-latest button appears. Click "Send" a few times.</p>
    <div class="overflow-hidden rounded-xl border border-border" style="height: 16rem;">
      <olum name="MessageScrollerProvider">
        <olum name="MessageScroller">
          <olum name="MessageScrollerViewport">
            <olum name="MessageScrollerContent">
              ${d.messages.map(function(e){return`
                <olum name="MessageScrollerItem" data-o-key="${olum.esc(e.id)}">
                  <olum name="Message" data-o-props='${encodeURIComponent(JSON.stringify({align:e.from===`me`?`end`:`start`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">
                    <olum name="MessageContent" data-o-key="${olum.esc(e.id)}">
                      <olum name="Bubble" data-o-props='${encodeURIComponent(JSON.stringify({align:e.from===`me`?`end`:`start`,variant:e.from===`me`?`default`:`secondary`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.id)}">
                        <olum name="BubbleContent" data-o-key="${olum.esc(e.id)}">${olum.esc(e.text)}</olum>
                      </olum>
                    </olum>
                  </olum>
                </olum>
              `}).join(``)}
            </olum>
          </olum>
          <olum name="MessageScrollerButton"></olum>
        </olum>
      </olum>
    </div>
    <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,variant:`outline`,class:`mt-3`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:sendMessage" data-o-props-owner='${t}'>
      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:_i,class:`size-3.5`})).replace(/'/g,`%27`)}'></olum>
      Send a message
    </olum>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Table</h2>
    <p class="mb-4 text-sm text-muted-foreground">The plain foundation Data Table builds sorting/filtering on top of.</p>
    <div class="rounded-xl border border-border p-6">
      <p class="mb-2 text-sm text-muted-foreground">A list of recent invoices.</p>
      <olum name="Table">
        <olum name="TableHeader">
          <olum name="TableRow">
            <olum name="TableHead">Invoice</olum>
            <olum name="TableHead">Status</olum>
            <olum name="TableHead" data-o-props='${encodeURIComponent(JSON.stringify({class:`text-right`})).replace(/'/g,`%27`)}'>Amount</olum>
          </olum>
        </olum>
        <olum name="TableBody">
          <olum name="TableRow">
            <olum name="TableCell">INV001</olum>
            <olum name="TableCell">Paid</olum>
            <olum name="TableCell" data-o-props='${encodeURIComponent(JSON.stringify({class:`text-right`})).replace(/'/g,`%27`)}'>$250.00</olum>
          </olum>
          <olum name="TableRow">
            <olum name="TableCell">INV002</olum>
            <olum name="TableCell">Pending</olum>
            <olum name="TableCell" data-o-props='${encodeURIComponent(JSON.stringify({class:`text-right`})).replace(/'/g,`%27`)}'>$150.00</olum>
          </olum>
        </olum>
      </olum>
    </div>
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,h.__style__()),olum.handleMarkup(`page`,`gfdu552i7e`,e,m)}};return d.__olum__={compName:t,compId:`gfdu552i7e`},d=olum.proxyHandler(d,null,p),{methods:h.methods,props:h.props,__OLUM__:h,el:p,methodsRef:m,stateProps:d,localsRef:{get barData(){return r},get barConfig(){return i},get donutData(){return a},get composedConfig(){return o},get radialData(){return s},get radialConfig(){return c},get tableRows(){return l},get tableColumns(){return u}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},yi=e=>{let t=e||`Alert`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`group/alert relative grid w-full gap-0.5 rounded-lg border border-border px-2.5 py-2 text-left text-sm has-[[data-slot=alert-action]]:pr-18 has-[>[data-icon]]:grid-cols-[auto_1fr] has-[>[data-icon]]:gap-x-2 [&>[data-icon]]:row-span-2 [&>[data-icon]]:translate-y-0.5 [&>[data-icon]]:text-current [&>[data-icon]_svg:not([class*='size-'])]:size-4 [&>*:has([data-slot=alert-action])]:absolute [&>*:has([data-slot=alert-action])]:top-2 [&>*:has([data-slot=alert-action])]:right-2`,s={default:`bg-background text-foreground`,destructive:`bg-background text-destructive [&_[data-slot=alert-description]]:text-destructive/90`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`Alert`,`64cj1q2vpcq`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`Alert`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="alert" role="alert" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`Alert`,f.__style__()),olum.handleMarkup(`Alert`,`64cj1q2vpcq`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},bi=e=>{let t=e||`AlertTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-medium [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertTitle`,`kdryxjr4ka`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertTitle`,c.__style__()),olum.handleMarkup(`AlertTitle`,`kdryxjr4ka`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},xi=e=>{let t=e||`AlertDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:text-foreground [&_p:not(:last-child)]:mb-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertDescription`,`rf0rrdv2pd`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertDescription`,c.__style__()),olum.handleMarkup(`AlertDescription`,`rf0rrdv2pd`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Si=e=>{let t=e||`AlertAction`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex items-center gap-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertAction`,`xcdlaicipw`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertAction`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-action" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertAction`,c.__style__()),olum.handleMarkup(`AlertAction`,`xcdlaicipw`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ci=e=>{let t=e||`Empty`,n=l(t),{class:r=``,children:i}=l(t),a=`flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`Empty`,`cig6i5emwvr`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`Empty`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="empty" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`Empty`,u.__style__()),olum.handleMarkup(`Empty`,`cig6i5emwvr`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},wi=e=>{let t=e||`EmptyHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex max-w-sm flex-col items-center gap-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`EmptyHeader`,`39qnvmykm6v`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`EmptyHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="empty-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`EmptyHeader`,c.__style__()),olum.handleMarkup(`EmptyHeader`,`39qnvmykm6v`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ti=e=>{let t=e||`EmptyMedia`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0`,s={default:`bg-transparent`,icon:`flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`EmptyMedia`,`79tglkvepyy`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`EmptyMedia`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="empty-icon" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`EmptyMedia`,f.__style__()),olum.handleMarkup(`EmptyMedia`,`79tglkvepyy`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ei=e=>{let t=e||`EmptyTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-sm font-medium tracking-tight`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`EmptyTitle`,`x5l3gkpr0yp`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`EmptyTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="empty-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`EmptyTitle`,c.__style__()),olum.handleMarkup(`EmptyTitle`,`x5l3gkpr0yp`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Di=e=>{let t=e||`EmptyDescription`,n=l(t),{class:r=``,children:i}=l(t),a=`text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`EmptyDescription`,`behnqlqbtrd`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`EmptyDescription`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="empty-description" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`EmptyDescription`,u.__style__()),olum.handleMarkup(`EmptyDescription`,`behnqlqbtrd`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Oi=e=>{let t=e||`EmptyContent`,n=l(t),{class:r=``,children:i}=l(t),a=`flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`EmptyContent`,`li1oaye6yc`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`EmptyContent`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="empty-content" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`EmptyContent`,u.__style__()),olum.handleMarkup(`EmptyContent`,`li1oaye6yc`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ki=e=>{let t=e||`Progress`,n=l(t),{value:r=0,class:i=``}=l(t),a=()=>q(`flex flex-wrap gap-3`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Progress`,`gx99kywgk9m`),s={value:n.value===void 0?0:n.value,className:n.class===void 0?``:n.class,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Progress`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="progress" class="${olum.esc(a())}">
  <div data-slot="progress-track" class="relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted">
    <div data-slot="progress-indicator" class="h-full bg-primary transition-all" style="width: ${olum.esc(n.value===void 0?0:n.value)}%;"></div>
  </div>
</div>`,olum.injectStyle(`Progress`,c.__style__()),olum.handleMarkup(`Progress`,`gx99kywgk9m`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ai=e=>{let t=e||`Skeleton`,n=l(t),{class:r=``}=l(t),i=()=>q(`animate-pulse rounded-md bg-muted`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`Skeleton`,`9y19h7hztth`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`Skeleton`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div class="${olum.esc(i())}"></div>`,olum.injectStyle(`Skeleton`,s.__style__()),olum.handleMarkup(`Skeleton`,`9y19h7hztth`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ji=e=>{let t=e||`Spinner`,n=l(t),{class:r=``}=l(t),i=()=>q(`size-4 animate-spin`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`Spinner`,`dbxaeib5wt`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`Spinner`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <svg data-slot="spinner" role="status" aria-label="Loading" class="${olum.esc(i())}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`,olum.injectStyle(`Spinner`,s.__style__()),olum.handleMarkup(`Spinner`,`dbxaeib5wt`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Mi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`,Ni=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/></svg>`,Pi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11"/></svg>`,Fi=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22v-9m3.17-10.79a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z"/></svg>`,Ii=e=>{let t=e||`page`;var n={progress:40};let r=()=>n.progress=Math.min(100,n.progress+10),i=()=>n.progress=0,a=()=>Ye.add({title:`Event scheduled`,description:`Friday, Feb 10 at 5:57 PM`}),o=()=>Ye.add({title:`Saved`,description:`Your changes were saved.`,type:`success`}),s=()=>Ye.add({title:`Something went wrong`,description:`Could not save changes.`,type:`error`}),c=()=>Ye.add({title:`Storage almost full`,description:`You're at 92% of your quota.`,type:`warning`}),l=()=>Ye.add({title:`New version available`,description:`Refresh to update.`,type:`info`}),u=()=>Ye.add({title:`Persistent toast`,description:`Only closes via the × button.`,autoClose:!1});var d=olum.mkElm(`div`,`page`,`bbgp4dlex07`),f={bumpProgress:r,resetProgress:i,toastDefault:a,toastSuccess:o,toastError:s,toastWarning:c,toastInfo:l,toastPersistent:u},p={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Icon:Y,Button:J,Alert:yi,AlertTitle:bi,AlertDescription:xi,AlertAction:Si,Empty:Ci,EmptyHeader:wi,EmptyMedia:Ti,EmptyTitle:Ei,EmptyDescription:Di,EmptyContent:Oi,Progress:ki,Skeleton:Ai,Spinner:ji},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <h1 class="mb-8 font-heading text-2xl font-semibold text-foreground">UI Kit — Feedback</h1>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Alert</h2>
    <p class="mb-4 text-sm text-muted-foreground">A callout that draws attention in place, rather than interrupting like a dialog.</p>
    <div class="flex flex-col gap-3 rounded-xl border border-border p-6">
      <olum name="Alert">
        <span data-icon=""><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Mi,class:`size-4`})).replace(/'/g,`%27`)}'></olum></span>
        <olum name="AlertTitle">Heads up</olum>
        <olum name="AlertDescription">You can add components with the Olum CLI.</olum>
      </olum>
      <olum name="Alert" data-o-props='${encodeURIComponent(JSON.stringify({variant:`destructive`})).replace(/'/g,`%27`)}'>
        <span data-icon=""><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Ni,class:`size-4`})).replace(/'/g,`%27`)}'></olum></span>
        <olum name="AlertTitle">Error</olum>
        <olum name="AlertDescription">Your session has expired. Please log in again.</olum>
        <olum name="AlertAction"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`xs`,variant:`outline`})).replace(/'/g,`%27`)}'>Retry</olum></olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Empty</h2>
    <p class="mb-4 text-sm text-muted-foreground">The placeholder shown when there's nothing to display yet.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Empty">
        <olum name="EmptyHeader">
          <olum name="EmptyMedia" data-o-props='${encodeURIComponent(JSON.stringify({variant:`icon`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Pi,class:`size-5`})).replace(/'/g,`%27`)}'></olum></olum>
          <olum name="EmptyTitle">No messages yet</olum>
          <olum name="EmptyDescription">New messages will show up here once you start a conversation.</olum>
        </olum>
        <olum name="EmptyContent">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Fi,class:`size-4`})).replace(/'/g,`%27`)}'></olum>Start a conversation</olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Progress</h2>
    <p class="mb-4 text-sm text-muted-foreground">A bar showing how far along a known-length task is — ${olum.esc(n.progress)}% here.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Progress" data-o-props='${encodeURIComponent(JSON.stringify({value:n.progress})).replace(/'/g,`%27`)}' data-o-props-src="value:state:progress" data-o-props-owner='${t}'></olum>
      <div class="mt-4 flex gap-2">
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,variant:`outline`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:bumpProgress" data-o-props-owner='${t}'>+10%</olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,variant:`ghost`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:resetProgress" data-o-props-owner='${t}'>Reset</olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Skeleton</h2>
    <p class="mb-4 text-sm text-muted-foreground">A muted shape standing in for content that hasn't loaded, matching the real layout.</p>
    <div class="flex items-center gap-3 rounded-xl border border-border p-6">
      <olum name="Skeleton" data-o-props='${encodeURIComponent(JSON.stringify({class:`size-10 rounded-full`})).replace(/'/g,`%27`)}'></olum>
      <div class="flex flex-col gap-2">
        <olum name="Skeleton" data-o-props='${encodeURIComponent(JSON.stringify({class:`h-3 w-48`})).replace(/'/g,`%27`)}'></olum>
        <olum name="Skeleton" data-o-props='${encodeURIComponent(JSON.stringify({class:`h-3 w-32`})).replace(/'/g,`%27`)}'></olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Spinner</h2>
    <p class="mb-4 text-sm text-muted-foreground">An indeterminate loading indicator, in a couple of sizes.</p>
    <div class="flex items-center gap-4 rounded-xl border border-border p-6 text-foreground">
      <olum name="Spinner" data-o-props='${encodeURIComponent(JSON.stringify({class:`size-4`})).replace(/'/g,`%27`)}'></olum>
      <olum name="Spinner" data-o-props='${encodeURIComponent(JSON.stringify({class:`size-6`})).replace(/'/g,`%27`)}'></olum>
      <olum name="Spinner" data-o-props='${encodeURIComponent(JSON.stringify({class:`size-8 text-primary`})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Toast</h2>
    <p class="mb-4 text-sm text-muted-foreground">Fired from anywhere via <code class="rounded bg-muted px-1 py-0.5 text-xs">toast.add(...)</code>. The Toaster rendering these is mounted once, globally, in Nav.</p>
    <div class="flex flex-wrap gap-2 rounded-xl border border-border p-6">
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastDefault" data-o-props-owner='${t}'>Default</olum>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastSuccess" data-o-props-owner='${t}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ft,class:`size-4`})).replace(/'/g,`%27`)}'></olum>Success</olum>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastError" data-o-props-owner='${t}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:an,class:`size-4`})).replace(/'/g,`%27`)}'></olum>Error</olum>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastWarning" data-o-props-owner='${t}'>Warning</olum>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastInfo" data-o-props-owner='${t}'>Info</olum>
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toastPersistent" data-o-props-owner='${t}'>Persistent</olum>
    </div>
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,p.__style__()),olum.handleMarkup(`page`,`bbgp4dlex07`,e,f)}};return n.__olum__={compName:t,compId:`bbgp4dlex07`},n=olum.proxyHandler(n,null,d),{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:n,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Li=e=>{let t=e||`ButtonGroup`,n=l(t),{orientation:r=`horizontal`,class:i=``,children:a}=l(t),o=`flex w-fit items-stretch [&>[data-olum]]:contents [&_*:focus-visible]:relative [&_*:focus-visible]:z-10 [&>input]:flex-1`,s={horizontal:`[&_[data-slot]]:rounded-none [&>*:first-child_[data-slot]]:rounded-s-lg [&>*:last-child_[data-slot]]:rounded-e-lg [&>*:not(:first-child)_[data-slot]]:border-s-0`,vertical:`flex-col [&_[data-slot]]:rounded-none [&>*:first-child_[data-slot]]:rounded-t-lg [&>*:last-child_[data-slot]]:rounded-b-lg [&>*:not(:first-child)_[data-slot]]:border-t-0`},c=()=>q(o,s[n.orientation===void 0?`horizontal`:n.orientation]||s.horizontal,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`ButtonGroup`,`ey86b8ba4it`),d={orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`ButtonGroup`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div role="group" data-slot="button-group" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`ButtonGroup`,f.__style__()),olum.handleMarkup(`ButtonGroup`,`ey86b8ba4it`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get orientations(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ri=e=>{let t=e||`ButtonGroupSeparator`,n=l(t),{orientation:r=`vertical`,class:i=``}=l(t),a=`relative shrink-0 self-stretch bg-border data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:w-px`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ButtonGroupSeparator`,`y8apud7yoa8`),c={orientation:n.orientation===void 0?`vertical`:n.orientation,className:n.class===void 0?``:n.class,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ButtonGroupSeparator`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div role="separator" aria-orientation="${olum.esc(n.orientation===void 0?`vertical`:n.orientation)}" data-slot="separator" data-orientation="${olum.esc(n.orientation===void 0?`vertical`:n.orientation)}" class="${olum.esc(o())}"></div>`,olum.injectStyle(`ButtonGroupSeparator`,u.__style__()),olum.handleMarkup(`ButtonGroupSeparator`,`y8apud7yoa8`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},zi=e=>{let t=e||`ButtonGroupText`,n=l(t),{class:r=``,children:i}=l(t),a=`flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ButtonGroupText`,`a089j4kau`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ButtonGroupText`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="button-group-text" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`ButtonGroupText`,u.__style__()),olum.handleMarkup(`ButtonGroupText`,`a089j4kau`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Bi=e=>{let t=e||`Calendar`,n=l(t),{selected:r,onSelect:i,class:a=``}=l(t),o=new Date;var s={year:o.getFullYear(),month:o.getMonth(),cells:[]};let c=[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`],u=()=>new Date(s.year,s.month,1).toLocaleDateString(`en-US`,{month:`long`,year:`numeric`}),d=()=>{let e=new Date(s.year,s.month,1),t=new Date(s.year,s.month,1-e.getDay()),r=[];for(let e=0;e<42;e++){let i=new Date(t.getFullYear(),t.getMonth(),t.getDate()+e);r.push({ts:i.getTime(),day:i.getDate(),outside:i.getMonth()!==s.month,today:i.toDateString()===new Date().toDateString(),selected:typeof n.selected==`number`&&i.getTime()===n.selected})}return r};s.cells=d();let f=()=>{let e=new Date(s.year,s.month-1,1);s.year=e.getFullYear(),s.month=e.getMonth(),s.cells=d()},p=()=>{let e=new Date(s.year,s.month+1,1);s.year=e.getFullYear(),s.month=e.getMonth(),s.cells=d()},m=e=>{s.cells=s.cells.map(t=>({...t,selected:t.ts===e.ts})),n.onSelect&&n.onSelect(new Date(e.ts))},h=`inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-transparent text-foreground outline-none select-none hover:bg-muted hover:text-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 active:translate-y-px`,g=`inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-transparent text-sm font-medium outline-none select-none hover:bg-muted focus:border-ring focus:ring-3 focus:ring-ring/50 active:translate-y-px`,_=e=>e.selected?q(g,`bg-primary text-primary-foreground hover:bg-primary/80`):e.today?q(g,`bg-muted text-foreground`):e.outside?q(g,`text-muted-foreground`):g,v=()=>q(`w-fit bg-background p-2`,n.class===void 0?``:n.class);var y=olum.mkElm(`div`,`Calendar`,`vikx45h77zn`),b={selected:n.selected,onSelect:n.onSelect,className:n.class===void 0?``:n.class,label:u,buildCells:d,prev:f,next:p,pick:m,dayClasses:_,classes:v},x={__style__(){return``},methods:{},props:{},compName:`Calendar`,deps:null,components:{},get getElm(){var e=y.isConnected?olum.vdom.mkStaging(y):y;return e.innerHTML=`
      <div data-slot="calendar" class="${olum.esc(v())}">
  <div class="flex items-center justify-between gap-1 pb-2">
    <button type="button" class="${olum.esc(h)}" data-o-event='onclick|prev=${JSON.stringify([])}'>
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      <span class="sr-only">Previous month</span>
    </button>
    <div class="text-sm font-medium select-none">${olum.esc(u())}</div>
    <button type="button" class="${olum.esc(h)}" data-o-event='onclick|next=${JSON.stringify([])}'>
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
      <span class="sr-only">Next month</span>
    </button>
  </div>
  <div class="grid grid-cols-7">
    ${c.map(function(e){return`
      <div class="flex size-7 items-center justify-center text-[0.8rem] font-normal text-muted-foreground select-none" key="${olum.esc(e)}">${olum.esc(e)}</div>
    `}).join(``)}
  </div>
  <div class="mt-1 grid grid-cols-7 gap-y-1">
    ${s.cells.map(function(e){return`
      <button type="button" class="${olum.esc(_(e))}" data-o-event='onclick|pick=${JSON.stringify([e])}' key="${olum.esc(e.ts)}">${olum.esc(e.day)}</button>
    `}).join(``)}
  </div>
</div>`,olum.injectStyle(`Calendar`,x.__style__()),olum.handleMarkup(`Calendar`,`vikx45h77zn`,e,b)}};return s.__olum__={compName:t,compId:`vikx45h77zn`},s=olum.proxyHandler(s,null,y),{methods:x.methods,props:x.props,__OLUM__:x,el:y,methodsRef:b,stateProps:s,localsRef:{get weekdays(){return c},get navBtn(){return h},get dayBase(){return g}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vi=e=>{let t=e||`Checkbox`,n=l(t),{defaultChecked:r=!1,checked:i,disabled:a=!1,required:o=!1,invalid:s=!1,id:c,name:u,class:d=``,onCheckedChange:f}=l(t);var p={checked:n.checked===void 0?n.defaultChecked!==void 0&&n.defaultChecked:n.checked};let m=e=>{p.checked=e.target.checked,n.onCheckedChange&&n.onCheckedChange(e.target.checked)},h=`peer relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-[4px] border border-border bg-background transition-colors outline-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 checked:border-primary checked:bg-primary checked:text-primary-foreground`,g=()=>q(h,n.class===void 0?``:n.class);var _=olum.mkElm(`div`,`Checkbox`,`zlagm9dbisi`),v={defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,checked:n.checked,disabled:n.disabled!==void 0&&n.disabled,required:n.required!==void 0&&n.required,invalid:n.invalid!==void 0&&n.invalid,id:n.id,name:n.name,className:n.class===void 0?``:n.class,onCheckedChange:n.onCheckedChange,handleChange:m,classes:g},y={__style__(){return``},methods:{},props:{},compName:`Checkbox`,deps:null,components:{},get getElm(){var e=_.isConnected?olum.vdom.mkStaging(_):_;return e.innerHTML=`
      <span class="relative inline-flex size-4 shrink-0 top-0.75">
  <input data-slot="checkbox" type="checkbox" id="${olum.esc(n.id)}" name="${olum.esc(n.name)}" class="${olum.esc(g())}" ${p.checked?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``} ${n.required!==void 0&&n.required?`required`:``} aria-invalid="${olum.esc(n.invalid!==void 0&&n.invalid)}" data-o-event='onchange|handleChange=${JSON.stringify([])}'>
  <div data-o-show="" style="display:${p.checked?`contents`:`none`};">
    <svg class="pointer-events-none absolute inset-0 m-auto size-3.5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
  </div>
</span>`,olum.injectStyle(`Checkbox`,y.__style__()),olum.handleMarkup(`Checkbox`,`zlagm9dbisi`,e,v)}};return p.__olum__={compName:t,compId:`zlagm9dbisi`},p=olum.proxyHandler(p,null,_),{methods:y.methods,props:y.props,__OLUM__:y,el:_,methodsRef:v,stateProps:p,localsRef:{get base(){return h}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Hi=e=>{let t=e||`Combobox`,n=l(t),{items:r=[],placeholder:i=``,emptyText:a=`No results found.`,showClear:s=!1,class:c=``}=l(t);var u={query:``,open:!1,value:null};let d=()=>(n.items===void 0?[]:n.items).filter(e=>e.toLowerCase().includes(u.query.trim().toLowerCase())),f=e=>{u.value=e,u.query=e,u.open=!1},p=()=>{u.value=null,u.query=``};var m=o(()=>{let e=e=>{b.contains(e.target)||(u.open=!1)},t=e=>{e.key===`Escape`&&(u.open=!1)};return document.addEventListener(`click`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`click`,e),document.removeEventListener(`keydown`,t)}});let h=()=>q(`relative w-64`,n.class===void 0?``:n.class),g=()=>u.open=!0,_=e=>{u.query=e.target.value,u.open=!0},v=()=>u.open=!u.open;var y=olum.mkElm(`div`,`Combobox`,`rk1u3f31wg`),b=y,x={items:n.items===void 0?[]:n.items,placeholder:n.placeholder===void 0?``:n.placeholder,emptyText:n.emptyText===void 0?`No results found.`:n.emptyText,showClear:n.showClear!==void 0&&n.showClear,className:n.class===void 0?``:n.class,filtered:d,pick:f,clear:p,classes:h,__olumAnon_emhf933:g,__olumAnon_xremnwb:_,__olumAnon_v7yrzo4:v},S={__style__(){return``},methods:{},props:{},compName:`Combobox`,deps:null,components:{},get getElm(){var e=y.isConnected?olum.vdom.mkStaging(y):y;return e.innerHTML=`
      <div data-slot="combobox" class="${olum.esc(h())}">
  <div class="flex h-8 w-full min-w-0 items-center rounded-lg border border-border bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
    <input data-slot="combobox-input" type="text" class="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="${olum.esc(n.placeholder===void 0?``:n.placeholder)}" value="${olum.esc(u.query)}" data-o-event='onfocus|__olumAnon_emhf933=${JSON.stringify([`$event`])}OLUM_EVT_SEPoninput|__olumAnon_xremnwb=${JSON.stringify([`$event`])}'>
    ${n.showClear!==void 0&&n.showClear&&u.query?`
      <button type="button" data-slot="combobox-clear" class="mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" data-o-event='onclick|clear=${JSON.stringify([])}'>
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    `:`
      <button type="button" data-slot="combobox-trigger" class="mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" data-o-event='onclick|__olumAnon_v7yrzo4=${JSON.stringify([`$event`])}'>
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
      </button>
    `}
    
  </div>
  ${u.open?`
    <div data-slot="combobox-content" class="absolute top-full left-0 z-50 mt-1.5 w-full overflow-hidden rounded-lg bg-background text-foreground shadow-md ring-1 ring-border">
      <div data-slot="combobox-list" class="max-h-64 scroll-py-1 overflow-y-auto overscroll-contain p-1">
        ${d().length===0?`
          <div data-slot="combobox-empty" class="flex w-full justify-center py-2 text-center text-sm text-muted-foreground">${olum.esc(n.emptyText===void 0?`No results found.`:n.emptyText)}</div>
        `:``}
        ${d().map(function(e){return`
          <button type="button" data-slot="combobox-item" class="relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-left text-sm outline-none select-none hover:bg-muted" data-o-event='onclick|pick=${JSON.stringify([e])}' key="${olum.esc(e)}">
            ${olum.esc(e)}
            ${u.value===e?`
              <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
              </span>
            `:``}
          </button>
        `}).join(``)}
      </div>
    </div>
  `:``}
</div>`,olum.injectStyle(`Combobox`,S.__style__()),olum.handleMarkup(`Combobox`,`rk1u3f31wg`,e,x)}};return u.__olum__={compName:t,compId:`rk1u3f31wg`},u=olum.proxyHandler(u,null,y),{methods:S.methods,props:S.props,__OLUM__:S,el:y,methodsRef:x,stateProps:u,localsRef:{},hooks:{mounted:m===void 0?null:m,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ui=e=>{let t=e||`DatePicker`,n=l(t),{placeholder:r=`Pick a date`,class:i=``}=l(t);var a={open:!1,ts:null};let s=()=>a.ts?new Date(a.ts).toLocaleDateString(`en-US`,{year:`numeric`,month:`long`,day:`numeric`}):n.placeholder===void 0?`Pick a date`:n.placeholder,c=e=>{a.ts=e.getTime(),a.open=!1};var u=o(()=>{let e=e=>{m.contains(e.target)||(a.open=!1)},t=e=>{e.key===`Escape`&&(a.open=!1)};return document.addEventListener(`click`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`click`,e),document.removeEventListener(`keydown`,t)}});let d=()=>q(`inline-flex h-8 w-[240px] items-center justify-start gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-normal whitespace-nowrap transition-all outline-none select-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0`,a.ts?``:`text-muted-foreground`,n.class===void 0?``:n.class),f=()=>a.open=!a.open;var p=olum.mkElm(`div`,`DatePicker`,`1xt200kyxay`),m=p,h={placeholder:n.placeholder===void 0?`Pick a date`:n.placeholder,className:n.class===void 0?``:n.class,label:s,pick:c,triggerClasses:d,__olumAnon_536hutg:f},g={__style__(){return``},methods:{},props:{},compName:`DatePicker`,deps:null,components:{Calendar:Bi},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <div data-slot="date-picker" class="relative inline-block">
  <button type="button" class="${olum.esc(d())}" data-o-event='onclick|__olumAnon_536hutg=${JSON.stringify([`$event`])}'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
    ${olum.esc(s())}
  </button>
  ${a.open?`
    <div class="absolute top-full left-0 z-50 mt-1 w-auto rounded-lg bg-background shadow-md ring-1 ring-border">
      <olum name="Calendar" data-o-props='${encodeURIComponent(JSON.stringify({selected:a.ts})).replace(/'/g,`%27`)}' data-o-props-src="selected:state:ts|onSelect:method:pick" data-o-props-owner='${t}' if='${JSON.stringify(!!a.open)}'></olum>
    </div>
  `:``}
</div>`,olum.injectStyle(`DatePicker`,g.__style__()),olum.handleMarkup(`DatePicker`,`1xt200kyxay`,e,h)}};return a.__olum__={compName:t,compId:`1xt200kyxay`},a=olum.proxyHandler(a,null,p),{methods:g.methods,props:g.props,__OLUM__:g,el:p,methodsRef:h,stateProps:a,localsRef:{},hooks:{mounted:u===void 0?null:u,unMounted:null,isMounted:!1,isUnMounted:!1}}},Wi=e=>{let t=e||`Field`,n=l(t),{orientation:r=`vertical`,class:i=``,children:a}=l(t),o=`group/field flex w-full gap-2 [&>[data-olum]]:contents data-[invalid=true]:text-destructive`,s={vertical:`flex-col`,horizontal:`flex-row items-center has-[[data-slot=field-content]]:items-start`},c=()=>q(o,s[n.orientation===void 0?`vertical`:n.orientation]||s.vertical,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`Field`,`fqynhlc0wc7`),d={orientation:n.orientation===void 0?`vertical`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`Field`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div role="group" data-slot="field" data-orientation="${olum.esc(n.orientation===void 0?`vertical`:n.orientation)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`Field`,f.__style__()),olum.handleMarkup(`Field`,`fqynhlc0wc7`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get orientations(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Gi=e=>{let t=e||`FieldContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/field-content flex flex-1 flex-col gap-0.5 leading-snug`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`FieldContent`,`zpoxff4f11`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`FieldContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="field-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`FieldContent`,c.__style__()),olum.handleMarkup(`FieldContent`,`zpoxff4f11`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ki=e=>{let t=e||`FieldDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-left text-sm leading-normal font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`FieldDescription`,`goq8hb9epui`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`FieldDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <p data-slot="field-description" class="${olum.esc(a())}">${n.children}</p>`,olum.injectStyle(`FieldDescription`,c.__style__()),olum.handleMarkup(`FieldDescription`,`goq8hb9epui`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qi=e=>{let t=e||`FieldError`,n=l(t),{errors:r,class:i=``,children:a}=l(t),o=()=>Array.isArray(n.errors)?n.errors.filter(e=>e&&e.message):[],s=()=>q(`text-sm font-normal text-destructive`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`FieldError`,`3li4m3dhh0j`),u={errors:n.errors,className:n.class===void 0?``:n.class,children:n.children,list:o,classes:s},d={__style__(){return``},methods:{},props:{},compName:`FieldError`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      ${n.children||o().length?`
  <div role="alert" data-slot="field-error" class="${olum.esc(s())}">
    ${n.children?`${n.children}`:o().length===1?`${olum.esc(o()[0].message)}`:`
      <ul class="ml-4 flex list-disc flex-col gap-1">
        ${o().map(function(e){return`
          <li key="${olum.esc(e.message)}">${olum.esc(e.message)}</li>
        `}).join(``)}
      </ul>
    `}
    
    
  </div>
`:``}`,olum.injectStyle(`FieldError`,d.__style__()),olum.handleMarkup(`FieldError`,`3li4m3dhh0j`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ji=e=>{let t=e||`FieldGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/field-group flex w-full flex-col gap-5 [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`FieldGroup`,`mo08jh4stys`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`FieldGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="field-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`FieldGroup`,c.__style__()),olum.handleMarkup(`FieldGroup`,`mo08jh4stys`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Yi=e=>{let t=e||`Label`,n=l(t),{for:r,class:i=``,children:a}=l(t),o=`flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-has-disabled:cursor-not-allowed group-has-disabled:opacity-50`,s=()=>q(o,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Label`,`g6xtbysw2v`),u={htmlFor:n.for,className:n.class===void 0?``:n.class,children:n.children,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Label`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <label for="${olum.esc(n.for)}" class="${olum.esc(s())}">${n.children}</label>`,olum.injectStyle(`Label`,d.__style__()),olum.handleMarkup(`Label`,`g6xtbysw2v`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{get base(){return o}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xi=e=>{let t=e||`FieldLabel`,n=l(t),{for:r,class:i=``,children:a}=l(t),o=()=>q(`group/field-label flex w-fit gap-2 leading-snug`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`FieldLabel`,`6nqryitik34`),c={htmlFor:n.for,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`FieldLabel`,deps:null,components:{Label:Yi},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <olum name="Label" data-o-props='${encodeURIComponent(JSON.stringify({class:o()})).replace(/'/g,`%27`)}' data-o-props-src="for:method:htmlFor" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`FieldLabel`,u.__style__()),olum.handleMarkup(`FieldLabel`,`6nqryitik34`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Zi=e=>{let t=e||`FieldLegend`,n=l(t),{variant:r=`legend`,class:i=``,children:a}=l(t),o=()=>q(`mb-1.5 font-medium`,(n.variant===void 0?`legend`:n.variant)===`label`?`text-sm`:`text-base`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`FieldLegend`,`yfg5169u14`),c={variant:n.variant===void 0?`legend`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`FieldLegend`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <legend data-slot="field-legend" data-variant="${olum.esc(n.variant===void 0?`legend`:n.variant)}" class="${olum.esc(o())}">${n.children}</legend>`,olum.injectStyle(`FieldLegend`,u.__style__()),olum.handleMarkup(`FieldLegend`,`yfg5169u14`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qi=e=>{let t=e||`FieldSeparator`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`relative -my-2 h-5 text-sm`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`FieldSeparator`,`b6grm149tdo`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`FieldSeparator`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="field-separator" class="${olum.esc(a())}">
  <div class="absolute inset-0 top-1/2 h-px w-full bg-border"></div>
  ${n.children?`
    <span data-slot="field-separator-content" class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground">${n.children}</span>
  `:``}
</div>`,olum.injectStyle(`FieldSeparator`,c.__style__()),olum.handleMarkup(`FieldSeparator`,`b6grm149tdo`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$i=e=>{let t=e||`FieldSet`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-4 [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`FieldSet`,`a6qyvm27vo`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`FieldSet`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <fieldset data-slot="field-set" class="${olum.esc(a())}">${n.children}</fieldset>`,olum.injectStyle(`FieldSet`,c.__style__()),olum.handleMarkup(`FieldSet`,`a6qyvm27vo`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ea=e=>{let t=e||`InputGroup`,n=l(t),{class:r=``,children:i}=l(t),a=`group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-border transition-colors outline-none has-disabled:bg-muted has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-align=block-end]]:h-auto has-[[data-align=block-end]]:flex-col has-[[data-align=block-start]]:h-auto has-[[data-align=block-start]]:flex-col has-[textarea]:h-auto`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`InputGroup`,`p85pp2myda9`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`InputGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="input-group" role="group" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`InputGroup`,u.__style__()),olum.handleMarkup(`InputGroup`,`p85pp2myda9`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ta=e=>{let t=e||`InputGroupAddon`,n=l(t),{align:r=`inline-start`,class:i=``,children:a}=l(t),o=`flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4`,s={"inline-start":`order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]`,"inline-end":`order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]`,"block-start":`order-first w-full justify-start px-2.5 pt-2`,"block-end":`order-last w-full justify-start px-2.5 pb-2`},c=()=>q(o,s[n.align===void 0?`inline-start`:n.align]||s[`inline-start`],n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`InputGroupAddon`,`53ne9cv3vhj`),d={align:n.align===void 0?`inline-start`:n.align,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`InputGroupAddon`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div role="group" data-slot="input-group-addon" data-align="${olum.esc(n.align===void 0?`inline-start`:n.align)}" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`InputGroupAddon`,f.__style__()),olum.handleMarkup(`InputGroupAddon`,`53ne9cv3vhj`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get aligns(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},na=e=>{let t=e||`InputGroupButton`,n=l(t),{type:r=`button`,variant:i=`ghost`,size:a=`xs`,value:o,ariaLabel:s,class:c=``,children:u}=l(t),d={xs:`h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5`,sm:``,"icon-xs":`size-6 rounded-[calc(var(--radius)-3px)] p-0`,"icon-sm":`size-8 p-0`},f=()=>q(`flex items-center gap-2 text-sm shadow-none`,d[n.size===void 0?`xs`:n.size]||d.xs,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`InputGroupButton`,`cum4kr75spd`),m={type:n.type===void 0?`button`:n.type,variant:n.variant===void 0?`ghost`:n.variant,size:n.size===void 0?`xs`:n.size,value:n.value,ariaLabel:n.ariaLabel,className:n.class===void 0?``:n.class,children:n.children,classes:f},h={__style__(){return``},methods:{},props:{},compName:`InputGroupButton`,deps:null,components:{Button:J},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:f()})).replace(/'/g,`%27`)}' data-o-props-src="type:method:type|variant:method:variant|value:method:value|ariaLabel:method:ariaLabel" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`InputGroupButton`,h.__style__()),olum.handleMarkup(`InputGroupButton`,`cum4kr75spd`,e,m)}};return{methods:h.methods,props:h.props,__OLUM__:h,el:p,methodsRef:m,stateProps:null,localsRef:{get sizes(){return d}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ra=e=>{let t=e||`InputGroupInput`,n=l(t),{class:r=``,placeholder:i,value:a,id:o,name:s,disabled:c=!1}=l(t),u=()=>q(`flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent`,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`InputGroupInput`,`2u279p2cf4w`),f={className:n.class===void 0?``:n.class,placeholder:n.placeholder,value:n.value,id:n.id,name:n.name,disabled:n.disabled!==void 0&&n.disabled,classes:u},p={__style__(){return``},methods:{},props:{},compName:`InputGroupInput`,deps:null,components:{Input:_t},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({slot:`input-group-control`,class:u()})).replace(/'/g,`%27`)}' data-o-props-src="placeholder:method:placeholder|value:method:value|id:method:id|name:method:name|disabled:method:disabled" data-o-props-owner='${t}'></olum>`,olum.injectStyle(`InputGroupInput`,p.__style__()),olum.handleMarkup(`InputGroupInput`,`2u279p2cf4w`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ia=e=>{let t=e||`InputOTP`,n=l(t),{class:r=``,containerClass:i=``,children:a}=l(t),o=()=>q(`flex items-center has-disabled:opacity-50`,n.class===void 0?``:n.class,n.containerClass===void 0?``:n.containerClass);var s=olum.mkElm(`div`,`InputOTP`,`xuu3mccfj0m`),c={className:n.class===void 0?``:n.class,containerClass:n.containerClass===void 0?``:n.containerClass,children:n.children,containerClasses:o},u={__style__(){return``},methods:{},props:{},compName:`InputOTP`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="input-otp" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`InputOTP`,u.__style__()),olum.handleMarkup(`InputOTP`,`xuu3mccfj0m`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},aa=e=>{let t=e||`InputOTPGroup`,n=l(t),{class:r=``,children:i}=l(t),a=`flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 [&>[data-olum]]:contents [&>*:first-child>input]:rounded-l-lg [&>*:first-child>input]:border-l [&>*:last-child>input]:rounded-r-lg`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`InputOTPGroup`,`7spar1y9zc7`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`InputOTPGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="input-otp-group" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`InputOTPGroup`,u.__style__()),olum.handleMarkup(`InputOTPGroup`,`7spar1y9zc7`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},oa=e=>{var t=olum.mkElm(`div`,`InputOTPSeparator`,`yq5btcnn1pc`),n={},r={__style__(){return``},methods:{},props:{},compName:`InputOTPSeparator`,deps:null,components:{},get getElm(){var e=t.isConnected?olum.vdom.mkStaging(t):t;return e.innerHTML=`
      <div data-slot="input-otp-separator" role="separator" class="flex items-center [&_svg:not([class*='size-'])]:size-4">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</div>`,olum.injectStyle(`InputOTPSeparator`,r.__style__()),olum.handleMarkup(`InputOTPSeparator`,`yq5btcnn1pc`,e,n)}};return{methods:r.methods,props:r.props,__OLUM__:r,el:t,methodsRef:n,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},sa=e=>{let t=e||`InputOTPSlot`,n=l(t),{index:r=0,class:i=``}=l(t),a=`relative flex size-8 items-center justify-center border-y border-r border-border bg-transparent text-center text-sm outline-none transition-all focus:z-10 focus:border-ring focus:ring-3 focus:ring-ring/50 appearance-none`,s=()=>q(a,n.class===void 0?``:n.class);var c=o(()=>{let e=d.querySelector(`input`),t=()=>{let e=d.closest(`[data-slot="input-otp"]`)||document;return Array.from(e.querySelectorAll(`input[data-slot="input-otp-slot"]`))},n=n=>{if(n.target.value=n.target.value.replace(/[^0-9a-zA-Z]/g,``).slice(-1),n.target.value){let n=t(),r=n.indexOf(e);n[r+1]&&n[r+1].focus()}},r=n=>{if(n.key===`Backspace`&&!n.target.value){let n=t(),r=n.indexOf(e);n[r-1]&&n[r-1].focus()}},i=n=>{n.preventDefault();let r=(n.clipboardData||window.clipboardData).getData(`text`).replace(/[^0-9a-zA-Z]/g,``);if(!r)return;let i=t(),a=i.indexOf(e);r.split(``).forEach((e,t)=>{i[a+t]&&(i[a+t].value=e)});let o=i[Math.min(a+r.length,i.length-1)];o&&o.focus()};return e.addEventListener(`input`,n),e.addEventListener(`keydown`,r),e.addEventListener(`paste`,i),()=>{e.removeEventListener(`input`,n),e.removeEventListener(`keydown`,r),e.removeEventListener(`paste`,i)}}),u=olum.mkElm(`div`,`InputOTPSlot`,`hpw9mkm1w8u`),d=u,f={index:n.index===void 0?0:n.index,className:n.class===void 0?``:n.class,classes:s},p={__style__(){return``},methods:{},props:{},compName:`InputOTPSlot`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" data-slot="input-otp-slot" data-index="${olum.esc(n.index===void 0?0:n.index)}" class="${olum.esc(s())}">`,olum.injectStyle(`InputOTPSlot`,p.__style__()),olum.handleMarkup(`InputOTPSlot`,`hpw9mkm1w8u`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:u,methodsRef:f,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:c===void 0?null:c,unMounted:null,isMounted:!1,isUnMounted:!1}}},ca=e=>{let t=e||`NativeSelect`,n=l(t),{size:r=`default`,disabled:i=!1,value:a,defaultValue:o,name:s,id:c,class:u=``,onchange:d,children:f}=l(t),p=e=>n.onchange&&n.onchange(e),m=()=>q(`group/native-select relative w-fit has-[select:disabled]:opacity-50`,n.class===void 0?``:n.class),h=`h-8 w-full min-w-0 appearance-none rounded-lg border border-border bg-background py-1 pr-8 pl-2.5 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5`;var g=olum.mkElm(`div`,`NativeSelect`,`ic2pb27yum`),_={size:n.size===void 0?`default`:n.size,disabled:n.disabled!==void 0&&n.disabled,value:n.value,defaultValue:n.defaultValue,name:n.name,id:n.id,className:n.class===void 0?``:n.class,onchange:n.onchange,children:n.children,handleChange:p,wrapperClasses:m},v={__style__(){return``},methods:{},props:{},compName:`NativeSelect`,deps:null,components:{},get getElm(){var e=g.isConnected?olum.vdom.mkStaging(g):g;return e.innerHTML=`
      <div class="${olum.esc(m())}" data-slot="native-select-wrapper" data-size="${olum.esc(n.size===void 0?`default`:n.size)}">
  <select data-slot="native-select" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" name="${olum.esc(n.name)}" id="${olum.esc(n.id)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} value="${olum.esc(n.value)}" class="${olum.esc(h)}" data-o-event='onchange|handleChange=${JSON.stringify([])}'>${n.children}</select>
  <svg class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none" aria-hidden="true" data-slot="native-select-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
</div>`,olum.injectStyle(`NativeSelect`,v.__style__()),olum.handleMarkup(`NativeSelect`,`ic2pb27yum`,e,_)}};return{methods:v.methods,props:v.props,__OLUM__:v,el:g,methodsRef:_,stateProps:null,localsRef:{get base(){return h}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},la=e=>{let t=e||`NativeSelectOptGroup`,n=l(t),{label:r,class:i=``,children:a}=l(t),o=()=>q(`bg-[Canvas] text-[CanvasText]`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`NativeSelectOptGroup`,`xmp4gybo8cj`),c={label:n.label,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`NativeSelectOptGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <optgroup data-slot="native-select-optgroup" label="${olum.esc(n.label)}" class="${olum.esc(o())}">${n.children}</optgroup>`,olum.injectStyle(`NativeSelectOptGroup`,u.__style__()),olum.handleMarkup(`NativeSelectOptGroup`,`xmp4gybo8cj`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ua=e=>{let t=e||`NativeSelectOption`,n=l(t),{value:r,class:i=``,children:a}=l(t),o=()=>q(`bg-[Canvas] text-[CanvasText]`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`NativeSelectOption`,`zchv5sxdsj`),c={value:n.value,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`NativeSelectOption`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <option data-slot="native-select-option" value="${olum.esc(n.value)}" class="${olum.esc(o())}">${n.children}</option>`,olum.injectStyle(`NativeSelectOption`,u.__style__()),olum.handleMarkup(`NativeSelectOption`,`zchv5sxdsj`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},da=e=>{let t=e||`RadioGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`grid w-full gap-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`RadioGroup`,`dscntp7dago`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`RadioGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div role="radiogroup" data-slot="radio-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`RadioGroup`,c.__style__()),olum.handleMarkup(`RadioGroup`,`dscntp7dago`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},fa=e=>{let t=e||`RadioGroupItem`,n=l(t),{name:r=`radio-group`,value:i,defaultChecked:a=!1,disabled:o=!1,id:s,class:c=``,onCheckedChange:u}=l(t),d=e=>{n.onCheckedChange&&n.onCheckedChange(n.value)},f=`peer relative flex aspect-square size-4 shrink-0 appearance-none cursor-pointer rounded-full border border-border bg-background outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 checked:border-primary checked:bg-primary`,p=()=>q(f,n.class===void 0?``:n.class);var m=olum.mkElm(`div`,`RadioGroupItem`,`2s7hon4fdir`),h={name:n.name===void 0?`radio-group`:n.name,value:n.value,defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,disabled:n.disabled!==void 0&&n.disabled,id:n.id,className:n.class===void 0?``:n.class,onCheckedChange:n.onCheckedChange,handleChange:d,classes:p},g={__style__(){return``},methods:{},props:{},compName:`RadioGroupItem`,deps:null,components:{},get getElm(){var e=m.isConnected?olum.vdom.mkStaging(m):m;return e.innerHTML=`
      <span class="relative inline-flex size-4 shrink-0">
  <input data-slot="radio-group-item" type="radio" name="${olum.esc(n.name===void 0?`radio-group`:n.name)}" value="${olum.esc(n.value)}" id="${olum.esc(n.id)}" class="${olum.esc(p())}" ${n.defaultChecked!==void 0&&n.defaultChecked?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``} data-o-event='onchange|handleChange=${JSON.stringify([])}'>
  <span class="pointer-events-none absolute top-1/2 left-1/2 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground peer-checked:block"></span>
</span>`,olum.injectStyle(`RadioGroupItem`,g.__style__()),olum.handleMarkup(`RadioGroupItem`,`2s7hon4fdir`,e,h)}};return{methods:g.methods,props:g.props,__OLUM__:g,el:m,methodsRef:h,stateProps:null,localsRef:{get base(){return f}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},pa=e=>{let t=e||`Select`,n=l(t),{defaultValue:r,onValueChange:i,children:a}=l(t);var s=o(()=>{let e=u.querySelector(`[data-slot="select"]`),t=e&&e.querySelector(`:scope > input`),r=t=>{e.querySelectorAll(`[data-slot="select-item"]`).forEach(e=>e.removeAttribute(`data-checked`)),t.setAttribute(`data-checked`,``);let n=e.querySelector(`[data-slot="select-value"]`);n&&(n.textContent=t.textContent.trim(),n.removeAttribute(`data-placeholder`))},i=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},a=t=>{let a=t.target.closest(`[data-slot="select-item"]`);!a||!e.contains(a)||(r(a),i(),n.onValueChange&&n.onValueChange(a.dataset.value))};e.addEventListener(`click`,a);let o=setTimeout(()=>{if(n.defaultValue===void 0)return;let t=e.querySelector(`[data-slot="select-item"][data-value="${n.defaultValue}"]`);t&&r(t)});return()=>{clearTimeout(o),e.removeEventListener(`click`,a)}}),c=olum.mkElm(`div`,`Select`,`dz3zzl9xk6`),u=c,d={defaultValue:n.defaultValue,onValueChange:n.onValueChange,children:n.children},f={__style__(){return``},methods:{},props:{},compName:`Select`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="select" class="relative inline-block [&_[data-slot=select-content]]:hidden has-[>input:checked]:[&_[data-slot=select-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`Select`,f.__style__()),olum.handleMarkup(`Select`,`dz3zzl9xk6`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},ma=e=>{let t=e||`SelectContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="select"]`),t=e&&e.querySelector(`:scope > input`),n=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},r=t=>{e&&!e.contains(t.target)&&n()},i=e=>{e.key===`Escape`&&t&&t.checked&&n()};return document.addEventListener(`click`,r),document.addEventListener(`keydown`,i),()=>{document.removeEventListener(`click`,r),document.removeEventListener(`keydown`,i)}});let s=()=>q(`absolute top-full left-0 z-50 mt-1 max-h-72 w-full min-w-36 overflow-x-hidden overflow-y-auto rounded-lg bg-background text-foreground shadow-md ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`SelectContent`,`l03blyuc33`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`SelectContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="select-content" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`SelectContent`,f.__style__()),olum.handleMarkup(`SelectContent`,`l03blyuc33`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},ha=e=>{let t=e||`SelectGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`scroll-my-1 p-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SelectGroup`,`c3moclumlh9`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SelectGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="select-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SelectGroup`,c.__style__()),olum.handleMarkup(`SelectGroup`,`c3moclumlh9`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ga=e=>{let t=e||`SelectItem`,n=l(t),{value:r,disabled:i=!1,class:a=``,children:o}=l(t),s=`relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none hover:bg-muted disabled:pointer-events-none disabled:opacity-50 [&[data-checked]_[data-slot=select-item-indicator]]:flex [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,c=()=>q(s,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`SelectItem`,`zdm3lfjlhdg`),d={value:n.value,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`SelectItem`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <button type="button" data-slot="select-item" data-value="${olum.esc(n.value)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(c())}">
  <span class="flex flex-1 shrink-0 gap-2 whitespace-nowrap text-left">${n.children}</span>
  <span data-slot="select-item-indicator" class="pointer-events-none absolute right-2 hidden size-4 items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
  </span>
</button>`,olum.injectStyle(`SelectItem`,f.__style__()),olum.handleMarkup(`SelectItem`,`zdm3lfjlhdg`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},_a=e=>{let t=e||`SelectLabel`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`px-1.5 py-1 text-xs text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SelectLabel`,`7sbfvaq657`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SelectLabel`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="select-label" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SelectLabel`,c.__style__()),olum.handleMarkup(`SelectLabel`,`7sbfvaq657`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},va=e=>{let t=e||`SelectSeparator`,n=l(t),{class:r=``}=l(t),i=()=>q(`pointer-events-none -mx-1 my-1 h-px bg-border`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`SelectSeparator`,`ifyv7chkpnb`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`SelectSeparator`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="select-separator" class="${olum.esc(i())}"></div>`,olum.injectStyle(`SelectSeparator`,s.__style__()),olum.handleMarkup(`SelectSeparator`,`ifyv7chkpnb`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ya=e=>{let t=e||`SelectTrigger`,n=l(t),{size:r=`default`,disabled:i=!1,class:a=``,children:s}=l(t);var c=o(()=>{let e=m.closest(`[data-slot="select"]`),t=e&&e.querySelector(`:scope > input`),n=m.querySelector(`button`),r=()=>{t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let u=`flex w-fit items-center justify-between gap-1.5 rounded-lg border border-border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>[data-olum]]:contents [&_[data-slot=select-value]]:line-clamp-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,d={default:`h-8`,sm:`h-7 rounded-[min(var(--radius-md),10px)]`},f=()=>q(u,d[n.size===void 0?`default`:n.size]||d.default,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`SelectTrigger`,`putp7s73xc`),m=p,h={size:n.size===void 0?`default`:n.size,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:f},g={__style__(){return``},methods:{},props:{},compName:`SelectTrigger`,deps:null,components:{},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <button type="button" data-slot="select-trigger" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(f())}">
  ${n.children}
  <svg class="pointer-events-none size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
</button>`,olum.injectStyle(`SelectTrigger`,g.__style__()),olum.handleMarkup(`SelectTrigger`,`putp7s73xc`,e,h)}};return{methods:g.methods,props:g.props,__OLUM__:g,el:p,methodsRef:h,stateProps:null,localsRef:{get base(){return u},get sizes(){return d}},hooks:{mounted:c===void 0?null:c,unMounted:null,isMounted:!1,isUnMounted:!1}}},ba=e=>{let t=e||`SelectValue`,n=l(t),{placeholder:r=``,class:i=``}=l(t),a=()=>q(`flex flex-1 text-left data-[placeholder]:text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SelectValue`,`3hzjldgq6hh`),s={placeholder:n.placeholder===void 0?``:n.placeholder,className:n.class===void 0?``:n.class,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SelectValue`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="select-value" data-placeholder="" class="${olum.esc(a())}">${olum.esc(n.placeholder===void 0?``:n.placeholder)}</span>`,olum.injectStyle(`SelectValue`,c.__style__()),olum.handleMarkup(`SelectValue`,`3hzjldgq6hh`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},xa=e=>{let t=e||`Slider`,n=l(t),{defaultValue:r,value:i,min:a=0,max:o=100,step:s=1,disabled:c=!1,class:u=``}=l(t),d=Array.isArray(n.value)?n.value:Array.isArray(n.defaultValue)?n.defaultValue:[n.min===void 0?0:n.min,n.max===void 0?100:n.max];var f={values:d.slice()};let p=e=>(e-(n.min===void 0?0:n.min))/((n.max===void 0?100:n.max)-(n.min===void 0?0:n.min))*100,m=()=>f.values.length>1?p(Math.min(...f.values)):0,h=()=>p(Math.max(...f.values)),g=(e,t)=>{f.values[e]=+t.target.value},_=()=>f.values.length>1,v=()=>q(`peer absolute inset-0 h-4 w-full cursor-pointer appearance-none bg-transparent opacity-0 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:size-3`,_()?`pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto`:``),y=()=>q(`relative flex w-full touch-none items-center select-none`,n.class===void 0?``:n.class),b=(e,t)=>(e=>g(t,e))(e);var x=olum.mkElm(`div`,`Slider`,`vewmrmulyfs`),S={defaultValue:n.defaultValue,value:n.value,min:n.min===void 0?0:n.min,max:n.max===void 0?100:n.max,step:n.step===void 0?1:n.step,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,pct:p,rangeStart:m,rangeEnd:h,handleInput:g,isRange:_,inputClasses:v,classes:y,__olumAnon_x43yqtg:b},C={__style__(){return``},methods:{},props:{},compName:`Slider`,deps:null,components:{},get getElm(){var e=x.isConnected?olum.vdom.mkStaging(x):x;return e.innerHTML=`
      <div class="${olum.esc(y())}" data-slot="slider">
  <div data-slot="slider-track" class="relative grow overflow-hidden rounded-full bg-muted select-none h-1 w-full">
    <div data-slot="slider-range" class="absolute inset-y-0 bg-primary select-none" style="left: ${olum.esc(m())}%; right: ${olum.esc(100-h())}%;"></div>
  </div>
  ${f.values.map(function(e,t){return`
    <div class="contents" key="${olum.esc(t)}">
      <input type="range" min="${olum.esc(n.min===void 0?0:n.min)}" max="${olum.esc(n.max===void 0?100:n.max)}" step="${olum.esc(n.step===void 0?1:n.step)}" value="${olum.esc(e)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(v())}" data-o-event='oninput|__olumAnon_x43yqtg=${JSON.stringify([`$event`,t])}'>
      <div class="pointer-events-none absolute top-1/2 block size-3 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] peer-hover:ring-4" style="left: ${olum.esc(p(e))}%;"></div>
    </div>
  `}).join(``)}
</div>`,olum.injectStyle(`Slider`,C.__style__()),olum.handleMarkup(`Slider`,`vewmrmulyfs`,e,S)}};return f.__olum__={compName:t,compId:`vewmrmulyfs`},f=olum.proxyHandler(f,null,x),{methods:C.methods,props:C.props,__OLUM__:C,el:x,methodsRef:S,stateProps:f,localsRef:{get initial(){return d}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Sa=e=>{let t=e||`Switch`,n=l(t),{defaultChecked:r=!1,checked:i,disabled:a=!1,size:o=`default`,id:s,name:c,class:u=``,onCheckedChange:d}=l(t);var f={checked:n.checked===void 0?n.defaultChecked!==void 0&&n.defaultChecked:n.checked};let p=e=>{f.checked=e.target.checked,n.onCheckedChange&&n.onCheckedChange(e.target.checked)},m=`peer relative inline-flex shrink-0 appearance-none cursor-pointer items-center rounded-full border border-transparent bg-muted-foreground/30 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary`,h={default:`h-[18.4px] w-[32px]`,sm:`h-[14px] w-[24px]`},g={default:`size-4 left-px peer-checked:translate-x-[calc(100%-2px)]`,sm:`size-3 left-px peer-checked:translate-x-[calc(100%-2px)]`},_=()=>q(m,h[n.size===void 0?`default`:n.size]||h.default,n.class===void 0?``:n.class),v=()=>q(`pointer-events-none absolute top-1/2 block -translate-y-1/2 translate-x-0 rounded-full bg-background ring-0 transition-transform`,g[n.size===void 0?`default`:n.size]||g.default);var y=olum.mkElm(`div`,`Switch`,`u9eeh36btw9`),b={defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,checked:n.checked,disabled:n.disabled!==void 0&&n.disabled,size:n.size===void 0?`default`:n.size,id:n.id,name:n.name,className:n.class===void 0?``:n.class,onCheckedChange:n.onCheckedChange,handleChange:p,classes:_,thumbClasses:v},x={__style__(){return``},methods:{},props:{},compName:`Switch`,deps:null,components:{},get getElm(){var e=y.isConnected?olum.vdom.mkStaging(y):y;return e.innerHTML=`
      <span class="relative inline-flex shrink-0 items-center">
  <input data-slot="switch" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" type="checkbox" role="switch" id="${olum.esc(n.id)}" name="${olum.esc(n.name)}" class="${olum.esc(_())}" ${f.checked?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``} data-o-event='onchange|handleChange=${JSON.stringify([])}'>
  <span data-slot="switch-thumb" class="${olum.esc(v())}"></span>
</span>`,olum.injectStyle(`Switch`,x.__style__()),olum.handleMarkup(`Switch`,`u9eeh36btw9`,e,b)}};return f.__olum__={compName:t,compId:`u9eeh36btw9`},f=olum.proxyHandler(f,null,y),{methods:x.methods,props:x.props,__OLUM__:x,el:y,methodsRef:b,stateProps:f,localsRef:{get base(){return m},get sizes(){return h},get thumbSizes(){return g}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ca=e=>{let t=e||`Textarea`,n=l(t),{class:r=``,disabled:i=!1,required:a=!1,readonly:o=!1,invalid:s=!1,placeholder:c,value:u,name:d,id:f,rows:p,oninput:m,onchange:h,onfocus:g,onblur:_}=l(t),v=`flex field-sizing-content min-h-16 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`,y=()=>q(v,n.class===void 0?``:n.class),b=e=>n.oninput&&n.oninput(e),x=e=>n.onchange&&n.onchange(e),S=e=>n.onfocus&&n.onfocus(e),C=e=>n.onblur&&n.onblur(e);var w=olum.mkElm(`div`,`Textarea`,`szd5hrn0x3e`),T={className:n.class===void 0?``:n.class,disabled:n.disabled!==void 0&&n.disabled,required:n.required!==void 0&&n.required,readonly:n.readonly!==void 0&&n.readonly,invalid:n.invalid!==void 0&&n.invalid,placeholder:n.placeholder,value:n.value,name:n.name,id:n.id,rows:n.rows,oninput:n.oninput,onchange:n.onchange,onfocus:n.onfocus,onblur:n.onblur,classes:y,handleInput:b,handleChange:x,handleFocus:S,handleBlur:C},E={__style__(){return``},methods:{},props:{},compName:`Textarea`,deps:null,components:{},get getElm(){var e=w.isConnected?olum.vdom.mkStaging(w):w;return e.innerHTML=`
      <textarea class="${olum.esc(y())}" placeholder="${olum.esc(n.placeholder)}" name="${olum.esc(n.name)}" id="${olum.esc(n.id)}" rows="${olum.esc(n.rows)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} ${n.required!==void 0&&n.required?`required`:``} ${n.readonly!==void 0&&n.readonly?`readonly`:``} aria-invalid="${olum.esc(n.invalid!==void 0&&n.invalid)}" data-o-event='onblur|handleBlur=${JSON.stringify([])}OLUM_EVT_SEPonchange|handleChange=${JSON.stringify([])}OLUM_EVT_SEPonfocus|handleFocus=${JSON.stringify([])}OLUM_EVT_SEPoninput|handleInput=${JSON.stringify([])}'>${olum.esc(n.value)}</textarea>`,olum.injectStyle(`Textarea`,E.__style__()),olum.handleMarkup(`Textarea`,`szd5hrn0x3e`,e,T)}};return{methods:E.methods,props:E.props,__OLUM__:E,el:w,methodsRef:T,stateProps:null,localsRef:{get base(){return v}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},wa=e=>{let t=e||`Toggle`,n=l(t),{variant:r=`default`,size:i=`default`,defaultPressed:a=!1,pressed:o,disabled:s=!1,class:c=``,onPressedChange:u,children:d}=l(t),f=()=>n.pressed!==void 0;var p={pressed:n.defaultPressed!==void 0&&n.defaultPressed};let m=()=>f()?n.pressed:p.pressed,h=()=>{let e=!m();f()||(p.pressed=e),n.onPressedChange&&n.onPressedChange(e)},g=`group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,_={default:`bg-transparent`,outline:`border border-border bg-transparent hover:bg-muted`},v={default:`h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,sm:`h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5`,lg:`h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`},y=()=>q(g,_[n.variant===void 0?`default`:n.variant]||_.default,v[n.size===void 0?`default`:n.size]||v.default,n.class===void 0?``:n.class);var b=olum.mkElm(`div`,`Toggle`,`w71otl5meqs`),x={variant:n.variant===void 0?`default`:n.variant,size:n.size===void 0?`default`:n.size,defaultPressed:n.defaultPressed!==void 0&&n.defaultPressed,pressed:n.pressed,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,onPressedChange:n.onPressedChange,children:n.children,isControlled:f,isPressed:m,handleClick:h,classes:y},S={__style__(){return``},methods:{},props:{},compName:`Toggle`,deps:null,components:{},get getElm(){var e=b.isConnected?olum.vdom.mkStaging(b):b;return e.innerHTML=`
      <button data-slot="toggle" type="button" aria-pressed="${olum.esc(m())}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(y())}" data-o-event='onclick|handleClick=${JSON.stringify([])}'>${n.children}</button>`,olum.injectStyle(`Toggle`,S.__style__()),olum.handleMarkup(`Toggle`,`w71otl5meqs`,e,x)}};return p.__olum__={compName:t,compId:`w71otl5meqs`},p=olum.proxyHandler(p,null,b),{methods:S.methods,props:S.props,__OLUM__:S,el:b,methodsRef:x,stateProps:p,localsRef:{get base(){return g},get variants(){return _},get sizes(){return v}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ta=0;function Ea(){return`toggle-group-${Ta++}`}var Da=u({active:{},init(e,t){this.active[e]||(this.active={...this.active,[e]:new Set(t)})},isActive(e,t){let n=this.active[e];return!!n&&n.has(t)},toggle(e,t,n){let r=this.active[e]||new Set,i=n?new Set(r):new Set;n&&i.has(t)?i.delete(t):i.add(t),this.active={...this.active,[e]:i}}}),Oa=e=>{let t=e||`ToggleGroup`,n=l(t),{multiple:r=!1,defaultValue:i=[],orientation:a=`horizontal`,class:o=``,children:s}=l(t),c=Ea();Da.init(c,n.defaultValue===void 0?[]:n.defaultValue);let u=`group/toggle-group flex w-fit items-center gap-2 rounded-lg`,d={horizontal:`flex-row`,vertical:`flex-col items-stretch`},f=()=>q(u,d[n.orientation===void 0?`horizontal`:n.orientation]||d.horizontal,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`ToggleGroup`,`04ax7c59ucew`),m={multiple:n.multiple!==void 0&&n.multiple,defaultValue:n.defaultValue===void 0?[]:n.defaultValue,orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:f},h={__style__(){return``},methods:{},props:{},compName:`ToggleGroup`,deps:null,components:{},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <div role="group" data-slot="toggle-group" data-group-id="${olum.esc(c)}" data-multiple="${olum.esc(n.multiple!==void 0&&n.multiple)}" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(f())}">${n.children}</div>`,olum.injectStyle(`ToggleGroup`,h.__style__()),olum.handleMarkup(`ToggleGroup`,`04ax7c59ucew`,e,m)}};return{methods:h.methods,props:h.props,__OLUM__:h,el:p,methodsRef:m,stateProps:null,localsRef:{get base(){return u},get orientations(){return d}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ka=e=>{let t=e||`ToggleGroupItem`,n=l(t),{value:r,variant:i=`default`,size:a=`default`,class:s=``,children:c}=l(t);var u={groupId:null,multiple:!1},d=o(()=>{let e=g.closest(`[data-slot="toggle-group"]`);e&&(u.groupId=e.dataset.groupId,u.multiple=e.dataset.multiple===`true`)});let f=()=>u.groupId!=null&&Da.isActive(u.groupId,n.value),p=()=>{u.groupId!=null&&Da.toggle(u.groupId,n.value,u.multiple)},m=()=>q(`shrink-0 focus:z-10 focus-visible:z-10`,n.class===void 0?``:n.class);var h=olum.mkElm(`div`,`ToggleGroupItem`,`oowg6w9q5re`),g=h,_={value:n.value,variant:n.variant===void 0?`default`:n.variant,size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,isPressed:f,handlePressedChange:p,classes:m},v={__style__(){return``},methods:{},props:{},compName:`ToggleGroupItem`,deps:null,components:{Toggle:wa},get getElm(){var e=h.isConnected?olum.vdom.mkStaging(h):h;return e.innerHTML=`
      <olum name="Toggle" data-o-props='${encodeURIComponent(JSON.stringify({pressed:f(),class:m()})).replace(/'/g,`%27`)}' data-o-props-src="variant:method:variant|size:method:size|onPressedChange:method:handlePressedChange" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`ToggleGroupItem`,v.__style__()),olum.handleMarkup(`ToggleGroupItem`,`oowg6w9q5re`,e,_)}};return u.__olum__={compName:t,compId:`oowg6w9q5re`},u=olum.proxyHandler(u,null,h),{methods:v.methods,props:v.props,__OLUM__:v,el:h,methodsRef:_,stateProps:u,localsRef:{},hooks:{mounted:d===void 0?null:d,unMounted:null,isMounted:!1,isUnMounted:!1}}},Aa=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`,ja=e=>{let t=e||`page`;var n={name:``,email:``,bio:``,country:``,plan:`pro`,notify:!0,terms:!1,termsError:!1,submitted:!1};let r=e=>n.name=e.target.value,i=e=>n.email=e.target.value,a=e=>n.bio=e.target.value,o=e=>n.country=e.target.value,s=e=>n.plan=e,c=e=>n.notify=e,l=e=>{n.terms=e,e&&(n.termsError=!1)},u=()=>{n.termsError=!n.terms,n.submitted=n.terms},d={framework:`olum`,otp:``,searchQuery:``},f=e=>d.framework=e,p=e=>d.searchQuery=e.target.value,m=()=>d.searchQuery=``,h=[`Apple`,`Banana`,`Cherry`,`Durian`,`Elderberry`,`Fig`,`Grape`,`Honeydew`];var g=olum.mkElm(`div`,`page`,`wqwesi4yn4`),_={onNameInput:r,onEmailInput:i,onBioInput:a,onCountryChange:o,onPlanChange:s,onNotifyChange:c,onTermsChange:l,submitForm:u,onFrameworkChange:f,onSearchInput:p,clearSearch:m},v={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Button:J,Icon:Y,ButtonGroup:Li,ButtonGroupSeparator:Ri,ButtonGroupText:zi,Calendar:Bi,Checkbox:Vi,Combobox:Hi,DatePicker:Ui,Field:Wi,FieldContent:Gi,FieldDescription:Ki,FieldError:qi,FieldGroup:Ji,FieldLabel:Xi,FieldLegend:Zi,FieldSeparator:Qi,FieldSet:$i,Input:_t,InputGroup:ea,InputGroupAddon:ta,InputGroupButton:na,InputGroupInput:ra,InputOTP:ia,InputOTPGroup:aa,InputOTPSeparator:oa,InputOTPSlot:sa,Label:Yi,NativeSelect:ca,NativeSelectOptGroup:la,NativeSelectOption:ua,RadioGroup:da,RadioGroupItem:fa,Select:pa,SelectContent:ma,SelectGroup:ha,SelectItem:ga,SelectLabel:_a,SelectSeparator:va,SelectTrigger:ya,SelectValue:ba,Slider:xa,Switch:Sa,Textarea:Ca,Toggle:wa,ToggleGroup:Oa,ToggleGroupItem:ka},get getElm(){var e=g.isConnected?olum.vdom.mkStaging(g):g;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <header class="mb-10">
    <h1 class="font-heading text-3xl font-semibold tracking-tight text-foreground">Forms</h1>
    <p class="mt-1 text-muted-foreground">Every form-category component from the olum-ui registry, live.</p>
  </header>

  <section class="mb-16">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Composed profile form</h2>
    <p class="mb-4 text-sm text-muted-foreground">Field, FieldGroup, FieldSet, and Label wrapping Input, Textarea, NativeSelect, RadioGroup, Switch, and Checkbox.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="FieldGroup" data-o-props='${encodeURIComponent(JSON.stringify({class:`max-w-lg`})).replace(/'/g,`%27`)}'>
        <olum name="Field">
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-name`})).replace(/'/g,`%27`)}'>Name</olum>
            <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-name`,placeholder:`Ada Lovelace`,value:n.name})).replace(/'/g,`%27`)}' data-o-props-src="value:state:name|oninput:method:onNameInput" data-o-props-owner='${t}'></olum>
            <olum name="FieldDescription">Shown on your public profile.</olum>
          </olum>
        </olum>

        <olum name="Field">
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-email`})).replace(/'/g,`%27`)}'>Email</olum>
            <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-email`,type:`email`,placeholder:`ada@example.com`,value:n.email})).replace(/'/g,`%27`)}' data-o-props-src="value:state:email|oninput:method:onEmailInput" data-o-props-owner='${t}'></olum>
          </olum>
        </olum>

        <olum name="Field">
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-bio`})).replace(/'/g,`%27`)}'>Bio</olum>
            <olum name="Textarea" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-bio`,rows:`3`,placeholder:`A few words about you`,value:n.bio})).replace(/'/g,`%27`)}' data-o-props-src="value:state:bio|oninput:method:onBioInput" data-o-props-owner='${t}'></olum>
          </olum>
        </olum>

        <olum name="Field">
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-country`})).replace(/'/g,`%27`)}'>Country</olum>
            <olum name="NativeSelect" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-country`})).replace(/'/g,`%27`)}' data-o-props-src="onchange:method:onCountryChange" data-o-props-owner='${t}'>
              <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:``})).replace(/'/g,`%27`)}'>Select a country…</olum>
              <olum name="NativeSelectOptGroup" data-o-props='${encodeURIComponent(JSON.stringify({label:`Popular`})).replace(/'/g,`%27`)}'>
                <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:`us`})).replace(/'/g,`%27`)}'>United States</olum>
                <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:`eg`})).replace(/'/g,`%27`)}'>Egypt</olum>
                <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:`de`})).replace(/'/g,`%27`)}'>Germany</olum>
              </olum>
              <olum name="NativeSelectOptGroup" data-o-props='${encodeURIComponent(JSON.stringify({label:`Other`})).replace(/'/g,`%27`)}'>
                <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:`jp`})).replace(/'/g,`%27`)}'>Japan</olum>
                <olum name="NativeSelectOption" data-o-props='${encodeURIComponent(JSON.stringify({value:`br`})).replace(/'/g,`%27`)}'>Brazil</olum>
              </olum>
            </olum>
            <olum name="FieldDescription">You picked: ${olum.esc(n.country||`nothing yet`)}</olum>
          </olum>
        </olum>

        <olum name="FieldSeparator">Plan</olum>

        <olum name="FieldSet">
          <olum name="FieldLegend" data-o-props='${encodeURIComponent(JSON.stringify({variant:`label`})).replace(/'/g,`%27`)}'>Choose a plan</olum>
          <olum name="RadioGroup">
            <div class="flex items-center gap-2">
              <olum name="RadioGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({id:`plan-free`,name:`plan`,value:`free`,defaultChecked:n.plan===`free`})).replace(/'/g,`%27`)}' data-o-props-src="onCheckedChange:method:onPlanChange" data-o-props-owner='${t}'></olum>
              <olum name="Label" data-o-props='${encodeURIComponent(JSON.stringify({for:`plan-free`})).replace(/'/g,`%27`)}'>Free</olum>
            </div>
            <div class="flex items-center gap-2">
              <olum name="RadioGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({id:`plan-pro`,name:`plan`,value:`pro`,defaultChecked:n.plan===`pro`})).replace(/'/g,`%27`)}' data-o-props-src="onCheckedChange:method:onPlanChange" data-o-props-owner='${t}'></olum>
              <olum name="Label" data-o-props='${encodeURIComponent(JSON.stringify({for:`plan-pro`})).replace(/'/g,`%27`)}'>Pro</olum>
            </div>
            <div class="flex items-center gap-2">
              <olum name="RadioGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({id:`plan-ent`,name:`plan`,value:`enterprise`,defaultChecked:n.plan===`enterprise`})).replace(/'/g,`%27`)}' data-o-props-src="onCheckedChange:method:onPlanChange" data-o-props-owner='${t}'></olum>
              <olum name="Label" data-o-props='${encodeURIComponent(JSON.stringify({for:`plan-ent`})).replace(/'/g,`%27`)}'>Enterprise</olum>
            </div>
          </olum>
        </olum>

        <olum name="Field" data-o-props='${encodeURIComponent(JSON.stringify({orientation:`horizontal`})).replace(/'/g,`%27`)}'>
          <olum name="Switch" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-notify`,defaultChecked:n.notify})).replace(/'/g,`%27`)}' data-o-props-src="defaultChecked:state:notify|onCheckedChange:method:onNotifyChange" data-o-props-owner='${t}'></olum>
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-notify`})).replace(/'/g,`%27`)}'>Email notifications</olum>
            <olum name="FieldDescription">Currently ${olum.esc(n.notify?`on`:`off`)}.</olum>
          </olum>
        </olum>

        <olum name="Field" data-o-props='${encodeURIComponent(JSON.stringify({orientation:`horizontal`})).replace(/'/g,`%27`)}'>
          <olum name="Checkbox" data-o-props='${encodeURIComponent(JSON.stringify({id:`pf-terms`,defaultChecked:n.terms,invalid:n.termsError})).replace(/'/g,`%27`)}' data-o-props-src="defaultChecked:state:terms|invalid:state:termsError|onCheckedChange:method:onTermsChange" data-o-props-owner='${t}'></olum>
          <olum name="FieldContent">
            <olum name="FieldLabel" data-o-props='${encodeURIComponent(JSON.stringify({for:`pf-terms`})).replace(/'/g,`%27`)}'>I agree to the terms</olum>
            ${n.termsError?`
              <olum name="FieldError" if='${JSON.stringify(!!n.termsError)}'>You must accept the terms to continue.</olum>
            `:``}
          </olum>
        </olum>

        <div class="flex items-center gap-3">
          <olum name="Button" data-o-props-src="onclick:method:submitForm" data-o-props-owner='${t}'>Submit</olum>
          ${n.submitted?`
            <span class="text-sm text-primary">Submitted ✓</span>
          `:``}
        </div>
      </olum>

      <pre class="mt-6 max-w-lg overflow-x-auto rounded-lg bg-muted p-3 text-xs text-muted-foreground">${olum.esc(JSON.stringify(n,null,2))}</pre>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Button Group</h2>
    <p class="mb-4 text-sm text-muted-foreground">Joins related buttons or a text/input/button split control.</p>
    <div class="flex flex-col gap-4 rounded-xl border border-border p-6">
      <olum name="ButtonGroup">
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Bold</olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Italic</olum>
        <olum name="ButtonGroupSeparator"></olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Underline</olum>
      </olum>
      <olum name="ButtonGroup" data-o-props='${encodeURIComponent(JSON.stringify({class:`max-w-xs`})).replace(/'/g,`%27`)}'>
        <olum name="ButtonGroupText">https://</olum>
        <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`yoursite.com`})).replace(/'/g,`%27`)}'></olum>
        <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`})).replace(/'/g,`%27`)}'>Go</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Calendar & Date Picker</h2>
    <p class="mb-4 text-sm text-muted-foreground">A month grid, and the popover trigger built on top of it.</p>
    <div class="flex flex-wrap items-start gap-8 rounded-xl border border-border p-6">
      <olum name="Calendar"></olum>
      <olum name="DatePicker" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`Pick a date`})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Combobox</h2>
    <p class="mb-4 text-sm text-muted-foreground">Filterable text field over a list of options.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Combobox" data-o-props='${encodeURIComponent(JSON.stringify({items:h,placeholder:`Search fruit…`,showClear:!0})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Input Group & OTP</h2>
    <p class="mb-4 text-sm text-muted-foreground">Addon-decorated inputs, and one-time-code slots.</p>
    <div class="flex flex-col gap-6 rounded-xl border border-border p-6">
      <olum name="InputGroup" data-o-props='${encodeURIComponent(JSON.stringify({class:`max-w-xs`})).replace(/'/g,`%27`)}'>
        <olum name="InputGroupAddon">
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Aa,class:`size-4`})).replace(/'/g,`%27`)}'></olum>
        </olum>
        <olum name="InputGroupInput" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`Search…`,value:d.searchQuery})).replace(/'/g,`%27`)}' data-o-props-src="oninput:method:onSearchInput" data-o-props-owner='${t}'></olum>
        ${d.searchQuery?`
          <olum name="InputGroupAddon" data-o-props='${encodeURIComponent(JSON.stringify({align:`inline-end`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!d.searchQuery)}'>
            <!-- InputGroupButton doesn't forward onclick to its inner Button (read the
                 source — it only forwards type/variant/value/ariaLabel), so the actual
                 clear behavior is wired on a plain Button styled to match instead. -->
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`ghost`,size:`icon-xs`,ariaLabel:`Clear`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:clearSearch" data-o-props-owner='${t}' if='${JSON.stringify(!!d.searchQuery)}'>
              <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:gi,class:`size-4`})).replace(/'/g,`%27`)}' if='${JSON.stringify(!!d.searchQuery)}'></olum>
            </olum>
          </olum>
        `:``}
      </olum>

      <olum name="InputGroup" data-o-props='${encodeURIComponent(JSON.stringify({class:`max-w-xs`})).replace(/'/g,`%27`)}'>
        <olum name="InputGroupAddon">
          <olum name="InputGroupText">Qty</olum>
        </olum>
        <olum name="InputGroupInput" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`1`})).replace(/'/g,`%27`)}'></olum>
        <olum name="InputGroupAddon" data-o-props='${encodeURIComponent(JSON.stringify({align:`inline-end`})).replace(/'/g,`%27`)}'>
          <olum name="InputGroupButton">Update</olum>
        </olum>
      </olum>

      <div>
        <olum name="InputOTP">
          <olum name="InputOTPGroup">
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:0})).replace(/'/g,`%27`)}'></olum>
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:1})).replace(/'/g,`%27`)}'></olum>
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:2})).replace(/'/g,`%27`)}'></olum>
          </olum>
          <olum name="InputOTPSeparator"></olum>
          <olum name="InputOTPGroup">
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:3})).replace(/'/g,`%27`)}'></olum>
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:4})).replace(/'/g,`%27`)}'></olum>
            <olum name="InputOTPSlot" data-o-props='${encodeURIComponent(JSON.stringify({index:5})).replace(/'/g,`%27`)}'></olum>
          </olum>
        </olum>
        <p class="mt-2 text-xs text-muted-foreground">Type digits — auto-advances, backspace steps back, paste is supported.</p>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Select</h2>
    <p class="mb-4 text-sm text-muted-foreground">A custom dropdown, composed from Trigger/Content/Item.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Select" data-o-props='${encodeURIComponent(JSON.stringify({defaultValue:`olum`})).replace(/'/g,`%27`)}' data-o-props-src="onValueChange:method:onFrameworkChange" data-o-props-owner='${t}'>
        <olum name="SelectTrigger" data-o-props='${encodeURIComponent(JSON.stringify({class:`w-56`})).replace(/'/g,`%27`)}'>
          <olum name="SelectValue" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`Pick a framework`})).replace(/'/g,`%27`)}'></olum>
        </olum>
        <olum name="SelectContent">
          <olum name="SelectGroup">
            <olum name="SelectLabel">Frameworks</olum>
            <olum name="SelectItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`olum`})).replace(/'/g,`%27`)}'>Olum</olum>
            <olum name="SelectItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`vue`})).replace(/'/g,`%27`)}'>Vue</olum>
            <olum name="SelectItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`react`})).replace(/'/g,`%27`)}'>React</olum>
          </olum>
          <olum name="SelectSeparator"></olum>
          <olum name="SelectItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`svelte`})).replace(/'/g,`%27`)}'>Svelte</olum>
        </olum>
      </olum>
      <p class="mt-2 text-sm text-muted-foreground">Selected: ${olum.esc(d.framework)}</p>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Slider</h2>
    <p class="mb-4 text-sm text-muted-foreground">Single-thumb and two-thumb range variants.</p>
    <div class="flex max-w-sm flex-col gap-8 rounded-xl border border-border p-6">
      <olum name="Slider" data-o-props='${encodeURIComponent(JSON.stringify({defaultValue:[40]})).replace(/'/g,`%27`)}'></olum>
      <olum name="Slider" data-o-props='${encodeURIComponent(JSON.stringify({defaultValue:[20,80]})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Toggle & Toggle Group</h2>
    <p class="mb-4 text-sm text-muted-foreground">A single pressable toggle, and single/multi-select groups sharing state via toggleGroupStore.</p>
    <div class="flex flex-wrap items-center gap-6 rounded-xl border border-border p-6">
      <olum name="Toggle" data-o-props='${encodeURIComponent(JSON.stringify({ariaLabel:`Bold`})).replace(/'/g,`%27`)}'>B</olum>
      <olum name="ToggleGroup">
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`left`})).replace(/'/g,`%27`)}'>Left</olum>
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`center`})).replace(/'/g,`%27`)}'>Center</olum>
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`right`})).replace(/'/g,`%27`)}'>Right</olum>
      </olum>
      <olum name="ToggleGroup" data-o-props='${encodeURIComponent(JSON.stringify({multiple:!0})).replace(/'/g,`%27`)}'>
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`bold`})).replace(/'/g,`%27`)}'>B</olum>
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`italic`})).replace(/'/g,`%27`)}'>I</olum>
        <olum name="ToggleGroupItem" data-o-props='${encodeURIComponent(JSON.stringify({value:`underline`})).replace(/'/g,`%27`)}'>U</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Label</h2>
    <p class="mb-4 text-sm text-muted-foreground">Bare pairing outside of Field — clicking the text focuses the input.</p>
    <div class="flex max-w-xs flex-col gap-1.5 rounded-xl border border-border p-6">
      <olum name="Label" data-o-props='${encodeURIComponent(JSON.stringify({for:`newsletter`})).replace(/'/g,`%27`)}'>Newsletter email</olum>
      <olum name="Input" data-o-props='${encodeURIComponent(JSON.stringify({id:`newsletter`,type:`email`,placeholder:`you@example.com`})).replace(/'/g,`%27`)}'></olum>
    </div>
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,v.__style__()),olum.handleMarkup(`page`,`wqwesi4yn4`,e,_)}};return n.__olum__={compName:t,compId:`wqwesi4yn4`},n=olum.proxyHandler(n,null,g),{methods:v.methods,props:v.props,__OLUM__:v,el:g,methodsRef:_,stateProps:n,localsRef:{get gallery(){return d},get fruits(){return h}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ma=e=>{let t=e||`AspectRatio`,n=l(t),{ratio:r=1,class:i=``,children:a}=l(t),o=()=>q(`relative`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`AspectRatio`,`st072ph241`),c={ratio:n.ratio===void 0?1:n.ratio,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`AspectRatio`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div class="${olum.esc(o())}" style="aspect-ratio: ${olum.esc(n.ratio===void 0?1:n.ratio)};">${n.children}</div>`,olum.injectStyle(`AspectRatio`,u.__style__()),olum.handleMarkup(`AspectRatio`,`st072ph241`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Na=e=>{let t=e||`CardAction`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`col-start-2 row-span-2 row-start-1 self-start justify-self-end`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CardAction`,`yh0vzvc9i`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CardAction`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="card-action" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CardAction`,c.__style__()),olum.handleMarkup(`CardAction`,`yh0vzvc9i`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Pa=e=>{let t=e||`ResizablePanelGroup`,n=l(t),{orientation:r=`horizontal`,class:i=``,children:a}=l(t),o=()=>q(`group/resizable flex h-full w-full [&>[data-olum]]:contents`,(n.orientation===void 0?`horizontal`:n.orientation)===`vertical`?`flex-col`:``,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ResizablePanelGroup`,`hg5p1vf9wm`),c={orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ResizablePanelGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="resizable-panel-group" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`ResizablePanelGroup`,u.__style__()),olum.handleMarkup(`ResizablePanelGroup`,`hg5p1vf9wm`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Fa=e=>{let t=e||`ResizablePanel`,n=l(t),{defaultSize:r=50,class:i=``,children:a}=l(t),o=()=>q(`min-w-0 min-h-0 overflow-hidden`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`ResizablePanel`,`aail85emkzv`),c={defaultSize:n.defaultSize===void 0?50:n.defaultSize,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`ResizablePanel`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="resizable-panel" style="flex:${olum.esc(n.defaultSize===void 0?50:n.defaultSize)} 1 0px;" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`ResizablePanel`,u.__style__()),olum.handleMarkup(`ResizablePanel`,`aail85emkzv`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ia=e=>{let t=e||`ResizableHandle`,n=l(t),{withHandle:r=!1,class:i=``}=l(t);var a=o(()=>{let e=u.querySelector(`[data-slot="resizable-handle"]`),t=u.closest(`[data-slot="resizable-panel-group"]`);if(!e||!t)return;let n=n=>{let r=t.dataset.orientation===`vertical`,i=Array.from(t.querySelectorAll(`[data-slot="resizable-handle"]`)),a=Array.from(t.querySelectorAll(`[data-slot="resizable-panel"]`)),o=i.indexOf(e),s=a[o],c=a[o+1];if(!s||!c)return;let l=t.getBoundingClientRect(),u=r?l.height:l.width,d=r?n.clientY:n.clientX,f=parseFloat(s.style.flexGrow||`50`),p=parseFloat(c.style.flexGrow||`50`),m=f+p,h=e=>{let t=((r?e.clientY:e.clientX)-d)/u*(f+p+(100-m)),n=Math.min(Math.max(f+t,m*.1),m*.9);s.style.flex=`${n} 1 0px`,c.style.flex=`${m-n} 1 0px`},g=()=>{document.removeEventListener(`pointermove`,h),document.removeEventListener(`pointerup`,g)};document.addEventListener(`pointermove`,h),document.addEventListener(`pointerup`,g),n.preventDefault()};return e.addEventListener(`pointerdown`,n),()=>e.removeEventListener(`pointerdown`,n)});let s=()=>q(`relative flex w-px shrink-0 cursor-col-resize touch-none items-center justify-center bg-border select-none after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring group-data-[orientation=vertical]/resizable:h-px group-data-[orientation=vertical]/resizable:w-full group-data-[orientation=vertical]/resizable:cursor-row-resize group-data-[orientation=vertical]/resizable:after:inset-x-0 group-data-[orientation=vertical]/resizable:after:left-0 group-data-[orientation=vertical]/resizable:after:top-1/2 group-data-[orientation=vertical]/resizable:after:h-1 group-data-[orientation=vertical]/resizable:after:w-full group-data-[orientation=vertical]/resizable:after:-translate-y-1/2 group-data-[orientation=vertical]/resizable:after:translate-x-0`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`ResizableHandle`,`gauflyvr11b`),u=c,d={withHandle:n.withHandle!==void 0&&n.withHandle,className:n.class===void 0?``:n.class,classes:s},f={__style__(){return``},methods:{},props:{},compName:`ResizableHandle`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="resizable-handle" role="separator" class="${olum.esc(s())}">
  ${n.withHandle!==void 0&&n.withHandle?`
    <div class="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border group-data-[orientation=vertical]/resizable:h-1 group-data-[orientation=vertical]/resizable:w-6"></div>
  `:``}
</div>`,olum.injectStyle(`ResizableHandle`,f.__style__()),olum.handleMarkup(`ResizableHandle`,`gauflyvr11b`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},La=e=>{let t=e||`ScrollArea`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`relative`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`ScrollArea`,`zln868tduy`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`ScrollArea`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="scroll-area" class="${olum.esc(a())}">
  <div data-slot="scroll-area-viewport" class="size-full overflow-auto rounded-[inherit] outline-none [scrollbar-width:thin] [scrollbar-color:var(--olum-border)_transparent] focus-visible:ring-3 focus-visible:ring-ring/50">${n.children}</div>
</div>`,olum.injectStyle(`ScrollArea`,c.__style__()),olum.handleMarkup(`ScrollArea`,`zln868tduy`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ra=e=>{let t=e||`Direction`,n=l(t),{direction:r=`ltr`,children:i}=l(t);var a=olum.mkElm(`div`,`Direction`,`sgyko9erkcs`),o={direction:n.direction===void 0?`ltr`:n.direction,children:n.children},s={__style__(){return``},methods:{},props:{},compName:`Direction`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="direction-provider" dir="${olum.esc(n.direction===void 0?`ltr`:n.direction)}" class="contents">${n.children}</div>`,olum.injectStyle(`Direction`,s.__style__()),olum.handleMarkup(`Direction`,`sgyko9erkcs`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},za=e=>{let t=e||`SidebarProvider`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/sidebar-wrapper relative flex min-h-svh w-full [--sidebar-width:16rem] [--sidebar-width-icon:3rem] [&>[data-olum]]:contents`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarProvider`,`vkjrxej18m`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarProvider`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-wrapper" data-state="expanded" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarProvider`,c.__style__()),olum.handleMarkup(`SidebarProvider`,`vkjrxej18m`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ba=e=>{let t=e||`Sidebar`,n=l(t),{side:r=`left`,collapsible:i=`icon`,class:a=``,children:o}=l(t),s=()=>q(`absolute inset-y-0 left-0 z-10 flex h-full w-(--sidebar-width) flex-col border-r border-border bg-background text-foreground transition-[width] duration-200 ease-linear group-data-[state=collapsed]/sidebar-wrapper:w-(--sidebar-width-icon)`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Sidebar`,`adaxf9d1bei`),u={side:n.side===void 0?`left`:n.side,collapsible:n.collapsible===void 0?`icon`:n.collapsible,className:n.class===void 0?``:n.class,children:n.children,classes:s},d={__style__(){return``},methods:{},props:{},compName:`Sidebar`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="sidebar-gap" class="relative w-(--sidebar-width) shrink-0 bg-transparent transition-[width] duration-200 ease-linear group-data-[state=collapsed]/sidebar-wrapper:w-(--sidebar-width-icon)"></div>
<div data-slot="sidebar" data-side="${olum.esc(n.side===void 0?`left`:n.side)}" data-collapsible="${olum.esc(n.collapsible===void 0?`icon`:n.collapsible)}" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`Sidebar`,d.__style__()),olum.handleMarkup(`Sidebar`,`adaxf9d1bei`,e,u)}};return{methods:d.methods,props:d.props,__OLUM__:d,el:c,methodsRef:u,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Va=e=>{let t=e||`SidebarHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-2 p-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarHeader`,`mr3cckj38c`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarHeader`,c.__style__()),olum.handleMarkup(`SidebarHeader`,`mr3cckj38c`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ha=e=>{let t=e||`SidebarContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex min-h-0 flex-1 flex-col gap-0 overflow-auto [scrollbar-width:none] group-data-[state=collapsed]/sidebar-wrapper:overflow-hidden`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarContent`,`9ggenjsvdta`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarContent`,c.__style__()),olum.handleMarkup(`SidebarContent`,`9ggenjsvdta`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ua=e=>{let t=e||`SidebarFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-2 p-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarFooter`,`7lcdlqcoth2`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarFooter`,c.__style__()),olum.handleMarkup(`SidebarFooter`,`7lcdlqcoth2`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Wa=e=>{let t=e||`SidebarGroup`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`relative flex w-full min-w-0 flex-col p-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarGroup`,`eba30j4wx4b`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarGroup`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-group" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarGroup`,c.__style__()),olum.handleMarkup(`SidebarGroup`,`eba30j4wx4b`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ga=e=>{let t=e||`SidebarGroupLabel`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-foreground/70 outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[state=collapsed]/sidebar-wrapper:-mt-8 group-data-[state=collapsed]/sidebar-wrapper:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarGroupLabel`,`4tbj9aur5i`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarGroupLabel`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-group-label" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarGroupLabel`,c.__style__()),olum.handleMarkup(`SidebarGroupLabel`,`4tbj9aur5i`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ka=e=>{let t=e||`SidebarGroupContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`w-full text-sm`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarGroupContent`,`se10uj84fw8`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarGroupContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-group-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarGroupContent`,c.__style__()),olum.handleMarkup(`SidebarGroupContent`,`se10uj84fw8`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qa=e=>{let t=e||`SidebarMenu`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex w-full min-w-0 flex-col gap-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarMenu`,`0suae4772nqa`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarMenu`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-menu" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarMenu`,c.__style__()),olum.handleMarkup(`SidebarMenu`,`0suae4772nqa`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ja=e=>{let t=e||`SidebarMenuItem`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/menu-item relative`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarMenuItem`,`86vl7joou6t`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarMenuItem`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sidebar-menu-item" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SidebarMenuItem`,c.__style__()),olum.handleMarkup(`SidebarMenuItem`,`86vl7joou6t`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ya=e=>{let t=e||`SidebarMenuButton`,n=l(t),{isActive:r=!1,tooltip:i,onclick:a,class:o=``,children:s}=l(t),c=e=>n.onclick&&n.onclick(e),u=()=>q(`peer/menu-button flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 active:bg-muted disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-muted data-[active=true]:font-medium group-data-[state=collapsed]/sidebar-wrapper:size-8! group-data-[state=collapsed]/sidebar-wrapper:p-2! [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate`,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`SidebarMenuButton`,`uunwr47qwo8`),f={isActive:n.isActive!==void 0&&n.isActive,tooltip:n.tooltip,onclick:n.onclick,className:n.class===void 0?``:n.class,children:n.children,handleClick:c,classes:u},p={__style__(){return``},methods:{},props:{},compName:`SidebarMenuButton`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <button type="button" data-slot="sidebar-menu-button" data-active="${olum.esc(n.isActive!==void 0&&n.isActive)}" title="${olum.esc(n.tooltip)}" class="${olum.esc(u())}" data-o-event='onclick|handleClick=${JSON.stringify([])}'>${n.children}</button>`,olum.injectStyle(`SidebarMenuButton`,p.__style__()),olum.handleMarkup(`SidebarMenuButton`,`uunwr47qwo8`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xa=e=>{let t=e||`SidebarSeparator`,n=l(t),{class:r=``}=l(t),i=()=>q(`mx-2 h-px w-auto shrink-0 bg-border`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`SidebarSeparator`,`aoscdej8mgi`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`SidebarSeparator`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="sidebar-separator" class="${olum.esc(i())}"></div>`,olum.injectStyle(`SidebarSeparator`,s.__style__()),olum.handleMarkup(`SidebarSeparator`,`aoscdej8mgi`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Za=e=>{let t=e||`SidebarInset`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`relative flex h-full w-full flex-1 flex-col bg-background`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarInset`,`k4kfj47q7k`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SidebarInset`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <main data-slot="sidebar-inset" class="${olum.esc(a())}">${n.children}</main>`,olum.injectStyle(`SidebarInset`,c.__style__()),olum.handleMarkup(`SidebarInset`,`k4kfj47q7k`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qa=e=>{let t=e||`SidebarTrigger`,n=l(t),{class:r=``}=l(t),i=()=>{let e=s.closest(`[data-slot="sidebar-wrapper"]`);e&&e.setAttribute(`data-state`,e.getAttribute(`data-state`)===`collapsed`?`expanded`:`collapsed`)},a=()=>q(`inline-flex size-7 shrink-0 items-center justify-center rounded-[min(var(--radius-md),12px)] border border-transparent text-foreground transition-all outline-none select-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SidebarTrigger`,`nu23ni98s7`),s=o,c={className:n.class===void 0?``:n.class,toggle:i,classes:a},u={__style__(){return``},methods:{},props:{},compName:`SidebarTrigger`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <button type="button" data-slot="sidebar-trigger" class="${olum.esc(a())}" data-o-event='onclick|toggle=${JSON.stringify([])}'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path></svg>
  <span class="sr-only">Toggle Sidebar</span>
</button>`,olum.injectStyle(`SidebarTrigger`,u.__style__()),olum.handleMarkup(`SidebarTrigger`,`nu23ni98s7`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:o,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$a=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>`,eo=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/></svg>`,to=e=>{let t=e||`page`;var n={rtl:!1};let r=()=>n.rtl=!n.rtl,i=Array.from({length:20},(e,t)=>`Row ${t+1} — scrollable content inside a fixed-height ScrollArea.`);var a=olum.mkElm(`div`,`page`,`klfz0ti3c8`),o={toggleRtl:r},s={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,AspectRatio:Ma,Card:Ot,CardHeader:kt,CardTitle:At,CardDescription:jt,CardAction:Na,CardContent:Cn,CardFooter:sn,Button:J,ResizablePanelGroup:Pa,ResizablePanel:Fa,ResizableHandle:Ia,ScrollArea:La,Separator:Xr,Direction:Ra,SidebarProvider:za,Sidebar:Ba,SidebarHeader:Va,SidebarContent:Ha,SidebarFooter:Ua,SidebarGroup:Wa,SidebarGroupLabel:Ga,SidebarGroupContent:Ka,SidebarMenu:qa,SidebarMenuItem:Ja,SidebarMenuButton:Ya,SidebarSeparator:Xa,SidebarInset:Za,SidebarTrigger:Qa,Icon:Y},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <h1 class="mb-8 font-heading text-2xl font-semibold text-foreground">UI Kit — Layout</h1>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Aspect Ratio</h2>
    <p class="mb-4 text-sm text-muted-foreground">Holds its child at a fixed width-to-height ratio.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="max-w-xs">
        <olum name="AspectRatio" data-o-props='${encodeURIComponent(JSON.stringify({ratio:16/9,class:`overflow-hidden rounded-lg bg-muted`})).replace(/'/g,`%27`)}'>
          <div class="flex h-full w-full items-center justify-center text-sm text-muted-foreground">16 / 9</div>
        </olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Card (with CardAction)</h2>
    <p class="mb-4 text-sm text-muted-foreground">The corner action slot, alongside header/content/footer.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Card" data-o-props='${encodeURIComponent(JSON.stringify({class:`max-w-sm`})).replace(/'/g,`%27`)}'>
        <olum name="CardHeader">
          <olum name="CardTitle">Deploy target</olum>
          <olum name="CardDescription">Production · us-east-1</olum>
          <olum name="CardAction">
            <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:eo,class:`size-4 text-muted-foreground`})).replace(/'/g,`%27`)}'></olum>
          </olum>
        </olum>
        <olum name="CardContent">
          <p class="text-sm text-muted-foreground">Last deploy succeeded 3 minutes ago.</p>
        </olum>
        <olum name="CardFooter">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,variant:`outline`})).replace(/'/g,`%27`)}'>View logs</olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Resizable</h2>
    <p class="mb-4 text-sm text-muted-foreground">Drag the handle to redistribute space between panels.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="ResizablePanelGroup" data-o-props='${encodeURIComponent(JSON.stringify({orientation:`horizontal`,class:`h-48 rounded-lg border border-border`})).replace(/'/g,`%27`)}'>
        <olum name="ResizablePanel" data-o-props='${encodeURIComponent(JSON.stringify({defaultSize:35,class:`flex items-center justify-center bg-muted/40 text-sm text-muted-foreground`})).replace(/'/g,`%27`)}'>Panel A</olum>
        <olum name="ResizableHandle" data-o-props='${encodeURIComponent(JSON.stringify({withHandle:!0})).replace(/'/g,`%27`)}'></olum>
        <olum name="ResizablePanel" data-o-props='${encodeURIComponent(JSON.stringify({defaultSize:65,class:`flex items-center justify-center bg-muted/20 text-sm text-muted-foreground`})).replace(/'/g,`%27`)}'>Panel B</olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Scroll Area</h2>
    <p class="mb-4 text-sm text-muted-foreground">Scrolls its overflow behind a styled scrollbar, inside a fixed footprint.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="ScrollArea" data-o-props='${encodeURIComponent(JSON.stringify({class:`h-48 w-full max-w-sm rounded-lg border border-border`})).replace(/'/g,`%27`)}'>
        <div class="flex flex-col gap-2 p-3">
          ${i.map(function(e){return`
            <div class="rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground" key="${olum.esc(e)}">${olum.esc(e)}</div>
          `}).join(``)}
        </div>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Separator</h2>
    <p class="mb-4 text-sm text-muted-foreground">A one-pixel rule, horizontal or vertical.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="text-sm text-foreground">Above</div>
      <olum name="Separator" data-o-props='${encodeURIComponent(JSON.stringify({class:`my-3`})).replace(/'/g,`%27`)}'></olum>
      <div class="text-sm text-foreground">Below</div>
      <div class="mt-4 flex h-6 items-center gap-3 text-sm text-foreground">
        <span>Left</span>
        <olum name="Separator" data-o-props='${encodeURIComponent(JSON.stringify({orientation:`vertical`})).replace(/'/g,`%27`)}'></olum>
        <span>Right</span>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Direction</h2>
    <p class="mb-4 text-sm text-muted-foreground">Flips a subtree between left-to-right and right-to-left.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`,variant:`outline`,class:`mb-4`})).replace(/'/g,`%27`)}' data-o-props-src="onclick:method:toggleRtl" data-o-props-owner='${t}'>Toggle direction</olum>
      <olum name="Direction" data-o-props='${encodeURIComponent(JSON.stringify({direction:n.rtl?`rtl`:`ltr`})).replace(/'/g,`%27`)}'>
        <div class="flex items-center gap-3 rounded-lg border border-border p-4">
          <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Pi,class:`size-4 text-primary`})).replace(/'/g,`%27`)}'></olum>
          <span class="text-sm text-foreground">Inbox</span>
          <span class="text-sm text-muted-foreground">— reads ${olum.esc(n.rtl?`right-to-left`:`left-to-right`)}</span>
        </div>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Sidebar</h2>
    <p class="mb-4 text-sm text-muted-foreground">A collapsible app-shell sidebar with grouped menu sections. Click the trigger to collapse it to an icon rail.</p>
    <div class="overflow-hidden rounded-xl border border-border" style="height: 22rem;">
      <olum name="SidebarProvider" data-o-props='${encodeURIComponent(JSON.stringify({class:`h-full`})).replace(/'/g,`%27`)}'>
        <olum name="Sidebar">
          <olum name="SidebarHeader">
            <div class="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-foreground">
              <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Pi,class:`size-4 text-primary`})).replace(/'/g,`%27`)}'></olum>
              <span>Playground</span>
            </div>
          </olum>
          <olum name="SidebarContent">
            <olum name="SidebarGroup">
              <olum name="SidebarGroupLabel">Workspace</olum>
              <olum name="SidebarGroupContent">
                <olum name="SidebarMenu">
                  <olum name="SidebarMenuItem">
                    <olum name="SidebarMenuButton" data-o-props='${encodeURIComponent(JSON.stringify({isActive:!0,tooltip:`Inbox`})).replace(/'/g,`%27`)}'>
                      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Pi,class:`size-4`})).replace(/'/g,`%27`)}'></olum>
                      <span>Inbox</span>
                    </olum>
                  </olum>
                  <olum name="SidebarMenuItem">
                    <olum name="SidebarMenuButton" data-o-props='${encodeURIComponent(JSON.stringify({tooltip:`Documents`})).replace(/'/g,`%27`)}'>
                      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:pi,class:`size-4`})).replace(/'/g,`%27`)}'></olum>
                      <span>Documents</span>
                    </olum>
                  </olum>
                </olum>
              </olum>
            </olum>
            <olum name="SidebarSeparator"></olum>
            <olum name="SidebarGroup">
              <olum name="SidebarGroupLabel">Preferences</olum>
              <olum name="SidebarGroupContent">
                <olum name="SidebarMenu">
                  <olum name="SidebarMenuItem">
                    <olum name="SidebarMenuButton" data-o-props='${encodeURIComponent(JSON.stringify({tooltip:`Settings`})).replace(/'/g,`%27`)}'>
                      <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$a,class:`size-4`})).replace(/'/g,`%27`)}'></olum>
                      <span>Settings</span>
                    </olum>
                  </olum>
                </olum>
              </olum>
            </olum>
          </olum>
          <olum name="SidebarFooter">
            <div class="px-2 py-1 text-xs text-muted-foreground">v0.9.1</div>
          </olum>
        </olum>
        <olum name="SidebarInset">
          <div class="flex items-center gap-2 border-b border-border p-3">
            <olum name="SidebarTrigger"></olum>
            <span class="text-sm font-medium text-foreground">App content</span>
          </div>
          <div class="p-4 text-sm text-muted-foreground">The trigger toggles a <code class="rounded bg-muted px-1 py-0.5 text-xs">data-state</code> attribute on the wrapper imperatively — no store involved.</div>
        </olum>
      </olum>
    </div>
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,s.__style__()),olum.handleMarkup(`page`,`klfz0ti3c8`,e,o)}};return n.__olum__={compName:t,compId:`klfz0ti3c8`},n=olum.proxyHandler(n,null,a),{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:n,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},no=e=>{let t=e||`Breadcrumb`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Breadcrumb`,`kilgcex8o5t`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Breadcrumb`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <nav aria-label="breadcrumb" data-slot="breadcrumb" class="${olum.esc(a())}">${n.children}</nav>`,olum.injectStyle(`Breadcrumb`,c.__style__()),olum.handleMarkup(`Breadcrumb`,`kilgcex8o5t`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ro=e=>{let t=e||`BreadcrumbList`,n=l(t),{class:r=``,children:i}=l(t),a=`flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground`,o=()=>q(a,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`BreadcrumbList`,`wpdgev3652r`),c={className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`BreadcrumbList`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <ol data-slot="breadcrumb-list" class="${olum.esc(o())}">${n.children}</ol>`,olum.injectStyle(`BreadcrumbList`,u.__style__()),olum.handleMarkup(`BreadcrumbList`,`wpdgev3652r`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{get base(){return a}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},io=e=>{let t=e||`BreadcrumbItem`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`inline-flex items-center gap-1`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`BreadcrumbItem`,`pa8qtyp5tyl`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`BreadcrumbItem`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <li data-slot="breadcrumb-item" class="${olum.esc(a())}">${n.children}</li>`,olum.injectStyle(`BreadcrumbItem`,c.__style__()),olum.handleMarkup(`BreadcrumbItem`,`pa8qtyp5tyl`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ao=e=>{let t=e||`BreadcrumbLink`,n=l(t),{href:r=`#`,class:i=``,children:a}=l(t),o=()=>q(`transition-colors hover:text-foreground`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`BreadcrumbLink`,`bx2a83462hn`),c={href:n.href===void 0?`#`:n.href,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`BreadcrumbLink`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <a data-slot="breadcrumb-link" href="${olum.esc(n.href===void 0?`#`:n.href)}" class="${olum.esc(o())}">${n.children}</a>`,olum.injectStyle(`BreadcrumbLink`,u.__style__()),olum.handleMarkup(`BreadcrumbLink`,`bx2a83462hn`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},oo=e=>{let t=e||`BreadcrumbPage`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-normal text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`BreadcrumbPage`,`0tuulgn8c76q`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`BreadcrumbPage`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`BreadcrumbPage`,c.__style__()),olum.handleMarkup(`BreadcrumbPage`,`0tuulgn8c76q`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},so=e=>{let t=e||`BreadcrumbSeparator`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`[&>svg]:size-3.5`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`BreadcrumbSeparator`,`g6p8umy0tup`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`BreadcrumbSeparator`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" class="${olum.esc(a())}">
  ${n.children?`${n.children}`:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
  `}
  
</li>`,olum.injectStyle(`BreadcrumbSeparator`,c.__style__()),olum.handleMarkup(`BreadcrumbSeparator`,`g6p8umy0tup`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},co=e=>{let t=e||`BreadcrumbEllipsis`,n=l(t),{class:r=``}=l(t),i=()=>q(`flex size-5 items-center justify-center [&>svg]:size-4`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`BreadcrumbEllipsis`,`nk5dr8589x8`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`BreadcrumbEllipsis`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" class="${olum.esc(i())}">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
  <span class="sr-only">More</span>
</span>`,olum.injectStyle(`BreadcrumbEllipsis`,s.__style__()),olum.handleMarkup(`BreadcrumbEllipsis`,`nk5dr8589x8`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},lo=e=>{let t=e||`Command`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=()=>[...u.querySelectorAll(`[data-slot="command-item"]`)].filter(e=>!e.classList.contains(`hidden`)&&!e.hasAttribute(`disabled`)),t=()=>u.querySelector(`[data-slot="command-item"][data-selected="true"]`),n=(e,n)=>{let r=t();r!==e&&(r&&r.removeAttribute(`data-selected`),e&&(e.setAttribute(`data-selected`,`true`),n&&e.scrollIntoView({block:`nearest`})))},r=()=>{let r=u.querySelector(`[data-slot="command-input"]`),i=r?r.value.trim().toLowerCase():``,a=!1;u.querySelectorAll(`[data-slot="command-item"]`).forEach(e=>{let t=!i||e.textContent.toLowerCase().includes(i);e.classList.toggle(`hidden`,!t),t&&(a=!0)}),u.querySelectorAll(`[data-slot="command-group"]`).forEach(e=>{e.classList.toggle(`hidden`,!e.querySelector(`[data-slot="command-item"]:not(.hidden)`))}),u.querySelectorAll(`[data-slot="command-separator"]`).forEach(e=>e.classList.toggle(`hidden`,!!i)),u.querySelectorAll(`[data-slot="command-empty"]`).forEach(e=>e.classList.toggle(`hidden`,a));let o=e();o.includes(t())||n(o[0],!0)},i=r=>{let i=e();if(!i.length)return;let a=i.indexOf(t()),o=a===-1?r>0?0:i.length-1:(a+r+i.length)%i.length;n(i[o],!0)},a=e=>{e.target.matches(`[data-slot="command-input"]`)&&r()},o=r=>{if(r.key===`ArrowDown`)i(1);else if(r.key===`ArrowUp`)i(-1);else if(r.key===`Home`)n(e()[0],!0);else if(r.key===`End`)n(e().at(-1),!0);else if(r.key===`Enter`){let e=t();if(!e)return;e.click()}else return;r.preventDefault()},s=e=>{let t=e.target.closest(`[data-slot="command-item"]`);t&&u.contains(t)&&!t.hasAttribute(`disabled`)&&n(t,!1)};u.addEventListener(`input`,a),u.addEventListener(`keydown`,o),u.addEventListener(`mousemove`,s);let c=setTimeout(r);return()=>{clearTimeout(c),u.removeEventListener(`input`,a),u.removeEventListener(`keydown`,o),u.removeEventListener(`mousemove`,s)}});let s=()=>q(`flex size-full flex-col overflow-hidden rounded-xl bg-background p-1 text-foreground`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`Command`,`v33hyt4zf8`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`Command`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="command" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`Command`,f.__style__()),olum.handleMarkup(`Command`,`v33hyt4zf8`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},uo=e=>{let t=e||`CommandInput`,n=l(t),{placeholder:r=``,class:i=``}=l(t),a=()=>q(`w-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CommandInput`,`qwqf3y92jg`),s={placeholder:n.placeholder===void 0?``:n.placeholder,className:n.class===void 0?``:n.class,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CommandInput`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="command-input-wrapper" class="p-1 pb-0">
  
  <div class="flex h-8 items-center gap-2 rounded-lg border border-border/40 bg-muted/50 px-2 transition-all focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
    <svg class="size-4 shrink-0 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
    <input data-slot="command-input" type="text" placeholder="${olum.esc(n.placeholder===void 0?``:n.placeholder)}" class="${olum.esc(a())}">
  </div>
</div>`,olum.injectStyle(`CommandInput`,c.__style__()),olum.handleMarkup(`CommandInput`,`qwqf3y92jg`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},fo=e=>{let t=e||`CommandList`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none [scrollbar-width:none]`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CommandList`,`xp8jtmmczqt`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CommandList`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="command-list" role="listbox" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CommandList`,c.__style__()),olum.handleMarkup(`CommandList`,`xp8jtmmczqt`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},po=e=>{let t=e||`CommandEmpty`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`hidden py-6 text-center text-sm`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CommandEmpty`,`at90gh0zvkf`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CommandEmpty`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="command-empty" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`CommandEmpty`,c.__style__()),olum.handleMarkup(`CommandEmpty`,`at90gh0zvkf`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},mo=e=>{let t=e||`CommandGroup`,n=l(t),{heading:r,class:i=``,children:a}=l(t),o=()=>q(`overflow-hidden p-1 text-foreground`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`CommandGroup`,`lhh2c35mw9e`),c={heading:n.heading,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`CommandGroup`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="command-group" class="${olum.esc(o())}">
  ${n.heading?`
    <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">${olum.esc(n.heading)}</div>
  `:``}
  ${n.children}
</div>`,olum.injectStyle(`CommandGroup`,u.__style__()),olum.handleMarkup(`CommandGroup`,`lhh2c35mw9e`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ho=e=>{let t=e||`CommandItem`,n=l(t),{disabled:r=!1,onSelect:i,class:a=``,children:o}=l(t),s=()=>n.onSelect&&n.onSelect(),c=`group/command-item relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-muted hover:text-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,u=()=>q(c,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`CommandItem`,`oqj2ti4jpor`),f={disabled:n.disabled!==void 0&&n.disabled,onSelect:n.onSelect,className:n.class===void 0?``:n.class,children:n.children,handleClick:s,classes:u},p={__style__(){return``},methods:{},props:{},compName:`CommandItem`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <button type="button" data-slot="command-item" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(u())}" data-o-event='onclick|handleClick=${JSON.stringify([])}'>${n.children}</button>`,olum.injectStyle(`CommandItem`,p.__style__()),olum.handleMarkup(`CommandItem`,`oqj2ti4jpor`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:d,methodsRef:f,stateProps:null,localsRef:{get base(){return c}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},go=e=>{let t=e||`CommandSeparator`,n=l(t),{class:r=``}=l(t),i=()=>q(`-mx-1 h-px bg-border`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`CommandSeparator`,`3t0q5ocf5ze`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`CommandSeparator`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="command-separator" class="${olum.esc(i())}"></div>`,olum.injectStyle(`CommandSeparator`,s.__style__()),olum.handleMarkup(`CommandSeparator`,`3t0q5ocf5ze`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},_o=e=>{let t=e||`CommandShortcut`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`ml-auto text-xs tracking-widest text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`CommandShortcut`,`zw3l3vm49s`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`CommandShortcut`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="command-shortcut" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`CommandShortcut`,c.__style__()),olum.handleMarkup(`CommandShortcut`,`zw3l3vm49s`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},vo=e=>{let t=e||`CommandDialog`,n=l(t),{defaultOpen:r=!1,children:i}=l(t);var a=olum.mkElm(`div`,`CommandDialog`,`q7m1flo06c7`),o={defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,children:n.children},s={__style__(){return``},methods:{},props:{},compName:`CommandDialog`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="command-dialog" class="contents">
  <input type="checkbox" class="hidden" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``}>
  ${n.children}
</div>`,olum.injectStyle(`CommandDialog`,s.__style__()),olum.handleMarkup(`CommandDialog`,`q7m1flo06c7`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},yo=e=>{let t=e||`CommandDialogTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="command-dialog"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`CommandDialogTrigger`,`gnvoks8socm`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`CommandDialogTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="command-dialog-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`CommandDialogTrigger`,f.__style__()),olum.handleMarkup(`CommandDialogTrigger`,`gnvoks8socm`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},bo=`blur(4px)`,xo=0,So=()=>document.getElementById(`app`);function Co(e){return e.forEach(e=>e&&document.body.appendChild(e)),()=>e.forEach(e=>e&&e.remove())}function wo(){if(xo+=1,xo!==1)return;let e=So();e&&(e.style.filter=bo)}function To(){if(xo=Math.max(0,xo-1),xo!==0)return;let e=So();e&&(e.style.filter=``)}function Eo(e,t,n){let r=e.closest(`[data-slot="${n}"]`);if(r&&r.__olumModalInput)return r.__olumModalInput;let i=e.closest(`[data-slot="${t}"]`);return i&&i.querySelector(`:scope > input`)}function Do({input:e,nodes:t,displays:n,onOpen:r,onClose:i}){document.querySelectorAll(`body > [data-olum-portal]`).forEach(t=>{let n=t.__olumPortal;n&&(n.input===e||!n.input.isConnected)&&n.dispose()});let a=Co(t),o=!1,s=!1,c=()=>{let a=!!e.checked;a!==o&&(o=a,n&&t.forEach((e,t)=>{e&&(e.style.display=a?n[t]:`none`)}),a?(wo(),r&&r()):(To(),i&&i()))};c(),e.addEventListener(`change`,c);let l=()=>{s||(s=!0,e.removeEventListener(`change`,c),o&&To(),a())};return t.forEach(t=>{t&&(t.setAttribute(`data-olum-portal`,``),t.__olumPortal={input:e,dispose:l})}),l}var Oo=e=>{let t=e||`CommandDialogContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="command-dialog"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`[data-slot="command-dialog-overlay"]`),r=u.querySelector(`[data-slot="command-dialog-content"]`);if(!t||!n||!r)return;let i=()=>{t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0}))},a=e=>{e.key===`Escape`&&t.checked&&i()},o=e=>{e.target===n&&i()},s=e=>{e.target.closest(`[data-slot=command-item]`)&&i()};n.addEventListener(`click`,o),r.addEventListener(`click`,s),document.addEventListener(`keydown`,a);let c=Do({input:t,nodes:[n,r],displays:[`block`,`block`],onOpen:()=>requestAnimationFrame(()=>{let e=r.querySelector(`[data-slot="command-input"]`);e&&(e.value=``,e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.focus())})});return()=>{n.removeEventListener(`click`,o),r.removeEventListener(`click`,s),document.removeEventListener(`keydown`,a),c()}});let s=()=>q(`fixed top-1/3 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded-xl bg-background p-0 text-sm text-foreground ring-1 ring-border outline-none sm:max-w-sm`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`CommandDialogContent`,`dhdgj1hwo9s`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`CommandDialogContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="command-dialog-overlay" style="display: none" class="fixed inset-0 z-50 bg-black/20"></div>
<div data-slot="command-dialog-content" style="display: none" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`CommandDialogContent`,f.__style__()),olum.handleMarkup(`CommandDialogContent`,`dhdgj1hwo9s`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},ko=e=>{let t=e||`Menubar`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex h-8 items-center gap-0.5 rounded-lg border border-border p-[3px]`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Menubar`,`8xmpi2y5w7t`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Menubar`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="menubar" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`Menubar`,c.__style__()),olum.handleMarkup(`Menubar`,`8xmpi2y5w7t`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ao=e=>{let t=e||`MenubarMenu`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`MenubarMenu`,`lemwhzd9oyp`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`MenubarMenu`,deps:null,components:{DropdownMenu:Mr},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <olum name="DropdownMenu">${n.children}</olum>`,olum.injectStyle(`MenubarMenu`,o.__style__()),olum.handleMarkup(`MenubarMenu`,`lemwhzd9oyp`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},jo=e=>{let t=e||`MenubarTrigger`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex items-center rounded-sm px-1.5 py-[2px] text-sm font-medium outline-none select-none hover:bg-muted`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`MenubarTrigger`,`guxjnxhvjla`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`MenubarTrigger`,deps:null,components:{DropdownMenuTrigger:Nr},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <olum name="DropdownMenuTrigger" data-o-props='${encodeURIComponent(JSON.stringify({class:a()})).replace(/'/g,`%27`)}'>${n.children}</olum>`,olum.injectStyle(`MenubarTrigger`,c.__style__()),olum.handleMarkup(`MenubarTrigger`,`guxjnxhvjla`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Mo=e=>{let t=e||`MenubarContent`,n=l(t),{align:r=`start`,class:i=``,children:a}=l(t),o=()=>q(`min-w-36`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`MenubarContent`,`l4mex7s5yfp`),c={align:n.align===void 0?`start`:n.align,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`MenubarContent`,deps:null,components:{DropdownMenuContent:Pr},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <olum name="DropdownMenuContent" data-o-props='${encodeURIComponent(JSON.stringify({class:o()})).replace(/'/g,`%27`)}' data-o-props-src="align:method:align" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`MenubarContent`,u.__style__()),olum.handleMarkup(`MenubarContent`,`l4mex7s5yfp`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},No=e=>{let t=e||`DropdownMenuItem`,n=l(t),{inset:r=!1,variant:i=`default`,disabled:a=!1,onclick:o,class:s=``,children:c}=l(t),u=e=>n.onclick&&n.onclick(e),d=`group/dropdown-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,f={default:``,destructive:`text-destructive hover:bg-destructive/10 [&_svg]:text-destructive`},p=()=>q(d,f[n.variant===void 0?`default`:n.variant]||f.default,n.inset!==void 0&&n.inset?`pl-7`:``,n.class===void 0?``:n.class);var m=olum.mkElm(`div`,`DropdownMenuItem`,`8gcfhbv5ncp`),h={inset:n.inset!==void 0&&n.inset,variant:n.variant===void 0?`default`:n.variant,disabled:n.disabled!==void 0&&n.disabled,onclick:n.onclick,className:n.class===void 0?``:n.class,children:n.children,handleClick:u,classes:p},g={__style__(){return``},methods:{},props:{},compName:`DropdownMenuItem`,deps:null,components:{},get getElm(){var e=m.isConnected?olum.vdom.mkStaging(m):m;return e.innerHTML=`
      <button type="button" data-slot="dropdown-menu-item" data-inset="${olum.esc(n.inset!==void 0&&n.inset)}" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" ${n.disabled!==void 0&&n.disabled?`disabled`:``} class="${olum.esc(p())}" data-o-event='onclick|handleClick=${JSON.stringify([])}'>${n.children}</button>`,olum.injectStyle(`DropdownMenuItem`,g.__style__()),olum.handleMarkup(`DropdownMenuItem`,`8gcfhbv5ncp`,e,h)}};return{methods:g.methods,props:g.props,__OLUM__:g,el:m,methodsRef:h,stateProps:null,localsRef:{get base(){return d},get variants(){return f}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Po=e=>{let t=e||`DropdownMenuSeparator`,n=l(t),{class:r=``}=l(t),i=()=>q(`-mx-1 my-1 h-px bg-border`,n.class===void 0?``:n.class);var a=olum.mkElm(`div`,`DropdownMenuSeparator`,`g7e90r8bkh5`),o={className:n.class===void 0?``:n.class,classes:i},s={__style__(){return``},methods:{},props:{},compName:`DropdownMenuSeparator`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="dropdown-menu-separator" role="separator" class="${olum.esc(i())}"></div>`,olum.injectStyle(`DropdownMenuSeparator`,s.__style__()),olum.handleMarkup(`DropdownMenuSeparator`,`g7e90r8bkh5`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Fo=e=>{let t=e||`DropdownMenuShortcut`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`ml-auto text-xs tracking-widest text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DropdownMenuShortcut`,`h2bsccdt2dh`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DropdownMenuShortcut`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <span data-slot="dropdown-menu-shortcut" class="${olum.esc(a())}">${n.children}</span>`,olum.injectStyle(`DropdownMenuShortcut`,c.__style__()),olum.handleMarkup(`DropdownMenuShortcut`,`h2bsccdt2dh`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Io=e=>{let t=e||`NavigationMenu`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/navigation-menu relative flex max-w-max flex-1 items-center justify-center`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`NavigationMenu`,`dkyeete2i4v`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`NavigationMenu`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <nav data-slot="navigation-menu" class="${olum.esc(a())}">${n.children}</nav>`,olum.injectStyle(`NavigationMenu`,c.__style__()),olum.handleMarkup(`NavigationMenu`,`dkyeete2i4v`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Lo=e=>{let t=e||`NavigationMenuList`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-1 list-none items-center justify-center gap-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`NavigationMenuList`,`rm8wq54ruf`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`NavigationMenuList`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="navigation-menu-list" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`NavigationMenuList`,c.__style__()),olum.handleMarkup(`NavigationMenuList`,`rm8wq54ruf`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ro=e=>{let t=e||`NavigationMenuItem`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`NavigationMenuItem`,`m16pucjma3`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`NavigationMenuItem`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="navigation-menu-item" class="group/nav-item relative [&_[data-slot=navigation-menu-content]]:hidden has-[>input:checked]:[&_[data-slot=navigation-menu-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`NavigationMenuItem`,o.__style__()),olum.handleMarkup(`NavigationMenuItem`,`m16pucjma3`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},zo=e=>{let t=e||`NavigationMenuTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="navigation-menu-item"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(`inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none select-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-has-[>input:checked]/nav-item:bg-muted/50 group-has-[>input:checked]/nav-item:hover:bg-muted`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`NavigationMenuTrigger`,`f99soiqb9vr`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`NavigationMenuTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="navigation-menu-trigger" class="${olum.esc(s())}">
  ${n.children}
  <svg class="relative top-px ml-1 size-3 transition duration-300 group-has-[>input:checked]/nav-item:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
</button>`,olum.injectStyle(`NavigationMenuTrigger`,f.__style__()),olum.handleMarkup(`NavigationMenuTrigger`,`f99soiqb9vr`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Bo=e=>{let t=e||`NavigationMenuContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="navigation-menu-item"]`),t=e&&e.querySelector(`:scope > input`),n=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},r=t=>{e&&!e.contains(t.target)&&n()},i=e=>{e.key===`Escape`&&t&&t.checked&&n()},a=e=>{e.target.closest(`[data-slot=navigation-menu-link]`)&&n()};return document.addEventListener(`click`,r),document.addEventListener(`keydown`,i),u.addEventListener(`click`,a),()=>{document.removeEventListener(`click`,r),document.removeEventListener(`keydown`,i),u.removeEventListener(`click`,a)}});let s=()=>q(`absolute top-full left-0 z-50 mt-2 w-max rounded-lg bg-background p-1 text-foreground shadow ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`NavigationMenuContent`,`w83j8wwgogf`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`NavigationMenuContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="navigation-menu-content" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`NavigationMenuContent`,f.__style__()),olum.handleMarkup(`NavigationMenuContent`,`w83j8wwgogf`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vo=e=>{let t=e||`NavigationMenuLink`,n=l(t),{href:r=`#`,variant:i=`default`,class:a=``,children:o}=l(t),s={default:`flex items-center gap-2 rounded-md p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4`,trigger:`inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50`},c=()=>q(s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`NavigationMenuLink`,`be1xf3g7scl`),d={href:n.href===void 0?`#`:n.href,variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`NavigationMenuLink`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <a data-slot="navigation-menu-link" href="${olum.esc(n.href===void 0?`#`:n.href)}" class="${olum.esc(c())}">${n.children}</a>`,olum.injectStyle(`NavigationMenuLink`,f.__style__()),olum.handleMarkup(`NavigationMenuLink`,`be1xf3g7scl`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ho=e=>{let t=e||`Pagination`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`mx-auto flex w-full justify-center`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`Pagination`,`yr5wqili3w`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`Pagination`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <nav role="navigation" aria-label="pagination" data-slot="pagination" class="${olum.esc(a())}">${n.children}</nav>`,olum.injectStyle(`Pagination`,c.__style__()),olum.handleMarkup(`Pagination`,`yr5wqili3w`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Uo=e=>{let t=e||`PaginationContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex items-center gap-0.5`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`PaginationContent`,`n3ugkyqmpe`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`PaginationContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <ul data-slot="pagination-content" class="${olum.esc(a())}">${n.children}</ul>`,olum.injectStyle(`PaginationContent`,c.__style__()),olum.handleMarkup(`PaginationContent`,`n3ugkyqmpe`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Wo=e=>{let t=e||`PaginationItem`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`PaginationItem`,`u8au3ce81o`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`PaginationItem`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <li data-slot="pagination-item">${n.children}</li>`,olum.injectStyle(`PaginationItem`,o.__style__()),olum.handleMarkup(`PaginationItem`,`u8au3ce81o`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Go=e=>{let t=e||`PaginationLink`,n=l(t),{href:r=`#`,isActive:i=!1,size:a=`icon`,class:o=``,children:s}=l(t),c=`group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px`,u={active:`border-border bg-background hover:bg-muted hover:text-foreground`,inactive:`border-transparent hover:bg-muted hover:text-foreground`},d={default:`h-8 gap-1.5 px-2.5`,icon:`size-8`},f=()=>q(c,n.isActive!==void 0&&n.isActive?u.active:u.inactive,d[n.size===void 0?`icon`:n.size]||d.icon,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`PaginationLink`,`0d3davnhc5ds`),m={href:n.href===void 0?`#`:n.href,isActive:n.isActive!==void 0&&n.isActive,size:n.size===void 0?`icon`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:f},h={__style__(){return``},methods:{},props:{},compName:`PaginationLink`,deps:null,components:{},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <a data-slot="pagination-link" data-active="${olum.esc(n.isActive!==void 0&&n.isActive)}" href="${olum.esc(n.href===void 0?`#`:n.href)}" aria-current="${olum.esc(n.isActive!==void 0&&n.isActive?`page`:void 0)}" class="${olum.esc(f())}">${n.children}</a>`,olum.injectStyle(`PaginationLink`,h.__style__()),olum.handleMarkup(`PaginationLink`,`0d3davnhc5ds`,e,m)}};return{methods:h.methods,props:h.props,__OLUM__:h,el:p,methodsRef:m,stateProps:null,localsRef:{get base(){return c},get variants(){return u},get sizes(){return d}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ko=e=>{let t=e||`PaginationNext`,n=l(t),{href:r=`#`,text:i=`Next`,class:a=``}=l(t),o=()=>q(`gap-1.5 pr-1.5!`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`PaginationNext`,`qxak4kvjtgn`),c={href:n.href===void 0?`#`:n.href,text:n.text===void 0?`Next`:n.text,className:n.class===void 0?``:n.class,classes:o},u={__style__(){return``},methods:{},props:{},compName:`PaginationNext`,deps:null,components:{PaginationLink:Go},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <olum name="PaginationLink" data-o-props='${encodeURIComponent(JSON.stringify({size:`default`,label:`Go to next page`,class:o()})).replace(/'/g,`%27`)}' data-o-props-src="href:method:href" data-o-props-owner='${t}'>
  <span class="hidden sm:block">${olum.esc(n.text===void 0?`Next`:n.text)}</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
</olum>`,olum.injectStyle(`PaginationNext`,u.__style__()),olum.handleMarkup(`PaginationNext`,`qxak4kvjtgn`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qo=e=>{let t=e||`PaginationPrevious`,n=l(t),{href:r=`#`,text:i=`Previous`,class:a=``}=l(t),o=()=>q(`gap-1.5 pl-1.5!`,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`PaginationPrevious`,`uam29gw02d`),c={href:n.href===void 0?`#`:n.href,text:n.text===void 0?`Previous`:n.text,className:n.class===void 0?``:n.class,classes:o},u={__style__(){return``},methods:{},props:{},compName:`PaginationPrevious`,deps:null,components:{PaginationLink:Go},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <olum name="PaginationLink" data-o-props='${encodeURIComponent(JSON.stringify({size:`default`,label:`Go to previous page`,class:o()})).replace(/'/g,`%27`)}' data-o-props-src="href:method:href" data-o-props-owner='${t}'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
  <span class="hidden sm:block">${olum.esc(n.text===void 0?`Previous`:n.text)}</span>
</olum>`,olum.injectStyle(`PaginationPrevious`,u.__style__()),olum.handleMarkup(`PaginationPrevious`,`uam29gw02d`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Jo=e=>{let t=e||`Tabs`,n=l(t),{orientation:r=`horizontal`,class:i=``,children:a}=l(t),o=()=>q(`group/tabs flex gap-2 [&>[data-olum]]:contents`,(n.orientation===void 0?`horizontal`:n.orientation)===`horizontal`?`flex-col`:``,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`Tabs`,`6c7haxk0s5l`),c={orientation:n.orientation===void 0?`horizontal`:n.orientation,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`Tabs`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="tabs" data-orientation="${olum.esc(n.orientation===void 0?`horizontal`:n.orientation)}" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`Tabs`,u.__style__()),olum.handleMarkup(`Tabs`,`6c7haxk0s5l`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Yo=e=>{let t=e||`TabsList`,n=l(t),{variant:r=`default`,class:i=``,children:a}=l(t),o=`group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground h-8`,s={default:`bg-muted`,line:`gap-1 bg-transparent rounded-none`},c=()=>q(o,s[n.variant===void 0?`default`:n.variant]||s.default,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`TabsList`,`a9mymdi2olr`),d={variant:n.variant===void 0?`default`:n.variant,className:n.class===void 0?``:n.class,children:n.children,classes:c},f={__style__(){return``},methods:{},props:{},compName:`TabsList`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="tabs-list" data-variant="${olum.esc(n.variant===void 0?`default`:n.variant)}" role="tablist" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`TabsList`,f.__style__()),olum.handleMarkup(`TabsList`,`a9mymdi2olr`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:u,methodsRef:d,stateProps:null,localsRef:{get base(){return o},get variants(){return s}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xo=e=>{let t=e||`TabsTrigger`,n=l(t),{value:r,group:i=`tabs`,variant:a=`default`,defaultChecked:o=!1,disabled:s=!1,class:c=``,children:u}=l(t),d=`relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all cursor-pointer hover:text-foreground has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-disabled:pointer-events-none has-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,f={default:`has-[:checked]:bg-background has-[:checked]:text-foreground has-[:checked]:shadow-sm`,line:`has-[:checked]:text-foreground after:absolute after:inset-x-0 after:bottom-[-5px] after:h-0.5 after:bg-foreground after:opacity-0 has-[:checked]:after:opacity-100`},p=()=>q(d,f[n.variant===void 0?`default`:n.variant]||f.default,n.class===void 0?``:n.class);var m=olum.mkElm(`div`,`TabsTrigger`,`e8xebe0gbyt`),h={value:n.value,group:n.group===void 0?`tabs`:n.group,variant:n.variant===void 0?`default`:n.variant,defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,disabled:n.disabled!==void 0&&n.disabled,className:n.class===void 0?``:n.class,children:n.children,classes:p},g={__style__(){return``},methods:{},props:{},compName:`TabsTrigger`,deps:null,components:{},get getElm(){var e=m.isConnected?olum.vdom.mkStaging(m):m;return e.innerHTML=`
      <label data-slot="tabs-trigger" role="tab" class="${olum.esc(p())}">
  <input type="radio" name="${olum.esc(n.group===void 0?`tabs`:n.group)}" value="${olum.esc(n.value)}" class="peer sr-only" ${n.defaultChecked!==void 0&&n.defaultChecked?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``}>
  ${n.children}
</label>`,olum.injectStyle(`TabsTrigger`,g.__style__()),olum.handleMarkup(`TabsTrigger`,`e8xebe0gbyt`,e,h)}};return{methods:g.methods,props:g.props,__OLUM__:g,el:m,methodsRef:h,stateProps:null,localsRef:{get base(){return d},get variants(){return f}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Zo=e=>{let t=e||`TabsContent`,n=l(t),{value:r,class:i=``,children:a}=l(t);var s={active:!1},c=o(()=>{let e=f.closest(`[data-slot="tabs"]`),t=()=>{let t=e&&e.querySelector(`input[type=radio]:checked`);s.active=!!t&&t.value===n.value};return t(),e&&e.addEventListener(`change`,t),()=>e&&e.removeEventListener(`change`,t)});let u=()=>q(`flex-1 text-sm outline-none`,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`TabsContent`,`wzgwaq18vw`),f=d,p={value:n.value,className:n.class===void 0?``:n.class,children:n.children,classes:u},m={__style__(){return``},methods:{},props:{},compName:`TabsContent`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <div data-o-show="" style="display:${s.active?`contents`:`none`};">
  <div data-slot="tabs-content" class="${olum.esc(u())}">${n.children}</div>
</div>`,olum.injectStyle(`TabsContent`,m.__style__()),olum.handleMarkup(`TabsContent`,`wzgwaq18vw`,e,p)}};return s.__olum__={compName:t,compId:`wzgwaq18vw`},s=olum.proxyHandler(s,null,d),{methods:m.methods,props:m.props,__OLUM__:m,el:d,methodsRef:p,stateProps:s,localsRef:{},hooks:{mounted:c===void 0?null:c,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qo=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8m0 8v4m0-8h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>`,$o=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M16 2v2M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M8 2v2"/><circle cx="12" cy="10" r="3"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`,es=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M8 2v3m8-3v3"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>`,ts=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,ns=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>`,rs=e=>{let t=e||`page`;var n={page:1};let r=Array.from({length:5},(e,t)=>t+1),i=e=>{let t=e.target.closest(`[data-slot="pagination-link"], [aria-label="Go to next page"], [aria-label="Go to previous page"]`);if(!t)return;e.preventDefault();let r=t.getAttribute(`aria-label`)||``;if(r===`Go to next page`)n.page=Math.min(5,n.page+1);else if(r===`Go to previous page`)n.page=Math.max(1,n.page-1);else{let e=parseInt(t.textContent.trim(),10);Number.isNaN(e)||(n.page=e)}},a=()=>console.log(`File > New file`),o=()=>console.log(`File > Save`);var s=olum.mkElm(`div`,`page`,`wb5ncdu76c`),c={onPageClick:i,fileAction:a,saveAction:o},l={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Icon:Y,Button:J,Breadcrumb:no,BreadcrumbList:ro,BreadcrumbItem:io,BreadcrumbLink:ao,BreadcrumbPage:oo,BreadcrumbSeparator:so,BreadcrumbEllipsis:co,Command:lo,CommandInput:uo,CommandList:fo,CommandEmpty:po,CommandGroup:mo,CommandItem:ho,CommandSeparator:go,CommandShortcut:_o,CommandDialog:vo,CommandDialogTrigger:yo,CommandDialogContent:Oo,Menubar:ko,MenubarMenu:Ao,MenubarTrigger:jo,MenubarContent:Mo,DropdownMenuItem:No,DropdownMenuSeparator:Po,DropdownMenuShortcut:Fo,NavigationMenu:Io,NavigationMenuList:Lo,NavigationMenuItem:Ro,NavigationMenuTrigger:zo,NavigationMenuContent:Bo,NavigationMenuLink:Vo,Pagination:Ho,PaginationContent:Uo,PaginationItem:Wo,PaginationLink:Go,PaginationNext:Ko,PaginationPrevious:qo,Tabs:Jo,TabsList:Yo,TabsTrigger:Xo,TabsContent:Zo,Anchor:qe},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <h1 class="mb-8 font-heading text-2xl font-semibold text-foreground">UI Kit — Navigation</h1>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Breadcrumb</h2>
    <p class="mb-4 text-sm text-muted-foreground">The trail of pages leading to the current one; long trails collapse behind an ellipsis.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Breadcrumb">
        <olum name="BreadcrumbList">
          <olum name="BreadcrumbItem"><olum name="BreadcrumbLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/`})).replace(/'/g,`%27`)}'>Home</olum></olum>
          <olum name="BreadcrumbSeparator"></olum>
          <olum name="BreadcrumbItem"><olum name="BreadcrumbEllipsis"></olum></olum>
          <olum name="BreadcrumbSeparator"></olum>
          <olum name="BreadcrumbItem"><olum name="BreadcrumbLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/ui`})).replace(/'/g,`%27`)}'>UI Kit</olum></olum>
          <olum name="BreadcrumbSeparator"></olum>
          <olum name="BreadcrumbItem"><olum name="BreadcrumbPage">Navigation</olum></olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Command</h2>
    <p class="mb-4 text-sm text-muted-foreground">A searchable palette of commands — inline, and as a modal dialog (try the trigger button, then type and use arrow keys).</p>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="rounded-xl border border-border p-2">
        <olum name="Command">
          <olum name="CommandInput" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`Search commands…`})).replace(/'/g,`%27`)}'></olum>
          <olum name="CommandList">
            <olum name="CommandEmpty">No results found.</olum>
            <olum name="CommandGroup" data-o-props='${encodeURIComponent(JSON.stringify({heading:`Suggestions`})).replace(/'/g,`%27`)}'>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:es,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Calendar</span></olum>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$o,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Search emoji</span></olum>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Qo,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Calculator</span></olum>
            </olum>
            <olum name="CommandSeparator"></olum>
            <olum name="CommandGroup" data-o-props='${encodeURIComponent(JSON.stringify({heading:`Settings`})).replace(/'/g,`%27`)}'>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ts,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Profile</span><olum name="CommandShortcut">⌘P</olum></olum>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ns,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Billing</span><olum name="CommandShortcut">⌘B</olum></olum>
              <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$a,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Settings</span><olum name="CommandShortcut">⌘S</olum></olum>
            </olum>
          </olum>
        </olum>
      </div>
      <div class="flex items-center justify-center rounded-xl border border-border p-6">
        <olum name="CommandDialog">
          <olum name="CommandDialogTrigger">
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`})).replace(/'/g,`%27`)}'>Open command palette <olum name="CommandShortcut">⌘K</olum></olum>
          </olum>
          <olum name="CommandDialogContent">
            <olum name="Command">
              <olum name="CommandInput" data-o-props='${encodeURIComponent(JSON.stringify({placeholder:`Type a command…`})).replace(/'/g,`%27`)}'></olum>
              <olum name="CommandList">
                <olum name="CommandEmpty">No results found.</olum>
                <olum name="CommandGroup" data-o-props='${encodeURIComponent(JSON.stringify({heading:`Suggestions`})).replace(/'/g,`%27`)}'>
                  <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:es,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Calendar</span></olum>
                  <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$o,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Search emoji</span></olum>
                  <olum name="CommandItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:Qo,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Calculator</span></olum>
                </olum>
              </olum>
            </olum>
          </olum>
        </olum>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Menubar</h2>
    <p class="mb-4 text-sm text-muted-foreground">A row of application menus, composed from DropdownMenu underneath.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Menubar">
        <olum name="MenubarMenu">
          <olum name="MenubarTrigger">File</olum>
          <olum name="MenubarContent">
            <olum name="DropdownMenuItem" data-o-props-src="onclick:method:fileAction" data-o-props-owner='${t}'>New File <olum name="DropdownMenuShortcut">⌘N</olum></olum>
            <olum name="DropdownMenuItem" data-o-props-src="onclick:method:saveAction" data-o-props-owner='${t}'>Save <olum name="DropdownMenuShortcut">⌘S</olum></olum>
            <olum name="DropdownMenuSeparator"></olum>
            <olum name="DropdownMenuItem" data-o-props='${encodeURIComponent(JSON.stringify({variant:`destructive`})).replace(/'/g,`%27`)}'>Close</olum>
          </olum>
        </olum>
        <olum name="MenubarMenu">
          <olum name="MenubarTrigger">Edit</olum>
          <olum name="MenubarContent">
            <olum name="DropdownMenuItem">Undo <olum name="DropdownMenuShortcut">⌘Z</olum></olum>
            <olum name="DropdownMenuItem">Redo <olum name="DropdownMenuShortcut">⇧⌘Z</olum></olum>
          </olum>
        </olum>
        <olum name="MenubarMenu">
          <olum name="MenubarTrigger">View</olum>
          <olum name="MenubarContent">
            <olum name="DropdownMenuItem">Zoom In</olum>
            <olum name="DropdownMenuItem">Zoom Out</olum>
          </olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Navigation Menu</h2>
    <p class="mb-4 text-sm text-muted-foreground">Site navigation whose items open rich panels rather than plain lists.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="NavigationMenu">
        <olum name="NavigationMenuList">
          <olum name="NavigationMenuItem">
            <olum name="NavigationMenuTrigger">Ecosystem</olum>
            <olum name="NavigationMenuContent">
              <div class="grid w-64 gap-1">
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/store`})).replace(/'/g,`%27`)}'>Store — olum-store demo</olum>
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/transitions`})).replace(/'/g,`%27`)}'>Transitions — olum-transition demo</olum>
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/icons`})).replace(/'/g,`%27`)}'>Icons — olum-icons browser</olum>
              </div>
            </olum>
          </olum>
          <olum name="NavigationMenuItem">
            <olum name="NavigationMenuTrigger">UI Kit</olum>
            <olum name="NavigationMenuContent">
              <div class="grid w-64 gap-1">
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/ui/forms`})).replace(/'/g,`%27`)}'>Forms</olum>
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/ui/overlay`})).replace(/'/g,`%27`)}'>Overlay</olum>
                <olum name="NavigationMenuLink" data-o-props='${encodeURIComponent(JSON.stringify({href:`/ui/data-display`})).replace(/'/g,`%27`)}'>Data Display</olum>
              </div>
            </olum>
          </olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Pagination</h2>
    <p class="mb-4 text-sm text-muted-foreground">Page ${olum.esc(n.page)} of ${olum.esc(5)} — working state-driven paginator over a fake dataset.</p>
    <div class="rounded-xl border border-border p-6" data-o-event='onclick|onPageClick=${JSON.stringify([event])}'>
      <olum name="Pagination">
        <olum name="PaginationContent">
          <olum name="PaginationItem"><olum name="PaginationPrevious"></olum></olum>
          ${r.map(function(e){return`
            <olum name="PaginationItem" data-o-key="${olum.esc(e)}"><olum name="PaginationLink" data-o-props='${encodeURIComponent(JSON.stringify({isActive:e===n.page})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e)}">${olum.esc(e)}</olum></olum>
          `}).join(``)}
          <olum name="PaginationItem"><olum name="PaginationNext"></olum></olum>
        </olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Tabs</h2>
    <p class="mb-4 text-sm text-muted-foreground">The styled UI kit tabs — radio-input driven, CSS-only. Distinct from the raw <code class="rounded bg-muted px-1 py-0.5 text-xs">&lt;if&gt;</code> tab demo on /control-flow.</p>
    <div class="rounded-xl border border-border p-6">
      <olum name="Tabs">
        <olum name="TabsList">
          <olum name="TabsTrigger" data-o-props='${encodeURIComponent(JSON.stringify({group:`ui-tabs`,value:`account`,defaultChecked:!0})).replace(/'/g,`%27`)}'>Account</olum>
          <olum name="TabsTrigger" data-o-props='${encodeURIComponent(JSON.stringify({group:`ui-tabs`,value:`password`})).replace(/'/g,`%27`)}'>Password</olum>
          <olum name="TabsTrigger" data-o-props='${encodeURIComponent(JSON.stringify({group:`ui-tabs`,value:`team`})).replace(/'/g,`%27`)}'>Team</olum>
        </olum>
        <olum name="TabsContent" data-o-props='${encodeURIComponent(JSON.stringify({value:`account`})).replace(/'/g,`%27`)}'><p class="p-3 text-sm text-muted-foreground">Update your account details here.</p></olum>
        <olum name="TabsContent" data-o-props='${encodeURIComponent(JSON.stringify({value:`password`})).replace(/'/g,`%27`)}'><p class="p-3 text-sm text-muted-foreground">Change your password here.</p></olum>
        <olum name="TabsContent" data-o-props='${encodeURIComponent(JSON.stringify({value:`team`})).replace(/'/g,`%27`)}'><p class="p-3 text-sm text-muted-foreground">Manage your team members here.</p></olum>
      </olum>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="mb-1 text-xl font-semibold text-foreground">Anchor</h2>
    <p class="mb-4 text-sm text-muted-foreground">An anchor styled as a button — same variants and sizes as Button, works with a router <code class="rounded bg-muted px-1 py-0.5 text-xs">to</code> path or a plain href.</p>
    <div class="rounded-xl border border-border p-6">
      <div class="flex flex-wrap items-center gap-2">
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`default`})).replace(/'/g,`%27`)}'>Default</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`secondary`})).replace(/'/g,`%27`)}'>Secondary</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`outline`})).replace(/'/g,`%27`)}'>Outline</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`ghost`})).replace(/'/g,`%27`)}'>Ghost</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`destructive`})).replace(/'/g,`%27`)}'>Destructive</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,variant:`link`})).replace(/'/g,`%27`)}'>Link</olum>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,size:`xs`})).replace(/'/g,`%27`)}'>Extra small</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,size:`sm`})).replace(/'/g,`%27`)}'>Small</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,size:`default`})).replace(/'/g,`%27`)}'>Default</olum>
        <olum name="Anchor" data-o-props='${encodeURIComponent(JSON.stringify({to:`/`,size:`lg`})).replace(/'/g,`%27`)}'>Large</olum>
      </div>
    </div>
  </section>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,l.__style__()),olum.handleMarkup(`page`,`wb5ncdu76c`,e,c)}};return n.__olum__={compName:t,compId:`wb5ncdu76c`},n=olum.proxyHandler(n,null,s),{methods:l.methods,props:l.props,__OLUM__:l,el:s,methodsRef:c,stateProps:n,localsRef:{get totalPages(){return 5}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},is=e=>{let t=e||`AlertDialog`,n=l(t),{defaultOpen:r=!1,children:i}=l(t);var a=olum.mkElm(`div`,`AlertDialog`,`ljxukm86ef`),o={defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,children:n.children},s={__style__(){return``},methods:{},props:{},compName:`AlertDialog`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="alert-dialog" class="contents">
  <input type="checkbox" class="hidden" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``}>
  ${n.children}
</div>`,olum.injectStyle(`AlertDialog`,s.__style__()),olum.handleMarkup(`AlertDialog`,`ljxukm86ef`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},as=e=>{let t=e||`AlertDialogTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="alert-dialog"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`AlertDialogTrigger`,`b9z2g1ur1gq`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`AlertDialogTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="alert-dialog-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`AlertDialogTrigger`,f.__style__()),olum.handleMarkup(`AlertDialogTrigger`,`b9z2g1ur1gq`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},os=e=>{let t=e||`AlertDialogContent`,n=l(t),{size:r=`default`,class:i=``,children:a}=l(t);var s=o(()=>{let e=d.closest(`[data-slot="alert-dialog"]`),t=e&&e.querySelector(`:scope > input`),n=d.querySelector(`[data-slot="alert-dialog-overlay"]`),r=d.querySelector(`[data-slot="alert-dialog-content"]`);if(!(!t||!n||!r))return r.__olumModalInput=t,Do({input:t,nodes:[n,r],displays:[`block`,`grid`]})});let c=()=>q(`group/alert-dialog-content top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-popover-foreground ring-1 ring-border outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm fixed`,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`AlertDialogContent`,`o0hguiariy`),d=u,f={size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:c},p={__style__(){return``},methods:{},props:{},compName:`AlertDialogContent`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="alert-dialog-overlay" style="display: none" class="fixed inset-0 z-50 bg-black/20"></div>
<div data-slot="alert-dialog-content" data-size="${olum.esc(n.size===void 0?`default`:n.size)}" style="display: none" class="${olum.esc(c())}">${n.children}</div>`,olum.injectStyle(`AlertDialogContent`,p.__style__()),olum.handleMarkup(`AlertDialogContent`,`o0hguiariy`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:u,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},ss=e=>{let t=e||`AlertDialogHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`group/alert-dialog-header grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center [&>[data-olum]]:contents has-data-[slot=alert-dialog-media]:place-items-start has-data-[slot=alert-dialog-media]:gap-x-4 has-data-[slot=alert-dialog-media]:text-left`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertDialogHeader`,`zt6i0re9ryn`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertDialogHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-dialog-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertDialogHeader`,c.__style__()),olum.handleMarkup(`AlertDialogHeader`,`zt6i0re9ryn`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},cs=e=>{let t=e||`AlertDialogTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-base font-medium group-has-data-[slot=alert-dialog-media]/alert-dialog-header:col-start-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertDialogTitle`,`140o8hy4ujtg`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertDialogTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-dialog-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertDialogTitle`,c.__style__()),olum.handleMarkup(`AlertDialogTitle`,`140o8hy4ujtg`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ls=e=>{let t=e||`AlertDialogDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertDialogDescription`,`skamw7lkwms`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertDialogDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-dialog-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertDialogDescription`,c.__style__()),olum.handleMarkup(`AlertDialogDescription`,`skamw7lkwms`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},us=e=>{let t=e||`AlertDialogFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 [&>[data-olum]]:contents group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`AlertDialogFooter`,`s48xk7w9yx`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`AlertDialogFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="alert-dialog-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`AlertDialogFooter`,c.__style__()),olum.handleMarkup(`AlertDialogFooter`,`s48xk7w9yx`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ds=e=>{let t=e||`AlertDialogCancel`,n=l(t),{variant:r=`outline`,size:i=`default`,class:a=``,children:s}=l(t);var c=o(()=>{let e=f.querySelector(`button`),t=()=>{let e=Eo(f,`alert-dialog`,`alert-dialog-content`);e&&(e.checked=!1,e.dispatchEvent(new Event(`change`,{bubbles:!0})))};return e.addEventListener(`click`,t),()=>e.removeEventListener(`click`,t)});let u=()=>q(`group-data-[size=sm]/alert-dialog-content:w-full`,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`AlertDialogCancel`,`ecn78hnhec`),f=d,p={variant:n.variant===void 0?`outline`:n.variant,size:n.size===void 0?`default`:n.size,className:n.class===void 0?``:n.class,children:n.children,classes:u},m={__style__(){return``},methods:{},props:{},compName:`AlertDialogCancel`,deps:null,components:{Button:J},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({class:u()})).replace(/'/g,`%27`)}' data-o-props-src="variant:method:variant|size:method:size" data-o-props-owner='${t}'>${n.children}</olum>`,olum.injectStyle(`AlertDialogCancel`,m.__style__()),olum.handleMarkup(`AlertDialogCancel`,`ecn78hnhec`,e,p)}};return{methods:m.methods,props:m.props,__OLUM__:m,el:d,methodsRef:p,stateProps:null,localsRef:{},hooks:{mounted:c===void 0?null:c,unMounted:null,isMounted:!1,isUnMounted:!1}}},fs=e=>{let t=e||`AlertDialogAction`,n=l(t),{class:r=``,onclick:i,children:a}=l(t);var s=o(()=>{let e=d.querySelector(`button`),t=()=>{n.onclick&&n.onclick();let e=Eo(d,`alert-dialog`,`alert-dialog-content`);e&&(e.checked=!1,e.dispatchEvent(new Event(`change`,{bubbles:!0})))};return e.addEventListener(`click`,t),()=>e.removeEventListener(`click`,t)});let c=()=>q(`group-data-[size=sm]/alert-dialog-content:w-full`,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`AlertDialogAction`,`sjk0cypqaeq`),d=u,f={className:n.class===void 0?``:n.class,onclick:n.onclick,children:n.children,classes:c},p={__style__(){return``},methods:{},props:{},compName:`AlertDialogAction`,deps:null,components:{Button:J},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({slot:`alert-dialog-action`,class:c()})).replace(/'/g,`%27`)}'>${n.children}</olum>`,olum.injectStyle(`AlertDialogAction`,p.__style__()),olum.handleMarkup(`AlertDialogAction`,`sjk0cypqaeq`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:u,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},ps=e=>{let t=e||`ContextMenu`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`ContextMenu`,`5pa0f58si0r`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`ContextMenu`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="context-menu" class="relative block [&_[data-slot=context-menu-content]]:hidden has-[>input:checked]:[&_[data-slot=context-menu-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`ContextMenu`,o.__style__()),olum.handleMarkup(`ContextMenu`,`5pa0f58si0r`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ms=e=>{let t=e||`ContextMenuTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="context-menu"]`),t=e&&e.querySelector(`:scope > input`),n=e&&e.querySelector(`[data-slot="context-menu-content"]`),r=u.firstElementChild,i=e=>{if(e.preventDefault(),t){if(n){let t=r.getBoundingClientRect();n.style.left=e.clientX-t.left+`px`,n.style.top=e.clientY-t.top+`px`}t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0}))}};return r.addEventListener(`contextmenu`,i),()=>r.removeEventListener(`contextmenu`,i)});let s=()=>q(`select-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`ContextMenuTrigger`,`q3bwbrjjg`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`ContextMenuTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="context-menu-trigger" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`ContextMenuTrigger`,f.__style__()),olum.handleMarkup(`ContextMenuTrigger`,`q3bwbrjjg`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},hs=e=>{let t=e||`ContextMenuContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="context-menu"]`),t=e&&e.querySelector(`:scope > input`),n=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},r=e=>{let t=u.querySelector(`[data-slot="context-menu-content"]`);t&&!t.contains(e.target)&&n()},i=e=>{e.key===`Escape`&&t&&t.checked&&n()},a=e=>{e.target.closest(`[data-slot=dropdown-menu-item]`)&&n()};return document.addEventListener(`click`,r),document.addEventListener(`keydown`,i),u.addEventListener(`click`,a),()=>{document.removeEventListener(`click`,r),document.removeEventListener(`keydown`,i),u.removeEventListener(`click`,a)}});let s=()=>q(`absolute z-50 min-w-36 rounded-lg bg-background p-1 text-foreground shadow-md ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`ContextMenuContent`,`amgde5lemen`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`ContextMenuContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="context-menu-content" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`ContextMenuContent`,f.__style__()),olum.handleMarkup(`ContextMenuContent`,`amgde5lemen`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},gs=e=>{let t=e||`Dialog`,n=l(t),{defaultOpen:r=!1,children:i}=l(t);var a=olum.mkElm(`div`,`Dialog`,`tve1iy1xi9b`),o={defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,children:n.children},s={__style__(){return``},methods:{},props:{},compName:`Dialog`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="dialog" class="contents">
  <input type="checkbox" class="hidden" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``}>
  ${n.children}
</div>`,olum.injectStyle(`Dialog`,s.__style__()),olum.handleMarkup(`Dialog`,`tve1iy1xi9b`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},_s=e=>{let t=e||`DialogTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="dialog"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DialogTrigger`,`9sldinlzxl6`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DialogTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="dialog-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`DialogTrigger`,f.__style__()),olum.handleMarkup(`DialogTrigger`,`9sldinlzxl6`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},vs=e=>{let t=e||`DialogContent`,n=l(t),{showCloseButton:r=!0,class:i=``,children:a}=l(t);var s=o(()=>{let e=d.closest(`[data-slot="dialog"]`),t=e&&e.querySelector(`:scope > input`),n=d.querySelector(`[data-slot="dialog-overlay"]`),r=d.querySelector(`[data-slot="dialog-content"]`),i=d.querySelector(`[data-builtin-close]`);if(!t||!n||!r)return;r.__olumModalInput=t;let a=()=>{t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0}))},o=e=>{e.key===`Escape`&&t.checked&&a()},s=e=>{e.target===n&&a()};i&&i.addEventListener(`click`,a),n.addEventListener(`click`,s),document.addEventListener(`keydown`,o);let c=Do({input:t,nodes:[n,r],displays:[`block`,`grid`]});return()=>{i&&i.removeEventListener(`click`,a),n.removeEventListener(`click`,s),document.removeEventListener(`keydown`,o),c()}});let c=()=>q(`top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm text-foreground ring-1 ring-border outline-none sm:max-w-sm fixed`,n.class===void 0?``:n.class);var u=olum.mkElm(`div`,`DialogContent`,`6mjkym2q06t`),d=u,f={showCloseButton:n.showCloseButton===void 0||n.showCloseButton,className:n.class===void 0?``:n.class,children:n.children,classes:c},p={__style__(){return``},methods:{},props:{},compName:`DialogContent`,deps:null,components:{},get getElm(){var e=u.isConnected?olum.vdom.mkStaging(u):u;return e.innerHTML=`
      <div data-slot="dialog-overlay" style="display: none" class="fixed inset-0 z-50 bg-black/20"></div>
<div data-slot="dialog-content" style="display: none" class="${olum.esc(c())}">
  ${n.children}
  ${n.showCloseButton===void 0||n.showCloseButton?`
    <button type="button" data-builtin-close="" class="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded-lg hover:bg-muted">
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      <span class="sr-only">Close</span>
    </button>
  `:``}
</div>`,olum.injectStyle(`DialogContent`,p.__style__()),olum.handleMarkup(`DialogContent`,`6mjkym2q06t`,e,f)}};return{methods:p.methods,props:p.props,__OLUM__:p,el:u,methodsRef:f,stateProps:null,localsRef:{},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},ys=e=>{let t=e||`DialogHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-2`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DialogHeader`,`3uu82djzpe3`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DialogHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="dialog-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DialogHeader`,c.__style__()),olum.handleMarkup(`DialogHeader`,`3uu82djzpe3`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},bs=e=>{let t=e||`DialogTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-base leading-none font-medium`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DialogTitle`,`rdyjgmv7pa`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DialogTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="dialog-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DialogTitle`,c.__style__()),olum.handleMarkup(`DialogTitle`,`rdyjgmv7pa`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},xs=e=>{let t=e||`DialogDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DialogDescription`,`2jqdm9ep8pq`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DialogDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="dialog-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DialogDescription`,c.__style__()),olum.handleMarkup(`DialogDescription`,`2jqdm9ep8pq`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ss=e=>{let t=e||`DialogFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DialogFooter`,`kbr95ypm54`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DialogFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="dialog-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DialogFooter`,c.__style__()),olum.handleMarkup(`DialogFooter`,`kbr95ypm54`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Cs=e=>{let t=e||`DialogClose`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.querySelector(`button`),t=()=>{let e=Eo(u,`dialog`,`dialog-content`);e&&(e.checked=!1,e.dispatchEvent(new Event(`change`,{bubbles:!0})))};return e.addEventListener(`click`,t),()=>e.removeEventListener(`click`,t)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DialogClose`,`luxtcdhop2`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DialogClose`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="dialog-close" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`DialogClose`,f.__style__()),olum.handleMarkup(`DialogClose`,`luxtcdhop2`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},ws=e=>{let t=e||`Drawer`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`Drawer`,`dvdtjrpsxu`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`Drawer`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="drawer" class="contents">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`Drawer`,o.__style__()),olum.handleMarkup(`Drawer`,`dvdtjrpsxu`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ts=e=>{let t=e||`DrawerTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="drawer"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DrawerTrigger`,`8qiudqbg6lu`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DrawerTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="drawer-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`DrawerTrigger`,f.__style__()),olum.handleMarkup(`DrawerTrigger`,`8qiudqbg6lu`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Es=e=>{let t=e||`DrawerContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="drawer"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`[data-slot="drawer-overlay"]`),r=u.querySelector(`[data-slot="drawer-content"]`);if(!t||!n||!r)return;r.__olumModalInput=t;let i=()=>{t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0}))},a=e=>{e.key===`Escape`&&t.checked&&i()},o=e=>{e.target===n&&i()};n.addEventListener(`click`,o),document.addEventListener(`keydown`,a);let s=Do({input:t,nodes:[n,r],displays:[`block`,`flex`]});return()=>{n.removeEventListener(`click`,o),document.removeEventListener(`keydown`,a),s()}});let s=()=>q(`group/drawer-popup fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[80vh] flex-col rounded-t-xl border-t bg-background text-sm text-foreground`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DrawerContent`,`60tnmry4oup`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DrawerContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="drawer-overlay" style="display: none" class="fixed inset-0 z-50 bg-black/20"></div>
<div data-slot="drawer-content" style="display: none" class="${olum.esc(s())}">
  <div class="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-muted"></div>
  ${n.children}
</div>`,olum.injectStyle(`DrawerContent`,f.__style__()),olum.handleMarkup(`DrawerContent`,`60tnmry4oup`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ds=e=>{let t=e||`DrawerHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex shrink-0 flex-col gap-0.5 p-4 pb-0 text-center`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DrawerHeader`,`7odbskq2mq8`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DrawerHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="drawer-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DrawerHeader`,c.__style__()),olum.handleMarkup(`DrawerHeader`,`7odbskq2mq8`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Os=e=>{let t=e||`DrawerTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-base font-medium text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DrawerTitle`,`4tor0i0bkl9`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DrawerTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="drawer-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DrawerTitle`,c.__style__()),olum.handleMarkup(`DrawerTitle`,`4tor0i0bkl9`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ks=e=>{let t=e||`DrawerDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-balance text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DrawerDescription`,`ld8842amrxe`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DrawerDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="drawer-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DrawerDescription`,c.__style__()),olum.handleMarkup(`DrawerDescription`,`ld8842amrxe`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},As=e=>{let t=e||`DrawerFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`DrawerFooter`,`p44ce2w12bo`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`DrawerFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="drawer-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`DrawerFooter`,c.__style__()),olum.handleMarkup(`DrawerFooter`,`p44ce2w12bo`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},js=e=>{let t=e||`DrawerClose`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.querySelector(`button`),t=()=>{let e=Eo(u,`drawer`,`drawer-content`);e&&(e.checked=!1,e.dispatchEvent(new Event(`change`,{bubbles:!0})))};return e.addEventListener(`click`,t),()=>e.removeEventListener(`click`,t)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DrawerClose`,`6zcy50qozj4`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DrawerClose`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="drawer-close" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`DrawerClose`,f.__style__()),olum.handleMarkup(`DrawerClose`,`6zcy50qozj4`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ms=e=>{let t=e||`DropdownMenuLabel`,n=l(t),{inset:r=!1,class:i=``,children:a}=l(t),o=()=>q(`px-1.5 py-1 text-xs font-medium text-muted-foreground`,n.inset!==void 0&&n.inset?`pl-7`:``,n.class===void 0?``:n.class);var s=olum.mkElm(`div`,`DropdownMenuLabel`,`bfblo8d4a3v`),c={inset:n.inset!==void 0&&n.inset,className:n.class===void 0?``:n.class,children:n.children,classes:o},u={__style__(){return``},methods:{},props:{},compName:`DropdownMenuLabel`,deps:null,components:{},get getElm(){var e=s.isConnected?olum.vdom.mkStaging(s):s;return e.innerHTML=`
      <div data-slot="dropdown-menu-label" data-inset="${olum.esc(n.inset!==void 0&&n.inset)}" class="${olum.esc(o())}">${n.children}</div>`,olum.injectStyle(`DropdownMenuLabel`,u.__style__()),olum.handleMarkup(`DropdownMenuLabel`,`bfblo8d4a3v`,e,c)}};return{methods:u.methods,props:u.props,__OLUM__:u,el:s,methodsRef:c,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ns=e=>{let t=e||`DropdownMenuGroup`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`DropdownMenuGroup`,`9so7pnt9a4b`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`DropdownMenuGroup`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="dropdown-menu-group" role="group">${n.children}</div>`,olum.injectStyle(`DropdownMenuGroup`,o.__style__()),olum.handleMarkup(`DropdownMenuGroup`,`9so7pnt9a4b`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ps=e=>{let t=e||`DropdownMenuRadioGroup`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`DropdownMenuRadioGroup`,`xqgmik2lygt`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`DropdownMenuRadioGroup`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="dropdown-menu-radio-group" role="radiogroup">${n.children}</div>`,olum.injectStyle(`DropdownMenuRadioGroup`,o.__style__()),olum.handleMarkup(`DropdownMenuRadioGroup`,`xqgmik2lygt`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Fs=e=>{let t=e||`DropdownMenuRadioItem`,n=l(t),{name:r=`dropdown-radio`,value:i,defaultChecked:a=!1,inset:o=!1,disabled:s=!1,onCheckedChange:c,class:u=``,children:d}=l(t),f=()=>n.onCheckedChange&&n.onCheckedChange(n.value),p=`relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none hover:bg-muted has-checked:bg-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,m=()=>q(p,n.inset!==void 0&&n.inset?`pl-7`:``,n.class===void 0?``:n.class);var h=olum.mkElm(`div`,`DropdownMenuRadioItem`,`urvm3fa8al`),g={name:n.name===void 0?`dropdown-radio`:n.name,value:n.value,defaultChecked:n.defaultChecked!==void 0&&n.defaultChecked,inset:n.inset!==void 0&&n.inset,disabled:n.disabled!==void 0&&n.disabled,onCheckedChange:n.onCheckedChange,className:n.class===void 0?``:n.class,children:n.children,handleChange:f,classes:m},_={__style__(){return``},methods:{},props:{},compName:`DropdownMenuRadioItem`,deps:null,components:{},get getElm(){var e=h.isConnected?olum.vdom.mkStaging(h):h;return e.innerHTML=`
      <label data-slot="dropdown-menu-radio-item" data-inset="${olum.esc(n.inset!==void 0&&n.inset)}" class="${olum.esc(m())}">
  <input type="radio" name="${olum.esc(n.name===void 0?`dropdown-radio`:n.name)}" value="${olum.esc(n.value)}" class="peer sr-only" ${n.defaultChecked!==void 0&&n.defaultChecked?`checked`:``} ${n.disabled!==void 0&&n.disabled?`disabled`:``} data-o-event='onchange|handleChange=${JSON.stringify([])}'>
  <span class="pointer-events-none absolute right-2 hidden items-center justify-center peer-checked:flex">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
  </span>
  ${n.children}
</label>`,olum.injectStyle(`DropdownMenuRadioItem`,_.__style__()),olum.handleMarkup(`DropdownMenuRadioItem`,`urvm3fa8al`,e,g)}};return{methods:_.methods,props:_.props,__OLUM__:_,el:h,methodsRef:g,stateProps:null,localsRef:{get base(){return p}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Is=e=>{let t=e||`DropdownMenuSub`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`DropdownMenuSub`,`nef04a2i0gg`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`DropdownMenuSub`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="dropdown-menu-sub" class="relative [&_[data-slot=dropdown-menu-sub-content]]:hidden has-[>input:checked]:[&_[data-slot=dropdown-menu-sub-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`DropdownMenuSub`,o.__style__()),olum.handleMarkup(`DropdownMenuSub`,`nef04a2i0gg`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ls=e=>{let t=e||`DropdownMenuSubTrigger`,n=l(t),{inset:r=!1,class:i=``,children:a}=l(t);var s=o(()=>{let e=f.closest(`[data-slot="dropdown-menu-sub"]`),t=e&&e.querySelector(`:scope > input`),n=f.querySelector(`button`),r=e=>{t&&(t.checked=e,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},i=()=>r(!0),a=()=>r(!1);return n.addEventListener(`mouseenter`,i),n.addEventListener(`mouseleave`,a),()=>{n.removeEventListener(`mouseenter`,i),n.removeEventListener(`mouseleave`,a)}});let c=`flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,u=()=>q(c,n.inset!==void 0&&n.inset?`pl-7`:``,n.class===void 0?``:n.class);var d=olum.mkElm(`div`,`DropdownMenuSubTrigger`,`jiwcjbdqnpj`),f=d,p={inset:n.inset!==void 0&&n.inset,className:n.class===void 0?``:n.class,children:n.children,classes:u},m={__style__(){return``},methods:{},props:{},compName:`DropdownMenuSubTrigger`,deps:null,components:{},get getElm(){var e=d.isConnected?olum.vdom.mkStaging(d):d;return e.innerHTML=`
      <button type="button" data-slot="dropdown-menu-sub-trigger" data-inset="${olum.esc(n.inset!==void 0&&n.inset)}" class="${olum.esc(u())}">
  ${n.children}
  <svg class="ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
</button>`,olum.injectStyle(`DropdownMenuSubTrigger`,m.__style__()),olum.handleMarkup(`DropdownMenuSubTrigger`,`jiwcjbdqnpj`,e,p)}};return{methods:m.methods,props:m.props,__OLUM__:m,el:d,methodsRef:p,stateProps:null,localsRef:{get base(){return c}},hooks:{mounted:s===void 0?null:s,unMounted:null,isMounted:!1,isUnMounted:!1}}},Rs=e=>{let t=e||`DropdownMenuSubContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="dropdown-menu-sub"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`[data-slot="dropdown-menu-sub-content"]`),r=e=>{t&&(t.checked=e,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},i=()=>r(!0),a=()=>r(!1);return n.addEventListener(`mouseenter`,i),n.addEventListener(`mouseleave`,a),()=>{n.removeEventListener(`mouseenter`,i),n.removeEventListener(`mouseleave`,a)}});let s=()=>q(`absolute top-0 left-full z-50 ml-1 min-w-32 rounded-lg bg-background p-1 text-foreground shadow-md ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`DropdownMenuSubContent`,`d9m2ub9tvpn`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`DropdownMenuSubContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="dropdown-menu-sub-content" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`DropdownMenuSubContent`,f.__style__()),olum.handleMarkup(`DropdownMenuSubContent`,`d9m2ub9tvpn`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},zs=e=>{let t=e||`HoverCard`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`HoverCard`,`07pwhlnqklh`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`HoverCard`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="hover-card" class="relative inline-block [&_[data-slot=hover-card-content]]:hidden has-[>input:checked]:[&_[data-slot=hover-card-content]]:block">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`HoverCard`,o.__style__()),olum.handleMarkup(`HoverCard`,`07pwhlnqklh`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Bs=e=>{let t=e||`HoverCardTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="hover-card"]`),t=e&&e.querySelector(`:scope > input`),n=u.firstElementChild,r=e=>{t&&(t.checked=e,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},i=()=>r(!0),a=()=>r(!1);return n.addEventListener(`mouseenter`,i),n.addEventListener(`mouseleave`,a),()=>{n.removeEventListener(`mouseenter`,i),n.removeEventListener(`mouseleave`,a)}});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`HoverCardTrigger`,`cjatid7bg1g`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`HoverCardTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <span data-slot="hover-card-trigger" class="${olum.esc(s())}">${n.children}</span>`,olum.injectStyle(`HoverCardTrigger`,f.__style__()),olum.handleMarkup(`HoverCardTrigger`,`cjatid7bg1g`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Vs=e=>{let t=e||`HoverCardContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`absolute top-full left-1/2 z-50 mt-1 w-64 -translate-x-1/2 rounded-lg bg-background p-2.5 text-sm text-foreground shadow-md ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`HoverCardContent`,`ftogymolwqe`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`HoverCardContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="hover-card-content" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`HoverCardContent`,c.__style__()),olum.handleMarkup(`HoverCardContent`,`ftogymolwqe`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Hs=e=>{let t=e||`Popover`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`Popover`,`df6pbw26n1b`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`Popover`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="popover" class="relative inline-block [&_[data-slot=popover-content]]:hidden has-[>input:checked]:[&_[data-slot=popover-content]]:flex">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`Popover`,o.__style__()),olum.handleMarkup(`Popover`,`df6pbw26n1b`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Us=e=>{let t=e||`PopoverTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="popover"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`PopoverTrigger`,`feen6b0rpgw`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`PopoverTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="popover-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`PopoverTrigger`,f.__style__()),olum.handleMarkup(`PopoverTrigger`,`feen6b0rpgw`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ws=e=>{let t=e||`PopoverContent`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="popover"]`),t=e&&e.querySelector(`:scope > input`),n=()=>{t&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},r=t=>{e&&!e.contains(t.target)&&n()},i=e=>{e.key===`Escape`&&t&&t.checked&&n()};return document.addEventListener(`click`,r),document.addEventListener(`keydown`,i),()=>{document.removeEventListener(`click`,r),document.removeEventListener(`keydown`,i)}});let s=()=>q(`absolute top-full left-1/2 z-50 mt-1 w-72 -translate-x-1/2 flex-col gap-2.5 rounded-lg bg-background p-2.5 text-sm text-foreground shadow-md ring-1 ring-border outline-none`,n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`PopoverContent`,`c6u18aqo5wu`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`PopoverContent`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <div data-slot="popover-content" class="${olum.esc(s())}">${n.children}</div>`,olum.injectStyle(`PopoverContent`,f.__style__()),olum.handleMarkup(`PopoverContent`,`c6u18aqo5wu`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Gs=e=>{let t=e||`PopoverHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-0.5 text-sm`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`PopoverHeader`,`ihe4f8wl59`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`PopoverHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="popover-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`PopoverHeader`,c.__style__()),olum.handleMarkup(`PopoverHeader`,`ihe4f8wl59`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ks=e=>{let t=e||`PopoverTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-medium`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`PopoverTitle`,`0nggcozrklzo`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`PopoverTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="popover-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`PopoverTitle`,c.__style__()),olum.handleMarkup(`PopoverTitle`,`0nggcozrklzo`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},qs=e=>{let t=e||`PopoverDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`PopoverDescription`,`tz66tu8bdk`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`PopoverDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="popover-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`PopoverDescription`,c.__style__()),olum.handleMarkup(`PopoverDescription`,`tz66tu8bdk`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Js=e=>{let t=e||`Sheet`,n=l(t),{defaultOpen:r=!1,children:i}=l(t);var a=olum.mkElm(`div`,`Sheet`,`k4fu67gwt8`),o={defaultOpen:n.defaultOpen!==void 0&&n.defaultOpen,children:n.children},s={__style__(){return``},methods:{},props:{},compName:`Sheet`,deps:null,components:{},get getElm(){var e=a.isConnected?olum.vdom.mkStaging(a):a;return e.innerHTML=`
      <div data-slot="sheet" class="contents">
  <input type="checkbox" class="hidden" ${n.defaultOpen!==void 0&&n.defaultOpen?`checked`:``}>
  ${n.children}
</div>`,olum.injectStyle(`Sheet`,s.__style__()),olum.handleMarkup(`Sheet`,`k4fu67gwt8`,e,o)}};return{methods:s.methods,props:s.props,__OLUM__:s,el:a,methodsRef:o,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Ys=e=>{let t=e||`SheetTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="sheet"]`),t=e&&e.querySelector(`:scope > input`),n=u.querySelector(`button`),r=()=>{t&&(t.checked=!0,t.dispatchEvent(new Event(`change`,{bubbles:!0})))};return n.addEventListener(`click`,r),()=>n.removeEventListener(`click`,r)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`SheetTrigger`,`1hlpoamznjk`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`SheetTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="sheet-trigger" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`SheetTrigger`,f.__style__()),olum.handleMarkup(`SheetTrigger`,`1hlpoamznjk`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},Xs=e=>{let t=e||`SheetContent`,n=l(t),{side:r=`right`,showCloseButton:i=!0,class:a=``,children:s}=l(t);var c=o(()=>{let e=m.closest(`[data-slot="sheet"]`),t=e&&e.querySelector(`:scope > input`),n=m.querySelector(`[data-slot="sheet-overlay"]`),r=m.querySelector(`[data-slot="sheet-content"]`),i=m.querySelector(`[data-builtin-close]`);if(!t||!n||!r)return;r.__olumModalInput=t;let a=()=>{t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0}))},o=e=>{e.key===`Escape`&&t.checked&&a()},s=e=>{e.target===n&&a()},c=()=>{var e=t.checked?`open`:`closed`;n.setAttribute(`data-state`,e),r.setAttribute(`data-state`,e)};i&&i.addEventListener(`click`,a),n.addEventListener(`click`,s),document.addEventListener(`keydown`,o);let l=Do({input:t,nodes:[n,r],onOpen:c,onClose:c});return c(),()=>{i&&i.removeEventListener(`click`,a),n.removeEventListener(`click`,s),document.removeEventListener(`keydown`,o),l()}});let u=`z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm text-foreground shadow-lg fixed pointer-events-none transition-transform duration-300 ease-in-out data-[state=open]:pointer-events-auto [&>[data-olum]]:contents`,d={top:`inset-x-0 top-0 h-auto border-b -translate-y-full data-[state=open]:translate-y-0`,bottom:`inset-x-0 bottom-0 h-auto border-t translate-y-full data-[state=open]:translate-y-0`,left:`inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm -translate-x-full data-[state=open]:translate-x-0`,right:`inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm translate-x-full data-[state=open]:translate-x-0`},f=()=>q(u,d[n.side===void 0?`right`:n.side]||d.right,n.class===void 0?``:n.class);var p=olum.mkElm(`div`,`SheetContent`,`ixexnc0mihr`),m=p,h={side:n.side===void 0?`right`:n.side,showCloseButton:n.showCloseButton===void 0||n.showCloseButton,className:n.class===void 0?``:n.class,children:n.children,classes:f},g={__style__(){return``},methods:{},props:{},compName:`SheetContent`,deps:null,components:{},get getElm(){var e=p.isConnected?olum.vdom.mkStaging(p):p;return e.innerHTML=`
      <div data-slot="sheet-overlay" class="fixed inset-0 z-50 bg-black/20 pointer-events-none opacity-0 transition-opacity duration-300 ease-in-out data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"></div>
<div data-slot="sheet-content" data-side="${olum.esc(n.side===void 0?`right`:n.side)}" class="${olum.esc(f())}">
  ${n.children}
  ${n.showCloseButton===void 0||n.showCloseButton?`
    <button type="button" data-builtin-close="" class="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-lg hover:bg-muted">
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      <span class="sr-only">Close</span>
    </button>
  `:``}
</div>`,olum.injectStyle(`SheetContent`,g.__style__()),olum.handleMarkup(`SheetContent`,`ixexnc0mihr`,e,h)}};return{methods:g.methods,props:g.props,__OLUM__:g,el:p,methodsRef:h,stateProps:null,localsRef:{get base(){return u},get sides(){return d}},hooks:{mounted:c===void 0?null:c,unMounted:null,isMounted:!1,isUnMounted:!1}}},Zs=e=>{let t=e||`SheetHeader`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`flex flex-col gap-0.5 p-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SheetHeader`,`2y1a4rg07vg`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SheetHeader`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sheet-header" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SheetHeader`,c.__style__()),olum.handleMarkup(`SheetHeader`,`2y1a4rg07vg`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},Qs=e=>{let t=e||`SheetTitle`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`font-heading text-base font-medium text-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SheetTitle`,`itiyz4al0w`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SheetTitle`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sheet-title" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SheetTitle`,c.__style__()),olum.handleMarkup(`SheetTitle`,`itiyz4al0w`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},$s=e=>{let t=e||`SheetDescription`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`text-sm text-muted-foreground`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SheetDescription`,`859g0alwj59`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SheetDescription`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sheet-description" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SheetDescription`,c.__style__()),olum.handleMarkup(`SheetDescription`,`859g0alwj59`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ec=e=>{let t=e||`SheetFooter`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`mt-auto flex flex-col gap-2 p-4`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`SheetFooter`,`ichf3g0ne2c`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`SheetFooter`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="sheet-footer" class="${olum.esc(a())}">${n.children}</div>`,olum.injectStyle(`SheetFooter`,c.__style__()),olum.handleMarkup(`SheetFooter`,`ichf3g0ne2c`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},tc=e=>{let t=e||`SheetClose`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.querySelector(`button`),t=()=>{let e=Eo(u,`sheet`,`sheet-content`);e&&(e.checked=!1,e.dispatchEvent(new Event(`change`,{bubbles:!0})))};return e.addEventListener(`click`,t),()=>e.removeEventListener(`click`,t)});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`SheetClose`,`26ow98y0do1`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`SheetClose`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <button type="button" data-slot="sheet-close" class="${olum.esc(s())}">${n.children}</button>`,olum.injectStyle(`SheetClose`,f.__style__()),olum.handleMarkup(`SheetClose`,`26ow98y0do1`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},nc=e=>{let t=e||`Tooltip`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`Tooltip`,`neldumnvayk`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`Tooltip`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="tooltip" class="relative inline-block [&_[data-slot=tooltip-content]]:invisible [&_[data-slot=tooltip-content]]:scale-95 [&_[data-slot=tooltip-content]]:opacity-0 has-[>input:checked]:[&_[data-slot=tooltip-content]]:visible has-[>input:checked]:[&_[data-slot=tooltip-content]]:scale-100 has-[>input:checked]:[&_[data-slot=tooltip-content]]:opacity-100">
  <input type="checkbox" class="hidden">
  ${n.children}
</div>`,olum.injectStyle(`Tooltip`,o.__style__()),olum.handleMarkup(`Tooltip`,`neldumnvayk`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},rc=e=>{let t=e||`TooltipProvider`,n=l(t),{children:r}=l(t);var i=olum.mkElm(`div`,`TooltipProvider`,`iz8ckp5s4o`),a={children:n.children},o={__style__(){return``},methods:{},props:{},compName:`TooltipProvider`,deps:null,components:{},get getElm(){var e=i.isConnected?olum.vdom.mkStaging(i):i;return e.innerHTML=`
      <div data-slot="tooltip-provider" class="contents">${n.children}</div>`,olum.injectStyle(`TooltipProvider`,o.__style__()),olum.handleMarkup(`TooltipProvider`,`iz8ckp5s4o`,e,a)}};return{methods:o.methods,props:o.props,__OLUM__:o,el:i,methodsRef:a,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},ic=e=>{let t=e||`TooltipTrigger`,n=l(t),{class:r=``,children:i}=l(t);var a=o(()=>{let e=u.closest(`[data-slot="tooltip"]`),t=e&&e.querySelector(`:scope > input`),n=u.firstElementChild,r=e=>{t&&(t.checked=e,t.dispatchEvent(new Event(`change`,{bubbles:!0})))},i=()=>r(!0),a=()=>r(!1),o=()=>r(!0),s=()=>r(!1);return n.addEventListener(`mouseenter`,i),n.addEventListener(`mouseleave`,a),n.addEventListener(`focus`,o),n.addEventListener(`blur`,s),()=>{n.removeEventListener(`mouseenter`,i),n.removeEventListener(`mouseleave`,a),n.removeEventListener(`focus`,o),n.removeEventListener(`blur`,s)}});let s=()=>q(n.class===void 0?``:n.class);var c=olum.mkElm(`div`,`TooltipTrigger`,`tcdkjxh0k6g`),u=c,d={className:n.class===void 0?``:n.class,children:n.children,classes:s},f={__style__(){return``},methods:{},props:{},compName:`TooltipTrigger`,deps:null,components:{},get getElm(){var e=c.isConnected?olum.vdom.mkStaging(c):c;return e.innerHTML=`
      <span data-slot="tooltip-trigger" class="${olum.esc(s())}">${n.children}</span>`,olum.injectStyle(`TooltipTrigger`,f.__style__()),olum.handleMarkup(`TooltipTrigger`,`tcdkjxh0k6g`,e,d)}};return{methods:f.methods,props:f.props,__OLUM__:f,el:c,methodsRef:d,stateProps:null,localsRef:{},hooks:{mounted:a===void 0?null:a,unMounted:null,isMounted:!1,isUnMounted:!1}}},ac=e=>{let t=e||`TooltipContent`,n=l(t),{class:r=``,children:i}=l(t),a=()=>q(`absolute bottom-full left-1/2 z-50 mb-1.5 inline-flex w-fit max-w-xs -translate-x-1/2 items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background whitespace-nowrap transition-[opacity,transform] duration-300 ease-out`,n.class===void 0?``:n.class);var o=olum.mkElm(`div`,`TooltipContent`,`90l6pukvzhf`),s={className:n.class===void 0?``:n.class,children:n.children,classes:a},c={__style__(){return``},methods:{},props:{},compName:`TooltipContent`,deps:null,components:{},get getElm(){var e=o.isConnected?olum.vdom.mkStaging(o):o;return e.innerHTML=`
      <div data-slot="tooltip-content" role="tooltip" class="${olum.esc(a())}">
  ${n.children}
  <div class="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-foreground"></div>
</div>`,olum.injectStyle(`TooltipContent`,c.__style__()),olum.handleMarkup(`TooltipContent`,`90l6pukvzhf`,e,s)}};return{methods:c.methods,props:c.props,__OLUM__:c,el:o,methodsRef:s,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},oc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`,sc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,cc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12m8-8L8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`,lc=e=>{let t=e||`page`,n=()=>console.log(`deleted`);var r=olum.mkElm(`div`,`page`,`zd72z799duq`),i={confirmDelete:n},a={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,Icon:Y,Button:J,Avatar:$n,AvatarFallback:er,AlertDialog:is,AlertDialogTrigger:as,AlertDialogContent:os,AlertDialogHeader:ss,AlertDialogTitle:cs,AlertDialogDescription:ls,AlertDialogFooter:us,AlertDialogCancel:ds,AlertDialogAction:fs,ContextMenu:ps,ContextMenuTrigger:ms,ContextMenuContent:hs,DropdownMenuItem:No,DropdownMenu:Mr,DropdownMenuSeparator:Po,Dialog:gs,DialogTrigger:_s,DialogContent:vs,DialogHeader:ys,DialogTitle:bs,DialogDescription:xs,DialogFooter:Ss,DialogClose:Cs,Drawer:ws,DrawerTrigger:Ts,DrawerContent:Es,DrawerHeader:Ds,DrawerTitle:Os,DrawerDescription:ks,DrawerFooter:As,DrawerClose:js,DropdownMenuTrigger:Nr,DropdownMenuContent:Pr,DropdownMenuLabel:Ms,DropdownMenuGroup:Ns,DropdownMenuCheckboxItem:Fr,DropdownMenuRadioGroup:Ps,DropdownMenuRadioItem:Fs,DropdownMenuSub:Is,DropdownMenuSubTrigger:Ls,DropdownMenuSubContent:Rs,HoverCard:zs,HoverCardTrigger:Bs,HoverCardContent:Vs,Popover:Hs,PopoverTrigger:Us,PopoverContent:Ws,PopoverHeader:Gs,PopoverTitle:Ks,PopoverDescription:qs,Sheet:Js,SheetTrigger:Ys,SheetContent:Xs,SheetHeader:Zs,SheetTitle:Qs,SheetDescription:$s,SheetFooter:ec,SheetClose:tc,Tooltip:nc,TooltipProvider:rc,TooltipTrigger:ic,TooltipContent:ac},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <h1 class="mb-2 font-heading text-2xl font-semibold text-foreground">UI Kit — Overlay</h1>
  <p class="mb-8 max-w-2xl text-sm text-muted-foreground">
    All portal-based — moved into <code class="rounded bg-muted px-1 py-0.5 text-xs">&lt;body&gt;</code> on open via the shared <code class="rounded bg-muted px-1 py-0.5 text-xs">portal.js</code>, which blurs the app root behind them with a real
    <code class="rounded bg-muted px-1 py-0.5 text-xs">filter: blur()</code>.
  </p>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Alert Dialog</h2>
      <p class="mb-4 text-xs text-muted-foreground">Confirms something consequential — not dismissible by clicking outside.</p>
      <olum name="AlertDialog">
        <olum name="AlertDialogTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`destructive`,size:`sm`})).replace(/'/g,`%27`)}'>Delete item</olum>
        </olum>
        <olum name="AlertDialogContent">
          <olum name="AlertDialogHeader">
            <olum name="AlertDialogTitle">Delete this item?</olum>
            <olum name="AlertDialogDescription">This action can't be undone. This will permanently remove the item.</olum>
          </olum>
          <olum name="AlertDialogFooter">
            <olum name="AlertDialogCancel">Cancel</olum>
            <olum name="AlertDialogAction" data-o-props-src="onclick:method:confirmDelete" data-o-props-owner='${t}'>Delete</olum>
          </olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Context Menu</h2>
      <p class="mb-4 text-xs text-muted-foreground">Right-click the box below.</p>
      <olum name="ContextMenu">
        <olum name="ContextMenuTrigger">
          <div class="flex h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">Right-click here</div>
        </olum>
        <olum name="ContextMenuContent">
          <olum name="DropdownMenuItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:ct,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Copy</span></olum>
          <olum name="DropdownMenuItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:sc,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Paste</span></olum>
          <olum name="DropdownMenuItem"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:cc,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Cut</span></olum>
          <olum name="DropdownMenuSeparator"></olum>
          <olum name="DropdownMenuItem" data-o-props='${encodeURIComponent(JSON.stringify({variant:`destructive`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:kn,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>Delete</span></olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Dialog</h2>
      <p class="mb-4 text-xs text-muted-foreground">A simple modal window, dismissible by Escape or an outside click.</p>
      <olum name="Dialog">
        <olum name="DialogTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Edit profile</olum>
        </olum>
        <olum name="DialogContent">
          <olum name="DialogHeader">
            <olum name="DialogTitle">Edit profile</olum>
            <olum name="DialogDescription">Make changes to your profile here.</olum>
          </olum>
          <olum name="DialogFooter">
            <olum name="DialogClose"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Cancel</olum></olum>
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}'>Save changes</olum>
          </olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Drawer</h2>
      <p class="mb-4 text-xs text-muted-foreground">Slides up from the bottom edge, draggable-style handle bar.</p>
      <olum name="Drawer">
        <olum name="DrawerTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Open drawer</olum>
        </olum>
        <olum name="DrawerContent">
          <olum name="DrawerHeader">
            <olum name="DrawerTitle">Move goal</olum>
            <olum name="DrawerDescription">Set your daily activity goal.</olum>
          </olum>
          <olum name="DrawerFooter">
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({size:`sm`})).replace(/'/g,`%27`)}'>Submit</olum>
            <olum name="DrawerClose"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Cancel</olum></olum>
          </olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Dropdown Menu</h2>
      <p class="mb-4 text-xs text-muted-foreground">Checkbox items, a radio group, and a nested submenu.</p>
      <olum name="DropdownMenu">
        <olum name="DropdownMenuTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon`,ariaLabel:`Open menu`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:oc,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
        </olum>
        <olum name="DropdownMenuContent">
          <olum name="DropdownMenuLabel">Appearance</olum>
          <olum name="DropdownMenuGroup">
            <olum name="DropdownMenuCheckboxItem" data-o-props='${encodeURIComponent(JSON.stringify({defaultChecked:!0})).replace(/'/g,`%27`)}'>Show status bar</olum>
            <olum name="DropdownMenuCheckboxItem">Show activity bar</olum>
          </olum>
          <olum name="DropdownMenuSeparator"></olum>
          <olum name="DropdownMenuRadioGroup">
            <olum name="DropdownMenuRadioItem" data-o-props='${encodeURIComponent(JSON.stringify({name:`ov-density`,value:`compact`})).replace(/'/g,`%27`)}'>Compact</olum>
            <olum name="DropdownMenuRadioItem" data-o-props='${encodeURIComponent(JSON.stringify({name:`ov-density`,value:`comfortable`,defaultChecked:!0})).replace(/'/g,`%27`)}'>Comfortable</olum>
          </olum>
          <olum name="DropdownMenuSeparator"></olum>
          <olum name="DropdownMenuSub">
            <olum name="DropdownMenuSubTrigger"><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$a,class:`size-4`})).replace(/'/g,`%27`)}'></olum><span>More tools</span></olum>
            <olum name="DropdownMenuSubContent">
              <olum name="DropdownMenuItem">Extensions</olum>
              <olum name="DropdownMenuItem">Task Manager</olum>
            </olum>
          </olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Hover Card</h2>
      <p class="mb-4 text-xs text-muted-foreground">Hover the link to preview a small card.</p>
      <olum name="HoverCard">
        <olum name="HoverCardTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`link`,size:`sm`})).replace(/'/g,`%27`)}'>@olumjs</olum>
        </olum>
        <olum name="HoverCardContent">
          <div class="flex gap-3">
            <olum name="Avatar"><olum name="AvatarFallback">OL</olum></olum>
            <div>
              <p class="text-sm font-medium text-foreground">Olum</p>
              <p class="text-xs text-muted-foreground">A small, Vue-like JavaScript framework.</p>
            </div>
          </div>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Popover</h2>
      <p class="mb-4 text-xs text-muted-foreground">Click-triggered floating content, richer than a tooltip.</p>
      <olum name="Popover">
        <olum name="PopoverTrigger">
          <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Open popover</olum>
        </olum>
        <olum name="PopoverContent">
          <olum name="PopoverHeader">
            <olum name="PopoverTitle">Dimensions</olum>
            <olum name="PopoverDescription">Set the dimensions for the layer.</olum>
          </olum>
        </olum>
      </olum>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Sheet</h2>
      <p class="mb-4 text-xs text-muted-foreground">Side-anchored panel — pick an edge.</p>
      <div class="flex flex-wrap gap-2">
        <olum name="Sheet">
          <olum name="SheetTrigger"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Right</olum></olum>
          <olum name="SheetContent" data-o-props='${encodeURIComponent(JSON.stringify({side:`right`})).replace(/'/g,`%27`)}'>
            <olum name="SheetHeader">
              <olum name="SheetTitle">Right sheet</olum>
              <olum name="SheetDescription">Anchored to the right edge.</olum>
            </olum>
            <olum name="SheetFooter"><olum name="SheetClose"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Close</olum></olum></olum>
          </olum>
        </olum>
        <olum name="Sheet">
          <olum name="SheetTrigger"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Left</olum></olum>
          <olum name="SheetContent" data-o-props='${encodeURIComponent(JSON.stringify({side:`left`})).replace(/'/g,`%27`)}'>
            <olum name="SheetHeader">
              <olum name="SheetTitle">Left sheet</olum>
              <olum name="SheetDescription">Anchored to the left edge.</olum>
            </olum>
            <olum name="SheetFooter"><olum name="SheetClose"><olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`sm`})).replace(/'/g,`%27`)}'>Close</olum></olum></olum>
          </olum>
        </olum>
      </div>
    </div>

    <div class="rounded-xl border border-border p-6">
      <h2 class="mb-1 text-sm font-semibold text-foreground">Tooltip</h2>
      <p class="mb-4 text-xs text-muted-foreground">Hover or focus the button. A shared Provider wraps every tooltip on this page.</p>
      <olum name="TooltipProvider">
        <olum name="Tooltip">
          <olum name="TooltipTrigger">
            <olum name="Button" data-o-props='${encodeURIComponent(JSON.stringify({variant:`outline`,size:`icon`,ariaLabel:`Settings`})).replace(/'/g,`%27`)}'><olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:$a,class:`size-4`})).replace(/'/g,`%27`)}'></olum></olum>
          </olum>
          <olum name="TooltipContent">Settings</olum>
        </olum>
      </olum>
    </div>
  </div>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,a.__style__()),olum.handleMarkup(`page`,`zd72z799duq`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}},uc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"/></svg>`,dc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,fc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/></svg>`,pc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>`,mc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,hc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,gc=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19h8M4 17l6-6-6-6"/></svg>`,_c=`<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>`,vc=new f({mode:`history`,root:`/`,err:`/404`,routes:[{path:`/`,comp:gn},{path:`/binding`,comp:Ct},{path:`/blog/:slug`,comp:Dt},{path:`/blog`,comp:Lt},{path:`/composition`,comp:Kt},{path:`/control-flow`,comp:Zt},{path:`/lifecycle`,comp:rn},{path:`/reactivity`,comp:Sn},{path:`/store`,comp:Fn},{path:`/transitions`,comp:Bn},{path:`/ui/data-display`,comp:vi},{path:`/ui/feedback`,comp:Ii},{path:`/ui/forms`,comp:ja},{path:`/ui/layout`,comp:to},{path:`/ui/navigation`,comp:rs},{path:`/ui/overlay`,comp:lc},{path:`/ui`,comp:e=>{let t=[{to:`/ui/forms`,icon:uc,title:`Forms`,desc:`Input, Select, Checkbox, Slider, Field, OTP, and every other data-entry component.`},{to:`/ui/layout`,icon:dc,title:`Layout`,desc:`Card, Sidebar, Resizable, ScrollArea, AspectRatio, Separator, Direction.`},{to:`/ui/navigation`,icon:fc,title:`Navigation`,desc:`Tabs, Breadcrumb, Pagination, Command, Menubar, NavigationMenu, Anchor.`},{to:`/ui/overlay`,icon:St,title:`Overlay`,desc:`Dialog, Drawer, Sheet, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, AlertDialog.`},{to:`/ui/feedback`,icon:pc,title:`Feedback`,desc:`Alert, Empty, Progress, Skeleton, Spinner, Toast.`},{to:`/ui/data-display`,icon:mc,title:`Data Display`,desc:`Table, DataTable, Chart, Accordion, Avatar, Carousel, Message, and more.`}],n=[{icon:hc,title:`58 Components`,desc:`Every primitive you need, from Button to DataTable.`},{icon:pn,title:`6 Categories`,desc:`Forms, Layout, Navigation, Overlay, Feedback, Data Display.`},{icon:gc,title:`One Command`,desc:`olum add <name> installs a component's source into your project.`},{icon:_c,title:`Yours to Edit`,desc:`Installed components are plain .html files you own, not a black box.`}];var r=olum.mkElm(`div`,`page`,`hufoqpges1g`),i={},a={__style__(){return``},methods:{},props:{},compName:`page`,deps:null,components:{Nav:X,FeatureSidebar:Z,SiteFooter:Q,PageHero:st,WhyYoullLoveIt:mt,FeaturePager:gt,Icon:Y,Card:Ot,CardHeader:kt,CardTitle:At,CardDescription:jt,CardFooter:sn},get getElm(){var e=r.isConnected?olum.vdom.mkStaging(r):r;return e.innerHTML=`
      <olum name="Nav"></olum>

<div class="mx-auto flex max-w-[1400px]">
<olum name="FeatureSidebar" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
<main class="min-w-0 flex-1 px-6 py-12 lg:px-10">
  <olum name="PageHero" data-o-props='${encodeURIComponent(JSON.stringify({index:9,icon:pn,title:`UI Kit`})).replace(/'/g,`%27`)}'>
    <p class="font-medium text-foreground">58 components, 6 categories</p>
    <p class="mt-2">
      Every component in the registry, installed with <code class="rounded bg-muted px-1.5 py-0.5 text-sm">olum add &lt;name&gt;</code> and wired up here as a
      working demo rather than a static screenshot. Pick a category to browse.
    </p>
  </olum>

  <section class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    ${t.map(function(e){return`
      
      <olum name="Card" data-o-props='${encodeURIComponent(JSON.stringify({class:`group relative h-full transition-colors hover:ring-brand/40`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}">
        <olum name="CardHeader" data-o-key="${olum.esc(e.to)}">
          <div class="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:e.icon,class:`size-4.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}"></olum>
          </div>
          <olum name="CardTitle" data-o-key="${olum.esc(e.to)}">${olum.esc(e.title)}</olum>
          <olum name="CardDescription" data-o-key="${olum.esc(e.to)}">${olum.esc(e.desc)}</olum>
        </olum>
        <olum name="CardFooter" data-o-props='${encodeURIComponent(JSON.stringify({class:`border-t-0 bg-transparent pt-0`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}">
          <span class="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
            Browse <olum name="Icon" data-o-props='${encodeURIComponent(JSON.stringify({icon:it,class:`size-3.5`})).replace(/'/g,`%27`)}' data-o-key="${olum.esc(e.to)}"></olum>
          </span>
        </olum>
        <a to="${olum.esc(e.to)}" class="absolute inset-0" aria-label="${olum.esc(e.title)}"></a>
      </olum>
    `}).join(``)}
  </section>

  <olum name="WhyYoullLoveIt" data-o-props='${encodeURIComponent(JSON.stringify({items:n})).replace(/'/g,`%27`)}'></olum>
  <olum name="FeaturePager" data-o-props='${encodeURIComponent(JSON.stringify({active:`ui-kit`})).replace(/'/g,`%27`)}'></olum>
</main>
</div>

<olum name="SiteFooter"></olum>`,olum.injectStyle(`page`,a.__style__()),olum.handleMarkup(`page`,`hufoqpges1g`,e,i)}};return{methods:a.methods,props:a.props,__OLUM__:a,el:r,methodsRef:i,stateProps:null,localsRef:{get categories(){return t},get loveItems(){return n}},hooks:{mounted:typeof mounted<`u`?mounted:null,unMounted:null,isMounted:!1,isUnMounted:!1}}}},{path:`/404`,comp:on}]});new a().$(`#app`).use(vc);