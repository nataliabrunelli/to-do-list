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
  let tarefaTexto = inputTarefa.value;

  if (tarefaTexto !== "") {
    const tarefaObj = { texto: tarefaTexto, check: false }; // Sempre começa desmarcado
    
    tarefas.push(tarefaObj);
    salvarNoLocalStorage();
    adicionarTarefaNaLista(tarefaObj);

    novaTarefa.style.opacity = "0";
  } else {
    paragrafo.style.display = "block";
  }
});

listaTarefas.addEventListener("click", (e) => {
  if (e.target.classList.contains("trash")) {
    const tarefaItem = e.target.closest(".tarefa-item");
    if (tarefaItem) {
      const tarefaTexto = tarefaItem.querySelector("label").innerText;

      tarefas = tarefas.filter((tarefa) => tarefa.texto !== tarefaTexto);
      salvarNoLocalStorage();

      tarefaItem.remove();

      if (listaTarefas.children.length === 0) {
        paragrafo.style.display = "block";
      }
    }
  }
});

// Atualiza o estado da checkbox no LocalStorage ao marcar/desmarcar
listaTarefas.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const tarefaItem = e.target.closest(".tarefa-item");
    const tarefaTexto = tarefaItem.querySelector("label").innerText;

    tarefas = tarefas.map((tarefa) => 
      tarefa.texto === tarefaTexto ? { ...tarefa, check: e.target.checked } : tarefa
    );

    salvarNoLocalStorage();
  }
});

function adicionarTarefaNaLista(tarefa) { //recebe o objeto tarefa do localStorage quando carrega a página
  const li = document.createElement("li");
  li.classList.add("tarefa-item");

  li.innerHTML = `
    <div>
      <input type='checkbox' ${tarefa.check ? "checked" : ""}>
      <label>${tarefa.texto}</label>
    </div>
    <i class="fa-regular fa-trash-can trash"></i>
  `;

  listaTarefas.appendChild(li);
}

// Salva a lista no LocalStorage
function salvarNoLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Carrega as tarefas ao iniciar
window.onload = function () {
  tarefas.forEach(adicionarTarefaNaLista);
}