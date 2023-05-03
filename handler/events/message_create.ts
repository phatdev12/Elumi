import fetch from "node-fetch";
import {Endpoint} from "../../Api";
import { RawData } from "ws";
import {commands} from "../../typing/commands";

export default async function (data: any, payload: any) {
	const user = await (await fetch(Endpoint.init(`/users/${data["d"]["author"]["id"]}`), {
		headers: {
			Authorization: `Bot ${payload.d.token}`,
			"Content-Type": "application/json",
			"User-Agent": "DiscordBot (https://folody.xyz, 1.0.0)",
		},
	})).json();

	if(data["d"]["author"]["username"] == user.username && data["d"]["author"]["id"] == user.id) { /* empty */ }
  
}