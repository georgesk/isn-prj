 function makeSnapFunction(points, levels){ 
   // fabrique une fonction 
   // @param points une liste de points
   // @param levels une liste de valeurs de ces points
   return function(){
     // dans le contexte de la fonction renvoyée, 'this' est censé
     // être un Glider
     var found=0;
     var d = this.Dist(points[0]);
     for(var i=1; i < points.length; i++){
       var d1 = this.Dist(points[i]);
       if (d1 < d){
         d = d1;
	 found=i;
       }
     }
     console.log(this.name, levels[found]);
   };
 };

 var indicateurs = ["C1", "C2", "C3", "C4", "C5"];
 var nbCapacites = indicateurs.length; // nombre d'indicateurs
 var levels = [0, 1, 2, 3]; // niveaux possibles
 var r1 = 6, r2 = 9; // plus petite et plus grande valeur du rayon
 var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-10, 10, 10, -10]});

 var center = brd.create('point', [0, 0],{name: "", fixed: true, face: '+', size: 1,});
 var gliders=[];
 for(var i=0; i < nbCapacites; i++){
   var angle = 2 * Math.PI * i / nbCapacites;
   var attractors=[];
   for(j=0; j < levels.length; j++){
     var r = r1 + (levels[j]-levels[0])*(r2-r1)/(levels[levels.length-1]- levels[0]);
     var at = brd.create('point', [r*Math.cos(angle), r*Math.sin(angle)],{name: "", fixed: true, face: '+', size: 2,});
     attractors.push(at);
     var c = brd.create('circle',[center, r], {color: 'lightgrey', dash: 2, fillOpacity: 0,});
  }
   var aSlide = brd.create('segment', [attractors[0], attractors[attractors.length-1]]);
   var a = brd.create('glider', [r1*Math.cos(angle), r1*Math.sin(angle), aSlide], {attractors: attractors, attractorDistance: (r2-r1)/levels.length, name: indicateurs[i],});
  a.handleSnapToPoints = makeSnapFunction(attractors, levels);
  gliders.push(a);
}
 var p = brd.create('polygon', gliders, {hasInnerPoints: true});