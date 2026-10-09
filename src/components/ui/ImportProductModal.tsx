'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Layers,
  Cpu,
  Building2,
} from 'lucide-react';
import { ImportProductItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { COMPANY_INFO } from '@/data/company';

interface ImportProductModalProps {
  product: ImportProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: (productName?: string) => void;
}

export const ImportProductModal: React.FC<ImportProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleInquire = () => {
    onClose();
    if (onOpenConsultation) {
      onOpenConsultation(`Imports: ${product.name} (${product.category})`);
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-product-title"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-mono font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="hidden sm:inline text-xs font-mono text-slate-500">
                  TDS AGRO • IMPORTS CATALOGUE
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200/80 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Product Image Column */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-amber-400 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Direct Import</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-mono text-amber-400 font-bold block uppercase tracking-wider">
                        {product.category} Line
                      </span>
                      <h4 className="text-base font-bold font-display uppercase tracking-tight">
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  {/* Certifications & Quality guarantee */}
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-blue-900 block font-mono uppercase text-[10px]">
                        Quality Verified
                      </span>
                      100% factory tested, internationally certified & compliant with Indian standards.
                    </div>
                  </div>
                </div>

                {/* Product Details Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <h3
                      id="import-product-title"
                      className="text-2xl sm:text-3xl font-black font-display text-slate-900 uppercase tracking-tight"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono font-bold text-blue-700 mt-1 uppercase">
                      {product.headline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-2.5">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Specifications Grid */}
                  {product.keySpecs && product.keySpecs.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" />
                        <span>Technical Specifications</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.keySpecs.map((spec) => (
                          <div
                            key={spec.label}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                          >
                            <span className="text-[10px] font-mono uppercase text-slate-500 block">
                              {spec.label}
                            </span>
                            <span className="text-xs font-bold font-mono text-slate-900 mt-0.5 block">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>Key Highlights & Engineering Features</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {product.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Applications */}
                  {product.applications && product.applications.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Recommended Applications</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {product.applications.map((app) => (
                          <span
                            key={app}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Direct Line:</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {COMPANY_INFO.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={COMPANY_INFO.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleInquire}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold text-xs flex-1 sm:flex-initial"
                >
                  Request Bulk Quotation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
