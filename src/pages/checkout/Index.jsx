import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  UserIcon, 
  PhoneIcon, 
  MapPinIcon, 
  EnvelopeIcon,
  ShoppingCartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';
import { formatPrice } from '@/utils/currency';
import { selectCartItems, selectCartTotal, clearCart } from '@/features/cart/cartSlice';
import { createOrder, selectOrderStatus, resetOrderStatus } from '@/features/orders/ordersSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const orderStatus = useSelector(selectOrderStatus);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Shipping, 2: Confirmation
  
  useEffect(() => {
    // Redirect to cart if no items
    if (cartItems.length === 0 && step !== 2) {
      toast.error('Your cart is empty');
      navigate('/products');
    }
    
    // Reset order status when component unmounts
    return () => {
      dispatch(resetOrderStatus());
    };
  }, [cartItems, dispatch, navigate, step]);
  
  // Handle successful order creation
  useEffect(() => {
    if (orderStatus === 'succeeded') {
      setStep(2); // Move to confirmation
      dispatch(clearCart()); // Clear the cart
    }
  }, [orderStatus, dispatch]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateShippingForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!validateShippingForm()) return;
    
    // Prepare order data
    const orderData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      total_price: cartTotal,
      products: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };
    
    // Create order
    dispatch(createOrder(orderData));
  };
  

  

  
  const handleContinueShopping = () => {
    navigate('/products');
  };
  

  
  // Render shipping form
  const renderShippingForm = () => (
    <div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4E3B26] mb-1.5">
              Nom Complet
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-[#C5A05C]">
                <UserIcon className="h-5 w-5 text-[#4E3B26]/50 group-focus-within:text-[#C5A05C]" style={{ color: errors.name ? 'rgb(239, 68, 68)' : undefined }} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-3.5 border ${errors.name ? 'border-red-500' : 'border-[#C5A05C]/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent ${errors.name ? 'focus:ring-red-500' : 'focus:ring-[#C5A05C]/50'} transition-all duration-200 bg-white/80`}
                placeholder="Jean Dupont"
              />
            </div>
            {errors.name && <p className="mt-1.5 text-sm text-red-500 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#4E3B26] mb-1.5">
              Adresse Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-[#C5A05C]">
                <EnvelopeIcon className="h-5 w-5 text-[#4E3B26]/50 group-focus-within:text-[#C5A05C]" style={{ color: errors.email ? 'rgb(239, 68, 68)' : undefined }} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-3.5 border ${errors.email ? 'border-red-500' : 'border-[#C5A05C]/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent ${errors.email ? 'focus:ring-red-500' : 'focus:ring-[#C5A05C]/50'} transition-all duration-200 bg-white/80`}
                placeholder="jean.dupont@exemple.com"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-sm text-red-500 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.email}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#4E3B26] mb-1.5">
            Numéro de Téléphone
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-[#C5A05C]">
              <PhoneIcon className="h-5 w-5 text-[#4E3B26]/50 group-focus-within:text-[#C5A05C]" style={{ color: errors.phone ? 'rgb(239, 68, 68)' : undefined }} />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3.5 border ${errors.phone ? 'border-red-500' : 'border-[#C5A05C]/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-[#C5A05C]/50'} transition-all duration-200 bg-white/80`}
              placeholder="+33 6 12 34 56 78"
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-sm text-red-500 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#4E3B26] mb-1.5">
            Adresse de Livraison
          </label>
          <div className="relative group">
            <div className="absolute top-3.5 left-0 pl-3 flex items-start pointer-events-none transition-colors group-focus-within:text-[#C5A05C]">
              <MapPinIcon className="h-5 w-5 text-[#4E3B26]/50 group-focus-within:text-[#C5A05C]" style={{ color: errors.address ? 'rgb(239, 68, 68)' : undefined }} />
            </div>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className={`block w-full pl-10 pr-3 py-3.5 border ${errors.address ? 'border-red-500' : 'border-[#C5A05C]/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent ${errors.address ? 'focus:ring-red-500' : 'focus:ring-[#C5A05C]/50'} transition-all duration-200 bg-white/80`}
              placeholder="123 Rue de la République, 75001 Paris, France"
            />
          </div>
          {errors.address && <p className="mt-1.5 text-sm text-red-500 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{errors.address}</p>}
        </div>
      </div>
      
      <div className="pt-4 mt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmitOrder}
          disabled={orderStatus === 'loading'}
          className="w-full py-4 px-6 rounded-xl text-white font-medium shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-[#4E3B26] to-[#5D4A35] hover:from-[#5D4A35] hover:to-[#4E3B26]"
        >
          {orderStatus === 'loading' ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement de la commande...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Confirmer la Commande
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
  

  
  // Render confirmation (Step 2)
  const renderConfirmation = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center space-y-8 py-8 h-full my-auto"
    >
      <div className="relative">
        <div 
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: `${COLORS.secondary}15` }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
          >
            <CheckCircleIcon 
              className="h-14 w-14"
              style={{ color: COLORS.secondary }}
            />
          </motion.div>
        </div>
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1 
          }}
          style={{ backgroundColor: `${COLORS.secondary}20` }}
        />
      </div>
      
      <div className="space-y-4 max-w-md mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}   
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mx-auto text-center"
          style={{ background: COLORS.gradients.primary, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        >
          Order Confirmed!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 max-w-md mx-auto"
        >
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive an email confirmation shortly.
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinueShopping}
          className="py-4 px-8 rounded-xl text-white font-medium shadow-lg transition-all duration-300 flex items-center justify-center mx-auto mt-4"
          style={{ 
            background: COLORS.gradients.secondary,
            boxShadow: `0 4px 14px 0 ${COLORS.secondaryLight}50`
          }}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </motion.div>
  );
  
  // Render order summary
  const renderOrderSummary = () => (
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-serif text-[#4E3B26] mb-6 pb-3 border-b border-[#C5A05C]/20 text-center">
        Résumé de la Commande
      </h3>
      
      <div className="divide-y divide-[#C5A05C]/10">
        <div className="max-h-[320px] overflow-y-auto pb-5 space-y-4 pr-2 custom-scrollbar">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start py-3 group hover:bg-[#FAF7F2]/80 rounded-lg transition-colors duration-200 p-2">
              <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#C5A05C]/20 group-hover:border-[#C5A05C]/40 shadow-sm group-hover:shadow transition-all duration-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-[#4E3B26]">
                    <h3 className="line-clamp-1 text-sm sm:text-base">{item.name}</h3>
                    <p className="ml-2 text-sm sm:text-base font-semibold text-[#4E3B26]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-1">
                  <div className="flex items-center">
                    <span className="text-[#4E3B26]/60 text-xs sm:text-sm">Qté:</span>
                    <span className="ml-1 px-2 py-0.5 bg-[#C5A05C]/10 rounded-full text-xs sm:text-sm font-medium text-[#4E3B26]/80">
                      {item.quantity}
                    </span>
                  </div>
                  <p className="text-xs text-[#4E3B26]/60">{formatPrice(item.price)} l'unité</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3 py-5">
          <div className="flex justify-between text-sm">
            <p className="text-[#4E3B26]/70">Sous-total</p>
            <p className="font-medium text-[#4E3B26]">{formatPrice(cartTotal)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-[#4E3B26]/70">Livraison</p>
            <p className="font-medium text-green-600">Gratuite</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-[#4E3B26]/70">TVA (20%)</p>
            <p className="font-medium text-[#4E3B26]">{formatPrice(cartTotal * 0.2)}</p>
          </div>
        </div>
        
        <div className="flex justify-between py-5 items-center">
          <p className="text-base font-serif font-semibold text-[#4E3B26]">Total</p>
          <div className="flex flex-col items-end">
            <p className="text-xl font-bold text-[#4E3B26]">
              {formatPrice(cartTotal * 1.2)}
            </p>
            <p className="text-xs text-[#4E3B26]/50 mt-1">TVA incluse</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full py-8">
        {/* Elegant Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6"
        >
          <div className="inline-block mb-3">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full opacity-30 blur-sm bg-gradient-to-r from-[#C5A05C]/30 to-[#4E3B26]/30"></div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center relative shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4E3B26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-[#4E3B26] tracking-tight">
            Finaliser votre commande
          </h1>
          <p className="text-[#4E3B26]/70 max-w-md mx-auto text-sm font-light">
            Complétez les informations ci-dessous pour finaliser votre achat
          </p>
          <div className="mt-3 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A05C] to-transparent mx-auto"></div>
        </motion.div>
      
        {/* Checkout Steps - Elegant progress indicator */}
        {step !== 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-md mx-auto w-full"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className={`absolute -inset-1 rounded-full ${step >= 1 ? 'bg-[#C5A05C]/20' : 'bg-gray-200/50'} blur-sm`}></div>
                  <div 
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gradient-to-br from-[#4E3B26] to-[#5D4A35]' : 'bg-gray-200'} text-white shadow-md transition-all duration-300`}
                  >
                    <span className="font-serif">1</span>
                  </div>
                </div>
                <span className="text-xs mt-2 font-medium text-[#4E3B26]">Livraison</span>
              </div>
              <div className="relative flex-1 mx-4">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-200/70"></div>
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#4E3B26] to-[#C5A05C] transition-all duration-700"
                  style={{ width: step >= 2 ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className={`absolute -inset-1 rounded-full ${step >= 2 ? 'bg-[#C5A05C]/20' : 'bg-gray-200/50'} blur-sm`}></div>
                  <div 
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gradient-to-br from-[#4E3B26] to-[#5D4A35]' : 'bg-gray-200'} text-white shadow-md transition-all duration-300`}
                  >
                    <span className="font-serif">2</span>
                  </div>
                </div>
                <span className="text-xs mt-2 font-medium text-[#4E3B26]">Confirmation</span>
              </div>
            </div>
          </motion.div>
        )}
      
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full min-h-[calc(100vh-12rem)]">
          {/* Shipping Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${step === 2 ? 'xl:col-span-12 flex items-center justify-center' : 'xl:col-span-8'} bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden`}
          >
            <div className="p-6 md:p-8 w-full">
              {step === 1 && (
                <h3 className="text-xl font-serif font-medium text-[#4E3B26] mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C5A05C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Informations de livraison
                </h3>
              )}
              {step === 1 && renderShippingForm()}
              {step === 2 && renderConfirmation()}
            </div>
          </motion.div>
          
          {step !== 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="xl:col-span-4 h-full"
            >
              <div 
                className="rounded-2xl shadow-lg sticky top-24 transition-all duration-300 w-full border border-gray-100 overflow-hidden h-full flex flex-col"
              >
                {renderOrderSummary()}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Trust badges */}
        {step !== 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-6 border-t border-gray-100"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-serif font-medium text-[#4E3B26]">Livraison fiable et service de qualité</h3>
              <p className="text-xs text-[#4E3B26]/70 mt-1">Nous vous garantissons une expérience d'achat exceptionnelle et un service client attentionné</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 blur-sm bg-[#C5A05C]/30 transition-opacity duration-300"></div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center mb-2 shadow-md relative border border-gray-100 group-hover:border-[#C5A05C]/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#4E3B26]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#4E3B26] group-hover:text-[#C5A05C] transition-colors duration-300">Qualité Garantie</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 blur-sm bg-[#C5A05C]/30 transition-opacity duration-300"></div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center mb-2 shadow-md relative border border-gray-100 group-hover:border-[#C5A05C]/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#4E3B26]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#4E3B26] group-hover:text-[#C5A05C] transition-colors duration-300">Service Premium</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 blur-sm bg-[#C5A05C]/30 transition-opacity duration-300"></div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center mb-2 shadow-md relative border border-gray-100 group-hover:border-[#C5A05C]/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#4E3B26]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#4E3B26] group-hover:text-[#C5A05C] transition-colors duration-300">Satisfaction Client</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 blur-sm bg-[#C5A05C]/30 transition-opacity duration-300"></div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center mb-2 shadow-md relative border border-gray-100 group-hover:border-[#C5A05C]/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#4E3B26]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#4E3B26] group-hover:text-[#C5A05C] transition-colors duration-300">Livraison Rapide</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
