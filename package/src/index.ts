import axios from "axios";
import dns from "dns";
import os from "os";

class Sitenary {
  private siteId: string;

  constructor (site: string) {
    this.siteId = site;

    console.log("Sitenary is running...");
    (async () => {
      this.siteId = site;
      const clientIp = await axios.get(`http://localhost:3001/v1/ip`);
      console.log(`Sitenary: sending event`);
      return axios.post(`http://localhost:3001/v1/events/${this.siteId}`, {
        event: {
          type: "VIEW",
          ip: `${clientIp.data.ip}`,
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

  private async getIp () {
    console.log("Sitenary: Getting IP address...");
    return new Promise((resolve, reject) => {
      dns.lookup(os.hostname(),(err: NodeJS.ErrnoException | null, address: string, fam: number) => {
        if (err) {
          console.log("Sitenary: Error getting IP address!");
          reject(err);
        } else {
          console.log("Sitenary: IP address found!");
          resolve(address);
        }
      });
    });
  }
}

const sitenary = new Sitenary("63d322b993638313b3f65b27");




export default Sitenary;