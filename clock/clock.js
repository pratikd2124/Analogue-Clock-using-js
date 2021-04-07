var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius,radius);
radius = radius * 0.90;
setInterval(analogclock, 1000);

function analogclock(){
    drawface(ctx,radius);
    drawnums(ctx,radius);
    drawtime(ctx,radius);
}
function drawface(ctx,radius){
    var grad;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.94,0,0,radius*1.05);
    grad.addColorStop(0,'#333');
    grad.addColorStop(0.5,'#fff');
    grad.addColorStop(1,'#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0,radius * 0.1,0,2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

function drawnums(ctx,radius){
    var ang; var num;
    ctx.font = radius *0.15 + "px arial";
    ctx.textBaseline ="maiddle";
    ctx.textAllign ="center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.78);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0,radius * 0.78);
        ctx.rotate(-ang);
    }
}

function drawtime(ctx,radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second * Math.PI/(60*360));;
    drawhand(ctx, hour, radius*0.5, radius*0.08);

    minute = (minute*Math.PI/30) + (second * Math.PI/(30*60));
    drawhand(ctx, minute, radius*0.8, radius*0.08);

    second = (second * Math.PI/30);
    drawhand(ctx, second, radius*0.9, radius*0.03);
    

}
function drawhand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}