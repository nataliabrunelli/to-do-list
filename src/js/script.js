const btnNova = document.querySelector(".new");
const btnTarefa = document.querySelector(".btn-nova");
const paragrafo = document.querySelector("p");
const inputTarefa = document.querySelector(".nova");
const novaTarefa = document.querySelector(".nova-tarefa");
const listaTarefas = document.querySelector(".lista-tarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

btnNova.addEventListener("click", () => {
  inputTarefa.value = "";
  paragrafo.style.display = "none";
  novaTarefa.style.opacity = "1";
});

btnTarefa.addEventListener("click", () => {
  let tarefa = inputTarefa.value;

  if (tarefa !== "") {
    listaTarefas.innerHTML += `<li class='tarefa-item'>
          <div>
            <input type='checkbox' name='' id='tarefa'>
            <label for='tarefa'>${tarefa}</label>
          </div>
          <i class="fa-regular fa-trash-can trash"></i>
        </li>`;

    salvarTarefaNoLocalStorage(tarefa);
  } else {
    paragrafo.style.display = "block";
  }

  novaTarefa.style.opacity = "0";
});

listaTarefas.addEventListener("click", (e) => {
  if (e.target.classList.contains("trash")) {
    // Encontra o elemento <li> pai e o remove
    const tarefaItem = e.target.closest(".tarefa-item");
    if (tarefaItem) {
      const tarefaTexto = tarefaItem.querySelector("label").innerText;

      tarefaItem.remove();
      removerTarefaDoLocalStorage(tarefaTexto);

      if (listaTarefas.children.length === 0) {
        paragrafo.style.display = "block";
      }
    }
  }
});

// Função para salvar no LocalStorage
function salvarTarefaNoLocalStorage(tarefa) {
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para remover do LocalStorage
function removerTarefaDoLocalStorage(tarefaTexto) {
  tarefas = tarefas.filter((tarefa) => tarefa !== tarefaTexto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar tarefas salvas ao abrir a página
window.onload = function () {

  tarefas.forEach(tarefa => {
    listaTarefas.innerHTML += `<li class='tarefa-item'>
          <div>
            <input type='checkbox' name='' id='tarefa'>
            <label for='tarefa'>${tarefa}</label>
          </div>
          <i class="fa-regular fa-trash-can trash"></i>
        </li>`;
  });
};