export class Endpoint {
	private static endpoint = "https://discord.com/api/v10";

	public static init(href: string): string {
		return this.endpoint+href;
	} 
}