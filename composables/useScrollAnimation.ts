import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const observedElements = ref<Set<Element>>(new Set())
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            entry.target.classList.remove('animate-out')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )
  }

  const observe = (el: Element | null) => {
    if (el && observer) {
      el.classList.add('animate-out')
      observer.observe(el)
      observedElements.value.add(el)
    }
  }

  const observeAll = (selector: string) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observe(el))
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observedElements.value.forEach((el) => observer?.unobserve(el))
      observer.disconnect()
    }
  })

  return {
    observe,
    observeAll,
  }
}

export function useCountAnimation(targetValue: number, duration: number = 2000) {
  const currentValue = ref(0)
  const isAnimating = ref(false)

  const animate = () => {
    if (isAnimating.value) return
    isAnimating.value = true

    const startTime = performance.now()
    const startValue = currentValue.value

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      currentValue.value = Math.floor(startValue + (targetValue - startValue) * easeOut)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        currentValue.value = targetValue
        isAnimating.value = false
      }
    }

    requestAnimationFrame(step)
  }

  return {
    currentValue,
    animate,
  }
}
