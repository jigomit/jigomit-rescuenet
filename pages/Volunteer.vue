<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  city?: string
  country?: string
  role?: string
  experience?: string
  availability?: string
  agreeTerms?: string
}

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  role: '',
  experience: '',
  availability: '',
  agreeTerms: false,
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const touched = ref<Record<string, boolean>>({})
const showForm = ref(false)

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone: string) => {
  const re = /^[\d\s\-+()]{10,}$/
  return re.test(phone)
}

const validateField = (field: keyof typeof form.value) => {
  const value = form.value[field]

  switch (field) {
    case 'firstName':
      if (!String(value).trim()) {
        errors.value.firstName = 'First name is required'
      } else if (String(value).trim().length < 2) {
        errors.value.firstName = 'First name must be at least 2 characters'
      } else {
        delete errors.value.firstName
      }
      break
    case 'lastName':
      if (!String(value).trim()) {
        errors.value.lastName = 'Last name is required'
      } else if (String(value).trim().length < 2) {
        errors.value.lastName = 'Last name must be at least 2 characters'
      } else {
        delete errors.value.lastName
      }
      break
    case 'email':
      if (!String(value).trim()) {
        errors.value.email = 'Email is required'
      } else if (!validateEmail(String(value))) {
        errors.value.email = 'Please enter a valid email address'
      } else {
        delete errors.value.email
      }
      break
    case 'phone':
      if (!String(value).trim()) {
        errors.value.phone = 'Phone number is required'
      } else if (!validatePhone(String(value))) {
        errors.value.phone = 'Please enter a valid phone number'
      } else {
        delete errors.value.phone
      }
      break
    case 'city':
      if (!String(value).trim()) {
        errors.value.city = 'City is required'
      } else {
        delete errors.value.city
      }
      break
    case 'country':
      if (!String(value).trim()) {
        errors.value.country = 'Country is required'
      } else {
        delete errors.value.country
      }
      break
    case 'role':
      if (!String(value)) {
        errors.value.role = 'Please select a volunteer role'
      } else {
        delete errors.value.role
      }
      break
    case 'experience':
      if (!String(value)) {
        errors.value.experience = 'Please select your experience level'
      } else {
        delete errors.value.experience
      }
      break
    case 'availability':
      if (!String(value)) {
        errors.value.availability = 'Please select your availability'
      } else {
        delete errors.value.availability
      }
      break
    case 'agreeTerms':
      if (!value) {
        errors.value.agreeTerms = 'You must agree to the terms and conditions'
      } else {
        delete errors.value.agreeTerms
      }
      break
  }
}

const validateAll = () => {
  const fields: (keyof typeof form.value)[] = ['firstName', 'lastName', 'email', 'phone', 'city', 'country', 'role', 'experience', 'availability', 'agreeTerms']
  fields.forEach(field => validateField(field))
  return Object.keys(errors.value).length === 0
}

const handleBlur = (field: keyof typeof form.value) => {
  touched.value[field] = true
  validateField(field)
}

const submit = async () => {
  // Mark all fields as touched
  const fields: (keyof typeof form.value)[] = ['firstName', 'lastName', 'email', 'phone', 'city', 'country', 'role', 'experience', 'availability', 'agreeTerms']
  fields.forEach(field => touched.value[field] = true)

  if (!validateAll()) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  isSubmitting.value = false
  isSuccess.value = true
  showForm.value = false
}

const closeSuccess = () => {
  isSuccess.value = false
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    role: '',
    experience: '',
    availability: '',
    agreeTerms: false,
  }
  touched.value = {}
  errors.value = {}
}

const roles = [
  {
    title: 'Emergency Responder',
    description: 'Join front-line teams providing immediate assistance in disaster zones.',
    icon: '🚨',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?w=400',
  },
  {
    title: 'Medical Volunteer',
    description: 'Provide healthcare support and first aid in affected communities.',
    icon: '🏥',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?w=400',
  },
  {
    title: 'Logistics Coordinator',
    description: 'Help organize and distribute supplies to those in need.',
    icon: '📦',
    image: 'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?w=400',
  },
  {
    title: 'Community Support',
    description: 'Assist with shelter operations and community outreach.',
    icon: '🏠',
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?w=400',
  },
]

