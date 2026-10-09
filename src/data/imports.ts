import { ImportProductCategory, ImportProductItem } from '@/types';

export const IMPORT_CATEGORIES: ImportProductCategory[] = [
  {
    id: 'inverters',
    category: 'Inverters',
    title: 'Hybrid, Residential, Commercial & Industrial Inverters',
    tagline: 'Reliable power conversion for homes, businesses, and high-load operations.',
    description:
      'A broad inverter portfolio sourced for dependable backup, solar integration, and power management across every project scale.',
    productRange: ['Hybrid inverters', 'Residential inverters', 'Commercial inverters', 'Industrial inverters'],
    image: '/hybrid-inverter.jpg',
    iconName: 'Zap',
    products: [
      {
        id: 'hybrid-inverters',
        name: 'Hybrid inverters',
        category: 'Inverters',
        headline: 'Bi-Directional Solar & Battery Hybrid Energy Storage System',
        description:
          'Advanced hybrid solar inverters combining high-efficiency photovoltaic conversion, intelligent lithium/lead-acid battery energy storage management, and automatic grid failover. Supplies seamless uninterrupted power during blackouts with ultra-fast sub-10ms transfer speed for residential and commercial loads.',
        image: '/hybrid-inverter.jpg',
        keySpecs: [
          { label: 'Capacity Range', value: '3 kW – 15 kW (Single & 3-Phase)' },
          { label: 'MPPT Efficiency', value: '98.4% Peak Conversion' },
          { label: 'Switchover Time', value: '< 10ms (True UPS Grade)' },
          { label: 'Battery Compatibility', value: 'LiFePO4 & Lead-Acid (48V / HV)' },
          { label: 'Grid Feed-in', value: 'Zero-Export & Net-Metering Ready' },
          { label: 'Warranty', value: '5 – 10 Years Comprehensive' },
        ],
        features: [
          'Dual independent MPPT channels for multi-angle rooftop orientations',
          'Intelligent programmable peak-shaving and time-of-use (TOU) power dispatch',
          'IP65 weather-sealed aluminum alloy chassis for indoor/outdoor installation',
          'Smart Wi-Fi / 4G remote cloud monitoring with mobile companion dashboard',
          'Compatible with diesel generators with automated dry-contact startup',
        ],
        applications: [
          'Residential villas, bungalows & urban solar-plus-storage homes',
          'Healthcare clinics, diagnostic centers & IT server rooms',
          'Rural commercial establishments, mini-grids & telecom towers',
        ],
        certifications: ['IEC 62109-1/2', 'IEC 62040', 'CE', 'ISO 9001'],
      },
      {
        id: 'residential-inverters',
        name: 'Residential inverters',
        category: 'Inverters',
        headline: 'Pure Sine Wave High-Yield Domestic Rooftop Solar Inverter',
        description:
          'Engineered specifically for residential rooftop installations, apartments, and independent homes. Features whisper-quiet convection cooling, an ultra-low startup voltage to maximize solar harvest from dawn to dusk, and full DISCOM net-metering compatibility for PM Surya Ghar subsidy compliance.',
        image: '/residential-inverter.jpg',
        keySpecs: [
          { label: 'Capacity Range', value: '1 kW – 10 kW Single-Phase' },
          { label: 'Peak Efficiency', value: '97.8% High-Yield Conversion' },
          { label: 'Cooling System', value: 'Natural Convection (Fanless & Silent)' },
          { label: 'Waveform Quality', value: 'Pure Sine Wave (THD < 3%)' },
          { label: 'Net-Metering Support', value: 'Approved for All UP & National DISCOMs' },
          { label: 'Protection', value: 'Type II DC/AC Surge Protection (SPD)' },
        ],
        features: [
          'Ultra-low 60V startup threshold capturing early morning and late evening solar energy',
          'High inductive surge tolerance effortlessly starting refrigerators, pumps, and air conditioners',
          'Integrated DC isolator switch for safe homeowner isolation and maintenance',
          'Compact lightweight design allowing single-person quick wall mounting',
          'Integrated LCD display and Bluetooth/Wi-Fi consumer mobile app',
        ],
        applications: [
          'PM Surya Ghar ₹78,000 subsidy rooftop solar installations',
          'Independent residential houses, bungalows & villas',
          'Apartment units and residential group housing societies',
        ],
        certifications: ['BIS Certified', 'IEC 61727', 'IEC 62116', 'CE'],
      },
      {
        id: 'commercial-inverters',
        name: 'Commercial inverters',
        category: 'Inverters',
        headline: 'Three-Phase Multi-MPPT Commercial & Institutional String Inverter',
        description:
          'Robust three-phase commercial string inverters built for schools, hospitals, commercial complexes, and retail centers. Delivers maximum yield through multi-string MPPT architecture, smart I-V curve diagnostics, and seamless integration with building energy management systems (SCADA).',
        image: '/commercial-inverter.jpg',
        keySpecs: [
          { label: 'Capacity Range', value: '15 kW – 60 kW Three-Phase (415V)' },
          { label: 'MPPT Tracking', value: 'Up to 4 Independent MPPT Channels' },
          { label: 'Max Efficiency', value: '98.8% Industry Leading' },
          { label: 'Communication', value: 'RS485, Ethernet, Wi-Fi & Modbus-RTU' },
          { label: 'Enclosure Rating', value: 'IP66 Weatherproof & Dust-tight' },
          { label: 'Compliance', value: 'IEC 62109, IEC 61727, EN 50549, CE' },
        ],
        features: [
          'Smart I-V string curve scanning for instant pinpoint fault detection',
          'Built-in Anti-PID (Potential Induced Degradation) recovery technology',
          'Active power derating and dynamic reactive power regulation for grid stability',
          'Heavy-duty heatsink design for extreme temperatures up to 55°C',
          'Remote firmware upgrade and multi-inverter centralized management',
        ],
        applications: [
          'Educational institutions, universities & school campuses',
          'Hospitals, diagnostic clinics & corporate office parks',
          'Supermarkets, shopping malls, hotels & commercial warehouses',
        ],
        certifications: ['IEC 62109-1/2', 'IEC 60068', 'EN 50549-1', 'CE'],
      },
      {
        id: 'industrial-inverters',
        name: 'Industrial inverters',
        category: 'Inverters',
        headline: 'Heavy-Duty High-Capacity Industrial & Central Power Inverter',
        description:
          'High-power industrial inverter systems designed for manufacturing facilities, agro-processing mills, cold storages, and large-scale captive industrial microgrids. Built to withstand continuous inductive motor loads, extreme ambient conditions, and severe electrical harmonic environments.',
        image: '/industrial-inverter.jpg',
        keySpecs: [
          { label: 'Capacity Range', value: '100 kW – 500 kW+ Industrial Modular' },
          { label: 'Max Efficiency', value: '99.0% Utility-Grade Peak' },
          { label: 'Overload Tolerance', value: '120% Continuous Overload (150% for 10s)' },
          { label: 'Harmonic Distortion', value: 'THDi < 1.5% at Rated Full Load' },
          { label: 'Cooling Design', value: 'Redundant Intelligent Variable-Speed Forced Air' },
          { label: 'Grid Support', value: 'LVRT (Low Voltage Ride Through) & Frequency Response' },
        ],
        features: [
          'Galvanic isolation transformer compatibility for extreme industrial noise rejection',
          'Modular slide-out power stack architecture for rapid on-site servicing',
          'Comprehensive Arc-Fault Circuit Interrupter (AFCI) safety mechanism',
          'Industrial PLC integration with high-speed CANbus and fiber-optic SCADA links',
          'Severe environment conformal coating protecting internal boards against dust & moisture',
        ],
        applications: [
          'Agro-processing mills, flour mills, rice mills & cold chains',
          'Manufacturing plants, steel fabrication & textile industries',
          'Utility ground-mount solar farms & industrial captive microgrids',
        ],
        certifications: ['IEC 62109', 'IEEE 1547', 'UL 1741', 'CE'],
      },
    ],
  },
  {
    id: 'lighting',
    category: 'Lighting',
    title: 'Solar, Outdoor & Interior Lighting',
    tagline: 'High-lumen lighting for public spaces, buildings, and everyday interiors.',
    description:
      'One curated lighting range spanning energy-efficient outdoor systems, solar illumination, and polished indoor fixtures.',
    productRange: ['Solar lights', 'Outdoor lights', 'Interior lights', 'Commercial LED systems'],
    image: '/solar-street-light.jpg',
    iconName: 'Lightbulb',
    products: [
      {
        id: 'solar-lights',
        name: 'Solar lights',
        category: 'Lighting',
        headline: 'All-in-One Integrated Solar Street & Pathway Lights',
        description:
          'High-efficiency standalone solar lighting systems with integrated monocrystalline solar panels, long-life LiFePO4 lithium battery storage, high-lumen Bridgelux LED luminaire, and smart PIR radar motion dimming sensors.',
        image: '/solar-street-light.jpg',
        keySpecs: [
          { label: 'Luminous Flux', value: '3,000 – 15,000 Lumens' },
          { label: 'Battery Chemistry', value: 'LiFePO4 Lithium (2,000+ Cycles)' },
          { label: 'Solar Panel', value: 'High-Efficiency Monocrystalline A-Grade' },
          { label: 'Backup Autonomy', value: '2 – 3 Consecutive Rainy / Overcast Days' },
          { label: 'Ingress Protection', value: 'IP65 / IP67 Weatherproof & Dust-tight' },
          { label: 'Color Temp (CCT)', value: '5700K – 6500K Crisp Daylight White' },
        ],
        features: [
          'Automatic dusk-to-dawn intelligent lighting controller with auto-sleep',
          'Smart PIR radar motion sensing for optimal battery conservation',
          'Heavy-duty aerodynamic die-cast aluminum pole-mount chassis',
          'Zero electricity bill & completely wire-free rapid installation',
          'Overcharge, deep-discharge, and thermal battery safety BMS',
        ],
        applications: [
          'Village roads, agricultural farm lanes & highway dividers',
          'Industrial parks, factory perimeters & university campuses',
          'Gated housing colonies, resort walkways & public gardens',
        ],
        certifications: ['BIS Certified', 'MNRE Approved', 'CE', 'RoHS', 'ISO 9001'],
      },
      {
        id: 'outdoor-lights',
        name: 'Outdoor lights',
        category: 'Lighting',
        headline: 'Architectural & Heavy-Duty Outdoor LED Floodlights',
        description:
          'Heavy-duty outdoor luminary fixtures with IP66 weatherproofing, finned die-cast aluminum heat sinks, and multi-cell optical lenses designed for building facades, perimeter security, sports courts, and open yards.',
        image: '/outdoor-flood-light.jpg',
        keySpecs: [
          { label: 'Power Range', value: '50W – 400W High Lumen Output' },
          { label: 'Surge Protection', value: '10 kV Integrated SPD Protection' },
          { label: 'Color Rendering (CRI)', value: 'CRI > 80 True Color Precision' },
          { label: 'Rated Lifespan', value: '50,000+ Operating Hours (L70)' },
          { label: 'Housing Material', value: 'Die-Cast Aluminum with Finned Heat-Sink' },
          { label: 'Impact Rating', value: 'IK08 High-Toughness Tempered Glass' },
        ],
        features: [
          'Tempered optical glass lens with high light transmittance (>93%)',
          'Multi-angle 180° adjustable heavy-gauge mounting yoke',
          'Anti-corrosion electrophoretic powder surface coating',
          'Waterproof breathable pressure-relief vent preventing condensation',
          'Compatible with external dusk-to-dawn photocell timers',
        ],
        applications: [
          'Commercial building facades, sports courts & construction sites',
          'Warehouse loading yards, truck terminals & perimeter security',
          'Agro-processing grain yards, petrol pumps & billboard illumination',
        ],
        certifications: ['BIS Certified', 'IP66 Tested', 'IK08', 'CE', 'RoHS'],
      },
      {
        id: 'interior-lights',
        name: 'Interior lights',
        category: 'Lighting',
        headline: 'Commercial & Architectural Interior LED Fixtures',
        description:
          'Glare-free ultra-slim recessed panel lights, architectural downlights, and linear fixtures with high CRI (>85) and uniform light distribution for modern corporate offices, institutions, and premium residential spaces.',
        image: '/interior-light.jpg',
        keySpecs: [
          { label: 'Wattage Options', value: '12W, 18W, 36W, 48W, 72W' },
          { label: 'Glare Rating', value: 'UGR < 19 Ultra Low Glare (Eye Comfort)' },
          { label: 'CCT Options', value: '3000K (Warm) / 4000K (Natural) / 6500K (Cool)' },
          { label: 'Driver Efficiency', value: '> 92% (Power Factor > 0.98)' },
          { label: 'Frame Profile', value: 'Ultra-Slim 9mm Anodized Aluminum' },
          { label: 'Light Distribution', value: '120° Wide Edge-Lit Diffused Beam' },
        ],
        features: [
          'Flicker-free constant-current isolated driver electronics',
          'Ultra-slim aluminum frame designed for seamless false-ceiling grid mounting',
          'Non-yellowing optical PMMA light guide plate & diffuser sheet',
          'Zero electromagnetic interference (EMI) compliant with IT standards',
          'Long lifespan with minimal lumen depreciation over 5+ years',
        ],
        applications: [
          'Corporate office workspaces, boardrooms & reception lobbies',
          'Hospitals, healthcare clinics, labs & educational classrooms',
          'Showrooms, retail boutiques & premium residential interiors',
        ],
        certifications: ['BIS Certified', 'IS 10322', 'CE', 'RoHS', 'EMC Compliant'],
      },
      {
        id: 'commercial-led-systems',
        name: 'Commercial LED systems',
        category: 'Lighting',
        headline: 'High-Bay & Industrial Commercial LED Luminaries',
        description:
          'Ultra high-output UFO commercial luminaries providing maximum energy savings and minimal lumen depreciation for high-ceiling industrial warehouses, manufacturing facilities, and retail centers.',
        image: '/commercial-led-system.jpg',
        keySpecs: [
          { label: 'Luminous Efficacy', value: '160 – 175 Lumens / Watt High-Yield' },
          { label: 'Wattage Range', value: '100W, 150W, 200W, 250W UFO High Bay' },
          { label: 'Beam Angle Options', value: '60° / 90° / 120° Optical Polycarbonate Lens' },
          { label: 'Thermal System', value: 'Cold-Forged 1070 Pure Aluminum Heat-Sink' },
          { label: 'Dimming Protocol', value: '0-10V / DALI / Microwave Sensor Ready' },
          { label: 'IP / IK Rating', value: 'IP65 Waterproof & IK10 Impact Proof' },
        ],
        features: [
          'Cold-forged pure aluminum housing with hollow thermal chimney airflow',
          'Premium MeanWell / Sosen isolated industrial power supply',
          'Heavy-duty stainless steel suspension ring and safety chain eyelet',
          'Built-in 6kV surge protection for harsh industrial power grids',
          'Optional plug-and-play microwave motion & daylight harvesting sensors',
        ],
        applications: [
          'High-ceiling manufacturing workshops & metal fabrication units',
          'Logistics distribution warehouses, cold storages & grain silos',
          'Indoor sports stadiums, convention halls & shopping mega-stores',
        ],
        certifications: ['BIS Certified', 'UL Listed Driver', 'IP65', 'IK10', 'CE'],
      },
    ],
  },
  {
    id: 'furniture',
    category: 'Furniture',
    title: 'Home, Office & Institutional Furniture',
    tagline: 'Practical furniture collections for homes, workplaces, and public institutions.',
    description:
      'A flexible furniture portfolio bringing together comfortable residential pieces and durable collections for offices and institutions.',
    productRange: ['Sofa sets', 'Lounge chairs', 'Coffee tables', 'Dining furniture', 'Cabinets'],
    image: '/furniture-sofa-set.jpg',
    iconName: 'Armchair',
    products: [
      {
        id: 'sofa-sets',
        name: 'Sofa sets',
        category: 'Furniture',
        headline: 'Contemporary High-Comfort Living Room Sofa Collections',
        description:
          'Crafted from solid treated kiln-dried hardwood frames, high-resilience 32D foam cushioning, and premium stain-resistant textured upholstery fabrics engineered for long-lasting comfort.',
        image: '/furniture-sofa-set.jpg',
        keySpecs: [
          { label: 'Frame Material', value: 'Kiln-Dried Solid Hardwood & Plywood' },
          { label: 'Foam Density', value: '32D High-Resilience Comfort Layer' },
          { label: 'Upholstery', value: 'Stain-Resistant Textured Fabric / Velvet' },
          { label: 'Legs & Accents', value: 'Solid Tapered Natural Oak Wood' },
          { label: 'Configurations', value: '3-Seater, 2-Seater, 1-Seater & L-Sectional' },
          { label: 'Warranty', value: '5 Years Structural Frame Warranty' },
        ],
        features: [
          'Reinforced corner-blocked joints for superior load and structural stability',
          'Breathable, easy-to-clean stain-repellent surface fabrics',
          'Pocket-spring seat base for zero sagging and ergonomic posture support',
          'Detachable cushion covers for easy dry-cleaning and maintenance',
        ],
        applications: ['Residential living rooms, guest suites, luxury villas & executive lounges'],
        certifications: ['ISO 9001', 'FSC Certified Wood', 'BIFMA Compliant'],
      },
      {
        id: 'lounge-chairs',
        name: 'Lounge chairs',
        category: 'Furniture',
        headline: 'Ergonomic Designer Lounge Chairs & Relaxing Recliners',
        description:
          'Mid-century and contemporary accent lounge chairs with matching ottomans. Built with molded curved walnut veneer shells, genuine top-grain leather upholstery, and 360-degree silent ball-bearing swivel bases.',
        image: '/furniture-lounge-chair.jpg',
        keySpecs: [
          { label: 'Shell Construction', value: '7-Ply Molded Walnut / Oak Wood Veneer' },
          { label: 'Upholstery', value: 'Premium Top-Grain Leather / Boucle Fabric' },
          { label: 'Base Mechanism', value: '360° Die-Cast Aluminum Swivel Base' },
          { label: 'Ergonomics', value: 'Contoured Lumbar & Headrest Support' },
          { label: 'Included Accents', value: 'Matching Molded Ottoman Footstool' },
        ],
        features: [
          'High-density memory foam core tailored for fatigue relief',
          'Smooth silent 360° swivel with anti-scratch silicone floor glides',
          'Supple, durable leather treated for stain and wear resistance',
          'Iconic architectural silhouette elevating modern home interiors',
        ],
        applications: ['Master bedrooms, living room reading nooks, hotel suites & private offices'],
        certifications: ['BIFMA X5.1 Certified', 'FSC Wood Source', 'ISO 9001'],
      },
      {
        id: 'coffee-tables',
        name: 'Coffee tables',
        category: 'Furniture',
        headline: 'Minimalist & Sculptural Living Room Coffee Tables',
        description:
          'Designer centerpiece coffee table sets combining solid oak wood, polished natural travertine stone, and sleek fluted timber pillars. Designed for timeless living room elegance.',
        image: '/furniture-coffee-table.jpg',
        keySpecs: [
          { label: 'Tabletop Material', value: 'Natural Oak Wood / Honed Travertine Stone' },
          { label: 'Base Structure', value: 'Solid Fluted Timber / Matte Black Steel' },
          { label: 'Finish', value: 'Scratch-Resistant Polyurethane Matte Seal' },
          { label: 'Dimensions', value: 'Round 90cm Dia / Nesting 2-Piece Set' },
          { label: 'Edge Profile', value: 'Smooth Bullnose Rounded Edges (Child Safe)' },
        ],
        features: [
          'Waterproof and heat-resistant invisible nano-seal coating',
          'Nesting modular versatility for flexible entertaining setups',
          'Heavy-gauge stable weighted base preventing tipping',
          'Natural organic grain patterns making every piece unique',
        ],
        applications: ['Home living rooms, penthouse apartments & corporate reception spaces'],
        certifications: ['FSC Certified', 'Non-Toxic Low-VOC Finish'],
      },
      {
        id: 'dining-furniture',
        name: 'Dining furniture',
        category: 'Furniture',
        headline: 'Solid Wood & Sintered Stone Dining Sets (6 & 8 Seater)',
        description:
          'Contemporary dining tables paired with ergonomic cushioned chairs. Features thermal shock-resistant sintered stone tops and kiln-dried solid hardwood joinery.',
        image: '/furniture-dining-set.jpg',
        keySpecs: [
          { label: 'Top Surface', value: '12mm Scratch-Proof Sintered Stone / Solid Oak' },
          { label: 'Frame & Legs', value: 'Solid Hardwood with Steel Reinforcement' },
          { label: 'Seating Capacity', value: '6-Seater / 8-Seater Extendable' },
          { label: 'Chair Upholstery', value: 'Easy-Wipe High-Resilience Fabric' },
          { label: 'Heat Tolerance', value: 'Resistant to hot utensils up to 1200°C' },
        ],
        features: [
          'Non-porous, antibacterial surface that is 100% stain and scratch-proof',
          'Curved-back dining chairs engineered for long dinner gatherings',
          'Minimalist contemporary design with clean lines and sturdy footing',
        ],
        applications: ['Residential dining rooms, luxury farmhouses & boutique restaurants'],
        certifications: ['FSC Certified', 'ISO 9001', 'Food-Contact Safe Top'],
      },
      {
        id: 'cabinets',
        name: 'Cabinets',
        category: 'Furniture',
        headline: 'Modular Storage Credenzas, Sideboards & Wall Cabinets',
        description:
          'Sleek residential and office storage credenzas featuring soft-close German hardware hinges, fluted glass accents, and multi-compartment organized storage.',
        image: '/furniture-cabinet.jpg',
        keySpecs: [
          { label: 'Body Material', value: 'High-Density Engineered Wood with Oak Veneer' },
          { label: 'Hardware', value: 'Soft-Close Concealed Hinges & Push-to-Open' },
          { label: 'Internal Shelving', value: '3-Position Adjustable Height Shelves' },
          { label: 'Base Support', value: 'Powder-Coated Matte Black Steel Legs' },
        ],
        features: [
          'Anti-slam hydraulic damping hinges on all doors and drawers',
          'Integrated cable access ports for TV media and sound systems',
          'Wall anti-tip safety bracket kit included',
        ],
        applications: ['Living room media consoles, dining room buffets & home offices'],
        certifications: ['CARB Phase 2 Low Emission', 'FSC Certified'],
      },
      {
        id: 'work-desks',
        name: 'Work desks',
        category: 'Furniture',
        headline: 'Modern Modular Workstations & Executive Desks',
        description:
          'Clean-line office workstations and executive desking systems featuring integrated cable management raceways, scratch-resistant melamine surfaces, and sturdy powder-coated steel frames.',
        image: '/Interactive furniture gallery (3).png',
        keySpecs: [
          { label: 'Top Surface', value: '25mm Pre-Laminated Engineered Board' },
          { label: 'Leg Frame', value: 'Heavy-Gauge CRCA Steel Powder Coated' },
          { label: 'Cable Routing', value: 'Integrated Aluminum Wire Trunking' },
        ],
        features: [
          'Scratch and heat-resistant seamless edge-banded worktop',
          'Adjustable leveling glides for uneven flooring surfaces',
          'Compatible with privacy desk screens and under-desk drawer pedestals',
        ],
        applications: ['Corporate open offices, IT workstations & administrative centers'],
      },
      {
        id: 'executive-desks',
        name: 'Executive desks',
        category: 'Furniture',
        headline: 'Director & Executive Management Desking Suites',
        description:
          'Premium executive office tables with integrated side credenzas, wireless charging pads, and sleek modern veneer finishes.',
        image: '/Interactive furniture gallery (3).png',
        keySpecs: [
          { label: 'Top Material', value: 'Natural Wood Veneer with Leather Inlay' },
          { label: 'Storage', value: 'Integrated Lockable Side Return Credenza' },
        ],
        features: ['Concealed power and data grommets', 'Spacious executive footprint'],
        applications: ['Director cabins, boardroom offices & executive suites'],
      },
      {
        id: 'office-chairs',
        name: 'Office chairs',
        category: 'Furniture',
        headline: 'Ergonomic Mesh Task Chairs & Executive Seating',
        description:
          'Certified ergonomic task seating with breathable mesh backrests, synchronous tilt-lock mechanisms, pneumatic height adjustments, and contoured lumbar support.',
        image: '/Interactive furniture gallery (3).png',
        keySpecs: [
          { label: 'Mechanism', value: 'Synchro-Tilt with Multi-Position Lock' },
          { label: 'Gas Lift', value: 'Class 4 BIFMA Certified Pneumatic Cylinder' },
          { label: 'Base', value: 'Heavy-Duty 5-Star Nylon / Chrome Castors' },
        ],
        features: [
          'Breathable tensile mesh ensuring all-day thermal comfort',
          '2D / 3D adjustable armrests with soft PU padding',
          'Dual-wheel smooth-rolling nylon castors',
        ],
        applications: ['Office desks, conference rooms, call centers & home workspaces'],
      },
      {
        id: 'conference-tables',
        name: 'Conference tables',
        category: 'Furniture',
        headline: 'Boardroom & Conference Meeting Tables (8–20 Seater)',
        description:
          'Large-format meeting tables with concealed AV connectivity boxes, high-durability surfaces, and cable routing legs.',
        image: '/Interactive furniture gallery (3).png',
        keySpecs: [
          { label: 'Capacity', value: '8, 12, 16 & 20 Seater Modular Options' },
          { label: 'Connectivity', value: 'Dual Flip-Top HDMI/USB/Power Ports' },
        ],
        features: ['Robust steel sub-structure', 'Heavy-duty scratch-proof finish'],
        applications: ['Corporate boardrooms, conference centers & training rooms'],
      },
      {
        id: 'storage-units',
        name: 'Storage units',
        category: 'Furniture',
        headline: 'Office Metal Tambour Door Storage & File Pedestals',
        description:
          'Secure powder-coated steel filing cabinets, mobile pedestals, and sliding tambour units with master central key locking.',
        image: '/furniture-cabinet.jpg',
        keySpecs: [
          { label: 'Material', value: 'Cold-Rolled Commercial Steel (CRCA)' },
          { label: 'Locking', value: 'Central Master Key with Anti-Tilt Mechanism' },
        ],
        features: ['Smooth telescopic ball-bearing drawer slides', 'Durable powder coat'],
        applications: ['Office filing archives, legal records & workspace storage'],
      },
      {
        id: 'restaurant-seating',
        name: 'Restaurant seating',
        category: 'Furniture',
        headline: 'Durable Commercial & Hospitality Seating',
        description:
          'Heavy-traffic dining chairs, cafe seating, and barstools built with reinforced welded steel frames and commercial-grade easy-wipe upholstery.',
        image: '/Interactive furniture gallery (2).png',
        keySpecs: [
          { label: 'Frame', value: 'Seamless Tubular Steel / Solid Beechwood' },
          { label: 'Finish', value: 'Industrial Powder Coating / Natural Matte' },
          { label: 'Load Rating', value: 'Tested up to 150 kg static load' },
        ],
        features: [
          'Stackable designs available for flexible banquet storage',
          'Anti-scratch floor protective glides',
          'Resistant to food spills and commercial sanitizers',
        ],
        applications: ['Restaurants, food courts, cafeterias, hotels & reception areas'],
      },
      {
        id: 'dining-tables',
        name: 'Dining tables',
        category: 'Furniture',
        headline: 'Commercial Cafe & Restaurant Dining Tables',
        description:
          'Heavy-duty commercial dining tables with cast iron weighted pedestal bases and heat-resistant composite table tops.',
        image: '/furniture-dining-set.jpg',
        keySpecs: [
          { label: 'Base', value: 'Heavy Cast Iron Pyramid / Disc Base' },
          { label: 'Top', value: 'Compact Laminate / Solid Ash Wood' },
        ],
        features: ['Wobble-free adjustable leveling feet', 'High stain resistance'],
        applications: ['Cafes, bistros, food courts & hotel dining areas'],
      },
      {
        id: 'lounge-furniture',
        name: 'Lounge furniture',
        category: 'Furniture',
        headline: 'Hospitality & Hotel Lobby Lounge Furniture',
        description:
          'Curved modular sofas, tub chairs, and lounge tables creating welcoming conversation pods in luxury public spaces.',
        image: '/furniture-lounge-chair.jpg',
        keySpecs: [
          { label: 'Upholstery', value: 'Contract-Grade Commercial Velvet / Leather' },
          { label: 'Fire Rating', value: 'CAL 117 Fire Retardant Foam' },
        ],
        features: ['Modular arrangement flexibility', 'Reinforced commercial joinery'],
        applications: ['Hotel lobbies, airport lounges & luxury clubhouses'],
      },
      {
        id: 'reception-seating',
        name: 'Reception seating',
        category: 'Furniture',
        headline: 'Commercial Reception & Waiting Area Seating',
        description:
          'Modern modular waiting benches and tandem seating crafted for high-footfall reception lobbies.',
        image: '/furniture-sofa-set.jpg',
        keySpecs: [
          { label: 'Frame', value: 'Stainless Steel / Powder-Coated Beam' },
          { label: 'Comfort', value: 'Molded High-Density PU Foam Seats' },
        ],
        features: ['Easy to clean and disinfect', 'Heavy passenger weight rating'],
        applications: ['Hospital waiting rooms, corporate lobbies & airport terminals'],
      },
      {
        id: 'hospitality-sets',
        name: 'Hospitality sets',
        category: 'Furniture',
        headline: 'Full-Service Resort & Hotel Room Furniture Sets',
        description:
          'Coordinated hotel room furniture packages including headboards, nightstands, luggage racks, wardrobes, and writing desks.',
        image: '/Interactive furniture gallery (2).png',
        keySpecs: [
          { label: 'Package Includes', value: 'Bed Headboard, Nightstands, Wardrobe, Desk' },
          { label: 'Grade', value: '4-Star & 5-Star Hotel Commercial Grade' },
        ],
        features: ['Scratch-resistant melamine and solid wood edges', 'Turnkey installation support'],
        applications: ['Hotels, luxury resorts, serviced apartments & guest houses'],
      },
    ],
  },
  {
    id: 'electronics',
    category: 'Electronic Equipment',
    title: 'Industrial Electronics & Smart Hardware',
    tagline: 'Precision testing equipment, smart meters, telemetry modules, and microcontrollers.',
    description:
      'Importing specialized electronic hardware including IoT farm sensors, bidirectional smart net-meters, power quality analyzers, high-speed circuit breakers, and industrial control electronics.',
    productRange: ['Smart meters', 'IoT sensors', 'Power quality equipment', 'Control hardware'],
    image: '/electronic-smart-meters.jpg',
    iconName: 'Cpu',
    products: [
      {
        id: 'smart-meters',
        name: 'Smart meters',
        category: 'Electronic Equipment',
        headline: 'Bidirectional 3-Phase DLMS Smart Net-Meters',
        description:
          'High-precision digital energy meters supporting bidirectional import/export net-metering with remote optical, RS485, and 4G GPRS telemetry for rooftop solar and utility grid monitoring.',
        image: '/electronic-smart-meters.jpg',
        keySpecs: [
          { label: 'Accuracy Class', value: 'Class 1.0 / Class 0.5s Precision' },
          { label: 'Protocol', value: 'DLMS / COSEM & Modbus Standard' },
          { label: 'Telemetry', value: '4G Cellular, Optical & RS-485' },
          { label: 'Rating', value: '3x240V / 415V (Direct & CT Operated)' },
          { label: 'Sealing', value: 'Tamper-Evident IP54 Enclosure' },
        ],
        features: [
          'Accurate 4-quadrant active & reactive energy measurement',
          'Tamper detection with instantaneous real-time event logging',
          'DISCOM net-metering approved compliance across UP & National utilities',
          'Automated remote meter reading (AMR / AMI) ready',
        ],
        applications: ['Solar rooftop net-metering, DISCOM utility substations & industrial metering'],
        certifications: ['IS 16444', 'IS 15959 DLMS', 'BIS Certified', 'CE'],
      },
      {
        id: 'iot-sensors',
        name: 'IoT sensors',
        category: 'Electronic Equipment',
        headline: 'Agricultural & Environmental IoT Telemetry Sensors',
        description:
          'Ruggedized wireless agricultural sensor suites monitoring soil moisture, NPK fertility, ambient temperature, humidity, solar pyranometers, and telemetry for precision farming and solar plants.',
        image: '/electronic-iot-sensors.jpg',
        keySpecs: [
          { label: 'Sensor Types', value: 'Soil Moisture, NPK, Temperature, Irradiance' },
          { label: 'Connectivity', value: 'LoRaWAN, NB-IoT & 4G LTE' },
          { label: 'Power Source', value: 'Integrated Mini Solar Panel + LiFePO4' },
          { label: 'Enclosure', value: 'IP68 Submersible / Weatherproof' },
          { label: 'Range', value: 'Up to 5 km Long-Range Line-of-Sight' },
        ],
        features: [
          'Long-range wireless transmission up to 5km line-of-sight',
          'Ultra-low power consumption running years without maintenance',
          'Cloud API connectivity for automated irrigation and weather alerts',
          'Stainless steel probe needles resistant to soil acidity and corrosion',
        ],
        applications: ['Precision smart agriculture, automated drip irrigation & solar farm weather stations'],
        certifications: ['IP68 Tested', 'CE', 'RoHS', 'WPC Approved'],
      },
      {
        id: 'power-quality-equipment',
        name: 'Power quality equipment',
        category: 'Electronic Equipment',
        headline: 'Harmonic Filters, APFC & Power Quality Analyzers',
        description:
          'Real-time industrial power analyzers, automatic power factor controllers (APFC), and active harmonic filters designed to clean electrical harmonics, eliminate power fluctuations, and prevent utility penalties.',
        image: '/electronic-power-quality.jpg',
        keySpecs: [
          { label: 'Harmonic Compensation', value: 'Up to 50th Harmonic Order' },
          { label: 'Response Time', value: '< 5ms Instantaneous Correction' },
          { label: 'Sampling Rate', value: '25.6 kHz High-Speed DSP' },
          { label: 'Efficiency', value: '> 97.5% Operating Efficiency' },
          { label: 'Power Factor Target', value: 'Maintains PF > 0.99 Consistently' },
        ],
        features: [
          'Automatic power factor correction maintaining PF > 0.99',
          'Reduces transformer heating, line losses, and equipment downtime',
          'Comprehensive touch display with real-time waveform capture',
          'Modular rack-mount design with parallel expansion up to 1000A',
        ],
        applications: ['Heavy manufacturing substations, motor control centers & large commercial buildings'],
        certifications: ['IEC 61000-4-30 Class A', 'IEEE 519 Compliant', 'CE'],
      },
      {
        id: 'control-hardware',
        name: 'Control hardware',
        category: 'Electronic Equipment',
        headline: 'Industrial PLC & Automation Switchgear Modules',
        description:
          'Rugged microcontrollers, programmable logic controllers (PLCs), motorized circuit breakers, and DC/AC protection switchgear for solar EPC, agricultural pump automation, and industrial machinery.',
        image: '/electronic-control-hardware.jpg',
        keySpecs: [
          { label: 'Processor', value: '32-Bit ARM Cortex Industrial Core' },
          { label: 'I/O Channels', value: 'Digital & Analog Multi-Channel' },
          { label: 'Bus Standard', value: 'Modbus-RTU, CANopen & Profinet' },
          { label: 'Operating Temp', value: '-20°C to +70°C Wide Industrial Range' },
        ],
        features: [
          'Noise-immune optocoupler isolated I/O ports',
          'Din-rail mount compact footprint for electrical panels',
          'Wide operating temperature (-20°C to +70°C)',
          'High-speed relay outputs with built-in surge suppressor protection',
        ],
        applications: ['Solar string combiner boxes, agricultural pump automation & motor starters'],
        certifications: ['IEC 61131-2', 'CE', 'RoHS', 'ISO 9001'],
      },
    ],
  },
];

export const getImportProductByNameOrId = (identifier: string): ImportProductItem | undefined => {
  const query = identifier.toLowerCase().trim();
  for (const cat of IMPORT_CATEGORIES) {
    if (cat.products) {
      for (const p of cat.products) {
        if (
          p.id.toLowerCase() === query ||
          p.name.toLowerCase() === query ||
          p.name.toLowerCase().includes(query) ||
          query.includes(p.name.toLowerCase())
        ) {
          return p;
        }
      }
    }
  }

  // Fallback if product not explicitly in list
  return {
    id: identifier.toLowerCase().replace(/\s+/g, '-'),
    name: identifier,
    category: 'Imports Division',
    headline: `Certified Sourced ${identifier}`,
    description: `High-quality, internationally sourced ${identifier} with verified manufacturer certification, comprehensive durability testing, and direct import pricing.`,
    image: '/battery-backup.jpg',
    features: [
      'International quality assurance & ISO compliance',
      'Direct manufacturer sourcing with bulk wholesale pricing',
      'Comprehensive warranty and local engineering support in Fatehpur & UP',
    ],
    applications: ['Commercial, residential, and agricultural infrastructure projects'],
  };
};
