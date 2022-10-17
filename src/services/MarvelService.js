import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    //const _apiComics = 'https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=30&'
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=72b9d98c559269c8102fa10649839153';
    const _numCharacter = 190;
    const _numComics = 30;

    const getAllCharacters = async (numCharacter = _numCharacter) => {
        const req = await request(`${_apiBase}characters?limit=9&offset=${numCharacter}&${_apiKey}`)
        return req.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const req = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(req.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComics = async (numComics = _numComics) => {
        const req = await request(`${_apiBase}comics?limit=8&offset=${numComics}&${_apiKey}`)
        return req.data.results.map(_transformComics)
    }

    const getComic = async (numComic) => {
        const req = await request(`${_apiBase}comics/${numComic}?${_apiKey}`)
        return _transformComics(req.data.results[0])
    }

    const _transformComics = (char) => {
        return {
            id: char.id,
            title: char.title,
            description: char.description || 'There is no description',
            pageCount: char.pageCount ? `${char.pageCount} p.` : 'No information about the number of pages',
            price: char.prices[0].price ? `${char.prices[0].price}$` : 'not available',
            language: char.textObjects.language || 'en-us',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${ char.description.slice(0, 210) }...` : 'Something information about this hero...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {process, setProcess, getAllCharacters, getCharacter, getComics, getComic, clearError, getCharacterByName}
}

export default useMarvelService;