const testimonials = [
  {
    quote: 'Volunteering with RescueNet changed my life. The impact we make together is incredible.',
    author: 'Sarah M.',
    role: 'Emergency Responder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    quote: 'Being able to help families rebuild after disasters is the most rewarding work I\'ve ever done.',
    author: 'Michael R.',
    role: 'Logistics Coordinator',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
]

const roleOptions = [
  'Emergency Responder',
  'Medical Volunteer',
  'Logistics Coordinator',
  'Community Support',
  'Communications',
  'Technical Support',
]

const experienceOptions = [
  'No prior experience',
  '1-2 years',
  '3-5 years',
  '5+ years',
]

const availabilityOptions = [
  'Weekdays only',
  'Weekends only',
  'Flexible schedule',
  'On-call for emergencies',
]
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
          <h3 class="mt-6 text-2xl font-bold text-surface-900">Application Submitted!</h3>
          <p class="mt-3 text-surface-600">Thank you for applying to volunteer with RescueNet. We'll review your application and contact you within 3-5 business days.</p>
          <button
            @click="closeSuccess"
            class="mt-6 w-full rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Got it!
          </button>
        </div>
      </div>
    </Transition>

    <!-- Registration Form Modal -->
    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <div class="absolute inset-0 bg-black/50" @click="showForm = false"></div>
        <div class="relative my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <button
            @click="showForm = false"
            class="absolute right-4 top-4 text-surface-400 hover:text-surface-600"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 class="text-2xl font-bold text-surface-900">Volunteer Application</h2>
          <p class="mt-2 text-surface-600">Fill out the form below to apply as a volunteer.</p>

          <form class="mt-6 space-y-5" @submit.prevent="submit">
            <!-- Name Fields -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  First Name <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.firstName && errors.firstName
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="John"
                  @blur="handleBlur('firstName')"
                  @input="touched.firstName && validateField('firstName')"
                />
                <Transition name="fade">
                  <p v-if="touched.firstName && errors.firstName" class="mt-1 text-sm text-error-600">
                    {{ errors.firstName }}
                  </p>
                </Transition>
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Last Name <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.lastName && errors.lastName
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="Doe"
                  @blur="handleBlur('lastName')"
                  @input="touched.lastName && validateField('lastName')"
                />
                <Transition name="fade">
                  <p v-if="touched.lastName && errors.lastName" class="mt-1 text-sm text-error-600">
                    {{ errors.lastName }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- Contact Fields -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Email <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.email && errors.email
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="john@example.com"
                  @blur="handleBlur('email')"
                  @input="touched.email && validateField('email')"
                />
                <Transition name="fade">
                  <p v-if="touched.email && errors.email" class="mt-1 text-sm text-error-600">
                    {{ errors.email }}
                  </p>
                </Transition>
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Phone <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.phone && errors.phone
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="+1 (555) 000-0000"
                  @blur="handleBlur('phone')"
                  @input="touched.phone && validateField('phone')"
                />
                <Transition name="fade">
                  <p v-if="touched.phone && errors.phone" class="mt-1 text-sm text-error-600">
                    {{ errors.phone }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- Location Fields -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  City <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.city && errors.city
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="New York"
                  @blur="handleBlur('city')"
                  @input="touched.city && validateField('city')"
                />
                <Transition name="fade">
                  <p v-if="touched.city && errors.city" class="mt-1 text-sm text-error-600">
                    {{ errors.city }}
                  </p>
                </Transition>
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Country <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.country"
                  type="text"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.country && errors.country
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  placeholder="United States"
                  @blur="handleBlur('country')"
                  @input="touched.country && validateField('country')"
                />
                <Transition name="fade">
                  <p v-if="touched.country && errors.country" class="mt-1 text-sm text-error-600">
                    {{ errors.country }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- Role Selection -->
            <div>
              <label class="block text-sm font-medium text-surface-700">
                Preferred Role <span class="text-error-500">*</span>
              </label>
              <select
                v-model="form.role"
                class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                :class="touched.role && errors.role
                  ? 'border-error-500 bg-error-50'
                  : 'border-surface-300'"
                @blur="handleBlur('role')"
                @change="touched.role && validateField('role')"
              >
                <option value="">Select a role...</option>
                <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
              </select>
              <Transition name="fade">
                <p v-if="touched.role && errors.role" class="mt-1 text-sm text-error-600">
                  {{ errors.role }}
                </p>
              </Transition>
            </div>

            <!-- Experience and Availability -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Experience Level <span class="text-error-500">*</span>
                </label>
                <select
                  v-model="form.experience"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.experience && errors.experience
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  @blur="handleBlur('experience')"
                  @change="touched.experience && validateField('experience')"
                >
                  <option value="">Select experience...</option>
                  <option v-for="exp in experienceOptions" :key="exp" :value="exp">{{ exp }}</option>
                </select>
                <Transition name="fade">
                  <p v-if="touched.experience && errors.experience" class="mt-1 text-sm text-error-600">
                    {{ errors.experience }}
                  </p>
                </Transition>
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700">
                  Availability <span class="text-error-500">*</span>
                </label>
                <select
                  v-model="form.availability"
                  class="mt-1 w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  :class="touched.availability && errors.availability
                    ? 'border-error-500 bg-error-50'
                    : 'border-surface-300'"
                  @blur="handleBlur('availability')"
                  @change="touched.availability && validateField('availability')"
                >
                  <option value="">Select availability...</option>
                  <option v-for="avail in availabilityOptions" :key="avail" :value="avail">{{ avail }}</option>
                </select>
                <Transition name="fade">
                  <p v-if="touched.availability && errors.availability" class="mt-1 text-sm text-error-600">
                    {{ errors.availability }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div>
              <label class="flex items-start gap-3">
                <input
                  v-model="form.agreeTerms"
                  type="checkbox"
                  class="mt-1 h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                  @change="touched.agreeTerms = true; validateField('agreeTerms')"
                />
                <span class="text-sm text-surface-600">
                  I agree to the <a href="#" class="text-primary-600 hover:underline">Terms of Service</a> and
                  <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>, and I confirm that the information provided is accurate. <span class="text-error-500">*</span>
                </span>
              </label>
              <Transition name="fade">
                <p v-if="touched.agreeTerms && errors.agreeTerms" class="mt-1 text-sm text-error-600">
                  {{ errors.agreeTerms }}
                </p>
              </Transition>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-xl bg-accent-600 py-3 font-semibold text-white transition-all hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Application...
              </span>
              <span v-else>Submit Application</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-primary-900">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=20&auto=format&fm=webp&fit=crop"
          alt="Volunteers working together to provide disaster relief assistance"
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
            Join Our <span class="text-accent-400">Volunteer</span> Team
          </h1>
          <p class="mt-6 text-xl text-primary-100">
            Make a difference in the lives of disaster-affected communities. Your time and skills can help save lives.
          </p>
          <button
            @click="showForm = true"
            class="mt-8 rounded-xl bg-accent-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-accent-700 hover:scale-105"
          >
            Apply to Volunteer
          </button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-b border-surface-200 bg-white py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="text-center">
            <p class="text-3xl font-bold text-primary-600">5,000+</p>
            <p class="mt-1 text-sm text-surface-600">Active Volunteers</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary-600">50+</p>
            <p class="mt-1 text-sm text-surface-600">Countries</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary-600">100K+</p>
            <p class="mt-1 text-sm text-surface-600">Hours Contributed</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary-600">50K+</p>
            <p class="mt-1 text-sm text-surface-600">Lives Impacted</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Roles -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-surface-900">Volunteer Roles</h2>
          <p class="mt-4 text-surface-600">Find the role that matches your skills and passion</p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="role in roles"
            :key="role.title"
            class="group overflow-hidden rounded-2xl border border-surface-200 bg-white transition-all hover:shadow-lg"
          >
            <div class="relative h-40 overflow-hidden">
              <img :src="role.image" :alt="role.title" class="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span class="absolute bottom-4 left-4 text-3xl">{{ role.icon }}</span>
            </div>
            <div class="p-6">
              <h3 class="font-semibold text-surface-900">{{ role.title }}</h3>
              <p class="mt-2 text-sm text-surface-600">{{ role.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-surface-100 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-3xl font-bold text-surface-900">What Our Volunteers Say</h2>
        <div class="mt-12 grid gap-8 md:grid-cols-2">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.author"
            class="rounded-2xl bg-white p-8 shadow-sm"
          >
            <p class="text-lg text-surface-600">"{{ testimonial.quote }}"</p>
            <div class="mt-6 flex items-center gap-4">
              <img :src="testimonial.image" :alt="testimonial.author" class="h-12 w-12 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-surface-900">{{ testimonial.author }}</p>
                <p class="text-sm text-surface-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-accent-600 py-16">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <h2 class="text-3xl font-bold text-white">Ready to Make a Difference?</h2>
        <p class="mt-4 text-lg text-accent-100">Join thousands of volunteers worldwide who are changing lives.</p>
        <button
          @click="showForm = true"
          class="mt-8 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-accent-600 transition-all hover:bg-accent-50 hover:scale-105"
        >
          Apply to Volunteer
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9) translateY(20px);
}
</style>
