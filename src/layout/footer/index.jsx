import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, SOCIAL_LINKS } from './constants';
import { FooterSection } from './components/FooterSection';
import { Newsletter } from './components/Newsletter';
import { SocialLinks } from './components/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FAF7F2] to-white border-t border-[#C5A05C]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Background pattern applied as a CSS background to avoid blocking clicks */}
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block group">
              <span className="text-[#4E3B26] text-3xl font-serif italic group-hover:text-[#C5A05C] transition-colors duration-300">
                SOFDECO
              </span>
              <div className="w-12 h-0.5 bg-[#C5A05C]/30 mt-2 mb-6 group-hover:bg-[#C5A05C] transition-colors duration-300" />
            </Link>
            <p className="text-[#4E3B26]/80 mt-4 text-sm max-w-md leading-relaxed">
              Découvrez notre collection de meubles modernes et d'articles de décoration. 
              Transformez votre espace avec nos pièces intemporelles et nos conseils d'experts en design.
            </p>
            <Link to="/products" className="inline-flex items-center mt-4 text-[#C5A05C] hover:text-[#4E3B26] transition-colors duration-300 text-sm font-medium group">
              <span>Explorer notre collection</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <div className="mt-8">
              <SocialLinks links={SOCIAL_LINKS} />
            </div>
          </div>

          {/* Footer Sections */}
          <FooterSection title="Navigation" links={FOOTER_LINKS.company} />
          <FooterSection title="Assistance" links={FOOTER_LINKS.support} />
          <FooterSection title="Légal" links={FOOTER_LINKS.legal} />
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[#C5A05C]/10 pt-12">
          <Newsletter />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C5A05C]/10 mt-12 pt-8 flex justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-[#4E3B26]/70 text-sm">
              © {new Date().getFullYear()} SOFDECO. Tous droits réservés.
            </p>
            <div className="flex gap-3">
              <Link to="/privacy" className="text-[#C5A05C] hover:text-[#4E3B26] text-xs transition-colors">Confidentialité</Link>
              <span className="text-[#C5A05C]/30 text-xs">|</span>
              <Link to="/terms" className="text-[#C5A05C] hover:text-[#4E3B26] text-xs transition-colors">Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer; 