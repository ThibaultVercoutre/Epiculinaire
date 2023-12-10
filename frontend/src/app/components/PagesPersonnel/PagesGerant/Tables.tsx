import { useEffect, useState } from 'react';
import axios from 'axios';

import { MapResto } from './MapResto';
import { HeaderPages } from '../PagesComunes/HeaderPages';

import { Table as TableType } from '../../../types/Tables';

import { Plat as PlatType } from '../../../types/Plat';

import '../../../style/map.css';

interface TablesProps {
    page: number;
    setPage: (page: number) => void;
}

export const Tables = ({page, setPage}: TablesProps) => {

    const [size, setSize] = useState({ width: 600, height: 600 });
    const [tables, setTables] = useState<TableType[]>([]);

    const [selectTable, setSselectTable] = useState(0);

    const [tableau, setTableau] = useState<JSX.Element>(<></>);
    const [tableauCommandes, setTableauCommandes] = useState<JSX.Element>(<></>);

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth/5, height: window.innerHeight/5 });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchCommandes = async (id: number): Promise<any> => {
        return (await axios.get(`http://localhost:5000/tablesdetailsR/${id}`)).data;
    };

    useEffect(() => {
        const getCommandes = async () => {
            const reservationFromServer = await fetchCommandes(selectTable);
            setTables(reservationFromServer);
        }
        setTableauCommandes(<></>);
        getCommandes();
    }, [selectTable]);

    const handleSetDay = () => {
        console.log(tables[0]);
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < tables[0].commandes.length; j++) {
                const element = tables[0].commandes[j];
                const i = j + 1;
                table = (
                    <>
                        {table}
                        <tr>
                            <td className='name'>{element.name}</td>
                            <td className='quantity'>{element.etatString}</td>
                        </tr>
                    </>
                );
            };
            setTableauCommandes(table);
        };
        createTable();
    }

    useEffect(() => {
        console.log(tables);
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < tables.length; j++) {
                const element = tables[j];
                const i = j + 1;
                table = (
                    <>
                        <div>Nom : {element.name}</div>
                        <div>Etat : {element.avancement}</div>
                        <div onClick={() => handleSetDay()} className='affiche_commandes'>Afficher les commandes</div>
                    </>
                );
            };
            setTableau(table);
        };
        createTable();
    }, [tables]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Tables"/>
            <div className='tables'>
                <div className='info'>
                    <div className='details'>
                        <div className='titre_details'>Détails : </div>
                        {tableau}
                    </div>
                    
                </div>
                <div className='map'>
                    <MapResto heightdiv={size.height} widthdiv={size.width} setSselectTable={setSselectTable}/>
                </div>
                <div className='info commandes'>
                    <table>
                        <thead>
                            <tr>
                                <td className='name'>Nom</td>
                                <td className='quantity'>Etat</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableauCommandes}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}