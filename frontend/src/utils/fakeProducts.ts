import { faker } from '@faker-js/faker'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export function generateFakeProduct(): Product {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    category: faker.commerce.department(),
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    rating: {
      rate: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      count: faker.number.int({ min: 1, max: 1000 }),
    },
  }
}

export function generateFakeProducts(count: number = 20): Product[] {
  return Array.from({ length: count }, generateFakeProduct)
}
