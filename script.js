/*=====================================================
 AUTO GARAGE WEBSITE
 script.js (PART 1)
=====================================================*/

/*============== PRODUCT DATABASE ==============*/

const products = [

{
id:1,
name:"Engine Oil 5W30",
price:2150,
category:"Engine",
image:"media/images/engine-oil.jpg"
},

{
id:2,
name:"Oil Filter",
price:350,
category:"Engine",
image:"media/images/oil-filter.jpg"
},

{
id:3,
name:"Air Filter",
price:480,
category:"Engine",
image:"media/images/air-filter.jpg"
},

{
id:4,
name:"Fuel Filter",
price:620,
category:"Engine",
image:"media/images/fuel-filter.jpg"
},

{
id:5,
name:"Cabin AC Filter",
price:550,
category:"Engine",
image:"media/images/ac-filter.jpg"
},

{
id:6,
name:"Brake Pads",
price:1250,
category:"Brake",
image:"media/images/brake-pad.jpg"
},

{
id:7,
name:"Brake Disc",
price:2850,
category:"Brake",
image:"media/images/brake-disc.jpg"
},

{
id:8,
name:"Brake Fluid",
price:450,
category:"Brake",
image:"media/images/brake-fluid.jpg"
},

{
id:9,
name:"Car Battery",
price:5999,
category:"Electrical",
image:"media/images/battery.jpg"
},

{
id:10,
name:"Alternator",
price:4800,
category:"Electrical",
image:"media/images/alternator.jpg"
},

{
id:11,
name:"Starter Motor",
price:4200,
category:"Electrical",
image:"media/images/starter.jpg"
},

{
id:12,
name:"Spark Plug",
price:280,
category:"Electrical",
image:"media/images/spark-plug.jpg"
},

{
id:13,
name:"Ignition Coil",
price:950,
category:"Electrical",
image:"media/images/ignition-coil.jpg"
},

{
id:14,
name:"Shock Absorber",
price:3500,
category:"Suspension",
image:"media/images/shock.jpg"
},

{
id:15,
name:"Lower Arm",
price:2300,
category:"Suspension",
image:"media/images/lower-arm.jpg"
},

{
id:16,
name:"Radiator",
price:4500,
category:"Cooling",
image:"media/images/radiator.jpg"
},

{
id:17,
name:"Coolant",
price:650,
category:"Cooling",
image:"media/images/coolant.jpg"
},

{
id:18,
name:"Water Pump",
price:1800,
category:"Cooling",
image:"media/images/water-pump.jpg"
},

{
id:19,
name:"Clutch Kit",
price:5200,
category:"Transmission",
image:"media/images/clutch.jpg"
},

{
id:20,
name:"Gear Oil",
price:780,
category:"Transmission",
image:"media/images/gear-oil.jpg"
},

{
id:21,
name:"LED Headlight",
price:3200,
category:"Lighting",
image:"media/images/headlight.jpg"
},

{
id:22,
name:"Fog Lamp",
price:1600,
category:"Lighting",
image:"media/images/fog-lamp.jpg"
},

{
id:23,
name:"Wiper Blade",
price:450,
category:"Accessories",
image:"media/images/wiper.jpg"
},

{
id:24,
name:"Car Floor Mats",
price:1900,
category:"Accessories",
image:"media/images/mats.jpg"
},

{
id:25,
name:"Car Air Freshener",
price:350,
category:"Accessories",
image:"media/images/freshener.jpg"
}

];

/*============== CART ==============*/

let cart = JSON.parse(localStorage.getItem("garageCart")) || [];

/*============== SAVE CART ==============*/

function saveCart(){

localStorage.setItem(
"garageCart",
JSON.stringify(cart)
);

}

/*============== UPDATE CART COUNT ==============*/

function updateCartCount(){

const count=document.querySelector(".floating-cart span");

if(!count) return;

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

count.innerHTML=total;

}

/*============== ADD TO CART ==============*/

function addToCart(id){

const product=products.find(p=>p.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}

else{

cart.push({

id:product.id,

name:product.name,

price:product.price,

image:product.image,

quantity:1

});

}

saveCart();

updateCartCount();



}

/*============== BUTTON EVENTS ==============*/

