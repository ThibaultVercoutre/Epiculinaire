import React from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

interface ReceptionnistProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Receptionniste = ({user, setUser}: ReceptionnistProps) => {
  return (    
    <>
        <Header user={user} setUser={setUser} title = "Réceptionniste"/>

        <main></main>
      
        <Footer />     
    </> 
  )
}