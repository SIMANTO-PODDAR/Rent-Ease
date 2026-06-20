import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaSquareXTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Browse Properties', href: '/all-properties' },
    { name: 'How It Works', href: '/' },
    { name: 'About Us', href: '/' },
    { name: 'Latest News', href: '/' },
    { name: 'List a Property', href: '/' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/' },
    { name: 'Contact Us', href: '/' },
    { name: 'Privacy Policy', href: '/' },
    { name: 'Terms of Service', href: '/' },
    { name: 'FAQs', href: '/' },
  ];

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 border-t border-zinc-900 overflow-hidden">
      {/* Decorative Top Accent Gradient Bar */}
      <div className="h-0.5 w-full bg-linear-to-r from-blue-600 via-violet-600 to-indigo-600"></div>

      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/RentEaseLogo.png"
                alt="RentEase Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain dark:brightness-100 brightness-0 invert"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-xs">
              RentEase makes finding, viewing, and leasing your next home effortless. Discover premium properties with confidence and flexible rental terms.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-300 border border-zinc-800/80 hover:border-zinc-700"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-[1.5px] bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Column */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-[1.5px] bg-violet-500 mr-0 group-hover:mr-2 transition-all duration-300 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-6">
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
                Contact & Newsletter
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3 text-zinc-400">
                  <MapPin className="w-4 h-4 mt-0.5 text-zinc-500 shrink-0" />
                  <span>100 RentEase Plaza, Suite 500, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                  <a href="tel:+18005550199" className="hover:text-white transition-colors">+1 (800) 555-0199</a>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                  <a href="mailto:info@rentease.com" className="hover:text-white transition-colors">info@rentease.com</a>
                </div>
              </div>
            </div>

            {/* Static Newsletter Input */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-500">Subscribe to listings & updates</p>
              <div className="flex items-center relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-1 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all duration-200"
                  aria-label="Subscribe"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-zinc-900/80 my-8"></div>

        {/* Bottom copyright section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} RentEase. All rights reserved. Designed with passion for a better renting experience.
          </p>
          <div className="flex space-x-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;