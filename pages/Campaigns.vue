<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { campaigns, getFeaturedCampaign } from '@/data/campaigns'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeAll } = useScrollAnimation()

const featuredCampaign = getFeaturedCampaign()
const otherCampaigns = campaigns.filter(c => !c.is_featured)

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

onMounted(() => {
  setTimeout(() => {
    observeAll('.scroll-animate')
  }, 100)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-accent-600 to-accent-800">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1024&q=30&auto=format&fm=webp&fit=crop"
          alt="Relief workers providing aid to disaster affected communities"
          class="h-full w-full object-cover opacity-20"
          width="1024"
          height="576"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <!-- Floating elements - hidden on mobile -->
      <div class="absolute left-10 top-10 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl md:block float"></div>
      <div class="absolute right-20 bottom-10 hidden h-32 w-32 rounded-full bg-accent-300/10 blur-3xl md:block float" style="animation-delay: 1.5s;"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style="animation: fade-slide-up 0.6s ease-out forwards;">
            Donation <span class="text-white/80">Campaigns</span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-accent-100" style="animation: fade-slide-up 0.6s ease-out 0.2s forwards; opacity: 0;">
            Support our active relief efforts. Every donation makes a difference in the lives of those affected by disasters.
          </p>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="border-b border-surface-200 bg-white py-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="scroll-animate stagger-1 text-center">
            <p class="text-3xl font-bold text-accent-600">$12M+</p>
            <p class="mt-1 text-sm text-surface-600">Total Raised</p>
          </div>
          <div class="scroll-animate stagger-2 text-center">
            <p class="text-3xl font-bold text-accent-600">50K+</p>
            <p class="mt-1 text-sm text-surface-600">Donors Worldwide</p>
          </div>
          <div class="scroll-animate stagger-3 text-center">
            <p class="text-3xl font-bold text-accent-600">200+</p>
            <p class="mt-1 text-sm text-surface-600">Campaigns Funded</p>
          </div>
          <div class="scroll-animate stagger-4 text-center">
            <p class="text-3xl font-bold text-accent-600">95%</p>
            <p class="mt-1 text-sm text-surface-600">Goes to Relief</p>
          </div>
        </div>
      </div>
    </section>

    <div class="py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Featured Campaign -->
        <div v-if="featuredCampaign" class="scroll-animate scale-up mb-12">
          <div class="img-zoom overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-lg transition-all hover:shadow-2xl">
            <div class="grid lg:grid-cols-2">
              <div class="relative h-64 overflow-hidden lg:h-auto">
                <img
                  :src="featuredCampaign.image_url"
                  :alt="featuredCampaign.title"
                  class="h-full w-full object-cover"
                  width="480"
                  height="320"
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

                <div class="mt-8">
                  <div class="flex items-end justify-between">
                    <div>
                      <p class="text-3xl font-bold text-accent-600">
                        {{ formatCurrency(featuredCampaign.current_amount) }}
                      </p>
                      <p class="text-sm text-surface-500">of {{ formatCurrency(featuredCampaign.goal_amount) }} goal</p>
                    </div>
                    <p class="text-lg font-semibold">{{ featuredCampaign.progress_percentage }}%</p>
                  </div>
                  <div class="mt-4 h-3 overflow-hidden rounded-full bg-surface-200">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-1000 ease-out"
                      :style="{ width: `${featuredCampaign.progress_percentage}%` }"
                    />
                  </div>
                  <p class="mt-2 text-sm text-surface-500">{{ featuredCampaign.donor_count.toLocaleString() }} donors</p>
                </div>

                <RouterLink
                  :to="`/campaigns/${featuredCampaign.id}`"
                  class="btn-hover pulse-glow mt-8 inline-block rounded-xl bg-accent-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-accent-700"
                >
                  Donate Now
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- All Campaigns -->
        <h2 class="scroll-animate mb-6 text-2xl font-bold text-surface-900">All Campaigns</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="(campaign, index) in otherCampaigns"
            :key="campaign.id"
            :to="`/campaigns/${campaign.id}`"
            class="scroll-animate card-hover img-zoom group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm"
            :class="`stagger-${(index % 3) + 1}`"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="campaign.image_url"
                :alt="campaign.title"
                class="h-full w-full object-cover"
                width="480"
                height="320"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                {{ campaign.title }}
              </h3>
              <p class="mt-2 line-clamp-2 text-sm text-surface-600">
                {{ campaign.description }}
              </p>

              <div class="mt-4">
                <div class="h-2 overflow-hidden rounded-full bg-surface-200">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-500"
                    :style="{ width: `${campaign.progress_percentage}%` }"
                  />
                </div>
                <div class="mt-2 flex justify-between text-sm">
                  <span class="font-semibold text-surface-900">{{ formatCurrency(campaign.current_amount) }}</span>
                  <span class="text-surface-500">{{ campaign.progress_percentage }}%</span>
                </div>
                <p class="mt-1 text-xs text-surface-500">{{ campaign.donor_count.toLocaleString() }} donors</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
