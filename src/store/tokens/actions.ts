export type Action = { type: "ADD_TOKEN" | "ADD_ID"; payload: string };

export const addToken = (token: string): Action => ({
  type: "ADD_TOKEN",
  payload: token,
});

//pegar o id do usúario na hora do login
export const addId = (id: string): Action =>({
  type: "ADD_ID",
  payload: id
}
 
)
