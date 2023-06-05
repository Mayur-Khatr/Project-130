wont_let_go = ""; 
until_I_found_you = "";
status_song_left_hand = "";
status_song_right_hand = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    wont_let_go = loadSound("music2 (2).mp3");
    until_I_found_you = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);    
    fill('#FF0000');
    stroke('#FF0000');

    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        until_I_found_you.stop(); 
        if (status_song_left_hand == false) 
        {
            wont_let_go.play();
            document.getElementById("song").innerHTML = "Say you wont let go";        
        }       
    }

    if (scoreRightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 20);
        wont_let_go.stop();
        if (status_song_right_hand == false) 
        {
            until_I_found_you.play();
            document.getElementById("song").innerHTML = "Until I found You";            
        }        
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) 
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}