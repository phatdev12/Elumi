import { WebSocket } from "./Websocket";
import { EventEmitter } from "events";
import fetch from "node-fetch";
import {Endpoint, DiscordApi} from "./Api";
import dotenv from "dotenv";

(async function init() {
	dotenv.config();


	const endpointGateway = (await fetch(Endpoint.init("/gateway"))).json();
	const ws = new WebSocket(`${(await endpointGateway)["url"]}/?v=10&encoding=json`);
	const evnets = ["READY", "INTERACTION_CREATE", "MESSAGE_CREATE"];
	const intent = (1 << 0) + (1 << 1) + (1 << 9) + (1 << 15);

	const payload = {
		op: 2,
		d: {
			token: process.env.TOKEN,
			intents: intent,
			properties: {
				os: "window",
				browser: "chatbot",
				device: "chatbot"
			}
		}
	};
	let datas = "{}";

	ws.on("open", () => {
		ws.send(JSON.stringify(payload));
	});

	ws.on("message", (data) => {
		const { op, d, t } = JSON.parse(data.toString());
		switch (op) {
		case 0:
			break;
		case 10: {
			const { heartbeat_interval } = d;
			const interval = setInterval(() => {
				ws.send(JSON.stringify({ op: 1, d: null }));
			}, heartbeat_interval);
			interval.unref();
			break;
		}
		default:
			break;
		}
		if (t) datas = data.toString();
		if (evnets.includes(t)) (async () => {
			try {
				const { default: init } = await import(
					`./handler/events/${(t as string).toLowerCase()}`
				);
				init(JSON.parse(data.toString()), payload);
			} catch (err) {
				console.log(err);
			}
		})();
	});
	ws.on("close", () => {
		setTimeout(async () => {
			await init();
		}, 1000);
	});
})();

