import EquItemCSS from "./EquItemCSS.css";

function EquipmentDetailItem({equ : { files , equipmentCode , equipmentName , equipmentStatus , equCategory}})
{   
    console.log(files[0]);
    return(
        <>
            <div className="imgbox">
              <img src={ files[0].filePath } alt="이미지입니다 감사합니다"></img>
            </div>
            <div className="text-box1">
                <span>장비 코드 : </span>
                <span>{ equipmentCode }</span>
            </div>
            <div className="text-box2">
                <span>장비 명 : </span>
                <span>{ equipmentName }</span>
            </div>
            <div className="text-box3">
                <span>장비 상태 : </span>
                <span>{ equipmentStatus }</span>
            </div>
            <div className="text-box4">
                <span>장비 장비 분류 : </span>
                <span>{ equCategory.equCategory.categoryName +' '+ equCategory.categoryName }</span>
            </div>
            
        </>
    );
}

export default EquipmentDetailItem;