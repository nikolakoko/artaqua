<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ProductCategory = {
  id: string
  title: string
  shortDescription: string
  referenceImage?: string
}

const { t, tm } = useI18n()
const localePath = useLocalePath()

const categories = computed(() => tm('products.categories') as ProductCategory[])
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
          class="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-950/8"
        >
          <div class="flex aspect-[4/3] items-center justify-center bg-cyan-50 p-6">
            <img
              v-if="category.referenceImage"
              :src="category.referenceImage"
              :alt="category.title"
              class="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03]"
            >
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-slate-950">
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
