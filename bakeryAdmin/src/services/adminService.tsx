const BASE_URL = "http://localhost:5279/fillings";

export async function Login(){
  const response = await fetch(BASE_URL,{
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwianRpIjoiMTIzMTI1ODkxMjg1OXkxMjUiLCJuYmYiOiIxMjMiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE5MDE2MjM5MDIyLCJleHAiOjIxNTkxMjUwOTEyNTA5MTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTI3OSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTI3OSJ9.rLb5cv94BK7z70ToI-2F64cFdXHmLcQcsUBxZ9S_SW4"
    },
  }) 
  console.log(await response.json());
}
