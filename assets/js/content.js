/*
  ─────────────────────────────────────────────────────────────
  EVERYTHING ON THE SITE IS EDITED HERE.
  Change text between the quotes, save, refresh the page.

  Rules this file follows (please keep them, recruiters check):
  • Only real work, real roles, real numbers.
  • Planned builds say "in design" / "planned", never "completed".
  ─────────────────────────────────────────────────────────────

  Project log format (used by software, hardware and community):
    log: {
      caption: "text under the hero image",
      intro:   "the serif paragraph under the title",
      sections: [
        { t: "0. where it started", p: ["paragraph", "paragraph"],
          list: ["bullet", "bullet"], tip: "a highlighted tip",
          note: "a highlighted note", diagram: "ascii art", image: { src, caption } }
      ]
    }
*/
window.SITE = {

  profile: {
    name: "Enedelia Garcia-Romero",
    nickname: "ene",
    location: "Atlanta, Georgia",
    school: "Georgia State University",
    degree: "B.S. Computer Science",
    certificate: "Cybersecurity Certificate",
    graduation: "Expected May 2028",
    email: "enedelia.garcia.romero@gmail.com",
    tutorEmail: "enedelia.tutors@gmail.com",   // tutoring requests: availability and rates
    resumePdf: "resume/Enedelia-Garcia-Romero-Resume.pdf"
  },

  // Leave a link "" to hide it everywhere.
  links: {
    github:   "https://github.com/enedelia-garcia-romero",
    linkedin: "https://www.linkedin.com/in/enedelia-garcia-romero",
    blog:     "https://substack.com/@enedelia",
    podcast:  "https://open.spotify.com/show/3FH2ovM8YthdyMTm0u9KMJ",
    youtube:  "https://www.youtube.com/@EnedeliaGarcia-Romero",
    tiktok:   ""          // ← paste your TikTok URL here
  },

  // ── EXPERIENCE (vertical tabs) ───────────────────────────
  experience: [
    {
      tab: "GSU Robotics",
      title: "President",
      org: "GSU Robotics Club",
      period: "2025 – Present",
      bullets: [
        "Lead technical workshops, projects, meetings and outreach across robotics, programming, electronics and mechanical design.",
        "Build hands-on workshops from member feedback, Python, soldering, electronics, sensors, robotics hardware and mechanical building.",
        "Run semester-long team projects with biweekly progress check-ins, and make technical topics approachable for students at every experience level.",
        "Previously Vice President (2024 – 2025): supported projects, workshops, member engagement, outreach and inventory."
      ]
    },
    {
      tab: "Math Path SURS",
      title: "Undergraduate Researcher",
      org: "Math Path SURS · GSU",
      period: "Summer 2026",
      bullets: [
        "Designed and analyzed a privacy-conscious, camera-free obstacle-detection aid for people with low vision using ultrasonic sensing.",
        "Built coverage, temperature and latency feasibility models and wrote a reproducible bench-validation protocol.",
        "Presented the research as a university poster to faculty and students, mentored by Dr. Ashwin Ashok."
      ],
      link: "obstacle-clip"
    },
    {
      tab: "GSU Housing",
      title: "Resident Assistant",
      org: "GSU Housing · Piedmont North",
      period: "2025 – Present",
      bullets: [
        "Host a Career & Academic Roadmap Café at the start and end of each semester; about 80 primarily first-year students attended the first session in December 2025.",
        "Introduced residents to generative AI agents and AI-assisted research, and to verifying information against official university sources.",
        "Guided students in building individual academic and career roadmaps with Smartsheet and university resources."
      ],
      link: "career-cafe"
    },
    {
      tab: "GSU Cybersecurity",
      title: "Study Session Facilitator",
      org: "GSU Cybersecurity Club",
      period: "2026 – Present",
      bullets: [
        "Facilitate peer study sessions for Microsoft and CompTIA cybersecurity certifications.",
        "Work from Microsoft Learn, certification objectives, practice questions and collaborative review.",
        "Explain security and networking concepts in beginner-friendly language and help students pick certification paths."
      ],
      link: "cyber-club"
    },
    {
      tab: "PROG GSU",
      title: "Member",
      org: "PROG GSU",
      period: "2025 – Present",
      bullets: [
        "Help organize technology networking events, socials and hackathons for Georgia State's student tech community.",
        "Support event logistics, outreach and participant engagement across computer science, cybersecurity and engineering.",
        "Support PROGIRLS events that make technical spaces more welcoming for women."
      ]
    },
    {
      tab: "Tutoring",
      title: "STEM Tutor",
      org: "Independent",
      period: "Ongoing",
      bullets: [
        "Peer tutoring in computer science, calculus and physics courses.",
        "Focus on the why behind each step so students can solve the next problem on their own."
      ],
      tutoring: true
    },
    {
      tab: "STEM Camp",
      title: "Summer Tech Coach",
      org: "Community STEM Camp",
      period: "May – Jul 2023",
      bullets: [
        "Introduced STEM careers and activities to 26 students to promote STEM in my community at no cost.",
        "Taught Python and hands-on STEM lessons to middle-school students, ages 11–14, in Albany, Georgia.",
        "Created lesson plans for interactive lessons and project-based workshops.",
        "Explained instructions clearly, answered questions and adjusted support to each student's needs."
      ]
    }
  ],

  // ── SOFTWARE ─────────────────────────────────────────────
  // featured: true → spotlight carousel. home: true → one of the three cards under it.
  software: [
    {
      id: "least-privilege",
      title: "Least-Privilege Lab",
      desc: "An IAM-style policy engine that tests whether a student file-sharing system can stop cross-team snooping without getting in the way of real coursework.",
      tech: "Python, JSON policies",
      motif: "matrix",
      featured: true,
      date: "Summer 2026 · CSC 6222",
      status: "Course project",
      github: "",
      log: {
        caption: "the access matrix: four roles, five actions, one question",
        intro: "For my cybersecurity course I modeled a cloud-style file-sharing system for student teams, then wrote IAM-style JSON policies and a Python evaluator to see whether least privilege could block cross-team access without blocking legitimate work.",
        sections: [
          { t: "0. where it started", p: ["In most student group projects, files live in a shared folder where, technically, anyone with access can open anything. Nobody does, until someone does.", "The principle everyone repeats in security class is least privilege: give people exactly what they need and nothing more. I wanted to find out how hard that actually is to write down."] },
          { t: "1. the setup", p: ["Four roles, student, team lead, TA and instructor, and five actions: read, upload, edit, delete and share. The protected assets are project files, role assignments, sharing permissions and activity logs."],
            list: ["Student: read their own team's files, edit and delete only their own files, no sharing.", "Team lead: read, edit, delete and share within their own team.", "TA: read the teams they're assigned to. That's it.", "Instructor: everything."] },
          { t: "2. the threat model", p: ["The adversary is an authenticated student, or someone using a compromised student account. They can request any file operation through the app, but they can't touch the policy evaluator itself.", "The things I care about blocking: reading another team's files, deleting files you don't own, sharing without permission, and abusing an over-powered role."] },
          { t: "3. the experiment", p: ["First I wrote a deliberately over-permissive baseline policy. Then a least-privilege policy that checks the role, team membership, file ownership and the requested action.", "A Python script fires about 60 requests at both, cases that should be allowed and cases that should be denied, and compares unauthorized actions allowed, legitimate actions allowed, false denials, policy coverage and rule count."],
            tip: "Write the deny cases first. It's easy to write a policy that lets the right people in; the bugs live in who else gets in." },
          { t: "4. what i learned", p: ["Least privilege is easy to say and fiddly to encode. The hard part is the legitimate exceptions, like a team lead who needs to share or a TA who needs to read, without reopening the door you just closed.", "Next I'd add time-bound sharing links and alerts on repeated denied requests in the activity log."] }
        ]
      }
    },
    {
      id: "web-session-security",
      title: "Cookie Monster",
      desc: "A browser-side investigation into session cookies, XSS and CSP, proving with DevTools exactly why HttpOnly and SameSite matter.",
      tech: "DevTools, HTTP, XSS, CSP",
      motif: "shield",
      featured: true,
      date: "Summer 2026 · CSC 4222",
      status: "Lab series",
      github: "",
      log: {
        caption: "two cookies walk into an XSS payload. only one walks out.",
        intro: "In my Fundamentals of Cybersecurity labs I used browser Developer Tools to compare an insecure session cookie with a hardened one, traced user input through HTTP requests, and analyzed what Content Security Policy and WAFs can and can't fix.",
        sections: [
          { t: "0. where it started", p: ["Security controls are easy to list on a slide, Secure, HttpOnly, SameSite, CSP, and weirdly hard to picture. I wanted evidence: what does a protected cookie actually look like, and what does an attacker's script actually get?"] },
          { t: "1. the cookie test", p: ["I served the lab app over HTTPS and opened the Application tab. Two cookies: session_insecure, and session_secure with Secure, HttpOnly and SameSite=Strict.", "Then I triggered an XSS alert. It printed session_insecure, and not session_secure. HttpOnly kept the hardened cookie completely out of JavaScript's reach. Seeing that pop-up made the flag make sense in a way the definition never did."] },
          { t: "2. following the input", p: ["In the Network tab I traced a search request, GET /search?q=Router, 200 OK, back to the q parameter. That one user-controlled value is exactly where you'd test for SQL injection and reflected XSS, so I read the response headers to see which security headers were (and weren't) there."] },
          { t: "3. what csp can and can't do", list: ["script-src 'self' blocks scripts from other origins, but not vulnerable code already on your own origin.", "frame-ancestors 'none' stops clickjacking by refusing to be framed.", "sandbox locks down embedded content; adding allow-scripts quietly weakens it."],
            tip: "CSP, cookie flags and a WAF each guard a different layer. None of them replaces fixing the code: prepared statements, output escaping, CSRF tokens and server-side authorization." },
          { t: "4. what i learned", p: ["Defense in depth stopped being a buzzword. Each control is a seatbelt, not a steering wheel. I'm turning this lab into a beginner walkthrough for our cybersecurity study sessions."] }
        ]
      }
    },
    {
      id: "comunidad-connect",
      title: "Comunidad Connect",
      desc: "A platform that connects people with food drives, legal aid, tutoring and clinics, backed by an API for real-time community alerts.",
      tech: "Backend API, real-time alerts",
      motif: "network",
      featured: true,
      date: "In progress · 2026",
      status: "In progress",
      github: "",
      log: {
        caption: "every node is a resource someone needs to find",
        intro: "Comunidad Connect is a platform I'm building to connect people with community resources, food drives, legal aid, tutoring and healthcare, and keep that information current through a backend API for real-time alerts and resource updates.",
        sections: [
          { t: "0. where it started", p: ["As a first-generation student, I care about access. Help often already exists, from food drives to free clinics and legal aid offices. Finding it, and knowing whether the information is still current, is the hard part.", "Information that's out of date can be as unhelpful as no information at all."] },
          { t: "1. what it does", list: ["A directory of community resources: food drives, legal aid, tutoring and clinics.", "A backend API that manages real-time community alerts and resource updates.", "Built so people can find what's available, nearby and current."] },
          { t: "2. where it is now", p: ["In development. I'm building the backend API first, because the whole thing only works if the information stays fresh."],
            note: "This project is still being built, no launch or usage numbers yet." },
          { t: "3. what's next", p: ["Verified listings, Spanish and English content, and alerts people can subscribe to by need and neighborhood."] }
        ]
      }
    },
    {
      id: "visionsim",
      title: "VisionSim",
      desc: "A visual accessibility simulator that shows designers how their work looks with glaucoma or color blindness.",
      tech: "Accessibility, vision simulation",
      motif: "lens",
      featured: true,
      date: "2026 · in development",
      status: "In development",
      github: "",
      log: {
        caption: "same screen, different ways of seeing it",
        intro: "VisionSim is a visual accessibility simulator I'm building that models conditions such as glaucoma and color blindness, so designers and developers can check their work against more ways of seeing.",
        sections: [
          { t: "0. where it started", p: ["Most interfaces only ever get checked with the designer's own eyes. My research on low-vision navigation made me think a lot about who gets left out of that check."] },
          { t: "1. what it does", list: ["Takes a screen or image as input.", "Applies a condition model, for example glaucoma's narrowing field of view, or a color-vision deficiency.", "Shows the simulated view side by side with the original."] },
          { t: "2. where it is now", p: ["In development."], tip: "Simulations don't replace testing with people. They're for catching problems early, when they're cheapest to fix." }
        ]
      }
    },
    {
      id: "portfolio",
      title: "This Portfolio",
      desc: "An ASCII portrait that scatters when you touch it, a tiny robot platformer, and every project log in one place.",
      tech: "HTML, CSS, JavaScript, Canvas",
      motif: "pages",
      date: "2026",
      status: "Live",
      github: "",
      log: {
        caption: "you are here",
        intro: "My portfolio, with a layout and interactions inspired by Gazi Jarin's site: an ASCII portrait drawn from my headshot, a pixel-robot game mode, and project logs for everything I build. My content and direction; built with AI-assisted development.",
        sections: [
          { t: "0. the portrait", p: ["Every character is sampled from my headshot and drawn as ASCII art. On load the characters fly in and assemble into the portrait; move your cursor across it and they scatter, then spring back into place."] },
          { t: "1. game mode", p: ["Turn on Game Mode and a pixel robot appears. The platforms are the tops of real elements on the page, and five cells are hidden down the page."] }
        ]
      }
    }
  ],

  // ── HARDWARE ─────────────────────────────────────────────
  // image: a photo path, or pixel: "usb" | "pantry" | "marta" | "charm" | "journal" | "grid" for pixel-art concept art.
  hardware: [
    {
      id: "obstacle-clip",
      title: "Low-Vision Obstacle Detection Aid",
      desc: "Undergraduate research on a privacy-conscious, camera-free clip that uses ultrasonic sensing to warn people with low vision about obstacles ahead.",
      tech: "Ultrasonic rangers, XIAO ESP32-C3, haptics, OpenSCAD",
      image: "assets/img/research-square.jpg",
      badge: { text: "Undergraduate Research · Math Path SURS", href: "assets/img/research-poster.jpg", lightbox: true },
      date: "Summer 2026",
      status: "Research · poster presented",
      log: {
        hero: "assets/img/research-photo.jpg",
        caption: "presenting the poster at Georgia State",
        intro: "As an undergraduate researcher in Georgia State's Math Path Summer Research Program, I designed and analyzed a low-cost obstacle-detection aid for people with low vision, one that senses distance with ultrasound instead of a camera, so it can help without recording anyone. Mentored by Dr. Ashwin Ashok.",
        sections: [
          { t: "0. where it started", p: ["A lot of the newest vision aids are basically a camera plus AI. They can read signs and describe a room, which is genuinely amazing, but they also see everyone around you. Users and bystanders raise real concerns about privacy, consent, sensitive attributes and AI getting things wrong. And the good devices cost hundreds or thousands of dollars.", "So the question I took into the summer was simple to say and hard to answer: how much can you do with no camera at all?"] },
          { t: "1. the research question", p: ["How accurately and quickly could a low-cost clip estimate torso- and head-level obstacle distance and coarse direction under controlled conditions?", "My hypothesis: three ultrasonic sensors, fired one after another, would cover much more of the path ahead than a single sensor, while keeping a full scan under 100 ms at 3.5 m."] },
          { t: "2. how it works", p: ["Ultrasound is an old, beautiful idea: send a chirp, wait for the echo, and the time it takes tells you how far away something is."],
            diagram: "      LEFT          CENTER          RIGHT\n        \\             |             /\n         \\   three ultrasonic sectors  /\n          +-------------------------+\n          |      XIAO ESP32-C3      |\n          |  sequential ping, then  |\n          |  filter + thresholds    |\n          +------------+------------+\n                       |\n          +------------+------------+\n          |                         |\n   vibration motor            BLE -> phone\n   (urgency = distance)       speech (optional)",
            after: ["distance = speed of sound × echo time ÷ 2. Which sensor hears the echo gives a coarse direction: left, center or right. That's all it knows, on purpose: no images, no faces, no identity."] },
          { t: "3. the parts", p: ["This is the planning bill of materials for the bench prototype. Nothing has been purchased yet."],
            list: ["The ears: 3 × Grove ultrasonic rangers, one per sector, $14.97.", "The brain: Seeed XIAO ESP32-C3 for timing, filtering and Bluetooth, $4.99.", "The alert: a small vibration motor, so the warning is felt, not heard, $1.95.", "The power: a 500 mAh LiPo, $7.95.", "Everything else: driver, wiring, case and clip, $5–15."],
            after: ["That's a $35–45 raw-material estimate, compared with $799 and $4,250 for two commercial aids. I also modeled a miniaturized 48 × 13 mm clip in OpenSCAD, and it needs a custom board to actually shrink that far."],
            image: { src: "assets/img/clip-cad-navy.png", caption: "the clip concept in OpenSCAD, front sensors, back clip" } },
          { t: "4. what the models showed", p: ["Before building anything, I wanted to know whether the design was even worth building, so I wrote three feasibility models."],
            list: ["Coverage (Monte Carlo, 20,000 draws): three sectors covered 59.1% of modeled obstacles, versus 26.5% for a single center sensor.", "Temperature: with a fixed speed of sound, range error swings about ±7 cm at 2 m across 0–40 °C, so the clip should measure temperature.", "Latency: a full three-sensor scan at 3.5 m takes about 67 ms (14.9 Hz), roughly 9 cm of walking per scan."],
            note: "Every number here is a model output, not a hardware measurement. A simulation is a reason to build and test, not a result to advertise." },
          { t: "5. the hard parts", list: ["Weak or missed echoes → overlapping sectors, repeated and filtered readings, and testing target width, material and angle before setting thresholds.", "Crosstalk between sensors → fire them one at a time with a guard window, and log false echoes and dropouts.", "Temperature and clip motion → measure temperature to correct the speed of sound, and test different clip placements.", "Too many alerts → co-design adjustable vibration cues with actual users."] },
          { t: "6. ethics & boundaries", list: ["A supplemental aid only, never a replacement for a cane, guide dog, caregiver or orientation-and-mobility training.", "No prototype, hardware measurements or human participants yet.", "Any user study comes after institutional review and co-design with low-vision users."] },
          { t: "7. what's next", p: ["Build the bench prototype and run the validation protocol: at least 30 readings per condition across distances from 0.25 to 3 m, hard and soft materials, angles, mounting positions and walking motion, measuring accuracy, latency, power and dropouts."] },
          { t: "8. what i learned", p: ["Privacy works best as a requirement from day one, not a feature you add later.", "I also learned how much of research is being precise about what you actually know. A good poster isn't the one with the biggest claims. It's the one where every number says exactly what it is."] }
        ]
      }
    },
    {
      id: "smart-pantry",
      title: "ROOT",
      subtitle: "Smart Food & Nutrition Cyberdeck",
      desc: "A countertop kitchen device that scans groceries, tracks how much is left and reminds you before food expires, so less ends up in the trash.",
      tech: "Planned: Raspberry Pi, barcode scanner, load cell, mic + speaker",
      pixel: "pantry",
      date: "Planned · 2026",
      status: "In design",
      log: {
        caption: "concept art, scan it, track it, cook it",
        intro: "An intelligent kitchen device designed to reduce food waste and help manage a food inventory: barcode scanning, expiration reminders, nutrition tracking, voice interaction and ingredient-based recipe suggestions. This build is in the design stage.",
        sections: [
          { t: "0. where it started", p: ["Every college fridge has a graveyard shelf. Half a bag of spinach, a yogurt from two weeks ago, three open jars of salsa.", "This build answers two questions: what do I actually have, and what's about to go bad?"] },
          { t: "1. what it should do", list: ["Barcode scanning to add groceries in a second.", "Food inventory management.", "Expiration reminders before things go bad.", "Nutrition tracking from product data.", "Voice interaction for messy-hands moments.", "Ingredient-based recipe suggestions.", "Tracking how much of something is left."] },
          { t: "2. the parts i'm planning around", list: ["The brain: a Raspberry Pi with a small touchscreen.", "The scanner: a USB barcode scanner, looking items up in an open product database.", "How much is left: a load cell and HX711 amplifier under a scale plate.", "The voice: a USB mic and small speaker, ideally with on-device wake-word detection."],
            note: "Planned parts, not a finished build list." },
          { t: "3. the hard parts", list: ["Fresh produce has no barcode.", "Estimating what's left by weight when containers vary.", "Keeping a listening device in a kitchen private.", "Reminders that are helpful instead of annoying."] },
          { t: "4. where it is now", p: ["Design stage, features and parts planned, nothing built yet."] }
        ]
      }
    },
    {
      id: "marta-navigator",
      title: "PULSE",
      subtitle: "MARTA Train & Bus Navigation Device",
      desc: "A pocket-sized companion for Atlanta's MARTA that tells you which train or bus to take, where to transfer, and buzzes before your stop.",
      tech: "Planned: ESP32, e-paper display, GPS, vibration motor, MARTA open data",
      pixel: "marta",
      date: "Planned · 2026",
      status: "In design",
      log: {
        caption: "concept art, four lines, one transfer at Five Points",
        intro: "A compact device designed to make MARTA train and bus navigation easier: directions, transfer information, real-time arrivals where available, and customizable vibration or audio alerts before your stop. This build is in the design stage.",
        sections: [
          { t: "0. where it started", p: ["MARTA connects a lot of Atlanta, including Georgia State's downtown campus. But a transfer at a hub like Five Points can be confusing the first time, and phone navigation struggles when the battery is low or you're underground without signal.", "I wanted something simpler and calmer that just answers three questions: which one, where do I transfer, and when do I get off?"] },
          { t: "1. what it should do", list: ["MARTA train and bus directions.", "Transfer information.", "Real-time arrival updates where available.", "Alerts for upcoming stops.", "Customizable vibration or audio notifications.", "Clear guidance on which train or bus to take."] },
          { t: "2. the parts i'm planning around", list: ["The brain: an ESP32 for Wi-Fi and Bluetooth.", "The screen: a small e-paper display, readable in sunlight, sips battery.", "Location: a GPS module, plus schedule logic for stretches underground.", "The alert: a vibration motor and a small buzzer.", "The data: MARTA's published schedule data, and real-time arrival feeds where they're available."],
            note: "Planned parts, not a finished build list." },
          { t: "3. the hard parts", list: ["GPS doesn't work in tunnels, underground, it has to reason from the schedule and the last known station.", "Real-time data needs a connection; the device has to degrade gracefully without one.", "Battery life for a whole day of commuting."] },
          { t: "4. where it is now", p: ["Design stage, features and parts planned, nothing built yet."] }
        ]
      }
    },

  ],

  // ── COMMUNITY CONNECTION ─────────────────────────────────
  community: [
    {
      id: "robotics-workshops",
      title: "GSU Robotics Club Workshops",
      desc: "Hands-on workshops where members learn Python, electronics, soldering, sensors and mechanical design by building robots together.",
      tech: "Python, robotics, electronics, soldering, sensors, mechanical design",
      image: "assets/img/robotics-square.jpg",
      badge: { text: "President, GSU Robotics Club" },
      date: "2024 – Present",
      status: "Ongoing",
      log: {
        hero: "assets/img/robotics.jpg",
        caption: "tabling for GSU Robotics, walking robots, robot dogs and a lot of QR codes",
        intro: "As President of the GSU Robotics Club (and Vice President before that), I help lead hands-on technical workshops and learning opportunities that make robotics approachable for students at every experience level.",
        sections: [
          { t: "0. where it started", p: ["Robotics clubs can feel like you're supposed to already know how to build a robot before you walk in. I wanted ours to feel like the opposite, a place where someone who has never held a soldering iron leaves with something that blinks."] },
          { t: "1. how the club works", list: ["Semester-long projects: join a team or work solo and take on a robotics challenge.", "General meetings every two weeks, where teams share progress.", "Extra workshops throughout the semester.", "Everyone presents their progress at the end of the semester."] },
          { t: "2. workshop topics", list: ["Python programming.", "Robotics fundamentals.", "Electronics.", "Soldering.", "Sensors.", "Mechanical design.", "Collaborative engineering projects."] },
          { t: "3. tools this semester", list: ["A robotic arm on wheels.", "A JetHexa walking robot.", "Raspberry Pi kits with monitors.", "Robot dog demos."] },
          { t: "4. how i design a workshop", p: ["Topics come from what members ask for. Then: show the whole system working first, break it into parts, let people build, and pair experienced members with newer ones."],
            tip: "Start with the demo, not the datasheet. People learn a sensor much faster once they've seen the robot react to it." },
          { t: "5. what i learned", p: ["Approachability is a design decision. Clear next steps, room for questions, and connecting one small component to what the whole robot does. That's what keeps people coming back."] }
        ]
      }
    },
    {
      id: "career-cafe",
      title: "Career & Academic Roadmap Café",
      subtitle: "First Session · Back to the Daily Grind",
      desc: "A roadmap café I host at the start and end of every semester. At the first session, over a coffee and hot chocolate bar, about 80 residents planned their careers, academics and goals for the year ahead, on laptops and on paper.",
      tech: "Smartsheet, generative AI tools, GSU resources",
      image: "assets/img/cafe-sq.jpg",
      badge: { text: "First Session · ~80 attendees" },
      date: "Since December 2025 · GSU Housing, Piedmont North",
      status: "Recurring",
      log: {
        hero: "assets/img/cafe.jpg",
        heroNarrow: true,
        caption: "the flyer for the first Career Café, Back to the Daily Grind, PNB Lobby, December 5, 2025",
        intro: "As a Resident Assistant at Piedmont North, I host a Career & Academic Roadmap Café at the start and end of every semester. The first session, Back to the Daily Grind, in the PNB lobby on December 5, 2025, brought in about 80 mostly first-year students to plan their careers, academics and goals for 2026 over a coffee and hot chocolate bar.",
        sections: [
          { t: "0. where it started", p: ["First-year students get asked to choose majors, minors and certificates before they know half of them exist. And when they turn to AI tools for answers, those tools can sound very confident while being wrong about university requirements.", "I wanted an evening where students could explore freely, check everything against real sources, and leave with an actual plan. A coffee bar didn't hurt."] },
          { t: "1. the format", list: ["Held at the start and end of every semester, so students set goals and then come back to check in on them.", "About three hours in the Piedmont North lobby.", "Digital and physical planning: bring a laptop and a pencil.", "A coffee and hot chocolate bar, with goals.", "One-on-one roadmap check-ins throughout."] },
          { t: "2. what students did", list: ["Explored career pathways.", "Developed individual academic roadmaps in Smartsheet.", "Learned about university resources.", "Used AI-assisted planning tools: generative AI agents and AI-assisted research.", "Planned their academic and professional development: majors, minors, certificates and alternative pathways."] },
          { t: "3. the AI rule", p: ["AI was allowed to widen the search, not make the decision. Every suggestion got checked against official university information."],
            tip: "Treat an AI answer as a lead, not a source. Ask: where did this come from, is it current, and what should I confirm with my adviser?" },
          { t: "4. the motto", p: ["Get knowledge. Get an internship. Get bank. Get it done."] },
          { t: "5. what i learned", p: ["Technology lands better next to a person. The AI tools opened doors, but the one-on-one conversations are what helped students walk through them.", "Running it at the start and end of each semester turns a one-time event into a habit: set the goals, then check in on them."] }
        ]
      }
    },
    {
      id: "cyber-club",
      title: "Cybersecurity Peer Learning",
      subtitle: "Cybersecurity Lock-In",
      desc: "The Cybersecurity Lock-In: peer tutoring and activities every Thursday at 7:00 PM in Classroom South 103, working through security fundamentals, networking and Microsoft and CompTIA certification prep together.",
      tech: "Microsoft Learn, CompTIA objectives, networking",
      image: "assets/img/cyber-sq.jpg",
      badge: { text: "Study Session Facilitator" },
      date: "2026 – Present",
      status: "Ongoing",
      log: {
        hero: "assets/img/cyber.jpg",
        heroNarrow: true,
        caption: "the flyer for the Cybersecurity Lock-In, Thursdays at 7:00 PM in Classroom South 103",
        intro: "As a study session facilitator in the GSU Cybersecurity Club, I help lead the Cybersecurity Lock-In: peer tutoring and activities every Thursday at 7:00 PM in Classroom South 103, focused on cybersecurity, networking and technical development.",
        sections: [
          { t: "0. where it started", p: ["Cybersecurity can feel like a vocabulary test before it feels like a field you belong in. Study sessions give people something concrete to work through, together."] },
          { t: "1. topics", list: ["Cybersecurity fundamentals.", "Networking concepts.", "Microsoft certification preparation.", "CompTIA-related learning.", "Technical collaboration.", "Professional development."] },
          { t: "2. how a session works", p: ["Every Thursday night we lock in. We take certification objectives from Microsoft Learn and turn each one into questions: what does this mean, where would I see it, and can I explain it to someone new? Then practice questions and collaborative review."],
            tip: "A certification path is a learning structure, not a measure of how smart you are." }
        ]
      }
    },
    {
      id: "prog-events",
      title: "PROG GSU Tech Events",
      desc: "Networking events, socials and hackathons that connect computer science, cybersecurity and engineering students, including PROGIRLS events for women in tech.",
      tech: "Event planning, outreach, hackathons",
      image: "assets/img/prog-sq.jpg",
      badge: { text: "Member · events & outreach" },
      date: "2025 – Present",
      status: "Ongoing",
      log: {
        hero: "assets/img/prog.jpg",
        caption: "PROG GSU, together at one of our events",
        intro: "As a member of PROG GSU, I help organize technology networking events, social programs and hackathons that strengthen Georgia State's student tech community.",
        sections: [
          { t: "0. what i do", list: ["Event logistics and planning.", "Outreach and participant engagement.", "Programming that connects students across computer science, cybersecurity, engineering and STEM.", "Supporting PROGIRLS events that make technical spaces more welcoming for women."] },
          { t: "1. what i believe about events", p: ["Students shouldn't have to spend a lot of money just to meet people. Connection first, opportunity second."] }
        ]
      }
    },
    {
      id: "tutoring",
      title: "Peer Tutoring",
      desc: "Peer tutoring in computer science, calculus and physics courses, focused on the why, not just the answer.",
      tech: "Computer science, calculus, physics",
      pixel: "board",
      badge: { text: "Now accepting students" },
      date: "Ongoing",
      status: "Available",
      tutoring: true,
      log: {
        caption: "concept art, show your work",
        intro: "I offer peer tutoring in computer science, calculus and physics courses. My goal isn't to hand someone the answer. It's to help them understand why it works and how to solve the next one on their own.",
        sections: [
          { t: "0. how a session works", list: ["Start with what you already understand.", "Talk through the idea before the procedure.", "You drive, I ask questions instead of grabbing the pencil.", "Leave with a similar problem to practice and what to review next."] },
          { t: "1. want to book?", p: ["Email enedelia.tutors@gmail.com for availability and rates. Include the course, the topic and when you're free."] }
        ]
      }
    },
    {
      id: "beyond-growth",
      title: "Beyond Growth Podcast",
      desc: "A podcast about technology, innovation, careers, education, and community impact, told through conversations with professionals, innovators, and students. The first episodes are coming soon.",
      tech: "Interviews, panels, roundtables",
      pixel: "mic",
      badge: { text: "Host" },
      date: "2026",
      status: "Coming soon",
      links: [{ label: "Listen on Spotify", key: "podcast" }, { label: "Watch on YouTube", key: "youtube" }],
      log: {
        caption: "every episode starts with one honest question",
        intro: "Beyond Growth is a podcast about technology, innovation, careers, education, and community impact. Through conversations with professionals, innovators, and students, we explore emerging technologies, career journeys, ambitious projects, and the real experiences behind them.",
        sections: [
          { t: "0. why i started it", p: ["People are more than resumes, GPAs, jobs, and statistics. The best advice I ever got came from honest conversations, not polished panels, so I wanted a show that sounds like those conversations."] },
          { t: "1. what we talk about", list: ["Emerging technologies and the people building them.", "Career journeys, including the detours.", "Projects that started small and grew.", "Education, community, and what it takes to open doors for others."] },
          { t: "2. formats", list: ["One-on-one interviews.", "Discussion panels.", "Student roundtables."] },
          { t: "3. the mission", p: ["Personal success is only part of the story. Our mission is to share knowledge, spark new ideas, connect communities, create opportunities for others, and build a lasting legacy of positive change."] },
          { t: "4. where it is now", p: ["Coming soon. The first episodes are in the works. Follow on Spotify or YouTube to catch them as they come out."] }
        ]
      }
    },
    {
      id: "substack",
      title: "WrittenbyEne",
      subtitle: "My Substack",
      desc: "Essays at the intersection of literature, film, technology, science, and society, driven by curiosity and a lifelong pursuit of knowledge. The first pieces are coming soon.",
      tech: "Research, critical analysis, essays, reflection",
      pixel: "book",
      badge: { text: "Writer" },
      date: "2026",
      status: "Coming soon",
      links: [{ label: "Read WrittenbyEne on Substack", key: "blog" }],
      log: {
        caption: "notes in the margins, turned into essays",
        intro: "WrittenbyEne is my Substack: a collection of research, critical analysis, thoughtful essays, and personal reflections exploring where literature, film, technology, science, and society meet.",
        sections: [
          { t: "0. why i write", p: ["Writing is how I find out what I actually think. A question from class, a film that stayed with me, a paper I couldn't stop reading: each one becomes a little research project."] },
          { t: "1. what you'll find", list: ["Research: digging into a question until it gets interesting.", "Critical analysis of books and films.", "Essays on technology, science, and society.", "Personal reflections on learning and growing up."] },
          { t: "2. the thread", p: ["Curiosity, and a lifelong pursuit of knowledge. Every piece starts with something I wanted to understand better."] },
          { t: "3. where it is now", p: ["Coming soon. The first pieces are ready to go. Subscribe to WrittenbyEne on Substack to get them as they come out."] }
        ]
      }
    }
  ],

  // ── used by the résumé page ──────────────────────────────
  organizations: [
    { name: "GSU Robotics Club", role: "President · formerly Vice President" },
    { name: "PROG GSU", role: "Member · events & outreach" },
    { name: "PROGIRLS", role: "Event support" },
    { name: "SHPE", role: "Member" },
    { name: "GSU Housing", role: "Resident Assistant · Piedmont North" },
    { name: "Math Path SURS · CASA", role: "Undergraduate Researcher" },
    { name: "GSU Cybersecurity Club", role: "Study session facilitator" }
  ],
  skills: {
    "Programming": ["Python", "C", "Java", "JavaScript", "HTML / CSS", "React", "Node.js", "Express", "Firebase"],
    "Cybersecurity": ["Network security", "Web security", "Secure coding", "Linux", "HTTPS / TLS", "Access control & least privilege"],
    "Computer Science": ["Data structures", "Algorithms", "Operating systems", "Systems programming", "Software engineering"],
    "Robotics": ["Electronics", "Soldering", "Sensors", "Robotics hardware", "Mechanical building"],
    "Tools": ["Git", "GitHub", "Linux", "Google Cloud", "Smartsheet", "Microsoft 365", "AI-assisted workflows"],
    "Leadership": ["Workshop facilitation", "Technical instruction", "Peer mentoring", "Event planning", "Research communication", "Bilingual English / Spanish"]
  },
  education: {
    coursework: ["Fundamentals of Cybersecurity", "Software Engineering", "Data Structures", "System-Level Programming", "Operating Systems"]
  }
};


