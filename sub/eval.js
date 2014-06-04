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
 * chargées par avance.
 **/

/**
 * variables globales concernant les capacités et les indicateurs, les scores
 **/
var indicateurs = ["C1", "C2", "C3", "C4", "C5"];
var nbCapacites = indicateurs.length; // nombre d'indicateurs
var levels = [0, 1, 2, 3]; // niveaux possibles


/**
 * variables globales concernant la disposition des curseurs
 **/
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
	    feedback1(this.name, levels[found]);
	}
    };
};

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
	    name: indicateurs[i],
	    size: 8,
	});
	// on ajoute une fonction déclenchée lorsque les attracteurs agissent
	a.handleSnapToPoints = makeSnapFunction(attractors, levels);
	// on ajoute le cuseur à la liste
	gliders.push(a);
    }

    // on crée un polygone sous-tendu par les curseurs.
    var p = brd.create('polygon', gliders, {
	hasInnerPoints: true,
    });
}

/**
 * fonction de rappel pour le moment où la page est initialisée
 **/
$(function() {
    // crée les onglets dynamiques
    $( "#tabs" ).tabs();
    // place les curseurs dans l'onglet graphique
    createGliders('jxgbox'); 
});
