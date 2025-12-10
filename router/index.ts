import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
      meta: {
        title: 'RescueNet - Disaster Relief & Humanitarian Aid',
        description: 'RescueNet provides rapid disaster relief and humanitarian aid worldwide. Donate, volunteer, or support communities affected by disasters.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/About.vue'),
      meta: {
        title: 'About Us - RescueNet',
        description: 'Learn about RescueNet\'s mission to provide rapid disaster relief and humanitarian aid to communities worldwide since 2010.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/Contact.vue'),
      meta: {
        title: 'Contact Us - RescueNet',
        description: 'Get in touch with RescueNet. Contact our team for inquiries about donations, volunteering, partnerships, or disaster relief.',
      },
    },
    {
      path: '/disasters',
      name: 'disasters',
      component: () => import('@/pages/Disasters.vue'),
      meta: {
        title: 'Active Disasters - RescueNet',
        description: 'View current disaster situations worldwide and learn how RescueNet is responding with emergency relief and humanitarian aid.',
      },
    },
    {
      path: '/disasters/:id',
      name: 'disaster-detail',
      component: () => import('@/pages/DisasterDetail.vue'),
      meta: {
        title: 'Disaster Details - RescueNet',
        description: 'Detailed information about this disaster and RescueNet\'s relief efforts.',
      },
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('@/pages/Campaigns.vue'),
      meta: {
        title: 'Donation Campaigns - RescueNet',
        description: 'Support our fundraising campaigns for disaster relief. Every donation helps provide food, shelter, and medical care to those in need.',
      },
    },
    {
      path: '/campaigns/:id',
      name: 'campaign-detail',
      component: () => import('@/pages/CampaignDetail.vue'),
      meta: {
        title: 'Campaign Details - RescueNet',
        description: 'Support this campaign and help provide disaster relief to communities in need.',
      },
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      component: () => import('@/pages/Volunteer.vue'),
      meta: {
        title: 'Volunteer With Us - RescueNet',
        description: 'Join our global network of volunteers. Make a difference by helping communities recover from disasters and emergencies.',
      },
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('@/pages/Donate.vue'),
      meta: {
        title: 'Donate Now - RescueNet',
        description: 'Your donation provides life-saving relief to disaster victims. Support food, shelter, medical care, and recovery efforts.',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/pages/Blog.vue'),
      meta: {
        title: 'Blog - RescueNet',
        description: 'Stories, tips & updates from our rescue community. Read about disaster preparedness, relief efforts, and community impact.',
      },
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('@/pages/BlogDetail.vue'),
      meta: {
        title: 'Blog Article - RescueNet',
        description: 'Read this article from RescueNet about disaster relief and humanitarian aid.',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// Update page title and meta description on route change
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string || 'RescueNet - Disaster Relief'
  const description = to.meta.description as string || 'RescueNet provides rapid disaster relief and humanitarian aid worldwide.'

  document.title = title

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  }

  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogTitle) ogTitle.setAttribute('content', title)
  if (ogDescription) ogDescription.setAttribute('content', description)

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  if (twitterTitle) twitterTitle.setAttribute('content', title)
  if (twitterDescription) twitterDescription.setAttribute('content', description)

  next()
})

export default router
