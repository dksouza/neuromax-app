/**
 * Neuromax App Logic
 * 
 * IMPORTANT: To change the PDF URLs, update the `pdfUrl` property 
 * in the `modulesData` array below. Use valid URLs pointing to your PDF files.
 */

const modulesData = [
    {
        id: 1,
        title: "Module 1 — Understanding What Is Happening Inside Your Brain",
        embedUrl: "https://neuromax-f12asrb.gamma.site/"
    },
    {
        id: 2,
        title: "BONUS 1",
        embedUrl: "https://brainfog-reset-go57ud6.gamma.site/"
    },
    {
        id: 3,
        title: "BONUS 2",
        embedUrl: "https://natural-biohacking-guide-tkrpdnw.gamma.site/"
    }
];

const appContainer = document.getElementById('app');

function render() {
    const hash = window.location.hash || '#/login';
    const isEntered = localStorage.getItem('neuromax_entered') === 'true';

    // Route guards
    if (!isEntered && hash !== '#/login') {
        window.location.hash = '#/login';
        return;
    }

    if (isEntered && hash === '#/login') {
        window.location.hash = '#/home';
        return;
    }

    appContainer.innerHTML = '';
    document.body.classList.remove('module-view-active');

    if (hash === '#/login') {
        renderLogin();
    } else if (hash === '#/home') {
        renderHome();
    } else if (hash.startsWith('#/module/')) {
        const id = parseInt(hash.split('/')[2], 10);
        document.body.classList.add('module-view-active');
        renderModule(id);
    } else {
        // Fallback route
        window.location.hash = isEntered ? '#/home' : '#/login';
    }
}

function renderLogin() {
    const html = `
        <div class="login-container">
            <div class="login-card">
                <h1>Neuromax</h1>
                <p>Welcome. Tap Enter to access your Neuromax program.</p>
                <button id="enter-btn" class="btn">Enter</button>
            </div>
        </div>
    `;
    appContainer.innerHTML = html;

    document.getElementById('enter-btn').addEventListener('click', () => {
        localStorage.setItem('neuromax_entered', 'true');
        window.location.hash = '#/home';
        window.scrollTo(0, 0);
    });
}

function renderHome() {
    let cardsHtml = '';
    modulesData.forEach(mod => {
        cardsHtml += `
            <div class="module-card">
                <h3>${mod.title}</h3>
                <a href="#/module/${mod.id}" class="btn">Open</a>
            </div>
        `;
    });

    const html = `
        <div class="home-header">
            <div class="home-header-top">
                <h1>Neuromax</h1>
                <button id="logout-btn" class="btn-logout">Logout</button>
            </div>
            <h2>Your Modules</h2>
        </div>
        <div class="module-list">
            ${cardsHtml}
        </div>
    `;
    appContainer.innerHTML = html;

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('neuromax_entered');
        window.location.hash = '#/login';
        window.scrollTo(0, 0);
    });
}

function renderModule(id) {
    const mod = modulesData.find(m => m.id === id);
    if (!mod) {
        window.location.hash = '#/home';
        return;
    }

    const html = `
        <div class="module-view-header">
            <a href="#/home" class="btn btn-back">Back</a>
        </div>
        <div class="pdf-container">
            <iframe src="${mod.embedUrl}" title="${mod.title}"></iframe>
        </div>
    `;
    appContainer.innerHTML = html;
}

// Initializing the application route handler
window.addEventListener('hashchange', () => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    render();
});

// Initial render
render();