document.addEventListener("click",function(e){

if(e.target.classList.contains("add-cart")){

const id=parseInt(e.target.dataset.id);

addToCart(id);

}

});

/*============== LOAD PAGE ==============*/

window.addEventListener("load",()=>{

updateCartCount();

});

/*=====================================================
 AUTO GARAGE WEBSITE
 script.js (PART 2)
=====================================================*/

/*============== CART ELEMENTS ==============*/

const cartSidebar = document.querySelector(".cart-sidebar");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total span");
const floatingCart = document.querySelector(".floating-cart");
const closeCart = document.querySelector(".close-cart");

/*============== OPEN CART ==============*/

if(floatingCart){

floatingCart.addEventListener("click",()=>{

cartSidebar.classList.add("active");

renderCart();

});

}

/*============== CLOSE CART ==============*/

if(closeCart){

closeCart.addEventListener("click",()=>{

cartSidebar.classList.remove("active");

});

}

/*============== RENDER CART ==============*/

function renderCart(){

if(!cartItems) return;

cartItems.innerHTML="";

let total=0;

cart.forEach(item=>{

total += item.price * item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<img src="${item.image}" width="70">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

</div>

<div class="cart-controls">

<button class="minus" data-id="${item.id}">-</button>

<span>${item.quantity}</span>

<button class="plus" data-id="${item.id}">+</button>

<br><br>

<button class="remove-item" data-id="${item.id}">

Remove

</button>

</div>

</div>

`;

});

if(cartTotal){

cartTotal.innerHTML="₹"+total;

}

saveCart();

updateCartCount();

}

/*============== PLUS BUTTON ==============*/

document.addEventListener("click",function(e){

if(e.target.classList.contains("plus")){

let id=parseInt(e.target.dataset.id);

let item=cart.find(x=>x.id===id);

item.quantity++;

renderCart();

}

});

/*============== MINUS BUTTON ==============*/

document.addEventListener("click",function(e){

if(e.target.classList.contains("minus")){

let id=parseInt(e.target.dataset.id);

let item=cart.find(x=>x.id===id);

if(item.quantity>1){

item.quantity--;

}

renderCart();

}

});

/*============== REMOVE PRODUCT ==============*/

document.addEventListener("click",function(e){

if(e.target.classList.contains("remove-item")){

let id=parseInt(e.target.dataset.id);

cart=cart.filter(product=>product.id!==id);

renderCart();

}

});

/*============== CLEAR CART ==============*/

function clearCart(){

cart=[];

saveCart();

renderCart();

}

const clearBtn=document.querySelector(".clear-cart");

if(clearBtn){

clearBtn.addEventListener("click",()=>{

if(confirm("Clear complete cart?")){

clearCart();

}

});

}

/*============== EMPTY CART MESSAGE ==============*/

function checkEmptyCart(){

if(cart.length===0){

cartItems.innerHTML=`

<div style="text-align:center;padding:40px;">

<h3>Your Cart is Empty</h3>

<p>Add products to continue shopping.</p>

</div>

`;

if(cartTotal){

cartTotal.innerHTML="₹0";

}

}

}

const oldRender=renderCart;

renderCart=function(){

oldRender();

checkEmptyCart();

};

/*============== LOAD CART ON PAGE LOAD ==============*/

window.addEventListener("load",()=>{

renderCart();

});


/*=====================================================
 AUTO GARAGE WEBSITE
 script.js (PART 3)
=====================================================*/

/*============== PRODUCT SEARCH ==============*/

const searchInput=document.querySelector("#searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".product").forEach(product=>{

let name=product.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

product.style.display="block";

}

else{

product.style.display="none";

}

});

});

}

/*============== CATEGORY FILTER ==============*/

const categoryButtons=document.querySelectorAll(".categories button");

categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

categoryButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category=button.dataset.category;

document.querySelectorAll(".product").forEach(product=>{

if(category==="All"){

product.style.display="block";

}

else{

if(product.dataset.category===category){

product.style.display="block";

}

else{

product.style.display="none";

}

}

});

});

});

/*============== WHATSAPP ORDER ==============*/

const whatsappBtn=document.querySelector(".whatsapp-order");

if(whatsappBtn){

whatsappBtn.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

let message="Hello,%0A%0AI would like to order the following spare parts.%0A%0A";

let total=0;

cart.forEach(item=>{

message+=

"• "+item.name+

" x"+item.quantity+

" = ₹"+(item.price*item.quantity)+"%0A";

total+=item.price*item.quantity;

});

message+="%0A------------------------";

message+="%0ATotal : ₹"+total;

message+="%0A%0APlease confirm availability.";

window.open(

"https://wa.me/919004130508?text="+message,

"_blank"

);

});

}

/*============== CONTINUE SHOPPING ==============*/

const continueBtn=document.querySelector(".checkout-btn");

if(continueBtn){

continueBtn.addEventListener("click",()=>{

cartSidebar.classList.remove("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*============== VEHICLE FINDER ==============*/

const vehicleForm=document.querySelector(".vehicle-finder");

if(vehicleForm){

vehicleForm.addEventListener("submit",function(e){

e.preventDefault();

const brand=this.querySelector(".brand").value;

const model=this.querySelector(".model").value;

const year=this.querySelector(".year").value;

let msg="Hello,%0A";

msg+="I need spare parts for my vehicle.%0A%0A";

msg+="Brand : "+brand+"%0A";

msg+="Model : "+model+"%0A";

msg+="Year : "+year+"%0A";

window.open(

"https://wa.me/919004130508?text="+msg,

"_blank"

);

});

}

/*============== UPLOAD PART PHOTO ==============*/

const uploadForm=document.querySelector(".upload-form");

if(uploadForm){

uploadForm.addEventListener("submit",function(e){

e.preventDefault();

const name=this.querySelector(".customer-name").value;

const phone=this.querySelector(".customer-phone").value;

const details=this.querySelector(".details").value;

let message="Hello,%0A";

message+="I want to identify a spare part.%0A%0A";

message+="Name : "+name+"%0A";

message+="Phone : "+phone+"%0A";

message+="Details : "+details+"%0A%0A";

message+="I will send the product image after opening WhatsApp.";

window.open(

"https://wa.me/919004130508?text="+message,

"_blank"

);

});

}

/*============== SIMPLE SORT (OPTIONAL) ==============*/

const sort=document.querySelector("#sortProducts");

if(sort){

sort.addEventListener("change",function(){

const grid=document.querySelector(".product-grid");

const cards=[...document.querySelectorAll(".product")];

cards.sort((a,b)=>{

const priceA=parseInt(a.querySelector(".price").innerText.replace(/[^\d]/g,""));

const priceB=parseInt(b.querySelector(".price").innerText.replace(/[^\d]/g,""));

if(this.value==="low") return priceA-priceB;

if(this.value==="high") return priceB-priceA;

return 0;

});

cards.forEach(card=>grid.appendChild(card));

});

}

/*=====================================================
 AUTO GARAGE WEBSITE
 script.js (PART 4)
=====================================================*/

/*============== STICKY NAVBAR ==============*/

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>100){

header.style.background="#111";
header.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";

}
else{

header.style.background="rgba(0,0,0,.85)";
header.style.boxShadow="none";

}

});

/*============== BACK TO TOP ==============*/

const backTop=document.querySelector(".back-top");

if(backTop){

backTop.style.display="none";

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

backTop.style.display="flex";

}

else{

backTop.style.display="none";

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

}

/*============== LOADER ==============*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

},500);

}

});

/*============== HOME VISIT FORM ==============*/

const inspectionForm=document.querySelector("#inspectionForm");

if(inspectionForm){

inspectionForm.addEventListener("submit",function(e){

e.preventDefault();

const inputs=this.querySelectorAll("input,select,textarea");

let name=inputs[0].value;
let phone=inputs[1].value;
let brand=inputs[2].value;
let model=inputs[3].value;
let issue=inputs[4].value;
let address=inputs[5].value;
let date=inputs[6].value;

let message="Hello,%0A%0A";

message+="I would like to book a FREE Home Vehicle Inspection.%0A%0A";

message+="Name : "+name+"%0A";

message+="Mobile : "+phone+"%0A";

message+="Vehicle Brand : "+brand+"%0A";

message+="Vehicle Model : "+model+"%0A";

message+="Problem : "+issue+"%0A";

message+="Address : "+address+"%0A";

message+="Preferred Date : "+date+"%0A%0A";

message+="Please confirm my booking.";

window.open(

"https://wa.me/919004130508?text="+message,

"_blank"

);

this.reset();

});

}

/*============== SIMPLE REVIEW SLIDER ==============*/

const reviewSlider=document.querySelector(".review-slider");

if(reviewSlider){

setInterval(()=>{

reviewSlider.scrollBy({

left:320,

behavior:"smooth"

});

if(reviewSlider.scrollLeft+

reviewSlider.clientWidth>=

reviewSlider.scrollWidth){

reviewSlider.scrollTo({

left:0,

behavior:"smooth"

});

}

},3500);

}

/*============== FADE ANIMATION ==============*/

const fadeItems=document.querySelectorAll(".fade-up");

function revealItems(){

fadeItems.forEach(item=>{

const top=item.getBoundingClientRect().top;

const windowHeight=window.innerHeight;

if(top<windowHeight-100){

item.style.opacity="1";

item.style.transform="translateY(0)";

}

});

}

fadeItems.forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".7s";

});

window.addEventListener("scroll",revealItems);

revealItems();

/*============== BUTTON RIPPLE EFFECT ==============*/

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const x=e.offsetX;

const y=e.offsetY;

ripple.style.left=x+"px";

ripple.style.top=y+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*============== NUMBER COUNTER ==============*/

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText;

const increment=Math.ceil(target/100);

if(current<target){

counter.innerText=current+increment;

setTimeout(update,25);

}

else{

counter.innerText=target;

}

};

update();

});

/*============== CURRENT YEAR ==============*/

const year=document.querySelector(".year");

if(year){

year.innerHTML=new Date().getFullYear();

}

/*============== PREVENT EMPTY LINKS ==============*/

document.querySelectorAll("a[href='#']").forEach(link=>{

link.addEventListener("click",e=>{

e.preventDefault();

});

});

/*============== QUICK CALL BUTTON ==============*/

document.querySelectorAll(".call-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

window.location.href="tel:+919004130508";

});

});

/*============== QUICK WHATSAPP BUTTON ==============*/

document.querySelectorAll(".whatsapp-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

window.open(

"https://wa.me/919004130508",

"_blank"

);

});

});

/*============== PAGE LOADED ==============*/

console.log("===================================");

console.log("AUTO GARAGE WEBSITE LOADED");

console.log("PrimeAiHub Website Template");

console.log("Shopping Cart Ready");

console.log("WhatsApp Integration Ready");

console.log("===================================");


/*==========================================
PRODUCT CARD QUANTITY
==========================================*/

document.querySelectorAll(".product").forEach(product=>{

    const minus=product.querySelector(".quantity button:first-child");
    const plus=product.querySelector(".quantity button:last-child");
    const qty=product.querySelector(".quantity span");
    const cartBtn=product.querySelector(".add-cart");

    if(!minus || !plus || !qty || !cartBtn) return;

    let quantity=1;

    plus.addEventListener("click",()=>{

        quantity++;
        qty.innerText=quantity;

    });

    minus.addEventListener("click",()=>{

        if(quantity>1){

            quantity--;
            qty.innerText=quantity;

        }

    });

    cartBtn.addEventListener("click",()=>{

        const id=parseInt(cartBtn.dataset.id);

        const existing=cart.find(item=>item.id===id);

        if(existing){

            existing.quantity+=quantity;

        }

        else{

            const productData=products.find(p=>p.id===id);

            cart.push({

                id:productData.id,
                name:productData.name,
                price:productData.price,
                image:productData.image,
                quantity:quantity

            });

        }

        saveCart();
        updateCartCount();

        quantity=1;
        qty.innerText="1";

    });

});

/*==========================================
MOBILE HAMBURGER MENU
==========================================*/

const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector("header nav");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        nav.classList.toggle("active");

        const icon=menuToggle.querySelector("i");

        if(nav.classList.contains("active")){

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        }else{

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}

/* Close menu after clicking a link */

document.querySelectorAll("header nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        const icon=menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});