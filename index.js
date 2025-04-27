const io = require('socket.io')(5000, {
    cors: {
        origin: "http://localhost:5000", // Allow frontend to connect
        methods: ["GET", "POST"]
    }
});


const users = {}; 

io.on('connection', socket => {  
    console.log("A user connected:", socket.id);  // Debugging

    socket.on('new-user-joined', name => {
        console.log("New User Joined Event Received! Name:", name); // Fixed typo
        users[socket.id] = name;  
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] }); 
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected:", socket.id);  // Debugging
    });
});
