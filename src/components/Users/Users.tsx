import React, {FC} from 'react';
import './Users.scss';
import User from "../User/User";
import classNames from "classnames";

interface UsersProps {
  nextPage: () => void;
  users: User[];
  isLastPage: boolean;
}

const Users: FC<UsersProps> = ({users, nextPage, isLastPage}) => (
    <div className="users">
      <div className="users__container">
        {users.map(user =>
            <User user={user} key={user.id}></User>
        )}
      </div>

      <button
          disabled={!isLastPage}
          onClick={nextPage}
          className={classNames(
              'users__button button',
              {
                'button--disabled': !isLastPage,
              }
          )}
      >Show more</button>
    </div>
);

export default Users;
