import { NextResponse } from "next/server"

// Mock data based on the provided sample
const MOCK_DATA = {
  status: "success",
  data: {
    resultType: "matrix",
    result: [
      {
        "metric": {
          "__name__": "aerospike_vector_search_jvm_attribute_uptime",\
          "cluster_name\": \"avs-  {
          "__name__": "aerospike_vector_search_jvm_attribute_uptime",
          "cluster_name": "avs-db-1",
          "container": "aerospike-vector-search",
          "endpoint": "manage-5040",
          "instance": "10.128.0.44:5040",
          "job": "avs-app-aerospike-vector-search-internal",
          "namespace": "avs",
          "pod": "avs-app-aerospike-vector-search-0",
          "service": "avs-app-aerospike-vector-search-internal"
        },
        "values": [
          [1742239021.359, "4806131"],
          [1742239035.359, "4821141"],
          [1742239049.359, "4836132"],
          [1742239063.359, "4851146"],
          [1742239077.359, "4866131"],
          [1742239091.359, "4881142"],
          [1742239105.359, "4896131"],
          [1742239119.359, "4911143"],
          [1742239133.359, "4926131"],
          [1742239147.359, "4926131"],
          [1742239161.359, "4941142"]
        ]
      },
      {
        "metric": {
          "__name__": "aerospike_vector_search_jvm_attribute_uptime",
          "cluster_name": "avs-db-1",
          "container": "aerospike-vector-search",
          "endpoint": "manage-5040",
          "instance": "10.128.0.45:5040",
          "job": "avs-app-aerospike-vector-search-internal",
          "namespace": "avs",
          "pod": "avs-app-aerospike-vector-search-1",
          "service": "avs-app-aerospike-vector-search-internal"
        },
        "values": [
          [1742239021.359, "4809990"],
          [1742239035.359, "4824979"],
          [1742239049.359, "4839995"],
          [1742239063.359, "4854979"],
          [1742239077.359, "4869995"]
        ]
      }
    ],
  },
}

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const step = searchParams.get("step")
  const start = searchParams.get("start")
  const end = searchParams.get("end")

  // In a real app, this would query a time series database
  // For now, return mock data

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(MOCK_DATA)
}

