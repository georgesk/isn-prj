var idxEleves;
var competences;

function initPage(){
    // activation des tabs
    $( "#tabs" ).tabs();
    // initialisation de variables globales
    idxEleves = ['A','B', 'C'];
    competences=[
	{name: "C1", type: "super", text: "Décrire et expliquer une situation, un système ou un programme"},
	{name: "C1-1", type: "sub", text:"Justifier dans une situation donnée, un codage numérique ou l'usage d'un format approprié, qu'un programme réalise l'action attendue…"},
	{name: "C1-2", type: "sub", text:"Détailler le déroulement d'une communication numérique, le rôle des constituants d'un système numérique, le rôle des éléments constitutifs d'une page web, ce qu'effectue tout ou partie d'un programme ou de l'algorithme associé, l'enchaînement des événements qui réalisent la fonction attendue par un programme…"},
	{name: "C2", type: "super", text: "Concevoir et réaliser une solution informatique en réponse à un problème"},
	{name: "C2-1", type: "sub", text:"Analyser un besoin dans un système d'information, le fonctionnement d'un algorithme …"},
	{name: "C2-2", type: "sub", text:"Structurer une formule logique, des données, une arborescence, une page web, une approche fonctionnelle en réponse à un besoin…"},
	{name: "C2-3", type: "sub", text:"Développer une interface logicielle ou une interface homme-machine, un algorithme, un programme, un document ou fichier numérique…"},
	{name: "C3", type: "super", text: "Collaborer efficacement au sein d’une équipe dans le cadre d’un projet"},
	{name: "C3-1", type: "sub", text:"Agir au sein d'une équipe dans des rôles bien définis, en interaction avec le professeur."},
	{name: "C3-2", type: "sub", text:"Rechercher et partager une information, une documentation, une explication."},
	{name: "C3-3", type: "sub", text:"Maîtriser l'utilisation d'outils numériques collaboratifs du type ENT, système de gestion de contenu (CMS), groupe de travail, forums…"},
	{name: "C4", type: "super", text: "Communiquer à l'écrit et à l'oral"},,
	{name: "C4-1", type: "sub", text:"Documenter un projet numérique pour en permettre la communication en cours de réalisation et à l'achèvement, tout en précisant le déroulement et la finalité du projet."},
	{name: "C4-2", type: "sub", text:"Présenter le cahier des charges relatif à un projet ou un mini-projet, la répartition des tâches au sein de l'équipe, les phases successives mises en œuvre, le déroulement de l'ensemble des opérations…"},
	{name: "C4-3", type: "sub", text:"Argumenter les choix relatifs à une solution (choix d'un format, d'un algorithme, d'une interface…)."},
	{name: "C5", type: "super", text: "Faire un usage responsable des sciences du numérique en ayant conscience des problèmes sociétaux induits"},,
	{name: "C5-1", type: "sub", text:"Avoir conscience de l'impact du numérique dans la société notamment de la persistance de l'information numérique, de la non-rivalité des biens immatériels, du caractère supranational des réseaux, de l'importance des licences et du droit."},
	{name: "C5-2", type: "sub", text:"Mesurer les limites et les conséquences de la persistance de l'information numérique, des lois régissant les échanges numériques, du caractère suprana­tional des réseaux."},
    ];
    // tableau du cahier de charges ////////////////////////////////////////
    var tCdC=$("#tableauCdC");
    for (var i=9; i>=1; i--){
	var line=$("<tr>");
	line.append($('<td><input type="text" id="fnCode'+i+'" class="blueInput narrowCell data"/></td>'));
	line.append($('<td><input type="text" id="fnName'+i+'" class="blueInput wideCell data"/></td>'));
	line.append($('<td><input type="text" id="critere'+i+'" class="blueInput wideCell data"/></td>'));
	line.append($('<td><input type="text" id="niveau'+i+'" class="blueInput narrowCell data"/></td>'));
	tCdC.after(line);
    }
    // tableau de déclinaison du projet en tâches //////////////////////////
    tabTaches()
    // tableaux de tâches des élèves /////////////////////////////////////
    for (var i=0; i<idxEleves.length; i++){
	tachesParEleve(i);
    }
    // tableau des tâches connues, initialement vide
    $("#fragment-8").append($("<table>",{id: "tachesConnues", border: "1"}));
    // initialise le dialogue d'ouverture de fichiers
    initLoadDialog()
} /* end initPage */

