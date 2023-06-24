import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isChecked, setChecked] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  // const filterTodosFunc = () => {
  //   if (todos.includes(filterInput)) {
  //     if (filterInput !== "") filterTodos.push(filterInput);
  //     setFilterTodos([...filterTodos]);
  //     setFilterInput("");
  //   } else {
  //     alert("😊 enter vaild todo 😊😂");
  //     setFilterInput(" ");
  //   }
  // };

  const filterTodosFunc = () => {
    if (todos.includes(filterInput)) {
      const index = todos.indexOf(filterInput);
      setChecked([...isChecked, index]);
      console.log("index", index);
      if (index !== -1) {
        if (filterInput !== "") filterTodos.push(filterInput);
        setFilterTodos([...filterTodos]);
        setFilterInput("");
      }
    } else {
      alert("😊 enter valid todo 😊😂");
      setFilterInput(" ");
    }
  };

  const addItemToList = () => {
    if (input !== "") todos.push(input);
    setTodos([...todos]);
    setInput("");
  };

  const deleteItem = (indexToRemve) => {
    setTodos(todos.filter((element, index) => index !== indexToRemve));
  };

  const deleteItemInFilterTodos = (indexToRemve) => {
    setFilterTodos(filterTodos.filter((element, index) => index !== indexToRemve));
  };

  const handleCheck = (event, index) => {
    if (event.target.checked) {
      console.log("if", event.target.value);
      setChecked([...isChecked, index]);
    } else {
      setChecked(isChecked.filter((element, idx) => idx !== index));
      console.log("else", event.target.value);
    }
  };
  console.log("isChecked", isChecked);

  return (
    <div className="container">
      <input
        type="text"
        name=""
        id=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your Todo..."
        onKeyDown={(e) => {
          e.key === "Enter" && { addItemToList };
        }}
      />
      <button onClick={addItemToList} className="btn btn-primary mx-3">
        Submit
      </button>
      {todos.map((element, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={isChecked.includes(index)}
            onChange={(event) => {
              handleCheck(event, index);
            }}
          />

          {element}
          <button
            onClick={() => {
              deleteItem(index);
            }}
            className="btn btn-danger mx-3"
          >
            Delete
          </button>
        </li>
      ))}

      {/* //// second input */}
      <input
        type="text"
        name=""
        id=""
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder="Enter your Todo..."
        onKeyDown={(e) => {
          e.key === "Enter" && { filterTodosFunc };
        }}
      />
      <button onClick={filterTodosFunc} className="btn btn-primary mx-3">
        Submit
      </button>
      {filterTodos.map((element, index) => (
        <li key={index}>
          {element}
          <button
            onClick={() => {
              deleteItemInFilterTodos(index);
            }}
            className="btn btn-danger mx-3"
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}
export default App;
