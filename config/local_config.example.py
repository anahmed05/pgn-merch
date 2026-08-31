# =====================================================================
#  TEMPLATE — safe to commit. Contains no real values.
#
#  Setup:
#    1. Copy this file and rename the copy to  local_config.py
#    2. Ask Abrar for the two real values and paste them in
#    3. Never commit local_config.py — .gitignore already excludes it
# =====================================================================

# Shared secret. Must match the SECRET in the Apps Script behind the sheet.
ORDER_TOKEN = "sk29XjqcFOWF31N3vNvChqnhdvSzDdNN"

# Google Apps Script Web App URL that receives orders.
# Looks like: https://script.google.com/macros/s/AKfycb.../exec
ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbxuhToGg2HytFTB4Z8XMGa4ysfQ7jvGn1csOPt9t-3y6mq9V8gushDMFdWuFf9gTQV_/exec"
