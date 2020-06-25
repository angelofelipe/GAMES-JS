var a1 = 'X', a2 = 'X', a3 = 'X', b1 = '', b2 = '', c1 = '', c3 = '', winner = ''
if((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "") ){
    winner = a1
}
console.log(`${typeof winner},   ${winner}`)