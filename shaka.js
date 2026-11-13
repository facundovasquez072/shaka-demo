// Compartido por todas las páginas: catálogo, encabezado, pie, tarjetas y carrito.
const T='Tees,Boardshorts,Knitwear,Boardshorts,Knitwear,Shorts,Boardshorts,Accesorios,Boardshorts,Knitwear,Accesorios,Tees,Knitwear,Camisas,Pants,Camisas,Hoodies,Camisas'.split(',');
// shortcut: imágenes enlazadas directo al CDN de la tienda y catálogo fijo; al vender, conectar a la API de Tiendanube.
const CDN='https://acdn-us.mitiendanube.com/stores/001/708/518/products/', SHOP='https://sh-aka.com.ar/productos/';
const P=[ // [nombre, precio, slug, img1, img2, pre-venta]
 ['SMMR RANGLAN TEE (rosa)','$70.000','smmr-ranglan-tee-rosa-hxivp','remera-raglan-rosa-hombre-1-e7ddef75831183717117935734984102','remera-raglan-rosa-hombre-2-5c678ea2595d20436c17935735017217'],
 ['THE VNTG BOARDSHORT (negro)','$95.000','the-vntg-boardshort-negro','artboard-70-16a57a7fe223b6f62417915023343331','artboard-72-a3dffb80bc9128ec5517915023343776',1],
 ['COSTA RICA KNIT','$150.000','costa-rica-knit-1ym6e','artboard-4-39a319ff4d0e35d19917760436932630','artboard-5-7d005a35bd2a00ecb317760436932902',1],
 ['THE VNTG BOARDSHORT (azul)','$95.000','the-vntg-boardshort-azul','artboard-64-a9b980c69ef5a6cdaf17915023886181','artboard-66-95a44095941677b41c17915023884008',1],
 ['BROKEN "CMMNTY" KNIT (black)','$135.000','bigger-cmmnty-knit-negro','artboard-67-72df1d39f95305833c17784594735979','artboard-66-198f129d1b2f25ab8b17784594729409',1],
 ['BIG CAMO JORT','$125.000','big-camo-jort-1wgym','jort-camuflado-hombre-2-36b60e6f4d119f417c17935742822659','jort-camuflado-hombre-1-64cb24503b18280b4e17935742791867',1],
 ['THE VNTG BOARDSHORT (gris)','$95.000','the-vntg-boardshort-gris-1fxvk','artboard-68-4ef8a175891b9924a717915023616905','artboard-71-e1babbee23e701110517915023623500',1],
 ['BLACK CAP','$65.000','black-cap-1e8h0','artboard-1-0784ee9d98a7b2dcb917915032531931','artboard-2-0d4c77ba397e892ec517915032530168'],
 ['THE VNTG BOARDSHORT (rojo)','$95.000','the-vntg-boardshort-rojo-j5zk3','artboard-62-edddefe2129a6b765917915024145318','artboard-65-a5a4f0d56c81f39e0817915024144506'],
 ['BROKEN "CMMNTY" KNIT (off white)','$135.000','bigger-cmmnty-knit-crudo-1v6y4','artboard-48-3d6482efb68b21507717784588404042','artboard-50-96d19f2b0b8ce09b8717784588407478',1],
 ['VNTG BELT (flame)','$60.000','vntg-belt-flame-16yg0','artboard-5-93ca7c0ea2f7b2e45717915048244717','artboard-60-792b10cde2634c793617915031592287'],
 ['SMMR LONGSLEEVE TEE (negro)','$95.000','smmr-longsleeve-tee-153hr','artboard-46-c4877e12c18a90082217915010950784','artboard-45-83c556bf0c493d852217915010950765'],
 ['THE STRIPES KNIT (verde)','$135.000','the-stripes-knit-verde','artboard-35-04529cc46167719d0b17915008861303','artboard-36-4a840725d0382e6c9c17915008863930'],
 ['SQUARED SMMR SHIRT (verde)','$85.000','squared-smmr-shirt-verde-ipkt1','artboard-17-5ffafc37c886d1d60c17915007523989','artboard-19-c1565cc9b172d153fc17915007526716'],
 ['TAILORED SMMR PANT (sastrero)','$130.000','tailored-smmr-pant-sastrero-16am7','artboard-59-2eb792215156da709c17915021740765','artboard-60-aef2dd529faac7c1d617915029178707'],
 ['SQUARED SMMR SHIRT (blanco)','$85.000','squared-smmr-shirt-blanco-14iyv','artboard-13-51a9f961250cd75cb517915006592360','artboard-16-0fa10f7999c5fed25817915006598687'],
 ['SMMR ZIP (negro)','$145.000','smmr-zip-negro-hepcb','artboard-53-edd032ea7ac738612b17915011898613','artboard-54-c5a4cf4004a6f1ac8817915011902058'],
 ['<3 LONGSLEEVE SHIRT (crudo)','$95.000','3-longsleeve-shirt-crudo-156s2','artboard-28-6bb8b82189d2cedcba17915008214897','artboard-30-567f3653ea5deb12de17915008214493'],
].map(([n,p,s,a,b,pre],i)=>({n,p,s,t:T[i],v:+p.replace(/\D/g,''),h:'producto.html?p='+s,shop:SHOP+s+'/',a:CDN+a+'-1024-1024.webp',b:CDN+b+'-1024-1024.webp',pre}));
const esc=s=>s.replace(/[<&"]/g,c=>({'<':'&lt;','&':'&amp;','"':'&quot;'}[c]));
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=id=>document.getElementById(id);

const fmt=v=>'$'+v.toLocaleString('es-AR',{maximumFractionDigits:2});
const FREE=180000; // envío gratis superando este subtotal
console.assert(fmt(70000)==='$70.000'&&P.every(p=>p.v>0&&p.t),'catálogo o formato de precio roto');

// shortcut: carrito en localStorage solo para la demo; en Tiendanube lo reemplaza el carrito nativo.
const cart={
  get(){ try{ return JSON.parse(localStorage.getItem('shaka-cart'))||[] }catch{ return [] } },
  set(c){ try{ localStorage.setItem('shaka-cart',JSON.stringify(c)) }catch{} badge() },
  add(s,size,q){ const c=cart.get(), hit=c.find(x=>x.s===s&&x.size===size); hit?hit.q+=q:c.push({s,size,q}); cart.set(c) },
};
const badge=()=>{ const n=cart.get().reduce((a,x)=>a+x.q,0); $('badge').textContent=n?' ('+n+')':'' };

const LOGO='https://acdn-us.mitiendanube.com/stores/001/708/518/themes/common/logo-6368644953230226171-1778266705-631e4e0496ffdabc5f328528caf8e87e1778266705-320-0.webp';
document.body.insertAdjacentHTML('afterbegin',`
<div class="ticker" aria-label="Envío gratis superando los $180.000, 10% off vía transferencia, 6 cuotas sin interés">
  <div aria-hidden="true">${'<span>Envío gratis superando los $180.000</span><span>//</span><span>10% off vía transferencia</span><span>//</span><span>6 cuotas sin interés</span><span>//</span>'.repeat(8)}</div>
</div>
<header>
  <nav aria-label="Categorías">
    <a href="categoria.html">New drop</a>
    ${['Tees','Boardshorts','Knitwear','Hoodies','Pants'].map(t=>`<a href="categoria.html?t=${t}">${t}</a>`).join('')}
  </nav>
  <a class="logo" href="index.html" aria-label="Shaka, inicio"><img src="${LOGO}" alt="Shaka"></a>
  <a class="btn small buy" href="carrito.html">Carrito<span id="badge"></span></a>
</header>`);
document.body.insertAdjacentHTML('beforeend',`
<footer>
  <div>
    <img src="${LOGO}" alt="Shaka">
    <nav aria-label="Redes">
      <a href="https://instagram.com/shaka___________">Instagram</a>
      <a href="https://www.tiktok.com/@shaka____________">TikTok</a>
      <a href="https://wa.me/541123855387">WhatsApp</a>
    </nav>
  </div>
  <small>Propuesta de rediseño por Lodestar</small>
</footer>`);
badge();

const card=(p,go)=>`<a class="card" href="${p.h}"><div class="pic"><img src="${p.a}" alt="${esc(p.n)}" loading="lazy"><img src="${p.b}" alt="" loading="lazy"></div><b>${esc(p.n)}${p.pre?'<span class="tag">Pre-venta</span>':''}</b><span>${p.p}</span><br><span class="go">${go}</span></a>`;

// Inclinación 3D al pasar el mouse; apagada en táctil y con movimiento reducido.
const canTilt=!still&&matchMedia('(hover:hover)').matches;
function tilt(host,el,max){
  host.addEventListener('pointermove',e=>{ const r=host.getBoundingClientRect(); el.style.transform=`rotateY(${((e.clientX-r.left)/r.width-.5)*max}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*max}deg)`; });
  host.addEventListener('pointerleave',()=>el.style.transform='');
}
const tiltCards=()=>{ if(canTilt) document.querySelectorAll('.card:not([data-t])').forEach(c=>{ c.dataset.t=1; tilt(c,c.firstElementChild,16) }) };
