// ----- GOOGLE APIs CONFIG -----
// Using actual API keys for deployment - will be secured via Google Cloud Console restrictions
window.GOOGLE_API_KEY = window.GOOGLE_API_KEY || "AIzaSyDKqaJU4zamOey5awOOaAVIHR-Os6CT7T4";
window.YT_PLAYLIST_ID = window.YT_PLAYLIST_ID || "PLgSOxKiZvKIsOUhIYkorfJ5iapqEV3U_Z";
window.GCAL_CALENDAR_ID = window.GCAL_CALENDAR_ID || "c6bd317374d90d8914db66f94e6f1e171b973d257fb11f64e03c0af1def8cb36@group.calendar.google.com";
window.VENUE_PLACE_ID = window.VENUE_PLACE_ID || null;

// API keys loaded successfully

// Coming Soon Modal Functions
function showComingSoon(feature) {
    const modal = document.getElementById('coming-soon-modal');
    const message = document.getElementById('modal-message');
    
    // Customize message based on feature
    const messages = {
        'Schedule': 'The race schedule will be available soon! Stay tuned for upcoming events and race times.',
        'Results': 'Race results and leaderboards are coming soon! Check back after our first event.'
    };
    
    message.textContent = messages[feature] || 'This feature is currently under development and will be available soon!';
    modal.style.display = 'block';
    
    // Add smooth animation
    gsap.fromTo('.modal-content', 
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
}

function closeModal() {
    const modal = document.getElementById('coming-soon-modal');
    
    // Add smooth close animation
    gsap.to('.modal-content', {
        opacity: 0,
        scale: 0.8,
        y: -50,
        duration: 0.2,
        ease: "back.in(1.7)",
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
}

// Close modal when clicking outside or on X
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('coming-soon-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

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
            // Keep hero video muted for autoplay compliance
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
    // Keep hero video muted for autoplay compliance
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

// Force video to play on load (following Chrome autoplay best practices)
if (heroVideo) {
    console.log("Hero video element found:", heroVideo);
    console.log("Video src:", heroVideo.src || heroVideo.querySelector('source')?.src);
    heroVideo.muted = true; // Ensure it's muted for autoplay
    
    // Add error handling for video loading
    heroVideo.addEventListener('error', function(e) {
        console.log("Video loading error:", e);
        // Try to load the video source again
        heroVideo.load();
    });
    
    heroVideo.addEventListener('canplay', function() {
        console.log("Video can play, attempting autoplay");
        var promise = heroVideo.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                console.log("Video autoplay started successfully");
            }).catch(error => {
                console.log("Video autoplay prevented, waiting for user interaction");
            });
        }
    });
    
    heroVideo.addEventListener('loadstart', function() {
        console.log("Video loading started");
    });
    
    heroVideo.addEventListener('loadeddata', function() {
        console.log("Video data loaded");
    });
    
    heroVideo.addEventListener('playing', function() {
        console.log("Video is playing");
    });
    
    // Fallback: try to play after a short delay
    setTimeout(() => {
        if (heroVideo.readyState >= 2) { // HAVE_CURRENT_DATA
            console.log("Attempting fallback video play");
            var promise = heroVideo.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    console.log("Video autoplay started (fallback)");
                }).catch(error => {
                    console.log("Video autoplay prevented (fallback):", error);
                });
            }
        } else {
            console.log("Video not ready, current state:", heroVideo.readyState);
        }
    }, 1000);
    
    // Force play after 2 seconds if still not playing
    setTimeout(() => {
        if (heroVideo.paused) {
            console.log("Video is paused, forcing play");
            heroVideo.play().catch(e => console.log("Force play failed:", e));
        }
    }, 2000);
}

// Unmute hero video only on user interaction (following Chrome best practices)
var unmuteHint = document.getElementById('unmute-hint');

function unmuteVideo() {
    if (heroVideo && heroVideo.muted) {
        heroVideo.muted = false;
        heroVideo.play().then(() => {
            // Hide unmute hint after successful unmute
            if (unmuteHint) {
                unmuteHint.classList.add('hidden');
            }
        }).catch(error => {
            console.log("Unmute failed:", error);
        });
    }
}

// Unmute on click anywhere
document.addEventListener('click', function() {
    unmuteVideo();
}, { once: true })

// Unmute on scroll
document.addEventListener('scroll', function() {
    unmuteVideo();
}, { once: true })

// Unmute hint click handler
if (unmuteHint) {
    unmuteHint.addEventListener('click', function() {
        unmuteVideo();
    });
}

// Mute hero video when scrolling past it
ScrollTrigger.create({
    trigger: ".page1",
    scroller: ".main",
    start: "bottom top",
    end: "bottom bottom",
    onEnter: () => { if (heroVideo) heroVideo.muted = true },
    onLeave: () => { if (heroVideo) heroVideo.muted = true },
    onEnterBack: () => { 
        if (heroVideo) {
            // Don't automatically unmute - let user control it
            heroVideo.play();
        }
    },
    onLeaveBack: () => { 
        if (heroVideo) {
            // Don't automatically unmute - let user control it
            heroVideo.play();
        }
    }
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