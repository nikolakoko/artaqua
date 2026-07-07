<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-slate-900 antialiased">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-cyan-700"
    >
      {{ t('common.labels.skipToContent') }}
    </a>
    <AppHeader />
    <main
      id="main-content"
      tabindex="-1"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
