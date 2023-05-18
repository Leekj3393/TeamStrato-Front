import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEquipmentCategory } from "../../apis/EquipmentAPICalls";
import { useNavigate } from "react-router-dom";
import EquipmentRegsitCSS from "./EquipmentRegistCSS.css";

function EquipmentRegist()
{
    const dispatch = useDispatch();
    const form = new FormData();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [imgUrl , setImageUrl] = useState();
    const [image , setImage] = useState();
    const data = useSelector(state => state.equipmentReducer);
    const category = data.category;
    const [equipment , setEquipment] = useState({
        equipmentName : '',
        equCategory : {
            categoryCode : 4
        },
        appTitle : '',
        appContent : '',
    });

    useEffect(
        () =>
        {
            dispatch(callEquipmentCategory());
        },
        []
    );

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
    
    const onChangeImageUpload = (e) =>
    {
        console.log("이미지 : ", e.target.files);
        setImage(e.target.files[0]);
    }

    const onChangeHandler = (e) =>
    {
        console.log(`${e.target.name} : `, e.target.value );
        setEquipment({
            ...equipment,
            [e.target.name ] : [e.target.value]
        });
    }

    console.log("category :", category);
    
    return(
        <div className="Ref-div">
               <div className="image-div">
                    <div className="imageBox">
                        { imgUrl && <img alt="미리보기입니당" src={ imgUrl } className="image"/>}
                    </div>
                    <input 
                        type="file" 
                        name="equipmentImage" 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={ imageInput }
                        onChange={ onChangeImageUpload }
                    />
                 </div>
            <div className="inputText">
                <table>
                    <tbody>
                        <tr>
                            <td><label>결제 구분</label></td>
                            <td>
                                <span>장비</span>
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 명</label></td>
                            <td>
                                <input
                                    name='equipmentName'
                                    placeholder='추가할 장비의 이름 입력'
                                    className="equipmentName"
                                    onChange={ onChangeHandler }/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 분류</label></td>
                            <select
                                className="select-box"
                                name="equCategory.categoryCode"
                                onChange={ onChangeHandler}
                                >
                                    {category && category.map((c) =>( 
                                        <option value={ c.categoryCode}>{c.equCategory.categoryName} - {c.categoryName}</option>)
                                    )}
                                </select>
                        </tr>
                        <tr>
                            <td><label>결제 제목</label></td>
                            <input
                                type="text"
                                name="appTitle"
                                className="appTitle"
                                onChange={ onChangeHandler }
                            />
                        </tr>
                        <tr className="appContent">
                            <td><label>결제 내용</label></td>
                            <input
                                type="text"
                                className="appContent-text"
                                name="appContent"
                                onChange={ onChangeHandler }
                            />
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                <button className="back" onClick={ () => navigate(-1)}>
                    돌아가기
                </button>
                <button className="form">
                    저장하기
                </button>
                </div>                           
            </div>

        
        </div>
    );
}

export default EquipmentRegist;