<script setup lang="ts">
defineProps<{
  isOpen: boolean | null
}>()

const { t } = useI18n()
</script>

<template>
  <span
    class="relative inline-flex size-2.5 shrink-0"
    :role="isOpen === null ? undefined : 'img'"
    :aria-hidden="isOpen === null ? true : undefined"
    :aria-label="isOpen === null ? undefined : t(isOpen ? 'contact.hoursStatus.open' : 'contact.hoursStatus.closed')"
  >
    <span
      v-if="isOpen"
      class="absolute inset-0 rounded-full bg-emerald-600/40 motion-safe:animate-ping [animation-duration:2400ms]"
      aria-hidden="true"
    />
    <span
      v-if="isOpen !== null"
      class="relative size-full rounded-full"
      :class="isOpen ? 'bg-emerald-600' : 'bg-red-500'"
      aria-hidden="true"
    />
  </span>
</template>
