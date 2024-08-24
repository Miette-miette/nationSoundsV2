const question= document.getElementsByClassName("question");
console.log(question);

const reponse=document.getElementsByClassName("reponse");
console.log(reponse);

const imgFleche=document.getElementsByClassName('voirPlus');
console.log(imgFleche);

function showQuestion(){

    for(let f=0;f<question.length;f++){
        question[f].addEventListener('click', ()=>{

            if(reponse[f].style.display==="flex"){
                reponse[f].style.display="none";
                imgFleche[f].style.rotate="82deg";
            }
            else{
                reponse[f].style.display="flex";
                imgFleche[f].style.rotate="265deg";  
            } 
        })    
    }   
}