/**
 * Fabrique la table des tâches assignées à un élève, place des systèmes de
 * vérification
 * @param i numéro de l'élève
 **/
function tachesParEleve(i){
    var color=0; // index de couleur
    var lettre=idxEleves[i];
    var divTaches=$("#taches"+lettre)
    divTaches.append($("<h1>VALIDATION DES TÂCHES</h1>"));
    // Nom et prénom de l'élève ///
    var t=$("<table>")
    divTaches.append(t);
    var line=$("<tr>");
    line.append($('<th style="text-align: right">Nom de l\'élève '+lettre+' :</th>'));
    line.append($('<td id="nomEleveCopie'+lettre+'"></td>'));
    t.append(line);
    var line=$("<tr>");
    line.append($('<th style="text-align: right">Prénom de l\'élève '+lettre+' :</th>'));
    line.append($('<td id="prenomEleveCopie'+lettre+'"></td>'));
    t.append(line);
    // tableau des tâches /////////
    var t=$("<table>", {id: "taches-"+lettre})
    divTaches.append(t);
    var line=$("<tr>",{id:"competences"+lettre});
    line.append($("<th class='roundBlackBorder'>TÂCHES</th>"));
    for(var j in competences){
	var c=competences[j];
	var cell=$("<td>", competenceAttr(lettre, j, color, c.text));
	cell.text(c.name);
	line.append(cell);
	color++;
    }
    line.append($("<td class='binaire'>binaire</td>"));
    t.append(line);
    var line=$("<tr>",{id:"evaluables"+lettre});
    line.append($("<th class='roundBlackBorder'>ÉVALUABLE ?</th>"));
    for(var j in competences){
	var c=competences[j];
	line.append($("<td id='"+lettre+"-"+c.name+"' class='no'>NON</td>"));
	color++;
    }
    t.append(line);
    // fabrique les lignes de validation des tâches pour l'élève concerné
    // insérées juste avant la ligne des évaluables définie ci-dessus.
    // initialement on place deux lignes bidon (spécification vide !)
    lignesValidationTaches("",i);
    lignesValidationTaches("",i);
    // tableau des vérifications d'ensemble
    t=$("<table>",{style: "margin-top:1em;"});
    divTaches.append(t);
    var line=$("<tr>");
    line.append($("<th class='roundBlackBorder'>Les compétences C1 à C4 sont évaluées : </th>"));
    line.append($("<td id='c1c4-"+lettre+"' class='no'>NON</td>"));
    t.append(line);
    var line=$("<tr>");
    line.append($("<th class='roundBlackBorder'>Plus de 70% des capacités sont prises en compte : </th>"));
    line.append($("<td id='capa70-"+lettre+"' class='no'>NON</td>"));
    t.append(line);
}

/**
 * Fabrique une ligne de tableau pour la validation des tâches d'un élève
 * la ligne est insérées dans le tableau des tâches d'un élève avant la ligne
 * "evaluables". Au cas où une ligne avec le même texte aurait déjà été
 * renseignée pour les capacités, par exemple pour un élève différent,
 * les capacités sont cochées par avance, sauf si la ligne est factice.
 * Si la ligne est nouvelle, une copie est ajoutée à la des tâches connues.
 * @param specification texte spécifiant la tâche. Si le texte est vide,
 * une ligne avec du faux texte est fabriquée, et elle est marquée comme factice
 * pour faciliter son effacement plus tard.
 * @param i numéro d'élève
 * @param idSpec identifiant de specification
 **/
