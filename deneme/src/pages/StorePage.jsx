import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import './StorePage.css';

const PRODUCTS = [
  {
    id: 'jersey-black',
    category: 'forma',
    badge: null,
    soldOut: false,
    title: { tr: '2026 FTNCC Pro Forma — Siyah Edisyon', en: '2026 FTNCC Pro Jersey — Black Edition' },
    price: 849,
    hasSizes: true,
    svgType: 'jersey-black',
  },
  {
    id: 'jersey-white',
    category: 'forma',
    badge: { tr: 'YENİ', en: 'NEW' },
    soldOut: false,
    title: { tr: '2026 FTNCC Pro Forma — Beyaz Edisyon', en: '2026 FTNCC Pro Jersey — White Edition' },
    price: 849,
    hasSizes: true,
    svgType: 'jersey-white',
  },
  {
    id: 'tracksuit',
    category: 'giyim',
    badge: null,
    soldOut: false,
    title: { tr: '2026 FTNCC Alpha Eşofman Üstü', en: '2026 FTNCC Alpha Tracksuit Top' },
    price: 1299,
    hasSizes: true,
    svgType: 'tracksuit',
  },
  {
    id: 'cap',
    category: 'giyim',
    badge: { tr: 'SINIRLI', en: 'LIMITED' },
    soldOut: false,
    title: { tr: 'FTNCC Champion Espor Şapka', en: 'FTNCC Champion Esports Cap' },
    price: 349,
    hasSizes: false,
    svgType: 'cap',
  },
  {
    id: 'mouse',
    category: 'ekipman',
    badge: null,
    soldOut: false,
    title: { tr: 'FTNCC Reflex Pro Oyuncu Faresi', en: 'FTNCC Reflex Pro Gaming Mouse' },
    price: 1499,
    hasSizes: false,
    svgType: 'mouse',
  },
  {
    id: 'headset',
    category: 'ekipman',
    badge: null,
    soldOut: true,
    title: { tr: 'FTNCC Pulse 7.1 Oyuncu Kulaklığı', en: 'FTNCC Pulse 7.1 Gaming Headset' },
    price: 1999,
    hasSizes: false,
    svgType: 'headset',
  },
];

