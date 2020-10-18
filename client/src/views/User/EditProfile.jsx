import React, { Component, useState, useEffect } from 'react';
import { editProfile } from './../../services/user';
import UserForm from '../../components/Form/UserForm';
import { loadUser } from '../../services/authentication';

const EditProfileView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { user } = await loadUser();
    setData(user);
  };

  return (
    <div className="edit-profile-view">
      <UserForm edit preloadValues={data} />
    </div>
  );
};

export default EditProfileView;
