<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ProductCategory = {
  id: string
  title: unknown
  shortDescription: unknown
  referenceImage?: unknown
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()
const localePath = useLocalePath()

const failedImages = ref<Record<string, boolean>>({})

const categories = computed(() => (tm('products.categories') as ProductCategory[]).map(category => ({
  id: category.id,
  title: resolveMessage(category.title),
  shortDescription: resolveMessage(category.shortDescription),
  referenceImage: resolveMessage(category.referenceImage).trim()
})))

const shouldShowImage = (category: { id: string, referenceImage?: string }) => Boolean(category.referenceImage) && !failedImages.value[category.id]
const markImageFailed = (id: string) => {
  failedImages.value[id] = true
}

watch(categories, () => {
  failedImages.value = {}
})
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
          <div class="flex aspect-4/3 items-center justify-center bg-cyan-50 p-6">
            <img
              v-if="shouldShowImage(category)"
              :src="category.referenceImage"
              :alt="category.title"
              class="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.03]"
              @error="markImageFailed(category.id)"
            >
            <div
              v-else
              class="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
            >
              <UIcon
                name="i-lucide-image-off"
                class="size-9 text-cyan-800/70"
              />
              <p class="text-sm font-medium text-slate-600">
                {{ t('common.labels.imagePlaceholder') }}
              </p>
            </div>
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
