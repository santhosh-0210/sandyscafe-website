// cart open
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
    cart.classList.add("active");
    Navbar.classList.remove('active');
}
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

//menu
let Navbar = document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () => {
    Navbar.classList.add('active');
    cart.classList.remove("active");
}
window.onscroll = () => {
    Navbar.classList.remove('active');
}

// products
let shopcontentcoffee = document.querySelector('.coffee');
let coffee = [];
let shopcontentcake = document.querySelector('.cake');
let cake = [];
let shopcontentcookie = document.querySelector('.cookie');
let cookie = [];
let shopcontentbean = document.querySelector('.bean');
let bean = [];

const addProductsToHTML = (products, container) => {
    if (products.length > 0) {
        products.forEach(e => {
            let p = document.createElement('div');
            p.dataset.id = e.id;
            p.classList.add('product-box');
            p.innerHTML = `
                <img src="${e.image}" alt="" class="product-img">
                <h3 class="product-title">${e.name}</h3>
                <div class="price-box">
                <h4 class="price">Rs.${e.price}</h4>
                <span class="dis">Rs.${e.discount}</span>
                </div>
                <i class="fas fa-shopping-cart add-cart"></i>`;
            container.appendChild(p);
        });

        //Add to Cart buttons
        let addcart = container.getElementsByClassName("add-cart");
        for (let i = 0; i < addcart.length; i++) {
            addcart[i].addEventListener("click", addCartClicked);
        }
    }
};

const coffeedata = () => {
    fetch('Coffees.json')
    .then(response => response.json())
    .then(data => {
        coffee = data;
        addProductsToHTML(coffee , shopcontentcoffee);
    })
}
coffeedata();

const cakedata = () => {
    fetch('Cakes.json')
    .then(response => response.json())
    .then(data => {
        cake = data;
        addProductsToHTML(cake , shopcontentcake);
    })
}
cakedata();

const cookiedata = () => {
    fetch('Cookies.json')
    .then(response => response.json())
    .then(data => {
        cookie = data;
        addProductsToHTML(cookie , shopcontentcookie);
    })
}
cookiedata();

const beandata = () => {
    fetch('Beans.json')
    .then(response => response.json())
    .then(data => {
        bean = data;
        addProductsToHTML(bean , shopcontentbean);
    })
}
beandata();




// add cart js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

function ready() {
    //remove item
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    for (let i = 0; i < removeCartButtons.length; i++){
        removeCartButtons[i].addEventListener("click" , removeCartItem);
    }
    //quantity
    let quantityInputs = document.getElementsByClassName("cart-quantity")
    for(let i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change", quantityChanged);
    }
    localCartItems();
}

//remove item
function removeCartItem(event) {
    let button = event.target;
    button.parentElement.remove();
    updateTotal();
    saveCartItems();
}
//quantity
function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
    updateCartIcon();
}
//add item
function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    let price = shopProduct.getElementsByClassName('price')[0].innerText;
    let image = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToCart(title , price ,image);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}
//empty
function removeCartItem(event) {
    let button = event.target;
    button.parentElement.remove();
    updateTotal();
    checkEmptyCart();
    saveCartItems();
    updateCartIcon();
}
  

function addProductToCart(title , price , image) {
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i=0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText === title){
            alert('you have already added this item to cart');
            return;
        }
    }
    let cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    let cartBoxContent = `
    <img src="${image}" alt="image" class="cart-img" />
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-product-price">${price}</div>
    <label for="cart-quantity" class="cart-quantity-label">Quantity : 
    <input 
     type="number"
        name=""
        id=""
        value="1"
        class="cart-quantity"
        />
    </label>
    </div>
    <i class="fas fa-trash cart-remove"></i>`;
    cartBox.innerHTML = cartBoxContent;
    cartItems.append(cartBox);

        cartBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
        cartBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener('change',quantityChanged);
        checkEmptyCart();
        saveCartItems();
        updateCartIcon();
        updateTotal();
}


function updateTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartItems = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        let cartBox = cartItems[i];
        let priceElement = cartBox.getElementsByClassName("cart-product-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("Rs.", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    document.getElementsByClassName("total-price")[0].innerText = "Rs." + total;
    localStorage.setItem('cartTotal', total)
}


function checkEmptyCart() {
    const cartContent = document.querySelector('.cart-content');
    const cartItems = cartContent.querySelectorAll('.cart-box');
    const emptyMessage = cartContent.querySelector('.empty-cart-message');
  
    if (cartItems.length === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
    }
}
  
//save in local storage
function saveCartItems(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let cartItems = [];

    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        let priceElement = cartBox.getElementsByClassName('cart-product-price')[0];
        let productImg = cartBox.getElementsByClassName('cart-img')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        let item = {
            title : titleElement.innerText,
            price : priceElement.innerText,
            productImg : productImg.src,
            quantity : quantityElement.value
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function localCartItems() {
    let cartItems = localStorage.getItem('cartItems');
    if(cartItems){
        cartItems = JSON.parse(cartItems);

        for(let i=0; i<cartItems.length; i++){
            let item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            let cartBoxes = document.getElementsByClassName('cart-box');
            let cartBox = cartBoxes[cartBoxes.length-1];
            let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }
    let cartTotal = localStorage.getItem('cartTotal');
    if(cartTotal){
        document.getElementsByClassName('total-price')[0].innerText = "Rs."+cartTotal;
    }
    updateCartIcon();
}


//update cart-icon
function updateCartIcon(){
    let cartBoxes = document.getElementsByClassName('cart-box');
    let quantity = 0;

    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity+=parseInt(quantityElement.value)
    }
    let cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity)
}