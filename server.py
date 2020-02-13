import data_manager
from flask import Flask, render_template,request, make_response, session, redirect, url_for, g
import os

app = Flask(__name__)

@app.route('/')
@app.route('/index)
def index_page():
    return render_template('index.html')




if __name__ == '__main__':
    app.run(debug=True)
