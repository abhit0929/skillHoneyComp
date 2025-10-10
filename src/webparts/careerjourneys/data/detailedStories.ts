import { DetailedSuccessStory, SuccessStoryListItem } from "../shared/types/unified-data";

// Resolve images through the bundler so the runtime URL is correct
const paulAImage =
  (require("../assets/images/paul-a.png").default ??
    require("../assets/images/paul-a.png")) as string;
const robGraceImage =
  (require("../assets/images/rob-grace.png").default ??
    require("../assets/images/rob-grace.png")) as string;
const ajayJoshiImage =
  (require("../assets/images/ajay-j.png").default ??
    require("../assets/images/ajay-j.png")) as string;

export const paulAStory: DetailedSuccessStory = {
  id: "paul-a",
  name: "Paul A.",
  careerJourney: "Joined bp in 2006",
  testimonial:
    "I didn’t plan this path, but every pivot has led me closer to what I love doing: developing teams and running complex businesses!",
  quote:
    "I never thought moving sideways into supply chain would prepare me so well for senior leadership.",
  imageUrl: paulAImage,
  primaryEntityId: "mc",
  skillsBackpack: [
    {
      categoryId: "operations",
      ratings: "3",
      skills: [
        { skillId: "cost-discipline", proficiencyLevel: "Basic" },
        { skillId: "supply-chain-management", proficiencyLevel: "Basic" },
      ],
    },
    {
      categoryId: "commercial",
      ratings: "4",
      skills: [
        { skillId: "commercial-financial-acumen", proficiencyLevel: "Excellent" },
        { skillId: "commercial-bd", proficiencyLevel: "Basic" },
        { skillId: "customer-centric", proficiencyLevel: "Basic" },
        { skillId: "retail-operations", proficiencyLevel: "Basic" },
      ],
    },
    {
      categoryId: "strategic-leadership",
      ratings: "1",
      skills: [
        { skillId: "enterprise-leadership", proficiencyLevel: "Basic" },
      ],
    },
  ],
  careerPath: [
    {
      role: "Business Development",
      description:
        "Family publishing business, managing financial accounts, business development and operations.",
      department: "NA",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Built foundational skills in finance, operations, and customer growth.",
      position: { x: 206, y: 421 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 40, y: 37 },
    },
    {
      role: "Business Analyst/Sales Coordinator",
      description:
        "Performance management, external negotiations, exposure to full P&L, BS and cashflow and Customer growth.",
      department: "Castrol",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Gained full P&L exposure and negotiation experience.",
      position: { x: 300, y: 371 },
      hexOffset: { x: 124, y: 50 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Strategic Pricing Advisor",
      description:
        "Exposure to full fuels value chain, understanding of oil markets, exposure to Channel of Trade from retail to trading seeking to grow bp value.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Developed deep understanding of value chain and pricing dynamics.",
      position: { x: 557, y: 421 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 0, y: 35 },
    },
    {
      role: "Supply Product Operator",
      description:
        "Execution and optimisation of Import Trading Program for ANZ, gain understanding of product quality and operations. Interface with Trading and external counterparts and maximize bp value.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Ensured fuel security while honing financial and negotiation skills.",
      position: { x: 624, y: 312 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 40, y: 0 },
    },
    {
      role: "Product Scheduler/Supply Negotiator",
      description:
        "Ensuring fuel supply security, optimizing P&L, WC/Cash. Greater external exposure and internal interphases.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Learned to optimize import programs and maximize trading value.",
      position: { x: 192, y: 311 },
      hexOffset: { x: 296, y: 6 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Transformation Manager",
      description:
        "Operating model transformation across Refining and Terminals, driving optimization, simplification and enabling growth. External negotiations and exposure to broader bp group.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Drove operating model transformation and cultural change.",
      position: { x: 170, y: 241 },
      hexOffset: { x: 219, y: 7 },
      badgeOffset: { x: 10, y: 2 },
    },
    {
      role: "Commercial Development Lead",
      description:
        "Downstream new market entry. External stakeholders (Government and partners). Talent and culture management. Operating model set up. Global teams.",
      department: "FS&M",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Led market entry, stakeholder engagement, and global team building.",
      position: { x: 486, y: 159 },
      hexOffset: { x: 0, y: 7 },
      badgeOffset: { x: 41, y: 0 },
    },
    {
      role: "GM UK&France",
      description:
        "Operational accountability incl JV's. Development of midstream infrastructure. Integrations with Trading to increase value delivery to customers and bp.",
      department: "Aviation",
      countryMobility: "Yes",
      movementType: "Lateral",
      learningMilestones:
        "Managed midstream accountability and integrated trading for value delivery.",
      position: { x: 168, y: 159 },
      hexOffset: { x: 189, y: 5 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Commercial Development Director",
      description:
        "Accountable for global business development across LATAM, Asia and Middle East. Digital and sustainability global strategy. Global teams.",
      department: "Aviation",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Oversaw global business development with digital and sustainability focus.",
      position: { x: 402, y: 85 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 30, y: 0 },
    },
    {
      role: "VP M&C Mexico",
      description:
        "P&L and operational accountability for Integrated FVC. External relationships, Government and agencies. Leading through change.",
      department: "M&C",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Held P&L accountability while leading external relationships and change.",
      position: { x: 135, y: 56 },
      hexOffset: { x: 177, y: 6 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "SVP Mobility Convenience & Midstream, Asia Pacific",
      description:
        "Full P&L and operational accountability for Integrated Mobility and FVC. Business Transformation, Strategy delivery, Management of JV's. Integration across S&TS. Talent Management and Culture, and performance reset.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Delivered end-to-end business transformation and integration at global scale.",
      position: { x: 327, y: -5 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 41, y: 0 },
    },
  ],
};

export const robGraceStory: DetailedSuccessStory = {
  id: "rob-grace",
  name: "Rob Grace",
  careerJourney: "Joined bp in 2007",
  testimonial:
    "This wasn't the career I expected when I joined as a Chemist, but I have loved the variety. I love applying my problem-solving skills to all parts of the value chain from refinery gate to distributors to vehicles driving around the world!",
  quote:
    "Fuel science opened doors I never imagined—from lab experiments to leading global product launches.",
  imageUrl: robGraceImage,
  primaryEntityId: "castrol",
  skillsBackpack: [
    {
      categoryId: "safety",
      ratings: "3",
      skills: [
        { skillId: "safety-leadership", proficiencyLevel: "Intermediate" },
      ],
    },
    {
      categoryId: "commercial",
      ratings: "3",
      skills: [
        { skillId: "commercial-pl", proficiencyLevel: "Advanced" },
        { skillId: "commercial-strategy", proficiencyLevel: "Advanced" },
        { skillId: "partnership-alliance", proficiencyLevel: "Advanced" },
        {
          skillId: "commercial-financial-acumen",
          proficiencyLevel: "Advanced",
        },
        { skillId: "procurement", proficiencyLevel: "Intermediate" },
        { skillId: "financial-modelling", proficiencyLevel: "Intermediate" },
        { skillId: "commercial-bd", proficiencyLevel: "Advanced" },
        { skillId: "investment-strategy", proficiencyLevel: "Advanced" },
        { skillId: "customer-centric", proficiencyLevel: "Advanced" },
      ],
    },
    {
      categoryId: "operations",
      ratings: "3",
      skills: [
        {
          skillId: "operational-supply-chain",
          proficiencyLevel: "Advanced",
        },
        { skillId: "supply-chain-management", proficiencyLevel: "Advanced" },
        { skillId: "retail-operations", proficiencyLevel: "Advanced" },
        { skillId: "global-team-leadership", proficiencyLevel: "Advanced" },
        { skillId: "cost-discipline", proficiencyLevel: "Intermediate" },
      ],
    },
    {
      categoryId: "strategic-leadership",
      ratings: "3",
      skills: [
        { skillId: "enterprise-leadership", proficiencyLevel: "Advanced" },
        {
          skillId: "strategic-leadership-skill",
          proficiencyLevel: "Advanced",
        },
        { skillId: "authentic-leadership", proficiencyLevel: "Advanced" },
        { skillId: "talent-management", proficiencyLevel: "Advanced" },
        { skillId: "negotiation", proficiencyLevel: "Advanced" },
        { skillId: "leading-through-change", proficiencyLevel: "Advanced" },
        {
          skillId: "cross-functional-collaboration",
          proficiencyLevel: "Advanced",
        },
        { skillId: "high-performance-teams", proficiencyLevel: "Advanced" },
      ],
    },
    {
      categoryId: "stakeholder-regulatory",
      ratings: "3",
      skills: [
        { skillId: "government-relations", proficiencyLevel: "Intermediate" },
        {
          skillId: "stakeholder-partnership-management",
          proficiencyLevel: "Advanced",
        },
        { skillId: "stakeholder-regulatory", proficiencyLevel: "Advanced" },
        {
          skillId: "sustainability-innovation",
          proficiencyLevel: "Intermediate",
        },
      ],
    },
    {
      categoryId: "technology-innovation",
      ratings: "3",
      skills: [
        { skillId: "digital-transformation", proficiencyLevel: "Advanced" },
        { skillId: "digital-fluency", proficiencyLevel: "Advanced" },
      ],
    },
  ],
  careerPath: [
    {
      role: "Graduate Chemist FPT",
      description:
        "Seconded to three teams: Product Quality & Aviation, Marine Fuels and Gasoline Product Development.",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Built broad technical foundation and learned to adapt across diverse teams and functions.",
      position: { x: 206, y: 421 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 40, y: 37 },
    },
    {
      role: "Development Technologist FPT",
      description:
        "Managed engine and vehicle test budgets of $1.5 million.",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Strengthened technical and budget management skills and gained early leadership exposure.",
      position: { x: 300, y: 371 },
      hexOffset: { x: 124, y: 50 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Fuel Product Advisor & Marketing Analyst",
      description:
        "Co-engineered and piloted a new fuel dispenser; resulted in a 2.5% increase in premium fuel sales.",
      department: "Marketing",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Connected technical know-how with market insights to unlock commercial value.",
      position: { x: 547, y: 421 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 0, y: 35 },
    },
    {
      role: "B2B Commercial Offers Manager",
      description:
        "Led the global development of next-generation gasoline for consumers and diesel for trucks.",
      department: "Marketing",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Developed strategic offer design and led global product launches and stakeholder alignment.",
      position: { x: 600, y: 312 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 28, y: 0 },
    },
    {
      role: "Global Launch Event Project Manager",
      description:
        "Delivered bp's biggest ever fuels launch: a five-day event with ~1,500 attendees across 15 countries and two brands.",
      department: "Marketing",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Mastered large-scale global event execution and coordinated across countries, brands and functions.",
      position: { x: 182, y: 311 },
      hexOffset: { x: 286, y: 6 },
      badgeOffset: { x: 0, y: 1 },
    },
    {
      role: "Head of Marketing and Offer Development - Mexico",
      description:
        "Generated over $1.6M of PR across Mexico, achieving print coverage in all 32 states and international radio and TV coverage.",
      department: "M&C",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Deepened leadership experience and gained international market expertise.",
      position: { x: 380, y: 250 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 40, y: -5 },
    },
    {
      role: "Business Improvement Manager",
      description:
        "Member of the M&C leadership team that ran a $1bn business across the US and Mexico.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Drove performance improvements and strengthened strategic problem-solving.",
      position: { x: 30, y: 170 },
      hexOffset: { x: 290, y: 0 },
      badgeOffset: { x: 45, y: -4 },
    },
    {
      role: "Senior Manager Insights and Portfolio RC&S",
      description:
        "Co-led a regional strategy assessment that identified a material opportunity to address 20+ million tons of CO₂ per annum.",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Identified high-impact low-carbon opportunities and shaped portfolio strategy.",
      position: { x: 400, y: 109 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 30, y: -5 },
    },
    {
      role: "Head of Corporate Development TA",
      description:
        "Core team member for the integration of TA into bp and later part of TA leadership—accountable for 7 departments and 90+ people.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Expanded accountability across multiple functions and led large-scale integrations.",
      position: { x: 355, y: 25 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 30, y: 0 },
    },
    {
      role: "Head of Branded Jobber Business",
      description:
        "Leads the largest fuels business in C&P—5bn gallons and a $600m P&L.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Assumed end-to-end P&L ownership and represented brands at the executive level.",
      // moved to the mountain peak
      position: { x: 327, y: -40 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: -245, y: 0 },
    },
  ],
};

export const ajayJoshiStory: DetailedSuccessStory = {
  id: "ajay-joshi",
  name: "Ajay Joshi",
  careerJourney: "Joined bp in 2007",
  testimonial:
    "My career has been a mix of functional and business leadership roles, but the common threads are relentless learning, driving P&L growth, and passion for developing people.",
  quote:
    "Every rotation taught me to pair commercial ambition with people-first leadership.",
  imageUrl: ajayJoshiImage,
  primaryEntityId: "tech",
  skillsBackpack: [
    {
      categoryId: "technology-innovation",
      ratings: "4",
      skills: [
        { skillId: "digital-transformation", proficiencyLevel: "Advanced" },
        { skillId: "digital-fluency", proficiencyLevel: "Advanced" },
      ],
    },
    {
      categoryId: "commercial",
      ratings: "4",
      skills: [
        { skillId: "commercial-bd", proficiencyLevel: "Excellent" },
        { skillId: "investment-strategy", proficiencyLevel: "Advanced" },
        { skillId: "customer-centric", proficiencyLevel: "Advanced" },
      ],
    },
    {
      categoryId: "strategic-leadership",
      ratings: "4",
      skills: [
        { skillId: "enterprise-leadership", proficiencyLevel: "Advanced" },
        { skillId: "talent-management", proficiencyLevel: "Advanced" },
        { skillId: "leading-through-change", proficiencyLevel: "Advanced" },
      ],
    },
    {
      categoryId: "operations",
      ratings: "3",
      skills: [
        { skillId: "global-team-leadership", proficiencyLevel: "Advanced" },
        { skillId: "operational-supply-chain", proficiencyLevel: "Intermediate" },
      ],
    },
    {
      categoryId: "stakeholder-regulatory",
      ratings: "3",
      skills: [
        {
          skillId: "stakeholder-partnership-management",
          proficiencyLevel: "Intermediate",
        },
        { skillId: "government-relations", proficiencyLevel: "Intermediate" },
      ],
    },
  ],
  careerPath: [
    {
      role: "Graduate Software Engineer",
      description:
        "Built customer-facing tools while learning bp's physical operations from the ground up.",
      department: "Outside bp",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Translated academic learning into production software within highly regulated environments.",
      position: { x: 206, y: 421 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 40, y: 37 },
    },
    {
      role: "Digital Analyst, Castrol",
      description:
        "Introduced agile product delivery and analytics to refine dealer enablement journeys.",
      department: "Castrol",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Married data insights with commercial priorities to support frontline teams.",
      position: { x: 300, y: 371 },
      hexOffset: { x: 124, y: 50 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Digital Transformation Manager",
      description:
        "Led automation of order management and pricing engines across regional hubs.",
      department: "Tech",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Scaled agile delivery and embedded new ways of working with trading and supply partners.",
      position: { x: 557, y: 421 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 0, y: 35 },
    },
    {
      role: "Product Owner, Mobility Platforms",
      description:
        "Launched the first integrated loyalty and payments experience for bp me users.",
      department: "Pulse",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones:
        "Balanced customer experience with cyber, legal, and operational constraints at scale.",
      position: { x: 624, y: 312 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 40, y: 0 },
    },
    {
      role: "Agile Delivery Lead, Retail Modernisation",
      description:
        "Stood up multi-disciplinary squads to modernise store operations and fuel planning.",
      department: "M&C",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Coached leaders through agile adoption while harmonising global and local priorities.",
      position: { x: 192, y: 311 },
      hexOffset: { x: 296, y: 6 },
      badgeOffset: { x: 0, y: 0 },
    },
    {
      role: "Head of Digital Experience – Asia",
      description:
        "Owned the end-to-end digital roadmap for convenience retail across ten markets.",
      department: "M&C",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones:
        "Built cross-border teams and aligned franchise partners around a single product vision.",
      position: { x: 170, y: 241 },
      hexOffset: { x: 219, y: 7 },
      badgeOffset: { x: 10, y: 2 },
    },
    {
      role: "Director, Integrated Solutions",
      description:
        "Brought together EV charging, loyalty, and on-demand fulfillment to create seamless customer journeys.",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Coordinated across pulses, retail, trading, and supply to deliver a unified experience.",
      position: { x: 486, y: 159 },
      hexOffset: { x: 0, y: 7 },
      badgeOffset: { x: 41, y: 0 },
    },
    {
      role: "Vice President, Technology Ventures",
      description:
        "Sets vision for technology partnerships, invests in new capabilities, and mentors bp’s next generation of digital leaders.",
      department: "Tech",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Balances venture investments with core operations and unlocks growth through strategic partnerships.",
      position: { x: 402, y: 85 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 30, y: 0 },
    },
    {
      role: "SVP Digital & Innovation, C&P",
      description:
        "Accountable for technology strategy, platforms, and culture across convenience & mobility.",
      department: "Tech",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones:
        "Drives enterprise-wide transformation and champions inclusive, high-performing teams.",
      position: { x: 327, y: -5 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 41, y: 0 },
    },
  ],
};

export const detailedSuccessStories: DetailedSuccessStory[] = [
  paulAStory,
  robGraceStory,
  ajayJoshiStory,
];

export const successStoriesListData: SuccessStoryListItem[] =
  detailedSuccessStories.map((story) => ({
    id: story.id,
    name: story.name,
    careerJourney: story.careerJourney,
    description: story.testimonial,
    imageUrl: story.imageUrl,
    primaryEntityId: story.primaryEntityId,
  }));

export const getDetailedStoryById = (
  id: string,
): DetailedSuccessStory | undefined => {
  return detailedSuccessStories.find((story) => story.id === id);
};

export const getStoryListItemById = (
  id: string,
): SuccessStoryListItem | undefined => {
  return successStoriesListData.find((story) => story.id === id);
};
