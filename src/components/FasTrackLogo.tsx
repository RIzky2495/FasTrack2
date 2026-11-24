import React, { useState } from 'react';
import { Construction, Droplets, Lightbulb, MapPin, ShieldCheck, User } from 'lucide-react';

export function FasTrackMark({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo FasTrack"
    >
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#DBEAFE" />
      <path d="M22 44V20H42V26H29V30H39V36H29V44H22Z" fill="#0F2A56" />
      <circle cx="44" cy="40" r="6" fill="#1D4ED8" />
      <path
        d="M41.5 40L43.2 41.7L46.8 38.1"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'road' | 'lamp' | 'drain' | 'shelter' | 'avatar' | 'city';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'road',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    if (fallbackType === 'avatar') {
      return (
        <div
          className={`flex items-center justify-center bg-light-blue text-primary-navy ${className}`}
          role="img"
          aria-label={alt}
        >
          <User className="w-1/2 h-1/2" />
        </div>
      );
    }

    if (fallbackType === 'city') {
      return (
        <div
          className={`bg-gradient-to-br from-primary-navy via-[#173B75] to-primary ${className}`}
          aria-hidden="true"
        />
      );
    }

    const iconMap = {
      road: Construction,
      lamp: Lightbulb,
      drain: Droplets,
      shelter: MapPin,
    };
    const IconComp = iconMap[fallbackType] || ShieldCheck;

    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-navy via-[#1A3E7A] to-primary text-light-blue ${className}`}
        role="img"
        aria-label={alt}
      >
        <IconComp className="w-8 h-8 opacity-85" />
        <span className="text-xs font-medium opacity-80 px-4 text-center line-clamp-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
