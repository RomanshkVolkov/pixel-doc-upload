const isDev = process.env.NODE_ENV?.includes('dev');

export const fetcherSerialized = {
   res: (
      data: any,
      contentType: string,
      response: Response,
      method: RequestInit['method']
   ) => {
      if (!isDev) return;
      const { url, status } = response;
      console.info();
      console.info(`Response: ${method}: ${url}`);
      console.info(`Status: ${status}`);
      console.info(`Content-Type: ${contentType}`);
      const isArray = Array.isArray(data);
      if (!data) {
         console.info('No data content');
      }
      if (isArray) {
         console.table(data.slice(0, 10));
      } else {
         console.table(data);
      }
   },
   options: (
      url: string,
      method: string | undefined | null = 'GET',
      body: any,
      revalidate: number | false = false,
      contentType: string = 'application/json'
   ) => {
      const noBodyMethods = ['GET', 'DELETE', 'PUT'];
      const params = new URLSearchParams(url);

      const bodyString = noBodyMethods.includes(method as string)
         ? null
         : JSON.stringify(body);

      const nextRevalidate =
         revalidate && typeof revalidate === 'number' ? { next: { revalidate } } : {};

      const fetchOptions: RequestInit = {
         ...nextRevalidate,
         method: method || 'GET',
         headers: {
            'Content-Type': contentType,
         },
         body: bodyString,
      };

      if (isDev) {
         console.info(`Request: ${method}: ${url}`);
         if (body) console.info('Payload:', body);
         if (params) console.table(params);
         else console.info('No params');
      }

      if (!fetchOptions.body) {
         delete fetchOptions.body;
      }

      return fetchOptions;
   },
};

export const serializedfetcherResponse = async <T>(
   response: Response,
   method: RequestInit['method']
) => {
   const contentType = response.headers.get('Content-Type');

   const contentHandlers = {
      'application/json': (res: Response) => res.json(),
      'text/html': (res: Response) => res.text(),
      'text/plain': (res: Response) => res.text(),
      'form-data': (res: Response) => res.formData(),
      'image/webp': (res: Response) => res.blob(),
   };

   let content: T | string | null = null;
   if (response.ok) {
      const handler = Object.keys(contentHandlers).find((key) =>
         contentType?.includes(key)
      ) as keyof typeof contentHandlers;

      if (!handler) console.warn(`No handler found for content type: ${contentType}`);
      content =
         handler && contentHandlers[handler]
            ? await contentHandlers[handler](response)
            : await response.text();
   }

   fetcherSerialized.res(content, contentType || '', response, method);

   return {
      ok: response.ok,
      status: response.status,
      contentType: contentType || '',
      content,
      url: response.url,
      error: !response.ok ? content : undefined,
   };
};
