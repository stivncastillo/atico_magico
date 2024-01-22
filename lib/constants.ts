export const BADGE_PRODUCTS: {
  [key: string]: {
    text: string;
    color:  "default" | "destructive" | "outline" | "secondary" | "info" | "success" | "error" | "warning" | null | undefined;
  }

} = {
  new: {
    text: 'Nuevo',
    color: 'default',
  },
  featured: {
    text: 'Destacado',
    color: 'secondary',
  }
}
export const TAGS_COOKIES = {
  categories: 'categories',
  products: 'products',
  cart: 'cart'
};