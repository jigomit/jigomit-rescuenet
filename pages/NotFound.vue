<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
    <!-- 404 Illustration -->
    <div class="relative">
      <div class="text-[150px] font-bold leading-none text-surface-200 sm:text-[200px]">404</div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="rounded-2xl bg-primary-100 p-6">
          <svg class="h-16 w-16 text-primary-600 sm:h-20 sm:w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-8 text-center">
      <h1 class="text-2xl font-bold text-surface-900 sm:text-3xl">Page Not Found</h1>
      <p class="mx-auto mt-4 max-w-md text-surface-600">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track to help those in need.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
      <RouterLink
        to="/"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-primary-700"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        Go Home
      </RouterLink>
      <RouterLink
        to="/donate"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-accent-700"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        Donate Now
      </RouterLink>
    </div>

    <!-- Quick Links -->
    <div class="mt-12 text-center">
      <p class="text-sm text-surface-500">Or check out these pages:</p>
      <div class="mt-4 flex flex-wrap justify-center gap-4">
        <RouterLink to="/disasters" class="text-primary-600 hover:text-primary-700 hover:underline">
          Active Disasters
        </RouterLink>
        <RouterLink to="/campaigns" class="text-primary-600 hover:text-primary-700 hover:underline">
          Campaigns
        </RouterLink>
        <RouterLink to="/volunteer" class="text-primary-600 hover:text-primary-700 hover:underline">
          Volunteer
        </RouterLink>
        <RouterLink to="/about" class="text-primary-600 hover:text-primary-700 hover:underline">
          About Us
        </RouterLink>
        <RouterLink to="/contact" class="text-primary-600 hover:text-primary-700 hover:underline">
          Contact
        </RouterLink>
      </div>
    </div>
  </div>
</template>
