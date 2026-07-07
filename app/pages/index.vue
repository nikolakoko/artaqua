<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProductPreviewSection from '~/components/sections/ProductPreviewSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'

useLocalizedSeo('home', {
  mk: '/',
  en: '/en'
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
