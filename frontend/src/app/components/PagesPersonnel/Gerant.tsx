import React from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

interface GerantProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Gerant = ({user, setUser}: GerantProps) => {
  return (    
    <>
        <Header user={user} setUser={setUser}/>

        <main></main>
      
        <Footer />     
    </> 
  )
}