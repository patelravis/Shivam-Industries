import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar';
import ScrollToTop from './components/ui/ScrollToTop';
import InquiryModal from './components/ui/InquiryModal';
import { InquiryProvider } from './context/InquiryContext';
import './styles/global.css';
import './styles/responsive.css';
import './styles/animations.css';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const Exhibition = lazy(() => import('./pages/Exhibition'));
const Clients = lazy(() => import('./pages/Clients'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog'));
const Services = lazy(() => import('./pages/Services'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__spinner" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <InquiryProvider>
          <ScrollToTop />
          <TopBar />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <InquiryModal />
        </InquiryProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
