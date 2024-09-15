
import Dropdown from "./Dropdown.jsx";
import {useState, useRef} from 'react'
import Scraper from "../services/scraper.js";

const {PUBLIC_PDF_URL} = import.meta.env
const {list} = await Scraper.scrapePdfFrom(PUBLIC_PDF_URL, {scrapeFile: true})

const INPUT_LENGTH_TO_SEARCH = 3
const SEARCH_BY = {
    DNI: 'dni',
    NAME: 'name'
}
const SELECT_OPTIONS = {
    options: [
        {text: 'Nombre', value: 'name'},
        {text: 'DNI', value: 'dni'}
    ]
}
let filteredList = []

const SadIcon = () => (<>
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
         fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-mood-sad">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 9.86a4.5 4.5 0 0 0 -3.214 1.35a1 1 0 1 0 1.428 1.4a2.5 2.5 0 0 1 3.572 0a1 1 0 0 0 1.428 -1.4a4.5 4.5 0 0 0 -3.214 -1.35zm-2.99 -4.2l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm6 0l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"/>
    </svg>
</>)

const SearchIcon = () => (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="icon icon-tabler icons-tabler-outline icon-tabler-search search-icon">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
        <path d="M21 21l-6 -6"/>
    </svg>
</>)

const SearchResults = () => {
    const [searchResult, setSearchResult] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [searchBy, setSearchBy] = useState(SEARCH_BY.NAME)
    const inputRef = useRef(null)

    const onInputChange = (ev) => {
        const newInputValue = ev.target.value
        const prevInputValue = inputValue

        setInputValue(newInputValue)

        if (newInputValue.length >= INPUT_LENGTH_TO_SEARCH) {
            let reFilterList = prevInputValue.length > newInputValue.length

            if (reFilterList || newInputValue.length === INPUT_LENGTH_TO_SEARCH) {
                filteredList = list.filter(item => item[searchBy].includes(newInputValue.toUpperCase()))
            } else {
                filteredList = filteredList.filter(item => item[searchBy].includes(newInputValue.toUpperCase()))
            }

            setSearchResult((prevState) => filteredList)
        } else if (searchResult.length > 0) {
            setSearchResult((prevState) => [])
        }
    }

    const displaySearchResult = () => {
        const searchResultsHeader = () => {
            const searchResultLength = searchResult.length

            if (searchResultLength === 0 && inputValue.length >= INPUT_LENGTH_TO_SEARCH) {
                return (<>
                    <SadIcon/>
                    <h2 className="title">Sin resultados para "{inputValue.toUpperCase()}"</h2>
                </>)
            } else if (searchResultLength === 0 && inputValue.length < INPUT_LENGTH_TO_SEARCH) {
                return (<h2 className="title">
                    {`Escriba tres ${searchBy === SEARCH_BY.DNI ? 'digitos' : 'letras'} para iniciar la busqueda`}
                </h2>)
            } else {
                return (<h2 className="title">{searchResultLength} Resultado{searchResultLength > 1 ? 's' : ''}</h2>)
            }
        }

        const SearchResults = () => (
            <table className="search-table">
                <thead>
                <tr>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre</th>
                </tr>
                </thead>
                <tbody>
                {searchResult.map(item => (
                    <tr key={item.id}>
                        <td>{item.dni}</td>
                        <td scope="row">{item.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>)

        return (
            <section className="search-results">
                <header className="header">{searchResultsHeader()}</header>
                {searchResult.length > 0 && SearchResults()}
            </section>)
    }

    const handleSelectChange = (ev) => {
        const newInputValue = ev.target.value

        if (newInputValue !== searchBy) {
            reset()
        }

        setSearchBy((prevState) => newInputValue)
        inputRef.current?.focus()
    }

    const reset = () => {
        setSearchResult([])
        setInputValue('')
        setSearchBy('')
    }

    return (
        <>
            <label className="search-input-label">
                <Dropdown onChange={handleSelectChange} data={SELECT_OPTIONS}/>
                <div className="v-delimiter"></div>
                <SearchIcon/>
                <input ref={inputRef}
                       className={`search-input ${inputValue.length === 0 ? "empty" : ""}`}
                       type="text"
                       value={inputValue}
                       placeholder={searchBy === SEARCH_BY.DNI
                           ? "Escriba su DNI"
                           : "Escriba su nombre"}
                       onChange={onInputChange}
                       autoFocus={true}
                />
            </label>
            {displaySearchResult()}
        </>
    )
}

export default SearchResults