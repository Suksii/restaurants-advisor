export type RegisterData = {
  username: string
  email: string
  password: string
}
export type RestaurantPayload = {
  name: string
  description: string
  location: string
  category: string
  images: { secure_url: string; public_id: string }[]
}
export type Restaurant = {
  _id: number
  name: string
  description: string
  location: string
  category: string
  rating: number
  images: { secure_url: string; public_id: string }[]
  user: {
    username: string
    email: string
    role: string
  }
}
