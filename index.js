import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: '🎮 PS5 Console', price: 570, image: '🕹️', desc: 'Brand new • 1-year warranty' },
    { id: 2, name: '📺 50" 4K TV', price: 390, image: '📺', desc: 'Smart TV • Free delivery' },
    { id: 3, name: '🧹 Vacuum Cleaner', price: 120, image: '🧹', desc: 'Power Pro • Hepafilter' },
    { id: 4, name: '🎧 Gaming Headset', price: 40, image: '🎧', desc: 'RGB • Noise cancelling' },
    { id: 5, name: '📱 iPhone 13', price: 630, image: '📱', desc: 'Mid-range • 1-year warranty' },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`✅ Added ${product.name} to cart`);
  };

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    
    let message = "🛒 *New Order*\n\n";
    let total = 0;
    cart.forEach(item => {
      message += `${item.name} - $${item.price}\n`;
      total += item.price;
    });
    message += `\n💰 *Total: $${total}*\n`;
    message += `💵 Payment: Cash on delivery`;
    
    window.open(`https://wa.me/963962060530?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gold-bg text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-black mb-2">🏆 GOLDEN SYRIAN TECH</h1>
          <p className="text-2xl text-yellow-100">Premium Electronics • Delivered to Your Door</p>
        </div>
      </header>

      {/* Ramadan Sale Banner */}
      <div className="bg-red-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">🔥 RAMADAN MEGA SALE 🔥</h2>
          <p className="text-2xl mb-4">UP TO 80% OFF + FREE DELIVERY</p>
          <div className="bg-white text-red-600 inline-block px-8 py-3 rounded-full font-bold text-xl">
            🎁 GET YOUR FIRST PRODUCT WITH FREE DELIVERY
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="container mx-auto my-12">
        <div className="flex justify-center gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <span className="text-4xl">💵</span>
            <p className="font-bold text-lg mt-2">Cash on Delivery</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <span className="text-4xl">🏦</span>
            <p className="font-bold text-lg mt-2">Pyramid Syria</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto my-12 px-4">
        <h3 className="text-3xl font-bold text-center mb-8">🌟 FEATURED PRODUCTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-100 p-8 text-center">
                <span className="text-7xl">{product.image}</span>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-yellow-600">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="container mx-auto my-8 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">🛒 Your Cart ({cart.length} items)</h3>
            <div className="mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <span className="font-bold">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                Total: ${cart.reduce((sum, item) => sum + item.price, 0)}
              </span>
              <button 
                onClick={sendWhatsAppOrder}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-xl hover:bg-green-600 transition"
              >
                💬 Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-2xl font-bold mb-2">📞 +963 962 060 530</p>
          <p className="text-xl mb-4">🌐 goldensyriantech.com</p>
          <p className="text-gray-400">📍 Delivery in Damascus • Cash on Delivery</p>
          <p className="text-gray-500 mt-4">© 2025 Golden Syrian Tech. All rights reserved.</p>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/963962060530" 
        target="_blank"
        className="whatsapp-btn bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition flex items-center gap-2"
      >
        <span className="text-3xl">💬</span>
        <span className="font-bold text-lg hidden md:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
