const utils = require("../_utils");

const regCheese = ["SB+", "Gouda", "Brie"];
const twistedCheese = ["Duskshade Camembert"]

module.exports = {
  default: {
    location: utils.genVarField("location", "Living Garden"),
    config: [
      {
        opts: {
          exclude: ["Lucky"]
        }
      }
    ]
  },
  series: [
    {
      cheese: utils.genVarField("cheese", twistedCheese),
      config: [
        {
          vars: {
            stage: { "Not Pouring": true }
          },
          opts: {
            include: [
              "Camoflower",
              "Carmine the Apothecary",
              "Shroom"
            ]
          },
          fields: { stage: "Not Poured" },
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", regCheese),
      config: [
        {
          vars: {
            stage: { "Not Pouring": true }
          },
          fields: { stage: "Not Poured" },
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", twistedCheese),
      config: [
        {
          vars: {
            stage: { Pouring: true }
          },
          opts: {
            include: [
              "Camoflower",
              "Carmine the Apothecary",
              "Shroom"
            ]
          },
          fields: { stage: "Poured" },
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", regCheese),
      config: [
        {
          vars: {
            stage: { Pouring: true }
          },
          fields: { stage: "Poured" },
        }
      ]
    }
  ]
};
