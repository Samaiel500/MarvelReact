import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMassage/ErrorMassage';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offSet, setOffSet] = useState(30);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loaded, error, getComics } = useMarvelService();

    const updateList = (offSet, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getComics(offSet).then(res => onComicsList(res));
    }

    const onComicsList = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffSet(offSet => offSet + 8);
        setComicsEnded(ended);
    }

    useEffect(() => {
        updateList(offSet, true);
    }, [])

    const list = comicsList.map((item, i) => {
        const { id, title, thumbnail, price } = item;
        return (
            <li key={i} className="comics__item">
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price ? price : 'NOT AVALIBLE'}</div>
                </Link>
            </li>
        )
    })

    const spinner = loaded && !newComicsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {list}
            </ul>
            <button style={{'display': comicsEnded ? 'none' : 'block'}} disabled={newComicsLoading} onClick={() => updateList(offSet)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;