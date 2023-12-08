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

    const fetchReservation = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservations`)).data;
    };

    const handleSetDay = (reservation: number) => {
        const SR: string[] = [];
        reservations.forEach((element: any) => {
            SR.push("");
            setSelectedReservation(SR);
        });
        SR[reservation] = "selected";
        setSelectedReservation(SR);
    }

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            let i = 0;
            reservations.forEach((element) => {
                table = (
                    <>
                        {table}
                        <tr onClick={() => handleSetDay(i)} className={`reservation ${selectedReservation[i]}`}>
                            <td className='name'>{element.nom}</td>
                            <td className='quantity'>{element.nb_personnes} personne(s)</td>
                            <td className='date'>{element.date.toISOString().split('T')[1].split('.')[0]}</td>
                        </tr>
                    </>
                );
                i++;
            });
            setTableau(table);
        };
        createTable();
    }, [reservations]);

    useEffect(() => {

        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            reservationsFromServer.forEach((element: any) => {
                element.date = new Date(element.date);
            });
            const SR = selectedReservation;
            reservationsFromServer.forEach((element: any) => {
                SR.push("");
            });      
            setSelectedReservation(SR);
            setReservations(reservationsFromServer);
            console.log(reservationsFromServer);
        };

        getReservations();
    }, []);

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
            </div>
        </>
    )
}