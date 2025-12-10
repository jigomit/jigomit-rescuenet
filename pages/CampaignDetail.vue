<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getCampaignById, campaigns } from '@/data/campaigns'

const route = useRoute()
const campaign = computed(() => getCampaignById(parseInt(route.params.id as string)))
const otherCampaigns = computed(() => campaigns.filter(c => c.id !== campaign.value?.id).slice(0, 3))

const selectedAmount = ref<number | null>(50)
const customAmount = ref('')
const donationAmounts = [25, 50, 100, 250, 500, 1000]

const selectAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <div v-if="campaign">
    <!-- Hero -->
    <section class="relative h-64 overflow-hidden sm:h-80">
      <img
        :src="campaign.image_url"
        :alt="campaign.title"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div class="absolute inset-0 flex items-end">
        <div class="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <nav class="mb-4 flex items-center gap-2 text-sm text-white/70">
            <RouterLink to="/campaigns" class="hover:text-white">Campaigns</RouterLink>
            <span>/</span>
            <span class="text-white">{{ campaign.title }}</span>
          </nav>
          <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {{ campaign.title }}
          </h1>
        </div>
      </div>
    </section>

    <div class="py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="rounded-2xl border border-surface-200 bg-white p-6 sm:p-8">
              <p class="text-lg text-surface-600">
                {{ campaign.description }}
              </p>

              <!-- Progress -->
              <div class="mt-8 border-t border-surface-200 pt-6">
                <div class="h-4 overflow-hidden rounded-full bg-surface-200">
                  <div
                    class="h-full rounded-full bg-accent-600"
                    :style="{ width: `${campaign.progress_percentage}%` }"
                  />
                </div>
                <div class="mt-4 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <p class="text-base sm:text-2xl font-bold text-surface-900">
                      {{ formatCurrency(campaign.current_amount) }}
                    </p>
                    <p class="text-xs sm:text-sm text-surface-500">raised</p>
                  </div>
                  <div>
                    <p class="text-base sm:text-2xl font-bold text-surface-900">
                      {{ campaign.donor_count.toLocaleString() }}
                    </p>
                    <p class="text-xs sm:text-sm text-surface-500">donors</p>
                  </div>
                  <div>
                    <p class="text-base sm:text-2xl font-bold text-surface-900">
                      {{ formatCurrency(campaign.goal_amount) }}
                    </p>
                    <p class="text-xs sm:text-sm text-surface-500">goal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Donation Sidebar -->
          <div>
            <div class="sticky top-24 rounded-2xl border border-surface-200 bg-white p-6">
              <h2 class="text-lg font-semibold text-surface-900">Make a Donation</h2>
              <p class="mt-1 text-sm text-surface-500">Choose an amount to donate</p>

              <!-- Amount Grid -->
              <div class="mt-6 grid grid-cols-3 gap-2">
                <button
                  v-for="amount in donationAmounts"
                  :key="amount"
                  class="rounded-lg border-2 px-4 py-3 text-center font-semibold transition-all"
                  :class="selectedAmount === amount
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-surface-200 text-surface-700 hover:border-surface-300'"
                  @click="selectAmount(amount)"
                >
                  ${{ amount }}
                </button>
              </div>

              <!-- Custom Amount -->
              <div class="mt-4">
                <label class="block text-sm font-medium text-surface-700">Custom Amount</label>
                <div class="relative mt-1">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">$</span>
                  <input
                    v-model="customAmount"
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    class="w-full rounded-lg border-2 border-surface-200 py-3 pl-8 pr-4"
                    @focus="selectedAmount = null"
                  />
                </div>
              </div>

              <!-- Donate Button -->
              <button class="mt-6 w-full rounded-xl bg-accent-600 py-4 text-lg font-semibold text-white hover:bg-accent-700">
                Donate {{ selectedAmount ? formatCurrency(selectedAmount) : (customAmount ? formatCurrency(parseInt(customAmount)) : '') }}
              </button>

              <p class="mt-4 text-center text-xs text-surface-500">
                100% of your donation goes directly to disaster relief
              </p>
            </div>
          </div>
        </div>

        <!-- Other Campaigns -->
        <div class="mt-12">
          <h2 class="mb-6 text-2xl font-bold text-surface-900">Other Campaigns</h2>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <RouterLink
              v-for="c in otherCampaigns"
              :key="c.id"
              :to="`/campaigns/${c.id}`"
              class="group overflow-hidden rounded-xl border border-surface-200 bg-white"
            >
              <div class="h-40 overflow-hidden">
                <img :src="c.image_url" :alt="c.title" class="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-surface-900 group-hover:text-primary-600">{{ c.title }}</h3>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-surface-200">
                  <div class="h-full bg-accent-600" :style="{ width: `${c.progress_percentage}%` }" />
                </div>
                <p class="mt-1 text-sm text-surface-500">{{ c.progress_percentage }}% funded</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-surface-900">Campaign Not Found</h1>
      <RouterLink to="/campaigns" class="mt-8 inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white">
        View All Campaigns
      </RouterLink>
    </div>
  </div>
</template>
