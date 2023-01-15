const Pagination = ({ addressesPerPage, totalAddresses, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAddresses / addressesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="pagination__item"
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};
