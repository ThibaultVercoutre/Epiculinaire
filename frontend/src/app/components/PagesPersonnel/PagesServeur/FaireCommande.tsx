import { use, useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import { Serveur as ServeurType } from '../../../types/Serveur';
import { PlatMenu as PlatType} from '../../../types/Plat';
import { Ingredient as IngredientType} from '../../../types/Ingredient';

import { Reservation } from '../../PagesPrincipales/Reservation';
import { table } from 'console';

interface FaireCommandeProps {
    page: number;
    setPage: (page: number) => void;
    serveur: ServeurType | null;
    setServeur: (serveur: ServeurType | null) => void;
}
  
export const FaireCommande = ({page, setPage, serveur}: FaireCommandeProps) => {

    const [TableauTable, setTableauTable] = useState<JSX.Element>(<></>);

    const [numTable, setNumTable] = useState<number>(0);
    const [numTypePlat, setNumTypePlat] = useState<number>(0);
    const [numPlat, setNumPlat] = useState<number>(0);
    const [reservation, setReservation] = useState<number>(0);
    const [idCommande, setIdCommande] = useState<number>(0);

    const [listePlats, setListePlats] = useState<PlatType[]>([]);
    const [listeIngredients, setListeIngredients] = useState<IngredientType[]>([]);

    const fetchListePlats = async (id: number): Promise<any> => {
        console.log(`http://localhost:5000/plattype/${id}`);
        return (await axios.get(`http://localhost:5000/plattype/${id}`)).data;
    };

    const fetchListeIngredient = async (id: number): Promise<any> => {
        console.log(`http://localhost:5000/ingredients/${id}`);
        return (await axios.get(`http://localhost:5000/ingredients/${id}`)).data;
    };

    const fetchReservation = async (id: number): Promise<any> => {
        console.log(`http://localhost:5000/reservationbytable/${id}`);
        return (await axios.get(`http://localhost:5000/reservationbytable/${id}`)).data;
    };

    const fetchCommande = async (heure: string): Promise<any> => {
        console.log(`http://localhost:5000/reservationbytable/${heure}`);
        return (await axios.get(`http://localhost:5000/reservationbytable/${heure}`)).data;
    };

    useEffect(() => {
        setNumPlat(0);
        setNumTypePlat(0);
        setNumTable(0);
        setReservation(0);
        setListePlats([]);
        setListeIngredients([]);
        console.log('afficher table');
        const createTable = () => {
            if(serveur != null){
                let table = <></>;
                for(var j = 0; j < serveur.tables.length; j++) {
                    const element = serveur.tables[j];
                    const i = j + 1;
                    table = (
                        <>
                            {table}
                            <div onClick={() => setNumTable(element.id as number)}>{String(element.id)}</div>
                        </>
                    );
                };
                setTableauTable(table);
            }
        };
        createTable();
    }, []);  
    
    useEffect(() => {
        if(numTable != 0){
            console.log('afficher type plat');
            const createTable = () => {
                let table = <></>;
                table = (
                    <>
                        <div onClick={() => setNumTypePlat(1)}>Entrée</div>
                        <div onClick={() => setNumTypePlat(2)}>Plat</div>
                        <div onClick={() => setNumTypePlat(3)}>Dessert</div>
                        <div onClick={() => setNumTypePlat(4)}>Apéritifs</div>
                    </>
                );
                setTableauTable(table);
            }
            createTable();
        }
    }, [numTable]);

    useEffect(() => {
        if(numTypePlat != 0){
            const getReservations = async () => {
                console.log('afficher plat 1');
                const PlatsFromServer = await fetchListePlats(numTypePlat);
                setListePlats(PlatsFromServer);
            };
        
            getReservations();
        }
    }, [numTypePlat]);
    
    useEffect(() => {
        if(numTypePlat != 0){
            console.log('afficher plat 2')
            const createTable = () => {
                if(serveur != null){
                    let table = <></>;
                    for(var j = 0; j < listePlats.length; j++) {
                        const element = listePlats[j];
                        const i = j + 1;
                        table = (
                            <>
                                {table}
                                <div onClick={() => setNumPlat(element.id as number)}>{String(element.platname)}</div>
                            </>
                        );
                    };
                    setTableauTable(table);
                }
            };
            createTable();
        }
    }, [listePlats]);

    useEffect(() => {
        if(numPlat != 0){
            console.log('recuperer ingredient')
            const getIngredients = async () => {
                const ingredientFromServer = await fetchListeIngredient(numPlat);
                setListeIngredients(ingredientFromServer);
            };
            getIngredients();
        }
    }, [numPlat]);

    useEffect(() => {
        if(listeIngredients.length != 0){
            console.log('recuperer reservation')
            const getReservation = async () => {
                const reservationFromServer = await fetchReservation(numTable);
                setReservation(reservationFromServer[0].id as number);
            };
            getReservation();
        }
    }, [listeIngredients]);

    useEffect(() => {
        if(reservation != 0){
            console.log('set reservation')
            const setReservation = async () => {

                const date = new Date().toISOString().split('T')[1].split('.')[0];
                const response2 = await axios.post(`http://localhost:5000/commandeadd/${numPlat}/${reservation}/${date}`, {})

                const id_plat = response2.data;

                var nb_ingredients = 0;
                for(var j = 0; j < listeIngredients.length; j++) {
                    const response = await axios.post(`http://localhost:5000/commandepreparationadd/${id_plat}/${listeIngredients[j].id_ingredient}/${serveur?.id}/${reservation}`, {});
                    // console.log(`http://localhost:5000/commandepreparationadd/${id_plat}/${listeIngredients[j].id_ingredient}/${serveur?.id}/${reservation}`);

                    if(response.status == 200){
                        nb_ingredients++;
                    }
                }                    

                if(nb_ingredients == listeIngredients.length && response2.status == 200){
                    alert("Votre réservation a bien été prise en compte !");
                }else{
                    alert("Une erreur est survenue lors de la réservation !");
                }
            }
            setReservation();
        }
    }, [reservation]);

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = {"Faire une Commande"} n_page={1}/>
            <div className="nav_serveur">
                {TableauTable}
            </div>
        </> 
    )
}