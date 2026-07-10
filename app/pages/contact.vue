<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue'
import ContactInfo from '~/components/contact/ContactInfo.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const { t } = useI18n()
const mapEmbedSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0217782718623!2d21.386528376488673!3d41.99980815778471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415f7101bb829%3A0xa33bd02efa618309!2sArt%20Aqua-%20Postmoderna!5e0!3m2!1sen!2smk!4v1783453460547!5m2!1sen!2smk'

useLocalizedSeo('contact', {
  mk: '/contact',
  en: '/en/contact'
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
      <div class="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div class="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
          <ContactInfo />
          <ContactForm />
        </div>

        <section class="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="p-5 sm:p-6">
            <h2 class="text-lg font-semibold text-slate-900">
              {{ t('contact.map.title') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              {{ t('contact.map.description') }}
            </p>
          </div>
          <div class="h-90 min-h-72 w-full overflow-hidden border-t border-slate-200 sm:aspect-video">
            <iframe
              :src="mapEmbedSrc"
              class="h-full w-full border-0"
              :title="t('contact.map.iframeTitle')"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
