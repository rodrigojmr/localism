import React from 'react';

const UserContext = React.createContext({ currentUser: {}, setUser: () => {} });

export default UserContext;
