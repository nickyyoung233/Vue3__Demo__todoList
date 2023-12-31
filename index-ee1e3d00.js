(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function Ar(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const X = {},
  bt = [],
  Te = () => {},
  Ji = () => !1,
  Yi = /^on[^a-z]/,
  kn = (e) => Yi.test(e),
  Mr = (e) => e.startsWith("onUpdate:"),
  le = Object.assign,
  kr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Xi = Object.prototype.hasOwnProperty,
  K = (e, t) => Xi.call(e, t),
  N = Array.isArray,
  vt = (e) => jn(e) === "[object Map]",
  wo = (e) => jn(e) === "[object Set]",
  D = (e) => typeof e == "function",
  re = (e) => typeof e == "string",
  Fn = (e) => typeof e == "symbol",
  Z = (e) => e !== null && typeof e == "object",
  xo = (e) => (Z(e) || D(e)) && D(e.then) && D(e.catch),
  Eo = Object.prototype.toString,
  jn = (e) => Eo.call(e),
  Zi = (e) => jn(e).slice(8, -1),
  Co = (e) => jn(e) === "[object Object]",
  Fr = (e) =>
    re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  yn = Ar(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Ln = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Gi = /-(\w)/g,
  Et = Ln((e) => e.replace(Gi, (t, n) => (n ? n.toUpperCase() : ""))),
  el = /\B([A-Z])/g,
  at = Ln((e) => e.replace(el, "-$1").toLowerCase()),
  Io = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Jn = Ln((e) => (e ? `on${Io(e)}` : "")),
  ut = (e, t) => !Object.is(e, t),
  _n = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Cn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  lr = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let cs;
const cr = () =>
  cs ||
  (cs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function jr(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = re(r) ? sl(r) : jr(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else if (re(e) || Z(e)) return e;
}
const tl = /;(?![^(]*\))/g,
  nl = /:([^]+)/,
  rl = /\/\*[^]*?\*\//g;
function sl(e) {
  const t = {};
  return (
    e
      .replace(rl, "")
      .split(tl)
      .forEach((n) => {
        if (n) {
          const r = n.split(nl);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function sn(e) {
  let t = "";
  if (re(e)) t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = sn(e[n]);
      r && (t += r + " ");
    }
  else if (Z(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ol =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  il = Ar(ol);
function So(e) {
  return !!e || e === "";
}
const Po = (e) =>
    re(e)
      ? e
      : e == null
      ? ""
      : N(e) || (Z(e) && (e.toString === Eo || !D(e.toString)))
      ? JSON.stringify(e, Ro, 2)
      : String(e),
  Ro = (e, t) =>
    t && t.__v_isRef
      ? Ro(e, t.value)
      : vt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : wo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Z(t) && !N(t) && !Co(t)
      ? String(t)
      : t;
let Se;
class ll {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Se),
      !t && Se && (this.index = (Se.scopes || (Se.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Se;
      try {
        return (Se = this), t();
      } finally {
        Se = n;
      }
    }
  }
  on() {
    Se = this;
  }
  off() {
    Se = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function cl(e, t = Se) {
  t && t.active && t.effects.push(e);
}
function ul() {
  return Se;
}
const Lr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  To = (e) => (e.w & Ze) > 0,
  Oo = (e) => (e.n & Ze) > 0,
  fl = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ze;
  },
  al = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        To(s) && !Oo(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Ze),
          (s.n &= ~Ze);
      }
      t.length = n;
    }
  },
  ur = new WeakMap();
let $t = 0,
  Ze = 1;
const fr = 30;
let Pe;
const lt = Symbol(""),
  ar = Symbol("");
class Nr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      cl(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Pe,
      n = Ye;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Pe),
        (Pe = this),
        (Ye = !0),
        (Ze = 1 << ++$t),
        $t <= fr ? fl(this) : us(this),
        this.fn()
      );
    } finally {
      $t <= fr && al(this),
        (Ze = 1 << --$t),
        (Pe = this.parent),
        (Ye = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Pe === this
      ? (this.deferStop = !0)
      : this.active &&
        (us(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function us(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ye = !0;
const Ao = [];
function Ot() {
  Ao.push(Ye), (Ye = !1);
}
function At() {
  const e = Ao.pop();
  Ye = e === void 0 ? !0 : e;
}
function be(e, t, n) {
  if (Ye && Pe) {
    let r = ur.get(e);
    r || ur.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = Lr())), Mo(s);
  }
}
function Mo(e, t) {
  let n = !1;
  $t <= fr ? Oo(e) || ((e.n |= Ze), (n = !To(e))) : (n = !e.has(Pe)),
    n && (e.add(Pe), Pe.deps.push(e));
}
function De(e, t, n, r, s, o) {
  const i = ur.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && N(e)) {
    const c = Number(r);
    i.forEach((u, f) => {
      (f === "length" || (!Fn(f) && f >= c)) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        N(e)
          ? Fr(n) && l.push(i.get("length"))
          : (l.push(i.get(lt)), vt(e) && l.push(i.get(ar)));
        break;
      case "delete":
        N(e) || (l.push(i.get(lt)), vt(e) && l.push(i.get(ar)));
        break;
      case "set":
        vt(e) && l.push(i.get(lt));
        break;
    }
  if (l.length === 1) l[0] && dr(l[0]);
  else {
    const c = [];
    for (const u of l) u && c.push(...u);
    dr(Lr(c));
  }
}
function dr(e, t) {
  const n = N(e) ? e : [...e];
  for (const r of n) r.computed && fs(r);
  for (const r of n) r.computed || fs(r);
}
function fs(e, t) {
  (e !== Pe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const dl = Ar("__proto__,__v_isRef,__isVue"),
  ko = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Fn)
  ),
  as = hl();
function hl() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = z(this);
        for (let o = 0, i = this.length; o < i; o++) be(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(z)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ot();
        const r = z(this)[t].apply(this, n);
        return At(), r;
      };
    }),
    e
  );
}
function pl(e) {
  const t = z(this);
  return be(t, "has", e), t.hasOwnProperty(e);
}
class Fo {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, r) {
    const s = this._isReadonly,
      o = this._shallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw" && r === (s ? (o ? Pl : $o) : o ? No : Lo).get(t))
      return t;
    const i = N(t);
    if (!s) {
      if (i && K(as, n)) return Reflect.get(as, n, r);
      if (n === "hasOwnProperty") return pl;
    }
    const l = Reflect.get(t, n, r);
    return (Fn(n) ? ko.has(n) : dl(n)) || (s || be(t, "get", n), o)
      ? l
      : ae(l)
      ? i && Fr(n)
        ? l
        : l.value
      : Z(l)
      ? s
        ? Bo(l)
        : on(l)
      : l;
  }
}
class jo extends Fo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (Ct(o) && ae(o) && !ae(r)) return !1;
    if (
      !this._shallow &&
      (!In(r) && !Ct(r) && ((o = z(o)), (r = z(r))), !N(t) && ae(o) && !ae(r))
    )
      return (o.value = r), !0;
    const i = N(t) && Fr(n) ? Number(n) < t.length : K(t, n),
      l = Reflect.set(t, n, r, s);
    return (
      t === z(s) && (i ? ut(r, o) && De(t, "set", n, r) : De(t, "add", n, r)), l
    );
  }
  deleteProperty(t, n) {
    const r = K(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && De(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Fn(n) || !ko.has(n)) && be(t, "has", n), r;
  }
  ownKeys(t) {
    return be(t, "iterate", N(t) ? "length" : lt), Reflect.ownKeys(t);
  }
}
class gl extends Fo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ml = new jo(),
  yl = new gl(),
  _l = new jo(!0),
  $r = (e) => e,
  Nn = (e) => Reflect.getPrototypeOf(e);
function un(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = z(e),
    o = z(t);
  n || (ut(t, o) && be(s, "get", t), be(s, "get", o));
  const { has: i } = Nn(s),
    l = r ? $r : n ? Dr : Qt;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function fn(e, t = !1) {
  const n = this.__v_raw,
    r = z(n),
    s = z(e);
  return (
    t || (ut(e, s) && be(r, "has", e), be(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function an(e, t = !1) {
  return (
    (e = e.__v_raw), !t && be(z(e), "iterate", lt), Reflect.get(e, "size", e)
  );
}
function ds(e) {
  e = z(e);
  const t = z(this);
  return Nn(t).has.call(t, e) || (t.add(e), De(t, "add", e, e)), this;
}
function hs(e, t) {
  t = z(t);
  const n = z(this),
    { has: r, get: s } = Nn(n);
  let o = r.call(n, e);
  o || ((e = z(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? ut(t, i) && De(n, "set", e, t) : De(n, "add", e, t), this
  );
}
function ps(e) {
  const t = z(this),
    { has: n, get: r } = Nn(t);
  let s = n.call(t, e);
  s || ((e = z(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && De(t, "delete", e, void 0), o;
}
function gs() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && De(e, "clear", void 0, void 0), n;
}
function dn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = z(i),
      c = t ? $r : e ? Dr : Qt;
    return (
      !e && be(l, "iterate", lt), i.forEach((u, f) => r.call(s, c(u), c(f), o))
    );
  };
}
function hn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = z(s),
      i = vt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = s[e](...r),
      f = n ? $r : t ? Dr : Qt;
    return (
      !t && be(o, "iterate", c ? ar : lt),
      {
        next() {
          const { value: h, done: p } = u.next();
          return p
            ? { value: h, done: p }
            : { value: l ? [f(h[0]), f(h[1])] : f(h), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function We(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function bl() {
  const e = {
      get(o) {
        return un(this, o);
      },
      get size() {
        return an(this);
      },
      has: fn,
      add: ds,
      set: hs,
      delete: ps,
      clear: gs,
      forEach: dn(!1, !1),
    },
    t = {
      get(o) {
        return un(this, o, !1, !0);
      },
      get size() {
        return an(this);
      },
      has: fn,
      add: ds,
      set: hs,
      delete: ps,
      clear: gs,
      forEach: dn(!1, !0),
    },
    n = {
      get(o) {
        return un(this, o, !0);
      },
      get size() {
        return an(this, !0);
      },
      has(o) {
        return fn.call(this, o, !0);
      },
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
      forEach: dn(!0, !1),
    },
    r = {
      get(o) {
        return un(this, o, !0, !0);
      },
      get size() {
        return an(this, !0);
      },
      has(o) {
        return fn.call(this, o, !0);
      },
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
      forEach: dn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = hn(o, !1, !1)),
        (n[o] = hn(o, !0, !1)),
        (t[o] = hn(o, !1, !0)),
        (r[o] = hn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [vl, wl, xl, El] = bl();
function Hr(e, t) {
  const n = t ? (e ? El : xl) : e ? wl : vl;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(K(n, s) && s in r ? n : r, s, o);
}
const Cl = { get: Hr(!1, !1) },
  Il = { get: Hr(!1, !0) },
  Sl = { get: Hr(!0, !1) },
  Lo = new WeakMap(),
  No = new WeakMap(),
  $o = new WeakMap(),
  Pl = new WeakMap();
function Rl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Tl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Rl(Zi(e));
}
function on(e) {
  return Ct(e) ? e : Br(e, !1, ml, Cl, Lo);
}
function Ho(e) {
  return Br(e, !1, _l, Il, No);
}
function Bo(e) {
  return Br(e, !0, yl, Sl, $o);
}
function Br(e, t, n, r, s) {
  if (!Z(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = Tl(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function wt(e) {
  return Ct(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ct(e) {
  return !!(e && e.__v_isReadonly);
}
function In(e) {
  return !!(e && e.__v_isShallow);
}
function Do(e) {
  return wt(e) || Ct(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function Uo(e) {
  return Cn(e, "__v_skip", !0), e;
}
const Qt = (e) => (Z(e) ? on(e) : e),
  Dr = (e) => (Z(e) ? Bo(e) : e);
function Ko(e) {
  Ye && Pe && ((e = z(e)), Mo(e.dep || (e.dep = Lr())));
}
function zo(e, t) {
  e = z(e);
  const n = e.dep;
  n && dr(n);
}
function ae(e) {
  return !!(e && e.__v_isRef === !0);
}
function qo(e) {
  return Wo(e, !1);
}
function Ol(e) {
  return Wo(e, !0);
}
function Wo(e, t) {
  return ae(e) ? e : new Al(e, t);
}
class Al {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : Qt(t));
  }
  get value() {
    return Ko(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || In(t) || Ct(t);
    (t = n ? t : z(t)),
      ut(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Qt(t)), zo(this));
  }
}
function _e(e) {
  return ae(e) ? e.value : e;
}
const Ml = {
  get: (e, t, n) => _e(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ae(s) && !ae(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Vo(e) {
  return wt(e) ? e : new Proxy(e, Ml);
}
class kl {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Nr(t, () => {
        this._dirty || ((this._dirty = !0), zo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = z(this);
    return (
      Ko(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Fl(e, t, n = !1) {
  let r, s;
  const o = D(e);
  return (
    o ? ((r = e), (s = Te)) : ((r = e.get), (s = e.set)),
    new kl(r, s, o || !s, n)
  );
}
function Xe(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    $n(o, t, n);
  }
  return s;
}
function Oe(e, t, n, r) {
  if (D(e)) {
    const o = Xe(e, t, n, r);
    return (
      o &&
        xo(o) &&
        o.catch((i) => {
          $n(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Oe(e[o], t, n, r));
  return s;
}
function $n(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Xe(c, null, 10, [e, i, l]);
      return;
    }
  }
  jl(e, n, s, r);
}
function jl(e, t, n, r = !0) {
  console.error(e);
}
let Jt = !1,
  hr = !1;
const ue = [];
let Ne = 0;
const xt = [];
let Be = null,
  rt = 0;
const Qo = Promise.resolve();
let Ur = null;
function Jo(e) {
  const t = Ur || Qo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ll(e) {
  let t = Ne + 1,
    n = ue.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = ue[r],
      o = Yt(s);
    o < e || (o === e && s.pre) ? (t = r + 1) : (n = r);
  }
  return t;
}
function Kr(e) {
  (!ue.length || !ue.includes(e, Jt && e.allowRecurse ? Ne + 1 : Ne)) &&
    (e.id == null ? ue.push(e) : ue.splice(Ll(e.id), 0, e), Yo());
}
function Yo() {
  !Jt && !hr && ((hr = !0), (Ur = Qo.then(Zo)));
}
function Nl(e) {
  const t = ue.indexOf(e);
  t > Ne && ue.splice(t, 1);
}
function $l(e) {
  N(e)
    ? xt.push(...e)
    : (!Be || !Be.includes(e, e.allowRecurse ? rt + 1 : rt)) && xt.push(e),
    Yo();
}
function ms(e, t = Jt ? Ne + 1 : 0) {
  for (; t < ue.length; t++) {
    const n = ue[t];
    n && n.pre && (ue.splice(t, 1), t--, n());
  }
}
function Xo(e) {
  if (xt.length) {
    const t = [...new Set(xt)];
    if (((xt.length = 0), Be)) {
      Be.push(...t);
      return;
    }
    for (Be = t, Be.sort((n, r) => Yt(n) - Yt(r)), rt = 0; rt < Be.length; rt++)
      Be[rt]();
    (Be = null), (rt = 0);
  }
}
const Yt = (e) => (e.id == null ? 1 / 0 : e.id),
  Hl = (e, t) => {
    const n = Yt(e) - Yt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Zo(e) {
  (hr = !1), (Jt = !0), ue.sort(Hl);
  const t = Te;
  try {
    for (Ne = 0; Ne < ue.length; Ne++) {
      const n = ue[Ne];
      n && n.active !== !1 && Xe(n, null, 14);
    }
  } finally {
    (Ne = 0),
      (ue.length = 0),
      Xo(),
      (Jt = !1),
      (Ur = null),
      (ue.length || xt.length) && Zo();
  }
}
function Bl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || X;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const f = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: p } = r[f] || X;
    p && (s = n.map((_) => (re(_) ? _.trim() : _))), h && (s = n.map(lr));
  }
  let l,
    c = r[(l = Jn(t))] || r[(l = Jn(Et(t)))];
  !c && o && (c = r[(l = Jn(at(t)))]), c && Oe(c, e, 6, s);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Oe(u, e, 6, s);
  }
}
function Go(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!D(e)) {
    const c = (u) => {
      const f = Go(u, t, !0);
      f && ((l = !0), le(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (Z(e) && r.set(e, null), null)
    : (N(o) ? o.forEach((c) => (i[c] = null)) : le(i, o),
      Z(e) && r.set(e, i),
      i);
}
function Hn(e, t) {
  return !e || !kn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, at(t)) || K(e, t));
}
let ge = null,
  Bn = null;
function Sn(e) {
  const t = ge;
  return (ge = e), (Bn = (e && e.type.__scopeId) || null), t;
}
function ei(e) {
  Bn = e;
}
function ti() {
  Bn = null;
}
function Xt(e, t = ge, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Rs(-1);
    const o = Sn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Sn(o), r._d && Rs(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Yn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: u,
    render: f,
    renderCache: h,
    data: p,
    setupState: _,
    ctx: S,
    inheritAttrs: E,
  } = e;
  let P, M;
  const O = Sn(e);
  try {
    if (n.shapeFlag & 4) {
      const L = s || r;
      (P = Le(f.call(L, L, h, o, _, p, S))), (M = c);
    } else {
      const L = t;
      (P = Le(
        L.length > 1 ? L(o, { attrs: c, slots: l, emit: u }) : L(o, null)
      )),
        (M = t.props ? c : Dl(c));
    }
  } catch (L) {
    (Kt.length = 0), $n(L, e, 1), (P = ee(Ge));
  }
  let $ = P;
  if (M && E !== !1) {
    const L = Object.keys(M),
      { shapeFlag: te } = $;
    L.length && te & 7 && (i && L.some(Mr) && (M = Ul(M, i)), ($ = It($, M)));
  }
  return (
    n.dirs && (($ = It($)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)),
    n.transition && ($.transition = n.transition),
    (P = $),
    Sn(O),
    P
  );
}
const Dl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || kn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ul = (e, t) => {
    const n = {};
    for (const r in e) (!Mr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Kl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? ys(r, i, u) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (i[p] !== r[p] && !Hn(u, p)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? ys(r, i, u)
        : !0
      : !!i;
  return !1;
}
function ys(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Hn(n, o)) return !0;
  }
  return !1;
}
function zl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const ql = Symbol.for("v-ndc"),
  Wl = (e) => e.__isSuspense;
function Vl(e, t) {
  t && t.pendingBranch
    ? N(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : $l(e);
}
const pn = {};
function Bt(e, t, n) {
  return ni(e, t, n);
}
function ni(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = X
) {
  var l;
  const c = ul() === ((l = fe) == null ? void 0 : l.scope) ? fe : null;
  let u,
    f = !1,
    h = !1;
  if (
    (ae(e)
      ? ((u = () => e.value), (f = In(e)))
      : wt(e)
      ? ((u = () => e), (r = !0))
      : N(e)
      ? ((h = !0),
        (f = e.some((L) => wt(L) || In(L))),
        (u = () =>
          e.map((L) => {
            if (ae(L)) return L.value;
            if (wt(L)) return ot(L);
            if (D(L)) return Xe(L, c, 2);
          })))
      : D(e)
      ? t
        ? (u = () => Xe(e, c, 2))
        : (u = () => {
            if (!(c && c.isUnmounted)) return p && p(), Oe(e, c, 3, [_]);
          })
      : (u = Te),
    t && r)
  ) {
    const L = u;
    u = () => ot(L());
  }
  let p,
    _ = (L) => {
      p = O.onStop = () => {
        Xe(L, c, 4);
      };
    },
    S;
  if (en)
    if (
      ((_ = Te),
      t ? n && Oe(t, c, 3, [u(), h ? [] : void 0, _]) : u(),
      s === "sync")
    ) {
      const L = Bc();
      S = L.__watcherHandles || (L.__watcherHandles = []);
    } else return Te;
  let E = h ? new Array(e.length).fill(pn) : pn;
  const P = () => {
    if (O.active)
      if (t) {
        const L = O.run();
        (r || f || (h ? L.some((te, B) => ut(te, E[B])) : ut(L, E))) &&
          (p && p(),
          Oe(t, c, 3, [L, E === pn ? void 0 : h && E[0] === pn ? [] : E, _]),
          (E = L));
      } else O.run();
  };
  P.allowRecurse = !!t;
  let M;
  s === "sync"
    ? (M = P)
    : s === "post"
    ? (M = () => ye(P, c && c.suspense))
    : ((P.pre = !0), c && (P.id = c.uid), (M = () => Kr(P)));
  const O = new Nr(u, M);
  t
    ? n
      ? P()
      : (E = O.run())
    : s === "post"
    ? ye(O.run.bind(O), c && c.suspense)
    : O.run();
  const $ = () => {
    O.stop(), c && c.scope && kr(c.scope.effects, O);
  };
  return S && S.push($), $;
}
function Ql(e, t, n) {
  const r = this.proxy,
    s = re(e) ? (e.includes(".") ? ri(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  D(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = fe;
  Pt(this);
  const l = ni(s, o.bind(r), n);
  return i ? Pt(i) : ct(), l;
}
function ri(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function ot(e, t) {
  if (!Z(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ae(e))) ot(e.value, t);
  else if (N(e)) for (let n = 0; n < e.length; n++) ot(e[n], t);
  else if (wo(e) || vt(e))
    e.forEach((n) => {
      ot(n, t);
    });
  else if (Co(e)) for (const n in e) ot(e[n], t);
  return e;
}
function _s(e, t) {
  const n = ge;
  if (n === null) return e;
  const r = zn(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, c, u = X] = t[o];
    i &&
      (D(i) && (i = { mounted: i, updated: i }),
      i.deep && ot(l),
      s.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: u,
      }));
  }
  return e;
}
function tt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (Ot(), Oe(c, n, 8, [e.el, l, e, t]), At());
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function zr(e, t) {
  return D(e) ? (() => le({ name: e.name }, t, { setup: e }))() : e;
}
const Dt = (e) => !!e.type.__asyncLoader,
  si = (e) => e.type.__isKeepAlive;
function Jl(e, t) {
  oi(e, "a", t);
}
function Yl(e, t) {
  oi(e, "da", t);
}
function oi(e, t, n = fe) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Dn(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      si(s.parent.vnode) && Xl(r, t, n, s), (s = s.parent);
  }
}
function Xl(e, t, n, r) {
  const s = Dn(t, e, r, !0);
  ii(() => {
    kr(r[t], s);
  }, n);
}
function Dn(e, t, n = fe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Ot(), Pt(n);
          const l = Oe(t, n, e, i);
          return ct(), At(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const Ke =
    (e) =>
    (t, n = fe) =>
      (!en || e === "sp") && Dn(e, (...r) => t(...r), n),
  Zl = Ke("bm"),
  Gl = Ke("m"),
  ec = Ke("bu"),
  tc = Ke("u"),
  nc = Ke("bum"),
  ii = Ke("um"),
  rc = Ke("sp"),
  sc = Ke("rtg"),
  oc = Ke("rtc");
function ic(e, t = fe) {
  Dn("ec", e, t);
}
function lc(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (N(e) || re(e)) {
    s = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (Z(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = i[l];
        s[l] = t(e[u], u, l, o && o[l]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function bs(e, t, n = {}, r, s) {
  if (ge.isCE || (ge.parent && Dt(ge.parent) && ge.parent.isCE))
    return t !== "default" && (n.name = t), ee("slot", n, r && r());
  let o = e[t];
  o && o._c && (o._d = !1), ie();
  const i = o && li(o(n)),
    l = Gt(
      we,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function li(e) {
  return e.some((t) =>
    Tn(t) ? !(t.type === Ge || (t.type === we && !li(t.children))) : !0
  )
    ? e
    : null;
}
const pr = (e) => (e ? (_i(e) ? zn(e) || e.proxy : pr(e.parent)) : null),
  Ut = le(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => pr(e.parent),
    $root: (e) => pr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => qr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Kr(e.update)),
    $nextTick: (e) => e.n || (e.n = Jo.bind(e.proxy)),
    $watch: (e) => Ql.bind(e),
  }),
  Xn = (e, t) => e !== X && !e.__isScriptSetup && K(e, t),
  cc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const _ = i[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Xn(r, t)) return (i[t] = 1), r[t];
          if (s !== X && K(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && K(u, t)) return (i[t] = 3), o[t];
          if (n !== X && K(n, t)) return (i[t] = 4), n[t];
          gr && (i[t] = 0);
        }
      }
      const f = Ut[t];
      let h, p;
      if (f) return t === "$attrs" && be(e, "get", t), f(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== X && K(n, t)) return (i[t] = 4), n[t];
      if (((p = c.config.globalProperties), K(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Xn(s, t)
        ? ((s[t] = n), !0)
        : r !== X && K(r, t)
        ? ((r[t] = n), !0)
        : K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== X && K(e, i)) ||
        Xn(t, i) ||
        ((l = o[0]) && K(l, i)) ||
        K(r, i) ||
        K(Ut, i) ||
        K(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function vs(e) {
  return N(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let gr = !0;
function uc(e) {
  const t = qr(e),
    n = e.proxy,
    r = e.ctx;
  (gr = !1), t.beforeCreate && ws(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: f,
    beforeMount: h,
    mounted: p,
    beforeUpdate: _,
    updated: S,
    activated: E,
    deactivated: P,
    beforeDestroy: M,
    beforeUnmount: O,
    destroyed: $,
    unmounted: L,
    render: te,
    renderTracked: B,
    renderTriggered: G,
    errorCaptured: he,
    serverPrefetch: Ce,
    expose: se,
    inheritAttrs: ze,
    components: et,
    directives: Me,
    filters: Mt,
  } = t;
  if ((u && fc(u, r, null), i))
    for (const J in i) {
      const q = i[J];
      D(q) && (r[J] = q.bind(n));
    }
  if (s) {
    const J = s.call(n, n);
    Z(J) && (e.data = on(J));
  }
  if (((gr = !0), o))
    for (const J in o) {
      const q = o[J],
        $e = D(q) ? q.bind(n, n) : D(q.get) ? q.get.bind(n, n) : Te,
        qe = !D(q) && D(q.set) ? q.set.bind(n) : Te,
        ke = Ee({ get: $e, set: qe });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => ke.value,
        set: (me) => (ke.value = me),
      });
    }
  if (l) for (const J in l) ci(l[J], r, n, J);
  if (c) {
    const J = D(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((q) => {
      bn(q, J[q]);
    });
  }
  f && ws(f, e, "c");
  function oe(J, q) {
    N(q) ? q.forEach(($e) => J($e.bind(n))) : q && J(q.bind(n));
  }
  if (
    (oe(Zl, h),
    oe(Gl, p),
    oe(ec, _),
    oe(tc, S),
    oe(Jl, E),
    oe(Yl, P),
    oe(ic, he),
    oe(oc, B),
    oe(sc, G),
    oe(nc, O),
    oe(ii, L),
    oe(rc, Ce),
    N(se))
  )
    if (se.length) {
      const J = e.exposed || (e.exposed = {});
      se.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: ($e) => (n[q] = $e),
        });
      });
    } else e.exposed || (e.exposed = {});
  te && e.render === Te && (e.render = te),
    ze != null && (e.inheritAttrs = ze),
    et && (e.components = et),
    Me && (e.directives = Me);
}
function fc(e, t, n = Te) {
  N(e) && (e = mr(e));
  for (const r in e) {
    const s = e[r];
    let o;
    Z(s)
      ? "default" in s
        ? (o = Ue(s.from || r, s.default, !0))
        : (o = Ue(s.from || r))
      : (o = Ue(s)),
      ae(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o);
  }
}
function ws(e, t, n) {
  Oe(N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ci(e, t, n, r) {
  const s = r.includes(".") ? ri(n, r) : () => n[r];
  if (re(e)) {
    const o = t[e];
    D(o) && Bt(s, o);
  } else if (D(e)) Bt(s, e.bind(n));
  else if (Z(e))
    if (N(e)) e.forEach((o) => ci(o, t, n, r));
    else {
      const o = D(e.handler) ? e.handler.bind(n) : t[e.handler];
      D(o) && Bt(s, o, e);
    }
}
function qr(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((u) => Pn(c, u, i, !0)), Pn(c, t, i)),
    Z(t) && o.set(t, c),
    c
  );
}
function Pn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Pn(e, o, n, !0), s && s.forEach((i) => Pn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = ac[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const ac = {
  data: xs,
  props: Es,
  emits: Es,
  methods: Ht,
  computed: Ht,
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  components: Ht,
  directives: Ht,
  watch: hc,
  provide: xs,
  inject: dc,
};
function xs(e, t) {
  return t
    ? e
      ? function () {
          return le(
            D(e) ? e.call(this, this) : e,
            D(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function dc(e, t) {
  return Ht(mr(e), mr(t));
}
function mr(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? le(Object.create(null), e, t) : t;
}
function Es(e, t) {
  return e
    ? N(e) && N(t)
      ? [...new Set([...e, ...t])]
      : le(Object.create(null), vs(e), vs(t ?? {}))
    : t;
}
function hc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = le(Object.create(null), e);
  for (const r in t) n[r] = pe(e[r], t[r]);
  return n;
}
function ui() {
  return {
    app: null,
    config: {
      isNativeTag: Ji,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let pc = 0;
function gc(e, t) {
  return function (r, s = null) {
    D(r) || (r = le({}, r)), s != null && !Z(s) && (s = null);
    const o = ui(),
      i = new WeakSet();
    let l = !1;
    const c = (o.app = {
      _uid: pc++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Dc,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...f) {
        return (
          i.has(u) ||
            (u && D(u.install)
              ? (i.add(u), u.install(c, ...f))
              : D(u) && (i.add(u), u(c, ...f))),
          c
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), c;
      },
      component(u, f) {
        return f ? ((o.components[u] = f), c) : o.components[u];
      },
      directive(u, f) {
        return f ? ((o.directives[u] = f), c) : o.directives[u];
      },
      mount(u, f, h) {
        if (!l) {
          const p = ee(r, s);
          return (
            (p.appContext = o),
            f && t ? t(p, u) : e(p, u, h),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            zn(p.component) || p.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, f) {
        return (o.provides[u] = f), c;
      },
      runWithContext(u) {
        Rn = c;
        try {
          return u();
        } finally {
          Rn = null;
        }
      },
    });
    return c;
  };
}
let Rn = null;
function bn(e, t) {
  if (fe) {
    let n = fe.provides;
    const r = fe.parent && fe.parent.provides;
    r === n && (n = fe.provides = Object.create(r)), (n[e] = t);
  }
}
function Ue(e, t, n = !1) {
  const r = fe || ge;
  if (r || Rn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Rn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && D(t) ? t.call(r && r.proxy) : t;
  }
}
function mc(e, t, n, r = !1) {
  const s = {},
    o = {};
  Cn(o, Kn, 1), (e.propsDefaults = Object.create(null)), fi(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Ho(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function yc(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = z(s),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let p = f[h];
        if (Hn(e.emitsOptions, p)) continue;
        const _ = t[p];
        if (c)
          if (K(o, p)) _ !== o[p] && ((o[p] = _), (u = !0));
          else {
            const S = Et(p);
            s[S] = yr(c, l, S, _, e, !1);
          }
        else _ !== o[p] && ((o[p] = _), (u = !0));
      }
    }
  } else {
    fi(e, t, s, o) && (u = !0);
    let f;
    for (const h in l)
      (!t || (!K(t, h) && ((f = at(h)) === h || !K(t, f)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[f] !== void 0) &&
            (s[h] = yr(c, l, h, void 0, e, !0))
          : delete s[h]);
    if (o !== l) for (const h in o) (!t || !K(t, h)) && (delete o[h], (u = !0));
  }
  u && De(e, "set", "$attrs");
}
function fi(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (yn(c)) continue;
      const u = t[c];
      let f;
      s && K(s, (f = Et(c)))
        ? !o || !o.includes(f)
          ? (n[f] = u)
          : ((l || (l = {}))[f] = u)
        : Hn(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (o) {
    const c = z(n),
      u = l || X;
    for (let f = 0; f < o.length; f++) {
      const h = o[f];
      n[h] = yr(s, c, h, u[h], e, !K(u, h));
    }
  }
  return i;
}
function yr(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = K(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && D(c)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (Pt(s), (r = u[n] = c.call(null, t)), ct());
      } else r = c;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === "" || r === at(n)) && (r = !0));
  }
  return r;
}
function ai(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!D(e)) {
    const f = (h) => {
      c = !0;
      const [p, _] = ai(h, t, !0);
      le(i, p), _ && l.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!o && !c) return Z(e) && r.set(e, bt), bt;
  if (N(o))
    for (let f = 0; f < o.length; f++) {
      const h = Et(o[f]);
      Cs(h) && (i[h] = X);
    }
  else if (o)
    for (const f in o) {
      const h = Et(f);
      if (Cs(h)) {
        const p = o[f],
          _ = (i[h] = N(p) || D(p) ? { type: p } : le({}, p));
        if (_) {
          const S = Ps(Boolean, _.type),
            E = Ps(String, _.type);
          (_[0] = S > -1),
            (_[1] = E < 0 || S < E),
            (S > -1 || K(_, "default")) && l.push(h);
        }
      }
    }
  const u = [i, l];
  return Z(e) && r.set(e, u), u;
}
function Cs(e) {
  return e[0] !== "$";
}
function Is(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ss(e, t) {
  return Is(e) === Is(t);
}
function Ps(e, t) {
  return N(t) ? t.findIndex((n) => Ss(n, e)) : D(t) && Ss(t, e) ? 0 : -1;
}
const di = (e) => e[0] === "_" || e === "$stable",
  Wr = (e) => (N(e) ? e.map(Le) : [Le(e)]),
  _c = (e, t, n) => {
    if (t._n) return t;
    const r = Xt((...s) => Wr(t(...s)), n);
    return (r._c = !1), r;
  },
  hi = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (di(s)) continue;
      const o = e[s];
      if (D(o)) t[s] = _c(s, o, r);
      else if (o != null) {
        const i = Wr(o);
        t[s] = () => i;
      }
    }
  },
  pi = (e, t) => {
    const n = Wr(t);
    e.slots.default = () => n;
  },
  bc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), Cn(t, "_", n)) : hi(t, (e.slots = {}));
    } else (e.slots = {}), t && pi(e, t);
    Cn(e.slots, Kn, 1);
  },
  vc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = X;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (le(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), hi(t, s)),
        (i = t);
    } else t && (pi(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !di(l) && i[l] == null && delete s[l];
  };
function _r(e, t, n, r, s = !1) {
  if (N(e)) {
    e.forEach((p, _) => _r(p, t && (N(t) ? t[_] : t), n, r, s));
    return;
  }
  if (Dt(r) && !s) return;
  const o = r.shapeFlag & 4 ? zn(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    u = t && t.r,
    f = l.refs === X ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (u != null &&
      u !== c &&
      (re(u)
        ? ((f[u] = null), K(h, u) && (h[u] = null))
        : ae(u) && (u.value = null)),
    D(c))
  )
    Xe(c, l, 12, [i, f]);
  else {
    const p = re(c),
      _ = ae(c);
    if (p || _) {
      const S = () => {
        if (e.f) {
          const E = p ? (K(h, c) ? h[c] : f[c]) : c.value;
          s
            ? N(E) && kr(E, o)
            : N(E)
            ? E.includes(o) || E.push(o)
            : p
            ? ((f[c] = [o]), K(h, c) && (h[c] = f[c]))
            : ((c.value = [o]), e.k && (f[e.k] = c.value));
        } else
          p
            ? ((f[c] = i), K(h, c) && (h[c] = i))
            : _ && ((c.value = i), e.k && (f[e.k] = i));
      };
      i ? ((S.id = -1), ye(S, n)) : S();
    }
  }
}
const ye = Vl;
function wc(e) {
  return xc(e);
}
function xc(e, t) {
  const n = cr();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: f,
      parentNode: h,
      nextSibling: p,
      setScopeId: _ = Te,
      insertStaticContent: S,
    } = e,
    E = (
      a,
      d,
      g,
      m = null,
      b = null,
      v = null,
      R = !1,
      x = null,
      C = !!d.dynamicChildren
    ) => {
      if (a === d) return;
      a && !Ft(a, d) && ((m = y(a)), me(a, b, v, !0), (a = null)),
        d.patchFlag === -2 && ((C = !1), (d.dynamicChildren = null));
      const { type: w, ref: F, shapeFlag: A } = d;
      switch (w) {
        case Un:
          P(a, d, g, m);
          break;
        case Ge:
          M(a, d, g, m);
          break;
        case Zn:
          a == null && O(d, g, m, R);
          break;
        case we:
          et(a, d, g, m, b, v, R, x, C);
          break;
        default:
          A & 1
            ? te(a, d, g, m, b, v, R, x, C)
            : A & 6
            ? Me(a, d, g, m, b, v, R, x, C)
            : (A & 64 || A & 128) && w.process(a, d, g, m, b, v, R, x, C, I);
      }
      F != null && b && _r(F, a && a.ref, v, d || a, !d);
    },
    P = (a, d, g, m) => {
      if (a == null) r((d.el = l(d.children)), g, m);
      else {
        const b = (d.el = a.el);
        d.children !== a.children && u(b, d.children);
      }
    },
    M = (a, d, g, m) => {
      a == null ? r((d.el = c(d.children || "")), g, m) : (d.el = a.el);
    },
    O = (a, d, g, m) => {
      [a.el, a.anchor] = S(a.children, d, g, m, a.el, a.anchor);
    },
    $ = ({ el: a, anchor: d }, g, m) => {
      let b;
      for (; a && a !== d; ) (b = p(a)), r(a, g, m), (a = b);
      r(d, g, m);
    },
    L = ({ el: a, anchor: d }) => {
      let g;
      for (; a && a !== d; ) (g = p(a)), s(a), (a = g);
      s(d);
    },
    te = (a, d, g, m, b, v, R, x, C) => {
      (R = R || d.type === "svg"),
        a == null ? B(d, g, m, b, v, R, x, C) : Ce(a, d, b, v, R, x, C);
    },
    B = (a, d, g, m, b, v, R, x) => {
      let C, w;
      const { type: F, props: A, shapeFlag: j, transition: H, dirs: U } = a;
      if (
        ((C = a.el = i(a.type, v, A && A.is, A)),
        j & 8
          ? f(C, a.children)
          : j & 16 &&
            he(a.children, C, null, m, b, v && F !== "foreignObject", R, x),
        U && tt(a, null, m, "created"),
        G(C, a, a.scopeId, R, m),
        A)
      ) {
        for (const Q in A)
          Q !== "value" &&
            !yn(Q) &&
            o(C, Q, null, A[Q], v, a.children, m, b, ce);
        "value" in A && o(C, "value", null, A.value),
          (w = A.onVnodeBeforeMount) && je(w, m, a);
      }
      U && tt(a, null, m, "beforeMount");
      const Y = Ec(b, H);
      Y && H.beforeEnter(C),
        r(C, d, g),
        ((w = A && A.onVnodeMounted) || Y || U) &&
          ye(() => {
            w && je(w, m, a), Y && H.enter(C), U && tt(a, null, m, "mounted");
          }, b);
    },
    G = (a, d, g, m, b) => {
      if ((g && _(a, g), m)) for (let v = 0; v < m.length; v++) _(a, m[v]);
      if (b) {
        let v = b.subTree;
        if (d === v) {
          const R = b.vnode;
          G(a, R, R.scopeId, R.slotScopeIds, b.parent);
        }
      }
    },
    he = (a, d, g, m, b, v, R, x, C = 0) => {
      for (let w = C; w < a.length; w++) {
        const F = (a[w] = x ? Qe(a[w]) : Le(a[w]));
        E(null, F, d, g, m, b, v, R, x);
      }
    },
    Ce = (a, d, g, m, b, v, R) => {
      const x = (d.el = a.el);
      let { patchFlag: C, dynamicChildren: w, dirs: F } = d;
      C |= a.patchFlag & 16;
      const A = a.props || X,
        j = d.props || X;
      let H;
      g && nt(g, !1),
        (H = j.onVnodeBeforeUpdate) && je(H, g, d, a),
        F && tt(d, a, g, "beforeUpdate"),
        g && nt(g, !0);
      const U = b && d.type !== "foreignObject";
      if (
        (w
          ? se(a.dynamicChildren, w, x, g, m, U, v)
          : R || q(a, d, x, null, g, m, U, v, !1),
        C > 0)
      ) {
        if (C & 16) ze(x, d, A, j, g, m, b);
        else if (
          (C & 2 && A.class !== j.class && o(x, "class", null, j.class, b),
          C & 4 && o(x, "style", A.style, j.style, b),
          C & 8)
        ) {
          const Y = d.dynamicProps;
          for (let Q = 0; Q < Y.length; Q++) {
            const ne = Y[Q],
              Ie = A[ne],
              gt = j[ne];
            (gt !== Ie || ne === "value") &&
              o(x, ne, Ie, gt, b, a.children, g, m, ce);
          }
        }
        C & 1 && a.children !== d.children && f(x, d.children);
      } else !R && w == null && ze(x, d, A, j, g, m, b);
      ((H = j.onVnodeUpdated) || F) &&
        ye(() => {
          H && je(H, g, d, a), F && tt(d, a, g, "updated");
        }, m);
    },
    se = (a, d, g, m, b, v, R) => {
      for (let x = 0; x < d.length; x++) {
        const C = a[x],
          w = d[x],
          F =
            C.el && (C.type === we || !Ft(C, w) || C.shapeFlag & 70)
              ? h(C.el)
              : g;
        E(C, w, F, null, m, b, v, R, !0);
      }
    },
    ze = (a, d, g, m, b, v, R) => {
      if (g !== m) {
        if (g !== X)
          for (const x in g)
            !yn(x) && !(x in m) && o(a, x, g[x], null, R, d.children, b, v, ce);
        for (const x in m) {
          if (yn(x)) continue;
          const C = m[x],
            w = g[x];
          C !== w && x !== "value" && o(a, x, w, C, R, d.children, b, v, ce);
        }
        "value" in m && o(a, "value", g.value, m.value);
      }
    },
    et = (a, d, g, m, b, v, R, x, C) => {
      const w = (d.el = a ? a.el : l("")),
        F = (d.anchor = a ? a.anchor : l(""));
      let { patchFlag: A, dynamicChildren: j, slotScopeIds: H } = d;
      H && (x = x ? x.concat(H) : H),
        a == null
          ? (r(w, g, m), r(F, g, m), he(d.children, g, F, b, v, R, x, C))
          : A > 0 && A & 64 && j && a.dynamicChildren
          ? (se(a.dynamicChildren, j, g, b, v, R, x),
            (d.key != null || (b && d === b.subTree)) && gi(a, d, !0))
          : q(a, d, g, F, b, v, R, x, C);
    },
    Me = (a, d, g, m, b, v, R, x, C) => {
      (d.slotScopeIds = x),
        a == null
          ? d.shapeFlag & 512
            ? b.ctx.activate(d, g, m, R, C)
            : Mt(d, g, m, b, v, R, C)
          : dt(a, d, C);
    },
    Mt = (a, d, g, m, b, v, R) => {
      const x = (a.component = kc(a, m, b));
      if ((si(a) && (x.ctx.renderer = I), Fc(x), x.asyncDep)) {
        if ((b && b.registerDep(x, oe), !a.el)) {
          const C = (x.subTree = ee(Ge));
          M(null, C, d, g);
        }
        return;
      }
      oe(x, a, d, g, b, v, R);
    },
    dt = (a, d, g) => {
      const m = (d.component = a.component);
      if (Kl(a, d, g))
        if (m.asyncDep && !m.asyncResolved) {
          J(m, d, g);
          return;
        } else (m.next = d), Nl(m.update), m.update();
      else (d.el = a.el), (m.vnode = d);
    },
    oe = (a, d, g, m, b, v, R) => {
      const x = () => {
          if (a.isMounted) {
            let { next: F, bu: A, u: j, parent: H, vnode: U } = a,
              Y = F,
              Q;
            nt(a, !1),
              F ? ((F.el = U.el), J(a, F, R)) : (F = U),
              A && _n(A),
              (Q = F.props && F.props.onVnodeBeforeUpdate) && je(Q, H, F, U),
              nt(a, !0);
            const ne = Yn(a),
              Ie = a.subTree;
            (a.subTree = ne),
              E(Ie, ne, h(Ie.el), y(Ie), a, b, v),
              (F.el = ne.el),
              Y === null && zl(a, ne.el),
              j && ye(j, b),
              (Q = F.props && F.props.onVnodeUpdated) &&
                ye(() => je(Q, H, F, U), b);
          } else {
            let F;
            const { el: A, props: j } = d,
              { bm: H, m: U, parent: Y } = a,
              Q = Dt(d);
            if (
              (nt(a, !1),
              H && _n(H),
              !Q && (F = j && j.onVnodeBeforeMount) && je(F, Y, d),
              nt(a, !0),
              A && W)
            ) {
              const ne = () => {
                (a.subTree = Yn(a)), W(A, a.subTree, a, b, null);
              };
              Q
                ? d.type.__asyncLoader().then(() => !a.isUnmounted && ne())
                : ne();
            } else {
              const ne = (a.subTree = Yn(a));
              E(null, ne, g, m, a, b, v), (d.el = ne.el);
            }
            if ((U && ye(U, b), !Q && (F = j && j.onVnodeMounted))) {
              const ne = d;
              ye(() => je(F, Y, ne), b);
            }
            (d.shapeFlag & 256 ||
              (Y && Dt(Y.vnode) && Y.vnode.shapeFlag & 256)) &&
              a.a &&
              ye(a.a, b),
              (a.isMounted = !0),
              (d = g = m = null);
          }
        },
        C = (a.effect = new Nr(x, () => Kr(w), a.scope)),
        w = (a.update = () => C.run());
      (w.id = a.uid), nt(a, !0), w();
    },
    J = (a, d, g) => {
      d.component = a;
      const m = a.vnode.props;
      (a.vnode = d),
        (a.next = null),
        yc(a, d.props, m, g),
        vc(a, d.children, g),
        Ot(),
        ms(),
        At();
    },
    q = (a, d, g, m, b, v, R, x, C = !1) => {
      const w = a && a.children,
        F = a ? a.shapeFlag : 0,
        A = d.children,
        { patchFlag: j, shapeFlag: H } = d;
      if (j > 0) {
        if (j & 128) {
          qe(w, A, g, m, b, v, R, x, C);
          return;
        } else if (j & 256) {
          $e(w, A, g, m, b, v, R, x, C);
          return;
        }
      }
      H & 8
        ? (F & 16 && ce(w, b, v), A !== w && f(g, A))
        : F & 16
        ? H & 16
          ? qe(w, A, g, m, b, v, R, x, C)
          : ce(w, b, v, !0)
        : (F & 8 && f(g, ""), H & 16 && he(A, g, m, b, v, R, x, C));
    },
    $e = (a, d, g, m, b, v, R, x, C) => {
      (a = a || bt), (d = d || bt);
      const w = a.length,
        F = d.length,
        A = Math.min(w, F);
      let j;
      for (j = 0; j < A; j++) {
        const H = (d[j] = C ? Qe(d[j]) : Le(d[j]));
        E(a[j], H, g, null, b, v, R, x, C);
      }
      w > F ? ce(a, b, v, !0, !1, A) : he(d, g, m, b, v, R, x, C, A);
    },
    qe = (a, d, g, m, b, v, R, x, C) => {
      let w = 0;
      const F = d.length;
      let A = a.length - 1,
        j = F - 1;
      for (; w <= A && w <= j; ) {
        const H = a[w],
          U = (d[w] = C ? Qe(d[w]) : Le(d[w]));
        if (Ft(H, U)) E(H, U, g, null, b, v, R, x, C);
        else break;
        w++;
      }
      for (; w <= A && w <= j; ) {
        const H = a[A],
          U = (d[j] = C ? Qe(d[j]) : Le(d[j]));
        if (Ft(H, U)) E(H, U, g, null, b, v, R, x, C);
        else break;
        A--, j--;
      }
      if (w > A) {
        if (w <= j) {
          const H = j + 1,
            U = H < F ? d[H].el : m;
          for (; w <= j; )
            E(null, (d[w] = C ? Qe(d[w]) : Le(d[w])), g, U, b, v, R, x, C), w++;
        }
      } else if (w > j) for (; w <= A; ) me(a[w], b, v, !0), w++;
      else {
        const H = w,
          U = w,
          Y = new Map();
        for (w = U; w <= j; w++) {
          const ve = (d[w] = C ? Qe(d[w]) : Le(d[w]));
          ve.key != null && Y.set(ve.key, w);
        }
        let Q,
          ne = 0;
        const Ie = j - U + 1;
        let gt = !1,
          os = 0;
        const kt = new Array(Ie);
        for (w = 0; w < Ie; w++) kt[w] = 0;
        for (w = H; w <= A; w++) {
          const ve = a[w];
          if (ne >= Ie) {
            me(ve, b, v, !0);
            continue;
          }
          let Fe;
          if (ve.key != null) Fe = Y.get(ve.key);
          else
            for (Q = U; Q <= j; Q++)
              if (kt[Q - U] === 0 && Ft(ve, d[Q])) {
                Fe = Q;
                break;
              }
          Fe === void 0
            ? me(ve, b, v, !0)
            : ((kt[Fe - U] = w + 1),
              Fe >= os ? (os = Fe) : (gt = !0),
              E(ve, d[Fe], g, null, b, v, R, x, C),
              ne++);
        }
        const is = gt ? Cc(kt) : bt;
        for (Q = is.length - 1, w = Ie - 1; w >= 0; w--) {
          const ve = U + w,
            Fe = d[ve],
            ls = ve + 1 < F ? d[ve + 1].el : m;
          kt[w] === 0
            ? E(null, Fe, g, ls, b, v, R, x, C)
            : gt && (Q < 0 || w !== is[Q] ? ke(Fe, g, ls, 2) : Q--);
        }
      }
    },
    ke = (a, d, g, m, b = null) => {
      const { el: v, type: R, transition: x, children: C, shapeFlag: w } = a;
      if (w & 6) {
        ke(a.component.subTree, d, g, m);
        return;
      }
      if (w & 128) {
        a.suspense.move(d, g, m);
        return;
      }
      if (w & 64) {
        R.move(a, d, g, I);
        return;
      }
      if (R === we) {
        r(v, d, g);
        for (let A = 0; A < C.length; A++) ke(C[A], d, g, m);
        r(a.anchor, d, g);
        return;
      }
      if (R === Zn) {
        $(a, d, g);
        return;
      }
      if (m !== 2 && w & 1 && x)
        if (m === 0) x.beforeEnter(v), r(v, d, g), ye(() => x.enter(v), b);
        else {
          const { leave: A, delayLeave: j, afterLeave: H } = x,
            U = () => r(v, d, g),
            Y = () => {
              A(v, () => {
                U(), H && H();
              });
            };
          j ? j(v, U, Y) : Y();
        }
      else r(v, d, g);
    },
    me = (a, d, g, m = !1, b = !1) => {
      const {
        type: v,
        props: R,
        ref: x,
        children: C,
        dynamicChildren: w,
        shapeFlag: F,
        patchFlag: A,
        dirs: j,
      } = a;
      if ((x != null && _r(x, null, g, a, !0), F & 256)) {
        d.ctx.deactivate(a);
        return;
      }
      const H = F & 1 && j,
        U = !Dt(a);
      let Y;
      if ((U && (Y = R && R.onVnodeBeforeUnmount) && je(Y, d, a), F & 6))
        cn(a.component, g, m);
      else {
        if (F & 128) {
          a.suspense.unmount(g, m);
          return;
        }
        H && tt(a, null, d, "beforeUnmount"),
          F & 64
            ? a.type.remove(a, d, g, b, I, m)
            : w && (v !== we || (A > 0 && A & 64))
            ? ce(w, d, g, !1, !0)
            : ((v === we && A & 384) || (!b && F & 16)) && ce(C, d, g),
          m && ht(a);
      }
      ((U && (Y = R && R.onVnodeUnmounted)) || H) &&
        ye(() => {
          Y && je(Y, d, a), H && tt(a, null, d, "unmounted");
        }, g);
    },
    ht = (a) => {
      const { type: d, el: g, anchor: m, transition: b } = a;
      if (d === we) {
        pt(g, m);
        return;
      }
      if (d === Zn) {
        L(a);
        return;
      }
      const v = () => {
        s(g), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (a.shapeFlag & 1 && b && !b.persisted) {
        const { leave: R, delayLeave: x } = b,
          C = () => R(g, v);
        x ? x(a.el, v, C) : C();
      } else v();
    },
    pt = (a, d) => {
      let g;
      for (; a !== d; ) (g = p(a)), s(a), (a = g);
      s(d);
    },
    cn = (a, d, g) => {
      const { bum: m, scope: b, update: v, subTree: R, um: x } = a;
      m && _n(m),
        b.stop(),
        v && ((v.active = !1), me(R, a, d, g)),
        x && ye(x, d),
        ye(() => {
          a.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    ce = (a, d, g, m = !1, b = !1, v = 0) => {
      for (let R = v; R < a.length; R++) me(a[R], d, g, m, b);
    },
    y = (a) =>
      a.shapeFlag & 6
        ? y(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : p(a.anchor || a.el),
    T = (a, d, g) => {
      a == null
        ? d._vnode && me(d._vnode, null, null, !0)
        : E(d._vnode || null, a, d, null, null, null, g),
        ms(),
        Xo(),
        (d._vnode = a);
    },
    I = {
      p: E,
      um: me,
      m: ke,
      r: ht,
      mt: Mt,
      mc: he,
      pc: q,
      pbc: se,
      n: y,
      o: e,
    };
  let k, W;
  return t && ([k, W] = t(I)), { render: T, hydrate: k, createApp: gc(T, k) };
}
function nt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ec(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function gi(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (N(r) && N(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = Qe(s[o])), (l.el = i.el)),
        n || gi(i, l)),
        l.type === Un && (l.el = i.el);
    }
}
function Cc(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Ic = (e) => e.__isTeleport,
  we = Symbol.for("v-fgt"),
  Un = Symbol.for("v-txt"),
  Ge = Symbol.for("v-cmt"),
  Zn = Symbol.for("v-stc"),
  Kt = [];
let Re = null;
function ie(e = !1) {
  Kt.push((Re = e ? null : []));
}
function Sc() {
  Kt.pop(), (Re = Kt[Kt.length - 1] || null);
}
let Zt = 1;
function Rs(e) {
  Zt += e;
}
function mi(e) {
  return (
    (e.dynamicChildren = Zt > 0 ? Re || bt : null),
    Sc(),
    Zt > 0 && Re && Re.push(e),
    e
  );
}
function xe(e, t, n, r, s, o) {
  return mi(de(e, t, n, r, s, o, !0));
}
function Gt(e, t, n, r, s) {
  return mi(ee(e, t, n, r, s, !0));
}
function Tn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kn = "__vInternal",
  yi = ({ key: e }) => e ?? null,
  vn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? re(e) || ae(e) || D(e)
        ? { i: ge, r: e, k: t, f: !!n }
        : e
      : null
  );
function de(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === we ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && yi(t),
    ref: t && vn(t),
    scopeId: Bn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ge,
  };
  return (
    l
      ? (Vr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= re(n) ? 8 : 16),
    Zt > 0 &&
      !i &&
      Re &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Re.push(c),
    c
  );
}
const ee = Pc;
function Pc(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === ql) && (e = Ge), Tn(e))) {
    const l = It(e, t, !0);
    return (
      n && Vr(l, n),
      Zt > 0 &&
        !o &&
        Re &&
        (l.shapeFlag & 6 ? (Re[Re.indexOf(e)] = l) : Re.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if (($c(e) && (e = e.__vccOpts), t)) {
    t = Rc(t);
    let { class: l, style: c } = t;
    l && !re(l) && (t.class = sn(l)),
      Z(c) && (Do(c) && !N(c) && (c = le({}, c)), (t.style = jr(c)));
  }
  const i = re(e) ? 1 : Wl(e) ? 128 : Ic(e) ? 64 : Z(e) ? 4 : D(e) ? 2 : 0;
  return de(e, t, n, r, s, i, o, !0);
}
function Rc(e) {
  return e ? (Do(e) || Kn in e ? le({}, e) : e) : null;
}
function It(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? Oc(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && yi(l),
    ref:
      t && t.ref ? (n && s ? (N(s) ? s.concat(vn(t)) : [s, vn(t)]) : vn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== we ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && It(e.ssContent),
    ssFallback: e.ssFallback && It(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function St(e = " ", t = 0) {
  return ee(Un, null, e, t);
}
function Tc(e = "", t = !1) {
  return t ? (ie(), Gt(Ge, null, e)) : ee(Ge, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean"
    ? ee(Ge)
    : N(e)
    ? ee(we, null, e.slice())
    : typeof e == "object"
    ? Qe(e)
    : ee(Un, null, String(e));
}
function Qe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : It(e);
}
function Vr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (N(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Vr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Kn in t)
        ? (t._ctx = ge)
        : s === 3 &&
          ge &&
          (ge.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    D(t)
      ? ((t = { default: t, _ctx: ge }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [St(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Oc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = sn([t.class, r.class]));
      else if (s === "style") t.style = jr([t.style, r.style]);
      else if (kn(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(N(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function je(e, t, n, r = null) {
  Oe(e, t, 7, [n, r]);
}
const Ac = ui();
let Mc = 0;
function kc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Ac,
    o = {
      uid: Mc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ll(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ai(r, s),
      emitsOptions: Go(r, s),
      emit: null,
      emitted: null,
      propsDefaults: X,
      inheritAttrs: r.inheritAttrs,
      ctx: X,
      data: X,
      props: X,
      attrs: X,
      slots: X,
      refs: X,
      setupState: X,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Bl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let fe = null,
  Qr,
  mt,
  Ts = "__VUE_INSTANCE_SETTERS__";
(mt = cr()[Ts]) || (mt = cr()[Ts] = []),
  mt.push((e) => (fe = e)),
  (Qr = (e) => {
    mt.length > 1 ? mt.forEach((t) => t(e)) : mt[0](e);
  });
const Pt = (e) => {
    Qr(e), e.scope.on();
  },
  ct = () => {
    fe && fe.scope.off(), Qr(null);
  };
function _i(e) {
  return e.vnode.shapeFlag & 4;
}
let en = !1;
function Fc(e, t = !1) {
  en = t;
  const { props: n, children: r } = e.vnode,
    s = _i(e);
  mc(e, n, s, t), bc(e, r);
  const o = s ? jc(e, t) : void 0;
  return (en = !1), o;
}
function jc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Uo(new Proxy(e.ctx, cc)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Nc(e) : null);
    Pt(e), Ot();
    const o = Xe(r, e, 0, [e.props, s]);
    if ((At(), ct(), xo(o))) {
      if ((o.then(ct, ct), t))
        return o
          .then((i) => {
            Os(e, i, t);
          })
          .catch((i) => {
            $n(i, e, 0);
          });
      e.asyncDep = o;
    } else Os(e, o, t);
  } else bi(e, t);
}
function Os(e, t, n) {
  D(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Z(t) && (e.setupState = Vo(t)),
    bi(e, n);
}
let As;
function bi(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && As && !r.render) {
      const s = r.template || qr(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          u = le(le({ isCustomElement: o, delimiters: l }, i), c);
        r.render = As(s, u);
      }
    }
    e.render = r.render || Te;
  }
  {
    Pt(e), Ot();
    try {
      uc(e);
    } finally {
      At(), ct();
    }
  }
}
function Lc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return be(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Nc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Lc(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function zn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Vo(Uo(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ut) return Ut[n](e);
        },
        has(t, n) {
          return n in t || n in Ut;
        },
      }))
    );
}
function $c(e) {
  return D(e) && "__vccOpts" in e;
}
const Ee = (e, t) => Fl(e, t, en);
function On(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Z(t) && !N(t)
      ? Tn(t)
        ? ee(e, null, [t])
        : ee(e, t)
      : ee(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Tn(n) && (n = [n]),
      ee(e, t, n));
}
const Hc = Symbol.for("v-scx"),
  Bc = () => Ue(Hc),
  Dc = "3.3.8",
  Uc = "http://www.w3.org/2000/svg",
  st = typeof document < "u" ? document : null,
  Ms = st && st.createElement("template"),
  Kc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? st.createElementNS(Uc, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Ms.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Ms.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  zc = Symbol("_vtc");
function qc(e, t, n) {
  const r = e[zc];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
const Jr = Symbol("_vod"),
  Wc = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[Jr] = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : jt(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), jt(e, !0), r.enter(e))
            : r.leave(e, () => {
                jt(e, !1);
              })
          : jt(e, t));
    },
    beforeUnmount(e, { value: t }) {
      jt(e, t);
    },
  };
function jt(e, t) {
  e.style.display = t ? e[Jr] : "none";
}
function Vc(e, t, n) {
  const r = e.style,
    s = re(n);
  if (n && !s) {
    if (t && !re(t)) for (const o in t) n[o] == null && br(r, o, "");
    for (const o in n) br(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      Jr in e && (r.display = o);
  }
}
const ks = /\s*!important$/;
function br(e, t, n) {
  if (N(n)) n.forEach((r) => br(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Qc(e, t);
    ks.test(n)
      ? e.setProperty(at(r), n.replace(ks, ""), "important")
      : (e[r] = n);
  }
}
const Fs = ["Webkit", "Moz", "ms"],
  Gn = {};
function Qc(e, t) {
  const n = Gn[t];
  if (n) return n;
  let r = Et(t);
  if (r !== "filter" && r in e) return (Gn[t] = r);
  r = Io(r);
  for (let s = 0; s < Fs.length; s++) {
    const o = Fs[s] + r;
    if (o in e) return (Gn[t] = o);
  }
  return t;
}
const js = "http://www.w3.org/1999/xlink";
function Jc(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(js, t.slice(6, t.length))
      : e.setAttributeNS(js, t, n);
  else {
    const o = il(t);
    n == null || (o && !So(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Yc(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      f = n ?? "";
    u !== f && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = So(n))
      : n == null && u === "string"
      ? ((n = ""), (c = !0))
      : u === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function yt(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Xc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ls = Symbol("_vei");
function Zc(e, t, n, r, s = null) {
  const o = e[Ls] || (e[Ls] = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = Gc(t);
    if (r) {
      const u = (o[t] = nu(r, s));
      yt(e, l, u, c);
    } else i && (Xc(e, l, i, c), (o[t] = void 0));
  }
}
const Ns = /(?:Once|Passive|Capture)$/;
function Gc(e) {
  let t;
  if (Ns.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Ns)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : at(e.slice(2)), t];
}
let er = 0;
const eu = Promise.resolve(),
  tu = () => er || (eu.then(() => (er = 0)), (er = Date.now()));
function nu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Oe(ru(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = tu()), n;
}
function ru(e, t) {
  if (N(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const $s = /^on[a-z]/,
  su = (e, t, n, r, s = !1, o, i, l, c) => {
    t === "class"
      ? qc(e, r, s)
      : t === "style"
      ? Vc(e, n, r)
      : kn(t)
      ? Mr(t) || Zc(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : ou(e, t, r, s)
        )
      ? Yc(e, t, r, o, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Jc(e, t, r, s));
  };
function ou(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && $s.test(t) && D(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      ($s.test(t) && re(n))
    ? !1
    : t in e;
}
const Hs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return N(t) ? (n) => _n(t, n) : t;
};
function iu(e) {
  e.target.composing = !0;
}
function Bs(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const tr = Symbol("_assign"),
  lu = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e[tr] = Hs(s);
      const o = r || (s.props && s.props.type === "number");
      yt(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), o && (l = lr(l)), e[tr](l);
      }),
        n &&
          yt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (yt(e, "compositionstart", iu),
          yt(e, "compositionend", Bs),
          yt(e, "change", Bs));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      o
    ) {
      if (
        ((e[tr] = Hs(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === "number") && lr(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  cu = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  uu = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = at(n.key);
    if (t.some((s) => s === r || cu[s] === r)) return e(n);
  },
  fu = le({ patchProp: su }, Kc);
let Ds;
function au() {
  return Ds || (Ds = wc(fu));
}
const du = (...e) => {
  const t = au().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = hu(r);
      if (!s) return;
      const o = t._component;
      !D(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "");
      const i = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function hu(e) {
  return re(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const _t = typeof window < "u";
function pu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const V = Object.assign;
function nr(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Ae(s) ? s.map(e) : e(s);
  }
  return n;
}
const zt = () => {},
  Ae = Array.isArray,
  gu = /\/$/,
  mu = (e) => e.replace(gu, "");
function rr(e, t, n = "/") {
  let r,
    s = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = vu(r ?? t, n)),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: i }
  );
}
function yu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Us(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function _u(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    Rt(t.matched[r], n.matched[s]) &&
    vi(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Rt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function vi(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!bu(e[n], t[n])) return !1;
  return !0;
}
function bu(e, t) {
  return Ae(e) ? Ks(e, t) : Ae(t) ? Ks(t, e) : e === t;
}
function Ks(e, t) {
  return Ae(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function vu(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  );
}
var tn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(tn || (tn = {}));
var qt;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(qt || (qt = {}));
function wu(e) {
  if (!e)
    if (_t) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), mu(e);
}
const xu = /^[^#]+#/;
function Eu(e, t) {
  return e.replace(xu, "#") + t;
}
function Cu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const qn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Iu(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Cu(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function zs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const vr = new Map();
function Su(e, t) {
  vr.set(e, t);
}
function Pu(e) {
  const t = vr.get(e);
  return vr.delete(e), t;
}
let Ru = () => location.protocol + "//" + location.host;
function wi(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(l);
    return c[0] !== "/" && (c = "/" + c), Us(c, "");
  }
  return Us(n, e) + r + s;
}
function Tu(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const l = ({ state: p }) => {
    const _ = wi(e, location),
      S = n.value,
      E = t.value;
    let P = 0;
    if (p) {
      if (((n.value = _), (t.value = p), i && i === S)) {
        i = null;
        return;
      }
      P = E ? p.position - E.position : 0;
    } else r(_);
    s.forEach((M) => {
      M(n.value, S, {
        delta: P,
        type: tn.pop,
        direction: P ? (P > 0 ? qt.forward : qt.back) : qt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(p) {
    s.push(p);
    const _ = () => {
      const S = s.indexOf(p);
      S > -1 && s.splice(S, 1);
    };
    return o.push(_), _;
  }
  function f() {
    const { history: p } = window;
    p.state && p.replaceState(V({}, p.state, { scroll: qn() }), "");
  }
  function h() {
    for (const p of o) p();
    (o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", f);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", f, { passive: !0 }),
    { pauseListeners: c, listen: u, destroy: h }
  );
}
function qs(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? qn() : null,
  };
}
function Ou(e) {
  const { history: t, location: n } = window,
    r = { value: wi(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(c, u, f) {
    const h = e.indexOf("#"),
      p =
        h > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c
          : Ru() + e + c;
    try {
      t[f ? "replaceState" : "pushState"](u, "", p), (s.value = u);
    } catch (_) {
      console.error(_), n[f ? "replace" : "assign"](p);
    }
  }
  function i(c, u) {
    const f = V({}, t.state, qs(s.value.back, c, s.value.forward, !0), u, {
      position: s.value.position,
    });
    o(c, f, !0), (r.value = c);
  }
  function l(c, u) {
    const f = V({}, s.value, t.state, { forward: c, scroll: qn() });
    o(f.current, f, !0);
    const h = V({}, qs(r.value, c, null), { position: f.position + 1 }, u);
    o(c, h, !1), (r.value = c);
  }
  return { location: r, state: s, push: l, replace: i };
}
function Au(e) {
  e = wu(e);
  const t = Ou(e),
    n = Tu(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = V(
    { location: "", base: e, go: r, createHref: Eu.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Mu(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function xi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Ve = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Ei = Symbol("");
var Ws;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Ws || (Ws = {}));
function Tt(e, t) {
  return V(new Error(), { type: e, [Ei]: !0 }, t);
}
function He(e, t) {
  return e instanceof Error && Ei in e && (t == null || !!(e.type & t));
}
const Vs = "[^/]+?",
  ku = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Fu = /[.+*?^${}()[\]/\\]/g;
function ju(e, t) {
  const n = V({}, ku, t),
    r = [];
  let s = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const f = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let h = 0; h < u.length; h++) {
      const p = u[h];
      let _ = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (s += "/"), (s += p.value.replace(Fu, "\\$&")), (_ += 40);
      else if (p.type === 1) {
        const { value: S, repeatable: E, optional: P, regexp: M } = p;
        o.push({ name: S, repeatable: E, optional: P });
        const O = M || Vs;
        if (O !== Vs) {
          _ += 10;
          try {
            new RegExp(`(${O})`);
          } catch (L) {
            throw new Error(
              `Invalid custom RegExp for param "${S}" (${O}): ` + L.message
            );
          }
        }
        let $ = E ? `((?:${O})(?:/(?:${O}))*)` : `(${O})`;
        h || ($ = P && u.length < 2 ? `(?:/${$})` : "/" + $),
          P && ($ += "?"),
          (s += $),
          (_ += 20),
          P && (_ += -8),
          E && (_ += -20),
          O === ".*" && (_ += -50);
      }
      f.push(_);
    }
    r.push(f);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function l(u) {
    const f = u.match(i),
      h = {};
    if (!f) return null;
    for (let p = 1; p < f.length; p++) {
      const _ = f[p] || "",
        S = o[p - 1];
      h[S.name] = _ && S.repeatable ? _.split("/") : _;
    }
    return h;
  }
  function c(u) {
    let f = "",
      h = !1;
    for (const p of e) {
      (!h || !f.endsWith("/")) && (f += "/"), (h = !1);
      for (const _ of p)
        if (_.type === 0) f += _.value;
        else if (_.type === 1) {
          const { value: S, repeatable: E, optional: P } = _,
            M = S in u ? u[S] : "";
          if (Ae(M) && !E)
            throw new Error(
              `Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`
            );
          const O = Ae(M) ? M.join("/") : M;
          if (!O)
            if (P)
              p.length < 2 &&
                (f.endsWith("/") ? (f = f.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${S}"`);
          f += O;
        }
    }
    return f || "/";
  }
  return { re: i, score: r, keys: o, parse: l, stringify: c };
}
function Lu(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Nu(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = Lu(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Qs(r)) return 1;
    if (Qs(s)) return -1;
  }
  return s.length - r.length;
}
function Qs(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const $u = { type: 0, value: "" },
  Hu = /[a-zA-Z0-9_]/;
function Bu(e) {
  if (!e) return [[]];
  if (e === "/") return [[$u]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${u}": ${_}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let l = 0,
    c,
    u = "",
    f = "";
  function h() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: f,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function p() {
    u += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (u && h(), i()) : c === ":" ? (h(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = r);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Hu.test(c)
          ? p()
          : (h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? f[f.length - 1] == "\\"
            ? (f = f.slice(0, -1) + c)
            : (n = 3)
          : (f += c);
        break;
      case 3:
        h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (f = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), h(), i(), s;
}
function Du(e, t, n) {
  const r = ju(Bu(e.path), n),
    s = V(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Uu(e, t) {
  const n = [],
    r = new Map();
  t = Xs({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return r.get(f);
  }
  function o(f, h, p) {
    const _ = !p,
      S = Ku(f);
    S.aliasOf = p && p.record;
    const E = Xs(t, f),
      P = [S];
    if ("alias" in f) {
      const $ = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const L of $)
        P.push(
          V({}, S, {
            components: p ? p.record.components : S.components,
            path: L,
            aliasOf: p ? p.record : S,
          })
        );
    }
    let M, O;
    for (const $ of P) {
      const { path: L } = $;
      if (h && L[0] !== "/") {
        const te = h.record.path,
          B = te[te.length - 1] === "/" ? "" : "/";
        $.path = h.record.path + (L && B + L);
      }
      if (
        ((M = Du($, h, E)),
        p
          ? p.alias.push(M)
          : ((O = O || M),
            O !== M && O.alias.push(M),
            _ && f.name && !Ys(M) && i(f.name)),
        S.children)
      ) {
        const te = S.children;
        for (let B = 0; B < te.length; B++) o(te[B], M, p && p.children[B]);
      }
      (p = p || M),
        ((M.record.components && Object.keys(M.record.components).length) ||
          M.record.name ||
          M.record.redirect) &&
          c(M);
    }
    return O
      ? () => {
          i(O);
        }
      : zt;
  }
  function i(f) {
    if (xi(f)) {
      const h = r.get(f);
      h &&
        (r.delete(f),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(f);
      h > -1 &&
        (n.splice(h, 1),
        f.record.name && r.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    let h = 0;
    for (
      ;
      h < n.length &&
      Nu(f, n[h]) >= 0 &&
      (f.record.path !== n[h].record.path || !Ci(f, n[h]));

    )
      h++;
    n.splice(h, 0, f), f.record.name && !Ys(f) && r.set(f.record.name, f);
  }
  function u(f, h) {
    let p,
      _ = {},
      S,
      E;
    if ("name" in f && f.name) {
      if (((p = r.get(f.name)), !p)) throw Tt(1, { location: f });
      (E = p.record.name),
        (_ = V(
          Js(
            h.params,
            p.keys.filter((O) => !O.optional).map((O) => O.name)
          ),
          f.params &&
            Js(
              f.params,
              p.keys.map((O) => O.name)
            )
        )),
        (S = p.stringify(_));
    } else if ("path" in f)
      (S = f.path),
        (p = n.find((O) => O.re.test(S))),
        p && ((_ = p.parse(S)), (E = p.record.name));
    else {
      if (((p = h.name ? r.get(h.name) : n.find((O) => O.re.test(h.path))), !p))
        throw Tt(1, { location: f, currentLocation: h });
      (E = p.record.name),
        (_ = V({}, h.params, f.params)),
        (S = p.stringify(_));
    }
    const P = [];
    let M = p;
    for (; M; ) P.unshift(M.record), (M = M.parent);
    return { name: E, path: S, params: _, matched: P, meta: qu(P) };
  }
  return (
    e.forEach((f) => o(f)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: s,
    }
  );
}
function Js(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Ku(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: zu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function zu(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Ys(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function qu(e) {
  return e.reduce((t, n) => V(t, n.meta), {});
}
function Xs(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Ci(e, t) {
  return t.children.some((n) => n === e || Ci(e, n));
}
const Ii = /#/g,
  Wu = /&/g,
  Vu = /\//g,
  Qu = /=/g,
  Ju = /\?/g,
  Si = /\+/g,
  Yu = /%5B/g,
  Xu = /%5D/g,
  Pi = /%5E/g,
  Zu = /%60/g,
  Ri = /%7B/g,
  Gu = /%7C/g,
  Ti = /%7D/g,
  ef = /%20/g;
function Yr(e) {
  return encodeURI("" + e)
    .replace(Gu, "|")
    .replace(Yu, "[")
    .replace(Xu, "]");
}
function tf(e) {
  return Yr(e).replace(Ri, "{").replace(Ti, "}").replace(Pi, "^");
}
function wr(e) {
  return Yr(e)
    .replace(Si, "%2B")
    .replace(ef, "+")
    .replace(Ii, "%23")
    .replace(Wu, "%26")
    .replace(Zu, "`")
    .replace(Ri, "{")
    .replace(Ti, "}")
    .replace(Pi, "^");
}
function nf(e) {
  return wr(e).replace(Qu, "%3D");
}
function rf(e) {
  return Yr(e).replace(Ii, "%23").replace(Ju, "%3F");
}
function sf(e) {
  return e == null ? "" : rf(e).replace(Vu, "%2F");
}
function An(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function of(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(Si, " "),
      i = o.indexOf("="),
      l = An(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : An(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      Ae(u) || (u = t[l] = [u]), u.push(c);
    } else t[l] = c;
  }
  return t;
}
function Zs(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = nf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ae(r) ? r.map((o) => o && wr(o)) : [r && wr(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function lf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Ae(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const cf = Symbol(""),
  Gs = Symbol(""),
  Xr = Symbol(""),
  Oi = Symbol(""),
  xr = Symbol("");
function Lt() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Je(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, l) => {
      const c = (h) => {
          h === !1
            ? l(Tt(4, { from: n, to: t }))
            : h instanceof Error
            ? l(h)
            : Mu(h)
            ? l(Tt(2, { from: t, to: h }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof h == "function" &&
                o.push(h),
              i());
        },
        u = e.call(r && r.instances[s], t, n, c);
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(c)), f.catch((h) => l(h));
    });
}
function sr(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (uf(l)) {
          const u = (l.__vccOpts || l)[t];
          u && s.push(Je(u, n, r, o, i));
        } else {
          let c = l();
          s.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const f = pu(u) ? u.default : u;
              o.components[i] = f;
              const p = (f.__vccOpts || f)[t];
              return p && Je(p, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function uf(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function eo(e) {
  const t = Ue(Xr),
    n = Ue(Oi),
    r = Ee(() => t.resolve(_e(e.to))),
    s = Ee(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        f = c[u - 1],
        h = n.matched;
      if (!f || !h.length) return -1;
      const p = h.findIndex(Rt.bind(null, f));
      if (p > -1) return p;
      const _ = to(c[u - 2]);
      return u > 1 && to(f) === _ && h[h.length - 1].path !== _
        ? h.findIndex(Rt.bind(null, c[u - 2]))
        : p;
    }),
    o = Ee(() => s.value > -1 && df(n.params, r.value.params)),
    i = Ee(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        vi(n.params, r.value.params)
    );
  function l(c = {}) {
    return af(c)
      ? t[_e(e.replace) ? "replace" : "push"](_e(e.to)).catch(zt)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Ee(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
const ff = zr({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: eo,
    setup(e, { slots: t }) {
      const n = on(eo(e)),
        { options: r } = Ue(Xr),
        s = Ee(() => ({
          [no(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [no(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : On(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o
            );
      };
    },
  }),
  Er = ff;
function af(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function df(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!Ae(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function to(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const no = (e, t, n) => e ?? t ?? n,
  hf = zr({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ue(xr),
        s = Ee(() => e.route || r.value),
        o = Ue(Gs, 0),
        i = Ee(() => {
          let u = _e(o);
          const { matched: f } = s.value;
          let h;
          for (; (h = f[u]) && !h.components; ) u++;
          return u;
        }),
        l = Ee(() => s.value.matched[i.value]);
      bn(
        Gs,
        Ee(() => i.value + 1)
      ),
        bn(cf, l),
        bn(xr, s);
      const c = qo();
      return (
        Bt(
          () => [c.value, l.value, e.name],
          ([u, f, h], [p, _, S]) => {
            f &&
              ((f.instances[h] = u),
              _ &&
                _ !== f &&
                u &&
                u === p &&
                (f.leaveGuards.size || (f.leaveGuards = _.leaveGuards),
                f.updateGuards.size || (f.updateGuards = _.updateGuards))),
              u &&
                f &&
                (!_ || !Rt(f, _) || !p) &&
                (f.enterCallbacks[h] || []).forEach((E) => E(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = s.value,
            f = e.name,
            h = l.value,
            p = h && h.components[f];
          if (!p) return ro(n.default, { Component: p, route: u });
          const _ = h.props[f],
            S = _
              ? _ === !0
                ? u.params
                : typeof _ == "function"
                ? _(u)
                : _
              : null,
            P = On(
              p,
              V({}, S, t, {
                onVnodeUnmounted: (M) => {
                  M.component.isUnmounted && (h.instances[f] = null);
                },
                ref: c,
              })
            );
          return ro(n.default, { Component: P, route: u }) || P;
        }
      );
    },
  });
function ro(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Ai = hf;
function pf(e) {
  const t = Uu(e.routes, e),
    n = e.parseQuery || of,
    r = e.stringifyQuery || Zs,
    s = e.history,
    o = Lt(),
    i = Lt(),
    l = Lt(),
    c = Ol(Ve);
  let u = Ve;
  _t &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const f = nr.bind(null, (y) => "" + y),
    h = nr.bind(null, sf),
    p = nr.bind(null, An);
  function _(y, T) {
    let I, k;
    return (
      xi(y) ? ((I = t.getRecordMatcher(y)), (k = T)) : (k = y), t.addRoute(k, I)
    );
  }
  function S(y) {
    const T = t.getRecordMatcher(y);
    T && t.removeRoute(T);
  }
  function E() {
    return t.getRoutes().map((y) => y.record);
  }
  function P(y) {
    return !!t.getRecordMatcher(y);
  }
  function M(y, T) {
    if (((T = V({}, T || c.value)), typeof y == "string")) {
      const g = rr(n, y, T.path),
        m = t.resolve({ path: g.path }, T),
        b = s.createHref(g.fullPath);
      return V(g, m, {
        params: p(m.params),
        hash: An(g.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let I;
    if ("path" in y) I = V({}, y, { path: rr(n, y.path, T.path).path });
    else {
      const g = V({}, y.params);
      for (const m in g) g[m] == null && delete g[m];
      (I = V({}, y, { params: h(g) })), (T.params = h(T.params));
    }
    const k = t.resolve(I, T),
      W = y.hash || "";
    k.params = f(p(k.params));
    const a = yu(r, V({}, y, { hash: tf(W), path: k.path })),
      d = s.createHref(a);
    return V(
      { fullPath: a, hash: W, query: r === Zs ? lf(y.query) : y.query || {} },
      k,
      { redirectedFrom: void 0, href: d }
    );
  }
  function O(y) {
    return typeof y == "string" ? rr(n, y, c.value.path) : V({}, y);
  }
  function $(y, T) {
    if (u !== y) return Tt(8, { from: T, to: y });
  }
  function L(y) {
    return G(y);
  }
  function te(y) {
    return L(V(O(y), { replace: !0 }));
  }
  function B(y) {
    const T = y.matched[y.matched.length - 1];
    if (T && T.redirect) {
      const { redirect: I } = T;
      let k = typeof I == "function" ? I(y) : I;
      return (
        typeof k == "string" &&
          ((k = k.includes("?") || k.includes("#") ? (k = O(k)) : { path: k }),
          (k.params = {})),
        V(
          { query: y.query, hash: y.hash, params: "path" in k ? {} : y.params },
          k
        )
      );
    }
  }
  function G(y, T) {
    const I = (u = M(y)),
      k = c.value,
      W = y.state,
      a = y.force,
      d = y.replace === !0,
      g = B(I);
    if (g)
      return G(
        V(O(g), {
          state: typeof g == "object" ? V({}, W, g.state) : W,
          force: a,
          replace: d,
        }),
        T || I
      );
    const m = I;
    m.redirectedFrom = T;
    let b;
    return (
      !a && _u(r, k, I) && ((b = Tt(16, { to: m, from: k })), ke(k, k, !0, !1)),
      (b ? Promise.resolve(b) : se(m, k))
        .catch((v) => (He(v) ? (He(v, 2) ? v : qe(v)) : q(v, m, k)))
        .then((v) => {
          if (v) {
            if (He(v, 2))
              return G(
                V({ replace: d }, O(v.to), {
                  state: typeof v.to == "object" ? V({}, W, v.to.state) : W,
                  force: a,
                }),
                T || m
              );
          } else v = et(m, k, !0, d, W);
          return ze(m, k, v), v;
        })
    );
  }
  function he(y, T) {
    const I = $(y, T);
    return I ? Promise.reject(I) : Promise.resolve();
  }
  function Ce(y) {
    const T = pt.values().next().value;
    return T && typeof T.runWithContext == "function"
      ? T.runWithContext(y)
      : y();
  }
  function se(y, T) {
    let I;
    const [k, W, a] = gf(y, T);
    I = sr(k.reverse(), "beforeRouteLeave", y, T);
    for (const g of k)
      g.leaveGuards.forEach((m) => {
        I.push(Je(m, y, T));
      });
    const d = he.bind(null, y, T);
    return (
      I.push(d),
      ce(I)
        .then(() => {
          I = [];
          for (const g of o.list()) I.push(Je(g, y, T));
          return I.push(d), ce(I);
        })
        .then(() => {
          I = sr(W, "beforeRouteUpdate", y, T);
          for (const g of W)
            g.updateGuards.forEach((m) => {
              I.push(Je(m, y, T));
            });
          return I.push(d), ce(I);
        })
        .then(() => {
          I = [];
          for (const g of a)
            if (g.beforeEnter)
              if (Ae(g.beforeEnter))
                for (const m of g.beforeEnter) I.push(Je(m, y, T));
              else I.push(Je(g.beforeEnter, y, T));
          return I.push(d), ce(I);
        })
        .then(
          () => (
            y.matched.forEach((g) => (g.enterCallbacks = {})),
            (I = sr(a, "beforeRouteEnter", y, T)),
            I.push(d),
            ce(I)
          )
        )
        .then(() => {
          I = [];
          for (const g of i.list()) I.push(Je(g, y, T));
          return I.push(d), ce(I);
        })
        .catch((g) => (He(g, 8) ? g : Promise.reject(g)))
    );
  }
  function ze(y, T, I) {
    l.list().forEach((k) => Ce(() => k(y, T, I)));
  }
  function et(y, T, I, k, W) {
    const a = $(y, T);
    if (a) return a;
    const d = T === Ve,
      g = _t ? history.state : {};
    I &&
      (k || d
        ? s.replace(y.fullPath, V({ scroll: d && g && g.scroll }, W))
        : s.push(y.fullPath, W)),
      (c.value = y),
      ke(y, T, I, d),
      qe();
  }
  let Me;
  function Mt() {
    Me ||
      (Me = s.listen((y, T, I) => {
        if (!cn.listening) return;
        const k = M(y),
          W = B(k);
        if (W) {
          G(V(W, { replace: !0 }), k).catch(zt);
          return;
        }
        u = k;
        const a = c.value;
        _t && Su(zs(a.fullPath, I.delta), qn()),
          se(k, a)
            .catch((d) =>
              He(d, 12)
                ? d
                : He(d, 2)
                ? (G(d.to, k)
                    .then((g) => {
                      He(g, 20) &&
                        !I.delta &&
                        I.type === tn.pop &&
                        s.go(-1, !1);
                    })
                    .catch(zt),
                  Promise.reject())
                : (I.delta && s.go(-I.delta, !1), q(d, k, a))
            )
            .then((d) => {
              (d = d || et(k, a, !1)),
                d &&
                  (I.delta && !He(d, 8)
                    ? s.go(-I.delta, !1)
                    : I.type === tn.pop && He(d, 20) && s.go(-1, !1)),
                ze(k, a, d);
            })
            .catch(zt);
      }));
  }
  let dt = Lt(),
    oe = Lt(),
    J;
  function q(y, T, I) {
    qe(y);
    const k = oe.list();
    return (
      k.length ? k.forEach((W) => W(y, T, I)) : console.error(y),
      Promise.reject(y)
    );
  }
  function $e() {
    return J && c.value !== Ve
      ? Promise.resolve()
      : new Promise((y, T) => {
          dt.add([y, T]);
        });
  }
  function qe(y) {
    return (
      J ||
        ((J = !y),
        Mt(),
        dt.list().forEach(([T, I]) => (y ? I(y) : T())),
        dt.reset()),
      y
    );
  }
  function ke(y, T, I, k) {
    const { scrollBehavior: W } = e;
    if (!_t || !W) return Promise.resolve();
    const a =
      (!I && Pu(zs(y.fullPath, 0))) ||
      ((k || !I) && history.state && history.state.scroll) ||
      null;
    return Jo()
      .then(() => W(y, T, a))
      .then((d) => d && Iu(d))
      .catch((d) => q(d, y, T));
  }
  const me = (y) => s.go(y);
  let ht;
  const pt = new Set(),
    cn = {
      currentRoute: c,
      listening: !0,
      addRoute: _,
      removeRoute: S,
      hasRoute: P,
      getRoutes: E,
      resolve: M,
      options: e,
      push: L,
      replace: te,
      go: me,
      back: () => me(-1),
      forward: () => me(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: oe.add,
      isReady: $e,
      install(y) {
        const T = this;
        y.component("RouterLink", Er),
          y.component("RouterView", Ai),
          (y.config.globalProperties.$router = T),
          Object.defineProperty(y.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => _e(c),
          }),
          _t &&
            !ht &&
            c.value === Ve &&
            ((ht = !0), L(s.location).catch((W) => {}));
        const I = {};
        for (const W in Ve)
          Object.defineProperty(I, W, {
            get: () => c.value[W],
            enumerable: !0,
          });
        y.provide(Xr, T), y.provide(Oi, Ho(I)), y.provide(xr, c);
        const k = y.unmount;
        pt.add(y),
          (y.unmount = function () {
            pt.delete(y),
              pt.size < 1 &&
                ((u = Ve),
                Me && Me(),
                (Me = null),
                (c.value = Ve),
                (ht = !1),
                (J = !1)),
              k();
          });
      },
    };
  function ce(y) {
    return y.reduce((T, I) => T.then(() => Ce(I)), Promise.resolve());
  }
  return cn;
}
function gf(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => Rt(u, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => Rt(u, c)) || s.push(c));
  }
  return [n, r, s];
}
const mf = "Vue_Logo_Black-9190692d.png";
const ln = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  yf = (e) => (ei("data-v-e9d3f1b1"), (e = e()), ti(), e),
  _f = { class: "container" },
  bf = yf(() =>
    de(
      "div",
      { class: "branding" },
      [de("img", { src: mf, alt: "logo" }), de("h1", null, "Vue Todos")],
      -1
    )
  ),
  vf = { class: "nav-routes" },
  wf = {
    __name: "MainHeader",
    setup(e) {
      return (t, n) => (
        ie(),
        xe("header", null, [
          de("nav", _f, [
            bf,
            de("ul", vf, [
              ee(
                _e(Er),
                { to: "/" },
                { default: Xt(() => [St("待办")]), _: 1 }
              ),
              ee(
                _e(Er),
                { to: "/about" },
                { default: Xt(() => [St("关于")]), _: 1 }
              ),
            ]),
          ]),
        ])
      );
    },
  },
  xf = ln(wf, [["__scopeId", "data-v-e9d3f1b1"]]);
const Ef = {
    __name: "App",
    setup(e) {
      return (t, n) => (ie(), xe(we, null, [ee(xf), ee(_e(Ai))], 64));
    },
  },
  Cf = "modulepreload",
  If = function (e) {
    return "/" + e;
  },
  so = {},
  Sf = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = If(o)), o in so)) return;
        so[o] = !0;
        const i = o.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let f = s.length - 1; f >= 0; f--) {
            const h = s[f];
            if (h.href === o && (!i || h.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = i ? "stylesheet" : Cf),
          i || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = o),
          document.head.appendChild(u),
          i)
        )
          return new Promise((f, h) => {
            u.addEventListener("load", f),
              u.addEventListener("error", () =>
                h(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((o) => {
        const i = new Event("vite:preloadError", { cancelable: !0 });
        if (((i.payload = o), window.dispatchEvent(i), !i.defaultPrevented))
          throw o;
      });
  };
var it = 256,
  Mi = [],
  oo = 256,
  gn;
for (; it--; ) Mi[it] = (it + 256).toString(16).substring(1);
function Pf(e) {
  var t = 0,
    n = e || 11;
  if (!gn || it + n > oo * 2)
    for (gn = "", it = 0; t < oo; t++) gn += Mi[(Math.random() * 256) | 0];
  return gn.substring(it, it++ + n);
}
const Rf = {};
function Tf(e, t) {
  return (
    ie(),
    xe("button", null, [
      bs(e.$slots, "icon", {}, void 0, !0),
      bs(e.$slots, "default", {}, () => [St("Default")], !0),
    ])
  );
}
const Of = ln(Rf, [
  ["render", Tf],
  ["__scopeId", "data-v-dcee7ed0"],
]);
const Af = {
    __name: "TodoCreator",
    emits: ["create-todo"],
    setup(e, { emit: t }) {
      const n = on({ todo: "", invalid: null, errMsg: "" }),
        r = t,
        s = (o) => {
          if (((n.invalid = null), o.preventDefault(), n.todo !== "")) {
            r("create-todo", n.todo), (n.todo = "");
            return;
          }
          (n.invalid = !0), (n.errMsg = "Please enter a todo");
        };
      return (o, i) => (
        ie(),
        xe("form", null, [
          de(
            "div",
            { class: sn(["input-wrap", { "input-err": n.invalid }]) },
            [
              _s(
                de(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue": i[0] || (i[0] = (l) => (n.todo = l)),
                  },
                  null,
                  512
                ),
                [[lu, n.todo]]
              ),
              ee(
                Of,
                { onClick: s },
                { icon: Xt(() => []), default: Xt(() => [St(" 添加 ")]), _: 1 }
              ),
            ],
            2
          ),
          _s(de("p", { class: "err-msg" }, Po(n.errMsg), 513), [
            [Wc, n.invalid],
          ]),
        ])
      );
    },
  },
  Mf = ln(Af, [["__scopeId", "data-v-069a9464"]]),
  Wt = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  Wn = (e, t, n, r = "") => {
    const s = e.split(":");
    if (e.slice(0, 1) === "@") {
      if (s.length < 2 || s.length > 3) return null;
      r = s.shift().slice(1);
    }
    if (s.length > 3 || !s.length) return null;
    if (s.length > 1) {
      const l = s.pop(),
        c = s.pop(),
        u = { provider: s.length > 0 ? s[0] : r, prefix: c, name: l };
      return t && !wn(u) ? null : u;
    }
    const o = s[0],
      i = o.split("-");
    if (i.length > 1) {
      const l = { provider: r, prefix: i.shift(), name: i.join("-") };
      return t && !wn(l) ? null : l;
    }
    if (n && r === "") {
      const l = { provider: r, prefix: "", name: o };
      return t && !wn(l, n) ? null : l;
    }
    return null;
  },
  wn = (e, t) =>
    e
      ? !!(
          (e.provider === "" || e.provider.match(Wt)) &&
          ((t && e.prefix === "") || e.prefix.match(Wt)) &&
          e.name.match(Wt)
        )
      : !1,
  ki = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  Mn = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  Vn = Object.freeze({ ...ki, ...Mn }),
  Cr = Object.freeze({ ...Vn, body: "", hidden: !1 });
function kf(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0),
    !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return r && (n.rotate = r), n;
}
function io(e, t) {
  const n = kf(e, t);
  for (const r in Cr)
    r in Mn
      ? r in e && !(r in n) && (n[r] = Mn[r])
      : r in t
      ? (n[r] = t[r])
      : r in e && (n[r] = e[r]);
  return n;
}
function Ff(e, t) {
  const n = e.icons,
    r = e.aliases || Object.create(null),
    s = Object.create(null);
  function o(i) {
    if (n[i]) return (s[i] = []);
    if (!(i in s)) {
      s[i] = null;
      const l = r[i] && r[i].parent,
        c = l && o(l);
      c && (s[i] = [l].concat(c));
    }
    return s[i];
  }
  return (t || Object.keys(n).concat(Object.keys(r))).forEach(o), s;
}
function jf(e, t, n) {
  const r = e.icons,
    s = e.aliases || Object.create(null);
  let o = {};
  function i(l) {
    o = io(r[l] || s[l], o);
  }
  return i(t), n.forEach(i), io(e, o);
}
function Fi(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object") return n;
  e.not_found instanceof Array &&
    e.not_found.forEach((s) => {
      t(s, null), n.push(s);
    });
  const r = Ff(e);
  for (const s in r) {
    const o = r[s];
    o && (t(s, jf(e, s, o)), n.push(s));
  }
  return n;
}
const Lf = { provider: "", aliases: {}, not_found: {}, ...ki };
function or(e, t) {
  for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
  return !0;
}
function ji(e) {
  if (typeof e != "object" || e === null) return null;
  const t = e;
  if (
    typeof t.prefix != "string" ||
    !e.icons ||
    typeof e.icons != "object" ||
    !or(e, Lf)
  )
    return null;
  const n = t.icons;
  for (const s in n) {
    const o = n[s];
    if (!s.match(Wt) || typeof o.body != "string" || !or(o, Cr)) return null;
  }
  const r = t.aliases || Object.create(null);
  for (const s in r) {
    const o = r[s],
      i = o.parent;
    if (!s.match(Wt) || typeof i != "string" || (!n[i] && !r[i]) || !or(o, Cr))
      return null;
  }
  return t;
}
const lo = Object.create(null);
function Nf(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: Object.create(null),
    missing: new Set(),
  };
}
function ft(e, t) {
  const n = lo[e] || (lo[e] = Object.create(null));
  return n[t] || (n[t] = Nf(e, t));
}
function Zr(e, t) {
  return ji(t)
    ? Fi(t, (n, r) => {
        r ? (e.icons[n] = r) : e.missing.add(n);
      })
    : [];
}
function $f(e, t, n) {
  try {
    if (typeof n.body == "string") return (e.icons[t] = { ...n }), !0;
  } catch {}
  return !1;
}
let nn = !1;
function Li(e) {
  return typeof e == "boolean" && (nn = e), nn;
}
function Hf(e) {
  const t = typeof e == "string" ? Wn(e, !0, nn) : e;
  if (t) {
    const n = ft(t.provider, t.prefix),
      r = t.name;
    return n.icons[r] || (n.missing.has(r) ? null : void 0);
  }
}
function Bf(e, t) {
  const n = Wn(e, !0, nn);
  if (!n) return !1;
  const r = ft(n.provider, n.prefix);
  return $f(r, n.name, t);
}
function Df(e, t) {
  if (typeof e != "object") return !1;
  if ((typeof t != "string" && (t = e.provider || ""), nn && !t && !e.prefix)) {
    let s = !1;
    return (
      ji(e) &&
        ((e.prefix = ""),
        Fi(e, (o, i) => {
          i && Bf(o, i) && (s = !0);
        })),
      s
    );
  }
  const n = e.prefix;
  if (!wn({ provider: t, prefix: n, name: "a" })) return !1;
  const r = ft(t, n);
  return !!Zr(r, e);
}
const Ni = Object.freeze({ width: null, height: null }),
  $i = Object.freeze({ ...Ni, ...Mn }),
  Uf = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  Kf = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function co(e, t, n) {
  if (t === 1) return e;
  if (((n = n || 100), typeof e == "number")) return Math.ceil(e * t * n) / n;
  if (typeof e != "string") return e;
  const r = e.split(Uf);
  if (r === null || !r.length) return e;
  const s = [];
  let o = r.shift(),
    i = Kf.test(o);
  for (;;) {
    if (i) {
      const l = parseFloat(o);
      isNaN(l) ? s.push(o) : s.push(Math.ceil(l * t * n) / n);
    } else s.push(o);
    if (((o = r.shift()), o === void 0)) return s.join("");
    i = !i;
  }
}
const zf = (e) => e === "unset" || e === "undefined" || e === "none";
function qf(e, t) {
  const n = { ...Vn, ...e },
    r = { ...$i, ...t },
    s = { left: n.left, top: n.top, width: n.width, height: n.height };
  let o = n.body;
  [n, r].forEach((S) => {
    const E = [],
      P = S.hFlip,
      M = S.vFlip;
    let O = S.rotate;
    P
      ? M
        ? (O += 2)
        : (E.push(
            "translate(" +
              (s.width + s.left).toString() +
              " " +
              (0 - s.top).toString() +
              ")"
          ),
          E.push("scale(-1 1)"),
          (s.top = s.left = 0))
      : M &&
        (E.push(
          "translate(" +
            (0 - s.left).toString() +
            " " +
            (s.height + s.top).toString() +
            ")"
        ),
        E.push("scale(1 -1)"),
        (s.top = s.left = 0));
    let $;
    switch ((O < 0 && (O -= Math.floor(O / 4) * 4), (O = O % 4), O)) {
      case 1:
        ($ = s.height / 2 + s.top),
          E.unshift("rotate(90 " + $.toString() + " " + $.toString() + ")");
        break;
      case 2:
        E.unshift(
          "rotate(180 " +
            (s.width / 2 + s.left).toString() +
            " " +
            (s.height / 2 + s.top).toString() +
            ")"
        );
        break;
      case 3:
        ($ = s.width / 2 + s.left),
          E.unshift("rotate(-90 " + $.toString() + " " + $.toString() + ")");
        break;
    }
    O % 2 === 1 &&
      (s.left !== s.top && (($ = s.left), (s.left = s.top), (s.top = $)),
      s.width !== s.height &&
        (($ = s.width), (s.width = s.height), (s.height = $))),
      E.length && (o = '<g transform="' + E.join(" ") + '">' + o + "</g>");
  });
  const i = r.width,
    l = r.height,
    c = s.width,
    u = s.height;
  let f, h;
  i === null
    ? ((h = l === null ? "1em" : l === "auto" ? u : l), (f = co(h, c / u)))
    : ((f = i === "auto" ? c : i),
      (h = l === null ? co(f, u / c) : l === "auto" ? u : l));
  const p = {},
    _ = (S, E) => {
      zf(E) || (p[S] = E.toString());
    };
  return (
    _("width", f),
    _("height", h),
    (p.viewBox =
      s.left.toString() +
      " " +
      s.top.toString() +
      " " +
      c.toString() +
      " " +
      u.toString()),
    { attributes: p, body: o }
  );
}
const Wf = /\sid="(\S+)"/g,
  Vf =
    "IconifyId" +
    Date.now().toString(16) +
    ((Math.random() * 16777216) | 0).toString(16);
let Qf = 0;
function Jf(e, t = Vf) {
  const n = [];
  let r;
  for (; (r = Wf.exec(e)); ) n.push(r[1]);
  if (!n.length) return e;
  const s = "suffix" + ((Math.random() * 16777216) | Date.now()).toString(16);
  return (
    n.forEach((o) => {
      const i = typeof t == "function" ? t(o) : t + (Qf++).toString(),
        l = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      e = e.replace(
        new RegExp('([#;"])(' + l + ')([")]|\\.[a-z])', "g"),
        "$1" + i + s + "$3"
      );
    }),
    (e = e.replace(new RegExp(s, "g"), "")),
    e
  );
}
const Ir = Object.create(null);
function Yf(e, t) {
  Ir[e] = t;
}
function Sr(e) {
  return Ir[e] || Ir[""];
}
function Gr(e) {
  let t;
  if (typeof e.resources == "string") t = [e.resources];
  else if (((t = e.resources), !(t instanceof Array) || !t.length)) return null;
  return {
    resources: t,
    path: e.path || "/",
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1,
  };
}
const es = Object.create(null),
  Nt = ["https://api.simplesvg.com", "https://api.unisvg.com"],
  xn = [];
for (; Nt.length > 0; )
  Nt.length === 1 || Math.random() > 0.5
    ? xn.push(Nt.shift())
    : xn.push(Nt.pop());
es[""] = Gr({ resources: ["https://api.iconify.design"].concat(xn) });
function Xf(e, t) {
  const n = Gr(t);
  return n === null ? !1 : ((es[e] = n), !0);
}
function ts(e) {
  return es[e];
}
const Zf = () => {
  let e;
  try {
    if (((e = fetch), typeof e == "function")) return e;
  } catch {}
};
let uo = Zf();
function Gf(e, t) {
  const n = ts(e);
  if (!n) return 0;
  let r;
  if (!n.maxURL) r = 0;
  else {
    let s = 0;
    n.resources.forEach((i) => {
      s = Math.max(s, i.length);
    });
    const o = t + ".json?icons=";
    r = n.maxURL - s - n.path.length - o.length;
  }
  return r;
}
function ea(e) {
  return e === 404;
}
const ta = (e, t, n) => {
  const r = [],
    s = Gf(e, t),
    o = "icons";
  let i = { type: o, provider: e, prefix: t, icons: [] },
    l = 0;
  return (
    n.forEach((c, u) => {
      (l += c.length + 1),
        l >= s &&
          u > 0 &&
          (r.push(i),
          (i = { type: o, provider: e, prefix: t, icons: [] }),
          (l = c.length)),
        i.icons.push(c);
    }),
    r.push(i),
    r
  );
};
function na(e) {
  if (typeof e == "string") {
    const t = ts(e);
    if (t) return t.path;
  }
  return "/";
}
const ra = (e, t, n) => {
    if (!uo) {
      n("abort", 424);
      return;
    }
    let r = na(t.provider);
    switch (t.type) {
      case "icons": {
        const o = t.prefix,
          l = t.icons.join(","),
          c = new URLSearchParams({ icons: l });
        r += o + ".json?" + c.toString();
        break;
      }
      case "custom": {
        const o = t.uri;
        r += o.slice(0, 1) === "/" ? o.slice(1) : o;
        break;
      }
      default:
        n("abort", 400);
        return;
    }
    let s = 503;
    uo(e + r)
      .then((o) => {
        const i = o.status;
        if (i !== 200) {
          setTimeout(() => {
            n(ea(i) ? "abort" : "next", i);
          });
          return;
        }
        return (s = 501), o.json();
      })
      .then((o) => {
        if (typeof o != "object" || o === null) {
          setTimeout(() => {
            o === 404 ? n("abort", o) : n("next", s);
          });
          return;
        }
        setTimeout(() => {
          n("success", o);
        });
      })
      .catch(() => {
        n("next", s);
      });
  },
  sa = { prepare: ta, send: ra };
function oa(e) {
  const t = { loaded: [], missing: [], pending: [] },
    n = Object.create(null);
  e.sort((s, o) =>
    s.provider !== o.provider
      ? s.provider.localeCompare(o.provider)
      : s.prefix !== o.prefix
      ? s.prefix.localeCompare(o.prefix)
      : s.name.localeCompare(o.name)
  );
  let r = { provider: "", prefix: "", name: "" };
  return (
    e.forEach((s) => {
      if (
        r.name === s.name &&
        r.prefix === s.prefix &&
        r.provider === s.provider
      )
        return;
      r = s;
      const o = s.provider,
        i = s.prefix,
        l = s.name,
        c = n[o] || (n[o] = Object.create(null)),
        u = c[i] || (c[i] = ft(o, i));
      let f;
      l in u.icons
        ? (f = t.loaded)
        : i === "" || u.missing.has(l)
        ? (f = t.missing)
        : (f = t.pending);
      const h = { provider: o, prefix: i, name: l };
      f.push(h);
    }),
    t
  );
}
function Hi(e, t) {
  e.forEach((n) => {
    const r = n.loaderCallbacks;
    r && (n.loaderCallbacks = r.filter((s) => s.id !== t));
  });
}
function ia(e) {
  e.pendingCallbacksFlag ||
    ((e.pendingCallbacksFlag = !0),
    setTimeout(() => {
      e.pendingCallbacksFlag = !1;
      const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
      if (!t.length) return;
      let n = !1;
      const r = e.provider,
        s = e.prefix;
      t.forEach((o) => {
        const i = o.icons,
          l = i.pending.length;
        (i.pending = i.pending.filter((c) => {
          if (c.prefix !== s) return !0;
          const u = c.name;
          if (e.icons[u]) i.loaded.push({ provider: r, prefix: s, name: u });
          else if (e.missing.has(u))
            i.missing.push({ provider: r, prefix: s, name: u });
          else return (n = !0), !0;
          return !1;
        })),
          i.pending.length !== l &&
            (n || Hi([e], o.id),
            o.callback(
              i.loaded.slice(0),
              i.missing.slice(0),
              i.pending.slice(0),
              o.abort
            ));
      });
    }));
}
let la = 0;
function ca(e, t, n) {
  const r = la++,
    s = Hi.bind(null, n, r);
  if (!t.pending.length) return s;
  const o = { id: r, icons: t, callback: e, abort: s };
  return (
    n.forEach((i) => {
      (i.loaderCallbacks || (i.loaderCallbacks = [])).push(o);
    }),
    s
  );
}
function ua(e, t = !0, n = !1) {
  const r = [];
  return (
    e.forEach((s) => {
      const o = typeof s == "string" ? Wn(s, t, n) : s;
      o && r.push(o);
    }),
    r
  );
}
var fa = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1,
};
function aa(e, t, n, r) {
  const s = e.resources.length,
    o = e.random ? Math.floor(Math.random() * s) : e.index;
  let i;
  if (e.random) {
    let B = e.resources.slice(0);
    for (i = []; B.length > 1; ) {
      const G = Math.floor(Math.random() * B.length);
      i.push(B[G]), (B = B.slice(0, G).concat(B.slice(G + 1)));
    }
    i = i.concat(B);
  } else i = e.resources.slice(o).concat(e.resources.slice(0, o));
  const l = Date.now();
  let c = "pending",
    u = 0,
    f,
    h = null,
    p = [],
    _ = [];
  typeof r == "function" && _.push(r);
  function S() {
    h && (clearTimeout(h), (h = null));
  }
  function E() {
    c === "pending" && (c = "aborted"),
      S(),
      p.forEach((B) => {
        B.status === "pending" && (B.status = "aborted");
      }),
      (p = []);
  }
  function P(B, G) {
    G && (_ = []), typeof B == "function" && _.push(B);
  }
  function M() {
    return {
      startTime: l,
      payload: t,
      status: c,
      queriesSent: u,
      queriesPending: p.length,
      subscribe: P,
      abort: E,
    };
  }
  function O() {
    (c = "failed"),
      _.forEach((B) => {
        B(void 0, f);
      });
  }
  function $() {
    p.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }),
      (p = []);
  }
  function L(B, G, he) {
    const Ce = G !== "success";
    switch (((p = p.filter((se) => se !== B)), c)) {
      case "pending":
        break;
      case "failed":
        if (Ce || !e.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (G === "abort") {
      (f = he), O();
      return;
    }
    if (Ce) {
      (f = he), p.length || (i.length ? te() : O());
      return;
    }
    if ((S(), $(), !e.random)) {
      const se = e.resources.indexOf(B.resource);
      se !== -1 && se !== e.index && (e.index = se);
    }
    (c = "completed"),
      _.forEach((se) => {
        se(he);
      });
  }
  function te() {
    if (c !== "pending") return;
    S();
    const B = i.shift();
    if (B === void 0) {
      if (p.length) {
        h = setTimeout(() => {
          S(), c === "pending" && ($(), O());
        }, e.timeout);
        return;
      }
      O();
      return;
    }
    const G = {
      status: "pending",
      resource: B,
      callback: (he, Ce) => {
        L(G, he, Ce);
      },
    };
    p.push(G), u++, (h = setTimeout(te, e.rotate)), n(B, t, G.callback);
  }
  return setTimeout(te), M;
}
function Bi(e) {
  const t = { ...fa, ...e };
  let n = [];
  function r() {
    n = n.filter((l) => l().status === "pending");
  }
  function s(l, c, u) {
    const f = aa(t, l, c, (h, p) => {
      r(), u && u(h, p);
    });
    return n.push(f), f;
  }
  function o(l) {
    return n.find((c) => l(c)) || null;
  }
  return {
    query: s,
    find: o,
    setIndex: (l) => {
      t.index = l;
    },
    getIndex: () => t.index,
    cleanup: r,
  };
}
function fo() {}
const ir = Object.create(null);
function da(e) {
  if (!ir[e]) {
    const t = ts(e);
    if (!t) return;
    const n = Bi(t),
      r = { config: t, redundancy: n };
    ir[e] = r;
  }
  return ir[e];
}
function ha(e, t, n) {
  let r, s;
  if (typeof e == "string") {
    const o = Sr(e);
    if (!o) return n(void 0, 424), fo;
    s = o.send;
    const i = da(e);
    i && (r = i.redundancy);
  } else {
    const o = Gr(e);
    if (o) {
      r = Bi(o);
      const i = e.resources ? e.resources[0] : "",
        l = Sr(i);
      l && (s = l.send);
    }
  }
  return !r || !s ? (n(void 0, 424), fo) : r.query(t, s, n)().abort;
}
const ao = "iconify2",
  rn = "iconify",
  Di = rn + "-count",
  ho = rn + "-version",
  Ui = 36e5,
  pa = 168;
function Pr(e, t) {
  try {
    return e.getItem(t);
  } catch {}
}
function ns(e, t, n) {
  try {
    return e.setItem(t, n), !0;
  } catch {}
}
function po(e, t) {
  try {
    e.removeItem(t);
  } catch {}
}
function Rr(e, t) {
  return ns(e, Di, t.toString());
}
function Tr(e) {
  return parseInt(Pr(e, Di)) || 0;
}
const Qn = { local: !0, session: !0 },
  Ki = { local: new Set(), session: new Set() };
let rs = !1;
function ga(e) {
  rs = e;
}
let mn = typeof window > "u" ? {} : window;
function zi(e) {
  const t = e + "Storage";
  try {
    if (mn && mn[t] && typeof mn[t].length == "number") return mn[t];
  } catch {}
  Qn[e] = !1;
}
function qi(e, t) {
  const n = zi(e);
  if (!n) return;
  const r = Pr(n, ho);
  if (r !== ao) {
    if (r) {
      const l = Tr(n);
      for (let c = 0; c < l; c++) po(n, rn + c.toString());
    }
    ns(n, ho, ao), Rr(n, 0);
    return;
  }
  const s = Math.floor(Date.now() / Ui) - pa,
    o = (l) => {
      const c = rn + l.toString(),
        u = Pr(n, c);
      if (typeof u == "string") {
        try {
          const f = JSON.parse(u);
          if (
            typeof f == "object" &&
            typeof f.cached == "number" &&
            f.cached > s &&
            typeof f.provider == "string" &&
            typeof f.data == "object" &&
            typeof f.data.prefix == "string" &&
            t(f, l)
          )
            return !0;
        } catch {}
        po(n, c);
      }
    };
  let i = Tr(n);
  for (let l = i - 1; l >= 0; l--)
    o(l) || (l === i - 1 ? (i--, Rr(n, i)) : Ki[e].add(l));
}
function Wi() {
  if (!rs) {
    ga(!0);
    for (const e in Qn)
      qi(e, (t) => {
        const n = t.data,
          r = t.provider,
          s = n.prefix,
          o = ft(r, s);
        if (!Zr(o, n).length) return !1;
        const i = n.lastModified || -1;
        return (
          (o.lastModifiedCached = o.lastModifiedCached
            ? Math.min(o.lastModifiedCached, i)
            : i),
          !0
        );
      });
  }
}
function ma(e, t) {
  const n = e.lastModifiedCached;
  if (n && n >= t) return n === t;
  if (((e.lastModifiedCached = t), n))
    for (const r in Qn)
      qi(r, (s) => {
        const o = s.data;
        return (
          s.provider !== e.provider ||
          o.prefix !== e.prefix ||
          o.lastModified === t
        );
      });
  return !0;
}
function ya(e, t) {
  rs || Wi();
  function n(r) {
    let s;
    if (!Qn[r] || !(s = zi(r))) return;
    const o = Ki[r];
    let i;
    if (o.size) o.delete((i = Array.from(o).shift()));
    else if (((i = Tr(s)), !Rr(s, i + 1))) return;
    const l = {
      cached: Math.floor(Date.now() / Ui),
      provider: e.provider,
      data: t,
    };
    return ns(s, rn + i.toString(), JSON.stringify(l));
  }
  (t.lastModified && !ma(e, t.lastModified)) ||
    (Object.keys(t.icons).length &&
      (t.not_found && ((t = Object.assign({}, t)), delete t.not_found),
      n("local") || n("session")));
}
function go() {}
function _a(e) {
  e.iconsLoaderFlag ||
    ((e.iconsLoaderFlag = !0),
    setTimeout(() => {
      (e.iconsLoaderFlag = !1), ia(e);
    }));
}
function ba(e, t) {
  e.iconsToLoad
    ? (e.iconsToLoad = e.iconsToLoad.concat(t).sort())
    : (e.iconsToLoad = t),
    e.iconsQueueFlag ||
      ((e.iconsQueueFlag = !0),
      setTimeout(() => {
        e.iconsQueueFlag = !1;
        const { provider: n, prefix: r } = e,
          s = e.iconsToLoad;
        delete e.iconsToLoad;
        let o;
        if (!s || !(o = Sr(n))) return;
        o.prepare(n, r, s).forEach((l) => {
          ha(n, l, (c) => {
            if (typeof c != "object")
              l.icons.forEach((u) => {
                e.missing.add(u);
              });
            else
              try {
                const u = Zr(e, c);
                if (!u.length) return;
                const f = e.pendingIcons;
                f &&
                  u.forEach((h) => {
                    f.delete(h);
                  }),
                  ya(e, c);
              } catch (u) {
                console.error(u);
              }
            _a(e);
          });
        });
      }));
}
const va = (e, t) => {
  const n = ua(e, !0, Li()),
    r = oa(n);
  if (!r.pending.length) {
    let c = !0;
    return (
      t &&
        setTimeout(() => {
          c && t(r.loaded, r.missing, r.pending, go);
        }),
      () => {
        c = !1;
      }
    );
  }
  const s = Object.create(null),
    o = [];
  let i, l;
  return (
    r.pending.forEach((c) => {
      const { provider: u, prefix: f } = c;
      if (f === l && u === i) return;
      (i = u), (l = f), o.push(ft(u, f));
      const h = s[u] || (s[u] = Object.create(null));
      h[f] || (h[f] = []);
    }),
    r.pending.forEach((c) => {
      const { provider: u, prefix: f, name: h } = c,
        p = ft(u, f),
        _ = p.pendingIcons || (p.pendingIcons = new Set());
      _.has(h) || (_.add(h), s[u][f].push(h));
    }),
    o.forEach((c) => {
      const { provider: u, prefix: f } = c;
      s[u][f].length && ba(c, s[u][f]);
    }),
    t ? ca(t, r, o) : go
  );
};
function wa(e, t) {
  const n = { ...e };
  for (const r in t) {
    const s = t[r],
      o = typeof s;
    r in Ni
      ? (s === null || (s && (o === "string" || o === "number"))) && (n[r] = s)
      : o === typeof n[r] && (n[r] = r === "rotate" ? s % 4 : s);
  }
  return n;
}
const xa = /[\s,]+/;
function Ea(e, t) {
  t.split(xa).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function Ca(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function r(s) {
    for (; s < 0; ) s += 4;
    return s % 4;
  }
  if (n === "") {
    const s = parseInt(e);
    return isNaN(s) ? 0 : r(s);
  } else if (n !== e) {
    let s = 0;
    switch (n) {
      case "%":
        s = 25;
        break;
      case "deg":
        s = 90;
    }
    if (s) {
      let o = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(o) ? 0 : ((o = o / s), o % 1 === 0 ? r(o) : 0);
    }
  }
  return t;
}
function Ia(e, t) {
  let n =
    e.indexOf("xlink:") === -1
      ? ""
      : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t) n += " " + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function Sa(e) {
  return e
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\s+/g, " ");
}
function Pa(e) {
  return "data:image/svg+xml," + Sa(e);
}
function Ra(e) {
  return 'url("' + Pa(e) + '")';
}
const mo = { ...$i, inline: !1 },
  Ta = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "aria-hidden": !0,
    role: "img",
  },
  Oa = { display: "inline-block" },
  Or = { backgroundColor: "currentColor" },
  Vi = { backgroundColor: "transparent" },
  yo = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" },
  _o = { webkitMask: Or, mask: Or, background: Vi };
for (const e in _o) {
  const t = _o[e];
  for (const n in yo) t[e + n] = yo[n];
}
const En = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  (En[e + "-flip"] = t),
    (En[e.slice(0, 1) + "-flip"] = t),
    (En[e + "Flip"] = t);
});
function bo(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const vo = (e, t) => {
  const n = wa(mo, t),
    r = { ...Ta },
    s = t.mode || "svg",
    o = {},
    i = t.style,
    l = typeof i == "object" && !(i instanceof Array) ? i : {};
  for (let E in t) {
    const P = t[E];
    if (P !== void 0)
      switch (E) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          n[E] = P === !0 || P === "true" || P === 1;
          break;
        case "flip":
          typeof P == "string" && Ea(n, P);
          break;
        case "color":
          o.color = P;
          break;
        case "rotate":
          typeof P == "string"
            ? (n[E] = Ca(P))
            : typeof P == "number" && (n[E] = P);
          break;
        case "ariaHidden":
        case "aria-hidden":
          P !== !0 && P !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const M = En[E];
          M
            ? (P === !0 || P === "true" || P === 1) && (n[M] = !0)
            : mo[E] === void 0 && (r[E] = P);
        }
      }
  }
  const c = qf(e, n),
    u = c.attributes;
  if ((n.inline && (o.verticalAlign = "-0.125em"), s === "svg")) {
    (r.style = { ...o, ...l }), Object.assign(r, u);
    let E = 0,
      P = t.id;
    return (
      typeof P == "string" && (P = P.replace(/-/g, "_")),
      (r.innerHTML = Jf(c.body, P ? () => P + "ID" + E++ : "iconifyVue")),
      On("svg", r)
    );
  }
  const { body: f, width: h, height: p } = e,
    _ = s === "mask" || (s === "bg" ? !1 : f.indexOf("currentColor") !== -1),
    S = Ia(f, { ...u, width: h + "", height: p + "" });
  return (
    (r.style = {
      ...o,
      "--svg": Ra(S),
      width: bo(u.width),
      height: bo(u.height),
      ...Oa,
      ...(_ ? Or : Vi),
      ...l,
    }),
    On("span", r)
  );
};
Li(!0);
Yf("", sa);
if (typeof document < "u" && typeof window < "u") {
  Wi();
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload,
      n = "Invalid IconifyPreload syntax.";
    typeof t == "object" &&
      t !== null &&
      (t instanceof Array ? t : [t]).forEach((r) => {
        try {
          (typeof r != "object" ||
            r === null ||
            r instanceof Array ||
            typeof r.icons != "object" ||
            typeof r.prefix != "string" ||
            !Df(r)) &&
            console.error(n);
        } catch {
          console.error(n);
        }
      });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const r = "IconifyProviders[" + n + "] is invalid.";
        try {
          const s = t[n];
          if (typeof s != "object" || !s || s.resources === void 0) continue;
          Xf(n, s) || console.error(r);
        } catch {
          console.error(r);
        }
      }
  }
}
const Aa = { ...Vn, body: "" },
  Vt = zr({
    inheritAttrs: !1,
    data() {
      return { iconMounted: !1, counter: 0 };
    },
    mounted() {
      (this._name = ""), (this._loadingIcon = null), (this.iconMounted = !0);
    },
    unmounted() {
      this.abortLoading();
    },
    methods: {
      abortLoading() {
        this._loadingIcon &&
          (this._loadingIcon.abort(), (this._loadingIcon = null));
      },
      getIcon(e, t) {
        if (typeof e == "object" && e !== null && typeof e.body == "string")
          return (this._name = ""), this.abortLoading(), { data: e };
        let n;
        if (typeof e != "string" || (n = Wn(e, !1, !0)) === null)
          return this.abortLoading(), null;
        const r = Hf(n);
        if (!r)
          return (
            (!this._loadingIcon || this._loadingIcon.name !== e) &&
              (this.abortLoading(),
              (this._name = ""),
              r !== null &&
                (this._loadingIcon = {
                  name: e,
                  abort: va([n], () => {
                    this.counter++;
                  }),
                })),
            null
          );
        this.abortLoading(), this._name !== e && ((this._name = e), t && t(e));
        const s = ["iconify"];
        return (
          n.prefix !== "" && s.push("iconify--" + n.prefix),
          n.provider !== "" && s.push("iconify--" + n.provider),
          { data: r, classes: s }
        );
      },
    },
    render() {
      this.counter;
      const e = this.$attrs,
        t = this.iconMounted ? this.getIcon(e.icon, e.onLoad) : null;
      if (!t) return vo(Aa, e);
      let n = e;
      return (
        t.classes &&
          (n = {
            ...e,
            class:
              (typeof e.class == "string" ? e.class + " " : "") +
              t.classes.join(" "),
          }),
        vo({ ...Vn, ...t.data }, n)
      );
    },
  });
const Ma = ["checked"],
  ka = { class: "todo" },
  Fa = ["value"],
  ja = { class: "todo-actions" },
  La = {
    __name: "TodoItem",
    props: {
      todo: { type: Object, required: !0 },
      index: { type: Number, required: !0 },
    },
    emits: ["toggle-complete", "trigger-editing", "update-todo", "delete-todo"],
    setup(e) {
      return (t, n) => (
        ie(),
        xe("li", null, [
          de(
            "input",
            {
              type: "checkbox",
              checked: e.todo.isCompleted,
              onInput:
                n[0] || (n[0] = (r) => t.$emit("toggle-complete", e.index)),
            },
            null,
            40,
            Ma
          ),
          de("div", ka, [
            e.todo.isEditing
              ? (ie(),
                xe(
                  "input",
                  {
                    key: 0,
                    type: "text",
                    value: e.todo.todo,
                    onInput:
                      n[1] ||
                      (n[1] = (r) =>
                        t.$emit("update-todo", r.target.value, e.index)),
                    onKeyup:
                      n[2] ||
                      (n[2] = uu(
                        (r) => t.$emit("trigger-editing", e.index),
                        ["enter"]
                      )),
                  },
                  null,
                  40,
                  Fa
                ))
              : (ie(),
                xe(
                  "span",
                  { key: 1, class: sn({ "todo-delete": e.todo.isCompleted }) },
                  Po(e.todo.todo),
                  3
                )),
          ]),
          de("div", ja, [
            e.todo.isEditing
              ? (ie(),
                Gt(_e(Vt), {
                  key: 0,
                  class: "icon",
                  icon: "ph:check-circle",
                  color: "#41b080",
                  width: "22",
                  onClick:
                    n[3] || (n[3] = (r) => t.$emit("trigger-editing", e.index)),
                }))
              : (ie(),
                Gt(_e(Vt), {
                  key: 1,
                  class: "icon",
                  icon: "ph:pencil-fill",
                  color: "#41b080",
                  width: "22",
                  onClick:
                    n[4] || (n[4] = (r) => t.$emit("trigger-editing", e.index)),
                })),
            ee(_e(Vt), {
              class: "icon",
              icon: "ph:trash",
              color: "#f95e5e",
              width: "22",
              onClick: n[5] || (n[5] = (r) => t.$emit("delete-todo", e.index)),
            }),
          ]),
        ])
      );
    },
  },
  Na = ln(La, [["__scopeId", "data-v-22db8c3f"]]);
const ss = (e) => (ei("data-v-f3aeae61"), (e = e()), ti(), e),
  $a = ss(() => de("h1", null, "待办清单", -1)),
  Ha = { key: 0, class: "todo-list" },
  Ba = { key: 1, class: "todos-msg" },
  Da = ss(() => de("span", null, "暂无代办！👆添加一个", -1)),
  Ua = { key: 2, class: "todos-msg" },
  Ka = ss(() => de("span", null, "恭喜完成所有待办", -1)),
  za = {
    __name: "TodoView",
    setup(e) {
      const t = () =>
          localStorage.getItem("todoList")
            ? JSON.parse(localStorage.getItem("todoList"))
            : [],
        n = () => {
          localStorage.setItem("todoList", JSON.stringify(r.value));
        },
        r = qo(t()),
        s = Ee(() => r.value.every((f) => f.isCompleted));
      Bt(
        r,
        () => {
          n();
        },
        { deep: !0 }
      );
      const o = (f) => {
          r.value.push({
            id: Pf(),
            todo: f,
            isCompleted: null,
            isEditing: null,
          });
        },
        i = (f) => {
          r.value[f].isCompleted = !r.value[f].isCompleted;
        },
        l = (f) => {
          r.value[f].isEditing = !r.value[f].isEditing;
        },
        c = (f, h) => {
          r.value[h].todo = f;
        },
        u = (f) => {
          r.value.splice(f, 1);
        };
      return (f, h) => (
        ie(),
        xe("main", null, [
          $a,
          ee(Mf, { onCreateTodo: o }),
          r.value.length > 0
            ? (ie(),
              xe("ul", Ha, [
                (ie(!0),
                xe(
                  we,
                  null,
                  lc(
                    r.value,
                    (p, _) => (
                      ie(),
                      Gt(
                        Na,
                        {
                          key: p.id,
                          todo: p,
                          index: _,
                          onToggleComplete: i,
                          onTriggerEditing: l,
                          onUpdateTodo: c,
                          onDeleteTodo: u,
                        },
                        null,
                        8,
                        ["todo", "index"]
                      )
                    )
                  ),
                  128
                )),
              ]))
            : (ie(),
              xe("p", Ba, [
                ee(_e(Vt), {
                  icon: "emojione:sad-but-relieved-face",
                  width: "32",
                }),
                Da,
              ])),
          s.value && r.value.length > 0
            ? (ie(),
              xe("p", Ua, [
                ee(_e(Vt), { icon: "emojione:party-popper", width: "32" }),
                St(),
                Ka,
              ]))
            : Tc("", !0),
        ])
      );
    },
  },
  qa = ln(za, [["__scopeId", "data-v-f3aeae61"]]),
  Wa = pf({
    history: Au("/"),
    routes: [
      { path: "/", name: "todo", component: qa },
      {
        path: "/about",
        name: "about",
        component: () =>
          Sf(
            () => import("./AboutView-1b5fdd22.js"),
            ["AboutView-1b5fdd22.js", "AboutView-2d0b72df.css"]
          ),
      },
    ],
  }),
  Qi = du(Ef);
Qi.use(Wa);
Qi.mount("#app");
export { ln as _, de as a, St as b, xe as c, ie as o };
