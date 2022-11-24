import { existsSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Ticket } from './Ticket.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class TicketControl {
    get toJSON() {
        return {
            lastTicket : this.lastTicket,
            todayDate: this.todayDate,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        }
    }


    constructor() {
        this.lastTicket = 0;
        this.todayDate = new Date().getDate();
        this.tickets = [];
        this.last4Tickets = [];

        this.init();
    }

    async init() {
        this.createFile();
        const { default: { todayDate, lastTicket, last4Tickets, tickets } } = await import('../db/db.json', { assert: { type: 'json' } });

        if ( todayDate === this.todayDate ) {
            this.tickets = tickets;
            this.lastTicket = lastTicket;
            this.last4Tickets = last4Tickets;
        } else {
            this.saveDB();
        }
    } 

    nextTicket() {
        this.lastTicket +=1;
        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.saveDB();
        return 'Ticket ' + ticket.number;
    }

    attendTicket(desk) {
        // Si no tenemos tickets
        if ( !this.tickets.length ) return null;

        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.last4Tickets.unshift(ticket);

        if ( this.last4Tickets.length > 4 ) this.last4Tickets.splice(-1, 1);

        this.saveDB();
        return ticket;
    }

    
    saveDB() {
        const pathFile = path.join(__dirname, '../db/db.json');
        writeFileSync(pathFile, JSON.stringify(this.toJSON));
    }

    createFile() {
        const pathFile = path.join(__dirname, '../db/db.json');
        const existsJSONFile = existsSync(pathFile);
        
        if ( !existsJSONFile ) {
            writeFileSync(pathFile, JSON.stringify({ }));
        }
    }
}