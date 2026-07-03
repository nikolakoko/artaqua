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

const formatEmail = (email: ResolvedEmailItem) => `${email.user}@${email.domain}`
const formatTel = (value: string) => `tel:${value.replace(/[^\d+]/g, '')}`
</script>

<template>
  <div class="min-w-0 space-y-5">
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
          <h2 class="mt-2 text-2xl font-semibold text-slate-950">
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
          <h2 class="text-lg font-semibold text-slate-950">
            {{ t('contact.info.phoneTitle') }}
          </h2>
        </div>
        <div class="mt-5 min-w-0 space-y-3 text-sm leading-6 text-slate-700">
          <p
            v-for="phone in phones"
            :key="phone.label"
            class="min-w-0 wrap-break-word"
          >
            <span class="font-semibold text-slate-950">{{ phone.label }}:</span>
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
          <h2 class="text-lg font-semibold text-slate-950">
            {{ t('contact.info.emailTitle') }}
          </h2>
        </div>
        <div class="mt-5 min-w-0 space-y-3 text-sm leading-6 text-slate-700">
          <p
            v-for="email in emails"
            :key="formatEmail(email)"
            class="min-w-0 wrap-break-word"
          >
            <span class="font-semibold text-slate-950">{{ email.label }}:</span>
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
        <h2 class="text-lg font-semibold text-slate-950">
          {{ t('contact.workingHoursTitle') }}
        </h2>
      </div>
      <div class="mt-5 grid min-w-0 gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
        <p
          v-for="item in workingHours"
          :key="item.label"
          class="min-w-0 rounded-md bg-stone-50 px-4 py-3"
        >
          <span class="block font-semibold text-slate-950">{{ item.label }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </section>

    <section class="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex aspect-video min-h-64 flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_52%,#f7f5f1_100%)] px-6 text-center">
        <UIcon
          name="i-lucide-map"
          class="size-10 text-cyan-800/70"
        />
        <div class="min-w-0">
          <h2 class="text-lg font-semibold text-slate-950">
            {{ t('contact.map.title') }}
          </h2>
          <p class="mt-2 max-w-md text-sm leading-6 text-slate-600">
            {{ t('contact.map.description') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
