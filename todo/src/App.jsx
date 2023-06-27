import { useState, useEffect } from "react";
import "./App.css";
import ProgressBar from "react-progressbar";
import UnlockImageComponent from "./components/unlockImage";
import LockImageComponent from "./components/lockimage";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isChecked, setChecked] = useState([]);

  const [filterTodos, setFilterTodos] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const [credentials, setCredentials] = useState([]);
  const [credentialInput, setCredentialInput] = useState("");

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    calculateProgress();
  }, [isChecked]);

  const filterTodosFunc = () => {
    if (todos.includes(filterInput)) {
      const index = todos.indexOf(filterInput);
      setChecked([...isChecked, index]);
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

  const deleteItemInFilterTodos = (indexToRemove) => {
    setFilterTodos(
      filterTodos.filter((element, index) => index !== indexToRemove)
    );
  };

  const handleCheck = (event, index) => {
    if (event.target.checked) {
      setChecked([...isChecked, index]);
    } else {
      setChecked(isChecked.filter((checkedIndex) => checkedIndex !== index));
    }
  };

  const addingCredentials = () => {
    if (credentialInput !== "") {
      credentials.push({ value: credentialInput, hidden: true });
      setCredentials([...credentials]);
      setCredentialInput("");
    }
  };

  const deleteItemInCredentials = (itemToRemove) => {
    setCredentials(
      credentials.filter((element, index) => index !== itemToRemove)
    );
    calculateProgress();
  };

  const calculateProgress = () => {
    const checkedCredentials = credentials.filter((credential, index) =>
      isChecked.includes(index)
    );
    const progress = Math.trunc(
      (checkedCredentials.length / credentials.length) * 100
    );
    setProgressPercentage(progress);
    console.log(progress);

    if (checkedCredentials.length > 0) {
      setShowUnlock(checkedCredentials.length === credentials.length);
    } else {
      setShowUnlock(false);
    }
  };

  return (
    <div className="container text-center">
      <div className="row row-cols-2">
        <div className="col">
          <h3>🆃🅾🅳🅾 🅰🅿🅿</h3>
          <input
            className="my-4"
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
            Add your Todo
          </button>
          <div className="scroll-container">
            <ul className="list">
              {todos.map((element, index) => (
                <li key={index} className="mb-2 my-3">
                  <input
                    className="mx-2"
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
                    className="btn btn-danger mx-3 delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* //// checking todo input */}
        <div className="col">
          <h3>🅲🅷🅴🅲🅺🅸🅽🅶 🆃🅾🅳🅾</h3>
          <input
            className="my-4"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="Enter your Todo to check..."
          />
          <button onClick={filterTodosFunc} className="btn btn-primary mx-3">
            Check Todo
          </button>
          <div className="scroll-container">
            <ul className="list">
              {filterTodos.map((element, index) => (
                <li key={index} className="mb-2 my-3">
                  {element}
                  <button
                    onClick={() => {
                      deleteItemInFilterTodos(index);
                    }}
                    className="btn btn-danger mx-3 delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* //// credentials input */}
        <div className="col my-5">
          <h3>🅲🆁🅴🅳🅴🅽🆃🅸🅰🅻🆂</h3>
          <input
            className="my-4"
            value={credentialInput}
            onChange={(e) => setCredentialInput(e.target.value)}
            placeholder="Enter your credential..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addingCredentials();
              }
            }}
          />
          <button onClick={addingCredentials} className="btn btn-primary mx-3">
            Add your Credential
          </button>
          <div className="scroll-container">
            <ul className="list">
              {credentials.map((element, index) => (
                <li key={index} className="mb-2 my-3">
                  <span>
                    {element.hidden
                      ? "*".repeat(element.value.length)
                      : element.value}
                  </span>
                  <button
                    onClick={() => {
                      deleteItemInCredentials(index);
                    }}
                    className="btn btn-danger mx-3 delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* //// progress lock */}
        <div className="col my-5">
          <h3>🆂🆃🅰🆃🆄🆂</h3>
          {showUnlock ? <UnlockImageComponent /> : <LockImageComponent />}
          <ProgressBar completed={progressPercentage}>
            <div className="progressbar-label">{`${progressPercentage}%`}</div>
          </ProgressBar>
        </div>
      </div>
    </div>
  );
}
export default App;
