export const getAllProductsQuery = `*[_type == "product"]{
  _id,
  title,
  slug,
  price,
  "imageUrl": images[0].asset->url,
  category->{
    title,
    slug
  }
}`
export const searchProductsQuery = `*[_type == "product" && (title match $searchTerm + "*" || pt::text(description) match $searchTerm + "*")]{
  _id,
  title, // "name" yerine "title" kullanıldı
  "slug": slug.current,
  "imageUrl": images[0].asset->url, // "mainImage" yerine "images[0]" kullanıldı
  price
}`;

export const getAllCategoriesWithIconsQuery = `*[_type == "category"]{
   _id,
  title,
  slug,
  "iconUrl": icon.asset->url
}`

export const getAllSlidersQuery = `*[_type == "slider"]{
  _id,
  title,
  heading,
  paragraphColorClass,
  headingColorClass,
  "imageUrl": image.asset->url,
  link
}`
