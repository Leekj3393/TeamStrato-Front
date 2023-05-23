import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RepairModal from "./Modal/RepairModal";


function EquipmentModifyDetail({equ : {  file , equipmentCode , equipmentName , equCategory , equipmentStatus } , category})
{
    const dispatch = useDispatch();
    const [modifyMode , setModifyMode] = useState(false);
    const [isClick , setIsClick] = useState(false);
    const [RmodalOpen , setRModalOpen] = useState(false);
    const [DmodalOpen , setDModalOpen] = useState(false);
    const imageInput = useRef();
    const [image , setImage] = useState(null);
    const [imageUrl , setImageUrl] = useState();
    const [form , setForm] = useState({});


    useEffect(
        () =>
        {
            if(image)
            {
                const fileReader = new FileReader();
                fileReader.onload = (e) =>
                {
                    const {result} = e.target;
                    if(result)
                    setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }
        },
        [image]
    );

    const onChangeImageHandler = (e) =>
    {
        setImage(e.target.files[0]);
    }

    const onClickImageBtnHandler = () =>
    {
        imageInput.current.click();
    }

    const onClickModifyBtnHandler = () =>
    {
        if(modifyMode)
            setModifyMode(false);
        else
            setModifyMode(true);
    }

    const onChageHandler = (e) =>
    {
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }

    const onChageStatusHandler = (e) =>
    {
        if(e.target.value === '수리요청')
        {
            setRModalOpen(true);

        }
        else if(e.target.value === '폐기요청')
        {

        }
        else
        {
            setForm({
                ...form,
                [e.target.name] : [e.target.value]
            });
        }
    }


    console.log("file : " , file);
    console.log("modifyMode : " , modifyMode);
    console.log("RModalOpen : " , RmodalOpen);
    return(
        <div className="itemDiv">
            { RmodalOpen &&
                <div className="RepairModal">
                    <RepairModal equipmentCode={equipmentCode}
                                 equipmentName={equipmentName}
                                 setIsClick={setIsClick}
                                 setRModalOpen={setRModalOpen}
                    />
                </div>
            }
            <div className="button-box">
                {!modifyMode && <button onClick={ onClickModifyBtnHandler }>수정하기</button>}
                {modifyMode && <button>저장하기</button>}
                {modifyMode && <button>취소</button>}
                <button>삭제하기</button>
            </div>
            <div className="image-box">
                <img  
                    src={ !imageUrl ? file.filePath : imageUrl}
                    alt="미리보기"
                />
                <input 
                    className="imageInput"
                    type="file"
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    ref={ imageInput }
                    onChange={ onChangeImageHandler }
                />
                <button
                    className="imgBtn"
                    onClick={ onClickImageBtnHandler }
                    disabled={ !modifyMode }
                >이미지 업로드</button>
            </div>
            <div className="TextInfo">
                <table>
                    <tbody>
                        <tr>
                            <td><label>장비 코드</label></td>
                            <td>
                                <span>{equipmentCode}</span>
                            </td>
                            <td><label>장비 명</label></td>
                            <td>
                                <input
                                    name="equipmentName"
                                    placeholder="장비 명"
                                    className="equipmentInput-Info"
                                    value={ !modifyMode ? equipmentName : form.equipmentName}
                                    readOnly={ !modifyMode }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 분류</label></td>
                            <td>
                                { !modifyMode &&
                                   <span>{equCategory.equCategory.categoryName} - {equCategory.categoryName}</span> 
                                }
                                { modifyMode &&
                                    <select
                                        name="equCategory.categoryCode"
                                        className="categorySelect-box"
                                        onChange={ onChageHandler}>
                                            <option value={equCategory.categoryCode}>{equCategory.equCategory.categoryName} - {equCategory.categoryName}</option>
                                            {category && category.map((c) => (
                                                <option value={ c.categoryCode }>{c.equCategory.categoryName} - {c.categoryName}</option>
                                            ))}
                                    </select>
                                }
                            </td>
                            <td><label>장비 상태</label></td>
                            <td>
                                {!modifyMode &&
                                    <span>{equipmentStatus}</span>
                                }
                                { modifyMode &&
                                    <select
                                        name="equipmentStatus"
                                        className="select-box"
                                        onChange={ onChageStatusHandler }>
                                            <option value="운영가능">운영가능</option>
                                            <option value="수리요청">수리요청</option>
                                            <option value="폐기요청">폐기요청</option>
                                    </select>
                                }
                            </td>                 
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default EquipmentModifyDetail;