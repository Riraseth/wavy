const mainUrl =
  'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/';
const voivodeshipUrl =
  'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/data/wojewodztwa.json';
const cityUrl =
  'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/data/miasta.json';

const urlNewest =
  'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/?action=get_entries';

const entryUrl =
  'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/?action=get_entry&entry_id=';

const voivodeshipSelect = document.querySelector('#voivodeship');
const citySelect = document.querySelector('#city');
const reset = document.querySelector('#reset');
const save = document.querySelector('#save');
const street = document.querySelector('#street');
const note = document.querySelector('#note');
const table = document.querySelector('#table tbody');
let selectedVoivo;

(function fetchVoivodeship() {
  fetch(voivodeshipUrl)
    .then((response) => response.json())
    .then((data) => setVovoideships(data));
})();

function fetchCities(selectedCity) {
  fetch(cityUrl)
    .then((response) => response.json())
    .then((data) => setCities(data, selectedCity));
}

(function fetchNewest() {
  fetch(urlNewest)
    .then((response) => response.json())
    .then((data) => populateTable(data));
})();

function fetchEntry() {
  const url = new URL(location.href);
  if (url.searchParams.has('entryid')) {
    fetch(entryUrl + url.searchParams.get('entryid'))
      .then((response) => response.json())
      .then((data) => setEntry(data));
  }
}

fetchEntry();

function setVovoideships(data) {
  data.forEach((option, i) => {
    voivodeshipSelect[i + 1] = new Option(option.name, option.id);
  });
}

function setCities(data, selectedCity) {
  const cities = data.filter((item) => selectedVoivo == item.voivodeship_id);
  cities.forEach((city, i) => {
    citySelect[i] = new Option(city.name, city.id);
  });
  if (selectedCity) {
    document
      .evaluate(`//option[text()="${selectedCity.trim()}"]`, document)
      .iterateNext().selected = 'selected';
  }
}

voivodeshipSelect.addEventListener('change', function () {
  selectedVoivo = this.value;
  citySelect.innerHTML = '';
  fetchCities();
});

reset.addEventListener('click', function () {
  voivodeshipSelect.options[0].selected = true;
  citySelect.innerHTML = '';
  street.value = '';
  note.value = '';
  const newUrl = new URL(location.href);
  newUrl.searchParams.delete('entryid');
  history.pushState(null, '', newUrl);
});

save.addEventListener('click', function (e) {
  e.preventDefault();
  const voivodeship = [...voivodeshipSelect.options].find(
    (option) => option.selected
  )?.text;
  const city = [...citySelect.options].find((option) => option.selected)?.text;
  const postData = {
    entry: {
      Address: `${voivodeship},${city},${street.value}`,
      Notes: note.value,
    },
  };

  fetch(mainUrl, {
    method: 'POST',
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

function populateTable(data) {
  let tbody = ``;
  data.forEach((item) => {
    tbody += `
    <tr onclick="updateUrl('${item.Id}')">
    <td>${item.Address.split(',')[0]}</td>
    <td>${item.Address.split(',')[1]}</td>
    <td>${item.Address.split(',')[2]}</td>
    <td>${item.Notes}</td>
    </tr>`;
  });
  table.innerHTML += tbody;
}

function setEntry(data) {
  note.value = data[0].Notes;
  const values = data[0].Address.split(',');
  street.value = values[2];
  document
    .evaluate(`//option[text()="${values[0].trim().toLowerCase()}"]`, document)
    .iterateNext().selected = 'selected';
  selectedVoivo = voivodeshipSelect.value;
  fetchCities(values[1]);
}

function updateUrl(id) {
  const newUrl = new URL(location.href);
  newUrl.searchParams.set('entryid', id);
  history.pushState(null, '', newUrl);
  fetchEntry();
}
