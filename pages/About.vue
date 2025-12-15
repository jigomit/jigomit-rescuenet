<script setup lang="ts">
import { RouterLink } from 'vue-router'

const stats = [
  { value: '2010', label: 'Founded' },
  { value: '100+', label: 'Disasters Responded' },
  { value: '50K+', label: 'Lives Saved' },
  { value: '50+', label: 'Countries Reached' },
]

const values = [
  {
    title: 'Rapid Response',
    description: 'We mobilize within 24 hours of any disaster to provide immediate relief.',
    icon: '⚡',
  },
  {
    title: 'Transparency',
    description: 'Every donation is tracked and reported. Know exactly where your money goes.',
    icon: '🔍',
  },
  {
    title: 'Community First',
    description: 'We work alongside local communities to ensure aid reaches those who need it most.',
    icon: '🤝',
  },
  {
    title: 'Sustainability',
    description: 'We focus on long-term recovery, not just immediate relief.',
    icon: '🌱',
  },
]

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Executive Director',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Operations Director',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    name: 'Emily Thompson',
    role: 'Volunteer Coordinator',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
  },
  {
    name: 'David Kim',
    role: 'Disaster Response Lead',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
  },
]

// Mission section images - humanitarian/rescue related
const missionImages = [
  'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg', // rescue workers
  'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg', // humanitarian aid
]

// Hero background image - about/team related
const heroImage = 'https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-surface-200">
      <img
        :src="heroImage + '?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop&fm=webp'"
        alt="About RescueNet team"
        class="absolute inset-0 h-full w-full object-cover"
        width="1200"
        height="400"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            About <span class="text-accent-400">RescueNet</span>
          </h1>
          <p class="mt-3 text-sm text-primary-100 sm:mt-4 sm:text-base lg:mt-6 lg:text-xl">
            We are a global humanitarian organization dedicated to providing rapid disaster relief and helping communities rebuild stronger than before.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-b border-surface-200 bg-white py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-3xl font-bold text-primary-600 sm:text-4xl">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-surface-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 class="text-3xl font-bold text-surface-900">Our Mission</h2>
            <p class="mt-6 text-lg text-surface-600">
              RescueNet exists to save lives and alleviate suffering during disasters. We believe that everyone deserves access to immediate help when crisis strikes, regardless of where they live or their circumstances.
            </p>
            <p class="mt-4 text-lg text-surface-600">
              Since our founding in 2010, we have responded to over 100 major disasters worldwide, providing food, shelter, medical care, and hope to millions of people.
            </p>
            <div class="mt-8 flex gap-4">
              <RouterLink to="/donate" class="rounded-lg bg-accent-600 px-6 py-3 font-semibold text-white hover:bg-accent-700">
                Donate Now
              </RouterLink>
              <RouterLink to="/volunteer" class="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700">
                Join Us
              </RouterLink>
            </div>
          </div>
          <div class="flex flex-row gap-4">
            <div class="w-1/2 aspect-[4/3] overflow-hidden rounded-xl bg-surface-200">
              <img
                :src="missionImages[0] + '?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop&fm=webp'"
                alt="Rescue workers helping community"
                class="h-full w-full object-cover"
                width="400"
                height="300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="w-1/2 aspect-[4/3] overflow-hidden rounded-xl bg-surface-200">
              <img
                :src="missionImages[1] + '?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop&fm=webp'"
                alt="Humanitarian aid distribution"
                class="h-full w-full object-cover"
                width="400"
                height="300"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-surface-100 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-surface-900">Our Values</h2>
          <p class="mt-4 text-surface-600">The principles that guide everything we do</p>
        </div>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="value in values" :key="value.title" class="rounded-2xl bg-white p-6 shadow-sm">
            <span class="text-4xl">{{ value.icon }}</span>
            <h3 class="mt-4 text-lg font-semibold text-surface-900">{{ value.title }}</h3>
            <p class="mt-2 text-surface-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-surface-900">Our Leadership</h2>
          <p class="mt-4 text-surface-600">Meet the people behind RescueNet</p>
        </div>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div class="mx-auto h-40 w-40 overflow-hidden rounded-full bg-surface-200">
              <img
                :src="member.image + '?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop&fm=webp'"
                :alt="member.name"
                class="h-full w-full object-cover"
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 class="mt-4 font-semibold text-surface-900">{{ member.name }}</h3>
            <p class="text-surface-500">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-accent-600 py-16">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <h2 class="text-3xl font-bold text-white">Join Our Mission</h2>
        <p class="mt-4 text-lg text-accent-100">Together, we can make a difference in the lives of those affected by disasters.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink to="/donate" class="rounded-lg bg-white px-8 py-3 font-semibold text-accent-600 hover:bg-accent-50">
            Donate Now
          </RouterLink>
          <RouterLink to="/volunteer" class="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10">
            Volunteer
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
