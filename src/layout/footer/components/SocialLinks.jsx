import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP
} from 'react-icons/fa';

const ICON_MAP = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  pinterest: FaPinterestP,
};

export const SocialLinks = ({ links }) => {
  return (
    <div className="flex gap-5">
      {links.map((link) => {
        const Icon = ICON_MAP[link.icon];
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#C5A05C]/20 flex items-center justify-center text-[#4E3B26]/70 hover:bg-[#C5A05C] hover:border-[#C5A05C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transform group relative overflow-hidden"
            aria-label={link.label}
          >
            <span className="absolute inset-0 bg-[#C5A05C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            <Icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 group-hover:-bottom-5 transition-all duration-300 text-[10px] font-medium text-white pointer-events-none">{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}; 