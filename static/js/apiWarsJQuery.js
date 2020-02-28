let userName = document.querySelector('#loggedUserName');

// $(document).ready(function(){

            $.get('https://swapi.co/api/planets', function(data, status){

                $.each( data.results, function( idx, val ) {
                    let myNewTR = $( "<tr></tr>" );
                    myNewTR.appendTo( "#tableBody" );
                    myNewTR.html(`<td>${val.name}</td>
                        <td>${val.diameter} km</td>
                        <td>${val.climate}</td>
                        <td>${val.terrain}</td>
                        <td>${val.surface_water} %</td>
                        <td>${val.population} people</td>
                        <td>${val.residents.length !== 0 ? 
                        `<button type="button" id="buttonResident${val.name}" 
                        onClick="buttonClicked('${val.residents}')" 
                        class="btn btn-primary residents" data-toggle="modal" data-target="#exampleModal"> 
                        ${val.residents.length} Resident(s)
                        </button>` : 'No known residents'} </td>
                        ${ userName.innerHTML !== '' ? `<td><button onClick="buttonClicked('${val.name}')" id="voteButton${val.name}" class="voteButton">Vote</button></td>` 
                        : ''}`);
                    });

});



function buttonClicked(value){
            if (value.slice(0, 6) === "https:"){

                createModalResidents(value);

            }else{
                console.log(value);
            }
    }

function createModalResidents(value){
    let urls = value.split(',');

    let myNewDiv = $( "<div></div>" );
    myNewDiv.appendTo( "body" );
    myNewDiv.html(`<div class="modal fade"id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg" style="width:90%" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Residents of </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                  <tabel class="table table-bordered modalResidents" align="center">
                                  <thead>
                                  <tr>
                                         <th>Name</th>
                                         <th>Height</th>
                                         <th>Mass</th>
                                         <th>Skin color</th>
                                         <th>Hair color</th>
                                         <th>Eye color</th>
                                         <th>Birth year</th>
                                         <th>Gender</th>
                                    </tr>
                                    </thead>
                                           
                                    </tabel>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                     </div>
                                </div>
                              </div>
                            </div>`);
    modalResidentsData(urls);
}

function modalResidentsData(value) {
    for (let i = 0; i < value.length; i++){
        let myNewTr= $( "<tr></tr>" );
        myNewTr.appendTo( ".modalResidents" );
    $.get(value[i], function(data, status){
                    myNewTr.html( `
                            <td>${data.name}<td>
                            <td>${data.height}</td>
                            <td>${data.mass}</td>
                            <td>${data.hair_color}</td>
                            <td>${data.skin_color}</td>
                            <td>${data.eye_color}</td>
                            <td>${data.birth_year}</td>
                            <td>${data.gender}</td> 
                            `);

                    });
            setTimeout(function(){
                // myNewTr.empty();
                location.reload(); }, 8000);

                }

}

// });

