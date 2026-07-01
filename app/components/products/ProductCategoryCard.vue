<script setup lang="ts">
type ProductCategory = {
  id: string
  title: unknown
  shortDescription: unknown
  details?: unknown[]
  referenceImage?: unknown
}

const props = defineProps<{
  category: ProductCategory
}>()

const { t } = useI18n()
const { resolveMessage, resolveMessageArray } = useI18nResolved()

const imageFailed = ref(false)
const title = computed(() => resolveMessage(props.category.title))
const description = computed(() => resolveMessage(props.category.shortDescription))
const details = computed(() => resolveMessageArray(props.category.details))
const imageSrc = computed(() => resolveMessage(props.category.referenceImage).trim())
const showImage = computed(() => Boolean(imageSrc.value) && !imageFailed.value)

watch(imageSrc, () => {
  imageFailed.value = false
})
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-950/8">
    <div class="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_52%,#f7f5f1_100%)] p-6">
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
      <h2 class="text-xl font-semibold text-slate-950">
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
    </div>
  </article>
</template>
