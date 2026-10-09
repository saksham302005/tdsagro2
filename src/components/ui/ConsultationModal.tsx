'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Phone, Mail, MapPin, Send, Sparkles, Layers, ShieldCheck } from 'lucide-react';
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

const IMPORT_CATEGORY_DATA = [
  {
    id: 'Inverters',
    label: 'Inverters (Hybrid, Residential, Commercial & Industrial)',
    products: [
      'Hybrid inverters',
      'Residential inverters',
      'Commercial inverters',
      'Industrial inverters',
    ],
  },
  {
    id: 'Lighting',
    label: 'Lighting (Solar, Outdoor, Interior & LED)',
    products: [
      'Solar lights (Street & Pathway)',
      'Outdoor lights (Floodlights & High-Mast)',
      'Interior lights (Commercial & Architectural)',
      'Commercial LED systems (High-Bay)',
    ],
  },
  {
    id: 'Furniture',
    label: 'Furniture (Home, Office & Commercial)',
    products: [
      'Sofa sets (Living Room Collections)',
      'Lounge chairs (Ergonomic Accent Chairs & Recliners)',
      'Coffee tables (Stone & Solid Wood Center Tables)',
      'Dining furniture (Solid Wood & Sintered Stone Sets)',
      'Cabinets (Modular Credenzas & Storage Units)',
      'Office Furniture (Work desks, Chairs, Storage)',
      'Commercial Furniture (Hospitality & Restaurant Seating)',
    ],
  },
  {
    id: 'Electronic Equipment',
    label: 'Electronic Equipment (Meters, IoT & Control)',
    products: [
      'Smart meters (3-Phase DLMS Net-Meters)',
      'IoT sensors (Agri & Power Telemetry)',
      'Power quality equipment (Harmonic Filters)',
      'Control hardware (Industrial PLCs & Switchgear)',
    ],
  },
];

const AGRICULTURE_OPTIONS = [
  'High-Yield Certified Crop Cultivation',
  'Bio-Fertilizers & Soil Health Management',
  'Farmer Partnership & Cooperative Buyback',
  'Modern Post-Harvest & Cold Storage Hubs',
  'Precision Agri-Tech & Smart Irrigation',
];

const MOTORS_OPTIONS = [
  'TDS Agro-Trac 7500 Heavy-Duty 4WD Tractor (75HP)',
  'TDS Power-Trac 5000 All-Rounder Tractor (50HP)',
  'TDS Crop-Master Multi-Crop Combine Harvester (101HP)',
  'TDS Rotary Pro Heavy-Duty Rotavator / Tiller',
  'TDS Agro-Tiller 15HP Walking Tractor',
  'TDS Precision Laser Land Leveler System',
];

