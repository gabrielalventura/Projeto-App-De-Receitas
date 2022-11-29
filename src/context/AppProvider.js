import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const srchToggle = useCallback(() => {
    setIsActive(isActive === false);
  }, [isActive]);
  
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState({});

  const values = useMemo(() => ({
    user,
    setUser,
    isSrchActive: isActive,
    srchToggle,
  }), [user, isActive, srchToggle]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default AppProvider;
