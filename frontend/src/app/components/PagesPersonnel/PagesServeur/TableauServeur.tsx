import axios from 'axios';

import { useState, useEffect, use } from 'react';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import { Serveur as ServeurType } from '../../../types/Serveur';

interface TableauServeurProps {
    page: number;
    setPage: (page: number) => void;
    serveur: ServeurType | null;
    setServeur: (serveur: ServeurType | null) => void;
}
  
export const TableauServeur = ({page, setPage, serveur}: TableauServeurProps) => {

    const changePage = (page: number) => {
        setPage(page);
    }
    
    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = {serveur?.serveur_name}/>
            <div className="nav_serveur">
                <div onClick={() => changePage(2)}>Faire une commande</div>
            </div>
        </> 
    )
}