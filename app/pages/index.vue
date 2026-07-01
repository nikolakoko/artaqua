<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProductPreviewSection from '~/components/sections/ProductPreviewSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description')
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProductPreviewSection />
  </div>
</template>
