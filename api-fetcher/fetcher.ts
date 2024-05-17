import {
   fetcherSerialized,
   serializedfetcherResponse,
} from './serializers/fetcherSerialized';

export interface FetchResponse<T> {
   ok: boolean;
   status: number;
   contentType: string;
   content: T;
   url: string;
   error?: string;
}

export default class API {
   private readonly UrlBase: string;

   constructor(urlBase: string) {
      this.UrlBase = urlBase;
   }

   async fetch<T, RES = FetchResponse<T>, Payload = unknown>(
      url: string,
      config?: {
         method?: RequestInit['method'];
         body?: Payload;
         revalidate?: number | false;
      }
   ): Promise<RES> {
      const { method: Method, body: Body, revalidate: R } = config || {};
      const method = Method || 'GET';
      const body = Body || null;
      const revalidate = R || false;
      try {
         const urlRequest = `${this.UrlBase}${url}`;

         const fetchOptions = fetcherSerialized.options(
            urlRequest,
            method,
            body,
            revalidate
         );

         const response = await fetch(urlRequest, fetchOptions);

         return serializedfetcherResponse(response, method) as RES;
      } catch (error: any) {
         console.error('Error fetching data:', error);
         return {
            ok: false,
            status: 500,
            contentType: 'error',
            content: null,
            error: error?.message,
            url,
         } as RES;
      }
   }
}
