<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ContactItem = {
  label: string
  value: string
}

type EmailItem = {
  label: string
  user: string
  domain: string
}

const { t, tm } = useI18n()

const phones = computed(() => tm('contact.phones') as ContactItem[])
const emails = computed(() => tm('contact.emails') as EmailItem[])
const workingHours = computed(() => tm('contact.workingHours') as ContactItem[])

const formatEmail = (email: EmailItem) => `${email.user}@${email.domain}`

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description')
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <SectionTitle
      as="h1"
      :title="t('contact.title')"
      :description="t('contact.intro')"
    />

    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
        <h2 class="text-xl font-semibold text-slate-950">
          {{ t('contact.showroom') }}
        </h2>
        <div class="mt-4 space-y-3 leading-7 text-slate-700">
          <p>{{ t('contact.company') }}</p>
          <p>{{ t('contact.address') }}</p>
          <p>{{ t('contact.locationNote') }}</p>
        </div>
      </section>

      <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
        <h2 class="text-xl font-semibold text-slate-950">
          {{ t('nav.contact') }}
        </h2>
        <div class="mt-4 space-y-3 leading-7 text-slate-700">
          <p
            v-for="phone in phones"
            :key="phone.label"
          >
            <strong>{{ phone.label }}:</strong> {{ phone.value }}
          </p>
          <p
            v-for="email in emails"
            :key="formatEmail(email)"
          >
            <strong>{{ email.label }}:</strong>
            <a
              :href="`mailto:${formatEmail(email)}`"
              class="text-cyan-800 hover:text-cyan-950"
            >
              {{ formatEmail(email) }}
            </a>
          </p>
        </div>
      </section>

      <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
        <h2 class="text-xl font-semibold text-slate-950">
          {{ t('contact.workingHoursTitle') }}
        </h2>
        <div class="mt-4 space-y-3 leading-7 text-slate-700">
          <p
            v-for="item in workingHours"
            :key="item.label"
          >
            <strong>{{ item.label }}:</strong> {{ item.value }}
          </p>
        </div>
      </section>
    </div>

    <section class="mt-6 rounded-lg border border-dashed border-cyan-300 bg-cyan-50/60 p-6">
      <h2 class="text-xl font-semibold text-slate-950">
        {{ t('contact.form.title') }}
      </h2>
      <p class="mt-3 text-slate-700">
        {{ t('contact.form.description') }}
      </p>
      <p class="mt-4 text-sm font-medium text-cyan-900">
        {{ t('common.labels.notImplemented') }}
      </p>
    </section>
  </div>
</template>
