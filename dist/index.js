import * as a from "react";
import Ke, { useLayoutEffect as cl, useState as ul } from "react";
import * as At from "react-dom";
import dl from "react-dom";
function us(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = us(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function ds() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = us(e)) && (o && (o += " "), o += t);
  return o;
}
const fl = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    n[o] = e[o];
  for (let o = 0; o < t.length; o++)
    n[e.length + o] = t[o];
  return n;
}, pl = (e, t) => ({
  classGroupId: e,
  validator: t
}), fs = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), yn = "-", gr = [], ml = "arbitrary..", hl = (e) => {
  const t = vl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (s) => {
      if (s.startsWith("[") && s.endsWith("]"))
        return gl(s);
      const l = s.split(yn), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return ps(l, c, t);
    },
    getConflictingClassGroupIds: (s, l) => {
      if (l) {
        const c = o[s], d = n[s];
        return c ? d ? fl(d, c) : c : d || gr;
      }
      return n[s] || gr;
    }
  };
}, ps = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const r = e[t], i = n.nextPart.get(r);
  if (i) {
    const d = ps(e, t + 1, i);
    if (d) return d;
  }
  const s = n.validators;
  if (s === null)
    return;
  const l = t === 0 ? e.join(yn) : e.slice(t).join(yn), c = s.length;
  for (let d = 0; d < c; d++) {
    const f = s[d];
    if (f.validator(l))
      return f.classGroupId;
  }
}, gl = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), o = t.slice(0, n);
  return o ? ml + o : void 0;
})(), vl = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return xl(n, t);
}, xl = (e, t) => {
  const n = fs();
  for (const o in e) {
    const r = e[o];
    Do(r, n, o, t);
  }
  return n;
}, Do = (e, t, n, o) => {
  const r = e.length;
  for (let i = 0; i < r; i++) {
    const s = e[i];
    bl(s, t, n, o);
  }
}, bl = (e, t, n, o) => {
  if (typeof e == "string") {
    wl(e, t, n);
    return;
  }
  if (typeof e == "function") {
    yl(e, t, n, o);
    return;
  }
  Cl(e, t, n, o);
}, wl = (e, t, n) => {
  const o = e === "" ? t : ms(t, e);
  o.classGroupId = n;
}, yl = (e, t, n, o) => {
  if (Sl(e)) {
    Do(e(o), t, n, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(pl(n, e));
}, Cl = (e, t, n, o) => {
  const r = Object.entries(e), i = r.length;
  for (let s = 0; s < i; s++) {
    const [l, c] = r[s];
    Do(c, ms(t, l), n, o);
  }
}, ms = (e, t) => {
  let n = e;
  const o = t.split(yn), r = o.length;
  for (let i = 0; i < r; i++) {
    const s = o[i];
    let l = n.nextPart.get(s);
    l || (l = fs(), n.nextPart.set(s, l)), n = l;
  }
  return n;
}, Sl = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, El = (e) => {
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
}, bo = "!", vr = ":", Rl = [], xr = (e, t, n, o, r) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: o,
  isExternal: r
}), kl = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const i = [];
    let s = 0, l = 0, c = 0, d;
    const f = r.length;
    for (let m = 0; m < f; m++) {
      const x = r[m];
      if (s === 0 && l === 0) {
        if (x === vr) {
          i.push(r.slice(c, m)), c = m + 1;
          continue;
        }
        if (x === "/") {
          d = m;
          continue;
        }
      }
      x === "[" ? s++ : x === "]" ? s-- : x === "(" ? l++ : x === ")" && l--;
    }
    const p = i.length === 0 ? r : r.slice(c);
    let g = p, h = !1;
    p.endsWith(bo) ? (g = p.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(bo) && (g = p.slice(1), h = !0)
    );
    const v = d && d > c ? d - c : void 0;
    return xr(i, h, g, v);
  };
  if (t) {
    const r = t + vr, i = o;
    o = (s) => s.startsWith(r) ? i(s.slice(r.length)) : xr(Rl, !1, s, void 0, !0);
  }
  if (n) {
    const r = o;
    o = (i) => n({
      className: i,
      parseClassName: r
    });
  }
  return o;
}, Pl = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, o) => {
    t.set(n, 1e6 + o);
  }), (n) => {
    const o = [];
    let r = [];
    for (let i = 0; i < n.length; i++) {
      const s = n[i], l = s[0] === "[", c = t.has(s);
      l || c ? (r.length > 0 && (r.sort(), o.push(...r), r = []), o.push(s)) : r.push(s);
    }
    return r.length > 0 && (r.sort(), o.push(...r)), o;
  };
}, Nl = (e) => ({
  cache: El(e.cacheSize),
  parseClassName: kl(e),
  sortModifiers: Pl(e),
  postfixLookupClassGroupIds: Tl(e),
  ...hl(e)
}), Tl = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let o = 0; o < n.length; o++)
      t[n[o]] = !0;
  return t;
}, Ol = /\s+/, Il = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: i,
    postfixLookupClassGroupIds: s
  } = t, l = [], c = e.trim().split(Ol);
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
    let b = !!x, w;
    if (b) {
      const E = m.substring(0, x);
      w = o(E);
      const R = w && s[w] ? o(m) : void 0;
      R && R !== w && (w = R, b = !1);
    } else
      w = o(m);
    if (!w) {
      if (!b) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (w = o(m), !w) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      b = !1;
    }
    const y = h.length === 0 ? "" : h.length === 1 ? h[0] : i(h).join(":"), C = v ? y + bo : y, k = C + w;
    if (l.indexOf(k) > -1)
      continue;
    l.push(k);
    const N = r(w, b);
    for (let E = 0; E < N.length; ++E) {
      const R = N[E];
      l.push(C + R);
    }
    d = p + (d.length > 0 ? " " + d : d);
  }
  return d;
}, Al = (...e) => {
  let t = 0, n, o, r = "";
  for (; t < e.length; )
    (n = e[t++]) && (o = hs(n)) && (r && (r += " "), r += o);
  return r;
}, hs = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = hs(e[o])) && (n && (n += " "), n += t);
  return n;
}, jl = (e, ...t) => {
  let n, o, r, i;
  const s = (c) => {
    const d = t.reduce((f, p) => p(f), e());
    return n = Nl(d), o = n.cache.get, r = n.cache.set, i = l, l(c);
  }, l = (c) => {
    const d = o(c);
    if (d)
      return d;
    const f = Il(c, n);
    return r(c, f), f;
  };
  return i = s, (...c) => i(Al(...c));
}, _l = [], ye = (e) => {
  const t = (n) => n[e] || _l;
  return t.isThemeGetter = !0, t;
}, gs = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, vs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ml = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Dl = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, $l = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ll = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, zl = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fl = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ye = (e) => Ml.test(e), ae = (e) => !!e && !Number.isNaN(Number(e)), je = (e) => !!e && Number.isInteger(Number(e)), ro = (e) => e.endsWith("%") && ae(e.slice(0, -1)), Fe = (e) => Dl.test(e), xs = () => !0, Wl = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  $l.test(e) && !Ll.test(e)
), $o = () => !1, Vl = (e) => zl.test(e), Bl = (e) => Fl.test(e), Hl = (e) => !B(e) && !U(e), Ul = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Gl = (e) => Qe(e, ys, $o), B = (e) => gs.test(e), at = (e) => Qe(e, Cs, Wl), br = (e) => Qe(e, ec, ae), Yl = (e) => Qe(e, Es, xs), Kl = (e) => Qe(e, Ss, $o), wr = (e) => Qe(e, bs, $o), Xl = (e) => Qe(e, ws, Bl), on = (e) => Qe(e, Rs, Vl), U = (e) => vs.test(e), Wt = (e) => vt(e, Cs), ql = (e) => vt(e, Ss), yr = (e) => vt(e, bs), Zl = (e) => vt(e, ys), Jl = (e) => vt(e, ws), rn = (e) => vt(e, Rs, !0), Ql = (e) => vt(e, Es, !0), Qe = (e, t, n) => {
  const o = gs.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, vt = (e, t, n = !1) => {
  const o = vs.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, bs = (e) => e === "position" || e === "percentage", ws = (e) => e === "image" || e === "url", ys = (e) => e === "length" || e === "size" || e === "bg-size", Cs = (e) => e === "length", ec = (e) => e === "number", Ss = (e) => e === "family-name", Es = (e) => e === "number" || e === "weight", Rs = (e) => e === "shadow", tc = () => {
  const e = ye("color"), t = ye("font"), n = ye("text"), o = ye("font-weight"), r = ye("tracking"), i = ye("leading"), s = ye("breakpoint"), l = ye("container"), c = ye("spacing"), d = ye("radius"), f = ye("shadow"), p = ye("inset-shadow"), g = ye("text-shadow"), h = ye("drop-shadow"), v = ye("blur"), m = ye("perspective"), x = ye("aspect"), b = ye("ease"), w = ye("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
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
  ], k = () => [...C(), U, B], N = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], R = () => [U, B, c], z = () => [Ye, "full", "auto", ...R()], M = () => [je, "none", "subgrid", U, B], D = () => ["auto", {
    span: ["full", je, U, B]
  }, je, U, B], Y = () => [je, "auto", U, B], W = () => ["auto", "min", "max", "fr", U, B], Z = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], J = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...R()], G = () => [Ye, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...R()], H = () => [Ye, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...R()], Q = () => [Ye, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...R()], $ = () => [e, U, B], P = () => [...C(), yr, wr, {
    position: [U, B]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", Zl, Gl, {
    size: [U, B]
  }], se = () => [ro, Wt, at], oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    U,
    B
  ], ie = () => ["", ae, Wt, at], _ = () => ["solid", "dashed", "dotted", "double"], te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ee = () => [ae, ro, yr, wr], ue = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    U,
    B
  ], ce = () => ["none", ae, U, B], re = () => ["none", ae, U, B], ve = () => [ae, U, B], be = () => [Ye, "full", ...R()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Fe],
      breakpoint: [Fe],
      color: [xs],
      container: [Fe],
      "drop-shadow": [Fe],
      ease: ["in", "out", "in-out"],
      font: [Hl],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Fe],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Fe],
      shadow: [Fe],
      spacing: ["px", ae],
      text: [Fe],
      "text-shadow": [Fe],
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
        aspect: ["auto", "square", Ye, B, U, x]
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
        "@container": ["", "normal", "size", U, B]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [Ul],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ae, B, U, l]
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
        object: k()
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
        overscroll: E()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": E()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": E()
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
        inset: z()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": z()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": z()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": z(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: z()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": z(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: z()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": z()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": z()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: z()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: z()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: z()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: z()
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
        z: [je, "auto", U, B]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ye, "full", "auto", l, ...R()]
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
        flex: [ae, Ye, "auto", "initial", "none", B]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ae, U, B]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ae, U, B]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [je, "first", "last", "none", U, B]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": M()
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
        "col-start": Y()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Y()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": M()
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
        "row-start": Y()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Y()
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
        "auto-cols": W()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": W()
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
        m: V()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: V()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: V()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: V()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: V()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: V()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: V()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: V()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: V()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: V()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: V()
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
        size: G()
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
        w: [l, "screen", ...G()]
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
          ...G()
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
            screen: [s]
          },
          ...G()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...G()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...G()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...G()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Wt, at]
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
        font: [o, Ql, Yl]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ro, B]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ql, Kl, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [B]
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
        tracking: [r, U, B]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ae, "none", U, br]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...R()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", U, B]
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
        list: ["disc", "decimal", "none", U, B]
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
        decoration: [..._(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ae, "from-font", "auto", U, at]
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
        "underline-offset": [ae, "auto", U, B]
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
        tab: [je, U, B]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", U, B]
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
        content: ["none", U, B]
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
        bg: K()
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
          }, je, U, B],
          radial: ["", U, B],
          conic: [je, U, B]
        }, Jl, Xl]
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
        from: se()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: se()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: se()
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
        rounded: oe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": oe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": oe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": oe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": oe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": oe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": oe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": oe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": oe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": oe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": oe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": oe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": oe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": oe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": oe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ie()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ie()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ie()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ie()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ie()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ie()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ie()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ie()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ie()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ie()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ie()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ie()
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
        "divide-y": ie()
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
        border: [..._(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [..._(), "hidden", "none"]
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
        outline: [..._(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ae, U, B]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ae, Wt, at]
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
          rn,
          on
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
        "inset-shadow": ["none", p, rn, on]
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
        ring: ie()
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
        "ring-offset": [ae, at]
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
        "inset-ring": ie()
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
        "text-shadow": ["none", g, rn, on]
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
        opacity: [ae, U, B]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...te(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": te()
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
        "mask-linear": [ae]
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
        "mask-radial": [U, B]
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
        "mask-conic": [ae]
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
        mask: K()
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
        mask: ["none", U, B]
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
          U,
          B
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
        brightness: [ae, U, B]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ae, U, B]
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
          rn,
          on
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
        grayscale: ["", ae, U, B]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ae, U, B]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ae, U, B]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ae, U, B]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ae, U, B]
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
          U,
          B
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
        "backdrop-brightness": [ae, U, B]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ae, U, B]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ae, U, B]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ae, U, B]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ae, U, B]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ae, U, B]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ae, U, B]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ae, U, B]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", U, B]
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
        duration: [ae, "initial", U, B]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, U, B]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ae, U, B]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, U, B]
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
        perspective: [m, U, B]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": k()
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
        scale: re()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": re()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": re()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": re()
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
        skew: ve()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ve()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ve()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [U, B, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: k()
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
        translate: be()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": be()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": be()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": be()
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
        zoom: [je, U, B]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", U, B]
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
        "will-change": ["auto", "scroll", "contents", "transform", U, B]
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
        stroke: [ae, Wt, at, br]
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
}, nc = /* @__PURE__ */ jl(tc);
function ne(...e) {
  return nc(ds(e));
}
var sn = { exports: {} }, Vt = {};
var Cr;
function oc() {
  if (Cr) return Vt;
  Cr = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), r.key !== void 0 && (s = "" + r.key), "key" in r) {
      i = {};
      for (var l in r)
        l !== "key" && (i[l] = r[l]);
    } else i = r;
    return r = i.ref, {
      $$typeof: e,
      type: o,
      key: s,
      ref: r !== void 0 ? r : null,
      props: i
    };
  }
  return Vt.Fragment = t, Vt.jsx = n, Vt.jsxs = n, Vt;
}
var Bt = {};
var Sr;
function rc() {
  return Sr || (Sr = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(P) {
      if (P == null) return null;
      if (typeof P == "function")
        return P.$$typeof === D ? null : P.displayName || P.name || null;
      if (typeof P == "string") return P;
      switch (P) {
        case x:
          return "Fragment";
        case w:
          return "Profiler";
        case b:
          return "StrictMode";
        case N:
          return "Suspense";
        case E:
          return "SuspenseList";
        case M:
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
          case k:
            var K = P.render;
            return P = P.displayName, P || (P = K.displayName || K.name || "", P = P !== "" ? "ForwardRef(" + P + ")" : "ForwardRef"), P;
          case R:
            return K = P.displayName || null, K !== null ? K : e(P.type) || "Memo";
          case z:
            K = P._payload, P = P._init;
            try {
              return e(P(K));
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
        var K = !1;
      } catch {
        K = !0;
      }
      if (K) {
        K = console;
        var q = K.error, se = typeof Symbol == "function" && Symbol.toStringTag && P[Symbol.toStringTag] || P.constructor.name || "Object";
        return q.call(
          K,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          se
        ), t(P);
      }
    }
    function o(P) {
      if (P === x) return "<>";
      if (typeof P == "object" && P !== null && P.$$typeof === z)
        return "<...>";
      try {
        var K = e(P);
        return K ? "<" + K + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var P = Y.A;
      return P === null ? null : P.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function s(P) {
      if (W.call(P, "key")) {
        var K = Object.getOwnPropertyDescriptor(P, "key").get;
        if (K && K.isReactWarning) return !1;
      }
      return P.key !== void 0;
    }
    function l(P, K) {
      function q() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          K
        ));
      }
      q.isReactWarning = !0, Object.defineProperty(P, "key", {
        get: q,
        configurable: !0
      });
    }
    function c() {
      var P = e(this.type);
      return G[P] || (G[P] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), P = this.props.ref, P !== void 0 ? P : null;
    }
    function d(P, K, q, se, oe, ie) {
      var _ = q.ref;
      return P = {
        $$typeof: v,
        type: P,
        key: K,
        props: q,
        _owner: se
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(P, "ref", {
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
        value: oe
      }), Object.defineProperty(P, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ie
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    }
    function f(P, K, q, se, oe, ie) {
      var _ = K.children;
      if (_ !== void 0)
        if (se)
          if (Z(_)) {
            for (se = 0; se < _.length; se++)
              p(_[se]);
            Object.freeze && Object.freeze(_);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(_);
      if (W.call(K, "key")) {
        _ = e(P);
        var te = Object.keys(K).filter(function(ue) {
          return ue !== "key";
        });
        se = 0 < te.length ? "{key: someKey, " + te.join(": ..., ") + ": ...}" : "{key: someKey}", $[_ + se] || (te = 0 < te.length ? "{" + te.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          se,
          _,
          te,
          _
        ), $[_ + se] = !0);
      }
      if (_ = null, q !== void 0 && (n(q), _ = "" + q), s(K) && (n(K.key), _ = "" + K.key), "key" in K) {
        q = {};
        for (var ee in K)
          ee !== "key" && (q[ee] = K[ee]);
      } else q = K;
      return _ && l(
        q,
        typeof P == "function" ? P.displayName || P.name || "Unknown" : P
      ), d(
        P,
        _,
        q,
        r(),
        oe,
        ie
      );
    }
    function p(P) {
      g(P) ? P._store && (P._store.validated = 1) : typeof P == "object" && P !== null && P.$$typeof === z && (P._payload.status === "fulfilled" ? g(P._payload.value) && P._payload.value._store && (P._payload.value._store.validated = 1) : P._store && (P._store.validated = 1));
    }
    function g(P) {
      return typeof P == "object" && P !== null && P.$$typeof === v;
    }
    var h = Ke, v = /* @__PURE__ */ Symbol.for("react.transitional.element"), m = /* @__PURE__ */ Symbol.for("react.portal"), x = /* @__PURE__ */ Symbol.for("react.fragment"), b = /* @__PURE__ */ Symbol.for("react.strict_mode"), w = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.consumer"), C = /* @__PURE__ */ Symbol.for("react.context"), k = /* @__PURE__ */ Symbol.for("react.forward_ref"), N = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), M = /* @__PURE__ */ Symbol.for("react.activity"), D = /* @__PURE__ */ Symbol.for("react.client.reference"), Y = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = Object.prototype.hasOwnProperty, Z = Array.isArray, J = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(P) {
        return P();
      }
    };
    var V, G = {}, H = h.react_stack_bottom_frame.bind(
      h,
      i
    )(), Q = J(o(i)), $ = {};
    Bt.Fragment = x, Bt.jsx = function(P, K, q) {
      var se = 1e4 > Y.recentlyCreatedOwnerStacks++;
      return f(
        P,
        K,
        q,
        !1,
        se ? Error("react-stack-top-frame") : H,
        se ? J(o(P)) : Q
      );
    }, Bt.jsxs = function(P, K, q) {
      var se = 1e4 > Y.recentlyCreatedOwnerStacks++;
      return f(
        P,
        K,
        q,
        !0,
        se ? Error("react-stack-top-frame") : H,
        se ? J(o(P)) : Q
      );
    };
  })()), Bt;
}
var Er;
function sc() {
  return Er || (Er = 1, process.env.NODE_ENV === "production" ? sn.exports = oc() : sn.exports = rc()), sn.exports;
}
var u = sc();
const Rr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, kr = ds, Se = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return kr(e, n?.class, n?.className);
  const { variants: r, defaultVariants: i } = t, s = Object.keys(r).map((d) => {
    const f = n?.[d], p = i?.[d];
    if (f === null) return null;
    const g = Rr(f) || Rr(p);
    return r[d][g];
  }), l = n && Object.entries(n).reduce((d, f) => {
    let [p, g] = f;
    return g === void 0 || (d[p] = g), d;
  }, {}), c = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((d, f) => {
    let { class: p, className: g, ...h } = f;
    return Object.entries(h).every((v) => {
      let [m, x] = v;
      return Array.isArray(x) ? x.includes({
        ...i,
        ...l
      }[m]) : {
        ...i,
        ...l
      }[m] === x;
    }) ? [
      ...d,
      p,
      g
    ] : d;
  }, []);
  return kr(e, s, c, n?.class, n?.className);
}, ic = Se(
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
function ge({
  className: e,
  variant: t,
  size: n,
  noShift: o,
  disabled: r,
  leftIcon: i,
  rightIcon: s,
  children: l,
  slotId: c,
  ...d
}) {
  const f = a.useId();
  return /* @__PURE__ */ u.jsxs(
    "button",
    {
      "data-slot": "button",
      "data-slot-id": c ?? f,
      disabled: r,
      className: ne(ic({ variant: t, size: n, noShift: o, disabled: r, className: e })),
      ...d,
      children: [
        i && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${i}` }) }),
        l,
        s && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${s}` }) })
      ]
    }
  );
}
const ac = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, lc = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, cc = Se(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: ac,
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
), uc = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" }
};
function qe({ className: e, variant: t, size: n, noSpinner: o, disabled: r, leftIcon: i, rightIcon: s, slotId: l, ...c }) {
  const d = r || t === "disabled", p = uc[n ?? "base"], g = a.useId();
  return !i && !s ? /* @__PURE__ */ u.jsx(
    "input",
    {
      "data-slot": "input",
      "data-slot-id": l ?? g,
      disabled: d,
      className: ne(
        cc({ variant: t, size: n, noSpinner: o }),
        d && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
        e
      ),
      ...c
    }
  ) : /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "input",
      "data-slot-id": l ?? g,
      className: ne(
        "flex items-center border bg-white-100 outline-none transition-all",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        lc[t ?? "basic"],
        t === "disabled" && "cursor-not-allowed",
        e
      ),
      children: [
        i && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${i}` }) }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            disabled: d,
            className: ne(
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
function so(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function dc(e, t = []) {
  let n = [];
  function o(i, s) {
    const l = a.createContext(s);
    l.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = a.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = a.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => a.createContext(s));
    return function(l) {
      const c = l?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, fc(r, ...t)];
}
function fc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((l, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...l, ...p };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Et(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function ks(e, t = []) {
  let n = [];
  function o(i, s) {
    const l = a.createContext(s);
    l.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = a.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = a.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => a.createContext(s));
    return function(l) {
      const c = l?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, pc(r, ...t)];
}
function pc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((l, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...l, ...p };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Pr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function mc(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Pr(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Pr(e[r], null);
        }
      };
  };
}
function Cn(...e) {
  return a.useCallback(mc(...e), e);
}
// @__NO_SIDE_EFFECTS__
function wo(e) {
  const t = a.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, l = !1;
    const c = [];
    Nr(r) && typeof an == "function" && (r = an(r._payload)), a.Children.forEach(r, (g) => {
      if (bc(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        Nr(v) && typeof an == "function" && (v = an(v._payload)), s = gc(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = a.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && a.Children.count(r) === 1 && a.isValidElement(r) && (s = r)
    );
    const d = s ? xc(s) : void 0, f = Cn(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          l ? Sc(e) : Cc(e)
        );
      return r;
    }
    const p = vc(i, s.props ?? {});
    return s.type !== a.Fragment && (p.ref = o ? f : d), a.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var hc = /* @__PURE__ */ Symbol.for("radix.slottable"), gc = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return a.isValidElement(n) ? a.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return a.isValidElement(t) ? t : null;
};
function vc(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function xc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function bc(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === hc;
}
var wc = /* @__PURE__ */ Symbol.for("react.lazy");
function Nr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === wc && "_payload" in e && yc(e._payload);
}
function yc(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Cc = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Sc = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, an = a[" use ".trim().toString()];
function Ec(e) {
  const t = e + "CollectionProvider", [n, o] = ks(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: x, children: b } = m, w = a.useRef(null), y = a.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: y, collectionRef: w, children: b });
  };
  s.displayName = t;
  const l = e + "CollectionSlot", c = /* @__PURE__ */ wo(l), d = a.forwardRef(
    (m, x) => {
      const { scope: b, children: w } = m, y = i(l, b), C = Cn(x, y.collectionRef);
      return /* @__PURE__ */ u.jsx(c, { ref: C, children: w });
    }
  );
  d.displayName = l;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ wo(f), h = a.forwardRef(
    (m, x) => {
      const { scope: b, children: w, ...y } = m, C = a.useRef(null), k = Cn(x, C), N = i(f, b);
      return a.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => {
        N.itemMap.delete(C);
      })), /* @__PURE__ */ u.jsx(g, { [p]: "", ref: k, children: w });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = i(e + "CollectionConsumer", m);
    return a.useCallback(() => {
      const w = x.collectionRef.current;
      if (!w) return [];
      const y = Array.from(w.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (N, E) => y.indexOf(N.ref.current) - y.indexOf(E.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: h },
    v,
    o
  ];
}
var Ps = globalThis?.document ? a.useLayoutEffect : () => {
}, Rc = a[" useId ".trim().toString()] || (() => {
}), kc = 0;
function Pc(e) {
  const [t, n] = a.useState(Rc());
  return Ps(() => {
    n((o) => o ?? String(kc++));
  }, [e]), t ? `radix-${t}` : "";
}
var Nc = [
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
], Ns = Nc.reduce((e, t) => {
  const n = /* @__PURE__ */ wo(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Tc(e) {
  const t = a.useRef(e);
  return a.useEffect(() => {
    t.current = e;
  }), a.useMemo(() => ((...n) => t.current?.(...n)), []);
}
var Oc = a[" useInsertionEffect ".trim().toString()] || Ps;
function Ic({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = Ac({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const d = a.useCallback(
    (f) => {
      if (l) {
        const p = jc(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [l, e, i, s]
  );
  return [c, d];
}
function Ac({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = a.useState(e), r = a.useRef(n), i = a.useRef(t);
  return Oc(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function jc(e) {
  return typeof e == "function";
}
var _c = a.createContext(void 0);
function Mc(e) {
  const t = a.useContext(_c);
  return e || t || "ltr";
}
var io = "rovingFocusGroup.onEntryFocus", Dc = { bubbles: !1, cancelable: !0 }, Kt = "RovingFocusGroup", [yo, Ts, $c] = Ec(Kt), [Lc, Os] = ks(
  Kt,
  [$c]
), [zc, Fc] = Lc(Kt), Is = a.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(yo.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(yo.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(Wc, { ...e, ref: t }) }) })
);
Is.displayName = Kt;
var Wc = a.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: i,
    currentTabStopId: s,
    defaultCurrentTabStopId: l,
    onCurrentTabStopIdChange: c,
    onEntryFocus: d,
    preventScrollOnEntryFocus: f = !1,
    ...p
  } = e, g = a.useRef(null), h = Cn(t, g), v = Mc(i), [m, x] = Ic({
    prop: s,
    defaultProp: l ?? null,
    onChange: c,
    caller: Kt
  }), [b, w] = a.useState(!1), y = Tc(d), C = Ts(n), k = a.useRef(!1), [N, E] = a.useState(0);
  return a.useEffect(() => {
    const R = g.current;
    if (R)
      return R.addEventListener(io, y), () => R.removeEventListener(io, y);
  }, [y]), /* @__PURE__ */ u.jsx(
    zc,
    {
      scope: n,
      orientation: o,
      dir: v,
      loop: r,
      currentTabStopId: m,
      onItemFocus: a.useCallback(
        (R) => x(R),
        [x]
      ),
      onItemShiftTab: a.useCallback(() => w(!0), []),
      onFocusableItemAdd: a.useCallback(
        () => E((R) => R + 1),
        []
      ),
      onFocusableItemRemove: a.useCallback(
        () => E((R) => R - 1),
        []
      ),
      children: /* @__PURE__ */ u.jsx(
        Ns.div,
        {
          tabIndex: b || N === 0 ? -1 : 0,
          "data-orientation": o,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: Et(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: Et(e.onFocus, (R) => {
            const z = !k.current;
            if (R.target === R.currentTarget && z && !b) {
              const M = new CustomEvent(io, Dc);
              if (R.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const D = C().filter((V) => V.focusable), Y = D.find((V) => V.active), W = D.find((V) => V.id === m), J = [Y, W, ...D].filter(
                  Boolean
                ).map((V) => V.ref.current);
                _s(J, f);
              }
            }
            k.current = !1;
          }),
          onBlur: Et(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), As = "RovingFocusGroupItem", js = a.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: i,
      children: s,
      ...l
    } = e, c = Pc(), d = i || c, f = Fc(As, n), p = f.currentTabStopId === d, g = Ts(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: m } = f;
    return a.useEffect(() => {
      if (o)
        return h(), () => v();
    }, [o, h, v]), /* @__PURE__ */ u.jsx(
      yo.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ u.jsx(
          Ns.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": f.orientation,
            ...l,
            ref: t,
            onMouseDown: Et(e.onMouseDown, (x) => {
              o ? f.onItemFocus(d) : x.preventDefault();
            }),
            onFocus: Et(e.onFocus, () => f.onItemFocus(d)),
            onKeyDown: Et(e.onKeyDown, (x) => {
              if (x.key === "Tab" && x.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (x.target !== x.currentTarget) return;
              const b = Hc(x, f.orientation, f.dir);
              if (b !== void 0) {
                if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
                x.preventDefault();
                let y = g().filter((C) => C.focusable).map((C) => C.ref.current);
                if (b === "last") y.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && y.reverse();
                  const C = y.indexOf(x.currentTarget);
                  y = f.loop ? Uc(y, C + 1) : y.slice(C + 1);
                }
                setTimeout(() => _s(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: p, hasTabStop: m != null }) : s
          }
        )
      }
    );
  }
);
js.displayName = As;
var Vc = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Bc(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Hc(e, t, n) {
  const o = Bc(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return Vc[o];
}
function _s(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Uc(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Gc = Is, Yc = js, Sn = globalThis?.document ? a.useLayoutEffect : () => {
};
function Kc(e, t) {
  return a.useReducer((n, o) => t[n][o] ?? n, e);
}
var Ms = (e) => {
  const { present: t, children: n } = e, o = Xc(t), r = typeof n == "function" ? n({ present: o.isPresent }) : a.Children.only(n), i = qc(o.ref, Zc(r));
  return typeof n == "function" || o.isPresent ? a.cloneElement(r, { ref: i }) : null;
};
Ms.displayName = "Presence";
function Xc(e) {
  const [t, n] = a.useState(), o = a.useRef(null), r = a.useRef(e), i = a.useRef("none"), s = e ? "mounted" : "unmounted", [l, c] = Kc(s, {
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
  return a.useEffect(() => {
    const d = ln(o.current);
    i.current = l === "mounted" ? d : "none";
  }, [l]), Sn(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = ln(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Sn(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = ln(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (i.current = ln(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: a.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Tr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function qc(...e) {
  const t = a.useRef(e);
  return t.current = e, a.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const i = o.map((s) => {
      const l = Tr(s, n);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const l = i[s];
          typeof l == "function" ? l() : Tr(o[s], null);
        }
      };
  }, []);
}
function ln(e) {
  return e?.animationName || "none";
}
function Zc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Or(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Jc(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Or(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Or(e[r], null);
        }
      };
  };
}
function Qc(...e) {
  return a.useCallback(Jc(...e), e);
}
// @__NO_SIDE_EFFECTS__
function eu(e) {
  const t = a.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, l = !1;
    const c = [];
    Ir(r) && typeof cn == "function" && (r = cn(r._payload)), a.Children.forEach(r, (g) => {
      if (su(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        Ir(v) && typeof cn == "function" && (v = cn(v._payload)), s = nu(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = a.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && a.Children.count(r) === 1 && a.isValidElement(r) && (s = r)
    );
    const d = s ? ru(s) : void 0, f = Qc(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          l ? cu(e) : lu(e)
        );
      return r;
    }
    const p = ou(i, s.props ?? {});
    return s.type !== a.Fragment && (p.ref = o ? f : d), a.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var tu = /* @__PURE__ */ Symbol.for("radix.slottable"), nu = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return a.isValidElement(n) ? a.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return a.isValidElement(t) ? t : null;
};
function ou(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function ru(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function su(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === tu;
}
var iu = /* @__PURE__ */ Symbol.for("react.lazy");
function Ir(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === iu && "_payload" in e && au(e._payload);
}
function au(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var lu = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, cu = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, cn = a[" use ".trim().toString()], uu = [
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
], In = uu.reduce((e, t) => {
  const n = /* @__PURE__ */ eu(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), du = a.createContext(void 0);
function fu(e) {
  const t = a.useContext(du);
  return e || t || "ltr";
}
var pu = a[" useInsertionEffect ".trim().toString()] || Sn;
function mu({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = hu({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const d = a.useCallback(
    (f) => {
      if (l) {
        const p = gu(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [l, e, i, s]
  );
  return [c, d];
}
function hu({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = a.useState(e), r = a.useRef(n), i = a.useRef(t);
  return pu(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function gu(e) {
  return typeof e == "function";
}
var vu = a[" useId ".trim().toString()] || (() => {
}), xu = 0;
function bu(e) {
  const [t, n] = a.useState(vu());
  return Sn(() => {
    n((o) => o ?? String(xu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var An = "Tabs", [wu] = dc(An, [
  Os
]), Ds = Os(), [yu, Lo] = wu(An), $s = a.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: o,
      onValueChange: r,
      defaultValue: i,
      orientation: s = "horizontal",
      dir: l,
      activationMode: c = "automatic",
      ...d
    } = e, f = fu(l), [p, g] = mu({
      prop: o,
      onChange: r,
      defaultProp: i ?? "",
      caller: An
    });
    return /* @__PURE__ */ u.jsx(
      yu,
      {
        scope: n,
        baseId: bu(),
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
$s.displayName = An;
var Ls = "TabsList", zs = a.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e, i = Lo(Ls, n), s = Ds(n);
    return /* @__PURE__ */ u.jsx(
      Gc,
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
zs.displayName = Ls;
var Fs = "TabsTrigger", Ws = a.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...i } = e, s = Lo(Fs, n), l = Ds(n), c = Hs(s.baseId, o), d = Us(s.baseId, o), f = o === s.value;
    return /* @__PURE__ */ u.jsx(
      Yc,
      {
        asChild: !0,
        ...l,
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
            onMouseDown: so(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? s.onValueChange(o) : p.preventDefault();
            }),
            onKeyDown: so(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && s.onValueChange(o);
            }),
            onFocus: so(e.onFocus, () => {
              const p = s.activationMode !== "manual";
              !f && !r && p && s.onValueChange(o);
            })
          }
        )
      }
    );
  }
);
Ws.displayName = Fs;
var Vs = "TabsContent", Bs = a.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: i, ...s } = e, l = Lo(Vs, n), c = Hs(l.baseId, o), d = Us(l.baseId, o), f = o === l.value, p = a.useRef(f);
    return a.useEffect(() => {
      const g = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(g);
    }, []), /* @__PURE__ */ u.jsx(Ms, { present: r || f, children: ({ present: g }) => /* @__PURE__ */ u.jsx(
      In.div,
      {
        "data-state": f ? "active" : "inactive",
        "data-orientation": l.orientation,
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
Bs.displayName = Vs;
function Hs(e, t) {
  return `${e}-trigger-${t}`;
}
function Us(e, t) {
  return `${e}-content-${t}`;
}
var Cu = $s, Su = zs, Eu = Ws, Ru = Bs;
const jn = a.createContext({ size: "base" });
function wg({ className: e, size: t = "base", children: n, slotId: o, ...r }) {
  const i = a.useId();
  return /* @__PURE__ */ u.jsx(jn.Provider, { value: { size: t }, children: /* @__PURE__ */ u.jsx(Cu, { "data-slot": "tabs", "data-slot-id": o ?? i, className: ne(e), ...r, children: n }) });
}
const ku = Se(
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
function yg({ className: e, variant: t, slotId: n, ...o }) {
  const { size: r } = a.useContext(jn), i = a.useId();
  return /* @__PURE__ */ u.jsx(
    Su,
    {
      "data-slot": "tabs-list",
      "data-slot-id": n ?? i,
      className: ne(ku({ variant: t, size: r }), e),
      ...o
    }
  );
}
const Pu = Se(
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
function Cg({ className: e, variant: t, disabled: n, ...o }) {
  const { size: r } = a.useContext(jn);
  return /* @__PURE__ */ u.jsx(
    Eu,
    {
      "data-slot": "tabs-trigger",
      "data-slot-id": o.value,
      disabled: n,
      className: ne(Pu({ variant: t, size: r, disabled: n }), e),
      ...o
    }
  );
}
const Nu = Se(
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
function Sg({ className: e, slotId: t, ...n }) {
  const { size: o } = a.useContext(jn), r = a.useId();
  return /* @__PURE__ */ u.jsx(
    Ru,
    {
      "data-slot": "tabs-content",
      "data-slot-id": t ?? r,
      className: ne(Nu({ size: o }), e),
      ...n
    }
  );
}
const Tu = Se(
  "relative flex items-stretch overflow-hidden transition-colors",
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
), Gs = Se(
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
), ct = a.memo(function({ className: t, variant: n, width: o, columnId: r, children: i, isLastCell: s, resizable: l, onResizeStart: c, onHoverEdge: d, slotClassName: f, style: p, ...g }) {
  const h = a.useId(), v = a.useCallback((y) => {
    y.preventDefault(), y.stopPropagation(), c && c(o ?? 80, y.clientX);
  }, [c, o]), m = a.useCallback(() => {
    d?.(!0);
  }, [d]), x = a.useCallback(() => {
    d?.(!1);
  }, [d]), b = l && !s, w = a.useMemo(() => ({
    ...p,
    ...o ? { width: `${o}px`, minWidth: `${o}px` } : {}
  }), [p, o]);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "cell",
      "data-slot-id": r ?? h,
      className: ne(
        Tu({ variant: n, className: t }),
        !s && "border-r border-neutral-2"
      ),
      style: w,
      ...g,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: ne(Gs({ size: "base" }), f), children: i ?? /* @__PURE__ */ u.jsx("span", { className: "text-black-85", children: "文本单元格" }) }),
        b && /* @__PURE__ */ u.jsx(
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
}), Eg = a.memo(function({
  className: t,
  size: n,
  children: o,
  slotId: r,
  ...i
}) {
  const s = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "cell-slot",
      "data-slot-id": r ?? s,
      className: ne(Gs({ size: n, className: t })),
      ...i,
      children: o
    }
  );
}), Ou = Se(
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
), Iu = Se("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]"
    }
  },
  defaultVariants: { size: "base" }
}), Au = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2"
};
function Co({
  className: e,
  checked: t = !1,
  disabled: n = !1,
  size: o = "base",
  onChange: r,
  children: i,
  slotId: s,
  ...l
}) {
  const c = n, d = a.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "checkbox",
      "data-slot-id": s ?? d,
      role: "checkbox",
      "aria-checked": t,
      tabIndex: c ? void 0 : 0,
      className: ne(
        "flex items-center",
        Au[o ?? "base"],
        !c && "cursor-pointer",
        c && "cursor-not-allowed",
        e
      ),
      onClick: () => !c && r?.(!t),
      ...l,
      children: [
        /* @__PURE__ */ u.jsx(
          "div",
          {
            className: ne(
              Ou({
                checked: t ?? !1,
                disabled: n ?? !1,
                size: o ?? "base"
              })
            ),
            children: t && /* @__PURE__ */ u.jsx(
              "svg",
              {
                "aria-hidden": "true",
                className: ne(
                  Iu({ size: o }),
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
function Ar(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function pe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function ju(e, t) {
  const n = a.createContext(t), o = (i) => {
    const { children: s, ...l } = i, c = a.useMemo(() => l, Object.values(l));
    return /* @__PURE__ */ u.jsx(n.Provider, { value: c, children: s });
  };
  o.displayName = e + "Provider";
  function r(i) {
    const s = a.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [o, r];
}
function Xt(e, t = []) {
  let n = [];
  function o(i, s) {
    const l = a.createContext(s), c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = a.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = a.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => a.createContext(s));
    return function(l) {
      const c = l?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, _u(r, ...t)];
}
function _u(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((l, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...l, ...p };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function jr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ys(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = jr(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : jr(e[r], null);
        }
      };
  };
}
function xe(...e) {
  return a.useCallback(Ys(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  const t = /* @__PURE__ */ Mu(e), n = a.forwardRef((o, r) => {
    const { children: i, ...s } = o, l = a.Children.toArray(i), c = l.find($u);
    if (c) {
      const d = c.props.children, f = l.map((p) => p === c ? a.Children.count(d) > 1 ? a.Children.only(null) : a.isValidElement(d) ? d.props.children : null : p);
      return /* @__PURE__ */ u.jsx(t, { ...s, ref: r, children: a.isValidElement(d) ? a.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Mu(e) {
  const t = a.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (a.isValidElement(r)) {
      const s = zu(r), l = Lu(i, r.props);
      return r.type !== a.Fragment && (l.ref = o ? Ys(o, s) : s), a.cloneElement(r, l);
    }
    return a.Children.count(r) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Du = /* @__PURE__ */ Symbol("radix.slottable");
function $u(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Du;
}
function Lu(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function zu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Fu(e) {
  const t = e + "CollectionProvider", [n, o] = Xt(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: x, children: b } = m, w = Ke.useRef(null), y = Ke.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: y, collectionRef: w, children: b });
  };
  s.displayName = t;
  const l = e + "CollectionSlot", c = /* @__PURE__ */ Nt(l), d = Ke.forwardRef(
    (m, x) => {
      const { scope: b, children: w } = m, y = i(l, b), C = xe(x, y.collectionRef);
      return /* @__PURE__ */ u.jsx(c, { ref: C, children: w });
    }
  );
  d.displayName = l;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", g = /* @__PURE__ */ Nt(f), h = Ke.forwardRef(
    (m, x) => {
      const { scope: b, children: w, ...y } = m, C = Ke.useRef(null), k = xe(x, C), N = i(f, b);
      return Ke.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => {
        N.itemMap.delete(C);
      })), /* @__PURE__ */ u.jsx(g, { [p]: "", ref: k, children: w });
    }
  );
  h.displayName = f;
  function v(m) {
    const x = i(e + "CollectionConsumer", m);
    return Ke.useCallback(() => {
      const w = x.collectionRef.current;
      if (!w) return [];
      const y = Array.from(w.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (N, E) => y.indexOf(N.ref.current) - y.indexOf(E.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: h },
    v,
    o
  ];
}
var Wu = a.createContext(void 0);
function Vu(e) {
  const t = a.useContext(Wu);
  return e || t || "ltr";
}
var Bu = [
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
], me = Bu.reduce((e, t) => {
  const n = /* @__PURE__ */ Nt(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Hu(e, t) {
  e && At.flushSync(() => e.dispatchEvent(t));
}
function ft(e) {
  const t = a.useRef(e);
  return a.useEffect(() => {
    t.current = e;
  }), a.useMemo(() => (...n) => t.current?.(...n), []);
}
function Uu(e, t = globalThis?.document) {
  const n = ft(e);
  a.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var Gu = "DismissableLayer", So = "dismissableLayer.update", Yu = "dismissableLayer.pointerDownOutside", Ku = "dismissableLayer.focusOutside", _r, Ks = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), _n = a.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: l,
      ...c
    } = e, d = a.useContext(Ks), [f, p] = a.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = a.useState({}), v = xe(t, (E) => p(E)), m = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(x), w = f ? m.indexOf(f) : -1, y = d.layersWithOutsidePointerEventsDisabled.size > 0, C = w >= b, k = Zu((E) => {
      const R = E.target, z = [...d.branches].some((M) => M.contains(R));
      !C || z || (r?.(E), s?.(E), E.defaultPrevented || l?.());
    }, g), N = Ju((E) => {
      const R = E.target;
      [...d.branches].some((M) => M.contains(R)) || (i?.(E), s?.(E), E.defaultPrevented || l?.());
    }, g);
    return Uu((E) => {
      w === d.layers.size - 1 && (o?.(E), !E.defaultPrevented && l && (E.preventDefault(), l()));
    }, g), a.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (_r = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), Mr(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (g.body.style.pointerEvents = _r);
        };
    }, [f, g, n, d]), a.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), Mr());
    }, [f, d]), a.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(So, E), () => document.removeEventListener(So, E);
    }, []), /* @__PURE__ */ u.jsx(
      me.div,
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
          k.onPointerDownCapture
        )
      }
    );
  }
);
_n.displayName = Gu;
var Xu = "DismissableLayerBranch", qu = a.forwardRef((e, t) => {
  const n = a.useContext(Ks), o = a.useRef(null), r = xe(t, o);
  return a.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(me.div, { ...e, ref: r });
});
qu.displayName = Xu;
function Zu(e, t = globalThis?.document) {
  const n = ft(e), o = a.useRef(!1), r = a.useRef(() => {
  });
  return a.useEffect(() => {
    const i = (l) => {
      if (l.target && !o.current) {
        let c = function() {
          Xs(
            Yu,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
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
function Ju(e, t = globalThis?.document) {
  const n = ft(e), o = a.useRef(!1);
  return a.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && Xs(Ku, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Mr() {
  const e = new CustomEvent(So);
  document.dispatchEvent(e);
}
function Xs(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Hu(r, i) : r.dispatchEvent(i);
}
var ao = 0;
function zo() {
  a.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Dr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Dr()), ao++, () => {
      ao === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ao--;
    };
  }, []);
}
function Dr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var lo = "focusScope.autoFocusOnMount", co = "focusScope.autoFocusOnUnmount", $r = { bubbles: !1, cancelable: !0 }, Qu = "FocusScope", Mn = a.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: i,
    ...s
  } = e, [l, c] = a.useState(null), d = ft(r), f = ft(i), p = a.useRef(null), g = xe(t, (m) => c(m)), h = a.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  a.useEffect(() => {
    if (o) {
      let m = function(y) {
        if (h.paused || !l) return;
        const C = y.target;
        l.contains(C) ? p.current = C : Xe(p.current, { select: !0 });
      }, x = function(y) {
        if (h.paused || !l) return;
        const C = y.relatedTarget;
        C !== null && (l.contains(C) || Xe(p.current, { select: !0 }));
      }, b = function(y) {
        if (document.activeElement === document.body)
          for (const k of y)
            k.removedNodes.length > 0 && Xe(l);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", x);
      const w = new MutationObserver(b);
      return l && w.observe(l, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", x), w.disconnect();
      };
    }
  }, [o, l, h.paused]), a.useEffect(() => {
    if (l) {
      zr.add(h);
      const m = document.activeElement;
      if (!l.contains(m)) {
        const b = new CustomEvent(lo, $r);
        l.addEventListener(lo, d), l.dispatchEvent(b), b.defaultPrevented || (ed(sd(qs(l)), { select: !0 }), document.activeElement === m && Xe(l));
      }
      return () => {
        l.removeEventListener(lo, d), setTimeout(() => {
          const b = new CustomEvent(co, $r);
          l.addEventListener(co, f), l.dispatchEvent(b), b.defaultPrevented || Xe(m ?? document.body, { select: !0 }), l.removeEventListener(co, f), zr.remove(h);
        }, 0);
      };
    }
  }, [l, d, f, h]);
  const v = a.useCallback(
    (m) => {
      if (!n && !o || h.paused) return;
      const x = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, b = document.activeElement;
      if (x && b) {
        const w = m.currentTarget, [y, C] = td(w);
        y && C ? !m.shiftKey && b === C ? (m.preventDefault(), n && Xe(y, { select: !0 })) : m.shiftKey && b === y && (m.preventDefault(), n && Xe(C, { select: !0 })) : b === w && m.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ u.jsx(me.div, { tabIndex: -1, ...s, ref: g, onKeyDown: v });
});
Mn.displayName = Qu;
function ed(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (Xe(o, { select: t }), document.activeElement !== n) return;
}
function td(e) {
  const t = qs(e), n = Lr(t, e), o = Lr(t.reverse(), e);
  return [n, o];
}
function qs(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Lr(e, t) {
  for (const n of e)
    if (!nd(n, { upTo: t })) return n;
}
function nd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function od(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Xe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && od(e) && t && e.select();
  }
}
var zr = rd();
function rd() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Fr(e, t), e.unshift(t);
    },
    remove(t) {
      e = Fr(e, t), e[0]?.resume();
    }
  };
}
function Fr(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function sd(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ce = globalThis?.document ? a.useLayoutEffect : () => {
}, id = a[" useId ".trim().toString()] || (() => {
}), ad = 0;
function ut(e) {
  const [t, n] = a.useState(id());
  return Ce(() => {
    n((o) => o ?? String(ad++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const ld = ["top", "right", "bottom", "left"], Ze = Math.min, Ee = Math.max, En = Math.round, un = Math.floor, De = (e) => ({
  x: e,
  y: e
}), cd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Eo(e, t, n) {
  return Ee(e, Ze(t, n));
}
function Be(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function He(e) {
  return e.split("-")[0];
}
function jt(e) {
  return e.split("-")[1];
}
function Fo(e) {
  return e === "x" ? "y" : "x";
}
function Wo(e) {
  return e === "y" ? "height" : "width";
}
function Me(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Vo(e) {
  return Fo(Me(e));
}
function ud(e, t, n) {
  n === void 0 && (n = !1);
  const o = jt(e), r = Vo(e), i = Wo(r);
  let s = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = Rn(s)), [s, Rn(s)];
}
function dd(e) {
  const t = Rn(e);
  return [Ro(e), t, Ro(t)];
}
function Ro(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Wr = ["left", "right"], Vr = ["right", "left"], fd = ["top", "bottom"], pd = ["bottom", "top"];
function md(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Vr : Wr : t ? Wr : Vr;
    case "left":
    case "right":
      return t ? fd : pd;
    default:
      return [];
  }
}
function hd(e, t, n, o) {
  const r = jt(e);
  let i = md(He(e), n === "start", o);
  return r && (i = i.map((s) => s + "-" + r), t && (i = i.concat(i.map(Ro)))), i;
}
function Rn(e) {
  const t = He(e);
  return cd[t] + e.slice(t.length);
}
function gd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Zs(e) {
  return typeof e != "number" ? gd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function kn(e) {
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
function Br(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = Me(t), s = Vo(t), l = Wo(s), c = He(t), d = i === "y", f = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, g = o[l] / 2 - r[l] / 2;
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
  switch (jt(t)) {
    case "start":
      h[s] -= g * (n && d ? -1 : 1);
      break;
    case "end":
      h[s] += g * (n && d ? -1 : 1);
      break;
  }
  return h;
}
async function vd(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: s,
    elements: l,
    strategy: c
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: g = !1,
    padding: h = 0
  } = Be(t, e), v = Zs(h), x = l[g ? p === "floating" ? "reference" : "floating" : p], b = kn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(x))) == null || n ? x : x.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(l.floating)),
    boundary: d,
    rootBoundary: f,
    strategy: c
  })), w = p === "floating" ? {
    x: o,
    y: r,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l.floating)), C = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = kn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: w,
    offsetParent: y,
    strategy: c
  }) : w);
  return {
    top: (b.top - k.top + v.top) / C.y,
    bottom: (k.bottom - b.bottom + v.bottom) / C.y,
    left: (b.left - k.left + v.left) / C.x,
    right: (k.right - b.right + v.right) / C.x
  };
}
const xd = 50, bd = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: s
  } = n, l = s.detectOverflow ? s : {
    ...s,
    detectOverflow: vd
  }, c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: p
  } = Br(d, o, c), g = o, h = 0;
  const v = {};
  for (let m = 0; m < i.length; m++) {
    const x = i[m];
    if (!x)
      continue;
    const {
      name: b,
      fn: w
    } = x, {
      x: y,
      y: C,
      data: k,
      reset: N
    } = await w({
      x: f,
      y: p,
      initialPlacement: o,
      placement: g,
      strategy: r,
      middlewareData: v,
      rects: d,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = y ?? f, p = C ?? p, v[b] = {
      ...v[b],
      ...k
    }, N && h < xd && (h++, typeof N == "object" && (N.placement && (g = N.placement), N.rects && (d = N.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : N.rects), {
      x: f,
      y: p
    } = Br(d, g, c)), m = -1);
  }
  return {
    x: f,
    y: p,
    placement: g,
    strategy: r,
    middlewareData: v
  };
}, wd = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: s,
      elements: l,
      middlewareData: c
    } = t, {
      element: d,
      padding: f = 0
    } = Be(e, t) || {};
    if (d == null)
      return {};
    const p = Zs(f), g = {
      x: n,
      y: o
    }, h = Vo(r), v = Wo(h), m = await s.getDimensions(d), x = h === "y", b = x ? "top" : "left", w = x ? "bottom" : "right", y = x ? "clientHeight" : "clientWidth", C = i.reference[v] + i.reference[h] - g[h] - i.floating[v], k = g[h] - i.reference[h], N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let E = N ? N[y] : 0;
    (!E || !await (s.isElement == null ? void 0 : s.isElement(N))) && (E = l.floating[y] || i.floating[v]);
    const R = C / 2 - k / 2, z = E / 2 - m[v] / 2 - 1, M = Ze(p[b], z), D = Ze(p[w], z), Y = M, W = E - m[v] - D, Z = E / 2 - m[v] / 2 + R, J = Eo(Y, Z, W), V = !c.arrow && jt(r) != null && Z !== J && i.reference[v] / 2 - (Z < Y ? M : D) - m[v] / 2 < 0, G = V ? Z < Y ? Z - Y : Z - W : 0;
    return {
      [h]: g[h] + G,
      data: {
        [h]: J,
        centerOffset: Z - J - G,
        ...V && {
          alignmentOffset: G
        }
      },
      reset: V
    };
  }
}), yd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: l,
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
      const b = He(r), w = Me(l), y = He(l) === l, C = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), k = g || (y || !m ? [Rn(l)] : dd(l)), N = v !== "none";
      !g && N && k.push(...hd(l, m, v, C));
      const E = [l, ...k], R = await c.detectOverflow(t, x), z = [];
      let M = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (f && z.push(R[b]), p) {
        const Z = ud(r, s, C);
        z.push(R[Z[0]], R[Z[1]]);
      }
      if (M = [...M, {
        placement: r,
        overflows: z
      }], !z.every((Z) => Z <= 0)) {
        var D, Y;
        const Z = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1, J = E[Z];
        if (J && (!(p === "alignment" ? w !== Me(J) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((H) => Me(H.placement) === w ? H.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Z,
              overflows: M
            },
            reset: {
              placement: J
            }
          };
        let V = (Y = M.filter((G) => G.overflows[0] <= 0).sort((G, H) => G.overflows[1] - H.overflows[1])[0]) == null ? void 0 : Y.placement;
        if (!V)
          switch (h) {
            case "bestFit": {
              var W;
              const G = (W = M.filter((H) => {
                if (N) {
                  const Q = Me(H.placement);
                  return Q === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Q === "y";
                }
                return !0;
              }).map((H) => [H.placement, H.overflows.filter((Q) => Q > 0).reduce((Q, $) => Q + $, 0)]).sort((H, Q) => H[1] - Q[1])[0]) == null ? void 0 : W[0];
              G && (V = G);
              break;
            }
            case "initialPlacement":
              V = l;
              break;
          }
        if (r !== V)
          return {
            reset: {
              placement: V
            }
          };
      }
      return {};
    }
  };
};
function Hr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ur(e) {
  return ld.some((t) => e[t] >= 0);
}
const Cd = function(e) {
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
          }), l = Hr(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: Ur(l)
            }
          };
        }
        case "escaped": {
          const s = await o.detectOverflow(t, {
            ...i,
            altBoundary: !0
          }), l = Hr(s, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: Ur(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Js = /* @__PURE__ */ new Set(["left", "top"]);
async function Sd(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), s = He(n), l = jt(n), c = Me(n) === "y", d = Js.has(s) ? -1 : 1, f = i && c ? -1 : 1, p = Be(t, e);
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
    y: g * d
  } : {
    x: g * d,
    y: h * f
  };
}
const Ed = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: s,
        middlewareData: l
      } = t, c = await Sd(t, e);
      return s === ((n = l.offset) == null ? void 0 : n.placement) && (o = l.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Rd = function(e) {
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
        crossAxis: l = !1,
        limiter: c = {
          fn: (b) => {
            let {
              x: w,
              y
            } = b;
            return {
              x: w,
              y
            };
          }
        },
        ...d
      } = Be(e, t), f = {
        x: n,
        y: o
      }, p = await i.detectOverflow(t, d), g = Me(He(r)), h = Fo(g);
      let v = f[h], m = f[g];
      if (s) {
        const b = h === "y" ? "top" : "left", w = h === "y" ? "bottom" : "right", y = v + p[b], C = v - p[w];
        v = Eo(y, v, C);
      }
      if (l) {
        const b = g === "y" ? "top" : "left", w = g === "y" ? "bottom" : "right", y = m + p[b], C = m - p[w];
        m = Eo(y, m, C);
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
            [g]: l
          }
        }
      };
    }
  };
}, kd = function(e) {
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
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: d = !0
      } = Be(e, t), f = {
        x: n,
        y: o
      }, p = Me(r), g = Fo(p);
      let h = f[g], v = f[p];
      const m = Be(l, t), x = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const y = g === "y" ? "height" : "width", C = i.reference[g] - i.floating[y] + x.mainAxis, k = i.reference[g] + i.reference[y] - x.mainAxis;
        h < C ? h = C : h > k && (h = k);
      }
      if (d) {
        var b, w;
        const y = g === "y" ? "width" : "height", C = Js.has(He(r)), k = i.reference[p] - i.floating[y] + (C && ((b = s.offset) == null ? void 0 : b[p]) || 0) + (C ? 0 : x.crossAxis), N = i.reference[p] + i.reference[y] + (C ? 0 : ((w = s.offset) == null ? void 0 : w[p]) || 0) - (C ? x.crossAxis : 0);
        v < k ? v = k : v > N && (v = N);
      }
      return {
        [g]: h,
        [p]: v
      };
    }
  };
}, Pd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: s,
        elements: l
      } = t, {
        apply: c = () => {
        },
        ...d
      } = Be(e, t), f = await s.detectOverflow(t, d), p = He(r), g = jt(r), h = Me(r) === "y", {
        width: v,
        height: m
      } = i.floating;
      let x, b;
      p === "top" || p === "bottom" ? (x = p, b = g === (await (s.isRTL == null ? void 0 : s.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (b = p, x = g === "end" ? "top" : "bottom");
      const w = m - f.top - f.bottom, y = v - f.left - f.right, C = Ze(m - f[x], w), k = Ze(v - f[b], y), N = !t.middlewareData.shift;
      let E = C, R = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = y), (o = t.middlewareData.shift) != null && o.enabled.y && (E = w), N && !g) {
        const M = Ee(f.left, 0), D = Ee(f.right, 0), Y = Ee(f.top, 0), W = Ee(f.bottom, 0);
        h ? R = v - 2 * (M !== 0 || D !== 0 ? M + D : Ee(f.left, f.right)) : E = m - 2 * (Y !== 0 || W !== 0 ? Y + W : Ee(f.top, f.bottom));
      }
      await c({
        ...t,
        availableWidth: R,
        availableHeight: E
      });
      const z = await s.getDimensions(l.floating);
      return v !== z.width || m !== z.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Dn() {
  return typeof window < "u";
}
function _t(e) {
  return Qs(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Re(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function $e(e) {
  var t;
  return (t = (Qs(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Qs(e) {
  return Dn() ? e instanceof Node || e instanceof Re(e).Node : !1;
}
function Te(e) {
  return Dn() ? e instanceof Element || e instanceof Re(e).Element : !1;
}
function Ue(e) {
  return Dn() ? e instanceof HTMLElement || e instanceof Re(e).HTMLElement : !1;
}
function Gr(e) {
  return !Dn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Re(e).ShadowRoot;
}
function qt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Oe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Nd(e) {
  return /^(table|td|th)$/.test(_t(e));
}
function $n(e) {
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
const Td = /transform|translate|scale|rotate|perspective|filter/, Od = /paint|layout|strict|content/, lt = (e) => !!e && e !== "none";
let uo;
function Bo(e) {
  const t = Te(e) ? Oe(e) : e;
  return lt(t.transform) || lt(t.translate) || lt(t.scale) || lt(t.rotate) || lt(t.perspective) || !Ho() && (lt(t.backdropFilter) || lt(t.filter)) || Td.test(t.willChange || "") || Od.test(t.contain || "");
}
function Id(e) {
  let t = Je(e);
  for (; Ue(t) && !Tt(t); ) {
    if (Bo(t))
      return t;
    if ($n(t))
      return null;
    t = Je(t);
  }
  return null;
}
function Ho() {
  return uo == null && (uo = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), uo;
}
function Tt(e) {
  return /^(html|body|#document)$/.test(_t(e));
}
function Oe(e) {
  return Re(e).getComputedStyle(e);
}
function Ln(e) {
  return Te(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Je(e) {
  if (_t(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Gr(e) && e.host || // Fallback.
    $e(e)
  );
  return Gr(t) ? t.host : t;
}
function ei(e) {
  const t = Je(e);
  return Tt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ue(t) && qt(t) ? t : ei(t);
}
function Ut(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = ei(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = Re(r);
  if (i) {
    const l = ko(s);
    return t.concat(s, s.visualViewport || [], qt(r) ? r : [], l && n ? Ut(l) : []);
  } else
    return t.concat(r, Ut(r, [], n));
}
function ko(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ti(e) {
  const t = Oe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ue(e), i = r ? e.offsetWidth : n, s = r ? e.offsetHeight : o, l = En(n) !== i || En(o) !== s;
  return l && (n = i, o = s), {
    width: n,
    height: o,
    $: l
  };
}
function Uo(e) {
  return Te(e) ? e : e.contextElement;
}
function Rt(e) {
  const t = Uo(e);
  if (!Ue(t))
    return De(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = ti(t);
  let s = (i ? En(n.width) : n.width) / o, l = (i ? En(n.height) : n.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const Ad = /* @__PURE__ */ De(0);
function ni(e) {
  const t = Re(e);
  return !Ho() || !t.visualViewport ? Ad : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function jd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Re(e) ? !1 : t;
}
function pt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = Uo(e);
  let s = De(1);
  t && (o ? Te(o) && (s = Rt(o)) : s = Rt(e));
  const l = jd(i, n, o) ? ni(i) : De(0);
  let c = (r.left + l.x) / s.x, d = (r.top + l.y) / s.y, f = r.width / s.x, p = r.height / s.y;
  if (i) {
    const g = Re(i), h = o && Te(o) ? Re(o) : o;
    let v = g, m = ko(v);
    for (; m && o && h !== v; ) {
      const x = Rt(m), b = m.getBoundingClientRect(), w = Oe(m), y = b.left + (m.clientLeft + parseFloat(w.paddingLeft)) * x.x, C = b.top + (m.clientTop + parseFloat(w.paddingTop)) * x.y;
      c *= x.x, d *= x.y, f *= x.x, p *= x.y, c += y, d += C, v = Re(m), m = ko(v);
    }
  }
  return kn({
    width: f,
    height: p,
    x: c,
    y: d
  });
}
function zn(e, t) {
  const n = Ln(e).scrollLeft;
  return t ? t.left + n : pt($e(e)).left + n;
}
function oi(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - zn(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function _d(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", s = $e(o), l = t ? $n(t.floating) : !1;
  if (o === s || l && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = De(1);
  const f = De(0), p = Ue(o);
  if ((p || !p && !i) && ((_t(o) !== "body" || qt(s)) && (c = Ln(o)), p)) {
    const h = pt(o);
    d = Rt(o), f.x = h.x + o.clientLeft, f.y = h.y + o.clientTop;
  }
  const g = s && !p && !i ? oi(s, c) : De(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - c.scrollLeft * d.x + f.x + g.x,
    y: n.y * d.y - c.scrollTop * d.y + f.y + g.y
  };
}
function Md(e) {
  return Array.from(e.getClientRects());
}
function Dd(e) {
  const t = $e(e), n = Ln(e), o = e.ownerDocument.body, r = Ee(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = Ee(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + zn(e);
  const l = -n.scrollTop;
  return Oe(o).direction === "rtl" && (s += Ee(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: s,
    y: l
  };
}
const Yr = 25;
function $d(e, t) {
  const n = Re(e), o = $e(e), r = n.visualViewport;
  let i = o.clientWidth, s = o.clientHeight, l = 0, c = 0;
  if (r) {
    i = r.width, s = r.height;
    const f = Ho();
    (!f || f && t === "fixed") && (l = r.offsetLeft, c = r.offsetTop);
  }
  const d = zn(o);
  if (d <= 0) {
    const f = o.ownerDocument, p = f.body, g = getComputedStyle(p), h = f.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, v = Math.abs(o.clientWidth - p.clientWidth - h);
    v <= Yr && (i -= v);
  } else d <= Yr && (i += d);
  return {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Ld(e, t) {
  const n = pt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = Ue(e) ? Rt(e) : De(1), s = e.clientWidth * i.x, l = e.clientHeight * i.y, c = r * i.x, d = o * i.y;
  return {
    width: s,
    height: l,
    x: c,
    y: d
  };
}
function Kr(e, t, n) {
  let o;
  if (t === "viewport")
    o = $d(e, n);
  else if (t === "document")
    o = Dd($e(e));
  else if (Te(t))
    o = Ld(t, n);
  else {
    const r = ni(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return kn(o);
}
function ri(e, t) {
  const n = Je(e);
  return n === t || !Te(n) || Tt(n) ? !1 : Oe(n).position === "fixed" || ri(n, t);
}
function zd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Ut(e, [], !1).filter((l) => Te(l) && _t(l) !== "body"), r = null;
  const i = Oe(e).position === "fixed";
  let s = i ? Je(e) : e;
  for (; Te(s) && !Tt(s); ) {
    const l = Oe(s), c = Bo(s);
    !c && l.position === "fixed" && (r = null), (i ? !c && !r : !c && l.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || qt(s) && !c && ri(e, s)) ? o = o.filter((f) => f !== s) : r = l, s = Je(s);
  }
  return t.set(e, o), o;
}
function Fd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const s = [...n === "clippingAncestors" ? $n(t) ? [] : zd(t, this._c) : [].concat(n), o], l = Kr(t, s[0], r);
  let c = l.top, d = l.right, f = l.bottom, p = l.left;
  for (let g = 1; g < s.length; g++) {
    const h = Kr(t, s[g], r);
    c = Ee(h.top, c), d = Ze(h.right, d), f = Ze(h.bottom, f), p = Ee(h.left, p);
  }
  return {
    width: d - p,
    height: f - c,
    x: p,
    y: c
  };
}
function Wd(e) {
  const {
    width: t,
    height: n
  } = ti(e);
  return {
    width: t,
    height: n
  };
}
function Vd(e, t, n) {
  const o = Ue(t), r = $e(t), i = n === "fixed", s = pt(e, !0, i, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = De(0);
  function d() {
    c.x = zn(r);
  }
  if (o || !o && !i)
    if ((_t(t) !== "body" || qt(r)) && (l = Ln(t)), o) {
      const h = pt(t, !0, i, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else r && d();
  i && !o && r && d();
  const f = r && !o && !i ? oi(r, l) : De(0), p = s.left + l.scrollLeft - c.x - f.x, g = s.top + l.scrollTop - c.y - f.y;
  return {
    x: p,
    y: g,
    width: s.width,
    height: s.height
  };
}
function fo(e) {
  return Oe(e).position === "static";
}
function Xr(e, t) {
  if (!Ue(e) || Oe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return $e(e) === n && (n = n.ownerDocument.body), n;
}
function si(e, t) {
  const n = Re(e);
  if ($n(e))
    return n;
  if (!Ue(e)) {
    let r = Je(e);
    for (; r && !Tt(r); ) {
      if (Te(r) && !fo(r))
        return r;
      r = Je(r);
    }
    return n;
  }
  let o = Xr(e, t);
  for (; o && Nd(o) && fo(o); )
    o = Xr(o, t);
  return o && Tt(o) && fo(o) && !Bo(o) ? n : o || Id(e) || n;
}
const Bd = async function(e) {
  const t = this.getOffsetParent || si, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Vd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Hd(e) {
  return Oe(e).direction === "rtl";
}
const Ud = {
  convertOffsetParentRelativeRectToViewportRelativeRect: _d,
  getDocumentElement: $e,
  getClippingRect: Fd,
  getOffsetParent: si,
  getElementRects: Bd,
  getClientRects: Md,
  getDimensions: Wd,
  getScale: Rt,
  isElement: Te,
  isRTL: Hd
};
function ii(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Gd(e, t) {
  let n = null, o;
  const r = $e(e);
  function i() {
    var l;
    clearTimeout(o), (l = n) == null || l.disconnect(), n = null;
  }
  function s(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), i();
    const d = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: g,
      height: h
    } = d;
    if (l || t(), !g || !h)
      return;
    const v = un(p), m = un(r.clientWidth - (f + g)), x = un(r.clientHeight - (p + h)), b = un(f), y = {
      rootMargin: -v + "px " + -m + "px " + -x + "px " + -b + "px",
      threshold: Ee(0, Ze(1, c)) || 1
    };
    let C = !0;
    function k(N) {
      const E = N[0].intersectionRatio;
      if (E !== c) {
        if (!C)
          return s();
        E ? s(!1, E) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !ii(d, e.getBoundingClientRect()) && s(), C = !1;
    }
    try {
      n = new IntersectionObserver(k, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(k, y);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function ai(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, d = Uo(e), f = r || i ? [...d ? Ut(d) : [], ...t ? Ut(t) : []] : [];
  f.forEach((b) => {
    r && b.addEventListener("scroll", n, {
      passive: !0
    }), i && b.addEventListener("resize", n);
  });
  const p = d && l ? Gd(d, n) : null;
  let g = -1, h = null;
  s && (h = new ResizeObserver((b) => {
    let [w] = b;
    w && w.target === d && h && t && (h.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), d && !c && h.observe(d), t && h.observe(t));
  let v, m = c ? pt(e) : null;
  c && x();
  function x() {
    const b = pt(e);
    m && !ii(m, b) && n(), m = b, v = requestAnimationFrame(x);
  }
  return n(), () => {
    var b;
    f.forEach((w) => {
      r && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), p?.(), (b = h) == null || b.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const Yd = Ed, Kd = Rd, Xd = yd, qd = Pd, Zd = Cd, qr = wd, Jd = kd, Qd = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Ud,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return bd(e, t, {
    ...r,
    platform: i
  });
};
var ef = typeof document < "u", tf = function() {
}, xn = ef ? cl : tf;
function Pn(e, t) {
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
        if (!Pn(e[o], t[o]))
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
      if (!(i === "_owner" && e.$$typeof) && !Pn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function li(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zr(e, t) {
  const n = li(e);
  return Math.round(t * n) / n;
}
function po(e) {
  const t = a.useRef(e);
  return xn(() => {
    t.current = e;
  }), t;
}
function ci(e) {
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
    transform: l = !0,
    whileElementsMounted: c,
    open: d
  } = e, [f, p] = a.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [g, h] = a.useState(o);
  Pn(g, o) || h(o);
  const [v, m] = a.useState(null), [x, b] = a.useState(null), w = a.useCallback((H) => {
    H !== N.current && (N.current = H, m(H));
  }, []), y = a.useCallback((H) => {
    H !== E.current && (E.current = H, b(H));
  }, []), C = i || v, k = s || x, N = a.useRef(null), E = a.useRef(null), R = a.useRef(f), z = c != null, M = po(c), D = po(r), Y = po(d), W = a.useCallback(() => {
    if (!N.current || !E.current)
      return;
    const H = {
      placement: t,
      strategy: n,
      middleware: g
    };
    D.current && (H.platform = D.current), Qd(N.current, E.current, H).then((Q) => {
      const $ = {
        ...Q,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Y.current !== !1
      };
      Z.current && !Pn(R.current, $) && (R.current = $, At.flushSync(() => {
        p($);
      }));
    });
  }, [g, t, n, D, Y]);
  xn(() => {
    d === !1 && R.current.isPositioned && (R.current.isPositioned = !1, p((H) => ({
      ...H,
      isPositioned: !1
    })));
  }, [d]);
  const Z = a.useRef(!1);
  xn(() => (Z.current = !0, () => {
    Z.current = !1;
  }), []), xn(() => {
    if (C && (N.current = C), k && (E.current = k), C && k) {
      if (M.current)
        return M.current(C, k, W);
      W();
    }
  }, [C, k, W, M, z]);
  const J = a.useMemo(() => ({
    reference: N,
    floating: E,
    setReference: w,
    setFloating: y
  }), [w, y]), V = a.useMemo(() => ({
    reference: C,
    floating: k
  }), [C, k]), G = a.useMemo(() => {
    const H = {
      position: n,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return H;
    const Q = Zr(V.floating, f.x), $ = Zr(V.floating, f.y);
    return l ? {
      ...H,
      transform: "translate(" + Q + "px, " + $ + "px)",
      ...li(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: Q,
      top: $
    };
  }, [n, l, V.floating, f.x, f.y]);
  return a.useMemo(() => ({
    ...f,
    update: W,
    refs: J,
    elements: V,
    floatingStyles: G
  }), [f, W, J, V, G]);
}
const nf = (e) => {
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
      return o && t(o) ? o.current != null ? qr({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? qr({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, ui = (e, t) => {
  const n = Yd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, di = (e, t) => {
  const n = Kd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, fi = (e, t) => ({
  fn: Jd(e).fn,
  options: [e, t]
}), pi = (e, t) => {
  const n = Xd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, mi = (e, t) => {
  const n = qd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, hi = (e, t) => {
  const n = Zd(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, gi = (e, t) => {
  const n = nf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var of = "Arrow", vi = a.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ u.jsx(
    me.svg,
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
vi.displayName = of;
var rf = vi;
function sf(e) {
  const [t, n] = a.useState(void 0);
  return Ce(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let s, l;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          s = d.inlineSize, l = d.blockSize;
        } else
          s = e.offsetWidth, l = e.offsetHeight;
        n({ width: s, height: l });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Go = "Popper", [xi, Fn] = Xt(Go), [af, bi] = xi(Go), wi = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = a.useState(null);
  return /* @__PURE__ */ u.jsx(af, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
wi.displayName = Go;
var yi = "PopperAnchor", Ci = a.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = bi(yi, n), s = a.useRef(null), l = xe(t, s), c = a.useRef(null);
    return a.useEffect(() => {
      const d = c.current;
      c.current = o?.current || s.current, d !== c.current && i.onAnchorChange(c.current);
    }), o ? null : /* @__PURE__ */ u.jsx(me.div, { ...r, ref: l });
  }
);
Ci.displayName = yi;
var Yo = "PopperContent", [lf, cf] = xi(Yo), Si = a.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: l = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = bi(Yo, n), [b, w] = a.useState(null), y = xe(t, (_) => w(_)), [C, k] = a.useState(null), N = sf(C), E = N?.width ?? 0, R = N?.height ?? 0, z = o + (i !== "center" ? "-" + i : ""), M = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, D = Array.isArray(d) ? d : [d], Y = D.length > 0, W = {
      padding: M,
      boundary: D.filter(df),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Y
    }, { refs: Z, floatingStyles: J, placement: V, isPositioned: G, middlewareData: H } = ci({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (..._) => ai(..._, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        ui({ mainAxis: r + R, alignmentAxis: s }),
        c && di({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? fi() : void 0,
          ...W
        }),
        c && pi({ ...W }),
        mi({
          ...W,
          apply: ({ elements: _, rects: te, availableWidth: ee, availableHeight: ue }) => {
            const { width: ce, height: re } = te.reference, ve = _.floating.style;
            ve.setProperty("--radix-popper-available-width", `${ee}px`), ve.setProperty("--radix-popper-available-height", `${ue}px`), ve.setProperty("--radix-popper-anchor-width", `${ce}px`), ve.setProperty("--radix-popper-anchor-height", `${re}px`);
          }
        }),
        C && gi({ element: C, padding: l }),
        ff({ arrowWidth: E, arrowHeight: R }),
        g && hi({ strategy: "referenceHidden", ...W })
      ]
    }), [Q, $] = ki(V), P = ft(v);
    Ce(() => {
      G && P?.();
    }, [G, P]);
    const K = H.arrow?.x, q = H.arrow?.y, se = H.arrow?.centerOffset !== 0, [oe, ie] = a.useState();
    return Ce(() => {
      b && ie(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Z.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...J,
          transform: G ? J.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: oe,
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
          lf,
          {
            scope: n,
            placedSide: Q,
            onArrowChange: k,
            arrowX: K,
            arrowY: q,
            shouldHideArrow: se,
            children: /* @__PURE__ */ u.jsx(
              me.div,
              {
                "data-side": Q,
                "data-align": $,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Si.displayName = Yo;
var Ei = "PopperArrow", uf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ri = a.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = cf(Ei, o), s = uf[i.placedSide];
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
          rf,
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
Ri.displayName = Ei;
function df(e) {
  return e !== null;
}
var ff = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, l = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [d, f] = ki(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + l / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return d === "bottom" ? (v = s ? p : `${g}px`, m = `${-c}px`) : d === "top" ? (v = s ? p : `${g}px`, m = `${o.floating.height + c}px`) : d === "right" ? (v = `${-c}px`, m = s ? p : `${h}px`) : d === "left" && (v = `${o.floating.width + c}px`, m = s ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function ki(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Pi = wi, Ko = Ci, Ni = Si, Ti = Ri, pf = "Portal", Xo = a.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = a.useState(!1);
  Ce(() => i(!0), []);
  const s = n || r && globalThis?.document?.body;
  return s ? dl.createPortal(/* @__PURE__ */ u.jsx(me.div, { ...o, ref: t }), s) : null;
});
Xo.displayName = pf;
var mf = a[" useInsertionEffect ".trim().toString()] || Ce;
function Nn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = hf({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const d = a.useCallback(
    (f) => {
      if (l) {
        const p = gf(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [l, e, i, s]
  );
  return [c, d];
}
function hf({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = a.useState(e), r = a.useRef(n), i = a.useRef(t);
  return mf(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function gf(e) {
  return typeof e == "function";
}
function vf(e) {
  const t = a.useRef({ value: e, previous: e });
  return a.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Oi = Object.freeze({
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
}), xf = "VisuallyHidden", bf = a.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    me.span,
    {
      ...e,
      ref: t,
      style: { ...Oi, ...e.style }
    }
  )
);
bf.displayName = xf;
var wf = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, yt = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), fn = {}, mo = 0, Ii = function(e) {
  return e && (e.host || Ii(e.parentNode));
}, yf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ii(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Cf = function(e, t, n, o) {
  var r = yf(t, Array.isArray(e) ? e : [e]);
  fn[n] || (fn[n] = /* @__PURE__ */ new WeakMap());
  var i = fn[n], s = [], l = /* @__PURE__ */ new Set(), c = new Set(r), d = function(p) {
    !p || l.has(p) || (l.add(p), d(p.parentNode));
  };
  r.forEach(d);
  var f = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(g) {
      if (l.has(g))
        f(g);
      else
        try {
          var h = g.getAttribute(o), v = h !== null && h !== "false", m = (yt.get(g) || 0) + 1, x = (i.get(g) || 0) + 1;
          yt.set(g, m), i.set(g, x), s.push(g), m === 1 && v && dn.set(g, !0), x === 1 && g.setAttribute(n, "true"), v || g.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", g, b);
        }
    });
  };
  return f(t), l.clear(), mo++, function() {
    s.forEach(function(p) {
      var g = yt.get(p) - 1, h = i.get(p) - 1;
      yt.set(p, g), i.set(p, h), g || (dn.has(p) || p.removeAttribute(o), dn.delete(p)), h || p.removeAttribute(n);
    }), mo--, mo || (yt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), fn = {});
  };
}, qo = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = wf(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Cf(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, _e = function() {
  return _e = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, _e.apply(this, arguments);
};
function Ai(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Sf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, i; o < r; o++)
    (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var bn = "right-scroll-bar-position", wn = "width-before-scroll-bar", Ef = "with-scroll-bars-hidden", Rf = "--removed-body-scroll-bar-size";
function ho(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function kf(e, t) {
  var n = ul(function() {
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
var Pf = typeof window < "u" ? a.useLayoutEffect : a.useEffect, Jr = /* @__PURE__ */ new WeakMap();
function Nf(e, t) {
  var n = kf(null, function(o) {
    return e.forEach(function(r) {
      return ho(r, o);
    });
  });
  return Pf(function() {
    var o = Jr.get(n);
    if (o) {
      var r = new Set(o), i = new Set(e), s = n.current;
      r.forEach(function(l) {
        i.has(l) || ho(l, null);
      }), i.forEach(function(l) {
        r.has(l) || ho(l, s);
      });
    }
    Jr.set(n, e);
  }, [e]), n;
}
function Tf(e) {
  return e;
}
function Of(e, t) {
  t === void 0 && (t = Tf);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var s = t(i, o);
      return n.push(s), function() {
        n = n.filter(function(l) {
          return l !== s;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (o = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(i);
      }
      n = {
        push: function(l) {
          return i(l);
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
        var l = n;
        n = [], l.forEach(i), s = n;
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
function If(e) {
  e === void 0 && (e = {});
  var t = Of(null);
  return t.options = _e({ async: !0, ssr: !1 }, e), t;
}
var ji = function(e) {
  var t = e.sideCar, n = Ai(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return a.createElement(o, _e({}, n));
};
ji.isSideCarExport = !0;
function Af(e, t) {
  return e.useMedium(t), ji;
}
var _i = If(), go = function() {
}, Wn = a.forwardRef(function(e, t) {
  var n = a.useRef(null), o = a.useState({
    onScrollCapture: go,
    onWheelCapture: go,
    onTouchMoveCapture: go
  }), r = o[0], i = o[1], s = e.forwardProps, l = e.children, c = e.className, d = e.removeScrollBar, f = e.enabled, p = e.shards, g = e.sideCar, h = e.noRelative, v = e.noIsolation, m = e.inert, x = e.allowPinchZoom, b = e.as, w = b === void 0 ? "div" : b, y = e.gapMode, C = Ai(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = g, N = Nf([n, t]), E = _e(_e({}, C), r);
  return a.createElement(
    a.Fragment,
    null,
    f && a.createElement(k, { sideCar: _i, removeScrollBar: d, shards: p, noRelative: h, noIsolation: v, inert: m, setCallbacks: i, allowPinchZoom: !!x, lockRef: n, gapMode: y }),
    s ? a.cloneElement(a.Children.only(l), _e(_e({}, E), { ref: N })) : a.createElement(w, _e({}, E, { className: c, ref: N }), l)
  );
});
Wn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Wn.classNames = {
  fullWidth: wn,
  zeroRight: bn
};
var jf = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function _f() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = jf();
  return t && e.setAttribute("nonce", t), e;
}
function Mf(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Df(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var $f = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = _f()) && (Mf(t, n), Df(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Lf = function() {
  var e = $f();
  return function(t, n) {
    a.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Mi = function() {
  var e = Lf(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, zf = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, vo = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ff = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [vo(n), vo(o), vo(r)];
}, Wf = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return zf;
  var t = Ff(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Vf = Mi(), kt = "data-scroll-locked", Bf = function(e, t, n, o) {
  var r = e.left, i = e.top, s = e.right, l = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ef, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(l, "px ").concat(o, `;
  }
  body[`).concat(kt, `] {
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
    margin-right: `).concat(l, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(l, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(bn, ` {
    right: `).concat(l, "px ").concat(o, `;
  }
  
  .`).concat(wn, ` {
    margin-right: `).concat(l, "px ").concat(o, `;
  }
  
  .`).concat(bn, " .").concat(bn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(wn, " .").concat(wn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(kt, `] {
    `).concat(Rf, ": ").concat(l, `px;
  }
`);
}, Qr = function() {
  var e = parseInt(document.body.getAttribute(kt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Hf = function() {
  a.useEffect(function() {
    return document.body.setAttribute(kt, (Qr() + 1).toString()), function() {
      var e = Qr() - 1;
      e <= 0 ? document.body.removeAttribute(kt) : document.body.setAttribute(kt, e.toString());
    };
  }, []);
}, Uf = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Hf();
  var i = a.useMemo(function() {
    return Wf(r);
  }, [r]);
  return a.createElement(Vf, { styles: Bf(i, !t, r, n ? "" : "!important") });
}, Po = !1;
if (typeof window < "u")
  try {
    var pn = Object.defineProperty({}, "passive", {
      get: function() {
        return Po = !0, !0;
      }
    });
    window.addEventListener("test", pn, pn), window.removeEventListener("test", pn, pn);
  } catch {
    Po = !1;
  }
var Ct = Po ? { passive: !1 } : !1, Gf = function(e) {
  return e.tagName === "TEXTAREA";
}, Di = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Gf(e) && n[t] === "visible")
  );
}, Yf = function(e) {
  return Di(e, "overflowY");
}, Kf = function(e) {
  return Di(e, "overflowX");
}, es = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = $i(e, o);
    if (r) {
      var i = Li(e, o), s = i[1], l = i[2];
      if (s > l)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, Xf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, qf = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, $i = function(e, t) {
  return e === "v" ? Yf(t) : Kf(t);
}, Li = function(e, t) {
  return e === "v" ? Xf(t) : qf(t);
}, Zf = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Jf = function(e, t, n, o, r) {
  var i = Zf(e, window.getComputedStyle(t).direction), s = i * o, l = n.target, c = t.contains(l), d = !1, f = s > 0, p = 0, g = 0;
  do {
    if (!l)
      break;
    var h = Li(e, l), v = h[0], m = h[1], x = h[2], b = m - x - i * v;
    (v || b) && $i(e, l) && (p += b, g += v);
    var w = l.parentNode;
    l = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && l !== document.body || // self content
    c && (t.contains(l) || t === l)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(g) < 1) && (d = !0), d;
}, mn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ts = function(e) {
  return [e.deltaX, e.deltaY];
}, ns = function(e) {
  return e && "current" in e ? e.current : e;
}, Qf = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ep = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, tp = 0, St = [];
function np(e) {
  var t = a.useRef([]), n = a.useRef([0, 0]), o = a.useRef(), r = a.useState(tp++)[0], i = a.useState(Mi)[0], s = a.useRef(e);
  a.useEffect(function() {
    s.current = e;
  }, [e]), a.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var m = Sf([e.lockRef.current], (e.shards || []).map(ns), !0).filter(Boolean);
      return m.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), m.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var l = a.useCallback(function(m, x) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !s.current.allowPinchZoom;
    var b = mn(m), w = n.current, y = "deltaX" in m ? m.deltaX : w[0] - b[0], C = "deltaY" in m ? m.deltaY : w[1] - b[1], k, N = m.target, E = Math.abs(y) > Math.abs(C) ? "h" : "v";
    if ("touches" in m && E === "h" && N.type === "range")
      return !1;
    var R = window.getSelection(), z = R && R.anchorNode, M = z ? z === N || z.contains(N) : !1;
    if (M)
      return !1;
    var D = es(E, N);
    if (!D)
      return !0;
    if (D ? k = E : (k = E === "v" ? "h" : "v", D = es(E, N)), !D)
      return !1;
    if (!o.current && "changedTouches" in m && (y || C) && (o.current = k), !k)
      return !0;
    var Y = o.current || k;
    return Jf(Y, x, m, Y === "h" ? y : C);
  }, []), c = a.useCallback(function(m) {
    var x = m;
    if (!(!St.length || St[St.length - 1] !== i)) {
      var b = "deltaY" in x ? ts(x) : mn(x), w = t.current.filter(function(k) {
        return k.name === x.type && (k.target === x.target || x.target === k.shadowParent) && Qf(k.delta, b);
      })[0];
      if (w && w.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!w) {
        var y = (s.current.shards || []).map(ns).filter(Boolean).filter(function(k) {
          return k.contains(x.target);
        }), C = y.length > 0 ? l(x, y[0]) : !s.current.noIsolation;
        C && x.cancelable && x.preventDefault();
      }
    }
  }, []), d = a.useCallback(function(m, x, b, w) {
    var y = { name: m, delta: x, target: b, should: w, shadowParent: op(b) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== y;
      });
    }, 1);
  }, []), f = a.useCallback(function(m) {
    n.current = mn(m), o.current = void 0;
  }, []), p = a.useCallback(function(m) {
    d(m.type, ts(m), m.target, l(m, e.lockRef.current));
  }, []), g = a.useCallback(function(m) {
    d(m.type, mn(m), m.target, l(m, e.lockRef.current));
  }, []);
  a.useEffect(function() {
    return St.push(i), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: g
    }), document.addEventListener("wheel", c, Ct), document.addEventListener("touchmove", c, Ct), document.addEventListener("touchstart", f, Ct), function() {
      St = St.filter(function(m) {
        return m !== i;
      }), document.removeEventListener("wheel", c, Ct), document.removeEventListener("touchmove", c, Ct), document.removeEventListener("touchstart", f, Ct);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    v ? a.createElement(i, { styles: ep(r) }) : null,
    h ? a.createElement(Uf, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function op(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const rp = Af(_i, np);
var Vn = a.forwardRef(function(e, t) {
  return a.createElement(Wn, _e({}, e, { ref: t, sideCar: rp }));
});
Vn.classNames = Wn.classNames;
var sp = [" ", "Enter", "ArrowUp", "ArrowDown"], ip = [" ", "Enter"], mt = "Select", [Bn, Hn, ap] = Fu(mt), [Mt] = Xt(mt, [
  ap,
  Fn
]), Un = Fn(), [lp, et] = Mt(mt), [cp, up] = Mt(mt), zi = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    value: s,
    defaultValue: l,
    onValueChange: c,
    dir: d,
    name: f,
    autoComplete: p,
    disabled: g,
    required: h,
    form: v
  } = e, m = Un(t), [x, b] = a.useState(null), [w, y] = a.useState(null), [C, k] = a.useState(!1), N = Vu(d), [E, R] = Nn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: mt
  }), [z, M] = Nn({
    prop: s,
    defaultProp: l,
    onChange: c,
    caller: mt
  }), D = a.useRef(null), Y = x ? v || !!x.closest("form") : !0, [W, Z] = a.useState(/* @__PURE__ */ new Set()), J = Array.from(W).map((V) => V.props.value).join(";");
  return /* @__PURE__ */ u.jsx(Pi, { ...m, children: /* @__PURE__ */ u.jsxs(
    lp,
    {
      required: h,
      scope: t,
      trigger: x,
      onTriggerChange: b,
      valueNode: w,
      onValueNodeChange: y,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: k,
      contentId: ut(),
      value: z,
      onValueChange: M,
      open: E,
      onOpenChange: R,
      dir: N,
      triggerPointerDownPosRef: D,
      disabled: g,
      children: [
        /* @__PURE__ */ u.jsx(Bn.Provider, { scope: t, children: /* @__PURE__ */ u.jsx(
          cp,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: a.useCallback((V) => {
              Z((G) => new Set(G).add(V));
            }, []),
            onNativeOptionRemove: a.useCallback((V) => {
              Z((G) => {
                const H = new Set(G);
                return H.delete(V), H;
              });
            }, []),
            children: n
          }
        ) }),
        Y ? /* @__PURE__ */ u.jsxs(
          oa,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: z,
            onChange: (V) => M(V.target.value),
            disabled: g,
            form: v,
            children: [
              z === void 0 ? /* @__PURE__ */ u.jsx("option", { value: "" }) : null,
              Array.from(W)
            ]
          },
          J
        ) : null
      ]
    }
  ) });
};
zi.displayName = mt;
var Fi = "SelectTrigger", Wi = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, i = Un(n), s = et(Fi, n), l = s.disabled || o, c = xe(t, s.onTriggerChange), d = Hn(n), f = a.useRef("touch"), [p, g, h] = sa((m) => {
      const x = d().filter((y) => !y.disabled), b = x.find((y) => y.value === s.value), w = ia(x, m, b);
      w !== void 0 && s.onValueChange(w.value);
    }), v = (m) => {
      l || (s.onOpenChange(!0), h()), m && (s.triggerPointerDownPosRef.current = {
        x: Math.round(m.pageX),
        y: Math.round(m.pageY)
      });
    };
    return /* @__PURE__ */ u.jsx(Ko, { asChild: !0, ...i, children: /* @__PURE__ */ u.jsx(
      me.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": ra(s.value) ? "" : void 0,
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
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && g(m.key), !(x && m.key === " ") && sp.includes(m.key) && (v(), m.preventDefault());
        })
      }
    ) });
  }
);
Wi.displayName = Fi;
var Vi = "SelectValue", Bi = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: i, placeholder: s = "", ...l } = e, c = et(Vi, n), { onValueNodeHasChildrenChange: d } = c, f = i !== void 0, p = xe(t, c.onValueNodeChange);
    return Ce(() => {
      d(f);
    }, [d, f]), /* @__PURE__ */ u.jsx(
      me.span,
      {
        ...l,
        ref: p,
        style: { pointerEvents: "none" },
        children: ra(c.value) ? /* @__PURE__ */ u.jsx(u.Fragment, { children: s }) : i
      }
    );
  }
);
Bi.displayName = Vi;
var dp = "SelectIcon", Hi = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ u.jsx(me.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
Hi.displayName = dp;
var ht = "SelectContent", Ui = a.forwardRef(
  (e, t) => {
    const n = et(ht, e.__scopeSelect), [o, r] = a.useState();
    if (Ce(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const i = o;
      return i ? At.createPortal(
        /* @__PURE__ */ u.jsx(Gi, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx(Bn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ u.jsx(Yi, { ...e, ref: t });
  }
);
Ui.displayName = ht;
var Ne = 10, [Gi, tt] = Mt(ht), fp = "SelectContentImpl", pp = /* @__PURE__ */ Nt("SelectContent.RemoveScroll"), Yi = a.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: o = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: l,
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
      ...b
    } = e, w = et(ht, n), [y, C] = a.useState(null), [k, N] = a.useState(null), E = xe(t, (_) => C(_)), [R, z] = a.useState(null), [M, D] = a.useState(
      null
    ), Y = Hn(n), [W, Z] = a.useState(!1), J = a.useRef(!1);
    a.useEffect(() => {
      if (y) return qo(y);
    }, [y]), zo();
    const V = a.useCallback(
      (_) => {
        const [te, ...ee] = Y().map((re) => re.ref.current), [ue] = ee.slice(-1), ce = document.activeElement;
        for (const re of _)
          if (re === ce || (re?.scrollIntoView({ block: "nearest" }), re === te && k && (k.scrollTop = 0), re === ue && k && (k.scrollTop = k.scrollHeight), re?.focus(), document.activeElement !== ce)) return;
      },
      [Y, k]
    ), G = a.useCallback(
      () => V([R, y]),
      [V, R, y]
    );
    a.useEffect(() => {
      W && G();
    }, [W, G]);
    const { onOpenChange: H, triggerPointerDownPosRef: Q } = w;
    a.useEffect(() => {
      if (y) {
        let _ = { x: 0, y: 0 };
        const te = (ue) => {
          _ = {
            x: Math.abs(Math.round(ue.pageX) - (Q.current?.x ?? 0)),
            y: Math.abs(Math.round(ue.pageY) - (Q.current?.y ?? 0))
          };
        }, ee = (ue) => {
          _.x <= 10 && _.y <= 10 ? ue.preventDefault() : y.contains(ue.target) || H(!1), document.removeEventListener("pointermove", te), Q.current = null;
        };
        return Q.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", ee, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", ee, { capture: !0 });
        };
      }
    }, [y, H, Q]), a.useEffect(() => {
      const _ = () => H(!1);
      return window.addEventListener("blur", _), window.addEventListener("resize", _), () => {
        window.removeEventListener("blur", _), window.removeEventListener("resize", _);
      };
    }, [H]);
    const [$, P] = sa((_) => {
      const te = Y().filter((ce) => !ce.disabled), ee = te.find((ce) => ce.ref.current === document.activeElement), ue = ia(te, _, ee);
      ue && setTimeout(() => ue.ref.current.focus());
    }), K = a.useCallback(
      (_, te, ee) => {
        const ue = !J.current && !ee;
        (w.value !== void 0 && w.value === te || ue) && (z(_), ue && (J.current = !0));
      },
      [w.value]
    ), q = a.useCallback(() => y?.focus(), [y]), se = a.useCallback(
      (_, te, ee) => {
        const ue = !J.current && !ee;
        (w.value !== void 0 && w.value === te || ue) && D(_);
      },
      [w.value]
    ), oe = o === "popper" ? No : Ki, ie = oe === No ? {
      side: l,
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
      Gi,
      {
        scope: n,
        content: y,
        viewport: k,
        onViewportChange: N,
        itemRefCallback: K,
        selectedItem: R,
        onItemLeave: q,
        itemTextRefCallback: se,
        focusSelectedItem: G,
        selectedItemText: M,
        position: o,
        isPositioned: W,
        searchRef: $,
        children: /* @__PURE__ */ u.jsx(Vn, { as: pp, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
          Mn,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (_) => {
              _.preventDefault();
            },
            onUnmountAutoFocus: pe(r, (_) => {
              w.trigger?.focus({ preventScroll: !0 }), _.preventDefault();
            }),
            children: /* @__PURE__ */ u.jsx(
              _n,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: s,
                onFocusOutside: (_) => _.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ u.jsx(
                  oe,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (_) => _.preventDefault(),
                    ...b,
                    ...ie,
                    onPlaced: () => Z(!0),
                    ref: E,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...b.style
                    },
                    onKeyDown: pe(b.onKeyDown, (_) => {
                      const te = _.ctrlKey || _.altKey || _.metaKey;
                      if (_.key === "Tab" && _.preventDefault(), !te && _.key.length === 1 && P(_.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(_.key)) {
                        let ue = Y().filter((ce) => !ce.disabled).map((ce) => ce.ref.current);
                        if (["ArrowUp", "End"].includes(_.key) && (ue = ue.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(_.key)) {
                          const ce = _.target, re = ue.indexOf(ce);
                          ue = ue.slice(re + 1);
                        }
                        setTimeout(() => V(ue)), _.preventDefault();
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
Yi.displayName = fp;
var mp = "SelectItemAlignedPosition", Ki = a.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, i = et(ht, n), s = tt(ht, n), [l, c] = a.useState(null), [d, f] = a.useState(null), p = xe(t, (E) => f(E)), g = Hn(n), h = a.useRef(!1), v = a.useRef(!0), { viewport: m, selectedItem: x, selectedItemText: b, focusSelectedItem: w } = s, y = a.useCallback(() => {
    if (i.trigger && i.valueNode && l && d && m && x && b) {
      const E = i.trigger.getBoundingClientRect(), R = d.getBoundingClientRect(), z = i.valueNode.getBoundingClientRect(), M = b.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const ce = M.left - R.left, re = z.left - ce, ve = E.left - re, be = E.width + ve, rt = Math.max(be, R.width), Ge = window.innerWidth - Ne, st = Ar(re, [
          Ne,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Ne, Ge - rt)
        ]);
        l.style.minWidth = be + "px", l.style.left = st + "px";
      } else {
        const ce = R.right - M.right, re = window.innerWidth - z.right - ce, ve = window.innerWidth - E.right - re, be = E.width + ve, rt = Math.max(be, R.width), Ge = window.innerWidth - Ne, st = Ar(re, [
          Ne,
          Math.max(Ne, Ge - rt)
        ]);
        l.style.minWidth = be + "px", l.style.right = st + "px";
      }
      const D = g(), Y = window.innerHeight - Ne * 2, W = m.scrollHeight, Z = window.getComputedStyle(d), J = parseInt(Z.borderTopWidth, 10), V = parseInt(Z.paddingTop, 10), G = parseInt(Z.borderBottomWidth, 10), H = parseInt(Z.paddingBottom, 10), Q = J + V + W + H + G, $ = Math.min(x.offsetHeight * 5, Q), P = window.getComputedStyle(m), K = parseInt(P.paddingTop, 10), q = parseInt(P.paddingBottom, 10), se = E.top + E.height / 2 - Ne, oe = Y - se, ie = x.offsetHeight / 2, _ = x.offsetTop + ie, te = J + V + _, ee = Q - te;
      if (te <= se) {
        const ce = D.length > 0 && x === D[D.length - 1].ref.current;
        l.style.bottom = "0px";
        const re = d.clientHeight - m.offsetTop - m.offsetHeight, ve = Math.max(
          oe,
          ie + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ce ? q : 0) + re + G
        ), be = te + ve;
        l.style.height = be + "px";
      } else {
        const ce = D.length > 0 && x === D[0].ref.current;
        l.style.top = "0px";
        const ve = Math.max(
          se,
          J + m.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ce ? K : 0) + ie
        ) + ee;
        l.style.height = ve + "px", m.scrollTop = te - se + m.offsetTop;
      }
      l.style.margin = `${Ne}px 0`, l.style.minHeight = $ + "px", l.style.maxHeight = Y + "px", o?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    g,
    i.trigger,
    i.valueNode,
    l,
    d,
    m,
    x,
    b,
    i.dir,
    o
  ]);
  Ce(() => y(), [y]);
  const [C, k] = a.useState();
  Ce(() => {
    d && k(window.getComputedStyle(d).zIndex);
  }, [d]);
  const N = a.useCallback(
    (E) => {
      E && v.current === !0 && (y(), w?.(), v.current = !1);
    },
    [y, w]
  );
  return /* @__PURE__ */ u.jsx(
    gp,
    {
      scope: n,
      contentWrapper: l,
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
            me.div,
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
Ki.displayName = mp;
var hp = "SelectPopperPosition", No = a.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = Ne,
    ...i
  } = e, s = Un(n);
  return /* @__PURE__ */ u.jsx(
    Ni,
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
No.displayName = hp;
var [gp, Zo] = Mt(ht, {}), To = "SelectViewport", Xi = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, i = tt(To, n), s = Zo(To, n), l = xe(t, i.onViewportChange), c = a.useRef(0);
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
        me.div,
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
          onScroll: pe(r.onScroll, (d) => {
            const f = d.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: g } = s;
            if (g?.current && p) {
              const h = Math.abs(c.current - f.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - Ne * 2, m = parseFloat(p.style.minHeight), x = parseFloat(p.style.height), b = Math.max(m, x);
                if (b < v) {
                  const w = b + h, y = Math.min(v, w), C = w - y;
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
Xi.displayName = To;
var qi = "SelectGroup", [vp, xp] = Mt(qi), bp = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = ut();
    return /* @__PURE__ */ u.jsx(vp, { scope: n, id: r, children: /* @__PURE__ */ u.jsx(me.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
bp.displayName = qi;
var Zi = "SelectLabel", wp = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = xp(Zi, n);
    return /* @__PURE__ */ u.jsx(me.div, { id: r.id, ...o, ref: t });
  }
);
wp.displayName = Zi;
var Tn = "SelectItem", [yp, Ji] = Mt(Tn), Qi = a.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: i,
      ...s
    } = e, l = et(Tn, n), c = tt(Tn, n), d = l.value === o, [f, p] = a.useState(i ?? ""), [g, h] = a.useState(!1), v = xe(
      t,
      (w) => c.itemRefCallback?.(w, o, r)
    ), m = ut(), x = a.useRef("touch"), b = () => {
      r || (l.onValueChange(o), l.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ u.jsx(
      yp,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: m,
        isSelected: d,
        onItemTextChange: a.useCallback((w) => {
          p((y) => y || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ u.jsx(
          Bn.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: f,
            children: /* @__PURE__ */ u.jsx(
              me.div,
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
                  x.current !== "mouse" && b();
                }),
                onPointerUp: pe(s.onPointerUp, () => {
                  x.current === "mouse" && b();
                }),
                onPointerDown: pe(s.onPointerDown, (w) => {
                  x.current = w.pointerType;
                }),
                onPointerMove: pe(s.onPointerMove, (w) => {
                  x.current = w.pointerType, r ? c.onItemLeave?.() : x.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: pe(s.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: pe(s.onKeyDown, (w) => {
                  c.searchRef?.current !== "" && w.key === " " || (ip.includes(w.key) && b(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Qi.displayName = Tn;
var Ht = "SelectItemText", ea = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...i } = e, s = et(Ht, n), l = tt(Ht, n), c = Ji(Ht, n), d = up(Ht, n), [f, p] = a.useState(null), g = xe(
      t,
      (b) => p(b),
      c.onItemTextChange,
      (b) => l.itemTextRefCallback?.(b, c.value, c.disabled)
    ), h = f?.textContent, v = a.useMemo(
      () => /* @__PURE__ */ u.jsx("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: m, onNativeOptionRemove: x } = d;
    return Ce(() => (m(v), () => x(v)), [m, x, v]), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(me.span, { id: c.textId, ...i, ref: g }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? At.createPortal(i.children, s.valueNode) : null
    ] });
  }
);
ea.displayName = Ht;
var ta = "SelectItemIndicator", Cp = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return Ji(ta, n).isSelected ? /* @__PURE__ */ u.jsx(me.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Cp.displayName = ta;
var Oo = "SelectScrollUpButton", Sp = a.forwardRef((e, t) => {
  const n = tt(Oo, e.__scopeSelect), o = Zo(Oo, e.__scopeSelect), [r, i] = a.useState(!1), s = xe(t, o.onScrollButtonChange);
  return Ce(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const d = c.scrollTop > 0;
        i(d);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    na,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Sp.displayName = Oo;
var Io = "SelectScrollDownButton", Ep = a.forwardRef((e, t) => {
  const n = tt(Io, e.__scopeSelect), o = Zo(Io, e.__scopeSelect), [r, i] = a.useState(!1), s = xe(t, o.onScrollButtonChange);
  return Ce(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const d = c.scrollHeight - c.clientHeight, f = Math.ceil(c.scrollTop) < d;
        i(f);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    na,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Ep.displayName = Io;
var na = a.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, i = tt("SelectScrollButton", n), s = a.useRef(null), l = Hn(n), c = a.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return a.useEffect(() => () => c(), [c]), Ce(() => {
    l().find((f) => f.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [l]), /* @__PURE__ */ u.jsx(
    me.div,
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
}), Rp = "SelectSeparator", kp = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ u.jsx(me.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
kp.displayName = Rp;
var Ao = "SelectArrow", Pp = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Un(n), i = et(Ao, n), s = tt(Ao, n);
    return i.open && s.position === "popper" ? /* @__PURE__ */ u.jsx(Ti, { ...r, ...o, ref: t }) : null;
  }
);
Pp.displayName = Ao;
var Np = "SelectBubbleInput", oa = a.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = a.useRef(null), i = xe(o, r), s = vf(t);
    return a.useEffect(() => {
      const l = r.current;
      if (!l) return;
      const c = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(l, t), l.dispatchEvent(p);
      }
    }, [s, t]), /* @__PURE__ */ u.jsx(
      me.select,
      {
        ...n,
        style: { ...Oi, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
oa.displayName = Np;
function ra(e) {
  return e === "" || e === void 0;
}
function sa(e) {
  const t = ft(e), n = a.useRef(""), o = a.useRef(0), r = a.useCallback(
    (s) => {
      const l = n.current + s;
      t(l), (function c(d) {
        n.current = d, window.clearTimeout(o.current), d !== "" && (o.current = window.setTimeout(() => c(""), 1e3));
      })(l);
    },
    [t]
  ), i = a.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return a.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, i];
}
function ia(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = Tp(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((d) => d !== n));
  const c = s.find(
    (d) => d.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Tp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Op = zi, Ip = Wi, Ap = Bi, jp = Hi, _p = Ui, Mp = Xi, Dp = Qi, $p = ea;
const Gn = a.createContext({ size: "base" }), Jo = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" }
}, Lp = Se(
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
function zp({ children: e, disabled: t, variant: n, size: o = "base", ...r }) {
  const i = t || n === "disabled";
  return /* @__PURE__ */ u.jsx(Gn.Provider, { value: { size: o }, children: /* @__PURE__ */ u.jsx(Op, { disabled: i, ...r, children: e }) });
}
function Fp({ className: e, variant: t, leftIcon: n, children: o, slotId: r, ...i }) {
  const { size: s } = a.useContext(Gn), l = Jo[s], c = a.useId();
  return /* @__PURE__ */ u.jsxs(
    Ip,
    {
      "data-slot": "select-trigger",
      "data-slot-id": r ?? c,
      className: ne(Lp({ variant: t }), l.height, l.rounded, l.px, l.gap, l.text, e),
      ...i,
      children: [
        /* @__PURE__ */ u.jsxs("span", { className: ne("flex items-center flex-1 min-w-0", l.gap), children: [
          n && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: ne("shrink-0 text-black-55", l.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${n}` }) }),
          o
        ] }),
        /* @__PURE__ */ u.jsx(jp, { asChild: !0, children: /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: ne("shrink-0 ml-auto", l.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-chevron-down" }) }) })
      ]
    }
  );
}
function Wp({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = a.useContext(Gn), i = Jo[r], s = a.useId();
  return /* @__PURE__ */ u.jsx(
    _p,
    {
      "data-slot": "select-content",
      "data-slot-id": n ?? s,
      position: "popper",
      sideOffset: 4,
      className: ne(
        "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
        "w-[var(--radix-select-trigger-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        i.rounded,
        e
      ),
      ...o,
      children: /* @__PURE__ */ u.jsx(Mp, { className: "flex flex-col p-1 group/options", children: t })
    }
  );
}
function Vp({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = a.useContext(Gn), i = Jo[r], s = a.useId();
  return /* @__PURE__ */ u.jsx(
    Dp,
    {
      "data-slot": "select-item",
      "data-slot-id": n ?? s,
      className: ne(
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
      children: /* @__PURE__ */ u.jsx($p, { children: t })
    }
  );
}
function Bp({ className: e, slotId: t, ...n }) {
  const o = a.useId();
  return /* @__PURE__ */ u.jsx(Ap, { "data-slot": "select-value", "data-slot-id": t ?? o, className: e, ...n });
}
const Hp = Se(
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
function Rg({
  className: e,
  variant: t,
  size: n,
  onClick: o,
  children: r,
  slotId: i,
  ...s
}) {
  const l = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "navigation-item",
      "data-slot-id": i ?? l,
      className: ne(Hp({ variant: t, size: n }), e),
      onClick: (c) => {
        c.stopPropagation(), o?.();
      },
      ...s,
      children: r
    }
  );
}
const Up = Se("flex w-max min-w-full flex-col bg-white-100", {
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
function kg({ className: e, variant: t, radius: n, data: o, children: r, slotId: i, ...s }) {
  const l = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "table",
      "data-slot-id": i ?? l,
      className: ne(Up({ variant: t, radius: n, className: e })),
      ...s,
      children: r
    }
  );
}
function We(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function os(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Gp(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = os(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : os(e[r], null);
        }
      };
  };
}
function xt(...e) {
  return a.useCallback(Gp(...e), e);
}
function aa(e, t = []) {
  let n = [];
  function o(i, s) {
    const l = a.createContext(s);
    l.displayName = i + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (p) => {
      const { scope: g, children: h, ...v } = p, m = g?.[e]?.[c] || l, x = a.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u.jsx(m.Provider, { value: x, children: h });
    };
    d.displayName = i + "Provider";
    function f(p, g) {
      const h = g?.[e]?.[c] || l, v = a.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [d, f];
  }
  const r = () => {
    const i = n.map((s) => a.createContext(s));
    return function(l) {
      const c = l?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: c } }),
        [l, c]
      );
    };
  };
  return r.scopeName = e, [o, Yp(r, ...t)];
}
function Yp(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((l, { useScope: c, scopeName: d }) => {
        const p = c(i)[`__scope${d}`];
        return { ...l, ...p };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Kp(e) {
  const t = a.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, l = !1;
    const c = [];
    rs(r) && typeof hn == "function" && (r = hn(r._payload)), a.Children.forEach(r, (g) => {
      if (Qp(g)) {
        l = !0;
        const h = g;
        let v = "child" in h.props ? h.props.child : h.props.children;
        rs(v) && typeof hn == "function" && (v = hn(v._payload)), s = qp(h, v), c.push(s?.props?.children);
      } else
        c.push(g);
    }), s ? s = a.cloneElement(s, void 0, c) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !l && a.Children.count(r) === 1 && a.isValidElement(r) && (s = r)
    );
    const d = s ? Jp(s) : void 0, f = xt(o, d);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          l ? om(e) : nm(e)
        );
      return r;
    }
    const p = Zp(i, s.props ?? {});
    return s.type !== a.Fragment && (p.ref = o ? f : d), a.cloneElement(s, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var la = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Xp(e) {
  const t = (n) => "child" in n ? n.children(n.child) : n.children;
  return t.displayName = `${e}.Slottable`, t.__radixId = la, t;
}
var qp = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return a.isValidElement(n) ? a.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return a.isValidElement(t) ? t : null;
};
function Zp(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Jp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Qp(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === la;
}
var em = /* @__PURE__ */ Symbol.for("react.lazy");
function rs(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === em && "_payload" in e && tm(e._payload);
}
function tm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var nm = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, om = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, hn = a[" use ".trim().toString()], rm = [
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
], nt = rm.reduce((e, t) => {
  const n = /* @__PURE__ */ Kp(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function sm(e, t) {
  e && At.flushSync(() => e.dispatchEvent(t));
}
function Yn(e) {
  const t = a.useRef(e);
  return a.useEffect(() => {
    t.current = e;
  }), a.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function im(e, t = globalThis?.document) {
  const n = Yn(e);
  a.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var am = "DismissableLayer", jo = "dismissableLayer.update", lm = "dismissableLayer.pointerDownOutside", cm = "dismissableLayer.focusOutside", ss, ca = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ua = a.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: l,
      ...c
    } = e, d = a.useContext(ca), [f, p] = a.useState(null), g = f?.ownerDocument ?? globalThis?.document, [, h] = a.useState({}), v = xt(t, (E) => p(E)), m = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(x), w = f ? m.indexOf(f) : -1, y = d.layersWithOutsidePointerEventsDisabled.size > 0, C = w >= b, k = fm((E) => {
      const R = E.target, z = [...d.branches].some((M) => M.contains(R));
      !C || z || (r?.(E), s?.(E), E.defaultPrevented || l?.());
    }, g), N = pm((E) => {
      const R = E.target;
      [...d.branches].some((M) => M.contains(R)) || (i?.(E), s?.(E), E.defaultPrevented || l?.());
    }, g);
    return im((E) => {
      w === d.layers.size - 1 && (o?.(E), !E.defaultPrevented && l && (E.preventDefault(), l()));
    }, g), a.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (ss = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), is(), () => {
          n && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (g.body.style.pointerEvents = ss));
        };
    }, [f, g, n, d]), a.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), is());
    }, [f, d]), a.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(jo, E), () => document.removeEventListener(jo, E);
    }, []), /* @__PURE__ */ u.jsx(
      nt.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: We(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: We(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: We(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
ua.displayName = am;
var um = "DismissableLayerBranch", dm = a.forwardRef((e, t) => {
  const n = a.useContext(ca), o = a.useRef(null), r = xt(t, o);
  return a.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(nt.div, { ...e, ref: r });
});
dm.displayName = um;
function fm(e, t = globalThis?.document) {
  const n = Yn(e), o = a.useRef(!1), r = a.useRef(() => {
  });
  return a.useEffect(() => {
    const i = (l) => {
      if (l.target && !o.current) {
        let c = function() {
          da(
            lm,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
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
function pm(e, t = globalThis?.document) {
  const n = Yn(e), o = a.useRef(!1);
  return a.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && da(cm, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function is() {
  const e = new CustomEvent(jo);
  document.dispatchEvent(e);
}
function da(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? sm(r, i) : r.dispatchEvent(i);
}
var Ve = globalThis?.document ? a.useLayoutEffect : () => {
}, mm = a[" useId ".trim().toString()] || (() => {
}), hm = 0;
function gm(e) {
  const [t, n] = a.useState(mm());
  return Ve(() => {
    n((o) => o ?? String(hm++));
  }, [e]), t ? `radix-${t}` : "";
}
var vm = "Arrow", fa = a.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ u.jsx(
    nt.svg,
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
fa.displayName = vm;
var xm = fa;
function bm(e) {
  const [t, n] = a.useState(void 0);
  return Ve(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let s, l;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          s = d.inlineSize, l = d.blockSize;
        } else
          s = e.offsetWidth, l = e.offsetHeight;
        n({ width: s, height: l });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Qo = "Popper", [pa, ma] = aa(Qo), [wm, ha] = pa(Qo), ga = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = a.useState(null), [i, s] = a.useState(void 0);
  return /* @__PURE__ */ u.jsx(
    wm,
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
ga.displayName = Qo;
var va = "PopperAnchor", xa = a.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = ha(va, n), s = a.useRef(null), l = i.onAnchorChange, c = a.useCallback(
      (v) => {
        s.current = v, v && l(v);
      },
      [l]
    ), d = xt(t, c), f = a.useRef(null);
    a.useEffect(() => {
      if (!o)
        return;
      const v = f.current;
      f.current = o.current, v !== f.current && l(f.current);
    });
    const p = i.placementState && tr(i.placementState), g = p?.[0], h = p?.[1];
    return o ? null : /* @__PURE__ */ u.jsx(
      nt.div,
      {
        "data-radix-popper-side": g,
        "data-radix-popper-align": h,
        ...r,
        ref: d
      }
    );
  }
);
xa.displayName = va;
var er = "PopperContent", [ym, Cm] = pa(er), ba = a.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: l = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d,
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, x = ha(er, n), [b, w] = a.useState(null), y = xt(t, (te) => w(te)), [C, k] = a.useState(null), N = bm(C), E = N?.width ?? 0, R = N?.height ?? 0, z = o + (i !== "center" ? "-" + i : ""), M = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, D = d ? Array.isArray(d) ? d : [d] : void 0, Y = D !== void 0 && D.length > 0, W = {
      padding: M,
      boundary: D?.filter(Em),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Y
    }, { refs: Z, floatingStyles: J, placement: V, isPositioned: G, middlewareData: H } = ci({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (...te) => ai(...te, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        ui({ mainAxis: r + R, alignmentAxis: s }),
        c && di({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? fi() : void 0,
          ...W
        }),
        c && pi({ ...W }),
        mi({
          ...W,
          apply: ({ elements: te, rects: ee, availableWidth: ue, availableHeight: ce }) => {
            const { width: re, height: ve } = ee.reference, be = te.floating.style;
            be.setProperty("--radix-popper-available-width", `${ue}px`), be.setProperty("--radix-popper-available-height", `${ce}px`), be.setProperty("--radix-popper-anchor-width", `${re}px`), be.setProperty("--radix-popper-anchor-height", `${ve}px`);
          }
        }),
        C && gi({ element: C, padding: l }),
        Rm({ arrowWidth: E, arrowHeight: R }),
        g && hi({ strategy: "referenceHidden", ...W })
      ]
    }), Q = x.setPlacementState;
    Ve(() => (Q(V), () => {
      Q(void 0);
    }), [V, Q]);
    const [$, P] = tr(V), K = Yn(v);
    Ve(() => {
      G && K?.();
    }, [G, K]);
    const q = H.arrow?.x, se = H.arrow?.y, oe = H.arrow?.centerOffset !== 0, [ie, _] = a.useState();
    return Ve(() => {
      b && _(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Z.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...J,
          transform: G ? J.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ie,
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
          ym,
          {
            scope: n,
            placedSide: $,
            placedAlign: P,
            onArrowChange: k,
            arrowX: q,
            arrowY: se,
            shouldHideArrow: oe,
            children: /* @__PURE__ */ u.jsx(
              nt.div,
              {
                "data-side": $,
                "data-align": P,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ba.displayName = er;
var wa = "PopperArrow", Sm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ya = a.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = Cm(wa, o), s = Sm[i.placedSide];
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
          xm,
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
ya.displayName = wa;
function Em(e) {
  return e !== null;
}
var Rm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, l = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [d, f] = tr(n), p = { start: "0%", center: "50%", end: "100%" }[f], g = (r.arrow?.x ?? 0) + l / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let v = "", m = "";
    return d === "bottom" ? (v = s ? p : `${g}px`, m = `${-c}px`) : d === "top" ? (v = s ? p : `${g}px`, m = `${o.floating.height + c}px`) : d === "right" ? (v = `${-c}px`, m = s ? p : `${h}px`) : d === "left" && (v = `${o.floating.width + c}px`, m = s ? p : `${h}px`), { data: { x: v, y: m } };
  }
});
function tr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var km = ga, Pm = xa, Nm = ba, Tm = ya, Om = "Portal", Ca = a.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = a.useState(!1);
  Ve(() => i(!0), []);
  const s = n || r && globalThis?.document?.body;
  return s ? At.createPortal(/* @__PURE__ */ u.jsx(nt.div, { ...o, ref: t }), s) : null;
});
Ca.displayName = Om;
function Im(e, t) {
  return a.useReducer((n, o) => t[n][o] ?? n, e);
}
var nr = (e) => {
  const { present: t, children: n } = e, o = Am(t), r = typeof n == "function" ? n({ present: o.isPresent }) : a.Children.only(n), i = jm(o.ref, _m(r));
  return typeof n == "function" || o.isPresent ? a.cloneElement(r, { ref: i }) : null;
};
nr.displayName = "Presence";
function Am(e) {
  const [t, n] = a.useState(), o = a.useRef(null), r = a.useRef(e), i = a.useRef("none"), s = e ? "mounted" : "unmounted", [l, c] = Im(s, {
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
  return a.useEffect(() => {
    const d = gn(o.current);
    i.current = l === "mounted" ? d : "none";
  }, [l]), Ve(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = gn(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Ve(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const m = gn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, g = (h) => {
        h.target === t && (i.current = gn(o.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: a.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function as(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function jm(...e) {
  const t = a.useRef(e);
  return t.current = e, a.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const i = o.map((s) => {
      const l = as(s, n);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const l = i[s];
          typeof l == "function" ? l() : as(o[s], null);
        }
      };
  }, []);
}
function gn(e) {
  return e?.animationName || "none";
}
function _m(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Mm = a[" useInsertionEffect ".trim().toString()] || Ve;
function Dm({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = $m({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, c = l ? e : r;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const p = f.current;
      p !== l && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, o]);
  }
  const d = a.useCallback(
    (f) => {
      if (l) {
        const p = Lm(f) ? f(e) : f;
        p !== e && s.current?.(p);
      } else
        i(f);
    },
    [l, e, i, s]
  );
  return [c, d];
}
function $m({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = a.useState(e), r = a.useRef(n), i = a.useRef(t);
  return Mm(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function Lm(e) {
  return typeof e == "function";
}
var zm = Object.freeze({
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
}), Fm = "VisuallyHidden", Sa = a.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    nt.span,
    {
      ...e,
      ref: t,
      style: { ...zm, ...e.style }
    }
  )
);
Sa.displayName = Fm;
var Wm = Sa, [Kn] = aa("Tooltip", [
  ma
]), Xn = ma(), Vm = "TooltipProvider", _o = "tooltip.open", [Pg, or] = Kn(Vm), Gt = "Tooltip", [Bm, Zt] = Kn(Gt), Ea = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    disableHoverableContent: s,
    delayDuration: l
  } = e, c = or(Gt, e.__scopeTooltip), d = Xn(t), [f, p] = a.useState(null), g = gm(), h = a.useRef(0), v = s ?? c.disableHoverableContent, m = l ?? c.delayDuration, x = a.useRef(!1), [b, w] = Dm({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (E) => {
      E ? (c.onOpen(), document.dispatchEvent(new CustomEvent(_o))) : c.onClose(), i?.(E);
    },
    caller: Gt
  }), y = a.useMemo(() => b ? x.current ? "delayed-open" : "instant-open" : "closed", [b]), C = a.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, x.current = !1, w(!0);
  }, [w]), k = a.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, w(!1);
  }, [w]), N = a.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      x.current = !0, w(!0), h.current = 0;
    }, m);
  }, [m, w]);
  return a.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ u.jsx(km, { ...d, children: /* @__PURE__ */ u.jsx(
    Bm,
    {
      scope: t,
      contentId: g,
      open: b,
      stateAttribute: y,
      trigger: f,
      onTriggerChange: p,
      onTriggerEnter: a.useCallback(() => {
        c.isOpenDelayedRef.current ? N() : C();
      }, [c.isOpenDelayedRef, N, C]),
      onTriggerLeave: a.useCallback(() => {
        v ? k() : (window.clearTimeout(h.current), h.current = 0);
      }, [k, v]),
      onOpen: C,
      onClose: k,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
Ea.displayName = Gt;
var Mo = "TooltipTrigger", Ra = a.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Zt(Mo, n), i = or(Mo, n), s = Xn(n), l = a.useRef(null), c = xt(t, l, r.onTriggerChange), d = a.useRef(!1), f = a.useRef(!1), p = a.useCallback(() => d.current = !1, []);
    return a.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ u.jsx(Pm, { asChild: !0, ...s, children: /* @__PURE__ */ u.jsx(
      nt.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: c,
        onPointerMove: We(e.onPointerMove, (g) => {
          g.pointerType !== "touch" && !f.current && !i.isPointerInTransitRef.current && (r.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: We(e.onPointerLeave, () => {
          r.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: We(e.onPointerDown, () => {
          r.open && r.onClose(), d.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: We(e.onFocus, () => {
          d.current || r.onOpen();
        }),
        onBlur: We(e.onBlur, r.onClose),
        onClick: We(e.onClick, r.onClose)
      }
    ) });
  }
);
Ra.displayName = Mo;
var rr = "TooltipPortal", [Hm, Um] = Kn(rr, {
  forceMount: void 0
}), ka = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, i = Zt(rr, t);
  return /* @__PURE__ */ u.jsx(Hm, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(nr, { present: n || i.open, children: /* @__PURE__ */ u.jsx(Ca, { asChild: !0, container: r, children: o }) }) });
};
ka.displayName = rr;
var Ot = "TooltipContent", Pa = a.forwardRef(
  (e, t) => {
    const n = Um(Ot, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...i } = e, s = Zt(Ot, e.__scopeTooltip);
    return /* @__PURE__ */ u.jsx(nr, { present: o || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ u.jsx(Na, { side: r, ...i, ref: t }) : /* @__PURE__ */ u.jsx(Gm, { side: r, ...i, ref: t }) });
  }
), Gm = a.forwardRef((e, t) => {
  const n = Zt(Ot, e.__scopeTooltip), o = or(Ot, e.__scopeTooltip), r = a.useRef(null), i = xt(t, r), [s, l] = a.useState(null), { trigger: c, onClose: d } = n, f = r.current, { onPointerInTransitChange: p } = o, g = a.useCallback(() => {
    l(null), p(!1);
  }, [p]), h = a.useCallback(
    (v, m) => {
      const x = v.currentTarget, b = { x: v.clientX, y: v.clientY }, w = qm(b, x.getBoundingClientRect()), y = Zm(b, w), C = Jm(m.getBoundingClientRect()), k = eh([...y, ...C]);
      l(k), p(!0);
    },
    [p]
  );
  return a.useEffect(() => () => g(), [g]), a.useEffect(() => {
    if (c && f) {
      const v = (x) => h(x, f), m = (x) => h(x, c);
      return c.addEventListener("pointerleave", v), f.addEventListener("pointerleave", m), () => {
        c.removeEventListener("pointerleave", v), f.removeEventListener("pointerleave", m);
      };
    }
  }, [c, f, h, g]), a.useEffect(() => {
    if (s) {
      const v = (m) => {
        const x = m.target, b = { x: m.clientX, y: m.clientY }, w = c?.contains(x) || f?.contains(x), y = !Qm(b, s);
        w ? g() : y && (g(), d());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, f, s, d, g]), /* @__PURE__ */ u.jsx(Na, { ...e, ref: i });
}), [Ym, Km] = Kn(Gt, { isInside: !1 }), Xm = /* @__PURE__ */ Xp("TooltipContent"), Na = a.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      ...l
    } = e, c = Zt(Ot, n), d = Xn(n), { onClose: f } = c;
    return a.useEffect(() => (document.addEventListener(_o, f), () => document.removeEventListener(_o, f)), [f]), a.useEffect(() => {
      if (c.trigger) {
        const p = (g) => {
          g.target instanceof Node && g.target.contains(c.trigger) && f();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [c.trigger, f]), /* @__PURE__ */ u.jsx(
      ua,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ u.jsxs(
          Nm,
          {
            "data-state": c.stateAttribute,
            ...d,
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
              /* @__PURE__ */ u.jsx(Xm, { children: o }),
              /* @__PURE__ */ u.jsx(Ym, { scope: n, isInside: !0, children: /* @__PURE__ */ u.jsx(Wm, { id: c.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Pa.displayName = Ot;
var Ta = "TooltipArrow", Oa = a.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Xn(n);
    return Km(
      Ta,
      n
    ).isInside ? null : /* @__PURE__ */ u.jsx(Tm, { ...r, ...o, ref: t });
  }
);
Oa.displayName = Ta;
function qm(e, t) {
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
function Zm(e, t, n = 5) {
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
function Jm(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function Qm(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const l = t[i], c = t[s], d = l.x, f = l.y, p = c.x, g = c.y;
    f > o != g > o && n < (p - d) * (o - f) / (g - f) + d && (r = !r);
  }
  return r;
}
function eh(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), th(t);
}
function th(e) {
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
var nh = Ea, oh = Ra, rh = ka, sh = Pa, ih = Oa;
const ah = Se(
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
function sr({ children: e, ...t }) {
  return /* @__PURE__ */ u.jsx(nh, { ...t, children: e });
}
const ir = oh;
function ar({
  className: e,
  size: t,
  sideOffset: n = 4,
  children: o,
  slotId: r,
  ...i
}) {
  const s = a.useId();
  return /* @__PURE__ */ u.jsx(rh, { children: /* @__PURE__ */ u.jsxs(
    sh,
    {
      "data-slot": "tooltip-content",
      "data-slot-id": r ?? s,
      sideOffset: n,
      className: ne(ah({ size: t }), e),
      ...i,
      children: [
        o,
        /* @__PURE__ */ u.jsx(
          ih,
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
function lh(e, t) {
  return a.useReducer((n, o) => t[n][o] ?? n, e);
}
var Dt = (e) => {
  const { present: t, children: n } = e, o = ch(t), r = typeof n == "function" ? n({ present: o.isPresent }) : a.Children.only(n), i = xe(o.ref, uh(r));
  return typeof n == "function" || o.isPresent ? a.cloneElement(r, { ref: i }) : null;
};
Dt.displayName = "Presence";
function ch(e) {
  const [t, n] = a.useState(), o = a.useRef(null), r = a.useRef(e), i = a.useRef("none"), s = e ? "mounted" : "unmounted", [l, c] = lh(s, {
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
  return a.useEffect(() => {
    const d = vn(o.current);
    i.current = l === "mounted" ? d : "none";
  }, [l]), Ce(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const g = i.current, h = vn(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(f && g !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Ce(() => {
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
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: a.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function vn(e) {
  return e?.animationName || "none";
}
function uh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var qn = "Popover", [Ia] = Xt(qn, [
  Fn
]), Jt = Fn(), [dh, ot] = Ia(qn), Aa = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    modal: s = !1
  } = e, l = Jt(t), c = a.useRef(null), [d, f] = a.useState(!1), [p, g] = Nn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: qn
  });
  return /* @__PURE__ */ u.jsx(Pi, { ...l, children: /* @__PURE__ */ u.jsx(
    dh,
    {
      scope: t,
      contentId: ut(),
      triggerRef: c,
      open: p,
      onOpenChange: g,
      onOpenToggle: a.useCallback(() => g((h) => !h), [g]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: a.useCallback(() => f(!0), []),
      onCustomAnchorRemove: a.useCallback(() => f(!1), []),
      modal: s,
      children: n
    }
  ) });
};
Aa.displayName = qn;
var ja = "PopoverAnchor", fh = a.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = ot(ja, n), i = Jt(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: l } = r;
    return a.useEffect(() => (s(), () => l()), [s, l]), /* @__PURE__ */ u.jsx(Ko, { ...i, ...o, ref: t });
  }
);
fh.displayName = ja;
var _a = "PopoverTrigger", Ma = a.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = ot(_a, n), i = Jt(n), s = xe(t, r.triggerRef), l = /* @__PURE__ */ u.jsx(
      me.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Fa(r.open),
        ...o,
        ref: s,
        onClick: pe(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? l : /* @__PURE__ */ u.jsx(Ko, { asChild: !0, ...i, children: l });
  }
);
Ma.displayName = _a;
var lr = "PopoverPortal", [ph, mh] = Ia(lr, {
  forceMount: void 0
}), Da = (e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, i = ot(lr, t);
  return /* @__PURE__ */ u.jsx(ph, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(Dt, { present: n || i.open, children: /* @__PURE__ */ u.jsx(Xo, { asChild: !0, container: r, children: o }) }) });
};
Da.displayName = lr;
var It = "PopoverContent", $a = a.forwardRef(
  (e, t) => {
    const n = mh(It, e.__scopePopover), { forceMount: o = n.forceMount, ...r } = e, i = ot(It, e.__scopePopover);
    return /* @__PURE__ */ u.jsx(Dt, { present: o || i.open, children: i.modal ? /* @__PURE__ */ u.jsx(gh, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(vh, { ...r, ref: t }) });
  }
);
$a.displayName = It;
var hh = /* @__PURE__ */ Nt("PopoverContent.RemoveScroll"), gh = a.forwardRef(
  (e, t) => {
    const n = ot(It, e.__scopePopover), o = a.useRef(null), r = xe(t, o), i = a.useRef(!1);
    return a.useEffect(() => {
      const s = o.current;
      if (s) return qo(s);
    }, []), /* @__PURE__ */ u.jsx(Vn, { as: hh, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
      La,
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
            const l = s.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || c;
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
), vh = a.forwardRef(
  (e, t) => {
    const n = ot(It, e.__scopePopover), o = a.useRef(!1), r = a.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      La,
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
), La = a.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: o,
      onOpenAutoFocus: r,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: l,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: f,
      ...p
    } = e, g = ot(It, n), h = Jt(n);
    return zo(), /* @__PURE__ */ u.jsx(
      Mn,
      {
        asChild: !0,
        loop: !0,
        trapped: o,
        onMountAutoFocus: r,
        onUnmountAutoFocus: i,
        children: /* @__PURE__ */ u.jsx(
          _n,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: f,
            onEscapeKeyDown: l,
            onPointerDownOutside: c,
            onFocusOutside: d,
            onDismiss: () => g.onOpenChange(!1),
            children: /* @__PURE__ */ u.jsx(
              Ni,
              {
                "data-state": Fa(g.open),
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
), za = "PopoverClose", xh = a.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = ot(za, n);
    return /* @__PURE__ */ u.jsx(
      me.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: pe(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
xh.displayName = za;
var bh = "PopoverArrow", wh = a.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = Jt(n);
    return /* @__PURE__ */ u.jsx(Ti, { ...r, ...o, ref: t });
  }
);
wh.displayName = bh;
function Fa(e) {
  return e ? "open" : "closed";
}
var yh = Aa, Ch = Ma, Sh = Da, Eh = $a;
const Zn = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" }
}, Ie = a.createContext({ size: "base", close: () => {
}, isOpen: !1 }), Rh = a.createContext({ isSub: !1, close: () => {
}, open: () => {
}, isOpen: !1, scheduleClose: () => {
}, cancelClose: () => {
} });
function cr({ children: e, size: t = "base", ...n }) {
  const [o, r] = a.useState(n.open ?? !1), i = () => s(!1), s = (l) => {
    r(l), n.onOpenChange?.(l);
  };
  return a.useEffect(() => {
    if (!o) return;
    const l = (c) => {
      c.target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]') || i();
    };
    return window.addEventListener("scroll", l, { capture: !0 }), () => window.removeEventListener("scroll", l, { capture: !0 });
  }, [o]), /* @__PURE__ */ u.jsx(yh, { ...n, open: n.open ?? o, onOpenChange: s, children: /* @__PURE__ */ u.jsx(Ie.Provider, { value: { size: t, close: i, isOpen: n.open ?? o }, children: e }) });
}
const ur = Ch, kh = Se(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
);
function dr({ className: e, sideOffset: t = 4, align: n = "start", slotId: o, ...r }) {
  const { size: i } = a.useContext(Ie), s = Zn[i], l = a.useId();
  return /* @__PURE__ */ u.jsx(Sh, { children: /* @__PURE__ */ u.jsx(
    Eh,
    {
      "data-slot": "popover-content",
      "data-slot-id": o ?? l,
      sideOffset: t,
      align: n,
      className: ne(
        kh(),
        s.rounded === "rounded" ? "rounded-md" : s.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function ls({ className: e, disabled: t, slotId: n, ...o }) {
  const { size: r } = a.useContext(Ie), i = Zn[r], s = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-item",
      "data-slot-id": n ?? s,
      className: ne(
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
function ke({ className: e, closeOnClick: t = !1, onClick: n, children: o, size: r, slotId: i, ...s }) {
  const { size: l } = a.useContext(Ie), { isSub: c, close: d } = a.useContext(Rh), { close: f } = a.useContext(Ie), p = Zn[l], g = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-menu-item",
      "data-slot-id": i ?? g,
      className: ne(
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
function Yt({ className: e, slotId: t, ...n }) {
  const { size: o } = a.useContext(Ie), r = Zn[o], i = a.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-label",
      "data-slot-id": t ?? i,
      className: ne("py-1.5 text-black-55", r.px, r.text, e),
      ...n
    }
  );
}
function dt({ className: e, slotId: t, ...n }) {
  const o = a.useId();
  return /* @__PURE__ */ u.jsx("div", { "data-slot": "popover-separator", "data-slot-id": t ?? o, className: ne("-mx-1 my-1 h-px bg-neutral-2", e), ...n });
}
var Jn = "Dialog", [Wa] = Xt(Jn), [Ph, Ae] = Wa(Jn), Va = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    modal: s = !0
  } = e, l = a.useRef(null), c = a.useRef(null), [d, f] = Nn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: Jn
  });
  return /* @__PURE__ */ u.jsx(
    Ph,
    {
      scope: t,
      triggerRef: l,
      contentRef: c,
      contentId: ut(),
      titleId: ut(),
      descriptionId: ut(),
      open: d,
      onOpenChange: f,
      onOpenToggle: a.useCallback(() => f((p) => !p), [f]),
      modal: s,
      children: n
    }
  );
};
Va.displayName = Jn;
var Ba = "DialogTrigger", Nh = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ae(Ba, n), i = xe(t, r.triggerRef);
    return /* @__PURE__ */ u.jsx(
      me.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": mr(r.open),
        ...o,
        ref: i,
        onClick: pe(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Nh.displayName = Ba;
var fr = "DialogPortal", [Th, Ha] = Wa(fr, {
  forceMount: void 0
}), Ua = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, i = Ae(fr, t);
  return /* @__PURE__ */ u.jsx(Th, { scope: t, forceMount: n, children: a.Children.map(o, (s) => /* @__PURE__ */ u.jsx(Dt, { present: n || i.open, children: /* @__PURE__ */ u.jsx(Xo, { asChild: !0, container: r, children: s }) })) });
};
Ua.displayName = fr;
var On = "DialogOverlay", Ga = a.forwardRef(
  (e, t) => {
    const n = Ha(On, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, i = Ae(On, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ u.jsx(Dt, { present: o || i.open, children: /* @__PURE__ */ u.jsx(Ih, { ...r, ref: t }) }) : null;
  }
);
Ga.displayName = On;
var Oh = /* @__PURE__ */ Nt("DialogOverlay.RemoveScroll"), Ih = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ae(On, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u.jsx(Vn, { as: Oh, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ u.jsx(
        me.div,
        {
          "data-state": mr(r.open),
          ...o,
          ref: t,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), gt = "DialogContent", Ya = a.forwardRef(
  (e, t) => {
    const n = Ha(gt, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, i = Ae(gt, e.__scopeDialog);
    return /* @__PURE__ */ u.jsx(Dt, { present: o || i.open, children: i.modal ? /* @__PURE__ */ u.jsx(Ah, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(jh, { ...r, ref: t }) });
  }
);
Ya.displayName = gt;
var Ah = a.forwardRef(
  (e, t) => {
    const n = Ae(gt, e.__scopeDialog), o = a.useRef(null), r = xe(t, n.contentRef, o);
    return a.useEffect(() => {
      const i = o.current;
      if (i) return qo(i);
    }, []), /* @__PURE__ */ u.jsx(
      Ka,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: pe(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: pe(e.onPointerDownOutside, (i) => {
          const s = i.detail.originalEvent, l = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || l) && i.preventDefault();
        }),
        onFocusOutside: pe(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), jh = a.forwardRef(
  (e, t) => {
    const n = Ae(gt, e.__scopeDialog), o = a.useRef(!1), r = a.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      Ka,
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
), Ka = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: i, ...s } = e, l = Ae(gt, n), c = a.useRef(null), d = xe(t, c);
    return zo(), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        Mn,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: r,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ u.jsx(
            _n,
            {
              role: "dialog",
              id: l.contentId,
              "aria-describedby": l.descriptionId,
              "aria-labelledby": l.titleId,
              "data-state": mr(l.open),
              ...s,
              ref: d,
              onDismiss: () => l.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Dh, { titleId: l.titleId }),
        /* @__PURE__ */ u.jsx(Lh, { contentRef: c, descriptionId: l.descriptionId })
      ] })
    ] });
  }
), pr = "DialogTitle", _h = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ae(pr, n);
    return /* @__PURE__ */ u.jsx(me.h2, { id: r.titleId, ...o, ref: t });
  }
);
_h.displayName = pr;
var Xa = "DialogDescription", Mh = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ae(Xa, n);
    return /* @__PURE__ */ u.jsx(me.p, { id: r.descriptionId, ...o, ref: t });
  }
);
Mh.displayName = Xa;
var qa = "DialogClose", Za = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ae(qa, n);
    return /* @__PURE__ */ u.jsx(
      me.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: pe(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Za.displayName = qa;
function mr(e) {
  return e ? "open" : "closed";
}
var Ja = "DialogTitleWarning", [Ng, Qa] = ju(Ja, {
  contentName: gt,
  titleName: pr,
  docsSlug: "dialog"
}), Dh = ({ titleId: e }) => {
  const t = Qa(Ja), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return a.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, $h = "DialogDescriptionWarning", Lh = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Qa($h).contentName}}.`;
  return a.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, zh = Va, Fh = Ua, Wh = Ga, Vh = Ya, Bh = Za;
const Hh = a.createContext({ size: "base" }), Uh = {
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
}, Gh = zh, Yh = Fh, Kh = Se(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
);
function Xh({ className: e, overlayClassName: t, size: n = "base", children: o, slotId: r, ...i }) {
  const s = Uh[n], l = a.useId();
  return /* @__PURE__ */ u.jsx(Hh.Provider, { value: { size: n }, children: /* @__PURE__ */ u.jsxs(Yh, { children: [
    /* @__PURE__ */ u.jsx(Wh, { className: ne("fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t) }),
    /* @__PURE__ */ u.jsxs(
      Vh,
      {
        "data-slot": "dialog-content",
        "data-slot-id": r ?? l,
        className: ne(
          Kh(),
          s.content,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          e
        ),
        ...i,
        children: [
          o,
          /* @__PURE__ */ u.jsx(Bh, { asChild: !0, children: /* @__PURE__ */ u.jsx(ge, { variant: "ghost", size: s.close.buttonSize, className: ne("absolute", s.close.position), children: /* @__PURE__ */ u.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ u.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) }) })
        ]
      }
    )
  ] }) });
}
function Pt({ children: e, className: t, onDoubleClick: n, onClick: o }) {
  const r = a.useRef(null), [i, s] = a.useState(!1);
  return a.useEffect(() => {
    r.current && s(r.current.scrollWidth > r.current.clientWidth);
  }, [e]), i ? /* @__PURE__ */ u.jsxs(sr, { children: [
    /* @__PURE__ */ u.jsx(ir, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: r,
        className: t,
        onDoubleClick: n,
        onClick: o,
        children: e
      }
    ) }),
    /* @__PURE__ */ u.jsx(ar, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: e }) })
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
function el({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: i, readOnly: s }) {
  return t ? /* @__PURE__ */ u.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (l) => r?.(l.target.value),
      onBlur: () => i?.(),
      onKeyDown: (l) => {
        l.key === "Enter" && l.preventDefault(), l.key === "Escape" && l.preventDefault();
      },
      onFocus: (l) => l.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ u.jsx(
    Pt,
    {
      className: ne("flex-1 w-full min-h-6 truncate", !s && "cursor-pointer"),
      onDoubleClick: s ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function qh({ value: e, isEditing: t, onStartEdit: n, editingValue: o, onUpdateEditingValue: r, onFinishEdit: i, readOnly: s }) {
  return t ? /* @__PURE__ */ u.jsx(
    "input",
    {
      type: "text",
      value: o ?? "",
      onChange: (l) => {
        const c = l.target.value;
        (c === "" || /^-?\d*\.?\d*$/.test(c)) && r?.(c);
      },
      onBlur: () => i?.(),
      onKeyDown: (l) => {
        l.key === "Enter" && l.preventDefault(), l.key === "Escape" && l.preventDefault();
      },
      onFocus: (l) => l.target.select(),
      className: "absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden text-right",
      autoFocus: !0
    }
  ) : /* @__PURE__ */ u.jsx(
    Pt,
    {
      className: ne("flex-1 w-full min-h-6 truncate text-right", !s && "cursor-pointer"),
      onDoubleClick: s ? void 0 : () => n?.(),
      children: String(e) || " "
    }
  );
}
function Zh({ value: e, options: t, onChange: n, cellId: o, isCellHovering: r }) {
  const [i, s] = a.useState(String(e)), l = t?.placeholder || "请输入", c = a.useRef(null), d = (f) => {
    s(f.target.value), n?.(f.target.value);
  };
  return a.useEffect(() => {
    r && c.current;
  }, [r]), /* @__PURE__ */ u.jsx("div", { className: "min-w-0 flex-1", "data-input-cell": o, children: /* @__PURE__ */ u.jsx(
    qe,
    {
      ref: c,
      className: "w-full",
      placeholder: l,
      variant: "basic",
      size: "base",
      value: i,
      onChange: d
    }
  ) });
}
function Jh({
  value: e,
  options: t,
  onChange: n,
  onUpdateColumnOptions: o,
  isLocked: r,
  isCellHovering: i,
  onLockCell: s,
  readOnly: l
}) {
  const c = t?.items ?? [], [d, f] = a.useState(!1), [p, g] = a.useState(""), h = a.useMemo(() => c.find((E) => E.value === e)?.label || "", [c, e]), v = a.useMemo(() => {
    if (!p.trim()) return c;
    const N = p.toLowerCase();
    return c.filter((E) => E.label.toLowerCase().includes(N));
  }, [c, p]), m = a.useMemo(() => {
    if (!p.trim()) return !0;
    const N = p.toLowerCase();
    return c.some((E) => E.label.toLowerCase() === N);
  }, [c, p]), x = () => {
    if (!p.trim() || !o) return;
    const N = p.trim(), E = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: N
    };
    f(!1), setTimeout(() => {
      const R = [...c, E];
      o({ ...t, items: R }), n?.(E.value);
    }, 200);
  }, b = (N) => {
    n?.(N), f(!1);
  }, w = () => {
    l || r || s?.();
  }, y = () => {
    l || (r || s?.(), f(!0));
  }, C = (N) => {
    N.stopPropagation(), r || s?.(), f(!0);
  }, k = !l && (r || i);
  return /* @__PURE__ */ u.jsxs(cr, { open: d, onOpenChange: (N) => {
    N && g(""), f(N);
  }, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      /* @__PURE__ */ u.jsx(
        Pt,
        {
          className: ne(
            "flex-1 min-h-6 truncate",
            !l && "cursor-pointer",
            !h && "text-black-25"
          ),
          onClick: w,
          onDoubleClick: y,
          children: h || " "
        }
      ),
      /* @__PURE__ */ u.jsx(ur, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ge,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-chevron-down",
          className: ne(
            "ml-auto shrink-0",
            !k && "opacity-0 pointer-events-none"
          ),
          onClick: C
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsx(dr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (N) => N.stopPropagation(), onDoubleClick: (N) => N.stopPropagation(), onMouseDown: (N) => N.stopPropagation(), children: [
      /* @__PURE__ */ u.jsx(
        qe,
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
      /* @__PURE__ */ u.jsx(dt, { className: "!my-1" }),
      /* @__PURE__ */ u.jsxs("div", { className: "flex flex-col group/options", children: [
        v.length > 0 ? v.map((N) => /* @__PURE__ */ u.jsx(
          ls,
          {
            className: ne(
              N.value === e && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
              N.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !N.disabled && b(N.value),
            children: /* @__PURE__ */ u.jsx(Pt, { className: "flex-1 min-w-0 truncate", children: N.label })
          },
          N.value
        )) : !p.trim() && c.length === 0 ? /* @__PURE__ */ u.jsx("span", { className: "relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default", children: "没有选项" }) : null,
        p.trim() && !m && /* @__PURE__ */ u.jsx(
          ls,
          {
            className: "text-black-55 hover:text-black-85",
            onClick: x,
            children: /* @__PURE__ */ u.jsx(Pt, { className: "flex-1 min-w-0 truncate", children: `添加选项 "${p.trim()}"` })
          }
        )
      ] })
    ] }) })
  ] });
}
function Qh({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, onLockCell: r, readOnly: i }) {
  const s = e?.buttonConfig, [l, c] = a.useState(!1), d = (m) => {
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
  return /* @__PURE__ */ u.jsxs(cr, { open: l, onOpenChange: c, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      v && /* @__PURE__ */ u.jsx("div", { className: "min-w-0 shrink", children: s?.label ? (
        // 文字按钮：link 样式，超长截断 + Tooltip
        /* @__PURE__ */ u.jsx(
          ge,
          {
            variant: "link",
            size: "base",
            onClick: p,
            className: "max-w-full",
            children: /* @__PURE__ */ u.jsx(Pt, { className: "truncate", children: s.label })
          }
        )
      ) : (
        // 图标按钮：只有 URL 无名称时显示
        /* @__PURE__ */ u.jsx(
          ge,
          {
            variant: "link",
            size: "iconBase",
            leftIcon: "icon-jump",
            onClick: p
          }
        )
      ) }),
      /* @__PURE__ */ u.jsx(ur, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ge,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-link",
          className: ne(
            "ml-auto shrink-0",
            !h && "opacity-0 pointer-events-none"
          ),
          onClick: g
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsx(dr, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx("div", { onClick: (m) => m.stopPropagation(), onDoubleClick: (m) => m.stopPropagation(), onMouseDown: (m) => m.stopPropagation(), children: /* @__PURE__ */ u.jsx(
      eg,
      {
        config: s,
        onSave: d
      }
    ) }) })
  ] });
}
function eg({ config: e, onSave: t }) {
  const [n, o] = a.useState(e?.label ?? ""), [r, i] = a.useState(e?.url ?? ""), s = a.useId(), l = () => {
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
        d.key === "Enter" && (d.preventDefault(), l()), d.key === "Escape" && (d.preventDefault(), c());
      },
      children: [
        /* @__PURE__ */ u.jsx(Yt, { children: "按钮名称" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          qe,
          {
            variant: "basic",
            size: "base",
            value: n,
            onChange: (d) => o(d.target.value),
            placeholder: "输入按钮名称",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(Yt, { children: "超链接" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          qe,
          {
            variant: "basic",
            size: "base",
            value: r,
            onChange: (d) => i(d.target.value),
            placeholder: "输入超链接",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(dt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ge, { variant: "outline", size: "base", className: "flex-1", onClick: c, children: "取消" }),
          /* @__PURE__ */ u.jsx(ge, { variant: "primary", size: "base", className: "flex-1", onClick: l, children: "保存" })
        ] })
      ]
    }
  );
}
function tg({ value: e, options: t }) {
  const n = t?.iconName || String(e);
  return /* @__PURE__ */ u.jsx(ge, { variant: "ghost", size: "iconBase", leftIcon: n });
}
function ng({ file: e, isLocked: t, isPreviewOpen: n, onPreview: o, onRemove: r }) {
  const [i, s] = a.useState(null), l = a.useRef(null), c = a.useRef(null), d = a.useRef(null), f = e.type.startsWith("image/"), p = e.type.startsWith("video/");
  a.useEffect(() => {
    if (f) {
      const b = URL.createObjectURL(e);
      return s(b), () => URL.revokeObjectURL(b);
    } else if (p) {
      const b = URL.createObjectURL(e), w = c.current, y = d.current;
      return w && y && (w.src = b, w.addEventListener("loadeddata", () => {
        y.width = w.videoWidth || 80, y.height = w.videoHeight || 80;
        const C = y.getContext("2d");
        if (C) {
          C.drawImage(w, 0, 0, y.width, y.height);
          const k = y.toDataURL("image/jpeg", 0.8);
          s(k);
        }
      }), w.currentTime = 0.1), () => URL.revokeObjectURL(b);
    }
    return () => {
    };
  }, [e, f, p]);
  const g = () => {
    o?.();
  }, h = (b) => {
    b.stopPropagation(), l.current?.click();
  }, v = (b) => {
    b.stopPropagation(), r?.();
  }, m = (b) => {
    b.target.files?.[0], b.target.value = "";
  }, x = /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: "group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer",
      onClick: g,
      children: [
        i ? /* @__PURE__ */ u.jsx("img", { src: i, alt: e.name, className: "size-full object-cover" }) : /* @__PURE__ */ u.jsx("svg", { className: "size-4 text-black-55", fill: "currentColor", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-file-1" }) }),
        (f || p) && i && /* @__PURE__ */ u.jsx("div", { className: ne(
          "absolute inset-0 bg-black-10 opacity-0 group-hover:opacity-100",
          !n && "transition-opacity"
        ) })
      ]
    }
  );
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    t ? /* @__PURE__ */ u.jsxs(sr, { children: [
      /* @__PURE__ */ u.jsx(ir, { asChild: !0, children: x }),
      /* @__PURE__ */ u.jsxs(ar, { side: "top", sideOffset: 4, className: "h-10 flex items-center px-0.5", children: [
        /* @__PURE__ */ u.jsx(
          ge,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-edit",
            onClick: h,
            className: "text-white-60 hover:text-white-100"
          }
        ),
        /* @__PURE__ */ u.jsx(
          ge,
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
    /* @__PURE__ */ u.jsx("input", { ref: l, type: "file", className: "hidden", onChange: m }),
    /* @__PURE__ */ u.jsx("video", { ref: c, className: "hidden", preload: "metadata", crossOrigin: "anonymous" }),
    /* @__PURE__ */ u.jsx("canvas", { ref: d, className: "hidden" })
  ] });
}
function og({ cellData: e, isLocked: t, isCellHovering: n, onChange: o, readOnly: r }) {
  const i = e?.attachmentFiles, s = a.useRef(null), l = a.useRef(null), [c, d] = a.useState(null), [f, p] = a.useState([]), g = i ?? [], h = g.length, [v, m] = a.useState(h);
  a.useEffect(() => {
    const M = l.current;
    if (!M) return;
    const D = () => {
      const W = M.clientWidth, J = Math.max(1, Math.floor(W / 40));
      m(J);
    };
    D();
    const Y = new ResizeObserver(D);
    return Y.observe(M), () => Y.disconnect();
  }, [h]);
  const x = h > v, b = h - v;
  a.useEffect(() => {
    const M = g.map((D) => URL.createObjectURL(D));
    return p(M), () => M.forEach((D) => URL.revokeObjectURL(D));
  }, [i]);
  const w = (M) => {
    o?.({ attachmentFiles: M });
  }, y = () => {
    s.current?.click();
  }, C = (M) => {
    const D = Array.from(M.target.files || []);
    D.length > 0 && w([...g, ...D]), M.target.value = "";
  }, k = (M) => {
    const D = g.filter((Y, W) => W !== M);
    w(D), c === M && d(null);
  }, N = (M) => {
    d(M);
  }, E = () => {
    c !== null && c > 0 && d(c - 1);
  }, R = () => {
    c !== null && c < h - 1 && d(c + 1);
  };
  a.useEffect(() => {
    if (c === null) return;
    const M = (D) => {
      D.key === "ArrowLeft" ? E() : D.key === "ArrowRight" && R();
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [c]);
  const z = !r && (t || n);
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("div", { ref: l, className: "flex items-center gap-2 min-w-0 flex-1", children: [
      h > 0 && /* @__PURE__ */ u.jsx("div", { className: "flex items-center gap-2 min-w-0 shrink", children: g.slice(0, v).map((M, D) => /* @__PURE__ */ u.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ u.jsx(
          ng,
          {
            file: M,
            isLocked: t ?? !1,
            isPreviewOpen: c !== null,
            onPreview: () => N(D),
            onRemove: () => k(D)
          }
        ),
        x && D === v - 1 && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer",
            onClick: () => N(D),
            children: /* @__PURE__ */ u.jsxs("span", { className: "text-xs text-white-100", children: [
              "+",
              b
            ] })
          }
        )
      ] }, `${M.name}-${M.size}-${D}`)) }),
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
      z && /* @__PURE__ */ u.jsx(
        ge,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-upload",
          className: "ml-auto shrink-0",
          onClick: y
        }
      )
    ] }),
    c !== null && f[c] && /* @__PURE__ */ u.jsx(Gh, { open: c !== null, onOpenChange: (M) => !M && d(null), children: /* @__PURE__ */ u.jsxs(
      Xh,
      {
        size: "lg",
        overlayClassName: "bg-black-55",
        className: "w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85",
        children: [
          /* @__PURE__ */ u.jsx(
            ge,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-left",
              disabled: c === 0,
              className: "absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: E
            }
          ),
          g[c]?.type.startsWith("image/") ? /* @__PURE__ */ u.jsx("img", { src: f[c], alt: g[c].name, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" }) : g[c]?.type.startsWith("video/") ? /* @__PURE__ */ u.jsx("video", { src: f[c], controls: !0, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" }) : null,
          /* @__PURE__ */ u.jsx(
            ge,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-right",
              disabled: c === h - 1,
              className: "absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: R
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
const tl = {
  text: el,
  number: qh,
  input: Zh,
  select: Jh,
  // 使用新版可编辑渲染器
  button: Qh,
  attachment: og,
  icon: tg
}, nl = a.createContext(null), ol = a.createContext(null), rl = a.createContext(null), hr = a.createContext(tl);
function Qn() {
  const e = a.useContext(nl);
  if (!e) throw new Error("useTableActions must be used within a TableProvider");
  return e;
}
function Qt() {
  const e = a.useContext(ol);
  if (!e) throw new Error("useTableData must be used within a TableProvider");
  return e;
}
function eo() {
  const e = a.useContext(rl);
  if (!e) throw new Error("useTableState must be used within a TableProvider");
  return e;
}
function bt() {
  return {
    state: eo(),
    actions: Qn(),
    data: Qt(),
    cellRenderers: a.useContext(hr)
  };
}
function rg({ data: e, cellRenderers: t, readOnly: n, children: o }) {
  const r = a.useMemo(
    () => ({ ...tl, ...t }),
    [t]
  ), [i, s] = a.useState(() => {
    const S = {};
    return e.columns.forEach((I) => {
      S[I.id] = I.width === "auto" ? 40 : I.width ?? 200;
    }), S;
  }), [l, c] = a.useState(e.columns), [d, f] = a.useState(e.rows), [p, g] = a.useState(() => e.hiddenColumns ?? /* @__PURE__ */ new Set()), [h, v] = a.useState(() => {
    const S = /* @__PURE__ */ new Set(), I = e.columns.find((j) => j.type === "checkbox");
    I && S.add(I.id);
    const O = e.columns.find((j) => j.type !== "checkbox");
    return O && S.add(O.id), S;
  }), [m, x] = a.useState(() => e.groupColumnId ?? null), [b, w] = a.useState(() => {
    if (!e.groupColumnId) return /* @__PURE__ */ new Set();
    const S = e.columns.findIndex((F) => F.id === e.groupColumnId);
    if (S === -1) return /* @__PURE__ */ new Set();
    const I = new Set(e.rows.map((F) => String(F.cells[S]?.value ?? ""))), O = Array.from(I).sort((F, X) => !F && X ? 1 : F && !X ? -1 : 0), j = O[0];
    if (!j) return /* @__PURE__ */ new Set();
    const L = new Set(O);
    return L.delete(j), L;
  }), [y, C] = a.useState(/* @__PURE__ */ new Set()), [k, N] = a.useState(null), [E, R] = a.useState(n ?? !1);
  a.useEffect(() => {
    E && (Y(null), Z(""), M(null));
  }, [E]);
  const [z, M] = a.useState(null), [D, Y] = a.useState(null), [W, Z] = a.useState(""), J = y.size === d.length && d.length > 0, V = a.useCallback(() => {
    C(J ? /* @__PURE__ */ new Set() : new Set(d.map((S) => S.id)));
  }, [J, d]), G = a.useCallback((S) => {
    C((I) => {
      const O = new Set(I);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    }), M(null);
  }, []), H = a.useCallback(() => {
    C(/* @__PURE__ */ new Set());
  }, []), Q = a.useCallback((S, I) => {
    Y(S), Z(I);
  }, []), $ = a.useCallback(() => {
    if (!D) return;
    l.some((I) => I.id === D) ? c(
      (I) => I.map(
        (O) => O.id === D ? { ...O, title: W } : O
      )
    ) : f(
      (I) => I.map((O) => ({
        ...O,
        cells: O.cells.map(
          (j) => j.id === D ? { ...j, value: W } : j
        )
      }))
    ), Y(null), Z("");
  }, [D, W, l]), P = a.useCallback(() => {
    Y(null), Z("");
  }, []), K = a.useCallback((S) => {
    Z(S);
  }, []), q = a.useCallback((S, I) => {
    f((O) => O.map((j) => {
      const L = j.cells.findIndex((X) => X.id === S);
      if (L === -1) return j;
      const F = [...j.cells];
      if (typeof I == "object" && I !== null) {
        const X = I, le = j.cells[L];
        F[L] = {
          ...le,
          ...X
        };
      } else
        F[L] = { ...j.cells[L], value: I };
      return { ...j, cells: F };
    }));
  }, []), se = a.useCallback((S, I) => {
    s((O) => ({
      ...O,
      [S]: I
    }));
  }, []), oe = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, ie = a.useCallback((S) => {
    const I = l.findIndex((L) => L.id === S);
    if (I === -1) return;
    const O = oe(), j = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    c((L) => {
      const F = [...L];
      return F.splice(I, 0, j), F;
    }), s((L) => ({
      ...L,
      [O]: 200
    })), f(
      (L) => L.map((F) => {
        const X = {
          id: `${O}-${F.id}`,
          type: "text",
          value: "",
          width: 200
        }, le = [...F.cells];
        return le.splice(I, 0, X), { ...F, cells: le };
      })
    );
  }, [l]), _ = a.useCallback((S) => {
    const I = l.findIndex((L) => L.id === S);
    if (I === -1) return;
    const O = oe(), j = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    c((L) => {
      const F = [...L];
      return F.splice(I + 1, 0, j), F;
    }), s((L) => ({
      ...L,
      [O]: 200
    })), f(
      (L) => L.map((F) => {
        const X = {
          id: `${O}-${F.id}`,
          type: "text",
          value: "",
          width: 200
        }, le = [...F.cells];
        return le.splice(I + 1, 0, X), { ...F, cells: le };
      })
    );
  }, [l]), te = a.useCallback((S) => {
    g((I) => new Set(I).add(S));
  }, []), ee = a.useCallback((S) => {
    g((I) => {
      const O = new Set(I);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    });
  }, []), ue = a.useCallback((S) => {
    const I = l.findIndex((O) => O.id === S);
    I !== -1 && (c((O) => O.filter((j) => j.id !== S)), s((O) => {
      const j = { ...O };
      return delete j[S], j;
    }), g((O) => {
      const j = new Set(O);
      return j.delete(S), j;
    }), f(
      (O) => O.map((j) => ({
        ...j,
        cells: j.cells.filter((L, F) => F !== I)
      }))
    ));
  }, [l]), ce = a.useCallback((S, I) => {
    const O = l.findIndex((j) => j.id === S);
    O !== -1 && (c(
      (j) => j.map(
        (L) => L.id === S ? { ...L, type: I } : L
      )
    ), f(
      (j) => j.map((L) => ({
        ...L,
        cells: L.cells.map(
          (F, X) => X === O ? { ...F, type: I } : F
        )
      }))
    ));
  }, [l]), re = a.useCallback((S, I) => {
    c(
      (O) => O.map(
        (j) => j.id === S ? { ...j, title: I } : j
      )
    );
  }, []), ve = a.useCallback((S, I) => {
    c(
      (O) => O.map(
        (j) => j.id === S ? { ...j, options: I } : j
      )
    );
  }, []), be = a.useCallback((S) => {
    const I = l.findIndex((j) => j.id === S);
    if (I === -1) return;
    const O = l.slice(0, I + 1).map((j) => j.id);
    v(new Set(O));
  }, [l]), rt = a.useCallback((S) => {
    x(S);
  }, []), Ge = {
    selectedRows: y,
    selectAll: J,
    editingCellId: D,
    editingValue: W,
    lockedCellId: z,
    columnWidths: i,
    allColumns: l,
    hiddenColumns: p,
    frozenColumns: h,
    groupColumnId: m,
    collapsedGroups: b,
    selectedColumnId: k,
    readOnly: E
  }, st = a.useCallback((S) => {
    w((I) => {
      const O = new Set(I);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    });
  }, []), to = a.useCallback((S, I) => {
    const O = I.map((L) => L.id), j = O.every((L) => y.has(L));
    C((L) => {
      const F = new Set(L);
      return j ? O.forEach((X) => F.delete(X)) : O.forEach((X) => F.add(X)), F;
    });
  }, [y]), $t = (S) => {
    switch (S.type) {
      case "checkbox":
        return !1;
      case "button":
        return S.options?.label || "";
      case "icon":
        return S.options?.iconName || "";
      default:
        return "";
    }
  }, Lt = (S, I, O) => ({
    id: `${I}-${S.id}`,
    type: S.type,
    value: $t(S),
    width: S.width === "auto" ? 40 : S.width ?? 200,
    ...O
  }), no = a.useCallback((S, I) => {
    const O = l.findIndex((X) => X.id === I);
    if (O === -1) return;
    const j = oe(), L = l.map(
      (X) => Lt(X, j, X.id === I ? { value: S } : void 0)
    );
    let F = d.length;
    for (let X = d.length - 1; X >= 0; X--) {
      const fe = d[X]?.cells[O];
      if ((fe ? String(fe.value ?? "") : "") === S) {
        F = X + 1;
        break;
      }
    }
    f((X) => {
      const le = [...X];
      return le.splice(F, 0, { id: j, cells: L }), le;
    });
  }, [l, d]), en = a.useCallback(() => {
    const S = oe(), I = l.map(
      (O) => Lt(O, S)
    );
    f((O) => [...O, { id: S, cells: I }]);
  }, [l]), wt = a.useCallback((S, I, O) => {
    const j = l.findIndex((L) => L.id === O);
    j !== -1 && f(
      (L) => L.map((F) => {
        const X = F.cells[j];
        if ((X ? String(X.value ?? "") : "") === S && X) {
          const fe = [...F.cells];
          return fe[j] = { ...X, value: I }, { ...F, cells: fe };
        }
        return F;
      })
    );
  }, [l]), it = a.useCallback((S) => {
    M(S), S && (C(/* @__PURE__ */ new Set()), N(null));
  }, []), zt = a.useCallback((S) => {
    N(S), S && (C(/* @__PURE__ */ new Set()), M(null));
  }, []), tn = a.useCallback((S, I, O) => {
    const j = l.findIndex((fe) => fe.id === S), L = l.findIndex((fe) => fe.id === I);
    if (j === -1 || L === -1 || j === L) return;
    const F = O === "right" ? L + 1 : L, X = F > j ? F - 1 : F;
    if (X === j) return;
    const le = j;
    c((fe) => {
      const we = [...fe], de = we[le];
      return de ? (we.splice(le, 1), we.splice(X, 0, de), we) : fe;
    }), f(
      (fe) => fe.map((we) => {
        const de = [...we.cells], he = de[le];
        return he ? (de.splice(le, 1), de.splice(X, 0, he), { ...we, cells: de }) : we;
      })
    ), N(S);
  }, [l]), Le = a.useCallback((S, I) => {
    const j = l.some((le) => le.type === "checkbox") ? 1 : 0, L = l.length - j;
    let F = l;
    if (I > L) {
      const le = I - L, fe = [], we = {};
      for (let de = 0; de < le; de++) {
        const he = oe(), Pe = l.length + de + 1 - j;
        fe.push({
          id: he,
          type: "text",
          title: `列${Pe}`,
          width: 200
        }), we[he] = 200;
      }
      F = [...l, ...fe], c(F), s((de) => ({ ...de, ...we })), f(
        (de) => de.map((he) => {
          const Pe = fe.map((ll) => ({
            id: `${ll.id}-${he.id}`,
            type: "text",
            value: "",
            width: 200
          }));
          return { ...he, cells: [...he.cells, ...Pe] };
        })
      );
    } else if (I < L) {
      const le = L - I, fe = l.length - le, we = l.slice(fe).map((de) => de.id);
      F = l.slice(0, fe), c(F), s((de) => {
        const he = { ...de };
        return we.forEach((Pe) => delete he[Pe]), he;
      }), g((de) => {
        const he = new Set(de);
        return we.forEach((Pe) => he.delete(Pe)), he;
      }), f(
        (de) => de.map((he) => ({
          ...he,
          cells: he.cells.slice(0, fe)
        }))
      );
    }
    const X = d.length;
    if (S > X) {
      const le = S - X, fe = [];
      for (let we = 0; we < le; we++) {
        const de = oe(), he = F.map(
          (Pe) => Lt(Pe, de)
        );
        fe.push({ id: de, cells: he });
      }
      f((we) => [...we, ...fe]);
    } else S < X && f((le) => le.slice(0, S));
  }, [l, d]), nn = a.useCallback(() => {
    R((S) => !S);
  }, []), oo = {
    toggleSelectAll: V,
    toggleRowSelect: G,
    clearSelection: H,
    startEdit: Q,
    finishEdit: $,
    cancelEdit: P,
    updateEditingValue: K,
    lockCell: it,
    updateCellValue: q,
    updateColumnWidth: se,
    insertColumnLeft: ie,
    insertColumnRight: _,
    hideColumn: te,
    toggleColumnVisibility: ee,
    deleteColumn: ue,
    updateColumnType: ce,
    updateColumnTitle: re,
    updateColumnOptions: ve,
    freezeColumns: be,
    setGroupColumn: rt,
    toggleGroupCollapse: st,
    toggleGroupSelect: to,
    insertRowInGroup: no,
    insertRow: en,
    updateGroupValues: wt,
    selectColumn: zt,
    moveColumnOrder: tn,
    setDimension: Le,
    toggleReadOnly: nn
  }, ze = a.useMemo(() => ({
    columns: l.filter((S) => !p.has(S.id)),
    rows: d.map((S) => ({
      ...S,
      cells: S.cells.filter((I, O) => !p.has(l[O]?.id ?? ""))
    })),
    allRows: d
  }), [l, d, p]), Ft = a.useMemo(() => {
    const S = /* @__PURE__ */ new Map();
    return ze.columns.forEach((I) => S.set(I.id, I)), S;
  }, [ze.columns]), A = a.useMemo(() => ({ ...ze, columnMap: Ft }), [ze, Ft]), T = a.useMemo(() => Ge, [Ge]);
  return /* @__PURE__ */ u.jsx(nl.Provider, { value: oo, children: /* @__PURE__ */ u.jsx(ol.Provider, { value: A, children: /* @__PURE__ */ u.jsx(rl.Provider, { value: T, children: /* @__PURE__ */ u.jsx(hr.Provider, { value: r, children: o }) }) }) });
}
function sg(e) {
  const { data: t, state: n } = bt(), o = a.useMemo(() => {
    if (!e) return !1;
    const i = t.columns.find((s) => s.type === "checkbox")?.id;
    if (i) {
      const s = t.columns.findIndex((c) => c.id === i), l = t.columns[s + 1]?.id;
      return e === l;
    } else
      return e === t.columns[0]?.id;
  }, [e, t.columns]), r = a.useMemo(() => {
    const i = n.allColumns, s = i.find((l) => l.type === "checkbox")?.id;
    if (s) {
      const l = i.findIndex((c) => c.id === s);
      return i[l + 1]?.id;
    } else
      return i[0]?.id;
  }, [n.allColumns]);
  return { isFirstDataColumn: o, firstDataColumnId: r };
}
function ig({
  columnId: e,
  isFirstDataColumn: t,
  groupColumnId: n,
  readOnly: o,
  onEdit: r,
  onHideManager: i,
  onDimension: s
}) {
  const { actions: l } = bt(), { close: c } = a.useContext(Ie), d = a.useId();
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "header-cell-menu", "data-slot-id": d, children: [
    !o && /* @__PURE__ */ u.jsxs(ke, { size: "base", onClick: r, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-edit" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "编辑列" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(ke, { size: "base", closeOnClick: !0, onClick: () => e && l.hideColumn(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列" })
    ] }),
    /* @__PURE__ */ u.jsx(dt, {}),
    /* @__PURE__ */ u.jsxs(ke, { size: "base", closeOnClick: !0, onClick: () => e && l.setGroupColumn(n === e ? null : e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: n === e ? "取消分组" : "设为分组" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(ke, { size: "base", closeOnClick: !0, onClick: () => e && l.insertColumnLeft(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-left" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向左插入列" })
    ] }),
    !o && /* @__PURE__ */ u.jsxs(ke, { size: "base", closeOnClick: !0, onClick: () => e && l.insertColumnRight(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-right" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向右插入列" })
    ] }),
    /* @__PURE__ */ u.jsx(dt, {}),
    t && /* @__PURE__ */ u.jsxs(ke, { size: "base", onClick: i, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列管理" })
    ] }),
    !o && t && /* @__PURE__ */ u.jsxs(ke, { size: "base", onClick: s, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-view" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "行列数管理" })
    ] }),
    t && /* @__PURE__ */ u.jsxs(ke, { size: "base", onClick: () => {
      c(), setTimeout(() => l.toggleReadOnly(), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: o ? "#icon-book-open" : "#icon-book-open-filled" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: o ? "编辑模式" : "只读模式" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(ke, { size: "base", closeOnClick: !0, onClick: () => e && l.freezeColumns(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-column" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "冻结到此列" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(dt, {}),
      /* @__PURE__ */ u.jsxs(
        ke,
        {
          size: "base",
          closeOnClick: !0,
          onClick: () => e && l.deleteColumn(e),
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
function ag({ size: e, fields: t }) {
  const n = a.useContext(Ie), o = e ?? n.size, r = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5"
  }[o], i = a.useRef(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ u.jsx(u.Fragment, { children: t.map((s, l) => /* @__PURE__ */ u.jsxs(a.Fragment, { children: [
    s.label && /* @__PURE__ */ u.jsx(Yt, { children: s.label }),
    s.type === "input" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsx(
      qe,
      {
        variant: "basic",
        size: o,
        value: s.value,
        defaultValue: s.defaultValue,
        onChange: (c) => s.onChange?.(c.target.value),
        placeholder: s.placeholder,
        autoFocus: s.autoFocus,
        onFocus: s.selectOnFocus ? (c) => {
          i.current.has(l) || (i.current.add(l), c.target.select());
        } : void 0,
        className: "w-full"
      }
    ) }),
    s.type === "select" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsxs(zp, { value: s.value, onValueChange: s.onChange, size: o, children: [
      /* @__PURE__ */ u.jsx(Fp, { variant: "basic", className: "w-full", children: /* @__PURE__ */ u.jsx(Bp, { placeholder: s.placeholder }) }),
      /* @__PURE__ */ u.jsx(Wp, { children: s.options?.map((c) => /* @__PURE__ */ u.jsx(Vp, { value: c.value, children: c.label }, c.value)) })
    ] }) }),
    s.type === "content" && /* @__PURE__ */ u.jsx(
      lg,
      {
        field: s,
        paddingClass: r,
        size: o
      }
    )
  ] }, l)) });
}
function lg({ field: e, paddingClass: t }) {
  const n = e.selectOptions ?? [], [o, r] = a.useState(null), [i, s] = a.useState(null), l = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, c = () => {
    const v = {
      value: l(),
      label: ""
    };
    e.onSelectOptionsChange?.([...n, v]);
  }, d = (v) => {
    const m = n.filter((x, b) => b !== v);
    e.onSelectOptionsChange?.(m);
  }, f = (v, m) => {
    const x = n.map(
      (b, w) => w === v ? { ...b, label: m } : b
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
      ge,
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
        className: cg(
          "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
          i === m && "bg-brand-1",
          o === m && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ u.jsx(
            ge,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-move",
              className: "shrink-0 cursor-grab text-black-55"
            }
          ),
          /* @__PURE__ */ u.jsx(
            qe,
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
            ge,
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
function cg(...e) {
  return e.filter(Boolean).join(" ");
}
function ug({
  columnId: e,
  value: t,
  currentColumnType: n,
  currentColumnDef: o,
  onClose: r
}) {
  const { actions: i } = bt(), { close: s } = a.useContext(Ie), l = a.useId(), [c, d] = a.useState(String(t)), [f, p] = a.useState("text"), [g, h] = a.useState([]);
  a.useEffect(() => {
    d(String(t)), p(n), o?.options ? n === "select" && h(o.options.items ?? []) : h([]);
  }, [t, n, o]);
  const v = () => {
    if (c !== String(t) && e && i.updateColumnTitle(e, c), e && f !== n && i.updateColumnType(e, f), e) {
      const m = {};
      if (f === "select") {
        const x = g.filter((b) => b.label.trim());
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
      "data-slot-id": l,
      onKeyDown: (m) => {
        m.key === "Enter" && (m.preventDefault(), v()), m.key === "Escape" && (m.preventDefault(), r());
      },
      children: [
        /* @__PURE__ */ u.jsx(
          ag,
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
        /* @__PURE__ */ u.jsx(dt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ge, { variant: "outline", size: "base", className: "flex-1", onClick: r, children: "取消" }),
          /* @__PURE__ */ u.jsx(ge, { variant: "primary", size: "base", className: "flex-1", onClick: v, children: "保存" })
        ] })
      ]
    }
  );
}
function dg({ firstDataColumnId: e }) {
  const { state: t, actions: n } = bt(), o = a.useId(), r = t.allColumns.find((s) => s.type === "checkbox"), i = r ? t.hiddenColumns.has(r.id) : !1;
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "hide-column-view", "data-slot-id": o, children: [
    r && /* @__PURE__ */ u.jsxs(
      ke,
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
      const l = t.hiddenColumns.has(s.id);
      return /* @__PURE__ */ u.jsxs(
        ke,
        {
          size: "base",
          closeOnClick: !1,
          onClick: () => n.toggleColumnVisibility(s.id),
          children: [
            /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: l ? "#icon-browse-off" : "#icon-browse" }) }),
            /* @__PURE__ */ u.jsx("span", { children: s.title || s.id })
          ]
        },
        s.id
      );
    })
  ] });
}
function fg() {
  const { data: e, state: t, actions: n } = bt(), { close: o } = a.useContext(Ie), r = a.useId(), i = e.rows.length, s = a.useMemo(() => t.allColumns.some((k) => k.type === "checkbox") ? 1 : 0, [t.allColumns]), l = t.allColumns.length - s, [c, d] = a.useState(String(i)), [f, p] = a.useState(String(l)), g = (C) => Math.max(1, Math.min(100, C)), h = (C) => Math.max(2, Math.min(100, C)), v = (C) => {
    d(C);
  }, m = (C) => {
    p(C);
  }, x = () => {
    (c === "" || c === void 0) && d(String(i));
  }, b = () => {
    (f === "" || f === void 0) && p(String(l));
  }, w = () => {
    const C = g(parseInt(c) || i), k = h(parseInt(f) || l);
    n.setDimension(C, k), o();
  }, y = () => {
    o();
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "header-cell-dimension",
      "data-slot-id": r,
      onKeyDown: (C) => {
        C.key === "Enter" && (C.preventDefault(), w()), C.key === "Escape" && (C.preventDefault(), y());
      },
      children: [
        /* @__PURE__ */ u.jsx(Yt, { children: "行数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          qe,
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
        /* @__PURE__ */ u.jsx(Yt, { children: "列数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          qe,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: f,
            onChange: (C) => m(C.target.value),
            onFocus: (C) => C.target.select(),
            onBlur: b,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(dt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ge, { variant: "outline", size: "base", className: "flex-1", onClick: y, children: "取消" }),
          /* @__PURE__ */ u.jsx(ge, { variant: "primary", size: "base", className: "flex-1", onClick: w, children: "保存" })
        ] })
      ]
    }
  );
}
const sl = Se("flex flex-col relative", {
  variants: {
    variant: {
      base: "border border-neutral-2 bg-white-100",
      plain: ""
    }
  },
  defaultVariants: {
    variant: "base"
  }
});
function il({ children: e, className: t, onDoubleClick: n }) {
  const o = a.useRef(null), [r, i] = a.useState(!1);
  return a.useEffect(() => {
    o.current && i(o.current.scrollWidth > o.current.clientWidth);
  }, [e]), r ? /* @__PURE__ */ u.jsxs(sr, { children: [
    /* @__PURE__ */ u.jsx(ir, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: o,
        className: t,
        onDoubleClick: n,
        children: e
      }
    ) }),
    /* @__PURE__ */ u.jsx(ar, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: e }) })
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
function pg({ cellId: e, value: t, columnId: n, currentColumnType: o, editView: r, setEditView: i, hideColumnView: s, setHideColumnView: l, dimensionView: c, setDimensionView: d, onDoubleClickTitle: f }) {
  const p = eo(), g = Qn(), h = Qt(), { close: v, isOpen: m } = a.useContext(Ie), { isFirstDataColumn: x, firstDataColumnId: b } = sg(n), w = n ? h.columnMap?.get(n) : void 0;
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      il,
      {
        className: "truncate cursor-pointer flex-1",
        onDoubleClick: f,
        children: String(t)
      }
    ),
    /* @__PURE__ */ u.jsx(ur, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      ge,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-chevron-down",
        className: ne(
          "transition-opacity",
          m ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        ),
        onClick: (y) => {
          y.stopPropagation(), p.selectedColumnId === n && g.selectColumn(null), p.lockedCellId && g.lockCell(null);
        },
        onDoubleClick: (y) => y.stopPropagation()
      }
    ) }),
    /* @__PURE__ */ u.jsx(dr, { align: "end", alignOffset: -8, sideOffset: 8, className: "w-[200px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (y) => y.stopPropagation(), onDoubleClick: (y) => y.stopPropagation(), onMouseDown: (y) => y.stopPropagation(), children: [
      !r && !s && !c && /* @__PURE__ */ u.jsx(
        ig,
        {
          columnId: n,
          isFirstDataColumn: x,
          groupColumnId: p.groupColumnId,
          readOnly: p.readOnly,
          onEdit: () => i(!0),
          onHideManager: () => l(!0),
          onDimension: () => d(!0)
        }
      ),
      r && /* @__PURE__ */ u.jsx(
        ug,
        {
          columnId: n,
          value: t,
          currentColumnType: o,
          currentColumnDef: w,
          onClose: v
        }
      ),
      s && /* @__PURE__ */ u.jsx(dg, { firstDataColumnId: b }),
      c && /* @__PURE__ */ u.jsx(fg, {})
    ] }) })
  ] });
}
function mg({ cellId: e, value: t, columnId: n }) {
  const o = Qt(), [r, i] = a.useState(!1), [s, l] = a.useState(!1), [c, d] = a.useState(!1), [f, p] = a.useState(!1), g = a.useContext(al), h = n ? o.columnMap?.get(n)?.type ?? "text" : "text", v = (x) => {
    p(x), x && (i(!1), l(!1), d(!1)), g && (g.current = x);
  }, m = () => {
    g && (g.current = !0), p(!0), i(!0);
  };
  return /* @__PURE__ */ u.jsx(cr, { open: f, onOpenChange: v, children: /* @__PURE__ */ u.jsx(
    pg,
    {
      cellId: e,
      value: t,
      columnId: n,
      currentColumnType: h,
      editView: r,
      setEditView: i,
      hideColumnView: s,
      setHideColumnView: l,
      dimensionView: c,
      setDimensionView: d,
      onDoubleClickTitle: m
    }
  ) });
}
function hg({ cellId: e, type: t, value: n, rowId: o, isHeader: r, columnId: i, rowIndex: s, cellOptions: l, isCellHovering: c }) {
  const d = eo(), f = Qn(), p = Qt(), g = a.useContext(hr), [h, v] = a.useState(!1);
  if (r && t === "checkbox") {
    const k = h || d.selectAll;
    return /* @__PURE__ */ u.jsx(
      "div",
      {
        className: "flex items-center justify-center w-full h-full",
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1),
        children: k ? /* @__PURE__ */ u.jsx(
          Co,
          {
            checked: d.selectAll,
            onChange: () => f.toggleSelectAll()
          }
        ) : /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-25", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-vcell-logo" }) })
      }
    );
  }
  if (r)
    return /* @__PURE__ */ u.jsx(mg, { cellId: e, value: n, columnId: i });
  if (t === "checkbox") {
    const k = o ? d.selectedRows.has(o) : !1, N = c || k;
    return /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: N ? /* @__PURE__ */ u.jsx(
      Co,
      {
        checked: k,
        onChange: () => {
          o && f.toggleRowSelect(o);
        }
      }
    ) : /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-25", children: s ?? 1 }) });
  }
  const m = g[t || "text"] || el, x = i ? p.columnMap?.get(i) : void 0, b = l ? { ...x?.options, ...l } : x?.options, w = d.lockedCellId === e, C = (o ? p.rows.find((k) => k.id === o) : void 0)?.cells.find((k) => k.id === e);
  return /* @__PURE__ */ u.jsx(
    m,
    {
      value: n,
      cellId: e,
      rowId: o,
      columnId: i,
      onChange: (k) => f.updateCellValue(e, k),
      isEditing: d.editingCellId === e,
      isLocked: w,
      isCellHovering: c,
      readOnly: d.readOnly,
      onStartEdit: () => f.startEdit(e, String(n)),
      onLockCell: () => f.lockCell(e),
      options: b,
      cellData: C,
      editingValue: d.editingValue,
      onUpdateEditingValue: f.updateEditingValue,
      onFinishEdit: f.finishEdit,
      onCancelEdit: f.cancelEdit,
      onUpdateColumnOptions: (k) => f.updateColumnOptions(i, k)
    }
  );
}
const xo = a.memo(function({ row: t, isHeader: n, isLastRow: o, columnIds: r, rowIndex: i, onCellResizeStart: s, onCellHoverEdge: l, onHeaderCellClick: c, onHeaderCellMouseDown: d, draggingColumnId: f, onCellHover: p, hoveringCellId: g, onBodyCellClick: h, frozenOffsets: v = {}, frozenWidth: m = 0, rowWidth: x, style: b, groupColumnId: w, hasOverflow: y }) {
  const C = eo(), k = Qt(), N = Qn(), E = !n && C.selectedRows.has(t.id), R = x ?? t.cells.reduce((z, M, D) => {
    const Y = r?.[D] ?? M.id, W = k.columns[D], Z = M.width === "auto" ? 40 : M.width ?? (W?.width === "auto" ? 40 : W?.width ?? 80), J = C.columnWidths[Y] ?? Z;
    return z + J;
  }, 0);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "row",
      "data-slot-id": t.id,
      className: ne(
        "flex border-b border-neutral-2",
        E && "bg-brand-1"
      ),
      style: b ?? { minWidth: `${R}px`, width: n && !C.readOnly ? "100%" : `${R}px` },
      children: [
        t.cells.map((z, M) => {
          const D = r?.[M] ?? z.id, Y = k.columns[M], W = z.type ?? Y?.type ?? "text", Z = z.width ?? Y?.width ?? 80, J = Z === "auto" ? 40 : Z, V = C.columnWidths[D] ?? J, G = C.frozenColumns.has(D), H = v[D] ?? 0, Q = G && H + V === m, $ = !n && C.editingCellId === z.id && W === "text", P = C.selectedColumnId === D, K = !n && C.lockedCellId === z.id, q = !n && g === z.id, se = n ? P ? "headerSelected" : "header" : $ ? "editing" : K ? "locked" : E || P ? "selected" : q && !C.readOnly ? "defaultHover" : "default", oe = n && P && !G && !f, ie = n && f && f === C.selectedColumnId;
          return /* @__PURE__ */ u.jsx(
            ct,
            {
              columnId: D,
              "data-cell-id": n ? void 0 : z.id,
              width: V,
              variant: se,
              isLastCell: !1,
              resizable: n && W !== "checkbox",
              onResizeStart: s ? (_, te) => s(D, _, te) : void 0,
              onHoverEdge: l ? (_) => l(_ ? D : null) : void 0,
              onClick: n && W !== "checkbox" && c ? (_) => c(D, W, _) : !n && W !== "checkbox" && h ? (_) => h(z.id, _) : void 0,
              onMouseEnter: !n && p ? () => p(z.id) : void 0,
              onMouseLeave: !n && p ? () => p(null) : void 0,
              onMouseDown: n && W !== "checkbox" && !G && P && d ? (_) => d(D, _) : void 0,
              slotClassName: n && W === "text" ? "justify-between" : W === "checkbox" ? "justify-center" : void 0,
              className: ne(
                n && W === "text" && "group",
                G && "sticky",
                n && G && "z-20",
                n && G && "top-0",
                !n && G && "z-10",
                Q && y && "shadow-[2px_0_4px_-2px_var(--black-10)]",
                // 光标
                oe && "cursor-grab",
                ie && "cursor-grabbing",
                // 分组模式下分组列的表头顶部描边
                n && w && D === w && "border-t-2 border-neutral-2",
                // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
                C.readOnly && M === t.cells.length - 1 && "!border-r-0"
              ),
              style: G ? { left: H } : void 0,
              children: /* @__PURE__ */ u.jsx(
                hg,
                {
                  cellId: z.id,
                  type: W,
                  value: z.value,
                  rowId: n ? void 0 : t.id,
                  isHeader: n,
                  columnId: D,
                  rowIndex: i,
                  cellOptions: z.options,
                  isCellHovering: q
                }
              )
            },
            z.id
          );
        }),
        n && !C.readOnly && /* @__PURE__ */ u.jsx(
          ct,
          {
            variant: "header",
            isLastCell: !0,
            className: "flex-1 min-w-[40px] cursor-pointer",
            onClick: () => {
              const z = r[r.length - 1];
              z && N.insertColumnRight(z);
            },
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(ge, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        )
      ]
    }
  );
}, (e, t) => e.row === t.row && e.isHeader === t.isHeader && e.columnIds === t.columnIds && e.rowIndex === t.rowIndex && e.hoveringCellId === t.hoveringCellId && e.draggingColumnId === t.draggingColumnId && e.onCellResizeStart === t.onCellResizeStart && e.onCellHoverEdge === t.onCellHoverEdge && e.onHeaderCellClick === t.onHeaderCellClick && e.onHeaderCellMouseDown === t.onHeaderCellMouseDown && e.onCellHover === t.onCellHover && e.onBodyCellClick === t.onBodyCellClick && e.frozenOffsets === t.frozenOffsets && e.frozenWidth === t.frozenWidth && e.rowWidth === t.rowWidth && e.groupColumnId === t.groupColumnId && e.hasOverflow === t.hasOverflow);
function gg({ groupValue: e, rowCount: t, frozenWidth: n, rowWidth: o, checkboxWidth: r, frozenNonCheckboxWidth: i, isCollapsed: s, isGroupSelected: l, onToggle: c, onGroupSelect: d, groupColumnId: f, isCheckboxHidden: p, hasOverflow: g }) {
  const { state: h, actions: v } = bt(), m = `group-header-${e}`, x = h.editingCellId === m, [b, w] = a.useState(null), y = () => {
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
            className: ne(
              "sticky left-0 z-10 flex bg-white-100",
              g && "shadow-[2px_0_4px_-2px_var(--black-10)]"
            ),
            style: { width: `${C}px` },
            children: [
              !p && /* @__PURE__ */ u.jsx(
                ct,
                {
                  width: r,
                  isLastCell: !1,
                  variant: !h.readOnly && b === "checkbox" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && w("checkbox"),
                  onMouseLeave: () => w(null),
                  children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ u.jsx(Co, { checked: l, onChange: d }) })
                }
              ),
              i > 0 && /* @__PURE__ */ u.jsx(
                ct,
                {
                  width: i,
                  isLastCell: !1,
                  variant: x ? "editing" : !h.readOnly && b === "title" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && w("title"),
                  onMouseLeave: () => w(null),
                  children: /* @__PURE__ */ u.jsxs("div", { className: "relative flex items-center justify-between w-full h-6", children: [
                    x ? /* @__PURE__ */ u.jsx(
                      "input",
                      {
                        type: "text",
                        value: h.editingValue,
                        onChange: (k) => v.updateEditingValue(k.target.value),
                        onBlur: y,
                        onKeyDown: (k) => {
                          k.key === "Enter" && y(), k.key === "Escape" && v.cancelEdit();
                        },
                        onFocus: (k) => k.target.select(),
                        className: "absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden",
                        autoFocus: !0
                      }
                    ) : /* @__PURE__ */ u.jsx(
                      il,
                      {
                        className: ne(
                          "text-sm truncate",
                          !h.readOnly && "cursor-pointer",
                          e ? "font-medium text-black-85" : "font-normal text-black-25"
                        ),
                        onDoubleClick: h.readOnly ? void 0 : () => v.startEdit(m, e),
                        children: e || "空值组"
                      }
                    ),
                    !x && /* @__PURE__ */ u.jsx(
                      ge,
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
        /* @__PURE__ */ u.jsx(ct, { variant: "default", isLastCell: h.readOnly, className: "flex-1", children: "" })
      ]
    }
  );
}
function cs({ rowWidth: e, showBorder: t, isHovering: n, onHoverChange: o, onInsert: r, frozenWidth: i, checkboxWidth: s, isCheckboxHidden: l }) {
  const c = l ? i - s : i, d = a.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "insert-row",
      "data-slot-id": d,
      className: ne(
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
          ct,
          {
            width: c,
            variant: "default",
            isLastCell: !0,
            className: "sticky left-0 z-10 bg-transparent cursor-pointer",
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(ge, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        ),
        /* @__PURE__ */ u.jsx(ct, { variant: "default", isLastCell: !1, className: "flex-1 cursor-pointer bg-transparent", children: "" })
      ]
    }
  );
}
function Tg({ className: e, variant: t, radius: n, data: o, cellRenderers: r, readOnly: i, contained: s = !1, ...l }) {
  const c = s ? sl({ variant: t, radius: n }) : "", d = s ? "plain" : t, f = s ? "none" : n, p = /* @__PURE__ */ u.jsx(vg, { className: e, variant: d, radius: f, ...l });
  return /* @__PURE__ */ u.jsx(rg, { data: o, cellRenderers: r, readOnly: i, children: s ? /* @__PURE__ */ u.jsx("div", { className: ne("min-h-0 overflow-auto overscroll-none w-fit max-w-full", c), children: p }) : p });
}
const al = a.createContext(null);
function vg({
  className: e,
  variant: t,
  radius: n,
  slotId: o,
  ...r
}) {
  const { data: i, state: s, actions: l } = bt(), c = a.useId(), [d, f] = a.useState(null), [p, g] = a.useState(null), [h, v] = a.useState(null), [m, x] = a.useState(null), [b, w] = a.useState(null), [y, C] = a.useState(0), [k, N] = a.useState(0), E = a.useRef(null), [R, z] = a.useState(null), [M, D] = a.useState(null), [Y, W] = a.useState(null), [Z, J] = a.useState(0), [V, G] = a.useState(!1), H = a.useRef(0), Q = a.useRef(null), $ = a.useRef(null), P = a.useRef(!1), K = a.useRef(!1), q = i.columns.map((A) => A.id), se = {
    id: "header",
    cells: i.columns.map((A) => ({
      id: A.id,
      type: A.type === "checkbox" ? "checkbox" : "text",
      // 表头始终用 text（除 checkbox）
      value: A.type === "checkbox" ? !1 : A.title ?? "",
      width: A.width
    }))
  }, oe = q.reduce((A, T) => A + (s.columnWidths[T] ?? 80), 0), ie = q.reduce((A, T) => s.frozenColumns.has(T) ? A + (s.columnWidths[T] ?? 80) : A, 0), _ = s.allColumns.find((A) => A.type === "checkbox")?.id, te = _ ? s.columnWidths[_] ?? 40 : 40, ee = _ ? s.hiddenColumns.has(_) : !0, ue = q.reduce((A, T) => s.frozenColumns.has(T) && T !== _ ? A + (s.columnWidths[T] ?? 80) : A, 0), ce = a.useMemo(() => {
    const A = {};
    let T = 0;
    return q.forEach((S) => {
      s.frozenColumns.has(S) && (A[S] = T, T += s.columnWidths[S] ?? 80);
    }), A;
  }, [q, s.frozenColumns, s.columnWidths]), re = a.useMemo(() => {
    if (!s.groupColumnId) return null;
    const A = s.allColumns.findIndex((j) => j.id === s.groupColumnId);
    if (A === -1) return null;
    const T = [], S = /* @__PURE__ */ new Map(), I = i.allRows ?? i.rows, O = /* @__PURE__ */ new Map();
    return i.rows.forEach((j) => O.set(j.id, j)), I.forEach((j) => {
      const L = String(j.cells[A]?.value ?? "");
      S.has(L) || S.set(L, []);
      const F = O.get(j.id);
      F && S.get(L).push(F);
    }), S.forEach((j, L) => {
      T.push({ groupValue: L, rows: j });
    }), T.sort((j, L) => !j.groupValue && L.groupValue ? 1 : j.groupValue && !L.groupValue ? -1 : 0), T;
  }, [s.groupColumnId, s.allColumns, i.allRows, i.rows]), ve = a.useMemo(() => {
    const A = b || d;
    if (!A) return 0;
    let T = 0;
    for (const S of q) {
      const I = s.columnWidths[S] ?? 80;
      if (S === A)
        return T + I;
      T += I;
    }
    return T;
  }, [b, d, q, s.columnWidths]), be = a.useMemo(() => {
    if (!M || !Y) return 0;
    let A = 0;
    for (const T of q) {
      const S = s.columnWidths[T] ?? 80;
      if (T === M)
        return Y === "left" ? A : A + S;
      A += S;
    }
    return A;
  }, [M, Y, q, s.columnWidths]), rt = R ? s.columnWidths[R] ?? 80 : 0, Ge = (A, T, S) => {
    E.current && (clearTimeout(E.current), E.current = null), w(A), f(null), C(S), N(T);
  }, st = a.useCallback((A) => {
    A ? (E.current && clearTimeout(E.current), E.current = setTimeout(() => {
      f(A), E.current = null;
    }, 200)) : (E.current && (clearTimeout(E.current), E.current = null), f(null));
  }, []);
  a.useEffect(() => {
    if (!b) return;
    const A = (S) => {
      const I = S.clientX - y, O = Math.max(40, k + I);
      l.updateColumnWidth(b, O);
    }, T = () => {
      w(null);
    };
    return document.addEventListener("mousemove", A), document.addEventListener("mouseup", T), () => {
      document.removeEventListener("mousemove", A), document.removeEventListener("mouseup", T);
    };
  }, [b, y, k, l]);
  const to = a.useCallback((A, T, S) => {
    S.stopPropagation(), s.selectedColumnId !== A && l.selectColumn(A);
  }, [l, s.selectedColumnId]), $t = a.useRef(null), Lt = a.useCallback((A, T) => {
    if (s.selectedColumnId !== A || s.frozenColumns.has(A)) return;
    T.preventDefault(), T.stopPropagation(), H.current = T.clientX;
    const S = (j) => {
      if (Math.abs(j.clientX - H.current) >= 4) {
        O();
        const F = Le.current?.getBoundingClientRect();
        if (F) {
          const X = s.columnWidths[A] ?? 80;
          J(j.clientX - F.left - X / 2);
        }
        z(A);
      }
    }, I = () => {
      O();
    }, O = () => {
      document.removeEventListener("mousemove", S), document.removeEventListener("mouseup", I), $t.current = null;
    };
    $t.current = O, document.addEventListener("mousemove", S), document.addEventListener("mouseup", I);
  }, [s.selectedColumnId, s.frozenColumns]);
  a.useEffect(() => () => {
    $t.current?.();
  }, []), a.useEffect(() => {
    if (!R) return;
    const A = s.columnWidths[R] ?? 80;
    Q.current = null, $.current = null, G(!0);
    const T = q.findIndex((O) => O === R), S = (O) => {
      const j = Le.current?.getBoundingClientRect();
      if (!j) return;
      const L = O.clientX - j.left;
      J(L - A / 2);
      const F = O.clientX - j.left + (Le.current?.scrollLeft ?? 0);
      let X = 0, le = null, fe = null;
      for (const de of q) {
        const he = s.columnWidths[de] ?? 80, Pe = X + he / 2;
        if (F >= X && F < X + he) {
          le = de, fe = F < Pe ? "left" : "right";
          break;
        }
        X += he;
      }
      (() => {
        if (!le || s.frozenColumns.has(le) || le === R) return !1;
        if (T === -1) return !0;
        const de = q.findIndex((he) => he === le);
        return !(de === T + 1 && fe === "left" || de === T - 1 && fe === "right");
      })() ? (D(le), W(fe), Q.current = le, $.current = fe) : (D(null), W(null), Q.current = null, $.current = null);
    }, I = () => {
      Q.current && $.current && Q.current !== R && l.moveColumnOrder(R, Q.current, $.current), z(null), D(null), W(null), G(!1), Q.current = null, $.current = null, P.current = !0;
    };
    return document.addEventListener("mousemove", S), document.addEventListener("mouseup", I), () => {
      document.removeEventListener("mousemove", S), document.removeEventListener("mouseup", I);
    };
  }, [R, q, s.columnWidths, s.frozenColumns, l]);
  const no = a.useCallback(() => {
    if (P.current) {
      P.current = !1;
      return;
    }
    K.current || (l.selectColumn(null), l.lockCell(null));
  }, [l]), en = a.useCallback((A, T) => {
    s.readOnly || (T.stopPropagation(), T.target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) || l.lockCell(A);
  }, [l, s.readOnly]), wt = a.useCallback(() => {
    if (!s.lockedCellId) return null;
    const A = s.groupColumnId ? re?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (let T = 0; T < A.length; T++) {
      const S = A[T];
      if (S) {
        for (let I = 0; I < S.cells.length; I++)
          if (S.cells[I]?.id === s.lockedCellId)
            return { rowIndex: T, colIndex: I, rowId: S.id };
      }
    }
    return null;
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, re, i.rows]), it = a.useCallback((A) => {
    const T = wt();
    if (!T) return;
    const S = s.groupColumnId ? re?.flatMap((L) => s.collapsedGroups.has(L.groupValue) ? [] : L.rows) ?? i.rows : i.rows;
    let I = T.rowIndex, O = T.colIndex;
    if (A === "ArrowLeft" || A === "ArrowRight") {
      const L = A === "ArrowLeft" ? -1 : 1, F = (S[T.rowIndex]?.cells.length ?? 1) - 1;
      let X = T.colIndex + L;
      for (; X >= 0 && X <= F; ) {
        const le = S[T.rowIndex]?.cells[X];
        if (le && le.type !== "checkbox") {
          O = X;
          break;
        }
        X += L;
      }
    } else
      switch (A) {
        case "ArrowUp":
          I = Math.max(0, T.rowIndex - 1);
          break;
        case "ArrowDown":
          I = Math.min(S.length - 1, T.rowIndex + 1);
          break;
      }
    if (I === T.rowIndex && O === T.colIndex) return;
    const j = S[I]?.cells[O];
    j && j.type !== "checkbox" && l.lockCell(j.id);
  }, [wt, s.groupColumnId, s.collapsedGroups, re, i.rows, l]), zt = a.useCallback(() => {
    if (!s.lockedCellId) return null;
    const A = s.groupColumnId ? re?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (const T of A)
      for (const S of T.cells)
        if (S.id === s.lockedCellId)
          return S.type ?? "text";
    return null;
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, re, i.rows]), tn = a.useCallback(() => {
    if (!s.lockedCellId) return "";
    const A = s.groupColumnId ? re?.flatMap((T) => s.collapsedGroups.has(T.groupValue) ? [] : T.rows) ?? i.rows : i.rows;
    for (const T of A)
      for (const S of T.cells)
        if (S.id === s.lockedCellId)
          return String(S.value ?? "");
    return "";
  }, [s.lockedCellId, s.groupColumnId, s.collapsedGroups, re, i.rows]);
  a.useEffect(() => {
    if (!s.lockedCellId) return;
    const A = (T) => {
      const S = document.activeElement, I = S.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]');
      if (I && T.key !== "Escape" && T.key !== "Enter")
        return;
      if (I && T.key === "Enter" && zt() === "input") {
        T.preventDefault && T.preventDefault(), S.blur && S.blur();
        const L = s.groupColumnId ? re?.flatMap((X) => s.collapsedGroups.has(X.groupValue) ? [] : X.rows) ?? i.rows : i.rows, F = wt();
        F && F.rowIndex === L.length - 1 ? l.lockCell(null) : it("ArrowDown");
        return;
      }
      if (s.editingCellId) {
        if (T.key === "Enter") {
          T.preventDefault(), l.finishEdit();
          const j = s.groupColumnId ? re?.flatMap((F) => s.collapsedGroups.has(F.groupValue) ? [] : F.rows) ?? i.rows : i.rows, L = wt();
          L && L.rowIndex === j.length - 1 ? l.lockCell(null) : it("ArrowDown");
          return;
        }
        if (T.key === "Escape") {
          T.preventDefault(), l.cancelEdit();
          return;
        }
        return;
      }
      if (T.key === "Escape") {
        l.lockCell(null);
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(T.key)) {
        T.preventDefault(), it(T.key);
        return;
      }
      if (T.key === "Tab") {
        T.preventDefault(), it(T.shiftKey ? "ArrowLeft" : "ArrowRight");
        return;
      }
      const O = zt();
      if (O === "input" && !s.readOnly && (T.key === "Enter" || T.key.length === 1 && !T.ctrlKey && !T.metaKey)) {
        T.preventDefault();
        const j = document.querySelector(`[data-cell-id="${s.lockedCellId}"]`);
        if (j) {
          const L = j.querySelector("input");
          L && (L.focus(), T.key.length === 1 && T.key !== "Enter" && setTimeout(() => {
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set?.call(L, T.key), L.dispatchEvent(new Event("input", { bubbles: !0 }));
          }, 0));
        }
        return;
      }
      if (T.key === "Enter" && !s.readOnly) {
        if (O === "text" || O === "editable") {
          const j = tn();
          l.startEdit(s.lockedCellId, j);
        }
        return;
      }
      if (T.key.length === 1 && !T.ctrlKey && !T.metaKey && !s.readOnly) {
        (O === "text" || O === "editable") && l.startEdit(s.lockedCellId, T.key);
        return;
      }
      if ((T.key === "Backspace" || T.key === "Delete") && !s.readOnly) {
        (O === "text" || O === "editable") && l.startEdit(s.lockedCellId, "");
        return;
      }
    };
    return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
  }, [s.lockedCellId, s.editingCellId, l, it, zt, tn]);
  const Le = a.useRef(null), [nn, oo] = a.useState(0), [ze, Ft] = a.useState(!1);
  return a.useEffect(() => {
    const A = Le.current?.parentElement;
    if (!A) return;
    const T = () => oo(A.scrollLeft);
    return A.addEventListener("scroll", T), T(), () => A.removeEventListener("scroll", T);
  }, []), a.useEffect(() => {
    const A = Le.current, T = A?.parentElement;
    if (!A || !T) return;
    const S = new ResizeObserver(() => {
      Ft(A.scrollWidth > T.clientWidth);
    });
    return S.observe(A), S.observe(T), Ft(A.scrollWidth > T.clientWidth), () => S.disconnect();
  }, []), a.useEffect(() => {
    if (!s.selectedColumnId && !s.lockedCellId) return;
    let A = !1;
    const T = (I) => {
      if (K.current) return;
      A = Le.current?.contains(I.target) ?? !1, I.target.closest('[data-slot="popover-content"], [data-slot="tooltip-content"]') && (A = !0);
    }, S = () => {
      if (!K.current) {
        if (A) {
          A = !1;
          return;
        }
        l.selectColumn(null), l.lockCell(null), A = !1;
      }
    };
    return document.addEventListener("pointerdown", T), document.addEventListener("pointerup", S), () => {
      document.removeEventListener("pointerdown", T), document.removeEventListener("pointerup", S);
    };
  }, [s.selectedColumnId, s.lockedCellId, l]), /* @__PURE__ */ u.jsx(al.Provider, { value: K, children: /* @__PURE__ */ u.jsxs(
    "div",
    {
      ref: Le,
      "data-slot": "data-table",
      "data-slot-id": o ?? c,
      "data-resizing": b || R ? "true" : void 0,
      className: ne(
        sl({ variant: t, radius: n }),
        s.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
        e
      ),
      onClick: no,
      ...r,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: "sticky top-0 z-20", children: /* @__PURE__ */ u.jsx("div", { className: "relative", children: /* @__PURE__ */ u.jsx(
          xo,
          {
            row: se,
            isHeader: !0,
            columnIds: q,
            onCellResizeStart: Ge,
            onCellHoverEdge: st,
            onHeaderCellClick: to,
            onHeaderCellMouseDown: Lt,
            draggingColumnId: R,
            frozenOffsets: ce,
            frozenWidth: ie,
            rowWidth: oe,
            groupColumnId: s.groupColumnId ?? void 0,
            hasOverflow: ze
          }
        ) }) }),
        /* @__PURE__ */ u.jsx("div", { className: re || s.readOnly ? "pb-3" : void 0, children: re ? (
          // 分组渲染（每组序号独立计算）
          re.map((A, T) => {
            const S = s.collapsedGroups.has(A.groupValue), I = A.rows.every((O) => s.selectedRows.has(O.id));
            return /* @__PURE__ */ u.jsxs(a.Fragment, { children: [
              /* @__PURE__ */ u.jsx(
                gg,
                {
                  groupValue: A.groupValue,
                  rowCount: A.rows.length,
                  frozenWidth: ie,
                  rowWidth: oe,
                  checkboxWidth: te,
                  frozenNonCheckboxWidth: ue,
                  isCollapsed: S,
                  isGroupSelected: I,
                  onToggle: () => l.toggleGroupCollapse(A.groupValue),
                  onGroupSelect: () => l.toggleGroupSelect(A.groupValue, A.rows),
                  groupColumnId: s.groupColumnId,
                  isCheckboxHidden: ee,
                  hasOverflow: ze
                }
              ),
              !S && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                A.rows.map((O, j) => /* @__PURE__ */ u.jsx(
                  xo,
                  {
                    row: O,
                    columnIds: q,
                    rowIndex: j + 1,
                    isLastRow: j === A.rows.length - 1 && T === re.length - 1,
                    hoveringCellId: p,
                    onCellHover: g,
                    onBodyCellClick: en,
                    frozenOffsets: ce,
                    frozenWidth: ie,
                    rowWidth: oe,
                    hasOverflow: ze
                  },
                  O.id
                )),
                !s.readOnly && /* @__PURE__ */ u.jsx(
                  cs,
                  {
                    rowWidth: oe,
                    showBorder: !0,
                    isHovering: h?.groupValue === A.groupValue,
                    onHoverChange: (O) => v(O ? { groupValue: A.groupValue, cell: "add" } : null),
                    onInsert: () => s.groupColumnId && l.insertRowInGroup(A.groupValue, s.groupColumnId),
                    frozenWidth: ie,
                    checkboxWidth: te,
                    isCheckboxHidden: ee
                  }
                )
              ] })
            ] }, A.groupValue);
          })
        ) : (
          // 普通渲染
          /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            i.rows.map((A, T) => /* @__PURE__ */ u.jsx(
              xo,
              {
                row: A,
                columnIds: q,
                rowIndex: T + 1,
                isLastRow: !1,
                hoveringCellId: p,
                onCellHover: g,
                onBodyCellClick: en,
                frozenOffsets: ce,
                frozenWidth: ie,
                rowWidth: oe,
                hasOverflow: ze
              },
              A.id
            )),
            !s.readOnly && /* @__PURE__ */ u.jsx(
              cs,
              {
                rowWidth: oe,
                showBorder: !1,
                isHovering: m !== null,
                onHoverChange: (A) => x(A ? "add" : null),
                onInsert: () => l.insertRow(),
                frozenWidth: ie,
                checkboxWidth: te,
                isCheckboxHidden: ee
              }
            )
          ] })
        ) }),
        (d || b) && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${s.frozenColumns.has(d || b || "") ? ve + nn : ve}px`
            }
          }
        ),
        R && M && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${s.frozenColumns.has(M) ? be + nn : be}px`
            }
          }
        ),
        R && V && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none",
            style: {
              left: `${Z}px`,
              width: `${rt}px`
            }
          }
        )
      ]
    }
  ) });
}
export {
  ge as Button,
  ct as Cell,
  Eg as CellSlot,
  Co as Checkbox,
  Tg as DataTable,
  qe as Input,
  Rg as NavigationItem,
  zp as Select,
  Wp as SelectContent,
  Vp as SelectItem,
  Fp as SelectTrigger,
  Bp as SelectValue,
  kg as Table,
  wg as Tabs,
  Sg as TabsContent,
  jn as TabsContext,
  yg as TabsList,
  Cg as TabsTrigger,
  ic as buttonVariants,
  Tu as cellVariants,
  Ou as checkboxVariants,
  ne as cn,
  sl as dataTableVariants,
  cc as inputVariants,
  Hp as navigationItemVariants,
  Lp as selectTriggerVariants,
  Gs as slotVariants,
  Up as tableVariants,
  ku as tabsListVariants,
  Pu as tabsTriggerVariants
};
//# sourceMappingURL=index.js.map
