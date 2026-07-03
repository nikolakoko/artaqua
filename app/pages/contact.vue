<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue'
import ContactInfo from '~/components/contact/ContactInfo.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const { t } = useI18n()
useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description')
})
</script>

<template>
  <div>
    <section class="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5f1_100%)] py-14 sm:py-18">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          as="h1"
          :eyebrow="t('contact.eyebrow')"
          :title="t('contact.title')"
          :description="t('contact.intro')"
        />
      </div>
    </section>

    <section class="bg-stone-50 py-14 sm:py-18">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:px-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  </div>
</template>
