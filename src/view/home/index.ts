let product: object;

function createProduct(prodName: string, prodValue: number) {
    try{
        product = {
            name: prodName,
            value: prodValue
        }
        console.log("Product created: \n", product);
    }catch (error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createProduct("Batata", 4.99);

    let productSpace: any;
    productSpace = document.getElementById("prod-space");
    productSpace.innerText = (JSON.stringify(product) + "Teste auto compil");
});