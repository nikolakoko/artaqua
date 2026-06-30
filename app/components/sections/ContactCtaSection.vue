<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
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
const localePath = useLocalePath()

const phones = computed(() => tm('contact.phones') as ContactItem[])
const emails = computed(() => tm('contact.emails') as EmailItem[])
const workingHours = computed(() => tm('contact.workingHours') as ContactItem[])
const formatEmail = (email: EmailItem) => `${email.user}@${email.domain}`
</script>

<template>
  <section class="bg-slate-950 py-16 text-white sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionTitle
            :eyebrow="t('home.contactCta.eyebrow')"
            :title="t('home.contactCta.title')"
            :description="t('home.contactCta.description')"
            tone="inverse"
          />
          <BaseButton
            class="mt-8"
            :to="localePath('/contact')"
            variant="secondary"
          >
            {{ t('home.contactCta.action') }}
          </BaseButton>
        </div>

        <div class="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
          <div class="border-t border-white/10 pt-4">
            <p class="font-semibold text-cyan-100">
              {{ t('contact.address') }}
            </p>
            <p class="mt-2 leading-6 text-slate-300">
              {{ t('contact.locationNote') }}
            </p>
          </div>

          <div class="border-t border-white/10 pt-4">
            <p
              v-for="phone in phones"
              :key="phone.label"
              class="leading-6"
            >
              <span class="text-slate-400">{{ phone.label }}:</span> {{ phone.value }}
            </p>
          </div>

          <div class="border-t border-white/10 pt-4">
            <p
              v-for="email in emails"
              :key="formatEmail(email)"
              class="leading-6"
            >
              <span class="text-slate-400">{{ email.label }}:</span>
              <a
                :href="`mailto:${formatEmail(email)}`"
                class="text-cyan-100 hover:text-white"
              >
                {{ formatEmail(email) }}
              </a>
            </p>
          </div>

          <div class="border-t border-white/10 pt-4">
            <p class="font-semibold text-cyan-100">
              {{ t('contact.workingHoursTitle') }}
            </p>
            <p
              v-for="item in workingHours"
              :key="item.label"
              class="mt-1 leading-6"
            >
              <span class="text-slate-400">{{ item.label }}:</span> {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
