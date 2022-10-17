import React, {FC} from 'react';
import './Main.scss';
import Users from '../Users/Users';

const Main: FC = () => (
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
