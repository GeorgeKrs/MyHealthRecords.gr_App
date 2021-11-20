const TableTemperature = () => {
  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle table-hover table-bordered border-primary table-striped">
        <thead>
          <tr>
            <th scope="col">Σημείο Μέτρησης</th>
            <th scope="col">Θερμοκρασία (&#176;C)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Μασχάλη</th>
            <td>34,7 - 37,3</td>
          </tr>
          <tr>
            <th scope="row">Στόμα</th>
            <td>35,5 - 37,5</td>
          </tr>
          <tr>
            <th scope="row">Αυτί</th>
            <td>35,5 - 37,4</td>
          </tr>
          <tr>
            <th scope="row">
              Πρωκτός (Συνιστάται για βρέφη έως και 6 μηνών με τη σύμφωνη γνώμη
              του παιδιάτρου)
            </th>
            <td>36,6 - 38,0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableTemperature;
