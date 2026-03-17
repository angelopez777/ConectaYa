from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app) # Importante para conectar con el frontend

# Configuración de SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///conecta_ya.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de Usuario
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    password = db.Column(db.String(200), nullable=False)

# Crear base de datos automáticamente
with app.app_context():
    db.create_all()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    usuario = Usuario.query.filter_by(correo=data['correo']).first()
    
    if usuario and check_password_hash(usuario.password, data['password']):
        return jsonify({"mensaje": "Éxito", "nombre": usuario.nombre}), 200
    
    return jsonify({"mensaje": "Correo o contraseña incorrectos"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if Usuario.query.filter_by(correo=data['correo']).first():
        return jsonify({"mensaje": "El correo ya existe"}), 400
    
    hashed_pw = generate_password_hash(data['password'])
    nuevo = Usuario(nombre=data['nombre'], correo=data['correo'], 
                    telefono=data.get('telefono'), password=hashed_pw)
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"mensaje": "Usuario creado"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)