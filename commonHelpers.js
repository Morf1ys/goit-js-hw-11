import{a as m,S as b,i as l}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const P="https://pixabay.com/api/";class v{constructor(){this.searchQuery="",this.page=1,this.per_page=40,this.totalPages=0}async getImages(){const t=new URLSearchParams({key:"42127236-8bfdbbfbeed8a2dadaca720e8",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:`${this.per_page}`,page:`${this.page}`}),{data:o}=await m.get(`${P}?${t}`);return o}incrementPage(){return this.page+=1}resetPage(){return this.page=1}setTotal(t){return this.totalPages=t}resetTotalPage(){return this.totalPages=0}hasMoreImages(){return this.page===Math.ceil(this.totalPages/this.per_page)}}function h(s){return s.map(({webformatURL:t,largeImageURL:o,tags:i,likes:e,views:r,comments:c,downloads:y})=>`

  <div class="photo-card">
    <a class="photo-link" href="${o}">
      <img class="photo" src="${t}" alt="${i}" loading="lazy"/>
    </a>
      <div class="info">
     <p class="info-item">
        <b>Likes</b>${e}
      </p>
     <p class="info-item">
        <b>Views</b>${r}
      </p>
      <p class="info-item">
        <b>Comments</b>${c}
     </p>
      <p class="info-item">
       <b>Downloads</b>${y}
     </p>
  </div>
</div>
`).join("")}const a={form:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),infitity:document.querySelector(".infitity-scroll"),body:document.querySelector("body")};function g(){a.body.classList.add("loading")}function u(){setTimeout(function(){a.body.classList.remove("loading"),a.body.classList.add("loaded")},1e3)}a.form.addEventListener("submit",w);g();u();const n=new v,L=new b(".gallery a");async function w(s){if(s.preventDefault(),f.observe(a.infitity),p(),n.resetPage(),n.searchQuery=s.currentTarget.searchQuery.value.trim(),n.searchQuery===""){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}try{const t=await n.getImages();if(t.hits.length===0){l.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}const{hits:o,totalHits:i}=t;n.setTotal(i),l.success({message:`Hooray! We found ${i} images.`,position:"topRight"}),g();const e=h(o);d(e),u()}catch(t){console.log(t),p(),u()}}function d(s){a.gallery.insertAdjacentHTML("beforeend",s),L.refresh(),$()}function p(){a.gallery.innerHTML=""}async function S(s){g(),s.forEach(async t=>{try{if(t.isIntersecting&&n.query!==""&&a.gallery.childElementCount!==0){n.incrementPage();const o=await n.getImages(),{hits:i}=o;if(i.length===0){l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),f.unobserve(a.infitity);return}const e=h(i);d(e)}}catch(o){console.error(o)}finally{u()}})}const f=new IntersectionObserver(S,{rootMargin:"100px"});function $(){const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
