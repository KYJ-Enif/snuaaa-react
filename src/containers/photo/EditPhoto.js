import React from 'react';
import CreatePhotoInfo from '../../components/Album/CreatePhotoInfo';
import * as service from '../../services';
import Image from '../../components/Common/Image';
import ContentsStateEnum from '../../common/ContentStateEnum';

const TAG = 'EDITPHOTO'

class EditPhoto extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);

        this.state = {
            title: props.photoInfo.title,
            desc: props.photoInfo.contents,
            date: props.photoInfo.date && new Date(props.photoInfo.date),
            location: props.photoInfo.location,
            camera: props.photoInfo.camera,
            lens: props.photoInfo.lens,
            focal_length: props.photoInfo.focal_length,
            f_stop: props.photoInfo.f_stop,
            exposure_time: props.photoInfo.exposure_time,
            iso: props.photoInfo.iso,
            selectedTags: props.tagInfo,
            photo_id: props.photoInfo.object_id,
            file_path: props.photoInfo.file_path,
            // uploadPhotos: [],
            imgDatas: [],
            imgIdx: -1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDate = (date) => {
        this.setState({
            date: date
        })
    }

    makeTagList = () => {
        const tagList = this.state.selectedTags.map((tag) => {
            return (
                <div className="tag-unit" key={tag.tag_id} >
                    <input type="checkbox" id={"crt_" + tag.tag_id} defaultChecked />
                    <label htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    // clickTag = (e) => {
    //     let tagId = e.target.id.replace('crt_', '');

    //     if(this.state.selectedTags.includes(tagId)) {
    //         this.setState({
    //             selectedTags: this.state.selectedTags.filter(tag => tagId !== tag)
    //         })
    //     }
    //     else {
    //         this.setState({
    //             selectedTags: this.state.selectedTags.concat(tagId)
    //         })
            
    //     }
    // }

    updatePhoto = async () => {

        this.props.setPhotoState(ContentsStateEnum.LOADING);

        const { photo_id, title, desc, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso } = this.state;

        const photoInfo = {
            title: title,
            desc: desc,
            date: date,
            location: location,
            camera: camera,
            lens: lens,
            focal_length: focal_length,
            f_stop: f_stop,
            exposure_time: exposure_time,
            iso: iso
        }
            
        // const photosForm = new FormData();

        // photosForm.append('title', title);
        // photosForm.append('desc', desc);
        // photosForm.append('date', date);
        // photosForm.append('location', location);
        // photosForm.append('camera', camera);
        // photosForm.append('lens', lens);
        // photosForm.append('focal_length', focal_length);
        // photosForm.append('f_stop', f_stop);
        // photosForm.append('exposure_time', exposure_time);
        // photosForm.append('iso', iso);
        // photosForm.append('tags', selectedTags);
        // photosForm.append('uploadPhotos', this.state.uploadPhotos[i]);
        await service.updatePhoto(photo_id, photoInfo)
        .then(() => {
            this.props.fetch();
        })
        .catch((err) => {
            console.error(err);
            alert("업데이트 실패");
        })
    }

    render() {
        console.log('[%s] render', TAG)
        const { title, desc, date, location, camera, lens, focal_length, f_stop, exposure_time, iso, selectedTags } = this.state

        return (
            <div className="crt-photo-popup">
                <div className="crt-photo-wrp edt-photo-wrp">
                    <div className="crt-photo-header">
                        <h3>사진 수정</h3>
                    </div>
                    <div className="crt-photo-body">
                        <div className="crt-photo-center">
                            <Image imgSrc={this.state.file_path}/>
                            {/* <PreviewImage uploadPhotos={uploadPhotos} imgIdx={imgIdx} /> */}
                        </div>

                        <div className="crt-photo-right">
                        
                            {selectedTags.length > 0 && 
                            <div className="tag-wrapper">
                                {this.makeTagList()}
                            </div>}
                        
                            <CreatePhotoInfo title={title} desc={desc} date={date} location={location}
                            camera={camera} lens={lens} focal_length={focal_length} f_stop={f_stop}
                            exposure_time={exposure_time} iso={iso} handleChange={this.handleChange} handleDate={this.handleDate}/>
                        

                            <div className="btn-wrapper">
                                <button className="btn-cancel" onClick={()=>this.props.setPhotoState(ContentsStateEnum.READY)}>취소</button>
                                <button className="btn-ok" onClick={() => this.updatePhoto()}>완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        ) 
    }
}

export default EditPhoto;