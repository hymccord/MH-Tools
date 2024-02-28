(function() {
  bmLoad();

  /**
   * Load bookmarklet-menu based on master branch.
   */
  function bmLoad() {
    const el = document.createElement("script");
    const cdn =
      "https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@master/src/bookmarklet/bm-menu.min.js";
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  }
})();
