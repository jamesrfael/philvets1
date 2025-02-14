const express = require("express");
const pool = require("../db"); // PostgreSQL connection
const router = express.Router();

router.post("/members", async (req, res) => {
  try {
    const {
      idNumber, lastName, firstName, middleName, email, contactNumber,
      dateHired, company, department, position, status, monthlySalary,
      sss, philhealth, pagibig, vacationLeave, sickLeave, emergencyLeave,
      maternityLeave, paternityLeave, profilePicture
    } = req.body;

    const result = await pool.query(
      `INSERT INTO members (
        id_number, last_name, first_name, middle_name, email, contact_number,
        date_hired, company, department, position, status, monthly_salary,
        sss, philhealth, pagibig, vacation_leave, sick_leave, emergency_leave,
        maternity_leave, paternity_leave, profile_picture
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21
      ) RETURNING *`,
      [
        idNumber, lastName, firstName, middleName, email, contactNumber,
        dateHired, company, department, position, status, monthlySalary,
        sss, philhealth, pagibig, vacationLeave, sickLeave, emergencyLeave,
        maternityLeave, paternityLeave, profilePicture
      ]
    );

    res.status(201).json({ member: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error while adding member." });
  }
});

module.exports = router;
