import CMS from '../model/CMS.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

//RESSOURCES

const hostArticle="https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=5";
const hostConcert="https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=19&per_page=60";

let concertCMS= await cms.dataCMS(hostConcert);// Articles programmation de Nation Sounds WP 

let articleCMS= await cms.dataCMS(hostArticle);//Articles actu
console.log(articleCMS);

//FORMATAGE 

let dataConcert= cms.formateur(concertCMS);
console.log(dataConcert); //données formatées

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle);

//TEMPLATES

const artisteTemplate= await fetchRessource("/src/view/generals/carouselCard.html"); //Template du carousel artiste

const articleTemplate= await fetchRessource("/src/view/generals/articleCard.html"); 

//FONCTION POUR LE TEMPLATING HTML

function affichageCarousel(tab,template,idConteneur){ 

  let displayArticles=[];

  tab.forEach((article) => displayArticles.push(cms.replaceTemplate(article,template)));

  //Convertion des objets "article" en template HTML   
  document.getElementById(idConteneur).innerHTML=displayArticles.join(' '); 
}

//AFFICHAGE CAROUSEL ARTISTES
let concert=[];

dataConcert.forEach((displayConcert)=>concert.push(displayConcert))
affichageCarousel(dataConcert.slice(-7),artisteTemplate,'conteneurCarousel');

//AFFICHAGE ARTICLES FESTIVAL

let article=[];

dataArticle.forEach((displayArticle)=>article.push(displayArticle))
affichageCarousel(dataArticle,articleTemplate,'articleConteneur');

//RECUPERATION DES DONNEES POUR GENERER LA PAGE INFORMATION

function pageInfo(classItem,data){
    let cardItem=document.getElementsByClassName(classItem);

    //Conversion du HTML Collection en un array
    Array.from(cardItem).forEach((card) => card.addEventListener('click',()=>{
    
      //Récuperation des données du click pour afficher la page information avec les données choisies
      localStorage.setItem('infoItem', JSON.stringify(cms.progItemFromTitle(data,card.id)))
      window.open('../src/view/information/information.html','_self');
      }));
  }

pageInfo("carouselCard",concert);
pageInfo("articleCard",article);