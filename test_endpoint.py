import json, urllib.request
from config.local_config import ORDER_TOKEN, ORDER_ENDPOINT

payload = {
    "orderId": "PGN-TEST99",
    "token": ORDER_TOKEN,
    "name": "Test Order",
    "phone": "8044125936",
    "email": "",
    "address": "",
    "classYear": "Senior",
    "pledgeClass": "",
    "notes": "endpoint test - safe to delete",
    "total": 5,
    "totalLabel": "$5",
    "chapter": "Epsilon Iota Chapter",
    "university": "James Madison University",
    "items": [{"name": "PGN Shot Glass", "size": "\u2014", "price": 5, "priceLabel": "$5"}],
}

print("Posting to:", ORDER_ENDPOINT)
print("Token starts with:", ORDER_TOKEN[:8] if ORDER_TOKEN else "(EMPTY!)")
print()
req = urllib.request.Request(ORDER_ENDPOINT,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "text/plain;charset=utf-8"})
try:
    with urllib.request.urlopen(req) as r:
        print("Response:", r.read().decode("utf-8"))
except Exception as err:
    print("Request failed:", err)