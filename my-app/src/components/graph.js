import React from 'react';
import Node from './node'

const Tree = (props) => {

    return (
        <div>
            {props.nodes.map((node, index) => (
                <div key={index}>
                    <Node value={node.value} />
                </div>
            ))}
        </div>
    );
}

export default Tree;