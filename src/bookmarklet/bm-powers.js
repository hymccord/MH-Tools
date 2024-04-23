(function () {
  function loadAcrossTabs() {
    // var el = document.createElement("script");
    // var cdn =
    //   "https://cdnjs.cloudflare.com/ajax/libs/across-tabs/1.3.1/across-tabs.js";
    // el.src = cdn;
    // document.body.appendChild(el);
    // el.onload = function () {
    //   el.remove();
      continueLoading();
    // };
  }

  let parent;
  function continueLoading() {
    parent = new AcrossTabs.default.Parent({
      onHandshakeCallback: childConnected,
      onChildCommunication: childSays,
    });
    parent.openNewTab({
      url: "https://tsitu.github.io/MH-Tools/powers.html"
    });
  }

  function childConnected(data) {
    // console.log(`child ${data.id} connected`);
    // parent.broadCastTo(data.id, 'ping');
  }

  function childSays(data) {
    console.log(`child ${data.id} says: ${data.msg}`);

    if (data.msg === "arm") {

      for (const componentClassification of Object.keys(data.components)) {
        const id = ownedItems[componentClassification][data.components[componentClassification]];
        if (id) {
          hg.utils.TrapControl.armItem(id, componentClassification);
        }
      }

      hg.utils.TrapControl.go();
    }
  }

  ownedItems = {
    base: {},
    weapon: {},
    trinket: {},
  };
  function loadTraps() {
    $.post(
      "https://www.mousehuntgame.com/managers/ajax/users/gettrapcomponents.php",
      {
        sn: "Hitgrab",
        hg_is_ajax: 1,
        uh: user.unique_hash
      },
      null,
      "json"
    ).done(function (data) {
      data.components.forEach(el => {
        let key = el.name;
        let id = el.item_id

        if (el.classification === "weapon") {
          if (el.name.indexOf("Golem Guardian") >= 0) {
            // Golem Guardian edge case
            id = 2732;
            key = "Golem Guardian Trap";
          } else if (el.name.indexOf("Isle Idol") >= 0) {
            // Isle Idol edge case
            id = 1127;
            key = "Isle Idol Trap";
          }
        }

        if (ownedItems[el.classification]) {
            ownedItems[el.classification][key] = id;
        }
      });

      // Edge case cleanup
      Object.keys(ownedItems.weapon).forEach(el => {
        if (
          (el.indexOf("Golem Guardian") >= 0 &&
            el !== "Golem Guardian Trap") ||
          (el.indexOf("Isle Idol") >= 0 && el !== "Isle Idol Trap")
        ) {
          delete ownedItems.weapon[el];
        }
      });
    })
  }

  loadAcrossTabs();
  loadTraps();
})();
