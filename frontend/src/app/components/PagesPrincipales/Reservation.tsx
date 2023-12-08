import "../../style/reservation.css";

export const Reservation = () => {

    return (
        <>
            <div className="reservation_client">
                <div className="citation">
                    <div>Notre équipe est dédiée à assurer la qualité de votre service !</div>
                </div>
                <div className="image-centre"></div>
                <div className="form_reservation">
                    <div className="reservationé">
                        <div>Date</div>
                        <input id="date" type="date" />
                    </div>
                    <div className="reservationé2">
                        <div>Heure</div>
                        <input id="heure" type="time" />
                    </div>
                    <div className="reservationé3">
                        <div>Nombre de personnes</div>
                        <input id="nombrePersonnes" type="number" min="1" max="10"/>
                    </div>
                    <div className="reservationé4">
                        <div>Réserver</div>
                    </div>
                </div>
            </div>
        </>
    );
  }
  