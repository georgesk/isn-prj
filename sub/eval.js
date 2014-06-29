/**
 *   ISN-eval v0.2
 *
 *   Copyright 2014 Georges Khaznadar <georgesk@debian.org>
 *
 *   ISN-eval is free software licensed under the GNU GPL-3+
 *
 *   You can redistribute it and/or modify it under the terms of the
 *   GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   ISN-eval is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License 
 *   along with ISN-eval v0.2. If not, see <http://www.gnu.org/licenses/>.
 **/

/**
 * le programme suppose que les bibliothèques jquery et jquery-ui sont
 * chargées par avance, ainsi que les bibliothèques 
 * competences.js et indicateurs.js
 **/


/**
 * variables globales concernant la disposition des curseurs
 **/
var nbCapacites = indicateurs.length; // nombre d'indicateurs
var levels = [0, 1, 2, 3]; // niveaux possibles

var r1 = 6, r2 = 9;        // plus petite et plus grande valeur du rayon
var gliders=[];            // liste des curseurs

/**
 * cette fonction fabrique une fonction de rappel qui servira pour les
 * évènements de 'snap', quand les curseurs changeront de place.
 *
 * @param points une liste de points
 * @param levels une liste de valeurs de ces points
 **/ 
function makeSnapFunction(points, levels){ 
    /* variable statique pour la fonction fabriquée */
    var lastlevel=-1;
    return function(){
	// dans le contexte de la fonction renvoyée, 'this' est censé
	// être un 'Glider' c'est àdire un curseur mobile.
	// on trouve le point de la liste 'points' qui est le plus proche de
	// 'this' et on renvoie éventuellement son nom et la valeur qui lui
	// est attachée.
	var found=0;
	var d = this.Dist(points[0]);
	for(var i=1; i < points.length; i++){
	    var d1 = this.Dist(points[i]);
	    if (d1 < d){
		d = d1;
		found=i;
	    }
	}
	if (levels[found] != lastlevel){
	    // pas d'action si le snap n'a pas changé depuis la dernière fois.
	    lastlevel = levels[found];
	    ajusteIndicateurTableau(this.index,levels[found]);
	    feedback1("<div class='score1'>",levels[found], "</div>", this.desc);
	}
    };
};

/**
 * ajuste un indicateur dans la vue tableau
 * @param index le numéro d'ordre de l'indicateur
 * @param val sa valeur
 **/
function ajusteIndicateurTableau(index, val){
    var sel = $("#indic"+index);
    sel.val(val);
}

/**
 * ajuste un glider dans la vue graphique
 * @param index le numéro d'ordre de l'indicateur
 * @param val sa valeur
 **/
function ajusteIndicateurGraphique(index, val){
    var g=gliders[index];
    var r=r1+(r2-r1)*val/(levels.length-1);
    g.moveTo([Math.cos(g.angle)*r, Math.sin(g.angle)*r],1000)
}

/**
 * Cette fonction prend la liste de ses arguments et les affiche (forcés
 * au type chaîne) dans l'élément qui a pour id "feedback1"
 * @param args une liste variable d'arguments
 **/
function feedback1(){
    var html="<p>";
    for (var i=0; i< arguments.length; i++){
	html += arguments[i]+" ";
    }
    html += "</p>";
    $("#feedback1").html(html);
}
/**
 * Création de la vue tabulaire des compétences et des indicateurs
 * insère un tableau dans un élément DOM
 * @param boxid l'id d'un élément DOM
 **/
function createTables(boxid){
    var t =$("<table>",{"class": "table1"});
    var indic_index = 0;
    $("#"+boxid).append(t);
    for(var c0 in competences){
	var tr=$("<tr>");
	t.append(tr);
	var cg=$("<colgroup>");
	t.append(cg);
	var col1=$("<col span='1' style='width: 20%;'>");
	cg.append(col1);
	var col2=$("<col span='1' style='width: 80%;'>");
	cg.append(col2);
	var td = $("<td>");
	td.html("<b>"+c0+"</b> "+competences[c0].desc);
	tr.append(td);
	if ("sub" in competences[c0]){
	    var td1=$("<td>");
	    tr.append(td1);
	    var t1=$("<table>",{"class": "table2"});
	    td1.append(t1);
	    var cg=$("<colgroup>");
	    t1.append(cg);
	    var col1=$("<col span='1' style='width: 40%;'>");
	    cg.append(col1);
	    var col2=$("<col span='1' style='width: 60%;'>");
	    cg.append(col2);
	    for(var c1 in competences[c0].sub){
		var tr1 = $("<tr>");
		t1.append(tr1);
		var td = $("<td>");
		td.html("<b>"+c1+"</b> "+competences[c0].sub[c1].desc);
		tr1.append(td);
		// on récupère les indicateurs relatifs à la capacité c1
		var matching = indicateurs.filter(function(elt, idx, arr){return elt[1]==c1;})
		tr1.append(cellWithTable(matching, indic_index));
		indic_index=indic_index+matching.length;
	    }
	} else { // pas de subdivision de la compétence
	    var matching = indicateurs.filter(function(elt, idx, arr){return elt[1]==c0;})
	    tr.append(cellWithTable(matching, indic_index));
	    indic_index=indic_index+matching.length;
	}
    }
}

