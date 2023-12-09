import React from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

interface CuisinierProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Cuisinier = ({user, setUser}: CuisinierProps) => {
  return (    
    <>
        <Header user = {user} setUser={setUser} title='Cuisinier'/>

        <main>
            <div className="content">
            <p>Bienvenue sur votre espace Chef !</p>
            <div className="perfecto"></div>
            </div>
            <nav className="navigation">
            <ul>
                <li><a href="#">Commande par table</a></li>
                <li><a href="#">Stock</a></li>
                <li><a href="#">Plats/ingrédients</a></li>
                <li><a href="#">Ajout plat</a></li>
            </ul>
            </nav>
        </main>
      
        <Footer />

      
    </> 
  )
}