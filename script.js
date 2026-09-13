// Main page elements used by the desktop interface.
const windowsRoot = document.getElementById('windows');
const taskRoot = document.getElementById('taskButtons');
const startMenu = document.getElementById('startMenu');
const startButton = document.getElementById('startButton');
const clock = document.getElementById('clock');
const music = document.getElementById('siteMusic');
const egg = document.getElementById('easterEgg');
const eggImage = document.getElementById('eggImage');
const eggSound = document.getElementById('eggSound');
const errorSound = document.getElementById('errorSound');
const musicStatus = document.getElementById('musicStatus');
const volumeButton = document.getElementById('volumeButton');
const volumePopup = document.getElementById('volumePopup');
const volumeSlider = document.getElementById('volumeSlider');
const trashIcon = document.getElementById('trashIcon');
const closeStart = document.getElementById('closeStart');

// Window position and stacking state.
let z = 10;
let offset = 0;
const openWindows = new Map();

// Media sections and cards. Add, remove, or edit entries here.
const mediaSections = [
    {
        title: 'Images',
        cards: [
            { image: 'assets/media_assets/media_images/doggiepog.png', alt: 'Doggiepog image', title: 'Doggie Pog', description: 'Before his stage of grief...' },
            { image: 'assets/media_assets/media_images/kingvoncute.png', alt: 'Kingvoncute image', title: 'King Vonny', description: 'Wouldnt hurt a fly...' },
            { image: 'assets/media_assets/media_images/semaroblox.png', alt: 'Semaroblox image', title: 'Semaroblox', description: 'He took me down to his roblox house.' }
        ]
    },
    {
        title: 'Videos',
        cards: [
            { type: 'video', image: 'assets/media_assets/media_video_thumbnails/ex_to_ai.jpg', alt: 'extoai', title: 'Turning my ex girlfriend into an AI because I miss her...', description: 'healthest IT guy, is this what ill become? :sob:', url: 'https://www.youtube.com/watch?v=9Hqv09cffzA'}
        ]
    },
];

// Turn one media card object into HTML.
function renderMediaCard(card) {
    const visual = card.video
        ? `<video controls poster="${card.image || ''}"><source src="${card.video}" type="video/mp4">Your browser does not support video playback.</video>`
        : card.image
            ? `<img src="${card.image}" alt="${card.alt}">`
        : `<span class="media-emoji">${card.emoji}</span>`;
    const linkedContent = card.url
        ? `<a class="media-link" href="${card.url}" target="_blank" rel="noopener noreferrer">${visual}<b>${card.title}</b></a>`
        : `${visual}<b>${card.title}</b>`;
    const cardClass = card.type === 'video' ? ' media-card video-card' : ' media-card';
    return `<article class="${cardClass.trim()}">${linkedContent}<small>${card.description}</small></article>`;
}

// Build the complete Media page from the mediaSections data above.
function renderMediaPage() {
    const sections = mediaSections.map(section => `<section class="media-section"><h2>${section.title}</h2><div class="media-grid">${section.cards.map(renderMediaCard).join('')}</div></section>`).join('');
    return `<h1>Media</h1><p>A place for videos, screenshots, clips, whatever I decide to put here for the LARP.</p>${sections}`;
}

// Projects list. Add or remove projects by editing this array.
const projects = [
    { name: 'Plasma', description: 'MP4 Hosting Site', url: 'https://github.com/shanzofr/PLASMA' },
    { name: 'Digital_Declutter', description: 'Script for windows, linux, mac that clears browser cache, history, temp files, trash and recent files', url: 'https://github.com/shanzofr/Digital_Declutter' },
    { name: 'Shanes Casino', description: 'Cool C++ Casino', url: 'https://github.com/shanzofr/Shanes-Casino' },
    { name: 'Portfolio', description: 'Check the source code out, im all for people making an advanced version of this site that i can use lol', url: 'https://github.com/shanzofr/shanzofr.github.io'}
];

