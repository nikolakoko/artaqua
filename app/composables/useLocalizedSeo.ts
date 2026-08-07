type LocalizedSeoPaths = {
  mk: string
  en: string
}

const normalizeSiteUrl = (siteUrl: string) => siteUrl.replace(/\/+$/, '')

const normalizePath = (path: string) => path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`

export const useLocalizedSeo = (pageKey: 'home' | 'products' | 'contact', paths: LocalizedSeoPaths) => {
  const { locale, t } = useI18n()
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = computed(() => normalizeSiteUrl(runtimeConfig.public.siteUrl || 'https://artaqua.com.mk'))
  const currentPath = computed(() => locale.value === 'en' ? paths.en : paths.mk)
  const absoluteUrl = (path: string) => `${siteUrl.value}${normalizePath(path) === '/' ? '/' : normalizePath(path)}`

  useSeoMeta({
    title: () => t(`seo.${pageKey}.title`),
    description: () => t(`seo.${pageKey}.description`),
    ogTitle: () => t(`seo.${pageKey}.title`),
    ogDescription: () => t(`seo.${pageKey}.description`),
    ogType: 'website',
    ogUrl: () => absoluteUrl(currentPath.value),
    twitterCard: 'summary_large_image',
    twitterTitle: () => t(`seo.${pageKey}.title`),
    twitterDescription: () => t(`seo.${pageKey}.description`)
  })

  useHead({
    link: () => [
      { rel: 'canonical', href: absoluteUrl(currentPath.value) },
      { rel: 'alternate', hreflang: 'mk-MK', href: absoluteUrl(paths.mk) },
      { rel: 'alternate', hreflang: 'en-US', href: absoluteUrl(paths.en) },
      { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(paths.mk) }
    ]
  })
}
