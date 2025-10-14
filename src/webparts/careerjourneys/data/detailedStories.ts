import { DetailedSuccessStory, SuccessStoryListItem } from '../shared/types/unified-data';
// Resolve images through the bundler so the runtime URL is correct
const paulAImage =
  (require('../assets/images/paul-a.png').default ??
    require('../assets/images/paul-a.png')) as string;
const robGraceImage =
  (require('../assets/images/rob-grace.png').default ??
    require('../assets/images/rob-grace.png')) as string;
const ajayJoshiImage =
  (require('../assets/images/ajay-j.png').default ??
    require('../assets/images/ajay-j.png')) as string;


export const paulAStory: DetailedSuccessStory = {
  id: "paul-a",
  name: "Paul A.",
  careerJourney: "Joined bp in 2006",
  //testimonial: "His journey shows how moving across roles in different markets helped him build a broad commercial skillset – from pricing to supply chain to strategy",
  testimonial: "I didn’t plan this path, but every pivot has led me closer to what I love doing: developing teams and running complex businesses!",
  quote: "I didn’t plan this path, but every pivot has led me closer to what I love doing: developing teams and running complex businesses!",
  imageUrl: paulAImage,
  primaryEntityId: "mc", // Primary entity from skillsData
  skillsBackpack: [
    {
      categoryId: "operations", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "cost-discipline", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "supply-chain-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    {
      categoryId: "commercial", // References skillsData.skills
      ratings: "4", 
      skills: [
        {
          skillId: "commercial-financial-acumen", // References skillsData.skills
          proficiencyLevel: "Excellent"
        },
        {
          skillId: "commercial-bd", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "customer-centric", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "retail-operations", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    {
      categoryId: "strategic-leadership", // References skillsData.skills
      ratings: "1",
      skills: [
        {
          skillId: "enterprise-leadership", // References skillsData.skills
          proficiencyLevel: "Basic" 
        }
      ]
    }
  ],
  careerPath: [
    {
      role: "Business Development",
      description: "Family publishing business, managing financial accounts, business development and operations.",
      department: "NA",
      countryMobility: "No", 
      movementType: "Lateral",
      learningMilestones: "Built foundational skills in finance, operations, and customer growth.",
      position: { x: 206, y: 421 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 40, y: 37 }
    },
    {
      role: "Business Analyst/Sales Coordinator",
      description: "Performance management, external negotiations, exposure to full P&L, BS and cashflow and Customer growth.",
      department: "Castrol",
      countryMobility: "No",
      movementType: "Lateral", 
      learningMilestones: "Gained full P&L exposure and negotiation experience.",
      position: { x: 300, y: 371 },
      hexOffset: { x: 124, y: 50 },
      badgeOffset: { x: 0, y: 0 }
    },
    {
      role: "Strategic Pricing Advisor", 
      description: "Exposure to full fuels value chain, understanding of oil markets, exposure to Channel of Trade from retail to trading seeking to grow bp value.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones: "Developed deep understanding of value chain and pricing dynamics.",
      position: { x: 557, y: 421 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 0, y: 35 }
    },
    {
      role: "Supply Product Operator",
      description: "Execution and optimisation of Import Trading Program for ANZ, gain understanding of product quality and operations. Interface with Trading and external counterparts and maximize bp value.",
      department: "FS&M", 
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones: "Ensured fuel security while honing financial and negotiation skills.",
      position: { x: 624, y: 312 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 40, y: 0 }
    },
    {
      role: "Product Scheduler/Supply Negotiator",
      description: "Ensuring fuel supply security, optimizing P&L, WC/Cash. Greater external exposure and internal interphases.",
      department: "FS&M",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones: "Learned to optimize import programs and maximize trading value.",
      position: { x: 192, y: 311 },
      hexOffset: { x: 296, y: 6 },
      badgeOffset: { x: 0, y: 0 }
    },
    {
      role: "Transformation Manager",
      description: "Operating model transformation across Refining and Terminals, driving optimization, simplification and enabling growth. External negotiations and exposure to broader bp group.",
      department: "FS&M",
      countryMobility: "No", 
      movementType: "Vertical",
      learningMilestones: "Drove operating model transformation and cultural change.",
      position: { x: 170, y: 241 },
      hexOffset: { x: 219, y: 7 },
      badgeOffset: { x: 10, y: 2 }
    },
    {
      role: "Commercial Development Lead",
      description: "Downstream new market entry. External stakeholders (Government and partners). Talent and culture management. Operating model set up. Global teams.",
      department: "FS&M",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones: "Led market entry, stakeholder engagement, and global team building.",
      position: { x: 486, y: 159 },
      hexOffset: { x: 0, y: 7 },
      badgeOffset: { x: 41, y: 2 }
    },
    {
      role: "GM UK&France",
      description: "Operational accountability incl JV's. Development of midstream infrastructure. Integrations with Trading to increase value delivery to customers and bp.",
      department: "Aviation",
      countryMobility: "Yes",
      movementType: "Lateral",
      learningMilestones: "Managed midstream accountability and integrated trading for value delivery.",
      position: { x: 168, y: 159 },
      hexOffset: { x: 189, y: 5 },
      badgeOffset: { x: 20, y: 0 }
    },
    {
      role: "Commercial Development Director", 
      description: "Accountable for global business development across LATAM, Asia and Middle East. Digital and sustainability global strategy. Global teams.",
      department: "Aviation",
      countryMobility: "Yes",
      movementType: "Vertical", 
      learningMilestones: "Oversaw global business development with digital and sustainability focus.",
      position: { x: 402, y: 85 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 30, y: 0 }
    },
    {
      role: "VP M&C Mexico",
      description: "P&L and operational accountability for Integrated FVC. External relationships, Government and agencies. Leading through change.",
      department: "M&C",
      countryMobility: "Yes",
      movementType: "Vertical",
      learningMilestones: "Held P&L accountability while leading external relationships and change.",
      position: { x: 135, y: 56 },
      hexOffset: { x: 177, y: 6 },
      badgeOffset: { x: 0, y: 0 }
    },
    {
      role: "SVP Mobility Convenience & Midstream, Asia Pacific",
      description: "Full P&L and operational accountability for Integrated Mobility and FVC. Business Transformation, Strategy delivery, Management of JV's. Integration across S&TS. Talent Management and Culture, and performance reset.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical", 
      learningMilestones: "Delivered end-to-end business transformation and integration at global scale.",
      position: { x: 327, y: -5 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 41, y: 0 }
    }
  ]
};

// JP Lebudel's success story data
export const ajayJoshiStory: DetailedSuccessStory = {
  id: "ajay-joshi",
  name: "Ajay Joshi",
  careerJourney: "Joined bp in 2007",
  testimonial: "My career has been a mix of functional and business leadership roles, but the common threads are relentless learning, driving P&L growth, and passion for developing people.",
  quote: "My career has been a mix of functional and business leadership roles, but the common threads are relentless learning, driving P&L growth, and passion for developing people.", 
  //quote: "",
  imageUrl: ajayJoshiImage,
  primaryEntityId: "tech", // Primary entity from skillsData
  skillsBackpack: [
    {
      categoryId: "safety", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "safety-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    },
    {
      categoryId: "operations", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "operational-supply-chain", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "supply-chain-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "retail-operations", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "global-team-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "cost-discipline", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    {
      categoryId: "commercial", // References skillsData.skills
      ratings: "4",
      skills: [
        {
          skillId: "commercial-pl", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-strategy", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "partnership-alliance", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-financial-acumen", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "procurement", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "financial-modelling", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-bd", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "investment-strategy", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "customer-centric", // References skillsData.skills
          proficiencyLevel: "Basic"
        },        
      ]
    },
    {
      categoryId: "strategic-leadership", // References skillsData.skills
      ratings: "5",
      skills: [
        {
          skillId: "enterprise-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "strategic-leadership-skill", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "authentic-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "talent-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "negotiation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "leading-through-change", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "cross-functional-collaboration", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "high-performance-teams", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    { 
      categoryId: "stakeholder-regulatory", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "government-relations", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "stakeholder-partnership-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "stakeholder-regulatory", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "sustainability-innovation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    },
    { 
      categoryId: "technology-innovation", // References skillsData.skills
      ratings: "4",
      skills: [
        {
          skillId: "digital-transformation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "digital-fluency", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    }
  ], 
  careerPath: [
    {
      role: "Engineer",
      description: "Agile Integrator for 14 functions/work-streams, led 40+ people globally.",
      department: "Outside C&P",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Strengthened cross-functional collaboration and learned to orchestrate complex global workstreams.",
      position: { x: 210, y: 380 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 60, y: 37 }
    },
    {
      role: "PMO Lead, China Technology Centre",
      description: "Managed CVP for US$ 100m new-build China innovation center, led a project team of ~25 internal/external stakeholders.",
      department: "Outside C&P",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Gained global project leadership experience; learned to manage cross-cultural stakeholders effectively.",
      position: { x: 335, y: 380 },
      hexOffset: { x: 120, y: 0 },
      badgeOffset: { x: 120, y: 36 }
    },
    {
      role: "Business Integration Manager",
      description: "Agile Integrator for 14 functions/work-streams, led 40+ people globally.",
      department: "Outside C&P",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Honed integration & change leadership and developed agility in complex transformations.",
      position: { x: 520, y: 260 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 40, y: 0 }
    },
    {
      role: "Asset Manager in NOJV",
      description: "Chairman of the JV Finance Committee, Alternate Director on the JV Board Accountable for HSSE, operations, NOJV risk management, financial/commercial performance.",
      department: "Outside C&P",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Deepened financial & commercial acumen and learned joint venture governance dynamics.",
      position: { x: 144, y: 260 },
      hexOffset: { x: 220, y: 4 },
      badgeOffset: { x: 0, y: 0 }
    },
    {
      role: "Commercial Development & Strategy Manager, FNA",
      description: "Led cross-business collaboration to deliver midstream & retail deals for US/Mexico (>80 AtNs/EFMs) and integrated value (>$4b NPV, major RCOP growth/year).",
      department: "FS&M",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Built strategic deal-making expertise and learned to navigate complex vertical leadership challenges.",
      position: { x: 162, y: 145 },
      hexOffset: { x: 266, y: 5 },
      badgeOffset: { x: 305, y: 0 }
    },
    {
      role: "VP Business Development, M&C Americas",
      description: "Led origination, approvals, and execution of large M&A deals  and special projects in M&C Americas.  Successfully led Thorntons acquisition (US$ 1.3b) and integration to set up Retail Operating Org (3,000 people).  Member of M&CA LT.",
      department: "M&C",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Advanced M&A leadership capabilities and expanded enterprise transformation impact.",
      position: { x: 360, y: 39 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 40, y: -5 }
    },
    {
      role: "VP Aviation Americas",
      description: "Leading North and South America Aviation business - Accountable for P&L US$100-200m, Revenue US$7-9b, org of about 100 people.  Oversee the full business unit - HSSE, customers, strategy & bus dev, trading collaboration, people, etc.  Member of Aviation Global LT.",
      department: "Aviation",
      countryMobility: "Yes", 
      movementType: "Lateral",
      learningMilestones: "Expanded P&L leadership skills through full business accountability.",
      position: { x: 300, y: 35 },
      hexOffset: { x: 0, y: 4 },
      badgeOffset: { x: -205, y: 0 }
    },
  ] 
};

// Rob Grace's success story data 
export const robGraceStory: DetailedSuccessStory = {
  id: "rob-grace",
  name: "Rob Grace",
  careerJourney: "Joined bp in 2007",
  quote: "This wasn't the career I expected when I joined as a Chemist, but I have loved the variety. I love applying my problem-solving skills to all parts of the value chain from refinery gate to distributors to vehicles driving around the world!",
  testimonial: "This wasn't the career I expected when I joined as a Chemist, but I have loved the variety. I love applying my problem-solving skills to all parts of the value chain from refinery gate to distributors to vehicles driving around the world!", 
  imageUrl: robGraceImage,
  primaryEntityId: "castrol", // Primary entity from skillsData
  skillsBackpack: [
    {
      categoryId: "safety", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "safety-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    },
    {
      categoryId: "commercial", // References skillsData.skills
      ratings: "4",
      skills: [
        {
          skillId: "commercial-pl", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-strategy", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "partnership-alliance", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-financial-acumen", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "procurement", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "financial-modelling", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "commercial-bd", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "investment-strategy", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "customer-centric", // References skillsData.skills
          proficiencyLevel: "Basic"
        },        
      ]
    },
    {
      categoryId: "operations", // References skillsData.skills
      ratings: "2",
      skills: [
        {
          skillId: "operational-supply-chain", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "supply-chain-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "retail-operations", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "global-team-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "cost-discipline", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    {
      categoryId: "strategic-leadership", // References skillsData.skills
      ratings: "5",
      skills: [
        {
          skillId: "enterprise-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "strategic-leadership-skill", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "authentic-leadership", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "talent-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "negotiation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "leading-through-change", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "cross-functional-collaboration", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "high-performance-teams", // References skillsData.skills
          proficiencyLevel: "Basic"
        }
      ]
    },
    {
      categoryId: "stakeholder-regulatory", // References skillsData.skills
      ratings: "3",
      skills: [
        {
          skillId: "government-relations", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "stakeholder-partnership-management", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "stakeholder-regulatory", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "sustainability-innovation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    },
    {
      categoryId: "technology-innovation", // References skillsData.skills
      ratings: "2",
      skills: [
        {
          skillId: "digital-transformation", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
        {
          skillId: "digital-fluency", // References skillsData.skills
          proficiencyLevel: "Basic"
        },
      ]
    },
  ],
  careerPath: [
    {
      role: "Graduate Chemist FPT",
      description: "Seconded to three teams: 1) Product Quality & Aviation, 2) Marine Fuels and 3) Gasoline Product Development",
      department: "All C&P entities",
      countryMobility: "No", 
      movementType: "Lateral",
      learningMilestones: "Built broad technical foundation and learned to adapt across diverse teams and functions.",
      position: { x: 206, y: 421 },
      hexOffset: { x: 83, y: 0 },
      badgeOffset: { x: 40, y: 37 }
    },
    {
      role: "Development Technologist FPT",
      description: "Managed engine and vehicle test budgets of $1.5 million",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Lateral", 
      learningMilestones: "Strengthened technical and budget management skills and gained early leadership exposure.",
      position: { x: 300, y: 371 },
      hexOffset: { x: 124, y: 50 },
      badgeOffset: { x: 0, y: 0 }
    },
    {
      role: "Fuel Product Advisor & Marketing Analyst", 
      description: "Co-engineered and piloted new fuel dispenser; resulted in a 2.5% increase in premium fuel sales.",
      department: "Marketing",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones: "Developed deep understanding of value chain and pricing dynamics.",
      position: { x: 547, y: 421 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 0, y: 35 }
    },
    {
      role: "B2B Commercial Offers Manager",
      description: "Led the global development of our next generation gasoline for consumers and diesel for trucks.",
      department: "Marketing", 
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones: "Developed strategic offer design and led global product launches and stakeholder alignment.",
      position: { x: 600, y: 312 },
      hexOffset: { x: 0, y: 6 },
      badgeOffset: { x: 28, y: 0 }
    },
    {
      role: "Global Launch Event Project Manager",
      description: "Delivered bp's biggest ever fuels launch – a 5 day event with ca 1,500 attendees from over 15 countries, produced in 5 languages, and covering 2 brands: BP and Aral.",
      department: "Marketing",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones: "Mastered large-scale global event execution and coordinated across countries, brands and functions.",
      position: { x: 182, y: 311 },
      hexOffset: { x: 286, y: 6 },
      badgeOffset: { x: 0, y: 1 }
    },
    {
      role: "Head of Marketing and Offer Development - Mexico",
      description: "Generated over $1.6M of PR across Mexico, achieving print coverage in all 32 states and international radio and TV coverage.",
      department: "M&C",
      countryMobility: "Yes", 
      movementType: "Vertical",
      learningMilestones: "Deepened leadership role experience and gained international market experience.",
      position: { x: 380, y: 250 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 40, y: -5 }
    },
    {
      role: "Business Improvement Manager",
      description: "Member of the M&C leadership team that ran ca. $1bn business across US and Mexico.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones: "Deepened strategic problem-solving and drove performance improvements across US and Mexico.",
      position: { x: 30, y: 170 },
      hexOffset: { x: 290, y: 0 },
      badgeOffset: { x: 45, y: -4 }
    },
    {
      role: "Senior Manager Insights and Portfolio RC&S",
      description: "Co-led a regional strategy assessment that identified a material opportunity that will be the cornerstone of our US strategy and can address 20+ million tons of CO2 per annum.",
      department: "All C&P entities",
      countryMobility: "No",
      movementType: "Vertical",
      learningMilestones: "Led regional strategy work and identified high-impact low-carbon opportunities.",
      position: { x: 400, y: 109 },
      hexOffset: { x: 0, y: 0 },
      badgeOffset: { x: 30, y: -5 }
    },
    {
      role: "Head of Corporate Development TA", 
      description: "Core team member for the integration of TA into bp, then transitioned to TA leadership team. Accountable for 7 departments and 90+ people: including real estate, franchising, data & analytics, marketing and Warehouse operations.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Vertical", 
      learningMilestones: "Took first operational leadership role and expanded accountability across multiple functions.",
      position: { x: 355, y: 25 },
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: 30, y: 0 }
    },
    {
      role: "Head of Branded Jobber Business​",
      description: "Leading the largest fuels business in C&P - 5bn gallons and $600m P&L.",
      department: "M&C",
      countryMobility: "No",
      movementType: "Lateral",
      learningMilestones: "Took P&L ownership at scale and represented brands at executive level.",
      position: { x: 315, y: 25},
      hexOffset: { x: 0, y: 5 },
      badgeOffset: { x: -245, y: 0 }
    },
  ]
};

// Detailed stories data - all three stories with same structure
export const detailedSuccessStories: DetailedSuccessStory[] = [  
  paulAStory,
  robGraceStory,
  ajayJoshiStory
];

// Success stories list for the main page - extracted from detailed stories to avoid duplication
export const successStoriesListData: SuccessStoryListItem[] = detailedSuccessStories.map(story => ({
  id: story.id,
  name: story.name,
  careerJourney: story.careerJourney,
  description: story.quote,
  imageUrl: story.imageUrl,
  primaryEntityId: story.primaryEntityId
}));

// Helper function to get detailed story by ID
export const getDetailedStoryById = (id: string): DetailedSuccessStory | undefined => {
  return detailedSuccessStories.find(story => story.id === id);
};

// Helper function to get story list item by ID  
export const getStoryListItemById = (id: string): SuccessStoryListItem | undefined => {
  return successStoriesListData.find(story => story.id === id);
};
