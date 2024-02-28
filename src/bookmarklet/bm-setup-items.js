(function() {
  if (location.href.indexOf("mousehuntgame.com") < 0) {
    alert("You are not on mousehuntgame.com! Please try again.");
    return;
  }

  $.post(
    "https://www.mousehuntgame.com/managers/ajax/users/gettrapcomponents.php",
    {
      hg_is_ajax: 1,
      uh: user.unique_hash
    },
    null,
    "json"
  ).done(data => {
    const arr = data.components;
    if (arr) {
      const bases = arr
        .filter(el => el.classification === "base" && el.quantity > 0)
        .map(el => el.name);

      // Auto-add Denture Base variants
      if (bases.indexOf("Denture Base") >= 0) {
        bases.push("Denture Base (Toothless)");
      }
      if (bases.indexOf("Signature Series Denture Base") >= 0) {
        bases.push("Signature Series Denture Base (Toothless)");
      }

      // Auto-add Naughty List Printing Press Base variants
      if (bases.indexOf("Naughty List Printing Press Base") >= 0) {
        bases.push("Naughty List Printing Press Base (Paperless)");
      }

      const weapons = arr
        .filter(el => el.classification === "weapon" && el.quantity > 0)
        .map(
          el =>
            // Weapon edge cases
            // if (el.name === "Ambush Trap") {
            // return "Ambush";
            // } else if (el.name === "School of Sharks Trap") {
            // return "School of Sharks";
            // }
            el.name
        );

      const charms = arr
        .filter(el => el.classification === "trinket" && el.quantity > 0)
        .map(el => el.name);

      console.group("Items Owned");
      console.log(`Bases: ${bases.length}`);
      console.log(`Weapons: ${weapons.length}`);
      console.log(`Charms: ${charms.length}`);
      console.groupEnd();

      // Golem Guardian check
      if (weapons.filter(el => el.indexOf("Golem Guardian") >= 0).length > 0) {
        const skins = arr
          .filter(
            el =>
              el.classification === "skin" &&
              el.name.indexOf("Golem Guardian") >= 0 &&
              el.quantity > 0
          )
          .map(el => el.power_type_name);

        for (const el of skins) {
          const name = `Golem Guardian ${el} Trap`;
          if (weapons.indexOf(name) < 0) {
            weapons.push(name);
          }
        }
      }

      // Combine into a single object and pass to window.name
      const combinedObj = {};
      combinedObj.bases = bases;
      combinedObj.weapons = weapons;
      combinedObj.charms = charms;

      const newWindow = window.open("");
      newWindow.name = JSON.stringify(combinedObj);
      newWindow.location = "https://tsitu.github.io/MH-Tools/setup.html";
    }
  });
})();
