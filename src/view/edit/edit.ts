var dateController = new Date();
var product: Product;

function loadProductFromMemory(): void {
    try {
        let params = new URLSearchParams(document.location.search);
        let actualID = params.get("prodID");
        let prodExist: string | null = localStorage.getItem(("prod_" + actualID));

        if (prodExist) {
            product = JSON.parse(prodExist);
        }
    } catch (error) {
        console.error(error);
    }
}

function prepareToEdit(): void {
    try {
        let inputName: any = document.getElementById("prodName");
        let inputPrice: any = document.getElementById("prodPrice");
        if (inputName) {
            inputName!.value = product.prodName;
        }
        if (inputPrice) {
            inputPrice!.value = product.prodValue;
        }
    } catch (error) {
        console.error(error);
    }
}

function validateEdit(): boolean {
    try {
        let prodName = <HTMLInputElement>document.getElementById("prodName");
        let prodPrice = <HTMLInputElement>document.getElementById("prodPrice");

        let productName: string = prodName.value;
        let productPrice: number = Number.parseFloat(prodPrice.value);

        if (!productName || typeof (productName) != "string") {
            document.getElementById("prodName")!.focus();
            return false;
        }
        if (!productPrice || typeof (productPrice) != "number") {
            document.getElementById("prodPrice")!.focus();
            return false;
        }
    } catch (error) {
        console.error(error);
    }
    return true;
}

function saveProduct(): void {
    try {
        if (validateEdit()) {
            let params = new URLSearchParams(document.location.search);
            let actualID = params.get("prodID");

            let prodName = <HTMLInputElement>document.getElementById("prodName");
            let prodPrice = <HTMLInputElement>document.getElementById("prodPrice");

            let productName: string = prodName.value;
            let productPrice: number = Number.parseFloat(prodPrice.value);

            let prodEdited: string = (dateController.getDate() + "/" + dateController.getMonth() + "/" + dateController.getFullYear());

            product.prodName = productName;
            product.prodValue = productPrice;
            product.prodEdited = prodEdited;

            localStorage.setItem(("prod_" + actualID), JSON.stringify(product));
            goToHome();
        }
    } catch (error) {
        console.error(error);
    }
}

function goToHome(){
    window.location.replace("../home/index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    loadProductFromMemory();
    prepareToEdit();
});