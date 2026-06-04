let currentSong = new Audio();
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
async function getSongs(){
   let a= await fetch("http://127.0.0.1:5500/music/")
   let response= await a.text(); 
   console.log(response)
   let div=document.createElement("div")
   div.innerHTML=response;
   let as=div.getElementsByTagName("a")
   let songs=[]
   for(let index=0;index<as.length; index++){
  const element = as[index];

  if(element.href.endsWith(".mp3")){
   songs.push(element.href.split("/").pop()) //split means elemenste thr sting inside written in braces of split .
   
  }
   }
   return songs
}
const playMusic = (track)=>{
   currentSong.src= "/music/" + track
  currentSong.play()
  
   play.src="pause.svg"
   document.querySelector(".songinfo").innerHTML = decodeURI(track)
   document.querySelector(".songtime").innerHTML ="00:00 / 00:00"
}
async function main(){
   
   //get the list of all song
   let songs=await getSongs()
   
   console.log(songs)
   
   let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0] //take element from songlist by tag name ul
   for (const song of songs) {
      songUL.innerHTML=songUL.innerHTML+` <li>
              <img class="invert" src="music.svg" alt="">
              <div class="info">
                <div>${song.replaceAll(".mp3","")}</div>
                <div>Arjit-Singh</div>
              </div>
              <span>play now</span>
              <img src="play.svg" alt="" class="invert">
             </li>`

   }
  //attach event listener to each song
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
   e.addEventListener("click",element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML + ".mp3")
playMusic(e.querySelector(".info").firstElementChild.innerHTML+".mp3")
   })

  })//getElementsByTagName this dont return array it returns htmlcollection
  //to use for each we require array so use array.from .it converts array like  htmlcollection to actual array

  //attach an event listener to next play previous in playbar
  play.addEventListener("click",()=>{
   if(currentSong.paused){
      currentSong.play()
      play.src="pause.svg"
   }
   else{
      currentSong.pause()
      play.src="play.svg"
   }
  })
  //Listen for time update event
  currentSong.addEventListener("timeupdate",()=>{
   console.log(currentSong.currentTime,currentSong.duration)
   document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
   document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%";
  })
  //add event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",e=>{
   console.log(e)//here click on the statment consol will show and then you will find every thing listed like target offsetX
   let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
   document.querySelector(".circle").style.left=percent + "%";
currentSong.currentTime=((currentSong.duration)*percent)/100;
  })
}      
main()