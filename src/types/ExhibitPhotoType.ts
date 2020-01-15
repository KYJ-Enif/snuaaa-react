import ContentType from "./ContentType";
import UserType from "./UserType";

interface ExhibitPhotoType {
    content_id: number
    exhibition_id: number,
    exhibitionContent: ContentType,
    order: number,
    photographer_id: number,
    photographer: UserType,
    file_path: string,
    thumbnail_path: string,
    location?: string,
    camera?: string,
    lens?: string
    exposure_time?: string
    focal_length?: string
    f_stop?: string
    iso?: string
    date?: Date
}

export default ExhibitPhotoType;
