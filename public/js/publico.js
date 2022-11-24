const socket = io();
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio5 = document.querySelector('#lblEscritorio5')


socket.on('connect', () => {
    //btnCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    // btnCreateTicket.disabled = true;
});


socket.on('actual-state', (payload) => {
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
    
    if ( ticket1 ) {
        lblTicket1.innerHTML = 'Ticket ' + ticket1?.number;
        lblEscritorio1.innerHTML = ticket1?.desk;
    }

    if ( ticket2 ) {
        lblTicket2.innerHTML = 'Ticket ' + ticket2?.number;
        lblEscritorio2.innerHTML = ticket1?.desk;
    }

    if ( ticket3 ) {
        lblTicket3.innerHTML = 'Ticket ' + ticket3?.number;
        lblEscritorio3.innerHTML = ticket1?.desk;
    }

    if ( ticket4 ) {
        lblTicket4.innerHTML = 'Ticket ' + ticket4?.number;
        lblEscritorio4.innerHTML = ticket1?.desk;
    }
});