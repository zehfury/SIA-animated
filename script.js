// ----- GOOGLE APIs CONFIG -----
// Environment variables are loaded from Netlify environment or fallback to defaults
window.GOOGLE_API_KEY = window.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY_HERE";
window.YT_PLAYLIST_ID = window.YT_PLAYLIST_ID || process.env.YT_PLAYLIST_ID || "YOUR_YOUTUBE_PLAYLIST_ID_HERE";
window.GCAL_CALENDAR_ID = window.GCAL_CALENDAR_ID || process.env.GCAL_CALENDAR_ID || "YOUR_GOOGLE_CALENDAR_ID_HERE";
window.VENUE_PLACE_ID = window.VENUE_PLACE_ID || process.env.VENUE_PLACE_ID || null;

function init() {
    gsap.registerPlugin(ScrollTrigger);

    window.locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    window.locoScroll.on("scroll", ScrollTrigger.update);

    window.locoScroll.on("scroll", function(obj) {
        let progressBar = document.querySelector("#progress-bar");
        if (progressBar) {
            if (obj.limit.y > 0) {
                let progress = (obj.scroll.y / obj.limit.y) * 100;
                progressBar.style.width = progress + "%";
            }
        }
    });

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? window.locoScroll.scrollTo(value, 0, 0) : window.locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => window.locoScroll.update());

    ScrollTrigger.refresh();
    
    // Add periodic scroll update to handle dynamic content changes
    setInterval(() => {
        if (window.locoScroll) {
            window.locoScroll.update();
        }
    }, 2000);

}

init()

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 20+"px"
    crsr.style.top = dets.y + 20+"px"
})

if (document.querySelector("#preloader")) {
    var masterTl = gsap.timeline();
    masterTl.to("#preloader h1", {
        duration: 2,
        onUpdate: function() {
            document.querySelector("#preloader h1").textContent = Math.floor(this.progress() * 100) + "%";
        },
        ease: "linear"
    }).to("#preloader", {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: function() {
            // Unmute the hero video after preloader finishes
            if (heroVideo) {
                heroVideo.muted = false;
            }
            // Refresh Locomotive Scroll to ensure proper height calculation
            if (window.locoScroll) {
                window.locoScroll.update();
            }
            // Kick off Google API sections after first paint
            bootstrapYouTube();
            bootstrapCalendar();
            bootstrapMap();
        }
    }).from(".page1 h1,.page1 h2", {
        y: 10,
        rotate: 10,
        opacity: 0,
        duration: 0.7
    }, "-=0.5");
} else {
    gsap.from(".page1 h1,.page1 h2", { y: 10, rotate: 10, opacity: 0, delay: 0.3, duration: 0.7 });
    // Unmute the hero video immediately if no preloader
    if (heroVideo) {
        heroVideo.muted = false;
    }
    bootstrapYouTube();
    bootstrapCalendar();
    bootstrapMap();
}
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
})
tl.to(".page1 h1", {
    x: -100,
}, "anim")
tl.to(".page1 h2", {
    x: 100
}, "anim")
tl.to(".page1 video", {
    width: "90%"
}, "anim")

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -115%",
        end: "top -120%",
        scrub: 3
    }
})
tl2.to(".main", {
    backgroundColor: "#fff",
})

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
})

tl3.to(".main",{
    backgroundColor:"#0F0D0D"
})

// ===== PAGE 5 BACKGROUND COLOR ANIMATIONS =====
var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page5",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top 80%",
        end: "top 20%",
        scrub: 3
    }
})
tl4.to(".main", {
    backgroundColor: "#1a1a1a", // Dark gray
})

var tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page5",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top -20%",
        end: "top -40%",
        scrub: 3
    }
})
tl5.to(".main", {
    backgroundColor: "#0d0d1a", // Brown/dark orange
})

// ===== PAGE 6 BACKGROUND COLOR ANIMATIONS =====
var tl6 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page6",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top 80%",
        end: "top 20%",
        scrub: 3
    }
})
tl6.to(".main", {
    backgroundColor: "#fff", // Very dark
})

var tl7 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page6",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top -20%",
        end: "top -40%",
        scrub: 3
    }
})
tl7.to(".main", {
    backgroundColor: "#0d0d1a", 
})

// ===== PAGE 7 BACKGROUND COLOR ANIMATIONS =====
var tl8 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page7",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top 80%",
        end: "top 20%",
        scrub: 3
    }
})
tl8.to(".main", {
    backgroundColor: "#0F0D0D", 
})

var tl9 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page7",
        scroller: ".main",
        // markers: true, // Uncomment to see trigger points
        start: "top -20%",
        end: "top -40%",
        scrub: 3
    }
})
tl9.to(".main", {
    backgroundColor: "#0F0D0D", // Very dark (back to dark)
})


var eventItems = document.querySelectorAll(".event-item")
eventItems.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "470px"
        crsr.style.height = "370px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        crsr.style.width = "20px"
        crsr.style.height = "20px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})

var h4 = document.querySelectorAll("#nav h4")
// Removed purple overlay effect for cleaner navigation
h4.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        // Add subtle hover effect instead of red overlay
        elem.style.transform = "scale(1.05)"
        elem.style.transition = "all 0.3s ease"
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.transform = "scale(1)"
    })
})

// Video sound control functionality
var heroVideo = document.querySelector("#hero-video")
var featuredVideos = document.querySelectorAll(".lazy-video")

