import React, {FC} from 'react';
import './Main.scss';
import Users from "../Users/Users";

interface MainProps {
  nextPage: () => void;
  users: User[];
  isLastPage: boolean;
}

const Main: FC<MainProps> = ({nextPage, users, isLastPage}) => (
    <main className="main">
      <h2 className="main__title page__title">
        Working with GET request
      </h2>

      <section className="main__users">
        <Users
            nextPage ={nextPage}
            users={users}
            isLastPage={isLastPage}
        ></Users>
      </section>
    </main>
);

export default Main;
