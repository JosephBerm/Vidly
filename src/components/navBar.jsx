import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

class Navbar extends React.Component
{
    render()
    {
        return (
            <nav className='navbar navbar-dark bg-dark'>
                <a
                    className='navbar-brand'
                    href='#'
                >
                    <i
                        class="fa fa-home fa-2x"
                        aria-hidden="true"
                        onClick={ () => window.location.reload() }>
                    </i>
                </a>
            </nav>
        );
    }
}

export default Navbar;

/*
<nav class="navbar navbar-dark bg-dark">
  <!-- Navbar content -->
</nav>
*/
