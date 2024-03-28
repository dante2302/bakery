const BASE_URL = "http://localhost:5279/fillings";
interface LoginResponse extends Response{
  Jwt?: string
}
export async function Login({username, password}: {username: string, password: string}){
  try{
    const raw = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          username, password
        })
    })
    const response: Response = await raw.json(); 
    if(response.status !== 200)
    {
      throw new Error();
    }
    return response;
  }

  catch{

  }
}
