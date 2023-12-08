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

    useEffect(() => {
        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            reservationsFromServer.forEach((element: any) => {
                element.date = new Date(element.date);
            });
            setSelectedReservation([]);
            setReservations(reservationsFromServer);
            console.log(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    const handleSetDay = (n_reserv: number) => {
        const SR: string[] = [];
        console.log(n_reserv);
        for(var i = 0; i < reservations.length; i++) {
            if(SR.length == i + 1){
                SR.push('selected');
            }else{
                SR.push('');
            }
        };
        SR[n_reserv - 1] = "selected";
        setSelectedReservation(SR);
        console.log(reservations, selectedReservation, SR);
    }

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            let i = 0;
            for(var j = 0; j < reservations.length; j++) {
                const element = reservations[i];
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
                console.log(i);
                i++;
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
            </div>
        </>
    )
}