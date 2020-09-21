import React from 'react'
import PropTypes from 'prop-types'

const ErrorDialog = ({handleError}) => {
    return (
        <div>
            <div className="alert alert-warning" role="alert">Ошибка загрузки</div>
            <button className="btn btn-primary mt-3 mb-3" onClick={handleError}>Возобновить</button>
        </div>
    )
}

ErrorDialog.propTypes = {
    handleError: PropTypes.func.isRequired,
}

export default ErrorDialog
