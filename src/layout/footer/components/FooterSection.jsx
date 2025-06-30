import React from 'react';
import { Link } from 'react-router-dom';

export const FooterSection = ({ title, links }) => {
  return (
    <div className="w-full sm:w-auto">
      <h3 className="text-[#4E3B26] font-medium mb-5 text-lg relative inline-block">
        {title}
        <div className="w-full h-0.5 bg-[#C5A05C]/30 absolute -bottom-2 left-0"></div>
      </h3>
      <ul className="space-y-3 mt-8">
        {links.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path}
              className="text-[#4E3B26]/70 hover:text-[#C5A05C] transition-all duration-300 text-sm group flex items-center py-1.5 px-1 hover:pl-2 rounded-md hover:bg-[#C5A05C]/[0.03]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A05C]/30 mr-2.5 group-hover:bg-[#C5A05C] group-hover:w-2 group-hover:h-2 transition-all duration-300"></span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}; 