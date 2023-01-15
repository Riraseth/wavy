var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function MyApp() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      newEntries = _React$useState4[0],
      setNewEntries = _React$useState4[1];

  var tempData = [];

  var getDifference = function getDifference(array1, array2) {
    return array1.filter(function (object1) {
      return !array2.some(function (object2) {
        return object1.Id === object2.Id;
      });
    });
  };

  var getEntries = function getEntries(checkData) {
    fetch('https://wavy-media-proxy.wavyapps.com/investors-notebook/inst5/?action=get_entries').then(function (res) {
      return res.json();
    }).then(function (res) {
      setData(res);
      if (checkData) {
        var difference = [].concat(_toConsumableArray(getDifference(res, tempData)));
        setNewEntries(difference.length);
        tempData = res;
      } else {
        tempData = res;
      }
    });
  };

  React.useEffect(function () {
    getEntries();
    var interval = setInterval(function () {
      getEntries(true);
    }, 10000);
    return function () {
      return clearInterval(interval);
    };
  }, []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(PaginatedTable, { data: data }),
    newEntries > 0 && React.createElement(Notification, {
      difference: newEntries,
      close: setNewEntries
    })
  );
}

var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(MyApp, null));
var Notification = function Notification(_ref) {
  var difference = _ref.difference,
      close = _ref.close;

  return React.createElement(
    "div",
    { className: "notification" },
    "Nowych wpis\xF3w: ",
    difference,
    React.createElement(
      "span",
      { className: "notification__close", onClick: function onClick() {
          return close(0);
        } },
      "\u2715"
    )
  );
};
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PaginatedTable = function PaginatedTable(_ref) {
  var data = _ref.data;

  var _React$useState = React.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currentPage = _React$useState2[0],
      setCurrentPage = _React$useState2[1];

  var _React$useState3 = React.useState(20),
      _React$useState4 = _slicedToArray(_React$useState3, 1),
      addressesPerPage = _React$useState4[0];

  var indexOfLastPost = currentPage * addressesPerPage;
  var indexOfFirstPost = indexOfLastPost - addressesPerPage;
  var currentAdresses = data.slice(indexOfFirstPost, indexOfLastPost);

  var paginate = function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "h2",
      null,
      "Tabelka z paginacj\u0105"
    ),
    React.createElement(
      "div",
      { className: "table-wrapper" },
      React.createElement(
        "div",
        { className: "table-scroll" },
        React.createElement(
          "table",
          { className: "table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "Wojew\xF3dztwo"
              ),
              React.createElement(
                "th",
                null,
                "Miasto"
              ),
              React.createElement(
                "th",
                null,
                "Ulica"
              ),
              React.createElement(
                "th",
                null,
                "Notatka"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            currentAdresses.map(function (item) {
              return React.createElement(
                "tr",
                { key: item.id },
                React.createElement(
                  "td",
                  null,
                  item.Address.split(',')[0]
                ),
                React.createElement(
                  "td",
                  null,
                  item.Address.split(',')[1]
                ),
                React.createElement(
                  "td",
                  null,
                  item.Address.split(',')[2]
                ),
                React.createElement(
                  "td",
                  null,
                  item.Notes
                )
              );
            })
          )
        )
      )
    ),
    React.createElement(Pagination, {
      addressesPerPage: addressesPerPage,
      totalAddresses: data.length,
      paginate: paginate
    })
  );
};
var Pagination = function Pagination(_ref) {
  var addressesPerPage = _ref.addressesPerPage,
      totalAddresses = _ref.totalAddresses,
      paginate = _ref.paginate;

  var pageNumbers = [];

  for (var i = 1; i <= Math.ceil(totalAddresses / addressesPerPage); i++) {
    pageNumbers.push(i);
  }

  return React.createElement(
    "nav",
    { className: "pagination" },
    React.createElement(
      "ul",
      { className: "pagination__list" },
      pageNumbers.map(function (number) {
        return React.createElement(
          "li",
          {
            key: number,
            className: "pagination__item",
            onClick: function onClick() {
              return paginate(number);
            }
          },
          number
        );
      })
    )
  );
};
