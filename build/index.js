var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () {
    var investmentDateRef = document.getElementById("date-input");
    var qtyRef = document.getElementById("qty-input");
    var checkBtnRef = document.getElementById("btn");
    var errorRef = document.getElementById("error");
    var resultRef = document.getElementById("result");
    var initialize = function () {
        investmentDateRef.valueAsDate = new Date("9/19/13");
        qtyRef.value = "1";
    };
    var getDateString = function (date) {
        var yyyy = date.getFullYear().toString().padStart(4, "0");
        var mm = (date.getMonth() + 1).toString().padStart(2, "0");
        var dd = date.getDate().toString().padStart(2, "0");
        var dateStr = yyyy + "-" + mm + "-" + dd;
        return dateStr;
    };
    var getBTCForDate = function (date) { return __awaiter(_this, void 0, void 0, function () {
        var dateStr, currentDateStr, url, intermediateData, data, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dateStr = getDateString(date);
                    currentDateStr = getDateString(new Date());
                    // The CoinDesk API errors out on trying
                    // to get the current BTC price with this url
                    if (dateStr === currentDateStr)
                        return [2 /*return*/, 0];
                    url = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + dateStr + "&end=" + dateStr;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    intermediateData = _b.sent();
                    return [4 /*yield*/, intermediateData.json()];
                case 3:
                    data = _b.sent();
                    return [2 /*return*/, (_a = data === null || data === void 0 ? void 0 : data.bpi) === null || _a === void 0 ? void 0 : _a[dateStr]];
                case 4:
                    err_1 = _b.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getCurrentBTC = function () { return __awaiter(_this, void 0, void 0, function () {
        var url, intermediateData, data;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "https://api.coindesk.com/v1/bpi/currentprice.json";
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    intermediateData = _c.sent();
                    return [4 /*yield*/, intermediateData.json()];
                case 2:
                    data = _c.sent();
                    return [2 /*return*/, (_b = (_a = data === null || data === void 0 ? void 0 : data.bpi) === null || _a === void 0 ? void 0 : _a.USD) === null || _b === void 0 ? void 0 : _b["rate_float"]];
            }
        });
    }); };
    var hideError = function () {
        errorRef.style.display = "none";
        errorRef.innerText = "";
    };
    var showError = function (errMsg) {
        hideResult();
        errorRef.innerText = errMsg;
        errorRef.style.display = "block";
    };
    var hideResult = function () {
        resultRef.style.display = "none";
        resultRef.innerText = "";
    };
    var showResult = function (result) {
        hideError();
        resultRef.innerText = "\u2248 $ " + parseInt(result.toString()) + "   " + (result > 0 ? "📈" : "📉");
        resultRef.style.display = "block";
    };
    var showLoading = function () {
        resultRef.innerText = "Loading...";
        resultRef.style.display = "block";
    };
    checkBtnRef.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var priceThen, priceNow, qty, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hideError();
                    hideResult();
                    showLoading();
                    return [4 /*yield*/, getBTCForDate(investmentDateRef.valueAsDate)];
                case 1:
                    priceThen = _a.sent();
                    return [4 /*yield*/, getCurrentBTC()];
                case 2:
                    priceNow = _a.sent();
                    qty = qtyRef.valueAsNumber;
                    if (!priceThen || !priceNow || !qty) {
                        showError("Something went wrong!");
                        return [2 /*return*/];
                    }
                    diff = (priceNow - priceThen) * qty;
                    showResult(diff);
                    return [2 /*return*/];
            }
        });
    }); });
    initialize();
})();
