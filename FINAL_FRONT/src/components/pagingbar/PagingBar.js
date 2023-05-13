


function Pagingbar({ pagInfo , setCurrentPage })
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
        <div>
            <button
                onClick={ () => setCurrentPage(pagInfo.currentPage -1 )}
            >
                &lt;
            </button>
        </div>
    );
}

export default Pagingbar;