import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/features/products/productsSlice';
import { toast } from 'react-hot-toast';

// Lazy load components
const HeroSection = lazy(() => import('@/components/home/HeroSection'));
const ProductShowcase = lazy(() => import('@/components/home/ProductShowcase'));
const SaleBanner = lazy(() => import('@/components/home/SaleBanner'));
const Partners = lazy(() => import('@/components/home/Partners'));
const Subscribe = lazy(() => import('@/components/home/Subscribe'));
const CustomerReviews = lazy(() => import('@/components/home/CustomerReviews'));
// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A05C]"></div>
  </div>
);

export default function Home() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()).unwrap()
        .catch((error) => {
          toast.error(`Error loading products: ${error}`);
        });
    }
  }, [dispatch, status]);

  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
        <ProductShowcase />
        <SaleBanner />
        <Partners />
        <Subscribe />
        <CustomerReviews />
      </Suspense>
    </div>
  );
} 