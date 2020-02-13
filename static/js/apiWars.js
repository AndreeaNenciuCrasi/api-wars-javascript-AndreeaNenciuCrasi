fetch("https://swapi.co/api/planets")
.then((response) => response.json())
.then((data) => {
        data.results.forEach(function (planet) {
            const tr = document.createElement("tr");
            tr.innerHTML=`<td>${planet.name}<td>
                        <td>${planet.diameter} km</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water} %</td>
                        <td>${planet.population} people</td>
                        <td><button id="residents">${planet.residents.length} Resident(s)</button></td>
                        <td><button>Vote</button></td>`;
            document.querySelector('#tableBody').appendChild(tr);
    });
    console.log(data.results);
});

