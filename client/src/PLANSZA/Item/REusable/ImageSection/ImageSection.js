import React from 'react';

import classes from './ImageSection.module.css';

const imageSection = (props) => (
    <div className={classes.ImageSection}>
        <div>
            <img src={props.file} />
        </div>
        <div>
            <input type="file" accept="image/*" onChange={props.handleChange} />
        </div>
    </div>
);

export default imageSection;
