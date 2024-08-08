const { Server } = require('socket.io');

const PORT = process.env.PORT || 8082;
const website = process.env.WebsiteURI || 'https://zentutor.ca';
console.log('Starting server on port ' + PORT);
const io = new Server(PORT, {
    cors: {
        origin: website,
    }
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
    //
    // function generateUniqueID() {
    //     return Math.random().toString(36).slice(2, 9);
    // }

