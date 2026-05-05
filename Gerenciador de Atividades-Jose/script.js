function adicionar_tarefa() {
    const input = document.getElementById('tarefaInput');
    const lista = document.getElementById('listaTarefas');

    if (input.value.trim() === '') {
        alert("Por favor, digite uma tarefa!");
        return;
    }
    
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-3';
    
    const prioridadeInicial = 'baixa';

    col.innerHTML = `
        <div class="card card-${prioridadeInicial} shadow-sm h-100">
            <button type="button" 
                    class="btn-close position-absolute" 
                    style="top: 10px; right: 10px;" 
                    aria-label="Close"
                    onclick="this.closest('.col-md-4').remove()">
            </button>
            
            <div class="card-body text-center mt-3">
                <h5 class="card-title text-start pe-4">${input.value}</h5>
                <hr>
                <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-sm btn-danger" onclick="mudarPrioridade(this, 'alta')">Alta</button>
                    <button type="button" class="btn btn-sm btn-warning" onclick="mudarPrioridade(this, 'media')">Média</button>
                    <button type="button" class="btn btn-sm btn-success" onclick="mudarPrioridade(this, 'baixa')">Baixa</button>
                </div>
            </div>
        </div>
    `;

    lista.appendChild(col);
    input.value = ""; 
}

function mudarPrioridade(botao, novaPrioridade) {
    const card = botao.closest('.card');
    card.classList.remove('card-baixa', 'card-media', 'card-alta');
    card.classList.add(`card-${novaPrioridade}`);
}