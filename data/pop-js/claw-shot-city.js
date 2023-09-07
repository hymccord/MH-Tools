const utils = require("../_utils");

const basicCheese = [
  "Cheddar",
  "Mozzarella",
  "Marble",
  "White Cheddar",
  "Swiss",
  "Brie",
  "Gouda",
];

const noActiveMapMice = [
  "Bounty Hunter",
  "Lasso Cowgirl",
  "Prospector",
  "Pyrite",
  "Ruffian",
  "Saloon Gal",
  "Shopkeeper",
  "Tumbleweed"
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Claw Shot City"),
    // After 2022-06-15Z00:00:00 due to 2022-06-14 patch notes: https://www.mousehuntgame.com/newspost.php?news_post_id=651
    after: utils.genVarField("after", 1655251200)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", "SB+"),
      stage: utils.genVarField("stage", ["No Poster", "Has Poster"]),
      config: [
        {
          opts: {
            include: noActiveMapMice,
          },
        },
      ],
    },
    {
      stage: utils.genVarField("stage", ["No Poster", "Has Poster"]),
      cheese: [
        {
          vars: {
            cheese: Object.fromEntries(basicCheese.map((c) => [c, true])),
          },
          fields: {
            cheese: "Standard",
          },
        },
      ],
      config: [
        {
          opts: {
            include: noActiveMapMice,
          },
        },
      ],
    },
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]}
   */
  postProcess: function(data) {
    return data;
  },
};
