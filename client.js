import net from 'node:net';
import readline from 'readline/promises';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const port = 3016;
const socket = net.createConnection(
	{
		port,
	},
	onConnected,
);

async function onConnected() {
	console.log('Connected to server! ✅');
	const name = await rl.question('What is your name? ');
	socket.write(name);

	socket.on('data', chunk => {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(chunk.toString());
		message();
	});

	async function message() {
		const text = await rl.question('Message > ');
		socket.write(text);

		process.stdout.moveCursor(0, -1);

		message();
	}

	message();
}

socket.on('end', () => {
	console.log();
	console.log('Disconnected from server! ❌');
	process.exit(0);
});
