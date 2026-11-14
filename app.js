const main = document.querySelector('#mainContent');
const nav = document.querySelector('#mainNav');
const toast = document.querySelector('#toast');
let toastTimer;
let activeTrack = 'Unfold';
let isPlaying = false;

const videos = [
  { title: 'The little studio making big sounds', creator: 'Milo June', views: '24K views · 2 days ago', initials: 'M', art: 'art-1', duration: '12:34' },
  { title: 'A slow morning in the mountains', creator: 'North Frame', views: '81K views · 4 days ago', initials: 'N', art: 'art-2', duration: '08:22' },
  { title: 'Building a creative routine that lasts', creator: 'Ari Stone', views: '16K views · 1 day ago', initials: 'A', art: 'art-3', duration: '18:09' },
  { title: 'Color grading: warm film look in 5 minutes', creator: 'Kite Studio', views: '53K views · 6 days ago', initials: 'K', art: 'art-4', duration: '05:18' }
];
const tracks = [
  { title: 'Unfold', artist: 'Nova Bloom', time: '3:18' },
  { title: 'Velvet Sky', artist: 'Echo Harbor', time: '4:05' },
  { title: 'Soft Focus', artist: 'Milo June', time: '2:44' },
  { title: 'Golden Hour', artist: 'Sunline', time: '3:51' },
  { title: 'Blue Again', artist: 'Nova Bloom', time: '3:27' }
];
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function videoCards(items = videos) {
  return items.map((video, index) => `<article class="video-card"><a href="#watch-${index}" class="media-art ${video.art}" aria-label="Play ${video.title}"><span class="play-art">▶</span><span class="duration">${video.duration}</span></a><div class="video-meta"><div class="creator-icon ${index % 2 ? 'violet' : ''}">${video.initials}</div><div><h3>${video.title}</h3><p>${video.creator} · ${video.views}</p></div></div></article>`).join('');
}
function liveCards() {
  const live = [
    ['Lo-fi desk radio — take a breath', 'Milo June', '2.4K watching', 'art-1', 'M'],
    ['Songs from the small hours', 'Aria Wave', '980 watching', 'art-3', 'A'],
    ['Making a short film together', 'North Frame', '1.7K watching', 'art-2', 'N'],
    ['Late night game club', 'Pixel Run', '640 watching', 'art-4', 'P']
  ];
  return live.map(([title, creator, viewers, art, initial], i) => `<article class="live-card ${i === 0 ? 'live-large' : ''}"><a href="#live-${i}" class="media-art ${art}" aria-label="Open ${title}"><span class="live-tag">● Live</span><span class="play-art">▶</span></a><div class="live-meta"><div><h3>${title}</h3><p><span class="creator-icon ${i % 2 ? 'violet' : ''}" style="display:inline-grid;width:19px;height:19px;font-size:8px;vertical-align:middle;margin-right:4px">${initial}</span>${creator} · ${viewers}</p></div><button class="button button-secondary button-small" data-action="join">Join</button></div></article>`).join('');
}
function trackRows() {
  return tracks.map((track, i) => `<div class="track"><button class="track-play" data-track="${track.title}" aria-label="Play ${track.title}">${activeTrack === track.title && isPlaying ? 'Ⅱ' : '▶'}</button><div><span class="track-title">${track.title}</span><span class="track-artist">${track.artist}</span></div><span class="track-artist">${track.artist}</span><span class="track-time">${track.time}</span></div>`).join('');
}
function player() {
  return `<div class="player-bar"><div class="player-cover"></div><div class="player-track"><strong>${activeTrack}</strong><span>${tracks.find(t => t.title === activeTrack)?.artist || 'Corecast artist'}</span></div><div class="player-controls"><button aria-label="Previous track" data-action="prev">|◀</button><button class="main-play" aria-label="${isPlaying ? 'Pause' : 'Play'}" data-action="toggle-play">${isPlaying ? 'Ⅱ' : '▶'}</button><button aria-label="Next track" data-action="next">▶|</button></div><span class="player-time">1:12</span><div class="player-progress"><span></span></div><button class="icon-button" aria-label="Like song" data-action="like-track">♡</button></div>`;
}
function homePage() {
  return `<div class="content"><section class="hero"><div class="hero-copy"><span class="eyebrow">A home for your kind of thing</span><h1>Find your next favorite.</h1><p>Videos worth your time, music on repeat, live moments and communities that feel like yours.</p><div class="hero-buttons"><a class="button button-primary" href="#music">Explore music <span>↗</span></a><a class="button button-secondary" href="#upload">Share something</a></div><div class="hero-foot"><span><strong>Video</strong> Watch & discover</span><span><strong>Music</strong> Find a new sound</span><span><strong>Community</strong> Join the conversation</span></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="orb orb-three"></div><div class="art-card"><small>Featured release · 2025</small><strong>Somewhere, slowly</strong></div><div class="art-overlay"><b>Nova Bloom</b><span>New sounds for late nights</span></div></div></section><section class="section"><div class="section-heading"><div><span class="section-label">Hand-picked for you</span><h2>Videos to get into</h2></div><a class="text-link" href="#search">Explore all ↗</a></div><div class="video-grid">${videoCards()}</div></section><section class="section"><div class="section-heading"><div><span class="section-label">Happening now</span><h2>Live on Corecast</h2></div><a class="text-link" href="#live">All live streams ↗</a></div><div class="live-grid">${liveCards().split('</article>').slice(0, 3).map((s, i) => s + (i < 2 ? '</article>' : '')).join('')}</div></section><section class="section"><div class="section-heading"><div><span class="section-label">On the community board</span><h2>Notes from creators</h2></div><a class="text-link" href="#posts">See all posts ↗</a></div><div class="post-card"><div class="post-author"><div class="creator-icon pink">J</div><div><strong>Jules Mint</strong><span>@julesmint · 2 hours ago</span></div></div><div class="post-text">Just finished the first track for my little bedroom album. It took a while to get here, but it finally sounds like the feeling I had in my head. What are you making this week? ✨</div><div class="post-actions"><button data-action="like-post">♡ Like</button><button data-action="comment">▢ Comment</button><button data-action="share">↗ Share</button></div></div></section></div>`;
}
function livePage() {
  return `<div class="content"><div class="page-head"><div><span class="section-label">Live</span><h1 class="page-title">Here, right now.</h1><p class="page-lead">Drop into a live room and see what creators are making together.</p></div><a class="button button-primary" href="#upload">＋ Go live</a></div><div class="category-row"><button class="category-chip active">For you</button><button class="category-chip">Music</button><button class="category-chip">Art & making</button><button class="category-chip">Games</button><button class="category-chip">Just chatting</button></div><div class="live-grid">${liveCards()}</div><div class="upload-note"><strong>Preview only:</strong> Streams shown here are sample cards. Real livestreaming needs a streaming provider and backend and is not simulated.</div></div>`;
}
function musicPage() {
  return `<div class="content"><section class="music-feature"><div class="music-feature-copy"><span class="section-label">Corecast Music</span><h1>Good music.<br>Good company.</h1><p>Find independent artists, fresh releases and songs you’ll want to play again.</p><div class="hero-buttons"><button class="button button-primary" data-action="toggle-play">▶ Start listening</button><button class="button button-secondary" data-action="shuffle">⤨ Shuffle</button></div></div><div class="album-wall" aria-label="Featured album art"><div class="album album-a"><strong>Soft Focus</strong><span>Milo June</span></div><div class="album album-b"><strong>Green Light</strong><span>Nova Bloom</span></div><div class="album album-c"><strong>Somewhere</strong><span>Echo Harbor</span></div></div></section><section class="section"><div class="section-heading"><div><span class="section-label">Fresh from artists</span><h2>New and noteworthy</h2></div><a class="text-link" href="#upload">Upload your music ↗</a></div><div class="track-list">${trackRows()}</div></section><section class="section"><div class="section-heading"><div><span class="section-label">Made for the moment</span><h2>Play it your way</h2></div></div><div class="video-grid"><article class="release-card"><div class="media-art art-1"><span class="play-art">♫</span></div><div class="video-meta"><div><h3>Quiet mornings</h3><p>Easy listening · 18 tracks</p></div></div></article><article class="release-card"><div class="media-art art-2"><span class="play-art">♫</span></div><div class="video-meta"><div><h3>Indie after dark</h3><p>Independent voices · 24 tracks</p></div></div></article><article class="release-card"><div class="media-art art-3"><span class="play-art">♫</span></div><div class="video-meta"><div><h3>New perspective</h3><p>Fresh releases · 12 tracks</p></div></div></article><article class="release-card"><div class="media-art art-4"><span class="play-art">♫</span></div><div class="video-meta"><div><h3>Made by you</h3><p>Community picks · 20 tracks</p></div></div></article></div></section></div>${player()}`;
}
function shortsPage() {
  const shorts = [['A tiny loop for your afternoon', 'Nova Bloom', 'art-1'], ['One-minute sketchbook tour', 'Kite Studio', 'v2'], ['This beat started with a kettle', 'Milo June', 'v3']];
  return `<div class="content"><div class="page-head"><div><span class="section-label">Shorts</span><h1 class="page-title">Little things. Big energy.</h1><p class="page-lead">Quick creations from people making things they love.</p></div><a class="button button-primary" href="#upload">＋ Make a short</a></div><div class="shorts-feed">${shorts.map(([title, creator, art], i) => `<article class="short-card"><div class="short-video ${art}"><div class="short-overlay"><div class="short-caption"><strong>${creator}</strong><br>${title}</div><div class="short-actions"><button data-action="like-short" aria-label="Like short">♡</button><span>1.2k</span><button data-action="comment" aria-label="Comment">▢</button><span>84</span><button data-action="share" aria-label="Share">↗</button></div></div></div><div class="short-meta"><div class="creator-icon ${i === 1 ? 'violet' : ''}">${creator[0]}</div><div><strong>${title}</strong><p>@${creator.replace(' ', '')} · ${i + 2} days ago</p></div></div></article>`).join('')}</div><div class="upload-note"><strong>Heads up:</strong> These are sample cards. Shorts playback and publishing will be connected after media hosting is set up.</div></div>`;
}
function postsPage() {
  return `<div class="content"><div class="page-head"><div><span class="section-label">Community</span><h1 class="page-title">A place to say something.</h1><p class="page-lead">Updates, works-in-progress, questions and little wins from creators.</p></div></div><div class="post-layout"><div><form class="composer" id="postForm"><div class="composer-top"><div class="avatar-button">S</div><textarea name="post" placeholder="What would you like to share?" aria-label="Write a post" required maxlength="500"></textarea></div><div class="composer-actions"><span>✦ Keep it kind. Keep it yours.</span><button class="button button-primary button-small" type="submit">Post</button></div></form><article class="post-card"><div class="post-author"><div class="creator-icon pink">J</div><div><strong>Jules Mint</strong><span>@julesmint · 2 hours ago</span></div></div><div class="post-text">Just finished the first track for my little bedroom album. It took a while to get here, but it finally sounds like the feeling I had in my head. What are you making this week? ✨</div><div class="post-art">♫</div><div class="post-actions"><button data-action="like-post">♡ Like <span>128</span></button><button data-action="comment">▢ Comment</button><button data-action="share">↗ Share</button></div></article><article class="post-card"><div class="post-author"><div class="creator-icon blue">N</div><div><strong>North Frame</strong><span>@northframe · 5 hours ago</span></div></div><div class="post-text">We’re planning our next community film night. What should we watch together? Drop your favorite independent film below 🎬</div><div class="post-actions"><button data-action="like-post">♡ Like <span>86</span></button><button data-action="comment">▢ Comment</button><button data-action="share">↗ Share</button></div></article></div><aside class="post-sidebar"><div class="sidebar-card"><h3>On the radar</h3><div class="trend"><span>CREATORS · THIS WEEK</span><strong>#BedroomSessions</strong></div><div class="trend"><span>MUSIC · NEW RELEASES</span><strong>#FreshFinds</strong></div><div class="trend"><span>COMMUNITY · TODAY</span><strong>#MakeSomething</strong></div></div><div class="sidebar-card"><h3>Community promise</h3><p class="page-lead" style="font-size:12px;margin:0">Be curious, give credit, and make room for each other. Corecast is better when everyone feels welcome.</p></div></aside></div></div>`;
}
function uploadPage() {
  const options = [['▣','Video','Long-form videos, descriptions and thumbnails.'],['▤','Shorts','Quick vertical videos for the Shorts feed.'],['◉','Go live','Set up a live room for your community.'],['✎','Post','Share a note, image or poll with followers.'],['♫','Music','Publish your music as a simple track or release.']];
  return `<div class="content"><div class="page-head"><div><span class="section-label">Creator studio</span><h1 class="page-title">Make something. Share it.</h1><p class="page-lead">Choose a simple starting point. You can shape your channel as you go.</p></div></div><div class="upload-grid">${options.map(([icon, title, description]) => `<button class="upload-option" data-upload="${title}"><span class="upload-icon">${icon}</span><h3>${title === 'Go live' ? title : `Create ${title.toLowerCase()}`}</h3><p>${description}</p></button>`).join('')}</div><div class="upload-note"><strong>Free preview:</strong> This website is currently a static frontend. Your media and posts are not uploaded or saved to a server. Real accounts, secure sign-in, storage and live streaming need backend services; don’t enter personal or sensitive information here.</div></div>`;
}
function searchPage(query) {
  const q = query.toLowerCase();
  const matched = videos.filter(v => `${v.title} ${v.creator}`.toLowerCase().includes(q));
  return `<div class="content"><span class="section-label">Search</span><h1 class="page-title">Results for “${escapeHtml(query)}”</h1><div class="category-row"><button class="category-chip active">All</button><button class="category-chip">Videos</button><button class="category-chip">Creators</button><button class="category-chip">Music</button><button class="category-chip">Posts</button><button class="category-chip">Live</button></div>${matched.length ? `<div class="video-grid">${videoCards(matched)}</div>` : `<div class="empty-search">No sample results found. Try “music”, “studio”, “Milo” or “film”.</div>`}</div>`;
}
function escapeHtml(text) { return text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function render() {
  const hash = location.hash.slice(1) || 'home';
  const query = hash.startsWith('search/') ? decodeURIComponent(hash.slice(7)) : '';
  const page = query ? 'search' : (hash.split('/')[0] || 'home');
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === page));
  const pages = {home: homePage, live: livePage, music: musicPage, shorts: shortsPage, posts: postsPage, upload: uploadPage, search: () => searchPage(query)};
  main.innerHTML = (pages[page] || homePage)();
  document.title = `${page === 'home' ? 'Discover' : page[0].toUpperCase() + page.slice(1)} — Corecast`;
}
window.addEventListener('hashchange', render);
render();