// Build the Projects page from the projects array above.
function renderProjectsPage() {
    const projectCards = projects.map(project => {
        const name = project.url
            ? `<a class="project-link" href="${project.url}" target="_blank" rel="noopener">${project.name}</a>`
            : `<span class="project-name">${project.name}</span>`;
        return `<div class="mini-folder"><img class="project-folder-icon" src="assets/icons/folder.png" alt=""><br>${name}<br><small>${project.description}</small></div>`;
    }).join('');
    return `<h1>My Projects</h1><p>Double-click your way through the projects I've been messing with. (im not sure if they still work, cant be asked to fix them)</p><div class="folder-row">${projectCards}</div>`;
}

// Editable content for the About Me page.
const aboutContent = {
    title: "Hey, I'm Shanzo.",
    intro: 'I am an 18 year old guy who loves tech and coding.',
    sections: [
        {
            title: 'About Me',
            paragraphs: [
                "I am a mix YouTuber and Streamer but I love to code stuff when im bored so i made this portfolio to show off my skills and projects.",
                'In this portfolio, i coudlnt decide on a style so i just thought to make a Windows XP style portfolio because i love the nostalgia of it and it looks cool.',
                'I am a beginner in coding and i am still learning so please be kind to me if you find any bugs or issues with this portfolio.',
                'In the projects section, you will find some of my projects that i have made and some of them are still in progress so please be patient with me, or they are just terrible.'
            ]
            
        },
        {
            title: 'Hobbies',
            items: [
                'Coding & programming',
                'Gaming (PC mainly)',
                'Anime & manga (Attack On Titan best anime oat)',
                'Streaming & content creation',
                'Listening to music, especially Juice WRLD',
                'Mountain Biking'
            ]
        },
        {
            title: 'Currently',
            items: [
                'Studying Computing',
                'Learning coding & cybersecurity',
                'Learning Japanese'
            ]
        }
    ]
};

// Editable content for the Skills page.
const skillsContent = {
    title: 'Skills',
    intro: 'Here are some of the skills I have acquired over time, both in computing and other areas. I will update this list if Im confident ive learned something or learning something new.',
    sections: [
        {
            title: 'Computing',
            items: [
                'HTML / CSS / JavaScript (frontend mainly)',
                'Python',
                'Linux',
                'Networking fundamentals',
                'Cybersecurity (still learning)',
                'Game development (side hobby)'
            ]
        },
        {
            title: 'Other Stuff',
            items: [
                'Video editing & content creation',
                'Streaming (time to time)',
                'Photography / visual design (kinda good at it)'
            ]
        }
    ]
};

// Editable content for the Contact page.
const contactContent = {
    title: 'Contact Me',
    intro: "Want to talk, collaborate, or just say what's up?",
    sections: [
        {
            title: 'Find me online',
            items: [
                'YouTube — https://www.youtube.com/@shanzofr',
                'GitHub — https://github.com/shanzofr',
                'Discord — https://discord.gg/QjwnJZnwBv',
                'Fluxer — https://fluxer.gg/2Kxotneu',
                'Tiktok — https://www.tiktok.com/@ShaneYlad'
            ],
        }
    ]
};

// Shared renderer for pages made from headings, paragraphs, and lists.
function renderInfoPage(content) {
    const intro = content.intro ? `<p>${content.intro}</p>` : '';
    const sections = content.sections.map(section => {
        const paragraphs = (section.paragraphs || []).map(paragraph => `<p>${paragraph}</p>`).join('');
        const items = section.items ? `<ul>${section.items.map(item => {
            const linkMatch = item.match(/^(.*?) — (https?:\/\/\S+)$/);
            if (!linkMatch) return `<li>${item}</li>`;
            return `<li>${linkMatch[1]} — <a class="info-link" href="${linkMatch[2]}" target="_blank" rel="noopener noreferrer"><b>${linkMatch[2]}</b></a></li>`;
        }).join('')}</ul>` : '';
        const note = section.note ? `<p><small>${section.note}</small></p>` : '';
        return `<h2>${section.title}</h2>${paragraphs}${items}${note}`;
    }).join('');
    return `<h1>${content.title}</h1>${intro}${sections}`;
}

