const createBtn = document.getElementById("create-btn");
const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector(".form");
const formData = document.querySelector("#form-data");

const productName = document.querySelector("#product-name");
const productDesc = document.querySelector("#product-desc");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");

const card = document.querySelector(".cards");

createBtn.addEventListener("click", () => {
    form.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    form.style.display = "none";
});


const productsArr = JSON.parse(localStorage.getItem("products")) || []; // here we select L.S. taki diplay of card proper ho also here my array dirrect connect with L.S.
let updateIndex = null;


formData.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = productName.value;
    let description = productDesc.value;
    let price = productPrice.value;
    let image = productImage.value;

    if (
        name.trim() === "" ||
        description.trim() === "" ||
        price.trim() === "" ||
        image.trim() === ""
    ) {
        alert("Please Fill The Form Completely");
        return;
    }

    let obj = {
        name,
        desc: description,
        price,
        img: image
    };

    // so if update ke liye values aarahi hai to alag code hoga and update ke liye alag hoga
    if(updateIndex !== null){
        productsArr[updateIndex] = obj;
        updateIndex = null;
        localStorage.setItem("products", JSON.stringify(productsArr)); // also put here taki update ke baad bhi store ho.
    }else{
        productsArr.push(obj);

        // we start loacl storage for here got it, we connext our local storage to array
        localStorage.setItem("products", JSON.stringify(productsArr));
    }
    if(productsArr.length > 0){
        createBtn.textContent = "Add More Products";
    }

    formData.reset();

    // i want ki ek bar banne par form apne aap remove hojaye
    form.style.display = "none";

    ui();

    console.log(productsArr);
});



function ui() {
    // this will change the card when 1 product created to add more products
    if(productsArr.length > 0){
        createBtn.textContent = "Add More Products";
    }else{
        createBtn.textContent = "Create Product";
    }

    card.innerHTML = "";

    productsArr.forEach((product, index) => {

        card.innerHTML += `
            <div class="card">

                <img src="${product.img}" alt="${product.name}">

                <div class="card-content">

                    <h3>${product.name}</h3>

                    <p class="price">
                        ₹${product.price}
                    </p>

                    <p class="desc">
                        ${product.desc}
                    </p>

                    <div class="card-buttons">

                        <button onclick="update('${product.name}')" class="edit-btn">
                            Edit
                        </button>

                        <button onclick="deleteProduct(${index})"  class="delete-btn">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}
ui(); // for L.S. work ki value rakhe proper se... at gloubely
// update code
const update = (name) => {
    form.style.display = "flex";

    let product = productsArr.find(product => product.name === name);

    // this is use for autofill the last value of form
    productName.value = product.name;
    productDesc.value = product.desc;
    productPrice.value = product.price;
    productImage.value = product.img;

    // it will prevent if more card are avablable so we update each card according to that.
    updateIndex = productsArr.findIndex(product => product.name === name)

    console.log(product);
};


// delete code
const deleteProduct = (index) => {
    productsArr.splice(index, 1);
    
    localStorage.setItem("products", JSON.stringify(productsArr));
    ui();
}