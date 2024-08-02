from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    data = request.json.get('data', [])
    user_id = "saloni_patel_12102003"
    email = "oksalonipatel@gmail.com"
    roll_number = "RA2111003011422"

    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]

    highest_alphabet = sorted(alphabets, key=lambda x: x.lower())[-1:] if alphabets else []

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