function lignesValidationTaches(specification, i, idSpec){
    var lettre=idxEleves[i];
    var attribs={};
    if (specification.length==0){
	specification="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.";
	attribs['class'] = "tacheBidon-"+lettre;
    } else {
	// dans le cas d'une ligne pas factice, les lignes factices existantes
	// sont effacées
	$(".tacheBidon-"+lettre).remove();
	attribs['class'] = "tache-"+lettre;
    }
    var line=$("<tr>",attribs);
    var cell=$("<td>", {'class': 'roundBlackBorder'});
    cell.text(specification);
    line.append(cell);
    var color=0;
    for(var j in competences){
	var c=competences[j];
	var cell=$("<td>", competenceAttr(lettre, j, color, "", idSpec));
	line.append(cell);
	color++;
    }
    var binaire=recapBinaire(line);
    line.append("<td>"+binaire+"</td>");
    line.insertBefore("#evaluables"+lettre);
    var binaireDejaLa=trouveLignesValidation(specification);
    if (binaireDejaLa.length > 0){
	forceBinaireLigne(line, binaireDejaLa);
    }
    // memorise la ligne dans les tâches connues
    memLigneValidation(specification, binaire);
}

/**
 * initialise le dialoge qui sert à déposer un fichier de données
 **/
function initLoadDialog(){
    $( "#dialog-load" ).dialog({
	autoOpen: false,
	height: 450,
	width: 350,
	modal: true,
	buttons: {
	    "Échappement": function() {
		$( this ).dialog( "close" );
	    }
	},
    });
}

/**
 * Trouve si une spécification de tâche a déjà été travaillée dans le passé
 * en parcourant la liste des tâches connues.
 * @param specification la désignation d'une tâche
 * @return la chaîne binaire d'une tâche qui aurait été définie plus tôt si
 * elle existe, sinon une chaîne vide.
 **/
function trouveLignesValidation(specification){
    var lines=$("#tachesConnues tr");
    for (var k=0; k<lines.length; k++){
	var sp=$(lines[k]).find("td").first().text();
	if (sp==specification){
	    return $(lines[k]).find("td").last().text();
	}
    }
    return "";
}

/**
 * Memorise une ligne de validation de tâche dans la liste des tâches connues
 * @param specification la définition d'une tâche
 * @param binaire la chaîne de 0 et de 1 qui résume l'état des compétences
 **/
function memLigneValidation(specification, binaire){
    var mem=$("#tachesConnues tr");  // récupère toutes les lignes mémorisées
    for(var i=0; i<mem.length; i++){ // et les parcourt séquentiellement
	var sp=$(mem[i]).find("td").first().text();
	if (sp==specification){
	    // la ligne existe déjà, on ne fait rien !
	    return
	}
    }
    // aucune ligne n'existait avec la même spécification, on recopie
    var l=$("<tr>");
    var c1=$("<td>"); c1.text(specification);
    var c2=$("<td>"); c2.text(binaire);
    l.append(c1,c2);
    $("#tachesConnues").append(l);
}

/**
 * récapitule les cases cochées dans un code binaire
 * param l désigne une ligne de tableau
 * @return une chaîne de 0 et de 1 qui représente l'état des cases à cocher
 * de la ligne.
 **/
function recapBinaire(l){
    var cases=$(l).find(".checkbox");
    var result="";
    for (var i=0; i< cases.length; i++){
	var c=$(cases[i]);
	if (c.hasClass("checked")){
	    result+="1";
	} else {
	    result +="0";
	}
    }
    return result;
}

/**
 * Une case de tableau ayant été cochée ou décochée, cette fonction rafraîchit
 * le récapitualitf bianaire de la ligne touchée, et aussi ceux qui sont
 * maintenus dans d'autres tableaux.
 * @param cell une case de tableau
 * @return la chaîne binaire après rafraîchissement
 **/
function refreshBinaire(cell){
    var line=$(cell).parent();
    return refreshBinaire1(line);
}

/**
 * Cette fonction rafraîchit
 * le récapitualitf bianaire d'une ligne donnée, et aussi ceux qui sont
 * maintenus dans d'autres tableaux.
 * @param line une ligne de tableau
 * @return la chaîne binaire après rafraîchissement
 **/
function refreshBinaire1(line){
    var binaire=recapBinaire($(line));
    var specification=line.find("td").first().text()
    forceTousBinaire(specification, binaire);
    return binaire;
}

/**
 * Remet à jour les chaînes binaires et les cases à cocher
 * pour tous les tableaux de tâches y compris celui des tâches connues.
 **/
