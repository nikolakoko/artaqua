<script setup lang="ts">
import { getProductCover } from '~/data/productCovers'
import { getProductGalleryImages } from '~/data/productGalleries'

const props = defineProps<{
  categoryId: string
  alt: string
}>()

const { t } = useI18n()
const cover = computed(() => getProductCover(props.categoryId))
const imageSrc = computed(() => cover.value?.src ?? getProductGalleryImages(props.categoryId)[0])
const imageFailed = ref(false)

watch(imageSrc, () => {
  imageFailed.value = false
})
</script>

<template>
  <div class="relative aspect-4/3 overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_52%,#f7f5f1_100%)]">
    <img
      v-if="imageSrc && !imageFailed"
      :src="imageSrc"
      :alt="alt"
      class="absolute inset-0 size-full transition duration-300 group-hover:scale-[1.03]"
      :class="cover?.fullBleed ? 'object-cover' : 'object-contain p-5'"
      @error="imageFailed = true"
    >
    <div
      v-else
      class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
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
</template>
