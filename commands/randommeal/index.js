module.exports = {
	Name: "randommeal",
	Aliases: ["rmeal"],
	Author: "supinic",
	Cooldown: 10000,
	Description: "Searches for a meal recipe by its name, or fetches a random one, if no search query was provided.",
	Flags: ["mention","pipe"],
	Whitelist_Response: null,
	Static_Data: null,
	Code: (async function randomMeal (context, ...args) {
		let data = null;
		if (args.length === 0) {
			data = await sb.Got("https://www.themealdb.com/api/json/v1/1/random.php").json();
		}
		else {
			data = await sb.Got({
				url: "https://www.themealdb.com/api/json/v1/1/search.php",
				searchParams: new sb.URLParams()
					.set("s", args.join(" "))
					.toString()
			}).json();
	
			if (!data?.meals) {
				return {
					success: false,
					reply: "No recipes found for that query!"
				};
			}
		}
		
		const meal = sb.Utils.randArray(data.meals);
		const ingredients = Object.entries(meal).filter(([key, value]) => /ingredient\d+/i.test(key)).map(([key, value]) => value).filter(Boolean);
	
		return {
			reply: `${meal.strMeal} - Ingredients: ${ingredients.join(", ")} ${meal.strYoutube}`
		};
	}),
	Dynamic_Description: null
};