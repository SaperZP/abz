import React, {FC} from 'react';
import './Main.scss';
import Users from "../Users/Users";

interface MainProps {
  addUsers: () => void;
  users: User[];
  isLastPage: boolean;
}

const Main: FC<MainProps> = ({addUsers, users, isLastPage}) => (
    <main className="main">
      <h2 className="main__title page__title" id="users">
        Working with GET request
      </h2>

      <section className="main__users">
        <Users
            nextPage ={addUsers}
            users={users}
            isLastPage={isLastPage}
        ></Users>
      </section>
    </main>
);

export default Main;
