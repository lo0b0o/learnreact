import React from "react";

// class Developer {
//   constructor(firstName, secondName) {
//     this.firstName = firstName;
//     this.secondName = secondName;
//   }
//   getName() {
//     return this.firstName + ' ' + this.secondName;
//   }
// }




const List = ({ list, onRemoveItem }) =>
  list.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />);

const Item = ({ item, onRemoveItem }) => {
  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </div>);
};

// function List(){
//   const robin = new Developer('Robin', 'Wieruch');
//   const dennis = new Developer('Dennis', 'Wieruch');
//   return(
//     <div>
//       {robin.getName()};
//       {dennis.getName()};
//     </div>
//   );
// }

const InputWithLabel = ({ id, children, value, onInputChange, type, isFocused }) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        onchange={onInputChange}
        value={value}
      />
    </>
  );
}

// const Search = ({ onSearch, search }) =>

//   <>
//     <label htmlFor="search">Search:</label>
//     <input
//       id="search"
//       type="text"
//       onChange={onSearch}
//       value={search}
//     />
//   </>

const useSemiPersistantState = (key, initialState) => {
  const [value, setValue] =
    React.useState(localStorage.getItem(key) || initialState);
  React.useEffect(() => localStorage.setItem(key, value), [value, key]);
  return [value, setValue];
}
const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const App = () => {
  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStories = item => {
    const newStories = stories.filter(story => item.objectID !== story.objectID);
    setStories(newStories)
  }

  const [searchTerm, setSearchTerm] = useSemiPersistantState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    // localStorage.setItem('search', event.target.value);
    // localStorage.setItem('search', searchTerm)
  }
  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div>
      <h1>My Hacker Stories</h1>
      {/* <Search onSearch={handleSearch} search={searchTerm} /> */}
      <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch} type='text' isFocused>
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStories} />
    </div>
  );
};


export default App;
