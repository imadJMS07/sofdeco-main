import React from 'react';
import Marquee from 'react-fast-marquee';
import { StarIcon } from '@heroicons/react/24/solid';

const reviews = [
  {
    id: 1,
    name: "Amina Benali",
    rating: 5,
    comment: "J'adore mon nouveau canapé ! La qualité est exceptionnelle et la livraison a été rapide. L'équipe du service client a été incroyablement serviable tout au long du processus.",
    date: "2024-03-15",
    product: "Canapé Moderne en Cuir",
    location: "Casablanca, Maroc"
  },
  {
    id: 2,
    name: "Youssef El Mansouri",
    rating: 5,
    comment: "La table à manger a dépassé mes attentes. Le savoir-faire est remarquable et elle est encore plus belle en personne. Je recommande vivement !",
    date: "2024-03-10",
    product: "Table à Manger Scandinave",
    location: "Marrakech, Maroc"
  },
  {
    id: 3,
    name: "Leila Bouazizi",
    rating: 4,
    comment: "Magnifique fauteuil d'appoint qui ajoute la touche parfaite à mon salon. Le tissu en velours est luxueux et les pieds dorés sont superbes.",
    date: "2024-03-08",
    product: "Fauteuil d'Appoint en Velours",
    location: "Rabat, Maroc"
  },
  {
    id: 4,
    name: "Karim Tazi",
    rating: 5,
    comment: "Le lit plateforme est exactement ce que je cherchais. L'éclairage LED intégré est une excellente fonctionnalité et la qualité de fabrication est de premier ordre.",
    date: "2024-03-05",
    product: "Lit Plateforme Queen",
    location: "Tanger, Maroc"
  },
  {
    id: 5,
    name: "Nadia El Fassi",
    rating: 4,
    comment: "Excellente chaise de bureau avec un support ergonomique exceptionnel. Le dossier en maille me garde au frais pendant les longues sessions de travail. Très confortable !",
    date: "2024-03-01",
    product: "Chaise de Bureau Moderne",
    location: "Fès, Maroc"
  }
];

const CARD_WIDTH = 420;
const CARD_HEIGHT = 340;

const CustomerReviews = () => {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#4E3B26]">
            Avis Clients
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#C5A05C] to-[#4E3B26] mx-auto mb-6" />
          <p className="text-[#1A1A1A]/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience avec nos meubles de qualité supérieure
          </p>
        </div>
      </div>
      {/* Marquee is now outside the container for edge-to-edge effect */}
      <div className="relative drop-shadow-2xl w-full">
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover={true}
          className="flex"
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex flex-col justify-between flex-none bg-gradient-to-br from-[#fff8ec] via-white to-[#f8f3ee] rounded-3xl p-10 px-4 border-2 border-[#C5A05C]/30 hover:border-[#C5A05C] transition-all duration-300 relative group mx-4"
              style={{ fontFamily: 'serif', width: CARD_WIDTH, height: CARD_HEIGHT, minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH, minHeight: CARD_HEIGHT, maxHeight: CARD_HEIGHT }}
            >
              <div className="relative">
                <svg
                  className="absolute -top-6 -left-3 w-12 h-12 text-[#C5A05C]/60 opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex flex-col gap-1 mb-3">
                  <div className="flex items-center gap-2 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="inline-block">
                        <StarIcon
                          className={`w-6 h-6 ${i < review.rating ? 'text-[#C5A05C]' : 'text-gray-200'}`}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#C5A05C] to-[#fff8ec] rounded-full group-hover:from-[#C5A05C] group-hover:to-[#C5A05C]/30 transition-all duration-300 self-end" />
                </div>
                <p className="text-[#1A1A1A]/90 mb-8 text-xl leading-relaxed italic font-serif line-clamp-4 h-24 overflow-hidden">
                  "{review.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-[#C5A05C]/10">
                <div>
                  <h4 className="font-bold text-[#4E3B26] text-lg font-serif">{review.name}</h4>
                  <p className="text-sm text-[#1A1A1A]/60 font-sans">{review.product}</p>
                  <p className="text-xs text-[#C5A05C] mt-1 font-sans">{review.location}</p>
                </div>
                <span className="text-sm text-[#1A1A1A]/40 font-medium font-sans">
                  {new Date(review.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CustomerReviews; 