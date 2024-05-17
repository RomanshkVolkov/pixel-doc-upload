interface Params {
   params: {
      id: string;
   };
}
export function GET(req: Request, { params }: Params) {
   const { id } = params;
   return Response.json({
      id,
      date: new Date(2024, 11, 24, 18),
   });
}
