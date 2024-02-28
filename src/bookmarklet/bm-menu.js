(function() {
  const jsonTimestamp = new Promise((resolve, reject) => {
    const cdn =
      "https://tsitu.github.io/MH-Tools/data/json/bookmarklet-timestamps.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", cdn);
    xhr.onload = function() {
      resolve(xhr.responseText);
    };
    xhr.onerror = function() {
      reject(xhr.statusText);
    };
    xhr.send();
  });

  jsonTimestamp.then(response => {
    buildUI(JSON.parse(response));
  });

  function buildUI(timestamps) {
    const mainDiv = document.createElement("div");
    mainDiv.id = "mht-bookmarklet-loader";
    const loaderTime = `Last updated: ${timestamps.menu || "N/A"}`;
    const creTime = `Last updated: ${timestamps.cre || "N/A"}`;
    const mapTime = `Last updated: ${timestamps.map || "N/A"}`;
    const setupItTime = `Last updated: ${timestamps.setup_items || "N/A"}`;
    const setupFiTime = `Last updated: ${timestamps.setup_fields || "N/A"}`;
    const analyzerTime = `Last updated: ${timestamps.analyzer || "N/A"}`;
    const crownTime = `Last updated: ${timestamps.crown || "N/A"}`;
    const craftingTime = `Last updated: ${timestamps.crafting || "N/A"}`;
    const powersTime = `Last updated: ${timestamps.powers || "N/A"}`;

    const closeButton = document.createElement("button", {
      id: "close-button"
    });
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    const titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("MH Tools Bookmarklets"));

    const descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML =
      "Version 1.7.0 / Using <a href='https://www.jsdelivr.com/?docs=gh' target='blank'>jsDelivr</a>";
    const loaderSpanTimestamp = document.createElement("span");
    loaderSpanTimestamp.style.fontSize = "10px";
    loaderSpanTimestamp.style.fontStyle = "italic";
    loaderSpanTimestamp.innerHTML = loaderTime;

    const creButton = document.createElement("button", { id: "cre-button" });
    creButton.textContent = "Catch Rate Estimator";
    creButton.onclick = function() {
      loadBookmarklet("cre");
    };
    const creSpanTimestamp = document.createElement("span");
    creSpanTimestamp.style.fontSize = "10px";
    creSpanTimestamp.style.fontStyle = "italic";
    creSpanTimestamp.innerHTML = creTime;

    const mapButton = document.createElement("button", { id: "map-button" });
    mapButton.textContent = "Map Solver";
    mapButton.onclick = function() {
      loadBookmarklet("map");
    };
    const mapSpanTimestamp = document.createElement("span");
    mapSpanTimestamp.style.fontSize = "10px";
    mapSpanTimestamp.style.fontStyle = "italic";
    mapSpanTimestamp.innerHTML = mapTime;

    const setupButton = document.createElement("button", {
      id: "setup-button"
    });
    setupButton.textContent = "Best Setup: Load Items";
    setupButton.onclick = function() {
      loadBookmarklet("setup-items");
    };
    const setupSpanTimestamp = document.createElement("span");
    setupSpanTimestamp.style.fontSize = "10px";
    setupSpanTimestamp.style.fontStyle = "italic";
    setupSpanTimestamp.innerHTML = setupItTime;

    const setupFieldsButton = document.createElement("button", {
      id: "setup-fields-button"
    });
    setupFieldsButton.textContent = "Best Setup: Fields";
    setupFieldsButton.onclick = function() {
      loadBookmarklet("setup-fields");
    };
    const setupFieldsSpanTimestamp = document.createElement("span");
    setupFieldsSpanTimestamp.style.fontSize = "10px";
    setupFieldsSpanTimestamp.style.fontStyle = "italic";
    setupFieldsSpanTimestamp.innerHTML = setupFiTime;

    const analyzerButton = document.createElement("button", {
      id: "analyzer-button"
    });
    analyzerButton.textContent = "Marketplace Analyzer";
    analyzerButton.onclick = function() {
      loadBookmarklet("analyzer");
    };
    const analyzerSpanTimestamp = document.createElement("span");
    analyzerSpanTimestamp.style.fontSize = "10px";
    analyzerSpanTimestamp.style.fontStyle = "italic";
    analyzerSpanTimestamp.innerHTML = analyzerTime;

    const crownButton = document.createElement("button", {
      id: "crown-button"
    });
    crownButton.textContent = "Crown Solver";
    crownButton.onclick = function() {
      loadBookmarklet("crown");
    };
    const crownSpanTimestamp = document.createElement("span");
    crownSpanTimestamp.style.fontSize = "10px";
    crownSpanTimestamp.style.fontStyle = "italic";
    crownSpanTimestamp.innerHTML = crownTime;

    const craftingButton = document.createElement("button", {
      id: "crafting-button"
    });
    craftingButton.textContent = "Crafting Wizard";
    craftingButton.onclick = function() {
      loadBookmarklet("crafting");
    };
    const craftingSpanTimestamp = document.createElement("span");
    craftingSpanTimestamp.style.fontSize = "10px";
    craftingSpanTimestamp.style.fontStyle = "italic";
    craftingSpanTimestamp.innerHTML = craftingTime;

    const powersButton = document.createElement("button", {
      id: "powers-button"
    });
    powersButton.textContent = "Powers: Worksheet";
    powersButton.onclick = function() {
      loadBookmarklet("powers");
    };
    const powersSpanTimestamp = document.createElement("span");
    powersSpanTimestamp.style.fontSize = "10px";
    powersSpanTimestamp.style.fontStyle = "italic";
    powersSpanTimestamp.innerHTML = powersTime;

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(loaderSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(creButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(creSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(mapButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(mapSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupFieldsButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupFieldsSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(analyzerButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(analyzerSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(crownButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(crownSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(craftingButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(craftingSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(powersButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(powersSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createTextNode("(Drag me around on a PC)"));

    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    // Allow customizable left position property
    mainDiv.style.left =
      typeof window.tsitu_loader_offset !== "undefined"
        ? window.tsitu_loader_offset.concat("%")
        : "80%";
    mainDiv.style.top = "25px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
    dragElement(document.getElementById("mht-bookmarklet-loader"));
    locationQuickWiki();
  }

  /**
   * Adds a click handler to HUD location name that opens corresponding MHWiki link
   */
  function locationQuickWiki() {
    const locationEl = document.querySelector(".mousehuntHud-environmentIcon");
    if (locationEl && !locationEl.onclick) {
      locationEl.onclick = function() {
        let locationName = user.environment_name;
        if (locationName === "SUPER|brie+ Factory") {
          locationName = "MouseHunt_Birthday"; // SB+ Factory workaround
        }
        const newWindow = window.open("");
        newWindow.location = `https://mhwiki.hitgrab.com/wiki/index.php/${locationName.replace(
          " ",
          "_"
        )}`;
      };
      locationEl.style.cursor = "pointer";

      // innerHTML is more elegant but impractical since the game updates it on location changes
      // locationEl.innerHTML = `<a href='https://mhwiki.hitgrab.com/wiki/index.php/${locationName.replace(
      //   " ",
      //   "_"
      // )}' target='_blank'>${locationEl.innerHTML}</a>`;
    }
  }

  /**
   * Fetches & executes specified bookmarklet variant
   * @param {string} type
   */
  function loadBookmarklet(type) {
    const el = document.createElement("script");
    const cdn = `https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@master/src/bookmarklet/bm-${type}.min.js`;
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  }

  /**
   * Element dragging functionality
   * @param {HTMLElement} el
   */
  function dragElement(el) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    if (document.getElementById(`${el.id}header`)) {
      document.getElementById(`${el.id}header`).onmousedown = dragMouseDown;
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
      el.style.top = `${el.offsetTop - pos2}px`;
      el.style.left = `${el.offsetLeft - pos1}px`;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
})();
