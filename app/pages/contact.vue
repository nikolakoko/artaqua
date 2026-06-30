<script setup lang="ts">
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
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

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
  <main>
    <nav aria-label="Main navigation">
      <NuxtLink :to="localePath('/')">
        {{ t('nav.home') }}
      </NuxtLink>
      |
      <NuxtLink :to="localePath('/products')">
        {{ t('nav.products') }}
      </NuxtLink>
      |
      <NuxtLink :to="localePath('/contact')">
        {{ t('nav.contact') }}
      </NuxtLink>
      |
      <NuxtLink :to="switchLocalePath('mk')">
        MK
      </NuxtLink>
      |
      <NuxtLink :to="switchLocalePath('en')">
        EN
      </NuxtLink>
    </nav>

    <h1>{{ t('contact.title') }}</h1>
    <p>{{ t('contact.intro') }}</p>

    <section>
      <h2>{{ t('contact.showroom') }}</h2>
      <p>{{ t('contact.company') }}</p>
      <p>{{ t('contact.address') }}</p>
      <p>{{ t('contact.locationNote') }}</p>
    </section>

    <section>
      <h2>{{ t('nav.contact') }}</h2>
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
        <a :href="`mailto:${formatEmail(email)}`">{{ formatEmail(email) }}</a>
      </p>
    </section>

    <section>
      <h2>{{ t('contact.workingHoursTitle') }}</h2>
      <p
        v-for="item in workingHours"
        :key="item.label"
      >
        <strong>{{ item.label }}:</strong> {{ item.value }}
      </p>
    </section>

    <section>
      <h2>{{ t('contact.form.title') }}</h2>
      <p>{{ t('contact.form.description') }}</p>
      <ul>
        <li>{{ t('contact.form.firstName') }}</li>
        <li>{{ t('contact.form.lastName') }}</li>
        <li>{{ t('contact.form.email') }}</li>
        <li>{{ t('contact.form.message') }}</li>
        <li>{{ t('contact.form.submit') }} - {{ t('common.labels.notImplemented') }}</li>
      </ul>
    </section>
  </main>
</template>
