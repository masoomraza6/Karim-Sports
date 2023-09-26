const catContent = document.querySelector('.cat-content');
const catBox = document.querySelector('.cat-box');
const productContentDeals = document.querySelector('.product-content.deals');
const productBoxDeals = document.querySelector('.product-content.deals .box');
const imgBox = document.querySelector('.img-box');
const imgg = document.querySelector('.img-box2');
const imgLeftBtn = document.querySelector('#left');
const imgRightBtn = document.querySelector('#right');
const imgNavigation = document.querySelectorAll('.img-btns .btn');
const headBtnFeatured = document.querySelector('.head-btn.featured');
const productPage = document.querySelector('.product-page');
const body = document.body;
const productCloseBtn = document.querySelector('.product-close-btn');
const achievBox = document.querySelector('.content .grid');
const achievContent = document.querySelector('.content .grid .grid-container');
const achievLeft = document.querySelector('.achiev.left');
const achievRight = document.querySelector('.achiev.right');
const navbarBtn = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');
const navbarBtnIcon = document.querySelector('.bx-menu');
const sections = document.querySelectorAll('section');
const navLink = document.querySelectorAll('.navbar a');


import { productList } from "./database.js";


function dealProductFetch() {

    // product
    let dealDivide = 4;
    let page = 3;
    let val = 0;

    for (let x = 0; x < page; x++) {

        let div = document.createElement('div');
        div.classList.add('product-box');
        div.classList.add('deals');
        productBoxDeals.appendChild(div);

        for (let i = val; i < dealDivide; i++) {
            let id = productList[i].id;
            let title = productList[i].title;
            let img = productList[i].img;
            let rating = productList[i].rating;
            let price = productList[i].price;


            if (i == dealDivide - 1) {
                val = i + 1;
            }

            document.querySelectorAll('.product-box.deals')[x].innerHTML += displayProduct(id, title, img, rating, price);

        }
        dealDivide += 4;

    }

}
dealProductFetch();

// featured products fetch 
let displayItem = 12;
let val = 4;
let append = document.querySelector('.product-box.featured');

function featuredProductsFetch() {
    append.innerHTML = '';

    for (let i = val; i < displayItem; i++) {
        let id = productList[i].id;
        let title = productList[i].title;
        let img = productList[i].img;
        let rating = productList[i].rating;
        let price = productList[i].price;

        append.innerHTML += displayProduct(id, title, img, rating, price);

    }
    headBtnFeatured.onclick = () => {

        if (headBtnFeatured.innerHTML == 'View Less') {

            headBtnFeatured.innerHTML = 'View More';
            displayItem -= 4;
            featuredProductsFetch();

        } else {

            headBtnFeatured.innerHTML = 'View Less';
            displayItem += 4;
            featuredProductsFetch();
        }

        const products = document.querySelectorAll('.product-content .content');

        for (let product of products) {
            product.onclick = function () {

                filterProdFun(product);
                console.log(product);

            }
        }

    };

}
featuredProductsFetch();

function bestProudctsFetch() {
    let noOfProduct = 16;
    let prodcutBox = document.querySelector('.product-box.best');

    prodcutBox.innerHTML = '';

    for (let i = 12; i < noOfProduct; i++) {
        let id = productList[i].id;
        let title = productList[i].title;
        let img = productList[i].img;
        let rating = productList[i].rating;
        let price = productList[i].price;

        prodcutBox.innerHTML += displayProduct(id, title, img, rating, price);
    }
}

bestProudctsFetch();
//Display product section

function displayProduct(id, name, img, rating, price) {

    return (`<div class="content" id="${id}">
                    <div class="img-box">
                        <img src="${img}" alt="">
                        <p class="discount">15% Off</p>
                    </div>
                    <div class="details">
                        <h4 class="title">${name}</h4>
                        <p class="rating"><i class='bx bxs-star'></i></p>
                        <p class="review">${rating}</p>
                        <div class="price">
                            <p class="discount-price">Rs. ${price.discountPrice}</p>
                            <p class="real-price">Rs. ${price.realPrice}</p>
                        </div>
                    </div>
                </div>`)
}

