import React, { Suspense, useEffect } from 'react'
import './styles/scrollbar.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/app/store'
import router from './routes/index'
import { COLORS } from './constants/colors'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '@/features/products/productsSlice'
import CustomToaster, { initializeToasts, ToastStyles } from './components/common/CustomToast'
import { Loading } from './components/common/Loading'

// Initialize custom toast system
initializeToasts();


// App content component to use hooks
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <CustomToaster />
      <ToastStyles />
      <div className="relative min-h-screen pt-16">
        {/* Fixed Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/90"
            style={{ backgroundColor: COLORS.background }}
          />
          
          {/* Gradient Orbs */}
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.secondary}, transparent)`,
              transform: 'translate(-25%, -25%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.primary}, transparent)`,
              transform: 'translate(25%, 25%)'
            }}
          />
          
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(${COLORS.text} 1px, transparent 1px),
                               linear-gradient(90deg, ${COLORS.text} 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen">
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
