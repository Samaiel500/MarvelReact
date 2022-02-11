import { useState, useEffect } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => { 
    const [char, setChar] = useState(null);

    const {loaded, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = (char || loaded || error) ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const load = loaded ? <Spinner /> : null;
    const content = !(loaded || error || !char) ? <Viver char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {load}
            {errorMessage}
            {content}
        </div>
    )
}

const Viver = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let styleCard = { 'objectFit': 'cover' };
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styleCard = {'objectFit' : 'unset'};
            }
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleCard}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character...'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;