class Sitenary {
  siteId;

  constructor (site) {
    this.siteId = site;
    console.log("Sitenary is running...");
    (async () => {
      this.siteId = site;

      addEventListener("hashchange", (e) => {
        const path = e.newURL.split("#")[1];
        fetch(`http://localhost:3001/v1/events/${this.siteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            type: "URI_PATH",
            origin: `/${path}`, 
          }
        })
      })
      .then((response) => {
        console.log("Sitenary: Event sent!");
      })
      .catch((error) => {
        console.log("Sitenary: Error sending event!");
        console.log(error);
      })
      })

      console.log(`Sitenary: sending event`);
      return fetch(`http://localhost:3001/v1/events/${this.siteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            type: "VIEW",
            origin: window.location.pathname, 
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

const testSite = new Sitenary("63da5d6584dbe18d835870c7");