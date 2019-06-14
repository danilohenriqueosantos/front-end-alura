class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }

    adiciona() {
        event.preventDefault();

        // console.log(typeof(this._inputData.value));

        let data = new Date(this._inputData.value.replace(/-/g, ','));

        console.log(data);
        
        
        // let negociacao = new Negociacao(
        //     this._inputData.value,
        //     this._inputQuantidade.value,
        //     this._inputValor.value
        // );

        // console.log(negociacao);
        

        //Adicionar uma negociação a uma lista
    }

}