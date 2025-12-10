export interface DisasterType {
  id: number
  name: string
  icon: string
}

export interface Disaster {
  id: number
  slug: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'moderate' | 'low'
  status: 'monitoring' | 'active' | 'recovery' | 'resolved'
  location_name: string
  started_at: string
  estimated_affected_people: number
  estimated_damage_usd: number
  disaster_type: DisasterType
  image_url: string
}

export const disasterTypes: DisasterType[] = [
  { id: 1, name: 'Earthquake', icon: '🌍' },
  { id: 2, name: 'Flood', icon: '🌊' },
  { id: 3, name: 'Hurricane', icon: '🌀' },
  { id: 4, name: 'Wildfire', icon: '🔥' },
  { id: 5, name: 'Tsunami', icon: '🌊' },
  { id: 6, name: 'Drought', icon: '☀️' },
]

export const disasters: Disaster[] = [
  {
    id: 1,
    slug: 'turkey-earthquake-2024',
    title: 'Turkey Earthquake Emergency',
    description: 'A devastating 7.8 magnitude earthquake struck southeastern Turkey, causing widespread destruction. Thousands of buildings have collapsed, and rescue teams are working around the clock to find survivors. Immediate humanitarian assistance is required for shelter, medical care, and food supplies.',
    severity: 'critical',
    status: 'active',
    location_name: 'Gaziantep, Turkey',
    started_at: '2024-02-06',
    estimated_affected_people: 850000,
    estimated_damage_usd: 34000000000,
    disaster_type: { id: 1, name: 'Earthquake', icon: '🌍' },
    image_url: 'https://images.pexels.com/photos/6471926/pexels-photo-6471926.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
  },
  {
    id: 2,
    slug: 'bangladesh-monsoon-flooding',
    title: 'Bangladesh Monsoon Flooding',
    description: 'Severe monsoon rains have caused catastrophic flooding across Bangladesh, displacing millions and destroying crops. Clean water and sanitation are critical needs as communities struggle to cope with the rising waters.',
    severity: 'high',
    status: 'active',
    location_name: 'Sylhet, Bangladesh',
    started_at: '2024-06-15',
    estimated_affected_people: 2500000,
    estimated_damage_usd: 5000000000,
    disaster_type: { id: 2, name: 'Flood', icon: '🌊' },
    image_url: 'https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
  },
  {
    id: 3,
    slug: 'california-wildfire-season',
    title: 'California Wildfire Emergency',
    description: 'Multiple wildfires are burning across California, forcing evacuations and destroying homes. Firefighters are battling extreme conditions as drought and high winds fuel the flames.',
    severity: 'high',
    status: 'active',
    location_name: 'Northern California, USA',
    started_at: '2024-07-20',
    estimated_affected_people: 125000,
    estimated_damage_usd: 8500000000,
    disaster_type: { id: 4, name: 'Wildfire', icon: '🔥' },
    image_url: 'https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
  },
  {
    id: 4,
    slug: 'philippines-typhoon-response',
    title: 'Philippines Typhoon Response',
    description: 'A powerful typhoon has made landfall in the Philippines, bringing destructive winds and heavy rainfall. Coastal communities are severely affected, with urgent need for emergency shelter and supplies.',
    severity: 'moderate',
    status: 'recovery',
    location_name: 'Leyte, Philippines',
    started_at: '2024-05-10',
    estimated_affected_people: 450000,
    estimated_damage_usd: 2000000000,
    disaster_type: { id: 3, name: 'Hurricane', icon: '🌀' },
    image_url: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
  },
  {
    id: 5,
    slug: 'east-africa-drought',
    title: 'East Africa Drought Crisis',
    description: 'Prolonged drought conditions across East Africa have led to severe food and water shortages. Communities are facing famine conditions, with livestock dying and crops failing.',
    severity: 'high',
    status: 'active',
    location_name: 'Kenya, Ethiopia, Somalia',
    started_at: '2024-01-15',
    estimated_affected_people: 5000000,
    estimated_damage_usd: 1500000000,
    disaster_type: { id: 6, name: 'Drought', icon: '☀️' },
    image_url: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&dpr=1&fm=webp',
  },
]

export const getDisasterById = (id: number): Disaster | undefined => {
  return disasters.find(d => d.id === id)
}

export const getDisasterBySlug = (slug: string): Disaster | undefined => {
  return disasters.find(d => d.slug === slug)
}
