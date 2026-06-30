<script setup lang="ts">
import LanguageSwitcher from '~/components/ui/LanguageSwitcher.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const isOpen = ref(false)

const navItems = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.products'), to: localePath('/products') },
  { label: t('nav.contact'), to: localePath('/contact') }
])

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'

const isActive = (path: string) => normalizePath(route.path) === normalizePath(path)

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700"
        :aria-label="t('nav.home')"
      >
        <img
          src="/logo/artaqua-logo-new.png"
          alt="ArtAqua PostModerna"
          class="h-12 w-auto max-w-[172px] object-contain sm:h-14 sm:max-w-[210px]"
        >
      </NuxtLink>

      <nav
        class="hidden items-center gap-1 md:flex"
        :aria-label="t('header.primaryNavigation')"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="isActive(item.to)
            ? 'bg-cyan-950 text-white'
            : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-950'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center md:flex">
        <LanguageSwitcher />
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50 md:hidden"
        :aria-label="isOpen ? t('header.closeMenu') : t('header.openMenu')"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{ isOpen ? t('header.closeMenu') : t('header.openMenu') }}</span>
        <span
          aria-hidden="true"
          class="relative h-4 w-5"
        >
          <span
            class="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition"
            :class="isOpen && 'translate-y-[7px] rotate-45'"
          />
          <span
            class="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition"
            :class="isOpen && 'opacity-0'"
          />
          <span
            class="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition"
            :class="isOpen && '-translate-y-[7px] -rotate-45'"
          />
        </span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-950/[0.06] md:hidden"
    >
      <nav
        class="mx-auto flex max-w-7xl flex-col gap-2"
        :aria-label="t('header.mobileNavigation')"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-3 text-base font-medium transition"
          :class="isActive(item.to)
            ? 'bg-cyan-950 text-white'
            : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-950'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="mx-auto mt-4 flex max-w-7xl items-center justify-end border-t border-slate-100 pt-4">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
