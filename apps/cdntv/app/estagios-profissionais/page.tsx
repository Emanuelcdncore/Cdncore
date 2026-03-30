import type { Metadata } from "next";
import React from 'react';
import Image from 'next/image';
import '@/components/css/LegalPages.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Estágios Profissionais",
  description:
    "CDNTV professional internships programme supported by IEFP and the European Social Fund, promoting youth employment and professional reconversion.",
  alternates: { canonical: "/estagios-profissionais" },
};

const bp = process.env.BASE_PATH || '';

const cardStyle: React.CSSProperties = {
  background: 'rgba(242, 142, 18, 0.08)',
  border: '1px solid rgba(242, 142, 18, 0.2)',
  borderRadius: '10px',
  padding: '20px 24px',
};

export default function EstagiosProfissionais() {
  return (
    <>
      <Navigation />
      <div className="legal-page" style={{ paddingTop: '220px' }}>
        <div className="legal-container" style={{ position: 'relative' }}>

          {/* Green icon - top right */}
          <Image
            src={`${bp}/green.png`}
            alt=""
            width={120}
            height={120}
            unoptimized
            style={{ position: 'absolute', top: '0', right: '0px', width: '120px', height: 'auto', opacity: 0.7 }}
          />

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <Image
              src={`${bp}/footer-iefp.png`}
              alt="IEFP - Pessoas 2030 - Portugal 2030 - Cofinanciado pela União Europeia"
              width={800}
              height={250}
              unoptimized
              style={{ width: '100%', maxWidth: '700px', minHeight: '180px' }}
            />
          </div>

          {/* Header card */}
          {/* Header card + image */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div style={{ ...cardStyle, flex: '1 1 300px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontSize: '28px', marginBottom: '8px', background: 'linear-gradient(90deg, #F28E12 0%, #DA1D5D 50%, #FF814B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ESTÁGIOS PROFISSIONAIS</h1>
              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #F28E12, #DA1D5D)', margin: '0 auto 12px' }} />
              <p style={{ color: '#c9d1d9', fontSize: '15px', marginBottom: '4px' }}>INSTITUTO DO EMPREGO E FORMAÇÃO PROFISSIONAL, I.P.</p>
              <p style={{ color: '#8b949e', fontSize: '14px', margin: 0 }}>Centro</p>
            </div>
            <div style={{ flex: '0 1 280px', borderRadius: '10px', overflow: 'hidden' }}>
              <Image
                src={`${bp}/estagios-image.png`}
                alt="Estágios Profissionais"
                width={400}
                height={250}
                unoptimized
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>

          {/* Prioridade */}
          <div className="legal-content">
            <h2>Prioridade</h2>
          </div>

          {/* Content card + QR code */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ ...cardStyle, flex: '1 1 400px' }}>
              <h3 style={{ color: '#f0f6fc', fontSize: '18px', fontWeight: 600, marginBottom: '16px', lineHeight: 1.5 }}>
                4A. Mais e melhor emprego, conciliação da vida profissional e pessoal e igualdade de género
              </h3>
              <p style={{ color: '#c9d1d9', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                A Operação insere-se na Tipologia Estágios Profissionais, possibilitando, aos jovens, a realização de uma experiência prática em contexto de trabalho, promovendo a sua integração no mercado de trabalho, assim como, a reconversão profissional de desempregados.
              </p>
              <p style={{ color: '#c9d1d9', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                Constituem-se como objetivos especificos (ESO4.1.), melhorar o acesso ao emprego e a medidas de ativação de todos os candidatos a emprego, em especial os jovens, sobretudo através da implementação da Garantia para a Juventude, dos desempregados de longa duração e grupos desfavorecidos no mercado de trabalho, e das pessoas inativas, bem como promover o emprego por conta própria e a economia social.
              </p>
              <p style={{ color: '#c9d1d9', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
                A execução da Operação decorre no período de <strong style={{ color: '#f0f6fc' }}>01-01-2023</strong> a <strong style={{ color: '#f0f6fc' }}>31-12-2025</strong>, e prevê abranger <strong style={{ color: '#f0f6fc' }}>12.520 pessoas desempregadas</strong> inscritas nos Serviços de Emprego do IEFP, I.P. Para atingir estes resultados destaca-se o apoio do <strong style={{ color: '#f0f6fc' }}>Fundo Social Europeu mais (FSE+)</strong>.
              </p>
            </div>

            {/* QR Code + link + reference */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <a href="https://iefp.pt" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`${bp}/qrcode.png`}
                  alt="QR Code IEFP"
                  width={120}
                  height={120}
                  unoptimized
                  style={{ width: '120px', height: '120px', borderRadius: '8px' }}
                />
              </a>
              <a href="https://iefp.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#F28E12', fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}>
                iefp.pt
              </a>
              <div style={{ ...cardStyle, padding: '8px 14px', textAlign: 'center' }}>
                <p style={{ color: '#8b949e', fontSize: '11px', margin: 0, letterSpacing: '0.5px' }}>
                  ALT20-01-08B9-FEDER-049179
                </p>
              </div>
            </div>
          </div>

          {/* Red icon - bottom left */}
          <Image
            src={`${bp}/red.png`}
            alt=""
            width={120}
            height={120}
            unoptimized
            style={{ position: 'absolute', bottom: '0', left: '-60px', width: '120px', height: 'auto', opacity: 0.7 }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
