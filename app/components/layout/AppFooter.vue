<script setup lang="ts">
type ContactItem = {
  label: unknown
  value: unknown
}

type EmailItem = {
  label: unknown
  user: unknown
  domain: unknown
}

type ResolvedEmailItem = {
  user: string
  domain: string
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()
const localePath = useLocalePath()

const year = new Date().getFullYear()
const phones = computed(() => (tm('contact.phones') as ContactItem[]).map(phone => ({
  label: resolveMessage(phone.label),
  value: resolveMessage(phone.value)
})))
const emails = computed(() => (tm('contact.emails') as EmailItem[]).map(email => ({
  label: resolveMessage(email.label),
  user: resolveMessage(email.user),
  domain: resolveMessage(email.domain)
})))
const workingHours = computed(() => (tm('contact.workingHours') as ContactItem[]).map(item => ({
  label: resolveMessage(item.label),
  value: resolveMessage(item.value)
})))
const quickLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.products'), to: localePath('/products') },
  { label: t('nav.contact'), to: localePath('/contact') }
])

const formatEmail = (email: ResolvedEmailItem) => `${email.user}@${email.domain}`
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-950 text-slate-100">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1.2fr] lg:px-8">
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
      </section>

      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-cyan-200">
          {{ t('footer.contactTitle') }}
        </h2>
        <div class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <p>{{ t('contact.address') }}</p>
          <p>{{ t('contact.locationNote') }}</p>
          <div>
            <p
              v-for="phone in phones"
              :key="phone.label"
            >
              <span class="text-slate-400">{{ phone.label }}:</span> {{ phone.value }}
            </p>
          </div>
          <div>
            <p
              v-for="email in emails"
              :key="formatEmail(email)"
            >
              <span class="text-slate-400">{{ email.label }}:</span>
              <a
                :href="`mailto:${formatEmail(email)}`"
                class="text-cyan-100 transition hover:text-white"
              >
                {{ formatEmail(email) }}
              </a>
            </p>
          </div>
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
