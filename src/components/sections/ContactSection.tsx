'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANY_INFO } from '@/data/company';
import { submitLeadToGoogleForm } from '@/lib/googleForm';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [selectedProductOption, setSelectedProductOption] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Fatehpur',
    divisionInterest: 'General',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Format message with selected categories and products
      const categoryContext = [
        subCategory ? `Category/Subdivision: ${subCategory}` : null,
        selectedProductOption ? `Selected Product Range: ${selectedProductOption}` : null,
        form.message ? `Notes: ${form.message}` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      const submissionPayload = {
        ...form,
        message: categoryContext || form.message,
      };

      // 1. Submit in background directly to connected Google Form -> Google Sheet
      await submitLeadToGoogleForm({
        name: form.name,
        phone: form.phone,
        email: form.email,
        city: form.city,
        divisionInterest: form.divisionInterest,
        message: categoryContext || form.message,
      });

      // 2. Also forward to backend API route for webhook/email notification handling
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload),
        });
      } catch (apiErr) {
        console.warn('Backend leads API notification note:', apiErr);
      }

      setSubmitted(true);
    } catch {
      setSubmitError('We could not submit your inquiry right now. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white text-slate-900 relative os-grid-pattern overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <SectionHeading
                eyebrow="TDS AGRO • CORPORATE DESK"
                title="GET IN TOUCH."
                description="Connect with our corporate headquarters in Fatehpur for agricultural partnerships, global import/export tenders, solar EPC installations, and farm machinery inquiries."
                theme="light"
                align="left"
                className="mb-0"
              />
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5">
              {/* Location Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    ADDRESS
                  </h4>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        HEAD OFFICE
                      </p>
                      <p className="text-sm text-slate-700 font-medium mt-1 leading-relaxed uppercase">
                        {COMPANY_INFO.address.full}
                      </p>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        SUBDIVISION
                      </p>
                      <p className="text-sm text-slate-700 font-medium mt-1 leading-relaxed uppercase">
                        {COMPANY_INFO.subdivisionAddress.full}
                      </p>
                      <a
                        href={`tel:${COMPANY_INFO.subdivisionAddress.phone.number}`}
                        className="inline-block text-sm font-mono font-semibold text-emerald-700 hover:text-emerald-900 mt-1"
                      >
                        {COMPANY_INFO.subdivisionAddress.phone.formatted}
                      </a>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        SALES OFFICE
                      </p>
                      <p className="text-sm text-slate-700 font-medium mt-1 leading-relaxed uppercase">
                        {COMPANY_INFO.salesOfficeAddress}
                      </p>
                      <a
                        href={`tel:${COMPANY_INFO.salesOfficePhone.number}`}
                        className="inline-block text-sm font-mono font-semibold text-emerald-700 hover:text-emerald-900 mt-1"
                      >
                        {COMPANY_INFO.salesOfficePhone.formatted}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    Corporate Helpline & Direct Desk
                  </h4>
                  <div className="mt-2 space-y-1.5">
                    {COMPANY_INFO.phoneLines.map((contact) => (
                      <a
                        key={contact.number}
                        href={`tel:${contact.number}`}
                        className="flex flex-wrap items-baseline gap-x-2 text-sm font-bold font-mono text-slate-950 hover:text-amber-600 transition-colors"
                      >
                        <span>{contact.formatted}</span>
                        <span className="text-[10px] font-normal text-slate-500">({contact.label})</span>
                      </a>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-2">
                    Monday to Saturday • 9:30 AM to 6:30 PM
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">Email Desks</h4>
                  <div className="mt-2 space-y-1">
                    {COMPANY_INFO.emailAddresses.map((contact) => (
                      <a
                        key={contact.address}
                        href={`mailto:${contact.address}`}
                        className="flex flex-wrap items-baseline gap-x-2 text-sm font-bold font-mono text-slate-950 hover:text-amber-600 transition-colors"
                      >
                        <span>{contact.address}</span>
                        <span className="text-[10px] font-normal text-slate-500">({contact.label})</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Instant WhatsApp Inquiries
                  </h4>
                  <a
                    href={COMPANY_INFO.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors block mt-1 font-mono"
                  >
                    Click to Start WhatsApp Chat →
                  </a>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    Direct communication with TDS Agro representatives
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Original TDS Agro Form with Google Sheet/Form Backend (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md">
                  TDS AGRO INQUIRY DESK
                </span>
                <h3 className="text-2xl font-black font-display uppercase tracking-tight text-slate-950 mt-2">
                  Send a Message to TDS Agro
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-950 font-display uppercase">
                    Thank you, {form.name}!
                  </h4>
                  <p className="mt-2 text-slate-600 text-sm max-w-md">
                    Your inquiry regarding <strong className="text-slate-950">{form.divisionInterest}</strong> has been logged. A representative from TDS Agro will contact you at{' '}
                    <strong className="text-slate-950 font-bold">{form.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-amber-500 text-slate-950 text-xs font-mono uppercase font-bold tracking-wider rounded-xl hover:bg-amber-400 shadow-sm"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="lead-name"
                        name="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ramesh Singh"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="lead-phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 07800010016"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="lead-email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-city" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                        City / Region *
                      </label>
                      <input
                        type="text"
                        id="lead-city"
                        name="city"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="e.g. Fatehpur, Kanpur, UP"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-division" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Business Division of Interest *
                    </label>
                    <select
                      value={form.divisionInterest}
                      id="lead-division"
                      name="divisionInterest"
                      onChange={(e) => {
                        const div = e.target.value;
                        setForm({ ...form, divisionInterest: div });
                        if (div === 'Imports') {
                          setSubCategory('Inverters');
                          setSelectedProductOption('Hybrid inverters');
                        } else if (div === 'Exports') {
                          setSubCategory('Basmati Rice (1121 Extra Long)');
                        } else if (div === 'Solar') {
                          setSubCategory('Residential Rooftop Solar (PM Surya Ghar ₹78,000 Subsidy)');
                        } else if (div === 'Agriculture') {
                          setSubCategory('Certified High-Yield Crop Cultivation');
                        } else if (div === 'TDS Motors') {
                          setSubCategory('Agro-Trac 7500 Heavy-Duty 75 HP Tractor');
                        } else {
                          setSubCategory('');
                          setSelectedProductOption('');
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="General">General TDS Agro Inquiry</option>
                      <option value="Imports">Imports Division (Inverters, Lighting, Furniture, Electronics)</option>
                      <option value="Solar">Solar Energy (PM Surya Ghar & Commercial EPC)</option>
                      <option value="Exports">Exports Division (Basmati Rice, Wheat, Pulses & Spices)</option>
                      <option value="Agriculture">Agriculture & Farming Solutions</option>
                      <option value="TDS Motors">TDS Motors (Tractors & Agricultural Machinery)</option>
                      <option value="Directors/Governance">Board of Directors / Corporate Governance</option>
                    </select>
                  </div>

                  {/* Dynamic Category & Product Fields for Imports */}
                  {form.divisionInterest === 'Imports' && (
                    <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-950 mb-1">
                            1. Import Category *
                          </label>
                          <select
                            value={subCategory}
                            onChange={(e) => {
                              const cat = e.target.value;
                              setSubCategory(cat);
                              if (cat === 'Inverters') setSelectedProductOption('Hybrid inverters');
                              else if (cat === 'Lighting') setSelectedProductOption('Solar street lights');
                              else if (cat === 'Furniture') setSelectedProductOption('Home furniture (Living, Dining, Bedroom)');
                              else if (cat === 'Electronic Equipment') setSelectedProductOption('Smart energy meters & Monitoring');
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-blue-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          >
                            <option value="Inverters">Inverters (Hybrid, Residential, Commercial, Industrial)</option>
                            <option value="Lighting">Lighting (Solar Street, Outdoor, Commercial, Smart LED)</option>
                            <option value="Furniture">Furniture (Home, Modern Office, Hospitality)</option>
                            <option value="Electronic Equipment">Electronic Equipment (Smart Meters, IoT, Power Control)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-950 mb-1">
                            2. Product Range *
                          </label>
                          <select
                            value={selectedProductOption}
                            onChange={(e) => setSelectedProductOption(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-blue-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          >
                            {subCategory === 'Inverters' && (
                              <>
                                <option value="Hybrid inverters">Hybrid inverters (Solar + Battery ESS)</option>
                                <option value="Residential inverters">Residential inverters (PM Surya Ghar Ready)</option>
                                <option value="Commercial inverters">Commercial inverters (3-Phase 20kW-100kW)</option>
                                <option value="Industrial inverters">Industrial inverters (Heavy Load 100kW-500kW)</option>
                              </>
                            )}
                            {subCategory === 'Lighting' && (
                              <>
                                <option value="Solar street lights">Solar street lights (All-in-One Dusk-to-Dawn)</option>
                                <option value="Outdoor flood lights">Outdoor flood lights (High Lumen Stadium/Industrial)</option>
                                <option value="Interior commercial lighting">Interior commercial lighting (Architectural Troffers)</option>
                                <option value="Smart LED systems">Smart LED systems (DALI / Zigbee Connected)</option>
                              </>
                            )}
                            {subCategory === 'Furniture' && (
                              <>
                                <option value="Home furniture (Living, Dining, Bedroom)">Home furniture (Living, Dining, Bedroom)</option>
                                <option value="Office workstations & Ergonomic chairs">Office workstations & Ergonomic chairs</option>
                                <option value="Commercial & Hospitality seating">Commercial & Hospitality seating</option>
                              </>
                            )}
                            {subCategory === 'Electronic Equipment' && (
                              <>
                                <option value="Smart energy meters & Monitoring">Smart energy meters & Monitoring</option>
                                <option value="IoT agricultural sensors & Gateways">IoT agricultural sensors & Gateways</option>
                                <option value="Power quality analyzers & SPD units">Power quality analyzers & SPD units</option>
                                <option value="Automation controllers & Relay panels">Automation controllers & Relay panels</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Category for Exports */}
                  {form.divisionInterest === 'Exports' && (
                    <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-teal-950 mb-1">
                        Export Commodity *
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-teal-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      >
                        <option value="Basmati Rice (1121 Extra Long / Pusa 1509)">Basmati Rice (1121 Extra Long / Pusa 1509)</option>
                        <option value="Premium Milling Wheat (Sharbati / Durum)">Premium Milling Wheat (Sharbati / Durum)</option>
                        <option value="Organic Pulses (Chana Dal, Toor Dal, Moong Dal)">Organic Pulses (Chana Dal, Toor Dal, Moong Dal)</option>
                        <option value="Cold-Pressed Mustard Oil & Seed Cakes">Cold-Pressed Mustard Oil & Seed Cakes</option>
                        <option value="Indian Spices (Cumin, Coriander, Turmeric)">Indian Spices (Cumin, Coriander, Turmeric)</option>
                      </select>
                    </div>
                  )}

                  {/* Dynamic Category for Solar */}
                  {form.divisionInterest === 'Solar' && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-amber-950 mb-1">
                        Solar Installation Type *
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                      >
                        <option value="Residential Rooftop Solar (PM Surya Ghar ₹78,000 Subsidy)">Residential Rooftop Solar (PM Surya Ghar ₹78,000 Subsidy)</option>
                        <option value="Commercial & Industrial On-Grid EPC (25 kW – 500 kW)">Commercial & Industrial On-Grid EPC (25 kW – 500 kW)</option>
                        <option value="Solar Agricultural Pumps (PM-KUSUM Scheme)">Solar Agricultural Pumps (PM-KUSUM Scheme)</option>
                        <option value="Hybrid Solar with High-Capacity Battery Backup">Hybrid Solar with High-Capacity Battery Backup</option>
                      </select>
                    </div>
                  )}

                  {/* Dynamic Category for Agriculture */}
                  {form.divisionInterest === 'Agriculture' && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-950 mb-1">
                        Agriculture Solution / Partnership *
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        <option value="Certified High-Yield Crop Cultivation">Certified High-Yield Crop Cultivation</option>
                        <option value="Bio-Fertilizers & Organic Soil Nutrition">Bio-Fertilizers & Organic Soil Nutrition</option>
                        <option value="Farmer Cooperative Buyback & Aggregation">Farmer Cooperative Buyback & Aggregation</option>
                        <option value="Cold Storage & Grain Warehousing Hub">Cold Storage & Grain Warehousing Hub</option>
                        <option value="Smart Micro-Irrigation & Drip Automation">Smart Micro-Irrigation & Drip Automation</option>
                      </select>
                    </div>
                  )}

                  {/* Dynamic Category for TDS Motors */}
                  {form.divisionInterest === 'TDS Motors' && (
                    <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-rose-950 mb-1">
                        Machinery & Equipment Model *
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-rose-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-600"
                      >
                        <option value="Agro-Trac 7500 Heavy-Duty 75 HP Tractor">Agro-Trac 7500 Heavy-Duty 75 HP Tractor</option>
                        <option value="Power-Trac 5000 Multi-Utility 50 HP Tractor">Power-Trac 5000 Multi-Utility 50 HP Tractor</option>
                        <option value="Crop-Master 4x4 Multi-Crop Combine Harvester">Crop-Master 4x4 Multi-Crop Combine Harvester</option>
                        <option value="Rotary Pro Multi-Speed Heavy Rotavator">Rotary Pro Multi-Speed Heavy Rotavator</option>
                        <option value="Agro-Tiller 11-Tyne Spring Loaded Cultivator">Agro-Tiller 11-Tyne Spring Loaded Cultivator</option>
                        <option value="Precision Laser Land Leveler System">Precision Laser Land Leveler System</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="lead-message" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message / Requirement Details
                    </label>
                    <textarea
                      rows={3}
                      id="lead-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe your specific requirements or inquiry."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono tracking-widest text-xs uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                      <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {submitError && <p role="alert" className="text-xs text-red-600 text-center">{submitError}</p>}

                  <p className="text-[10px] font-mono text-slate-500 text-center pt-2">
                    Your details are sent to our configured lead desk and are protected by our <a href="/privacy-policy" className="text-amber-700 underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
