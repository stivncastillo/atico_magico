export const BADGE_PRODUCTS: {
  [key: string]: {
    text: string;
    color:  "default" | "destructive" | "outline" | "secondary" | "info" | "success" | "error" | "warning" | "muted" | null | undefined;
  }

} = {
  new: {
    text: 'Nuevo',
    color: 'info',
  },
  featured: {
    text: 'Destacado',
    color: 'secondary',
  },
  outOfStock: {
    text: 'Sin stock',
    color: 'muted',
  },
}
export const TAGS_COOKIES = {
  categories: 'categories',
  products: 'products',
  cart: 'cart'
};

export const PRODUCT_IMAGES_PATH = '/products/';