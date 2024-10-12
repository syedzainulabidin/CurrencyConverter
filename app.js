let btn = document.querySelector("button"),
  dropdown = document.querySelectorAll("select"),
  icon = document.querySelectorAll("img"),
  output = document.querySelector(".output"),
  error = document.querySelector(".error-box");
for (select of dropdown) {
  for (i in countryList) {
    let temp = document.createElement("option");
    temp.innerText = i;
    temp.value = i;
    if (select.name == "from" && i == "USD") {
      temp.selected = "selected";
    } else if (select.name == "to" && i == "PKR") {
      temp.selected = "selected";
    }
    select.append(temp);
  }

  select.addEventListener("change", (e) => {
    iconChange(e.target);
  });
}
const iconChange = (element) => {
  element.parentElement
    .querySelector("img")
    .setAttribute(
      "src",
      `https://flagsapi.com/${countryList[element.value]}/flat/64.png`
    );
};
let url = "https://economia.awesomeapi.com.br/json/last";
let getCurrency = async () => {
  try {
    error.style.display = "none";
    let input = document.querySelector("input");
    let currency = document.querySelectorAll("select");
    let jsonFormat = await fetch(
      `${url}/${currency[0].value}-${currency[1].value}`
    );
    let jsFormat = await jsonFormat.json();
    let rate = `${jsFormat[`${currency[0].value}${currency[1].value}`].bid}`;
    output.innerText = `${input.value} ${currency[0].value} = ${
      input.value * rate
    } ${currency[1].value}`;
  } catch (err) {
    error.style.display = "block";
    document.removeEventListener("click", getCurrency);
  }
};
btn.addEventListener("click", () => {
  getCurrency();
});
document.querySelector("input").addEventListener("keydown", () => {
  if (document.querySelector("input").value <= 0) {
    document.querySelector("input").value = 1;
  }
  getCurrency();
});
window.onload = getCurrency;
document.addEventListener("click", getCurrency);
