"use strict"


const searchUrl = "https://api.nps.gov/api/v1/parks";
const apiKey = "FdXlREi490J3oa6UaqKxEpo8OoJhxk3QZ8sztfL8";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#resultList").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#resultList").append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
      `)
  };
  $("#results").removeClass("hidden");
}

function getNationalParkInfo(query, limit=10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit: limit-1,
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + "?" + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#idErrorMessage").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#id-search-term").val();
    const limit = $("#id-max-results").val();
    getNationalParkInfo(searchTerm, limit);
  });
}

$(watchForm);

