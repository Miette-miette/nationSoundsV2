import CMS from '../model/CMS.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

const infoTemplate= await fetchRessource("./template/informationTemplate.html"); //Template pour la programmation
console.log(infoTemplate);

const articleTemplate= await fetchRessource("./template/articleTemplate.html"); //Template pour les articles

let data=JSON.parse(localStorage.getItem('infoItem'));
console.log(data);

console.log(data.chapeau);
if(!data.chapeau){
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,infoTemplate);
}
else{
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,articleTemplate);
}
