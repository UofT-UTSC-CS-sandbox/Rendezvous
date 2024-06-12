from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import re
from dotenv import load_dotenv
import os
load_dotenv()
ROOTPASSWORD = os.getenv('ROOTPASSWORD')

app = Flask(__name__)
CORS(app)

app.secret_key = 'poyo'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ROOTPASSWORD
app.config['MYSQL_DB'] = 'rendezvous_users'

mysql = MySQL(app)

@app.route('/login', methods=['POST'])
def login():
    msg = ''
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        if username and password:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM accounts WHERE username = %s AND password = %s', (username, password))
            account = cursor.fetchone()
            cursor.close()
            if account:
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                return jsonify({'message': 'Login successful!'})
            else:
                return jsonify({'error': 'Incorrect username or password!'}), 400
        else:
            return jsonify({'error': 'Please provide username and password!'}), 400


@app.route('/logout')
def logout():
	session.pop('loggedin', None)
	session.pop('id', None)
	session.pop('username', None)
	return redirect(url_for('login'))

@app.route('/register', methods=['POST'])
def register():
    msg = ''
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        if username and password and email:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM accounts WHERE username = %s OR email = %s', (username, email))
            existing_user = cursor.fetchone()
            if existing_user:
                return jsonify({'error': 'Username or email already exists!'}), 400
            else:
                cursor.execute('INSERT INTO accounts (username, password, email) VALUES (%s, %s, %s)', (username, password, email))
                mysql.connection.commit()
                cursor.close()
                return jsonify({'message': 'You have successfully registered!'})
        else:
            return jsonify({'error': 'Please fill out the form completely!'}), 400

if __name__ == '__main__':
    app.run(port=5000)