class No{
    constructor (novoDado){
        this.dado = novoDado;
        this.ant = null;
        this.prox = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addFirst(novoDado){
        const novoNo = new No(novoDado);
        if(this.head === null)
            this.tail = novoNo;
        else{
            novoNo.prox = this.head;
            this.head.ant = novoNo;
        }

        this.head = novoNo;
        this.length++;
        return true;
    }



addLast(novoDado){
    const novoNo = new No(novoDado);
    if(novoNo === null){
        return false;
    }
    if(this.head === null){
        this.head = novoNo;
        this.tail = novoNo;
    }else{
        novoNo.ant = this.tail;
        this.tail.prox = novoNo;
        this.tail = novoNo;
    }

        this.length++;
        return true;

    }
  

    removeFist(){
        const dadoRemovido = this.head.dado;
        this.head = this.head.prox;
        if(this.head!==null)
            this.head.ant = null;
        else
            this.tail = null;
        this.length--;
        return dadoRemovido;
    }

    removerLast(){
        const dadoRemovido = this.tail.dado;
        this.tail = this.head.ant;
        if(this.tail!==null)
            this.tail.prox = null;
        else
            this.head = null;
        this.length--;
        return dadoRemovido;
    }

    // removeLast(){
    
    getLast(){
      return this.tail.dado;
    }
     getFirst(){
        return this.head.dado;
     }
    isEmpty(){
        //if(this.head===null)
        //    return true;
        //return false;
        return this.head === null;

        
    }

    //-------------------------------------
//Quando um objeto tem uma propriedade [Symbol.iterator], ele pode ser iterado com construções como [ for(const item of minhaLista)*/


[Symbol.iterator]() {         
    let currentNode = this.head;
          return {
            next: function() {
              if (currentNode!==null) {
                let value = currentNode.dado;
                currentNode = currentNode.prox;
                return { value: value, done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
  //—----------------
        toString() {
          let result = "";
          let currentNode = this.head;
          while (currentNode !== null) {
              result += currentNode.dado + (currentNode.next ? " -> " : "");
              currentNode = currentNode.prox;
          }
          return result;
      }

      addAtIndex(index, data) {
        if (index < 0) {
          // Verifica se o índice é válido (maior ou igual a zero)
          console.log("Indice invalido. O indice deve ser um valor inteiro maior ou igual a zero.");
          return false;
        }
     
        if (index === 0)
          // Se o índice for zero, chama o método addFirst() para adicionar no início da lista
          this.addFirst(data);


        if (index >= this.length)
            this.addLast(data);


        const newNo = new No(data);
        if (newNo === null)
          return false;
       
     
        let noAtual = this.head;
        let indiceAtual = 0;
        while (indiceAtual < index - 1) {
          // Percorre a lista até encontrar o nó anterior ao índice especificado
          noAtual = noAtual.prox;
          indiceAtual++;
        }
     
        newNode.ant = noAtual;
        newNode.prox = noAtual.prox;
        noAtual.prox.ant = newNode;
        noAtual.prox = newNode;
     
     
        this.length++;
        return true;
      }

  
}