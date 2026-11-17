const products = [
 {id:1,name:"HONOR Magic7 Pro",type:"magic",series:"MAGIC SERIES",desc:"Flagman kamera va kuchli AI",price:11999000,image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85",tag:"TOP TANLOV"},
 {id:2,name:"HONOR Magic V3",type:"magic",series:"MAGIC SERIES",desc:"Yupqa bukiluvchi dizayn",price:15999000,image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=85",tag:"PREMIUM"},
 {id:3,name:"HONOR 200 Pro",type:"number",series:"NUMBER SERIES",desc:"Portret suratlar uchun ajoyib",price:7499000,image:"https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=85",tag:"YANGI"},
 {id:4,name:"HONOR 200",type:"number",series:"NUMBER SERIES",desc:"Kundalik foydalanish uchun",price:5299000,image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85",tag:"MASHHUR"},
 {id:5,name:"HONOR X9c",type:"x",series:"X SERIES",desc:"Mustahkam va uzoq ishlaydigan",price:3999000,image:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=700&q=85",tag:"YANGI"},
 {id:6,name:"HONOR X8b",type:"x",series:"X SERIES",desc:"Yorqin AMOLED ekran",price:2799000,image:"https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=85",tag:"QULAY"}
];
const laptops = [
 {id:7,name:"HONOR MagicBook X16",type:"laptop",series:"MAGICBOOK SERIES",desc:"16” ekran • Kundalik ishlar uchun",price:8999000,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",tag:"TAVSIYA"},
 {id:8,name:"HONOR MagicBook Pro 14",type:"laptop",series:"MAGICBOOK SERIES",desc:"Ixcham • Kuchli unumdorlik",price:11999000,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",tag:"PREMIUM"},
 {id:9,name:"HONOR MagicBook X14",type:"laptop",series:"MAGICBOOK SERIES",desc:"Yengil va qulay hamroh",price:7499000,image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=85",tag:"IXCHAM"},
 {id:10,name:"HONOR MagicBook 16",type:"laptop",series:"MAGICBOOK SERIES",desc:"Katta ekran va keng imkoniyat",price:9999000,image:"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=85",tag:"MASHHUR"}
];
let cart = [];
const money = n => n.toLocaleString("uz-UZ") + " so‘m";
function card(p){return `<article class="product-card"><div class="product-image"><span class="tag">${p.tag}</span><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80'"></div><div class="product-info"><span class="product-type">${p.series}</span><h3>${p.name}</h3><div class="product-desc">${p.desc}</div><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})" aria-label="Savatga qo‘shish">+</button></div></div></article>`}
function renderPhones(filter="all"){let list=products.filter(p=>filter==="all"||p.type===filter);const sort=document.getElementById("phoneSort").value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);document.getElementById("phoneGrid").innerHTML=list.map(card).join("")}
function renderLaptops(){document.getElementById("laptopGrid").innerHTML=laptops.map(card).join("")}
document.getElementById("phoneFilters").addEventListener("click",e=>{if(!e.target.matches("button"))return;document.querySelectorAll("#phoneFilters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");renderPhones(e.target.dataset.filter)});
document.getElementById("phoneSort").addEventListener("change",()=>renderPhones(document.querySelector("#phoneFilters .active").dataset.filter));
function addToCart(id){const p=[...products,...laptops].find(x=>x.id===id);const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});updateCart();toast("Mahsulot savatga qo‘shildi")}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0));const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><img src="${p.image}" alt=""><div class="cart-item-info"><b>${p.name}</b><small>${money(p.price)}</small><div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div></div>`).join(""):'<p class="empty-cart">Hozircha savatingiz bo‘sh.</p>'}
function changeQty(id,delta){const p=cart.find(x=>x.id===id);if(!p)return;p.qty+=delta;if(p.qty<=0)cart=cart.filter(x=>x.id!==id);updateCart()}
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");
function openCart(){drawer.classList.add("open");overlay.classList.add("show")}function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartOpen").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length){toast("Avval savatga mahsulot qo‘shing");return}toast("Demo: buyurtma qabul qilish sahifasi keyin ulanadi")};
document.getElementById("menuToggle").onclick=()=>document.querySelector(".nav").classList.toggle("show");
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("show")));
document.getElementById("searchToggle").onclick=()=>{const q=prompt("Qaysi mahsulotni qidiryapsiz?");if(!q)return;const found=[...products,...laptops].find(p=>p.name.toLowerCase().includes(q.toLowerCase()));if(found){if(found.type==="laptop")document.getElementById("laptops").scrollIntoView();else document.getElementById("phones").scrollIntoView();toast(found.name+" topildi")}else toast("Mahsulot topilmadi")};
document.getElementById("subscribeForm").addEventListener("submit",e=>{e.preventDefault();toast("Rahmat! Obunangiz qabul qilindi.");e.target.reset()});
let toastTimer;function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
renderPhones();renderLaptops();