const API = 'https://api.tvmaze.com/search/shows?q=girls'

fetch(API)
    .then(resposta => resposta.json())
    .then(dados => {
        const container = document.getElementById('conteudo-api')

        container.innerHTML =  `
            <h2>${dados.titulo}</h2>
            <p>${dados.descricao}</p>
        `;
    })

    .catch(erro => {
        console.erro('Erro: ', erro )
    })

function adicionar_tarefa() {
        const input = document.getElementById('tarefaInput');
        const lista = document.getElementById('listaTarefas');

        if (input.value.trim() === "") return;
        
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        
        const prioridadeInicial = 'baixa';

        col.innerHTML = `
            <div class="card card-${prioridadeInicial} shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${input.value}</h5>
                    <label class="small text-muted">Prioridade:</label>
                    <select class="form-select form-select-sm mb-3" onchange="alterarPrioridade(this)">
                        <option value="baixa" selected>Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                    <button class="btn btn-sm btn-outline-danger w-100" onclick="this.closest('.col-md-4').remove()">Remover</button>
                </div>
            </div>
        `;


        lista.appendChild(col);
        input.value = ""; 
    }

    function alterarPrioridade(selectElement) {
        const card = selectElement.closest('.card');
        const novaPrioridade = selectElement.value;

        card.classList.remove('card-baixa', 'card-media', 'card-alta');
        card.classList.add(`card-${novaPrioridade}`);
        
    }

