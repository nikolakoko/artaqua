<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

type MessageSection = {
  title: unknown
  paragraphs: unknown
  link?: { label: unknown, href: unknown }
}

type MessageEmail = {
  user: unknown
  domain: unknown
}

const props = defineProps<{
  page: 'privacyPolicy' | 'termsOfUse' | 'returnsRefunds'
}>()

const { t, tm } = useI18n()
const { resolveMessage, resolveMessageArray } = useI18nResolved()
const pageKey = computed(() => `legal.${props.page}`)
const readMessage = tm as (key: string) => unknown

const sections = computed(() => {
  const messages = readMessage(`${pageKey.value}.sections`)
  if (!Array.isArray(messages)) {
    return []
  }

  return (messages as MessageSection[]).map(section => ({
    title: resolveMessage(section.title),
    paragraphs: resolveMessageArray(section.paragraphs),
    link: section.link && {
      label: resolveMessage(section.link.label),
      href: resolveMessage(section.link.href)
    }
  }))
})

const emails = computed(() => {
  const messages = readMessage('contact.emails')
  if (!Array.isArray(messages)) {
    return []
  }

  return (messages as MessageEmail[]).map(email =>
    `${resolveMessage(email.user)}@${resolveMessage(email.domain)}`
  )
})
</script>

<template>
  <article class="bg-stone-50 py-12 sm:py-16">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        as="h1"
        :eyebrow="t('legal.heading')"
        :title="t(`${pageKey}.title`)"
        :description="t(`${pageKey}.intro`)"
      />

      <div class="mt-8 space-y-8 border-t border-slate-200 pt-8 text-base leading-7 text-slate-700">
        <section
          v-for="section in sections"
          :key="section.title"
        >
          <h2 class="text-xl font-semibold text-slate-900">
            {{ section.title }}
          </h2>
          <div class="mt-3 space-y-3">
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
            >
              {{ paragraph }}
            </p>
            <p v-if="section.link">
              <a
                :href="section.link.href"
                class="font-medium text-cyan-800 underline transition hover:text-cyan-950 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {{ section.link.label }}
              </a>
            </p>
          </div>
        </section>

        <section class="border-t border-slate-200 pt-8">
          <h2 class="text-xl font-semibold text-slate-900">
            {{ t('legal.contactTitle') }}
          </h2>
          <p class="mt-3">
            {{ t(`${pageKey}.contactNote`) }}
          </p>
          <p class="mt-3">
            {{ t('contact.address') }}
          </p>
          <ul class="mt-2 space-y-1">
            <li
              v-for="email in emails"
              :key="email"
            >
              <a
                :href="`mailto:${email}`"
                class="wrap-break-word font-medium text-cyan-800 underline transition hover:text-cyan-950 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {{ email }}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>
