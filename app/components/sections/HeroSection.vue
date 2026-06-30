<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

const { t, tm } = useI18n()
const localePath = useLocalePath()

const highlights = computed(() => tm('home.hero.highlights') as string[])
</script>

<template>
  <section class="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5f1_100%)]">
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {{ t('home.hero.eyebrow') }}
        </p>
        <h1 class="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {{ t('home.hero.description') }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton :to="localePath('/products')">
            {{ t('home.hero.primaryAction') }}
          </BaseButton>
          <BaseButton
            :to="localePath('/contact')"
            variant="secondary"
          >
            {{ t('home.hero.secondaryAction') }}
          </BaseButton>
        </div>

        <dl class="mt-10 grid gap-3 sm:grid-cols-3">
          <div
            v-for="item in highlights"
            :key="item"
            class="border-l border-cyan-700/30 pl-4"
          >
            <dt class="sr-only">
              {{ item }}
            </dt>
            <dd class="text-sm font-semibold text-slate-800">
              {{ item }}
            </dd>
          </div>
        </dl>
      </div>

      <div class="relative">
        <figure class="relative overflow-hidden rounded-lg border border-white bg-white shadow-2xl shadow-slate-950/12">
          <img
            :src="t('home.hero.image')"
            :alt="t('home.hero.imageAlt')"
            class="aspect-[4/3] w-full object-cover"
          >
        </figure>
      </div>
    </div>
  </section>
</template>
