import React from 'react';

function NUMCIR ({num}) {
    return (
        <div 
            style={{ 
                width: '15px', 
                height: '15px', 
                borderRadius: '50%', 
                backgroundColor: '#97C751', 
                color: 'white', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '9pt',
                verticalAlign: 'text-top',
                marginRight: '5px',
            }}>
            {num}
        </div>
    );
}

export { NUMCIR };