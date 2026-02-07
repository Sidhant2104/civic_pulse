export async function fetchSummaryMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    reported: 12842,
    resolved: 10713,
    pending: 2129,
  };
}

export async function fetchCitizenIssues() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return [
    {
      id: "CP-1024",
      type: "Pothole",
      status: "In Progress",
      updated: "2 hours ago",
    },
    {
      id: "CP-1009",
      type: "Streetlight",
      status: "Created",
      updated: "Today",
    },
    {
      id: "CP-0992",
      type: "Garbage Overflow",
      status: "Resolved",
      updated: "Yesterday",
    },
  ];
}

export async function fetchAuthorityQueue() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return [
    {
      id: "CP-1024",
      type: "Pothole",
      location: "Sector 14, Ward 3",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "CP-1018",
      type: "Water Leakage",
      location: "Greenway Market Rd",
      priority: "Medium",
      status: "Assigned",
    },
    {
      id: "CP-1007",
      type: "Streetlight",
      location: "Lakeview Park Gate",
      priority: "Low",
      status: "Assigned",
    },
  ];
}

export async function fetchAdminAnalytics() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    total: 12842,
    pending: 2129,
    resolved: 10713,
    departments: [
      { name: "Roads", performance: 78 },
      { name: "Water", performance: 64 },
      { name: "Sanitation", performance: 82 },
      { name: "Electrical", performance: 71 },
    ],
  };
}
