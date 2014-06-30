var Competence=new Array();
var Court = new Array();
var Long= new Array();
var Prestation = new Array();
var Discussion = new Array();

window.addEventListener("load", Demarrage);

function CreerSousCompetence(ObjComp,TexteCourt,TexteLong){ // D�finition de l'objet Fus�e
	this.Obj=ObjComp;
	this.Court=TexteCourt; 
	this.Long=TexteLong;
}

function Demarrage(){
/// textes courts
	Court[1]="C1.1 Jusitifier";
	Court[2]="C1.2 D�tailler";
/// textes longs	
	Long[1]="C1.1 Jusitifier </br> Dans une situation donn�e, un codage num�trique ou l'usage d'un format appropri�, qu'un programme r�alise l'action attendue"
	Long[2]="C1.2 D�tailler </br> Le d�roulement d'une communication, le r�le des constituants d'un syst�me num�rique ou d'une page web, ce qu'effectue tout ou partie d'un programme ou de l'algorithme associ�, l'encha�nement des �v�nements qui r�alisent une fonction"
/// cr�ation des objets "comp�tence"
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

