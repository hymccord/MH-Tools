const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Furoma Rift")
  },
  series: [
    {
      // outside
      phase: [
        {
          vars: { stage: { Outside: true } },
          fields: { stage: "Training Grounds" }
        }
      ],
      cheese: utils.genVarField("cheese", [
        "Maki String",
        "Magical String",
        "Brie String",
        "Swiss String",
        "Marble String"
      ]),
      opts: [
        {
          opts: {
            exclude: [
              "Armored Archer",
              "Brawny",
              "Dumpling Delivery",
              "Enlightened Labourer",
              "Militant Samurai",
              "Raw Diamond",
              "Rift Guardian",
              "Shaolin Kung Fu",
              "Shinobi",
              "Wandering Monk",
              "Wealth",
            ]
          }
        }
      ]
    },
    {
      // inside
      phase: [
        {
          vars: {
            stage: {
              "Battery 1": true,
              "Battery 2": true,
              "Battery 3": true,
              "Battery 4": true,
              "Battery 5": true,
              "Battery 6": true,
              "Battery 7": true,
              "Battery 8": true,
              "Battery 9": true,
              "Battery 10": true
            }
          },
          fields: { stage: "Pagoda" }
        }
      ],
      cheese: utils.genVarField("cheese", [
        "Maki String",
        "Magical String",
        "Brie String",
        "Swiss String",
        "Marble String",
        "Master Fusion",
        "Rift Combat",
        "Rift Glutter",
        "Rift Susheese",
        "Rift Rumble",
        "Null Onyx Gorgonzola",
        "Ascended"
      ]),
      opts: [
        {
          opts: {
            exclude: [
              "Dancing Assassin",
              "Militant Samurai",
              "Raw Diamond",
              "Shaolin Kung Fu",
              "Shinobi",
              "Student of the Chi Belt",
              "Student of the Chi Claw",
              "Student of the Chi Fang",
              "Wandering Monk",
              "Wealth",
              "Master of the Chi Belt",
              "Master of the Chi Claw",
              "Master of the Chi Fang",
              "Grand Master of the Dojo",
              "Supreme Sensei",
              "Ascended Elder",
            ]
          }
        }
      ]
    }
  ]
};
