import { children, createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoding] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    useEffect( () => {
        fetchFeedback()
    }, [])

    // fetch feedback
    const fetchFeedback = async () => {
        const responce = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await responce.json()
        setFeedback(data)
        setIsLoding(false)
    }

    //delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter( (item) => item.id !== id))
        }
    }
    //add feedback
    const addFeedback = (newFeedback) => {
        //console.log(newFeedback)
        newFeedback.id = uuidv4()
        setFeedback( [newFeedback, ...feedback] )
    }
    //edit to updated file
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true,
        })
    }
    //update feedback data
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item,...updItem} : item ))
    }
    
    return (
        <FeedbackContext.Provider value = {{ 
            feedback: feedback,
            deleteFeedback: deleteFeedback, 
            addFeedback: addFeedback,
            editFeedback: editFeedback,
            feedbackEdit,
            updateFeedback,
            isLoading,
            
        }} >
                {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext