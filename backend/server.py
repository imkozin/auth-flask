from flask import Flask

app = Flask(__name__)

@app.route('/users')
def users():
    return {"employees": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)