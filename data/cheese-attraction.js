/**
 * Runny and [Extra Sweet] Cupcake Colby have either null attraction_bonus or low data
 *
 * 2018-07-05: 105/112 cheeses total
 * 2018-11-29: Manually added Crimson
 * 2019-06-26: Manually added Rockforth
 * 2019-09-01: Updated all cheeses via 19 Jul data (should be 112/115 total)
 * 2019-10-08: Manually added Gauntlet String guesstimate
 * 2020-09-13: Manually added Cloud Cheesecake and Pirate Swiss guesstimates
 * 2021-10-14: Updated cheese attraction rate from gameplay update posted on 2021-10-05 https://www.mousehuntgame.com/newspost.php?news_post_id=584
 *  -Standard Cheese AR updates
 *  -if AR < .7 --> new AR is .7
 *  -if AR >= .95 --> new AR is 1
 * 2026-01-21: Removed cheese that has an AR of 1.0. Any cheese not listed has an AR of 1.0
 */

// prettier-ignore
var baselineAttArray = {
  "Arctic Asiago": 0.9000, // Guesstimate | Calculated: 0.8513, Sample: 10204 (Very High)
  "Bland Queso": 0.9000, // Guesstimate | Calculated: 0.9002, Sample: 224586 (Excellent)
  "Brie": 0.8500, // 2021-10-05 Gameplay Update
  "Brie String": 0.8500, // 2021-10-05 Gameplay Update
  "Candy Corn": 0.9700, // Guesstimate | Calculated: 0.9019, Sample: 13913 (High)
  "Cheddar": 0.7000, // 2021-10-05 Gameplay Update
  "Cherry": 0.8800, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Crimson": 0.9000, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Empowered Brie": 0.8500, // 2021-10-05 Gameplay Update
  "Festive Feta": 0.9000, // Sample: 4959 (High)
  "Ghoulgonzola": 0.8957, // Sample: 3123 (High)
  "Gilded": 0.8500, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Gingerbread": 0.9000, // 2021-10-05 Gameplay Update
  "Gouda": 0.9000, // 2021-10-05 Gameplay Update
  "Marble": 0.7500, // 2021-10-05 Gameplay Update
  "Marble String": 0.7500, // 2021-10-05 Gameplay Update
  "Mozzarella": 0.7000, // 2021-10-05 Gameplay Update
  "Nutmeg": 0.9000, // 2021-10-05 Gameplay Update
  "Seasoned Gouda": 0.9000, // Sample: 4275 (High)
  "Snowball Bocconcini": 0.9000, // Sample: 4723 (High)
  "Swiss": 0.8000, // 2021-10-05 Gameplay Update
  "Swiss String": 0.8000, // 2021-10-05 Gameplay Update
  "White Cheddar": 0.7000, // 2021-10-05 Gameplay Update
};
