<script setup lang="ts">
const props = withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  tone?: 'default' | 'inverse'
}>(), {
  align: 'left',
  as: 'h2',
  tone: 'default'
})

const alignmentClass = computed(() => props.align === 'center' ? 'mx-auto text-center' : '')
const eyebrowClass = computed(() => props.tone === 'inverse' ? 'text-cyan-200' : 'text-cyan-700')
const titleClass = computed(() => props.tone === 'inverse' ? 'text-white' : 'text-slate-950')
const descriptionClass = computed(() => props.tone === 'inverse' ? 'text-slate-300' : 'text-slate-600')
</script>

<template>
  <div
    class="max-w-3xl"
    :class="alignmentClass"
  >
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-semibold uppercase tracking-[0.16em]"
      :class="eyebrowClass"
    >
      {{ eyebrow }}
    </p>
    <h1
      v-if="as === 'h1'"
      class="text-3xl font-semibold tracking-normal sm:text-4xl"
      :class="titleClass"
    >
      {{ title }}
    </h1>
    <h2
      v-else
      class="text-2xl font-semibold tracking-normal sm:text-3xl"
      :class="titleClass"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 text-base leading-7"
      :class="descriptionClass"
    >
      {{ description }}
    </p>
  </div>
</template>
