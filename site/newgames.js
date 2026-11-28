/* Bosh sahifadagi "Yangi o'yinlar" bo'limi (oxirgi 14 kunda qo'shilgan o'yinlar).
   index.html ga tegmaydi: server uni sahifaga avtomatik ulaydi (api.py -> index). Mavjud renderPop() ni o'rab oladi. */
(function () {
  "use strict";
  if (typeof renderPop !== "function" || typeof gcard !== "function") return;
  var T = { uz: "Yangi o'yinlar", ru: "Новые игры", en: "New games" };
  function lang() {
    try { var l = localStorage.getItem("lg"); if (T[l]) return l; } catch (e) {}
    return "uz";
  }
  function render() {
    try {
      var host = document.getElementById("pop");
      if (!host) return;
      var wrap = document.getElementById("newgw");
      var list = (typeof games !== "undefined" ? games : []).filter(function (g) {
        return g && g.is_new && !(typeof isSvc === "function" && isSvc(g));
      }).slice(0, 10);
      if (!list.length) { if (wrap) wrap.style.display = "none"; return; }
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = "newgw";
        wrap.innerHTML = '<h2><span id="newgt"></span></h2><div class="hs" id="newg"></div>';
        host.insertAdjacentElement("afterend", wrap);
      }
      wrap.style.display = "";
      document.getElementById("newgt").textContent = "🆕 " + T[lang()];
      var box = document.getElementById("newg");
      box.innerHTML = "";
      list.forEach(function (g) { box.appendChild(gcard(g)); });
    } catch (e) { /* bo'lim ko'rinmasa ham asosiy sahifa ishlayveradi */ }
  }
  var orig = renderPop;
  renderPop = function () {
    var r = orig.apply(this, arguments);
    render();
    return r;
  };
  render();
})();
