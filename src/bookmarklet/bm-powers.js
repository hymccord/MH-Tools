(function () {
  function loadAcrossTabs() {
    if (!window.AcrossTabs) {
      var el = document.createElement("script");
      var cdn =
        "https://cdnjs.cloudflare.com/ajax/libs/across-tabs/1.4.0/across-tabs.js";
      el.src = cdn;
      document.body.appendChild(el);
      el.onload = function () {
        el.remove();
        continueLoading();
      };
    } else {
      continueLoading()
    }
  }

  let parent;
  function continueLoading() {
    const parentConfig = {
      removeClosedTabs: true,
      onHandshakeCallback: onHandshakeCallback,
      onChildDisconnect: onChildDisconnect,
      onChildCommunication: onChildCommunication
    }
    parent = new AcrossTabs.default.Parent(parentConfig);
    parent.openNewTab({
      url: "http://localhost:8000/powers.html"
    });
  }

  function onHandshakeCallback(data) {
    console.debug("bm-powers: Handshake from child:", data);
  }

  function onChildCommunication(data) {
    console.debug(`bm-powers: child ${data.id} says: ${data.msg}`, data.components);

    if (data.msg === "arm") {
      hg.utils.TrapControl.disarmTrinket();
      for (const componentClassification of Object.keys(data.components)) {
        const id = ownedItems[componentClassification][data.components[componentClassification]];
        if (id) {
          hg.utils.TrapControl.armItem(id, componentClassification);
        }
      }

      hg.utils.TrapControl.go();
    }
  }

  function onChildDisconnect() {
    console.debug("bm-powers: Child disconnected");
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
