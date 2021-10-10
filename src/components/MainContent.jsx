import React from 'react'

function MainContent() {
    return (
        <div className="main-content-container">
        <h1>main contentrfe Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem aliquam sit perspiciatis deleniti in eum quasi error deserunt ad tempora? Dolorum eveniet at, magni nemo officiis illum nobis facere enim? Ipsa similique maiores, eum debitis ipsam eaque explicabo aperiam, voluptates eligendi deserunt tenetur, at provident perspiciatis labore voluptas distinctio. Perspiciatis!</h1>
        </div>
    )
}

const Heading = (props) => {
    const { headingText } = props.children
    return(
        <div className="row">
                <h1>{props.children}</h1>
        </div>


    )
}
export default MainContent
