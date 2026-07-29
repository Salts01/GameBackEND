from sqlalchemy import create_engine
from sqlalchemy import select, delete
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import getpass
import hashlib
from sqlalchemy.orm import sessionmaker
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



engine= create_engine("postgresql://postgres:geloseco@localhost:5432/db1")

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
negatives=['q','n']

@api.get('/login')
def Logar(email:str,password:str):
    logging=False
    
    
    #email=input('insira seu email: ')
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
                            
                Logged=[user.nome,user.email,user.level,user.password]
                logging=True
                            
                return {'loggin':True, 'usuario':{'nome':user.nome,'email':user.email,'level':user.level}}
                            


"""def CriarUser():
        
        exist=False

        nome=input("Nome de usuário: ")
        email=input("email de usuário: ")
        password=hashlib.sha256(getpass.getpass('senha de usuário: ').encode('utf-8')).hexdigest()
        level=input('Insira o nível de usuário: ')

        for user in users:
            if email in user.email:
                exist=True

            if not '@' in email:
                print('email inválido')
                        
            elif exist:
                            
                ans=input('email já cadastrado. Deseja reativar esta conta? ')
                if not ans in negatives:
                    stmt=select(User).where(User.email==email)
                    user=session.scalar(stmt)
                    user.ativo=True
                    session.commit()



            elif 4<int(level):
                print('Nível de usuário inválido, o nível a ser inserido deve ser de 1 a 4')


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
                print('Usuário ',nome,' criado.')

def AlterarUser():
    
    email=input('digite o email de usuário: ')
    act=input('1-Alterar senha\n2-Alterar nível de usuário\n3-Voltar')
                        
    stmt=select(User).where(User.email==email)
    user=session.scalar(stmt)
    print('\nNome=> ',user.nome,'\nEmail=> ',user.email,'\nNível=> ',user.level,'Ativo=> ',user.ativo)

    match int(act):
                            
        case 1:
                                
            password=hashlib.sha256(getpass.getpass('Nova senha: ').encode('utf-8')).hexdigest()
            user.password=password
            session.commit()
                            
        case 2: 
                                
            level=input('Insira o novo nível de usuário: ')
            user.level=level
            session.commit()
                            
        case 3:
            print('Retornado...')

def DeletaUser():
    email=input('digite o email de usuário: ')
                            
    stmt=select(User).where(User.email==email)
    user=session.scalar(stmt)
    user.ativo=False
    session.commit()

def VisualizaUsers():
    for user in users:
        print('|Nome=> ',user.nome,'|| Email=> ',user.email,'|| Nível=> ',user.level,'|| Ativo=> ',user.ativo,'|')

def User_manager(loginfo):
            
            if loginfo[2] == 1:
                
                while True:
                    act=int(input('\n1-Adicionar Usuário\n2-Alterar Usuário\n3-Desativar Usuário\n4-Visualizar usuários\n5-Voltar\n'))
                    match act:
                        
                        case 1:
                            
                            CriarUser()
                        
                        case 2:
                            
                            AlterarUser()

                        case 3:
                            
                            DeletaUser()

                        case 4:

                            VisualizaUsers()

                        case 5:
                            print('\nRetornando...')
                            break
            else:
                print('Permissão Insuficiente')

def PublicarGame():
    while True:
        priv=False
        queue=input('Deseja adicionar um novo? ')
        if queue in negatives:
            print('retornando...')
            break 
        check=False
        nome=input('\nNome: ')
        aval=input('\navaliação: ')
        privado=input('\nprivar conteúdo?:  ')

        if privado in negatives:
            priv=False
        else:
            priv=True

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
                privado=priv
            )

            session.add(new_game)
            session.commit()

def AlterarGame():
    identification=int(input('Digite o id do jogo a ser alterarado: '))
    stmt=select(Game).where(Game.id==identification)
    game=session.scalar(stmt)
    print('| ID: ',game.id,'|| Nome: ',game.name,'|| Rating: ', game.rating, '|| Privado: ',game.privado,' |')


    while True:
        opt=int(input('\n1-Alterar Rating\n2-Alterar Privacidade\n3-Voltar\n'))

        match opt:
            case 1:
                
                rating=int(input('\nInsira o novo rating: '))
                
                if rating <= 10 and rating > 0:
                    game.rating=rating
                    session.commit()
                    print('\nRealizada alteração do Rating\n')

            case 2:
                
                public=input('\nDeseja tornar público?\n')
                
                if public not in negatives:
                    game.privado=True
                    session.commit()
                    print('Realizada alteração para PRIVADO')
                
                else:
                    game.privado=False
                    session.commit()
                    print('Realizada alteração para PÚBLICO')

            case 3:
                print('\nretornando...')
                break

def DeletarGame(loginfo):
    identification=input('Insira o id da publicação a ser deletada:')
    password=hashlib.sha256(getpass.getpass('insira sua senha: ').encode("utf-8")).hexdigest()
    if str(password)==loginfo[3]:


        stmt=delete(Game).where(Game.id==identification)
        session.execute(stmt)
        print('Deletado post com sucesso.')
    else:
        print('Senha de verificação incorreta')

def Game_manager(loginfo):
    if loginfo[2]<3:
        while True:
            opt=int(input('\n1-Publicar Novo Game\n2-Alterar Post\n3-Deletar Post\n4-Voltar\n'))

            match opt:
                

                case 1:
                    PublicarGame()
                
                case 2:
                    
                    AlterarGame()
                
                case 3:

                    DeletarGame(loginfo)
                
                case 4:

                    print('Voltando...')
                    break

def PesquisaGame(loginfo):
    
    while True:
        
        print('\ndigite q ou n para voltar')
        nome=input('\nNome: ')
        
        if nome not in negatives:
            
            try:
                stmt=select(Game).where(Game.name==nome)
                game=session.scalar(stmt)
                Check=game.name

            except AttributeError:
                print('\nJogo não localizado')
                continue
            else:
                if loginfo[2]>3 and game.privado==True:
                    print ('\nsem permissão para visualização')
                
                else:
                    print('\n| ID: ',game.id,'|| Nome: ',game.name,' || Rating: ',game.rating)
        
        else: 
            
            break
        
def Visualizador(loginfo):
    while True:
        for game in games:
            if loginfo[2]>3 and game.privado==False:
                print('\n | Nome: ',game.name,'|| Rating: ',game.rating,' || Id: ',game.id)
            elif loginfo[2]<3:
                print('\n | Nome: ',game.name,'|| Rating: ',game.rating,' || Id: ',game.id)
        
        opt=int(input('\n1-Pesquisa\n2-Voltar\n'))
        match opt:

            case 1:
                PesquisaGame(loginfo)
            case 2:
                print('\nVoltando...')
                break



def init(loginfo):
    while True:
        opt=int(input('1-Gestão de Usuários\n2-Gestão de dados\n3-Visualização de dados\n4-Sair\n'))
    
        match opt:
            case 1:
                User_manager(loginfo)
            
            case 2:
                Game_manager(loginfo)
            
            case 3:
                Visualizador(loginfo)
            
            case 4: 
                print('\nSaindo...')
                break

loginfo=Logar()
init(loginfo)"""