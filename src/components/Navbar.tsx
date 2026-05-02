'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Apple } from 'lucide-react';

const navLinks = [
  { name: 'Overview', href: '/#overview' },
  { name: 'Features', href: '/#features' },
  { name: 'Design', href: '/#design' },
  { name: 'Tech Specs', href: '/#specs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Link href="/" className="fixed top-9 left-8 z-50 text-white hover:text-white/80 transition-colors">
        <Apple size={22} fill="currentColor" />
      </Link>

      <div className="fixed top-8 left-0 w-full flex justify-center z-50 px-4">
        <nav 
          className="relative flex items-center bg-[#eaeaea] rounded-full px-1.5 py-1.5 shadow-sm"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((item, index) => (
            <Link 
              key={item.name}
              href={item.href}
              className="relative px-3 md:px-5 py-2 rounded-full outline-none group"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-black rounded-full shadow-md"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                />
              )}
              <span 
                className={`relative z-10 flex items-center gap-1 text-[12px] md:text-[14px] font-medium transition-colors tracking-tight ${
                  hoveredIndex === index ? 'text-white' : 'text-[#333333]'
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
