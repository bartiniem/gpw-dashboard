from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from sqlalchemy import UniqueConstraint

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relacja: użytkownik -> wiele portfeli
    wallets = db.relationship('Wallet', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.email}>'


class Wallet(db.Model):
    __tablename__ = 'wallets'

    id = db.Column(db.Integer, primary_key=True)
    # Identyfikator/alias portfela, np. "1234" z pliku 1234.yaml
    code = db.Column(db.String(255), nullable=False)
    # Pełna lub względna ścieżka do pliku YAML z danymi portfela
    file_path = db.Column(db.String(1024), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Powiązanie z użytkownikiem
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='wallets')

    __table_args__ = (
        UniqueConstraint('user_id', 'code', name='uq_user_wallet_code'),
    )

    def __repr__(self):
        return f'<Wallet {self.code} user_id={self.user_id}>'
