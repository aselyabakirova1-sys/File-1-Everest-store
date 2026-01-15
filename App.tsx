
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { AIChat } from './components/AIChat';
import { Location } from './components/Location';
import { AboutUs } from './components/AboutUs';
import { TradeIn } from './components/TradeIn';
import { FilterDrawer } from './components/FilterDrawer';
import { PRODUCTS } from './constants';
import { Product, Language } from './types';
import { Filter, Phone, Star } from 'lucide-react';
import { translations } from './translations';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('kg');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Advanced Filter State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [minScreen, setMinScreen] = useState<number | null>(null);
  const [minCamera, setMinCamera] = useState<number | null>(null);

  const t = translations[language];

  const categories = [
    { id: 'All', label: t.all },
    { id: 'Flagship', label: t.flagship },
    { id: 'Mid-range', label: t.midrange },
    { id: 'Budget', label: t.budget }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      let matchesScreen = true;
      if (minScreen !== null) {
        const sizeMatch = p.specs.screen.match(/(\d+\.?\d*)"/);
        const size = sizeMatch ? parseFloat(sizeMatch[1]) : 0;
        matchesScreen = size >= minScreen;
      }
      
      let matchesCamera = true;
      if (minCamera !== null) {
        const mpMatch = p.specs.camera.match(/(\d+)MP/);
        const mp = mpMatch ? parseInt(mpMatch[1]) : 0;
        matchesCamera = mp >= minCamera;
      }

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesScreen && matchesCamera;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, minScreen, minCamera]);

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 2500]);
    setMinScreen(null);
    setMinCamera(null);
    setSelectedCategory('All');
  };

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.length}
        onSearch={setSearchQuery}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-1">
        <Hero language={language} />
        
        {/* Main Product Grid */}
        <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2">
                <Star size={14} fill="currentColor" />
                Everest Selection
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{t.featuredDevices}</h2>
              <p className="text-slate-500 mt-2 text-lg">{t.featuredSub}</p>
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-sm border border-slate-200 hover:border-slate-400 transition-all shrink-0 shadow-sm"
              >
                <Filter size={18} />
                <span className="uppercase tracking-widest">{t.filter}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-8 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap tracking-wide ${
                    selectedCategory === cat.id 
                    ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-inner">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="text-slate-300" size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">{t.noProducts}</h3>
              <p className="text-slate-500 mt-2">{t.noProductsSub}</p>
              <button 
                onClick={clearFilters}
                className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>

        {/* Luxury Brand Showcase Section */}
        <div className="bg-white border-y border-slate-100 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center mb-12">
              {language === 'kg' ? 'Расмий сатуучу' : 'Официальный дилер'}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-3xl font-black tracking-tighter text-slate-900">APPLE</span>
              <span className="text-3xl font-black tracking-tighter text-slate-900">SAMSUNG</span>
              <span className="text-3xl font-black tracking-tighter text-slate-900">XIAOMI</span>
              <span className="text-3xl font-black tracking-tighter text-slate-900">GOOGLE</span>
              <span className="text-3xl font-black tracking-tighter text-slate-900">NOTHING</span>
            </div>
          </div>
        </div>

        <TradeIn language={language} />
        <AboutUs language={language} />
        <Location language={language} />
      </main>

      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                </div>
                <span className="text-3xl font-black tracking-tighter">EVEREST</span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                {language === 'kg' 
                  ? 'Ош шаарындагы премиум мобилдик технологиялардын борбору.' 
                  : 'Центр премиальных мобильных технологий в городе Ош.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-400 mb-6">Support</h4>
              <div className="space-y-4 text-slate-300">
                <a href="tel:0755731717" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={18} />
                  <span className="font-bold">0755731717</span>
                </a>
                <p className="text-sm leading-relaxed text-slate-400">{t.footerAddress}</p>
              </div>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-400 mb-6">Hours</h4>
              <div className="space-y-2 text-slate-300 text-sm font-medium">
                <p>Mon - Sun: 10:00 - 21:00</p>
                <p>Urban Mall, Osh</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">© 2024 Everest Phone Shop. Developed for Excellence.</p>
            <div className="flex gap-8 text-slate-500 text-sm font-bold">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        language={language}
      />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        language={language}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minScreen={minScreen}
        setMinScreen={setMinScreen}
        minCamera={minCamera}
        setMinCamera={setMinCamera}
        onClear={clearFilters}
      />
      
      <AIChat language={language} />
    </div>
  );
};

export default App;
