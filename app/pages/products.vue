<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ProductCategory = {
  id: string
  title: string
  shortDescription: string
  referenceImage?: string
}

const { t, tm } = useI18n()

const categories = computed(() => tm('products.categories') as ProductCategory[])

useSeoMeta({
  title: () => t('seo.products.title'),
  description: () => t('seo.products.description')
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <SectionTitle
      as="h1"
      :title="t('products.title')"
      :description="t('products.intro')"
    />

    <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <section
        v-for="category in categories"
        :key="category.id"
        class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 class="text-xl font-semibold text-slate-950">
          {{ category.title }}
        </h2>
        <p class="mt-3 leading-7 text-slate-700">
          {{ category.shortDescription }}
        </p>
        <p
          v-if="category.referenceImage"
          class="mt-4 text-xs text-slate-500"
        >
          {{ t('common.labels.referenceImage') }}: {{ category.referenceImage }}
        </p>
      </section>
    </div>
  </div>
</template>
