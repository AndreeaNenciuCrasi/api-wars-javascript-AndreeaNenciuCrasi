import bcrypt
import data_manager as data_manager
import database_common as database_common
from flask import Flask, render_template,request, make_response, session, redirect, url_for, g
import os

app = Flask(__name__)
app.secret_key = os.urandom((20))

def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')

def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/index')
def index_page():
    return render_template('index.html')

@app.route('/registration', methods=['GET', 'POST'])
def registration_page():
    return render_template('registration.html')


@app.route('/register_form', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        input_username = request.form.get('username')
        input_password = request.form.get('password')
        input_confirm = request.form.get('confirm')
        if input_password == input_confirm:
            hashed_password = hash_password(input_password)
            try:
                data_manager.add_user_in_db(input_username, hashed_password)
            except:
                message_invalid="User already exists!!"
                return render_template('registration.html', message_invalid=message_invalid)
            return redirect(url_for('login'))
        else:
            message = 'Password did not match'
            return render_template('registration.html', message=message)
    return render_template('registration.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        input_username = request.form.get('username')
        input_password = request.form.get('password')
        hashed_password = data_manager.get_password_by_username(input_username)
        if verify_password(input_password, hashed_password):
            session['username'] = input_username
            return redirect(url_for('index_page'))
        else:
            return render_template('login.html', alert_me=True)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index_page'))


if __name__ == '__main__':
    app.run(debug=True)
