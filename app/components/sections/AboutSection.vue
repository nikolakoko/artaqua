<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

const { t, tm } = useI18n()

const body = computed(() => tm('home.about.body') as string[])
</script>

<template>
  <section class="bg-stone-50 py-16 sm:py-20">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <figure class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img
          :src="t('home.about.image')"
          :alt="t('home.about.imageAlt')"
          class="aspect-[4/3] w-full object-cover"
        >
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
