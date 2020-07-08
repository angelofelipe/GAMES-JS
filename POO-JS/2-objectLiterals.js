//ESTE CÓDIGO TEM UM FIM DIDÁTICO E DE CONSULTA, ENTÃO NÃO SE IMPORTE COM TANTOS COMENTÁRIOS.

//COMO AS COISAS FUNCIONAM POR DE BAIXO DOS PANOS-HERANÇA DE PROPRIEDADES E MÉTODOS.ENCADEAMENTO DE PROTOTYPES

/*ISTO É UMA CLASSE EM SUA FORMA 'PURA', MAS A DECLARAÇÃO DE MÉTODOS DEVE SER FEITA FORA DO 'CONSTRUCTOR' ATRAVÉS DE UM 'PROTOTYPE'
function User(_email, _name){
    this.email = _email;
    this.name = _name;
    this.online = false;
    this.login = function(){
        console.log(this.email, 'has logged in');
    }
};
*/

//ISTO É UMA CLASSE ESCITA POR MEIO DE UMA FUNÇÃO-EMULATION
function User(_email, _name){
    this.email = _email;
    this.name = _name;
    this.online = false;
};

//PARA COLOACARMOS OS MÉTODOS DA CLASSE USAMOS O 'PROTOTYPE'
User.prototype.login = function(){
    this.online = true;
    console.log(this.email, 'has logged in');
};

User.prototype.logout = function(){
    this.online = false; 
    console.log(this.email, 'has logged out');
};

//ESTA É A CLASSE 'Admin' QUE RECEBE A HERÃNÇA DE 'User', ATRAVÉS DA CAPTURA DAS PROPRIEDADES QUE FORAM TRANSPORTADAS DA DECLARAÇÃO DE 'admin' PARA UM ARRAY CHAMADO 'args'(arguments). ESTE ARRAY FOI CRIADO A PARTIR DOS TRÊS PONTOS ANTES DELE '...args', DENTRO DA CLASSE ENTÃO NÓS CHAMAMOS A CLASSE QUE SE QUER HERDAR E COLOCAMOS O PONTO SEGUIDO DA PALAVRA 'apply'. ENTRE PARÊNTESES ENTÃO, DEFINIMOS QUE A APLICAÇÃO DEVE SER FEITA NA PRÓPRIA CLASSE PASSANDO OS VALORES DO ARRAY DEFINIDO('args'),  E ASSIM OCORRE A HERÃNÇA. PARA ACRESCENTAR OUTRA PROPRIEDADE, FAZEMOS O MESMO QUE NA CLASSE INICIAL.
function Admin(...args){
    User.apply(this, args);
    this.role = 'super admin';
};

//O MÉTODO 'apply' HERDA APENAS AS PROPRIEDADES DA CLASSE ESCOLHIDA, MAS NÃO HERDA OS MÉTODOS, PARA ISSO DEVEMOS DEFINIR UM PROTOTYPE PARA A 'Admin' QUE RECEBA TODOS OS PROTOTYPES DA CLASSE DESEJADA, FAZEMOS ISSO CRIANDO UM OBJETO A PARTIR DA CLASSE ANTIGA.
Admin.prototype = Object.create(User.prototype);

//COLOCAMOS UM NOVO MÉTODO PARA A CLASSE 'Admin', QUE PERTENCE APENAS A ELE.
Admin.prototype.deleteUser = function(u){
    users = users.filter(user => {
        return user.email != u.email
    });
};

//DECLARAÇÃO DAS INSTÂNCIAS CRIADAS A PARTIR DAS CLASSES CRIADAS ANTERIORMENTE.
let userOne = new User('rafael@gmail.com','Rafael');
let userTwo = new User('gustavo@gmail.com','Gustavo');
let admin = new Admin('epilef@gmail.com', 'Epilef');

//OUTRAS FUNCIONALIDADES
let users = [userOne, userTwo, admin];

console.log(userOne);
userTwo.login();
console.log(admin);

/*FORMA MAIS ATUAL E RÁPIDA DE ESCRVER CLASSES
*/
class User {
    constructor(_name, _email){
        this.name = _name;
        this.email = _email;
        this.score = 0;
    }
    login(){
        console.log(this.email, 'has logged in')
        return this;
    }
    logout(){
        console.log(this.email, 'has logged out')
        return this;
    }
    updateScore(){
        this.score++;
        console.log(this.email, 'score is now', this.score);
        return this;
    }
};

class Admin extends User{
    deleteUser(user){
        users = users.filter(u => {
            return u.email != user.email;
        })
    }
};

let userOne = new User('Piriquito','piriquito2000@gmail.com');
let userTwo = new User('Mario','mariobros@gmail.com');
let admin = new Admin('shaun', 'shaun@ninjas.com');

let users = [userOne, userTwo, admin];

userOne.login().updateScore().updateScore().logout();

admin.deleteUser(userTwo);

console.log(users);/*
*/

/* FORMA ANTIGA E REPETITIVA(HARD CODING-REESCREVENDO VÁRIAS VEZES A MESMA COISA)

let userOne = {
    email: 'fangeloferreira2013@gmail.com',
    name: 'Epilef',
    login(){
        console.log(this.email, 'has logged in')
    },  
    logout(){
        console.log(this.email, 'has loogged out')
    }
};

userOne.login();
userTwo.logout();

console.log(userOne.name);
console.log(userTwo.name);
*/