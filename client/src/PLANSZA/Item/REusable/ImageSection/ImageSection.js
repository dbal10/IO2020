import React from 'react';

import classes from './ImageSection.module.css';

const imageSection = (props) => (
    <form className={classes.ImageSection} onChange={props.handleChange} >
        <div>
            <img src={`data:image/jpeg;base64,${props.file}`} />
        </div>
        <div>
            <input type="file" accept="image/*" />
        </div>
    </form>
);

export default imageSection;
