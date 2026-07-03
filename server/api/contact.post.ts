import { MailConfigurationError, sendContactMail } from '../utils/mail'

type ContactBody = {
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  locale?: unknown
  website?: unknown
}

type FieldName = 'firstName' | 'lastName' | 'email' | 'phone' | 'message'

const maxLengths: Record<FieldName, number> = {
  firstName: 100,
  lastName: 100,
  email: 160,
  phone: 60,
  message: 3000
}

const requiredFields: FieldName[] = ['firstName', 'lastName', 'email', 'message']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const readString = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const validateBody = (body: ContactBody) => {
  const values = {
    firstName: readString(body.firstName),
    lastName: readString(body.lastName),
    email: readString(body.email),
    phone: readString(body.phone),
    message: readString(body.message)
  }

  const hasMissingRequired = requiredFields.some(field => !values[field])
  const hasTooLongField = Object.entries(maxLengths).some(([field, maxLength]) => values[field as FieldName].length > maxLength)

  if (hasMissingRequired || hasTooLongField || !emailPattern.test(values.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contact form submission'
    })
  }

  return values
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)
  const honeypot = readString(body.website)

  if (honeypot) {
    return { ok: true }
  }

  const submission = validateBody(body)
  const locale = readString(body.locale).slice(0, 12) || 'unknown'
  const runtimeConfig = useRuntimeConfig()

  try {
    await sendContactMail(runtimeConfig, {
      ...submission,
      locale,
      submittedAt: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof MailConfigurationError) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Contact email is not configured'
      })
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to send contact message'
    })
  }

  return { ok: true }
})
