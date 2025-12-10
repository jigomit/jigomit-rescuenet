export interface Campaign {
  id: number
  slug: string
  title: string
  description: string
  goal_amount: number
  current_amount: number
  progress_percentage: number
  is_featured: boolean
  is_active: boolean
  donor_count: number
  image_url: string
  ends_at: string | null
  disaster_id: number | null
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    slug: 'turkey-earthquake-relief',
    title: 'Turkey Earthquake Relief Fund',
    description: 'Help provide emergency shelter, food, and medical care to survivors of the devastating earthquake in Turkey. Every donation makes a difference in rebuilding lives.',
    goal_amount: 5000000,
    current_amount: 3750000,
    progress_percentage: 75,
    is_featured: true,
    is_active: true,
    donor_count: 12450,
    image_url: 'https://images.pexels.com/photos/6471926/pexels-photo-6471926.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
    ends_at: '2024-12-31',
    disaster_id: 1,
  },
  {
    id: 2,
    slug: 'bangladesh-flood-response',
    title: 'Bangladesh Flood Response',
    description: 'Support communities affected by severe flooding with clean water, sanitation, and essential supplies. Help families rebuild their lives.',
    goal_amount: 2000000,
    current_amount: 1200000,
    progress_percentage: 60,
    is_featured: false,
    is_active: true,
    donor_count: 5680,
    image_url: 'https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
    ends_at: '2024-11-30',
    disaster_id: 2,
  },
  {
    id: 3,
    slug: 'california-wildfire-recovery',
    title: 'California Wildfire Recovery',
    description: 'Help families who lost everything in the devastating wildfires. Funds go towards emergency housing, food, and rebuilding assistance.',
    goal_amount: 3000000,
    current_amount: 1800000,
    progress_percentage: 60,
    is_featured: false,
    is_active: true,
    donor_count: 8920,
    image_url: 'https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
    ends_at: null,
    disaster_id: 3,
  },
  {
    id: 4,
    slug: 'east-africa-drought-relief',
    title: 'East Africa Drought Relief',
    description: 'Provide life-saving food and water to communities facing famine conditions. Your donation helps prevent starvation.',
    goal_amount: 4000000,
    current_amount: 2400000,
    progress_percentage: 60,
    is_featured: false,
    is_active: true,
    donor_count: 7350,
    image_url: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
    ends_at: '2025-03-31',
    disaster_id: 5,
  },
  {
    id: 5,
    slug: 'general-emergency-fund',
    title: 'General Emergency Fund',
    description: 'Support our rapid response to disasters worldwide. This fund allows us to mobilize immediately when disasters strike.',
    goal_amount: 10000000,
    current_amount: 6500000,
    progress_percentage: 65,
    is_featured: false,
    is_active: true,
    donor_count: 25000,
    image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=50&auto=format&fm=webp&fit=crop',
    ends_at: null,
    disaster_id: null,
  },
]

export const getCampaignById = (id: number): Campaign | undefined => {
  return campaigns.find(c => c.id === id)
}

export const getFeaturedCampaign = (): Campaign | undefined => {
  return campaigns.find(c => c.is_featured && c.is_active)
}
