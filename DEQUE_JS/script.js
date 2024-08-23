 // Crie uma instância da fila
 const minhaLista = new LinkedList();


 function adicionarElementoPorPrioridade() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = parseInt(document.getElementById("txtnovaPrioridade").value.trim());

  if (descricao === "" || isNaN(prioridade)) {
      alert("preencha todos os campos corretamente!");
      return;
  }

  const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());

  if (minhaLista.isEmpty()) {
      minhaLista.addFirst(novaTarefa);
  } else {
      let noAtual = minhaLista.head;
      let posicao = 0;

      
      while (noAtual !== null && noAtual.dado.prioridade <= prioridade) {
          noAtual = noAtual.prox;
          posicao++;
      }

      if (posicao === 0) {
          minhaLista.addFirst(novaTarefa);
      } else if (noAtual === null) {
          minhaLista.addLast(novaTarefa);
      } else {
          let noAnterior = minhaLista.head;
          for (let i = 0; i < posicao - 1; i++) {
              noAnterior = noAnterior.prox;
          }

          const novoNo = new No(novaTarefa);
          novoNo.prox = noAnterior.prox;
          noAnterior.prox = novoNo;
          minhaLista.length++;
      }
  }

  console.log(minhaLista.toString());

  
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtnovaTarefa").focus();
  atualizarLista();
}

 // Função para adicionar um elemento no Inicio
 function adicionarElementoInicio() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

  const novaTarefa = new Tarefa(descricao,prioridade,obterDataAtual(),obterHoraAtual());
  minhaLista.addFirst(novaTarefa);
  console.log(minhaLista.toString());
  //limpar input
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtnovaTarefa").focus();
  atualizarLista();
 }
 //---------
  function adicionarElementoFinal() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    
    if (descricao === "" || prioridade === "") {
    alert("preencha todos os campos!");
    return;
    }

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    minhaLista.addLast(novaTarefa);
    console.log(minhaLista.toString());

    // Limpar inputs
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
    
  }
 
 
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da fila
 function removerElemento() {
  if(!minhaLista.isEmpty()){
    const tarefaRealizada = minhaLista.removeFist();

    const dataAtual = obterDataAtual();
    const horaAtual = obterHoraAtual();

    const dias = calcularDiferencaDias(tarefaRealizada.data, dataAtual);
    const horas = calcularDiferencaHoras(tarefaRealizada.hora, horaAtual);

    mostrarMensagemRemocao(tarefaRealizada, dias, horas);
  }else{
    alert("A lista esta vazia");
  }

  atualizarLista();
   
 }

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada, dias, horas) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML = `
    A tarefa "${tarefaRealizada.descricao}" foi concluída.
    <br>
    Tempo necessário para concluir: ${dias} dias e ${horas} horas.
  `;
    mensagem.style.display = "block";
  }
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
 function atualizarLista() {
  const listaTarefas = document.getElementById("list_listadeTarefas");
  
  const lblTarefa = document.getElementById("lblmostraTarefas");

  if(!minhaLista.isEmpty()){
    lblTarefa.innerHTML = "Lista de Tarefa";
    listaTarefas.innerHTML = "";
    for(const tarefa of minhaLista){
      const novaLinha = document.createElement("li");
      novaLinha.innerHTML = tarefa.toString();
      listaTarefas.innerHTML += tarefa + "<br>";
    }
  }else{
    lblTarefa.innerHTML = "Lista de Tarefa vazia";
  }
   
 }
 //--------------------------------------------------------------------------------------------
  //FUNÇÕES COMPLEMENTARES PARA A APLICAÇÃO
 //-----------------------------------------

 function adicionarnoIndice() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();
  const indice = parseInt(document.getElementById("txtIndice").value.trim());

  if (descricao === "" || prioridade === "" || isNaN(indice)) {
      alert("Por favor, preencha todos os campos corretamente!");
      return;
  }

  if (indice < 0 || indice > minhaLista.length) {
      alert("Índice fora do intervalo permitido!");
      return;
  }

  const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());

  if (indice === 0) {
      minhaLista.addFirst(novaTarefa);
  } else if (indice === minhaLista.length) {
      minhaLista.addLast(novaTarefa);
  } else {
      let noAtual = minhaLista.head;
      let indiceAtual = 0;

      while (indiceAtual < indice - 1) {
          noAtual = noAtual.prox;
          indiceAtual++;
      }

      const novoNo = new No(novaTarefa);
      novoNo.prox = noAtual.prox;
      novoNo.ant = noAtual;

      if (noAtual.prox !== null) {
          noAtual.prox.ant = novoNo;
      }

      noAtual.prox = novoNo;
      minhaLista.length++;
  }

  console.log(minhaLista.toString());

  // Limpar os campos
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtIndice").value = "";
  document.getElementById("txtnovaTarefa").focus();
  atualizarLista(); 
}

