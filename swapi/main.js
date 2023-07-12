const getResidentsButton = document.querySelector("#getResidentsButton");

function handleButtonClick() {
  axios.get('https://swapi.dev/api/planets/?search=Alderaan')
    .then(response => {
      const residents = response.data.results[0].residents;
      console.log("Residents URLs:", residents);
      residents.forEach(residentUrl => {
        axios.get(residentUrl)
          .then(residentResponse => {
            console.log("Resident:", residentResponse.data);
            const residentName = residentResponse.data.name;
            const h2 = document.createElement("h2");
            h2.textContent = residentName;
            document.body.appendChild(h2);
          })
          .catch(error => {
            console.error("Error retrieving resident:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error retrieving planet:", error);
    });
}

getResidentsButton.addEventListener("click", handleButtonClick);
