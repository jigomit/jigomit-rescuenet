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
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
  },
  {
    name: 'Emily Thompson',
    role: 'Volunteer Coordinator',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80',
  },
  {
    name: 'David Kim',
    role: 'Disaster Response Lead',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-primary-900">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=20&auto=format&fm=webp&fit=crop"
          alt="Humanitarian workers helping children affected by disasters"
          class="h-full w-full object-cover opacity-30"
          width="800"
          height="450"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold text-white sm:text-5xl">
            About <span class="text-accent-400">RescueNet</span>
          </h1>
          <p class="mt-6 text-xl text-primary-100">
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
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=60&auto=format&fm=webp&fit=crop" alt="Relief workers providing aid in disaster affected areas" class="w-1/2 rounded-xl object-cover" width="400" height="300" loading="lazy" decoding="async" />
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=60&auto=format&fm=webp&fit=crop" alt="Volunteers distributing food to disaster victims" class="w-1/2 rounded-xl object-cover" width="400" height="300" loading="lazy" decoding="async" />
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
            <img :src="member.image" :alt="member.name" class="mx-auto h-40 w-40 rounded-full object-cover" />
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
