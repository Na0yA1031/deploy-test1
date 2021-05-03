import React from 'react';
import Button from '@material-ui/core/Button';

const PrimaryButton = (props) => {
    return (
        <Button
            variant='contained'
            color='primary'
            onClick={props.onClick}
            endIcon={props.icon}
        >
            {props.text}
        </Button>
    )
}

export default PrimaryButton;