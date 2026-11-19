type ProductCover = {
  src: string
  fullBleed?: boolean
}

const productCovers: Record<string, ProductCover | undefined> = {
  'bath-shower-trays-hydromassage': {
    src: '/images/products/bath-shower-trays-hydromassage/cover.webp',
    fullBleed: true
  },
  'shower-enclosures': {
    src: '/images/products/shower-enclosures/cover.webp',
    fullBleed: true
  },
  'sanitary-ware': {
    src: '/images/products/sanitary-ware/cover.webp',
    fullBleed: true
  },
  'bathroom-furniture': {
    src: '/images/products/bathroom-furniture/cover.webp',
    fullBleed: true
  },
  'taps-showers': { src: '/images/products/taps-showers/cover.webp' },
  'accessories': { src: '/images/products/accessories/cover.webp' }
}

export const getProductCover = (categoryId: string) => productCovers[categoryId]
