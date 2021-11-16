const Card = (props) => {
  return (
    <div className="card">
      <img src={props.imageSrc} className="card-img-top" alt={props.imgAlt} />
      <div className="card-body">
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

export default Card;
