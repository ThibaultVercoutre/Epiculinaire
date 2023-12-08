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
        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            setReservations(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    useEffect(() => {
        const createTable = () => {
            let tablePret = <></>;
            let tableEnPreparation = <></>;
            let tableEnAttente = <></>;
            let i = 0;
            for(var j = 0; j < reservations.length; j++) {
                const element = reservations[i];
                console.log(element.etat);
                if(element.etat == "Pret"){
                    tablePret = (
                        <>
                            {tablePret}
                            <tr>
                                <td className='name'>{element.name}</td>
                                <td className='quantity'>Table n°{element.id_table}</td>
                            </tr>
                        </>
                    );
                }else if(element.etat == "En preparation"){
                    tableEnPreparation = (
                        <>
                            {tableEnPreparation}
                            <tr>
                                <td className='name'>{element.name}</td>
                                <td className='quantity'>Table n°{element.id_table}</td>
                            </tr>
                        </>
                    );
                }else if(element.etat == "a preparer"){
                    tableEnAttente = (
                        <>
                            {tableEnAttente}
                            <tr>
                                <td className='name'>{element.name}</td>
                                <td className='quantity'>Table n°{element.id_table}</td>
                            </tr>
                        </>
                    );
                }
                i++;
            };
            setTableauPret(tableEnAttente);
            setTableauEnPreparation(tableEnPreparation);
            setTableauEnAttente(tableEnAttente);
            // console.log(tableauEnAttente, tableauEnPreparation, tableauPret)
        };

        createTable();
    }, [reservations]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Suivi Plats"/>
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