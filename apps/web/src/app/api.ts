export const API = {
  productImage: {
    get: process.env.NEXT_PUBLIC_DOMAIN + "/products/",
    byAlias: process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/",
  },
  product: {
    find: process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
  },
  review: {
    createDemo: process.env.NEXT_PUBLIC_DOMAIN + "/api/review/create-demo",
  },
};
