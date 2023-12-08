import * as ReservationService from '../services/reservation.service.js';

export const getReservations = async (req: any, res: any) => {
    const reservations = await ReservationService.getReservations();
    return res.status(200).json(reservations);
}

export const getReservation = async (req: any, res: any) => {
    const date = req.params.date;
    const reservations = await ReservationService.getReservation(date);
    return res.status(200).json(reservations);
}