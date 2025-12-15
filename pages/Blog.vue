<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { blogPosts, getAllCategories } from '@/data/blog'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeAll } = useScrollAnimation()

const searchQuery = ref('')
const selectedCategory = ref('')
const categories = getAllCategories()

// Newsletter subscription
const newsletterEmail = ref('')
const newsletterError = ref('')
const isSubscribing = ref(false)
const isSubscribed = ref(false)

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubscribe = async () => {
  newsletterError.value = ''

  if (!newsletterEmail.value.trim()) {
    newsletterError.value = 'Please enter your email address'
    return
  }

  if (!validateEmail(newsletterEmail.value)) {
    newsletterError.value = 'Please enter a valid email address'
    return
  }

  isSubscribing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubscribing.value = false
  isSubscribed.value = true
  newsletterEmail.value = ''
}

const filteredPosts = computed(() => {
  return blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Hero background image - news/blog related
const heroImage = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'

onMounted(() => {
  setTimeout(() => {
    observeAll('.scroll-animate')
  }, 100)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-surface-200">
      <img
        :src="heroImage + '?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop&fm=webp'"
        alt="RescueNet blog and news"
        class="absolute inset-0 h-full w-full object-cover"
        width="1200"
        height="400"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent" />

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Stories, tips & updates from our rescue community
          </p>
        </div>
      </div>
    </section>

    <!-- Search and Filter -->
    <section class="border-b border-surface-200 bg-white py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <!-- Search -->
          <div class="relative flex-1 sm:max-w-md">
            <svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles..."
              class="w-full rounded-xl border border-surface-300 bg-white py-3 pl-12 pr-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              :class="!selectedCategory
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'"
              @click="selectedCategory = ''"
            >
              All
            </button>
            <button
              v-for="category in categories"
              :key="category"
              class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              :class="selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Results count -->
        <p class="mb-8 text-sm text-surface-500">
          Showing {{ filteredPosts.length }} article{{ filteredPosts.length !== 1 ? 's' : '' }}
        </p>

        <!-- Posts Grid -->
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(post, index) in filteredPosts"
            :key="post.id"
            class="scroll-animate card-hover img-zoom group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm"
            :class="`stagger-${(index % 3) + 1}`"
          >
            <RouterLink :to="`/blog/${post.slug}`" class="block">
              <!-- Image -->
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="post.image_url + '?w=320&q=40&auto=format&fm=webp&fit=crop'"
                  :alt="post.title"
                  class="h-full w-full object-cover"
                  width="320"
                  height="213"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span class="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-surface-700 backdrop-blur-sm">
                  {{ post.category }}
                </span>
              </div>

              <!-- Content -->
              <div class="p-6">
                <!-- Meta -->
                <div class="flex items-center gap-3 text-sm text-surface-500">
                  <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
                  <span>·</span>
                  <span>{{ post.read_time }} min read</span>
                </div>

                <!-- Title -->
                <h2 class="mt-3 text-lg font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                  {{ post.title }}
                </h2>

                <!-- Excerpt -->
                <p class="mt-2 line-clamp-2 text-sm text-surface-600">
                  {{ post.excerpt }}
                </p>

                <!-- Read More -->
                <div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                  Read More
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </RouterLink>
          </article>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="rounded-2xl border border-surface-200 bg-white p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-4 text-lg font-medium text-surface-900">No articles found</p>
          <p class="mt-2 text-surface-600">Try adjusting your search or filter.</p>
          <button
            class="mt-4 rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700"
            @click="searchQuery = ''; selectedCategory = ''"
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="bg-primary-900 py-12 sm:py-16">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <!-- Success State -->
        <Transition name="fade" mode="out-in">
          <div v-if="isSubscribed" key="success">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-500/20">
              <svg class="h-8 w-8 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl">You're Subscribed!</h2>
            <p class="mt-4 text-primary-100">
              Thank you for subscribing. You'll receive the latest updates on disaster preparedness and relief efforts.
            </p>
            <button
              @click="isSubscribed = false"
              class="mt-6 rounded-xl border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Subscribe Another Email
            </button>
          </div>

          <!-- Form State -->
          <div v-else key="form">
            <h2 class="scroll-animate text-2xl font-bold text-white sm:text-3xl">Stay Informed</h2>
            <p class="scroll-animate stagger-1 mt-4 text-primary-100">
              Subscribe to our newsletter for the latest updates on disaster preparedness and relief efforts.
            </p>
            <form @submit.prevent="handleSubscribe" class="scroll-animate stagger-2 mt-8 sm:mx-auto sm:max-w-md">
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Enter your email"
                  class="flex-1 rounded-xl border-2 px-5 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-colors focus:outline-none"
                  :class="newsletterError
                    ? 'border-error-400 bg-error-500/20'
                    : 'border-transparent bg-white/10 focus:border-white/30'"
                  @input="newsletterError = ''"
                />
                <button
                  type="submit"
                  :disabled="isSubscribing"
                  class="rounded-xl bg-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span v-if="isSubscribing" class="flex items-center justify-center gap-2">
                    <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                  <span v-else>Subscribe</span>
                </button>
              </div>
              <Transition name="fade">
                <p v-if="newsletterError" class="mt-3 text-sm text-error-300">
                  {{ newsletterError }}
                </p>
              </Transition>
            </form>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* All animations disabled to prevent CLS */
.fade-enter-active,
.fade-leave-active {
  transition: none !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1 !important;
  transform: none !important;
}
</style>
