import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isActive, setIsActive] = useState(false);

  const srchToggle = useCallback(() => {
    setIsActive(isActive === false);
  }, [isActive]);

  const values = useMemo(() => (
    { name: '', isSrchActive: isActive, srchToggle }), [isActive, srchToggle]);

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
