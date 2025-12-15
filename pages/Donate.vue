<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getFeaturedCampaign } from '@/data/campaigns'

interface FormErrors {
  amount?: string
  firstName?: string
  lastName?: string
  email?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

const featuredCampaign = getFeaturedCampaign()

const selectedAmount = ref<number | null>(100)
const customAmount = ref('')
const donationAmounts = [25, 50, 100, 250, 500, 1000]

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  isMonthly: false,
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const touched = ref<Record<string, boolean>>({})

const selectAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmount.value = ''
  delete errors.value.amount
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const finalAmount = computed(() => {
  if (selectedAmount.value) return selectedAmount.value
  if (customAmount.value) return parseInt(customAmount.value) || 0
  return 0
})

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  return parts.length ? parts.join(' ') : value
}

const formatExpiryDate = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4)
  }
  return v
}

const handleCardNumberInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  form.value.cardNumber = formatCardNumber(input.value)
  if (touched.value.cardNumber) validateField('cardNumber')
}

const handleExpiryInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  form.value.expiryDate = formatExpiryDate(input.value.replace('/', ''))
  if (touched.value.expiryDate) validateField('expiryDate')
}

const validateField = (field: keyof FormErrors | 'amount') => {
  if (field === 'amount') {
    if (finalAmount.value <= 0) {
      errors.value.amount = 'Please select or enter a donation amount'
    } else if (finalAmount.value < 1) {
      errors.value.amount = 'Minimum donation is $1'
    } else {
      delete errors.value.amount
    }
    return
  }

  const value = form.value[field as keyof typeof form.value]

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
    case 'cardNumber':
      const cardDigits = String(value).replace(/\s/g, '')
      if (!cardDigits) {
        errors.value.cardNumber = 'Card number is required'
      } else if (cardDigits.length < 16) {
        errors.value.cardNumber = 'Please enter a valid 16-digit card number'
      } else {
        delete errors.value.cardNumber
      }
      break
    case 'expiryDate':
      const expiry = String(value)
      if (!expiry) {
        errors.value.expiryDate = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        errors.value.expiryDate = 'Please enter a valid date (MM/YY)'
      } else {
        const [month, year] = expiry.split('/').map(Number)
        const now = new Date()
        const currentYear = now.getFullYear() % 100
        const currentMonth = now.getMonth() + 1
        if (month < 1 || month > 12) {
          errors.value.expiryDate = 'Invalid month'
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errors.value.expiryDate = 'Card has expired'
        } else {
          delete errors.value.expiryDate
        }
      }
      break
    case 'cvv':
      const cvv = String(value)
      if (!cvv) {
        errors.value.cvv = 'CVV is required'
      } else if (!/^\d{3,4}$/.test(cvv)) {
        errors.value.cvv = 'CVV must be 3 or 4 digits'
      } else {
        delete errors.value.cvv
      }
      break
  }
}

const validateAll = () => {
  validateField('amount')
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('cardNumber')
  validateField('expiryDate')
  validateField('cvv')
  return Object.keys(errors.value).length === 0
}

const handleBlur = (field: keyof typeof form.value) => {
  touched.value[field] = true
  validateField(field)
}

const submit = async () => {
  // Mark all fields as touched
  touched.value = {
    firstName: true,
    lastName: true,
    email: true,
    cardNumber: true,
    expiryDate: true,
    cvv: true,
  }

  if (!validateAll()) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2500))

  isSubmitting.value = false
  isSuccess.value = true
}

const closeSuccess = () => {
  isSuccess.value = false
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    isMonthly: false,
  }
  selectedAmount.value = 100
  customAmount.value = ''
  touched.value = {}
  errors.value = {}
}
</script>

