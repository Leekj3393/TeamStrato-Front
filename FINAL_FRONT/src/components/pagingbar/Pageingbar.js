import PageingbarCss  from './PageingbarCss.css';

function Pageingbar({ pagInfo , setCurrentPage })
{
    const pageNumber = [];

    console.log(pagInfo);
    if(pagInfo)
    {
        for(let i = pagInfo.startPage; i <= pagInfo.endPage; i++)
        {
            pageNumber.push(i);
        }
    }


    return(
        <div  
            style={ {listStyleType : 'none', display : 'flex', justifyContent: 'center'
                    , margin : 30} }
            className={ PageingbarCss.btnDiv }>
            <button
                onClick={ () => setCurrentPage(pagInfo.currentPage -1 ) }
                className={ PageingbarCss.pagingeBtn }
                disabled={ pagInfo.currentPage <= 1 }
            >
                &lt;
            </button>
            { pageNumber.map(num => (
                <li key={num} onClick={ () => setCurrentPage(num) } >
                    <button
                        className={ PageingbarCss.pagingeBtn }
                        style={ pagInfo.currentPage === num ? { backgroundColor : 'orange' } : null }>
                        {num} </button>
                </li>
            ))}
            <button> &gt; </button>
        </div>
    );
}

export default Pageingbar;