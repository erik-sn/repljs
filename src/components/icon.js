import React from 'react';

const Icon = (props) => {
  const { name, click, content } = props;
  return (
    <div className={`${name}-container`} onClick={click} >
      <div className={name}>{content}</div>
    </div>
  );
};

export default Icon;