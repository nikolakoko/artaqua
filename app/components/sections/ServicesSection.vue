<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

type ServiceItem = {
  title: unknown
  description: unknown
}

const { t, tm } = useI18n()
const { resolveMessage } = useI18nResolved()

const services = computed(() => (tm('home.services.items') as ServiceItem[]).map(service => ({
  title: resolveMessage(service.title),
  description: resolveMessage(service.description)
})))
</script>

<template>
  <section class="border-y border-slate-200 bg-white py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :eyebrow="t('home.services.eyebrow')"
        :title="t('home.services.title')"
        :description="t('home.services.description')"
        align="center"
      />

      <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="rounded-lg border border-slate-200 bg-stone-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-md"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-950 text-sm font-semibold text-white">
            {{ index + 1 }}
          </div>
          <h3 class="mt-5 text-lg font-semibold text-slate-950">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
