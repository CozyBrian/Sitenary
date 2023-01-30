class Sitenary {
  siteId;

  constructor (site) {
    this.siteId = site;
    console.log("Sitenary is running...");
    (async () => {
      this.siteId = site;

      const clientIpRes = await fetch(`https://sitenary-web-huuh3.ondigitalocean.app/v1/ip`);
      const clientIp = (await clientIpRes.json());

      console.log(`Sitenary: sending event`);
      return fetch(`https://sitenary-web-huuh3.ondigitalocean.app/v1/events/${this.siteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            type: "VIEW",
            ip: `${clientIp.ip}`,
            platform: "MacOs"
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

const testSite = new Sitenary("63d322b993638313b3f65b27");