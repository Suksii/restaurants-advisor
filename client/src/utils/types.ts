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
