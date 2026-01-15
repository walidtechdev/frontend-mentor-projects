const container = document.getElementById("card__tracker");
let periode = "weekly";

function timeChange() {
  const buttons = document.querySelectorAll("[data-period]");
  buttons.forEach((change) => {
    change.addEventListener("click", () => {
      periode = change.dataset.period;

      container.innerHTML = "";

      fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((activity) => {
            //container for each card
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");

            //overlay
            const overlay = document.createElement("div");
            overlay.classList.add("overlaying");
            overlay.classList.add(
              `overlaying--${activity.title.toLowerCase().replace(/\s+/g, "")}`
            );

            //6 card
            const card = document.createElement("div");
            card.classList.add("activity-card");
            card.classList.add(
              `activity-card--${activity.title
                .toLowerCase()
                .replace(/\s+/g, "")}`
            );

            const heuresActuelles = activity.timeframes[periode].current;
            const heuresPrecedentes = activity.timeframes[periode].previous;
            card.innerHTML = `
              <img src="./images/dots.svg" alt="dots">
              <h2>${activity.title}</h2>
              <p>${heuresActuelles}hrs</p>
              <p>Last Week - ${heuresPrecedentes}hrs</p>
            `;

            //add overlay then card
            cardContainer.appendChild(overlay);
            cardContainer.appendChild(card);

            //add container
            container.appendChild(cardContainer);
          });
        });
    });
  });
}

timeChange();
