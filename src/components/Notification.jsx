const Notification = ({ difference, close }) => {
  return (
    <div className="notification">
      Nowych wpisów: {difference}
      <span className="notification__close" onClick={() => close(0)}>
        &#x2715;
      </span>
    </div>
  );
};
