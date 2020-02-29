import database_common as database_common
from psycopg2 import sql

@database_common.connection_handler
def add_user_in_db(cursor, value_username, value_password):
    cursor.execute(
        sql.SQL("INSERT INTO {table} ({col1}, {col2}) VALUES (%s, %s);")
            .format(table=sql.Identifier('users'),
                    col1=sql.Identifier('username'),
                    col2=sql.Identifier('password')), [value_username, value_password]
    )

@database_common.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute(
        sql.SQL("SELECT password FROM {table} WHERE {col1}=%s;")
            .format(table=sql.Identifier('users'),
                    col1=sql.Identifier('username')), [username]
    )
    result = cursor.fetchone()
    password = result['password']
    return password

@database_common.connection_handler
def get_user_id_by_name(cursor, username):
    cursor.execute(
        sql.SQL("SELECT id FROM {table} WHERE {col1}=%s;")
            .format(table=sql.Identifier('users'),
                    col1=sql.Identifier('username')), [username]
    )
    result = cursor.fetchone()
    user_id = result['id']
    return user_id


@database_common.connection_handler
def insert_vote(cursor, planet_name, user_id):
    query = "INSERT INTO planet_votes (planet_id, planet_name, user_id) VALUES (0, %s, %s);"
    cursor.execute(query, (planet_name, user_id))


@database_common.connection_handler
def get_planet_name_and_user_id(cursor):
    query = "SELECT planet_name, user_id FROM planet_votes;"
    cursor.execute(query)
    result = cursor.fetchall()
    return result

@database_common.connection_handler
def get_all_voted_planets_for_statistics(cursor):
    query = "SELECT planet_name, COUNT(planet_name) AS votes FROM planet_votes GROUP BY planet_name ORDER BY votes DESC;"
    cursor.execute(query)
    result = cursor.fetchall()
    return result
