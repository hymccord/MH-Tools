const utils = require("../_utils");

const miceByStageThenCheese = {
  "Cork Collecting": {
    "Bland Queso": ["Fuzzy Drake"],
    "Mild Queso": ["Fuzzy Drake", "Cork Defender"],
    "Medium Queso": ["Fuzzy Drake", "Cork Defender", "Burly Bruiser", "Corky the Collector"],
    "Hot Queso": ["Fuzzy Drake", "Cork Defender", "Burly Bruiser", "Corky the Collector", "Horned Cork Hoarder"],
    "Flamin' Queso": ["Cork Defender", "Burly Bruiser", "Corky the Collector", "Horned Cork Hoarder", "Rambunctious Rain Rumbler"],
    "Wildfire Queso": ["Corkataur"],
  },
  "Pressure Building": {
    "Mild Queso": ["Steam Sailor"],
    "Medium Queso": ["Steam Sailor", "Warming Wyvern"],
    "Hot Queso": ["Steam Sailor", "Warming Wyvern", "Vaporior"],
    "Flamin' Queso": ["Steam Sailor", "Warming Wyvern", "Vaporior", "Pyrehyde"],
    "Wildfire Queso": ["Emberstone Scaled"],
  },
  "Tiny Eruption": {
    "Mild Queso": ["Mild Spicekin"],
    "Medium Queso": ["Mild Spicekin", "Smoldersnap"],
    "Hot Queso": ["Mild Spicekin", "Smoldersnap", "Ignatia"],
    "Flamin' Queso": ["Mild Spicekin", "Smoldersnap", "Ignatia", "Bruticus the Blazing"],
  },
  "Small Eruption": {
    "Mild Queso": ["Mild Spicekin", "Sizzle Pup"],
    "Medium Queso": ["Mild Spicekin", "Sizzle Pup", "Smoldersnap"],
    "Hot Queso": ["Mild Spicekin", "Sizzle Pup", "Smoldersnap", "Ignatia"],
    "Flamin' Queso": ["Sizzle Pup", "Smoldersnap", "Ignatia", "Bruticus the Blazing"],
  },
  "Medium Eruption": {
    "Mild Queso": ["Mild Spicekin", "Bearded Elder",],
    "Medium Queso": ["Mild Spicekin", "Smoldersnap", "Bearded Elder"],
    "Hot Queso": ["Mild Spicekin", "Smoldersnap", "Bearded Elder", "Ignatia"],
    "Flamin' Queso": ["Smoldersnap", "Bearded Elder", "Ignatia", "Bruticus the Blazing"],
  },
  "Large Eruption": {
    "Mild Queso": ["Mild Spicekin", "Cinderstorm"],
    "Medium Queso": ["Mild Spicekin", "Smoldersnap", "Cinderstorm"],
    "Hot Queso": ["Mild Spicekin", "Smoldersnap", "Ignatia", "Cinderstorm"],
    "Flamin' Queso": ["Smoldersnap", "Ignatia", "Cinderstorm", "Bruticus the Blazing"],
  },
  "Epic Eruption": {
    "Mild Queso": ["Mild Spicekin", "Stormsurge the Vile Tempest"],
    "Medium Queso": ["Mild Spicekin", "Smoldersnap", "Stormsurge the Vile Tempest"],
    "Hot Queso": ["Mild Spicekin", "Smoldersnap", "Ignatia", "Stormsurge the Vile Tempest"],
    "Flamin' Queso": ["Smoldersnap", "Ignatia", "Bruticus the Blazing", "Stormsurge the Vile Tempest"],
    "Wildfire Queso": ["Kalor'ignis of the Geyser"],
  }
}

function genSeries() {
  const series = [];
  for (const [stage, miceByCheese] of Object.entries(miceByStageThenCheese)) {
    for (const [cheese, mice] of Object.entries(miceByCheese)) {
      series.push({
        cheese: utils.genVarField("cheese", cheese),
        stage: utils.genVarField("stage", stage),
        config: [
          {
            opts: {
              include: mice,
            },
          },
        ],
      })
    }
  }

  return series;
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Queso Geyser")
  },
  series: genSeries(),
};