/**
 * fabrique une case contenant un tableau avec les indicateurs qui
 * correspondent à une capacité. La case est vide s'il n'y a pas
 * d'indicteurs sélectionnés.
 * @param matching tableau d'indicateurs sélectionnés par capacité
 * @param indic_index un index des indicateurs qui permet de faire la liaison
 * avec les "gliders"
 * @return un objet jQuery représentant une cellule de tableau
 **/
function cellWithTable(matching, indic_index){
    var td = $("<td>",{"class":"indicateur"});
    if (matching.length==0) return td;
    var t2=$("<table>",{"class": "table3"});
    td.append(t2);
    var cg=$("<colgroup>");
    t2.append(cg);
    var col1=$("<col span='1' style='width: 10%;'><col span='1' style='width: 90%;'>");
    cg.append(col1);
    for(var i=0; i < matching.length; i++){
	var tr=$("<tr>");
	t2.append(tr);
	var td1 = $("<td>");
	tr.append(td1);
	var sel= $("<select>", {id: "indic"+indic_index});
	var index=indic_index; // recopie avant de générer la fonction
	sel.change(function(){
	    ajusteIndicateurGraphique(index, $(this).val());
	});
	indic_index++;
	td1.append(sel);
	for (var j=0; j <4; j++){
	    var op=$("<option>", {value: j});
	    sel.append(op);
	    op.html(j)
	}
	td1 = $("<td>");
	tr.append(td1);
	td1.html(matching[i][0]);
    }
    return td;
}

/**
 * création des curseurs
 * @param boxid id d'un élément DOM où créer le panneau de JSXgraph
 **/
function createGliders(boxid){
    var brd = JXG.JSXGraph.initBoard(boxid, {boundingbox: [-10, 10, 10, -10]});

    var center = brd.create('point', [0, 0],{
	name: "", 
	fixed: true, 
	face: '+', 
	size: 1,
    });
    for(var i=0; i < nbCapacites; i++){ // crée autant de curseurs qu'il faut
	var angle = 2 * Math.PI * i / nbCapacites;
	var attractors=[];
	for(j=0; j < levels.length; j++){ // pour autant de niveaux qu'il faut
	    // on crée un attracteur
	    var r = r1 + (levels[j]-levels[0])*(r2-r1)/(levels[levels.length-1]- levels[0]);
	    var at = brd.create('point', [r*Math.cos(angle), r*Math.sin(angle)],{
		name: "", 
		fixed: true, 
		face: '+', 
		size: 2,
	    });
	    attractors.push(at); // on range l'attracteur
	    // on trace un cercle
	    var c = brd.create('circle',[center, r], {
		color: '#EEEEEE', 
		dash: 2, 
		fillOpacity: 0,
	    });
	}
	// le support du curseur va du premier au dernier attracteur
	var aSlide = brd.create('segment', [attractors[0], attractors[attractors.length-1]]);
	// on crée le curseur lui-même et on lui attache les attracteurs
	var a = brd.create('glider', [r1*Math.cos(angle), r1*Math.sin(angle), aSlide], {
	    attractors: attractors, 
	    attractorDistance: (r2-r1)/levels.length, 
	    name: indicateurs[i][1], // juste le code de la capacité
	    size: 8,
	});
	// on ajoute une fonction déclenchée lorsque les attracteurs agissent
	//
	// TODO !! il faudrait aussi réveiller cette fonction de rappel
	// quand on clique sur le curseur, sans quoi il faut le bouger
	// pour obtenir les renseignements qui le concernent, en plus.
	a.handleSnapToPoints = makeSnapFunction(attractors, levels);
	// on y attache une description complète
	a.desc = gliderDescription(i);
	// on y attache son numéro d'ordre et son angle polaire
	a.index = i;
	a.angle = angle;
	// on ajoute le cuseur à la liste
	gliders.push(a);
    }

    // on crée un polygone sous-tendu par les curseurs.
    var p = brd.create('polygon', gliders, {
	hasInnerPoints: true,
    });
}

/**
 * Donne la description complète d'un curseur
 * @param i le numéro d'ordre du curseur
 * @return un contenu au format HTML pour mettre dans un <div>
 **/
function gliderDescription(i){
    var result="";
    var capa = indicateurs[i][1];
    result=capa+" :<br/>"+indicateurs[i][0]+"<br/>";
    var desc="";
    if (capa in competences){// on est au niveau supérieur de l'arbre
	desc=competences[capa].desc;
    } else {
	var capa0=capa.split(".")[0]; // par exemple, "C1.2" donnera "C1"
	if (capa0 in competences && capa in competences[capa0].sub){
	    var d = competences[capa0].sub[capa].desc;
	    d=d.split("/");
	    if (d.length>1){
		d="<b>"+d[0]+"</b> "+d[1];
	    } else {
		d=d[0];
	    }
	    desc=capa+ " : "+d+"<br/>"+
		capa0+" : "+competences[capa0].desc;
	}
    }
    result+="<div class='competence'>"+desc+"</div>";
    return result;
}

/**
 * fonction de rappel pour le moment où la page est initialisée
 **/
$(function() {
    // crée les onglets dynamiques
    $( "#tabs" ).tabs();
    // place les curseurs dans l'onglet graphique
    createGliders('jxgbox'); 
    // crée la vue tabulaire
    createTables('theTable');
});
