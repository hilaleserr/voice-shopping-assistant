import json

def build_query(gemini_response_text):
    try:
        filters = json.loads(gemini_response_text)
    except json.JSONDecodeError:
        # Eğer JSON değilse basit default sorgu döndür
        return "SELECT * FROM products"

    query = "SELECT * FROM products WHERE 1=1"

    if filters.get("category"):
        query += f" AND category = '{filters['category']}'"
    if filters.get("color"):
        query += f" AND color = '{filters['color']}'"
    if filters.get("size"):
        query += f" AND size = '{filters['size']}'"
    if filters.get("material"):
        query += f" AND material = '{filters['material']}'"
    if filters.get("max_price"):
        query += f" AND price <= {filters['max_price']}"

    return query
