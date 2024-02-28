(function() {
  const WISDOM = ["data/mouse-wisdom.csv"];
  const GOLD_POINTS = ["data/mouse-gold-points.csv"];
  const POWER_EFFS = ["data/mouse-power-effs.csv"];
  const csv = require("csvtojson");
  const fs = require("fs");
  const fileUtils = require("./file-utils");
  fileUtils.makeDirectory("data/json");

  const mouseWisdom = {};
  const csvConverterWisdom = csv({
    colParser: {
      wisdom: "Number"
    }
  });

  const inputStreamWisdom = fileUtils.createCombinedStream(WISDOM);
  csvConverterWisdom
    .fromStream(inputStreamWisdom)
    .on("json", jsonObj => {
      mouseWisdom[jsonObj.mouse] = jsonObj.wisdom;
    })
    .on("done", error => {
      fileUtils.saveJsonFile("data/json/mouse-wisdom.json", mouseWisdom);
    });

  const goldPoints = {};
  const csvConverterGoldPoints = csv({
    colParser: {
      Gold: "Number",
      Points: "Number"
    }
  });

  const inputStreamGoldPoints = fileUtils.createCombinedStream(GOLD_POINTS);
  csvConverterGoldPoints
    .fromStream(inputStreamGoldPoints)
    .on("json", jsonObj => {
      goldPoints[jsonObj.Mouse] = [];
      goldPoints[jsonObj.Mouse].push(jsonObj.Gold);
      goldPoints[jsonObj.Mouse].push(jsonObj.Points);
    })
    .on("done", error => {
      fileUtils.saveJsonFile("data/json/mouse-gold-points.json", goldPoints);
    });

  const powerEffs = {};
  const csvConverterPowerEffs = csv({
    colParser: {
      Power: "Number",
      Arcane: "Number",
      Draconic: "Number",
      Forgotten: "Number",
      Hydro: "Number",
      Parental: "Number",
      Physical: "Number",
      Shadow: "Number",
      Tactical: "Number",
      Law: "Number",
      Rift: "Number"
    }
  });

  const inputStreamPowerEffs = fileUtils.createCombinedStream(POWER_EFFS);
  csvConverterPowerEffs
    .fromStream(inputStreamPowerEffs)
    .on("json", jsonObj => {
      powerEffs[jsonObj.Mouse] = [];
      powerEffs[jsonObj.Mouse].push(jsonObj.Power);
      powerEffs[jsonObj.Mouse].push(jsonObj.Arcane);
      powerEffs[jsonObj.Mouse].push(jsonObj.Draconic);
      powerEffs[jsonObj.Mouse].push(jsonObj.Forgotten);
      powerEffs[jsonObj.Mouse].push(jsonObj.Hydro);
      powerEffs[jsonObj.Mouse].push(jsonObj.Parental);
      powerEffs[jsonObj.Mouse].push(jsonObj.Physical);
      powerEffs[jsonObj.Mouse].push(jsonObj.Shadow);
      powerEffs[jsonObj.Mouse].push(jsonObj.Tactical);
      powerEffs[jsonObj.Mouse].push(jsonObj.Law);
      powerEffs[jsonObj.Mouse].push(jsonObj.Rift);
    })
    .on("done", error => {
      fileUtils.saveJsonFile("data/json/mouse-power-effs.json", powerEffs);
    });
})();
