const form = document.querySelector("#novoitem")
const lista = document.getElementById("lista")
const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []

pessoas.forEach( (elemento) => {
  criarElemento(elemento)
});

form.addEventListener("submit", (evento)=>{
  evento.preventDefault()

  const nome = evento.target.elements["nome"]
  const data = evento.target.elements["data"]

  const existe = pessoas.find(elemento => elemento.nome === nome.value)

  const itemAtual = {
    "nome" : nome.value,
    "data" : data.value,
  }

  if(existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    pessoas[pessoas.findIndex(elemento => elemento.id === existe.id)] = itemAtual
  } else{

    itemAtual.id = pessoas[pessoas.length-1] ? (pessoas[pessoas.length-1]).id + 1 : 0;

    criarElemento(itemAtual)

    pessoas.push(itemAtual)
  }

  localStorage.setItem('pessoas',JSON.stringify(pessoas))

  nome.value = ""
  data.value = ""
})

function criarElemento(item){
  const novoItem = document.createElement("li")
  novoItem.classList.add("item")

  novoItem.innerHTML += item.nome

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.data
  numeroItem.dataset.id = item.id
  novoItem.appendChild(numeroItem)

  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.data
}

function botaoDeleta(id){
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = ("X")

  elementoBotao.addEventListener("click", function(){
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id){
  tag.remove()

  pessoas.splice(pessoas.findIndex(elemento => elemento.id ===id), 1)

  localStorage.setItem("pessoas", JSON.stringify(pessoas))
}