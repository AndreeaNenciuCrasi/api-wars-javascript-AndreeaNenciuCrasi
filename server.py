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
    voted_planets = data_manager.get_all_voted_planets_for_statistics()
    return render_template('index.html', voted_planets=voted_planets)

@app.route('/registration', methods=['GET', 'POST'])
def registration_page():
    return render_template('registration.html')

# @app.route('/voteplanet/<planet_name>', methods=["GET"])
# def vote_planet(planet_name):
#     return planet_name + " xsaxasxa"

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

# @app.route("/get_planet_votes", methods=['GET'])
# def get_planet_votes():
#     #o_variabila = data_manager.get_planet_votes()
#     return jsonify(o_variabila)


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

@app.route('/api/add-voted-planet', methods=['POST'])
def route_add_voted_planet_in_db():
    input_planet_name = request.json['value']
    input_username = request.json['username']
    input_user_id = data_manager.get_user_id_by_name(input_username)
    all_planets_with_user_id = data_manager.get_planet_name_and_user_id()

    vote_in_db = False
    for entry in all_planets_with_user_id:
        if input_planet_name == entry['planet_name'] and input_user_id == entry['user_id']:
            vote_in_db = True

    if vote_in_db == False:
        data_manager.insert_vote(input_planet_name, input_user_id)
    return redirect(url_for('index_page'))

if __name__ == '__main__':
    app.run(debug=True)
