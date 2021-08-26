import { func } from "prop-types";
import React from "react";

class Developer {
  constructor(firstName, secondName) {
    this.firstName = firstName;
    this.secondName = secondName;
  }
  getName() {
    return this.firstName + ' ' + this.secondName;
  }
}


const list = [
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

const List = () =>
  list.map(item =>
    <div key={item.objectID}>
      <span><a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments} </span>
      <span>{item.points} </span>
    </div>
  );

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




const App = () => {
  const handleChange = event => {
    console.log(event.target.value);
  }
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange} />
      <hr />
      <List />
    </div>
  );
};


export default App;
