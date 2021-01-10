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
    '<html><head><style>body{margin:0;padding:0;min-width:100%}md-dialog-actions{display:none}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:5px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#333}.invoice-box table tr.information table td{padding-bottom:40px}.invoice-box table tr.heading td{border-bottom:1px solid #eee;font-weight:700}.invoice-box table tr.details td{padding-bottom:20px}.invoice-box table tr.item td{border-bottom:1px solid #eee}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:1px solid #eee;font-weight:700}th{border-left:1px solid #eee}.center{text-align:center}.padding-btm{padding-bottom:1em}.border-bottom{border-bottom:1px solid #eee}.border-right{border-right:1px solid #eee}.font-size{font-size:9px}.all-border{border:1px solid #eee}</style></head><body><div class="invoice-box"><div class="center padding-btm"><strong>Tax Invoice</strong></div><table cellpadding="0" cellspacing="0" class="all-border"><tr class="top"><td colspan="3"><table class="font-size all-border"><tr><td> <strong>{companyname}</strong><br> {companyaddress}</td></tr><tr><td style="text-align: left; border-top: 1px solid #eee"> <strong>{name}</strong><br> {customeraddress}</td></tr></table></td><td colspan="3"><table class="font-size" border="0"><tr><td class="border-right border-bottom"> Invoice No<br /> <strong>{invoiceid}</strong></td><td class="border-bottom"> Dated<br /> <strong>{today}</strong></td></tr><tr><td class="border-right border-bottom"> Other Notes <br /><strong>{othernote}</strong></td><td class="border-bottom"> Payment Mode <br /> <strong>{mode}</strong></td></tr><tr><td class="border-right border-bottom"> Buyer Order No. <br /><strong>{buyerorder}</strong></td><td class="border-bottom"> Vehicle Number <br /> <strong>{vn}</strong></td></tr><tr><td class="border-right"> Model <br /><strong>{model}</strong></td><td> KM <br /> <strong>{km}</strong></td></tr></table></td></tr><tr class="heading all-border"><td colspan="4" class="font-size">Delivery Notes</td></tr><tr class="details"><td colspan="4">{notes}</td></tr><tr class="heading font-size"><td>Items</td><td>Each Price</td><td>Quantity</td><td>Amount</td></tr><table class="font-size all-border"> {bodycontent}</table></table><div style="float: right;"><table class="font-size"><tr><td>State GST</td><td><strong>{sgst}</strong></td></tr><tr><td>Central GST</td><td><strong>{cgst}</strong></td></tr><tr><td>Amount with out Discount</td><td><strong>{amountwithoutdiscount}</strong></td></tr><tr><td>Discount</td><td><strong>{discount}</strong></td></tr><tr><td>Amount</td><td><strong>{amount}</strong></td></tr></table></div><div><table cellpadding="0" cellspacing="0" class="font-size all-border"><tr><td></td><td></td><td>Bank Name:</td><td><strong>{bankname}</strong></td></tr><tr><td></td><td></td><td>A/C No:</td><td><strong>{accno}</strong></td></tr><tr><td></td><td></td><td>Branch/IFSC Code</td><td><strong>{branch}</strong></td></tr><tr><td></td><td colspan="1" class="all-border"> <u style="float:left">Declaration</u><br> <span class=" font-size" style="vertical-align: bottom; float:left"> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct </span></td><td colspan="2"><table class="font-size all-border"><tr><td colspan="3" class="font-size"><strong>for {companyname} Service</strong></td></tr><tr><td></td></tr><tr><td>Prepared by</td><td>Verified by</td><td>Authorised Signature</td></tr></table></td></tr></table></div><div class="center font-size" style="padding-top: 1em"> <strong>SUBJECT TO MADURAI JURISDICTION</strong><br> This is a Compter Generated Invoice</div></div></body></html>';
}
