import { useState, useEffect,useRef } from 'react';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMassage/ErrorMassage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loaded':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offSet, setOffSet] = useState(190);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateList(offSet, true);
    }, [])

    const updateList = (offSet, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offSet)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
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

    const items = arr => {
        const card = arr.map((item, i) => {
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
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {card}
                </TransitionGroup>
            </ul>
        )
    }

    return (
        <div className="char__list">
            {setContent(process, () => items(charList), newItemLoading)}
            <button style={{'display': charEnded ? 'none' : 'block'}} disabled={newItemLoading} onClick={() => updateList(offSet)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )  
}

export default CharList;