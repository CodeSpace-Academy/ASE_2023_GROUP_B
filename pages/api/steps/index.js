const BASE_URL = "/api";

export async function fetchFilterBySteps(numOfSteps) {
  const response = await fetch(`${BASE_URL}/filterBySteps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numOfSteps }),
  });

  if (!response.ok) {
    throw new Error("Error fetching recipes by steps");
  }

  return response.json();
}
