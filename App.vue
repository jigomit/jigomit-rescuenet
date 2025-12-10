<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/', icon: '🏠' },
  { label: 'Disasters', to: '/disasters', icon: '🚨' },
  { label: 'Campaigns', to: '/campaigns', icon: '💰' },
  { label: 'Volunteer', to: '/volunteer', icon: '🤝' },
  { label: 'About', to: '/about', icon: 'ℹ️' },
  { label: 'Contact', to: '/contact', icon: '📞' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// Close menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface-50">
    <!-- Header - fixed height h-16 to prevent CLS -->
    <header class="h-16 shrink-0 border-b border-surface-200 bg-white">
      <div class="mx-auto h-full max-w-7xl px-4">
        <div class="flex h-full items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2.5" aria-label="RescueNet - Go to homepage">
            <img
              src="/logo.svg"
              alt=""
              class="h-9 w-9"
              width="36"
              height="36"
            />
            <span class="text-lg font-bold text-surface-900">
              Rescue<span class="text-primary-600">Net</span>
            </span>
          </RouterLink>

          <!-- Desktop Navigation -->
          <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="rounded-lg px-4 py-2 text-sm font-medium"
              :class="isActive(item.to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-600'"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <!-- Right Side -->
          <div class="flex items-center gap-3">
            <!-- Donate Button -->
            <RouterLink
              to="/donate"
              class="hidden rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md sm:inline-flex"
            >
              Donate Now
            </RouterLink>

            <!-- Mobile Menu Button -->
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-surface-600 lg:hidden"
              :aria-expanded="mobileMenuOpen"
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <span class="sr-only">{{ mobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
              <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="mobileMenuOpen"
        id="mobile-menu"
        class="absolute left-0 right-0 top-16 z-50 border-b border-surface-200 bg-white shadow-lg lg:hidden"
      >
        <nav class="mx-auto max-w-7xl px-4 py-4" aria-label="Mobile navigation">
          <div class="space-y-1">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium"
              :class="isActive(item.to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-700'"
              @click="mobileMenuOpen = false"
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </RouterLink>
          </div>

          <!-- Mobile Donate Button -->
          <div class="mt-4 border-t border-surface-200 pt-4">
            <RouterLink
              to="/donate"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-base font-semibold text-white shadow-md"
              @click="mobileMenuOpen = false"
            >
              <span>❤️</span>
              <span>Donate Now</span>
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" role="main" class="app-main flex-1">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-900" role="contentinfo">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12">
        <div class="grid gap-6 grid-cols-2 sm:gap-8 lg:grid-cols-5">
          <div class="col-span-2 lg:col-span-1">
            <div class="flex items-center gap-2.5">
              <img src="/logo.svg" alt="" class="h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" />
              <span class="text-lg font-bold text-white sm:text-xl">RescueNet</span>
            </div>
            <p class="mt-3 text-xs text-surface-400 sm:mt-4 sm:text-sm max-w-xs">Providing rapid disaster relief and humanitarian aid worldwide.</p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white sm:text-base">Quick Links</h3>
            <ul class="mt-3 space-y-2 text-xs sm:mt-4 sm:text-sm">
              <li><RouterLink to="/disasters" class="text-surface-400">Active Disasters</RouterLink></li>
              <li><RouterLink to="/campaigns" class="text-surface-400">Campaigns</RouterLink></li>
              <li><RouterLink to="/volunteer" class="text-surface-400">Volunteer</RouterLink></li>
              <li><RouterLink to="/donate" class="text-surface-400">Donate</RouterLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white sm:text-base">About</h3>
            <ul class="mt-3 space-y-2 text-xs sm:mt-4 sm:text-sm">
              <li><RouterLink to="/about" class="text-surface-400">Our Mission</RouterLink></li>
              <li><RouterLink to="/contact" class="text-surface-400">Contact Us</RouterLink></li>
              <li><RouterLink to="/blog" class="text-surface-400">Blog</RouterLink></li>
            </ul>
          </div>
          <div class="col-span-2 sm:col-span-1 lg:col-span-1">
            <h3 class="text-sm font-semibold text-white sm:text-base">Contact</h3>
            <ul class="mt-3 space-y-2 text-xs text-surface-400 sm:mt-4 sm:text-sm">
              <li class="flex items-center gap-2"><span>📧</span><span>contact@rescuenet.org</span></li>
              <li class="flex items-center gap-2"><span>📞</span><span>1-800-RESCUE</span></li>
            </ul>
          </div>
        </div>
        <div class="mt-6 border-t border-surface-800 pt-6 text-center text-xs text-surface-500 sm:mt-8 sm:pt-8 sm:text-sm">© 2024 RescueNet. All rights reserved.</div>
      </div>
    </footer>

    <!-- Mobile Bottom Navigation - fixed height 72px -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 h-[72px] border-t border-surface-200 bg-white shadow-lg sm:hidden" aria-label="Mobile bottom navigation">
      <div class="flex h-full items-center justify-around">
        <RouterLink
          to="/"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium"
          :class="isActive('/') ? 'text-primary-600' : 'text-surface-500'"
        >
          <span class="text-xl" aria-hidden="true">🏠</span>
          <span>Home</span>
        </RouterLink>
        <RouterLink
          to="/disasters"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium"
          :class="isActive('/disasters') ? 'text-primary-600' : 'text-surface-500'"
        >
          <span class="text-xl" aria-hidden="true">🚨</span>
          <span>Disasters</span>
        </RouterLink>
        <RouterLink
          to="/donate"
          class="flex flex-col items-center gap-1 px-3 py-2"
          aria-label="Donate"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-accent-600 text-xl text-white shadow-lg" aria-hidden="true">
            ❤️
          </span>
        </RouterLink>
        <RouterLink
          to="/campaigns"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium"
          :class="isActive('/campaigns') ? 'text-primary-600' : 'text-surface-500'"
        >
          <span class="text-xl" aria-hidden="true">💰</span>
          <span>Campaigns</span>
        </RouterLink>
        <RouterLink
          to="/volunteer"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium"
          :class="isActive('/volunteer') ? 'text-primary-600' : 'text-surface-500'"
        >
          <span class="text-xl" aria-hidden="true">🤝</span>
          <span>Volunteer</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Spacer for bottom nav on mobile -->
    <div class="h-[72px] sm:h-0" aria-hidden="true"></div>
  </div>
</template>
