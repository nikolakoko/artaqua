<script setup lang="ts">
const props = withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}>(), {
  variant: 'primary',
  size: 'md'
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700'
  const size = props.size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-3 text-sm'
  const variants = {
    primary: 'bg-cyan-950 text-white shadow-sm shadow-cyan-950/15 hover:bg-cyan-900',
    secondary: 'border border-cyan-800/20 bg-white text-cyan-950 hover:border-cyan-700 hover:bg-cyan-50',
    ghost: 'text-cyan-950 hover:bg-cyan-50'
  }

  return [base, size, variants[props.variant]].join(' ')
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    :class="classes"
  >
    <slot />
  </button>
</template>
