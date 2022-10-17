import React, {FC} from 'react';
import './Users.scss';
import User from '../User/User';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import * as actions from '../../store/usersReducer';

const Users: FC = () => {
  const {users, fromPage, isLastPage} = useAppSelector((state) => state.usersData);
  const dispatch = useAppDispatch();

  return (
    <div className="users">
      <div className="users__container">
        {users.map(user =>
          <User user={user} key={user.id}></User>
        )}
      </div>

      <button
        disabled={!isLastPage}
        onClick={() => dispatch(actions.addUsersFromServer(fromPage))}
        className={classNames(
          'users__button button',
          {
            'button--disabled': !isLastPage,
          }
        )}
      >Show more
      </button>
    </div>
  );
};

export default Users;
