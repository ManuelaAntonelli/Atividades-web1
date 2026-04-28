class FormularioAluno{

    constructor(lista){
        this.lista = lista;
    }

    adicionarAluno(aluno){

        const resultadoBusca = this.buscarAluno(aluno.nome);

        if(typeof resultadoBusca == 'string'){
            this.lista.push(aluno);
        }
        else{
            return "Esse aluno ja existe"
        }
    }

    listarAlunos(){
        this.lista.forEach(element => console.log(element));
    }

    buscarAluno(nome){

        const alunoEncontrado = this.lista.find(a => a.nome == nome)

        if (alunoEncontrado){
            return alunoEncontrado;
        }
        else {
            return "Aluno não encontrado"
        }
    }

    alterarAluno(nome,nomeNovo,idadeNova){

        const alunoAlterado = this.buscarAluno(nome);

        if (typeof alunoAlterado !== 'string'){
            alunoAlterado.idade = idadeNova;
            alunoAlterado.nome = nomeNovo;
        }
        else{
            return;
        }
    }

    removerAluno(nome){

        this.lista = this.lista.filter(a => a.nome !== nome)
    }
    
}

class Aluno{

    constructor(nome,idade){
        if(idade > 0 && idade < 135){
            this.nome = nome;
            this.idade = idade;
        }else{
            throw new Error('Dados inválidos!')
        }
    }
}