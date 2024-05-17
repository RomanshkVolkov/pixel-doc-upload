import API from '@/api-fetcher/fetcher';

export default class Event {
   private readonly api: API;
   constructor() {
      this.api = new API(
         `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/event`
      );
   }

   public async getEvent(id: string) {
      const response = await this.api.fetch(`/${id}`, { revalidate: 60 });
      return {
         date: new Date(2024, 11, 24, 18),
      };
   }

   public async getDateEvent(id: string) {
      const response = await this.api.fetch(`/${id}`);
      return {
         date: new Date(2024, 11, 24, 18),
      };
   }
}
