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
  <div class="min-h-screen bg-surface-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-surface-200 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2.5" aria-label="RescueNet - Go to homepage">
            <div class="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="currentColor" opacity="0.2"/>
                <path d="M11 8h2v3h3v2h-3v3h-2v-3H8v-2h3V8z" fill="currentColor"/>
              </svg>
              <span class="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500"></span>
              </span>
            </div>
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
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              :class="isActive(item.to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <!-- Right Side -->
          <div class="flex items-center gap-3">
            <!-- Donate Button -->
            <RouterLink
              to="/donate"
              class="hidden rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-accent-700 sm:inline-flex"
            >
              Donate Now
            </RouterLink>

            <!-- Mobile Menu Button -->
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-surface-600 hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:hidden"
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
        class="border-t border-surface-200 bg-white lg:hidden"
      >
        <nav class="mx-auto max-w-7xl px-4 py-4" aria-label="Mobile navigation">
          <div class="space-y-1">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors"
              :class="isActive(item.to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-700 hover:bg-surface-100'"
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
    <main id="main-content" role="main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="border-t border-surface-200 bg-surface-900" role="contentinfo" style="min-height: 320px;">
      <div class="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <!-- Brand -->
          <div class="sm:col-span-2 lg:col-span-1">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
                <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="currentColor" opacity="0.2"/>
                  <path d="M11 8h2v3h3v2h-3v3h-2v-3H8v-2h3V8z" fill="currentColor"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-white">RescueNet</span>
            </div>
            <p class="mt-4 text-sm text-surface-400">
              Providing rapid disaster relief and humanitarian aid worldwide.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-white">Quick Links</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><RouterLink to="/disasters" class="text-surface-400 hover:text-white">Active Disasters</RouterLink></li>
              <li><RouterLink to="/campaigns" class="text-surface-400 hover:text-white">Campaigns</RouterLink></li>
              <li><RouterLink to="/volunteer" class="text-surface-400 hover:text-white">Volunteer</RouterLink></li>
              <li><RouterLink to="/donate" class="text-surface-400 hover:text-white">Donate</RouterLink></li>
            </ul>
          </div>

          <!-- About -->
          <div>
            <h3 class="font-semibold text-white">About</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><RouterLink to="/about" class="text-surface-400 hover:text-white">Our Mission</RouterLink></li>
              <li><RouterLink to="/contact" class="text-surface-400 hover:text-white">Contact Us</RouterLink></li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h3 class="font-semibold text-white">Resources</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><RouterLink to="/blog" class="text-surface-400 hover:text-white">Blog</RouterLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-semibold text-white">Contact</h3>
            <ul class="mt-4 space-y-2 text-sm text-surface-400">
              <li>📧 contact@rescuenet.org</li>
              <li>📞 1-800-RESCUE</li>
            </ul>
          </div>
        </div>

        <div class="mt-8 border-t border-surface-800 pt-8 text-center text-sm text-surface-500">
          © 2024 RescueNet. All rights reserved.
        </div>
      </div>
    </footer>

    <!-- Mobile Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-200 bg-white shadow-lg sm:hidden safe-bottom" aria-label="Mobile bottom navigation">
      <div class="flex items-center justify-around py-2 pb-safe">
        <RouterLink
          to="/"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors"
          :class="isActive('/') ? 'text-primary-600' : 'text-surface-500'"
          :aria-current="isActive('/') ? 'page' : undefined"
        >
          <span class="text-xl" aria-hidden="true">🏠</span>
          <span>Home</span>
        </RouterLink>
        <RouterLink
          to="/disasters"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors"
          :class="isActive('/disasters') ? 'text-primary-600' : 'text-surface-500'"
          :aria-current="isActive('/disasters') ? 'page' : undefined"
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
          <span class="sr-only">Donate</span>
        </RouterLink>
        <RouterLink
          to="/campaigns"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors"
          :class="isActive('/campaigns') ? 'text-primary-600' : 'text-surface-500'"
          :aria-current="isActive('/campaigns') ? 'page' : undefined"
        >
          <span class="text-xl" aria-hidden="true">💰</span>
          <span>Campaigns</span>
        </RouterLink>
        <RouterLink
          to="/volunteer"
          class="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors"
          :class="isActive('/volunteer') ? 'text-primary-600' : 'text-surface-500'"
          :aria-current="isActive('/volunteer') ? 'page' : undefined"
        >
          <span class="text-xl" aria-hidden="true">🤝</span>
          <span>Volunteer</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Spacer for bottom nav on mobile -->
    <div class="h-20 sm:hidden"></div>
  </div>
</template>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
