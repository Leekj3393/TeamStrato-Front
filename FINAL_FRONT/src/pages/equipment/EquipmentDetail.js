import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callEquipmentDetailAPI } from "../../apis/EquipmentAPICalls";
import EquipmentDetailItem from "./EquipmentDetailItem";
import EquipmentDetailCSS from "./EquipmentDetailCSS.css";


function EquipmentDetail()
{
    const params = useParams();
    const categoryCode = params.categoryCode;
    const dispatch = useDispatch();
    const data = useSelector((state) => state.equipmentReducer);
    const equipment = data.data;
    const pagingInfo = data.pageInfo;
    const [equ , setEqu] = useState();

    useEffect(
        () =>
        {
            dispatch(callEquipmentDetailAPI({categoryCode}));
            setEqu(equipment[0]);
        },
        []
    );
    
    const onClickEquipmentHandler = (equ) =>{
        setEqu(equ);
    } 

    console.log("equ" , equ);

    return(
        <div>
            <div className="equipmentInfo">
                { equ && <EquipmentDetailItem key={equ.equipmentCode} equipment={equ}/>}
            </div>
            <div className="equipmentList">
                <table>
                    <thead>
                        <th> 장비 코드 </th>
                        <th> 장비 분류 </th>
                        <th> 장비 명 </th>
                        <th> 장비 상태 </th>
                        <th> 장비 상태 수정 일 </th>
                        <th> 장비 등록 일 </th>
                    </thead>
                    <tbody>
                        { equipment && equipment.map((equ) => (
                            <tr key={equ.equipmentCode}
                                onClick={ () => onClickEquipmentHandler(equ) }
                            >
                                <td>{ equ.equipmentCode }</td>
                                <td>{ equ.equCategory.equCategory.categoryName} <br/> { equ.equCategory.categoryName }</td>
                                <td>{ equ.equipmentName }</td>
                                <td>{ equ.equipmentStatus }</td>
                                <td>{ equ.equipmentCreateDate }</td>
                                <td>{  equ.equipmentModifyDate ? equ.equipmentModifyDate : '수정 시간이 존재 하지 않음' }</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EquipmentDetail;