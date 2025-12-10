<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getDisasterById, disasters } from '@/data/disasters'
import { campaigns } from '@/data/campaigns'

const route = useRoute()
const disaster = computed(() => getDisasterById(parseInt(route.params.id as string)))
const relatedCampaigns = computed(() => campaigns.filter(c => c.disaster_id === disaster.value?.id))
const relatedDisasters = computed(() => disasters.filter(d => d.id !== disaster.value?.id).slice(0, 3))

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num)
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
</script>

<template>
  <div v-if="disaster">
    <!-- Hero Section -->
    <section class="relative h-64 overflow-hidden sm:h-80 lg:h-96">
      <img
        :src="disaster.image_url"
        :alt="disaster.title"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div class="absolute inset-0 flex items-end">
        <div class="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <nav class="mb-4 flex items-center gap-2 text-sm text-white/70">
            <RouterLink to="/disasters" class="hover:text-white">Disasters</RouterLink>
            <span>/</span>
            <span class="text-white">{{ disaster.title }}</span>
          </nav>
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl backdrop-blur-sm sm:h-16 sm:w-16 sm:text-3xl">
                {{ disaster.disaster_type.icon }}
              </div>
              <div>
                <span class="text-sm font-medium uppercase tracking-wider text-white/70">
                  {{ disaster.disaster_type.name }}
                </span>
                <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {{ disaster.title }}
                </h1>
              </div>
            </div>
            <span
              class="rounded-full px-4 py-2 text-sm font-semibold uppercase"
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
      </div>
    </section>

    <div class="py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="rounded-2xl border border-surface-200 bg-white p-6 sm:p-8">
              <h2 class="text-xl font-semibold text-surface-900">About This Disaster</h2>
              <p class="mt-4 leading-relaxed text-surface-600">
                {{ disaster.description }}
              </p>

              <!-- Key Stats -->
              <div class="mt-8 grid grid-cols-2 gap-4 border-t border-surface-200 pt-6 sm:grid-cols-4">
                <div>
                  <p class="text-sm text-surface-500">Location</p>
                  <p class="font-semibold text-surface-900">{{ disaster.location_name }}</p>
                </div>
                <div>
                  <p class="text-sm text-surface-500">Started</p>
                  <p class="font-semibold text-surface-900">{{ formatDate(disaster.started_at) }}</p>
                </div>
                <div>
                  <p class="text-sm text-surface-500">People Affected</p>
                  <p class="font-semibold text-surface-900">{{ formatNumber(disaster.estimated_affected_people) }}</p>
                </div>
                <div>
                  <p class="text-sm text-surface-500">Est. Damage</p>
                  <p class="font-semibold text-surface-900">{{ formatCurrency(disaster.estimated_damage_usd) }}</p>
                </div>
              </div>
            </div>

            <!-- Related Campaigns -->
            <div v-if="relatedCampaigns.length > 0" class="mt-8 rounded-2xl border border-surface-200 bg-white p-6 sm:p-8">
              <h2 class="text-xl font-semibold text-surface-900">Support Campaigns</h2>
              <div class="mt-6 space-y-4">
                <RouterLink
                  v-for="campaign in relatedCampaigns"
                  :key="campaign.id"
                  :to="`/campaigns/${campaign.id}`"
                  class="block rounded-xl border border-surface-200 p-4 transition-all hover:border-primary-500 hover:shadow-md"
                >
                  <h3 class="font-semibold text-surface-900">{{ campaign.title }}</h3>
                  <div class="mt-3 h-2 overflow-hidden rounded-full bg-surface-200">
                    <div
                      class="h-full rounded-full bg-accent-600"
                      :style="{ width: `${campaign.progress_percentage}%` }"
                    />
                  </div>
                  <div class="mt-2 flex justify-between text-sm">
                    <span class="font-semibold text-accent-600">{{ formatCurrency(campaign.current_amount) }}</span>
                    <span class="text-surface-500">of {{ formatCurrency(campaign.goal_amount) }}</span>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Action Buttons -->
            <div class="rounded-2xl border border-surface-200 bg-white p-6">
              <h3 class="font-semibold text-surface-900">How You Can Help</h3>
              <div class="mt-4 space-y-3">
                <RouterLink to="/donate" class="block w-full rounded-lg bg-accent-600 py-3 text-center font-semibold text-white hover:bg-accent-700">
                  Donate Now
                </RouterLink>
                <RouterLink to="/volunteer" class="block w-full rounded-lg bg-primary-600 py-3 text-center font-semibold text-white hover:bg-primary-700">
                  Volunteer
                </RouterLink>
              </div>
            </div>

            <!-- Related Disasters -->
            <div class="rounded-2xl border border-surface-200 bg-white p-6">
              <h3 class="font-semibold text-surface-900">Other Disasters</h3>
              <div class="mt-4 space-y-3">
                <RouterLink
                  v-for="related in relatedDisasters"
                  :key="related.id"
                  :to="`/disasters/${related.id}`"
                  class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface-50"
                >
                  <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-100 text-lg">
                    {{ related.disaster_type.icon }}
                  </span>
                  <div class="flex-1">
                    <p class="font-medium text-surface-900">{{ related.title }}</p>
                    <p class="text-sm text-surface-500">{{ related.location_name }}</p>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="flex min-h-[60vh] items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-surface-900">Disaster Not Found</h1>
      <p class="mt-4 text-surface-600">The disaster you're looking for doesn't exist.</p>
      <RouterLink to="/disasters" class="mt-8 inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700">
        View All Disasters
      </RouterLink>
    </div>
  </div>
</template>
