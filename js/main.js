/* 
let consultaCEP = fetch("https://viacep.com.br/ws/04715005/json/")
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw Error('Esse cep não existe')
    } else 
    console.log(r)})
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processamento concluído'));

console.log(consultaCEP) 

let ceps = ['01001000', '04715005', '12903892'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

*/

async function buscaEndereco (cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let consultaCEPconvertida = await consultaCEP.json();
        if (consultaCEPconvertida.erro) {
            throw Error("CEP não existente !");
        }
        var cidade = document.getElementById("cidade");
        var logradouro = document.getElementById("endereco");
        var estado = document.getElementById("estado");
        var bairro = document.getElementById("bairro");

        cidade.value = consultaCEPconvertida.localidade;
        logradouro.value = consultaCEPconvertida.logradouro;
        estado.value = consultaCEPconvertida.uf;
        bairro.value = consultaCEPconvertida.bairro;

        console.log(consultaCEPconvertida);
        return consultaCEPconvertida
    } catch (erro) {
        if (cep.length < 8 ){
            mensagemErro.innerHTML = `<p>O CEP precisa ter no mínimo 8 digitos (sem caractéres especiais)</p>`
        } else {
            mensagemErro.innerHTML = `<p>CEP inálido. Tente novamente!</p>`
        }
        console.log(erro)
    }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
