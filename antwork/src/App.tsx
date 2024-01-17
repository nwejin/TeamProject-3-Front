import React from 'react';
import CommunityMain from './community/CommunityMain';
import './styles/Component.scss';
import './styles/Header.scss';
import Header from './components/Header';

import './styles/Component.scss';

function App() {
  return (
    <div className="App">
    
      <Header></Header>
        <CommunityMain></CommunityMain>
      {/* <div className='class'>hi</div> */}

    </div>
  );
}

export default App;
