import axios from "axios";

class Sitenary {
  private siteId: string;

  constructor (site: string) {
    this.siteId = site;
    console.info("Sitenary is running...");
    (async () => {
      this.siteId = site;
      console.log(`Sitenary: sending event`);
      return axios.post(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
        event: {
          type: "VIEW",
          url: window.location.href,
        }
      })
      .then((response) => {
        console.info("Sitenary: Event sent!");
        console.info(response.data);
      })
      .catch((error) => {
        console.info("Sitenary: Error sending event!");
        console.info(error);
      })}
    )();
  }
}

export default Sitenary;