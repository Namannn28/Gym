"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const exercise_routes_1 = __importDefault(require("./routes/exercise.routes"));
const workout_routes_1 = __importDefault(require("./routes/workout.routes"));
const metrics_routes_1 = __importDefault(require("./routes/metrics.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Rate Limiting
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', apiLimiter);
// Body parser
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
app.use('/api/exercises', exercise_routes_1.default);
app.use('/api/workouts', workout_routes_1.default);
app.use('/api/metrics', metrics_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Fitness Platform API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
