export async function fetchHotelNames() {
  const response = await fetch(
    "https://www.gocomet.com/api/assignment/hotels-name"
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch hotel names");
}
