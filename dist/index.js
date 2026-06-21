import * as l from "react";
import Xe, { useLayoutEffect as pl, useState as ml } from "react";
import * as Dt from "react-dom";
import hl from "react-dom";
function fs(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = fs(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function ps() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = fs(e)) && (o && (o += " "), o += t);
  return o;
}
const gl = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    n[o] = e[o];
  for (let o = 0; o < t.length; o++)
    n[e.length + o] = t[o];
  return n;
}, vl = (e, t) => ({
  classGroupId: e,
  validator: t
}), ms = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), Cn = "-", xr = [], xl = "arbitrary..", bl = (e) => {
  const t = yl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (s) => {
      if (s.startsWith("[") && s.endsWith("]"))
        return wl(s);
      const a = s.split(Cn), c = a[0] === "" && a.length > 1 ? 1 : 0;
      return hs(a, c, t);
    },
    getConflictingClassGroupIds: (s, a) => {
      if (a) {
        const c = o[s], d = n[s];
        return c ? d ? gl(d, c) : c : d || xr;
      }
      return n[s] || xr;
    }
  };
}, hs = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const r = e[t], i = n.nextPart.get(r);
  if (i) {
    const d = hs(e, t + 1, i);
    if (d) return d;
  }
  const s = n.validators;
  if (s === null)
    return;
  const a = t === 0 ? e.join(Cn) : e.slice(t).join(Cn), c = s.length;
  for (let d = 0; d < c; d++) {
    const f = s[d];
    if (f.validator(a))
      return f.classGroupId;
  }
}, wl = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), o = t.slice(0, n);
  return o ? xl + o : void 0;
})(), yl = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Cl(n, t);
}, Cl = (e, t) => {
  const n = ms();
  for (const o in e) {
    const r = e[o];
    Wo(r, n, o, t);
  }
  return n;
}, Wo = (e, t, n, o) => {
  const r = e.length;
  for (let i = 0; i < r; i++) {
    const s = e[i];
    Sl(s, t, n, o);
  }
}, Sl = (e, t, n, o) => {
  if (typeof e == "string") {
    El(e, t, n);
    return;
  }
  if (typeof e == "function") {
    kl(e, t, n, o);
    return;
  }
  Rl(e, t, n, o);
}, El = (e, t, n) => {
  const o = e === "" ? t : gs(t, e);
  o.classGroupId = n;
}, kl = (e, t, n, o) => {
  if (Pl(e)) {
    Wo(e(o), t, n, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(vl(n, e));
}, Rl = (e, t, n, o) => {
  const r = Object.entries(e), i = r.length;
  for (let s = 0; s < i; s++) {
    const [a, c] = r[s];
    Wo(c, gs(t, a), n, o);
  }
}, gs = (e, t) => {
  let n = e;
  const o = t.split(Cn), r = o.length;
  for (let i = 0; i < r; i++) {
    const s = o[i];
    let a = n.nextPart.get(s);
    a || (a = ms(), n.nextPart.set(s, a)), n = a;
  }
  return n;
}, Pl = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Nl = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const r = (i, s) => {
    n[i] = s, t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let s = n[i];
      if (s !== void 0)
        return s;
      if ((s = o[i]) !== void 0)
        return r(i, s), s;
    },
    set(i, s) {
      i in n ? n[i] = s : r(i, s);
    }
  };
}, Eo = "!", br = ":", Tl = [], wr = (e, t, n, o, r) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: o,
  isExternal: r
}), Al = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const i = [];
    let s = 0, a = 0, c = 0, d;
    const f = r.length;
    for (let m = 0; m < f; m++) {
      const x = r[m];
      if (s === 0 && a === 0) {
        if (x === br) {
          i.push(r.slice(c, m)), c = m + 1;
          continue;
        }
        if (x === "/") {
          d = m;
          continue;
        }
      }
      x === "[" ? s++ : x === "]" ? s-- : x === "(" ? a++ : x === ")" && a--;
    }
    const p = i.length === 0 ? r : r.slice(c);
    let g = p, h = !1;
    p.endsWith(Eo) ? (g = p.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Eo) && (g = p.slice(1), h = !0)
    );
    const v = d && d > c ? d - c : void 0;
    return wr(i, h, g, v);
  };
  if (t) {
    const r = t + br, i = o;
    o = (s) => s.startsWith(r) ? i(s.slice(r.length)) : wr(Tl, !1, s, void 0, !0);
  }
  if (n) {
    const r = o;
    o = (i) => n({
      className: i,
      parseClassName: r
    });
  }
  return o;
}, Ol = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, o) => {
    t.set(n, 1e6 + o);
  }), (n) => {
    const o = [];
    let r = [];
    for (let i = 0; i < n.length; i++) {
      const s = n[i], a = s[0] === "[", c = t.has(s);
      a || c ? (r.length > 0 && (r.sort(), o.push(...r), r = []), o.push(s)) : r.push(s);
    }
    return r.length > 0 && (r.sort(), o.push(...r)), o;
  };
}, Il = (e) => ({
  cache: Nl(e.cacheSize),
  parseClassName: Al(e),
  sortModifiers: Ol(e),
  postfixLookupClassGroupIds: jl(e),
  ...bl(e)
}), jl = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let o = 0; o < n.length; o++)
      t[n[o]] = !0;
  return t;
}, _l = /\s+/, Dl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: i,
    postfixLookupClassGroupIds: s
  } = t, a = [], c = e.trim().split(_l);
  let d = "";
  for (let f = c.length - 1; f >= 0; f -= 1) {
    const p = c[f], {
      isExternal: g,
      modifiers: h,
      hasImportantModifier: v,
      baseClassName: m,
      maybePostfixModifierPosition: x
    } = n(p);
    if (g) {
      d = p + (d.length > 0 ? " " + d : d);
      continue;
    }
    let w = !!x, b;
    if (w) {
      const S = m.substring(0, x);
      b = o(S);
      const E = b && s[b] ? o(m) : void 0;
      E && E !== b && (b = E, w = !1);
    } else
      b = o(m);
    if (!b) {
      if (!w) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (b = o(m), !b) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      w = !1;
    }
    const y = h.length === 0 ? "" : h.length === 1 ? h[0] : i(h).join(":"), C = v ? y + Eo : y, R = C + b;
    if (a.indexOf(R) > -1)
      continue;
    a.push(R);
    const N = r(b, w);
    for (let S = 0; S < N.length; ++S) {
      const E = N[S];
      a.push(C + E);
    }
    d = p + (d.length > 0 ? " " + d : d);
  }
  return d;
}, Ml = (...e) => {
  let t = 0, n, o, r = "";
  for (; t < e.length; )
    (n = e[t++]) && (o = vs(n)) && (r && (r += " "), r += o);
  return r;
}, vs = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = vs(e[o])) && (n && (n += " "), n += t);
  return n;
}, $l = (e, ...t) => {
  let n, o, r, i;
  const s = (c) => {
    const d = t.reduce((f, p) => p(f), e());
    return n = Il(d), o = n.cache.get, r = n.cache.set, i = a, a(c);
  }, a = (c) => {
    const d = o(c);
    if (d)
      return d;
    const f = Dl(c, n);
    return r(c, f), f;
  };
  return i = s, (...c) => i(Ml(...c));
}, Ll = [], Se = (e) => {
  const t = (n) => n[e] || Ll;
  return t.isThemeGetter = !0, t;
}, xs = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, bs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, zl = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Fl = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Wl = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Vl = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Hl = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Bl = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ke = (e) => zl.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), _e = (e) => !!e && Number.isInteger(Number(e)), co = (e) => e.endsWith("%") && le(e.slice(0, -1)), We = (e) => Fl.test(e), ws = () => !0, Ul = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Wl.test(e) && !Vl.test(e)
), Vo = () => !1, Gl = (e) => Hl.test(e), Yl = (e) => Bl.test(e), Kl = (e) => !V(e) && !B(e), Xl = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), ql = (e) => et(e, Ss, Vo), V = (e) => xs.test(e), lt = (e) => et(e, Es, Ul), yr = (e) => et(e, rc, le), Zl = (e) => et(e, Rs, ws), Jl = (e) => et(e, ks, Vo), Cr = (e) => et(e, ys, Vo), Ql = (e) => et(e, Cs, Yl), rn = (e) => et(e, Ps, Gl), B = (e) => bs.test(e), Vt = (e) => xt(e, Es), ec = (e) => xt(e, ks), Sr = (e) => xt(e, ys), tc = (e) => xt(e, Ss), nc = (e) => xt(e, Cs), sn = (e) => xt(e, Ps, !0), oc = (e) => xt(e, Rs, !0), et = (e, t, n) => {
  const o = xs.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, xt = (e, t, n = !1) => {
  const o = bs.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, ys = (e) => e === "position" || e === "percentage", Cs = (e) => e === "image" || e === "url", Ss = (e) => e === "length" || e === "size" || e === "bg-size", Es = (e) => e === "length", rc = (e) => e === "number", ks = (e) => e === "family-name", Rs = (e) => e === "number" || e === "weight", Ps = (e) => e === "shadow", sc = () => {
  const e = Se("color"), t = Se("font"), n = Se("text"), o = Se("font-weight"), r = Se("tracking"), i = Se("leading"), s = Se("breakpoint"), a = Se("container"), c = Se("spacing"), d = Se("radius"), f = Se("shadow"), p = Se("inset-shadow"), g = Se("text-shadow"), h = Se("drop-shadow"), v = Se("blur"), m = Se("perspective"), x = Se("aspect"), w = Se("ease"), b = Se("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
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
  ], R = () => [...C(), B, V], N = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], E = () => [B, V, c], L = () => [Ke, "full", "auto", ...E()], _ = () => [_e, "none", "subgrid", B, V], D = () => ["auto", {
    span: ["full", _e, B, V]
  }, _e, B, V], K = () => [_e, "auto", B, V], F = () => ["auto", "min", "max", "fr", B, V], Z = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], J = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...E()], Y = () => [Ke, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], H = () => [Ke, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...E()], Q = () => [Ke, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...E()], $ = () => [e, B, V], P = () => [...C(), Sr, Cr, {
    position: [B, V]
  }], X = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", tc, ql, {
    size: [B, V]
  }], ie = () => [co, Vt, lt], re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    B,
    V
  ], ae = () => ["", le, Vt, lt], j = () => ["solid", "dashed", "dotted", "double"], ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ee = () => [le, co, Sr, Cr], ue = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    B,
    V
  ], ce = () => ["none", le, B, V], se = () => ["none", le, B, V], be = () => [le, B, V], ye = () => [Ke, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [We],
      breakpoint: [We],
      color: [ws],
      container: [We],
      "drop-shadow": [We],
      ease: ["in", "out", "in-out"],
      font: [Kl],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [We],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [We],
      shadow: [We],
      spacing: ["px", le],
      text: [We],
      "text-shadow": [We],
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
        aspect: ["auto", "square", Ke, V, B, x]
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
      "container-named": [Xl],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [le, V, B, a]
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
        object: R()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
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
        inset: L()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": L()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": L()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": L(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: L()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": L(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: L()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": L()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": L()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: L()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: L()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: L()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: L()
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
        z: [_e, "auto", B, V]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ke, "full", "auto", a, ...E()]
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
        flex: [le, Ke, "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, B, V]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, B, V]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [_e, "first", "last", "none", B, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": _()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: D()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": K()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": K()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": _()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: D()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": K()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": K()
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
        "auto-cols": F()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": F()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Z(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...J(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...J()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Z()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...J(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...J(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Z()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...J(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...J()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: E()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: E()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: W()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: W()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: W()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: W()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: W()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: W()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: W()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: W()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: W()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: W()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: W()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": E()
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
        "space-y": E()
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
        size: Y()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...H()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...H()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...H()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...Q()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Q()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Q()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...Y()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Y()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [s]
          },
          ...Y()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Y()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Y()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...Y()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Vt, lt]
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
        font: [o, oc, Zl]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", co, V]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ec, Jl, t]
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
        "line-clamp": [le, "none", B, yr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...E()
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
        decoration: [...j(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [le, "from-font", "auto", B, lt]
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
        "underline-offset": [le, "auto", B, V]
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
        indent: E()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [_e, B, V]
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
        bg: P()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: X()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: q()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, _e, B, V],
          radial: ["", B, V],
          conic: [_e, B, V]
        }, nc, Ql]
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
        from: ie()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ie()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ie()
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
        rounded: re()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": re()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": re()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": re()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": re()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": re()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": re()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": re()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": re()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": re()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": re()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": re()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": re()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": re()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": re()
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
        border: [...j(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...j(), "hidden", "none"]
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
        outline: [...j(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [le, B, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Vt, lt]
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
          sn,
          rn
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
        "inset-shadow": ["none", p, sn, rn]
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
        "ring-offset": [le, lt]
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
        "text-shadow": ["none", g, sn, rn]
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
        opacity: [le, B, V]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ne(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ne()
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
        "mask-linear": [le]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ee()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ee()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": $()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": $()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ee()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ee()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": $()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": $()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ee()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ee()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": $()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": $()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ee()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ee()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": $()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": $()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ee()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ee()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": $()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": $()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ee()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ee()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": $()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": $()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ee()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ee()
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
        "mask-radial-from": ee()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ee()
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
        "mask-conic": [le]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ee()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ee()
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
        mask: P()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: X()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: q()
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
        brightness: [le, B, V]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, B, V]
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
          sn,
          rn
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
        grayscale: ["", le, B, V]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, B, V]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, B, V]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, B, V]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, B, V]
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
        "backdrop-brightness": [le, B, V]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, B, V]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, B, V]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, B, V]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, B, V]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, B, V]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, B, V]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, B, V]
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
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
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
        duration: [le, "initial", B, V]
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
        delay: [le, B, V]
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
        "perspective-origin": R()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ce()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ce()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ce()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ce()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: se()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": se()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": se()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": se()
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
        skew: be()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": be()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": be()
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
        origin: R()
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
        translate: ye()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ye()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ye()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ye()
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
        zoom: [_e, B, V]
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
        "scroll-m": E()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": E()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": E()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
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
        stroke: [le, Vt, lt, yr]
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
}, ic = /* @__PURE__ */ $l(sc);
function oe(...e) {
  return ic(ps(e));
}
var an = { exports: {} }, Ht = {};
var Er;
function ac() {
  if (Er) return Ht;
  Er = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), r.key !== void 0 && (s = "" + r.key), "key" in r) {
      i = {};
      for (var a in r)
        a !== "key" && (i[a] = r[a]);
    } else i = r;
    return r = i.ref, {
      $$typeof: e,
      type: o,
      key: s,
      ref: r !== void 0 ? r : null,
      props: i
    };
  }
  return Ht.Fragment = t, Ht.jsx = n, Ht.jsxs = n, Ht;
}
var Bt = {};
var kr;
function lc() {
  return kr || (kr = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(P) {
      if (P == null) return null;
      if (typeof P == "function")
        return P.$$typeof === D ? null : P.displayName || P.name || null;
      if (typeof P == "string") return P;
      switch (P) {
        case x:
          return "Fragment";
        case b:
          return "Profiler";
        case w:
          return "StrictMode";
        case N:
          return "Suspense";
        case S:
          return "SuspenseList";
        case _:
          return "Activity";
      }
      if (typeof P == "object")
        switch (typeof P.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), P.$$typeof) {
          case m:
            return "Portal";
          case C:
            return P.displayName || "Context";
          case y:
            return (P._context.displayName || "Context") + ".Consumer";
          case R:
            var X = P.render;
            return P = P.displayName, P || (P = X.displayName || X.name || "", P = P !== "" ? "ForwardRef(" + P + ")" : "ForwardRef"), P;
          case E:
            return X = P.displayName || null, X !== null ? X : e(P.type) || "Memo";
          case L:
            X = P._payload, P = P._init;
            try {
              return e(P(X));
            } catch {
            }
        }
      return null;
    }
    function t(P) {
      return "" + P;
    }
    function n(P) {
      try {
        t(P);
        var X = !1;
      } catch {
        X = !0;
      }
      if (X) {
        X = console;
        var q = X.error, ie = typeof Symbol == "function" && Symbol.toStringTag && P[Symbol.toStringTag] || P.constructor.name || "Object";
        return q.call(
          X,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ie
        ), t(P);
      }
    }
    function o(P) {
      if (P === x) return "<>";
      if (typeof P == "object" && P !== null && P.$$typeof === L)
        return "<...>";
      try {
        var X = e(P);
        return X ? "<" + X + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var P = K.A;
      return P === null ? null : P.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function s(P) {
      if (F.call(P, "key")) {
        var X = Object.getOwnPropertyDescriptor(P, "key").get;
        if (X && X.isReactWarning) return !1;
      }
      return P.key !== void 0;
    }
    function a(P, X) {
      function q() {
        W || (W = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          X
        ));
      }
      q.isReactWarning = !0, Object.defineProperty(P, "key", {
        get: q,
        configurable: !0
      });
    }
    function c() {
      var P = e(this.type);
      return Y[P] || (Y[P] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), P = this.props.ref, P !== void 0 ? P : null;
    }
    function d(P, X, q, ie, re, ae) {
      var j = q.ref;
      return P = {
        $$typeof: v,
        type: P,
        key: X,
        props: q,
        _owner: ie
      }, (j !== void 0 ? j : null) !== null ? Object.defineProperty(P, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(P, "ref", { enumerable: !1, value: null }), P._store = {}, Object.defineProperty(P._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(P, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(P, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: re
      }), Object.defineProperty(P, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ae
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    }
    function f(P, X, q, ie, re, ae) {
      var j = X.children;
      if (j !== void 0)
        if (ie)
          if (Z(j)) {
            for (ie = 0; ie < j.length; ie++)
              p(j[ie]);
            Object.freeze && Object.freeze(j);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(j);
      if (F.call(X, "key")) {
        j = e(P);
        var ne = Object.keys(X).filter(function(ue) {
          return ue !== "key";
        });
        ie = 0 < ne.length ? "{key: someKey, " + ne.join(": ..., ") + ": ...}" : "{key: someKey}", $[j + ie] || (ne = 0 < ne.length ? "{" + ne.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ie,
          j,
          ne,
          j
        ), $[j + ie] = !0);
      }
      if (j = null, q !== void 0 && (n(q), j = "" + q), s(X) && (n(X.key), j = "" + X.key), "key" in X) {
        q = {};
        for (var ee in X)
          ee !== "key" && (q[ee] = X[ee]);
      } else q = X;
      return j && a(
        q,
        typeof P == "function" ? P.displayName || P.name || "Unknown" : P
      ), d(
        P,
        j,
        q,
        r(),
        re,
        ae
      );
    }
    function p(P) {
      g(P) ? P._store && (P._store.validated = 1) : typeof P == "object" && P !== null && P.$$typeof === L && (P._payload.status === "fulfilled" ? g(P._payload.value) && P._payload.value._store && (P._payload.value._store.validated = 1) : P._store && (P._store.validated = 1));
    }
    function g(P) {
      return typeof P == "object" && P !== null && P.$$typeof === v;
    }
    var h = Xe, v = /* @__PURE__ */ Symbol.for("react.transitional.element"), m = /* @__PURE__ */ Symbol.for("react.portal"), x = /* @__PURE__ */ Symbol.for("react.fragment"), w = /* @__PURE__ */ Symbol.for("react.strict_mode"), b = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.consumer"), C = /* @__PURE__ */ Symbol.for("react.context"), R = /* @__PURE__ */ Symbol.for("react.forward_ref"), N = /* @__PURE__ */ Symbol.for("react.suspense"), S = /* @__PURE__ */ Symbol.for("react.suspense_list"), E = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), D = /* @__PURE__ */ Symbol.for("react.client.reference"), K = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = Object.prototype.hasOwnProperty, Z = Array.isArray, J = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(P) {
        return P();
      }
    };
    var W, Y = {}, H = h.react_stack_bottom_frame.bind(
      h,
      i
    )(), Q = J(o(i)), $ = {};
    Bt.Fragment = x, Bt.jsx = function(P, X, q) {
      var ie = 1e4 > K.recentlyCreatedOwnerStacks++;
      return f(
        P,
        X,
        q,
        !1,
        ie ? Error("react-stack-top-frame") : H,
        ie ? J(o(P)) : Q
      );
    }, Bt.jsxs = function(P, X, q) {
      var ie = 1e4 > K.recentlyCreatedOwnerStacks++;
      return f(
        P,
        X,
        q,
        !0,
        ie ? Error("react-stack-top-frame") : H,
        ie ? J(o(P)) : Q
      );
    };
  })()), Bt;
}
var Rr;
function cc() {
  return Rr || (Rr = 1, process.env.NODE_ENV === "production" ? an.exports = ac() : an.exports = lc()), an.exports;
}
var u = cc();
const Pr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Nr = ps, ke = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Nr(e, n?.class, n?.className);
  const { variants: r, defaultVariants: i } = t, s = Object.keys(r).map((d) => {
    const f = n?.[d], p = i?.[d];
    if (f === null) return null;
    const g = Pr(f) || Pr(p);
    return r[d][g];
  }), a = n && Object.entries(n).reduce((d, f) => {
    let [p, g] = f;
    return g === void 0 || (d[p] = g), d;
  }, {}), c = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((d, f) => {
    let { class: p, className: g, ...h } = f;
    return Object.entries(h).every((v) => {
      let [m, x] = v;
      return Array.isArray(x) ? x.includes({
        ...i,
        ...a
      }[m]) : {
        ...i,
        ...a
      }[m] === x;
    }) ? [
      ...d,
      p,
      g
    ] : d;
  }, []);
  return Nr(e, s, c, n?.class, n?.className);
}, uc = ke(
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
function xe({
  className: e,
  variant: t,
  size: n,
  noShift: o,
  disabled: r,
  leftIcon: i,
  rightIcon: s,
  children: a,
  slotId: c,
  ...d
}) {
  const f = l.useId();
  return /* @__PURE__ */ u.jsxs(
    "button",
    {
      "data-slot": "button",
      "data-slot-id": c ?? f,
      disabled: r,
      className: oe(uc({ variant: t, size: n, noShift: o, disabled: r, className: e })),
      ...d,
      children: [
        i && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${i}` }) }),
        a,
        s && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${s}` }) })
      ]
    }
  );
}
const dc = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, fc = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, pc = ke(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: dc,
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
), mc = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" }
};
function Ze({ className: e, variant: t, size: n, noSpinner: o, disabled: r, leftIcon: i, rightIcon: s, slotId: a, ...c }) {
  const d = r || t === "disabled", p = mc[n ?? "base"], g = l.useId();
  return !i && !s ? /* @__PURE__ */ u.jsx(
    "input",
    {
      "data-slot": "input",
      "data-slot-id": a ?? g,
      disabled: d,
      className: oe(
        pc({ variant: t, size: n, noSpinner: o }),
        d && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
        e
      ),
      ...c
    }
  ) : /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "input",
      "data-slot-id": a ?? g,
      className: oe(
        "flex items-center border bg-white-100 outline-none transition-all",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        fc[t ?? "basic"],
        t === "disabled" && "cursor-not-allowed",
        e
      ),
      children: [
        i && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${i}` }) }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            disabled: d,
            className: oe(
              "w-full bg-transparent outline-none text-black-85 placeholder:text-black-25",
              p.text,
              t === "disabled" && "text-neutral-3 placeholder:text-neutral-3 cursor-not-allowed"
            ),
            ...c
          }
        ),
        s && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${s}` }) })
      ]
    }
  );
}
function uo(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function hc(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = l.createContext(s);
    a.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || a, x = l.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || a, v = l.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => l.createContext(s));
    return function(a) {
      const c = a?.[e] || i;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return r.scopeName = e, [o, gc(r, ...t)];
}
function gc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((a, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...a, ...p };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Pt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Ns(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = l.createContext(s);
    a.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || a, x = l.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || a, v = l.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => l.createContext(s));
    return function(a) {
      const c = a?.[e] || i;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return r.scopeName = e, [o, vc(r, ...t)];
}
function vc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((a, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...a, ...p };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Tr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function xc(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Tr(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Tr(e[r], null);
        }
      };
  };
}
function Sn(...e) {
  return l.useCallback(xc(...e), e);
}
// @__NO_SIDE_EFFECTS__
function ko(e) {
  const t = l.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, a = !1;
    const c = [];
    Ar(r) && typeof ln == "function" && (r = ln(r._payload)), l.Children.forEach(r, (g) => {
      if (Sc(g)) {
        a = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        Ar(v) && typeof ln == "function" && (v = ln(v._payload)), s = wc(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = l.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !a && l.Children.count(r) === 1 && l.isValidElement(r) && (s = r)
    );
    const d = s ? Cc(s) : void 0, f = Sn(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          a ? Pc(e) : Rc(e)
        );
      return r;
    }
    const p = yc(i, s.props ?? {});
    return s.type !== l.Fragment && (p.ref = o ? f : d), l.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var bc = /* @__PURE__ */ Symbol.for("radix.slottable"), wc = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return l.isValidElement(n) ? l.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return l.isValidElement(t) ? t : null;
};
function yc(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const c = i(...a);
      return r(...a), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Cc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Sc(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === bc;
}
var Ec = /* @__PURE__ */ Symbol.for("react.lazy");
function Ar(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Ec && "_payload" in e && kc(e._payload);
}
function kc(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Rc = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Pc = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, ln = l[" use ".trim().toString()];
function Nc(e) {
  const t = e + "CollectionProvider", [n, o] = Ns(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: x, children: w } = m, b = l.useRef(null), y = l.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: y, collectionRef: b, children: w });
  };
  s.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ ko(a), d = l.forwardRef(
    (m, x) => {
      const { scope: w, children: b } = m, y = i(a, w), C = Sn(x, y.collectionRef);
      return /* @__PURE__ */ u.jsx(c, { ref: C, children: b });
    }
  );
  d.displayName = a;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ ko(f), h = l.forwardRef(
    (m, x) => {
      const { scope: w, children: b, ...y } = m, C = l.useRef(null), R = Sn(x, C), N = i(f, w);
      return l.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => {
        N.itemMap.delete(C);
      })), /* @__PURE__ */ u.jsx(g, { [p]: "", ref: R, children: b });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = i(e + "CollectionConsumer", m);
    return l.useCallback(() => {
      const b = x.collectionRef.current;
      if (!b) return [];
      const y = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (N, S) => y.indexOf(N.ref.current) - y.indexOf(S.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: h },
    v,
    o
  ];
}
var Ts = globalThis?.document ? l.useLayoutEffect : () => {
}, Tc = l[" useId ".trim().toString()] || (() => {
}), Ac = 0;
function Oc(e) {
  const [t, n] = l.useState(Tc());
  return Ts(() => {
    n((o) => o ?? String(Ac++));
  }, [e]), t ? `radix-${t}` : "";
}
var Ic = [
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
], As = Ic.reduce((e, t) => {
  const n = /* @__PURE__ */ ko(`Primitive.${t}`), o = l.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function jc(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => ((...n) => t.current?.(...n)), []);
}
var _c = l[" useInsertionEffect ".trim().toString()] || Ts;
function Dc({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = Mc({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : r;
  {
    const f = l.useRef(e !== void 0);
    l.useEffect(() => {
      const p = f.current;
      p !== a && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = a;
    }, [a, o]);
  }
  const d = l.useCallback(
    (f) => {
      if (a) {
        const p = $c(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [a, e, i, s]
  );
  return [c, d];
}
function Mc({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = l.useState(e), r = l.useRef(n), i = l.useRef(t);
  return _c(() => {
    i.current = t;
  }, [t]), l.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function $c(e) {
  return typeof e == "function";
}
var Lc = l.createContext(void 0);
function zc(e) {
  const t = l.useContext(Lc);
  return e || t || "ltr";
}
var fo = "rovingFocusGroup.onEntryFocus", Fc = { bubbles: !1, cancelable: !0 }, Xt = "RovingFocusGroup", [Ro, Os, Wc] = Nc(Xt), [Vc, Is] = Ns(
  Xt,
  [Wc]
), [Hc, Bc] = Vc(Xt), js = l.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(Ro.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(Ro.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(Uc, { ...e, ref: t }) }) })
);
js.displayName = Xt;
var Uc = l.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: i,
    currentTabStopId: s,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: c,
    onEntryFocus: d,
    preventScrollOnEntryFocus: f = !1,
    ...p
  } = e, g = l.useRef(null), h = Sn(t, g), v = zc(i), [m, x] = Dc({
    prop: s,
    defaultProp: a ?? null,
    onChange: c,
    caller: Xt
  }), [w, b] = l.useState(!1), y = jc(d), C = Os(n), R = l.useRef(!1), [N, S] = l.useState(0);
  return l.useEffect(() => {
    const E = g.current;
    if (E)
      return E.addEventListener(fo, y), () => E.removeEventListener(fo, y);
  }, [y]), /* @__PURE__ */ u.jsx(
    Hc,
    {
      scope: n,
      orientation: o,
      dir: v,
      loop: r,
      currentTabStopId: m,
      onItemFocus: l.useCallback(
        (E) => x(E),
        [x]
      ),
      onItemShiftTab: l.useCallback(() => b(!0), []),
      onFocusableItemAdd: l.useCallback(
        () => S((E) => E + 1),
        []
      ),
      onFocusableItemRemove: l.useCallback(
        () => S((E) => E - 1),
        []
      ),
      children: /* @__PURE__ */ u.jsx(
        As.div,
        {
          tabIndex: w || N === 0 ? -1 : 0,
          "data-orientation": o,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: Pt(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: Pt(e.onFocus, (E) => {
            const L = !R.current;
            if (E.target === E.currentTarget && L && !w) {
              const _ = new CustomEvent(fo, Fc);
              if (E.currentTarget.dispatchEvent(_), !_.defaultPrevented) {
                const D = C().filter((W) => W.focusable), K = D.find((W) => W.active), F = D.find((W) => W.id === m), J = [K, F, ...D].filter(
                  Boolean
                ).map((W) => W.ref.current);
                Ms(J, f);
              }
            }
            R.current = !1;
          }),
          onBlur: Pt(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), _s = "RovingFocusGroupItem", Ds = l.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: i,
      children: s,
      ...a
    } = e, c = Oc(), d = i || c, f = Bc(_s, n), p = f.currentTabStopId === d, g = Os(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: m } = f;
    return l.useEffect(() => {
      if (o)
        return h(), () => v();
    }, [o, h, v]), /* @__PURE__ */ u.jsx(
      Ro.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ u.jsx(
          As.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": f.orientation,
            ...a,
            ref: t,
            onMouseDown: Pt(e.onMouseDown, (x) => {
              o ? f.onItemFocus(d) : x.preventDefault();
            }),
            onFocus: Pt(e.onFocus, () => f.onItemFocus(d)),
            onKeyDown: Pt(e.onKeyDown, (x) => {
              if (x.key === "Tab" && x.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (x.target !== x.currentTarget) return;
              const w = Kc(x, f.orientation, f.dir);
              if (w !== void 0) {
                if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
                x.preventDefault();
                let y = g().filter((C) => C.focusable).map((C) => C.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const C = y.indexOf(x.currentTarget);
                  y = f.loop ? Xc(y, C + 1) : y.slice(C + 1);
                }
                setTimeout(() => Ms(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: p, hasTabStop: m != null }) : s
          }
        )
      }
    );
  }
);
Ds.displayName = _s;
var Gc = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Yc(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Kc(e, t, n) {
  const o = Yc(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return Gc[o];
}
function Ms(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Xc(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var qc = js, Zc = Ds, En = globalThis?.document ? l.useLayoutEffect : () => {
};
function Jc(e, t) {
  return l.useReducer((n, o) => t[n][o] ?? n, e);
}
var $s = (e) => {
  const { present: t, children: n } = e, o = Qc(t), r = typeof n == "function" ? n({ present: o.isPresent }) : l.Children.only(n), i = eu(o.ref, tu(r));
  return typeof n == "function" || o.isPresent ? l.cloneElement(r, { ref: i }) : null;
};
$s.displayName = "Presence";
function Qc(e) {
  const [t, n] = l.useState(), o = l.useRef(null), r = l.useRef(e), i = l.useRef("none"), s = e ? "mounted" : "unmounted", [a, c] = Jc(s, {
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
  return l.useEffect(() => {
    const d = cn(o.current);
    i.current = a === "mounted" ? d : "none";
  }, [a]), En(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = cn(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), En(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = cn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (i.current = cn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: l.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Or(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function eu(...e) {
  const t = l.useRef(e);
  return t.current = e, l.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const i = o.map((s) => {
      const a = Or(s, n);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const a = i[s];
          typeof a == "function" ? a() : Or(o[s], null);
        }
      };
  }, []);
}
function cn(e) {
  return e?.animationName || "none";
}
function tu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Ir(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function nu(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Ir(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Ir(e[r], null);
        }
      };
  };
}
function ou(...e) {
  return l.useCallback(nu(...e), e);
}
// @__NO_SIDE_EFFECTS__
function ru(e) {
  const t = l.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, a = !1;
    const c = [];
    jr(r) && typeof un == "function" && (r = un(r._payload)), l.Children.forEach(r, (g) => {
      if (cu(g)) {
        a = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        jr(v) && typeof un == "function" && (v = un(v._payload)), s = iu(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = l.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !a && l.Children.count(r) === 1 && l.isValidElement(r) && (s = r)
    );
    const d = s ? lu(s) : void 0, f = ou(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          a ? pu(e) : fu(e)
        );
      return r;
    }
    const p = au(i, s.props ?? {});
    return s.type !== l.Fragment && (p.ref = o ? f : d), l.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var su = /* @__PURE__ */ Symbol.for("radix.slottable"), iu = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return l.isValidElement(n) ? l.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return l.isValidElement(t) ? t : null;
};
function au(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const c = i(...a);
      return r(...a), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function lu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function cu(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === su;
}
var uu = /* @__PURE__ */ Symbol.for("react.lazy");
function jr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === uu && "_payload" in e && du(e._payload);
}
function du(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var fu = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, pu = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, un = l[" use ".trim().toString()], mu = [
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
], In = mu.reduce((e, t) => {
  const n = /* @__PURE__ */ ru(`Primitive.${t}`), o = l.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), hu = l.createContext(void 0);
function gu(e) {
  const t = l.useContext(hu);
  return e || t || "ltr";
}
var vu = l[" useInsertionEffect ".trim().toString()] || En;
function xu({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = bu({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : r;
  {
    const f = l.useRef(e !== void 0);
    l.useEffect(() => {
      const p = f.current;
      p !== a && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = a;
    }, [a, o]);
  }
  const d = l.useCallback(
    (f) => {
      if (a) {
        const p = wu(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [a, e, i, s]
  );
  return [c, d];
}
function bu({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = l.useState(e), r = l.useRef(n), i = l.useRef(t);
  return vu(() => {
    i.current = t;
  }, [t]), l.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function wu(e) {
  return typeof e == "function";
}
var yu = l[" useId ".trim().toString()] || (() => {
}), Cu = 0;
function Su(e) {
  const [t, n] = l.useState(yu());
  return En(() => {
    n((o) => o ?? String(Cu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var jn = "Tabs", [Eu] = hc(jn, [
  Is
]), Ls = Is(), [ku, Ho] = Eu(jn), zs = l.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: o,
      onValueChange: r,
      defaultValue: i,
      orientation: s = "horizontal",
      dir: a,
      activationMode: c = "automatic",
      ...d
    } = e, f = gu(a), [p, g] = xu({
      prop: o,
      onChange: r,
      defaultProp: i ?? "",
      caller: jn
    });
    return /* @__PURE__ */ u.jsx(
      ku,
      {
        scope: n,
        baseId: Su(),
        value: p,
        onValueChange: g,
        orientation: s,
        dir: f,
        activationMode: c,
        children: /* @__PURE__ */ u.jsx(
          In.div,
          {
            dir: f,
            "data-orientation": s,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
zs.displayName = jn;
var Fs = "TabsList", Ws = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e, i = Ho(Fs, n), s = Ls(n);
    return /* @__PURE__ */ u.jsx(
      qc,
      {
        asChild: !0,
        ...s,
        orientation: i.orientation,
        dir: i.dir,
        loop: o,
        children: /* @__PURE__ */ u.jsx(
          In.div,
          {
            role: "tablist",
            "aria-orientation": i.orientation,
            ...r,
            ref: t
          }
        )
      }
    );
  }
);
Ws.displayName = Fs;
var Vs = "TabsTrigger", Hs = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...i } = e, s = Ho(Vs, n), a = Ls(n), c = Gs(s.baseId, o), d = Ys(s.baseId, o), f = o === s.value;
    return /* @__PURE__ */ u.jsx(
      Zc,
      {
        asChild: !0,
        ...a,
        focusable: !r,
        active: f,
        children: /* @__PURE__ */ u.jsx(
          In.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": f,
            "aria-controls": d,
            "data-state": f ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: c,
            ...i,
            ref: t,
            onMouseDown: uo(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? s.onValueChange(o) : p.preventDefault();
            }),
            onKeyDown: uo(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && s.onValueChange(o);
            }),
            onFocus: uo(e.onFocus, () => {
              const p = s.activationMode !== "manual";
              !f && !r && p && s.onValueChange(o);
            })
          }
        )
      }
    );
  }
);
Hs.displayName = Vs;
var Bs = "TabsContent", Us = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: i, ...s } = e, a = Ho(Bs, n), c = Gs(a.baseId, o), d = Ys(a.baseId, o), f = o === a.value, p = l.useRef(f);
    return l.useEffect(() => {
      const g = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(g);
    }, []), /* @__PURE__ */ u.jsx($s, { present: r || f, children: ({ present: g }) => /* @__PURE__ */ u.jsx(
      In.div,
      {
        "data-state": f ? "active" : "inactive",
        "data-orientation": a.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !g,
        id: d,
        tabIndex: 0,
        ...s,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: g && i
      }
    ) });
  }
);
Us.displayName = Bs;
function Gs(e, t) {
  return `${e}-trigger-${t}`;
}
function Ys(e, t) {
  return `${e}-content-${t}`;
}
var Ru = zs, Pu = Ws, Nu = Hs, Tu = Us;
const _n = l.createContext({ size: "base" });
function Pg({ className: e, size: t = "base", children: n, slotId: o, ...r }) {
  const i = l.useId();
  return /* @__PURE__ */ u.jsx(_n.Provider, { value: { size: t }, children: /* @__PURE__ */ u.jsx(Ru, { "data-slot": "tabs", "data-slot-id": o ?? i, className: oe(e), ...r, children: n }) });
}
const Au = ke(
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
function Ng({ className: e, variant: t, slotId: n, ...o }) {
  const { size: r } = l.useContext(_n), i = l.useId();
  return /* @__PURE__ */ u.jsx(
    Pu,
    {
      "data-slot": "tabs-list",
      "data-slot-id": n ?? i,
      className: oe(Au({ variant: t, size: r }), e),
      ...o
    }
  );
}
const Ou = ke(
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
function Tg({ className: e, variant: t, disabled: n, ...o }) {
  const { size: r } = l.useContext(_n);
  return /* @__PURE__ */ u.jsx(
    Nu,
    {
      "data-slot": "tabs-trigger",
      "data-slot-id": o.value,
      disabled: n,
      className: oe(Ou({ variant: t, size: r, disabled: n }), e),
      ...o
    }
  );
}
const Iu = ke(
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
function Ag({ className: e, slotId: t, ...n }) {
  const { size: o } = l.useContext(_n), r = l.useId();
  return /* @__PURE__ */ u.jsx(
    Tu,
    {
      "data-slot": "tabs-content",
      "data-slot-id": t ?? r,
      className: oe(Iu({ size: o }), e),
      ...n
    }
  );
}
const ju = ke(
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
), Ks = ke(
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
), ut = l.memo(function({ className: t, variant: n, width: o, columnId: r, children: i, isLastCell: s, resizable: a, onResizeStart: c, onHoverEdge: d, slotClassName: f, style: p, ...g }) {
  const h = l.useId(), v = l.useCallback((y) => {
    y.preventDefault(), y.stopPropagation(), c && c(o ?? 80, y.clientX);
  }, [c, o]), m = l.useCallback(() => {
    d?.(!0);
  }, [d]), x = l.useCallback(() => {
    d?.(!1);
  }, [d]), w = a && !s, b = l.useMemo(() => ({
    ...p,
    ...o ? { width: `${o}px`, minWidth: `${o}px` } : {}
  }), [p, o]);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "cell",
      "data-slot-id": r ?? h,
      className: oe(
        ju({ variant: n, className: t }),
        !s && "border-r border-neutral-2"
      ),
      style: b,
      ...g,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: oe(Ks({ size: "base" }), f), children: i ?? /* @__PURE__ */ u.jsx("span", { className: "text-black-85", children: "文本单元格" }) }),
        w && /* @__PURE__ */ u.jsx(
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
}), Og = l.memo(function({
  className: t,
  size: n,
  children: o,
  slotId: r,
  ...i
}) {
  const s = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "cell-slot",
      "data-slot-id": r ?? s,
      className: oe(Ks({ size: n, className: t })),
      ...i,
      children: o
    }
  );
}), _u = ke(
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
), Du = ke("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]"
    }
  },
  defaultVariants: { size: "base" }
}), Mu = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2"
};
function Po({
  className: e,
  checked: t = !1,
  disabled: n = !1,
  size: o = "base",
  onChange: r,
  children: i,
  slotId: s,
  ...a
}) {
  const c = n, d = l.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "checkbox",
      "data-slot-id": s ?? d,
      role: "checkbox",
      "aria-checked": t,
      tabIndex: c ? void 0 : 0,
      className: oe(
        "flex items-center",
        Mu[o ?? "base"],
        !c && "cursor-pointer",
        c && "cursor-not-allowed",
        e
      ),
      onClick: () => !c && r?.(!t),
      ...a,
      children: [
        /* @__PURE__ */ u.jsx(
          "div",
          {
            className: oe(
              _u({
                checked: t ?? !1,
                disabled: n ?? !1,
                size: o ?? "base"
              })
            ),
            children: t && /* @__PURE__ */ u.jsx(
              "svg",
              {
                "aria-hidden": "true",
                className: oe(
                  Du({ size: o }),
                  c ? "text-black-25" : "text-white-100"
                ),
                style: { fill: "currentColor" },
                children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-check-sm" })
              }
            )
          }
        ),
        i
      ]
    }
  );
}
function _r(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function pe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function $u(e, t) {
  const n = l.createContext(t), o = (i) => {
    const { children: s, ...a } = i, c = l.useMemo(() => a, Object.values(a));
    return /* @__PURE__ */ u.jsx(n.Provider, { value: c, children: s });
  };
  o.displayName = e + "Provider";
  function r(i) {
    const s = l.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [o, r];
}
function qt(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = l.createContext(s), c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || a, x = l.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || a, v = l.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => l.createContext(s));
    return function(a) {
      const c = a?.[e] || i;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return r.scopeName = e, [o, Lu(r, ...t)];
}
function Lu(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((a, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...a, ...p };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Dr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Xs(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Dr(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Dr(e[r], null);
        }
      };
  };
}
function we(...e) {
  return l.useCallback(Xs(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  const t = /* @__PURE__ */ zu(e), n = l.forwardRef((o, r) => {
    const { children: i, ...s } = o, a = l.Children.toArray(i), c = a.find(Wu);
    if (c) {
      const d = c.props.children, f = a.map((p) => p === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : p);
      return /* @__PURE__ */ u.jsx(t, { ...s, ref: r, children: l.isValidElement(d) ? l.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function zu(e) {
  const t = l.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (l.isValidElement(r)) {
      const s = Hu(r), a = Vu(i, r.props);
      return r.type !== l.Fragment && (a.ref = o ? Xs(o, s) : s), l.cloneElement(r, a);
    }
    return l.Children.count(r) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Fu = /* @__PURE__ */ Symbol("radix.slottable");
function Wu(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Fu;
}
function Vu(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const c = i(...a);
      return r(...a), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Hu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Bu(e) {
  const t = e + "CollectionProvider", [n, o] = qt(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: x, children: w } = m, b = Xe.useRef(null), y = Xe.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: y, collectionRef: b, children: w });
  };
  s.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ Ot(a), d = Xe.forwardRef(
    (m, x) => {
      const { scope: w, children: b } = m, y = i(a, w), C = we(x, y.collectionRef);
      return /* @__PURE__ */ u.jsx(c, { ref: C, children: b });
    }
  );
  d.displayName = a;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ Ot(f), h = Xe.forwardRef(
    (m, x) => {
      const { scope: w, children: b, ...y } = m, C = Xe.useRef(null), R = we(x, C), N = i(f, w);
      return Xe.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => {
        N.itemMap.delete(C);
      })), /* @__PURE__ */ u.jsx(g, { [p]: "", ref: R, children: b });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = i(e + "CollectionConsumer", m);
    return Xe.useCallback(() => {
      const b = x.collectionRef.current;
      if (!b) return [];
      const y = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (N, S) => y.indexOf(N.ref.current) - y.indexOf(S.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: h },
    v,
    o
  ];
}
var Uu = l.createContext(void 0);
function Gu(e) {
  const t = l.useContext(Uu);
  return e || t || "ltr";
}
var Yu = [
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
], ge = Yu.reduce((e, t) => {
  const n = /* @__PURE__ */ Ot(`Primitive.${t}`), o = l.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Ku(e, t) {
  e && Dt.flushSync(() => e.dispatchEvent(t));
}
function pt(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => (...n) => t.current?.(...n), []);
}
function Xu(e, t = globalThis?.document) {
  const n = pt(e);
  l.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var qu = "DismissableLayer", No = "dismissableLayer.update", Zu = "dismissableLayer.pointerDownOutside", Ju = "dismissableLayer.focusOutside", Mr, qs = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Dn = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: a,
      ...c
    } = e, d = l.useContext(qs), [f, p] = l.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = l.useState({}), v = we(t, (S) => p(S)), m = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), w = m.indexOf(x), b = f ? m.indexOf(f) : -1, y = d.layersWithOutsidePointerEventsDisabled.size > 0, C = b >= w, R = td((S) => {
      const E = S.target, L = [...d.branches].some((_) => _.contains(E));
      !C || L || (r?.(S), s?.(S), S.defaultPrevented || a?.());
    }, g), N = nd((S) => {
      const E = S.target;
      [...d.branches].some((_) => _.contains(E)) || (i?.(S), s?.(S), S.defaultPrevented || a?.());
    }, g);
    return Xu((S) => {
      b === d.layers.size - 1 && (o?.(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, g), l.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Mr = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), $r(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (g.body.style.pointerEvents = Mr);
        };
    }, [f, g, n, d]), l.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), $r());
    }, [f, d]), l.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(No, S), () => document.removeEventListener(No, S);
    }, []), /* @__PURE__ */ u.jsx(
      ge.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: pe(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: pe(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: pe(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
Dn.displayName = qu;
var Qu = "DismissableLayerBranch", ed = l.forwardRef((e, t) => {
  const n = l.useContext(qs), o = l.useRef(null), r = we(t, o);
  return l.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(ge.div, { ...e, ref: r });
});
ed.displayName = Qu;
function td(e, t = globalThis?.document) {
  const n = pt(e), o = l.useRef(!1), r = l.useRef(() => {
  });
  return l.useEffect(() => {
    const i = (a) => {
      if (a.target && !o.current) {
        let c = function() {
          Zs(
            Zu,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function nd(e, t = globalThis?.document) {
  const n = pt(e), o = l.useRef(!1);
  return l.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && Zs(Ju, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function $r() {
  const e = new CustomEvent(No);
  document.dispatchEvent(e);
}
function Zs(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Ku(r, i) : r.dispatchEvent(i);
}
var po = 0;
function Bo() {
  l.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Lr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Lr()), po++, () => {
      po === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), po--;
    };
  }, []);
}
function Lr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var mo = "focusScope.autoFocusOnMount", ho = "focusScope.autoFocusOnUnmount", zr = { bubbles: !1, cancelable: !0 }, od = "FocusScope", Mn = l.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: i,
    ...s
  } = e, [a, c] = l.useState(null), d = pt(r), f = pt(i), p = l.useRef(null), g = we(t, (m) => c(m)), h = l.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  l.useEffect(() => {
    if (o) {
      let m = function(y) {
        if (h.paused || !a) return;
        const C = y.target;
        a.contains(C) ? p.current = C : qe(p.current, { select: !0 });
      }, x = function(y) {
        if (h.paused || !a) return;
        const C = y.relatedTarget;
        C !== null && (a.contains(C) || qe(p.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const R of y)
            R.removedNodes.length > 0 && qe(a);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", x);
      const b = new MutationObserver(w);
      return a && b.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", x), b.disconnect();
      };
    }
  }, [o, a, h.paused]), l.useEffect(() => {
    if (a) {
      Wr.add(h);
      const m = document.activeElement;
      if (!a.contains(m)) {
        const w = new CustomEvent(mo, zr);
        a.addEventListener(mo, d), a.dispatchEvent(w), w.defaultPrevented || (rd(cd(Js(a)), { select: !0 }), document.activeElement === m && qe(a));
      }
      return () => {
        a.removeEventListener(mo, d), setTimeout(() => {
          const w = new CustomEvent(ho, zr);
          a.addEventListener(ho, f), a.dispatchEvent(w), w.defaultPrevented || qe(m ?? document.body, { select: !0 }), a.removeEventListener(ho, f), Wr.remove(h);
        }, 0);
      };
    }
  }, [a, d, f, h]);
  const v = l.useCallback(
    (m) => {
      if (!n && !o || h.paused) return;
      const x = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, w = document.activeElement;
      if (x && w) {
        const b = m.currentTarget, [y, C] = sd(b);
        y && C ? !m.shiftKey && w === C ? (m.preventDefault(), n && qe(y, { select: !0 })) : m.shiftKey && w === y && (m.preventDefault(), n && qe(C, { select: !0 })) : w === b && m.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ u.jsx(ge.div, { tabIndex: -1, ...s, ref: g, onKeyDown: v });
});
Mn.displayName = od;
function rd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (qe(o, { select: t }), document.activeElement !== n) return;
}
function sd(e) {
  const t = Js(e), n = Fr(t, e), o = Fr(t.reverse(), e);
  return [n, o];
}
function Js(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Fr(e, t) {
  for (const n of e)
    if (!id(n, { upTo: t })) return n;
}
function id(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ad(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function qe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ad(e) && t && e.select();
  }
}
var Wr = ld();
function ld() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Vr(e, t), e.unshift(t);
    },
    remove(t) {
      e = Vr(e, t), e[0]?.resume();
    }
  };
}
function Vr(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function cd(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ee = globalThis?.document ? l.useLayoutEffect : () => {
}, ud = l[" useId ".trim().toString()] || (() => {
}), dd = 0;
function dt(e) {
  const [t, n] = l.useState(ud());
  return Ee(() => {
    n((o) => o ?? String(dd++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const fd = ["top", "right", "bottom", "left"], Je = Math.min, Pe = Math.max, kn = Math.round, dn = Math.floor, $e = (e) => ({
  x: e,
  y: e
}), pd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function To(e, t, n) {
  return Pe(e, Je(t, n));
}
function Be(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ue(e) {
  return e.split("-")[0];
}
function Mt(e) {
  return e.split("-")[1];
}
function Uo(e) {
  return e === "x" ? "y" : "x";
}
function Go(e) {
  return e === "y" ? "height" : "width";
}
function Me(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Yo(e) {
  return Uo(Me(e));
}
function md(e, t, n) {
  n === void 0 && (n = !1);
  const o = Mt(e), r = Yo(e), i = Go(r);
  let s = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = Rn(s)), [s, Rn(s)];
}
function hd(e) {
  const t = Rn(e);
  return [Ao(e), t, Ao(t)];
}
function Ao(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Hr = ["left", "right"], Br = ["right", "left"], gd = ["top", "bottom"], vd = ["bottom", "top"];
function xd(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Br : Hr : t ? Hr : Br;
    case "left":
    case "right":
      return t ? gd : vd;
    default:
      return [];
  }
}
function bd(e, t, n, o) {
  const r = Mt(e);
  let i = xd(Ue(e), n === "start", o);
  return r && (i = i.map((s) => s + "-" + r), t && (i = i.concat(i.map(Ao)))), i;
}
function Rn(e) {
  const t = Ue(e);
  return pd[t] + e.slice(t.length);
}
function wd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Qs(e) {
  return typeof e != "number" ? wd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Pn(e) {
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
function Ur(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = Me(t), s = Yo(t), a = Go(s), c = Ue(t), d = i === "y", f = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, g = o[a] / 2 - r[a] / 2;
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
  switch (Mt(t)) {
    case "start":
      h[s] -= g * (n && d ? -1 : 1);
      break;
    case "end":
      h[s] += g * (n && d ? -1 : 1);
      break;
  }
  return h;
}
async function yd(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: s,
    elements: a,
    strategy: c
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: g = !1,
    padding: h = 0
  } = Be(t, e), v = Qs(h), x = a[g ? p === "floating" ? "reference" : "floating" : p], w = Pn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(x))) == null || n ? x : x.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: d,
    rootBoundary: f,
    strategy: c
  })), b = p === "floating" ? {
    x: o,
    y: r,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), C = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = Pn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: y,
    strategy: c
  }) : b);
  return {
    top: (w.top - R.top + v.top) / C.y,
    bottom: (R.bottom - w.bottom + v.bottom) / C.y,
    left: (w.left - R.left + v.left) / C.x,
    right: (R.right - w.right + v.right) / C.x
  };
}
const Cd = 50, Sd = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: s
  } = n, a = s.detectOverflow ? s : {
    ...s,
    detectOverflow: yd
  }, c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: p
  } = Ur(d, o, c), g = o, h = 0;
  const v = {};
  for (let m = 0; m < i.length; m++) {
    const x = i[m];
    if (!x)
      continue;
    const {
      name: w,
      fn: b
    } = x, {
      x: y,
      y: C,
      data: R,
      reset: N
    } = await b({
      x: f,
      y: p,
      initialPlacement: o,
      placement: g,
      strategy: r,
      middlewareData: v,
      rects: d,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = y ?? f, p = C ?? p, v[w] = {
      ...v[w],
      ...R
    }, N && h < Cd && (h++, typeof N == "object" && (N.placement && (g = N.placement), N.rects && (d = N.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : N.rects), {
      x: f,
      y: p
    } = Ur(d, g, c)), m = -1);
  }
  return {
    x: f,
    y: p,
    placement: g,
    strategy: r,
    middlewareData: v
  };
}, Ed = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: s,
      elements: a,
      middlewareData: c
    } = t, {
      element: d,
      padding: f = 0
    } = Be(e, t) || {};
    if (d == null)
      return {};
    const p = Qs(f), g = {
      x: n,
      y: o
    }, h = Yo(r), v = Go(h), m = await s.getDimensions(d), x = h === "y", w = x ? "top" : "left", b = x ? "bottom" : "right", y = x ? "clientHeight" : "clientWidth", C = i.reference[v] + i.reference[h] - g[h] - i.floating[v], R = g[h] - i.reference[h], N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let S = N ? N[y] : 0;
    (!S || !await (s.isElement == null ? void 0 : s.isElement(N))) && (S = a.floating[y] || i.floating[v]);
    const E = C / 2 - R / 2, L = S / 2 - m[v] / 2 - 1, _ = Je(p[w], L), D = Je(p[b], L), K = _, F = S - m[v] - D, Z = S / 2 - m[v] / 2 + E, J = To(K, Z, F), W = !c.arrow && Mt(r) != null && Z !== J && i.reference[v] / 2 - (Z < K ? _ : D) - m[v] / 2 < 0, Y = W ? Z < K ? Z - K : Z - F : 0;
    return {
      [h]: g[h] + Y,
      data: {
        [h]: J,
        centerOffset: Z - J - Y,
        ...W && {
          alignmentOffset: Y
        }
      },
      reset: W
    };
  }
}), kd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: a,
        platform: c,
        elements: d
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: g,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: m = !0,
        ...x
      } = Be(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const w = Ue(r), b = Me(a), y = Ue(a) === a, C = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), R = g || (y || !m ? [Rn(a)] : hd(a)), N = v !== "none";
      !g && N && R.push(...bd(a, m, v, C));
      const S = [a, ...R], E = await c.detectOverflow(t, x), L = [];
      let _ = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (f && L.push(E[w]), p) {
        const Z = md(r, s, C);
        L.push(E[Z[0]], E[Z[1]]);
      }
      if (_ = [..._, {
        placement: r,
        overflows: L
      }], !L.every((Z) => Z <= 0)) {
        var D, K;
        const Z = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1, J = S[Z];
        if (J && (!(p === "alignment" ? b !== Me(J) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        _.every((H) => Me(H.placement) === b ? H.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Z,
              overflows: _
            },
            reset: {
              placement: J
            }
          };
        let W = (K = _.filter((Y) => Y.overflows[0] <= 0).sort((Y, H) => Y.overflows[1] - H.overflows[1])[0]) == null ? void 0 : K.placement;
        if (!W)
          switch (h) {
            case "bestFit": {
              var F;
              const Y = (F = _.filter((H) => {
                if (N) {
                  const Q = Me(H.placement);
                  return Q === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Q === "y";
                }
                return !0;
              }).map((H) => [H.placement, H.overflows.filter((Q) => Q > 0).reduce((Q, $) => Q + $, 0)]).sort((H, Q) => H[1] - Q[1])[0]) == null ? void 0 : F[0];
              Y && (W = Y);
              break;
            }
            case "initialPlacement":
              W = a;
              break;
          }
        if (r !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
function Gr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Yr(e) {
  return fd.some((t) => e[t] >= 0);
}
const Rd = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n,
        platform: o
      } = t, {
        strategy: r = "referenceHidden",
        ...i
      } = Be(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await o.detectOverflow(t, {
            ...i,
            elementContext: "reference"
          }), a = Gr(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Yr(a)
            }
          };
        }
        case "escaped": {
          const s = await o.detectOverflow(t, {
            ...i,
            altBoundary: !0
          }), a = Gr(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Yr(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ei = /* @__PURE__ */ new Set(["left", "top"]);
async function Pd(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), s = Ue(n), a = Mt(n), c = Me(n) === "y", d = ei.has(s) ? -1 : 1, f = i && c ? -1 : 1, p = Be(t, e);
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
  return a && typeof v == "number" && (h = a === "end" ? v * -1 : v), c ? {
    x: h * f,
    y: g * d
  } : {
    x: g * d,
    y: h * f
  };
}
const Nd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: s,
        middlewareData: a
      } = t, c = await Pd(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Td = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        platform: i
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
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
        ...d
      } = Be(e, t), f = {
        x: n,
        y: o
      }, p = await i.detectOverflow(t, d), g = Me(Ue(r)), h = Uo(g);
      let v = f[h], m = f[g];
      if (s) {
        const w = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", y = v + p[w], C = v - p[b];
        v = To(y, v, C);
      }
      if (a) {
        const w = g === "y" ? "top" : "left", b = g === "y" ? "bottom" : "right", y = m + p[w], C = m - p[b];
        m = To(y, m, C);
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
            [h]: s,
            [g]: a
          }
        }
      };
    }
  };
}, Ad = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: i,
        middlewareData: s
      } = t, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: d = !0
      } = Be(e, t), f = {
        x: n,
        y: o
      }, p = Me(r), g = Uo(p);
      let h = f[g], v = f[p];
      const m = Be(a, t), x = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const y = g === "y" ? "height" : "width", C = i.reference[g] - i.floating[y] + x.mainAxis, R = i.reference[g] + i.reference[y] - x.mainAxis;
        h < C ? h = C : h > R && (h = R);
      }
      if (d) {
        var w, b;
        const y = g === "y" ? "width" : "height", C = ei.has(Ue(r)), R = i.reference[p] - i.floating[y] + (C && ((w = s.offset) == null ? void 0 : w[p]) || 0) + (C ? 0 : x.crossAxis), N = i.reference[p] + i.reference[y] + (C ? 0 : ((b = s.offset) == null ? void 0 : b[p]) || 0) - (C ? x.crossAxis : 0);
        v < R ? v = R : v > N && (v = N);
      }
      return {
        [g]: h,
        [p]: v
      };
    }
  };
}, Od = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: s,
        elements: a
      } = t, {
        apply: c = () => {
        },
        ...d
      } = Be(e, t), f = await s.detectOverflow(t, d), p = Ue(r), g = Mt(r), h = Me(r) === "y", {
        width: v,
        height: m
      } = i.floating;
      let x, w;
      p === "top" || p === "bottom" ? (x = p, w = g === (await (s.isRTL == null ? void 0 : s.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (w = p, x = g === "end" ? "top" : "bottom");
      const b = m - f.top - f.bottom, y = v - f.left - f.right, C = Je(m - f[x], b), R = Je(v - f[w], y), N = !t.middlewareData.shift;
      let S = C, E = R;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (E = y), (o = t.middlewareData.shift) != null && o.enabled.y && (S = b), N && !g) {
        const _ = Pe(f.left, 0), D = Pe(f.right, 0), K = Pe(f.top, 0), F = Pe(f.bottom, 0);
        h ? E = v - 2 * (_ !== 0 || D !== 0 ? _ + D : Pe(f.left, f.right)) : S = m - 2 * (K !== 0 || F !== 0 ? K + F : Pe(f.top, f.bottom));
      }
      await c({
        ...t,
        availableWidth: E,
        availableHeight: S
      });
      const L = await s.getDimensions(a.floating);
      return v !== L.width || m !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function $n() {
  return typeof window < "u";
}
function $t(e) {
  return ti(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ne(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Le(e) {
  var t;
  return (t = (ti(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ti(e) {
  return $n() ? e instanceof Node || e instanceof Ne(e).Node : !1;
}
function Ae(e) {
  return $n() ? e instanceof Element || e instanceof Ne(e).Element : !1;
}
function Ge(e) {
  return $n() ? e instanceof HTMLElement || e instanceof Ne(e).HTMLElement : !1;
}
function Kr(e) {
  return !$n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ne(e).ShadowRoot;
}
function Zt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Oe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Id(e) {
  return /^(table|td|th)$/.test($t(e));
}
function Ln(e) {
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
const jd = /transform|translate|scale|rotate|perspective|filter/, _d = /paint|layout|strict|content/, ct = (e) => !!e && e !== "none";
let go;
function Ko(e) {
  const t = Ae(e) ? Oe(e) : e;
  return ct(t.transform) || ct(t.translate) || ct(t.scale) || ct(t.rotate) || ct(t.perspective) || !Xo() && (ct(t.backdropFilter) || ct(t.filter)) || jd.test(t.willChange || "") || _d.test(t.contain || "");
}
function Dd(e) {
  let t = Qe(e);
  for (; Ge(t) && !It(t); ) {
    if (Ko(t))
      return t;
    if (Ln(t))
      return null;
    t = Qe(t);
  }
  return null;
}
function Xo() {
  return go == null && (go = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), go;
}
function It(e) {
  return /^(html|body|#document)$/.test($t(e));
}
function Oe(e) {
  return Ne(e).getComputedStyle(e);
}
function zn(e) {
  return Ae(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Qe(e) {
  if ($t(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Kr(e) && e.host || // Fallback.
    Le(e)
  );
  return Kr(t) ? t.host : t;
}
function ni(e) {
  const t = Qe(e);
  return It(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ge(t) && Zt(t) ? t : ni(t);
}
function Gt(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = ni(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = Ne(r);
  if (i) {
    const a = Oo(s);
    return t.concat(s, s.visualViewport || [], Zt(r) ? r : [], a && n ? Gt(a) : []);
  } else
    return t.concat(r, Gt(r, [], n));
}
function Oo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function oi(e) {
  const t = Oe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ge(e), i = r ? e.offsetWidth : n, s = r ? e.offsetHeight : o, a = kn(n) !== i || kn(o) !== s;
  return a && (n = i, o = s), {
    width: n,
    height: o,
    $: a
  };
}
function qo(e) {
  return Ae(e) ? e : e.contextElement;
}
function Nt(e) {
  const t = qo(e);
  if (!Ge(t))
    return $e(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = oi(t);
  let s = (i ? kn(n.width) : n.width) / o, a = (i ? kn(n.height) : n.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Md = /* @__PURE__ */ $e(0);
function ri(e) {
  const t = Ne(e);
  return !Xo() || !t.visualViewport ? Md : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function $d(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ne(e) ? !1 : t;
}
function mt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = qo(e);
  let s = $e(1);
  t && (o ? Ae(o) && (s = Nt(o)) : s = Nt(e));
  const a = $d(i, n, o) ? ri(i) : $e(0);
  let c = (r.left + a.x) / s.x, d = (r.top + a.y) / s.y, f = r.width / s.x, p = r.height / s.y;
  if (i) {
    const g = Ne(i), h = o && Ae(o) ? Ne(o) : o;
    let v = g, m = Oo(v);
    for (; m && o && h !== v; ) {
      const x = Nt(m), w = m.getBoundingClientRect(), b = Oe(m), y = w.left + (m.clientLeft + parseFloat(b.paddingLeft)) * x.x, C = w.top + (m.clientTop + parseFloat(b.paddingTop)) * x.y;
      c *= x.x, d *= x.y, f *= x.x, p *= x.y, c += y, d += C, v = Ne(m), m = Oo(v);
    }
  }
  return Pn({
    width: f,
    height: p,
    x: c,
    y: d
  });
}
function Fn(e, t) {
  const n = zn(e).scrollLeft;
  return t ? t.left + n : mt(Le(e)).left + n;
}
function si(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Fn(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function Ld(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", s = Le(o), a = t ? Ln(t.floating) : !1;
  if (o === s || a && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = $e(1);
  const f = $e(0), p = Ge(o);
  if ((p || !p && !i) && (($t(o) !== "body" || Zt(s)) && (c = zn(o)), p)) {
    const h = mt(o);
    d = Nt(o), f.x = h.x + o.clientLeft, f.y = h.y + o.clientTop;
  }
  const g = s && !p && !i ? si(s, c) : $e(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - c.scrollLeft * d.x + f.x + g.x,
    y: n.y * d.y - c.scrollTop * d.y + f.y + g.y
  };
}
function zd(e) {
  return Array.from(e.getClientRects());
}
function Fd(e) {
  const t = Le(e), n = zn(e), o = e.ownerDocument.body, r = Pe(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = Pe(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + Fn(e);
  const a = -n.scrollTop;
  return Oe(o).direction === "rtl" && (s += Pe(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: s,
    y: a
  };
}
const Xr = 25;
function Wd(e, t) {
  const n = Ne(e), o = Le(e), r = n.visualViewport;
  let i = o.clientWidth, s = o.clientHeight, a = 0, c = 0;
  if (r) {
    i = r.width, s = r.height;
    const f = Xo();
    (!f || f && t === "fixed") && (a = r.offsetLeft, c = r.offsetTop);
  }
  const d = Fn(o);
  if (d <= 0) {
    const f = o.ownerDocument, p = f.body, g = getComputedStyle(p), h = f.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, v = Math.abs(o.clientWidth - p.clientWidth - h);
    v <= Xr && (i -= v);
  } else d <= Xr && (i += d);
  return {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Vd(e, t) {
  const n = mt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = Ge(e) ? Nt(e) : $e(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, c = r * i.x, d = o * i.y;
  return {
    width: s,
    height: a,
    x: c,
    y: d
  };
}
function qr(e, t, n) {
  let o;
  if (t === "viewport")
    o = Wd(e, n);
  else if (t === "document")
    o = Fd(Le(e));
  else if (Ae(t))
    o = Vd(t, n);
  else {
    const r = ri(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return Pn(o);
}
function ii(e, t) {
  const n = Qe(e);
  return n === t || !Ae(n) || It(n) ? !1 : Oe(n).position === "fixed" || ii(n, t);
}
function Hd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Gt(e, [], !1).filter((a) => Ae(a) && $t(a) !== "body"), r = null;
  const i = Oe(e).position === "fixed";
  let s = i ? Qe(e) : e;
  for (; Ae(s) && !It(s); ) {
    const a = Oe(s), c = Ko(s);
    !c && a.position === "fixed" && (r = null), (i ? !c && !r : !c && a.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || Zt(s) && !c && ii(e, s)) ? o = o.filter((f) => f !== s) : r = a, s = Qe(s);
  }
  return t.set(e, o), o;
}
function Bd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const s = [...n === "clippingAncestors" ? Ln(t) ? [] : Hd(t, this._c) : [].concat(n), o], a = qr(t, s[0], r);
  let c = a.top, d = a.right, f = a.bottom, p = a.left;
  for (let g = 1; g < s.length; g++) {
    const h = qr(t, s[g], r);
    c = Pe(h.top, c), d = Je(h.right, d), f = Je(h.bottom, f), p = Pe(h.left, p);
  }
  return {
    width: d - p,
    height: f - c,
    x: p,
    y: c
  };
}
function Ud(e) {
  const {
    width: t,
    height: n
  } = oi(e);
  return {
    width: t,
    height: n
  };
}
function Gd(e, t, n) {
  const o = Ge(t), r = Le(t), i = n === "fixed", s = mt(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = $e(0);
  function d() {
    c.x = Fn(r);
  }
  if (o || !o && !i)
    if (($t(t) !== "body" || Zt(r)) && (a = zn(t)), o) {
      const h = mt(t, !0, i, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else r && d();
  i && !o && r && d();
  const f = r && !o && !i ? si(r, a) : $e(0), p = s.left + a.scrollLeft - c.x - f.x, g = s.top + a.scrollTop - c.y - f.y;
  return {
    x: p,
    y: g,
    width: s.width,
    height: s.height
  };
}
function vo(e) {
  return Oe(e).position === "static";
}
function Zr(e, t) {
  if (!Ge(e) || Oe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Le(e) === n && (n = n.ownerDocument.body), n;
}
function ai(e, t) {
  const n = Ne(e);
  if (Ln(e))
    return n;
  if (!Ge(e)) {
    let r = Qe(e);
    for (; r && !It(r); ) {
      if (Ae(r) && !vo(r))
        return r;
      r = Qe(r);
    }
    return n;
  }
  let o = Zr(e, t);
  for (; o && Id(o) && vo(o); )
    o = Zr(o, t);
  return o && It(o) && vo(o) && !Ko(o) ? n : o || Dd(e) || n;
}
const Yd = async function(e) {
  const t = this.getOffsetParent || ai, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Gd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Kd(e) {
  return Oe(e).direction === "rtl";
}
const Xd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ld,
  getDocumentElement: Le,
  getClippingRect: Bd,
  getOffsetParent: ai,
  getElementRects: Yd,
  getClientRects: zd,
  getDimensions: Ud,
  getScale: Nt,
  isElement: Ae,
  isRTL: Kd
};
function li(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function qd(e, t) {
  let n = null, o;
  const r = Le(e);
  function i() {
    var a;
    clearTimeout(o), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), i();
    const d = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: g,
      height: h
    } = d;
    if (a || t(), !g || !h)
      return;
    const v = dn(p), m = dn(r.clientWidth - (f + g)), x = dn(r.clientHeight - (p + h)), w = dn(f), y = {
      rootMargin: -v + "px " + -m + "px " + -x + "px " + -w + "px",
      threshold: Pe(0, Je(1, c)) || 1
    };
    let C = !0;
    function R(N) {
      const S = N[0].intersectionRatio;
      if (S !== c) {
        if (!C)
          return s();
        S ? s(!1, S) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !li(d, e.getBoundingClientRect()) && s(), C = !1;
    }
    try {
      n = new IntersectionObserver(R, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(R, y);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function ci(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, d = qo(e), f = r || i ? [...d ? Gt(d) : [], ...t ? Gt(t) : []] : [];
  f.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), i && w.addEventListener("resize", n);
  });
  const p = d && a ? qd(d, n) : null;
  let g = -1, h = null;
  s && (h = new ResizeObserver((w) => {
    let [b] = w;
    b && b.target === d && h && t && (h.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), d && !c && h.observe(d), t && h.observe(t));
  let v, m = c ? mt(e) : null;
  c && x();
  function x() {
    const w = mt(e);
    m && !li(m, w) && n(), m = w, v = requestAnimationFrame(x);
  }
  return n(), () => {
    var w;
    f.forEach((b) => {
      r && b.removeEventListener("scroll", n), i && b.removeEventListener("resize", n);
    }), p?.(), (w = h) == null || w.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const Zd = Nd, Jd = Td, Qd = kd, ef = Od, tf = Rd, Jr = Ed, nf = Ad, of = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Xd,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return Sd(e, t, {
    ...r,
    platform: i
  });
};
var rf = typeof document < "u", sf = function() {
}, bn = rf ? pl : sf;
function Nn(e, t) {
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
        if (!Nn(e[o], t[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !Nn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ui(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Qr(e, t) {
  const n = ui(e);
  return Math.round(t * n) / n;
}
function xo(e) {
  const t = l.useRef(e);
  return bn(() => {
    t.current = e;
  }), t;
}
function di(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: i,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: d
  } = e, [f, p] = l.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [g, h] = l.useState(o);
  Nn(g, o) || h(o);
  const [v, m] = l.useState(null), [x, w] = l.useState(null), b = l.useCallback((H) => {
    H !== N.current && (N.current = H, m(H));
  }, []), y = l.useCallback((H) => {
    H !== S.current && (S.current = H, w(H));
  }, []), C = i || v, R = s || x, N = l.useRef(null), S = l.useRef(null), E = l.useRef(f), L = c != null, _ = xo(c), D = xo(r), K = xo(d), F = l.useCallback(() => {
    if (!N.current || !S.current)
      return;
    const H = {
      placement: t,
      strategy: n,
      middleware: g
    };
    D.current && (H.platform = D.current), of(N.current, S.current, H).then((Q) => {
      const $ = {
        ...Q,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: K.current !== !1
      };
      Z.current && !Nn(E.current, $) && (E.current = $, Dt.flushSync(() => {
        p($);
      }));
    });
  }, [g, t, n, D, K]);
  bn(() => {
    d === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((H) => ({
      ...H,
      isPositioned: !1
    })));
  }, [d]);
  const Z = l.useRef(!1);
  bn(() => (Z.current = !0, () => {
    Z.current = !1;
  }), []), bn(() => {
    if (C && (N.current = C), R && (S.current = R), C && R) {
      if (_.current)
        return _.current(C, R, F);
      F();
    }
  }, [C, R, F, _, L]);
  const J = l.useMemo(() => ({
    reference: N,
    floating: S,
    setReference: b,
    setFloating: y
  }), [b, y]), W = l.useMemo(() => ({
    reference: C,
    floating: R
  }), [C, R]), Y = l.useMemo(() => {
    const H = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return H;
    const Q = Qr(W.floating, f.x), $ = Qr(W.floating, f.y);
    return a ? {
      ...H,
      transform: "translate(" + Q + "px, " + $ + "px)",
      ...ui(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: Q,
      top: $
    };
  }, [n, a, W.floating, f.x, f.y]);
  return l.useMemo(() => ({
    ...f,
    update: F,
    refs: J,
    elements: W,
    floatingStyles: Y
  }), [f, F, J, W, Y]);
}
const af = (e) => {
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
      return o && t(o) ? o.current != null ? Jr({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? Jr({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, fi = (e, t) => {
  const n = Zd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, pi = (e, t) => {
  const n = Jd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, mi = (e, t) => ({
  fn: nf(e).fn,
  options: [e, t]
}), hi = (e, t) => {
  const n = Qd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, gi = (e, t) => {
  const n = ef(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, vi = (e, t) => {
  const n = tf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, xi = (e, t) => {
  const n = af(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var lf = "Arrow", bi = l.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ u.jsx(
    ge.svg,
    {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
bi.displayName = lf;
var cf = bi;
function uf(e) {
  const [t, n] = l.useState(void 0);
  return Ee(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let s, a;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          s = d.inlineSize, a = d.blockSize;
        } else
          s = e.offsetWidth, a = e.offsetHeight;
        n({ width: s, height: a });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Zo = "Popper", [wi, Wn] = qt(Zo), [df, yi] = wi(Zo), Ci = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = l.useState(null);
  return /* @__PURE__ */ u.jsx(df, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Ci.displayName = Zo;
var Si = "PopperAnchor", Ei = l.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = yi(Si, n), s = l.useRef(null), a = we(t, s), c = l.useRef(null);
    return l.useEffect(() => {
      const d = c.current;
      c.current = o?.current || s.current, d !== c.current && i.onAnchorChange(c.current);
    }), o ? null : /* @__PURE__ */ u.jsx(ge.div, { ...r, ref: a });
  }
);
Ei.displayName = Si;
var Jo = "PopperContent", [ff, pf] = wi(Jo), ki = l.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: a = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = yi(Jo, n), [w, b] = l.useState(null), y = we(t, (j) => b(j)), [C, R] = l.useState(null), N = uf(C), S = N?.width ?? 0, E = N?.height ?? 0, L = o + (i !== "center" ? "-" + i : ""), _ = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, D = Array.isArray(d) ? d : [d], K = D.length > 0, F = {
      padding: _,
      boundary: D.filter(hf),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: K
    }, { refs: Z, floatingStyles: J, placement: W, isPositioned: Y, middlewareData: H } = di({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...j) => ci(...j, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        fi({ mainAxis: r + E, alignmentAxis: s }),
        c && pi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? mi() : void 0,
          ...F
        }),
        c && hi({ ...F }),
        gi({
          ...F,
          apply: ({ elements: j, rects: ne, availableWidth: ee, availableHeight: ue }) => {
            const { width: ce, height: se } = ne.reference, be = j.floating.style;
            be.setProperty("--radix-popper-available-width", `${ee}px`), be.setProperty("--radix-popper-available-height", `${ue}px`), be.setProperty("--radix-popper-anchor-width", `${ce}px`), be.setProperty("--radix-popper-anchor-height", `${se}px`);
          }
        }),
        C && xi({ element: C, padding: a }),
        gf({ arrowWidth: S, arrowHeight: E }),
        g && vi({ strategy: "referenceHidden", ...F })
      ]
    }), [Q, $] = Ni(W), P = pt(v);
    Ee(() => {
      Y && P?.();
    }, [Y, P]);
    const X = H.arrow?.x, q = H.arrow?.y, ie = H.arrow?.centerOffset !== 0, [re, ae] = l.useState();
    return Ee(() => {
      w && ae(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Z.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...J,
          transform: Y ? J.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: re,
          "--radix-popper-transform-origin": [
            H.transformOrigin?.x,
            H.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...H.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u.jsx(
          ff,
          {
            scope: n,
            placedSide: Q,
            onArrowChange: R,
            arrowX: X,
            arrowY: q,
            shouldHideArrow: ie,
            children: /* @__PURE__ */ u.jsx(
              ge.div,
              {
                "data-side": Q,
                "data-align": $,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: Y ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ki.displayName = Jo;
var Ri = "PopperArrow", mf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Pi = l.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = pf(Ri, o), s = mf[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ u.jsx(
          cf,
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
Pi.displayName = Ri;
function hf(e) {
  return e !== null;
}
var gf = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, a = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [d, f] = Ni(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + a / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return d === "bottom" ? (v = s ? p : `${g}px`, m = `${-c}px`) : d === "top" ? (v = s ? p : `${g}px`, m = `${o.floating.height + c}px`) : d === "right" ? (v = `${-c}px`, m = s ? p : `${h}px`) : d === "left" && (v = `${o.floating.width + c}px`, m = s ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function Ni(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ti = Ci, Qo = Ei, Ai = ki, Oi = Pi, vf = "Portal", er = l.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = l.useState(!1);
  Ee(() => i(!0), []);
  const s = n || r && globalThis?.document?.body;
  return s ? hl.createPortal(/* @__PURE__ */ u.jsx(ge.div, { ...o, ref: t }), s) : null;
});
er.displayName = vf;
var xf = l[" useInsertionEffect ".trim().toString()] || Ee;
function Tn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = bf({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : r;
  {
    const f = l.useRef(e !== void 0);
    l.useEffect(() => {
      const p = f.current;
      p !== a && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = a;
    }, [a, o]);
  }
  const d = l.useCallback(
    (f) => {
      if (a) {
        const p = wf(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [a, e, i, s]
  );
  return [c, d];
}
function bf({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = l.useState(e), r = l.useRef(n), i = l.useRef(t);
  return xf(() => {
    i.current = t;
  }, [t]), l.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function wf(e) {
  return typeof e == "function";
}
function yf(e) {
  const t = l.useRef({ value: e, previous: e });
  return l.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Ii = Object.freeze({
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
}), Cf = "VisuallyHidden", Sf = l.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    ge.span,
    {
      ...e,
      ref: t,
      style: { ...Ii, ...e.style }
    }
  )
);
Sf.displayName = Cf;
var Ef = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Et = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), pn = {}, bo = 0, ji = function(e) {
  return e && (e.host || ji(e.parentNode));
}, kf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = ji(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Rf = function(e, t, n, o) {
  var r = kf(t, Array.isArray(e) ? e : [e]);
  pn[n] || (pn[n] = /* @__PURE__ */ new WeakMap());
  var i = pn[n], s = [], a = /* @__PURE__ */ new Set(), c = new Set(r), d = function(p) {
    !p || a.has(p) || (a.add(p), d(p.parentNode));
  };
  r.forEach(d);
  var f = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(g) {
      if (a.has(g))
        f(g);
      else
        try {
          var h = g.getAttribute(o), v = h !== null && h !== "false", m = (Et.get(g) || 0) + 1, x = (i.get(g) || 0) + 1;
          Et.set(g, m), i.set(g, x), s.push(g), m === 1 && v && fn.set(g, !0), x === 1 && g.setAttribute(n, "true"), v || g.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", g, w);
        }
    });
  };
  return f(t), a.clear(), bo++, function() {
    s.forEach(function(p) {
      var g = Et.get(p) - 1, h = i.get(p) - 1;
      Et.set(p, g), i.set(p, h), g || (fn.has(p) || p.removeAttribute(o), fn.delete(p)), h || p.removeAttribute(n);
    }), bo--, bo || (Et = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), pn = {});
  };
}, tr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ef(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Rf(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, De = function() {
  return De = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, De.apply(this, arguments);
};
function _i(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Pf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, i; o < r; o++)
    (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var wn = "right-scroll-bar-position", yn = "width-before-scroll-bar", Nf = "with-scroll-bars-hidden", Tf = "--removed-body-scroll-bar-size";
function wo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Af(e, t) {
  var n = ml(function() {
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
var Of = typeof window < "u" ? l.useLayoutEffect : l.useEffect, es = /* @__PURE__ */ new WeakMap();
function If(e, t) {
  var n = Af(null, function(o) {
    return e.forEach(function(r) {
      return wo(r, o);
    });
  });
  return Of(function() {
    var o = es.get(n);
    if (o) {
      var r = new Set(o), i = new Set(e), s = n.current;
      r.forEach(function(a) {
        i.has(a) || wo(a, null);
      }), i.forEach(function(a) {
        r.has(a) || wo(a, s);
      });
    }
    es.set(n, e);
  }, [e]), n;
}
function jf(e) {
  return e;
}
function _f(e, t) {
  t === void 0 && (t = jf);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var s = t(i, o);
      return n.push(s), function() {
        n = n.filter(function(a) {
          return a !== s;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (o = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(i);
      }
      n = {
        push: function(a) {
          return i(a);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      o = !0;
      var s = [];
      if (n.length) {
        var a = n;
        n = [], a.forEach(i), s = n;
      }
      var c = function() {
        var f = s;
        s = [], f.forEach(i);
      }, d = function() {
        return Promise.resolve().then(c);
      };
      d(), n = {
        push: function(f) {
          s.push(f), d();
        },
        filter: function(f) {
          return s = s.filter(f), n;
        }
      };
    }
  };
  return r;
}
function Df(e) {
  e === void 0 && (e = {});
  var t = _f(null);
  return t.options = De({ async: !0, ssr: !1 }, e), t;
}
var Di = function(e) {
  var t = e.sideCar, n = _i(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return l.createElement(o, De({}, n));
};
Di.isSideCarExport = !0;
function Mf(e, t) {
  return e.useMedium(t), Di;
}
var Mi = Df(), yo = function() {
}, Vn = l.forwardRef(function(e, t) {
  var n = l.useRef(null), o = l.useState({
    onScrollCapture: yo,
    onWheelCapture: yo,
    onTouchMoveCapture: yo
  }), r = o[0], i = o[1], s = e.forwardProps, a = e.children, c = e.className, d = e.removeScrollBar, f = e.enabled, p = e.shards, g = e.sideCar, h = e.noRelative, v = e.noIsolation, m = e.inert, x = e.allowPinchZoom, w = e.as, b = w === void 0 ? "div" : w, y = e.gapMode, C = _i(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = g, N = If([n, t]), S = De(De({}, C), r);
  return l.createElement(
    l.Fragment,
    null,
    f && l.createElement(R, { sideCar: Mi, removeScrollBar: d, shards: p, noRelative: h, noIsolation: v, inert: m, setCallbacks: i, allowPinchZoom: !!x, lockRef: n, gapMode: y }),
    s ? l.cloneElement(l.Children.only(a), De(De({}, S), { ref: N })) : l.createElement(b, De({}, S, { className: c, ref: N }), a)
  );
});
Vn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Vn.classNames = {
  fullWidth: yn,
  zeroRight: wn
};
var $f = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Lf() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = $f();
  return t && e.setAttribute("nonce", t), e;
}
function zf(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ff(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Wf = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Lf()) && (zf(t, n), Ff(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Vf = function() {
  var e = Wf();
  return function(t, n) {
    l.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, $i = function() {
  var e = Vf(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Hf = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Co = function(e) {
  return parseInt(e || "", 10) || 0;
}, Bf = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Co(n), Co(o), Co(r)];
}, Uf = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Hf;
  var t = Bf(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Gf = $i(), Tt = "data-scroll-locked", Yf = function(e, t, n, o) {
  var r = e.left, i = e.top, s = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Nf, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(Tt, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(o, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(a, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(wn, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(yn, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(wn, " .").concat(wn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(yn, " .").concat(yn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Tt, `] {
    `).concat(Tf, ": ").concat(a, `px;
  }
`);
}, ts = function() {
  var e = parseInt(document.body.getAttribute(Tt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Kf = function() {
  l.useEffect(function() {
    return document.body.setAttribute(Tt, (ts() + 1).toString()), function() {
      var e = ts() - 1;
      e <= 0 ? document.body.removeAttribute(Tt) : document.body.setAttribute(Tt, e.toString());
    };
  }, []);
}, Xf = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Kf();
  var i = l.useMemo(function() {
    return Uf(r);
  }, [r]);
  return l.createElement(Gf, { styles: Yf(i, !t, r, n ? "" : "!important") });
}, Io = !1;
if (typeof window < "u")
  try {
    var mn = Object.defineProperty({}, "passive", {
      get: function() {
        return Io = !0, !0;
      }
    });
    window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
  } catch {
    Io = !1;
  }
var kt = Io ? { passive: !1 } : !1, qf = function(e) {
  return e.tagName === "TEXTAREA";
}, Li = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !qf(e) && n[t] === "visible")
  );
}, Zf = function(e) {
  return Li(e, "overflowY");
}, Jf = function(e) {
  return Li(e, "overflowX");
}, ns = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = zi(e, o);
    if (r) {
      var i = Fi(e, o), s = i[1], a = i[2];
      if (s > a)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, Qf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, ep = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, zi = function(e, t) {
  return e === "v" ? Zf(t) : Jf(t);
}, Fi = function(e, t) {
  return e === "v" ? Qf(t) : ep(t);
}, tp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, np = function(e, t, n, o, r) {
  var i = tp(e, window.getComputedStyle(t).direction), s = i * o, a = n.target, c = t.contains(a), d = !1, f = s > 0, p = 0, g = 0;
  do {
    if (!a)
      break;
    var h = Fi(e, a), v = h[0], m = h[1], x = h[2], w = m - x - i * v;
    (v || w) && zi(e, a) && (p += w, g += v);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(g) < 1) && (d = !0), d;
}, hn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, os = function(e) {
  return [e.deltaX, e.deltaY];
}, rs = function(e) {
  return e && "current" in e ? e.current : e;
}, op = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, rp = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, sp = 0, Rt = [];
function ip(e) {
  var t = l.useRef([]), n = l.useRef([0, 0]), o = l.useRef(), r = l.useState(sp++)[0], i = l.useState($i)[0], s = l.useRef(e);
  l.useEffect(function() {
    s.current = e;
  }, [e]), l.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var m = Pf([e.lockRef.current], (e.shards || []).map(rs), !0).filter(Boolean);
      return m.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), m.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = l.useCallback(function(m, x) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = hn(m), b = n.current, y = "deltaX" in m ? m.deltaX : b[0] - w[0], C = "deltaY" in m ? m.deltaY : b[1] - w[1], R, N = m.target, S = Math.abs(y) > Math.abs(C) ? "h" : "v";
    if ("touches" in m && S === "h" && N.type === "range")
      return !1;
    var E = window.getSelection(), L = E && E.anchorNode, _ = L ? L === N || L.contains(N) : !1;
    if (_)
      return !1;
    var D = ns(S, N);
    if (!D)
      return !0;
    if (D ? R = S : (R = S === "v" ? "h" : "v", D = ns(S, N)), !D)
      return !1;
    if (!o.current && "changedTouches" in m && (y || C) && (o.current = R), !R)
      return !0;
    var K = o.current || R;
    return np(K, x, m, K === "h" ? y : C);
  }, []), c = l.useCallback(function(m) {
    var x = m;
    if (!(!Rt.length || Rt[Rt.length - 1] !== i)) {
      var w = "deltaY" in x ? os(x) : hn(x), b = t.current.filter(function(R) {
        return R.name === x.type && (R.target === x.target || x.target === R.shadowParent) && op(R.delta, w);
      })[0];
      if (b && b.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!b) {
        var y = (s.current.shards || []).map(rs).filter(Boolean).filter(function(R) {
          return R.contains(x.target);
        }), C = y.length > 0 ? a(x, y[0]) : !s.current.noIsolation;
        C && x.cancelable && x.preventDefault();
      }
    }
  }, []), d = l.useCallback(function(m, x, w, b) {
    var y = { name: m, delta: x, target: w, should: b, shadowParent: ap(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== y;
      });
    }, 1);
  }, []), f = l.useCallback(function(m) {
    n.current = hn(m), o.current = void 0;
  }, []), p = l.useCallback(function(m) {
    d(m.type, os(m), m.target, a(m, e.lockRef.current));
  }, []), g = l.useCallback(function(m) {
    d(m.type, hn(m), m.target, a(m, e.lockRef.current));
  }, []);
  l.useEffect(function() {
    return Rt.push(i), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: g
    }), document.addEventListener("wheel", c, kt), document.addEventListener("touchmove", c, kt), document.addEventListener("touchstart", f, kt), function() {
      Rt = Rt.filter(function(m) {
        return m !== i;
      }), document.removeEventListener("wheel", c, kt), document.removeEventListener("touchmove", c, kt), document.removeEventListener("touchstart", f, kt);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return l.createElement(
    l.Fragment,
    null,
    v ? l.createElement(i, { styles: rp(r) }) : null,
    h ? l.createElement(Xf, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ap(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const lp = Mf(Mi, ip);
var Hn = l.forwardRef(function(e, t) {
  return l.createElement(Vn, De({}, e, { ref: t, sideCar: lp }));
});
Hn.classNames = Vn.classNames;
var cp = [" ", "Enter", "ArrowUp", "ArrowDown"], up = [" ", "Enter"], ht = "Select", [Bn, Un, dp] = Bu(ht), [Lt] = qt(ht, [
  dp,
  Wn
]), Gn = Wn(), [fp, tt] = Lt(ht), [pp, mp] = Lt(ht), Wi = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    value: s,
    defaultValue: a,
    onValueChange: c,
    dir: d,
    name: f,
    autoComplete: p,
    disabled: g,
    required: h,
    form: v
  } = e, m = Gn(t), [x, w] = l.useState(null), [b, y] = l.useState(null), [C, R] = l.useState(!1), N = Gu(d), [S, E] = Tn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: ht
  }), [L, _] = Tn({
    prop: s,
    defaultProp: a,
    onChange: c,
    caller: ht
  }), D = l.useRef(null), K = x ? v || !!x.closest("form") : !0, [F, Z] = l.useState(/* @__PURE__ */ new Set()), J = Array.from(F).map((W) => W.props.value).join(";");
  return /* @__PURE__ */ u.jsx(Ti, { ...m, children: /* @__PURE__ */ u.jsxs(
    fp,
    {
      required: h,
      scope: t,
      trigger: x,
      onTriggerChange: w,
      valueNode: b,
      onValueNodeChange: y,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: R,
      contentId: dt(),
      value: L,
      onValueChange: _,
      open: S,
      onOpenChange: E,
      dir: N,
      triggerPointerDownPosRef: D,
      disabled: g,
      children: [
        /* @__PURE__ */ u.jsx(Bn.Provider, { scope: t, children: /* @__PURE__ */ u.jsx(
          pp,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: l.useCallback((W) => {
              Z((Y) => new Set(Y).add(W));
            }, []),
            onNativeOptionRemove: l.useCallback((W) => {
              Z((Y) => {
                const H = new Set(Y);
                return H.delete(W), H;
              });
            }, []),
            children: n
          }
        ) }),
        K ? /* @__PURE__ */ u.jsxs(
          sa,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: L,
            onChange: (W) => _(W.target.value),
            disabled: g,
            form: v,
            children: [
              L === void 0 ? /* @__PURE__ */ u.jsx("option", { value: "" }) : null,
              Array.from(F)
            ]
          },
          J
        ) : null
      ]
    }
  ) });
};
Wi.displayName = ht;
var Vi = "SelectTrigger", Hi = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, i = Gn(n), s = tt(Vi, n), a = s.disabled || o, c = we(t, s.onTriggerChange), d = Un(n), f = l.useRef("touch"), [p, g, h] = aa((m) => {
      const x = d().filter((y) => !y.disabled), w = x.find((y) => y.value === s.value), b = la(x, m, w);
      b !== void 0 && s.onValueChange(b.value);
    }), v = (m) => {
      a || (s.onOpenChange(!0), h()), m && (s.triggerPointerDownPosRef.current = {
        x: Math.round(m.pageX),
        y: Math.round(m.pageY)
      });
    };
    return /* @__PURE__ */ u.jsx(Qo, { asChild: !0, ...i, children: /* @__PURE__ */ u.jsx(
      ge.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: a,
        "data-disabled": a ? "" : void 0,
        "data-placeholder": ia(s.value) ? "" : void 0,
        ...r,
        ref: c,
        onClick: pe(r.onClick, (m) => {
          m.currentTarget.focus(), f.current !== "mouse" && v(m);
        }),
        onPointerDown: pe(r.onPointerDown, (m) => {
          f.current = m.pointerType;
          const x = m.target;
          x.hasPointerCapture(m.pointerId) && x.releasePointerCapture(m.pointerId), m.button === 0 && m.ctrlKey === !1 && m.pointerType === "mouse" && (v(m), m.preventDefault());
        }),
        onKeyDown: pe(r.onKeyDown, (m) => {
          const x = p.current !== "";
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && g(m.key), !(x && m.key === " ") && cp.includes(m.key) && (v(), m.preventDefault());
        })
      }
    ) });
  }
);
Hi.displayName = Vi;
var Bi = "SelectValue", Ui = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: i, placeholder: s = "", ...a } = e, c = tt(Bi, n), { onValueNodeHasChildrenChange: d } = c, f = i !== void 0, p = we(t, c.onValueNodeChange);
    return Ee(() => {
      d(f);
    }, [d, f]), /* @__PURE__ */ u.jsx(
      ge.span,
      {
        ...a,
        ref: p,
        style: { pointerEvents: "none" },
        children: ia(c.value) ? /* @__PURE__ */ u.jsx(u.Fragment, { children: s }) : i
      }
    );
  }
);
Ui.displayName = Bi;
var hp = "SelectIcon", Gi = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ u.jsx(ge.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
Gi.displayName = hp;
var gt = "SelectContent", Yi = l.forwardRef(
  (e, t) => {
    const n = tt(gt, e.__scopeSelect), [o, r] = l.useState();
    if (Ee(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const i = o;
      return i ? Dt.createPortal(
        /* @__PURE__ */ u.jsx(Ki, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx(Bn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ u.jsx(Xi, { ...e, ref: t });
  }
);
Yi.displayName = gt;
var Te = 10, [Ki, nt] = Lt(gt), gp = "SelectContentImpl", vp = /* @__PURE__ */ Ot("SelectContent.RemoveScroll"), Xi = l.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: o = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: a,
      sideOffset: c,
      align: d,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: g,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: m,
      avoidCollisions: x,
      //
      ...w
    } = e, b = tt(gt, n), [y, C] = l.useState(null), [R, N] = l.useState(null), S = we(t, (j) => C(j)), [E, L] = l.useState(null), [_, D] = l.useState(
      null
    ), K = Un(n), [F, Z] = l.useState(!1), J = l.useRef(!1);
    l.useEffect(() => {
      if (y) return tr(y);
    }, [y]), Bo();
    const W = l.useCallback(
      (j) => {
        const [ne, ...ee] = K().map((se) => se.ref.current), [ue] = ee.slice(-1), ce = document.activeElement;
        for (const se of j)
          if (se === ce || (se?.scrollIntoView({ block: "nearest" }), se === ne && R && (R.scrollTop = 0), se === ue && R && (R.scrollTop = R.scrollHeight), se?.focus(), document.activeElement !== ce)) return;
      },
      [K, R]
    ), Y = l.useCallback(
      () => W([E, y]),
      [W, E, y]
    );
    l.useEffect(() => {
      F && Y();
    }, [F, Y]);
    const { onOpenChange: H, triggerPointerDownPosRef: Q } = b;
    l.useEffect(() => {
      if (y) {
        let j = { x: 0, y: 0 };
        const ne = (ue) => {
          j = {
            x: Math.abs(Math.round(ue.pageX) - (Q.current?.x ?? 0)),
            y: Math.abs(Math.round(ue.pageY) - (Q.current?.y ?? 0))
          };
        }, ee = (ue) => {
          j.x <= 10 && j.y <= 10 ? ue.preventDefault() : y.contains(ue.target) || H(!1), document.removeEventListener("pointermove", ne), Q.current = null;
        };
        return Q.current !== null && (document.addEventListener("pointermove", ne), document.addEventListener("pointerup", ee, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", ne), document.removeEventListener("pointerup", ee, { capture: !0 });
        };
      }
    }, [y, H, Q]), l.useEffect(() => {
      const j = () => H(!1);
      return window.addEventListener("blur", j), window.addEventListener("resize", j), () => {
        window.removeEventListener("blur", j), window.removeEventListener("resize", j);
      };
    }, [H]);
    const [$, P] = aa((j) => {
      const ne = K().filter((ce) => !ce.disabled), ee = ne.find((ce) => ce.ref.current === document.activeElement), ue = la(ne, j, ee);
      ue && setTimeout(() => ue.ref.current.focus());
    }), X = l.useCallback(
      (j, ne, ee) => {
        const ue = !J.current && !ee;
        (b.value !== void 0 && b.value === ne || ue) && (L(j), ue && (J.current = !0));
      },
      [b.value]
    ), q = l.useCallback(() => y?.focus(), [y]), ie = l.useCallback(
      (j, ne, ee) => {
        const ue = !J.current && !ee;
        (b.value !== void 0 && b.value === ne || ue) && D(j);
      },
      [b.value]
    ), re = o === "popper" ? jo : qi, ae = re === jo ? {
      side: a,
      sideOffset: c,
      align: d,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: g,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: m,
      avoidCollisions: x
    } : {};
    return /* @__PURE__ */ u.jsx(
      Ki,
      {
        scope: n,
        content: y,
        viewport: R,
        onViewportChange: N,
        itemRefCallback: X,
        selectedItem: E,
        onItemLeave: q,
        itemTextRefCallback: ie,
        focusSelectedItem: Y,
        selectedItemText: _,
        position: o,
        isPositioned: F,
        searchRef: $,
        children: /* @__PURE__ */ u.jsx(Hn, { as: vp, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
          Mn,
          {
            asChild: !0,
            trapped: b.open,
            onMountAutoFocus: (j) => {
              j.preventDefault();
            },
            onUnmountAutoFocus: pe(r, (j) => {
              b.trigger?.focus({ preventScroll: !0 }), j.preventDefault();
            }),
            children: /* @__PURE__ */ u.jsx(
              Dn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: s,
                onFocusOutside: (j) => j.preventDefault(),
                onDismiss: () => b.onOpenChange(!1),
                children: /* @__PURE__ */ u.jsx(
                  re,
                  {
                    role: "listbox",
                    id: b.contentId,
                    "data-state": b.open ? "open" : "closed",
                    dir: b.dir,
                    onContextMenu: (j) => j.preventDefault(),
                    ...w,
                    ...ae,
                    onPlaced: () => Z(!0),
                    ref: S,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: pe(w.onKeyDown, (j) => {
                      const ne = j.ctrlKey || j.altKey || j.metaKey;
                      if (j.key === "Tab" && j.preventDefault(), !ne && j.key.length === 1 && P(j.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(j.key)) {
                        let ue = K().filter((ce) => !ce.disabled).map((ce) => ce.ref.current);
                        if (["ArrowUp", "End"].includes(j.key) && (ue = ue.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(j.key)) {
                          const ce = j.target, se = ue.indexOf(ce);
                          ue = ue.slice(se + 1);
                        }
                        setTimeout(() => W(ue)), j.preventDefault();
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
Xi.displayName = gp;
var xp = "SelectItemAlignedPosition", qi = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, i = tt(gt, n), s = nt(gt, n), [a, c] = l.useState(null), [d, f] = l.useState(null), p = we(t, (S) => f(S)), g = Un(n), h = l.useRef(!1), v = l.useRef(!0), { viewport: m, selectedItem: x, selectedItemText: w, focusSelectedItem: b } = s, y = l.useCallback(() => {
    if (i.trigger && i.valueNode && a && d && m && x && w) {
      const S = i.trigger.getBoundingClientRect(), E = d.getBoundingClientRect(), L = i.valueNode.getBoundingClientRect(), _ = w.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const ce = _.left - E.left, se = L.left - ce, be = S.left - se, ye = S.width + be, st = Math.max(ye, E.width), Ye = window.innerWidth - Te, it = _r(se, [
          Te,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Te, Ye - st)
        ]);
        a.style.minWidth = ye + "px", a.style.left = it + "px";
      } else {
        const ce = E.right - _.right, se = window.innerWidth - L.right - ce, be = window.innerWidth - S.right - se, ye = S.width + be, st = Math.max(ye, E.width), Ye = window.innerWidth - Te, it = _r(se, [
          Te,
          Math.max(Te, Ye - st)
        ]);
        a.style.minWidth = ye + "px", a.style.right = it + "px";
      }
      const D = g(), K = window.innerHeight - Te * 2, F = m.scrollHeight, Z = window.getComputedStyle(d), J = parseInt(Z.borderTopWidth, 10), W = parseInt(Z.paddingTop, 10), Y = parseInt(Z.borderBottomWidth, 10), H = parseInt(Z.paddingBottom, 10), Q = J + W + F + H + Y, $ = Math.min(x.offsetHeight * 5, Q), P = window.getComputedStyle(m), X = parseInt(P.paddingTop, 10), q = parseInt(P.paddingBottom, 10), ie = S.top + S.height / 2 - Te, re = K - ie, ae = x.offsetHeight / 2, j = x.offsetTop + ae, ne = J + W + j, ee = Q - ne;
      if (ne <= ie) {
        const ce = D.length > 0 && x === D[D.length - 1].ref.current;
        a.style.bottom = "0px";
        const se = d.clientHeight - m.offsetTop - m.offsetHeight, be = Math.max(
          re,
          ae + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ce ? q : 0) + se + Y
        ), ye = ne + be;
        a.style.height = ye + "px";
      } else {
        const ce = D.length > 0 && x === D[0].ref.current;
        a.style.top = "0px";
        const be = Math.max(
          ie,
          J + m.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ce ? X : 0) + ae
        ) + ee;
        a.style.height = be + "px", m.scrollTop = ne - ie + m.offsetTop;
      }
      a.style.margin = `${Te}px 0`, a.style.minHeight = $ + "px", a.style.maxHeight = K + "px", o?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    g,
    i.trigger,
    i.valueNode,
    a,
    d,
    m,
    x,
    w,
    i.dir,
    o
  ]);
  Ee(() => y(), [y]);
  const [C, R] = l.useState();
  Ee(() => {
    d && R(window.getComputedStyle(d).zIndex);
  }, [d]);
  const N = l.useCallback(
    (S) => {
      S && v.current === !0 && (y(), b?.(), v.current = !1);
    },
    [y, b]
  );
  return /* @__PURE__ */ u.jsx(
    wp,
    {
      scope: n,
      contentWrapper: a,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: N,
      children: /* @__PURE__ */ u.jsx(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: C
          },
          children: /* @__PURE__ */ u.jsx(
            ge.div,
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
qi.displayName = xp;
var bp = "SelectPopperPosition", jo = l.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = Te,
    ...i
  } = e, s = Gn(n);
  return /* @__PURE__ */ u.jsx(
    Ai,
    {
      ...s,
      ...i,
      ref: t,
      align: o,
      collisionPadding: r,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...i.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
jo.displayName = bp;
var [wp, nr] = Lt(gt, {}), _o = "SelectViewport", Zi = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, i = nt(_o, n), s = nr(_o, n), a = we(t, i.onViewportChange), c = l.useRef(0);
    return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ u.jsx(Bn.Slot, { scope: n, children: /* @__PURE__ */ u.jsx(
        ge.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: a,
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
          onScroll: pe(r.onScroll, (d) => {
            const f = d.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: g } = s;
            if (g?.current && p) {
              const h = Math.abs(c.current - f.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - Te * 2, m = parseFloat(p.style.minHeight), x = parseFloat(p.style.height), w = Math.max(m, x);
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
Zi.displayName = _o;
var Ji = "SelectGroup", [yp, Cp] = Lt(Ji), Sp = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = dt();
    return /* @__PURE__ */ u.jsx(yp, { scope: n, id: r, children: /* @__PURE__ */ u.jsx(ge.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
Sp.displayName = Ji;
var Qi = "SelectLabel", Ep = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Cp(Qi, n);
    return /* @__PURE__ */ u.jsx(ge.div, { id: r.id, ...o, ref: t });
  }
);
Ep.displayName = Qi;
var An = "SelectItem", [kp, ea] = Lt(An), ta = l.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: i,
      ...s
    } = e, a = tt(An, n), c = nt(An, n), d = a.value === o, [f, p] = l.useState(i ?? ""), [g, h] = l.useState(!1), v = we(
      t,
      (b) => c.itemRefCallback?.(b, o, r)
    ), m = dt(), x = l.useRef("touch"), w = () => {
      r || (a.onValueChange(o), a.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ u.jsx(
      kp,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: m,
        isSelected: d,
        onItemTextChange: l.useCallback((b) => {
          p((y) => y || (b?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ u.jsx(
          Bn.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: f,
            children: /* @__PURE__ */ u.jsx(
              ge.div,
              {
                role: "option",
                "aria-labelledby": m,
                "data-highlighted": g ? "" : void 0,
                "aria-selected": d && g,
                "data-state": d ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...s,
                ref: v,
                onFocus: pe(s.onFocus, () => h(!0)),
                onBlur: pe(s.onBlur, () => h(!1)),
                onClick: pe(s.onClick, () => {
                  x.current !== "mouse" && w();
                }),
                onPointerUp: pe(s.onPointerUp, () => {
                  x.current === "mouse" && w();
                }),
                onPointerDown: pe(s.onPointerDown, (b) => {
                  x.current = b.pointerType;
                }),
                onPointerMove: pe(s.onPointerMove, (b) => {
                  x.current = b.pointerType, r ? c.onItemLeave?.() : x.current === "mouse" && b.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: pe(s.onPointerLeave, (b) => {
                  b.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: pe(s.onKeyDown, (b) => {
                  c.searchRef?.current !== "" && b.key === " " || (up.includes(b.key) && w(), b.key === " " && b.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ta.displayName = An;
var Ut = "SelectItemText", na = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...i } = e, s = tt(Ut, n), a = nt(Ut, n), c = ea(Ut, n), d = mp(Ut, n), [f, p] = l.useState(null), g = we(
      t,
      (w) => p(w),
      c.onItemTextChange,
      (w) => a.itemTextRefCallback?.(w, c.value, c.disabled)
    ), h = f?.textContent, v = l.useMemo(
      () => /* @__PURE__ */ u.jsx("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: m, onNativeOptionRemove: x } = d;
    return Ee(() => (m(v), () => x(v)), [m, x, v]), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(ge.span, { id: c.textId, ...i, ref: g }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? Dt.createPortal(i.children, s.valueNode) : null
    ] });
  }
);
na.displayName = Ut;
var oa = "SelectItemIndicator", Rp = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return ea(oa, n).isSelected ? /* @__PURE__ */ u.jsx(ge.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Rp.displayName = oa;
var Do = "SelectScrollUpButton", Pp = l.forwardRef((e, t) => {
  const n = nt(Do, e.__scopeSelect), o = nr(Do, e.__scopeSelect), [r, i] = l.useState(!1), s = we(t, o.onScrollButtonChange);
  return Ee(() => {
    if (n.viewport && n.isPositioned) {
      let a = function() {
        const d = c.scrollTop > 0;
        i(d);
      };
      const c = n.viewport;
      return a(), c.addEventListener("scroll", a), () => c.removeEventListener("scroll", a);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    ra,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: c } = n;
        a && c && (a.scrollTop = a.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Pp.displayName = Do;
var Mo = "SelectScrollDownButton", Np = l.forwardRef((e, t) => {
  const n = nt(Mo, e.__scopeSelect), o = nr(Mo, e.__scopeSelect), [r, i] = l.useState(!1), s = we(t, o.onScrollButtonChange);
  return Ee(() => {
    if (n.viewport && n.isPositioned) {
      let a = function() {
        const d = c.scrollHeight - c.clientHeight, f = Math.ceil(c.scrollTop) < d;
        i(f);
      };
      const c = n.viewport;
      return a(), c.addEventListener("scroll", a), () => c.removeEventListener("scroll", a);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    ra,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: c } = n;
        a && c && (a.scrollTop = a.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Np.displayName = Mo;
var ra = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, i = nt("SelectScrollButton", n), s = l.useRef(null), a = Un(n), c = l.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return l.useEffect(() => () => c(), [c]), Ee(() => {
    a().find((f) => f.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [a]), /* @__PURE__ */ u.jsx(
    ge.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: pe(r.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(o, 50));
      }),
      onPointerMove: pe(r.onPointerMove, () => {
        i.onItemLeave?.(), s.current === null && (s.current = window.setInterval(o, 50));
      }),
      onPointerLeave: pe(r.onPointerLeave, () => {
        c();
      })
    }
  );
}), Tp = "SelectSeparator", Ap = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ u.jsx(ge.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
Ap.displayName = Tp;
var $o = "SelectArrow", Op = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Gn(n), i = tt($o, n), s = nt($o, n);
    return i.open && s.position === "popper" ? /* @__PURE__ */ u.jsx(Oi, { ...r, ...o, ref: t }) : null;
  }
);
Op.displayName = $o;
var Ip = "SelectBubbleInput", sa = l.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = l.useRef(null), i = we(o, r), s = yf(t);
    return l.useEffect(() => {
      const a = r.current;
      if (!a) return;
      const c = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(a, t), a.dispatchEvent(p);
      }
    }, [s, t]), /* @__PURE__ */ u.jsx(
      ge.select,
      {
        ...n,
        style: { ...Ii, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
sa.displayName = Ip;
function ia(e) {
  return e === "" || e === void 0;
}
function aa(e) {
  const t = pt(e), n = l.useRef(""), o = l.useRef(0), r = l.useCallback(
    (s) => {
      const a = n.current + s;
      t(a), (function c(d) {
        n.current = d, window.clearTimeout(o.current), d !== "" && (o.current = window.setTimeout(() => c(""), 1e3));
      })(a);
    },
    [t]
  ), i = l.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return l.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, i];
}
function la(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = jp(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((d) => d !== n));
  const c = s.find(
    (d) => d.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function jp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var _p = Wi, Dp = Hi, Mp = Ui, $p = Gi, Lp = Yi, zp = Zi, Fp = ta, Wp = na;
const Yn = l.createContext({ size: "base" }), or = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" }
}, Vp = ke(
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
function Hp({ children: e, disabled: t, variant: n, size: o = "base", ...r }) {
  const i = t || n === "disabled";
  return /* @__PURE__ */ u.jsx(Yn.Provider, { value: { size: o }, children: /* @__PURE__ */ u.jsx(_p, { disabled: i, ...r, children: e }) });
}
function Bp({ className: e, variant: t, leftIcon: n, children: o, slotId: r, ...i }) {
  const { size: s } = l.useContext(Yn), a = or[s], c = l.useId();
  return /* @__PURE__ */ u.jsxs(
    Dp,
    {
      "data-slot": "select-trigger",
      "data-slot-id": r ?? c,
      className: oe(Vp({ variant: t }), a.height, a.rounded, a.px, a.gap, a.text, e),
      ...i,
      children: [
        /* @__PURE__ */ u.jsxs("span", { className: oe("flex items-center flex-1 min-w-0", a.gap), children: [
          n && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 text-black-55", a.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${n}` }) }),
          o
        ] }),
        /* @__PURE__ */ u.jsx($p, { asChild: !0, children: /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 ml-auto", a.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-chevron-down" }) }) })
      ]
    }
  );
}
function Up({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = l.useContext(Yn), i = or[r], s = l.useId();
  return /* @__PURE__ */ u.jsx(
    Lp,
    {
      "data-slot": "select-content",
      "data-slot-id": n ?? s,
      position: "popper",
      sideOffset: 4,
      className: oe(
        "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
        "w-[var(--radix-select-trigger-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        i.rounded,
        e
      ),
      ...o,
      children: /* @__PURE__ */ u.jsx(zp, { className: "flex flex-col p-1 group/options", children: t })
    }
  );
}
function Gp({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = l.useContext(Yn), i = or[r], s = l.useId();
  return /* @__PURE__ */ u.jsx(
    Fp,
    {
      "data-slot": "select-item",
      "data-slot-id": n ?? s,
      className: oe(
        "relative flex cursor-pointer select-none items-center outline-none transition-all",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        "data-[state=checked]:bg-neutral-1 group-hover/options:data-[state=checked]:bg-transparent",
        "hover:data-[state=checked]:bg-neutral-1",
        i.itemHeight,
        i.itemRounded,
        i.itemPx,
        i.text,
        e
      ),
      ...o,
      children: /* @__PURE__ */ u.jsx(Wp, { children: t })
    }
  );
}
function Yp({ className: e, slotId: t, ...n }) {
  const o = l.useId();
  return /* @__PURE__ */ u.jsx(Mp, { "data-slot": "select-value", "data-slot-id": t ?? o, className: e, ...n });
}
const Kp = ke(
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
function Ig({
  className: e,
  variant: t,
  size: n,
  onClick: o,
  children: r,
  slotId: i,
  ...s
}) {
  const a = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "navigation-item",
      "data-slot-id": i ?? a,
      className: oe(Kp({ variant: t, size: n }), e),
      onClick: (c) => {
        c.stopPropagation(), o?.();
      },
      ...s,
      children: r
    }
  );
}
const Xp = ke("flex w-max min-w-full flex-col bg-white-100", {
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
function jg({ className: e, variant: t, radius: n, data: o, children: r, slotId: i, ...s }) {
  const a = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "table",
      "data-slot-id": i ?? a,
      className: oe(Xp({ variant: t, radius: n, className: e })),
      ...s,
      children: r
    }
  );
}
function Ve(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function ss(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function qp(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = ss(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : ss(e[r], null);
        }
      };
  };
}
function bt(...e) {
  return l.useCallback(qp(...e), e);
}
function ca(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = l.createContext(s);
    a.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || a, x = l.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || a, v = l.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => l.createContext(s));
    return function(a) {
      const c = a?.[e] || i;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return r.scopeName = e, [o, Zp(r, ...t)];
}
function Zp(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((a, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...a, ...p };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Jp(e) {
  const t = l.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, a = !1;
    const c = [];
    is(r) && typeof gn == "function" && (r = gn(r._payload)), l.Children.forEach(r, (g) => {
      if (om(g)) {
        a = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        is(v) && typeof gn == "function" && (v = gn(v._payload)), s = em(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = l.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !a && l.Children.count(r) === 1 && l.isValidElement(r) && (s = r)
    );
    const d = s ? nm(s) : void 0, f = bt(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          a ? am(e) : im(e)
        );
      return r;
    }
    const p = tm(i, s.props ?? {});
    return s.type !== l.Fragment && (p.ref = o ? f : d), l.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var ua = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Qp(e) {
  const t = (n) => "child" in n ? n.children(n.child) : n.children;
  return t.displayName = `${e}.Slottable`, t.__radixId = ua, t;
}
var em = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return l.isValidElement(n) ? l.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return l.isValidElement(t) ? t : null;
};
function tm(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const c = i(...a);
      return r(...a), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function nm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function om(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ua;
}
var rm = /* @__PURE__ */ Symbol.for("react.lazy");
function is(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === rm && "_payload" in e && sm(e._payload);
}
function sm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var im = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, am = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, gn = l[" use ".trim().toString()], lm = [
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
], ot = lm.reduce((e, t) => {
  const n = /* @__PURE__ */ Jp(`Primitive.${t}`), o = l.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function cm(e, t) {
  e && Dt.flushSync(() => e.dispatchEvent(t));
}
function Kn(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function um(e, t = globalThis?.document) {
  const n = Kn(e);
  l.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var dm = "DismissableLayer", Lo = "dismissableLayer.update", fm = "dismissableLayer.pointerDownOutside", pm = "dismissableLayer.focusOutside", as, da = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), fa = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: a,
      ...c
    } = e, d = l.useContext(da), [f, p] = l.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = l.useState({}), v = bt(t, (S) => p(S)), m = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), w = m.indexOf(x), b = f ? m.indexOf(f) : -1, y = d.layersWithOutsidePointerEventsDisabled.size > 0, C = b >= w, R = gm((S) => {
      const E = S.target, L = [...d.branches].some((_) => _.contains(E));
      !C || L || (r?.(S), s?.(S), S.defaultPrevented || a?.());
    }, g), N = vm((S) => {
      const E = S.target;
      [...d.branches].some((_) => _.contains(E)) || (i?.(S), s?.(S), S.defaultPrevented || a?.());
    }, g);
    return um((S) => {
      b === d.layers.size - 1 && (o?.(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, g), l.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (as = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), ls(), () => {
          n && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (g.body.style.pointerEvents = as));
        };
    }, [f, g, n, d]), l.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), ls());
    }, [f, d]), l.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Lo, S), () => document.removeEventListener(Lo, S);
    }, []), /* @__PURE__ */ u.jsx(
      ot.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ve(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: Ve(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: Ve(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
fa.displayName = dm;
var mm = "DismissableLayerBranch", hm = l.forwardRef((e, t) => {
  const n = l.useContext(da), o = l.useRef(null), r = bt(t, o);
  return l.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(ot.div, { ...e, ref: r });
});
hm.displayName = mm;
function gm(e, t = globalThis?.document) {
  const n = Kn(e), o = l.useRef(!1), r = l.useRef(() => {
  });
  return l.useEffect(() => {
    const i = (a) => {
      if (a.target && !o.current) {
        let c = function() {
          pa(
            fm,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function vm(e, t = globalThis?.document) {
  const n = Kn(e), o = l.useRef(!1);
  return l.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && pa(pm, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function ls() {
  const e = new CustomEvent(Lo);
  document.dispatchEvent(e);
}
function pa(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? cm(r, i) : r.dispatchEvent(i);
}
var He = globalThis?.document ? l.useLayoutEffect : () => {
}, xm = l[" useId ".trim().toString()] || (() => {
}), bm = 0;
function wm(e) {
  const [t, n] = l.useState(xm());
  return He(() => {
    n((o) => o ?? String(bm++));
  }, [e]), t ? `radix-${t}` : "";
}
var ym = "Arrow", ma = l.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ u.jsx(
    ot.svg,
    {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ma.displayName = ym;
var Cm = ma;
function Sm(e) {
  const [t, n] = l.useState(void 0);
  return He(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let s, a;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          s = d.inlineSize, a = d.blockSize;
        } else
          s = e.offsetWidth, a = e.offsetHeight;
        n({ width: s, height: a });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var rr = "Popper", [ha, ga] = ca(rr), [Em, va] = ha(rr), xa = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = l.useState(null), [i, s] = l.useState(void 0);
  return /* @__PURE__ */ u.jsx(
    Em,
    {
      scope: t,
      anchor: o,
      onAnchorChange: r,
      placementState: i,
      setPlacementState: s,
      children: n
    }
  );
};
xa.displayName = rr;
var ba = "PopperAnchor", wa = l.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = va(ba, n), s = l.useRef(null), a = i.onAnchorChange, c = l.useCallback(
      (v) => {
        s.current = v, v && a(v);
      },
      [a]
    ), d = bt(t, c), f = l.useRef(null);
    l.useEffect(() => {
      if (!o)
        return;
      const v = f.current;
      f.current = o.current, v !== f.current && a(f.current);
    });
    const p = i.placementState && ir(i.placementState), g = p?.[0], h = p?.[1];
    return o ? null : /* @__PURE__ */ u.jsx(
      ot.div,
      {
        "data-radix-popper-side": g,
        "data-radix-popper-align": h,
        ...r,
        ref: d
      }
    );
  }
);
wa.displayName = ba;
var sr = "PopperContent", [km, Rm] = ha(sr), ya = l.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: a = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d,
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = va(sr, n), [w, b] = l.useState(null), y = bt(t, (ne) => b(ne)), [C, R] = l.useState(null), N = Sm(C), S = N?.width ?? 0, E = N?.height ?? 0, L = o + (i !== "center" ? "-" + i : ""), _ = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, D = d ? Array.isArray(d) ? d : [d] : void 0, K = D !== void 0 && D.length > 0, F = {
      padding: _,
      boundary: D?.filter(Nm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: K
    }, { refs: Z, floatingStyles: J, placement: W, isPositioned: Y, middlewareData: H } = di({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...ne) => ci(...ne, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        fi({ mainAxis: r + E, alignmentAxis: s }),
        c && pi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? mi() : void 0,
          ...F
        }),
        c && hi({ ...F }),
        gi({
          ...F,
          apply: ({ elements: ne, rects: ee, availableWidth: ue, availableHeight: ce }) => {
            const { width: se, height: be } = ee.reference, ye = ne.floating.style;
            ye.setProperty("--radix-popper-available-width", `${ue}px`), ye.setProperty("--radix-popper-available-height", `${ce}px`), ye.setProperty("--radix-popper-anchor-width", `${se}px`), ye.setProperty("--radix-popper-anchor-height", `${be}px`);
          }
        }),
        C && xi({ element: C, padding: a }),
        Tm({ arrowWidth: S, arrowHeight: E }),
        g && vi({ strategy: "referenceHidden", ...F })
      ]
    }), Q = x.setPlacementState;
    He(() => (Q(W), () => {
      Q(void 0);
    }), [W, Q]);
    const [$, P] = ir(W), X = Kn(v);
    He(() => {
      Y && X?.();
    }, [Y, X]);
    const q = H.arrow?.x, ie = H.arrow?.y, re = H.arrow?.centerOffset !== 0, [ae, j] = l.useState();
    return He(() => {
      w && j(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Z.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...J,
          transform: Y ? J.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ae,
          "--radix-popper-transform-origin": [
            H.transformOrigin?.x,
            H.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...H.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u.jsx(
          km,
          {
            scope: n,
            placedSide: $,
            placedAlign: P,
            onArrowChange: R,
            arrowX: q,
            arrowY: ie,
            shouldHideArrow: re,
            children: /* @__PURE__ */ u.jsx(
              ot.div,
              {
                "data-side": $,
                "data-align": P,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: Y ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ya.displayName = sr;
var Ca = "PopperArrow", Pm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Sa = l.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = Rm(Ca, o), s = Pm[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ u.jsx(
          Cm,
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
Sa.displayName = Ca;
function Nm(e) {
  return e !== null;
}
var Tm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, a = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [d, f] = ir(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + a / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return d === "bottom" ? (v = s ? p : `${g}px`, m = `${-c}px`) : d === "top" ? (v = s ? p : `${g}px`, m = `${o.floating.height + c}px`) : d === "right" ? (v = `${-c}px`, m = s ? p : `${h}px`) : d === "left" && (v = `${o.floating.width + c}px`, m = s ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function ir(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Am = xa, Om = wa, Im = ya, jm = Sa, _m = "Portal", Ea = l.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = l.useState(!1);
  He(() => i(!0), []);
  const s = n || r && globalThis?.document?.body;
  return s ? Dt.createPortal(/* @__PURE__ */ u.jsx(ot.div, { ...o, ref: t }), s) : null;
});
Ea.displayName = _m;
function Dm(e, t) {
  return l.useReducer((n, o) => t[n][o] ?? n, e);
}
var ar = (e) => {
  const { present: t, children: n } = e, o = Mm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : l.Children.only(n), i = $m(o.ref, Lm(r));
  return typeof n == "function" || o.isPresent ? l.cloneElement(r, { ref: i }) : null;
};
ar.displayName = "Presence";
function Mm(e) {
  const [t, n] = l.useState(), o = l.useRef(null), r = l.useRef(e), i = l.useRef("none"), s = e ? "mounted" : "unmounted", [a, c] = Dm(s, {
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
  return l.useEffect(() => {
    const d = vn(o.current);
    i.current = a === "mounted" ? d : "none";
  }, [a]), He(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = vn(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), He(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = vn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (i.current = vn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: l.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function cs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function $m(...e) {
  const t = l.useRef(e);
  return t.current = e, l.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const i = o.map((s) => {
      const a = cs(s, n);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const a = i[s];
          typeof a == "function" ? a() : cs(o[s], null);
        }
      };
  }, []);
}
function vn(e) {
  return e?.animationName || "none";
}
function Lm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var zm = l[" useInsertionEffect ".trim().toString()] || He;
function Fm({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = Wm({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : r;
  {
    const f = l.useRef(e !== void 0);
    l.useEffect(() => {
      const p = f.current;
      p !== a && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = a;
    }, [a, o]);
  }
  const d = l.useCallback(
    (f) => {
      if (a) {
        const p = Vm(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [a, e, i, s]
  );
  return [c, d];
}
function Wm({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = l.useState(e), r = l.useRef(n), i = l.useRef(t);
  return zm(() => {
    i.current = t;
  }, [t]), l.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function Vm(e) {
  return typeof e == "function";
}
var Hm = Object.freeze({
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
}), Bm = "VisuallyHidden", ka = l.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    ot.span,
    {
      ...e,
      ref: t,
      style: { ...Hm, ...e.style }
    }
  )
);
ka.displayName = Bm;
var Um = ka, [Xn] = ca("Tooltip", [
  ga
]), qn = ga(), Ra = "TooltipProvider", Gm = 700, zo = "tooltip.open", [Ym, lr] = Xn(Ra), Pa = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Gm,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: i
  } = e, s = l.useRef(!0), a = l.useRef(!1), c = l.useRef(0);
  return l.useEffect(() => {
    const d = c.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u.jsx(
    Ym,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: l.useCallback(() => {
        o <= 0 || (window.clearTimeout(c.current), s.current = !1);
      }, [o]),
      onClose: l.useCallback(() => {
        o <= 0 || (window.clearTimeout(c.current), c.current = window.setTimeout(
          () => s.current = !0,
          o
        ));
      }, [o]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: l.useCallback((d) => {
        a.current = d;
      }, []),
      disableHoverableContent: r,
      children: i
    }
  );
};
Pa.displayName = Ra;
var Yt = "Tooltip", [Km, Jt] = Xn(Yt), Na = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    disableHoverableContent: s,
    delayDuration: a
  } = e, c = lr(Yt, e.__scopeTooltip), d = qn(t), [f, p] = l.useState(null), g = wm(), h = l.useRef(0), v = s ?? c.disableHoverableContent, m = a ?? c.delayDuration, x = l.useRef(!1), [w, b] = Fm({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (c.onOpen(), document.dispatchEvent(new CustomEvent(zo))) : c.onClose(), i?.(S);
    },
    caller: Yt
  }), y = l.useMemo(() => w ? x.current ? "delayed-open" : "instant-open" : "closed", [w]), C = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, x.current = !1, b(!0);
  }, [b]), R = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), N = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      x.current = !0, b(!0), h.current = 0;
    }, m);
  }, [m, b]);
  return l.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ u.jsx(Am, { ...d, children: /* @__PURE__ */ u.jsx(
    Km,
    {
      scope: t,
      contentId: g,
      open: w,
      stateAttribute: y,
      trigger: f,
      onTriggerChange: p,
      onTriggerEnter: l.useCallback(() => {
        c.isOpenDelayedRef.current ? N() : C();
      }, [c.isOpenDelayedRef, N, C]),
      onTriggerLeave: l.useCallback(() => {
        v ? R() : (window.clearTimeout(h.current), h.current = 0);
      }, [R, v]),
      onOpen: C,
      onClose: R,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
Na.displayName = Yt;
var Fo = "TooltipTrigger", Ta = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Jt(Fo, n), i = lr(Fo, n), s = qn(n), a = l.useRef(null), c = bt(t, a, r.onTriggerChange), d = l.useRef(!1), f = l.useRef(!1), p = l.useCallback(() => d.current = !1, []);
    return l.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ u.jsx(Om, { asChild: !0, ...s, children: /* @__PURE__ */ u.jsx(
      ot.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: c,
        onPointerMove: Ve(e.onPointerMove, (g) => {
          g.pointerType !== "touch" && !f.current && !i.isPointerInTransitRef.current && (r.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: Ve(e.onPointerLeave, () => {
          r.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: Ve(e.onPointerDown, () => {
          r.open && r.onClose(), d.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: Ve(e.onFocus, () => {
          d.current || r.onOpen();
        }),
        onBlur: Ve(e.onBlur, r.onClose),
        onClick: Ve(e.onClick, r.onClose)
      }
    ) });
  }
);
Ta.displayName = Fo;
var cr = "TooltipPortal", [Xm, qm] = Xn(cr, {
  forceMount: void 0
}), Aa = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, i = Jt(cr, t);
  return /* @__PURE__ */ u.jsx(Xm, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(ar, { present: n || i.open, children: /* @__PURE__ */ u.jsx(Ea, { asChild: !0, container: r, children: o }) }) });
};
Aa.displayName = cr;
var jt = "TooltipContent", Oa = l.forwardRef(
  (e, t) => {
    const n = qm(jt, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...i } = e, s = Jt(jt, e.__scopeTooltip);
    return /* @__PURE__ */ u.jsx(ar, { present: o || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ u.jsx(Ia, { side: r, ...i, ref: t }) : /* @__PURE__ */ u.jsx(Zm, { side: r, ...i, ref: t }) });
  }
), Zm = l.forwardRef((e, t) => {
  const n = Jt(jt, e.__scopeTooltip), o = lr(jt, e.__scopeTooltip), r = l.useRef(null), i = bt(t, r), [s, a] = l.useState(null), { trigger: c, onClose: d } = n, f = r.current, { onPointerInTransitChange: p } = o, g = l.useCallback(() => {
    a(null), p(!1);
  }, [p]), h = l.useCallback(
    (v, m) => {
      const x = v.currentTarget, w = { x: v.clientX, y: v.clientY }, b = th(w, x.getBoundingClientRect()), y = nh(w, b), C = oh(m.getBoundingClientRect()), R = sh([...y, ...C]);
      a(R), p(!0);
    },
    [p]
  );
  return l.useEffect(() => () => g(), [g]), l.useEffect(() => {
    if (c && f) {
      const v = (x) => h(x, f), m = (x) => h(x, c);
      return c.addEventListener("pointerleave", v), f.addEventListener("pointerleave", m), () => {
        c.removeEventListener("pointerleave", v), f.removeEventListener("pointerleave", m);
      };
    }
  }, [c, f, h, g]), l.useEffect(() => {
    if (s) {
      const v = (m) => {
        const x = m.target, w = { x: m.clientX, y: m.clientY }, b = c?.contains(x) || f?.contains(x), y = !rh(w, s);
        b ? g() : y && (g(), d());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, f, s, d, g]), /* @__PURE__ */ u.jsx(Ia, { ...e, ref: i });
}), [Jm, Qm] = Xn(Yt, { isInside: !1 }), eh = /* @__PURE__ */ Qp("TooltipContent"), Ia = l.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      ...a
    } = e, c = Jt(jt, n), d = qn(n), { onClose: f } = c;
    return l.useEffect(() => (document.addEventListener(zo, f), () => document.removeEventListener(zo, f)), [f]), l.useEffect(() => {
      if (c.trigger) {
        const p = (g) => {
          g.target instanceof Node && g.target.contains(c.trigger) && f();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [c.trigger, f]), /* @__PURE__ */ u.jsx(
      fa,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ u.jsxs(
          Im,
          {
            "data-state": c.stateAttribute,
            ...d,
            ...a,
            ref: t,
            style: {
              ...a.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ u.jsx(eh, { children: o }),
              /* @__PURE__ */ u.jsx(Jm, { scope: n, isInside: !0, children: /* @__PURE__ */ u.jsx(Um, { id: c.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Oa.displayName = jt;
var ja = "TooltipArrow", _a = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = qn(n);
    return Qm(
      ja,
      n
    ).isInside ? null : /* @__PURE__ */ u.jsx(jm, { ...r, ...o, ref: t });
  }
);
_a.displayName = ja;
function th(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), i = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, i)) {
    case i:
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
function nh(e, t, n = 5) {
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
function oh(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function rh(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i], c = t[s], d = a.x, f = a.y, p = c.x, g = c.y;
    f > o != g > o && n < (p - d) * (o - f) / (g - f) + d && (r = !r);
  }
  return r;
}
function sh(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), ih(t);
}
function ih(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1], s = t[t.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1], s = n[n.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var ah = Pa, lh = Na, ch = Ta, uh = Aa, dh = Oa, fh = _a;
const ph = ke(
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
function mh({ children: e, delayDuration: t = 300, ...n }) {
  return /* @__PURE__ */ u.jsx(ah, { delayDuration: t, ...n, children: e });
}
function Zn({ children: e, ...t }) {
  return /* @__PURE__ */ u.jsx(lh, { ...t, children: e });
}
const Jn = ch;
function Qn({
  className: e,
  size: t,
  sideOffset: n = 4,
  children: o,
  slotId: r,
  ...i
}) {
  const s = l.useId();
  return /* @__PURE__ */ u.jsx(uh, { children: /* @__PURE__ */ u.jsxs(
    dh,
    {
      "data-slot": "tooltip-content",
      "data-slot-id": r ?? s,
      sideOffset: n,
      className: oe(ph({ size: t }), e),
      ...i,
      children: [
        o,
        /* @__PURE__ */ u.jsx(
          fh,
          {
            "data-slot": "tooltip-arrow",
            "data-slot-id": `${r ?? s}-arrow`,
            className: "fill-black-85",
            width: t === "lg" ? 12 : 8,
            height: t === "lg" ? 6 : 4
          }
        )
      ]
    }
  ) });
}
function hh(e, t) {
  return l.useReducer((n, o) => t[n][o] ?? n, e);
}
var zt = (e) => {
  const { present: t, children: n } = e, o = gh(t), r = typeof n == "function" ? n({ present: o.isPresent }) : l.Children.only(n), i = we(o.ref, vh(r));
  return typeof n == "function" || o.isPresent ? l.cloneElement(r, { ref: i }) : null;
};
zt.displayName = "Presence";
function gh(e) {
  const [t, n] = l.useState(), o = l.useRef(null), r = l.useRef(e), i = l.useRef("none"), s = e ? "mounted" : "unmounted", [a, c] = hh(s, {
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
  return l.useEffect(() => {
    const d = xn(o.current);
    i.current = a === "mounted" ? d : "none";
  }, [a]), Ee(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = xn(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Ee(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = xn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (i.current = xn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: l.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function xn(e) {
  return e?.animationName || "none";
}
function vh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var eo = "Popover", [Da] = qt(eo, [
  Wn
]), Qt = Wn(), [xh, rt] = Da(eo), Ma = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    modal: s = !1
  } = e, a = Qt(t), c = l.useRef(null), [d, f] = l.useState(!1), [p, g] = Tn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: eo
  });
  return /* @__PURE__ */ u.jsx(Ti, { ...a, children: /* @__PURE__ */ u.jsx(
    xh,
    {
      scope: t,
      contentId: dt(),
      triggerRef: c,
      open: p,
      onOpenChange: g,
      onOpenToggle: l.useCallback(() => g((h) => !h), [g]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: l.useCallback(() => f(!0), []),
      onCustomAnchorRemove: l.useCallback(() => f(!1), []),
      modal: s,
      children: n
    }
  ) });
};
Ma.displayName = eo;
var $a = "PopoverAnchor", bh = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = rt($a, n), i = Qt(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: a } = r;
    return l.useEffect(() => (s(), () => a()), [s, a]), /* @__PURE__ */ u.jsx(Qo, { ...i, ...o, ref: t });
  }
);
bh.displayName = $a;
var La = "PopoverTrigger", za = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = rt(La, n), i = Qt(n), s = we(t, r.triggerRef), a = /* @__PURE__ */ u.jsx(
      ge.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Ba(r.open),
        ...o,
        ref: s,
        onClick: pe(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? a : /* @__PURE__ */ u.jsx(Qo, { asChild: !0, ...i, children: a });
  }
);
za.displayName = La;
var ur = "PopoverPortal", [wh, yh] = Da(ur, {
  forceMount: void 0
}), Fa = (e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, i = rt(ur, t);
  return /* @__PURE__ */ u.jsx(wh, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(zt, { present: n || i.open, children: /* @__PURE__ */ u.jsx(er, { asChild: !0, container: r, children: o }) }) });
};
Fa.displayName = ur;
var _t = "PopoverContent", Wa = l.forwardRef(
  (e, t) => {
    const n = yh(_t, e.__scopePopover), { forceMount: o = n.forceMount, ...r } = e, i = rt(_t, e.__scopePopover);
    return /* @__PURE__ */ u.jsx(zt, { present: o || i.open, children: i.modal ? /* @__PURE__ */ u.jsx(Sh, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(Eh, { ...r, ref: t }) });
  }
);
Wa.displayName = _t;
var Ch = /* @__PURE__ */ Ot("PopoverContent.RemoveScroll"), Sh = l.forwardRef(
  (e, t) => {
    const n = rt(_t, e.__scopePopover), o = l.useRef(null), r = we(t, o), i = l.useRef(!1);
    return l.useEffect(() => {
      const s = o.current;
      if (s) return tr(s);
    }, []), /* @__PURE__ */ u.jsx(Hn, { as: Ch, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
      Va,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: pe(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), i.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: pe(
          e.onPointerDownOutside,
          (s) => {
            const a = s.detail.originalEvent, c = a.button === 0 && a.ctrlKey === !0, d = a.button === 2 || c;
            i.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: pe(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Eh = l.forwardRef(
  (e, t) => {
    const n = rt(_t, e.__scopePopover), o = l.useRef(!1), r = l.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      Va,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          e.onCloseAutoFocus?.(i), i.defaultPrevented || (o.current || n.triggerRef.current?.focus(), i.preventDefault()), o.current = !1, r.current = !1;
        },
        onInteractOutside: (i) => {
          e.onInteractOutside?.(i), i.defaultPrevented || (o.current = !0, i.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const s = i.target;
          n.triggerRef.current?.contains(s) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && r.current && i.preventDefault();
        }
      }
    );
  }
), Va = l.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: o,
      onOpenAutoFocus: r,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: a,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: f,
      ...p
    } = e, g = rt(_t, n), h = Qt(n);
    return Bo(), /* @__PURE__ */ u.jsx(
      Mn,
      {
        asChild: !0,
        loop: !0,
        trapped: o,
        onMountAutoFocus: r,
        onUnmountAutoFocus: i,
        children: /* @__PURE__ */ u.jsx(
          Dn,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: f,
            onEscapeKeyDown: a,
            onPointerDownOutside: c,
            onFocusOutside: d,
            onDismiss: () => g.onOpenChange(!1),
            children: /* @__PURE__ */ u.jsx(
              Ai,
              {
                "data-state": Ba(g.open),
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
), Ha = "PopoverClose", kh = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = rt(Ha, n);
    return /* @__PURE__ */ u.jsx(
      ge.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: pe(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
kh.displayName = Ha;
var Rh = "PopoverArrow", Ph = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = Qt(n);
    return /* @__PURE__ */ u.jsx(Oi, { ...r, ...o, ref: t });
  }
);
Ph.displayName = Rh;
function Ba(e) {
  return e ? "open" : "closed";
}
var Nh = Ma, Th = za, Ah = Fa, Oh = Wa;
const to = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" }
}, Ie = l.createContext({ size: "base", close: () => {
}, isOpen: !1 }), Ih = l.createContext({ isSub: !1, close: () => {
}, open: () => {
}, isOpen: !1, scheduleClose: () => {
}, cancelClose: () => {
} });
function dr({ children: e, size: t = "base", ...n }) {
  const [o, r] = l.useState(n.open ?? !1), i = () => s(!1), s = (a) => {
    r(a), n.onOpenChange?.(a);
  };
  return l.useEffect(() => {
    if (!o) return;
    const a = (c) => {
      c.target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]') || i();
    };
    return window.addEventListener("scroll", a, { capture: !0 }), () => window.removeEventListener("scroll", a, { capture: !0 });
  }, [o]), /* @__PURE__ */ u.jsx(Nh, { ...n, open: n.open ?? o, onOpenChange: s, children: /* @__PURE__ */ u.jsx(Ie.Provider, { value: { size: t, close: i, isOpen: n.open ?? o }, children: e }) });
}
const fr = Th, jh = ke(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
);
function pr({ className: e, sideOffset: t = 4, align: n = "start", slotId: o, ...r }) {
  const { size: i } = l.useContext(Ie), s = to[i], a = l.useId();
  return /* @__PURE__ */ u.jsx(Ah, { children: /* @__PURE__ */ u.jsx(
    Oh,
    {
      "data-slot": "popover-content",
      "data-slot-id": o ?? a,
      sideOffset: t,
      align: n,
      className: oe(
        jh(),
        s.rounded === "rounded" ? "rounded-md" : s.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function us({ className: e, disabled: t, slotId: n, ...o }) {
  const { size: r } = l.useContext(Ie), i = to[r], s = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-item",
      "data-slot-id": n ?? s,
      className: oe(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        i.height,
        i.rounded,
        i.px,
        i.gap,
        i.text,
        e
      ),
      ...o
    }
  );
}
function Re({ className: e, closeOnClick: t = !1, onClick: n, children: o, size: r, slotId: i, ...s }) {
  const { size: a } = l.useContext(Ie), { isSub: c, close: d } = l.useContext(Ih), { close: f } = l.useContext(Ie), p = to[a], g = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-menu-item",
      "data-slot-id": i ?? g,
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
        t ? ((c ? d : f)(), setTimeout(() => n?.(h), 150)) : n?.(h);
      },
      ...s,
      children: o
    }
  );
}
function Kt({ className: e, slotId: t, ...n }) {
  const { size: o } = l.useContext(Ie), r = to[o], i = l.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-label",
      "data-slot-id": t ?? i,
      className: oe("py-1.5 text-black-55", r.px, r.text, e),
      ...n
    }
  );
}
function ft({ className: e, slotId: t, ...n }) {
  const o = l.useId();
  return /* @__PURE__ */ u.jsx("div", { "data-slot": "popover-separator", "data-slot-id": t ?? o, className: oe("-mx-1 my-1 h-px bg-neutral-2", e), ...n });
}
var no = "Dialog", [Ua] = qt(no), [_h, je] = Ua(no), Ga = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    modal: s = !0
  } = e, a = l.useRef(null), c = l.useRef(null), [d, f] = Tn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: no
  });
  return /* @__PURE__ */ u.jsx(
    _h,
    {
      scope: t,
      triggerRef: a,
      contentRef: c,
      contentId: dt(),
      titleId: dt(),
      descriptionId: dt(),
      open: d,
      onOpenChange: f,
      onOpenToggle: l.useCallback(() => f((p) => !p), [f]),
      modal: s,
      children: n
    }
  );
};
Ga.displayName = no;
var Ya = "DialogTrigger", Dh = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = je(Ya, n), i = we(t, r.triggerRef);
    return /* @__PURE__ */ u.jsx(
      ge.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": gr(r.open),
        ...o,
        ref: i,
        onClick: pe(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Dh.displayName = Ya;
var mr = "DialogPortal", [Mh, Ka] = Ua(mr, {
  forceMount: void 0
}), Xa = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, i = je(mr, t);
  return /* @__PURE__ */ u.jsx(Mh, { scope: t, forceMount: n, children: l.Children.map(o, (s) => /* @__PURE__ */ u.jsx(zt, { present: n || i.open, children: /* @__PURE__ */ u.jsx(er, { asChild: !0, container: r, children: s }) })) });
};
Xa.displayName = mr;
var On = "DialogOverlay", qa = l.forwardRef(
  (e, t) => {
    const n = Ka(On, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, i = je(On, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ u.jsx(zt, { present: o || i.open, children: /* @__PURE__ */ u.jsx(Lh, { ...r, ref: t }) }) : null;
  }
);
qa.displayName = On;
var $h = /* @__PURE__ */ Ot("DialogOverlay.RemoveScroll"), Lh = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = je(On, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u.jsx(Hn, { as: $h, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ u.jsx(
        ge.div,
        {
          "data-state": gr(r.open),
          ...o,
          ref: t,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), vt = "DialogContent", Za = l.forwardRef(
  (e, t) => {
    const n = Ka(vt, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, i = je(vt, e.__scopeDialog);
    return /* @__PURE__ */ u.jsx(zt, { present: o || i.open, children: i.modal ? /* @__PURE__ */ u.jsx(zh, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(Fh, { ...r, ref: t }) });
  }
);
Za.displayName = vt;
var zh = l.forwardRef(
  (e, t) => {
    const n = je(vt, e.__scopeDialog), o = l.useRef(null), r = we(t, n.contentRef, o);
    return l.useEffect(() => {
      const i = o.current;
      if (i) return tr(i);
    }, []), /* @__PURE__ */ u.jsx(
      Ja,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: pe(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: pe(e.onPointerDownOutside, (i) => {
          const s = i.detail.originalEvent, a = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || a) && i.preventDefault();
        }),
        onFocusOutside: pe(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), Fh = l.forwardRef(
  (e, t) => {
    const n = je(vt, e.__scopeDialog), o = l.useRef(!1), r = l.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      Ja,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          e.onCloseAutoFocus?.(i), i.defaultPrevented || (o.current || n.triggerRef.current?.focus(), i.preventDefault()), o.current = !1, r.current = !1;
        },
        onInteractOutside: (i) => {
          e.onInteractOutside?.(i), i.defaultPrevented || (o.current = !0, i.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const s = i.target;
          n.triggerRef.current?.contains(s) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && r.current && i.preventDefault();
        }
      }
    );
  }
), Ja = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: i, ...s } = e, a = je(vt, n), c = l.useRef(null), d = we(t, c);
    return Bo(), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        Mn,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: r,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ u.jsx(
            Dn,
            {
              role: "dialog",
              id: a.contentId,
              "aria-describedby": a.descriptionId,
              "aria-labelledby": a.titleId,
              "data-state": gr(a.open),
              ...s,
              ref: d,
              onDismiss: () => a.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Hh, { titleId: a.titleId }),
        /* @__PURE__ */ u.jsx(Uh, { contentRef: c, descriptionId: a.descriptionId })
      ] })
    ] });
  }
), hr = "DialogTitle", Wh = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = je(hr, n);
    return /* @__PURE__ */ u.jsx(ge.h2, { id: r.titleId, ...o, ref: t });
  }
);
Wh.displayName = hr;
var Qa = "DialogDescription", Vh = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = je(Qa, n);
    return /* @__PURE__ */ u.jsx(ge.p, { id: r.descriptionId, ...o, ref: t });
  }
);
Vh.displayName = Qa;
var el = "DialogClose", tl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = je(el, n);
    return /* @__PURE__ */ u.jsx(
      ge.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: pe(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
tl.displayName = el;
function gr(e) {
  return e ? "open" : "closed";
}
var nl = "DialogTitleWarning", [_g, ol] = $u(nl, {
  contentName: vt,
  titleName: hr,
  docsSlug: "dialog"
}), Hh = ({ titleId: e }) => {
  const t = ol(nl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return l.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Bh = "DialogDescriptionWarning", Uh = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${ol(Bh).contentName}}.`;
  return l.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, Gh = Ga, Yh = Xa, Kh = qa, Xh = Za, qh = tl;
const Zh = l.createContext({ size: "base" }), Jh = {
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
}, Qh = Gh, eg = Yh, tg = ke(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
);
function ng({ className: e, overlayClassName: t, size: n = "base", children: o, slotId: r, ...i }) {
  const s = Jh[n], a = l.useId();
  return /* @__PURE__ */ u.jsx(Zh.Provider, { value: { size: n }, children: /* @__PURE__ */ u.jsxs(eg, { children: [
    /* @__PURE__ */ u.jsx(Kh, { className: oe("fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t) }),
    /* @__PURE__ */ u.jsxs(
      Xh,
      {
        "data-slot": "dialog-content",
        "data-slot-id": r ?? a,
        className: oe(
          tg(),
          s.content,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          e
        ),
        ...i,
        children: [
          o,
          /* @__PURE__ */ u.jsx(qh, { asChild: !0, children: /* @__PURE__ */ u.jsx(xe, { variant: "ghost", size: s.close.buttonSize, className: oe("absolute", s.close.position), children: /* @__PURE__ */ u.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ u.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) }) })
        ]
      }
    )
  ] }) });
}
function At({ children: e, className: t, onDoubleClick: n, onClick: o }) {
  const r = l.useRef(null), [i, s] = l.useState(!1);
  return l.useEffect(() => {
    r.current && s(r.current.scrollWidth > r.current.clientWidth);
  }, [e]), i ? /* @__PURE__ */ u.jsxs(Zn, { children: [
    /* @__PURE__ */ u.jsx(Jn, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: r,
        className: t,
        onDoubleClick: n,
        onClick: o,
        children: e
      }
    ) }),
    /* @__PURE__ */ u.jsx(Qn, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: e }) })
  ] }) : /* @__PURE__ */ u.jsx(
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
function rl({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: i, readOnly: s }) {
  return t ? /* @__PURE__ */ u.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (a) => r?.(a.target.value),
      onBlur: () => i?.(),
      onKeyDown: (a) => {
        a.key === "Enter" && a.preventDefault(), a.key === "Escape" && a.preventDefault();
      },
      onFocus: (a) => a.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ u.jsx(
    At,
    {
      className: oe("flex-1 w-full min-h-6 truncate", !s && "cursor-pointer"),
      onDoubleClick: s ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function og({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: i, readOnly: s }) {
  return t ? /* @__PURE__ */ u.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (a) => {
        const c = a.target.value;
        (c === "" || /^-?\d*\.?\d*$/.test(c)) && r?.(c);
      },
      onBlur: () => i?.(),
      onKeyDown: (a) => {
        a.key === "Enter" && a.preventDefault(), a.key === "Escape" && a.preventDefault();
      },
      onFocus: (a) => a.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden text-right",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ u.jsx(
    At,
    {
      className: oe("flex-1 w-full min-h-6 truncate text-right", !s && "cursor-pointer"),
      onDoubleClick: s ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function rg({ value: e, options: t, onChange: n, cellId: o, isCellHovering: r }) {
  const [i, s] = l.useState(String(e)), a = t?.placeholder || "请输入", c = l.useRef(null), d = (f) => {
    s(f.target.value), n?.(f.target.value);
  };
  return l.useEffect(() => {
    r && c.current;
  }, [r]), /* @__PURE__ */ u.jsx("div", { className: "min-w-0 flex-1", "data-input-cell": o, children: /* @__PURE__ */ u.jsx(
    Ze,
    {
      ref: c,
      className: "w-full",
      placeholder: a,
      variant: "basic",
      size: "base",
      value: i,
      onChange: d
    }
  ) });
}
function sg({
  value: e,
  options: t,
  onChange: n,
  onUpdateColumnOptions: o,
  isLocked: r,
  isCellHovering: i,
  onLockCell: s,
  readOnly: a
}) {
  const c = t?.items ?? [], [d, f] = l.useState(!1), [p, g] = l.useState(""), h = l.useMemo(() => c.find((S) => S.value === e)?.label || "", [c, e]), v = l.useMemo(() => {
    if (!p.trim()) return c;
    const N = p.toLowerCase();
    return c.filter((S) => S.label.toLowerCase().includes(N));
  }, [c, p]), m = l.useMemo(() => {
    if (!p.trim()) return !0;
    const N = p.toLowerCase();
    return c.some((S) => S.label.toLowerCase() === N);
  }, [c, p]), x = () => {
    if (!p.trim() || !o) return;
    const N = p.trim(), S = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: N
    };
    f(!1), setTimeout(() => {
      const E = [...c, S];
      o({ ...t, items: E }), n?.(S.value);
    }, 200);
  }, w = (N) => {
    n?.(N), f(!1);
  }, b = () => {
    a || r || s?.();
  }, y = () => {
    a || (r || s?.(), f(!0));
  }, C = (N) => {
    N.stopPropagation(), r || s?.(), f(!0);
  }, R = !a && (r || i);
  return /* @__PURE__ */ u.jsxs(dr, { open: d, onOpenChange: (N) => {
    N && g(""), f(N);
  }, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      /* @__PURE__ */ u.jsx(
        At,
        {
          className: oe(
            "flex-1 min-h-6 truncate",
            !a && "cursor-pointer",
            !h && "text-black-25"
          ),
          onClick: b,
          onDoubleClick: y,
          children: h || " "
        }
      ),
      /* @__PURE__ */ u.jsx(fr, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        xe,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-chevron-down",
          className: oe(
            "ml-auto shrink-0",
            !R && "opacity-0 pointer-events-none"
          ),
          onClick: C
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsx(pr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (N) => N.stopPropagation(), onDoubleClick: (N) => N.stopPropagation(), onMouseDown: (N) => N.stopPropagation(), children: [
      /* @__PURE__ */ u.jsx(
        Ze,
        {
          variant: "basic",
          size: "base",
          value: p,
          onChange: (N) => g(N.target.value),
          placeholder: "搜索或添加选项",
          className: "w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none",
          onKeyDown: (N) => {
            N.key === "Enter" && !m && p.trim() && (N.preventDefault(), x());
          }
        }
      ),
      /* @__PURE__ */ u.jsx(ft, { className: "!my-1" }),
      /* @__PURE__ */ u.jsxs("div", { className: "flex flex-col group/options", children: [
        v.length > 0 ? v.map((N) => /* @__PURE__ */ u.jsx(
          us,
          {
            className: oe(
              N.value === e && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
              N.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !N.disabled && w(N.value),
            children: /* @__PURE__ */ u.jsx(At, { className: "flex-1 min-w-0 truncate", children: N.label })
          },
          N.value
        )) : !p.trim() && c.length === 0 ? /* @__PURE__ */ u.jsx("span", { className: "relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default", children: "没有选项" }) : null,
        p.trim() && !m && /* @__PURE__ */ u.jsx(
          us,
          {
            className: "text-black-55 hover:text-black-85",
            onClick: x,
            children: /* @__PURE__ */ u.jsx(At, { className: "flex-1 min-w-0 truncate", children: `添加选项 "${p.trim()}"` })
          }
        )
      ] })
    ] }) })
  ] });
}
function ig({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, onLockCell: r, readOnly: i }) {
  const s = e?.buttonConfig, [a, c] = l.useState(!1), d = (m) => {
    o?.({ buttonConfig: m }), c(!1);
  }, f = () => {
    const m = s?.url?.trim();
    return m ? m.startsWith("http://") || m.startsWith("https://") || m.includes(".") : !1;
  }, p = (m) => {
    if (m.stopPropagation(), f()) {
      const x = s.url.trim();
      x.startsWith("http://") || x.startsWith("https://") ? window.open(x, "_blank", "noopener,noreferrer") : window.open(`https://${x}`, "_blank", "noopener,noreferrer");
    } else
      r?.(), c(!0);
  }, g = (m) => {
    m.stopPropagation(), t || r?.(), c(!0);
  }, h = !i && (t || n), v = s?.label?.trim() || s?.url?.trim();
  return /* @__PURE__ */ u.jsxs(dr, { open: a, onOpenChange: c, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      v && /* @__PURE__ */ u.jsx("div", { className: "min-w-0 shrink", children: s?.label ? (
        // 文字按钮：link 样式，超长截断 + Tooltip
        /* @__PURE__ */ u.jsx(
          xe,
          {
            variant: "link",
            size: "base",
            onClick: p,
            className: "max-w-full",
            children: /* @__PURE__ */ u.jsx(At, { className: "truncate", children: s.label })
          }
        )
      ) : (
        // 图标按钮：只有 URL 无名称时显示
        /* @__PURE__ */ u.jsx(
          xe,
          {
            variant: "link",
            size: "iconBase",
            leftIcon: "icon-jump",
            onClick: p
          }
        )
      ) }),
      /* @__PURE__ */ u.jsx(fr, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        xe,
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
    /* @__PURE__ */ u.jsx(pr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx("div", { onClick: (m) => m.stopPropagation(), onDoubleClick: (m) => m.stopPropagation(), onMouseDown: (m) => m.stopPropagation(), children: /* @__PURE__ */ u.jsx(
      ag,
      {
        config: s,
        onSave: d
      }
    ) }) })
  ] });
}
function ag({ config: e, onSave: t }) {
  const [n, o] = l.useState(e?.label ?? ""), [r, i] = l.useState(e?.url ?? ""), s = l.useId(), a = () => {
    t({ label: n, url: r });
  }, c = () => {
    t(e ?? {});
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "button-link-manager",
      "data-slot-id": s,
      onKeyDown: (d) => {
        d.key === "Enter" && (d.preventDefault(), a()), d.key === "Escape" && (d.preventDefault(), c());
      },
      children: [
        /* @__PURE__ */ u.jsx(Kt, { children: "按钮名称" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          Ze,
          {
            variant: "basic",
            size: "base",
            value: n,
            onChange: (d) => o(d.target.value),
            placeholder: "输入按钮名称",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(Kt, { children: "超链接" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          Ze,
          {
            variant: "basic",
            size: "base",
            value: r,
            onChange: (d) => i(d.target.value),
            placeholder: "输入超链接",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(ft, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(xe, { variant: "outline", size: "base", className: "flex-1", onClick: c, children: "取消" }),
          /* @__PURE__ */ u.jsx(xe, { variant: "primary", size: "base", className: "flex-1", onClick: a, children: "保存" })
        ] })
      ]
    }
  );
}
function lg({ value: e, options: t }) {
  const n = t?.iconName || String(e);
  return /* @__PURE__ */ u.jsx(xe, { variant: "ghost", size: "iconBase", leftIcon: n });
}
function cg({ file: e, isLocked: t, isPreviewOpen: n, onPreview: o, onRemove: r }) {
  const [i, s] = l.useState(null), a = l.useRef(null), c = l.useRef(null), d = l.useRef(null), f = e.type.startsWith("image/"), p = e.type.startsWith("video/");
  l.useEffect(() => {
    if (f) {
      const w = URL.createObjectURL(e);
      return s(w), () => URL.revokeObjectURL(w);
    } else if (p) {
      const w = URL.createObjectURL(e), b = c.current, y = d.current;
      return b && y && (b.src = w, b.addEventListener("loadeddata", () => {
        y.width = b.videoWidth || 80, y.height = b.videoHeight || 80;
        const C = y.getContext("2d");
        if (C) {
          C.drawImage(b, 0, 0, y.width, y.height);
          const R = y.toDataURL("image/jpeg", 0.8);
          s(R);
        }
      }), b.currentTime = 0.1), () => URL.revokeObjectURL(w);
    }
    return () => {
    };
  }, [e, f, p]);
  const g = () => {
    o?.();
  }, h = (w) => {
    w.stopPropagation(), a.current?.click();
  }, v = (w) => {
    w.stopPropagation(), r?.();
  }, m = (w) => {
    w.target.files?.[0], w.target.value = "";
  }, x = /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: "group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer",
      onClick: g,
      children: [
        i ? /* @__PURE__ */ u.jsx("img", { src: i, alt: e.name, className: "size-full object-cover" }) : /* @__PURE__ */ u.jsx("svg", { className: "size-4 text-black-55", fill: "currentColor", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-file-1" }) }),
        (f || p) && i && /* @__PURE__ */ u.jsx("div", { className: oe(
          "absolute inset-0 bg-black-10 opacity-0 group-hover:opacity-100",
          !n && "transition-opacity"
        ) })
      ]
    }
  );
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    t ? /* @__PURE__ */ u.jsxs(Zn, { children: [
      /* @__PURE__ */ u.jsx(Jn, { asChild: !0, children: x }),
      /* @__PURE__ */ u.jsxs(Qn, { side: "top", sideOffset: 4, className: "h-10 flex items-center px-0.5", children: [
        /* @__PURE__ */ u.jsx(
          xe,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-edit",
            onClick: h,
            className: "text-white-60 hover:text-white-100"
          }
        ),
        /* @__PURE__ */ u.jsx(
          xe,
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
    /* @__PURE__ */ u.jsx("input", { ref: a, type: "file", className: "hidden", onChange: m }),
    /* @__PURE__ */ u.jsx("video", { ref: c, className: "hidden", preload: "metadata", crossOrigin: "anonymous" }),
    /* @__PURE__ */ u.jsx("canvas", { ref: d, className: "hidden" })
  ] });
}
function ug({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, readOnly: r }) {
  const i = e?.attachmentFiles, s = l.useRef(null), a = l.useRef(null), [c, d] = l.useState(null), [f, p] = l.useState([]), g = i ?? [], h = g.length, [v, m] = l.useState(h);
  l.useEffect(() => {
    const _ = a.current;
    if (!_) return;
    const D = () => {
      const F = _.clientWidth, J = Math.max(1, Math.floor(F / 40));
      m(J);
    };
    D();
    const K = new ResizeObserver(D);
    return K.observe(_), () => K.disconnect();
  }, [h]);
  const x = h > v, w = h - v;
  l.useEffect(() => {
    const _ = g.map((D) => URL.createObjectURL(D));
    return p(_), () => _.forEach((D) => URL.revokeObjectURL(D));
  }, [i]);
  const b = (_) => {
    o?.({ attachmentFiles: _ });
  }, y = () => {
    s.current?.click();
  }, C = (_) => {
    const D = Array.from(_.target.files || []);
    D.length > 0 && b([...g, ...D]), _.target.value = "";
  }, R = (_) => {
    const D = g.filter((K, F) => F !== _);
    b(D), c === _ && d(null);
  }, N = (_) => {
    d(_);
  }, S = () => {
    c !== null && c > 0 && d(c - 1);
  }, E = () => {
    c !== null && c < h - 1 && d(c + 1);
  };
  l.useEffect(() => {
    if (c === null) return;
    const _ = (D) => {
      D.key === "ArrowLeft" ? S() : D.key === "ArrowRight" && E();
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, [c]);
  const L = !r && (t || n);
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("div", { ref: a, className: "flex items-center gap-2 min-w-0 flex-1", children: [
      h > 0 && /* @__PURE__ */ u.jsx("div", { className: "flex items-center gap-2 min-w-0 shrink", children: g.slice(0, v).map((_, D) => /* @__PURE__ */ u.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ u.jsx(
          cg,
          {
            file: _,
            isLocked: t ?? !1,
            isPreviewOpen: c !== null,
            onPreview: () => N(D),
            onRemove: () => R(D)
          }
        ),
        x && D === v - 1 && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer",
            onClick: () => N(D),
            children: /* @__PURE__ */ u.jsxs("span", { className: "text-xs text-white-100", children: [
              "+",
              w
            ] })
          }
        )
      ] }, `${_.name}-${_.size}-${D}`)) }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          ref: s,
          type: "file",
          multiple: !0,
          className: "hidden",
          onChange: C
        }
      ),
      L && /* @__PURE__ */ u.jsx(
        xe,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-upload",
          className: "ml-auto shrink-0",
          onClick: y
        }
      )
    ] }),
    c !== null && f[c] && /* @__PURE__ */ u.jsx(Qh, { open: c !== null, onOpenChange: (_) => !_ && d(null), children: /* @__PURE__ */ u.jsxs(
      ng,
      {
        size: "lg",
        overlayClassName: "bg-black-55",
        className: "w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85",
        children: [
          /* @__PURE__ */ u.jsx(
            xe,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-left",
              disabled: c === 0,
              className: "absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: S
            }
          ),
          g[c]?.type.startsWith("image/") ? /* @__PURE__ */ u.jsx("img", { src: f[c], alt: g[c].name, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" }) : g[c]?.type.startsWith("video/") ? /* @__PURE__ */ u.jsx("video", { src: f[c], controls: !0, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" }) : null,
          /* @__PURE__ */ u.jsx(
            xe,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-right",
              disabled: c === h - 1,
              className: "absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: E
            }
          ),
          /* @__PURE__ */ u.jsxs("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 text-white text-sm z-10", children: [
            c + 1,
            "/",
            h
          ] })
        ]
      }
    ) })
  ] });
}
const sl = {
  text: rl,
  number: og,
  input: rg,
  select: sg,
  // 使用新版可编辑渲染器
  button: ig,
  attachment: ug,
  icon: lg
}, il = l.createContext(null), al = l.createContext(null), ll = l.createContext(null), vr = l.createContext(sl);
function oo() {
  const e = l.useContext(il);
  if (!e) throw new Error("useTableActions must be used within a TableProvider");
  return e;
}
function en() {
  const e = l.useContext(al);
  if (!e) throw new Error("useTableData must be used within a TableProvider");
  return e;
}
function ro() {
  const e = l.useContext(ll);
  if (!e) throw new Error("useTableState must be used within a TableProvider");
  return e;
}
function wt() {
  return {
    state: ro(),
    actions: oo(),
    data: en(),
    cellRenderers: l.useContext(vr)
  };
}
function dg({ data: e, cellRenderers: t, readOnly: n, children: o }) {
  const r = l.useMemo(
    () => ({ ...sl, ...t }),
    [t]
  ), [i, s] = l.useState(() => {
    const k = {};
    return e.columns.forEach((A) => {
      k[A.id] = A.width === "auto" ? 40 : A.width ?? 200;
    }), k;
  }), [a, c] = l.useState(e.columns), [d, f] = l.useState(e.rows), [p, g] = l.useState(() => e.hiddenColumns ?? /* @__PURE__ */ new Set()), [h, v] = l.useState(() => {
    const k = /* @__PURE__ */ new Set(), A = e.columns.find((M) => M.type === "checkbox");
    A && k.add(A.id);
    const O = e.columns.find((M) => M.type !== "checkbox");
    return O && k.add(O.id), k;
  }), [m, x] = l.useState(() => e.groupColumnId ?? null), [w, b] = l.useState(() => {
    if (!e.groupColumnId) return /* @__PURE__ */ new Set();
    const k = e.columns.findIndex((U) => U.id === e.groupColumnId);
    if (k === -1) return /* @__PURE__ */ new Set();
    const A = new Set(e.rows.map((U) => String(U.cells[k]?.value ?? ""))), O = Array.from(A).sort((U, te) => !U && te ? 1 : U && !te ? -1 : 0), M = O[0];
    if (!M) return /* @__PURE__ */ new Set();
    const z = new Set(O);
    return z.delete(M), z;
  }), [y, C] = l.useState(/* @__PURE__ */ new Set()), [R, N] = l.useState(null), [S, E] = l.useState(n ?? !1);
  l.useEffect(() => {
    S && (K(null), Z(""), _(null));
  }, [S]);
  const [L, _] = l.useState(null), [D, K] = l.useState(null), [F, Z] = l.useState(""), J = y.size === d.length && d.length > 0, W = l.useCallback(() => {
    C(J ? /* @__PURE__ */ new Set() : new Set(d.map((k) => k.id)));
  }, [J, d]), Y = l.useCallback((k) => {
    C((A) => {
      const O = new Set(A);
      return O.has(k) ? O.delete(k) : O.add(k), O;
    }), _(null);
  }, []), H = l.useCallback(() => {
    C(/* @__PURE__ */ new Set());
  }, []), Q = l.useCallback((k, A) => {
    K(k), Z(A);
  }, []), $ = l.useCallback(() => {
    if (!D) return;
    a.some((A) => A.id === D) ? c(
      (A) => A.map(
        (O) => O.id === D ? { ...O, title: F } : O
      )
    ) : f(
      (A) => A.map((O) => ({
        ...O,
        cells: O.cells.map(
          (M) => M.id === D ? { ...M, value: F } : M
        )
      }))
    ), K(null), Z("");
  }, [D, F, a]), P = l.useCallback(() => {
    K(null), Z("");
  }, []), X = l.useCallback((k) => {
    Z(k);
  }, []), q = l.useCallback((k, A) => {
    f((O) => O.map((M) => {
      const z = M.cells.findIndex((te) => te.id === k);
      if (z === -1) return M;
      const U = [...M.cells];
      if (typeof A == "object" && A !== null) {
        const te = A, me = M.cells[z];
        U[z] = {
          ...me,
          ...te
        };
      } else
        U[z] = { ...M.cells[z], value: A };
      return { ...M, cells: U };
    }));
  }, []), ie = l.useCallback((k, A) => {
    s((O) => ({
      ...O,
      [k]: A
    }));
  }, []), re = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, ae = l.useCallback((k) => {
    const A = a.findIndex((z) => z.id === k);
    if (A === -1) return;
    const O = re(), M = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    c((z) => {
      const U = [...z];
      return U.splice(A, 0, M), U;
    }), s((z) => ({
      ...z,
      [O]: 200
    })), f(
      (z) => z.map((U) => {
        const te = {
          id: `${O}-${U.id}`,
          type: "text",
          value: "",
          width: 200
        }, me = [...U.cells];
        return me.splice(A, 0, te), { ...U, cells: me };
      })
    );
  }, [a]), j = l.useCallback((k) => {
    const A = a.findIndex((z) => z.id === k);
    if (A === -1) return;
    const O = re(), M = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    c((z) => {
      const U = [...z];
      return U.splice(A + 1, 0, M), U;
    }), s((z) => ({
      ...z,
      [O]: 200
    })), f(
      (z) => z.map((U) => {
        const te = {
          id: `${O}-${U.id}`,
          type: "text",
          value: "",
          width: 200
        }, me = [...U.cells];
        return me.splice(A + 1, 0, te), { ...U, cells: me };
      })
    );
  }, [a]), ne = l.useCallback((k) => {
    g((A) => new Set(A).add(k));
  }, []), ee = l.useCallback((k) => {
    g((A) => {
      const O = new Set(A);
      return O.has(k) ? O.delete(k) : O.add(k), O;
    });
  }, []), ue = l.useCallback((k) => {
    const A = a.findIndex((O) => O.id === k);
    A !== -1 && (c((O) => O.filter((M) => M.id !== k)), s((O) => {
      const M = { ...O };
      return delete M[k], M;
    }), g((O) => {
      const M = new Set(O);
      return M.delete(k), M;
    }), f(
      (O) => O.map((M) => ({
        ...M,
        cells: M.cells.filter((z, U) => U !== A)
      }))
    ));
  }, [a]), ce = l.useCallback((k, A) => {
    const O = a.findIndex((M) => M.id === k);
    O !== -1 && (c(
      (M) => M.map(
        (z) => z.id === k ? { ...z, type: A } : z
      )
    ), f(
      (M) => M.map((z) => ({
        ...z,
        cells: z.cells.map(
          (U, te) => te === O ? { ...U, type: A } : U
        )
      }))
    ));
  }, [a]), se = l.useCallback((k, A) => {
    c(
      (O) => O.map(
        (M) => M.id === k ? { ...M, title: A } : M
      )
    );
  }, []), be = l.useCallback((k, A) => {
    c(
      (O) => O.map(
        (M) => M.id === k ? { ...M, options: A } : M
      )
    );
  }, []), ye = l.useCallback((k) => {
    const A = a.findIndex((M) => M.id === k);
    if (A === -1) return;
    const O = a.slice(0, A + 1).map((M) => M.id);
    v(new Set(O));
  }, [a]), st = l.useCallback((k) => {
    if (x(k), k) {
      const A = a.findIndex((z) => z.id === k);
      if (A === -1) {
        b(/* @__PURE__ */ new Set());
        return;
      }
      const O = Array.from(
        new Set(d.map((z) => String(z.cells[A]?.value ?? "")))
      ).sort((z, U) => !z && U ? 1 : z && !U ? -1 : 0), M = O[0];
      b(
        M ? new Set(O.filter((z) => z !== M)) : /* @__PURE__ */ new Set()
      );
    } else
      b(/* @__PURE__ */ new Set());
  }, [a, d]), Ye = {
    selectedRows: y,
    selectAll: J,
    editingCellId: D,
    editingValue: F,
    lockedCellId: L,
    columnWidths: i,
    allColumns: a,
    hiddenColumns: p,
    frozenColumns: h,
    groupColumnId: m,
    collapsedGroups: w,
    selectedColumnId: R,
    readOnly: S
  }, it = l.useCallback((k) => {
    b((A) => {
      const O = new Set(A);
      return O.has(k) ? O.delete(k) : O.add(k), O;
    });
  }, []), so = l.useCallback(() => {
    b(/* @__PURE__ */ new Set());
  }, []), Ft = l.useCallback(() => {
    if (!m) return;
    const k = a.findIndex((O) => O.id === m);
    if (k === -1) return;
    const A = new Set(d.map((O) => String(O.cells[k]?.value ?? "")));
    b(A);
  }, [m, a, d]), io = l.useCallback((k, A) => {
    const O = A.map((z) => z.id), M = O.every((z) => y.has(z));
    C((z) => {
      const U = new Set(z);
      return M ? O.forEach((te) => U.delete(te)) : O.forEach((te) => U.add(te)), U;
    });
  }, [y]), ao = (k) => {
    switch (k.type) {
      case "checkbox":
        return !1;
      case "button":
        return k.options?.label || "";
      case "icon":
        return k.options?.iconName || "";
      default:
        return "";
    }
  }, yt = (k, A, O) => ({
    id: `${A}-${k.id}`,
    type: k.type,
    value: ao(k),
    width: k.width === "auto" ? 40 : k.width ?? 200,
    ...O
  }), Ct = l.useCallback((k, A) => {
    const O = a.findIndex((te) => te.id === A);
    if (O === -1) return;
    const M = re(), z = a.map(
      (te) => yt(te, M, te.id === A ? { value: k } : void 0)
    );
    let U = d.length;
    for (let te = d.length - 1; te >= 0; te--) {
      const fe = d[te]?.cells[O];
      if ((fe ? String(fe.value ?? "") : "") === k) {
        U = te + 1;
        break;
      }
    }
    f((te) => {
      const me = [...te];
      return me.splice(U, 0, { id: M, cells: z }), me;
    });
  }, [a, d]), at = l.useCallback(() => {
    const k = re(), A = a.map(
      (O) => yt(O, k)
    );
    f((O) => [...O, { id: k, cells: A }]);
  }, [a]), Wt = l.useCallback((k, A, O) => {
    const M = a.findIndex((z) => z.id === O);
    M !== -1 && f(
      (z) => z.map((U) => {
        const te = U.cells[M];
        if ((te ? String(te.value ?? "") : "") === k && te) {
          const fe = [...U.cells];
          return fe[M] = { ...te, value: A }, { ...U, cells: fe };
        }
        return U;
      })
    );
  }, [a]), tn = l.useCallback((k) => {
    _(k), k && (C(/* @__PURE__ */ new Set()), N(null));
  }, []), ze = l.useCallback((k) => {
    N(k), k && (C(/* @__PURE__ */ new Set()), _(null));
  }, []), nn = l.useCallback((k, A, O) => {
    const M = a.findIndex((fe) => fe.id === k), z = a.findIndex((fe) => fe.id === A);
    if (M === -1 || z === -1 || M === z) return;
    const U = O === "right" ? z + 1 : z, te = U > M ? U - 1 : U;
    if (te === M) return;
    const me = M;
    c((fe) => {
      const ve = [...fe], he = ve[me];
      return he ? (ve.splice(me, 1), ve.splice(te, 0, he), ve) : fe;
    }), f(
      (fe) => fe.map((ve) => {
        const he = [...ve.cells], Ce = he[me];
        return Ce ? (he.splice(me, 1), he.splice(te, 0, Ce), { ...ve, cells: he }) : ve;
      })
    ), N(k);
  }, [a]), lo = l.useCallback((k, A) => {
    const M = a.some((me) => me.type === "checkbox") ? 1 : 0, z = a.length - M;
    let U = a;
    if (A > z) {
      const me = A - z, fe = [], ve = {};
      for (let he = 0; he < me; he++) {
        const Ce = re(), Fe = a.length + he + 1 - M;
        fe.push({
          id: Ce,
          type: "text",
          title: `列${Fe}`,
          width: 200
        }), ve[Ce] = 200;
      }
      U = [...a, ...fe], c(U), s((he) => ({ ...he, ...ve })), f(
        (he) => he.map((Ce) => {
          const Fe = fe.map((fl) => ({
            id: `${fl.id}-${Ce.id}`,
            type: "text",
            value: "",
            width: 200
          }));
          return { ...Ce, cells: [...Ce.cells, ...Fe] };
        })
      );
    } else if (A < z) {
      const me = z - A, fe = a.length - me, ve = a.slice(fe).map((he) => he.id);
      U = a.slice(0, fe), c(U), s((he) => {
        const Ce = { ...he };
        return ve.forEach((Fe) => delete Ce[Fe]), Ce;
      }), g((he) => {
        const Ce = new Set(he);
        return ve.forEach((Fe) => Ce.delete(Fe)), Ce;
      }), f(
        (he) => he.map((Ce) => ({
          ...Ce,
          cells: Ce.cells.slice(0, fe)
        }))
      );
    }
    const te = d.length;
    if (k > te) {
      const me = k - te, fe = [];
      for (let ve = 0; ve < me; ve++) {
        const he = re(), Ce = U.map(
          (Fe) => yt(Fe, he)
        );
        fe.push({ id: he, cells: Ce });
      }
      f((ve) => [...ve, ...fe]);
    } else k < te && f((me) => me.slice(0, k));
  }, [a, d]), St = l.useCallback(() => {
    E((k) => !k);
  }, []), on = {
    toggleSelectAll: W,
    toggleRowSelect: Y,
    clearSelection: H,
    startEdit: Q,
    finishEdit: $,
    cancelEdit: P,
    updateEditingValue: X,
    lockCell: tn,
    updateCellValue: q,
    updateColumnWidth: ie,
    insertColumnLeft: ae,
    insertColumnRight: j,
    hideColumn: ne,
    toggleColumnVisibility: ee,
    deleteColumn: ue,
    updateColumnType: ce,
    updateColumnTitle: se,
    updateColumnOptions: be,
    freezeColumns: ye,
    setGroupColumn: st,
    toggleGroupCollapse: it,
    toggleGroupSelect: io,
    insertRowInGroup: Ct,
    insertRow: at,
    updateGroupValues: Wt,
    expandAllGroups: so,
    collapseAllGroups: Ft,
    selectColumn: ze,
    moveColumnOrder: nn,
    setDimension: lo,
    toggleReadOnly: St
  }, I = l.useMemo(() => ({
    columns: a.filter((k) => !p.has(k.id)),
    rows: d.map((k) => ({
      ...k,
      cells: k.cells.filter((A, O) => !p.has(a[O]?.id ?? ""))
    })),
    allRows: d
  }), [a, d, p]), T = l.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    return I.columns.forEach((A) => k.set(A.id, A)), k;
  }, [I.columns]), G = l.useMemo(() => ({ ...I, columnMap: T }), [I, T]), de = l.useMemo(() => Ye, [Ye]);
  return /* @__PURE__ */ u.jsx(il.Provider, { value: on, children: /* @__PURE__ */ u.jsx(al.Provider, { value: G, children: /* @__PURE__ */ u.jsx(ll.Provider, { value: de, children: /* @__PURE__ */ u.jsx(vr.Provider, { value: r, children: o }) }) }) });
}
function fg(e) {
  const { data: t, state: n } = wt(), o = l.useMemo(() => {
    if (!e) return !1;
    const i = t.columns.find((s) => s.type === "checkbox")?.id;
    if (i) {
      const s = t.columns.findIndex((c) => c.id === i), a = t.columns[s + 1]?.id;
      return e === a;
    } else
      return e === t.columns[0]?.id;
  }, [e, t.columns]), r = l.useMemo(() => {
    const i = n.allColumns, s = i.find((a) => a.type === "checkbox")?.id;
    if (s) {
      const a = i.findIndex((c) => c.id === s);
      return i[a + 1]?.id;
    } else
      return i[0]?.id;
  }, [n.allColumns]);
  return { isFirstDataColumn: o, firstDataColumnId: r };
}
function pg({
  columnId: e,
  isFirstDataColumn: t,
  groupColumnId: n,
  readOnly: o,
  onEdit: r,
  onHideManager: i,
  onDimension: s
}) {
  const { actions: a, state: c } = wt(), { close: d } = l.useContext(Ie), f = l.useId();
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "header-cell-menu", "data-slot-id": f, children: [
    !o && /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: r, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-edit" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "编辑列" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(Re, { size: "base", closeOnClick: !0, onClick: () => e && a.hideColumn(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列" })
    ] }),
    /* @__PURE__ */ u.jsx(ft, {}),
    t && n && /* @__PURE__ */ u.jsxs(
      Re,
      {
        size: "base",
        onClick: () => {
          d(), setTimeout(() => {
            c.collapsedGroups.size > 0 ? a.expandAllGroups() : a.collapseAllGroups();
          }, 250);
        },
        children: [
          /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: c.collapsedGroups.size > 0 ? "#icon-chevron-down-double" : "#icon-a-chevron-rightdouble" }) }),
          /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: c.collapsedGroups.size > 0 ? "展开分组" : "收起分组" })
        ]
      }
    ),
    t ? /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: () => {
      d(), setTimeout(() => e && a.setGroupColumn(n ? null : e), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: n ? "取消分组" : "设为分组" })
    ] }) : /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: () => {
      d(), setTimeout(() => e && a.setGroupColumn(n === e ? null : e), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: n === e ? "取消分组" : "设为分组" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(Re, { size: "base", closeOnClick: !0, onClick: () => e && a.insertColumnLeft(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-left" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向左插入列" })
    ] }),
    !o && /* @__PURE__ */ u.jsxs(Re, { size: "base", closeOnClick: !0, onClick: () => e && a.insertColumnRight(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-right" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向右插入列" })
    ] }),
    /* @__PURE__ */ u.jsx(ft, {}),
    t && /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: i, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列管理" })
    ] }),
    !o && t && /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: s, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-view" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "行列数管理" })
    ] }),
    t && /* @__PURE__ */ u.jsxs(Re, { size: "base", onClick: () => {
      d(), setTimeout(() => a.toggleReadOnly(), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: o ? "#icon-book-open" : "#icon-book-open-filled" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: o ? "编辑模式" : "只读模式" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(Re, { size: "base", closeOnClick: !0, onClick: () => e && a.freezeColumns(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-column" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "冻结到此列" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(ft, {}),
      /* @__PURE__ */ u.jsxs(
        Re,
        {
          size: "base",
          closeOnClick: !0,
          onClick: () => e && a.deleteColumn(e),
          className: "text-error-5 hover:bg-error-1 focus:bg-error-1 active:bg-error-2",
          children: [
            /* @__PURE__ */ u.jsx("svg", { className: "icon text-error-5", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-delete" }) }),
            /* @__PURE__ */ u.jsx("span", { className: "text-sm", children: "删除列" })
          ]
        }
      )
    ] })
  ] });
}
function mg({ size: e, fields: t }) {
  const n = l.useContext(Ie), o = e ?? n.size, r = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5"
  }[o], i = l.useRef(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ u.jsx(u.Fragment, { children: t.map((s, a) => /* @__PURE__ */ u.jsxs(l.Fragment, { children: [
    s.label && /* @__PURE__ */ u.jsx(Kt, { children: s.label }),
    s.type === "input" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsx(
      Ze,
      {
        variant: "basic",
        size: o,
        value: s.value,
        defaultValue: s.defaultValue,
        onChange: (c) => s.onChange?.(c.target.value),
        placeholder: s.placeholder,
        autoFocus: s.autoFocus,
        onFocus: s.selectOnFocus ? (c) => {
          i.current.has(a) || (i.current.add(a), c.target.select());
        } : void 0,
        className: "w-full"
      }
    ) }),
    s.type === "select" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsxs(Hp, { value: s.value, onValueChange: s.onChange, size: o, children: [
      /* @__PURE__ */ u.jsx(Bp, { variant: "basic", className: "w-full", children: /* @__PURE__ */ u.jsx(Yp, { placeholder: s.placeholder }) }),
      /* @__PURE__ */ u.jsx(Up, { children: s.options?.map((c) => /* @__PURE__ */ u.jsx(Gp, { value: c.value, children: c.label }, c.value)) })
    ] }) }),
    s.type === "content" && /* @__PURE__ */ u.jsx(
      hg,
      {
        field: s,
        paddingClass: r,
        size: o
      }
    )
  ] }, a)) });
}
function hg({ field: e, paddingClass: t }) {
  const n = e.selectOptions ?? [], [o, r] = l.useState(null), [i, s] = l.useState(null), a = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, c = () => {
    const v = {
      value: a(),
      label: ""
    };
    e.onSelectOptionsChange?.([...n, v]);
  }, d = (v) => {
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
    v.preventDefault(), s(m);
  }, h = () => {
    if (o !== null && i !== null && o !== i) {
      const v = [...n], m = v[o];
      m && (v.splice(o, 1), v.splice(i, 0, m), e.onSelectOptionsChange?.(v));
    }
    r(null), s(null);
  };
  return e.contentType !== "select" ? null : /* @__PURE__ */ u.jsxs("div", { className: t, children: [
    /* @__PURE__ */ u.jsx(
      xe,
      {
        variant: "ghost",
        size: "base",
        className: "w-full justify-center text-black-55",
        leftIcon: "icon-add",
        onClick: c,
        children: "添加选项"
      }
    ),
    n.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "mt-1.5 flex flex-col gap-0.5", children: n.map((v, m) => /* @__PURE__ */ u.jsxs(
      "div",
      {
        draggable: !0,
        onDragStart: () => p(m),
        onDragOver: (x) => g(x, m),
        onDragEnd: h,
        className: gg(
          "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
          i === m && "bg-brand-1",
          o === m && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ u.jsx(
            xe,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-move",
              className: "shrink-0 cursor-grab text-black-55"
            }
          ),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              variant: "basic",
              size: "base",
              value: v.label,
              onChange: (x) => f(m, x.target.value),
              className: "flex-1 min-w-0",
              placeholder: "输入选项名称"
            }
          ),
          /* @__PURE__ */ u.jsx(
            xe,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-close",
              onClick: () => d(m),
              className: "shrink-0 text-black-55"
            }
          )
        ]
      },
      v.value
    )) })
  ] });
}
function gg(...e) {
  return e.filter(Boolean).join(" ");
}
function vg({
  columnId: e,
  value: t,
  currentColumnType: n,
  currentColumnDef: o,
  onClose: r
}) {
  const { actions: i } = wt(), { close: s } = l.useContext(Ie), a = l.useId(), [c, d] = l.useState(String(t)), [f, p] = l.useState("text"), [g, h] = l.useState([]);
  l.useEffect(() => {
    d(String(t)), p(n), o?.options ? n === "select" && h(o.options.items ?? []) : h([]);
  }, [t, n, o]);
  const v = () => {
    if (c !== String(t) && e && i.updateColumnTitle(e, c), e && f !== n && i.updateColumnType(e, f), e) {
      const m = {};
      if (f === "select") {
        const x = g.filter((w) => w.label.trim());
        m.items = x;
      }
      i.updateColumnOptions(e, m);
    }
    s();
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "header-cell-edit",
      "data-slot-id": a,
      onKeyDown: (m) => {
        m.key === "Enter" && (m.preventDefault(), v()), m.key === "Escape" && (m.preventDefault(), r());
      },
      children: [
        /* @__PURE__ */ u.jsx(
          mg,
          {
            size: "base",
            fields: [
              {
                label: "标题",
                type: "input",
                value: c,
                onChange: d,
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
        /* @__PURE__ */ u.jsx(ft, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(xe, { variant: "outline", size: "base", className: "flex-1", onClick: r, children: "取消" }),
          /* @__PURE__ */ u.jsx(xe, { variant: "primary", size: "base", className: "flex-1", onClick: v, children: "保存" })
        ] })
      ]
    }
  );
}
function xg({ firstDataColumnId: e }) {
  const { state: t, actions: n } = wt(), o = l.useId(), r = t.allColumns.find((s) => s.type === "checkbox"), i = r ? t.hiddenColumns.has(r.id) : !1;
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "hide-column-view", "data-slot-id": o, children: [
    r && /* @__PURE__ */ u.jsxs(
      Re,
      {
        size: "base",
        closeOnClick: !1,
        onClick: () => n.toggleColumnVisibility(r.id),
        children: [
          /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: i ? "#icon-browse-off" : "#icon-browse" }) }),
          /* @__PURE__ */ u.jsx("span", { children: "多选列" })
        ]
      }
    ),
    t.allColumns.filter((s) => s.type !== "checkbox" && s.id !== e).map((s) => {
      const a = t.hiddenColumns.has(s.id);
      return /* @__PURE__ */ u.jsxs(
        Re,
        {
          size: "base",
          closeOnClick: !1,
          onClick: () => n.toggleColumnVisibility(s.id),
          children: [
            /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55 shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: a ? "#icon-browse-off" : "#icon-browse" }) }),
            /* @__PURE__ */ u.jsxs(Zn, { children: [
              /* @__PURE__ */ u.jsx(Jn, { asChild: !0, children: /* @__PURE__ */ u.jsx("span", { className: "truncate", children: s.title || s.id }) }),
              /* @__PURE__ */ u.jsx(Qn, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: s.title || s.id }) })
            ] })
          ]
        },
        s.id
      );
    })
  ] });
}
function bg() {
  const { data: e, state: t, actions: n } = wt(), { close: o } = l.useContext(Ie), r = l.useId(), i = e.rows.length, s = l.useMemo(() => t.allColumns.some((R) => R.type === "checkbox") ? 1 : 0, [t.allColumns]), a = t.allColumns.length - s, [c, d] = l.useState(String(i)), [f, p] = l.useState(String(a)), g = (C) => Math.max(1, Math.min(100, C)), h = (C) => Math.max(2, Math.min(100, C)), v = (C) => {
    d(C);
  }, m = (C) => {
    p(C);
  }, x = () => {
    (c === "" || c === void 0) && d(String(i));
  }, w = () => {
    (f === "" || f === void 0) && p(String(a));
  }, b = () => {
    const C = g(parseInt(c) || i), R = h(parseInt(f) || a);
    n.setDimension(C, R), o();
  }, y = () => {
    o();
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "header-cell-dimension",
      "data-slot-id": r,
      onKeyDown: (C) => {
        C.key === "Enter" && (C.preventDefault(), b()), C.key === "Escape" && (C.preventDefault(), y());
      },
      children: [
        /* @__PURE__ */ u.jsx(Kt, { children: "行数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          Ze,
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
        /* @__PURE__ */ u.jsx(Kt, { children: "列数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          Ze,
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
        /* @__PURE__ */ u.jsx(ft, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(xe, { variant: "outline", size: "base", className: "flex-1", onClick: y, children: "取消" }),
          /* @__PURE__ */ u.jsx(xe, { variant: "primary", size: "base", className: "flex-1", onClick: b, children: "保存" })
        ] })
      ]
    }
  );
}
const cl = ke("flex flex-col relative", {
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
function ul({ children: e, className: t, onDoubleClick: n }) {
  const o = l.useRef(null), [r, i] = l.useState(!1);
  return l.useEffect(() => {
    o.current && i(o.current.scrollWidth > o.current.clientWidth);
  }, [e]), r ? /* @__PURE__ */ u.jsxs(Zn, { children: [
    /* @__PURE__ */ u.jsx(Jn, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: o,
        className: t,
        onDoubleClick: n,
        children: e
      }
    ) }),
    /* @__PURE__ */ u.jsx(Qn, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: e }) })
  ] }) : /* @__PURE__ */ u.jsx(
    "span",
    {
      ref: o,
      className: t,
      onDoubleClick: n,
      children: e
    }
  );
}
function wg({ cellId: e, value: t, columnId: n, currentColumnType: o, editView: r, setEditView: i, hideColumnView: s, setHideColumnView: a, dimensionView: c, setDimensionView: d, onDoubleClickTitle: f }) {
  const p = ro(), g = oo(), h = en(), { close: v, isOpen: m } = l.useContext(Ie), { isFirstDataColumn: x, firstDataColumnId: w } = fg(n), b = n ? h.columnMap?.get(n) : void 0;
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      ul,
      {
        className: "truncate cursor-pointer flex-1",
        onDoubleClick: f,
        children: String(t)
      }
    ),
    /* @__PURE__ */ u.jsx(fr, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      xe,
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
    /* @__PURE__ */ u.jsx(pr, { align: "end", alignOffset: -8, sideOffset: 8, className: "w-[200px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (y) => y.stopPropagation(), onDoubleClick: (y) => y.stopPropagation(), onMouseDown: (y) => y.stopPropagation(), children: [
      !r && !s && !c && /* @__PURE__ */ u.jsx(
        pg,
        {
          columnId: n,
          isFirstDataColumn: x,
          groupColumnId: p.groupColumnId,
          readOnly: p.readOnly,
          onEdit: () => i(!0),
          onHideManager: () => a(!0),
          onDimension: () => d(!0)
        }
      ),
      r && /* @__PURE__ */ u.jsx(
        vg,
        {
          columnId: n,
          value: t,
          currentColumnType: o,
          currentColumnDef: b,
          onClose: v
        }
      ),
      s && /* @__PURE__ */ u.jsx(xg, { firstDataColumnId: w }),
      c && /* @__PURE__ */ u.jsx(bg, {})
    ] }) })
  ] });
}
function yg({ cellId: e, value: t, columnId: n }) {
  const o = en(), [r, i] = l.useState(!1), [s, a] = l.useState(!1), [c, d] = l.useState(!1), [f, p] = l.useState(!1), g = l.useContext(dl), h = n ? o.columnMap?.get(n)?.type ?? "text" : "text", v = (x) => {
    p(x), x && (i(!1), a(!1), d(!1)), g && (g.current = x);
  }, m = () => {
    g && (g.current = !0), p(!0), i(!0);
  };
  return /* @__PURE__ */ u.jsx(dr, { open: f, onOpenChange: v, children: /* @__PURE__ */ u.jsx(
    wg,
    {
      cellId: e,
      value: t,
      columnId: n,
      currentColumnType: h,
      editView: r,
      setEditView: i,
      hideColumnView: s,
      setHideColumnView: a,
      dimensionView: c,
      setDimensionView: d,
      onDoubleClickTitle: m
    }
  ) });
}
function Cg({ cellId: e, type: t, value: n, rowId: o, isHeader: r, columnId: i, rowIndex: s, cellOptions: a, isCellHovering: c }) {
  const d = ro(), f = oo(), p = en(), g = l.useContext(vr), [h, v] = l.useState(!1);
  if (r && t === "checkbox") {
    const R = h || d.selectAll;
    return /* @__PURE__ */ u.jsx(
      "div",
      {
        className: "flex items-center justify-center w-full h-full",
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1),
        children: R ? /* @__PURE__ */ u.jsx(
          Po,
          {
            checked: d.selectAll,
            onChange: () => f.toggleSelectAll()
          }
        ) : /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-25", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-vcell-logo" }) })
      }
    );
  }
  if (r)
    return /* @__PURE__ */ u.jsx(yg, { cellId: e, value: n, columnId: i });
  if (t === "checkbox") {
    const R = o ? d.selectedRows.has(o) : !1, N = c || R;
    return /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: N ? /* @__PURE__ */ u.jsx(
      Po,
      {
        checked: R,
        onChange: () => {
          o && f.toggleRowSelect(o);
        }
      }
    ) : /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-25", children: s ?? 1 }) });
  }
  const m = g[t || "text"] || rl, x = i ? p.columnMap?.get(i) : void 0, w = a ? { ...x?.options, ...a } : x?.options, b = d.lockedCellId === e, C = (o ? p.rows.find((R) => R.id === o) : void 0)?.cells.find((R) => R.id === e);
  return /* @__PURE__ */ u.jsx(
    m,
    {
      value: n,
      cellId: e,
      rowId: o,
      columnId: i,
      onChange: (R) => f.updateCellValue(e, R),
      isEditing: d.editingCellId === e,
      isLocked: b,
      isCellHovering: c,
      readOnly: d.readOnly,
      onStartEdit: () => f.startEdit(e, String(n)),
      onLockCell: () => f.lockCell(e),
      options: w,
      cellData: C,
      editingValue: d.editingValue,
      onUpdateEditingValue: f.updateEditingValue,
      onFinishEdit: f.finishEdit,
      onCancelEdit: f.cancelEdit,
      onUpdateColumnOptions: (R) => f.updateColumnOptions(i, R)
    }
  );
}
const So = l.memo(function({ row: t, isHeader: n, isLastRow: o, columnIds: r, rowIndex: i, onCellResizeStart: s, onCellHoverEdge: a, onHeaderCellClick: c, onHeaderCellMouseDown: d, draggingColumnId: f, onCellHover: p, hoveringCellId: g, onBodyCellClick: h, frozenOffsets: v = {}, frozenWidth: m = 0, rowWidth: x, style: w, groupColumnId: b, hasOverflow: y }) {
  const C = ro(), R = en(), N = oo(), S = !n && C.selectedRows.has(t.id), E = x ?? t.cells.reduce((L, _, D) => {
    const K = r?.[D] ?? _.id, F = R.columns[D], Z = _.width === "auto" ? 40 : _.width ?? (F?.width === "auto" ? 40 : F?.width ?? 80), J = C.columnWidths[K] ?? Z;
    return L + J;
  }, 0);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "row",
      "data-slot-id": t.id,
      className: oe(
        "flex border-b border-neutral-2",
        S && "bg-brand-1"
      ),
      style: w ?? { minWidth: `${E}px`, width: n && !C.readOnly ? "100%" : `${E}px` },
      children: [
        t.cells.map((L, _) => {
          const D = r?.[_] ?? L.id, K = R.columns[_], F = L.type ?? K?.type ?? "text", Z = L.width ?? K?.width ?? 80, J = Z === "auto" ? 40 : Z, W = C.columnWidths[D] ?? J, Y = C.frozenColumns.has(D), H = v[D] ?? 0, Q = Y && H + W === m, $ = !n && C.editingCellId === L.id && F === "text", P = C.selectedColumnId === D, X = !n && C.lockedCellId === L.id, q = !n && g === L.id, ie = n ? P ? "headerSelected" : "header" : $ ? "editing" : X ? "locked" : S || P ? "selected" : q && !C.readOnly ? "defaultHover" : "default", re = n && P && !Y && !f, ae = n && f && f === C.selectedColumnId;
          return /* @__PURE__ */ u.jsx(
            ut,
            {
              columnId: D,
              "data-cell-id": n ? void 0 : L.id,
              width: W,
              variant: ie,
              isLastCell: !1,
              resizable: n && F !== "checkbox",
              onResizeStart: s ? (j, ne) => s(D, j, ne) : void 0,
              onHoverEdge: a ? (j) => a(j ? D : null) : void 0,
              onClick: n && F !== "checkbox" && c ? (j) => c(D, F, j) : !n && F !== "checkbox" && h ? (j) => h(L.id, j) : void 0,
              onMouseEnter: !n && p ? () => p(L.id) : void 0,
              onMouseLeave: !n && p ? () => p(null) : void 0,
              onMouseDown: n && F !== "checkbox" && !Y && P && d ? (j) => d(D, j) : void 0,
              slotClassName: n && F === "text" ? "justify-between" : F === "checkbox" ? "justify-center" : void 0,
              className: oe(
                n && F === "text" && "group",
                Y && "sticky",
                n && Y && "z-20",
                n && Y && "top-0",
                !n && Y && "z-10",
                Q && y && "shadow-[2px_0_4px_-2px_var(--black-10)]",
                // 光标
                re && "cursor-grab",
                ae && "cursor-grabbing",
                // 分组模式下分组列的表头顶部描边
                n && b && D === b && "border-t-2 border-neutral-2",
                // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
                C.readOnly && _ === t.cells.length - 1 && "!border-r-0"
              ),
              style: Y ? { left: H } : void 0,
              children: /* @__PURE__ */ u.jsx(
                Cg,
                {
                  cellId: L.id,
                  type: F,
                  value: L.value,
                  rowId: n ? void 0 : t.id,
                  isHeader: n,
                  columnId: D,
                  rowIndex: i,
                  cellOptions: L.options,
                  isCellHovering: q
                }
              )
            },
            L.id
          );
        }),
        n && !C.readOnly && /* @__PURE__ */ u.jsx(
          ut,
          {
            variant: "header",
            isLastCell: !0,
            className: "flex-1 min-w-[40px] cursor-pointer",
            onClick: () => {
              const L = r[r.length - 1];
              L && N.insertColumnRight(L);
            },
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(xe, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        )
      ]
    }
  );
}, (e, t) => e.row === t.row && e.isHeader === t.isHeader && e.columnIds === t.columnIds && e.rowIndex === t.rowIndex && e.hoveringCellId === t.hoveringCellId && e.draggingColumnId === t.draggingColumnId && e.onCellResizeStart === t.onCellResizeStart && e.onCellHoverEdge === t.onCellHoverEdge && e.onHeaderCellClick === t.onHeaderCellClick && e.onHeaderCellMouseDown === t.onHeaderCellMouseDown && e.onCellHover === t.onCellHover && e.onBodyCellClick === t.onBodyCellClick && e.frozenOffsets === t.frozenOffsets && e.frozenWidth === t.frozenWidth && e.rowWidth === t.rowWidth && e.groupColumnId === t.groupColumnId && e.hasOverflow === t.hasOverflow);
function Sg({ groupValue: e, rowCount: t, frozenWidth: n, rowWidth: o, checkboxWidth: r, frozenNonCheckboxWidth: i, isCollapsed: s, isGroupSelected: a, onToggle: c, onGroupSelect: d, groupColumnId: f, isCheckboxHidden: p, hasOverflow: g }) {
  const { state: h, actions: v } = wt(), m = `group-header-${e}`, x = h.editingCellId === m, [w, b] = l.useState(null), y = () => {
    h.editingValue !== e && v.updateGroupValues(e, h.editingValue, f), v.finishEdit();
  }, C = p ? i : n;
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "group-header",
      "data-slot-id": `group-${e}`,
      className: "flex border-y border-neutral-2 mt-3 bg-white-100",
      style: { width: `${o}px` },
      children: [
        /* @__PURE__ */ u.jsxs(
          "div",
          {
            className: oe(
              "sticky left-0 z-10 flex bg-white-100",
              g && "shadow-[2px_0_4px_-2px_var(--black-10)]"
            ),
            style: { width: `${C}px` },
            children: [
              !p && /* @__PURE__ */ u.jsx(
                ut,
                {
                  width: r,
                  isLastCell: !1,
                  variant: !h.readOnly && w === "checkbox" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("checkbox"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ u.jsx(Po, { checked: a, onChange: d }) })
                }
              ),
              i > 0 && /* @__PURE__ */ u.jsx(
                ut,
                {
                  width: i,
                  isLastCell: !1,
                  variant: x ? "editing" : !h.readOnly && w === "title" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("title"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ u.jsxs("div", { className: "relative flex items-center justify-between w-full h-6", children: [
                    x ? /* @__PURE__ */ u.jsx(
                      "input",
                      {
                        type: "text",
                        value: h.editingValue,
                        onChange: (R) => v.updateEditingValue(R.target.value),
                        onBlur: y,
                        onKeyDown: (R) => {
                          R.key === "Enter" && y(), R.key === "Escape" && v.cancelEdit();
                        },
                        onFocus: (R) => R.target.select(),
                        className: "absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden",
                        autoFocus: !0
                      }
                    ) : /* @__PURE__ */ u.jsx(
                      ul,
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
                    !x && /* @__PURE__ */ u.jsx(
                      xe,
                      {
                        variant: "ghost",
                        size: "sm",
                        rightIcon: "icon-chevron-down",
                        onClick: c,
                        className: `text-black-55 [&>svg:last-child]:transition-transform ${s ? "[&>svg:last-child]:-rotate-90" : ""}`,
                        children: t
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ u.jsx(ut, { variant: "default", isLastCell: h.readOnly, className: "flex-1", children: "" })
      ]
    }
  );
}
function ds({ rowWidth: e, showBorder: t, isHovering: n, onHoverChange: o, onInsert: r, frozenWidth: i, checkboxWidth: s, isCheckboxHidden: a }) {
  const c = a ? i - s : i, d = l.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "insert-row",
      "data-slot-id": d,
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
        /* @__PURE__ */ u.jsx(
          ut,
          {
            width: c,
            variant: "default",
            isLastCell: !0,
            className: "sticky left-0 z-10 bg-transparent cursor-pointer",
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(xe, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        ),
        /* @__PURE__ */ u.jsx(ut, { variant: "default", isLastCell: !1, className: "flex-1 cursor-pointer bg-transparent", children: "" })
      ]
    }
  );
}
function Dg({ className: e, variant: t, radius: n, data: o, cellRenderers: r, readOnly: i, contained: s = !1, ...a }) {
  const c = s ? cl({ variant: t, radius: n }) : "", d = s ? "plain" : t, f = s ? "none" : n, p = /* @__PURE__ */ u.jsx(Eg, { className: e, variant: d, radius: f, ...a });
  return /* @__PURE__ */ u.jsx(dg, { data: o, cellRenderers: r, readOnly: i, children: /* @__PURE__ */ u.jsx(mh, { children: s ? /* @__PURE__ */ u.jsx("div", { className: oe("h-full min-h-0 overflow-auto overscroll-none w-fit max-w-full", c), children: p }) : p }) });
}
const dl = l.createContext(null);
function Eg({
  className: e,
  variant: t,
  radius: n,
  slotId: o,
  ...r
}) {
  const { data: i, state: s, actions: a } = wt(), c = l.useId(), [d, f] = l.useState(null), [p, g] = l.useState(null), [h, v] = l.useState(null), [m, x] = l.useState(null), [w, b] = l.useState(null), [y, C] = l.useState(0), [R, N] = l.useState(0), S = l.useRef(null), [E, L] = l.useState(null), [_, D] = l.useState(null), [K, F] = l.useState(null), [Z, J] = l.useState(0), [W, Y] = l.useState(!1), H = l.useRef(0), Q = l.useRef(null), $ = l.useRef(null), P = l.useRef(!1), X = l.useRef(!1), q = i.columns.map((I) => I.id), ie = {
    id: "header",
    cells: i.columns.map((I) => ({
      id: I.id,
      type: I.type === "checkbox" ? "checkbox" : "text",
      // 表头始终用 text（除 checkbox）
      value: I.type === "checkbox" ? !1 : I.title ?? "",
      width: I.width
    }))
  }, re = q.reduce((I, T) => I + (s.columnWidths[T] ?? 80), 0), ae = q.reduce((I, T) => s.frozenColumns.has(T) ? I + (s.columnWidths[T] ?? 80) : I, 0), j = s.allColumns.find((I) => I.type === "checkbox")?.id, ne = j ? s.columnWidths[j] ?? 40 : 40, ee = j ? s.hiddenColumns.has(j) : !0, ue = q.reduce((I, T) => s.frozenColumns.has(T) && T !== j ? I + (s.columnWidths[T] ?? 80) : I, 0), ce = l.useMemo(() => {
    const I = {};
    let T = 0;
    return q.forEach((G) => {
      s.frozenColumns.has(G) && (I[G] = T, T += s.columnWidths[G] ?? 80);
    }), I;
  }, [q, s.frozenColumns, s.columnWidths]), se = l.useMemo(() => {
    if (!s.groupColumnId) return null;
    const I = s.allColumns.findIndex((A) => A.id === s.groupColumnId);
    if (I === -1) return null;
    const T = [], G = /* @__PURE__ */ new Map(), de = i.allRows ?? i.rows, k = /* @__PURE__ */ new Map();
    return i.rows.forEach((A) => k.set(A.id, A)), de.forEach((A) => {
      const O = String(A.cells[I]?.value ?? "");
      G.has(O) || G.set(O, []);
      const M = k.get(A.id);
      M && G.get(O).push(M);
    }), G.forEach((A, O) => {
      T.push({ groupValue: O, rows: A });
    }), T.sort((A, O) => !A.groupValue && O.groupValue ? 1 : A.groupValue && !O.groupValue ? -1 : 0), T;
  }, [s.groupColumnId, s.allColumns, i.allRows, i.rows]), be = l.useMemo(() => {
    const I = w || d;
    if (!I) return 0;
    let T = 0;
    for (const G of q) {
      const de = s.columnWidths[G] ?? 80;
      if (G === I)
        return T + de;
      T += de;
    }
    return T;
  }, [w, d, q, s.columnWidths]), ye = l.useMemo(() => {
    if (!_ || !K) return 0;
    let I = 0;
    for (const T of q) {
      const G = s.columnWidths[T] ?? 80;
      if (T === _)
        return K === "left" ? I : I + G;
      I += G;
    }
    return I;
  }, [_, K, q, s.columnWidths]), st = E ? s.columnWidths[E] ?? 80 : 0, Ye = (I, T, G) => {
    S.current && (clearTimeout(S.current), S.current = null), b(I), f(null), C(G), N(T);
  }, it = l.useCallback((I) => {
    I ? (S.current && clearTimeout(S.current), S.current = setTimeout(() => {
      f(I), S.current = null;
    }, 200)) : (S.current && (clearTimeout(S.current), S.current = null), f(null));
  }, []);
  l.useEffect(() => {
    if (!w) return;
    const I = (G) => {
      const de = G.clientX - y, k = Math.max(40, R + de);
      a.updateColumnWidth(w, k);
    }, T = () => {
      b(null);
    };
    return document.addEventListener("mousemove", I), document.addEventListener("mouseup", T), () => {
      document.removeEventListener("mousemove", I), document.removeEventListener("mouseup", T);
    };
  }, [w, y, R, a]);
  const so = l.useCallback((I, T, G) => {
    G.stopPropagation(), s.selectedColumnId !== I && a.selectColumn(I);
  }, [a, s.selectedColumnId]), Ft = l.useRef(null), io = l.useCallback((I, T) => {
    if (s.selectedColumnId !== I || s.frozenColumns.has(I)) return;
    T.preventDefault(), T.stopPropagation(), H.current = T.clientX;
    const G = (A) => {
      if (Math.abs(A.clientX - H.current) >= 4) {
        k();
        const M = ze.current?.getBoundingClientRect();
        if (M) {
          const z = s.columnWidths[I] ?? 80;
          J(A.clientX - M.left - z / 2);
        }
        L(I);
      }
    }, de = () => {
      k();
    }, k = () => {
      document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", de), Ft.current = null;
    };
    Ft.current = k, document.addEventListener("mousemove", G), document.addEventListener("mouseup", de);
  }, [s.selectedColumnId, s.frozenColumns]);
  l.useEffect(() => () => {
    Ft.current?.();
  }, []), l.useEffect(() => {
    if (!E) return;
    const I = s.columnWidths[E] ?? 80;
    Q.current = null, $.current = null, Y(!0);
    const T = q.findIndex((k) => k === E), G = (k) => {
      const A = ze.current?.getBoundingClientRect();
      if (!A) return;
      const O = k.clientX - A.left;
      J(O - I / 2);
      const M = k.clientX - A.left + (ze.current?.scrollLeft ?? 0);
      let z = 0, U = null, te = null;
      for (const fe of q) {
        const ve = s.columnWidths[fe] ?? 80, he = z + ve / 2;
        if (M >= z && M < z + ve) {
          U = fe, te = M < he ? "left" : "right";
          break;
        }
        z += ve;
      }
      (() => {
        if (!U || s.frozenColumns.has(U) || U === E) return !1;
        if (T === -1) return !0;
        const fe = q.findIndex((ve) => ve === U);
        return !(fe === T + 1 && te === "left" || fe === T - 1 && te === "right");
      })() ? (D(U), F(te), Q.current = U, $.current = te) : (D(null), F(null), Q.current = null, $.current = null);
    }, de = () => {
      Q.current && $.current && Q.current !== E && a.moveColumnOrder(E, Q.current, $.current), L(null), D(null), F(null), Y(!1), Q.current = null, $.current = null, P.current = !0;
    };
    return document.addEventListener("mousemove", G), document.addEventListener("mouseup", de), () => {
      document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", de);
    };
  }, [E, q, s.columnWidths, s.frozenColumns, a]);
  const ao = l.useCallback(() => {
    if (P.current) {
      P.current = !1;
      return;
    }
    X.current || (a.selectColumn(null), a.lockCell(null));
  }, [a]), yt = l.useCallback((I, T) => {
    s.readOnly || (T.stopPropagation(), T.target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) || a.lockCell(I);
  }, [a, s.readOnly]), Ct = l.useCallback(() => {
    if (!s.lockedCellId) return null;
    const I = s.groupColumnId ? se?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (let T = 0; T < I.length; T++) {
      const G = I[T];
      if (G) {
        for (let de = 0; de < G.cells.length; de++)
          if (G.cells[de]?.id === s.lockedCellId)
            return { rowIndex: T, colIndex: de, rowId: G.id };
      }
    }
    return null;
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, se, i.rows]), at = l.useCallback((I) => {
    const T = Ct();
    if (!T) return;
    const G = s.groupColumnId ? se?.flatMap((O) => s.collapsedGroups.has(O.groupValue) ? [] : O.rows) ?? i.rows : i.rows;
    let de = T.rowIndex, k = T.colIndex;
    if (I === "ArrowLeft" || I === "ArrowRight") {
      const O = I === "ArrowLeft" ? -1 : 1, M = (G[T.rowIndex]?.cells.length ?? 1) - 1;
      let z = T.colIndex + O;
      for (; z >= 0 && z <= M; ) {
        const U = G[T.rowIndex]?.cells[z];
        if (U && U.type !== "checkbox") {
          k = z;
          break;
        }
        z += O;
      }
    } else
      switch (I) {
        case "ArrowUp":
          de = Math.max(0, T.rowIndex - 1);
          break;
        case "ArrowDown":
          de = Math.min(G.length - 1, T.rowIndex + 1);
          break;
      }
    if (de === T.rowIndex && k === T.colIndex) return;
    const A = G[de]?.cells[k];
    A && A.type !== "checkbox" && a.lockCell(A.id);
  }, [Ct, s.groupColumnId, s.collapsedGroups, se, i.rows, a]), Wt = l.useCallback(() => {
    if (!s.lockedCellId) return null;
    const I = s.groupColumnId ? se?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (const T of I)
      for (let G = 0; G < T.cells.length; G++) {
        const de = T.cells[G];
        if (de?.id === s.lockedCellId)
          return de.type ?? i.columns[G]?.type ?? "text";
      }
    return null;
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, se, i.rows, i.columns]), tn = l.useCallback(() => {
    if (!s.lockedCellId) return "";
    const I = s.groupColumnId ? se?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (const T of I)
      for (const G of T.cells)
        if (G.id === s.lockedCellId)
          return String(G.value ?? "");
    return "";
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, se, i.rows]);
  l.useEffect(() => {
    if (!s.lockedCellId) return;
    const I = (T) => {
      const G = document.activeElement, de = G.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]');
      if (de && T.key !== "Escape" && T.key !== "Enter")
        return;
      if (de && T.key === "Enter" && Wt() === "input") {
        T.preventDefault && T.preventDefault(), G.blur && G.blur();
        const O = s.groupColumnId ? se?.flatMap((z) => s.collapsedGroups.has(z.groupValue) ? [] : z.rows) ?? i.rows : i.rows, M = Ct();
        M && M.rowIndex === O.length - 1 ? a.lockCell(null) : at("ArrowDown");
        return;
      }
      if (s.editingCellId) {
        if (T.key === "Enter") {
          T.preventDefault(), a.finishEdit();
          const A = s.groupColumnId ? se?.flatMap((M) => s.collapsedGroups.has(M.groupValue) ? [] : M.rows) ?? i.rows : i.rows, O = Ct();
          O && O.rowIndex === A.length - 1 ? a.lockCell(null) : at("ArrowDown");
          return;
        }
        if (T.key === "Escape") {
          T.preventDefault(), a.cancelEdit();
          return;
        }
        return;
      }
      if (T.key === "Escape") {
        a.lockCell(null);
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(T.key)) {
        T.preventDefault(), at(T.key);
        return;
      }
      if (T.key === "Tab") {
        T.preventDefault(), at(T.shiftKey ? "ArrowLeft" : "ArrowRight");
        return;
      }
      const k = Wt();
      if (k === "input" && !s.readOnly && (T.key === "Enter" || T.key.length === 1 && !T.ctrlKey && !T.metaKey)) {
        T.preventDefault();
        const A = document.querySelector(`[data-cell-id="${s.lockedCellId}"]`);
        if (A) {
          const O = A.querySelector("input");
          O && (O.focus(), T.key.length === 1 && T.key !== "Enter" && setTimeout(() => {
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set?.call(O, T.key), O.dispatchEvent(new Event("input", { bubbles: !0 }));
          }, 0));
        }
        return;
      }
      if (T.key === "Enter" && !s.readOnly) {
        if (k === "text" || k === "editable" || k === "number") {
          const A = tn();
          a.startEdit(s.lockedCellId, A);
        }
        return;
      }
      if (T.key.length === 1 && !T.ctrlKey && !T.metaKey && !s.readOnly) {
        (k === "text" || k === "editable" || k === "number" && /^[\d\-.]$/.test(T.key)) && a.startEdit(s.lockedCellId, T.key);
        return;
      }
      if ((T.key === "Backspace" || T.key === "Delete") && !s.readOnly) {
        (k === "text" || k === "editable" || k === "number") && a.startEdit(s.lockedCellId, "");
        return;
      }
    };
    return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [s.lockedCellId, s.editingCellId, a, at, Wt, tn]);
  const ze = l.useRef(null), [nn, lo] = l.useState(0), [St, on] = l.useState(!1);
  return l.useEffect(() => {
    const I = ze.current?.parentElement;
    if (!I) return;
    const T = () => lo(I.scrollLeft);
    return I.addEventListener("scroll", T), T(), () => I.removeEventListener("scroll", T);
  }, []), l.useEffect(() => {
    const I = ze.current, T = I?.parentElement;
    if (!I || !T) return;
    const G = new ResizeObserver(() => {
      on(I.scrollWidth > T.clientWidth);
    });
    return G.observe(I), G.observe(T), on(I.scrollWidth > T.clientWidth), () => G.disconnect();
  }, []), l.useEffect(() => {
    if (!s.selectedColumnId && !s.lockedCellId) return;
    let I = !1;
    const T = (de) => {
      if (X.current) return;
      I = ze.current?.contains(de.target) ?? !1, de.target.closest('[data-slot="popover-content"], [data-slot="tooltip-content"]') && (I = !0);
    }, G = () => {
      if (!X.current) {
        if (I) {
          I = !1;
          return;
        }
        a.selectColumn(null), a.lockCell(null), I = !1;
      }
    };
    return document.addEventListener("pointerdown", T), document.addEventListener("pointerup", G), () => {
      document.removeEventListener("pointerdown", T), document.removeEventListener("pointerup", G);
    };
  }, [s.selectedColumnId, s.lockedCellId, a]), /* @__PURE__ */ u.jsx(dl.Provider, { value: X, children: /* @__PURE__ */ u.jsxs(
    "div",
    {
      ref: ze,
      "data-slot": "data-table",
      "data-slot-id": o ?? c,
      "data-resizing": w || E ? "true" : void 0,
      className: oe(
        cl({ variant: t, radius: n }),
        s.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
        e
      ),
      onClick: ao,
      ...r,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: "sticky top-0 z-20", children: /* @__PURE__ */ u.jsx("div", { className: "relative", children: /* @__PURE__ */ u.jsx(
          So,
          {
            row: ie,
            isHeader: !0,
            columnIds: q,
            onCellResizeStart: Ye,
            onCellHoverEdge: it,
            onHeaderCellClick: so,
            onHeaderCellMouseDown: io,
            draggingColumnId: E,
            frozenOffsets: ce,
            frozenWidth: ae,
            rowWidth: re,
            groupColumnId: s.groupColumnId ?? void 0,
            hasOverflow: St
          }
        ) }) }),
        /* @__PURE__ */ u.jsx("div", { className: se || s.readOnly ? "pb-3" : void 0, children: se ? (
          // 分组渲染（每组序号独立计算）
          se.map((I, T) => {
            const G = s.collapsedGroups.has(I.groupValue), de = I.rows.every((k) => s.selectedRows.has(k.id));
            return /* @__PURE__ */ u.jsxs(l.Fragment, { children: [
              /* @__PURE__ */ u.jsx(
                Sg,
                {
                  groupValue: I.groupValue,
                  rowCount: I.rows.length,
                  frozenWidth: ae,
                  rowWidth: re,
                  checkboxWidth: ne,
                  frozenNonCheckboxWidth: ue,
                  isCollapsed: G,
                  isGroupSelected: de,
                  onToggle: () => a.toggleGroupCollapse(I.groupValue),
                  onGroupSelect: () => a.toggleGroupSelect(I.groupValue, I.rows),
                  groupColumnId: s.groupColumnId,
                  isCheckboxHidden: ee,
                  hasOverflow: St
                }
              ),
              !G && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                I.rows.map((k, A) => /* @__PURE__ */ u.jsx(
                  So,
                  {
                    row: k,
                    columnIds: q,
                    rowIndex: A + 1,
                    isLastRow: A === I.rows.length - 1 && T === se.length - 1,
                    hoveringCellId: p,
                    onCellHover: g,
                    onBodyCellClick: yt,
                    frozenOffsets: ce,
                    frozenWidth: ae,
                    rowWidth: re,
                    hasOverflow: St
                  },
                  k.id
                )),
                !s.readOnly && /* @__PURE__ */ u.jsx(
                  ds,
                  {
                    rowWidth: re,
                    showBorder: !0,
                    isHovering: h?.groupValue === I.groupValue,
                    onHoverChange: (k) => v(k ? { groupValue: I.groupValue, cell: "add" } : null),
                    onInsert: () => s.groupColumnId && a.insertRowInGroup(I.groupValue, s.groupColumnId),
                    frozenWidth: ae,
                    checkboxWidth: ne,
                    isCheckboxHidden: ee
                  }
                )
              ] })
            ] }, I.groupValue);
          })
        ) : (
          // 普通渲染
          /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            i.rows.map((I, T) => /* @__PURE__ */ u.jsx(
              So,
              {
                row: I,
                columnIds: q,
                rowIndex: T + 1,
                isLastRow: !1,
                hoveringCellId: p,
                onCellHover: g,
                onBodyCellClick: yt,
                frozenOffsets: ce,
                frozenWidth: ae,
                rowWidth: re,
                hasOverflow: St
              },
              I.id
            )),
            !s.readOnly && /* @__PURE__ */ u.jsx(
              ds,
              {
                rowWidth: re,
                showBorder: !1,
                isHovering: m !== null,
                onHoverChange: (I) => x(I ? "add" : null),
                onInsert: () => a.insertRow(),
                frozenWidth: ae,
                checkboxWidth: ne,
                isCheckboxHidden: ee
              }
            )
          ] })
        ) }),
        (d || w) && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${s.frozenColumns.has(d || w || "") ? be + nn : be}px`
            }
          }
        ),
        E && _ && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${s.frozenColumns.has(_) ? ye + nn : ye}px`
            }
          }
        ),
        E && W && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none",
            style: {
              left: `${Z}px`,
              width: `${st}px`
            }
          }
        )
      ]
    }
  ) });
}
export {
  xe as Button,
  ut as Cell,
  Og as CellSlot,
  Po as Checkbox,
  Dg as DataTable,
  Ze as Input,
  Ig as NavigationItem,
  Hp as Select,
  Up as SelectContent,
  Gp as SelectItem,
  Bp as SelectTrigger,
  Yp as SelectValue,
  jg as Table,
  Pg as Tabs,
  Ag as TabsContent,
  _n as TabsContext,
  Ng as TabsList,
  Tg as TabsTrigger,
  uc as buttonVariants,
  ju as cellVariants,
  _u as checkboxVariants,
  oe as cn,
  cl as dataTableVariants,
  pc as inputVariants,
  Kp as navigationItemVariants,
  Vp as selectTriggerVariants,
  Ks as slotVariants,
  Xp as tableVariants,
  Au as tabsListVariants,
  Ou as tabsTriggerVariants
};
//# sourceMappingURL=index.js.map
