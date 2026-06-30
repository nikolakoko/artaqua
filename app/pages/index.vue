<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const aboutBody = computed(() => tm('home.about.body') as string[])
const servicesBody = computed(() => tm('home.services.body') as string[])

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description')
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

    <section>
      <p>{{ t('home.hero.eyebrow') }}</p>
      <h1>{{ t('home.hero.title') }}</h1>
      <p>{{ t('home.hero.description') }}</p>
      <NuxtLink :to="localePath('/products')">
        {{ t('home.hero.primaryAction') }}
      </NuxtLink>
      |
      <NuxtLink :to="localePath('/contact')">
        {{ t('home.hero.secondaryAction') }}
      </NuxtLink>
    </section>

    <section>
      <h2>{{ t('home.about.title') }}</h2>
      <p
        v-for="paragraph in aboutBody"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
      <p>{{ t('home.about.brands') }}</p>
    </section>

    <section>
      <h2>{{ t('home.services.title') }}</h2>
      <p
        v-for="paragraph in servicesBody"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
    </section>

    <section>
      <h2>{{ t('home.productPreview.title') }}</h2>
      <p>{{ t('home.productPreview.description') }}</p>
      <NuxtLink :to="localePath('/products')">
        {{ t('home.productPreview.action') }}
      </NuxtLink>
    </section>

    <section>
      <h2>{{ t('home.contactCta.title') }}</h2>
      <p>{{ t('home.contactCta.description') }}</p>
      <NuxtLink :to="localePath('/contact')">
        {{ t('home.contactCta.action') }}
      </NuxtLink>
    </section>
  </main>
</template>
