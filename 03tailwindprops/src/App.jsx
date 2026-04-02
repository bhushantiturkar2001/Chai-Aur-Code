import "./App.css";
import Cards from "./components/Cards";


function App() {
 
  let myObj = {

    userName : "ALice",
    age: 25

  }

  let newArray = [1,2,3,4,5]


  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl bg-center">
        Alice welcome to zombiland
      </h1>

      <Cards mission="Alice mission one" btnMsg="View mission full details"/>
      <Cards mission="Alice mission two" />
    </>
  );
}

export default App;
