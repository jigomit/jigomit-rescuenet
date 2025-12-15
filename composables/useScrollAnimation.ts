import { ref } from 'vue'

// Scroll animations disabled for performance - prevents CLS
export function useScrollAnimation() {
  // No-op functions - animations disabled to prevent CLS
  const observe = (_el: Element | null) => {}
  const observeAll = (_selector: string) => {}

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
