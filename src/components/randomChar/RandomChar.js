import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const { loaded, error, getCharacter, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }
    
    useEffect(() => {
        updateChar();
    }, [])
    /* componentDidMount() {
        console.log('mount')
        this.updateChar();
        const timerId = setInterval(this.updateChar, 3000)
    } */
    /* componentWillUnmount() {
        console.log('unmount')
        clearInterval(this.timerId)
    } */

    const errorMessage = error ? <ErrorMessage /> : null;
    const load = loaded ? <Spinner /> : null;
    const content = !(loaded || error) ? <Viver char={char} /> : null;
    
    return (
        <div className="randomchar">
            {errorMessage}
            {load}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )  
}

const Viver = ({char}) => {
    const { name, thumbnail, description, homepage, wiki } = char;
    let letStyle = {'objectFit': 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        letStyle = {'objectFit': 'unset'}
    }
    return (
        <div className="randomchar__block">
            <img style={letStyle} src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;