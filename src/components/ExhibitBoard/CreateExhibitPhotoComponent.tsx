import React, { ChangeEvent } from 'react';
import CreateExhibitPhotoInfo from '../../components/ExhibitBoard/CreateExhibitPhotoInfo';
import ThumbnailList from '../../components/Album/ThumbnailList';
import PreviewImage from '../../components/Album/PreviewImage';
import CrtExhibitPhototype from '../../types/CrtExhibitPhotoType';
import UserType from '../../types/UserType';

type CreateExhibitPhotoComponentProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDate: (date: Date) => void;
    handlePhotographer: (e: ChangeEvent<HTMLInputElement>) => void;
    selectPhotographer: (index: number) => void;
    removePhotographer: () => void;
    uploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
    imgUrls: string[]
    setImgIdx: (index: number) => void;
    removeImg: (index: number) => void;
    checkForm: () => void;
    togglePopUp: () => void;
    imgIdx: number;
    photoInfos: CrtExhibitPhototype[];
    searchUsers: UserType[]
    btnDisabled: boolean
}

function CreateExhibitPhotoComponent ({
    handleChange, handleDate, handlePhotographer, selectPhotographer, removePhotographer,
    uploadFile, imgUrls, setImgIdx, removeImg, checkForm,
    togglePopUp, imgIdx, photoInfos, searchUsers, btnDisabled }: CreateExhibitPhotoComponentProps) {

    return (
        <div className="crt-photo-popup">
            <div className="crt-photo-wrp">
                <div className="crt-photo-header">
                    <h3>사진 업로드</h3>
                </div>
                <div className="crt-photo-body">
                    <div className="crt-photo-left">
                        <div className="block-constant">
                            <label htmlFor="photos">
                                <div className="add-photo">
                                    <i className="ri-add-line enif-f-2x"></i>
                                </div>
                            </label>
                            <input type="file" id="photos" multiple accept="image/*" onChange={uploadFile} />
                        </div>
                        <ThumbnailList imgUrls={imgUrls} imgIdx={imgIdx} setImgIdx={setImgIdx} removeImg={removeImg} />
                    </div>
                    <div className="crt-photo-center">
                        <PreviewImage imgUrl={imgUrls[imgIdx]} />
                    </div>

                    <div className="crt-photo-right">
                        <div className="crt-photo-right-top" >
                            {(() => {
                                if (imgIdx >= 0) {
                                    return (
                                        <>
                                            <CreateExhibitPhotoInfo
                                                photoInfo={photoInfos[imgIdx]}
                                                searchUsers={searchUsers}
                                                handleChange={handleChange}
                                                handleDate={handleDate}
                                                handlePhotographer={handlePhotographer}
                                                selectPhotographer={selectPhotographer}
                                                removePhotographer={removePhotographer} />
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <div className="message-info">사진을 선택해주세요</div>
                                    )
                                }
                            })()}
                        </div>
                        <div className="crt-photo-btn-wrapper">
                            <button className="btn-cancel" onClick={togglePopUp}>취소</button>
                            <button className="btn-ok" disabled={btnDisabled} onClick={checkForm}>완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExhibitPhotoComponent;