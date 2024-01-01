// const URL = "https://cat-fact.herokuapp.com/facts";

// const factPara = document.querySelector("#para");
// const btn = document.querySelector("#btn");



// const getData = async() => {
//     console.log("getting data from api.....");
//     let response = await fetch(URL);
//     console.log(response);
//     let data = await response.json();
//     // console.log(data[0].text);
//     factPara.innerHTML = data[1].text;
// };

// btn.addEventListener("click" , getData);

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode ==="USD"){
        newOption.selected = "selected";
       
        }
        else if(select.name ==="to" && currCode ==="INR"){
                   newOption.selected = "selected"

    }
        select.append(newOption);
    }
    select.removeEventListener("change" ,(evt) =>{
        updateFlag(evt.target);
    }); 
}

const updateFlag = (element) =>{
        let currCode = element.value;
        let countryCode = countryList[currCode]; // IN ,US.....
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
};

btn.addEventListener("click" , async(evt) =>{
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal*rate;
  msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr.value}`;
//   console.log(rate);
});
