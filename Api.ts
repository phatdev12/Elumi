import axios from "axios";
import zlib from "zlib";

export class Endpoint {
	private static endpoint = "https://discord.com/api/v10";
	
	public static hostname = "discord.com";
	public static init(href: string): string {
		return this.endpoint+href;
	} 
}

export class DiscordApi {
	private token!: string;
	private data!: any;

	constructor(data: any, token: string) {
		this.token = token;
		this.data = data;
	}
}