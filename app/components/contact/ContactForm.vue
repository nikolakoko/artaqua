<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

type FieldKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'message'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const { locale, t } = useI18n()

const form = reactive<Record<FieldKey, string>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})
const errors = reactive<Partial<Record<FieldKey, string>>>({})
const honeypot = ref('')
const submitState = ref<SubmitState>('idle')

const fields: Array<{
  key: FieldKey
  type?: string
  required?: boolean
  autocomplete?: string
  maxLength: number
}> = [
  { key: 'firstName', required: true, autocomplete: 'given-name', maxLength: 100 },
  { key: 'lastName', required: true, autocomplete: 'family-name', maxLength: 100 },
  { key: 'email', type: 'email', required: true, autocomplete: 'email', maxLength: 160 },
  { key: 'phone', type: 'tel', autocomplete: 'tel', maxLength: 60 }
]

const requiredFields: FieldKey[] = ['firstName', 'lastName', 'email', 'message']
const maxLengths: Record<FieldKey, number> = {
  firstName: 100,
  lastName: 100,
  email: 160,
  phone: 60,
  message: 3000
}
const fieldId = (key: FieldKey) => `contact-${key}`
const errorId = (key: FieldKey) => `contact-${key}-error`
const labelKey = (key: FieldKey) => `contact.form.fields.${key}.label`
const placeholderKey = (key: FieldKey) => `contact.form.fields.${key}.placeholder`
const isSubmitting = computed(() => submitState.value === 'loading')

const validateField = (key: FieldKey) => {
  const value = form[key].trim()

  if (requiredFields.includes(key) && !value) {
    errors[key] = t('contact.form.errors.required')
    return false
  }

  if (value.length > maxLengths[key]) {
    errors[key] = t('contact.form.errors.maxLength', { max: maxLengths[key] })
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

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  honeypot.value = ''
}

const resetStateOnInput = () => {
  if (submitState.value !== 'loading') {
    submitState.value = 'idle'
  }
}

const handleSubmit = async () => {
  submitState.value = 'idle'

  if (!validateForm()) {
    return
  }

  submitState.value = 'loading'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form,
        website: honeypot.value,
        locale: locale.value
      }
    })

    resetForm()
    submitState.value = 'success'
  } catch {
    submitState.value = 'error'
  }
}
</script>

<template>
  <section class="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">
        {{ t('contact.form.eyebrow') }}
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-slate-900">
        {{ t('contact.form.title') }}
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        {{ t('contact.form.description') }}
      </p>
    </div>

    <form
      class="mt-8 min-w-0 space-y-5"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <div
        class="absolute -left-2499.75 h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label for="contact-website">
          {{ t('contact.form.fields.website.label') }}
        </label>
        <input
          id="contact-website"
          v-model="honeypot"
          type="text"
          tabindex="-1"
          autocomplete="off"
          @input="resetStateOnInput"
        >
      </div>

      <div class="grid min-w-0 gap-5 sm:grid-cols-2">
        <div
          v-for="field in fields"
          :key="field.key"
          class="min-w-0"
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
            :maxlength="field.maxLength"
            :placeholder="t(placeholderKey(field.key))"
            :aria-invalid="Boolean(errors[field.key])"
            :aria-describedby="errors[field.key] ? errorId(field.key) : undefined"
            class="mt-2 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            @blur="validateField(field.key)"
            @input="resetStateOnInput"
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

      <div class="min-w-0">
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
          :maxlength="maxLengths.message"
          :placeholder="t(placeholderKey('message'))"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? errorId('message') : undefined"
          class="mt-2 w-full min-w-0 resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          @blur="validateField('message')"
          @input="resetStateOnInput"
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
        <BaseButton
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}
        </BaseButton>
        <p class="text-xs leading-5 text-slate-500">
          {{ t('contact.form.requiredNote') }}
        </p>
      </div>

      <p
        v-if="submitState === 'success'"
        class="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium leading-6 text-cyan-950"
        role="status"
        aria-live="polite"
      >
        {{ t('contact.form.successMessage') }}
      </p>
      <p
        v-else-if="submitState === 'error'"
        class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-800"
        role="alert"
        aria-live="assertive"
      >
        {{ t('contact.form.errorMessage') }}
      </p>
    </form>
  </section>
</template>
