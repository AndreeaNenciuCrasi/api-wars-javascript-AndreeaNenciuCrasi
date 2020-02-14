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
