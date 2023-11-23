import net from 'node:net';

const sockets = [];

const server = net.createServer();

server.on('connection', socket => {
	socket.once('data', chunk => {
		console.log('new socket connection');
		socket.name = chunk.toString();
		messageAll(`${socket.name} has joined the chat!`);
		sockets.push(socket);

		socket.on('data', chunk => {
			messageAll(`${socket.name}: ${chunk.toString()}`);
		});

		socket.on('end', () => {
			messageAll(`${socket.name} has left the chat.`);
			sockets.splice(sockets.indexOf(socket), 1);
		});
	});
});

function messageAll(text) {
	sockets.forEach(s => {
		s.write(text);
	});
}

const port = 3016;
server.listen(port, () => {
	console.log(`first server is listening on port ${port}`);
});
