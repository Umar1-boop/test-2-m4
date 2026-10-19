
// // задача 1

// // N1

const recipesContainer = document.getElementById("recipes");

fetch("https://dummyjson.com/recipes")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки рецептов");
        }

        return response.json();
    })
    .then(data => {
        const recipes = data.recipes;

        recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h2>${recipe.name}</h2>
                <p>Кухня: ${recipe.cuisine}</p>
            `;

            recipesContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);
        recipesContainer.textContent = "Не удалось загрузить рецепты.";
    });


// /////////

// N2



const recipeForm = document.getElementById("recipeForm");
const recipeName = document.getElementById("recipeName");
const message = document.getElementById("message");
const recipes = document.getElementById("recipes");

recipeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = recipeName.value.trim();

    if (name === "") {
        message.textContent = "Введите название рецепта!";
        return;
    }

    fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        return response.json();
    })
    .then(data => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = data.name;

        card.appendChild(title);

        recipes.prepend(card);

        message.textContent = "Рецепт успешно добавлен!";
        recipeForm.reset();
    })
    .catch(error => {
        console.error(error);
        message.textContent = "Не удалось добавить рецепт.";

    });
});


// 3

const statusText = document.getElementById("statusText");
const recipeList = document.getElementById("recipeList");


fetch("https://dummyjson.com/recipes")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки рецептов");
        }

        return response.json();
    })
    .then(data => {
        data.recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = recipe.image;
            image.alt = recipe.name;

            const title = document.createElement("h2");
            title.textContent = recipe.name;

            const cuisine = document.createElement("p");
            cuisine.textContent = "Кухня: " + recipe.cuisine;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.classList.add("deleteBtn");

            deleteBtn.addEventListener("click", function() {
                fetch(`https://dummyjson.com/recipes/${recipe.id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Ошибка удаления");
                    }

                    return response.json();
                })
                .then(data => {
                    card.remove();

                    message.textContent = "Рецепт успешно удалён!";
                })
                .catch(error => {
                    console.error(error);

                    message.textContent = "Не удалось удалить рецепт.";
                });
            });

            card.append(image, title, cuisine, deleteBtn);

            recipesContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);
        message.textContent = "Не удалось загрузить рецепты.";
    });


// // задача 2

// 1


const productList = document.getElementById("productList");

fetch("https://dummyjson.com/products")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки товаров");
        }

        return response.json();
    })
    .then(data => {
        data.products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = product.thumbnail;
            image.alt = product.title;

            
            const title = document.createElement("h2");
            title.textContent = product.title;

            const price = document.createElement("p");
            price.textContent = product.price + " $";

            card.append(image, title, price);

            productList.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);
        statusText.textContent = "Не удалось загрузить товары.";
    });

// 2



const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");


function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = product.price + " $";

    const image = document.createElement("img");
    image.src = product.thumbnail ;
    image.alt = product.title;

    card.append(image, title, price);

    return card;
}

fetch("https://dummyjson.com/products")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки товаров");
        }

        return response.json();
    })
    .then(data => {
        data.products.forEach(product => {
            productList.appendChild(createProductCard(product));
        });
    })
    .catch(error => {
        console.error(error);
        statusText.textContent = "Не удалось загрузить товары.";
    });

productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = productName.value.trim();

    if (title === "") {
        statusText.textContent = "Введите название товара!";
        return;
    }

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            price: 0,
            thumbnail: ""
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка добавления товара");
        }

        return response.json();
    })
    .then(data => {
        productList.prepend(createProductCard(data));

        statusText.textContent = "Товар успешно добавлен!";

        productForm.reset();
    })
    .catch(error => {
        console.error(error);
        statusText.textContent = "Не удалось добавить товар.";
    });
});

// 3


const productContainer = document.getElementById("productContainer");
const resultText = document.getElementById("resultText");


fetch("https://dummyjson.com/products")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки товаров");
        }

        return response.json();
    })
    .then(data => {
        data.products.forEach(product => {
    
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = product.thumbnail;
            image.alt = product.title;

            const title = document.createElement("h2");
            title.textContent = product.title;

            const price = document.createElement("p");
            price.textContent = product.price + " $";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.classList.add("deleteBtn");

            deleteBtn.addEventListener("click", function() {
                fetch(`https://dummyjson.com/products/${product.id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Ошибка удаления товара");
                    }

                    return response.json();
                })
                .then(data => {
                    card.remove();

                    resultText.textContent = "Товар успешно удалён!";
                })
                .catch(error => {
                    console.error(error);

                    resultText.textContent = "Не удалось удалить товар.";
                });
            });

        
            card.append(image, title, price, deleteBtn);

            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);

        resultText.textContent = "Не удалось загрузить товары.";
    });
