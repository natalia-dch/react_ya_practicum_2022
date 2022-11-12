export async function checkResponse(response, dispatch) {
  if (!response.ok) return false;
  let result = await response.json();
  if (result && result.success) return result;
  else return false;
}
