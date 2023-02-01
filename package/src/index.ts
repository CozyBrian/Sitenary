import axios from "axios";

class Sitenary {
  private siteId: string;

  constructor (site: string) {
    this.siteId = site;
    console.info("Sitenary is running...");
    if (site !== undefined && site !== null) {
      (async () => {
        this.siteId = site;
        addEventListener("hashchange", (e) => {
          axios.post(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
            event: {
              type: "VIEW",
              origin: window.location.href, 
            }
          })
          .catch((error) => {
            console.log(error);
          });
        });

        return axios.post(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
          event: {
            type: "VIEW",
            origin: window.location.href,
          }
        })
        .catch((error) => {
          console.info("Sitenary: Error sending event!");
          console.info(error);
        });
      })();
    }
  }
}

export default Sitenary;