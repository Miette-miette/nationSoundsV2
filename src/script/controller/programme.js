import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE PROGRAMATION ID=14

const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=14&per_page=60");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

const dataArticle= cms.formateur(articleCMS);//données formatées
console.log(dataArticle); 

const progTemplate= await fetchRessource("../../view/programme/programmeTemplate.html"); //Template de la page programme

let progFiltre={//DONNEES DES FILTRES
    
    "jour": "tous" ,
    "heure": 14,
    "lieux":"tous", 
    "type":"tous",  
}

let iconeScene={//ICONES DES SCENES
    "Euphorie":"/src/assets/media/scene/euphorie.png",
    "Fusion":"/src/assets/media/scene/fusion.png",
    "Reverie":"/src/assets/media/scene/fusion.png",
    "Patio":"/src/assets/media/scene/le patio.png",
    "Prisme":"/src/assets/media/scene/prisme.png",
    "Resonance":"/src/assets/media/scene/resonance.png",
}

//Fonction AFFICHAGE

function affichageItem(tab){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],progTemplate); 
    }
    document.getElementById('progConteneur').innerHTML=tab.join(' '); 
}

//Affichage ALL

let all=[];

for (let i=0;i<dataArticle.length;i++){
        let sceneName=Object.keys(iconeScene);
        let sceneImg=Object.values(iconeScene);

        for(let j=0;j<sceneName.length;j++){
            if(dataArticle[i].scene==sceneName[j]){
            dataArticle[i]["iconScene"]=sceneImg[j];
        }   
    }
    
    all.push(dataArticle[i]);   
}
affichageItem(all);
cms.pageInformation("progItem",dataArticle);

//Fonction FILTRAGE 

function filtrageItem(data,progFiltre){
    let progTab=[];
    
    filtre.filtreAll(data,progFiltre,progTab)
    
    affichageItem(progTab);
    cms.pageInformation("progItem",data);
    console.log(progTab);
    
}

//RECUPERER LES DONNEES DES INPUTS

function filtreChange(){

    //JOUR
    progFiltre.jour=document.getElementById("jour").value;

    //HEURE
    progFiltre.heure=document.getElementById("heure").value;

    //LIEU
    progFiltre.lieux=document.getElementById("lieu").value;

    //TYPE
    progFiltre.type=document.getElementById("type").value;

    console.log(progFiltre);
    //FILTRAGE 
    filtrageItem(dataArticle,progFiltre);

}

//ADD EVENT LISTENER SUR LES SELECTS ET INPUTS

function setup(){

    //Recuperation des input
    let onchangeElem= document.getElementById('heure');
    onchangeElem.addEventListener('change',filtreChange);
    
    //Recuperation des select
    let onchangeSelect= document.getElementsByTagName('select');
    for (let i=0;i<onchangeSelect.length;i++){
      onchangeSelect[i].addEventListener('change',filtreChange);
    } 
  }

setup();

//SLIDER FILTRE POUR LA VERSION MOBILE ET TABLETTE

function showFiltre(){

    const progFiltreConteneur=document.getElementById('filtreTitre');

    const filtre=document.getElementsByClassName('filtreConteneur');

    const imgFleche=document.getElementsByClassName('voirPlus');

    progFiltreConteneur.addEventListener('click', ()=>{
        for(let i=0;i<filtre.length;i++){
       
            if(filtre[i].style.display==="flex"){
                filtre[i].style.display="none";
                imgFleche[0].style.rotate="82deg";
            }
            else{
                filtre[i].style.display="flex";
                imgFleche[0].style.rotate="265deg";
            } 
        }  
    })
            
        
}
showFiltre();
