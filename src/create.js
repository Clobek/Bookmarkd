import React from 'react';
export default (props) => {
    const [formData, setFormData] = React.useState(props.initial)

    React.useEffect(()=>{
        setFormData(props.initial);
    }, [props.initial])

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    return(
        <div className="App__form--create">
        <input 
        type="text" 
        name="title" 
        value={formData.title}
        placeholder="Bookmark name"
        onChange={handleChange}
        >
        </input>
        <input 
        type="text" 
        name="url" 
        value={formData.url}
        placeholder="www.example.com"
        onChange={handleChange}
        >
        </input>
        <button
            onClick={() => {
                props.handleSubmit(formData);
                setFormData(props.initial);
            }}
        >
        ADD
        </button>
        </div>
    )
}