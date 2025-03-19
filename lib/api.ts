import type { TimeRange } from "@/lib/types"

// Mock data based on the provided sample
const MOCK_DATA = {
  status: "success",
  data: {
    resultType: "matrix",
    result: [
      {
        metric: {
          __name__: "aerospike_vector_search_jvm_attribute_uptime",
          cluster_name: "avs-db-1",
          container: "aerospike-vector-search",
          endpoint: "manage-5040",
          instance: "10.128.0.44:5040",
          job: "avs-app-aerospike-vector-search-internal",
          namespace: "avs",
          pod: "avs-app-aerospike-vector-search-0",
          service: "avs-app-aerospike-vector-search-internal",
        },
        values: [
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
          [1742239161.359, "4941142"],
          [1742239175.359, "4956131"],
          [1742239189.359, "4971146"],
          [1742239203.359, "4986131"],
          [1742239217.359, "5001142"],
          [1742239231.359, "5016131"],
          [1742239245.359, "5031146"],
          [1742239259.359, "5046132"],
          [1742239273.359, "5061144"],
          [1742239287.359, "5076131"],
          [1742239301.359, "5091144"],
          [1742239315.359, "5106131"],
          [1742239329.359, "5121146"],
          [1742239343.359, "5136131"],
          [1742239357.359, "5136131"],
          [1742239371.359, "5151149"],
          [1742239385.359, "5166131"],
          [1742239399.359, "5181154"],
          [1742239413.359, "5196131"],
          [1742239427.359, "5211144"],
          [1742239441.359, "5226131"],
          [1742239455.359, "5241142"],
          [1742239469.359, "5256132"],
          [1742239483.359, "5271143"],
          [1742239497.359, "5286131"],
          [1742239511.359, "5301144"],
          [1742239525.359, "5316131"],
          [1742239539.359, "5331150"],
          [1742239553.359, "5346131"],
          [1742239567.359, "5346131"],
          [1742239581.359, "5361151"],
          [1742239595.359, "5376131"],
          [1742239609.359, "5391143"],
          [1742240575.359, "15202"],
          [1742240589.359, "30149"],
          [1742240603.359, "45135"],
          [1742240617.359, "45135"],
          [1742240631.359, "60144"],
          [1742240645.359, "75134"],
          [1742240659.359, "90146"],
          [1742240673.359, "105135"],
          [1742240687.359, "120148"],
          [1742240701.359, "135135"],
          [1742240715.359, "150147"],
          [1742240729.359, "165134"],
          [1742240743.359, "180145"],
          [1742240757.359, "195134"],
          [1742240771.359, "210146"],
          [1742240785.359, "225134"],
          [1742240799.359, "240147"],
          [1742240813.359, "255135"],
          [1742240827.359, "255135"],
          [1742240841.359, "270147"],
          [1742240855.359, "285134"],
          [1742240869.359, "300147"],
          [1742240883.359, "315134"],
          [1742240897.359, "330146"],
          [1742240911.359, "345134"],
          [1742241765.359, "9081"],
          [1742241779.359, "24009"],
          [1742241793.359, "39031"],
          [1742241807.359, "54008"],
          [1742241821.359, "69020"],
          [1742241835.359, "84009"],
          [1742241849.359, "99018"],
          [1742241863.359, "114008"],
          [1742241877.359, "114008"],
        ],
      },
      {
        metric: {
          __name__: "aerospike_vector_search_jvm_attribute_uptime",
          cluster_name: "avs-db-1",
          container: "aerospike-vector-search",
          endpoint: "manage-5040",
          instance: "10.128.0.45:5040",
          job: "avs-app-aerospike-vector-search-internal",
          namespace: "avs",
          pod: "avs-app-aerospike-vector-search-1",
          service: "avs-app-aerospike-vector-search-internal",
        },
        values: [
          [1742239021.359, "4809990"],
          [1742239035.359, "4824979"],
          [1742239049.359, "4839995"],
          [1742239063.359, "4854979"],
          [1742239077.359, "4869995"],
          [1742239091.359, "4869995"],
          [1742239105.359, "4884979"],
          [1742239119.359, "4899989"],
          [1742239133.359, "4914979"],
          [1742239147.359, "4929991"],
          [1742239161.359, "4944979"],
          [1742239175.359, "4959995"],
          [1742239189.359, "4974979"],
          [1742239203.359, "4989993"],
          [1742239217.359, "5004980"],
          [1742239231.359, "5019992"],
          [1742239245.359, "5034980"],
          [1742239259.359, "5049995"],
          [1742239273.359, "5064980"],
          [1742239287.359, "5079993"],
          [1742239301.359, "5079993"],
          [1742239315.359, "5094980"],
          [1742239329.359, "5109989"],
          [1742239343.359, "5124980"],
          [1742239357.359, "5139991"],
          [1742239371.359, "5154980"],
          [1742239385.359, "5169993"],
          [1742239399.359, "5184980"],
          [1742239413.359, "5199991"],
          [1742239427.359, "5214980"],
          [1742239441.359, "5229995"],
          [1742239455.359, "5244979"],
          [1742239469.359, "5260008"],
          [1742239483.359, "5274980"],
          [1742239497.359, "5289991"],
          [1742239511.359, "5289991"],
          [1742239525.359, "5304980"],
          [1742239539.359, "5319992"],
          [1742239553.359, "5334979"],
          [1742239567.359, "5349989"],
          [1742239581.359, "5364980"],
          [1742239595.359, "5379989"],
          [1742239609.359, "5394979"],
          [1742240589.359, "18434"],
          [1742240603.359, "33337"],
          [1742240617.359, "48350"],
          [1742240631.359, "63337"],
          [1742240645.359, "78348"],
          [1742240659.359, "93338"],
          [1742240673.359, "108347"],
          [1742240687.359, "123337"],
          [1742240701.359, "138350"],
          [1742240715.359, "153337"],
          [1742240729.359, "168351"],
          [1742240743.359, "183337"],
          [1742240757.359, "198382"],
          [1742240771.359, "198382"],
          [1742240785.359, "213337"],
          [1742240799.359, "228350"],
          [1742240813.359, "243337"],
          [1742240827.359, "258348"],
          [1742240841.359, "273337"],
          [1742240855.359, "288346"],
          [1742240869.359, "303337"],
          [1742240883.359, "318348"],
          [1742240897.359, "333337"],
          [1742240911.359, "348352"],
        ],
      },
    ],
  },
}

