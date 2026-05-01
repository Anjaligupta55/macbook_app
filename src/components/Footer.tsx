import Link from 'next/link';
import { Apple } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Shop and Learn',
      links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'AirTag', 'Accessories', 'Gift Cards']
    },
    {
      title: 'Apple Wallet',
      links: ['Wallet', 'Apple Card', 'Apple Pay', 'Apple Cash']
    },
    {
      title: 'Account',
      links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com']
    },
    {
      title: 'Entertainment',
      links: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store']
    },
    {
      title: 'About Apple',
      links: ['Newsroom', 'Apple Leadership', 'Career Opportunities', 'Investors', 'Ethics & Compliance', 'Events', 'Contact Apple']
    }
  ];

  return (
    <footer id="contact" className="bg-[#1d1d1f] text-[#86868b] text-[12px] py-10 px-6 border-t border-white/10 relative z-10">
      <div className="max-w-[980px] mx-auto">
        <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4 mb-4">
          <p>
            1. 1GB = 1 billion bytes and 1TB = 1 trillion bytes; actual formatted capacity less.
          </p>
          <p>
            Testing conducted by Apple in September and October 2023 using preproduction 16-inch MacBook Pro systems with Apple M3 Max.
          </p>
        </div>

        <div className="hidden md:flex justify-between pb-8">
          {footerLinks.map((column, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="text-[#f5f5f7] font-semibold mb-1">{column.title}</h3>
              {column.links.map((link, j) => (
                <Link key={j} href="#" className="hover:text-[#f5f5f7] transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Accordion Placeholder (Simplified for demo) */}
        <div className="md:hidden flex flex-col gap-2 pb-8 border-b border-white/10">
          {footerLinks.map((column, i) => (
            <div key={i} className="py-2 border-b border-white/10 text-[#f5f5f7] font-semibold">
              {column.title} <span className="float-right">+</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <div className="flex items-center gap-4">
            <Apple size={16} fill="currentColor" />
            <span>Copyright © 2026 Apple Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#f5f5f7]">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-[#f5f5f7]">Terms of Use</Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-[#f5f5f7]">Sales and Refunds</Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-[#f5f5f7]">Legal</Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-[#f5f5f7]">Site Map</Link>
          </div>
          <div>United States</div>
        </div>
      </div>
    </footer>
  );
}
