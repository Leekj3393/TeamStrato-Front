import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAllEquiments, callCategory } from "../../apis/EquipmentAPICalls";
import PagingBar from "../../components/common/PagingBar";
import EquipmentModifyDetail from "./EquipmentModifyDetail";

function EquipmentModify()
{
    const dispatch = useDispatch();
    const [currentPage , setCurrentPage] = useState(1);
    const [equ , setEqu] = useState();
    const { equipments } = useSelector((state) => state.equipmentReducer);
    const { categorys } = useSelector((state) => state.equipmentReducer);
    const data = equipments?.data;
    const pageInfo = equipments?.pageInfo;
    

    useEffect(
        () =>
        {
            dispatch(callAllEquiments({currentPage}));
        },
        [currentPage]
    );

    const onClickEquipmentHandler = (equipment) =>
    {
        setEqu(equipment);
        dispatch(callCategory(equipment.equCategory.categoryCode));
    }

    console.log("equipments : " , equipments);
    console.log("data : " , data);
    console.log("equ : " , equ);
    console.log("categorys : " , categorys);

    return(
        <div className="Ref-div">
            <div className="ModifyInfo">
                { equ && <EquipmentModifyDetail key={equ.equipmentCode} equ={equ} category={categorys}/> }
            </div>
            <div className="div-talbe">
                <table>
                    <thead>
                        <th><input type="checkbox" className="all-selct"></input></th>
                        <th>장비 코드</th>
                        <th>장비 분류</th>
                        <th>장비 명</th>
                        <th>장비 상태</th>
                        <th>장비 등록 일</th>
                        <th>장비 상태 수정일</th>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((equipment) =>
                                <tr key={equipment.equipmentCode}
                                    onClick={ () => onClickEquipmentHandler(equipment) }>
                                    <td><input type="checkBox" className="equipment-selectBox"/></td>
                                    <td>{equipment.equipmentCode}</td>
                                    <td>{equipment.equCategory.equCategory.categoryName} <br/> { equipment.equCategory.categoryName }</td>
                                    <td>{equipment.equipmentName}</td>
                                    <td>{equipment.equipmentStatus}</td>
                                    <td>{equipment.equipmentCreateDate}</td>
                                    <td>{equipment.equipmentModifyDate ? equipment.equipmentModifyDate :'수정 시간이 존재 하지 않음'}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="pagInfo">
                { pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
            </div>
        </div>
    );
}

export default EquipmentModify;