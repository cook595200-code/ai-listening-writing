"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Get words endpoint' });
});
exports.default = router;
//# sourceMappingURL=words.js.map