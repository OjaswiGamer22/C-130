song1="";
leftWristX=0;
RightWristY=0;
leftWristY=0;
RightWristX=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;


function preload(){
song1=loadSound("song1.mp3");
}

function setup(){
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,ModelLoaded);
poseNet.on("pose",gotResults);
}

function draw(){
image(video,0,0,500,400);
fill("orange");
stroke("red");
if(ScoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
  NumberLeftWristY= Number(leftWristY);
  remove_decimals=floor(NumberleftWristY);
Volume= remove_decimals/500;
document.getElementById("volume").innerHTML="Volume:   "+Volume;
song1.setVolume(Volume);
}
if(ScoreRightWrist>0.2){
    circle(RightWristX,RightWristY,20);
if(RightWristY>0 && RightWristY<=100){
    document.getElementById("speed").innerHTML="Speed = 0.5x";
    song1.rate(0.5);
}

else if(RightWristY>100 && RightWristY<=200){
    document.getElementById("speed").innerHTML="Speed = 1x";
    song1.rate(1);
}
else if(RightWristY>200 && RightWristY<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5x";
    song1.rate(1.5);
}
else if(RightWristY>300 && RightWristY<=400){
    document.getElementById("speed").innerHTML="Speed = 2x";
    song1.rate(2);
}
else if(RightWristY>400 && RightWristY<=500){
    document.getElementById("speed").innerHTML="Speed = 2.5x";
    song1.rate(2.5);
}
}
}

function ModelLoaded(){
    console.log("Model Is Loaded");
}

function gotResults(results){
if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
RightWristX=results[0].pose.rightWrist.x;
RightWristY=results[0].pose.rightWrist.y;
ScoreLeftWrist=results[0].pose.keypoints[9].score;
ScoreRightWrist=results[0].pose.keypoints[10].score;
}


}

function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

