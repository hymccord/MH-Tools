(function() {
  // name: type
  const categories = {
    "Indigenous Mice": "common",
    "Dock Dwellers": "dock",
    "Mountain Mice": "mountain",
    "Forest Guild": "forest",
    "Lab Experiments": "lab",
    "Shadow Clan": "shadow",
    "Digby Dirt Dwellers": "dirt",
    "Followers of Furoma": "furoma",
    "The Forgotten Mice": "forgotten",
    "Aquatic Order": "hydro",
    "The Elub Tribe": "elub",
    "The Nerg Tribe": "nerg",
    "The Derr Tribe": "derr",
    "The Dreaded Horde": "dread",
    "Draconic Brood": "dracaonic",
    "Balack's Banished": "balack",
    "Gauntlet Gladiators": "gauntlet",
    "Seasonal Soldiers": "seasonal",
    "Wizard's Pieces": "chess",
    "Zurreal's Breed": "zzlibrary",
    "Icewing's Invasion": "iceberg",
    "Wild Bunch": "wild_bunch",
    "Train Robbers": "train_robbers",
    "Meteorite Miners": "fort_rox",
    "The Marching Flame": "desertarmy",
    "Muridae Market Mice": "desertmarket",
    "Living Garden Mice": "living_garden",
    "Lost City Mice": "lost_city",
    "Sand Dunes Mice": "sand_dunes",
    "Queso Canyoneers": "queso_canyon",
    "Deep Sea Dwellers": "deep_sea_dwellers",
    "Fungal Fiends": "fungal_cavern",
    "Citizens of Zokor": "ancient_city",
    "Moussu Picchu Inhabitants": "moussu_picchu",
    "Floating Islanders": "floating_island",
    "Foreword Farmers": "foreword_farm",
    "Prologue Pond Prowlers": "prologue_pond",
    "Storytellers": "table_of_contents",
    "Beanstalkers": "bountiful_beanstalk",
    "Rift Walkers": "rift_walkers",
    "Rift Stalkers": "rift_stalkers",
    "The Polluted": "polluted",
    "Event Mice": "event"
  };

  const subcategories = {
    "Indigenous Mice": ["Misc.", "Great Gnawnian Games", "Rare Rodents"],
    "Dock Dwellers": ["Misc."],
    "Mountain Mice": ["Misc."],
    "Forest Guild": ["Misc."],
    "Lab Experiments": ["Misc."],
    "Shadow Clan": ["Misc."],
    "Digby Dirt Dwellers": ["Misc."],
    "Followers of Furoma": ["Misc."],
    "The Forgotten Mice": ["Misc."],
    "Aquatic Order": ["Misc."],
    "The Elub Tribe": ["Misc."],
    "The Nerg Tribe": ["Misc."],
    "The Derr Tribe": ["Misc."],
    "The Dreaded Horde": ["Misc."],
    "Draconic Brood": ["Misc."],
    "Balack's Banished": ["Misc."],
    "Gauntlet Gladiators": [
      "Tier 1: Puppet",
      "Tier 2: Thief",
      "Tier 3: Melee",
      "Tier 4: Bard",
      "Tier 5: Magic",
      "Tier 6: Noble",
      "Tier 7: Dust",
      "Tier 8: The Eclipse"
    ],
    "Seasonal Soldiers": ["Spring", "Summer", "Fall", "Winter"],
    "Wizard's Pieces": ["Misc.", "Mystic", "Technic"],
    "Zurreal's Breed": ["Misc."],
    "Icewing's Invasion": [
      "Misc.",
      "Bergling",
      "Tunnel Rat",
      "Brute",
      "Bomb Squad",
      "Zealot",
      "Icewing's Generals"
    ],
    "Wild Bunch": ["Misc.", "Crew", "Ringleader"],
    "Train Robbers": [
      "Passenger",
      "Depot Worker",
      "Automice",
      "Raider",
      "Fueler"
    ],
    "Meteorite Miners": [
      "Misc.",
      "Weremice",
      "Cosmic Critter",
      "Special",
      "Dawn Destroyer"
    ],
    "The Marching Flame": [
      "Archer",
      "Artillery",
      "Cavalry",
      "Mage",
      "Scout",
      "Warrior",
      "Support",
      "Command"
    ],
    "Muridae Market Mice": ["Misc."],
    "Living Garden Mice": ["Misc."],
    "Lost City Mice": ["Misc."],
    "Sand Dunes Mice": ["Misc."],
    "Queso Canyoneers": [
      "River Riders",
      "Spice Mice",
      "Quarry Quarries",
      "Cork Collector",
      "Pressure Builder",
      "Geyser Hunter"
    ],
    "Deep Sea Dwellers": [
      "Sunken City Citizen",
      "Finned Fiend",
      "Coral Corral",
      "Barnacled Bunch",
      "Scale Society",
      "Treasure Troop",
      "Predator Pack"
    ],
    "Fungal Fiends": [
      "Fungal Fodder",
      "Gruyere Grazer",
      "Mineral Muncher",
      "Gemstone Gorger",
      "Diamond Devourer"
    ],
    "Citizens of Zokor": [
      "Hallway Wanderer",
      "Fungal Farmer",
      "Lost Scholar",
      "Fealty Sworn Soldier",
      "Tech Engineer",
      "Treasure Miser",
      "Hidden Remnant"
    ],
    "Moussu Picchu Inhabitants": [
      "Fungal Feeder",
      "Potion Brewer",
      "Wind Wanderer",
      "Rain Roamer",
      "Storm Dragon"
    ],
    "Floating Islanders": [
      "Launch Pad",
      "Cloud Commoners",
      "Physical Pummelers",
      "Shadow Overcasters",
      "Tactical Dog Fighters",
      "Atmospheric Arcane",
      "Floating Forgotten",
      "Hovering Hydro",
      "Dashing Dragons",
      "Lofty Lawbreakers",
      "Sky Pirates",
      "Sky Wardens",
      "Sky Paragons",
      "The Richest"
    ],
    "Foreword Farmers": ["Seed Stowers", "Petulant Pests"],
    "Prologue Pond Prowlers": [
      "Grub Gatherers",
      "Shallow Swimmers",
      "Deep Divers"
    ],
    "Storytellers": [
      "Folklore Authors",
      "Folklore Characters",
      "Folklore Masterminds"
    ],
    "Beanstalkers": [
      "Budding Baddies",
      "Dungeon Dwellers",
      "Ballroom Blitzers",
      "Ruthless Royals"
    ],
    "Rift Walkers": ["Gnawnia Rift", "Burroughs Rift", "Whisker Woods Rift"],
    "Rift Stalkers": ["Bristle Woods Rift", "Furoma Rift", "Valour Rift"],
    "The Polluted": ["Misc."],
    "Event Mice": [
      "Great Winter Hunt",
      "Halloween",
      "Spring Egg Hunt",
      "New Year",
      "Misc.",
      "Prize",
      "Birthday",
      "Lunar New Year",
      "Valentine's"
    ]
  };

  const trapTypes = [
    "Arcane",
    "Draconic",
    "Forgotten",
    "Hydro",
    "Parental",
    "Physical",
    "Shadow",
    "Tactical",
    "Law",
    "Rift"
  ];

  /**
   * Motivation: page.php got neutered (no relevant data returned at all using previous request payload)
   *
   * - Current Implementation -
   * Gist: Hit "managers/ajax/mice/getstat.php" with "action=get_mice" and separate mouse_types[] strings (e.g. factory_technician, reality_restitch)
   *
   * 1. Select high level group from 1st dropdown, fill in payload with hardcoded categories[] type_key
   * 2. Fire request to mouse_list.php to fetch subgroups (includes mouse names + type_keys)
   * 2a. Sample: https://www.mousehuntgame.com/managers/ajax/mice/mouse_list.php?sn=Hitgrab&hg_is_ajax=1&action=get_group&category=moussu_picchu&user_id=3795351&display_mode=images&view=ViewMouseListGroups&uh=5qo31GKr
   * 3. Cache subgroup data (see format below) and re-render
   * 3a.  Format: {
   *                location: {
   *                   subgroup: {
   *                      "type": subgroup_key,
   *                      "miceObj": {
   *                        Mouse A: mouse_key_a,
   *                        Mouse B: mouse_key_b
   *                      },
   *                      "miceArr": [mouse_key_a, mouse_key_b]
   *                    },
   *                    "timestamp": Date.now()
   *                  }
   *              }
   * 4. Use hardcoded subgroup names for the 2nd dropdown like before
   * 5. When 'Go' is clicked, access list of corresponding subgroup type_keys from cache and build query string for getstat.php
   * 5b. Sample: https://www.mousehuntgame.com/managers/ajax/mice/getstat.php?sn=Hitgrab&hg_is_ajax=1&action=get_mice&uh=dtBZ9ZE7&mouse_types[]=rift_worker&mouse_types[]=rift_dumpling_chef&mouse_types[]=rift_archer&mouse_types[]=rift_ninja&mouse_types[]=rift_kung_fu&mouse_types[]=rift_monk&mouse_types[]=rift_samurai&mouse_types[]=rift_assassin&mouse_types[]=rift_belt_student&mouse_types[]=rift_claw_student&mouse_types[]=rift_fang_student&mouse_types[]=rift_belt_master&mouse_types[]=rift_fang_master&mouse_types[]=rift_claw_master&mouse_types[]=rift_dojo_master&mouse_types[]=rift_dojo_sensei&mouse_types[]=rift_hapless
   * 6. Parse basically the same parameters as before (response.mice: name, id, points, gold, difficulty)
   */

  buildUI();

  function main(targetGroup, targetSubgroup, riftMultiplier) {
    const cacheObj =
      JSON.parse(localStorage.getItem("tsitu-powers-subgroups")) || {};

    try {
      const subgroup = cacheObj[targetGroup][targetSubgroup];
      let url = `https://www.mousehuntgame.com/managers/ajax/mice/getstat.php?sn=Hitgrab&hg_is_ajax=1&action=get_mice&uh=${user.unique_hash}`;

      for (let i = 0; i < subgroup.miceArr.length; i++) {
        url += `&mouse_types[]=${subgroup.miceArr[i]}`;
      }

      $.post(url, {}, null, "json").done(data => {
        if (data) {
          // Use selector for trap power because server response is inconsistent
          // Going to another tab and back to Camp borks things up
          let trapType = "";
          const powerStr = $(".campPage-trap-trapStat.power > div:nth-child(2)")
            .map(function() {
              return $(this).context.textContent;
            })
            .toArray()[0];
          const trapPower = parseInt(powerStr.replace(/,/g, ""));

          for (let i = 0; i < trapTypes.length; i++) {
            if (powerStr.indexOf(trapTypes[i]) > -1) {
              trapType = trapTypes[i];
            }
          }

          const outputObj = {}; // to be passed as window.name
          // phase out trap-data with computed power type / total power?
          outputObj["user-data"] = {};
          outputObj["user-data"].weapon = user.weapon_name;
          outputObj["user-data"].base = user.base_name;
          outputObj["user-data"].charm = user.trinket_name
            ? user.trinket_name
            : "Baitkeep Charm"; // Default 0/0 placeholder
          outputObj["user-data"]["power-bonus"] = user.trap_power_bonus;
          outputObj["user-data"].battery = 0;
          outputObj["user-data"]["zt-amp"] = 100;
          outputObj["user-data"]["tg-pour"] = false;
          outputObj["user-data"]["rift-multiplier"] = riftMultiplier;

          outputObj["user-data"].empowered = false;
          if (user.bait_name && user.bait_name.indexOf("Empowered") > -1) {
            outputObj["user-data"].empowered = true;
          }

          const userLocation = user.environment_name;
          const userQuests = user.quests;
          if (userLocation === "Furoma Rift") {
            const chargeLevel = userQuests.QuestRiftFuroma.droid.charge_level;
            if (chargeLevel !== "") {
              const levels = {
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
              outputObj["user-data"].battery = levels[chargeLevel];
            }
          } else if (userLocation === "Zugzwang's Tower") {
            outputObj["user-data"]["zt-amp"] = user.viewing_atts.zzt_amplifier;
          } else if (userLocation === "Twisted Garden") {
            if (
              userQuests.QuestLivingGarden.minigame.vials_state === "dumped"
            ) {
              outputObj["user-data"]["tg-pour"] = true;
            }
          }

          const currentTime = Date.now();
          outputObj["user-data"].timestamp = currentTime;
          outputObj["user-data"]["dom-trap-type"] = trapType;
          outputObj["user-data"]["dom-trap-power"] = trapPower;
          console.group(
            `Displayed Power: ${trapPower} (${trapType})` +
              ` [${new Date(currentTime)}]`
          );

          const groupName = `${targetGroup} (${targetSubgroup})`;
          outputObj["mouse-data"] = {};
          outputObj["mouse-data"][groupName] = {};

          console.group(`Group: ${groupName}`);
          for (let j = 0; j < data.mice.length; j++) {
            const mouse = data.mice[j];
            const mouseName = mouse.abbreviated_name.trim();
            console.log(`${mouseName} (${mouse.difficulty})`);
            const mouseObj = {};
            mouseObj.id =
              typeof mouse.id === "number"
                ? mouse.id
                : parseInt(mouse.id.replace(/,/g, ""));
            mouseObj.gold =
              typeof mouse.gold === "number"
                ? mouse.gold
                : parseInt(mouse.gold.replace(/,/g, ""));
            mouseObj.points =
              typeof mouse.points === "number"
                ? mouse.points
                : parseInt(mouse.points.replace(/,/g, ""));
            mouseObj.difficulty = mouse.difficulty;
            const effObj = {};
            effObj.Arcane = 0;
            effObj.Draconic = 0;
            effObj.Forgotten = 0;
            effObj.Hydro = 0;
            effObj.Parental = 0;
            effObj.Physical = 0;
            effObj.Shadow = 0;
            effObj.Tactical = 0;
            effObj.Law = 0;
            effObj.Rift = 0;

            let notEffArr = trapTypes;
            const effs = mouse.weaknesses;

            // Rough existence checks
            if (Object.keys(effs).length > 0) {
              if (isIterable(effs.effective)) {
                for (var k = 0; k < effs.effective.length; k++) {
                  var e = effs.effective[k];
                  effObj[e.name] = 100;
                  notEffArr = notEffArr.filter(el => el !== e.name);
                }
              }
              if (isIterable(effs.veryEffective)) {
                for (var k = 0; k < effs.veryEffective.length; k++) {
                  var e = effs.veryEffective[k];
                  effObj[e.name] = ">100";
                  notEffArr = notEffArr.filter(el => el !== e.name);
                }
              }
              if (isIterable(effs.lessEffective)) {
                for (var k = 0; k < effs.lessEffective.length; k++) {
                  var e = effs.lessEffective[k];
                  effObj[e.name] = "<100";
                  notEffArr = notEffArr.filter(el => el !== e.name);
                }
              }
              if (isIterable(notEffArr)) {
                for (var k = 0; k < notEffArr.length; k++) {
                  effObj[notEffArr[k]] = 0;
                }
              }
            }

            // Populate effs array
            mouseObj.effs = [];
            mouseObj.effs.push(effObj.Arcane);
            mouseObj.effs.push(effObj.Draconic);
            mouseObj.effs.push(effObj.Forgotten);
            mouseObj.effs.push(effObj.Hydro);
            mouseObj.effs.push(effObj.Parental);
            mouseObj.effs.push(effObj.Physical);
            mouseObj.effs.push(effObj.Shadow);
            mouseObj.effs.push(effObj.Tactical);
            mouseObj.effs.push(effObj.Law);
            mouseObj.effs.push(effObj.Rift);

            outputObj["mouse-data"][groupName][mouseName] = mouseObj;
          }
          console.groupEnd();
          console.groupEnd();

          // console.log(outputObj);
          const newWindow = window.open("");
          // 200 IQ method to transfer stringified data across origins
          newWindow.name = JSON.stringify(outputObj);
          newWindow.location =
            "https://tsitu.github.io/MH-Tools/powers-worksheet.html";
          // newWindow.location = "http://localhost:8000/powers-worksheet.html";
        }
      });
    } catch (error) {
      alert(
        `Please click 'Update Subgroup Data' to perform initial fetch for:\n\n${targetGroup}`
      );
    }
  }

  // Generate POST form data
  function genPayload(category) {
    return {
      sn: "Hitgrab",
      hg_is_ajax: "1",
      action: "get_group",
      category: categories[category],
      user_id: user.user_id,
      display_mode: "images",
      view: "ViewMouseListGroups",
      uh: user.unique_hash
    };
  }

  // Checks for iterability
  function isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  }

  function buildUI() {
    if (!window.jQuery) {
      alert("Error: jQuery is not enabled on this page");
      return;
    }

    if (!$(".campPage-trap-trapStat.power > div:nth-child(2)").length) {
      alert(
        "Error: Can't find total trap power value\n\nPlease make sure you are on the Camp page of mousehuntgame.com and have FreshCoat enabled"
      );
      return;
    }

    const existing = document.getElementById("mht-mouse-powers-tool");
    if (existing) existing.remove();

    const mainDiv = document.createElement("div");
    mainDiv.id = "mht-mouse-powers-tool";

    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    const titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("Mouse Powers Bookmarklet"));

    const descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML = "Pick a mouse group and hit Go";

    const timestampSpan = document.createElement("span");
    timestampSpan.innerHTML = "This group requires a fetch";

    const subgroupSelect = document.createElement("select");
    subgroupSelect.setAttribute("id", "mouse-subgroup-select");

    const groupSelect = document.createElement("select");
    groupSelect.setAttribute("id", "mouse-group-select");
    groupSelect.onchange = function() {
      const selectedGroup = $("#mouse-group-select :selected").text();
      const subgroupz = subcategories[selectedGroup];
      const subgroupSelect = document.getElementById("mouse-subgroup-select");
      if (subgroupSelect) {
        subgroupSelect.innerHTML = "";
        for (let i = 0; i < subgroupz.length; i++) {
          const group = subgroupz[i];
          subgroupSelect.appendChild(new Option(group, group));
        }

        // Update timestamp span
        const cacheObjRaw = localStorage.getItem("tsitu-powers-subgroups");
        if (cacheObjRaw) {
          const cacheObj = JSON.parse(cacheObjRaw);
          if (cacheObj[selectedGroup]) {
            const timeStr = new Date(
              cacheObj[selectedGroup].timestamp
            ).toLocaleString();
            timestampSpan.innerText = `This group was last updated on:\n${timeStr}`;
          } else {
            timestampSpan.innerHTML = "This group requires a fetch";
          }
        }
      }
    };

    for (let i = 0; i < Object.keys(categories).length; i++) {
      const group = Object.keys(categories)[i];
      groupSelect.appendChild(new Option(group, group));
    }

    const riftDescription = document.createElement("span");
    riftDescription.innerHTML = "Rift Bonus<br>None / Walker / Stalker";
    const noRiftBonus = document.createElement("input");
    noRiftBonus.setAttribute("type", "radio");
    noRiftBonus.setAttribute("name", "rift-bonus");
    noRiftBonus.setAttribute("value", 0);
    const walkerRiftBonus = document.createElement("input");
    walkerRiftBonus.setAttribute("type", "radio");
    walkerRiftBonus.setAttribute("name", "rift-bonus");
    walkerRiftBonus.setAttribute("value", 1);
    const stalkerRiftBonus = document.createElement("input");
    stalkerRiftBonus.setAttribute("type", "radio");
    stalkerRiftBonus.setAttribute("name", "rift-bonus");
    stalkerRiftBonus.setAttribute("value", 2);
    stalkerRiftBonus.setAttribute("checked", "checked");

    const fetchButton = document.createElement("button");
    fetchButton.textContent = "Update Subgroup Data";
    fetchButton.onclick = function() {
      const selectedGroup = $("#mouse-group-select :selected").text();
      const selectedSub = $("#mouse-subgroup-select :selected").text();

      // Cache group/subgroup
      const cacheArr = [selectedGroup, selectedSub];
      localStorage.setItem("tsitu-powers-selected", JSON.stringify(cacheArr));

      const payload = genPayload(selectedGroup);
      $.post(
        "https://www.mousehuntgame.com/managers/ajax/mice/mouse_list.php",
        payload,
        null,
        "json"
      ).done(data => {
        if (data) {
          const cacheObj =
            JSON.parse(localStorage.getItem("tsitu-powers-subgroups")) || {};
          const groupName = data.mouse_list_category.name;
          cacheObj[groupName] = {};

          const { subgroups } = data.mouse_list_category;
          for (let i = 0; i < subgroups.length; i++) {
            const el = subgroups[i];
            const miceArr = [];
            const miceObj = {};

            for (let j = 0; j < el.mice.length; j++) {
              const mouseEl = el.mice[j];
              miceArr.push(mouseEl.type);
              miceObj[mouseEl.name] = mouseEl.type;
            }

            cacheObj[groupName][el.name] = {
              type: el.type,
              miceArr,
              miceObj
            };
          }

          cacheObj[groupName].timestamp = Date.now();
          localStorage.setItem(
            "tsitu-powers-subgroups",
            JSON.stringify(cacheObj)
          );
          buildUI(); // Re-render to update cache object + timestamps
        }
      });
    };

    const goButton = document.createElement("button");
    goButton.textContent = "Go";
    goButton.onclick = function() {
      const selectedGroup = $("#mouse-group-select :selected").text();
      const selectedSub = $("#mouse-subgroup-select :selected").text();

      // Cache group/subgroup
      const cacheArr = [selectedGroup, selectedSub];
      localStorage.setItem("tsitu-powers-selected", JSON.stringify(cacheArr));

      main(
        selectedGroup,
        selectedSub,
        parseInt($("input[name=rift-bonus]:checked").val())
      );
    };

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(groupSelect);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(subgroupSelect);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(timestampSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(fetchButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(riftDescription);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(noRiftBonus);
    mainDiv.appendChild(walkerRiftBonus);
    mainDiv.appendChild(stalkerRiftBonus);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(goButton);

    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "20%";
    mainDiv.style.top = "88px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);

    // Initial dropdown population based on cache or default
    const cacheSelect =
      JSON.parse(localStorage.getItem("tsitu-powers-selected")) || [];

    if (cacheSelect.length === 2) {
      groupSelect.value = cacheSelect[0];
      groupSelect.onchange();
      subgroupSelect.value = cacheSelect[1];
    } else {
      groupSelect.value = "Indigenous Mice";
      groupSelect.onchange();
    }
  }
})();
