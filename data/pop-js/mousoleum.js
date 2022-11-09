const utils = require("../_utils");

const rbCheeses = [
  "Radioactive Blue",
  "Rancid Radioactive Blue",
  "Magical Rancid Radioactive Blue"
];
const emCheeses = ["Undead Emmental", "Undead String Emmental"];
const vampCheeses = ["Crimson", "Moon", "Crescent"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Mousoleum"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            include: [
              "Coffin Zombie",
              "Gluttonous Zombie",
              "Ravenous Zombie",
              "Zombie"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            include: [
              "Coffin Zombie",
              "Gluttonous Zombie",
              "Grave Robber",
              "Ravenous Zombie",
              "Zombie",
              "Zombot Unipire"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", vampCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            include: [
              "Coffin Zombie",
              "Gluttonous Zombie"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", vampCheeses),
      stage: utils.genVarField("stage", "Has Wall"),
      config: [
        {
          opts: {
            include: [
              "Bat",
              "Ghost",
              "Lycan",
              "Mousevina von Vermin",
              "Mummy",
              "Vampire"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: utils.genVarField("stage", "Has Wall"),
      config: [
        {
          opts: {
            include: [
              "Bat",
              "Black Widow",
              "Ghost",
              "Giant Snail",
              "Monster",
              "Mummy",
              "Vampire"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: utils.genVarField("stage", "Has Wall"),
      config: [
        {
          opts: {
            include: [
              "Ghost",
              "Grave Robber",
              "Mummy",
              "Vampire",
              "Zombot Unipire"
            ]
          }
        }
      ]
    }
  ]
};
