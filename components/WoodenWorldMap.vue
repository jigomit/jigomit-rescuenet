<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Disaster } from '@/data/disasters'

interface Props {
  disasters: Disaster[]
}

const props = defineProps<Props>()

// Convert lat/lng to percentage position on the map image
// Map bounds approximately: lat -60 to 85, lng -180 to 180
const getPosition = (lat: number, lng: number) => {
  // Mercator-like projection for the wooden map
  const x = ((lng + 180) / 360) * 100
  // Adjust for the map image cropping (roughly -60 to 85 latitude visible)
  const latRange = 145 // 85 - (-60)
  const latOffset = 85
  const y = ((latOffset - lat) / latRange) * 100
  return { x, y }
}

const disasterPins = computed(() => {
  return props.disasters.map(disaster => ({
    ...disaster,
    position: getPosition(disaster.coordinates.lat, disaster.coordinates.lng),
  }))
})

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500'
    case 'high':
      return 'bg-orange-500'
    case 'moderate':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-blue-500'
  }
}
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl shadow-xl">
    <!-- Wooden Map Background -->
    <div class="relative aspect-[2/1] w-full">
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80&auto=format&fm=webp&fit=crop"
        alt="World map showing active disaster locations"
        class="h-full w-full object-cover"
        width="1200"
        height="600"
        loading="lazy"
        decoding="async"
      />

      <!-- Overlay for better pin visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />

      <!-- Disaster Pins -->
      <div
        v-for="disaster in disasterPins"
        :key="disaster.id"
        class="group absolute"
        :style="{
          left: `${disaster.position.x}%`,
          top: `${disaster.position.y}%`,
          transform: 'translate(-50%, -100%)',
        }"
      >
        <!-- Pin marker -->
        <RouterLink
          :to="`/disasters/${disaster.id}`"
          class="relative block"
        >
          <!-- Pin head (the colored circle) -->
          <div
            class="relative h-4 w-4 rounded-full shadow-lg ring-2 ring-white/80 sm:h-5 sm:w-5"
            :class="getSeverityColor(disaster.severity)"
          >
            <!-- Pulse animation for active disasters -->
            <span
              v-if="disaster.status === 'active'"
              class="absolute inset-0 animate-ping rounded-full opacity-75"
              :class="getSeverityColor(disaster.severity)"
            />
          </div>

          <!-- Pin point -->
          <div
            class="absolute left-1/2 top-full h-2 w-0.5 -translate-x-1/2 shadow-sm sm:h-2.5"
            :class="getSeverityColor(disaster.severity)"
          />

          <!-- Tooltip on hover -->
          <div class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
            <div class="whitespace-nowrap rounded-lg bg-surface-900/95 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-sm sm:text-sm">
              <p class="font-semibold">{{ disaster.title }}</p>
              <p class="mt-0.5 text-surface-300">{{ disaster.location_name }}</p>
              <div class="mt-1 flex items-center gap-1.5">
                <span
                  class="inline-block h-2 w-2 rounded-full"
                  :class="getSeverityColor(disaster.severity)"
                />
                <span class="capitalize text-surface-400">{{ disaster.severity }}</span>
              </div>
              <!-- Tooltip arrow -->
              <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-surface-900/95" />
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- Legend -->
    <div class="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-4 sm:py-2.5">
      <p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-surface-600 sm:text-xs">Severity</p>
      <div class="flex flex-wrap gap-2 sm:gap-3">
        <div class="flex items-center gap-1 sm:gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
          <span class="text-[10px] text-surface-700 sm:text-xs">Critical</span>
        </div>
        <div class="flex items-center gap-1 sm:gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-orange-500 sm:h-3 sm:w-3" />
          <span class="text-[10px] text-surface-700 sm:text-xs">High</span>
        </div>
        <div class="flex items-center gap-1 sm:gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
          <span class="text-[10px] text-surface-700 sm:text-xs">Moderate</span>
        </div>
        <div class="flex items-center gap-1 sm:gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
          <span class="text-[10px] text-surface-700 sm:text-xs">Low</span>
        </div>
      </div>
    </div>
  </div>
</template>
