song="";
lx=0;
ly=0;
rx=0;
sl=0;
sr=0;
function preload()
{
    song=loadSound("Doksblog.com-KORDHELL-MURDER-IN-MY-MIND-MUSIC.mp3")
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posnet=ml5.poseNet(video,modelLoaded);
    posnet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('Posenet is Initialized');
}
function gotPoses(results)
{
if(results.length>0)
{
    console.log(results);
    lx=results[0].pose.leftWrist.x;
    ly=results[0].pose.leftWrist.y;
    rx=results[0].pose.rightWrist.x;
    ry=results[0].pose.rightWrist.y;
    sl=results[0].pose.keypoints[9].score;
    sr=results[0].pose.keypoints[10].score;
}
}
function draw()
{
    image(video,0,0,600,500); 
    fill("#5e4052");
    stroke("#5e4052");
    if(sr>0.2)
    {
    circle(rx,ry,20);
    if(ry>0&&ry<=100)
    {
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(ry>100&&ry<=200)
    {
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(ry>200&&ry<=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(ry>300&&ry<=400)
    {
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(ry>400&&ry<=500)
    {
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
    if(sl>0.2)
    {
        circle(lx,ly,20);
        lyn=Number(ly);
        rd=floor(lyn);
        volume=rd/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }  
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
