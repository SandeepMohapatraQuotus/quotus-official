import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from '../routes/AppRoutes';
import SmoothScroll from './components/overlays/SmoothScroll';
import ScrollToTop from './components/overlays/ScrollToTop';
import ScrollProgress from './components/overlays/ScrollProgress';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

function App() {
  return (
    // reducedMotion="user": framer-motion skips transform animations for people who ask for less motion
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollToTop />   {/* resets page on route change */}
        <ScrollProgress />
        <div className="min-h-screen w-full bg-white">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
        <ScrollToTopButton />  {/* floating arrow button */}
      </SmoothScroll>
    </MotionConfig>
  );
}

export default App;
