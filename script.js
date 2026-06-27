// Временное заполнение (Mock Data)
const mockDatabase = {
    "madison beer": {
        name: "Madison Beer",
        listeners: "17 068 108",
        image: "https://i.scdn.co/image/ab6761670000ecd42ddb7e77b33ae3b2c54d4a29", 
        tracks: [
            { 
                name: "Reckless", 
                plays: "749 654 438",
                links: {
                    spotify: "https://open.spotify.com/track/1Dq5By1yUrOB0zSxhCc5v8?si=375c3d996b2f45ac",
                    apple: "https://music.apple.com/us/song/reckless/1569570611",
                    youtube: "https://music.youtube.com/watch?v=exsR1joPIoQ&si=6jTwQBEayHk1NmKn"
                }
            },
            { 
                name: "Make You Mine", 
                plays: "477 291 616",
                links: {
                    spotify: "https://open.spotify.com/track/4YMsS8OqXICdQXF5HNUxFq?si=3145c8fee4f64500",
                    apple: "https://music.apple.com/us/song/make-you-mine/1729494488",
                    youtube: "https://music.youtube.com/watch?v=8j7yFWgpnCA&si=MuRnXOqC10qURx2A"
                }
            },
            { 
                name: "POP/STARS", 
                plays: "427 472 148",
                links: {
                    spotify: "https://open.spotify.com/track/3em2uN4cCWHcCXhjMzJ8ps?si=7df04c3ac83440c4",
                    apple: "https://music.apple.com/us/song/pop-stars-feat-jaira-burns-league-of-legends-music/1831861474",
                    youtube: "https://music.youtube.com/watch?v=1Z_g6Gtj9Cs&si=NhovfkZhs_vy57sn"
                }
            },
            { 
                name: "MORE", 
                plays: "291 956 827",
                links: {
                    spotify: "https://open.spotify.com/track/65pHtEdxGt4e3Fv1ncPi6V?si=7886311c0f2241d7",
                    apple: "https://music.apple.com/us/song/more-feat-%E5%88%98%E6%9F%8F%E8%BE%9Blexie-jaira-burns-seraphine-league-of/1832564134",
                    youtube: "https://music.youtube.com/watch?v=qsFlLV6UFwE&si=OWtaVp-zqaVulCxg"
                }
            },
            { 
                name: "Good In Goodbye", 
                plays: "274 046 707",
                links: {
                    spotify: "https://open.spotify.com/track/4y3g40TWe7fCWCayJZuGvw?si=676ba5f0659f4b61",
                    apple: "https://music.apple.com/us/song/good-in-goodbye/1549343061",
                    youtube: "https://music.youtube.com/watch?v=f8_kBbbnIzw&si=HoOeDE1a0L9szz2f"
                }
            }
        ],
        albums: [
            { title: "As She Pleases (EP)", year: "2018", image: "https://static.wikia.nocookie.net/madisonbeer/images/8/8c/Madison_Beer_-_As_She_Pleases_%28EP_cover%29.jpg/revision/latest?cb=20230916231924" },
            { title: "Life Support", year: "2021", image: "https://static.wikia.nocookie.net/madisonbeer/images/c/ce/Life_Support_Artwork.jpeg/revision/latest/scale-to-width-down/1000?cb=20230916231601" },
            { title: "Silence Between Songs", year: "2023", image: "https://static.wikia.nocookie.net/madisonbeer/images/7/73/SBS_cover.jpeg/revision/latest/scale-to-width-down/1000?cb=20230916231325" },
            { title: "Locket", year: "2026", image: "https://static.wikia.nocookie.net/madisonbeer/images/1/13/Locket.jpg/revision/latest/scale-to-width-down/1000?cb=20251023141444" }
        ]
    }
};

// Находим нужные элементы на странице
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mainContainer = document.getElementById('main-container');
const searchSection = document.getElementById('search-section');
const profileSection = document.getElementById('profile-section');

const artistImg = document.getElementById('artist-img');
const artistName = document.getElementById('artist-name');
const artistListeners = document.getElementById('artist-listeners');
const tracksList = document.getElementById('tracks-list');
const albumsGrid = document.getElementById('albums-grid');

// Функция для обработки поиска
function performSearch() {
    // Очищаем текст от лишних пробелов и переводим в нижний регистр
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert("Пожалуйста, введите имя исполнителя!");
        return;
    }

    // Проверяем, есть ли артист в нашей "базе"
    if (mockDatabase[query]) {
        const artist = mockDatabase[query];
        renderProfile(artist);
    } else {
        alert("Исполнитель не найден. В тестовом режиме введите: Madison Beer");
    }
}

// Функция отрисовки профиля на странице
function renderProfile(artist) {
    // Заполняем шапку профиля
    artistName.textContent = artist.name;
    artistListeners.textContent = artist.listeners;
    artistImg.src = artist.image;

    // Очищаем списки перед выводом (чтобы данные не дублировались)
    tracksList.innerHTML = "";
    albumsGrid.innerHTML = "";

    // Рендерим популярные треки через цикл с возможностью клика
    artist.tracks.forEach(track => {
        const li = document.createElement('li');
        li.className = 'track-item';
        // Добавим стиль курсора, чтобы пользователь видел, что кликнуть можно
        li.style.cursor = 'pointer'; 
        
        li.innerHTML = `
            <span class="track-name">${track.name}</span>
            <span class="track-plays">🎧 ${track.plays}</span>
        `;
        
        // Вешаем клик на каждый элемент списка треков!
        li.addEventListener('click', () => {
            openTrackModal(track);
        });
        
        tracksList.appendChild(li);
    });

    // Рендерим альбомы через цикл
    artist.albums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
            <img src="${album.image}" alt="${album.title}">
            <div class="album-title">${album.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${album.year}</div>
        `;
        albumsGrid.appendChild(card);
    });

    // Анимация интерфейса: двигаем контейнер вверх и показываем профиль
    mainContainer.classList.add('active');
    profileSection.classList.remove('hidden');
}

// Вешаем слушатели событий (на клик и на нажатие Enter)
searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});


// Находим новые элементы модального окна в DOM
const trackModal = document.getElementById('track-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalTrackName = document.getElementById('modal-track-name');
const modalTrackPlays = document.getElementById('modal-track-plays');
const linkSpotify = document.getElementById('link-spotify');
const linkApple = document.getElementById('link-apple');
const linkYouTube = document.getElementById('link-youtube');

// Функция, которая открывает окно и заполняет его данными трека
function openTrackModal(track) {
    modalTrackName.textContent = track.name;
    modalTrackPlays.textContent = track.plays;
    
    // Подставляем ссылки на площадки
    linkSpotify.href = track.links.spotify;
    linkApple.href = track.links.apple;
    linkYouTube.href = track.links.youtube;
    
    // Показываем окно (удаляем класс hidden)
    trackModal.classList.remove('hidden');
}

// Функция закрытия окна
function closeModal() {
    trackModal.classList.add('hidden');
}

// Вешаем событие закрытия на крестик и на клик по серому фону вокруг окна
modalCloseBtn.addEventListener('click', closeModal);
trackModal.addEventListener('click', (event) => {
    // Если кликнули именно на оверлей (фон), а не на само окно — закрываем
    if (event.target === trackModal) {
        closeModal();
    }
});
