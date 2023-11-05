import React, { useEffect, useState } from "react";

function Main() {
  const [data, setData] = useState<number[]>();
  const [showPopup, setPopup] = useState(false);
  const [result, setResult] = useState(0);

  const CallModel = async () => {
    let d: number[] = [];
    fields.forEach((field) => {
      const element = document.getElementById(field) as HTMLInputElement;
      if (element.value) {
        d.push(parseInt(element.value));
      } else {
        alert("Enter All Values");
        return;
      }
    });
    setData(d);
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/model/input`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ Input: data }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
  
      if (json) {
        setPopup(true);
        setResult(json[0]);
      }
    } catch (error) {
      console.error("Error in the network request:", error);
    }
  };
  
  const fields = [
    "Net Profit",
    "Total Liabilities/ Total Assets",
    "Working Capital",
    "Current Assets",
    "Cashflow Coverage Ratio",
    "Retained Earnings",
    "EBIT",
    "Book Value of Equity",
    "Sales",
    "Equity",
  ];

  useEffect(()=>{
    console.log(result)
  },[result])

  return (
    <>
      <div className="container m-5">
        <div className="display-5">Bankrupcty Detection Model</div>
        <hr />
        <p>
          Are you worried about the financial health of your business or
          investments?
          <br />
          <br /> PredictRight is your trusted partner in making informed
          decisions about bankruptcy risk. Our cutting-edge bankruptcy
          prediction application leverages the power of data analytics and
          machine learning to help you anticipate financial distress before it
          becomes a crisis.
        </p>
        <div className="info"></div>
        <div className="form border p-5">
          <form className="w-100">
            <div className="gap-5 d-flex justify-content-start flex-wrap">
              {fields.map((field, index) => (
                <div className="mb-3 w-25" key={index}>
                  <label className="form-label">{field}</label>
                  <input
                    type="number"
                    className="form-control"
                    id={field}
                    aria-describedby={field}
                  />
                </div>
              ))}
            </div>
            <br />
            <button
              type="button"
              id="Test"
              className="btn btn-dark"
              onClick={() => CallModel()}
            >
              Test Bankruptcy
            </button>
          </form>
        </div>
        {showPopup === true ? (
          <div
            className="d-block position-absolute top-50 start-50 translate-middle bg-white p-5 border rounded shadow m-5 align-self-center w-50 overflow-scroll"
          >
            {result===0?(
            <>
            <div className="overflow-scroll" style={{ height: "650px" }}>
              <h2 className="text-danger">Prediction : Bankrupt</h2>
              <h4>Common Reasons for Company Bankruptcy</h4>
              <ul>
                <li>
                  Excessive Debt: Accumulating too much debt that cannot be
                  repaid can lead to financial insolvency.
                </li>
                <li>
                  Poor Financial Management: Ineffective financial planning and
                  budgeting can result in financial crises.
                </li>
                <li>
                  Declining Sales and Revenue: A consistent decline in sales and
                  revenue may lead to cash flow problems.
                </li>
                <li>
                  Market Competition: Intense competition without a unique value
                  proposition can harm profitability.
                </li>
                <li>
                  Economic Downturns: Economic recessions can negatively impact
                  business operations and revenues.
                </li>
              </ul>

              <h2>Strategies to Overcome Bankruptcy</h2>
              <p>
                1. Debt Restructuring: Negotiate with creditors to restructure
                debt, extend payment terms, or lower interest rates.
              </p>
              <p>
                2. Financial Restructuring: Develop a realistic budget, cut
                unnecessary costs, and improve financial planning.
              </p>
              <p>
                3. Diversification: Explore new product lines or markets to
                diversify revenue sources.
              </p>
              <p>
                4. Market Research: Continuously analyze the market, customer
                needs, and adapt business strategies accordingly.
              </p>
              <p>
                5. Seek Professional Help: Consult with financial advisors,
                turnaround experts, and legal counsel if necessary.
              </p>
              </div>
            </>
            ): (<>
            <div className=" display-5 text-success">Prediction : Not Bankrupt</div> <br /><br />
            </>)}
            <button
              className="btn btn-secondary m-2 mx-auto"
              onClick={() => setPopup(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Main;
