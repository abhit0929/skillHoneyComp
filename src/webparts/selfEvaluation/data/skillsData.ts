import { SkillsData, Skill, SkillEntity } from "../types/skills";

export const entities: SkillEntity[] = [
  {
    id: "all",
    name: "All C&P entities",
    color: "#004F00",
    textColor: "#FFFFFF",
  },
  { id: "finance", name: "Finance", color: "#C9C9FF", textColor: "#000000" },
  {
    id: "procurement",
    name: "Procurement",
    color: "#7030A0",
    textColor: "#FFFFFF",
  },
  { id: "aviation", name: "Aviation", color: "#92D050", textColor: "#000000" },
  {
    id: "biofuels",
    name: "Biofuels growth",
    color: "#00CC99",
    textColor: "#000000",
  },
  { id: "fsm", name: "FS&M", color: "#FFFF00", textColor: "#000000" },
  { id: "tech", name: "Tech", color: "#BFAD00", textColor: "#FFFFFF" },
  { id: "castrol", name: "Castrol", color: "#3C7D22", textColor: "#FFFFFF" },
  { id: "pulse", name: "Pulse", color: "#99FF66", textColor: "#000000" },
  { id: "mc", name: "M&C", color: "#CCFFCC", textColor: "#000000" },
  { id: "marketing", name: "Marketing", color: "#E97132", textColor: "#FFFFFF" },
  { id: "outsidecp", name: "Outside C&P", color: "#FFF599", textColor: "#000000" },
  { id: "outsidebp", name: "Outside bp", color: "#C2C2C2", textColor: "#000000" },
];

