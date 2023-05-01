import React from 'react';
import { SideMenu } from './components.jsx';
import { SidebarProvider } from './components.jsx';

function Layout(props) {
  return (
    <SidebarProvider>
      <div className='grid grid-cols-6 min-h-screen'>
        <div>
          <SideMenu />
        </div>
        <div className='py-16 px-24 col-span-5'>
          {props.children}
        </div>
      </div>
    </SidebarProvider>
    
  );
}

export default Layout
