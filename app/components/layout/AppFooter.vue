<script setup lang="ts">
import BusinessHoursStatus from '~/components/business/BusinessHoursStatus.vue'
import { socialLinks } from '~/data/socialLinks'

const { t } = useI18n()
const localePath = useLocalePath()
const { workingHours, isOpen } = useBusinessHours()

const year = new Date().getFullYear()

const quickLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.products'), to: localePath('/products') },
  { label: t('nav.contact'), to: localePath('/contact') }
])

const legalLinks = [
  { page: 'privacyPolicy', route: 'privacy-policy' },
  { page: 'termsOfUse', route: 'terms-of-use' },
  { page: 'returnsRefunds', route: 'returns-refunds' }
] as const
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-900 text-slate-100">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1.2fr] lg:px-8">
      <section>
        <p class="text-xl font-semibold tracking-wide text-white">
          ArtAqua
        </p>
        <p class="mt-1 text-sm text-cyan-100">
          PostModerna
        </p>
        <p class="mt-4 max-w-sm text-sm leading-6 text-slate-300">
          {{ t('footer.tagline') }}
        </p>

        <h2 class="mt-6 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('social.follow') }}
        </h2>
        <div class="mt-4 flex flex-wrap gap-3">
          <a
            v-for="link in socialLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-cyan-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            :aria-label="t(`social.${link.id}Aria`)"
          >
            <UIcon
              :name="link.icon"
              class="size-4"
            />
          </a>
        </div>
      </section>

      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('footer.quickLinks') }}
        </h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li
            v-for="link in quickLinks"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              class="text-slate-300 transition hover:text-white"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <nav
          class="mt-8"
          :aria-label="t('legal.heading')"
        >
          <h2 class="text-sm font-semibold uppercase tracking-wide text-cyan-200">
            {{ t('legal.heading') }}
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li
              v-for="link in legalLinks"
              :key="link.route"
            >
              <NuxtLink
                :to="localePath({ name: link.route })"
                class="wrap-break-word text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                {{ t(`legal.${link.page}.title`) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </section>

      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('footer.location') }}
        </h2>
        <div class="mt-4 text-sm leading-6 text-slate-300">
          <p>{{ t('contact.address') }}</p>
        </div>
        <h2 class="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('footer.workingTime') }}
          <BusinessHoursStatus :is-open="isOpen" />
        </h2>
        <div class="mt-4 text-sm leading-6 text-slate-300">
          <p
            v-for="item in workingHours"
            :key="item.label"
          >
            <span class="text-slate-400">{{ item.label }}:</span> {{ item.value }}
          </p>
          <p class="mt-3 text-xs leading-5 text-slate-400">
            {{ t('contact.workingHoursNote') }}
          </p>
        </div>
      </section>
    </div>

    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{{ t('footer.copyright', { year }) }}</p>
        <p>{{ t('footer.business') }}</p>
      </div>
    </div>
  </footer>
</template>