// Exact positioning based on Figma design
export const skills: Skill[] = [
  // Center hexagon
  {
    id: "center",
    name: "C&P skills",
    type: "center",
    entities: ["all"],
    position: { x: 0, y: 0 },
    ring: 0,
  },

  // Inner ring - 6 core skills (positioned for 2px gaps with 77px hexagons)
  {
    id: "safety",
    name: "Safety",
    type: "core",
    entities: ["all"],
    position: { x: 0, y: -136 },
    ring: 1,
  },
  {
    id: "technology-innovation",
    name: "Technology & Innovation",
    type: "core",
    entities: ["all", "tech", "castrol", "pulse", "mc"],
    position: { x: -118, y: 68 },
    ring: 1,
  },
  {
    id: "commercial",
    name: "Commercial",
    type: "core",
    entities: [
      "all",
      "finance",
      "procurement",
      "aviation",
      "biofuels",
      "fsm",
      "castrol",
      "pulse",
      "mc",
    ],
    position: { x: 118, y: -68 },
    ring: 1,
  },
  {
    id: "operations",
    name: "Operations",
    type: "core",
    entities: ["all", "castrol", "fsm", "biofuels", "pulse", "mc"],
    position: { x: 118, y: 68 },
    ring: 1,
  },
  {
    id: "strategic-leadership",
    name: "Strategic leadership",
    type: "core",
    entities: ["all"],
    position: { x: 0, y: 136 },
    ring: 1,
  },
  {
    id: "stakeholder-regulatory",
    name: "Stakeholder and regulatory engagement",
    type: "core",
    entities: ["all", "castrol", "pulse", "mc", "fsm"],
    position: { x: -118, y: -68 },
    ring: 1,
  },

  // Outer ring - Specialized skills positioned exactly as in Figma

  // Safety cluster (top area) - positioned for 2px gaps
  {
    id: "safety-leadership",
    name: "Safety leadership",
    type: "specialized",
    category: "safety",
    entities: ["all"],
    position: { x: 0, y: -355 },
    ring: 2,
    subSkillDescription:
      "Understanding safety culture models, safety leadership principles and the application of these to develop a strong bp safety culture.",
  },

  // Stakeholder & Regulatory cluster (left side) - positioned for 2px gaps
  {
    id: "stakeholder-partnership-management",
    name: "Stakeholder and partnership management",
    type: "specialized",
    category: "stakeholder-regulatory",
    entities: ["castrol", "pulse", "mc"],
    position: { x: -406, y: -170 },
    ring: 2,
    subSkillDescription:
      "Builds trust and alignment among diverse groups to enable successful delivery of projects, initiatives, and business outcomes.",
  },
  {
    id: "stakeholder-and-regulatory-engagement",
    name: "Stakeholder and regulatory engagement",
    type: "specialized",
    category: "stakeholder-regulatory",
    entities: ["fsm", "castrol", "pulse", "mc"],
    position: { x: -406, y: -306 },
    ring: 2,
    subSkillDescription:
      "Establish and manage mutually beneficial and responsive relationships with and between partners and other stakeholders, managing issues by considering needs, commitments, and expectations of all parties.",
  },
  {
    id: "government-relations",
    name: "Government relations",
    type: "specialized",
    category: "stakeholder-regulatory",
    entities: ["mc"],
    position: { x: -288, y: -238 },
    ring: 2,
    subSkillDescription:
      "Navigates regulatory environments and engages with policymakers to support organizational objectives and maintain license to operate.",
  },
  {
    id: "sustainability-innovation",
    name: "Sustainability and innovation",
    type: "specialized",
    category: "stakeholder-regulatory",
    entities: ["all"],
    position: { x: -524, y: -102 },
    ring: 2,
    subSkillDescription:
      "Integrates responsible practices and creative thinking to future-proof the business and deliver positive environmental and social impact.",
  },

  // Technology & Innovation cluster (left area) - positioned for 2px gaps
  {
    id: "digital-fluency",
    name: "Digital fluency & data analysis",
    type: "specialized",
    category: "technology-innovation",
    entities: ["tech", "castrol", "pulse", "mc"],
    position: { x: -446, y: 112 },
    ring: 2,
    subSkillDescription:
      "Uses bp's digital tools or other appropriate technologies to maximize personal, team and business productivity.",
  },
  {
    id: "digital-transformation",
    name: "Digital transformation and technology innovation",
    type: "specialized",
    category: "technology-innovation",
    entities: ["all"],
    position: { x: -328, y: 180 },
    ring: 2,
    subSkillDescription:
      "Keeps up to date on new and upcoming technology areas, to interpret trends and value drivers and then integrates these into working practices to drive efficiencies.",
  },

  // Commercial cluster (top right area)
  {
    id: "commercial-strategy",
    name: "Commercial strategy",
    type: "specialized",
    category: "commercial",
    entities: ["all"],
    position: { x: 286, y: -339 },
    ring: 2,
    subSkillDescription:
      "Shapes the organization's direction by identifying market opportunities, aligning resources, and setting priorities that drive long-term competitive advantage.",
  },
  {
    id: "commercial-pl",
    name: "Commercial P&L",
    type: "specialized",
    category: "commercial",
    entities: ["aviation", "castrol", "pulse", "mc"],
    position: { x: 168, y: -271 },
    ring: 2,
    subSkillDescription:
      "Maximizes business value by ensuring revenue streams are optimized, costs are controlled, and financial outcomes support sustainable growth.",
  },
  {
    id: "procurement",
    name: "Procurement",
    type: "specialized",
    category: "commercial",
    entities: ["procurement", "castrol", "mc"],
    position: { x: 404, y: -271 },
    ring: 2,
    subSkillDescription:
      "The management of regional and global related data sets throughout their lifecycle, including the acquisition and maintenance of raw and interpreted data, so they can be used by domain specific specialists or other interested parties. Includes contracts, rates, supplier information exchange, external benchmarking of suppliers. Includes knowledge and expertise working with data in one or more of the following areas of procurement and supply chain management (vendor, commodity, sourcing event, purchase order, opportunity, receipt, category case, invoice, contract, requisition, payment, procurement saving and expense).",
  },
  {
    id: "commercial-financial-acumen",
    name: "Commercial and financial acumen",
    type: "specialized",
    category: "commercial",
    entities: ["all"],
    position: { x: 286, y: -203 },
    ring: 2,
    subSkillDescription:
      "Applies a deep understanding of business drivers and financial principles to inform decisions, manage risk, and unlock value across the enterprise.",
  },
  {
    id: "customer-centric",
    name: "Customer - centric and market-driven approach",
    type: "specialized",
    category: "commercial",
    entities: ["castrol", "pulse", "mc"],
    position: { x: 404, y: -135 },
    ring: 2,
    subSkillDescription:
      "Prioritizes the needs and expectations of customers and leverages market insights to deliver solutions that differentiate and create loyalty.",
  },
  {
    id: "commercial-bd",
    name: "Commercial BD",
    type: "specialized",
    category: "commercial",
    entities: ["aviation", "biofuels", "castrol", "mc"],
    position: { x: 522, y: -203 },
    ring: 2,
    subSkillDescription:
      "Understands how opportunities to develop the business are identified, prioritized and managed through the appropriate processes. Ensures opportunities are aligned with the  strategy and value proposition, can articulate the potential impact.",
  },
  {
    id: "partnership-alliance",
    name: "Partnership and alliance development",
    type: "specialized",
    category: "commercial",
    entities: ["fsm", "castrol", "pulse", "mc"],
    position: { x: 404, y: -407 },
    ring: 2,
    subSkillDescription:
      "Forges collaborative relationships with external organizations to unlock new opportunities, accelerate innovation, and achieve shared objectives.",
  },
  {
    id: "financial-modelling",
    name: "Financial modelling",
    type: "specialized",
    category: "commercial",
    entities: ["finance"],
    position: { x: 522, y: -339 },
    ring: 2,
    subSkillDescription:
      "Take a financial model from a target (in an acquisition example) and identify areas where challenge should be applied, contracts or agreements referenced and judgement applied to realize realistic outcomes. Take an internal model when considering divesting and knowing what level of modelling can be shared and where additional sanitization needs to take place as well as assumptions adjusted for external consumption.",
  },
  {
    id: "investment-strategy",
    name: "Investment strategy",
    type: "specialized",
    category: "commercial",
    entities: ["aviation", "biofuels", "fsm", "pulse"],
    position: { x: 522, y: -67 },
    ring: 2,
    subSkillDescription:
      "Understanding and influencing governance and investment strategy for defined contribution pension schemes.",
  },

  // Operations cluster (right side)
  {
    id: "operational-supply-chain",
    name: "Operational and supply chain expertise",
    type: "specialized",
    category: "operations",
    entities: ["castrol", "biofuels", "pulse"],
    position: { x: 286, y: 0 },
    ring: 2,
    subSkillDescription:
      "Ensures seamless delivery of products and services by optimizing processes, managing risks, and maintaining high standards of quality and reliability.",
  },
  {
    id: "supply-chain-management",
    name: "Supply chain management",
    type: "specialized",
    category: "operations",
    entities: ["biofuels", "castrol", "mc"],
    position: { x: 404, y: 68 },
    ring: 2,
    subSkillDescription:
      "Able to understand supply chain principles and concepts (e.g. supply and demand planning, inventory planning and operations planning). Able to optimise product sourcing and supply including managing partner exchanges. Understands trading principles and how bp operates in support of supply chain activities. Can apply these concepts and knowledge in the supply chain decision-making processes.",
  },
  {
    id: "cost-discipline",
    name: "Cost discipline",
    type: "specialized",
    category: "operations",
    entities: ["all"],
    position: { x: 522, y: 136 },
    ring: 2,
    subSkillDescription:
      "Embeds a culture of efficiency and accountability, ensuring resources are allocated wisely and waste is minimized to protect margins.",
  },
  {
    id: "retail-operations",
    name: "Retail operations",
    type: "specialized",
    category: "operations",
    entities: ["mc"],
    position: { x: 404, y: 204 },
    ring: 2,
    subSkillDescription:
      "Delivers outstanding customer experiences and commercial results by managing site performance, people, and processes with operational excellence.",
  },
  {
    id: "global-team-leadership",
    name: "Global team leadership",
    type: "specialized",
    category: "operations",
    entities: ["pulse", "fsm", "castrol"],
    position: { x: 522, y: 272 },
    ring: 2,
    subSkillDescription:
      "Inspires and empowers diverse teams across geographies to collaborate effectively and achieve shared goals.",
  },

  // Strategic Leadership cluster (bottom area)
  {
    id: "cross-functional-collaboration",
    name: "Cross functional collaboration",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: 118, y: 308 },
    ring: 2,
    subSkillDescription:
      "Collaborate thoughtfully with people internally and externally to get better results.",
  },
  {
    id: "leading-through-change",
    name: "Leading through change",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: 236, y: 376 },
    ring: 2,
    subSkillDescription:
      "Consider impact of proposed change on others. Recognise where colleagues are on the change curve and proactively support them through each stage. Involve others in change initiatives to foster ownership and design the best solutions for bp.",
  },
  {
    id: "strategic-leadership-skill",
    name: "Strategic leadership",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: 118, y: 444 },
    ring: 2,
    subSkillDescription:
      "Sets a clear vision, motivates others, and guides the organization through complexity and change to achieve sustainable success.",
  },
  {
    id: "negotiation",
    name: "Negotiation",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: 236, y: 512 },
    ring: 2,
    subSkillDescription:
      "Achieves mutually beneficial agreements by balancing interests, managing risk, and building long-term relationships with partners and suppliers.",
  },
  {
    id: "talent-management",
    name: "Talent management",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: 0, y: 376 },
    ring: 2,
    subSkillDescription:
      "Maximising potential through talent identification, engagement and planning. Using data from workforce, succession and contingency planning tools to understand what talent exists within the organisation, what talent populations are needed, and the identification of individuals who are particularly valuable to an organisation. Design, develop and implement the most effective methods by which to develop and retain  different talent pools.",
  },
  {
    id: "authentic-leadership",
    name: "Authentic leadership",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: -118, y: 308 },
    ring: 2,
    subSkillDescription:
      "Has and demonstrates a clear vision of who they are as a leader, including what they want and stand for. Holds true to this even under pressure.",
  },
  {
    id: "enterprise-leadership",
    name: "Enterprise leadership",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: -236, y: 376 },
    ring: 2,
    subSkillDescription:
      "Champions a holistic perspective, aligning functions and stakeholders to deliver integrated solutions and drive organizational transformation.",
  },
  {
    id: "high-performance-teams",
    name: "Building and leading high-performance teams",
    type: "specialized",
    category: "strategic-leadership",
    entities: ["all"],
    position: { x: -118, y: 444 },
    ring: 2,
    subSkillDescription:
      "Applies financial acumen, market intelligence and structured thinking to identify business opportunities and shape future activities of the team, through creating a positive and productive environment based on psychological safety, inclusive leadership and speaking up culture.",
  },
];

export const skillsData: SkillsData = {
  entities,
  skills,
};
