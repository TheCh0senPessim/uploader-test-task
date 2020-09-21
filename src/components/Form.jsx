import React from 'react'
import PropTypes from 'prop-types'

const Form = ({fileName, handleChange, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" lang="ru" required onChange={handleChange}/>
                <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
            </div>
            <input type="submit" className="btn btn-primary mt-3" value="Загрузить"/>
        </form>
    )
}

Form.propTypes = {
    fileName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default Form;