function TarefaMaisAntiga() {
  if (minhaLista.isEmpty()) {
    alert("A lista está vazia!");
    return null;
  }

  let tarefaMaisAntiga = minhaLista.head.dado;
  let noAtual = minhaLista.head.prox;

  while (noAtual !== null) {
    const tarefaAtual = noAtual.dado;
    const dataHoraTarefaMaisAntiga = new Date(`${converterDataFormatoISO8601(tarefaMaisAntiga.data)}T${tarefaMaisAntiga.hora}`);
    const dataHoraTarefaAtual = new Date(`${converterDataFormatoISO8601(tarefaAtual.data)}T${tarefaAtual.hora}`);

    if (dataHoraTarefaAtual < dataHoraTarefaMaisAntiga) {
      tarefaMaisAntiga = tarefaAtual;
    }

    noAtual = noAtual.prox;
  }

  return tarefaMaisAntiga;
}

function mostrarTarefaMaisAntiga() {
  const tarefaMaisAntiga = TarefaMaisAntiga();

  if (tarefaMaisAntiga !== null) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML = `
      A tarefa mais antiga na lista é: "${tarefaMaisAntiga.descricao}".
      <br>
      Data de criação: ${tarefaMaisAntiga.data} às ${tarefaMaisAntiga.hora}.
    `;
    mensagem.style.display = "block";
  }
}

function mostrarTarefaInicio() {
  if (minhaLista.isEmpty()) {
    alert("A lista está vazia!");
    return;
  }

  const tarefaInicio = minhaLista.head.dado;
  const mensagem = document.getElementById("mensagem-remocao");

  mensagem.innerHTML = `
    A tarefa no início da lista é: "${tarefaInicio.descricao}".
    <br>
    Data de criação: ${tarefaInicio.data} às ${tarefaInicio.hora}.
  `;
  mensagem.style.display = "block";
}

 
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split('/');
  const dia = partes[0].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
  const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
  const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
  if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
    return tarefa1;
  } else {
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------
function saveLinkedListToLocalStorage() {
  console.log("saveLinkedListToLocalStorage");
  let listaParaSalvar = [];
  for(const item of minhaLista){
      listaParaSalvar.push({
          _descricao: item.descricao,
          _prioridade: item.prioridade,
          _data: item.data,
          _hora: item.hora
      });
      console.log(item.toString());
  };
  let jsonStr = JSON.stringify(listaParaSalvar);
  console.log(jsonStr);
  localStorage.setItem('myLinkedList', jsonStr);
  alert("Lista salva com sucesso!");
}
//-----------------------------
function loadLinkedListFromLocalStorage() {
  console.log("loadLinkedListFromLocalStorage");
  let jsonStr = localStorage.getItem('myLinkedList');
  if (jsonStr) {
      let listaCarregada = JSON.parse(jsonStr);
      for (let i = 0; i < listaCarregada.length; i++) {
          let obj = listaCarregada[i];
          let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
          console.log(novaTarefa.toString());
          minhaLista.addLast(novaTarefa);
      }
      atualizarLista();
      alert("Lista carregada com sucesso!");
  }
}