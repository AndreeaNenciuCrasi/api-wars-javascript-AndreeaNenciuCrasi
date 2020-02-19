let listPlanetsWithResidents =[];
let userName = document.querySelector('#loggedUserName');
console.log(userName);

fetch("https://swapi.co/api/planets")
.then((response) => response.json())
.then((data) => {
        data.results.forEach(function (planet) {
            const tr = document.createElement("tr");
            // console.log(planet)
            tr.innerHTML=`<td>${planet.name}<td>
                        <td>${planet.diameter} km</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water} %</td>
                        <td>${planet.population} people</td>  
                        <td>${planet.residents.length !== 0 ? `
                        <button type="button" id="buttonResident" class="btn btn-primary residents" data-toggle="modal" data-target="#exampleModal"> 
                        ${planet.residents.length} Resident(s)
                        </button>` : 'No known residents'} </td>
                        ${ userName.innerHTML !== '' ? `<td><button onClick="buttonClicked('${planet.name}')" class="voteButton">Vote</button></td>` : ''}`;
            document.querySelector('#tableBody').appendChild(tr);
            let btnResidents = document.querySelector(".residents");
            planet.residents.forEach(function(list){
                listPlanetsWithResidents.push([planet.name, list]);
            });

            btnResidents.addEventListener('click', onButtonResidentsClick(planet.name, listPlanetsWithResidents));
            });
});

function createResidentsModal(name, listPlanetsWithResidents) {
    let listToPrint = [];
    for(let i =0; i < listPlanetsWithResidents.length; i++){
        if (listPlanetsWithResidents[i][0] === name) {
            listToPrint.push(listPlanetsWithResidents[i][1]);
        }}
    for(let j = 0; j < listToPrint.length; j++){

            fetch(listToPrint[j])
            .then((response) => response.json())
            .then((data) => {

                    const tbody = document.createElement("tbody");
                    tbody.innerHTML = `<tr>
                            <td>${data.name}<td>
                            <td>${data.height} km</td>
                            <td>${data.mass}</td>
                            <td>${data.hair_color}</td>
                            <td>${data.skin_color} %</td>
                            <td>${data.eye_color}</td>
                            <td>${data.birth_year}</td>
                            <td>${data.gender}</td> 
                            </tr>`;
                    document.querySelector('.residentsTabel').appendChild(tbody);
                    });
                }
}

function onButtonResidentsClick(name, listPlanetsWithResidents) {
    const divContainer = document.createElement("div");

    divContainer.innerHTML = `<div class="modal fade"id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Residents of ${name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body residentsModal">
                                  <tabel class="table table-bordered residentsTabel">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Height</th>
                                            <th scope="col">Mass</th>
                                            <th scope="col">Skin color</th>
                                            <th scope="col">Hair color</th>
                                            <th scope="col">Eye color</th>
                                            <th scope="col">Birth year</th>
                                            <th scope="col">Gender</th>
                                        </tr>
                                    </thead>
                                  
                                  </tabel>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                     </div>
                                </div>
                              </div>
                            </div>`;
     document.body.appendChild(divContainer);
    createResidentsModal(name, listPlanetsWithResidents);
};

function buttonClicked(planetName){
    console.log('Planet voted');
    let username = userName.textContent;
    console.log(username);
    let data = {planetName, username};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('http://127.0.0.1:5000/api/add-voted-planet', options);
    }
        // url = '/voteplanet/' + planetName;
        //     fetch(url)
        //     .then(function (res) {
        //         console.log(res)
        //         return res, json()
        //     })
        //     .then(function (data) {
        //         console.log(data)
        //         Console.log(data);
        //     }).catch(function (err) {
        //         console.log(err)
        //         console.log(err)
        //     })

let btnVote = document.querySelectorAll('.voteButton');
            for(i = 0; i < btnVote.length; i++){
                btnVote[i].addEventListener('click', function(){
                btnVote[i].textContent= 'VOTED';
                console.log('button');
            });
            }


function updateVotesModal() {
                //fetch la ruta care cheama datamanager
                //se intorc json
                //identifici modal in pagin
                //each pe resultate
                //document.write('tr
}
