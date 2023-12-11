import { useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import { Reservation as ReservationType } from '../../../types/Reservations';
import { Commande as CommandeType } from '../../../types/Commande';

import '../../../style/historique.css';
import { get } from 'https';

interface HistoriqueProps {
    page: number;
    setPage: (page: number) => void;
}

export const Historique = ({page, setPage}: HistoriqueProps) => {
    
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [commandes, setCommandes] = useState<CommandeType[]>([]);

    const [selectedReservation, setSelectedReservation] = useState<string[]>([]);
    
    const [tableau, setTableau] = useState<JSX.Element>(<></>);
    const [tableauCommandes, setTableauCommandes] = useState<JSX.Element>(<></>);

    const fetchReservation = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservations`)).data;
    };

    const fetchCommande = async (id: number): Promise<any> => {
        return (await axios.get(`http://localhost:5000/commandes/${id}`)).data;
    };

    useEffect(() => {
        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation();
            reservationsFromServer.forEach((element: ReservationType) => {
                // element.date = new Date(element.date);
                console.log(element.date.split('.')[0] + " " + new Date().toISOString().split('.')[0]);
                if(element.date.split('.')[0] > new Date().toISOString().split('.')[0]) {
                    reservationsFromServer.splice(reservationsFromServer.indexOf(element), 1);
                }
            });
            setSelectedReservation([]);
            setReservations(reservationsFromServer);
        };
    
        getReservations();
    }, []);

    const handleSetDay = (n_reserv: number) => {
        document.querySelectorAll('.reservation').forEach((element) => {
            element.classList.remove('selected');
        });
        document.querySelector('.reservation.selected' + n_reserv)?.classList.add('selected');
        const id_reservation = document.querySelector('.reservation.selected' + n_reserv)?.firstChild?.textContent;

        const getCommande = async (id: number) => {
            const commandeFromServer = await fetchCommande(id);
            setCommandes(commandeFromServer);
        }

        if(id_reservation != undefined) {
            getCommande(parseInt(id_reservation));
        }
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
                            <td className='id'>{element.id}</td>
                            <td className='name'>{element.nom}</td>
                            <td className='quantity'>{element.nb_personnes} personne(s)</td>
                            <td className='date'>{element.date.split('T')[0] + " " + element.date.split('T')[1].split('.')[0]}</td>
                        </tr>
                    </>
                );
            };
            setTableau(table);
        };
        createTable();
    }, [reservations]);

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            for(var j = 0; j < commandes.length; j++) {
                const element = commandes[j];
                const i = j + 1;
                table = (
                    <>
                        {table}
                        <tr className={`commande selected${i}`}>
                            <td className='name'>{element.platname}</td>
                            <td className='quantity'>{element.typename}</td>
                            <td className='date'>{element.price}€</td>
                        </tr>
                    </>
                );
            };
            setTableauCommandes(table);
        };
        createTable();
    }, [commandes]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Historique" n_page={0}/>
            <div className='historique'>
                <div className='commandes'><table>
                    <thead>
                        <tr>
                            <td className='id'>Id</td>
                            <td className='name'>Nom reservation</td>
                            <td className='nombre'>Nombre de personnes</td>
                            <td className='date'>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableau}
                    </tbody>
                </table></div>
                <div className='commandes plat'><table>
                    <thead>
                        <tr>
                            <td className='name'>Nom plat</td>
                            <td className='nombre'>Type</td>
                            <td className='date'>Prix</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableauCommandes}
                    </tbody>
                </table></div>
            </div>
        </>
    )
}