<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/images/heroes/home_hero.webp', fetchpriority: 'high' }
  ]
})

const { t, tm } = useI18n()
const { resolveMessageArray } = useI18nResolved()
const localePath = useLocalePath()

const highlights = computed(() => resolveMessageArray(tm('home.hero.highlights')))
</script>

<template>
  <section class="relative overflow-hidden border-b border-slate-200 bg-[url('/images/heroes/home_hero.webp')] bg-cover bg-center bg-no-repeat">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-7 lg:py-20">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {{ t('home.hero.eyebrow') }}
        </p>
        <h1 class="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-900 sm:text-4xl lg:text-4xl">
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

        <dl class="mt-10 grid max-w-lg gap-3 sm:grid-cols-3">
          <div
            v-for="item in highlights"
            :key="item"
            class="border-l border-cyan-700/30 pl-4"
          >
            <dt class="sr-only">
              {{ item }}
            </dt>
            <dd class="text-sm font-semibold text-slate-800 whitespace-nowrap">
              {{ item }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
