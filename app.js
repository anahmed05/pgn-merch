(function () {
  const CONFIG = window.__PGN_CONFIG__ || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  let order = [];

  /* ---- wire the email button ---- */
  const ideaBtn = $("#ideaBtn");
  if (ideaBtn && CONFIG.ideaUrl) ideaBtn.href = CONFIG.ideaUrl;

  const emailBtn = $("#emailBtn");
  if (emailBtn) emailBtn.href =
    "mailto:" + CONFIG.merchEmail + "?subject=" + encodeURIComponent("PGN Merch Question");

  /* ---- category filters ---- */
  $$(".chip").forEach(chip => {
    chip.onclick = () => {
      const cat = chip.dataset.cat;
      $$(".chip").forEach(c => c.classList.toggle("active", c === chip));
      $$(".card").forEach(card => {
        card.style.display = (cat === "All" || card.dataset.category === cat) ? "" : "none";
      });
    };
  });

  /* ---- image sliders (front / back) ---- */
  $$(".carousel").forEach(car => {
    const track = $(".slides", car);
    const total = track.children.length;
    if (total < 2) return;
    const dots   = $$(".dot", car);
    const label  = $(".car-label", car);
    const labels = Array.from(track.children).map(s => s.dataset.label || "");
    let idx = 0;
    const go = i => {
      idx = (i + total) % total;
      track.style.transform = `translateX(${-idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("active", di === idx));
      if (label) label.textContent = labels[idx] || "";
    };
    $$(".car-nav", car).forEach(b =>
      b.onclick = e => { e.stopPropagation(); go(idx + Number(b.dataset.nav)); });
    dots.forEach((d, di) => d.onclick = e => { e.stopPropagation(); go(di); });
  });

  /* ---- size selection ---- */
  $$(".card").forEach(card => {
    $$(".size", card).forEach(sz => {
      sz.onclick = () => $$(".size", card).forEach(s => s.classList.toggle("selected", s === sz));
    });
  });

  /* ---- add to order ---- */
  function flash(btn, msg) {
    const o = btn.textContent;
    btn.textContent = msg; btn.style.borderColor = "var(--gold)"; btn.style.color = "var(--gold)";
    setTimeout(() => { btn.textContent = o; btn.style.borderColor = ""; btn.style.color = ""; }, 1100);
  }
  $$("[data-add]").forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest(".card");
      const sizes = $$(".size", card);
      let size = "\u2014";
      if (sizes.length) {
        const sel = $(".size.selected", card);
        if (!sel) { flash(btn, "Pick a size"); return; }
        size = sel.dataset.size;
      }
      // live (per-session) stock countdown
      if (sizes.length) {
        const sel2 = $(".size.selected", card);
        if (sel2 && sel2.dataset.stock !== undefined) {
          let left = Number(sel2.dataset.stock);
          if (left <= 0) { flash(btn, "Out of stock"); return; }
          left -= 1; sel2.dataset.stock = left;
          const line = $(".stock-line", card);
          if (line) {
            const chip = line.querySelector('[data-stk-size="' + size + '"]');
            if (chip) chip.textContent = size + ": " + left;
          }
          if (left === 0) { sel2.classList.add("depleted"); }
        }
      }
      // capture selected color (flag swatches), if any
      let itemName = card.dataset.name;
      const activeSwatch = $(".swatch.active", card);
      if (activeSwatch) {
        const colorName = activeSwatch.getAttribute("title") || "";
        if (colorName) itemName = itemName + " (" + colorName + ")";
      }
      const tba = card.dataset.priceLabel === "TBA";
      order.push({
        name: itemName,
        price: Number(card.dataset.price) || 0,
        label: card.dataset.priceLabel || ("$" + card.dataset.price),
        tba: tba,
        size: size
      });
      renderOrder();
      flash(btn, "Added \u2713");
    };
  });

  /* ---- order list ---- */
  function orderTotal() {
    const sum = order.reduce((s, o) => s + (o.tba ? 0 : o.price), 0);
    const anyTba = order.some(o => o.tba);
    return { sum: sum, label: "$" + sum + (anyTba ? " + TBA" : "") };
  }

  function renderOrder() {
    $("#cartCount").textContent = order.length;
    const wrap = $("#drawerItems");
    if (!order.length) {
      wrap.innerHTML = `<p class="drawer-empty">Your order is empty.<br>Add items from the store below.</p>`;
    } else {
      wrap.innerHTML = order.map((o, i) => `
        <div class="line-item">
          <div>
            <div class="li-name">${o.name}</div>
            <div class="li-meta">Size ${o.size}</div>
            <button class="li-remove" data-rm="${i}">Remove</button>
          </div>
          <div class="li-right"><div class="li-price">${o.label}</div></div>
        </div>`).join("");
      $$("[data-rm]", wrap).forEach(b =>
        b.onclick = () => { order.splice(Number(b.dataset.rm), 1); renderOrder(); });
    }
    $("#drawerTotal").textContent = orderTotal().label;
    const place = $("#placeBtn");
    if (place) place.disabled = order.length === 0;
  }

  /* ---- drawer open / close ---- */
  function openDrawer(open) {
    $("#drawer").classList.toggle("open", open);
    $("#scrim").classList.toggle("open", open);
  }
  $("#cartToggle").onclick = () => openDrawer(true);
  $("#drawerClose").onclick = () => closeDrawer();
  $("#scrim").onclick = () => closeDrawer();

  function closeDrawer() {
    openDrawer(false);
    // if we're on the thank-you screen, reset to a fresh order for next time
    if (!$("#confirmView").hidden) resetDrawer();
  }

  /* ---- checkout ---- */
  function submitOrder(payload) {
    // Send the order reliably even though we navigate to the confirmation right away.
    // sendBeacon guarantees the request is delivered in the background; if it's
    // unavailable, fall back to fetch with keepalive so the request isn't cancelled.
    var body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: "text/plain;charset=utf-8" });
        var ok = navigator.sendBeacon(CONFIG.orderEndpoint, blob);
        if (ok) return;
      }
    } catch (e) { /* fall through to fetch */ }
    fetch(CONFIG.orderEndpoint, {
      method: "POST", mode: "no-cors", keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: body
    });
  }

  $("#checkoutForm").addEventListener("submit", async e => {
    e.preventDefault();
    if ($("#fWebsite") && $("#fWebsite").value) { return; }  // honeypot: bots fill this, humans can't see it
    const note = $("#drawerNote"); note.className = "drawer-note";
    if (!order.length) { note.classList.add("error"); note.textContent = "Add at least one item before placing your order."; return; }

    const name  = $("#fName").value.trim();
    const phone = $("#fPhone").value.trim();
    const email = $("#fEmail").value.trim();
    const address = $("#fAddress").value.trim();
    const classYear = $("#fClass") ? $("#fClass").value.trim() : "";
    const pledge = $("#fPledge") ? $("#fPledge").value.trim() : "";
    const notes = $("#fNotes").value.trim();
    if (!name || !phone) { note.classList.add("error"); note.textContent = "Please add your name and phone number."; return; }
    if (!classYear) { note.classList.add("error"); note.textContent = "Please select your class year."; return; }

    const totals = orderTotal();
    const total = totals.sum;
    const orderId = "PGN-" + Date.now().toString(36).toUpperCase().slice(-6);
    const payload = {
      orderId, token: CONFIG.token, name, phone, email, address, classYear, pledgeClass: pledge, notes,
      total, totalLabel: totals.label,
      chapter: CONFIG.chapter, university: CONFIG.university,
      items: order.map(o => ({ name: o.name, size: o.size, price: o.price, priceLabel: o.label }))
    };

    const btn = $("#placeBtn"); const label = btn.textContent;
    btn.disabled = true; btn.textContent = "Placing order\u2026";
    // Fire the order but DON'T wait for Google's slow response (we can't read it
    // anyway with no-cors). The order still reaches the sheet; the user sees the
    // confirmation instantly instead of waiting several seconds.
    if (CONFIG.orderEndpoint) { try { submitOrder(payload); } catch (err) { /* still confirm */ } }

    // Google Analytics: record the order as a conversion (no-op if GA isn't loaded)
    if (typeof gtag === "function") {
      gtag("event", "purchase", {
        transaction_id: orderId,
        value: total,
        currency: "USD",
        items: payload.items.map(function (o) {
          return { item_name: o.name, item_variant: o.size, price: o.price, quantity: 1 };
        })
      });
    }

    showConfirmation(orderId, payload);
    btn.disabled = false; btn.textContent = label;
  });

  function showConfirmation(orderId, payload) {
    $("#orderView").hidden = true;
    $("#drawerTitle").textContent = "Order confirmed";
    $("#confirmId").textContent = orderId;
    $("#confirmSummary").innerHTML =
      payload.items.map(o => `
        <div class="line-item">
          <div><div class="li-name">${o.name}</div><div class="li-meta">Size ${o.size}</div></div>
          <div class="li-right"><div class="li-price">${o.priceLabel}</div></div>
        </div>`).join("")
      + `<div class="c-total"><span>Total</span><span class="t-val">${payload.totalLabel}</span></div>`;
    $("#confirmContact").innerHTML =
      `<p class="pay-followup">We'll text <strong>${payload.phone}</strong> to confirm your order and payment.</p>`;

    // payment step: Cheddar Up link (from PAYMENT in products.py)
    const payWrap = $("#confirmPay");
    if (payWrap) {
      if (CONFIG.payUrl) {
        payWrap.innerHTML =
          `<a class="btn btn-gold pay-btn" href="${CONFIG.payUrl}" target="_blank" rel="noopener">Click here to make your payment</a>`
          + (CONFIG.payMsg ? `<p class="pay-note">${CONFIG.payMsg}</p>` : "");
        payWrap.hidden = false;
      } else {
        payWrap.innerHTML = "";
        payWrap.hidden = true;
      }
    }

    $("#confirmView").hidden = false;
    order = []; renderOrder();
  }

  function resetDrawer() {
    $("#confirmView").hidden = true;
    $("#orderView").hidden = false;
    $("#drawerTitle").textContent = "Your order";
    $("#checkoutForm").reset();
    const btn = $("#placeBtn"); btn.disabled = true; btn.textContent = "Place order";
    const note = $("#drawerNote"); note.className = "drawer-note";
    note.textContent = "Once you place your order, we'll send you a confirmation text shortly.";
    renderOrder();
  }
  $("#againBtn").onclick = resetDrawer;






  /* ---- color swatches (flag) ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
    var swatches = card.querySelectorAll(".swatch");
    var slides = card.querySelectorAll(".color-slide");
    var nameLabel = card.querySelector(".swatch-name");
    if (!swatches.length || !slides.length) return;
    Array.prototype.forEach.call(swatches, function (b) {
      b.addEventListener("click", function () {
        var i = Number(b.dataset.i);
        Array.prototype.forEach.call(swatches, function (x) { x.classList.toggle("active", x === b); });
        Array.prototype.forEach.call(slides, function (s, si) { s.classList.toggle("active", si === i); });
        if (nameLabel) nameLabel.textContent = b.getAttribute("title") || "";
      });
    });
  });

  /* ---- search box (works alongside category chips) ---- */
  (function () {
    var box = document.getElementById("searchBox");
    var noRes = document.getElementById("noResults");
    if (!box) return;
    function currentCat() {
      var active = document.querySelector(".chip.active");
      return active ? active.dataset.cat : "All";
    }
    function apply() {
      var q = box.value.trim().toLowerCase();
      var cat = currentCat();
      var shown = 0;
      Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
        var name = (card.dataset.name || "").toLowerCase();
        var desc = (card.querySelector(".desc") ? card.querySelector(".desc").textContent : "").toLowerCase();
        var catOk = (cat === "All" || card.dataset.category === cat);
        var qOk = (!q || name.indexOf(q) !== -1 || desc.indexOf(q) !== -1);
        var vis = catOk && qOk;
        card.style.display = vis ? "" : "none";
        if (vis) shown++;
      });
      if (noRes) noRes.hidden = shown !== 0;
    }
    box.addEventListener("input", apply);
    // re-run search when a category chip is clicked
    Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (chip) {
      chip.addEventListener("click", function () { setTimeout(apply, 0); });
    });
  })();

  /* ---- synced inventory (reads live stock from the sheet) ---- */
  (function () {
    if (!CONFIG.orderEndpoint) return;
    // fetch current stock: { "Item Name": { "S": 20, "M": 15, ... }, ... }
    fetch(CONFIG.orderEndpoint + "?action=stock", { method: "GET" })
      .then(function (r) { return r.json(); })
      .then(function (stock) {
        if (!stock || typeof stock !== "object") return;
        Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
          var name = card.dataset.name;
          var s = stock[name];
          if (!s) return;
          var line = card.querySelector(".stock-line");
          var sizeBtns = card.querySelectorAll(".size");
          Array.prototype.forEach.call(sizeBtns, function (btn) {
            var sz = btn.dataset.size;
            if (s[sz] === undefined) return;
            var left = Number(s[sz]);
            btn.dataset.stock = left;
            if (left <= 0) { btn.classList.add("depleted"); btn.disabled = true; }
            else { btn.classList.remove("depleted"); btn.disabled = false; }
            if (line) {
              var chip = line.querySelector('[data-stk-size="' + sz + '"]');
              if (chip) chip.textContent = sz + ": " + left;
            }
          });
          // total remaining across all sizes (or the single no-size qty)
          var totalLeft = 0;
          for (var k in s) { totalLeft += Number(s[k]) || 0; }
          if (totalLeft <= 0) {
            var addBtn = card.querySelector(".add");
            if (addBtn) {
              addBtn.textContent = "Sold out";
              addBtn.classList.add("soldout");
              addBtn.disabled = true;
              addBtn.removeAttribute("data-add");
            }
            if (line) line.textContent = "Sold out";
          }
        });
      })
      .catch(function () { /* offline / endpoint down -> keep the built-in numbers */ });
  })();

  /* ---- external-link products (whole card opens the link) ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
    var linkEl = card.querySelector(".add-link");
    if (!linkEl) return;
    var url = linkEl.getAttribute("href");
    card.style.cursor = "pointer";
    card.addEventListener("click", function (e) {
      // let clicks on the swatches or the link button itself behave normally
      if (e.target.closest(".swatch") || e.target.closest(".add-link") || e.target.closest(".car-nav")) return;
      window.open(url, "_blank", "noopener");
    });
  });

  renderOrder();
})();
