<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ProductCategoryCard from '~/components/products/ProductCategoryCard.vue'
import ProductGalleryModal from '~/components/products/ProductGalleryModal.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'
import { getProductGalleryImages } from '~/data/productGalleries'

type ProductCategory = {
  id: unknown
  title: unknown
  shortDescription: unknown
  details?: unknown[]
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()
const localePath = useLocalePath()

const categories = computed(() => {
  const translatedCategories = tm('products.categories') as unknown

  return Array.isArray(translatedCategories) ? translatedCategories as ProductCategory[] : []
})
const selectedIndex = ref<number | null>(null)
const selectedCategory = computed(() => selectedIndex.value === null ? null : categories.value[selectedIndex.value])
const selectedTitle = computed(() => selectedCategory.value ? resolveMessage(selectedCategory.value.title) : '')
const selectedImages = computed(() => selectedCategory.value ? getCategoryImages(selectedCategory.value) : [])

useLocalizedSeo('products', {
  mk: '/products',
  en: '/en/products'
})

const openCategory = (index: number) => {
  selectedIndex.value = index
}

const closeCategory = () => {
  selectedIndex.value = null
}

const getCategoryId = (category: ProductCategory) => resolveMessage(category.id)
const getCategoryImages = (category: ProductCategory) => getProductGalleryImages(getCategoryId(category))
</script>

<template>
  <div>
    <section class="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5f1_100%)] py-14 sm:py-18">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          as="h1"
          :eyebrow="t('products.eyebrow')"
          :title="t('products.title')"
          :description="t('products.intro')"
        />
      </div>
    </section>

    <section class="bg-stone-50 py-14 sm:py-18">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ProductCategoryCard
            v-for="(category, index) in categories"
            :key="getCategoryId(category)"
            :category="category"
            :index="index"
            :preview-image="getCategoryImages(category)[0]"
            :gallery-count="getCategoryImages(category).length"
            @open-gallery="openCategory"
          />
        </div>
      </div>
    </section>

    <section class="bg-white py-14 sm:py-18">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 rounded-lg border border-slate-200 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/12 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {{ t('products.ctaEyebrow') }}
            </p>
            <h2 class="mt-3 text-2xl font-semibold tracking-normal sm:text-3xl">
              {{ t('products.ctaTitle') }}
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              {{ t('products.ctaDescription') }}
            </p>
          </div>
          <BaseButton
            :to="localePath('/contact')"
            variant="secondary"
          >
            {{ t('products.ctaAction') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <ProductGalleryModal
      v-if="selectedCategory"
      :title="selectedTitle"
      :images="selectedImages"
      @close="closeCategory"
    />
  </div>
</template>
