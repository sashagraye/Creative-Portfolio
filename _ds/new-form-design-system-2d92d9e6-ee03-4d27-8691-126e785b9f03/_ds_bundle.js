/* @ds-bundle: {"format":4,"namespace":"NewFormDesignSystem_2d92d9","components":[{"name":"Hero","sourcePath":"components/hero/Hero.jsx"}],"sourceHashes":{"components/hero/Hero.jsx":"8da62b1d8711"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NewFormDesignSystem_2d92d9 = window.NewFormDesignSystem_2d92d9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/hero/Hero.jsx
try { (() => {
/* 모든 값은 tokens.css의 var()만 참조한다. hex·px 직접 사용 금지. */

const TILE_BASE = {
  display: 'inline-block',
  verticalAlign: 'middle',
  borderRadius: 'var(--radius-images)',
  margin: '0 var(--spacing-20)',
  objectFit: 'cover',
  boxSizing: 'border-box'
};
function tileSize(size) {
  return size === 'sm' ? {
    width: 'var(--hero-tile-w-sm)',
    height: 'var(--hero-tile-h-sm)'
  } : {
    width: 'var(--hero-tile-w)',
    height: 'var(--hero-tile-h)'
  };
}
function HeroTile({
  tile
}) {
  const style = {
    ...TILE_BASE,
    ...tileSize(tile.size),
    transform: tile.offset ? 'translateY(' + tile.offset + ')' : undefined
  };
  if (tile.src) return /*#__PURE__*/React.createElement("img", {
    src: tile.src,
    alt: tile.alt || '',
    style: {
      ...style,
      filter: 'var(--filter-duotone)'
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...style,
      display: 'inline-flex',
      alignItems: 'flex-end',
      padding: 'var(--spacing-10)',
      background: 'var(--color-muted-sage)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "micro-label",
    style: {
      color: 'var(--color-slate-verdant)'
    }
  }, tile.alt || 'image'));
}
function Wordmark({
  text,
  accentLength
}) {
  const head = text.slice(0, accentLength);
  const tail = text.slice(accentLength);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display-latin)',
      fontSize: 'var(--text-ko-sub)',
      lineHeight: 1,
      letterSpacing: 'var(--tracking-subheading)',
      color: 'var(--color-press-black)',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      borderBottom: 'var(--border-wordmark-rule) solid var(--color-accent)'
    }
  }, head), tail);
}
function ActionButton({
  label,
  href
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "micro-label",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-block',
      background: 'var(--color-accent)',
      color: 'var(--color-typesetter-ink)',
      padding: 'var(--spacing-20) var(--spacing-30)',
      borderRadius: 'var(--radius-buttons)',
      boxShadow: hover && !press ? 'var(--shadow-lg-2)' : 'var(--shadow-lg)',
      textDecoration: 'none',
      transform: press ? 'translateY(0)' : hover ? 'translateY(calc(-1 * var(--spacing-4)))' : 'translateY(0)',
      transition: 'transform var(--duration-fast) var(--ease-out-editorial), box-shadow var(--duration-fast) var(--ease-out-editorial)'
    }
  }, label);
}
function Hero({
  wordmark = 'New Form',
  wordmarkAccentLength = 3,
  menu = ['work', 'about', 'contact'],
  lines = ['생각을 정리해', '화면으로 옮기는', '일을 합니다'],
  tiles = [{
    line: 0,
    place: 'after',
    size: 'lg',
    alt: 'studio',
    offset: 'calc(-1 * var(--spacing-20))'
  }, {
    line: 1,
    place: 'before',
    size: 'sm',
    alt: 'detail',
    offset: 'var(--spacing-15)'
  }, {
    line: 2,
    place: 'after',
    size: 'sm',
    alt: 'press',
    offset: 'calc(-1 * var(--spacing-15))'
  }],
  eyebrow = 'portfolio — selected work',
  actionLabel = '작업 보기',
  actionHref = '#work'
}) {
  const shell = {
    maxWidth: 'var(--page-max-width)',
    margin: '0 auto',
    padding: '0 var(--gutter)',
    boxSizing: 'border-box'
  };
  const at = (i, place) => tiles.filter(t => t.line === i && (t.place || 'after') === place);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-canvas)',
      color: 'var(--color-press-black)',
      paddingBottom: 'var(--hero-pad-bottom)'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      ...shell,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--element-gap)',
      paddingTop: 'var(--nav-pad-y)',
      paddingBottom: 'var(--nav-pad-y)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    text: wordmark,
    accentLength: wordmarkAccentLength
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-30)'
    }
  }, menu.map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: '#' + item,
    className: "micro-label",
    style: {
      color: 'var(--color-press-black)',
      textDecoration: 'none'
    }
  }, item)))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      paddingTop: 'var(--hero-pad-top)'
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    className: "micro-label",
    style: {
      color: 'var(--color-newsprint-gray)',
      marginBottom: 'var(--spacing-40)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h1", {
    className: "hero-ko",
    style: {
      margin: 0,
      color: 'var(--color-press-black)'
    }
  }, lines.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'block'
    }
  }, at(i, 'before').map((t, k) => /*#__PURE__*/React.createElement(HeroTile, {
    key: 'b' + k,
    tile: t
  })), /*#__PURE__*/React.createElement("span", null, line), at(i, 'after').map((t, k) => /*#__PURE__*/React.createElement(HeroTile, {
    key: 'a' + k,
    tile: t
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--spacing-60)'
    }
  }, /*#__PURE__*/React.createElement(ActionButton, {
    label: actionLabel,
    href: actionHref
  }))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hero/Hero.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Hero = __ds_scope.Hero;

})();
