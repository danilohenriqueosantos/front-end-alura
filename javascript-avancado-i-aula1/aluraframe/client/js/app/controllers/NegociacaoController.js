class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociaacoes = new ListaNegociacoes();

    }

    adiciona() {

        event.preventDefault();

        this._listaNegociaacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        console.log(this._listaNegociaacoes.negociacoes);

    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor = 0.0;

        this._inputData.focus();
    }

}