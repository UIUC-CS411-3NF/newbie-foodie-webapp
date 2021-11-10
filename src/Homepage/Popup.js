import React from 'react';

const Popup = (props) => (
  <div
    style={{
      position: 'fixed',
      background: '#00000050',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      top: 0,
      left: 0,
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '70%',
        height: 'auto',
        background: '#fff',
        overflow: 'auto',
        maxHeight: '70vh',
        marginTop: 'calc(100vh - 85vh - 20px)',
        background: '#fff',
        margin: '0 auto',
        borderRadius: '4px',
        padding: '20px',
        border: '1px solid #999',
      }}
    >
      <span
        style={{
          content: 'x',
          cursor: 'pointer',
          position: 'fixed',
          right: 'calc(15% - 13px)',
          top: 'calc(29%)',
          background: '#ededed',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          lineHeight: '20px',
          textAlign: 'center',
          border: '1px solid #999',
          fontSize: '20px',
        }}

        onClick={props.handleClose}
      >
        x
      </span>
      {props.content}
    </div>
  </div>
);

export default Popup;
