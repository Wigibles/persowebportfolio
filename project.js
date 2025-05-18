// Project data (should match your main portfolio)
const projects = [
  {
    id: 'bulsufind',
    title: 'BulSUFind',
    year: 2024,
    role: 'Web & Mobile Developer',
    desc: 'A mobile app for managing lost and found items at Bulacan State University. Built with native Android, Java, Google API, REST, and Firebase, it streamlines item reporting, searching (including image-based search), real-time notifications, and user chat for efficient recovery and communication.',
    media: [
      { type: 'image', src: 'assets/projects/bulsufind.png', alt: 'BulSUFind Screenshot' }
      // You can add more images or videos here
    ],
    tech: ['Java', 'JavaScript', 'Android', 'Google API / GCloud', 'REST', 'Firebase'],
    links: []
  },
  {
    id: 'coding-chronicles',
    title: 'Coding Chronicles',
    year: 2024,
    role: 'Lead Programmer & Game Designer',
    desc: 'Led development of a 2D platformer game, building the core gameplay, physics, and cross-platform architecture for PC and Android. Created most visual assets and coordinated integration of all game elements for a cohesive experience.',
    media: [
      { type: 'image', src: 'assets/projects/coding-chronicles.png', alt: 'Coding Chronicles Screenshot' },
      { type: 'video', src: 'https://www.youtube.com/watch?v=CZxOOZRPv8w', alt: 'Coding Chronicles Trailer' }
    ],
    tech: ['Unity', 'C#', 'Android'],
    links: [
      { label: 'YouTube Demo', url: 'https://www.youtube.com/watch?v=CZxOOZRPv8w' }
    ]
  },
  {
    id: 'bulsu-classroom',
    title: 'BulSU Classroom',
    year: 2024,
    role: 'Quiz System & Assessment Module Lead',
    desc: 'Developed an automated quiz and grading system with anti-cheating features, real-time monitoring, and grade computation. Designed user interfaces and integrated the system with other platform features using JavaScript and browser APIs.',
    media: [
      { type: 'image', src: 'assets/projects/bulsu-classroom.png', alt: 'BulSU Classroom Screenshot' }
    ],
    tech: ['JavaScript', 'Bootstrap', 'Python', 'Browser APIs'],
    links: []
  }
];

function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function isYouTubeUrl(url) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

function renderProject(project) {
  // Get the container
  const cardDetail = document.querySelector('.project-card-detail');
  // Count images and videos
  const images = project.media.filter(m => m.type === 'image');
  const videos = project.media.filter(m => m.type === 'video');
  // If only one image and no video, use single-col layout
  if (images.length === 1 && videos.length === 0) {
    cardDetail.classList.remove('landscape');
    cardDetail.classList.add('single-col');
  } else {
    cardDetail.classList.remove('single-col');
    cardDetail.classList.add('landscape');
  }

  // Track embedded YouTube video IDs
  const embeddedYouTubeIds = new Set();

  document.getElementById('project-title').textContent = project.title;
  // Render year and role
  const metaDiv = document.getElementById('project-meta');
  metaDiv.innerHTML = `<b>Year:</b> ${project.year} &nbsp; <b>Role:</b> ${project.role}`;
  document.getElementById('project-desc').textContent = project.desc;
  // Media
  const mediaDiv = document.getElementById('project-media');
  mediaDiv.innerHTML = '';
  project.media.forEach(m => {
    if (m.type === 'image') {
      const img = document.createElement('img');
      img.src = m.src;
      img.alt = m.alt || project.title;
      img.className = 'project-detail-img';
      mediaDiv.appendChild(img);
    } else if (m.type === 'video') {
      // If YouTube, embed iframe
      if (isYouTubeUrl(m.src)) {
        let videoId = '';
        const ytMatch = m.src.match(/[?&]v=([^&#]+)/) || m.src.match(/youtu\.be\/([^?&#]+)/);
        if (ytMatch) videoId = ytMatch[1];
        if (videoId) {
          embeddedYouTubeIds.add(videoId); // Track this video ID
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.className = 'project-detail-iframe';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          mediaDiv.appendChild(iframe);
        }
      } else {
        const vid = document.createElement('video');
        vid.src = m.src;
        vid.controls = true;
        vid.className = 'project-detail-video';
        mediaDiv.appendChild(vid);
      }
    }
  });
  // Tech
  const techDiv = document.getElementById('project-tech');
  techDiv.innerHTML = project.tech.map(t => `<span class="project-detail-tech-item">${t}</span>`).join(' ');
  // Links (embed YouTube only if not already embedded)
  const linksDiv = document.getElementById('project-links');
  linksDiv.innerHTML = '';
  if (project.links && project.links.length) {
    project.links.forEach(l => {
      if (isYouTubeUrl(l.url)) {
        let videoId = '';
        const ytMatch = l.url.match(/[?&]v=([^&#]+)/) || l.url.match(/youtu\.be\/([^?&#]+)/);
        if (ytMatch) videoId = ytMatch[1];
        if (videoId && !embeddedYouTubeIds.has(videoId)) {
          // Only embed if not already embedded
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.className = 'project-detail-iframe';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          mediaDiv.appendChild(iframe);
        } else {
          // Otherwise, just show a link
          linksDiv.innerHTML += `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`;
        }
      } else {
        linksDiv.innerHTML += `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`;
      }
    });
  }
}

const projectId = getProjectIdFromUrl();
const project = projects.find(p => p.id === projectId);
if (project) {
  renderProject(project);
} else {
  document.querySelector('.project-detail-main').innerHTML = '<p style="text-align:center;margin-top:4rem;">Project not found.</p>';
} 