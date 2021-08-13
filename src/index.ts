(() => {
  const investmentDateRef = document.getElementById(
    "date-input"
  ) as HTMLInputElement;
  const qtyRef = document.getElementById("qty-input") as HTMLInputElement;
  const checkBtnRef = document.getElementById("btn") as HTMLButtonElement;
  const errorRef = document.getElementById("error") as HTMLParagraphElement;
  const resultRef = document.getElementById("result") as HTMLParagraphElement;

  const initialize = () => {
    investmentDateRef.valueAsDate = new Date("9/19/13");
    qtyRef.value = "1";
  };

  const getDateString = (date: Date) => {
    const yyyy = date.getFullYear().toString().padStart(4, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    return dateStr;
  };

  const getBTCForDate = async (date: Date): Promise<number | null> => {
    const dateStr = getDateString(date);
    const currentDateStr = getDateString(new Date());

    // The CoinDesk API errors out on trying
    // to get the current BTC price with this url
    if (dateStr === currentDateStr) return 0;

    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStr}&end=${dateStr}`;

    try {
      const intermediateData = await fetch(url);
      const data = await intermediateData.json();
      return data?.bpi?.[dateStr];
    } catch (err) {
      return null;
    }
  };

  const getCurrentBTC = async () => {
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

    const intermediateData = await fetch(url);
    const data = await intermediateData.json();
    return data?.bpi?.USD?.["rate_float"];
  };

  const hideError = () => {
    errorRef.style.display = "none";
    errorRef.innerText = "";
  };

  const showError = (errMsg: string) => {
    hideResult();
    errorRef.innerText = errMsg;
    errorRef.style.display = "block";
  };

  const hideResult = () => {
    resultRef.style.display = "none";
    resultRef.innerText = "";
  };

  const showResult = (result: number) => {
    hideError();
    resultRef.innerText = `≈ $ ${parseInt(result.toString())}   ${
      result > 0 ? "📈" : "📉"
    }`;
    resultRef.style.display = "block";
  };

  const showLoading = () => {
    resultRef.innerText = "Loading...";
    resultRef.style.display = "block";
  };

  checkBtnRef.addEventListener("click", async () => {
    hideError();
    hideResult();

    showLoading();

    const priceThen = await getBTCForDate(investmentDateRef.valueAsDate!);
    const priceNow = await getCurrentBTC();
    const qty = qtyRef.valueAsNumber;

    if (!priceThen || !priceNow || !qty) {
      showError("Something went wrong!");
      return;
    }

    const diff = (priceNow - priceThen) * qty;

    showResult(diff);
  });

  initialize();
})();
