import React from 'react';

const Pageheading = (props) => {
    const headingText = props.children
    return(
                <h1 className="text-center page-name">{headingText}</h1>
    )
};

export default Pageheading;