function ProductSvg({ type }) {
  const isWhite = type === 'jersey-white';
  const isBlack = type === 'jersey-black';

  if (isBlack || isWhite) {
    const bg = isBlack ? '#111' : '#f0f0f0';
    const stroke = isBlack ? '#fff' : '#111';
    const accent = isBlack ? '#FFFF00' : '#000';
    return (
      <svg viewBox="0 0 160 180" className="product-svg">
        {/* Jersey body */}
        <path d="M40,30 L55,15 L80,24 L105,15 L120,30 L112,55 L100,50 L100,155 L60,155 L60,50 L48,55 Z"
          fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Collar */}
        <path d="M63,17 L80,32 L97,17" fill="none" stroke={accent} strokeWidth="3" />
        {/* Sleeve stripes */}
        <line x1="42" y1="33" x2="50" y2="50" stroke={accent} strokeWidth="2.5" />
        <line x1="118" y1="33" x2="110" y2="50" stroke={accent} strokeWidth="2.5" />
        {/* FTNC text */}
        <text x="80" y="88" fill={stroke} fontSize="16" fontWeight="900" textAnchor="middle"
          fontFamily="'Outfit', sans-serif">FTNC</text>
        <text x="80" y="102" fill={accent} fontSize="7" fontWeight="700" textAnchor="middle"
          letterSpacing="3" fontFamily="'Outfit', sans-serif">ESPORTS</text>
        {/* Geometric bottom details */}
        <path d="M60,125 L80,118 L100,125" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6" />
        <path d="M60,135 L80,128 L100,135" fill="none" stroke={stroke} strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }

  if (type === 'tracksuit') {
    return (
      <svg viewBox="0 0 160 180" className="product-svg">
        <path d="M35,38 L55,18 L80,27 L105,18 L125,38 L115,62 L100,56 L100,155 L60,155 L60,56 L45,62 Z"
          fill="#1a1a1a" stroke="#333" strokeWidth="2.5" />
        <line x1="80" y1="27" x2="80" y2="155" stroke="#FFFF00" strokeWidth="2.5" />
        <circle cx="80" cy="32" r="4" fill="#fff" />
        <path d="M65,20 L80,33 L95,20" fill="none" stroke="#FFFF00" strokeWidth="2.5" />
        <path d="M37,55" fill="none" />
        <line x1="38" y1="40" x2="46" y2="56" stroke="#555" strokeWidth="2" />
        <line x1="122" y1="40" x2="114" y2="56" stroke="#555" strokeWidth="2" />
        <path d="M62,95 L75,92 L80,95 L85,92 L98,95" fill="none" stroke="#FFFF00" strokeWidth="1.5" opacity="0.7" />
      </svg>
    );
  }

  if (type === 'cap') {
    return (
      <svg viewBox="0 0 160 140" className="product-svg">
        <path d="M30,90 C30,45 130,45 130,90 Z" fill="#111" stroke="#222" strokeWidth="2.5" />
        <path d="M12,86 Q80,108 148,86 L130,90 Q80,104 30,90 Z" fill="#FFFF00" />
        <path d="M70,55 L90,55 L87,65 L73,65 Z" fill="#fff" />
        <text x="80" y="63" fill="#000" fontSize="7" fontWeight="900" textAnchor="middle"
          fontFamily="'Outfit', sans-serif">FTNC</text>
        <line x1="80" y1="47" x2="80" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="80" y1="47 " x2="42" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="80" y1="47" x2="118" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="80" cy="47" r="5" fill="#FFFF00" />
      </svg>
    );
  }

  if (type === 'mouse') {
    return (
      <svg viewBox="0 0 120 160" className="product-svg">
        <path d="M30,38 C30,10 90,10 90,38 L93,88 C93,125 27,125 27,88 Z"
          fill="#0d0d0d" stroke="#222" strokeWidth="2.5" />
        <rect x="56" y="16" width="8" height="20" rx="4" fill="#FFFF00" />
        <path d="M27,62 Q36,90 27,108" fill="none" stroke="#FFFF00" strokeWidth="2" />
        <path d="M93,62 Q84,90 93,108" fill="none" stroke="#FFFF00" strokeWidth="2" />
        <line x1="60" y1="12" x2="60" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M52,88 L68,88 L65,97 L55,97 Z" fill="#00e5ff" opacity="0.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 140" className="product-svg">
      <path d="M35,70 C35,25 125,25 125,70" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      <path d="M40,63 C40,32 120,32 120,63" fill="none" stroke="#FFFF00" strokeWidth="2" />
      <rect x="20,0" y="63" width="18" height="32" rx="9" fill="#111" stroke="#222" strokeWidth="2" />
      <rect x="20" y="63" width="18" height="32" rx="9" fill="#111" stroke="#222" strokeWidth="2" />
      <rect x="24" y="68" width="10" height="22" rx="5" fill="#FFFF00" />
      <rect x="122" y="63" width="18" height="32" rx="9" fill="#111" stroke="#222" strokeWidth="2" />
      <rect x="126" y="68" width="10" height="22" rx="5" fill="#FFFF00" />
      <path d="M25,90 Q32,112 55,112" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="56" cy="112" r="5" fill="#FFFF00" />
    </svg>
  );
}

export default function StorePage({ lang }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [addedFlash, setAddedFlash] = useState(null);

  const T = {
    tr: {
      breadcrumb: 'Anasayfa / Mağaza',
      sortLabel: 'Göre sırala:',
      sortOptions: [
        { value: 'default', label: 'Hepsini Gör' },
        { value: 'price-asc', label: 'Fiyat: Artan' },
        { value: 'price-desc', label: 'Fiyat: Azalan' },
      ],
      all: 'Tümü',
      forma: 'Forma',
      giyim: 'Giyim',
      ekipman: 'Ekipman',
      addToCart: 'Sepete Ekle',
      soldOut: 'HEPSİ SATILDI',
      sizeLabel: 'Beden:',
      cartTitle: 'Sepetim',
      emptyCart: 'Sepetiniz boş.',
      subtotal: 'Ara Toplam',
      checkout: 'Ödemeye Geç',
      successTitle: 'SİPARİŞ ALINDI!',
      successDesc: 'Siparişiniz başarıyla alındı. Teşekkürler!',
      orderLabel: 'Sipariş No:',
      continueShopping: 'Alışverişe Devam Et',
    },
    en: {
      breadcrumb: 'Home / Store',
      sortLabel: 'Sort by:',
      sortOptions: [
        { value: 'default', label: 'View All' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
      ],
      all: 'All',
      forma: 'Jerseys',
      giyim: 'Apparel',
      ekipman: 'Gear',
      addToCart: 'Add to Cart',
      soldOut: 'SOLD OUT',
      sizeLabel: 'Size:',
      cartTitle: 'My Cart',
      emptyCart: 'Your cart is empty.',
      subtotal: 'Subtotal',
      checkout: 'Proceed to Checkout',
      successTitle: 'ORDER PLACED!',
      successDesc: 'Your order has been received. Thank you!',
      orderLabel: 'Order No:',
      continueShopping: 'Continue Shopping',
    },
  }[lang];

  const categories = [
    { key: 'all', label: T.all },
    { key: 'forma', label: T.forma },
    { key: 'giyim', label: T.giyim },
    { key: 'ekipman', label: T.ekipman },
  ];

  let filtered = PRODUCTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);
  const cartTotal = cart.reduce((n, i) => n + i.price * i.quantity, 0);

  const addToCart = (product) => {
    if (product.soldOut) return;
    const size = product.hasSizes ? (selectedSizes[product.id] || 'M') : null;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setAddedFlash(product.id);
    setTimeout(() => setAddedFlash(null), 1200);
    setIsCartOpen(true);
  };

  const updateQty = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const handleCheckout = () => {
    setOrderNumber('FTNC-' + Math.floor(100000 + Math.random() * 900000));
    setCart([]);
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  return (
    <div className="store-page">
      {/* Top bar: Breadcrumb + Sort */}
      <div className="store-topbar">
        <span className="store-breadcrumb">{T.breadcrumb}</span>
        <div className="store-sort-row">
          <span className="store-sort-label">{T.sortLabel}</span>
          <div className="store-sort-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="store-sort-select"
            >
              {T.sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="sort-chevron" />
          </div>
          {/* Cart button */}
          <button className="store-cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="store-cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="store-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-tab${activeCategory === cat.key ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div layout className="store-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="product-card"
            >
              {/* Product Image Area */}
              <div className="product-image-wrap">
                <ProductSvg type={product.svgType} />

                {/* Sold-out overlay */}
                {product.soldOut && (
                  <div className="sold-out-overlay">
                    <span className="sold-out-badge">{T.soldOut}</span>
                  </div>
                )}

                {/* New/Limited badge */}
                {product.badge && !product.soldOut && (
                  <span className="product-promo-badge">{product.badge[lang]}</span>
                )}

                {/* Add to cart hover CTA */}
                {!product.soldOut && (
                  <div className="product-hover-cta">
                    {product.hasSizes && (
                      <div className="hover-sizes">
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            className={`hover-size-btn${(selectedSizes[product.id] || 'M') === sz ? ' active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: sz }));
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      className={`hover-add-btn${addedFlash === product.id ? ' flashed' : ''}`}
                      onClick={() => addToCart(product)}
                    >
                      {addedFlash === product.id ? '✓ Eklendi' : T.addToCart}
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.title[lang]}</h3>
                <p className="product-price">
                  {product.soldOut
                    ? <span className="price-soldout">—</span>
                    : `${product.price.toLocaleString('tr-TR')},00 TL`}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.aside
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="cart-drawer-header">
                <h2 className="cart-drawer-title">{T.cartTitle}</h2>
                <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="cart-drawer-body">
                {cart.length === 0 ? (
                  <p className="cart-empty">{T.emptyCart}</p>
                ) : (
                  <ul className="cart-items">
                    {cart.map((item) => (
                      <li key={`${item.id}-${item.size}`} className="cart-item">
                        <div className="cart-item-img">
                          <ProductSvg type={item.svgType} />
                        </div>
                        <div className="cart-item-body">
                          <p className="cart-item-name">{item.title[lang]}</p>
                          {item.size && <span className="cart-item-size">{item.size}</span>}
                          <div className="cart-item-row">
                            <span className="cart-item-price">
                              {item.price.toLocaleString('tr-TR')},00 TL
                            </span>
                            <div className="cart-qty">
                              <button onClick={() => updateQty(item.id, item.size, -1)}><Minus size={12} /></button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQty(item.id, item.size, 1)}><Plus size={12} /></button>
                            </div>
                          </div>
                        </div>
                        <button className="cart-item-remove" onClick={() => removeItem(item.id, item.size)}>
                          <Trash2 size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-drawer-footer">
                  <div className="cart-subtotal">
                    <span>{T.subtotal}</span>
                    <strong>{cartTotal.toLocaleString('tr-TR')},00 TL</strong>
                  </div>
                  <button className="cart-checkout-btn" onClick={handleCheckout}>
                    {T.checkout} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="checkout-overlay">
            <motion.div
              className="checkout-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <CheckCircle2 size={52} className="checkout-icon" />
              <h2 className="checkout-title">{T.successTitle}</h2>
              <p className="checkout-desc">{T.successDesc}</p>
              <div className="checkout-order-box">
                <span>{T.orderLabel}</span>
                <strong>{orderNumber}</strong>
              </div>
              <button className="checkout-continue-btn" onClick={() => setShowCheckout(false)}>
                {T.continueShopping}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
