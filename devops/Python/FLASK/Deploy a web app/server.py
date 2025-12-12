from flask import Flask, render_template, request
from Maths.mathematics import summation, subtraction, multiplication

app = Flask(__name__)

@app.route("/")
def render_index_page():
    return render_template("index.html")

@app.route("/sum")
def sum_route():
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    try:
        result = summation(int(num1), int(num2))
        return str(result)
    except (ValueError, TypeError):
        return "Invalid input: Please enter numbers only."
    
@app.route("/sub")
def sub_route():
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    try:
        result = subtraction(int(num1), int(num2))
        return str(result)
    except (ValueError, TypeError):
        return "Invalid input: Please enter numbers only."

@app.route("/mul")
def mul_route():
    num1 = request.args.get("num1")
    num2 = request.args.get("num2")
    try:
        result = multiplication(int(num1), int(num2))
        return str(result)
    except (ValueError, TypeError):
        return "Invalid input: Please enter numbers only."

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 8080, debug=True)
