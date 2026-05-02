import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[40px] md:text-[64px] font-bold tracking-tight mb-4">
            Contact Apple.
          </h1>
          <p className="text-[19px] md:text-[21px] text-[#86868b] max-w-[600px] mx-auto">
            We're here to help. Reach out to us for support, sales, or any other inquiries regarding your MacBook Pro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {/* Contact Cards */}
          <div className="bg-[#1c1c1e] p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2c2c2e] rounded-full flex items-center justify-center mb-6">
              <Phone size={24} className="text-blue-500" />
            </div>
            <h3 className="text-[21px] font-semibold mb-2">Phone Support</h3>
            <p className="text-[#86868b] mb-4">Available Mon-Fri, 8am-8pm.</p>
            <a href="tel:1-800-MY-APPLE" className="text-blue-500 hover:underline">1-800-MY-APPLE</a>
          </div>

          <div className="bg-[#1c1c1e] p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2c2c2e] rounded-full flex items-center justify-center mb-6">
              <MapPin size={24} className="text-blue-500" />
            </div>
            <h3 className="text-[21px] font-semibold mb-2">Apple Store</h3>
            <p className="text-[#86868b] mb-4">Find an Apple Store near you.</p>
            <a href="#" className="text-blue-500 hover:underline">Find a store</a>
          </div>

          <div className="bg-[#1c1c1e] p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2c2c2e] rounded-full flex items-center justify-center mb-6">
              <Mail size={24} className="text-blue-500" />
            </div>
            <h3 className="text-[21px] font-semibold mb-2">Email Support</h3>
            <p className="text-[#86868b] mb-4">Send us your questions anytime.</p>
            <a href="mailto:support@apple.com" className="text-blue-500 hover:underline">Email us</a>
          </div>
        </div>

        {/* Email Form */}
        <div className="bg-[#1c1c1e] rounded-3xl p-8 md:p-12 max-w-[700px] mx-auto border border-white/10 shadow-2xl">
          <h2 className="text-[32px] font-bold mb-2">Send us a message</h2>
          <p className="text-[#86868b] mb-8">Fill out the form below and it will launch your email client to send us your message directly.</p>
          
          <form 
            action="mailto:support@apple.com" 
            method="post" 
            encType="text/plain" 
            className="flex flex-col gap-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-[#86868b]">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  placeholder="John Appleseed"
                  className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-[#86868b]">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  placeholder="john@example.com"
                  className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium text-[#86868b]">Subject</label>
              <select 
                name="subject" 
                id="subject"
                className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="MacBook Pro Support">MacBook Pro Support</option>
                <option value="Sales Inquiry">Sales Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-[#86868b]">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows={5}
                required
                placeholder="How can we help you today?"
                className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              className="mt-4 bg-white text-black font-semibold py-4 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
