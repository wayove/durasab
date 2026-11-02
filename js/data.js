/* Durasab site content. Edit here to update services, destinations and the project gallery. */
window.DURASAB = {
  services: {
    ex: {
      title: "Exhibition stands",
      text: "Custom-built stands from shell-scheme upgrades to double-decker islands. We handle 3D design, organiser approvals, fabrication in our workshop, on-site build, AV and graphics.",
      tags: ["Custom builds", "Modular systems", "Country pavilions", "Organiser approvals"],
      img: "images/projects/stand-schell-wide.jpg",
      alt: "Two-storey white and red Schell exhibition stand with meeting area"
    },
    st: {
      title: "Stages & facades",
      text: "Full-scale stages and facades for award nights, festivals, weddings and film sets. Carved panels, domes and arches are built in sections, then raised, rigged and lit on site.",
      tags: ["Award setups", "Festival facades", "Wedding stages", "Production sets"],
      img: "images/projects/facade-night-sky.jpg",
      alt: "Palace facade lit pink and gold against the night sky"
    },
    ki: {
      title: "Kiosks & pavilions",
      text: "Compact brand pods that work hard in small footprints: neon-edged kiosks, lightbox walls and freestanding pavilions for malls, banks, telecoms and launches.",
      tags: ["Brand kiosks", "Neon and lightbox", "Pop-up pavilions", "Retail pods"],
      img: "images/projects/kiosk-halan.jpg",
      alt: "Blue neon-edged Halan brand kiosk"
    },
    co: {
      title: "Conferences & award shows",
      text: "Stage sets, LED walls, registration counters and branded backdrops for summits and award nights, delivered with lighting, seating plans and show calling.",
      tags: ["Summit staging", "Award backdrops", "Registration areas", "Show calling"],
      img: "images/projects/stage-concert.jpg",
      alt: "Conference stage with LED wall and lighting rig"
    },
    ma: {
      title: "Mall activations",
      text: "Atrium installations and seasonal centrepieces that stop shoppers. Built to mall safety rules and installed overnight so trading is never interrupted.",
      tags: ["Atrium builds", "Seasonal decor", "Product launches", "Overnight installs"],
      img: "images/projects/mall-carousel.jpg",
      alt: "Gold and red carousel installation in a mall atrium"
    },
    ro: {
      title: "Roadshows",
      text: "Branded vans and trucks that open into stages and product galleries, for regional launches and campaigns that need to travel to the audience.",
      tags: ["Van conversions", "Mobile stages", "Sampling units", "Route planning"],
      img: "images/projects/roadshow-van-open.jpg",
      alt: "Branded roadshow truck opened up as a product display"
    },
    de: {
      title: "Design studio",
      text: "The thinking behind the build. 3D stand design, brand identity, catalogue design, social creatives and product photography, all from one in-house team.",
      tags: ["3D stand design", "Brand identity", "Catalogues", "Photoshoots"],
      img: "images/projects/render-coloured-pavilion.jpg",
      alt: "3D render of a curved pavilion design"
    }
  },

  /* Departures board: [destination, region] */
  destinations: [
    ["Dubai", "UAE"], ["Riyadh", "Saudi Arabia"], ["Doha", "Qatar"], ["Abu Dhabi", "UAE"],
    ["Muscat", "Oman"], ["Manama", "Bahrain"], ["Kuwait City", "Kuwait"], ["Jeddah", "Saudi Arabia"],
    ["London", "UK"], ["Frankfurt", "Germany"], ["Paris", "France"], ["Milan", "Italy"],
    ["Barcelona", "Spain"], ["Istanbul", "Turkey"], ["Mumbai", "India"], ["Singapore", "Singapore"],
    ["Shanghai", "China"], ["Tokyo", "Japan"], ["Bangkok", "Thailand"], ["Las Vegas", "USA"],
    ["Toronto", "Canada"], ["Sao Paulo", "Brazil"], ["Sydney", "Australia"], ["Johannesburg", "South Africa"],
    ["Casablanca", "Morocco"], ["Amsterdam", "Netherlands"], ["Oslo", "Norway"], ["Colombo", "Sri Lanka"]
  ],

  /* Project gallery. cat: stands | kiosks | malls | stages | roadshows */
  projects: [
    { img: "stand-schell-wide", title: "Schell", type: "Corner stand", cat: "stands" },
    { img: "kiosk-halan", title: "Halan", type: "Neon brand kiosk", cat: "kiosks" },
    { img: "stage-palace-night", title: "Palace stage", type: "Night show set", cat: "stages" },
    { img: "stand-jasons", title: "Jasons Group", type: "Island stand", cat: "stands" },
    { img: "mall-carousel", title: "Festive carousel", type: "Atrium centrepiece", cat: "malls" },
    { img: "kiosk-aman", title: "Aman", type: "Brand kiosk", cat: "kiosks" },
    { img: "facade-magenta-beams", title: "Festival facade", type: "Facade with sky beams", cat: "stages" },
    { img: "stand-tnbi", title: "TNBi Industries", type: "Open stand", cat: "stands" },
    { img: "stand-jde", title: "JDE", type: "Coffee bar stand", cat: "stands" },
    { img: "kiosk-we-ring", title: "WE", type: "Ring kiosk", cat: "kiosks" },
    { img: "stand-icemake-island", title: "Ice Make", type: "Island stand", cat: "stands" },
    { img: "mall-shoppers-stop", title: "Shoppers Stop", type: "Mall pop-up", cat: "malls" },
    { img: "facade-jali", title: "Jali facade", type: "Carved panel detail", cat: "stages" },
    { img: "kiosk-fridays", title: "TGI Fridays", type: "Branded pavilion", cat: "kiosks" },
    { img: "stand-shree-pushkar", title: "Shree Pushkar", type: "Corner stand", cat: "stands" },
    { img: "auto-altroz", title: "Tata Altroz", type: "Car display set", cat: "malls" },
    { img: "stage-concert", title: "Concert stage", type: "LED and lighting rig", cat: "stages" },
    { img: "kiosk-neon", title: "Neon pod", type: "Lightbox kiosk", cat: "kiosks" },
    { img: "render-coloured-pavilion", title: "Pavilion concept", type: "3D design", cat: "stands" },
    { img: "stand-jasons-front", title: "Jasons Group", type: "Stand front", cat: "stands" },
    { img: "facade-white-palace", title: "White palace", type: "Facade build", cat: "stages" },
    { img: "mall-atrium", title: "Atrium stage", type: "Mall event", cat: "malls" },
    { img: "kiosk-we-arch", title: "WE", type: "Arch kiosk", cat: "kiosks" },
    { img: "stand-nutty", title: "Nutty", type: "Open stand", cat: "stands" },
    { img: "stage-arch-tunnel", title: "Arch tunnel", type: "Entry tunnel", cat: "stages" },
    { img: "auto-showcase", title: "Auto showcase", type: "Car display", cat: "malls" },
    { img: "roadshow-van-open", title: "Bike roadshow", type: "Truck conversion", cat: "roadshows" },
    { img: "stand-proklean", title: "Proklean", type: "Inline stand", cat: "stands" },
    { img: "kiosk-mashrabiya", title: "Lattice kiosk", type: "Backlit pavilion", cat: "kiosks" },
    { img: "facade-amber", title: "Amber facade", type: "Festival front", cat: "stages" },
    { img: "mall-carousel-wide", title: "Festive carousel", type: "Installation view", cat: "malls" },
    { img: "stand-arches", title: "Arches", type: "Showroom stand", cat: "stands" },
    { img: "roadshow-new-holland", title: "New Holland", type: "Roadshow van", cat: "roadshows" },
    { img: "kiosk-gold", title: "Gold kiosk", type: "Luxury pod", cat: "kiosks" },
    { img: "facade-domes-night", title: "Domed palace", type: "Night facade", cat: "stages" },
    { img: "stand-unifab", title: "Unifab", type: "Corner stand", cat: "stands" },
    { img: "mall-hero-stage", title: "Hero", type: "Launch stage", cat: "malls" },
    { img: "facade-sun-gate", title: "Sun gate", type: "Entry facade", cat: "stages" },
    { img: "render-modular-stand", title: "Modular stand", type: "3D design", cat: "stands" },
    { img: "roadshow-van", title: "Mobile gallery", type: "Truck conversion", cat: "roadshows" },
    { img: "stage-fountain", title: "Fountain set", type: "Stage with water feature", cat: "stages" },
    { img: "facade-under-build", title: "Cathedral facade", type: "Under construction", cat: "stages" }
  ]
};
