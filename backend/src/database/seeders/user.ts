import pool from "../../configs";
import { Request, Response } from "express";

const users = [
  {
    user_name: "khoavh",
    full_name: "vo huy khoa",
    email: "huykhoa630@gmail.com",
    password: "1",
    status: "0",
    refresh_token: "",
  },
  {
    user_name: "anhthy",
    full_name: "Anh Thy",
    email: "anhthy@gmail.com",
    password: "1",
    status: "0",
    refresh_token: "",
  },
  {
    user_name: "ngockhue",
    full_name: "Ngoc Khue",
    email: "ngockhue0@gmail.com",
    password: "1",
    status: "1",
    refresh_token: "",
  },
  {
    user_name: "jennie",
    full_name: "Jennie",
    email: "jennie@gmail.com",
    password: "1",
    status: "1",
    refresh_token: "",
  },
];

const seederUser = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      users.map(async (user) => {
        const insertQuery =
          "INSERT INTO users(user_name, full_name, email, password, status, refresh_token) VALUES($1, $2, $3, $4, $5, $6)";
        const insertValues = [
          user.user_name,
          user.full_name,
          user.email,
          user.password,
          user.status,
          user.refresh_token,
        ];
        await pool.query(insertQuery, insertValues);
      })
    );

    // Commit the transaction
    const { rows } = await pool.query("COMMIT");
    res.status(201).json(rows);
  } catch (err) {
    console.log(err);
    // Rollback the transaction if there was an error
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Data seeding error" });
  }
};

export { seederUser };
