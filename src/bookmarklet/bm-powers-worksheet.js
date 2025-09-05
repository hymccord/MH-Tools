(async function() {
  const CACHE_STORAGE_KEY = "tsitu-powers-worksheet-groups";
  let parent;
  let pendingData;
  let acrossTabsStatusValue;

  function loadAcrossTabs() {
    if (!window.AcrossTabs) {
      var el = document.createElement("script");
      var cdn =
        "https://cdnjs.cloudflare.com/ajax/libs/across-tabs/1.4.0/across-tabs.js";
      el.src = cdn;
      document.body.appendChild(el);
      el.onload = function () {
        el.remove();
        buildUI();
      };
    } else {
      buildUI();
    }
  }

  loadAcrossTabs();

  async function updateMiceData() {
    /**
     * @typedef {Object} MouseGroup
     * @property {string} name
     * @property {string} type
     */

    /**
     * @typedef {Object} Mouse
     * @property {string} mouse_id
     * @property {string} name
     * @property {string} type
     * @property {string} group
     * @property {string | null} subgroup
     * @property {string | null} subgroup_name
     */

    /** @type {MouseGroup[]} */
    const groups = await fetch("https://www.mousehuntgame.com/api/get/mousegroup/all", { cache: 'no-cache' }).then(res => res.json());
    // transform groups into a map
    /** @type {Object<string, MouseGroup>} */
    const groupMap = groups.reduce((acc, group) => {
      acc[group.type] = group;
      return acc;
    }, {});
    /** @type {Mouse[]} */
    const mice = await fetch("https://www.mousehuntgame.com/api/get/mouse/all", { cache: 'no-cache' }).then(res => res.json());

    /*
    Building a cache object that looks like this:
      {
        "data": {
          group: {
            "type": group_key,
            "All": {
              "type": null,
              "miceObj": {
                Mouse A: mouse_key_a,
                Mouse B: mouse_key_b
              },
              "miceArr": [mouse_key_a, mouse_key_b]
            }
            subgroup a: {
              "type": subgroup_key,
              "miceObj": {
                Mouse A: mouse_key_a
              },
              "miceArr": [mouse_key_a]
            },
            subgroup b: {
              "type": subgroup_key,
              "miceObj": {
                Mouse B: mouse_key_B
              },
              "miceArr": [mouse_key_b]
            },
          }
        },
        "timestamp": Date.now()
      }
    */
    const cacheObject = {
      data: {},
      timestamp: Date.now()
    };

    // initialize cache object with groups in order of appearance
    for (const group of groups) {
      cacheObject.data[group.name] = {
        type: group.type,
        All: {
          type: null,
          miceObj: {},
          miceArr: []
        }
      };
    }

    for (const mouse of mice) {
      if (mouse.subgroup_name === null) {
        mouse.subgroup_name = "Misc.";
      }

      const group = groupMap[mouse.group];
      // if the subgroup is not in the cache object, add it
      if (!cacheObject.data[group.name][mouse.subgroup_name]) {
        cacheObject.data[group.name][mouse.subgroup_name] = {
          type: mouse.subgroup,
          miceObj: {},
          miceArr: [],
        };
      }

      cacheObject.data[group.name][mouse.subgroup_name].miceObj[mouse.name] = mouse.type;
      cacheObject.data[group.name][mouse.subgroup_name].miceArr.push(mouse.type);

      cacheObject.data[group.name].All.miceObj[mouse.name] = mouse.type;
      cacheObject.data[group.name].All.miceArr.push(mouse.type);
    }

    cacheObject.timestamp = Date.now();
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cacheObject));
  }

  if (localStorage.getItem(CACHE_STORAGE_KEY) === null) {
    await updateMiceData();
  }

  var trapTypes = [
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

  function main(targetGroup, targetSubgroup, riftMultiplier, temMode) {
    var cacheObj = JSON.parse(localStorage.getItem(CACHE_STORAGE_KEY) ?? "{}");

    try {
      var subgroup = cacheObj.data[targetGroup][targetSubgroup];
      var baseParams = {
        sn: "Hitgrab",
        uh: user.unique_hash,
        hg_is_ajax: 1,
      };

      const url = `https://www.mousehuntgame.com/managers/ajax/mice/getstat.php`;
      const statParams = Object.assign({}, baseParams, {
        last_read_journal_entry_id: lastReadJournalEntryId,
        action: "get_mice",
        mouse_types: subgroup.miceArr,
      });

      $.post(url, statParams, null, "json")
      .then(function (data) {

        if (!temMode) {
          return data;
        }

        return $.post(
          "https://www.mousehuntgame.com/managers/ajax/users/getmiceeffectiveness.php",
          baseParams,
          null,
          "json")
          .then(function(effectivenessData) {
              return Object.assign({}, data, {effectiveness: effectivenessData.effectiveness})
          });
      })
      .done(function(data) {
        if (data) {
          // Use selector for trap power because server response is inconsistent
          // Going to another tab and back to Camp borks things up
          var trapType = "";
          var powerStr = $(".campPage-trap-trapStat.power > div:nth-child(2)")
            .map(function() {
              return $(this).context.textContent;
            })
            .toArray()[0];
          var trapPower = parseInt(powerStr.replace(/,/g, ""));

          for (var i = 0; i < trapTypes.length; i++) {
            if (powerStr.indexOf(trapTypes[i]) > -1) {
              trapType = trapTypes[i];
            }
          }

          var outputObj = {}; // to be passed as window.name
          // phase out trap-data with computed power type / total power?
          outputObj["user-data"] = {};
          outputObj["user-data"]["weapon"] = user.weapon_name;
          outputObj["user-data"]["base"] = user.base_name;
          outputObj["user-data"]["charm"] = user.trinket_name
            ? user.trinket_name
            : "Baitkeep Charm"; // Default 0/0 placeholder
          outputObj["user-data"]["power-bonus"] = user.trap_power_bonus;
          outputObj["user-data"]["battery"] = 0;
          outputObj["user-data"]["zt-amp"] = 100;
          outputObj["user-data"]["tg-pour"] = false;
          outputObj["user-data"]["rift-multiplier"] = riftMultiplier;

          outputObj["user-data"]["empowered"] = false;
          if (user.bait_name && user.bait_name.indexOf("Empowered") > -1) {
            outputObj["user-data"]["empowered"] = true;
          }

          var userLocation = user.environment_name;
          var userQuests = user.quests;
          if (userLocation === "Furoma Rift") {
            var chargeLevel =
              userQuests["QuestRiftFuroma"]["droid"]["charge_level"];
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
              outputObj["user-data"]["battery"] = levels[chargeLevel];
            }
          } else if (userLocation === "Zugzwang's Tower") {
            outputObj["user-data"]["zt-amp"] =
              user["viewing_atts"]["zzt_amplifier"];
          } else if (userLocation === "Twisted Garden") {
            if (
              userQuests["QuestLivingGarden"]["minigame"]["vials_state"] ===
              "dumped"
            ) {
              outputObj["user-data"]["tg-pour"] = true;
            }
          }

          var currentTime = Date.now();
          outputObj["user-data"]["timestamp"] = currentTime;
          outputObj["user-data"]["dom-trap-type"] = trapType;
          outputObj["user-data"]["dom-trap-power"] = trapPower;
          console.group(
            "Displayed Power: " +
              trapPower +
              " (" +
              trapType +
              ")" +
              " [" +
              new Date(currentTime) +
              "]"
          );

          outputObj["mouse-data"] = {};

          console.group("Group: " + targetGroup);

          let mice = data.mice.reduce((obj, item) => {
            return {
              ...obj,
              [item['abbreviated_name']]: item
            }
          }, {})

          if (temMode) {
            const difficultyByAbbreviatedName = Object.values(data.effectiveness).reduce((acc, item) => {
                const difficulty = item.name;
                Object.values(data.effectiveness[difficulty].mice).forEach(val => {
                    acc[val['name']] = difficulty
                  });
              return acc;
            }, {})

            mice = Object.keys(mice)
              .filter(key => key in difficultyByAbbreviatedName)
              .reduce((acc, key) => {
                return {
                  ...acc,
                  [key]: {
                    ...mice[key],
                    difficulty: difficultyByAbbreviatedName[key]
                  }
                }
              }, {})
          }

          for (const mouse of Object.values(mice)) {
            const groupName = `${mouse.group_name} (${mouse.subgroup_name})`;
            var mouseName = mouse.abbreviated_name.trim();
            console.log(mouseName + " (" + mouse.difficulty + ")");
            var mouseObj = {};
            mouseObj["id"] =
              typeof mouse.id === "number"
                ? mouse.id
                : parseInt(mouse.id.replace(/,/g, ""));
            mouseObj["gold"] =
              typeof mouse.gold === "number"
                ? mouse.gold
                : parseInt(mouse.gold.replace(/,/g, ""));
            mouseObj["points"] =
              typeof mouse.points === "number"
                ? mouse.points
                : parseInt(mouse.points.replace(/,/g, ""));
            mouseObj["difficulty"] = mouse.difficulty;

            // Override difficulty with one from TEM
            /*
            {
              "effectiveness": {
                "Challenging": {
                  "mice": [
                    {
                      "name": "Mouse Name" // Note, no " Mouse" on end like in getStat mice
                      "type" "mouse_type_identifier"
                    }
                  ]
                }
              }
            }
            */

            var effObj = {};
            effObj["Arcane"] = 0;
            effObj["Draconic"] = 0;
            effObj["Forgotten"] = 0;
            effObj["Hydro"] = 0;
            effObj["Parental"] = 0;
            effObj["Physical"] = 0;
            effObj["Shadow"] = 0;
            effObj["Tactical"] = 0;
            effObj["Law"] = 0;
            effObj["Rift"] = 0;

            var notEffArr = trapTypes;
            var effs = mouse.weaknesses;

            // Rough existence checks
            if (Object.keys(effs).length > 0) {
              if (isIterable(effs["effective"])) {
                for (var k = 0; k < effs["effective"].length; k++) {
                  var e = effs["effective"][k];
                  effObj[e.name] = 100;
                  notEffArr = notEffArr.filter(function(el) {
                    return el !== e.name;
                  });
                }
              }
              if (isIterable(effs["veryEffective"])) {
                for (var k = 0; k < effs["veryEffective"].length; k++) {
                  var e = effs["veryEffective"][k];
                  effObj[e.name] = ">100";
                  notEffArr = notEffArr.filter(function(el) {
                    return el !== e.name;
                  });
                }
              }
              if (isIterable(effs["lessEffective"])) {
                for (var k = 0; k < effs["lessEffective"].length; k++) {
                  var e = effs["lessEffective"][k];
                  effObj[e.name] = "<100";
                  notEffArr = notEffArr.filter(function(el) {
                    return el !== e.name;
                  });
                }
              }
              if (isIterable(notEffArr)) {
                for (var k = 0; k < notEffArr.length; k++) {
                  effObj[notEffArr[k]] = 0;
                }
              }
            }

            // Populate effs array
            mouseObj["effs"] = [];
            mouseObj["effs"].push(effObj["Arcane"]);
            mouseObj["effs"].push(effObj["Draconic"]);
            mouseObj["effs"].push(effObj["Forgotten"]);
            mouseObj["effs"].push(effObj["Hydro"]);
            mouseObj["effs"].push(effObj["Parental"]);
            mouseObj["effs"].push(effObj["Physical"]);
            mouseObj["effs"].push(effObj["Shadow"]);
            mouseObj["effs"].push(effObj["Tactical"]);
            mouseObj["effs"].push(effObj["Law"]);
            mouseObj["effs"].push(effObj["Rift"]);

            if (!outputObj["mouse-data"][groupName]) {
              outputObj["mouse-data"][groupName] = {};
            }

            outputObj["mouse-data"][groupName][mouseName] = mouseObj;
          }
          console.groupEnd();
          console.groupEnd();

          var children = getOpenChildren();
          if (children && children.length === 0) {
            openChildTab();
            outputObj["handshake-data"] = JSON.parse(localStorage.getItem(CACHE_STORAGE_KEY) ?? "{}");
            pendingData = outputObj;
          } else {
            sendObjectToChild(outputObj);
          }

        }
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try updating the mouse data.\n\nI've logged the error to the console.");
    }
  }

  //#region Across Tabs functions
  function openChildTab() {
    parent.openNewTab({
      url: "https://mhtools.hankmccord.dev/powers-worksheet.html"
    });
  }

  function sendObjectToChild(object) {
    parent.broadCastAll(JSON.stringify(object));
  }

  function onHandshakeCallback(tabInfo) {
    console.debug("bm-powers: Handshake from child:", tabInfo);

    sendObjectToChild(pendingData);

    pendingData = null;
  }

  function onChildDisconnect(tabInfo) {
    console.debug("bm-powers: Child disconnected");
  }

  function onChildCommunication(data) {
    console.debug("bm-powers: Child communication received:", data);
  }

  function getOpenChildren() {
    var tabs = parent.getAllTabs();
    return tabs
      .filter(tab => tab.status === 'open')
      .filter(tab => tab.url.indexOf("powers-worksheet.html") > -1);
  }

  function updateAcrossTabsStatus() {
    if (getOpenChildren().length > 0) {
      acrossTabsStatusValue.innerHTML = "✅";
    } else {
      acrossTabsStatusValue.innerHTML = "❌";
    }
  }
  //#endregion Across Tabs functions

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

    const parentConfig = {
      removeClosedTabs: true,
      onPollingCallback: updateAcrossTabsStatus,
      onHandshakeCallback: onHandshakeCallback,
      onChildDisconnect: onChildDisconnect,
      onChildCommunication: onChildCommunication
    }
    parent = new AcrossTabs.default.Parent(parentConfig);

    const cacheObj = JSON.parse(localStorage.getItem(CACHE_STORAGE_KEY) ?? "{}");

    var existing = document.getElementById("mht-mouse-powers-tool");
    if (existing) existing.remove();

    var mainDiv = document.createElement("div");
    mainDiv.id = "mht-mouse-powers-tool";

    var closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    var titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("Mouse Powers Bookmarklet"));

    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML = "Pick a mouse group and hit Go";

    var timestampSpan = document.createElement("span");
    timestampSpan.innerHTML = "Mouse data requires updating";

    var subgroupSelect = document.createElement("select");
    subgroupSelect.setAttribute("id", "mouse-subgroup-select");

    var groupSelect = document.createElement("select");
    groupSelect.setAttribute("id", "mouse-group-select");
    groupSelect.onchange = function() {
      var selectedGroup = $("#mouse-group-select :selected").text();
      var subgroupData = cacheObj.data[selectedGroup];
      var subgroupSelect = document.getElementById("mouse-subgroup-select");
      if (subgroupSelect) {
        subgroupSelect.innerHTML = "";
        const subgroupNames = Object.keys(subgroupData);
        for (let i = 0; i < subgroupNames.length; i++) {
          let subgroupName = subgroupNames[i];
          if (typeof subgroupData[subgroupName] === "object") {
            subgroupSelect.appendChild(new Option(subgroupName, subgroupName));
          }
        }
      };
    }

    if (cacheObj.timestamp) {
      var timeStr = new Date(cacheObj.timestamp).toLocaleString();
      timestampSpan.innerText = "The mouse data was last updated on:\n" + timeStr;
    }

    const groupNames = Object.keys(cacheObj.data);
    for (let i = 0; i < groupNames.length; i++) {
      const name = groupNames[i];
      groupSelect.appendChild(new Option(name, name));
    }

    var riftDescription = document.createElement("span");
    riftDescription.innerHTML = "Rift Bonus<br>None / Walker / Stalker";
    var noRiftBonus = document.createElement("input");
    noRiftBonus.setAttribute("type", "radio");
    noRiftBonus.setAttribute("name", "rift-bonus");
    noRiftBonus.setAttribute("value", 0);
    var walkerRiftBonus = document.createElement("input");
    walkerRiftBonus.setAttribute("type", "radio");
    walkerRiftBonus.setAttribute("name", "rift-bonus");
    walkerRiftBonus.setAttribute("value", 1);
    var stalkerRiftBonus = document.createElement("input");
    stalkerRiftBonus.setAttribute("type", "radio");
    stalkerRiftBonus.setAttribute("name", "rift-bonus");
    stalkerRiftBonus.setAttribute("value", 2);
    stalkerRiftBonus.setAttribute("checked", "checked");

    var temMode = document.createElement("input");
    temMode.setAttribute("id", "temMode")
    temMode.setAttribute("type", "checkbox");
    temMode.setAttribute("value", 1);
    var temModeLabel = document.createElement("label")
    temModeLabel.setAttribute("for", "temMode");
    temModeLabel.innerHTML = "Use TEM (not Mice page)";

    var acrossTabsStatusSpan = document.createElement("span");
    acrossTabsStatusSpan.innerHTML = "Worksheet Tab Connection:";
    acrossTabsStatusValue = document.createElement("div");
    acrossTabsStatusSpan.appendChild(acrossTabsStatusValue);
    updateAcrossTabsStatus();

    var fetchButton = document.createElement("button");
    fetchButton.textContent = "Update Mouse Data";
    fetchButton.onclick = async function() {
      var selectedGroup = $("#mouse-group-select :selected").text();
      var selectedSub = $("#mouse-subgroup-select :selected").text();

      // Cache group/subgroup
      var cacheArr = [selectedGroup, selectedSub];
      localStorage.setItem("tsitu-powers-selected", JSON.stringify(cacheArr));

      await updateMiceData();
      buildUI();
    };

    var goButton = document.createElement("button");
    goButton.id = "mht-mouse-powers-tool-go"
    goButton.textContent = "Go";
    goButton.onclick = function() {
      if (!$(".campPage-trap-trapStat.power > div:nth-child(2)").length) {
        alert(
          "Error: Can't find total trap power value\n\nPlease make sure you are on the Camp page of mousehuntgame.com and have FreshCoat enabled"
        );
        return;
      }

      var selectedGroup = $("#mouse-group-select :selected").text();
      var selectedSub = $("#mouse-subgroup-select :selected").text();

      // Cache group/subgroup
      var cacheArr = [selectedGroup, selectedSub];
      localStorage.setItem("tsitu-powers-selected", JSON.stringify(cacheArr));

      main(
        selectedGroup,
        selectedSub,
        parseInt($("input[name=rift-bonus]:checked").val()),
        $("#temMode").is(":checked")
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
    mainDiv.appendChild(temMode);
    mainDiv.appendChild(temModeLabel);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(acrossTabsStatusSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(goButton);

    mainDiv.style.color = "var(--d-text, rgba(0,0,0,0.87))";
    mainDiv.style.backgroundColor = "var(--d-bg, #F2F2F2)";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "20%";
    mainDiv.style.top = "88px";
    mainDiv.style.border = "solid 3px var(--d-border, #696969)";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
    dragElement(document.getElementById("mht-mouse-powers-tool"));

    // Initial dropdown population based on cache or default
    var cacheSelect =
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

  /**
   * Element dragging functionality
   * @param {HTMLElement} el
   */
  function dragElement(el) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(el.id + "header")) {
      document.getElementById(el.id + "header").onmousedown = dragMouseDown;
    } else {
      el.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      el.style.top = el.offsetTop - pos2 + "px";
      el.style.left = el.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
})();
