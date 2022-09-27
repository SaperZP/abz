import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import AddUser from "./components/AddUser/AddUser";
import {getUsers} from "./api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [fromPage, setFromPage] = useState('1');
  const [isLastPage, setIsLastPage] = useState(false);

  const nextPage = () => {
    setFromPage((currentPage) => (+currentPage + 1).toString())
  }

  const updateUsers = () => {
    getUsers('1').then(response => {
      setUsers([...response.users])

      setIsLastPage(!!response.links.next_url);
    })
  }

  useEffect(() => {
    getUsers(fromPage).then(response => {
      setUsers(
          (prevUsers) => [...prevUsers, ...response.users]
      )

      setIsLastPage(!!response.links.next_url);
    })
  }, [fromPage])

  return (
      <div className="App">
        <div className="App__container">
          <Header></Header>
          <Main
              nextPage={nextPage}
              users={users}
              isLastPage={isLastPage}
          />
          <AddUser updateUsers={updateUsers}/>
          <div></div>
        </div>
      </div>
  );
}

export default App;
