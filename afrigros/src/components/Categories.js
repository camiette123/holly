import React from "react";

const Categories = () => {
  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto" style={{marginTop:"100px"}}>
        <h1 className="text-3xl font-bold mb-4">À propos d'AfriGros</h1>
        <p className="text-lg mb-2">
          AfriGros est une plateforme numérique innovante dédiée à la vente
          groupée de produits en Afrique. Elle vise à simplifier l'achat en gros
          en permettant aux commerçants et particuliers de se regrouper pour
          bénéficier de prix avantageux.
        </p>
        <p className="text-lg mb-2">
          Notre objectif est de rendre l’achat de gros accessible, rapide, et
          sécurisé en connectant acheteurs et fournisseurs à travers une
          interface moderne, intuitive et optimisée.
        </p>
        <p className="text-lg">
          Grâce à une technologie robuste basée sur ReactJS, NodeJS et SQLite,
          nous garantissons une expérience fluide, même en mode hors-ligne.
        </p>
      </div>
    </div>
  );
};

export default Categories;
