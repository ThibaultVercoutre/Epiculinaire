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
                            <td className='date'>{element.date.split('T')[1].split('.')[0]}</td>
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

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Agenda" n_page={0}/>
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
        </> 
    )
}