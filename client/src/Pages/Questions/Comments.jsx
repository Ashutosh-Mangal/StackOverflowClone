import { useDispatch } from "react-redux";
import { deleteComment, addComment, editComment } from '../../actions/question'
import { useState } from "react";
const Comments = ({ question }) => {
  const [comments, setComments] = useState(question.comments);
  const dispatch = useDispatch();
  const result = JSON.parse(localStorage?.getItem('Profile'))?.result;
  
  const handleCommentDelete = (id) => {
    setComments(comments.filter((comment)=> comment._id!=id ))
    dispatch(deleteComment({questionId: question._id, questionCommentId: id}));
  }
  const handleCommentEdit = (id, editedComment) => {
    // e.preventDefault();
    console.log("count 1");
    setComments(comments.map((comment) => {
      if (comment._id == id) comment.comment = editedComment;
      return comment;
        
    }))
    dispatch(editComment({ questionId: question._id, questionCommentId: id, editedComment: editedComment }));
    //window.location.reload();
    
    
  }
  

  const commentSubmitHandler = (e) => {
    console.log(result);
    if (!result) {
      alert("login first");
      return;
    }
    e.preventDefault();
    const questionID = question._id
    const comment = e.target.comment.value
    dispatch(addComment({ questionID, commenter: result.email, comment }))
    window.location.reload();
  }

  const userLoggedIn = result?.email;


  return (
    <>
      <div>
          <form action='' onSubmit={commentSubmitHandler}>
              <input name='comment' type='text' placeholder='comment here' required />
              <button type='submit' >Submit</button>
          </form>
      </div>

      {/* <h3>All Comments <small>({question.comments.length})</small></h3> */}
      {
        comments?.map(({comment, commenter, _id}, index) => {
          return (
            <div>
              <p>{comment}</p>
              {
                (userLoggedIn!==null && userLoggedIn === commenter) && 
                <div>
                    <button onClick={() => handleCommentDelete(_id)}>Delete</button>
                    <form action='' onSubmit={(e) => {
                      e.preventDefault();
                      console.log(e.target.value.value);
                      const editedComment = e.target.value.value;
                      handleCommentEdit(_id, editedComment);
                    }}>
                      <input type="text" name="value" required />
                      <button type="Submit">Edit</button> 
                      </form>  
                  </div>
              }
            </div>
          )
        })
      }
    </>
  )
}

export default Comments

{/* <div key={index}>
        <p>{comment.comment}</p>
        {/* <button onClick={(comment) => handleCommentDelete}>Delete</button> */}
        {/* <button onClick={(comment._id) => HandleDeleteComment}>Delete</button> */}
    // </div> */}