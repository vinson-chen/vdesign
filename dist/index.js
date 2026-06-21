import * as i from "react";
import rt, { useLayoutEffect as Pl, useState as Tl } from "react";
import * as Bt from "react-dom";
import Nl from "react-dom";
function Rs(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Rs(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function Ps() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Rs(e)) && (o && (o += " "), o += t);
  return o;
}
const Il = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    n[o] = e[o];
  for (let o = 0; o < t.length; o++)
    n[e.length + o] = t[o];
  return n;
}, Al = (e, t) => ({
  classGroupId: e,
  validator: t
}), Ts = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), _n = "-", Or = [], Ol = "arbitrary..", jl = (e) => {
  const t = Dl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return _l(a);
      const l = a.split(_n), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return Ns(l, c, t);
    },
    getConflictingClassGroupIds: (a, l) => {
      if (l) {
        const c = o[a], u = n[a];
        return c ? u ? Il(u, c) : c : u || Or;
      }
      return n[a] || Or;
    }
  };
}, Ns = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const r = e[t], s = n.nextPart.get(r);
  if (s) {
    const u = Ns(e, t + 1, s);
    if (u) return u;
  }
  const a = n.validators;
  if (a === null)
    return;
  const l = t === 0 ? e.join(_n) : e.slice(t).join(_n), c = a.length;
  for (let u = 0; u < c; u++) {
    const f = a[u];
    if (f.validator(l))
      return f.classGroupId;
  }
}, _l = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), o = t.slice(0, n);
  return o ? Ol + o : void 0;
})(), Dl = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Ml(n, t);
}, Ml = (e, t) => {
  const n = Ts();
  for (const o in e) {
    const r = e[o];
    tr(r, n, o, t);
  }
  return n;
}, tr = (e, t, n, o) => {
  const r = e.length;
  for (let s = 0; s < r; s++) {
    const a = e[s];
    $l(a, t, n, o);
  }
}, $l = (e, t, n, o) => {
  if (typeof e == "string") {
    Ll(e, t, n);
    return;
  }
  if (typeof e == "function") {
    zl(e, t, n, o);
    return;
  }
  Fl(e, t, n, o);
}, Ll = (e, t, n) => {
  const o = e === "" ? t : Is(t, e);
  o.classGroupId = n;
}, zl = (e, t, n, o) => {
  if (Wl(e)) {
    tr(e(o), t, n, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Al(n, e));
}, Fl = (e, t, n, o) => {
  const r = Object.entries(e), s = r.length;
  for (let a = 0; a < s; a++) {
    const [l, c] = r[a];
    tr(c, Is(t, l), n, o);
  }
}, Is = (e, t) => {
  let n = e;
  const o = t.split(_n), r = o.length;
  for (let s = 0; s < r; s++) {
    const a = o[s];
    let l = n.nextPart.get(a);
    l || (l = Ts(), n.nextPart.set(a, l)), n = l;
  }
  return n;
}, Wl = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Vl = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const r = (s, a) => {
    n[s] = a, t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let a = n[s];
      if (a !== void 0)
        return a;
      if ((a = o[s]) !== void 0)
        return r(s, a), a;
    },
    set(s, a) {
      s in n ? n[s] = a : r(s, a);
    }
  };
}, Lo = "!", jr = ":", Hl = [], _r = (e, t, n, o, r) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: o,
  isExternal: r
}), Bl = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, l = 0, c = 0, u;
    const f = r.length;
    for (let m = 0; m < f; m++) {
      const x = r[m];
      if (a === 0 && l === 0) {
        if (x === jr) {
          s.push(r.slice(c, m)), c = m + 1;
          continue;
        }
        if (x === "/") {
          u = m;
          continue;
        }
      }
      x === "[" ? a++ : x === "]" ? a-- : x === "(" ? l++ : x === ")" && l--;
    }
    const p = s.length === 0 ? r : r.slice(c);
    let g = p, h = !1;
    p.endsWith(Lo) ? (g = p.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Lo) && (g = p.slice(1), h = !0)
    );
    const v = u && u > c ? u - c : void 0;
    return _r(s, h, g, v);
  };
  if (t) {
    const r = t + jr, s = o;
    o = (a) => a.startsWith(r) ? s(a.slice(r.length)) : _r(Hl, !1, a, void 0, !0);
  }
  if (n) {
    const r = o;
    o = (s) => n({
      className: s,
      parseClassName: r
    });
  }
  return o;
}, Ul = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, o) => {
    t.set(n, 1e6 + o);
  }), (n) => {
    const o = [];
    let r = [];
    for (let s = 0; s < n.length; s++) {
      const a = n[s], l = a[0] === "[", c = t.has(a);
      l || c ? (r.length > 0 && (r.sort(), o.push(...r), r = []), o.push(a)) : r.push(a);
    }
    return r.length > 0 && (r.sort(), o.push(...r)), o;
  };
}, Gl = (e) => ({
  cache: Vl(e.cacheSize),
  parseClassName: Bl(e),
  sortModifiers: Ul(e),
  postfixLookupClassGroupIds: Kl(e),
  ...jl(e)
}), Kl = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let o = 0; o < n.length; o++)
      t[n[o]] = !0;
  return t;
}, Yl = /\s+/, Xl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s,
    postfixLookupClassGroupIds: a
  } = t, l = [], c = e.trim().split(Yl);
  let u = "";
  for (let f = c.length - 1; f >= 0; f -= 1) {
    const p = c[f], {
      isExternal: g,
      modifiers: h,
      hasImportantModifier: v,
      baseClassName: m,
      maybePostfixModifierPosition: x
    } = n(p);
    if (g) {
      u = p + (u.length > 0 ? " " + u : u);
      continue;
    }
    let w = !!x, b;
    if (w) {
      const S = m.substring(0, x);
      b = o(S);
      const R = b && a[b] ? o(m) : void 0;
      R && R !== b && (b = R, w = !1);
    } else
      b = o(m);
    if (!b) {
      if (!w) {
        u = p + (u.length > 0 ? " " + u : u);
        continue;
      }
      if (b = o(m), !b) {
        u = p + (u.length > 0 ? " " + u : u);
        continue;
      }
      w = !1;
    }
    const y = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), C = v ? y + Lo : y, E = C + b;
    if (l.indexOf(E) > -1)
      continue;
    l.push(E);
    const P = r(b, w);
    for (let S = 0; S < P.length; ++S) {
      const R = P[S];
      l.push(C + R);
    }
    u = p + (u.length > 0 ? " " + u : u);
  }
  return u;
}, ql = (...e) => {
  let t = 0, n, o, r = "";
  for (; t < e.length; )
    (n = e[t++]) && (o = As(n)) && (r && (r += " "), r += o);
  return r;
}, As = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = As(e[o])) && (n && (n += " "), n += t);
  return n;
}, Zl = (e, ...t) => {
  let n, o, r, s;
  const a = (c) => {
    const u = t.reduce((f, p) => p(f), e());
    return n = Gl(u), o = n.cache.get, r = n.cache.set, s = l, l(c);
  }, l = (c) => {
    const u = o(c);
    if (u)
      return u;
    const f = Xl(c, n);
    return r(c, f), f;
  };
  return s = a, (...c) => s(ql(...c));
}, Jl = [], Pe = (e) => {
  const t = (n) => n[e] || Jl;
  return t.isThemeGetter = !0, t;
}, Os = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, js = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ql = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ec = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, tc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, nc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, oc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, rc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ot = (e) => Ql.test(e), ce = (e) => !!e && !Number.isNaN(Number(e)), We = (e) => !!e && Number.isInteger(Number(e)), Eo = (e) => e.endsWith("%") && ce(e.slice(0, -1)), Ke = (e) => ec.test(e), _s = () => !0, sc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  tc.test(e) && !nc.test(e)
), nr = () => !1, ic = (e) => oc.test(e), ac = (e) => rc.test(e), lc = (e) => !V(e) && !B(e), cc = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), uc = (e) => ct(e, $s, nr), V = (e) => Os.test(e), xt = (e) => ct(e, Ls, sc), Dr = (e) => ct(e, xc, ce), dc = (e) => ct(e, Fs, _s), fc = (e) => ct(e, zs, nr), Mr = (e) => ct(e, Ds, nr), pc = (e) => ct(e, Ms, ac), vn = (e) => ct(e, Ws, ic), B = (e) => js.test(e), Qt = (e) => Tt(e, Ls), mc = (e) => Tt(e, zs), $r = (e) => Tt(e, Ds), hc = (e) => Tt(e, $s), gc = (e) => Tt(e, Ms), xn = (e) => Tt(e, Ws, !0), vc = (e) => Tt(e, Fs, !0), ct = (e, t, n) => {
  const o = Os.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Tt = (e, t, n = !1) => {
  const o = js.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Ds = (e) => e === "position" || e === "percentage", Ms = (e) => e === "image" || e === "url", $s = (e) => e === "length" || e === "size" || e === "bg-size", Ls = (e) => e === "length", xc = (e) => e === "number", zs = (e) => e === "family-name", Fs = (e) => e === "number" || e === "weight", Ws = (e) => e === "shadow", bc = () => {
  const e = Pe("color"), t = Pe("font"), n = Pe("text"), o = Pe("font-weight"), r = Pe("tracking"), s = Pe("leading"), a = Pe("breakpoint"), l = Pe("container"), c = Pe("spacing"), u = Pe("radius"), f = Pe("shadow"), p = Pe("inset-shadow"), g = Pe("text-shadow"), h = Pe("drop-shadow"), v = Pe("blur"), m = Pe("perspective"), x = Pe("aspect"), w = Pe("ease"), b = Pe("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...C(), B, V], P = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], R = () => [B, V, c], j = () => [ot, "full", "auto", ...R()], A = () => [We, "none", "subgrid", B, V], _ = () => ["auto", {
    span: ["full", We, B, V]
  }, We, B, V], X = () => [We, "auto", B, V], H = () => ["auto", "min", "max", "fr", B, V], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ee = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], L = () => ["auto", ...R()], U = () => [ot, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...R()], W = () => [ot, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...R()], K = () => [ot, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...R()], $ = () => [e, B, V], k = () => [...C(), $r, Mr, {
    position: [B, V]
  }], Y = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], re = () => ["auto", "cover", "contain", hc, uc, {
    size: [B, V]
  }], ne = () => [Eo, Qt, xt], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    B,
    V
  ], ae = () => ["", ce, Qt, xt], O = () => ["solid", "dashed", "dotted", "double"], Z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], te = () => [ce, Eo, $r, Mr], ue = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    B,
    V
  ], de = () => ["none", ce, B, V], me = () => ["none", ce, B, V], ye = () => [ce, B, V], pe = () => [ot, "full", ...R()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ke],
      breakpoint: [Ke],
      color: [_s],
      container: [Ke],
      "drop-shadow": [Ke],
      ease: ["in", "out", "in-out"],
      font: [lc],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ke],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ke],
      shadow: [Ke],
      spacing: ["px", ce],
      text: [Ke],
      "text-shadow": [Ke],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ot, V, B, x]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", B, V]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [cc],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ce, V, B, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": y()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: j()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": j()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": j()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": j(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: j()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": j(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: j()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": j()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": j()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: j()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: j()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: j()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: j()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [We, "auto", B, V]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ot, "full", "auto", l, ...R()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ce, ot, "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ce, B, V]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ce, B, V]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [We, "first", "last", "none", B, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": A()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: _()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": X()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": X()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": A()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: _()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": X()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": X()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": H()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": H()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: R()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": R()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": R()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Q(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ee(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ee()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Q()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ee(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ee(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Q()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ee(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ee()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: R()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: R()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: R()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: R()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: R()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: R()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: R()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: R()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: R()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: R()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: R()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: L()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: L()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: L()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: L()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: L()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: L()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: L()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: L()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: L()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: L()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: L()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": R()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": R()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: U()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...W()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...W()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...W()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...K()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...K()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...K()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...U()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Qt, xt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, vc, dc]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Eo, V]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mc, fc, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [V]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [r, B, V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ce, "none", B, Dr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...R()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", B, V]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", B, V]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: $()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: $()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...O(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ce, "from-font", "auto", B, xt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: $()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ce, "auto", B, V]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: R()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [We, B, V]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", B, V]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", B, V]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: k()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Y()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: re()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, We, B, V],
          radial: ["", B, V],
          conic: [We, B, V]
        }, gc, pc]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: $()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ne()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ne()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ne()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: $()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: $()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: $()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ae()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ae()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ae()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ae()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ae()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ae()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ae()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ae()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ae()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ae()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ae()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ae()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ae()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...O(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...O(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: $()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": $()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": $()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": $()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": $()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": $()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": $()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": $()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": $()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": $()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": $()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: $()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...O(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ce, B, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ce, Qt, xt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: $()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          xn,
          vn
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: $()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", p, xn, vn]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": $()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ae()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: $()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ce, xt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": $()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ae()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": $()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", g, xn, vn]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": $()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ce, B, V]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Z(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Z()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ce]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": te()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": te()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": $()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": $()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": te()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": te()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": $()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": $()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": te()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": te()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": $()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": $()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": te()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": te()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": $()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": $()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": te()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": te()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": $()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": $()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": te()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": te()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": $()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": $()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": te()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": te()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": $()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": $()
      }],
      "mask-image-radial": [{
        "mask-radial": [B, V]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": te()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": te()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": $()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": $()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ce]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": te()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": te()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": $()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": $()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: k()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Y()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: re()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", B, V]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          B,
          V
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ue()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ce, B, V]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ce, B, V]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          xn,
          vn
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": $()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ce, B, V]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ce, B, V]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ce, B, V]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ce, B, V]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ce, B, V]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          B,
          V
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ue()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ce, B, V]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ce, B, V]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ce, B, V]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ce, B, V]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ce, B, V]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ce, B, V]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ce, B, V]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ce, B, V]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": R()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": R()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": R()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", B, V]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ce, "initial", B, V]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, B, V]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ce, B, V]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, B, V]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [m, B, V]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: de()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": de()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": de()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": de()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: me()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": me()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": me()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": me()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ye()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ye()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ye()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [B, V, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: pe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": pe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": pe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": pe()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [We, B, V]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: $()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: $()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", B, V]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": $()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": $()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": R()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": R()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": R()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": R()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": R()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": R()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": R()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": R()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": R()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": R()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": R()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": R()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": R()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": R()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": R()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": R()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": R()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": R()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": R()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": R()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": R()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": R()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", B, V]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...$()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ce, Qt, xt, Dr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...$()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, wc = /* @__PURE__ */ Zl(bc);
function oe(...e) {
  return wc(Ps(e));
}
var bn = { exports: {} }, en = {};
var Lr;
function yc() {
  if (Lr) return en;
  Lr = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, s) {
    var a = null;
    if (s !== void 0 && (a = "" + s), r.key !== void 0 && (a = "" + r.key), "key" in r) {
      s = {};
      for (var l in r)
        l !== "key" && (s[l] = r[l]);
    } else s = r;
    return r = s.ref, {
      $$typeof: e,
      type: o,
      key: a,
      ref: r !== void 0 ? r : null,
      props: s
    };
  }
  return en.Fragment = t, en.jsx = n, en.jsxs = n, en;
}
var tn = {};
var zr;
function Cc() {
  return zr || (zr = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(k) {
      if (k == null) return null;
      if (typeof k == "function")
        return k.$$typeof === _ ? null : k.displayName || k.name || null;
      if (typeof k == "string") return k;
      switch (k) {
        case x:
          return "Fragment";
        case b:
          return "Profiler";
        case w:
          return "StrictMode";
        case P:
          return "Suspense";
        case S:
          return "SuspenseList";
        case A:
          return "Activity";
      }
      if (typeof k == "object")
        switch (typeof k.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), k.$$typeof) {
          case m:
            return "Portal";
          case C:
            return k.displayName || "Context";
          case y:
            return (k._context.displayName || "Context") + ".Consumer";
          case E:
            var Y = k.render;
            return k = k.displayName, k || (k = Y.displayName || Y.name || "", k = k !== "" ? "ForwardRef(" + k + ")" : "ForwardRef"), k;
          case R:
            return Y = k.displayName || null, Y !== null ? Y : e(k.type) || "Memo";
          case j:
            Y = k._payload, k = k._init;
            try {
              return e(k(Y));
            } catch {
            }
        }
      return null;
    }
    function t(k) {
      return "" + k;
    }
    function n(k) {
      try {
        t(k);
        var Y = !1;
      } catch {
        Y = !0;
      }
      if (Y) {
        Y = console;
        var re = Y.error, ne = typeof Symbol == "function" && Symbol.toStringTag && k[Symbol.toStringTag] || k.constructor.name || "Object";
        return re.call(
          Y,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ne
        ), t(k);
      }
    }
    function o(k) {
      if (k === x) return "<>";
      if (typeof k == "object" && k !== null && k.$$typeof === j)
        return "<...>";
      try {
        var Y = e(k);
        return Y ? "<" + Y + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var k = X.A;
      return k === null ? null : k.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function a(k) {
      if (H.call(k, "key")) {
        var Y = Object.getOwnPropertyDescriptor(k, "key").get;
        if (Y && Y.isReactWarning) return !1;
      }
      return k.key !== void 0;
    }
    function l(k, Y) {
      function re() {
        L || (L = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          Y
        ));
      }
      re.isReactWarning = !0, Object.defineProperty(k, "key", {
        get: re,
        configurable: !0
      });
    }
    function c() {
      var k = e(this.type);
      return U[k] || (U[k] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), k = this.props.ref, k !== void 0 ? k : null;
    }
    function u(k, Y, re, ne, q, ae) {
      var O = re.ref;
      return k = {
        $$typeof: v,
        type: k,
        key: Y,
        props: re,
        _owner: ne
      }, (O !== void 0 ? O : null) !== null ? Object.defineProperty(k, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(k, "ref", { enumerable: !1, value: null }), k._store = {}, Object.defineProperty(k._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(k, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(k, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: q
      }), Object.defineProperty(k, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ae
      }), Object.freeze && (Object.freeze(k.props), Object.freeze(k)), k;
    }
    function f(k, Y, re, ne, q, ae) {
      var O = Y.children;
      if (O !== void 0)
        if (ne)
          if (Q(O)) {
            for (ne = 0; ne < O.length; ne++)
              p(O[ne]);
            Object.freeze && Object.freeze(O);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(O);
      if (H.call(Y, "key")) {
        O = e(k);
        var Z = Object.keys(Y).filter(function(ue) {
          return ue !== "key";
        });
        ne = 0 < Z.length ? "{key: someKey, " + Z.join(": ..., ") + ": ...}" : "{key: someKey}", $[O + ne] || (Z = 0 < Z.length ? "{" + Z.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ne,
          O,
          Z,
          O
        ), $[O + ne] = !0);
      }
      if (O = null, re !== void 0 && (n(re), O = "" + re), a(Y) && (n(Y.key), O = "" + Y.key), "key" in Y) {
        re = {};
        for (var te in Y)
          te !== "key" && (re[te] = Y[te]);
      } else re = Y;
      return O && l(
        re,
        typeof k == "function" ? k.displayName || k.name || "Unknown" : k
      ), u(
        k,
        O,
        re,
        r(),
        q,
        ae
      );
    }
    function p(k) {
      g(k) ? k._store && (k._store.validated = 1) : typeof k == "object" && k !== null && k.$$typeof === j && (k._payload.status === "fulfilled" ? g(k._payload.value) && k._payload.value._store && (k._payload.value._store.validated = 1) : k._store && (k._store.validated = 1));
    }
    function g(k) {
      return typeof k == "object" && k !== null && k.$$typeof === v;
    }
    var h = rt, v = /* @__PURE__ */ Symbol.for("react.transitional.element"), m = /* @__PURE__ */ Symbol.for("react.portal"), x = /* @__PURE__ */ Symbol.for("react.fragment"), w = /* @__PURE__ */ Symbol.for("react.strict_mode"), b = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.consumer"), C = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), S = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.activity"), _ = /* @__PURE__ */ Symbol.for("react.client.reference"), X = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = Object.prototype.hasOwnProperty, Q = Array.isArray, ee = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(k) {
        return k();
      }
    };
    var L, U = {}, W = h.react_stack_bottom_frame.bind(
      h,
      s
    )(), K = ee(o(s)), $ = {};
    tn.Fragment = x, tn.jsx = function(k, Y, re) {
      var ne = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        k,
        Y,
        re,
        !1,
        ne ? Error("react-stack-top-frame") : W,
        ne ? ee(o(k)) : K
      );
    }, tn.jsxs = function(k, Y, re) {
      var ne = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        k,
        Y,
        re,
        !0,
        ne ? Error("react-stack-top-frame") : W,
        ne ? ee(o(k)) : K
      );
    };
  })()), tn;
}
var Fr;
function Sc() {
  return Fr || (Fr = 1, process.env.NODE_ENV === "production" ? bn.exports = yc() : bn.exports = Cc()), bn.exports;
}
var d = Sc();
const Wr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Vr = Ps, Ie = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Vr(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((u) => {
    const f = n?.[u], p = s?.[u];
    if (f === null) return null;
    const g = Wr(f) || Wr(p);
    return r[u][g];
  }), l = n && Object.entries(n).reduce((u, f) => {
    let [p, g] = f;
    return g === void 0 || (u[p] = g), u;
  }, {}), c = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, f) => {
    let { class: p, className: g, ...h } = f;
    return Object.entries(h).every((v) => {
      let [m, x] = v;
      return Array.isArray(x) ? x.includes({
        ...s,
        ...l
      }[m]) : {
        ...s,
        ...l
      }[m] === x;
    }) ? [
      ...u,
      p,
      g
    ] : u;
  }, []);
  return Vr(e, a, c, n?.class, n?.className);
}, Ec = Ie(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-normal transition-all outline-none select-none cursor-pointer disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-5 text-white-90 hover:bg-brand-6 active:bg-brand-6 data-[state=open]:bg-brand-6",
        outline: "border-neutral-2 bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-1 data-[state=open]:bg-neutral-1",
        ghost: "bg-transparent text-black-85 hover:bg-black-5 active:bg-black-5 data-[state=open]:bg-black-5",
        destructive: "bg-error-1 text-error-5 hover:bg-error-2 active:bg-error-2 data-[state=open]:bg-error-2",
        link: "bg-transparent text-brand-5 hover:text-brand-6 active:text-brand-6 hover:underline underline-offset-4"
      },
      size: {
        sm: "h-6 rounded-md px-1.5 text-xs leading-5 gap-1 [&_svg]:size-[14px]",
        base: "h-8 rounded-lg px-2 text-sm leading-6 gap-1.5 [&_svg]:size-4",
        lg: "h-10 rounded-xl px-3 text-base leading-6 gap-2 [&_svg]:size-[18px]",
        iconSm: "size-6 rounded-md gap-0 [&_svg]:size-[14px]",
        iconBase: "size-8 rounded-lg gap-0 [&_svg]:size-4",
        iconLg: "size-10 rounded-xl gap-0 [&_svg]:size-[18px]"
      },
      noShift: {
        true: "",
        false: "active:translate-y-px data-[state=open]:active:translate-y-0"
      },
      disabled: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // primary / outline / destructive disabled: gray bg + gray border
      {
        variant: ["primary", "outline", "destructive"],
        disabled: !0,
        class: "border-neutral-2 bg-neutral-1 text-black-25 hover:bg-neutral-1 hover:text-black-25 active:bg-neutral-1 active:text-black-25 active:translate-y-0"
      },
      // ghost disabled: gray text, keep space
      {
        variant: "ghost",
        disabled: !0,
        class: "text-black-25 hover:text-black-25 hover:bg-transparent active:text-black-25 active:bg-transparent active:translate-y-0"
      },
      // link disabled: gray text, no interaction
      {
        variant: "link",
        disabled: !0,
        class: "text-black-25 hover:text-black-25 hover:no-underline active:text-black-25 active:translate-y-0"
      },
      // link: remove padding for all sizes
      {
        variant: "link",
        size: ["sm", "base", "lg"],
        class: "px-0"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "base",
      noShift: !1,
      disabled: !1
    }
  }
);
function Ce({
  className: e,
  variant: t,
  size: n,
  noShift: o,
  disabled: r,
  leftIcon: s,
  rightIcon: a,
  children: l,
  slotId: c,
  ...u
}) {
  const f = i.useId();
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      "data-slot": "button",
      "data-slot-id": c ?? f,
      disabled: r,
      className: oe(Ec({ variant: t, size: n, noShift: o, disabled: r, className: e })),
      ...u,
      children: [
        s && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${s}` }) }),
        l,
        a && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
const kc = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Rc = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Pc = Ie(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: kc,
      size: {
        base: "h-8 rounded-lg px-2 text-sm leading-6",
        sm: "h-6 rounded-md px-1.5 text-xs leading-5",
        lg: "h-10 rounded-xl px-3 text-base leading-6"
      },
      noSpinner: {
        true: "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      }
    },
    defaultVariants: { variant: "basic", size: "base", noSpinner: !1 }
  }
), Tc = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" }
};
function it({ className: e, variant: t, size: n, noSpinner: o, disabled: r, leftIcon: s, rightIcon: a, slotId: l, ...c }) {
  const u = r || t === "disabled", p = Tc[n ?? "base"], g = i.useId();
  return !s && !a ? /* @__PURE__ */ d.jsx(
    "input",
    {
      "data-slot": "input",
      "data-slot-id": l ?? g,
      disabled: u,
      className: oe(
        Pc({ variant: t, size: n, noSpinner: o }),
        u && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
        e
      ),
      ...c
    }
  ) : /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "input",
      "data-slot-id": l ?? g,
      className: oe(
        "flex items-center border bg-white-100 outline-none transition-all",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        Rc[t ?? "basic"],
        t === "disabled" && "cursor-not-allowed",
        e
      ),
      children: [
        s && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${s}` }) }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            disabled: u,
            className: oe(
              "w-full bg-transparent outline-none text-black-85 placeholder:text-black-25",
              p.text,
              t === "disabled" && "text-neutral-3 placeholder:text-neutral-3 cursor-not-allowed"
            ),
            ...c
          }
        ),
        a && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
function ko(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Nc(e, t = []) {
  let n = [];
  function o(s, a) {
    const l = i.createContext(a);
    l.displayName = s + "Context";
    const c = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = i.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ d.jsx(m.Provider, { value: x, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = i.useContext(h);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(l) {
      const c = l?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, Ic(r, ...t)];
}
function Ic(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((l, { useScope: c, scopeName: u }) => {
        const p = c(s)[`__scope${u}`];
        return { ...l, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Mt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Vs(e, t = []) {
  let n = [];
  function o(s, a) {
    const l = i.createContext(a);
    l.displayName = s + "Context";
    const c = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = i.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ d.jsx(m.Provider, { value: x, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = i.useContext(h);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(l) {
      const c = l?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, Ac(r, ...t)];
}
function Ac(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((l, { useScope: c, scopeName: u }) => {
        const p = c(s)[`__scope${u}`];
        return { ...l, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Hr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Oc(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Hr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Hr(e[r], null);
        }
      };
  };
}
function Dn(...e) {
  return i.useCallback(Oc(...e), e);
}
// @__NO_SIDE_EFFECTS__
function zo(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, l = !1;
    const c = [];
    Br(r) && typeof wn == "function" && (r = wn(r._payload)), i.Children.forEach(r, (g) => {
      if ($c(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        Br(v) && typeof wn == "function" && (v = wn(v._payload)), a = _c(h, v), c.push(a?.props?.children);
      } else
        c.push(g);
    }), a ? a = i.cloneElement(a, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? Mc(a) : void 0, f = Dn(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          l ? Wc(e) : Fc(e)
        );
      return r;
    }
    const p = Dc(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var jc = /* @__PURE__ */ Symbol.for("radix.slottable"), _c = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function Dc(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...l) => {
      const c = s(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Mc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function $c(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === jc;
}
var Lc = /* @__PURE__ */ Symbol.for("react.lazy");
function Br(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Lc && "_payload" in e && zc(e._payload);
}
function zc(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Fc = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Wc = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, wn = i[" use ".trim().toString()];
function Vc(e) {
  const t = e + "CollectionProvider", [n, o] = Vs(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (m) => {
    const { scope: x, children: w } = m, b = i.useRef(null), y = i.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ d.jsx(r, { scope: x, itemMap: y, collectionRef: b, children: w });
  };
  a.displayName = t;
  const l = e + "CollectionSlot", c = /* @__PURE__ */ zo(l), u = i.forwardRef(
    (m, x) => {
      const { scope: w, children: b } = m, y = s(l, w), C = Dn(x, y.collectionRef);
      return /* @__PURE__ */ d.jsx(c, { ref: C, children: b });
    }
  );
  u.displayName = l;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ zo(f), h = i.forwardRef(
    (m, x) => {
      const { scope: w, children: b, ...y } = m, C = i.useRef(null), E = Dn(x, C), P = s(f, w);
      return i.useEffect(() => (P.itemMap.set(C, { ref: C, ...y }), () => {
        P.itemMap.delete(C);
      })), /* @__PURE__ */ d.jsx(g, { [p]: "", ref: E, children: b });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = s(e + "CollectionConsumer", m);
    return i.useCallback(() => {
      const b = x.collectionRef.current;
      if (!b) return [];
      const y = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (P, S) => y.indexOf(P.ref.current) - y.indexOf(S.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    v,
    o
  ];
}
var Hs = globalThis?.document ? i.useLayoutEffect : () => {
}, Hc = i[" useId ".trim().toString()] || (() => {
}), Bc = 0;
function Uc(e) {
  const [t, n] = i.useState(Hc());
  return Hs(() => {
    n((o) => o ?? String(Bc++));
  }, [e]), t ? `radix-${t}` : "";
}
var Gc = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Bs = Gc.reduce((e, t) => {
  const n = /* @__PURE__ */ zo(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...l } = r, c = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(c, { ...l, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Kc(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
var Yc = i[" useInsertionEffect ".trim().toString()] || Hs;
function Xc({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = qc({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (l) {
        const p = Zc(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [l, e, s, a]
  );
  return [c, u];
}
function qc({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Yc(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Zc(e) {
  return typeof e == "function";
}
var Jc = i.createContext(void 0);
function Qc(e) {
  const t = i.useContext(Jc);
  return e || t || "ltr";
}
var Ro = "rovingFocusGroup.onEntryFocus", eu = { bubbles: !1, cancelable: !0 }, an = "RovingFocusGroup", [Fo, Us, tu] = Vc(an), [nu, Gs] = Vs(
  an,
  [tu]
), [ou, ru] = nu(an), Ks = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(Fo.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d.jsx(Fo.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d.jsx(su, { ...e, ref: t }) }) })
);
Ks.displayName = an;
var su = i.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: l,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: f = !1,
    ...p
  } = e, g = i.useRef(null), h = Dn(t, g), v = Qc(s), [m, x] = Xc({
    prop: a,
    defaultProp: l ?? null,
    onChange: c,
    caller: an
  }), [w, b] = i.useState(!1), y = Kc(u), C = Us(n), E = i.useRef(!1), [P, S] = i.useState(0);
  return i.useEffect(() => {
    const R = g.current;
    if (R)
      return R.addEventListener(Ro, y), () => R.removeEventListener(Ro, y);
  }, [y]), /* @__PURE__ */ d.jsx(
    ou,
    {
      scope: n,
      orientation: o,
      dir: v,
      loop: r,
      currentTabStopId: m,
      onItemFocus: i.useCallback(
        (R) => x(R),
        [x]
      ),
      onItemShiftTab: i.useCallback(() => b(!0), []),
      onFocusableItemAdd: i.useCallback(
        () => S((R) => R + 1),
        []
      ),
      onFocusableItemRemove: i.useCallback(
        () => S((R) => R - 1),
        []
      ),
      children: /* @__PURE__ */ d.jsx(
        Bs.div,
        {
          tabIndex: w || P === 0 ? -1 : 0,
          "data-orientation": o,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: Mt(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: Mt(e.onFocus, (R) => {
            const j = !E.current;
            if (R.target === R.currentTarget && j && !w) {
              const A = new CustomEvent(Ro, eu);
              if (R.currentTarget.dispatchEvent(A), !A.defaultPrevented) {
                const _ = C().filter((L) => L.focusable), X = _.find((L) => L.active), H = _.find((L) => L.id === m), ee = [X, H, ..._].filter(
                  Boolean
                ).map((L) => L.ref.current);
                qs(ee, f);
              }
            }
            E.current = !1;
          }),
          onBlur: Mt(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), Ys = "RovingFocusGroupItem", Xs = i.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...l
    } = e, c = Uc(), u = s || c, f = ru(Ys, n), p = f.currentTabStopId === u, g = Us(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: m } = f;
    return i.useEffect(() => {
      if (o)
        return h(), () => v();
    }, [o, h, v]), /* @__PURE__ */ d.jsx(
      Fo.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ d.jsx(
          Bs.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": f.orientation,
            ...l,
            ref: t,
            onMouseDown: Mt(e.onMouseDown, (x) => {
              o ? f.onItemFocus(u) : x.preventDefault();
            }),
            onFocus: Mt(e.onFocus, () => f.onItemFocus(u)),
            onKeyDown: Mt(e.onKeyDown, (x) => {
              if (x.key === "Tab" && x.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (x.target !== x.currentTarget) return;
              const w = lu(x, f.orientation, f.dir);
              if (w !== void 0) {
                if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
                x.preventDefault();
                let y = g().filter((C) => C.focusable).map((C) => C.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const C = y.indexOf(x.currentTarget);
                  y = f.loop ? cu(y, C + 1) : y.slice(C + 1);
                }
                setTimeout(() => qs(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: p, hasTabStop: m != null }) : a
          }
        )
      }
    );
  }
);
Xs.displayName = Ys;
var iu = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function au(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function lu(e, t, n) {
  const o = au(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return iu[o];
}
function qs(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function cu(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var uu = Ks, du = Xs, Mn = globalThis?.document ? i.useLayoutEffect : () => {
};
function fu(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var Zs = (e) => {
  const { present: t, children: n } = e, o = pu(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = mu(o.ref, hu(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Zs.displayName = "Presence";
function pu(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [l, c] = fu(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return i.useEffect(() => {
    const u = yn(o.current);
    s.current = l === "mounted" ? u : "none";
  }, [l]), Mn(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const g = s.current, h = yn(u);
      e ? c("MOUNT") : h === "none" || u?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Mn(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = yn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (s.current = yn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Ur(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function mu(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const l = Ur(a, n);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const l = s[a];
          typeof l == "function" ? l() : Ur(o[a], null);
        }
      };
  }, []);
}
function yn(e) {
  return e?.animationName || "none";
}
function hu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Gr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function gu(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Gr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Gr(e[r], null);
        }
      };
  };
}
function vu(...e) {
  return i.useCallback(gu(...e), e);
}
// @__NO_SIDE_EFFECTS__
function xu(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, l = !1;
    const c = [];
    Kr(r) && typeof Cn == "function" && (r = Cn(r._payload)), i.Children.forEach(r, (g) => {
      if (Su(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        Kr(v) && typeof Cn == "function" && (v = Cn(v._payload)), a = wu(h, v), c.push(a?.props?.children);
      } else
        c.push(g);
    }), a ? a = i.cloneElement(a, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? Cu(a) : void 0, f = vu(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          l ? Pu(e) : Ru(e)
        );
      return r;
    }
    const p = yu(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var bu = /* @__PURE__ */ Symbol.for("radix.slottable"), wu = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function yu(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...l) => {
      const c = s(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Cu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Su(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === bu;
}
var Eu = /* @__PURE__ */ Symbol.for("react.lazy");
function Kr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Eu && "_payload" in e && ku(e._payload);
}
function ku(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Ru = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Pu = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, Cn = i[" use ".trim().toString()], Tu = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Bn = Tu.reduce((e, t) => {
  const n = /* @__PURE__ */ xu(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...l } = r, c = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(c, { ...l, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), Nu = i.createContext(void 0);
function Iu(e) {
  const t = i.useContext(Nu);
  return e || t || "ltr";
}
var Au = i[" useInsertionEffect ".trim().toString()] || Mn;
function Ou({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = ju({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (l) {
        const p = _u(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [l, e, s, a]
  );
  return [c, u];
}
function ju({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Au(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function _u(e) {
  return typeof e == "function";
}
var Du = i[" useId ".trim().toString()] || (() => {
}), Mu = 0;
function $u(e) {
  const [t, n] = i.useState(Du());
  return Mn(() => {
    n((o) => o ?? String(Mu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Un = "Tabs", [Lu] = Nc(Un, [
  Gs
]), Js = Gs(), [zu, or] = Lu(Un), Qs = i.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: o,
      onValueChange: r,
      defaultValue: s,
      orientation: a = "horizontal",
      dir: l,
      activationMode: c = "automatic",
      ...u
    } = e, f = Iu(l), [p, g] = Ou({
      prop: o,
      onChange: r,
      defaultProp: s ?? "",
      caller: Un
    });
    return /* @__PURE__ */ d.jsx(
      zu,
      {
        scope: n,
        baseId: $u(),
        value: p,
        onValueChange: g,
        orientation: a,
        dir: f,
        activationMode: c,
        children: /* @__PURE__ */ d.jsx(
          Bn.div,
          {
            dir: f,
            "data-orientation": a,
            ...u,
            ref: t
          }
        )
      }
    );
  }
);
Qs.displayName = Un;
var ei = "TabsList", ti = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e, s = or(ei, n), a = Js(n);
    return /* @__PURE__ */ d.jsx(
      uu,
      {
        asChild: !0,
        ...a,
        orientation: s.orientation,
        dir: s.dir,
        loop: o,
        children: /* @__PURE__ */ d.jsx(
          Bn.div,
          {
            role: "tablist",
            "aria-orientation": s.orientation,
            ...r,
            ref: t
          }
        )
      }
    );
  }
);
ti.displayName = ei;
var ni = "TabsTrigger", oi = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...s } = e, a = or(ni, n), l = Js(n), c = ii(a.baseId, o), u = ai(a.baseId, o), f = o === a.value;
    return /* @__PURE__ */ d.jsx(
      du,
      {
        asChild: !0,
        ...l,
        focusable: !r,
        active: f,
        children: /* @__PURE__ */ d.jsx(
          Bn.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": f,
            "aria-controls": u,
            "data-state": f ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: c,
            ...s,
            ref: t,
            onMouseDown: ko(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? a.onValueChange(o) : p.preventDefault();
            }),
            onKeyDown: ko(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && a.onValueChange(o);
            }),
            onFocus: ko(e.onFocus, () => {
              const p = a.activationMode !== "manual";
              !f && !r && p && a.onValueChange(o);
            })
          }
        )
      }
    );
  }
);
oi.displayName = ni;
var ri = "TabsContent", si = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: s, ...a } = e, l = or(ri, n), c = ii(l.baseId, o), u = ai(l.baseId, o), f = o === l.value, p = i.useRef(f);
    return i.useEffect(() => {
      const g = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(g);
    }, []), /* @__PURE__ */ d.jsx(Zs, { present: r || f, children: ({ present: g }) => /* @__PURE__ */ d.jsx(
      Bn.div,
      {
        "data-state": f ? "active" : "inactive",
        "data-orientation": l.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !g,
        id: u,
        tabIndex: 0,
        ...a,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: g && s
      }
    ) });
  }
);
si.displayName = ri;
function ii(e, t) {
  return `${e}-trigger-${t}`;
}
function ai(e, t) {
  return `${e}-content-${t}`;
}
var Fu = Qs, Wu = ti, Vu = oi, Hu = si;
const Gn = i.createContext({ size: "base" });
function Wg({ className: e, size: t = "base", children: n, slotId: o, ...r }) {
  const s = i.useId();
  return /* @__PURE__ */ d.jsx(Gn.Provider, { value: { size: t }, children: /* @__PURE__ */ d.jsx(Fu, { "data-slot": "tabs", "data-slot-id": o ?? s, className: oe(e), ...r, children: n }) });
}
const Bu = Ie(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        basic: "bg-neutral-1 p-1",
        line: "bg-transparent border-b border-neutral-2 gap-0 p-0"
      },
      size: {
        sm: "h-8 rounded-md",
        base: "h-10 rounded-lg",
        lg: "h-12 rounded-xl"
      }
    },
    compoundVariants: [
      // line 模式：TabsList 高度与 TabsTrigger 一致，确保底部描边对齐
      { variant: "line", size: "sm", class: "h-6 rounded-none" },
      { variant: "line", size: "base", class: "h-8 rounded-none" },
      { variant: "line", size: "lg", class: "h-10 rounded-none" }
    ],
    defaultVariants: { variant: "basic" }
  }
);
function Vg({ className: e, variant: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(Gn), s = i.useId();
  return /* @__PURE__ */ d.jsx(
    Wu,
    {
      "data-slot": "tabs-list",
      "data-slot-id": n ?? s,
      className: oe(Bu({ variant: t, size: r }), e),
      ...o
    }
  );
}
const Uu = Ie(
  "inline-flex items-center justify-center whitespace-nowrap transition-all outline-none select-none",
  {
    variants: {
      variant: {
        basic: "text-black-55 hover:text-black-85 data-[state=active]:bg-white-100 data-[state=active]:text-black-85 data-[state=active]:shadow-sm",
        line: "text-black-55 border-b-2 border-transparent hover:text-black-85 data-[state=active]:text-brand-5 data-[state=active]:border-brand-5 px-1"
      },
      size: {
        sm: "h-6 px-2 text-xs gap-1 rounded-md",
        base: "h-8 px-3 text-sm gap-1.5 rounded-lg",
        lg: "h-10 px-4 text-base gap-2 rounded-xl"
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer"
      }
    },
    compoundVariants: [
      { variant: "line", size: "sm", class: "rounded-none" },
      { variant: "line", size: "base", class: "rounded-none" },
      { variant: "line", size: "lg", class: "rounded-none" }
    ],
    defaultVariants: { variant: "basic", disabled: !1 }
  }
);
function Hg({ className: e, variant: t, disabled: n, ...o }) {
  const { size: r } = i.useContext(Gn);
  return /* @__PURE__ */ d.jsx(
    Vu,
    {
      "data-slot": "tabs-trigger",
      "data-slot-id": o.value,
      disabled: n,
      className: oe(Uu({ variant: t, size: r, disabled: n }), e),
      ...o
    }
  );
}
const Gu = Ie(
  "outline-none focus-visible:ring-2 focus-visible:ring-brand-5 focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "mt-2 text-xs",
        base: "mt-3 text-sm",
        lg: "mt-4 text-base"
      }
    },
    defaultVariants: { size: "base" }
  }
);
function Bg({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(Gn), r = i.useId();
  return /* @__PURE__ */ d.jsx(
    Hu,
    {
      "data-slot": "tabs-content",
      "data-slot-id": t ?? r,
      className: oe(Gu({ size: o }), e),
      ...n
    }
  );
}
const Ku = Ie(
  "relative flex items-stretch overflow-hidden transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-white-100",
        defaultHover: "bg-neutral-1",
        selected: "bg-brand-1",
        locked: "bg-brand-1",
        editing: "bg-brand-2",
        header: "bg-neutral-1 hover:bg-neutral-2 font-medium has-[[data-state=open]]:bg-neutral-2",
        headerSelected: "bg-neutral-2 font-medium"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), li = Ie(
  "relative flex items-center w-full min-h-6 min-w-[24px] p-2 rounded-sm text-sm text-black-85",
  {
    variants: {
      size: {
        sm: "text-xs leading-5",
        base: "text-sm leading-6",
        lg: "text-base leading-6"
      }
    },
    defaultVariants: {
      size: "base"
    }
  }
), wt = i.memo(function({ className: t, variant: n, width: o, columnId: r, children: s, isLastCell: a, resizable: l, onResizeStart: c, onHoverEdge: u, slotClassName: f, style: p, ...g }) {
  const h = i.useId(), v = i.useCallback((y) => {
    y.preventDefault(), y.stopPropagation(), c && c(o ?? 80, y.clientX);
  }, [c, o]), m = i.useCallback(() => {
    u?.(!0);
  }, [u]), x = i.useCallback(() => {
    u?.(!1);
  }, [u]), w = l && !a, b = i.useMemo(() => ({
    ...p,
    ...o ? { width: `${o}px`, minWidth: `${o}px` } : {}
  }), [p, o]);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "cell",
      "data-slot-id": r ?? h,
      className: oe(
        Ku({ variant: n, className: t }),
        !a && "border-r border-neutral-2"
      ),
      style: b,
      ...g,
      children: [
        /* @__PURE__ */ d.jsx("div", { className: oe(li({ size: "base" }), f), children: s ?? /* @__PURE__ */ d.jsx("span", { className: "text-black-85", children: "文本单元格" }) }),
        w && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10",
            onMouseEnter: m,
            onMouseLeave: x,
            onMouseDown: v
          }
        )
      ]
    }
  );
}), Ug = i.memo(function({
  className: t,
  size: n,
  children: o,
  slotId: r,
  ...s
}) {
  const a = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "cell-slot",
      "data-slot-id": r ?? a,
      className: oe(li({ size: n, className: t })),
      ...s,
      children: o
    }
  );
}), Yu = Ie(
  "flex shrink-0 items-center justify-center border transition-all",
  {
    variants: {
      checked: {
        false: "border-neutral-2 bg-white-100 hover:border-brand-5 hover:bg-white-100",
        true: "border-brand-5 bg-brand-5 hover:border-brand-6 hover:bg-brand-6"
      },
      disabled: {
        true: "",
        false: ""
      },
      size: {
        sm: "size-[14px] rounded",
        base: "size-4 rounded-md",
        lg: "size-[18px] rounded-md"
      }
    },
    compoundVariants: [
      {
        checked: !1,
        disabled: !0,
        class: "border-neutral-2 bg-neutral-1 hover:border-neutral-2 hover:bg-neutral-1"
      },
      {
        checked: !0,
        disabled: !0,
        class: "border-neutral-2 bg-neutral-1 hover:border-neutral-2 hover:bg-neutral-1"
      }
    ],
    defaultVariants: {
      checked: !1,
      disabled: !1,
      size: "base"
    }
  }
), Xu = Ie("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]"
    }
  },
  defaultVariants: { size: "base" }
}), qu = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2"
};
function Wo({
  className: e,
  checked: t = !1,
  disabled: n = !1,
  size: o = "base",
  onChange: r,
  children: s,
  slotId: a,
  ...l
}) {
  const c = n, u = i.useId();
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "checkbox",
      "data-slot-id": a ?? u,
      role: "checkbox",
      "aria-checked": t,
      tabIndex: c ? void 0 : 0,
      className: oe(
        "flex items-center",
        qu[o ?? "base"],
        !c && "cursor-pointer",
        c && "cursor-not-allowed",
        e
      ),
      onClick: () => !c && r?.(!t),
      ...l,
      children: [
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: oe(
              Yu({
                checked: t ?? !1,
                disabled: n ?? !1,
                size: o ?? "base"
              })
            ),
            children: t && /* @__PURE__ */ d.jsx(
              "svg",
              {
                "aria-hidden": "true",
                className: oe(
                  Xu({ size: o }),
                  c ? "text-black-25" : "text-white-100"
                ),
                style: { fill: "currentColor" },
                children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-check-sm" })
              }
            )
          }
        ),
        s
      ]
    }
  );
}
function Yr(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function he(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Zu(e, t) {
  const n = i.createContext(t), o = (s) => {
    const { children: a, ...l } = s, c = i.useMemo(() => l, Object.values(l));
    return /* @__PURE__ */ d.jsx(n.Provider, { value: c, children: a });
  };
  o.displayName = e + "Provider";
  function r(s) {
    const a = i.useContext(n);
    if (a) return a;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [o, r];
}
function ln(e, t = []) {
  let n = [];
  function o(s, a) {
    const l = i.createContext(a), c = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = i.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ d.jsx(m.Provider, { value: x, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = i.useContext(h);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(l) {
      const c = l?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, Ju(r, ...t)];
}
function Ju(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((l, { useScope: c, scopeName: u }) => {
        const p = c(s)[`__scope${u}`];
        return { ...l, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Xr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function ci(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Xr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Xr(e[r], null);
        }
      };
  };
}
function Se(...e) {
  return i.useCallback(ci(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  const t = /* @__PURE__ */ Qu(e), n = i.forwardRef((o, r) => {
    const { children: s, ...a } = o, l = i.Children.toArray(s), c = l.find(td);
    if (c) {
      const u = c.props.children, f = l.map((p) => p === c ? i.Children.count(u) > 1 ? i.Children.only(null) : i.isValidElement(u) ? u.props.children : null : p);
      return /* @__PURE__ */ d.jsx(t, { ...a, ref: r, children: i.isValidElement(u) ? i.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ d.jsx(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Qu(e) {
  const t = i.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (i.isValidElement(r)) {
      const a = od(r), l = nd(s, r.props);
      return r.type !== i.Fragment && (l.ref = o ? ci(o, a) : a), i.cloneElement(r, l);
    }
    return i.Children.count(r) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ed = /* @__PURE__ */ Symbol("radix.slottable");
function td(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ed;
}
function nd(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...l) => {
      const c = s(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function od(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function rd(e) {
  const t = e + "CollectionProvider", [n, o] = ln(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (m) => {
    const { scope: x, children: w } = m, b = rt.useRef(null), y = rt.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ d.jsx(r, { scope: x, itemMap: y, collectionRef: b, children: w });
  };
  a.displayName = t;
  const l = e + "CollectionSlot", c = /* @__PURE__ */ Ft(l), u = rt.forwardRef(
    (m, x) => {
      const { scope: w, children: b } = m, y = s(l, w), C = Se(x, y.collectionRef);
      return /* @__PURE__ */ d.jsx(c, { ref: C, children: b });
    }
  );
  u.displayName = l;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ Ft(f), h = rt.forwardRef(
    (m, x) => {
      const { scope: w, children: b, ...y } = m, C = rt.useRef(null), E = Se(x, C), P = s(f, w);
      return rt.useEffect(() => (P.itemMap.set(C, { ref: C, ...y }), () => {
        P.itemMap.delete(C);
      })), /* @__PURE__ */ d.jsx(g, { [p]: "", ref: E, children: b });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = s(e + "CollectionConsumer", m);
    return rt.useCallback(() => {
      const b = x.collectionRef.current;
      if (!b) return [];
      const y = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (P, S) => y.indexOf(P.ref.current) - y.indexOf(S.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    v,
    o
  ];
}
var sd = i.createContext(void 0);
function id(e) {
  const t = i.useContext(sd);
  return e || t || "ltr";
}
var ad = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ve = ad.reduce((e, t) => {
  const n = /* @__PURE__ */ Ft(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...l } = r, c = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(c, { ...l, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function ld(e, t) {
  e && Bt.flushSync(() => e.dispatchEvent(t));
}
function St(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
function cd(e, t = globalThis?.document) {
  const n = St(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var ud = "DismissableLayer", Vo = "dismissableLayer.update", dd = "dismissableLayer.pointerDownOutside", fd = "dismissableLayer.focusOutside", qr, ui = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Kn = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: l,
      ...c
    } = e, u = i.useContext(ui), [f, p] = i.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = i.useState({}), v = Se(t, (S) => p(S)), m = Array.from(u.layers), [x] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), w = m.indexOf(x), b = f ? m.indexOf(f) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, C = b >= w, E = hd((S) => {
      const R = S.target, j = [...u.branches].some((A) => A.contains(R));
      !C || j || (r?.(S), a?.(S), S.defaultPrevented || l?.());
    }, g), P = gd((S) => {
      const R = S.target;
      [...u.branches].some((A) => A.contains(R)) || (s?.(S), a?.(S), S.defaultPrevented || l?.());
    }, g);
    return cd((S) => {
      b === u.layers.size - 1 && (o?.(S), !S.defaultPrevented && l && (S.preventDefault(), l()));
    }, g), i.useEffect(() => {
      if (f)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (qr = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), Zr(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (g.body.style.pointerEvents = qr);
        };
    }, [f, g, n, u]), i.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), Zr());
    }, [f, u]), i.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Vo, S), () => document.removeEventListener(Vo, S);
    }, []), /* @__PURE__ */ d.jsx(
      ve.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: he(e.onFocusCapture, P.onFocusCapture),
        onBlurCapture: he(e.onBlurCapture, P.onBlurCapture),
        onPointerDownCapture: he(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Kn.displayName = ud;
var pd = "DismissableLayerBranch", md = i.forwardRef((e, t) => {
  const n = i.useContext(ui), o = i.useRef(null), r = Se(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ d.jsx(ve.div, { ...e, ref: r });
});
md.displayName = pd;
function hd(e, t = globalThis?.document) {
  const n = St(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (l) => {
      if (l.target && !o.current) {
        let c = function() {
          di(
            dd,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function gd(e, t = globalThis?.document) {
  const n = St(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && di(fd, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Zr() {
  const e = new CustomEvent(Vo);
  document.dispatchEvent(e);
}
function di(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? ld(r, s) : r.dispatchEvent(s);
}
var Po = 0;
function rr() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Jr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Jr()), Po++, () => {
      Po === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Po--;
    };
  }, []);
}
function Jr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var To = "focusScope.autoFocusOnMount", No = "focusScope.autoFocusOnUnmount", Qr = { bubbles: !1, cancelable: !0 }, vd = "FocusScope", Yn = i.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [l, c] = i.useState(null), u = St(r), f = St(s), p = i.useRef(null), g = Se(t, (m) => c(m)), h = i.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  i.useEffect(() => {
    if (o) {
      let m = function(y) {
        if (h.paused || !l) return;
        const C = y.target;
        l.contains(C) ? p.current = C : st(p.current, { select: !0 });
      }, x = function(y) {
        if (h.paused || !l) return;
        const C = y.relatedTarget;
        C !== null && (l.contains(C) || st(p.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const E of y)
            E.removedNodes.length > 0 && st(l);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", x);
      const b = new MutationObserver(w);
      return l && b.observe(l, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", x), b.disconnect();
      };
    }
  }, [o, l, h.paused]), i.useEffect(() => {
    if (l) {
      ts.add(h);
      const m = document.activeElement;
      if (!l.contains(m)) {
        const w = new CustomEvent(To, Qr);
        l.addEventListener(To, u), l.dispatchEvent(w), w.defaultPrevented || (xd(Sd(fi(l)), { select: !0 }), document.activeElement === m && st(l));
      }
      return () => {
        l.removeEventListener(To, u), setTimeout(() => {
          const w = new CustomEvent(No, Qr);
          l.addEventListener(No, f), l.dispatchEvent(w), w.defaultPrevented || st(m ?? document.body, { select: !0 }), l.removeEventListener(No, f), ts.remove(h);
        }, 0);
      };
    }
  }, [l, u, f, h]);
  const v = i.useCallback(
    (m) => {
      if (!n && !o || h.paused) return;
      const x = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, w = document.activeElement;
      if (x && w) {
        const b = m.currentTarget, [y, C] = bd(b);
        y && C ? !m.shiftKey && w === C ? (m.preventDefault(), n && st(y, { select: !0 })) : m.shiftKey && w === y && (m.preventDefault(), n && st(C, { select: !0 })) : w === b && m.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ d.jsx(ve.div, { tabIndex: -1, ...a, ref: g, onKeyDown: v });
});
Yn.displayName = vd;
function xd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (st(o, { select: t }), document.activeElement !== n) return;
}
function bd(e) {
  const t = fi(e), n = es(t, e), o = es(t.reverse(), e);
  return [n, o];
}
function fi(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function es(e, t) {
  for (const n of e)
    if (!wd(n, { upTo: t })) return n;
}
function wd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function yd(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function st(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && yd(e) && t && e.select();
  }
}
var ts = Cd();
function Cd() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ns(e, t), e.unshift(t);
    },
    remove(t) {
      e = ns(e, t), e[0]?.resume();
    }
  };
}
function ns(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Sd(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ne = globalThis?.document ? i.useLayoutEffect : () => {
}, Ed = i[" useId ".trim().toString()] || (() => {
}), kd = 0;
function yt(e) {
  const [t, n] = i.useState(Ed());
  return Ne(() => {
    n((o) => o ?? String(kd++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Rd = ["top", "right", "bottom", "left"], at = Math.min, Oe = Math.max, $n = Math.round, Sn = Math.floor, Be = (e) => ({
  x: e,
  y: e
}), Pd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ho(e, t, n) {
  return Oe(e, at(t, n));
}
function qe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ze(e) {
  return e.split("-")[0];
}
function Ut(e) {
  return e.split("-")[1];
}
function sr(e) {
  return e === "x" ? "y" : "x";
}
function ir(e) {
  return e === "y" ? "height" : "width";
}
function He(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function ar(e) {
  return sr(He(e));
}
function Td(e, t, n) {
  n === void 0 && (n = !1);
  const o = Ut(e), r = ar(e), s = ir(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Ln(a)), [a, Ln(a)];
}
function Nd(e) {
  const t = Ln(e);
  return [Bo(e), t, Bo(t)];
}
function Bo(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const os = ["left", "right"], rs = ["right", "left"], Id = ["top", "bottom"], Ad = ["bottom", "top"];
function Od(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? rs : os : t ? os : rs;
    case "left":
    case "right":
      return t ? Id : Ad;
    default:
      return [];
  }
}
function jd(e, t, n, o) {
  const r = Ut(e);
  let s = Od(Ze(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(Bo)))), s;
}
function Ln(e) {
  const t = Ze(e);
  return Pd[t] + e.slice(t.length);
}
function _d(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function pi(e) {
  return typeof e != "number" ? _d(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function zn(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function ss(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = He(t), a = ar(t), l = ir(a), c = Ze(t), u = s === "y", f = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, g = o[l] / 2 - r[l] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: f,
        y: o.y - r.height
      };
      break;
    case "bottom":
      h = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      h = {
        x: o.x + o.width,
        y: p
      };
      break;
    case "left":
      h = {
        x: o.x - r.width,
        y: p
      };
      break;
    default:
      h = {
        x: o.x,
        y: o.y
      };
  }
  switch (Ut(t)) {
    case "start":
      h[a] -= g * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += g * (n && u ? -1 : 1);
      break;
  }
  return h;
}
async function Dd(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: a,
    elements: l,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: g = !1,
    padding: h = 0
  } = qe(t, e), v = pi(h), x = l[g ? p === "floating" ? "reference" : "floating" : p], w = zn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(x))) == null || n ? x : x.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), b = p === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), C = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = zn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: b,
    offsetParent: y,
    strategy: c
  }) : b);
  return {
    top: (w.top - E.top + v.top) / C.y,
    bottom: (E.bottom - w.bottom + v.bottom) / C.y,
    left: (w.left - E.left + v.left) / C.x,
    right: (E.right - w.right + v.right) / C.x
  };
}
const Md = 50, $d = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, l = a.detectOverflow ? a : {
    ...a,
    detectOverflow: Dd
  }, c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: p
  } = ss(u, o, c), g = o, h = 0;
  const v = {};
  for (let m = 0; m < s.length; m++) {
    const x = s[m];
    if (!x)
      continue;
    const {
      name: w,
      fn: b
    } = x, {
      x: y,
      y: C,
      data: E,
      reset: P
    } = await b({
      x: f,
      y: p,
      initialPlacement: o,
      placement: g,
      strategy: r,
      middlewareData: v,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = y ?? f, p = C ?? p, v[w] = {
      ...v[w],
      ...E
    }, P && h < Md && (h++, typeof P == "object" && (P.placement && (g = P.placement), P.rects && (u = P.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : P.rects), {
      x: f,
      y: p
    } = ss(u, g, c)), m = -1);
  }
  return {
    x: f,
    y: p,
    placement: g,
    strategy: r,
    middlewareData: v
  };
}, Ld = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: a,
      elements: l,
      middlewareData: c
    } = t, {
      element: u,
      padding: f = 0
    } = qe(e, t) || {};
    if (u == null)
      return {};
    const p = pi(f), g = {
      x: n,
      y: o
    }, h = ar(r), v = ir(h), m = await a.getDimensions(u), x = h === "y", w = x ? "top" : "left", b = x ? "bottom" : "right", y = x ? "clientHeight" : "clientWidth", C = s.reference[v] + s.reference[h] - g[h] - s.floating[v], E = g[h] - s.reference[h], P = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let S = P ? P[y] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(P))) && (S = l.floating[y] || s.floating[v]);
    const R = C / 2 - E / 2, j = S / 2 - m[v] / 2 - 1, A = at(p[w], j), _ = at(p[b], j), X = A, H = S - m[v] - _, Q = S / 2 - m[v] / 2 + R, ee = Ho(X, Q, H), L = !c.arrow && Ut(r) != null && Q !== ee && s.reference[v] / 2 - (Q < X ? A : _) - m[v] / 2 < 0, U = L ? Q < X ? Q - X : Q - H : 0;
    return {
      [h]: g[h] + U,
      data: {
        [h]: ee,
        centerOffset: Q - ee - U,
        ...L && {
          alignmentOffset: U
        }
      },
      reset: L
    };
  }
}), zd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: s,
        rects: a,
        initialPlacement: l,
        platform: c,
        elements: u
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: g,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: m = !0,
        ...x
      } = qe(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = Ze(r), b = He(l), y = Ze(l) === l, C = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = g || (y || !m ? [Ln(l)] : Nd(l)), P = v !== "none";
      !g && P && E.push(...jd(l, m, v, C));
      const S = [l, ...E], R = await c.detectOverflow(t, x), j = [];
      let A = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (f && j.push(R[w]), p) {
        const Q = Td(r, a, C);
        j.push(R[Q[0]], R[Q[1]]);
      }
      if (A = [...A, {
        placement: r,
        overflows: j
      }], !j.every((Q) => Q <= 0)) {
        var _, X;
        const Q = (((_ = s.flip) == null ? void 0 : _.index) || 0) + 1, ee = S[Q];
        if (ee && (!(p === "alignment" ? b !== He(ee) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        A.every((W) => He(W.placement) === b ? W.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Q,
              overflows: A
            },
            reset: {
              placement: ee
            }
          };
        let L = (X = A.filter((U) => U.overflows[0] <= 0).sort((U, W) => U.overflows[1] - W.overflows[1])[0]) == null ? void 0 : X.placement;
        if (!L)
          switch (h) {
            case "bestFit": {
              var H;
              const U = (H = A.filter((W) => {
                if (P) {
                  const K = He(W.placement);
                  return K === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  K === "y";
                }
                return !0;
              }).map((W) => [W.placement, W.overflows.filter((K) => K > 0).reduce((K, $) => K + $, 0)]).sort((W, K) => W[1] - K[1])[0]) == null ? void 0 : H[0];
              U && (L = U);
              break;
            }
            case "initialPlacement":
              L = l;
              break;
          }
        if (r !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
};
function is(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function as(e) {
  return Rd.some((t) => e[t] >= 0);
}
const Fd = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n,
        platform: o
      } = t, {
        strategy: r = "referenceHidden",
        ...s
      } = qe(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await o.detectOverflow(t, {
            ...s,
            elementContext: "reference"
          }), l = is(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: as(l)
            }
          };
        }
        case "escaped": {
          const a = await o.detectOverflow(t, {
            ...s,
            altBoundary: !0
          }), l = is(a, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: as(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, mi = /* @__PURE__ */ new Set(["left", "top"]);
async function Wd(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Ze(n), l = Ut(n), c = He(n) === "y", u = mi.has(a) ? -1 : 1, f = s && c ? -1 : 1, p = qe(t, e);
  let {
    mainAxis: g,
    crossAxis: h,
    alignmentAxis: v
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return l && typeof v == "number" && (h = l === "end" ? v * -1 : v), c ? {
    x: h * f,
    y: g * u
  } : {
    x: g * u,
    y: h * f
  };
}
const Vd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: a,
        middlewareData: l
      } = t, c = await Wd(t, e);
      return a === ((n = l.offset) == null ? void 0 : n.placement) && (o = l.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, Hd = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        platform: s
      } = t, {
        mainAxis: a = !0,
        crossAxis: l = !1,
        limiter: c = {
          fn: (w) => {
            let {
              x: b,
              y
            } = w;
            return {
              x: b,
              y
            };
          }
        },
        ...u
      } = qe(e, t), f = {
        x: n,
        y: o
      }, p = await s.detectOverflow(t, u), g = He(Ze(r)), h = sr(g);
      let v = f[h], m = f[g];
      if (a) {
        const w = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", y = v + p[w], C = v - p[b];
        v = Ho(y, v, C);
      }
      if (l) {
        const w = g === "y" ? "top" : "left", b = g === "y" ? "bottom" : "right", y = m + p[w], C = m - p[b];
        m = Ho(y, m, C);
      }
      const x = c.fn({
        ...t,
        [h]: v,
        [g]: m
      });
      return {
        ...x,
        data: {
          x: x.x - n,
          y: x.y - o,
          enabled: {
            [h]: a,
            [g]: l
          }
        }
      };
    }
  };
}, Bd = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: s,
        middlewareData: a
      } = t, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = qe(e, t), f = {
        x: n,
        y: o
      }, p = He(r), g = sr(p);
      let h = f[g], v = f[p];
      const m = qe(l, t), x = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const y = g === "y" ? "height" : "width", C = s.reference[g] - s.floating[y] + x.mainAxis, E = s.reference[g] + s.reference[y] - x.mainAxis;
        h < C ? h = C : h > E && (h = E);
      }
      if (u) {
        var w, b;
        const y = g === "y" ? "width" : "height", C = mi.has(Ze(r)), E = s.reference[p] - s.floating[y] + (C && ((w = a.offset) == null ? void 0 : w[p]) || 0) + (C ? 0 : x.crossAxis), P = s.reference[p] + s.reference[y] + (C ? 0 : ((b = a.offset) == null ? void 0 : b[p]) || 0) - (C ? x.crossAxis : 0);
        v < E ? v = E : v > P && (v = P);
      }
      return {
        [g]: h,
        [p]: v
      };
    }
  };
}, Ud = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: a,
        elements: l
      } = t, {
        apply: c = () => {
        },
        ...u
      } = qe(e, t), f = await a.detectOverflow(t, u), p = Ze(r), g = Ut(r), h = He(r) === "y", {
        width: v,
        height: m
      } = s.floating;
      let x, w;
      p === "top" || p === "bottom" ? (x = p, w = g === (await (a.isRTL == null ? void 0 : a.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (w = p, x = g === "end" ? "top" : "bottom");
      const b = m - f.top - f.bottom, y = v - f.left - f.right, C = at(m - f[x], b), E = at(v - f[w], y), P = !t.middlewareData.shift;
      let S = C, R = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = y), (o = t.middlewareData.shift) != null && o.enabled.y && (S = b), P && !g) {
        const A = Oe(f.left, 0), _ = Oe(f.right, 0), X = Oe(f.top, 0), H = Oe(f.bottom, 0);
        h ? R = v - 2 * (A !== 0 || _ !== 0 ? A + _ : Oe(f.left, f.right)) : S = m - 2 * (X !== 0 || H !== 0 ? X + H : Oe(f.top, f.bottom));
      }
      await c({
        ...t,
        availableWidth: R,
        availableHeight: S
      });
      const j = await a.getDimensions(l.floating);
      return v !== j.width || m !== j.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Xn() {
  return typeof window < "u";
}
function Gt(e) {
  return hi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ue(e) {
  var t;
  return (t = (hi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function hi(e) {
  return Xn() ? e instanceof Node || e instanceof je(e).Node : !1;
}
function $e(e) {
  return Xn() ? e instanceof Element || e instanceof je(e).Element : !1;
}
function Je(e) {
  return Xn() ? e instanceof HTMLElement || e instanceof je(e).HTMLElement : !1;
}
function ls(e) {
  return !Xn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof je(e).ShadowRoot;
}
function cn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Le(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Gd(e) {
  return /^(table|td|th)$/.test(Gt(e));
}
function qn(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const Kd = /transform|translate|scale|rotate|perspective|filter/, Yd = /paint|layout|strict|content/, bt = (e) => !!e && e !== "none";
let Io;
function lr(e) {
  const t = $e(e) ? Le(e) : e;
  return bt(t.transform) || bt(t.translate) || bt(t.scale) || bt(t.rotate) || bt(t.perspective) || !cr() && (bt(t.backdropFilter) || bt(t.filter)) || Kd.test(t.willChange || "") || Yd.test(t.contain || "");
}
function Xd(e) {
  let t = lt(e);
  for (; Je(t) && !Wt(t); ) {
    if (lr(t))
      return t;
    if (qn(t))
      return null;
    t = lt(t);
  }
  return null;
}
function cr() {
  return Io == null && (Io = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Io;
}
function Wt(e) {
  return /^(html|body|#document)$/.test(Gt(e));
}
function Le(e) {
  return je(e).getComputedStyle(e);
}
function Zn(e) {
  return $e(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function lt(e) {
  if (Gt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ls(e) && e.host || // Fallback.
    Ue(e)
  );
  return ls(t) ? t.host : t;
}
function gi(e) {
  const t = lt(e);
  return Wt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Je(t) && cn(t) ? t : gi(t);
}
function on(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = gi(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = je(r);
  if (s) {
    const l = Uo(a);
    return t.concat(a, a.visualViewport || [], cn(r) ? r : [], l && n ? on(l) : []);
  } else
    return t.concat(r, on(r, [], n));
}
function Uo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function vi(e) {
  const t = Le(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Je(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, l = $n(n) !== s || $n(o) !== a;
  return l && (n = s, o = a), {
    width: n,
    height: o,
    $: l
  };
}
function ur(e) {
  return $e(e) ? e : e.contextElement;
}
function $t(e) {
  const t = ur(e);
  if (!Je(t))
    return Be(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = vi(t);
  let a = (s ? $n(n.width) : n.width) / o, l = (s ? $n(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const qd = /* @__PURE__ */ Be(0);
function xi(e) {
  const t = je(e);
  return !cr() || !t.visualViewport ? qd : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Zd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== je(e) ? !1 : t;
}
function Et(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = ur(e);
  let a = Be(1);
  t && (o ? $e(o) && (a = $t(o)) : a = $t(e));
  const l = Zd(s, n, o) ? xi(s) : Be(0);
  let c = (r.left + l.x) / a.x, u = (r.top + l.y) / a.y, f = r.width / a.x, p = r.height / a.y;
  if (s) {
    const g = je(s), h = o && $e(o) ? je(o) : o;
    let v = g, m = Uo(v);
    for (; m && o && h !== v; ) {
      const x = $t(m), w = m.getBoundingClientRect(), b = Le(m), y = w.left + (m.clientLeft + parseFloat(b.paddingLeft)) * x.x, C = w.top + (m.clientTop + parseFloat(b.paddingTop)) * x.y;
      c *= x.x, u *= x.y, f *= x.x, p *= x.y, c += y, u += C, v = je(m), m = Uo(v);
    }
  }
  return zn({
    width: f,
    height: p,
    x: c,
    y: u
  });
}
function Jn(e, t) {
  const n = Zn(e).scrollLeft;
  return t ? t.left + n : Et(Ue(e)).left + n;
}
function bi(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Jn(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function Jd(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = Ue(o), l = t ? qn(t.floating) : !1;
  if (o === a || l && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Be(1);
  const f = Be(0), p = Je(o);
  if ((p || !p && !s) && ((Gt(o) !== "body" || cn(a)) && (c = Zn(o)), p)) {
    const h = Et(o);
    u = $t(o), f.x = h.x + o.clientLeft, f.y = h.y + o.clientTop;
  }
  const g = a && !p && !s ? bi(a, c) : Be(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + f.x + g.x,
    y: n.y * u.y - c.scrollTop * u.y + f.y + g.y
  };
}
function Qd(e) {
  return Array.from(e.getClientRects());
}
function ef(e) {
  const t = Ue(e), n = Zn(e), o = e.ownerDocument.body, r = Oe(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = Oe(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Jn(e);
  const l = -n.scrollTop;
  return Le(o).direction === "rtl" && (a += Oe(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: l
  };
}
const cs = 25;
function tf(e, t) {
  const n = je(e), o = Ue(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, l = 0, c = 0;
  if (r) {
    s = r.width, a = r.height;
    const f = cr();
    (!f || f && t === "fixed") && (l = r.offsetLeft, c = r.offsetTop);
  }
  const u = Jn(o);
  if (u <= 0) {
    const f = o.ownerDocument, p = f.body, g = getComputedStyle(p), h = f.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, v = Math.abs(o.clientWidth - p.clientWidth - h);
    v <= cs && (s -= v);
  } else u <= cs && (s += u);
  return {
    width: s,
    height: a,
    x: l,
    y: c
  };
}
function nf(e, t) {
  const n = Et(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = Je(e) ? $t(e) : Be(1), a = e.clientWidth * s.x, l = e.clientHeight * s.y, c = r * s.x, u = o * s.y;
  return {
    width: a,
    height: l,
    x: c,
    y: u
  };
}
function us(e, t, n) {
  let o;
  if (t === "viewport")
    o = tf(e, n);
  else if (t === "document")
    o = ef(Ue(e));
  else if ($e(t))
    o = nf(t, n);
  else {
    const r = xi(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return zn(o);
}
function wi(e, t) {
  const n = lt(e);
  return n === t || !$e(n) || Wt(n) ? !1 : Le(n).position === "fixed" || wi(n, t);
}
function of(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = on(e, [], !1).filter((l) => $e(l) && Gt(l) !== "body"), r = null;
  const s = Le(e).position === "fixed";
  let a = s ? lt(e) : e;
  for (; $e(a) && !Wt(a); ) {
    const l = Le(a), c = lr(a);
    !c && l.position === "fixed" && (r = null), (s ? !c && !r : !c && l.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || cn(a) && !c && wi(e, a)) ? o = o.filter((f) => f !== a) : r = l, a = lt(a);
  }
  return t.set(e, o), o;
}
function rf(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? qn(t) ? [] : of(t, this._c) : [].concat(n), o], l = us(t, a[0], r);
  let c = l.top, u = l.right, f = l.bottom, p = l.left;
  for (let g = 1; g < a.length; g++) {
    const h = us(t, a[g], r);
    c = Oe(h.top, c), u = at(h.right, u), f = at(h.bottom, f), p = Oe(h.left, p);
  }
  return {
    width: u - p,
    height: f - c,
    x: p,
    y: c
  };
}
function sf(e) {
  const {
    width: t,
    height: n
  } = vi(e);
  return {
    width: t,
    height: n
  };
}
function af(e, t, n) {
  const o = Je(t), r = Ue(t), s = n === "fixed", a = Et(e, !0, s, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Be(0);
  function u() {
    c.x = Jn(r);
  }
  if (o || !o && !s)
    if ((Gt(t) !== "body" || cn(r)) && (l = Zn(t)), o) {
      const h = Et(t, !0, s, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else r && u();
  s && !o && r && u();
  const f = r && !o && !s ? bi(r, l) : Be(0), p = a.left + l.scrollLeft - c.x - f.x, g = a.top + l.scrollTop - c.y - f.y;
  return {
    x: p,
    y: g,
    width: a.width,
    height: a.height
  };
}
function Ao(e) {
  return Le(e).position === "static";
}
function ds(e, t) {
  if (!Je(e) || Le(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ue(e) === n && (n = n.ownerDocument.body), n;
}
function yi(e, t) {
  const n = je(e);
  if (qn(e))
    return n;
  if (!Je(e)) {
    let r = lt(e);
    for (; r && !Wt(r); ) {
      if ($e(r) && !Ao(r))
        return r;
      r = lt(r);
    }
    return n;
  }
  let o = ds(e, t);
  for (; o && Gd(o) && Ao(o); )
    o = ds(o, t);
  return o && Wt(o) && Ao(o) && !lr(o) ? n : o || Xd(e) || n;
}
const lf = async function(e) {
  const t = this.getOffsetParent || yi, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: af(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function cf(e) {
  return Le(e).direction === "rtl";
}
const uf = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Jd,
  getDocumentElement: Ue,
  getClippingRect: rf,
  getOffsetParent: yi,
  getElementRects: lf,
  getClientRects: Qd,
  getDimensions: sf,
  getScale: $t,
  isElement: $e,
  isRTL: cf
};
function Ci(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function df(e, t) {
  let n = null, o;
  const r = Ue(e);
  function s() {
    var l;
    clearTimeout(o), (l = n) == null || l.disconnect(), n = null;
  }
  function a(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), s();
    const u = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: g,
      height: h
    } = u;
    if (l || t(), !g || !h)
      return;
    const v = Sn(p), m = Sn(r.clientWidth - (f + g)), x = Sn(r.clientHeight - (p + h)), w = Sn(f), y = {
      rootMargin: -v + "px " + -m + "px " + -x + "px " + -w + "px",
      threshold: Oe(0, at(1, c)) || 1
    };
    let C = !0;
    function E(P) {
      const S = P[0].intersectionRatio;
      if (S !== c) {
        if (!C)
          return a();
        S ? a(!1, S) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Ci(u, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, y);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Si(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = ur(e), f = r || s ? [...u ? on(u) : [], ...t ? on(t) : []] : [];
  f.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const p = u && l ? df(u, n) : null;
  let g = -1, h = null;
  a && (h = new ResizeObserver((w) => {
    let [b] = w;
    b && b.target === u && h && t && (h.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), u && !c && h.observe(u), t && h.observe(t));
  let v, m = c ? Et(e) : null;
  c && x();
  function x() {
    const w = Et(e);
    m && !Ci(m, w) && n(), m = w, v = requestAnimationFrame(x);
  }
  return n(), () => {
    var w;
    f.forEach((b) => {
      r && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), p?.(), (w = h) == null || w.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const ff = Vd, pf = Hd, mf = zd, hf = Ud, gf = Fd, fs = Ld, vf = Bd, xf = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: uf,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return $d(e, t, {
    ...r,
    platform: s
  });
};
var bf = typeof document < "u", wf = function() {
}, An = bf ? Pl : wf;
function Fn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (o = n; o-- !== 0; )
        if (!Fn(e[o], t[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !Fn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ei(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ps(e, t) {
  const n = Ei(e);
  return Math.round(t * n) / n;
}
function Oo(e) {
  const t = i.useRef(e);
  return An(() => {
    t.current = e;
  }), t;
}
function ki(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: l = !0,
    whileElementsMounted: c,
    open: u
  } = e, [f, p] = i.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [g, h] = i.useState(o);
  Fn(g, o) || h(o);
  const [v, m] = i.useState(null), [x, w] = i.useState(null), b = i.useCallback((W) => {
    W !== P.current && (P.current = W, m(W));
  }, []), y = i.useCallback((W) => {
    W !== S.current && (S.current = W, w(W));
  }, []), C = s || v, E = a || x, P = i.useRef(null), S = i.useRef(null), R = i.useRef(f), j = c != null, A = Oo(c), _ = Oo(r), X = Oo(u), H = i.useCallback(() => {
    if (!P.current || !S.current)
      return;
    const W = {
      placement: t,
      strategy: n,
      middleware: g
    };
    _.current && (W.platform = _.current), xf(P.current, S.current, W).then((K) => {
      const $ = {
        ...K,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: X.current !== !1
      };
      Q.current && !Fn(R.current, $) && (R.current = $, Bt.flushSync(() => {
        p($);
      }));
    });
  }, [g, t, n, _, X]);
  An(() => {
    u === !1 && R.current.isPositioned && (R.current.isPositioned = !1, p((W) => ({
      ...W,
      isPositioned: !1
    })));
  }, [u]);
  const Q = i.useRef(!1);
  An(() => (Q.current = !0, () => {
    Q.current = !1;
  }), []), An(() => {
    if (C && (P.current = C), E && (S.current = E), C && E) {
      if (A.current)
        return A.current(C, E, H);
      H();
    }
  }, [C, E, H, A, j]);
  const ee = i.useMemo(() => ({
    reference: P,
    floating: S,
    setReference: b,
    setFloating: y
  }), [b, y]), L = i.useMemo(() => ({
    reference: C,
    floating: E
  }), [C, E]), U = i.useMemo(() => {
    const W = {
      position: n,
      left: 0,
      top: 0
    };
    if (!L.floating)
      return W;
    const K = ps(L.floating, f.x), $ = ps(L.floating, f.y);
    return l ? {
      ...W,
      transform: "translate(" + K + "px, " + $ + "px)",
      ...Ei(L.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: K,
      top: $
    };
  }, [n, l, L.floating, f.x, f.y]);
  return i.useMemo(() => ({
    ...f,
    update: H,
    refs: ee,
    elements: L,
    floatingStyles: U
  }), [f, H, ee, L, U]);
}
const yf = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: o,
        padding: r
      } = typeof e == "function" ? e(n) : e;
      return o && t(o) ? o.current != null ? fs({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? fs({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, Ri = (e, t) => {
  const n = ff(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Pi = (e, t) => {
  const n = pf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Ti = (e, t) => ({
  fn: vf(e).fn,
  options: [e, t]
}), Ni = (e, t) => {
  const n = mf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Ii = (e, t) => {
  const n = hf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Ai = (e, t) => {
  const n = gf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Oi = (e, t) => {
  const n = yf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var Cf = "Arrow", ji = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ d.jsx(
    ve.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ d.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ji.displayName = Cf;
var Sf = ji;
function Ef(e) {
  const [t, n] = i.useState(void 0);
  return Ne(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const s = r[0];
        let a, l;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          a = u.inlineSize, l = u.blockSize;
        } else
          a = e.offsetWidth, l = e.offsetHeight;
        n({ width: a, height: l });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var dr = "Popper", [_i, Qn] = ln(dr), [kf, Di] = _i(dr), Mi = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null);
  return /* @__PURE__ */ d.jsx(kf, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Mi.displayName = dr;
var $i = "PopperAnchor", Li = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Di($i, n), a = i.useRef(null), l = Se(t, a), c = i.useRef(null);
    return i.useEffect(() => {
      const u = c.current;
      c.current = o?.current || a.current, u !== c.current && s.onAnchorChange(c.current);
    }), o ? null : /* @__PURE__ */ d.jsx(ve.div, { ...r, ref: l });
  }
);
Li.displayName = $i;
var fr = "PopperContent", [Rf, Pf] = _i(fr), zi = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: l = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = Di(fr, n), [w, b] = i.useState(null), y = Se(t, (O) => b(O)), [C, E] = i.useState(null), P = Ef(C), S = P?.width ?? 0, R = P?.height ?? 0, j = o + (s !== "center" ? "-" + s : ""), A = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, _ = Array.isArray(u) ? u : [u], X = _.length > 0, H = {
      padding: A,
      boundary: _.filter(Nf),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: ee, placement: L, isPositioned: U, middlewareData: W } = ki({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: j,
      whileElementsMounted: (...O) => Si(...O, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        Ri({ mainAxis: r + R, alignmentAxis: a }),
        c && Pi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? Ti() : void 0,
          ...H
        }),
        c && Ni({ ...H }),
        Ii({
          ...H,
          apply: ({ elements: O, rects: Z, availableWidth: te, availableHeight: ue }) => {
            const { width: de, height: me } = Z.reference, ye = O.floating.style;
            ye.setProperty("--radix-popper-available-width", `${te}px`), ye.setProperty("--radix-popper-available-height", `${ue}px`), ye.setProperty("--radix-popper-anchor-width", `${de}px`), ye.setProperty("--radix-popper-anchor-height", `${me}px`);
          }
        }),
        C && Oi({ element: C, padding: l }),
        If({ arrowWidth: S, arrowHeight: R }),
        g && Ai({ strategy: "referenceHidden", ...H })
      ]
    }), [K, $] = Vi(L), k = St(v);
    Ne(() => {
      U && k?.();
    }, [U, k]);
    const Y = W.arrow?.x, re = W.arrow?.y, ne = W.arrow?.centerOffset !== 0, [q, ae] = i.useState();
    return Ne(() => {
      w && ae(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ee,
          transform: U ? ee.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: q,
          "--radix-popper-transform-origin": [
            W.transformOrigin?.x,
            W.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...W.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ d.jsx(
          Rf,
          {
            scope: n,
            placedSide: K,
            onArrowChange: E,
            arrowX: Y,
            arrowY: re,
            shouldHideArrow: ne,
            children: /* @__PURE__ */ d.jsx(
              ve.div,
              {
                "data-side": K,
                "data-align": $,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: U ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
zi.displayName = fr;
var Fi = "PopperArrow", Tf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Wi = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Pf(Fi, o), a = Tf[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ d.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ d.jsx(
          Sf,
          {
            ...r,
            ref: n,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Wi.displayName = Fi;
function Nf(e) {
  return e !== null;
}
var If = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, l = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [u, f] = Vi(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + l / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return u === "bottom" ? (v = a ? p : `${g}px`, m = `${-c}px`) : u === "top" ? (v = a ? p : `${g}px`, m = `${o.floating.height + c}px`) : u === "right" ? (v = `${-c}px`, m = a ? p : `${h}px`) : u === "left" && (v = `${o.floating.width + c}px`, m = a ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function Vi(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Hi = Mi, pr = Li, Bi = zi, Ui = Wi, Af = "Portal", mr = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  Ne(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Nl.createPortal(/* @__PURE__ */ d.jsx(ve.div, { ...o, ref: t }), a) : null;
});
mr.displayName = Af;
var Of = i[" useInsertionEffect ".trim().toString()] || Ne;
function Wn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = jf({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (l) {
        const p = _f(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [l, e, s, a]
  );
  return [c, u];
}
function jf({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Of(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function _f(e) {
  return typeof e == "function";
}
function Df(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Gi = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Mf = "VisuallyHidden", $f = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(
    ve.span,
    {
      ...e,
      ref: t,
      style: { ...Gi, ...e.style }
    }
  )
);
$f.displayName = Mf;
var Lf = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, jt = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), kn = {}, jo = 0, Ki = function(e) {
  return e && (e.host || Ki(e.parentNode));
}, zf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ki(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ff = function(e, t, n, o) {
  var r = zf(t, Array.isArray(e) ? e : [e]);
  kn[n] || (kn[n] = /* @__PURE__ */ new WeakMap());
  var s = kn[n], a = [], l = /* @__PURE__ */ new Set(), c = new Set(r), u = function(p) {
    !p || l.has(p) || (l.add(p), u(p.parentNode));
  };
  r.forEach(u);
  var f = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(g) {
      if (l.has(g))
        f(g);
      else
        try {
          var h = g.getAttribute(o), v = h !== null && h !== "false", m = (jt.get(g) || 0) + 1, x = (s.get(g) || 0) + 1;
          jt.set(g, m), s.set(g, x), a.push(g), m === 1 && v && En.set(g, !0), x === 1 && g.setAttribute(n, "true"), v || g.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", g, w);
        }
    });
  };
  return f(t), l.clear(), jo++, function() {
    a.forEach(function(p) {
      var g = jt.get(p) - 1, h = s.get(p) - 1;
      jt.set(p, g), s.set(p, h), g || (En.has(p) || p.removeAttribute(o), En.delete(p)), h || p.removeAttribute(n);
    }), jo--, jo || (jt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), kn = {});
  };
}, hr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Lf(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Ff(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, Ve = function() {
  return Ve = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, Ve.apply(this, arguments);
};
function Yi(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Wf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var On = "right-scroll-bar-position", jn = "width-before-scroll-bar", Vf = "with-scroll-bars-hidden", Hf = "--removed-body-scroll-bar-size";
function _o(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Bf(e, t) {
  var n = Tl(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(o) {
          var r = n.value;
          r !== o && (n.value = o, n.callback(o, r));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Uf = typeof window < "u" ? i.useLayoutEffect : i.useEffect, ms = /* @__PURE__ */ new WeakMap();
function Gf(e, t) {
  var n = Bf(null, function(o) {
    return e.forEach(function(r) {
      return _o(r, o);
    });
  });
  return Uf(function() {
    var o = ms.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(l) {
        s.has(l) || _o(l, null);
      }), s.forEach(function(l) {
        r.has(l) || _o(l, a);
      });
    }
    ms.set(n, e);
  }, [e]), n;
}
function Kf(e) {
  return e;
}
function Yf(e, t) {
  t === void 0 && (t = Kf);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, o);
      return n.push(a), function() {
        n = n.filter(function(l) {
          return l !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (o = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(l) {
          return s(l);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      o = !0;
      var a = [];
      if (n.length) {
        var l = n;
        n = [], l.forEach(s), a = n;
      }
      var c = function() {
        var f = a;
        a = [], f.forEach(s);
      }, u = function() {
        return Promise.resolve().then(c);
      };
      u(), n = {
        push: function(f) {
          a.push(f), u();
        },
        filter: function(f) {
          return a = a.filter(f), n;
        }
      };
    }
  };
  return r;
}
function Xf(e) {
  e === void 0 && (e = {});
  var t = Yf(null);
  return t.options = Ve({ async: !0, ssr: !1 }, e), t;
}
var Xi = function(e) {
  var t = e.sideCar, n = Yi(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return i.createElement(o, Ve({}, n));
};
Xi.isSideCarExport = !0;
function qf(e, t) {
  return e.useMedium(t), Xi;
}
var qi = Xf(), Do = function() {
}, eo = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({
    onScrollCapture: Do,
    onWheelCapture: Do,
    onTouchMoveCapture: Do
  }), r = o[0], s = o[1], a = e.forwardProps, l = e.children, c = e.className, u = e.removeScrollBar, f = e.enabled, p = e.shards, g = e.sideCar, h = e.noRelative, v = e.noIsolation, m = e.inert, x = e.allowPinchZoom, w = e.as, b = w === void 0 ? "div" : w, y = e.gapMode, C = Yi(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = g, P = Gf([n, t]), S = Ve(Ve({}, C), r);
  return i.createElement(
    i.Fragment,
    null,
    f && i.createElement(E, { sideCar: qi, removeScrollBar: u, shards: p, noRelative: h, noIsolation: v, inert: m, setCallbacks: s, allowPinchZoom: !!x, lockRef: n, gapMode: y }),
    a ? i.cloneElement(i.Children.only(l), Ve(Ve({}, S), { ref: P })) : i.createElement(b, Ve({}, S, { className: c, ref: P }), l)
  );
});
eo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
eo.classNames = {
  fullWidth: jn,
  zeroRight: On
};
var Zf = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Jf() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Zf();
  return t && e.setAttribute("nonce", t), e;
}
function Qf(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ep(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var tp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Jf()) && (Qf(t, n), ep(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, np = function() {
  var e = tp();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Zi = function() {
  var e = np(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, op = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Mo = function(e) {
  return parseInt(e || "", 10) || 0;
}, rp = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Mo(n), Mo(o), Mo(r)];
}, sp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return op;
  var t = rp(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, ip = Zi(), Lt = "data-scroll-locked", ap = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, l = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Vf, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(l, "px ").concat(o, `;
  }
  body[`).concat(Lt, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(o, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(l, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(On, ` {
    right: `).concat(l, "px ").concat(o, `;
  }
  
  .`).concat(jn, ` {
    margin-right: `).concat(l, "px ").concat(o, `;
  }
  
  .`).concat(On, " .").concat(On, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(jn, " .").concat(jn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Lt, `] {
    `).concat(Hf, ": ").concat(l, `px;
  }
`);
}, hs = function() {
  var e = parseInt(document.body.getAttribute(Lt) || "0", 10);
  return isFinite(e) ? e : 0;
}, lp = function() {
  i.useEffect(function() {
    return document.body.setAttribute(Lt, (hs() + 1).toString()), function() {
      var e = hs() - 1;
      e <= 0 ? document.body.removeAttribute(Lt) : document.body.setAttribute(Lt, e.toString());
    };
  }, []);
}, cp = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  lp();
  var s = i.useMemo(function() {
    return sp(r);
  }, [r]);
  return i.createElement(ip, { styles: ap(s, !t, r, n ? "" : "!important") });
}, Go = !1;
if (typeof window < "u")
  try {
    var Rn = Object.defineProperty({}, "passive", {
      get: function() {
        return Go = !0, !0;
      }
    });
    window.addEventListener("test", Rn, Rn), window.removeEventListener("test", Rn, Rn);
  } catch {
    Go = !1;
  }
var _t = Go ? { passive: !1 } : !1, up = function(e) {
  return e.tagName === "TEXTAREA";
}, Ji = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !up(e) && n[t] === "visible")
  );
}, dp = function(e) {
  return Ji(e, "overflowY");
}, fp = function(e) {
  return Ji(e, "overflowX");
}, gs = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = Qi(e, o);
    if (r) {
      var s = ea(e, o), a = s[1], l = s[2];
      if (a > l)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, pp = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, mp = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, Qi = function(e, t) {
  return e === "v" ? dp(t) : fp(t);
}, ea = function(e, t) {
  return e === "v" ? pp(t) : mp(t);
}, hp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, gp = function(e, t, n, o, r) {
  var s = hp(e, window.getComputedStyle(t).direction), a = s * o, l = n.target, c = t.contains(l), u = !1, f = a > 0, p = 0, g = 0;
  do {
    if (!l)
      break;
    var h = ea(e, l), v = h[0], m = h[1], x = h[2], w = m - x - s * v;
    (v || w) && Qi(e, l) && (p += w, g += v);
    var b = l.parentNode;
    l = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && l !== document.body || // self content
    c && (t.contains(l) || t === l)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(g) < 1) && (u = !0), u;
}, Pn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, vs = function(e) {
  return [e.deltaX, e.deltaY];
}, xs = function(e) {
  return e && "current" in e ? e.current : e;
}, vp = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, xp = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, bp = 0, Dt = [];
function wp(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(bp++)[0], s = i.useState(Zi)[0], a = i.useRef(e);
  i.useEffect(function() {
    a.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var m = Wf([e.lockRef.current], (e.shards || []).map(xs), !0).filter(Boolean);
      return m.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), m.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var l = i.useCallback(function(m, x) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !a.current.allowPinchZoom;
    var w = Pn(m), b = n.current, y = "deltaX" in m ? m.deltaX : b[0] - w[0], C = "deltaY" in m ? m.deltaY : b[1] - w[1], E, P = m.target, S = Math.abs(y) > Math.abs(C) ? "h" : "v";
    if ("touches" in m && S === "h" && P.type === "range")
      return !1;
    var R = window.getSelection(), j = R && R.anchorNode, A = j ? j === P || j.contains(P) : !1;
    if (A)
      return !1;
    var _ = gs(S, P);
    if (!_)
      return !0;
    if (_ ? E = S : (E = S === "v" ? "h" : "v", _ = gs(S, P)), !_)
      return !1;
    if (!o.current && "changedTouches" in m && (y || C) && (o.current = E), !E)
      return !0;
    var X = o.current || E;
    return gp(X, x, m, X === "h" ? y : C);
  }, []), c = i.useCallback(function(m) {
    var x = m;
    if (!(!Dt.length || Dt[Dt.length - 1] !== s)) {
      var w = "deltaY" in x ? vs(x) : Pn(x), b = t.current.filter(function(E) {
        return E.name === x.type && (E.target === x.target || x.target === E.shadowParent) && vp(E.delta, w);
      })[0];
      if (b && b.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!b) {
        var y = (a.current.shards || []).map(xs).filter(Boolean).filter(function(E) {
          return E.contains(x.target);
        }), C = y.length > 0 ? l(x, y[0]) : !a.current.noIsolation;
        C && x.cancelable && x.preventDefault();
      }
    }
  }, []), u = i.useCallback(function(m, x, w, b) {
    var y = { name: m, delta: x, target: w, should: b, shadowParent: yp(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== y;
      });
    }, 1);
  }, []), f = i.useCallback(function(m) {
    n.current = Pn(m), o.current = void 0;
  }, []), p = i.useCallback(function(m) {
    u(m.type, vs(m), m.target, l(m, e.lockRef.current));
  }, []), g = i.useCallback(function(m) {
    u(m.type, Pn(m), m.target, l(m, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return Dt.push(s), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: g
    }), document.addEventListener("wheel", c, _t), document.addEventListener("touchmove", c, _t), document.addEventListener("touchstart", f, _t), function() {
      Dt = Dt.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", c, _t), document.removeEventListener("touchmove", c, _t), document.removeEventListener("touchstart", f, _t);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return i.createElement(
    i.Fragment,
    null,
    v ? i.createElement(s, { styles: xp(r) }) : null,
    h ? i.createElement(cp, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function yp(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Cp = qf(qi, wp);
var to = i.forwardRef(function(e, t) {
  return i.createElement(eo, Ve({}, e, { ref: t, sideCar: Cp }));
});
to.classNames = eo.classNames;
var Sp = [" ", "Enter", "ArrowUp", "ArrowDown"], Ep = [" ", "Enter"], kt = "Select", [no, oo, kp] = rd(kt), [Kt] = ln(kt, [
  kp,
  Qn
]), ro = Qn(), [Rp, ut] = Kt(kt), [Pp, Tp] = Kt(kt), ta = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    value: a,
    defaultValue: l,
    onValueChange: c,
    dir: u,
    name: f,
    autoComplete: p,
    disabled: g,
    required: h,
    form: v
  } = e, m = ro(t), [x, w] = i.useState(null), [b, y] = i.useState(null), [C, E] = i.useState(!1), P = id(u), [S, R] = Wn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: kt
  }), [j, A] = Wn({
    prop: a,
    defaultProp: l,
    onChange: c,
    caller: kt
  }), _ = i.useRef(null), X = x ? v || !!x.closest("form") : !0, [H, Q] = i.useState(/* @__PURE__ */ new Set()), ee = Array.from(H).map((L) => L.props.value).join(";");
  return /* @__PURE__ */ d.jsx(Hi, { ...m, children: /* @__PURE__ */ d.jsxs(
    Rp,
    {
      required: h,
      scope: t,
      trigger: x,
      onTriggerChange: w,
      valueNode: b,
      onValueNodeChange: y,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: E,
      contentId: yt(),
      value: j,
      onValueChange: A,
      open: S,
      onOpenChange: R,
      dir: P,
      triggerPointerDownPosRef: _,
      disabled: g,
      children: [
        /* @__PURE__ */ d.jsx(no.Provider, { scope: t, children: /* @__PURE__ */ d.jsx(
          Pp,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: i.useCallback((L) => {
              Q((U) => new Set(U).add(L));
            }, []),
            onNativeOptionRemove: i.useCallback((L) => {
              Q((U) => {
                const W = new Set(U);
                return W.delete(L), W;
              });
            }, []),
            children: n
          }
        ) }),
        X ? /* @__PURE__ */ d.jsxs(
          ba,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: j,
            onChange: (L) => A(L.target.value),
            disabled: g,
            form: v,
            children: [
              j === void 0 ? /* @__PURE__ */ d.jsx("option", { value: "" }) : null,
              Array.from(H)
            ]
          },
          ee
        ) : null
      ]
    }
  ) });
};
ta.displayName = kt;
var na = "SelectTrigger", oa = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, s = ro(n), a = ut(na, n), l = a.disabled || o, c = Se(t, a.onTriggerChange), u = oo(n), f = i.useRef("touch"), [p, g, h] = ya((m) => {
      const x = u().filter((y) => !y.disabled), w = x.find((y) => y.value === a.value), b = Ca(x, m, w);
      b !== void 0 && a.onValueChange(b.value);
    }), v = (m) => {
      l || (a.onOpenChange(!0), h()), m && (a.triggerPointerDownPosRef.current = {
        x: Math.round(m.pageX),
        y: Math.round(m.pageY)
      });
    };
    return /* @__PURE__ */ d.jsx(pr, { asChild: !0, ...s, children: /* @__PURE__ */ d.jsx(
      ve.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": a.contentId,
        "aria-expanded": a.open,
        "aria-required": a.required,
        "aria-autocomplete": "none",
        dir: a.dir,
        "data-state": a.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": wa(a.value) ? "" : void 0,
        ...r,
        ref: c,
        onClick: he(r.onClick, (m) => {
          m.currentTarget.focus(), f.current !== "mouse" && v(m);
        }),
        onPointerDown: he(r.onPointerDown, (m) => {
          f.current = m.pointerType;
          const x = m.target;
          x.hasPointerCapture(m.pointerId) && x.releasePointerCapture(m.pointerId), m.button === 0 && m.ctrlKey === !1 && m.pointerType === "mouse" && (v(m), m.preventDefault());
        }),
        onKeyDown: he(r.onKeyDown, (m) => {
          const x = p.current !== "";
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && g(m.key), !(x && m.key === " ") && Sp.includes(m.key) && (v(), m.preventDefault());
        })
      }
    ) });
  }
);
oa.displayName = na;
var ra = "SelectValue", sa = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: s, placeholder: a = "", ...l } = e, c = ut(ra, n), { onValueNodeHasChildrenChange: u } = c, f = s !== void 0, p = Se(t, c.onValueNodeChange);
    return Ne(() => {
      u(f);
    }, [u, f]), /* @__PURE__ */ d.jsx(
      ve.span,
      {
        ...l,
        ref: p,
        style: { pointerEvents: "none" },
        children: wa(c.value) ? /* @__PURE__ */ d.jsx(d.Fragment, { children: a }) : s
      }
    );
  }
);
sa.displayName = ra;
var Np = "SelectIcon", ia = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ d.jsx(ve.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
ia.displayName = Np;
var Rt = "SelectContent", aa = i.forwardRef(
  (e, t) => {
    const n = ut(Rt, e.__scopeSelect), [o, r] = i.useState();
    if (Ne(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const s = o;
      return s ? Bt.createPortal(
        /* @__PURE__ */ d.jsx(la, { scope: e.__scopeSelect, children: /* @__PURE__ */ d.jsx(no.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ d.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ d.jsx(ca, { ...e, ref: t });
  }
);
aa.displayName = Rt;
var Me = 10, [la, dt] = Kt(Rt), Ip = "SelectContentImpl", Ap = /* @__PURE__ */ Ft("SelectContent.RemoveScroll"), ca = i.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: o = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      //
      // PopperContent props
      side: l,
      sideOffset: c,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: g,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: m,
      avoidCollisions: x,
      //
      ...w
    } = e, b = ut(Rt, n), [y, C] = i.useState(null), [E, P] = i.useState(null), S = Se(t, (O) => C(O)), [R, j] = i.useState(null), [A, _] = i.useState(
      null
    ), X = oo(n), [H, Q] = i.useState(!1), ee = i.useRef(!1);
    i.useEffect(() => {
      if (y) return hr(y);
    }, [y]), rr();
    const L = i.useCallback(
      (O) => {
        const [Z, ...te] = X().map((me) => me.ref.current), [ue] = te.slice(-1), de = document.activeElement;
        for (const me of O)
          if (me === de || (me?.scrollIntoView({ block: "nearest" }), me === Z && E && (E.scrollTop = 0), me === ue && E && (E.scrollTop = E.scrollHeight), me?.focus(), document.activeElement !== de)) return;
      },
      [X, E]
    ), U = i.useCallback(
      () => L([R, y]),
      [L, R, y]
    );
    i.useEffect(() => {
      H && U();
    }, [H, U]);
    const { onOpenChange: W, triggerPointerDownPosRef: K } = b;
    i.useEffect(() => {
      if (y) {
        let O = { x: 0, y: 0 };
        const Z = (ue) => {
          O = {
            x: Math.abs(Math.round(ue.pageX) - (K.current?.x ?? 0)),
            y: Math.abs(Math.round(ue.pageY) - (K.current?.y ?? 0))
          };
        }, te = (ue) => {
          O.x <= 10 && O.y <= 10 ? ue.preventDefault() : y.contains(ue.target) || W(!1), document.removeEventListener("pointermove", Z), K.current = null;
        };
        return K.current !== null && (document.addEventListener("pointermove", Z), document.addEventListener("pointerup", te, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", Z), document.removeEventListener("pointerup", te, { capture: !0 });
        };
      }
    }, [y, W, K]), i.useEffect(() => {
      const O = () => W(!1);
      return window.addEventListener("blur", O), window.addEventListener("resize", O), () => {
        window.removeEventListener("blur", O), window.removeEventListener("resize", O);
      };
    }, [W]);
    const [$, k] = ya((O) => {
      const Z = X().filter((de) => !de.disabled), te = Z.find((de) => de.ref.current === document.activeElement), ue = Ca(Z, O, te);
      ue && setTimeout(() => ue.ref.current.focus());
    }), Y = i.useCallback(
      (O, Z, te) => {
        const ue = !ee.current && !te;
        (b.value !== void 0 && b.value === Z || ue) && (j(O), ue && (ee.current = !0));
      },
      [b.value]
    ), re = i.useCallback(() => y?.focus(), [y]), ne = i.useCallback(
      (O, Z, te) => {
        const ue = !ee.current && !te;
        (b.value !== void 0 && b.value === Z || ue) && _(O);
      },
      [b.value]
    ), q = o === "popper" ? Ko : ua, ae = q === Ko ? {
      side: l,
      sideOffset: c,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: g,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: m,
      avoidCollisions: x
    } : {};
    return /* @__PURE__ */ d.jsx(
      la,
      {
        scope: n,
        content: y,
        viewport: E,
        onViewportChange: P,
        itemRefCallback: Y,
        selectedItem: R,
        onItemLeave: re,
        itemTextRefCallback: ne,
        focusSelectedItem: U,
        selectedItemText: A,
        position: o,
        isPositioned: H,
        searchRef: $,
        children: /* @__PURE__ */ d.jsx(to, { as: Ap, allowPinchZoom: !0, children: /* @__PURE__ */ d.jsx(
          Yn,
          {
            asChild: !0,
            trapped: b.open,
            onMountAutoFocus: (O) => {
              O.preventDefault();
            },
            onUnmountAutoFocus: he(r, (O) => {
              b.trigger?.focus({ preventScroll: !0 }), O.preventDefault();
            }),
            children: /* @__PURE__ */ d.jsx(
              Kn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: a,
                onFocusOutside: (O) => O.preventDefault(),
                onDismiss: () => b.onOpenChange(!1),
                children: /* @__PURE__ */ d.jsx(
                  q,
                  {
                    role: "listbox",
                    id: b.contentId,
                    "data-state": b.open ? "open" : "closed",
                    dir: b.dir,
                    onContextMenu: (O) => O.preventDefault(),
                    ...w,
                    ...ae,
                    onPlaced: () => Q(!0),
                    ref: S,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: he(w.onKeyDown, (O) => {
                      const Z = O.ctrlKey || O.altKey || O.metaKey;
                      if (O.key === "Tab" && O.preventDefault(), !Z && O.key.length === 1 && k(O.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(O.key)) {
                        let ue = X().filter((de) => !de.disabled).map((de) => de.ref.current);
                        if (["ArrowUp", "End"].includes(O.key) && (ue = ue.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(O.key)) {
                          const de = O.target, me = ue.indexOf(de);
                          ue = ue.slice(me + 1);
                        }
                        setTimeout(() => L(ue)), O.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
ca.displayName = Ip;
var Op = "SelectItemAlignedPosition", ua = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, s = ut(Rt, n), a = dt(Rt, n), [l, c] = i.useState(null), [u, f] = i.useState(null), p = Se(t, (S) => f(S)), g = oo(n), h = i.useRef(!1), v = i.useRef(!0), { viewport: m, selectedItem: x, selectedItemText: w, focusSelectedItem: b } = a, y = i.useCallback(() => {
    if (s.trigger && s.valueNode && l && u && m && x && w) {
      const S = s.trigger.getBoundingClientRect(), R = u.getBoundingClientRect(), j = s.valueNode.getBoundingClientRect(), A = w.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const de = A.left - R.left, me = j.left - de, ye = S.left - me, pe = S.width + ye, Qe = Math.max(pe, R.width), et = window.innerWidth - Me, mt = Yr(me, [
          Me,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Me, et - Qe)
        ]);
        l.style.minWidth = pe + "px", l.style.left = mt + "px";
      } else {
        const de = R.right - A.right, me = window.innerWidth - j.right - de, ye = window.innerWidth - S.right - me, pe = S.width + ye, Qe = Math.max(pe, R.width), et = window.innerWidth - Me, mt = Yr(me, [
          Me,
          Math.max(Me, et - Qe)
        ]);
        l.style.minWidth = pe + "px", l.style.right = mt + "px";
      }
      const _ = g(), X = window.innerHeight - Me * 2, H = m.scrollHeight, Q = window.getComputedStyle(u), ee = parseInt(Q.borderTopWidth, 10), L = parseInt(Q.paddingTop, 10), U = parseInt(Q.borderBottomWidth, 10), W = parseInt(Q.paddingBottom, 10), K = ee + L + H + W + U, $ = Math.min(x.offsetHeight * 5, K), k = window.getComputedStyle(m), Y = parseInt(k.paddingTop, 10), re = parseInt(k.paddingBottom, 10), ne = S.top + S.height / 2 - Me, q = X - ne, ae = x.offsetHeight / 2, O = x.offsetTop + ae, Z = ee + L + O, te = K - Z;
      if (Z <= ne) {
        const de = _.length > 0 && x === _[_.length - 1].ref.current;
        l.style.bottom = "0px";
        const me = u.clientHeight - m.offsetTop - m.offsetHeight, ye = Math.max(
          q,
          ae + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (de ? re : 0) + me + U
        ), pe = Z + ye;
        l.style.height = pe + "px";
      } else {
        const de = _.length > 0 && x === _[0].ref.current;
        l.style.top = "0px";
        const ye = Math.max(
          ne,
          ee + m.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (de ? Y : 0) + ae
        ) + te;
        l.style.height = ye + "px", m.scrollTop = Z - ne + m.offsetTop;
      }
      l.style.margin = `${Me}px 0`, l.style.minHeight = $ + "px", l.style.maxHeight = X + "px", o?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    g,
    s.trigger,
    s.valueNode,
    l,
    u,
    m,
    x,
    w,
    s.dir,
    o
  ]);
  Ne(() => y(), [y]);
  const [C, E] = i.useState();
  Ne(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const P = i.useCallback(
    (S) => {
      S && v.current === !0 && (y(), b?.(), v.current = !1);
    },
    [y, b]
  );
  return /* @__PURE__ */ d.jsx(
    _p,
    {
      scope: n,
      contentWrapper: l,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: P,
      children: /* @__PURE__ */ d.jsx(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: C
          },
          children: /* @__PURE__ */ d.jsx(
            ve.div,
            {
              ...r,
              ref: p,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...r.style
              }
            }
          )
        }
      )
    }
  );
});
ua.displayName = Op;
var jp = "SelectPopperPosition", Ko = i.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = Me,
    ...s
  } = e, a = ro(n);
  return /* @__PURE__ */ d.jsx(
    Bi,
    {
      ...a,
      ...s,
      ref: t,
      align: o,
      collisionPadding: r,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...s.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Ko.displayName = jp;
var [_p, gr] = Kt(Rt, {}), Yo = "SelectViewport", da = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, s = dt(Yo, n), a = gr(Yo, n), l = Se(t, s.onViewportChange), c = i.useRef(0);
    return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ d.jsx(no.Slot, { scope: n, children: /* @__PURE__ */ d.jsx(
        ve.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: l,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...r.style
          },
          onScroll: he(r.onScroll, (u) => {
            const f = u.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: g } = a;
            if (g?.current && p) {
              const h = Math.abs(c.current - f.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - Me * 2, m = parseFloat(p.style.minHeight), x = parseFloat(p.style.height), w = Math.max(m, x);
                if (w < v) {
                  const b = w + h, y = Math.min(v, b), C = b - y;
                  p.style.height = y + "px", p.style.bottom === "0px" && (f.scrollTop = C > 0 ? C : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = f.scrollTop;
          })
        }
      ) })
    ] });
  }
);
da.displayName = Yo;
var fa = "SelectGroup", [Dp, Mp] = Kt(fa), $p = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = yt();
    return /* @__PURE__ */ d.jsx(Dp, { scope: n, id: r, children: /* @__PURE__ */ d.jsx(ve.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
$p.displayName = fa;
var pa = "SelectLabel", Lp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Mp(pa, n);
    return /* @__PURE__ */ d.jsx(ve.div, { id: r.id, ...o, ref: t });
  }
);
Lp.displayName = pa;
var Vn = "SelectItem", [zp, ma] = Kt(Vn), ha = i.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: s,
      ...a
    } = e, l = ut(Vn, n), c = dt(Vn, n), u = l.value === o, [f, p] = i.useState(s ?? ""), [g, h] = i.useState(!1), v = Se(
      t,
      (b) => c.itemRefCallback?.(b, o, r)
    ), m = yt(), x = i.useRef("touch"), w = () => {
      r || (l.onValueChange(o), l.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ d.jsx(
      zp,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: m,
        isSelected: u,
        onItemTextChange: i.useCallback((b) => {
          p((y) => y || (b?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ d.jsx(
          no.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: f,
            children: /* @__PURE__ */ d.jsx(
              ve.div,
              {
                role: "option",
                "aria-labelledby": m,
                "data-highlighted": g ? "" : void 0,
                "aria-selected": u && g,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...a,
                ref: v,
                onFocus: he(a.onFocus, () => h(!0)),
                onBlur: he(a.onBlur, () => h(!1)),
                onClick: he(a.onClick, () => {
                  x.current !== "mouse" && w();
                }),
                onPointerUp: he(a.onPointerUp, () => {
                  x.current === "mouse" && w();
                }),
                onPointerDown: he(a.onPointerDown, (b) => {
                  x.current = b.pointerType;
                }),
                onPointerMove: he(a.onPointerMove, (b) => {
                  x.current = b.pointerType, r ? c.onItemLeave?.() : x.current === "mouse" && b.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: he(a.onPointerLeave, (b) => {
                  b.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: he(a.onKeyDown, (b) => {
                  c.searchRef?.current !== "" && b.key === " " || (Ep.includes(b.key) && w(), b.key === " " && b.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ha.displayName = Vn;
var nn = "SelectItemText", ga = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...s } = e, a = ut(nn, n), l = dt(nn, n), c = ma(nn, n), u = Tp(nn, n), [f, p] = i.useState(null), g = Se(
      t,
      (w) => p(w),
      c.onItemTextChange,
      (w) => l.itemTextRefCallback?.(w, c.value, c.disabled)
    ), h = f?.textContent, v = i.useMemo(
      () => /* @__PURE__ */ d.jsx("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: m, onNativeOptionRemove: x } = u;
    return Ne(() => (m(v), () => x(v)), [m, x, v]), /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(ve.span, { id: c.textId, ...s, ref: g }),
      c.isSelected && a.valueNode && !a.valueNodeHasChildren ? Bt.createPortal(s.children, a.valueNode) : null
    ] });
  }
);
ga.displayName = nn;
var va = "SelectItemIndicator", Fp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return ma(va, n).isSelected ? /* @__PURE__ */ d.jsx(ve.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Fp.displayName = va;
var Xo = "SelectScrollUpButton", Wp = i.forwardRef((e, t) => {
  const n = dt(Xo, e.__scopeSelect), o = gr(Xo, e.__scopeSelect), [r, s] = i.useState(!1), a = Se(t, o.onScrollButtonChange);
  return Ne(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const u = c.scrollTop > 0;
        s(u);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ d.jsx(
    xa,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Wp.displayName = Xo;
var qo = "SelectScrollDownButton", Vp = i.forwardRef((e, t) => {
  const n = dt(qo, e.__scopeSelect), o = gr(qo, e.__scopeSelect), [r, s] = i.useState(!1), a = Se(t, o.onScrollButtonChange);
  return Ne(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const u = c.scrollHeight - c.clientHeight, f = Math.ceil(c.scrollTop) < u;
        s(f);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ d.jsx(
    xa,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Vp.displayName = qo;
var xa = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, s = dt("SelectScrollButton", n), a = i.useRef(null), l = oo(n), c = i.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return i.useEffect(() => () => c(), [c]), Ne(() => {
    l().find((f) => f.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [l]), /* @__PURE__ */ d.jsx(
    ve.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: he(r.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(o, 50));
      }),
      onPointerMove: he(r.onPointerMove, () => {
        s.onItemLeave?.(), a.current === null && (a.current = window.setInterval(o, 50));
      }),
      onPointerLeave: he(r.onPointerLeave, () => {
        c();
      })
    }
  );
}), Hp = "SelectSeparator", Bp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ d.jsx(ve.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
Bp.displayName = Hp;
var Zo = "SelectArrow", Up = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = ro(n), s = ut(Zo, n), a = dt(Zo, n);
    return s.open && a.position === "popper" ? /* @__PURE__ */ d.jsx(Ui, { ...r, ...o, ref: t }) : null;
  }
);
Up.displayName = Zo;
var Gp = "SelectBubbleInput", ba = i.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = i.useRef(null), s = Se(o, r), a = Df(t);
    return i.useEffect(() => {
      const l = r.current;
      if (!l) return;
      const c = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (a !== t && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(l, t), l.dispatchEvent(p);
      }
    }, [a, t]), /* @__PURE__ */ d.jsx(
      ve.select,
      {
        ...n,
        style: { ...Gi, ...n.style },
        ref: s,
        defaultValue: t
      }
    );
  }
);
ba.displayName = Gp;
function wa(e) {
  return e === "" || e === void 0;
}
function ya(e) {
  const t = St(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback(
    (a) => {
      const l = n.current + a;
      t(l), (function c(u) {
        n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => c(""), 1e3));
      })(l);
    },
    [t]
  ), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
function Ca(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Kp(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((u) => u !== n));
  const c = a.find(
    (u) => u.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Kp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Yp = ta, Xp = oa, qp = sa, Zp = ia, Jp = aa, Qp = da, em = ha, tm = ga;
const so = i.createContext({ size: "base" }), vr = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" }
}, nm = Ie(
  "border bg-white-100 outline-none transition-all flex items-center text-black-85 placeholder:text-black-25",
  {
    variants: {
      variant: {
        basic: "border-neutral-2 hover:border-brand-5 data-[state=open]:border-brand-6 data-[state=open]:shadow-[0_0_0_3px_var(--brand-2)] [&>svg]:text-black-55",
        invalid: "border-error-5 hover:border-error-5 data-[state=open]:border-brand-6 data-[state=open]:shadow-[0_0_0_3px_var(--brand-2)] [&>svg]:text-black-55",
        disabled: "border-neutral-2 bg-neutral-1 text-black-25 cursor-not-allowed placeholder:text-black-25 [&>svg]:text-black-25"
      }
    },
    defaultVariants: { variant: "basic" }
  }
);
function om({ children: e, disabled: t, variant: n, size: o = "base", ...r }) {
  const s = t || n === "disabled";
  return /* @__PURE__ */ d.jsx(so.Provider, { value: { size: o }, children: /* @__PURE__ */ d.jsx(Yp, { disabled: s, ...r, children: e }) });
}
function rm({ className: e, variant: t, leftIcon: n, children: o, slotId: r, ...s }) {
  const { size: a } = i.useContext(so), l = vr[a], c = i.useId();
  return /* @__PURE__ */ d.jsxs(
    Xp,
    {
      "data-slot": "select-trigger",
      "data-slot-id": r ?? c,
      className: oe(nm({ variant: t }), l.height, l.rounded, l.px, l.gap, l.text, e),
      ...s,
      children: [
        /* @__PURE__ */ d.jsxs("span", { className: oe("flex items-center flex-1 min-w-0", l.gap), children: [
          n && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 text-black-55", l.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${n}` }) }),
          o
        ] }),
        /* @__PURE__ */ d.jsx(Zp, { asChild: !0, children: /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 ml-auto", l.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-chevron-down" }) }) })
      ]
    }
  );
}
function sm({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(so), s = vr[r], a = i.useId();
  return /* @__PURE__ */ d.jsx(
    Jp,
    {
      "data-slot": "select-content",
      "data-slot-id": n ?? a,
      position: "popper",
      sideOffset: 4,
      className: oe(
        "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
        "w-[var(--radix-select-trigger-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        s.rounded,
        e
      ),
      ...o,
      children: /* @__PURE__ */ d.jsx(Qp, { className: "flex flex-col p-1 group/options", children: t })
    }
  );
}
function im({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(so), s = vr[r], a = i.useId();
  return /* @__PURE__ */ d.jsx(
    em,
    {
      "data-slot": "select-item",
      "data-slot-id": n ?? a,
      className: oe(
        "relative flex cursor-pointer select-none items-center outline-none transition-all",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        "data-[state=checked]:bg-neutral-1 group-hover/options:data-[state=checked]:bg-transparent",
        "hover:data-[state=checked]:bg-neutral-1",
        s.itemHeight,
        s.itemRounded,
        s.itemPx,
        s.text,
        e
      ),
      ...o,
      children: /* @__PURE__ */ d.jsx(tm, { children: t })
    }
  );
}
function am({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ d.jsx(qp, { "data-slot": "select-value", "data-slot-id": t ?? o, className: e, ...n });
}
const lm = Ie(
  "flex items-center cursor-pointer transition-all text-left whitespace-nowrap",
  {
    variants: {
      variant: {
        basic: "bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-2",
        selected: "bg-neutral-1 text-black-85 active:bg-neutral-2"
      },
      size: {
        base: "h-8 px-2 text-sm leading-6 rounded-md",
        sm: "h-6 px-1.5 text-xs leading-5 rounded",
        lg: "h-10 px-3 text-base leading-6 rounded-[10px]"
      }
    },
    defaultVariants: { variant: "basic", size: "base" }
  }
);
function Gg({
  className: e,
  variant: t,
  size: n,
  onClick: o,
  children: r,
  slotId: s,
  ...a
}) {
  const l = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "navigation-item",
      "data-slot-id": s ?? l,
      className: oe(lm({ variant: t, size: n }), e),
      onClick: (c) => {
        c.stopPropagation(), o?.();
      },
      ...a,
      children: r
    }
  );
}
const cm = Ie("flex w-max min-w-full flex-col bg-white-100", {
  variants: {
    variant: {
      base: "border border-neutral-2",
      plain: ""
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-md",
      base: "rounded-lg"
    }
  },
  defaultVariants: {
    variant: "base",
    radius: "none"
  }
});
function Kg({ className: e, variant: t, radius: n, data: o, children: r, slotId: s, ...a }) {
  const l = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "table",
      "data-slot-id": s ?? l,
      className: oe(cm({ variant: t, radius: n, className: e })),
      ...a,
      children: r
    }
  );
}
function Ye(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function bs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function um(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = bs(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : bs(e[r], null);
        }
      };
  };
}
function Nt(...e) {
  return i.useCallback(um(...e), e);
}
function Sa(e, t = []) {
  let n = [];
  function o(s, a) {
    const l = i.createContext(a);
    l.displayName = s + "Context";
    const c = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = i.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ d.jsx(m.Provider, { value: x, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = i.useContext(h);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(l) {
      const c = l?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, dm(r, ...t)];
}
function dm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((l, { useScope: c, scopeName: u }) => {
        const p = c(s)[`__scope${u}`];
        return { ...l, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function fm(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, l = !1;
    const c = [];
    ws(r) && typeof Tn == "function" && (r = Tn(r._payload)), i.Children.forEach(r, (g) => {
      if (vm(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        ws(v) && typeof Tn == "function" && (v = Tn(v._payload)), a = mm(h, v), c.push(a?.props?.children);
      } else
        c.push(g);
    }), a ? a = i.cloneElement(a, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? gm(a) : void 0, f = Nt(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          l ? ym(e) : wm(e)
        );
      return r;
    }
    const p = hm(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Ea = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function pm(e) {
  const t = (n) => "child" in n ? n.children(n.child) : n.children;
  return t.displayName = `${e}.Slottable`, t.__radixId = Ea, t;
}
var mm = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function hm(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...l) => {
      const c = s(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function gm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function vm(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ea;
}
var xm = /* @__PURE__ */ Symbol.for("react.lazy");
function ws(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === xm && "_payload" in e && bm(e._payload);
}
function bm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var wm = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, ym = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, Tn = i[" use ".trim().toString()], Cm = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ft = Cm.reduce((e, t) => {
  const n = /* @__PURE__ */ fm(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...l } = r, c = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(c, { ...l, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Sm(e, t) {
  e && Bt.flushSync(() => e.dispatchEvent(t));
}
function io(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function Em(e, t = globalThis?.document) {
  const n = io(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var km = "DismissableLayer", Jo = "dismissableLayer.update", Rm = "dismissableLayer.pointerDownOutside", Pm = "dismissableLayer.focusOutside", ys, ka = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ra = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: l,
      ...c
    } = e, u = i.useContext(ka), [f, p] = i.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = i.useState({}), v = Nt(t, (S) => p(S)), m = Array.from(u.layers), [x] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), w = m.indexOf(x), b = f ? m.indexOf(f) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, C = b >= w, E = Im((S) => {
      const R = S.target, j = [...u.branches].some((A) => A.contains(R));
      !C || j || (r?.(S), a?.(S), S.defaultPrevented || l?.());
    }, g), P = Am((S) => {
      const R = S.target;
      [...u.branches].some((A) => A.contains(R)) || (s?.(S), a?.(S), S.defaultPrevented || l?.());
    }, g);
    return Em((S) => {
      b === u.layers.size - 1 && (o?.(S), !S.defaultPrevented && l && (S.preventDefault(), l()));
    }, g), i.useEffect(() => {
      if (f)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ys = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), Cs(), () => {
          n && (u.layersWithOutsidePointerEventsDisabled.delete(f), u.layersWithOutsidePointerEventsDisabled.size === 0 && (g.body.style.pointerEvents = ys));
        };
    }, [f, g, n, u]), i.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), Cs());
    }, [f, u]), i.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Jo, S), () => document.removeEventListener(Jo, S);
    }, []), /* @__PURE__ */ d.jsx(
      ft.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ye(e.onFocusCapture, P.onFocusCapture),
        onBlurCapture: Ye(e.onBlurCapture, P.onBlurCapture),
        onPointerDownCapture: Ye(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Ra.displayName = km;
var Tm = "DismissableLayerBranch", Nm = i.forwardRef((e, t) => {
  const n = i.useContext(ka), o = i.useRef(null), r = Nt(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ d.jsx(ft.div, { ...e, ref: r });
});
Nm.displayName = Tm;
function Im(e, t = globalThis?.document) {
  const n = io(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (l) => {
      if (l.target && !o.current) {
        let c = function() {
          Pa(
            Rm,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function Am(e, t = globalThis?.document) {
  const n = io(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Pa(Pm, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Cs() {
  const e = new CustomEvent(Jo);
  document.dispatchEvent(e);
}
function Pa(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Sm(r, s) : r.dispatchEvent(s);
}
var Xe = globalThis?.document ? i.useLayoutEffect : () => {
}, Om = i[" useId ".trim().toString()] || (() => {
}), jm = 0;
function _m(e) {
  const [t, n] = i.useState(Om());
  return Xe(() => {
    n((o) => o ?? String(jm++));
  }, [e]), t ? `radix-${t}` : "";
}
var Dm = "Arrow", Ta = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ d.jsx(
    ft.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ d.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Ta.displayName = Dm;
var Mm = Ta;
function $m(e) {
  const [t, n] = i.useState(void 0);
  return Xe(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const s = r[0];
        let a, l;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          a = u.inlineSize, l = u.blockSize;
        } else
          a = e.offsetWidth, l = e.offsetHeight;
        n({ width: a, height: l });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var xr = "Popper", [Na, Ia] = Sa(xr), [Lm, Aa] = Na(xr), Oa = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, a] = i.useState(void 0);
  return /* @__PURE__ */ d.jsx(
    Lm,
    {
      scope: t,
      anchor: o,
      onAnchorChange: r,
      placementState: s,
      setPlacementState: a,
      children: n
    }
  );
};
Oa.displayName = xr;
var ja = "PopperAnchor", _a = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Aa(ja, n), a = i.useRef(null), l = s.onAnchorChange, c = i.useCallback(
      (v) => {
        a.current = v, v && l(v);
      },
      [l]
    ), u = Nt(t, c), f = i.useRef(null);
    i.useEffect(() => {
      if (!o)
        return;
      const v = f.current;
      f.current = o.current, v !== f.current && l(f.current);
    });
    const p = s.placementState && wr(s.placementState), g = p?.[0], h = p?.[1];
    return o ? null : /* @__PURE__ */ d.jsx(
      ft.div,
      {
        "data-radix-popper-side": g,
        "data-radix-popper-align": h,
        ...r,
        ref: u
      }
    );
  }
);
_a.displayName = ja;
var br = "PopperContent", [zm, Fm] = Na(br), Da = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: l = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u,
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = Aa(br, n), [w, b] = i.useState(null), y = Nt(t, (Z) => b(Z)), [C, E] = i.useState(null), P = $m(C), S = P?.width ?? 0, R = P?.height ?? 0, j = o + (s !== "center" ? "-" + s : ""), A = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, _ = u ? Array.isArray(u) ? u : [u] : void 0, X = _ !== void 0 && _.length > 0, H = {
      padding: A,
      boundary: _?.filter(Vm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: ee, placement: L, isPositioned: U, middlewareData: W } = ki({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: j,
      whileElementsMounted: (...Z) => Si(...Z, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        Ri({ mainAxis: r + R, alignmentAxis: a }),
        c && Pi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? Ti() : void 0,
          ...H
        }),
        c && Ni({ ...H }),
        Ii({
          ...H,
          apply: ({ elements: Z, rects: te, availableWidth: ue, availableHeight: de }) => {
            const { width: me, height: ye } = te.reference, pe = Z.floating.style;
            pe.setProperty("--radix-popper-available-width", `${ue}px`), pe.setProperty("--radix-popper-available-height", `${de}px`), pe.setProperty("--radix-popper-anchor-width", `${me}px`), pe.setProperty("--radix-popper-anchor-height", `${ye}px`);
          }
        }),
        C && Oi({ element: C, padding: l }),
        Hm({ arrowWidth: S, arrowHeight: R }),
        g && Ai({ strategy: "referenceHidden", ...H })
      ]
    }), K = x.setPlacementState;
    Xe(() => (K(L), () => {
      K(void 0);
    }), [L, K]);
    const [$, k] = wr(L), Y = io(v);
    Xe(() => {
      U && Y?.();
    }, [U, Y]);
    const re = W.arrow?.x, ne = W.arrow?.y, q = W.arrow?.centerOffset !== 0, [ae, O] = i.useState();
    return Xe(() => {
      w && O(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ee,
          transform: U ? ee.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ae,
          "--radix-popper-transform-origin": [
            W.transformOrigin?.x,
            W.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...W.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ d.jsx(
          zm,
          {
            scope: n,
            placedSide: $,
            placedAlign: k,
            onArrowChange: E,
            arrowX: re,
            arrowY: ne,
            shouldHideArrow: q,
            children: /* @__PURE__ */ d.jsx(
              ft.div,
              {
                "data-side": $,
                "data-align": k,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: U ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Da.displayName = br;
var Ma = "PopperArrow", Wm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, $a = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Fm(Ma, o), a = Wm[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ d.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ d.jsx(
          Mm,
          {
            ...r,
            ref: n,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
$a.displayName = Ma;
function Vm(e) {
  return e !== null;
}
var Hm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, l = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [u, f] = wr(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + l / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return u === "bottom" ? (v = a ? p : `${g}px`, m = `${-c}px`) : u === "top" ? (v = a ? p : `${g}px`, m = `${o.floating.height + c}px`) : u === "right" ? (v = `${-c}px`, m = a ? p : `${h}px`) : u === "left" && (v = `${o.floating.width + c}px`, m = a ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function wr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Bm = Oa, Um = _a, Gm = Da, Km = $a, Ym = "Portal", La = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  Xe(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Bt.createPortal(/* @__PURE__ */ d.jsx(ft.div, { ...o, ref: t }), a) : null;
});
La.displayName = Ym;
function Xm(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var yr = (e) => {
  const { present: t, children: n } = e, o = qm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Zm(o.ref, Jm(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
yr.displayName = "Presence";
function qm(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [l, c] = Xm(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return i.useEffect(() => {
    const u = Nn(o.current);
    s.current = l === "mounted" ? u : "none";
  }, [l]), Xe(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const g = s.current, h = Nn(u);
      e ? c("MOUNT") : h === "none" || u?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Xe(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = Nn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (s.current = Nn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Ss(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Zm(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const l = Ss(a, n);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const l = s[a];
          typeof l == "function" ? l() : Ss(o[a], null);
        }
      };
  }, []);
}
function Nn(e) {
  return e?.animationName || "none";
}
function Jm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Qm = i[" useInsertionEffect ".trim().toString()] || Xe;
function eh({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = th({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (l) {
        const p = nh(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [l, e, s, a]
  );
  return [c, u];
}
function th({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Qm(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function nh(e) {
  return typeof e == "function";
}
var oh = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), rh = "VisuallyHidden", za = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(
    ft.span,
    {
      ...e,
      ref: t,
      style: { ...oh, ...e.style }
    }
  )
);
za.displayName = rh;
var sh = za, [ao] = Sa("Tooltip", [
  Ia
]), lo = Ia(), Fa = "TooltipProvider", ih = 700, Qo = "tooltip.open", [ah, Cr] = ao(Fa), Wa = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = ih,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = i.useRef(!0), l = i.useRef(!1), c = i.useRef(0);
  return i.useEffect(() => {
    const u = c.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ d.jsx(
    ah,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(c.current), a.current = !1);
      }, [o]),
      onClose: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(c.current), c.current = window.setTimeout(
          () => a.current = !0,
          o
        ));
      }, [o]),
      isPointerInTransitRef: l,
      onPointerInTransitChange: i.useCallback((u) => {
        l.current = u;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
Wa.displayName = Fa;
var rn = "Tooltip", [lh, un] = ao(rn), Va = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: l
  } = e, c = Cr(rn, e.__scopeTooltip), u = lo(t), [f, p] = i.useState(null), g = _m(), h = i.useRef(0), v = a ?? c.disableHoverableContent, m = l ?? c.delayDuration, x = i.useRef(!1), [w, b] = eh({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Qo))) : c.onClose(), s?.(S);
    },
    caller: rn
  }), y = i.useMemo(() => w ? x.current ? "delayed-open" : "instant-open" : "closed", [w]), C = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, x.current = !1, b(!0);
  }, [b]), E = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), P = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      x.current = !0, b(!0), h.current = 0;
    }, m);
  }, [m, b]);
  return i.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ d.jsx(Bm, { ...u, children: /* @__PURE__ */ d.jsx(
    lh,
    {
      scope: t,
      contentId: g,
      open: w,
      stateAttribute: y,
      trigger: f,
      onTriggerChange: p,
      onTriggerEnter: i.useCallback(() => {
        c.isOpenDelayedRef.current ? P() : C();
      }, [c.isOpenDelayedRef, P, C]),
      onTriggerLeave: i.useCallback(() => {
        v ? E() : (window.clearTimeout(h.current), h.current = 0);
      }, [E, v]),
      onOpen: C,
      onClose: E,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
Va.displayName = rn;
var er = "TooltipTrigger", Ha = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = un(er, n), s = Cr(er, n), a = lo(n), l = i.useRef(null), c = Nt(t, l, r.onTriggerChange), u = i.useRef(!1), f = i.useRef(!1), p = i.useCallback(() => u.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ d.jsx(Um, { asChild: !0, ...a, children: /* @__PURE__ */ d.jsx(
      ft.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: c,
        onPointerMove: Ye(e.onPointerMove, (g) => {
          g.pointerType !== "touch" && !f.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: Ye(e.onPointerLeave, () => {
          r.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: Ye(e.onPointerDown, () => {
          r.open && r.onClose(), u.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: Ye(e.onFocus, () => {
          u.current || r.onOpen();
        }),
        onBlur: Ye(e.onBlur, r.onClose),
        onClick: Ye(e.onClick, r.onClose)
      }
    ) });
  }
);
Ha.displayName = er;
var Sr = "TooltipPortal", [ch, uh] = ao(Sr, {
  forceMount: void 0
}), Ba = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = un(Sr, t);
  return /* @__PURE__ */ d.jsx(ch, { scope: t, forceMount: n, children: /* @__PURE__ */ d.jsx(yr, { present: n || s.open, children: /* @__PURE__ */ d.jsx(La, { asChild: !0, container: r, children: o }) }) });
};
Ba.displayName = Sr;
var Vt = "TooltipContent", Ua = i.forwardRef(
  (e, t) => {
    const n = uh(Vt, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = un(Vt, e.__scopeTooltip);
    return /* @__PURE__ */ d.jsx(yr, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ d.jsx(Ga, { side: r, ...s, ref: t }) : /* @__PURE__ */ d.jsx(dh, { side: r, ...s, ref: t }) });
  }
), dh = i.forwardRef((e, t) => {
  const n = un(Vt, e.__scopeTooltip), o = Cr(Vt, e.__scopeTooltip), r = i.useRef(null), s = Nt(t, r), [a, l] = i.useState(null), { trigger: c, onClose: u } = n, f = r.current, { onPointerInTransitChange: p } = o, g = i.useCallback(() => {
    l(null), p(!1);
  }, [p]), h = i.useCallback(
    (v, m) => {
      const x = v.currentTarget, w = { x: v.clientX, y: v.clientY }, b = hh(w, x.getBoundingClientRect()), y = gh(w, b), C = vh(m.getBoundingClientRect()), E = bh([...y, ...C]);
      l(E), p(!0);
    },
    [p]
  );
  return i.useEffect(() => () => g(), [g]), i.useEffect(() => {
    if (c && f) {
      const v = (x) => h(x, f), m = (x) => h(x, c);
      return c.addEventListener("pointerleave", v), f.addEventListener("pointerleave", m), () => {
        c.removeEventListener("pointerleave", v), f.removeEventListener("pointerleave", m);
      };
    }
  }, [c, f, h, g]), i.useEffect(() => {
    if (a) {
      const v = (m) => {
        const x = m.target, w = { x: m.clientX, y: m.clientY }, b = c?.contains(x) || f?.contains(x), y = !xh(w, a);
        b ? g() : y && (g(), u());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, f, a, u, g]), /* @__PURE__ */ d.jsx(Ga, { ...e, ref: s });
}), [fh, ph] = ao(rn, { isInside: !1 }), mh = /* @__PURE__ */ pm("TooltipContent"), Ga = i.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...l
    } = e, c = un(Vt, n), u = lo(n), { onClose: f } = c;
    return i.useEffect(() => (document.addEventListener(Qo, f), () => document.removeEventListener(Qo, f)), [f]), i.useEffect(() => {
      if (c.trigger) {
        const p = (g) => {
          g.target instanceof Node && g.target.contains(c.trigger) && f();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [c.trigger, f]), /* @__PURE__ */ d.jsx(
      Ra,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ d.jsxs(
          Gm,
          {
            "data-state": c.stateAttribute,
            ...u,
            ...l,
            ref: t,
            style: {
              ...l.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ d.jsx(mh, { children: o }),
              /* @__PURE__ */ d.jsx(fh, { scope: n, isInside: !0, children: /* @__PURE__ */ d.jsx(sh, { id: c.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Ua.displayName = Vt;
var Ka = "TooltipArrow", Ya = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = lo(n);
    return ph(
      Ka,
      n
    ).isInside ? null : /* @__PURE__ */ d.jsx(Km, { ...r, ...o, ref: t });
  }
);
Ya.displayName = Ka;
function hh(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, s)) {
    case s:
      return "left";
    case r:
      return "right";
    case n:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function gh(e, t, n = 5) {
  const o = [];
  switch (t) {
    case "top":
      o.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      o.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      o.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      o.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return o;
}
function vh(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function xh(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const l = t[s], c = t[a], u = l.x, f = l.y, p = c.x, g = c.y;
    f > o != g > o && n < (p - u) * (o - f) / (g - f) + u && (r = !r);
  }
  return r;
}
function bh(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), wh(t);
}
function wh(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], a = t[t.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], a = n[n.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var yh = Wa, Ch = Va, Sh = Ha, Eh = Ba, kh = Ua, Rh = Ya;
const Ph = Ie(
  "z-50 max-w-64 border border-transparent bg-black-85 text-white-100 shadow-[0_0_4px_1px_var(--black-5),0_4px_8px_0_var(--black-5)] data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95",
  {
    variants: {
      size: {
        base: "rounded-lg px-3 py-1.5 text-sm leading-5",
        lg: "rounded-xl px-4 py-2.5 text-base leading-6"
      }
    },
    defaultVariants: { size: "base" }
  }
);
function Th({ children: e, delayDuration: t = 300, ...n }) {
  return /* @__PURE__ */ d.jsx(yh, { delayDuration: t, ...n, children: e });
}
function co({ children: e, ...t }) {
  return /* @__PURE__ */ d.jsx(Ch, { ...t, children: e });
}
const uo = Sh;
function fo({
  className: e,
  size: t,
  sideOffset: n = 4,
  children: o,
  slotId: r,
  ...s
}) {
  const a = i.useId();
  return /* @__PURE__ */ d.jsx(Eh, { children: /* @__PURE__ */ d.jsxs(
    kh,
    {
      "data-slot": "tooltip-content",
      "data-slot-id": r ?? a,
      sideOffset: n,
      className: oe(Ph({ size: t }), e),
      ...s,
      children: [
        o,
        /* @__PURE__ */ d.jsx(
          Rh,
          {
            "data-slot": "tooltip-arrow",
            "data-slot-id": `${r ?? a}-arrow`,
            className: "fill-black-85",
            width: t === "lg" ? 12 : 8,
            height: t === "lg" ? 6 : 4
          }
        )
      ]
    }
  ) });
}
function Nh(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var Yt = (e) => {
  const { present: t, children: n } = e, o = Ih(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Se(o.ref, Ah(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Yt.displayName = "Presence";
function Ih(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [l, c] = Nh(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return i.useEffect(() => {
    const u = In(o.current);
    s.current = l === "mounted" ? u : "none";
  }, [l]), Ne(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const g = s.current, h = In(u);
      e ? c("MOUNT") : h === "none" || u?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Ne(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = In(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (s.current = In(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function In(e) {
  return e?.animationName || "none";
}
function Ah(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var po = "Popover", [Xa] = ln(po, [
  Qn
]), dn = Qn(), [Oh, pt] = Xa(po), qa = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !1
  } = e, l = dn(t), c = i.useRef(null), [u, f] = i.useState(!1), [p, g] = Wn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: po
  });
  return /* @__PURE__ */ d.jsx(Hi, { ...l, children: /* @__PURE__ */ d.jsx(
    Oh,
    {
      scope: t,
      contentId: yt(),
      triggerRef: c,
      open: p,
      onOpenChange: g,
      onOpenToggle: i.useCallback(() => g((h) => !h), [g]),
      hasCustomAnchor: u,
      onCustomAnchorAdd: i.useCallback(() => f(!0), []),
      onCustomAnchorRemove: i.useCallback(() => f(!1), []),
      modal: a,
      children: n
    }
  ) });
};
qa.displayName = po;
var Za = "PopoverAnchor", jh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = pt(Za, n), s = dn(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: l } = r;
    return i.useEffect(() => (a(), () => l()), [a, l]), /* @__PURE__ */ d.jsx(pr, { ...s, ...o, ref: t });
  }
);
jh.displayName = Za;
var Ja = "PopoverTrigger", Qa = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = pt(Ja, n), s = dn(n), a = Se(t, r.triggerRef), l = /* @__PURE__ */ d.jsx(
      ve.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": rl(r.open),
        ...o,
        ref: a,
        onClick: he(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? l : /* @__PURE__ */ d.jsx(pr, { asChild: !0, ...s, children: l });
  }
);
Qa.displayName = Ja;
var Er = "PopoverPortal", [_h, Dh] = Xa(Er, {
  forceMount: void 0
}), el = (e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = pt(Er, t);
  return /* @__PURE__ */ d.jsx(_h, { scope: t, forceMount: n, children: /* @__PURE__ */ d.jsx(Yt, { present: n || s.open, children: /* @__PURE__ */ d.jsx(mr, { asChild: !0, container: r, children: o }) }) });
};
el.displayName = Er;
var Ht = "PopoverContent", tl = i.forwardRef(
  (e, t) => {
    const n = Dh(Ht, e.__scopePopover), { forceMount: o = n.forceMount, ...r } = e, s = pt(Ht, e.__scopePopover);
    return /* @__PURE__ */ d.jsx(Yt, { present: o || s.open, children: s.modal ? /* @__PURE__ */ d.jsx($h, { ...r, ref: t }) : /* @__PURE__ */ d.jsx(Lh, { ...r, ref: t }) });
  }
);
tl.displayName = Ht;
var Mh = /* @__PURE__ */ Ft("PopoverContent.RemoveScroll"), $h = i.forwardRef(
  (e, t) => {
    const n = pt(Ht, e.__scopePopover), o = i.useRef(null), r = Se(t, o), s = i.useRef(!1);
    return i.useEffect(() => {
      const a = o.current;
      if (a) return hr(a);
    }, []), /* @__PURE__ */ d.jsx(to, { as: Mh, allowPinchZoom: !0, children: /* @__PURE__ */ d.jsx(
      nl,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: he(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), s.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: he(
          e.onPointerDownOutside,
          (a) => {
            const l = a.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, u = l.button === 2 || c;
            s.current = u;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: he(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Lh = i.forwardRef(
  (e, t) => {
    const n = pt(Ht, e.__scopePopover), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ d.jsx(
      nl,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (o.current || n.triggerRef.current?.focus(), s.preventDefault()), o.current = !1, r.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (o.current = !0, s.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const a = s.target;
          n.triggerRef.current?.contains(a) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && r.current && s.preventDefault();
        }
      }
    );
  }
), nl = i.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: o,
      onOpenAutoFocus: r,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: l,
      onPointerDownOutside: c,
      onFocusOutside: u,
      onInteractOutside: f,
      ...p
    } = e, g = pt(Ht, n), h = dn(n);
    return rr(), /* @__PURE__ */ d.jsx(
      Yn,
      {
        asChild: !0,
        loop: !0,
        trapped: o,
        onMountAutoFocus: r,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ d.jsx(
          Kn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: f,
            onEscapeKeyDown: l,
            onPointerDownOutside: c,
            onFocusOutside: u,
            onDismiss: () => g.onOpenChange(!1),
            children: /* @__PURE__ */ d.jsx(
              Bi,
              {
                "data-state": rl(g.open),
                role: "dialog",
                id: g.contentId,
                ...h,
                ...p,
                ref: t,
                style: {
                  ...p.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), ol = "PopoverClose", zh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = pt(ol, n);
    return /* @__PURE__ */ d.jsx(
      ve.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: he(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
zh.displayName = ol;
var Fh = "PopoverArrow", Wh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = dn(n);
    return /* @__PURE__ */ d.jsx(Ui, { ...r, ...o, ref: t });
  }
);
Wh.displayName = Fh;
function rl(e) {
  return e ? "open" : "closed";
}
var Vh = qa, Hh = Qa, Bh = el, Uh = tl;
const mo = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" }
}, ze = i.createContext({ size: "base", close: () => {
}, isOpen: !1 }), Gh = i.createContext({ isSub: !1, close: () => {
}, open: () => {
}, isOpen: !1, scheduleClose: () => {
}, cancelClose: () => {
} });
function kr({ children: e, size: t = "base", ...n }) {
  const [o, r] = i.useState(n.open ?? !1), s = () => a(!1), a = (l) => {
    r(l), n.onOpenChange?.(l);
  };
  return i.useEffect(() => {
    if (!o) return;
    const l = (c) => {
      c.target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]') || s();
    };
    return window.addEventListener("scroll", l, { capture: !0 }), () => window.removeEventListener("scroll", l, { capture: !0 });
  }, [o]), /* @__PURE__ */ d.jsx(Vh, { ...n, open: n.open ?? o, onOpenChange: a, children: /* @__PURE__ */ d.jsx(ze.Provider, { value: { size: t, close: s, isOpen: n.open ?? o }, children: e }) });
}
const Rr = Hh, Kh = Ie(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
);
function Pr({ className: e, sideOffset: t = 4, align: n = "start", slotId: o, ...r }) {
  const { size: s } = i.useContext(ze), a = mo[s], l = i.useId();
  return /* @__PURE__ */ d.jsx(Bh, { children: /* @__PURE__ */ d.jsx(
    Uh,
    {
      "data-slot": "popover-content",
      "data-slot-id": o ?? l,
      sideOffset: t,
      align: n,
      className: oe(
        Kh(),
        a.rounded === "rounded" ? "rounded-md" : a.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function Es({ className: e, disabled: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(ze), s = mo[r], a = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "popover-item",
      "data-slot-id": n ?? a,
      className: oe(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        s.height,
        s.rounded,
        s.px,
        s.gap,
        s.text,
        e
      ),
      ...o
    }
  );
}
function Ae({ className: e, closeOnClick: t = !1, onClick: n, children: o, size: r, slotId: s, ...a }) {
  const { size: l } = i.useContext(ze), { isSub: c, close: u } = i.useContext(Gh), { close: f } = i.useContext(ze), p = mo[l], g = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "popover-menu-item",
      "data-slot-id": s ?? g,
      className: oe(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        p.text,
        e
      ),
      onClick: (h) => {
        t ? ((c ? u : f)(), setTimeout(() => n?.(h), 150)) : n?.(h);
      },
      ...a,
      children: o
    }
  );
}
function sn({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(ze), r = mo[o], s = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "popover-label",
      "data-slot-id": t ?? s,
      className: oe("py-1.5 text-black-55", r.px, r.text, e),
      ...n
    }
  );
}
function Ct({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ d.jsx("div", { "data-slot": "popover-separator", "data-slot-id": t ?? o, className: oe("-mx-1 my-1 h-px bg-neutral-2", e), ...n });
}
var ho = "Dialog", [sl] = ln(ho), [Yh, Fe] = sl(ho), il = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !0
  } = e, l = i.useRef(null), c = i.useRef(null), [u, f] = Wn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: ho
  });
  return /* @__PURE__ */ d.jsx(
    Yh,
    {
      scope: t,
      triggerRef: l,
      contentRef: c,
      contentId: yt(),
      titleId: yt(),
      descriptionId: yt(),
      open: u,
      onOpenChange: f,
      onOpenToggle: i.useCallback(() => f((p) => !p), [f]),
      modal: a,
      children: n
    }
  );
};
il.displayName = ho;
var al = "DialogTrigger", Xh = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Fe(al, n), s = Se(t, r.triggerRef);
    return /* @__PURE__ */ d.jsx(
      ve.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Ir(r.open),
        ...o,
        ref: s,
        onClick: he(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Xh.displayName = al;
var Tr = "DialogPortal", [qh, ll] = sl(Tr, {
  forceMount: void 0
}), cl = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = Fe(Tr, t);
  return /* @__PURE__ */ d.jsx(qh, { scope: t, forceMount: n, children: i.Children.map(o, (a) => /* @__PURE__ */ d.jsx(Yt, { present: n || s.open, children: /* @__PURE__ */ d.jsx(mr, { asChild: !0, container: r, children: a }) })) });
};
cl.displayName = Tr;
var Hn = "DialogOverlay", ul = i.forwardRef(
  (e, t) => {
    const n = ll(Hn, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Fe(Hn, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ d.jsx(Yt, { present: o || s.open, children: /* @__PURE__ */ d.jsx(Jh, { ...r, ref: t }) }) : null;
  }
);
ul.displayName = Hn;
var Zh = /* @__PURE__ */ Ft("DialogOverlay.RemoveScroll"), Jh = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Fe(Hn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ d.jsx(to, { as: Zh, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ d.jsx(
        ve.div,
        {
          "data-state": Ir(r.open),
          ...o,
          ref: t,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), Pt = "DialogContent", dl = i.forwardRef(
  (e, t) => {
    const n = ll(Pt, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Fe(Pt, e.__scopeDialog);
    return /* @__PURE__ */ d.jsx(Yt, { present: o || s.open, children: s.modal ? /* @__PURE__ */ d.jsx(Qh, { ...r, ref: t }) : /* @__PURE__ */ d.jsx(eg, { ...r, ref: t }) });
  }
);
dl.displayName = Pt;
var Qh = i.forwardRef(
  (e, t) => {
    const n = Fe(Pt, e.__scopeDialog), o = i.useRef(null), r = Se(t, n.contentRef, o);
    return i.useEffect(() => {
      const s = o.current;
      if (s) return hr(s);
    }, []), /* @__PURE__ */ d.jsx(
      fl,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: he(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: he(e.onPointerDownOutside, (s) => {
          const a = s.detail.originalEvent, l = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || l) && s.preventDefault();
        }),
        onFocusOutside: he(
          e.onFocusOutside,
          (s) => s.preventDefault()
        )
      }
    );
  }
), eg = i.forwardRef(
  (e, t) => {
    const n = Fe(Pt, e.__scopeDialog), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ d.jsx(
      fl,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (o.current || n.triggerRef.current?.focus(), s.preventDefault()), o.current = !1, r.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (o.current = !0, s.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const a = s.target;
          n.triggerRef.current?.contains(a) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && r.current && s.preventDefault();
        }
      }
    );
  }
), fl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: s, ...a } = e, l = Fe(Pt, n), c = i.useRef(null), u = Se(t, c);
    return rr(), /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        Yn,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: r,
          onUnmountAutoFocus: s,
          children: /* @__PURE__ */ d.jsx(
            Kn,
            {
              role: "dialog",
              id: l.contentId,
              "aria-describedby": l.descriptionId,
              "aria-labelledby": l.titleId,
              "data-state": Ir(l.open),
              ...a,
              ref: u,
              onDismiss: () => l.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(og, { titleId: l.titleId }),
        /* @__PURE__ */ d.jsx(sg, { contentRef: c, descriptionId: l.descriptionId })
      ] })
    ] });
  }
), Nr = "DialogTitle", tg = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Fe(Nr, n);
    return /* @__PURE__ */ d.jsx(ve.h2, { id: r.titleId, ...o, ref: t });
  }
);
tg.displayName = Nr;
var pl = "DialogDescription", ng = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Fe(pl, n);
    return /* @__PURE__ */ d.jsx(ve.p, { id: r.descriptionId, ...o, ref: t });
  }
);
ng.displayName = pl;
var ml = "DialogClose", hl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Fe(ml, n);
    return /* @__PURE__ */ d.jsx(
      ve.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: he(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
hl.displayName = ml;
function Ir(e) {
  return e ? "open" : "closed";
}
var gl = "DialogTitleWarning", [Yg, vl] = Zu(gl, {
  contentName: Pt,
  titleName: Nr,
  docsSlug: "dialog"
}), og = ({ titleId: e }) => {
  const t = vl(gl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, rg = "DialogDescriptionWarning", sg = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${vl(rg).contentName}}.`;
  return i.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, ig = il, ag = cl, lg = ul, cg = dl, ug = hl;
const dg = i.createContext({ size: "base" }), fg = {
  base: {
    content: "max-w-[400px] rounded-xl p-4",
    close: { buttonSize: "iconBase", position: "right-2 top-2" },
    header: "mb-4 gap-2",
    body: "gap-3",
    field: "gap-2",
    footer: "mt-4 gap-2",
    title: "text-base",
    description: "text-sm"
  },
  lg: {
    content: "max-w-[480px] rounded-2xl p-5",
    close: { buttonSize: "iconLg", position: "right-[10px] top-[10px]" },
    header: "mb-5 gap-3",
    body: "gap-5",
    field: "gap-3",
    footer: "mt-5 gap-3",
    title: "text-lg",
    description: "text-base"
  }
}, pg = ig, mg = ag, hg = Ie(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
);
function gg({ className: e, overlayClassName: t, size: n = "base", children: o, slotId: r, ...s }) {
  const a = fg[n], l = i.useId();
  return /* @__PURE__ */ d.jsx(dg.Provider, { value: { size: n }, children: /* @__PURE__ */ d.jsxs(mg, { children: [
    /* @__PURE__ */ d.jsx(lg, { className: oe("fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t) }),
    /* @__PURE__ */ d.jsxs(
      cg,
      {
        "data-slot": "dialog-content",
        "data-slot-id": r ?? l,
        className: oe(
          hg(),
          a.content,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          e
        ),
        ...s,
        children: [
          o,
          /* @__PURE__ */ d.jsx(ug, { asChild: !0, children: /* @__PURE__ */ d.jsx(Ce, { variant: "ghost", size: a.close.buttonSize, className: oe("absolute", a.close.position), children: /* @__PURE__ */ d.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ d.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) }) })
        ]
      }
    )
  ] }) });
}
function zt({ children: e, className: t, onDoubleClick: n, onClick: o }) {
  const r = i.useRef(null), [s, a] = i.useState(!1);
  return i.useEffect(() => {
    r.current && a(r.current.scrollWidth > r.current.clientWidth);
  }, [e]), s ? /* @__PURE__ */ d.jsxs(co, { children: [
    /* @__PURE__ */ d.jsx(uo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        ref: r,
        className: t,
        onDoubleClick: n,
        onClick: o,
        children: e
      }
    ) }),
    /* @__PURE__ */ d.jsx(fo, { side: "top", size: "base", children: /* @__PURE__ */ d.jsx("p", { children: e }) })
  ] }) : /* @__PURE__ */ d.jsx(
    "span",
    {
      ref: r,
      className: t,
      onDoubleClick: n,
      onClick: o,
      children: e
    }
  );
}
function xl({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: s, readOnly: a }) {
  return t ? /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (l) => r?.(l.target.value),
      onBlur: () => s?.(),
      onKeyDown: (l) => {
        l.key === "Enter" && l.preventDefault(), l.key === "Escape" && l.preventDefault();
      },
      onFocus: (l) => l.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ d.jsx(
    zt,
    {
      className: oe("flex-1 w-full min-h-6 truncate", !a && "cursor-pointer"),
      onDoubleClick: a ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function vg({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: s, readOnly: a }) {
  return t ? /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (l) => {
        const c = l.target.value;
        (c === "" || /^-?\d*\.?\d*$/.test(c)) && r?.(c);
      },
      onBlur: () => s?.(),
      onKeyDown: (l) => {
        l.key === "Enter" && l.preventDefault(), l.key === "Escape" && l.preventDefault();
      },
      onFocus: (l) => l.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden text-right",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ d.jsx(
    zt,
    {
      className: oe("flex-1 w-full min-h-6 truncate text-right", !a && "cursor-pointer"),
      onDoubleClick: a ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function xg({ value: e, options: t, onChange: n, cellId: o, isCellHovering: r }) {
  const [s, a] = i.useState(String(e)), l = t?.placeholder || "请输入", c = i.useRef(null), u = (f) => {
    a(f.target.value), n?.(f.target.value);
  };
  return i.useEffect(() => {
    r && c.current;
  }, [r]), /* @__PURE__ */ d.jsx("div", { className: "min-w-0 flex-1", "data-input-cell": o, children: /* @__PURE__ */ d.jsx(
    it,
    {
      ref: c,
      className: "w-full",
      placeholder: l,
      variant: "basic",
      size: "base",
      value: s,
      onChange: u
    }
  ) });
}
function bg({
  value: e,
  options: t,
  onChange: n,
  onUpdateColumnOptions: o,
  isLocked: r,
  isCellHovering: s,
  onLockCell: a,
  readOnly: l
}) {
  const c = t?.items ?? [], [u, f] = i.useState(!1), [p, g] = i.useState(""), h = i.useMemo(() => c.find((S) => S.value === e)?.label || "", [c, e]), v = i.useMemo(() => {
    if (!p.trim()) return c;
    const P = p.toLowerCase();
    return c.filter((S) => S.label.toLowerCase().includes(P));
  }, [c, p]), m = i.useMemo(() => {
    if (!p.trim()) return !0;
    const P = p.toLowerCase();
    return c.some((S) => S.label.toLowerCase() === P);
  }, [c, p]), x = () => {
    if (!p.trim() || !o) return;
    const P = p.trim(), S = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: P
    };
    f(!1), setTimeout(() => {
      const R = [...c, S];
      o({ ...t, items: R }), n?.(S.value);
    }, 200);
  }, w = (P) => {
    n?.(P), f(!1);
  }, b = () => {
    l || r || a?.();
  }, y = () => {
    l || (r || a?.(), f(!0));
  }, C = (P) => {
    P.stopPropagation(), r || a?.(), f(!0);
  }, E = !l && (r || s);
  return /* @__PURE__ */ d.jsxs(kr, { open: u, onOpenChange: (P) => {
    P && g(""), f(P);
  }, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      /* @__PURE__ */ d.jsx(
        zt,
        {
          className: oe(
            "flex-1 min-h-6 truncate",
            !l && "cursor-pointer",
            !h && "text-black-25"
          ),
          onClick: b,
          onDoubleClick: y,
          children: h || " "
        }
      ),
      /* @__PURE__ */ d.jsx(Rr, { asChild: !0, children: /* @__PURE__ */ d.jsx(
        Ce,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-chevron-down",
          className: oe(
            "ml-auto shrink-0",
            !E && "opacity-0 pointer-events-none"
          ),
          onClick: C
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsx(Pr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ d.jsxs("div", { onClick: (P) => P.stopPropagation(), onDoubleClick: (P) => P.stopPropagation(), onMouseDown: (P) => P.stopPropagation(), children: [
      /* @__PURE__ */ d.jsx(
        it,
        {
          variant: "basic",
          size: "base",
          value: p,
          onChange: (P) => g(P.target.value),
          placeholder: "搜索或添加选项",
          className: "w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none",
          onKeyDown: (P) => {
            P.key === "Enter" && !m && p.trim() && (P.preventDefault(), x());
          }
        }
      ),
      /* @__PURE__ */ d.jsx(Ct, { className: "!my-1" }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col group/options", children: [
        v.length > 0 ? v.map((P) => /* @__PURE__ */ d.jsx(
          Es,
          {
            className: oe(
              P.value === e && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
              P.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !P.disabled && w(P.value),
            children: /* @__PURE__ */ d.jsx(zt, { className: "flex-1 min-w-0 truncate", children: P.label })
          },
          P.value
        )) : !p.trim() && c.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: "relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default", children: "没有选项" }) : null,
        p.trim() && !m && /* @__PURE__ */ d.jsx(
          Es,
          {
            className: "text-black-55 hover:text-black-85",
            onClick: x,
            children: /* @__PURE__ */ d.jsx(zt, { className: "flex-1 min-w-0 truncate", children: `添加选项 "${p.trim()}"` })
          }
        )
      ] })
    ] }) })
  ] });
}
function wg({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, onLockCell: r, readOnly: s }) {
  const a = e?.buttonConfig, [l, c] = i.useState(!1), u = (m) => {
    o?.({ buttonConfig: m }), c(!1);
  }, f = () => {
    const m = a?.url?.trim();
    return m ? m.startsWith("http://") || m.startsWith("https://") || m.includes(".") : !1;
  }, p = (m) => {
    if (m.stopPropagation(), f()) {
      const x = a.url.trim();
      x.startsWith("http://") || x.startsWith("https://") ? window.open(x, "_blank", "noopener,noreferrer") : window.open(`https://${x}`, "_blank", "noopener,noreferrer");
    } else
      r?.(), c(!0);
  }, g = (m) => {
    m.stopPropagation(), t || r?.(), c(!0);
  }, h = !s && (t || n), v = a?.label?.trim() || a?.url?.trim();
  return /* @__PURE__ */ d.jsxs(kr, { open: l, onOpenChange: c, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      v && /* @__PURE__ */ d.jsx("div", { className: "min-w-0 shrink", children: a?.label ? (
        // 文字按钮：link 样式，超长截断 + Tooltip
        /* @__PURE__ */ d.jsx(
          Ce,
          {
            variant: "link",
            size: "base",
            onClick: p,
            className: "max-w-full",
            children: /* @__PURE__ */ d.jsx(zt, { className: "truncate", children: a.label })
          }
        )
      ) : (
        // 图标按钮：只有 URL 无名称时显示
        /* @__PURE__ */ d.jsx(
          Ce,
          {
            variant: "link",
            size: "iconBase",
            leftIcon: "icon-jump",
            onClick: p
          }
        )
      ) }),
      /* @__PURE__ */ d.jsx(Rr, { asChild: !0, children: /* @__PURE__ */ d.jsx(
        Ce,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-link",
          className: oe(
            "ml-auto shrink-0",
            !h && "opacity-0 pointer-events-none"
          ),
          onClick: g
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsx(Pr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ d.jsx("div", { onClick: (m) => m.stopPropagation(), onDoubleClick: (m) => m.stopPropagation(), onMouseDown: (m) => m.stopPropagation(), children: /* @__PURE__ */ d.jsx(
      yg,
      {
        config: a,
        onSave: u
      }
    ) }) })
  ] });
}
function yg({ config: e, onSave: t }) {
  const [n, o] = i.useState(e?.label ?? ""), [r, s] = i.useState(e?.url ?? ""), a = i.useId(), l = () => {
    t({ label: n, url: r });
  }, c = () => {
    t(e ?? {});
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "button-link-manager",
      "data-slot-id": a,
      onKeyDown: (u) => {
        u.key === "Enter" && (u.preventDefault(), l()), u.key === "Escape" && (u.preventDefault(), c());
      },
      children: [
        /* @__PURE__ */ d.jsx(sn, { children: "按钮名称" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          it,
          {
            variant: "basic",
            size: "base",
            value: n,
            onChange: (u) => o(u.target.value),
            placeholder: "输入按钮名称",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(sn, { children: "超链接" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          it,
          {
            variant: "basic",
            size: "base",
            value: r,
            onChange: (u) => s(u.target.value),
            placeholder: "输入超链接",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(Ct, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Ce, { variant: "outline", size: "base", className: "flex-1", onClick: c, children: "取消" }),
          /* @__PURE__ */ d.jsx(Ce, { variant: "primary", size: "base", className: "flex-1", onClick: l, children: "保存" })
        ] })
      ]
    }
  );
}
function Cg({ value: e, options: t }) {
  const n = t?.iconName || String(e);
  return /* @__PURE__ */ d.jsx(Ce, { variant: "ghost", size: "iconBase", leftIcon: n });
}
function Sg({ file: e, isLocked: t, isPreviewOpen: n, onPreview: o, onRemove: r }) {
  const [s, a] = i.useState(null), l = i.useRef(null), c = i.useRef(null), u = i.useRef(null), f = e.type.startsWith("image/"), p = e.type.startsWith("video/");
  i.useEffect(() => {
    if (f) {
      const w = URL.createObjectURL(e);
      return a(w), () => URL.revokeObjectURL(w);
    } else if (p) {
      const w = URL.createObjectURL(e), b = c.current, y = u.current;
      return b && y && (b.src = w, b.addEventListener("loadeddata", () => {
        y.width = b.videoWidth || 80, y.height = b.videoHeight || 80;
        const C = y.getContext("2d");
        if (C) {
          C.drawImage(b, 0, 0, y.width, y.height);
          const E = y.toDataURL("image/jpeg", 0.8);
          a(E);
        }
      }), b.currentTime = 0.1), () => URL.revokeObjectURL(w);
    }
    return () => {
    };
  }, [e, f, p]);
  const g = () => {
    o?.();
  }, h = (w) => {
    w.stopPropagation(), l.current?.click();
  }, v = (w) => {
    w.stopPropagation(), r?.();
  }, m = (w) => {
    w.target.files?.[0], w.target.value = "";
  }, x = /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer",
      onClick: g,
      children: [
        s ? /* @__PURE__ */ d.jsx("img", { src: s, alt: e.name, className: "size-full object-cover" }) : /* @__PURE__ */ d.jsx("svg", { className: "size-4 text-black-55", fill: "currentColor", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-file-1" }) }),
        (f || p) && s && /* @__PURE__ */ d.jsx("div", { className: oe(
          "absolute inset-0 bg-black-10 opacity-0 group-hover:opacity-100",
          !n && "transition-opacity"
        ) })
      ]
    }
  );
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    t ? /* @__PURE__ */ d.jsxs(co, { children: [
      /* @__PURE__ */ d.jsx(uo, { asChild: !0, children: x }),
      /* @__PURE__ */ d.jsxs(fo, { side: "top", sideOffset: 4, className: "h-10 flex items-center px-0.5", children: [
        /* @__PURE__ */ d.jsx(
          Ce,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-edit",
            onClick: h,
            className: "text-white-60 hover:text-white-100"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ce,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-delete",
            onClick: v,
            className: "text-white-60 hover:text-white-100"
          }
        )
      ] })
    ] }) : x,
    /* @__PURE__ */ d.jsx("input", { ref: l, type: "file", className: "hidden", onChange: m }),
    /* @__PURE__ */ d.jsx("video", { ref: c, className: "hidden", preload: "metadata", crossOrigin: "anonymous" }),
    /* @__PURE__ */ d.jsx("canvas", { ref: u, className: "hidden" })
  ] });
}
function Eg({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, readOnly: r }) {
  const s = e?.attachmentFiles, a = i.useRef(null), l = i.useRef(null), [c, u] = i.useState(null), [f, p] = i.useState([]), g = s ?? [], h = g.length, [v, m] = i.useState(h);
  i.useEffect(() => {
    const A = l.current;
    if (!A) return;
    const _ = () => {
      const H = A.clientWidth, ee = Math.max(1, Math.floor(H / 40));
      m(ee);
    };
    _();
    const X = new ResizeObserver(_);
    return X.observe(A), () => X.disconnect();
  }, [h]);
  const x = h > v, w = h - v;
  i.useEffect(() => {
    const A = g.map((_) => URL.createObjectURL(_));
    return p(A), () => A.forEach((_) => URL.revokeObjectURL(_));
  }, [s]);
  const b = (A) => {
    o?.({ attachmentFiles: A });
  }, y = () => {
    a.current?.click();
  }, C = (A) => {
    const _ = Array.from(A.target.files || []);
    _.length > 0 && b([...g, ..._]), A.target.value = "";
  }, E = (A) => {
    const _ = g.filter((X, H) => H !== A);
    b(_), c === A && u(null);
  }, P = (A) => {
    u(A);
  }, S = () => {
    c !== null && c > 0 && u(c - 1);
  }, R = () => {
    c !== null && c < h - 1 && u(c + 1);
  };
  i.useEffect(() => {
    if (c === null) return;
    const A = (_) => {
      _.key === "ArrowLeft" ? S() : _.key === "ArrowRight" && R();
    };
    return window.addEventListener("keydown", A), () => window.removeEventListener("keydown", A);
  }, [c]);
  const j = !r && (t || n);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { ref: l, className: "flex items-center gap-2 min-w-0 flex-1", children: [
      h > 0 && /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2 min-w-0 shrink", children: g.slice(0, v).map((A, _) => /* @__PURE__ */ d.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ d.jsx(
          Sg,
          {
            file: A,
            isLocked: t ?? !1,
            isPreviewOpen: c !== null,
            onPreview: () => P(_),
            onRemove: () => E(_)
          }
        ),
        x && _ === v - 1 && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer",
            onClick: () => P(_),
            children: /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-white-100", children: [
              "+",
              w
            ] })
          }
        )
      ] }, `${A.name}-${A.size}-${_}`)) }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          ref: a,
          type: "file",
          multiple: !0,
          className: "hidden",
          onChange: C
        }
      ),
      j && /* @__PURE__ */ d.jsx(
        Ce,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-upload",
          className: "ml-auto shrink-0",
          onClick: y
        }
      )
    ] }),
    c !== null && f[c] && /* @__PURE__ */ d.jsx(pg, { open: c !== null, onOpenChange: (A) => !A && u(null), children: /* @__PURE__ */ d.jsxs(
      gg,
      {
        size: "lg",
        overlayClassName: "bg-black-55",
        className: "w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85",
        children: [
          /* @__PURE__ */ d.jsx(
            Ce,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-left",
              disabled: c === 0,
              className: "absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: S
            }
          ),
          g[c]?.type.startsWith("image/") ? /* @__PURE__ */ d.jsx("img", { src: f[c], alt: g[c].name, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" }) : g[c]?.type.startsWith("video/") ? /* @__PURE__ */ d.jsx("video", { src: f[c], controls: !0, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" }) : null,
          /* @__PURE__ */ d.jsx(
            Ce,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-right",
              disabled: c === h - 1,
              className: "absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: R
            }
          ),
          /* @__PURE__ */ d.jsxs("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 text-white text-sm z-10", children: [
            c + 1,
            "/",
            h
          ] })
        ]
      }
    ) })
  ] });
}
const bl = {
  text: xl,
  number: vg,
  input: xg,
  select: bg,
  // 使用新版可编辑渲染器
  button: wg,
  attachment: Eg,
  icon: Cg
}, wl = i.createContext(null), yl = i.createContext(null), Cl = i.createContext(null), Ar = i.createContext(bl);
function go() {
  const e = i.useContext(wl);
  if (!e) throw new Error("useTableActions must be used within a TableProvider");
  return e;
}
function fn() {
  const e = i.useContext(yl);
  if (!e) throw new Error("useTableData must be used within a TableProvider");
  return e;
}
function vo() {
  const e = i.useContext(Cl);
  if (!e) throw new Error("useTableState must be used within a TableProvider");
  return e;
}
function It() {
  return {
    state: vo(),
    actions: go(),
    data: fn(),
    cellRenderers: i.useContext(Ar)
  };
}
function kg({ data: e, cellRenderers: t, readOnly: n, children: o }) {
  const r = i.useMemo(
    () => ({ ...bl, ...t }),
    [t]
  ), [s, a] = i.useState(() => {
    const N = {};
    return e.columns.forEach((M) => {
      N[M.id] = M.width === "auto" ? 40 : M.width ?? 200;
    }), N;
  }), [l, c] = i.useState(e.columns), [u, f] = i.useState(e.rows), [p, g] = i.useState(() => e.hiddenColumns ?? /* @__PURE__ */ new Set()), [h, v] = i.useState(() => {
    const N = /* @__PURE__ */ new Set(), M = e.columns.find((F) => F.type === "checkbox");
    M && N.add(M.id);
    const D = e.columns.find((F) => F.type !== "checkbox");
    return D && N.add(D.id), N;
  }), [m, x] = i.useState(() => e.groupColumnId ?? null), [w, b] = i.useState(() => {
    if (e.initialCollapsedGroups) return new Set(e.initialCollapsedGroups);
    if (!e.groupColumnId) return /* @__PURE__ */ new Set();
    const N = e.columns.findIndex((J) => J.id === e.groupColumnId);
    if (N === -1) return /* @__PURE__ */ new Set();
    const M = new Set(e.rows.map((J) => String(J.cells[N]?.value ?? ""))), D = Array.from(M).sort((J, ie) => !J && ie ? 1 : J && !ie ? -1 : 0), F = D[0];
    if (!F) return /* @__PURE__ */ new Set();
    const G = new Set(D);
    return G.delete(F), G;
  }), [y, C] = i.useState(/* @__PURE__ */ new Set()), [E, P] = i.useState(null), [S, R] = i.useState(n ?? !1);
  i.useEffect(() => {
    S && (ae(null), Z(""), ne(null));
  }, [S]);
  const j = i.useRef(l);
  j.current = l;
  const A = i.useRef(u);
  A.current = u;
  const _ = i.useRef(p);
  _.current = p;
  const X = i.useRef(h);
  X.current = h;
  const H = i.useRef(m);
  H.current = m;
  const Q = i.useRef(w);
  Q.current = w;
  const ee = i.useRef(s);
  ee.current = s;
  const L = i.useRef([]), U = i.useRef([]);
  i.useEffect(() => {
    L.current = [], U.current = [];
  }, [e]);
  const W = i.useCallback(() => ({
    columns: j.current,
    rows: A.current,
    hiddenColumns: [..._.current],
    frozenColumns: [...X.current],
    groupColumnId: H.current,
    collapsedGroups: [...Q.current],
    columnWidths: { ...ee.current }
  }), []), K = i.useCallback(() => {
    L.current = [...L.current, W()].slice(-20), U.current = [];
  }, [W]), $ = i.useCallback((N) => {
    c(N.columns), f(N.rows), g(new Set(N.hiddenColumns)), v(new Set(N.frozenColumns)), x(N.groupColumnId), b(new Set(N.collapsedGroups)), a({ ...N.columnWidths }), P(null), ne(null), ae(null), Z("");
  }, []), k = i.useCallback(() => {
    const N = L.current;
    if (N.length === 0) return;
    const M = N[N.length - 1];
    U.current = [...U.current, W()], L.current = N.slice(0, -1), $(M);
  }, [W, $]), Y = i.useCallback(() => {
    const N = U.current;
    if (N.length === 0) return;
    const M = N[N.length - 1];
    L.current = [...L.current, W()].slice(-20), U.current = N.slice(0, -1), $(M);
  }, [W, $]), [re, ne] = i.useState(null), [q, ae] = i.useState(null), [O, Z] = i.useState(""), te = y.size === u.length && u.length > 0, ue = i.useCallback(() => {
    C(te ? /* @__PURE__ */ new Set() : new Set(u.map((N) => N.id)));
  }, [te, u]), de = i.useCallback((N) => {
    C((M) => {
      const D = new Set(M);
      return D.has(N) ? D.delete(N) : D.add(N), D;
    }), ne(null);
  }, []), me = i.useCallback(() => {
    C(/* @__PURE__ */ new Set());
  }, []), ye = i.useCallback((N, M) => {
    ae(N), Z(M);
  }, []), pe = i.useCallback(() => {
    if (!q) return;
    const N = l.some((M) => M.id === q);
    q.startsWith("group-header-") || K(), N ? c(
      (M) => M.map(
        (D) => D.id === q ? { ...D, title: O } : D
      )
    ) : f(
      (M) => M.map((D) => ({
        ...D,
        cells: D.cells.map(
          (F) => F.id === q ? { ...F, value: O } : F
        )
      }))
    ), ae(null), Z("");
  }, [q, O, l]), Qe = i.useCallback(() => {
    ae(null), Z("");
  }, []), et = i.useCallback((N) => {
    Z(N);
  }, []), mt = i.useCallback((N, M) => {
    K(), f((D) => D.map((F) => {
      const G = F.cells.findIndex((ie) => ie.id === N);
      if (G === -1) return F;
      const J = [...F.cells];
      if (typeof M == "object" && M !== null) {
        const ie = M, xe = F.cells[G];
        J[G] = {
          ...xe,
          ...ie
        };
      } else
        J[G] = { ...F.cells[G], value: M };
      return { ...F, cells: J };
    }));
  }, []), xo = i.useCallback((N, M) => {
    a((D) => ({
      ...D,
      [N]: M
    }));
  }, []), tt = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, bo = i.useCallback((N) => {
    const M = l.findIndex((G) => G.id === N);
    if (M === -1) return;
    K();
    const D = tt(), F = {
      id: D,
      type: "text",
      title: "新列",
      width: 200
    };
    c((G) => {
      const J = [...G];
      return J.splice(M, 0, F), J;
    }), a((G) => ({
      ...G,
      [D]: 200
    })), f(
      (G) => G.map((J) => {
        const ie = {
          id: `${D}-${J.id}`,
          type: "text",
          value: "",
          width: 200
        }, xe = [...J.cells];
        return xe.splice(M, 0, ie), { ...J, cells: xe };
      })
    );
  }, [l]), Xt = i.useCallback((N) => {
    const M = l.findIndex((G) => G.id === N);
    if (M === -1) return;
    K();
    const D = tt(), F = {
      id: D,
      type: "text",
      title: "新列",
      width: 200
    };
    c((G) => {
      const J = [...G];
      return J.splice(M + 1, 0, F), J;
    }), a((G) => ({
      ...G,
      [D]: 200
    })), f(
      (G) => G.map((J) => {
        const ie = {
          id: `${D}-${J.id}`,
          type: "text",
          value: "",
          width: 200
        }, xe = [...J.cells];
        return xe.splice(M + 1, 0, ie), { ...J, cells: xe };
      })
    );
  }, [l]), wo = i.useCallback((N) => {
    K(), g((M) => new Set(M).add(N));
  }, []), yo = i.useCallback((N) => {
    K(), g((M) => {
      const D = new Set(M);
      return D.has(N) ? D.delete(N) : D.add(N), D;
    });
  }, []), pn = i.useCallback((N) => {
    const M = l.findIndex((D) => D.id === N);
    M !== -1 && (K(), c((D) => D.filter((F) => F.id !== N)), a((D) => {
      const F = { ...D };
      return delete F[N], F;
    }), g((D) => {
      const F = new Set(D);
      return F.delete(N), F;
    }), f(
      (D) => D.map((F) => ({
        ...F,
        cells: F.cells.filter((G, J) => J !== M)
      }))
    ));
  }, [l]), At = i.useCallback((N, M) => {
    const D = l.findIndex((F) => F.id === N);
    D !== -1 && (K(), c(
      (F) => F.map(
        (G) => G.id === N ? { ...G, type: M } : G
      )
    ), f(
      (F) => F.map((G) => ({
        ...G,
        cells: G.cells.map(
          (J, ie) => ie === D ? { ...J, type: M } : J
        )
      }))
    ));
  }, [l]), ht = i.useCallback((N, M) => {
    K(), c(
      (D) => D.map(
        (F) => F.id === N ? { ...F, title: M } : F
      )
    );
  }, []), qt = i.useCallback((N, M) => {
    K(), c(
      (D) => D.map(
        (F) => F.id === N ? { ...F, options: M } : F
      )
    );
  }, []), mn = i.useCallback((N) => {
    const M = l.findIndex((F) => F.id === N);
    if (M === -1) return;
    K();
    const D = l.slice(0, M + 1).map((F) => F.id);
    v(new Set(D));
  }, [l]), Zt = i.useCallback((N) => {
    if (K(), x(N), N) {
      const M = l.findIndex((G) => G.id === N);
      if (M === -1) {
        b(/* @__PURE__ */ new Set());
        return;
      }
      const D = Array.from(
        new Set(u.map((G) => String(G.cells[M]?.value ?? "")))
      ).sort((G, J) => !G && J ? 1 : G && !J ? -1 : 0), F = D[0];
      b(
        F ? new Set(D.filter((G) => G !== F)) : /* @__PURE__ */ new Set()
      );
    } else
      b(/* @__PURE__ */ new Set());
  }, [l, u]), De = {
    selectedRows: y,
    selectAll: te,
    editingCellId: q,
    editingValue: O,
    lockedCellId: re,
    columnWidths: s,
    allColumns: l,
    hiddenColumns: p,
    frozenColumns: h,
    groupColumnId: m,
    collapsedGroups: w,
    selectedColumnId: E,
    readOnly: S
  }, hn = i.useCallback((N) => {
    K(), b((M) => {
      const D = new Set(M);
      return D.has(N) ? D.delete(N) : D.add(N), D;
    });
  }, []), Co = i.useCallback(() => {
    K(), b(/* @__PURE__ */ new Set());
  }, []), Ot = i.useCallback(() => {
    if (!m) return;
    K();
    const N = l.findIndex((D) => D.id === m);
    if (N === -1) return;
    const M = new Set(u.map((D) => String(D.cells[N]?.value ?? "")));
    b(M);
  }, [m, l, u]), gn = i.useCallback((N, M) => {
    const D = M.map((G) => G.id), F = D.every((G) => y.has(G));
    C((G) => {
      const J = new Set(G);
      return F ? D.forEach((ie) => J.delete(ie)) : D.forEach((ie) => J.add(ie)), J;
    });
  }, [y]), I = (N) => {
    switch (N.type) {
      case "checkbox":
        return !1;
      case "button":
        return N.options?.label || "";
      case "icon":
        return N.options?.iconName || "";
      default:
        return "";
    }
  }, T = (N, M, D) => ({
    id: `${M}-${N.id}`,
    type: N.type,
    value: I(N),
    width: N.width === "auto" ? 40 : N.width ?? 200,
    ...D
  }), z = i.useCallback((N, M) => {
    const D = l.findIndex((ie) => ie.id === M);
    if (D === -1) return;
    K();
    const F = tt(), G = l.map(
      (ie) => T(ie, F, ie.id === M ? { value: N } : void 0)
    );
    let J = u.length;
    for (let ie = u.length - 1; ie >= 0; ie--) {
      const we = u[ie]?.cells[D];
      if ((we ? String(we.value ?? "") : "") === N) {
        J = ie + 1;
        break;
      }
    }
    f((ie) => {
      const xe = [...ie];
      return xe.splice(J, 0, { id: F, cells: G }), xe;
    });
  }, [l, u]), fe = i.useCallback(() => {
    K();
    const N = tt(), M = l.map(
      (D) => T(D, N)
    );
    f((D) => [...D, { id: N, cells: M }]);
  }, [l]), se = i.useCallback((N, M, D) => {
    const F = l.findIndex((G) => G.id === D);
    F !== -1 && (K(), f(
      (G) => G.map((J) => {
        const ie = J.cells[F];
        if ((ie ? String(ie.value ?? "") : "") === N && ie) {
          const we = [...J.cells];
          return we[F] = { ...ie, value: M }, { ...J, cells: we };
        }
        return J;
      })
    ));
  }, [l]), le = i.useCallback((N) => {
    ne(N), N && (C(/* @__PURE__ */ new Set()), P(null));
  }, []), ge = i.useCallback((N) => {
    P(N), N && (C(/* @__PURE__ */ new Set()), ne(null));
  }, []), Ee = i.useCallback((N, M, D) => {
    const F = l.findIndex((we) => we.id === N), G = l.findIndex((we) => we.id === M);
    if (F === -1 || G === -1 || F === G) return;
    K();
    const J = D === "right" ? G + 1 : G, ie = J > F ? J - 1 : J;
    if (ie === F) return;
    const xe = F;
    c((we) => {
      const ke = [...we], be = ke[xe];
      return be ? (ke.splice(xe, 1), ke.splice(ie, 0, be), ke) : we;
    }), f(
      (we) => we.map((ke) => {
        const be = [...ke.cells], Re = be[xe];
        return Re ? (be.splice(xe, 1), be.splice(ie, 0, Re), { ...ke, cells: be }) : ke;
      })
    ), P(N);
  }, [l]), Te = i.useCallback((N, M) => {
    K();
    const F = l.some((xe) => xe.type === "checkbox") ? 1 : 0, G = l.length - F;
    let J = l;
    if (M > G) {
      const xe = M - G, we = [], ke = {};
      for (let be = 0; be < xe; be++) {
        const Re = tt(), Ge = l.length + be + 1 - F;
        we.push({
          id: Re,
          type: "text",
          title: `列${Ge}`,
          width: 200
        }), ke[Re] = 200;
      }
      J = [...l, ...we], c(J), a((be) => ({ ...be, ...ke })), f(
        (be) => be.map((Re) => {
          const Ge = we.map((Rl) => ({
            id: `${Rl.id}-${Re.id}`,
            type: "text",
            value: "",
            width: 200
          }));
          return { ...Re, cells: [...Re.cells, ...Ge] };
        })
      );
    } else if (M < G) {
      const xe = G - M, we = l.length - xe, ke = l.slice(we).map((be) => be.id);
      J = l.slice(0, we), c(J), a((be) => {
        const Re = { ...be };
        return ke.forEach((Ge) => delete Re[Ge]), Re;
      }), g((be) => {
        const Re = new Set(be);
        return ke.forEach((Ge) => Re.delete(Ge)), Re;
      }), f(
        (be) => be.map((Re) => ({
          ...Re,
          cells: Re.cells.slice(0, we)
        }))
      );
    }
    const ie = u.length;
    if (N > ie) {
      const xe = N - ie, we = [];
      for (let ke = 0; ke < xe; ke++) {
        const be = tt(), Re = J.map(
          (Ge) => T(Ge, be)
        );
        we.push({ id: be, cells: Re });
      }
      f((ke) => [...ke, ...we]);
    } else N < ie && f((xe) => xe.slice(0, N));
  }, [l, u]), _e = i.useCallback(() => {
    R((N) => !N);
  }, []), gt = {
    toggleSelectAll: ue,
    toggleRowSelect: de,
    clearSelection: me,
    startEdit: ye,
    finishEdit: pe,
    cancelEdit: Qe,
    updateEditingValue: et,
    lockCell: le,
    updateCellValue: mt,
    updateColumnWidth: xo,
    insertColumnLeft: bo,
    insertColumnRight: Xt,
    hideColumn: wo,
    toggleColumnVisibility: yo,
    deleteColumn: pn,
    updateColumnType: At,
    updateColumnTitle: ht,
    updateColumnOptions: qt,
    freezeColumns: mn,
    setGroupColumn: Zt,
    toggleGroupCollapse: hn,
    toggleGroupSelect: gn,
    insertRowInGroup: z,
    insertRow: fe,
    updateGroupValues: se,
    expandAllGroups: Co,
    collapseAllGroups: Ot,
    selectColumn: ge,
    moveColumnOrder: Ee,
    setDimension: Te,
    toggleReadOnly: _e,
    undo: k,
    redo: Y
  }, Jt = i.useMemo(() => ({
    columns: l.filter((N) => !p.has(N.id)),
    rows: u.map((N) => ({
      ...N,
      cells: N.cells.filter((M, D) => !p.has(l[D]?.id ?? ""))
    })),
    allRows: u
  }), [l, u, p]), nt = i.useMemo(() => {
    const N = /* @__PURE__ */ new Map();
    return Jt.columns.forEach((M) => N.set(M.id, M)), N;
  }, [Jt.columns]), vt = i.useMemo(() => ({ ...Jt, columnMap: nt }), [Jt, nt]), So = i.useMemo(() => De, [De]);
  return /* @__PURE__ */ d.jsx(wl.Provider, { value: gt, children: /* @__PURE__ */ d.jsx(yl.Provider, { value: vt, children: /* @__PURE__ */ d.jsx(Cl.Provider, { value: So, children: /* @__PURE__ */ d.jsx(Ar.Provider, { value: r, children: o }) }) }) });
}
function Rg(e) {
  const { data: t, state: n } = It(), o = i.useMemo(() => {
    if (!e) return !1;
    const s = t.columns.find((a) => a.type === "checkbox")?.id;
    if (s) {
      const a = t.columns.findIndex((c) => c.id === s), l = t.columns[a + 1]?.id;
      return e === l;
    } else
      return e === t.columns[0]?.id;
  }, [e, t.columns]), r = i.useMemo(() => {
    const s = n.allColumns, a = s.find((l) => l.type === "checkbox")?.id;
    if (a) {
      const l = s.findIndex((c) => c.id === a);
      return s[l + 1]?.id;
    } else
      return s[0]?.id;
  }, [n.allColumns]);
  return { isFirstDataColumn: o, firstDataColumnId: r };
}
function Pg({
  columnId: e,
  isFirstDataColumn: t,
  groupColumnId: n,
  readOnly: o,
  onEdit: r,
  onHideManager: s,
  onDimension: a
}) {
  const { actions: l, state: c } = It(), { close: u } = i.useContext(ze), f = i.useId();
  return /* @__PURE__ */ d.jsxs("div", { "data-slot": "header-cell-menu", "data-slot-id": f, children: [
    !o && /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: r, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-edit" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "编辑列" })
    ] }),
    !t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", closeOnClick: !0, onClick: () => e && l.hideColumn(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "隐藏列" })
    ] }),
    /* @__PURE__ */ d.jsx(Ct, {}),
    t && n && /* @__PURE__ */ d.jsxs(
      Ae,
      {
        size: "base",
        onClick: () => {
          u(), setTimeout(() => {
            c.collapsedGroups.size > 0 ? l.expandAllGroups() : l.collapseAllGroups();
          }, 250);
        },
        children: [
          /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: c.collapsedGroups.size > 0 ? "#icon-chevron-down-double" : "#icon-a-chevron-rightdouble" }) }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: c.collapsedGroups.size > 0 ? "展开分组" : "收起分组" })
        ]
      }
    ),
    t ? /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: () => {
      u(), setTimeout(() => e && l.setGroupColumn(n ? null : e), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: n ? "取消分组" : "设为分组" })
    ] }) : /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: () => {
      u(), setTimeout(() => e && l.setGroupColumn(n === e ? null : e), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: n === e ? "取消分组" : "设为分组" })
    ] }),
    !o && !t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", closeOnClick: !0, onClick: () => e && l.insertColumnLeft(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-arrow-left" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "向左插入列" })
    ] }),
    !o && /* @__PURE__ */ d.jsxs(Ae, { size: "base", closeOnClick: !0, onClick: () => e && l.insertColumnRight(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-arrow-right" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "向右插入列" })
    ] }),
    /* @__PURE__ */ d.jsx(Ct, {}),
    t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: s, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "隐藏列管理" })
    ] }),
    !o && t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: a, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-grid-view" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "行列数管理" })
    ] }),
    t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", onClick: () => {
      u(), setTimeout(() => l.toggleReadOnly(), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: o ? "#icon-book-open" : "#icon-book-open-filled" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: o ? "编辑模式" : "只读模式" })
    ] }),
    !t && /* @__PURE__ */ d.jsxs(Ae, { size: "base", closeOnClick: !0, onClick: () => e && l.freezeColumns(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-grid-column" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "冻结到此列" })
    ] }),
    !o && !t && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(Ct, {}),
      /* @__PURE__ */ d.jsxs(
        Ae,
        {
          size: "base",
          closeOnClick: !0,
          onClick: () => e && l.deleteColumn(e),
          className: "text-error-5 hover:bg-error-1 focus:bg-error-1 active:bg-error-2",
          children: [
            /* @__PURE__ */ d.jsx("svg", { className: "icon text-error-5", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-delete" }) }),
            /* @__PURE__ */ d.jsx("span", { className: "text-sm", children: "删除列" })
          ]
        }
      )
    ] })
  ] });
}
function Tg({ size: e, fields: t }) {
  const n = i.useContext(ze), o = e ?? n.size, r = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5"
  }[o], s = i.useRef(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ d.jsx(d.Fragment, { children: t.map((a, l) => /* @__PURE__ */ d.jsxs(i.Fragment, { children: [
    a.label && /* @__PURE__ */ d.jsx(sn, { children: a.label }),
    a.type === "input" && /* @__PURE__ */ d.jsx("div", { className: r, children: /* @__PURE__ */ d.jsx(
      it,
      {
        variant: "basic",
        size: o,
        value: a.value,
        defaultValue: a.defaultValue,
        onChange: (c) => a.onChange?.(c.target.value),
        placeholder: a.placeholder,
        autoFocus: a.autoFocus,
        onFocus: a.selectOnFocus ? (c) => {
          s.current.has(l) || (s.current.add(l), c.target.select());
        } : void 0,
        className: "w-full"
      }
    ) }),
    a.type === "select" && /* @__PURE__ */ d.jsx("div", { className: r, children: /* @__PURE__ */ d.jsxs(om, { value: a.value, onValueChange: a.onChange, size: o, children: [
      /* @__PURE__ */ d.jsx(rm, { variant: "basic", className: "w-full", children: /* @__PURE__ */ d.jsx(am, { placeholder: a.placeholder }) }),
      /* @__PURE__ */ d.jsx(sm, { children: a.options?.map((c) => /* @__PURE__ */ d.jsx(im, { value: c.value, children: c.label }, c.value)) })
    ] }) }),
    a.type === "content" && /* @__PURE__ */ d.jsx(
      Ng,
      {
        field: a,
        paddingClass: r,
        size: o
      }
    )
  ] }, l)) });
}
function Ng({ field: e, paddingClass: t }) {
  const n = e.selectOptions ?? [], [o, r] = i.useState(null), [s, a] = i.useState(null), l = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, c = () => {
    const v = {
      value: l(),
      label: ""
    };
    e.onSelectOptionsChange?.([...n, v]);
  }, u = (v) => {
    const m = n.filter((x, w) => w !== v);
    e.onSelectOptionsChange?.(m);
  }, f = (v, m) => {
    const x = n.map(
      (w, b) => b === v ? { ...w, label: m } : w
    );
    e.onSelectOptionsChange?.(x);
  }, p = (v) => {
    r(v);
  }, g = (v, m) => {
    v.preventDefault(), a(m);
  }, h = () => {
    if (o !== null && s !== null && o !== s) {
      const v = [...n], m = v[o];
      m && (v.splice(o, 1), v.splice(s, 0, m), e.onSelectOptionsChange?.(v));
    }
    r(null), a(null);
  };
  return e.contentType !== "select" ? null : /* @__PURE__ */ d.jsxs("div", { className: t, children: [
    /* @__PURE__ */ d.jsx(
      Ce,
      {
        variant: "ghost",
        size: "base",
        className: "w-full justify-center text-black-55",
        leftIcon: "icon-add",
        onClick: c,
        children: "添加选项"
      }
    ),
    n.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "mt-1.5 flex flex-col gap-0.5", children: n.map((v, m) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        draggable: !0,
        onDragStart: () => p(m),
        onDragOver: (x) => g(x, m),
        onDragEnd: h,
        className: Ig(
          "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
          s === m && "bg-brand-1",
          o === m && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ d.jsx(
            Ce,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-move",
              className: "shrink-0 cursor-grab text-black-55"
            }
          ),
          /* @__PURE__ */ d.jsx(
            it,
            {
              variant: "basic",
              size: "base",
              value: v.label,
              onChange: (x) => f(m, x.target.value),
              className: "flex-1 min-w-0",
              placeholder: "输入选项名称"
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ce,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-close",
              onClick: () => u(m),
              className: "shrink-0 text-black-55"
            }
          )
        ]
      },
      v.value
    )) })
  ] });
}
function Ig(...e) {
  return e.filter(Boolean).join(" ");
}
function Ag({
  columnId: e,
  value: t,
  currentColumnType: n,
  currentColumnDef: o,
  onClose: r
}) {
  const { actions: s } = It(), { close: a } = i.useContext(ze), l = i.useId(), [c, u] = i.useState(String(t)), [f, p] = i.useState("text"), [g, h] = i.useState([]);
  i.useEffect(() => {
    u(String(t)), p(n), o?.options ? n === "select" && h(o.options.items ?? []) : h([]);
  }, [t, n, o]);
  const v = () => {
    if (c !== String(t) && e && s.updateColumnTitle(e, c), e && f !== n && s.updateColumnType(e, f), e) {
      const m = {};
      if (f === "select") {
        const x = g.filter((w) => w.label.trim());
        m.items = x;
      }
      s.updateColumnOptions(e, m);
    }
    a();
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "header-cell-edit",
      "data-slot-id": l,
      onKeyDown: (m) => {
        m.key === "Enter" && (m.preventDefault(), v()), m.key === "Escape" && (m.preventDefault(), r());
      },
      children: [
        /* @__PURE__ */ d.jsx(
          Tg,
          {
            size: "base",
            fields: [
              {
                label: "标题",
                type: "input",
                value: c,
                onChange: u,
                placeholder: "输入列标题",
                autoFocus: !0,
                selectOnFocus: !0
              },
              {
                label: "列类型",
                type: "select",
                value: f,
                onChange: (m) => p(m),
                placeholder: "选择列类型",
                options: [
                  { value: "text", label: "文本列" },
                  { value: "number", label: "数字列" },
                  { value: "select", label: "选择列" },
                  { value: "button", label: "链接列" },
                  { value: "attachment", label: "附件列" },
                  { value: "reference", label: "引用列" }
                ]
              },
              // 只有单选列才显示选项内容配置
              ...f === "select" ? [{
                label: "",
                type: "content",
                contentType: f,
                selectOptions: g,
                onSelectOptionsChange: h
              }] : []
            ]
          }
        ),
        /* @__PURE__ */ d.jsx(Ct, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Ce, { variant: "outline", size: "base", className: "flex-1", onClick: r, children: "取消" }),
          /* @__PURE__ */ d.jsx(Ce, { variant: "primary", size: "base", className: "flex-1", onClick: v, children: "保存" })
        ] })
      ]
    }
  );
}
function Og({ firstDataColumnId: e }) {
  const { state: t, actions: n } = It(), o = i.useId(), r = t.allColumns.find((a) => a.type === "checkbox"), s = r ? t.hiddenColumns.has(r.id) : !1;
  return /* @__PURE__ */ d.jsxs("div", { "data-slot": "hide-column-view", "data-slot-id": o, children: [
    r && /* @__PURE__ */ d.jsxs(
      Ae,
      {
        size: "base",
        closeOnClick: !1,
        onClick: () => n.toggleColumnVisibility(r.id),
        children: [
          /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: s ? "#icon-browse-off" : "#icon-browse" }) }),
          /* @__PURE__ */ d.jsx("span", { children: "多选列" })
        ]
      }
    ),
    t.allColumns.filter((a) => a.type !== "checkbox" && a.id !== e).map((a) => {
      const l = t.hiddenColumns.has(a.id);
      return /* @__PURE__ */ d.jsxs(
        Ae,
        {
          size: "base",
          closeOnClick: !1,
          onClick: () => n.toggleColumnVisibility(a.id),
          children: [
            /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55 shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: l ? "#icon-browse-off" : "#icon-browse" }) }),
            /* @__PURE__ */ d.jsxs(co, { children: [
              /* @__PURE__ */ d.jsx(uo, { asChild: !0, children: /* @__PURE__ */ d.jsx("span", { className: "truncate", children: a.title || a.id }) }),
              /* @__PURE__ */ d.jsx(fo, { side: "top", size: "base", children: /* @__PURE__ */ d.jsx("p", { children: a.title || a.id }) })
            ] })
          ]
        },
        a.id
      );
    })
  ] });
}
function jg() {
  const { data: e, state: t, actions: n } = It(), { close: o } = i.useContext(ze), r = i.useId(), s = e.rows.length, a = i.useMemo(() => t.allColumns.some((E) => E.type === "checkbox") ? 1 : 0, [t.allColumns]), l = t.allColumns.length - a, [c, u] = i.useState(String(s)), [f, p] = i.useState(String(l)), g = (C) => Math.max(1, Math.min(100, C)), h = (C) => Math.max(2, Math.min(100, C)), v = (C) => {
    u(C);
  }, m = (C) => {
    p(C);
  }, x = () => {
    (c === "" || c === void 0) && u(String(s));
  }, w = () => {
    (f === "" || f === void 0) && p(String(l));
  }, b = () => {
    const C = g(parseInt(c) || s), E = h(parseInt(f) || l);
    n.setDimension(C, E), o();
  }, y = () => {
    o();
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "header-cell-dimension",
      "data-slot-id": r,
      onKeyDown: (C) => {
        C.key === "Enter" && (C.preventDefault(), b()), C.key === "Escape" && (C.preventDefault(), y());
      },
      children: [
        /* @__PURE__ */ d.jsx(sn, { children: "行数" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          it,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: c,
            onChange: (C) => v(C.target.value),
            onFocus: (C) => C.target.select(),
            onBlur: x,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(sn, { children: "列数" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          it,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: f,
            onChange: (C) => m(C.target.value),
            onFocus: (C) => C.target.select(),
            onBlur: w,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(Ct, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Ce, { variant: "outline", size: "base", className: "flex-1", onClick: y, children: "取消" }),
          /* @__PURE__ */ d.jsx(Ce, { variant: "primary", size: "base", className: "flex-1", onClick: b, children: "保存" })
        ] })
      ]
    }
  );
}
const Sl = Ie("flex flex-col relative", {
  variants: {
    variant: {
      base: "border border-neutral-2 bg-white-100",
      plain: ""
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-md",
      base: "rounded-lg"
    }
  },
  defaultVariants: {
    variant: "base",
    radius: "none"
  }
});
function El({ children: e, className: t, onDoubleClick: n }) {
  const o = i.useRef(null), [r, s] = i.useState(!1);
  return i.useEffect(() => {
    o.current && s(o.current.scrollWidth > o.current.clientWidth);
  }, [e]), r ? /* @__PURE__ */ d.jsxs(co, { children: [
    /* @__PURE__ */ d.jsx(uo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        ref: o,
        className: t,
        onDoubleClick: n,
        children: e
      }
    ) }),
    /* @__PURE__ */ d.jsx(fo, { side: "top", size: "base", children: /* @__PURE__ */ d.jsx("p", { children: e }) })
  ] }) : /* @__PURE__ */ d.jsx(
    "span",
    {
      ref: o,
      className: t,
      onDoubleClick: n,
      children: e
    }
  );
}
function _g({ cellId: e, value: t, columnId: n, currentColumnType: o, editView: r, setEditView: s, hideColumnView: a, setHideColumnView: l, dimensionView: c, setDimensionView: u, onDoubleClickTitle: f }) {
  const p = vo(), g = go(), h = fn(), { close: v, isOpen: m } = i.useContext(ze), { isFirstDataColumn: x, firstDataColumnId: w } = Rg(n), b = n ? h.columnMap?.get(n) : void 0;
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      El,
      {
        className: "truncate cursor-pointer flex-1",
        onDoubleClick: f,
        children: String(t)
      }
    ),
    /* @__PURE__ */ d.jsx(Rr, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      Ce,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-chevron-down",
        className: oe(
          "transition-opacity",
          m ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        ),
        onClick: (y) => {
          y.stopPropagation(), p.selectedColumnId === n && g.selectColumn(null), p.lockedCellId && g.lockCell(null);
        },
        onDoubleClick: (y) => y.stopPropagation()
      }
    ) }),
    /* @__PURE__ */ d.jsx(Pr, { align: "end", alignOffset: -8, sideOffset: 8, className: "w-[200px]", children: /* @__PURE__ */ d.jsxs("div", { onClick: (y) => y.stopPropagation(), onDoubleClick: (y) => y.stopPropagation(), onMouseDown: (y) => y.stopPropagation(), children: [
      !r && !a && !c && /* @__PURE__ */ d.jsx(
        Pg,
        {
          columnId: n,
          isFirstDataColumn: x,
          groupColumnId: p.groupColumnId,
          readOnly: p.readOnly,
          onEdit: () => s(!0),
          onHideManager: () => l(!0),
          onDimension: () => u(!0)
        }
      ),
      r && /* @__PURE__ */ d.jsx(
        Ag,
        {
          columnId: n,
          value: t,
          currentColumnType: o,
          currentColumnDef: b,
          onClose: v
        }
      ),
      a && /* @__PURE__ */ d.jsx(Og, { firstDataColumnId: w }),
      c && /* @__PURE__ */ d.jsx(jg, {})
    ] }) })
  ] });
}
function Dg({ cellId: e, value: t, columnId: n }) {
  const o = fn(), [r, s] = i.useState(!1), [a, l] = i.useState(!1), [c, u] = i.useState(!1), [f, p] = i.useState(!1), g = i.useContext(kl), h = n ? o.columnMap?.get(n)?.type ?? "text" : "text", v = (x) => {
    p(x), x && (s(!1), l(!1), u(!1)), g && (g.current = x);
  }, m = () => {
    g && (g.current = !0), p(!0), s(!0);
  };
  return /* @__PURE__ */ d.jsx(kr, { open: f, onOpenChange: v, children: /* @__PURE__ */ d.jsx(
    _g,
    {
      cellId: e,
      value: t,
      columnId: n,
      currentColumnType: h,
      editView: r,
      setEditView: s,
      hideColumnView: a,
      setHideColumnView: l,
      dimensionView: c,
      setDimensionView: u,
      onDoubleClickTitle: m
    }
  ) });
}
function Mg({ cellId: e, type: t, value: n, rowId: o, isHeader: r, columnId: s, rowIndex: a, cellOptions: l, isCellHovering: c }) {
  const u = vo(), f = go(), p = fn(), g = i.useContext(Ar), [h, v] = i.useState(!1);
  if (r && t === "checkbox") {
    const E = h || u.selectAll;
    return /* @__PURE__ */ d.jsx(
      "div",
      {
        className: "flex items-center justify-center w-full h-full",
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1),
        children: E ? /* @__PURE__ */ d.jsx(
          Wo,
          {
            checked: u.selectAll,
            onChange: () => f.toggleSelectAll()
          }
        ) : /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-25", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-vcell-logo" }) })
      }
    );
  }
  if (r)
    return /* @__PURE__ */ d.jsx(Dg, { cellId: e, value: n, columnId: s });
  if (t === "checkbox") {
    const E = o ? u.selectedRows.has(o) : !1, P = c || E;
    return /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-center w-full h-full", children: P ? /* @__PURE__ */ d.jsx(
      Wo,
      {
        checked: E,
        onChange: () => {
          o && f.toggleRowSelect(o);
        }
      }
    ) : /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-25", children: a ?? 1 }) });
  }
  const m = g[t || "text"] || xl, x = s ? p.columnMap?.get(s) : void 0, w = l ? { ...x?.options, ...l } : x?.options, b = u.lockedCellId === e, C = (o ? p.rows.find((E) => E.id === o) : void 0)?.cells.find((E) => E.id === e);
  return /* @__PURE__ */ d.jsx(
    m,
    {
      value: n,
      cellId: e,
      rowId: o,
      columnId: s,
      onChange: (E) => f.updateCellValue(e, E),
      isEditing: u.editingCellId === e,
      isLocked: b,
      isCellHovering: c,
      readOnly: u.readOnly,
      onStartEdit: () => f.startEdit(e, String(n)),
      onLockCell: () => f.lockCell(e),
      options: w,
      cellData: C,
      editingValue: u.editingValue,
      onUpdateEditingValue: f.updateEditingValue,
      onFinishEdit: f.finishEdit,
      onCancelEdit: f.cancelEdit,
      onUpdateColumnOptions: (E) => f.updateColumnOptions(s, E)
    }
  );
}
const $o = i.memo(function({ row: t, isHeader: n, isLastRow: o, columnIds: r, rowIndex: s, onCellResizeStart: a, onCellHoverEdge: l, onHeaderCellClick: c, onHeaderCellMouseDown: u, draggingColumnId: f, onCellHover: p, hoveringCellId: g, onBodyCellClick: h, frozenOffsets: v = {}, frozenWidth: m = 0, rowWidth: x, style: w, groupColumnId: b, hasOverflow: y }) {
  const C = vo(), E = fn(), P = go(), S = !n && C.selectedRows.has(t.id), R = x ?? t.cells.reduce((j, A, _) => {
    const X = r?.[_] ?? A.id, H = E.columns[_], Q = A.width === "auto" ? 40 : A.width ?? (H?.width === "auto" ? 40 : H?.width ?? 80), ee = C.columnWidths[X] ?? Q;
    return j + ee;
  }, 0);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "row",
      "data-slot-id": t.id,
      className: oe(
        "flex border-b border-neutral-2",
        S && "bg-brand-1"
      ),
      style: w ?? { minWidth: `${R}px`, width: n && !C.readOnly ? "100%" : `${R}px` },
      children: [
        t.cells.map((j, A) => {
          const _ = r?.[A] ?? j.id, X = E.columns[A], H = j.type ?? X?.type ?? "text", Q = j.width ?? X?.width ?? 80, ee = Q === "auto" ? 40 : Q, L = C.columnWidths[_] ?? ee, U = C.frozenColumns.has(_), W = v[_] ?? 0, K = U && W + L === m, $ = !n && C.editingCellId === j.id && H === "text", k = C.selectedColumnId === _, Y = !n && C.lockedCellId === j.id, re = !n && g === j.id, ne = n ? k ? "headerSelected" : "header" : $ ? "editing" : Y ? "locked" : S || k ? "selected" : re && !C.readOnly ? "defaultHover" : "default", q = n && k && !U && !f, ae = n && f && f === C.selectedColumnId;
          return /* @__PURE__ */ d.jsx(
            wt,
            {
              columnId: _,
              "data-cell-id": n ? void 0 : j.id,
              width: L,
              variant: ne,
              isLastCell: !1,
              resizable: n && H !== "checkbox",
              onResizeStart: a ? (O, Z) => a(_, O, Z) : void 0,
              onHoverEdge: l ? (O) => l(O ? _ : null) : void 0,
              onClick: n && H !== "checkbox" && c ? (O) => c(_, H, O) : !n && H !== "checkbox" && h ? (O) => h(j.id, O) : void 0,
              onMouseEnter: !n && p ? () => p(j.id) : void 0,
              onMouseLeave: !n && p ? () => p(null) : void 0,
              onMouseDown: n && H !== "checkbox" && !U && k && u ? (O) => u(_, O) : void 0,
              slotClassName: n && H === "text" ? "justify-between" : H === "checkbox" ? "justify-center" : void 0,
              className: oe(
                n && H === "text" && "group",
                U && "sticky",
                n && U && "z-20",
                n && U && "top-0",
                !n && U && "z-10",
                K && y && "shadow-[2px_0_4px_-2px_var(--black-10)]",
                // 光标
                q && "cursor-grab",
                ae && "cursor-grabbing",
                // 分组模式下分组列的表头顶部描边
                n && b && _ === b && "border-t-2 border-neutral-2",
                // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
                C.readOnly && A === t.cells.length - 1 && "!border-r-0"
              ),
              style: U ? { left: W } : void 0,
              children: /* @__PURE__ */ d.jsx(
                Mg,
                {
                  cellId: j.id,
                  type: H,
                  value: j.value,
                  rowId: n ? void 0 : t.id,
                  isHeader: n,
                  columnId: _,
                  rowIndex: s,
                  cellOptions: j.options,
                  isCellHovering: re
                }
              )
            },
            j.id
          );
        }),
        n && !C.readOnly && /* @__PURE__ */ d.jsx(
          wt,
          {
            variant: "header",
            isLastCell: !0,
            className: "flex-1 min-w-[40px] cursor-pointer",
            onClick: () => {
              const j = r[r.length - 1];
              j && P.insertColumnRight(j);
            },
            children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ d.jsx(Ce, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        )
      ]
    }
  );
}, (e, t) => e.row === t.row && e.isHeader === t.isHeader && e.columnIds === t.columnIds && e.rowIndex === t.rowIndex && e.hoveringCellId === t.hoveringCellId && e.draggingColumnId === t.draggingColumnId && e.onCellResizeStart === t.onCellResizeStart && e.onCellHoverEdge === t.onCellHoverEdge && e.onHeaderCellClick === t.onHeaderCellClick && e.onHeaderCellMouseDown === t.onHeaderCellMouseDown && e.onCellHover === t.onCellHover && e.onBodyCellClick === t.onBodyCellClick && e.frozenOffsets === t.frozenOffsets && e.frozenWidth === t.frozenWidth && e.rowWidth === t.rowWidth && e.groupColumnId === t.groupColumnId && e.hasOverflow === t.hasOverflow);
function $g({ groupValue: e, rowCount: t, frozenWidth: n, rowWidth: o, checkboxWidth: r, frozenNonCheckboxWidth: s, isCollapsed: a, isGroupSelected: l, onToggle: c, onGroupSelect: u, groupColumnId: f, isCheckboxHidden: p, hasOverflow: g }) {
  const { state: h, actions: v } = It(), m = `group-header-${e}`, x = h.editingCellId === m, [w, b] = i.useState(null), y = () => {
    h.editingValue !== e && v.updateGroupValues(e, h.editingValue, f), v.finishEdit();
  }, C = p ? s : n;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "group-header",
      "data-slot-id": `group-${e}`,
      className: "flex border-y border-neutral-2 mt-3 bg-white-100",
      style: { width: `${o}px` },
      children: [
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: oe(
              "sticky left-0 z-10 flex bg-white-100",
              g && "shadow-[2px_0_4px_-2px_var(--black-10)]"
            ),
            style: { width: `${C}px` },
            children: [
              !p && /* @__PURE__ */ d.jsx(
                wt,
                {
                  width: r,
                  isLastCell: !1,
                  variant: !h.readOnly && w === "checkbox" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("checkbox"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ d.jsx(Wo, { checked: l, onChange: u }) })
                }
              ),
              s > 0 && /* @__PURE__ */ d.jsx(
                wt,
                {
                  width: s,
                  isLastCell: !1,
                  variant: x ? "editing" : !h.readOnly && w === "title" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("title"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ d.jsxs("div", { className: "relative flex items-center justify-between w-full h-6", children: [
                    x ? /* @__PURE__ */ d.jsx(
                      "input",
                      {
                        type: "text",
                        value: h.editingValue,
                        onChange: (E) => v.updateEditingValue(E.target.value),
                        onBlur: y,
                        onKeyDown: (E) => {
                          E.key === "Enter" && y(), E.key === "Escape" && v.cancelEdit();
                        },
                        onFocus: (E) => E.target.select(),
                        className: "absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden",
                        autoFocus: !0
                      }
                    ) : /* @__PURE__ */ d.jsx(
                      El,
                      {
                        className: oe(
                          "text-sm truncate",
                          !h.readOnly && "cursor-pointer",
                          e ? "font-medium text-black-85" : "font-normal text-black-25"
                        ),
                        onDoubleClick: h.readOnly ? void 0 : () => v.startEdit(m, e),
                        children: e || "空值组"
                      }
                    ),
                    !x && /* @__PURE__ */ d.jsx(
                      Ce,
                      {
                        variant: "ghost",
                        size: "sm",
                        rightIcon: "icon-chevron-down",
                        onClick: c,
                        className: `text-black-55 [&>svg:last-child]:transition-transform ${a ? "[&>svg:last-child]:-rotate-90" : ""}`,
                        children: t
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ d.jsx(wt, { variant: "default", isLastCell: h.readOnly, className: "flex-1", children: "" })
      ]
    }
  );
}
function ks({ rowWidth: e, showBorder: t, isHovering: n, onHoverChange: o, onInsert: r, frozenWidth: s, checkboxWidth: a, isCheckboxHidden: l }) {
  const c = l ? s - a : s, u = i.useId();
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "insert-row",
      "data-slot-id": u,
      className: oe(
        "flex bg-white-100 cursor-pointer",
        t && "border-b border-neutral-2",
        n && "bg-neutral-1"
      ),
      style: { width: `${e}px` },
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      onClick: r,
      children: [
        /* @__PURE__ */ d.jsx(
          wt,
          {
            width: c,
            variant: "default",
            isLastCell: !0,
            className: "sticky left-0 z-10 bg-transparent cursor-pointer",
            children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ d.jsx(Ce, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        ),
        /* @__PURE__ */ d.jsx(wt, { variant: "default", isLastCell: !1, className: "flex-1 cursor-pointer bg-transparent", children: "" })
      ]
    }
  );
}
const Xg = i.forwardRef(function({ className: t, variant: n, radius: o, data: r, cellRenderers: s, readOnly: a, contained: l = !1, ...c }, u) {
  const f = l ? Sl({ variant: n, radius: o }) : "", p = l ? "plain" : n, g = l ? "none" : o, h = /* @__PURE__ */ d.jsx(Lg, { ref: u, className: t, variant: p, radius: g, ...c });
  return /* @__PURE__ */ d.jsx(kg, { data: r, cellRenderers: s, readOnly: a, children: /* @__PURE__ */ d.jsx(Th, { children: l ? /* @__PURE__ */ d.jsx("div", { className: oe("max-h-full min-h-0 overflow-auto overscroll-none w-fit max-w-full", f), children: h }) : h }) });
}), kl = i.createContext(null), Lg = i.forwardRef(function({
  className: t,
  variant: n,
  radius: o,
  slotId: r,
  ...s
}, a) {
  const { data: l, state: c, actions: u } = It(), f = i.useId();
  i.useImperativeHandle(a, () => ({
    undo: u.undo,
    redo: u.redo
  }), [u.undo, u.redo]);
  const [p, g] = i.useState(null), [h, v] = i.useState(null), [m, x] = i.useState(null), [w, b] = i.useState(null), [y, C] = i.useState(null), [E, P] = i.useState(0), [S, R] = i.useState(0), j = i.useRef(null), [A, _] = i.useState(null), [X, H] = i.useState(null), [Q, ee] = i.useState(null), [L, U] = i.useState(0), [W, K] = i.useState(!1), $ = i.useRef(0), k = i.useRef(null), Y = i.useRef(null), re = i.useRef(!1), ne = i.useRef(!1), q = l.columns.map((I) => I.id), ae = {
    id: "header",
    cells: l.columns.map((I) => ({
      id: I.id,
      type: I.type === "checkbox" ? "checkbox" : "text",
      // 表头始终用 text（除 checkbox）
      value: I.type === "checkbox" ? !1 : I.title ?? "",
      width: I.width
    }))
  }, O = q.reduce((I, T) => I + (c.columnWidths[T] ?? 80), 0), Z = q.reduce((I, T) => c.frozenColumns.has(T) ? I + (c.columnWidths[T] ?? 80) : I, 0), te = c.allColumns.find((I) => I.type === "checkbox")?.id, ue = te ? c.columnWidths[te] ?? 40 : 40, de = te ? c.hiddenColumns.has(te) : !0, me = q.reduce((I, T) => c.frozenColumns.has(T) && T !== te ? I + (c.columnWidths[T] ?? 80) : I, 0), ye = i.useMemo(() => {
    const I = {};
    let T = 0;
    return q.forEach((z) => {
      c.frozenColumns.has(z) && (I[z] = T, T += c.columnWidths[z] ?? 80);
    }), I;
  }, [q, c.frozenColumns, c.columnWidths]), pe = i.useMemo(() => {
    if (!c.groupColumnId) return null;
    const I = c.allColumns.findIndex((le) => le.id === c.groupColumnId);
    if (I === -1) return null;
    const T = [], z = /* @__PURE__ */ new Map(), fe = l.allRows ?? l.rows, se = /* @__PURE__ */ new Map();
    return l.rows.forEach((le) => se.set(le.id, le)), fe.forEach((le) => {
      const ge = String(le.cells[I]?.value ?? "");
      z.has(ge) || z.set(ge, []);
      const Ee = se.get(le.id);
      Ee && z.get(ge).push(Ee);
    }), z.forEach((le, ge) => {
      T.push({ groupValue: ge, rows: le });
    }), T.sort((le, ge) => !le.groupValue && ge.groupValue ? 1 : le.groupValue && !ge.groupValue ? -1 : 0), T;
  }, [c.groupColumnId, c.allColumns, l.allRows, l.rows]), Qe = i.useMemo(() => {
    const I = y || p;
    if (!I) return 0;
    let T = 0;
    for (const z of q) {
      const fe = c.columnWidths[z] ?? 80;
      if (z === I)
        return T + fe;
      T += fe;
    }
    return T;
  }, [y, p, q, c.columnWidths]), et = i.useMemo(() => {
    if (!X || !Q) return 0;
    let I = 0;
    for (const T of q) {
      const z = c.columnWidths[T] ?? 80;
      if (T === X)
        return Q === "left" ? I : I + z;
      I += z;
    }
    return I;
  }, [X, Q, q, c.columnWidths]), mt = A ? c.columnWidths[A] ?? 80 : 0, xo = (I, T, z) => {
    j.current && (clearTimeout(j.current), j.current = null), C(I), g(null), P(z), R(T);
  }, tt = i.useCallback((I) => {
    I ? (j.current && clearTimeout(j.current), j.current = setTimeout(() => {
      g(I), j.current = null;
    }, 200)) : (j.current && (clearTimeout(j.current), j.current = null), g(null));
  }, []);
  i.useEffect(() => {
    if (!y) return;
    const I = (z) => {
      const fe = z.clientX - E, se = Math.max(40, S + fe);
      u.updateColumnWidth(y, se);
    }, T = () => {
      C(null);
    };
    return document.addEventListener("mousemove", I), document.addEventListener("mouseup", T), () => {
      document.removeEventListener("mousemove", I), document.removeEventListener("mouseup", T);
    };
  }, [y, E, S, u]);
  const bo = i.useCallback((I, T, z) => {
    z.stopPropagation(), c.selectedColumnId !== I && u.selectColumn(I);
  }, [u, c.selectedColumnId]), Xt = i.useRef(null), wo = i.useCallback((I, T) => {
    if (c.selectedColumnId !== I || c.frozenColumns.has(I)) return;
    T.preventDefault(), T.stopPropagation(), $.current = T.clientX;
    const z = (le) => {
      if (Math.abs(le.clientX - $.current) >= 4) {
        se();
        const Ee = De.current?.getBoundingClientRect();
        if (Ee) {
          const Te = c.columnWidths[I] ?? 80;
          U(le.clientX - Ee.left - Te / 2);
        }
        _(I);
      }
    }, fe = () => {
      se();
    }, se = () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", fe), Xt.current = null;
    };
    Xt.current = se, document.addEventListener("mousemove", z), document.addEventListener("mouseup", fe);
  }, [c.selectedColumnId, c.frozenColumns]);
  i.useEffect(() => () => {
    Xt.current?.();
  }, []), i.useEffect(() => {
    if (!A) return;
    const I = c.columnWidths[A] ?? 80;
    k.current = null, Y.current = null, K(!0);
    const T = q.findIndex((se) => se === A), z = (se) => {
      const le = De.current?.getBoundingClientRect();
      if (!le) return;
      const ge = se.clientX - le.left;
      U(ge - I / 2);
      const Ee = se.clientX - le.left + (De.current?.scrollLeft ?? 0);
      let Te = 0, _e = null, gt = null;
      for (const nt of q) {
        const vt = c.columnWidths[nt] ?? 80, So = Te + vt / 2;
        if (Ee >= Te && Ee < Te + vt) {
          _e = nt, gt = Ee < So ? "left" : "right";
          break;
        }
        Te += vt;
      }
      (() => {
        if (!_e || c.frozenColumns.has(_e) || _e === A) return !1;
        if (T === -1) return !0;
        const nt = q.findIndex((vt) => vt === _e);
        return !(nt === T + 1 && gt === "left" || nt === T - 1 && gt === "right");
      })() ? (H(_e), ee(gt), k.current = _e, Y.current = gt) : (H(null), ee(null), k.current = null, Y.current = null);
    }, fe = () => {
      k.current && Y.current && k.current !== A && u.moveColumnOrder(A, k.current, Y.current), _(null), H(null), ee(null), K(!1), k.current = null, Y.current = null, re.current = !0;
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", fe), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", fe);
    };
  }, [A, q, c.columnWidths, c.frozenColumns, u]);
  const yo = i.useCallback(() => {
    if (re.current) {
      re.current = !1;
      return;
    }
    ne.current || (u.selectColumn(null), u.lockCell(null));
  }, [u]), pn = i.useCallback((I, T) => {
    c.readOnly || (T.stopPropagation(), T.target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) || u.lockCell(I);
  }, [u, c.readOnly]), At = i.useCallback(() => {
    if (!c.lockedCellId) return null;
    const I = c.groupColumnId ? pe?.flatMap((T) => c.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? l.rows : l.rows;
    for (let T = 0; T < I.length; T++) {
      const z = I[T];
      if (z) {
        for (let fe = 0; fe < z.cells.length; fe++)
          if (z.cells[fe]?.id === c.lockedCellId)
            return { rowIndex: T, colIndex: fe, rowId: z.id };
      }
    }
    return null;
  }, [c.lockedCellId, c.groupColumnId, c.collapsedGroups, pe, l.rows]), ht = i.useCallback((I) => {
    const T = At();
    if (!T) return;
    const z = c.groupColumnId ? pe?.flatMap((ge) => c.collapsedGroups.has(ge.groupValue) ? [] : ge.rows) ?? l.rows : l.rows;
    let fe = T.rowIndex, se = T.colIndex;
    if (I === "ArrowLeft" || I === "ArrowRight") {
      const ge = I === "ArrowLeft" ? -1 : 1, Ee = (z[T.rowIndex]?.cells.length ?? 1) - 1;
      let Te = T.colIndex + ge;
      for (; Te >= 0 && Te <= Ee; ) {
        const _e = z[T.rowIndex]?.cells[Te];
        if (_e && _e.type !== "checkbox") {
          se = Te;
          break;
        }
        Te += ge;
      }
    } else
      switch (I) {
        case "ArrowUp":
          fe = Math.max(0, T.rowIndex - 1);
          break;
        case "ArrowDown":
          fe = Math.min(z.length - 1, T.rowIndex + 1);
          break;
      }
    if (fe === T.rowIndex && se === T.colIndex) return;
    const le = z[fe]?.cells[se];
    le && le.type !== "checkbox" && u.lockCell(le.id);
  }, [At, c.groupColumnId, c.collapsedGroups, pe, l.rows, u]), qt = i.useCallback(() => {
    if (!c.lockedCellId) return null;
    const I = c.groupColumnId ? pe?.flatMap((T) => c.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? l.rows : l.rows;
    for (const T of I)
      for (let z = 0; z < T.cells.length; z++) {
        const fe = T.cells[z];
        if (fe?.id === c.lockedCellId)
          return fe.type ?? l.columns[z]?.type ?? "text";
      }
    return null;
  }, [c.lockedCellId, c.groupColumnId, c.collapsedGroups, pe, l.rows, l.columns]), mn = i.useCallback(() => {
    if (!c.lockedCellId) return "";
    const I = c.groupColumnId ? pe?.flatMap((T) => c.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? l.rows : l.rows;
    for (const T of I)
      for (const z of T.cells)
        if (z.id === c.lockedCellId)
          return String(z.value ?? "");
    return "";
  }, [c.lockedCellId, c.groupColumnId, c.collapsedGroups, pe, l.rows]);
  i.useEffect(() => {
    if (!c.lockedCellId) return;
    const I = (T) => {
      const z = document.activeElement, fe = z.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]');
      if (fe && T.key !== "Escape" && T.key !== "Enter")
        return;
      if (fe && T.key === "Enter" && qt() === "input") {
        T.preventDefault && T.preventDefault(), z.blur && z.blur();
        const ge = c.groupColumnId ? pe?.flatMap((Te) => c.collapsedGroups.has(Te.groupValue) ? [] : Te.rows) ?? l.rows : l.rows, Ee = At();
        Ee && Ee.rowIndex === ge.length - 1 ? u.lockCell(null) : ht("ArrowDown");
        return;
      }
      if (c.editingCellId) {
        if (T.key === "Enter") {
          T.preventDefault(), u.finishEdit();
          const le = c.groupColumnId ? pe?.flatMap((Ee) => c.collapsedGroups.has(Ee.groupValue) ? [] : Ee.rows) ?? l.rows : l.rows, ge = At();
          ge && ge.rowIndex === le.length - 1 ? u.lockCell(null) : ht("ArrowDown");
          return;
        }
        if (T.key === "Escape") {
          T.preventDefault(), u.cancelEdit();
          return;
        }
        return;
      }
      if (T.key === "Escape") {
        u.lockCell(null);
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(T.key)) {
        T.preventDefault(), ht(T.key);
        return;
      }
      if (T.key === "Tab") {
        T.preventDefault(), ht(T.shiftKey ? "ArrowLeft" : "ArrowRight");
        return;
      }
      const se = qt();
      if (se === "input" && !c.readOnly && (T.key === "Enter" || T.key.length === 1 && !T.ctrlKey && !T.metaKey)) {
        T.preventDefault();
        const le = document.querySelector(`[data-cell-id="${c.lockedCellId}"]`);
        if (le) {
          const ge = le.querySelector("input");
          ge && (ge.focus(), T.key.length === 1 && T.key !== "Enter" && setTimeout(() => {
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set?.call(ge, T.key), ge.dispatchEvent(new Event("input", { bubbles: !0 }));
          }, 0));
        }
        return;
      }
      if (T.key === "Enter" && !c.readOnly) {
        if (se === "text" || se === "editable" || se === "number") {
          const le = mn();
          u.startEdit(c.lockedCellId, le);
        }
        return;
      }
      if (T.key.length === 1 && !T.ctrlKey && !T.metaKey && !c.readOnly) {
        (se === "text" || se === "editable" || se === "number" && /^[\d\-.]$/.test(T.key)) && u.startEdit(c.lockedCellId, T.key);
        return;
      }
      if ((T.key === "Backspace" || T.key === "Delete") && !c.readOnly) {
        (se === "text" || se === "editable" || se === "number") && u.startEdit(c.lockedCellId, "");
        return;
      }
    };
    return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [c.lockedCellId, c.editingCellId, u, ht, qt, mn]);
  const Zt = i.useRef(!1);
  i.useEffect(() => {
    const I = (z) => {
      De.current?.contains(z.target) ?? !1 ? Zt.current = !0 : z.target.closest('button, a, input, select, textarea, [role="button"], [data-interactive]') && (Zt.current = !1);
    }, T = (z) => {
      if (!Zt.current || c.editingCellId || document.activeElement?.closest("input, textarea, select")) return;
      const se = z.metaKey || z.ctrlKey, le = z.key.toLowerCase();
      se && le === "z" && !z.shiftKey ? (z.preventDefault(), u.undo()) : se && le === "z" && z.shiftKey && (z.preventDefault(), u.redo());
    };
    return document.addEventListener("mousedown", I), document.addEventListener("keydown", T), () => {
      document.removeEventListener("mousedown", I), document.removeEventListener("keydown", T);
    };
  }, [c.editingCellId, u]);
  const De = i.useRef(null), [hn, Co] = i.useState(0), [Ot, gn] = i.useState(!1);
  return i.useEffect(() => {
    const I = De.current?.parentElement;
    if (!I) return;
    const T = () => Co(I.scrollLeft);
    return I.addEventListener("scroll", T), T(), () => I.removeEventListener("scroll", T);
  }, []), i.useEffect(() => {
    const I = De.current, T = I?.parentElement;
    if (!I || !T) return;
    const z = new ResizeObserver(() => {
      gn(I.scrollWidth > T.clientWidth);
    });
    return z.observe(I), z.observe(T), gn(I.scrollWidth > T.clientWidth), () => z.disconnect();
  }, []), i.useEffect(() => {
    if (!c.selectedColumnId && !c.lockedCellId) return;
    let I = !1;
    const T = (fe) => {
      if (ne.current) return;
      I = De.current?.contains(fe.target) ?? !1, fe.target.closest('[data-slot="popover-content"], [data-slot="tooltip-content"]') && (I = !0);
    }, z = () => {
      if (!ne.current) {
        if (I) {
          I = !1;
          return;
        }
        u.selectColumn(null), u.lockCell(null), I = !1;
      }
    };
    return document.addEventListener("pointerdown", T), document.addEventListener("pointerup", z), () => {
      document.removeEventListener("pointerdown", T), document.removeEventListener("pointerup", z);
    };
  }, [c.selectedColumnId, c.lockedCellId, u]), /* @__PURE__ */ d.jsx(kl.Provider, { value: ne, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: De,
      "data-slot": "data-table",
      "data-slot-id": r ?? f,
      "data-resizing": y || A ? "true" : void 0,
      className: oe(
        Sl({ variant: n, radius: o }),
        c.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
        t
      ),
      onClick: yo,
      ...s,
      children: [
        /* @__PURE__ */ d.jsx("div", { className: "sticky top-0 z-20", children: /* @__PURE__ */ d.jsx("div", { className: "relative", children: /* @__PURE__ */ d.jsx(
          $o,
          {
            row: ae,
            isHeader: !0,
            columnIds: q,
            onCellResizeStart: xo,
            onCellHoverEdge: tt,
            onHeaderCellClick: bo,
            onHeaderCellMouseDown: wo,
            draggingColumnId: A,
            frozenOffsets: ye,
            frozenWidth: Z,
            rowWidth: O,
            groupColumnId: c.groupColumnId ?? void 0,
            hasOverflow: Ot
          }
        ) }) }),
        /* @__PURE__ */ d.jsx("div", { className: pe || c.readOnly ? "pb-3" : void 0, children: pe ? (
          // 分组渲染（每组序号独立计算）
          pe.map((I, T) => {
            const z = c.collapsedGroups.has(I.groupValue), fe = I.rows.every((se) => c.selectedRows.has(se.id));
            return /* @__PURE__ */ d.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ d.jsx(
                $g,
                {
                  groupValue: I.groupValue,
                  rowCount: I.rows.length,
                  frozenWidth: Z,
                  rowWidth: O,
                  checkboxWidth: ue,
                  frozenNonCheckboxWidth: me,
                  isCollapsed: z,
                  isGroupSelected: fe,
                  onToggle: () => u.toggleGroupCollapse(I.groupValue),
                  onGroupSelect: () => u.toggleGroupSelect(I.groupValue, I.rows),
                  groupColumnId: c.groupColumnId,
                  isCheckboxHidden: de,
                  hasOverflow: Ot
                }
              ),
              !z && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                I.rows.map((se, le) => /* @__PURE__ */ d.jsx(
                  $o,
                  {
                    row: se,
                    columnIds: q,
                    rowIndex: le + 1,
                    isLastRow: le === I.rows.length - 1 && T === pe.length - 1,
                    hoveringCellId: h,
                    onCellHover: v,
                    onBodyCellClick: pn,
                    frozenOffsets: ye,
                    frozenWidth: Z,
                    rowWidth: O,
                    hasOverflow: Ot
                  },
                  se.id
                )),
                !c.readOnly && /* @__PURE__ */ d.jsx(
                  ks,
                  {
                    rowWidth: O,
                    showBorder: !0,
                    isHovering: m?.groupValue === I.groupValue,
                    onHoverChange: (se) => x(se ? { groupValue: I.groupValue, cell: "add" } : null),
                    onInsert: () => c.groupColumnId && u.insertRowInGroup(I.groupValue, c.groupColumnId),
                    frozenWidth: Z,
                    checkboxWidth: ue,
                    isCheckboxHidden: de
                  }
                )
              ] })
            ] }, I.groupValue);
          })
        ) : (
          // 普通渲染
          /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            l.rows.map((I, T) => /* @__PURE__ */ d.jsx(
              $o,
              {
                row: I,
                columnIds: q,
                rowIndex: T + 1,
                isLastRow: !1,
                hoveringCellId: h,
                onCellHover: v,
                onBodyCellClick: pn,
                frozenOffsets: ye,
                frozenWidth: Z,
                rowWidth: O,
                hasOverflow: Ot
              },
              I.id
            )),
            !c.readOnly && /* @__PURE__ */ d.jsx(
              ks,
              {
                rowWidth: O,
                showBorder: !1,
                isHovering: w !== null,
                onHoverChange: (I) => b(I ? "add" : null),
                onInsert: () => u.insertRow(),
                frozenWidth: Z,
                checkboxWidth: ue,
                isCheckboxHidden: de
              }
            )
          ] })
        ) }),
        (p || y) && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${c.frozenColumns.has(p || y || "") ? Qe + hn : Qe}px`
            }
          }
        ),
        A && X && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${c.frozenColumns.has(X) ? et + hn : et}px`
            }
          }
        ),
        A && W && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none",
            style: {
              left: `${L}px`,
              width: `${mt}px`
            }
          }
        )
      ]
    }
  ) });
});
export {
  Ce as Button,
  wt as Cell,
  Ug as CellSlot,
  Wo as Checkbox,
  Xg as DataTable,
  it as Input,
  Gg as NavigationItem,
  om as Select,
  sm as SelectContent,
  im as SelectItem,
  rm as SelectTrigger,
  am as SelectValue,
  Kg as Table,
  Wg as Tabs,
  Bg as TabsContent,
  Gn as TabsContext,
  Vg as TabsList,
  Hg as TabsTrigger,
  Ec as buttonVariants,
  Ku as cellVariants,
  Yu as checkboxVariants,
  oe as cn,
  Sl as dataTableVariants,
  Pc as inputVariants,
  lm as navigationItemVariants,
  nm as selectTriggerVariants,
  li as slotVariants,
  cm as tableVariants,
  Bu as tabsListVariants,
  Uu as tabsTriggerVariants
};
//# sourceMappingURL=index.js.map
