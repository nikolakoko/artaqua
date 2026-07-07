import nodemailer from 'nodemailer'

type MailConfig = {
  smtpHost?: string
  smtpPort?: string | number
  smtpSecure?: string | boolean
  smtpUser?: string
  smtpPass?: string
  mailFrom?: string
  contactTo?: string
}

export type ContactMailPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  locale: string
  submittedAt: string
}

export class MailConfigurationError extends Error {
  constructor(message = 'Contact email is not configured') {
    super(message)
    this.name = 'MailConfigurationError'
  }
}

const requiredConfigKeys: Array<keyof MailConfig> = [
  'smtpHost',
  'smtpPort',
  'smtpUser',
  'smtpPass',
  'mailFrom',
  'contactTo'
]

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const parseBoolean = (value: string | boolean | undefined) => value === true || value === 'true'

const assertMailConfig = (config: MailConfig) => {
  const missingKeys = requiredConfigKeys.filter(key => !String(config[key] ?? '').trim())
  const hasPlaceholderValue = [
    config.smtpUser,
    config.smtpPass,
    config.mailFrom
  ].some(value => /your-smtp-user|your-app-password/i.test(String(value ?? '')))

  if (missingKeys.length || hasPlaceholderValue) {
    throw new MailConfigurationError()
  }

  const port = Number(config.smtpPort)

  if (!Number.isInteger(port) || port <= 0) {
    throw new MailConfigurationError()
  }

  return {
    host: String(config.smtpHost).trim(),
    port,
    secure: parseBoolean(config.smtpSecure),
    user: String(config.smtpUser).trim(),
    pass: String(config.smtpPass),
    from: String(config.mailFrom).trim(),
    to: String(config.contactTo).trim()
  }
}

const buildTextBody = (payload: ContactMailPayload) => [
  'New message from ArtAqua website',
  '',
  `First name: ${payload.firstName}`,
  `Last name: ${payload.lastName}`,
  `Email: ${payload.email}`,
  `Phone: ${payload.phone || 'Not provided'}`,
  `Locale: ${payload.locale}`,
  `Submitted at: ${payload.submittedAt}`,
  '',
  'Message:',
  payload.message
].join('\n')

const buildHtmlBody = (payload: ContactMailPayload) => {
  const rows: Array<[string, string]> = [
    ['First name', payload.firstName],
    ['Last name', payload.lastName],
    ['Email', payload.email],
    ['Phone', payload.phone || 'Not provided'],
    ['Locale', payload.locale],
    ['Submitted at', payload.submittedAt]
  ]

  const detailRows = rows.map(([label, value]) => `
    <tr>
      <th style="padding: 6px 12px 6px 0; text-align: left">${escapeHtml(label)}</th>
      <td style="padding: 6px 0;">${escapeHtml(value)}</td>
    </tr>
  `).join('')

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">New message from ArtAqua website</h1>
      <table style="border-collapse: collapse; margin-bottom: 20px;">
        <tbody>${detailRows}</tbody>
      </table>
      <h2 style="font-size: 16px; margin: 0 0 8px;">Message</h2>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(payload.message)}</p>
    </div>
  `
}

export const sendContactMail = async (config: MailConfig, payload: ContactMailPayload) => {
  const mailConfig = assertMailConfig(config)
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    }
  })

  await transporter.sendMail({
    from: mailConfig.from,
    to: mailConfig.to,
    replyTo: payload.email,
    subject: 'New message from ArtAqua website',
    text: buildTextBody(payload),
    html: buildHtmlBody(payload)
  })
}
