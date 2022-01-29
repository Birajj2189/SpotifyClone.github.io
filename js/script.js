
console.log("Welcome to Spotify");

// Initiate the variables
let songIndex = 0;
let songs = [
     {songName: "2002",singer:"Annie Marrie",filePath : "Songs/2002.mp3",coverPath:"song-image/2002.jpg",duration:"03.14" },
     {songName: "Chalo chalein",singer:"Ritivz",filePath : "Songs/Chalo-Chalein.mp3",coverPath:"song-image/chalo-chalein.jpg",duration:"03.04" },
     {songName: "Liggi",singer:"Ritivz",filePath : "Songs/Liggi.mp3",coverPath:"song-image/liggi.jpg",duration:"03.01" },
     {songName: "Sage",singer:"Ritivz",filePath : "Songs/Sage.mp3",coverPath:"song-image/sage.jpg",duration:"04.04" },
     {songName: "Man Bhariya 2.0",singer:"B Praak",filePath : "Songs/Mann-Bharryaa-2.0.mp3",coverPath:"song-image/man-bhariya.png",duration:"04.26" },
     {songName: "Raatan Lambiya",singer:"Jubin Nautiyal , Tansihk Bagchi",filePath : "Songs/Raataan-Lambiyan.mp3",coverPath:"song-image/raatan-lambiyan.jpg" ,duration:"03.50"},
     {songName: "Something just Like This",singer:"The Chainsmokers, Coldplay",filePath : "Songs/Something.mp3",coverPath:"song-image/something.jpg",duration:"04.07" },
     {songName: "Udd Gaye",singer:"Ritivz",filePath : "Songs/Udd-Gaye.mp3",coverPath:"song-image/udd gaye.jpg",duration:"03.00" },
]
let gif =  document.getElementById('gif');
let audioElement = new Audio('Songs/2002.mp3');
let masterPlay = document.getElementById('master-play');
let myProgressBar = document.getElementById('myBar');
let volumeBar = document.getElementById('myVolume');
let repeat = 0;
let shuffle = 0;
let currentTime = audioElement.currentTime;
Array.from(document.getElementsByClassName('duration')).forEach((element)=>{
     element.addEventListener('click',(e)=>{
          index = parseInt(element.target.id);
          console.log(index);
          
     })

})

// Handle all song play buttons 
const makeAllPlay = ()=>{
     Array.from(document.getElementsByClassName('songItem-play')).forEach((element)=>{
          element.classList.add('fa-play');
          element.classList.remove('green');
     })
}
const removeAllPause = ()=>{
     Array.from(document.getElementsByClassName('songItem-play')).forEach((element)=>{
          element.classList.remove('pause');
     })
}

Array.from(document.getElementsByClassName('songItem-play')).forEach((element)=>{
     element.addEventListener('click',(e)=>{
          songIndex = parseInt(e.target.id); 
          if(e.target.classList.contains('green'))
          {
               e.target.classList.add('fa-play','paused');
               e.target.classList.remove('fa-pause','green');
               masterPlay.classList.add('fa-play-circle');
               masterPlay.classList.remove('fa-pause-circle');
               audioElement.pause(); 
               gif.style.opacity = 0;
          }
          else
          {
               if(e.target.classList.contains('paused'))
               {
                    console.log('Playing paused song')
                    removeAllPause();
               }
               else
               {
                    audioElement.currentTime = 0;
                    audioElement.src = songs[songIndex].filePath;
                    removeAllPause();
               }
               audioElement.play(); 
               makeAllPlay();
               gif.style.opacity = 1;
               e.target.classList.remove('fa-play');
               e.target.classList.add('fa-pause','green');
               masterPlay.classList.remove('fa-play-circle');
               masterPlay.classList.add('fa-pause-circle');
               updateCurrentSection();
          }
     })
})

// fucntion to update song play button on next or previous click 
const playbutton = (songIndex) =>{
     makeAllPlay();
     document.getElementById(`${songIndex}`).classList.remove('fa-play');
     document.getElementById(`${songIndex}`).classList.add('fa-pause','green');
}

// handle play-pause click

const addPause = ()=>{
     document.getElementById(`${songIndex}`).classList.add('paused');
     console.log(` paused ${songIndex}` );
}

masterPlay.addEventListener('click',()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
          console.log("Playing song");
          audioElement.play();
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
          gif.style.opacity = 1;
          playbutton(songIndex);
          updateCurrentSection();
     }     
     else{
          gif.style.opacity = 0;
          console.log("song Paused");
          audioElement.pause();
          masterPlay.classList.add('fa-play-circle');
          masterPlay.classList.remove('fa-pause-circle');
          makeAllPlay();
          addPause();
     }     
})  

