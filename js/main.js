let starts = document.getElementById("stars");
let moon = document.getElementById("moon");
let mountains3 = document.getElementById("mountains3");
let mountains4 = document.getElementById("mountains4");
let river = document.getElementById("river");
let boot = document.getElementById("boot");
let mountains7 = document.getElementById("mountains7");
let knozi = document.querySelector(".knozi");

window.onscroll = function () {
     let value = scrollY;
     starts.style.left = value + "px";
     moon.style.top = value * 4 + "px";
     mountains3.style.top = value * 2 + "px";
     mountains4.style.top = value * 1.5 + "px";
     river.style.top = value + "px";
     boot.style.top = value + "px";
     boot.style.left = value * 3 + "px";
     knozi.style.fontSize = value + "px";

     if (scrollY >= 67) {
          knozi.style.fontSize = 67 + "px";
          knozi.style.position = "fixed";
          if (scrollY >= 407) {
               knozi.style.display = "none";
          } else {
               knozi.style.display = "block";
          }
          if (scrollY >= 122) {
               document.querySelector(".main").style.background =
                    "linear-gradient(#376281,#10001f)";
          } else {
               document.querySelector(".main").style.background =
                    "linear-gradient(#200016,#10001f)";
          }
     }
};

/************************************************************************************************************************* */
/*********************************************    SYSTEM    ************************************************************** */
/************************************************************************************************************************* */
/************************************************************************************************************************* */
//1
//Get Total
//Create Product
//Save Local Stroge
//clear inputs
//*************
//2
//Read
//*************
//3
//count
//*************
//4
//Delete
//*************
//5
//Update
//*************
//6
//Search
//*************
//7
//Clean Data

/**************************************************/
//Get Element From Html File
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tpm;

// Get Total
function getTotal() {
     if (price.value != "") {
          let result =
               +price.value + +taxes.value + +ads.value - +discount.value;
          total.innerHTML = result;
          total.style.background = "#040";
     } else {
          total.innerHTML = "";
          total.style.background = "#a00d02";
     }
}
//****************************************
// Create New product
// هنحفظ المنتجات ف ارري
let dataProducts;
// هنشوف اللوكل استورج فيها بيانات ولا لاء
if (localStorage.product != null) {
     dataProducts = JSON.parse(localStorage.product);
} else {
     dataProducts = [];
}

//New Product
submit.onclick = function () {
     //كل منتج هيكون ف اوبجيكت
     let newProduct = {
          title: title.value.toLowerCase(),
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: total.innerHTML,
          count: count.value,
          category: category.value.toLowerCase(),
     };

     //*************************
     //Clean Data
     if (
          title.value != "" &&
          price.value != "" &&
          category.value != "" &&
          newProduct.count < 100
     ) {
          if (mood === "create") {
               //*******************************************
               //Count
               //Create Product Acoording To Count
               if (newProduct.count > 1) {
                    for (i = 0; i < newProduct.count; i++) {
                         dataProducts.push(newProduct);
                    }
               } else {
                    dataProducts.push(newProduct);
               }
          } else {
               dataProducts[tpm] = newProduct;
               mood = "create";
               submit.innerHTML = "Create";
               count.style.display = "block";
          }
          //******************************
          //Clear Input Data
          clearInputs();
     }

     //******************************
     //Save In Local Storage
     localStorage.setItem("product", JSON.stringify(dataProducts));

     //*******************************
     //showData in table
     showData();
};

//************************************
// Clear Input
function clearInputs() {
     title.value = "";
     price.value = "";
     taxes.value = "";
     ads.value = "";
     discount.value = "";
     count.value = "";
     category.value = "";
     total.innerHTML = "";
}

//**************************************
//Read
function showData() {
     getTotal();
     let table = "";
     // looping for data product to get element
     for (let i = 0; i < dataProducts.length; i++) {
          table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick='deleteDate(${i})' id="delete">delete</button></td>
            </tr>
        `;
     }

     document.getElementById("tbody").innerHTML = table;

     //****************************
     //Delete All
     let btnDeleteAll = document.getElementById("deleteAll");
     if (dataProducts.length > 0) {
          btnDeleteAll.innerHTML = `
            <button  onclick = 'DeleteAll()'>Delete All (${dataProducts.length})</button>
        `;
     } else {
          btnDeleteAll.innerHTML = `
            
        `;
     }
}
showData();

//************************************************************
//Delete One Element
function deleteDate(i) {
     dataProducts.splice(i, 1);
     localStorage.product = JSON.stringify(dataProducts);
     showData();
}

//********************************************
//DeleteAll
function DeleteAll() {
     localStorage.clear();
     dataProducts.splice(0);
     showData();
}

//*******************************************
//Update
function updateData(i) {
     title.value = dataProducts[i].title;
     price.value = dataProducts[i].price;
     taxes.value = dataProducts[i].taxes;
     ads.value = dataProducts[i].ads;
     discount.value = dataProducts[i].discount;
     getTotal();
     count.style.display = "none";
     category.value = dataProducts[i].category;
     submit.innerHTML = "Update";
     mood = "update";
     tpm = i;
     scroll({
          top: 450,
          behavior: "smooth",
     });
}

//************************************
//Search

let searchMood = "title";

function getSearchMood(id) {
     let search = document.getElementById("search");
     if (id == "searchTitle") {
          searchMood = "title";
          search.placeholder = "Search By Title";
     } else {
          searchMood = "category";
          search.placeholder = "Search By Category";
     }
     search.focus();
     search.value = "";
     showData();
}

function searchData(value) {
     let table = "";
     if (searchMood == "title") {
          for (let i = 0; i < dataProducts.length; i++) {
               if (dataProducts[i].title.includes(value.toLowerCase())) {
                    table += `
                         <tr>
                              <td>${i + 1}</td>
                              <td>${dataProducts[i].title}</td>
                              <td>${dataProducts[i].price}</td>
                              <td>${dataProducts[i].taxes}</td>
                              <td>${dataProducts[i].ads}</td>
                              <td>${dataProducts[i].discount}</td>
                              <td>${dataProducts[i].total}</td>
                              <td>${dataProducts[i].category}</td>
                              <td><button onclick="updateData(${i})" id="update">update</button></td>
                              <td><button onclick='deleteDate(${i})' id="delete">delete</button></td>
                         </tr>
                     `;
               }
          }
     } else {
          for (let i = 0; i < dataProducts.length; i++) {
               if (dataProducts[i].category.includes(value.toLowerCase())) {
                    table += `
                         <tr>
                              <td>${i + 1}</td>
                              <td>${dataProducts[i].title}</td>
                              <td>${dataProducts[i].price}</td>
                              <td>${dataProducts[i].taxes}</td>
                              <td>${dataProducts[i].ads}</td>
                              <td>${dataProducts[i].discount}</td>
                              <td>${dataProducts[i].total}</td>
                              <td>${dataProducts[i].category}</td>
                              <td><button onclick="updateData(${i})" id="update">update</button></td>
                              <td><button onclick='deleteDate(${i})' id="delete">delete</button></td>
                         </tr>
                     `;
               }
          }
     }
     document.getElementById("tbody").innerHTML = table;
}


/***************************** */
 window.addEventListener("scroll", function () {
      const header = document.getElementById("header");
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      if (scrollY >= vh) {
           header.classList.add("hidden");
      } else {
           header.classList.remove("hidden");
      }
 });