import React, { Component } from 'react';

class FotoAtualizacoes extends Component {
    render(){
        return (
            <section className="fotoAtualizacoes">
              <a href="#" className="fotoAtualizacoes-like">Likar</a>
              <form className="fotoAtualizacoes-form">
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>            
        );
    }
}

class FotoInfo extends Component {
    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                <a href="#">
                  alots_ssa
                </a>

                ,

                <a href="#">
                  rafael_rollo
                </a> 

                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
              </p>

              <ul className="foto-info-comentarios">
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                </li>
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
                </li>
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
                </li>
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src="https://instagram.fcgh3-1.fna.fbcdn.net/vp/8fd15d6d6e7d5b6014e25d5dc4450b60/5DC46582/t51.2885-19/s150x150/37953285_370883140129782_1880302635983044608_n.jpg?_nc_ht=instagram.fcgh3-1.fna.fbcdn.net" alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <a href="#">
                    alots
                  </a>  
                </figcaption>
              </figure>
              <time className="foto-data">03/10/2016 20:13</time>
            </header>            
        );
    }
}

export default class Foto extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader/>
            <img alt="foto" className="foto-src" src="https://cdn.pixabay.com/photo/2019/04/13/19/10/bowl-of-fruit-in-rain-4125348__340.jpg"/>
            <FotoInfo/>
            <FotoAtualizacoes/>
          </div>            
        );
    }
}