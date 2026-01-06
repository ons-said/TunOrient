from app.core.security import hash_password, verify_password
h = hash_password("ministry")
print(verify_password("ministry", h))  # Should print True
print(verify_password("ministry", "$2b$12$yoZV3NjiinqA4Q8xeiLK.GUTQaSxYBrpSayFA0GmN6o3B.UZLNEO"))