import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import AddUser from './components/AddUser/AddUser';
import Preloader from './components/Preloader/Preloader';
import * as actions from './store/usersReducer';
import { useAppSelector, useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoadingUsers } = useAppSelector((state) => state.usersData);

  useEffect(() => {
    dispatch(actions.addUsersFromServer(1));
  }, []);

  return (
    <div className="App">
      <div className="App__container">
        <Header></Header>

        {!!Object.keys(users).length && <Main />}

        {isLoadingUsers && <Preloader />}

        <AddUser />

        {/*next div is a placeholder*/}
        <div></div>
      </div>
    </div>
  );
}

export default App;
