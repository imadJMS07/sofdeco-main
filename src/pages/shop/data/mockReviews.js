export const mockReviews = [
  {
    id: 1,
    userName: "Emma Thompson",
    rating: 5,
    date: "2024-03-15",
    text: "Absolutely stunning quality! The craftsmanship is exceptional and the attention to detail is remarkable. This piece has become the centerpiece of my living room.",
    verified: true
  },
  {
    id: 2,
    userName: "James Wilson",
    rating: 4,
    date: "2024-03-10",
    text: "Beautiful design and excellent build quality. The only reason for 4 stars is that the delivery took longer than expected. Otherwise, perfect!",
    verified: true
  },
  {
    id: 3,
    userName: "Sophia Chen",
    rating: 5,
    date: "2024-03-05",
    text: "Exceeded all my expectations! The quality is outstanding and it looks even better in person. Customer service was also exceptional.",
    verified: true
  },
  {
    id: 4,
    userName: "Michael Rodriguez",
    rating: 5,
    date: "2024-02-28",
    text: "A true masterpiece! The attention to detail is incredible and the materials used are of the highest quality. Worth every penny.",
    verified: true
  },
  {
    id: 5,
    userName: "Olivia Parker",
    rating: 4,
    date: "2024-02-20",
    text: "Very elegant and well-crafted. The design is timeless and the quality is superb. Would definitely recommend to others.",
    verified: true
  }
];

export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}; 