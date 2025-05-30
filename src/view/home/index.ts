class Product {
    prodID: number;
    prodName: string;
    prodEdited: string;
    prodValue: number;

    constructor(prodID: number, name: string, prodEditedAt: string, value: number) {
        this.prodID = prodID;
        this.prodName = name;
        this.prodEdited = prodEditedAt;
        this.prodValue = value;
    }
}

var dateController = new Date();
var productList: Product[] = [];
var actualID: number;

function createProduct() {
    try {
        if (!validateProd()) {
            return;
        }
        let nameInput = <HTMLInputElement>document.getElementById("productName");
        let priceInput = <HTMLInputElement>document.getElementById("productPrice");
        let prodName: string = nameInput.value;
        let prodPrice: number = Number.parseFloat(priceInput.value);
        let prodEdited: string = (dateController.getDate() + "/" + dateController.getMonth() + "/" + dateController.getFullYear());

        let product: Product = new Product(actualID, prodName, prodEdited, prodPrice);
        localStorage.setItem(("prod_" + actualID), JSON.stringify(product));
        productList.push(product);

        actualID++;
        localStorage.setItem("actualID", actualID.toString());
    } catch (error) {
        console.error(error);
    }
}

function validateProd(): boolean {
    try {
        let prodName = <HTMLInputElement>document.getElementById("productName");
        let prodPrice = <HTMLInputElement>document.getElementById("productPrice");

        let productName: string = prodName.value;
        let productPrice: number = Number.parseFloat(prodPrice.value);

        if (!productName || typeof (productName) != "string") {
            document.getElementById("productName")!.focus();
            return false;
        }
        if (!productPrice || typeof (productPrice) != "number") {
            document.getElementById("productPrice")!.focus();
            return false;
        }
    } catch (error) {
        console.error(error);
    }
    return true;
}

function loadProductsFromMemory(): void {
    try {
        for (let i = 1; i < actualID; i++) {
            let prodExist: string | null = localStorage.getItem(("prod_" + i));

            if (prodExist) {
                let prod: Product = JSON.parse(prodExist);
                productList.push(prod);
            }
        }
        console.info("All products loaded!!!");
    } catch (error) {
        console.error(error);
    }
}

function addProdElement(product: Product, color: boolean): string {
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

function reloadProducts(): void {
    try {
        let i: number = 0;
        let list = document.getElementById("insertSpace-tableProds");
        list!.innerHTML = "";
        productList.forEach(element => {
            list!.innerHTML += addProdElement(element, (i % 2 === 0 ? true : false));
        });
    } catch (error) {
        console.error(error);
    }
}

function goToEdit(prodID: number): void {
    window.location.replace(`../edit/edit.html?prodID=${prodID}`);
}

function removeCreatePage(): void {
    try {
        document.getElementById("createPageController")!.remove();
    } catch (error) {
        console.error(error);
    }
}

function openNewProductPage(): void {
    try {
        document.getElementById("pageBody")!.innerHTML += `<div id="createPageController" class="outNewProdPage">
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
    } catch (error) {
        console.error(error);
    }
}

function deleteProduct(element: HTMLElement, prodID: string): void {
    try {
        localStorage.removeItem("prod_" + prodID);
        element.parentElement?.parentElement?.parentElement!.remove();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let haveSavedId: string | null = localStorage.getItem("actualID");
    if (!haveSavedId) {
        actualID = 1;
        localStorage.setItem("actualID", "1");
    } else {
        actualID = Number.parseInt(haveSavedId);
    }
    loadProductsFromMemory();
    reloadProducts();
});