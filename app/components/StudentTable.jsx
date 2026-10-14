import { calculatePending, formatCurrency } from "../utils/feeUtils";

function StudentTable({ students }) {
  if (!students.length) {
    return <p className="empty">No students found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const pending = calculatePending(
              student.totalFee,
              student.paidAmount
            );
            const isPaid = pending === 0;

            return (
              <tr
                key={student.id}
                className={isPaid ? "paid-row" : "pending-row"}
              >
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{formatCurrency(student.totalFee)}</td>
                <td>{formatCurrency(student.paidAmount)}</td>
                <td>{formatCurrency(pending)}</td>
                <td>
                  <span className={isPaid ? "badge paid" : "badge pending"}>
                    {isPaid ? "Fully Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;