import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import AddUser from "./components/AddUser/AddUser";
import {getUsers} from "./api";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [fromPage, setFromPage] = useState('1');
  const [isLastPage, setIsLastPage] = useState(false);

  const nextPage = () => {
    setFromPage((currentPage) => (+currentPage + 1).toString())
  }

  const updateUsers = () => {
    setIsLoadingUsers(true)

    getUsers('1').then(response => {
      setUsers([...response.users]);
      setIsLastPage(!!response.links.next_url);
    })
    setIsLoadingUsers(false)
  }

  useEffect(() => {
    setIsLoadingUsers(true)
    getUsers(fromPage).then(response => {
      setUsers(
          (prevUsers) => [...prevUsers, ...response.users]
      )

      setIsLastPage(!!response.links.next_url);
      setIsLoadingUsers(false)
    })
  }, [fromPage])

  return (
      <div className="App">
        <div className="App__container">
          <Header></Header>
          {Object.keys(users).length &&
              <Main
                  nextPage={nextPage}
                  users={users}
                  isLastPage={isLastPage}
              />
          }
          {isLoadingUsers &&
              <Preloader/>
          }
          <AddUser updateUsers={updateUsers}/>
          {/*next div is a placeholder*/}
          <div></div>
        </div>
      </div>
  );
}

export default App;
