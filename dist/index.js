import * as i from "react";
import it, { useLayoutEffect as Al, useState as jl } from "react";
import * as qt from "react-dom";
import Ol from "react-dom";
function js(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = js(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function Os() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = js(e)) && (o && (o += " "), o += t);
  return o;
}
const _l = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    n[o] = e[o];
  for (let o = 0; o < t.length; o++)
    n[e.length + o] = t[o];
  return n;
}, Dl = (e, t) => ({
  classGroupId: e,
  validator: t
}), _s = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), Fn = "-", Lr = [], Ml = "arbitrary..", $l = (e) => {
  const t = zl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return Ll(a);
      const c = a.split(Fn), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Ds(c, l, t);
    },
    getConflictingClassGroupIds: (a, c) => {
      if (c) {
        const l = o[a], u = n[a];
        return l ? u ? _l(u, l) : l : u || Lr;
      }
      return n[a] || Lr;
    }
  };
}, Ds = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const r = e[t], s = n.nextPart.get(r);
  if (s) {
    const u = Ds(e, t + 1, s);
    if (u) return u;
  }
  const a = n.validators;
  if (a === null)
    return;
  const c = t === 0 ? e.join(Fn) : e.slice(t).join(Fn), l = a.length;
  for (let u = 0; u < l; u++) {
    const f = a[u];
    if (f.validator(c))
      return f.classGroupId;
  }
}, Ll = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), o = t.slice(0, n);
  return o ? Ml + o : void 0;
})(), zl = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Fl(n, t);
}, Fl = (e, t) => {
  const n = _s();
  for (const o in e) {
    const r = e[o];
    sr(r, n, o, t);
  }
  return n;
}, sr = (e, t, n, o) => {
  const r = e.length;
  for (let s = 0; s < r; s++) {
    const a = e[s];
    Vl(a, t, n, o);
  }
}, Vl = (e, t, n, o) => {
  if (typeof e == "string") {
    Wl(e, t, n);
    return;
  }
  if (typeof e == "function") {
    Hl(e, t, n, o);
    return;
  }
  Bl(e, t, n, o);
}, Wl = (e, t, n) => {
  const o = e === "" ? t : Ms(t, e);
  o.classGroupId = n;
}, Hl = (e, t, n, o) => {
  if (Ul(e)) {
    sr(e(o), t, n, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Dl(n, e));
}, Bl = (e, t, n, o) => {
  const r = Object.entries(e), s = r.length;
  for (let a = 0; a < s; a++) {
    const [c, l] = r[a];
    sr(l, Ms(t, c), n, o);
  }
}, Ms = (e, t) => {
  let n = e;
  const o = t.split(Fn), r = o.length;
  for (let s = 0; s < r; s++) {
    const a = o[s];
    let c = n.nextPart.get(a);
    c || (c = _s(), n.nextPart.set(a, c)), n = c;
  }
  return n;
}, Ul = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Gl = (e) => {
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
}, Wo = "!", zr = ":", Kl = [], Fr = (e, t, n, o, r) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: o,
  isExternal: r
}), Yl = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, c = 0, l = 0, u;
    const f = r.length;
    for (let g = 0; g < f; g++) {
      const v = r[g];
      if (a === 0 && c === 0) {
        if (v === zr) {
          s.push(r.slice(l, g)), l = g + 1;
          continue;
        }
        if (v === "/") {
          u = g;
          continue;
        }
      }
      v === "[" ? a++ : v === "]" ? a-- : v === "(" ? c++ : v === ")" && c--;
    }
    const p = s.length === 0 ? r : r.slice(l);
    let m = p, h = !1;
    p.endsWith(Wo) ? (m = p.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Wo) && (m = p.slice(1), h = !0)
    );
    const x = u && u > l ? u - l : void 0;
    return Fr(s, h, m, x);
  };
  if (t) {
    const r = t + zr, s = o;
    o = (a) => a.startsWith(r) ? s(a.slice(r.length)) : Fr(Kl, !1, a, void 0, !0);
  }
  if (n) {
    const r = o;
    o = (s) => n({
      className: s,
      parseClassName: r
    });
  }
  return o;
}, Xl = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, o) => {
    t.set(n, 1e6 + o);
  }), (n) => {
    const o = [];
    let r = [];
    for (let s = 0; s < n.length; s++) {
      const a = n[s], c = a[0] === "[", l = t.has(a);
      c || l ? (r.length > 0 && (r.sort(), o.push(...r), r = []), o.push(a)) : r.push(a);
    }
    return r.length > 0 && (r.sort(), o.push(...r)), o;
  };
}, ql = (e) => ({
  cache: Gl(e.cacheSize),
  parseClassName: Yl(e),
  sortModifiers: Xl(e),
  postfixLookupClassGroupIds: Zl(e),
  ...$l(e)
}), Zl = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let o = 0; o < n.length; o++)
      t[n[o]] = !0;
  return t;
}, Jl = /\s+/, Ql = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s,
    postfixLookupClassGroupIds: a
  } = t, c = [], l = e.trim().split(Jl);
  let u = "";
  for (let f = l.length - 1; f >= 0; f -= 1) {
    const p = l[f], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: x,
      baseClassName: g,
      maybePostfixModifierPosition: v
    } = n(p);
    if (m) {
      u = p + (u.length > 0 ? " " + u : u);
      continue;
    }
    let C = !!v, b;
    if (C) {
      const R = g.substring(0, v);
      b = o(R);
      const k = b && a[b] ? o(g) : void 0;
      k && k !== b && (b = k, C = !1);
    } else
      b = o(g);
    if (!b) {
      if (!C) {
        u = p + (u.length > 0 ? " " + u : u);
        continue;
      }
      if (b = o(g), !b) {
        u = p + (u.length > 0 ? " " + u : u);
        continue;
      }
      C = !1;
    }
    const w = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), y = x ? w + Wo : w, E = y + b;
    if (c.indexOf(E) > -1)
      continue;
    c.push(E);
    const I = r(b, C);
    for (let R = 0; R < I.length; ++R) {
      const k = I[R];
      c.push(y + k);
    }
    u = p + (u.length > 0 ? " " + u : u);
  }
  return u;
}, ec = (...e) => {
  let t = 0, n, o, r = "";
  for (; t < e.length; )
    (n = e[t++]) && (o = $s(n)) && (r && (r += " "), r += o);
  return r;
}, $s = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = $s(e[o])) && (n && (n += " "), n += t);
  return n;
}, tc = (e, ...t) => {
  let n, o, r, s;
  const a = (l) => {
    const u = t.reduce((f, p) => p(f), e());
    return n = ql(u), o = n.cache.get, r = n.cache.set, s = c, c(l);
  }, c = (l) => {
    const u = o(l);
    if (u)
      return u;
    const f = Ql(l, n);
    return r(l, f), f;
  };
  return s = a, (...l) => s(ec(...l));
}, nc = [], Ae = (e) => {
  const t = (n) => n[e] || nc;
  return t.isThemeGetter = !0, t;
}, Ls = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, zs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, oc = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, rc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, sc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ic = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ac = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, lc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rt = (e) => oc.test(e), ge = (e) => !!e && !Number.isNaN(Number(e)), He = (e) => !!e && Number.isInteger(Number(e)), Io = (e) => e.endsWith("%") && ge(e.slice(0, -1)), Ye = (e) => rc.test(e), Fs = () => !0, cc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  sc.test(e) && !ic.test(e)
), ir = () => !1, uc = (e) => ac.test(e), dc = (e) => lc.test(e), fc = (e) => !G(e) && !Y(e), pc = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), mc = (e) => pt(e, Hs, ir), G = (e) => Ls.test(e), bt = (e) => pt(e, Bs, cc), Vr = (e) => pt(e, yc, ge), hc = (e) => pt(e, Gs, Fs), gc = (e) => pt(e, Us, ir), Wr = (e) => pt(e, Vs, ir), vc = (e) => pt(e, Ws, dc), Sn = (e) => pt(e, Ks, uc), Y = (e) => zs.test(e), rn = (e) => Tt(e, Bs), xc = (e) => Tt(e, Us), Hr = (e) => Tt(e, Vs), bc = (e) => Tt(e, Hs), wc = (e) => Tt(e, Ws), En = (e) => Tt(e, Ks, !0), Cc = (e) => Tt(e, Gs, !0), pt = (e, t, n) => {
  const o = Ls.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Tt = (e, t, n = !1) => {
  const o = zs.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Vs = (e) => e === "position" || e === "percentage", Ws = (e) => e === "image" || e === "url", Hs = (e) => e === "length" || e === "size" || e === "bg-size", Bs = (e) => e === "length", yc = (e) => e === "number", Us = (e) => e === "family-name", Gs = (e) => e === "number" || e === "weight", Ks = (e) => e === "shadow", Sc = () => {
  const e = Ae("color"), t = Ae("font"), n = Ae("text"), o = Ae("font-weight"), r = Ae("tracking"), s = Ae("leading"), a = Ae("breakpoint"), c = Ae("container"), l = Ae("spacing"), u = Ae("radius"), f = Ae("shadow"), p = Ae("inset-shadow"), m = Ae("text-shadow"), h = Ae("drop-shadow"), x = Ae("blur"), g = Ae("perspective"), v = Ae("aspect"), C = Ae("ease"), b = Ae("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], E = () => [...y(), Y, G], I = () => ["auto", "hidden", "clip", "visible", "scroll"], R = () => ["auto", "contain", "none"], k = () => [Y, G, l], z = () => [rt, "full", "auto", ...k()], T = () => [He, "none", "subgrid", Y, G], L = () => ["auto", {
    span: ["full", He, Y, G]
  }, He, Y, G], X = () => [He, "auto", Y, G], H = () => ["auto", "min", "max", "fr", Y, G], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], re = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...k()], K = () => [rt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], B = () => [rt, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...k()], ie = () => [rt, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...k()], M = () => [e, Y, G], P = () => [...y(), Hr, Wr, {
    position: [Y, G]
  }], J = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], de = () => ["auto", "cover", "contain", bc, mc, {
    size: [Y, G]
  }], ce = () => [Io, rn, bt], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    Y,
    G
  ], ue = () => ["", ge, rn, bt], $ = () => ["solid", "dashed", "dotted", "double"], ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], te = () => [ge, Io, Hr, Wr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    x,
    Y,
    G
  ], ve = () => ["none", ge, Y, G], ye = () => ["none", ge, Y, G], Ie = () => [ge, Y, G], be = () => [rt, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ye],
      breakpoint: [Ye],
      color: [Fs],
      container: [Ye],
      "drop-shadow": [Ye],
      ease: ["in", "out", "in-out"],
      font: [fc],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ye],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ye],
      shadow: [Ye],
      spacing: ["px", ge],
      text: [Ye],
      "text-shadow": [Ye],
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
        aspect: ["auto", "square", rt, G, Y, v]
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
        "@container": ["", "normal", "size", Y, G]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [pc],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ge, G, Y, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
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
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: R()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": R()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": R()
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
        z: [He, "auto", Y, G]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [rt, "full", "auto", c, ...k()]
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
        flex: [ge, rt, "auto", "initial", "none", G]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ge, Y, G]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ge, Y, G]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [He, "first", "last", "none", Y, G]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: L()
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
        "grid-rows": T()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: L()
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
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
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
        "justify-items": [...re(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...re()]
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
        items: [...re(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...re(), {
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
        "place-items": [...re(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...re()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: k()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: U()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: U()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: U()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: U()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: U()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: U()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: U()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: U()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: U()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: U()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: U()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": k()
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
        "space-y": k()
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
        size: K()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...B()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...B()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...B()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...ie()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ie()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ie()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...K()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...K()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...K()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...K()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...K()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, rn, bt]
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
        font: [o, Cc, hc]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Io, G]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [xc, gc, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [G]
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
        tracking: [r, Y, G]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ge, "none", Y, Vr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Y, G]
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
        list: ["disc", "decimal", "none", Y, G]
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
        placeholder: M()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: M()
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
        decoration: [...$(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ge, "from-font", "auto", Y, bt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: M()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ge, "auto", Y, G]
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
        indent: k()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [He, Y, G]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Y, G]
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
        content: ["none", Y, G]
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
        bg: J()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: de()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, He, Y, G],
          radial: ["", Y, G],
          conic: [He, Y, G]
        }, wc, vc]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: M()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ce()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ce()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ce()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: M()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: M()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: M()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ee()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ee()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ee()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ee()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ee()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ee()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ee()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ee()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ee()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ee()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ee()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ee()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ee()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ee()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ee()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ue()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ue()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ue()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ue()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ue()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ue()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ue()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ue()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ue()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ue()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ue()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ue()
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
        "divide-y": ue()
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
        border: [...$(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...$(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: M()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": M()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": M()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": M()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": M()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": M()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": M()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": M()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": M()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": M()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": M()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: M()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...$(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ge, Y, G]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ge, rn, bt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: M()
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
          En,
          Sn
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: M()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", p, En, Sn]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": M()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ue()
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
        ring: M()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ge, bt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": M()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ue()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": M()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, En, Sn]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": M()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ge, Y, G]
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
        "mask-linear": [ge]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": te()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": te()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": M()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": M()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": te()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": te()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": M()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": M()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": te()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": te()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": M()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": M()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": te()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": te()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": M()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": M()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": te()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": te()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": M()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": M()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": te()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": te()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": M()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": M()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": te()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": te()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": M()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": M()
      }],
      "mask-image-radial": [{
        "mask-radial": [Y, G]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": te()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": te()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": M()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": M()
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
        "mask-radial-at": y()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ge]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": te()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": te()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": M()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": M()
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
        mask: J()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: de()
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
        mask: ["none", Y, G]
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
          Y,
          G
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: pe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ge, Y, G]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ge, Y, G]
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
          En,
          Sn
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": M()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ge, Y, G]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ge, Y, G]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ge, Y, G]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ge, Y, G]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ge, Y, G]
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
          Y,
          G
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": pe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ge, Y, G]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ge, Y, G]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ge, Y, G]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ge, Y, G]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ge, Y, G]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ge, Y, G]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ge, Y, G]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ge, Y, G]
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
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", Y, G]
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
        duration: [ge, "initial", Y, G]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", C, Y, G]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ge, Y, G]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, Y, G]
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
        perspective: [g, Y, G]
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
        rotate: ve()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ve()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ve()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ve()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ye()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ye()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ye()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ye()
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
        skew: Ie()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ie()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ie()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [Y, G, "", "none", "gpu", "cpu"]
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
        zoom: [He, Y, G]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: M()
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
        caret: M()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Y, G]
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
        "scrollbar-thumb": M()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": M()
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
        "scroll-m": k()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": k()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": k()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
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
        "will-change": ["auto", "scroll", "contents", "transform", Y, G]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...M()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ge, rn, bt, Vr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...M()]
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
}, Ec = /* @__PURE__ */ tc(Sc);
function oe(...e) {
  return Ec(Os(e));
}
var Rn = { exports: {} }, sn = {};
var Br;
function Rc() {
  if (Br) return sn;
  Br = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, s) {
    var a = null;
    if (s !== void 0 && (a = "" + s), r.key !== void 0 && (a = "" + r.key), "key" in r) {
      s = {};
      for (var c in r)
        c !== "key" && (s[c] = r[c]);
    } else s = r;
    return r = s.ref, {
      $$typeof: e,
      type: o,
      key: a,
      ref: r !== void 0 ? r : null,
      props: s
    };
  }
  return sn.Fragment = t, sn.jsx = n, sn.jsxs = n, sn;
}
var an = {};
var Ur;
function kc() {
  return Ur || (Ur = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(P) {
      if (P == null) return null;
      if (typeof P == "function")
        return P.$$typeof === L ? null : P.displayName || P.name || null;
      if (typeof P == "string") return P;
      switch (P) {
        case v:
          return "Fragment";
        case b:
          return "Profiler";
        case C:
          return "StrictMode";
        case I:
          return "Suspense";
        case R:
          return "SuspenseList";
        case T:
          return "Activity";
      }
      if (typeof P == "object")
        switch (typeof P.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), P.$$typeof) {
          case g:
            return "Portal";
          case y:
            return P.displayName || "Context";
          case w:
            return (P._context.displayName || "Context") + ".Consumer";
          case E:
            var J = P.render;
            return P = P.displayName, P || (P = J.displayName || J.name || "", P = P !== "" ? "ForwardRef(" + P + ")" : "ForwardRef"), P;
          case k:
            return J = P.displayName || null, J !== null ? J : e(P.type) || "Memo";
          case z:
            J = P._payload, P = P._init;
            try {
              return e(P(J));
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
        var J = !1;
      } catch {
        J = !0;
      }
      if (J) {
        J = console;
        var de = J.error, ce = typeof Symbol == "function" && Symbol.toStringTag && P[Symbol.toStringTag] || P.constructor.name || "Object";
        return de.call(
          J,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ce
        ), t(P);
      }
    }
    function o(P) {
      if (P === v) return "<>";
      if (typeof P == "object" && P !== null && P.$$typeof === z)
        return "<...>";
      try {
        var J = e(P);
        return J ? "<" + J + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var P = X.A;
      return P === null ? null : P.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function a(P) {
      if (H.call(P, "key")) {
        var J = Object.getOwnPropertyDescriptor(P, "key").get;
        if (J && J.isReactWarning) return !1;
      }
      return P.key !== void 0;
    }
    function c(P, J) {
      function de() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          J
        ));
      }
      de.isReactWarning = !0, Object.defineProperty(P, "key", {
        get: de,
        configurable: !0
      });
    }
    function l() {
      var P = e(this.type);
      return K[P] || (K[P] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), P = this.props.ref, P !== void 0 ? P : null;
    }
    function u(P, J, de, ce, ee, ue) {
      var $ = de.ref;
      return P = {
        $$typeof: x,
        type: P,
        key: J,
        props: de,
        _owner: ce
      }, ($ !== void 0 ? $ : null) !== null ? Object.defineProperty(P, "ref", {
        enumerable: !1,
        get: l
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
        value: ee
      }), Object.defineProperty(P, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ue
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    }
    function f(P, J, de, ce, ee, ue) {
      var $ = J.children;
      if ($ !== void 0)
        if (ce)
          if (Q($)) {
            for (ce = 0; ce < $.length; ce++)
              p($[ce]);
            Object.freeze && Object.freeze($);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p($);
      if (H.call(J, "key")) {
        $ = e(P);
        var ne = Object.keys(J).filter(function(pe) {
          return pe !== "key";
        });
        ce = 0 < ne.length ? "{key: someKey, " + ne.join(": ..., ") + ": ...}" : "{key: someKey}", M[$ + ce] || (ne = 0 < ne.length ? "{" + ne.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ce,
          $,
          ne,
          $
        ), M[$ + ce] = !0);
      }
      if ($ = null, de !== void 0 && (n(de), $ = "" + de), a(J) && (n(J.key), $ = "" + J.key), "key" in J) {
        de = {};
        for (var te in J)
          te !== "key" && (de[te] = J[te]);
      } else de = J;
      return $ && c(
        de,
        typeof P == "function" ? P.displayName || P.name || "Unknown" : P
      ), u(
        P,
        $,
        de,
        r(),
        ee,
        ue
      );
    }
    function p(P) {
      m(P) ? P._store && (P._store.validated = 1) : typeof P == "object" && P !== null && P.$$typeof === z && (P._payload.status === "fulfilled" ? m(P._payload.value) && P._payload.value._store && (P._payload.value._store.validated = 1) : P._store && (P._store.validated = 1));
    }
    function m(P) {
      return typeof P == "object" && P !== null && P.$$typeof === x;
    }
    var h = it, x = /* @__PURE__ */ Symbol.for("react.transitional.element"), g = /* @__PURE__ */ Symbol.for("react.portal"), v = /* @__PURE__ */ Symbol.for("react.fragment"), C = /* @__PURE__ */ Symbol.for("react.strict_mode"), b = /* @__PURE__ */ Symbol.for("react.profiler"), w = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), R = /* @__PURE__ */ Symbol.for("react.suspense_list"), k = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), L = /* @__PURE__ */ Symbol.for("react.client.reference"), X = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = Object.prototype.hasOwnProperty, Q = Array.isArray, re = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(P) {
        return P();
      }
    };
    var U, K = {}, B = h.react_stack_bottom_frame.bind(
      h,
      s
    )(), ie = re(o(s)), M = {};
    an.Fragment = v, an.jsx = function(P, J, de) {
      var ce = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        P,
        J,
        de,
        !1,
        ce ? Error("react-stack-top-frame") : B,
        ce ? re(o(P)) : ie
      );
    }, an.jsxs = function(P, J, de) {
      var ce = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        P,
        J,
        de,
        !0,
        ce ? Error("react-stack-top-frame") : B,
        ce ? re(o(P)) : ie
      );
    };
  })()), an;
}
var Gr;
function Pc() {
  return Gr || (Gr = 1, process.env.NODE_ENV === "production" ? Rn.exports = Rc() : Rn.exports = kc()), Rn.exports;
}
var d = Pc();
const Kr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Yr = Os, Oe = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Yr(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((u) => {
    const f = n?.[u], p = s?.[u];
    if (f === null) return null;
    const m = Kr(f) || Kr(p);
    return r[u][m];
  }), c = n && Object.entries(n).reduce((u, f) => {
    let [p, m] = f;
    return m === void 0 || (u[p] = m), u;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, f) => {
    let { class: p, className: m, ...h } = f;
    return Object.entries(h).every((x) => {
      let [g, v] = x;
      return Array.isArray(v) ? v.includes({
        ...s,
        ...c
      }[g]) : {
        ...s,
        ...c
      }[g] === v;
    }) ? [
      ...u,
      p,
      m
    ] : u;
  }, []);
  return Yr(e, a, l, n?.class, n?.className);
}, Ic = Oe(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-normal transition-all outline-none select-none cursor-pointer disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-5 text-white-90 hover:bg-brand-6 active:bg-brand-6 data-[state=open]:bg-brand-6",
        outline: "border-neutral-2 bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-1 data-[state=open]:bg-neutral-1",
        ghost: "bg-transparent text-black-85 hover:bg-black-5 active:bg-black-5 data-[state=open]:bg-black-5 border-0",
        destructive: "bg-error-1 text-error-5 hover:bg-error-2 active:bg-error-2 data-[state=open]:bg-error-2",
        link: "bg-transparent text-brand-5 hover:text-brand-6 active:text-brand-6 hover:underline underline-offset-4 border-0"
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
function Pe({
  className: e,
  variant: t,
  size: n,
  noShift: o,
  disabled: r,
  leftIcon: s,
  rightIcon: a,
  children: c,
  slotId: l,
  ...u
}) {
  const f = i.useId();
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      "data-slot": "button",
      "data-slot-id": l ?? f,
      disabled: r,
      className: oe(Ic({ variant: t, size: n, noShift: o, disabled: r, className: e })),
      ...u,
      children: [
        s && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${s}` }) }),
        c,
        a && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
const Tc = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Nc = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Ac = Oe(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: Tc,
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
), jc = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" }
};
function ut({ className: e, variant: t, size: n, noSpinner: o, disabled: r, leftIcon: s, rightIcon: a, slotId: c, ...l }) {
  const u = r || t === "disabled", p = jc[n ?? "base"], m = i.useId();
  return !s && !a ? /* @__PURE__ */ d.jsx(
    "input",
    {
      "data-slot": "input",
      "data-slot-id": c ?? m,
      disabled: u,
      className: oe(
        Ac({ variant: t, size: n, noSpinner: o }),
        u && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
        e
      ),
      ...l
    }
  ) : /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "input",
      "data-slot-id": c ?? m,
      className: oe(
        "flex items-center border bg-white-100 outline-none transition-all",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        Nc[t ?? "basic"],
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
            ...l
          }
        ),
        a && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
function To(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Oc(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: m, children: h, ...x } = p, g = m?.[e]?.[l] || c, v = i.useMemo(() => x, Object.values(x));
      return /* @__PURE__ */ d.jsx(g.Provider, { value: v, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, m) {
      const h = m?.[e]?.[l] || c, x = i.useContext(h);
      if (x) return x;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return r.scopeName = e, [o, _c(r, ...t)];
}
function _c(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Wt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Ys(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: m, children: h, ...x } = p, g = m?.[e]?.[l] || c, v = i.useMemo(() => x, Object.values(x));
      return /* @__PURE__ */ d.jsx(g.Provider, { value: v, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, m) {
      const h = m?.[e]?.[l] || c, x = i.useContext(h);
      if (x) return x;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return r.scopeName = e, [o, Dc(r, ...t)];
}
function Dc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...c, ...p };
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
function Mc(...e) {
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
function Vn(...e) {
  return i.useCallback(Mc(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ho(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    qr(r) && typeof kn == "function" && (r = kn(r._payload)), i.Children.forEach(r, (m) => {
      if (Vc(m)) {
        c = !0;
        const h = m;
        let x = "child" in h.props ? h.props.child : h.props.children;
        qr(x) && typeof kn == "function" && (x = kn(x._payload)), a = Lc(h, x), l.push(a?.props?.children);
      } else
        l.push(m);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? Fc(a) : void 0, f = Vn(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Uc(e) : Bc(e)
        );
      return r;
    }
    const p = zc(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var $c = /* @__PURE__ */ Symbol.for("radix.slottable"), Lc = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function zc(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...c) => {
      const l = s(...c);
      return r(...c), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Fc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Vc(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === $c;
}
var Wc = /* @__PURE__ */ Symbol.for("react.lazy");
function qr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Wc && "_payload" in e && Hc(e._payload);
}
function Hc(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Bc = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Uc = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, kn = i[" use ".trim().toString()];
function Gc(e) {
  const t = e + "CollectionProvider", [n, o] = Ys(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: v, children: C } = g, b = i.useRef(null), w = i.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ d.jsx(r, { scope: v, itemMap: w, collectionRef: b, children: C });
  };
  a.displayName = t;
  const c = e + "CollectionSlot", l = /* @__PURE__ */ Ho(c), u = i.forwardRef(
    (g, v) => {
      const { scope: C, children: b } = g, w = s(c, C), y = Vn(v, w.collectionRef);
      return /* @__PURE__ */ d.jsx(l, { ref: y, children: b });
    }
  );
  u.displayName = c;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ Ho(f), h = i.forwardRef(
    (g, v) => {
      const { scope: C, children: b, ...w } = g, y = i.useRef(null), E = Vn(v, y), I = s(f, C);
      return i.useEffect(() => (I.itemMap.set(y, { ref: y, ...w }), () => {
        I.itemMap.delete(y);
      })), /* @__PURE__ */ d.jsx(m, { [p]: "", ref: E, children: b });
    }
  );
  h.displayName = f;
  function x(g) {
    const v = s(e + "CollectionConsumer", g);
    return i.useCallback(() => {
      const b = v.collectionRef.current;
      if (!b) return [];
      const w = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(v.itemMap.values()).sort(
        (I, R) => w.indexOf(I.ref.current) - w.indexOf(R.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    x,
    o
  ];
}
var Xs = globalThis?.document ? i.useLayoutEffect : () => {
}, Kc = i[" useId ".trim().toString()] || (() => {
}), Yc = 0;
function Xc(e) {
  const [t, n] = i.useState(Kc());
  return Xs(() => {
    n((o) => o ?? String(Yc++));
  }, [e]), t ? `radix-${t}` : "";
}
var qc = [
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
], qs = qc.reduce((e, t) => {
  const n = /* @__PURE__ */ Ho(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Zc(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
var Jc = i[" useInsertionEffect ".trim().toString()] || Xs;
function Qc({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = eu({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== c && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (c) {
        const p = tu(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, u];
}
function eu({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Jc(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function tu(e) {
  return typeof e == "function";
}
var nu = i.createContext(void 0);
function ou(e) {
  const t = i.useContext(nu);
  return e || t || "ltr";
}
var No = "rovingFocusGroup.onEntryFocus", ru = { bubbles: !1, cancelable: !0 }, dn = "RovingFocusGroup", [Bo, Zs, su] = Gc(dn), [iu, Js] = Ys(
  dn,
  [su]
), [au, lu] = iu(dn), Qs = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(Bo.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d.jsx(Bo.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d.jsx(cu, { ...e, ref: t }) }) })
);
Qs.displayName = dn;
var cu = i.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: c,
    onCurrentTabStopIdChange: l,
    onEntryFocus: u,
    preventScrollOnEntryFocus: f = !1,
    ...p
  } = e, m = i.useRef(null), h = Vn(t, m), x = ou(s), [g, v] = Qc({
    prop: a,
    defaultProp: c ?? null,
    onChange: l,
    caller: dn
  }), [C, b] = i.useState(!1), w = Zc(u), y = Zs(n), E = i.useRef(!1), [I, R] = i.useState(0);
  return i.useEffect(() => {
    const k = m.current;
    if (k)
      return k.addEventListener(No, w), () => k.removeEventListener(No, w);
  }, [w]), /* @__PURE__ */ d.jsx(
    au,
    {
      scope: n,
      orientation: o,
      dir: x,
      loop: r,
      currentTabStopId: g,
      onItemFocus: i.useCallback(
        (k) => v(k),
        [v]
      ),
      onItemShiftTab: i.useCallback(() => b(!0), []),
      onFocusableItemAdd: i.useCallback(
        () => R((k) => k + 1),
        []
      ),
      onFocusableItemRemove: i.useCallback(
        () => R((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ d.jsx(
        qs.div,
        {
          tabIndex: C || I === 0 ? -1 : 0,
          "data-orientation": o,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: Wt(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: Wt(e.onFocus, (k) => {
            const z = !E.current;
            if (k.target === k.currentTarget && z && !C) {
              const T = new CustomEvent(No, ru);
              if (k.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const L = y().filter((U) => U.focusable), X = L.find((U) => U.active), H = L.find((U) => U.id === g), re = [X, H, ...L].filter(
                  Boolean
                ).map((U) => U.ref.current);
                ni(re, f);
              }
            }
            E.current = !1;
          }),
          onBlur: Wt(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), ei = "RovingFocusGroupItem", ti = i.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...c
    } = e, l = Xc(), u = s || l, f = lu(ei, n), p = f.currentTabStopId === u, m = Zs(n), { onFocusableItemAdd: h, onFocusableItemRemove: x, currentTabStopId: g } = f;
    return i.useEffect(() => {
      if (o)
        return h(), () => x();
    }, [o, h, x]), /* @__PURE__ */ d.jsx(
      Bo.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ d.jsx(
          qs.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": f.orientation,
            ...c,
            ref: t,
            onMouseDown: Wt(e.onMouseDown, (v) => {
              o ? f.onItemFocus(u) : v.preventDefault();
            }),
            onFocus: Wt(e.onFocus, () => f.onItemFocus(u)),
            onKeyDown: Wt(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const C = fu(v, f.orientation, f.dir);
              if (C !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let w = m().filter((y) => y.focusable).map((y) => y.ref.current);
                if (C === "last") w.reverse();
                else if (C === "prev" || C === "next") {
                  C === "prev" && w.reverse();
                  const y = w.indexOf(v.currentTarget);
                  w = f.loop ? pu(w, y + 1) : w.slice(y + 1);
                }
                setTimeout(() => ni(w));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: p, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
ti.displayName = ei;
var uu = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function du(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function fu(e, t, n) {
  const o = du(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return uu[o];
}
function ni(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function pu(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var mu = Qs, hu = ti, Wn = globalThis?.document ? i.useLayoutEffect : () => {
};
function gu(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var oi = (e) => {
  const { present: t, children: n } = e, o = vu(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = xu(o.ref, bu(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
oi.displayName = "Presence";
function vu(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = gu(a, {
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
    const u = Pn(o.current);
    s.current = c === "mounted" ? u : "none";
  }, [c]), Wn(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const m = s.current, h = Pn(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(f && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Wn(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const g = Pn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Pn(o.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Zr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function xu(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const c = Zr(a, n);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const c = s[a];
          typeof c == "function" ? c() : Zr(o[a], null);
        }
      };
  }, []);
}
function Pn(e) {
  return e?.animationName || "none";
}
function bu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Jr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function wu(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Jr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Jr(e[r], null);
        }
      };
  };
}
function Cu(...e) {
  return i.useCallback(wu(...e), e);
}
// @__NO_SIDE_EFFECTS__
function yu(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    Qr(r) && typeof In == "function" && (r = In(r._payload)), i.Children.forEach(r, (m) => {
      if (Pu(m)) {
        c = !0;
        const h = m;
        let x = "child" in h.props ? h.props.child : h.props.children;
        Qr(x) && typeof In == "function" && (x = In(x._payload)), a = Eu(h, x), l.push(a?.props?.children);
      } else
        l.push(m);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? ku(a) : void 0, f = Cu(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Au(e) : Nu(e)
        );
      return r;
    }
    const p = Ru(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Su = /* @__PURE__ */ Symbol.for("radix.slottable"), Eu = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function Ru(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...c) => {
      const l = s(...c);
      return r(...c), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function ku(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Pu(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Su;
}
var Iu = /* @__PURE__ */ Symbol.for("react.lazy");
function Qr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Iu && "_payload" in e && Tu(e._payload);
}
function Tu(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Nu = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Au = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, In = i[" use ".trim().toString()], ju = [
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
], qn = ju.reduce((e, t) => {
  const n = /* @__PURE__ */ yu(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), Ou = i.createContext(void 0);
function _u(e) {
  const t = i.useContext(Ou);
  return e || t || "ltr";
}
var Du = i[" useInsertionEffect ".trim().toString()] || Wn;
function Mu({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = $u({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== c && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (c) {
        const p = Lu(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, u];
}
function $u({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Du(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Lu(e) {
  return typeof e == "function";
}
var zu = i[" useId ".trim().toString()] || (() => {
}), Fu = 0;
function Vu(e) {
  const [t, n] = i.useState(zu());
  return Wn(() => {
    n((o) => o ?? String(Fu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Zn = "Tabs", [Wu] = Oc(Zn, [
  Js
]), ri = Js(), [Hu, ar] = Wu(Zn), si = i.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: o,
      onValueChange: r,
      defaultValue: s,
      orientation: a = "horizontal",
      dir: c,
      activationMode: l = "automatic",
      ...u
    } = e, f = _u(c), [p, m] = Mu({
      prop: o,
      onChange: r,
      defaultProp: s ?? "",
      caller: Zn
    });
    return /* @__PURE__ */ d.jsx(
      Hu,
      {
        scope: n,
        baseId: Vu(),
        value: p,
        onValueChange: m,
        orientation: a,
        dir: f,
        activationMode: l,
        children: /* @__PURE__ */ d.jsx(
          qn.div,
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
si.displayName = Zn;
var ii = "TabsList", ai = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e, s = ar(ii, n), a = ri(n);
    return /* @__PURE__ */ d.jsx(
      mu,
      {
        asChild: !0,
        ...a,
        orientation: s.orientation,
        dir: s.dir,
        loop: o,
        children: /* @__PURE__ */ d.jsx(
          qn.div,
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
ai.displayName = ii;
var li = "TabsTrigger", ci = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...s } = e, a = ar(li, n), c = ri(n), l = fi(a.baseId, o), u = pi(a.baseId, o), f = o === a.value;
    return /* @__PURE__ */ d.jsx(
      hu,
      {
        asChild: !0,
        ...c,
        focusable: !r,
        active: f,
        children: /* @__PURE__ */ d.jsx(
          qn.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": f,
            "aria-controls": u,
            "data-state": f ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: l,
            ...s,
            ref: t,
            onMouseDown: To(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? a.onValueChange(o) : p.preventDefault();
            }),
            onKeyDown: To(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && a.onValueChange(o);
            }),
            onFocus: To(e.onFocus, () => {
              const p = a.activationMode !== "manual";
              !f && !r && p && a.onValueChange(o);
            })
          }
        )
      }
    );
  }
);
ci.displayName = li;
var ui = "TabsContent", di = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: s, ...a } = e, c = ar(ui, n), l = fi(c.baseId, o), u = pi(c.baseId, o), f = o === c.value, p = i.useRef(f);
    return i.useEffect(() => {
      const m = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(m);
    }, []), /* @__PURE__ */ d.jsx(oi, { present: r || f, children: ({ present: m }) => /* @__PURE__ */ d.jsx(
      qn.div,
      {
        "data-state": f ? "active" : "inactive",
        "data-orientation": c.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !m,
        id: u,
        tabIndex: 0,
        ...a,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: m && s
      }
    ) });
  }
);
di.displayName = ui;
function fi(e, t) {
  return `${e}-trigger-${t}`;
}
function pi(e, t) {
  return `${e}-content-${t}`;
}
var Bu = si, Uu = ai, Gu = ci, Ku = di;
const Jn = i.createContext({ size: "base" });
function Gg({ className: e, size: t = "base", children: n, slotId: o, ...r }) {
  const s = i.useId();
  return /* @__PURE__ */ d.jsx(Jn.Provider, { value: { size: t }, children: /* @__PURE__ */ d.jsx(Bu, { "data-slot": "tabs", "data-slot-id": o ?? s, className: oe(e), ...r, children: n }) });
}
const Yu = Oe(
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
function Kg({ className: e, variant: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(Jn), s = i.useId();
  return /* @__PURE__ */ d.jsx(
    Uu,
    {
      "data-slot": "tabs-list",
      "data-slot-id": n ?? s,
      className: oe(Yu({ variant: t, size: r }), e),
      ...o
    }
  );
}
const Xu = Oe(
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
function Yg({ className: e, variant: t, disabled: n, ...o }) {
  const { size: r } = i.useContext(Jn);
  return /* @__PURE__ */ d.jsx(
    Gu,
    {
      "data-slot": "tabs-trigger",
      "data-slot-id": o.value,
      disabled: n,
      className: oe(Xu({ variant: t, size: r, disabled: n }), e),
      ...o
    }
  );
}
const qu = Oe(
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
function Xg({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(Jn), r = i.useId();
  return /* @__PURE__ */ d.jsx(
    Ku,
    {
      "data-slot": "tabs-content",
      "data-slot-id": t ?? r,
      className: oe(qu({ size: o }), e),
      ...n
    }
  );
}
const Zu = Oe(
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
), mi = Oe(
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
), yt = i.memo(function({ className: t, variant: n, width: o, columnId: r, children: s, isLastCell: a, resizable: c, onResizeStart: l, onHoverEdge: u, slotClassName: f, style: p, ...m }) {
  const h = i.useId(), x = i.useCallback((w) => {
    w.preventDefault(), w.stopPropagation(), l && l(o ?? 80, w.clientX);
  }, [l, o]), g = i.useCallback(() => {
    u?.(!0);
  }, [u]), v = i.useCallback(() => {
    u?.(!1);
  }, [u]), C = c && !a, b = i.useMemo(() => ({
    ...p,
    ...o ? { width: `${o}px`, minWidth: `${o}px` } : {}
  }), [p, o]);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "cell",
      "data-slot-id": r ?? h,
      className: oe(
        Zu({ variant: n, className: t }),
        !a && "border-r border-neutral-2"
      ),
      style: b,
      ...m,
      children: [
        /* @__PURE__ */ d.jsx("div", { className: oe(mi({ size: "base" }), f), children: s ?? /* @__PURE__ */ d.jsx("span", { className: "text-black-85", children: "文本单元格" }) }),
        C && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10",
            onMouseEnter: g,
            onMouseLeave: v,
            onMouseDown: x
          }
        )
      ]
    }
  );
}), qg = i.memo(function({
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
      className: oe(mi({ size: n, className: t })),
      ...s,
      children: o
    }
  );
}), Ju = Oe(
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
), Qu = Oe("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]"
    }
  },
  defaultVariants: { size: "base" }
}), ed = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2"
};
function Uo({
  className: e,
  checked: t = !1,
  disabled: n = !1,
  size: o = "base",
  onChange: r,
  children: s,
  slotId: a,
  ...c
}) {
  const l = n, u = i.useId();
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "checkbox",
      "data-slot-id": a ?? u,
      role: "checkbox",
      "aria-checked": t,
      tabIndex: l ? void 0 : 0,
      className: oe(
        "flex items-center",
        ed[o ?? "base"],
        !l && "cursor-pointer",
        l && "cursor-not-allowed",
        e
      ),
      onClick: () => !l && r?.(!t),
      ...c,
      children: [
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: oe(
              Ju({
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
                  Qu({ size: o }),
                  l ? "text-black-25" : "text-white-100"
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
function es(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Ee(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function td(e, t) {
  const n = i.createContext(t), o = (s) => {
    const { children: a, ...c } = s, l = i.useMemo(() => c, Object.values(c));
    return /* @__PURE__ */ d.jsx(n.Provider, { value: l, children: a });
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
function fn(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a), l = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: m, children: h, ...x } = p, g = m?.[e]?.[l] || c, v = i.useMemo(() => x, Object.values(x));
      return /* @__PURE__ */ d.jsx(g.Provider, { value: v, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, m) {
      const h = m?.[e]?.[l] || c, x = i.useContext(h);
      if (x) return x;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return r.scopeName = e, [o, nd(r, ...t)];
}
function nd(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function ts(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function hi(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = ts(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : ts(e[r], null);
        }
      };
  };
}
function Te(...e) {
  return i.useCallback(hi(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
  const t = /* @__PURE__ */ od(e), n = i.forwardRef((o, r) => {
    const { children: s, ...a } = o, c = i.Children.toArray(s), l = c.find(sd);
    if (l) {
      const u = l.props.children, f = c.map((p) => p === l ? i.Children.count(u) > 1 ? i.Children.only(null) : i.isValidElement(u) ? u.props.children : null : p);
      return /* @__PURE__ */ d.jsx(t, { ...a, ref: r, children: i.isValidElement(u) ? i.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ d.jsx(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function od(e) {
  const t = i.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (i.isValidElement(r)) {
      const a = ad(r), c = id(s, r.props);
      return r.type !== i.Fragment && (c.ref = o ? hi(o, a) : a), i.cloneElement(r, c);
    }
    return i.Children.count(r) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var rd = /* @__PURE__ */ Symbol("radix.slottable");
function sd(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === rd;
}
function id(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...c) => {
      const l = s(...c);
      return r(...c), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function ad(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function ld(e) {
  const t = e + "CollectionProvider", [n, o] = fn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: v, children: C } = g, b = it.useRef(null), w = it.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ d.jsx(r, { scope: v, itemMap: w, collectionRef: b, children: C });
  };
  a.displayName = t;
  const c = e + "CollectionSlot", l = /* @__PURE__ */ Ut(c), u = it.forwardRef(
    (g, v) => {
      const { scope: C, children: b } = g, w = s(c, C), y = Te(v, w.collectionRef);
      return /* @__PURE__ */ d.jsx(l, { ref: y, children: b });
    }
  );
  u.displayName = c;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ Ut(f), h = it.forwardRef(
    (g, v) => {
      const { scope: C, children: b, ...w } = g, y = it.useRef(null), E = Te(v, y), I = s(f, C);
      return it.useEffect(() => (I.itemMap.set(y, { ref: y, ...w }), () => {
        I.itemMap.delete(y);
      })), /* @__PURE__ */ d.jsx(m, { [p]: "", ref: E, children: b });
    }
  );
  h.displayName = f;
  function x(g) {
    const v = s(e + "CollectionConsumer", g);
    return it.useCallback(() => {
      const b = v.collectionRef.current;
      if (!b) return [];
      const w = Array.from(b.querySelectorAll(`[${p}]`));
      return Array.from(v.itemMap.values()).sort(
        (I, R) => w.indexOf(I.ref.current) - w.indexOf(R.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    x,
    o
  ];
}
var cd = i.createContext(void 0);
function ud(e) {
  const t = i.useContext(cd);
  return e || t || "ltr";
}
var dd = [
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
], ke = dd.reduce((e, t) => {
  const n = /* @__PURE__ */ Ut(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function fd(e, t) {
  e && qt.flushSync(() => e.dispatchEvent(t));
}
function Et(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
function pd(e, t = globalThis?.document) {
  const n = Et(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var md = "DismissableLayer", Go = "dismissableLayer.update", hd = "dismissableLayer.pointerDownOutside", gd = "dismissableLayer.focusOutside", ns, gi = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Qn = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: c,
      ...l
    } = e, u = i.useContext(gi), [f, p] = i.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, h] = i.useState({}), x = Te(t, (R) => p(R)), g = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), C = g.indexOf(v), b = f ? g.indexOf(f) : -1, w = u.layersWithOutsidePointerEventsDisabled.size > 0, y = b >= C, E = bd((R) => {
      const k = R.target, z = [...u.branches].some((T) => T.contains(k));
      !y || z || (r?.(R), a?.(R), R.defaultPrevented || c?.());
    }, m), I = wd((R) => {
      const k = R.target;
      [...u.branches].some((T) => T.contains(k)) || (s?.(R), a?.(R), R.defaultPrevented || c?.());
    }, m);
    return pd((R) => {
      b === u.layers.size - 1 && (o?.(R), !R.defaultPrevented && c && (R.preventDefault(), c()));
    }, m), i.useEffect(() => {
      if (f)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ns = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), os(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = ns);
        };
    }, [f, m, n, u]), i.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), os());
    }, [f, u]), i.useEffect(() => {
      const R = () => h({});
      return document.addEventListener(Go, R), () => document.removeEventListener(Go, R);
    }, []), /* @__PURE__ */ d.jsx(
      ke.div,
      {
        ...l,
        ref: x,
        style: {
          pointerEvents: w ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ee(e.onFocusCapture, I.onFocusCapture),
        onBlurCapture: Ee(e.onBlurCapture, I.onBlurCapture),
        onPointerDownCapture: Ee(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Qn.displayName = md;
var vd = "DismissableLayerBranch", xd = i.forwardRef((e, t) => {
  const n = i.useContext(gi), o = i.useRef(null), r = Te(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ d.jsx(ke.div, { ...e, ref: r });
});
xd.displayName = vd;
function bd(e, t = globalThis?.document) {
  const n = Et(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (c) => {
      if (c.target && !o.current) {
        let l = function() {
          vi(
            hd,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: c };
        c.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: !0 })) : l();
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
function wd(e, t = globalThis?.document) {
  const n = Et(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && vi(gd, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function os() {
  const e = new CustomEvent(Go);
  document.dispatchEvent(e);
}
function vi(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? fd(r, s) : r.dispatchEvent(s);
}
var Ao = 0;
function lr() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? rs()), document.body.insertAdjacentElement("beforeend", e[1] ?? rs()), Ao++, () => {
      Ao === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ao--;
    };
  }, []);
}
function rs() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var jo = "focusScope.autoFocusOnMount", Oo = "focusScope.autoFocusOnUnmount", ss = { bubbles: !1, cancelable: !0 }, Cd = "FocusScope", eo = i.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [c, l] = i.useState(null), u = Et(r), f = Et(s), p = i.useRef(null), m = Te(t, (g) => l(g)), h = i.useRef({
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
      let g = function(w) {
        if (h.paused || !c) return;
        const y = w.target;
        c.contains(y) ? p.current = y : at(p.current, { select: !0 });
      }, v = function(w) {
        if (h.paused || !c) return;
        const y = w.relatedTarget;
        y !== null && (c.contains(y) || at(p.current, { select: !0 }));
      }, C = function(w) {
        if (document.activeElement === document.body)
          for (const E of w)
            E.removedNodes.length > 0 && at(c);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", v);
      const b = new MutationObserver(C);
      return c && b.observe(c, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", v), b.disconnect();
      };
    }
  }, [o, c, h.paused]), i.useEffect(() => {
    if (c) {
      as.add(h);
      const g = document.activeElement;
      if (!c.contains(g)) {
        const C = new CustomEvent(jo, ss);
        c.addEventListener(jo, u), c.dispatchEvent(C), C.defaultPrevented || (yd(Pd(xi(c)), { select: !0 }), document.activeElement === g && at(c));
      }
      return () => {
        c.removeEventListener(jo, u), setTimeout(() => {
          const C = new CustomEvent(Oo, ss);
          c.addEventListener(Oo, f), c.dispatchEvent(C), C.defaultPrevented || at(g ?? document.body, { select: !0 }), c.removeEventListener(Oo, f), as.remove(h);
        }, 0);
      };
    }
  }, [c, u, f, h]);
  const x = i.useCallback(
    (g) => {
      if (!n && !o || h.paused) return;
      const v = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, C = document.activeElement;
      if (v && C) {
        const b = g.currentTarget, [w, y] = Sd(b);
        w && y ? !g.shiftKey && C === y ? (g.preventDefault(), n && at(w, { select: !0 })) : g.shiftKey && C === w && (g.preventDefault(), n && at(y, { select: !0 })) : C === b && g.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ d.jsx(ke.div, { tabIndex: -1, ...a, ref: m, onKeyDown: x });
});
eo.displayName = Cd;
function yd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (at(o, { select: t }), document.activeElement !== n) return;
}
function Sd(e) {
  const t = xi(e), n = is(t, e), o = is(t.reverse(), e);
  return [n, o];
}
function xi(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function is(e, t) {
  for (const n of e)
    if (!Ed(n, { upTo: t })) return n;
}
function Ed(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Rd(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function at(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Rd(e) && t && e.select();
  }
}
var as = kd();
function kd() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ls(e, t), e.unshift(t);
    },
    remove(t) {
      e = ls(e, t), e[0]?.resume();
    }
  };
}
function ls(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Pd(e) {
  return e.filter((t) => t.tagName !== "A");
}
var je = globalThis?.document ? i.useLayoutEffect : () => {
}, Id = i[" useId ".trim().toString()] || (() => {
}), Td = 0;
function St(e) {
  const [t, n] = i.useState(Id());
  return je(() => {
    n((o) => o ?? String(Td++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Nd = ["top", "right", "bottom", "left"], dt = Math.min, De = Math.max, Hn = Math.round, Tn = Math.floor, Ge = (e) => ({
  x: e,
  y: e
}), Ad = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ko(e, t, n) {
  return De(e, dt(t, n));
}
function Ze(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Je(e) {
  return e.split("-")[0];
}
function Zt(e) {
  return e.split("-")[1];
}
function cr(e) {
  return e === "x" ? "y" : "x";
}
function ur(e) {
  return e === "y" ? "height" : "width";
}
function Ue(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function dr(e) {
  return cr(Ue(e));
}
function jd(e, t, n) {
  n === void 0 && (n = !1);
  const o = Zt(e), r = dr(e), s = ur(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Bn(a)), [a, Bn(a)];
}
function Od(e) {
  const t = Bn(e);
  return [Yo(e), t, Yo(t)];
}
function Yo(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const cs = ["left", "right"], us = ["right", "left"], _d = ["top", "bottom"], Dd = ["bottom", "top"];
function Md(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? us : cs : t ? cs : us;
    case "left":
    case "right":
      return t ? _d : Dd;
    default:
      return [];
  }
}
function $d(e, t, n, o) {
  const r = Zt(e);
  let s = Md(Je(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(Yo)))), s;
}
function Bn(e) {
  const t = Je(e);
  return Ad[t] + e.slice(t.length);
}
function Ld(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function bi(e) {
  return typeof e != "number" ? Ld(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Un(e) {
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
function ds(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = Ue(t), a = dr(t), c = ur(a), l = Je(t), u = s === "y", f = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, m = o[c] / 2 - r[c] / 2;
  let h;
  switch (l) {
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
  switch (Zt(t)) {
    case "start":
      h[a] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += m * (n && u ? -1 : 1);
      break;
  }
  return h;
}
async function zd(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: a,
    elements: c,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = Ze(t, e), x = bi(h), v = c[m ? p === "floating" ? "reference" : "floating" : p], C = Un(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(v))) == null || n ? v : v.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: l
  })), b = p === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)), y = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Un(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: b,
    offsetParent: w,
    strategy: l
  }) : b);
  return {
    top: (C.top - E.top + x.top) / y.y,
    bottom: (E.bottom - C.bottom + x.bottom) / y.y,
    left: (C.left - E.left + x.left) / y.x,
    right: (E.right - C.right + x.right) / y.x
  };
}
const Fd = 50, Vd = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, c = a.detectOverflow ? a : {
    ...a,
    detectOverflow: zd
  }, l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: p
  } = ds(u, o, l), m = o, h = 0;
  const x = {};
  for (let g = 0; g < s.length; g++) {
    const v = s[g];
    if (!v)
      continue;
    const {
      name: C,
      fn: b
    } = v, {
      x: w,
      y,
      data: E,
      reset: I
    } = await b({
      x: f,
      y: p,
      initialPlacement: o,
      placement: m,
      strategy: r,
      middlewareData: x,
      rects: u,
      platform: c,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = w ?? f, p = y ?? p, x[C] = {
      ...x[C],
      ...E
    }, I && h < Fd && (h++, typeof I == "object" && (I.placement && (m = I.placement), I.rects && (u = I.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : I.rects), {
      x: f,
      y: p
    } = ds(u, m, l)), g = -1);
  }
  return {
    x: f,
    y: p,
    placement: m,
    strategy: r,
    middlewareData: x
  };
}, Wd = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: a,
      elements: c,
      middlewareData: l
    } = t, {
      element: u,
      padding: f = 0
    } = Ze(e, t) || {};
    if (u == null)
      return {};
    const p = bi(f), m = {
      x: n,
      y: o
    }, h = dr(r), x = ur(h), g = await a.getDimensions(u), v = h === "y", C = v ? "top" : "left", b = v ? "bottom" : "right", w = v ? "clientHeight" : "clientWidth", y = s.reference[x] + s.reference[h] - m[h] - s.floating[x], E = m[h] - s.reference[h], I = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let R = I ? I[w] : 0;
    (!R || !await (a.isElement == null ? void 0 : a.isElement(I))) && (R = c.floating[w] || s.floating[x]);
    const k = y / 2 - E / 2, z = R / 2 - g[x] / 2 - 1, T = dt(p[C], z), L = dt(p[b], z), X = T, H = R - g[x] - L, Q = R / 2 - g[x] / 2 + k, re = Ko(X, Q, H), U = !l.arrow && Zt(r) != null && Q !== re && s.reference[x] / 2 - (Q < X ? T : L) - g[x] / 2 < 0, K = U ? Q < X ? Q - X : Q - H : 0;
    return {
      [h]: m[h] + K,
      data: {
        [h]: re,
        centerOffset: Q - re - K,
        ...U && {
          alignmentOffset: K
        }
      },
      reset: U
    };
  }
}), Hd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: s,
        rects: a,
        initialPlacement: c,
        platform: l,
        elements: u
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: x = "none",
        flipAlignment: g = !0,
        ...v
      } = Ze(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const C = Je(r), b = Ue(c), w = Je(c) === c, y = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), E = m || (w || !g ? [Bn(c)] : Od(c)), I = x !== "none";
      !m && I && E.push(...$d(c, g, x, y));
      const R = [c, ...E], k = await l.detectOverflow(t, v), z = [];
      let T = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (f && z.push(k[C]), p) {
        const Q = jd(r, a, y);
        z.push(k[Q[0]], k[Q[1]]);
      }
      if (T = [...T, {
        placement: r,
        overflows: z
      }], !z.every((Q) => Q <= 0)) {
        var L, X;
        const Q = (((L = s.flip) == null ? void 0 : L.index) || 0) + 1, re = R[Q];
        if (re && (!(p === "alignment" ? b !== Ue(re) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((B) => Ue(B.placement) === b ? B.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Q,
              overflows: T
            },
            reset: {
              placement: re
            }
          };
        let U = (X = T.filter((K) => K.overflows[0] <= 0).sort((K, B) => K.overflows[1] - B.overflows[1])[0]) == null ? void 0 : X.placement;
        if (!U)
          switch (h) {
            case "bestFit": {
              var H;
              const K = (H = T.filter((B) => {
                if (I) {
                  const ie = Ue(B.placement);
                  return ie === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ie === "y";
                }
                return !0;
              }).map((B) => [B.placement, B.overflows.filter((ie) => ie > 0).reduce((ie, M) => ie + M, 0)]).sort((B, ie) => B[1] - ie[1])[0]) == null ? void 0 : H[0];
              K && (U = K);
              break;
            }
            case "initialPlacement":
              U = c;
              break;
          }
        if (r !== U)
          return {
            reset: {
              placement: U
            }
          };
      }
      return {};
    }
  };
};
function fs(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ps(e) {
  return Nd.some((t) => e[t] >= 0);
}
const Bd = function(e) {
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
      } = Ze(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await o.detectOverflow(t, {
            ...s,
            elementContext: "reference"
          }), c = fs(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: ps(c)
            }
          };
        }
        case "escaped": {
          const a = await o.detectOverflow(t, {
            ...s,
            altBoundary: !0
          }), c = fs(a, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: ps(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, wi = /* @__PURE__ */ new Set(["left", "top"]);
async function Ud(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Je(n), c = Zt(n), l = Ue(n) === "y", u = wi.has(a) ? -1 : 1, f = s && l ? -1 : 1, p = Ze(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: x
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return c && typeof x == "number" && (h = c === "end" ? x * -1 : x), l ? {
    x: h * f,
    y: m * u
  } : {
    x: m * u,
    y: h * f
  };
}
const Gd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: a,
        middlewareData: c
      } = t, l = await Ud(t, e);
      return a === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: r + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, Kd = function(e) {
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
        crossAxis: c = !1,
        limiter: l = {
          fn: (C) => {
            let {
              x: b,
              y: w
            } = C;
            return {
              x: b,
              y: w
            };
          }
        },
        ...u
      } = Ze(e, t), f = {
        x: n,
        y: o
      }, p = await s.detectOverflow(t, u), m = Ue(Je(r)), h = cr(m);
      let x = f[h], g = f[m];
      if (a) {
        const C = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", w = x + p[C], y = x - p[b];
        x = Ko(w, x, y);
      }
      if (c) {
        const C = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", w = g + p[C], y = g - p[b];
        g = Ko(w, g, y);
      }
      const v = l.fn({
        ...t,
        [h]: x,
        [m]: g
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - o,
          enabled: {
            [h]: a,
            [m]: c
          }
        }
      };
    }
  };
}, Yd = function(e) {
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
        offset: c = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = Ze(e, t), f = {
        x: n,
        y: o
      }, p = Ue(r), m = cr(p);
      let h = f[m], x = f[p];
      const g = Ze(c, t), v = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const w = m === "y" ? "height" : "width", y = s.reference[m] - s.floating[w] + v.mainAxis, E = s.reference[m] + s.reference[w] - v.mainAxis;
        h < y ? h = y : h > E && (h = E);
      }
      if (u) {
        var C, b;
        const w = m === "y" ? "width" : "height", y = wi.has(Je(r)), E = s.reference[p] - s.floating[w] + (y && ((C = a.offset) == null ? void 0 : C[p]) || 0) + (y ? 0 : v.crossAxis), I = s.reference[p] + s.reference[w] + (y ? 0 : ((b = a.offset) == null ? void 0 : b[p]) || 0) - (y ? v.crossAxis : 0);
        x < E ? x = E : x > I && (x = I);
      }
      return {
        [m]: h,
        [p]: x
      };
    }
  };
}, Xd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: a,
        elements: c
      } = t, {
        apply: l = () => {
        },
        ...u
      } = Ze(e, t), f = await a.detectOverflow(t, u), p = Je(r), m = Zt(r), h = Ue(r) === "y", {
        width: x,
        height: g
      } = s.floating;
      let v, C;
      p === "top" || p === "bottom" ? (v = p, C = m === (await (a.isRTL == null ? void 0 : a.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (C = p, v = m === "end" ? "top" : "bottom");
      const b = g - f.top - f.bottom, w = x - f.left - f.right, y = dt(g - f[v], b), E = dt(x - f[C], w), I = !t.middlewareData.shift;
      let R = y, k = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = w), (o = t.middlewareData.shift) != null && o.enabled.y && (R = b), I && !m) {
        const T = De(f.left, 0), L = De(f.right, 0), X = De(f.top, 0), H = De(f.bottom, 0);
        h ? k = x - 2 * (T !== 0 || L !== 0 ? T + L : De(f.left, f.right)) : R = g - 2 * (X !== 0 || H !== 0 ? X + H : De(f.top, f.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: R
      });
      const z = await a.getDimensions(c.floating);
      return x !== z.width || g !== z.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function to() {
  return typeof window < "u";
}
function Jt(e) {
  return Ci(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Me(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ke(e) {
  var t;
  return (t = (Ci(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ci(e) {
  return to() ? e instanceof Node || e instanceof Me(e).Node : !1;
}
function Le(e) {
  return to() ? e instanceof Element || e instanceof Me(e).Element : !1;
}
function Qe(e) {
  return to() ? e instanceof HTMLElement || e instanceof Me(e).HTMLElement : !1;
}
function ms(e) {
  return !to() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Me(e).ShadowRoot;
}
function pn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function qd(e) {
  return /^(table|td|th)$/.test(Jt(e));
}
function no(e) {
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
const Zd = /transform|translate|scale|rotate|perspective|filter/, Jd = /paint|layout|strict|content/, wt = (e) => !!e && e !== "none";
let _o;
function fr(e) {
  const t = Le(e) ? ze(e) : e;
  return wt(t.transform) || wt(t.translate) || wt(t.scale) || wt(t.rotate) || wt(t.perspective) || !pr() && (wt(t.backdropFilter) || wt(t.filter)) || Zd.test(t.willChange || "") || Jd.test(t.contain || "");
}
function Qd(e) {
  let t = ft(e);
  for (; Qe(t) && !Gt(t); ) {
    if (fr(t))
      return t;
    if (no(t))
      return null;
    t = ft(t);
  }
  return null;
}
function pr() {
  return _o == null && (_o = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), _o;
}
function Gt(e) {
  return /^(html|body|#document)$/.test(Jt(e));
}
function ze(e) {
  return Me(e).getComputedStyle(e);
}
function oo(e) {
  return Le(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ft(e) {
  if (Jt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ms(e) && e.host || // Fallback.
    Ke(e)
  );
  return ms(t) ? t.host : t;
}
function yi(e) {
  const t = ft(e);
  return Gt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Qe(t) && pn(t) ? t : yi(t);
}
function cn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = yi(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = Me(r);
  if (s) {
    const c = Xo(a);
    return t.concat(a, a.visualViewport || [], pn(r) ? r : [], c && n ? cn(c) : []);
  } else
    return t.concat(r, cn(r, [], n));
}
function Xo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Si(e) {
  const t = ze(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Qe(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, c = Hn(n) !== s || Hn(o) !== a;
  return c && (n = s, o = a), {
    width: n,
    height: o,
    $: c
  };
}
function mr(e) {
  return Le(e) ? e : e.contextElement;
}
function Ht(e) {
  const t = mr(e);
  if (!Qe(t))
    return Ge(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Si(t);
  let a = (s ? Hn(n.width) : n.width) / o, c = (s ? Hn(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: a,
    y: c
  };
}
const ef = /* @__PURE__ */ Ge(0);
function Ei(e) {
  const t = Me(e);
  return !pr() || !t.visualViewport ? ef : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function tf(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Me(e) ? !1 : t;
}
function Rt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = mr(e);
  let a = Ge(1);
  t && (o ? Le(o) && (a = Ht(o)) : a = Ht(e));
  const c = tf(s, n, o) ? Ei(s) : Ge(0);
  let l = (r.left + c.x) / a.x, u = (r.top + c.y) / a.y, f = r.width / a.x, p = r.height / a.y;
  if (s) {
    const m = Me(s), h = o && Le(o) ? Me(o) : o;
    let x = m, g = Xo(x);
    for (; g && o && h !== x; ) {
      const v = Ht(g), C = g.getBoundingClientRect(), b = ze(g), w = C.left + (g.clientLeft + parseFloat(b.paddingLeft)) * v.x, y = C.top + (g.clientTop + parseFloat(b.paddingTop)) * v.y;
      l *= v.x, u *= v.y, f *= v.x, p *= v.y, l += w, u += y, x = Me(g), g = Xo(x);
    }
  }
  return Un({
    width: f,
    height: p,
    x: l,
    y: u
  });
}
function ro(e, t) {
  const n = oo(e).scrollLeft;
  return t ? t.left + n : Rt(Ke(e)).left + n;
}
function Ri(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - ro(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function nf(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = Ke(o), c = t ? no(t.floating) : !1;
  if (o === a || c && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Ge(1);
  const f = Ge(0), p = Qe(o);
  if ((p || !p && !s) && ((Jt(o) !== "body" || pn(a)) && (l = oo(o)), p)) {
    const h = Rt(o);
    u = Ht(o), f.x = h.x + o.clientLeft, f.y = h.y + o.clientTop;
  }
  const m = a && !p && !s ? Ri(a, l) : Ge(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + f.x + m.x,
    y: n.y * u.y - l.scrollTop * u.y + f.y + m.y
  };
}
function of(e) {
  return Array.from(e.getClientRects());
}
function rf(e) {
  const t = Ke(e), n = oo(e), o = e.ownerDocument.body, r = De(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = De(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + ro(e);
  const c = -n.scrollTop;
  return ze(o).direction === "rtl" && (a += De(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: c
  };
}
const hs = 25;
function sf(e, t) {
  const n = Me(e), o = Ke(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, c = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const f = pr();
    (!f || f && t === "fixed") && (c = r.offsetLeft, l = r.offsetTop);
  }
  const u = ro(o);
  if (u <= 0) {
    const f = o.ownerDocument, p = f.body, m = getComputedStyle(p), h = f.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, x = Math.abs(o.clientWidth - p.clientWidth - h);
    x <= hs && (s -= x);
  } else u <= hs && (s += u);
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function af(e, t) {
  const n = Rt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = Qe(e) ? Ht(e) : Ge(1), a = e.clientWidth * s.x, c = e.clientHeight * s.y, l = r * s.x, u = o * s.y;
  return {
    width: a,
    height: c,
    x: l,
    y: u
  };
}
function gs(e, t, n) {
  let o;
  if (t === "viewport")
    o = sf(e, n);
  else if (t === "document")
    o = rf(Ke(e));
  else if (Le(t))
    o = af(t, n);
  else {
    const r = Ei(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return Un(o);
}
function ki(e, t) {
  const n = ft(e);
  return n === t || !Le(n) || Gt(n) ? !1 : ze(n).position === "fixed" || ki(n, t);
}
function lf(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = cn(e, [], !1).filter((c) => Le(c) && Jt(c) !== "body"), r = null;
  const s = ze(e).position === "fixed";
  let a = s ? ft(e) : e;
  for (; Le(a) && !Gt(a); ) {
    const c = ze(a), l = fr(a);
    !l && c.position === "fixed" && (r = null), (s ? !l && !r : !l && c.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || pn(a) && !l && ki(e, a)) ? o = o.filter((f) => f !== a) : r = c, a = ft(a);
  }
  return t.set(e, o), o;
}
function cf(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? no(t) ? [] : lf(t, this._c) : [].concat(n), o], c = gs(t, a[0], r);
  let l = c.top, u = c.right, f = c.bottom, p = c.left;
  for (let m = 1; m < a.length; m++) {
    const h = gs(t, a[m], r);
    l = De(h.top, l), u = dt(h.right, u), f = dt(h.bottom, f), p = De(h.left, p);
  }
  return {
    width: u - p,
    height: f - l,
    x: p,
    y: l
  };
}
function uf(e) {
  const {
    width: t,
    height: n
  } = Si(e);
  return {
    width: t,
    height: n
  };
}
function df(e, t, n) {
  const o = Qe(t), r = Ke(t), s = n === "fixed", a = Rt(e, !0, s, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ge(0);
  function u() {
    l.x = ro(r);
  }
  if (o || !o && !s)
    if ((Jt(t) !== "body" || pn(r)) && (c = oo(t)), o) {
      const h = Rt(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else r && u();
  s && !o && r && u();
  const f = r && !o && !s ? Ri(r, c) : Ge(0), p = a.left + c.scrollLeft - l.x - f.x, m = a.top + c.scrollTop - l.y - f.y;
  return {
    x: p,
    y: m,
    width: a.width,
    height: a.height
  };
}
function Do(e) {
  return ze(e).position === "static";
}
function vs(e, t) {
  if (!Qe(e) || ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ke(e) === n && (n = n.ownerDocument.body), n;
}
function Pi(e, t) {
  const n = Me(e);
  if (no(e))
    return n;
  if (!Qe(e)) {
    let r = ft(e);
    for (; r && !Gt(r); ) {
      if (Le(r) && !Do(r))
        return r;
      r = ft(r);
    }
    return n;
  }
  let o = vs(e, t);
  for (; o && qd(o) && Do(o); )
    o = vs(o, t);
  return o && Gt(o) && Do(o) && !fr(o) ? n : o || Qd(e) || n;
}
const ff = async function(e) {
  const t = this.getOffsetParent || Pi, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: df(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function pf(e) {
  return ze(e).direction === "rtl";
}
const mf = {
  convertOffsetParentRelativeRectToViewportRelativeRect: nf,
  getDocumentElement: Ke,
  getClippingRect: cf,
  getOffsetParent: Pi,
  getElementRects: ff,
  getClientRects: of,
  getDimensions: uf,
  getScale: Ht,
  isElement: Le,
  isRTL: pf
};
function Ii(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function hf(e, t) {
  let n = null, o;
  const r = Ke(e);
  function s() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function a(c, l) {
    c === void 0 && (c = !1), l === void 0 && (l = 1), s();
    const u = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: m,
      height: h
    } = u;
    if (c || t(), !m || !h)
      return;
    const x = Tn(p), g = Tn(r.clientWidth - (f + m)), v = Tn(r.clientHeight - (p + h)), C = Tn(f), w = {
      rootMargin: -x + "px " + -g + "px " + -v + "px " + -C + "px",
      threshold: De(0, dt(1, l)) || 1
    };
    let y = !0;
    function E(I) {
      const R = I[0].intersectionRatio;
      if (R !== l) {
        if (!y)
          return a();
        R ? a(!1, R) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !Ii(u, e.getBoundingClientRect()) && a(), y = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...w,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, w);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Ti(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, u = mr(e), f = r || s ? [...u ? cn(u) : [], ...t ? cn(t) : []] : [];
  f.forEach((C) => {
    r && C.addEventListener("scroll", n, {
      passive: !0
    }), s && C.addEventListener("resize", n);
  });
  const p = u && c ? hf(u, n) : null;
  let m = -1, h = null;
  a && (h = new ResizeObserver((C) => {
    let [b] = C;
    b && b.target === u && h && t && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), u && !l && h.observe(u), t && h.observe(t));
  let x, g = l ? Rt(e) : null;
  l && v();
  function v() {
    const C = Rt(e);
    g && !Ii(g, C) && n(), g = C, x = requestAnimationFrame(v);
  }
  return n(), () => {
    var C;
    f.forEach((b) => {
      r && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), p?.(), (C = h) == null || C.disconnect(), h = null, l && cancelAnimationFrame(x);
  };
}
const gf = Gd, vf = Kd, xf = Hd, bf = Xd, wf = Bd, xs = Wd, Cf = Yd, yf = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: mf,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return Vd(e, t, {
    ...r,
    platform: s
  });
};
var Sf = typeof document < "u", Ef = function() {
}, $n = Sf ? Al : Ef;
function Gn(e, t) {
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
        if (!Gn(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !Gn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ni(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function bs(e, t) {
  const n = Ni(e);
  return Math.round(t * n) / n;
}
function Mo(e) {
  const t = i.useRef(e);
  return $n(() => {
    t.current = e;
  }), t;
}
function Ai(e) {
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
    transform: c = !0,
    whileElementsMounted: l,
    open: u
  } = e, [f, p] = i.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = i.useState(o);
  Gn(m, o) || h(o);
  const [x, g] = i.useState(null), [v, C] = i.useState(null), b = i.useCallback((B) => {
    B !== I.current && (I.current = B, g(B));
  }, []), w = i.useCallback((B) => {
    B !== R.current && (R.current = B, C(B));
  }, []), y = s || x, E = a || v, I = i.useRef(null), R = i.useRef(null), k = i.useRef(f), z = l != null, T = Mo(l), L = Mo(r), X = Mo(u), H = i.useCallback(() => {
    if (!I.current || !R.current)
      return;
    const B = {
      placement: t,
      strategy: n,
      middleware: m
    };
    L.current && (B.platform = L.current), yf(I.current, R.current, B).then((ie) => {
      const M = {
        ...ie,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: X.current !== !1
      };
      Q.current && !Gn(k.current, M) && (k.current = M, qt.flushSync(() => {
        p(M);
      }));
    });
  }, [m, t, n, L, X]);
  $n(() => {
    u === !1 && k.current.isPositioned && (k.current.isPositioned = !1, p((B) => ({
      ...B,
      isPositioned: !1
    })));
  }, [u]);
  const Q = i.useRef(!1);
  $n(() => (Q.current = !0, () => {
    Q.current = !1;
  }), []), $n(() => {
    if (y && (I.current = y), E && (R.current = E), y && E) {
      if (T.current)
        return T.current(y, E, H);
      H();
    }
  }, [y, E, H, T, z]);
  const re = i.useMemo(() => ({
    reference: I,
    floating: R,
    setReference: b,
    setFloating: w
  }), [b, w]), U = i.useMemo(() => ({
    reference: y,
    floating: E
  }), [y, E]), K = i.useMemo(() => {
    const B = {
      position: n,
      left: 0,
      top: 0
    };
    if (!U.floating)
      return B;
    const ie = bs(U.floating, f.x), M = bs(U.floating, f.y);
    return c ? {
      ...B,
      transform: "translate(" + ie + "px, " + M + "px)",
      ...Ni(U.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: ie,
      top: M
    };
  }, [n, c, U.floating, f.x, f.y]);
  return i.useMemo(() => ({
    ...f,
    update: H,
    refs: re,
    elements: U,
    floatingStyles: K
  }), [f, H, re, U, K]);
}
const Rf = (e) => {
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
      return o && t(o) ? o.current != null ? xs({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? xs({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, ji = (e, t) => {
  const n = gf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Oi = (e, t) => {
  const n = vf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, _i = (e, t) => ({
  fn: Cf(e).fn,
  options: [e, t]
}), Di = (e, t) => {
  const n = xf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Mi = (e, t) => {
  const n = bf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, $i = (e, t) => {
  const n = wf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Li = (e, t) => {
  const n = Rf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var kf = "Arrow", zi = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ d.jsx(
    ke.svg,
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
zi.displayName = kf;
var Pf = zi;
function If(e) {
  const [t, n] = i.useState(void 0);
  return je(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const s = r[0];
        let a, c;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          a = u.inlineSize, c = u.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        n({ width: a, height: c });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var hr = "Popper", [Fi, so] = fn(hr), [Tf, Vi] = Fi(hr), Wi = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null);
  return /* @__PURE__ */ d.jsx(Tf, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Wi.displayName = hr;
var Hi = "PopperAnchor", Bi = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Vi(Hi, n), a = i.useRef(null), c = Te(t, a), l = i.useRef(null);
    return i.useEffect(() => {
      const u = l.current;
      l.current = o?.current || a.current, u !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ d.jsx(ke.div, { ...r, ref: c });
  }
);
Bi.displayName = Hi;
var gr = "PopperContent", [Nf, Af] = Fi(gr), Ui = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: c = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: x,
      ...g
    } = e, v = Vi(gr, n), [C, b] = i.useState(null), w = Te(t, ($) => b($)), [y, E] = i.useState(null), I = If(y), R = I?.width ?? 0, k = I?.height ?? 0, z = o + (s !== "center" ? "-" + s : ""), T = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, L = Array.isArray(u) ? u : [u], X = L.length > 0, H = {
      padding: T,
      boundary: L.filter(Of),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: re, placement: U, isPositioned: K, middlewareData: B } = Ai({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (...$) => Ti(...$, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        ji({ mainAxis: r + k, alignmentAxis: a }),
        l && Oi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? _i() : void 0,
          ...H
        }),
        l && Di({ ...H }),
        Mi({
          ...H,
          apply: ({ elements: $, rects: ne, availableWidth: te, availableHeight: pe }) => {
            const { width: ve, height: ye } = ne.reference, Ie = $.floating.style;
            Ie.setProperty("--radix-popper-available-width", `${te}px`), Ie.setProperty("--radix-popper-available-height", `${pe}px`), Ie.setProperty("--radix-popper-anchor-width", `${ve}px`), Ie.setProperty("--radix-popper-anchor-height", `${ye}px`);
          }
        }),
        y && Li({ element: y, padding: c }),
        _f({ arrowWidth: R, arrowHeight: k }),
        m && $i({ strategy: "referenceHidden", ...H })
      ]
    }), [ie, M] = Yi(U), P = Et(x);
    je(() => {
      K && P?.();
    }, [K, P]);
    const J = B.arrow?.x, de = B.arrow?.y, ce = B.arrow?.centerOffset !== 0, [ee, ue] = i.useState();
    return je(() => {
      C && ue(window.getComputedStyle(C).zIndex);
    }, [C]), /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...re,
          transform: K ? re.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ee,
          "--radix-popper-transform-origin": [
            B.transformOrigin?.x,
            B.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...B.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ d.jsx(
          Nf,
          {
            scope: n,
            placedSide: ie,
            onArrowChange: E,
            arrowX: J,
            arrowY: de,
            shouldHideArrow: ce,
            children: /* @__PURE__ */ d.jsx(
              ke.div,
              {
                "data-side": ie,
                "data-align": M,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: K ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Ui.displayName = gr;
var Gi = "PopperArrow", jf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ki = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Af(Gi, o), a = jf[s.placedSide];
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
          Pf,
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
Ki.displayName = Gi;
function Of(e) {
  return e !== null;
}
var _f = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, c = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, f] = Yi(n), p = { start: "0%", center: "50%", end: "100%" }[f], m = (r.arrow?.x ?? 0) + c / 2, h = (r.arrow?.y ?? 0) + l / 2;
    let x = "", g = "";
    return u === "bottom" ? (x = a ? p : `${m}px`, g = `${-l}px`) : u === "top" ? (x = a ? p : `${m}px`, g = `${o.floating.height + l}px`) : u === "right" ? (x = `${-l}px`, g = a ? p : `${h}px`) : u === "left" && (x = `${o.floating.width + l}px`, g = a ? p : `${h}px`), { data: { x, y: g } };
  }
});
function Yi(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Xi = Wi, vr = Bi, qi = Ui, Zi = Ki, Df = "Portal", xr = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  je(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Ol.createPortal(/* @__PURE__ */ d.jsx(ke.div, { ...o, ref: t }), a) : null;
});
xr.displayName = Df;
var Mf = i[" useInsertionEffect ".trim().toString()] || je;
function Kn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = $f({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== c && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (c) {
        const p = Lf(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, u];
}
function $f({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Mf(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Lf(e) {
  return typeof e == "function";
}
function zf(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Ji = Object.freeze({
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
}), Ff = "VisuallyHidden", Vf = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(
    ke.span,
    {
      ...e,
      ref: t,
      style: { ...Ji, ...e.style }
    }
  )
);
Vf.displayName = Ff;
var Wf = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, zt = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), An = {}, $o = 0, Qi = function(e) {
  return e && (e.host || Qi(e.parentNode));
}, Hf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Qi(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Bf = function(e, t, n, o) {
  var r = Hf(t, Array.isArray(e) ? e : [e]);
  An[n] || (An[n] = /* @__PURE__ */ new WeakMap());
  var s = An[n], a = [], c = /* @__PURE__ */ new Set(), l = new Set(r), u = function(p) {
    !p || c.has(p) || (c.add(p), u(p.parentNode));
  };
  r.forEach(u);
  var f = function(p) {
    !p || l.has(p) || Array.prototype.forEach.call(p.children, function(m) {
      if (c.has(m))
        f(m);
      else
        try {
          var h = m.getAttribute(o), x = h !== null && h !== "false", g = (zt.get(m) || 0) + 1, v = (s.get(m) || 0) + 1;
          zt.set(m, g), s.set(m, v), a.push(m), g === 1 && x && Nn.set(m, !0), v === 1 && m.setAttribute(n, "true"), x || m.setAttribute(o, "true");
        } catch (C) {
          console.error("aria-hidden: cannot operate on ", m, C);
        }
    });
  };
  return f(t), c.clear(), $o++, function() {
    a.forEach(function(p) {
      var m = zt.get(p) - 1, h = s.get(p) - 1;
      zt.set(p, m), s.set(p, h), m || (Nn.has(p) || p.removeAttribute(o), Nn.delete(p)), h || p.removeAttribute(n);
    }), $o--, $o || (zt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), An = {});
  };
}, br = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Wf(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Bf(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, Be = function() {
  return Be = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, Be.apply(this, arguments);
};
function ea(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Uf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Ln = "right-scroll-bar-position", zn = "width-before-scroll-bar", Gf = "with-scroll-bars-hidden", Kf = "--removed-body-scroll-bar-size";
function Lo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Yf(e, t) {
  var n = jl(function() {
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
var Xf = typeof window < "u" ? i.useLayoutEffect : i.useEffect, ws = /* @__PURE__ */ new WeakMap();
function qf(e, t) {
  var n = Yf(null, function(o) {
    return e.forEach(function(r) {
      return Lo(r, o);
    });
  });
  return Xf(function() {
    var o = ws.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(c) {
        s.has(c) || Lo(c, null);
      }), s.forEach(function(c) {
        r.has(c) || Lo(c, a);
      });
    }
    ws.set(n, e);
  }, [e]), n;
}
function Zf(e) {
  return e;
}
function Jf(e, t) {
  t === void 0 && (t = Zf);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, o);
      return n.push(a), function() {
        n = n.filter(function(c) {
          return c !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (o = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(c) {
          return s(c);
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
        var c = n;
        n = [], c.forEach(s), a = n;
      }
      var l = function() {
        var f = a;
        a = [], f.forEach(s);
      }, u = function() {
        return Promise.resolve().then(l);
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
function Qf(e) {
  e === void 0 && (e = {});
  var t = Jf(null);
  return t.options = Be({ async: !0, ssr: !1 }, e), t;
}
var ta = function(e) {
  var t = e.sideCar, n = ea(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return i.createElement(o, Be({}, n));
};
ta.isSideCarExport = !0;
function ep(e, t) {
  return e.useMedium(t), ta;
}
var na = Qf(), zo = function() {
}, io = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({
    onScrollCapture: zo,
    onWheelCapture: zo,
    onTouchMoveCapture: zo
  }), r = o[0], s = o[1], a = e.forwardProps, c = e.children, l = e.className, u = e.removeScrollBar, f = e.enabled, p = e.shards, m = e.sideCar, h = e.noRelative, x = e.noIsolation, g = e.inert, v = e.allowPinchZoom, C = e.as, b = C === void 0 ? "div" : C, w = e.gapMode, y = ea(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = m, I = qf([n, t]), R = Be(Be({}, y), r);
  return i.createElement(
    i.Fragment,
    null,
    f && i.createElement(E, { sideCar: na, removeScrollBar: u, shards: p, noRelative: h, noIsolation: x, inert: g, setCallbacks: s, allowPinchZoom: !!v, lockRef: n, gapMode: w }),
    a ? i.cloneElement(i.Children.only(c), Be(Be({}, R), { ref: I })) : i.createElement(b, Be({}, R, { className: l, ref: I }), c)
  );
});
io.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
io.classNames = {
  fullWidth: zn,
  zeroRight: Ln
};
var tp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function np() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = tp();
  return t && e.setAttribute("nonce", t), e;
}
function op(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function rp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var sp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = np()) && (op(t, n), rp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ip = function() {
  var e = sp();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, oa = function() {
  var e = ip(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, ap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Fo = function(e) {
  return parseInt(e || "", 10) || 0;
}, lp = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Fo(n), Fo(o), Fo(r)];
}, cp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ap;
  var t = lp(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, up = oa(), Bt = "data-scroll-locked", dp = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, c = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Gf, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(c, "px ").concat(o, `;
  }
  body[`).concat(Bt, `] {
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
    margin-right: `).concat(c, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(c, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ln, ` {
    right: `).concat(c, "px ").concat(o, `;
  }
  
  .`).concat(zn, ` {
    margin-right: `).concat(c, "px ").concat(o, `;
  }
  
  .`).concat(Ln, " .").concat(Ln, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(zn, " .").concat(zn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Bt, `] {
    `).concat(Kf, ": ").concat(c, `px;
  }
`);
}, Cs = function() {
  var e = parseInt(document.body.getAttribute(Bt) || "0", 10);
  return isFinite(e) ? e : 0;
}, fp = function() {
  i.useEffect(function() {
    return document.body.setAttribute(Bt, (Cs() + 1).toString()), function() {
      var e = Cs() - 1;
      e <= 0 ? document.body.removeAttribute(Bt) : document.body.setAttribute(Bt, e.toString());
    };
  }, []);
}, pp = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  fp();
  var s = i.useMemo(function() {
    return cp(r);
  }, [r]);
  return i.createElement(up, { styles: dp(s, !t, r, n ? "" : "!important") });
}, qo = !1;
if (typeof window < "u")
  try {
    var jn = Object.defineProperty({}, "passive", {
      get: function() {
        return qo = !0, !0;
      }
    });
    window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
  } catch {
    qo = !1;
  }
var Ft = qo ? { passive: !1 } : !1, mp = function(e) {
  return e.tagName === "TEXTAREA";
}, ra = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !mp(e) && n[t] === "visible")
  );
}, hp = function(e) {
  return ra(e, "overflowY");
}, gp = function(e) {
  return ra(e, "overflowX");
}, ys = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = sa(e, o);
    if (r) {
      var s = ia(e, o), a = s[1], c = s[2];
      if (a > c)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, vp = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, xp = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, sa = function(e, t) {
  return e === "v" ? hp(t) : gp(t);
}, ia = function(e, t) {
  return e === "v" ? vp(t) : xp(t);
}, bp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, wp = function(e, t, n, o, r) {
  var s = bp(e, window.getComputedStyle(t).direction), a = s * o, c = n.target, l = t.contains(c), u = !1, f = a > 0, p = 0, m = 0;
  do {
    if (!c)
      break;
    var h = ia(e, c), x = h[0], g = h[1], v = h[2], C = g - v - s * x;
    (x || C) && sa(e, c) && (p += C, m += x);
    var b = c.parentNode;
    c = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !l && c !== document.body || // self content
    l && (t.contains(c) || t === c)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(m) < 1) && (u = !0), u;
}, On = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ss = function(e) {
  return [e.deltaX, e.deltaY];
}, Es = function(e) {
  return e && "current" in e ? e.current : e;
}, Cp = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, yp = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Sp = 0, Vt = [];
function Ep(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(Sp++)[0], s = i.useState(oa)[0], a = i.useRef(e);
  i.useEffect(function() {
    a.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = Uf([e.lockRef.current], (e.shards || []).map(Es), !0).filter(Boolean);
      return g.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var c = i.useCallback(function(g, v) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var C = On(g), b = n.current, w = "deltaX" in g ? g.deltaX : b[0] - C[0], y = "deltaY" in g ? g.deltaY : b[1] - C[1], E, I = g.target, R = Math.abs(w) > Math.abs(y) ? "h" : "v";
    if ("touches" in g && R === "h" && I.type === "range")
      return !1;
    var k = window.getSelection(), z = k && k.anchorNode, T = z ? z === I || z.contains(I) : !1;
    if (T)
      return !1;
    var L = ys(R, I);
    if (!L)
      return !0;
    if (L ? E = R : (E = R === "v" ? "h" : "v", L = ys(R, I)), !L)
      return !1;
    if (!o.current && "changedTouches" in g && (w || y) && (o.current = E), !E)
      return !0;
    var X = o.current || E;
    return wp(X, v, g, X === "h" ? w : y);
  }, []), l = i.useCallback(function(g) {
    var v = g;
    if (!(!Vt.length || Vt[Vt.length - 1] !== s)) {
      var C = "deltaY" in v ? Ss(v) : On(v), b = t.current.filter(function(E) {
        return E.name === v.type && (E.target === v.target || v.target === E.shadowParent) && Cp(E.delta, C);
      })[0];
      if (b && b.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!b) {
        var w = (a.current.shards || []).map(Es).filter(Boolean).filter(function(E) {
          return E.contains(v.target);
        }), y = w.length > 0 ? c(v, w[0]) : !a.current.noIsolation;
        y && v.cancelable && v.preventDefault();
      }
    }
  }, []), u = i.useCallback(function(g, v, C, b) {
    var w = { name: g, delta: v, target: C, should: b, shadowParent: Rp(C) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== w;
      });
    }, 1);
  }, []), f = i.useCallback(function(g) {
    n.current = On(g), o.current = void 0;
  }, []), p = i.useCallback(function(g) {
    u(g.type, Ss(g), g.target, c(g, e.lockRef.current));
  }, []), m = i.useCallback(function(g) {
    u(g.type, On(g), g.target, c(g, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return Vt.push(s), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", l, Ft), document.addEventListener("touchmove", l, Ft), document.addEventListener("touchstart", f, Ft), function() {
      Vt = Vt.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, Ft), document.removeEventListener("touchmove", l, Ft), document.removeEventListener("touchstart", f, Ft);
    };
  }, []);
  var h = e.removeScrollBar, x = e.inert;
  return i.createElement(
    i.Fragment,
    null,
    x ? i.createElement(s, { styles: yp(r) }) : null,
    h ? i.createElement(pp, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Rp(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const kp = ep(na, Ep);
var ao = i.forwardRef(function(e, t) {
  return i.createElement(io, Be({}, e, { ref: t, sideCar: kp }));
});
ao.classNames = io.classNames;
var Pp = [" ", "Enter", "ArrowUp", "ArrowDown"], Ip = [" ", "Enter"], kt = "Select", [lo, co, Tp] = ld(kt), [Qt] = fn(kt, [
  Tp,
  so
]), uo = so(), [Np, mt] = Qt(kt), [Ap, jp] = Qt(kt), aa = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    value: a,
    defaultValue: c,
    onValueChange: l,
    dir: u,
    name: f,
    autoComplete: p,
    disabled: m,
    required: h,
    form: x
  } = e, g = uo(t), [v, C] = i.useState(null), [b, w] = i.useState(null), [y, E] = i.useState(!1), I = ud(u), [R, k] = Kn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: kt
  }), [z, T] = Kn({
    prop: a,
    defaultProp: c,
    onChange: l,
    caller: kt
  }), L = i.useRef(null), X = v ? x || !!v.closest("form") : !0, [H, Q] = i.useState(/* @__PURE__ */ new Set()), re = Array.from(H).map((U) => U.props.value).join(";");
  return /* @__PURE__ */ d.jsx(Xi, { ...g, children: /* @__PURE__ */ d.jsxs(
    Np,
    {
      required: h,
      scope: t,
      trigger: v,
      onTriggerChange: C,
      valueNode: b,
      onValueNodeChange: w,
      valueNodeHasChildren: y,
      onValueNodeHasChildrenChange: E,
      contentId: St(),
      value: z,
      onValueChange: T,
      open: R,
      onOpenChange: k,
      dir: I,
      triggerPointerDownPosRef: L,
      disabled: m,
      children: [
        /* @__PURE__ */ d.jsx(lo.Provider, { scope: t, children: /* @__PURE__ */ d.jsx(
          Ap,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: i.useCallback((U) => {
              Q((K) => new Set(K).add(U));
            }, []),
            onNativeOptionRemove: i.useCallback((U) => {
              Q((K) => {
                const B = new Set(K);
                return B.delete(U), B;
              });
            }, []),
            children: n
          }
        ) }),
        X ? /* @__PURE__ */ d.jsxs(
          Ra,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: z,
            onChange: (U) => T(U.target.value),
            disabled: m,
            form: x,
            children: [
              z === void 0 ? /* @__PURE__ */ d.jsx("option", { value: "" }) : null,
              Array.from(H)
            ]
          },
          re
        ) : null
      ]
    }
  ) });
};
aa.displayName = kt;
var la = "SelectTrigger", ca = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, s = uo(n), a = mt(la, n), c = a.disabled || o, l = Te(t, a.onTriggerChange), u = co(n), f = i.useRef("touch"), [p, m, h] = Pa((g) => {
      const v = u().filter((w) => !w.disabled), C = v.find((w) => w.value === a.value), b = Ia(v, g, C);
      b !== void 0 && a.onValueChange(b.value);
    }), x = (g) => {
      c || (a.onOpenChange(!0), h()), g && (a.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ d.jsx(vr, { asChild: !0, ...s, children: /* @__PURE__ */ d.jsx(
      ke.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": a.contentId,
        "aria-expanded": a.open,
        "aria-required": a.required,
        "aria-autocomplete": "none",
        dir: a.dir,
        "data-state": a.open ? "open" : "closed",
        disabled: c,
        "data-disabled": c ? "" : void 0,
        "data-placeholder": ka(a.value) ? "" : void 0,
        ...r,
        ref: l,
        onClick: Ee(r.onClick, (g) => {
          g.currentTarget.focus(), f.current !== "mouse" && x(g);
        }),
        onPointerDown: Ee(r.onPointerDown, (g) => {
          f.current = g.pointerType;
          const v = g.target;
          v.hasPointerCapture(g.pointerId) && v.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (x(g), g.preventDefault());
        }),
        onKeyDown: Ee(r.onKeyDown, (g) => {
          const v = p.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(v && g.key === " ") && Pp.includes(g.key) && (x(), g.preventDefault());
        })
      }
    ) });
  }
);
ca.displayName = la;
var ua = "SelectValue", da = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: s, placeholder: a = "", ...c } = e, l = mt(ua, n), { onValueNodeHasChildrenChange: u } = l, f = s !== void 0, p = Te(t, l.onValueNodeChange);
    return je(() => {
      u(f);
    }, [u, f]), /* @__PURE__ */ d.jsx(
      ke.span,
      {
        ...c,
        ref: p,
        style: { pointerEvents: "none" },
        children: ka(l.value) ? /* @__PURE__ */ d.jsx(d.Fragment, { children: a }) : s
      }
    );
  }
);
da.displayName = ua;
var Op = "SelectIcon", fa = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ d.jsx(ke.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
fa.displayName = Op;
var Pt = "SelectContent", pa = i.forwardRef(
  (e, t) => {
    const n = mt(Pt, e.__scopeSelect), [o, r] = i.useState();
    if (je(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const s = o;
      return s ? qt.createPortal(
        /* @__PURE__ */ d.jsx(ma, { scope: e.__scopeSelect, children: /* @__PURE__ */ d.jsx(lo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ d.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ d.jsx(ha, { ...e, ref: t });
  }
);
pa.displayName = Pt;
var $e = 10, [ma, ht] = Qt(Pt), _p = "SelectContentImpl", Dp = /* @__PURE__ */ Ut("SelectContent.RemoveScroll"), ha = i.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: o = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      //
      // PopperContent props
      side: c,
      sideOffset: l,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: x,
      hideWhenDetached: g,
      avoidCollisions: v,
      //
      ...C
    } = e, b = mt(Pt, n), [w, y] = i.useState(null), [E, I] = i.useState(null), R = Te(t, ($) => y($)), [k, z] = i.useState(null), [T, L] = i.useState(
      null
    ), X = co(n), [H, Q] = i.useState(!1), re = i.useRef(!1);
    i.useEffect(() => {
      if (w) return br(w);
    }, [w]), lr();
    const U = i.useCallback(
      ($) => {
        const [ne, ...te] = X().map((ye) => ye.ref.current), [pe] = te.slice(-1), ve = document.activeElement;
        for (const ye of $)
          if (ye === ve || (ye?.scrollIntoView({ block: "nearest" }), ye === ne && E && (E.scrollTop = 0), ye === pe && E && (E.scrollTop = E.scrollHeight), ye?.focus(), document.activeElement !== ve)) return;
      },
      [X, E]
    ), K = i.useCallback(
      () => U([k, w]),
      [U, k, w]
    );
    i.useEffect(() => {
      H && K();
    }, [H, K]);
    const { onOpenChange: B, triggerPointerDownPosRef: ie } = b;
    i.useEffect(() => {
      if (w) {
        let $ = { x: 0, y: 0 };
        const ne = (pe) => {
          $ = {
            x: Math.abs(Math.round(pe.pageX) - (ie.current?.x ?? 0)),
            y: Math.abs(Math.round(pe.pageY) - (ie.current?.y ?? 0))
          };
        }, te = (pe) => {
          $.x <= 10 && $.y <= 10 ? pe.preventDefault() : w.contains(pe.target) || B(!1), document.removeEventListener("pointermove", ne), ie.current = null;
        };
        return ie.current !== null && (document.addEventListener("pointermove", ne), document.addEventListener("pointerup", te, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", ne), document.removeEventListener("pointerup", te, { capture: !0 });
        };
      }
    }, [w, B, ie]), i.useEffect(() => {
      const $ = () => B(!1);
      return window.addEventListener("blur", $), window.addEventListener("resize", $), () => {
        window.removeEventListener("blur", $), window.removeEventListener("resize", $);
      };
    }, [B]);
    const [M, P] = Pa(($) => {
      const ne = X().filter((ve) => !ve.disabled), te = ne.find((ve) => ve.ref.current === document.activeElement), pe = Ia(ne, $, te);
      pe && setTimeout(() => pe.ref.current.focus());
    }), J = i.useCallback(
      ($, ne, te) => {
        const pe = !re.current && !te;
        (b.value !== void 0 && b.value === ne || pe) && (z($), pe && (re.current = !0));
      },
      [b.value]
    ), de = i.useCallback(() => w?.focus(), [w]), ce = i.useCallback(
      ($, ne, te) => {
        const pe = !re.current && !te;
        (b.value !== void 0 && b.value === ne || pe) && L($);
      },
      [b.value]
    ), ee = o === "popper" ? Zo : ga, ue = ee === Zo ? {
      side: c,
      sideOffset: l,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: x,
      hideWhenDetached: g,
      avoidCollisions: v
    } : {};
    return /* @__PURE__ */ d.jsx(
      ma,
      {
        scope: n,
        content: w,
        viewport: E,
        onViewportChange: I,
        itemRefCallback: J,
        selectedItem: k,
        onItemLeave: de,
        itemTextRefCallback: ce,
        focusSelectedItem: K,
        selectedItemText: T,
        position: o,
        isPositioned: H,
        searchRef: M,
        children: /* @__PURE__ */ d.jsx(ao, { as: Dp, allowPinchZoom: !0, children: /* @__PURE__ */ d.jsx(
          eo,
          {
            asChild: !0,
            trapped: b.open,
            onMountAutoFocus: ($) => {
              $.preventDefault();
            },
            onUnmountAutoFocus: Ee(r, ($) => {
              b.trigger?.focus({ preventScroll: !0 }), $.preventDefault();
            }),
            children: /* @__PURE__ */ d.jsx(
              Qn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: a,
                onFocusOutside: ($) => $.preventDefault(),
                onDismiss: () => b.onOpenChange(!1),
                children: /* @__PURE__ */ d.jsx(
                  ee,
                  {
                    role: "listbox",
                    id: b.contentId,
                    "data-state": b.open ? "open" : "closed",
                    dir: b.dir,
                    onContextMenu: ($) => $.preventDefault(),
                    ...C,
                    ...ue,
                    onPlaced: () => Q(!0),
                    ref: R,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...C.style
                    },
                    onKeyDown: Ee(C.onKeyDown, ($) => {
                      const ne = $.ctrlKey || $.altKey || $.metaKey;
                      if ($.key === "Tab" && $.preventDefault(), !ne && $.key.length === 1 && P($.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes($.key)) {
                        let pe = X().filter((ve) => !ve.disabled).map((ve) => ve.ref.current);
                        if (["ArrowUp", "End"].includes($.key) && (pe = pe.slice().reverse()), ["ArrowUp", "ArrowDown"].includes($.key)) {
                          const ve = $.target, ye = pe.indexOf(ve);
                          pe = pe.slice(ye + 1);
                        }
                        setTimeout(() => U(pe)), $.preventDefault();
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
ha.displayName = _p;
var Mp = "SelectItemAlignedPosition", ga = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, s = mt(Pt, n), a = ht(Pt, n), [c, l] = i.useState(null), [u, f] = i.useState(null), p = Te(t, (R) => f(R)), m = co(n), h = i.useRef(!1), x = i.useRef(!0), { viewport: g, selectedItem: v, selectedItemText: C, focusSelectedItem: b } = a, w = i.useCallback(() => {
    if (s.trigger && s.valueNode && c && u && g && v && C) {
      const R = s.trigger.getBoundingClientRect(), k = u.getBoundingClientRect(), z = s.valueNode.getBoundingClientRect(), T = C.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const ve = T.left - k.left, ye = z.left - ve, Ie = R.left - ye, be = R.width + Ie, et = Math.max(be, k.width), tt = window.innerWidth - $e, xt = es(ye, [
          $e,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max($e, tt - et)
        ]);
        c.style.minWidth = be + "px", c.style.left = xt + "px";
      } else {
        const ve = k.right - T.right, ye = window.innerWidth - z.right - ve, Ie = window.innerWidth - R.right - ye, be = R.width + Ie, et = Math.max(be, k.width), tt = window.innerWidth - $e, xt = es(ye, [
          $e,
          Math.max($e, tt - et)
        ]);
        c.style.minWidth = be + "px", c.style.right = xt + "px";
      }
      const L = m(), X = window.innerHeight - $e * 2, H = g.scrollHeight, Q = window.getComputedStyle(u), re = parseInt(Q.borderTopWidth, 10), U = parseInt(Q.paddingTop, 10), K = parseInt(Q.borderBottomWidth, 10), B = parseInt(Q.paddingBottom, 10), ie = re + U + H + B + K, M = Math.min(v.offsetHeight * 5, ie), P = window.getComputedStyle(g), J = parseInt(P.paddingTop, 10), de = parseInt(P.paddingBottom, 10), ce = R.top + R.height / 2 - $e, ee = X - ce, ue = v.offsetHeight / 2, $ = v.offsetTop + ue, ne = re + U + $, te = ie - ne;
      if (ne <= ce) {
        const ve = L.length > 0 && v === L[L.length - 1].ref.current;
        c.style.bottom = "0px";
        const ye = u.clientHeight - g.offsetTop - g.offsetHeight, Ie = Math.max(
          ee,
          ue + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ve ? de : 0) + ye + K
        ), be = ne + Ie;
        c.style.height = be + "px";
      } else {
        const ve = L.length > 0 && v === L[0].ref.current;
        c.style.top = "0px";
        const Ie = Math.max(
          ce,
          re + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ve ? J : 0) + ue
        ) + te;
        c.style.height = Ie + "px", g.scrollTop = ne - ce + g.offsetTop;
      }
      c.style.margin = `${$e}px 0`, c.style.minHeight = M + "px", c.style.maxHeight = X + "px", o?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    m,
    s.trigger,
    s.valueNode,
    c,
    u,
    g,
    v,
    C,
    s.dir,
    o
  ]);
  je(() => w(), [w]);
  const [y, E] = i.useState();
  je(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const I = i.useCallback(
    (R) => {
      R && x.current === !0 && (w(), b?.(), x.current = !1);
    },
    [w, b]
  );
  return /* @__PURE__ */ d.jsx(
    Lp,
    {
      scope: n,
      contentWrapper: c,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: I,
      children: /* @__PURE__ */ d.jsx(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: y
          },
          children: /* @__PURE__ */ d.jsx(
            ke.div,
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
ga.displayName = Mp;
var $p = "SelectPopperPosition", Zo = i.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = $e,
    ...s
  } = e, a = uo(n);
  return /* @__PURE__ */ d.jsx(
    qi,
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
Zo.displayName = $p;
var [Lp, wr] = Qt(Pt, {}), Jo = "SelectViewport", va = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, s = ht(Jo, n), a = wr(Jo, n), c = Te(t, s.onViewportChange), l = i.useRef(0);
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
      /* @__PURE__ */ d.jsx(lo.Slot, { scope: n, children: /* @__PURE__ */ d.jsx(
        ke.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: c,
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
          onScroll: Ee(r.onScroll, (u) => {
            const f = u.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: m } = a;
            if (m?.current && p) {
              const h = Math.abs(l.current - f.scrollTop);
              if (h > 0) {
                const x = window.innerHeight - $e * 2, g = parseFloat(p.style.minHeight), v = parseFloat(p.style.height), C = Math.max(g, v);
                if (C < x) {
                  const b = C + h, w = Math.min(x, b), y = b - w;
                  p.style.height = w + "px", p.style.bottom === "0px" && (f.scrollTop = y > 0 ? y : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = f.scrollTop;
          })
        }
      ) })
    ] });
  }
);
va.displayName = Jo;
var xa = "SelectGroup", [zp, Fp] = Qt(xa), Vp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = St();
    return /* @__PURE__ */ d.jsx(zp, { scope: n, id: r, children: /* @__PURE__ */ d.jsx(ke.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
Vp.displayName = xa;
var ba = "SelectLabel", Wp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Fp(ba, n);
    return /* @__PURE__ */ d.jsx(ke.div, { id: r.id, ...o, ref: t });
  }
);
Wp.displayName = ba;
var Yn = "SelectItem", [Hp, wa] = Qt(Yn), Ca = i.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: s,
      ...a
    } = e, c = mt(Yn, n), l = ht(Yn, n), u = c.value === o, [f, p] = i.useState(s ?? ""), [m, h] = i.useState(!1), x = Te(
      t,
      (b) => l.itemRefCallback?.(b, o, r)
    ), g = St(), v = i.useRef("touch"), C = () => {
      r || (c.onValueChange(o), c.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ d.jsx(
      Hp,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: g,
        isSelected: u,
        onItemTextChange: i.useCallback((b) => {
          p((w) => w || (b?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ d.jsx(
          lo.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: f,
            children: /* @__PURE__ */ d.jsx(
              ke.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": u && m,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...a,
                ref: x,
                onFocus: Ee(a.onFocus, () => h(!0)),
                onBlur: Ee(a.onBlur, () => h(!1)),
                onClick: Ee(a.onClick, () => {
                  v.current !== "mouse" && C();
                }),
                onPointerUp: Ee(a.onPointerUp, () => {
                  v.current === "mouse" && C();
                }),
                onPointerDown: Ee(a.onPointerDown, (b) => {
                  v.current = b.pointerType;
                }),
                onPointerMove: Ee(a.onPointerMove, (b) => {
                  v.current = b.pointerType, r ? l.onItemLeave?.() : v.current === "mouse" && b.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Ee(a.onPointerLeave, (b) => {
                  b.currentTarget === document.activeElement && l.onItemLeave?.();
                }),
                onKeyDown: Ee(a.onKeyDown, (b) => {
                  l.searchRef?.current !== "" && b.key === " " || (Ip.includes(b.key) && C(), b.key === " " && b.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Ca.displayName = Yn;
var ln = "SelectItemText", ya = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...s } = e, a = mt(ln, n), c = ht(ln, n), l = wa(ln, n), u = jp(ln, n), [f, p] = i.useState(null), m = Te(
      t,
      (C) => p(C),
      l.onItemTextChange,
      (C) => c.itemTextRefCallback?.(C, l.value, l.disabled)
    ), h = f?.textContent, x = i.useMemo(
      () => /* @__PURE__ */ d.jsx("option", { value: l.value, disabled: l.disabled, children: h }, l.value),
      [l.disabled, l.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: v } = u;
    return je(() => (g(x), () => v(x)), [g, v, x]), /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(ke.span, { id: l.textId, ...s, ref: m }),
      l.isSelected && a.valueNode && !a.valueNodeHasChildren ? qt.createPortal(s.children, a.valueNode) : null
    ] });
  }
);
ya.displayName = ln;
var Sa = "SelectItemIndicator", Bp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return wa(Sa, n).isSelected ? /* @__PURE__ */ d.jsx(ke.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Bp.displayName = Sa;
var Qo = "SelectScrollUpButton", Up = i.forwardRef((e, t) => {
  const n = ht(Qo, e.__scopeSelect), o = wr(Qo, e.__scopeSelect), [r, s] = i.useState(!1), a = Te(t, o.onScrollButtonChange);
  return je(() => {
    if (n.viewport && n.isPositioned) {
      let c = function() {
        const u = l.scrollTop > 0;
        s(u);
      };
      const l = n.viewport;
      return c(), l.addEventListener("scroll", c), () => l.removeEventListener("scroll", c);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ d.jsx(
    Ea,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: c, selectedItem: l } = n;
        c && l && (c.scrollTop = c.scrollTop - l.offsetHeight);
      }
    }
  ) : null;
});
Up.displayName = Qo;
var er = "SelectScrollDownButton", Gp = i.forwardRef((e, t) => {
  const n = ht(er, e.__scopeSelect), o = wr(er, e.__scopeSelect), [r, s] = i.useState(!1), a = Te(t, o.onScrollButtonChange);
  return je(() => {
    if (n.viewport && n.isPositioned) {
      let c = function() {
        const u = l.scrollHeight - l.clientHeight, f = Math.ceil(l.scrollTop) < u;
        s(f);
      };
      const l = n.viewport;
      return c(), l.addEventListener("scroll", c), () => l.removeEventListener("scroll", c);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ d.jsx(
    Ea,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: c, selectedItem: l } = n;
        c && l && (c.scrollTop = c.scrollTop + l.offsetHeight);
      }
    }
  ) : null;
});
Gp.displayName = er;
var Ea = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, s = ht("SelectScrollButton", n), a = i.useRef(null), c = co(n), l = i.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return i.useEffect(() => () => l(), [l]), je(() => {
    c().find((f) => f.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [c]), /* @__PURE__ */ d.jsx(
    ke.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: Ee(r.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(o, 50));
      }),
      onPointerMove: Ee(r.onPointerMove, () => {
        s.onItemLeave?.(), a.current === null && (a.current = window.setInterval(o, 50));
      }),
      onPointerLeave: Ee(r.onPointerLeave, () => {
        l();
      })
    }
  );
}), Kp = "SelectSeparator", Yp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ d.jsx(ke.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
Yp.displayName = Kp;
var tr = "SelectArrow", Xp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = uo(n), s = mt(tr, n), a = ht(tr, n);
    return s.open && a.position === "popper" ? /* @__PURE__ */ d.jsx(Zi, { ...r, ...o, ref: t }) : null;
  }
);
Xp.displayName = tr;
var qp = "SelectBubbleInput", Ra = i.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = i.useRef(null), s = Te(o, r), a = zf(t);
    return i.useEffect(() => {
      const c = r.current;
      if (!c) return;
      const l = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (a !== t && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(c, t), c.dispatchEvent(p);
      }
    }, [a, t]), /* @__PURE__ */ d.jsx(
      ke.select,
      {
        ...n,
        style: { ...Ji, ...n.style },
        ref: s,
        defaultValue: t
      }
    );
  }
);
Ra.displayName = qp;
function ka(e) {
  return e === "" || e === void 0;
}
function Pa(e) {
  const t = Et(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback(
    (a) => {
      const c = n.current + a;
      t(c), (function l(u) {
        n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
      })(c);
    },
    [t]
  ), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
function Ia(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Zp(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((u) => u !== n));
  const l = a.find(
    (u) => u.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Zp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Jp = aa, Qp = ca, em = da, tm = fa, nm = pa, om = va, rm = Ca, sm = ya;
const fo = i.createContext({ size: "base" }), Cr = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" }
}, im = Oe(
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
function am({ children: e, disabled: t, variant: n, size: o = "base", ...r }) {
  const s = t || n === "disabled";
  return /* @__PURE__ */ d.jsx(fo.Provider, { value: { size: o }, children: /* @__PURE__ */ d.jsx(Jp, { disabled: s, ...r, children: e }) });
}
function lm({ className: e, variant: t, leftIcon: n, children: o, slotId: r, ...s }) {
  const { size: a } = i.useContext(fo), c = Cr[a], l = i.useId();
  return /* @__PURE__ */ d.jsxs(
    Qp,
    {
      "data-slot": "select-trigger",
      "data-slot-id": r ?? l,
      className: oe(im({ variant: t }), c.height, c.rounded, c.px, c.gap, c.text, e),
      ...s,
      children: [
        /* @__PURE__ */ d.jsxs("span", { className: oe("flex items-center flex-1 min-w-0", c.gap), children: [
          n && /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 text-black-55", c.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: `#${n}` }) }),
          o
        ] }),
        /* @__PURE__ */ d.jsx(tm, { asChild: !0, children: /* @__PURE__ */ d.jsx("svg", { "aria-hidden": "true", className: oe("shrink-0 ml-auto", c.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-chevron-down" }) }) })
      ]
    }
  );
}
function cm({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(fo), s = Cr[r], a = i.useId();
  return /* @__PURE__ */ d.jsx(
    nm,
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
      children: /* @__PURE__ */ d.jsx(om, { className: "flex flex-col p-1 group/options", children: t })
    }
  );
}
function um({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(fo), s = Cr[r], a = i.useId();
  return /* @__PURE__ */ d.jsx(
    rm,
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
      children: /* @__PURE__ */ d.jsx(sm, { children: t })
    }
  );
}
function dm({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ d.jsx(em, { "data-slot": "select-value", "data-slot-id": t ?? o, className: e, ...n });
}
const fm = Oe(
  "flex items-center cursor-pointer transition-all text-left whitespace-nowrap",
  {
    variants: {
      variant: {
        basic: "bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-2",
        selected: "bg-neutral-1 text-black-85 active:bg-neutral-2"
      },
      size: {
        base: "h-8 px-2 text-sm leading-6 rounded-lg gap-1.5",
        lg: "h-10 px-3 text-base leading-6 rounded-xl gap-2"
      }
    },
    defaultVariants: { variant: "basic", size: "base" }
  }
);
function Zg({
  className: e,
  variant: t,
  size: n,
  onClick: o,
  children: r,
  slotId: s,
  ...a
}) {
  const c = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "navigation-item",
      "data-slot-id": s ?? c,
      className: oe(fm({ variant: t, size: n }), e),
      onClick: (l) => {
        l.stopPropagation(), o?.();
      },
      ...a,
      children: r
    }
  );
}
const pm = Oe("flex w-max min-w-full flex-col bg-white-100", {
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
function Jg({ className: e, variant: t, radius: n, data: o, children: r, slotId: s, ...a }) {
  const c = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "table",
      "data-slot-id": s ?? c,
      className: oe(pm({ variant: t, radius: n, className: e })),
      ...a,
      children: r
    }
  );
}
function Xe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Rs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function mm(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Rs(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Rs(e[r], null);
        }
      };
  };
}
function Nt(...e) {
  return i.useCallback(mm(...e), e);
}
function Ta(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const u = (p) => {
      const { scope: m, children: h, ...x } = p, g = m?.[e]?.[l] || c, v = i.useMemo(() => x, Object.values(x));
      return /* @__PURE__ */ d.jsx(g.Provider, { value: v, children: h });
    };
    u.displayName = s + "Provider";
    function f(p, m) {
      const h = m?.[e]?.[l] || c, x = i.useContext(h);
      if (x) return x;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const r = () => {
    const s = n.map((a) => i.createContext(a));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return r.scopeName = e, [o, hm(r, ...t)];
}
function hm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function gm(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    ks(r) && typeof _n == "function" && (r = _n(r._payload)), i.Children.forEach(r, (m) => {
      if (Cm(m)) {
        c = !0;
        const h = m;
        let x = "child" in h.props ? h.props.child : h.props.children;
        ks(x) && typeof _n == "function" && (x = _n(x._payload)), a = xm(h, x), l.push(a?.props?.children);
      } else
        l.push(m);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const u = a ? wm(a) : void 0, f = Nt(o, u);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Rm(e) : Em(e)
        );
      return r;
    }
    const p = bm(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : u), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Na = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function vm(e) {
  const t = (n) => "child" in n ? n.children(n.child) : n.children;
  return t.displayName = `${e}.Slottable`, t.__radixId = Na, t;
}
var xm = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function bm(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...c) => {
      const l = s(...c);
      return r(...c), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function wm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Cm(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Na;
}
var ym = /* @__PURE__ */ Symbol.for("react.lazy");
function ks(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === ym && "_payload" in e && Sm(e._payload);
}
function Sm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Em = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Rm = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, _n = i[" use ".trim().toString()], km = [
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
], gt = km.reduce((e, t) => {
  const n = /* @__PURE__ */ gm(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ d.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Pm(e, t) {
  e && qt.flushSync(() => e.dispatchEvent(t));
}
function po(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function Im(e, t = globalThis?.document) {
  const n = po(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var Tm = "DismissableLayer", nr = "dismissableLayer.update", Nm = "dismissableLayer.pointerDownOutside", Am = "dismissableLayer.focusOutside", Ps, Aa = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ja = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: c,
      ...l
    } = e, u = i.useContext(Aa), [f, p] = i.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, h] = i.useState({}), x = Nt(t, (R) => p(R)), g = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), C = g.indexOf(v), b = f ? g.indexOf(f) : -1, w = u.layersWithOutsidePointerEventsDisabled.size > 0, y = b >= C, E = _m((R) => {
      const k = R.target, z = [...u.branches].some((T) => T.contains(k));
      !y || z || (r?.(R), a?.(R), R.defaultPrevented || c?.());
    }, m), I = Dm((R) => {
      const k = R.target;
      [...u.branches].some((T) => T.contains(k)) || (s?.(R), a?.(R), R.defaultPrevented || c?.());
    }, m);
    return Im((R) => {
      b === u.layers.size - 1 && (o?.(R), !R.defaultPrevented && c && (R.preventDefault(), c()));
    }, m), i.useEffect(() => {
      if (f)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Ps = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), Is(), () => {
          n && (u.layersWithOutsidePointerEventsDisabled.delete(f), u.layersWithOutsidePointerEventsDisabled.size === 0 && (m.body.style.pointerEvents = Ps));
        };
    }, [f, m, n, u]), i.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), Is());
    }, [f, u]), i.useEffect(() => {
      const R = () => h({});
      return document.addEventListener(nr, R), () => document.removeEventListener(nr, R);
    }, []), /* @__PURE__ */ d.jsx(
      gt.div,
      {
        ...l,
        ref: x,
        style: {
          pointerEvents: w ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Xe(e.onFocusCapture, I.onFocusCapture),
        onBlurCapture: Xe(e.onBlurCapture, I.onBlurCapture),
        onPointerDownCapture: Xe(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
ja.displayName = Tm;
var jm = "DismissableLayerBranch", Om = i.forwardRef((e, t) => {
  const n = i.useContext(Aa), o = i.useRef(null), r = Nt(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ d.jsx(gt.div, { ...e, ref: r });
});
Om.displayName = jm;
function _m(e, t = globalThis?.document) {
  const n = po(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (c) => {
      if (c.target && !o.current) {
        let l = function() {
          Oa(
            Nm,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: c };
        c.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: !0 })) : l();
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
function Dm(e, t = globalThis?.document) {
  const n = po(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Oa(Am, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Is() {
  const e = new CustomEvent(nr);
  document.dispatchEvent(e);
}
function Oa(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Pm(r, s) : r.dispatchEvent(s);
}
var qe = globalThis?.document ? i.useLayoutEffect : () => {
}, Mm = i[" useId ".trim().toString()] || (() => {
}), $m = 0;
function Lm(e) {
  const [t, n] = i.useState(Mm());
  return qe(() => {
    n((o) => o ?? String($m++));
  }, [e]), t ? `radix-${t}` : "";
}
var zm = "Arrow", _a = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ d.jsx(
    gt.svg,
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
_a.displayName = zm;
var Fm = _a;
function Vm(e) {
  const [t, n] = i.useState(void 0);
  return qe(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const s = r[0];
        let a, c;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          a = u.inlineSize, c = u.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        n({ width: a, height: c });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var yr = "Popper", [Da, Ma] = Ta(yr), [Wm, $a] = Da(yr), La = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, a] = i.useState(void 0);
  return /* @__PURE__ */ d.jsx(
    Wm,
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
La.displayName = yr;
var za = "PopperAnchor", Fa = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = $a(za, n), a = i.useRef(null), c = s.onAnchorChange, l = i.useCallback(
      (x) => {
        a.current = x, x && c(x);
      },
      [c]
    ), u = Nt(t, l), f = i.useRef(null);
    i.useEffect(() => {
      if (!o)
        return;
      const x = f.current;
      f.current = o.current, x !== f.current && c(f.current);
    });
    const p = s.placementState && Er(s.placementState), m = p?.[0], h = p?.[1];
    return o ? null : /* @__PURE__ */ d.jsx(
      gt.div,
      {
        "data-radix-popper-side": m,
        "data-radix-popper-align": h,
        ...r,
        ref: u
      }
    );
  }
);
Fa.displayName = za;
var Sr = "PopperContent", [Hm, Bm] = Da(Sr), Va = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: c = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u,
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: x,
      ...g
    } = e, v = $a(Sr, n), [C, b] = i.useState(null), w = Nt(t, (ne) => b(ne)), [y, E] = i.useState(null), I = Vm(y), R = I?.width ?? 0, k = I?.height ?? 0, z = o + (s !== "center" ? "-" + s : ""), T = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, L = u ? Array.isArray(u) ? u : [u] : void 0, X = L !== void 0 && L.length > 0, H = {
      padding: T,
      boundary: L?.filter(Gm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: re, placement: U, isPositioned: K, middlewareData: B } = Ai({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (...ne) => Ti(...ne, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        ji({ mainAxis: r + k, alignmentAxis: a }),
        l && Oi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? _i() : void 0,
          ...H
        }),
        l && Di({ ...H }),
        Mi({
          ...H,
          apply: ({ elements: ne, rects: te, availableWidth: pe, availableHeight: ve }) => {
            const { width: ye, height: Ie } = te.reference, be = ne.floating.style;
            be.setProperty("--radix-popper-available-width", `${pe}px`), be.setProperty("--radix-popper-available-height", `${ve}px`), be.setProperty("--radix-popper-anchor-width", `${ye}px`), be.setProperty("--radix-popper-anchor-height", `${Ie}px`);
          }
        }),
        y && Li({ element: y, padding: c }),
        Km({ arrowWidth: R, arrowHeight: k }),
        m && $i({ strategy: "referenceHidden", ...H })
      ]
    }), ie = v.setPlacementState;
    qe(() => (ie(U), () => {
      ie(void 0);
    }), [U, ie]);
    const [M, P] = Er(U), J = po(x);
    qe(() => {
      K && J?.();
    }, [K, J]);
    const de = B.arrow?.x, ce = B.arrow?.y, ee = B.arrow?.centerOffset !== 0, [ue, $] = i.useState();
    return qe(() => {
      C && $(window.getComputedStyle(C).zIndex);
    }, [C]), /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...re,
          transform: K ? re.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ue,
          "--radix-popper-transform-origin": [
            B.transformOrigin?.x,
            B.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...B.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ d.jsx(
          Hm,
          {
            scope: n,
            placedSide: M,
            placedAlign: P,
            onArrowChange: E,
            arrowX: de,
            arrowY: ce,
            shouldHideArrow: ee,
            children: /* @__PURE__ */ d.jsx(
              gt.div,
              {
                "data-side": M,
                "data-align": P,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: K ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Va.displayName = Sr;
var Wa = "PopperArrow", Um = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ha = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Bm(Wa, o), a = Um[s.placedSide];
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
          Fm,
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
Ha.displayName = Wa;
function Gm(e) {
  return e !== null;
}
var Km = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, c = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, f] = Er(n), p = { start: "0%", center: "50%", end: "100%" }[f], m = (r.arrow?.x ?? 0) + c / 2, h = (r.arrow?.y ?? 0) + l / 2;
    let x = "", g = "";
    return u === "bottom" ? (x = a ? p : `${m}px`, g = `${-l}px`) : u === "top" ? (x = a ? p : `${m}px`, g = `${o.floating.height + l}px`) : u === "right" ? (x = `${-l}px`, g = a ? p : `${h}px`) : u === "left" && (x = `${o.floating.width + l}px`, g = a ? p : `${h}px`), { data: { x, y: g } };
  }
});
function Er(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ym = La, Xm = Fa, qm = Va, Zm = Ha, Jm = "Portal", Ba = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  qe(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? qt.createPortal(/* @__PURE__ */ d.jsx(gt.div, { ...o, ref: t }), a) : null;
});
Ba.displayName = Jm;
function Qm(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var Rr = (e) => {
  const { present: t, children: n } = e, o = eh(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = th(o.ref, nh(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Rr.displayName = "Presence";
function eh(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = Qm(a, {
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
    const u = Dn(o.current);
    s.current = c === "mounted" ? u : "none";
  }, [c]), qe(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const m = s.current, h = Dn(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(f && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), qe(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const g = Dn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Dn(o.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Ts(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function th(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const c = Ts(a, n);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const c = s[a];
          typeof c == "function" ? c() : Ts(o[a], null);
        }
      };
  }, []);
}
function Dn(e) {
  return e?.animationName || "none";
}
function nh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var oh = i[" useInsertionEffect ".trim().toString()] || qe;
function rh({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = sh({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : r;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const p = f.current;
      p !== c && console.warn(
        `${o} is changing from ${p ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, o]);
  }
  const u = i.useCallback(
    (f) => {
      if (c) {
        const p = ih(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, u];
}
function sh({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return oh(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function ih(e) {
  return typeof e == "function";
}
var ah = Object.freeze({
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
}), lh = "VisuallyHidden", Ua = i.forwardRef(
  (e, t) => /* @__PURE__ */ d.jsx(
    gt.span,
    {
      ...e,
      ref: t,
      style: { ...ah, ...e.style }
    }
  )
);
Ua.displayName = lh;
var ch = Ua, [mo] = Ta("Tooltip", [
  Ma
]), ho = Ma(), Ga = "TooltipProvider", uh = 700, or = "tooltip.open", [dh, kr] = mo(Ga), Ka = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = uh,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = i.useRef(!0), c = i.useRef(!1), l = i.useRef(0);
  return i.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ d.jsx(
    dh,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(l.current), a.current = !1);
      }, [o]),
      onClose: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          o
        ));
      }, [o]),
      isPointerInTransitRef: c,
      onPointerInTransitChange: i.useCallback((u) => {
        c.current = u;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
Ka.displayName = Ga;
var un = "Tooltip", [fh, mn] = mo(un), Ya = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: c
  } = e, l = kr(un, e.__scopeTooltip), u = ho(t), [f, p] = i.useState(null), m = Lm(), h = i.useRef(0), x = a ?? l.disableHoverableContent, g = c ?? l.delayDuration, v = i.useRef(!1), [C, b] = rh({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (R) => {
      R ? (l.onOpen(), document.dispatchEvent(new CustomEvent(or))) : l.onClose(), s?.(R);
    },
    caller: un
  }), w = i.useMemo(() => C ? v.current ? "delayed-open" : "instant-open" : "closed", [C]), y = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v.current = !1, b(!0);
  }, [b]), E = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), I = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      v.current = !0, b(!0), h.current = 0;
    }, g);
  }, [g, b]);
  return i.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ d.jsx(Ym, { ...u, children: /* @__PURE__ */ d.jsx(
    fh,
    {
      scope: t,
      contentId: m,
      open: C,
      stateAttribute: w,
      trigger: f,
      onTriggerChange: p,
      onTriggerEnter: i.useCallback(() => {
        l.isOpenDelayedRef.current ? I() : y();
      }, [l.isOpenDelayedRef, I, y]),
      onTriggerLeave: i.useCallback(() => {
        x ? E() : (window.clearTimeout(h.current), h.current = 0);
      }, [E, x]),
      onOpen: y,
      onClose: E,
      disableHoverableContent: x,
      children: n
    }
  ) });
};
Ya.displayName = un;
var rr = "TooltipTrigger", Xa = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = mn(rr, n), s = kr(rr, n), a = ho(n), c = i.useRef(null), l = Nt(t, c, r.onTriggerChange), u = i.useRef(!1), f = i.useRef(!1), p = i.useCallback(() => u.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ d.jsx(Xm, { asChild: !0, ...a, children: /* @__PURE__ */ d.jsx(
      gt.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: Xe(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !f.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: Xe(e.onPointerLeave, () => {
          r.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: Xe(e.onPointerDown, () => {
          r.open && r.onClose(), u.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: Xe(e.onFocus, () => {
          u.current || r.onOpen();
        }),
        onBlur: Xe(e.onBlur, r.onClose),
        onClick: Xe(e.onClick, r.onClose)
      }
    ) });
  }
);
Xa.displayName = rr;
var Pr = "TooltipPortal", [ph, mh] = mo(Pr, {
  forceMount: void 0
}), qa = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = mn(Pr, t);
  return /* @__PURE__ */ d.jsx(ph, { scope: t, forceMount: n, children: /* @__PURE__ */ d.jsx(Rr, { present: n || s.open, children: /* @__PURE__ */ d.jsx(Ba, { asChild: !0, container: r, children: o }) }) });
};
qa.displayName = Pr;
var Kt = "TooltipContent", Za = i.forwardRef(
  (e, t) => {
    const n = mh(Kt, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = mn(Kt, e.__scopeTooltip);
    return /* @__PURE__ */ d.jsx(Rr, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ d.jsx(Ja, { side: r, ...s, ref: t }) : /* @__PURE__ */ d.jsx(hh, { side: r, ...s, ref: t }) });
  }
), hh = i.forwardRef((e, t) => {
  const n = mn(Kt, e.__scopeTooltip), o = kr(Kt, e.__scopeTooltip), r = i.useRef(null), s = Nt(t, r), [a, c] = i.useState(null), { trigger: l, onClose: u } = n, f = r.current, { onPointerInTransitChange: p } = o, m = i.useCallback(() => {
    c(null), p(!1);
  }, [p]), h = i.useCallback(
    (x, g) => {
      const v = x.currentTarget, C = { x: x.clientX, y: x.clientY }, b = bh(C, v.getBoundingClientRect()), w = wh(C, b), y = Ch(g.getBoundingClientRect()), E = Sh([...w, ...y]);
      c(E), p(!0);
    },
    [p]
  );
  return i.useEffect(() => () => m(), [m]), i.useEffect(() => {
    if (l && f) {
      const x = (v) => h(v, f), g = (v) => h(v, l);
      return l.addEventListener("pointerleave", x), f.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", x), f.removeEventListener("pointerleave", g);
      };
    }
  }, [l, f, h, m]), i.useEffect(() => {
    if (a) {
      const x = (g) => {
        const v = g.target, C = { x: g.clientX, y: g.clientY }, b = l?.contains(v) || f?.contains(v), w = !yh(C, a);
        b ? m() : w && (m(), u());
      };
      return document.addEventListener("pointermove", x), () => document.removeEventListener("pointermove", x);
    }
  }, [l, f, a, u, m]), /* @__PURE__ */ d.jsx(Ja, { ...e, ref: s });
}), [gh, vh] = mo(un, { isInside: !1 }), xh = /* @__PURE__ */ vm("TooltipContent"), Ja = i.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...c
    } = e, l = mn(Kt, n), u = ho(n), { onClose: f } = l;
    return i.useEffect(() => (document.addEventListener(or, f), () => document.removeEventListener(or, f)), [f]), i.useEffect(() => {
      if (l.trigger) {
        const p = (m) => {
          m.target instanceof Node && m.target.contains(l.trigger) && f();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [l.trigger, f]), /* @__PURE__ */ d.jsx(
      ja,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ d.jsxs(
          qm,
          {
            "data-state": l.stateAttribute,
            ...u,
            ...c,
            ref: t,
            style: {
              ...c.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ d.jsx(xh, { children: o }),
              /* @__PURE__ */ d.jsx(gh, { scope: n, isInside: !0, children: /* @__PURE__ */ d.jsx(ch, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Za.displayName = Kt;
var Qa = "TooltipArrow", el = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = ho(n);
    return vh(
      Qa,
      n
    ).isInside ? null : /* @__PURE__ */ d.jsx(Zm, { ...r, ...o, ref: t });
  }
);
el.displayName = Qa;
function bh(e, t) {
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
function wh(e, t, n = 5) {
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
function Ch(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function yh(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const c = t[s], l = t[a], u = c.x, f = c.y, p = l.x, m = l.y;
    f > o != m > o && n < (p - u) * (o - f) / (m - f) + u && (r = !r);
  }
  return r;
}
function Sh(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Eh(t);
}
function Eh(e) {
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
var Rh = Ka, kh = Ya, Ph = Xa, Ih = qa, Th = Za, Nh = el;
const Ah = Oe(
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
function jh({ children: e, delayDuration: t = 300, ...n }) {
  return /* @__PURE__ */ d.jsx(Rh, { delayDuration: t, ...n, children: e });
}
function Ir({ children: e, ...t }) {
  return /* @__PURE__ */ d.jsx(kh, { ...t, children: e });
}
const Tr = Ph;
function Nr({
  className: e,
  size: t,
  sideOffset: n = 4,
  children: o,
  slotId: r,
  ...s
}) {
  const a = i.useId();
  return /* @__PURE__ */ d.jsx(Ih, { children: /* @__PURE__ */ d.jsxs(
    Th,
    {
      "data-slot": "tooltip-content",
      "data-slot-id": r ?? a,
      sideOffset: n,
      className: oe(Ah({ size: t }), e),
      ...s,
      children: [
        o,
        /* @__PURE__ */ d.jsx(
          Nh,
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
function Oh(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var en = (e) => {
  const { present: t, children: n } = e, o = _h(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Te(o.ref, Dh(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
en.displayName = "Presence";
function _h(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = Oh(a, {
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
    const u = Mn(o.current);
    s.current = c === "mounted" ? u : "none";
  }, [c]), je(() => {
    const u = o.current, f = r.current;
    if (f !== e) {
      const m = s.current, h = Mn(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(f && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), je(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (h) => {
        const g = Mn(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Mn(o.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Mn(e) {
  return e?.animationName || "none";
}
function Dh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var go = "Popover", [tl] = fn(go, [
  so
]), hn = so(), [Mh, vt] = tl(go), nl = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !1
  } = e, c = hn(t), l = i.useRef(null), [u, f] = i.useState(!1), [p, m] = Kn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: go
  });
  return /* @__PURE__ */ d.jsx(Xi, { ...c, children: /* @__PURE__ */ d.jsx(
    Mh,
    {
      scope: t,
      contentId: St(),
      triggerRef: l,
      open: p,
      onOpenChange: m,
      onOpenToggle: i.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: u,
      onCustomAnchorAdd: i.useCallback(() => f(!0), []),
      onCustomAnchorRemove: i.useCallback(() => f(!1), []),
      modal: a,
      children: n
    }
  ) });
};
nl.displayName = go;
var ol = "PopoverAnchor", $h = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = vt(ol, n), s = hn(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: c } = r;
    return i.useEffect(() => (a(), () => c()), [a, c]), /* @__PURE__ */ d.jsx(vr, { ...s, ...o, ref: t });
  }
);
$h.displayName = ol;
var rl = "PopoverTrigger", sl = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = vt(rl, n), s = hn(n), a = Te(t, r.triggerRef), c = /* @__PURE__ */ d.jsx(
      ke.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": ul(r.open),
        ...o,
        ref: a,
        onClick: Ee(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? c : /* @__PURE__ */ d.jsx(vr, { asChild: !0, ...s, children: c });
  }
);
sl.displayName = rl;
var Ar = "PopoverPortal", [Lh, zh] = tl(Ar, {
  forceMount: void 0
}), il = (e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = vt(Ar, t);
  return /* @__PURE__ */ d.jsx(Lh, { scope: t, forceMount: n, children: /* @__PURE__ */ d.jsx(en, { present: n || s.open, children: /* @__PURE__ */ d.jsx(xr, { asChild: !0, container: r, children: o }) }) });
};
il.displayName = Ar;
var Yt = "PopoverContent", al = i.forwardRef(
  (e, t) => {
    const n = zh(Yt, e.__scopePopover), { forceMount: o = n.forceMount, ...r } = e, s = vt(Yt, e.__scopePopover);
    return /* @__PURE__ */ d.jsx(en, { present: o || s.open, children: s.modal ? /* @__PURE__ */ d.jsx(Vh, { ...r, ref: t }) : /* @__PURE__ */ d.jsx(Wh, { ...r, ref: t }) });
  }
);
al.displayName = Yt;
var Fh = /* @__PURE__ */ Ut("PopoverContent.RemoveScroll"), Vh = i.forwardRef(
  (e, t) => {
    const n = vt(Yt, e.__scopePopover), o = i.useRef(null), r = Te(t, o), s = i.useRef(!1);
    return i.useEffect(() => {
      const a = o.current;
      if (a) return br(a);
    }, []), /* @__PURE__ */ d.jsx(ao, { as: Fh, allowPinchZoom: !0, children: /* @__PURE__ */ d.jsx(
      ll,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Ee(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), s.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Ee(
          e.onPointerDownOutside,
          (a) => {
            const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || l;
            s.current = u;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: Ee(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Wh = i.forwardRef(
  (e, t) => {
    const n = vt(Yt, e.__scopePopover), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ d.jsx(
      ll,
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
), ll = i.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: o,
      onOpenAutoFocus: r,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: c,
      onPointerDownOutside: l,
      onFocusOutside: u,
      onInteractOutside: f,
      ...p
    } = e, m = vt(Yt, n), h = hn(n);
    return lr(), /* @__PURE__ */ d.jsx(
      eo,
      {
        asChild: !0,
        loop: !0,
        trapped: o,
        onMountAutoFocus: r,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ d.jsx(
          Qn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: f,
            onEscapeKeyDown: c,
            onPointerDownOutside: l,
            onFocusOutside: u,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ d.jsx(
              qi,
              {
                "data-state": ul(m.open),
                role: "dialog",
                id: m.contentId,
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
), cl = "PopoverClose", Hh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = vt(cl, n);
    return /* @__PURE__ */ d.jsx(
      ke.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: Ee(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Hh.displayName = cl;
var Bh = "PopoverArrow", Uh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = hn(n);
    return /* @__PURE__ */ d.jsx(Zi, { ...r, ...o, ref: t });
  }
);
Uh.displayName = Bh;
function ul(e) {
  return e ? "open" : "closed";
}
var Gh = nl, Kh = sl, Yh = il, Xh = al;
const vo = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" }
}, Fe = i.createContext({ size: "base", close: () => {
}, isOpen: !1 }), qh = i.createContext({ isSub: !1, close: () => {
}, open: () => {
}, isOpen: !1, scheduleClose: () => {
}, cancelClose: () => {
} });
function xo({ children: e, size: t = "base", ...n }) {
  const [o, r] = i.useState(n.open ?? !1), s = () => a(!1), a = (c) => {
    r(c), n.onOpenChange?.(c);
  };
  return i.useEffect(() => {
    if (!o) return;
    const c = (l) => {
      l.target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]') || s();
    };
    return window.addEventListener("scroll", c, { capture: !0 }), () => window.removeEventListener("scroll", c, { capture: !0 });
  }, [o]), /* @__PURE__ */ d.jsx(Gh, { ...n, open: n.open ?? o, onOpenChange: a, children: /* @__PURE__ */ d.jsx(Fe.Provider, { value: { size: t, close: s, isOpen: n.open ?? o }, children: e }) });
}
const bo = Kh, Zh = Oe(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
);
function wo({ className: e, sideOffset: t = 4, align: n = "start", slotId: o, ...r }) {
  const { size: s } = i.useContext(Fe), a = vo[s], c = i.useId();
  return /* @__PURE__ */ d.jsx(Yh, { children: /* @__PURE__ */ d.jsx(
    Xh,
    {
      "data-slot": "popover-content",
      "data-slot-id": o ?? c,
      sideOffset: t,
      align: n,
      className: oe(
        Zh(),
        a.rounded === "rounded" ? "rounded-md" : a.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function Ns({ className: e, disabled: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(Fe), s = vo[r], a = i.useId();
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
function _e({ className: e, closeOnClick: t = !1, onClick: n, children: o, size: r, slotId: s, ...a }) {
  const { size: c } = i.useContext(Fe), { isSub: l, close: u } = i.useContext(qh), { close: f } = i.useContext(Fe), p = vo[c], m = i.useId();
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "popover-menu-item",
      "data-slot-id": s ?? m,
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
        t ? ((l ? u : f)(), setTimeout(() => n?.(h), 150)) : n?.(h);
      },
      ...a,
      children: o
    }
  );
}
function Xt({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(Fe), r = vo[o], s = i.useId();
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
function lt({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ d.jsx("div", { "data-slot": "popover-separator", "data-slot-id": t ?? o, className: oe("-mx-1 my-1 h-px bg-neutral-2", e), ...n });
}
var Co = "Dialog", [dl] = fn(Co), [Jh, Ve] = dl(Co), fl = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !0
  } = e, c = i.useRef(null), l = i.useRef(null), [u, f] = Kn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: Co
  });
  return /* @__PURE__ */ d.jsx(
    Jh,
    {
      scope: t,
      triggerRef: c,
      contentRef: l,
      contentId: St(),
      titleId: St(),
      descriptionId: St(),
      open: u,
      onOpenChange: f,
      onOpenToggle: i.useCallback(() => f((p) => !p), [f]),
      modal: a,
      children: n
    }
  );
};
fl.displayName = Co;
var pl = "DialogTrigger", Qh = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(pl, n), s = Te(t, r.triggerRef);
    return /* @__PURE__ */ d.jsx(
      ke.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": _r(r.open),
        ...o,
        ref: s,
        onClick: Ee(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Qh.displayName = pl;
var jr = "DialogPortal", [eg, ml] = dl(jr, {
  forceMount: void 0
}), hl = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = Ve(jr, t);
  return /* @__PURE__ */ d.jsx(eg, { scope: t, forceMount: n, children: i.Children.map(o, (a) => /* @__PURE__ */ d.jsx(en, { present: n || s.open, children: /* @__PURE__ */ d.jsx(xr, { asChild: !0, container: r, children: a }) })) });
};
hl.displayName = jr;
var Xn = "DialogOverlay", gl = i.forwardRef(
  (e, t) => {
    const n = ml(Xn, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Ve(Xn, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ d.jsx(en, { present: o || s.open, children: /* @__PURE__ */ d.jsx(ng, { ...r, ref: t }) }) : null;
  }
);
gl.displayName = Xn;
var tg = /* @__PURE__ */ Ut("DialogOverlay.RemoveScroll"), ng = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(Xn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ d.jsx(ao, { as: tg, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ d.jsx(
        ke.div,
        {
          "data-state": _r(r.open),
          ...o,
          ref: t,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), It = "DialogContent", vl = i.forwardRef(
  (e, t) => {
    const n = ml(It, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Ve(It, e.__scopeDialog);
    return /* @__PURE__ */ d.jsx(en, { present: o || s.open, children: s.modal ? /* @__PURE__ */ d.jsx(og, { ...r, ref: t }) : /* @__PURE__ */ d.jsx(rg, { ...r, ref: t }) });
  }
);
vl.displayName = It;
var og = i.forwardRef(
  (e, t) => {
    const n = Ve(It, e.__scopeDialog), o = i.useRef(null), r = Te(t, n.contentRef, o);
    return i.useEffect(() => {
      const s = o.current;
      if (s) return br(s);
    }, []), /* @__PURE__ */ d.jsx(
      xl,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Ee(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Ee(e.onPointerDownOutside, (s) => {
          const a = s.detail.originalEvent, c = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || c) && s.preventDefault();
        }),
        onFocusOutside: Ee(
          e.onFocusOutside,
          (s) => s.preventDefault()
        )
      }
    );
  }
), rg = i.forwardRef(
  (e, t) => {
    const n = Ve(It, e.__scopeDialog), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ d.jsx(
      xl,
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
), xl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: s, ...a } = e, c = Ve(It, n), l = i.useRef(null), u = Te(t, l);
    return lr(), /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        eo,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: r,
          onUnmountAutoFocus: s,
          children: /* @__PURE__ */ d.jsx(
            Qn,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": _r(c.open),
              ...a,
              ref: u,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(ag, { titleId: c.titleId }),
        /* @__PURE__ */ d.jsx(cg, { contentRef: l, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), Or = "DialogTitle", sg = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(Or, n);
    return /* @__PURE__ */ d.jsx(ke.h2, { id: r.titleId, ...o, ref: t });
  }
);
sg.displayName = Or;
var bl = "DialogDescription", ig = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(bl, n);
    return /* @__PURE__ */ d.jsx(ke.p, { id: r.descriptionId, ...o, ref: t });
  }
);
ig.displayName = bl;
var wl = "DialogClose", Cl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(wl, n);
    return /* @__PURE__ */ d.jsx(
      ke.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: Ee(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Cl.displayName = wl;
function _r(e) {
  return e ? "open" : "closed";
}
var yl = "DialogTitleWarning", [Qg, Sl] = td(yl, {
  contentName: It,
  titleName: Or,
  docsSlug: "dialog"
}), ag = ({ titleId: e }) => {
  const t = Sl(yl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, lg = "DialogDescriptionWarning", cg = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Sl(lg).contentName}}.`;
  return i.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, ug = fl, dg = hl, fg = gl, pg = vl, mg = Cl;
const hg = i.createContext({ size: "base" }), gg = {
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
}, vg = ug, xg = dg, bg = Oe(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
);
function wg({ className: e, overlayClassName: t, size: n = "base", children: o, slotId: r, ...s }) {
  const a = gg[n], c = i.useId();
  return /* @__PURE__ */ d.jsx(hg.Provider, { value: { size: n }, children: /* @__PURE__ */ d.jsxs(xg, { children: [
    /* @__PURE__ */ d.jsx(fg, { className: oe("fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t) }),
    /* @__PURE__ */ d.jsxs(
      pg,
      {
        "data-slot": "dialog-content",
        "data-slot-id": r ?? c,
        className: oe(
          bg(),
          a.content,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          e
        ),
        ...s,
        children: [
          o,
          /* @__PURE__ */ d.jsx(mg, { asChild: !0, children: /* @__PURE__ */ d.jsx(Pe, { variant: "ghost", size: a.close.buttonSize, className: oe("absolute", a.close.position), children: /* @__PURE__ */ d.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ d.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) }) })
        ]
      }
    )
  ] }) });
}
function ct({ children: e, className: t, onDoubleClick: n, onClick: o }) {
  const r = i.useRef(null), [s, a] = i.useState(!1);
  return i.useEffect(() => {
    r.current && a(r.current.scrollWidth > r.current.clientWidth);
  }, [e]), s ? /* @__PURE__ */ d.jsxs(Ir, { children: [
    /* @__PURE__ */ d.jsx(Tr, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        ref: r,
        className: t,
        onDoubleClick: n,
        onClick: o,
        children: e
      }
    ) }),
    /* @__PURE__ */ d.jsx(Nr, { side: "top", size: "base", children: /* @__PURE__ */ d.jsx("p", { children: e }) })
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
function El({ value: e, isEditing: t, isSelected: n, onStartEdit: o, editingValue: r, onUpdateEditingValue: s, onFinishEdit: a, onCancelEdit: c, readOnly: l, isCellHovering: u, onSelectCell: f, options: p, cellData: m, onChange: h }) {
  const x = i.useRef(null), [g, v] = i.useState(!1), C = p?.fields ?? [], b = m?.textFields ?? [], w = i.useRef(!1), y = i.useRef(!1);
  i.useEffect(() => {
    if (x.current) {
      const T = x.current, L = t && !w.current;
      if (t) {
        const X = r ?? String(e);
        if (T.textContent !== X && (T.textContent = X), document.activeElement !== T && T.focus(), L && !y.current) {
          const H = window.getSelection(), Q = document.createRange();
          Q.selectNodeContents(T), Q.collapse(!1), H?.removeAllRanges(), H?.addRange(Q);
        }
        y.current = !1;
      } else if (n && (T.textContent !== String(e) && (T.textContent = String(e)), !l && document.activeElement !== T && T.focus(), !l)) {
        const X = window.getSelection(), H = document.createRange();
        H.selectNodeContents(T), X?.removeAllRanges(), X?.addRange(H);
      }
      w.current = t;
    }
  }, [t, n, r, e, l]);
  const E = (T) => {
    T.stopPropagation(), n || f?.(), v(!0);
  }, I = (T) => {
    h?.({ textFields: T }), v(!1);
  }, R = C.length > 0, k = !l && R && (n || u), z = /* @__PURE__ */ d.jsxs(xo, { open: g, onOpenChange: v, children: [
    /* @__PURE__ */ d.jsx(bo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      Pe,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-more",
        className: oe(
          "ml-auto shrink-0",
          !k && "opacity-0 pointer-events-none"
        ),
        onClick: E
      }
    ) }),
    /* @__PURE__ */ d.jsx(wo, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ d.jsx(
      Cg,
      {
        fields: C,
        textFields: b,
        onSave: I
      }
    ) })
  ] });
  return t || n ? /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: x,
        contentEditable: !l,
        suppressContentEditableWarning: !0,
        onClick: (T) => {
          !t && n && !l && (T.stopPropagation(), o?.(String(e)));
        },
        onInput: (T) => {
          const L = T.currentTarget.textContent || "";
          t ? s?.(L) : n && !l && (y.current = !0, o?.(L));
        },
        onBlur: () => {
          t && a?.();
        },
        onKeyDown: (T) => {
          if (!t && n && T.key === " ") {
            T.preventDefault(), T.stopPropagation();
            const L = String(e);
            o?.(L + " ");
            return;
          }
          t && (T.key === "Enter" && (T.preventDefault(), a?.()), T.key === "Escape" && (T.preventDefault(), c?.()));
        },
        onDoubleClick: (T) => {
          !t && n && !l && (T.stopPropagation(), o?.(String(e)));
        },
        onPaste: (T) => {
          if (!t && n) {
            T.preventDefault(), T.stopPropagation();
            return;
          }
          if (t) {
            T.preventDefault();
            const L = T.clipboardData.getData("text/plain");
            document.execCommand("insertText", !1, L);
          }
        },
        className: oe(
          "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
          // 选中态：隐藏光标，看起来像普通文本
          n && !t && "caret-transparent cursor-pointer selection:bg-transparent"
        )
      }
    ),
    z
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ d.jsx(
      ct,
      {
        className: oe("flex-1 min-h-6 truncate", !l && "cursor-pointer"),
        onDoubleClick: l ? void 0 : () => o?.(),
        children: String(e) || " "
      }
    ),
    z
  ] });
}
function Cg({ fields: e, textFields: t, onSave: n }) {
  const [o, r] = i.useState(() => {
    const a = {};
    return e.forEach((c) => {
      const l = t.find((u) => u.fieldId === c.id);
      a[c.id] = l?.content ?? "";
    }), a;
  }), s = () => {
    n(e.map((a) => ({ fieldId: a.id, content: o[a.id] ?? "" })));
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "text-field-manager",
      onKeyDown: (a) => {
        a.key === "Enter" && (a.preventDefault(), s()), a.key === "Escape" && (a.preventDefault(), n(t));
      },
      children: [
        e.map((a) => /* @__PURE__ */ d.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ d.jsx(Xt, { children: a.label }),
          /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
            ut,
            {
              variant: "basic",
              size: "base",
              value: o[a.id] ?? "",
              onChange: (c) => r((l) => ({ ...l, [a.id]: c.target.value })),
              placeholder: `输入${a.label}`,
              className: "w-full"
            }
          ) })
        ] }, a.id)),
        /* @__PURE__ */ d.jsx(lt, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Pe, { variant: "outline", size: "base", className: "flex-1", onClick: () => n(t), children: "取消" }),
          /* @__PURE__ */ d.jsx(Pe, { variant: "primary", size: "base", className: "flex-1", onClick: s, children: "保存" })
        ] })
      ]
    }
  );
}
function yg({ value: e, isEditing: t, isSelected: n, onStartEdit: o, editingValue: r, onUpdateEditingValue: s, onFinishEdit: a, onCancelEdit: c, readOnly: l }) {
  const u = i.useRef(null), f = i.useRef(!1), p = i.useRef(!1);
  return i.useEffect(() => {
    if (u.current) {
      const m = u.current, h = t && !f.current;
      if (t) {
        const x = r ?? String(e);
        if (m.textContent !== x && (m.textContent = x), document.activeElement !== m && m.focus(), h && !p.current) {
          const g = window.getSelection(), v = document.createRange();
          v.selectNodeContents(m), v.collapse(!1), g?.removeAllRanges(), g?.addRange(v);
        }
        p.current = !1;
      } else if (n && (m.textContent !== String(e) && (m.textContent = String(e)), !l && document.activeElement !== m && m.focus(), !l)) {
        const x = window.getSelection(), g = document.createRange();
        g.selectNodeContents(m), x?.removeAllRanges(), x?.addRange(g);
      }
      f.current = t;
    }
  }, [t, n, r, e, l]), t || n ? /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ d.jsx(
    "div",
    {
      ref: u,
      contentEditable: !l,
      suppressContentEditableWarning: !0,
      onClick: (m) => {
        !t && n && !l && (m.stopPropagation(), o?.(String(e)));
      },
      onInput: (m) => {
        const h = m.currentTarget.textContent || "";
        if (!(h === "" || /^-?\d*\.?\d*$/.test(h))) {
          const g = r ?? String(e);
          m.currentTarget.textContent = g;
          return;
        }
        t ? s?.(h) : n && !l && (p.current = !0, o?.(h));
      },
      onBlur: () => {
        t && a?.();
      },
      onKeyDown: (m) => {
        if (!t && n && m.key === " ") {
          m.preventDefault(), m.stopPropagation();
          const h = String(e);
          o?.(h + " ");
          return;
        }
        t && (m.key === "Enter" && (m.preventDefault(), a?.()), m.key === "Escape" && (m.preventDefault(), c?.()));
      },
      onDoubleClick: (m) => {
        !t && n && !l && (m.stopPropagation(), o?.(String(e)));
      },
      onPaste: (m) => {
        if (!t && n) {
          m.preventDefault(), m.stopPropagation();
          return;
        }
        if (t) {
          m.preventDefault();
          const h = m.clipboardData.getData("text/plain");
          (h === "" || /^-?\d*\.?\d*$/.test(h)) && document.execCommand("insertText", !1, h);
        }
      },
      className: oe(
        "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
        // 选中态：隐藏光标，看起来像普通文本
        n && !t && "caret-transparent cursor-pointer selection:bg-transparent"
      )
    }
  ) }) : /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ d.jsx(
    ct,
    {
      className: oe("flex-1 min-h-6 truncate", !l && "cursor-pointer"),
      onDoubleClick: l ? void 0 : () => o?.(),
      children: String(e) || " "
    }
  ) });
}
function Sg({
  value: e,
  options: t,
  onChange: n,
  onUpdateColumnOptions: o,
  isSelected: r,
  isCellHovering: s,
  onSelectCell: a,
  readOnly: c
}) {
  const l = t?.items ?? [], [u, f] = i.useState(!1), [p, m] = i.useState(""), h = i.useMemo(() => l.find((R) => R.value === e)?.label || "", [l, e]), x = i.useMemo(() => {
    if (!p.trim()) return l;
    const I = p.toLowerCase();
    return l.filter((R) => R.label.toLowerCase().includes(I));
  }, [l, p]), g = i.useMemo(() => {
    if (!p.trim()) return !0;
    const I = p.toLowerCase();
    return l.some((R) => R.label.toLowerCase() === I);
  }, [l, p]), v = () => {
    if (!p.trim() || !o) return;
    const I = p.trim(), R = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: I
    };
    f(!1), setTimeout(() => {
      const k = [...l, R];
      o({ ...t, items: k }), n?.(R.value);
    }, 200);
  }, C = (I) => {
    n?.(I), f(!1);
  }, b = () => {
    c || r || a?.();
  }, w = () => {
    c || (r || a?.(), f(!0));
  }, y = (I) => {
    I.stopPropagation(), r || a?.(), f(!0);
  }, E = !c && (r || s);
  return /* @__PURE__ */ d.jsxs(xo, { open: u, onOpenChange: (I) => {
    I && m(""), f(I);
  }, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      /* @__PURE__ */ d.jsx(
        ct,
        {
          className: oe(
            "flex-1 min-h-6 truncate",
            !c && "cursor-pointer",
            !h && "text-black-25"
          ),
          onClick: b,
          onDoubleClick: w,
          children: h || " "
        }
      ),
      /* @__PURE__ */ d.jsx(bo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
        Pe,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-chevron-down",
          className: oe(
            "ml-auto shrink-0",
            !E && "opacity-0 pointer-events-none"
          ),
          onClick: y
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsx(wo, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ d.jsxs("div", { onClick: (I) => I.stopPropagation(), onDoubleClick: (I) => I.stopPropagation(), onMouseDown: (I) => I.stopPropagation(), children: [
      /* @__PURE__ */ d.jsx(
        ut,
        {
          variant: "basic",
          size: "base",
          value: p,
          onChange: (I) => m(I.target.value),
          placeholder: "搜索或添加选项",
          className: "w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none",
          onKeyDown: (I) => {
            I.key === "Enter" && !g && p.trim() && (I.preventDefault(), v());
          }
        }
      ),
      /* @__PURE__ */ d.jsx(lt, { className: "!my-1" }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col group/options", children: [
        x.length > 0 ? x.map((I) => /* @__PURE__ */ d.jsx(
          Ns,
          {
            className: oe(
              I.value === e && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
              I.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !I.disabled && C(I.value),
            children: /* @__PURE__ */ d.jsx(ct, { className: "flex-1 min-w-0 truncate", children: I.label })
          },
          I.value
        )) : !p.trim() && l.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: "relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default", children: "没有选项" }) : null,
        p.trim() && !g && /* @__PURE__ */ d.jsx(
          Ns,
          {
            className: "text-black-55 hover:text-black-85",
            onClick: v,
            children: /* @__PURE__ */ d.jsx(ct, { className: "flex-1 min-w-0 truncate", children: `添加选项 "${p.trim()}"` })
          }
        )
      ] })
    ] }) })
  ] });
}
function Eg({ cellData: e, isSelected: t, isCellHovering: n, onChange: o, onSelectCell: r, readOnly: s }) {
  const a = e?.buttonConfig, [c, l] = i.useState(!1), u = (v) => {
    o?.({ buttonConfig: v }), l(!1);
  }, f = () => {
    const v = a?.url?.trim();
    return v ? v.startsWith("http://") || v.startsWith("https://") || v.includes(".") : !1;
  }, p = (v) => {
    if (v.stopPropagation(), f()) {
      const C = a.url.trim();
      C.startsWith("http://") || C.startsWith("https://") ? window.open(C, "_blank", "noopener,noreferrer") : window.open(`https://${C}`, "_blank", "noopener,noreferrer");
    } else
      r?.(), l(!0);
  }, m = (v) => {
    v.stopPropagation(), t || r?.(), l(!0);
  }, h = (v) => {
    v.stopPropagation(), !s && (t || r?.(), l(!0));
  }, x = !s && (t || n), g = a?.label?.trim() || a?.url?.trim();
  return /* @__PURE__ */ d.jsxs(xo, { open: c, onOpenChange: l, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", onDoubleClick: h, children: [
      g && /* @__PURE__ */ d.jsx("div", { className: "min-w-0 shrink", children: a?.label ? (
        // 文字按钮：link 样式，超长截断 + Tooltip
        /* @__PURE__ */ d.jsx(
          Pe,
          {
            variant: "link",
            size: "base",
            onClick: p,
            className: "max-w-full",
            children: /* @__PURE__ */ d.jsx(ct, { className: "truncate", children: a.label })
          }
        )
      ) : (
        // 图标按钮：只有 URL 无名称时显示
        /* @__PURE__ */ d.jsx(
          Pe,
          {
            variant: "link",
            size: "iconBase",
            leftIcon: "icon-jump",
            onClick: p
          }
        )
      ) }),
      /* @__PURE__ */ d.jsx(bo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
        Pe,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-link",
          className: oe(
            "ml-auto shrink-0",
            !x && "opacity-0 pointer-events-none"
          ),
          onClick: m
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsx(wo, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ d.jsx("div", { onClick: (v) => v.stopPropagation(), onDoubleClick: (v) => v.stopPropagation(), onMouseDown: (v) => v.stopPropagation(), children: /* @__PURE__ */ d.jsx(
      Rg,
      {
        config: a,
        onSave: u
      }
    ) }) })
  ] });
}
function Rg({ config: e, onSave: t }) {
  const [n, o] = i.useState(e?.label ?? ""), [r, s] = i.useState(e?.url ?? ""), a = i.useId(), c = () => {
    t({ label: n, url: r });
  }, l = () => {
    t(e ?? {});
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "button-link-manager",
      "data-slot-id": a,
      onKeyDown: (u) => {
        u.key === "Enter" && (u.preventDefault(), c()), u.key === "Escape" && (u.preventDefault(), l());
      },
      children: [
        /* @__PURE__ */ d.jsx(Xt, { children: "链接名" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            value: n,
            onChange: (u) => o(u.target.value),
            placeholder: "输入链接名",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(Xt, { children: "超链接" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            value: r,
            onChange: (u) => s(u.target.value),
            placeholder: "输入超链接",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(lt, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Pe, { variant: "outline", size: "base", className: "flex-1", onClick: l, children: "取消" }),
          /* @__PURE__ */ d.jsx(Pe, { variant: "primary", size: "base", className: "flex-1", onClick: c, children: "保存" })
        ] })
      ]
    }
  );
}
function kg({ file: e, isSelected: t, isPreviewOpen: n, onPreview: o, onRemove: r }) {
  const [s, a] = i.useState(null), c = i.useRef(null), l = i.useRef(null), u = i.useRef(null), f = e.type.startsWith("image/"), p = e.type.startsWith("video/");
  i.useEffect(() => {
    if (f) {
      const C = URL.createObjectURL(e);
      return a(C), () => URL.revokeObjectURL(C);
    } else if (p) {
      const C = URL.createObjectURL(e), b = l.current, w = u.current;
      return b && w && (b.src = C, b.addEventListener("loadeddata", () => {
        w.width = b.videoWidth || 80, w.height = b.videoHeight || 80;
        const y = w.getContext("2d");
        if (y) {
          y.drawImage(b, 0, 0, w.width, w.height);
          const E = w.toDataURL("image/jpeg", 0.8);
          a(E);
        }
      }), b.currentTime = 0.1), () => URL.revokeObjectURL(C);
    }
    return () => {
    };
  }, [e, f, p]);
  const m = () => {
    o?.();
  }, h = (C) => {
    C.stopPropagation(), c.current?.click();
  }, x = (C) => {
    C.stopPropagation(), r?.();
  }, g = (C) => {
    C.target.files?.[0], C.target.value = "";
  }, v = /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer",
      onClick: m,
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
    t ? /* @__PURE__ */ d.jsxs(Ir, { children: [
      /* @__PURE__ */ d.jsx(Tr, { asChild: !0, children: v }),
      /* @__PURE__ */ d.jsxs(Nr, { side: "top", sideOffset: 4, className: "h-10 flex items-center px-0.5", children: [
        /* @__PURE__ */ d.jsx(
          Pe,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-edit",
            onClick: h,
            className: "text-white-60 hover:text-white-100"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Pe,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-delete",
            onClick: x,
            className: "text-white-60 hover:text-white-100"
          }
        )
      ] })
    ] }) : v,
    /* @__PURE__ */ d.jsx("input", { ref: c, type: "file", className: "hidden", onChange: g }),
    /* @__PURE__ */ d.jsx("video", { ref: l, className: "hidden", preload: "metadata", crossOrigin: "anonymous" }),
    /* @__PURE__ */ d.jsx("canvas", { ref: u, className: "hidden" })
  ] });
}
function Pg({ cellData: e, isSelected: t, isCellHovering: n, onChange: o, readOnly: r }) {
  const s = e?.attachmentFiles, a = i.useRef(null), c = i.useRef(null), [l, u] = i.useState(null), [f, p] = i.useState([]), m = s ?? [], h = m.length, [x, g] = i.useState(h);
  i.useEffect(() => {
    const T = c.current;
    if (!T) return;
    const L = () => {
      const H = T.clientWidth, re = Math.max(1, Math.floor(H / 40));
      g(re);
    };
    L();
    const X = new ResizeObserver(L);
    return X.observe(T), () => X.disconnect();
  }, [h]);
  const v = h > x, C = h - x;
  i.useEffect(() => {
    const T = m.map((L) => URL.createObjectURL(L));
    return p(T), () => T.forEach((L) => URL.revokeObjectURL(L));
  }, [s]);
  const b = (T) => {
    o?.({ attachmentFiles: T });
  }, w = () => {
    a.current?.click();
  }, y = (T) => {
    const L = Array.from(T.target.files || []);
    L.length > 0 && b([...m, ...L]), T.target.value = "";
  }, E = (T) => {
    const L = m.filter((X, H) => H !== T);
    b(L), l === T && u(null);
  }, I = (T) => {
    u(T);
  }, R = () => {
    l !== null && l > 0 && u(l - 1);
  }, k = () => {
    l !== null && l < h - 1 && u(l + 1);
  };
  i.useEffect(() => {
    if (l === null) return;
    const T = (L) => {
      L.key === "ArrowLeft" ? R() : L.key === "ArrowRight" && k();
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [l]);
  const z = !r && (t || n);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { ref: c, className: "flex items-center gap-2 min-w-0 flex-1", children: [
      h > 0 && /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2 min-w-0 shrink", children: m.slice(0, x).map((T, L) => /* @__PURE__ */ d.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ d.jsx(
          kg,
          {
            file: T,
            isSelected: t ?? !1,
            isPreviewOpen: l !== null,
            onPreview: () => I(L),
            onRemove: () => E(L)
          }
        ),
        v && L === x - 1 && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer",
            onClick: () => I(L),
            children: /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-white-100", children: [
              "+",
              C
            ] })
          }
        )
      ] }, `${T.name}-${T.size}-${L}`)) }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          ref: a,
          type: "file",
          multiple: !0,
          className: "hidden",
          onChange: y
        }
      ),
      z && /* @__PURE__ */ d.jsx(
        Pe,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-upload",
          className: "ml-auto shrink-0",
          onClick: w
        }
      )
    ] }),
    l !== null && f[l] && /* @__PURE__ */ d.jsx(vg, { open: l !== null, onOpenChange: (T) => !T && u(null), children: /* @__PURE__ */ d.jsxs(
      wg,
      {
        size: "lg",
        overlayClassName: "bg-black-55",
        className: "w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85",
        children: [
          /* @__PURE__ */ d.jsx(
            Pe,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-left",
              disabled: l === 0,
              className: "absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: R
            }
          ),
          m[l]?.type.startsWith("image/") ? /* @__PURE__ */ d.jsx("img", { src: f[l], alt: m[l].name, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" }) : m[l]?.type.startsWith("video/") ? /* @__PURE__ */ d.jsx("video", { src: f[l], controls: !0, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" }) : null,
          /* @__PURE__ */ d.jsx(
            Pe,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-right",
              disabled: l === h - 1,
              className: "absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: k
            }
          ),
          /* @__PURE__ */ d.jsxs("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 text-white text-sm z-10", children: [
            l + 1,
            "/",
            h
          ] })
        ]
      }
    ) })
  ] });
}
const Rl = {
  text: El,
  number: yg,
  select: Sg,
  link: Eg,
  attachment: Pg
}, kl = i.createContext(null), Pl = i.createContext(null), Il = i.createContext(null), Dr = i.createContext(Rl);
function yo() {
  const e = i.useContext(kl);
  if (!e) throw new Error("useTableActions must be used within a TableProvider");
  return e;
}
function gn() {
  const e = i.useContext(Pl);
  if (!e) throw new Error("useTableData must be used within a TableProvider");
  return e;
}
function vn() {
  const e = i.useContext(Il);
  if (!e) throw new Error("useTableState must be used within a TableProvider");
  return e;
}
function At() {
  return {
    state: vn(),
    actions: yo(),
    data: gn(),
    cellRenderers: i.useContext(Dr)
  };
}
function Ig({ data: e, cellRenderers: t, readOnly: n, onCellValueChange: o, children: r }) {
  const s = i.useMemo(
    () => ({ ...Rl, ...t }),
    [t]
  ), [a, c] = i.useState(() => {
    const S = {};
    return e.columns.forEach((A) => {
      S[A.id] = A.width === "auto" ? 40 : A.width ?? 200;
    }), S;
  }), [l, u] = i.useState(e.columns), [f, p] = i.useState(e.rows), [m, h] = i.useState(() => e.hiddenColumns ?? /* @__PURE__ */ new Set()), [x, g] = i.useState(() => {
    const S = /* @__PURE__ */ new Set(), A = e.columns.find((F) => F.type === "checkbox");
    A && S.add(A.id);
    const O = e.columns.find((F) => F.type !== "checkbox");
    return O && S.add(O.id), S;
  }), [v, C] = i.useState(() => e.groupColumnId ?? null), [b, w] = i.useState(() => {
    if (e.initialCollapsedGroups) return new Set(e.initialCollapsedGroups);
    if (!e.groupColumnId) return /* @__PURE__ */ new Set();
    const S = e.columns.findIndex((V) => V.id === e.groupColumnId);
    if (S === -1) return /* @__PURE__ */ new Set();
    const A = new Set(e.rows.map((V) => String(V.cells[S]?.value ?? ""))), O = Array.from(A).sort((V, D) => !V && D ? 1 : V && !D ? -1 : 0), F = O[0];
    if (!F) return /* @__PURE__ */ new Set();
    const _ = new Set(O);
    return _.delete(F), _;
  }), [y, E] = i.useState(/* @__PURE__ */ new Set()), [I, R] = i.useState(null), [k, z] = i.useState(n ?? !1);
  i.useEffect(() => {
    k && ($(null), te(""), ee(null));
  }, [k]);
  const T = i.useRef(l);
  T.current = l;
  const L = i.useRef(f);
  L.current = f;
  const X = i.useRef(m);
  X.current = m;
  const H = i.useRef(x);
  H.current = x;
  const Q = i.useRef(v);
  Q.current = v;
  const re = i.useRef(b);
  re.current = b;
  const U = i.useRef(a);
  U.current = a;
  const K = i.useRef([]), B = i.useRef([]);
  i.useEffect(() => {
    K.current = [], B.current = [];
  }, [e]);
  const ie = i.useCallback(() => ({
    columns: T.current,
    rows: L.current,
    hiddenColumns: [...X.current],
    frozenColumns: [...H.current],
    groupColumnId: Q.current,
    collapsedGroups: [...re.current],
    columnWidths: { ...U.current }
  }), []), M = i.useCallback(() => {
    K.current = [...K.current, ie()].slice(-20), B.current = [];
  }, [ie]), P = i.useCallback((S) => {
    u(S.columns), p(S.rows), h(new Set(S.hiddenColumns)), g(new Set(S.frozenColumns)), C(S.groupColumnId), w(new Set(S.collapsedGroups)), c({ ...S.columnWidths }), R(null), ee(null), $(null), te("");
  }, []), J = i.useCallback(() => {
    const S = K.current;
    if (S.length === 0) return;
    const A = S[S.length - 1];
    B.current = [...B.current, ie()], K.current = S.slice(0, -1), P(A);
  }, [ie, P]), de = i.useCallback(() => {
    const S = B.current;
    if (S.length === 0) return;
    const A = S[S.length - 1];
    K.current = [...K.current, ie()].slice(-20), B.current = S.slice(0, -1), P(A);
  }, [ie, P]), [ce, ee] = i.useState(null), [ue, $] = i.useState(null), [ne, te] = i.useState(""), pe = y.size === f.length && f.length > 0, ve = i.useCallback(() => {
    E(pe ? /* @__PURE__ */ new Set() : new Set(f.map((S) => S.id)));
  }, [pe, f]), ye = i.useCallback((S) => {
    E((A) => {
      const O = new Set(A);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    }), ee(null);
  }, []), Ie = i.useCallback(() => {
    E(/* @__PURE__ */ new Set());
  }, []), be = i.useCallback((S, A) => {
    $(S), te(A);
  }, []), et = i.useCallback(() => {
    if (!ue) return;
    const S = l.some((A) => A.id === ue);
    if (ue.startsWith("group-header-") || M(), S)
      u(
        (A) => A.map(
          (O) => O.id === ue ? { ...O, title: ne } : O
        )
      );
    else {
      let A = "", O = "", F = "";
      if (p((_) => _.map((D) => ({
        ...D,
        cells: D.cells.map((Z) => {
          if (Z.id === ue) {
            A = D.id;
            const le = D.cells.findIndex((fe) => fe.id === ue);
            return O = l[le]?.id ?? "", F = Z.value, { ...Z, value: ne };
          }
          return Z;
        })
      }))), o && A && O) {
        const _ = {
          cellId: ue,
          rowId: A,
          columnId: O,
          newValue: ne,
          oldValue: F
        };
        setTimeout(() => o(_), 0);
      }
    }
    $(null), te("");
  }, [ue, ne, l, o, M]), tt = i.useCallback(() => {
    $(null), te("");
  }, []), xt = i.useCallback((S) => {
    te(S);
  }, []), Eo = i.useCallback((S, A) => {
    M(), p((O) => O.map((F) => {
      const _ = F.cells.findIndex((D) => D.id === S);
      if (_ === -1) return F;
      const V = [...F.cells];
      if (typeof A == "object" && A !== null) {
        const D = A, Z = F.cells[_];
        V[_] = {
          ...Z,
          ...D
        };
      } else
        V[_] = { ...F.cells[_], value: A };
      return { ...F, cells: V };
    }));
  }, []), Ro = i.useCallback((S, A) => {
    c((O) => ({
      ...O,
      [S]: A
    }));
  }, []), nt = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, tn = i.useCallback((S) => {
    const A = l.findIndex((_) => _.id === S);
    if (A === -1) return;
    M();
    const O = nt(), F = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    u((_) => {
      const V = [..._];
      return V.splice(A, 0, F), V;
    }), c((_) => ({
      ..._,
      [O]: 200
    })), p(
      (_) => _.map((V) => {
        const D = {
          id: `${O}-${V.id}`,
          type: "text",
          value: "",
          width: 200
        }, Z = [...V.cells];
        return Z.splice(A, 0, D), { ...V, cells: Z };
      })
    );
  }, [l]), ko = i.useCallback((S) => {
    const A = l.findIndex((_) => _.id === S);
    if (A === -1) return;
    M();
    const O = nt(), F = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    u((_) => {
      const V = [..._];
      return V.splice(A + 1, 0, F), V;
    }), c((_) => ({
      ..._,
      [O]: 200
    })), p(
      (_) => _.map((V) => {
        const D = {
          id: `${O}-${V.id}`,
          type: "text",
          value: "",
          width: 200
        }, Z = [...V.cells];
        return Z.splice(A + 1, 0, D), { ...V, cells: Z };
      })
    );
  }, [l]), Po = i.useCallback((S) => {
    M(), h((A) => new Set(A).add(S));
  }, []), xn = i.useCallback((S) => {
    M(), h((A) => {
      const O = new Set(A);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    });
  }, []), bn = i.useCallback((S) => {
    const A = l.findIndex((O) => O.id === S);
    A !== -1 && (M(), u((O) => O.filter((F) => F.id !== S)), c((O) => {
      const F = { ...O };
      return delete F[S], F;
    }), h((O) => {
      const F = new Set(O);
      return F.delete(S), F;
    }), p(
      (O) => O.map((F) => ({
        ...F,
        cells: F.cells.filter((_, V) => V !== A)
      }))
    ));
  }, [l]), ot = i.useCallback((S, A) => {
    const O = l.findIndex((F) => F.id === S);
    O !== -1 && (M(), u(
      (F) => F.map(
        (_) => _.id === S ? { ..._, type: A } : _
      )
    ), p(
      (F) => F.map((_) => ({
        ..._,
        cells: _.cells.map(
          (V, D) => D === O ? { ...V, type: A } : V
        )
      }))
    ));
  }, [l]), jt = i.useCallback((S, A) => {
    M(), u(
      (O) => O.map(
        (F) => F.id === S ? { ...F, title: A } : F
      )
    );
  }, []), wn = i.useCallback((S, A) => {
    M(), u(
      (O) => O.map(
        (F) => F.id === S ? { ...F, options: A } : F
      )
    );
  }, []), nn = i.useCallback((S) => {
    const A = l.findIndex((F) => F.id === S);
    if (A === -1) return;
    M();
    const O = l.slice(0, A + 1).map((F) => F.id);
    g(new Set(O));
  }, [l]), Ot = i.useCallback((S) => {
    if (M(), C(S), S) {
      const A = l.findIndex((_) => _.id === S);
      if (A === -1) {
        w(/* @__PURE__ */ new Set());
        return;
      }
      const O = Array.from(
        new Set(f.map((_) => String(_.cells[A]?.value ?? "")))
      ).sort((_, V) => !_ && V ? 1 : _ && !V ? -1 : 0), F = O[0];
      w(
        F ? new Set(O.filter((_) => _ !== F)) : /* @__PURE__ */ new Set()
      );
    } else
      w(/* @__PURE__ */ new Set());
  }, [l, f]), _t = {
    selectedRows: y,
    selectAll: pe,
    editingCellId: ue,
    editingValue: ne,
    selectedCellId: ce,
    columnWidths: a,
    allColumns: l,
    hiddenColumns: m,
    frozenColumns: x,
    groupColumnId: v,
    collapsedGroups: b,
    selectedColumnId: I,
    readOnly: k
  }, Dt = i.useCallback((S) => {
    M(), w((A) => {
      const O = new Set(A);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    });
  }, []), Mt = i.useCallback(() => {
    M(), w(/* @__PURE__ */ new Set());
  }, []), $t = i.useCallback(() => {
    if (!v) return;
    M();
    const S = l.findIndex((O) => O.id === v);
    if (S === -1) return;
    const A = new Set(f.map((O) => String(O.cells[S]?.value ?? "")));
    w(A);
  }, [v, l, f]), We = i.useCallback((S, A) => {
    const O = A.map((_) => _.id), F = O.every((_) => y.has(_));
    E((_) => {
      const V = new Set(_);
      return F ? O.forEach((D) => V.delete(D)) : O.forEach((D) => V.add(D)), V;
    });
  }, [y]), Cn = (S) => {
    switch (S.type) {
      case "checkbox":
        return !1;
      case "link":
        return S.options?.label || "";
      default:
        return "";
    }
  }, on = (S, A, O) => ({
    id: `${A}-${S.id}`,
    type: S.type,
    value: Cn(S),
    width: S.width === "auto" ? 40 : S.width ?? 200,
    ...O
  }), Lt = i.useCallback((S, A) => {
    const O = l.findIndex((D) => D.id === A);
    if (O === -1) return;
    M();
    const F = nt(), _ = l.map(
      (D) => on(D, F, D.id === A ? { value: S } : void 0)
    );
    let V = f.length;
    for (let D = f.length - 1; D >= 0; D--) {
      const le = f[D]?.cells[O];
      if ((le ? String(le.value ?? "") : "") === S) {
        V = D + 1;
        break;
      }
    }
    p((D) => {
      const Z = [...D];
      return Z.splice(V, 0, { id: F, cells: _ }), Z;
    });
  }, [l, f]), yn = i.useCallback(() => {
    M();
    const S = nt(), A = l.map(
      (O) => on(O, S)
    );
    p((O) => [...O, { id: S, cells: A }]);
  }, [l]), j = i.useCallback((S, A, O) => {
    const F = l.findIndex((_) => _.id === O);
    F !== -1 && (M(), p(
      (_) => _.map((V) => {
        const D = V.cells[F];
        if ((D ? String(D.value ?? "") : "") === S && D) {
          const le = [...V.cells];
          return le[F] = { ...D, value: A }, { ...V, cells: le };
        }
        return V;
      })
    ));
  }, [l]), N = i.useCallback((S) => {
    ee(S), S && (E(/* @__PURE__ */ new Set()), R(null));
  }, []), W = i.useCallback((S) => {
    R(S), S && (E(/* @__PURE__ */ new Set()), ee(null));
  }, []), q = i.useCallback((S, A, O) => {
    const F = l.findIndex((le) => le.id === S), _ = l.findIndex((le) => le.id === A);
    if (F === -1 || _ === -1 || F === _) return;
    M();
    const V = O === "right" ? _ + 1 : _, D = V > F ? V - 1 : V;
    if (D === F) return;
    const Z = F;
    u((le) => {
      const fe = [...le], me = fe[Z];
      return me ? (fe.splice(Z, 1), fe.splice(D, 0, me), fe) : le;
    }), p(
      (le) => le.map((fe) => {
        const me = [...fe.cells], Ce = me[Z];
        return Ce ? (me.splice(Z, 1), me.splice(D, 0, Ce), { ...fe, cells: me }) : fe;
      })
    ), R(S);
  }, [l]), se = i.useCallback((S, A) => {
    M();
    const F = l.some((Z) => Z.type === "checkbox") ? 1 : 0, _ = l.length - F;
    let V = l;
    if (A > _) {
      const Z = A - _, le = [], fe = {};
      for (let me = 0; me < Z; me++) {
        const Ce = nt(), Ne = l.length + me + 1 - F;
        le.push({
          id: Ce,
          type: "text",
          title: `列${Ne}`,
          width: 200
        }), fe[Ce] = 200;
      }
      V = [...l, ...le], u(V), c((me) => ({ ...me, ...fe })), p(
        (me) => me.map((Ce) => {
          const Ne = le.map(($r) => ({
            id: `${Ce.id}-${$r.id}`,
            // 统一格式：rowId-columnId
            type: "text",
            value: "",
            width: 200
          }));
          return { ...Ce, cells: [...Ce.cells, ...Ne] };
        })
      );
    } else if (A < _) {
      const Z = _ - A, le = l.length - Z, fe = l.slice(le).map((me) => me.id);
      V = l.slice(0, le), u(V), c((me) => {
        const Ce = { ...me };
        return fe.forEach((Ne) => delete Ce[Ne]), Ce;
      }), h((me) => {
        const Ce = new Set(me);
        return fe.forEach((Ne) => Ce.delete(Ne)), Ce;
      }), p(
        (me) => me.map((Ce) => ({
          ...Ce,
          cells: Ce.cells.slice(0, le)
        }))
      );
    }
    const D = f.length;
    if (S > D) {
      const Z = S - D, le = [];
      for (let fe = 0; fe < Z; fe++) {
        const me = nt(), Ce = V.map(
          (Ne) => on(Ne, me)
        );
        le.push({ id: me, cells: Ce });
      }
      p((fe) => [...fe, ...le]);
    } else S < D && p((Z) => Z.slice(0, S));
  }, [l, f]), ae = i.useCallback(() => {
    z((S) => !S);
  }, []), we = {
    toggleSelectAll: ve,
    toggleRowSelect: ye,
    clearSelection: Ie,
    startEdit: be,
    finishEdit: et,
    cancelEdit: tt,
    updateEditingValue: xt,
    selectCell: N,
    updateCellValue: Eo,
    updateColumnWidth: Ro,
    insertColumnLeft: tn,
    insertColumnRight: ko,
    hideColumn: Po,
    toggleColumnVisibility: xn,
    deleteColumn: bn,
    updateColumnType: ot,
    updateColumnTitle: jt,
    updateColumnOptions: wn,
    freezeColumns: nn,
    setGroupColumn: Ot,
    toggleGroupCollapse: Dt,
    toggleGroupSelect: We,
    insertRowInGroup: Lt,
    insertRow: yn,
    updateGroupValues: j,
    expandAllGroups: Mt,
    collapseAllGroups: $t,
    selectColumn: W,
    moveColumnOrder: q,
    setDimension: se,
    toggleReadOnly: ae,
    undo: J,
    redo: de
  }, xe = i.useMemo(() => ({
    columns: l.filter((S) => !m.has(S.id)),
    rows: f.map((S) => ({
      ...S,
      cells: S.cells.filter((A, O) => !m.has(l[O]?.id ?? ""))
    })),
    allRows: f
  }), [l, f, m]), he = i.useMemo(() => {
    const S = /* @__PURE__ */ new Map();
    return xe.columns.forEach((A) => S.set(A.id, A)), S;
  }, [xe.columns]), Re = i.useMemo(() => ({ ...xe, columnMap: he }), [xe, he]), Se = i.useMemo(() => _t, [_t]);
  return /* @__PURE__ */ d.jsx(kl.Provider, { value: we, children: /* @__PURE__ */ d.jsx(Pl.Provider, { value: Re, children: /* @__PURE__ */ d.jsx(Il.Provider, { value: Se, children: /* @__PURE__ */ d.jsx(Dr.Provider, { value: s, children: r }) }) }) });
}
function Tg(e) {
  const { data: t, state: n } = At(), o = i.useMemo(() => {
    if (!e) return !1;
    const s = t.columns.find((a) => a.type === "checkbox")?.id;
    if (s) {
      const a = t.columns.findIndex((l) => l.id === s), c = t.columns[a + 1]?.id;
      return e === c;
    } else
      return e === t.columns[0]?.id;
  }, [e, t.columns]), r = i.useMemo(() => {
    const s = n.allColumns, a = s.find((c) => c.type === "checkbox")?.id;
    if (a) {
      const c = s.findIndex((l) => l.id === a);
      return s[c + 1]?.id;
    } else
      return s[0]?.id;
  }, [n.allColumns]);
  return { isFirstDataColumn: o, firstDataColumnId: r };
}
function Ng({
  columnId: e,
  isFirstDataColumn: t,
  groupColumnId: n,
  readOnly: o,
  onEdit: r,
  onHideManager: s,
  onDimension: a
}) {
  const { actions: c, state: l } = At(), { close: u } = i.useContext(Fe), f = i.useId();
  return /* @__PURE__ */ d.jsxs("div", { "data-slot": "header-cell-menu", "data-slot-id": f, children: [
    !o && /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: r, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-edit" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "编辑列" })
    ] }),
    !t && /* @__PURE__ */ d.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.hideColumn(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "隐藏列" })
    ] }),
    /* @__PURE__ */ d.jsx(lt, {}),
    t && n && /* @__PURE__ */ d.jsxs(
      _e,
      {
        size: "base",
        onClick: () => {
          u(), setTimeout(() => {
            l.collapsedGroups.size > 0 ? c.expandAllGroups() : c.collapseAllGroups();
          }, 250);
        },
        children: [
          /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: l.collapsedGroups.size > 0 ? "#icon-chevron-down-double" : "#icon-a-chevron-rightdouble" }) }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: l.collapsedGroups.size > 0 ? "展开分组" : "收起分组" })
        ]
      }
    ),
    t ? /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: () => {
      u(), setTimeout(() => e && c.setGroupColumn(n ? null : e), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: n ? "取消分组" : "设为分组" })
    ] }) : /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: () => {
      u(), setTimeout(() => e && c.setGroupColumn(n === e ? null : e), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: n === e ? "取消分组" : "设为分组" })
    ] }),
    !o && !t && /* @__PURE__ */ d.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.insertColumnLeft(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-arrow-left" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "向左插入列" })
    ] }),
    !o && /* @__PURE__ */ d.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.insertColumnRight(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-arrow-right" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "向右插入列" })
    ] }),
    /* @__PURE__ */ d.jsx(lt, {}),
    t && /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: s, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "隐藏列管理" })
    ] }),
    !o && t && /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: a, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-grid-view" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "行列数管理" })
    ] }),
    t && /* @__PURE__ */ d.jsxs(_e, { size: "base", onClick: () => {
      u(), setTimeout(() => c.toggleReadOnly(), 250);
    }, children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: o ? "#icon-book-open" : "#icon-book-open-filled" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: o ? "编辑模式" : "只读模式" })
    ] }),
    !t && /* @__PURE__ */ d.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.freezeColumns(e), children: [
      /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-grid-column" }) }),
      /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-85", children: "冻结到此列" })
    ] }),
    !o && !t && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(lt, {}),
      /* @__PURE__ */ d.jsxs(
        _e,
        {
          size: "base",
          closeOnClick: !0,
          onClick: () => e && c.deleteColumn(e),
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
function Ag({ size: e, fields: t }) {
  const n = i.useContext(Fe), o = e ?? n.size, r = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5"
  }[o], s = i.useRef(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ d.jsx(d.Fragment, { children: t.map((a, c) => /* @__PURE__ */ d.jsxs(i.Fragment, { children: [
    a.label && /* @__PURE__ */ d.jsx(Xt, { children: a.label }),
    a.type === "input" && /* @__PURE__ */ d.jsx("div", { className: r, children: /* @__PURE__ */ d.jsx(
      ut,
      {
        variant: "basic",
        size: o,
        value: a.value,
        defaultValue: a.defaultValue,
        onChange: (l) => a.onChange?.(l.target.value),
        placeholder: a.placeholder,
        autoFocus: a.autoFocus,
        onFocus: a.selectOnFocus ? (l) => {
          s.current.has(c) || (s.current.add(c), l.target.select());
        } : void 0,
        className: "w-full"
      }
    ) }),
    a.type === "select" && /* @__PURE__ */ d.jsx("div", { className: r, children: /* @__PURE__ */ d.jsxs(am, { value: a.value, onValueChange: a.onChange, size: o, children: [
      /* @__PURE__ */ d.jsx(lm, { variant: "basic", className: "w-full", children: /* @__PURE__ */ d.jsx(dm, { placeholder: a.placeholder }) }),
      /* @__PURE__ */ d.jsx(cm, { children: a.options?.map((l) => /* @__PURE__ */ d.jsx(um, { value: l.value, children: l.label }, l.value)) })
    ] }) }),
    a.type === "content" && /* @__PURE__ */ d.jsx(
      jg,
      {
        field: a,
        paddingClass: r,
        size: o
      }
    )
  ] }, c)) });
}
function jg({ field: e, paddingClass: t }) {
  const n = e.contentType === "text", o = e.contentType === "select";
  if (!n && !o) return null;
  const r = o ? (e.selectOptions ?? []).map((b) => ({ key: b.value, label: b.label })) : (e.textFields ?? []).map((b) => ({ key: b.id, label: b.label })), s = o ? "添加选项" : "添加字段", a = o ? "输入选项名称" : "输入字段名称", [c, l] = i.useState(null), [u, f] = i.useState(null), p = () => `${o ? "opt" : "fld"}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, m = () => {
    const b = { key: p() };
    o ? e.onSelectOptionsChange?.([{ value: b.key, label: "" }, ...e.selectOptions ?? []]) : e.onTextFieldsChange?.([{ id: b.key, label: "" }, ...e.textFields ?? []]);
  }, h = (b) => {
    o ? e.onSelectOptionsChange?.((e.selectOptions ?? []).filter((w, y) => y !== b)) : e.onTextFieldsChange?.((e.textFields ?? []).filter((w, y) => y !== b));
  }, x = (b, w) => {
    if (o) {
      const y = (e.selectOptions ?? []).map(
        (E, I) => I === b ? { ...E, label: w } : E
      );
      e.onSelectOptionsChange?.(y);
    } else {
      const y = (e.textFields ?? []).map(
        (E, I) => I === b ? { ...E, label: w } : E
      );
      e.onTextFieldsChange?.(y);
    }
  }, g = (b) => l(b), v = (b, w) => {
    b.preventDefault(), f(w);
  }, C = () => {
    if (c !== null && u !== null && c !== u)
      if (o) {
        const b = [...e.selectOptions ?? []], w = b[c];
        w && (b.splice(c, 1), b.splice(u, 0, w), e.onSelectOptionsChange?.(b));
      } else {
        const b = [...e.textFields ?? []], w = b[c];
        w && (b.splice(c, 1), b.splice(u, 0, w), e.onTextFieldsChange?.(b));
      }
    l(null), f(null);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: t, children: [
    /* @__PURE__ */ d.jsx(
      Pe,
      {
        variant: "ghost",
        size: "base",
        className: "w-full justify-center text-black-55",
        leftIcon: "icon-add",
        onClick: m,
        children: s
      }
    ),
    r.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "mt-1.5 flex flex-col gap-0.5", children: r.map((b, w) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        draggable: !0,
        onDragStart: () => g(w),
        onDragOver: (y) => v(y, w),
        onDragEnd: C,
        className: Og(
          "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
          u === w && "bg-brand-1",
          c === w && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ d.jsx(
            Pe,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-move",
              className: "shrink-0 cursor-grab text-black-55"
            }
          ),
          /* @__PURE__ */ d.jsx(
            ut,
            {
              variant: "basic",
              size: "base",
              value: b.label,
              onChange: (y) => x(w, y.target.value),
              className: "flex-1 min-w-0",
              placeholder: a
            }
          ),
          /* @__PURE__ */ d.jsx(
            Pe,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-close",
              onClick: () => h(w),
              className: "shrink-0 text-black-55"
            }
          )
        ]
      },
      b.key
    )) })
  ] });
}
function Og(...e) {
  return e.filter(Boolean).join(" ");
}
function _g({
  columnId: e,
  value: t,
  currentColumnType: n,
  currentColumnDef: o,
  onClose: r
}) {
  const { actions: s } = At(), { close: a } = i.useContext(Fe), c = i.useId(), [l, u] = i.useState(String(t)), [f, p] = i.useState("text"), [m, h] = i.useState([]), [x, g] = i.useState([]);
  i.useEffect(() => {
    u(String(t)), p(n), o?.options ? n === "select" ? (h(o.options.items ?? []), g([])) : n === "text" ? (g(o.options.fields ?? []), h([])) : (h([]), g([])) : (h([]), g([]));
  }, [t, n, o]);
  const v = () => {
    if (l !== String(t) && e && s.updateColumnTitle(e, l), e && f !== n && s.updateColumnType(e, f), e) {
      const C = {};
      if (f === "select") {
        const b = m.filter((w) => w.label.trim());
        C.items = b;
      } else if (f === "text") {
        const b = x.filter((w) => w.label.trim());
        C.fields = b;
      }
      s.updateColumnOptions(e, C);
    }
    a();
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "header-cell-edit",
      "data-slot-id": c,
      onKeyDown: (C) => {
        C.key === "Enter" && (C.preventDefault(), v()), C.key === "Escape" && (C.preventDefault(), r());
      },
      children: [
        /* @__PURE__ */ d.jsx(
          Ag,
          {
            size: "base",
            fields: [
              {
                label: "标题",
                type: "input",
                value: l,
                onChange: u,
                placeholder: "输入列标题",
                autoFocus: !0,
                selectOnFocus: !0
              },
              {
                label: "列类型",
                type: "select",
                value: f,
                onChange: (C) => p(C),
                placeholder: "选择列类型",
                options: [
                  { value: "text", label: "文本列" },
                  { value: "number", label: "数字列" },
                  { value: "select", label: "选择列" },
                  { value: "link", label: "链接列" },
                  { value: "attachment", label: "附件列" }
                ]
              },
              // 选择列：选项内容配置
              ...f === "select" ? [{
                label: "",
                type: "content",
                contentType: f,
                selectOptions: m,
                onSelectOptionsChange: h
              }] : [],
              // 文本列：字段内容配置
              ...f === "text" ? [{
                label: "",
                type: "content",
                contentType: f,
                textFields: x,
                onTextFieldsChange: g
              }] : []
            ]
          }
        ),
        /* @__PURE__ */ d.jsx(lt, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Pe, { variant: "outline", size: "base", className: "flex-1", onClick: r, children: "取消" }),
          /* @__PURE__ */ d.jsx(Pe, { variant: "primary", size: "base", className: "flex-1", onClick: v, children: "保存" })
        ] })
      ]
    }
  );
}
function Dg({ firstDataColumnId: e }) {
  const { state: t, actions: n } = At(), o = i.useId(), r = t.allColumns.find((a) => a.type === "checkbox"), s = r ? t.hiddenColumns.has(r.id) : !1;
  return /* @__PURE__ */ d.jsxs("div", { "data-slot": "hide-column-view", "data-slot-id": o, children: [
    r && /* @__PURE__ */ d.jsxs(
      _e,
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
      const c = t.hiddenColumns.has(a.id);
      return /* @__PURE__ */ d.jsxs(
        _e,
        {
          size: "base",
          closeOnClick: !1,
          onClick: () => n.toggleColumnVisibility(a.id),
          children: [
            /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-55 shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: c ? "#icon-browse-off" : "#icon-browse" }) }),
            /* @__PURE__ */ d.jsxs(Ir, { children: [
              /* @__PURE__ */ d.jsx(Tr, { asChild: !0, children: /* @__PURE__ */ d.jsx("span", { className: "truncate", children: a.title || a.id }) }),
              /* @__PURE__ */ d.jsx(Nr, { side: "top", size: "base", children: /* @__PURE__ */ d.jsx("p", { children: a.title || a.id }) })
            ] })
          ]
        },
        a.id
      );
    })
  ] });
}
function Mg() {
  const { data: e, state: t, actions: n } = At(), { close: o } = i.useContext(Fe), r = i.useId(), s = e.rows.length, a = i.useMemo(() => t.allColumns.some((E) => E.type === "checkbox") ? 1 : 0, [t.allColumns]), c = t.allColumns.length - a, [l, u] = i.useState(String(s)), [f, p] = i.useState(String(c)), m = (y) => Math.max(1, Math.min(100, y)), h = (y) => Math.max(2, Math.min(100, y)), x = (y) => {
    u(y);
  }, g = (y) => {
    p(y);
  }, v = () => {
    (l === "" || l === void 0) && u(String(s));
  }, C = () => {
    (f === "" || f === void 0) && p(String(c));
  }, b = () => {
    const y = m(parseInt(l) || s), E = h(parseInt(f) || c);
    n.setDimension(y, E), o();
  }, w = () => {
    o();
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "header-cell-dimension",
      "data-slot-id": r,
      onKeyDown: (y) => {
        y.key === "Enter" && (y.preventDefault(), b()), y.key === "Escape" && (y.preventDefault(), w());
      },
      children: [
        /* @__PURE__ */ d.jsx(Xt, { children: "行数" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: l,
            onChange: (y) => x(y.target.value),
            onFocus: (y) => y.target.select(),
            onBlur: v,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(Xt, { children: "列数" }),
        /* @__PURE__ */ d.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ d.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: f,
            onChange: (y) => g(y.target.value),
            onFocus: (y) => y.target.select(),
            onBlur: C,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ d.jsx(lt, {}),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ d.jsx(Pe, { variant: "outline", size: "base", className: "flex-1", onClick: w, children: "取消" }),
          /* @__PURE__ */ d.jsx(Pe, { variant: "primary", size: "base", className: "flex-1", onClick: b, children: "保存" })
        ] })
      ]
    }
  );
}
const Ct = {
  files: null,
  sourceCellId: null
}, st = {
  buttonConfig: null,
  sourceCellId: null
}, Tl = Oe("flex flex-col relative", {
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
function $g({ cellId: e, value: t, columnId: n, currentColumnType: o, editView: r, setEditView: s, hideColumnView: a, setHideColumnView: c, dimensionView: l, setDimensionView: u, onDoubleClickTitle: f }) {
  const p = vn(), m = yo(), h = gn(), { close: x, isOpen: g } = i.useContext(Fe), { isFirstDataColumn: v, firstDataColumnId: C } = Tg(n), b = n ? h.columnMap?.get(n) : void 0;
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      ct,
      {
        className: "truncate cursor-pointer flex-1",
        onDoubleClick: f,
        children: String(t)
      }
    ),
    /* @__PURE__ */ d.jsx(bo, { asChild: !0, children: /* @__PURE__ */ d.jsx(
      Pe,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-chevron-down",
        className: oe(
          "transition-opacity",
          g ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        ),
        onClick: (w) => {
          w.stopPropagation(), p.selectedColumnId === n && m.selectColumn(null), p.selectedCellId && m.selectCell(null);
        },
        onDoubleClick: (w) => w.stopPropagation()
      }
    ) }),
    /* @__PURE__ */ d.jsx(wo, { align: "end", alignOffset: -8, sideOffset: 8, className: "w-[200px]", children: /* @__PURE__ */ d.jsxs("div", { onClick: (w) => w.stopPropagation(), onDoubleClick: (w) => w.stopPropagation(), onMouseDown: (w) => w.stopPropagation(), children: [
      !r && !a && !l && /* @__PURE__ */ d.jsx(
        Ng,
        {
          columnId: n,
          isFirstDataColumn: v,
          groupColumnId: p.groupColumnId,
          readOnly: p.readOnly,
          onEdit: () => s(!0),
          onHideManager: () => c(!0),
          onDimension: () => u(!0)
        }
      ),
      r && /* @__PURE__ */ d.jsx(
        _g,
        {
          columnId: n,
          value: t,
          currentColumnType: o,
          currentColumnDef: b,
          onClose: x
        }
      ),
      a && /* @__PURE__ */ d.jsx(Dg, { firstDataColumnId: C }),
      l && /* @__PURE__ */ d.jsx(Mg, {})
    ] }) })
  ] });
}
function Lg({ cellId: e, value: t, columnId: n }) {
  const o = gn(), [r, s] = i.useState(!1), [a, c] = i.useState(!1), [l, u] = i.useState(!1), [f, p] = i.useState(!1), m = i.useContext(Nl), h = n ? o.columnMap?.get(n)?.type ?? "text" : "text", x = (v) => {
    p(v), v && (s(!1), c(!1), u(!1)), m && (m.current = v);
  }, g = () => {
    m && (m.current = !0), p(!0), s(!0);
  };
  return /* @__PURE__ */ d.jsx(xo, { open: f, onOpenChange: x, children: /* @__PURE__ */ d.jsx(
    $g,
    {
      cellId: e,
      value: t,
      columnId: n,
      currentColumnType: h,
      editView: r,
      setEditView: s,
      hideColumnView: a,
      setHideColumnView: c,
      dimensionView: l,
      setDimensionView: u,
      onDoubleClickTitle: g
    }
  ) });
}
function zg({ cellId: e, type: t, value: n, rowId: o, isHeader: r, columnId: s, rowIndex: a, cellOptions: c, isCellHovering: l }) {
  const u = vn(), f = yo(), p = gn(), m = i.useContext(Dr), [h, x] = i.useState(!1);
  if (r && t === "checkbox") {
    const E = h || u.selectAll;
    return /* @__PURE__ */ d.jsx(
      "div",
      {
        className: "flex items-center justify-center w-full h-full",
        onMouseEnter: () => x(!0),
        onMouseLeave: () => x(!1),
        children: E ? /* @__PURE__ */ d.jsx(
          Uo,
          {
            checked: u.selectAll,
            onChange: () => f.toggleSelectAll()
          }
        ) : /* @__PURE__ */ d.jsx("svg", { className: "icon text-black-25", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("use", { xlinkHref: "#icon-vcell-logo" }) })
      }
    );
  }
  if (r)
    return /* @__PURE__ */ d.jsx(Lg, { cellId: e, value: n, columnId: s });
  if (t === "checkbox") {
    const E = o ? u.selectedRows.has(o) : !1, I = l || E;
    return /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-center w-full h-full", children: I ? /* @__PURE__ */ d.jsx(
      Uo,
      {
        checked: E,
        onChange: () => {
          o && f.toggleRowSelect(o);
        }
      }
    ) : /* @__PURE__ */ d.jsx("span", { className: "text-sm text-black-25", children: a ?? 1 }) });
  }
  const g = m[t || "text"] || El, v = s ? p.columnMap?.get(s) : void 0, C = c ? { ...v?.options, ...c } : v?.options, b = u.selectedCellId === e, y = (o ? p.rows.find((E) => E.id === o) : void 0)?.cells.find((E) => E.id === e);
  return /* @__PURE__ */ d.jsx(
    g,
    {
      value: n,
      cellId: e,
      rowId: o,
      columnId: s,
      onChange: (E) => f.updateCellValue(e, E),
      isEditing: u.editingCellId === e,
      isSelected: b,
      isCellHovering: l,
      readOnly: u.readOnly,
      onStartEdit: (E) => f.startEdit(e, E ?? String(n)),
      onSelectCell: () => f.selectCell(e),
      options: C,
      cellData: y,
      editingValue: u.editingValue,
      onUpdateEditingValue: f.updateEditingValue,
      onFinishEdit: f.finishEdit,
      onCancelEdit: f.cancelEdit,
      onUpdateColumnOptions: (E) => f.updateColumnOptions(s, E)
    }
  );
}
const Vo = i.memo(function({ row: t, isHeader: n, isLastRow: o, columnIds: r, rowIndex: s, onCellResizeStart: a, onCellHoverEdge: c, onHeaderCellClick: l, onHeaderCellMouseDown: u, draggingColumnId: f, onCellHover: p, hoveringCellId: m, onBodyCellClick: h, frozenOffsets: x = {}, frozenWidth: g = 0, rowWidth: v, style: C, groupColumnId: b, hasOverflow: w }) {
  const y = vn(), E = gn(), I = yo(), R = !n && y.selectedRows.has(t.id), k = v ?? t.cells.reduce((z, T, L) => {
    const X = r?.[L] ?? T.id, H = E.columns[L], Q = T.width === "auto" ? 40 : T.width ?? (H?.width === "auto" ? 40 : H?.width ?? 80), re = y.columnWidths[X] ?? Q;
    return z + re;
  }, 0);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      "data-slot": "row",
      "data-slot-id": t.id,
      className: oe(
        "flex border-b border-neutral-2",
        R && "bg-brand-1"
      ),
      style: C ?? { minWidth: `${k}px`, width: n && !y.readOnly ? "100%" : `${k}px` },
      children: [
        t.cells.map((z, T) => {
          const L = r?.[T] ?? z.id, X = E.columns[T], H = z.type ?? X?.type ?? "text", Q = z.width ?? X?.width ?? 80, re = Q === "auto" ? 40 : Q, U = y.columnWidths[L] ?? re, K = y.frozenColumns.has(L), B = x[L] ?? 0, ie = K && B + U === g, M = !n && y.editingCellId === z.id && (H === "text" || H === "number" || H === "editable"), P = y.selectedColumnId === L, J = !n && y.selectedCellId === z.id, de = !n && m === z.id, ce = n ? P ? "headerSelected" : "header" : M ? "editing" : J || R || P ? "selected" : de && !y.readOnly ? "defaultHover" : "default", ee = n && P && !K && !f, ue = n && f && f === y.selectedColumnId;
          return /* @__PURE__ */ d.jsx(
            yt,
            {
              columnId: L,
              "data-cell-id": n ? void 0 : z.id,
              width: U,
              variant: ce,
              isLastCell: !1,
              resizable: n && H !== "checkbox",
              onResizeStart: a ? ($, ne) => a(L, $, ne) : void 0,
              onHoverEdge: c ? ($) => c($ ? L : null) : void 0,
              onClick: n && H !== "checkbox" && l ? ($) => l(L, H, $) : !n && H !== "checkbox" && h ? ($) => h(z.id, $) : void 0,
              onMouseEnter: !n && p ? () => p(z.id) : void 0,
              onMouseLeave: !n && p ? () => p(null) : void 0,
              onMouseDown: n && H !== "checkbox" && !K && P && u ? ($) => u(L, $) : void 0,
              slotClassName: n && H === "text" ? "justify-between" : H === "checkbox" ? "justify-center" : void 0,
              className: oe(
                n && H === "text" && "group",
                K && "sticky",
                n && K && "z-20",
                n && K && "top-0",
                !n && K && "z-10",
                ie && w && "shadow-[2px_0_4px_-2px_var(--black-10)]",
                // 光标
                ee && "cursor-grab",
                ue && "cursor-grabbing",
                // 分组模式下分组列的表头顶部描边
                n && b && L === b && "border-t-2 border-neutral-2",
                // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
                y.readOnly && T === t.cells.length - 1 && "!border-r-0"
              ),
              style: K ? { left: B } : void 0,
              children: /* @__PURE__ */ d.jsx(
                zg,
                {
                  cellId: z.id,
                  type: H,
                  value: z.value,
                  rowId: n ? void 0 : t.id,
                  isHeader: n,
                  columnId: L,
                  rowIndex: s,
                  cellOptions: z.options,
                  isCellHovering: de
                }
              )
            },
            z.id
          );
        }),
        n && !y.readOnly && /* @__PURE__ */ d.jsx(
          yt,
          {
            variant: "header",
            isLastCell: !0,
            className: "flex-1 min-w-[40px] cursor-pointer",
            onClick: () => {
              const z = r[r.length - 1];
              z && I.insertColumnRight(z);
            },
            children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ d.jsx(Pe, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        )
      ]
    }
  );
}, (e, t) => e.row === t.row && e.isHeader === t.isHeader && e.columnIds === t.columnIds && e.rowIndex === t.rowIndex && e.hoveringCellId === t.hoveringCellId && e.draggingColumnId === t.draggingColumnId && e.onCellResizeStart === t.onCellResizeStart && e.onCellHoverEdge === t.onCellHoverEdge && e.onHeaderCellClick === t.onHeaderCellClick && e.onHeaderCellMouseDown === t.onHeaderCellMouseDown && e.onCellHover === t.onCellHover && e.onBodyCellClick === t.onBodyCellClick && e.frozenOffsets === t.frozenOffsets && e.frozenWidth === t.frozenWidth && e.rowWidth === t.rowWidth && e.groupColumnId === t.groupColumnId && e.hasOverflow === t.hasOverflow);
function Fg({ groupValue: e, rowCount: t, frozenWidth: n, rowWidth: o, checkboxWidth: r, frozenNonCheckboxWidth: s, isCollapsed: a, isGroupSelected: c, onToggle: l, onGroupSelect: u, groupColumnId: f, isCheckboxHidden: p, hasOverflow: m }) {
  const { state: h, actions: x } = At(), g = `group-header-${e}`, v = h.editingCellId === g, [C, b] = i.useState(null), w = () => {
    h.editingValue !== e && x.updateGroupValues(e, h.editingValue, f), x.finishEdit();
  }, y = p ? s : n;
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
              m && "shadow-[2px_0_4px_-2px_var(--black-10)]"
            ),
            style: { width: `${y}px` },
            children: [
              !p && /* @__PURE__ */ d.jsx(
                yt,
                {
                  width: r,
                  isLastCell: !1,
                  variant: !h.readOnly && C === "checkbox" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("checkbox"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ d.jsx(Uo, { checked: c, onChange: u }) })
                }
              ),
              s > 0 && /* @__PURE__ */ d.jsx(
                yt,
                {
                  width: s,
                  isLastCell: !1,
                  variant: v ? "editing" : !h.readOnly && C === "title" ? "defaultHover" : "default",
                  onMouseEnter: () => !h.readOnly && b("title"),
                  onMouseLeave: () => b(null),
                  children: /* @__PURE__ */ d.jsxs("div", { className: "relative flex items-center justify-between w-full h-6", children: [
                    v ? /* @__PURE__ */ d.jsx(
                      "input",
                      {
                        type: "text",
                        value: h.editingValue,
                        onChange: (E) => x.updateEditingValue(E.target.value),
                        onBlur: w,
                        onKeyDown: (E) => {
                          E.key === "Enter" && w(), E.key === "Escape" && x.cancelEdit();
                        },
                        onFocus: (E) => {
                          const I = E.target.value.length;
                          E.target.setSelectionRange(I, I);
                        },
                        className: "absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden",
                        autoFocus: !0
                      }
                    ) : /* @__PURE__ */ d.jsx(
                      ct,
                      {
                        className: oe(
                          "text-sm truncate",
                          !h.readOnly && "cursor-pointer",
                          e ? "font-medium text-black-85" : "font-normal text-black-25"
                        ),
                        onDoubleClick: h.readOnly ? void 0 : () => x.startEdit(g, e),
                        children: e || "空值组"
                      }
                    ),
                    !v && /* @__PURE__ */ d.jsx(
                      Pe,
                      {
                        variant: "ghost",
                        size: "sm",
                        rightIcon: "icon-chevron-down",
                        onClick: l,
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
        /* @__PURE__ */ d.jsx(yt, { variant: "default", isLastCell: h.readOnly, className: "flex-1", children: "" })
      ]
    }
  );
}
function As({ rowWidth: e, showBorder: t, isHovering: n, onHoverChange: o, onInsert: r, frozenWidth: s, checkboxWidth: a, isCheckboxHidden: c }) {
  const l = c ? s - a : s, u = i.useId();
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
          yt,
          {
            width: l,
            variant: "default",
            isLastCell: !0,
            className: "sticky left-0 z-10 bg-transparent cursor-pointer",
            children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ d.jsx(Pe, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        ),
        /* @__PURE__ */ d.jsx(yt, { variant: "default", isLastCell: !1, className: "flex-1 cursor-pointer bg-transparent", children: "" })
      ]
    }
  );
}
function Vg({ onChange: e }) {
  const t = vn(), n = i.useRef(t.collapsedGroups);
  return i.useEffect(() => {
    n.current !== t.collapsedGroups && (n.current = t.collapsedGroups, e?.(Array.from(t.collapsedGroups)));
  }, [t.collapsedGroups, e]), null;
}
const ev = i.forwardRef(function({ className: t, variant: n, radius: o, data: r, cellRenderers: s, readOnly: a, contained: c = !1, onCollapsedGroupsChange: l, onCellValueChange: u, ...f }, p) {
  const m = c ? Tl({ variant: n, radius: o }) : "", h = c ? "plain" : n, x = c ? "none" : o, g = /* @__PURE__ */ d.jsx(Wg, { ref: p, className: t, variant: h, radius: x, ...f });
  return /* @__PURE__ */ d.jsxs(Ig, { data: r, cellRenderers: s, readOnly: a, onCellValueChange: u, children: [
    /* @__PURE__ */ d.jsx(Vg, { onChange: l }),
    /* @__PURE__ */ d.jsx(jh, { children: c ? /* @__PURE__ */ d.jsx("div", { className: oe("max-h-full min-h-0 overflow-auto overscroll-none w-fit max-w-full", m), children: g }) : g })
  ] });
}), Nl = i.createContext(null), Wg = i.forwardRef(function({
  className: t,
  variant: n,
  radius: o,
  slotId: r,
  ...s
}, a) {
  const { data: c, state: l, actions: u } = At(), f = i.useId();
  i.useImperativeHandle(a, () => ({
    undo: u.undo,
    redo: u.redo
  }), [u.undo, u.redo]);
  const [p, m] = i.useState(null), [h, x] = i.useState(null), [g, v] = i.useState(null), [C, b] = i.useState(null), [w, y] = i.useState(null), [E, I] = i.useState(0), [R, k] = i.useState(0), z = i.useRef(null), [T, L] = i.useState(null), [X, H] = i.useState(null), [Q, re] = i.useState(null), [U, K] = i.useState(0), [B, ie] = i.useState(!1), M = i.useRef(0), P = i.useRef(null), J = i.useRef(null), de = i.useRef(!1), ce = i.useRef(!1), ee = c.columns.map((j) => j.id), ue = {
    id: "header",
    cells: c.columns.map((j) => ({
      id: j.id,
      type: j.type === "checkbox" ? "checkbox" : "text",
      // 表头始终用 text（除 checkbox）
      value: j.type === "checkbox" ? !1 : j.title ?? "",
      width: j.width
    }))
  }, $ = ee.reduce((j, N) => j + (l.columnWidths[N] ?? 80), 0), ne = ee.reduce((j, N) => l.frozenColumns.has(N) ? j + (l.columnWidths[N] ?? 80) : j, 0), te = l.allColumns.find((j) => j.type === "checkbox")?.id, pe = te ? l.columnWidths[te] ?? 40 : 40, ve = te ? l.hiddenColumns.has(te) : !0, ye = ee.reduce((j, N) => l.frozenColumns.has(N) && N !== te ? j + (l.columnWidths[N] ?? 80) : j, 0), Ie = i.useMemo(() => {
    const j = {};
    let N = 0;
    return ee.forEach((W) => {
      l.frozenColumns.has(W) && (j[W] = N, N += l.columnWidths[W] ?? 80);
    }), j;
  }, [ee, l.frozenColumns, l.columnWidths]), be = i.useMemo(() => {
    if (!l.groupColumnId) return null;
    const j = l.allColumns.findIndex((ae) => ae.id === l.groupColumnId);
    if (j === -1) return null;
    const N = [], W = /* @__PURE__ */ new Map(), q = c.allRows ?? c.rows, se = /* @__PURE__ */ new Map();
    return c.rows.forEach((ae) => se.set(ae.id, ae)), q.forEach((ae) => {
      const we = String(ae.cells[j]?.value ?? "");
      W.has(we) || W.set(we, []);
      const xe = se.get(ae.id);
      xe && W.get(we).push(xe);
    }), W.forEach((ae, we) => {
      N.push({ groupValue: we, rows: ae });
    }), N.sort((ae, we) => !ae.groupValue && we.groupValue ? 1 : ae.groupValue && !we.groupValue ? -1 : 0), N;
  }, [l.groupColumnId, l.allColumns, c.allRows, c.rows]), et = i.useMemo(() => {
    const j = w || p;
    if (!j) return 0;
    let N = 0;
    for (const W of ee) {
      const q = l.columnWidths[W] ?? 80;
      if (W === j)
        return N + q;
      N += q;
    }
    return N;
  }, [w, p, ee, l.columnWidths]), tt = i.useMemo(() => {
    if (!X || !Q) return 0;
    let j = 0;
    for (const N of ee) {
      const W = l.columnWidths[N] ?? 80;
      if (N === X)
        return Q === "left" ? j : j + W;
      j += W;
    }
    return j;
  }, [X, Q, ee, l.columnWidths]), xt = T ? l.columnWidths[T] ?? 80 : 0, Eo = (j, N, W) => {
    z.current && (clearTimeout(z.current), z.current = null), y(j), m(null), I(W), k(N);
  }, Ro = i.useCallback((j) => {
    j ? (z.current && clearTimeout(z.current), z.current = setTimeout(() => {
      m(j), z.current = null;
    }, 200)) : (z.current && (clearTimeout(z.current), z.current = null), m(null));
  }, []);
  i.useEffect(() => {
    if (!w) return;
    const j = (W) => {
      const q = W.clientX - E, se = Math.max(40, R + q);
      u.updateColumnWidth(w, se);
    }, N = () => {
      y(null);
    };
    return document.addEventListener("mousemove", j), document.addEventListener("mouseup", N), () => {
      document.removeEventListener("mousemove", j), document.removeEventListener("mouseup", N);
    };
  }, [w, E, R, u]);
  const nt = i.useCallback((j, N, W) => {
    W.stopPropagation(), l.selectedColumnId !== j && u.selectColumn(j);
  }, [u, l.selectedColumnId]), tn = i.useRef(null), ko = i.useCallback((j, N) => {
    if (l.selectedColumnId !== j || l.frozenColumns.has(j)) return;
    N.preventDefault(), N.stopPropagation(), M.current = N.clientX;
    const W = (ae) => {
      if (Math.abs(ae.clientX - M.current) >= 4) {
        se();
        const xe = We.current?.getBoundingClientRect();
        if (xe) {
          const he = l.columnWidths[j] ?? 80;
          K(ae.clientX - xe.left - he / 2);
        }
        L(j);
      }
    }, q = () => {
      se();
    }, se = () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", q), tn.current = null;
    };
    tn.current = se, document.addEventListener("mousemove", W), document.addEventListener("mouseup", q);
  }, [l.selectedColumnId, l.frozenColumns]);
  i.useEffect(() => () => {
    tn.current?.();
  }, []), i.useEffect(() => {
    if (!T) return;
    const j = l.columnWidths[T] ?? 80;
    P.current = null, J.current = null, ie(!0);
    const N = ee.findIndex((se) => se === T), W = (se) => {
      const ae = We.current?.getBoundingClientRect();
      if (!ae) return;
      const we = se.clientX - ae.left;
      K(we - j / 2);
      const xe = se.clientX - ae.left + (We.current?.scrollLeft ?? 0);
      let he = 0, Re = null, Se = null;
      for (const A of ee) {
        const O = l.columnWidths[A] ?? 80, F = he + O / 2;
        if (xe >= he && xe < he + O) {
          Re = A, Se = xe < F ? "left" : "right";
          break;
        }
        he += O;
      }
      (() => {
        if (!Re || l.frozenColumns.has(Re) || Re === T) return !1;
        if (N === -1) return !0;
        const A = ee.findIndex((O) => O === Re);
        return !(A === N + 1 && Se === "left" || A === N - 1 && Se === "right");
      })() ? (H(Re), re(Se), P.current = Re, J.current = Se) : (H(null), re(null), P.current = null, J.current = null);
    }, q = () => {
      P.current && J.current && P.current !== T && u.moveColumnOrder(T, P.current, J.current), L(null), H(null), re(null), ie(!1), P.current = null, J.current = null, de.current = !0;
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", q), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", q);
    };
  }, [T, ee, l.columnWidths, l.frozenColumns, u]);
  const Po = i.useCallback(() => {
    if (de.current) {
      de.current = !1;
      return;
    }
    ce.current || (u.selectColumn(null), u.selectCell(null));
  }, [u]), xn = i.useCallback((j, N) => {
    l.readOnly || (N.stopPropagation(), N.target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) || u.selectCell(j);
  }, [u, l.readOnly]), bn = i.useCallback(() => {
    if (!l.selectedCellId) return null;
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (let N = 0; N < j.length; N++) {
      const W = j[N];
      if (W) {
        for (let q = 0; q < W.cells.length; q++)
          if (W.cells[q]?.id === l.selectedCellId)
            return { rowIndex: N, colIndex: q, rowId: W.id };
      }
    }
    return null;
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows]), ot = i.useCallback((j) => {
    const N = bn();
    if (!N) return;
    const W = l.groupColumnId ? be?.flatMap((we) => l.collapsedGroups.has(we.groupValue) ? [] : we.rows) ?? c.rows : c.rows;
    let q = N.rowIndex, se = N.colIndex;
    if (j === "ArrowLeft" || j === "ArrowRight") {
      const we = j === "ArrowLeft" ? -1 : 1, xe = (W[N.rowIndex]?.cells.length ?? 1) - 1;
      let he = N.colIndex + we;
      for (; he >= 0 && he <= xe; ) {
        const Re = W[N.rowIndex]?.cells[he];
        if (Re && Re.type !== "checkbox") {
          se = he;
          break;
        }
        he += we;
      }
    } else
      switch (j) {
        case "ArrowUp":
          q = Math.max(0, N.rowIndex - 1);
          break;
        case "ArrowDown":
          q = Math.min(W.length - 1, N.rowIndex + 1);
          break;
      }
    if (q === N.rowIndex && se === N.colIndex) return;
    const ae = W[q]?.cells[se];
    ae && ae.type !== "checkbox" && u.selectCell(ae.id);
  }, [bn, l.groupColumnId, l.collapsedGroups, be, c.rows, u]), jt = i.useCallback(() => {
    if (!l.selectedCellId) return null;
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (let W = 0; W < N.cells.length; W++) {
        const q = N.cells[W];
        if (q?.id === l.selectedCellId)
          return q.type ?? c.columns[W]?.type ?? "text";
      }
    return null;
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows, c.columns]), wn = i.useCallback(() => {
    if (!l.selectedCellId) return null;
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (const W of N.cells)
        if (W?.id === l.selectedCellId)
          return N.id;
    return null;
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows]), nn = i.useCallback(() => {
    if (!l.selectedCellId) return "";
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (let W = 0; W < N.cells.length; W++) {
        const q = N.cells[W];
        if (q && q.id === l.selectedCellId) {
          const se = c.columns[W];
          return se?.type === "select" && (se.options?.items || []).find((xe) => xe.value === q.value)?.label || String(q.value ?? "");
        }
      }
    return "";
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows, c.columns]), Ot = (j) => j && ["text", "number"].includes(j), _t = (j) => j && ["select", "checkbox"].includes(j), Dt = i.useCallback((j, N, W) => {
    const q = W.options?.items || [], se = [], ae = [];
    if (j.forEach((we, xe) => {
      const he = we.trim(), Re = q.find((Se) => Se.label === he);
      if (Re)
        se.push({ originalIndex: xe, optionValue: Re.value });
      else {
        const Se = ae.find((S) => S.label === he);
        if (Se)
          se.push({ originalIndex: xe, optionValue: Se.value });
        else {
          const S = `opt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${xe}`;
          ae.push({ value: S, label: he }), se.push({ originalIndex: xe, optionValue: S });
        }
      }
    }), ae.length > 0) {
      const we = [...q, ...ae];
      u.updateColumnOptions(N, { ...W.options, items: we });
    }
    return se;
  }, [u]), Mt = i.useCallback(() => {
    if (!l.selectedCellId) return;
    const j = document.querySelector(`[data-cell-id="${l.selectedCellId}"]`);
    if (!j) return;
    if (jt() === "checkbox") {
      const q = j.querySelector('input[type="checkbox"]');
      q && q.click();
      return;
    }
    const W = j.querySelector('input, [data-slot="select-trigger"]');
    W && W.focus();
  }, [l.selectedCellId, jt]);
  i.useEffect(() => {
    if (l.editingCellId) {
      const N = (W) => {
        W.key === "Tab" ? (W.preventDefault(), u.finishEdit(), ot(W.shiftKey ? "ArrowLeft" : "ArrowRight")) : W.key === "Enter" ? (W.preventDefault(), u.finishEdit(), ot(W.shiftKey ? "ArrowUp" : "ArrowDown")) : W.key === "Escape" && (W.preventDefault(), u.cancelEdit());
      };
      return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
    }
    if (!l.selectedCellId) return;
    const j = (N) => {
      if (document.activeElement.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]'))
        return;
      const se = jt();
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(N.key)) {
        N.preventDefault(), ot(N.key);
        return;
      }
      if (N.key === "Tab") {
        N.preventDefault(), ot(N.shiftKey ? "ArrowLeft" : "ArrowRight");
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault(), _t(se) ? Mt() : ot(N.shiftKey ? "ArrowUp" : "ArrowDown");
        return;
      }
      if (N.key === "F2" && !l.readOnly) {
        if (Ot(se)) {
          const ae = nn();
          u.startEdit(l.selectedCellId, ae);
        } else _t(se) && Mt();
        return;
      }
      if (N.key === "Delete" && !l.readOnly) {
        N.preventDefault(), N.stopPropagation(), N.stopImmediatePropagation(), Ot(se) && u.updateCellValue(l.selectedCellId, "");
        return;
      }
      if (N.key === "Backspace" && !l.readOnly) {
        if (N.preventDefault(), N.stopPropagation(), N.stopImmediatePropagation(), se === "select")
          u.updateCellValue(l.selectedCellId, "");
        else if (se === "checkbox") {
          const ae = wn();
          ae && u.toggleRowSelect(ae);
        } else se === "link" ? u.updateCellValue(l.selectedCellId, { buttonConfig: {} }) : se === "attachment" ? u.updateCellValue(l.selectedCellId, { attachmentFiles: [] }) : Ot(se) && u.updateCellValue(l.selectedCellId, "");
        return;
      }
      if (N.key.length === 1 && !N.ctrlKey && !N.metaKey && !l.readOnly) {
        if (Ot(se)) {
          if (se === "number" && !/^[\d\-.]$/.test(N.key)) return;
          const we = document.querySelector(`[data-cell-id="${l.selectedCellId}"]`)?.querySelector('[contenteditable="true"], [tabindex="0"]');
          we && we.focus();
        } else _t(se) && Mt();
        return;
      }
    };
    return document.addEventListener("keydown", j, !0), () => document.removeEventListener("keydown", j, !0);
  }, [l.selectedCellId, l.editingCellId, l.readOnly, c.rows, u, ot, jt, nn, wn, Mt]);
  const $t = i.useRef(!1);
  i.useEffect(() => {
    const j = (q) => {
      We.current?.contains(q.target) ?? !1 ? $t.current = !0 : q.target.closest('button, a, input, select, textarea, [role="button"], [data-interactive]') && ($t.current = !1);
    }, N = (q) => {
      if (!$t.current || l.editingCellId || document.activeElement?.closest("input, textarea, select")) return;
      const ae = q.metaKey || q.ctrlKey, we = q.key.toLowerCase();
      ae && we === "z" && !q.shiftKey ? (q.preventDefault(), u.undo()) : ae && we === "z" && q.shiftKey && (q.preventDefault(), u.redo());
    }, W = (q) => {
      if (!$t.current || l.editingCellId || l.readOnly || document.activeElement?.closest("input, textarea, select")) return;
      const ae = q.metaKey || q.ctrlKey, we = q.key.toLowerCase();
      if (ae && we === "c") {
        q.preventDefault(), q.stopPropagation();
        let xe = "";
        if (Ct.files = null, Ct.sourceCellId = null, st.buttonConfig = null, st.sourceCellId = null, l.selectedColumnId) {
          const he = l.allColumns.find((Re) => Re.id === l.selectedColumnId);
          if (he) {
            if (he.type === "attachment")
              return;
            const Re = c.rows, Se = c.columns.findIndex((S) => S.id === he.id);
            Se >= 0 && (xe = Re.map((A) => {
              const F = A.cells[Se]?.value ?? "";
              return he.type === "select" && (he.options?.items || []).find((D) => D.value === F)?.label || String(F);
            }).join(`
`));
          }
        } else if (l.selectedRows.size > 0) {
          const he = c.rows.filter((S) => l.selectedRows.has(S.id)), Re = l.allColumns.filter((S) => !l.hiddenColumns.has(S.id));
          xe = he.map((S) => Re.map((A) => {
            const O = c.columns.findIndex((V) => V.id === A.id), _ = (O >= 0 ? S.cells[O] : null)?.value ?? "";
            return A.type === "select" && (A.options?.items || []).find((Z) => Z.value === _)?.label || String(_);
          }).join("	")).join(`
`);
        } else if (l.selectedCellId)
          for (const he of c.rows)
            for (let Re = 0; Re < he.cells.length; Re++) {
              const Se = he.cells[Re];
              if (Se && Se.id === l.selectedCellId) {
                const S = c.columns[Re];
                if (S?.type === "attachment") {
                  const A = Se.attachmentFiles;
                  A && A.length > 0 && (Ct.files = A, Ct.sourceCellId = Se.id, xe = A.map((O) => O.name).join(", "));
                  break;
                }
                if (S?.type === "link") {
                  const A = Se.buttonConfig;
                  A && (st.buttonConfig = A, st.sourceCellId = Se.id, xe = A.label || A.url || "");
                  break;
                }
                if (S?.type === "select") {
                  xe = (S.options?.items || []).find((F) => F.value === Se.value)?.label || String(Se.value ?? "");
                  break;
                }
                xe = String(Se.value ?? "");
                break;
              }
            }
        xe && navigator.clipboard.writeText(xe).catch(() => {
          const he = document.createElement("textarea");
          he.value = xe, he.style.position = "fixed", he.style.opacity = "0", document.body.appendChild(he), he.select(), document.execCommand("copy"), document.body.removeChild(he);
        });
      }
      if (ae && we === "v") {
        q.preventDefault(), q.stopPropagation();
        const xe = Ct.files && Ct.files.length > 0, he = st.buttonConfig && (st.buttonConfig.label || st.buttonConfig.url);
        navigator.clipboard.readText().then((Re) => {
          const Se = Re ? Re.split(`
`).map((S) => S.split("	")) : [];
          if (l.selectedCellId) {
            const S = c.rows.findIndex(
              (D) => D.cells.some((Z) => Z.id === l.selectedCellId)
            );
            if (S < 0) return;
            const A = c.rows[S];
            if (!A) return;
            const O = A.cells.findIndex(
              (D) => D.id === l.selectedCellId
            );
            if (O < 0) return;
            const F = c.columns[O];
            if (F?.type === "attachment" && xe) {
              const D = A.cells[O];
              D && D.id && u.updateCellValue(D.id, { attachmentFiles: Ct.files });
              return;
            }
            if (F?.type === "link" && he) {
              const D = A.cells[O];
              D && D.id && u.updateCellValue(D.id, { buttonConfig: st.buttonConfig });
              return;
            }
            const _ = [];
            Se.forEach((D, Z) => {
              D && D.forEach((le, fe) => {
                const me = S + Z, Ce = O + fe;
                if (me < c.rows.length && Ce < c.columns.length) {
                  if (!c.rows[me]) return;
                  _.push({ rowIndex: me, colIndex: Ce, value: le });
                }
              });
            });
            const V = /* @__PURE__ */ new Map();
            _.forEach((D) => {
              const Z = c.columns[D.colIndex];
              if (Z?.type === "select") {
                const le = Z.id;
                V.has(le) || V.set(le, {
                  column: Z,
                  values: [],
                  targets: []
                });
                const fe = V.get(le);
                fe.values.push(D.value), fe.targets.push({ rowIndex: D.rowIndex, colIndex: D.colIndex });
              }
            }), V.forEach((D, Z) => {
              Dt(D.values, Z, D.column).forEach((fe) => {
                const me = D.targets[fe.originalIndex];
                if (!me) return;
                const Ce = c.rows[me.rowIndex];
                if (!Ce) return;
                const Ne = Ce.cells[me.colIndex];
                Ne && Ne.id && u.updateCellValue(Ne.id, fe.optionValue);
              });
            }), _.forEach((D) => {
              const Z = c.columns[D.colIndex];
              if (Z?.type === "select" || Z?.type === "attachment") return;
              if (Z?.type === "link") {
                const me = c.rows[D.rowIndex];
                if (!me) return;
                const Ce = me.cells[D.colIndex];
                if (Ce && Ce.id) {
                  const Ne = D.value.trim();
                  /^https?:\/\//.test(Ne) || /^\/\//.test(Ne) ? u.updateCellValue(Ce.id, { buttonConfig: { url: Ne } }) : u.updateCellValue(Ce.id, { buttonConfig: { label: Ne } });
                }
                return;
              }
              if (Z?.type === "number" && D.value && !/^-?\d*\.?\d*$/.test(D.value.trim()))
                return;
              const le = c.rows[D.rowIndex];
              if (!le) return;
              const fe = le.cells[D.colIndex];
              fe && fe.id && u.updateCellValue(fe.id, D.value);
            });
          } else if (l.selectedRows.size > 0) {
            const S = c.rows.filter((_) => l.selectedRows.has(_.id)), A = l.allColumns.filter((_) => !l.hiddenColumns.has(_.id)), O = [];
            S.forEach((_, V) => {
              if (!_ || V >= Se.length) return;
              const D = Se[V];
              D && D.forEach((Z, le) => {
                if (le >= A.length) return;
                const fe = A[le];
                if (!fe) return;
                const me = c.columns.findIndex((Ce) => Ce.id === fe.id);
                me >= 0 && O.push({ row: _, rowIndex: V, col: fe, colIndexInData: me, value: Z });
              });
            });
            const F = /* @__PURE__ */ new Map();
            O.forEach((_) => {
              if (_.col.type === "select") {
                const V = _.col.id;
                F.has(V) || F.set(V, {
                  column: _.col,
                  values: [],
                  targets: []
                });
                const D = F.get(V);
                D.values.push(_.value), D.targets.push({ row: _.row, colIndexInData: _.colIndexInData });
              }
            }), F.forEach((_, V) => {
              Dt(_.values, V, _.column).forEach((Z) => {
                const le = _.targets[Z.originalIndex];
                if (!le) return;
                const fe = le.row.cells[le.colIndexInData];
                fe && fe.id && u.updateCellValue(fe.id, Z.optionValue);
              });
            }), O.forEach((_) => {
              if (_.col.type === "select" || _.col.type === "number" && _.value && !/^-?\d*\.?\d*$/.test(_.value.trim()))
                return;
              const V = _.row.cells[_.colIndexInData];
              V && V.id && u.updateCellValue(V.id, _.value);
            });
          } else if (l.selectedColumnId) {
            const S = l.allColumns.find((A) => A.id === l.selectedColumnId);
            if (S) {
              const A = c.columns.findIndex((O) => O.id === S.id);
              if (A >= 0) {
                const O = [], F = [];
                Se.forEach((_, V) => {
                  if (V >= c.rows.length) return;
                  const D = c.rows[V];
                  D && (O.push(_?.[0] ?? ""), F.push({ row: D, rowIndex: V }));
                }), S.type === "select" ? Dt(O, S.id, S).forEach((V) => {
                  const D = F[V.originalIndex];
                  if (!D) return;
                  const Z = D.row.cells[A];
                  Z && Z.id && u.updateCellValue(Z.id, V.optionValue);
                }) : F.forEach((_, V) => {
                  const D = O[V];
                  if (S.type === "number" && D && !/^-?\d*\.?\d*$/.test(D.trim()))
                    return;
                  const Z = _.row.cells[A];
                  Z && Z.id && u.updateCellValue(Z.id, D);
                });
              }
            }
          }
        }).catch(() => {
        });
      }
    };
    return document.addEventListener("mousedown", j), document.addEventListener("keydown", N, !0), document.addEventListener("keydown", W, !0), () => {
      document.removeEventListener("mousedown", j), document.removeEventListener("keydown", N, !0), document.removeEventListener("keydown", W, !0);
    };
  }, [l.editingCellId, l.selectedCellId, l.selectedRows, l.selectedColumnId, l.allColumns, l.hiddenColumns, l.readOnly, c.rows, c.columns, u, nn, Dt]);
  const We = i.useRef(null), [Cn, on] = i.useState(0), [Lt, yn] = i.useState(!1);
  return i.useEffect(() => {
    const j = We.current?.parentElement;
    if (!j) return;
    const N = () => on(j.scrollLeft);
    return j.addEventListener("scroll", N), N(), () => j.removeEventListener("scroll", N);
  }, []), i.useEffect(() => {
    const j = We.current, N = j?.parentElement;
    if (!j || !N) return;
    const W = new ResizeObserver(() => {
      yn(j.scrollWidth > N.clientWidth);
    });
    return W.observe(j), W.observe(N), yn(j.scrollWidth > N.clientWidth), () => W.disconnect();
  }, []), i.useEffect(() => {
    if (!l.selectedColumnId && !l.selectedCellId) return;
    let j = !1;
    const N = (q) => {
      if (ce.current) return;
      j = We.current?.contains(q.target) ?? !1, q.target.closest('[data-slot="popover-content"], [data-slot="tooltip-content"]') && (j = !0);
    }, W = () => {
      if (!ce.current) {
        if (j) {
          j = !1;
          return;
        }
        u.selectColumn(null), u.selectCell(null), j = !1;
      }
    };
    return document.addEventListener("pointerdown", N), document.addEventListener("pointerup", W), () => {
      document.removeEventListener("pointerdown", N), document.removeEventListener("pointerup", W);
    };
  }, [l.selectedColumnId, l.selectedCellId, u]), /* @__PURE__ */ d.jsx(Nl.Provider, { value: ce, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: We,
      "data-slot": "data-table",
      "data-slot-id": r ?? f,
      "data-resizing": w || T ? "true" : void 0,
      className: oe(
        Tl({ variant: n, radius: o }),
        l.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
        t
      ),
      onClick: Po,
      ...s,
      children: [
        /* @__PURE__ */ d.jsx("div", { className: "sticky top-0 z-20", children: /* @__PURE__ */ d.jsx("div", { className: "relative", children: /* @__PURE__ */ d.jsx(
          Vo,
          {
            row: ue,
            isHeader: !0,
            columnIds: ee,
            onCellResizeStart: Eo,
            onCellHoverEdge: Ro,
            onHeaderCellClick: nt,
            onHeaderCellMouseDown: ko,
            draggingColumnId: T,
            frozenOffsets: Ie,
            frozenWidth: ne,
            rowWidth: $,
            groupColumnId: l.groupColumnId ?? void 0,
            hasOverflow: Lt
          }
        ) }) }),
        /* @__PURE__ */ d.jsx("div", { className: be || l.readOnly ? "pb-3" : void 0, children: be ? (
          // 分组渲染（每组序号独立计算）
          be.map((j, N) => {
            const W = l.collapsedGroups.has(j.groupValue), q = j.rows.every((se) => l.selectedRows.has(se.id));
            return /* @__PURE__ */ d.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ d.jsx(
                Fg,
                {
                  groupValue: j.groupValue,
                  rowCount: j.rows.length,
                  frozenWidth: ne,
                  rowWidth: $,
                  checkboxWidth: pe,
                  frozenNonCheckboxWidth: ye,
                  isCollapsed: W,
                  isGroupSelected: q,
                  onToggle: () => u.toggleGroupCollapse(j.groupValue),
                  onGroupSelect: () => u.toggleGroupSelect(j.groupValue, j.rows),
                  groupColumnId: l.groupColumnId,
                  isCheckboxHidden: ve,
                  hasOverflow: Lt
                }
              ),
              !W && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                j.rows.map((se, ae) => /* @__PURE__ */ d.jsx(
                  Vo,
                  {
                    row: se,
                    columnIds: ee,
                    rowIndex: ae + 1,
                    isLastRow: ae === j.rows.length - 1 && N === be.length - 1,
                    hoveringCellId: h,
                    onCellHover: x,
                    onBodyCellClick: xn,
                    frozenOffsets: Ie,
                    frozenWidth: ne,
                    rowWidth: $,
                    hasOverflow: Lt
                  },
                  se.id
                )),
                !l.readOnly && /* @__PURE__ */ d.jsx(
                  As,
                  {
                    rowWidth: $,
                    showBorder: !0,
                    isHovering: g?.groupValue === j.groupValue,
                    onHoverChange: (se) => v(se ? { groupValue: j.groupValue, cell: "add" } : null),
                    onInsert: () => l.groupColumnId && u.insertRowInGroup(j.groupValue, l.groupColumnId),
                    frozenWidth: ne,
                    checkboxWidth: pe,
                    isCheckboxHidden: ve
                  }
                )
              ] })
            ] }, j.groupValue);
          })
        ) : (
          // 普通渲染
          /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            c.rows.map((j, N) => /* @__PURE__ */ d.jsx(
              Vo,
              {
                row: j,
                columnIds: ee,
                rowIndex: N + 1,
                isLastRow: !1,
                hoveringCellId: h,
                onCellHover: x,
                onBodyCellClick: xn,
                frozenOffsets: Ie,
                frozenWidth: ne,
                rowWidth: $,
                hasOverflow: Lt
              },
              j.id
            )),
            !l.readOnly && /* @__PURE__ */ d.jsx(
              As,
              {
                rowWidth: $,
                showBorder: !1,
                isHovering: C !== null,
                onHoverChange: (j) => b(j ? "add" : null),
                onInsert: () => u.insertRow(),
                frozenWidth: ne,
                checkboxWidth: pe,
                isCheckboxHidden: ve
              }
            )
          ] })
        ) }),
        (p || w) && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${l.frozenColumns.has(p || w || "") ? et + Cn : et}px`
            }
          }
        ),
        T && X && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${l.frozenColumns.has(X) ? tt + Cn : tt}px`
            }
          }
        ),
        T && B && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none",
            style: {
              left: `${U}px`,
              width: `${xt}px`
            }
          }
        )
      ]
    }
  ) });
}), So = i.createContext({ size: "base" }), Mr = {
  sm: "p-2",
  base: "p-3",
  lg: "p-4"
}, Hg = {
  sm: "rounded-lg",
  base: "rounded-xl",
  lg: "rounded-2xl"
};
function tv({
  className: e,
  size: t = "base",
  ...n
}) {
  return /* @__PURE__ */ d.jsx(So.Provider, { value: { size: t }, children: /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "card",
      className: oe(
        "flex flex-col overflow-hidden border border-neutral-2 bg-white-100",
        Hg[t],
        e
      ),
      ...n
    }
  ) });
}
function nv({ className: e, ...t }) {
  const { size: n } = i.useContext(So);
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: oe("border-b border-neutral-2", Mr[n], e),
      ...t
    }
  );
}
function ov({ className: e, ...t }) {
  const { size: n } = i.useContext(So);
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: oe(
        "flex flex-1 items-center justify-center bg-neutral-1 min-h-24",
        Mr[n],
        e
      ),
      ...t
    }
  );
}
function rv({ className: e, ...t }) {
  const { size: n } = i.useContext(So);
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: oe(
        "flex items-center border-t border-neutral-2",
        Mr[n],
        e
      ),
      ...t
    }
  );
}
export {
  Pe as Button,
  tv as Card,
  ov as CardContent,
  rv as CardFooter,
  nv as CardHeader,
  yt as Cell,
  qg as CellSlot,
  Uo as Checkbox,
  ev as DataTable,
  ut as Input,
  Zg as NavigationItem,
  am as Select,
  cm as SelectContent,
  um as SelectItem,
  lm as SelectTrigger,
  dm as SelectValue,
  Jg as Table,
  Gg as Tabs,
  Xg as TabsContent,
  Jn as TabsContext,
  Kg as TabsList,
  Yg as TabsTrigger,
  Ic as buttonVariants,
  Zu as cellVariants,
  Ju as checkboxVariants,
  oe as cn,
  Tl as dataTableVariants,
  Ac as inputVariants,
  fm as navigationItemVariants,
  im as selectTriggerVariants,
  mi as slotVariants,
  pm as tableVariants,
  Yu as tabsListVariants,
  Xu as tabsTriggerVariants
};
//# sourceMappingURL=index.js.map
