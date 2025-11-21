import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MoveHorizontal, ImageOff } from 'lucide-react';

interface CompareSliderProps {
  labelBefore: string;
  labelAfter: string;
  beforeSrc?: string; // URL for raw SAR
  afterSrc?: string;  // URL for mask
}

export const CompareSlider: React.FC<CompareSliderProps> = ({ 
  labelBefore, 
  labelAfter,
  beforeSrc,
  afterSrc
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - left) / width) * 100;
      setPosition(Math.min(Math.max(newPosition, 0), 100));
    }
  }, []);

  const onMouseDown = () => setIsResizing(true);
  const onTouchStart = () => setIsResizing(true);
  const onMouseUp = () => setIsResizing(false);
  const onTouchEnd = () => setIsResizing(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) handleMove(e.clientX);
  }, [isResizing, handleMove]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (isResizing) handleMove(e.touches[0].clientX);
  }, [isResizing, handleMove]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMouseMove, onTouchMove]);

  // Fallback UI if image paths are invalid or not provided yet
  if (imageError || !beforeSrc || !afterSrc) {
    return (
      <div className="w-full h-80 md:h-96 rounded-xl border-2 border-slate-800 bg-slate-900 flex flex-col items-center justify-center text-slate-500 gap-4">
        <ImageOff size={48} />
        <div className="text-center px-6">
          <p className="font-bold text-slate-300 mb-2">Image Asset Missing</p>
          <p className="text-sm">Please add <code>{beforeSrc || 'image.png'}</code> to your public folder.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-80 md:h-96 select-none group rounded-xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950"
    >
      {/* AFTER Image (Underneath, fully visible but will be revealed by slider) */}
      {/* Note: We actually stack them. Bottom is After (Mask), Top is Before (SAR) clipped. */}
      
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={afterSrc} 
          alt={labelAfter}
          className="w-full h-full object-cover" 
          onError={() => setImageError(true)}
        />
        <span className="absolute bottom-4 right-4 bg-cyan-600/90 backdrop-blur text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-lg z-10 tracking-wider">
          {labelAfter}
        </span>
      </div>

      {/* BEFORE Image (Top layer, clipped) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ 
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` 
        }}
      >
        <img 
          src={beforeSrc} 
          alt={labelBefore}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        
        {/* Gradient overlay to make text readable on noisy SAR */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 pointer-events-none" />
        
        <span className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-lg z-10 tracking-wider border border-slate-600">
          {labelBefore}
        </span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize z-20 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900 transition-transform hover:scale-110">
          <MoveHorizontal size={16} className="text-slate-900" />
        </div>
      </div>
    </div>
  );
};