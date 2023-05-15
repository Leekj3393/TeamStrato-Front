function MemberReigst () {

    return (
        <>
            <div>
                직원 정보 수정
            </div>
            <div class="MemberBackground">
                <div>
                    <img src="/image/memberId.png"></img>
                    <input type="file"/>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input name="memberName"/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>주민번호</label></td>
                                <td>
                                    <input 
                                    name="residentNo" 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>성별</label></td>
                                <td>
                                    <label><input type="radio" name="gender" value="M" />남자</label>
                                    <label><input type="radio" name="gender" value="W" />여자</label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>전화번호</label></td>
                                <input name="phone" />
                            </tr>
                            <tr>
                                <td><label>주소</label></td>
                                <input name="address"/>
                            </tr>
                            <tr>
                                <td><label>급여계좌</label></td>
                            
                                <select name="bankName">
                                    <option>선택</option>
                                    <option>농협</option>
                                    <option>국민</option>
                                    <option>신한</option>
                                    <option>기업</option>
                                    <option>카카오</option>
                                </select>
                                
                                <input name="bankNo" />
                            </tr>
                            <tr>
                                <td><label>급여</label></td>
                                <td>
                                    <input name="memberSalary" />
                                </td>
                            </tr>
                            <tr>
                                <td><label>잔여연차</label></td>
                                <td>
                                    <input name="memberAnnual" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MemberReigst;