// Page definitions used when opening desktop windows.
const pages = {
    about: {
        title: 'About Me - My Computer',
        icon: 'assets/icons/folder.png',
        html: renderInfoPage(aboutContent)
    },
    projects: {
        title: 'Projects',
        icon: 'assets/icons/folder.png',
        html: renderProjectsPage()
    },
    skills: {
        title: 'Skills',
        icon: 'assets/icons/folder.png',
        html: renderInfoPage(skillsContent)
    },
    contact: {
        title: 'Contact',
        icon: 'assets/icons/folder.png',
        html: renderInfoPage(contactContent)
    },
    media: {
        title: 'Media',
        icon: 'assets/icons/folder.png',
        html: renderMediaPage()
    }
};

// Bring a window to the front and mark its taskbar button as active.
function bring(w) {
    w.style.zIndex = ++z;
    document.querySelectorAll('.task-button').forEach(b => b.classList.toggle('active', b.dataset.id === w.dataset.id));
}

// Create a window the first time it is opened, or restore an existing one.
function openWindow(id) {
    if (openWindows.has(id)) {
        const w = openWindows.get(id);
        w.classList.remove('hidden');
        bring(w);
        return;
    }
    const p = pages[id];
    const w = document.createElement('section');
    w.className = 'window';
    w.dataset.id = id;
    w.style.left = `${120+(offset%5)*28}px`;
    w.style.top = `${55+(offset%5)*28}px`;
    offset++;
    w.innerHTML = `<div class="titlebar"><span class="title"><img class="title-icon" src="${p.icon}" alt=""> ${p.title}</span><div class="win-controls"><button data-act="min">_</button><button data-act="max">□</button><button data-act="close">×</button></div></div><div class="window-content">${p.html}</div>`;
    windowsRoot.appendChild(w);
    openWindows.set(id, w);
    makeDraggable(w, w.querySelector('.titlebar'));
    w.addEventListener('mousedown', () => bring(w));
    w.querySelector('[data-act="close"]').onclick = () => closeWindow(id);
    w.querySelector('[data-act="min"]').onclick = () => {
        w.classList.add('hidden');
    };
    w.querySelector('[data-act="max"]').onclick = () => {
        w.classList.toggle('maximized');
        if (w.classList.contains('maximized')) {
            w.dataset.old = JSON.stringify({
                left: w.style.left,
                top: w.style.top,
                width: w.style.width,
                height: w.style.height
            });
            Object.assign(w.style, {
                left: '8px',
                top: '8px',
                width: 'calc(100vw - 16px)',
                height: 'calc(100vh - 54px)'
            });
        } else {
            const o = JSON.parse(w.dataset.old);
            Object.assign(w.style, o)
        }
    };
    const task = document.createElement('button');
    task.className = 'task-button active';
    task.dataset.id = id;
    task.textContent = p.title;
    task.onclick = () => {
        if (w.classList.contains('hidden')) w.classList.remove('hidden');
        bring(w)
    };
    taskRoot.appendChild(task);
    bring(w);
}

// Remove a window and its taskbar button.
function closeWindow(id) {
    const w = openWindows.get(id);
    if (!w) return;
    w.remove();
    openWindows.delete(id);
    taskRoot.querySelector(`[data-id="${id}"]`)?.remove();
}

// Add mouse dragging behavior to a window title bar.
function makeDraggable(w, bar) {
    let drag = false;
    let dx = 0;
    let dy = 0;
    bar.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return;
        drag = true;
        bring(w);
        dx = e.clientX - w.offsetLeft;
        dy = e.clientY - w.offsetTop;
        document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', e => {
        if (!drag || w.classList.contains('maximized')) return;
        w.style.left = Math.max(0, Math.min(innerWidth - w.offsetWidth, e.clientX - dx)) + 'px';
        w.style.top = Math.max(0, Math.min(innerHeight - 80, e.clientY - dy)) + 'px';
    });
    window.addEventListener('mouseup', () => {
        drag = false;
        document.body.style.userSelect = '';
    });
}

