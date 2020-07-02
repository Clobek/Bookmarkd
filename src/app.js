import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import CreateForm from './create.js'
import EditForm from './edit.js'


const App = (props) => {
    //Uses conditional rendering for create or edit form\\
    const createForm = ()=>{
        setCreateOrEdit(true);
    }

    const editForm = ()=>{
        setCreateOrEdit(false);
    }

    //Creates state\\
    const [bookmarks, setBookmarks] = React.useState(null)

    //State holds the bookmark we want to edit
    const [editBookmark, setEditBookmark] = React.useState({
        title: '',
        url: ''
    })

    const [createOrEdit, setCreateOrEdit] = React.useState(true)

    //Sets create form data to blank\\
    const blank = {
        title: "",
        url: ""
    }

    //Gets data from api route and sets it to a variable\\
    const getInfo = async () =>{
        const response = await fetch('https://bookmarkdapi.herokuapp.com/bookmarks')
        const result = await response.json()
        setBookmarks(result)
    }

    //Gets bookmarks from API\\
    React.useEffect(()=>{
        getInfo()
    }, [])

    //Function to handle create form\\
    const handleCreate = async (data)=>{
        const response = await fetch('https://bookmarkdapi.herokuapp.com/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        getInfo()
    }

    //Function to handle deleting a bookmark\\
    const handleDelete = async (id) =>{
        const response = await fetch(`https://bookmarkdapi.herokuapp.com/${id}`, {
            method: 'DELETE'
        })
        getInfo()
    }

    //Function runs on clicking edit\\
    const handleSelect = async (bookmark)=>{
        setEditBookmark(bookmark);
        editForm();
    }

    const handleEdit = async (data)=>{
        const response = await fetch(`https://bookmarkdapi.herokuapp.com/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        getInfo()
        createForm()
        console.log(response)
    }

    return(
        <div className="App">
            <div className="App__title">
            <h1>Bookmarks</h1>
            <button onClick={()=>{
                createForm()}}>
                +
            </button>
            </div>
            <div className="App__form">
            {createOrEdit 
            ? 
            <h2>Add a new bookmark</h2> 
            : 
            <h2>Edit existing bookmark</h2>
            }
            {createOrEdit 
            ? 
            <CreateForm initial={blank} handleSubmit={handleCreate}/> 
            : 
            <EditForm initial={editBookmark} handleSubmit={handleEdit}/>
            }
            </div>
            <div className="App__bookmarks">
                {bookmarks ? bookmarks.map((bookmark, index)=>{
                    console.log(bookmark.url)
                    return(
                        <div className={index % 2 === 0 ? "bookmark2" : "bookmark1"} key={bookmark._id}>
                            <div className="row">
                                <div className="column">
                                <a href={`http://${bookmark.url}`}>{bookmark.title}</a>
                                </div>
                                <div className="column">
                                    <button onClick={()=>{
                                        handleSelect(bookmark)
                                        }}>
                                        Edit
                                    </button>
                                </div>
                                <div className="column">
                                    <button onClick={()=>{
                                        handleDelete(bookmark._id)
                                        }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }) : 'Loading...'}
            </div>
        </div>
    )
}
    
const target = document.getElementById('app');
ReactDOM.render(<App />, target);
