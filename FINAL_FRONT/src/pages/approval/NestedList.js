import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberListForAppAPI } from '../../apis/AppLineAPICalls';
import ApprovalCSS from './Approval.module.css';

function NestedList() {
  const [expandedItems, setExpandedItems] = useState([]);
  const {data, accessors} = useSelector(state => state.applineReducer);
  const dispatch = useDispatch();

  //부서에 해당하는 직원 조회
  const renderMembers = (dept) => {
    if (!accessors) return null; // data가 undefined인 경우 처리

    const members = accessors.accessor.filter(accessor => accessor.department.deptCode === dept.deptCode);

    if (members.length === 0) return null;

    return (
      <ul>
        {members.map(member => (
          <li key={member.memberCode}>
            {member.job.jobName} - 
            {member.memberName}
            {renderMembers(member)} {/* 재귀적으로 하위 멤버 출력 */}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
      dispatch(callMemberListForAppAPI());
    }, 
    []
  );

  return (
    <div className={ApprovalCSS}>
      <div className={ApprovalCSS.square}></div>
      <div className={ApprovalCSS.appContectDiv}>

        <ul className={ApprovalCSS.memberChartUl}>
          {accessors?.dept && accessors?.dept.map((dept) => (
            <li key={dept.deptCode} /* onClick={() => handleItemClick(dept)} */>
              {dept.deptName}
              {renderMembers(dept)}
              <ul>
                
              </ul>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default NestedList;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { callMemberListForAppAPI } from '../../apis/AppLineAPICalls';
// import ApprovalCSS from './Approval.module.css';

// const NestedList = () => {
//   const [expandedItems, setExpandedItems] = useState([]);
//   const dispatch = useDispatch();
//   const {data} = useSelector(state => state.approvalReducer);


//   const handleItemClick = (item) => {
//     if (expandedItems.includes(item)) {
//       setExpandedItems(expandedItems.filter((expandedItem) => expandedItem !== item));
//     } else {
//       setExpandedItems([...expandedItems, item]);
//     }
//   };

//   useEffect(() => {
//     dispatch(callMemberListForAppAPI());
//   }, []);

//   return (
//     <div className={ApprovalCSS}>
//       <div className={ApprovalCSS.square}></div>
//       <div className={ApprovalCSS.appContectDiv}>
//         <ul> 
//           {data && data.map((appline) => (
//             <li key={appline.memberCode} onClick={() => handleItemClick(appline)}>
//               <div>
//                 <span>코드: {appline.memberCode}</span>
//               </div>
//               <div>
//                 <span>이름: {appline.memberName}</span>
//               </div>
//               {/* {expandedItems.includes(appline) && (
//                 <ul>
//                   {appline.department.items.map((item) => (
//                     <li key={item.deptCode}>{item.deptName}</li>
//                   ))}
//                 </ul>
//               )} */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NestedList;


        {/* <table className={ApprovalCSS.membersChartTable}><tbody>
          {accessors?.accessor && accessors.accessor.map((accessor) => (
            <tr key={accessor.memberCode}>코드
              <td>{accessor.memberCode}</td>
            </tr>
            ))}
            </tbody>
        </table> */}