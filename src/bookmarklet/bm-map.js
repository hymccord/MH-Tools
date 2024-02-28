(function() {
  if (!window.jQuery) {
    alert("jQuery is not enabled on this page");
    return;
  }

  const payload = {
    map_id: user.quests.QuestRelicHunter.default_map_id,
    action: "map_info",
    uh: user.unique_hash,
    last_read_journal_entry_id: lastReadJournalEntryId
  };

  function getUncaughtMapMice(map) {
    // Gather IDs of caught mice
    const caughtMice = {};
    if (map.hunters.length > 0) {
      map.hunters.forEach(el => {
        const hunterMice = el.completed_goal_ids.mouse;
        if (hunterMice.length > 0) {
          hunterMice.forEach(mouseID => {
            caughtMice[mouseID] = 0;
          });
        }
      });
    }

    // Check for existence in caughtMice before pushing
    const uncaughtMice = [];
    if (map.goals.mouse.length > 0) {
      map.goals.mouse.forEach(el => {
        if (caughtMice[el.unique_id] === undefined) {
          // Thunderlord lightning emoji edge case
          if (el.name.indexOf("Thunderlord") !== -1) {
            uncaughtMice.push("Thunderlord");
          } else {
            uncaughtMice.push(el.name);
          }
        }
      });
    }

    return uncaughtMice;
  }

  $.post(
    "https://www.mousehuntgame.com/managers/ajax/users/treasuremap.php",
    payload,
    null,
    "json"
  ).done(data => {
    if (data) {
      if (!data.treasure_map || data.treasure_map.view_state === "noMap") {
        alert(
          "Please make sure you are logged into MH and are currently on a treasure map"
        );
        return;
      }

      const mice = getUncaughtMapMice(data.treasure_map);
      let url = "https://tsitu.github.io/MH-Tools/map.html";
      url += `?mice=${encodeURIComponent(mice.join("/"))}`;
      const newWindow = window.open("", "mhmapsolver");
      newWindow.location = url;
    }
  });
})();
