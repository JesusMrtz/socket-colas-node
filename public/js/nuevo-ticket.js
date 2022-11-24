const socket = io();
const lblTicket = document.querySelector('#lblNuevoTicket');
const btnCreateTicket = document.querySelector('button');

socket.on('connect', () => {
    btnCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnCreateTicket.disabled = true;
});


socket.on('last-ticket', (lastTicket) => {
    lblTicket.innerHTML = `Ticket: ${ lastTicket }`;
});

btnCreateTicket.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblTicket.innerHTML = ticket;
    });
});