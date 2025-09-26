import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ข้อมูลสินค้า
const PRODUCTS = {
  featured: [
    { id: "feat-000", title: "", description: "", video: "milli.mp4" },
    {
      id: "feat-002",
      title: "Polo Shirt",
      description: "เสื้อคอปกตัดเย็บประณีต มีรายละเอียดครีบฉลามแบบเรียบ",
      image: "65192_0.jpg",
    },
    {
      id: "feat-003",
      title: "Polo Shirt",
      description: "เสื้อคอปกตัดเย็บประณีต มีรายละเอียดครีบฉลามแบบเรียบ",
      image: "65193_0.jpg",
    },
    {
      id: "feat-004",
      title: "All Collection",
      description: "เสื้อผ้าที่สร้างมาเพื่อคุณเท่านั้น",
      image: "65202.jpg", // ใช้เป็นสไลด์หลัก
      gallery: [
        "65192_0.jpg",
        "65193_0.jpg",
        "65194_0.jpg",
        "65195_0.jpg",
        "65196_0.jpg",
      ],
    },
    {
      id: "feat-005",
      title: "Brand Logos",
      description: "",
      gallery: [
        "nike.png",
        "Adidas.png",
        "gucci.png",
        "sharkky.png",
        "Louis.png",
        "dior.png",
        "chanel.png",
        "Versace.png",
      ],
    },
  ],
  men: [
    {
      id: "men-001",
      title: "Over size Tee",
      price: 1200,
      sizes: ["S", "M", "L", "XL"],
      image: "65192_0.jpg",
    },
    {
      id: "men-002",
      title: "Polo Shirt",
      price: 1500,
      sizes: ["S", "M", "L", "XL"],
      image: "65193_0.jpg",
    },
    {
      id: "men-003",
      title: "Hoodie",
      price: 2200,
      sizes: ["S", "M", "L", "XL"],
      image: "65202.jpg",
    },
  ],
  women: [
    {
      id: "women-001",
      title: "Over size Tee",
      price: 1200,
      sizes: ["S", "M", "L", "XL"],
      image: "65195_0.jpg",
    },
    {
      id: "women-002",
      title: "Polo Shirt",
      price: 1500,
      sizes: ["S", "M", "L", "XL"],
      image: "65196_0.jpg",
    },
    {
      id: "women-003",
      title: "Hoodie",
      price: 2200,
      sizes: ["S", "M", "L", "XL"],
      image: "65197_0.jpg",
    },
  ],
  kids: [
    {
      id: "kids-001",
      title: "Over size Tee (Kids)",
      price: 800,
      sizes: ["S", "M", "L"],
      image: "65198_0.jpg",
    },
    {
      id: "kids-002",
      title: "Polo Shirt (Kids)",
      price: 900,
      sizes: ["S", "M", "L"],
      image: "65199_0.jpg",
    },
    {
      id: "kids-003",
      title: "Hoodie (Kids)",
      price: 1200,
      sizes: ["S", "M", "L"],
      image: "65200_0.jpg",
    },
  ],
};

// Slider component
function ImageSlider({ images, interval = 3000 }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded mb-2">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Slide ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
}

