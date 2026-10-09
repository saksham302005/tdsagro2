'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Phone, Mail, MapPin, Send, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';
import { EXPORT_PRODUCTS } from '@/data/exports';
import { submitLeadToGoogleForm } from '@/lib/googleForm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCapacity?: string;
  divisionInterest?: string;
  inquiryTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCapacity,
  divisionInterest = 'General',
  inquiryTopic,
}) => {
  const isSolarInquiry = divisionInterest === 'Solar';
  const isImportsInquiry = divisionInterest === 'Imports';
  const isExportsInquiry = divisionInterest === 'Exports';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Fatehpur',
    propertyType: 'Residential',
    productType: isExportsInquiry ? EXPORT_PRODUCTS[0].commodity : 'House',
    exportFrequency: 'One-time',
    quantityMt: '',
    monthlyBill: '₹2,500 - ₹5,000',
    capacity: defaultCapacity || '3 kW (Recommended)',
    message: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    setIsSubmitted(false);
    setFormData((current) => ({
      ...current,
      productType: isExportsInquiry ? EXPORT_PRODUCTS[0].commodity : 'House',
      exportFrequency: 'One-time',
      quantityMt: '',
      capacity: defaultCapacity || '3 kW (Recommended)',
      message: '',
    }));
  }, [isOpen, defaultCapacity, isSolarInquiry, isImportsInquiry, isExportsInquiry, inquiryTopic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formattedMessage = isSolarInquiry
      ? [
          `Property type: ${formData.propertyType}`,
          `Monthly bill: ${formData.monthlyBill}`,
          `Target capacity: ${formData.capacity}`,
          formData.message ? `Roof details: ${formData.message}` : '',
        ].filter(Boolean).join('\n')
      : isImportsInquiry
        ? [
            `Product type: ${formData.productType}`,
            inquiryTopic ? `Topic: ${inquiryTopic}` : '',
            formData.message ? `Requirement: ${formData.message}` : '',
          ].filter(Boolean).join('\n')
        : isExportsInquiry
          ? [
              `Product type: ${formData.productType}`,
              `Export frequency: ${formData.exportFrequency}`,
              `Quantity: ${formData.quantityMt} MT`,
              inquiryTopic ? `Topic: ${inquiryTopic}` : '',
              formData.message ? `Additional requirements: ${formData.message}` : '',
            ].filter(Boolean).join('\n')
          : [
              inquiryTopic ? `Topic: ${inquiryTopic}` : '',
              formData.message ? `Requirement: ${formData.message}` : '',
            ].filter(Boolean).join('\n');

    try {
      // 1. Submit directly to Google Form for immediate Google Sheet population
      await submitLeadToGoogleForm({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        divisionInterest,
        message: formattedMessage,
      });

      // 2. Also forward to backend API
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            divisionInterest,
            message: formattedMessage,
          }),
        });
      } catch (apiErr) {
        console.warn('Backend API notification log:', apiErr);
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError('We could not submit your consultation. Please try again or call our help desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-lg"
          />

          {/* Modal Card */}
          <div
            className="relative w-full max-w-3xl bg-[#f8faf7] rounded-2xl shadow-[0_30px_90px_rgba(2,20,12,0.3)] border border-white/70 overflow-hidden z-10 my-8"
          >
            {/* Header banner */}
            <div className="relative bg-[#08261a] text-white px-6 sm:px-8 py-6 sm:py-7 flex items-center justify-between border-b border-emerald-300/15 overflow-hidden">
              <div className="absolute -right-12 -top-20 w-56 h-56 rounded-full border border-amber-300/15" />
              <div className="absolute right-10 -bottom-28 w-64 h-64 rounded-full border border-emerald-300/10" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#f2c45f] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isSolarInquiry ? 'TDS Solar Energy' : 'TDS Agro'} <span className="text-white/30">•</span> Direct Enquiry
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white mt-2">
                  {isSolarInquiry
                    ? 'Request Solar Proposal'
                    : isExportsInquiry
                      ? 'Request Export Proposal'
                      : `Request ${divisionInterest} Enquiry`}
                </h3>
                <p className="text-xs text-emerald-100/65 mt-1.5">
                  {isSolarInquiry
                    ? 'A quick technical review for your property and energy goals.'
                    : isExportsInquiry
                      ? 'Share your product, shipment frequency, and quantity requirements.'
                      : `${inquiryTopic ? `Enquiry about ${inquiryTopic}. ` : ''}Share your requirement and the ${divisionInterest} team will get back to you.`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="relative p-2.5 rounded-xl text-emerald-100/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-forest-950 font-display uppercase">
                    {divisionInterest} Enquiry Received
                  </h4>
                  <p className="mt-3 text-charcoal-600 max-w-md text-sm leading-relaxed">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Our {isSolarInquiry ? 'technical team will review your power requirements' : `${divisionInterest} team will review your enquiry`} and connect with you at{' '}
                    <span className="font-semibold text-forest-900">{formData.phone}</span>.
                  </p>

                  <div className="mt-6 p-4 rounded bg-forest-900/5 border border-forest-900/10 text-xs text-charcoal-600 text-left w-full max-w-md">
                    <div className="font-semibold text-forest-950 mb-1">Direct Help Desk:</div>
                    <div>Phone: {COMPANY_INFO.formattedPhone}</div>
                    <div>Office: {COMPANY_INFO.address.full}</div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-6 py-2.5 bg-forest-900 text-solar-cream text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSolarInquiry && <div className="flex items-start gap-3 rounded-xl border border-emerald-900/10 bg-emerald-50/70 px-4 py-3.5">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-white text-emerald-700 flex items-center justify-center shadow-sm shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Share your property details for an accurate system sizing, PM Surya Ghar subsidy estimate, and site feasibility report.
                    </p>
                  </div>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Fatehpur, Kanpur, Prayagraj"
                        className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                      />
                    </div>
                  </div>

                  {isImportsInquiry && <div>
                    <label htmlFor="import-product-type" className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                      Product Type
                    </label>
                    <select
                      id="import-product-type"
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                    >
                      <option value="House">House</option>
                      <option value="Office">Office</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>}

                  {isExportsInquiry && <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="export-product-type" className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                          Product Type
                        </label>
                        <select
                          id="export-product-type"
                          value={formData.productType}
                          onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                        >
                          {EXPORT_PRODUCTS.map((product) => (
                            <option key={product.id} value={product.commodity}>{product.commodity}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="export-frequency" className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                          Export Frequency
                        </label>
                        <select
                          id="export-frequency"
                          value={formData.exportFrequency}
                          onChange={(e) => setFormData({ ...formData, exportFrequency: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                        >
                          <option value="One-time">One-time</option>
                          <option value="Regular">Regular</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="export-quantity" className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                        Quantity (MT)
                      </label>
                      <input
                        id="export-quantity"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        value={formData.quantityMt}
                        onChange={(e) => setFormData({ ...formData, quantityMt: e.target.value })}
                        placeholder="e.g. 24"
                        className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                      />
                    </div>
                  </>}

                  {isSolarInquiry && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                      >
                        <option value="Residential">Residential House / Villa</option>
                        <option value="Commercial">Commercial / Retail Outlet</option>
                        <option value="Industrial">Industrial Plant / Cold Storage</option>
                        <option value="Agricultural">Agricultural / Farm Setup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                        Approx Monthly Bill
                      </label>
                      <select
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                      >
                        <option value="Under ₹2,000">Under ₹2,000 / month</option>
                        <option value="₹2,500 - ₹5,000">₹2,500 – ₹5,000 / month</option>
                        <option value="₹5,000 - ₹10,000">₹5,000 – ₹10,000 / month</option>
                        <option value="₹10,000 - ₹25,000">₹10,000 – ₹25,000 / month</option>
                        <option value="Above ₹25,000">Above ₹25,000 (Commercial)</option>
                      </select>
                    </div>
                  </div>}

                  {isSolarInquiry && <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                      Target Capacity / Special Requirement
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="e.g. 3 kW On-Grid or 5 kW Hybrid"
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                    />
                  </div>}

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-charcoal-700 uppercase mb-1">
                      {isSolarInquiry
                        ? 'Message / Roof Details (Optional)'
                        : isExportsInquiry
                          ? 'Additional Requirements (Optional)'
                          : 'Requirement Details'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isSolarInquiry
                        ? 'e.g. Flat RCC roof with open sunlight, looking to claim PM Surya Ghar subsidy.'
                        : isExportsInquiry
                          ? 'Add destination, packaging, or shipping requirements.'
                          : 'Please describe your requirements.'}
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-700 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-forest-900 hover:bg-forest-800 text-solar-cream font-semibold tracking-widest text-xs uppercase rounded transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <span>{isSubmitting ? 'Submitting...' : isSolarInquiry ? 'Submit Consultation Request' : isExportsInquiry ? 'Submit Export Request' : `Submit ${divisionInterest} Enquiry`}</span>
                      <Send className="w-4 h-4 text-solar-gold" />
                    </button>
                  </div>

                  {submitError && <p role="alert" className="text-xs text-red-600 text-center">{submitError}</p>}

                  <p className="text-[11px] text-charcoal-500 text-center mt-3">
                    Your information will only be used by the TDS {divisionInterest} team to respond to this enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
    )
  );
};
