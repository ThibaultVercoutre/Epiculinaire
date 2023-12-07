import * as ReservationService from '../services/reservation.service.js';

export const getReservations = async (req: any, res: any) => {
    const reservations = await ReservationService.getReservations();
    return res.status(200).json(reservations);
}