// Open desktop icons with a single click or tap.
const desktopWindowButtons = document.querySelectorAll('.desktop-icons [data-window]');
desktopWindowButtons.forEach(el => {
    el.addEventListener('click', () => openWindow(el.dataset.window));
});

// Open Start menu items with a single click.
document.querySelectorAll('.start-left [data-window]').forEach(el => el.addEventListener('click', () => {
    openWindow(el.dataset.window);
    startMenu.classList.add('hidden')
}));

// Start menu visibility and outside-click behavior.
startButton.onclick = () => startMenu.classList.toggle('hidden');
closeStart.onclick = () => startMenu.classList.add('hidden');
document.addEventListener('mousedown', e => {
    if (!startMenu.contains(e.target) && e.target !== startButton) startMenu.classList.add('hidden');
    if (!volumePopup.contains(e.target) && e.target !== volumeButton) {
        volumePopup.classList.add('hidden');
        volumeButton.setAttribute('aria-expanded', 'false');
    }
});

// Keep the taskbar clock up to date.
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function updateClock() {
    const localTime = new Date();
    clock.textContent = localTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: userTimeZone
    });
}
updateClock();
setInterval(updateClock, 1000);

// Music playback state and controls.
let musicOn = true;

function updateMusicUI() {
    const iconPath = musicOn && music.volume > 0 ? 'assets/icons/music.png' : 'assets/icons/music-off.png';
    musicStatus.src = iconPath;
    musicStatus.alt = musicOn ? 'Music on' : 'Music off';
}

// Control music volume from the taskbar popup.
function updateVolume() {
    music.volume = Number(volumeSlider.value) / 100;
    updateMusicUI();
}

volumeButton.onclick = event => {
    event.stopPropagation();
    volumePopup.classList.toggle('hidden');
    volumeButton.setAttribute('aria-expanded', String(!volumePopup.classList.contains('hidden')));
};
volumeSlider.oninput = updateVolume;
music.volume = Number(volumeSlider.value) / 100;

// Try to start music and retry after the first user interaction if autoplay is blocked.
function playMusic() {
    if (!musicOn) return;
    music.play().catch(() => {
        document.addEventListener('pointerdown', retryMusic, { once: true });
        document.addEventListener('keydown', retryMusic, { once: true });
        document.addEventListener('click', retryMusic, { once: true });
    });
}

// Retry playback after a click or key press allows audio.
function retryMusic() {
    if (musicOn) music.play().catch(() => {});
}

updateMusicUI();
music.addEventListener('canplay', playMusic, { once: true });
playMusic();

// Show the Easter egg image and play its sound.
function showEasterEgg() {
    eggImage.src = 'assets/easter-egg.png';
    egg.classList.remove('hidden');
    eggSound.currentTime = 0;
    eggSound.play().catch(() => {});
    setTimeout(() => egg.classList.add('hidden'), 2000);
}

// Play the Windows error sound for Start menu utility items.
function playErrorSound() {
    errorSound.pause();
    errorSound.currentTime = 0;
    errorSound.play().catch(() => {});
}

// Add sound and Easter egg actions to the Start menu utility items.
document.querySelectorAll('[data-start-action]').forEach(item => {
    item.addEventListener('click', event => {
        event.stopPropagation();
        if (item.dataset.startAction === 'easter-egg') {
            showEasterEgg();
        } else {
            playErrorSound();
        }
    });
});

// Support both single-click and double-click on the Recycle Bin.
trashIcon.addEventListener('dblclick', showEasterEgg);
trashIcon.addEventListener('click', e => {
    if (e.detail === 1) setTimeout(() => {
        if (e.detail === 1) showEasterEgg();
    }, 180);
});