var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width ,
        height = canvas.height ;
var centerX = width / 2;
var centerY = height / 2;

var color, thickness, shape;

color = 'black';
thickness = 1;
shape = 'Line'

	var p0 = {
			x: centerX - 400,
			y: centerY + 50
		},
		p1 = {
			x: centerX + 400,
			y: centerY + 50
		};
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context = setColorAndThickness(context)
    context.stroke();


    // koch(p0, p1, 0);

    function drawFractal(){
        clearCanvas()
        var iter = Math.floor(document.getElementById('iter').value);
        if(iter == 0){
            context.beginPath();
            context.moveTo(p0.x, p0.y);
            context.lineTo(p1.x, p1.y);
            // context.arc((p0.x+p1.x)/2,(p0.y+p1.y)/2,400,Math.PI, false);
            context = setColorAndThickness(context);
            context.stroke();
            return;
        }
        iter = iter - 1
        

        koch(p0,p1,iter);
    }

    function setColorAndThickness(ctx){
        ctx.lineWidth = thickness;
        // set line color
        ctx.strokeStyle = color;

        return ctx;
    }
    

	function koch(p0, p1, limit) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y,
			dist = Math.sqrt(dx * dx + dy * dy),
			unit = dist / 3,
			angle = Math.atan2(dy, dx),
			pA = {
				x: p0.x + dx / 3,
				y: p0.y + dy / 3
			},
			pC = {
				x: p1.x - dx / 3,
				y: p1.y - dy / 3
			},
			pB = {
				x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
				y: pA.y + Math.sin(angle - Math.PI / 3) * unit
			};

		if(limit > 0) {
            if(shape == 'Line'){
			koch(p0, pA, limit - 1);
			koch(pA, pB, limit - 1);
			koch(pB, pC, limit - 1);
            koch(pC, p1, limit - 1);
            }
            else{
                koch(p0, pB, limit - 1);
                koch(pA, pB, limit - 1);
                koch(pB, pC, limit - 1);
                koch(pC, p1, limit - 1);
            }
		}
		else {
			context.beginPath();
            context.moveTo(p0.x, p0.y);
            if(shape == 'Line'){
			context.lineTo(pA.x, pA.y);
			context.lineTo(pB.x, pB.y);
			context.lineTo(pC.x, pC.y);
            context.lineTo(p1.x, p1.y);
            }
            else{
            context.arc((p0.x+pB.x)/2,(p0.y+pB.y)/2,unit/2,Math.PI, false);
            context.arc((pB.x+pC.x)/2,(pB.y+pC.y)/2,unit/2,Math.PI, false);
            context.arc((pC.x+p1.x)/2,(pC.y+p1.y)/2,unit/2,Math.PI, false);
            }

            context = setColorAndThickness(context);


            context.stroke();
            

		}
    }
    function clearCanvas(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.beginPath();
        // context.moveTo(p0.x, p0.y);
        // context.lineTo(p1.x, p1.y);
        // context.stroke();
    
    }

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    function setThickness(th){
        thickness = th
    }

    function setColor(col){
        color = col
    }

    $("#s_label").text("Line selected");
    
    $('#menu2 li').on('click', function(){
        shape = $(this).text();
        $("#s_label").text($(this).text() + " selected");
        
    });