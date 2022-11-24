import { TicketControl } from "../models/TicketControl.js";

const ticketControl = new TicketControl();

export const socketController = (socket) => {
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.emit('last-ticket', ticketControl.lastTicket);
    socket.emit('actual-state', ticketControl.last4Tickets);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', ( payload, callback ) => {
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);

        // TODO: Notificar que hay un nuevo ticket para asignar 
    });

    socket.on('attend-ticket', ({ desktop }, callback) => {
        if ( !desktop ) return callback({
            ok: false,
            message: 'El escritorio es obligatorio'
        });

        const ticket = ticketControl.attendTicket(desktop);

        socket.broadcast.emit('actual-state',ticketControl.last4Tickets);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if ( !ticket ) return callback({
            ok: false,
            message: 'Ya no hay tickets que atender'
        });

        return callback({
            ok: true,
            ticket
        });
    });

}
