<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { disasters } from '@/data/disasters'
import { getFeaturedCampaign } from '@/data/campaigns'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const featuredCampaign = getFeaturedCampaign()
const activeDisasters = disasters.filter(d => d.status === 'active').slice(0, 3)

// Hero background image - disaster relief/rescue related
const heroImage = 'https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg'

const { observeAll } = useScrollAnimation()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

onMounted(() => {
  // Initialize scroll animations - deferred to reduce TBT
  const initAnimations = () => observeAll('.scroll-animate')
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initAnimations, { timeout: 200 })
  } else {
    setTimeout(initAnimations, 50)
  }
})
</script>

<template>
  <div>
    <!-- Hero Section - Fixed height prevents CLS -->
    <section class="relative h-[400px] overflow-hidden bg-surface-200 sm:h-[450px] lg:h-[550px]">
      <!-- Hero background image -->
      <img
        :src="heroImage + '?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop&fm=webp'"
        alt="Disaster relief volunteers in action"
        class="absolute inset-0 h-full w-full object-cover"
        width="1400"
        height="600"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" aria-hidden="true" />

      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span>When Disaster Strikes,</span>
            <span class="block text-accent-400 mt-1 sm:mt-2">We Respond</span>
          </h1>
          <p class="mt-3 text-sm text-primary-100 sm:mt-4 sm:text-base md:text-lg lg:text-xl max-w-2xl">
            RescueNet provides rapid humanitarian aid to communities affected by natural disasters. Join us in saving lives and rebuilding hope.
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <RouterLink
              to="/donate"
              class="btn-hover inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Donate Now
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/volunteer"
              class="btn-hover inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Become a Volunteer
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section - Static values prevent CLS from counter animations -->
    <section class="stats-section border-b border-surface-200 bg-white py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
          <div class="text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">50,000+</p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Lives Saved</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">$12M+</p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Funds Raised</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">100+</p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Disasters Responded</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">5,000+</p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Volunteers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Active Disasters -->
    <section class="content-auto py-12 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-animate flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-surface-900 sm:text-3xl">Active Disasters</h2>
            <p class="mt-1 text-sm text-surface-600 sm:mt-2 sm:text-base">Current emergencies requiring immediate support</p>
          </div>
          <RouterLink to="/disasters" class="link-hover text-sm text-primary-600 hover:text-primary-700 sm:text-base">
            View all →
          </RouterLink>
        </div>

        <div class="mt-6 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 lg:mt-10 lg:gap-6 lg:grid-cols-3">
          <RouterLink
            v-for="(disaster, index) in activeDisasters"
            :key="disaster.id"
            :to="`/disasters/${disaster.id}`"
            class="scroll-animate card-hover group overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm sm:rounded-2xl"
            :class="`stagger-${index + 1}`"
          >
            <!-- Fixed aspect-ratio container with bg prevents CLS -->
            <div class="relative aspect-[5/3] overflow-hidden bg-surface-200">
              <img
                :src="disaster.image_url + '?w=400&q=60&auto=format&fm=webp&fit=crop'"
                :alt="disaster.title"
                class="h-full w-full object-cover"
                width="400"
                height="240"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                <span
                  class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase sm:px-3 sm:py-1 sm:text-xs"
                  :class="{
                    'bg-red-500 text-white': disaster.severity === 'critical',
                    'bg-orange-500 text-white': disaster.severity === 'high',
                    'bg-yellow-500 text-black': disaster.severity === 'moderate',
                    'bg-green-500 text-white': disaster.severity === 'low',
                  }"
                >
                  {{ disaster.severity }}
                </span>
              </div>
            </div>
            <div class="p-4 sm:p-5 lg:p-6">
              <div class="flex items-center gap-2 text-xs text-surface-500 sm:text-sm">
                <span>{{ disaster.disaster_type.icon }}</span>
                <span>{{ disaster.disaster_type.name }}</span>
              </div>
              <h3 class="mt-1.5 text-base font-semibold text-surface-900 transition-colors group-hover:text-primary-600 sm:mt-2 sm:text-lg">
                {{ disaster.title }}
              </h3>
              <p class="mt-1.5 line-clamp-2 text-xs text-surface-600 sm:mt-2 sm:text-sm">
                {{ disaster.description }}
              </p>
              <p class="mt-3 text-xs text-surface-500 sm:mt-4 sm:text-sm">
                📍 {{ disaster.location_name }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Campaign -->
    <section v-if="featuredCampaign" class="content-auto bg-surface-100 py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-animate scale-up overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl">
          <div class="grid lg:grid-cols-2">
            <!-- Fixed aspect-ratio container with image prevents CLS -->
            <div class="relative aspect-[4/3] overflow-hidden bg-surface-200 lg:aspect-auto lg:min-h-[300px]">
              <img
                :src="featuredCampaign.image_url + '&w=600&q=70&auto=format&fm=webp&fit=crop'"
                :alt="featuredCampaign.title"
                class="h-full w-full object-cover"
                width="600"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div class="absolute left-3 top-3 sm:left-4 sm:top-4">
                <span class="rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white shadow-lg sm:px-4 sm:text-sm">
                  Featured Campaign
                </span>
              </div>
            </div>
            <div class="p-5 sm:p-8 lg:p-10 xl:p-12">
              <h2 class="text-xl font-bold text-surface-900 sm:text-2xl lg:text-3xl">
                {{ featuredCampaign.title }}
              </h2>
              <p class="mt-2 text-sm text-surface-600 sm:mt-3 sm:text-base lg:mt-4">
                {{ featuredCampaign.description }}
              </p>

              <!-- Progress Bar -->
              <div class="mt-5 sm:mt-6 lg:mt-8">
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-2xl font-bold text-accent-600 sm:text-3xl">
                      {{ formatCurrency(featuredCampaign.current_amount) }}
                    </p>
                    <p class="text-xs text-surface-500 sm:text-sm">
                      raised of {{ formatCurrency(featuredCampaign.goal_amount) }} goal
                    </p>
                  </div>
                  <p class="text-base font-semibold text-surface-900 sm:text-lg">
                    {{ featuredCampaign.progress_percentage }}%
                  </p>
                </div>
                <div class="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-200 sm:mt-4 sm:h-3">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600"
                    :style="{ width: `${featuredCampaign.progress_percentage}%` }"
                  />
                </div>
                <p class="mt-1.5 text-xs text-surface-500 sm:mt-2 sm:text-sm">
                  {{ featuredCampaign.donor_count.toLocaleString() }} donors
                </p>
              </div>

              <RouterLink
                :to="`/campaigns/${featuredCampaign.id}`"
                class="btn-hover mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-lg sm:mt-6 sm:w-auto sm:px-8 sm:py-3.5 lg:mt-8 lg:py-4 lg:text-lg"
              >
                Donate Now
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Help Section -->
    <section class="content-auto py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-animate text-center">
          <h2 class="text-xl font-bold text-surface-900 sm:text-2xl lg:text-3xl">How We Help</h2>
          <p class="mt-2 text-sm text-surface-600 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
            Our comprehensive approach to disaster relief
          </p>
        </div>

        <div class="mt-8 grid gap-4 grid-cols-2 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-4 lg:gap-8">
          <div class="scroll-animate card-hover stagger-1 rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🚑
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Emergency Response</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Rapid deployment within 24 hours
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-2 rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🏠
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Shelter & Housing</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Housing for displaced families
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-3 rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🍽️
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Food & Water</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Essential supplies distribution
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-4 rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-warning-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              💊
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Medical Aid</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Healthcare for the injured
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="content-auto bg-primary-900 py-10 sm:py-14 lg:py-20">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="scroll-animate text-xl font-bold text-white sm:text-2xl lg:text-3xl xl:text-4xl">Ready to Make a Difference?</h2>
        <p class="scroll-animate stagger-1 mx-auto mt-2 max-w-2xl text-sm text-primary-100 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
          Whether you donate, volunteer, or spread awareness, your contribution saves lives.
        </p>
        <div class="scroll-animate stagger-2 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <RouterLink
            to="/donate"
            class="btn-hover rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
          >
            Donate Now
          </RouterLink>
          <RouterLink
            to="/volunteer"
            class="btn-hover rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
          >
            Volunteer
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes hero-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animate {
  animation: hero-slide-up 0.6s ease-out forwards;
}

.hero-delay-1 { animation-delay: 0s; }
.hero-delay-2 { animation-delay: 0.15s; opacity: 0; }
.hero-delay-3 { animation-delay: 0.3s; opacity: 0; }
.hero-delay-4 { animation-delay: 0.45s; opacity: 0; }
</style>
