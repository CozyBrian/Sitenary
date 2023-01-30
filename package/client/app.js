class Sitenary {
  siteId;

  constructor (site) {
    this.siteId = site;
    console.log("Sitenary is running...");
    (async () => {
      this.siteId = site;

      console.log(`Sitenary: sending event`);
      return fetch(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            type: "VIEW",
          }
        })
      })
      .then((response) => {
        console.log("Sitenary: Event sent!");
      })
      .catch((error) => {
        console.log("Sitenary: Error sending event!");
        console.log(error);
      })}
    )();
  }
}

const testSite = new Sitenary("63d3cd486408f8035d03ea5c");