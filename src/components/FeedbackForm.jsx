import Card from "./shared/Card"
import { useState, useContext, useEffect } from "react"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "./context/FeedbackContext"

function FeedbackForm() {
    const [ text, setText] = useState('')
    const [ rating, setRating] = useState('')
    const [ btnDisabled, setBtnDisabled] = useState(true)
    const [ message, setMessage] = useState('')

    const {addFeedback, feedbackEdit,updateFeedback} = useContext(FeedbackContext)

    useEffect( () => {
        //console.log("hello")
        if (feedbackEdit.edit === true ) { 
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if ( text === ''){
            setBtnDisabled(true)
            setMessage('')
        }else if ( text !== '' && text.trim().length <10 ){
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        }else{
            setBtnDisabled(false)
            setMessage('')
        }
        setText(e.target.value)
    }   

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating,
            }
           if (feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
           }else{
            addFeedback(newFeedback)
           }
            
            setText('')
        }
        
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
           
            <h2> How would you rate your service with us ? </h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className = "input-group">
                <input type = "text" onChange={handleTextChange} placeholder="Write a review" value={text}/> 
                <Button type="submit" isDisabled={btnDisabled }> Send </Button>
            </div>
            { message && <div className='message'> {message}</div>}
        </form>
    </Card>
  
  )  
   
}

export default FeedbackForm
