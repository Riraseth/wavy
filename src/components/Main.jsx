function MyApp() {
  const [data, setData] = React.useState([]);
  const [newEntries, setNewEntries] = React.useState(0);

  let tempData = [];

  const getDifference = (array1, array2) => {
    return array1.filter(
      (object1) => !array2.some((object2) => object1.Id === object2.Id)
    );
  };

  const getEntries = (checkData) => {
    fetch(
      'https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/?action=get_entries'
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        if (checkData) {
          const difference = [...getDifference(res, tempData)];
          setNewEntries(difference.length);
          tempData = res;
        } else {
          tempData = res;
        }
      });
  };

  React.useEffect(() => {
    getEntries();
    const interval = setInterval(() => {
      getEntries(true);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <PaginatedTable data={data}></PaginatedTable>
      {newEntries > 0 && (
        <Notification
          difference={newEntries}
          close={setNewEntries}
        ></Notification>
      )}
    </React.Fragment>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
