import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] }
        this.login = this.props.login;
    }

    componentWillMount() {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            this.setState({ fotos });
        });
        Pubsub.subscribe('atualiza-liker', (topico, infoLiker) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId)
            fotoAchada.likeada = !fotoAchada.likeada;
            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login)

            if (possivelLiker === undefined) {
                fotoAchada.likers.push(infoLiker.liker);
                this.setState({ fotos: this.state.fotos });
            } else {
                const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                this.setState({ novosLikers })
            }
            Pubsub.subscribe('atualiza-liker', (topico, infoLiker) => {
                if (this.props.foto.id === infoLiker.fotoId) {
                    const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login)
                    if (possivelLiker === undefined) {
                        const novosLikers = this.state.likers.concat(infoLiker.liker)
                        this.setState({ likers: novosLikers });
                    } else {
                        const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
                        fotoAchada.likers = novosLikers;
                        this.setState({ novosLikers })
                    }
                    this.setState({ fotos: this.state.fotos });
                }
            });

            Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {
                const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId)
                fotoAchada.comentarios.push(infoComentario.novoComentario);
                this.setState({ fotos: this.state.fotos })

            });

        });

        Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {
            if (this.props.foto.id === infoComentario.fotoId) {
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({ comentarios: novosComentarios })
            }
        });
    }
    carregaFotos() {

        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos })
            });
    }


    componentDidMount() {
        this.carregaFotos();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos(nextProps);
        }
    }

    like(fotoId) {
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH_TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível realizar o like da foto');
                }
            })
            .then(liker => {
                Pubsub.publish('atualiza-liker', { fotoId, liker });
            });
    }

    comenta(fotoId, textoComentario) {
        const resquestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: textoComentario }),
            header: new Headers({
                'Content-type': 'application/json'
            })

        };
        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH=TOKEN=${localStorage.getItem('auth-token')}`, resquestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível comentar");
                }
            })
            .then(novoComentario => {
                Pubsub.publish('novos-comentarios', { fotoId, novoComentario })
            })
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta} />)
                    }
                </ReactCSSTransitionGroup>
            </div>

        );
    }
}