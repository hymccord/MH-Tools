const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Valour Rift"),
    cheese: utils.genVarField("cheese", ["Gauntlet String"])
  },
  series: [
    {
      phase: utils.genVarField("stage", "Outside"),
      cheese: utils.genVarField("cheese", [
        "Gauntlet String",
        "Magical String",
        "Brie String",
        "Swiss String"
      ]),
      config: [
        {
          opts: {
            exclude: [ "Glitchpaw", "Timid Explorer", "Elixir Maker" ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Floors 1-7"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Cutpurse",
              "Martial",
              "One-Mouse Band",
              "Mouse of Elements",
              "Cursed Crusader",
              "Withered Remains"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Floors 9-15"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Floors 17-23"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments",
              "Prestigious Adventurer"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Floors 25-31+"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments",
              "Prestigious Adventurer",
              "Soldier of the Shade"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "UU Floors 1-7"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Cutpurse",
              "Martial",
              "One-Mouse Band",
              "Mouse of Elements",
              "Cursed Crusader",
              "Withered Remains",
              "Bulwark of Ascent"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "UU Floors 9-15"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments",
              "Bulwark of Ascent"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "UU Floors 17-23"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments",
              "Prestigious Adventurer",
              "Bulwark of Ascent"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "UU Floors 25-31+"),
      config: [
        {
          opts: {
            exclude: [
              "Terrified Adventurer",
              "Unwavering Adventurer",
              "Berzerker",
              "Lumi-lancer",
              "Puppetto",
              "Puppet Champion",
              "Cutpurse",
              "Champion Thief",
              "Martial",
              "Praetorian Champion",
              "One-Mouse Band",
              "Champion Danseuse",
              "Mouse of Elements",
              "Magic Champion",
              "Cursed Crusader",
              "Fallen Champion Footman",
              "Withered Remains",
              "Arch Champion Necromancer",
              "Possessed Armaments",
              "Prestigious Adventurer",
              "Soldier of the Shade",
              "Bulwark of Ascent"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Eclipse"),
      config: [
        {
          opts: 
            {
              exclude: ["Shade of The Eclipse"]
            }
          
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "UU Eclipse"),
      config: [
        {
          opts: {
              exclude: ["The Total Eclipse"]
          }
        }
      ]
    }
  ],
  // postProcess: function(data) {
  //   const floorNormal = [
  //     "Puppetto",
  //     "Cutpurse",
  //     "Martial",
  //     "One-Mouse Band",
  //     "Mouse of Elements",
  //     "Cursed Crusader",
  //     "Withered Remains"
  //   ];

  //   const floorChampion = [
  //     "Puppet Champion",
  //     "Champion Thief",
  //     "Praetorian Champion",
  //     "Champion Danseuse",
  //     "Magic Champion",
  //     "Fallen Champion Footman",
  //     "Arch Champion Necromancer"
  //   ];

  //   const masterArr = [];

  //   // Step 1: Separate into staged buckets
  //   const bucketData = {};
  //   data.map(function(item) {
  //     const stageName = item.stage;//.replace("UU", "Umbra");
  //     Object.assign(item, { stage: stageName });
  //     if (bucketData[stageName] === undefined) bucketData[stageName] = [item];
  //     else bucketData[stageName].push(item);
  //   });

  //   // Step 2: Gather up floor and champion mice
  //   Object.keys(bucketData).forEach(function(phase) {
  //     const combinedData = [];
  //     let sumNormal = 0;
  //     let sumChampion = 0;

  //     bucketData[phase].forEach(function(item) {
  //       if (floorNormal.indexOf(item.mouse) > -1) {
  //         sumNormal += parseFloat(item.attraction);
  //       } else if (floorChampion.indexOf(item.mouse) > -1) {
  //         sumChampion += parseFloat(item.attraction);
  //       } else {
  //         combinedData.push(item);
  //       }
  //     });

  //     if (sumNormal > 0) {
  //       combinedData.push({
  //         stage: phase,
  //         location: "Valour Rift",
  //         cheese: "Gauntlet String",
  //         mouse: "Floor Basic",
  //         attraction: sumNormal.toFixed(2) + "%",
  //         sample: bucketData[phase][0].sample
  //       });
  //     }

  //     if (sumChampion > 0) {
  //       combinedData.push({
  //         stage: phase,
  //         location: "Valour Rift",
  //         cheese: "Gauntlet String",
  //         mouse: "Floor Champion",
  //         attraction: sumChampion.toFixed(2) + "%",
  //         sample: bucketData[phase][0].sample
  //       });
  //     }

  //     combinedData.forEach(function(item) {
  //       masterArr.push(item);
  //     });
  //   });

  //   return masterArr;
  // }
};
