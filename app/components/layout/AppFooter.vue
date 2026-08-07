<script setup lang="ts">
import { socialLinks } from '~/data/socialLinks'

type ContactItem = {
  label: unknown
  value: unknown
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()
const localePath = useLocalePath()

const year = new Date().getFullYear()

function resolveItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : []
}

const workingHours = computed(() => resolveItems<ContactItem>(tm('contact.workingHours')).map(item => ({
  label: resolveMessage(item.label),
  value: resolveMessage(item.value)
})))

const quickLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.products'), to: localePath('/products') },
  { label: t('nav.contact'), to: localePath('/contact') }
])
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

        <h2 class="mt-8 text-sm font-semibold uppercase tracking-wide text-cyan-200">
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
          {{ t('footer.location') }}
        </h2>
        <div class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <p>{{ t('contact.address') }}</p>
        </div>
        <br>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('footer.workingTime') }}
        </h2>
        <div class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <div>
            <p
              v-for="item in workingHours"
              :key="item.label"
            >
              <span class="text-slate-400">{{ item.label }}:</span> {{ item.value }}
            </p>
          </div>
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
