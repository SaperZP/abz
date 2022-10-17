import React, {FC} from 'react';
import './User.scss';
import defaultPhoto from '../../assets/photo-cover.svg';

interface UserProps {
  user: User
}

const User: FC<UserProps> = ({user}) => (
  <div className="user">
    <div className="user__pic-container">
      <img
        src={user.photo ? user.photo : defaultPhoto}
        alt="" className="user__pic"
      />
    </div>

    <p className="user__name">
      {user.name}
    </p>

    <div className="user__additional-info">
      <p className="user__position">
        {user.position}
      </p>
      <p className="user__email">
        {user.email}
      </p>
      <p className="user__phone">
        {user.phone}
      </p>
    </div>
  </div>
);

export default User;
