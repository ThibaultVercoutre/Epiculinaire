import { useState } from "react";
import "../../style/reservation.css";

import axios from "axios";

export const Reservation = () => {

    const [formData, setFormData] = useState({
        date: "",
        nom: "",
        time: "",
        nombrePersonnes: 0,
        mail: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleRegister = async () => {
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
            <div className="reservation_client">
                <div className="citation">
                    <div>Notre équipe est dédiée à assurer la qualité de votre service !</div>
                </div>
                <div className="image-centre"></div>
                <div className="form_reservation">
                    <div className="reservationC un">
                        <div>Date</div>
                        <input onChange={handleInputChange} name="date" value={formData.date} id="date" type="date" />
                    </div>
                    <div className="reservationC deux">
                        <div>Heure</div>
                        <input onChange={handleInputChange} name="time" value={formData.time} id="heure" type="time" />
                    </div>
                    <div className="reservationC deux">
                        <div>Nom</div>
                        <input onChange={handleInputChange} name="nom" value={formData.nom} id="nom" type="name" />
                    </div>
                    <div className="reservationC trois">
                        <div>Nombre de personnes</div>
                        <input onChange={handleInputChange} name="nombrePersonnes" value={formData.nombrePersonnes} id="nombrePersonnes" type="number" min="1" max="10"/>
                    </div>
                    <div className="reservationC quatre">
                        <div>Mail</div>
                        <input onChange={handleInputChange} name="mail" value={formData.mail} id="mail" type="mail"/>
                    </div>
                    <div className="reservationC cinq">
                        <div onClick={handleRegister} >Réserver</div>
                    </div>
                </div>
            </div>
        </>
    );
  }
  