<template>
  <div>
    <!-- Success Modal -->
    <Transition name="modal">
      <div v-if="isSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="closeSuccess"></div>
        <div class="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-100">
            <svg class="h-10 w-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mt-6 text-2xl font-bold text-surface-900">Thank You!</h3>
          <p class="mt-3 text-lg text-accent-600 font-semibold">{{ formatCurrency(finalAmount) }} {{ form.isMonthly ? 'monthly' : '' }} donation</p>
          <p class="mt-3 text-surface-600">Your generosity will help provide immediate relief to disaster-affected communities. A receipt has been sent to your email.</p>
          <div class="mt-6 rounded-xl bg-surface-50 p-4 text-left">
            <p class="text-sm text-surface-500">Confirmation #</p>
            <p class="font-mono font-semibold text-surface-900">RN-{{ Math.random().toString(36).substr(2, 9).toUpperCase() }}</p>
          </div>
          <button
            @click="closeSuccess"
            class="mt-6 w-full rounded-xl bg-accent-600 py-3 font-semibold text-white hover:bg-accent-700"
          >
            Done
          </button>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-accent-600 to-accent-800">
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:px-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Make a <span class="text-white/80">Donation</span>
          </h1>
          <p class="mx-auto mt-3 max-w-2xl text-sm text-accent-100 sm:mt-4 sm:text-base lg:text-lg">
            Your generosity saves lives. 100% of donations go directly to disaster relief efforts.
          </p>
        </div>
      </div>
    </section>

    <div class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Donation Form -->
          <div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
            <form @submit.prevent="submit">
              <!-- Amount Selection -->
              <div>
                <h2 class="text-2xl font-bold text-surface-900">Choose Your Donation Amount</h2>

                <div class="mt-6 grid grid-cols-3 gap-3">
                  <button
                    v-for="amount in donationAmounts"
                    :key="amount"
                    type="button"
                    class="rounded-xl border-2 py-4 text-center text-lg font-semibold transition-all"
                    :class="selectedAmount === amount
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-surface-200 text-surface-700 hover:border-surface-300'"
                    @click="selectAmount(amount)"
                  >
                    ${{ amount }}
                  </button>
                </div>

                <!-- Custom Amount -->
                <div class="mt-6">
                  <label class="block text-sm font-medium text-surface-700">Custom Amount</label>
                  <div class="relative mt-2">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-surface-500">$</span>
                    <input
                      v-model="customAmount"
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      class="w-full rounded-xl border-2 py-4 pl-10 pr-4 text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      :class="errors.amount
                        ? 'border-error-500 bg-error-50'
                        : 'border-surface-200'"
                      @focus="selectedAmount = null"
                      @input="delete errors.amount"
                    />
                  </div>
                  <Transition name="fade">
                    <p v-if="errors.amount" class="mt-1 text-sm text-error-600">
                      {{ errors.amount }}
                    </p>
                  </Transition>
                </div>

                <!-- Monthly Donation Toggle -->
                <div class="mt-6 flex items-center gap-3 rounded-xl bg-surface-50 p-4">
                  <input
                    id="monthly"
                    v-model="form.isMonthly"
                    type="checkbox"
                    class="h-5 w-5 rounded border-surface-300 text-accent-600 focus:ring-accent-500"
                  />
                  <label for="monthly" class="text-surface-700">
                    Make this a <span class="font-semibold text-accent-600">monthly</span> donation
                  </label>
                </div>
              </div>

              <!-- Personal Info -->
              <div class="mt-8 border-t border-surface-200 pt-8">
                <h3 class="text-lg font-semibold text-surface-900">Your Information</h3>

                <div class="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-surface-700">
                      First Name <span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
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
                      class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
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

                <div class="mt-4">
                  <label class="block text-sm font-medium text-surface-700">
                    Email <span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
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
              </div>

              <!-- Payment Info -->
              <div class="mt-8 border-t border-surface-200 pt-8">
                <h3 class="text-lg font-semibold text-surface-900">Payment Details</h3>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-surface-700">
                    Card Number <span class="text-error-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      :value="form.cardNumber"
                      type="text"
                      maxlength="19"
                      class="mt-1 w-full rounded-lg border px-4 py-3 pr-12 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      :class="touched.cardNumber && errors.cardNumber
                        ? 'border-error-500 bg-error-50'
                        : 'border-surface-300'"
                      placeholder="1234 5678 9012 3456"
                      @input="handleCardNumberInput"
                      @blur="handleBlur('cardNumber')"
                    />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <svg class="h-8 w-8 text-surface-400" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
                        <path d="M2 10h20" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </div>
                  </div>
                  <Transition name="fade">
                    <p v-if="touched.cardNumber && errors.cardNumber" class="mt-1 text-sm text-error-600">
                      {{ errors.cardNumber }}
                    </p>
                  </Transition>
                </div>

                <div class="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-surface-700">
                      Expiry Date <span class="text-error-500">*</span>
                    </label>
                    <input
                      :value="form.expiryDate"
                      type="text"
                      maxlength="5"
                      class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      :class="touched.expiryDate && errors.expiryDate
                        ? 'border-error-500 bg-error-50'
                        : 'border-surface-300'"
                      placeholder="MM/YY"
                      @input="handleExpiryInput"
                      @blur="handleBlur('expiryDate')"
                    />
                    <Transition name="fade">
                      <p v-if="touched.expiryDate && errors.expiryDate" class="mt-1 text-sm text-error-600">
                        {{ errors.expiryDate }}
                      </p>
                    </Transition>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-surface-700">
                      CVV <span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="form.cvv"
                      type="text"
                      maxlength="4"
                      class="mt-1 w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      :class="touched.cvv && errors.cvv
                        ? 'border-error-500 bg-error-50'
                        : 'border-surface-300'"
                      placeholder="123"
                      @blur="handleBlur('cvv')"
                      @input="touched.cvv && validateField('cvv')"
                    />
                    <Transition name="fade">
                      <p v-if="touched.cvv && errors.cvv" class="mt-1 text-sm text-error-600">
                        {{ errors.cvv }}
                      </p>
                    </Transition>
                  </div>
                </div>
              </div>

              <!-- Donate Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="mt-8 w-full rounded-xl bg-accent-600 py-5 text-xl font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-700 hover:shadow-accent-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-3">
                  <svg class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
                <span v-else>
                  Donate {{ finalAmount > 0 ? formatCurrency(finalAmount) : 'Now' }}
                  {{ form.isMonthly ? '/month' : '' }}
                </span>
              </button>

              <!-- Trust Badges -->
              <div class="mt-6 flex items-center justify-center gap-6 border-t border-surface-200 pt-6">
                <div class="flex items-center gap-2 text-sm text-surface-500">
                  <svg class="h-5 w-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Secure Payment
                </div>
                <div class="flex items-center gap-2 text-sm text-surface-500">
                  <svg class="h-5 w-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Tax Deductible
                </div>
              </div>
            </form>
          </div>

          <!-- Impact Info -->
          <div class="space-y-8">
            <div class="rounded-2xl bg-primary-50 p-6">
              <h3 class="text-lg font-semibold text-primary-900">Your Impact</h3>
              <ul class="mt-4 space-y-3">
                <li class="flex items-center gap-3 text-primary-700">
                  <span class="text-xl">🍞</span>
                  <span><strong>$25</strong> - Feeds a family for a week</span>
                </li>
                <li class="flex items-center gap-3 text-primary-700">
                  <span class="text-xl">💧</span>
                  <span><strong>$50</strong> - Provides clean water for a month</span>
                </li>
                <li class="flex items-center gap-3 text-primary-700">
                  <span class="text-xl">🏠</span>
                  <span><strong>$100</strong> - Supplies emergency shelter</span>
                </li>
                <li class="flex items-center gap-3 text-primary-700">
                  <span class="text-xl">🏥</span>
                  <span><strong>$250</strong> - Medical care for 10 people</span>
                </li>
              </ul>
            </div>

            <!-- Featured Campaign -->
            <div v-if="featuredCampaign" class="rounded-2xl border border-surface-200 bg-white p-6">
              <h3 class="font-semibold text-surface-900">Featured Campaign</h3>
              <div class="mt-4">
                <img :src="`${featuredCampaign.image_url}&w=300&q=40&auto=format&fm=webp`" :alt="featuredCampaign.title" class="h-40 w-full rounded-lg object-cover" width="300" height="160" loading="lazy" decoding="async" />
                <h4 class="mt-4 font-semibold text-surface-900">{{ featuredCampaign.title }}</h4>
                <div class="mt-3 h-2 overflow-hidden rounded-full bg-surface-200">
                  <div class="h-full bg-accent-600" :style="{ width: `${featuredCampaign.progress_percentage}%` }" />
                </div>
                <p class="mt-2 text-sm text-surface-500">{{ featuredCampaign.progress_percentage }}% of {{ formatCurrency(featuredCampaign.goal_amount) }} goal</p>
                <RouterLink :to="`/campaigns/${featuredCampaign.id}`" class="mt-4 block text-center text-primary-600 hover:text-primary-700">
                  Learn More →
                </RouterLink>
              </div>
            </div>

            <!-- Testimonial -->
            <div class="rounded-2xl bg-surface-100 p-6">
              <p class="text-surface-600 italic">"I've been donating monthly to RescueNet for 2 years. Knowing that 100% goes directly to relief efforts gives me confidence my contribution matters."</p>
              <div class="mt-4 flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                  <span class="text-lg opacity-60">👤</span>
                </div>
                <div>
                  <p class="font-medium text-surface-900">Emily S.</p>
                  <p class="text-sm text-surface-500">Monthly Donor since 2023</p>
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
