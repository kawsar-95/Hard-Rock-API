//getting the input from the user through Search Button
const inputValue=document.getElementById('inputValue');
const submitButton=document.getElementById('submitButton');

submitButton.addEventListener('click',()=>{
const searchResult=document.querySelector(".search-result");
searchResult.innerHTML=``;
const input=inputValue.value;

//passing the parameter to make the API dynamic
fetchData(input);
inputValue.value='';


})

//Fetching data from the API and user input is passed as the Parameter 
const fetchData=async(input)=>{


let url=`https://api.lyrics.ovh/suggest/${input}`;

try{

    let fetchList=await fetch(url);
    let Res= await fetchList.json();
    //After reading the API using json(), passing it to the Display Function
    displayResult(Res);
    

}
catch(error){
    if(error) console.log("error");

}

}

//Reading the values from the API and Showing it to the Screen
const displayResult=(results)=>{


results.data.forEach(r => {
    const searchResult=document.querySelector(".search-result");
    const songTitle=r.title_short;
    const  albumTitle=r.album.title;
const topTracks=r.artist.link;
    
    const artistName=r.artist.name;
    const  image=r.artist.picture;
    const track=r.link;
    const albumCover=r.album.cover;
    //This will only allow 10 elements to display as the Search Result
    let count=searchResult.childElementCount; 
    const card=document.createElement('li');
    card.innerHTML=` 
    <li class="child">Song Name:<span>${songTitle} </span>&nbsp Album:<span>${albumTitle} </span>&nbsp Artist:<span>${artistName}</span>&nbsp<span><br><img src="${image}"></span><br>
    <span><button onclick="findText('${r.artist.name}','${r.title}')" class="btn btn-success"><a href="#mainLyric">Get Lyrics</a></button></span><br>
<span><button onclick="NewTab('${topTracks}')" class="btn btn-warning">Artist's Top Tracks</button></span><br><span><button onclick="NewTab('${track}')" class="btn btn-danger">Play Now</button></span>
<br><img src="${albumCover}"<br>
<h6>Album Cover</h6>
</li>`;
    
    if(count<10)searchResult.appendChild(card);
    
});



}

//this function get the Lyrics from the API
const findText=async(artist, song)=>{

    let url=`https://api.lyrics.ovh/v1/${artist}/${song}`;

    try{

        let fetchText=await fetch(url);
        let textRes= await fetchText.json();
        //Calling function to display Lyrics on the Screen
        displayLyric(textRes);

    }

    catch(error){
        
        if (error) console.log("error");
        
        
    }




}

//This function display the Lyrics on the Screen
const displayLyric=(t)=>{
const parent=document.querySelector(".single-lyrics")
const lyric=document.querySelector(".single-lyrics pre");
const lyricHead=document.querySelector(".single-lyrics h2");

lyric.innerHTML="";
lyricHead.innerHTML="";
const text=t.lyrics;
if(text!=null) {lyric.innerHTML=text;
const headline=`${t.lyrics.slice(0,16)}...`;
lyricHead.innerHTML=headline;}
else {

    
const errorText=`<p class="noLyric"> Sorry!😢 This Lyric is Not Available Currently</p>`;
lyric.innerHTML=errorText;


}




}


//This function takes user to the Artist's Top Tracks COllection
function NewTab(linkArtist) { 
    window.open( 
        linkArtist, "_blank"); 
} 