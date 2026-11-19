<script setup lang="ts">
import ProductCategoryImage from '~/components/products/ProductCategoryImage.vue'

type ProductCategory = {
  id: unknown
  title: unknown
  details?: unknown[]
}

const props = defineProps<{
  category: ProductCategory
  index: number
  galleryCount: number
}>()

const emit = defineEmits<{
  openGallery: [index: number]
}>()

const { t } = useI18n()
const { resolveMessage, resolveMessageArray } = useI18nResolved()

const title = computed(() => resolveMessage(props.category.title))
const detailsId = useId()
const details = computed(() => resolveMessageArray(props.category.details))
</script>

<template>
  <button
    type="button"
    class="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-900/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
    :aria-label="t('products.gallery.openGalleryFor', { title })"
    :aria-describedby="details.length ? detailsId : undefined"
    @click="emit('openGallery', index)"
  >
    <ProductCategoryImage
      :category-id="resolveMessage(category.id)"
      :alt="title"
    />

    <div class="flex flex-1 flex-col p-6">
      <h2 class="text-xl font-semibold text-slate-900">
        {{ title }}
      </h2>

      <ul
        v-if="details.length"
        :id="detailsId"
        class="mt-4 flex min-w-0 flex-wrap items-start gap-2"
      >
        <li
          v-for="detail in details"
          :key="detail"
          class="max-w-full wrap-anywhere rounded-full border bg-stone-50 px-3 py-1 text-[0.8125rem] leading-5 text-cyan-900"
        >
          {{ detail }}
        </li>
      </ul>

      <div class="mt-auto pt-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-900 transition group-hover:bg-cyan-100">
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
