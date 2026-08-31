# =====================================================================
#  PGN merch — content & products.  Edit this file, then run:  python build.py
# =====================================================================

# ---- 1. CHAPTER DETAILS --------------------------------------------
CHAPTER = {
    "org_name":   "Phi Gamma Nu",
    "monogram":   "ΦΓΝ",                 # small gold letters above the name
    "university": "James Madison University",
    "chapter":    "Epsilon Iota Chapter",
    "slogan":     "Driven to Success, Devoted to Each Other.",
    "pillars":    ["Professionalism", "Philanthropy", "Brotherhood"],
    "instagram":  "@pgn_jmu",
    "merch_email":"pgnmerch@example.com",       # used by the "Questions? Email us" button
}

# ---- 2. ORDER DESTINATION ------------------------------------------
# The real values live in local_config.py, which git is told to ignore.
# Copy local_config.example.py -> local_config.py and paste your values in.
# Without that file the site still builds; checkout just shows a thank-you
# without saving the order.
try:
    from config.local_config import ORDER_TOKEN, ORDER_ENDPOINT
except ImportError:
    ORDER_TOKEN = ""
    ORDER_ENDPOINT = ""

# ---- 2b. ORDER DEADLINE --------------------------------------------
# Shown as a banner at the top of the shop. Set "date" to "" to hide the banner.
DEADLINE = {
    "date": "",      # e.g. "Friday, October 3" — or "" to hide
    "message": "Orders close",        # text before the date
}

# ---- 2c. GOOGLE ANALYTICS ------------------------------------------
# Paste your Measurement ID (looks like "G-XXXXXXXXXX") to turn on analytics.
# Leave "" for none.  Setup steps are in README.
ANALYTICS_ID = "G-VFNMT71GK7"

# ---- 2d. SIZE CHART ------------------------------------------------
# One section per garment. Measurements in inches, laid flat.
# Edit freely — the site builds a tabbed chart from this.
SIZE_CHART = {
    "note": "Unisex sizing, measured flat in inches. Between sizes? Size up for a relaxed fit, down for fitted.",
    "garments": [
        {"name": "T-Shirts", "cols": ["Size", "Chest", "Length", "Fits height"], "rows": [
            ["S",   "34-36", "28",   "5'4\"-5'7\""],
            ["M",   "38-40", "29",   "5'7\"-5'10\""],
            ["L",   "42-44", "30",   "5'10\"-6'1\""],
            ["XL",  "46-48", "31",   "6'1\"-6'4\""],
            ["2XL", "50-52", "32",   "6'4\"+"],
        ]},
        {"name": "Hoodies", "cols": ["Size", "Chest", "Length", "Sleeve"], "rows": [
            ["S",   "38-40", "27",   "34"],
            ["M",   "42-44", "28",   "35"],
            ["L",   "46-48", "29",   "36"],
            ["XL",  "50-52", "30",   "37"],
            ["2XL", "54-56", "31",   "38"],
        ]},
        {"name": "Crewnecks", "cols": ["Size", "Chest", "Length", "Sleeve"], "rows": [
            ["S",   "38-40", "27",   "33"],
            ["M",   "42-44", "28",   "34"],
            ["L",   "46-48", "29",   "35"],
            ["XL",  "50-52", "30",   "36"],
            ["2XL", "54-56", "31",   "37"],
        ]},
        {"name": "Sweatpants", "cols": ["Size", "Waist", "Inseam", "Fits height"], "rows": [
            ["S",   "28-30", "30",   "5'4\"-5'7\""],
            ["M",   "31-33", "31",   "5'7\"-5'10\""],
            ["L",   "34-36", "32",   "5'10\"-6'1\""],
            ["XL",  "37-39", "32",   "6'1\"-6'4\""],
            ["2XL", "40-42", "33",   "6'4\"+"],
        ]},
        {"name": "Polos", "cols": ["Size", "Chest", "Length", "Fits height"], "rows": [
            ["S",   "36-38", "28",   "5'4\"-5'7\""],
            ["M",   "39-41", "29",   "5'7\"-5'10\""],
            ["L",   "42-44", "30",   "5'10\"-6'1\""],
            ["XL",  "45-47", "31",   "6'1\"-6'4\""],
            ["2XL", "48-50", "32",   "6'4\"+"],
        ]},
    ],
    "fit_guide": [
        "5'7\"-5'8\", ~142 lbs -> wears L for a slightly oversized fit (M for true-to-size).",
        "5'10\"-6'0\", ~175 lbs -> L true-to-size, XL for roomy.",
        "6'2\"+, ~200 lbs -> XL, or 2XL for oversized.",
    ],
}

