(function() {
  bmLoad();

  /**
   * Load bookmarklet-menu based on master branch.
   */
  function bmLoad() {
    var el = document.createElement("script");
    var cdn =
      "https://mhtools.hankmccord.dev/src/bookmarklet/bm-menu.js";
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  }
})();
