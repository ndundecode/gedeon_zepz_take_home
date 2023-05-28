import React from 'react'
import appLabel from '../../config/appLabel';

const Header = (props) => {
  const{children}=props
   return (
    <div className="App">
      <header className="header">
        <h4>
          {appLabel.gedeon} <code>{appLabel.company}</code> {appLabel.takeHome}
        </h4>
      </header>
    </div>
  );
}

export default Header