// Unmute hero video after user interaction (fallback for autoplay policies)
document.addEventListener('click', function() {
    if (heroVideo && heroVideo.muted) {
        heroVideo.muted = false
    }
}, { once: true })

document.addEventListener('scroll', function() {
    if (heroVideo && heroVideo.muted) {
        heroVideo.muted = false
    }
}, { once: true })

// Mute hero video when scrolling past it
ScrollTrigger.create({
    trigger: ".page1",
    scroller: ".main",
    start: "bottom top",
    end: "bottom bottom",
    onEnter: () => { if (heroVideo) heroVideo.muted = true },
    onLeave: () => { if (heroVideo) heroVideo.muted = true },
    onEnterBack: () => { if (heroVideo) heroVideo.muted = false },
    onLeaveBack: () => { if (heroVideo) heroVideo.muted = false }
})

// Add scroll update when reaching venue section to fix iframe height issues
ScrollTrigger.create({
    trigger: "#venue",
    scroller: ".main",
    start: "top 80%",
    onEnter: () => {
        if (window.locoScroll) {
            setTimeout(() => {
                window.locoScroll.update();
                ScrollTrigger.refresh();
            }, 100);
        }
    }
})

// Lazy-load and auto-play/pause featured videos
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = entry.target
            if (entry.isIntersecting) {
                if (!vid.src && vid.dataset.src) {
                    vid.src = vid.dataset.src
                }
                vid.play().catch(() => {})
            } else {
                vid.pause()
            }
        })
    }, { root: document.querySelector('.main'), threshold: 0.25 })

    featuredVideos.forEach(v => io.observe(v))
}

// Unmute featured videos on hover
featuredVideos.forEach(function(video) {
    video.addEventListener("mouseenter", function() { video.muted = false })
    video.addEventListener("mouseleave", function() { video.muted = true })
})

// -------------------- GOOGLE APIS BOOTSTRAP --------------------
function bootstrapYouTube(){
    const container = document.getElementById('yt-reels');
    if (!container || !window.GOOGLE_API_KEY || !window.YT_PLAYLIST_ID || window.GOOGLE_API_KEY.includes('YOUR_')) return;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=${encodeURIComponent(window.YT_PLAYLIST_ID)}&key=${encodeURIComponent(window.GOOGLE_API_KEY)}`;
    fetch(url).then(r=>r.json()).then(data=>{
        container.innerHTML = '';
        (data.items||[]).forEach(item=>{
            const sn = item.snippet;
            const thumb = sn.thumbnails && (sn.thumbnails.maxres||sn.thumbnails.standard||sn.thumbnails.high||sn.thumbnails.medium||sn.thumbnails.default);
            const vidId = sn.resourceId && sn.resourceId.videoId;
            const card = document.createElement('a');
            card.className = 'yt-card';
            card.href = `https://www.youtube.com/watch?v=${vidId}`;
            card.target = '_blank';
            card.rel = 'noopener';
            card.innerHTML = `<img src="${thumb ? thumb.url : ''}" alt="${sn.title}"><div class="yt-title">${sn.title}</div>`;
            container.appendChild(card);
        })
    }).catch(()=>{})
}

function bootstrapCalendar(){
    const list = document.getElementById('gcal-events');
    if (!list || !window.GOOGLE_API_KEY || !window.GCAL_CALENDAR_ID || window.GOOGLE_API_KEY.includes('YOUR_')) return;
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(window.GCAL_CALENDAR_ID)}/events?key=${encodeURIComponent(window.GOOGLE_API_KEY)}&singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(timeMin)}&maxResults=5`;
    fetch(url).then(r=>r.json()).then(data=>{
        list.innerHTML = '';
        (data.items||[]).forEach(ev=>{
            const start = ev.start.dateTime || ev.start.date;
            const date = new Date(start).toLocaleString([], { month:'short', day:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
            const title = (ev.summary && ev.summary.trim()) || (ev.description && ev.description.trim()) || (ev.location && ev.location.trim()) || 'Event';
            const row = document.createElement('div');
            row.className = 'event-item';
            row.setAttribute('data-image', '');
            row.innerHTML = `<span class="event-name">${title}</span><span class="event-date">${date}</span>`;
            list.appendChild(row);
        })
    }).catch(()=>{})
}

function bootstrapMap(){
    const mapDiv = document.getElementById('venue-map');
    if (!mapDiv || !window.GOOGLE_API_KEY || window.GOOGLE_API_KEY.includes('YOUR_')) return;
    
    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.allowfullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Set iframe source based on Place ID
    if (!window.VENUE_PLACE_ID) {
        iframe.src = `https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(window.GOOGLE_API_KEY)}&q=autocross+track`;
    } else {
        iframe.src = `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(window.GOOGLE_API_KEY)}&q=place_id:${encodeURIComponent(window.VENUE_PLACE_ID)}`;
    }
    
    // Add iframe to container
    mapDiv.appendChild(iframe);
    
    // Handle iframe load event to update scroll height
    iframe.addEventListener('load', function() {
        // Small delay to ensure iframe content is fully rendered
        setTimeout(() => {
            if (window.locoScroll) {
                window.locoScroll.update();
                ScrollTrigger.refresh();
            }
        }, 500);
    });
    
    // Fallback: Update scroll on window resize (handles cases where load event doesn't fire)
    const resizeHandler = () => {
        if (window.locoScroll) {
            window.locoScroll.update();
        }
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Clean up resize listener after 10 seconds to avoid memory leaks
    setTimeout(() => {
        window.removeEventListener('resize', resizeHandler);
    }, 10000);
}