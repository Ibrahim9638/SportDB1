const loadSport =()=>{
    const searchElement = document.getElementById('search-field');
    const searchValue = searchElement.value;
    const url= `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`
//  console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>showPlayers(data.player))
}

const showPlayers = (players)=>{
    // console.log(players);
    document.getElementById('search-field').value = '';
    const container = document.getElementById('container');
    container.innerHTML = "";
    document.getElementById('show-playerDetails').innerHTML = '';
    document.getElementById("male").classList.add('d-none');
    document.getElementById("female").classList.add('d-none');

    players.slice(0,6).forEach(player=>{
        // console.log(player);
        const {strThumb,strPlayer,strNationality, strBirthLocation, idPlayer}= player;
        const div =  document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${strThumb ? strThumb :'https://loremflickr.com/320/240'}" class="card-img-top w-full h-96" alt="">
        <div class="card-body">
          <h5 class="card-title">${strPlayer}</h5>
          <p class="card-text">Nationality: ${strNationality}</p>
          <div class="my-2">
          <p>Location: ${strBirthLocation}</p>
          <button class="btn btn-primary" onclick="playersID(${idPlayer})">Details</button>
          <button class="btn btn-danger">Delete</button>
          </div>
          
        </div>
        
      </div>
    
        `
        container.appendChild(div);
    })

}

const playersID = (id)=>{
    const url = `  https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data =>showPlayerDetails(data.players[0]))

}

const showPlayerDetails = (player)=>{
    console.log(player);

    const playerDetails = document.getElementById('show-playerDetails');
    playerDetails.innerHTML = '';
    

    const {strThumb,strPlayer,strDescriptionEN,strGender}= player
    const div = document.createElement('div');

    if(strGender === "Male"){
        const element = document.getElementById("male");
        element.classList.remove('d-none');
    }else{
        const element1 = document.getElementById("female");
        element1.classList.remove('d-none'); 
    }
    div.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${strThumb}" class="w-100 h-100 mx-auto rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Name: ${strPlayer}</h5>
        <p class="card-text">Description: ${strDescriptionEN.slice(0,150) + "..."}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
    
    `
    playerDetails.appendChild(div);



}

loadSport();