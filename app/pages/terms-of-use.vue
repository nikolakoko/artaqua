<script setup lang="ts">
import LegalDocument from '~/components/legal/LegalDocument.vue'

useLocalizedSeo('termsOfUse', {
  mk: '/terms-of-use',
  en: '/en/terms-of-use'
})
</script>

<template>
  <LegalDocument page="termsOfUse" />
</template>
