export async function signUp(data: SignUpData) {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return {}
  }


  return {
    data: await response.json(),
  };
}
