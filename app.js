const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '53e8757e87msh78be76563794de7p1dafb9jsn260ccbf1fcd9',
		'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
	}
};

const RequestIp = ip => {
   return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
	.then(res => res.json())
	.catch(err => console.error(err));
}

    const $form = document.getElementById("form");
    const $submitBtn = document.getElementById("submit");
    const $input = document.querySelector('#ip');

    //all results
    const $elemToShow = document.getElementById("results");
    //user info element
    const $city =  document.getElementById("city");
    const $location = document.getElementById("location");
    const $postalCode = document.getElementById("code");

    //server info element
    const $servCountry =  document.getElementById("servCountry");
    const $company = document.getElementById("company");
    const $domain = document.getElementById("domain");
  
    $form.addEventListener ('submit', async (e) => {
      e.preventDefault();
      const {value} = $input;
      if (!value) return;

      $submitBtn.setAttribute('disabled', '');
      $submitBtn.setAttribute('aria-busy', 'true');

      const data = await RequestIp(value);

      if (data) {
        $elemToShow.innerHTML = JSON.stringify(data, null, 2);

        //User Info
        $city.innerHTML = "City: " + JSON.stringify(data.location["city"]);
        let latitud ="lat: " + JSON.stringify(data.location["latitude"]);
        let longitud = "long: " + JSON.stringify(data.location["longitude"]);
        $location.innerHTML = latitud + " | " + longitud;
        $postalCode.innerHTML = "Postal Code: " + JSON.stringify(data.location["postal"]);

        //Server Info
        $servCountry.innerHTML = "Country: " + JSON.stringify(data.location.country["name"]);
        $company.innerHTML = "Company: " + JSON.stringify(data.company["name"]);
        $domain.innerHTML = "Domain: " + JSON.stringify(data.company["domain"]);

      } else {
        $elemToShow.innerHTML = "No Data";
      }
      $submitBtn.removeAttribute('disabled');
      $submitBtn.removeAttribute('aria-busy');
    })

    
  