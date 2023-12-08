import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Reservation as ReservationType } from '../../../types/Reservations';

import "../../../style/agenda.css";

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface AgendaProps {
    page: number;
    setPage: (page: number) => void;
}
export const Agenda = ({page, setPage}: AgendaProps) => {

    const [reservations, setReservations] = useState<ReservationType[]>([]);

    const [tableau, setTableau] = useState<JSX.Element>(<></>);

    const [formData, setFormData] = useState({
        date: "",
        nom: "",
        time: "",
        nombrePersonnes: 0,
        mail: ""
    });

    const currentDate = new Date();
    const currentDateOfWeek = currentDate.getDay();

    const daysToAdd = currentDateOfWeek > 1 ? -1 * (currentDateOfWeek - 1) : -6;
    const weekDatesArray: string[] = [];
    
    for (let i = 0; i < 7; i++) {
        const newDate = new Date();
        newDate.setDate(currentDate.getDate() + daysToAdd + i);
        const formattedDate = newDate.toISOString().split('T')[0];
        weekDatesArray.push(formattedDate);
    }


    const [jour, setJour] = useState(["", "", "", "", "", "", ""]);
    const [day, setDay] = useState(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);

    const fetchReservation = async (): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservations`)).data;
    };

    const fetchReservation2 = async (date: string): Promise<any> => {
        return (await axios.get(`http://localhost:5000/reservation/${date}`)).data;
    };

    

    useEffect(() => {
        // const day = new Date();
        // handleSetDay(day.getDay() - 1);

        // const getReservations = async () => {
        //     const reservationsFromServer = await fetchReservation();
        //     reservationsFromServer.forEach((element: any) => {
        //         element.date = new Date(element.date);
        //     });
        //     setReservations(reservationsFromServer);
        //     console.log(reservationsFromServer);
        // };

        // getReservations();
    }, []);

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            reservations.forEach((element) => {
                table = (
                    <>
                        {table}
                        <tr>
                            <td className='name'>{element.nom}</td>
                            <td className='quantity'>{element.nb_personnes} personne(s)</td>
                            <td className='date'>{element.date.toISOString().split('T')[1].split('.')[0]}</td>
                        </tr>
                    </>
                );
            });
            setTableau(table);
        };
        createTable();
    }, [reservations]);

    const handleSetDay = (jour: number) => {
        
        const day = new Date();
        let newJour = ["", "", "", "", "", "", ""];
        newJour[jour] = "selected";
        setJour(newJour);

        const getReservations = async () => {
            const reservationsFromServer = await fetchReservation2(weekDatesArray[jour]);
            reservationsFromServer.forEach((element: any) => {
                element.date = new Date(element.date);
            });
            setReservations(reservationsFromServer);
        };

        getReservations();

    }

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
          addReservation();
        }
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const addReservation = async () => {
        const date = new Date(formData.date);
        const dateReservation = new Date(date.toISOString().split('T')[0] + 'T' + formData.time.split(':')[0]+':'+formData.time.split(':')[1]+':00');
        const response = await axios.post(`http://localhost:5000/reservationadd/${formData.nombrePersonnes}/${formData.nom}/${formData.mail}/${dateReservation.toISOString().split('.')[0]}`, {});
        if(response.status == 200){
            alert("Votre réservation a bien été prise en compte !");
        }else{
            alert("Une erreur est survenue lors de la réservation !");
        }
    }



    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Agenda" />
            <div className='agenda'>
                <div className='select_time'>
                    <div onClick={() => handleSetDay(0)} className= {`day ${jour[0]}`}>{weekDatesArray[0]} {day[0]}</div>
                    <div onClick={() => handleSetDay(1)} className= {`day ${jour[1]}`}>{weekDatesArray[1]} {day[1]}</div>
                    <div onClick={() => handleSetDay(2)} className= {`day ${jour[2]}`}>{weekDatesArray[2]} {day[2]}</div>
                    <div onClick={() => handleSetDay(3)} className= {`day ${jour[3]}`}>{weekDatesArray[3]} {day[3]}</div>
                    <div onClick={() => handleSetDay(4)} className= {`day ${jour[4]}`}>{weekDatesArray[4]} {day[4]}</div>
                    <div onClick={() => handleSetDay(5)} className= {`day ${jour[5]}`}>{weekDatesArray[5]} {day[5]}</div>
                    <div onClick={() => handleSetDay(6)} className= {`day ${jour[6]}`}>{weekDatesArray[6]} {day[6]}</div>
                </div>
                <div className='cases'>
                    <table>{tableau}</table>
                </div>
            </div>
            <div id="navaddreserv">
                <div className='navreservdiv'>
                    <h3>Nom</h3>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.nom} name="nom" id="name" type="text" placeholder='Entrez le nom du client' />
                </div>
                <div className='navreservdiv'>
                    <h3>Nombre de couverts</h3>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.nombrePersonnes} name="nombrePersonnes" id="number" type="number" min="1" max="10" placeholder='Entrez le nombre de couverts' />
                </div>
                <div className='navreservdiv'>
                    <h3>Date</h3>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.date} name="date" id="date" type="date" placeholder="Entrez l'heure et la date de la réservation" />
                </div>
                <div className='navreservdiv'>
                    <h3>Time</h3>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.time} name="time" id="time" type="time" placeholder="Entrez l'heure et la date de la réservation" />
                </div>
                <div className='navreservdiv'>
                    <h3>Mail</h3>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} value={formData.mail} name="mail" id="mail" type="text" placeholder="Entrez votre mail" />
                </div>
                <div id="addreservbutton" onClick={addReservation} className="return true">Ajouter une réservation</div>
            </div>
        </> 
    )
}