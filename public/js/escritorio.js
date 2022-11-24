const h1DesktopTitle = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const lblPending = document.querySelector('#lblPendientes');
const btnAttendTicket = document.querySelector('button');
const alertTicket = document.querySelector('.alert');
const searchParams = new URLSearchParams(window.location.search);


if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
h1DesktopTitle.innerHTML = desktop;
alertTicket.style.display = 'none';
const socket = io();

socket.on('connect', () => {
    btnAttendTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAttendTicket.disabled = true;
});


socket.on('pending-tickets', (totalTickets) => {
    lblPending.innerHTML = totalTickets;
});

btnAttendTicket.addEventListener( 'click', () => {
    socket.emit( 'attend-ticket', { desktop }, ( { ok, ticket } ) => {
        if ( !ok ) {
            lblTicket.innerText = `Nadie.`;
            return  alertTicket.style.display = 'block';
        }

        const audio  = new Audio('./audio/new-ticket.mp3');
        audio.play();

        lblTicket.innerText = `Ticket ${ ticket.number }`;
    });
});