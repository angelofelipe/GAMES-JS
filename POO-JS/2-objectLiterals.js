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

console.log(users);

















//userOne.login();
//userTwo.logout();

/*
console.log(userOne.name);
console.log(userTwo.name);


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
*/