function generateWheelDesign(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var radius1 = Math.floor(document.getElementById("r").value);
    var score = Math.floor(document.getElementById("score").value);

    if(!radius1 || !score){
        return
    }

    console.log(radius1);
        console.log(score);
    if(score == 100){
        // perfect circle
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius1, 0, 2 * Math.PI, false);
        ctx = setColorAndThickness(ctx)

        ctx.stroke();
    } else if(score >=80 && score<=99){
        //ellipse with r, r+%score
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var per = 100-score;
        var radius12 =  radius1*per/100;
        console.log('radius1',radius1);
        radius12 = radius1 + radius12;
        console.log(radius12);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius1, radius12, 90 * Math.PI/180, 0, 2 * Math.PI);

        ctx.font = "15px Arial";
        ctx.fillText("Radius rh: "+radius1,10,50);
        ctx.fillText("Radius rv: "+radius12,10,75); 
        ctx.fillText("Diff between 2 radii is: "+per+"%", 10, 100) 
        ctx = setColorAndThickness(ctx)

        ctx.stroke();



    }else if(score <80 && score >=3){
        //polygon with score sides
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        draw_polygon(centerX, centerY, radius1, score)
    }

    requestAnimationFrame(generateWheelDesign);
}

function clearCanvas(){
    document.getElementById("r").value = '';
    document.getElementById("score").value = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function draw_polygon(x, y, radius, numberOfSides){
    if (numberOfSides < 3) alert('Minimum 3 sides required to draw a polygon');
    var rect = canvas.getBoundingClientRect();
      size = radius,
    ctx.beginPath();
    ctx.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          
  
      for (var i = 1; i <= numberOfSides;i += 1) {
        ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
  
      ctx.font = "15px Arial";
      ctx.fillText("Polygon with "+numberOfSides+"sides ",10,50);
    ctx = setColorAndThickness(ctx)

      ctx.stroke();
  }
  
  
  function setThickness(th){
    thickness = th
}

function setColor(col){
    color = col
}

function setColorAndThickness(context){
    context.lineWidth = thickness;
    // set line color
    context.strokeStyle = color;

    return ctx;
}




var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var color, thickness;

color = 'black';
thickness = 1;

generateWheelDesign()

