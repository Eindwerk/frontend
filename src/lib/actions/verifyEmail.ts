export async function verifyEmail(
  token: string,
  email: string
): Promise<{ success: boolean; message?: string }> {
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!baseUrl || !apiKey) {
    return {
      success: false,
      message: "Serverconfiguratie ontbreekt (API_BASE_URL of API_KEY).",
    };
  }

  try {
    const res = await fetch(`${baseUrl}email/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        verify_token: token,
        email: decodeURIComponent(email),
      }),
      cache: "no-store",
    });

    if (res.ok) {
      return { success: true };
    } else {
      const errJson = await res.json().catch(() => null);
      return {
        success: false,
        message: errJson?.message || "Verificatie mislukt (ongeldige token).",
      };
    }
  } catch {
    return {
      success: false,
      message:
        "Er ging iets mis met de verificatie-aanvraag. Probeer het later opnieuw.",
    };
  }
}
