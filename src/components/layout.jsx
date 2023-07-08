import React from 'react';
import { SideMenu } from './components.jsx';
import { SidebarProvider,Navbar } from './components.jsx';

function Layout(props) {
  return (
    <SidebarProvider>
      <div className='grid grid-cols-3 md:grid-cols-6 md:min-h-screen'>
        <div className='hidden md:block'>
          <SideMenu />
        </div>
        <div className='col-span-3 md:col-span-5'>
          <Navbar/>
          <div className='px-8 py-8 md:py-16 md:px-24 '>
            {props.children}
          </div>
        </div>
      </div>
    </SidebarProvider>
    
  );
}

export default Layout
