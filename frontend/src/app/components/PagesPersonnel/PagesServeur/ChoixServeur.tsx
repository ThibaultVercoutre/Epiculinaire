import axios from 'axios';

import { useState, useEffect, use } from 'react';


import { Serveur as ServeurType } from '../../../types/Serveur';
import { serverHooks } from 'next/dist/server/app-render/entry-base';

interface ChoixServeurProps {
    serveur: ServeurType | null;
    setServeur: (serveur: ServeurType | null) => void;
    page: number;
    setPage: (page: number) => void;
}
  
export const ChoixServeur = ({setPage, serveur, setServeur}: ChoixServeurProps) => {

    const [serveurs, setServeurs] = useState<ServeurType[]>([]);
    
    const [TableauServeur, setTableauServeur] = useState<JSX.Element>(<></>);
    
    const fetchListeServeurs = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/serveursaffectations`)).data;
    };

    useEffect(() => {
        const getReservations = async () => {
            const reservationsFromServer = await fetchListeServeurs();
            setServeurs(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    const setData = (serveur: ServeurType) => {
        setServeur(serveur);
        setPage(1);
    }

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < serveurs.length; j++) {
                const element = serveurs[j];
                const i = j + 1;
                table = (
                    <>
                        {table}
                        <div onClick={() => setData(element)}>{element.serveur_name}</div>
                    </>
                );
            };
            setTableauServeur(table);
        };
        createTable();
    }, [serveurs]);

    

    return (    
        <>
            <div className="titre">Bienvenue Serveur</div>
            <div className="nav_serveur">
                {TableauServeur}
            </div>
        </> 
    )
}