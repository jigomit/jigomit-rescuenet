<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { disasters, disasterTypes } from '@/data/disasters'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeAll } = useScrollAnimation()

const searchQuery = ref('')
const severityFilter = ref('')
const typeFilter = ref('')

const filteredDisasters = computed(() => {
  return disasters.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         d.location_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSeverity = !severityFilter.value || d.severity === severityFilter.value
    const matchesType = !typeFilter.value || d.disaster_type.id === parseInt(typeFilter.value)
    return matchesSearch && matchesSeverity && matchesType
  })
})

const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num)

// Hero background image - disaster related
const heroImage = 'https://images.pexels.com/photos/6471926/pexels-photo-6471926.jpeg'

onMounted(() => {
  setTimeout(() => {
    observeAll('.scroll-animate')
  }, 100)
})
</script>

<template>
  <div>
    <!-- Hero Section - Fixed height prevents CLS -->
    <section class="relative h-[200px] overflow-hidden bg-surface-200 sm:h-[240px] lg:h-[280px]">
      <img
        :src="heroImage + '?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop&fm=webp'"
        alt="Active disaster response"
        class="absolute inset-0 h-full w-full object-cover"
        width="1200"
        height="400"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent" />

      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Active <span class="text-accent-400">Disasters</span>
          </h1>
          <p class="mx-auto mt-3 max-w-2xl text-sm text-primary-100 sm:mt-4 sm:text-base lg:text-lg">
            Track ongoing disasters and emergency situations worldwide. Stay informed and find ways to help.
          </p>
        </div>
      </div>
    </section>

    <!-- Disaster Types -->
    <section class="border-b border-surface-200 bg-white py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="scroll-animate mb-8 text-center text-2xl font-bold text-surface-900">Types of Disasters We Monitor</h2>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div
            v-for="(type, index) in disasterTypes"
            :key="type.id"
            class="scroll-animate card-hover rounded-xl bg-surface-50 p-4 text-center"
            :class="`stagger-${(index % 6) + 1}`"
          >
            <span class="text-3xl">{{ type.icon }}</span>
            <p class="mt-2 text-sm font-medium text-surface-700">{{ type.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Filters -->
        <div class="scroll-animate mb-8 rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
          <div class="grid gap-4 md:grid-cols-4">
            <div class="md:col-span-2">
              <label class="mb-1 block text-sm font-medium text-surface-700">Search</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search disasters..."
                class="w-full rounded-lg border border-surface-300 bg-white px-4 py-2 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-surface-700">Severity</label>
              <select
                v-model="severityFilter"
                class="w-full rounded-lg border border-surface-300 bg-white px-4 py-2 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-surface-700">Type</label>
              <select
                v-model="typeFilter"
                class="w-full rounded-lg border border-surface-300 bg-white px-4 py-2 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">All Types</option>
                <option v-for="type in disasterTypes" :key="type.id" :value="type.id">
                  {{ type.icon }} {{ type.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Disasters Grid -->
        <TransitionGroup name="list" tag="div" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="(disaster, index) in filteredDisasters"
            :key="disaster.id"
            :to="`/disasters/${disaster.id}`"
            class="scroll-animate card-hover img-zoom group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm"
            :class="`stagger-${(index % 3) + 1}`"
          >
            <div class="relative aspect-[5/3] overflow-hidden bg-surface-200">
              <img
                :src="disaster.image_url + '?w=400&q=60&auto=format&fm=webp&fit=crop'"
                :alt="disaster.title"
                class="h-full w-full object-cover"
                width="400"
                height="240"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div class="absolute bottom-4 left-4 flex gap-2">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
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
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-surface-500">
                <span>{{ disaster.disaster_type.icon }}</span>
                <span>{{ disaster.disaster_type.name }}</span>
              </div>
              <h3 class="mt-2 text-lg font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                {{ disaster.title }}
              </h3>
              <p class="mt-2 line-clamp-2 text-sm text-surface-600">
                {{ disaster.description }}
              </p>
              <div class="mt-4 flex items-center justify-between text-sm text-surface-500">
                <span>📍 {{ disaster.location_name }}</span>
                <span>{{ formatNumber(disaster.estimated_affected_people) }} affected</span>
              </div>
            </div>
          </RouterLink>
        </TransitionGroup>

        <!-- Empty State -->
        <Transition name="fade">
          <div v-if="filteredDisasters.length === 0" class="rounded-2xl border border-surface-200 bg-white p-12 text-center">
            <p class="text-lg text-surface-600">No disasters match your filters.</p>
            <button
              class="btn-hover mt-4 rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700"
              @click="searchQuery = ''; severityFilter = ''; typeFilter = ''"
            >
              Clear filters
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="bg-accent-600 py-12">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="scroll-animate text-2xl font-bold text-white sm:text-3xl">Help Those in Need</h2>
        <p class="scroll-animate stagger-1 mt-4 text-accent-100">Your donation provides immediate relief to disaster-affected communities.</p>
        <div class="scroll-animate stagger-2 mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink to="/donate" class="btn-hover rounded-lg bg-white px-8 py-3 font-semibold text-accent-600 shadow-lg hover:bg-accent-50">
            Donate Now
          </RouterLink>
          <RouterLink to="/volunteer" class="btn-hover rounded-lg border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10">
            Volunteer
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* All animations disabled to prevent CLS */
.list-enter-active,
.list-leave-active,
.list-move,
.fade-enter-active,
.fade-leave-active {
  transition: none !important;
}

.list-enter-from,
.list-leave-to,
.fade-enter-from,
.fade-leave-to {
  opacity: 1 !important;
  transform: none !important;
}
</style>