// Mock metrics data
const MOCK_METRICS = [
  "aerospike_vector_search_jvm_attribute_uptime",
  "aerospike_vector_search_jvm_memory_used",
  "aerospike_vector_search_jvm_memory_total",
  "aerospike_vector_search_requests_total",
  "aerospike_vector_search_errors_total",
]

// Mock label values
const MOCK_LABEL_VALUES = {
  cluster_name: ["avs-db-1", "avs-db-2"],
  instance: ["10.128.0.44:5040", "10.128.0.45:5040", "10.128.0.46:5040"],
  pod: ["avs-app-aerospike-vector-search-0", "avs-app-aerospike-vector-search-1", "avs-app-aerospike-vector-search-2"],
}

// Function to get settings from localStorage
// This is a fallback for when the context is not available (e.g., during SSR)
function getSettings() {
  if (typeof window === "undefined") {
    return { dataSource: "mock", apiUrl: "http://localhost:9090" }
  }

  const savedSettings = localStorage.getItem("dashboardSettings")
  if (savedSettings) {
    return JSON.parse(savedSettings)
  }

  return { dataSource: "mock", apiUrl: "http://localhost:9090" }
}

// API functions that can use either mock data or real API calls
export async function fetchTimeSeriesData(query: string, timeRange: TimeRange) {
  const { dataSource, apiUrl } = getSettings()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (dataSource === "mock") {
    // Return mock data
    return MOCK_DATA
  } else {
    // Make a real API call to Prometheus
    try {
      const url = `${apiUrl}/api/v1/query_range?query=${encodeURIComponent(query)}&step=${timeRange.step}&start=${timeRange.start}&end=${timeRange.end}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching data from Prometheus:", error)
      throw error
    }
  }
}

export async function fetchMetrics() {
  const { dataSource, apiUrl } = getSettings()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (dataSource === "mock") {
    // Return mock metrics
    return MOCK_METRICS
  } else {
    // Make a real API call to Prometheus
    try {
      const url = `${apiUrl}/api/v1/label/__name__/values`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error fetching metrics from Prometheus:", error)
      throw error
    }
  }
}

export async function fetchLabelValues(label: string) {
  const { dataSource, apiUrl } = getSettings()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (dataSource === "mock") {
    // Return mock label values based on the label
    return MOCK_LABEL_VALUES[label as keyof typeof MOCK_LABEL_VALUES] || []
  } else {
    // Make a real API call to Prometheus
    try {
      const url = `${apiUrl}/api/v1/label/${encodeURIComponent(label)}/values`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error(`Error fetching label values for ${label} from Prometheus:`, error)
      throw error
    }
  }
}

