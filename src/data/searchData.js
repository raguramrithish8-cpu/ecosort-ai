// Searchable dataset for CIRCULAI application
export const searchItems = [
  // WASTE TYPES & MATERIALS
  {
    id: 'mat-plastic-bottle',
    title: 'Plastic Bottle',
    type: 'WASTE TYPE',
    category: 'Plastic',
    material: 'PET Plastic (Polyethylene Terephthalate)',
    recyclability: '89%',
    recoveryRate: '89%',
    recoveryPotential: 'High',
    estimatedValue: '₹12,400',
    recommendedStream: 'Plastic Recycling Stream',
    description: 'Plastic bottles made from PET can be collected, sorted and processed through the appropriate plastic recycling stream. PET plastic bottles have high recovery value and can be fully recycled into new plastic containers and synthetic fibers.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-pet-plastic',
    title: 'PET Plastic',
    type: 'MATERIAL',
    category: 'Plastic',
    material: 'PET Plastic (Type 1)',
    recyclability: '89%',
    recoveryRate: '89%',
    recoveryPotential: 'High',
    estimatedValue: '₹12,400',
    recommendedStream: 'Plastic Pelletizing Stream',
    description: 'Polyethylene Terephthalate (PET) is a transparent, strong, and lightweight plastic widely used for packaging foods and beverages. Highly recyclable into rPET flakes and pellets.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-cardboard',
    title: 'Cardboard Box',
    type: 'WASTE TYPE',
    category: 'Paper',
    material: 'Corrugated Paperboard',
    recyclability: '92%',
    recoveryRate: '90%',
    recoveryPotential: 'High',
    estimatedValue: '₹6,800',
    recommendedStream: 'Paper & Packaging Recycling Stream',
    description: 'Corrugated cardboard boxes can be repulped to separate cellulose fibers. The pulp is filtered, pressed, and dried to form new kraft linerboard and recycled packaging boxes.',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-paper',
    title: 'Paper Waste',
    type: 'MATERIAL',
    category: 'Paper',
    material: 'De-inked Cellulose Fiber',
    recyclability: '90%',
    recoveryRate: '90%',
    recoveryPotential: 'High',
    estimatedValue: '₹5,400',
    recommendedStream: 'Paper Repulping Stream',
    description: 'Office paper, newsprint, and magazines are collected, de-inked, and turned into recycled paper products, tissue paper, and molded pulp trays.',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-aluminium-can',
    title: 'Aluminium Can',
    type: 'WASTE TYPE',
    category: 'Metal',
    material: 'Aluminium Alloy 3004',
    recyclability: '96%',
    recoveryRate: '96%',
    recoveryPotential: 'High',
    estimatedValue: '₹9,200',
    recommendedStream: 'Non-Ferrous Smelting Stream',
    description: 'Aluminium beverage cans are 100% recyclable infinitely without degradation of quality. Recycling aluminium saves 95% of energy required to process raw bauxite.',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-metal',
    title: 'Scrap Metal',
    type: 'MATERIAL',
    category: 'Metal',
    material: 'Ferrous & Non-Ferrous Alloys',
    recyclability: '94%',
    recoveryRate: '94%',
    recoveryPotential: 'High',
    estimatedValue: '₹8,500',
    recommendedStream: 'Metals Reclamation Plant',
    description: 'Steel cans, copper wiring, and metal scraps are sorted using magnetic separators and eddy current sorters, then melted in electric arc furnaces.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-glass-bottle',
    title: 'Glass Bottle',
    type: 'WASTE TYPE',
    category: 'Glass',
    material: 'Soda-Lime Cullet Glass',
    recyclability: '80%',
    recoveryRate: '80%',
    recoveryPotential: 'Medium',
    estimatedValue: '₹2,100',
    recommendedStream: 'Glass Cullet Furnace Stream',
    description: 'Clear, amber, and green glass bottles are crushed into cullet, mixed with silica sand and soda ash, and melted into brand new glass containers.',
    imageUrl: 'https://images.unsplash.com/photo-1516888693095-f0e05366ddc6?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-organic',
    title: 'Food Waste / Organic',
    type: 'WASTE TYPE',
    category: 'Organic',
    material: 'Biodegradable Organic Matter',
    recyclability: '75%',
    recoveryRate: '75%',
    recoveryPotential: 'Medium',
    estimatedValue: '₹1,650',
    recommendedStream: 'Anaerobic Digestion & Composting',
    description: 'Food scraps and organic materials are diverted to aerobic composting units or anaerobic digesters to produce bio-fertilizers and renewable biogas.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-e-waste',
    title: 'E-Waste',
    type: 'WASTE TYPE',
    category: 'E-Waste',
    material: 'Printed Circuit Boards & Components',
    recyclability: '68%',
    recoveryRate: '65%',
    recoveryPotential: 'High',
    estimatedValue: '₹18,500',
    recommendedStream: 'Specialized E-Waste Refinery',
    description: 'Discarded electronics are safely disassembled to recover precious metals like gold, silver, copper, and palladium while preventing toxic heavy metal contamination.',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-textile',
    title: 'Textile Waste',
    type: 'MATERIAL',
    category: 'Textile',
    material: 'Cotton & Synthetic Fabrics',
    recyclability: '55%',
    recoveryRate: '50%',
    recoveryPotential: 'Medium',
    estimatedValue: '₹3,200',
    recommendedStream: 'Textile Fiber Shredding Stream',
    description: 'Fabric clippings and old garments are mechanically shredded to extract fibers for acoustic insulation, automotive padding, and recycled yarn.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-rubber',
    title: 'Rubber Waste',
    type: 'MATERIAL',
    category: 'Rubber',
    material: 'Vulcanized Elastomer',
    recyclability: '60%',
    recoveryRate: '58%',
    recoveryPotential: 'Medium',
    estimatedValue: '₹4,100',
    recommendedStream: 'Crumb Rubber Granulation Stream',
    description: 'Used tyres and industrial rubber products are cryogenically ground into granules for rubberized asphalt roadways, playground surfaces, and molded tiles.',
    imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },
  {
    id: 'mat-mixed-waste',
    title: 'Non-Recyclable Waste',
    type: 'WASTE TYPE',
    category: 'Mixed Waste',
    material: 'Contaminated Multi-Layer Plastic',
    recyclability: '18%',
    recoveryRate: '18%',
    recoveryPotential: 'Low',
    estimatedValue: '₹280',
    recommendedStream: 'Waste-to-Energy Facility',
    description: 'Composite packaging and heavily contaminated waste that cannot be recycled mechanically are sent to high-efficiency Waste-to-Energy incinerators to generate electricity.',
    imageUrl: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=600&q=80',
    page: 'classification'
  },

  // REPORTS
  {
    id: 'rep-daily',
    title: 'Daily Waste Report',
    type: 'REPORT',
    category: 'Daily',
    material: 'Daily Operations Log',
    recyclability: '100%',
    recoveryRate: '100%',
    recoveryPotential: 'High',
    estimatedValue: 'Generated Daily',
    recommendedStream: 'Executive Report Repository',
    description: 'Comprehensive 24-hour log detailing total waste volume, AI detection throughput, contamination alerts, and recovery metrics.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    page: 'reports'
  },
  {
    id: 'rep-weekly',
    title: 'Weekly Waste Summary',
    type: 'REPORT',
    category: 'Weekly',
    material: '7-Day Aggregated Intelligence',
    recyclability: '100%',
    recoveryRate: '100%',
    recoveryPotential: 'High',
    estimatedValue: 'Generated Weekly',
    recommendedStream: 'Operations Planning',
    description: '7-day trend analysis of waste diversion, material breakdown, landfill diversion percentage, and financial value recovered.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    page: 'reports'
  },
  {
    id: 'rep-classification',
    title: 'Waste Classification Report',
    type: 'REPORT',
    category: 'Classification',
    material: 'AI Material Categorization Data',
    recyclability: '100%',
    recoveryRate: '100%',
    recoveryPotential: 'High',
    estimatedValue: 'On Demand',
    recommendedStream: 'Quality Audit Team',
    description: 'Deep-dive analysis of material categories classified by AI computer vision models across all facility sorting lines.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    page: 'reports'
  },
  {
    id: 'rep-recovery',
    title: 'Recovery Intelligence Report',
    type: 'REPORT',
    category: 'Recovery',
    material: 'Material Economics & Yield',
    recyclability: '100%',
    recoveryRate: '100%',
    recoveryPotential: 'High',
    estimatedValue: '₹18,450 Total',
    recommendedStream: 'Financial Intelligence',
    description: 'Valuation report mapping weight of recovered materials to current commodity market prices and estimated financial return.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    page: 'reports'
  },
  {
    id: 'rep-circular',
    title: 'Circular Economy Report',
    type: 'REPORT',
    category: 'Circular',
    material: 'Systemic Loop Metrics',
    recyclability: '100%',
    recoveryRate: '100%',
    recoveryPotential: 'High',
    estimatedValue: 'Strategic Analysis',
    recommendedStream: 'Sustainability Governance Board',
    description: 'High-level circular economy decision support report highlighting closed-loop material flows, carbon emission offsets, and industrial symbiosis opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    page: 'reports'
  }
];

export function performSearch(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  
  return searchItems.filter(item => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.material.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.recommendedStream && item.recommendedStream.toLowerCase().includes(q))
    );
  });
}
