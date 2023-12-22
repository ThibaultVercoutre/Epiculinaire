import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { PlatDetails as PlatType } from '../../../types/Plat';
import { SimpleTable as TableType } from '../../../types/Tables';
import { IngredientDetails as IngredientType } from '../../../types/Ingredient';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import '../../../style/detailscuisinier.css';

interface DetailsProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

export const Details = ({page, setPage, returnPage}: DetailsProps) => {

    const [tables, setTables] = useState<TableType[]>([]);
    const [tableTables, setTableTables] = useState<JSX.Element>(<></>);
    const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
    const [plats, setPlats] = useState<PlatType[]>([]);
    const [tablePlats, setTablePlats] = useState<JSX.Element>(<></>);
    const [selectedPlat, setSelectedPlat] = useState<Number | null>(null);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [tableIngredients, setTableIngredients] = useState<JSX.Element>(<></>);
    const [error, setError] = useState<string | null>(null);


    const fetchTables = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/tables`)).data;
    }

    const fetchCommandes = async (id: number): Promise<any> => {
        return (await axios.get(`http://localhost:5000/tablesdetailsR/${id}`)).data;
    }

    const fetchAliments = async (id: number): Promise<any> => {
        return (await axios.get(`http://localhost:5000/aliments/${id}`)).data;
    }

    useEffect(() => {
        const getTables = async () => {
            try {
                const tablesFromServer = await fetchTables();

                const fakeTables: TableType[] = [];

                for(var i = 0; i < tablesFromServer.length; i++) {
                    if(tablesFromServer[i].name != null) {
                        fakeTables.push(
                            {id: tablesFromServer[i].id, name: tablesFromServer[i].name}
                        );
                    }
                }

                setTables(fakeTables);
            } catch (error) {
                setError("Une erreur s'est produite lors de la récupération des tables.");
                console.error("Erreur Axios :", error);
            }
        };

        getTables();
    }, []);

    useEffect(() => {
        if(true){
            console.log('afficher type plat');
            const createTable = () => {
                let table = <></>;
                for(var j = 0; j < tables.length; j++) {
                    const element = tables[j];
                    const i = j + 1;
                    table = (
                        <>
                            {table}
                            <tr onClick={() => handleTableClick(element)}><td>{element.name}</td></tr>
                        </>
                    );
                }
                setTableTables(table);
            }
            createTable();
        }
    }, [tables]);

    useEffect(() => {
        const getCommandes = async () => {
            try {
                const reservationFromServer = await fetchCommandes(selectedTable?.id || 0);
                setPlats(reservationFromServer);
                console.log(reservationFromServer);
            } catch (error) {
                setError("Une erreur s'est produite lors de la récupération des commandes.");
                console.error("Erreur Axios :", error);
            }
        };

        getCommandes();
    }, [selectedTable]);

    useEffect(() => {
        if(plats.length > 0){
            setTableIngredients(<></>);
            const createTable = () => {
                let table = <></>;
                for(var j = 0; j < plats[0].commandes.length; j++) {
                    const element = plats[0].commandes[j];
                    const i = j + 1;
                    table = (
                        <>
                            {table}
                            <tr onClick={() => handleCommandeClick(element.id)}><td>{element.name}</td></tr>
                        </>
                    );
                }
                setTablePlats(table);
            }
            createTable();
        }
    }, [plats]);

    useEffect(() => {
        const getAliments = async () => {
            try {
                const alimentsFromServer = await fetchAliments(Number(selectedPlat) || 0);
                setIngredients(alimentsFromServer);
            } catch (error) {
                setError("Une erreur s'est produite lors de la récupération des aliments.");
                console.error("Erreur Axios :", error);
            }
        };

        getAliments();
    }, [selectedPlat]);

    useEffect(() => {
        if(ingredients.length > 0){
            const createTable = () => {
                let table = <></>;
                for(var j = 0; j < ingredients.length; j++) {
                    const element = ingredients[j];
                    const i = j + 1;
                    table = (
                        <>
                            {table}
                            <tr><td>{element.name_aliment}</td></tr>
                        </>
                    );
                }
                setTableIngredients(table);
            }
            createTable();
        }
    }, [ingredients]);

    const handleTableClick = async (table: TableType) => {
        setSelectedTable(table);
    };

    const handleCommandeClick = async (id: number) => {
        setSelectedPlat(id);
    };

    return (
        <>
            <HeaderPages page={page} setPage={setPage} title="Détails" n_page={returnPage} />

            {error && <p>{error}</p>}

            <div className='tablesT'>
                <div className='Ttables'>
                    <table>
                    <thead><tr><td>Liste des tables</td></tr></thead>
                        <tbody>
                            {tableTables}
                        </tbody>
                    </table>
                </div>

                <div className='Tcommandes'>
                    <table>
                    <thead><tr><td>Liste des commandes</td></tr></thead>
                        <tbody>
                            {tablePlats}
                        </tbody>
                    </table>
                </div>

                <div className='Tingredients'>
                    <table>
                    <thead><tr><td>Liste des ingredients</td></tr></thead>
                        <tbody>
                            {tableIngredients}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}