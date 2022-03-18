import * as React from 'react';

const User = React.createContext({theme: 'light', storage: window.localStorage});

export default User