// App หลัก
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, size = null, quantity = 1) => {
    const entry = {
      id: `${item.id}_${size || "na"}_${Date.now()}`,
      title: item.title,
      price: item.price ?? 0,
      size,
      quantity,
    };
    setCart((prev) => [...prev, entry]);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-black text-white">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/wlogo.png"
            alt="SHARKKY Logo"
            className="h-32 md:h-20 w-auto"
          />
          <span className="font-extrabold text-xl md:text-2xl">SHARKKY</span>
        </Link>
        <ul className="flex gap-4 md:gap-6 text-sm md:text-base">
          <li>
            <Link to="/">New & Featured</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/kids">Kids</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<FeaturedSection products={PRODUCTS.featured} />}
        />
        <Route
          path="/men"
          element={
            <CatalogSection products={PRODUCTS.men} addToCart={addToCart} />
          }
        />
        <Route
          path="/women"
          element={
            <CatalogSection products={PRODUCTS.women} addToCart={addToCart} />
          }
        />
        <Route
          path="/kids"
          element={
            <CatalogSection products={PRODUCTS.kids} addToCart={addToCart} />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

// Featured Section
function FeaturedSection({ products }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">New & Featured</h2>
      <p className="mb-4">
        แนะนำแบรนด์ SHARKKY —
        แรงบันดาลใจจากครีบฉลามและความกล้าหาญในการออกแบบเสื้อผ้า
      </p>
      <div className="space-y-6">
        {products.map((p) => (
          <div key={p.id} className="text-center">
            {p.id === "feat-004" ? (
              <ImageSlider images={[p.image, ...(p.gallery ?? [])]} />
            ) : p.video ? (
              <video
                src={`/${p.video}`}
                controls
                autoPlay
                loop
                className="w-full h-[600px] object-contain bg-gray-100 rounded mb-2"
              />
            ) : p.gallery && p.id === "feat-005" ? (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4 justify-items-center">
                {p.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Logo ${idx + 1}`}
                    className="w-16 h-16 object-contain"
                  />
                ))}
              </div>
            ) : (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-[600px] object-contain bg-gray-100 rounded mb-2"
              />
            )}
            {p.title && <h3 className="font-bold mb-1 text-xl">{p.title}</h3>}
            {p.description && <p className="mb-4">{p.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Catalog + ProductCard
function CatalogSection({ products, addToCart }) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "M");
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="border rounded p-4 text-center shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[300px] object-contain bg-gray-100 rounded mb-2"
      />
      <h3 className="font-bold mb-1">{product.title}</h3>
      <p className="font-semibold mb-2">฿{product.price}</p>
      <div className="mb-2">
        <label className="mr-2">Size:</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border rounded p-1"
        >
          {product.sizes?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">Qty:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-1 w-16"
        />
      </div>
      <button
        onClick={() => addToCart(product, size, quantity)}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add to Cart {quantity > 0 ? `(${quantity})` : ""}
      </button>
    </div>
  );
}

// Contact Page
function ContactPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto border rounded-lg shadow bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">ช่องทางการติดต่อ</h2>
      <p>Sharkky Co.,Ltd</p>
      <p>xx/xxx พระโขนง พระโขนง กทม 10260</p>
      <p>FAX 02-xxx-xxxx</p>
      <p>Tel 09X-XXX-XXXX</p>
      <p>ID LINE OA : XXXX</p>
    </div>
  );
}

// Checkout
function Checkout({ cart, removeFromCart, updateQuantity }) {
  const [payment, setPayment] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">ชำระเงิน</h2>
      <div className="mb-6 border rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold mb-2">ตะกร้าสินค้า</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    {item.title} ({item.size})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <span>฿{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500"
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold">
              <span>รวมทั้งหมด</span>
              <span>฿{total}</span>
            </div>
          </>
        )}
      </div>

      <div className="mb-6 border rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold mb-2">เลือกช่องทางการชำระเงิน</h3>
        <label className="block mb-2">
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setPayment(e.target.value)}
          />
          <span className="ml-2">บัตรเครดิต / เดบิต</span>
        </label>
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="qr"
            onChange={(e) => setPayment(e.target.value)}
          />
          <span className="ml-2">QR Code / พร้อมเพย์</span>
        </label>
      </div>

      {payment === "card" && (
        <div className="mb-6 border rounded-lg p-4 shadow">
          <input
            placeholder="หมายเลขบัตร"
            className="w-full p-2 border mb-2 rounded"
          />
          <div className="flex gap-2">
            <input placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
            <input placeholder="CVV" className="w-1/2 p-2 border rounded" />
          </div>
        </div>
      )}

      {payment === "qr" && (
        <div className="text-center mb-6">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SHARKKY-PROMPTPAY"
            alt="QR Code"
            className="mx-auto h-52 w-52 object-contain bg-gray-100 rounded"
          />
          <p className="mt-2 text-sm text-gray-600">พร้อมเพย์: 0XX-XXX-XXXX</p>
        </div>
      )}

      <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
        ยืนยันการชำระเงิน
      </button>
    </div>
  );
}
