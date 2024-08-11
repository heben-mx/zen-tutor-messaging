// Serving the app with express

const express = require('express');
const { createServer } = require('http');

const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 8083;
const allowedOrigins = [
    process.env.WebsiteURI || 'https://zentutor.ca',
    "http://localhost:4200"
]

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins
    }
});

app.use(cors({
    origin: allowedOrigins
}));

app.get('/', (req, res) => {
    res.send('<h1>Hello World Health Check</h1>');
});

const clients = {};

io.on('connection', (socket) => {
    const userID = socket.handshake.query.id;
    console.log('User connected: ' + userID);
    // const clientId = socket.id;
    // TODO: check if the user is already connected
    // TODO: Improve security by checking if the user is authenticated
    clients[userID] = socket;

    socket.on('message', (msg) => {
        const { text, timestamp, recipientID, senderID } = msg ;
        let recipientSocket = clients[recipientID];
        if (recipientSocket) {
            recipientSocket.emit('message', { text, timestamp, senderID });
        }
    });

    socket.on('disconnect', () => {
        delete clients[userID];
    });

});

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

    //
    // function generateUniqueID() {
    //     return Math.random().toString(36).slice(2, 9);
    // }

