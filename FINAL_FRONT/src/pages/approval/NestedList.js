import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberListForAppAPI } from '../../apis/AppLineAPICalls';
import ApprovalCSS from './Approval.module.css';

function NestedList() {
  const [expandedItems, setExpandedItems] = useState([]);
  const { data, accessors } = useSelector(state => state.applineReducer);
  const dispatch = useDispatch();

  // 부서에 해당하는 동일 직급 직원 조회
  const renderMembers = (dept, jobName) => {
    if (!accessors) return null; // data가 undefined인 경우 처리

    const members = accessors.accessor.filter(accessor => (
      accessor.department.deptCode === dept.deptCode &&
      accessor.job.jobName === jobName
    ));

    if (members.length === 0) return null;

    return (
      <ul>
        {members.map(member => (
          <li key={member.memberCode}>
            {member.job.jobName} - {member.memberName}
          </li>
        ))}
      </ul>
    );
  };

  const handleItemClick = (dept, jobName) => {
    const item = { dept, jobName };
    if (expandedItems.some(expandedItem => (
      expandedItem.dept.deptCode === dept.deptCode &&
      expandedItem.jobName === jobName
    ))) {
      setExpandedItems(expandedItems.filter(expandedItem => (
        expandedItem.dept.deptCode !== dept.deptCode ||
        expandedItem.jobName !== jobName
      )));
    } else {
      setExpandedItems([...expandedItems, item]);
    }
  };

  useEffect(() => {
    dispatch(callMemberListForAppAPI());
  }, []);

  return (
    <div className={ApprovalCSS}>
      <div className={ApprovalCSS.square}></div>
      <div className={ApprovalCSS.appContectDiv}>
        <ul className={ApprovalCSS.memberChartUl}>
          {accessors?.dept && accessors?.dept.map(dept => (
            <li key={dept.deptCode}>
              {dept.deptName}
              {accessors?.accessor && accessors.accessor.map(accessor => (
                accessor.department.deptCode === dept.deptCode && (
                  <ul key={accessor.job.jobCode}>
                    <li onClick={() => handleItemClick(dept, accessor.job.jobName)}>
                      {accessor.job.jobName}
                      {expandedItems.some(expandedItem => (
                        expandedItem.dept.deptCode === dept.deptCode &&
                        expandedItem.jobName === accessor.job.jobName
                      )) && renderMembers(dept, accessor.job.jobName)}
                    </li>
                  </ul>
                )
              ))}
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

// function NestedList() {
//   const [expandedItems, setExpandedItems] = useState([]);
//   const {data, accessors} = useSelector(state => state.applineReducer);
//   const dispatch = useDispatch();

//   //부서에 해당하는 직원 조회
//   const renderMembers = (dept) => {
//     if (!accessors) return null; // data가 undefined인 경우 처리

//     const members = accessors.accessor.filter(accessor => accessor.department.deptCode === dept.deptCode);

//     if (members.length === 0) return null;

//     return (
//       <ul>
//         {members.map(member => (
//           <li key={member.memberCode}>
//             {member.job.jobName} - 
//             {member.memberName}
//             {renderMembers(member)} {/* 재귀적으로 하위 멤버 출력 */}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   useEffect(() => {
//       dispatch(callMemberListForAppAPI());
//     }, 
//     []
//   );

//   return (
//     <div className={ApprovalCSS}>
//       <div className={ApprovalCSS.square}></div>
//       <div className={ApprovalCSS.appContectDiv}>

//         <ul className={ApprovalCSS.memberChartUl}>
//           {accessors?.dept && accessors?.dept.map((dept) => (
//             <li key={dept.deptCode} /* onClick={() => handleItemClick(dept)} */>
//               {dept.deptName}
//               {renderMembers(dept)}
//               <ul>
                
//               </ul>
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