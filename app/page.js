"use client";

import { useEffect, useMemo, useState } from "react";
import { calculatePending, calculateTotals } from "./utils/feeUtils";
import DashboardCards from "./components/DashboardCards";
import SearchBar from "./components/SearchBar";
import FilterToggle from "./components/FilterToggle";
import SortSelect from "./components/SortSelect";
import StudentTable from "./components/StudentTable";

export default function HomePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [sortByPending, setSortByPending] = useState("none");

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/students", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.error || "Unknown API error");
        }

        setStudents(json.data);
      } catch (err) {
        console.error("Failed to load students:", err);
        setError(err.message || "Could not load student data. Please refresh.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const totals = useMemo(() => calculateTotals(students), [students]);

  const visibleStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let result = students.filter((student) =>
      student.name.toLowerCase().includes(normalizedSearch)
    );

    if (showPendingOnly) {
      result = result.filter(
        (student) => calculatePending(student.totalFee, student.paidAmount) > 0
      );
    }

    if (sortByPending === "high") {
      result = [...result].sort(
        (a, b) =>
          calculatePending(b.totalFee, b.paidAmount) -
          calculatePending(a.totalFee, a.paidAmount)
      );
    }

    if (sortByPending === "low") {
      result = [...result].sort(
        (a, b) =>
          calculatePending(a.totalFee, a.paidAmount) -
          calculatePending(b.totalFee, b.paidAmount)
      );
    }

    return result;
  }, [students, searchTerm, showPendingOnly, sortByPending]);

  return (
    <main className="app">
      <header>
        <h1>Student Fee Management Dashboard</h1>
        <p>Track fees, payments and pending amounts.</p>
      </header>

      {loading && <p className="status">Loading students…</p>}

      {error && (
        <div className="status error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <DashboardCards totals={totals} />

          <section className="controls">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterToggle
              checked={showPendingOnly}
              onChange={setShowPendingOnly}
            />
            <SortSelect value={sortByPending} onChange={setSortByPending} />
          </section>

          <StudentTable students={visibleStudents} />
        </>
      )}
    </main>
  );
}