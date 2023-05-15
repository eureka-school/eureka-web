export const serialize = (payload: any) => JSON.parse(JSON.stringify(payload));

export const uploadLocation = (id: string) =>
  `${process.env.NEXTAUTH_URL}/api/v2/uploads/${id}`;
