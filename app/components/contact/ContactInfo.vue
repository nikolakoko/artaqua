<script setup lang="ts">
import { socialLinks } from '~/data/socialLinks'

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

function resolveItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : []
}

const phones = computed(() => resolveItems<ContactItem>(tm('contact.phones')).map(phone => ({
  label: resolveMessage(phone.label),
  value: resolveMessage(phone.value)
})))
const emails = computed(() => resolveItems<EmailItem>(tm('contact.emails')).map(email => ({
  label: resolveMessage(email.label),
  user: resolveMessage(email.user),
  domain: resolveMessage(email.domain)
})))
const workingHours = computed(() => resolveItems<ContactItem>(tm('contact.workingHours')).map(item => ({
  label: resolveMessage(item.label),
  value: resolveMessage(item.value)
})))

const formatEmail = (email: ResolvedEmailItem) => `${email.user}@${email.domain}`
const formatTel = (value: string) => `tel:${value.replace(/[^\d+]/g, '')}`
</script>

<template>
  <div
    class="min-w-0 space-y-5"
    data-contact-info
  >
    <section class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="flex min-w-0 items-start gap-4">
        <div class="flex size-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-800">
          <UIcon
            name="i-lucide-map-pin"
            class="size-5"
          />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">
            {{ t('contact.info.showroomTitle') }}
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900">
            {{ t('contact.showroom') }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            {{ t('contact.company') }}
          </p>
          <div class="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <p class="wrap-break-word">
              {{ t('contact.address') }}
            </p>
            <p class="wrap-break-word">
              {{ t('contact.locationNote') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="grid min-w-0 gap-5 md:grid-cols-2">
      <div class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-phone"
            class="size-5 text-cyan-800"
          />
          <h2 class="text-lg font-semibold text-slate-900">
            {{ t('contact.info.phoneTitle') }}
          </h2>
        </div>
        <div class="mt-5 min-w-0 space-y-3 text-sm leading-6 text-slate-700">
          <p
            v-for="phone in phones"
            :key="phone.label"
            class="min-w-0 wrap-break-word"
          >
            <span class="font-semibold text-slate-900">{{ phone.label }}:</span>
            <a
              :href="formatTel(phone.value)"
              class="ml-1 wrap-break-word text-cyan-800 transition hover:text-cyan-950"
            >
              {{ phone.value }}
            </a>
          </p>
        </div>
      </div>

      <div class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-mail"
            class="size-5 text-cyan-800"
          />
          <h2 class="text-lg font-semibold text-slate-900">
            {{ t('contact.info.emailTitle') }}
          </h2>
        </div>
        <div class="mt-5 min-w-0 space-y-3 text-sm leading-6 text-slate-700">
          <p
            v-for="email in emails"
            :key="formatEmail(email)"
            class="min-w-0 wrap-break-word"
          >
            <span class="font-semibold text-slate-900">{{ email.label }}:</span>
            <br>
            <a
              :href="`mailto:${formatEmail(email)}`"
              class="ml-1 break-all text-cyan-800 transition hover:text-cyan-950"
            >
              {{ formatEmail(email) }}
            </a>
          </p>
        </div>
      </div>
    </section>

    <section class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-clock"
          class="size-5 text-cyan-800"
        />
        <h2 class="text-lg font-semibold text-slate-900">
          {{ t('contact.workingHoursTitle') }}
        </h2>
      </div>
      <div class="mt-5 grid min-w-0 gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
        <p
          v-for="item in workingHours"
          :key="item.label"
          class="min-w-0 rounded-md bg-stone-50 px-4 py-3"
        >
          <span class="block font-semibold text-slate-900">{{ item.label }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </section>

    <section class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-share-2"
          class="size-5 text-cyan-800"
        />
        <h2 class="text-lg font-semibold text-slate-900">
          {{ t('social.follow') }}
        </h2>
      </div>
      <div class="mt-5 flex flex-wrap gap-3">
        <a
          v-for="link in socialLinks"
          :key="link.id"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
          :aria-label="t(`social.${link.id}Aria`)"
        >
          <UIcon
            :name="link.icon"
            class="size-4"
          />
          {{ t(`social.${link.id}`) }}
        </a>
      </div>
    </section>
  </div>
</template>
