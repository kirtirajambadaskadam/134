function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}

img="";
status="";
objects=[];

function modalLoaded(){
    console.log("Modal Loaded!");
    status= true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
    if(error){
        console.error();
    }
    console.log(results);
    objects=results;
}


function preload(){
   song= loadSound("fancy_like.mp3");
}
function draw(){
    image(video, 0, 0, 380, 380);
   if(status != ""){
           r=random(255);
           g=random(255);
           b=random(255);
       objectDetector.detect(video,gotResults);
       
         
           
       for(i=0; i< objects.length; i++){
           
           document.getElementById("status").innerHTML=" Status : Object Detected";
           
           fill(r,g,b);
           percent= floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
           noFill();
           stroke(r,g,b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label== "person"){
            document.getElementById("baby").innerHTML="Baby is Detected";
            song.stop();
            song.setVolume(0);
           }
           else(objects[i].label !== "person")
           {
            document.getElementById("baby").innerHTML="Baby is not Detected";
            song.play();
            song.rate(1);
            song.setVolume(1);
           }

       }
   }
}
