import fetch from "node-fetch";
import {Endpoint} from "../../Api";
import { RawData } from "ws";
import {commands} from "../../typing/commands";

export default async function (data: any, payload: any) {
	const headers =  {
		Authorization: `Bot ${payload.d.token}`,
		"Content-Type": "application/json",
		"User-Agent": "DiscordBot (https://folody.xyz, 1.0.0)",
	};

	if(data["d"]["data"]["name"] == "create") {
		const endpoint = Endpoint.init(`/interactions/${data["d"]["id"]}/${data["d"]["token"]}/callback`);
		const res = await fetch(endpoint, {
			method: "POST",
			headers:headers,
			body: JSON.stringify({
				type: 4,
				data: {
					embeds: [{
						title: "Success create a thread chat",
						description: `**From:** ${data["d"]["data"]["options"][0]["value"]}`
					}]
				}
			})
		});

		const ress = await fetch(Endpoint.init(`/webhooks/${data["d"]["application_id"]}/${data["d"]["token"]}/messages/@original`), {
			headers: headers
		});

		const messageData = await ress.json();
		const thread = await fetch(Endpoint.init(`/channels/${messageData["channel_id"]}/messages/${messageData["id"]}/threads`), {
			headers: headers,
			method: "POST",
			body: JSON.stringify({
				name: "hello",
				rate_limit_per_user: 2,
			})
		});
		const threadData = await thread.json();

		await console.log(threadData);
		await fetch(Endpoint.init(`/channels/${threadData["id"]}/thread-members/@me`), {
			headers: headers,
			method: "PUT",
		});

		await fetch(Endpoint.init(`/channels/${threadData["id"]}/thread-members/${data["d"]["member"]["user"]["id"]}`), {
			headers: headers,
			method: "PUT",
		});

	} 
}
