const express = require('express');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware} = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 3, // Limit each IP to 3 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use('/flightsService', createProxyMiddleware({
    target:`ServerConfig.FLIGHT_SERVICE_URL`,
    changeOrigin: true,
    pathRewrite: {'^/flightsService': '/', // remove /api prefix when forwarding the request
  },
}));

app.use('/bookingsService', createProxyMiddleware({
    target: `ServerConfig.BOOKINGS_SERVICE_URL`,
    changeOrigin: true,
    pathRewrite: {'^/bookingsService': '/', // remove /api prefix when forwarding the request
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    
});
