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
    '<html><head><style>md-dialog-actions{display:none}.invoice-box{max-width:800px;margin:auto;padding:30px;border:1px solid #eee;box-shadow:0 0 10px rgba(0, 0, 0, .15);font-size:16px;line-height:24px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:20px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#333}.invoice-box table tr.information table td{padding-bottom:40px}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #ddd;font-weight:700}.invoice-box table tr.details td{padding-bottom:20px}.invoice-box table tr.item td{border-bottom:1px solid #eee}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:2px solid #eee;font-weight:700}</style></head><body><div class="invoice-box"><table cellpadding="0" cellspacing="0" border="1"><tr class="top"><td colspan="4"><table><tr><td colspan="4">Invoice #: 123<br>Created: {today}<br></td></tr></table></td></tr><tr class="information"><td colspan="4"><table><tr><td>Service center Address 1<br>no 1<br>Test Address<br>center email</td><td>{name}<br>{model}<br>{km}<br>{mode}</td></tr></table></td></tr><tr class="heading"><td colspan="4">Delivery Notes</td></tr><tr class="details"><td colspan="4">{notes}</td></tr><tr class="heading"><td>Items</td><td style="border-bottom: 1px solid #000;">Each Price</td><td>Quantity</td><td>Amount</td></tr>{bodycontent}<tr class="total"><td></td><td></td><td></td><td>State GST: {sgst}</td></tr><tr class="total"><td></td><td></td><td></td><td>Central GST: {cgst}</td></tr><tr class="total"><td></td><td></td><td></td><td>Total: {amount}</td></tr></table></div></body></html>';
}
