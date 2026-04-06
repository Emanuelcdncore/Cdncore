'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const PRODUCTS = [
  {
    id: 'CDNMonitor',
    name: 'CDNMonitor',
    description: 'Real-time infrastructure monitoring and alerting platform.',
  },
  {
    id: 'Ai-Accountant',
    name: 'Ai-Accountant',
    description: 'AI-powered autonomous accounting and financial management.',
  },
];

export default function RequestDemoForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedProducts.length) return;

    setStatus('sending');
    setErrorMsg('');

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      company: form.get('company'),
      message: form.get('message'),
      products: selectedProducts,
    };

    try {
      const res = await fetch(`${bp}/api/request-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }

      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-800 px-4">
        <div className="glass-card rounded-2xl p-12 text-center max-w-md w-full">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Sent</h2>
          <p className="text-slate-500 mb-6">
            We&apos;ll get back to you shortly with demo details.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center text-slate-800 px-4 py-12">
      {/* Header logos */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <a href="https://cdncore.eu" target="_blank" rel="noopener noreferrer">
          <Image src={`${bp}/logos/cdncore1.png`} alt="CDN Core" width={120} height={48} unoptimized className="opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://cdntv.eu" target="_blank" rel="noopener noreferrer">
          <Image src={`${bp}/logos/cdntv1.png`} alt="CDN TV" width={120} height={48} unoptimized className="opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://cdntek.eu" target="_blank" rel="noopener noreferrer">
          <Image src={`${bp}/logos/cdntek1.png`} alt="CDN Tek" width={120} height={48} unoptimized className="opacity-60 hover:opacity-100 transition-opacity" />
        </a>
      </div>

      <div className="w-full max-w-2xl flex-1">
        <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-slate-600 transition-colors mb-8">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Request a Demo
        </h1>
        <p className="text-slate-500 mb-10">
          Select the products you&apos;re interested in and we&apos;ll reach out to schedule a demo.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Product selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Select Products <span className="text-red-400">*</span>
            </label>
            <div className="grid gap-3">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  className={`glass-card rounded-xl p-5 text-left transition-all ${
                    selectedProducts.includes(product.id)
                      ? 'border-2 border-slate-900 bg-white shadow-md'
                      : 'border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-sm text-slate-500 mt-1">{product.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                      selectedProducts.includes(product.id)
                        ? 'bg-slate-900 border-slate-900'
                        : 'border-slate-300'
                    }`}>
                      {selectedProducts.includes(product.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {selectedProducts.length === 0 && status === 'error' && (
              <p className="text-red-500 text-sm mt-2">Please select at least one product.</p>
            )}
          </div>

          {/* Contact fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Work Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
            />
          </div>

          {status === 'error' && errorMsg && (
            <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending' || selectedProducts.length === 0}
            className="w-full py-3 px-6 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'sending' ? 'Sending...' : 'Request Demo'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 mt-12 text-slate-400 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} CDN Global Group. All rights reserved.</p>
      </footer>
    </div>
  );
}
