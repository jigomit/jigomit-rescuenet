<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getBlogPostBySlug, getRecentPosts } from '@/data/blog'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const route = useRoute()
const { observeAll } = useScrollAnimation()

const post = computed(() => {
  const slug = route.params.slug as string
  return getBlogPostBySlug(slug)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return getRecentPosts(3).filter(p => p.id !== post.value?.id).slice(0, 2)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  setTimeout(() => {
    observeAll('.scroll-animate')
  }, 100)
})
</script>

<template>
  <div v-if="post">
    <!-- Hero Image -->
    <section class="relative h-64 sm:h-80 lg:h-96">
      <img
        :src="post.image_url"
        :alt="post.title"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <!-- Overlay Content -->
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div class="mx-auto max-w-4xl">
          <!-- Category -->
          <span class="inline-block rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {{ post.category }}
          </span>

          <!-- Title -->
          <h1 class="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl drop-shadow-lg">
            {{ post.title }}
          </h1>
        </div>
      </div>
    </section>

    <!-- Article Meta -->
    <section class="border-b border-surface-200 bg-surface-50">
      <div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Author -->
          <div class="flex items-center gap-3">
            <img
              :src="post.author_image"
              :alt="post.author"
              class="h-10 w-10 rounded-full object-cover ring-2 ring-surface-200"
            />
            <div>
              <p class="text-sm font-medium text-surface-900">{{ post.author }}</p>
              <p class="text-xs text-surface-500">Author</p>
            </div>
          </div>
          <span class="hidden text-surface-300 sm:inline">|</span>
          <div class="flex items-center gap-4 text-sm text-surface-600">
            <div class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ post.read_time }} min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <article class="py-12 sm:py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <!-- Article Body -->
        <div class="prose prose-lg prose-primary max-w-none">
          <div
            v-for="(paragraph, index) in post.content.split('\n\n')"
            :key="index"
            class="scroll-animate"
            :class="`stagger-${(index % 4) + 1}`"
          >
            <!-- Handle headings -->
            <h2 v-if="paragraph.startsWith('## ')" class="mt-8 text-2xl font-bold text-surface-900">
              {{ paragraph.replace('## ', '') }}
            </h2>
            <h3 v-else-if="paragraph.startsWith('### ')" class="mt-6 text-xl font-semibold text-surface-900">
              {{ paragraph.replace('### ', '') }}
            </h3>
            <!-- Handle lists -->
            <ul v-else-if="paragraph.includes('\n- ')" class="mt-4 space-y-2 text-surface-600">
              <li
                v-for="(item, itemIndex) in paragraph.split('\n').filter((line: string) => line.startsWith('- '))"
                :key="itemIndex"
                class="flex items-start gap-2"
              >
                <span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600"></span>
                <span v-html="item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></span>
              </li>
            </ul>
            <!-- Handle numbered lists -->
            <ol v-else-if="paragraph.match(/^\d\.\s/m)" class="mt-4 space-y-3 text-surface-600">
              <li
                v-for="(item, itemIndex) in paragraph.split('\n').filter((line: string) => line.match(/^\d\.\s/))"
                :key="itemIndex"
                class="flex items-start gap-3"
              >
                <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                  {{ itemIndex + 1 }}
                </span>
                <span v-html="item.replace(/^\d\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></span>
              </li>
            </ol>
            <!-- Regular paragraphs -->
            <p
              v-else-if="paragraph.trim()"
              class="mt-4 text-surface-600"
              v-html="paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class=\'text-surface-900\'>$1</strong>')"
            ></p>
          </div>
        </div>

        <!-- Share Buttons -->
        <div class="mt-12 border-t border-surface-200 pt-8">
          <h3 class="text-sm font-semibold text-surface-900">Share this article</h3>
          <div class="mt-4 flex gap-3">
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
              aria-label="Share on Twitter"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
              aria-label="Share on Facebook"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
              aria-label="Share on LinkedIn"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
              aria-label="Copy link"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Author Bio -->
        <div class="mt-8 rounded-2xl border border-surface-200 bg-surface-50 p-6">
          <div class="flex items-start gap-4">
            <img
              :src="post.author_image"
              :alt="post.author"
              class="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p class="text-sm text-surface-500">Written by</p>
              <h3 class="font-semibold text-surface-900">{{ post.author }}</h3>
              <p class="mt-2 text-sm text-surface-600">
                Contributing writer at RescueNet, passionate about disaster preparedness and community resilience.
              </p>
            </div>
          </div>
        </div>

        <!-- Back to Blog Button -->
        <div class="mt-12 text-center">
          <RouterLink
            to="/blog"
            class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </RouterLink>
        </div>
      </div>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="border-t border-surface-200 bg-surface-50 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-surface-900">Related Articles</h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-2">
          <RouterLink
            v-for="related in relatedPosts"
            :key="related.id"
            :to="`/blog/${related.slug}`"
            class="group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                :src="related.image_url"
                :alt="related.title"
                class="h-full w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <p class="text-sm text-surface-500">{{ formatDate(related.published_at) }}</p>
              <h3 class="mt-2 font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                {{ related.title }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="flex min-h-[60vh] items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-surface-900">Article Not Found</h1>
      <p class="mt-4 text-surface-600">The article you're looking for doesn't exist.</p>
      <RouterLink
        to="/blog"
        class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
