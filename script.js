const projectDetails = {
  nourish: {
    title: "Nourishing Farms",
    subtitle: "Reframing healthy food as something exciting, social and full of flavour.",
    sections: [
      ["The challenge", "Healthy food can often be perceived as boring or restrictive. The opportunity was to make the brand feel more engaging and culturally relevant."],
      ["The approach", "Helped shape the brand communication around the thought 'healthy, not boring', building content and campaign ideas that made better-for-you food feel part of everyday occasions."],
      ["Selected work", "Brand-building content, ambassador-led communication and a World Cup co-branding idea connecting match-time snacking with the product."],
      ["My contribution", "Campaign ideation, social content strategy and creative communication. Individual ownership and final campaign assets will be added after the project materials are reviewed."]
    ]
  },
  tata: {
    title: "Tata Projects",
    subtitle: "A thoughtful social approach for a brand with a strong legacy.",
    sections: [
      ["The context", "Communication for an established infrastructure brand needs to respect its legacy while remaining relevant to people today."],
      ["The approach", "Developed social content around important cultural moments, people and milestones, alongside stories that showcased the scale and significance of projects."],
      ["Selected work", "Festival and occasion-led communication, legacy storytelling and project showcases."],
      ["My contribution", "Content ideation, calendar planning and creative communication. We will add selected approved posts and clarify individual ownership in the final case study."]
    ]
  },
  infosys: {
    title: "Infosys",
    subtitle: "Making a global recognition feel human and tangible.",
    sections: [
      ["The opportunity", "Use the TIME and Statista World's Best Companies 2025 recognition to tell a story about people, technology and human potential."],
      ["The idea", "Explore a public-facing magazine and newspaper-stand visual concept that brought the recognition into the physical world, supported by video storytelling."],
      ["The execution", "Developed a user-generated video concept and explored AI-assisted video production to bring the idea to life."],
      ["My contribution", "Creative ideation and campaign concept development. Final approved assets and exact delivery details will be added after review."]
    ]
  },
  sany: {
    title: "SANY India",
    subtitle: "Integrated campaign thinking for bauma CONEXPO INDIA.",
    sections: [
      ["The brief", "Build a connected communication journey around a major industry exhibition, from anticipation to on-ground presence and post-event continuity."],
      ["The approach", "Planned communication across pre-launch, launch and sustenance, with a focus on product stories, exhibition presence and audience engagement."],
      ["The execution", "Campaign planning, Meta advertising, website keyword alignment, Google Ads coordination, creative direction and video-agency briefing."],
      ["My contribution", "Brand and campaign planning, coordination with product and business stakeholders, and exhibition content delivery."]
    ]
  }
};

const dialog = document.querySelector(".project-dialog");
const closeDialog = document.querySelector(".dialog-close");
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const project = projectDetails[card.dataset.project];
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector(".dialog-subtitle").textContent = project.subtitle;
    const content = document.querySelector(".dialog-content");
    content.replaceChildren();
    project.sections.forEach(([heading, body]) => {
      const h = document.createElement("h3"); h.textContent = heading;
      const p = document.createElement("p"); p.textContent = body;
      content.append(h, p);
    });
    dialog.showModal();
  });
});
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();

// Project filters
const chips=document.querySelectorAll(".chip");
chips.forEach(chip=>chip.addEventListener("click",()=>{
  chips.forEach(c=>c.classList.toggle("active",c===chip));
  const f=chip.dataset.filter;
  document.querySelectorAll(".project-card").forEach(card=>{
    card.classList.toggle("is-hidden",f!=="all"&&card.dataset.category!==f);
  });
}));
// Animated counters (run once, when visible)
const nums=document.querySelectorAll(".stat-num");
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const run=el=>{
  const target=+el.dataset.count,suffix=el.dataset.suffix||"";
  if(reduce){el.textContent=target+suffix;return;}
  const t0=performance.now(),dur=1400;
  const step=now=>{
    const p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*e)+suffix;
    if(p<1)requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
if("IntersectionObserver" in window){
  const io=new IntersectionObserver(entries=>entries.forEach(en=>{
    if(en.isIntersecting){run(en.target);io.unobserve(en.target);}
  }),{threshold:.6});
  nums.forEach(n=>io.observe(n));
}else{nums.forEach(run);}
// Hero entrance (single orchestrated moment)
document.querySelector(".hero-copy").classList.add("reveal-hero");
