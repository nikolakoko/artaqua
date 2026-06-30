<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const locales = [
  { code: 'mk', label: 'MK' },
  { code: 'en', label: 'EN' }
] as const

const activeIndex = computed(() => locales.findIndex(item => item.code === locale.value))
</script>

<template>
  <div
    class="relative inline-grid grid-cols-2 rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner shadow-slate-950/[0.04]"
    :aria-label="t('common.labels.language')"
  >
    <span
      aria-hidden="true"
      class="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full bg-cyan-950 shadow-sm transition-transform duration-200 ease-out"
      :class="activeIndex === 1 && 'translate-x-full'"
    />
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700"
      :class="locale === item.code
        ? 'text-white'
        : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-950'"
      :aria-current="locale === item.code ? 'true' : undefined"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>