function forceTousBinaire(specification, binaire){
    forceBinaire(specification, $("#taches-A"), binaire)
    forceBinaire(specification, $("#taches-B"), binaire)
    forceBinaire(specification, $("#taches-C"), binaire)
    forceBinaire(specification, $("#tachesConnues"), binaire)
}

/**
 * Parcourt un tableau à la recherche d'une spécification dans la 
 * première colonne, et met à jour les cases à cocher en se servant d'une
 * chaîne binaire.
 * @param specification le libellé à trouver en première colonne
 * @param t un tableau
 * @param binaire une chaîne de 0 et de 1
 **/
function forceBinaire(specification, t, binaire){
    var lines=$(t).find("tr");
    for(var i=0; i< lines.length; i++){
	var l=$(lines[i]);
	var col1=l.find("td").first();
	if (col1.text()==specification){ // si la spécification est reconnue
	    forceBinaireLigne(l, binaire);
	}
    }
}

/**
 * Force les cases à cocher d'une ligne selon un motif binaire
 * @param l un objet <tr> à forcer
 * @param binaire une chaîne de 0 et 1 pour cocher/décocher les cases
 **/
function forceBinaireLigne(l, binaire){
    l.find("td").last().text(binaire); // force la dernière colonne
    // puis met à jour les cases à cocher ///////////////////////////
    var cb=l.find(".checkbox");
    for (var j=0; j<cb.length && j<binaire.length; j++){
	var c=$(cb[j]);
	if(binaire.charAt(j)=="0"){
	    c.addClass("unchecked");
	    c.removeClass("checked");
	} else {
	    c.addClass("checked");
	    c.removeClass("unchecked");
	}
	evaluableCapaciteDetail(c);
    }
}

/**
 * purge une ligne de validation pour un élève donné
 * @param specification le texte de la spécification
 * @param i le numero de l'élève
 **/
function purgeLignesValidationTaches(specification,i){
    var lettre=idxEleves[i];
    var taches=$(".tache-"+lettre);
    var n=taches.length;
    var notPurged=null;
    var purged=null;
    for (var j=0; j<n; j++){
	var cell=$(taches[j]).find("td").first();
	if (cell.text()==specification){
	    purged=$(taches[j]);
	} else {
	    notPurged=$(taches[j]);
	}
    }
    if (purged){ // il y a une ligne à ôter
	purged.remove();
	if (notPurged){ // il reste une ligne dans le tableau
	    // on s'en sert pour refaire les évaluables
	    var cb=notPurged.find(".checkbox");
	    for (var j=0; j<cb.length; j++){
		var cell=cb[j];
		evaluableCapaciteDetail(cell);
	    } 
	} else { // il ne reste plus de ligne dans le tableau
	    // tous les évaluables reviennent à NON
	    var yescells=$("#evaluables"+lettre).find("[class='yes']");
	    for(var j=0; j<yescells.length; j++){
		var cell=$(yescells[j]);
		yesNoCell(cell, false);
		evaluableC1C4(lettre);
		evaluable70pcent(lettre);
	    }
	}
    }
}


/**
 * Fabrique 15 lignes de tâches qu'on peut spécifier/planifier pour décliner
 * le projet entre les élèves.
 **/
function tabTaches(){
    var tt=$("#titreTableau");
    for(var i=15; i>=1; i--){
	var line=$("<tr>");
	line.append($("<td class='blueInput'>"+i+"</td>"));
	line.append($("<td><input type='text' id='specif"+i+"' class='blueInput verywideCell data'/></td>"));
	for(var j in idxEleves){
	    var lettre=idxEleves[j];
	    var cell=$("<td>", specifEleveAttr(i,j));
	    line.append(cell);
	}
	line.append($('<td class="sepTableau"></td>'));
	line.append($('<td><input type="text" id="altprof'+i+'" class="mediumCell roundBlackBorder data"/></td>'));
	line.append($('<td><input type="text" id="discipline'+i+'" class="mediumCell greenInput data"/></td>'));
	tt.after(line);
    }
}

/**
 * détermine des attributs la compétence
 * @paral lettre désigne un élève (A, B ou C)
 * @param j l'index d'une une compétence
 * @param colIndex un index de couleurs (on ne tient compte que de sa parité)
 * @param title un titre; si le titre est vide, les cases de type "sub"
 * sont de classe "unchecked chekbox"
 * @param idSpec l'identifiant d'une spécification du tableau de répartition
 * @return des attributs pour une cellule de tableau sous forme de catalogue
 **/
