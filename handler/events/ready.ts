import fetch from "node-fetch";
import {Endpoint} from "../../Api";
import { RawData } from "ws";
import {commands} from "../../typing/commands";

export default async function (data: any, payload: any) {
	const endpoint = Endpoint.init(`/applications/${data["d"]["user"]["id"]}/commands`);
	fetch(endpoint, {
		headers: {
			Authorization: `Bot ${payload.d.token}`,
			"Content-Type": "application/json",
			"User-Agent": "DiscordBot (https://folody.xyz, 1.0.0)",
		},
		body: JSON.stringify([
			{
				name:"create",
				description: "Create a chat event",
				options: [
					{
						name: "message",
						description: "Enter the message",
						type: 3,
						required: true,
					},
				],
				type: 1
			}
		] as commands[]),
		method: "PUT"
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	}).then((res) => {

	}).catch(err => console.log(err));
}