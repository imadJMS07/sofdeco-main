import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-white mb-16">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E3B26] mb-6">À Propos de Nous</h1>
            <div className="w-24 h-0.5 bg-[#C5A05C]/50 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'histoire de SOFDECO, notre mission et notre passion pour créer des espaces de vie exceptionnels avec des meubles de qualité supérieure.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FAF7F2] rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FAF7F2] rounded-full z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Notre histoire" 
              className="rounded-lg shadow-lg relative z-10 w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Notre Histoire</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            <p className="text-[#4E3B26]/80 mb-6 leading-relaxed">
              Fondée en 2010, SOFDECO est née d'une passion pour le design d'intérieur et les meubles de qualité. Notre fondateur, passionné d'artisanat et de décoration, a commencé par créer des pièces uniques pour sa famille et ses amis.
            </p>
            <p className="text-[#4E3B26]/80 mb-6 leading-relaxed">
              Ce qui a commencé comme un petit atelier s'est rapidement transformé en une entreprise reconnue pour son engagement envers la qualité, le design intemporel et le service client exceptionnel. Aujourd'hui, nous sommes fiers de proposer une collection diversifiée de meubles et d'articles de décoration qui transforment les maisons en foyers.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed">
              Notre équipe de designers talentueux travaille sans relâche pour créer des pièces qui allient fonctionnalité, esthétique et durabilité, en s'inspirant des tendances mondiales tout en restant fidèle à notre héritage.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[#FAF7F2]/50 py-16 md:py-24 mb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Nos Valeurs</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mx-auto mb-6"></div>
            <p className="text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Nos valeurs fondamentales guident chaque aspect de notre entreprise, de la conception à la livraison.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualité",
                description: "Nous nous engageons à utiliser uniquement des matériaux de la plus haute qualité et à maintenir des normes de fabrication exceptionnelles.",
                icon: "✯"
              },
              {
                title: "Durabilité",
                description: "Nous croyons en la création de produits durables qui respectent l'environnement et contribuent à un avenir plus vert.",
                icon: "🌱"
              },
              {
                title: "Innovation",
                description: "Nous cherchons constamment à innover, en combinant techniques traditionnelles et technologies modernes pour créer des designs uniques.",
                icon: "💡"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium text-[#4E3B26] mb-4">{value.title}</h3>
                <p className="text-[#4E3B26]/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#4E3B26] to-[#6B5842] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif mb-6">Découvrez Notre Collection</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Parcourez notre gamme de meubles et d'articles de décoration soigneusement sélectionnés pour transformer votre espace.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-[#C5A05C] hover:bg-[#D6B16D] text-white px-8 py-3 rounded-md transition-colors duration-300 font-medium"
            >
              Explorer Nos Produits
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
