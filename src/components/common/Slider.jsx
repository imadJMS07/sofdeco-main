import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const RangeSlider = ({ 
    min = 0, 
    max = 100, 
    step = 1, 
    value = [min, max], 
    onChange,
    className = '',
    trackStyle = {},
    rangeStyle = {},
    handleStyle = {},
    railStyle = {},
    formatValue = (value) => value.toLocaleString(),
    showLabels = true,
    disabled = false
}) => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [activeHandle, setActiveHandle] = useState(null);
    const [hoverValue, setHoverValue] = useState(null);
    const [hoverPosition, setHoverPosition] = useState(0);
    const [animation, setAnimation] = useState(false);
    const controls = useAnimation();

    const calculateValue = useCallback((clientX) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + (max - min) * percentage;
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.min(Math.max(steppedValue, min), max);
    }, [min, max, step]);

    const handleMouseDown = useCallback((e, handleIndex) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(true);
        setActiveHandle(handleIndex);
        setAnimation(true);
        
        // Animate handle on grab
        controls.start({
            scale: 1.2,
            transition: { type: "spring", stiffness: 400, damping: 20 }
        });

        // Add cursor styles to body
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';

        const handleMove = (moveEvent) => {
            const clientX = moveEvent.type.includes('mouse') 
                ? moveEvent.clientX 
                : moveEvent.touches[0].clientX;
            
            const newValue = calculateValue(clientX);
            const updatedValue = [...value];
            
            if (handleIndex === 0) {
                if (newValue <= value[1]) {
                    updatedValue[0] = newValue;
                }
            } else {
                if (newValue >= value[0]) {
                    updatedValue[1] = newValue;
                }
            }
            
            onChange(updatedValue);
        };

        const handleEnd = () => {
            setIsDragging(false);
            setActiveHandle(null);
            
            // Reset handle animation
            controls.start({
                scale: 1,
                transition: { type: "spring", stiffness: 400, damping: 20 }
            });

            setTimeout(() => setAnimation(false), 300);
            
            // Reset cursor styles
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            // Remove event listeners
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        // Add event listeners for both mouse and touch events
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    }, [disabled, controls, calculateValue, value, onChange]);

    const handleTrackClick = useCallback((e) => {
        if (disabled) return;
        const clickValue = calculateValue(e.clientX);
        const distToLower = Math.abs(clickValue - value[0]);
        const distToUpper = Math.abs(clickValue - value[1]);
        const newValue = [...value];

        if (distToLower < distToUpper) {
            newValue[0] = clickValue;
        } else {
            newValue[1] = clickValue;
        }

        setAnimation(true);
        onChange(newValue);
        
        // Animate the click interaction
        controls.start({
            scale: [1, 1.1, 1],
            transition: { duration: 0.3 }
        });

        setTimeout(() => setAnimation(false), 300);
    }, [calculateValue, value, onChange, disabled, controls]);

    const handleTrackHover = useCallback((e) => {
        if (disabled || isDragging) return;
        const value = calculateValue(e.clientX);
        setHoverValue(value);
        setHoverPosition(((value - min) / (max - min)) * 100);
    }, [calculateValue, disabled, isDragging, min, max]);

    const getLeftPosition = useCallback(() => {
        return ((value[0] - min) / (max - min)) * 100;
    }, [value, min, max]);

    const getRightPosition = useCallback(() => {
        return ((value[1] - min) / (max - min)) * 100;
    }, [value, min, max]);

    // Clean up event listeners
    useEffect(() => {
        return () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, []);

    return (
        <div className={`relative py-8 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            {/* Main slider track */}
            <div 
                className="relative h-[3px] my-6"
                ref={sliderRef}
                onClick={handleTrackClick}
                onMouseMove={handleTrackHover}
                onMouseLeave={() => setHoverValue(null)}
            >
                {/* Decorative elements */}
                <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-transparent via-secondary/5 to-transparent pointer-events-none" />
                
                {/* Background rail */}
                <motion.div 
                    className="absolute w-full h-full cursor-pointer overflow-hidden"
                    style={{
                        ...railStyle,
                        background: disabled ? '#E5E7EB' : railStyle.background || `${COLORS.secondary}15`,
                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                    whileHover={!disabled && { scale: 1.01 }}
                    animate={controls}
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* Active range */}
                <motion.div 
                    className="absolute h-full"
                    animate={{
                        left: `${getLeftPosition()}%`,
                        width: `${getRightPosition() - getLeftPosition()}%`,
                        transition: { type: animation ? "spring" : "none", stiffness: 300, damping: 30 }
                    }}
                    style={{
                        ...rangeStyle,
                        background: disabled 
                            ? COLORS.textMuted 
                            : `linear-gradient(90deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                         style={{ 
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s infinite'
                         }}
                    />
                </motion.div>

                {/* Center line decoration */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 pointer-events-none"
                     style={{ background: `${COLORS.secondary}20` }} />

                {/* Hover indicator */}
                {!disabled && hoverValue !== null && !isDragging && (
                    <motion.div
                        className="absolute w-[2px] h-4 -mt-2 rounded-full pointer-events-none"
                        initial={{ opacity: 0, height: '100%' }}
                        animate={{ 
                            opacity: 1,
                            left: `${hoverPosition}%`,
                            height: '200%'
                        }}
                        exit={{ opacity: 0, height: '100%' }}
                        transition={{ duration: 0.2 }}
                        style={{
                            background: `${COLORS.secondary}30`,
                            boxShadow: `0 0 8px ${COLORS.secondary}20`
                        }}
                    />
                )}

                {/* Handles */}
                {[0, 1].map((handleIndex) => (
                    <motion.div
                        key={handleIndex}
                        className="absolute touch-none"
                        animate={{
                            left: `${handleIndex === 0 ? getLeftPosition() : getRightPosition()}%`,
                            scale: isDragging && activeHandle === handleIndex ? 1.2 : 1,
                            transition: { type: animation ? "spring" : "none", stiffness: 300, damping: 30 }
                        }}
                        style={{
                            ...handleStyle,
                            width: '20px',
                            height: '20px',
                            marginLeft: '-10px',
                            marginTop: '-8.5px',
                            zIndex: isDragging && activeHandle === handleIndex ? 30 : 20
                        }}
                        onMouseDown={(e) => handleMouseDown(e, handleIndex)}
                        onTouchStart={(e) => handleMouseDown(e, handleIndex)}
                        whileHover={!disabled && { scale: 1.15 }}
                        whileTap={!disabled && { scale: 0.95 }}
                    >
                        <motion.div 
                            className={`relative w-full h-full rounded-full bg-white border shadow-lg ${
                                disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
                            }`}
                            animate={controls}
                            style={{ 
                                borderColor: disabled ? COLORS.textMuted : COLORS.secondary,
                                borderWidth: '1.5px',
                                boxShadow: `0 2px 8px ${COLORS.secondary}30`,
                                background: `linear-gradient(135deg, white 0%, ${COLORS.backgroundLight} 100%)`
                            }}
                        >
                            {/* Inner circle */}
                            {!disabled && (
                                <div 
                                    className="absolute inset-[3px] rounded-full transition-opacity"
                                    style={{ 
                                        background: `${COLORS.secondary}15`,
                                        opacity: isDragging && activeHandle === handleIndex ? 1 : 0.5
                                    }}
                                />
                            )}
                            
                            {/* Ripple effect on active handle */}
                            {isDragging && activeHandle === handleIndex && (
                                <motion.div
                                    className="absolute -inset-2 rounded-full pointer-events-none"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: [0, 0.2, 0], scale: 1.5 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    style={{ background: `${COLORS.secondary}20` }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom values display */}
            {showLabels && (
                <motion.div 
                    className="absolute -bottom-1 left-0 right-0 flex justify-between text-sm font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.span
                        animate={{ 
                            color: isDragging && activeHandle === 0 ? COLORS.secondary : COLORS.textMuted,
                            scale: isDragging && activeHandle === 0 ? 1.1 : 1
                        }}
                        className="bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm"
                    >
                        {formatValue(value[0])}
                    </motion.span>
                    <motion.span
                        animate={{ 
                            color: isDragging && activeHandle === 1 ? COLORS.secondary : COLORS.textMuted,
                            scale: isDragging && activeHandle === 1 ? 1.1 : 1
                        }}
                        className="bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm"
                    >
                        {formatValue(value[1])}
                    </motion.span>
                </motion.div>
            )}

            {/* Hidden inputs for accessibility */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                disabled={disabled}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue <= value[1]) {
                        onChange([newValue, value[1]]);
                    }
                }}
                className="sr-only"
                aria-label="Minimum value"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[1]}
                disabled={disabled}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue >= value[0]) {
                        onChange([value[0], newValue]);
                    }
                }}
                className="sr-only"
                aria-label="Maximum value"
            />

            {/* Add keyframe animation for shimmer effect */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
};

const Slider = ({ min = 0, max = 100, step = 1, value = [min, max], onChange, formatValue = v => v }) => {
    const handleChange = (e, idx) => {
        const newValue = [...value];
        newValue[idx] = Number(e.target.value);
        onChange(newValue);
    };
    return (
        <div className="flex flex-col gap-2">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={e => handleChange(e, 0)}
                className="w-full"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[1]}
                onChange={e => handleChange(e, 1)}
                className="w-full"
            />
            <div className="flex justify-between text-xs">
                <span>{formatValue(value[0])}</span>
                <span>{formatValue(value[1])}</span>
            </div>
        </div>
    );
};

export { RangeSlider };
export default RangeSlider; 