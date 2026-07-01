<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ProductCategoryCard from '~/components/products/ProductCategoryCard.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ProductCategory = {
  id: string
  title: unknown
  shortDescription: unknown
  details?: unknown[]
  referenceImage?: unknown
}

const { t, tm } = useI18n()
const localePath = useLocalePath()

const categories = computed(() => tm('products.categories') as ProductCategory[])

useSeoMeta({
  title: () => t('seo.products.title'),
  description: () => t('seo.products.description')
})
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
            v-for="category in categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </section>

    <section class="bg-white py-14 sm:py-18">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/12 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
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
  </div>
</template>
