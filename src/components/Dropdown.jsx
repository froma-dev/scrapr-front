import {useRef} from "react";

const Dropdown = ({data, onChange}) => {
    const selectRef = useRef(null);

    const {options} = data;

    return (
        <label className="dropdown" htmlFor="search-by-select">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                 className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down chevron-down">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 9l6 6l6 -6"/>
            </svg>
            <select
                ref={selectRef}
                onChange={onChange}
                name="searchby"
                id="search-by-select">
                <optgroup label="Buscar por">
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </optgroup>
            </select>
        </label>
    )
}

export default Dropdown;