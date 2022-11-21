const utils = require("../_utils");

const string_cheeses = [
  "Marble String",
  "Swiss String",
  "Brie String",
  "Magical String"
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Burroughs Rift"),
    config: [
      {
        opts: {
          exclude: ["Glitchpaw"]
        }
      }
    ]
  },
  series: [
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 0"),
      config: [
        {
          opts: {
            exclude: [
              "Amplified Brown",
              "Amplified Grey",
              "Amplified White",
              "Automated Sentry",
              "Cybernetic Specialist",
              "Doktor",
              "Evil Scientist",
              "Portable Generator",
              "Rift Bio Engineer",
              "Surgeon Bot"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            exclude: [
              "Count Vampire",
              "Phase Zombie",
              "Prototype",
              "Robat",
              "Tech Ravenous Zombie",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            exclude: [
              "Clump",
              "Cyber Miner",
              "Itty Bitty Rifty Burroughs",
              "Pneumatic Dirt Displacement",
              "Rifterranian",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            exclude: [
              "Mecha Tail",
              "Radioactive Ooze",
              "Toxikinetic"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            exclude: [
              "Count Vampire",
              "Lycanoid",
              "Phase Zombie",
              "Prototype",
              "Revenant",
              "Robat",
              "Tech Ravenous Zombie",
              "Zombot Unipire the Third"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            exclude: [
              "Boulder Biter",
              "Clump",
              "Cyber Miner",
              "Itty Bitty Rifty Burroughs",
              "Lambent",
              "Master Exploder",
              "Pneumatic Dirt Displacement",
              "Rifterranian",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            exclude: [
              "Mecha Tail",
              "Radioactive Ooze",
              "Rancid Bog Beast",
              "Super Mega Mecha Ultra RoboGold",
              "Toxic Avenger",
              "Toxikinetic",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            exclude: ["Monstrous Abomination"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            exclude: ["Big Bad Behemoth Burroughs"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            exclude: [
              "Assassin Beast",
              "Menace of the Rift",
              "Null Gauntle",
              "Rift Circuitr",
              "Plutonium Tentacle",
              "Rancid Bog Beast",
              "Super Mega Mecha Ultra RoboGold",
              "Toxic Avenger"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Undead String Emmental"),
      config: [
        {
          fields: { stage: "Undead String Emmental" },
          opts: {
            exclude: [
              "Count Vampire",
              "Lycanoid",
              "Phase Zombie",
              "Revenant",
              "Tech Ravenous Zombie",
              "Tomb Exhumer",
              "Zombot Unipire the Third",
            ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      return Object.assign(item, { stage: item.stage.replace(/Mist/g, "Mist Level") });
    });
  }
};
