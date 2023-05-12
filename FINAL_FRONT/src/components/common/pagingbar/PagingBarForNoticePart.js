import PagingBarCSS from './PagingBarForNoticePart.module.css';

function PagingBarForNoticePart({ pageInfo, setCurrentPage }) {

    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <div>
            <button 
                className={ PagingBarCSS.pagingBtn2 }
                onClick={ () => setCurrentPage(1) }
                disabled={ pageInfo.currentPage <= 1 }
            >
                &lt;&lt;
            </button>
            <button 
                className={ PagingBarCSS.pagingBtn2 }
                onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                disabled={ pageInfo.currentPage <= 1 }
            >
                &lt;
            </button>
            { pageNumber.map(num => (
                <li className={PagingBarCSS.pagingLi2} key={num} onClick={ () => setCurrentPage(num) }>
                    <button 
                        className={ PagingBarCSS.pagingBtn2 }
                        style={ pageInfo.currentPage === num ? { backgroundColor : 'lightblue' } : null }
                    >
                        {num}
                    </button>
                </li>
            ))
            }
            <button 
                className={ PagingBarCSS.pagingBtn2 }
                onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                disabled={ pageInfo.currentPage <= pageInfo.maxPage }
            >
                &gt;
            </button>
            <button 
                className={PagingBarCSS.pagingBtn2}
                onClick={() => setCurrentPage(pageInfo.maxPage)}
                disabled={pageInfo.currentPage <= pageInfo.maxPage}
            >
                &gt;&gt;
            </button>

        </div>
    );
}

export default PagingBarForNoticePart;