module.exports = {
	Name: "streamgames",
	Aliases: ["games","sg"],
	Author: "supinic",
	Cooldown: 5000,
	Description: "Posts the link to supinic's stream game list on Gist.",
	Flags: ["developer","mention","pipe","system","whitelist"],
	Whitelist_Response: null,
	Static_Data: (() => ({
		gistID: "80356bcd26fe15010ffbe211e5131228"
	})),
	Code: (async function streamGames () {
		return {
			reply: `https://gist.github.com/Supinic/${this.staticData.gistID}`
		};
	}),
	Dynamic_Description: null
};