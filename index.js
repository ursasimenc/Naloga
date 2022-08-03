const table = document.querySelector("table");
const titleElement = document.querySelector("#title");
const brandElement = document.querySelector("#brand");
const categoryElement = document.querySelector("#category");
const priceElement = document.querySelector("#price");
const stockElement = document.querySelector("#stock");
const discountElement = document.querySelector("#discount");
const ratingElement = document.querySelector("#rating");
const descriptionElement = document.querySelector("#description");
const imgElement = document.querySelector("img");
const details = document.querySelector(".details");
const closeButton = document.querySelector("#close-button");

let id = 1;

//get data about products
function getProductData(callback) {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", function () {
    if (request.readyState === 4 && request.status === 200) {
      const dataJSON = JSON.parse(request.responseText);
      const data = Object.values(dataJSON)[0];
      callback(undefined, data);
    } else if (request.readyState === 4) {
      callback("Could not fetch data.", undefined);
    }
  });

  request.open("GET", "https://tt-test.elektrina.si/demo_api/products");
  request.send();
}

// get details about a product
function getProductDetails(callback) {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", function () {
    if (request.readyState === 4 && request.status === 200) {
      const dataJSON = JSON.parse(request.responseText);
      const data = Object.values(dataJSON)[0];
      callback(undefined, data);
    } else if (request.readyState === 4) {
      callback("Could not fetch data.", undefined);
    }
  });

  request.open("GET", "https://tt-test.elektrina.si/demo_api/products/" + id);
  request.send();
}

// calling data about products
getProductData((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    for (let index = 0; index < data.length; index++) {
      // creating elements of the table
      const title = document.createElement("td");
      const price = document.createElement("td");
      const stock = document.createElement("td");
      const rating = document.createElement("td");
      const row = document.createElement("tr");

      row.setAttribute("id", data[index].id);

      // add text to elements
      title.textContent = data[index].title;
      price.textContent = data[index].price;
      stock.textContent = data[index].stock;

      // making a variable with stars for rating
      let rate;
      if (data[index].rating >= 4 && data[index].rating <= 4.25) {
        rate = `<i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i> <br> (${data[index].rating})`;
      } else if (data[index].rating > 4.25 && data[index].rating <= 4.75) {
        rate = `<i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star-half star"></i><br> (${data[index].rating})`;
      } else if (data[index].rating > 4.75) {
        rate = `<i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><i class="fa-solid fa-star star"></i><br> (${data[index].rating})`;
      }

      rating.innerHTML = rate;
      rating.style.textAlign = "center";

      // appending elements to its parent element
      row.appendChild(title);
      row.appendChild(price);
      row.appendChild(stock);
      row.appendChild(rating);
      table.appendChild(row);

      // adding eventListener to the row element
      row.addEventListener("click", function () {
        getProductDetails((err, data) => {
          id = row.id;
          if (err) {
            console.log(err);
          } else if (data) {
            // add text to elements
            titleElement.innerText = data.title;
            brandElement.innerText = data.brand;
            priceElement.innerText = data.price;
            stockElement.innerText = data.stock;
            categoryElement.innerText = data.category;
            discountElement.innerText = data.discountPercentage;
            descriptionElement.innerText = data.description;
            ratingElement.innerHTML = rate;
            ratingElement.style.textAlign = "center";
            // get image
            imgElement.src = data.thumbnail;
            imgElement.alt = data.title;
            // show details
            details.style.display = "flex";
            // change row's bg color
            row.style.backgroundColor = "rgb(184, 184, 184)";
            // add eventListener to button element
            closeButton.addEventListener("click", function () {
              details.style.display = "none";

              row.style.backgroundColor = "#fff";
            });
          }
        });
      });
    }
  }
});
