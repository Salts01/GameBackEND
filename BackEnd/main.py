from sqlalchemy import create_engine
from sqlalchemy import select, delete
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import hashlib
from sqlalchemy.orm import sessionmaker
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt

keysec='literalsecret'


engine= create_engine("postgresql://postgres:geloseco@postgresql:5432/db1")

api=FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Session=sessionmaker(bind=engine)
session=Session()

class Base(DeclarativeBase):
    pass

class Game(Base):
    __tablename__="games"
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]
    rating:Mapped[int]
    privado:Mapped[bool]

class User(Base):
    __tablename__="users"
    id:Mapped[int]=mapped_column(primary_key=True)
    nome:Mapped[str]
    email:Mapped[str]
    password:Mapped[str]
    level:Mapped[int]
    ativo:Mapped[bool]
    
users=session.query(User).all()
games=session.query(Game).all()

@api.get('/login')
def Logar(email:str,password:str):
    
    
    
    password=hashlib.sha256(password.encode()).hexdigest()
    try:
        stmt=select(User).where(User.email==email)
        user=session.scalar(stmt)
    except:
        return ('Email ou senha incorreto')

    else:
        
        if user.ativo==False:
            return ('Conta Desativada. Por favor entrar em contato com o suporte.')
                    
        else:
            if password == user.password:
                token=jwt.encode({'level':user.level,'nome':user.nome,'email':user.email},keysec,algorithm='HS256')
                return token


                               

@api.post('/admin/criarUser')
def CriarUser(nome:str,email:str,password:str,level:int,token:str):

        try:
            tokendeco=jwt.decode(token,keysec,algorithms='HS256')

        except:

            print('Token inválido')

        else:

            if tokendeco['level']==1:

                exist=False

                password=hashlib.sha256(password.encode('utf-8')).hexdigest()

                for user in users:
                    if email in user.email:
                        exist=True
                        return('email já cadastrado')

                if exist==False:        

                    if not '@' in email:
                        return('email inválido')
                            
                    elif 4<level:
                        return('Nível de usuário inválido, o nível a ser inserido deve ser de 1 a 4')


                    else:
                        new_user=User(
                        nome=nome,
                        email=email,
                        password=password,
                        level=level,
                        ativo=True
                                    )
                        session.add(new_user)
                        session.commit()
                        return('Usuário ',nome,' criado.')

            else:
                return('Sem privilégios suficiente.')



@api.post('/admin/alteraUser')
def AlterarUser(email:str,password:str,level:int,ativo:bool,token:str):

    try:
        tokendeco=jwt.decode(token,keysec,algorithms='HS256')

    except:
        return ('token inválido')

    else:

        if tokendeco['level']==1:
                        
            try:
                stmt=select(User).where(User.email==email)
                user=session.scalar(stmt)

            except:
                return('Usuário não localizado')

            else:
                user.password=hashlib.sha256(password.encode()).hexdigest()
                user.level=level
                user.ativo=ativo
                session.commit()
                return('realizado com sucesso')

        else:
            return('Sem permissão')
        

@api.get('/admin/Users')    
def VisualizaUsers(token:str):

    try:
        tokendeco=jwt.decode(token,keysec,algorithms='HS256')

    except:
        return('Token inválido')

    else:
        if tokendeco['level']==1:
            Usuarios=[]
            users=session.scalars(select(User))
            for user in users:
                Usuarios.append({'Nome':user.nome,'Email':user.email,'Nivel':user.level,'Ativo':user.ativo})

            return Usuarios
        else:
            return('Permissão insuficiente')

@api.post('/game/PublicarJogo')
def PublicarGame(nome:str,aval:str,privado:bool,token:str):
    
    try:
        tokendeco=jwt.decode(token,keysec,algorithms='HS256')
    
    except:
        return('Token inválido')
    
    else:

        if tokendeco['level']<=2:


            check=False


            

            for game in games:
                if nome == game.name:

                    print('O jogo já existe, não será adicionado')
                    check=False
                else:
                    check=True

            if check:
                new_game=Game(
                    name=nome,
                    rating=aval,
                    privado=privado
                    )

                session.add(new_game)
                session.commit()
                return('Jogo', nome, 'publicado!')
        else:
            return('permissão insuficiente')

@api.post('/game/AlteraGame')
def AlterarGame(identification:str,rating:int,privado:bool,token:str):

    try:
            tokendeco=jwt.decode(token,keysec,algorithms='HS256')
        
    except:
            return('Token inválido')
        
    else:
        if tokendeco['level']<=2:
            try:
                stmt=select(Game).where(Game.id==identification)
                game=session.scalar(stmt)
            except:
                return('Jogo não localizado')

            else:
                game.rating=rating
                game.privado=privado
                session.commit()
                return('Realizada alteração')
        else:
            return('permissão insuficiente')

@api.post('/game/deletaJogo')
def DeletarGame(identification:str,token:str):
    try:
            tokendeco=jwt.decode(token,keysec,algorithms='HS256')
            
    except:
            return('Token inválido')
            
    else:
        if tokendeco['level']<=2:

            try:
                stmt=delete(Game).where(Game.id==identification)
                session.execute(stmt)
                session.commit()

            except:
                return('Jogo não localizado')
                
            else:
                return('Jogo apagado com sucesso.')

        else:
            return('permissão insuficiente')

        

@api.get('/game/Visualizador')       
def Visualizador(token:str):

    Games=[]
    try:
            tokendeco=jwt.decode(token,keysec,algorithms='HS256')
            
    except:
            return('Token inválido')
            
    else:

        if tokendeco['level']<=3:


            
            games=session.scalars(select(Game))
            for game in games:
                Games.append({'Id':game.id,'Nome':game.name,'Privado':game.privado,'Rating':game.rating})
            return Games

        else:

            games=session.scalars(select(Game))
            for game in games:
                if game.privado==False:
                    Games.append({'Id':game.id,'Nome':game.name,'Privado':game.privado,'Rating':game.rating})
            return Games
