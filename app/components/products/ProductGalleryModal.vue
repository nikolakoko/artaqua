<script setup lang="ts">
const props = defineProps<{
  title: string
  images: string[]
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const currentIndex = ref(0)
const failedImages = ref<Set<string>>(new Set())
const hasImages = computed(() => props.images.length > 0)
const hasMultipleImages = computed(() => props.images.length > 1)
const currentImage = computed(() => props.images[currentIndex.value] || '')
const currentImageFailed = computed(() => currentImage.value ? failedImages.value.has(currentImage.value) : false)

const showPreviousImage = () => {
  if (!hasMultipleImages.value) {
    return
  }

  currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
}

const showNextImage = () => {
  if (!hasMultipleImages.value) {
    return
  }

  currentIndex.value = currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1
}

const markImageFailed = () => {
  if (!currentImage.value) {
    return
  }

  failedImages.value = new Set([...failedImages.value, currentImage.value])
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }

  if (event.key === 'ArrowLeft') {
    showPreviousImage()
  }

  if (event.key === 'ArrowRight') {
    showNextImage()
  }
}

watch(
  () => props.images,
  () => {
    currentIndex.value = 0
    failedImages.value = new Set()
  },
  { immediate: true }
)

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/85 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-label="t('products.gallery.title', { title })"
      @click.self="emit('close')"
    >
      <div class="relative flex h-full max-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">
        <button
          type="button"
          class="absolute right-0 top-0 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          :aria-label="t('products.gallery.close')"
          @click="emit('close')"
        >
          <UIcon
            name="i-lucide-x"
            class="size-5"
          />
        </button>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="absolute left-0 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:left-3"
          :aria-label="t('products.gallery.previousImage')"
          @click="showPreviousImage"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-6"
          />
        </button>

        <div class="flex h-full w-full items-center justify-center px-0 sm:px-16">
          <img
            v-if="hasImages && !currentImageFailed"
            :src="currentImage"
            :alt="title"
            class="max-h-full max-w-full object-contain"
            @error="markImageFailed"
          >
          <div
            v-else
            class="flex aspect-video w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_52%,#f7f5f1_100%)] px-6 text-center"
          >
            <UIcon
              name="i-lucide-image-off"
              class="size-12 text-cyan-800/70"
            />
            <p class="text-sm font-medium text-slate-600">
              {{ t('common.labels.imagePlaceholder') }}
            </p>
          </div>
        </div>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="absolute right-0 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:right-3"
          :aria-label="t('products.gallery.nextImage')"
          @click="showNextImage"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-6"
          />
        </button>

        <div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 text-sm text-white shadow-lg">
          <span class="max-w-[14rem] truncate font-medium sm:max-w-sm">{{ title }}</span>
          <span
            v-if="hasImages"
            class="text-slate-300"
          >
            {{ t('products.gallery.counter', { current: currentIndex + 1, total: images.length }) }}
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
