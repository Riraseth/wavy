const PaginatedTable = ({ data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [addressesPerPage] = React.useState(20);

  const indexOfLastPost = currentPage * addressesPerPage;
  const indexOfFirstPost = indexOfLastPost - addressesPerPage;
  const currentAdresses = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <React.Fragment>
      <h2>Tabelka z paginacją</h2>
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Województwo</th>
                <th>Miasto</th>
                <th>Ulica</th>
                <th>Notatka</th>
              </tr>
            </thead>
            <tbody>
              {currentAdresses.map((item) => (
                <tr key={item.id}>
                  <td>{item.Address.split(',')[0]}</td>
                  <td>{item.Address.split(',')[1]}</td>
                  <td>{item.Address.split(',')[2]}</td>
                  <td>{item.Notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        addressesPerPage={addressesPerPage}
        totalAddresses={data.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};
