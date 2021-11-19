import React from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete({ onSelectItem }) {
    const [searchText, setSearchText] = React.useState("");
    const [queryText, setQueryText] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const debouncedQuerySetter = React.useCallback(lodash.debounce(setQueryText, 500), []);
    const onSearchChange = (event) => {
        const inputText = event.target.value;
        setSearchText(inputText);
        debouncedQuerySetter(inputText);
    };
    React.useEffect(() => {
        if (queryText) {
            const callApi = axios({
                url: ITEMS_API_URL,
                params: {
                    q: queryText
                },
            });
            setIsSearching(true);
            setSuggestions([]);
            callApi.then(response => {
                setIsSearching(false);
                setSuggestions(response.data);
            });
        } else {
            setSuggestions([]);
        }
    }, [queryText]);
    const renderList = () => {
        if (suggestions && suggestions.length) {
            return (
                <div className="list is-hoverable" >
                    {suggestions.map((i, index) => {
                        return (
                            <a className="list-item"
                               key={index}
                               href="javascript:void(0);"
                               onClick={() => { onSelectItem(i); }}>{i}</a>
                        );
                    })}
                </div>
            );
        } else {
            return null;
        }
    };
    return (
        <div className="wrapper">
            <div className={classnames("control", isSearching ? "is-loading" : "")}>
                <input type="text"
                       className="input"
                       value={searchText}
                       onChange={(e) => { onSearchChange(e); }} />
            </div>
            {renderList()}
        </div>
    );
}
