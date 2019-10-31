import React from 'react'
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate';
import history from 'common/history';

const NewComments = ({ comments }) => {

    const makeCommentList = () => {
        return comments.map(comment => {

            let contentInfo = comment.content;
            let boardInfo = comment.content.board;

            let linkTo = '';
            if (contentInfo.type === "PO") {
                linkTo = `/post/${comment.parent_id}`
            }
            else if (contentInfo.type === "PH") {
                linkTo = {
                    pathname: `/photo/${comment.parent_id}`,
                    state: {
                        modal: true,
                        backgroundLocation: history.location
                    }
                }
            }
            else if (contentInfo.type === "DO") {
                linkTo = `/document/${comment.parent_id}`
            }

            return (
                <div className="new-comment-list" key={comment.comment_id}>
                    <div className="new-comment-boardname">
                        <Link to={`/board/${boardInfo.board_id}`}>
                            {boardInfo.board_name}
                        </Link>
                    </div>
                    <div className="new-comment-contents">
                        <Link to={linkTo}>
                            <div className="new-comment-contents-top">
                                <p className="new-comment-contents-title">{contentInfo.title ? contentInfo.title : "제목없음"}</p>
                            </div>
                            <div className="new-comment-contents-bot">
                                <p className="new-comment-comment">{comment.text}</p>
                                <div className="new-comment-date">{convertDate(comment.createdAt)}</div>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="new-comments-wrapper">
            <Link to={'/comments/all'}>
                <h4>New Comments</h4>
            </Link>
            {makeCommentList()}
        </div>
    )
}

export default NewComments;