function competenceAttr(lettre, j, colIndex, title, idSpec){
    var c = competences[j];
    var result={style: "width:2.5em;"};
    result["class"] = "check-"+lettre+"-"+c.name;
    if (c.type=="super"){
	result["class"] += " yellowBg";
    } else {
	if(colIndex%2==0) result["class"] += " lightGreenBg";
	else  result["class"] += " lightcyanBg";
    }
    if (title.length==0) {
	if (c.type=="sub"){
	    result.id="check-"+lettre+"-"+c.name+"-"+idSpec;
	    result.onclick = "toggleCheck(this); evaluableCapaciteDetail(this); refreshBinaire(this)";
	    result["class"] += " data unchecked checkbox";
	}
    } else {
	result.title=title
    }
    return result;
}

/**
 * Crée un dictionnaire d'attributs pour une case de tableau
 * @param i un numéro de ligne du tableau de spécification
 * @param j numéro de l'élève
 * @return un dictionnaire d'attributs
 **/
function specifEleveAttr(i,j){
    var result={'class': 'roundBlackBorder unchecked checkbox data',
		id:      "specif-"+i+"-"+idxEleves[j],
		onclick: "if(toggleCheckIfPreviousDefined(this,"+j+")){countSpecifEleve("+j+");}",
	       };
    return result;
}

/**
 * Fait tous les calculs possibles à partir des données saisies dans les
 * onglets et établit les cohérences si nécessaire.
 **/
function reporteNoms(){
    for (var i in idxEleves){
	// report des noms des élèves
	var lettre=idxEleves[i];
	var nom=$("#nomEleve"+lettre).val();
	var prenom=$("#prenomEleve"+lettre).val();
	if (nom && prenom){
	    $("#tabEleve"+lettre).text(nom + " " + prenom);
	    $("#nomEleveCopie"+lettre).text(nom);
	    $("#prenomEleveCopie"+lettre).text(prenom);
	}
    }
}

/**
 * bascule l'indicateur "évaluable" pour un élève et une capacité détaillée
 * @param cell une case de tableau de validation
 **/
function evaluableCapaciteDetail(cell){
    var td=$(cell);
    var classes=td.attr("class");
    var match=/check-(\w)-([-C0-9]*)/.exec(classes);
    var lettre=match[1]; // désigne un élève
    var c=null;
    for (var i in competences){
	if(competences[i].name==match[2]) c=competences[i];
    }
    var j=competences.indexOf(c);
    if (c.type=="sub"){
	var checks=$(".check-"+lettre+"-"+c.name+"[class~='checked']");
	yesNoCell($("#"+lettre+"-"+c.name), checks.length)
	evaluableCapaciteGlobal(lettre,j);
	evaluableC1C4(lettre);
	evaluable70pcent(lettre);
    }
}

/**
 * bascule l'indicateur "évaluable" pour un élève et une capacité globale
 * @param lettre désigne un élève (A, B ou C)
 * @param k l'index d'une capacité détaillée
 **/
function evaluableCapaciteGlobal(lettre,k){
    var cglob;
    for(j in competences){
	var c=competences[j];
	if (c.type=="super") cglob=c;
	if (j==k) break;
    }
    // à ce stade, cglob est la capacité globale avant la capacité détaillée
    // on compte les capacités détaillées qui sont de classe "yes"
    var yes=$("[id^="+lettre+"-"+cglob.name+"-][class=yes]")
    yesNoCell($("#"+lettre+"-"+cglob.name), yes.length);
}

/**
 * détermine si les capacités C1 à C4 sont évaluables
 * @param lettre désigne un élève (A, B ou C)
 **/
function evaluableC1C4(lettre){
    var c1c4=$("#"+lettre+"-C1[class=yes]").length+
	     $("#"+lettre+"-C2[class=yes]").length+
	     $("#"+lettre+"-C3[class=yes]").length+
	     $("#"+lettre+"-C4[class=yes]").length;
    yesNoCell($("#c1c4-"+lettre), c1c4==4);
    yesNoCell($("#c1c4el"+lettre), c1c4==4);
}

/**
 * vérifie si plus de 70% des capacités sont évaluables
 **/
function evaluable70pcent(lettre){
    var ncap=0;
    var evaluables=0;
    for(var j in competences){
	var c=competences[j];
	if (c.type=="sub") ncap++; // comptage des capacités.
	var ev=$(".check-"+lettre+"-"+c.name+"[class~='checked']").length;
	if (ev > 0) evaluables++;
    }
    yesNoCell($("#capa70-"+lettre), (evaluables>=0.7*ncap));
    yesNoCell($("#capa70el"+lettre), (evaluables>=0.7*ncap));
}

/**
 * Bascule les cellules de tableau contenant des OUI ou des noms
 * @param cell une cellule de tableau
 * @param yes vrai si c'est oui
 **/
function yesNoCell(cell, yes){
    if (yes){
	cell.attr("class","yes");
	cell.text("OUI")
    } else {
	cell.attr("class","no");
	cell.text("NON");
    }
}

/**
 * bascule une case cochée
 * @param cell une cellule de tableau (de classe checkbox)
 * @return vri quand la case finit cochée
 **/
function toggleCheck(cell){
    var c=$(cell);
    if (c.hasClass("checked")) {
	c.removeClass("checked"); 
	c.addClass("unchecked");
	return false;
    } else {
	c.addClass("checked");
	c.removeClass("unchecked");
	return true;
    }
}

/**
 * bascule une case de tableau à cocher si la précédente case avec
 * un champ input contient des mots.
 * Par effet de bord, met à jour la liste des tâches pour un élève
 * et aussi dans le registre des tâches connues.
 * @param cell une case de tableau (de classe checkbox)
 * @param i le numéro d'un élève.
 * @return vrai si on a pu basculer la case 
 * (donc si on a trouvé la case précédente non-vide).
 **/
function toggleCheckIfPreviousDefined(cell,i){
    var c=$(cell);
    var tr=c.parent();
    var othercells=tr.children();
    var previous=null;
    var inp=null;
    var idSpec="";
    for(var o in othercells){
	var other=$(othercells[o]);
	inp=$(other.find("input"));
	if (inp.get(0)) {
	    previous=other;
	}
	if (other.get(0)==c.get(0)) break;
    }
    if(previous) {
	inp=$(previous.find("input"));
	idSpec=inp.attr("id");
    }
    var specification=null;
    if(inp) specification=inp.val();
    if (specification && specification.match(/\w+/)) { 
	// présence d'un mot au moins dans la spécification de la tâche
	// on est autorisé à cocher la case ou à la décocher.
	if (toggleCheck(cell)){
	    // selon la case cochée, on gère les lignes du tableau pour l'élève
	    lignesValidationTaches(specification,i, idSpec);
	} else {
	    purgeLignesValidationTaches(specification,i);
	}
	// bloque ou débloque la spécification selon qu'il reste une cache
	// cochée au moins pour cette spécification.
	var line=$(c.parent());
	var cbChecked=line.find(".checkbox[class~='checked']");
	if (cbChecked.length > 0){
	    inp.prop("disabled", true);
	} else {
	    inp.prop("disabled", false);
	}
	return true;
    } else {
	alert("Impossible de cocher une tâche non définie.");
	return false;
    }
}

/**
 * compte le nombre de tâche spécifiées pour un élève et reporte le décompte
 * une case du tableau de déclinaison
 * @param i le numéro de l'élève.
 **/
function countSpecifEleve(i){
    var lettre=idxEleves[i];
    var cochees=$("[id^=specif-][id$=-"+lettre+"][class~='checked']");
    var n=cochees.length;
    $("#totalTaches"+lettre).text(n);
}

//////////////////////////////////////////////////////////////
/// Initialisation de la zone de drop pour l'image de support

$(document).on('dragenter', '#dropimage', function() {
    $(this).css('border', '3px dashed #568ed5');
    return false;
});

$(document).on('dragover', '#dropimage', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).css('border', '3px dashed #568ed5');
    return false;
});


$(document).on('dragleave', '#dropimage', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).css('border', '1px dashed #568ed5');
    return false;
});

