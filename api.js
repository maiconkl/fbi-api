function downloadFile(url, name) {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadFile(url, name) {
    window.open(url, '_blank');
}

function inicial(id) {
    let url = `https://api.fbi.gov/wanted/v1/object/${id}`;
  
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
  
    let resposta = JSON.parse(req.responseText);
  
    console.log(resposta);

    let d = document.getElementById('procurado1');

    if (resposta.title === null) {
        resposta.title = "Sem Informações";
    }
    if(resposta.hair === null){
        resposta.hair = " Sem Informações";
    }
    if(resposta.eyes === null){
        resposta.eyes = " Sem Informações";
    }
    if(resposta.sex === null){
        resposta.sex = " Sem Informações";
    }
    if(resposta.race === null){
        resposta.race = " Sem Informações";
    }
    if(resposta.occupations === null){
        resposta.occupations = " Sem Informações";
    }
    if(resposta.race === null){
        resposta.race = " Sem Informações";
    }
    if(resposta.place_of_birth === null){
        resposta.place_of_birth = " Sem Informações";
    }
    if(resposta.age_range === null){
        resposta.age_range = " Sem Informações";
    }
    if (resposta.images[0].large == null) {
        resposta.images[0].large = 'semfoto.png';
    }
    d.innerHTML = `<div class="container">
        <div class="row">
            <div class="col-md">
                <div class="card" id="procurado1" onclick="inicial('98df11f3903d4ecab8940693471cbca8')">
                    <div class="card-body">
                        <h5 class="card-title">${resposta.title}</h5>
                        <img id="imagemProcurado" src="${resposta.images[0].large}" width="300px" height="300px" alt="">
                        <br>
                        <br>
                        <h6 class="card-subtitle mb-2 text-muted">Data de Nascimento: ${resposta.dates_of_birth_used}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Cabelo:${resposta.hair}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Olhos: ${resposta.eyes}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Sexo: ${resposta.sex}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Raça: ${resposta.race}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Idade: ${resposta.age_range}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Ocupação: ${resposta.occupations}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Nacionalidade: ${resposta.place_of_birth}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Classificação: ${resposta.poster_classification}</h6>
                        <button type="button" class="btn btn-primary" onclick="downloadFile('${resposta.files[0].url}', '${resposta.files[0].name}')">Arquivo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    window.scrollTo(0, 0);

}
window.onload = inicial('98df11f3903d4ecab8940693471cbca8');


function listar() {
    let url = 'https://api.fbi.gov/wanted/list';

    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();

    let resposta = JSON.parse(req.responseText);

    console.log(resposta);

    let procuradosContainer = document.getElementById('procurados');

    resposta.items.forEach(procurado => {
        let card = document.createElement('div');
        card.className = 'card';

        if (procurado.title === null) {
            procurado.title = "Sem Informações";
        }
        if(procurado.sex === null){
            procurado.sex = " Sem Informações";
        }
        if(procurado.age_range === null){
            procurado.age_range = " Sem Informações";
        }
        if(procurado.race === null){
            procurado.race = " Sem Informações";
        }
        if (procurado.images[0].large == null) {
            procurado.images[0].large = 'semfoto.png';
        }

        card.innerHTML = `
            <img id="imagemProcurado" src="${procurado.images[0].large}" width="100px" height="100px" alt="">
            <div class="card-body" onclick="inicial('${procurado.uid}')">
                <h5 class="card-title">${procurado.title}</h5>
                <h6>Raça: ${procurado.race}</h6>
                <h6>Idade: ${procurado.age_range}</h6>
                <h6>Sexo: ${procurado.sex}</h6>
            </div>
        `;

        procuradosContainer.appendChild(card);
    });
}


window.onload = listar;

function pesquisarProcurado() {
    // Obtém o termo de pesquisa do campo de entrada
    const termoPesquisa = document.getElementById('buscar').value;

    // Monta a URL da API do FBI com o termo de pesquisa
    const url = `https://api.fbi.gov/wanted/v1/list?title=${termoPesquisa}`;

    // Faz uma solicitação à API usando a URL montada
    fetch(url)
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Verifica se a API retornou resultados
            if (data.total > 0) {
                // A primeira ocorrência é o procurado mais relevante
                const primeiroProcurado = data.items[0];

                // Chama a função 'inicial' para exibir o perfil do procurado
                inicial(primeiroProcurado.uid);
            } else {
                // Caso não haja resultados, exibe uma mensagem de erro
                alert('Nenhum procurado encontrado com esse termo de pesquisa.');
            }
        })
        .catch(error => {
            // Trata erros na solicitação à API
            console.error('Erro na solicitação à API: ', error);
        });
}

