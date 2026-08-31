/**
 * PGN merch orders → Google Sheet
 * --------------------------------
 * Paste this whole file into the Apps Script editor attached to your
 * Google Sheet (Extensions ▸ Apps Script), then deploy it as a Web App.
 * Full steps are in PGN-order-sheet-setup.md.
 *
 * Each item in an order becomes its own row, so you can sort by item or
 * size to tally exactly how many of each to order.
 */

var SHEET_NAME = "Orders";

var HEADERS = [
  "Timestamp", "Order ID", "Name", "Phone", "Email",
  "Item", "Size", "Price", "Order Total", "Chapter", "Notes", "Status"
];

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Add the header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data  = JSON.parse(e.postData.contents);
    var when  = new Date();
    var items = data.items || [];

    // One row per item ordered.
    items.forEach(function (it) {
      sheet.appendRow([
        when,
        data.orderId || "",
        data.name    || "",
        data.phone   || "",
        data.email   || "",
        it.name      || "",
        it.size      || "",
        it.price     || "",
        data.total   || "",
        data.chapter || "",
        data.notes   || "",
        ""            // Status — you fill this in (e.g. Paid, Picked up)
      ]);
    });

    return json({ result: "success", orderId: data.orderId, rows: items.length });
  } catch (err) {
    return json({ result: "error", message: String(err) });
  }
}

// A quick browser test: visiting the /exec URL should show this message.
function doGet() {
  return json({ status: "PGN order endpoint is live." });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
