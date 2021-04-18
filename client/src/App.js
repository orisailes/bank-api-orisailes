import axios from "axios"
import React,{useEffect,useState} from 'react'
import Card from './Card'

function App() {

const [users,setUsers] = useState([])
const [usersDidFetched,setUsersDidFetched] = useState(false)

useEffect(() => {
  
  const fetchData = async () => {
    const data = await axios.get('/api/clients');
    console.log(data)
    setUsers(data.data);
    setUsersDidFetched(true)
  }

  fetchData();

}, [])

  return (
    <div className="App">
      {
      usersDidFetched ? 
      users.map((user)=><Card user={user}/>)
      :
      <div> Loading ... </div>
      }
    </div>
  );
}

export default App;
