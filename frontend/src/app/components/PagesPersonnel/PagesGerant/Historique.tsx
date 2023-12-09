import { useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import { Reservation as ReservationType } from '../../../types/Reservations';

import '../../../style/historique.css';

interface HistoriqueProps {
    page: number;
    setPage: (page: number) => void;
}

export const Historique = ({page, setPage}: HistoriqueProps) => {
    
    const [reservations, setReservations] = useState<ReservationType[]>([]);

    const [selectedReservation, setSelectedReservation] = useState<string[]>([]);
    
    const [tableau, setTableau] = useState<JSX.Element>(<></>);
    const [tableauCommandes, setTableauCommandes] = useState<JSX.Element>(<></>);

    const fetchReservation = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservations`)).data;
    };

    const fetchCommande = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservations`)).data;
    };

    useEffect(() => {
        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            reservationsFromServer.forEach((element: any) => {
                element.date = new Date(element.date);
                if(element.date.toISOString().split('.')[0] > new Date().toISOString().split('.')[0]) {
                    reservationsFromServer.splice(reservationsFromServer.indexOf(element), 1);
                }
            });
            setSelectedReservation([]);
            setReservations(reservationsFromServer);
            console.log(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    const handleSetDay = (n_reserv: number) => {
        document.querySelectorAll('.reservation').forEach((element) => {
            element.classList.remove('selected');
        });
        document.querySelector('.reservation.selected' + n_reserv)?.classList.add('selected');
    }

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < reservations.length; j++) {
                const element = reservations[j];
                const i = j + 1;
                table = (
                    <>
                        {table}
                        <tr onClick={() => handleSetDay(i)} className={`reservation selected${i}`}>
                            <td className='name'>{element.nom}</td>
                            <td className='quantity'>{element.nb_personnes} personne(s)</td>
                            <td className='date'>{element.date.toISOString().split('T')[0] + " " + element.date.toISOString().split('T')[1].split('.')[0]}</td>
                        </tr>
                    </>
                );
            };
            setTableau(table);
        };
        createTable();
    }, [reservations]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Historique"/>
            <div className='historique'>
                <div className='commandes'><table>
                    <thead>
                        <tr>
                            <td className='name'>Nom reservation</td>
                            <td className='nombre'>Nombre de personnes</td>
                            <td className='date'>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableau}
                    </tbody>
                </table></div>
                <div className='commandes'><table>
                    <thead>
                        <tr>
                            <td className='name'>Nom plat</td>
                            <td className='nombre'>Type</td>
                            <td className='date'>Prix</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {tableau} */}
                    </tbody>
                </table></div>
            </div>
        </>
    )
}