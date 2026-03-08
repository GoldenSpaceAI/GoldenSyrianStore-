import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState('en');
  const [showCheckout, setShowCheckout] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  // Listen for language changes from HTML button
  window.addEventListener('languageChange', () => {
    const isRTL = document.body.classList.contains('rtl');
    setLanguage(isRTL ? 'ar' : 'en');
  });

  const products = [
    { id: 1, name_en: '🎮 PS5 Console', name_ar: '🎮 بلايستيشن 5', price: 570, image: '🕹️', category: 'electronics' },
    { id: 2, name_en: '📺 50" 4K TV', name_ar: '📺 تلفزيون 50 بوصة 4K', price: 390, image: '📺', category: 'electronics' },
    { id: 3, name_en: '🧹 Vacuum Cleaner', name_ar: '🧹 مكنسة كهربائية', price: 120, image: '🧹', category: 'home' },
    { id: 4, name_en: '🎧 Gaming Headset', name_ar: '🎧 سماعة ألعاب', price: 40, image: '🎧', category: 'electronics' },
    { id: 5, name_en: '📱 iPhone 13', name_ar: '📱 آيفون 13', price: 630, image: '📱', category: 'phones' },
  ];

  const categories = [
    { id: 'electronics', name_en: '📱 Electronics', name_ar: '📱 إلكترونيات' },
    { id: 'home', name_en: '🏠 Home Appliances', name_ar: '🏠 أجهزة منزلية' },
    { id: 'phones', name_en: '📱 Phones', name_ar: '📱 هواتف' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = language === 'en' 
      ? product.name_en.toLowerCase().includes(searchTerm.toLowerCase())
      : product.name_ar.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(language === 'en' ? `✅ Added to cart` : `✅ أضيف إلى السلة`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const sendVerificationCode = () => {
    // In real app, send SMS here
    alert(language === 'en' ? '📱 Verification code sent!' : '📱 تم إرسال رمز التحقق!');
    setStep(2);
  };

  const verifyCode = () => {
    if (verificationCode === '123456') { // In real app, verify actual code
      alert(language === 'en' ? '✅ Phone verified!' : '✅ تم التحقق من الرقم!');
      setStep(3);
    } else {
      alert(language === 'en' ? '❌ Wrong code' : '❌ رمز خاطئ');
    }
  };

  const placeOrder = () => {
    let message = language === 'en' ? "🛒 *New Order*\n\n" : "🛒 *طلب جديد*\n\n";
    cart.forEach(item => {
      const name = language === 'en' ? item.name_en : item.name_ar;
      message += `${name} - $${item.price}\n`;
    });
    message += `\n💰 *Total: $${getTotal()}*\n`;
    message += language === 'en' 
      ? `📞 Phone: ${phone}\n📍 Address: ${address}\n💵 Payment: Cash on delivery`
      : `📞 الهاتف: ${phone}\n📍 العنوان: ${address}\n💵 الدفع: عند الاستلام`;
    
    window.open(`https://wa.me/963962060530?text=${encodeURIComponent(message)}`);
    alert(language === 'en' ? '✅ Order sent!' : '✅ تم إرسال الطلب!');
    setCart([]);
    setShowCheckout(false);
    setStep(1);
    setPhone('');
    setAddress('');
    setVerificationCode('');
  };

  const t = (en, ar) => language === 'en' ? en : ar;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gold-bg text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-center">
            {t('🏆 GOLDEN SYRIAN TECH', '🏆 جولدن سيـريان تك')}
          </h1>
          <p className="text-xl md:text-2xl text-center text-yellow-100 mt-2">
            {t('Premium Electronics • Delivered to Your Door', 'إلكترونيات فاخرة • توصيل لباب البيت')}
          </p>
        </div>
      </header>

      {/* Ramadan Sale Banner */}
      <div className="bg-red-600 text-white py-6 md:py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t('🔥 RAMADAN MEGA SALE 🔥', '🔥 عروض رمضان المميزة 🔥')}
          </h2>
          <p className="text-xl md:text-2xl mb-4">
            {t('UP TO 80% OFF + FREE DELIVERY', 'خصومات حتى ٨٠٪ + توصيل مجاني')}
          </p>
          <div className="bg-white text-red-600 inline-block px-6 md:px-8 py-3 rounded-full font-bold text-lg md:text-xl">
            {t('🎁 GET YOUR FIRST PRODUCT WITH FREE DELIVERY', '🎁 احصل على أول منتج مع توصيل مجاني')}
          </div>
        </div>
      </div>

      {/* 5-Day Delivery Steps */}
      <div className="container mx-auto my-8 px-4">
        <div className="flex justify-between items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`step ${s <= step ? 'active' : ''}`}>
              <div className="step-icon">{s}</div>
              <div className="text-xs md:text-sm mt-1">
                {s === 1 && t('Ready at store', 'جاهز بالمتجر')}
                {s === 2 && t('Shipped to us', 'شحن إلينا')}
                {s === 3 && t('With delivery', 'مع شركة التوصيل')}
                {s === 4 && t('Shipped to you', 'شحن إليك')}
                {s === 5 && t('Delivered', 'تم التوصيل')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Categories */}
      <div className="container mx-auto my-8 px-4">
        <input
          type="text"
          placeholder={t('🔍 Search products...', '🔍 ابحث عن منتجات...')}
          className="w-full p-3 border rounded-lg mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            {t('All', 'الكل')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg ${selectedCategory === cat.id ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              {language === 'en' ? cat.name_en : cat.name_ar}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-8 text-center">
                <span className="text-7xl">{product.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? product.name_en : product.name_ar}
                </h3>
                <p className="text-3xl font-bold text-yellow-600 mb-4">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
                >
                  {t('🛒 Add to Cart', '🛒 أضف إلى السلة')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      {cart.length > 0 && !showCheckout && (
        <div className="container mx-auto my-8 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">
              {t('🛒 Your Cart', '🛒 سلة التسوق')} ({cart.length})
            </h3>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span>{language === 'en' ? item.name_en : item.name_ar}</span>
                <div className="flex items-center gap-4">
                  <span className="font-bold">${item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold">
                {t('Total:', 'المجموع:')} ${getTotal()}
              </span>
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition"
              >
                {t('✅ Checkout', '✅ إتمام الشراء')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Section */}
      {showCheckout && (
        <div className="container mx-auto my-8 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              {t('📋 Checkout', '📋 إتمام الشراء')}
            </h3>

            {step === 1 && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">
                    {t('📞 Phone Number', '📞 رقم الهاتف')}
                  </label>
                  <input
                    type="tel"
                    placeholder="09xxxxxxxx"
                    className="w-full p-3 border rounded-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">
                    {t('📍 Delivery Address', '📍 عنوان التوصيل')}
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button
                  onClick={sendVerificationCode}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
                  disabled={!phone || !address}
                >
                  {t('📱 Send Verification Code', '📱 إرسال رمز التحقق')}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">
                    {t('🔢 Enter 6-digit Code', '🔢 أدخل رمز التحقق')}
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    className="w-full p-3 border rounded-lg text-center text-2xl"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <button
                  onClick={verifyCode}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
                  disabled={verificationCode.length !== 6}
                >
                  {t('✅ Verify', '✅ تحقق')}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-6">
                  <span className="text-6xl">✅</span>
                  <p className="text-xl font-bold mt-2 text-green-600">
                    {t('Phone Verified!', 'تم التحقق من الرقم!')}
                  </p>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  {t('📲 Send Order via WhatsApp', '📲 إرسال الطلب عبر واتساب')}
                </button>
              </>
            )}

            <button
              onClick={() => {
                setShowCheckout(false);
                setStep(1);
              }}
              className="w-full mt-4 text-gray-500 hover:text-gray-700"
            >
              {t('← Back to Cart', '← الرجوع إلى السلة')}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto text-center px-4">
          <p className="text-2xl font-bold mb-2">📞 +963 962 060 530</p>
          <p className="text-xl mb-4">🌐 goldensyriantech.com</p>
          <p className="text-gray-400">
            {t('📍 Delivery in Damascus • Cash on Delivery', '📍 التوصيل في دمشق • الدفع عند الاستلام')}
          </p>
          <p className="text-gray-500 mt-4">
            {t('© 2025 Golden Syrian Tech. All rights reserved.', '© 2025 جولدن سيـريان تك. جميع الحقوق محفوظة.')}
          </p>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
