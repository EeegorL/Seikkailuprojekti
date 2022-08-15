window.addEventListener("keypress",(e)=>{
    switch(e.key){
        case "w":
            console.log("Pohjoiseen!");
            
            break;
        case "a":
            console.log("Länteen!")
            break;
        case "s":
            console.log("Etelään!")
            break;
        case "d":
            console.log("Itään!")
            break;
    }
})