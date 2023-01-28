import axios from "axios";

class Sitenary {
  private siteId: string;

  constructor (site: string) {
    this.siteId = site;
    console.log("Sitenary is running...");
    (async () => {
      this.siteId = site;

      const clientIpRes = await fetch(`https://sitenary-web-huuh3.ondigitalocean.app/v1/ip`);
      const clientIp = await clientIpRes.json();
      console.log(`Sitenary: sending event`);
      return axios.post(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
        event: {
          type: "VIEW",
          ip: `${clientIp.ip}`,
          platform: "MacOs"
        }
      })
      .then((response) => {
        console.log("Sitenary: Event sent!");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Sitenary: Error sending event!");
        console.log(error);
      })}
    )();
  }
}

export default Sitenary;