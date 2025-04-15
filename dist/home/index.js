"use strict";
class Product {
    constructor(prodID, name, prodEditedAt, value) {
        this.prodID = prodID;
        this.prodName = name;
        this.prodEdited = prodEditedAt;
        this.prodValue = value;
    }
}
var dateController = new Date();
var productList = [];
var actualID;
function createProduct() {
    try {
        if (!validateProd()) {
            return;
        }
        let nameInput = document.getElementById("productName");
        let priceInput = document.getElementById("productPrice");
        let prodName = nameInput.value;
        let prodPrice = Number.parseFloat(priceInput.value);
        let prodEdited = (dateController.getDate() + "/" + dateController.getMonth() + "/" + dateController.getFullYear());
        let product = new Product(actualID, prodName, prodEdited, prodPrice);
        localStorage.setItem(("prod_" + actualID), JSON.stringify(product));
        productList.push(product);
        actualID++;
        localStorage.setItem("actualID", actualID.toString());
    }
    catch (error) {
        console.error(error);
    }
}
function validateProd() {
    try {
        let prodName = document.getElementById("productName");
        let prodPrice = document.getElementById("productPrice");
        let productName = prodName.value;
        let productPrice = Number.parseFloat(prodPrice.value);
        if (!productName || typeof (productName) != "string") {
            document.getElementById("productName").focus();
            return false;
        }
        if (!productPrice || typeof (productPrice) != "number") {
            document.getElementById("productPrice").focus();
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
    return true;
}
function loadProductsFromMemory() {
    try {
        for (let i = 1; i < actualID; i++) {
            let prodExist = localStorage.getItem(("prod_" + i));
            if (prodExist) {
                let prod = JSON.parse(prodExist);
                productList.push(prod);
            }
        }
        console.info("All products loaded!!!");
    }
    catch (error) {
        console.error(error);
    }
}
function addProdElement(product, color) {
    return `
    <div class="row ${color ? "row-colorLight" : "row-colorDark"}">
     <div class="col size-25">
        <div class="text-controller">${product.prodName}</div>
     </div>
    
     <div class="col size-25">
        <div class="text-controller">R$${product.prodValue}</div>
     </div>
    
     <div class="col size-25">
        ${product.prodEdited}
     </div>
    
     <div class="col size-25">
         <div class="actions-container">
             <button class="button-pattern" onclick="goToEdit(${product.prodID})">
                 <i class="fa-solid fa-pen"></i>
             </button>
             <button class="button-pattern" onclick="deleteProduct(this, ${product.prodID})">
                 <i class="fa-solid fa-trash"></i>
             </button>
         </div>
     </div>
    </div>
    `;
}
function reloadProducts() {
    try {
        let i = 0;
        let list = document.getElementById("insertSpace-tableProds");
        list.innerHTML = "";
        productList.forEach(element => {
            list.innerHTML += addProdElement(element, (i % 2 === 0 ? true : false));
        });
    }
    catch (error) {
        console.error(error);
    }
}
function goToEdit(prodID) {
    window.location.replace(`../edit/edit.html?prodID=${prodID}`);
}
function removeCreatePage() {
    try {
        document.getElementById("createPageController").remove();
    }
    catch (error) {
        console.error(error);
    }
}
function openNewProductPage() {
    try {
        document.getElementById("pageBody").innerHTML += `<div id="createPageController" class="outNewProdPage">
        <div class="close-button" onclick="removeCreatePage()">
            <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <div class="newProdPage" id="newProdPage">
            <div class="input-controller">
                <input type="text" class="input-to-create" id="productName" placeholder="Product name">
                <input type="text" class="input-to-create" id="productPrice" placeholder="Product price">
            </div>
            <div class="button-controller">
                <button class="create-button" onclick="createProduct(), reloadProducts()">Create</button>
            </div>
        </div>
    </div>`;
    }
    catch (error) {
        console.error(error);
    }
}
function deleteProduct(element, prodID) {
    var _a, _b;
    try {
        localStorage.removeItem("prod_" + prodID);
        (_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement.remove();
    }
    catch (error) {
        console.error(error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let haveSavedId = localStorage.getItem("actualID");
    if (!haveSavedId) {
        actualID = 1;
        localStorage.setItem("actualID", "1");
    }
    else {
        actualID = Number.parseInt(haveSavedId);
    }
    loadProductsFromMemory();
    reloadProducts();
});
