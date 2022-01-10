   "use strict";

const outToMain = document.querySelector("#newPlaylist");

// Read All - Get Functionality
const getAllSongs=() => {
    axios
    .get("http://localhost:8080/getAll")
    .then(res => {
        console.log(res);
        const songs = res.data;
        outToMain.innerHTML="";
        for (let song of songs){
            const songCard = document.createElement("div");
            songCard.classList.add("card");

            const uList = document.createElement("ul");
            uList.classList.add("list-group list-group-flush");

            const songBody = document.createElement("div");
    
            const songTitle = document.createElement("li");
            songTitle.innerText = `Song: ${song.newSong}`;
            songTitle.classList.add("list-group-item");
            uList.appendChild(songTitle);

            const albumTitle = document.createElement("li");
            albumTitle.innerText = `Album: ${song.album}`;
            albumTitle.classList.add("list-group-item");
            uList.appendChild(albumTitle);

            const artistName = document.createElement("li");
            artistName.innerText = `Artist: ${song.artist}`;
            artistName.classList.add("list-group-item");
            uList.appendChild(artistName);

            //Delete Song
            const deleteSong = document.createElelement("button");
            deleteSong.innerText = "Delete";
            deleteSong.classList.add("btn", "btn-primary");
            //nested delete button and functionality in my read data.
            deleteSong.addEventListener("click", function () {
                axios
                    .delete(`http://localhost:8080/song/deleteSong${song.id}`)
                    .then(res => {
                        console.log(res);
                        getAllSongs();
                    })
                    .catch(err => console.error(err));
            })
            songContainer.appendChild(deleteSong);

            
            songCard.appendChild(uList);
            songCard.appendChild(deleteSong);
            outToMain.appendChild(songCard);
        }

        

    })
    .catch(err => console.error(err))
}

// Create Song
document.querySelector("#playlistForm").addEventListener("submit", function(event){
    event.preventDefault(); //no page refresh

    const form = this;
    
    const data = {
        newSong:form.newSong.value,
        album:form.album.value,
        artist:form.artist.value
    };
    console.log("DATA: ", data);
    axios
    .post("http://localhost:8080/createSong", data)
    .then(res => {
        getAllSongs();
        form.reset();
        form.newSong.focus();
        console.log(res);
    })
    .catch(err=> console.error(err));
});

getAllSongs();

// // Delete Song
// document.querySelector("#deleteForm").addEventListener("submit", function(event){
//     event.preventDefault();
    
//     const songId = form.songId.value;
//     axios
//         .delete(`http://localhost:8080/song/deleteSong${songId}`)
//         .then(res => {
//             console.log(res);
//             form.reset();
//             form.songId.focus();
//             getAllSongs();
//         })
//         .catch(err => console.error(err));

// });
