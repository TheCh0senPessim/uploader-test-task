import React from 'react'
import PropTypes from 'prop-types'

const Message = ({message, onCloseClick}) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onCloseClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
}

export default Message;
