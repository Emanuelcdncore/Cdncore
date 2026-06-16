'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import CustomMap from './CustomMap';
import './css/Footer.css';

const bp = process.env.BASE_PATH || '';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (path: string, sectionId?: string) => {
    if (pathname === path) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (sectionId) {
        router.push(`${path}#${sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        router.push(path);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    }
  };

  const handleClick = (e: React.MouseEvent, path: string, sectionId?: string) => {
    e.preventDefault();
    goTo(path, sectionId);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.services', 'SERVICES')}</h3>
          <a href="/services" onClick={(e) => handleClick(e, '/services')}>{t('footer.cybersecurity', 'Cybersecurity')}</a>
          <a href="/services" onClick={(e) => handleClick(e, '/services')}>{t('footer.ai_solutions', 'AI Solutions')}</a>
          <a href="https://cdntv.eu/about#team" target="_blank" rel="noopener noreferrer">{t('footer.designers', 'Designers')}</a>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.company', 'COMPANY')}</h3>
          <a href="/commitments" onClick={(e) => handleClick(e, '/commitments')}>{t('footer.commitments', 'Commitments')}</a>
          <a href="/commitments#mission" onClick={(e) => handleClick(e, '/commitments', 'mission')}>{t('footer.mission', 'Mission')}</a>
          <a href="/commitments#team" onClick={(e) => handleClick(e, '/commitments', 'team')}>{t('footer.team', 'Team')}</a>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.legal', 'LEGAL')}</h3>
          <a href="/privacy-policy" onClick={(e) => handleClick(e, '/privacy-policy')}>{t('footer.privacy_policy', 'Privacy Policy')}</a>
          <a href="/terms-of-service" onClick={(e) => handleClick(e, '/terms-of-service')}>{t('footer.terms_of_service', 'Terms of Service')}</a>
          <a href="/cookies-policy" onClick={(e) => handleClick(e, '/cookies-policy')}>{t('footer.cookies_policy', 'Cookies Policy')}</a>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.contacts', 'CONTACTS')}</h3>
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
        <div className="footer-prr-banner" style={{ padding: '24px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
          <Image
            src={`${bp}/footer.webp`}
            alt="PRR - República Portuguesa - Financiado pela União Europeia"
            width={600}
            height={40}
            unoptimized
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          <a href={`${bp}/estagios-profissionais`}>
            <Image
              src={`${bp}/assets/footer-iefp.png`}
              alt="IEFP - Pessoas 2030 - Portugal 2030 - Cofinanciado pela União Europeia"
              width={600}
              height={130}
              unoptimized
              style={{ height: '130px', width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
            />
          </a>
        </div>
        <div className="footer-bottom-separator"></div>
        <div className="footer-copyright-row">
          <div className="footer-copyright">
            {t('footer.copyright', 'Copyright © CDNCORE - AI Agent & Software Services {{year}}. All rights reserved.', { year: new Date().getFullYear() })}
          </div>
          <button
            className="footer-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('footer.scroll_top', 'Scroll to top')}
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
