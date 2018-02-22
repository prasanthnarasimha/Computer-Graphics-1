
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawpix( x, y) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 1, y + 1);
  context.closePath();
  context.stroke();

}

function draw_pixel( point_x, point_y) {
  var myImageData = context.createImageData(1, 1);
  myImageData.data[0] = r;
  myImageData.data[1] = g;
  myImageData.data[2] = b;
  myImageData.data[3] = 255;
  context.putImageData(myImageData, point_x, point_y);

}

var r,g,b = 0;

function colorChanged(color){
  if(color == 'red'){
    r = 255;
    g = b = 0;
  }else if(color == 'black'){

    r = g = b = 0;

  }else if(color == 'blue'){

    r = g = 0;
    b = 255;

  }else if(color == 'green'){
    g = 255;
    r = b = 0;
  }
}



function shapeClicked(shape){

  currentShape = shape;
  context.clearRect(0, 0, canvas.width, canvas.height);

  if(shape == 'polygon'){
    document.getElementById("box1").style.display = "inline";
    // document.getElementById("rect").style.display = "none";
    
  }
  // else if(shape == 'rectangle'){
  //   document.getElementById("box1").style.display = "none";
  //   // document.getElementById("rect").style.display = "inline";
    
  // }
   else{
    document.getElementById("box1").style.display = "none";
    // document.getElementById("rect").style.display = "none";
  }

}

function draw_line(x0, y0, x1, y1) {

  var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
  var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  var err = (dx > dy ? dx : -dy) / 2;
  if(currentShape != 'polyline'){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  while (true) {
    draw_pixel( x0, y0);
    if (x0 === x1 && y0 === y1) break;
    var e2 = err;
    if (e2 > -dx) { err -= dy; x0 += sx; }
    if (e2 < dy) { err += dx; y0 += sy; }
  }
}


function draw_circle(centerX, centerY, radius) {
  d = (5 - radius * 4) / 4;
  x = 0;
  y = radius;
  context.clearRect(0, 0, canvas.width, canvas.height);

  do {
    draw_pixel( centerX + x, centerY + y);
    draw_pixel( centerX + x, centerY - y);
    draw_pixel( centerX - x, centerY + y);
    draw_pixel( centerX - x, centerY - y);
    draw_pixel( centerX + y, centerY + x);
    draw_pixel( centerX + y, centerY - x);
    draw_pixel( centerX - y, centerY + x);
    draw_pixel( centerX - y, centerY - x);
    if (d < 0) {
      d += 2 * x + 1;
    } else {
      d += 2 * (x - y) + 1;
      y--;
    }
    x = x + 1;
  } while (x <= y);

}

function draw_ellipse(x0, y0, x1, y1)
{                             
   var a = Math.abs(x1-x0), b = Math.abs(y1-y0), b1 = b&1;        
   var dx = 4*(1.0-a)*b*b, dy = 4*(b1+1)*a*a;              
   var err = dx+dy+b1*a*a, e2;                             

   if (x0 > x1) { x0 = x1; x1 += a; }       
   if (y0 > y1) y0 = y1;                                  
   y0 += (b+1)>>1; y1 = y0-b1;                             
   a = 8*a*a; b1 = 8*b*b;    
   
   context.clearRect(0, 0, canvas.width, canvas.height);

                                                        
   do {                                                 
      draw_pixel(x1, y0);                                      
      draw_pixel(x0, y0);                                      
      draw_pixel(x0, y1);                                      
      draw_pixel(x1, y1);                                      
      e2 = 2*err;
      if (e2 <= dy) { y0++; y1--; err += dy += a; }                
      if (e2 >= dx || 2*err > dy) { x0++; x1--; err += dx += b1; }       
   } while (x0 <= x1);

   while (y0-y1 <= b) {                
      draw_pixel(x0-1, y0);                        
      draw_pixel(x1+1, y0++);
      draw_pixel(x0-1, y1);
      draw_pixel(x1+1, y1--);
   }
}

function draw_rectangle(x, y, pointE_x, pointE_y)
{
  context.clearRect(0, 0, canvas.width, canvas.height);

	while( x <= pointE_x)
	{
		draw_pixel( x, point_y);
		draw_pixel(x, pointE_y);
		x = x+1;
	}

	while( y <= pointE_y)
	{
		draw_pixel(point_x, y);
		draw_pixel(pointE_x, y);
		y = y + 1;
	}
}

function draw_polygon(x, y, radius, numberOfSides){
  if (numberOfSides < 3) alert('Minimum 3 sides required to draw a polygon');
  var rect = canvas.getBoundingClientRect();
	size = 75,
  context.beginPath();
	context.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          

	for (var i = 1; i <= numberOfSides;i += 1) {
	    context.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}

  context.strokeStyle = "rgba("+r+", "+g+", "+b+", 255)"; 
	context.lineWidth = 1;
	context.stroke();
}

function clear(){
  // context.clearRect(0, 0, canvas.width, canvas.height);
  location.reload();
  
}

var secondClick = false;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
canvasW = canvas.width;
canvasH = canvas.height;

var mouse_clicked = false;
var mouseCX, mouseCY;

var currentShape = 'line';
var count = 0;

var startX;
var startY;


canvas.addEventListener('click', function (evt) {
  count++;
  var mousePos1 = getMousePos(canvas, evt);
  mx_b = mouseCX
  my_b = mouseCY
  mouseCX = mousePos1.x;
  mouseCY = mousePos1.y;
  if(currentShape != 'polyline'){
  mouse_clicked = !mouse_clicked;
  }
  else{
    secondClick = true;
    mouse_clicked = true;
  }
  if(currentShape == 'rectangle'){
    if(mouse_clicked){
      canvas.style.cursor="crosshair";
    } else{
      context.beginPath();
      context.fillStyle = "rgba("+r+", "+g+", "+b+", 255)"; 

      context.rect(mx_b,my_b,mouseCX-mx_b,mouseCY-mx_b);
      context.fill();
      canvas.style.cursor="default";
    }

  } else if(currentShape == 'polygon'){
    console.log('here');
    var ns = document.getElementById('nsides').value;
    console.log(ns)
    if(!ns){
      ns = 5;
    }
    draw_polygon(mouseCX, mouseCY, 3, ns);

  } else if(currentShape =='polyline' && count != 1){
    draw_line( mx_b, my_b, mouseCX, mouseCY);
  }
}, false);

canvas.addEventListener('mousemove', function (evt) {
  secondClick = false;
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  if (mouse_clicked) {
    if (currentShape == 'line') {
      draw_line( mouseCX, mouseCY, mousePos.x, mousePos.y);
    } else if (currentShape == 'circle') {
      var a = mouseCX - mousePos.x;
      var b = mouseCY - mousePos.y;
      var radius = Math.sqrt(a*a + b*b);
      draw_circle( mouseCX, mouseCY,radius );

    } else if (currentShape == 'ellipse') {
      draw_ellipse( mouseCX, mouseCY, mousePos.x, mousePos.y);

    } 
  }
}, false);