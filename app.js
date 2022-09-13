
const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '53e8757e87msh78be76563794de7p1dafb9jsn260ccbf1fcd9',
		'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
	}
};


const RequestIp = async ip => {
   try {
    const res = await fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`, OPTIONS);
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
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
        console.log(data)

        //User Info
        $city.innerHTML = "City: " + JSON.stringify(data.city);
        let latitud ="lat: " + JSON.stringify(data.latitude);
        let longitud = "long: " + JSON.stringify(data.longitude);
        $location.innerHTML = latitud + " | " + longitud;
        $postalCode.innerHTML = "Country Phone: " + JSON.stringify(data.country_phone);

        //Server Info
        $servCountry.innerHTML = "Country: " + JSON.stringify(data.country);
        $company.innerHTML = "Company: " + JSON.stringify(data.org);
        $domain.innerHTML = "Region: " + JSON.stringify(data.region);

      } else {
        $elemToShow.innerHTML = "No Data";
      }
      $submitBtn.removeAttribute('disabled');
      $submitBtn.removeAttribute('aria-busy');
    })

    
  