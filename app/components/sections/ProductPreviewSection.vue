<script setup lang="ts">
import ProductCategoryImage from '~/components/products/ProductCategoryImage.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ProductCategory = {
  id: unknown
  title: unknown
  shortDescription: unknown
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()
const localePath = useLocalePath()

const categories = computed(() => (tm('products.categories') as ProductCategory[]).map(category => ({
  id: resolveMessage(category.id),
  title: resolveMessage(category.title),
  shortDescription: resolveMessage(category.shortDescription)
})))
</script>

<template>
  <section class="bg-stone-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          :eyebrow="t('home.productPreview.eyebrow')"
          :title="t('home.productPreview.title')"
          :description="t('home.productPreview.description')"
        />
        <BaseButton
          :to="localePath('/products')"
          variant="secondary"
        >
          {{ t('home.productPreview.action') }}
        </BaseButton>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="category in categories"
          :key="category.id"
          class="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/8"
        >
          <ProductCategoryImage
            :category-id="category.id"
            :alt="category.title"
          />
          <div class="p-5">
            <h3 class="text-lg font-semibold text-slate-900">
              {{ category.title }}
            </h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              {{ category.shortDescription }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
