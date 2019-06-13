import React from 'react';
import { Link } from 'react-router-dom';
import ContentStateEnum from 'common/ContentStateEnum';
import Comment from 'containers/Comment';
import ProfileMini from '../Common/ProfileMini';
import Download from './Download';
import { convertFullDate } from 'utils/convertDate';
import { breakLine } from 'utils/breakLine';

const DocuComponent = ({docData, my_id, setDocState, deleteDoc, likeDoc, isLiked}) => {

    let contentInfo = docData.content;
    let userInfo = docData.content.user;

    const makeFileList = () => {
        let fileList = []
        for(let i = 0; i < docData.file_path.length; i++) {
            fileList.push(
                <div className="file-download-list" key={i}>
                    <Download object_id={contentInfo.content_id} index={i}>
                        <i className="material-icons">insert_drive_file</i>
                        <p>{docData.file_path[i].substring(20)}</p>
                    </Download>
                </div>
            )
        }
        return fileList;
    }

    return (
        <div className="post-wrapper">
            <div className="post-title">
                <Link to={`/board/${contentInfo.board_id}`}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h5>{contentInfo.title}</h5>
            </div>
            <div className="post-info-other">
                <div className="post-author">
                    {userInfo.nickname}
                </div>
                <div className="post-date">
                    {convertFullDate(contentInfo.createdAt)}
                </div>
            </div>
            <div className="post-content">
                {breakLine(contentInfo.text)}
            </div>
            <div className="file-download-wrapper">
                {makeFileList()}
            </div>
            <ProfileMini profileImg={userInfo.profile_path} nickname={userInfo.nickname} userDesc={userInfo.introduction}/>
            <div className="enif-divider"></div>
            <div className="actions-wrapper">
                {
                    (my_id === userInfo.user_id) &&
                    <div className="edit-delete-wrapper">
                        <div className="edit-wrapper">
                            <i className="material-icons pointer" onClick={() => setDocState(ContentStateEnum.EDITTING)}>edit</i>
                        </div>
                        <div className="delete-wrapper">
                            <i className="material-icons pointer" onClick={() => deleteDoc()}>delete</i>
                        </div>
                    </div>
                }
                <div className="like-comment-num-wrapper">
                    <div className="like-num-wrapper">
                        <i className="material-icons pointer" onClick={() => likeDoc()}>
                            { isLiked ? 'favorite' : 'favorite_border'}
                        </i>
                        {contentInfo.like_num}
                    </div>
                    <div className="comment-num-wrapper">
                        <i className="material-icons">comment</i>
                        {contentInfo.comment_num}
                    </div>
                </div>
            </div>
            <Comment parent_id={contentInfo.content_id}/>
        </div>
    )
}

export default DocuComponent;