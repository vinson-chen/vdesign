import * as i from "react";
import it, { useLayoutEffect as Tl, useState as Nl } from "react";
import * as Qt from "react-dom";
import Al from "react-dom";
function Ns(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Ns(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function As() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Ns(e)) && (o && (o += " "), o += t);
  return o;
}
const jl = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    n[o] = e[o];
  for (let o = 0; o < t.length; o++)
    n[e.length + o] = t[o];
  return n;
}, Ol = (e, t) => ({
  classGroupId: e,
  validator: t
}), js = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), Bn = "-", Mr = [], _l = "arbitrary..", Dl = (e) => {
  const t = $l(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return Ml(a);
      const c = a.split(Bn), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Os(c, l, t);
    },
    getConflictingClassGroupIds: (a, c) => {
      if (c) {
        const l = o[a], d = n[a];
        return l ? d ? jl(d, l) : l : d || Mr;
      }
      return n[a] || Mr;
    }
  };
}, Os = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const r = e[t], s = n.nextPart.get(r);
  if (s) {
    const d = Os(e, t + 1, s);
    if (d) return d;
  }
  const a = n.validators;
  if (a === null)
    return;
  const c = t === 0 ? e.join(Bn) : e.slice(t).join(Bn), l = a.length;
  for (let d = 0; d < l; d++) {
    const f = a[d];
    if (f.validator(c))
      return f.classGroupId;
  }
}, Ml = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), o = t.slice(0, n);
  return o ? _l + o : void 0;
})(), $l = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Ll(n, t);
}, Ll = (e, t) => {
  const n = js();
  for (const o in e) {
    const r = e[o];
    rr(r, n, o, t);
  }
  return n;
}, rr = (e, t, n, o) => {
  const r = e.length;
  for (let s = 0; s < r; s++) {
    const a = e[s];
    zl(a, t, n, o);
  }
}, zl = (e, t, n, o) => {
  if (typeof e == "string") {
    Fl(e, t, n);
    return;
  }
  if (typeof e == "function") {
    Vl(e, t, n, o);
    return;
  }
  Wl(e, t, n, o);
}, Fl = (e, t, n) => {
  const o = e === "" ? t : _s(t, e);
  o.classGroupId = n;
}, Vl = (e, t, n, o) => {
  if (Bl(e)) {
    rr(e(o), t, n, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Ol(n, e));
}, Wl = (e, t, n, o) => {
  const r = Object.entries(e), s = r.length;
  for (let a = 0; a < s; a++) {
    const [c, l] = r[a];
    rr(l, _s(t, c), n, o);
  }
}, _s = (e, t) => {
  let n = e;
  const o = t.split(Bn), r = o.length;
  for (let s = 0; s < r; s++) {
    const a = o[s];
    let c = n.nextPart.get(a);
    c || (c = js(), n.nextPart.set(a, c)), n = c;
  }
  return n;
}, Bl = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Hl = (e) => {
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
}, Vo = "!", $r = ":", Ul = [], Lr = (e, t, n, o, r) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: o,
  isExternal: r
}), Gl = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, c = 0, l = 0, d;
    const f = r.length;
    for (let g = 0; g < f; g++) {
      const x = r[g];
      if (a === 0 && c === 0) {
        if (x === $r) {
          s.push(r.slice(l, g)), l = g + 1;
          continue;
        }
        if (x === "/") {
          d = g;
          continue;
        }
      }
      x === "[" ? a++ : x === "]" ? a-- : x === "(" ? c++ : x === ")" && c--;
    }
    const p = s.length === 0 ? r : r.slice(l);
    let h = p, m = !1;
    p.endsWith(Vo) ? (h = p.slice(0, -1), m = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Vo) && (h = p.slice(1), m = !0)
    );
    const b = d && d > l ? d - l : void 0;
    return Lr(s, m, h, b);
  };
  if (t) {
    const r = t + $r, s = o;
    o = (a) => a.startsWith(r) ? s(a.slice(r.length)) : Lr(Ul, !1, a, void 0, !0);
  }
  if (n) {
    const r = o;
    o = (s) => n({
      className: s,
      parseClassName: r
    });
  }
  return o;
}, Kl = (e) => {
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
}, Yl = (e) => ({
  cache: Hl(e.cacheSize),
  parseClassName: Gl(e),
  sortModifiers: Kl(e),
  postfixLookupClassGroupIds: Xl(e),
  ...Dl(e)
}), Xl = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let o = 0; o < n.length; o++)
      t[n[o]] = !0;
  return t;
}, ql = /\s+/, Zl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s,
    postfixLookupClassGroupIds: a
  } = t, c = [], l = e.trim().split(ql);
  let d = "";
  for (let f = l.length - 1; f >= 0; f -= 1) {
    const p = l[f], {
      isExternal: h,
      modifiers: m,
      hasImportantModifier: b,
      baseClassName: g,
      maybePostfixModifierPosition: x
    } = n(p);
    if (h) {
      d = p + (d.length > 0 ? " " + d : d);
      continue;
    }
    let C = !!x, v;
    if (C) {
      const k = g.substring(0, x);
      v = o(k);
      const P = v && a[v] ? o(g) : void 0;
      P && P !== v && (v = P, C = !1);
    } else
      v = o(g);
    if (!v) {
      if (!C) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (v = o(g), !v) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      C = !1;
    }
    const w = m.length === 0 ? "" : m.length === 1 ? m[0] : s(m).join(":"), y = b ? w + Vo : w, S = y + v;
    if (c.indexOf(S) > -1)
      continue;
    c.push(S);
    const R = r(v, C);
    for (let k = 0; k < R.length; ++k) {
      const P = R[k];
      c.push(y + P);
    }
    d = p + (d.length > 0 ? " " + d : d);
  }
  return d;
}, Jl = (...e) => {
  let t = 0, n, o, r = "";
  for (; t < e.length; )
    (n = e[t++]) && (o = Ds(n)) && (r && (r += " "), r += o);
  return r;
}, Ds = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Ds(e[o])) && (n && (n += " "), n += t);
  return n;
}, Ql = (e, ...t) => {
  let n, o, r, s;
  const a = (l) => {
    const d = t.reduce((f, p) => p(f), e());
    return n = Yl(d), o = n.cache.get, r = n.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = o(l);
    if (d)
      return d;
    const f = Zl(l, n);
    return r(l, f), f;
  };
  return s = a, (...l) => s(Jl(...l));
}, ec = [], Ae = (e) => {
  const t = (n) => n[e] || ec;
  return t.isThemeGetter = !0, t;
}, Ms = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, $s = /^\((?:(\w[\w-]*):)?(.+)\)$/i, tc = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, nc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, oc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, rc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, sc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ic = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rt = (e) => tc.test(e), ge = (e) => !!e && !Number.isNaN(Number(e)), Be = (e) => !!e && Number.isInteger(Number(e)), Po = (e) => e.endsWith("%") && ge(e.slice(0, -1)), Ye = (e) => nc.test(e), Ls = () => !0, ac = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  oc.test(e) && !rc.test(e)
), sr = () => !1, lc = (e) => sc.test(e), cc = (e) => ic.test(e), uc = (e) => !G(e) && !Y(e), dc = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), fc = (e) => mt(e, Vs, sr), G = (e) => Ms.test(e), wt = (e) => mt(e, Ws, ac), zr = (e) => mt(e, wc, ge), pc = (e) => mt(e, Hs, Ls), mc = (e) => mt(e, Bs, sr), Fr = (e) => mt(e, zs, sr), hc = (e) => mt(e, Fs, cc), kn = (e) => mt(e, Us, lc), Y = (e) => $s.test(e), ln = (e) => Nt(e, Ws), gc = (e) => Nt(e, Bs), Vr = (e) => Nt(e, zs), vc = (e) => Nt(e, Vs), xc = (e) => Nt(e, Fs), Pn = (e) => Nt(e, Us, !0), bc = (e) => Nt(e, Hs, !0), mt = (e, t, n) => {
  const o = Ms.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Nt = (e, t, n = !1) => {
  const o = $s.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, zs = (e) => e === "position" || e === "percentage", Fs = (e) => e === "image" || e === "url", Vs = (e) => e === "length" || e === "size" || e === "bg-size", Ws = (e) => e === "length", wc = (e) => e === "number", Bs = (e) => e === "family-name", Hs = (e) => e === "number" || e === "weight", Us = (e) => e === "shadow", Cc = () => {
  const e = Ae("color"), t = Ae("font"), n = Ae("text"), o = Ae("font-weight"), r = Ae("tracking"), s = Ae("leading"), a = Ae("breakpoint"), c = Ae("container"), l = Ae("spacing"), d = Ae("radius"), f = Ae("shadow"), p = Ae("inset-shadow"), h = Ae("text-shadow"), m = Ae("drop-shadow"), b = Ae("blur"), g = Ae("perspective"), x = Ae("aspect"), C = Ae("ease"), v = Ae("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], S = () => [...y(), Y, G], R = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", "contain", "none"], P = () => [Y, G, l], z = () => [rt, "full", "auto", ...P()], T = () => [Be, "none", "subgrid", Y, G], L = () => ["auto", {
    span: ["full", Be, Y, G]
  }, Be, Y, G], X = () => [Be, "auto", Y, G], B = () => ["auto", "min", "max", "fr", Y, G], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], oe = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...P()], K = () => [rt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...P()], H = () => [rt, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...P()], ie = () => [rt, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...P()], M = () => [e, Y, G], I = () => [...y(), Vr, Fr, {
    position: [Y, G]
  }], J = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], de = () => ["auto", "cover", "contain", vc, fc, {
    size: [Y, G]
  }], ce = () => [Po, ln, wt], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    Y,
    G
  ], ue = () => ["", ge, ln, wt], $ = () => ["solid", "dashed", "dotted", "double"], ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], te = () => [ge, Po, Vr, Fr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    Y,
    G
  ], ve = () => ["none", ge, Y, G], ye = () => ["none", ge, Y, G], Ie = () => [ge, Y, G], be = () => [rt, "full", ...P()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ye],
      breakpoint: [Ye],
      color: [Ls],
      container: [Ye],
      "drop-shadow": [Ye],
      ease: ["in", "out", "in-out"],
      font: [uc],
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
        aspect: ["auto", "square", rt, G, Y, x]
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
      "container-named": [dc],
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
        object: S()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: R()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": R()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": R()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: k()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": k()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": k()
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
        z: [Be, "auto", Y, G]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [rt, "full", "auto", c, ...P()]
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
        order: [Be, "first", "last", "none", Y, G]
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
        "auto-cols": B()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": B()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: P()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": P()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": P()
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
        "justify-items": [...oe(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...oe()]
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
        items: [...oe(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...oe(), {
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
        "place-items": [...oe(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...oe()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: P()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: P()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: P()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: P()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: P()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: P()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: P()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: P()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: P()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: P()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: P()
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
        "space-x": P()
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
        "space-y": P()
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
        text: ["base", n, ln, wt]
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
        font: [o, bc, pc]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Po, G]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [gc, mc, t]
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
        "line-clamp": [ge, "none", Y, zr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...P()
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
        decoration: [ge, "from-font", "auto", Y, wt]
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
        indent: P()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [Be, Y, G]
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
        bg: I()
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
          }, Be, Y, G],
          radial: ["", Y, G],
          conic: [Be, Y, G]
        }, xc, hc]
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
        outline: ["", ge, ln, wt]
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
          Pn,
          kn
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
        "inset-shadow": ["none", p, Pn, kn]
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
        "ring-offset": [ge, wt]
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
        "text-shadow": ["none", h, Pn, kn]
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
        mask: I()
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
          m,
          Pn,
          kn
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
        "border-spacing": P()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": P()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": P()
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
        animate: ["none", v, Y, G]
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
        "perspective-origin": S()
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
        origin: S()
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
        zoom: [Be, Y, G]
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
        "scroll-m": P()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": P()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": P()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
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
        stroke: [ge, ln, wt, zr]
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
}, yc = /* @__PURE__ */ Ql(Cc);
function se(...e) {
  return yc(As(e));
}
var In = { exports: {} }, cn = {};
var Wr;
function Sc() {
  if (Wr) return cn;
  Wr = 1;
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
  return cn.Fragment = t, cn.jsx = n, cn.jsxs = n, cn;
}
var un = {};
var Br;
function Ec() {
  return Br || (Br = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(I) {
      if (I == null) return null;
      if (typeof I == "function")
        return I.$$typeof === L ? null : I.displayName || I.name || null;
      if (typeof I == "string") return I;
      switch (I) {
        case x:
          return "Fragment";
        case v:
          return "Profiler";
        case C:
          return "StrictMode";
        case R:
          return "Suspense";
        case k:
          return "SuspenseList";
        case T:
          return "Activity";
      }
      if (typeof I == "object")
        switch (typeof I.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), I.$$typeof) {
          case g:
            return "Portal";
          case y:
            return I.displayName || "Context";
          case w:
            return (I._context.displayName || "Context") + ".Consumer";
          case S:
            var J = I.render;
            return I = I.displayName, I || (I = J.displayName || J.name || "", I = I !== "" ? "ForwardRef(" + I + ")" : "ForwardRef"), I;
          case P:
            return J = I.displayName || null, J !== null ? J : e(I.type) || "Memo";
          case z:
            J = I._payload, I = I._init;
            try {
              return e(I(J));
            } catch {
            }
        }
      return null;
    }
    function t(I) {
      return "" + I;
    }
    function n(I) {
      try {
        t(I);
        var J = !1;
      } catch {
        J = !0;
      }
      if (J) {
        J = console;
        var de = J.error, ce = typeof Symbol == "function" && Symbol.toStringTag && I[Symbol.toStringTag] || I.constructor.name || "Object";
        return de.call(
          J,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ce
        ), t(I);
      }
    }
    function o(I) {
      if (I === x) return "<>";
      if (typeof I == "object" && I !== null && I.$$typeof === z)
        return "<...>";
      try {
        var J = e(I);
        return J ? "<" + J + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var I = X.A;
      return I === null ? null : I.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function a(I) {
      if (B.call(I, "key")) {
        var J = Object.getOwnPropertyDescriptor(I, "key").get;
        if (J && J.isReactWarning) return !1;
      }
      return I.key !== void 0;
    }
    function c(I, J) {
      function de() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          J
        ));
      }
      de.isReactWarning = !0, Object.defineProperty(I, "key", {
        get: de,
        configurable: !0
      });
    }
    function l() {
      var I = e(this.type);
      return K[I] || (K[I] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), I = this.props.ref, I !== void 0 ? I : null;
    }
    function d(I, J, de, ce, ee, ue) {
      var $ = de.ref;
      return I = {
        $$typeof: b,
        type: I,
        key: J,
        props: de,
        _owner: ce
      }, ($ !== void 0 ? $ : null) !== null ? Object.defineProperty(I, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(I, "ref", { enumerable: !1, value: null }), I._store = {}, Object.defineProperty(I._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(I, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(I, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ee
      }), Object.defineProperty(I, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ue
      }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    }
    function f(I, J, de, ce, ee, ue) {
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
      if (B.call(J, "key")) {
        $ = e(I);
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
        typeof I == "function" ? I.displayName || I.name || "Unknown" : I
      ), d(
        I,
        $,
        de,
        r(),
        ee,
        ue
      );
    }
    function p(I) {
      h(I) ? I._store && (I._store.validated = 1) : typeof I == "object" && I !== null && I.$$typeof === z && (I._payload.status === "fulfilled" ? h(I._payload.value) && I._payload.value._store && (I._payload.value._store.validated = 1) : I._store && (I._store.validated = 1));
    }
    function h(I) {
      return typeof I == "object" && I !== null && I.$$typeof === b;
    }
    var m = it, b = /* @__PURE__ */ Symbol.for("react.transitional.element"), g = /* @__PURE__ */ Symbol.for("react.portal"), x = /* @__PURE__ */ Symbol.for("react.fragment"), C = /* @__PURE__ */ Symbol.for("react.strict_mode"), v = /* @__PURE__ */ Symbol.for("react.profiler"), w = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), R = /* @__PURE__ */ Symbol.for("react.suspense"), k = /* @__PURE__ */ Symbol.for("react.suspense_list"), P = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), L = /* @__PURE__ */ Symbol.for("react.client.reference"), X = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = Object.prototype.hasOwnProperty, Q = Array.isArray, oe = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      react_stack_bottom_frame: function(I) {
        return I();
      }
    };
    var U, K = {}, H = m.react_stack_bottom_frame.bind(
      m,
      s
    )(), ie = oe(o(s)), M = {};
    un.Fragment = x, un.jsx = function(I, J, de) {
      var ce = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        I,
        J,
        de,
        !1,
        ce ? Error("react-stack-top-frame") : H,
        ce ? oe(o(I)) : ie
      );
    }, un.jsxs = function(I, J, de) {
      var ce = 1e4 > X.recentlyCreatedOwnerStacks++;
      return f(
        I,
        J,
        de,
        !0,
        ce ? Error("react-stack-top-frame") : H,
        ce ? oe(o(I)) : ie
      );
    };
  })()), un;
}
var Hr;
function Rc() {
  return Hr || (Hr = 1, process.env.NODE_ENV === "production" ? In.exports = Sc() : In.exports = Ec()), In.exports;
}
var u = Rc();
const Ur = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Gr = As, Oe = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Gr(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((d) => {
    const f = n?.[d], p = s?.[d];
    if (f === null) return null;
    const h = Ur(f) || Ur(p);
    return r[d][h];
  }), c = n && Object.entries(n).reduce((d, f) => {
    let [p, h] = f;
    return h === void 0 || (d[p] = h), d;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((d, f) => {
    let { class: p, className: h, ...m } = f;
    return Object.entries(m).every((b) => {
      let [g, x] = b;
      return Array.isArray(x) ? x.includes({
        ...s,
        ...c
      }[g]) : {
        ...s,
        ...c
      }[g] === x;
    }) ? [
      ...d,
      p,
      h
    ] : d;
  }, []);
  return Gr(e, a, l, n?.class, n?.className);
}, kc = Oe(
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
function ke({
  className: e,
  variant: t,
  size: n,
  noShift: o,
  disabled: r,
  leftIcon: s,
  rightIcon: a,
  children: c,
  slotId: l,
  ...d
}) {
  const f = i.useId();
  return /* @__PURE__ */ u.jsxs(
    "button",
    {
      "data-slot": "button",
      "data-slot-id": l ?? f,
      disabled: r,
      className: se(kc({ variant: t, size: n, noShift: o, disabled: r, className: e })),
      ...d,
      children: [
        s && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${s}` }) }),
        c,
        a && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
const Pc = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Ic = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1"
}, Tc = Oe(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: Pc,
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
), Nc = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" }
};
function ut({ className: e, variant: t, size: n, noSpinner: o, disabled: r, leftIcon: s, rightIcon: a, slotId: c, ...l }) {
  const d = r || t === "disabled", p = Nc[n ?? "base"], h = i.useId();
  return !s && !a ? /* @__PURE__ */ u.jsx(
    "input",
    {
      "data-slot": "input",
      "data-slot-id": c ?? h,
      disabled: d,
      className: se(
        Tc({ variant: t, size: n, noSpinner: o }),
        d && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
        e
      ),
      ...l
    }
  ) : /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "input",
      "data-slot-id": c ?? h,
      className: se(
        "flex items-center border bg-white-100 outline-none transition-all",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        Ic[t ?? "basic"],
        t === "disabled" && "cursor-not-allowed",
        e
      ),
      children: [
        s && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${s}` }) }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            disabled: d,
            className: se(
              "w-full bg-transparent outline-none text-black-85 placeholder:text-black-25",
              p.text,
              t === "disabled" && "text-neutral-3 placeholder:text-neutral-3 cursor-not-allowed"
            ),
            ...l
          }
        ),
        a && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: "shrink-0 text-black-55", style: { fill: "currentColor", width: p.icon, height: p.icon }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${a}` }) })
      ]
    }
  );
}
function Io(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Ac(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const d = (p) => {
      const { scope: h, children: m, ...b } = p, g = h?.[e]?.[l] || c, x = i.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u.jsx(g.Provider, { value: x, children: m });
    };
    d.displayName = s + "Provider";
    function f(p, h) {
      const m = h?.[e]?.[l] || c, b = i.useContext(m);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [d, f];
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
  return r.scopeName = e, [o, jc(r, ...t)];
}
function jc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: d }) => {
        const p = l(s)[`__scope${d}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Bt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Gs(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const d = (p) => {
      const { scope: h, children: m, ...b } = p, g = h?.[e]?.[l] || c, x = i.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u.jsx(g.Provider, { value: x, children: m });
    };
    d.displayName = s + "Provider";
    function f(p, h) {
      const m = h?.[e]?.[l] || c, b = i.useContext(m);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [d, f];
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
  return r.scopeName = e, [o, Oc(r, ...t)];
}
function Oc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: d }) => {
        const p = l(s)[`__scope${d}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Kr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function _c(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Kr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Kr(e[r], null);
        }
      };
  };
}
function Hn(...e) {
  return i.useCallback(_c(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Wo(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    Yr(r) && typeof Tn == "function" && (r = Tn(r._payload)), i.Children.forEach(r, (h) => {
      if (zc(h)) {
        c = !0;
        const m = h;
        let b = "child" in m.props ? m.props.child : m.props.children;
        Yr(b) && typeof Tn == "function" && (b = Tn(b._payload)), a = Mc(m, b), l.push(a?.props?.children);
      } else
        l.push(h);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const d = a ? Lc(a) : void 0, f = Hn(o, d);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Bc(e) : Wc(e)
        );
      return r;
    }
    const p = $c(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : d), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Dc = /* @__PURE__ */ Symbol.for("radix.slottable"), Mc = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function $c(e, t) {
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
function Lc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function zc(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Dc;
}
var Fc = /* @__PURE__ */ Symbol.for("react.lazy");
function Yr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Fc && "_payload" in e && Vc(e._payload);
}
function Vc(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Wc = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Bc = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, Tn = i[" use ".trim().toString()];
function Hc(e) {
  const t = e + "CollectionProvider", [n, o] = Gs(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: x, children: C } = g, v = i.useRef(null), w = i.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: w, collectionRef: v, children: C });
  };
  a.displayName = t;
  const c = e + "CollectionSlot", l = /* @__PURE__ */ Wo(c), d = i.forwardRef(
    (g, x) => {
      const { scope: C, children: v } = g, w = s(c, C), y = Hn(x, w.collectionRef);
      return /* @__PURE__ */ u.jsx(l, { ref: y, children: v });
    }
  );
  d.displayName = c;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", h = /* @__PURE__ */ Wo(f), m = i.forwardRef(
    (g, x) => {
      const { scope: C, children: v, ...w } = g, y = i.useRef(null), S = Hn(x, y), R = s(f, C);
      return i.useEffect(() => (R.itemMap.set(y, { ref: y, ...w }), () => {
        R.itemMap.delete(y);
      })), /* @__PURE__ */ u.jsx(h, { [p]: "", ref: S, children: v });
    }
  );
  m.displayName = f;
  function b(g) {
    const x = s(e + "CollectionConsumer", g);
    return i.useCallback(() => {
      const v = x.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (R, k) => w.indexOf(R.ref.current) - w.indexOf(k.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: a, Slot: d, ItemSlot: m },
    b,
    o
  ];
}
var Ks = globalThis?.document ? i.useLayoutEffect : () => {
}, Uc = i[" useId ".trim().toString()] || (() => {
}), Gc = 0;
function Kc(e) {
  const [t, n] = i.useState(Uc());
  return Ks(() => {
    n((o) => o ?? String(Gc++));
  }, [e]), t ? `radix-${t}` : "";
}
var Yc = [
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
], Ys = Yc.reduce((e, t) => {
  const n = /* @__PURE__ */ Wo(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Xc(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
var qc = i[" useInsertionEffect ".trim().toString()] || Ks;
function Zc({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = Jc({
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
  const d = i.useCallback(
    (f) => {
      if (c) {
        const p = Qc(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, d];
}
function Jc({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return qc(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Qc(e) {
  return typeof e == "function";
}
var eu = i.createContext(void 0);
function tu(e) {
  const t = i.useContext(eu);
  return e || t || "ltr";
}
var To = "rovingFocusGroup.onEntryFocus", nu = { bubbles: !1, cancelable: !0 }, mn = "RovingFocusGroup", [Bo, Xs, ou] = Hc(mn), [ru, qs] = Gs(
  mn,
  [ou]
), [su, iu] = ru(mn), Zs = i.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(Bo.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(Bo.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(au, { ...e, ref: t }) }) })
);
Zs.displayName = mn;
var au = i.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: c,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: f = !1,
    ...p
  } = e, h = i.useRef(null), m = Hn(t, h), b = tu(s), [g, x] = Zc({
    prop: a,
    defaultProp: c ?? null,
    onChange: l,
    caller: mn
  }), [C, v] = i.useState(!1), w = Xc(d), y = Xs(n), S = i.useRef(!1), [R, k] = i.useState(0);
  return i.useEffect(() => {
    const P = h.current;
    if (P)
      return P.addEventListener(To, w), () => P.removeEventListener(To, w);
  }, [w]), /* @__PURE__ */ u.jsx(
    su,
    {
      scope: n,
      orientation: o,
      dir: b,
      loop: r,
      currentTabStopId: g,
      onItemFocus: i.useCallback(
        (P) => x(P),
        [x]
      ),
      onItemShiftTab: i.useCallback(() => v(!0), []),
      onFocusableItemAdd: i.useCallback(
        () => k((P) => P + 1),
        []
      ),
      onFocusableItemRemove: i.useCallback(
        () => k((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ u.jsx(
        Ys.div,
        {
          tabIndex: C || R === 0 ? -1 : 0,
          "data-orientation": o,
          ...p,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: Bt(e.onMouseDown, () => {
            S.current = !0;
          }),
          onFocus: Bt(e.onFocus, (P) => {
            const z = !S.current;
            if (P.target === P.currentTarget && z && !C) {
              const T = new CustomEvent(To, nu);
              if (P.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const L = y().filter((U) => U.focusable), X = L.find((U) => U.active), B = L.find((U) => U.id === g), oe = [X, B, ...L].filter(
                  Boolean
                ).map((U) => U.ref.current);
                ei(oe, f);
              }
            }
            S.current = !1;
          }),
          onBlur: Bt(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), Js = "RovingFocusGroupItem", Qs = i.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...c
    } = e, l = Kc(), d = s || l, f = iu(Js, n), p = f.currentTabStopId === d, h = Xs(n), { onFocusableItemAdd: m, onFocusableItemRemove: b, currentTabStopId: g } = f;
    return i.useEffect(() => {
      if (o)
        return m(), () => b();
    }, [o, m, b]), /* @__PURE__ */ u.jsx(
      Bo.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ u.jsx(
          Ys.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": f.orientation,
            ...c,
            ref: t,
            onMouseDown: Bt(e.onMouseDown, (x) => {
              o ? f.onItemFocus(d) : x.preventDefault();
            }),
            onFocus: Bt(e.onFocus, () => f.onItemFocus(d)),
            onKeyDown: Bt(e.onKeyDown, (x) => {
              if (x.key === "Tab" && x.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (x.target !== x.currentTarget) return;
              const C = uu(x, f.orientation, f.dir);
              if (C !== void 0) {
                if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
                x.preventDefault();
                let w = h().filter((y) => y.focusable).map((y) => y.ref.current);
                if (C === "last") w.reverse();
                else if (C === "prev" || C === "next") {
                  C === "prev" && w.reverse();
                  const y = w.indexOf(x.currentTarget);
                  w = f.loop ? du(w, y + 1) : w.slice(y + 1);
                }
                setTimeout(() => ei(w));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: p, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
Qs.displayName = Js;
var lu = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function cu(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function uu(e, t, n) {
  const o = cu(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return lu[o];
}
function ei(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function du(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var fu = Zs, pu = Qs, Un = globalThis?.document ? i.useLayoutEffect : () => {
};
function mu(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var ti = (e) => {
  const { present: t, children: n } = e, o = hu(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = gu(o.ref, vu(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
ti.displayName = "Presence";
function hu(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = mu(a, {
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
    const d = Nn(o.current);
    s.current = c === "mounted" ? d : "none";
  }, [c]), Un(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const h = s.current, m = Nn(d);
      e ? l("MOUNT") : m === "none" || d?.display === "none" ? l("UNMOUNT") : l(f && h !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Un(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (m) => {
        const g = Nn(o.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, h = (m) => {
        m.target === t && (s.current = Nn(o.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Xr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function gu(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const c = Xr(a, n);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const c = s[a];
          typeof c == "function" ? c() : Xr(o[a], null);
        }
      };
  }, []);
}
function Nn(e) {
  return e?.animationName || "none";
}
function vu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function qr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function xu(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = qr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : qr(e[r], null);
        }
      };
  };
}
function bu(...e) {
  return i.useCallback(xu(...e), e);
}
// @__NO_SIDE_EFFECTS__
function wu(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    Zr(r) && typeof An == "function" && (r = An(r._payload)), i.Children.forEach(r, (h) => {
      if (Ru(h)) {
        c = !0;
        const m = h;
        let b = "child" in m.props ? m.props.child : m.props.children;
        Zr(b) && typeof An == "function" && (b = An(b._payload)), a = yu(m, b), l.push(a?.props?.children);
      } else
        l.push(h);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const d = a ? Eu(a) : void 0, f = bu(o, d);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Tu(e) : Iu(e)
        );
      return r;
    }
    const p = Su(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : d), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Cu = /* @__PURE__ */ Symbol.for("radix.slottable"), yu = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function Su(e, t) {
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
function Eu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Ru(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Cu;
}
var ku = /* @__PURE__ */ Symbol.for("react.lazy");
function Zr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === ku && "_payload" in e && Pu(e._payload);
}
function Pu(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Iu = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Tu = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, An = i[" use ".trim().toString()], Nu = [
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
], Qn = Nu.reduce((e, t) => {
  const n = /* @__PURE__ */ wu(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), Au = i.createContext(void 0);
function ju(e) {
  const t = i.useContext(Au);
  return e || t || "ltr";
}
var Ou = i[" useInsertionEffect ".trim().toString()] || Un;
function _u({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = Du({
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
  const d = i.useCallback(
    (f) => {
      if (c) {
        const p = Mu(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, d];
}
function Du({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Ou(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Mu(e) {
  return typeof e == "function";
}
var $u = i[" useId ".trim().toString()] || (() => {
}), Lu = 0;
function zu(e) {
  const [t, n] = i.useState($u());
  return Un(() => {
    n((o) => o ?? String(Lu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var eo = "Tabs", [Fu] = Ac(eo, [
  qs
]), ni = qs(), [Vu, ir] = Fu(eo), oi = i.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: o,
      onValueChange: r,
      defaultValue: s,
      orientation: a = "horizontal",
      dir: c,
      activationMode: l = "automatic",
      ...d
    } = e, f = ju(c), [p, h] = _u({
      prop: o,
      onChange: r,
      defaultProp: s ?? "",
      caller: eo
    });
    return /* @__PURE__ */ u.jsx(
      Vu,
      {
        scope: n,
        baseId: zu(),
        value: p,
        onValueChange: h,
        orientation: a,
        dir: f,
        activationMode: l,
        children: /* @__PURE__ */ u.jsx(
          Qn.div,
          {
            dir: f,
            "data-orientation": a,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
oi.displayName = eo;
var ri = "TabsList", si = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: o = !0, ...r } = e, s = ir(ri, n), a = ni(n);
    return /* @__PURE__ */ u.jsx(
      fu,
      {
        asChild: !0,
        ...a,
        orientation: s.orientation,
        dir: s.dir,
        loop: o,
        children: /* @__PURE__ */ u.jsx(
          Qn.div,
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
si.displayName = ri;
var ii = "TabsTrigger", ai = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, disabled: r = !1, ...s } = e, a = ir(ii, n), c = ni(n), l = ui(a.baseId, o), d = di(a.baseId, o), f = o === a.value;
    return /* @__PURE__ */ u.jsx(
      pu,
      {
        asChild: !0,
        ...c,
        focusable: !r,
        active: f,
        children: /* @__PURE__ */ u.jsx(
          Qn.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": f,
            "aria-controls": d,
            "data-state": f ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: l,
            ...s,
            ref: t,
            onMouseDown: Io(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? a.onValueChange(o) : p.preventDefault();
            }),
            onKeyDown: Io(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && a.onValueChange(o);
            }),
            onFocus: Io(e.onFocus, () => {
              const p = a.activationMode !== "manual";
              !f && !r && p && a.onValueChange(o);
            })
          }
        )
      }
    );
  }
);
ai.displayName = ii;
var li = "TabsContent", ci = i.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: o, forceMount: r, children: s, ...a } = e, c = ir(li, n), l = ui(c.baseId, o), d = di(c.baseId, o), f = o === c.value, p = i.useRef(f);
    return i.useEffect(() => {
      const h = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(h);
    }, []), /* @__PURE__ */ u.jsx(ti, { present: r || f, children: ({ present: h }) => /* @__PURE__ */ u.jsx(
      Qn.div,
      {
        "data-state": f ? "active" : "inactive",
        "data-orientation": c.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !h,
        id: d,
        tabIndex: 0,
        ...a,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: h && s
      }
    ) });
  }
);
ci.displayName = li;
function ui(e, t) {
  return `${e}-trigger-${t}`;
}
function di(e, t) {
  return `${e}-content-${t}`;
}
var Wu = oi, Bu = si, Hu = ai, Uu = ci;
const to = i.createContext({ size: "base" });
function Bg({ className: e, size: t = "base", children: n, slotId: o, ...r }) {
  const s = i.useId();
  return /* @__PURE__ */ u.jsx(to.Provider, { value: { size: t }, children: /* @__PURE__ */ u.jsx(Wu, { "data-slot": "tabs", "data-slot-id": o ?? s, className: se(e), ...r, children: n }) });
}
const Gu = Oe(
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
function Hg({ className: e, variant: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(to), s = i.useId();
  return /* @__PURE__ */ u.jsx(
    Bu,
    {
      "data-slot": "tabs-list",
      "data-slot-id": n ?? s,
      className: se(Gu({ variant: t, size: r }), e),
      ...o
    }
  );
}
const Ku = Oe(
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
function Ug({ className: e, variant: t, disabled: n, ...o }) {
  const { size: r } = i.useContext(to);
  return /* @__PURE__ */ u.jsx(
    Hu,
    {
      "data-slot": "tabs-trigger",
      "data-slot-id": o.value,
      disabled: n,
      className: se(Ku({ variant: t, size: r, disabled: n }), e),
      ...o
    }
  );
}
const Yu = Oe(
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
function Gg({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(to), r = i.useId();
  return /* @__PURE__ */ u.jsx(
    Uu,
    {
      "data-slot": "tabs-content",
      "data-slot-id": t ?? r,
      className: se(Yu({ size: o }), e),
      ...n
    }
  );
}
const Xu = Oe(
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
), fi = Oe(
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
), St = i.memo(function({ className: t, variant: n, width: o, columnId: r, children: s, isLastCell: a, resizable: c, onResizeStart: l, onHoverEdge: d, slotClassName: f, style: p, ...h }) {
  const m = i.useId(), b = i.useCallback((w) => {
    w.preventDefault(), w.stopPropagation(), l && l(o ?? 80, w.clientX);
  }, [l, o]), g = i.useCallback(() => {
    d?.(!0);
  }, [d]), x = i.useCallback(() => {
    d?.(!1);
  }, [d]), C = c && !a, v = i.useMemo(() => ({
    ...p,
    ...o ? { width: `${o}px`, minWidth: `${o}px` } : {}
  }), [p, o]);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "cell",
      "data-slot-id": r ?? m,
      className: se(
        Xu({ variant: n, className: t }),
        !a && "border-r border-neutral-2"
      ),
      style: v,
      ...h,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: se(fi({ size: "base" }), f), children: s ?? /* @__PURE__ */ u.jsx("span", { className: "text-black-85", children: "文本单元格" }) }),
        C && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10",
            onMouseEnter: g,
            onMouseLeave: x,
            onMouseDown: b
          }
        )
      ]
    }
  );
}), Kg = i.memo(function({
  className: t,
  size: n,
  children: o,
  slotId: r,
  ...s
}) {
  const a = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "cell-slot",
      "data-slot-id": r ?? a,
      className: se(fi({ size: n, className: t })),
      ...s,
      children: o
    }
  );
}), qu = Oe(
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
), Zu = Oe("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]"
    }
  },
  defaultVariants: { size: "base" }
}), Ju = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2"
};
function Ho({
  className: e,
  checked: t = !1,
  disabled: n = !1,
  size: o = "base",
  onChange: r,
  children: s,
  slotId: a,
  ...c
}) {
  const l = n, d = i.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "checkbox",
      "data-slot-id": a ?? d,
      role: "checkbox",
      "aria-checked": t,
      tabIndex: l ? void 0 : 0,
      className: se(
        "flex items-center",
        Ju[o ?? "base"],
        !l && "cursor-pointer",
        l && "cursor-not-allowed",
        e
      ),
      onClick: () => !l && r?.(!t),
      ...c,
      children: [
        /* @__PURE__ */ u.jsx(
          "div",
          {
            className: se(
              qu({
                checked: t ?? !1,
                disabled: n ?? !1,
                size: o ?? "base"
              })
            ),
            children: t && /* @__PURE__ */ u.jsx(
              "svg",
              {
                "aria-hidden": "true",
                className: se(
                  Zu({ size: o }),
                  l ? "text-black-25" : "text-white-100"
                ),
                style: { fill: "currentColor" },
                children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-check-sm" })
              }
            )
          }
        ),
        s
      ]
    }
  );
}
function Jr(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Ee(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Qu(e, t) {
  const n = i.createContext(t), o = (s) => {
    const { children: a, ...c } = s, l = i.useMemo(() => c, Object.values(c));
    return /* @__PURE__ */ u.jsx(n.Provider, { value: l, children: a });
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
function hn(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a), l = n.length;
    n = [...n, a];
    const d = (p) => {
      const { scope: h, children: m, ...b } = p, g = h?.[e]?.[l] || c, x = i.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u.jsx(g.Provider, { value: x, children: m });
    };
    d.displayName = s + "Provider";
    function f(p, h) {
      const m = h?.[e]?.[l] || c, b = i.useContext(m);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [d, f];
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
  return r.scopeName = e, [o, ed(r, ...t)];
}
function ed(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: d }) => {
        const p = l(s)[`__scope${d}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Qr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function pi(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Qr(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Qr(e[r], null);
        }
      };
  };
}
function Te(...e) {
  return i.useCallback(pi(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
  const t = /* @__PURE__ */ td(e), n = i.forwardRef((o, r) => {
    const { children: s, ...a } = o, c = i.Children.toArray(s), l = c.find(od);
    if (l) {
      const d = l.props.children, f = c.map((p) => p === l ? i.Children.count(d) > 1 ? i.Children.only(null) : i.isValidElement(d) ? d.props.children : null : p);
      return /* @__PURE__ */ u.jsx(t, { ...a, ref: r, children: i.isValidElement(d) ? i.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u.jsx(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function td(e) {
  const t = i.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (i.isValidElement(r)) {
      const a = sd(r), c = rd(s, r.props);
      return r.type !== i.Fragment && (c.ref = o ? pi(o, a) : a), i.cloneElement(r, c);
    }
    return i.Children.count(r) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var nd = /* @__PURE__ */ Symbol("radix.slottable");
function od(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === nd;
}
function rd(e, t) {
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
function sd(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function id(e) {
  const t = e + "CollectionProvider", [n, o] = hn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: x, children: C } = g, v = it.useRef(null), w = it.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u.jsx(r, { scope: x, itemMap: w, collectionRef: v, children: C });
  };
  a.displayName = t;
  const c = e + "CollectionSlot", l = /* @__PURE__ */ Gt(c), d = it.forwardRef(
    (g, x) => {
      const { scope: C, children: v } = g, w = s(c, C), y = Te(x, w.collectionRef);
      return /* @__PURE__ */ u.jsx(l, { ref: y, children: v });
    }
  );
  d.displayName = c;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", h = /* @__PURE__ */ Gt(f), m = it.forwardRef(
    (g, x) => {
      const { scope: C, children: v, ...w } = g, y = it.useRef(null), S = Te(x, y), R = s(f, C);
      return it.useEffect(() => (R.itemMap.set(y, { ref: y, ...w }), () => {
        R.itemMap.delete(y);
      })), /* @__PURE__ */ u.jsx(h, { [p]: "", ref: S, children: v });
    }
  );
  m.displayName = f;
  function b(g) {
    const x = s(e + "CollectionConsumer", g);
    return it.useCallback(() => {
      const v = x.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${p}]`));
      return Array.from(x.itemMap.values()).sort(
        (R, k) => w.indexOf(R.ref.current) - w.indexOf(k.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [
    { Provider: a, Slot: d, ItemSlot: m },
    b,
    o
  ];
}
var ad = i.createContext(void 0);
function ld(e) {
  const t = i.useContext(ad);
  return e || t || "ltr";
}
var cd = [
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
], Pe = cd.reduce((e, t) => {
  const n = /* @__PURE__ */ Gt(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function ud(e, t) {
  e && Qt.flushSync(() => e.dispatchEvent(t));
}
function Rt(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
function dd(e, t = globalThis?.document) {
  const n = Rt(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var fd = "DismissableLayer", Uo = "dismissableLayer.update", pd = "dismissableLayer.pointerDownOutside", md = "dismissableLayer.focusOutside", es, mi = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), no = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: c,
      ...l
    } = e, d = i.useContext(mi), [f, p] = i.useState(null), h = f?.ownerDocument ?? globalThis?.document, [, m] = i.useState({}), b = Te(t, (k) => p(k)), g = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), C = g.indexOf(x), v = f ? g.indexOf(f) : -1, w = d.layersWithOutsidePointerEventsDisabled.size > 0, y = v >= C, S = vd((k) => {
      const P = k.target, z = [...d.branches].some((T) => T.contains(P));
      !y || z || (r?.(k), a?.(k), k.defaultPrevented || c?.());
    }, h), R = xd((k) => {
      const P = k.target;
      [...d.branches].some((T) => T.contains(P)) || (s?.(k), a?.(k), k.defaultPrevented || c?.());
    }, h);
    return dd((k) => {
      v === d.layers.size - 1 && (o?.(k), !k.defaultPrevented && c && (k.preventDefault(), c()));
    }, h), i.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (es = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), ts(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = es);
        };
    }, [f, h, n, d]), i.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), ts());
    }, [f, d]), i.useEffect(() => {
      const k = () => m({});
      return document.addEventListener(Uo, k), () => document.removeEventListener(Uo, k);
    }, []), /* @__PURE__ */ u.jsx(
      Pe.div,
      {
        ...l,
        ref: b,
        style: {
          pointerEvents: w ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ee(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: Ee(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: Ee(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
no.displayName = fd;
var hd = "DismissableLayerBranch", gd = i.forwardRef((e, t) => {
  const n = i.useContext(mi), o = i.useRef(null), r = Te(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(Pe.div, { ...e, ref: r });
});
gd.displayName = hd;
function vd(e, t = globalThis?.document) {
  const n = Rt(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (c) => {
      if (c.target && !o.current) {
        let l = function() {
          hi(
            pd,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: c };
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
function xd(e, t = globalThis?.document) {
  const n = Rt(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && hi(md, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function ts() {
  const e = new CustomEvent(Uo);
  document.dispatchEvent(e);
}
function hi(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? ud(r, s) : r.dispatchEvent(s);
}
var No = 0;
function ar() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ns()), document.body.insertAdjacentElement("beforeend", e[1] ?? ns()), No++, () => {
      No === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), No--;
    };
  }, []);
}
function ns() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ao = "focusScope.autoFocusOnMount", jo = "focusScope.autoFocusOnUnmount", os = { bubbles: !1, cancelable: !0 }, bd = "FocusScope", oo = i.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [c, l] = i.useState(null), d = Rt(r), f = Rt(s), p = i.useRef(null), h = Te(t, (g) => l(g)), m = i.useRef({
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
        if (m.paused || !c) return;
        const y = w.target;
        c.contains(y) ? p.current = y : at(p.current, { select: !0 });
      }, x = function(w) {
        if (m.paused || !c) return;
        const y = w.relatedTarget;
        y !== null && (c.contains(y) || at(p.current, { select: !0 }));
      }, C = function(w) {
        if (document.activeElement === document.body)
          for (const S of w)
            S.removedNodes.length > 0 && at(c);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", x);
      const v = new MutationObserver(C);
      return c && v.observe(c, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", x), v.disconnect();
      };
    }
  }, [o, c, m.paused]), i.useEffect(() => {
    if (c) {
      ss.add(m);
      const g = document.activeElement;
      if (!c.contains(g)) {
        const C = new CustomEvent(Ao, os);
        c.addEventListener(Ao, d), c.dispatchEvent(C), C.defaultPrevented || (wd(Rd(gi(c)), { select: !0 }), document.activeElement === g && at(c));
      }
      return () => {
        c.removeEventListener(Ao, d), setTimeout(() => {
          const C = new CustomEvent(jo, os);
          c.addEventListener(jo, f), c.dispatchEvent(C), C.defaultPrevented || at(g ?? document.body, { select: !0 }), c.removeEventListener(jo, f), ss.remove(m);
        }, 0);
      };
    }
  }, [c, d, f, m]);
  const b = i.useCallback(
    (g) => {
      if (!n && !o || m.paused) return;
      const x = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, C = document.activeElement;
      if (x && C) {
        const v = g.currentTarget, [w, y] = Cd(v);
        w && y ? !g.shiftKey && C === y ? (g.preventDefault(), n && at(w, { select: !0 })) : g.shiftKey && C === w && (g.preventDefault(), n && at(y, { select: !0 })) : C === v && g.preventDefault();
      }
    },
    [n, o, m.paused]
  );
  return /* @__PURE__ */ u.jsx(Pe.div, { tabIndex: -1, ...a, ref: h, onKeyDown: b });
});
oo.displayName = bd;
function wd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (at(o, { select: t }), document.activeElement !== n) return;
}
function Cd(e) {
  const t = gi(e), n = rs(t, e), o = rs(t.reverse(), e);
  return [n, o];
}
function gi(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function rs(e, t) {
  for (const n of e)
    if (!yd(n, { upTo: t })) return n;
}
function yd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Sd(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function at(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Sd(e) && t && e.select();
  }
}
var ss = Ed();
function Ed() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = is(e, t), e.unshift(t);
    },
    remove(t) {
      e = is(e, t), e[0]?.resume();
    }
  };
}
function is(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Rd(e) {
  return e.filter((t) => t.tagName !== "A");
}
var je = globalThis?.document ? i.useLayoutEffect : () => {
}, kd = i[" useId ".trim().toString()] || (() => {
}), Pd = 0;
function Et(e) {
  const [t, n] = i.useState(kd());
  return je(() => {
    n((o) => o ?? String(Pd++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Id = ["top", "right", "bottom", "left"], dt = Math.min, De = Math.max, Gn = Math.round, jn = Math.floor, Ge = (e) => ({
  x: e,
  y: e
}), Td = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Go(e, t, n) {
  return De(e, dt(t, n));
}
function Ze(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Je(e) {
  return e.split("-")[0];
}
function en(e) {
  return e.split("-")[1];
}
function lr(e) {
  return e === "x" ? "y" : "x";
}
function cr(e) {
  return e === "y" ? "height" : "width";
}
function Ue(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function ur(e) {
  return lr(Ue(e));
}
function Nd(e, t, n) {
  n === void 0 && (n = !1);
  const o = en(e), r = ur(e), s = cr(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Kn(a)), [a, Kn(a)];
}
function Ad(e) {
  const t = Kn(e);
  return [Ko(e), t, Ko(t)];
}
function Ko(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const as = ["left", "right"], ls = ["right", "left"], jd = ["top", "bottom"], Od = ["bottom", "top"];
function _d(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ls : as : t ? as : ls;
    case "left":
    case "right":
      return t ? jd : Od;
    default:
      return [];
  }
}
function Dd(e, t, n, o) {
  const r = en(e);
  let s = _d(Je(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(Ko)))), s;
}
function Kn(e) {
  const t = Je(e);
  return Td[t] + e.slice(t.length);
}
function Md(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function vi(e) {
  return typeof e != "number" ? Md(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Yn(e) {
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
function cs(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = Ue(t), a = ur(t), c = cr(a), l = Je(t), d = s === "y", f = o.x + o.width / 2 - r.width / 2, p = o.y + o.height / 2 - r.height / 2, h = o[c] / 2 - r[c] / 2;
  let m;
  switch (l) {
    case "top":
      m = {
        x: f,
        y: o.y - r.height
      };
      break;
    case "bottom":
      m = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: p
      };
      break;
    case "left":
      m = {
        x: o.x - r.width,
        y: p
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch (en(t)) {
    case "start":
      m[a] -= h * (n && d ? -1 : 1);
      break;
    case "end":
      m[a] += h * (n && d ? -1 : 1);
      break;
  }
  return m;
}
async function $d(e, t) {
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
    boundary: d = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: h = !1,
    padding: m = 0
  } = Ze(t, e), b = vi(m), x = c[h ? p === "floating" ? "reference" : "floating" : p], C = Yn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(x))) == null || n ? x : x.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: d,
    rootBoundary: f,
    strategy: l
  })), v = p === "floating" ? {
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
  }, S = Yn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: v,
    offsetParent: w,
    strategy: l
  }) : v);
  return {
    top: (C.top - S.top + b.top) / y.y,
    bottom: (S.bottom - C.bottom + b.bottom) / y.y,
    left: (C.left - S.left + b.left) / y.x,
    right: (S.right - C.right + b.right) / y.x
  };
}
const Ld = 50, zd = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, c = a.detectOverflow ? a : {
    ...a,
    detectOverflow: $d
  }, l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let d = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: p
  } = cs(d, o, l), h = o, m = 0;
  const b = {};
  for (let g = 0; g < s.length; g++) {
    const x = s[g];
    if (!x)
      continue;
    const {
      name: C,
      fn: v
    } = x, {
      x: w,
      y,
      data: S,
      reset: R
    } = await v({
      x: f,
      y: p,
      initialPlacement: o,
      placement: h,
      strategy: r,
      middlewareData: b,
      rects: d,
      platform: c,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = w ?? f, p = y ?? p, b[C] = {
      ...b[C],
      ...S
    }, R && m < Ld && (m++, typeof R == "object" && (R.placement && (h = R.placement), R.rects && (d = R.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : R.rects), {
      x: f,
      y: p
    } = cs(d, h, l)), g = -1);
  }
  return {
    x: f,
    y: p,
    placement: h,
    strategy: r,
    middlewareData: b
  };
}, Fd = (e) => ({
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
      element: d,
      padding: f = 0
    } = Ze(e, t) || {};
    if (d == null)
      return {};
    const p = vi(f), h = {
      x: n,
      y: o
    }, m = ur(r), b = cr(m), g = await a.getDimensions(d), x = m === "y", C = x ? "top" : "left", v = x ? "bottom" : "right", w = x ? "clientHeight" : "clientWidth", y = s.reference[b] + s.reference[m] - h[m] - s.floating[b], S = h[m] - s.reference[m], R = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d));
    let k = R ? R[w] : 0;
    (!k || !await (a.isElement == null ? void 0 : a.isElement(R))) && (k = c.floating[w] || s.floating[b]);
    const P = y / 2 - S / 2, z = k / 2 - g[b] / 2 - 1, T = dt(p[C], z), L = dt(p[v], z), X = T, B = k - g[b] - L, Q = k / 2 - g[b] / 2 + P, oe = Go(X, Q, B), U = !l.arrow && en(r) != null && Q !== oe && s.reference[b] / 2 - (Q < X ? T : L) - g[b] / 2 < 0, K = U ? Q < X ? Q - X : Q - B : 0;
    return {
      [m]: h[m] + K,
      data: {
        [m]: oe,
        centerOffset: Q - oe - K,
        ...U && {
          alignmentOffset: K
        }
      },
      reset: U
    };
  }
}), Vd = function(e) {
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
        elements: d
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: h,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: g = !0,
        ...x
      } = Ze(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const C = Je(r), v = Ue(c), w = Je(c) === c, y = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), S = h || (w || !g ? [Kn(c)] : Ad(c)), R = b !== "none";
      !h && R && S.push(...Dd(c, g, b, y));
      const k = [c, ...S], P = await l.detectOverflow(t, x), z = [];
      let T = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (f && z.push(P[C]), p) {
        const Q = Nd(r, a, y);
        z.push(P[Q[0]], P[Q[1]]);
      }
      if (T = [...T, {
        placement: r,
        overflows: z
      }], !z.every((Q) => Q <= 0)) {
        var L, X;
        const Q = (((L = s.flip) == null ? void 0 : L.index) || 0) + 1, oe = k[Q];
        if (oe && (!(p === "alignment" ? v !== Ue(oe) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((H) => Ue(H.placement) === v ? H.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Q,
              overflows: T
            },
            reset: {
              placement: oe
            }
          };
        let U = (X = T.filter((K) => K.overflows[0] <= 0).sort((K, H) => K.overflows[1] - H.overflows[1])[0]) == null ? void 0 : X.placement;
        if (!U)
          switch (m) {
            case "bestFit": {
              var B;
              const K = (B = T.filter((H) => {
                if (R) {
                  const ie = Ue(H.placement);
                  return ie === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ie === "y";
                }
                return !0;
              }).map((H) => [H.placement, H.overflows.filter((ie) => ie > 0).reduce((ie, M) => ie + M, 0)]).sort((H, ie) => H[1] - ie[1])[0]) == null ? void 0 : B[0];
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
function us(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ds(e) {
  return Id.some((t) => e[t] >= 0);
}
const Wd = function(e) {
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
          }), c = us(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: ds(c)
            }
          };
        }
        case "escaped": {
          const a = await o.detectOverflow(t, {
            ...s,
            altBoundary: !0
          }), c = us(a, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: ds(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, xi = /* @__PURE__ */ new Set(["left", "top"]);
async function Bd(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Je(n), c = en(n), l = Ue(n) === "y", d = xi.has(a) ? -1 : 1, f = s && l ? -1 : 1, p = Ze(t, e);
  let {
    mainAxis: h,
    crossAxis: m,
    alignmentAxis: b
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return c && typeof b == "number" && (m = c === "end" ? b * -1 : b), l ? {
    x: m * f,
    y: h * d
  } : {
    x: h * d,
    y: m * f
  };
}
const Hd = function(e) {
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
      } = t, l = await Bd(t, e);
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
}, Ud = function(e) {
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
              x: v,
              y: w
            } = C;
            return {
              x: v,
              y: w
            };
          }
        },
        ...d
      } = Ze(e, t), f = {
        x: n,
        y: o
      }, p = await s.detectOverflow(t, d), h = Ue(Je(r)), m = lr(h);
      let b = f[m], g = f[h];
      if (a) {
        const C = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", w = b + p[C], y = b - p[v];
        b = Go(w, b, y);
      }
      if (c) {
        const C = h === "y" ? "top" : "left", v = h === "y" ? "bottom" : "right", w = g + p[C], y = g - p[v];
        g = Go(w, g, y);
      }
      const x = l.fn({
        ...t,
        [m]: b,
        [h]: g
      });
      return {
        ...x,
        data: {
          x: x.x - n,
          y: x.y - o,
          enabled: {
            [m]: a,
            [h]: c
          }
        }
      };
    }
  };
}, Gd = function(e) {
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
        crossAxis: d = !0
      } = Ze(e, t), f = {
        x: n,
        y: o
      }, p = Ue(r), h = lr(p);
      let m = f[h], b = f[p];
      const g = Ze(c, t), x = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const w = h === "y" ? "height" : "width", y = s.reference[h] - s.floating[w] + x.mainAxis, S = s.reference[h] + s.reference[w] - x.mainAxis;
        m < y ? m = y : m > S && (m = S);
      }
      if (d) {
        var C, v;
        const w = h === "y" ? "width" : "height", y = xi.has(Je(r)), S = s.reference[p] - s.floating[w] + (y && ((C = a.offset) == null ? void 0 : C[p]) || 0) + (y ? 0 : x.crossAxis), R = s.reference[p] + s.reference[w] + (y ? 0 : ((v = a.offset) == null ? void 0 : v[p]) || 0) - (y ? x.crossAxis : 0);
        b < S ? b = S : b > R && (b = R);
      }
      return {
        [h]: m,
        [p]: b
      };
    }
  };
}, Kd = function(e) {
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
        ...d
      } = Ze(e, t), f = await a.detectOverflow(t, d), p = Je(r), h = en(r), m = Ue(r) === "y", {
        width: b,
        height: g
      } = s.floating;
      let x, C;
      p === "top" || p === "bottom" ? (x = p, C = h === (await (a.isRTL == null ? void 0 : a.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (C = p, x = h === "end" ? "top" : "bottom");
      const v = g - f.top - f.bottom, w = b - f.left - f.right, y = dt(g - f[x], v), S = dt(b - f[C], w), R = !t.middlewareData.shift;
      let k = y, P = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (P = w), (o = t.middlewareData.shift) != null && o.enabled.y && (k = v), R && !h) {
        const T = De(f.left, 0), L = De(f.right, 0), X = De(f.top, 0), B = De(f.bottom, 0);
        m ? P = b - 2 * (T !== 0 || L !== 0 ? T + L : De(f.left, f.right)) : k = g - 2 * (X !== 0 || B !== 0 ? X + B : De(f.top, f.bottom));
      }
      await l({
        ...t,
        availableWidth: P,
        availableHeight: k
      });
      const z = await a.getDimensions(c.floating);
      return b !== z.width || g !== z.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ro() {
  return typeof window < "u";
}
function tn(e) {
  return bi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Me(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ke(e) {
  var t;
  return (t = (bi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function bi(e) {
  return ro() ? e instanceof Node || e instanceof Me(e).Node : !1;
}
function Le(e) {
  return ro() ? e instanceof Element || e instanceof Me(e).Element : !1;
}
function Qe(e) {
  return ro() ? e instanceof HTMLElement || e instanceof Me(e).HTMLElement : !1;
}
function fs(e) {
  return !ro() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Me(e).ShadowRoot;
}
function gn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Yd(e) {
  return /^(table|td|th)$/.test(tn(e));
}
function so(e) {
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
const Xd = /transform|translate|scale|rotate|perspective|filter/, qd = /paint|layout|strict|content/, Ct = (e) => !!e && e !== "none";
let Oo;
function dr(e) {
  const t = Le(e) ? ze(e) : e;
  return Ct(t.transform) || Ct(t.translate) || Ct(t.scale) || Ct(t.rotate) || Ct(t.perspective) || !fr() && (Ct(t.backdropFilter) || Ct(t.filter)) || Xd.test(t.willChange || "") || qd.test(t.contain || "");
}
function Zd(e) {
  let t = ft(e);
  for (; Qe(t) && !Kt(t); ) {
    if (dr(t))
      return t;
    if (so(t))
      return null;
    t = ft(t);
  }
  return null;
}
function fr() {
  return Oo == null && (Oo = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Oo;
}
function Kt(e) {
  return /^(html|body|#document)$/.test(tn(e));
}
function ze(e) {
  return Me(e).getComputedStyle(e);
}
function io(e) {
  return Le(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ft(e) {
  if (tn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    fs(e) && e.host || // Fallback.
    Ke(e)
  );
  return fs(t) ? t.host : t;
}
function wi(e) {
  const t = ft(e);
  return Kt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Qe(t) && gn(t) ? t : wi(t);
}
function fn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = wi(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = Me(r);
  if (s) {
    const c = Yo(a);
    return t.concat(a, a.visualViewport || [], gn(r) ? r : [], c && n ? fn(c) : []);
  } else
    return t.concat(r, fn(r, [], n));
}
function Yo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ci(e) {
  const t = ze(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Qe(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, c = Gn(n) !== s || Gn(o) !== a;
  return c && (n = s, o = a), {
    width: n,
    height: o,
    $: c
  };
}
function pr(e) {
  return Le(e) ? e : e.contextElement;
}
function Ht(e) {
  const t = pr(e);
  if (!Qe(t))
    return Ge(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Ci(t);
  let a = (s ? Gn(n.width) : n.width) / o, c = (s ? Gn(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: a,
    y: c
  };
}
const Jd = /* @__PURE__ */ Ge(0);
function yi(e) {
  const t = Me(e);
  return !fr() || !t.visualViewport ? Jd : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Qd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Me(e) ? !1 : t;
}
function kt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = pr(e);
  let a = Ge(1);
  t && (o ? Le(o) && (a = Ht(o)) : a = Ht(e));
  const c = Qd(s, n, o) ? yi(s) : Ge(0);
  let l = (r.left + c.x) / a.x, d = (r.top + c.y) / a.y, f = r.width / a.x, p = r.height / a.y;
  if (s) {
    const h = Me(s), m = o && Le(o) ? Me(o) : o;
    let b = h, g = Yo(b);
    for (; g && o && m !== b; ) {
      const x = Ht(g), C = g.getBoundingClientRect(), v = ze(g), w = C.left + (g.clientLeft + parseFloat(v.paddingLeft)) * x.x, y = C.top + (g.clientTop + parseFloat(v.paddingTop)) * x.y;
      l *= x.x, d *= x.y, f *= x.x, p *= x.y, l += w, d += y, b = Me(g), g = Yo(b);
    }
  }
  return Yn({
    width: f,
    height: p,
    x: l,
    y: d
  });
}
function ao(e, t) {
  const n = io(e).scrollLeft;
  return t ? t.left + n : kt(Ke(e)).left + n;
}
function Si(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - ao(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function ef(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = Ke(o), c = t ? so(t.floating) : !1;
  if (o === a || c && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Ge(1);
  const f = Ge(0), p = Qe(o);
  if ((p || !p && !s) && ((tn(o) !== "body" || gn(a)) && (l = io(o)), p)) {
    const m = kt(o);
    d = Ht(o), f.x = m.x + o.clientLeft, f.y = m.y + o.clientTop;
  }
  const h = a && !p && !s ? Si(a, l) : Ge(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + f.x + h.x,
    y: n.y * d.y - l.scrollTop * d.y + f.y + h.y
  };
}
function tf(e) {
  return Array.from(e.getClientRects());
}
function nf(e) {
  const t = Ke(e), n = io(e), o = e.ownerDocument.body, r = De(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = De(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + ao(e);
  const c = -n.scrollTop;
  return ze(o).direction === "rtl" && (a += De(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: c
  };
}
const ps = 25;
function of(e, t) {
  const n = Me(e), o = Ke(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, c = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const f = fr();
    (!f || f && t === "fixed") && (c = r.offsetLeft, l = r.offsetTop);
  }
  const d = ao(o);
  if (d <= 0) {
    const f = o.ownerDocument, p = f.body, h = getComputedStyle(p), m = f.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, b = Math.abs(o.clientWidth - p.clientWidth - m);
    b <= ps && (s -= b);
  } else d <= ps && (s += d);
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function rf(e, t) {
  const n = kt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = Qe(e) ? Ht(e) : Ge(1), a = e.clientWidth * s.x, c = e.clientHeight * s.y, l = r * s.x, d = o * s.y;
  return {
    width: a,
    height: c,
    x: l,
    y: d
  };
}
function ms(e, t, n) {
  let o;
  if (t === "viewport")
    o = of(e, n);
  else if (t === "document")
    o = nf(Ke(e));
  else if (Le(t))
    o = rf(t, n);
  else {
    const r = yi(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return Yn(o);
}
function Ei(e, t) {
  const n = ft(e);
  return n === t || !Le(n) || Kt(n) ? !1 : ze(n).position === "fixed" || Ei(n, t);
}
function sf(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = fn(e, [], !1).filter((c) => Le(c) && tn(c) !== "body"), r = null;
  const s = ze(e).position === "fixed";
  let a = s ? ft(e) : e;
  for (; Le(a) && !Kt(a); ) {
    const c = ze(a), l = dr(a);
    !l && c.position === "fixed" && (r = null), (s ? !l && !r : !l && c.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || gn(a) && !l && Ei(e, a)) ? o = o.filter((f) => f !== a) : r = c, a = ft(a);
  }
  return t.set(e, o), o;
}
function af(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? so(t) ? [] : sf(t, this._c) : [].concat(n), o], c = ms(t, a[0], r);
  let l = c.top, d = c.right, f = c.bottom, p = c.left;
  for (let h = 1; h < a.length; h++) {
    const m = ms(t, a[h], r);
    l = De(m.top, l), d = dt(m.right, d), f = dt(m.bottom, f), p = De(m.left, p);
  }
  return {
    width: d - p,
    height: f - l,
    x: p,
    y: l
  };
}
function lf(e) {
  const {
    width: t,
    height: n
  } = Ci(e);
  return {
    width: t,
    height: n
  };
}
function cf(e, t, n) {
  const o = Qe(t), r = Ke(t), s = n === "fixed", a = kt(e, !0, s, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ge(0);
  function d() {
    l.x = ao(r);
  }
  if (o || !o && !s)
    if ((tn(t) !== "body" || gn(r)) && (c = io(t)), o) {
      const m = kt(t, !0, s, t);
      l.x = m.x + t.clientLeft, l.y = m.y + t.clientTop;
    } else r && d();
  s && !o && r && d();
  const f = r && !o && !s ? Si(r, c) : Ge(0), p = a.left + c.scrollLeft - l.x - f.x, h = a.top + c.scrollTop - l.y - f.y;
  return {
    x: p,
    y: h,
    width: a.width,
    height: a.height
  };
}
function _o(e) {
  return ze(e).position === "static";
}
function hs(e, t) {
  if (!Qe(e) || ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ke(e) === n && (n = n.ownerDocument.body), n;
}
function Ri(e, t) {
  const n = Me(e);
  if (so(e))
    return n;
  if (!Qe(e)) {
    let r = ft(e);
    for (; r && !Kt(r); ) {
      if (Le(r) && !_o(r))
        return r;
      r = ft(r);
    }
    return n;
  }
  let o = hs(e, t);
  for (; o && Yd(o) && _o(o); )
    o = hs(o, t);
  return o && Kt(o) && _o(o) && !dr(o) ? n : o || Zd(e) || n;
}
const uf = async function(e) {
  const t = this.getOffsetParent || Ri, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: cf(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function df(e) {
  return ze(e).direction === "rtl";
}
const ff = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ef,
  getDocumentElement: Ke,
  getClippingRect: af,
  getOffsetParent: Ri,
  getElementRects: uf,
  getClientRects: tf,
  getDimensions: lf,
  getScale: Ht,
  isElement: Le,
  isRTL: df
};
function ki(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function pf(e, t) {
  let n = null, o;
  const r = Ke(e);
  function s() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function a(c, l) {
    c === void 0 && (c = !1), l === void 0 && (l = 1), s();
    const d = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: h,
      height: m
    } = d;
    if (c || t(), !h || !m)
      return;
    const b = jn(p), g = jn(r.clientWidth - (f + h)), x = jn(r.clientHeight - (p + m)), C = jn(f), w = {
      rootMargin: -b + "px " + -g + "px " + -x + "px " + -C + "px",
      threshold: De(0, dt(1, l)) || 1
    };
    let y = !0;
    function S(R) {
      const k = R[0].intersectionRatio;
      if (k !== l) {
        if (!y)
          return a();
        k ? a(!1, k) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      k === 1 && !ki(d, e.getBoundingClientRect()) && a(), y = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...w,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, w);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Pi(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, d = pr(e), f = r || s ? [...d ? fn(d) : [], ...t ? fn(t) : []] : [];
  f.forEach((C) => {
    r && C.addEventListener("scroll", n, {
      passive: !0
    }), s && C.addEventListener("resize", n);
  });
  const p = d && c ? pf(d, n) : null;
  let h = -1, m = null;
  a && (m = new ResizeObserver((C) => {
    let [v] = C;
    v && v.target === d && m && t && (m.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var w;
      (w = m) == null || w.observe(t);
    })), n();
  }), d && !l && m.observe(d), t && m.observe(t));
  let b, g = l ? kt(e) : null;
  l && x();
  function x() {
    const C = kt(e);
    g && !ki(g, C) && n(), g = C, b = requestAnimationFrame(x);
  }
  return n(), () => {
    var C;
    f.forEach((v) => {
      r && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), p?.(), (C = m) == null || C.disconnect(), m = null, l && cancelAnimationFrame(b);
  };
}
const mf = Hd, hf = Ud, gf = Vd, vf = Kd, xf = Wd, gs = Fd, bf = Gd, wf = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: ff,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return zd(e, t, {
    ...r,
    platform: s
  });
};
var Cf = typeof document < "u", yf = function() {
}, Fn = Cf ? Tl : yf;
function Xn(e, t) {
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
        if (!Xn(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !Xn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ii(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function vs(e, t) {
  const n = Ii(e);
  return Math.round(t * n) / n;
}
function Do(e) {
  const t = i.useRef(e);
  return Fn(() => {
    t.current = e;
  }), t;
}
function Ti(e) {
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
    open: d
  } = e, [f, p] = i.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, m] = i.useState(o);
  Xn(h, o) || m(o);
  const [b, g] = i.useState(null), [x, C] = i.useState(null), v = i.useCallback((H) => {
    H !== R.current && (R.current = H, g(H));
  }, []), w = i.useCallback((H) => {
    H !== k.current && (k.current = H, C(H));
  }, []), y = s || b, S = a || x, R = i.useRef(null), k = i.useRef(null), P = i.useRef(f), z = l != null, T = Do(l), L = Do(r), X = Do(d), B = i.useCallback(() => {
    if (!R.current || !k.current)
      return;
    const H = {
      placement: t,
      strategy: n,
      middleware: h
    };
    L.current && (H.platform = L.current), wf(R.current, k.current, H).then((ie) => {
      const M = {
        ...ie,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: X.current !== !1
      };
      Q.current && !Xn(P.current, M) && (P.current = M, Qt.flushSync(() => {
        p(M);
      }));
    });
  }, [h, t, n, L, X]);
  Fn(() => {
    d === !1 && P.current.isPositioned && (P.current.isPositioned = !1, p((H) => ({
      ...H,
      isPositioned: !1
    })));
  }, [d]);
  const Q = i.useRef(!1);
  Fn(() => (Q.current = !0, () => {
    Q.current = !1;
  }), []), Fn(() => {
    if (y && (R.current = y), S && (k.current = S), y && S) {
      if (T.current)
        return T.current(y, S, B);
      B();
    }
  }, [y, S, B, T, z]);
  const oe = i.useMemo(() => ({
    reference: R,
    floating: k,
    setReference: v,
    setFloating: w
  }), [v, w]), U = i.useMemo(() => ({
    reference: y,
    floating: S
  }), [y, S]), K = i.useMemo(() => {
    const H = {
      position: n,
      left: 0,
      top: 0
    };
    if (!U.floating)
      return H;
    const ie = vs(U.floating, f.x), M = vs(U.floating, f.y);
    return c ? {
      ...H,
      transform: "translate(" + ie + "px, " + M + "px)",
      ...Ii(U.floating) >= 1.5 && {
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
    update: B,
    refs: oe,
    elements: U,
    floatingStyles: K
  }), [f, B, oe, U, K]);
}
const Sf = (e) => {
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
      return o && t(o) ? o.current != null ? gs({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? gs({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, Ni = (e, t) => {
  const n = mf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Ai = (e, t) => {
  const n = hf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, ji = (e, t) => ({
  fn: bf(e).fn,
  options: [e, t]
}), Oi = (e, t) => {
  const n = gf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, _i = (e, t) => {
  const n = vf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Di = (e, t) => {
  const n = xf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Mi = (e, t) => {
  const n = Sf(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var Ef = "Arrow", $i = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ u.jsx(
    Pe.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
$i.displayName = Ef;
var Rf = $i;
function kf(e) {
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
          const l = s.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          a = d.inlineSize, c = d.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        n({ width: a, height: c });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var mr = "Popper", [Li, lo] = hn(mr), [Pf, zi] = Li(mr), Fi = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null);
  return /* @__PURE__ */ u.jsx(Pf, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Fi.displayName = mr;
var Vi = "PopperAnchor", Wi = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = zi(Vi, n), a = i.useRef(null), c = Te(t, a), l = i.useRef(null);
    return i.useEffect(() => {
      const d = l.current;
      l.current = o?.current || a.current, d !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ u.jsx(Pe.div, { ...r, ref: c });
  }
);
Wi.displayName = Vi;
var hr = "PopperContent", [If, Tf] = Li(hr), Bi = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: c = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: b,
      ...g
    } = e, x = zi(hr, n), [C, v] = i.useState(null), w = Te(t, ($) => v($)), [y, S] = i.useState(null), R = kf(y), k = R?.width ?? 0, P = R?.height ?? 0, z = o + (s !== "center" ? "-" + s : ""), T = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, L = Array.isArray(d) ? d : [d], X = L.length > 0, B = {
      padding: T,
      boundary: L.filter(Af),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: oe, placement: U, isPositioned: K, middlewareData: H } = Ti({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (...$) => Pi(...$, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        Ni({ mainAxis: r + P, alignmentAxis: a }),
        l && Ai({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? ji() : void 0,
          ...B
        }),
        l && Oi({ ...B }),
        _i({
          ...B,
          apply: ({ elements: $, rects: ne, availableWidth: te, availableHeight: pe }) => {
            const { width: ve, height: ye } = ne.reference, Ie = $.floating.style;
            Ie.setProperty("--radix-popper-available-width", `${te}px`), Ie.setProperty("--radix-popper-available-height", `${pe}px`), Ie.setProperty("--radix-popper-anchor-width", `${ve}px`), Ie.setProperty("--radix-popper-anchor-height", `${ye}px`);
          }
        }),
        y && Mi({ element: y, padding: c }),
        jf({ arrowWidth: k, arrowHeight: P }),
        h && Di({ strategy: "referenceHidden", ...B })
      ]
    }), [ie, M] = Gi(U), I = Rt(b);
    je(() => {
      K && I?.();
    }, [K, I]);
    const J = H.arrow?.x, de = H.arrow?.y, ce = H.arrow?.centerOffset !== 0, [ee, ue] = i.useState();
    return je(() => {
      C && ue(window.getComputedStyle(C).zIndex);
    }, [C]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...oe,
          transform: K ? oe.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ee,
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
          If,
          {
            scope: n,
            placedSide: ie,
            onArrowChange: S,
            arrowX: J,
            arrowY: de,
            shouldHideArrow: ce,
            children: /* @__PURE__ */ u.jsx(
              Pe.div,
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
Bi.displayName = hr;
var Hi = "PopperArrow", Nf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ui = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Tf(Hi, o), a = Nf[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u.jsx(
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
        children: /* @__PURE__ */ u.jsx(
          Rf,
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
Ui.displayName = Hi;
function Af(e) {
  return e !== null;
}
var jf = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, c = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [d, f] = Gi(n), p = { start: "0%", center: "50%", end: "100%" }[f], h = (r.arrow?.x ?? 0) + c / 2, m = (r.arrow?.y ?? 0) + l / 2;
    let b = "", g = "";
    return d === "bottom" ? (b = a ? p : `${h}px`, g = `${-l}px`) : d === "top" ? (b = a ? p : `${h}px`, g = `${o.floating.height + l}px`) : d === "right" ? (b = `${-l}px`, g = a ? p : `${m}px`) : d === "left" && (b = `${o.floating.width + l}px`, g = a ? p : `${m}px`), { data: { x: b, y: g } };
  }
});
function Gi(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ki = Fi, gr = Wi, Yi = Bi, Xi = Ui, Of = "Portal", vr = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  je(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Al.createPortal(/* @__PURE__ */ u.jsx(Pe.div, { ...o, ref: t }), a) : null;
});
vr.displayName = Of;
var _f = i[" useInsertionEffect ".trim().toString()] || je;
function qn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = Df({
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
  const d = i.useCallback(
    (f) => {
      if (c) {
        const p = Mf(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, d];
}
function Df({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return _f(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function Mf(e) {
  return typeof e == "function";
}
function $f(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var qi = Object.freeze({
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
}), Lf = "VisuallyHidden", zf = i.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    Pe.span,
    {
      ...e,
      ref: t,
      style: { ...qi, ...e.style }
    }
  )
);
zf.displayName = Lf;
var Ff = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ft = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), _n = {}, Mo = 0, Zi = function(e) {
  return e && (e.host || Zi(e.parentNode));
}, Vf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Zi(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Wf = function(e, t, n, o) {
  var r = Vf(t, Array.isArray(e) ? e : [e]);
  _n[n] || (_n[n] = /* @__PURE__ */ new WeakMap());
  var s = _n[n], a = [], c = /* @__PURE__ */ new Set(), l = new Set(r), d = function(p) {
    !p || c.has(p) || (c.add(p), d(p.parentNode));
  };
  r.forEach(d);
  var f = function(p) {
    !p || l.has(p) || Array.prototype.forEach.call(p.children, function(h) {
      if (c.has(h))
        f(h);
      else
        try {
          var m = h.getAttribute(o), b = m !== null && m !== "false", g = (Ft.get(h) || 0) + 1, x = (s.get(h) || 0) + 1;
          Ft.set(h, g), s.set(h, x), a.push(h), g === 1 && b && On.set(h, !0), x === 1 && h.setAttribute(n, "true"), b || h.setAttribute(o, "true");
        } catch (C) {
          console.error("aria-hidden: cannot operate on ", h, C);
        }
    });
  };
  return f(t), c.clear(), Mo++, function() {
    a.forEach(function(p) {
      var h = Ft.get(p) - 1, m = s.get(p) - 1;
      Ft.set(p, h), s.set(p, m), h || (On.has(p) || p.removeAttribute(o), On.delete(p)), m || p.removeAttribute(n);
    }), Mo--, Mo || (Ft = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), _n = {});
  };
}, xr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ff(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Wf(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, He = function() {
  return He = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, He.apply(this, arguments);
};
function Ji(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Bf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Vn = "right-scroll-bar-position", Wn = "width-before-scroll-bar", Hf = "with-scroll-bars-hidden", Uf = "--removed-body-scroll-bar-size";
function $o(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Gf(e, t) {
  var n = Nl(function() {
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
var Kf = typeof window < "u" ? i.useLayoutEffect : i.useEffect, xs = /* @__PURE__ */ new WeakMap();
function Yf(e, t) {
  var n = Gf(null, function(o) {
    return e.forEach(function(r) {
      return $o(r, o);
    });
  });
  return Kf(function() {
    var o = xs.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(c) {
        s.has(c) || $o(c, null);
      }), s.forEach(function(c) {
        r.has(c) || $o(c, a);
      });
    }
    xs.set(n, e);
  }, [e]), n;
}
function Xf(e) {
  return e;
}
function qf(e, t) {
  t === void 0 && (t = Xf);
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
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(f) {
          a.push(f), d();
        },
        filter: function(f) {
          return a = a.filter(f), n;
        }
      };
    }
  };
  return r;
}
function Zf(e) {
  e === void 0 && (e = {});
  var t = qf(null);
  return t.options = He({ async: !0, ssr: !1 }, e), t;
}
var Qi = function(e) {
  var t = e.sideCar, n = Ji(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return i.createElement(o, He({}, n));
};
Qi.isSideCarExport = !0;
function Jf(e, t) {
  return e.useMedium(t), Qi;
}
var ea = Zf(), Lo = function() {
}, co = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({
    onScrollCapture: Lo,
    onWheelCapture: Lo,
    onTouchMoveCapture: Lo
  }), r = o[0], s = o[1], a = e.forwardProps, c = e.children, l = e.className, d = e.removeScrollBar, f = e.enabled, p = e.shards, h = e.sideCar, m = e.noRelative, b = e.noIsolation, g = e.inert, x = e.allowPinchZoom, C = e.as, v = C === void 0 ? "div" : C, w = e.gapMode, y = Ji(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = h, R = Yf([n, t]), k = He(He({}, y), r);
  return i.createElement(
    i.Fragment,
    null,
    f && i.createElement(S, { sideCar: ea, removeScrollBar: d, shards: p, noRelative: m, noIsolation: b, inert: g, setCallbacks: s, allowPinchZoom: !!x, lockRef: n, gapMode: w }),
    a ? i.cloneElement(i.Children.only(c), He(He({}, k), { ref: R })) : i.createElement(v, He({}, k, { className: l, ref: R }), c)
  );
});
co.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
co.classNames = {
  fullWidth: Wn,
  zeroRight: Vn
};
var Qf = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ep() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Qf();
  return t && e.setAttribute("nonce", t), e;
}
function tp(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function np(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var op = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = ep()) && (tp(t, n), np(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, rp = function() {
  var e = op();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ta = function() {
  var e = rp(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, sp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, zo = function(e) {
  return parseInt(e || "", 10) || 0;
}, ip = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [zo(n), zo(o), zo(r)];
}, ap = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return sp;
  var t = ip(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, lp = ta(), Ut = "data-scroll-locked", cp = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, c = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Hf, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(c, "px ").concat(o, `;
  }
  body[`).concat(Ut, `] {
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
  
  .`).concat(Vn, ` {
    right: `).concat(c, "px ").concat(o, `;
  }
  
  .`).concat(Wn, ` {
    margin-right: `).concat(c, "px ").concat(o, `;
  }
  
  .`).concat(Vn, " .").concat(Vn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Wn, " .").concat(Wn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Ut, `] {
    `).concat(Uf, ": ").concat(c, `px;
  }
`);
}, bs = function() {
  var e = parseInt(document.body.getAttribute(Ut) || "0", 10);
  return isFinite(e) ? e : 0;
}, up = function() {
  i.useEffect(function() {
    return document.body.setAttribute(Ut, (bs() + 1).toString()), function() {
      var e = bs() - 1;
      e <= 0 ? document.body.removeAttribute(Ut) : document.body.setAttribute(Ut, e.toString());
    };
  }, []);
}, dp = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  up();
  var s = i.useMemo(function() {
    return ap(r);
  }, [r]);
  return i.createElement(lp, { styles: cp(s, !t, r, n ? "" : "!important") });
}, Xo = !1;
if (typeof window < "u")
  try {
    var Dn = Object.defineProperty({}, "passive", {
      get: function() {
        return Xo = !0, !0;
      }
    });
    window.addEventListener("test", Dn, Dn), window.removeEventListener("test", Dn, Dn);
  } catch {
    Xo = !1;
  }
var Vt = Xo ? { passive: !1 } : !1, fp = function(e) {
  return e.tagName === "TEXTAREA";
}, na = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !fp(e) && n[t] === "visible")
  );
}, pp = function(e) {
  return na(e, "overflowY");
}, mp = function(e) {
  return na(e, "overflowX");
}, ws = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = oa(e, o);
    if (r) {
      var s = ra(e, o), a = s[1], c = s[2];
      if (a > c)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, hp = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, gp = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, oa = function(e, t) {
  return e === "v" ? pp(t) : mp(t);
}, ra = function(e, t) {
  return e === "v" ? hp(t) : gp(t);
}, vp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, xp = function(e, t, n, o, r) {
  var s = vp(e, window.getComputedStyle(t).direction), a = s * o, c = n.target, l = t.contains(c), d = !1, f = a > 0, p = 0, h = 0;
  do {
    if (!c)
      break;
    var m = ra(e, c), b = m[0], g = m[1], x = m[2], C = g - x - s * b;
    (b || C) && oa(e, c) && (p += C, h += b);
    var v = c.parentNode;
    c = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && c !== document.body || // self content
    l && (t.contains(c) || t === c)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(h) < 1) && (d = !0), d;
}, Mn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Cs = function(e) {
  return [e.deltaX, e.deltaY];
}, ys = function(e) {
  return e && "current" in e ? e.current : e;
}, bp = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, wp = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Cp = 0, Wt = [];
function yp(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(Cp++)[0], s = i.useState(ta)[0], a = i.useRef(e);
  i.useEffect(function() {
    a.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = Bf([e.lockRef.current], (e.shards || []).map(ys), !0).filter(Boolean);
      return g.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var c = i.useCallback(function(g, x) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var C = Mn(g), v = n.current, w = "deltaX" in g ? g.deltaX : v[0] - C[0], y = "deltaY" in g ? g.deltaY : v[1] - C[1], S, R = g.target, k = Math.abs(w) > Math.abs(y) ? "h" : "v";
    if ("touches" in g && k === "h" && R.type === "range")
      return !1;
    var P = window.getSelection(), z = P && P.anchorNode, T = z ? z === R || z.contains(R) : !1;
    if (T)
      return !1;
    var L = ws(k, R);
    if (!L)
      return !0;
    if (L ? S = k : (S = k === "v" ? "h" : "v", L = ws(k, R)), !L)
      return !1;
    if (!o.current && "changedTouches" in g && (w || y) && (o.current = S), !S)
      return !0;
    var X = o.current || S;
    return xp(X, x, g, X === "h" ? w : y);
  }, []), l = i.useCallback(function(g) {
    var x = g;
    if (!(!Wt.length || Wt[Wt.length - 1] !== s)) {
      var C = "deltaY" in x ? Cs(x) : Mn(x), v = t.current.filter(function(S) {
        return S.name === x.type && (S.target === x.target || x.target === S.shadowParent) && bp(S.delta, C);
      })[0];
      if (v && v.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!v) {
        var w = (a.current.shards || []).map(ys).filter(Boolean).filter(function(S) {
          return S.contains(x.target);
        }), y = w.length > 0 ? c(x, w[0]) : !a.current.noIsolation;
        y && x.cancelable && x.preventDefault();
      }
    }
  }, []), d = i.useCallback(function(g, x, C, v) {
    var w = { name: g, delta: x, target: C, should: v, shadowParent: Sp(C) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== w;
      });
    }, 1);
  }, []), f = i.useCallback(function(g) {
    n.current = Mn(g), o.current = void 0;
  }, []), p = i.useCallback(function(g) {
    d(g.type, Cs(g), g.target, c(g, e.lockRef.current));
  }, []), h = i.useCallback(function(g) {
    d(g.type, Mn(g), g.target, c(g, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return Wt.push(s), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, Vt), document.addEventListener("touchmove", l, Vt), document.addEventListener("touchstart", f, Vt), function() {
      Wt = Wt.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, Vt), document.removeEventListener("touchmove", l, Vt), document.removeEventListener("touchstart", f, Vt);
    };
  }, []);
  var m = e.removeScrollBar, b = e.inert;
  return i.createElement(
    i.Fragment,
    null,
    b ? i.createElement(s, { styles: wp(r) }) : null,
    m ? i.createElement(dp, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Sp(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ep = Jf(ea, yp);
var uo = i.forwardRef(function(e, t) {
  return i.createElement(co, He({}, e, { ref: t, sideCar: Ep }));
});
uo.classNames = co.classNames;
var Rp = [" ", "Enter", "ArrowUp", "ArrowDown"], kp = [" ", "Enter"], Pt = "Select", [fo, po, Pp] = id(Pt), [nn] = hn(Pt, [
  Pp,
  lo
]), mo = lo(), [Ip, ht] = nn(Pt), [Tp, Np] = nn(Pt), sa = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    value: a,
    defaultValue: c,
    onValueChange: l,
    dir: d,
    name: f,
    autoComplete: p,
    disabled: h,
    required: m,
    form: b
  } = e, g = mo(t), [x, C] = i.useState(null), [v, w] = i.useState(null), [y, S] = i.useState(!1), R = ld(d), [k, P] = qn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: Pt
  }), [z, T] = qn({
    prop: a,
    defaultProp: c,
    onChange: l,
    caller: Pt
  }), L = i.useRef(null), X = x ? b || !!x.closest("form") : !0, [B, Q] = i.useState(/* @__PURE__ */ new Set()), oe = Array.from(B).map((U) => U.props.value).join(";");
  return /* @__PURE__ */ u.jsx(Ki, { ...g, children: /* @__PURE__ */ u.jsxs(
    Ip,
    {
      required: m,
      scope: t,
      trigger: x,
      onTriggerChange: C,
      valueNode: v,
      onValueNodeChange: w,
      valueNodeHasChildren: y,
      onValueNodeHasChildrenChange: S,
      contentId: Et(),
      value: z,
      onValueChange: T,
      open: k,
      onOpenChange: P,
      dir: R,
      triggerPointerDownPosRef: L,
      disabled: h,
      children: [
        /* @__PURE__ */ u.jsx(fo.Provider, { scope: t, children: /* @__PURE__ */ u.jsx(
          Tp,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: i.useCallback((U) => {
              Q((K) => new Set(K).add(U));
            }, []),
            onNativeOptionRemove: i.useCallback((U) => {
              Q((K) => {
                const H = new Set(K);
                return H.delete(U), H;
              });
            }, []),
            children: n
          }
        ) }),
        X ? /* @__PURE__ */ u.jsxs(
          Sa,
          {
            "aria-hidden": !0,
            required: m,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: z,
            onChange: (U) => T(U.target.value),
            disabled: h,
            form: b,
            children: [
              z === void 0 ? /* @__PURE__ */ u.jsx("option", { value: "" }) : null,
              Array.from(B)
            ]
          },
          oe
        ) : null
      ]
    }
  ) });
};
sa.displayName = Pt;
var ia = "SelectTrigger", aa = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, s = mo(n), a = ht(ia, n), c = a.disabled || o, l = Te(t, a.onTriggerChange), d = po(n), f = i.useRef("touch"), [p, h, m] = Ra((g) => {
      const x = d().filter((w) => !w.disabled), C = x.find((w) => w.value === a.value), v = ka(x, g, C);
      v !== void 0 && a.onValueChange(v.value);
    }), b = (g) => {
      c || (a.onOpenChange(!0), m()), g && (a.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ u.jsx(gr, { asChild: !0, ...s, children: /* @__PURE__ */ u.jsx(
      Pe.button,
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
        "data-placeholder": Ea(a.value) ? "" : void 0,
        ...r,
        ref: l,
        onClick: Ee(r.onClick, (g) => {
          g.currentTarget.focus(), f.current !== "mouse" && b(g);
        }),
        onPointerDown: Ee(r.onPointerDown, (g) => {
          f.current = g.pointerType;
          const x = g.target;
          x.hasPointerCapture(g.pointerId) && x.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (b(g), g.preventDefault());
        }),
        onKeyDown: Ee(r.onKeyDown, (g) => {
          const x = p.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && h(g.key), !(x && g.key === " ") && Rp.includes(g.key) && (b(), g.preventDefault());
        })
      }
    ) });
  }
);
aa.displayName = ia;
var la = "SelectValue", ca = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: s, placeholder: a = "", ...c } = e, l = ht(la, n), { onValueNodeHasChildrenChange: d } = l, f = s !== void 0, p = Te(t, l.onValueNodeChange);
    return je(() => {
      d(f);
    }, [d, f]), /* @__PURE__ */ u.jsx(
      Pe.span,
      {
        ...c,
        ref: p,
        style: { pointerEvents: "none" },
        children: Ea(l.value) ? /* @__PURE__ */ u.jsx(u.Fragment, { children: a }) : s
      }
    );
  }
);
ca.displayName = la;
var Ap = "SelectIcon", ua = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ u.jsx(Pe.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
ua.displayName = Ap;
var It = "SelectContent", da = i.forwardRef(
  (e, t) => {
    const n = ht(It, e.__scopeSelect), [o, r] = i.useState();
    if (je(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const s = o;
      return s ? Qt.createPortal(
        /* @__PURE__ */ u.jsx(fa, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx(fo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ u.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ u.jsx(pa, { ...e, ref: t });
  }
);
da.displayName = It;
var $e = 10, [fa, gt] = nn(It), jp = "SelectContentImpl", Op = /* @__PURE__ */ Gt("SelectContent.RemoveScroll"), pa = i.forwardRef(
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
      align: d,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: m,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: x,
      //
      ...C
    } = e, v = ht(It, n), [w, y] = i.useState(null), [S, R] = i.useState(null), k = Te(t, ($) => y($)), [P, z] = i.useState(null), [T, L] = i.useState(
      null
    ), X = po(n), [B, Q] = i.useState(!1), oe = i.useRef(!1);
    i.useEffect(() => {
      if (w) return xr(w);
    }, [w]), ar();
    const U = i.useCallback(
      ($) => {
        const [ne, ...te] = X().map((ye) => ye.ref.current), [pe] = te.slice(-1), ve = document.activeElement;
        for (const ye of $)
          if (ye === ve || (ye?.scrollIntoView({ block: "nearest" }), ye === ne && S && (S.scrollTop = 0), ye === pe && S && (S.scrollTop = S.scrollHeight), ye?.focus(), document.activeElement !== ve)) return;
      },
      [X, S]
    ), K = i.useCallback(
      () => U([P, w]),
      [U, P, w]
    );
    i.useEffect(() => {
      B && K();
    }, [B, K]);
    const { onOpenChange: H, triggerPointerDownPosRef: ie } = v;
    i.useEffect(() => {
      if (w) {
        let $ = { x: 0, y: 0 };
        const ne = (pe) => {
          $ = {
            x: Math.abs(Math.round(pe.pageX) - (ie.current?.x ?? 0)),
            y: Math.abs(Math.round(pe.pageY) - (ie.current?.y ?? 0))
          };
        }, te = (pe) => {
          $.x <= 10 && $.y <= 10 ? pe.preventDefault() : w.contains(pe.target) || H(!1), document.removeEventListener("pointermove", ne), ie.current = null;
        };
        return ie.current !== null && (document.addEventListener("pointermove", ne), document.addEventListener("pointerup", te, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", ne), document.removeEventListener("pointerup", te, { capture: !0 });
        };
      }
    }, [w, H, ie]), i.useEffect(() => {
      const $ = () => H(!1);
      return window.addEventListener("blur", $), window.addEventListener("resize", $), () => {
        window.removeEventListener("blur", $), window.removeEventListener("resize", $);
      };
    }, [H]);
    const [M, I] = Ra(($) => {
      const ne = X().filter((ve) => !ve.disabled), te = ne.find((ve) => ve.ref.current === document.activeElement), pe = ka(ne, $, te);
      pe && setTimeout(() => pe.ref.current.focus());
    }), J = i.useCallback(
      ($, ne, te) => {
        const pe = !oe.current && !te;
        (v.value !== void 0 && v.value === ne || pe) && (z($), pe && (oe.current = !0));
      },
      [v.value]
    ), de = i.useCallback(() => w?.focus(), [w]), ce = i.useCallback(
      ($, ne, te) => {
        const pe = !oe.current && !te;
        (v.value !== void 0 && v.value === ne || pe) && L($);
      },
      [v.value]
    ), ee = o === "popper" ? qo : ma, ue = ee === qo ? {
      side: c,
      sideOffset: l,
      align: d,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: m,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: x
    } : {};
    return /* @__PURE__ */ u.jsx(
      fa,
      {
        scope: n,
        content: w,
        viewport: S,
        onViewportChange: R,
        itemRefCallback: J,
        selectedItem: P,
        onItemLeave: de,
        itemTextRefCallback: ce,
        focusSelectedItem: K,
        selectedItemText: T,
        position: o,
        isPositioned: B,
        searchRef: M,
        children: /* @__PURE__ */ u.jsx(uo, { as: Op, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
          oo,
          {
            asChild: !0,
            trapped: v.open,
            onMountAutoFocus: ($) => {
              $.preventDefault();
            },
            onUnmountAutoFocus: Ee(r, ($) => {
              v.trigger?.focus({ preventScroll: !0 }), $.preventDefault();
            }),
            children: /* @__PURE__ */ u.jsx(
              no,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: a,
                onFocusOutside: ($) => $.preventDefault(),
                onDismiss: () => v.onOpenChange(!1),
                children: /* @__PURE__ */ u.jsx(
                  ee,
                  {
                    role: "listbox",
                    id: v.contentId,
                    "data-state": v.open ? "open" : "closed",
                    dir: v.dir,
                    onContextMenu: ($) => $.preventDefault(),
                    ...C,
                    ...ue,
                    onPlaced: () => Q(!0),
                    ref: k,
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
                      if ($.key === "Tab" && $.preventDefault(), !ne && $.key.length === 1 && I($.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes($.key)) {
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
pa.displayName = jp;
var _p = "SelectItemAlignedPosition", ma = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, s = ht(It, n), a = gt(It, n), [c, l] = i.useState(null), [d, f] = i.useState(null), p = Te(t, (k) => f(k)), h = po(n), m = i.useRef(!1), b = i.useRef(!0), { viewport: g, selectedItem: x, selectedItemText: C, focusSelectedItem: v } = a, w = i.useCallback(() => {
    if (s.trigger && s.valueNode && c && d && g && x && C) {
      const k = s.trigger.getBoundingClientRect(), P = d.getBoundingClientRect(), z = s.valueNode.getBoundingClientRect(), T = C.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const ve = T.left - P.left, ye = z.left - ve, Ie = k.left - ye, be = k.width + Ie, et = Math.max(be, P.width), tt = window.innerWidth - $e, bt = Jr(ye, [
          $e,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max($e, tt - et)
        ]);
        c.style.minWidth = be + "px", c.style.left = bt + "px";
      } else {
        const ve = P.right - T.right, ye = window.innerWidth - z.right - ve, Ie = window.innerWidth - k.right - ye, be = k.width + Ie, et = Math.max(be, P.width), tt = window.innerWidth - $e, bt = Jr(ye, [
          $e,
          Math.max($e, tt - et)
        ]);
        c.style.minWidth = be + "px", c.style.right = bt + "px";
      }
      const L = h(), X = window.innerHeight - $e * 2, B = g.scrollHeight, Q = window.getComputedStyle(d), oe = parseInt(Q.borderTopWidth, 10), U = parseInt(Q.paddingTop, 10), K = parseInt(Q.borderBottomWidth, 10), H = parseInt(Q.paddingBottom, 10), ie = oe + U + B + H + K, M = Math.min(x.offsetHeight * 5, ie), I = window.getComputedStyle(g), J = parseInt(I.paddingTop, 10), de = parseInt(I.paddingBottom, 10), ce = k.top + k.height / 2 - $e, ee = X - ce, ue = x.offsetHeight / 2, $ = x.offsetTop + ue, ne = oe + U + $, te = ie - ne;
      if (ne <= ce) {
        const ve = L.length > 0 && x === L[L.length - 1].ref.current;
        c.style.bottom = "0px";
        const ye = d.clientHeight - g.offsetTop - g.offsetHeight, Ie = Math.max(
          ee,
          ue + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ve ? de : 0) + ye + K
        ), be = ne + Ie;
        c.style.height = be + "px";
      } else {
        const ve = L.length > 0 && x === L[0].ref.current;
        c.style.top = "0px";
        const Ie = Math.max(
          ce,
          oe + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ve ? J : 0) + ue
        ) + te;
        c.style.height = Ie + "px", g.scrollTop = ne - ce + g.offsetTop;
      }
      c.style.margin = `${$e}px 0`, c.style.minHeight = M + "px", c.style.maxHeight = X + "px", o?.(), requestAnimationFrame(() => m.current = !0);
    }
  }, [
    h,
    s.trigger,
    s.valueNode,
    c,
    d,
    g,
    x,
    C,
    s.dir,
    o
  ]);
  je(() => w(), [w]);
  const [y, S] = i.useState();
  je(() => {
    d && S(window.getComputedStyle(d).zIndex);
  }, [d]);
  const R = i.useCallback(
    (k) => {
      k && b.current === !0 && (w(), v?.(), b.current = !1);
    },
    [w, v]
  );
  return /* @__PURE__ */ u.jsx(
    Mp,
    {
      scope: n,
      contentWrapper: c,
      shouldExpandOnScrollRef: m,
      onScrollButtonChange: R,
      children: /* @__PURE__ */ u.jsx(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: y
          },
          children: /* @__PURE__ */ u.jsx(
            Pe.div,
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
ma.displayName = _p;
var Dp = "SelectPopperPosition", qo = i.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = $e,
    ...s
  } = e, a = mo(n);
  return /* @__PURE__ */ u.jsx(
    Yi,
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
qo.displayName = Dp;
var [Mp, br] = nn(It, {}), Zo = "SelectViewport", ha = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, s = gt(Zo, n), a = br(Zo, n), c = Te(t, s.onViewportChange), l = i.useRef(0);
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
      /* @__PURE__ */ u.jsx(fo.Slot, { scope: n, children: /* @__PURE__ */ u.jsx(
        Pe.div,
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
          onScroll: Ee(r.onScroll, (d) => {
            const f = d.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: h } = a;
            if (h?.current && p) {
              const m = Math.abs(l.current - f.scrollTop);
              if (m > 0) {
                const b = window.innerHeight - $e * 2, g = parseFloat(p.style.minHeight), x = parseFloat(p.style.height), C = Math.max(g, x);
                if (C < b) {
                  const v = C + m, w = Math.min(b, v), y = v - w;
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
ha.displayName = Zo;
var ga = "SelectGroup", [$p, Lp] = nn(ga), zp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Et();
    return /* @__PURE__ */ u.jsx($p, { scope: n, id: r, children: /* @__PURE__ */ u.jsx(Pe.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
zp.displayName = ga;
var va = "SelectLabel", Fp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Lp(va, n);
    return /* @__PURE__ */ u.jsx(Pe.div, { id: r.id, ...o, ref: t });
  }
);
Fp.displayName = va;
var Zn = "SelectItem", [Vp, xa] = nn(Zn), ba = i.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: s,
      ...a
    } = e, c = ht(Zn, n), l = gt(Zn, n), d = c.value === o, [f, p] = i.useState(s ?? ""), [h, m] = i.useState(!1), b = Te(
      t,
      (v) => l.itemRefCallback?.(v, o, r)
    ), g = Et(), x = i.useRef("touch"), C = () => {
      r || (c.onValueChange(o), c.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ u.jsx(
      Vp,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: g,
        isSelected: d,
        onItemTextChange: i.useCallback((v) => {
          p((w) => w || (v?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ u.jsx(
          fo.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: f,
            children: /* @__PURE__ */ u.jsx(
              Pe.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": d && h,
                "data-state": d ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...a,
                ref: b,
                onFocus: Ee(a.onFocus, () => m(!0)),
                onBlur: Ee(a.onBlur, () => m(!1)),
                onClick: Ee(a.onClick, () => {
                  x.current !== "mouse" && C();
                }),
                onPointerUp: Ee(a.onPointerUp, () => {
                  x.current === "mouse" && C();
                }),
                onPointerDown: Ee(a.onPointerDown, (v) => {
                  x.current = v.pointerType;
                }),
                onPointerMove: Ee(a.onPointerMove, (v) => {
                  x.current = v.pointerType, r ? l.onItemLeave?.() : x.current === "mouse" && v.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Ee(a.onPointerLeave, (v) => {
                  v.currentTarget === document.activeElement && l.onItemLeave?.();
                }),
                onKeyDown: Ee(a.onKeyDown, (v) => {
                  l.searchRef?.current !== "" && v.key === " " || (kp.includes(v.key) && C(), v.key === " " && v.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ba.displayName = Zn;
var dn = "SelectItemText", wa = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...s } = e, a = ht(dn, n), c = gt(dn, n), l = xa(dn, n), d = Np(dn, n), [f, p] = i.useState(null), h = Te(
      t,
      (C) => p(C),
      l.onItemTextChange,
      (C) => c.itemTextRefCallback?.(C, l.value, l.disabled)
    ), m = f?.textContent, b = i.useMemo(
      () => /* @__PURE__ */ u.jsx("option", { value: l.value, disabled: l.disabled, children: m }, l.value),
      [l.disabled, l.value, m]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: x } = d;
    return je(() => (g(b), () => x(b)), [g, x, b]), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(Pe.span, { id: l.textId, ...s, ref: h }),
      l.isSelected && a.valueNode && !a.valueNodeHasChildren ? Qt.createPortal(s.children, a.valueNode) : null
    ] });
  }
);
wa.displayName = dn;
var Ca = "SelectItemIndicator", Wp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return xa(Ca, n).isSelected ? /* @__PURE__ */ u.jsx(Pe.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Wp.displayName = Ca;
var Jo = "SelectScrollUpButton", Bp = i.forwardRef((e, t) => {
  const n = gt(Jo, e.__scopeSelect), o = br(Jo, e.__scopeSelect), [r, s] = i.useState(!1), a = Te(t, o.onScrollButtonChange);
  return je(() => {
    if (n.viewport && n.isPositioned) {
      let c = function() {
        const d = l.scrollTop > 0;
        s(d);
      };
      const l = n.viewport;
      return c(), l.addEventListener("scroll", c), () => l.removeEventListener("scroll", c);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    ya,
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
Bp.displayName = Jo;
var Qo = "SelectScrollDownButton", Hp = i.forwardRef((e, t) => {
  const n = gt(Qo, e.__scopeSelect), o = br(Qo, e.__scopeSelect), [r, s] = i.useState(!1), a = Te(t, o.onScrollButtonChange);
  return je(() => {
    if (n.viewport && n.isPositioned) {
      let c = function() {
        const d = l.scrollHeight - l.clientHeight, f = Math.ceil(l.scrollTop) < d;
        s(f);
      };
      const l = n.viewport;
      return c(), l.addEventListener("scroll", c), () => l.removeEventListener("scroll", c);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ u.jsx(
    ya,
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
Hp.displayName = Qo;
var ya = i.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, s = gt("SelectScrollButton", n), a = i.useRef(null), c = po(n), l = i.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return i.useEffect(() => () => l(), [l]), je(() => {
    c().find((f) => f.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [c]), /* @__PURE__ */ u.jsx(
    Pe.div,
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
}), Up = "SelectSeparator", Gp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ u.jsx(Pe.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
Gp.displayName = Up;
var er = "SelectArrow", Kp = i.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = mo(n), s = ht(er, n), a = gt(er, n);
    return s.open && a.position === "popper" ? /* @__PURE__ */ u.jsx(Xi, { ...r, ...o, ref: t }) : null;
  }
);
Kp.displayName = er;
var Yp = "SelectBubbleInput", Sa = i.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = i.useRef(null), s = Te(o, r), a = $f(t);
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
    }, [a, t]), /* @__PURE__ */ u.jsx(
      Pe.select,
      {
        ...n,
        style: { ...qi, ...n.style },
        ref: s,
        defaultValue: t
      }
    );
  }
);
Sa.displayName = Yp;
function Ea(e) {
  return e === "" || e === void 0;
}
function Ra(e) {
  const t = Rt(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback(
    (a) => {
      const c = n.current + a;
      t(c), (function l(d) {
        n.current = d, window.clearTimeout(o.current), d !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
      })(c);
    },
    [t]
  ), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
function ka(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Xp(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((d) => d !== n));
  const l = a.find(
    (d) => d.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Xp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var qp = sa, Zp = aa, Jp = ca, Qp = ua, em = da, tm = ha, nm = ba, om = wa;
const ho = i.createContext({ size: "base" }), wr = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" }
}, rm = Oe(
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
function sm({ children: e, disabled: t, variant: n, size: o = "base", ...r }) {
  const s = t || n === "disabled";
  return /* @__PURE__ */ u.jsx(ho.Provider, { value: { size: o }, children: /* @__PURE__ */ u.jsx(qp, { disabled: s, ...r, children: e }) });
}
function im({ className: e, variant: t, leftIcon: n, children: o, slotId: r, ...s }) {
  const { size: a } = i.useContext(ho), c = wr[a], l = i.useId();
  return /* @__PURE__ */ u.jsxs(
    Zp,
    {
      "data-slot": "select-trigger",
      "data-slot-id": r ?? l,
      className: se(rm({ variant: t }), c.height, c.rounded, c.px, c.gap, c.text, e),
      ...s,
      children: [
        /* @__PURE__ */ u.jsxs("span", { className: se("flex items-center flex-1 min-w-0", c.gap), children: [
          n && /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: se("shrink-0 text-black-55", c.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: `#${n}` }) }),
          o
        ] }),
        /* @__PURE__ */ u.jsx(Qp, { asChild: !0, children: /* @__PURE__ */ u.jsx("svg", { "aria-hidden": "true", className: se("shrink-0 ml-auto", c.icon), style: { fill: "currentColor" }, children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-chevron-down" }) }) })
      ]
    }
  );
}
function am({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(ho), s = wr[r], a = i.useId();
  return /* @__PURE__ */ u.jsx(
    em,
    {
      "data-slot": "select-content",
      "data-slot-id": n ?? a,
      position: "popper",
      sideOffset: 4,
      className: se(
        "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
        "w-[var(--radix-select-trigger-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        s.rounded,
        e
      ),
      ...o,
      children: /* @__PURE__ */ u.jsx(tm, { className: "flex flex-col p-1 group/options", children: t })
    }
  );
}
function lm({ className: e, children: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(ho), s = wr[r], a = i.useId();
  return /* @__PURE__ */ u.jsx(
    nm,
    {
      "data-slot": "select-item",
      "data-slot-id": n ?? a,
      className: se(
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
      children: /* @__PURE__ */ u.jsx(om, { children: t })
    }
  );
}
function cm({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ u.jsx(Jp, { "data-slot": "select-value", "data-slot-id": t ?? o, className: e, ...n });
}
const um = Oe(
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
function Yg({
  className: e,
  variant: t,
  size: n,
  onClick: o,
  children: r,
  slotId: s,
  ...a
}) {
  const c = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "navigation-item",
      "data-slot-id": s ?? c,
      className: se(um({ variant: t, size: n }), e),
      onClick: (l) => {
        l.stopPropagation(), o?.();
      },
      ...a,
      children: r
    }
  );
}
const dm = Oe("flex w-max min-w-full flex-col bg-white-100", {
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
function Xg({ className: e, variant: t, radius: n, data: o, children: r, slotId: s, ...a }) {
  const c = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "table",
      "data-slot-id": s ?? c,
      className: se(dm({ variant: t, radius: n, className: e })),
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
function Ss(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function fm(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Ss(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Ss(e[r], null);
        }
      };
  };
}
function At(...e) {
  return i.useCallback(fm(...e), e);
}
function Pa(e, t = []) {
  let n = [];
  function o(s, a) {
    const c = i.createContext(a);
    c.displayName = s + "Context";
    const l = n.length;
    n = [...n, a];
    const d = (p) => {
      const { scope: h, children: m, ...b } = p, g = h?.[e]?.[l] || c, x = i.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u.jsx(g.Provider, { value: x, children: m });
    };
    d.displayName = s + "Provider";
    function f(p, h) {
      const m = h?.[e]?.[l] || c, b = i.useContext(m);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [d, f];
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
  return r.scopeName = e, [o, pm(r, ...t)];
}
function pm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((c, { useScope: l, scopeName: d }) => {
        const p = l(s)[`__scope${d}`];
        return { ...c, ...p };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function mm(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, a = null, c = !1;
    const l = [];
    Es(r) && typeof $n == "function" && (r = $n(r._payload)), i.Children.forEach(r, (h) => {
      if (bm(h)) {
        c = !0;
        const m = h;
        let b = "child" in m.props ? m.props.child : m.props.children;
        Es(b) && typeof $n == "function" && (b = $n(b._payload)), a = gm(m, b), l.push(a?.props?.children);
      } else
        l.push(h);
    }), a ? a = i.cloneElement(a, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(r) === 1 && i.isValidElement(r) && (a = r)
    );
    const d = a ? xm(a) : void 0, f = At(o, d);
    if (!a) {
      if (r || r === 0)
        throw new Error(
          c ? Sm(e) : ym(e)
        );
      return r;
    }
    const p = vm(s, a.props ?? {});
    return a.type !== i.Fragment && (p.ref = o ? f : d), i.cloneElement(a, p);
  });
  return t.displayName = `${e}.Slot`, t;
}
var Ia = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function hm(e) {
  const t = (n) => "child" in n ? n.children(n.child) : n.children;
  return t.displayName = `${e}.Slottable`, t.__radixId = Ia, t;
}
var gm = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
};
function vm(e, t) {
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
function xm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function bm(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ia;
}
var wm = /* @__PURE__ */ Symbol.for("react.lazy");
function Es(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === wm && "_payload" in e && Cm(e._payload);
}
function Cm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var ym = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, Sm = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, $n = i[" use ".trim().toString()], Em = [
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
], vt = Em.reduce((e, t) => {
  const n = /* @__PURE__ */ mm(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: a, ...c } = r, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Rm(e, t) {
  e && Qt.flushSync(() => e.dispatchEvent(t));
}
function go(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function km(e, t = globalThis?.document) {
  const n = go(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var Pm = "DismissableLayer", tr = "dismissableLayer.update", Im = "dismissableLayer.pointerDownOutside", Tm = "dismissableLayer.focusOutside", Rs, Ta = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Na = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: c,
      ...l
    } = e, d = i.useContext(Ta), [f, p] = i.useState(null), h = f?.ownerDocument ?? globalThis?.document, [, m] = i.useState({}), b = At(t, (k) => p(k)), g = Array.from(d.layers), [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), C = g.indexOf(x), v = f ? g.indexOf(f) : -1, w = d.layersWithOutsidePointerEventsDisabled.size > 0, y = v >= C, S = jm((k) => {
      const P = k.target, z = [...d.branches].some((T) => T.contains(P));
      !y || z || (r?.(k), a?.(k), k.defaultPrevented || c?.());
    }, h), R = Om((k) => {
      const P = k.target;
      [...d.branches].some((T) => T.contains(P)) || (s?.(k), a?.(k), k.defaultPrevented || c?.());
    }, h);
    return km((k) => {
      v === d.layers.size - 1 && (o?.(k), !k.defaultPrevented && c && (k.preventDefault(), c()));
    }, h), i.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Rs = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), ks(), () => {
          n && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (h.body.style.pointerEvents = Rs));
        };
    }, [f, h, n, d]), i.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), ks());
    }, [f, d]), i.useEffect(() => {
      const k = () => m({});
      return document.addEventListener(tr, k), () => document.removeEventListener(tr, k);
    }, []), /* @__PURE__ */ u.jsx(
      vt.div,
      {
        ...l,
        ref: b,
        style: {
          pointerEvents: w ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Xe(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: Xe(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: Xe(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
Na.displayName = Pm;
var Nm = "DismissableLayerBranch", Am = i.forwardRef((e, t) => {
  const n = i.useContext(Ta), o = i.useRef(null), r = At(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ u.jsx(vt.div, { ...e, ref: r });
});
Am.displayName = Nm;
function jm(e, t = globalThis?.document) {
  const n = go(e), o = i.useRef(!1), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (c) => {
      if (c.target && !o.current) {
        let l = function() {
          Aa(
            Im,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: c };
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
function Om(e, t = globalThis?.document) {
  const n = go(e), o = i.useRef(!1);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Aa(Tm, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function ks() {
  const e = new CustomEvent(tr);
  document.dispatchEvent(e);
}
function Aa(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Rm(r, s) : r.dispatchEvent(s);
}
var qe = globalThis?.document ? i.useLayoutEffect : () => {
}, _m = i[" useId ".trim().toString()] || (() => {
}), Dm = 0;
function Mm(e) {
  const [t, n] = i.useState(_m());
  return qe(() => {
    n((o) => o ?? String(Dm++));
  }, [e]), t ? `radix-${t}` : "";
}
var $m = "Arrow", ja = i.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ u.jsx(
    vt.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ja.displayName = $m;
var Lm = ja;
function zm(e) {
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
          const l = s.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          a = d.inlineSize, c = d.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        n({ width: a, height: c });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Cr = "Popper", [Oa, _a] = Pa(Cr), [Fm, Da] = Oa(Cr), Ma = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, a] = i.useState(void 0);
  return /* @__PURE__ */ u.jsx(
    Fm,
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
Ma.displayName = Cr;
var $a = "PopperAnchor", La = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Da($a, n), a = i.useRef(null), c = s.onAnchorChange, l = i.useCallback(
      (b) => {
        a.current = b, b && c(b);
      },
      [c]
    ), d = At(t, l), f = i.useRef(null);
    i.useEffect(() => {
      if (!o)
        return;
      const b = f.current;
      f.current = o.current, b !== f.current && c(f.current);
    });
    const p = s.placementState && Sr(s.placementState), h = p?.[0], m = p?.[1];
    return o ? null : /* @__PURE__ */ u.jsx(
      vt.div,
      {
        "data-radix-popper-side": h,
        "data-radix-popper-align": m,
        ...r,
        ref: d
      }
    );
  }
);
La.displayName = $a;
var yr = "PopperContent", [Vm, Wm] = Oa(yr), za = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: c = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d,
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: b,
      ...g
    } = e, x = Da(yr, n), [C, v] = i.useState(null), w = At(t, (ne) => v(ne)), [y, S] = i.useState(null), R = zm(y), k = R?.width ?? 0, P = R?.height ?? 0, z = o + (s !== "center" ? "-" + s : ""), T = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, L = d ? Array.isArray(d) ? d : [d] : void 0, X = L !== void 0 && L.length > 0, B = {
      padding: T,
      boundary: L?.filter(Hm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: X
    }, { refs: Q, floatingStyles: oe, placement: U, isPositioned: K, middlewareData: H } = Ti({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: z,
      whileElementsMounted: (...ne) => Pi(...ne, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: x.anchor
      },
      middleware: [
        Ni({ mainAxis: r + P, alignmentAxis: a }),
        l && Ai({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? ji() : void 0,
          ...B
        }),
        l && Oi({ ...B }),
        _i({
          ...B,
          apply: ({ elements: ne, rects: te, availableWidth: pe, availableHeight: ve }) => {
            const { width: ye, height: Ie } = te.reference, be = ne.floating.style;
            be.setProperty("--radix-popper-available-width", `${pe}px`), be.setProperty("--radix-popper-available-height", `${ve}px`), be.setProperty("--radix-popper-anchor-width", `${ye}px`), be.setProperty("--radix-popper-anchor-height", `${Ie}px`);
          }
        }),
        y && Mi({ element: y, padding: c }),
        Um({ arrowWidth: k, arrowHeight: P }),
        h && Di({ strategy: "referenceHidden", ...B })
      ]
    }), ie = x.setPlacementState;
    qe(() => (ie(U), () => {
      ie(void 0);
    }), [U, ie]);
    const [M, I] = Sr(U), J = go(b);
    qe(() => {
      K && J?.();
    }, [K, J]);
    const de = H.arrow?.x, ce = H.arrow?.y, ee = H.arrow?.centerOffset !== 0, [ue, $] = i.useState();
    return qe(() => {
      C && $(window.getComputedStyle(C).zIndex);
    }, [C]), /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: Q.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...oe,
          transform: K ? oe.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ue,
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
          Vm,
          {
            scope: n,
            placedSide: M,
            placedAlign: I,
            onArrowChange: S,
            arrowX: de,
            arrowY: ce,
            shouldHideArrow: ee,
            children: /* @__PURE__ */ u.jsx(
              vt.div,
              {
                "data-side": M,
                "data-align": I,
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
za.displayName = yr;
var Fa = "PopperArrow", Bm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Va = i.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Wm(Fa, o), a = Bm[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u.jsx(
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
        children: /* @__PURE__ */ u.jsx(
          Lm,
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
Va.displayName = Fa;
function Hm(e) {
  return e !== null;
}
var Um = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, c = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [d, f] = Sr(n), p = { start: "0%", center: "50%", end: "100%" }[f], h = (r.arrow?.x ?? 0) + c / 2, m = (r.arrow?.y ?? 0) + l / 2;
    let b = "", g = "";
    return d === "bottom" ? (b = a ? p : `${h}px`, g = `${-l}px`) : d === "top" ? (b = a ? p : `${h}px`, g = `${o.floating.height + l}px`) : d === "right" ? (b = `${-l}px`, g = a ? p : `${m}px`) : d === "left" && (b = `${o.floating.width + l}px`, g = a ? p : `${m}px`), { data: { x: b, y: g } };
  }
});
function Sr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Gm = Ma, Km = La, Ym = za, Xm = Va, qm = "Portal", Wa = i.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = i.useState(!1);
  qe(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Qt.createPortal(/* @__PURE__ */ u.jsx(vt.div, { ...o, ref: t }), a) : null;
});
Wa.displayName = qm;
function Zm(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var Er = (e) => {
  const { present: t, children: n } = e, o = Jm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Qm(o.ref, eh(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Er.displayName = "Presence";
function Jm(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = Zm(a, {
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
    const d = Ln(o.current);
    s.current = c === "mounted" ? d : "none";
  }, [c]), qe(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const h = s.current, m = Ln(d);
      e ? l("MOUNT") : m === "none" || d?.display === "none" ? l("UNMOUNT") : l(f && h !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), qe(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (m) => {
        const g = Ln(o.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, h = (m) => {
        m.target === t && (s.current = Ln(o.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Ps(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Qm(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = !1;
    const s = o.map((a) => {
      const c = Ps(a, n);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const c = s[a];
          typeof c == "function" ? c() : Ps(o[a], null);
        }
      };
  }, []);
}
function Ln(e) {
  return e?.animationName || "none";
}
function eh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var th = i[" useInsertionEffect ".trim().toString()] || qe;
function nh({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = oh({
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
  const d = i.useCallback(
    (f) => {
      if (c) {
        const p = rh(f) ? f(e) : f;
        p !== e && a.current?.(p);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, d];
}
function oh({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return th(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function rh(e) {
  return typeof e == "function";
}
var sh = Object.freeze({
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
}), ih = "VisuallyHidden", Ba = i.forwardRef(
  (e, t) => /* @__PURE__ */ u.jsx(
    vt.span,
    {
      ...e,
      ref: t,
      style: { ...sh, ...e.style }
    }
  )
);
Ba.displayName = ih;
var ah = Ba, [vo] = Pa("Tooltip", [
  _a
]), xo = _a(), Ha = "TooltipProvider", lh = 700, nr = "tooltip.open", [ch, Rr] = vo(Ha), Ua = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = lh,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = i.useRef(!0), c = i.useRef(!1), l = i.useRef(0);
  return i.useEffect(() => {
    const d = l.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u.jsx(
    ch,
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
      onPointerInTransitChange: i.useCallback((d) => {
        c.current = d;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
Ua.displayName = Ha;
var pn = "Tooltip", [uh, vn] = vo(pn), Ga = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: c
  } = e, l = Rr(pn, e.__scopeTooltip), d = xo(t), [f, p] = i.useState(null), h = Mm(), m = i.useRef(0), b = a ?? l.disableHoverableContent, g = c ?? l.delayDuration, x = i.useRef(!1), [C, v] = nh({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (k) => {
      k ? (l.onOpen(), document.dispatchEvent(new CustomEvent(nr))) : l.onClose(), s?.(k);
    },
    caller: pn
  }), w = i.useMemo(() => C ? x.current ? "delayed-open" : "instant-open" : "closed", [C]), y = i.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, x.current = !1, v(!0);
  }, [v]), S = i.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, v(!1);
  }, [v]), R = i.useCallback(() => {
    window.clearTimeout(m.current), m.current = window.setTimeout(() => {
      x.current = !0, v(!0), m.current = 0;
    }, g);
  }, [g, v]);
  return i.useEffect(() => () => {
    m.current && (window.clearTimeout(m.current), m.current = 0);
  }, []), /* @__PURE__ */ u.jsx(Gm, { ...d, children: /* @__PURE__ */ u.jsx(
    uh,
    {
      scope: t,
      contentId: h,
      open: C,
      stateAttribute: w,
      trigger: f,
      onTriggerChange: p,
      onTriggerEnter: i.useCallback(() => {
        l.isOpenDelayedRef.current ? R() : y();
      }, [l.isOpenDelayedRef, R, y]),
      onTriggerLeave: i.useCallback(() => {
        b ? S() : (window.clearTimeout(m.current), m.current = 0);
      }, [S, b]),
      onOpen: y,
      onClose: S,
      disableHoverableContent: b,
      children: n
    }
  ) });
};
Ga.displayName = pn;
var or = "TooltipTrigger", Ka = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = vn(or, n), s = Rr(or, n), a = xo(n), c = i.useRef(null), l = At(t, c, r.onTriggerChange), d = i.useRef(!1), f = i.useRef(!1), p = i.useCallback(() => d.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ u.jsx(Km, { asChild: !0, ...a, children: /* @__PURE__ */ u.jsx(
      vt.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: Xe(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !f.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: Xe(e.onPointerLeave, () => {
          r.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: Xe(e.onPointerDown, () => {
          r.open && r.onClose(), d.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: Xe(e.onFocus, () => {
          d.current || r.onOpen();
        }),
        onBlur: Xe(e.onBlur, r.onClose),
        onClick: Xe(e.onClick, r.onClose)
      }
    ) });
  }
);
Ka.displayName = or;
var kr = "TooltipPortal", [dh, fh] = vo(kr, {
  forceMount: void 0
}), Ya = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = vn(kr, t);
  return /* @__PURE__ */ u.jsx(dh, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(Er, { present: n || s.open, children: /* @__PURE__ */ u.jsx(Wa, { asChild: !0, container: r, children: o }) }) });
};
Ya.displayName = kr;
var Yt = "TooltipContent", Xa = i.forwardRef(
  (e, t) => {
    const n = fh(Yt, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = vn(Yt, e.__scopeTooltip);
    return /* @__PURE__ */ u.jsx(Er, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ u.jsx(qa, { side: r, ...s, ref: t }) : /* @__PURE__ */ u.jsx(ph, { side: r, ...s, ref: t }) });
  }
), ph = i.forwardRef((e, t) => {
  const n = vn(Yt, e.__scopeTooltip), o = Rr(Yt, e.__scopeTooltip), r = i.useRef(null), s = At(t, r), [a, c] = i.useState(null), { trigger: l, onClose: d } = n, f = r.current, { onPointerInTransitChange: p } = o, h = i.useCallback(() => {
    c(null), p(!1);
  }, [p]), m = i.useCallback(
    (b, g) => {
      const x = b.currentTarget, C = { x: b.clientX, y: b.clientY }, v = vh(C, x.getBoundingClientRect()), w = xh(C, v), y = bh(g.getBoundingClientRect()), S = Ch([...w, ...y]);
      c(S), p(!0);
    },
    [p]
  );
  return i.useEffect(() => () => h(), [h]), i.useEffect(() => {
    if (l && f) {
      const b = (x) => m(x, f), g = (x) => m(x, l);
      return l.addEventListener("pointerleave", b), f.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", b), f.removeEventListener("pointerleave", g);
      };
    }
  }, [l, f, m, h]), i.useEffect(() => {
    if (a) {
      const b = (g) => {
        const x = g.target, C = { x: g.clientX, y: g.clientY }, v = l?.contains(x) || f?.contains(x), w = !wh(C, a);
        v ? h() : w && (h(), d());
      };
      return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b);
    }
  }, [l, f, a, d, h]), /* @__PURE__ */ u.jsx(qa, { ...e, ref: s });
}), [mh, hh] = vo(pn, { isInside: !1 }), gh = /* @__PURE__ */ hm("TooltipContent"), qa = i.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...c
    } = e, l = vn(Yt, n), d = xo(n), { onClose: f } = l;
    return i.useEffect(() => (document.addEventListener(nr, f), () => document.removeEventListener(nr, f)), [f]), i.useEffect(() => {
      if (l.trigger) {
        const p = (h) => {
          h.target instanceof Node && h.target.contains(l.trigger) && f();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [l.trigger, f]), /* @__PURE__ */ u.jsx(
      Na,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ u.jsxs(
          Ym,
          {
            "data-state": l.stateAttribute,
            ...d,
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
              /* @__PURE__ */ u.jsx(gh, { children: o }),
              /* @__PURE__ */ u.jsx(mh, { scope: n, isInside: !0, children: /* @__PURE__ */ u.jsx(ah, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Xa.displayName = Yt;
var Za = "TooltipArrow", Ja = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = xo(n);
    return hh(
      Za,
      n
    ).isInside ? null : /* @__PURE__ */ u.jsx(Xm, { ...r, ...o, ref: t });
  }
);
Ja.displayName = Za;
function vh(e, t) {
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
function xh(e, t, n = 5) {
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
function bh(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function wh(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const c = t[s], l = t[a], d = c.x, f = c.y, p = l.x, h = l.y;
    f > o != h > o && n < (p - d) * (o - f) / (h - f) + d && (r = !r);
  }
  return r;
}
function Ch(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), yh(t);
}
function yh(e) {
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
var Sh = Ua, Eh = Ga, Rh = Ka, kh = Ya, Ph = Xa, Ih = Ja;
const Th = Oe(
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
function Nh({ children: e, delayDuration: t = 300, ...n }) {
  return /* @__PURE__ */ u.jsx(Sh, { delayDuration: t, ...n, children: e });
}
function Pr({ children: e, ...t }) {
  return /* @__PURE__ */ u.jsx(Eh, { ...t, children: e });
}
const Ir = Rh;
function Tr({
  className: e,
  size: t,
  sideOffset: n = 4,
  children: o,
  slotId: r,
  ...s
}) {
  const a = i.useId();
  return /* @__PURE__ */ u.jsx(kh, { children: /* @__PURE__ */ u.jsxs(
    Ph,
    {
      "data-slot": "tooltip-content",
      "data-slot-id": r ?? a,
      sideOffset: n,
      className: se(Th({ size: t }), e),
      ...s,
      children: [
        o,
        /* @__PURE__ */ u.jsx(
          Ih,
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
function Ah(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var on = (e) => {
  const { present: t, children: n } = e, o = jh(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Te(o.ref, Oh(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
on.displayName = "Presence";
function jh(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = Ah(a, {
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
    const d = zn(o.current);
    s.current = c === "mounted" ? d : "none";
  }, [c]), je(() => {
    const d = o.current, f = r.current;
    if (f !== e) {
      const h = s.current, m = zn(d);
      e ? l("MOUNT") : m === "none" || d?.display === "none" ? l("UNMOUNT") : l(f && h !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), je(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, p = (m) => {
        const g = zn(o.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, h = (m) => {
        m.target === t && (s.current = zn(o.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((d) => {
      o.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function zn(e) {
  return e?.animationName || "none";
}
function Oh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var bo = "Popover", [Qa] = hn(bo, [
  lo
]), xn = lo(), [_h, xt] = Qa(bo), el = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !1
  } = e, c = xn(t), l = i.useRef(null), [d, f] = i.useState(!1), [p, h] = qn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: bo
  });
  return /* @__PURE__ */ u.jsx(Ki, { ...c, children: /* @__PURE__ */ u.jsx(
    _h,
    {
      scope: t,
      contentId: Et(),
      triggerRef: l,
      open: p,
      onOpenChange: h,
      onOpenToggle: i.useCallback(() => h((m) => !m), [h]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: i.useCallback(() => f(!0), []),
      onCustomAnchorRemove: i.useCallback(() => f(!1), []),
      modal: a,
      children: n
    }
  ) });
};
el.displayName = bo;
var tl = "PopoverAnchor", Dh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = xt(tl, n), s = xn(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: c } = r;
    return i.useEffect(() => (a(), () => c()), [a, c]), /* @__PURE__ */ u.jsx(gr, { ...s, ...o, ref: t });
  }
);
Dh.displayName = tl;
var nl = "PopoverTrigger", ol = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = xt(nl, n), s = xn(n), a = Te(t, r.triggerRef), c = /* @__PURE__ */ u.jsx(
      Pe.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": ll(r.open),
        ...o,
        ref: a,
        onClick: Ee(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? c : /* @__PURE__ */ u.jsx(gr, { asChild: !0, ...s, children: c });
  }
);
ol.displayName = nl;
var Nr = "PopoverPortal", [Mh, $h] = Qa(Nr, {
  forceMount: void 0
}), rl = (e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = xt(Nr, t);
  return /* @__PURE__ */ u.jsx(Mh, { scope: t, forceMount: n, children: /* @__PURE__ */ u.jsx(on, { present: n || s.open, children: /* @__PURE__ */ u.jsx(vr, { asChild: !0, container: r, children: o }) }) });
};
rl.displayName = Nr;
var Xt = "PopoverContent", sl = i.forwardRef(
  (e, t) => {
    const n = $h(Xt, e.__scopePopover), { forceMount: o = n.forceMount, ...r } = e, s = xt(Xt, e.__scopePopover);
    return /* @__PURE__ */ u.jsx(on, { present: o || s.open, children: s.modal ? /* @__PURE__ */ u.jsx(zh, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(Fh, { ...r, ref: t }) });
  }
);
sl.displayName = Xt;
var Lh = /* @__PURE__ */ Gt("PopoverContent.RemoveScroll"), zh = i.forwardRef(
  (e, t) => {
    const n = xt(Xt, e.__scopePopover), o = i.useRef(null), r = Te(t, o), s = i.useRef(!1);
    return i.useEffect(() => {
      const a = o.current;
      if (a) return xr(a);
    }, []), /* @__PURE__ */ u.jsx(uo, { as: Lh, allowPinchZoom: !0, children: /* @__PURE__ */ u.jsx(
      il,
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
            const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, d = c.button === 2 || l;
            s.current = d;
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
), Fh = i.forwardRef(
  (e, t) => {
    const n = xt(Xt, e.__scopePopover), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      il,
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
), il = i.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: o,
      onOpenAutoFocus: r,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: c,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: f,
      ...p
    } = e, h = xt(Xt, n), m = xn(n);
    return ar(), /* @__PURE__ */ u.jsx(
      oo,
      {
        asChild: !0,
        loop: !0,
        trapped: o,
        onMountAutoFocus: r,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ u.jsx(
          no,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: f,
            onEscapeKeyDown: c,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ u.jsx(
              Yi,
              {
                "data-state": ll(h.open),
                role: "dialog",
                id: h.contentId,
                ...m,
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
), al = "PopoverClose", Vh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = xt(al, n);
    return /* @__PURE__ */ u.jsx(
      Pe.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: Ee(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Vh.displayName = al;
var Wh = "PopoverArrow", Bh = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...o } = e, r = xn(n);
    return /* @__PURE__ */ u.jsx(Xi, { ...r, ...o, ref: t });
  }
);
Bh.displayName = Wh;
function ll(e) {
  return e ? "open" : "closed";
}
var Hh = el, Uh = ol, Gh = rl, Kh = sl;
const wo = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" }
}, Fe = i.createContext({ size: "base", close: () => {
}, isOpen: !1 }), Yh = i.createContext({ isSub: !1, close: () => {
}, open: () => {
}, isOpen: !1, scheduleClose: () => {
}, cancelClose: () => {
} });
function qt({ children: e, size: t = "base", ...n }) {
  const [o, r] = i.useState(n.open ?? !1), s = () => a(!1), a = (c) => {
    r(c), n.onOpenChange?.(c);
  };
  return i.useEffect(() => {
    if (!o) return;
    const c = (l) => {
      l.target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]') || s();
    };
    return window.addEventListener("scroll", c, { capture: !0 }), () => window.removeEventListener("scroll", c, { capture: !0 });
  }, [o]), /* @__PURE__ */ u.jsx(Hh, { ...n, open: n.open ?? o, onOpenChange: a, children: /* @__PURE__ */ u.jsx(Fe.Provider, { value: { size: t, close: s, isOpen: n.open ?? o }, children: e }) });
}
const Zt = Uh, Xh = Oe(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
);
function Jt({ className: e, sideOffset: t = 4, align: n = "start", slotId: o, ...r }) {
  const { size: s } = i.useContext(Fe), a = wo[s], c = i.useId();
  return /* @__PURE__ */ u.jsx(Gh, { children: /* @__PURE__ */ u.jsx(
    Kh,
    {
      "data-slot": "popover-content",
      "data-slot-id": o ?? c,
      sideOffset: t,
      align: n,
      className: se(
        Xh(),
        a.rounded === "rounded" ? "rounded-md" : a.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function Is({ className: e, disabled: t, slotId: n, ...o }) {
  const { size: r } = i.useContext(Fe), s = wo[r], a = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-item",
      "data-slot-id": n ?? a,
      className: se(
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
  const { size: c } = i.useContext(Fe), { isSub: l, close: d } = i.useContext(Yh), { close: f } = i.useContext(Fe), p = wo[c], h = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-menu-item",
      "data-slot-id": s ?? h,
      className: se(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        p.height,
        p.rounded,
        p.px,
        p.gap,
        p.text,
        e
      ),
      onClick: (m) => {
        t ? ((l ? d : f)(), setTimeout(() => n?.(m), 150)) : n?.(m);
      },
      ...a,
      children: o
    }
  );
}
function pt({ className: e, slotId: t, ...n }) {
  const { size: o } = i.useContext(Fe), r = wo[o], s = i.useId();
  return /* @__PURE__ */ u.jsx(
    "div",
    {
      "data-slot": "popover-label",
      "data-slot-id": t ?? s,
      className: se("py-1.5 text-black-55", r.px, r.text, e),
      ...n
    }
  );
}
function lt({ className: e, slotId: t, ...n }) {
  const o = i.useId();
  return /* @__PURE__ */ u.jsx("div", { "data-slot": "popover-separator", "data-slot-id": t ?? o, className: se("-mx-1 my-1 h-px bg-neutral-2", e), ...n });
}
var Co = "Dialog", [cl] = hn(Co), [qh, Ve] = cl(Co), ul = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    modal: a = !0
  } = e, c = i.useRef(null), l = i.useRef(null), [d, f] = qn({
    prop: o,
    defaultProp: r ?? !1,
    onChange: s,
    caller: Co
  });
  return /* @__PURE__ */ u.jsx(
    qh,
    {
      scope: t,
      triggerRef: c,
      contentRef: l,
      contentId: Et(),
      titleId: Et(),
      descriptionId: Et(),
      open: d,
      onOpenChange: f,
      onOpenToggle: i.useCallback(() => f((p) => !p), [f]),
      modal: a,
      children: n
    }
  );
};
ul.displayName = Co;
var dl = "DialogTrigger", Zh = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(dl, n), s = Te(t, r.triggerRef);
    return /* @__PURE__ */ u.jsx(
      Pe.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Or(r.open),
        ...o,
        ref: s,
        onClick: Ee(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Zh.displayName = dl;
var Ar = "DialogPortal", [Jh, fl] = cl(Ar, {
  forceMount: void 0
}), pl = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = Ve(Ar, t);
  return /* @__PURE__ */ u.jsx(Jh, { scope: t, forceMount: n, children: i.Children.map(o, (a) => /* @__PURE__ */ u.jsx(on, { present: n || s.open, children: /* @__PURE__ */ u.jsx(vr, { asChild: !0, container: r, children: a }) })) });
};
pl.displayName = Ar;
var Jn = "DialogOverlay", ml = i.forwardRef(
  (e, t) => {
    const n = fl(Jn, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Ve(Jn, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ u.jsx(on, { present: o || s.open, children: /* @__PURE__ */ u.jsx(eg, { ...r, ref: t }) }) : null;
  }
);
ml.displayName = Jn;
var Qh = /* @__PURE__ */ Gt("DialogOverlay.RemoveScroll"), eg = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(Jn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u.jsx(uo, { as: Qh, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ u.jsx(
        Pe.div,
        {
          "data-state": Or(r.open),
          ...o,
          ref: t,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), Tt = "DialogContent", hl = i.forwardRef(
  (e, t) => {
    const n = fl(Tt, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = Ve(Tt, e.__scopeDialog);
    return /* @__PURE__ */ u.jsx(on, { present: o || s.open, children: s.modal ? /* @__PURE__ */ u.jsx(tg, { ...r, ref: t }) : /* @__PURE__ */ u.jsx(ng, { ...r, ref: t }) });
  }
);
hl.displayName = Tt;
var tg = i.forwardRef(
  (e, t) => {
    const n = Ve(Tt, e.__scopeDialog), o = i.useRef(null), r = Te(t, n.contentRef, o);
    return i.useEffect(() => {
      const s = o.current;
      if (s) return xr(s);
    }, []), /* @__PURE__ */ u.jsx(
      gl,
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
), ng = i.forwardRef(
  (e, t) => {
    const n = Ve(Tt, e.__scopeDialog), o = i.useRef(!1), r = i.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      gl,
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
), gl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: s, ...a } = e, c = Ve(Tt, n), l = i.useRef(null), d = Te(t, l);
    return ar(), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        oo,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: r,
          onUnmountAutoFocus: s,
          children: /* @__PURE__ */ u.jsx(
            no,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": Or(c.open),
              ...a,
              ref: d,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(sg, { titleId: c.titleId }),
        /* @__PURE__ */ u.jsx(ag, { contentRef: l, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), jr = "DialogTitle", og = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(jr, n);
    return /* @__PURE__ */ u.jsx(Pe.h2, { id: r.titleId, ...o, ref: t });
  }
);
og.displayName = jr;
var vl = "DialogDescription", rg = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(vl, n);
    return /* @__PURE__ */ u.jsx(Pe.p, { id: r.descriptionId, ...o, ref: t });
  }
);
rg.displayName = vl;
var xl = "DialogClose", bl = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...o } = e, r = Ve(xl, n);
    return /* @__PURE__ */ u.jsx(
      Pe.button,
      {
        type: "button",
        ...o,
        ref: t,
        onClick: Ee(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
bl.displayName = xl;
function Or(e) {
  return e ? "open" : "closed";
}
var wl = "DialogTitleWarning", [qg, Cl] = Qu(wl, {
  contentName: Tt,
  titleName: jr,
  docsSlug: "dialog"
}), sg = ({ titleId: e }) => {
  const t = Cl(wl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ig = "DialogDescriptionWarning", ag = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Cl(ig).contentName}}.`;
  return i.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, lg = ul, cg = pl, ug = ml, dg = hl, fg = bl;
const pg = i.createContext({ size: "base" }), mg = {
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
}, hg = lg, gg = cg, vg = Oe(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
);
function xg({ className: e, overlayClassName: t, size: n = "base", children: o, slotId: r, ...s }) {
  const a = mg[n], c = i.useId();
  return /* @__PURE__ */ u.jsx(pg.Provider, { value: { size: n }, children: /* @__PURE__ */ u.jsxs(gg, { children: [
    /* @__PURE__ */ u.jsx(ug, { className: se("fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t) }),
    /* @__PURE__ */ u.jsxs(
      dg,
      {
        "data-slot": "dialog-content",
        "data-slot-id": r ?? c,
        className: se(
          vg(),
          a.content,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          e
        ),
        ...s,
        children: [
          o,
          /* @__PURE__ */ u.jsx(fg, { asChild: !0, children: /* @__PURE__ */ u.jsx(ke, { variant: "ghost", size: a.close.buttonSize, className: se("absolute", a.close.position), children: /* @__PURE__ */ u.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ u.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) }) })
        ]
      }
    )
  ] }) });
}
function ct({ children: e, className: t, onDoubleClick: n, onClick: o }) {
  const r = i.useRef(null), [s, a] = i.useState(!1);
  return i.useEffect(() => {
    r.current && a(r.current.scrollWidth > r.current.clientWidth);
  }, [e]), s ? /* @__PURE__ */ u.jsxs(Pr, { children: [
    /* @__PURE__ */ u.jsx(Ir, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        ref: r,
        className: t,
        onDoubleClick: n,
        onClick: o,
        children: e
      }
    ) }),
    /* @__PURE__ */ u.jsx(Tr, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: e }) })
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
function yl({ value: e, isEditing: t, isSelected: n, onStartEdit: o, editingValue: r, onUpdateEditingValue: s, onFinishEdit: a, onCancelEdit: c, readOnly: l, isCellHovering: d, onSelectCell: f, options: p, cellData: h, onChange: m }) {
  const b = i.useRef(null), [g, x] = i.useState(!1), C = p?.fields ?? [], v = h?.textFields ?? [], w = i.useRef(!1), y = i.useRef(!1);
  i.useEffect(() => {
    if (b.current) {
      const T = b.current, L = t && !w.current;
      if (t) {
        const X = r ?? String(e);
        if (T.textContent !== X && (T.textContent = X), document.activeElement !== T && T.focus(), L && !y.current) {
          const B = window.getSelection(), Q = document.createRange();
          Q.selectNodeContents(T), Q.collapse(!1), B?.removeAllRanges(), B?.addRange(Q);
        }
        y.current = !1;
      } else if (n && (T.textContent !== String(e) && (T.textContent = String(e)), !l && document.activeElement !== T && T.focus(), !l)) {
        const X = window.getSelection(), B = document.createRange();
        B.selectNodeContents(T), X?.removeAllRanges(), X?.addRange(B);
      }
      w.current = t;
    }
  }, [t, n, r, e, l]);
  const S = (T) => {
    T.stopPropagation(), n || f?.(), x(!0);
  }, R = (T) => {
    m?.({ textFields: T }), x(!1);
  }, k = C.length > 0, P = !l && k && (n || d), z = /* @__PURE__ */ u.jsxs(qt, { open: g, onOpenChange: x, children: [
    /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      ke,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-more",
        className: se(
          "ml-auto shrink-0",
          !P && "opacity-0 pointer-events-none"
        ),
        onClick: S
      }
    ) }),
    /* @__PURE__ */ u.jsx(Jt, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx(
      bg,
      {
        fields: C,
        textFields: v,
        onSave: R
      }
    ) })
  ] });
  return t || n ? /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: b,
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
        className: se(
          "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
          // 选中态：隐藏光标，看起来像普通文本
          n && !t && "caret-transparent cursor-pointer selection:bg-transparent"
        )
      }
    ),
    z
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ u.jsx(
      ct,
      {
        className: se("flex-1 min-h-6 truncate", !l && "cursor-pointer"),
        onDoubleClick: l ? void 0 : () => o?.(),
        children: String(e) || " "
      }
    ),
    z
  ] });
}
function bg({ fields: e, textFields: t, onSave: n }) {
  const [o, r] = i.useState(() => {
    const a = {};
    return e.forEach((c) => {
      const l = t.find((d) => d.fieldId === c.id);
      a[c.id] = l?.content ?? "";
    }), a;
  }), s = () => {
    n(e.map((a) => ({ fieldId: a.id, content: o[a.id] ?? "" })));
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "text-field-manager",
      onKeyDown: (a) => {
        a.key === "Enter" && (a.preventDefault(), s()), a.key === "Escape" && (a.preventDefault(), n(t));
      },
      children: [
        e.map((a) => /* @__PURE__ */ u.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ u.jsx(pt, { children: a.label }),
          /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
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
        /* @__PURE__ */ u.jsx(lt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ke, { variant: "outline", size: "base", className: "flex-1", onClick: () => n(t), children: "取消" }),
          /* @__PURE__ */ u.jsx(ke, { variant: "primary", size: "base", className: "flex-1", onClick: s, children: "保存" })
        ] })
      ]
    }
  );
}
function wg({ value: e, isEditing: t, isSelected: n, onStartEdit: o, editingValue: r, onUpdateEditingValue: s, onFinishEdit: a, onCancelEdit: c, readOnly: l, isCellHovering: d, onSelectCell: f }) {
  const p = i.useRef(null), [h, m] = i.useState(!1), b = i.useRef(!1), g = i.useRef(!1);
  i.useEffect(() => {
    if (p.current) {
      const v = p.current, w = t && !b.current;
      if (t) {
        const y = r ?? String(e);
        if (v.textContent !== y && (v.textContent = y), document.activeElement !== v && v.focus(), w && !g.current) {
          const S = window.getSelection(), R = document.createRange();
          R.selectNodeContents(v), R.collapse(!1), S?.removeAllRanges(), S?.addRange(R);
        }
        g.current = !1;
      } else if (n && (v.textContent !== String(e) && (v.textContent = String(e)), !l && document.activeElement !== v && v.focus(), !l)) {
        const y = window.getSelection(), S = document.createRange();
        S.selectNodeContents(v), y?.removeAllRanges(), y?.addRange(S);
      }
      b.current = t;
    }
  }, [t, n, r, e, l]);
  const x = (v) => {
    v.stopPropagation(), n || f?.(), m(!0);
  }, C = !l && (n || d);
  return t || n ? /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ u.jsx(
      "div",
      {
        ref: p,
        contentEditable: !l,
        suppressContentEditableWarning: !0,
        onClick: (v) => {
          !t && n && !l && (v.stopPropagation(), o?.(String(e)));
        },
        onInput: (v) => {
          const w = v.currentTarget.textContent || "";
          if (!(w === "" || /^-?\d*\.?\d*$/.test(w))) {
            const S = r ?? String(e);
            v.currentTarget.textContent = S;
            return;
          }
          t ? s?.(w) : n && !l && (g.current = !0, o?.(w));
        },
        onBlur: () => {
          t && a?.();
        },
        onKeyDown: (v) => {
          if (!t && n && v.key === " ") {
            v.preventDefault(), v.stopPropagation();
            const w = String(e);
            o?.(w + " ");
            return;
          }
          t && (v.key === "Enter" && (v.preventDefault(), a?.()), v.key === "Escape" && (v.preventDefault(), c?.()));
        },
        onDoubleClick: (v) => {
          !t && n && !l && (v.stopPropagation(), o?.(String(e)));
        },
        onPaste: (v) => {
          if (!t && n) {
            v.preventDefault(), v.stopPropagation();
            return;
          }
          if (t) {
            v.preventDefault();
            const w = v.clipboardData.getData("text/plain");
            (w === "" || /^-?\d*\.?\d*$/.test(w)) && document.execCommand("insertText", !1, w);
          }
        },
        className: se(
          "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
          // 选中态：隐藏光标，看起来像普通文本
          n && !t && "caret-transparent cursor-pointer selection:bg-transparent"
        )
      }
    ),
    /* @__PURE__ */ u.jsxs(qt, { open: h, onOpenChange: m, children: [
      /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ke,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-hashtag",
          className: se(
            "ml-auto shrink-0",
            !C && "opacity-0 pointer-events-none"
          ),
          onClick: x
        }
      ) }),
      /* @__PURE__ */ u.jsx(Jt, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx("div", { onClick: (v) => v.stopPropagation(), onDoubleClick: (v) => v.stopPropagation(), onMouseDown: (v) => v.stopPropagation(), children: /* @__PURE__ */ u.jsx(pt, { children: "数字列设置" }) }) })
    ] })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
    /* @__PURE__ */ u.jsx(
      ct,
      {
        className: se("flex-1 min-h-6 truncate", !l && "cursor-pointer"),
        onDoubleClick: l ? void 0 : () => o?.(),
        children: String(e) || " "
      }
    ),
    /* @__PURE__ */ u.jsxs(qt, { open: h, onOpenChange: m, children: [
      /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ke,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-hashtag",
          className: se(
            "ml-auto shrink-0",
            !C && "opacity-0 pointer-events-none"
          ),
          onClick: x
        }
      ) }),
      /* @__PURE__ */ u.jsx(Jt, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx("div", { onClick: (v) => v.stopPropagation(), onDoubleClick: (v) => v.stopPropagation(), onMouseDown: (v) => v.stopPropagation(), children: /* @__PURE__ */ u.jsx(pt, { children: "数字列设置" }) }) })
    ] })
  ] });
}
function Cg({
  value: e,
  options: t,
  onChange: n,
  onUpdateColumnOptions: o,
  isSelected: r,
  isCellHovering: s,
  onSelectCell: a,
  readOnly: c
}) {
  const l = t?.items ?? [], [d, f] = i.useState(!1), [p, h] = i.useState(""), m = i.useMemo(() => l.find((k) => k.value === e)?.label || "", [l, e]), b = i.useMemo(() => {
    if (!p.trim()) return l;
    const R = p.toLowerCase();
    return l.filter((k) => k.label.toLowerCase().includes(R));
  }, [l, p]), g = i.useMemo(() => {
    if (!p.trim()) return !0;
    const R = p.toLowerCase();
    return l.some((k) => k.label.toLowerCase() === R);
  }, [l, p]), x = () => {
    if (!p.trim() || !o) return;
    const R = p.trim(), k = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: R
    };
    f(!1), setTimeout(() => {
      const P = [...l, k];
      o({ ...t, items: P }), n?.(k.value);
    }, 200);
  }, C = (R) => {
    n?.(R), f(!1);
  }, v = () => {
    c || r || a?.();
  }, w = () => {
    c || (r || a?.(), f(!0));
  }, y = (R) => {
    R.stopPropagation(), r || a?.(), f(!0);
  }, S = !c && (r || s);
  return /* @__PURE__ */ u.jsxs(qt, { open: d, onOpenChange: (R) => {
    R && h(""), f(R);
  }, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
      /* @__PURE__ */ u.jsx(
        ct,
        {
          className: se(
            "flex-1 min-h-6 truncate",
            !c && "cursor-pointer",
            !m && "text-black-25"
          ),
          onClick: v,
          onDoubleClick: w,
          children: m || " "
        }
      ),
      /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ke,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-chevron-down",
          className: se(
            "ml-auto shrink-0",
            !S && "opacity-0 pointer-events-none"
          ),
          onClick: y
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsx(Jt, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (R) => R.stopPropagation(), onDoubleClick: (R) => R.stopPropagation(), onMouseDown: (R) => R.stopPropagation(), children: [
      /* @__PURE__ */ u.jsx(
        ut,
        {
          variant: "basic",
          size: "base",
          value: p,
          onChange: (R) => h(R.target.value),
          placeholder: "搜索或添加选项",
          className: "w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none",
          onKeyDown: (R) => {
            R.key === "Enter" && !g && p.trim() && (R.preventDefault(), x());
          }
        }
      ),
      /* @__PURE__ */ u.jsx(lt, { className: "!my-1" }),
      /* @__PURE__ */ u.jsxs("div", { className: "flex flex-col group/options", children: [
        b.length > 0 ? b.map((R) => /* @__PURE__ */ u.jsx(
          Is,
          {
            className: se(
              R.value === e && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
              R.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !R.disabled && C(R.value),
            children: /* @__PURE__ */ u.jsx(ct, { className: "flex-1 min-w-0 truncate", children: R.label })
          },
          R.value
        )) : !p.trim() && l.length === 0 ? /* @__PURE__ */ u.jsx("span", { className: "relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default", children: "没有选项" }) : null,
        p.trim() && !g && /* @__PURE__ */ u.jsx(
          Is,
          {
            className: "text-black-55 hover:text-black-85",
            onClick: x,
            children: /* @__PURE__ */ u.jsx(ct, { className: "flex-1 min-w-0 truncate", children: `添加选项 "${p.trim()}"` })
          }
        )
      ] })
    ] }) })
  ] });
}
function yg({ cellData: e, isSelected: t, isCellHovering: n, onChange: o, onSelectCell: r, readOnly: s }) {
  const a = e?.buttonConfig, [c, l] = i.useState(!1), d = (x) => {
    o?.({ buttonConfig: x }), l(!1);
  }, f = () => {
    const x = a?.url?.trim();
    return x ? x.startsWith("http://") || x.startsWith("https://") || x.includes(".") : !1;
  }, p = (x) => {
    if (x.stopPropagation(), f()) {
      const C = a.url.trim();
      C.startsWith("http://") || C.startsWith("https://") ? window.open(C, "_blank", "noopener,noreferrer") : window.open(`https://${C}`, "_blank", "noopener,noreferrer");
    } else
      r?.(), l(!0);
  }, h = (x) => {
    x.stopPropagation(), t || r?.(), l(!0);
  }, m = (x) => {
    x.stopPropagation(), !s && (t || r?.(), l(!0));
  }, b = !s && (t || n), g = a?.label?.trim() || a?.url?.trim();
  return /* @__PURE__ */ u.jsxs(qt, { open: c, onOpenChange: l, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", onDoubleClick: m, children: [
      g && /* @__PURE__ */ u.jsx("div", { className: "min-w-0 shrink", children: a?.label ? (
        // 文字按钮：link 样式，超长截断 + Tooltip
        /* @__PURE__ */ u.jsx(
          ke,
          {
            variant: "link",
            size: "base",
            onClick: p,
            className: "max-w-full",
            children: /* @__PURE__ */ u.jsx(ct, { className: "truncate", children: a.label })
          }
        )
      ) : (
        // 图标按钮：只有 URL 无名称时显示
        /* @__PURE__ */ u.jsx(
          ke,
          {
            variant: "link",
            size: "iconBase",
            leftIcon: "icon-jump",
            onClick: p
          }
        )
      ) }),
      /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
        ke,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-link",
          className: se(
            "ml-auto shrink-0",
            !b && "opacity-0 pointer-events-none"
          ),
          onClick: h
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsx(Jt, { align: "end", className: "w-[184px]", children: /* @__PURE__ */ u.jsx("div", { onClick: (x) => x.stopPropagation(), onDoubleClick: (x) => x.stopPropagation(), onMouseDown: (x) => x.stopPropagation(), children: /* @__PURE__ */ u.jsx(
      Sg,
      {
        config: a,
        onSave: d
      }
    ) }) })
  ] });
}
function Sg({ config: e, onSave: t }) {
  const [n, o] = i.useState(e?.label ?? ""), [r, s] = i.useState(e?.url ?? ""), a = i.useId(), c = () => {
    t({ label: n, url: r });
  }, l = () => {
    t(e ?? {});
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "button-link-manager",
      "data-slot-id": a,
      onKeyDown: (d) => {
        d.key === "Enter" && (d.preventDefault(), c()), d.key === "Escape" && (d.preventDefault(), l());
      },
      children: [
        /* @__PURE__ */ u.jsx(pt, { children: "链接名" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            value: n,
            onChange: (d) => o(d.target.value),
            placeholder: "输入链接名",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(pt, { children: "超链接" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            value: r,
            onChange: (d) => s(d.target.value),
            placeholder: "输入超链接",
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(lt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ke, { variant: "outline", size: "base", className: "flex-1", onClick: l, children: "取消" }),
          /* @__PURE__ */ u.jsx(ke, { variant: "primary", size: "base", className: "flex-1", onClick: c, children: "保存" })
        ] })
      ]
    }
  );
}
function Eg({ file: e, isSelected: t, isPreviewOpen: n, onPreview: o, onRemove: r }) {
  const [s, a] = i.useState(null), c = i.useRef(null), l = i.useRef(null), d = i.useRef(null), f = e.type.startsWith("image/"), p = e.type.startsWith("video/");
  i.useEffect(() => {
    if (f) {
      const C = URL.createObjectURL(e);
      return a(C), () => URL.revokeObjectURL(C);
    } else if (p) {
      const C = URL.createObjectURL(e), v = l.current, w = d.current;
      return v && w && (v.src = C, v.addEventListener("loadeddata", () => {
        w.width = v.videoWidth || 80, w.height = v.videoHeight || 80;
        const y = w.getContext("2d");
        if (y) {
          y.drawImage(v, 0, 0, w.width, w.height);
          const S = w.toDataURL("image/jpeg", 0.8);
          a(S);
        }
      }), v.currentTime = 0.1), () => URL.revokeObjectURL(C);
    }
    return () => {
    };
  }, [e, f, p]);
  const h = () => {
    o?.();
  }, m = (C) => {
    C.stopPropagation(), c.current?.click();
  }, b = (C) => {
    C.stopPropagation(), r?.();
  }, g = (C) => {
    C.target.files?.[0], C.target.value = "";
  }, x = /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: "group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer",
      onClick: h,
      children: [
        s ? /* @__PURE__ */ u.jsx("img", { src: s, alt: e.name, className: "size-full object-cover" }) : /* @__PURE__ */ u.jsx("svg", { className: "size-4 text-black-55", fill: "currentColor", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-file-1" }) }),
        (f || p) && s && /* @__PURE__ */ u.jsx("div", { className: se(
          "absolute inset-0 bg-black-10 opacity-0 group-hover:opacity-100",
          !n && "transition-opacity"
        ) })
      ]
    }
  );
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    t ? /* @__PURE__ */ u.jsxs(Pr, { children: [
      /* @__PURE__ */ u.jsx(Ir, { asChild: !0, children: x }),
      /* @__PURE__ */ u.jsxs(Tr, { side: "top", sideOffset: 4, className: "h-10 flex items-center px-0.5", children: [
        /* @__PURE__ */ u.jsx(
          ke,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-edit",
            onClick: m,
            className: "text-white-60 hover:text-white-100"
          }
        ),
        /* @__PURE__ */ u.jsx(
          ke,
          {
            variant: "ghost",
            size: "iconBase",
            leftIcon: "icon-delete",
            onClick: b,
            className: "text-white-60 hover:text-white-100"
          }
        )
      ] })
    ] }) : x,
    /* @__PURE__ */ u.jsx("input", { ref: c, type: "file", className: "hidden", onChange: g }),
    /* @__PURE__ */ u.jsx("video", { ref: l, className: "hidden", preload: "metadata", crossOrigin: "anonymous" }),
    /* @__PURE__ */ u.jsx("canvas", { ref: d, className: "hidden" })
  ] });
}
function Rg({ cellData: e, isSelected: t, isCellHovering: n, onChange: o, readOnly: r }) {
  const s = e?.attachmentFiles, a = i.useRef(null), c = i.useRef(null), [l, d] = i.useState(null), [f, p] = i.useState([]), h = s ?? [], m = h.length, [b, g] = i.useState(m);
  i.useEffect(() => {
    const T = c.current;
    if (!T) return;
    const L = () => {
      const B = T.clientWidth, oe = Math.max(1, Math.floor(B / 40));
      g(oe);
    };
    L();
    const X = new ResizeObserver(L);
    return X.observe(T), () => X.disconnect();
  }, [m]);
  const x = m > b, C = m - b;
  i.useEffect(() => {
    const T = h.map((L) => URL.createObjectURL(L));
    return p(T), () => T.forEach((L) => URL.revokeObjectURL(L));
  }, [s]);
  const v = (T) => {
    o?.({ attachmentFiles: T });
  }, w = () => {
    a.current?.click();
  }, y = (T) => {
    const L = Array.from(T.target.files || []);
    L.length > 0 && v([...h, ...L]), T.target.value = "";
  }, S = (T) => {
    const L = h.filter((X, B) => B !== T);
    v(L), l === T && d(null);
  }, R = (T) => {
    d(T);
  }, k = () => {
    l !== null && l > 0 && d(l - 1);
  }, P = () => {
    l !== null && l < m - 1 && d(l + 1);
  };
  i.useEffect(() => {
    if (l === null) return;
    const T = (L) => {
      L.key === "ArrowLeft" ? k() : L.key === "ArrowRight" && P();
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [l]);
  const z = !r && (t || n);
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("div", { ref: c, className: "flex items-center gap-2 min-w-0 flex-1", children: [
      m > 0 && /* @__PURE__ */ u.jsx("div", { className: "flex items-center gap-2 min-w-0 shrink", children: h.slice(0, b).map((T, L) => /* @__PURE__ */ u.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ u.jsx(
          Eg,
          {
            file: T,
            isSelected: t ?? !1,
            isPreviewOpen: l !== null,
            onPreview: () => R(L),
            onRemove: () => S(L)
          }
        ),
        x && L === b - 1 && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer",
            onClick: () => R(L),
            children: /* @__PURE__ */ u.jsxs("span", { className: "text-xs text-white-100", children: [
              "+",
              C
            ] })
          }
        )
      ] }, `${T.name}-${T.size}-${L}`)) }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          ref: a,
          type: "file",
          multiple: !0,
          className: "hidden",
          onChange: y
        }
      ),
      z && /* @__PURE__ */ u.jsx(
        ke,
        {
          variant: "ghost",
          size: "iconSm",
          leftIcon: "icon-upload",
          className: "ml-auto shrink-0",
          onClick: w
        }
      )
    ] }),
    l !== null && f[l] && /* @__PURE__ */ u.jsx(hg, { open: l !== null, onOpenChange: (T) => !T && d(null), children: /* @__PURE__ */ u.jsxs(
      xg,
      {
        size: "lg",
        overlayClassName: "bg-black-55",
        className: "w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85",
        children: [
          /* @__PURE__ */ u.jsx(
            ke,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-left",
              disabled: l === 0,
              className: "absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: k
            }
          ),
          h[l]?.type.startsWith("image/") ? /* @__PURE__ */ u.jsx("img", { src: f[l], alt: h[l].name, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" }) : h[l]?.type.startsWith("video/") ? /* @__PURE__ */ u.jsx("video", { src: f[l], controls: !0, className: "max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" }) : null,
          /* @__PURE__ */ u.jsx(
            ke,
            {
              variant: "ghost",
              size: "iconLg",
              leftIcon: "icon-arrow-right",
              disabled: l === m - 1,
              className: "absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60",
              onClick: P
            }
          ),
          /* @__PURE__ */ u.jsxs("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 text-white text-sm z-10", children: [
            l + 1,
            "/",
            m
          ] })
        ]
      }
    ) })
  ] });
}
const Sl = {
  text: yl,
  number: wg,
  select: Cg,
  link: yg,
  attachment: Rg
}, El = i.createContext(null), Rl = i.createContext(null), kl = i.createContext(null), _r = i.createContext(Sl);
function yo() {
  const e = i.useContext(El);
  if (!e) throw new Error("useTableActions must be used within a TableProvider");
  return e;
}
function bn() {
  const e = i.useContext(Rl);
  if (!e) throw new Error("useTableData must be used within a TableProvider");
  return e;
}
function wn() {
  const e = i.useContext(kl);
  if (!e) throw new Error("useTableState must be used within a TableProvider");
  return e;
}
function jt() {
  return {
    state: wn(),
    actions: yo(),
    data: bn(),
    cellRenderers: i.useContext(_r)
  };
}
function kg({ data: e, cellRenderers: t, readOnly: n, onCellValueChange: o, children: r }) {
  const s = i.useMemo(
    () => ({ ...Sl, ...t }),
    [t]
  ), [a, c] = i.useState(() => {
    const E = {};
    return e.columns.forEach((A) => {
      E[A.id] = A.width === "auto" ? 40 : A.width ?? 200;
    }), E;
  }), [l, d] = i.useState(e.columns), [f, p] = i.useState(e.rows), [h, m] = i.useState(() => e.hiddenColumns ?? /* @__PURE__ */ new Set()), [b, g] = i.useState(() => {
    const E = /* @__PURE__ */ new Set(), A = e.columns.find((F) => F.type === "checkbox");
    A && E.add(A.id);
    const O = e.columns.find((F) => F.type !== "checkbox");
    return O && E.add(O.id), E;
  }), [x, C] = i.useState(() => e.groupColumnId ?? null), [v, w] = i.useState(() => {
    if (e.initialCollapsedGroups) return new Set(e.initialCollapsedGroups);
    if (!e.groupColumnId) return /* @__PURE__ */ new Set();
    const E = e.columns.findIndex((V) => V.id === e.groupColumnId);
    if (E === -1) return /* @__PURE__ */ new Set();
    const A = new Set(e.rows.map((V) => String(V.cells[E]?.value ?? ""))), O = Array.from(A).sort((V, D) => !V && D ? 1 : V && !D ? -1 : 0), F = O[0];
    if (!F) return /* @__PURE__ */ new Set();
    const _ = new Set(O);
    return _.delete(F), _;
  }), [y, S] = i.useState(/* @__PURE__ */ new Set()), [R, k] = i.useState(null), [P, z] = i.useState(n ?? !1);
  i.useEffect(() => {
    P && ($(null), te(""), ee(null));
  }, [P]);
  const T = i.useRef(l);
  T.current = l;
  const L = i.useRef(f);
  L.current = f;
  const X = i.useRef(h);
  X.current = h;
  const B = i.useRef(b);
  B.current = b;
  const Q = i.useRef(x);
  Q.current = x;
  const oe = i.useRef(v);
  oe.current = v;
  const U = i.useRef(a);
  U.current = a;
  const K = i.useRef([]), H = i.useRef([]);
  i.useEffect(() => {
    K.current = [], H.current = [];
  }, [e]);
  const ie = i.useCallback(() => ({
    columns: T.current,
    rows: L.current,
    hiddenColumns: [...X.current],
    frozenColumns: [...B.current],
    groupColumnId: Q.current,
    collapsedGroups: [...oe.current],
    columnWidths: { ...U.current }
  }), []), M = i.useCallback(() => {
    K.current = [...K.current, ie()].slice(-20), H.current = [];
  }, [ie]), I = i.useCallback((E) => {
    d(E.columns), p(E.rows), m(new Set(E.hiddenColumns)), g(new Set(E.frozenColumns)), C(E.groupColumnId), w(new Set(E.collapsedGroups)), c({ ...E.columnWidths }), k(null), ee(null), $(null), te("");
  }, []), J = i.useCallback(() => {
    const E = K.current;
    if (E.length === 0) return;
    const A = E[E.length - 1];
    H.current = [...H.current, ie()], K.current = E.slice(0, -1), I(A);
  }, [ie, I]), de = i.useCallback(() => {
    const E = H.current;
    if (E.length === 0) return;
    const A = E[E.length - 1];
    K.current = [...K.current, ie()].slice(-20), H.current = E.slice(0, -1), I(A);
  }, [ie, I]), [ce, ee] = i.useState(null), [ue, $] = i.useState(null), [ne, te] = i.useState(""), pe = y.size === f.length && f.length > 0, ve = i.useCallback(() => {
    S(pe ? /* @__PURE__ */ new Set() : new Set(f.map((E) => E.id)));
  }, [pe, f]), ye = i.useCallback((E) => {
    S((A) => {
      const O = new Set(A);
      return O.has(E) ? O.delete(E) : O.add(E), O;
    }), ee(null);
  }, []), Ie = i.useCallback(() => {
    S(/* @__PURE__ */ new Set());
  }, []), be = i.useCallback((E, A) => {
    $(E), te(A);
  }, []), et = i.useCallback(() => {
    if (!ue) return;
    const E = l.some((A) => A.id === ue);
    if (ue.startsWith("group-header-") || M(), E)
      d(
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
  }, []), bt = i.useCallback((E) => {
    te(E);
  }, []), So = i.useCallback((E, A) => {
    M(), p((O) => O.map((F) => {
      const _ = F.cells.findIndex((D) => D.id === E);
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
  }, []), Eo = i.useCallback((E, A) => {
    c((O) => ({
      ...O,
      [E]: A
    }));
  }, []), nt = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, rn = i.useCallback((E) => {
    const A = l.findIndex((_) => _.id === E);
    if (A === -1) return;
    M();
    const O = nt(), F = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    d((_) => {
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
  }, [l]), Ro = i.useCallback((E) => {
    const A = l.findIndex((_) => _.id === E);
    if (A === -1) return;
    M();
    const O = nt(), F = {
      id: O,
      type: "text",
      title: "新列",
      width: 200
    };
    d((_) => {
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
  }, [l]), ko = i.useCallback((E) => {
    M(), m((A) => new Set(A).add(E));
  }, []), Cn = i.useCallback((E) => {
    M(), m((A) => {
      const O = new Set(A);
      return O.has(E) ? O.delete(E) : O.add(E), O;
    });
  }, []), yn = i.useCallback((E) => {
    const A = l.findIndex((O) => O.id === E);
    A !== -1 && (M(), d((O) => O.filter((F) => F.id !== E)), c((O) => {
      const F = { ...O };
      return delete F[E], F;
    }), m((O) => {
      const F = new Set(O);
      return F.delete(E), F;
    }), p(
      (O) => O.map((F) => ({
        ...F,
        cells: F.cells.filter((_, V) => V !== A)
      }))
    ));
  }, [l]), ot = i.useCallback((E, A) => {
    const O = l.findIndex((F) => F.id === E);
    O !== -1 && (M(), d(
      (F) => F.map(
        (_) => _.id === E ? { ..._, type: A } : _
      )
    ), p(
      (F) => F.map((_) => ({
        ..._,
        cells: _.cells.map(
          (V, D) => D === O ? { ...V, type: A } : V
        )
      }))
    ));
  }, [l]), Ot = i.useCallback((E, A) => {
    M(), d(
      (O) => O.map(
        (F) => F.id === E ? { ...F, title: A } : F
      )
    );
  }, []), Sn = i.useCallback((E, A) => {
    M(), d(
      (O) => O.map(
        (F) => F.id === E ? { ...F, options: A } : F
      )
    );
  }, []), sn = i.useCallback((E) => {
    const A = l.findIndex((F) => F.id === E);
    if (A === -1) return;
    M();
    const O = l.slice(0, A + 1).map((F) => F.id);
    g(new Set(O));
  }, [l]), _t = i.useCallback((E) => {
    if (M(), C(E), E) {
      const A = l.findIndex((_) => _.id === E);
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
  }, [l, f]), Dt = {
    selectedRows: y,
    selectAll: pe,
    editingCellId: ue,
    editingValue: ne,
    selectedCellId: ce,
    columnWidths: a,
    allColumns: l,
    hiddenColumns: h,
    frozenColumns: b,
    groupColumnId: x,
    collapsedGroups: v,
    selectedColumnId: R,
    readOnly: P
  }, Mt = i.useCallback((E) => {
    M(), w((A) => {
      const O = new Set(A);
      return O.has(E) ? O.delete(E) : O.add(E), O;
    });
  }, []), $t = i.useCallback(() => {
    M(), w(/* @__PURE__ */ new Set());
  }, []), Lt = i.useCallback(() => {
    if (!x) return;
    M();
    const E = l.findIndex((O) => O.id === x);
    if (E === -1) return;
    const A = new Set(f.map((O) => String(O.cells[E]?.value ?? "")));
    w(A);
  }, [x, l, f]), We = i.useCallback((E, A) => {
    const O = A.map((_) => _.id), F = O.every((_) => y.has(_));
    S((_) => {
      const V = new Set(_);
      return F ? O.forEach((D) => V.delete(D)) : O.forEach((D) => V.add(D)), V;
    });
  }, [y]), En = (E) => {
    switch (E.type) {
      case "checkbox":
        return !1;
      case "link":
        return E.options?.label || "";
      default:
        return "";
    }
  }, an = (E, A, O) => ({
    id: `${A}-${E.id}`,
    type: E.type,
    value: En(E),
    width: E.width === "auto" ? 40 : E.width ?? 200,
    ...O
  }), zt = i.useCallback((E, A) => {
    const O = l.findIndex((D) => D.id === A);
    if (O === -1) return;
    M();
    const F = nt(), _ = l.map(
      (D) => an(D, F, D.id === A ? { value: E } : void 0)
    );
    let V = f.length;
    for (let D = f.length - 1; D >= 0; D--) {
      const le = f[D]?.cells[O];
      if ((le ? String(le.value ?? "") : "") === E) {
        V = D + 1;
        break;
      }
    }
    p((D) => {
      const Z = [...D];
      return Z.splice(V, 0, { id: F, cells: _ }), Z;
    });
  }, [l, f]), Rn = i.useCallback(() => {
    M();
    const E = nt(), A = l.map(
      (O) => an(O, E)
    );
    p((O) => [...O, { id: E, cells: A }]);
  }, [l]), j = i.useCallback((E, A, O) => {
    const F = l.findIndex((_) => _.id === O);
    F !== -1 && (M(), p(
      (_) => _.map((V) => {
        const D = V.cells[F];
        if ((D ? String(D.value ?? "") : "") === E && D) {
          const le = [...V.cells];
          return le[F] = { ...D, value: A }, { ...V, cells: le };
        }
        return V;
      })
    ));
  }, [l]), N = i.useCallback((E) => {
    ee(E), E && (S(/* @__PURE__ */ new Set()), k(null));
  }, []), W = i.useCallback((E) => {
    k(E), E && (S(/* @__PURE__ */ new Set()), ee(null));
  }, []), q = i.useCallback((E, A, O) => {
    const F = l.findIndex((le) => le.id === E), _ = l.findIndex((le) => le.id === A);
    if (F === -1 || _ === -1 || F === _) return;
    M();
    const V = O === "right" ? _ + 1 : _, D = V > F ? V - 1 : V;
    if (D === F) return;
    const Z = F;
    d((le) => {
      const fe = [...le], me = fe[Z];
      return me ? (fe.splice(Z, 1), fe.splice(D, 0, me), fe) : le;
    }), p(
      (le) => le.map((fe) => {
        const me = [...fe.cells], Ce = me[Z];
        return Ce ? (me.splice(Z, 1), me.splice(D, 0, Ce), { ...fe, cells: me }) : fe;
      })
    ), k(E);
  }, [l]), re = i.useCallback((E, A) => {
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
      V = [...l, ...le], d(V), c((me) => ({ ...me, ...fe })), p(
        (me) => me.map((Ce) => {
          const Ne = le.map((Dr) => ({
            id: `${Ce.id}-${Dr.id}`,
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
      V = l.slice(0, le), d(V), c((me) => {
        const Ce = { ...me };
        return fe.forEach((Ne) => delete Ce[Ne]), Ce;
      }), m((me) => {
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
    if (E > D) {
      const Z = E - D, le = [];
      for (let fe = 0; fe < Z; fe++) {
        const me = nt(), Ce = V.map(
          (Ne) => an(Ne, me)
        );
        le.push({ id: me, cells: Ce });
      }
      p((fe) => [...fe, ...le]);
    } else E < D && p((Z) => Z.slice(0, E));
  }, [l, f]), ae = i.useCallback(() => {
    z((E) => !E);
  }, []), we = {
    toggleSelectAll: ve,
    toggleRowSelect: ye,
    clearSelection: Ie,
    startEdit: be,
    finishEdit: et,
    cancelEdit: tt,
    updateEditingValue: bt,
    selectCell: N,
    updateCellValue: So,
    updateColumnWidth: Eo,
    insertColumnLeft: rn,
    insertColumnRight: Ro,
    hideColumn: ko,
    toggleColumnVisibility: Cn,
    deleteColumn: yn,
    updateColumnType: ot,
    updateColumnTitle: Ot,
    updateColumnOptions: Sn,
    freezeColumns: sn,
    setGroupColumn: _t,
    toggleGroupCollapse: Mt,
    toggleGroupSelect: We,
    insertRowInGroup: zt,
    insertRow: Rn,
    updateGroupValues: j,
    expandAllGroups: $t,
    collapseAllGroups: Lt,
    selectColumn: W,
    moveColumnOrder: q,
    setDimension: re,
    toggleReadOnly: ae,
    undo: J,
    redo: de
  }, xe = i.useMemo(() => ({
    columns: l.filter((E) => !h.has(E.id)),
    rows: f.map((E) => ({
      ...E,
      cells: E.cells.filter((A, O) => !h.has(l[O]?.id ?? ""))
    })),
    allRows: f
  }), [l, f, h]), he = i.useMemo(() => {
    const E = /* @__PURE__ */ new Map();
    return xe.columns.forEach((A) => E.set(A.id, A)), E;
  }, [xe.columns]), Re = i.useMemo(() => ({ ...xe, columnMap: he }), [xe, he]), Se = i.useMemo(() => Dt, [Dt]);
  return /* @__PURE__ */ u.jsx(El.Provider, { value: we, children: /* @__PURE__ */ u.jsx(Rl.Provider, { value: Re, children: /* @__PURE__ */ u.jsx(kl.Provider, { value: Se, children: /* @__PURE__ */ u.jsx(_r.Provider, { value: s, children: r }) }) }) });
}
function Pg(e) {
  const { data: t, state: n } = jt(), o = i.useMemo(() => {
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
function Ig({
  columnId: e,
  isFirstDataColumn: t,
  groupColumnId: n,
  readOnly: o,
  onEdit: r,
  onHideManager: s,
  onDimension: a
}) {
  const { actions: c, state: l } = jt(), { close: d } = i.useContext(Fe), f = i.useId();
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "header-cell-menu", "data-slot-id": f, children: [
    !o && /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: r, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-edit" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "编辑列" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.hideColumn(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列" })
    ] }),
    /* @__PURE__ */ u.jsx(lt, {}),
    t && n && /* @__PURE__ */ u.jsxs(
      _e,
      {
        size: "base",
        onClick: () => {
          d(), setTimeout(() => {
            l.collapsedGroups.size > 0 ? c.expandAllGroups() : c.collapseAllGroups();
          }, 250);
        },
        children: [
          /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: l.collapsedGroups.size > 0 ? "#icon-chevron-down-double" : "#icon-a-chevron-rightdouble" }) }),
          /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: l.collapsedGroups.size > 0 ? "展开分组" : "收起分组" })
        ]
      }
    ),
    t ? /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: () => {
      d(), setTimeout(() => e && c.setGroupColumn(n ? null : e), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: n ? "取消分组" : "设为分组" })
    ] }) : /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: () => {
      d(), setTimeout(() => e && c.setGroupColumn(n === e ? null : e), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-form" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: n === e ? "取消分组" : "设为分组" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.insertColumnLeft(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-left" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向左插入列" })
    ] }),
    !o && /* @__PURE__ */ u.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.insertColumnRight(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-arrow-right" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "向右插入列" })
    ] }),
    /* @__PURE__ */ u.jsx(lt, {}),
    t && /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: s, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-browse-off" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "隐藏列管理" })
    ] }),
    !o && t && /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: a, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-view" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "行列数管理" })
    ] }),
    t && /* @__PURE__ */ u.jsxs(_e, { size: "base", onClick: () => {
      d(), setTimeout(() => c.toggleReadOnly(), 250);
    }, children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: o ? "#icon-book-open" : "#icon-book-open-filled" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: o ? "编辑模式" : "只读模式" })
    ] }),
    !t && /* @__PURE__ */ u.jsxs(_e, { size: "base", closeOnClick: !0, onClick: () => e && c.freezeColumns(e), children: [
      /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-grid-column" }) }),
      /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-85", children: "冻结到此列" })
    ] }),
    !o && !t && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(lt, {}),
      /* @__PURE__ */ u.jsxs(
        _e,
        {
          size: "base",
          closeOnClick: !0,
          onClick: () => e && c.deleteColumn(e),
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
function Tg({ size: e, fields: t }) {
  const n = i.useContext(Fe), o = e ?? n.size, r = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5"
  }[o], s = i.useRef(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ u.jsx(u.Fragment, { children: t.map((a, c) => /* @__PURE__ */ u.jsxs(i.Fragment, { children: [
    a.label && /* @__PURE__ */ u.jsx(pt, { children: a.label }),
    a.type === "input" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsx(
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
    a.type === "select" && /* @__PURE__ */ u.jsx("div", { className: r, children: /* @__PURE__ */ u.jsxs(sm, { value: a.value, onValueChange: a.onChange, size: o, children: [
      /* @__PURE__ */ u.jsx(im, { variant: "basic", className: "w-full", children: /* @__PURE__ */ u.jsx(cm, { placeholder: a.placeholder }) }),
      /* @__PURE__ */ u.jsx(am, { children: a.options?.map((l) => /* @__PURE__ */ u.jsx(lm, { value: l.value, children: l.label }, l.value)) })
    ] }) }),
    a.type === "content" && /* @__PURE__ */ u.jsx(
      Ng,
      {
        field: a,
        paddingClass: r,
        size: o
      }
    )
  ] }, c)) });
}
function Ng({ field: e, paddingClass: t }) {
  const n = e.contentType === "text", o = e.contentType === "select";
  if (!n && !o) return null;
  const r = o ? (e.selectOptions ?? []).map((v) => ({ key: v.value, label: v.label })) : (e.textFields ?? []).map((v) => ({ key: v.id, label: v.label })), s = o ? "添加选项" : "添加字段", a = o ? "输入选项名称" : "输入字段名称", [c, l] = i.useState(null), [d, f] = i.useState(null), p = () => `${o ? "opt" : "fld"}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, h = () => {
    const v = { key: p() };
    o ? e.onSelectOptionsChange?.([{ value: v.key, label: "" }, ...e.selectOptions ?? []]) : e.onTextFieldsChange?.([{ id: v.key, label: "" }, ...e.textFields ?? []]);
  }, m = (v) => {
    o ? e.onSelectOptionsChange?.((e.selectOptions ?? []).filter((w, y) => y !== v)) : e.onTextFieldsChange?.((e.textFields ?? []).filter((w, y) => y !== v));
  }, b = (v, w) => {
    if (o) {
      const y = (e.selectOptions ?? []).map(
        (S, R) => R === v ? { ...S, label: w } : S
      );
      e.onSelectOptionsChange?.(y);
    } else {
      const y = (e.textFields ?? []).map(
        (S, R) => R === v ? { ...S, label: w } : S
      );
      e.onTextFieldsChange?.(y);
    }
  }, g = (v) => l(v), x = (v, w) => {
    v.preventDefault(), f(w);
  }, C = () => {
    if (c !== null && d !== null && c !== d)
      if (o) {
        const v = [...e.selectOptions ?? []], w = v[c];
        w && (v.splice(c, 1), v.splice(d, 0, w), e.onSelectOptionsChange?.(v));
      } else {
        const v = [...e.textFields ?? []], w = v[c];
        w && (v.splice(c, 1), v.splice(d, 0, w), e.onTextFieldsChange?.(v));
      }
    l(null), f(null);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: t, children: [
    /* @__PURE__ */ u.jsx(
      ke,
      {
        variant: "ghost",
        size: "base",
        className: "w-full justify-center text-black-55",
        leftIcon: "icon-add",
        onClick: h,
        children: s
      }
    ),
    r.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "mt-1.5 flex flex-col gap-0.5", children: r.map((v, w) => /* @__PURE__ */ u.jsxs(
      "div",
      {
        draggable: !0,
        onDragStart: () => g(w),
        onDragOver: (y) => x(y, w),
        onDragEnd: C,
        className: Ag(
          "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
          d === w && "bg-brand-1",
          c === w && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ u.jsx(
            ke,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-move",
              className: "shrink-0 cursor-grab text-black-55"
            }
          ),
          /* @__PURE__ */ u.jsx(
            ut,
            {
              variant: "basic",
              size: "base",
              value: v.label,
              onChange: (y) => b(w, y.target.value),
              className: "flex-1 min-w-0",
              placeholder: a
            }
          ),
          /* @__PURE__ */ u.jsx(
            ke,
            {
              variant: "ghost",
              size: "iconSm",
              leftIcon: "icon-close",
              onClick: () => m(w),
              className: "shrink-0 text-black-55"
            }
          )
        ]
      },
      v.key
    )) })
  ] });
}
function Ag(...e) {
  return e.filter(Boolean).join(" ");
}
function jg({
  columnId: e,
  value: t,
  currentColumnType: n,
  currentColumnDef: o,
  onClose: r
}) {
  const { actions: s } = jt(), { close: a } = i.useContext(Fe), c = i.useId(), [l, d] = i.useState(String(t)), [f, p] = i.useState("text"), [h, m] = i.useState([]), [b, g] = i.useState([]);
  i.useEffect(() => {
    d(String(t)), p(n), o?.options ? n === "select" ? (m(o.options.items ?? []), g([])) : n === "text" ? (g(o.options.fields ?? []), m([])) : (m([]), g([])) : (m([]), g([]));
  }, [t, n, o]);
  const x = () => {
    if (l !== String(t) && e && s.updateColumnTitle(e, l), e && f !== n && s.updateColumnType(e, f), e) {
      const C = {};
      if (f === "select") {
        const v = h.filter((w) => w.label.trim());
        C.items = v;
      } else if (f === "text") {
        const v = b.filter((w) => w.label.trim());
        C.fields = v;
      }
      s.updateColumnOptions(e, C);
    }
    a();
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "header-cell-edit",
      "data-slot-id": c,
      onKeyDown: (C) => {
        C.key === "Enter" && (C.preventDefault(), x()), C.key === "Escape" && (C.preventDefault(), r());
      },
      children: [
        /* @__PURE__ */ u.jsx(
          Tg,
          {
            size: "base",
            fields: [
              {
                label: "标题",
                type: "input",
                value: l,
                onChange: d,
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
                selectOptions: h,
                onSelectOptionsChange: m
              }] : [],
              // 文本列：字段内容配置
              ...f === "text" ? [{
                label: "",
                type: "content",
                contentType: f,
                textFields: b,
                onTextFieldsChange: g
              }] : []
            ]
          }
        ),
        /* @__PURE__ */ u.jsx(lt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ke, { variant: "outline", size: "base", className: "flex-1", onClick: r, children: "取消" }),
          /* @__PURE__ */ u.jsx(ke, { variant: "primary", size: "base", className: "flex-1", onClick: x, children: "保存" })
        ] })
      ]
    }
  );
}
function Og({ firstDataColumnId: e }) {
  const { state: t, actions: n } = jt(), o = i.useId(), r = t.allColumns.find((a) => a.type === "checkbox"), s = r ? t.hiddenColumns.has(r.id) : !1;
  return /* @__PURE__ */ u.jsxs("div", { "data-slot": "hide-column-view", "data-slot-id": o, children: [
    r && /* @__PURE__ */ u.jsxs(
      _e,
      {
        size: "base",
        closeOnClick: !1,
        onClick: () => n.toggleColumnVisibility(r.id),
        children: [
          /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: s ? "#icon-browse-off" : "#icon-browse" }) }),
          /* @__PURE__ */ u.jsx("span", { children: "多选列" })
        ]
      }
    ),
    t.allColumns.filter((a) => a.type !== "checkbox" && a.id !== e).map((a) => {
      const c = t.hiddenColumns.has(a.id);
      return /* @__PURE__ */ u.jsxs(
        _e,
        {
          size: "base",
          closeOnClick: !1,
          onClick: () => n.toggleColumnVisibility(a.id),
          children: [
            /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-55 shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: c ? "#icon-browse-off" : "#icon-browse" }) }),
            /* @__PURE__ */ u.jsxs(Pr, { children: [
              /* @__PURE__ */ u.jsx(Ir, { asChild: !0, children: /* @__PURE__ */ u.jsx("span", { className: "truncate", children: a.title || a.id }) }),
              /* @__PURE__ */ u.jsx(Tr, { side: "top", size: "base", children: /* @__PURE__ */ u.jsx("p", { children: a.title || a.id }) })
            ] })
          ]
        },
        a.id
      );
    })
  ] });
}
function _g() {
  const { data: e, state: t, actions: n } = jt(), { close: o } = i.useContext(Fe), r = i.useId(), s = e.rows.length, a = i.useMemo(() => t.allColumns.some((S) => S.type === "checkbox") ? 1 : 0, [t.allColumns]), c = t.allColumns.length - a, [l, d] = i.useState(String(s)), [f, p] = i.useState(String(c)), h = (y) => Math.max(1, Math.min(100, y)), m = (y) => Math.max(2, Math.min(100, y)), b = (y) => {
    d(y);
  }, g = (y) => {
    p(y);
  }, x = () => {
    (l === "" || l === void 0) && d(String(s));
  }, C = () => {
    (f === "" || f === void 0) && p(String(c));
  }, v = () => {
    const y = h(parseInt(l) || s), S = m(parseInt(f) || c);
    n.setDimension(y, S), o();
  }, w = () => {
    o();
  };
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "header-cell-dimension",
      "data-slot-id": r,
      onKeyDown: (y) => {
        y.key === "Enter" && (y.preventDefault(), v()), y.key === "Escape" && (y.preventDefault(), w());
      },
      children: [
        /* @__PURE__ */ u.jsx(pt, { children: "行数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
          ut,
          {
            variant: "basic",
            size: "base",
            type: "number",
            value: l,
            onChange: (y) => b(y.target.value),
            onFocus: (y) => y.target.select(),
            onBlur: x,
            noSpinner: !0,
            min: 1,
            max: 100,
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ u.jsx(pt, { children: "列数" }),
        /* @__PURE__ */ u.jsx("div", { className: "px-2 pb-1.5", children: /* @__PURE__ */ u.jsx(
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
        /* @__PURE__ */ u.jsx(lt, {}),
        /* @__PURE__ */ u.jsxs("div", { className: "flex gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ u.jsx(ke, { variant: "outline", size: "base", className: "flex-1", onClick: w, children: "取消" }),
          /* @__PURE__ */ u.jsx(ke, { variant: "primary", size: "base", className: "flex-1", onClick: v, children: "保存" })
        ] })
      ]
    }
  );
}
const yt = {
  files: null,
  sourceCellId: null
}, st = {
  buttonConfig: null,
  sourceCellId: null
}, Pl = Oe("flex flex-col relative", {
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
function Dg({ cellId: e, value: t, columnId: n, currentColumnType: o, editView: r, setEditView: s, hideColumnView: a, setHideColumnView: c, dimensionView: l, setDimensionView: d, onDoubleClickTitle: f }) {
  const p = wn(), h = yo(), m = bn(), { close: b, isOpen: g } = i.useContext(Fe), { isFirstDataColumn: x, firstDataColumnId: C } = Pg(n), v = n ? m.columnMap?.get(n) : void 0;
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      ct,
      {
        className: "truncate cursor-pointer flex-1",
        onDoubleClick: f,
        children: String(t)
      }
    ),
    /* @__PURE__ */ u.jsx(Zt, { asChild: !0, children: /* @__PURE__ */ u.jsx(
      ke,
      {
        variant: "ghost",
        size: "iconSm",
        leftIcon: "icon-chevron-down",
        className: se(
          "transition-opacity",
          g ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        ),
        onClick: (w) => {
          w.stopPropagation(), p.selectedColumnId === n && h.selectColumn(null), p.selectedCellId && h.selectCell(null);
        },
        onDoubleClick: (w) => w.stopPropagation()
      }
    ) }),
    /* @__PURE__ */ u.jsx(Jt, { align: "end", alignOffset: -8, sideOffset: 8, className: "w-[200px]", children: /* @__PURE__ */ u.jsxs("div", { onClick: (w) => w.stopPropagation(), onDoubleClick: (w) => w.stopPropagation(), onMouseDown: (w) => w.stopPropagation(), children: [
      !r && !a && !l && /* @__PURE__ */ u.jsx(
        Ig,
        {
          columnId: n,
          isFirstDataColumn: x,
          groupColumnId: p.groupColumnId,
          readOnly: p.readOnly,
          onEdit: () => s(!0),
          onHideManager: () => c(!0),
          onDimension: () => d(!0)
        }
      ),
      r && /* @__PURE__ */ u.jsx(
        jg,
        {
          columnId: n,
          value: t,
          currentColumnType: o,
          currentColumnDef: v,
          onClose: b
        }
      ),
      a && /* @__PURE__ */ u.jsx(Og, { firstDataColumnId: C }),
      l && /* @__PURE__ */ u.jsx(_g, {})
    ] }) })
  ] });
}
function Mg({ cellId: e, value: t, columnId: n }) {
  const o = bn(), [r, s] = i.useState(!1), [a, c] = i.useState(!1), [l, d] = i.useState(!1), [f, p] = i.useState(!1), h = i.useContext(Il), m = n ? o.columnMap?.get(n)?.type ?? "text" : "text", b = (x) => {
    p(x), x && (s(!1), c(!1), d(!1)), h && (h.current = x);
  }, g = () => {
    h && (h.current = !0), p(!0), s(!0);
  };
  return /* @__PURE__ */ u.jsx(qt, { open: f, onOpenChange: b, children: /* @__PURE__ */ u.jsx(
    Dg,
    {
      cellId: e,
      value: t,
      columnId: n,
      currentColumnType: m,
      editView: r,
      setEditView: s,
      hideColumnView: a,
      setHideColumnView: c,
      dimensionView: l,
      setDimensionView: d,
      onDoubleClickTitle: g
    }
  ) });
}
function $g({ cellId: e, type: t, value: n, rowId: o, isHeader: r, columnId: s, rowIndex: a, cellOptions: c, isCellHovering: l }) {
  const d = wn(), f = yo(), p = bn(), h = i.useContext(_r), [m, b] = i.useState(!1);
  if (r && t === "checkbox") {
    const S = m || d.selectAll;
    return /* @__PURE__ */ u.jsx(
      "div",
      {
        className: "flex items-center justify-center w-full h-full",
        onMouseEnter: () => b(!0),
        onMouseLeave: () => b(!1),
        children: S ? /* @__PURE__ */ u.jsx(
          Ho,
          {
            checked: d.selectAll,
            onChange: () => f.toggleSelectAll()
          }
        ) : /* @__PURE__ */ u.jsx("svg", { className: "icon text-black-25", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("use", { xlinkHref: "#icon-vcell-logo" }) })
      }
    );
  }
  if (r)
    return /* @__PURE__ */ u.jsx(Mg, { cellId: e, value: n, columnId: s });
  if (t === "checkbox") {
    const S = o ? d.selectedRows.has(o) : !1, R = l || S;
    return /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: R ? /* @__PURE__ */ u.jsx(
      Ho,
      {
        checked: S,
        onChange: () => {
          o && f.toggleRowSelect(o);
        }
      }
    ) : /* @__PURE__ */ u.jsx("span", { className: "text-sm text-black-25", children: a ?? 1 }) });
  }
  const g = h[t || "text"] || yl, x = s ? p.columnMap?.get(s) : void 0, C = c ? { ...x?.options, ...c } : x?.options, v = d.selectedCellId === e, y = (o ? p.rows.find((S) => S.id === o) : void 0)?.cells.find((S) => S.id === e);
  return /* @__PURE__ */ u.jsx(
    g,
    {
      value: n,
      cellId: e,
      rowId: o,
      columnId: s,
      onChange: (S) => f.updateCellValue(e, S),
      isEditing: d.editingCellId === e,
      isSelected: v,
      isCellHovering: l,
      readOnly: d.readOnly,
      onStartEdit: (S) => f.startEdit(e, S ?? String(n)),
      onSelectCell: () => f.selectCell(e),
      options: C,
      cellData: y,
      editingValue: d.editingValue,
      onUpdateEditingValue: f.updateEditingValue,
      onFinishEdit: f.finishEdit,
      onCancelEdit: f.cancelEdit,
      onUpdateColumnOptions: (S) => f.updateColumnOptions(s, S)
    }
  );
}
const Fo = i.memo(function({ row: t, isHeader: n, isLastRow: o, columnIds: r, rowIndex: s, onCellResizeStart: a, onCellHoverEdge: c, onHeaderCellClick: l, onHeaderCellMouseDown: d, draggingColumnId: f, onCellHover: p, hoveringCellId: h, onBodyCellClick: m, frozenOffsets: b = {}, frozenWidth: g = 0, rowWidth: x, style: C, groupColumnId: v, hasOverflow: w }) {
  const y = wn(), S = bn(), R = yo(), k = !n && y.selectedRows.has(t.id), P = x ?? t.cells.reduce((z, T, L) => {
    const X = r?.[L] ?? T.id, B = S.columns[L], Q = T.width === "auto" ? 40 : T.width ?? (B?.width === "auto" ? 40 : B?.width ?? 80), oe = y.columnWidths[X] ?? Q;
    return z + oe;
  }, 0);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "row",
      "data-slot-id": t.id,
      className: se(
        "flex border-b border-neutral-2",
        k && "bg-brand-1"
      ),
      style: C ?? { minWidth: `${P}px`, width: n && !y.readOnly ? "100%" : `${P}px` },
      children: [
        t.cells.map((z, T) => {
          const L = r?.[T] ?? z.id, X = S.columns[T], B = z.type ?? X?.type ?? "text", Q = z.width ?? X?.width ?? 80, oe = Q === "auto" ? 40 : Q, U = y.columnWidths[L] ?? oe, K = y.frozenColumns.has(L), H = b[L] ?? 0, ie = K && H + U === g, M = !n && y.editingCellId === z.id && (B === "text" || B === "number" || B === "editable"), I = y.selectedColumnId === L, J = !n && y.selectedCellId === z.id, de = !n && h === z.id, ce = n ? I ? "headerSelected" : "header" : M ? "editing" : J || k || I ? "selected" : de && !y.readOnly ? "defaultHover" : "default", ee = n && I && !K && !f, ue = n && f && f === y.selectedColumnId;
          return /* @__PURE__ */ u.jsx(
            St,
            {
              columnId: L,
              "data-cell-id": n ? void 0 : z.id,
              width: U,
              variant: ce,
              isLastCell: !1,
              resizable: n && B !== "checkbox",
              onResizeStart: a ? ($, ne) => a(L, $, ne) : void 0,
              onHoverEdge: c ? ($) => c($ ? L : null) : void 0,
              onClick: n && B !== "checkbox" && l ? ($) => l(L, B, $) : !n && B !== "checkbox" && m ? ($) => m(z.id, $) : void 0,
              onMouseEnter: !n && p ? () => p(z.id) : void 0,
              onMouseLeave: !n && p ? () => p(null) : void 0,
              onMouseDown: n && B !== "checkbox" && !K && I && d ? ($) => d(L, $) : void 0,
              slotClassName: n && B === "text" ? "justify-between" : B === "checkbox" ? "justify-center" : void 0,
              className: se(
                n && B === "text" && "group",
                K && "sticky",
                n && K && "z-20",
                n && K && "top-0",
                !n && K && "z-10",
                ie && w && "shadow-[2px_0_4px_-2px_var(--black-10)]",
                // 光标
                ee && "cursor-grab",
                ue && "cursor-grabbing",
                // 分组模式下分组列的表头顶部描边
                n && v && L === v && "border-t-2 border-neutral-2",
                // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
                y.readOnly && T === t.cells.length - 1 && "!border-r-0"
              ),
              style: K ? { left: H } : void 0,
              children: /* @__PURE__ */ u.jsx(
                $g,
                {
                  cellId: z.id,
                  type: B,
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
        n && !y.readOnly && /* @__PURE__ */ u.jsx(
          St,
          {
            variant: "header",
            isLastCell: !0,
            className: "flex-1 min-w-[40px] cursor-pointer",
            onClick: () => {
              const z = r[r.length - 1];
              z && R.insertColumnRight(z);
            },
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(ke, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        )
      ]
    }
  );
}, (e, t) => e.row === t.row && e.isHeader === t.isHeader && e.columnIds === t.columnIds && e.rowIndex === t.rowIndex && e.hoveringCellId === t.hoveringCellId && e.draggingColumnId === t.draggingColumnId && e.onCellResizeStart === t.onCellResizeStart && e.onCellHoverEdge === t.onCellHoverEdge && e.onHeaderCellClick === t.onHeaderCellClick && e.onHeaderCellMouseDown === t.onHeaderCellMouseDown && e.onCellHover === t.onCellHover && e.onBodyCellClick === t.onBodyCellClick && e.frozenOffsets === t.frozenOffsets && e.frozenWidth === t.frozenWidth && e.rowWidth === t.rowWidth && e.groupColumnId === t.groupColumnId && e.hasOverflow === t.hasOverflow);
function Lg({ groupValue: e, rowCount: t, frozenWidth: n, rowWidth: o, checkboxWidth: r, frozenNonCheckboxWidth: s, isCollapsed: a, isGroupSelected: c, onToggle: l, onGroupSelect: d, groupColumnId: f, isCheckboxHidden: p, hasOverflow: h }) {
  const { state: m, actions: b } = jt(), g = `group-header-${e}`, x = m.editingCellId === g, [C, v] = i.useState(null), w = () => {
    m.editingValue !== e && b.updateGroupValues(e, m.editingValue, f), b.finishEdit();
  }, y = p ? s : n;
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
            className: se(
              "sticky left-0 z-10 flex bg-white-100",
              h && "shadow-[2px_0_4px_-2px_var(--black-10)]"
            ),
            style: { width: `${y}px` },
            children: [
              !p && /* @__PURE__ */ u.jsx(
                St,
                {
                  width: r,
                  isLastCell: !1,
                  variant: !m.readOnly && C === "checkbox" ? "defaultHover" : "default",
                  onMouseEnter: () => !m.readOnly && v("checkbox"),
                  onMouseLeave: () => v(null),
                  children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ u.jsx(Ho, { checked: c, onChange: d }) })
                }
              ),
              s > 0 && /* @__PURE__ */ u.jsx(
                St,
                {
                  width: s,
                  isLastCell: !1,
                  variant: x ? "editing" : !m.readOnly && C === "title" ? "defaultHover" : "default",
                  onMouseEnter: () => !m.readOnly && v("title"),
                  onMouseLeave: () => v(null),
                  children: /* @__PURE__ */ u.jsxs("div", { className: "relative flex items-center justify-between w-full h-6", children: [
                    x ? /* @__PURE__ */ u.jsx(
                      "input",
                      {
                        type: "text",
                        value: m.editingValue,
                        onChange: (S) => b.updateEditingValue(S.target.value),
                        onBlur: w,
                        onKeyDown: (S) => {
                          S.key === "Enter" && w(), S.key === "Escape" && b.cancelEdit();
                        },
                        onFocus: (S) => {
                          const R = S.target.value.length;
                          S.target.setSelectionRange(R, R);
                        },
                        className: "absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden",
                        autoFocus: !0
                      }
                    ) : /* @__PURE__ */ u.jsx(
                      ct,
                      {
                        className: se(
                          "text-sm truncate",
                          !m.readOnly && "cursor-pointer",
                          e ? "font-medium text-black-85" : "font-normal text-black-25"
                        ),
                        onDoubleClick: m.readOnly ? void 0 : () => b.startEdit(g, e),
                        children: e || "空值组"
                      }
                    ),
                    !x && /* @__PURE__ */ u.jsx(
                      ke,
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
        /* @__PURE__ */ u.jsx(St, { variant: "default", isLastCell: m.readOnly, className: "flex-1", children: "" })
      ]
    }
  );
}
function Ts({ rowWidth: e, showBorder: t, isHovering: n, onHoverChange: o, onInsert: r, frozenWidth: s, checkboxWidth: a, isCheckboxHidden: c }) {
  const l = c ? s - a : s, d = i.useId();
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      "data-slot": "insert-row",
      "data-slot-id": d,
      className: se(
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
          St,
          {
            width: l,
            variant: "default",
            isLastCell: !0,
            className: "sticky left-0 z-10 bg-transparent cursor-pointer",
            children: /* @__PURE__ */ u.jsx("div", { className: "flex items-center w-full h-full", children: /* @__PURE__ */ u.jsx(ke, { variant: "ghost", size: "iconSm", leftIcon: "icon-add" }) })
          }
        ),
        /* @__PURE__ */ u.jsx(St, { variant: "default", isLastCell: !1, className: "flex-1 cursor-pointer bg-transparent", children: "" })
      ]
    }
  );
}
function zg({ onChange: e }) {
  const t = wn(), n = i.useRef(t.collapsedGroups);
  return i.useEffect(() => {
    n.current !== t.collapsedGroups && (n.current = t.collapsedGroups, e?.(Array.from(t.collapsedGroups)));
  }, [t.collapsedGroups, e]), null;
}
const Zg = i.forwardRef(function({ className: t, variant: n, radius: o, data: r, cellRenderers: s, readOnly: a, contained: c = !1, onCollapsedGroupsChange: l, onCellValueChange: d, ...f }, p) {
  const h = c ? Pl({ variant: n, radius: o }) : "", m = c ? "plain" : n, b = c ? "none" : o, g = /* @__PURE__ */ u.jsx(Fg, { ref: p, className: t, variant: m, radius: b, ...f });
  return /* @__PURE__ */ u.jsxs(kg, { data: r, cellRenderers: s, readOnly: a, onCellValueChange: d, children: [
    /* @__PURE__ */ u.jsx(zg, { onChange: l }),
    /* @__PURE__ */ u.jsx(Nh, { children: c ? /* @__PURE__ */ u.jsx("div", { className: se("max-h-full min-h-0 overflow-auto overscroll-none w-fit max-w-full", h), children: g }) : g })
  ] });
}), Il = i.createContext(null), Fg = i.forwardRef(function({
  className: t,
  variant: n,
  radius: o,
  slotId: r,
  ...s
}, a) {
  const { data: c, state: l, actions: d } = jt(), f = i.useId();
  i.useImperativeHandle(a, () => ({
    undo: d.undo,
    redo: d.redo
  }), [d.undo, d.redo]);
  const [p, h] = i.useState(null), [m, b] = i.useState(null), [g, x] = i.useState(null), [C, v] = i.useState(null), [w, y] = i.useState(null), [S, R] = i.useState(0), [k, P] = i.useState(0), z = i.useRef(null), [T, L] = i.useState(null), [X, B] = i.useState(null), [Q, oe] = i.useState(null), [U, K] = i.useState(0), [H, ie] = i.useState(!1), M = i.useRef(0), I = i.useRef(null), J = i.useRef(null), de = i.useRef(!1), ce = i.useRef(!1), ee = c.columns.map((j) => j.id), ue = {
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
    const N = [], W = /* @__PURE__ */ new Map(), q = c.allRows ?? c.rows, re = /* @__PURE__ */ new Map();
    return c.rows.forEach((ae) => re.set(ae.id, ae)), q.forEach((ae) => {
      const we = String(ae.cells[j]?.value ?? "");
      W.has(we) || W.set(we, []);
      const xe = re.get(ae.id);
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
  }, [X, Q, ee, l.columnWidths]), bt = T ? l.columnWidths[T] ?? 80 : 0, So = (j, N, W) => {
    z.current && (clearTimeout(z.current), z.current = null), y(j), h(null), R(W), P(N);
  }, Eo = i.useCallback((j) => {
    j ? (z.current && clearTimeout(z.current), z.current = setTimeout(() => {
      h(j), z.current = null;
    }, 200)) : (z.current && (clearTimeout(z.current), z.current = null), h(null));
  }, []);
  i.useEffect(() => {
    if (!w) return;
    const j = (W) => {
      const q = W.clientX - S, re = Math.max(40, k + q);
      d.updateColumnWidth(w, re);
    }, N = () => {
      y(null);
    };
    return document.addEventListener("mousemove", j), document.addEventListener("mouseup", N), () => {
      document.removeEventListener("mousemove", j), document.removeEventListener("mouseup", N);
    };
  }, [w, S, k, d]);
  const nt = i.useCallback((j, N, W) => {
    W.stopPropagation(), l.selectedColumnId !== j && d.selectColumn(j);
  }, [d, l.selectedColumnId]), rn = i.useRef(null), Ro = i.useCallback((j, N) => {
    if (l.selectedColumnId !== j || l.frozenColumns.has(j)) return;
    N.preventDefault(), N.stopPropagation(), M.current = N.clientX;
    const W = (ae) => {
      if (Math.abs(ae.clientX - M.current) >= 4) {
        re();
        const xe = We.current?.getBoundingClientRect();
        if (xe) {
          const he = l.columnWidths[j] ?? 80;
          K(ae.clientX - xe.left - he / 2);
        }
        L(j);
      }
    }, q = () => {
      re();
    }, re = () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", q), rn.current = null;
    };
    rn.current = re, document.addEventListener("mousemove", W), document.addEventListener("mouseup", q);
  }, [l.selectedColumnId, l.frozenColumns]);
  i.useEffect(() => () => {
    rn.current?.();
  }, []), i.useEffect(() => {
    if (!T) return;
    const j = l.columnWidths[T] ?? 80;
    I.current = null, J.current = null, ie(!0);
    const N = ee.findIndex((re) => re === T), W = (re) => {
      const ae = We.current?.getBoundingClientRect();
      if (!ae) return;
      const we = re.clientX - ae.left;
      K(we - j / 2);
      const xe = re.clientX - ae.left + (We.current?.scrollLeft ?? 0);
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
      })() ? (B(Re), oe(Se), I.current = Re, J.current = Se) : (B(null), oe(null), I.current = null, J.current = null);
    }, q = () => {
      I.current && J.current && I.current !== T && d.moveColumnOrder(T, I.current, J.current), L(null), B(null), oe(null), ie(!1), I.current = null, J.current = null, de.current = !0;
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", q), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", q);
    };
  }, [T, ee, l.columnWidths, l.frozenColumns, d]);
  const ko = i.useCallback(() => {
    if (de.current) {
      de.current = !1;
      return;
    }
    ce.current || (d.selectColumn(null), d.selectCell(null));
  }, [d]), Cn = i.useCallback((j, N) => {
    l.readOnly || (N.stopPropagation(), N.target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) || d.selectCell(j);
  }, [d, l.readOnly]), yn = i.useCallback(() => {
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
    const N = yn();
    if (!N) return;
    const W = l.groupColumnId ? be?.flatMap((we) => l.collapsedGroups.has(we.groupValue) ? [] : we.rows) ?? c.rows : c.rows;
    let q = N.rowIndex, re = N.colIndex;
    if (j === "ArrowLeft" || j === "ArrowRight") {
      const we = j === "ArrowLeft" ? -1 : 1, xe = (W[N.rowIndex]?.cells.length ?? 1) - 1;
      let he = N.colIndex + we;
      for (; he >= 0 && he <= xe; ) {
        const Re = W[N.rowIndex]?.cells[he];
        if (Re && Re.type !== "checkbox") {
          re = he;
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
    if (q === N.rowIndex && re === N.colIndex) return;
    const ae = W[q]?.cells[re];
    ae && ae.type !== "checkbox" && d.selectCell(ae.id);
  }, [yn, l.groupColumnId, l.collapsedGroups, be, c.rows, d]), Ot = i.useCallback(() => {
    if (!l.selectedCellId) return null;
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (let W = 0; W < N.cells.length; W++) {
        const q = N.cells[W];
        if (q?.id === l.selectedCellId)
          return q.type ?? c.columns[W]?.type ?? "text";
      }
    return null;
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows, c.columns]), Sn = i.useCallback(() => {
    if (!l.selectedCellId) return null;
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (const W of N.cells)
        if (W?.id === l.selectedCellId)
          return N.id;
    return null;
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows]), sn = i.useCallback(() => {
    if (!l.selectedCellId) return "";
    const j = l.groupColumnId ? be?.flatMap((N) => l.collapsedGroups.has(N.groupValue) ? [] : N.rows) ?? c.rows : c.rows;
    for (const N of j)
      for (let W = 0; W < N.cells.length; W++) {
        const q = N.cells[W];
        if (q && q.id === l.selectedCellId) {
          const re = c.columns[W];
          return re?.type === "select" && (re.options?.items || []).find((xe) => xe.value === q.value)?.label || String(q.value ?? "");
        }
      }
    return "";
  }, [l.selectedCellId, l.groupColumnId, l.collapsedGroups, be, c.rows, c.columns]), _t = (j) => j && ["text", "number"].includes(j), Dt = (j) => j && ["select", "checkbox"].includes(j), Mt = i.useCallback((j, N, W) => {
    const q = W.options?.items || [], re = [], ae = [];
    if (j.forEach((we, xe) => {
      const he = we.trim(), Re = q.find((Se) => Se.label === he);
      if (Re)
        re.push({ originalIndex: xe, optionValue: Re.value });
      else {
        const Se = ae.find((E) => E.label === he);
        if (Se)
          re.push({ originalIndex: xe, optionValue: Se.value });
        else {
          const E = `opt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${xe}`;
          ae.push({ value: E, label: he }), re.push({ originalIndex: xe, optionValue: E });
        }
      }
    }), ae.length > 0) {
      const we = [...q, ...ae];
      d.updateColumnOptions(N, { ...W.options, items: we });
    }
    return re;
  }, [d]), $t = i.useCallback(() => {
    if (!l.selectedCellId) return;
    const j = document.querySelector(`[data-cell-id="${l.selectedCellId}"]`);
    if (!j) return;
    if (Ot() === "checkbox") {
      const q = j.querySelector('input[type="checkbox"]');
      q && q.click();
      return;
    }
    const W = j.querySelector('input, [data-slot="select-trigger"]');
    W && W.focus();
  }, [l.selectedCellId, Ot]);
  i.useEffect(() => {
    if (l.editingCellId) {
      const N = (W) => {
        W.key === "Tab" ? (W.preventDefault(), d.finishEdit(), ot(W.shiftKey ? "ArrowLeft" : "ArrowRight")) : W.key === "Enter" ? (W.preventDefault(), d.finishEdit(), ot(W.shiftKey ? "ArrowUp" : "ArrowDown")) : W.key === "Escape" && (W.preventDefault(), d.cancelEdit());
      };
      return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
    }
    if (!l.selectedCellId) return;
    const j = (N) => {
      if (document.activeElement.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]'))
        return;
      const re = Ot();
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(N.key)) {
        N.preventDefault(), ot(N.key);
        return;
      }
      if (N.key === "Tab") {
        N.preventDefault(), ot(N.shiftKey ? "ArrowLeft" : "ArrowRight");
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault(), Dt(re) ? $t() : ot(N.shiftKey ? "ArrowUp" : "ArrowDown");
        return;
      }
      if (N.key === "F2" && !l.readOnly) {
        if (_t(re)) {
          const ae = sn();
          d.startEdit(l.selectedCellId, ae);
        } else Dt(re) && $t();
        return;
      }
      if (N.key === "Delete" && !l.readOnly) {
        N.preventDefault(), N.stopPropagation(), N.stopImmediatePropagation(), _t(re) && d.updateCellValue(l.selectedCellId, "");
        return;
      }
      if (N.key === "Backspace" && !l.readOnly) {
        if (N.preventDefault(), N.stopPropagation(), N.stopImmediatePropagation(), re === "select")
          d.updateCellValue(l.selectedCellId, "");
        else if (re === "checkbox") {
          const ae = Sn();
          ae && d.toggleRowSelect(ae);
        } else re === "link" ? d.updateCellValue(l.selectedCellId, { buttonConfig: {} }) : re === "attachment" ? d.updateCellValue(l.selectedCellId, { attachmentFiles: [] }) : _t(re) && d.updateCellValue(l.selectedCellId, "");
        return;
      }
      if (N.key.length === 1 && !N.ctrlKey && !N.metaKey && !l.readOnly) {
        if (_t(re)) {
          if (re === "number" && !/^[\d\-.]$/.test(N.key)) return;
          const we = document.querySelector(`[data-cell-id="${l.selectedCellId}"]`)?.querySelector('[contenteditable="true"], [tabindex="0"]');
          we && we.focus();
        } else Dt(re) && $t();
        return;
      }
    };
    return document.addEventListener("keydown", j, !0), () => document.removeEventListener("keydown", j, !0);
  }, [l.selectedCellId, l.editingCellId, l.readOnly, c.rows, d, ot, Ot, sn, Sn, $t]);
  const Lt = i.useRef(!1);
  i.useEffect(() => {
    const j = (q) => {
      We.current?.contains(q.target) ?? !1 ? Lt.current = !0 : q.target.closest('button, a, input, select, textarea, [role="button"], [data-interactive]') && (Lt.current = !1);
    }, N = (q) => {
      if (!Lt.current || l.editingCellId || document.activeElement?.closest("input, textarea, select")) return;
      const ae = q.metaKey || q.ctrlKey, we = q.key.toLowerCase();
      ae && we === "z" && !q.shiftKey ? (q.preventDefault(), d.undo()) : ae && we === "z" && q.shiftKey && (q.preventDefault(), d.redo());
    }, W = (q) => {
      if (!Lt.current || l.editingCellId || l.readOnly || document.activeElement?.closest("input, textarea, select")) return;
      const ae = q.metaKey || q.ctrlKey, we = q.key.toLowerCase();
      if (ae && we === "c") {
        q.preventDefault(), q.stopPropagation();
        let xe = "";
        if (yt.files = null, yt.sourceCellId = null, st.buttonConfig = null, st.sourceCellId = null, l.selectedColumnId) {
          const he = l.allColumns.find((Re) => Re.id === l.selectedColumnId);
          if (he) {
            if (he.type === "attachment")
              return;
            const Re = c.rows, Se = c.columns.findIndex((E) => E.id === he.id);
            Se >= 0 && (xe = Re.map((A) => {
              const F = A.cells[Se]?.value ?? "";
              return he.type === "select" && (he.options?.items || []).find((D) => D.value === F)?.label || String(F);
            }).join(`
`));
          }
        } else if (l.selectedRows.size > 0) {
          const he = c.rows.filter((E) => l.selectedRows.has(E.id)), Re = l.allColumns.filter((E) => !l.hiddenColumns.has(E.id));
          xe = he.map((E) => Re.map((A) => {
            const O = c.columns.findIndex((V) => V.id === A.id), _ = (O >= 0 ? E.cells[O] : null)?.value ?? "";
            return A.type === "select" && (A.options?.items || []).find((Z) => Z.value === _)?.label || String(_);
          }).join("	")).join(`
`);
        } else if (l.selectedCellId)
          for (const he of c.rows)
            for (let Re = 0; Re < he.cells.length; Re++) {
              const Se = he.cells[Re];
              if (Se && Se.id === l.selectedCellId) {
                const E = c.columns[Re];
                if (E?.type === "attachment") {
                  const A = Se.attachmentFiles;
                  A && A.length > 0 && (yt.files = A, yt.sourceCellId = Se.id, xe = A.map((O) => O.name).join(", "));
                  break;
                }
                if (E?.type === "link") {
                  const A = Se.buttonConfig;
                  A && (st.buttonConfig = A, st.sourceCellId = Se.id, xe = A.label || A.url || "");
                  break;
                }
                if (E?.type === "select") {
                  xe = (E.options?.items || []).find((F) => F.value === Se.value)?.label || String(Se.value ?? "");
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
        const xe = yt.files && yt.files.length > 0, he = st.buttonConfig && (st.buttonConfig.label || st.buttonConfig.url);
        navigator.clipboard.readText().then((Re) => {
          const Se = Re ? Re.split(`
`).map((E) => E.split("	")) : [];
          if (l.selectedCellId) {
            const E = c.rows.findIndex(
              (D) => D.cells.some((Z) => Z.id === l.selectedCellId)
            );
            if (E < 0) return;
            const A = c.rows[E];
            if (!A) return;
            const O = A.cells.findIndex(
              (D) => D.id === l.selectedCellId
            );
            if (O < 0) return;
            const F = c.columns[O];
            if (F?.type === "attachment" && xe) {
              const D = A.cells[O];
              D && D.id && d.updateCellValue(D.id, { attachmentFiles: yt.files });
              return;
            }
            if (F?.type === "link" && he) {
              const D = A.cells[O];
              D && D.id && d.updateCellValue(D.id, { buttonConfig: st.buttonConfig });
              return;
            }
            const _ = [];
            Se.forEach((D, Z) => {
              D && D.forEach((le, fe) => {
                const me = E + Z, Ce = O + fe;
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
              Mt(D.values, Z, D.column).forEach((fe) => {
                const me = D.targets[fe.originalIndex];
                if (!me) return;
                const Ce = c.rows[me.rowIndex];
                if (!Ce) return;
                const Ne = Ce.cells[me.colIndex];
                Ne && Ne.id && d.updateCellValue(Ne.id, fe.optionValue);
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
                  /^https?:\/\//.test(Ne) || /^\/\//.test(Ne) ? d.updateCellValue(Ce.id, { buttonConfig: { url: Ne } }) : d.updateCellValue(Ce.id, { buttonConfig: { label: Ne } });
                }
                return;
              }
              if (Z?.type === "number" && D.value && !/^-?\d*\.?\d*$/.test(D.value.trim()))
                return;
              const le = c.rows[D.rowIndex];
              if (!le) return;
              const fe = le.cells[D.colIndex];
              fe && fe.id && d.updateCellValue(fe.id, D.value);
            });
          } else if (l.selectedRows.size > 0) {
            const E = c.rows.filter((_) => l.selectedRows.has(_.id)), A = l.allColumns.filter((_) => !l.hiddenColumns.has(_.id)), O = [];
            E.forEach((_, V) => {
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
              Mt(_.values, V, _.column).forEach((Z) => {
                const le = _.targets[Z.originalIndex];
                if (!le) return;
                const fe = le.row.cells[le.colIndexInData];
                fe && fe.id && d.updateCellValue(fe.id, Z.optionValue);
              });
            }), O.forEach((_) => {
              if (_.col.type === "select" || _.col.type === "number" && _.value && !/^-?\d*\.?\d*$/.test(_.value.trim()))
                return;
              const V = _.row.cells[_.colIndexInData];
              V && V.id && d.updateCellValue(V.id, _.value);
            });
          } else if (l.selectedColumnId) {
            const E = l.allColumns.find((A) => A.id === l.selectedColumnId);
            if (E) {
              const A = c.columns.findIndex((O) => O.id === E.id);
              if (A >= 0) {
                const O = [], F = [];
                Se.forEach((_, V) => {
                  if (V >= c.rows.length) return;
                  const D = c.rows[V];
                  D && (O.push(_?.[0] ?? ""), F.push({ row: D, rowIndex: V }));
                }), E.type === "select" ? Mt(O, E.id, E).forEach((V) => {
                  const D = F[V.originalIndex];
                  if (!D) return;
                  const Z = D.row.cells[A];
                  Z && Z.id && d.updateCellValue(Z.id, V.optionValue);
                }) : F.forEach((_, V) => {
                  const D = O[V];
                  if (E.type === "number" && D && !/^-?\d*\.?\d*$/.test(D.trim()))
                    return;
                  const Z = _.row.cells[A];
                  Z && Z.id && d.updateCellValue(Z.id, D);
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
  }, [l.editingCellId, l.selectedCellId, l.selectedRows, l.selectedColumnId, l.allColumns, l.hiddenColumns, l.readOnly, c.rows, c.columns, d, sn, Mt]);
  const We = i.useRef(null), [En, an] = i.useState(0), [zt, Rn] = i.useState(!1);
  return i.useEffect(() => {
    const j = We.current?.parentElement;
    if (!j) return;
    const N = () => an(j.scrollLeft);
    return j.addEventListener("scroll", N), N(), () => j.removeEventListener("scroll", N);
  }, []), i.useEffect(() => {
    const j = We.current, N = j?.parentElement;
    if (!j || !N) return;
    const W = new ResizeObserver(() => {
      Rn(j.scrollWidth > N.clientWidth);
    });
    return W.observe(j), W.observe(N), Rn(j.scrollWidth > N.clientWidth), () => W.disconnect();
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
        d.selectColumn(null), d.selectCell(null), j = !1;
      }
    };
    return document.addEventListener("pointerdown", N), document.addEventListener("pointerup", W), () => {
      document.removeEventListener("pointerdown", N), document.removeEventListener("pointerup", W);
    };
  }, [l.selectedColumnId, l.selectedCellId, d]), /* @__PURE__ */ u.jsx(Il.Provider, { value: ce, children: /* @__PURE__ */ u.jsxs(
    "div",
    {
      ref: We,
      "data-slot": "data-table",
      "data-slot-id": r ?? f,
      "data-resizing": w || T ? "true" : void 0,
      className: se(
        Pl({ variant: n, radius: o }),
        l.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
        t
      ),
      onClick: ko,
      ...s,
      children: [
        /* @__PURE__ */ u.jsx("div", { className: "sticky top-0 z-20", children: /* @__PURE__ */ u.jsx("div", { className: "relative", children: /* @__PURE__ */ u.jsx(
          Fo,
          {
            row: ue,
            isHeader: !0,
            columnIds: ee,
            onCellResizeStart: So,
            onCellHoverEdge: Eo,
            onHeaderCellClick: nt,
            onHeaderCellMouseDown: Ro,
            draggingColumnId: T,
            frozenOffsets: Ie,
            frozenWidth: ne,
            rowWidth: $,
            groupColumnId: l.groupColumnId ?? void 0,
            hasOverflow: zt
          }
        ) }) }),
        /* @__PURE__ */ u.jsx("div", { className: be || l.readOnly ? "pb-3" : void 0, children: be ? (
          // 分组渲染（每组序号独立计算）
          be.map((j, N) => {
            const W = l.collapsedGroups.has(j.groupValue), q = j.rows.every((re) => l.selectedRows.has(re.id));
            return /* @__PURE__ */ u.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ u.jsx(
                Lg,
                {
                  groupValue: j.groupValue,
                  rowCount: j.rows.length,
                  frozenWidth: ne,
                  rowWidth: $,
                  checkboxWidth: pe,
                  frozenNonCheckboxWidth: ye,
                  isCollapsed: W,
                  isGroupSelected: q,
                  onToggle: () => d.toggleGroupCollapse(j.groupValue),
                  onGroupSelect: () => d.toggleGroupSelect(j.groupValue, j.rows),
                  groupColumnId: l.groupColumnId,
                  isCheckboxHidden: ve,
                  hasOverflow: zt
                }
              ),
              !W && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                j.rows.map((re, ae) => /* @__PURE__ */ u.jsx(
                  Fo,
                  {
                    row: re,
                    columnIds: ee,
                    rowIndex: ae + 1,
                    isLastRow: ae === j.rows.length - 1 && N === be.length - 1,
                    hoveringCellId: m,
                    onCellHover: b,
                    onBodyCellClick: Cn,
                    frozenOffsets: Ie,
                    frozenWidth: ne,
                    rowWidth: $,
                    hasOverflow: zt
                  },
                  re.id
                )),
                !l.readOnly && /* @__PURE__ */ u.jsx(
                  Ts,
                  {
                    rowWidth: $,
                    showBorder: !0,
                    isHovering: g?.groupValue === j.groupValue,
                    onHoverChange: (re) => x(re ? { groupValue: j.groupValue, cell: "add" } : null),
                    onInsert: () => l.groupColumnId && d.insertRowInGroup(j.groupValue, l.groupColumnId),
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
          /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            c.rows.map((j, N) => /* @__PURE__ */ u.jsx(
              Fo,
              {
                row: j,
                columnIds: ee,
                rowIndex: N + 1,
                isLastRow: !1,
                hoveringCellId: m,
                onCellHover: b,
                onBodyCellClick: Cn,
                frozenOffsets: Ie,
                frozenWidth: ne,
                rowWidth: $,
                hasOverflow: zt
              },
              j.id
            )),
            !l.readOnly && /* @__PURE__ */ u.jsx(
              Ts,
              {
                rowWidth: $,
                showBorder: !1,
                isHovering: C !== null,
                onHoverChange: (j) => v(j ? "add" : null),
                onInsert: () => d.insertRow(),
                frozenWidth: ne,
                checkboxWidth: pe,
                isCheckboxHidden: ve
              }
            )
          ] })
        ) }),
        (p || w) && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${l.frozenColumns.has(p || w || "") ? et + En : et}px`
            }
          }
        ),
        T && X && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2",
            style: {
              left: `${l.frozenColumns.has(X) ? tt + En : tt}px`
            }
          }
        ),
        T && H && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none",
            style: {
              left: `${U}px`,
              width: `${bt}px`
            }
          }
        )
      ]
    }
  ) });
});
export {
  ke as Button,
  St as Cell,
  Kg as CellSlot,
  Ho as Checkbox,
  Zg as DataTable,
  ut as Input,
  Yg as NavigationItem,
  sm as Select,
  am as SelectContent,
  lm as SelectItem,
  im as SelectTrigger,
  cm as SelectValue,
  Xg as Table,
  Bg as Tabs,
  Gg as TabsContent,
  to as TabsContext,
  Hg as TabsList,
  Ug as TabsTrigger,
  kc as buttonVariants,
  Xu as cellVariants,
  qu as checkboxVariants,
  se as cn,
  Pl as dataTableVariants,
  Tc as inputVariants,
  um as navigationItemVariants,
  rm as selectTriggerVariants,
  fi as slotVariants,
  dm as tableVariants,
  Gu as tabsListVariants,
  Ku as tabsTriggerVariants
};
//# sourceMappingURL=index.js.map