document.querySelector('#mobileMenu').addEventListener('click', event => {
  const expanded = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', expanded);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) { nav.classList.remove('open'); document.querySelector('#mobileMenu').setAttribute('aria-expanded', 'false'); } });
document.querySelector('#searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#searchInput').value.trim();
  if (query) location.hash = `search/${encodeURIComponent(query)}`;
});
document.querySelector('#accountButton').addEventListener('click', () => showToast('Sign-in is not connected in this free preview yet.'));
document.querySelector('.notification-button').addEventListener('click', () => showToast('You’re all caught up.'));
main.addEventListener('click', event => {
  const upload = event.target.closest('[data-upload]');
  if (upload) { showToast(`${upload.dataset.upload} publishing needs a secure backend. This preview does not upload files.`); return; }
  const trackButton = event.target.closest('[data-track]');
  if (trackButton) { activeTrack = trackButton.dataset.track; isPlaying = true; render(); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'toggle-play') { isPlaying = !isPlaying; render(); }
  else if (action === 'next' || action === 'prev' || action === 'shuffle') { const current = tracks.findIndex(t => t.title === activeTrack); activeTrack = tracks[(current + 1 + tracks.length) % tracks.length].title; isPlaying = true; render(); }
  else if (action === 'like-post' || action === 'like-short') { event.target.closest('button').classList.toggle('liked'); showToast('Thanks for showing some love.'); }
  else if (action === 'like-track') { event.target.textContent = event.target.textContent === '♥' ? '♡' : '♥'; }
  else if (action === 'share') { if (navigator.share) navigator.share({title:'Corecast', url:location.href}).catch(()=>{}); else { navigator.clipboard?.writeText(location.href); showToast('Link copied to clipboard.'); } }
  else if (action === 'join') showToast('Live rooms are sample previews; streaming is not connected yet.');
  else if (action === 'comment') showToast('Comments will be available when accounts are connected.');
});
main.addEventListener('submit', event => {
  if (event.target.id !== 'postForm') return;
  event.preventDefault();
  const text = new FormData(event.target).get('post').trim();
  if (!text) return;
  const post = document.createElement('article');
  post.className = 'post-card';
  post.innerHTML = `<div class="post-author"><div class="avatar-button">S</div><div><strong>Your post</strong><span>Just now · preview only</span></div></div><div class="post-text"></div><div class="post-actions"><button data-action="like-post">♡ Like</button><button data-action="comment">▢ Comment</button><button data-action="share">↗ Share</button></div>`;
  post.querySelector('.post-text').textContent = text;
  event.target.after(post);
  event.target.reset();
  showToast('Post added to this preview. It will disappear when you refresh.');
});
