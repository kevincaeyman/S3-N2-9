// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
//let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;
let subtotalWithDiscount = 0
products = products.map(v => ({ ...v, quantity: 1 }))

// Exercise 1
/*function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    
    let foundProduct = products[id - 1]

    for (x = 0; x < products.length; x++) {
        if (id - 1 === x) {
            cartList.push(foundProduct)
        }
    }
    console.log(cartList)
}*/

// Exercise 2
function cleanCart() {
    cart.length = 0
    document.getElementById('cart_list').innerHTML = ''
    document.getElementById('total_price').innerHTML = '0'
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0
    for (x = 0; x < cart.length; x++) {
        total += (cart[x].price)
    }
document.getElementById("total_price").innerHTML = total
}

// Exercise 4
/*function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    cartList = cartList.map(v => ({ ...v, quantity: 1 })) //Adds quantity to objects of cartList[]

    for (x = 0; x < cartList.length; x++) {
        let index = cart.map(function (e) { return e.name; }).indexOf(cartList[x].name); //Loops through the original array and looks for duplicates using the name.

        if (index === -1) { //If index = -1, it means that no diplicate has been found. We therefore push the object from the original array to the new one.
            cart.push(cartList[x])
        }
        if (index !== -1) { //If index != -1, it means that a duplicate has been found, we therefore need to update the quantity value of the matching object.
            cart[index].quantity += 1
        }
    }
    console.log(cart)
    printCart()
}*/

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    cart = cart.map(v => ({ ...v, subtotalWithDiscount: 0 }))

    for (x = 0; x < cart.length; x++) {
        if (cart[x].name === 'cooking oil' && cart[x].quantity >= 3) {
            cart[x].subtotalWithDiscount = 10
        }
        else{
            cart[x].subtotalWithDiscount = cart[x].price
        }
    }

    for (x = 0; x < cart.length; x++) {
        if (cart[x].name === 'Instant cupcake mixture' && cart[x].quantity >= 10) {
            cart[x].subtotalWithDiscount = ((cart[x].price) * 2) / 3
            console.log(cart[x].subtotalWithDiscount)
        }
        else{
            cart[x].subtotalWithDiscount = cart[x].price
        }
    }
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    applyPromotionsCart()

    for(x = 0; x < cart.length; x ++){
       let table = document.getElementById('cart_list');
       let row = table.insertRow(-1);
       let newCell = row.insertCell(0);
       let newItemName = document.createTextNode(cart[x].name);
       newCell.appendChild(newItemName);
       newCell = row.insertCell(-1);
       let newItemPrice = document.createTextNode(cart[x].price + '€')
       newCell.appendChild(newItemPrice)
       newCell = row.insertCell(-1);
       let newItemQuantity = document.createTextNode(cart[x].quantity)
       newCell.appendChild(newItemQuantity)
       newCell = row.insertCell(-1);
       let newItemDiscount = document.createTextNode(cart[x].subtotalWithDiscount + '€')
       newCell.appendChild(newItemDiscount)
        
       //Adds a remove from cart button at the end of every row
       newCell = row.insertCell(-1);
       let button = document.createElement("button");
       button.innerHTML = "Remove from cart";
       button.classList.add("btn", "btn-primary", "m-3");
       button.onclick = function() {
           let id = this.getAttribute("data-item-id");
           removeFromCart(id);
        };
        newCell.appendChild(button);
    }
}



// ** Nivell II **
// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    let productIndex = cart.findIndex(p => p.id === id);
    let foundProduct = products[id - 1];

    if (productIndex === -1) {
        cart.push({...foundProduct, quantity: 1});
    } else {
        cart[productIndex].quantity += 1;
    }

    calculateTotal();
    applyPromotionsCart();

    console.log(cart);
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }
    // update the modal with the current cart

    calculateTotal()
    applyPromotionsCart();

    printCart()

}

function open_modal() {
    console.log("Open Modal");
    printCart();
}