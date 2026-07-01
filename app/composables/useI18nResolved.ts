export const useI18nResolved = () => {
  const { rt } = useI18n()

  const resolveMessage = (value: unknown): string => {
    if (typeof value === 'string') {
      return value
    }

    if (value === null || value === undefined) {
      return ''
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value)
    }

    return rt(value as Parameters<typeof rt>[0])
  }

  const resolveMessageArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
      return []
    }

    return value.map(resolveMessage).filter(Boolean)
  }

  return {
    resolveMessage,
    resolveMessageArray
  }
}
