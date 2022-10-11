import { useState, useEffect,useRef } from 'react';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMassage/ErrorMassage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offSet, setOffSet] = useState(190);
    const [charEnded, setCharEnded] = useState(false);

    const {loaded, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        updateList(offSet, true);
    }, [])

    const updateList = (offSet, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offSet)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffSet(offSet => offSet + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const changeStyle = (id) => {
        itemRefs.current.forEach(el => el.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const card = charList.map((item, i) => {
        const { name, thumbnail, id } = item;
        let styleCard = { 'objectFit': 'cover' };
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            styleCard = {'objectFit' : 'unset'};
        }
        return (
            <CSSTransition key={id} timeout={500} classNames="char__item">
                <li ref={el => itemRefs.current[i] = el} 
                    tabIndex={0}
                    onClick={() => { props.onCharId(id); changeStyle(i) }}
                    className="char__item"
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharId(id);
                            changeStyle(i);
                        }
                    }}>
                    <img style={styleCard} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            </CSSTransition>
        )
    })
    const spinner = loaded && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {card}
                </TransitionGroup>
            </ul>
            <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItemLoading} onClick={() => updateList(offSet)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )  
}

export default CharList;