(function() {
  function setLocationSpecificUrlParams(
    userLocation,
    urlParams,
    userSublocation
  ) {
    var userQuests = user["quests"];
    if (userLocation === "Furoma Rift") {
      var chargeLevel = userQuests["QuestRiftFuroma"]["droid"]["charge_level"];
      if (chargeLevel !== "") {
        var levels = {
          charge_level_one: 1,
          charge_level_two: 2,
          charge_level_three: 3,
          charge_level_four: 4,
          charge_level_five: 5,
          charge_level_six: 6,
          charge_level_seven: 7,
          charge_level_eight: 8,
          charge_level_nine: 9,
          charge_level_ten: 10
        };
        urlParams["battery"] = levels[chargeLevel];
      }
    } else if (userLocation === "Labyrinth") {
      if (userQuests["QuestLabyrinth"]["lantern_status"] === "active") {
        /* Set url param directly instead of using temp variable */
        urlParams["oil"] = "On";
      }
    } else if (userLocation === "Fort Rox") {
      var fort = userQuests["QuestFortRox"]["fort"];
      urlParams["ballistaLevel"] = fort["b"]["level"];
      urlParams["cannonLevel"] = fort["c"]["level"];
    } else if (userLocation === "Zugzwang's Tower") {
      urlParams["amplifier"] = user["viewing_atts"]["zzt_amplifier"];
    } else if (userLocation === "Sand Crypts") {
      urlParams["saltLevel"] =
        userQuests["QuestSandDunes"]["minigame"]["salt_charms_used"];
    }
  }

  function getUserTournament() {
    if (document.querySelector("div.tournamentStatusHud") !== null) {
      var tourney = user["viewing_atts"]["tournament"];
      if (tourney["status"] === "active" || tourney["status"] === "pending") {
        /* Set url param directly instead of using temp variable */
        return tourney["name"];
      }
    }
  }

  function findSublocation(userLocation, userBase, userCheese) {
    var userQuests = user["quests"];
    var userViewingAtts = user["viewing_atts"];

    if (userLocation === "Balack's Cove") {
      var tide = userQuests["QuestBalacksCove"]["tide"]["level"];
      if (tide === "low") {
        return "Low Tide";
      } else if (tide === "med") {
        return "Medium Tide";
      } else if (tide === "high") {
        return "High Tide";
      }
    } else if (userLocation === "Burroughs Rift") {
      var tier = userQuests["QuestRiftBurroughs"]["mist_tier"];
      var tierMapping = {
        tier_0: "Mist Level 0",
        tier_1: "Mist Level 1-5",
        tier_2: "Mist Level 6-18",
        tier_3: "Mist Level 19-20"
      };
      return userCheese === "Undead String Emmental"
        ? userCheese
        : tierMapping[tier];
    } else if (userLocation === "Fiery Warpath") {
      var wave = userViewingAtts["desert_warpath"]["wave"];
      if (wave === "portal") return "Portal";
      return "Wave " + wave;
    } else if (userLocation === "Fort Rox") {
      var fortRoxQuest = userQuests["QuestFortRox"];
      var tmpPhase = fortRoxQuest["current_phase"];
      if (tmpPhase === "day") {
        return "Day";
      } else if (tmpPhase === "dawn") {
        return "Dawn";
      } else if (tmpPhase === "night") {
        var stage = fortRoxQuest["current_stage"];
        var stages = {
          stage_one: "Twilight",
          stage_two: "Midnight",
          stage_three: "Pitch",
          stage_four: "Utter Darkness",
          stage_five: "First Light"
        };
        return stages[stage];
      } else if (fortRoxQuest["is_lair"]) {
        return "Heart of the Meteor";
      } else {
        return tmpPhase;
      }
    } else if (userLocation === "Gnawnian Express Station") {
      var onTrain = userQuests["QuestTrainStation"]["on_train"];
      if (onTrain) {
        var trainData = userViewingAtts["tournament"]["minigame"];
        var stageName = trainData["name"];
        if (stageName === "Supply Depot") {
          var supplyHoarder = trainData["supply_hoarder_turns"];
          if (supplyHoarder > 0) {
            return "Supply Depot (Supply Rush)";
          } else if (supplyHoarder === 0) {
            return "Supply Depot (No Supply Rush)";
          }
        } else if (
          stageName === "Raider River" ||
          stageName === "Daredevil Canyon"
        ) {
          return stageName;
        }
      }
    } else if (userLocation === "Iceberg") {
      var sublocation = userQuests["QuestIceberg"]["current_phase"];
      if (sublocation === "General") {
        return "Generals";
      }
      if (sublocation === "Hidden Depths") {
        return "The Hidden Depths";
      }
      if (
        (sublocation === "Treacherous Tunnels" ||
          sublocation === "Bombing Run" ||
          sublocation === "The Mad Depths") &&
        userBase === "Magnet Base"
      ) {
        return sublocation + " (Magnet)";
      } else if (
        sublocation === "The Mad Depths" &&
        userBase === "Hearthstone Base"
      ) {
        return sublocation + " (Hearthstone)";
      } else if (
        (sublocation === "Treacherous Tunnels" ||
          sublocation === "Bombing Run" ||
          sublocation === "The Mad Depths") &&
        (userBase === "Ultimate Iceberg Base" ||
          userBase === "Iceberg Boiler Base")
      ) {
        return sublocation + " (Ultimate Iceberg)";
      }
      return sublocation;
    } else if (userLocation === "Labyrinth") {
      var hallwayName = userQuests["QuestLabyrinth"]["hallway_name"];

      if (contains(hallwayName, "Short"))
        hallwayName = hallwayName.slice(6, hallwayName.length);
      else if (contains(hallwayName, "Medium"))
        hallwayName = hallwayName.slice(7, hallwayName.length);
      else if (contains(hallwayName, "Long"))
        hallwayName = hallwayName.slice(5, hallwayName.length);
      hallwayName = hallwayName.slice(0, hallwayName.indexOf(" Hallway"));
      return hallwayName;
    } else if (userLocation === "Living Garden") {
      if (
        userQuests["QuestLivingGarden"]["minigame"]["bucket_state"] === "dumped"
      ) {
        return "Poured";
      }
    } else if (userLocation === "Moussu Picchu") {
      var UP_DIRECTION = "up";
      var LEVEL_KEY = "level";
      var DIRECTION_KEY = "direction";
      var RAIN_KEY = "rain";
      var WIND_KEY = "wind";
      var PERCENT_KEY = "percent";

      var elements = userQuests["QuestMoussuPicchu"]["elements"];
      var stormLevel = elements["storm"][LEVEL_KEY];

      // storm.level tends to be inaccurate behind near thresholds
      if (userCheese === "Dragonvine Cheese") {
        var stormPercent = Math.min(elements[RAIN_KEY][PERCENT_KEY], elements[WIND_KEY][PERCENT_KEY]);
        if (stormPercent === 100) {
          stormLevel = "max";
        } else if (stormPercent >= 80) {
          stormLevel = "high";
        } else if (stormPercent >= 35) {
          stormLevel = "medium";
        } else {
          stormLevel = "low";
        }
      }

      if (stormLevel !== "none") {
        return "Storm " + stormLevel;
      } else if (elements[RAIN_KEY][DIRECTION_KEY] === UP_DIRECTION) {
        return "Rain " + elements[RAIN_KEY][LEVEL_KEY];
      } else if (elements[WIND_KEY][DIRECTION_KEY] === UP_DIRECTION) {
        return "Wind " + elements[WIND_KEY][LEVEL_KEY];
      }
    } else if (userLocation === "Twisted Garden") {
      if (
        userQuests["QuestLivingGarden"]["minigame"]["vials_state"] === "dumped"
      ) {
        return "Poured";
      }
    } else if (userLocation === "Lost City") {
      if (userQuests["QuestLostCity"]["minigame"]["is_cursed"] === 1) {
        return "Cursed";
      }
    } else if (userLocation === "Cursed City") {
      if (userQuests["QuestLostCity"]["minigame"]["is_cursed"]) {
        return "Cursed";
      }
    } else if (userLocation === "Sand Dunes") {
      if (userQuests["QuestSandDunes"]["minigame"]["has_stampede"]) {
        return "Stampede";
      }
    } else if (userLocation === "Seasonal Garden") {
      var season = userViewingAtts["season"];
      var seasonMapping = {
        fl: "Fall",
        wr: "Winter",
        sg: "Spring",
        sr: "Summer"
      };
      return seasonMapping[season];
    } else if (userLocation === "Sunken City") {
      sublocation = userQuests["QuestSunkenCity"]["zone_name"];
      if (sublocation === "Sunken City") {
        sublocation = "Docked";
      }
      return sublocation;
    } else if (userLocation === "Toxic Spill") {
      var pollutionQuest = userQuests["QuestPollutionOutbreak"];
      var titles = pollutionQuest["titles"];

      var spillSublocationMap = {
        archduke_archduchess: "Archduke/Archduchess",
        grand_duke: "Grand Duke/Grand Duchess",
        duke_dutchess: "Duke/Duchess",
        count_countess: "Count/Countess",
        baron_baroness: "Baron/Baroness",
        lord_lady: "Lord/Lady",
        hero: "Hero",
        knight: "Knight"
      };

      // TODO: Investigate possibility of using nextStatus and rising/falling
      //  to determine this instead of looping over titles
      for (var key in titles) {
        if (titles.hasOwnProperty(key) && titles[key].active) {
          sublocation = spillSublocationMap[key];
        }
      }
      return sublocation;
    } else if (userLocation === "Whisker Woods Rift") {
      var zones = userQuests["QuestRiftWhiskerWoods"]["zones"];
      var clearing = zones["clearing"]["status"];
      var tree = zones["tree"]["status"];
      var lagoon = zones["lagoon"]["status"];
      var state = "";
      state += clearing + "/" + tree + "/" + lagoon;
      state = state.replace(/low/g, "Low");
      state = state.replace(/high/g, "Medium");
      state = state.replace(/boss/g, "High");
      return state;
    } else if (userLocation === "Fungal Cavern") {
      return userBase === "Gemology Base" ? "Gemology Base" : "Not Gemology";
    } else if (userLocation === "Zokor") {
      var quest = userQuests["QuestAncientCity"];

      var districtname = quest.district_name;
      var district_type = quest.clue_name;
      var district_tier = quest.district_tier;

      if (contains(districtname, "Minotaur")) {
        return "Lair - Each 30+";
      } else if (district_type == "Treasury") {
        var tiers = ["15+", "50+"]
        return `Treasure ${tiers[district_tier - 1]}`
      } else if (district_type == "Farming") {
        var tiers = ["0", "50+"]
        return `Farming ${tiers[district_tier - 1]}`
      } else {
        var tiers = ["15+", "50+", "80+"]
        return `${district_type} ${tiers[district_tier - 1]}`
      }
    } else if (userLocation === "Furoma Rift") {
      if (userQuests["QuestRiftFuroma"]["droid"]["charge_level"]) {
        return "Pagoda";
      } else {
        return "Training Grounds";
      }
    } else if (userLocation === "Bristle Woods Rift") {
      // TODO: "Rift Acolyte Tower" = "Entrance" (is this from chamber_name?)
      var stage = [];
      stage.push(userQuests["QuestRiftBristleWoods"]["chamber_name"]);
      if (
        userQuests["QuestRiftBristleWoods"]["status_effects"]["ng"] === "active"
      ) {
        stage.push("(Paladin's Bane)");
      }
      if (
        userQuests["QuestRiftBristleWoods"]["status_effects"]["st"] === "active"
      ) {
        stage.push("(Pursued)");
      }
      return stage.join(" ");
    } else if (userLocation === "Zugzwang's Tower") {
      var mystic = userViewingAtts["zzt_mage_progress"];
      var tech = userViewingAtts["zzt_tech_progress"];

      const isDoubleRun = (mystic == 16 || tech == 16) && userCheese !== "Checkmate Cheese" || (mystic == 16 && tech == 16);
      const selector = isDoubleRun ? Math.min : Math.max;
      const progress = selector(mystic, tech);
      const type = mystic == progress ? "Mystic" : "Technic";

      let piece;
      if (progress < 8) {
        piece = "Pawn Pincher";
      } else if (progress < 10) {
        piece = "Knights";
      } else if (progress < 12) {
        piece = "Bishops";
      } else if (progress < 14) {
        piece = "Rooks";
      } else if (progress < 15) {
        piece = "Queen";
      } else if (progress < 16) {
        piece = "King";
      } else {
        piece = "Chess Master";
      }

      if (isDoubleRun && piece == "Chess Master") {
        return "Chess Master - Double Run";
      }

      return `${type} ${piece}${isDoubleRun ? " - Double Run" : ""}`;

    } else if (userLocation === "Claw Shot City") {
      // TODO: Separate Bounty hunter attracted/not once new data rolls in
      var poster_active = userQuests["QuestClawShotCity"]["map_active"];
      var has_wanted_poster =
        userQuests["QuestClawShotCity"]["has_wanted_poster"];
      if (!poster_active) {
        return "No Wanted Poster Open";
      } else if (poster_active && !has_wanted_poster) {
        return "Crew";
      }
    } else if (userLocation === "Mousoleum") {
      return userQuests["QuestMousoleum"]["has_wall"] ? "Has Wall" : "No Wall";
    } else if (userLocation === "Queso Geyser") {
      var geyserState = userQuests["QuestQuesoGeyser"]["state"];
      if (geyserState === "collecting") {
        return "Cork Collecting";
      } else if (geyserState === "corked") {
        return "Pressure Building";
      } else if (geyserState === "eruption") {
        return userQuests["QuestQuesoGeyser"]["state_name"];
      }
    } else if (userLocation === "Forbidden Grove") {
      return user["viewing_atts"]["grove_open"] ? "Open" : "Closed";
    } else if (userLocation === "Harbour") {
      if (
        userQuests["QuestHarbour"]["status"] === "searchStarted" &&
        !userQuests["QuestHarbour"]["can_claim"]
      ) {
        return "On Bounty";
      } else {
        return "No Bounty";
      }
    } else if (userLocation === "Valour Rift") {
      if (userQuests["QuestRiftValour"]["state"] === "farming") {
        return "Outside";
      } else if (userQuests["QuestRiftValour"]["state"] === "tower") {
        var vrFloorType = userQuests["QuestRiftValour"]["floor_type"];
        urlParams["vrFloorType"] =
          vrFloorType >= 1 && vrFloorType <= 7 ? vrFloorType - 1 : 0;

        var floorNum = userQuests["QuestRiftValour"]["floor"] || 1;
        var floorStr = userQuests["QuestRiftValour"]["is_eclipse_mode"]
          ? "Umbra "
          : "";

        if (floorNum % 8 === 0) floorStr += "Eclipse";
        else if (floorNum <= 7) floorStr += "Floors 1-7";
        else if (floorNum <= 15) floorStr += "Floors 9-15";
        else if (floorNum <= 23) floorStr += "Floors 17-23";
        else if (floorNum >= 25) floorStr += "Floors 25-31+";

        return floorStr;
      }
    } else if (userLocation === "Floating Islands") {
      var fi = userQuests["QuestFloatingIslands"]["hunting_site_atts"];
      var fiStage = fi["island_name"];

      if (fi["is_enemy_encounter"]) {
        if (fi["is_low_tier_island"]) {
          return "Sky Wardens";
        } else if (fi["is_high_tier_island"]) {
          return "Sky Paragons";
        } else if (fi["is_vault_island"]) {
          return "Empress";
        }
      } else if (userCheese === "Sky Pirate Swiss Cheese") {
        const piratesNum = fi["activated_island_mod_types"].filter(t => t === "sky_pirates").length;
        return `${fi["is_vault_island"] ? "Vault " : "Island "}${piratesNum === 0 ? "No Pirates" : "Pirates x" + piratesNum}`;
      } else if ((userCheese === "Cloud Cheesecake" || userCheese === "Extra Rich Cloud Cheesecake") &&
                  fi["activated_island_mod_types"].filter(i => i === "loot_cache").length >= 2) {
        fiStage += ` - Loot x${fi["activated_island_mod_types"].filter(i => i === "loot_cache").length}`
      } else if (fi["is_vault_island"] && Array.isArray(fi["activated_island_mod_types"])) {
        const panels = {};
        fi["activated_island_mod_types"].forEach(t => t in panels ? panels[t]++ : panels[t] = 1);
        let counter = 0;
        let mod_type = '';
        for (const [type, num] of Object.entries(panels)) {
            if (num >= 3) {
                counter = num;
                mod_type = fi["island_mod_panels"].filter(p => p.type === type)[0].name;
            }
        }
        if (counter && mod_type) {
          fiStage += ` ${counter}x ${mod_type}`;
        }
      }
      return fiStage
    } else if (userLocation === "Table of Contents") {
      var toc = userQuests["QuestTableOfContents"];
      if (toc["is_writing"]) {
        if (toc["progress"]["type"] === "encyclopedia") {
          return "Encyclopedia";
        } else {
          return "Pre-Encyclopedia";
        }
      }
    } else if (userLocation === "Foreword Farm") {
      var farmState = userQuests["QuestForewordFarm"]["mice_state"];
      if (farmState === "no_plants") {
        return "No Plants";
      } else if (farmState === "one_plant") {
        return "One Plant";
      } else if (farmState === "two_plants") {
        return "Two Plants";
      } else if (farmState === "three_plants") {
        return "Three Plants";
      } else if (farmState === "three_papyrus") {
        return "Three Papyrus";
      } else if (farmState === "boss") {
        return "Boss";
      }
    } else if (userLocation === "Bountiful Beanstalk") {
      const bbQuest = userQuests["QuestBountifulBeanstalk"];
      if (bbQuest["in_castle"]) {
        if (bbQuest["castle"]["is_boss_encounter"]) {
          return "Castle Giants";
        } else {
          return bbQuest["castle"]["current_floor"]["name"].replace(" Floor", "");
        }
      } else {
        return bbQuest["beanstalk"]["is_boss_encounter"]
          ? "Beanstalk Boss"
          : "Beanstalk"
      }
    } else if (userLocation === "School of Sorcery") {
      const sosoQuest = userQuests["QuestSchoolOfSorcery"];
      const course = sosoQuest["current_course"];
      if (course["course_type"] === "arcane_101_course") {
        return course["is_boss_encounter"] ? "Arcane Arts - Boss" : "Arcane Arts";
      } else if (course["course_type"] === "shadow_101_course") {
        return course["is_boss_encounter"] ? "Shadow Sciences - Boss" : "Shadow Sciences";
      } else if (course["course_type"] === "exam_course") {
        let pName = course["is_boss_encounter"] ? "Final Exam - Boss" : "Final Exam - ";
        if (course["is_boss_encounter"]) return pName;
        if (course["power_type"] === "arcane") pName += "Arcane";
        if (course["power_type"] === "shadow") pName += "Shadow";
        return pName;
      } else {
        return "Hallway";
      }
    } else if (userLocation === "Draconic Depths") {
      const ddQuest = userQuests["QuestDraconicDepths"];
      if (ddQuest["in_cavern"]) {
        const cavernCategory = ddQuest["cavern"]["category"]; // "fire" | "ice" | "poison" | "elemental"
        const category = cavernCategory.charAt(0).toUpperCase() + cavernCategory.slice(1);

        const currentTier = ddQuest.cavern.loot_tier.current_tier;
        const lootTiers = ddQuest.cavern.loot_tier.tier_data;

        // if we're not at the last tier (currentTier is one indexed), then we need a range '0-99'
        // which consists of the current tier threshold and the next tier threshold - 1
        // otherwise, we just need the a number '750+'
        let range;
        if (currentTier < lootTiers.length) {
            range = `${lootTiers[currentTier - 1].threshold}-${lootTiers[currentTier].threshold - 1}`;
        } else {
            range = `${lootTiers[currentTier - 1].threshold}+`;
        }

        return `Cavern - ${category} ${range}`;
      } else {
        return "Crucible Forge";
      }
    }

    return "N/A";
  }

  function contains(collection, searchElement) {
    return collection.indexOf(searchElement) > -1;
  }

  /**
   * Normalize user rank (i.e. Archduke/Archduchess -> archduke)
   * @returns {string}
   */
  function findUserRank() {
    var userRank = user["title_name"];

    if (
      userRank.indexOf("Archduke") >= 0 ||
      userRank.indexOf("Archduchess") >= 0
    ) {
      return "archduke";
    }

    if (
      userRank.indexOf("Grand Duke") >= 0 ||
      userRank.indexOf("Grand Duchess") >= 0
    ) {
      return "grandduke";
    }

    if (userRank.indexOf("Duke") >= 0 || userRank.indexOf("Duchess") >= 0) {
      return "duke";
    }

    if (userRank.indexOf("Count") >= 0 || userRank.indexOf("Countess") >= 0) {
      return "count";
    }

    if (userRank.indexOf("Baron") >= 0 || userRank.indexOf("Baroness") >= 0) {
      return "baron";
    }

    if (userRank.indexOf("Lord") >= 0 || userRank.indexOf("Lady") >= 0) {
      return "lord";
    }

    if (
      userRank.indexOf("Journeyman") >= 0 ||
      userRank.indexOf("Journeywoman") >= 0
    ) {
      return "journeyman";
    }

    return userRank.toLowerCase();
  }

  if (location.href.indexOf("mousehuntgame.com") < 0) {
    alert("You are not on mousehuntgame.com! Please try again.");
    return;
  }

  if (!user) {
    /* Handles null and undefined */
    alert("User object not found.");
    return;
  }

  /**
   * Controls the names and values placed in URL
   */
  var userLocation = user["environment_name"];
  var userBase = user["base_name"];

  var urlParams = {};
  urlParams["location"] = userLocation;
  urlParams["weapon"] = user["weapon_name"];
  urlParams["base"] = userBase;
  urlParams["charm"] = user["trinket_name"];
  urlParams["tourney"] = getUserTournament();
  urlParams["rank"] = findUserRank();

  if (!user["has_shield"]) {
    urlParams["gs"] = "No";
  }

  // Rounded because of IEEE 754 floating point precision
  urlParams["power_bonus"] = Math.round(user["trap_power_bonus"] * 100);

  var luck_element = document.querySelector(
    ".campPage-trap-trapStat.luck > .value"
  );
  urlParams["total_luck"] =
    luck_element && luck_element.textContent
      ? Number(luck_element.textContent)
      : user["trap_luck"];

  var userCheese = user["bait_name"];
  var userSublocation = findSublocation(userLocation, userBase, userCheese);
  setLocationSpecificUrlParams(userLocation, urlParams, userSublocation);

  // Cheese edge cases
  if (userCheese) {
    if (contains(userCheese, "Empowered")) {
      userCheese = userCheese.slice(10, userCheese.length);
      urlParams["empowered"] = "Yes";
    }

    if (userCheese.indexOf("SUPER|brie+") >= 0) {
      userCheese = "SB+";
    } else if (userCheese.indexOf(" Cheese") >= 0) {
      if (
        contains(userCheese, "Gauntlet") &&
        userCheese !== "Gauntlet String Cheese"
      ) {
        userCheese = userCheese.slice(16, userCheese.length);
        userSublocation = userCheese;
      } else {
        userCheese = userCheese.replace(/ Cheese$/,'');
      }
    } else if (userCheese === "Fusion Fondue") {
      urlParams["location"] = "M400 Hunting";
    }
    urlParams["cheese"] = userCheese;
  }

  // Weapon edge cases
  // if (urlParams["weapon"] === "School of Sharks Trap") {
  //   urlParams["weapon"] = "School of Sharks";
  // }

  if (userSublocation !== "N/A") {
    urlParams["phase"] = userSublocation;
  }

  // Denture Base un-charged check
  if (urlParams["base"].indexOf("Denture Base") > -1) {
    var baseIcon = document.querySelector(
      ".mousehuntHud-userStat.trap.base > .icon"
    );
    if (baseIcon) {
      if (baseIcon.getAttribute("style").indexOf("vteeth") <= 0) {
        urlParams["base"] += " (Toothless)";
      }
    }
  }

  // Prestige Base highest floor check
  if (urlParams["base"] === "Prestige Base") {
    document
      .querySelectorAll(".campPage-trap-trapStat-mathRow-name")
      .forEach(el => {
        if (el.textContent.indexOf("(Highest Umbra Floor") >= 0)
          urlParams["umbraFloor"] = +el.textContent
            .split("(Highest Umbra Floor: ")[1]
            .split(")")[0];
      });
  }

  if (urlParams["weapon"] === "Father Winter's Timepiece Trap") {
    document
    .querySelectorAll(".campPage-trap-trapStat-mathRow-name")
    .forEach(el => {
      if (el.textContent.indexOf("(Acolyte Catches") >= 0)
        urlParams["acolyteCatches"] = +el.textContent
          .split("(Acolyte Catches: ")[1]
          .split(")")[0];
    });
  }

  // Golem Guardian skin module check
  if (urlParams["weapon"].indexOf("Golem Guardian") >= 0) {
    urlParams["weapon"] =
      "Golem Guardian " + user["trap_power_type_name"] + " Trap";
  }

  if (urlParams["weapon"].indexOf("Golem Guardian") >= 0) {
    $.post(
      "https://www.mousehuntgame.com/managers/ajax/users/gettrapcomponents.php",
      {
        hg_is_ajax: 1,
        uh: user.unique_hash
      },
      null,
      "json"
    ).done(function(data) {
      if (data.components) {
        var arr = data.components.filter(function(el) {
          return el["component_type"] === "snow_golem_trap_weapon";
        });

        var urlArr = [0, 0, 0, 0, 0];
        for (var el of arr) {
          switch (el["power_type"]) {
            case "Arcane":
            case "arcn":
              urlArr[0] = el["golem_guardian_charge_percentage"] || 0;
              break;
            case "Forgotten":
            case "frgttn":
              urlArr[1] = el["golem_guardian_charge_percentage"] || 0;
              break;
            case "Hydro":
            case "hdr":
              urlArr[2] = el["golem_guardian_charge_percentage"] || 0;
              break;
            case "Physical":
            case "phscl":
              urlArr[3] = el["golem_guardian_charge_percentage"] || 0;
              break;
            case "Tactical":
            case "tctcl":
              urlArr[4] = el["golem_guardian_charge_percentage"] || 0;
              break;
            default:
          }
        }

        urlParams["golem_charge"] = urlArr;
        sendData(urlParams);
      }
    });
  } else {
    sendData(urlParams);
  }

  function sendData(parameters) {
    var url = "https://mhtools.hankmccord.dev/cre.html?";

    for (var key in parameters) {
      var value = encodeURIComponent(parameters[key]);
      if (key === "golem_charge") {
        value = "%5B" + value + "%5D";
      }
      url += key + "=" + value + "&";
    }

    var newWindow = window.open("", "mhcre");
    newWindow.location = url;
  }
})();
