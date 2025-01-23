export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Метод не поддерживается" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "E-mail обязателен" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = process.env.UNISENDER_API_KEY;
    const listId = process.env.UNISENDER_LIST_ID;

    const response = await fetch("https://api.unisender.com/ru/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        format: "json",
        api_key: apiKey,
        list_ids: listId,
        "fields[email]": email, 
        double_optin: "1", 
      }),
    });

    const data = await response.json();

    if (data.result) {
      return new Response(JSON.stringify({ message: "Подписка успешна!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: data.error || "Ошибка при подписке" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Ошибка при запросе к Unisender:", error);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}