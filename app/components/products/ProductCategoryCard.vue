<script setup lang="ts">
type ProductCategory = {
  id: unknown
  title: unknown
  shortDescription: unknown
  details?: unknown[]
}

const props = defineProps<{
  category: ProductCategory
  index: number
  previewImage?: string
  galleryCount: number
}>()

const emit = defineEmits<{
  openGallery: [index: number]
}>()

const { t } = useI18n()
const { resolveMessage, resolveMessageArray } = useI18nResolved()

const imageFailed = ref(false)
const title = computed(() => resolveMessage(props.category.title))
const description = computed(() => resolveMessage(props.category.shortDescription))
const details = computed(() => resolveMessageArray(props.category.details))
const imageSrc = computed(() => props.previewImage || '')
const showImage = computed(() => Boolean(imageSrc.value) && !imageFailed.value)

watch(imageSrc, () => {
  imageFailed.value = false
})
</script>

<template>
  <button
    type="button"
    class="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-900/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
    :aria-label="t('products.gallery.openGalleryFor', { title })"
    @click="emit('openGallery', index)"
  >
    <div class="flex aspect-4/3 items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_52%,#f7f5f1_100%)] p-6">
      <img
        v-if="showImage"
        :src="imageSrc"
        :alt="title"
        class="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03]"
        @error="imageFailed = true"
      >
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
      >
        <UIcon
          name="i-lucide-image-off"
          class="size-10 text-cyan-800/70"
        />
        <p class="text-sm font-medium text-slate-600">
          {{ t('common.labels.imagePlaceholder') }}
        </p>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h2 class="text-xl font-semibold text-slate-900">
        {{ title }}
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        {{ description }}
      </p>

      <ul
        v-if="details.length"
        class="mt-5 space-y-2 text-sm leading-6 text-slate-700"
      >
        <li
          v-for="detail in details"
          :key="detail"
          class="flex gap-2"
        >
          <UIcon
            name="i-lucide-check"
            class="mt-1 size-4 shrink-0 text-cyan-700"
          />
          <span>{{ detail }}</span>
        </li>
      </ul>

      <div class="mt-auto pt-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-900 transition group-hover:bg-cyan-100">
          <UIcon
            name="i-lucide-images"
            class="size-4"
          />
          {{ t('products.gallery.viewGallery') }}
          <span
            v-if="galleryCount"
            class="text-cyan-700"
          >
            {{ t('products.gallery.imageCount', { count: galleryCount }) }}
          </span>
        </span>
      </div>
    </div>
  </button>
</template>
