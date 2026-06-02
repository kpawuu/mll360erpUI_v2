import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let nextId = 1
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  function show(message: string, type: ToastType = 'success', duration = 4000) {
    const id = nextId++
    const toast: Toast = { id, message, type, duration }
    toasts.value = [...toasts.value, toast]
    if (duration > 0) {
      hideTimer = setTimeout(() => {
        remove(id)
        hideTimer = null
      }, duration)
    }
    return id
  }

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function success(message: string, duration?: number) {
    return show(message, 'success', duration)
  }

  function error(message: string, duration?: number) {
    return show(message, 'error', duration ?? 6000)
  }

  function info(message: string, duration?: number) {
    return show(message, 'info', duration)
  }

  return { toasts, show, remove, success, error, info }
})
