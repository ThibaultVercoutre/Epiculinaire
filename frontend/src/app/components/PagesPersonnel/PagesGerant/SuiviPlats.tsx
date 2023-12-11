import { useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import { SuiviPlats as SuiviPlatsType } from '../../../types/SuiviPlats';

import '../../../style/suiviplats.css';

// import '../../../style/suiviplats.css';

interface SuiviPlatsProps {
    page: number;
    setPage: (page: number) => void;
}

export const SuiviPlats = ({page, setPage}: SuiviPlatsProps) => {
    
    const [reservations, setReservations] = useState<SuiviPlatsType[]>([]);

    const [tableauPret, setTableauPret] = useState<JSX.Element>(<></>);
    const [tableauEnPreparation, setTableauEnPreparation] = useState<JSX.Element>(<></>);
    const [tableauEnAttente, setTableauEnAttente] = useState<JSX.Element>(<></>);

    const fetchReservation = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/platspreparation`)).data;
    };

    useEffect(() => {
        console.log('afficher table');
        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            setReservations(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    useEffect(() => {
        console.log(reservations.length);
        if(reservations.length > 0){
            const createTable = () => {
                let tablePret = <></>;
                let tableEnPreparation = <></>;
                let tableEnAttente = <></>;
                for(var j = 0; j < reservations.length; j++) {
                    const i = j;
                    const element = reservations[i];
                    const name = element.name;
                    const id_table = element.id_table;
                    if(element.etat == "pret"){
                        tablePret = (
                            <>
                                {tablePret}
                                <tr>
                                    <td className='name'>{name}</td>
                                    <td className='quantity'>Table n°{id_table}</td>
                                </tr>
                            </>
                        );
                    }else if(element.etat == "preparation"){
                        tableEnPreparation = (
                            <>
                                {tableEnPreparation}
                                <tr>
                                    <td className='name'>{name}</td>
                                    <td className='quantity'>Table n°{id_table}</td>
                                </tr>
                            </>
                        );
                    }else if(element.etat == "attente"){
                        tableEnAttente = (
                            <>
                                {tableEnAttente}
                                <tr>
                                    <td className='name'>{name}</td>
                                    <td className='quantity'>Table n°{id_table}</td>
                                </tr>
                            </>
                        );
                    }
                };
                setTableauPret(tablePret);
                setTableauEnPreparation(tableEnPreparation);
                setTableauEnAttente(tableEnAttente);
                // console.log(tableauEnAttente, tableauEnPreparation, tableauPret)
            };

            createTable();
        }
    }, [reservations]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Suivi Plats" n_page={0}/>
            <div className='tableaux'>
                <div className='tableau'>
                    <div className='titre_table'>En attente</div>
                    <div className='table'><table>
                        <thead>
                            <tr>
                                <td className='name'>Nom plat</td>
                                <td className='nombre'>Numero de table</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableauEnAttente}
                        </tbody>
                    </table></div>
                </div>
                <div className='tableau'>
                    <div className='titre_table'>En preparation</div>
                    <div className='table'><table>
                        <thead>
                            <tr>
                                <td className='name'>Nom plat</td>
                                <td className='nombre'>Numero de table</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableauEnPreparation}
                        </tbody>
                    </table></div>
                </div>
                <div className='tableau'>
                    <div className='titre_table'>Pret</div>
                    <div className='table'><table>
                        <thead>
                            <tr>
                                <td className='name'>Nom plat</td>
                                <td className='nombre'>Numero de table</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableauPret}
                        </tbody>
                    </table></div>
                </div>
            </div>
        </>
    )
}