// time
let catTime = 3000;
let dealTime = 4000;
let imgTime = 4000;
let achievTime = 6000;

// slide no.
let catSlide = 2;
let dealSlide = 3;
let imgSlide = 6;
let achievSlide = 2;

// default value
let catVal = 0;
let dealVal = 0;
let imgVal = 0;
let achievVal = 0;

//no. of products
let featuredProducts = 4;

//navbar btn
navbarBtn.onclick = () => {
    navbar.classList.toggle('active');
    navbarBtnIcon.classList.toggle('bx-x');
}

//scroll navbar
window.onscroll = () => {
    sections.forEach((sec, i) => {
        let offset = window.scrollY;
        let top = sec.offsetTop - 70;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (offset >= top && offset <= top + height) {
            navLink.forEach(link => {
                link.classList.remove('active');

                if (id !== null && id !== 'product-page') {
                    document.querySelector(`.navbar a[href*=${id}]`).classList.add('active');

                }

            })

        }
        navbar.classList.remove('active');
        navbarBtnIcon.classList.remove('bx-x');
    });
}

setInterval(function () {
    let imgBoxWidth = imgBox.offsetWidth;

    imgVal++;

    imgg.style.left = -((imgBoxWidth) * imgVal) + 'px';

    if (imgVal == imgSlide) {
        imgVal = 0;
        resetNav();
        imgg.style.left = '0px';
    }

    resetNav();
}, imgTime);

imgLeftBtn.onclick = () => {
    let imgBoxWidth = imgBox.offsetWidth;

    imgVal--;

    if (imgVal <= dealVal) {
        imgVal = (imgSlide - 1);
        imgg.style.left = -((imgBoxWidth) * imgVal) + 'px';
        resetNav();
    }

    imgg.style.left = -((imgBoxWidth) * imgVal) + 'px';
    imgNavigation[imgVal].classList.add('active');
    resetNav();
};

imgRightBtn.onclick = () => {
    let imgBoxWidth = imgBox.offsetWidth;

    imgVal++;


    if (imgVal == imgSlide) {
        imgVal = 0;
        imgg.style.left = '0px';
        resetNav();
    }

    imgg.style.left = -((imgBoxWidth) * imgVal) + 'px';
    resetNav();
};

// Achieve interval slide
setInterval(function () {
    let achievWidth = achievBox.offsetWidth;

    achievVal++;

    achievContent.style.left = -((achievWidth) * achievVal) + 'px';

    if (achievVal == achievSlide) {
        achievVal = 0;
        achievContent.style.left = '0px';
    }

}, achievTime);

achievLeft.onclick = () => {
    let achievWidth = achievBox.offsetWidth;

    achievVal--;

    if (achievVal <= achievSlide) {
        achievVal = (achievSlide - 1);
        achievContent.style.left = -((achievWidth) * achievVal) + 'px';
    }

    achievContent.style.left = -((achievWidth) * achievVal) + 'px';
};

achievRight.onclick = () => {
    let achievWidth = achievBox.offsetWidth;

    achievVal++;


    if (achievVal == achievSlide) {
        achievVal = 0;
        achievContent.style.left = '0px';
    }

    achievContent.style.left = -((achievWidth) * achievVal) + 'px';
};

function resetNav() {
    for (let nav of imgNavigation) {
        nav.classList.remove('active');

        if (imgVal == 0) {
            imgNavigation[0].classList.add('active');
        }
        imgNavigation[imgVal].classList.add('active');
    }
}

setInterval(function () {
    let catWidth = catContent.offsetWidth;

    catVal++;
    catBox.style.left = -((catWidth + 10) * catVal) + 'px';

    if (catVal == catSlide) {
        catVal = 0;
        catBox.style.left = '0px';
    }
}, catTime);

