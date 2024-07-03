// App.js
import React, { useState } from "react";
import axios from 'axios';
import { ImEnlarge2 } from "react-icons/im";
import { GrPowerCycle } from "react-icons/gr";
import { BsCheckSquareFill } from "react-icons/bs";
import { HiChevronUpDown } from "react-icons/hi2";
import { PiLineVertical } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";

import "./App.css";

const App = () => {
  const [invoice, setInvoice] = useState({
    currency: 'INR',
    basicAmount: 15000,
    taxAmount: 1000,
    totalAmount: 16000,
    advancePaid: 0,
    tcsApplicable: false,
    netPayable: 16000,
    alternativePayee1: '',
    alternativePayee2: '',
    city: '',
    street: '',
    country: '',
    bankKey: '',
    bankAccNo: '',
    reference: ''
  });
  const [activeTab, setActiveTab] = useState('invoiceDetails');
  //const [fetchedInvoice, setFetchedInvoice] = useState(null);
  const [fetchedInvoices, setFetchedInvoices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setInvoice({ ...invoice, tcsApplicable: value === "yes" });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/invoices', invoice);
      alert('Invoice added successfully');
    } catch (error) {
      console.error("There was an error adding the invoice!", error);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setFetchedInvoices(response.data);
      console.log("hello",response.data);
      setActiveTab('actionDetails');
    } catch (error) {
      console.error("There was an error fetching the invoice details!", error);
    }
  };

  return (
    <div className="containers-display">
      <div>
        <img
          src="https://res.cloudinary.com/davkkbrhk/image/upload/v1719970568/page_hzzbmv.png"
          className="image"
        />
      </div>
      <div className="right-container">
       
        <span className={`top-details ${activeTab === 'invoiceDetails' ? 'active' : ''}`} onClick={() => setActiveTab('invoiceDetails')}>
          Invoice Details
        </span>
        <span className={`top-details ${activeTab === 'actionDetails' ? 'active' : ''}`} onClick={fetchDetails}>
          Action History
        </span>

        {activeTab === 'actionDetails' && fetchedInvoices ? (
             fetchedInvoices.map((fetchedInvoice, index) => (
              <div key={fetchedInvoice._id}>
                <p className="properties-heading">Fetched Invoice Details [{index + 1}]</p>
                <div className="items">
                  <p className="property-name">Currency:</p>
                  <p className="property-value">{fetchedInvoice.currency}</p>
                </div>
                <div className="items">
                  <p className="property-name">Basic Amount:</p>
                  <p className="property-value">{parseFloat(fetchedInvoice.basicAmount)?.toFixed(2)}</p>
                </div>
                <div className="items">
                  <p className="property-name">Tax Amount:</p>
                  <p className="property-value">{parseFloat(fetchedInvoice.taxAmount)?.toFixed(2)}</p>
                </div>
                <div className="items">
                  <p className="property-name">Total Amount:</p>
                  <p className="property-value">{parseFloat(fetchedInvoice.totalAmount)?.toFixed(2)}</p>
                </div>
                <div className="items">
                  <p className="property-name">Advance Paid:</p>
                  <p className="property-value">{parseFloat(fetchedInvoice.advancePaid)?.toFixed(2)}</p>
                </div>
                <div className="items">
                  <p className="property-name">TCS Applicable:</p>
                  <p className="property-value">{fetchedInvoice.tcsApplicable ? "Yes" : "No"}</p>
                </div>
                <div className="items">
                  <p className="property-name">Net Payable:</p>
                  <p className="property-value">{parseFloat(fetchedInvoice.netPayable)?.toFixed(2)}</p>
                </div>
                <div className="items">
                  <p className="property-name">Alternative Payee 1:</p>
                  <p className="property-value">{fetchedInvoice.alternativePayee1}</p>
                </div>
                <div className="items">
                  <p className="property-name">Alternative Payee 2:</p>
                  <p className="property-value">{fetchedInvoice.alternativePayee2}</p>
                </div>
                <div className="items">
                  <p className="property-name">City:</p>
                  <p className="property-value">{fetchedInvoice.city}</p>
                </div>
                <div className="items">
                  <p className="property-name">Street:</p>
                  <p className="property-value">{fetchedInvoice.street}</p>
                </div>
                <div className="items">
                  <p className="property-name">Country:</p>
                  <p className="property-value">{fetchedInvoice.country}</p>
                </div>
                <div className="items">
                  <p className="property-name">Bank Key:</p>
                  <p className="property-value">{fetchedInvoice.bankKey}</p>
                </div>
                <div className="items">
                  <p className="property-name">Bank Account No:</p>
                  <p className="property-value">{fetchedInvoice.bankAccNo}</p>
                </div>
                <div className="items">
                  <p className="property-name">Reference:</p>
                  <p className="property-value">{fetchedInvoice.reference}</p>
                </div>
              </div>
            ))
          // <div>
          //   <p className="properties-heading">Fetched Invoice Details</p>
          //   <div className="items">
          //     <p className="property-name">Currency:</p>
          //     <p className="property-value">{fetchedInvoice.currency}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Basic Amount:</p>
          //     <p className="property-value">{fetchedInvoice.basicAmount?.toFixed(2)}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Tax Amount:</p>
          //     <p className="property-value">{fetchedInvoice.taxAmount?.toFixed(2)}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Total Amount:</p>
          //     <p className="property-value">{fetchedInvoice.totalAmount?.toFixed(2)}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Advance Paid:</p>
          //     <p className="property-value">{fetchedInvoice.advancePaid?.toFixed(2)}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">TCS Applicable:</p>
          //     <p className="property-value">{fetchedInvoice.tcsApplicable ? "Yes" : "No"}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Net Payable:</p>
          //     <p className="property-value">{fetchedInvoice.netPayable?.toFixed(2)}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Alternative Payee 1:</p>
          //     <p className="property-value">{fetchedInvoice.alternativePayee1}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Alternative Payee 2:</p>
          //     <p className="property-value">{fetchedInvoice.alternativePayee2}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">City:</p>
          //     <p className="property-value">{fetchedInvoice.city}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Street:</p>
          //     <p className="property-value">{fetchedInvoice.street}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Country:</p>
          //     <p className="property-value">{fetchedInvoice.country}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Bank Key:</p>
          //     <p className="property-value">{fetchedInvoice.bankKey}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Bank Account No:</p>
          //     <p className="property-value">{fetchedInvoice.bankAccNo}</p>
          //   </div>
          //   <div className="items">
          //     <p className="property-name">Reference:</p>
          //     <p className="property-value">{fetchedInvoice.reference}</p>
          //   </div>
          // </div>
        ) : (
          <div>
            <p className="properties-heading">Invoice Amount Details</p>
            <div className="items">
              <p className="property-name">
                Currency<span className="star">*</span>:
              </p>
              <p className="property-value">{invoice.currency}</p>
            </div>
            <div className="items">
              <p className="property-name">
                Inv Basic Amt<span className="star">*</span>:
              </p>
              <p className="property-value">{invoice.basicAmount.toFixed(2)}</p>
            </div>
            <div className="items">
              <p className="property-name">
                Inv Tax Amt<span className="star">*</span>:
              </p>
              <p className="property-value">{invoice.taxAmount.toFixed(2)}</p>
            </div>
            <div className="items">
              <p className="property-name">
                Total Inv Amt [Inclu of Tax]
                <span className="star">*</span>:
              </p>
              <p className="property-value">{invoice.totalAmount.toFixed(2)}</p>
            </div>
            <div className="items">
              <p className="property-name">
                Advance paid<span className="star">*</span>:
              </p>
              <input
                className="property-value input"
                placeholder="0.00"
                name="advancePaid"
                value={invoice.advancePaid}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">
                TCS Applicable<span className="star">*</span>:
              </p>
              <form>
                <input
                  type="radio"
                  className="radio"
                  name="tcsApplicable"
                  value="yes"
                  checked={invoice.tcsApplicable === true}
                  onChange={handleRadioChange}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="radio"
                  name="tcsApplicable"
                  value="no"
                  checked={invoice.tcsApplicable === false}
                  onChange={handleRadioChange}
                />
                <span>No</span>
              </form>
            </div>
            <div className="items">
              <p className="property-name">
                Net Payable Amt [Exclu. of TDS]
                <span className="star">*</span>:
              </p>
              <p className="property-value">{invoice.netPayable.toFixed(2)}</p>
            </div>
            <p className="properties-heading">Alternative Payee Details</p>
            <div className="items">
              <p className="property-name">Alternative payee1:</p>
              <input
                className="property-value input"
                name="alternativePayee1"
                value={invoice.alternativePayee1}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Alternative payee2:</p>
              <input
                className="property-value input"
                name="alternativePayee2"
                value={invoice.alternativePayee2}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">City:</p>
              <input
                className="property-value input"
                name="city"
                value={invoice.city}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Street:</p>
              <input
                className="property-value input"
                name="street"
                value={invoice.street}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Country:</p>
              <input
                className="property-value input"
                name="country"
                value={invoice.country}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Bank key/IFSC code:</p>
              <input
                className="property-value input"
                name="bankKey"
                value={invoice.bankKey}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Bank Acc No:</p>
              <input
                className="property-value input"
                name="bankAccNo"
                value={invoice.bankAccNo}
                onChange={handleChange}
              />
            </div>
            <div className="items">
              <p className="property-name">Reference:</p>
              <input
                className="property-value input"
                name="reference"
                value={invoice.reference}
                onChange={handleChange}
              />
            </div>
            <p className="properties-heading">Line Item Details</p>
            <div>
              <div>
                <ImEnlarge2 className="bottom-images" />
                <GrPowerCycle className="bottom-images" />
              </div>
              <div className="bottom-check1">
                <BsCheckSquareFill />
                <HiChevronUpDown />
                <PiLineVertical />
                <span>select debit</span>
                <HiChevronUpDown />
                <PiLineVertical />
                <span>GL Desc</span>
                <HiChevronUpDown />
                <PiLineVertical />
                <span>GL code</span>
                <HiChevronUpDown />
                <PiLineVertical />
                <span>Do not enter special character</span>
              </div>
              <div className="bottom-check2">
                <BsCheckSquareFill />
                <MdOutlineDelete />
                <PiLineVertical />
                <span>select debit</span>
                <HiChevronUpDown />
                <PiLineVertical />
                <select className="option">
                  <option>Debit</option>
                  <option>credit</option>
                </select>
                <select className="option">
                  <option>original cost plant &...</option>
                  <option>duplicate cost plant &...</option>
                </select>
                <p>0020200000</p>
                <input className="bottom-input" />
              </div>
            </div>

            <div className="buttons-container">
              <div className="pagination">
                <span>
                  <LiaAngleLeftSolid />
                </span>
                <span className="count">1</span>
                <span>
                  <LiaAngleRightSolid />
                </span>
                <select className="pages">
                  <option>200/page</option>
                </select>
              </div>
              <div>
                <button className="button" onClick={handleSubmit}>
                  Add
                </button>
                <button className="button">Calculate</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
