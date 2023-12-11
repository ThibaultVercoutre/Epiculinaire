import React, { useState, useEffect } from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

import { TableauCuisinier } from "./PagesCuisinier/TableauCuisinier";
import { ChoixCuisinier } from "./PagesCuisinier/ChoixCuisinier";

interface CuisinierProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Cuisinier = ({user, setUser}: CuisinierProps) => {

    
    const [page, setPage] = useState(0);

    const components: {[key: number]: JSX.Element} = {
        0: <ChoixCuisinier page={page} setPage={setPage}/>,
        1: <TableauCuisinier page={page} setPage={setPage}/>,
    };

    return (    
        <>
            <Header user = {user} setUser={setUser} title='Cuisinier'/>

            <main>
                <div className="content_cuisto">
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
          
            {/* <Footer /> */}
        </> 
  )
}