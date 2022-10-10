import React, {FC} from 'react';
import './Main.scss';
import Users from "../Users/Users";

interface MainProps {}

const Main: FC<MainProps> = () => (
    <main className="main">
      <h2 className="main__title page__title" id="users">
        Working with GET request
      </h2>

      <section className="main__users">
        <Users></Users>
      </section>
    </main>
);

export default Main;
