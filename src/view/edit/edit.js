"use strict";
var dateController = new Date();
var product;
function loadProductFromMemory() {
    try {
        let params = new URLSearchParams(document.location.search);
        let actualID = params.get("prodID");
        let prodExist = localStorage.getItem(("prod_" + actualID));
        if (prodExist) {
            product = JSON.parse(prodExist);
        }
    }
    catch (error) {
        console.error(error);
    }
}
function prepareToEdit() {
    try {
        let inputName = document.getElementById("prodName");
        let inputPrice = document.getElementById("prodPrice");
        if (inputName) {
            inputName.value = product.prodName;
        }
        if (inputPrice) {
            inputPrice.value = product.prodValue;
        }
    }
    catch (error) {
        console.error(error);
    }
}
function validateEdit() {
    try {
        let prodName = document.getElementById("prodName");
        let prodPrice = document.getElementById("prodPrice");
        let productName = prodName.value;
        let productPrice = Number.parseFloat(prodPrice.value);
        if (!productName || typeof (productName) != "string") {
            document.getElementById("prodName").focus();
            return false;
        }
        if (!productPrice || typeof (productPrice) != "number") {
            document.getElementById("prodPrice").focus();
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
    return true;
}
function saveProduct() {
    try {
        if (validateEdit()) {
            let params = new URLSearchParams(document.location.search);
            let actualID = params.get("prodID");
            let prodName = document.getElementById("prodName");
            let prodPrice = document.getElementById("prodPrice");
            let productName = prodName.value;
            let productPrice = Number.parseFloat(prodPrice.value);
            let prodEdited = (dateController.getDate() + "/" + dateController.getMonth() + "/" + dateController.getFullYear());
            product.prodName = productName;
            product.prodValue = productPrice;
            product.prodEdited = prodEdited;
            localStorage.setItem(("prod_" + actualID), JSON.stringify(product));
            goToHome();
        }
    }
    catch (error) {
        console.error(error);
    }
}
function goToHome() {
    window.location.replace("../home/index.html");
}
document.addEventListener("DOMContentLoaded", () => {
    loadProductFromMemory();
    prepareToEdit();
});
