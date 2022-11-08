const utils = require("../_utils");

const basic_cheese = [
    "Swiss",
    "Brie",
    "Gouda",
    "SB+",
]

const havarti_cheese = [
  "Pungent Havarti",
  "Crunchy Havarti",
  "Creamy Havarti",
  "Spicy Havarti",
  "Sweet Havarti",
  "Magical Havarti"
]

module.exports = {
  default: {
    config: [
      {
        opts: {
          attraction: 0.01,
          exclude: ["Glitchpaw", "Lucky"]
        }
      }
    ]
  },
  series: [
    {
      location: utils.genVarField("location", ["Derr Dunes", "Elub Shore", "Nerg Plains"]),
      cheese: utils.genVarField("cheese", basic_cheese)
    },
    {
      location: utils.genVarField("location", "Derr Dunes"),
      cheese: utils.genVarField("cheese", "Crunchy")
    },
    {
      location: utils.genVarField("location", "Elub Shore"),
      cheese: utils.genVarField("cheese", "Shell")
    },
    {
      location: utils.genVarField("location", "Nerg Plains"),
      cheese: utils.genVarField("cheese", "Gumbo")
    },
    {
      location: utils.genVarField("location", "Cape Clawed"),
      cheese: utils.genVarField("cheese", [
        ...basic_cheese,
        "Crunchy", "Shell", "Gumbo"
      ])
    },
    {
      location: utils.genVarField("location", "Jungle of Dread"),
      cheese: utils.genVarField("cheese", [
        ...basic_cheese,
        ...havarti_cheese
      ])
    },
    {
      location: utils.genVarField("location", "Dracano"),
      cheese: utils.genVarField("cheese", "Inferno Havarti")
    }
  ],
};