# ---- 2e. PAYMENT (Cheddar Up) --------------------------------------
# Shown on the thank-you screen so buyers pay right away and tag their order.
PAYMENT = {
    "cheddarup_url": "https://pgnstore.cheddarup.com/",
    "instructions": "",
}

# ---- 2f. "GOT AN IDEA?" FORM ---------------------------------------
# Paste your Google Form share link (the /viewform or forms.gle URL).
IDEA_FORM_URL = "https://forms.gle/jYc1iybQf9LH5CJp6"

# ---- 2g. FIRST FILTER CHIP ---------------------------------------
# The label on the left-most chip (the one that shows everything).
ALL_LABEL = "All"

# Order the rest of the chips appear in. Anything not listed here goes
# on the end. Names must match the "category" values below exactly.
CATEGORY_ORDER = ["Shirts", "Hoodies", "Sweatpants", "Accessories"]

# ---- 3. CREST -------------------------------------------------------
CREST = "crest.png"        # file inside assets/

# ---- 4. PRODUCTS ----------------------------------------------------
# Fields: name, price (number, or the string "TBA"), category, desc,
#         sizes (list, [] if none),
#         badge ("New"/"Limited"/""), soldout (True/False)
#         image  = single filename in assets/, or None
#         images = list of {"file","label"} for a front/back slider, or None
#
# NOTE: items we don't have in stock yet are parked in RETIRED at the
# bottom of this file. Cut one from there, paste it back in here, rerun
# build.py, and it's live again.
PRODUCTS = [
    {"name": "Fall Recruitment T-Shirt 2026", "price": 26.50, "category": "Shirts",
     "desc": "Full JUNGLE graphic on the back.",
     "sizes": ["M", "L", "XL"], "badge": "New", "soldout": False,
     "stock": {"M": 8, "L": 39, "XL": 9},
     "images": [{"file": "tee-front.jpg", "label": "Front"},
                {"file": "tee-back.jpg",  "label": "Back"}],
     "fit_ref": "Model: 6’0″, 180 lbs — wears L"},

    {"name": "Parents Weekend T-Shirt 2026", "price": "TBA", "category": "Shirts",
     "desc": "Football themed t-shirt.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Coming Soon", "soldout": False,
     "images": [{"file": "parents-front.jpg", "label": "Front"},
                {"file": "parents-back.jpg",  "label": "Back"}]},

    {"name": "Polo", "price": "TBA", "category": "Shirts",
     "desc": "Premium Peter Millar performance polo with embroidered letters.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "Coming Soon", "soldout": False},

    # ---------- HOODIES ----------
    {"name": "Fleece Hoodie", "price": "TBA", "category": "Hoodies",
     "desc": "Heavyweight fleece hoodie with gold embroidered letters.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "Coming Soon", "soldout": False},

    {"name": "Crewneck Hoodie", "price": "TBA", "category": "Hoodies",
     "desc": "Classic fleece crewneck with the chapter crest.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "Coming Soon", "soldout": False},

    # ---------- SWEATPANTS ----------
    {"name": "Chapter Sweatpants", "price": "TBA", "category": "Sweatpants",
     "desc": "Relaxed-fit sweatpants with tonal chapter lettering down the leg.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "Coming Soon", "soldout": False},

    {"name": "Matching Set", "price": "TBA", "category": "Sweatpants",
     "desc": "Crewneck and sweatpants set — buy the fit together and save.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Coming Soon", "soldout": False},

    # ---------- ACCESSORIES ----------
    {"name": "PGN Shot Glass", "price": 5, "category": "Accessories",
     "desc": "Clear shot glass with the letters, chapter name, and EST. 1924.",
     "sizes": [], "badge": "", "soldout": False,
     "stock": {"—": 5},
     "image": "shotglass.jpg"},

    {"name": "Flag", "price": "TBA", "category": "Accessories",
     "desc": "Flag with Greek Letters — pick your color below.",
     "sizes": [], "badge": "", "soldout": False,
     "stock": {"—": 3},
     "colors": [
         {"name": "Black",         "hex": "#1a1a1a", "file": "flag-black.jpg"},
         {"name": "Hot Pink",      "hex": "#e0218a", "file": "flag-pink.jpg"},
         {"name": "Carolina Blue", "hex": "#7bafd4", "file": "flag-blue.jpg"},
     ]},

    {"name": "Sticker Pack", "price": "TBA", "category": "Accessories",
     "desc": "Set of die-cut stickers: crest, letters, and rose.",
     "sizes": [], "badge": "Coming Soon", "soldout": False},

    {"name": "Spring Recruitment T-Shirt 2026", "price": 15, "category": "Shirts",
     "desc": "Casino-themed Spring 2026 recruitment tee.",
     "sizes": ["S", "M", "L", "XL"], "badge": "", "soldout": False,
     "stock": {"S": 20, "M": 15, "L": 12, "XL": 8},
     "images": [{"file": "spring-rec-front.jpg", "label": "Front"},
                {"file": "spring-rec-back.jpg",  "label": "Back"}],
     "fit_ref": "Model: 6’0″, 180 lbs — wears L"},

    {"name": "Spring Away Weekend T-Shirt 2026", "price": 15, "category": "Shirts",
     "desc": "Myrtle Beach SC beach weekend tee.",
     "sizes": ["S", "M", "L", "XL"], "badge": "", "soldout": False,
     "stock": {"S": 18, "M": 14, "L": 10, "XL": 6},
     "images": [{"file": "away-front.jpg", "label": "Front"},
                {"file": "away-back.jpg",  "label": "Back"}],
     "fit_ref": "Model: 6’0″, 180 lbs — wears L"},

    {"name": "Chapter Hoodie", "price": 20, "category": "Hoodies",
     "desc": "Original Chapter Hoodie.",
     "sizes": ["S", "L"], "badge": "", "soldout": False,
     "stock": {"S": 1, "L": 14},
     "image": "hoodie.jpg",
     "fit_ref": "Model: 6\u20320\u2033, 180 lbs \u2014 wears L"},
]

# ---- 5. RETIRED (not for sale yet) ---------------------------------
# Parked here until we have the items in hand. To bring one back:
# cut its block, paste it into PRODUCTS above, rerun build.py.
# Nothing in this list touches the site.
RETIRED = [
    # ---------- LIMITED EDITION ----------
    {"name": "Breast Cancer Awareness T-Shirt", "price": 25, "category": "Limited Edition",
     "desc": "Pink-accented awareness tee. A portion of proceeds is donated.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Limited", "soldout": False},

    {"name": "Halloween Crewneck", "price": 42, "category": "Limited Edition",
     "desc": "Seasonal Halloween crewneck — limited seasonal run.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Limited", "soldout": False},

    {"name": "Christmas Crewneck", "price": 42, "category": "Limited Edition",
     "desc": "Festive holiday crewneck — order before the winter deadline.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Limited", "soldout": False},

    {"name": "Fall 2026 Away Weekend T-Shirt", "price": 25, "category": "Limited Edition",
     "desc": "Away Weekend tee for Fall 2026 — one-time print.",
     "sizes": ["S", "M", "L", "XL"], "badge": "Limited", "soldout": False},

    # ---------- ACCESSORIES ----------
    {"name": "Mug", "price": 14, "category": "Accessories",
     "desc": "Ceramic mug with the chapter crest — dishwasher safe.",
     "sizes": [], "badge": "", "soldout": False},

    {"name": "Beanie", "price": 20, "category": "Accessories",
     "desc": "Ribbed knit beanie with a woven gold tag.",
     "sizes": ["OS"], "badge": "", "soldout": False},

    {"name": "Key Chain", "price": 8, "category": "Accessories",
     "desc": "Metal key chain stamped with the chapter letters.",
     "sizes": [], "badge": "", "soldout": False},

    {"name": "Bottle Opener", "price": 10, "category": "Accessories",
     "desc": "Chapter-crest bottle opener with a sturdy grip.",
     "sizes": [], "badge": "", "soldout": False},

    # ---------- ALUMNI ----------
    {"name": "Alumni T-Shirt", "price": 24, "category": "Alumni",
     "desc": "Alumni tee marking your chapter and graduation.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "", "soldout": False},

    {"name": "Alumni Hoodie", "price": 48, "category": "Alumni",
     "desc": "Alumni-edition fleece hoodie with gold embroidery.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "", "soldout": False},

    {"name": "Alumni Crewneck", "price": 42, "category": "Alumni",
     "desc": "Alumni crewneck with the chapter crest.",
     "sizes": ["S", "M", "L", "XL", "2XL"], "badge": "", "soldout": False},

    {"name": "Alumni Beanie", "price": 22, "category": "Alumni",
     "desc": "Knit alumni beanie with a woven gold tag.",
     "sizes": ["OS"], "badge": "", "soldout": False},

    {"name": "Alumni Mug", "price": 15, "category": "Alumni",
     "desc": "Ceramic alumni mug with the chapter crest.",
     "sizes": [], "badge": "", "soldout": False},
]
