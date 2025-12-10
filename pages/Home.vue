<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- Hero Section - Pure CSS, no images, zero CLS -->
    <section class="relative h-[400px] overflow-hidden bg-primary-900 sm:h-[450px] lg:h-[550px]">
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
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Donate Now
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/volunteer"
              class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Become a Volunteer
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section - Static values to prevent CLS -->
    <section class="border-b border-surface-200 bg-white py-8 sm:py-12">
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

    <!-- Active Disasters - Static cards, no images -->
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-surface-900 sm:text-3xl">Active Disasters</h2>
            <p class="mt-1 text-sm text-surface-600 sm:mt-2 sm:text-base">Current emergencies requiring immediate support</p>
          </div>
          <RouterLink to="/disasters" class="text-sm text-primary-600 sm:text-base">
            View all →
          </RouterLink>
        </div>

        <div class="mt-6 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 lg:mt-10 lg:gap-6 lg:grid-cols-3">
          <!-- Card 1 -->
          <RouterLink to="/disasters/1" class="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm sm:rounded-2xl">
            <div class="h-32 bg-red-100 flex items-center justify-center sm:h-40">
              <span class="text-4xl">🌊</span>
            </div>
            <div class="p-4 sm:p-5 lg:p-6">
              <span class="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white sm:px-3 sm:py-1 sm:text-xs">Critical</span>
              <h3 class="mt-2 text-base font-semibold text-surface-900 sm:text-lg">Southeast Asia Flooding</h3>
              <p class="mt-1.5 text-xs text-surface-600 sm:text-sm">Severe flooding affecting millions across the region</p>
              <p class="mt-3 text-xs text-surface-500 sm:mt-4 sm:text-sm">📍 Thailand, Vietnam</p>
            </div>
          </RouterLink>
          <!-- Card 2 -->
          <RouterLink to="/disasters/2" class="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm sm:rounded-2xl">
            <div class="h-32 bg-orange-100 flex items-center justify-center sm:h-40">
              <span class="text-4xl">🌋</span>
            </div>
            <div class="p-4 sm:p-5 lg:p-6">
              <span class="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white sm:px-3 sm:py-1 sm:text-xs">High</span>
              <h3 class="mt-2 text-base font-semibold text-surface-900 sm:text-lg">Volcanic Eruption Response</h3>
              <p class="mt-1.5 text-xs text-surface-600 sm:text-sm">Emergency evacuation and relief efforts underway</p>
              <p class="mt-3 text-xs text-surface-500 sm:mt-4 sm:text-sm">📍 Indonesia</p>
            </div>
          </RouterLink>
          <!-- Card 3 -->
          <RouterLink to="/disasters/3" class="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm sm:rounded-2xl">
            <div class="h-32 bg-yellow-100 flex items-center justify-center sm:h-40">
              <span class="text-4xl">🏜️</span>
            </div>
            <div class="p-4 sm:p-5 lg:p-6">
              <span class="rounded-full bg-yellow-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-black sm:px-3 sm:py-1 sm:text-xs">Moderate</span>
              <h3 class="mt-2 text-base font-semibold text-surface-900 sm:text-lg">Drought Relief Program</h3>
              <p class="mt-1.5 text-xs text-surface-600 sm:text-sm">Providing water and food to affected communities</p>
              <p class="mt-3 text-xs text-surface-500 sm:mt-4 sm:text-sm">📍 East Africa</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Campaign - Static content, no v-if -->
    <section class="bg-surface-100 py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl">
          <div class="grid lg:grid-cols-2">
            <div class="h-48 bg-accent-100 flex items-center justify-center sm:h-56 lg:h-auto lg:min-h-[300px]">
              <div class="text-center">
                <span class="text-6xl">🤝</span>
                <p class="mt-2 text-accent-700 font-semibold">Featured Campaign</p>
              </div>
            </div>
            <div class="p-5 sm:p-8 lg:p-10 xl:p-12">
              <h2 class="text-xl font-bold text-surface-900 sm:text-2xl lg:text-3xl">
                Emergency Relief Fund 2024
              </h2>
              <p class="mt-2 text-sm text-surface-600 sm:mt-3 sm:text-base lg:mt-4">
                Help us respond quickly to disasters worldwide. Your donation provides food, shelter, and medical care to those in need.
              </p>
              <div class="mt-5 sm:mt-6 lg:mt-8">
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-2xl font-bold text-accent-600 sm:text-3xl">$847,000</p>
                    <p class="text-xs text-surface-500 sm:text-sm">raised of $1,000,000 goal</p>
                  </div>
                  <p class="text-base font-semibold text-surface-900 sm:text-lg">85%</p>
                </div>
                <div class="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-200 sm:mt-4 sm:h-3">
                  <div class="h-full w-[85%] rounded-full bg-accent-600"></div>
                </div>
                <p class="mt-1.5 text-xs text-surface-500 sm:mt-2 sm:text-sm">12,847 donors</p>
              </div>
              <RouterLink
                to="/campaigns/1"
                class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-lg sm:mt-6 sm:w-auto sm:px-8 sm:py-3.5 lg:mt-8 lg:py-4 lg:text-lg"
              >
                Donate Now
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Help Section -->
    <section class="py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-xl font-bold text-surface-900 sm:text-2xl lg:text-3xl">How We Help</h2>
          <p class="mt-2 text-sm text-surface-600 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
            Our comprehensive approach to disaster relief
          </p>
        </div>

        <div class="mt-8 grid gap-4 grid-cols-2 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-4 lg:gap-8">
          <div class="rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🚑
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Emergency Response</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Rapid deployment within 24 hours
            </p>
          </div>

          <div class="rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🏠
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Shelter & Housing</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Housing for displaced families
            </p>
          </div>

          <div class="rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
              🍽️
            </div>
            <h3 class="mt-3 text-sm font-semibold text-surface-900 sm:mt-4 sm:text-base lg:text-lg">Food & Water</h3>
            <p class="mt-1.5 text-xs text-surface-600 sm:mt-2 sm:text-sm">
              Essential supplies distribution
            </p>
          </div>

          <div class="rounded-xl border border-surface-200 bg-white p-4 text-center sm:rounded-2xl sm:p-6">
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
    <section class="bg-primary-900 py-10 sm:py-14 lg:py-20">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="text-xl font-bold text-white sm:text-2xl lg:text-3xl xl:text-4xl">Ready to Make a Difference?</h2>
        <p class="mx-auto mt-2 max-w-2xl text-sm text-primary-100 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
          Whether you donate, volunteer, or spread awareness, your contribution saves lives.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <RouterLink
            to="/donate"
            class="rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
          >
            Donate Now
          </RouterLink>
          <RouterLink
            to="/volunteer"
            class="rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
          >
            Volunteer
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

