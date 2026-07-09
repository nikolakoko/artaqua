<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

const { t, tm } = useI18n()
const { resolveMessageArray } = useI18nResolved()

const imageFailed = ref(false)
const imageSrc = computed(() => t('home.about.image').trim())
const showImage = computed(() => Boolean(imageSrc.value) && !imageFailed.value)
const body = computed(() => resolveMessageArray(tm('home.about.body')))

watch(imageSrc, () => {
  imageFailed.value = false
})
</script>

<template>
  <section class="bg-stone-50 py-16 sm:py-20">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <figure class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img
          v-if="showImage"
          :src="t('home.about.image')"
          :alt="t('home.about.imageAlt')"
          class="aspect-4/3 w-full object-contain object-center p-8"
          @error="imageFailed = true"
        >
        <div
          v-else
          class="flex aspect-4/3 w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#ffffff_0%,#f0fdfa_50%,#f7f5f1_100%)] px-6 text-center"
        >
          <UIcon
            name="i-lucide-image-off"
            class="size-10 text-cyan-800/70"
          />
          <p class="text-sm font-medium text-slate-600">
            {{ t('common.labels.imagePlaceholder') }}
          </p>
        </div>
      </figure>

      <div class="self-center">
        <SectionTitle
          :eyebrow="t('home.about.eyebrow')"
          :title="t('home.about.title')"
        />
        <div class="mt-6 space-y-5 text-base leading-8 text-slate-700">
          <p
            v-for="paragraph in body"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
          <p class="border-l-2 border-cyan-700/40 pl-5 text-slate-800">
            {{ t('home.about.brands') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
