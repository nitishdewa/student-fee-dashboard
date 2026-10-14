import { formatCurrency } from "../utils/feeUtils";

function DashboardCards({ totals }) {
  const cards = [
    { label: "Total Students", value: totals.totalStudents },
    { label: "Total Fees", value: formatCurrency(totals.totalFees) },
    { label: "Collected", value: formatCurrency(totals.totalCollected) },
    { label: "Pending", value: formatCurrency(totals.totalPending) },
  ];

  return (
    <section className="cards">
      {cards.map((card) => (
        <div className="card" key={card.label}>
          <p className="card-label">{card.label}</p>
          <p className="card-value">{card.value}</p>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;