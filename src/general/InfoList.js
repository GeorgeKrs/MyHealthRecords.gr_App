const InfoList = (props) => {
  return (
    <div className="mt-2">
      <div>
        <h6>
          <b>{props.title}</b>
        </h6>
      </div>
      <div>
        <ul class="list-group">
          <li class="list-group-item list-group-item-success">{props.li1}</li>
          <li class="list-group-item list-group-item-warning">{props.li2}</li>
          <li class="list-group-item list-group-item-danger">{props.li3}</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoList;
