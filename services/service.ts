import Event from './event';

export default class Service {
   public readonly event: Event;
   constructor() {
      this.event = new Event();
   }
}
