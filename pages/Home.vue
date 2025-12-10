<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { disasters } from '@/data/disasters'
import { getFeaturedCampaign } from '@/data/campaigns'
import { useScrollAnimation, useCountAnimation } from '@/composables/useScrollAnimation'

const featuredCampaign = getFeaturedCampaign()
const activeDisasters = disasters.filter(d => d.status === 'active').slice(0, 3)

const { observeAll } = useScrollAnimation()

// Animated counters
const livesCounter = useCountAnimation(50000, 2000)
const fundsCounter = useCountAnimation(12, 2000)
const disastersCounter = useCountAnimation(100, 2000)
const volunteersCounter = useCountAnimation(5000, 2000)

const statsVisible = ref(false)

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

onMounted(() => {
  // Initialize scroll animations
  setTimeout(() => {
    observeAll('.scroll-animate')
  }, 100)

  // Stats counter observer
  const statsSection = document.querySelector('.stats-section')
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsVisible.value) {
          statsVisible.value = true
          livesCounter.animate()
          fundsCounter.animate()
          disastersCounter.animate()
          volunteersCounter.animate()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsSection)
  }
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=60&auto=format&fit=crop"
          alt="Volunteers providing humanitarian aid"
          class="h-full w-full object-cover opacity-20"
          width="1200"
          height="800"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
      </div>

      <!-- Floating decorative elements -->
      <div class="absolute left-10 top-20 h-20 w-20 rounded-full bg-accent-500/10 blur-2xl float" style="animation-delay: 0s;"></div>
      <div class="absolute right-20 top-40 h-32 w-32 rounded-full bg-primary-400/10 blur-3xl float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-20 left-1/3 h-24 w-24 rounded-full bg-accent-400/10 blur-2xl float" style="animation-delay: 2s;"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-40">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span class="hero-animate hero-delay-1">When Disaster Strikes,</span>
            <span class="block text-accent-400 mt-2 hero-animate hero-delay-2">We Respond</span>
          </h1>
          <p class="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg md:text-xl hero-animate hero-delay-3">
            RescueNet provides rapid humanitarian aid to communities affected by natural disasters. Join us in saving lives and rebuilding hope.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4 hero-animate hero-delay-4">
            <RouterLink
              to="/donate"
              class="btn-hover pulse-glow inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-accent-500/30 transition-all hover:bg-accent-700 hover:shadow-accent-500/50 sm:px-8 sm:py-4 sm:text-lg"
            >
              Donate Now
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/volunteer"
              class="btn-hover inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-8 sm:py-4 sm:text-lg"
            >
              Become a Volunteer
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section border-b border-surface-200 bg-white py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
          <div class="scroll-animate stagger-1 text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">
              {{ livesCounter.currentValue.value.toLocaleString() }}+
            </p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Lives Saved</p>
          </div>
          <div class="scroll-animate stagger-2 text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">
              ${{ fundsCounter.currentValue.value }}M+
            </p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Funds Raised</p>
          </div>
          <div class="scroll-animate stagger-3 text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">
              {{ disastersCounter.currentValue.value }}+
            </p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Disasters Responded</p>
          </div>
          <div class="scroll-animate stagger-4 text-center">
            <p class="text-2xl font-bold text-primary-600 sm:text-3xl md:text-4xl">
              {{ volunteersCounter.currentValue.value.toLocaleString() }}+
            </p>
            <p class="mt-1 text-xs text-surface-600 sm:text-sm">Volunteers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Active Disasters -->
    <section class="py-12 sm:py-16 lg:py-24">
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

        <div class="mt-6 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="(disaster, index) in activeDisasters"
            :key="disaster.id"
            :to="`/disasters/${disaster.id}`"
            class="scroll-animate card-hover img-zoom group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm"
            :class="`stagger-${index + 1}`"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="disaster.image_url + '&auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'"
                :alt="disaster.title"
                class="h-full w-full object-cover"
                width="400"
                height="300"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div class="absolute bottom-4 left-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold uppercase transition-transform hover:scale-105"
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
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-surface-500">
                <span>{{ disaster.disaster_type.icon }}</span>
                <span>{{ disaster.disaster_type.name }}</span>
              </div>
              <h3 class="mt-2 text-lg font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                {{ disaster.title }}
              </h3>
              <p class="mt-2 line-clamp-2 text-sm text-surface-600">
                {{ disaster.description }}
              </p>
              <p class="mt-4 text-sm text-surface-500">
                📍 {{ disaster.location_name }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Campaign -->
    <section v-if="featuredCampaign" class="bg-surface-100 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-animate scale-up overflow-hidden rounded-3xl bg-white shadow-xl">
          <div class="grid lg:grid-cols-2">
            <div class="img-zoom relative h-64 lg:h-auto">
              <img
                :src="featuredCampaign.image_url + '&auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'"
                :alt="featuredCampaign.title"
                class="h-full w-full object-cover"
                width="600"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute left-4 top-4">
                <span class="rounded-full bg-accent-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                  Featured Campaign
                </span>
              </div>
            </div>
            <div class="p-8 lg:p-12">
              <h2 class="text-2xl font-bold text-surface-900 lg:text-3xl">
                {{ featuredCampaign.title }}
              </h2>
              <p class="mt-4 text-surface-600">
                {{ featuredCampaign.description }}
              </p>

              <!-- Progress Bar -->
              <div class="mt-8">
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-3xl font-bold text-accent-600">
                      {{ formatCurrency(featuredCampaign.current_amount) }}
                    </p>
                    <p class="text-sm text-surface-500">
                      raised of {{ formatCurrency(featuredCampaign.goal_amount) }} goal
                    </p>
                  </div>
                  <p class="text-lg font-semibold text-surface-900">
                    {{ featuredCampaign.progress_percentage }}%
                  </p>
                </div>
                <div class="mt-4 h-3 overflow-hidden rounded-full bg-surface-200">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-1000 ease-out"
                    :style="{ width: `${featuredCampaign.progress_percentage}%` }"
                  />
                </div>
                <p class="mt-2 text-sm text-surface-500">
                  {{ featuredCampaign.donor_count.toLocaleString() }} donors
                </p>
              </div>

              <RouterLink
                :to="`/campaigns/${featuredCampaign.id}`"
                class="btn-hover mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-accent-700"
              >
                Donate Now
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Help Section -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-animate text-center">
          <h2 class="text-3xl font-bold text-surface-900">How We Help</h2>
          <p class="mt-4 text-lg text-surface-600">
            Our comprehensive approach to disaster relief
          </p>
        </div>

        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="scroll-animate card-hover stagger-1 rounded-2xl border border-surface-200 bg-white p-6 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-3xl">
              🚑
            </div>
            <h3 class="mt-4 text-lg font-semibold text-surface-900">Emergency Response</h3>
            <p class="mt-2 text-sm text-surface-600">
              Rapid deployment of resources within 24 hours of disaster
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-2 rounded-2xl border border-surface-200 bg-white p-6 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-100 text-3xl">
              🏠
            </div>
            <h3 class="mt-4 text-lg font-semibold text-surface-900">Shelter & Housing</h3>
            <p class="mt-2 text-sm text-surface-600">
              Temporary and long-term housing solutions for displaced families
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-3 rounded-2xl border border-surface-200 bg-white p-6 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-100 text-3xl">
              🍽️
            </div>
            <h3 class="mt-4 text-lg font-semibold text-surface-900">Food & Water</h3>
            <p class="mt-2 text-sm text-surface-600">
              Essential supplies and clean water distribution
            </p>
          </div>

          <div class="scroll-animate card-hover stagger-4 rounded-2xl border border-surface-200 bg-white p-6 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-warning-100 text-3xl">
              💊
            </div>
            <h3 class="mt-4 text-lg font-semibold text-surface-900">Medical Aid</h3>
            <p class="mt-2 text-sm text-surface-600">
              Healthcare services and medical supplies for the injured
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-900 py-12 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="scroll-animate text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Ready to Make a Difference?</h2>
        <p class="scroll-animate stagger-1 mx-auto mt-3 max-w-2xl text-base text-primary-100 sm:mt-4 sm:text-lg">
          Whether you donate, volunteer, or spread awareness, your contribution saves lives.
        </p>
        <div class="scroll-animate stagger-2 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <RouterLink
            to="/donate"
            class="btn-hover rounded-xl bg-accent-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl transition-all hover:bg-accent-700 sm:px-8 sm:py-4 sm:text-lg"
          >
            Donate Now
          </RouterLink>
          <RouterLink
            to="/volunteer"
            class="btn-hover rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/20 sm:px-8 sm:py-4 sm:text-lg"
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
