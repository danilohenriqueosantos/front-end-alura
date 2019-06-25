import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';

export class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();

        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (resposta) {
                this.setState({ lista: resposta })
            }.bind(this),
            error: function (resposta) {
                console.log("Deu erro");

            }
        });
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}></InputCustomizado>
                    <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}></InputCustomizado>
                    <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}></InputCustomizado>
                    <BotaoSubmitCustomizado label="Gravar"></BotaoSubmitCustomizado>
                </form>

            </div>
        );
    }
}

export class TabelaAutores extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentWillMount() {
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        })
    }

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lista.map((autor) => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}