const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "53e8757e87msh78be76563794de7p1dafb9jsn260ccbf1fcd9",
    "X-RapidAPI-Host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
  },
};

const RequestIp = async (ip) => {
  try {
    const res = await fetch(
      `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`,
      OPTIONS
    );
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
};

const $form = document.getElementById("form");
const $submitBtn = document.getElementById("submit");
const $input = document.querySelector("#ip");

//all results
const elemToShow = document.getElementById("results");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { value } = $input;
  if (!value) return;

  $submitBtn.setAttribute("disabled", "");
  $submitBtn.setAttribute("aria-busy", "true");

  const data = await RequestIp(value);

  if (data) {
    let pureJsonData = JSON.stringify(data, null, 2);
    //User Info
    $city = JSON.stringify(data.city);
    let latitud = JSON.stringify(data.latitude);
    let longitud = JSON.stringify(data.longitude);
    $postalCode = JSON.stringify(data.country_phone);

    //Server Info
    $servCountry = JSON.stringify(data.country);
    $company = JSON.stringify(data.org);
    $domain = JSON.stringify(data.region);

    elemToShow.innerHTML = `
        <div>
        <h2>Results:</h2>
        <ul title="ip client info">
          <h5>Ip owner info:</h5>
          <li>City: ${$city}</li>
          <li>lat: ${latitud} | long: ${longitud}</li>
          <li>Country Phone: ${$postalCode}</li>
        </ul>
  
        <ul title="ip client info">
          <h5>Ip server info:</h5>
          <li >Country: ${$servCountry}</li>
          <li >Company: ${$company}</li>
          <li >Region: ${$domain}</li>
        </ul>
  
        <div class="line"></div>
        <input class="spoilerbutton" style="width:20%; min-width: 120px;" type="button" value="View Json..." onclick="this.value=this.value=='View Json...'?'Hide':'View Json...';">
        <div class="spoiler">
          <div>
            <pre id="results">
              ${pureJsonData}
            </pre>
          </div>
        </div>
      </div>
        `;
  } else {
    $elemToShow.innerHTML = "No Data";
  }
  $submitBtn.removeAttribute("disabled");
  $submitBtn.removeAttribute("aria-busy");
});
