type HoursRange = {
  opensAt: string
  closesAt: string
}

type WeeklySchedule = Record<'weekdays' | 'saturday', HoursRange>

const minuteMs = 60_000
const skopjeTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Skopje',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
})

const toMinutes = (time: string) => {
  const [hour, minute] = time.split(':')
  return Number(hour) * 60 + Number(minute)
}

export function isShowroomOpenAt(timestamp: number, schedule: WeeklySchedule) {
  const parts = skopjeTime.formatToParts(timestamp)
  const weekday = parts.find(part => part.type === 'weekday')?.value
  if (!weekday || weekday === 'Sun') {
    return false
  }

  const hour = parts.find(part => part.type === 'hour')?.value
  const minute = parts.find(part => part.type === 'minute')?.value
  const now = Number(hour) * 60 + Number(minute)
  const range = weekday === 'Sat' ? schedule.saturday : schedule.weekdays

  return now >= toMinutes(range.opensAt) && now < toMinutes(range.closesAt)
}

const useBusinessHoursTimestamp = () => useState<number | null>('business-hours-timestamp', () => null)

export function useBusinessHoursClock() {
  const timestamp = useBusinessHoursTimestamp()
  let timer: ReturnType<typeof setTimeout> | undefined

  const refresh = () => {
    clearTimeout(timer)
    const now = Date.now()
    timestamp.value = now
    timer = setTimeout(refresh, minuteMs - now % minuteMs)
  }

  // Keep prerendered HTML neutral; the layout owns one clock after hydration.
  onMounted(() => {
    refresh()
    document.addEventListener('visibilitychange', refresh)
  })

  onUnmounted(() => {
    clearTimeout(timer)
    document.removeEventListener('visibilitychange', refresh)
  })
}

export function useBusinessHours() {
  const { t } = useI18n()
  const timestamp = useBusinessHoursTimestamp()
  const hoursFor = (day: keyof WeeklySchedule) => ({
    label: t(`contact.workingHours.${day}.label`),
    opensAt: t(`contact.workingHours.${day}.opensAt`),
    closesAt: t(`contact.workingHours.${day}.closesAt`)
  })
  const schedule = computed(() => ({
    weekdays: hoursFor('weekdays'),
    saturday: hoursFor('saturday')
  }))
  const workingHours = computed(() => Object.values(schedule.value).map(({ label, opensAt, closesAt }) => ({
    label,
    value: `${opensAt}-${closesAt}`
  })))
  const isOpen = computed(() => timestamp.value === null ? null : isShowroomOpenAt(timestamp.value, schedule.value))

  return { workingHours, isOpen }
}
