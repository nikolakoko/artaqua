export const productGalleries: Record<string, string[]> = {
  'bath-shower-trays-hydromassage': [
    '/images/products/bath-shower-trays-hydromassage/gallery-01.png',
    '/images/products/bath-shower-trays-hydromassage/gallery-02.png',
    '/images/products/bath-shower-trays-hydromassage/gallery-03.png',
    '/images/products/bath-shower-trays-hydromassage/gallery-04.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-05.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-06.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-07.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-08.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-09.jpg',
    '/images/products/bath-shower-trays-hydromassage/gallery-10.jpg'
  ],
  'shower-enclosures': [
    '/images/products/shower-enclosures/gallery-01.png',
    '/images/products/shower-enclosures/gallery-02.png',
    '/images/products/shower-enclosures/gallery-03.png',
    '/images/products/shower-enclosures/gallery-04.png',
    '/images/products/shower-enclosures/gallery-05.png',
    '/images/products/shower-enclosures/gallery-06.jpg',
    '/images/products/shower-enclosures/gallery-07.jpg',
    '/images/products/shower-enclosures/gallery-08.jpg',
    '/images/products/shower-enclosures/gallery-09.jpg',
    '/images/products/shower-enclosures/gallery-10.jpg'
  ],
  'sanitary-ware': [
    '/images/products/sanitary-ware/gallery-01.png',
    '/images/products/sanitary-ware/gallery-02.jpg',
    '/images/products/sanitary-ware/gallery-03.jpg',
    '/images/products/sanitary-ware/gallery-04.jpg',
    '/images/products/sanitary-ware/gallery-05.jpg',
    '/images/products/sanitary-ware/gallery-06.jpg',
    '/images/products/sanitary-ware/gallery-07.jpg',
    '/images/products/sanitary-ware/gallery-08.jpg',
    '/images/products/sanitary-ware/gallery-09.jpg',
    '/images/products/sanitary-ware/gallery-10.jpg'
  ],
  'bathroom-furniture': [
    '/images/products/bathroom-furniture/gallery-01.jpg',
    '/images/products/bathroom-furniture/gallery-02.jpg',
    '/images/products/bathroom-furniture/gallery-03.jpg',
    '/images/products/bathroom-furniture/gallery-04.jpg',
    '/images/products/bathroom-furniture/gallery-05.jpg',
    '/images/products/bathroom-furniture/gallery-06.jpg',
    '/images/products/bathroom-furniture/gallery-07.jpg',
    '/images/products/bathroom-furniture/gallery-08.jpg',
    '/images/products/bathroom-furniture/gallery-09.jpg',
    '/images/products/bathroom-furniture/gallery-10.jpg'
  ],
  'taps-showers': [
    '/images/products/taps-showers/gallery-01.png',
    '/images/products/taps-showers/gallery-02.png',
    '/images/products/taps-showers/gallery-03.png',
    '/images/products/taps-showers/gallery-04.png',
    '/images/products/taps-showers/gallery-05.png',
    '/images/products/taps-showers/gallery-06.png',
    '/images/products/taps-showers/gallery-07.png',
    '/images/products/taps-showers/gallery-08.png',
    '/images/products/taps-showers/gallery-09.png',
    '/images/products/taps-showers/gallery-10.png'
  ],
  'accessories': [
    '/images/products/accessories/gallery-01.png',
    '/images/products/accessories/gallery-02.png',
    '/images/products/accessories/gallery-03.png',
    '/images/products/accessories/gallery-04.png',
    '/images/products/accessories/gallery-05.png',
    '/images/products/accessories/gallery-06.png',
    '/images/products/accessories/gallery-07.png',
    '/images/products/accessories/gallery-08.png',
    '/images/products/accessories/gallery-09.png',
    '/images/products/accessories/gallery-10.png'
  ]
}

export const getProductGalleryImages = (categoryId: string) => productGalleries[categoryId] || []
