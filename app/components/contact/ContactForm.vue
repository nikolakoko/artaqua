<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

type FieldKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'message'

const { t } = useI18n()

const form = reactive<Record<FieldKey, string>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})
const errors = reactive<Partial<Record<FieldKey, string>>>({})
const statusVisible = ref(false)

const fields: Array<{
  key: FieldKey
  type?: string
  required?: boolean
  autocomplete?: string
}> = [
  { key: 'firstName', required: true, autocomplete: 'given-name' },
  { key: 'lastName', required: true, autocomplete: 'family-name' },
  { key: 'email', type: 'email', required: true, autocomplete: 'email' },
  { key: 'phone', type: 'tel', autocomplete: 'tel' }
]

const requiredFields: FieldKey[] = ['firstName', 'lastName', 'email', 'message']
const fieldId = (key: FieldKey) => `contact-${key}`
const errorId = (key: FieldKey) => `contact-${key}-error`
const labelKey = (key: FieldKey) => `contact.form.fields.${key}.label`
const placeholderKey = (key: FieldKey) => `contact.form.fields.${key}.placeholder`

const validateField = (key: FieldKey) => {
  const value = form[key].trim()

  if (requiredFields.includes(key) && !value) {
    errors[key] = t('contact.form.errors.required')
    return false
  }

  if (key === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors[key] = t('contact.form.errors.email')
    return false
  }

  errors[key] = undefined
  return true
}

const validateForm = () => {
  const fieldResults = [...fields.map(field => field.key), 'message' as FieldKey].map(validateField)
  return fieldResults.every(Boolean)
}

const handleSubmit = () => {
  statusVisible.value = false

  if (!validateForm()) {
    return
  }

  statusVisible.value = true
}
</script>

<template>
  <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">
        {{ t('contact.form.eyebrow') }}
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-slate-950">
        {{ t('contact.form.title') }}
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        {{ t('contact.form.description') }}
      </p>
    </div>

    <form
      class="mt-8 space-y-5"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <div class="grid gap-5 sm:grid-cols-2">
        <div
          v-for="field in fields"
          :key="field.key"
        >
          <label
            :for="fieldId(field.key)"
            class="text-sm font-semibold text-slate-800"
          >
            {{ t(labelKey(field.key)) }}
          </label>
          <input
            :id="fieldId(field.key)"
            v-model="form[field.key]"
            :type="field.type || 'text'"
            :autocomplete="field.autocomplete"
            :placeholder="t(placeholderKey(field.key))"
            :aria-invalid="Boolean(errors[field.key])"
            :aria-describedby="errors[field.key] ? errorId(field.key) : undefined"
            class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            @blur="validateField(field.key)"
            @input="statusVisible = false"
          >
          <p
            v-if="errors[field.key]"
            :id="errorId(field.key)"
            class="mt-2 text-sm text-red-700"
          >
            {{ errors[field.key] }}
          </p>
        </div>
      </div>

      <div>
        <label
          :for="fieldId('message')"
          class="text-sm font-semibold text-slate-800"
        >
          {{ t(labelKey('message')) }}
        </label>
        <textarea
          :id="fieldId('message')"
          v-model="form.message"
          rows="6"
          :placeholder="t(placeholderKey('message'))"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? errorId('message') : undefined"
          class="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          @blur="validateField('message')"
          @input="statusVisible = false"
        />
        <p
          v-if="errors.message"
          :id="errorId('message')"
          class="mt-2 text-sm text-red-700"
        >
          {{ errors.message }}
        </p>
      </div>

      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BaseButton type="submit">
          {{ t('contact.form.submit') }}
        </BaseButton>
        <p class="text-xs leading-5 text-slate-500">
          {{ t('contact.form.requiredNote') }}
        </p>
      </div>

      <p
        v-if="statusVisible"
        class="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium leading-6 text-cyan-950"
        role="status"
      >
        {{ t('contact.form.pendingBackendMessage') }}
      </p>
    </form>
  </section>
</template>
