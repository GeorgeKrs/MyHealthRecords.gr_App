const TableTemperature = () => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Σημείο Μέτρησης</th>
          <th scope="col">Φυσιολογικά Όρια Θερμοκρασίας (&#176;C)</th>
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
            του παιδίατρου)
          </th>
          <td>36,6 - 38,0</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableTemperature;
