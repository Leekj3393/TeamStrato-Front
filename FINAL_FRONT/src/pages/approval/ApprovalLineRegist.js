import { NavLink } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI } from '../../apis/ApprovalAPICalls';


function ApprovalLineRegist() {

    const { perusers, setPerusers } = useState('');
    // const {data} = useSelector(state => state.approvalReducer);
    // const removedList = perusers.data;
    const dispatch = useDispatch();

    useEffect(
        () => dispatch(callAppLineInsertAPI())
    )

    const onClickRemovePeruserHandler = ({memberCode}) => {
        const removedList = perusers.filter(peruser => peruser.member.memberCode !== memberCode);

        setPerusers(removedList);
    };


    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appLineContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선/열람자 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.organChart}>
                    <form>
                        <fieldset>
                            <legend> 조직도 </legend>
                            <div>
                                <ul id="treePopAdmRegist" role='tree' tabIndex={0} aria-busy="false">
                                    <ul id='jstreeContainerUl' role='group'>
                                        <li role='treeitem' datatype='root'>
                                            <i role='presentation'></i>
                                            <a href='#' tabIndex={-1}>
                                                <i role='presentation'></i>
                                                <span>부서1</span>
                                            </a>
                                            <ul role='group'>
                                                <li role='treeitem' datatype='node'>
                                                    <i role='presentation'></i>
                                                    <a href='#' tabIndex={-1}>
                                                        <i role='presentation'></i>
                                                        <div>
                                                            <input type="radio" id="qntjdnjs" name="selectMember"/*  value={qntjdnjs} */></input>
                                                            <label for="qntjdnjs">부서원</label>
                                                            <input type="radio" id="qntjdnjs2" name="selectMember"/*  value={qntjdnjs2} */></input>
                                                            <label for="qntjdnjs2">부서원2</label>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li role='treeitem' datatype='root'>부서2</li>
                                        <li role='treeitem' datatype='root'>부서3</li>
                                    </ul>
                                </ul>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className={ApprovalCSS.selectedDiv}>
                    <form>
                        <div>
                            <fieldset className={ApprovalCSS.selectedAppLine}>
                                <legend>결재선</legend>
                                <label>기안자</label>
                                <input value={DOMRectReadOnly} placeholder='기안자'></input><br/><br/>
                                <label>결재선1</label>
                                <input value={DOMRectReadOnly} placeholder='결재선1'></input><br/><br/>
                                <label>결재선2</label>
                                <input value={DOMRectReadOnly} placeholder='결재선2'></input><br/><br/>
                                <label>최종 결재선</label>
                                <input value={DOMRectReadOnly} placeholder='최종 결재선'></input>
                            
                                
                            </fieldset>
                        </div>

                        <div>
                            <fieldset className={ApprovalCSS.selectedPerUser}>
                                <legend>열람자</legend>
                                {/* {data && data.map( (peruser) =>  */}
                                    <ul /* key={peruser.member.memberCode} */>
                                        <li>
                                            {/* {peruser.member.memberName} */}
                                            <button onClick={() => onClickRemovePeruserHandler(/* peruser.member.memberCode */)}>X</button>
                                        </li>
                                    </ul>

                                {/* )} */}
                            </fieldset>
                        </div>
                    </form>
                </div>




            </div>                                                                {/* 본문 내용 끝  */}
        </div>
    );
}

export default ApprovalLineRegist;