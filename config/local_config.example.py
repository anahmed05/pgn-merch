# =====================================================================
#  TEMPLATE — safe to commit. Contains no real values.
#
#  Setup:
#    1. Copy this file and rename the copy to  local_config.py
#    2. Ask Abrar for the two real values and paste them in
#    3. Never commit local_config.py — .gitignore already excludes it
# =====================================================================

# Shared secret. Must match the SECRET in the Apps Script behind the sheet.
ORDER_TOKEN = ""

# Google Apps Script Web App URL that receives orders.
# Looks like: https://script.google.com/macros/s/AKfycb.../exec
ORDER_ENDPOINT = ""
