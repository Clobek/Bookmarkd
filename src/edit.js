import React from 'react';

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return(
        <div className="App__form--edit">
        <input 
        type="text" 
        name="title" 
        value={formData.title}
        placeholder="Website"
        onChange={handleChange}
        >
        </input>
        <input 
        type="text" 
        name="url" 
        value={formData.url}
        placeholder="http://"
        onChange={handleChange}
        >
        </input>
        <button
            onClick={() => {
                props.handleSubmit(formData);
            }}
        >
        UPDATE
        </button>
        </div>
    )
}