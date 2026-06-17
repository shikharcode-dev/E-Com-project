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

const productsArr = [];

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

    productsArr.push(obj);

    formData.reset();

    form.style.display = "none";

    ui();

    console.log(productsArr);
});

function ui() {

    card.innerHTML = "";

    productsArr.forEach((product) => {

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

                        <button class="edit-btn">
                            Edit
                        </button>

                        <button class="delete-btn">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
};

