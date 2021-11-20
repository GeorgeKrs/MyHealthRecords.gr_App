const TablePressure = () => {
  return (
    <div className="table-responsive" style={{ overflowX: "hidden" }}>
      <table className="table table-sm align-middle table-hover table-bordered border-primary table-striped">
        <thead>
          <tr>
            <th scope="col">Κατηγορία</th>
            <th scope="col">Συστολική (mmHg)</th>
            <th scope="col">Διαστολική (mmHg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Φυσιολογική Πίεση</th>
            <td>Κάτω από 120 και</td>

            <td>Κάτω από 80</td>
          </tr>
          <tr>
            <th scope="row">Προ-Υπέρταση</th>
            <td>120-139 ή</td>

            <td>80-89</td>
          </tr>
          <tr>
            <th scope="row">Υψηλή Πίεση (Υπέρταση Στάδιο 1)</th>
            <td>140-159 ή</td>

            <td>90-99</td>
          </tr>
          <tr>
            <th scope="row">Υψηλή Πίεση (Υπέρταση Στάδιο 2)</th>
            <td>160-180 ή</td>

            <td>100-110</td>
          </tr>
          <tr>
            <th scope="row">Υπερτατική Κρίση (Επείγον Περιστατικό)</th>
            <td>Πάνω από 180 ή</td>

            <td>Πάνω από 110</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePressure;
