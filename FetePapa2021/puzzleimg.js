/*
JavaScript function to create a simple puzzle with an image in canvas
By MarPlo: http://coursesweb.net/javascript/ | http://www.marplo.net/
Receives:
 id_p = ID of element that will contains <canvas>
 im = object (or string URL) with image
 cols = number of columns
 rows = number of rows
 wg = canvas width (optional)
 hg = canvas height (optional)
*/
function PuzzleImg(id_p, im, cols, rows, wg, hg){
  var me = this;
  var img ='';  //image object
  var cnt ='';  //canvas content obj.
  var width = wg ? wg :'';  //canvas width. If empty, will have the width of image
  var height = hg ? hg :'';  //canvas height. If empty, will have the height of image
  var id_solv ='';  //ID of button to solve puzzle
  var cols = cols;
  var rows = rows;
  var p_size ='';  //obj. sizes of image piece
  var tl_size =''; //obj. sizes of tiles in canvas
  var im_p = [];  //array with objects with coords of image pieces {px,py, tx,ty,id}. Set 0 after puzzle completed
  var tl_p = [];  //object with tiles to draw in canvas id:{px,py, tx,ty, ord}
  var tl_h =-1;  //ids of hovered tile
  var tl_c =-1;  //ids of 1st clicked tile of two (-1 from start)
  var solv =0;  //1 when puzzle is solved, -1 when is solved from button
  me.clicks =0;  //nr clicks

  //set <canvas> in $div, and properties: $cnv, $cnt, $img, $p_size, $tl_size
  function setElms(id_p, im){
    //set1 properties
    img = im;
    if(width =='') width = img.width;
    if(height =='') height = img.height;

    //add canvas and solve button
    var parent = document.getElementById(id_p);
    id_solv = id_p +'_solv';
    parent.innerHTML ='<canvas id="'+ id_p +'_cnv" width="'+ width +'" height="'+ height +'" class="puzcnv"></canvas><button id="'+ id_p +'_solv" class="puzsolve">Auto-solve</button><img src="'+ img.src +'" width="'+ width /3 +'" height="'+ height /3 +'" class="puzimg" />';
    parent.style.width = width +2 +'px';;

    //set2 properties
    var cnv = document.getElementById(id_p +'_cnv');
    cnt = cnv.getContext('2d');
    p_size = {w:img.naturalWidth /cols, h:img.naturalHeight /rows};
    tl_size = {w:width /cols, h:height /rows};

    setImP();  //set image pieces

    //register click event
    cnv.addEventListener('click', function(ev){
      if(solv ==0){ //if not completed
        me.clicks++;
        var x = ev.offsetX;
        var y = ev.offsetY;

        //detect clicked tile from $tl_p
        for(var id in tl_p){
          if(y > tl_p[id].ty && y < tl_p[id].ty + tl_size.h && x > tl_p[id].tx && x < tl_p[id].tx + tl_size.w){
            //if 1st tile, add id in $tl_c and draw border, else, swap tiles
            if(tl_c ==-1){
              tl_c = id;
              drawB(2, '#f00', id);
            }
            else {
              var tl2 = {tx:tl_p[id].tx, ty:tl_p[id].ty, ord:tl_p[id].ord};//data of 2nd tile to be added in 1st tile
              tl_p[id] = {px:tl_p[id].px, py:tl_p[id].py, tx:tl_p[tl_c].tx, ty:tl_p[tl_c].ty, ord:tl_p[tl_c].ord, id:id};  //2nd tl
              tl_p[tl_c] = {px:tl_p[tl_c].px, py:tl_p[tl_c].py, tx:tl2.tx, ty:tl2.ty, ord:tl2.ord, id:tl_c};  //1st tl
              drawTL(tl_p);
              tl_c =-1;
            }
            break;
          }
        }
      }
    });

    //on mousemove
    cnv.addEventListener('mousemove', function(ev){
      if(solv ==0){ //if not completed
        var x = ev.offsetX;
        var y = ev.offsetY;

        //detect clicked tile from $tl_p
        for(var id in tl_p){
          if(y > tl_p[id].ty && y < tl_p[id].ty + tl_size.h && x > tl_p[id].tx && x < tl_p[id].tx + tl_size.w){
            //if other tile mousemove
            if(tl_h != id){
              tl_h = id;
              drawTL(tl_p);
              if(tl_c !=-1) drawB(2, '#f00', tl_c);  //for clicked
              drawB(2, '#f8f900', id);
            }
            break;
          }
        }
      }
    });

    //click to solve puzzle
    document.getElementById(id_solv).addEventListener('click', function(){
      if(id_solv !=''){ solv =-1; drawTL(im_p);
        me.solved();}
    });
  }

  //get image pieces from $img and set it in $im_p
  function setImP(){
    for(var i=0; i<cols * rows; ++i) {
      var c = Math.floor(i /rows);  var r = i %rows;  //current column /rom of piece in img
      //add in $im_p object with positions of pieces in image
      im_p.push({px:c *p_size.w, py:r * p_size.h, tx:c *tl_size.w, ty:r *tl_size.h, id:i});
    }
    for(var j, x, i = im_p.length; i; j = Math.floor(Math.random() * i), x = im_p[--i], im_p[i] = im_p[j], im_p[j] = x);  //shuffle array
    setTL();  //set canvas tiles
  }

  //set tiles in $tl_p from $im_p
  function setTL(){
    for(var i=0; i<im_p.length; i++){
      var c = Math.floor(i /rows);  var r = i %rows;  //current column /rom of tile in canvas
      tl_p[im_p[i].id] = {px:im_p[i].px, py:im_p[i].py, tx:c *tl_size.w, ty:r *tl_size.h, ord:i};
    }
    drawTL(tl_p);  //draw tiles in canvas
  }

  //draw tiles from $tls
  function drawTL(tls){
    for(var id in tl_p){
      cnt.drawImage(img, tls[id].px, tls[id].py, p_size.w, p_size.h, tls[id].tx, tls[id].ty, tl_size.w, tl_size.h);
    }
    checkPuzzle();  //check if puzzle completed
  }

  //check if tiles are in correct order, else 0
  function checkPuzzle(){
    var re =1;
    if(solv ==0){
      for(var id in tl_p){
        if(id !=tl_p[id].ord){ re =0; break;}
      }
    }
    if(re ==1){
      cnt.drawImage(img, 0, 0, width, height);

      //if solved manually (-1 is auto) calls solved()
      if(solv ==0){
        solv =1;
        me.solved();
      }
    }
  }

  //to draw border with size $sz and color $cl around tile with $id
  function drawB(sz, cl, id){
    cnt.lineWidth = sz;
    cnt.strokeStyle = cl;
    cnt.strokeRect(tl_p[id].tx +1, tl_p[id].ty +1, tl_size.w -2, tl_size.h -2);
  }

  //remove button that solves the puzzle
  me.delSolve = function(){ document.getElementById(id_solv).outerHTML =''; id_solv ='';}

  //called when puzzle is completed
  me.solved = function(){
    document.getElementById('puzzle').style.display = "none";
    document.getElementById("imageFinale").style.display = 'block';
    document.getElementById(carteChoisie+300).style.height = "647.2px";
    document.getElementById(carteChoisie+300).style.width = " 400px";
    document.getElementById(carteChoisie+300).style.marginLeft = 'auto';
    document.getElementById(carteChoisie+300).style.marginRight = 'auto';

  }

  //if $im is string (image address) create object image and calls setElms(), else setElms()'
  if(typeof im =='string'){
    img = new Image();
    img.onload = function(){ setElms(id_p, img);};
    img.src = im;
  }
  else {
    im.outerHTML ='<div id="'+ id_p +'e" class="puzelm"></div>';  //parent for canvas
    setElms(id_p +'e', im);
  }
}

/*
This function uses PuzzleImg() to replace images in webpage with a puzzle game
Receives:
 slc = selector (CSS syntax) for images in page
 cols = number of columns
 rows = number of rows
 solve = if 0, will remove the button that solves the puzzle
 callback = a function called when the puzzle is completed
*/
function imgToPuzzle(slc, cols, rows, solve, callback){
  var ims = document.querySelectorAll(slc);
  for(var i=0; i<ims.length; i++){
    var ob_puz = new PuzzleImg('puz'+ i, ims[i], cols, rows);
    if(solve ==0) ob_puz.delSolve();  //removes button to auto solve puzzle
    if(callback) ob_puz.solved = callback;
  }
}