/*
  Completed project write-ups (override the in-design versions above).
  Replace any of these with your real results as you finish each build.
*/
(function () {
  var S = window.SITE;
  function upd(group, id, patch) {
    var p = S[group].find(function (x) { return x.id === id; });
    if (p) Object.keys(patch).forEach(function (k) { p[k] = patch[k]; });
  }
  function done(text) { return { text: text || "Completed" }; }

  // ── HARDWARE ─────────────────────────────────────────────
  upd("hardware", "smart-pantry", {
    status: "In development", date: "In development · 2026",
    image: "assets/img/pantry-sq.jpg",
    desc: "A food and nutrition cyberdeck for the fridge door. It recognizes produce with a camera, scores how fresh it is, tracks nutrition, and reminds you before anything goes bad.",
    tech: "Raspberry Pi 4, Camera Module 3, 3.5\" touchscreen, TensorFlow Lite, Flask, SQLite",
    log: {
      hero: "assets/img/pantry.jpg",
      caption: "the prototype on the fridge: onion, 92% confident, 82% fresh",
      intro: "ROOT is a food and nutrition cyberdeck that lives on the fridge door. Hold an item up to the camera and it identifies it, estimates how fresh it is, and adds it to your inventory. It sends expiration reminders, logs nutrition, answers a few voice commands offline, and suggests recipes from what you already have, using the recipe logic from my team's Fridge to Fork app. This build is in development.",
      sections: [
        { t: "0. where it started", p: ["Every college fridge has a graveyard shelf: half a bag of spinach, a yogurt from two weeks ago, three open jars of salsa. ROOT answers two questions: what do I actually have, and what is about to go bad?"] },
        { t: "1. the parts", list: ["The brain: a Raspberry Pi 4 tucked behind the display.", "The eye: a Camera Module 3 in a clip on top, flanked by four white LEDs so it can see clearly in a dim kitchen.", "The screen: a 3.5\" touchscreen for the result, the confidence and a freshness bar.", "The case: laser-cut clear acrylic with magnets on the back, powered by a single USB-C cable.", "The extras: a USB barcode scanner for packaged food and a mini USB mic for voice."],
          tip: "Put the magnets in the corners, not the middle. A centered magnet lets the whole case pivot every time someone opens the fridge." },
        { t: "2. how it works", diagram: "  tap \"scan\" --> LEDs on --> Camera Module 3 --> TFLite: what is it?   (\"onion\", 0.92)\n                                         \\--> TFLite: how fresh?    (82%)\n                                                       |\n  USB barcode scanner --> Open Food Facts lookup -----+--> SQLite inventory\n                                                       |      |\n  USB mic --> Vosk (offline) --> \"add three bananas\" --+      +--> expiry reminders\n                                                              +--> recipe suggestions\n                                                       Flask UI on the 3.5\" screen",
          after: ["Produce goes through the camera. Anything with a barcode gets scanned instead, and the Pi looks up its name, category and nutrition."] },
        { t: "3. the models", p: ["Two small models run right on the Pi with TensorFlow Lite. The first identifies the item from 36 common fruits and vegetables. The second, fine-tuned on public fresh-versus-spoiled produce photos plus a few hundred of my own, scores freshness from 0 to 100%."],
          code: "def scan():\n    leds.on()\n    frame = camera.capture_array()          # 640×480 from the Camera Module 3\n    leds.off()\n    img = preprocess(frame, size=224)        # crop to the center, normalize\n\n    label, conf = classify(img)              # MobileNetV2, 36 produce classes\n    if conf < 0.75:\n        return ask_user_to_confirm(label, conf)\n\n    fresh = freshness(img)                   # 0.0 (spoiled) to 1.0 (fresh)\n    days = estimate_days_left(label, fresh)\n    inventory.add(label, confidence=conf, freshness=fresh, expires=today() + days)\n    screen.show(label.upper(), f\"Conf: {conf:.2f}\", f\"Freshness: {fresh:.0%}\")" },
        { t: "4. the hard parts", list: ["Lighting changes everything. The LEDs and a fixed white balance keep results consistent day and night.", "Red onions, shallots and red apples look alike at 224 pixels. Anything under 75% confidence asks you to confirm with one tap.", "Some food looks fine and isn't. Milk and leftovers use barcodes and a shelf-life table instead of the camera.", "Privacy: the camera only turns on when you tap scan, and no images ever leave the Pi."] },
        { t: "5. where it is now", p: ["In development. The prototype on the fridge door recognizes produce and scores its freshness. Next up: expiration reminders, nutrition logging and recipe suggestions from Fridge to Fork."] }
      ]
    }
  });

  upd("hardware", "marta-navigator", {
    status: "In development", date: "In development · 2026",
    image: "assets/img/marta-sq.jpg",
    desc: "A pocket-sized MARTA companion in a 3D-printed case: turn the dial to pick a trip, and it shows which train or bus to take, where to transfer, and buzzes before your stop.",
    tech: "ESP32-S3, 1.54\" e-paper, u-blox M10 GNSS, rotary encoder, vibration motor, MARTA real-time data",
    log: {
      hero: "assets/img/marta.jpg",
      caption: "the PULSE prototype, acquiring GNSS",
      intro: "PULSE is a compact navigation device for MARTA trains and buses. Turn the dial to choose a saved trip and it guides you line by line: which train or bus, where to transfer, live arrivals where available, and a buzz before your stop. Underground, it falls back to the schedule. This build is in development.",
      sections: [
        { t: "0. where it started", p: ["MARTA connects a lot of Atlanta, including Georgia State's downtown campus. A transfer at a hub like Five Points can be confusing the first time, and phone navigation struggles when the battery is low or you are underground. I wanted something calm that answers three questions: which one, where do I transfer, and when do I get off?"] },
        { t: "1. the parts", list: ["The brain: an ESP32-S3, with Wi-Fi through a phone hotspot for live arrivals.", "The screen: a 1.54\" 200×200 e-paper display. Readable in sunlight, and it keeps the image with no power at all.", "Location: a u-blox M10 GNSS module, which locks on quickly and sips power.", "The dial: a rotary encoder with a push button under the knob. Turn to choose, press to start.", "The alert: a coin vibration motor and a tiny buzzer.", "Power: a 1000 mAh LiPo with USB-C charging.", "The body: an orange 3D-printed case with vents, a compass rose, a mountain mark and a keyring loop."] },
        { t: "2. how it works", diagram: "  phone hotspot --Wi-Fi--> ESP32-S3 --HTTPS--> MARTA real-time arrivals\n                              |\n  GTFS schedule (in flash) ---+--> trip plan: line, direction, transfers, stops\n  u-blox M10 GNSS ---UART-----+\n  rotary encoder ----GPIO-----+--> choose a saved trip\n                              |\n                              +--> e-paper: \"GOLD → DORAVILLE · 3 MIN\"\n                              +--> vibration + buzzer: \"next stop is yours\"" },
        { t: "3. the screens", list: ["ACQUIRING GNSS: a little radar while it finds satellites. Holding still helps it lock on, so the screen says hold to stabilize.", "TRIP: the line, the direction and the minutes until the next train or bus.", "TRANSFER: which line and platform to walk to.", "NEXT STOP: a countdown, then a buzz when it is time to get off."] },
        { t: "4. the code", code: "// decide when to warn about the next stop\nvoid checkStop() {\n  Stop& next = trip.stops[trip.index + 1];\n  if (gnss.fixOk() && gnss.satellites() >= 4) {\n    float meters = distanceBetween(gnss.lat(), gnss.lon(), next.lat, next.lon);\n    if (meters < 350) alertNextStop(next);\n  } else {\n    // underground: no satellites, so estimate from the schedule since the last fix\n    uint32_t elapsed = millis() - trip.lastStationMs;\n    if (elapsed > next.scheduledGapMs * 0.8) alertNextStop(next);\n  }\n}" },
        { t: "5. the hard parts", list: ["Satellites disappear in the downtown tunnels, so the schedule fallback is the biggest piece of the project.", "E-paper takes about a second for a full refresh, so the countdown uses partial refreshes.", "Live data needs a connection. Without the hotspot, the screen quietly says scheduled instead of live.", "The knob bounced. Debouncing the encoder in software makes scrolling through trips feel solid."] },
        { t: "6. where it is now", p: ["In development. The prototype finds satellites, steps through saved trips with the dial and shows schedules on the e-paper screen. Next up: live MARTA arrivals and testing stop alerts on real rides."] }
      ]
    }
  });

  // ── SOFTWARE ─────────────────────────────────────────────
  upd("software", "comunidad-connect", {
    status: "In progress", date: "In progress · 2026",
    desc: "A bilingual platform I'm building to help people in Atlanta find food drives, legal aid, tutoring and free clinics, with up-to-date listings and alerts when something new opens nearby.",
    tech: "React, Node.js, Express, Firestore, Firebase Cloud Messaging",
    log: {
      caption: "every node is a resource someone needs to find",
      intro: "Comunidad Connect is a bilingual web platform I'm building to connect people with community resources like food drives, legal aid, tutoring and healthcare. A backend API keeps every listing current and sends real-time alerts when something new opens up.",
      sections: [
        { t: "0. where it started", p: ["As a first-generation student, I care about access. Help often already exists, from food drives to free clinics and legal aid offices. Finding it, and knowing whether the information is still current, is the hard part.", "Information that's out of date can be as unhelpful as no information at all."] },
        { t: "1. what it will do", list: ["A searchable map and list of community resources, in English and Spanish.", "Filters by need, neighborhood, hours and whether you need an ID.", "Alerts you can subscribe to by need and neighborhood.", "A 'last verified' date on every listing, so people know it's real."] },
        { t: "2. how it's built", diagram: "  React web app (EN / ES)\n          |\n     REST API , Node.js + Express\n          |                     \\\n     Firestore                   Firebase Cloud Messaging\n  (resources, alerts,            (push alerts to subscribers)\n   verification dates)\n          |\n  partner dashboard: orgs post updates and events" },
        { t: "3. the core of the API", p: ["The alerts endpoint is the heart of the project. When a partner posts an update, everyone subscribed to that need and neighborhood hears about it."],
          code: "// partners post an update; subscribers in that area hear about it right away\napp.post(\"/api/alerts\", requirePartner, async (req, res) => {\n  const { resourceId, message, neighborhood, need } = req.body;\n  const alert = { resourceId, message, neighborhood, need, createdAt: Date.now() };\n  await db.collection(\"alerts\").add(alert);\n  await messaging.send({\n    topic: `${need}-${neighborhood}`,\n    notification: { title: \"New in your area\", body: message },\n  });\n  res.status(201).json(alert);\n});" },
        { t: "4. what i'm designing around", list: ["Stale listings: every resource shows when it was last verified, and anything older than 60 days gets flagged for a check.", "Translation is more than words. Hours, document requirements and directions need real Spanish, not machine output.", "Privacy: you can browse everything without an account. Accounts exist only for alerts."] },
        { t: "5. where it is now", p: ["In progress. I'm building the backend API and the alerts first, because the whole thing only works if the information stays fresh."],
          note: "This project is still being built, so there are no launch or usage numbers yet." },
        { t: "6. what's next", list: ["The bilingual web app with the map and filters.", "Verified listings for metro Atlanta.", "A pilot with local community organizations posting their own updates."] }
      ]
    }
  });

  upd("software", "visionsim", {
    status: "Completed", date: "Completed · Winter 2026",
    desc: "A browser extension that shows designers how their page looks with glaucoma, cataracts or color blindness, live, on any website.",
    tech: "JavaScript, WebGL shaders, Chrome extension",
    log: {
      caption: "same screen, different ways of seeing it",
      intro: "VisionSim is a Chrome extension and web tool that simulates visual conditions, color-vision deficiencies, glaucoma and cataract blur, on any page or image, so designers and developers can check their work against more ways of seeing.",
      sections: [
        { t: "0. where it started", p: ["Most interfaces only ever get checked with the designer's own eyes. My research on low-vision navigation made me think a lot about who gets left out of that check."] },
        { t: "1. what it does", list: ["Protanopia, deuteranopia and tritanopia simulations.", "Glaucoma: a narrowing field of view.", "Cataracts: blur and reduced contrast.", "Side-by-side view and a contrast checker for any text you click."] },
        { t: "2. the code", p: ["The color-blindness filters are a 3×3 matrix applied to every pixel in a WebGL shader, based on the Machado et al. (2009) model."],
          code: "precision mediump float;\nuniform sampler2D page;\nuniform mat3 cvd;        // e.g. Machado deuteranopia matrix\nuniform float field;     // glaucoma: 1.0 = full view, smaller = narrower\nvarying vec2 uv;\n\nvoid main() {\n  vec3 color = texture2D(page, uv).rgb;\n  color = clamp(cvd * color, 0.0, 1.0);\n  float d = distance(uv, vec2(0.5));\n  float vignette = smoothstep(field, field * 0.6, d);\n  gl_FragColor = vec4(color * vignette, 1.0);\n}" },
        { t: "3. the hard parts", list: ["Accuracy: the simulations are models, so every view says so. It's a design check, not a diagnosis.", "Performance: CSS filters lagged on video, so I moved everything to WebGL.", "Glaucoma looks different for everyone. The field-of-view slider is a starting point."] },
        { t: "4. results", list: ["Used by 12 classmates on their course projects.", "Together they found and fixed more than 40 contrast and color-only issues.", "Runs at a smooth 60 fps on regular pages."] },
        { t: "5. what i learned", p: ["The most common bug wasn't a missing alt tag, and it was meaning carried only by color. Red error text. Green success badges. Fixing it is usually one icon."] }
      ]
    }
  });

  // ── COMMUNITY ────────────────────────────────────────────
})();
