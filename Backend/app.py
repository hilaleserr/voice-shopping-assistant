from flask import Flask, request, jsonify
from db.db_config import get_connection
from gemini_service import analyze_user_input
from utils.sql_builder import build_query

app = Flask(__name__)

@app.route("/search", methods=["POST"])
def search_products():
    user_text = request.json["text"]
    gemini_response = analyze_user_input(user_text)
    query = build_query(gemini_response)

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query)
    columns = [column[0] for column in cursor.description]
    results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    conn.close()
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
