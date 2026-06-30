<script setup lang="ts">
type ProductCategory = {
  id: string
  title: string
  shortDescription: string
  referenceImage?: string
}

const { t, tm } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const categories = computed(() => tm('products.categories') as ProductCategory[])

useSeoMeta({
  title: () => t('seo.products.title'),
  description: () => t('seo.products.description')
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

    <h1>{{ t('products.title') }}</h1>
    <p>{{ t('products.intro') }}</p>

    <section
      v-for="category in categories"
      :key="category.id"
    >
      <h2>{{ category.title }}</h2>
      <p>{{ category.shortDescription }}</p>
      <p v-if="category.referenceImage">
        {{ t('common.labels.referenceImage') }}: {{ category.referenceImage }}
      </p>
    </section>
  </main>
</template>