//handle previous button
document.getElementById('previous').addEventListener('click',()=>{
     songIndex-=1;
     if(songIndex<0)
     {
          songIndex = 7;
     }
     console.log("Playing song");
     console.log(songIndex);
     audioElement.src = songs[songIndex].filePath;
     audioElement.currentTime = 0;
     audioElement.play(); 
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
     playbutton(songIndex);
     updateCurrentSection();
})

//handle next button
document.getElementById('next').addEventListener('click',()=>{
     songIndex+=1;
     if(songIndex>7)
     {
          songIndex = 0;
     }
     console.log("Playing song");
     console.log(songIndex);
     audioElement.src = songs[songIndex].filePath;
     audioElement.currentTime = 0;
     audioElement.play(); 
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
     playbutton(songIndex);
     updateCurrentSection();
})

//fucntion to update current song image and name
const updateCurrentSection=()=>{

     document.getElementById('curr-img').src = songs[songIndex].coverPath;
     document.getElementById('curr-name').innerText = songs[songIndex].songName;
     document.getElementById('curr-singer').innerText = songs[songIndex].singer;
     document.getElementById('total').innerText = songs[songIndex].duration;
}
     
document.getElementById('actual').innerText = audioElement.currentTime;

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{ 
     // Update Seekbar
     myProgressBar.value  = ((audioElement.currentTime/audioElement.duration)* 100); 
     
})

myProgressBar.addEventListener('change',()=>{
     audioElement.currentTime = (myProgressBar.value/100) * audioElement.duration;
})

// change volume 
volumeBar.addEventListener('change',()=>{
     audioElement.volume = volumeBar.value;
     console.log(volumeBar.value);

     if(volumeBar.value <= 0)
     {
          document.getElementById('volume-btn').classList.remove('fa-volume-up');
          document.getElementById('volume-btn').classList.remove('fa-volume-down');
          document.getElementById('volume-btn').classList.add('fa-volume-mute');
     }
     else if(volumeBar.value <= 0.3)
     {
          document.getElementById('volume-btn').classList.remove('fa-volume-up');
          document.getElementById('volume-btn').classList.remove('fa-volume-mute');
          document.getElementById('volume-btn').classList.add('fa-volume-down');
     }
     else
     {
          document.getElementById('volume-btn').classList.remove('fa-volume-mute');
          document.getElementById('volume-btn').classList.remove('fa-volume-down');
          document.getElementById('volume-btn').classList.add('fa-volume-up');
     }
})



// Play next song on completion
audioElement.addEventListener('ended',()=>{
     
     if(repeat == 1)
     {
          console.log("Playing song");
          console.log(songIndex);
          audioElement.src = songs[songIndex].filePath;
          audioElement.currentTime = 0;
          audioElement.play(); 
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
          playbutton(songIndex);
          updateCurrentSection();
          
     }
     else if(shuffle == 1)
     {
          songIndex = Math.floor(Math.random()*8);
          console.log("Playing song");
          console.log(songIndex);
          audioElement.src = songs[songIndex].filePath;
          audioElement.currentTime = 0;
          audioElement.play(); 
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
          playbutton(songIndex);
          updateCurrentSection();
          
     }
     else
     {
          songIndex+=1;
          if(songIndex>7)
          {
               songIndex = 0;
          }
          console.log(songIndex);
          console.log("Playing song");
          audioElement.src = songs[songIndex].filePath;
          audioElement.currentTime = 0;
          audioElement.play(); 
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
          playbutton(songIndex);
          updateCurrentSection();
     }
})

// handle repeat button
document.getElementById('repeat').addEventListener('click',()=>{
     if(repeat==0 && shuffle==1)
     {
          repeat = 1;
          shuffle = 0;
          console.log("green");
          document.getElementById('repeat').classList.add('green');
          document.getElementById('shuffle').classList.remove('green');
     }
     else if(repeat==0)
     {
          repeat = 1;
          console.log("green");
          document.getElementById('repeat').classList.add('green');
     }
     else{
          console.log("white");
          repeat = 0;
          document.getElementById('repeat').classList.remove('green');
     }
})
     
// handle shuffle button
document.getElementById('shuffle').addEventListener('click',()=>{
     if(shuffle==0 && repeat==1)
     {
          shuffle = 1;
          repeat = 0;
          console.log("green");
          document.getElementById('shuffle').classList.add('green');
          document.getElementById('repeat').classList.remove('green');
     }
     else if(shuffle==0)
     {
          shuffle = 1;
          console.log("green");
          document.getElementById('shuffle').classList.add('green');
          document.getElementById('repeat').classList.remove('green');
     }
     else{
          console.log("white");
          shuffle = 0;
          document.getElementById('shuffle').classList.remove('green');
     }
})
     