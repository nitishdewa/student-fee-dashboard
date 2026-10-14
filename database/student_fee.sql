-- =========================
-- SCHEMA
-- =========================

CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  class VARCHAR(20) NOT NULL,
  total_fee DECIMAL(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE payments (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  payment_date DATE NOT NULL,
  reference_no VARCHAR(50) UNIQUE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);


-- 1. Retrieve all students
SELECT * FROM students;

-- 2. Retrieve all payments made by a particular student
SELECT * FROM payments
WHERE student_id = 1;

-- 3. Calculate total amount paid by each student
SELECT student_id, SUM(amount) AS total_paid
FROM payments
GROUP BY student_id;

-- 4. Every student alongside their total paid amount
--    (including students who have not made any payments)
SELECT
  s.id,
  s.name,
  s.class,
  COALESCE(SUM(p.amount), 0) AS total_paid
FROM students s
LEFT JOIN payments p ON s.id = p.student_id
GROUP BY s.id, s.name, s.class;

-- 5. Students whose total payments exceed 5000
SELECT
  s.id,
  s.name,
  SUM(p.amount) AS total_paid
FROM students s
JOIN payments p ON s.id = p.student_id
GROUP BY s.id, s.name
HAVING SUM(p.amount) > 5000;

-- 6. Total amount collected during a given month (example: Jan 2025)
SELECT SUM(amount) AS total_collected
FROM payments
WHERE payment_date >= '2025-01-01'
  AND payment_date <  '2025-02-01';

-- 7. Pending fees per student
SELECT
  s.id,
  s.name,
  s.total_fee,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  GREATEST(s.total_fee - COALESCE(SUM(p.amount), 0), 0) AS pending
FROM students s
LEFT JOIN payments p ON s.id = p.student_id
GROUP BY s.id, s.name, s.total_fee;

-- =========================
-- EXPLANATIONS
-- =========================

-- INNER JOIN vs LEFT JOIN:
--   INNER JOIN returns only rows that have matching records in both tables.
--   LEFT JOIN returns all rows from the left table, plus matching rows
--   from the right table. Unmatched right-side columns become NULL.
--
-- Why a foreign key is useful:
--   A foreign key ensures payments.student_id refers to a real student.
--   This prevents orphan payments and keeps data consistent.
--
-- Multiple payments by the same student:
--   Each installment is stored as a separate row in the payments table.
--   Use SUM(amount) grouped by student_id to get the total. The UNIQUE
--   constraint on reference_no prevents duplicate installments from
--   being inserted twice.