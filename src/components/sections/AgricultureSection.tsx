'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sprout,
  CheckCircle2,
  ChevronDown,
  TrendingUp,
  Warehouse,
  ShieldCheck,
  FlaskConical,
  Handshake,
  Cpu,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AGRICULTURE_SOLUTIONS, AGRICULTURE_STATS } from '@/data/agriculture';

export const AgricultureSection: React.FC = () => {
  const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(() => new Set());

  const getAgroIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-amber-600" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5 text-blue-600" />;
      case 'Warehouse':
        return <Warehouse className="w-5 h-5 text-purple-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-600" />;
      default:
        return <Sprout className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="agriculture" className="py-20 sm:py-28 bg-white text-slate-900 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            eyebrow="TDS AGRO PRODUCER COMPANY LIMITED • CORE DIVISION 01"
            title="AGRICULTURE & FARM SOLUTIONS."
            description="Leading agricultural productivity across Uttar Pradesh through certified high-yield crops, organic bio-nutrients, contract farming buybacks, and modern cold-chain infrastructure."
            theme="light"
            align="left"
            className="mb-0"
          />

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">15,000+ REGISTERED FARMER PARTNERS</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {AGRICULTURE_STATS.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm text-center"
            >
              <span className="text-2xl sm:text-3xl font-black font-display text-emerald-700 block">
                {st.value}
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mt-1">
                {st.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Agriculture Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 items-start gap-6 sm:gap-8">
          {AGRICULTURE_SOLUTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group lg:col-span-2 ${idx === 3 ? 'lg:col-start-2' : ''} ${idx === 4 ? 'lg:col-start-4' : ''}`}
            >
              {/* Image banner */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="font-bold">{item.yieldBenefit}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      {getAgroIcon(item.iconName)}
                    </div>
                    <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {expandedCardIds.has(item.id) && <div id={`${item.id}-details`} className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>}
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    aria-expanded={expandedCardIds.has(item.id)}
                    aria-controls={`${item.id}-details`}
                    onClick={() => setExpandedCardIds((current) => {
                      const next = new Set(current);
                      if (next.has(item.id)) next.delete(item.id);
                      else next.add(item.id);
                      return next;
                    })}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900 hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  >
                    More info
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCardIds.has(item.id) ? 'rotate-180' : ''}`} />
                  </button>

                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                    UP FARM BELT
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
