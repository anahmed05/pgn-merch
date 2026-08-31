# Connect the order sheet — 5-minute setup

This links the **Place order** button on your site to a Google Sheet. When someone
checks out, their order drops straight into the sheet and they see a thank-you screen.
You only do this once.

## What you need
- A Google account (a chapter Gmail is ideal, so any officer can access it).
- The two files: your website (`pgn-jmu-merch.html`) and the script (`PGN-order-sheet-code.gs`).

---

## Step 1 — Make the sheet
1. Go to **sheets.google.com** and create a blank spreadsheet.
2. Name it something like **PGN Merch Orders**. Leave it empty — the script builds the columns for you.

## Step 2 — Add the script
1. In the sheet, click **Extensions ▸ Apps Script**. A code editor opens in a new tab.
2. Delete whatever starter code is there.
3. Open `PGN-order-sheet-code.gs`, copy **everything**, and paste it in.
4. Click the **save** icon (💾).

## Step 3 — Deploy it as a Web App
1. Top right, click **Deploy ▸ New deployment**.
2. Click the gear ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** PGN orders (anything works)
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← this must be "Anyone" or orders can't come in
4. Click **Deploy**. Google will ask you to **Authorize access** — approve it with your account.
   (If you see a "Google hasn't verified this app" warning, click **Advanced ▸ Go to … (unsafe)**.
   It's your own script, so it's safe.)
5. Copy the **Web app URL**. It ends in **/exec** and looks like:
   `https://script.google.com/macros/s/AKfy............/exec`

## Step 4 — Paste the URL into the site
1. Open `pgn-jmu-merch.html` in a text editor (Notepad, TextEdit, VS Code — anything).
2. Near the top of the script section, find:
   ```js
   const ORDER_ENDPOINT = "";
   ```
3. Paste your URL between the quotes:
   ```js
   const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
   ```
4. Save the file.

## Step 5 — Test it
1. Open the site, add an item, and place a test order.
2. You should see the **Thank you** screen — and a new row should appear in your Google Sheet within a few seconds.

That's it. Orders now flow into the sheet automatically.

---

## What the admin sees
Each **item** in an order is its own row, so you can sort or filter to tally quantities:

| Timestamp | Order ID | Name | Phone | Email | Item | Size | Price | Order Total | Chapter | Notes | Status |
|-----------|----------|------|-------|-------|------|------|-------|-------------|---------|-------|--------|

Use the **Status** column yourself to track "Paid" / "Picked up".
Tip: to total quantities per item, highlight the **Item** and **Size** columns and use
**Data ▸ Create a filter**, or drop the sheet into a pivot table.

## Good to know
- **Payment isn't collected on the site.** Orders are recorded; you follow up over
  email/Venmo (the thank-you screen tells buyers to expect that).
- **Want email alerts for new orders?** In the sheet: **Tools ▸ Notification settings ▸
  Notify me… ▸ any changes ▸ Email – right away.**
- **Changed the script later?** Re-deploy with **Deploy ▸ Manage deployments ▸ edit ▸
  Version: New version**. The `/exec` URL stays the same.
- **Nothing showing up?** Double-check "Who has access" is **Anyone**, and that the URL
  in the site ends in **/exec** (not `/dev`).
