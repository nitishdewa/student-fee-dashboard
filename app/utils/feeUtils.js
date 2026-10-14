export function calculatePending(totalFee, paidAmount) {
  const total = Number(totalFee) || 0;
  const paid = Number(paidAmount) || 0;
  return Math.max(total - paid, 0);
}

export function filterStudentsWithPending(students) {
  return students.filter(
    (student) => calculatePending(student.totalFee, student.paidAmount) > 0
  );
}

export function calculateTotals(students) {
  return students.reduce(
    (acc, student) => {
      const totalFee = Number(student.totalFee) || 0;
      const paidAmount = Number(student.paidAmount) || 0;
      const pending = calculatePending(totalFee, paidAmount);

      acc.totalStudents += 1;
      acc.totalFees += totalFee;
      acc.totalCollected += paidAmount;
      acc.totalPending += pending;

      return acc;
    },
    {
      totalStudents: 0,
      totalFees: 0,
      totalCollected: 0,
      totalPending: 0,
    }
  );
}

export function findHighestPendingStudent(students) {
  if (!students.length) return null;

  return students.reduce((highest, student) => {
    const pending = calculatePending(student.totalFee, student.paidAmount);
    const highestPending = calculatePending(
      highest.totalFee,
      highest.paidAmount
    );
    return pending > highestPending ? student : highest;
  });
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}