import EduPhotoCSS from './EducationPhoto.module.css';

function EducationPhoto() {



    return (
        <div className={EduPhotoCSS.back}>
            <div className={EduPhotoCSS.title}>
                교육사진
            </div>
            <div className={EduPhotoCSS.Flex}>
            <div className={EduPhotoCSS.registBt}>
                <button>
                    교육 등록
                </button>
            </div>
            <div className={EduPhotoCSS.ImgDiv}>
                <div className={EduPhotoCSS.Image}>
                    <img/>
                </div>
                <span>교육제목</span>
            </div>
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default EducationPhoto;