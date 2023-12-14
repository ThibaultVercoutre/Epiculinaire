import axios from 'axios';

import { useState, useEffect, use } from 'react';

import { Cuisinier as CuisinierType } from '../../../types/Cuisinier';

interface ChoixCuisinierProps {
    page: number;
    setPage: (page: number) => void;
    setCuisinier: (cuisinier: CuisinierType | null) => void;
}
  
export const ChoixCuisinier = ({setPage, setCuisinier}: ChoixCuisinierProps) => {

    const [cuisiniers, setCuisiniers] = useState<CuisinierType[]>([]);
    
    const [TableauServeur, setTableauServeur] = useState<JSX.Element>(<></>);
    
    const fetchListeCuisinier = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/cuisiniers`)).data;
    };

    useEffect(() => {
        const getReservations = async () => {
            const cuisinierFromServer = await fetchListeCuisinier();
            setCuisiniers(cuisinierFromServer);
        };
    
        getReservations();
    }, []);

    const setData = (cuisinier: CuisinierType) => {
        setPage(1);
        setCuisinier(cuisinier)
    }

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < cuisiniers.length; j++) {
                const element = cuisiniers[j];
                const i = j + 1;
                table = (
                    <>
                        {table}
                        <div onClick={() => setData(element)}>{element.name}</div>
                    </>
                );
            };
            setTableauServeur(table);
        };
        createTable();
    }, [cuisiniers]);

    

    return (    
        <>
            <div className="titre">Bienvenue Serveur</div>
            <div className="nav_serveur">
                {TableauServeur}
            </div>
        </> 
    )
}