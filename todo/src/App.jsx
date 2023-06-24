import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isChecked, setChecked] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [filterInput, setFilterInput] = useState("");

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
    setFilterTodos(
      filterTodos.filter((element, index) => index !== indexToRemve)
    );
  };

  const handleCheck = (event, index) => {
    if (event.target.checked) {
      console.log("if", event.target.value);
      setChecked([...isChecked, index]);
    } else {
      console.log(isChecked, index);
      setChecked(isChecked.filter((checkedIndex) => checkedIndex !== index));
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-6">
          <h3>Todo App</h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your Todo..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItemToList();
              }
            }}
          />

          <button onClick={addItemToList} className="btn btn-primary mx-3">
            Submit
          </button>
          {todos.map((element, index) => (
            <li key={index} className="mb-2">
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
        </div>
        {/* //// second input */}
        <div className="col-6">
          <h3>Checking Todo</h3>
          <input
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="Enter your Todo to check..."
          />
          <button onClick={filterTodosFunc} className="btn btn-primary mx-3">
            Submit
          </button>
          {filterTodos.map((element, index) => (
            <li key={index} className="mb-2">
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
      </div>
    </div>
  );
}
export default App;
