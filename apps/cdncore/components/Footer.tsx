'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CustomMap from './CustomMap';
import './css/Footer.css';

const bp = process.env.BASE_PATH || '';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string, path: string = '/') => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.location.href = `${path}#${sectionId}`;
      } else {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="footer-title">SERVICES</h3>
          <a href="/#cybersecurity" onClick={(e) => { e.preventDefault(); scrollToSection('cybersecurity'); }}>Cybersecurity</a>
          <a href="/#ai-solutions" onClick={(e) => { e.preventDefault(); scrollToSection('ai-solutions'); }}>AI Solutions</a>
          <a href="https://cdntv.eu/about#team" target="_blank" rel="noopener noreferrer">Designers</a>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">COMPANY</h3>
          <Link href="/commitments">Commitments</Link>
          <a href="/commitments#mission" onClick={(e) => { e.preventDefault(); scrollToSection('mission', '/commitments'); }}>Mission</a>
          <a href="/commitments#team" onClick={(e) => { e.preventDefault(); scrollToSection('team', '/commitments'); }}>Team</a>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">LEGAL</h3>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/cookies-policy">Cookies Policy</Link>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">CONTACTS</h3>
          <span>Parkurbis</span>
          <span>Parque da Ciência e Tecnologia da Covilhã</span>
          <span>6200-865 Covilhã</span>
          <a href="tel:+351275959168">Phone +351 275 959 168</a>
        </div>
      </div>

      <div className="footer-map-row">
        <CustomMap />
      </div>

      <div className="footer-bottom">
        <div className="footer-logo-bottom">
          <Image
            src={`${bp}/assets/logos/CDNCORE-03_footer.png`}
            alt="CDNCORE Logo"
            className="footer-logo-bottom-img"
            width={400}
            height={230}
            unoptimized
          />
        </div>
        <div className="footer-prr-banner" style={{ padding: '24px 0' }}>
          <Image
            src={`${bp}/footer.webp`}
            alt="PRR - República Portuguesa - Financiado pela União Europeia"
            width={1200}
            height={100}
            unoptimized
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div className="footer-bottom-separator"></div>
        <div className="footer-copyright-row">
          <div className="footer-copyright">
            Copyright © CDNCORE - AI Agent &amp; Drone Services {new Date().getFullYear()}. All rights reserved.
          </div>
          <button
            className="footer-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="footerArrowGradient" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c3aed" />
                  <stop offset="0.5" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="15" stroke="url(#footerArrowGradient)" strokeWidth="2" fill="#22313a" />
              <polyline points="10,18 16,12 22,18" stroke="url(#footerArrowGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
