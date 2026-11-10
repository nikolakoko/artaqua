<script setup lang="ts">
import LegalDocument from '~/components/legal/LegalDocument.vue'

useLocalizedSeo('privacyPolicy', {
  mk: '/privacy-policy',
  en: '/en/privacy-policy'
})
</script>

<template>
  <LegalDocument page="privacyPolicy" />
</template>
