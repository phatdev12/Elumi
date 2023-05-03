import fetch from "node-fetch";
import {Endpoint} from "../../Api";
import { RawData } from "ws";
import {commands} from "../../typing/commands";

export default async function (data: any, payload: any) {
	if(data["d"]["data"]["name"] == "create") {
		const endpoint = Endpoint.init(`/interactions/${data["d"]["id"]}/${data["d"]["token"]}/callback`);
		fetch(endpoint, {
			method: "POST",
			headers: {
				Authorization: `Bot ${payload.d.token}`,
				"Content-Type": "application/json",
				"User-Agent": "DiscordBot (https://folody.xyz, 1.0.0)",
			},
			body: JSON.stringify({
				type: 4,
				data: {
					embeds: [{
						title: "Success create a thread chat",
						description: `**From:** ${data["d"]["data"]["options"][0]["value"]}`
					}]
				}
        
			})
		}).then(res => {
			console.log(data["d"]);
		});
	} 
  
}