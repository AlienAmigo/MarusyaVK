import React from 'react';
import classNames from 'classnames';

import st from './Profile.module.scss';

export interface IProfile {
  className?: string;
}

const Profile: React.FC<IProfile> = ({ className }) => {
  const classes = classNames(st.Profile, className);

  return <div className={classes}>Profile</div>;
};

export default Profile;
