const events = [
  {id:1,title:"Future Forward: AI & Innovation Summit",category:"Technology",date:"2026-11-21",time:"10:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:"Free",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",short:"Meet the minds shaping tomorrow through AI, ideas and bold conversations.",description:"A full day of inspiring talks, practical sessions and conversations around artificial intelligence, emerging technology and the future of work. Connect with students, builders and industry experts."},
  {id:2,title:"Afterglow — Indie Music Night",category:"Music",date:"2026-11-28",time:"6:30 PM – 10:00 PM",venue:"The Garden Arena, Bhubaneswar",price:"₹299 onwards",image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",short:"An open-air evening of live indie sounds, lights and good energy.",description:"Come for the music, stay for the atmosphere. Afterglow brings together independent artists for an intimate outdoor concert with food stalls, live performances and a night made for memories."},
  {id:3,title:"The Art of Seeing — Creative Workshop",category:"Art & Culture",date:"2026-12-04",time:"11:00 AM – 2:00 PM",venue:"Kala Bhoomi, Bhubaneswar",price:"₹199",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",short:"Slow down, experiment with colour and make something uniquely yours.",description:"A welcoming, hands-on workshop for curious beginners and creative minds. Explore visual storytelling, colour and composition with guided activities. All basic materials are provided."},
  {id:4,title:"Build & Bloom — Startup Meetup",category:"Business",date:"2026-12-12",time:"9:30 AM – 1:30 PM",venue:"Mayfair Convention, Bhubaneswar",price:"₹149",image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",short:"Real stories, fresh ideas and meaningful connections for builders.",description:"An energetic meetup for founders, aspiring entrepreneurs and curious professionals. Hear honest startup stories, exchange ideas and meet people who are building what comes next."},
  {id:5,title:"CodeCanvas — Creative Coding Jam",category:"Technology",date:"2026-12-19",time:"10:00 AM – 5:00 PM",venue:"Innovation Lab, KIIT Campus",price:"Free",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",short:"A playful one-day jam where code meets creativity and collaboration.",description:"Team up, prototype and show what you can make. CodeCanvas is a friendly creative coding jam with mini challenges, mentor support and a showcase at the end of the day. Beginners are welcome."},
  {id:6,title:"Stories Under the Stars",category:"Art & Culture",date:"2026-12-26",time:"5:30 PM – 8:30 PM",venue:"Ekamra Haat Amphitheatre, Bhubaneswar",price:"₹99",image:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",short:"An evening of poetry, storytelling and conversations beneath the sky.",description:"Gather for a relaxed evening celebrating words and voices. Enjoy poetry, short stories and acoustic interludes in an open-air setting. Bring a friend, or come meet someone new."}
];

const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";
let selectedEventId = null;

function dateParts(dateString){
  const date = new Date(dateString + "T12:00:00");
  return {day:date.getDate(),month:date.toLocaleString("en",{month:"short"}).toUpperCase()};
}
function renderEvents(){
  const term = searchInput.value.trim().toLowerCase();
  const visible = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = [event.title,event.category,event.venue,event.short].join(" ").toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
  grid.innerHTML = visible.map(event => {
    const date = dateParts(event.date);
    return `<article class="event-card" tabindex="0" role="button" aria-label="View ${event.title}" data-event="${event.id}">
      <div class="card-image"><img src="${event.image}" alt="${event.title}" loading="lazy"><span class="card-category">${event.category}</span><span class="card-date"><strong>${date.day}</strong><small>${date.month}</small></span></div>
      <div class="card-body"><h3>${event.title}</h3><p>${event.short}</p><div class="card-meta"><span>⌖ &nbsp;${event.venue}</span><span class="card-arrow">↗</span></div></div>
    </article>`;
  }).join("");
  emptyState.classList.toggle("hidden", visible.length !== 0);
  document.getElementById("resultCount").textContent = `${visible.length} ${visible.length === 1 ? "experience" : "experiences"}`;
}
function openEvent(id){
  const event = events.find(item => item.id === Number(id));
  if(!event) return;
  selectedEventId = event.id;
  const date = new Date(event.date + "T12:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
  document.getElementById("modalImage").src = event.image;
  document.getElementById("modalImage").alt = event.title;
  document.getElementById("modalCategory").textContent = event.category;
  document.getElementById("modalTitle").textContent = event.title;
  document.getElementById("modalMeta").innerHTML = `<span>▦ &nbsp;${date}</span><span>◷ &nbsp;${event.time}</span><span>⌖ &nbsp;${event.venue}</span>`;
  document.getElementById("modalDescription").textContent = event.description;
  document.getElementById("modalPrice").textContent = event.price;
  document.getElementById("eventModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModals(){
  document.querySelectorAll(".modal-backdrop").forEach(modal => modal.classList.add("hidden"));
  document.body.style.overflow = "";
}
function openRegistration(eventId){
  const select = document.getElementById("selectedEvent");
  select.innerHTML = '<option value="">Choose an event</option>' + events.map(e => `<option value="${e.id}">${e.title}</option>`).join("");
  if(eventId) select.value = String(eventId);
  document.getElementById("registrationForm").classList.remove("hidden");
  document.getElementById("successState").classList.add("hidden");
  document.getElementById("registerModal").classList.remove("hidden");
  document.getElementById("eventModal").classList.add("hidden");
  document.body.style.overflow = "hidden";
}
function setError(id,message){document.getElementById(id).textContent = message;}
function validateForm(){
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventId = document.getElementById("selectedEvent").value;
  let valid = true;
  const nameValid = /^[\p{L}][\p{L}\s.'-]{1,49}$/u.test(name);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const phoneDigits = phone.replace(/[\s()+-]/g,"");
  const phoneValid = /^\d{10,13}$/.test(phoneDigits);
  setError("nameError",nameValid ? "" : "Enter your full name (at least 2 characters).");
  setError("emailError",emailValid ? "" : "Enter a valid email address.");
  setError("phoneError",phoneValid ? "" : "Enter a valid phone number (10–13 digits).");
  setError("eventError",eventId ? "" : "Please select an event.");
  valid = nameValid && emailValid && phoneValid && Boolean(eventId);
  return valid;
}
grid.addEventListener("click",e => {const card=e.target.closest("[data-event]");if(card)openEvent(card.dataset.event);});
grid.addEventListener("keydown",e => {if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-event]")){e.preventDefault();openEvent(e.target.dataset.event);}});
searchInput.addEventListener("input",renderEvents);
filters.addEventListener("click",e => {const chip=e.target.closest("[data-category]");if(!chip)return;activeCategory=chip.dataset.category;filters.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b===chip));renderEvents();});
document.getElementById("clearFilters").addEventListener("click",()=>{searchInput.value="";activeCategory="All";filters.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));renderEvents();});
document.getElementById("modalRegister").addEventListener("click",()=>openRegistration(selectedEventId));
document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(backdrop=>backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals();});
document.getElementById("registrationForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!validateForm())return;
  const event = events.find(item=>item.id===Number(document.getElementById("selectedEvent").value));
  const registration = {name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim(),phone:document.getElementById("phone").value.trim(),eventId:event.id,eventTitle:event.title,registeredAt:new Date().toISOString()};
  const saved = JSON.parse(localStorage.getItem("eventoraRegistrations") || "[]");
  saved.push(registration);
  localStorage.setItem("eventoraRegistrations",JSON.stringify(saved));
  document.getElementById("registrationForm").classList.add("hidden");
  document.getElementById("successMessage").textContent = `Thanks, ${registration.name}! Your spot for "${event.title}" has been saved on this device.`;
  document.getElementById("successState").classList.remove("hidden");
});
document.getElementById("doneBtn").addEventListener("click",closeModals);
document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  localStorage.setItem("eventoraTheme",dark?"dark":"light");
  document.getElementById("themeToggle").textContent=dark?"☀":"☾";
});
if(localStorage.getItem("eventoraTheme")==="dark"){document.body.classList.add("dark");document.getElementById("themeToggle").textContent="☀";}
document.getElementById("menuToggle").addEventListener("click",()=>{
  const links=document.getElementById("navLinks");
  const open=links.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#navLinks a").forEach(link=>link.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderEvents();

// Demo helper: inspect saved registrations in DevTools with:
// JSON.parse(localStorage.getItem("eventoraRegistrations") || "[]")