setInterval(function () {

    let dealsWidth = productContentDeals.offsetWidth;

    dealVal++;
    productBoxDeals.style.left = -((dealsWidth) * dealVal) + 'px';

    if (dealVal == dealSlide) {
        dealVal = 0;
        productBoxDeals.style.left = '0px';
    }

}, dealTime);

const products = document.querySelectorAll('.product-content .content');

for (let product of products) {
    product.onclick = function () {

        filterProdFun(product);
        console.log(product);

    }
}

function filterProdFun(prod) {

    let prodId = prod.getAttribute('id');

    let selected;

    products.forEach((el, i) => {

        if (el.getAttribute('id') == prodId) {
            selected = el;
        }
    });

    displayProd(selected);
}

function displayProd(prod) {

    let img = prod.querySelector('img').src;
    let name = prod.querySelector('.details h4.title').textContent;
    let review = prod.querySelector('.details p.review').textContent;
    let rating = prod.querySelector('.details p.rating').textContent;
    let discountPrice = prod.querySelector('.details .price p.discount-price ').textContent;
    let realPrice = prod.querySelector('.details .price p.real-price ').textContent;

    productPage.classList.add('active');
    body.classList.add('active');

    const productDetailsContainer = document.querySelector('.product-page-container');

    productDetailsContainer.innerHTML = `
    <div class="img-box">
    <img src="${img}" alt="">
</div>
<div class="product-details">
    <h2>${name}</h2>
    <p>15% OFF</p>
    <p class="review">${review}</p>
    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorem vero quas
        vel expedita natus! Dicta, molestias nisi Lorem ipsum dolor sit amet consectetur.</p>
    <p class="stock">In Stock</p>
    <div class="price">
        <span class="discount-price">${discountPrice}</span>
        <span class="real-price">${realPrice}</span>
    </div>
    <form>
        <div class="input-box">
            <p>Size</p>
            <label for="s">
                <input type="checkbox" name="s" id="s">
                <span id="s">S</span>
            </label>
            <label for="m">
                <input type="checkbox" name="m" id="m">
                <span id="m">M</span>
            </label>
            <label for="l">
                <input type="checkbox" name="l" id="l">
                <span id="l">L</span>
            </label>
            <label for="xl">
                <input type="checkbox" name="xl" id="xl">
                <span id="xl">XL</span>
            </label>
        </div>
        <div class="input-box">
            <p>Color</p>
            <label for="s">
                <input type="checkbox" name="s" id="s">
            </label>
            <label for="m">
                <input type="checkbox" name="m" id="m">
            </label>
            <label for="l">
                <input type="checkbox" name="l" id="l">
            </label>
            <label for="xl">
                <input type="checkbox" name="xl" id="xl">
            </label>
        </div>
        <div class="input-box">
            <p>Quantity</p>
            <label>
                <input type="number" id="quantity">
            </label>
        </div>
        <button type="submit">Buy Now</button>
    </form>
</div>
    `;
    let buynowBtn = document.querySelector('.product-details form button');

    buynowBtn.onclick = () => {
        productPage.classList.remove('active');
        body.classList.remove('active');

        window.location = '#contact';
    }

};

productCloseBtn.onclick = () => {
    productPage.classList.remove('active');
    body.classList.remove('active');
}
let contactForm = document.querySelector('#contact-form');
contactForm.onsubmit = () => {

    (function(){
        emailjs.init("hSbA4_Z7ouleZXsYk"); //Account Public key
    })();

    let serviceId = "service_r3gi1h8" //Email service id
    let templateId = "template_rq8k3rf" //Email template id

    let params = {
        sendername: document.querySelector('#name').value,
        senderemail: document.querySelector('#email').value,
        sendersubject: document.querySelector('#subject').value,
        sendermessage: document.querySelector('#message').value,
    }

    emailjs.send(serviceId, templateId, params)
    .then(res => {
        alert('Sent Successfuly dear...' + params.sendername);
    })
    .catch(res => alert('Failed'));
};