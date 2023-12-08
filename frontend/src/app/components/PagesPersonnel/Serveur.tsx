import React from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

interface ServeurProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Serveur = ({user, setUser}: ServeurProps) => {
  return (    
    <>
        <Header user={user} setUser={setUser} title = "Serveur"/>

        <main></main>
      
        <Footer />     
    </> 
  )
}