const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {
    toTitleCase,
    generateToken,
    hashPassword,
    resolveUserAccount,
} = require("../src/helpers/utils/utils");

describe("Utility functions testing", () => {
    test("convert string to title case", () => {
        const input = "abodunrin Timilehin";
        const output = "Abodunrin Timilehin";

        expect(toTitleCase(input)).toBe(output);
    });

    test("hash password", () => {
        const password = "timmy419";
        const hashedPassword = hashPassword(password);

        expect(hashedPassword).toBeDefined();
        expect(bcrypt.compareSync(password, hashedPassword)).toBe(true);
    });

    test("generates a valid JWT token", () => {
        const email = "test@example.com";
        const token = generateToken(email);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded.email).toEqual(email);
        expect(decoded.exp).toBeDefined();
        expect(token).not.toBeUndefined();
    });

    test("resolve account number", async () => {
        const accountNumber = "0264478932";
        const bankCode = "058";
        const response = await resolveUserAccount(accountNumber, bankCode);

        expect(response.isError).toBe(false);
        expect(response.data).toEqual({
            account_number: "0264478932",
            account_name: "ABODUNRIN  TIMILEHIN TIMOTHY",
            bank_id: 9,
        });
    });
});
