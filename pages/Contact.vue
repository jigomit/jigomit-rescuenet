<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Lazy load Google Maps
const mapContainer = ref<HTMLElement | null>(null)
const showMap = ref(false)

onMounted(() => {
  if (mapContainer.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          showMap.value = true
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(mapContainer.value)
  }
})

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const touched = ref<Record<string, boolean>>({})

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateField = (field: keyof typeof form.value) => {
  const value = form.value[field]

  switch (field) {
    case 'name':
      if (!value.trim()) {
        errors.value.name = 'Name is required'
      } else if (value.trim().length < 2) {
        errors.value.name = 'Name must be at least 2 characters'
      } else {
        delete errors.value.name
      }
      break
    case 'email':
      if (!value.trim()) {
        errors.value.email = 'Email is required'
      } else if (!validateEmail(value)) {
        errors.value.email = 'Please enter a valid email address'
      } else {
        delete errors.value.email
      }
      break
    case 'subject':
      if (!value.trim()) {
        errors.value.subject = 'Subject is required'
      } else if (value.trim().length < 5) {
        errors.value.subject = 'Subject must be at least 5 characters'
      } else {
        delete errors.value.subject
      }
      break
    case 'message':
      if (!value.trim()) {
        errors.value.message = 'Message is required'
      } else if (value.trim().length < 20) {
        errors.value.message = 'Message must be at least 20 characters'
      } else {
        delete errors.value.message
      }
      break
  }
}

const validateAll = () => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
  return Object.keys(errors.value).length === 0
}

const handleBlur = (field: keyof typeof form.value) => {
  touched.value[field] = true
  validateField(field)
}

const isFormValid = computed(() => {
  return form.value.name.trim() !== '' &&
         form.value.email.trim() !== '' &&
         form.value.subject.trim() !== '' &&
         form.value.message.trim() !== '' &&
         Object.keys(errors.value).length === 0
})

const submit = async () => {
  // Mark all fields as touched
  touched.value = { name: true, email: true, subject: true, message: true }

  if (!validateAll()) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSuccess.value = true
  form.value = { name: '', email: '', subject: '', message: '' }
  touched.value = {}
  errors.value = {}
}

const closeSuccess = () => {
  isSuccess.value = false
}

const contactInfo = [
  {
    title: 'Email',
    value: 'contact@rescuenet.org',
    icon: '✉️',
  },
  {
    title: 'Phone',
    value: '1-800-RESCUE',
    icon: '📞',
  },
  {
    title: 'Address',
    value: '123 Relief Street, New York, NY 10001',
    icon: '📍',
  },
]

// Hero background image - humanitarian support/contact related
const heroImage = 'https://images.pexels.com/photos/6646920/pexels-photo-6646920.jpeg'
</script>

<template>
  <div>
    <!-- Success Modal -->
    <Transition name="modal">
      <div v-if="isSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="closeSuccess"></div>
        <div class="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
            <svg class="h-8 w-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mt-6 text-2xl font-bold text-surface-900">Message Sent!</h3>
          <p class="mt-3 text-surface-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          <button
            @click="closeSuccess"
            class="mt-6 w-full rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Got it!
          </button>
        </div>
      </div>
    </Transition>

    <!-- Hero Section - Fixed height prevents CLS -->
    <section class="relative h-[180px] overflow-hidden bg-surface-200 sm:h-[200px] lg:h-[220px]">
      <img
        :src="heroImage + '?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop&fm=webp'"
        alt="Contact RescueNet team"
        class="absolute inset-0 h-full w-full object-cover"
        width="1200"
        height="400"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Get in <span class="text-accent-400">Touch</span>
          </h1>
          <p class="mx-auto mt-3 max-w-2xl text-sm text-primary-100 sm:mt-4 sm:text-base lg:text-lg">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </div>
    </section>

    <div class="py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Contact Form -->
          <div class="rounded-2xl border border-surface-200 bg-white p-8">
            <h2 class="text-2xl font-bold text-surface-900">Send us a Message</h2>
            <form class="mt-8 space-y-6" @submit.prevent="submit">
              <!-- Name Field -->
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Name <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.name && errors.name
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="Your name"
                  @blur="handleBlur('name')"
                  @input="touched.name && validateField('name')"
                />
                <Transition name="fade">
                  <p v-if="touched.name && errors.name" class="mt-1 text-sm text-error-600">
                    {{ errors.name }}
                  </p>
                </Transition>
              </div>

              <!-- Email Field -->
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Email <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.email && errors.email
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="your@email.com"
                  @blur="handleBlur('email')"
                  @input="touched.email && validateField('email')"
                />
                <Transition name="fade">
                  <p v-if="touched.email && errors.email" class="mt-1 text-sm text-error-600">
                    {{ errors.email }}
                  </p>
                </Transition>
              </div>

              <!-- Subject Field -->
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Subject <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.subject"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.subject && errors.subject
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="What is this about?"
                  @blur="handleBlur('subject')"
                  @input="touched.subject && validateField('subject')"
                />
                <Transition name="fade">
                  <p v-if="touched.subject && errors.subject" class="mt-1 text-sm text-error-600">
                    {{ errors.subject }}
                  </p>
                </Transition>
              </div>

              <!-- Message Field -->
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Message <span class="text-error-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.message && errors.message
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="Your message (minimum 20 characters)..."
                  @blur="handleBlur('message')"
                  @input="touched.message && validateField('message')"
                />
                <Transition name="fade">
                  <p v-if="touched.message && errors.message" class="mt-1 text-sm text-error-600">
                    {{ errors.message }}
                  </p>
                </Transition>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full rounded-lg bg-primary-600 py-4 font-semibold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-surface-900">Contact Information</h2>
              <p class="mt-4 text-surface-600">
                We're available 24/7 for emergencies. For general inquiries, we'll respond within 24 hours.
              </p>
            </div>

            <div class="space-y-6">
              <div
                v-for="info in contactInfo"
                :key="info.title"
                class="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-6"
              >
                <span class="text-3xl">{{ info.icon }}</span>
                <div>
                  <h3 class="font-semibold text-surface-900">{{ info.title }}</h3>
                  <p class="mt-1 text-surface-600">{{ info.value }}</p>
                </div>
              </div>
            </div>

            <!-- Google Map - Lazy loaded -->
            <div ref="mapContainer" class="h-64 w-full overflow-hidden rounded-xl">
              <a
                v-if="showMap"
                href="https://www.google.com/maps/place/New+York,+NY+10001/@40.7407679,-74.0042588,17z"
                target="_blank"
                rel="noopener noreferrer"
                class="block h-full w-full cursor-pointer"
                aria-label="Open location in Google Maps"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sNew%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1702300000000!5m2!1sen!2sus"
                  width="100%"
                  height="256"
                  style="border:0; pointer-events: none;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="RescueNet Office Location - New York, NY"
                  class="h-64 w-full"
                ></iframe>
              </a>
              <!-- Map placeholder while loading -->
              <div v-else class="flex h-full w-full items-center justify-center bg-surface-200">
                <div class="text-center">
                  <span class="text-3xl">📍</span>
                  <p class="mt-2 text-sm text-surface-500">Loading map...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* All animations disabled to prevent CLS */
.fade-enter-active,
.fade-leave-active,
.modal-enter-active,
.modal-leave-active,
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: none !important;
}

.fade-enter-from,
.fade-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 1 !important;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: none !important;
}
</style>
