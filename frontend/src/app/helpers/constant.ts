export class Constants {
  // Error Messages
  static allfieldrequired = "All Fields are Required";
  static checkmail = "Mail sent check";
  static invalidLogin = "Invalid Username and Password";
  static invalidEmail = "Email ID not registered with the application";
  static profileUpdated = "Profile Updated Successfully";
  static profileDeleted = "Profile Deleted Successfully";
  static serverSideErrr = "Something went wrong. Please try again later.";
  static forgetPasswordSuccess = "Kindly contact Adrobee Team.";
  static genericMessage = "Changes done Successfully";

  // Toast severity
  static error = "error";
  static success = "success";

  // Constants
  static tc = "Terms & Conditions";
  static pp = "Privacy Policy";

  // App Names
  static forgetPassword = "Forget Password";
  static login = "Login";

  static printTemplate =
    '<html><head><style>body{margin:0;padding:0;min-width:100%}md-dialog-actions{display:none}.invoice-box{max-width:800px;margin:auto;padding:30px;box-shadow:0 0 10px rgba(0, 0, 0, .15);font-size:16px}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:5px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#333}.invoice-box table tr.information table td{padding-bottom:40px}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #000;font-weight:700}.invoice-box table tr.details td{padding-bottom:20px}.invoice-box table tr.item td{border-bottom:1px solid #000}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:1px solid #000;font-weight:700}.center{text-align:center}.border-bottom{border-bottom:1px solid #000}.border-right{border-right:1px solid #000}.font-size{font-size:9px}</style></head><body><div class="invoice-box"><div class="center"><strong>Tax Invoice</strong></div><table cellpadding="0" cellspacing="0" border="1"><tr class="top"><td colspan="3"><table><tr><td> <strong>{companyname}</strong><br> {companyaddress}</td></tr><tr><td style="text-align: left; border-top: 1px solid #000"> <strong>{name}</strong><br> {customeraddress}</td></tr></table></td><td colspan="3"><table><tr><td class="border-right border-bottom"> Invoice No<br /> {invoiceid}</td><td class="border-bottom"> Dated<br /> {today}</td></tr><tr><td class="border-right border-bottom"> Other Notes <br />{othernote}</td><td class="border-bottom"> Payment Mode <br /> {mode}</td></tr><tr><td class="border-right border-bottom"> Buyer Order No. <br />{buyerorder}</td><td class="border-bottom"> Vehicle Number <br /> {vn}</td></tr><tr><td class="border-right"> Model <br />{model}</td><td> KM <br /> {km}</td></tr></table></td></tr><tr class="heading"><td colspan="4">Delivery Notes</td></tr><tr class="details"><td colspan="4">{notes}</td></tr><tr class="heading"><td>Items</td><td>Each Price</td><td>Quantity</td><td>Amount</td></tr> {bodycontent}</table><div style="float: right;"><table><tr><td>State GST</td><td>{sgst}</td></tr><tr><td>Central GST</td><td>{cgst}</td></tr><tr><td>Amount with out Discount</td><td>{amountwithoutdiscount}</td></tr><tr><td>Discount</td><td>{discount}</td></tr><tr><td>Amount</td><td>{amount}</td></tr></table></div><div><table cellpadding="0" cellspacing="0" border="1"><tr><td> Company\'s Bank Details <br> Bank Name:</td><td>{bankname}</td></tr><tr><td>A/C No:</td><td>{accno}</td></tr><tr><td>Branch/IFSC Code</td><td>{branch}</td></tr><tr><td colspan="1"> <u>Declaration</u><br> <span class=" font-size" style="vertical-align: bottom;"> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct </span></td><td><table><tr><td colspan="3" class="font-size">for {companyname} Service</td></tr><tr><td></td></tr><tr><td>Prepared by</td><td>Verified by</td><td>Authorised Signature</td></tr></table></td></tr></table></div></div><div class="center font-size"> <strong>SUBJECT TO MADURAI JURISDICTION</strong><br> This is a Compter Generated Invoice</div></body></html>';
}
