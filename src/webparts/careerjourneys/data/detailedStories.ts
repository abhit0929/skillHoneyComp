import { DetailedSuccessStory, SuccessStoryListItem } from '../shared/types/unified-data';

// Resolve images through the bundler so the runtime URL is correct
const paulAImage = (require('../assets/images/paul-a.png').default ?? require('../assets/images/paul-a.png')) as string;
const robGraceImage = (require('../assets/images/rob-grace.png').default ?? require('../assets/images/rob-grace.png')) as string;
const ajayJImage = (require('../assets/images/ajay-j.png').default ?? require('../assets/images/ajay-j.png')) as string;

export const paulAStory: DetailedSuccessStory = {
  id: "paul-a",
  name: "Paul A.",
  careerJourney: "Joined bp in 2006",
  testimonial: "His journey shows how moving across roles in different markets helped him build a broad commercial skillset – from pricing to supply chain to strategy",
  quote: "I never thought moving sideways into supply chain would prepare me so well for senior leadership.",
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
      badgeOffset: { x: 0, y: 0 }
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
      badgeOffset: { x: 41, y: 0 }
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
      badgeOffset: { x: 0, y: 0 }
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

// Ajay Joshi's success story data
export const ajayjoshiStory: DetailedSuccessStory = {
  id: "ajay joshi",
  name: "Ajay Joshi",
  careerJourney: "2017 - 2024",
  testimonial: "He learned and steadily advanced from entry level to senior leadership, building diverse skills and experiences across multiple departments along the way.",
  quote: "", 
  imageUrl: ajayJImage,
  primaryEntityId: "tech", // Primary entity from skillsData
  skillsBackpack: [], 
  careerPath: [] 
};

// Rob Grace's success story data 
export const robGraceStory: DetailedSuccessStory = {
  id: "rob-grace",
  name: "Rob Grace",
  careerJourney: "2014 - 2020",
  testimonial: "He grew and steadily evolved from entry level to senior leadership, thoughtfully developing a wide range of skills and valuable experiences across diverse departments.",
  quote: "", 
  imageUrl: robGraceImage,
  primaryEntityId: "castrol", // Primary entity from skillsData
  skillsBackpack: [],
  careerPath: []
};

// Detailed stories data - all three stories with same structure
export const detailedSuccessStories: DetailedSuccessStory[] = [
  ajayjoshiStory,
  paulAStory,
  robGraceStory
];

// Success stories list for the main page - extracted from detailed stories to avoid duplication
export const successStoriesListData: SuccessStoryListItem[] = detailedSuccessStories.map(story => ({
  id: story.id,
  name: story.name,
  careerJourney: story.careerJourney,
  description: story.testimonial,
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