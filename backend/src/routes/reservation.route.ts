import express from 'express';
import * as ReservationController from '../controllers/reservation.controller.js';

export const reservationRouter = express.Router();

reservationRouter.get('/reservations', ReservationController.getReservations);

reservationRouter.get('/reservation/:date', ReservationController.getReservation);

reservationRouter.post('/reservationadd/:nb_personnes/:name/:mail/:date', ReservationController.setReservation);