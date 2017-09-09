var frutas = ["banana","caqui","caju","morango"]

for(i in frutas){
    console.log('FRUTA :', frutas[i])
}
setTimeout(function(){
    console.log("outra msg")
},2000)

setTimeout(function(){
    console.log("outra msg marota")
},1000)
