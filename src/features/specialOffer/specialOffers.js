export const specialOffers = [
  {
    id: 1,
    name: "Study sidedesk",
    image: "/products/desk.jpg",
    price: 42.00,
    oldPrice: 60.00,
    rating: 5,
    countdownEnd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    category: "Furniture",
    description: "Modern study desk with minimalist design"
  },
  {
    id: 2,
    name: "Wooden sofa set",
    image: "/products/sofa.jpg",
    price: 18.00,
    oldPrice: 25.00,
    rating: 4,
    countdownEnd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Living Room",
    description: "Comfortable wooden sofa set with elegant design"
  },
  {
    id: 3,
    name: "Eallo white stool",
    image: "/products/stool.jpg",
    price: 22.00,
    oldPrice: 30.00,
    rating: 5,
    countdownEnd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Furniture",
    description: "Modern white stool with ergonomic design"
  }
]; 