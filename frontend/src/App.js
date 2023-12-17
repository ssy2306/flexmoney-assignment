
import './App.css';
import UserForm from './UserForm'
function App() {
  return (
    <div className="App">
      <div style={{ paddingTop: '10px'}}>
      <h1 style={{ color: 'white'}}>Yoga classes for just 500Rs.</h1> <br/>
       <UserForm />
      </div>
    </div>
  );
}

export default App;
