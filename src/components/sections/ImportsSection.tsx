'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Lightbulb,
  Armchair,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IMPORT_CATEGORIES, getImportProductByNameOrId } from '@/data/imports';
import { Button } from '@/components/ui/Button';
import { ImportProductModal } from '@/components/ui/ImportProductModal';
import { ImportProductItem } from '@/types';

const FURNITURE_SUBCATEGORIES = [
  {
    id: 'home',
    label: 'Home',
    category: 'Home Furniture',
    title: 'Comfortable Furniture for Every Home',
    description: 'Living, dining, and bedroom furniture designed to make everyday spaces comfortable and welcoming.',
    productRange: ['Sofa sets', 'Lounge chairs', 'Coffee tables', 'Dining furniture', 'Cabinets'],
    image: '/Interactive furniture gallery.png',
  },
  {
    id: 'office',
    label: 'Office',
    category: 'Office Furniture',
    title: 'Furniture for Modern Workspaces',
    description: 'Functional desks, ergonomic seating, and storage for focused work and collaborative offices.',
    productRange: ['Work desks', 'Executive desks', 'Office chairs', 'Conference tables', 'Storage units'],
    image: '/Interactive furniture gallery (3).png',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    category: 'Commercial Furniture',
    title: 'Furniture for Commercial Spaces',
    description: 'Durable, coordinated furniture for restaurants, hospitality venues, reception areas, and shared spaces.',
    productRange: ['Restaurant seating', 'Dining tables', 'Lounge furniture', 'Reception seating', 'Hospitality sets'],
    image: '/Interactive furniture gallery (2).png',
  },
];

interface ImportsSectionProps {
  onOpenConsultation?: (category?: string) => void;
}

export const ImportsSection: React.FC<ImportsSectionProps> = ({ onOpenConsultation }) => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [activeFurnitureIdx, setActiveFurnitureIdx] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ImportProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const currentCategory = IMPORT_CATEGORIES[activeCategoryIdx];
  const currentFurnitureSubcategory = FURNITURE_SUBCATEGORIES[activeFurnitureIdx];
  const currentDisplay = currentCategory.id === 'furniture'
    ? { ...currentCategory, ...currentFurnitureSubcategory }
    : currentCategory;

  const handleProductClick = (productName: string) => {
    const product = getImportProductByNameOrId(productName);
    if (product) {
      setSelectedProduct(product);
      setIsProductModalOpen(true);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-blue-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-500" />;
      default:
        return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <section id="imports" className="py-20 sm:py-28 bg-[#FAFBF9] text-slate-900 relative overflow-hidden border-t border-slate-200/60 os-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            eyebrow="TDS AGRO PRODUCER COMPANY LIMITED • SUBSIDIARY DIVISION 02"
            title="GLOBAL IMPORTS DIVISION."
            description="A visual catalogue of broad import categories, curated for homes, businesses, institutions, and infrastructure projects."
            theme="light"
            align="left"
            className="mb-0"
          />

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-blue-800 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold">4 CORE PRODUCT CATEGORIES</span>
          </div>
        </div>

        {/* 4 Category Filter Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {IMPORT_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategoryIdx;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryIdx(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex items-center gap-3 ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-[1.02]'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                >
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase block opacity-75">
                    CATEGORY 0{idx + 1}
                  </span>
                  <span className="text-sm font-bold font-display truncate block">
                    {cat.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {currentCategory.id === 'furniture' && (
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Furniture type">
            {FURNITURE_SUBCATEGORIES.map((subcategory, idx) => {
              const isSelected = idx === activeFurnitureIdx;

              return (
                <button
                  key={subcategory.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveFurnitureIdx(idx)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${isSelected
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700'
                    }`}
                >
                  {subcategory.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Category Visual Stage */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentDisplay.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Category image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                <img
                  src={currentDisplay.image}
                  alt={currentDisplay.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-amber-400 block">
                    VERIFIED IMPORT
                  </span>
                  <span className="text-lg font-bold font-display uppercase tracking-tight block">
                    {currentDisplay.category} Line
                  </span>
                </div>
              </div>
            </div>

            {/* Category summary */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider">
                  {currentDisplay.category} RANGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-2 uppercase">
                  {currentDisplay.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentDisplay.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>PRODUCTS INCLUDED (CLICK FOR PREVIEW)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase hidden sm:inline">
                    Click item to open specs
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentDisplay.productRange.map((product) => (
                    <button
                      key={product}
                      type="button"
                      onClick={() => handleProductClick(product)}
                      className="group px-3.5 py-2 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-sm text-slate-700 hover:text-blue-700 flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer text-left"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-medium">{product}</span>
                      <span className="text-[10px] font-mono text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  Further product details, quantities, and sourcing options can be discussed when preparing your quotation.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    onOpenConsultation ? onOpenConsultation(`Imports: ${currentDisplay.category}`) : (window.location.href = '/#contact')
                  }
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold text-xs"
                >
                  Request Quotation for {currentDisplay.category}
                </Button>

                <div className="text-xs font-mono text-slate-500 font-medium">
                  ISO 9001 & CE Compliance Guaranteed
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Product Details Lightbox/Modal */}
      <ImportProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
};
