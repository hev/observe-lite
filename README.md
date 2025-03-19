# observe-lite

A simplified dashboard interface for Prometheus metrics.

## Overview

`observe-lite` is a web application that allows users to visualize and interact with metrics from a Prometheus server. It provides a user-friendly interface to query and display time series data, making it easier to monitor and analyze system performance.

## Features

- **Live Metrics**: Fetch and display live metrics from a Prometheus server.
- **Custom Queries**: Input custom Prometheus queries to retrieve specific metrics.
- **Multiple Panel Types**: Visualize data in various formats, including line charts, area charts, bar charts, and single metrics.
- **Responsive Design**: The dashboard is designed to be responsive and user-friendly.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A running instance of Prometheus

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hev/observe-lite.git
   cd observe-lite
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Configuration

Before using the application, you need to configure the data source settings to point to your Prometheus server.

1. Click on the **Settings** button in the top right corner of the dashboard.
2. In the settings dialog, you can choose between **Mock Data** (for development) and **Prometheus API**.
3. If you select **Prometheus API**, enter the base URL of your Prometheus server (e.g., `http://localhost:9090`). To port-forward Prometheus to your local machine, you can use `kubectl port-forward svc/prometheus-service 9090:9090`.

### Using the Dashboard

1. **Add Panels**: Click on the buttons to add different types of panels (line, area, bar, toplist, single metric).
2. **Input Queries**: For each panel, you can input a Prometheus query to fetch the desired metrics. The application supports auto-completion for available metrics.
3. **View Metrics**: The dashboard will display the metrics in the selected format, updating in real-time based on the specified time range.

### Example Queries

- To get the JVM uptime for a specific cluster:
  ```
  aerospike_vector_search_jvm_attribute_uptime{cluster_name='avs-db-1'}
  ```

- To get the total number of requests:
  ```
  aerospike_vector_search_requests_total
  ```

### Custom Time Ranges

You can select predefined time ranges (e.g., last 1m, last 1h) or set a custom time range to view metrics over a specific period.


