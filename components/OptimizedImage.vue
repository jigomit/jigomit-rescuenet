<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 600,
  priority: false,
  class: '',
})

// Optimize Unsplash/Pexels URLs for better performance
const optimizedSrc = computed(() => {
  let url = props.src

  // For Unsplash images - use their optimization params
  if (url.includes('unsplash.com')) {
    // Remove existing params and add optimized ones
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?w=${props.width}&q=75&auto=format&fit=crop`
  }

  // For Pexels images - use their optimization
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${props.width}&h=${props.height}&fit=crop`
  }

  return url
})

// Generate low-quality placeholder
const placeholderSrc = computed(() => {
  let url = props.src

  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?w=20&q=10&blur=10`
  }

  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=20&h=20`
  }

  return url
})

import { computed } from 'vue'
</script>

<template>
  <img
    :src="optimizedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="priority ? 'eager' : 'lazy'"
    :decoding="priority ? 'sync' : 'async'"
    :fetchpriority="priority ? 'high' : 'auto'"
    :class="props.class"
  />
</template>
