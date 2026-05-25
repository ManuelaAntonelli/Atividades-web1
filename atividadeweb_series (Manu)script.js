const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const loading = document.getElementById('loading');
const messageArea = document.getElementById('message-area');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const query = input.value.trim();

    if (query === '') {
        showMessage('Digite o nome da série', 'warning');
        return;

    resultsContainer.innerHTML = '';
    hideMessage();}
    
    loading.classList.remove('d-none');

    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        
        if (!response.ok) {
            throw new Error('Erro na comunicação com o servidor');
        }

        const data = await response.json();

        loading.classList.add('d-none');

        if (data.length === 0) {
            showMessage(`Nenhuma série encontrada para "${query}".`, 'info');
            return;
        }

        data.forEach(item => {
            createCard(item.show, item.score);
        });

    } catch (error) {
        loading.classList.add('d-none');
        showMessage('Erro ao buscar os dados', 'danger');
        console.error('Erro:', error);
    }
});

function showMessage(text, type) {
    messageArea.className = `alert alert-${type} text-center mb-4`;
    messageArea.textContent = text;
    messageArea.classList.remove('d-none');
}

function hideMessage() {
    messageArea.classList.add('d-none');
    messageArea.textContent = '';
}

function createCard(show, score) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch';

    const card = document.createElement('div');
    card.className = 'card w-100 shadow-sm border-0';

    if (show.image && show.image.medium) {
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = show.image.medium;
        img.alt = `Capa da série ${show.name}`;
        card.appendChild(img);
    } else {
        const noImageDiv = document.createElement('div');
        noImageDiv.className = 'no-image-placeholder card-img-top';
        
        const noImageText = document.createElement('span');
        noImageText.textContent = 'Sem imagem disponível';
        
        noImageDiv.appendChild(noImageText);
        card.appendChild(noImageDiv);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title fw-bold';
    title.textContent = show.name;

    const scoreText = document.createElement('p');
    scoreText.className = 'card-text mt-auto text-secondary mb-0';
    
    const formattedScore = score ? (score * 10).toFixed(1) : 'N/A';
    
    const scoreStrong = document.createElement('strong');
    scoreStrong.textContent = 'Score API: ';
    
    scoreText.appendChild(scoreStrong);
    scoreText.appendChild(document.createTextNode(formattedScore));

    cardBody.appendChild(title);
    cardBody.appendChild(scoreText);
    
    card.appendChild(cardBody);
    col.appendChild(card);

    resultsContainer.appendChild(col);
}