$(document).on('drop', '#dropimage', function(e) {
    if(e.originalEvent.dataTransfer){
        if(e.originalEvent.dataTransfer.files.length) {
            // Stop the propagation of the event
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '3px dashed green');
	    var f=e.originalEvent.dataTransfer.files[0];
	    if (! (f.type.match('image/png')||f.type.match('image/jpeg')||f.type.match('image/gif'))) {
                alert("Le format du fichier doit être png, jpg ou gif.") ;
		return false;
            }
            var reader = new FileReader();
	    reader.onload = function (evt) {
		var dataURL=evt.target.result;
		var image=$("<img>",{src:dataURL, id:"supportImage", "class": "data", height: "32em"});
		$("#supportImage").remove();
		$("#dropimage").append(image);
	    };
            reader.readAsDataURL(f); 
        }  
    }
    else {
        $(this).css('border', '1px solid #568ed5');
    }
    return false;
});

///////////////////////////////////////////////////////////////
//////////////// Même chose pour le dropFile //////////////////
/// Initialisation de la zone de drop pour le fichier de données
$(document).on('dragenter', '#dropFile', function() {
    $(this).css('border', '3px dashed #568ed5');
    return false;
});

$(document).on('dragover', '#dropFile', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).css('border', '3px dashed #568ed5');
    return false;
});

$(document).on('dragleave', '#dropFile', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).css('border', '1px dashed #568ed5');
    return false;
});

$(document).on('drop', '#dropFile', function(e) {
    if(e.originalEvent.dataTransfer){
        if(e.originalEvent.dataTransfer.files.length) {
            // Stop the propagation of the event
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '3px dashed green');
	    var f=e.originalEvent.dataTransfer.files[0];
	    var jqxhr = $.getJSON(f.name, function(data) {
		$( "#dialog-load" ).dialog( "close" );
		loadData(data);
	    }).fail(function(d, textStatus, error){
		alert ("Contenu de fichier incompatible (pas au format JSON).\nStatut : "+textStatus+", erreur : "+error);
	    });
        }  
    }
    else {
        $(this).css('border', '1px solid #568ed5');
    }
    return false;
});

/**
 * des données ont été recopiées depuis un fichier, on espère que 
 * c'est compatible avec notre version de logiciel. Après vérification,
 * ces données sont injectées dans les champs de chaque onglet.
 * @param data les données récupérées par le getJSON.
 **/
function loadData(data){
    var msg="";
    var ok=false;
    var o=ownData();
    if (sameStruct1 (o,data)){
	ok=true;
    } else {
	if (includeStruct1 (o,data)){
	    ok=true;
	    msg="Les données sont compatibles,\nelles viennent peut-être d'une\nversion plus ancienne.";
	} else {
	    msg="Les données sont incompatibles. Essayez un autre fichier.";
	}
    }
    if (msg.length > 0) alert(msg);
    if (ok){ // traitement des données récupérées
	console.log(data);
	putData(data);
    }
}


///////////////////////////////////////////////////////////////
/**
 * Sauvegarde de tous les champs de la classe "data"
 **/
function save(){
    var json=JSON.stringify(ownData(), null, "  ");
    $("#data").text(json);
    // window.open( "data:text/json;charset=utf-8," + escape(json));
    window.open( "data:text/json;charset=utf-8," + json);
}

/**
 * Récupère toutes les données exportables de l'application
 * @return un objet avec les données exportables
 **/
function ownData(){
    var obj=$(".data");
    var result={};
    for (var i=0; i<obj.length; i++){
	var o=$(obj[i]);
	var key=o.attr("id");
	if (o.get(0).tagName=="IMG"){
	    result[key]=o.attr("src");
	} else {
	    if (o.hasClass("checkbox")){
		result[key]=o.hasClass("checked");
	    } else {
		result[key]=o.val();
	    }
	}
    }
    return result;
}

/**
 * Injecte des données dans l'application
 * @param obj un objet qui peut se répartir à travers tous les champs
 * de classe "data"
 **/