const SOLAR_SYSTEM_OPTIONS = [
  'Residential Rooftop Solar (PM Surya Ghar 1kW - 10kW)',
  'Commercial & Institutional Rooftop Solar (15kW - 60kW)',
  'Industrial High-Capacity Solar (100kW - 1MW+)',
  'Agricultural Solar Pump & Solar Microgrid',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCapacity,
  divisionInterest = 'General',
  inquiryTopic,
}) => {
  const [selectedDivision, setSelectedDivision] = useState(divisionInterest);
  const [importCategory, setImportCategory] = useState('Inverters');
  const [importProduct, setImportProduct] = useState('Hybrid inverters');
  const [exportProduct, setExportProduct] = useState(EXPORT_PRODUCTS[0]?.commodity || 'Premium Basmati Rice');
  const [agriSolution, setAgriSolution] = useState(AGRICULTURE_OPTIONS[0]);
  const [motorEquipment, setMotorEquipment] = useState(MOTORS_OPTIONS[0]);
  const [solarSystemType, setSolarSystemType] = useState(SOLAR_SYSTEM_OPTIONS[0]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Fatehpur',
    exportFrequency: 'One-time',
    quantityMt: '',
    monthlyBill: '₹2,500 - ₹5,000',
    capacity: defaultCapacity || '3 kW (Recommended)',
    message: '',
  });

  // Sync state on modal open or prop change
  useEffect(() => {
    if (!isOpen) return;

    setSelectedDivision(divisionInterest);
    setIsSubmitted(false);
    setSubmitError('');

    // Pre-select Import category & product based on inquiryTopic
    if (divisionInterest === 'Imports' || inquiryTopic?.toLowerCase().includes('import') || inquiryTopic?.toLowerCase().includes('inverter') || inquiryTopic?.toLowerCase().includes('light') || inquiryTopic?.toLowerCase().includes('furniture') || inquiryTopic?.toLowerCase().includes('electronic')) {
      const topicLower = (inquiryTopic || '').toLowerCase();
      if (topicLower.includes('light') || topicLower.includes('led') || topicLower.includes('flood')) {
        setImportCategory('Lighting');
        if (topicLower.includes('outdoor') || topicLower.includes('flood')) {
          setImportProduct('Outdoor lights (Floodlights & High-Mast)');
        } else if (topicLower.includes('interior') || topicLower.includes('downlight') || topicLower.includes('panel')) {
          setImportProduct('Interior lights (Commercial & Architectural)');
        } else if (topicLower.includes('commercial led') || topicLower.includes('high-bay') || topicLower.includes('ufo') || topicLower.includes('system')) {
          setImportProduct('Commercial LED systems (High-Bay)');
        } else {
          setImportProduct('Solar lights (Street & Pathway)');
        }
      } else if (topicLower.includes('furniture') || topicLower.includes('sofa') || topicLower.includes('lounge') || topicLower.includes('coffee') || topicLower.includes('table') || topicLower.includes('dining') || topicLower.includes('cabinet') || topicLower.includes('desk') || topicLower.includes('chair')) {
        setImportCategory('Furniture');
        if (topicLower.includes('lounge') || topicLower.includes('recliner')) {
          setImportProduct('Lounge chairs (Ergonomic Accent Chairs & Recliners)');
        } else if (topicLower.includes('coffee') || topicLower.includes('center table')) {
          setImportProduct('Coffee tables (Stone & Solid Wood Center Tables)');
        } else if (topicLower.includes('dining') || topicLower.includes('dinner')) {
          setImportProduct('Dining furniture (Solid Wood & Sintered Stone Sets)');
        } else if (topicLower.includes('cabinet') || topicLower.includes('credenza') || topicLower.includes('storage')) {
          setImportProduct('Cabinets (Modular Credenzas & Storage Units)');
        } else if (topicLower.includes('office') || topicLower.includes('desk') || topicLower.includes('workstation')) {
          setImportProduct('Office Furniture (Work desks, Chairs, Storage)');
        } else if (topicLower.includes('commercial') || topicLower.includes('restaurant') || topicLower.includes('hospitality')) {
          setImportProduct('Commercial Furniture (Hospitality & Restaurant Seating)');
        } else {
          setImportProduct('Sofa sets (Living Room Collections)');
        }
      } else if (topicLower.includes('electronic') || topicLower.includes('meter') || topicLower.includes('sensor') || topicLower.includes('hardware') || topicLower.includes('control')) {
        setImportCategory('Electronic Equipment');
        if (topicLower.includes('sensor') || topicLower.includes('iot')) {
          setImportProduct('IoT sensors (Agri & Power Telemetry)');
        } else if (topicLower.includes('quality') || topicLower.includes('power') || topicLower.includes('harmonic') || topicLower.includes('spd')) {
          setImportProduct('Power quality equipment (Harmonic Filters)');
        } else if (topicLower.includes('control') || topicLower.includes('plc') || topicLower.includes('switchgear')) {
          setImportProduct('Control hardware (Industrial PLCs & Switchgear)');
        } else {
          setImportProduct('Smart meters (3-Phase DLMS Net-Meters)');
        }
      } else {
        setImportCategory('Inverters');
        if (topicLower.includes('residential')) {
          setImportProduct('Residential inverters');
        } else if (topicLower.includes('commercial')) {
          setImportProduct('Commercial inverters');
        } else if (topicLower.includes('industrial')) {
          setImportProduct('Industrial inverters');
        } else {
          setImportProduct('Hybrid inverters');
        }
      }
    } else if (divisionInterest === 'Exports' || inquiryTopic?.toLowerCase().includes('export')) {
      const matched = EXPORT_PRODUCTS.find((p) =>
        inquiryTopic?.toLowerCase().includes(p.commodity.toLowerCase())
      );
      if (matched) setExportProduct(matched.commodity);
    } else if (divisionInterest === 'TDS Motors' || inquiryTopic?.toLowerCase().includes('motor') || inquiryTopic?.toLowerCase().includes('tractor')) {
      const matched = MOTORS_OPTIONS.find((m) =>
        inquiryTopic?.toLowerCase().includes(m.toLowerCase())
      );
      if (matched) setMotorEquipment(matched);
    }

    setFormData((prev) => ({
      ...prev,
      capacity: defaultCapacity || '3 kW (Recommended)',
      message: '',
    }));
  }, [isOpen, defaultCapacity, divisionInterest, inquiryTopic]);

  const isSolar = selectedDivision === 'Solar';
  const isImports = selectedDivision === 'Imports';
  const isExports = selectedDivision === 'Exports';
  const isAgri = selectedDivision === 'Agriculture';
  const isMotors = selectedDivision === 'TDS Motors' || selectedDivision === 'Motors';

  const currentImportCategoryObj = IMPORT_CATEGORY_DATA.find((c) => c.id === importCategory) || IMPORT_CATEGORY_DATA[0];

  const handleImportCategoryChange = (newCat: string) => {
    setImportCategory(newCat);
    const catObj = IMPORT_CATEGORY_DATA.find((c) => c.id === newCat);
    if (catObj && catObj.products.length > 0) {
      setImportProduct(catObj.products[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    let specificDetails: string[] = [];

    if (isImports) {
      specificDetails = [
        `Import Category: ${importCategory}`,
        `Specific Product: ${importProduct}`,
        inquiryTopic ? `Referenced Topic: ${inquiryTopic}` : '',
        formData.message ? `Requirement Notes: ${formData.message}` : '',
      ];
    } else if (isExports) {
      specificDetails = [
        `Export Commodity: ${exportProduct}`,
        `Frequency: ${formData.exportFrequency}`,
        `Quantity: ${formData.quantityMt ? `${formData.quantityMt} MT` : 'Not specified'}`,
        inquiryTopic ? `Referenced Topic: ${inquiryTopic}` : '',
        formData.message ? `Requirement Notes: ${formData.message}` : '',
      ];
    } else if (isSolar) {
      specificDetails = [
        `Solar System Type: ${solarSystemType}`,
        `Monthly Electricity Bill: ${formData.monthlyBill}`,
        `Target System Capacity: ${formData.capacity}`,
        formData.message ? `Roof / Site Details: ${formData.message}` : '',
      ];
    } else if (isAgri) {
      specificDetails = [
        `Agriculture Solution: ${agriSolution}`,
        inquiryTopic ? `Referenced Topic: ${inquiryTopic}` : '',
        formData.message ? `Farming / Partnership Details: ${formData.message}` : '',
      ];
    } else if (isMotors) {
      specificDetails = [
        `Machinery Model: ${motorEquipment}`,
        inquiryTopic ? `Referenced Topic: ${inquiryTopic}` : '',
        formData.message ? `Equipment Requirements: ${formData.message}` : '',
      ];
    } else {
      specificDetails = [
        inquiryTopic ? `Topic: ${inquiryTopic}` : '',
        formData.message ? `Requirement: ${formData.message}` : '',
      ];
    }

    const formattedMessage = specificDetails.filter(Boolean).join('\n');

    try {
      // 1. Submit directly to Google Form for immediate Google Sheet population
      await submitLeadToGoogleForm({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        divisionInterest: selectedDivision,
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
            divisionInterest: selectedDivision,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <div className="relative w-full max-w-3xl bg-[#f8faf7] rounded-3xl shadow-2xl border border-white/70 overflow-hidden z-10 my-6">
          {/* Header banner */}
          <div className="relative bg-[#08261a] text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between border-b border-emerald-300/15 overflow-hidden">
            <div className="absolute -right-12 -top-20 w-56 h-56 rounded-full border border-amber-300/15 pointer-events-none" />
            <div className="absolute right-10 -bottom-28 w-64 h-64 rounded-full border border-emerald-300/10 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#f2c45f] font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TDS AGRO GROUP</span>
                <span className="text-white/30">•</span>
                <span>{selectedDivision} Desk</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white mt-1.5 uppercase">
                {isImports
                  ? 'Request Import Quotation'
                  : isExports
                  ? 'Request Export Order'
                  : isSolar
                  ? 'Request Solar EPC Proposal'
                  : isAgri
                  ? 'Agriculture Partnership Enquiry'
                  : isMotors
                  ? 'Machinery & Equipment Quote'
                  : 'Direct Business Consultation'}
              </h3>
              <p className="text-xs text-emerald-100/70 mt-1 max-w-xl font-normal">
                {inquiryTopic
                  ? `Specific enquiry regarding ${inquiryTopic}. Please confirm your category and requirements below.`
                  : `Connect directly with our dedicated ${selectedDivision} engineering and commercial desk in Fatehpur, UP.`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="relative z-10 p-2.5 rounded-full text-emerald-100/60 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-forest-950 font-display uppercase">
                  {selectedDivision} Enquiry Logged Successfully
                </h4>
                <p className="mt-3 text-slate-600 max-w-md text-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our {selectedDivision} desk has received your request and an engineering manager will contact you at{' '}
                  <span className="font-semibold text-emerald-700 font-mono">{formData.phone}</span>.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 text-left w-full max-w-md shadow-sm space-y-1">
                  <div className="font-bold text-slate-900 font-mono uppercase text-[11px] mb-1.5 flex items-center gap-1.5 text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct Headquarters Reference</span>
                  </div>
                  <div><strong className="text-slate-700">Helpdesk:</strong> {COMPANY_INFO.formattedPhone}</div>
                  <div><strong className="text-slate-700">HQ Office:</strong> {COMPANY_INFO.address.full}</div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="mt-6 px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Division of interest selector when opened generally */}
                {divisionInterest === 'General' && (
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                      Select Business Division of Interest *
                    </label>
                    <select
                      value={selectedDivision}
                      onChange={(e) => setSelectedDivision(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                    >
                      <option value="Imports">Imports Division (Inverters, Lighting, Furniture, Electronics)</option>
                      <option value="Solar">Solar Energy (PM Surya Ghar, On-Grid, Hybrid & Commercial EPC)</option>
                      <option value="Exports">Exports Division (Basmati Rice, Wheat, Pulses, Spices)</option>
                      <option value="Agriculture">Core Agriculture (Crop Cultivation, Bio-Fertilizers, Farming)</option>
                      <option value="TDS Motors">TDS Motors (Tractors, Combine Harvesters & Farm Implements)</option>
                      <option value="General">General TDS Agro Corporate Consultation</option>
                    </select>
                  </div>
                )}

                {/* Personal Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase mb-1.5">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Fatehpur, Kanpur, Prayagraj"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                </div>

                {/* ================= DYNAMIC IMPORTS CATEGORY & PRODUCT SECTION ================= */}
                {isImports && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                      <Layers className="w-4 h-4 text-blue-700" />
                      <span>Imports Category & Product Selection</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="import-category-select" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          1. Import Category *
                        </label>
                        <select
                          id="import-category-select"
                          value={importCategory}
                          onChange={(e) => handleImportCategoryChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          {IMPORT_CATEGORY_DATA.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="import-product-select" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          2. Specific Product Range *
                        </label>
                        <select
                          id="import-product-select"
                          value={importProduct}
                          onChange={(e) => setImportProduct(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          {currentImportCategoryObj.products.map((prod) => (
                            <option key={prod} value={prod}>
                              {prod}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= DYNAMIC EXPORTS COMMODITY SECTION ================= */}
                {isExports && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="export-commodity-select" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Agricultural Commodity *
                        </label>
                        <select
                          id="export-commodity-select"
                          value={exportProduct}
                          onChange={(e) => setExportProduct(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                          {EXPORT_PRODUCTS.map((product) => (
                            <option key={product.id} value={product.commodity}>
                              {product.commodity} ({product.variety.split('/')[0]})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="export-frequency-select" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Shipment Frequency
                        </label>
                        <select
                          id="export-frequency-select"
                          value={formData.exportFrequency}
                          onChange={(e) => setFormData({ ...formData, exportFrequency: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                          <option value="One-time Spot Order">One-time Spot Order</option>
                          <option value="Monthly Regular Contract">Monthly Regular Contract</option>
                          <option value="Quarterly Shipment">Quarterly Shipment</option>
                          <option value="Annual Supply Tender">Annual Supply Tender</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="export-quantity-input" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Approximate Quantity (Metric Tonnes / FCL)
                      </label>
                      <input
                        id="export-quantity-input"
                        type="text"
                        value={formData.quantityMt}
                        onChange={(e) => setFormData({ ...formData, quantityMt: e.target.value })}
                        placeholder="e.g. 24 MT (1 FCL) or 100 MT Bulk"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>
                  </div>
                )}

                {/* ================= DYNAMIC SOLAR EPC SECTION ================= */}
                {isSolar && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Solar Installation Category *
                        </label>
                        <select
                          value={solarSystemType}
                          onChange={(e) => setSolarSystemType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-600"
                        >
                          {SOLAR_SYSTEM_OPTIONS.map((sys) => (
                            <option key={sys} value={sys}>
                              {sys}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Current Monthly Electricity Bill
                        </label>
                        <select
                          value={formData.monthlyBill}
                          onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                        >
                          <option value="Under ₹2,500">Under ₹2,500 / month</option>
                          <option value="₹2,500 - ₹5,000">₹2,500 – ₹5,000 / month (Ideal for 3kW Subsidy)</option>
                          <option value="₹5,000 - ₹10,000">₹5,000 – ₹10,000 / month</option>
                          <option value="₹10,000 - ₹25,000">₹10,000 – ₹25,000 / month</option>
                          <option value="Above ₹25,000">Above ₹25,000 (Commercial / Industrial)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Target System Capacity
                      </label>
                      <input
                        type="text"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        placeholder="e.g. 3 kW On-Grid (₹78k PM Surya Ghar Subsidy) or 10 kW Hybrid"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                  </div>
                )}

                {/* ================= DYNAMIC AGRICULTURE SECTION ================= */}
                {isAgri && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Agricultural Solution / Service *
                      </label>
                      <select
                        value={agriSolution}
                        onChange={(e) => setAgriSolution(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        {AGRICULTURE_OPTIONS.map((sol) => (
                          <option key={sol} value={sol}>
                            {sol}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* ================= DYNAMIC TDS MOTORS SECTION ================= */}
                {isMotors && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Machinery & Equipment Model *
                      </label>
                      <select
                        value={motorEquipment}
                        onChange={(e) => setMotorEquipment(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-rose-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-600"
                      >
                        {MOTORS_OPTIONS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Message / Requirement Details */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Additional Requirement Details / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isImports
                        ? 'e.g. Need quotation for 50 units of Hybrid Inverters with 5-year warranty, delivery to Uttar Pradesh.'
                        : isExports
                        ? 'e.g. Looking for CIF quote to Dubai port for 24 MT 1121 Extra Long Basmati Rice in 25kg non-woven bags.'
                        : isSolar
                        ? 'e.g. RCC flat roof 800 sq ft, want to apply for PM Surya Ghar ₹78,000 subsidy.'
                        : isMotors
                        ? 'e.g. Inquiring about government subsidy and tractor delivery in Fatehpur.'
                        : 'Please describe your specific requirements.'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-mono font-bold tracking-wider text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? 'Submitting...'
                        : isImports
                        ? 'Submit Import Quotation Request'
                        : isExports
                        ? 'Submit Export Inquiry'
                        : isSolar
                        ? 'Submit Solar Consultation Request'
                        : `Submit ${selectedDivision} Enquiry`}
                    </span>
                    <Send className="w-4 h-4 text-amber-400" />
                  </button>
                </div>

                {submitError && (
                  <p role="alert" className="text-xs text-red-600 text-center font-medium">
                    {submitError}
                  </p>
                )}

                <p className="text-[11px] font-mono text-slate-500 text-center mt-2">
                  🔒 Information is securely routed directly to the TDS {selectedDivision} desk.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  );
};
