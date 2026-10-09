'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Globe2, Sprout, Sun, Wrench } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { COMPANY_INFO } from '@/data/company';

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleOpenConsultation = (division?: string) => {
    void division;
    setIsConsultationOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFBF9] text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      <Navbar onOpenConsultation={handleOpenConsultation} />

      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-emerald-800">
              <span className="h-px w-8 bg-amber-500" />
              TDS Agro Producer Company Limited
            </p>
            <h1 id="story-title" className="max-w-2xl font-display text-5xl font-bold leading-[1.04] text-forest-950 sm:text-6xl lg:text-7xl">
              Rooted in the land. Growing with purpose.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              From our home in Fatehpur, Uttar Pradesh, we bring agriculture, global trade, clean energy and farm technology together to support a more connected future for farming communities.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#our-story" className="inline-flex items-center gap-2 text-sm font-bold text-forest-900 transition-colors hover:text-amber-700">
                Discover our story <ArrowDownRight className="h-4 w-4" />
              </a>
              <Link href="/group-companies" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-forest-900">
                Meet the group <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            className="relative min-h-[420px] overflow-hidden sm:min-h-[560px] lg:col-span-6"
          >
            <Image
              src="/farmer partnersship and cooperative buyback.jpeg"
              alt="Farmer in a cultivated field with a solar-powered farmhouse in the background"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[42%_center]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent px-6 pb-6 pt-20 text-sm font-semibold text-white sm:px-8 sm:pb-8">
              Grounded in Fatehpur. Connected to a wider world.
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <section id="our-story" className="border-y border-emerald-950/10 bg-[#F0F4EC] py-16 sm:py-24" aria-labelledby="journey-title">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase text-emerald-800">A company built around agriculture</p>
            <h2 id="journey-title" className="mt-4 font-display text-3xl font-bold leading-tight text-forest-950 sm:text-5xl">
              One purpose, connected across many fields.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-700 lg:col-span-6 lg:col-start-7">
            <p>
              TDS AGRO is the parent enterprise behind a connected set of businesses. Agriculture is our foundation; imports and exports connect products with markets, while solar energy and modern machinery help communities access practical tools for growth.
            </p>
            <p>
              We work from Fatehpur and across Uttar Pradesh with a long view: build reliable relationships, make useful solutions easier to reach, and keep progress grounded in the needs of the people and places we serve.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-16 text-white sm:py-20" aria-labelledby="purpose-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase text-amber-300">What guides us</p>
              <h2 id="purpose-title" className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
                Progress that starts close to home.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-emerald-50/80 lg:col-span-6 lg:col-start-7">
              We bring people, products and infrastructure together around the realities of agriculture, creating room for stronger local communities and more sustainable growth.
            </p>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
            <div className="border-l-2 border-emerald-400 pl-5">
              <Sprout className="h-5 w-5 text-emerald-300" />
              <h3 className="mt-4 text-lg font-bold">Agriculture first</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">Farmer partnerships and responsible production at the heart of our work.</p>
            </div>
            <div className="border-l-2 border-amber-400 pl-5">
              <Globe2 className="h-5 w-5 text-amber-300" />
              <h3 className="mt-4 text-lg font-bold">Connected markets</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">Trade that connects local capabilities with opportunities beyond our region.</p>
            </div>
            <div className="border-l-2 border-cyan-300 pl-5">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-cyan-200" />
                <Wrench className="h-5 w-5 text-cyan-200" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Useful innovation</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">Energy and equipment chosen to solve real needs for farms and businesses.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-label="TDS Agro at a glance">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-bold uppercase text-emerald-800">Our reach today</p>
          <div className="mt-7 grid grid-cols-2 gap-y-8 border-y border-slate-200 py-8 sm:grid-cols-4 sm:divide-x sm:divide-slate-200">
            {COMPANY_INFO.stats.map((stat) => (
              <div key={stat.label} className="sm:px-6 first:sm:pl-0">
                <p className="font-display text-3xl font-bold text-forest-950 sm:text-4xl">{stat.value}</p>
                <p className="mt-2 max-w-36 text-xs leading-5 text-slate-600 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <MobileBottomBar onOpenConsultation={handleOpenConsultation} />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        divisionInterest="General"
      />
    </main>
  );
}
