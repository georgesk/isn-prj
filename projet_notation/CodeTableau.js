var Competence=new Array();
var Court = new Array();
var Long= new Array();
var Prestation = new Array();
var Discussion = new Array();

window.addEventListener("load", Demarrage);

function CreerSousCompetence(ObjComp,TexteCourt,TexteLong){ // Définition de l'objet Fusée
	this.Obj=ObjComp;
	this.Court=TexteCourt; 
	this.Long=TexteLong;
}

function Demarrage(){
/// textes courts
	Court[1]="C1.1 Jusitifier";
	Court[2]="C1.2 Détailler";
/// textes longs	
	Long[1]="C1.1 Jusitifier </br> Dans une situation donnée, un codage numétrique ou l'usage d'un format approprié, qu'un programme réalise l'action attendue"
	Long[2]="C1.2 Détailler </br> Le déroulement d'une communication, le rôle des constituants d'un système numérique ou d'une page web, ce qu'effectue tout ou partie d'un programme ou de l'algorithme associé, l'enchaînement des événements qui réalisent une fonction"
/// création des objets "compétence"
	for (var i=1;i<3;i++){
		var ObjComp=document.getElementById(""+i);
		ObjComp.addEventListener("mouseover",Survole);
		Competence[i]=new CreerSousCompetence(ObjComp,Court[i],Long[i]);
		Competence[i].Obj.addEventListener("mouseover",Survole);
		Competence[i].Obj.addEventListener("mouseout",Sort);
	}
	for (var i=1;i<2;i++){
			Prestation[i]=document.getElementById("P"+i);
			Prestation[i].addEventListener("change",ChangePrestation);
			Discussion[i]=document.getElementById("D"+i);
			Discussion[i].addEventListener("change",ChangeDiscussion);
	}
}

function Survole(){
	 Competence[this.id].Obj.innerHTML=Competence[this.id].Long;
	
	
}

function Sort(){
 Competence[this.id].Obj.innerHTML=Competence[this.id].Court;
}

function ChangePrestation(){
	var i=this.id.substring(2,1);
	if (Discussion[i].value<Prestation[i].value) {
		Discussion[i].value=Prestation[i].value;
	}

}

function ChangeDiscussion(){
	var i=this.id.substring(2,1);
	if (Discussion[i].value<Prestation[i].value) {
		Discussion[i].value=Prestation[i].value;
	}

}

