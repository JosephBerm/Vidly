import propTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) =>
{
    const { pageSize, itemsCount, currentPage, onPageChange } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    //Math.ceil - Returns the smallest integer greater
    //than or equal to its numeric argument.
    if (pagesCount === 1)
        return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className='pagination'>
                { pages.map(page => (
                    <li
                        key={ page }
                        className={ page === currentPage ?
                            'page-item active' : 'page-item' }>
                        <a
                            className='page-link'
                            onClick={ () => onPageChange(page) }
                            style={ { cursor: 'pointer' } }>
                            { page }
                        </a>
                    </li>
                )) }
            </ul>
        </nav>
    );
};

Pagination.prototype =
{
    itemsCount: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired
};

export default Pagination;