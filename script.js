let currentSong = new Audio();
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

}      
main()