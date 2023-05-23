
function RepairModal({equipmentCode , equipmentName , setIsClick , setRModalOpen})
{




    
    const onModelClick = () =>
    {
        setRModalOpen(false);
        setIsClick(false);
    }

    return(
        <div className="REF-div">
            <button onClick={ onModelClick }>모달 닫기</button>
            <table>
                <tbody>
                    <tr>
                        <td><label>결제 구분</label></td>
                        <td><label>장비수리</label></td>
                    </tr>
                    <tr>
                        <td><label>장비 코드</label></td>
                        
                    </tr>
                    <tr>
                        <td><label>장비 명</label></td>
                    </tr>
                    <tr>
                        <td><label>결제 제목</label></td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td><label>신청 사유</label></td>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RepairModal;