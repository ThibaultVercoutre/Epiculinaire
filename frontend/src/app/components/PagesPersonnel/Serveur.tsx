import React, { useState, useEffect } from 'react';
import "../../style/serveur.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";
import { Serveur as ServeurType } from '../../types/Serveur';

import { TableauServeur } from "./PagesServeur/TableauServeur";
import { ChoixServeur } from "./PagesServeur/ChoixServeur";

interface ServeurProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Serveur = ({user, setUser}: ServeurProps) => {

    const [page, setPage] = useState(0);
    const [serveur, setServeur] = useState<ServeurType | null>(null);

    const components: {[key: number]: JSX.Element} = {
        0: <ChoixServeur page={page} setPage={setPage} serveur={serveur} setServeur={setServeur} />,
        1: <TableauServeur page={page} setPage={setPage} serveur={serveur} setServeur={setServeur}/>
    };

    useEffect(() => {
        console.log(serveur);
    }, [serveur]);

    return (    
      <>
          <Header user={user} setUser={setUser} title = "Serveur"/>

          {components[page]}
        
          {/* <Footer />      */}
      </> 
    )
}