function putData(obj){
    // on commence par supprimer les lignes de validation
    for(var i in idxEleves){
	var lettre=idxEleves[i];
	$("#taches-"+lettre+" tr[class^='tache']").remove();
    }

    var obj1={};
    var obj2={};
    for (key in obj){ // répartition des données en deux paquets
	if (key.match(/^specif/)){
	    obj1[key]=obj[key];
	} else {
	    obj2[key]=obj[key];
	}
    }
    for (key in obj1){
	// on commence à placer les clés qui commencent par "specif-"
	// car il faut reconstituer les lignes de validation
	var target=$("#"+key);
	if (target.hasClass("checkbox")){
	    // on retrouve de quel élève il s'agit
	    var lettre=key.slice(-1);
	    var i = idxEleves.indexOf(lettre);
	    if (obj1[key]){
		// bascule la coche de la case
		target.addClass("checked");
		target.removeClass("unchecked");
		// la spécification est déjà arrivée au préalable ?
		// on suppose que c'est la cas; il faut alors créer
		// la ligne de validation pour le bon élève.
		var spec=$(target).parent().find("input[id^=specif]").first();
		var idSpec=spec.attr("id");
		var specification= spec.val();
		// pour créer la bonne ligne de validation de capacités
		if (specification.length > 0){
		    lignesValidationTaches(specification, i, idSpec);
		}
	    } else {
		// bascule la coche de la case
		target.addClass("unchecked");
		target.removeClass("checked");
		// case non cochée; pas de ligne de validation.
	    }
	} else { // il s'agit d'un champ input de type texte ou select
	    target.val(obj1[key]);
	}
    }

    for (key in obj2){
	var target=$("#"+key);
	if (key=="supportImage"){
	    var image=$("<img>",{src:obj2[key], id:"supportImage", "class": "data"});
	    $("#supportImage").remove();
	    $("#dropimage").append(image);
	} else {
	    if (target.hasClass("checkbox")){
		if (obj2[key]){
		    target.addClass("checked");
		    target.removeClass("unchecked");
		} else {
		    target.addClass("unchecked");
		    target.removeClass("checked");
		}
	    } else {
		target.val(obj2[key]);
	    }
	}
    }
    // reconstitution des évaluables
    for(var i in idxEleves){
	var lettre=idxEleves[i];
	var premiereLigneTableau=$("#taches-"+lettre+" tr[class^='tache-']").first();
	var cb=premiereLigneTableau.find(".checkbox");
	for (var j=0; j<cb.length; j++){
	    var cell=cb[j];
	    evaluableCapaciteDetail(cell);
	} 
    }
    // refait le calcul des "binaires"
    var validationLines=$("tr[class^='tache-']");
    for(var i =0; i < validationLines.length; i++){
	var line=$(validationLines[i]);
	refreshBinaire1(line);
    }
    // reporte les noms des élèves
    reporteNoms()
}

//// activation des infobulles de luxe //////////////////////////////
$(function() {
    $( document ).tooltip({
	position: {
	    my: "center bottom-20",
	    at: "center top",
	    using: function( position, feedback ) {
		$( this ).css( position );
		$( "<div>" )
		    .addClass( "arrow" )
		    .addClass( feedback.vertical )
		    .addClass( feedback.horizontal )
		    .appendTo( this );
	    }
	}
    });
});

function load(){
    $( "#dialog-load" ).dialog( "open" );
}

/**
 * Compare la structure de deux objets au premier niveau (pas d'objets 
 * imbriqués)
 * @param object1 le premier objet
 * @param object2 le deuxième objet
 * @return une valeur vraie si on trouve des structures équivalentes
 **/
function sameStruct1(object1, object2) {
    var merged = $.extend({}, object1, object2);
    for (var key in merged) {
        if (!key.match(/^check-/) && // ne pas tenir compte des vérifications
	    !key.match(/^supportImage/) && // ni des images
	    (!object1.hasOwnProperty(key) || 
             !object2.hasOwnProperty(key))){
            return false;
        }
    }
    return true;
}

/**
 * Compare la structure de deux objets au premier niveau (pas d'objets 
 * imbriqués), pour une inclusion possible.
 * @param object1 le premier objet
 * @param object2 le deuxième objet
 * @return une valeur vraie la structure de l'objet 1 contient l'autre structure
 **/
function includeStruct1(object1, object2) {
    var merged = $.extend({}, object1, object2);
    for (var key in merged) {
        if (!object1.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

