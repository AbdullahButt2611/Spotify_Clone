console.log("Welcome to spotify");
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');                //Object of audio element
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Mariyo - Mortals (feat, Laura Behm)", filePath:'songs/1.mp3', coverPath:'covers/1.jpg'},
    {songName:"Ceilo - Huma Huma", filePath:'songs/2.mp3', coverPath:'covers/2.jpg'},
    {songName:"Deaf Keev - Invisible", filePath:'songs/3.mp3', coverPath:'covers/3.jpg'},
    {songName:"Different Heaven & Ehide - My Heart", filePath:'songs/4.mp3', coverPath:'covers/4.jpg'},
    {songName:"Janji-Heroes-Tonight feat Johnning", filePath:'songs/5.mp3', coverPath:'covers/5.jpg'},
    {songName:"Sakhiyan", filePath:'songs/6.mp3', coverPath:'covers/6.jpg'},
]


// Applies covers for all the songs
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})





// Handle Play pause click
masterPlay.addEventListener('click',()=>{

    // If the Audio is stopped then play the audio
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    }
    else
    {
        // If the Audio is playing then pause the audio
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }

})







// Liste to Events
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar

    // Calculating the progress of the song
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    
})






myProgressBar.addEventListener('change',()=>{

    //When the user want to forward the music through progress bar
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})




const makeAllPlays = ()=>{
    // This function will simply change the con on the left banner from play to pause for all the elements

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}





Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        // console.log(e.target);                      //It gives us the elemetnt that has been pressed
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName; 
        audioElement.src = 'songs/'.concat(songIndex+1,'.mp3'); 
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})





document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5)                                                                      //Change here for new addition
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }

    audioElement.src = 'songs/'.concat(songIndex+1,'.mp3'); 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})




document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)                                                                      
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }

    audioElement.src = 'songs/'.concat(songIndex+1,'.mp3'); 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})